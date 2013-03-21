'use strict';

/**
 * ScrollView KeyNav Plugin
 *
 *
 * Plugin that enables infinite-scroll with scrollview-modellist.
 *
 * <b>Caution1:</b>Only use this plugin when you create the scrollview through a (lazy)ModelList (extention: ITSAScrollViewModellist).
 *
 * <b>Caution2:</b> If used, the the ModelList's 'add'-event does not update the list, but will append the new items at the bottom.
 * Thus, in order to work, <u>both ModelList.comparator and the sorting-method on the remote datasupplier must be defined</u> (and in the same way).
 *
 * <b>Caution3:</b> Be sure to plug-in <u>before</u> you render the ScrollView-instance. If you don't then all innitial available itmes will
 * be rendered, regardsless of the 'batchSize'. By the way, this could be limited if you use the attribute 'limitItems'
 *
 *
 * To trigger external data (Models) to be loaded, this plugin enables the scrollview to call the ModelList's sync method with action='readMore'
 * and options = {lastItem: 'lastModel.getAttrs()', loadSize: loadSize}. These values can be used by the remote to determine which and how many
 * items to load.
 *
 * When the ScrollView-instance is expanded, it will expand with 'batchSize' items (Models). Any already available in the (Lazy)ModelList
 * will be used, if not enaough available, the plugin will call the (Lazy)ModelList's 'sync' method to retreive more. The number of external items
 * to be retreived is managed with the attribute 'loadSize'.
 *
 * Best practice is to make 'loadSize' higher than 'batchSize' --> each sync-call means an extra http-request. And a too high value of 'batchSize'
 * will mean a prefomancehit due to the expansion-rendering of the scrollview-instance.
 *
 * @module gallery-itsascrollviewinfinitescroll
 * @class ITSAScrollViewInfiniteScroll
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */


var Lang = Y.Lang,
    YArray = Y.Array;

