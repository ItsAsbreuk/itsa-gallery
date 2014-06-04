'use strict';
/*jshint maxlen:200 */

/**
 *
 * Desc<br />
 *
 * @module gallery-itsamarkermodel
 * @extends Model
 * @class Y.ITSAMarkerModel
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

function ITSAMarkerModel() {
    ITSAMarkerModel.superclass.constructor.apply(this, arguments);
}

ITSAMarkerModel.NAME = 'itsamarkermodel';

ITSAMarkerModel.ATTRS = {

    extraZ: {
        value: 0,
        validator: function(v){ return (typeof v === 'boolean'); }
    },

    lat: {
        value: 0,
        validator: function(v){ return (typeof v === 'number'); }
    },

    lon: {
        value: 0,
        validator: function(v){ return (typeof v === 'number'); }
    },

    markerClassname: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerColorClass: { // classname, should be one of the predefined 'red', 'blue' etc, or a custom classname
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerDetailsClosable: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'boolean'); }
    },

    markerHeaderTemplate: {
        value: null
    },

    markerBodyTemplate: {
        value: null
    },

    markerFooterTemplate: {
        value: null
    },

    markerHTML: {
        value: null
    },

    markerNumber: {
        value: null
    },

    markerVisible: {
        value: true,
        validator: function(v){ return (typeof v === 'boolean'); }
    },

    markerSize: {
        value: null,
        validator: function(v){ return (v===null) || (v==='small') || (v==='normal') || (v==='large') || (v==='extralarge'); }
    }

};

Y.ITSAMarkerModel = Y.extend(ITSAMarkerModel, Y.Model);

ITSAMarkerModel.prototype.toJSON = function() {
    var instance = this,
        tojson = instance.constructor.superclass.toJSON.apply(instance, arguments);
    // Attribute 'markerNumber' must be part of toJSON!
    delete tojson.markerClassname;
    delete tojson.markerColorClass;
    delete tojson.markerHeaderTemplate;
    delete tojson.markerBodyTemplate;
    delete tojson.markerFooterTemplate;
    delete tojson.markerText;
    delete tojson.markerVisible;
    delete tojson.markerZindex;
    delete tojson.markerSize;
    return tojson;
};