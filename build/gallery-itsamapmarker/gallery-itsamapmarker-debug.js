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
    WIDTH_CONTROLLER = 60, // px
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
    WALKTHROUGHPOPUPS = 'walkThroughPopups',
    LAT = 'lat',
    LON = 'lon',
    EXTRAZ = 'extraZ',
    ITSA_ = 'itsa-',
    ITSA_MOBILE_WALKTHROUGH_HIDDEN = ITSA_+'mobile-walkthrough-'+HIDDEN,
    DETAILS = 'details',
    CAP_DETAILS_CLOSABLE = 'DetailsClosable',
    ITSA_MARKER = ITSA_+'marker',
    MARKER_DETAILS_CLASS = ITSA_MARKER+DETAILS,
    MARKER_BALLOON_CLASS = ITSA_MARKER+'balloon',
    VISIBLE_DETAILS_CLASS = DETAILS+'-visible',
    OUTOFRANGE_DETAILS_CLASS = DETAILS+'-outofrange',
    HEADER_DETAILS_CLASS = ITSA_+'markerheader'+DETAILS,
    BODY_DETAILS_CLASS = ITSA_+'markerbody'+DETAILS,
    FOOTER_DETAILS_CLASS = ITSA_+'markerfooter'+DETAILS,
    MARKER_COLORCLASS = MARKER+'ColorClass',
    MARKER_SIZE = MARKER+'Size',
    OFFSETWIDTH = 'offsetWidth',
    OFFSETHEIGHT = 'offsetHeight',
    MARKERMARGIN = 'markerMargin',
    DESTROYED = 'destroyed',
    AUTONUMBER = 'autoNumber',
    MARKERNUMBER = 'markerNumber',
    HIDDEN_MARKERS = 'itsa-all-markers-hidden',
    CLOSE_ICON = '<i class="itsaicon-dialog-error"></i>',
    CLOSEBUTTON_TEMPLATE = '<button class="pure-button itsa-closedetails" data-markerid="{clientid}">'+CLOSE_ICON+'</button>',
    MARKER_TEMPLATE = '<div data-id="{mapid}_{clientid}" class="{colorclass} itsa-mapmarker {classname}" {hidden}style="z-index:{zindex}">'+
                          '<div class="itsa-markerballoon {markersize}" data-markerid="{clientid}">{markerhtml}</div>'+
                          '<div class="itsa-markerpin"></div>'+
                          '<div class="'+DETAILS+'-fade '+OUTOFRANGE_DETAILS_CLASS+' '+MARKER_DETAILS_CLASS+'">'+
                                  '<div class="'+HEADER_DETAILS_CLASS+'">{header}{closebutton}</div>'+
                                  '<div class="'+BODY_DETAILS_CLASS+'">{body}</div>'+
                                  '<div class="'+FOOTER_DETAILS_CLASS+'">{footer}</div>'+
                                  '<div class="'+ITSA_+DETAILS+'-pin">'+'</div>'+
                          '</div>'+
                      '</div>',
    MARKER_LAYER_TEMPLATE = '<div id="map_markers_{mapid}" class="{markersize} itsa-mapmarker-container {colorclass}"></div>',
    WALKTHROUGH_TEMPLATE = '<div id="movewalkthrough_{mapid}" class="itsa-mobile-walkthrough">'+
                               '<button class="pure-button itsabutton-halfoval itsabutton-bordered itsabutton-onlyicon itsa-walkthrough-nav"><i class="itsaicon-arrows-left"></i></button>'+
                               '<button class="pure-button itsabutton-halfoval itsabutton-bordered itsabutton-onlyicon itsa-walkthrough-nav itsa-walknext"><i class="itsaicon-arrows-right"></i></button>'+
                            '</div>';

function ITSAMapMarker() {
    ITSAMapMarker.superclass.constructor.apply(this, arguments);
}

ITSAMapMarker.NAME = 'itsamapmarker';
ITSAMapMarker.NS = 'itsamapmarker';

