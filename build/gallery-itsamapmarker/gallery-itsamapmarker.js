YUI.add('gallery-itsamapmarker', function (Y, NAME) {

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

Y.ITSAMapMarker = Y.Base.create('itsamapmarker', Y.Base, [], {
/*
* use is very easy:
* 1) get a nodeinstance fi:  myNode=Y.one('#div1');
* 2) myNode.plug(Y.Plugin.CMASMAPS);
* 3) myNode.cmaseditor.saveContent({success: handleaftersuccess}); // or any other functioncall
*
* Important: plug it in the master node (example: #obj1), not in the nestnode!
*/
        TILE_SIZE: 256, // standard 256 pixels

        initializer : function() {
            var instance = this;
            if (!instance.get('markerid')) {instance.set('markerid', Y.guid());}
        },

        render : function(zoomlevel) {
            var instance = this;
            instance.renderUI();
            Y.on('contentready', function(zoomlevel) {
                var instance = this;
                instance.bindUI();
                instance.syncUI(zoomlevel);
            }, '#marker_'+instance.get('markerid'), instance, zoomlevel);
        },

        renderUI : function() {
            var instance, hostnode, markerNode;
            instance = this;
            hostnode = instance.get('host');
            markerNode = "<div id='marker_"+instance.get('markerid')+"' class='cmasmapmarker'><div class='cmasmapmarkercontent'></div>"+
                         "<div class='cmasmapmarkerclickarea'></div><div class='cmasmapmarkerinfo cmasnodisplay'><div class='cmasmapmarkerinfocontent'></div>"+
                         "<div class='cmasmapmarkerinfoclose'>x</div><div class='cmasmapmarkerinfolabel'></div></div></div>";
            hostnode.appendChild(markerNode);
        },

        bindUI : function() {
            var instance, markerNode, onclick, closeInfoNode, openInfoNode;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            closeInfoNode = markerNode.one('.cmasmapmarkerinfoclose');
            openInfoNode = markerNode.one('.cmasmapmarkerclickarea');
            if (closeInfoNode) {closeInfoNode.on('click', instance._hideInfoByEvent, instance);}
            onclick = instance.get('onclick');
            if (onclick && openInfoNode) {
               openInfoNode.on('click', onclick);
               openInfoNode.setStyle('cursor','help');
            }
        },

        syncUI : function(zoomlevel) {
            var instance, markerNode, contentNode, infocontentNode, statusbit, newInfo, accu, md1, md2, position, positiontruncated,
                maxpositionlength=18, km, forcedMarkerColor, createColor, titleText;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            contentNode = markerNode.one('.cmasmapmarkercontent');
            infocontentNode = markerNode.one('.cmasmapmarkerinfocontent');
            if (!zoomlevel) {zoomlevel = instance._getZoomLevel();}
            markerNode.setStyle('left', instance._getX(zoomlevel)+'px');
            markerNode.setStyle('top', instance._getY(zoomlevel)+'px');
            switch (this.get('size')) {
                case 0:
                    markerNode.addClass('markersizelarge');
                    markerNode.removeClass('markersizemedium');
                    markerNode.removeClass('markersizesmall');
                break;
                case 1:
                    markerNode.removeClass('markersizelarge');
                    markerNode.addClass('markersizemedium');
                    markerNode.removeClass('markersizesmall');
                break;
                case 2:
                    markerNode.removeClass('markersizelarge');
                    markerNode.removeClass('markersizemedium');
                    markerNode.addClass('markersizesmall');
                break;
            }
            if (instance.get('selected')) {markerNode.addClass('markerstatusselected');}
            else {markerNode.removeClass('markerstatusselected');}
            statusbit = parseInt(instance.get('status'), 10);
            forcedMarkerColor = instance.get('forcedMarkerColor');
            if (forcedMarkerColor) {
                markerNode.removeClass('markerstatusmanipulated');
                markerNode.removeClass('markerstatuserror');
                markerNode.removeClass('markerstatusmotion');
                markerNode.removeClass('markerstatusforced1');
                markerNode.removeClass('markerstatusforced2');
                markerNode.removeClass('markerstatusforced3');
                markerNode.removeClass('markerstatusforced4');
                markerNode.removeClass('markerstatusforced5');
                markerNode.removeClass('markerstatusforced6');
                createColor = ((forcedMarkerColor-1) % 6) + 1; // returns values between 1 - 6
                markerNode.addClass('markerstatusforced' + createColor);
            }
            else {
                if (statusbit===4) { // manipulated marker --> mostly first point of Route which is inserted
                    markerNode.addClass('markerstatusmanipulated');
                    markerNode.removeClass('markerstatuserror');
                    markerNode.removeClass('markerstatusmotion');
                }
                else {
                    markerNode.removeClass('markerstatusmanipulated');
                    if (instance.get('error') || (statusbit===2) || (statusbit===3)) { // 3=nofix --> must be marked as error. 2=npfix and last marker. We decided to mark this one as an error as well
                        markerNode.addClass('markerstatuserror');
                        markerNode.removeClass('markerstatusmotion');
                    }
                    else { // no error
                        markerNode.removeClass('markerstatuserror');
                        if (statusbit===1) { // 1=motion
                            markerNode.addClass('markerstatusmotion');
                        }
                        else {markerNode.removeClass('markerstatusmotion');}
                    }
                }
            }
            contentNode.setContent(instance.get('markerText'));
            position = instance.get('position');
            accu = instance.get('accu');
            md1 = instance.get('md1');
            md2 = instance.get('md2');
            titleText = instance.get('title');
            if (titleText && (titleText!=='')) {newInfo = '<span class="clicktrace-markerhead">' + titleText + '</span>';}
            else {newInfo = '<span class="clicktrace-markerhead">Marker ' + instance.get('markerText') + '</span>';}
            newInfo += '<br>' + instance.get('gmt');
            if (position && (position.length>0)) {
                if (position.length>maxpositionlength) {positiontruncated=position.substring(0, maxpositionlength)+'...';}
                else {positiontruncated=position;}
                newInfo += '<br>' + positiontruncated;
            }
            newInfo += '<br>Battery: '+instance.get('battery') + '%';
            if (accu && (accu.length>0)) {
                accu = parseInt(accu, 10)/10;
                newInfo += '<br>Accu: '+accu+' Volt';
            }
            newInfo += '<br>GSM: '+instance.get('gsm')+'%';
            newInfo += '<br>Status: '+instance.get('status');
            newInfo += '<br>Speed: '+instance.get('speed')+' km/u';
                km = Math.round(parseInt(instance.get('distance'), 10)/100)/10;
            newInfo += '<br>Distance: '+km+' km';
            if (md1 && (md1.length>0)) {newInfo += '<br>Mode 1: '+md1;}
            if (md2 && (md2.length>0)) {newInfo += '<br>Mode 2: '+md2;}
            infocontentNode.setContent(newInfo);
            markerNode.setStyle('visibility', 'inherit');
        },

        showMarker : function() {
            var instance, markerNode;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            markerNode.removeClass('cmasnodisplay');
        },

        hideMarker : function() {
            var instance, markerNode;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            markerNode.addClass('cmasnodisplay');
        },

        showInfo : function() {
            var instance, markerNode, infoNode;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            infoNode = markerNode.one('.cmasmapmarkerinfo');
            infoNode.removeClass('cmasnodisplay');
        },

        hideInfo : function() {
            var instance, markerNode, infoNode;
            instance = this;
            markerNode = Y.one('#marker_'+ instance.get('markerid'));
            infoNode = markerNode.one('.cmasmapmarkerinfo');
            infoNode.addClass('cmasnodisplay');
//            instance.set('zIndex', 0);
        },

        _hideInfoByEvent : function(e) {
            var instance = this;
            e.stopPropagation();
            instance.hideInfo();
        },

        _getZoomLevel : function() {
            var instance, hostnode, zoomlevel, zoomedmapnode;
            instance = this;
            hostnode = instance.get('host');
            zoomedmapnode = hostnode.get('parentNode');
            zoomlevel = parseInt(zoomedmapnode.get('id').substring(8,10), 10);
            return zoomlevel;
        },

        _getX : function(zoomlevel) {
            var instance = this,
                xNotRounded = instance._long2tileNOTROUNDED(instance.get('lon'), zoomlevel),
                leftPos = Math.round((xNotRounded-1)*instance.TILE_SIZE);
            return leftPos - instance.get('xOffsetMarker');
        },

        _getY : function(zoomlevel) {
            var instance = this,
                yNotRounded = instance._lat2tileNOTROUNDED(instance.get('lat'), zoomlevel),
                topPos = Math.round((yNotRounded-1)*instance.TILE_SIZE);
            return topPos - instance.get('yOffsetMarker');
        },

        _long2tileNOTROUNDED : function(lon, zoom) {
            return ((lon+180)/360*Math.pow(2,zoom));
        },

        _lat2tileNOTROUNDED : function(lat, zoom) {
            return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom));
        },


        destructor : function() {
            var instance, markerNode;
            instance = this;
            markerNode = Y.one('#marker_'+instance.get('markerid'));
            markerNode.remove(true);
        }

    }, {
        ATTRS : {
            //-----------------------
            host: {
                value: null
            },
            markerid: {
                value: null
            },
            zIndex : {
                setter: function(val) {
                    var markerid = this.get('markerid'),
                        markernode;
                    if (markerid) {
                        markernode = Y.one('#marker_'+markerid);
                        if (markernode) {markernode.setStyle('zIndex', val);}
                    }
                    return val;
                },
                validator: function(val) {
                    return Y.Lang.isNumber(val);
                }
            },
            markerSet: {
                value: 'http://brongegevens.cmas2plus.nl/global/images/markers1.png'
            },
            xOffsetMarker: {
                value: 10,
                validator: Y.Lang.isNumber
            },
            yOffsetMarker: {
                value: 35,
                validator: Y.Lang.isNumber
            },
            defaultMarker: {
                value: 1
            },
            showOnMouseover: {
                value: false
            },
            shadow: {
                value: false
            },
            labelSymbol: {
                value: true
            },
            width: {
                value: 200
            },
            height: {
                value: 500
            },
            autoHeight: {
                value: false
            },
            overflow: {
                value: 'scroll'
            },
            title: {
                value: ''
            },
            body: {
                value: ''
            },
            lat: {
                value: 52.149
            },
            lon: {
                value: 5.645
            },
            position: {
                value: ''
            },
            size: { // 0=large, 1=default, 2=small
                value: 1
            },
            markerText: {
                value: ''
            },
            status: { // 0=stopped, 1=motion
                value: 0
            },
            gmt: {
                value: ''
            },
            battery: {
                value: 0
            },
            accu: {
                value: ''
            },
            gsm: {
                value: 0
            },
            speed: {
                value: 0
            },
            distance: {
                value: 0
            },
            md1: {
                value:''
            },
            md2: {
                value: ''
            },
            selected: {
                value: false
            },
            forcedMarkerColor: {
                value: null
            },
            showInfo: {
                value: false,
                setter: function(val) {
                    if (val) {this.showInfo();}
                    else {this.hideInfo();}
                    return val;
                },
                validator: function(val) {
                   return Y.Lang.isBoolean(val);
                }
            },
            error: {
                value: false
            },
            onclick: {
                value: null
            }


            //-----------------------
        }
    }
);


}, '@VERSION@', {"requires": ["widget", "base-build", "event"], "skinnable": true});
