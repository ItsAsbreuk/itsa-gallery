'use strict';

/*jshint maxlen:200 */

/**
 *
 * Widget ITSAPanel
 *
 *
 * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default).
 * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added.
 *
 * These buttons are available by the module and will call Model's corresponding methods:
 *
 * close (visible by default)
 * add
 * destroy
 * reset
 * save
 * submit
 *
 *
 * @class ITSAPanel
 * @constructor
 * @extends ITSAViewModel
 * @uses WidgetAutohide
 * @uses WidgetButtons
 * @uses WidgetModality
 * @uses WidgetPosition
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @uses WidgetStack
 * @uses WidgetStdMod
 * @since 0.1
 */

var ITSAPanel,
    YArray = Y.Array,
    Lang = Y.Lang,
    GALLERYCSS_ITSA = 'gallerycss-itsa-',
    DESTROYED = 'destroyed',
    STRING = 'string',
    BOOLEAN = 'boolean',
    VISIBLE = 'visible',
    BOUNDINGBOX = 'boundingBox',
    CONTENTBOX = 'contentBox',
    PADDINGTOP = 'paddingTop',
    PADDINGBOTTOM = 'paddingBottom',
    BUTTON = 'button',
    ITSA = 'itsa-',
    FOCUSED = 'focused',
    FOCUSED_CLASS = ITSA+FOCUSED,
    HIDDEN = 'hidden',
    VIEW = 'View',
    PANEL = 'panel',
    CHANGE = 'Change',
    FLOATED = 'floated',
    HEADERVIEW = 'header'+VIEW,
    BODYVIEW = 'body'+VIEW,
    FOOTERVIEW = 'footer'+VIEW,
    RENDERED = 'rendered',
    NUMBER = 'number',
    OFFSETHEIGHT = 'offsetHeight',
    OFFSETWIDTH = 'offsetWidth',
    BORDERTOPWIDTH = 'borderTopWidth',
    BORDERBOTTOMWIDTH = 'borderBottomWidth',
    BORDERLEFTWIDTH = 'borderLeftWidth',
    BORDERRIGHTWIDTH = 'borderRightWidth',
    MODAL = 'modal',
    PX = 'px',
    TITLE = 'title',
    FOOTER = 'footer',
    RIGHT = 'Right',
    CENTERED = 'centered',
    DRAG = 'drag',
    DRAGABLE = DRAG+'able',
    RESIZE = 'resize',
    RESIZABLE = 'resizable',
    DD = 'dd',
    PLUGIN = '-plugin',
    STYLED = 'styled',
    PANELCLASS = ITSA+PANEL,
    STYLEDPANELCLASS = ITSA+STYLED+PANEL,
    HIDDENPANELCLASS = ITSA+HIDDEN+PANEL,
    HIDDENSECTIONCLASS = ITSA+HIDDEN+'section',
    INLINECLASS = ITSA+'inline'+PANEL,
    CLASSNAME = 'className',

    PANELHEADERCLASS = ITSA+'panelheader',
    PANELBODYCLASS = ITSA+'panelbody',
    PANELFOOTERCLASS = ITSA+'panelfooter',

    PANELHEADERINNERCLASS = ITSA+'panelinnerheader',
    PANELBODYINNERCLASS = ITSA+'panelinnerbody',
    PANELFOOTERINNERCLASS = ITSA+'panelinnerfooter',
    ITSA_PANELCLOSEBTN = ITSA+PANEL+'closebtn',

    HEADERTEMPLATE = '<div class="'+PANELHEADERCLASS+'"><div class="'+PANELHEADERINNERCLASS+'"></div></div>',
    BODYTEMPLATE = '<div class="'+PANELBODYCLASS+'"><div class="'+PANELBODYINNERCLASS+'"></div></div>',
    FOOTERTEMPLATE = '<div class="'+PANELFOOTERCLASS+'"><div class="'+PANELFOOTERINNERCLASS+'"></div></div>',

    CLOSE_BUTTON = '<'+BUTTON+' class="pure-'+BUTTON+' itsa'+BUTTON+'-onlyicon '+ITSA_PANELCLOSEBTN+'" data-focusable="true"><i class="itsaicon-form-abort"></i></'+BUTTON+'>',

    DEFAULT_HEADERVIEW = '<div>{panel_title}</div><div class="itsa-rightalign">{panel_title_right}</div>',
    DEFAULT_BODYVIEW = '',
    DEFAULT_FOOTERVIEW = '<div>{panel_footer}</div><div class="itsa-rightalign">{panel_footer_right}</div>',

    GETSTYLE = function(node, prop) {
        return parseInt(node.getStyle(prop), 10);
    },

    CLICK = 'click',
    CLICK_OUTSIDE = CLICK+'outside',
    VALUE = 'value',
    /**
      * Fired when a button inside the panel is pressed.
      * Convenience-event, cannot be prevented or halted --> use the button-node's click to do that.
      *
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAPanel} The ITSAPanel-instance
      * @param e.value {Any} Should be used to identify the button --> buttons value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      *
    **/
    BUTTON_CLICK = BUTTON+CLICK,

    /**
      * Fired when a button inside the panel asks for the panel to hide.
      * Y.ITSAPanel only has the 'close'-button that can cause this, but you may force other buttons to fir this event.
      * The defaultFunction will call Panel-instance.hide();
      *
      * @event button:hide
      * @param e {EventFacade} Event Facade including:
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      *
    **/
    BUTTON_HIDE_EVENT = BUTTON+':hide';


