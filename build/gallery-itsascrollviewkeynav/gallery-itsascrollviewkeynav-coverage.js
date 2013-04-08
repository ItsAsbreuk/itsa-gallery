if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js",
    code: []
};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].code=["YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {","","'use strict';","","/**"," * ITSAScrollViewKeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * In order to response to key-events, the scrollview-instance needs to have focus. This can be set either by myScrollView.focus() -or blur()-"," * or by setting the attribute 'initialFocus' to true. The plugin also works when Plugin.ScrollViewPaginator is plugged-in. The behaviour will be"," * different, because the scrolling is paginated in that case."," *"," *"," * If this plugin is plugged into a Y.ITSAScrollViewModellist-instance, then the keynavigation will scroll through the items in case"," * the attribute 'modelsSelectable' is set to true."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * The plugin's host, which should be a ScrollView-instance"," * @property host"," * @type ScrollView-instance"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    MODEL_CLASS = 'itsa-model',","    FOCUS_CLASS = MODEL_CLASS + '-focus',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsascrollviewkeynav', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","            instance.host = host = instance.get('host');","            if (host instanceof Y.ScrollView) {","                instance._bindUI();","            }","            else {","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this;","","            instance._eventhandlers.push(","                Y.on(","                    'keydown',","                    Y.rbind(instance._handleKeyDown, instance)","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _handleKeyDown","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _handleKeyDown : function(e) {","            var instance = this,","                host = instance.host,","                keyCode = e.keyCode,","                infiniteScroll = host.itsainfiniteview,","                scrollTo = Y.rbind(host.scrollTo, host),","                boundingBox = host.get('boundingBox'),","                boundingBoxX = boundingBox.getX(),","                boundingBoxY = boundingBox.getY(),","                boundingBoxHeight = boundingBox.get('offsetHeight') + GETSTYLE(boundingBox, 'borderTopWidth')","                        + GETSTYLE(boundingBox, 'borderBottomWidth') + GETSTYLE(boundingBox, 'paddingTop') + GETSTYLE(boundingBox,'paddingBottom'),","                boundingBoxWidth = boundingBox.get('offsetWidth')+GETSTYLE(boundingBox,'borderLeftWidth')+GETSTYLE(boundingBox,'borderRightWidth')","                        + GETSTYLE(boundingBox, 'paddingLeft') + GETSTYLE(boundingBox, 'paddingRight'),","                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),","                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),","                axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,","                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,","                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, currentScroll, remaining,","                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,","                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,","                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;","","            // tells if node1 is in region of node2","            // for some reason Y.DOM.inRegion() did not work ???","            inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {","                var node1XY = node1.getXY(),","                    node2XY = node2.getXY(),","                    left1 = node1XY[0],","                    top1 = node1XY[1],","                    right1 = left1 + node1.get('offsetWidth'),","                    bottom1 = top1 + node1.get('offsetHeight'),","                    left2 = node2XY[0] + (shiftLeftnode2 || 0),","                    top2 = node2XY[1] + (shiftTopnode2 || 0),","                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),","                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');","                return (","                    left1   >= left2   &&","                    right1  <= right2  &&","                    top1    >= top2    &&","                    bottom1 <= bottom2","                );","            };","            getDistanceToLowerEdge = function(modelNode, yAxis) {","                var nodeEdge, boundingSize;","                if (yAxis) {","                    nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');","                    boundingSize = boundingBoxY + boundingBoxHeight;","                }","                else {","                    nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');","                    boundingSize = boundingBoxX + boundingBoxWidth;","                }","                return boundingSize - nodeEdge;","            };","            getDistanceToUpperEdge = function(modelNode, yAxis) {","                var nodeEdge;","                if (yAxis) {","                    nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');","                }","                else {","                    nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');","                }","                return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);","            };","            itemFullVisible = function(modelNode) {","                return modelNode && inRegion(modelNode, boundingBox);","            };","            nextModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.next('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            prevModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            lastListItemIsInView = function(liElem) {","                return !host._itmsAvail && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);","            };","            getFirstFullVisibleModelNode = function(liElem) {","                var visibleNode;","                liElem.some(","                    function(node) {","                        visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;","                        return visibleNode;","                    }","                );","                return visibleNode;","            };","            getLastFullVisibleModelNode = function(liElem) {","                var visibleFound = false,","                    visibleNode;","                liElem.some(","                    function(node) {","                        var visible = itemFullVisible(node);","                        if (visible) {","                            visibleFound = true;","                            if (node.hasClass(MODEL_CLASS)) {","                                visibleNode = node;","                            }","                        }","                        return visibleFound && !visible;","                    }","                );","                return visibleNode;","            };","            scrollHome = function() {","                host.scrollIntoView(0);","                if (yAxis) {","                    scrollTo(null, 0);","                }","                else {","                    scrollTo(0, null);","                }","            };","            scrollEnd = function() {","                host.scrollIntoView(modelList.size()-1);","            };","            scrollToModelNode = function(modelNode) {","                var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));","                if (model) {","                    host.scrollIntoView(model);","                }","            };","            if (host.get('focused')) {","                modelsSelectable = host.get('modelsSelectable');","                viewNode = host._viewNode || host.get('srcNode').one('*');","                pagination = host.pages;","                if (pagination) {","                    paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);","                }","                axis = host.get('axis');","                xAxis = axis.x;","                yAxis = axis.y;","                itemHome = (keyCode===36);","                itemEnd = (keyCode===35);","                itemLeft = (keyCode===37) && xAxis;","                itemRight = (keyCode===39) && xAxis;","                itemUp = (keyCode===38) && yAxis;","                itemDown = (keyCode===40) && yAxis;","                pageLeft = (keyCode===33) && xAxis && !yAxis;","                pageRight = (keyCode===34) && xAxis && !yAxis;","                pageUp = (keyCode===33) && yAxis;","                pageDown = (keyCode===34) && yAxis;","                selectKey = ((keyCode===13) || (keyCode===32));","                if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {","                    e.preventDefault();","                }","                //===================================================================================================================================","                //","                // Elements might be selectable when ITSAScrollViewModellist is available","                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview","                //","                //===================================================================================================================================","                if (modelsSelectable) { // only when ITSAScrollViewModellist is active and host.get('modelsSelectable')===true","                    // models are selectable --> no scrolling but shifting through items","                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.","                    modelList = host.getModelListInUse();","                    if (itemHome) {","                        scrollHome();","                    }","                    else if (itemEnd) {","                        scrollEnd();","                    }","                    else if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {","                        lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);","                        if (lastFocusedModelNode) {","                            if (itemLeft || itemRight || itemUp || itemDown) {","                                lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)","                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                if (lastFocusedModelNode) {","                                    scrollToModelNode(lastFocusedModelNode);","                                }","                                if ((itemUp || itemLeft) && !lastFocusedModelNode) {","                                    scrollHome();","                                }","                            }","                            else if (pageRight || pageDown) {","                                nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.get('children');","                                        scrollToModelNode(getLastFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);","                                        while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {","                                            lastFocusedModelNode = nextModelNode;","                                            nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        }","                                        scrollToModelNode(lastFocusedModelNode);","                                    }","                                }","                            }","                            else if (pageLeft || pageUp) {","                                nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.get('children');","                                        scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                        if (!nextModelNode) {","                                            scrollHome();","                                        }","                                        else {","                                            remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);","                                            while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {","                                                lastFocusedModelNode = nextModelNode;","                                                nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                            }","                                            scrollToModelNode(lastFocusedModelNode);","                                        }","                                    }","                                }","                            }","                            else if (selectKey) {","                                clientId = lastFocusedModelNode.getData('modelClientId');","                                model = modelList.getByClientId(clientId);","                                if (host.modelIsSelected(model)) {","                                    host.unselectModels(model);","                                }","                                else {","                                    host.selectModels(model);","                                }","                            }","                        }","                        else if (itemDown || itemRight || pageDown || pageRight) {","                            // no model has active focus yet, only take action if shiftdown","                            liElements = viewNode.get('children');","                            if (itemDown || itemRight) {","                                // select first visible element on page","                                scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                            }","                            else {","                                // select last visible element on page","                                scrollToModelNode(getLastFullVisibleModelNode(liElements));","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // When elements are not selectable, do a 'normal' scrolling (dependent whether the Paginator is plugged in)","                //","                //===================================================================================================================================","                else {","                    // models are unselectable --> scroll the view","                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time","                    // If not, then we scroll 1 pixel at a time","                    if (pagination) {","                        // no ModelsSelectable, with Pagination","                        // we need the currentindex to calculate how many items to shift.","                        currentIndex = pagination.get('index');","                        totalCount = pagination.get('total');","                        liElements = viewNode.get('children');","                        if (itemLeft || itemUp) {","                            pagination.prev();","                        }","                        if (pageUp && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (pageLeft && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (itemHome) {","                            paginatorScrollToIndex(0);","                        }","                        // next we handle shifting to the end","                        if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {","                            newIndex = currentIndex+1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {","                            // now we need to find out what element is the last one that is not full-visible in the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {","                                modelNode = liElements.item(i);","                                currentVisible = inRegion(modelNode, boundingBox);","                            }","                            newIndex = i-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if (itemEnd && !lastListItemIsInView(liElements)) {","                            // Be aware that if ITSAInifiniteView is plugged in, we need to be sure the items are available.","                            if (infiniteScroll && host._itmsAvail) {","                                host.itsainfiniteview.loadAllItems();","                                totalCount = pagination.get('total');","                            }","                            newIndex = totalCount-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));","                            paginatorScrollToIndex(newIndex);","                        }","                    }","                    else {","                        // no ModelsSelectable, no Pagination","                        currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');","                        scrollToSave = Y.rbind(instance._saveScrollTo, instance);","                        if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {","                            if (itemLeft || itemUp || itemRight || itemDown) {","                                step = instance.get('step');","                            }","                            else {","                                step = yAxis ? boundingBoxHeight : boundingBoxWidth;","                            }","                            down = (pageRight || pageDown || itemRight || itemDown);","                            if (yAxis) {","                                scrollToSave(null, currentScroll + (down ? step : -step));","                            }","                            else {","                                scrollToSave(currentScroll + (down ? step : -step), null);","                            }","                            if (infiniteScroll && down) {","                                infiniteScroll.checkExpansion();","                            }","                        }","                        else if (itemHome) {","                            if (yAxis) {","                                scrollTo(null, 0);","                            }","                            else {","                                scrollTo(0, null);","                            }","                        }","                        else if (itemEnd) {","                            if (infiniteScroll) {","                                infiniteScroll.loadAllItems();","                            }","                            if (yAxis) {","                                scrollToSave(null, host._maxScrollY);","                            }","                            else {","                                scrollToSave(host._maxScrollX, null);","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // End of scrollnehaviour","                //","                //===================================================================================================================================","            }","            else {","            }","        },","","        /**","         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,","         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.","         *","         * @method _paginatorScrollToIndex","         * @private","         * @since 0.1","         *","        */","        _paginatorScrollToIndex : function(index) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                pagination = host && host.pages,","                itsainfiniteview = host && host.itsainfiniteview;","","            if (pagination) {","                if (itsainfiniteview) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","                    pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));","                }","                else {","                    pagination.scrollToIndex(index);","                }","            }","        },","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method _saveScrollTo","         * @param {Int} x The x-position to scroll to. (null for no movement)","         * @param {Int} y The y-position to scroll to. (null for no movement)","         * @private","         * @since 0.1","         *","        */","        _saveScrollTo : function(x, y) {","            var host = this.host;","","            if (x) {","                x = Math.max(0, x);","                x = Math.min(x, host._maxScrollX);","            }","            if (y) {","                y = Math.max(0, y);","                y = Math.min(y,  host._maxScrollY);","            }","            host.scrollTo(x, y);","        },","","        /**","         * Focuses the ScrollView-instance (host)","         *","         * @method _focusHost","         * @private","         * @since 0.1","         *","        */","        _focusHost : function() {","            var instance = this,","                host = this.host;","","            if (host && host.get('rendered')) {","                instance._focusHostSave();","            }","            else {","                instance.afterHostEvent('render', instance._focusHostSave, instance);","            }","        },","","        /**","         * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","         * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","         * bumbs too much.","         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","         * That's why the param is needed.","         *","         * @method _getMaxPaginatorGotoIndex","         * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","         * This only applies when the ITSAInifiniteView is plugged in.","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @return {Int} maximum PaginatorIndex that should be called.","         * @private","         * @since 0.1","         *","        */","        _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                paginator = host.hasPlugin('pages'),","                itsainfiniteview = host.hasPlugin('itsainfiniteview'),","                axis = host.get('axis'),","                yAxis = axis.y,","                boundingSize = host.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","                i = 0,","                hostModelList = host.getModelListInUse(), // only when ITSAScrollViewModellist is active","                viewNode = host._viewNode || host.get('srcNode').one('*'),","                liElements = viewNode.get('children'),","                listSize = (hostModelList && hostModelList.size()) || liElements.size(),","                lastNode, size;","","            if (paginator && (listSize>0)) {","                lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);","                if (yAxis) {","                    size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","                if (hostModelList && itsainfiniteview) {","                    // list might have been expanded --> we need to recalculate liElements","                    liElements = viewNode.get('children');","                }","                i = liElements.size();","                while (lastNode && (--i>=0) && (size<boundingSize)) {","                    lastNode = liElements.item(i);","                    if (yAxis) {","                        size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                    }","                    else {","                        size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                    }","                }","                if (size>=boundingSize) {i++;}","            }","            return i;","        },","","        /**","         * Focuses the ScrollView-instance (host), but is safe: the scrollview-instance is rendered here.","         *","         * @method _focusHostSave","         * @private","         * @since 0.1","         *","        */","        _focusHostSave : function() {","            var host = this.host;","","            if (host && host.focus) {","                host.focus();","            }","            else {","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsasvkeynav',","        ATTRS : {","","            /**","             * @description Whether the ScrollView-instance has initial focus when plugged in.","             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.","             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.","             *","             * @default true","             * @attribute initialFocus","             * @type Boolean","             * @since 0.1","            */","            initialFocus: {","                value: true,","                lazyAdd: false,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                },","                setter: '_focusHost'","            },","","            /**","             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.","             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>","             *","             * @default 10","             * @attribute step","             * @type Int","             * @since 0.1","            */","            step: {","                value: 10,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"pluginhost-base\", \"node\", \"scrollview\", \"dom-screen\"]});"];
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].lines = {"1":0,"3":0,"47":0,"52":0,"56":0,"69":0,"71":0,"72":0,"73":0,"86":0,"101":0,"103":0,"121":0,"144":0,"145":0,"155":0,"162":0,"163":0,"164":0,"165":0,"166":0,"169":0,"170":0,"172":0,"174":0,"175":0,"176":0,"177":0,"180":0,"182":0,"184":0,"185":0,"187":0,"188":0,"189":0,"191":0,"192":0,"193":0,"195":0,"196":0,"198":0,"199":0,"200":0,"202":0,"203":0,"206":0,"208":0,"209":0,"211":0,"213":0,"214":0,"215":0,"216":0,"217":0,"220":0,"223":0,"225":0,"226":0,"227":0,"228":0,"231":0,"234":0,"235":0,"237":0,"238":0,"239":0,"240":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"273":0,"276":0,"277":0,"278":0,"280":0,"281":0,"283":0,"284":0,"285":0,"286":0,"287":0,"289":0,"290":0,"292":0,"293":0,"296":0,"297":0,"298":0,"299":0,"300":0,"303":0,"304":0,"305":0,"309":0,"310":0,"311":0,"314":0,"315":0,"317":0,"321":0,"322":0,"323":0,"324":0,"325":0,"328":0,"329":0,"330":0,"334":0,"335":0,"336":0,"339":0,"340":0,"343":0,"344":0,"346":0,"351":0,"352":0,"353":0,"354":0,"355":0,"358":0,"362":0,"364":0,"365":0,"367":0,"371":0,"385":0,"388":0,"389":0,"390":0,"391":0,"392":0,"394":0,"397":0,"398":0,"399":0,"400":0,"403":0,"404":0,"405":0,"408":0,"411":0,"414":0,"415":0,"416":0,"417":0,"420":0,"421":0,"422":0,"425":0,"428":0,"429":0,"432":0,"433":0,"434":0,"435":0,"437":0,"440":0,"441":0,"442":0,"443":0,"445":0,"446":0,"447":0,"449":0,"451":0,"452":0,"453":0,"455":0,"456":0,"457":0,"462":0,"463":0,"464":0,"465":0,"466":0,"469":0,"471":0,"472":0,"473":0,"476":0,"478":0,"479":0,"482":0,"483":0,"484":0,"487":0,"490":0,"491":0,"492":0,"494":0,"495":0,"498":0,"528":0,"532":0,"533":0,"539":0,"542":0,"558":0,"560":0,"561":0,"562":0,"564":0,"565":0,"566":0,"568":0,"580":0,"583":0,"584":0,"587":0,"617":0,"630":0,"631":0,"632":0,"633":0,"636":0,"638":0,"640":0,"642":0,"643":0,"644":0,"645":0,"646":0,"649":0,"652":0,"654":0,"666":0,"668":0,"669":0,"684":0,"687":0,"710":0,"727":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].functions = {"GETSTYLE:51":0,"initializer:68":0,"destructor:85":0,"_bindUI:100":0,"inRegion:144":0,"getDistanceToLowerEdge:162":0,"getDistanceToUpperEdge:174":0,"itemFullVisible:184":0,"nextModelNodeIsFullVisible:187":0,"prevModelNodeIsFullVisible:191":0,"lastListItemIsInView:195":0,"(anonymous 2):201":0,"getFirstFullVisibleModelNode:198":0,"(anonymous 3):212":0,"getLastFullVisibleModelNode:208":0,"scrollHome:225":0,"scrollEnd:234":0,"scrollToModelNode:237":0,"_handleKeyDown:120":0,"_paginatorScrollToIndex:522":0,"_saveScrollTo:557":0,"_focusHost:579":0,"_getMaxPaginatorGotoIndex:611":0,"_focusHostSave:665":0,"(anonymous 4):686":0,"_clearEventhandlers:683":0,"validator:709":0,"validator:726":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredLines = 252;
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredFunctions = 29;
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 1);
YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 3);
'use strict';

/**
 * ITSAScrollViewKeyNav Plugin
 *
 *
 * Plugin that enables scrollview-navigation with keys.
 *
 * In order to response to key-events, the scrollview-instance needs to have focus. This can be set either by myScrollView.focus() -or blur()-
 * or by setting the attribute 'initialFocus' to true. The plugin also works when Plugin.ScrollViewPaginator is plugged-in. The behaviour will be
 * different, because the scrolling is paginated in that case.
 *
 *
 * If this plugin is plugged into a Y.ITSAScrollViewModellist-instance, then the keynavigation will scroll through the items in case
 * the attribute 'modelsSelectable' is set to true.
 *
 *
 * @module gallery-itsascrollviewkeynav
 * @class ITSAScrollViewKeyNav
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

/**
 * The plugin's host, which should be a ScrollView-instance
 * @property host
 * @type ScrollView-instance
 */


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 47);
var Lang = Y.Lang,
    YArray = Y.Array,
    MODEL_CLASS = 'itsa-model',
    FOCUS_CLASS = MODEL_CLASS + '-focus',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "GETSTYLE", 51);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 52);