ITSAMapMarker.ATTRS = {

    /**
     * Auto-number the marker-html - when no markerHTML is specified.
     *
     * @attribute autoNumber
     * @type {String}
     * @default false
     * @since 0.1
     */
    autoNumber: {
        value: false,
        validator: function(v){ return (typeof v === 'boolean'); }
    },

    /**
     * Shows and hides details-popup when the marker is clicked.
     * set true for single popup, det to 'multiple' for enabling multiple popups
     *
     * @attribute detailsOnClick
     * @type {Boolean|'multiple'}
     * @default false
     * @since 0.1
     */
    detailsOnClick: {
        value: false,
        validator: function(v){ return (typeof v === 'boolean') || (v==='multiple'); }
    },

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
     * List with the Markers, either Y.ITSAMarkerModel or objects.
     *
     * @attribute markers
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
    },

    /**
     * Makes it possible to walk through popups by keynavigating. For mobile browsers there will be buttons drawn
     *
     * @attribute walkThroughPopups
     * @type {String}
     * @default false
     * @since 0.1
     */
    walkThroughPopups: {
        value: false,
        validator: function(v){ return (typeof v === 'boolean'); }
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
    var instance = this,
        host;
    Y.use('gallerycss-itsa-dialog'); // asynchronously load iconfont
    instance._renderedPromise = new Y.Promise(function (resolve) {
        instance._resolveHandler = resolve;
    });
    host = instance.host = instance.get('host');
    instance._mobile = (Y.UA.mobile !== null);
    instance._currentPopup = [];
    host.renderPromise().then(Y.bind(instance._renderer, instance));
};

/**
 * @method renderer
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._renderer = function() {
    Y.log('renderer', 'info', 'ITSAMapMarker');
    var instance = this;
    instance.renderUI().then(
        function() {
            instance.bindUI();
        /*jshint expr:true */
            instance.get(AUTONUMBER) && instance._calcPosMarkers();
        /*jshint expr:false */
            instance.syncUI(true);
            instance._resolveHandler(); // resolving rendered-promise
        }
    );
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
        host = instance.host,
        mapid = host.mapid,
        markerlayer, currentZoomedMapnode,
        markerColorClass = instance.get(MARKER_COLORCLASS) || '',
        markersize = instance.get(MARKER_SIZE) || '',
        mapNode, hostContentbox;
    return Node.availablePromise('#map_'+mapid, 10000).then(
        function() {
            mapNode = Y.one('#map_'+mapid);
            markerlayer = instance._markerlayer = Node.create(Lang.sub(MARKER_LAYER_TEMPLATE, {mapid: mapid, colorclass: markerColorClass, markersize: markersize}));
            // at this moment we use the 'old' openstreetmap-module, so we need to reposition the layer:
            currentZoomedMapnode = instance.host.currentZoomedMap();
            markerlayer.setStyle('left', currentZoomedMapnode.getStyle('left'));
            markerlayer.setStyle('top', currentZoomedMapnode.getStyle('top'));
            mapNode.prepend(markerlayer);
            if (instance._mobile) {
                hostContentbox = host.get('contentBox');
                hostContentbox.toggleClass(ITSA_MOBILE_WALKTHROUGH_HIDDEN, !instance.get(WALKTHROUGHPOPUPS));
                hostContentbox.prepend(Lang.sub(WALKTHROUGH_TEMPLATE, {mapid: mapid}));
                Y.use('gallerycss-itsa-base', 'gallerycss-itsa-arrows');
            }
        }
    );
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
        contentbox = instance.host.get(CONTENTBOX),
        eventhandlers;

    eventhandlers = instance._eventhandlers = [];
/*jshint expr:true */
    markers && markers.addTarget(instance);