ITSAPanel = Y.ITSAPanel = Y.Base.create('itsapanel', Y.Widget, [
    // Som other Widget extensions depend on Y.WidgetPosition, so set this one first.
    Y.WidgetPosition,

//    Y.WidgetStdMod,
    Y.WidgetAutohide,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
], null, {
    ATTRS: {
        /**
         * Change Panel-appearance after save is clicked.<br />
         * 0 = no action<br />
         * 1 = close panel<br />
         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />
         * @attribute actionAfterSave
         * @type Int
         * @default 0
         * @since 0.1
        */
        bodyView : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING) || (val instanceof Y.View);
            },
            setter: '_setBodyView'
        },
        className : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        /**
         * @attribute dragable
         * @description Boolean indicating whether or not the Panel floats above the page.
         * When floated, then all floated attributes like: modal, x, y, centered are disregarded.
         * @default false
         * @type boolean
         */
        dragable: {
            value: false,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        footer : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        footerRight : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        footerView : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING) || (val instanceof Y.View);
            },
            setter: '_setFooterView'
        },
        /**
         * @attribute floated
         * @description Boolean indicating whether or not the Panel floats above the page.
         * When floated, then all floated attributes like: modal, x, y, centered are disregarded.
         * @default tue
         * @type boolean
         */
        floated: {
            value: true,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        focusOnShow: {
            value: true,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        headerView : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING) || (val instanceof Y.View);
            },
            setter: '_setHeaderView'
        },
        /**
         * @attribute height
         * @description height of the Panel
         * @default null
         * @type number
         */
        height: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            getter: '_getHeight',
            setter: '_setHeight'
        },
        /**
         * @attribute maxHeight
         * @description Boolean indicating whether or not the Panel is visible.
         * @default false
         * @type boolean
         */
        maxHeight: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            setter: '_setMaxHeight'
        },
        /**
         * @attribute maxWidth
         * @description Boolean indicating whether or not the Panel is visible.
         * @default false
         * @type boolean
         */
        maxWidth: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            setter: '_setMaxWidth'
        },
        /**
         * @attribute minHeight
         * @description Boolean indicating whether or not the Panel is visible.
         * @default false
         * @type boolean
         */
        minHeight: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            setter: '_setMinHeight'
        },
        /**
         * @attribute minWidth
         * @description Boolean indicating whether or not the Panel is visible.
         * @default false
         * @type boolean
         */
        minWidth: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            setter: '_setMinWidth'
        },
        /**
         * @attribute resizable
         * @description Boolean indicating whether or not the Panel is resizable.
         * This will be constrained between minWidth/minHeight and maxWidth/MaxHeight (if set).
         * @default false
         * @type boolean
         */
        resizable: {
            value: false,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        /**
         * Styles the Panel by adding the className 'itsa-styledpanel' to the container.
         *
         * @attribute styled
         * @type {Boolean}
         * @default true
         * @since 0.3
         */
        styled: {
            value: true,
            validator: function(v){
                return (typeof v === BOOLEAN);
            }
        },
        /**
         * @attribute visible
         * @description Boolean indicating whether or not the Panel is visible.
         * @default false
         * @type boolean
         */
        visible: {
            value: false,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        /**
         * @attribute width
         * @description width of the Panel
         * @default null
         * @type number
         */
        width: {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                return (val===null) || (typeof val===NUMBER);
            },
            getter: '_getWidth',
            setter: '_setWidth'
        },
        title : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        titleRight : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        }
    }
});

