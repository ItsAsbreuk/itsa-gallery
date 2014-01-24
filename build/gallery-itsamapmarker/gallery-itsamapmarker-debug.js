YUI.add('gallery-itsamapmarker', function (Y, NAME) {

'use strict';
/*jshint maxlen:205 */

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

var Lang = Y.Lang,
    Node = Y.Node,
    YArray = Y.Array,
    YObject = Y.Object,
    MARKERS = 'markers',
    CAP_CHANGE = 'Change',
    CAP_TEMPLATE = 'Template',
    MARKER = 'marker',
    CAP_VISIBLE = 'Visible',
    CAP_HEADER = 'Header',
    CAP_BODY = 'Body',
    CAP_FOOTER = 'Footer',
    CAP_CLASSNAME = 'Classname',
    CAP_COLORCLASS = 'ColorClass',
    HTML = 'HTML',
    CLIENTID = 'clientId',
    CONTENTBOX = 'contentBox',
    PX = 'px',
    HIDDEN = 'hidden',
    LAT = 'lat',
    LON = 'lon',
    ITSA_ = 'itsa-',
    DETAILS = 'details',
    CAP_DETAILS_CLOSABLE = 'DetailsClosable',
    MARKER_DETAILS_CLASS = ITSA_+'marker'+DETAILS,
    VISIBLE_DETAILS_CLASS = DETAILS+'-visible',
    DETAILS_OUTOFRANGE_CLASS = DETAILS+'-outofrange',
    HEADER_DETAILS_CLASS = ITSA_+'markerheader'+DETAILS,
    BODY_DETAILS_CLASS = ITSA_+'markerbody'+DETAILS,
    FOOTER_DETAILS_CLASS = ITSA_+'markerfooter'+DETAILS,
    MARKER_COLORCLASS = MARKER+'ColorClass',
    MARKER_SIZE = MARKER+'Size',
    OFFSETWIDTH = 'offsetWidth',
    OFFSETHEIGHT = 'offsetHeight',
    MARKERMARGIN = 'markerMargin',
    DESTROYED = 'destroyed',
    HIDDEN_MARKERS = 'itsa-all-markers-hidden',
    CLOSEBUTTON_TEMPLATE = '<button class="pure-button itsa-closedetails" data-markerid="{clientid}">x</button>',
    MARKER_TEMPLATE = '<div data-id="{mapid}_{clientid}" class="{colorclass} itsa-mapmarker {classname}" {hidden}style="z-index:{zindex}">'+
                          '<div class="itsa-markerballoon {markersize}">{markerhtml}</div>'+
                          '<div class="itsa-markerpin"></div>'+
                          '<div class="'+DETAILS+'-fade '+DETAILS+'-outofrange '+MARKER_DETAILS_CLASS+'">'+
                                  '<div class="'+HEADER_DETAILS_CLASS+'">{header}{closebutton}</div>'+
                                  '<div class="'+BODY_DETAILS_CLASS+'">{body}</div>'+
                                  '<div class="'+FOOTER_DETAILS_CLASS+'">{footer}</div>'+
                                  '<div class="'+ITSA_+DETAILS+'-pin">'+'</div>'+
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
     *
     * @attribute detailsClosable
     * @type {String}
     * @default true
     * @since 0.1
     */
    markerDetailsClosable: {
        value: true,
        validator: function(v){ return (typeof v === 'boolean'); }
    },

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
     * Free margin of the map [px] where the markers should stay within when 'markersInView' or 'centerView' is called.
     *
     * @attribute markerMargin
     * @type {Int}
     * @default 80
     * @since 0.1
     */
    markerMargin: {
        value: 80,
        validator: function(v){ return (typeof v === 'number'); }
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
        markerlayer = instance._markerlayer,
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
                    centerview = instance._centerview,
                    markersinview = instance._markersinview,
                    latLon, noLatLon;
                if (marker instanceof Y.ITSAMarkerModel) {
                    YObject.some(
                        changed,
                        function(val, key) {
                            var islatlon = ((key===LAT) || (key===LON));
/*jshint expr:true */
                            islatlon ? (latLon=true) : (noLatLon=true);
/*jshint expr:false */
                            return (typeof latLon==='boolean') && (typeof noLatLon==='boolean');
                        }
                    );
                    instance.syncMarker(marker, {positiononly: !noLatLon});
/*jshint expr:true */
                    centerview && instance.centerView(centerview);
                    markersinview && !centerview && instance.markersInView(markersinview);
/*jshint expr:false */
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

    eventhandlers.push(
        instance.after(
            '*:reset',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                instance.syncUI();
            }
        )
    );

/*jshint expr:true */
    markerlayer && eventhandlers.push(
        markerlayer.delegate(
            'click',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var button = e.currentTarget,
                    markerid = button.getAttribute('data-markerid'),
                    marker = markerid && instance.get(MARKERS).getByClientId(markerid);
                marker && instance.hidePopup(marker);
            },
            '.itsa-closedetails'
        )
    );
/*jshint expr:false */

};

/**
 * Positions the map on the the center of all markers, specified with 'options.markers'.
 * If you also want all specified markers inside the view, use 'options.zoomout'.
 *
 * @method centerView
 * @params [options] {Object}
 * @param [options.markers] {Array|Y.ITSAMarkerModel|Object|null} hash, or one marker that needs to be view-centered. When not set, all markers are involved.
 * @param [options.zoomin] {Boolean|Number} whether to zoomin - while still keeping the specified markers inside the viewport - taken into account a margin specified by the attribute 'markerMargin'.
 * @param [options.zoomout] {Boolean} whether to zoomout -if needed- to make the specified markers inside the viewport. - taken into account a margin specified by the attribute 'markerMargin'.
 *                                    In case of a number, the zoom will not go beyond that zoom-level. If set 'true' the zoom will go as far as it can go.
 * @param [options.continuous] {Boolean} when set, the view keeps on centering everytime a marker changes it position.
 *                                       Will overrule 'markersInView.continuous' (if set)
 * @since 0.1
*/
ITSAMapMarker.prototype.centerView = function(options) {
    var instance = this,
        host = instance.host,
        markers = options && options.markers,
        zoomin = options && options.zoomin,
        zoomout = options && options.zoomout,
        continuous = options && options.continuous,
        instancemarkers = instance.get(MARKERS),
        markerMargin = instance.get(MARKERMARGIN),
        newLat, newLon, minlat, maxlat, minlon, maxlon, lml, findMinMax, currentZoomLevel, contentbox, width, height,
        rangex, rangey, optimizeScale, newZoomLevel, maxZoomLevel, minx, maxx, miny, maxy, factorx, factory;
    findMinMax = function(marker) {
        // marker can be both an object as well as a Model.
        // based on LML or ML
        var lat, lon;
        if (marker && (lml || !marker.get(DESTROYED))) {
            lat = lml ? marker[LAT] : marker.get(LAT);
            lon = lml ? marker[LON] : marker.get(LON);
/*jshint expr:true */
            (!minlat || (lat<minlat)) && (minlat=lat);
            (!maxlat || (lat>maxlat)) && (maxlat=lat);
            (!minlon || (lat<minlon)) && (minlon=lon);
            (!maxlon || (lat>maxlon)) && (maxlon=lon);
/*jshint expr:false */
        }
    };
/*jshint expr:true */
    markers || (markers=instancemarkers);
/*jshint expr:false */
    if (markers instanceof Y.ITSAMarkerModel) {
        newLat = markers.get(LAT);
        newLon = markers.get(LON);
    }
    else if (Lang.isArray(markers)) {
        lml = (instancemarkers instanceof Y.LazyModelList);
        YArray.each(markers, findMinMax);
    }
    else if (markers instanceof Y.ModelList) {
        lml = (instancemarkers instanceof Y.LazyModelList);
        markers.each(findMinMax);
    }
    else if (typeof markers === 'object') {
        newLat = markers[LAT];
        newLon = markers[LON];
    }
    if (minlat) {
        newLat = (minlat + maxlat)/2;
        newLon = (minlon + maxlon)/2;
    }
    if (newLat) {
        host.gotoPos(newLat, newLon);
        if (zoomin || zoomout) {
            if (!minlon) {
                // appearantly only 1 marker
                minlon = maxlon = newLon;
                minlat = maxlat = newLat;
            }
            newZoomLevel = currentZoomLevel = host.getZoomLevel();
            maxZoomLevel = host.getMaxZoomLevel();
            contentbox = host.get(CONTENTBOX);
            width = contentbox.get(OFFSETWIDTH)-(2*markerMargin);
            height = contentbox.get(OFFSETHEIGHT)-(2*markerMargin);
            minx = host._getX(minlon, currentZoomLevel);
            maxx = host._getX(maxlon, currentZoomLevel);
            miny = host._getY(minlat, currentZoomLevel);
            maxy = host._getY(maxlat, currentZoomLevel);
            rangex = Math.abs(maxx - minx);
            rangey = Math.abs(maxy - miny);
            factorx = rangex/width;
            factory = rangey/height;
            optimizeScale = Math.max(factorx, factory);
            if (zoomin) {
/*jshint expr:true */
                (typeof zoomin==='number') && (zoomin<maxZoomLevel) && (maxZoomLevel=zoomin);
/*jshint expr:false */
                while ((optimizeScale<0.5) && (newZoomLevel<maxZoomLevel)) {
                    optimizeScale = 2*optimizeScale;
                    newZoomLevel++;
                }
            }
            else if (zoomout) {
                while ((optimizeScale>1) && (newZoomLevel>0)) {
                    optimizeScale = optimizeScale/2;
                    newZoomLevel--;
                }
            }
/*jshint expr:true */
            (newZoomLevel!==currentZoomLevel) && host.zoom(newZoomLevel);
/*jshint expr:false */
        }
    }
    if (!options.fromInternal) {
        if (continuous) {
            instance._centerview = {
                markers: markers,
                zoomin: zoomin,
                zoomout: zoomout,
                fromInternal: true
            };
        }
        else {
            instance._centerview = null;
        }
    }
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
        markerNode = instance.getMarkerNode(marker),
        detailsNode;
    if (markerNode) {
        detailsNode = markerNode.one('.'+MARKER_DETAILS_CLASS);
        detailsNode.removeClass(VISIBLE_DETAILS_CLASS);
        markerNode.setStyle('zIndex', marker._originalZindex);
        Y.later(300, null, function() {
            // use try-catch for the node might have been removed from the dom
            try {
                detailsNode.addClass(DETAILS_OUTOFRANGE_CLASS);
            }
            catch(err) {}
        });
    }
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
 * Makes sure all markers (or those specified in 'options.markers') are inside the visible map - taken into account a margin specified by the attribute 'markerMargin'.
 * This is achieved by zooming-out when needed. If 'options.zoomin' is set, the view gets zoomed in as far is it can, or uptil a certain zoomlevel.
 * Does NOT reposition the layer. Use 'centerView' for that.
 *
 * @method markersInView
 * @params [options] {Object}
 * @param [options.markers] {Array|Y.ITSAMarkerModel|Object|null} hash, or one marker that needs to be inside the view. When not set, all markers are involved.
 * @param [options.zoomin] {Boolean|Number} whether to zoomin - while still keeping the specified markers inside the viewport.<br>
 *                                       In case of a number, the zoom will not go beyond that zoom-level. If set 'true' the zoom will go as far as it can go.
 * @param [options.continuous] {Boolean} when set, the specified markers will keep on staying in the view everytime a marker changes it position.<br>
 *                                       Will be overruled by 'centerView.continuous' (if set)
 * @since 0.1
*/
ITSAMapMarker.prototype.markersInView = function(options) {
    var instance = this,
        host = instance.host,
        markers = options && options.markers,
        zoomin = options && options.zoomin,
        continuous = options && options.continuous,
        instancemarkers = instance.get(MARKERS),
        markerMargin = instance.get(MARKERMARGIN),
        minlat, maxlat, minlon, maxlon, lml, findMinMax, currentZoomLevel, contentbox, halfwidth, halfheight, zoomedout,
        newZoomLevel, maxZoomLevel, minx, maxx, miny, maxy, currentlon, currentlat, allMarkersInside;
    findMinMax = function(marker) {
        // marker can be both an object as well as a Model.
        // based on LML or ML
        var lat, lon;
        if (marker && (lml || !marker.get(DESTROYED))) {
            lat = lml ? marker[LAT] : marker.get(LAT);
            lon = lml ? marker[LON] : marker.get(LON);
/*jshint expr:true */
            (!minlat || (lat<minlat)) && (minlat=lat);
            (!maxlat || (lat>maxlat)) && (maxlat=lat);
            (!minlon || (lat<minlon)) && (minlon=lon);
            (!maxlon || (lat>maxlon)) && (maxlon=lon);
/*jshint expr:false */
        }
    };
    allMarkersInside = function(zoomlevel) {
        var centerx, centery, lowerBoundaryX, lowerBoundaryY, upperBoundaryX, upperBoundaryY;
        centerx = host._getX(currentlon, zoomlevel);
        centery = host._getY(currentlat, zoomlevel);
        lowerBoundaryX = centerx - halfwidth + markerMargin;
        upperBoundaryX = centerx + halfwidth - markerMargin;
        lowerBoundaryY = centery - halfheight + markerMargin;
        upperBoundaryY = centery + halfheight - markerMargin;
        minx = host._getX(minlon, zoomlevel);
        maxx = host._getX(maxlon, zoomlevel);
        miny = host._getY(minlat, zoomlevel);
        maxy = host._getY(maxlat, zoomlevel);
        // cautious: miny and maxy might be the other way arround (due to negative lat-values)
        // thus always check if all values are within the range
        return (minx>lowerBoundaryX) && (minx<upperBoundaryX) &&
               (maxx>lowerBoundaryX) && (maxx<upperBoundaryX) &&
               (miny>lowerBoundaryY) && (miny<upperBoundaryY) &&
               (maxy>lowerBoundaryY) && (maxy<upperBoundaryY);
    };
/*jshint expr:true */
    markers || (markers=instancemarkers);
/*jshint expr:false */
    if (markers instanceof Y.ITSAMarkerModel) {
        minlat = maxlat = markers.get(LAT);
        minlon = maxlon = markers.get(LON);
    }
    else if (Lang.isArray(markers)) {
        lml = (instancemarkers instanceof Y.LazyModelList);
        YArray.each(markers, findMinMax);
    }
    else if (markers instanceof Y.ModelList) {
        lml = (instancemarkers instanceof Y.LazyModelList);
        markers.each(findMinMax);
    }
    else if (typeof markers === 'object') {
        minlat = maxlat = markers[LAT];
        minlon = maxlon = markers[LON];
    }
    if (minlat) {
        newZoomLevel = currentZoomLevel = host.getZoomLevel();
        maxZoomLevel = host.getMaxZoomLevel();
        contentbox = host.get(CONTENTBOX);
        halfwidth = Math.round(contentbox.get(OFFSETWIDTH)/2);
        halfheight = Math.round(contentbox.get(OFFSETHEIGHT)/2);
        currentlon = host.getLon();
        currentlat = host.getLat();
        // always zoomout when needed
        while (!allMarkersInside(newZoomLevel) && (newZoomLevel>0)) {
            zoomedout = true;
            newZoomLevel--;
        }
        if (zoomin && !zoomedout) {
/*jshint expr:true */
            (typeof zoomin==='number') && (zoomin<maxZoomLevel) && (maxZoomLevel=zoomin);
/*jshint expr:false */
            while (allMarkersInside(newZoomLevel+1) && ((newZoomLevel+1)<maxZoomLevel)) {
                newZoomLevel++;
            }
        }
/*jshint expr:true */
        (newZoomLevel!==currentZoomLevel) && host.zoom(newZoomLevel);
/*jshint expr:false */
    }
    if (!options.fromInternal) {
        if (continuous) {
            instance._markersinview = {
                markers: markers,
                zoomin: zoomin,
                fromInternal: true
            };
        }
        else {
            instance._markersinview = null;
        }
    }
};

/**
 * @method showPopup
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.showPopup = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        newz = instance._getHighestZ()+1,
        detailsNode;
    if (markerNode) {
        detailsNode = markerNode.one('.'+MARKER_DETAILS_CLASS);
        detailsNode.removeClass(DETAILS_OUTOFRANGE_CLASS).addClass(VISIBLE_DETAILS_CLASS);
        markerNode.setStyle('zIndex', newz);
    }
};

/**
 * @method repositionMarkers
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.repositionMarkers = function() {
    var instance = this,
        markers = instance.get(MARKERS);
    instance._markerlayer.addClass(HIDDEN_MARKERS);
    markers.each(
        function(marker) {
            instance.syncMarker(marker, {positiononly: true});
        }
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
    if (markerNode) {
        if (marker instanceof Y.ITSAMarkerModel) {
            instance._syncMarkerNode(
                markerNode,
                marker.get(LAT),
                marker.get(LON),
                positiononly || marker.get(CLIENTID),
                positiononly || marker.get(MARKER+CAP_HEADER+CAP_TEMPLATE),
                positiononly || marker.get(MARKER+CAP_BODY+CAP_TEMPLATE),
                positiononly || marker.get(MARKER+CAP_FOOTER+CAP_TEMPLATE),
                positiononly || marker.get(MARKER+CAP_CLASSNAME),
                positiononly || marker.get(MARKER+CAP_COLORCLASS),
                positiononly || marker.get(MARKER_SIZE),
                positiononly || marker.get(MARKER+HTML),
                positiononly || marker.get(MARKER+CAP_DETAILS_CLOSABLE),
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
                positiononly || marker[CLIENTID],
                positiononly || marker[MARKER+CAP_HEADER+CAP_TEMPLATE],
                positiononly || marker[MARKER+CAP_BODY+CAP_TEMPLATE],
                positiononly || marker[MARKER+CAP_FOOTER+CAP_TEMPLATE],
                positiononly || marker[MARKER+CAP_CLASSNAME],
                positiononly || marker[MARKER+CAP_COLORCLASS],
                positiononly || marker[MARKER_SIZE],
                positiononly || marker[MARKER+HTML],
                positiononly || marker[MARKER+CAP_DETAILS_CLOSABLE],
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
            marker.get(MARKER+CAP_HEADER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_BODY+CAP_TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_COLORCLASS),
            marker.get(MARKER_SIZE),
            marker.get(MARKER+HTML),
            marker.get(MARKER+CAP_DETAILS_CLOSABLE),
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
            marker[MARKER+CAP_HEADER+CAP_TEMPLATE],
            marker[MARKER+CAP_BODY+CAP_TEMPLATE],
            marker[MARKER+CAP_FOOTER+CAP_TEMPLATE],
            marker[MARKER+CAP_CLASSNAME],
            marker[MARKER+CAP_COLORCLASS],
            marker[MARKER_SIZE],
            marker[MARKER+HTML],
            marker[MARKER+CAP_DETAILS_CLOSABLE],
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
            marker.get(MARKER+CAP_HEADER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_BODY+CAP_TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_COLORCLASS),
            marker.get(MARKER_SIZE),
            marker.get(MARKER+HTML),
            marker.get(MARKER+CAP_DETAILS_CLOSABLE),
            marker.get(MARKER+CAP_VISIBLE),
            zindex
        );
    }
    else {
        markervisible = marker[MARKER+CAP_VISIBLE];
        instance._renderMarker(
            marker,
            marker[CLIENTID],
            marker[MARKER+CAP_HEADER+CAP_TEMPLATE],
            marker[MARKER+CAP_BODY+CAP_TEMPLATE],
            marker[MARKER+CAP_FOOTER+CAP_TEMPLATE],
            marker[MARKER+CAP_CLASSNAME],
            marker[MARKER+CAP_COLORCLASS],
            marker[MARKER_SIZE],
            marker[MARKER+HTML],
            marker[MARKER+CAP_DETAILS_CLOSABLE],
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
ITSAMapMarker.prototype._renderMarker = function(properties, clientid, headertemplate, bodytemplate, footertemplate, classname, colorclass, size, markerhtml, closebtn, visible, zindex) {
    Y.log('_renderMarker', 'info', 'ITSAMapMarker');
    var instance = this,
        withclosebutton = (typeof closebtn === 'boolean') ? closebtn : instance.get(MARKER+CAP_DETAILS_CLOSABLE),
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
                closebutton: withclosebutton ? Lang.sub(CLOSEBUTTON_TEMPLATE, {clientid: clientid}) : '',
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
ITSAMapMarker.prototype._syncMarkerNode = function(markerNode, lat, lon, clientid, headertemplate, bodytemplate, footertemplate, classname, colorclass, size, markerhtml, closebtn, visible, properties) {
    Y.log('_syncMarkerNode', 'info', 'ITSAMapMarker');
    var instance = this,
        host = instance.host,
        withclosebutton = (typeof closebtn === 'boolean') ? closebtn : instance.get(MARKER+CAP_DETAILS_CLOSABLE),
        left, top, zoomlevel, headerdetails, bodydetails, footerdetails, balloon;

    zoomlevel = host.currentZoomLevel;
    left = host._getX(lon, zoomlevel); // returns the left-position what it would have been when marker-width === 0
    top = host._getY(lat, zoomlevel); // returns the top-position what it would have been when marker-height === 0
    left -= (Math.round(markerNode.get(OFFSETWIDTH)/2));
    top -= ((Math.round(markerNode.get(OFFSETHEIGHT)/2))+markerNode.one('.itsa-markerpin').get(OFFSETHEIGHT));
    markerNode.setStyle('left', left+PX);
    markerNode.setStyle('top', top+PX);
    if (properties) {
        headerdetails = markerNode.one('.'+HEADER_DETAILS_CLASS);
        bodydetails = markerNode.one('.'+BODY_DETAILS_CLASS);
        footerdetails = markerNode.one('.'+FOOTER_DETAILS_CLASS);
        balloon = markerNode.one('.itsa-markerballoon');
        headerdetails.get('childNodes').destroy(true);
        bodydetails.get('childNodes').destroy(true);
        footerdetails.get('childNodes').destroy(true);
        balloon.get('childNodes').destroy(true);
        headerdetails.setHTML((headertemplate ? Lang.sub(headertemplate, properties) : '')+(withclosebutton ? Lang.sub(CLOSEBUTTON_TEMPLATE, {clientid: clientid}) : ''));
        bodydetails.setHTML(bodytemplate ? Lang.sub(bodytemplate, properties) : '');
        footerdetails.setHTML(footertemplate ? Lang.sub(footertemplate, properties) : '');
        markerNode.set('class', (size ? size+' ' : '')+(colorclass || '')+' itsa-mapmarker '+(classname || ''));
        balloon.setHTML(markerhtml);
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