Y.namespace('Plugin').ITSAInifiniteView = Y.Base.create('itsainfiniteview', Y.Plugin.Base, [], {

        _eventhandlers : [],
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this,
                host;

            instance.host = host = instance.get('host');
            Y.log('initializer', 'info', 'Itsa-InfiniteView');
            host._itmsAvail = true;
            instance._bindUI();
        },

        /**
         * Tries to expand the scrollview-list.
         *
         * @method expandList
         * @return {Boolean} Whether the scrollviewlist was expanded. Only when external data is requested and returns empty, there actually
         * was no extra data, while this method will return true.
         * @since 0.1
         */
        expandList : function() {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            var instance = this,
                host = instance.host,
                modelList = host.getModelListInUse(),
                batchSize = instance.get('batchSize'),
                prevLastModelIndex = host._prevLastModelIndex || -1,
                needExpansion = host._itmsAvail,
                askForMoreData;

            if (modelList && needExpansion) {
                instance._fireExpansion(false);
                // Need to distinquish between a need to call for external data, or expand from within the current modellist
                // The data MIGHT be available in the current modellist, but not rendered in the viewnode yet
                askForMoreData = (prevLastModelIndex === (modelList.size() - 1));
                if (askForMoreData) {
                    Y.log('expandList search external data', 'info', 'Itsa-InfiniteView');
                    modelList.sync(
                        'readMore',
                        {
                            lastItem: modelList.comparator(modelList.item(prevLastModelIndex)),
                            batchSize: batchSize
                        },
                        Y.rbind(instance._expansionFinished, instance)
                    );
                }
                else {
                    Y.log('expandList expand with own modellist', 'info', 'Itsa-InfiniteView');
                    host._renderView(null, {rebuild: false});
                    instance._fireExpansion(true);
                }
            }
            else {
                if (!modelList) {
                    Y.log('checkExpansion modelList is undefined --> cannot expand the list', 'warn', 'Itsa-InfiniteView');
                }
                if (!host._itmsAvail) {
                    Y.log('checkExpansion will not expand the list --> last item is already read', 'info', 'Itsa-InfiniteView');
                }
            }
            return needExpansion;
        },

        /**
         * Check if expansion of the modelList is needed. If so, it will take action (expand the list by calling 'expandList').
         *
         * @method checkExpansion
         * @since 0.1
         *
        */
        checkExpansion : function() {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            var instance = this,
                host = instance.host,
                boundingBox = host.get('boundingBox'),
                modelList = host.getModelListInUse(),
                viewNode = host._viewNode,
                axis = host.get('axis'),
                yAxis = axis && axis.y,
                boundingBoxEdge, viewNodeEdge;
            if (modelList && host._itmsAvail) {
                if (yAxis) {
                    boundingBoxEdge = boundingBox.getY() + boundingBox.get('offsetHeight');
                    viewNodeEdge = viewNode.getY() + viewNode.get('offsetHeight');
                }
                else {
                    // assume xAxis
                    boundingBoxEdge = boundingBox.getX() + boundingBox.get('offsetWidth');
                    viewNodeEdge = viewNode.getX() + viewNode.get('offsetWidth');
                }
                if ((viewNodeEdge-boundingBoxEdge)<instance.get('expansionArea')) {
                    Y.log('checkExpansion will trigger expandList', 'info', 'Itsa-InfiniteView');
                    instance.expandList();
                }
                else {
                    Y.log('checkExpansion no expansion required', 'info', 'Itsa-InfiniteView');
                }
            }
            else {
                if (!modelList) {
                    Y.log('checkExpansion modelList is undefined --> cannot expand the list', 'warn', 'Itsa-InfiniteView');
                }
                if (!host._itmsAvail) {
                    Y.log('checkExpansion will not expand the list --> last item is already read', 'info', 'Itsa-InfiniteView');
                }
            }
        },

        /**
         * Forces to load all items into the scrollview-instance.
         *
         * @method loadAllItems
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
         * @since 0.1
        */
        loadAllItems : function(maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            var host = this.host,
                modelList = host.getModelListInUse();

            Y.log('loadAllItems', 'info', 'Itsa-InfiniteView');
            host._getNodeFromModelOrIndex(null, modelList.size()-1, maxExpansions);
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            Y.log('destructor', 'info', 'Itsa-InfiniteView');
            this._clearEventhandlers();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            var instance = this;

            Y.log('_bindUI', 'info', 'Itsa-InfiniteView');
            instance._eventhandlers.push(
                instance.host.after(
                    'scrollEnd',
                    Y.rbind(instance.checkExpansion, instance)
                )
            );
        },

        /**
         *
         *
         * @method _expansionFinished
         * @private
         * @param {Object} transaction Transaction object.
         * @param {Object} load event.
         * @since 0.1
         */
        _expansionFinished : function (transaction, load) {
            var instance = this,
                modelList = instance.host.get('modelList'),
                newItems, responseData;

            Y.log('_expansionFinished', 'info', 'Itsa-InfiniteView');
            try {
                responseData = Y.JSON.parse(load.responseText);
                newItems = (Lang.isArray(responseData) && (responseData.length>0));
                if (!newItems) {
                    instance.host._itmsAvail = false;
                }
                if (newItems) {
                    // host._renderView(); will be called when new Models are added
                    modelList.add(newItems);
                }
            }
            catch (e) {
                Y.log('_expansionFinished error processing remote data', 'warn', 'Itsa-InfiniteView');
                instance.host._itmsAvail = false;
            }
            instance._fireExpansion(true);
        },

        /**
         * A utility method that fires events at the start and end of an modellist-expansion.
         *
         * @method _fireExpansion
         * @param {Boolean} finished whether it is the 'start'-event or the 'end'-event that should be fired.
         * @private
         * @since 0.1
         */
        _fireExpansion : function (finished) {
            var instance = this;

            Y.log('_fireExpansion fireing modelExpansion:'+(finished ? 'end' : 'start'), 'info', 'Itsa-InfiniteView');
            /**
             * Is fired before a 'scrollview-expansion' takes place.
             *
             * @event modelExpansion:start
             * @since 0.1
            **/
            /**
             * Is fired when a 'scrollview-expansion' is finished.
             *
             * @event modelExpansion:end
             * @since 0.1
            **/
            instance.fire('modelExpansion:' + (finished ? 'end' : 'start'));
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
         *
        */
        _clearEventhandlers : function() {
            Y.log('_clearEventhandlers', 'info', 'Itsa-InfiniteView');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        }

    }, {
        NS : 'itsainfiniteview',
        ATTRS : {

            /**
             * @description The amount of items that are added to the ModelList after every 'expansion'.
             * The optimal value of this attribute is just how many LI-elements fit into the attribute 'expansionArea'. But it might be set
             * higher to decrease the number of expansioncalls.
             *
             * @default 100
             * @attribute batchSize
             * @type Boolean
             * @since 0.1
            */
            batchSize: {
                value: 100,
                validator:  function(v) {
                    return Lang.isNumber(v);
                }
            },

            /**
             * @description The amount of items that are requested when external data is needed (called through the (Lazy)ModelList's sync-method).
             * Best practice is to make 'loadSize' higher than 'batchSize' (suggested is 10x batchSize) because each sync-call means an extra
             * http-request.
             *
             * @default 1000
             * @attribute loadSize
             * @type Boolean
             * @since 0.1
            */
            loadSize: {
                value: 1000,
                validator:  function(v) {
                    return Lang.isNumber(v);
                }
            },

            /**
             * @description Limit expansion data-calls by setting this attribute. It will prevent you from falling into endless expansion when the
             * list is infinite. If you are responsible for the external data and that data is limited, you might choose to set this value that
             * high to make sure all data is rendered in the scrollview. The choosen value represents the number of expansion calls. The true number
             * of added items = maxExpansions * batchSize
             *
             * @default 50
             * @attribute maxExpansions
             * @type Boolean
             * @since 0.1
            */
            maxExpansions: {
                value: 50,
                validator:  function(v) {
                    return Lang.isNumber(v);
                }
            },

            /**
             * @description The offset-area in <i>pixels</i> that should be minimal available. The offset-area is defined as the area outside
             * the view but with all the remaining scrollview-elements.
             * When the offset-area is less than 'expansionArea', a checkExpansion will be excecuted (after a scroll:end-event).
             *
             * If you encounter faltering scrollbehaviour -due to new loading items- then increase this number. If you do, consider to
             * re-optimize the value of the attribute 'batchSize'.
             *
             * @default 2000
             * @attribute expansionArea
             * @type Boolean
             * @since 0.1
            */
            expansionArea: {
                value: 2000,
                validator:  function(v) {
                    return Lang.isNumber(v);
                }
            }

        }
    }
);