return parseInt(node.getStyle(style), 10);
    };


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 56);
Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsascrollviewkeynav', Y.Plugin.Base, [], {

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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "initializer", 68);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 69);
var instance = this,
                host;
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 71);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 72);
if (host instanceof Y.ScrollView) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 73);
instance._bindUI();
            }
            else {
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "destructor", 85);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 86);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_bindUI", 100);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 101);
var instance = this;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 103);
instance._eventhandlers.push(
                Y.on(
                    'keydown',
                    Y.rbind(instance._handleKeyDown, instance)
                )
            );
        },

        /**
         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.
         *
         * @method _handleKeyDown
         * @param {EventTarget} e
         * @private
         * @since 0.1
         *
        */
        _handleKeyDown : function(e) {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_handleKeyDown", 120);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 121);
var instance = this,
                host = instance.host,
                keyCode = e.keyCode,
                infiniteScroll = host.itsainfiniteview,
                scrollTo = Y.rbind(host.scrollTo, host),
                boundingBox = host.get('boundingBox'),
                boundingBoxX = boundingBox.getX(),
                boundingBoxY = boundingBox.getY(),
                boundingBoxHeight = boundingBox.get('offsetHeight') + GETSTYLE(boundingBox, 'borderTopWidth')
                        + GETSTYLE(boundingBox, 'borderBottomWidth') + GETSTYLE(boundingBox, 'paddingTop') + GETSTYLE(boundingBox,'paddingBottom'),
                boundingBoxWidth = boundingBox.get('offsetWidth')+GETSTYLE(boundingBox,'borderLeftWidth')+GETSTYLE(boundingBox,'borderRightWidth')
                        + GETSTYLE(boundingBox, 'paddingLeft') + GETSTYLE(boundingBox, 'paddingRight'),
                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),
                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),
                axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,
                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,
                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, currentScroll, remaining,
                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,
                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,
                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;

            // tells if node1 is in region of node2
            // for some reason Y.DOM.inRegion() did not work ???
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 144);
inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "inRegion", 144);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 145);
var node1XY = node1.getXY(),
                    node2XY = node2.getXY(),
                    left1 = node1XY[0],
                    top1 = node1XY[1],
                    right1 = left1 + node1.get('offsetWidth'),
                    bottom1 = top1 + node1.get('offsetHeight'),
                    left2 = node2XY[0] + (shiftLeftnode2 || 0),
                    top2 = node2XY[1] + (shiftTopnode2 || 0),
                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),
                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 155);