ITSAPanel.prototype.initializer = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        className = instance.get(CLASSNAME);

    // asynchroniously loading fonticons:
    Y.use(GALLERYCSS_ITSA+'base', GALLERYCSS_ITSA+'form');

    // publishing event 'focusnext'
    instance.publish(
        BUTTON_HIDE_EVENT,
        {
            defaultFn: Y.bind(instance.hide, instance),
            emitFacade: true
        }
    );

    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    boundingBox.addClass(PANELCLASS);
    boundingBox.toggleClass(INLINECLASS, !instance.get(FLOATED));
    boundingBox.toggleClass(STYLEDPANELCLASS, instance.get(STYLED));
    boundingBox.toggleClass(FOCUSED_CLASS, instance.get(FOCUSED));
    // hide boundingBox by default and maybe inhide when rendered --> otherwise there might be a flicker effect when resetting its height
    boundingBox.addClass(HIDDENPANELCLASS);
/*jshint expr:true */
    className && boundingBox.addClass(className);
    instance.renderPromise().then(
        function() {
            instance._setDimensions();
            instance.get(VISIBLE) && boundingBox.removeClass(HIDDENPANELCLASS);
        }
    );
/*jshint expr:false */
};

ITSAPanel.prototype.bindUI = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        contentBox = instance.get(CONTENTBOX),
        eventhandlers = instance._eventhandlers,
        headerView = instance.get(HEADERVIEW),
        bodyView = instance.get(BODYVIEW),
        footerView = instance.get(FOOTERVIEW);

/*jshint expr:true */
    (headerView instanceof Y.View) && headerView.addTarget(instance);
    (bodyView instanceof Y.View) && bodyView.addTarget(instance);
    (footerView instanceof Y.View) && footerView.addTarget(instance);

    instance.get(DRAGABLE) && instance.get(FLOATED) && Y.use(DD+PLUGIN, function() {
            // NOTE: node-pluginhist and dd-ddm MUST be loaded first, otherwise you can get errors !!!
        instance.get(DESTROYED) || (boundingBox.plug(Y.Plugin.Drag).dd.addHandle('.'+PANELHEADERCLASS) && boundingBox.dd.addTarget(instance));
    });
    instance.get(RESIZABLE) && Y.use(RESIZE+PLUGIN, function() {
            // NOTE: node-pluginhist and dd-ddm MUST be loaded first, otherwise you can get errors !!!
        instance.get(DESTROYED) || contentBox.plug(Y.Plugin.Resize, {handles: ['r', 'b', 'br']}).resize.addTarget(instance);
    });