/*jshint expr:false */
    eventhandlers.push(
        instance.after(
            MARKERS+CAP_CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var prevVal = e.prevVal,
                    newVal = e.newVal,
                    centerview = instance._centerview,
                    markersinview = instance._markersinview;
                instance._currentPopup = [];
                if (prevVal) {
                    prevVal.removeTarget(instance);
/*jshint expr:true */
                    newVal || instance._clearMarkers(); // if newVal exists, then syncUI() clear all prev
/*jshint expr:false */
                }
                if (newVal) {
/*jshint expr:true */
                    instance.get(AUTONUMBER) && instance._calcPosMarkers();
/*jshint expr:false */
                    instance.syncUI();
                    newVal.addTarget(instance);
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
                var centerview = instance._centerview,
                    markersinview = instance._markersinview;
/*jshint expr:true */
                instance.get(AUTONUMBER) && instance._calcPosMarkers();
/*jshint expr:false */
                instance._addMarker(e.model);
/*jshint expr:true */
                centerview && instance.centerView(centerview);
                markersinview && !centerview && instance.markersInView(markersinview);
/*jshint expr:false */
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
                    atLeatOneValueChanged, noLatLon;
                if (marker instanceof Y.ITSAMarkerModel) {
                    YObject.some(
                        changed,
                        function(val, key) {
                            var islatlon = ((key===LAT) || (key===LON)),
                                // need to stringify, because they might be objects and therefor never tripple-equal
                                valueChanged = (Y.JSON.stringify(val.newVal) !== Y.JSON.stringify(val.prevVal));
                            if (valueChanged) {

                                atLeatOneValueChanged = valueChanged;
/*jshint expr:true */
                                !islatlon && (noLatLon=true);
/*jshint expr:false */
                            }
                            return valueChanged && noLatLon;
                        }
                    );
                    if (atLeatOneValueChanged) {
/*jshint expr:true */
                        instance.get(AUTONUMBER) && instance._calcPosMarkers();
/*jshint expr:false */
                        instance.syncMarker(marker, {positiononly: !noLatLon});
/*jshint expr:true */
                        centerview && instance.centerView(centerview);
                        markersinview && !centerview && instance.markersInView(markersinview);
/*jshint expr:false */
                    }
                }
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:remove',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var centerview = instance._centerview,
                    markersinview = instance._markersinview;
                instance._removeMarker(e.model);
/*jshint expr:true */
                centerview && instance.centerView(centerview);
                markersinview && !centerview && instance.markersInView(markersinview);
                if (instance.get(AUTONUMBER)) {
                    instance._calcPosMarkers();
                    instance.syncUI();
                }
/*jshint expr:false */
            }
        )
    );

    eventhandlers.push(
        instance.after(
            '*:reset',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var centerview = instance._centerview,
                    markersinview = instance._markersinview;
                if (e.src==='reset') {
                    instance._currentPopup = [];
/*jshint expr:true */
                    instance.get(AUTONUMBER) && instance._calcPosMarkers();
/*jshint expr:false */
                    instance.syncUI();
/*jshint expr:true */
                    centerview && instance.centerView(centerview);
                    markersinview && !centerview && instance.markersInView(markersinview);
/*jshint expr:false */
                }
            }
        )
    );

