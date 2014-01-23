YUI.add('gallery-itsamapmarker', function (Y, NAME) {

'use strict';
/*jshint maxlen:200 */

/**
 *
 * This module adds some static methods to the Y.Node class that can be used to controll node-availabilities.<br />
 *
 * @module gallery-itsanodepromise
 * @extends Plugin.Base
 * @class Y.Plugin.ITSAMapMarker
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var TILE_SIZE = 256, // standard 256 pixels
    Lang = Y.Lang,
    Node = Y.Node,
    YArray = Y.Array,
    YObject = Y.Object,
    MARKERS = 'markers',
    CAP_CHANGE = 'Change',
    TEMPLATE = 'template',
    MARKER = 'marker',
    CAP_VISIBLE = 'Visible',
    CAP_HEADER = 'Header',
    CAP_BODY = 'Body',
    CAP_FOOTER = 'Footer',
    CAP_CLASSNAME = 'Classname',
    CAP_COLORCLASS = 'ColorClass',
    HTML = 'HTML',
    CLIENTID = 'clientId',
    DATA_ = 'DATA_',
    DATA_HEADER = DATA_+'header',
    DATA_BODY = DATA_+'body',
    DATA_FOOTER = DATA_+'footer',
    PX = 'px',
    HIDDEN = 'hidden',
    LAT = 'lat',
    LON = 'lon',
    MARKER_COLORCLASS = MARKER+'ColorClass',
    MARKER_SIZE = MARKER+'Size',
    OFFSETWIDTH = 'offsetWidth',
    OFFSETHEIGHT = 'offsetHeight',
    HIDDEN_MARKERS = 'itsa-all-markers-hidden',
    MARKER_TEMPLATE = '<div data-id="{mapid}_{clientid}" class="{colorclass} itsa-mapmarker {classname}" {hidden}style="z-index:{zindex}">'+
                          '<div class="itsa-markerballoon {markersize}">{markerhtml}</div>'+
                          '<div class="itsa-markerpin"></div>'+
                          '<div class="itsa-markerdetails">'+
                              '<div class="itsa-markerheaderdetails">{header}</div>'+
                              '<div class="itsa-markerbodydetails">{body}</div>'+
                              '<div class="itsa-markerfooterdetails">{footer}</div>'+
                          '</div>'+
                      '</div>',
    MARKER_LAYER_TEMPLATE = '<div id="map_markers_{mapid}" class="{markersize} itsa-mapmarker-container {colorclass}"></div>';

function ITSAMapMarker() {
    ITSAMapMarker.superclass.constructor.apply(this, arguments);
}

ITSAMapMarker.NAME = 'itsamapmarker';
ITSAMapMarker.NS = 'itsamapmarker';

ITSAMapMarker.ATTRS = {

    /**
     * Array with all the checked options. The Array is an Array of String-types which are present in 'options' and checked.
     *
     * @attribute checked
     * @type {null|Array|ModelList}
     * @default null
     * @since 0.1
     */
    markers: {
        value: null,
        validator: function(v){ return (v===null) || (v instanceof Y.ModelList); }
    },

    /**
     * Default colorclass. These are predefined css-classnames you could use (or define one of your own):
     * 'red'  'blue'
     *
     * @attribute markerColorClass
     * @type {String}
     * @default null
     * @since 0.1
     */
    markerColorClass: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    /**
     * Default colorclass. These are predefined css-classnames you could use (or define one of your own):
     * 'red'  'blue'
     *
     * @attribute markerColorClass
     * @type {String}
     * @default null
     * @since 0.1
     */
    markerSize: {
        value: null,
        validator: function(v){ return (v===null) || (v==='small') || (v==='large') || (v==='extralarge'); }
    }

};

Y.Plugin.ITSAMapMarker = Y.extend(ITSAMapMarker, Y.Plugin.Base);

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAMapMarker');
    var instance = this;
    instance.host = instance.get('host');
    instance._renderer();
};

/**
 * @method renderer
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._renderer = function() {
    Y.log('renderer', 'info', 'ITSAMapMarker');
    var instance = this;
    instance.renderUI();
    instance.bindUI();
    instance.syncUI(true);
};

/**
 * Creates the containerdiv that holds all the markers
 *
 * @method renderUI
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.renderUI = function() {
    Y.log('renderUI', 'info', 'ITSAMapMarker');
    var instance = this,
        mapid = instance.host.mapid,
        mapNode = Y.one('#map_'+mapid),
        markerlayer, currentZoomedMapnode,
        markerColorClass = instance.get(MARKER_COLORCLASS) || '',
        markersize = instance.get(MARKER_SIZE) || '';
    if (mapNode) {
        markerlayer = instance._markerlayer = Node.create(Lang.sub(MARKER_LAYER_TEMPLATE, {mapid: mapid, colorclass: markerColorClass, markersize: markersize}));

        // at this moment we use the 'old' openstreetmap-module, so we need to reposition the layer:
        currentZoomedMapnode = instance.host.currentZoomedMap();
        markerlayer.setStyle('left', currentZoomedMapnode.getStyle('left'));
        markerlayer.setStyle('top', currentZoomedMapnode.getStyle('top'));
        mapNode.prepend(markerlayer);
    }
};

/**
 * Creates eventlistens
 *
 * @method bindUI
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.bindUI = function() {
    Y.log('bindUI', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS),
        eventhandlers;

    eventhandlers = instance._eventhandlers = [];
/*jshint expr:true */
    markers && markers.addTarget(instance);