/*jshint expr:false */

    eventhandlers.push(
        instance.after(FLOATED+CHANGE, function(e) {
            boundingBox.toggleClass(INLINECLASS, !e.newVal);
            if (instance.get(DRAGABLE)) {
/*jshint expr:true */
            // NOTE: node-pluginhist and dd-ddm MUST be loaded first, otherwise you can get errors !!!
                e.newVal && !boundingBox.dd && Y.use(DD+PLUGIN, function() {
                    instance.get(DESTROYED) || (boundingBox.plug(Y.Plugin.Drag).dd.addHandle('.'+PANELHEADERCLASS) && boundingBox.dd.addTarget(instance));
                });
                !e.newVal && boundingBox.dd && boundingBox.dd.removeTarget(instance) && boundingBox.unplug(DD);
/*jshint expr:false */
            }
        })
    );

    eventhandlers.push(
        instance.after(DRAGABLE+CHANGE, function(e) {
/*jshint expr:true */
            // NOTE: node-pluginhist and dd-ddm MUST be loaded first, otherwise you can get errors !!!
            e.newVal && instance.get(FLOATED) && !boundingBox.dd && Y.use(DD+PLUGIN, function() {
                instance.get(DESTROYED) || (boundingBox.plug(Y.Plugin.Drag).dd.addHandle('.'+PANELHEADERCLASS) && boundingBox.dd.addTarget(instance));
            });
            !e.newVal && boundingBox.dd && boundingBox.dd.removeTarget(instance) && boundingBox.unplug(DD);
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after(RESIZABLE+CHANGE, function(e) {
/*jshint expr:true */
            // NOTE: node-pluginhist and dd-ddm MUST be loaded first, otherwise you can get errors !!!
            e.newVal && !contentBox[RESIZE] && Y.use(RESIZE+PLUGIN, function() {
                instance.get(DESTROYED) || contentBox.plug(Y.Plugin.Resize, {handles: ['r', 'b', 'br']}).resize.addTarget(instance);
            });
            !e.newVal && contentBox[RESIZE] && contentBox[RESIZE].removeTarget(instance) && contentBox[RESIZE].unplug(RESIZE);
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after([DRAG+':'+DRAG, DRAG+':end'], function() {
            var itsaformelement = Y.ITSAFormElement,
                tipsyValid = itsaformelement && itsaformelement.tipsyValid,
                tipsyInvalid = itsaformelement && itsaformelement.tipsyInvalid;
/*jshint expr:true */
            tipsyValid && tipsyValid.get(VISIBLE) && tipsyValid._alignTooltip(tipsyValid._lastnode);
            tipsyInvalid && tipsyInvalid.get(VISIBLE) && tipsyInvalid._alignTooltip(tipsyInvalid._lastnode);
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after(
            [RESIZE+':end', 'height'+CHANGE, 'width'+CHANGE, 'minHeight'+CHANGE, 'minWidth'+CHANGE],
            function(e) {
/*jshint expr:true */
                instance.get(CENTERED) && instance.centered();
                (e.type===RESIZE+':end') && (instance._widthSet=true) && (instance._heightSet=true);
/*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance.after(VISIBLE+CHANGE, function(e) {
            var visible = e.newVal;
            boundingBox.toggleClass(HIDDENPANELCLASS, !visible);
            if (visible) {
/*jshint expr:true */
                (instance.get(MODAL) || instance.get('focusOnShow')) && instance.focus();
/*jshint expr:true */
            }
            else {
                instance.blur();
            }
        })
    );

    // If the model gets swapped out, reset targets accordingly.
    eventhandlers.push(
        instance.after(
            [HEADERVIEW+CHANGE, BODYVIEW+CHANGE, FOOTERVIEW+CHANGE],
            function (ev) {
    /*jshint expr:true */
                (ev.prevVal instanceof Y.View) && ev.prevVal.removeTarget(instance);
                (ev.newVal instanceof Y.View) && ev.newVal.addTarget(instance);
    /*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance.after(
            STYLED+CHANGE,
            function(e) {
                boundingBox.toggleClass(STYLEDPANELCLASS, e.newVal);
            }
        )
    );

    eventhandlers.push(
        instance.after(
            CLASSNAME+CHANGE,
            function(e) {
/*jshint expr:true */
                e.prevVal && boundingBox.removeClass(e.prevVal);
                e.newVal && boundingBox.addClass(e.newVal);
/*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance.on(
            MODAL+CHANGE,
            function(e) {
/*jshint expr:true */
                !instance.get(FLOATED) && e.preventDefault();
/*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance._header.delegate(
            CLICK,
            function(e) {
                instance.fire(BUTTON_HIDE_EVENT, {buttonNode: e.target});
            },
            '.'+ITSA_PANELCLOSEBTN
        )
    );

    eventhandlers.push(
        boundingBox.on(CLICK, function(e) {
            var buttonNode = e.target,
                payload = {
                    type: BUTTON_CLICK,
                    target: instance,
                    value: buttonNode.get(VALUE),
                    buttonNode: buttonNode
                };
            instance.focus();
            instance.fire(BUTTON_CLICK, payload);
        })
    );

    eventhandlers.push(
        boundingBox.on(CLICK_OUTSIDE, function() {
            instance.blur();
        })
    );

    eventhandlers.push(
        instance.after(FOCUSED+CHANGE, function(e) {
            boundingBox.toggleClass(FOCUSED_CLASS, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after('*:viewrendered', function() {
            instance._adjustPaddingTop();
            instance._adjustPaddingBottom();
            instance._setDimensions();
        })
    );
};

ITSAPanel.prototype.renderUI = function() {
    var instance = this,
        contentBox = instance.get(CONTENTBOX);

    contentBox.setHTML(HEADERTEMPLATE+BODYTEMPLATE+FOOTERTEMPLATE);
    instance._header = contentBox.one('.'+PANELHEADERINNERCLASS);
    instance._body = contentBox.one('.'+PANELBODYINNERCLASS);
    instance._footer = contentBox.one('.'+PANELFOOTERINNERCLASS);
    instance._footercont = contentBox.one('.'+PANELFOOTERCLASS);
    instance._renderHeader();
    instance._renderBody();
    instance._renderFooter();
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
*/
ITSAPanel.prototype.destructor = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        contentBox = instance.get(CONTENTBOX),
        headerView = instance.get(HEADERVIEW),
        bodyView = instance.get(BODYVIEW),
        footerView = instance.get(FOOTERVIEW);

    Y.log('destructor', 'info', 'ITSA-ViewModel');
/*jshint expr:true */
    (headerView instanceof Y.View) && headerView.removeTarget(instance);
    (bodyView instanceof Y.View) && bodyView.removeTarget(instance);
    (footerView instanceof Y.View) && footerView.removeTarget(instance);
    boundingBox.hasPlugin(DD) && boundingBox.dd.removeTarget(instance) && boundingBox.unplug(DD);
    contentBox.hasPlugin[RESIZE] && contentBox[RESIZE].removeTarget(instance) && contentBox.unplug(RESIZE);
/*jshint expr:false */
    instance._clearEventhandlers();
};

ITSAPanel.prototype._adjustPaddingBottom = function() {
    var instance = this;
    instance.get(CONTENTBOX).setStyle(PADDINGBOTTOM, instance._footer.get(OFFSETHEIGHT)+PX);
};

ITSAPanel.prototype._adjustPaddingTop = function() {
    var instance = this;
    instance.get(CONTENTBOX).setStyle(PADDINGTOP, instance._header.get(OFFSETHEIGHT)+PX);
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSAPanel.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModel');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

ITSAPanel.prototype._getHeight = function() {
    this.get(BOUNDINGBOX).get(OFFSETHEIGHT);
};

ITSAPanel.prototype._getWidth = function() {
    this.get(BOUNDINGBOX).get(OFFSETWIDTH);
};

ITSAPanel.prototype._renderHeader = function() {
    var instance = this,
        title = instance.get(TITLE),
        titleRight = instance.get(TITLE+RIGHT),
        headerView = instance.get(HEADERVIEW);
    if (!headerView || (typeof headerView===STRING)) {
        instance._header.setHTML(Lang.sub((headerView || DEFAULT_HEADERVIEW), {panel_title: (title || ''), panel_title_right: (titleRight || CLOSE_BUTTON)}));
    }
    else if (headerView instanceof Y.View) {
        headerView._set('container', instance._header);
/*jshint expr:true */
        headerView.render && headerView.render();
/*jshint expr:false */
    }
    instance._adjustPaddingTop();
};
ITSAPanel.prototype._renderBody = function() {
    var instance = this,
        bodyView = instance.get(BODYVIEW);
    if (!bodyView || (typeof bodyView===STRING)) {
        instance._body.setHTML(bodyView || DEFAULT_BODYVIEW);
    }
    else if (bodyView instanceof Y.View) {
        bodyView._set('container', instance._body);
/*jshint expr:true */
        bodyView.render && bodyView.render();
/*jshint expr:false */
    }
};
ITSAPanel.prototype._renderFooter = function() {
    var instance = this,
        footer = instance.get(FOOTER),
        footerRight = instance.get(FOOTER+RIGHT),
        footerView = instance.get(FOOTERVIEW),
        instanceFooter = instance._footer,
        hideFooter = !footerView && !footer && !footerRight;
    if (!hideFooter) {
        if (!footerView || (typeof footerView===STRING)) {
            instanceFooter.setHTML(Lang.sub((footerView || DEFAULT_FOOTERVIEW), {panel_footer: (footer || ''), panel_footer_right: (footerRight || '')}));
        }
        else if (footerView instanceof Y.View) {
            footerView._set('container', instance._footer);
/*jshint expr:true */
            footerView.render && footerView.render();
/*jshint expr:false */
        }
        instanceFooter.removeClass(HIDDENSECTIONCLASS);
    }
    instance._footercont.toggleClass(HIDDENSECTIONCLASS, hideFooter);
    instance._adjustPaddingBottom();
};
ITSAPanel.prototype._setBodyView = function() {
    var instance = this;
/*jshint expr:true */
    instance.get(RENDERED) && instance._renderBody();
/*jshint expr:false */
};
ITSAPanel.prototype._setDimensions = function() {
    var instance = this,
        contentBox = instance.get(CONTENTBOX);
// only if dimensions not set manually, we need to remove these first, then set the calculated values
/*jshint expr:true */
    instance._widthSet || contentBox.setStyle('width', '');
    instance._heightSet || contentBox.setStyle('height', '');
    // unfortuanatly, we need to increase the final size with one, due to roundingerrors
    instance._widthSet || contentBox.setStyle('width', 1+contentBox.get(OFFSETWIDTH)+PX);
    instance._heightSet || contentBox.setStyle('height', 1+contentBox.get(OFFSETHEIGHT)+PX);
/*jshint expr:false */
};
ITSAPanel.prototype._setFooterView = function() {
    var instance = this;
/*jshint expr:true */
    instance.get(RENDERED) && instance._renderFooter();
/*jshint expr:false */
};
ITSAPanel.prototype._setHeaderView = function() {
    var instance = this;
/*jshint expr:true */
    instance.get(RENDERED) && instance._renderHeader();
/*jshint expr:false */
};
ITSAPanel.prototype._setHeight = function(val) {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX);
/*jshint expr:true */
    val && (val-=GETSTYLE(boundingBox, BORDERTOPWIDTH)+GETSTYLE(boundingBox, BORDERBOTTOMWIDTH));
/*jshint expr:false */
    instance.get(CONTENTBOX).setStyle('height', (val ? (val+PX) : ''));
    instance._heightSet = (typeof val === NUMBER);
};
ITSAPanel.prototype._setMaxHeight = function(val) {
    this.get(CONTENTBOX).setStyle('maxHeight', (val ? (val+PX) : ''));
};
ITSAPanel.prototype._setMaxWidth = function(val) {
    this.get(CONTENTBOX).setStyle('maxWidth', (val ? (val+PX) : ''));
};
ITSAPanel.prototype._setMinHeight = function(val) {
    this.get(CONTENTBOX).setStyle('minHeight', (val ? (val+PX) : ''));
};
ITSAPanel.prototype._setMinWidth = function(val) {
    this.get(CONTENTBOX).setStyle('minWidth', (val ? (val+PX) : ''));
};
ITSAPanel.prototype._setWidth = function(val) {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX);
/*jshint expr:true */
    val && (val-=GETSTYLE(boundingBox, BORDERLEFTWIDTH)+GETSTYLE(boundingBox, BORDERRIGHTWIDTH));
/*jshint expr:false */
    instance.get(CONTENTBOX).setStyle('width', (val ? (val+PX) : ''));
    instance._widthSet = (typeof val === NUMBER);
};