return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 162);
getDistanceToLowerEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToLowerEdge", 162);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 163);
var nodeEdge, boundingSize;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 164);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 165);
nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 166);
boundingSize = boundingBoxY + boundingBoxHeight;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 169);
nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 170);
boundingSize = boundingBoxX + boundingBoxWidth;
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 172);
return boundingSize - nodeEdge;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 174);
getDistanceToUpperEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToUpperEdge", 174);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 175);
var nodeEdge;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 176);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 177);
nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 180);
nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 182);
return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 184);
itemFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "itemFullVisible", 184);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 185);
return modelNode && inRegion(modelNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 187);
nextModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "nextModelNodeIsFullVisible", 187);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 188);
var nextNode = modelNode.next('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 189);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 191);
prevModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "prevModelNodeIsFullVisible", 191);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 192);
var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 193);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 195);
lastListItemIsInView = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "lastListItemIsInView", 195);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 196);
return !host._itmsAvail && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 198);
getFirstFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getFirstFullVisibleModelNode", 198);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 199);
var visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 200);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 2)", 201);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 202);
visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 203);
return visibleNode;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 206);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 208);
getLastFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getLastFullVisibleModelNode", 208);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 209);
var visibleFound = false,
                    visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 211);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 3)", 212);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 213);
