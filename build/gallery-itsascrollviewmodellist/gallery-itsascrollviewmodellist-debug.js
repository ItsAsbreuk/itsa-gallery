YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {

'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList  or Y.LazyModelList to a ScrollView instance, where the Models are rendered inside an ul-element
 * which lies within the scrollview's-contentBox. This results in an ul-list with rendered Models. The Models are rendered
 * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined with the <b>'modelTemplate'-attribute</b>.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsascrollviewmodellist
 * @extends ScrollView
 * @uses ITSAModellistViewExtention
 * @class ITSAScrollViewModellist
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    MODEL_CLASS = 'itsa-model',
    MODELLIST_CLASS = 'itsa-modellistview',
    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',
    GETSTYLE = function(node, style) {
        return parseInt(node.getStyle(style), 10);
    };

Y.ITSAScrollViewModellist = Y.Base.create('itsascrollviewmodellist', Y.ScrollView, [Y.ITSAModellistViewExtention], {

        /**
         * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.
         * @property _lastItemTopInit
         * @private
         * @default false
         * @type Boolean
        */
        _lastItemTopInit : false,

        /**
         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
         *
         * @method saveScrollTo
         * @param x {Int} The x-position to scroll to. (null for no movement)
         * @param y {Int} The y-position to scroll to. (null for no movement)
         * @since 0.1
         *
        */
        saveScrollTo : function(x, y) {
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                viewNode = instance._viewNode,
                max;

            Y.log('saveScrollTo', 'info', 'Itsa-ScrollViewKeyNav');
            if (x) {
                x = Math.max(0, x);
                max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
                x = Math.min(x, max);
            }
            if (y) {
                y = Math.max(0, y);
                max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
                y = Math.min(y, max);
            }
            instance.scrollTo(x, y);
        },

        /**
         * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear
         * on top. Items that are after the view: will appear on bottom.
         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
         * That's why the third param is needed.
         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
         *
         * @method scrollIntoView
         * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.
         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
         * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
         *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
         *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
         *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.
         *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.
         *     @param {Boolean} [options.editMode=false] if 'true', then Y.Plugin.ITSATabKeyManager will be used to ficus the first item.
                                (only if noFocis=false)
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
         * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and
         * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.
         * @since 0.1
        */
        scrollIntoView : function(item, options, maxExpansions) {
    //=============================================================================================================================
    //
    // NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
    //
    //=============================================================================================================================
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                axis = instance.get('axis'),
                yAxis = axis.y,
                boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),
                boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),
                viewNode = instance._viewNode,
                infiniteView = instance.itsainfiniteview,
                paginatorPlugin = instance.pages,
                showHeaders = options && Lang.isBoolean(options.showHeaders) && options.showHeaders,
                noFocus = options && Lang.isBoolean(options.noFocus) && options.noFocus,
                editMode = options && Lang.isBoolean(options.editMode) && options.editMode,
                modelNodeEdge, currentOffset, newOffset, modelNode, liElements, getNodePosition,
                onTop, nodePosition, modelNodeSize, corrected, prevNode, focusNode;

            getNodePosition = function(node) {
                // returns -1 if (partial) before viewNode
                // returns 0 if inside viewNode
                // returns 1 if (partial) after viewNode
                var nodeLowerEdge = yAxis ? node.getY() : node.getX(),
                    nodeUpperEdge;
                if (yAxis) {
                    nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');
                }
                else {
                    nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');
                }

                if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {
                    return -1;
                }
                else if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize))
                         || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            if (item instanceof Y.Node) {
                // we passed a Node
                modelNode = item;
            }
            if (modelNode || Lang.isNumber(item)) {
                modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);
                if (modelNode) {
                    nodePosition = getNodePosition(modelNode);
                    if (paginatorPlugin && (nodePosition!==0)) {
                        // increase the modelIndex --> paginator is pased on all LI's, not just the Models
                        liElements = viewNode.get('children');
                        liElements.some(
                            function(node, index) {
                                if (!node.hasClass(MODEL_CLASS)) {
                                    item++;
                                }
                                return index===item;
                            }
                        );
                    }
                }
            }
            else {
                modelNode = item && instance.getNodeFromModel(item, maxExpansions);
                nodePosition = getNodePosition(modelNode);
                if (modelNode) {
                    if (paginatorPlugin && (nodePosition!==0)) {
                        // transform model to an index
                        liElements = viewNode.all('>li');
                        item = 0;
                        liElements.some(
                            function(node, index) {
                                var found = (node===modelNode);
                                if (found) {
                                    item = index;
                                }
                                return found;
                            }
                        );
                    }
                }
            }
            if (modelNode) {
                if (!noFocus) {
                    // because modelNode might be going to change (due to headers), we need to backup its reference
                    focusNode = modelNode;
                    instance._focusModelNode(focusNode);
                    if (editMode) {
                        Y.use('gallery-itsatabkeymanager', function(Y) {
                            if (!focusNode.itsatabkeymanager) {
                                focusNode.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            focusNode.itsatabkeymanager.focusInitialItem();
                        });
                    }
                }
                if ((nodePosition===0) && showHeaders){
                    // might be in view, while the header is not
                    // therefore check if headers are within view
                    prevNode = modelNode.previous();
                    while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                        modelNode = prevNode;
                        prevNode = prevNode.previous();
                    }
                    nodePosition = getNodePosition(modelNode);
                }
                if (nodePosition!==0) {
                    Y.log('scrollIntoView', 'info', 'Itsa-ScrollViewModelList');
                    onTop = (nodePosition===-1);
                    if (onTop && showHeaders) {
                        // we need to bring into view the headernode
                        prevNode = modelNode.previous();
                        while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                            item--;
                            modelNode = prevNode;
                            prevNode = prevNode.previous();
                        }
                    }
                    if (yAxis) {
                        modelNodeEdge = modelNode.getY();
                        currentOffset = instance.get('scrollY');
                        modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                    }
                    else {
                        modelNodeEdge = modelNode.getX();
                        currentOffset = instance.get('scrollX');
                        modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                    }
                    // You might need to expand the list in case ITSAInifiniteView is pluged-in
                    // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
                    if (paginatorPlugin) {
                        if (!onTop) {
                            while ((modelNodeSize<boundingBoxSize) && (item>0)) {
                                corrected = true;
                                item--;
                                modelNode = modelNode.previous('li');
                                if (yAxis) {
                                    modelNodeSize += modelNode.get('offsetHeight') +
                                                     GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                                }
                                else {
                                    modelNodeSize += modelNode.get('offsetWidth') +
                                                     GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                                }
                            }
                            if (corrected) {
                                item++;
                            }
                            item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));
                        }
                        paginatorPlugin.scrollToIndex(item);
                    }
                    else {
                        newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));
                        if (yAxis) {
                            instance.saveScrollTo(null, newOffset);
                        }
                        else {
                            instance.saveScrollTo(newOffset, null);
                        }
                    }
                    if (infiniteView && !onTop) {
        //=============================================================================================================================
        //
        // NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
        //
        //=============================================================================================================================
                        infiniteView.checkExpansion();
                    }
                }
                else {
                    Y.log('scrollIntoView --> no change needed: model is inside view', 'info', 'Itsa-ScrollViewModelList');
                }
            }
            else {
                Y.log('scrollIntoView --> no model', 'warn', 'Itsa-ScrollViewModelList');
            }
        },

        /**
         * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
         *
         * @method _setLastItemOnTop
         * @param {Boolean} val the new set value for this attribute
         * @private
         * @since 0.1
         *
        */
        _setLastItemOnTop : function(val) {
            var instance = this;

            Y.log('_setLastItemOnTop', 'info', 'Itsa-ScrollViewModelList');
            if (instance._lastItemTopInit) {
                if (val) {
                    instance._addEmptyItem(null, val);
                    instance.syncUI();
                }
                else {
                    instance._removeEmptyItem();
                    instance.syncUI();
                }
            }
            else {
                instance._lastItemTopInit = true;
            }
        }

    }, {
        ATTRS : {
            /**
             * Can make the last element in the scrollview be fixed to the bottom/right edge, but to the top/left edge.
             * 0 = not active (normal behaviour, bottom/right)
             * 1 = active: on top/left edge
             * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item
             *
             * @attribute lastItemOnTop
             * @type {Int}
             * @default 0
             * @since 0.1
             */
            lastItemOnTop: {
                value: 0,
                validator: function(v){ return (Lang.isNumber(v) && (v>-1) && (v<3));},
                setter: '_setLastItemOnTop'
            }
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-style",
        "base-base",
        "base-build",
        "scrollview",
        "gallery-itsamodellistviewextention"
    ],
    "skinnable": true
});