/*jshint expr:true */
    eventhandlers.push(
        markerlayer.delegate(
            'tap',
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

/*jshint expr:true */
    eventhandlers.push(
        markerlayer.delegate(
            'tap',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var balloon = e.currentTarget,
                    detailsOnClick = instance.get('detailsOnClick'),
                    markerid = detailsOnClick && balloon.getAttribute('data-markerid'),
                    marker, markerNode, detailsNode, isvisible;
                if (markerid) {
                    marker = instance.get(MARKERS).getByClientId(markerid);
                    markerNode = instance.getMarkerNode(marker),
                    detailsNode = markerNode && markerNode.one('.'+MARKER_DETAILS_CLASS);
                    if (detailsNode) {
                        isvisible = detailsNode.hasClass(VISIBLE_DETAILS_CLASS);
                        isvisible ? instance.hidePopup(marker) : instance.showPopup(marker, (detailsOnClick===true));
                    }
                }
            },
            '.itsa-markerballoon'
        )
    );
/*jshint expr:false */

    eventhandlers.push(
        Y.on('keydown', function(e) {
            var key = e.keyCode,
                keyLeft = (key===37) || (key===40),
                keyRight = (key===38) || (key===39),
                keyEsc = (key===27);
/*jshint expr:true */
            keyEsc && (instance.getCurrentPopupMarkers().length>0) && instance.hidePopup();
            if (instance.get(WALKTHROUGHPOPUPS)) {
                (keyLeft || keyRight) && e.preventDefault();
                keyLeft && instance.showPreviousPopup();
                keyRight && instance.showNextPopup();
            }
/*jshint expr:false */
        })
    );

    if (instance._mobile) {
        eventhandlers.push(
            contentbox.delegate(
                'tap',
                function(e) {
                    var shownext;
                    if (instance.get(WALKTHROUGHPOPUPS)) {
                        shownext = e.currentTarget.hasClass('itsa-walknext');
/*jshint expr:true */
                        shownext ? instance.showNextPopup() : instance.showPreviousPopup();
/*jshint expr:false */
                    }
                },
                '.itsa-walkthrough-nav'
            )
        );
        eventhandlers.push(
            instance.after(
                WALKTHROUGHPOPUPS+CAP_CHANGE,
                function(e) {
                    Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                    contentbox.toggleClass(ITSA_MOBILE_WALKTHROUGH_HIDDEN, !e.newVal);
                }
            )
        );

    }

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
    var instance = this;
    instance.readyPromise().then(
        function() {
            var host = instance.host,
                markers = options && options.markers,
                zoomin = options && options.zoomin,
                zoomout = options && options.zoomout,
                continuous = options && options.continuous,
                instancemarkers = instance.get(MARKERS),
                markerMargin = instance.get(MARKERMARGIN),
                newLat, newLon, minlat, maxlat, minlon, maxlon, lml, findMinMax, currentZoomLevel, contentbox, width, height, widthWithMargin, heightWithMargin,
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
                    (!minlon || (lon<minlon)) && (minlon=lon);
                    (!maxlon || (lon>maxlon)) && (maxlon=lon);
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
                if (markers.length===0) {
                    markers = instancemarkers;
                    markers.each(findMinMax);
                }
                else {
                    YArray.each(markers, findMinMax);
                }
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
                    width = contentbox.get(OFFSETWIDTH);
                    height = contentbox.get(OFFSETHEIGHT);
                    widthWithMargin = width-(2*markerMargin);
                    heightWithMargin = height-(2*markerMargin);
                    minx = host._getX(minlon, currentZoomLevel);
                    maxx = host._getX(maxlon, currentZoomLevel);
                    miny = host._getY(minlat, currentZoomLevel);
                    maxy = host._getY(maxlat, currentZoomLevel);
                    rangex = Math.abs(maxx - minx);
                    rangey = Math.abs(maxy - miny);
                    factorx = rangex/widthWithMargin;
                    factory = rangey/heightWithMargin;
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
                    // now we might need to shift, in case the popups fall out of range
                    // do this with delay, otherwise the position of the popups might not yet been updated
                    Y.later(300, instance, instance._shiftPopup);
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
                    instance.stopContCenterView();
                }
            }
        }
    );
};

/**
 * Returns an array of all the markerobjects that are currently popped-up.
 *
 * @method getCurrentPopupMarkers
 * @return {Array} [Y.ITSAMarkerModel] or [objects]
 * @since 0.1
*/
ITSAMapMarker.prototype.getCurrentPopupMarkers = function() {
    return this._currentPopup;
};