var visible = itemFullVisible(node);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 214);
if (visible) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 215);
visibleFound = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 216);
if (node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 217);
visibleNode = node;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 220);
return visibleFound && !visible;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 223);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 225);
scrollHome = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollHome", 225);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 226);
host.scrollIntoView(0);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 227);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 228);
scrollTo(null, 0);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 231);
scrollTo(0, null);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 234);
scrollEnd = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollEnd", 234);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 235);
host.scrollIntoView(modelList.size()-1);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 237);
scrollToModelNode = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollToModelNode", 237);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 238);
var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 239);
if (model) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 240);
host.scrollIntoView(model);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 243);
if (host.get('focused')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 244);
modelsSelectable = host.get('modelsSelectable');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 245);
viewNode = host._viewNode || host.get('srcNode').one('*');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 246);
pagination = host.pages;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 247);
if (pagination) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 248);
paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 250);
axis = host.get('axis');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 251);
xAxis = axis.x;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 252);
yAxis = axis.y;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 253);
itemHome = (keyCode===36);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 254);
itemEnd = (keyCode===35);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 255);
itemLeft = (keyCode===37) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 256);
itemRight = (keyCode===39) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 257);
itemUp = (keyCode===38) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 258);
itemDown = (keyCode===40) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 259);
pageLeft = (keyCode===33) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 260);
pageRight = (keyCode===34) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 261);
pageUp = (keyCode===33) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 262);
pageDown = (keyCode===34) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 263);
selectKey = ((keyCode===13) || (keyCode===32));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 264);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 265);
e.preventDefault();
                }
                //===================================================================================================================================
                //
                // Elements might be selectable when ITSAScrollViewModellist is available
                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview
                //
                //===================================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 273);