/*jshint expr:false */
    eventhandlers.push(
        instance.after(
            MARKER+CAP_CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var prevVal = e.prevVal,
                    newVal = e.newVal;
                if (prevVal) {
                    prevVal.removeTarget(instance);
/*jshint expr:true */
                    newVal || instance._clearMarkers(); // if newVal exists, then syncUI() clear all prev
/*jshint expr:false */
                }
                if (newVal) {
                    instance.syncUI();
                    newVal.addTarget(instance);
                }
            }
        )
    );

    eventhandlers.push(
        instance.after(
            [MARKER_COLORCLASS+CAP_CHANGE, MARKER_SIZE+CAP_CHANGE],
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var markerlayer = instance._markerlayer,
                    newVal = e.newVal,
                    prevVal = e.prevVal;
/*jshint expr:true */
                prevVal && markerlayer.removeClass(prevVal);
                newVal && markerlayer.addClass(newVal);
/*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:add',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                instance._addMarker(e.model);
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:change',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var marker = e.target,
                    changed = e.changed,
                    noLatLon;
                if (marker instanceof Y.ITSAMarkerModel) {
                    YObject.some(
                        changed,
                        function(val, key) {
                            noLatLon = ((key!==LAT) && (key!==LON));
                            return noLatLon;
                        }
                    );
                    instance.syncMarker(marker, {positiononly: !noLatLon});
                }
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:remove',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                instance._removeMarker(e.model);
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:reset',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                instance.syncUI();
            }
        )
    );

};

/**
 * @method markerOnTop
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.getMarkerNode = function(marker) {
    var instance = this,
        clientid = (marker instanceof Y.ITSAMarkerModel) ? marker.get(CLIENTID) : marker[CLIENTID];
    return instance._markerlayer.one('[data-id="'+instance.host.mapid+'_'+clientid+'"]');
};


/**
 * @method hidePopup
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.hidePopup = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker);
/*jshint expr:true */
    markerNode && markerNode.setStyle('zIndex', marker._originalZindex);
/*jshint expr:false */
};

/**
 * @method markerOnTop
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.markerOnTop = function(marker) {
    var instance = this,
        newzindex = instance._getHighestZ()+1,
        markerNode = instance.getMarkerNode(marker);
    marker._zIndex = newzindex;
/*jshint expr:true */
    markerNode && markerNode.setStyle('zIndex', newzindex);
/*jshint expr:false */
};

/**
 * @method markerOnTop
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.markerRestoreZ = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker);
    marker._zIndex = null;
/*jshint expr:true */
    markerNode && markerNode.setStyle('zIndex', marker._originalZindex);
/*jshint expr:false */
};

/**
 * @method showPopup
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.showPopup = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker);
/*jshint expr:true */
    markerNode && markerNode.setStyle('zIndex', marker._originalZindex);
/*jshint expr:false */
};

