YUI.add('gallery-itsastatusbar', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 *
 * @module gallery-itsadialog
 * @extends ITSAMessageViewer
 * @class ITSAStatusbar
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    Lang = Y.Lang,
    YNode = Y.Node,
    BODY = 'body',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    EMPTY = 'empty',
    NUMBER = 'number',
    TEMPLATE_CONTAINERBAR = '<div class="itsa-statusbar-container"></div>',
    TEMPLATE_BAR_EMPTY = '<div class="itsa-statusbar-empty"></div>',
    TEMPLATE_BAR_INFO = '<div class="itsa-statusbar-info" style="display: none;"></div>',
    TEMPLATE_BAR_WARN = '<div class="itsa-statusbar-warn" style="display: none;"></div>',
    TEMPLATE_BAR_ERROR = '<div class="itsa-statusbar-error" style="display: none;"></div>',
    CLASS_TEXTTRANSFORM = 'itsa-statusbar-'+'texttransform-',
    TEXTTRANSFORM = 'textTransform',
    CHANGE = 'Change',
    LOADDELAY = 5000,
    UPPERCASE = 'uppercase',
    LOWERCASE = 'lowercase',
    CAPITALIZE = 'capitalize',
    SUSPENDED = '_suspended',
    BOOLEAN = 'boolean',
    STRING = 'string',
    BUTTON = 'button',
    READYTEXT = 'readyText',
    CLASSNAME = 'className',
    STATUS_CLOSE_BUTTON = '<button class="pure-button itsabutton-rounded itsabutton-bordered" data-barlevel="{level}"">{buttontext}</button>',
    ICON_TEMPLATE = '<i class="itsa-dialogicon {icon}"></i>',
    STATUSBAR_TEMPLATE = '<div class="itsa-statusbar-statusmsg">{icontemplate}{message}</div>{button}';

function ITSAStatusbar() {
    ITSAStatusbar.superclass.constructor.apply(this, arguments);
}

ITSAStatusbar.NAME = 'itsastatusbar';

Y.ITSAStatusbar = Y.extend(ITSAStatusbar, Y.ITSAMessageViewer, {}, {
    ATTRS: {
        /**
         * Extra classname that will be set to the statusbar-node. You need to take care of the css yourself.
         *
         * @attribute className
         * @default null
         * @type String
         */
        className : {
            value: null,
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        /**
         * Duration of fading-transition in seconds. Set to zero for no transition.
         *
         * @attribute fadeDelay
         * @type {Boolean}
         * @default 1
         */
        fadeDelay : {
            value: 0.15,
            validator: function(val) {
                return (typeof val===NUMBER) && (val>=0);
            }
        },
        /**
         * The parentnode (or container) of the statusbar.
         *
         * @attribute parentNode
         * @type {Y.Node}
         * @default Y.one('body')
         */
        parentNode : {
            getter: function(val) {
                return ((val instanceof YNode) && val) || Y.one(val || BODY) || Y.one(BODY);
            },
            validator: function(val) {
                return (val instanceof YNode) || (typeof val===STRING);
            }
        },
        /**
         * CSS text-transform of all label-elements. Should be:
         * <ul>
         *   <li>null --> leave as it is</li>
         *   <li>uppercase</li>
         *   <li>lowercase</li>
         *   <li>capitalize --> First character uppercase, the rest lowercase</li>
         * </ul>
         *
         * @attribute labelTransform
         * @default 'lowercase'
         * @type {String}
         */
        textTransform: {
            value: LOWERCASE,
            validator: function(val) {
                return (val===null) || (val===UPPERCASE) || (val===LOWERCASE) || (val===CAPITALIZE);
            }
        },
        /**
         * Text that appears on the statusbar when there are no messages. Set to null -or empty String' to empty.
         *
         * @attribute readyText
         * @type {String|null}
         * @default 'ready'
         */
        readyText : {
            value: 'ready',
            validator: function(val) {
                return (val===null) || (typeof val===STRING);
            }
        },
        /**
         * Whether to show icons on the left side of the statusbar (before the message).<br>
         * Can be overruled per message.
         *
         * @attribute showIcon
         * @type {Boolean}
         * @default true
         */
        showIcon : {
            value: true,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        },
        /**
         * The spinner-class (font-icon) that should be used when 'showStatus'-messages are shown.<br>
         * See gallerycss-itsa-controll for 7 beautiful spin-icons you can use.
         *
         * @attribute statusSpin
         * @type {String}
         * @default 'itsaicon-controll-spin6'
         */
        statusSpin : {
            value: 'itsaicon-controll-spin6',
            validator: function(val) {
                return (typeof val===STRING);
            }
        }
    }
});

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAStatusbar.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAStatusbar');
    var instance = this;

    /**
     * Reference to the containernode.
     * @property _containerNode
     * @type Y.Node
     * @private
     */

    /**
     * Array with internal eventsubscribers.
     * @property _eventhandlers
     * @default []
     * @type Array
     * @private
     */
    instance._eventhandlers = [];

    /**
     * Objects that holds the 3 Y.ITSAViweModelPanel-instances for the levels 'info', 'warn' and 'error'.
     * @property _bars
     * @default {info: Y.ITSAViewModelPanel, warn: Y.ITSAViewModelPanel, error: Y.ITSAViewModelPanel}
     * @type Object
     * @private
     */
    instance._bars = {};

    instance.simpleMessages = true;
    instance._renderBars();
    Y.later(LOADDELAY, instance, instance.isReady);
};

/**
 * Promise that is resolved once delayed dependeincies are loaded.
 *
 * @method isReady
 * @return {Y.Promise} resolves when the instance is ready to use - this is, when all iconfonts are loaded.
 * @since 0.1
*/
ITSAStatusbar.prototype.isReady = function() {
    Y.log('isReady', 'info', 'ITSAStatusbar');
    var instance = this;
    return instance._readyPromise || (instance._readyPromise = Y.usePromise('gallery-itsanodepromise',
                                                                            'gallerycss-itsa-base',
                                                                            'gallerycss-itsa-animatespin',
                                                                            'gallerycss-itsa-controll',
                                                                            'gallerycss-itsa-dialog'));
};

/**
 * Makes the level-bar -that belongs to the message- show up again, after it has been suspended.<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method resurrect
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.1
*/
ITSAStatusbar.prototype.resurrect = function(itsamessage) {
    Y.log('resurrect', 'info', 'ITSAStatusbar');
    var instance = this;
    instance.isReady().then(
        function() {
            var bar = instance._bars[itsamessage.level];
        /*jshint expr:true */
            Y.log('viewmessage level '+itsamessage.level+' about to show by resurrect', 'info', 'ITSA-MessageViewer');
            bar && bar.showPromise();
        /*jshint expr:false */
        }
    );
};

/**
 * Makes the level-bar -that belongs to the message- to hide, in order for a mesage at a higher level to show up.<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method suspend
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.1
*/
ITSAStatusbar.prototype.suspend = function(itsamessage) {
    Y.log('suspend', 'info', 'ITSAStatusbar');
    var instance = this;
    instance.isReady().then(
        function() {
            var bar = instance._bars[itsamessage.level];
            Y.log('viewmessage level '+itsamessage.level+' about to hide by suspend', 'info', 'ITSA-MessageViewer');
        /*jshint expr:true */
            bar && bar.hidePromise();
        /*jshint expr:false */
        }
    );
};

/**
 * Views the message<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method viewMessage
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @return {Y.Promise} will resolve when Y.ITSAMessage._promise gets fulfilled.
 * @since 0.1
*/
ITSAStatusbar.prototype.viewMessage = function(itsamessage) {
    Y.log('viewMessage '+itsamessage.message, 'info', 'ITSAStatusbar');
    var instance = this;
    return instance.isReady().then(
        function() {
            return new Y.Promise(function (resolve) {
                var bars = instance._bars,
                    barNode = bars[itsamessage.level];
                instance._hideBar(bars[EMPTY]);
                instance._showBar(barNode, itsamessage);
                itsamessage._promise.then(
                    function() {
                        Y.log('viewmessage level '+itsamessage.level+' will hide', 'info', 'ITSA-MessageViewer');
                        return instance._hideBar(barNode, true);
                    },
                    function() {
                        Y.log('viewmessage '+itsamessage.level+' will hide because of rejection', 'info', 'ITSA-MessageViewer');
                        return instance._hideBar(barNode, true);
                    }
                ).then(
                    function() {
                        resolve();
/*jshint expr:true */
                        (instance.countMessages(true)===0) && bars[EMPTY].show() && bars[EMPTY].setStyle('opacity', 1); // without delay for better userexperience
/*jshint expr:false */
                    }
                ).then(
                    null,
                    function(err) {
                        Y.soon(function () {
                            throw err;
                        });
                    }
                );
            });
        }
    );
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
 * @since 0.1
*/
ITSAStatusbar.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSAStatusbar');
    var instance = this;
    instance._clearEventhandlers();
    instance._containerNode.destroy(true);
};

//--- private methods ---------------------------------------------------

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSAStatusbar.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSAStatusbar');
    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Makes the bar-level hidden.
 *
 * @method _hideBar
 * @param barnode {Y.Node} the bar-node to be shown.
 * @private
 * @since 0.1
*/
ITSAStatusbar.prototype._hideBar = function(barnode, cleardata) {
/*jshint expr:true */
    cleardata && barnode.set('text', '');
/*jshint expr:false */
    Y.log('viewmessage about to hide level '+barnode.getAttribute("class"), 'info', 'ITSA-MessageViewer');
    // hide right away for better userexperience
    barnode.setStyle('opacity', 0); // making re-opacity possible
    return barnode.hide();
};

/**
 * Renderes the container with 3 statusbars: info-bar, warn-bar and error-bar.
 *
 * @method _renderBars
 * @private
 * @since 0.1
*/
ITSAStatusbar.prototype._renderBars = function() {
    Y.log('_renderBar', 'info', 'ITSAStatusbar');
    var instance = this,
        eventhandlers = instance._eventhandlers,
        textTransform = instance.get(TEXTTRANSFORM),
        parentNode = instance.get('parentNode'),
        className = instance.get(CLASSNAME),
        bars, barempty, barinfo, barwarn, barerror, containerbar;
    containerbar = YNode.create(TEMPLATE_CONTAINERBAR);
    bars = instance._bars;
    barempty = bars[EMPTY] = YNode.create(TEMPLATE_BAR_EMPTY);
    barinfo = bars[INFO] = YNode.create(TEMPLATE_BAR_INFO);
    barwarn = bars[WARN] = YNode.create(TEMPLATE_BAR_WARN);
    barerror = bars[ERROR] = YNode.create(TEMPLATE_BAR_ERROR);
/*jshint expr:true */
    (parentNode===Y.one('body')) && containerbar.addClass('itsa-body-statusbar');
/*jshint expr:false */
    parentNode.prepend(containerbar.append(barempty).append(barinfo).append(barwarn).append(barerror));
    instance._containerNode = containerbar; // so we can destroy later on
/*jshint expr:true */
    className && containerbar.addClass(className);
/*jshint expr:false */
    barempty.set('text', instance.get(READYTEXT));

/*jshint expr:true */
    textTransform && containerbar.addClass(CLASS_TEXTTRANSFORM + textTransform);
/*jshint expr:false */

    eventhandlers.push(
        containerbar.delegate(
            'tap',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAStatusbar');
                var node = e.target,
                    barlevel = node.getAttribute('data-barlevel'),
                    itsamessage;
                itsamessage = instance._lastMessage[barlevel];
/*jshint expr:true */
                itsamessage && itsamessage.resolve();
/*jshint expr:false */
            },
            BUTTON
        )
    );

    eventhandlers.push(
        instance.on(TEXTTRANSFORM+CHANGE, function(e) {
            Y.log('aftersubscriptor '+e.type, 'info', 'ITSAStatusbar');
            var value = e.newVal;
            containerbar.removeClass(CLASS_TEXTTRANSFORM+UPPERCASE);
            containerbar.removeClass(CLASS_TEXTTRANSFORM+LOWERCASE);
            containerbar.removeClass(CLASS_TEXTTRANSFORM+CAPITALIZE);
/*jshint expr:true */
            value && containerbar.addClass(CLASS_TEXTTRANSFORM+value);
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.on(READYTEXT+CHANGE, function(e) {
            Y.log('aftersubscriptor '+e.type, 'info', 'ITSAStatusbar');
            barempty.set('text', e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(
            CLASSNAME+CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAStatusbar');
/*jshint expr:true */
                e.prevVal && containerbar.removeClass(e.prevVal);
                e.newVal && containerbar.addClass(e.newVal);
/*jshint expr:false */
            }
        )
    );

};

/**
 * Makes the bar-level visible and renderes the message inside.
 *
 * @method _showBar
 * @param barnode {Y.Node} the bar-node to be shown.
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @private
 * @since 0.1
*/
ITSAStatusbar.prototype._showBar = function(barnode, itsamessage) {
    var instance = this,
        fadeDelay = instance.get('fadeDelay'),
        icon = (itsamessage.level===INFO) ? itsamessage._config.icon : itsamessage.icon,
        messageObject;
        // on info-level, we don't want an icon by default, only when one is set manually by the config
/*jshint expr:true */
    (itsamessage.messageType==='showStatus') && (icon=instance.get('statusSpin')+' itsa-iconstandalone itsa-busy');
/*jshint expr:false */
    messageObject = {
        icontemplate: icon ? Lang.sub(ICON_TEMPLATE, {icon: icon}) : '',
        message: Y.Escape.html(itsamessage.message.replace(/<br ?\/?>/g,'x')),
        button: itsamessage.noButtons ? '' : Lang.sub(STATUS_CLOSE_BUTTON, {buttontext: 'close', level: itsamessage.level})
    };
    barnode.setHTML(Lang.sub(STATUSBAR_TEMPLATE, messageObject));
    Y.log(itsamessage[SUSPENDED] ? ('viewmessage level '+itsamessage.level+' not shown: SUSPENDED') : ('viewmessage about to show level '+itsamessage.level), 'info', 'ITSA-MessageViewer');
    return itsamessage[SUSPENDED] || ((fadeDelay===0) ? barnode.show() : barnode.showPromise(null, {duration: fadeDelay}));
};

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "event-tap",
        "promise",
        "timers",
        "escape",
        "node-event-delegate",
        "node-style",
        "gallery-itsamessageviewer"
    ],
    "skinnable": true
});
