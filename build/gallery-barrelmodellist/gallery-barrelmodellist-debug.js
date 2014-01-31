YUI.add('gallery-barrelmodellist', function (Y, NAME) {

'use strict';

/*jshint maxlen:235 */

/**
 *
 * View ITSAViewModel
 *
 *
 * @module gallery-itsaviewmodel
 * @extends View
 * @class ITSAViewModel
 * @constructor
 * @since 0.3
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ClicktraceBarrelModellist,
    YArray = Y.Array,
    YObject = Y.Object,
    CHANGE = 'Change',
    CONTAINER = 'container',
    RESET = 'reset',
    MODELLIST = 'modelList';

//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

function ITSANodeCleanup() {}

Y.mix(ITSANodeCleanup.prototype, {

    //
    // Destroys all widgets inside the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.
    //                        Defaults to false due to potentially high run-time cost.
    // @since 0.3
    //
    //
    cleanupWidgets: function(destroyAllNodes) {
        var node = this,
            YWidget = Y.Widget;

        Y.log('cleanupWidgets', 'info', 'Itsa-NodeCleanup');
        if (YWidget) {
            node.all('.yui3-widget').each(
                function(widgetNode) {
                    if (node.one('#'+widgetNode.get('id'))) {
                        var widgetInstance = YWidget.getByNode(widgetNode);
                        if (widgetInstance) {
                            widgetInstance.destroy(destroyAllNodes);
                        }
                    }
                }
            );
        }
    },

    //
    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie
    // within the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @since 0.3
    //
    //
    cleanup: function(widgets) {
        var node = this;

        Y.log('cleanup', 'info', 'Itsa-NodeCleanup');
/*jshint expr:true */
        widgets && node.cleanupWidgets(true);
/*jshint expr:false */
        // NOT node.empty, for that will remove each and separate node from the dom which make it flickr!
        node.get('childNodes').destroy(true);
    }

}, true);

Y.Node.ITSANodeCleanup = ITSANodeCleanup;

Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

ClicktraceBarrelModellist = Y.ClicktraceBarrelModellist = Y.Base.create('clicktracebarrelmodellist', Y.View, [], {},
    {
        ATTRS : {
            /**
             * @attribute modelList
             * @type {Y.ModelList}
             * @default null
             * @since 0.1
             */
            modelList: {
                value: null,
                validator: function(v){ return ((v===null) || (v instanceof Y.ModelList)); }
            }
        }
    }
);

/**
 * @method initializer
 * @protected
 * @since 0.3
*/
ClicktraceBarrelModellist.prototype.initializer = function() {
    var instance = this,
        modellist = instance.get(MODELLIST);
    Y.log('initializer', 'info', 'ClicktraceBarrelModellist');
/*jshint expr:true */
    modellist && modellist.addTarget(instance);
/*jshint expr:false */
    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    // instance.barrelsGroupNames is an array with the same length as modelList athat tels what items of the modellist came from which barrelgroup
    instance.barrelsGroupNames = [];
};

/**
 * Method that is responsible for rendering the Model into the view.
 *
 * @method render
 * @private
 * @chainable
 * @since 0.3
 *
*/
ClicktraceBarrelModellist.prototype.render = function () {
    var instance = this,
        container = instance.get(CONTAINER),
        modellist = instance.get(MODELLIST),
        html = '',
        groupname, prevGroupname, barrelguid;
    Y.log('render', 'info', 'ClicktraceBarrelModellist');
    // Append the container element to the DOM if it's not on the page already.
    if (instance._rendered) {
        container.cleanup(true);
    }
    else {
        instance._bindUI();
        instance._rendered = true;
    }
console.log('size: '+modellist.size());
    modellist.each(
        function(device, index) {
console.log('rendering item '+index);
            groupname = instance.barrelsGroupNames[index];
            if (groupname !== prevGroupname) {
                html += '<h2>'+groupname+'</h2>';
                prevGroupname = groupname;
            }
            barrelguid = Y.guid();
/*jshint expr:true */
            device._barrelguids || (device._barrelguids = []);
/*jshint expr:false */
            device._barrelguids.push(barrelguid);
            html+='<div id="'+barrelguid+'" class="itsa-barrel-parentcontainer"></div>';
/*jshint expr:true */
            device._barrels || (device._barrels = []);
/*jshint expr:false */
            device._barrels.push(new Y.ITSALevelBarrel({
                                         value: device.get('value'),
                                         label: device.get('name'),
                                         maxValue: device.get('maxValue'),
                                         className: device.get('className'),
                                         unity: device.get('unity'),
                                         color: device.get('color'),
                                         lineColor: device.get('lineColor'),
                                         backgroundColor: device.get('backgroundColor')
                                     }).renderOnAvailable('#'+barrelguid));
        }
    );
    container.setHTML(html);
    return instance;
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
 * @since 0.3
*/
ClicktraceBarrelModellist.prototype.destructor = function() {
    var instance = this,
        modellist = instance.get(MODELLIST),
        container = instance.get(CONTAINER);

    Y.log('destructor', 'info', 'ClicktraceBarrelModellist');
/*jshint expr:true */
    modellist && modellist.removeTarget && modellist.removeTarget(instance);
/*jshint expr:false */
    instance._clearEventhandlers();

    if (instance._rendered) {
        container.cleanup(true);
    }
    container.empty();
};

//===============================================================================================
// private methods
//===============================================================================================

/**
 * Sets up DOM and CustomEvent listeners for the view.
 *
 * @method _bindUI
 * @private
 * @protected
  * @since 0.3
*/
ClicktraceBarrelModellist.prototype._bindUI = function() {
    var instance = this,
//        container = instance.get(CONTAINER),
        eventhandlers = instance._eventhandlers;
    Y.log('_bindUI', 'info', 'ClicktraceBarrelModellist');

    eventhandlers.push(
        instance.after(
            MODELLIST+CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ClicktraceBarrelModellist');
                var prevVal = e.prevVal,
                    newVal = e.newVal;
/*jshint expr:true */
                prevVal && prevVal.removeTarget && prevVal.removeTarget(instance);
                newVal && newVal.addTarget && newVal.addTarget(instance);
/*jshint expr:false */
                instance.render();
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:'+RESET,
            function() {
                Y.log('aftersubscriptor reset', 'info', 'ClicktraceBarrelModellist');
                instance.render();
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:change',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ClicktraceBarrelModellist');
                var model = e.target,
                    changed = e.changed;
                if (model instanceof Y.Model) {
                    YArray.each(
                        model._barrels,
                        function(barrel) {
                            YObject.each(
                                changed,
                                function(value, key) {
                                    barrel.set(key, value.newVal);
                                }
                            );
                        }
                    );
                }
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:destroy',
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ClicktraceBarrelModellist');
                var model = e.target,
                    container, barrelcontainer;
                if (model instanceof Y.Model) {
                    container = instance.get(CONTAINER);
                    YArray.each(
                        model._barrelguids,
                        function(barrelguid) {
                            barrelcontainer = container.one('#'+barrelguid);
                            if (barrelcontainer) {
                                barrelcontainer.cleanup(true);
                                barrelcontainer.destroy(true);
                            }
                        }
                    );
                }
            }
        )
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
ClicktraceBarrelModellist.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ClicktraceBarrelModellist');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

}, '@VERSION@', {
    "requires": [
        "view",
        "widget-base",
        "node-base",
        "model-list",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsalevelbarrel"
    ]
});