if (modelsSelectable) { // only when ITSAScrollViewModellist is active and host.get('modelsSelectable')===true
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 276);
modelList = host.getModelListInUse();
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 277);
if (itemHome) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 278);
scrollHome();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 280);
if (itemEnd) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 281);
scrollEnd();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 283);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 284);
lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 285);
if (lastFocusedModelNode) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 286);
if (itemLeft || itemRight || itemUp || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 287);
lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)
                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 289);
if (lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 290);
scrollToModelNode(lastFocusedModelNode);
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 292);
if ((itemUp || itemLeft) && !lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 293);
scrollHome();
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 296);
if (pageRight || pageDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 297);
nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 298);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 299);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 300);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 303);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 304);
liElements = viewNode.get('children');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 305);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 309);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 310);
remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 311);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 314);
lastFocusedModelNode = nextModelNode;
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 315);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        }
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 317);
scrollToModelNode(lastFocusedModelNode);
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 321);
if (pageLeft || pageUp) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 322);
nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 323);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 324);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 325);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 328);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 329);
liElements = viewNode.get('children');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 330);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 334);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 335);
if (!nextModelNode) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 336);
scrollHome();
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 339);
remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 340);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 343);
lastFocusedModelNode = nextModelNode;
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 344);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                            }
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 346);
scrollToModelNode(lastFocusedModelNode);
                                        }
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 351);
if (selectKey) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 352);
clientId = lastFocusedModelNode.getData('modelClientId');
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 353);
model = modelList.getByClientId(clientId);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 354);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 355);
host.unselectModels(model);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 358);
host.selectModels(model);
                                }
                            }}}}
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 362);
if (itemDown || itemRight || pageDown || pageRight) {
                            // no model has active focus yet, only take action if shiftdown
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 364);
liElements = viewNode.get('children');
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 365);
if (itemDown || itemRight) {
                                // select first visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 367);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                            }
                            else {
                                // select last visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 371);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                            }
                        }}
                    }}}
                }
                //===================================================================================================================================
                //
                // When elements are not selectable, do a 'normal' scrolling (dependent whether the Paginator is plugged in)
                //
                //===================================================================================================================================
                else {
                    // models are unselectable --> scroll the view
                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time
                    // If not, then we scroll 1 pixel at a time
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 385);
if (pagination) {
                        // no ModelsSelectable, with Pagination
                        // we need the currentindex to calculate how many items to shift.
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 388);
currentIndex = pagination.get('index');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 389);
totalCount = pagination.get('total');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 390);
liElements = viewNode.get('children');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 391);
if (itemLeft || itemUp) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 392);
pagination.prev();
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 394);
if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 397);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 398);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 399);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 400);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 403);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 404);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 405);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 408);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 411);
if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 414);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 415);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 416);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 417);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 420);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 421);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 422);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 425);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 428);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 429);
paginatorScrollToIndex(0);
                        }
                        // next we handle shifting to the end
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 432);
if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 433);
newIndex = currentIndex+1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 434);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 435);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 437);
if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 440);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 441);
for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 442);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 443);
currentVisible = inRegion(modelNode, boundingBox);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 445);
newIndex = i-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 446);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 447);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 449);
if (itemEnd && !lastListItemIsInView(liElements)) {
                            // Be aware that if ITSAInifiniteView is plugged in, we need to be sure the items are available.
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 451);
if (infiniteScroll && host._itmsAvail) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 452);
host.itsainfiniteview.loadAllItems();
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 453);
totalCount = pagination.get('total');
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 455);
newIndex = totalCount-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 456);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 457);
paginatorScrollToIndex(newIndex);
                        }
                    }
                    else {
                        // no ModelsSelectable, no Pagination
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 462);
currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 463);
scrollToSave = Y.rbind(instance._saveScrollTo, instance);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 464);
if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 465);
if (itemLeft || itemUp || itemRight || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 466);
step = instance.get('step');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 469);
step = yAxis ? boundingBoxHeight : boundingBoxWidth;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 471);
down = (pageRight || pageDown || itemRight || itemDown);
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 472);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 473);
scrollToSave(null, currentScroll + (down ? step : -step));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 476);
scrollToSave(currentScroll + (down ? step : -step), null);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 478);
if (infiniteScroll && down) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 479);
infiniteScroll.checkExpansion();
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 482);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 483);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 484);
scrollTo(null, 0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 487);
scrollTo(0, null);
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 490);
if (itemEnd) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 491);
if (infiniteScroll) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 492);
infiniteScroll.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 494);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 495);
scrollToSave(null, host._maxScrollY);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 498);
scrollToSave(host._maxScrollX, null);
                            }
                        }}}
                    }
                }
                //===================================================================================================================================
                //
                // End of scrollnehaviour
                //
                //===================================================================================================================================
            }
            else {
            }
        },

        /**
         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,
         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.
         *
         * @method _paginatorScrollToIndex
         * @private
         * @since 0.1
         *
        */
        _paginatorScrollToIndex : function(index) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_paginatorScrollToIndex", 522);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 528);