/**
 * @method markerOnTop
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.getMarkerNode = function(marker) {
    var instance = this,
        clientid = (marker instanceof Y.ITSAMarkerModel) ? marker.get(CLIENTID) : marker[CLIENTID];
    return instance._markerlayer && instance._markerlayer.one('[data-id="'+instance.host.mapid+'_'+clientid+'"]');
};

/**
 * @method hidePopup
 * @param markers {null|Array|Object|Y.ITSAMarkerModel} in case of Array, the items may be both objects or Y.ITSAMarkerModels
 * @since 0.1
*/
ITSAMapMarker.prototype.hidePopup = function(markers) {
    var instance = this;
/*jshint expr:true */
    markers || (markers=instance.get(MARKERS).toArray());
/*jshint expr:false */
    if (Lang.isArray(markers)) {
        YArray.each(markers, Y.bind(instance._hidePopup, instance));
    }
    else if ((markers instanceof Y.ITSAMarkerModel) || (typeof markers === 'object')) {
        instance._hidePopup(markers);
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
    var instance = this;
    instance.readyPromise().then(
        function() {
                var host = instance.host,
                markers = options && options.markers,
                zoomin = options && options.zoomin,
                continuous = options && options.continuous,
                instancemarkers = instance.get(MARKERS),
                markerMargin = instance.get(MARKERMARGIN),
                minlat, maxlat, minlon, maxlon, lml, findMinMax, currentZoomLevel, contentbox, halfwidth, halfheight, zoomedout,
                newZoomLevel, maxZoomLevel, minx, maxx, miny, maxy, currentlon, currentlat, allMarkersInside, width, height;
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
                    (!minlon || (lon<minlon)) && (minlon=lon);
                    (!maxlon || (lon>maxlon)) && (maxlon=lon);
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
                if (markers.length===0) {
                    markers = instancemarkers;
                    markers.each(findMinMax);
                }
                else {
                    YArray.each(markers, findMinMax);
                }
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
                width = contentbox.get(OFFSETWIDTH);
                height = contentbox.get(OFFSETHEIGHT);
                halfwidth = Math.round(width/2);
                halfheight = Math.round(height/2);
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
                // now we might need to shift, in case the popups fall out of range
                Y.later(300, instance, instance._shiftPopup);
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
                    instance.stopContMarkersInView();
                }
            }
        }
    );
};

/**
 * Promise that holds any stuff that should be done before the plugin is defined as 'ready'.
 * By default this promise is resolved right away. The intention is that it can be overridden in Plugin.Base extentions.<br /><br />
 * <b>Notion</b>It is not the intention to make a dircet call an promiseBeforeReady --> use readyPromise () instead,
 * because that promise if more efficient.
 *
 * @method promiseBeforeReady
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve() OR reject(reason).
 * @since 0.2
*/
ITSAMapMarker.promiseBeforeReady = function() {
    return this._renderedPromise;
};

/**
 * @method showNextPopup
 * @since 0.2
*/
ITSAMapMarker.prototype.showNextPopup = function() {
    var instance = this,
        firstPopup = instance._currentPopup[0],
        position = 0,
        markers, ml, nextmarker, markersize;
    markers = instance.get(MARKERS);
    ml = markers._isYUIModelList;
    if (firstPopup) {
        position = markers.indexOf(firstPopup);
        markersize = ml ? markers.size() : markers.length;
        if ((position===-1) || (position===(markersize-1))) {
            position = 0;
        }
        else {
            position++;
        }
    }
    nextmarker = ml ? markers.item(position) : markers[position];
    instance.showPopup(nextmarker, true);
};

/**
 * @method showPopup
 * @param markers {null|Array|Object|Y.ITSAMarkerModel} in case of Array, the items may be both objects or Y.ITSAMarkerModels
 * @params [hideOthers] {Boolean} hide other -currently visible- popups.
 * @since 0.1
*/
ITSAMapMarker.prototype.showPopup = function(markers, hideOthers) {
    var instance = this,
        markersIsArray = Lang.isArray(markers),
        markerIsItem = !markersIsArray && ((markers instanceof Y.ITSAMarkerModel) || (typeof markers === 'object')),
        allmarkers, index;
    if (markers && hideOthers) {
        allmarkers = instance.get(MARKERS).toArray();
        if (markersIsArray) {
            YArray.each(
                markers,
                function(onemarker) {
                    index = YArray.indexOf(allmarkers, onemarker);
/*jshint expr:true */
                    (index===-1) || allmarkers.splice(index, 1);
/*jshint expr:false */
                }
            );
        }
        else if (markerIsItem) {
            index = YArray.indexOf(allmarkers, markers);
/*jshint expr:true */
            (index===-1) || allmarkers.splice(index, 1);
/*jshint expr:false */
        }
       instance.hidePopup(allmarkers);
    }
/*jshint expr:true */
    markers || (markers=instance.get(MARKERS).toArray());
/*jshint expr:false */
    if (markersIsArray) {
        YArray.each(markers, Y.bind(instance._showPopup, instance));
    }
    else if (markerIsItem) {
        instance._showPopup(markers);
    }
    // now we might need to shift, in case the popups fall out of range
    Y.later(300, instance, instance._shiftPopup);
};

