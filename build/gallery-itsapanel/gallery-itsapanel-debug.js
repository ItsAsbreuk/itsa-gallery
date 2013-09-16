YUI.add('gallery-itsapanel', function (Y, NAME) {

'use strict';

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
    STRING = 'string',
    BOOLEAN = 'boolean',
    VISIBLE = 'visible',
    BOUNDINGBOX = 'boundingBox',
    CONTENTBOX = 'contentBox',
    PADDINGTOP = 'paddingTop',
    PADDINGBOTTOM = 'paddingBottom',
    ITSA = 'itsa-',
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
    PX = 'px',
    DRAGABLE = 'dragable',
    DD = 'dd',
    STYLED = 'styled',
    PANELCLASS = ITSA+PANEL,
    STYLEDPANELCLASS = ITSA+STYLED+PANEL,
    HIDDENPANELCLASS = ITSA+HIDDEN+PANEL,
    HIDDENSECTIONCLASS = ITSA+HIDDEN+'section',
    INLINECLASS = ITSA+'inline'+PANEL,

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

    DEFAULT_HEADERVIEW = '{panel_title}<div class="'+ITSA_PANELCLOSEBTN+'"><i class="itsaicon-form-abort"></i></div>',
    DEFAULT_BODYVIEW = '',
    DEFAULT_FOOTERVIEW = '{panel_footer}',

    GETSTYLE = function(node, prop) {
        return parseInt(node.getStyle(prop), 10);
    };

ITSAPanel = Y.ITSAPanel = Y.Base.create('ITSAPanel', Y.Widget, [
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
        /**
         * @attribute dragable
         * @description Boolean indicating whether or not the Panel floats above the page.
         * When floated, then all floated attributes like: modal, x, y, centered are disregarded.
         * @default tue
         * @type boolean
         */
        dragable: {
            value: true,
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
        headerView : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING) || (val instanceof Y.View);
            },
            setter: '_setHeaderView'
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
        title : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        }
    }
});

ITSAPanel.prototype.initializer = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX);

    // asynchroniously loading fonticons:
    Y.use('gallerycss-itsa-base', 'gallerycss-itsa-form');

    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    boundingBox.addClass(PANELCLASS);
    boundingBox.toggleClass(HIDDENPANELCLASS, !instance.get(VISIBLE));
    boundingBox.toggleClass(INLINECLASS, !instance.get(FLOATED));
    boundingBox.toggleClass(STYLEDPANELCLASS, instance.get(STYLED));
};

ITSAPanel.prototype.bindUI = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        eventhandlers = instance._eventhandlers,
        headerView = instance.get(HEADERVIEW),
        bodyView = instance.get(BODYVIEW),
        footerView = instance.get(FOOTERVIEW);

/*jshint expr:true */
    (headerView instanceof Y.View) && headerView.addTarget(instance);
    (bodyView instanceof Y.View) && bodyView.addTarget(instance);
    (footerView instanceof Y.View) && footerView.addTarget(instance);

    // IMPORTANT NOTE: dd-plugin needs to be a first dependenced module, it CANNOT be loaded afterwards, that seems to lead to an error
    instance.get(DRAGABLE) && instance.get(FLOATED) && boundingBox.plug(Y.Plugin.Drag) && boundingBox.dd.addHandle('.'+PANELHEADERCLASS);