/**
 * @method repositionMarkers
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.repositionMarkers = function() {
console.log('repositionMarkers');
    var instance = this,
        markers = instance.get(MARKERS);
    instance._markerlayer.addClass(HIDDEN_MARKERS);
    markers.each(
        Y.rbind(instance.syncMarker, instance, {positiononly: true})
    );
    instance._markerlayer.removeClass(HIDDEN_MARKERS);
};

/**
 * @method syncMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.syncMarker = function(marker, options) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        markervisible,
        positiononly = options && options.positiononly;
console.log('syncMarker');
    if (markerNode) {
        if (marker instanceof Y.ITSAMarkerModel) {
            instance._syncMarkerNode(
                markerNode,
                marker.get(LAT),
                marker.get(LON),
                positiononly || marker.get(MARKER+CAP_HEADER+TEMPLATE),
                positiononly || marker.get(MARKER+CAP_BODY+TEMPLATE),
                positiononly || marker.get(MARKER+CAP_FOOTER+TEMPLATE),
                positiononly || marker.get(MARKER+CAP_CLASSNAME),
                positiononly || marker.get(MARKER+CAP_COLORCLASS),
                positiononly || marker.get(MARKER_SIZE),
                positiononly || marker.get(MARKER+HTML),
                positiononly || marker.get(MARKER+CAP_VISIBLE),
                positiononly ? null : marker.toJSON()
            );
        }
        else {
            markervisible = marker[MARKER+CAP_VISIBLE];
            instance._syncMarkerNode(
                markerNode,
                marker[LAT],
                marker[LON],
                positiononly || marker[MARKER+CAP_HEADER+TEMPLATE],
                positiononly || marker[MARKER+CAP_BODY+TEMPLATE],
                positiononly || marker[MARKER+CAP_FOOTER+TEMPLATE],
                positiononly || marker[MARKER+CAP_CLASSNAME],
                positiononly || marker[MARKER+CAP_COLORCLASS],
                positiononly || marker[MARKER_SIZE],
                positiononly || marker[MARKER+HTML],
                positiononly || (typeof markervisible === 'boolean') ? markervisible : true,
                positiononly ? null : marker
            );
        }
    }
};

/**
 * syncs the whole modellist into
 * @method syncUI
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.syncUI = function(initialize) {
    Y.log('syncUI', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS),
        processMarkerML, processMarkerLML;
    processMarkerML = function(marker, index) {
        // marker is an instance of Y.ITSAMarkerModel
        var zindex = index+1;
        marker._originalZindex = zindex;
        instance._renderMarker(
            marker.toJSON(),
            marker.get(CLIENTID),
            marker.get(MARKER+CAP_HEADER+TEMPLATE),
            marker.get(MARKER+CAP_BODY+TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_COLORCLASS),
            marker.get(MARKER_SIZE),
            marker.get(MARKER+HTML),
            marker.get(MARKER+CAP_VISIBLE),
            zindex
        );
    };
    processMarkerLML = function(marker, index) {
        // marker is an object
        var zindex = index+1,
            markervisible = marker[MARKER+CAP_VISIBLE];
        marker._originalZindex = zindex;
        instance._renderMarker(
            marker,
            marker[CLIENTID],
            marker[MARKER+CAP_HEADER+TEMPLATE],
            marker[MARKER+CAP_BODY+TEMPLATE],
            marker[MARKER+CAP_FOOTER+TEMPLATE],
            marker[MARKER+CAP_CLASSNAME],
            marker[MARKER+CAP_COLORCLASS],
            marker[MARKER_SIZE],
            marker[MARKER+HTML],
            (typeof markervisible === 'boolean') ? markervisible : true,
            zindex
        );
    };
/*jshint expr:true */
    initialize || instance._clearMarkers();
/*jshint expr:false */
    instance._markerlayer.addClass(HIDDEN_MARKERS);
    // how to process the list will depend on the fact whether 'markers' is a ModelList or a LazyModelList
    markers.each((markers instanceof Y.LazyModelList) ? processMarkerLML : processMarkerML);
    instance._markerlayer.removeClass(HIDDEN_MARKERS);
};

/**
 * Cleans up bindings
 *
 * @method destructor
 * @protected
 * @since 0.3
*/
ITSAMapMarker.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS);

/*jshint expr:true */
    markers && markers.removeTarget(instance);
/*jshint expr:false */
    instance._markerlayer.destroy(true);
    instance._clearEventhandlers();
};

/**
 * @method _addMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._addMarker = function(marker) {
    var instance = this,
        zindex = instance._getHighestZ()+1,
        markervisible;
    marker._originalZindex = zindex;
    if (marker instanceof Y.ITSAMarkerModel) {
        instance._renderMarker(
            marker.toJSON(),
            marker.get(CLIENTID),
            marker.get(MARKER+CAP_HEADER+TEMPLATE),
            marker.get(MARKER+CAP_BODY+TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_COLORCLASS),
            marker.get(MARKER_SIZE),
            marker.get(MARKER+HTML),
            marker.get(MARKER+CAP_VISIBLE),
            zindex
        );
    }
    else {
        markervisible = marker[MARKER+CAP_VISIBLE];
        instance._renderMarker(
            marker,
            marker[CLIENTID],
            marker[MARKER+CAP_HEADER+TEMPLATE],
            marker[MARKER+CAP_BODY+TEMPLATE],
            marker[MARKER+CAP_FOOTER+TEMPLATE],
            marker[MARKER+CAP_CLASSNAME],
            marker[MARKER+CAP_COLORCLASS],
            marker[MARKER_SIZE],
            marker[MARKER+HTML],
            (typeof markervisible === 'boolean') ? markervisible : true,
            zindex
        );
    }
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSAMapMarker');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearMarkers
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._clearMarkers = function() {
    Y.log('_clearMarkers', 'info', 'ITSAMapMarker');
    var markerlayer = this._markerlayer;
    markerlayer.get('childNodes').destroy(true);
    markerlayer.empty(); // also call empty, for else the nodes are still in the DOM
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _getHighestZ
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._getHighestZ = function() {
    Y.log('_getHighestZ', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS),
        highestIndex = 0;
    markers.each(
        function(marker) {
            var markerindex = marker._zIndex || marker._originalZindex || 1;
/*jshint expr:true */
            (markerindex > highestIndex) && (highestIndex=markerindex);
