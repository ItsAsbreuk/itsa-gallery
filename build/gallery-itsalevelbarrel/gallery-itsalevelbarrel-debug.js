YUI.add('gallery-itsalevelbarrel', function (Y, NAME) {

'use strict';
/*jshint maxlen:205 */

/**
 *
 * This module adds some static methods to the Y.Node class that can be used to controll node-availabilities.<br />
 *
 * @module gallery-itsalevelbarrel
 * @extends Widget
 * @class Y.Plugin.ITSALevelBarrel
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    YArray = Y.Array,
    LABEL = 'label',
    VALUE = 'value',
    MAXVALUE = 'maxValue',
    CAP_CHANGE = 'Change',
    CLASSNAME = 'className',
    OLOR = 'olor',
    COLOR = 'c'+OLOR,
    CAP_COLOR = 'C'+OLOR,
    LINECOLOR = 'line'+CAP_COLOR,
    BARREL = 'barrel',
    BACKGROUNDCOLOR = 'background'+CAP_COLOR,
    ETAILS = 'etails',
    DETAILS = 'd'+ETAILS,
    SHOWDETAILS = 'showD'+ETAILS,
    BARRELDETAILS = BARREL+DETAILS,
    HIDDEN_CLASS = 'itsa-'+BARREL+'-hidden',
    BOUNDINGBOX = 'boundingBox',
    CONTENTBOX = 'contentBox',
    LEVEL_INDICATOR = 'level-indicator',
    INFO_ICON = '<i class="itsaicon-dialog-info"></i>',
    CLOSE_ICON = '<i class="itsaicon-dialog-error"></i>',
    LINE_COLOR_TEMPLATE = '1px 1px {color}, -1px 1px {color}, 1px -1px {color}, -1px -1px {color}',
    CONTENT_INNER_TEMPLATE = '<button class="pure-button itsabutton-bordered itsabutton-onlyicon itsa-'+BARRELDETAILS+'-button {buttonvisible}">{'+DETAILS+'button}</button>'+
                             '<div class="'+BARRELDETAILS+' {'+DETAILS+'class}"><div>{'+DETAILS+'}</div></div>'+
                             '<div class="'+BARREL+'label"><span>{label}</span></div>'+
                             '<div class="'+BARREL+'value"></div>'+
                             '<div class="'+LEVEL_INDICATOR+'"></div>',
    ITSA_BARREL_CLASS = 'itsa-'+BARREL+'-container';


function ITSALevelBarrel() {
    ITSALevelBarrel.superclass.constructor.apply(this, arguments);
}

ITSALevelBarrel.NAME = 'itsalevelbarrel';

ITSALevelBarrel.ATTRS = {

    /**
     * Whether to show the details.
     *
     * @attribute value
     * @type {number}
     * @default 0
     * @since 0.1
     */
    showDetails: {
        value: false,
        validator: function(v){ return (typeof v === 'boolean'); }
    },

    /**
     * Auto-number the marker-html - when no markerHTML is specified.
     *
     * @attribute value
     * @type {number}
     * @default 0
     * @since 0.1
     */
    details: {
        value: null,
        validator: function(v){ return ((v===null) || (typeof v === 'string')); }
    },

    /**
     * Auto-number the marker-html - when no markerHTML is specified.
     *
     * @attribute value
     * @type {number}
     * @default 0
     * @since 0.1
     */
    value: {
        value: 0,
        validator: function(v){ return (typeof v === 'number'); }
    },

    /**
     *
     * @attribute maxValue
     * @type {number}
     * @default 100
     * @since 0.1
     */
    maxValue: {
        value: 100,
        validator: function(v){ return (typeof v === 'number'); }
    },

    /**
     * Array with all the checked options. The Array is an Array of String-types which are present in 'options' and checked.
     *
     * @attribute className
     * @type {String}
     * @default null
     * @since 0.1
     */
    className: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Label on the barrel
     *
     * @attribute label
     * @type {String}
     * @default null
     * @since 0.1
     */
    label: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Array with all the checked options. The Array is an Array of String-types which are present in 'options' and checked.
     *
     * @attribute color
     * @type {String}
     * @default null
     * @since 0.1
     */
    color: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Unity after the value
     *
     * @attribute unity
     * @type {String}
     * @default null
     * @since 0.1
     */
    unity: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Default colorclass. These are predefined css-classnames you could use (or define one of your own):
     * 'red'  'blue'
     *
     * @attribute backgroundColor
     * @type {String}
     * @default null
     * @since 0.1
     */
    backgroundColor: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Free margin of the map [px] where the markers should stay within when 'markersInView' or 'centerView' is called.
     *
     * @attribute lineColor
     * @type {String}
     * @default null
     * @since 0.1
     */
    lineColor: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    }

};