/**
 * @method showPreviousPopup
 * @since 0.2
*/
ITSAMapMarker.prototype.showPreviousPopup = function() {
    var instance = this,
        firstPopup = instance._currentPopup[0],
        position, markers, ml, previousmarker, markersize;
    markers = instance.get(MARKERS);
    ml = markers._isYUIModelList;
    markersize = ml ? markers.size() : markers.length;
    if (firstPopup) {
        position = markers.indexOf(firstPopup);
        if ((position===-1) || (position===0)) {
            position = markersize-1;
        }
        else {
            position--;
        }
    }
    else {
        position = markersize-1;
    }
    previousmarker = ml ? markers.item(position) : markers[position];
    instance.showPopup(previousmarker, true);
};

/**
 * Stops positions the map on the the center that was initiated by 'centerView({continuous: true})'.
 *
 * @method stopContCenterView
 * @since 0.1
*/
ITSAMapMarker.prototype.stopContCenterView = function() {
    this._centerview = null;
};

/**
 * Stops positions the map on the the center that was initiated by 'markersInView({continuous: true})'.
 *
 * @method stopContCenterView
 * @since 0.1
*/
ITSAMapMarker.prototype.stopContMarkersInView = function() {
    this._markersinview = null;
};

/**
 * @method repositionMarkers
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.repositionMarkers = function() {
    var instance = this,
        markers = instance.get(MARKERS);
/*jshint expr:true */
    instance._markerlayer && instance._markerlayer.addClass(HIDDEN_MARKERS);
/*jshint expr:false */
    markers.each(
        function(marker) {
            instance.syncMarker(marker, {positiononly: true});
        }
    );
/*jshint expr:true */
    instance._markerlayer && instance._markerlayer.removeClass(HIDDEN_MARKERS);
/*jshint expr:false */
};

/**
 * @method syncMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype.syncMarker = function(marker, options) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        autonumber = instance.get(AUTONUMBER),
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
                positiononly || marker.get(MARKER+HTML) || (autonumber ? marker.get(MARKERNUMBER) : ''),
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
                positiononly || marker[MARKER+HTML] || (autonumber ? marker[MARKERNUMBER] : ''),
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
        autonumber = instance.get(AUTONUMBER),
        processMarkerML, processMarkerLML;
    processMarkerML = function(marker, index) {
        // marker is an instance of Y.ITSAMarkerModel
        var zindex = marker.get(EXTRAZ)+index+1;
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
            marker.get(MARKER+HTML) || (autonumber ? marker.get(MARKERNUMBER) : ''),
            marker.get(MARKER+CAP_DETAILS_CLOSABLE),
            marker.get(MARKER+CAP_VISIBLE),
            zindex
        );
    };
    processMarkerLML = function(marker, index) {
        // marker is an object
        var zindex = (marker[EXTRAZ] || 0)+index+1,
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
            marker[MARKER+HTML] || (autonumber ? marker[MARKERNUMBER] : ''),
            marker[MARKER+CAP_DETAILS_CLOSABLE],
            (typeof markervisible === 'boolean') ? markervisible : true,
            zindex
        );
    };
/*jshint expr:true */
    initialize || instance._clearMarkers();
    instance._markerlayer && instance._markerlayer.addClass(HIDDEN_MARKERS);
    // how to process the list will depend on the fact whether 'markers' is a ModelList or a LazyModelList
    markers.each((markers instanceof Y.LazyModelList) ? processMarkerLML : processMarkerML);
    instance._markerlayer && instance._markerlayer.removeClass(HIDDEN_MARKERS);
/*jshint expr:false */
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
    instance._markerlayer && instance._markerlayer.destroy(true);
