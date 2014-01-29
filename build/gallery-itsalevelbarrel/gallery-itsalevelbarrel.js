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
    VALUE = 'value',
    MAXVALUE = 'maxValue',
    CAP_CHANGE = 'Change',
    OLOR = 'olor',
    COLOR = 'c'+OLOR,
    CAP_COLOR = 'C'+OLOR,
    LINECOLOR = 'line'+CAP_COLOR,
    BACKGROUNDCOLOR = 'background'+CAP_COLOR,
    BOUNDINGBOX = 'boundingBox',
    CONTENTBOX = 'contentBox',
    LEVEL_INDICATOR = 'level-indicator',
    CONTENT_INNER_TEMPLATE = '<div class="barrelvalue"></div><div class="'+LEVEL_INDICATOR+'"></div>',
    ITSA_BARREL_CLASS = 'itsa-barrel-container';


function ITSALevelBarrel() {
    ITSALevelBarrel.superclass.constructor.apply(this, arguments);
}

ITSALevelBarrel.NAME = 'itsalevelbarrel';

ITSALevelBarrel.ATTRS = {

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
    var instance = this;
};

/**
 * Creates the containerdiv that holds all the markers
 *
 * @method renderUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.renderUI = function() {
    var instance = this,
        boundingBox = instance.get(BOUNDINGBOX),
        contentBox = instance.get(CONTENTBOX);
    boundingBox.addClass(ITSA_BARREL_CLASS);
    contentBox.setHTML(CONTENT_INNER_TEMPLATE);
};

/**
 * Creates eventlistens
 *
 * @method bindUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.bindUI = function() {
    var instance = this,
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
};

/**
 * syncs the whole modellist into
 * @method syncUI
 * @protected
 * @since 0.1
*/
ITSALevelBarrel.prototype.syncUI = function() {
    var instance = this,
        contentBox = instance.get(CONTENTBOX),
        levelBox = contentBox.one('.'+LEVEL_INDICATOR),
        value = instance.get(VALUE),
        maxvalue = instance.get(MAXVALUE),
        percentedHeight = Math.round(100*(maxvalue-value)/maxvalue),
        valuenode = contentBox.one('.'+'barrelvalue');
    levelBox.setStyle('top', percentedHeight+'%');
    valuenode.set('text', instance.get('value')+' '+(instance.get('unity') || ''));
};

/**
 * Cleans up bindings
 *
 * @method destructor
 * @protected
 * @since 0.3
*/
ITSALevelBarrel.prototype.destructor = function() {
    var instance = this;
    instance._clearEventhandlers();
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
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Sets the backgroundcolor of the marker
 *
 * @method _setBackgroundColor
 * @private
 * @since 0.3
 *
*/
ITSALevelBarrel.prototype._setBackgroundColor = function() {
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

}, '@VERSION@', {"requires": ["widget"], "skinnable": true});
