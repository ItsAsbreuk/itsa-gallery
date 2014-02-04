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
    Lang = Y.Lang,
    YArray = Y.Array,
    YObject = Y.Object,
    LOADING_ICON = '<i class="itsaicon itsaicon-controll-spin4"></i>',
    CHANGE = 'Change',
    CONTAINER = 'container',
    BARRELDETAILS = 'barrelDetails',
    BARRELLIST = 'barrelList';

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
             * When 'false' then the details are determined for every single barrel!
             * @attribute barrelDetails
             * @type {Boolean}
             * @default null
             * @since 0.1
             */
            barrelDetails: {
                value: false,
                validator: function(v){ return (typeof v === 'boolean'); }
            },

            /**
             * @attribute barrelList
             * @type {Array}
             * @default null
             * @since 0.1
             */
            barrelList: {
                value: null,
                validator: function(v){ return ((v===null) || Lang.isArray(v)); }
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
        barrellist = instance.get(BARRELLIST);
    Y.log('initializer', 'info', 'ClicktraceBarrelModellist');
    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    /**
     * Internal list of all attached models.
     * @property _items
     * @private
     * @default []
     * @type Array
    */
    instance._items = [];

/*jshint expr:true */
    barrellist && instance._addModelTargets(barrellist);
/*jshint expr:false */
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
        barrellist = instance.get(BARRELLIST),
        barrelDetails = instance.get(BARRELDETAILS),
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

/*jshint expr:true */
    barrellist && YArray.each(
        barrellist,
        function(item) {
            var device = item.device;
            groupname = item.groupname;
            if (groupname !== prevGroupname) {
                html += '<h2>'+groupname+'</h2>';
                prevGroupname = groupname;
            }
            barrelguid = Y.guid();
            device._barrelguids || (device._barrelguids = []);
            device._barrelguids.push(barrelguid);
            html+='<div id="'+barrelguid+'" class="itsa-barrel-parentcontainer"></div>';
            device._barrels || (device._barrels = []);
            device._barrels.push(new Y.ITSALevelBarrel({
                                         value: device.get('value'),
                                         label: LOADING_ICON+device.get('name'),
                                         details: device.get('details'),
                                         showDetails: barrelDetails,
                                         maxValue: device.get('maxValue'),
                                         className: device.get('className'),
                                         unity: device.get('unity'),
                                         color: device.get('color'),
                                         lineColor: device.get('lineColor'),
                                         backgroundColor: device.get('backgroundColor')
                                     }).renderOnAvailable('#'+barrelguid));
        }
    );
/*jshint expr:false */
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
        container = instance.get(CONTAINER);

    Y.log('destructor', 'info', 'ClicktraceBarrelModellist');
    instance._clearEventhandlers();
    instance._removeModelTargets();

    if (instance._rendered) {
        container.cleanup(true);
    }
    container.empty();
};

//===============================================================================================
// private methods
//===============================================================================================

/**
 * Sets targets of all models to the instance
 *
 * @method _addModelTargets
 * @params models {Array}
 * @private
 * @protected
 * @since 0.3
*/
ClicktraceBarrelModellist.prototype._addModelTargets = function(models) {
    var instance = this;
    Y.log('_addModelTargets', 'info', 'ClicktraceBarrelModellist');
/*jshint expr:true */
    models && YArray.each(
        models,
        function(item) {
            var model = item.device;
            model.addTarget(instance);
            instance._items.push(model);
        }
    );
/*jshint expr:false */
};

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
            BARRELLIST+CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ClicktraceBarrelModellist');
                var prevVal = e.prevVal,
                    newVal = e.newVal;
/*jshint expr:true */
                prevVal && instance._removeModelTargets();
                newVal && instance._addModelTargets(newVal);
/*jshint expr:false */
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
    eventhandlers.push(
        instance.after(
            BARRELDETAILS+CHANGE,
            function(e) {
                Y.log('aftersubscriptor '+e.type, 'info', 'ClicktraceBarrelModellist');
                var visible = e.newVal,
                    barrellist = instance.get(BARRELLIST);
/*jshint expr:true */
                barrellist && YArray.each(
                    barrellist,
                    function(item) {
                        // the model === item.device
                        item.device.set('showDetails', visible);
                    }
                );
/*jshint expr:false */
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

/**
 * Removes all modeltargets to the instance
 *
 * @method _removeModelTargets
 * @private
 * @protected
  * @since 0.3
*/
ClicktraceBarrelModellist.prototype._removeModelTargets = function() {
    var instance = this;
    Y.log('_removeModelTargets', 'info', 'ClicktraceBarrelModellist');
    YArray.each(
        instance._items,
        function(model) {
            model.removeTarget(instance);
        }
    );
    instance._items.length = 0;
};