var host = this.host,
                pagination = host && host.pages,
                itsainfiniteview = host && host.itsainfiniteview;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 532);
if (pagination) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 533);
if (itsainfiniteview) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 539);
pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 542);
pagination.scrollToIndex(index);
                }
            }
        },

        /**
         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
         *
         * @method _saveScrollTo
         * @param {Int} x The x-position to scroll to. (null for no movement)
         * @param {Int} y The y-position to scroll to. (null for no movement)
         * @private
         * @since 0.1
         *
        */
        _saveScrollTo : function(x, y) {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_saveScrollTo", 557);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 558);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 560);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 561);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 562);
x = Math.min(x, host._maxScrollX);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 564);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 565);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 566);
y = Math.min(y,  host._maxScrollY);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 568);
host.scrollTo(x, y);
        },

        /**
         * Focuses the ScrollView-instance (host)
         *
         * @method _focusHost
         * @private
         * @since 0.1
         *
        */
        _focusHost : function() {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHost", 579);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 580);
var instance = this,
                host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 583);
if (host && host.get('rendered')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 584);
instance._focusHostSave();
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 587);
instance.afterHostEvent('render', instance._focusHostSave, instance);
            }
        },

        /**
         * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because
         * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)
         * bumbs too much.
         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of
         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
         * That's why the param is needed.
         *
         * @method _getMaxPaginatorGotoIndex
         * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.
         * This only applies when the ITSAInifiniteView is plugged in.
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
         * @return {Int} maximum PaginatorIndex that should be called.
         * @private
         * @since 0.1
         *
        */
        _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_getMaxPaginatorGotoIndex", 611);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 617);