/*jshint expr:false */
    instance._clearEventhandlers();
};

/**
 * @method _addMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._addMarker = function(marker) {
    var instance = this,
        zindex = instance._getHighestZ(true)+1,
        autonumber = instance.get(AUTONUMBER),
        markervisible;
    if (marker instanceof Y.ITSAMarkerModel) {
        marker._originalZindex = marker.get(EXTRAZ)+zindex;
        instance._renderMarker(
            marker.toJSON(),
            marker.get(CLIENTID),
            marker.get(MARKER+CAP_HEADER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_BODY+CAP_TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+CAP_TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_COLORCLASS),
            marker.get(MARKER_SIZE),
            marker.get(MARKER+HTML) || (autonumber ? marker.get(MARKERNUMBER) : ''),
            marker.get(MARKER+CAP_DETAILS_CLOSABLE),
            marker.get(MARKER+CAP_VISIBLE),
            zindex
        );
    }
    else {
        marker._originalZindex = (marker[EXTRAZ] || 0)+zindex;
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
            marker[MARKER+HTML] || (autonumber ? marker[MARKERNUMBER] : ''),
            marker[MARKER+CAP_DETAILS_CLOSABLE],
            (typeof markervisible === 'boolean') ? markervisible : true,
            zindex
        );
    }
};

/**
 * Calculates the markerposition of all markers and adds it to an internal marker-property.
 * This property can be used when rendering the markerHTML.
 *
 * @method _calcPosMarkers
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._calcPosMarkers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS),
        lml = (markers.revive);
    instance.get(MARKERS).each(
        function(marker, i){
            if (lml) {
                marker[MARKERNUMBER] = i+1;
            }
            else {
                marker.set(MARKERNUMBER, i+1, {silent: true});
            }
        }
    );
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
 * @param originalZ {boolean} wether to inspect the original z-index regardless of added or temporarely higher z-indexes
 * @private
 * @since 0.3
 *
*/
ITSAMapMarker.prototype._getHighestZ = function(originalZ) {
    Y.log('_getHighestZ', 'info', 'ITSAMapMarker');
    var instance = this,
        markers = instance.get(MARKERS),
        highestIndex = 0;
    markers.each(
        function(marker) {
            var baseObject = (marker instanceof Y.ITSAMarkerModel),
                extraz = (originalZ && (baseObject ? marker.get(EXTRAZ) : marker[EXTRAZ])) || 0,
                markerindex = originalZ ? ((marker._originalZindex-extraz) || 1) : (marker._zIndex || marker._originalZindex || 1);
/*jshint expr:true */
            (markerindex > highestIndex) && (highestIndex=markerindex);
/*jshint expr:false */
        }
    );
    return highestIndex;
};

ITSAMapMarker.prototype._shiftPopup = function() {
    var instance = this,
        contentbox = instance.host.get(CONTENTBOX),
        contentboxMinX = contentbox.getX(),
        contentboxMaxX = contentboxMinX + contentbox.get(OFFSETWIDTH),
        contentboxMinY = contentbox.getY(),
        contentboxMaxY = contentboxMinY + contentbox.get(OFFSETHEIGHT),
        shiftleftx = 0,
        shiftrightx = 0,
        shifttopy = 0,
        shiftbottomy = 0,
        movex, movey;
    YArray.each(
        instance._currentPopup,
        function(marker) {
            var markerNode = instance.getMarkerNode(marker),
                baloonNode, detailsNode, markerShiftLeftX, markerShiftRightX, markerShiftTopY, markerShiftBottomY;
            if (markerNode) {
                detailsNode = markerNode.one('.'+MARKER_DETAILS_CLASS);
                baloonNode = markerNode.one('.'+MARKER_BALLOON_CLASS);
                markerShiftLeftX = contentboxMinX + baloonNode.get(OFFSETWIDTH) + WIDTH_CONTROLLER - detailsNode.getX();
                markerShiftRightX = detailsNode.getX() + detailsNode.get(OFFSETWIDTH) - contentboxMaxX;
                markerShiftTopY = contentboxMinY - detailsNode.getY();
                markerShiftBottomY = detailsNode.getY() + detailsNode.get(OFFSETHEIGHT) - contentboxMaxY;
    /*jshint expr:true */
                (markerShiftLeftX>shiftleftx) && (shiftleftx=markerShiftLeftX);
                (markerShiftRightX>shiftrightx) && (shiftrightx=markerShiftRightX);
                (markerShiftTopY>shifttopy) && (shifttopy=markerShiftTopY);
                (markerShiftBottomY>shiftbottomy) && (shiftbottomy=markerShiftBottomY);
    /*jshint expr:false */
            }
        }
    );
    movex = (shiftrightx===0) ? -shiftleftx : shiftrightx;
    movey = (shiftbottomy===0) ? -shifttopy : shiftbottomy;
    instance.host._moveMap(movex, movey);
};

