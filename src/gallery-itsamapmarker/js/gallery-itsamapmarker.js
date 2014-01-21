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

var YArray = Y.Array,
    MARKERS = 'markers',
    CAP_CHANGE = 'Change',
    TEMPLATE = 'template',
    MARKER = 'marker',
    CAP_VISIBLE = 'Visible',
    CAP_HEADER = 'Header',
    CAP_BODY = 'Body',
    CAP_FOOTER = 'Footer',
    CAP_CLASSNAME = 'Classname',
    CAP_TEXT = 'Text',
    CLIENTID = 'clientId',
    HIDDEN_MARKERS = 'itsa-all-markers-hidden',
    MARKER_TEMPLATE = '<div data-id="{mapid}_{clientid}" data-placement="right" data-header="{header}" data-content="{body}"'+
                      ' data-footer="{footer}" class="itsa-mapmarker {classname}" style="z-index:{zindex}">{markertext}</div>';

function ITSAMapMarker() {
    ITSAMapMarker.superclass.constructor.apply(this, arguments);
}

ITSAMapMarker.NAME = 'itsamapmarker';
ITSAMapMarker.NS = 'itsamapmarker';

ITSACheckboxGroup.ATTRS = {

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
    instance.mapid = Y.guid();
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
    var instance = this;
    // creates the containerdiv that holds all the markers
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

    instance._eventhandlers = [];
    markers && markers.addtarget(instance);
    eventhandlers.push(
        instance.after(
            MARKER+CAP_CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ITSAMapMarker');
                var prevVal = e.prevVal,
                    newVal = e.newVal;
                if (prevVal) {
                    prevVal.removeTarget(instance);
                    newVal || instance._clearMarkers(); // if newVal exists, then syncUI() clear all prev
                }
                if (newVal) {
                    instance.syncUI();
                    newVal.addTarget(instance);
                }
            }
        )
    );
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
        markers = instance.get(MARKERS),

/*jshint expr:true */
    markers && markers.removeTarget(instance);
/*jshint expr:false */
    instance._clearEventhandlers();
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
        marker[MARKER+CAP_VISIBLE] && instance._renderMarker(
            marker.toJSON(),
            marker.get(CLIENTID),
            marker.get(MARKER+CAP_HEADER+TEMPLATE),
            marker.get(MARKER+CAP_BODY+TEMPLATE),
            marker.get(MARKER+CAP_FOOTER+TEMPLATE),
            marker.get(MARKER+CAP_CLASSNAME),
            marker.get(MARKER+CAP_TEXT),
            marker.get(MARKER+CAP_ZINDEX) || (index+1)
        );
    };
    processMarkerLML = function(marker, index) {
        // marker is an object
        marker[MARKER+CAP_VISIBLE] && instance._renderMarker(
            marker,
            marker[CLIENTID],
            marker[MARKER+CAP_HEADER+TEMPLATE],
            marker[MARKER+CAP_BODY+TEMPLATE],
            marker[MARKER+CAP_FOOTER+TEMPLATE],
            marker[MARKER+CAP_CLASSNAME],
            marker[MARKER+CAP_TEXT],
            marker[MARKER+CAP_ZINDEX] || (index+1)
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
    contentbox.get('childNodes').destroy(true);
    contentbox.empty(); // also call empty, for else the nodes are still in the DOM
};

/**
 * @method _renderMarker
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._renderMarker = function(properties, clientid, headertemplate, bodytemplate, footertemplate, classname, markertext, zindex) {
    Y.log('_renderMarker', 'info', 'ITSAMapMarker');
    var instance = this,
        left, top, zoomlevel, markerNode;
    markerNode = Node.create(
        Lang.sub(
            MARKER_TEMPLATE,
            {
                mapid, instance.mapid,
                clientid, clientid,
                classname: classname,
                markertext: markertext,
                header: headertemplate ? Lang.sub(headertemplate, properties) : '',
                body:  bodytemplate ? Lang.sub(bodytemplate, properties) : '',
                footer:  footertemplate ? Lang.sub(footertemplate, properties) : '',
                left: left,
                top: top,
                zindex: zindex
            }
        )
    );
    instance._markerlayer.append(markerNode);
    instance._syncMarkerNode(markerNode);
};

/**
 * @method _syncMarkerNode
 * @protected
 * @since 0.1
*/
ITSAMapMarker.prototype._syncMarkerNode = function(markerNode) {
    Y.log('_syncMarkerNode', 'info', 'ITSAMapMarker');
    var instance = this,
        left, top, zoomlevel, markerNode;
    zoomlevel = instance.host.get('zoomLevel');
    left = instance._getMarkerX(zoomlevel); // returns the left-position what it would have been when marker-width === 0
    top = instance._getMarkerY(zoomlevel); // returns the top-position what it would have been when marker-height === 0
    left -= (Math.round(markerNode.get('offsetWidth')/2));
    top -= (Math.round(markerNode.get('offsetHeight')/2));
    markerNode.setStyle('left', left+PX);
    markerNode.setStyle('top', top+PX);
};