Y.ITSALevelBarrel = Y.extend(ITSALevelBarrel, Y.Widget);

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSALevelBarrel');
};

/**
 * Creates the containerdiv that holds all the markers
 *
 * @method renderUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.renderUI = function() {
    Y.log('renderUI', 'info', 'ITSALevelBarrel');
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        contentBox = instance.get(CONTENTBOX),
        className = instance.get(CLASSNAME),
        showDetails = instance.get(SHOWDETAILS),
        details = instance.get(DETAILS) || '',
        color = instance.get(COLOR),
        backgroundcolor = instance.get(BACKGROUNDCOLOR),
        linecolor = instance.get(LINECOLOR);
    boundingBox.addClass(ITSA_BARREL_CLASS);
/*jshint expr:true */
    className && boundingBox.addClass(className);
/*jshint expr:false */
    contentBox.setHTML(Lang.sub(CONTENT_INNER_TEMPLATE, {
        label: instance.get(LABEL) || '',
        buttonvisible: (details==='') ? HIDDEN_CLASS : '',
        detailsbutton: showDetails ? CLOSE_ICON : INFO_ICON,
        details: details,
        detailsclass: showDetails ? '' : HIDDEN_CLASS
    }));
/*jshint expr:true */
    color && instance._setColor({newVal: color});
    backgroundcolor && instance._setBackgroundColor({newVal: backgroundcolor});
    linecolor && instance._setLineColor({newVal: linecolor});
/*jshint expr:false */
};

/**
 * Creates eventlistens
 *
 * @method bindUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.bindUI = function() {
    Y.log('bindUI', 'info', 'ITSALevelBarrel');
    var instance = this,
        buttonNode = instance.get(CONTENTBOX).one('.itsa-'+BARRELDETAILS+'-button'),
        eventhandlers;
    eventhandlers = instance._eventhandlers = [];
    eventhandlers.push(
        instance.after(
            [VALUE+CAP_CHANGE, MAXVALUE+CAP_CHANGE],
            Y.bind(instance.syncUI, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [COLOR+CAP_CHANGE],
            Y.bind(instance._setColor, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [LINECOLOR+CAP_CHANGE],
            Y.bind(instance._setLineColor, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [BACKGROUNDCOLOR+CAP_CHANGE],
            Y.bind(instance._setBackgroundColor, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [CLASSNAME+CAP_CHANGE],
            Y.bind(instance._changeClassName, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [LABEL+CAP_CHANGE],
            Y.bind(instance._changeLabel, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [DETAILS+CAP_CHANGE],
            Y.bind(instance._changeDetails, instance)
        )
    );
    eventhandlers.push(
        instance.after(
            [SHOWDETAILS+CAP_CHANGE],
            Y.bind(instance._changeShowDetails, instance)
        )
    );
    eventhandlers.push(
        buttonNode.on(
            'click',
            Y.bind(instance.toggleDetails, instance)
        )
    );
};

/**
 * syncs the whole modellist into
 * @method syncUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.syncUI = function() {
    Y.log('syncUI', 'info', 'ITSALevelBarrel');
    var instance = this,
        contentBox = instance.get(CONTENTBOX),
        levelBox = contentBox.one('.'+LEVEL_INDICATOR),
        value = instance.get(VALUE),
        maxvalue = instance.get(MAXVALUE),
        percentedHeight = Math.round(100*(maxvalue-value)/maxvalue),
        unity = instance.get('unity'),
        valuenode = contentBox.one('.'+'barrelvalue');
    levelBox.setStyle('top', percentedHeight+'%');
    valuenode.setHTML(instance.get('value')+(unity ? ('<span class="barrelunity">'+instance.get('unity')+'</span>') : ''));
};

/**
 * Toggles visibility of the details
 *
 * @method toggleDetails
 * @since 0.1
*/
ITSALevelBarrel.prototype.toggleDetails = function() {
    Y.log('toggleDetails', 'info', 'ITSALevelBarrel');
    var instance = this;
    instance.set(SHOWDETAILS, !instance.get(SHOWDETAILS));
};