/*jshint expr:false */

    eventhandlers.push(
        instance.after(FLOATED+CHANGE, function(e) {
            boundingBox.toggleClass(INLINECLASS, !e.newVal);
            if (instance.get(DRAGABLE)) {
/*jshint expr:true */
                // IMPORTANT NOTE: dd-plugin needs to be a first dependenced module, it CANNOT be loaded afterwards, that seems to lead to an error
                e.newVal && !boundingBox.dd && boundingBox.plug(Y.Plugin.Drag) && boundingBox.dd.addHandle('.'+PANELHEADERCLASS);
                !e.newVal && boundingBox.dd && boundingBox.unplug(DD);
/*jshint expr:false */
            }
        })
    );

    eventhandlers.push(
        instance.after(DRAGABLE+CHANGE, function(e) {
/*jshint expr:true */
            // IMPORTANT NOTE: dd-plugin needs to be a first dependenced module, it CANNOT be loaded afterwards, that seems to lead to an error
            e.newVal && instance.get(FLOATED) && !boundingBox.dd && boundingBox.plug(Y.Plugin.Drag) && boundingBox.dd.addHandle('.'+PANELHEADERCLASS);
            !e.newVal && boundingBox.dd && boundingBox.unplug(DD);
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after(VISIBLE+CHANGE, function(e) {
            boundingBox.toggleClass(HIDDENPANELCLASS, !e.newVal);
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
        instance._header.delegate(
            'click',
            Y.bind(instance.hide, instance),
            '.'+ITSA_PANELCLOSEBTN
        )
    );

    eventhandlers.push(
        instance.after('*:viewrendered', function() {
            instance._adjustPaddingTop();
            instance._adjustPaddingBottom();
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
        headerView = instance.get(HEADERVIEW),
        bodyView = instance.get(BODYVIEW),
        footerView = instance.get(FOOTERVIEW);

    Y.log('destructor', 'info', 'ITSA-ViewModel');
/*jshint expr:true */
    (headerView instanceof Y.View) && headerView.removeTarget(instance);
    (bodyView instanceof Y.View) && bodyView.removeTarget(instance);
    (footerView instanceof Y.View) && footerView.removeTarget(instance);
    boundingBox.hasPlugin('dd') && boundingBox.unplug(DD);
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

ITSAPanel.prototype._renderHeader = function() {
    var instance = this,
        title = instance.get('title'),
        headerView = instance.get(HEADERVIEW);
    if (!headerView || (typeof headerView===STRING)) {
        instance._header.setHTML(Lang.sub((headerView || DEFAULT_HEADERVIEW), {panel_title: (title || '')}));
    }
    else if (headerView instanceof Y.View) {
        headerView.set('container', instance._header);
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
        bodyView.set('container', instance._body);
/*jshint expr:true */
        bodyView.render && bodyView.render();
/*jshint expr:false */
    }
};
ITSAPanel.prototype._renderFooter = function() {
    var instance = this,
        footer = instance.get('footer'),
        footerView = instance.get(FOOTERVIEW),
        instanceFooter = instance._footer,
        hideFooter = !footerView && !footer;
    if (hideFooter) {
        instanceFooter.addClass(HIDDENSECTIONCLASS);
    }
    else {
        if (!footerView || (typeof headerView===STRING)) {
            instanceFooter.setHTML(Lang.sub((footerView || DEFAULT_FOOTERVIEW), {panel_footer: (footer || '')}));
        }
        else if (footerView instanceof Y.View) {
            footerView.set('container', instance._footer);
/*jshint expr:true */
            footerView.render && footerView.render();
/*jshint expr:false */
        }
        instanceFooter.removeClass(HIDDENSECTIONCLASS);
    }
    instance._adjustPaddingBottom();
};
ITSAPanel.prototype._setBodyView = function() {
    var instance = this;
/*jshint expr:true */
    instance.get(RENDERED) && instance._renderBody();
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
ITSAPanel.prototype._setMaxHeight = function(val) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var contentBox = instance.get(CONTENTBOX);
            instance._body.setStyle('maxHeight', (val ? ((val-GETSTYLE(contentBox, PADDINGTOP)-GETSTYLE(contentBox, PADDINGBOTTOM))+PX) : ''));
        }
    );
};
ITSAPanel.prototype._setMaxWidth = function(val) {
    this.get(CONTENTBOX).setStyle('maxWidth', (val ? (val+PX) : ''));
};

}, '@VERSION@', {
    "requires": [
        "dd-plugin",
        "base-build",
        "widget-autohide",
        "widget-modality",
        "widget-position",
        "widget-position-align",
        "widget-position-constrain",
        "widget-stack",
        "view",
        "widget",
        "gallery-itsawidgetrenderpromise"
    ],
    "skinnable": true
});