/**
 * @method _hidePopup
 * @param markers {Object|Y.ITSAMarkerModel}
 * @private
 * @since 0.1
*/
ITSAMapMarker.prototype._hidePopup = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        detailsNode, position;
    if (markerNode) {
        detailsNode = markerNode.one('.'+MARKER_DETAILS_CLASS);
        detailsNode.removeClass(VISIBLE_DETAILS_CLASS);
        markerNode.setStyle('zIndex', marker._originalZindex);
        position = YArray.indexOf(instance._currentPopup, marker);
/*jshint expr:true */
        (position !== -1) && instance._currentPopup.splice(position, 1);
/*jshint expr:false */
        // delayed adding outofrange --> delay must be there, otherwise we don't see the fading effect (transistiontime 0.2sec)
        Y.later(200, null, function() {
            detailsNode.addClass(OUTOFRANGE_DETAILS_CLASS);
        });
    }
};

/**
 * @method _removeMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._removeMarker = function(marker) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        position = YArray.indexOf(instance._currentPopup, marker);
/*jshint expr:true */
    (position !== -1) && instance._currentPopup.splice(position, 1);
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
/*jshint expr:true */
    instance._markerlayer && instance._markerlayer.append(markerNode);
/*jshint expr:false */
    instance._syncMarkerNode(markerNode, properties[LAT], properties[LON]);
};

/**
 * @method _showPopup
 * @param marker {Object|Y.ITSAMarkerModel}
 * @params [hideOthers] {Boolean} hide other -currently visible- popups.
 * @private
 * @since 0.1
*/
ITSAMapMarker.prototype._showPopup = function(marker, hideOthers) {
    var instance = this,
        markerNode = instance.getMarkerNode(marker),
        newz = instance._getHighestZ()+1,
        detailsNode;
/*jshint expr:true */
    // carefull --> when called through Y.Array's ref-func, hideOthers is the index and should be ignored
    (typeof hideOthers==='boolean') && hideOthers && instance.hidePopup();
/*jshint expr:false */
    if (markerNode) {
        detailsNode = markerNode.one('.'+MARKER_DETAILS_CLASS);
        detailsNode.removeClass(OUTOFRANGE_DETAILS_CLASS);
        detailsNode.addClass(VISIBLE_DETAILS_CLASS);
        markerNode.setStyle('zIndex', newz);
        instance._currentPopup.push(marker);
    }
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
        markerNode.setAttribute('class', (size ? size+' ' : '')+(colorclass || '')+' itsa-mapmarker '+(classname || ''));
        balloon.setHTML(markerhtml);
/*jshint expr:true */
        visible ? markerNode.removeAttribute(HIDDEN) : markerNode.setAttribute(HIDDEN, HIDDEN);
/*jshint expr:false */
    }
};


}, '@VERSION@', {
    "requires": [
        "yui-base",
        "event-tap",
        "oop",
        "model-list",
        "lazy-model-list",
        "plugin",
        "node-core",
        "node-style",
        "node-screen",
        "json-stringify",
        "promise",
        "gallerycss-itsa-base",
        "gallery-itsanodepromise",
        "gallery-itsamarkermodel",
        "gallery-itsapluginpromise",
        "gallery-itsawidgetrenderpromise"
    ],
    "skinnable": true
});