/*jshint expr:false */
        }
    );
    return highestIndex;
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _getMarkerX
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._getMarkerX = function(lon, zoomlevel) {
    var instance = this,
        xNotRounded = instance._long2tileNOTROUNDED(lon, zoomlevel);
    return Math.round((xNotRounded-1)*TILE_SIZE);
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _getMarkerY
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._getMarkerY = function(lat, zoomlevel) {
    var instance = this,
        yNotRounded = instance._lat2tileNOTROUNDED(lat, zoomlevel);
    return Math.round((yNotRounded-1)*TILE_SIZE);
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearMarkers
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._long2tileNOTROUNDED = function(lon, zoomlevel) {
    return ((lon+180)/360*Math.pow(2,zoomlevel));
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearMarkers
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._lat2tileNOTROUNDED = function(lat, zoomlevel) {
    return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoomlevel));
};

/**
 * @method _removeMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._removeMarker = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker);
/*jshint expr:true */
    markerNode && markerNode.remove(true);
/*jshint expr:false */
};

/**
 * @method _renderMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._renderMarker = function(properties, clientid, headertemplate, bodytemplate, footertemplate, classname, colorclass, size, markerhtml, visible, zindex) {
    Y.log('_renderMarker', 'info', 'ITSAMapMarker');
    var instance = this,
        left, top, markerNode;
    markerNode = Node.create(
        Lang.sub(
            MARKER_TEMPLATE,
            {
                mapid: instance.host.mapid,
                clientid: clientid,
                classname: classname || '',
                colorclass: colorclass || '',
                markersize: size || '',
                markerhtml: markerhtml,
                header: headertemplate ? Lang.sub(headertemplate, properties) : '',
                body:  bodytemplate ? Lang.sub(bodytemplate, properties) : '',
                footer:  footertemplate ? Lang.sub(footertemplate, properties) : '',
                left: left,
                top: top,
                hidden: visible ? '' : (HIDDEN+'="'+HIDDEN+'" '),
                zindex: zindex
            }
        )
    );
    instance._markerlayer.append(markerNode);
    instance._syncMarkerNode(markerNode, properties[LAT], properties[LON]);
};

/**
 * @method _syncMarkerNode
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._syncMarkerNode = function(markerNode, lat, lon, headertemplate, bodytemplate, footertemplate, classname, colorclass, size, markerhtml, visible, properties) {
    Y.log('_syncMarkerNode', 'info', 'ITSAMapMarker');
    var instance = this,
        left, top, zoomlevel;

    zoomlevel = instance.host.currentZoomLevel;
console.log('_syncMarkerNode zoomlevel '+zoomlevel);
    left = instance._getMarkerX(lon, zoomlevel); // returns the left-position what it would have been when marker-width === 0
    top = instance._getMarkerY(lat, zoomlevel); // returns the top-position what it would have been when marker-height === 0
    left -= (Math.round(markerNode.get(OFFSETWIDTH)/2));
    top -= ((Math.round(markerNode.get(OFFSETHEIGHT)/2))+markerNode.one('.itsa-markerpin').get(OFFSETHEIGHT));
    markerNode.setStyle('left', left+PX);
    markerNode.setStyle('top', top+PX);
    if (properties) {
        markerNode.one('.itsa-markerheaderdetails').setHTML(headertemplate ? markerNode.setAttribute(DATA_HEADER, Lang.sub(headertemplate, properties)) : '');
        markerNode.one('.itsa-markerbodydetails').setHTML(bodytemplate ? markerNode.setAttribute(DATA_BODY, Lang.sub(bodytemplate, properties)) : '');
        markerNode.one('.itsa-markerfooterdetails').setHTML(footertemplate ? markerNode.setAttribute(DATA_FOOTER, Lang.sub(footertemplate, properties)) : '');
        markerNode.set('class', (size ? size+' ' : '')+(colorclass || '')+' itsa-mapmarker '+(classname || ''));
        markerNode.one('.itsa-markerballoon').setHTML(markerhtml);
/*jshint expr:true */
        visible ? markerNode.removeAttribute(HIDDEN) : markerNode.setAttribute(HIDDEN, HIDDEN);
/*jshint expr:false */
    }
};


}, '@VERSION@', {
    "requires": [
        "yui-base",
        "oop",
        "model-list",
        "lazy-model-list",
        "plugin",
        "node-core",
        "node-style",
        "gallery-itsamarkermodel"
    ],
    "skinnable": true
});