var host = this.host,
                paginator = host.hasPlugin('pages'),
                itsainfiniteview = host.hasPlugin('itsainfiniteview'),
                axis = host.get('axis'),
                yAxis = axis.y,
                boundingSize = host.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
                i = 0,
                hostModelList = host.getModelListInUse(), // only when ITSAScrollViewModellist is active
                viewNode = host._viewNode || host.get('srcNode').one('*'),
                liElements = viewNode.get('children'),
                listSize = (hostModelList && hostModelList.size()) || liElements.size(),
                lastNode, size;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 630);
if (paginator && (listSize>0)) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 631);
lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 632);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 633);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 636);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 638);
if (hostModelList && itsainfiniteview) {
                    // list might have been expanded --> we need to recalculate liElements
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 640);
liElements = viewNode.get('children');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 642);
i = liElements.size();
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 643);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 644);
lastNode = liElements.item(i);
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 645);
if (yAxis) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 646);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 649);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 652);
if (size>=boundingSize) {i++;}
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 654);
return i;
        },

        /**
         * Focuses the ScrollView-instance (host), but is safe: the scrollview-instance is rendered here.
         *
         * @method _focusHostSave
         * @private
         * @since 0.1
         *
        */
        _focusHostSave : function() {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHostSave", 665);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 666);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 668);
if (host && host.focus) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 669);
host.focus();
            }
            else {
            }
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_clearEventhandlers", 683);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 684);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 4)", 686);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 687);
item.detach();
                }
            );
        }

    }, {
        NS : 'itsasvkeynav',
        ATTRS : {

            /**
             * @description Whether the ScrollView-instance has initial focus when plugged in.
             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.
             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.
             *
             * @default true
             * @attribute initialFocus
             * @type Boolean
             * @since 0.1
            */
            initialFocus: {
                value: true,
                lazyAdd: false,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 709);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 710);
return Lang.isBoolean(v);
                },
                setter: '_focusHost'
            },

            /**
             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.
             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>
             *
             * @default 10
             * @attribute step
             * @type Int
             * @since 0.1
            */
            step: {
                value: 10,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 726);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 727);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "pluginhost-base", "node", "scrollview", "dom-screen"]});
