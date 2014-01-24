YUI.add('gallery-itsaopenstreetmap', function (Y, NAME) {


'use strict';
/*jshint maxlen:200 */

/**
 *
 * This module adds some static methods to the Y.Node class that can be used to controll node-availabilities.<br />
 *
 * @module gallery-itsanodepromise
 * @extends Node
 * @class Y.Node
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/
var TILE_SIZE = 256; // standard 256 pixels

Y.ITSAOpenStreetMap = Y.Base.create('itsaopenstreetmap', Y.Widget, [], {
/*
* use is very easy:
* 1) get a nodeinstance fi:  myNode=Y.one('#div1');
* 2) myNode.plug(Y.Plugin.CMASMAPS);
* 3) myNode.cmaseditor.saveContent({success: handleaftersuccess}); // or any other functioncall
*
* Important: plug it in the master node (example: #obj1), not in the nestnode!
*/
        doLoadImagesOutsieViewPort : false, // should be TRUE, but during buildup imagesserver, it should remain false --> because tiles will mostly come from openstreetmaps and we do not want delays
        autoresizeLayer : true,
        mapid : null,
        oldX : 0,
        oldY : 0,
        layerMadeVisible : false,
        currentLatitude : null,
        currentLongitude : null,
        currentZoomLevel : null,
        imageque : null,
        dragStarted : false,
        pauzedBySubRoutine : false,
        q : new Y.AsyncQueue(),
        restartque : null,
        osXLion : false,
        zoomInByScrollPermitted : true,
        zoomOutByScrollPermitted : true,
        markers : [],
        scrollEvent : null,
        mobiledevice : false,
        macUser : false,
        _zoomTimer : null,
        pasiveTimeAfterZoom : 200, //ms to prevent multiple zoomlevels when scrolling
        minimumZoomValue : 1, // before zooming starts (valid values are integers starting with 1)
        TILE_SIZE: 256, // standard 256 pixels
        TIME_OUT_VIEW: 10000, // 10 sec
        QUESTION_MARKED_IMAGE_ALLOWED: true, // so we may put ?timestamp behind imagereferences --> on server brongegevens.nl this is not an issue because timestamp is placed within subdomain

        initializer : function() {
            Y.log('initializer', 'cmaserror', 'CMASMAPS');
            var instance = this,
                isOSXLion;
            isOSXLion = function() {
                var userAgent, pattern, patternresult, osxVersionString, osxVersion, isLion = false;
                if (Y.UA.os==='macintosh') {
                    userAgent = Y.UA.userAgent;
                    pattern = new RegExp('OS X \\d+[\\._]?\\d*[\\._]?\\d*', 'i');
                    patternresult = userAgent.match(pattern);
                    if (patternresult!==null) {
                        osxVersionString = patternresult[0].substring(5);
                        osxVersionString = osxVersionString.replace(/_/g,'.');
                        osxVersion = parseFloat(osxVersionString);
                        if (osxVersion>10.6999) {isLion=true;}
                    }
                }
                return isLion;
            };
            instance.mapid = Y.guid();
            instance.mobiledevice = (Y.UA.mobile !== null);
            instance.osXLion = isOSXLion();
            instance.macUser = (Y.UA.os==='macintosh');
            if (instance.macUser) {instance.pasiveTimeAfterZoom=1250;} // in combination with NOT redefining timer in function _handleMouseScroll !!!
        },

        addMarker : function(config) {
            // config is an object --> posible parameters are the attibutes of Y.ITSAMapMarker, except from 'host', that one will be generated in this function
            Y.log('addMarker', 'cmaserror', 'CMASMAPS');
            var instance = this;
            if (!config) {config = {};}
            Y.use('gallery-itsamapmarker', function(Y) {
                Y.on('contentready', function(config) {
                    var nextIndex;
                    config.host = Y.one('#map_markers_' + instance.mapid);
                    nextIndex = instance.markers.length;
                    instance.markers[nextIndex] = new Y.ITSAMapMarker(config);
                    instance.markers[nextIndex].render(instance.currentZoomLevel);
                }, '#map_'+instance.mapid, instance, config);
            });
        },

        centerLayerBasedUponMarkers : function(autozoom, deepestZoomlevelWhenCentered, deviceid) {
            Y.log('centerLayerBasedUponMarkers', 'cmaserror', 'CMASMAPS');
            var instance, minlat=0, maxlat=0, minlon=0, maxlon=0, i, total, marker, lat, lon, markerObject,
                zoom, viewportwidth, viewportheight, pixelsdifferencex, pixelsdifferencey, pointswithinzoomarea = false, paddingarea;
            instance = this;
            if (deviceid) {
                markerObject = instance._getMarkerObj(deviceid);
                if (markerObject) {
                    instance.currentLatitude = markerObject.get('lat');
                    instance.currentLongitude = markerObject.get('lon');
                }
            }
            else {
                total = instance.markers.length;
                if (total>0) {
                    marker = instance.markers[0];
                    minlat = marker.get('lat');
                    minlon = marker.get('lon');
                    maxlat = minlat;
                    maxlon = minlon;
                }
                for (i=1; i<total; i++) {
                    marker = instance.markers[i];
                    lat = marker.get('lat');
                    lon = marker.get('lon');
                    if (lat<minlat) {minlat=lat;}
                    if (lat>maxlat) {maxlat=lat;}
                    if (lon<minlon) {minlon=lon;}
                    if (lon>maxlon) {maxlon=lon;}
                }
                instance.currentLatitude = (minlat + maxlat)/2;
                instance.currentLongitude = (minlon + maxlon)/2;
            }
            if (autozoom) {
                if (deviceid) {zoom=deepestZoomlevelWhenCentered;}
                else {
                    zoom=3;
                    paddingarea = 40; // all points should be at least 40px aside border
                    viewportwidth = instance._getViewPortWidth()-(2*paddingarea);
                    viewportheight = instance._getViewPortHeight()-(2*paddingarea);
                    for (zoom=deepestZoomlevelWhenCentered; ((zoom>0) && !pointswithinzoomarea); zoom--) {
                        pixelsdifferencex = Math.abs(instance.TILE_SIZE * (instance._long2tileNOTROUNDED(maxlon, zoom) - instance._long2tileNOTROUNDED(minlon, zoom)));
                        pixelsdifferencey = Math.abs(instance.TILE_SIZE * (instance._lat2tileNOTROUNDED(maxlat, zoom) - instance._lat2tileNOTROUNDED(minlat, zoom)));
                        pointswithinzoomarea = ((pixelsdifferencex<viewportwidth) && (pixelsdifferencey<viewportheight));
                    }
                    // zoom is now 1 below the value at which the crireia was right. This is OK: you don't need to zoom in all detail
                }
                instance.viewZoomLayer(zoom);
            }
            else {
                instance.loadImagesActiveLayer(false, true);
                //instance.repositionLayer();
            }
        },

        zoomOutLayerToFitBasedUponMarkers : function(center, deviceids) {
            Y.log('zoomOutLayerToFitBasedUponMarkers', 'cmaserror', 'CMASMAPS');
            var instance, minlat=0, maxlat=0, minlon=0, maxlon=0, i, total, marker, lat, lon, oldzoom, zoom, markers, centerX, centerY,
                maxdifferenceleft, maxdifferenceright, maxdifferencebottom, maxdifferencetop, minX, maxX, minY, maxY, pointswithinzoomarea = false,
                paddingarealeft, paddingarearight, paddingareatop, paddingareabottom, liNode, deviceid, firstmarker;
            instance = this;
            if (instance.dragStarted) {return;}
            paddingarealeft = 15; // all points should be at least 40px aside border
            paddingarearight = 150; // all points should be at least 40px aside border
            paddingareatop = 140; // all points should be at least 40px aside border
            paddingareabottom = 0; // all points should be at least 40px aside border
            if (deviceids && !deviceids.isEmpty()) { // nodelist
                firstmarker = true;
                for (i=0; i<deviceids.size(); i++) {
                    liNode = deviceids.item(i);
                    deviceid = liNode.getData('deviceid');
                    if (deviceid) {
                        marker = instance._getMarkerObj(deviceid);
                        if (marker) {
                            lat = marker.get('lat');
                            lon = marker.get('lon');
                            if (firstmarker || (lat<minlat)) {minlat=lat;}
                            if (firstmarker || (lat>maxlat)) {maxlat=lat;}
                            if (firstmarker || (lon<minlon)) {minlon=lon;}
                            if (firstmarker || (lon>maxlon)) {maxlon=lon;}
                            firstmarker = false;
                        }
                    }
                }
            }
            else { // all markers
                markers=instance.markers;
                total = markers.length;
                if (total>0) {
                    marker = markers[0];
                    minlat = marker.get('lat');
                    minlon = marker.get('lon');
                    maxlat = minlat;
                    maxlon = minlon;
                }
                for (i=1; i<total; i++) {
                    marker = markers[i];
                    lat = marker.get('lat');
                    lon = marker.get('lon');
                    if (lat<minlat) {minlat=lat;}
                    if (lat>maxlat) {maxlat=lat;}
                    if (lon<minlon) {minlon=lon;}
                    if (lon>maxlon) {maxlon=lon;}
                }
            }

            maxdifferenceleft = Math.round(instance._getViewPortWidth()/2)-paddingarealeft;
            maxdifferenceright = Math.round(instance._getViewPortWidth()/2)-paddingarearight;
            maxdifferencetop = Math.round(instance._getViewPortHeight()/2)-paddingareatop;
            maxdifferencebottom = Math.round(instance._getViewPortHeight()/2)-paddingareabottom;


            oldzoom = instance.currentZoomLevel;
            centerX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(instance.currentLongitude, oldzoom);
            centerY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(instance.currentLatitude, oldzoom);

            // CAUTIOUS: maxY and minY calculated contraversus: more in the north, lat is bigger, but the maps start counting top-down!
            maxY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(minlat, oldzoom);
            minY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(maxlat, oldzoom);
            minX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(minlon, oldzoom);
            maxX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(maxlon, oldzoom);

            pointswithinzoomarea = ((minX>(centerX-maxdifferenceleft)) && (maxX<(centerX+maxdifferenceright)) && (minY>(centerY-maxdifferencetop)) && (maxY<(centerY+maxdifferencebottom)));
            if (!pointswithinzoomarea) {center=true;}
            if (center) {
                instance.currentLatitude = (minlat + maxlat)/2;
                instance.currentLongitude = (minlon + maxlon)/2;
                centerX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(instance.currentLongitude, oldzoom);
                centerY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(instance.currentLatitude, oldzoom);
            }
            if (total<2) {pointswithinzoomarea=true;}
            else {pointswithinzoomarea = ((minX>(centerX-maxdifferenceleft)) && (maxX<(centerX+maxdifferenceright)) && (minY>(centerY-maxdifferencetop)) && (maxY<(centerY+maxdifferencebottom)));}
            if (!pointswithinzoomarea) {
                for (zoom=oldzoom-1; ((zoom>0) && !pointswithinzoomarea); zoom--) {
                    centerX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(instance.currentLongitude, zoom);
                    centerY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(instance.currentLatitude, zoom);
                    // CAUTIOUS: maxY and minY calculated contraversus: more in the north, lat is bigger, but the maps start counting top-down!
                    maxY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(minlat, zoom);
                    minY = instance.TILE_SIZE * instance._lat2tileNOTROUNDED(maxlat, zoom);
                    minX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(minlon, zoom);
                    maxX = instance.TILE_SIZE * instance._long2tileNOTROUNDED(maxlon, zoom);
                    pointswithinzoomarea = ((minX>(centerX-maxdifferenceleft)) && (maxX<(centerX+maxdifferenceright)) && (minY>(centerY-maxdifferencetop)) && (maxY<(centerY+maxdifferencebottom)));
                }
                // zoom is now 1 below the value at which the criteria was right. that is why we need to increase it by 1
                instance.viewZoomLayer(zoom+1);
            }
            else {
                if (center) {
                    instance.loadImagesActiveLayer(false, true);
                    //instance.repositionLayer();
                }
            }
        },

        updateMarker : function(config) {
            // config is an object --> posible parameters are the attibutes of Y.ITSAMapMarker, except from 'host', that one will be generated in this function
//            Y.log('updateMarker', 'cmaserror', 'CMASMAPS');
            var instance = this,
                markerObject;
            if (config && config.markerid) {
                markerObject = instance._getMarkerObj(config.markerid);
                if (markerObject) {
                    if (config.lat) {markerObject.set('lat', config.lat);}
                    if (config.lon) {markerObject.set('lon', config.lon);}
                    if (config.position) {markerObject.set('position', config.position);}
                    if (config.size || (config.size===0)) {markerObject.set('size', config.size);}
                    if (config.status || (config.status===0)) {markerObject.set('status', config.status);}
                    if (config.selected) {markerObject.set('selected', 1);}
                    else {markerObject.set('selected', 0);}
                    if (config.error) {markerObject.set('error', 1);}
                    else {markerObject.set('error', 0);}
                    if (config.zIndex) {markerObject.set('zIndex', config.zIndex);}
                    if (config.gmt) {markerObject.set('gmt', config.gmt);}
                    if (config.battery) {markerObject.set('battery', config.battery);}
                    if (config.accu) {markerObject.set('accu', config.accu);}
                    if (config.gsm) {markerObject.set('gsm', config.gsm);}
                    if (config.speed) {markerObject.set('speed', config.speed);}
                    if (config.distance) {markerObject.set('distance', config.distance);}
                    if (config.md1) {markerObject.set('md1', config.md1);}
                    if (config.md2) {markerObject.set('md2', config.md2);}
                    markerObject.syncUI();
                    if (config.showInfo!==undefined) {markerObject.set('showInfo', config.showInfo);}
                }
            }
        },

        _getMarkerObjOldFunc : function (markerid) {
            var instance, i, markerobj = null;
            instance = this;
            for (i=0; ((i<instance.markers.length) && !markerobj); i++) {
                if (instance.markers[i].get('markerid')===markerid) {markerobj = instance.markers[i];}
             }
            return markerobj;
        },

        _getMarkerObj : function (markerid) {
            var instance, i, markerobj = null;
            instance = this;
            i = instance._getMarkerIndex(markerid);
            if (i!==-1) {markerobj = instance.markers[i];}
            return markerobj;
        },

        _getMarkerIndex : function (markerid) {
            var instance, i, found=false;
            instance = this;
            for (i=0; ((i<instance.markers.length) && !found); i++) {
                found = (instance.markers[i].get('markerid')===markerid);
            }
            if (!found) {i=-1;}
            else {i--;}
            return i;
        },

        getMarkersCount : function() {
            return this.markers.length;
        },

        clearOneMarker : function(markerid) {
            var instance, markerObj, i;
            instance = this;
            i = instance._getMarkerIndex(markerid); // Find the index
            if (i!==-1) {
                markerObj = instance._getMarkerObj(markerid);
                instance.markers.splice(i, 1); // remove from array
                if (markerObj) {markerObj.destroy();}
            }
        },

        clearAllMarkers : function() {
            Y.log('clearAllMarkers', 'cmaserror', 'CMASMAPS');
            var instance, i;
            instance = this;
            for (i=0; i<instance.markers.length; i++) {instance.markers[i].destroy();}
            instance.markers.length = 0; // clear array
        },

        clearAllMarkerInfo : function() {
            Y.log('clearAllMarkers', 'cmaserror', 'CMASMAPS');
            var instance, i;
            instance = this;
            for (i=0; i<instance.markers.length; i++) {instance.markers[i].hideInfo();}
        },

        renderUI : function() {
            Y.log('renderUI', 'cmaserror', 'CMASMAPS');
            var instance, i, newContent, metaviewport;
            instance = this;
            instance._hideMap();
            // first of all: disable user from zoomin with mobile devices --> for they might not get zoomed-out because the map supports drag and drop
            if (instance.mobiledevice) {
                metaviewport = Y.one('meta[name=viewport]');
                if (metaviewport) {metaviewport.set('content', 'user-scalable=0');}
                else {Y.one('head').prepend('<meta name="viewport" content="user-scalable=0" />');}
            }
            instance.currentLatitude = instance.get('lat');
            instance.currentLongitude = instance.get('lon');
            instance.currentZoomLevel = instance.get('zoomLevel');
            instance.get('boundingBox').setStyle('overflow', 'hidden');
            newContent = "<div class='cmasmapshadowleft'></div>";
            newContent += "<div class='cmasmapshadowtop'></div>";
            newContent += "<div id='map_" + instance.mapid + "' class='cmasmap'>";
            for (i=0;i<=17; i++) {newContent += "<div id='map_zoom" + i + "_" + instance.mapid + "' class='cmasmap'></div>";}
            newContent += "</div>";
            if (instance.mobiledevice) {
                newContent += "<div id='movecontainer_" + instance.mapid + "' class='cmasmovecontainer cmasmobile'>";
                    newContent += "<div id='movehome_" + instance.mapid + "' class='cmasmapcontrol cmasmobile' style='top:1px;'></div>";
                    newContent += "<div id='zoomin_" + instance.mapid + "' class='cmasmapcontrol cmasmobile' style='top:66px;'></div>";
                    newContent += "<div id='zoomout_" + instance.mapid + "' class='cmasmapcontrol cmasmobile' style='top:132px;'></div>";
                newContent += "</div>";
            }
            else {
                newContent += "<div id='movecontainer_" + instance.mapid + "' class='cmasmovecontainer'>";
                    newContent += "<div id='moveup_" + instance.mapid + "' class='cmasmapcontrol' style='left:22px; top:4px;'></div>";
                    newContent += "<div id='movedown_" + instance.mapid + "' class='cmasmapcontrol' style='left:22px; top:40px;'></div>";
                    newContent += "<div id='moveleft_" + instance.mapid + "' class='cmasmapcontrol' style='left:4px; top:22px;'></div>";
                    newContent += "<div id='moveright_" + instance.mapid + "' class='cmasmapcontrol' style='left:40px; top:22px;'></div>";
                    newContent += "<div id='movehome_" + instance.mapid + "' class='cmasmapcontrol' style='left:22px; top:22px;'></div>";
                newContent += "</div>";
                newContent += "<div id='zoomcontainer_" + instance.mapid + "' class='cmaszoomcontainer'>";
                    newContent += "<div id='zoomin_" + instance.mapid + "' class='cmasmapcontrol' style='left:5px; top:6px;'></div>";
                    newContent += "<div id='zoomout_" + instance.mapid + "' class='cmasmapcontrol' style='left:5px; top:205px;'></div>";
                    newContent += "<div id='zoomhandleconstraint_" + instance.mapid + "' class='cmaszoomhandleconstraint'>";
                        newContent += "<div id='zoomhandle_" + instance.mapid + "' class='cmaszoomhandle'></div>";
                    newContent += "</div>";
                newContent += "</div>";
            }
            newContent += "<div id='busywait_" + instance.mapid + "' class='cmaswait'></div>";
            newContent += "<div id='busyfade_" + instance.mapid + "' class='cmasfade'></div>";
            instance.get('contentBox').setContent(newContent);
        },

        bindUI : function() {
            Y.log('bindUI', 'cmaserror', 'CMASMAPS');
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid),
            // just to be sure the layer will allways become visible after 3 seconds:
                mapdd = new Y.DD.Drag({
                   node: mapNode
                }),
                zoomhandledd;
            mapdd.on('drag:start', instance._handleMapDragStart, instance);
            mapdd.on('drag:end', instance._handleMapDragEnd, instance);
            mapNode.on('mousedown', instance._handleMapDragMousedown, instance);
            mapNode.on('mouseup', instance._handleMapDragMouseup, instance);
            Y.on('click', instance.moveHome, '#movehome_'+instance.mapid, instance);
            Y.on('click', instance._handleZoomIn, '#zoomin_'+instance.mapid, instance);
            Y.on('click', instance._handleZoomOut, '#zoomout_'+instance.mapid, instance);
            instance.after(['latChange', 'lonChange'], Y.bind(instance.moveHome, instance));
            if (!instance.mobiledevice) {
                zoomhandledd = new Y.DD.Drag({
                    node: '#zoomhandle_'+ instance.mapid
                }).plug(Y.Plugin.DDConstrained, {
                    constrain2node: '#zoomhandleconstraint_'+instance.mapid,
                    tickY: 10,
                    stickY: true
                });
                zoomhandledd.on('drag:drag', instance._handleDragZoomHandle, instance);
                Y.on('click', instance._handleMoveUp, '#moveup_'+instance.mapid, instance);
                Y.on('click', instance._handleMoveDown, '#movedown_'+instance.mapid, instance);
                Y.on('click', instance._handleMoveLeft, '#moveleft_'+instance.mapid, instance);
                Y.on('click', instance._handleMoveRight, '#moveright_'+instance.mapid, instance);
                Y.on('mouseenter', instance._handleOverZoomHandleConstraint, '#zoomhandleconstraint_'+instance.mapid, instance);
                Y.on('mouseleave', instance._handleMapLeaveZoomArea, '#zoomhandleconstraint_'+instance.mapid, instance);
                Y.on('mouseenter', instance._handleOverZoomIn, '#zoomin_'+instance.mapid, instance);
                Y.on('mouseenter', instance._handleOverZoomOut, '#zoomout_'+instance.mapid, instance);
                Y.on('mouseleave', instance._handleMapLeaveZoomArea, '#zoomin_'+instance.mapid, instance);
                Y.on('mouseleave', instance._handleMapLeaveZoomArea, '#zoomout_'+instance.mapid, instance);
                instance.scrollEvent = Y.on("mousewheel", Y.bind(instance._handleMouseScroll, instance));
            }
        },

        syncUI : function() {
            var instance = this;
            instance._repositionZoomHandle();
            instance.loadImagesActiveLayer(instance.get('showWaitDuringStartup'), true);
            Y.log('syncUI long: '+instance.currentLongitude+' - lat: '+instance.currentLatitude, 'cmaserror', 'CMASMAPS');
            // volgend statement NIET doen:
//            instance._handleMapDragEnd();
        },

        loadImagesActiveLayer: function(showlayerwait, loadimagesarround) {
            Y.log('loadImagesActiveLayer', 'cmaserror', 'CMASMAPS');
            var instance = this;
            if (showlayerwait) {instance.showlayerwait();}
            instance.q.pause();
            instance.q.remove('imagesviewport'); // if already in que, remove to redefine again
            instance.q.add({id: 'imagesviewport', fn: instance._loadImagesViewPort, context: instance});
            if (loadimagesarround) {
                instance.q.remove('imagesoutsideviewport'); // if already in que, remove to redefine again}
                instance.q.add({id: 'imagesoutsideviewport', fn: instance._loadImagesOutsideViewPort, context: instance});
            }
            if (!instance.layerMadeVisible) {instance.q.add({id: 'makelayervisible', fn: instance._setMapNodeVisible, context: instance});}
            if (showlayerwait) {
                instance.q.add({id: 'redefinemarkerlayer', fn: instance._moveLayerMarkerToActiveZoomMap, context: instance});
                instance.q.add({id: 'hidelayerwait', fn: instance.hidelayerwait, context: instance});
            }
            instance.q.add({id: 'zoomlayervisible', fn: instance._setCurrentZoomedMapVisible, context: instance});
            instance.q.add({id: 'repositionlayer', fn: instance.repositionLayer, context: instance});
            if (loadimagesarround) {instance.q.promote('imagesoutsideviewport');}
            if (!instance.layerMadeVisible) {
                instance.q.promote('makelayervisible');
                instance.layerMadeVisible = true;
            }
            if (showlayerwait) {
                instance.q.promote('hidelayerwait');
                instance.q.promote('redefinemarkerlayer');
            }
            instance.q.promote('zoomlayervisible');
            instance.q.promote('repositionlayer');
            instance.q.promote('imagesviewport');
            if (!instance.pauzedBySubRoutine) {instance.q.run();}
        },

        loadImagesOtherLayer : function(zoomLevel) {
            var instance = this;
            if (zoomLevel === instance.currentZoomLevel) {return;}
            instance.q.pause();
            instance.q.remove('imagesviewport'+zoomLevel); // if already in que, remove to redefine again
            instance.q.add({id: 'imagesviewport'+zoomLevel, fn: instance._loadImagesOtherLayer, context: instance, args: zoomLevel});
            if (!instance.pauzedBySubRoutine) {instance.q.run();}
        },

        _loadImagesViewPort : function () {
            Y.log('_loadImagesViewPort', 'cmaserror', 'CMASMAPS');
            this._loadImages(1);
        },

        _loadImagesOutsideViewPort : function () {
            Y.log('_loadImagesOutsideViewPort', 'cmaserror', 'CMASMAPS');
            var instance = this;
            if (instance.doLoadImagesOutsieViewPort) {instance._loadImages(2);}
        },

        _loadImagesOtherLayer : function (zoomLevel) {
            Y.log('_loadImagesOtherLayer', 'cmaserror', 'CMASMAPS');
            this._loadImages(3, zoomLevel);
        },

        _loadImages : function (type, zoomLevel) {
            Y.log('_loadImages', 'cmaserror', 'CMASMAPS');
            var instance = this,
                x, y, xMin, xMax, yMin, yMax, leftPos, topPos, mapNode, xOffset, yOffset, w, h, cols, rows, imgId, imgNode,
                hostnode, zoom, imagesToLoad, newNode, maxTilepos;

            if (type===3) {zoom = zoomLevel;}
            else {zoom = instance.currentZoomLevel;}
            mapNode = instance.zoomedMap(zoom);

            xOffset = instance._getOffsetx(instance.currentLongitude, zoom);
            yOffset = instance._getOffsety(instance.currentLatitude, zoom);

            if (type===2) {
                hostnode = instance.get('contentBox');
                w = (2*hostnode.get('winWidth'))+Math.abs(xOffset)+instance._getViewPortWidth()+instance.TILE_SIZE;
                h = (2*hostnode.get('winHeight'))+Math.abs(yOffset)+instance._getViewPortHeight()+instance.TILE_SIZE;
            }
            else {
                w = instance._getViewPortWidth()+Math.abs(xOffset);
                h = instance._getViewPortHeight()+Math.abs(yOffset);
            }
            cols = Math.ceil((w/instance.TILE_SIZE)) + 1;
            rows = Math.ceil((h/instance.TILE_SIZE)) + 1;

            xMin = instance._getMinX(cols, instance.currentLongitude, zoom);
            yMin = instance._getMinY(rows, instance.currentLatitude, zoom);

            xMax = xMin + cols - 1;
            yMax = yMin + rows - 1;

            maxTilepos = instance._getMaxTilePos(zoom);
            xMax = Math.min(xMax, maxTilepos);
            yMax = Math.min(yMax, maxTilepos);

            // first check out the number of images to be loaded
            imagesToLoad = 0;
            for (y=yMin; y<=yMax; y++) {
                topPos = (y-1)*instance.TILE_SIZE;
                for (x=xMin; x<=xMax; x++) {
                    if (!Y.one('#tile_'+instance.mapid+'_'+ zoom +'_'+x+'_'+y)) {imagesToLoad++;}
                }
            }
            if (imagesToLoad===0) {return;}

            instance.pauzedBySubRoutine = true;
            instance.q.pause();
            instance.imageque=imagesToLoad;
            instance.restartque = Y.later(instance.TIME_OUT_VIEW, instance, instance._restartQueByTimer);
            for (y=yMin; y<=yMax; y++) {
                topPos = (y-1)*instance.TILE_SIZE;
                for (x=xMin; x<=xMax; x++) {
                    if (!Y.one('#tile_'+instance.mapid+'_'+ zoom +'_'+x+'_'+y)) {
                        leftPos = (x-1)*instance.TILE_SIZE;
                        imgId = 'tile_' + instance.mapid + '_' + x + '_' + y;
                        newNode = Y.Node.create("<div id='tile_"+instance.mapid+"_"+ zoom +"_"+x+"_"+y+"' class='cmastile' style='left:" +
                                  leftPos + "px; top:" + topPos + "px;'><img id='" + imgId  + "' vspace=0 hspace=0 src='" + instance.getTileServer(x) +
                                  zoom + "/" + x + "/" + y + ".png" + instance._getTimeStamp(true, instance.get('tileserver')) + "' alt='' /></div>");
                        imgNode = newNode.one('#' + imgId);

                        imgNode.on('load', instance._checkRestartQue, instance);
                        imgNode.on('error', instance. _errorImageLoad, instance, instance.getTileBackupServer(x) + zoom + '/' + x + '/' + y + '.png' +
                                                                                 instance._getTimeStamp(true, instance.get('tilebackupserver')));

                        mapNode.append(newNode);

                    }
                }
            }
        },

        _errorImageLoad : function(e, backupSource) {
            Y.log('_errorImageLoad: load failed --> try backup '+ backupSource, 'cmaswarn', 'CMASMAPS');
            var instance = this,
                imgNode = e.target;
            imgNode.detach('error', instance._errorImageLoad);
            imgNode.on('error', instance._checkRestartQue, instance);
            imgNode.set('src', backupSource);
        },

        currentZoomedMap : function () {
            Y.log('currentZoomedMap', 'cmas', 'CMASMAPS');
            var instance = this;
            return instance.zoomedMap(instance.currentZoomLevel);
        },

        zoomedMap : function (zoomLevel) {
            Y.log('zoomedMap', 'cmas', 'CMASMAPS');
            return Y.one('#map_zoom' + zoomLevel + '_' + this.mapid);
        },

        _setCurrentZoomedMapVisible : function () {
            Y.log('_setCurrentZoomedMapVisible', 'cmas', 'CMASMAPS');
            var instance = this,
                i;
            for (i=0;i<=17; i++) {
                if (i===instance.currentZoomLevel) {instance.zoomedMap(i).setStyle('visibility', 'inherit');}
                else {instance.zoomedMap(i).setStyle('visibility', '');}
            }
        },

        _moveLayerMarkerToActiveZoomMap : function() {
            Y.log('_moveLayerMarkerToActiveZoomMap', 'cmaserror', 'CMASMAPS');
            var instance = this;
/*jshint expr:true */
            instance.itsamapmarker && instance.itsamapmarker.repositionMarkers();
/*jshint expr:false */
        },

        _handleMoveUp : function() {
            Y.log('_handleMoveUp', 'cmas', 'CMASMAPS');
            var instance = this;
            instance._moveMap(0, -instance.get('moveStep'));
        },

        _handleMoveDown : function() {
            Y.log('_handleMoveDown', 'cmas', 'CMASMAPS');
            var instance = this;
            instance._moveMap(0, instance.get('moveStep'));
        },

        _handleMoveLeft : function() {
            Y.log('_handleMoveLeft', 'cmas', 'CMASMAPS');
            var instance = this;
            instance._moveMap(-instance.get('moveStep'), 0);
        },

        _handleMoveRight : function() {
            Y.log('_handleMoveRight', 'cmas', 'CMASMAPS');
            var instance = this;
            instance._moveMap(instance.get('moveStep'), 0);
        },

        loadHomePosition : function() {
            Y.log('loadHomePosition', 'cmas', 'CMASMAPS');
            var instance, cfg, request;
            instance = this;
            cfg = {
                method: 'GET',
                on: {success: Y.bind(instance._loadHomeSuccess, instance)},
                headers: { 'X-Transaction': 'IOcall'},
                data: 'ajax=38'
            };
            request = Y.io(Y.config.cmas2plusid, cfg);
        },

        _loadHomeSuccess : function(id, o) {
            Y.log('_loadHomeSuccess', 'cmas', 'CMASMAPS');
            var instance, data;
            instance = this;
            try {
                data = Y.JSON.parse(o.responseText);
                instance.set('lat', data.lat);
                instance.set('lon', data.lon);
                instance.set('zoomLevel', data.zoomlevel);
                instance.currentLatitude = instance.get('lat');
                instance.currentLongitude = instance.get('lon');
                instance.moveHome();
                instance.q.pause();
                instance.q.remove('loadHome'); // if already in que, remove to redefine again
                instance.q.add({id: 'loadHome', fn: instance._showMap, context: instance});
                instance.q.run();
           }
           catch (e) {
           }
        },

        _showMap : function() {
            Y.log('_showMap', 'cmas', 'CMASMAPS');
            var instance, mapdiv;
            instance = this;
            mapdiv = instance.get('boundingBox');
            mapdiv.removeClass('cmasnodisplay');
        },

        _hideMap : function() {
            Y.log('_showMap', 'cmas', 'CMASMAPS');
            var instance, mapdiv;
            instance = this;
            mapdiv = instance.get('boundingBox');
            mapdiv.addClass('cmasnodisplay');
        },

        moveHome : function() {
            Y.log('moveHome', 'cmas', 'CMASMAPS');
            var instance = this;
            instance.gotoPos(instance.get('lat'), instance.get('lon'));
        },

        gotoPos : function(lat, lon) {
            Y.log('gotoPos', 'cmas', 'CMASMAPS');
            var instance = this;
            instance.currentLatitude = lat;
            instance.currentLongitude = lon;
            instance.viewZoomLayer(instance.get('zoomLevel'));
        },

        getLat : function() {
            return this.currentLatitude;
        },

        getLon : function() {
            return this.currentLongitude;
        },

        getZoomLevel : function() {
            return this.currentZoomLevel;
        },

        _handleMouseScroll : function(e) {
            // negative values of e.wheelDelta means you want to zoom in
            var instance, zoomContraDirection, mouseLat, mouseLon, differenceY, differenceX, currentxNotRounded, currentyNotRounded, mouseX, mouseY, newX, newY, zoomFactor, mapdiv;
            instance = this;
            mapdiv = instance.get('boundingBox');
            if (!instance._mouseInScrollArea(e) || mapdiv.hasClass('cmasnodisplay')) {return;}
            zoomFactor = e.wheelDelta;
            zoomContraDirection = instance.osXLion;
            if (zoomContraDirection) {zoomFactor= -1*zoomFactor;}
                e.preventDefault();
                mouseLat = instance.getMouseLat(e);
                mouseLon = instance.getMouseLon(e);
                mouseX = instance._long2tileNOTROUNDED(mouseLon, instance.currentZoomLevel);
                mouseY = instance._lat2tileNOTROUNDED(mouseLat, instance.currentZoomLevel);
                currentxNotRounded = instance._long2tileNOTROUNDED(instance.currentLongitude, instance.currentZoomLevel);
                currentyNotRounded = instance._lat2tileNOTROUNDED(instance.currentLatitude, instance.currentZoomLevel);
                differenceX = mouseX - currentxNotRounded;
                differenceY = mouseY - currentyNotRounded;
                if (zoomFactor>0) {
                    if (instance.zoomInByScrollPermitted) {
                        if (zoomFactor>=instance.minimumZoomValue) {
                            instance.zoomInByScrollPermitted = false;
                            instance.zoomOutByScrollPermitted = true;
                            if (instance._zoomTimer) {instance._zoomTimer.cancel();}
                            instance._zoomTimer = Y.later(instance.pasiveTimeAfterZoom, instance, instance._reactivatePermissionZoomIn);
                            newX = currentxNotRounded + (differenceX/2);
                            newY = currentyNotRounded + (differenceY/2);
                            instance.currentLongitude = instance._tile2long(newX, instance.currentZoomLevel);
                            instance.currentLatitude = instance._tile2lat(newY, instance.currentZoomLevel);
                            instance._handleZoomIn();
                        }
                    }
                    else { // reset timer
                        if (!instance.macUser) {
                            if (instance._zoomTimer) {instance._zoomTimer.cancel();}
                            instance._zoomTimer = Y.later(instance.pasiveTimeAfterZoom, instance, instance._reactivatePermissionZoomIn);
                        }
                    }
                }
                else {
                    if (instance.zoomOutByScrollPermitted) {
                        if (zoomFactor<=(-1*instance.minimumZoomValue)) {
                            instance.zoomOutByScrollPermitted = false;
                            instance.zoomInByScrollPermitted = true;
                            if (instance._zoomTimer) {instance._zoomTimer.cancel();}
                            instance._zoomTimer = Y.later(instance.pasiveTimeAfterZoom, instance, instance._reactivatePermissionZoomOut);
                            newX = currentxNotRounded - (differenceX);
                            newY = currentyNotRounded - (differenceY);
                            instance.currentLongitude = instance._tile2long(newX, instance.currentZoomLevel);
                            instance.currentLatitude = instance._tile2lat(newY, instance.currentZoomLevel);
                            instance._handleZoomOut();
                        }
                    }
                    else { // reset timer
                        if (!instance.macUser) {
                            if (instance._zoomTimer) {instance._zoomTimer.cancel();}
                            instance._zoomTimer = Y.later(instance.pasiveTimeAfterZoom, instance, instance._reactivatePermissionZoomOut);
                        }
                    }
                }
        },

        _mouseInScrollArea : function(e) {
            return ((e.clientX>300) && (e.clientY>100));
        },

        _reactivatePermissionZoomIn : function() {
            this.zoomInByScrollPermitted = true;
        },

        _reactivatePermissionZoomOut : function() {
            this.zoomOutByScrollPermitted = true;
        },

        _handleZoomIn : function() {
            Y.log('_handleZoomIn', 'cmas', 'CMASMAPS');
            var instance = this,
                nextZoomLevel = instance.currentZoomLevel + 1;
            if (nextZoomLevel > 17) {return;}
            else {
                instance.viewZoomLayer(nextZoomLevel);
                instance._handleOverZoomIn(); // load the images: because mouse is in this position, but there won't be a mouseoverevent
            }
        },

        _handleZoomOut : function() {
            Y.log('_handleZoomOut', 'cmas', 'CMASMAPS');
            var instance = this,
                previousZoomLevel = instance.currentZoomLevel - 1;
            if (previousZoomLevel < 0) {return;}
            else {
                instance.viewZoomLayer(previousZoomLevel);
                instance._handleOverZoomIn(); // load the images: because mouse is in this position, but there won't be a mouseoverevent
            }
        },

        _handleOverZoomHandleConstraint : function() {
            Y.log('_handleOverZoomHandleConstraint', 'cmas', 'CMASMAPS');
            var instance = this,
                nextZoomLevel, maxZoomlevel, minZoomlevel;
            if (instance.dragStarted) {return;} // otherwise the movement will be resetted!
            maxZoomlevel = Math.min(17, (instance.currentZoomLevel+instance.get('zoomInPreLoadLevels')));
            minZoomlevel = Math.max(0, (instance.currentZoomLevel-instance.get('zoomOutPreLoadLevels')));
            for (nextZoomLevel= minZoomlevel; nextZoomLevel<=maxZoomlevel; nextZoomLevel++) {instance.loadImagesOtherLayer(nextZoomLevel);}
        },

        _handleOverZoomIn : function() {
            Y.log('_handleZoomIn', 'cmas', 'CMASMAPS');
            var instance = this,
                nextZoomLevel, maxZoomlevel;
            if (instance.dragStarted) {return;} // otherwise the movement will be resetted!
            maxZoomlevel = Math.min(17, (instance.currentZoomLevel+instance.get('zoomInPreLoadLevels')));
            for (nextZoomLevel=instance.currentZoomLevel+1; nextZoomLevel<=maxZoomlevel; nextZoomLevel++) {instance.loadImagesOtherLayer(nextZoomLevel);}
        },

        _handleOverZoomOut : function() {
            Y.log('_handleZoomOut', 'cmas', 'CMASMAPS');
            var instance = this,
                nextZoomLevel, minZoomlevel;
            if (instance.dragStarted) {return;} // otherwise the movement will be resetted!
            minZoomlevel = Math.max(0, (instance.currentZoomLevel-instance.get('zoomOutPreLoadLevels')));
            for (nextZoomLevel=instance.currentZoomLevel-1; nextZoomLevel>=minZoomlevel; nextZoomLevel--) {instance.loadImagesOtherLayer(nextZoomLevel);}
        },

        _handleMapDragStart : function() {
            Y.log('_handleMapDragStart', 'cmas', 'CMASMAPS');
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid);
            instance.dragStarted = true;
            instance.oldX = mapNode.getX();
            instance.oldY = mapNode.getY();
        },

        _handleMapDragEnd : function() {
            Y.log('_handleMapDragEnd', 'cmas', 'CMASMAPS');
            var instance, mapNode, shiftX, shiftY;
            instance = this;
            instance.dragStarted = false;
//            this._handleMapDragMouseup();
            mapNode = Y.one('#map_'+ instance.mapid);
            shiftX = mapNode.getX() - instance.oldX;
            shiftY = mapNode.getY() - instance.oldY;
            Y.later(100, instance, instance._storePixelMovement, [shiftX, shiftY]); // delay, we want to be absolutely sure that mapNode.getX() and getY() give the final values
        },

        _handleMapDragMousedown : function() {
            Y.log('_handleMapDragMousedown', 'cmaswarn', 'CMASMAPS');
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid);
            instance.oldX = mapNode.getX();
            instance.oldY = mapNode.getY();
            mapNode.setStyle('cursor', 'move');
        },

        _handleMapDragMouseup : function() {
            Y.log('_handleMapDragMouseup', 'cmaswarn', 'CMASMAPS');
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid);
            mapNode.setStyle('cursor', '');
        },

        _handleMapLeaveZoomArea : function() {
            Y.log('_handleMapLeaveZoomArea', 'cmaswarn', 'CMASMAPS');
            var instance = this;
            if (instance.dragStarted) {return;} // otherwise the movement will be resetted!
            instance.loadImagesActiveLayer(false, true);
        },

        _storePixelMovement : function(indentX, indentY) {
            var instance = this,
                newX = instance._long2tileNOTROUNDED(instance.currentLongitude, instance.currentZoomLevel),
                newY = instance._lat2tileNOTROUNDED(instance.currentLatitude, instance.currentZoomLevel);
            indentX = indentX/instance.TILE_SIZE;
            indentY = indentY/instance.TILE_SIZE;
            newX -= indentX;
            newY -= indentY;
            instance.currentLongitude = instance._tile2long(newX ,instance.currentZoomLevel);
            instance.currentLatitude = instance._tile2lat(newY ,instance.currentZoomLevel);
            Y.log('_storeNewLatLong lat: '+instance.currentLatitude+' - long: '+instance.currentLongitude, 'cmas', 'CMASMAPS');
            instance.loadImagesActiveLayer(false, true);
        },

        _moveMap : function(hor, ver) {
            Y.log('_moveMap '+hor+','+ver, 'cmas', 'CMASMAPS');
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid),
                newleft = parseInt(mapNode.getStyle('left'), 10) - hor,
                newtop = parseInt(mapNode.getStyle('top'), 10) - ver;
            mapNode.transition({
                easing: instance.get('easing'),
                duration: instance.get('moveDuration'), // seconds
                left: newleft + 'px',
                top: newtop + 'px'
            }, Y.rbind(function() {
                this._storePixelMovement(-hor, -ver);
            }, instance));
        },

        _handleDragZoomHandle : function() {
            var instance = this,
                zoomlevel = Math.round((170 - parseInt(Y.one('#zoomhandle_'+instance.mapid).getStyle('top'), 10))/10);
            Y.log('_handeDragZoomHandle '+ zoomlevel, 'cmas', 'CMASMAPS');
            instance.viewZoomLayer(zoomlevel);
            instance._handleOverZoomIn(); // because mouse is in this position, but there won't be a mouseoverevent
            instance._handleOverZoomOut(); // because mouse is in this position, but there won't be a mouseoverevent
        },

        getMouseLat : function(e) {
            var instance, mouseY, currentyNotRounded, differencePixels, differenceY;
            instance = this;
            mouseY = e.clientY - parseInt(instance.get('ypos'), 10);
            differencePixels = mouseY - instance._getViewPortCenterY();
            differenceY = differencePixels/instance.TILE_SIZE;
            currentyNotRounded = instance._lat2tileNOTROUNDED(instance.currentLatitude, instance.currentZoomLevel);
            return instance._tile2lat(currentyNotRounded+differenceY, instance.currentZoomLevel);
        },

        getMouseLon : function(e) {
            var instance, mouseX, currentxNotRounded, differencePixels, differenceX;
            instance = this;
            mouseX = e.clientX - parseInt(instance.get('xpos'), 10);
            differencePixels = mouseX - instance._getViewPortCenterX();
            differenceX = differencePixels/instance.TILE_SIZE;
            currentxNotRounded = instance._long2tileNOTROUNDED(instance.currentLongitude, instance.currentZoomLevel);
            return instance._tile2long(currentxNotRounded+differenceX, instance.currentZoomLevel);
        },

        repositionLayer : function(zoomLevel) {
            if (!zoomLevel) {zoomLevel = this.currentZoomLevel;}
            var instance = this,
                mapNode = Y.one('#map_'+ instance.mapid),
                xNotRounded = instance._long2tileNOTROUNDED(instance.currentLongitude, zoomLevel),
                x = Math.floor(xNotRounded),
                xOffset = Math.round(instance.TILE_SIZE*(xNotRounded-x)),
                yNotRounded = instance._lat2tileNOTROUNDED(instance.currentLatitude, zoomLevel),
                y = Math.floor(yNotRounded),
                yOffset = Math.round(instance.TILE_SIZE*(yNotRounded-y)),
                correctXMapMovement = (parseInt(mapNode.getStyle('left'), 10)/Math.pow(2, (instance.currentZoomLevel-zoomLevel))),
                correctYMapMovement = (parseInt(mapNode.getStyle('top'), 10)/Math.pow(2, (instance.currentZoomLevel-zoomLevel))),
                xPos = parseInt(instance.get('xpos'), 10) + instance._getViewPortCenterX() - xOffset - (instance.TILE_SIZE*(x-1)) - correctXMapMovement,
                yPos = parseInt(instance.get('ypos'), 10) + instance._getViewPortCenterY() - yOffset - (instance.TILE_SIZE*(y-1)) - correctYMapMovement,
                node = Y.one('#map_zoom' + zoomLevel + '_' + instance.mapid);
            node.setStyle('left', xPos+'px');
            node.setStyle('top', yPos+'px');
            if (instance.itsamapmarker) {
                instance.itsamapmarker._markerlayer.setStyle('left', xPos+'px');
                instance.itsamapmarker._markerlayer.setStyle('top', yPos+'px');
            }
            Y.log('repositionLayer to '+xPos+';'+yPos, 'cmas', 'CMASMAPS');
        },

        zoom : function(zoomLevel) {
            this.viewZoomLayer(zoomLevel);
        },

        getMaxZoomLevel : function() {
            return (Y.UA.ie>0) ? 13 : 17;
        },

        viewZoomLayer : function(zoomLevel) {
            Y.log('viewZoomLayer zoomlevel '+zoomLevel, 'cmas', 'CMASMAPS');
            // when mousePos is defnied, it will be an array with mouseposition --> this has to be fixed
            // otherwise fix on centre
            var instance = this,
                showLayerWait;
            if ((zoomLevel<0) || (zoomLevel>instance.getMaxZoomLevel())) {return;}
            showLayerWait = (zoomLevel!==instance.currentZoomLevel);
            instance.currentZoomLevel = zoomLevel;
            instance._repositionZoomHandle();
            // next: should que be busy with subroutine, then finish this delay.
            if (instance.pauzedBySubRoutine) {
                if (instance.restartque) {instance.restartque.cancel();}
                instance.pauzedBySubRoutine = false;
                instance.q.run();
            }
            instance.loadImagesActiveLayer(showLayerWait, false);
        },

        _repositionZoomHandle : function() {
            Y.log('_repositionZoomHandle', 'cmas', 'CMASMAPS');
            var instance = this,
                zoomHandleNode, newY;
            if (instance.mobiledevice) {return;}
            zoomHandleNode = Y.one('#zoomhandle_'+instance.mapid);
            newY = 170 - (10*instance.currentZoomLevel);
            zoomHandleNode.setStyle('top', newY+'px');
        },

        showlayerwait : function() {
            Y.log('showlayerwait', 'cmas', 'CMASMAPS');
            var instance = this;
            Y.one('#busyfade_' + instance.mapid).setStyle('display', 'block');
            Y.one('#busywait_' + instance.mapid).setStyle('display', 'block');
        },

        hidelayerwait : function() {
            Y.log('hidelayerwait', 'cmas', 'CMASMAPS');
            var instance = this;
            Y.one('#busyfade_' + instance.mapid).setStyle('display', 'none');
            Y.one('#busywait_' + instance.mapid).setStyle('display', 'none');
        },

        _getViewPortWidth: function() {
            var instance, mapdiv, mapdivwidth;
            instance = this;
            mapdiv = instance.get('boundingBox');
            if (mapdiv.hasClass('cmasnodisplay')) { // with display:none, you cannot determine the sizes!
                mapdiv.setStyle('visibility', 'hidden');
                mapdiv.removeClass('cmasnodisplay');
                mapdivwidth = parseInt(mapdiv.getStyle('width'), 10);
                mapdiv.addClass('cmasnodisplay');
                mapdiv.setStyle('visibility', '');
            }
            else {mapdivwidth = parseInt(mapdiv.getStyle('width'), 10);}
            return mapdivwidth - parseInt(instance.get('xpos'), 10);
        },

        _getViewPortHeight: function() {
            var instance, mapdiv, mapdivheight;
            instance = this;
            mapdiv = instance.get('boundingBox');
            if (mapdiv.hasClass('cmasnodisplay')) { // with display:none, you cannot determine the sizes!
                mapdiv.setStyle('visibility', 'hidden');
                mapdiv.removeClass('cmasnodisplay');
                mapdivheight = parseInt(mapdiv.getStyle('height'), 10);
                mapdiv.addClass('cmasnodisplay');
                mapdiv.setStyle('visibility', '');
            }
            else {mapdivheight = parseInt(mapdiv.getStyle('height'), 10);}
            return mapdivheight - parseInt(instance.get('ypos'), 10);
        },

        _getViewPortCenterX: function() {
            return Math.round(0.5*this._getViewPortWidth());
        },

        _getViewPortCenterY: function() {
            return Math.round(0.5*this._getViewPortHeight());
        },

        _getMinX: function(cols, longitude, zoomlevel) {
            var instance = this,
                xMin,
                xTileNOTROUNDED = instance._long2tileNOTROUNDED(longitude, zoomlevel),
                xTile = Math.floor(xTileNOTROUNDED);
            if ((cols % 2)===0) { // even number of cols
                if ((xTileNOTROUNDED-xTile)<0.5) {
                    // left area within tile
                    xMin = xTile-Math.round(cols/2);
                }
                else {
                    // right area within tile
                    xMin = xTile-Math.round(cols/2)+1;
                }
            }
            else {
                xMin = xTile-Math.floor(cols/2);
            }
            return Math.max(xMin, 0);
        },

        _getMinY: function(rows, latitude, zoomlevel) {
            var instance = this,
                yMin,
                yTileNOTROUNDED = instance._lat2tileNOTROUNDED(latitude, zoomlevel),
                yTile = Math.floor(yTileNOTROUNDED);
            if ((rows % 2)===0) { // even number of rows
                if ((yTileNOTROUNDED-yTile)<0.5) {
                    // top area within tile
                    yMin = yTile-Math.round(rows/2);
                }
                else {
                    // bottom area within tile
                    yMin = yTile-Math.round(rows/2)+1;
                }
            }
            else {
                yMin = yTile-Math.floor(rows/2);
            }
            return Math.max(yMin, 0);
        },

        _getMaxTilePos : function(zoom) {
           return Math.pow(2, zoom)-1;
        },

        _checkRestartQue : function() {
            var instance = this;
            if (!instance.pauzedBySubRoutine) {return;} // Que is restarted by timeout
            Y.log('_checkRestartQue ' + instance + '#' + instance.imageque, 'cmaserror', 'CMASMAPS');
            instance.imageque--;
            if (instance.imageque===0) {
                instance.pauzedBySubRoutine = false;
                if (instance.restartque) {instance.restartque.cancel();}
                instance.q.run();
            }
        },

        _restartQueByTimer : function() {
            var instance = this;
            if (!instance.pauzedBySubRoutine) {return;} // Que is started by _checkRestartQue
            Y.log('_restartQueByTimer', 'cmaserror', 'CMASMAPS');
            instance.pauzedBySubRoutine = false;
            instance.q.run();
        },

        _setMapNodeVisible : function() {
            Y.log('_setMapNodeVisible', 'cmaserror', 'CMASMAPS');
            Y.one('#map_'+ this.mapid).setStyle('visibility', 'visible');
        },

        _getOffsetx : function(longitude, zoomlevel) {
            var instance = this,
                xNotRounded = instance._long2tileNOTROUNDED(longitude, zoomlevel),
                xRounded = Math.floor(xNotRounded);
            return Math.round(instance.TILE_SIZE*(xNotRounded-xRounded));
        },

        _getOffsety : function(latitude, zoomlevel) {
            var instance = this,
                yNotRounded = instance._lat2tileNOTROUNDED(latitude, zoomlevel),
                yRounded = Math.floor(yNotRounded);
            return Math.round(instance.TILE_SIZE*(yNotRounded-yRounded));
        },

        _getX : function(lon, zoomlevel) {
            var instance = this,
                xNotRounded = instance._long2tileNOTROUNDED(lon, zoomlevel);
            return Math.round((xNotRounded-1)*TILE_SIZE);
        },

        _getY : function(lat, zoomlevel) {
            var instance = this,
                yNotRounded = instance._lat2tileNOTROUNDED(lat, zoomlevel);
            return Math.round((yNotRounded-1)*TILE_SIZE);
        },

        _long2tileNOTROUNDED : function(lon, zoom) {
            return ((lon+180)/360*Math.pow(2,zoom));
        },

        _lat2tileNOTROUNDED : function(lat, zoom) {
            return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom));
        },

        _long2tile : function(lon, zoom) {
            return (Math.floor(this._long2tileNOTROUNDED(lon, zoom)));
        },

        _lat2tile : function(lat, zoom) {
            return (Math.floor(this._lat2tileNOTROUNDED(lat, zoom)));
        },

        _tile2long : function(x,z) {
            return (x/Math.pow(2,z)*360-180);
        },

        _tile2lat : function(y,z) {
            var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
            return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
        },

        getTileServer : function(xLocMap) {
            var instance = this;
            return instance._getTileServer(xLocMap, instance.get('tileserver'));
        },

        getTileBackupServer : function(xLocMap) {
            var instance = this;
            return instance._getTileServer(xLocMap, instance.get('tilebackupserver'));
        },

        _getTileServer : function(xLocMap, server) {
            var instance = this,
                tilelevel, tileserver, tileserver1, tileserver2, tileserver3, tileserver4, timestamp;
            if (server ==='brongegevens') {
                timestamp = instance._getTimeStamp(false, server);
                tileserver1 = 'http://a.' + timestamp + '.tile.mapnik.brongegevens.nl/';
                tileserver2 = 'http://b.' + timestamp + '.tile.mapnik.brongegevens.nl/';
                tileserver3 = 'http://c.' + timestamp + '.tile.mapnik.brongegevens.nl/';
                tileserver4 = 'http://d.' + timestamp + '.tile.mapnik.brongegevens.nl/';
            }
            if (server ==='mapnik') {
                tileserver1 = 'http://a.tile.openstreetmap.org/';
                tileserver2 = 'http://b.tile.openstreetmap.org/';
                tileserver3 = 'http://c.tile.openstreetmap.org/';
                tileserver4 = 'http://a.tile.openstreetmap.org/';
            }
            if (server ==='osma') {
                tileserver1 = 'http://a.tah.openstreetmap.org/Tiles/tile/';
                tileserver2 = 'http://b.tah.openstreetmap.org/Tiles/tile/';
                tileserver3 = 'http://c.tah.openstreetmap.org/Tiles/tile/';
                tileserver4 = 'http://a.tah.openstreetmap.org/Tiles/tile/';
            }
            if (server ==='mapquest') {
                tileserver1 = 'http://otile1.mqcdn.com/tiles/1.0.0/osm/';
                tileserver2 = 'http://otile2.mqcdn.com/tiles/1.0.0/osm/';
                tileserver3 = 'http://otile3.mqcdn.com/tiles/1.0.0/osm/';
                tileserver4 = 'http://otile4.mqcdn.com/tiles/1.0.0/osm/';
            }
            if (tileserver1 === '') {
                Y.log('No valid tileserver defined: '+server, 'warn', 'CMASMAPS');
                return '';  // no valid tileserver
            }
            tilelevel = xLocMap % 4;
            switch (tilelevel) {
                case 1:
                    tileserver = tileserver2;
                break;
                case 2:
                    tileserver = tileserver3;
                break;
                case 3:
                    tileserver = tileserver4;
                break;
                default:
                    tileserver = tileserver1;
            }
            return tileserver;
        },

        _getTimeStamp : function(withQuestionMark, server) {
            if ((server ==='brongegevens') && withQuestionMark) {return '';}
            if (withQuestionMark && !this.QUESTION_MARKED_IMAGE_ALLOWED) {return '';}
            var instance = this,
                d, timeinms, msPerDay, cachedaysinms, questionmark;
            d = new Date();
            timeinms = d.getTime();
            msPerDay = 86400000;
            cachedaysinms = msPerDay*instance.get('tilecacheddays');
            if (withQuestionMark) {questionmark = '?';}
            else {questionmark = '';}
            return questionmark + Math.round(timeinms/cachedaysinms);
        },

        destructor : function() {
            Y.log('destructor '+this.get('boundingBox').get('id'), 'cmaswarn', 'CMASMAPS');
            var instance = this;
            if (instance._zoomTimer) {instance._zoomTimer.cancel();}
            if (instance.scrollEvent) {instance.scrollEvent.detach();}
            instance.clearAllMarkers();
        }

    }, {
        ATTRS : {
            //-----------------------
            showWaitDuringStartup: {
                value: true
            },
            zoomLevel: {
                value: 7,
                validator: Y.Lang.isNumber
            },
            tileserver: {
                value: 'brongegevens'
//                value: 'mapnik'
//                value: 'osma'
//                value: 'mapquest'
            },
            tilebackupserver: {
                value: 'mapnik'
//                value: 'osma'
//                value: 'mapquest'
            },
            lat: {
                value: 52.149
            },
            lon: {
                value: 5.645
            },
            moveStep: {
                value: 256
            },
            zoomInPreLoadLevels: {
                value: 5
            },
            zoomOutPreLoadLevels: {
                value: 1
            },
            easing: {
                value: 'ease-out'
            },
            moveDuration: {
                value : 0.25 // seconds
            },
            tilecacheddays: {
                value: 7
            },
            xpos: {
                value: 0
            },
            ypos: {
                value: 0
            }
        //-----------------------
        }
    }
);


}, '@VERSION@', {
    "requires": [
        "widget",
        "dd-drag",
        "dd-constrain",
        "event",
        "async-queue",
        "transition",
        "event-resize",
        "node"
    ],
    "skinnable": true
});