/**
 * Cleans up bindings
 *
 * @method destructor
 * @protected
 * @since 0.3
*/
ITSALevelBarrel.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSALevelBarrel');
    var instance = this;
    instance._clearEventhandlers();
};

/**
 * changes the details. Details are only visible when 'showDetails' is set true.
 * @method _changeDetails
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._changeDetails = function(e) {
    Y.log('_changeDetails', 'info', 'ITSALevelBarrel');
    var instance = this,
        newDetails = e.newVal || '',
        contentBox = instance.get(CONTENTBOX),
        detailsNode = contentBox.one('.'+'barreldetails'+' div'),
        buttonNode = contentBox.one('.itsa-'+BARRELDETAILS+'-button');
    detailsNode.setHTML(newDetails);
    buttonNode.toggleClass(HIDDEN_CLASS, (newDetails===''));
};

/**
 * changes the visibility of 'details'
 * @method _changeDetails
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._changeShowDetails = function(e) {
    Y.log('_changeShowDetails', 'info', 'ITSALevelBarrel');
    var instance = this,
        showDetails = e.newVal,
        contentBox = instance.get(CONTENTBOX),
        detailsCont = contentBox.one('.'+'barreldetails'),
        buttonNode = contentBox.one('.itsa-'+BARRELDETAILS+'-button');
    detailsCont.toggleClass(HIDDEN_CLASS, !showDetails);
    buttonNode.setHTML(showDetails ? CLOSE_ICON : INFO_ICON);
};

/**
 * changes the label
 * @method _changeLabel
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._changeLabel = function(e) {
    Y.log('_changeLabel', 'info', 'ITSALevelBarrel');
    var instance = this,
        newlabel = e.newVal || '',
        contentBox = instance.get(CONTENTBOX),
        labelNode = contentBox.one('.'+'barrellabel'+' span');
    labelNode.setHTML(newlabel);
};

/**
 * changes the className
 * @method _changeClassName
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._changeClassName = function(e) {
    Y.log('_changeClassName', 'info', 'ITSALevelBarrel');
    var instance = this,
        newclass = e.newVal,
        prevclass = e.prevVal,
        boundingBox = instance.get(BOUNDINGBOX);
/*jshint expr:true */
    prevclass && boundingBox.removeClass(prevclass);
    newclass && boundingBox.addClass(newclass);
/*jshint expr:false */
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSALevelBarrel.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSALevelBarrel');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Sets the inline style-color of the value
 * @method _setColor
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._setColor = function(e) {
    Y.log('_setColor', 'info', 'ITSALevelBarrel');
    var instance = this,
        color = e.newVal || '',
        contentBox = instance.get(CONTENTBOX),
        valueNode = contentBox.one('.'+'barrelvalue');
    valueNode.setStyle('color', color);
};

/**
 * Sets the inline style-line-color of the value
 * @method _setLineColor
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._setLineColor = function(e) {
    Y.log('_setLineColor', 'info', 'ITSALevelBarrel');
    var instance = this,
        color = e.newVal,
        contentBox = instance.get(CONTENTBOX),
        valueNode = contentBox.one('.'+'barrelvalue'),
        newlinecolor = (color && (color!=='')) ? Lang.sub(LINE_COLOR_TEMPLATE, {color: color}) : '';
    valueNode.setStyle('textShadow', newlinecolor);
};

/**
 * Sets the inline style-backgroundcolor of the barrellevel
 * @method _setBackgroundColor
 * @private
 * @since 0.1
*/
ITSALevelBarrel.prototype._setBackgroundColor = function(e) {
    Y.log('_setBackgroundColor', 'info', 'ITSALevelBarrel');
    var instance = this,
        color = e.newVal || '',
        contentBox = instance.get(CONTENTBOX),
        levelNode = contentBox.one('.'+LEVEL_INDICATOR);
    levelNode.setStyle('backgroundColor', color);
};

}, '@VERSION@', {
    "requires": [
        "widget",
        "node-base",
        "node-style",
        "gallerycss-itsa-base",
        "gallerycss-itsa-dialog"
    ],
    "skinnable": true
});
