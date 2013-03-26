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
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].code=["YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {","","'use strict';","","/**"," * ITSAScrollViewKeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * In order to response to key-events, the scrollview-instance needs to have focus. This can be set either by myScrollView.focus() -or blur()-"," * or by setting the attribute 'initialFocus' to true. The plugin also works when Plugin.ScrollViewPaginator is plugged-in. The behaviour will be"," * different, because the scrolling is paginated in that case."," *"," *"," * If this plugin is plugged into a Y.ITSAScrollViewModellist-instance, then the keynavigation will scroll through the items in case"," * the attribute 'modelsSelectable' is set to true."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    MODEL_CLASS = 'itsa-scrollviewmodel',","    FOCUS_CLASS = MODEL_CLASS + '-focus',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","            instance.host = host = instance.get('host');","            if (host instanceof Y.ScrollView) {","                instance._bindUI();","            }","            else {","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this;","","            instance._eventhandlers.push(","                Y.on(","                    'keydown',","                    Y.rbind(instance._handleKeyDown, instance)","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _handleKeyDown","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _handleKeyDown : function(e) {","            var instance = this,","                host = instance.host,","                keyCode = e.keyCode,","                infiniteScroll = host.itsainfiniteview,","                scrollTo = Y.rbind(host.scrollTo, host),","                boundingBox = host.get('boundingBox'),","                boundingBoxX = boundingBox.getX(),","                boundingBoxY = boundingBox.getY(),","                boundingBoxHeight = boundingBox.get('offsetHeight') + GETSTYLE(boundingBox, 'borderTopWidth')","                        + GETSTYLE(boundingBox, 'borderBottomWidth') + GETSTYLE(boundingBox, 'paddingTop') + GETSTYLE(boundingBox,'paddingBottom'),","                boundingBoxWidth = boundingBox.get('offsetWidth')+GETSTYLE(boundingBox,'borderLeftWidth')+GETSTYLE(boundingBox,'borderRightWidth')","                        + GETSTYLE(boundingBox, 'paddingLeft') + GETSTYLE(boundingBox, 'paddingRight'),","                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),","                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),","                axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,","                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,","                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, currentScroll, remaining,","                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,","                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,","                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;","","            // tells if node1 is in region of node2","            // for some reason Y.DOM.inRegion() did not work ???","            inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {","                var node1XY = node1.getXY(),","                    node2XY = node2.getXY(),","                    left1 = node1XY[0],","                    top1 = node1XY[1],","                    right1 = left1 + node1.get('offsetWidth'),","                    bottom1 = top1 + node1.get('offsetHeight'),","                    left2 = node2XY[0] + (shiftLeftnode2 || 0),","                    top2 = node2XY[1] + (shiftTopnode2 || 0),","                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),","                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');","                return (","                    left1   >= left2   &&","                    right1  <= right2  &&","                    top1    >= top2    &&","                    bottom1 <= bottom2","                );","            };","            getDistanceToLowerEdge = function(modelNode, yAxis) {","                var nodeEdge, boundingSize;","                if (yAxis) {","                    nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');","                    boundingSize = boundingBoxY + boundingBoxHeight;","                }","                else {","                    nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');","                    boundingSize = boundingBoxX + boundingBoxWidth;","                }","                return boundingSize - nodeEdge;","            };","            getDistanceToUpperEdge = function(modelNode, yAxis) {","                var nodeEdge;","                if (yAxis) {","                    nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');","                }","                else {","                    nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');","                }","                return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);","            };","            itemFullVisible = function(modelNode) {","                return modelNode && inRegion(modelNode, boundingBox);","            };","            nextModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.next('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            prevModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            lastListItemIsInView = function(liElem) {","                return !host._itmsAvail && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);","            };","            getFirstFullVisibleModelNode = function(liElem) {","                var visibleNode;","                liElem.some(","                    function(node) {","                        visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;","                        return visibleNode;","                    }","                );","                return visibleNode;","            };","            getLastFullVisibleModelNode = function(liElem) {","                var visibleFound = false,","                    visibleNode;","                liElem.some(","                    function(node) {","                        var visible = itemFullVisible(node);","                        if (visible) {","                            visibleFound = true;","                            if (node.hasClass(MODEL_CLASS)) {","                                visibleNode = node;","                            }","                        }","                        return visibleFound && !visible;","                    }","                );","                return visibleNode;","            };","            scrollHome = function() {","                host.scrollIntoView(0);","                if (yAxis) {","                    scrollTo(null, 0);","                }","                else {","                    scrollTo(0, null);","                }","            };","            scrollEnd = function() {","                host.scrollIntoView(modelList.size()-1);","            };","            scrollToModelNode = function(modelNode) {","                var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));","                if (model) {","                    host.scrollIntoView(model);","                }","            };","            if (host.get('focused')) {","                modelsSelectable = host.get('modelsSelectable');","                viewNode = host._viewNode || host.get('srcNode').one('*');","                pagination = host.pages;","                if (pagination) {","                    paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);","                }","                axis = host.get('axis');","                xAxis = axis.x;","                yAxis = axis.y;","                itemHome = (keyCode===36);","                itemEnd = (keyCode===35);","                itemLeft = (keyCode===37) && xAxis;","                itemRight = (keyCode===39) && xAxis;","                itemUp = (keyCode===38) && yAxis;","                itemDown = (keyCode===40) && yAxis;","                pageLeft = (keyCode===33) && xAxis && !yAxis;","                pageRight = (keyCode===34) && xAxis && !yAxis;","                pageUp = (keyCode===33) && yAxis;","                pageDown = (keyCode===34) && yAxis;","                selectKey = ((keyCode===13) || (keyCode===32));","                if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {","                    e.preventDefault();","                }","                //===================================================================================================================================","                //","                // Elements might be selectable when ITSAScrollViewModellist is available","                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview","                //","                //===================================================================================================================================","                if (modelsSelectable) { // only when ITSAScrollViewModellist is active and host.get('modelsSelectable')===true","                    // models are selectable --> no scrolling but shifting through items","                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.","                    modelList = host.getModelListInUse();","                    if (itemHome) {","                        scrollHome();","                    }","                    else if (itemEnd) {","                        scrollEnd();","                    }","                    else if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {","                        lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);","                        if (lastFocusedModelNode) {","                            if (itemLeft || itemRight || itemUp || itemDown) {","                                lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)","                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                if (lastFocusedModelNode) {","                                    scrollToModelNode(lastFocusedModelNode);","                                }","                                if ((itemUp || itemLeft) && !lastFocusedModelNode) {","                                    scrollHome();","                                }","                            }","                            else if (pageRight || pageDown) {","                                nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.get('children');","                                        scrollToModelNode(getLastFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);","                                        while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {","                                            lastFocusedModelNode = nextModelNode;","                                            nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        }","                                        scrollToModelNode(lastFocusedModelNode);","                                    }","                                }","                            }","                            else if (pageLeft || pageUp) {","                                nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.get('children');","                                        scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                        if (!nextModelNode) {","                                            scrollHome();","                                        }","                                        else {","                                            remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);","                                            while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {","                                                lastFocusedModelNode = nextModelNode;","                                                nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                            }","                                            scrollToModelNode(lastFocusedModelNode);","                                        }","                                    }","                                }","                            }","                            else if (selectKey) {","                                clientId = lastFocusedModelNode.getData('modelClientId');","                                model = modelList.getByClientId(clientId);","                                if (host.modelIsSelected(model)) {","                                    host.unselectModels(model);","                                }","                                else {","                                    host.selectModels(model);","                                }","                            }","                        }","                        else if (itemDown || itemRight || pageDown || pageRight) {","                            // no model has active focus yet, only take action if shiftdown","                            liElements = viewNode.get('children');","                            if (itemDown || itemRight) {","                                // select first visible element on page","                                scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                            }","                            else {","                                // select last visible element on page","                                scrollToModelNode(getLastFullVisibleModelNode(liElements));","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // When elements are not selectable, do a 'normal' scrolling (dependent whether the Paginator is plugged in)","                //","                //===================================================================================================================================","                else {","                    // models are unselectable --> scroll the view","                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time","                    // If not, then we scroll 1 pixel at a time","                    if (pagination) {","                        // no ModelsSelectable, with Pagination","                        // we need the currentindex to calculate how many items to shift.","                        currentIndex = pagination.get('index');","                        totalCount = pagination.get('total');","                        liElements = viewNode.get('children');","                        if (itemLeft || itemUp) {","                            pagination.prev();","                        }","                        if (pageUp && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (pageLeft && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (itemHome) {","                            paginatorScrollToIndex(0);","                        }","                        // next we handle shifting to the end","                        if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {","                            newIndex = currentIndex+1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {","                            // now we need to find out what element is the last one that is not full-visible in the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {","                                modelNode = liElements.item(i);","                                currentVisible = inRegion(modelNode, boundingBox);","                            }","                            newIndex = i-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if (itemEnd && !lastListItemIsInView(liElements)) {","                            // Be aware that if ITSAInifiniteView is plugged in, we need to be sure the items are available.","                            if (infiniteScroll && host._itmsAvail) {","                                host.itsainfiniteview.loadAllItems();","                                totalCount = pagination.get('total');","                            }","                            newIndex = totalCount-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));","                            paginatorScrollToIndex(newIndex);","                        }","                    }","                    else {","                        // no ModelsSelectable, no Pagination","                        currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');","                        scrollToSave = Y.rbind(instance._saveScrollTo, instance);","                        if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {","                            if (itemLeft || itemUp || itemRight || itemDown) {","                                step = instance.get('step');","                            }","                            else {","                                step = yAxis ? boundingBoxHeight : boundingBoxWidth;","                            }","                            down = (pageRight || pageDown || itemRight || itemDown);","                            if (yAxis) {","                                scrollToSave(null, currentScroll + (down ? step : -step));","                            }","                            else {","                                scrollToSave(currentScroll + (down ? step : -step), null);","                            }","                            if (infiniteScroll && down) {","                                infiniteScroll.checkExpansion();","                            }","                        }","                        else if (itemHome) {","                            if (yAxis) {","                                scrollTo(null, 0);","                            }","                            else {","                                scrollTo(0, null);","                            }","                        }","                        else if (itemEnd) {","                            if (infiniteScroll) {","                                infiniteScroll.loadAllItems();","                            }","                            if (yAxis) {","                                scrollToSave(null, host._maxScrollY);","                            }","                            else {","                                scrollToSave(host._maxScrollX, null);","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // End of scrollnehaviour","                //","                //===================================================================================================================================","            }","            else {","            }","        },","","        /**","         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,","         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.","         *","         * @method _paginatorScrollToIndex","         * @private","         * @since 0.1","         *","        */","        _paginatorScrollToIndex : function(index) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                pagination = host && host.pages,","                itsainfiniteview = host && host.itsainfiniteview;","","            if (pagination) {","                if (itsainfiniteview) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","                    pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));","                }","                else {","                    pagination.scrollToIndex(index);","                }","            }","        },","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method _saveScrollTo","         * @param {Int} x The x-position to scroll to. (null for no movement)","         * @param {Int} y The y-position to scroll to. (null for no movement)","         * @private","         * @since 0.1","         *","        */","        _saveScrollTo : function(x, y) {","            var host = this.host;","","            if (x) {","                x = Math.max(0, x);","                x = Math.min(x, host._maxScrollX);","            }","            if (y) {","                y = Math.max(0, y);","                y = Math.min(y,  host._maxScrollY);","            }","            host.scrollTo(x, y);","        },","","        /**","         * Focuses the ScrollView-instance (host)","         *","         * @method _focusHost","         * @private","         * @since 0.1","         *","        */","        _focusHost : function() {","            var instance = this,","                host = this.host;","","            if (host && host.get('rendered')) {","                instance._focusHostSave();","            }","            else {","                instance.afterHostEvent('render', instance._focusHostSave, instance);","            }","        },","","        /**","         * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","         * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","         * bumbs too much.","         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","         * That's why the param is needed.","         *","         * @method _getMaxPaginatorGotoIndex","         * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","         * This only applies when the ITSAInifiniteView is plugged in.","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @return {Int} maximum PaginatorIndex that should be called.","         * @private","         * @since 0.1","         *","        */","        _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                paginator = host.hasPlugin('pages'),","                itsainfiniteview = host.hasPlugin('itsainfiniteview'),","                axis = host.get('axis'),","                yAxis = axis.y,","                boundingSize = host.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","                i = 0,","                hostModelList = host.getModelListInUse(), // only when ITSAScrollViewModellist is active","                viewNode = host._viewNode || host.get('srcNode').one('*'),","                liElements = viewNode.get('children'),","                listSize = (hostModelList && hostModelList.size()) || liElements.size(),","                lastNode, size;","","            if (paginator && (listSize>0)) {","                lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);","                if (yAxis) {","                    size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","                if (hostModelList && itsainfiniteview) {","                    // list might have been expanded --> we need to recalculate liElements","                    liElements = viewNode.get('children');","                }","                i = liElements.size();","                while (lastNode && (--i>=0) && (size<boundingSize)) {","                    lastNode = liElements.item(i);","                    if (yAxis) {","                        size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                    }","                    else {","                        size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                    }","                }","                if (size>=boundingSize) {i++;}","            }","            return i;","        },","","        /**","         * Focuses the ScrollView-instance (host), but is safe: the scrollview-instance is rendered here.","         *","         * @method _focusHostSave","         * @private","         * @since 0.1","         *","        */","        _focusHostSave : function() {","            var host = this.host;","","            if (host && host.focus) {","                host.focus();","            }","            else {","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsasvkeynav',","        ATTRS : {","","            /**","             * @description Whether the ScrollView-instance has initial focus when plugged in.","             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.","             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.","             *","             * @default true","             * @attribute initialFocus","             * @type Boolean","             * @since 0.1","            */","            initialFocus: {","                value: true,","                lazyAdd: false,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                },","                setter: '_focusHost'","            },","","            /**","             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.","             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>","             *","             * @default 10","             * @attribute step","             * @type Int","             * @since 0.1","            */","            step: {","                value: 10,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"pluginhost-base\", \"node\", \"dom-screen\"]});"];
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].lines = {"1":0,"3":0,"41":0,"46":0,"50":0,"63":0,"65":0,"66":0,"67":0,"80":0,"95":0,"97":0,"115":0,"138":0,"139":0,"149":0,"156":0,"157":0,"158":0,"159":0,"160":0,"163":0,"164":0,"166":0,"168":0,"169":0,"170":0,"171":0,"174":0,"176":0,"178":0,"179":0,"181":0,"182":0,"183":0,"185":0,"186":0,"187":0,"189":0,"190":0,"192":0,"193":0,"194":0,"196":0,"197":0,"200":0,"202":0,"203":0,"205":0,"207":0,"208":0,"209":0,"210":0,"211":0,"214":0,"217":0,"219":0,"220":0,"221":0,"222":0,"225":0,"228":0,"229":0,"231":0,"232":0,"233":0,"234":0,"237":0,"238":0,"239":0,"240":0,"241":0,"242":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"267":0,"270":0,"271":0,"272":0,"274":0,"275":0,"277":0,"278":0,"279":0,"280":0,"281":0,"283":0,"284":0,"286":0,"287":0,"290":0,"291":0,"292":0,"293":0,"294":0,"297":0,"298":0,"299":0,"303":0,"304":0,"305":0,"308":0,"309":0,"311":0,"315":0,"316":0,"317":0,"318":0,"319":0,"322":0,"323":0,"324":0,"328":0,"329":0,"330":0,"333":0,"334":0,"337":0,"338":0,"340":0,"345":0,"346":0,"347":0,"348":0,"349":0,"352":0,"356":0,"358":0,"359":0,"361":0,"365":0,"379":0,"382":0,"383":0,"384":0,"385":0,"386":0,"388":0,"391":0,"392":0,"393":0,"394":0,"397":0,"398":0,"399":0,"402":0,"405":0,"408":0,"409":0,"410":0,"411":0,"414":0,"415":0,"416":0,"419":0,"422":0,"423":0,"426":0,"427":0,"428":0,"429":0,"431":0,"434":0,"435":0,"436":0,"437":0,"439":0,"440":0,"441":0,"443":0,"445":0,"446":0,"447":0,"449":0,"450":0,"451":0,"456":0,"457":0,"458":0,"459":0,"460":0,"463":0,"465":0,"466":0,"467":0,"470":0,"472":0,"473":0,"476":0,"477":0,"478":0,"481":0,"484":0,"485":0,"486":0,"488":0,"489":0,"492":0,"522":0,"526":0,"527":0,"533":0,"536":0,"552":0,"554":0,"555":0,"556":0,"558":0,"559":0,"560":0,"562":0,"574":0,"577":0,"578":0,"581":0,"611":0,"624":0,"625":0,"626":0,"627":0,"630":0,"632":0,"634":0,"636":0,"637":0,"638":0,"639":0,"640":0,"643":0,"646":0,"648":0,"660":0,"662":0,"663":0,"678":0,"681":0,"704":0,"721":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].functions = {"GETSTYLE:45":0,"initializer:62":0,"destructor:79":0,"_bindUI:94":0,"inRegion:138":0,"getDistanceToLowerEdge:156":0,"getDistanceToUpperEdge:168":0,"itemFullVisible:178":0,"nextModelNodeIsFullVisible:181":0,"prevModelNodeIsFullVisible:185":0,"lastListItemIsInView:189":0,"(anonymous 2):195":0,"getFirstFullVisibleModelNode:192":0,"(anonymous 3):206":0,"getLastFullVisibleModelNode:202":0,"scrollHome:219":0,"scrollEnd:228":0,"scrollToModelNode:231":0,"_handleKeyDown:114":0,"_paginatorScrollToIndex:516":0,"_saveScrollTo:551":0,"_focusHost:573":0,"_getMaxPaginatorGotoIndex:605":0,"_focusHostSave:659":0,"(anonymous 4):680":0,"_clearEventhandlers:677":0,"validator:703":0,"validator:720":0,"(anonymous 1):1":0};
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


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 41);
var Lang = Y.Lang,
    YArray = Y.Array,
    MODEL_CLASS = 'itsa-scrollviewmodel',
    FOCUS_CLASS = MODEL_CLASS + '-focus',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "GETSTYLE", 45);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 46);
return parseInt(node.getStyle(style), 10);
    };


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 50);
Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {

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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "initializer", 62);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 63);
var instance = this,
                host;
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 65);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 66);
if (host instanceof Y.ScrollView) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 67);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "destructor", 79);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 80);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_bindUI", 94);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 95);
var instance = this;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 97);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_handleKeyDown", 114);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 115);
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
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 138);
inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "inRegion", 138);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 139);
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
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 149);
return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 156);
getDistanceToLowerEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToLowerEdge", 156);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 157);
var nodeEdge, boundingSize;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 158);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 159);
nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 160);
boundingSize = boundingBoxY + boundingBoxHeight;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 163);
nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 164);
boundingSize = boundingBoxX + boundingBoxWidth;
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 166);
return boundingSize - nodeEdge;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 168);
getDistanceToUpperEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToUpperEdge", 168);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 169);
var nodeEdge;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 170);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 171);
nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 174);
nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 176);
return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 178);
itemFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "itemFullVisible", 178);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 179);
return modelNode && inRegion(modelNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 181);
nextModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "nextModelNodeIsFullVisible", 181);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 182);
var nextNode = modelNode.next('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 183);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 185);
prevModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "prevModelNodeIsFullVisible", 185);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 186);
var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 187);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 189);
lastListItemIsInView = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "lastListItemIsInView", 189);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 190);
return !host._itmsAvail && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 192);
getFirstFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getFirstFullVisibleModelNode", 192);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 193);
var visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 194);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 2)", 195);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 196);
visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 197);
return visibleNode;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 200);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 202);
getLastFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getLastFullVisibleModelNode", 202);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 203);
var visibleFound = false,
                    visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 205);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 3)", 206);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 207);
var visible = itemFullVisible(node);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 208);
if (visible) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 209);
visibleFound = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 210);
if (node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 211);
visibleNode = node;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 214);
return visibleFound && !visible;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 217);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 219);
scrollHome = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollHome", 219);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 220);
host.scrollIntoView(0);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 221);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 222);
scrollTo(null, 0);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 225);
scrollTo(0, null);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 228);
scrollEnd = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollEnd", 228);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 229);
host.scrollIntoView(modelList.size()-1);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 231);
scrollToModelNode = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollToModelNode", 231);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 232);
var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 233);
if (model) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 234);
host.scrollIntoView(model);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 237);
if (host.get('focused')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 238);
modelsSelectable = host.get('modelsSelectable');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 239);
viewNode = host._viewNode || host.get('srcNode').one('*');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 240);
pagination = host.pages;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 241);
if (pagination) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 242);
paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 244);
axis = host.get('axis');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 245);
xAxis = axis.x;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 246);
yAxis = axis.y;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 247);
itemHome = (keyCode===36);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 248);
itemEnd = (keyCode===35);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 249);
itemLeft = (keyCode===37) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 250);
itemRight = (keyCode===39) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 251);
itemUp = (keyCode===38) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 252);
itemDown = (keyCode===40) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 253);
pageLeft = (keyCode===33) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 254);
pageRight = (keyCode===34) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 255);
pageUp = (keyCode===33) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 256);
pageDown = (keyCode===34) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 257);
selectKey = ((keyCode===13) || (keyCode===32));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 258);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 259);
e.preventDefault();
                }
                //===================================================================================================================================
                //
                // Elements might be selectable when ITSAScrollViewModellist is available
                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview
                //
                //===================================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 267);
if (modelsSelectable) { // only when ITSAScrollViewModellist is active and host.get('modelsSelectable')===true
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 270);
modelList = host.getModelListInUse();
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 271);
if (itemHome) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 272);
scrollHome();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 274);
if (itemEnd) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 275);
scrollEnd();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 277);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 278);
lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 279);
if (lastFocusedModelNode) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 280);
if (itemLeft || itemRight || itemUp || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 281);
lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)
                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 283);
if (lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 284);
scrollToModelNode(lastFocusedModelNode);
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 286);
if ((itemUp || itemLeft) && !lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 287);
scrollHome();
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 290);
if (pageRight || pageDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 291);
nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 292);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 293);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 294);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 297);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 298);
liElements = viewNode.get('children');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 299);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 303);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 304);
remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 305);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 308);
lastFocusedModelNode = nextModelNode;
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 309);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        }
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 311);
scrollToModelNode(lastFocusedModelNode);
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 315);
if (pageLeft || pageUp) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 316);
nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 317);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 318);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 319);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 322);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 323);
liElements = viewNode.get('children');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 324);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 328);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 329);
if (!nextModelNode) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 330);
scrollHome();
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 333);
remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 334);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 337);
lastFocusedModelNode = nextModelNode;
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 338);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                            }
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 340);
scrollToModelNode(lastFocusedModelNode);
                                        }
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 345);
if (selectKey) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 346);
clientId = lastFocusedModelNode.getData('modelClientId');
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 347);
model = modelList.getByClientId(clientId);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 348);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 349);
host.unselectModels(model);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 352);
host.selectModels(model);
                                }
                            }}}}
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 356);
if (itemDown || itemRight || pageDown || pageRight) {
                            // no model has active focus yet, only take action if shiftdown
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 358);
liElements = viewNode.get('children');
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 359);
if (itemDown || itemRight) {
                                // select first visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 361);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                            }
                            else {
                                // select last visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 365);
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
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 379);
if (pagination) {
                        // no ModelsSelectable, with Pagination
                        // we need the currentindex to calculate how many items to shift.
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 382);
currentIndex = pagination.get('index');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 383);
totalCount = pagination.get('total');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 384);
liElements = viewNode.get('children');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 385);
if (itemLeft || itemUp) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 386);
pagination.prev();
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 388);
if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 391);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 392);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 393);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 394);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 397);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 398);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 399);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 402);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 405);
if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 408);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 409);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 410);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 411);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 414);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 415);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 416);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 419);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 422);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 423);
paginatorScrollToIndex(0);
                        }
                        // next we handle shifting to the end
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 426);
if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 427);
newIndex = currentIndex+1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 428);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 429);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 431);
if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 434);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 435);
for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 436);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 437);
currentVisible = inRegion(modelNode, boundingBox);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 439);
newIndex = i-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 440);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 441);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 443);
if (itemEnd && !lastListItemIsInView(liElements)) {
                            // Be aware that if ITSAInifiniteView is plugged in, we need to be sure the items are available.
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 445);
if (infiniteScroll && host._itmsAvail) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 446);
host.itsainfiniteview.loadAllItems();
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 447);
totalCount = pagination.get('total');
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 449);
newIndex = totalCount-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 450);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 451);
paginatorScrollToIndex(newIndex);
                        }
                    }
                    else {
                        // no ModelsSelectable, no Pagination
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 456);
currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 457);
scrollToSave = Y.rbind(instance._saveScrollTo, instance);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 458);
if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 459);
if (itemLeft || itemUp || itemRight || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 460);
step = instance.get('step');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 463);
step = yAxis ? boundingBoxHeight : boundingBoxWidth;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 465);
down = (pageRight || pageDown || itemRight || itemDown);
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 466);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 467);
scrollToSave(null, currentScroll + (down ? step : -step));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 470);
scrollToSave(currentScroll + (down ? step : -step), null);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 472);
if (infiniteScroll && down) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 473);
infiniteScroll.checkExpansion();
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 476);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 477);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 478);
scrollTo(null, 0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 481);
scrollTo(0, null);
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 484);
if (itemEnd) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 485);
if (infiniteScroll) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 486);
infiniteScroll.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 488);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 489);
scrollToSave(null, host._maxScrollY);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 492);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_paginatorScrollToIndex", 516);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 522);
var host = this.host,
                pagination = host && host.pages,
                itsainfiniteview = host && host.itsainfiniteview;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 526);
if (pagination) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 527);
if (itsainfiniteview) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 533);
pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 536);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_saveScrollTo", 551);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 552);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 554);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 555);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 556);
x = Math.min(x, host._maxScrollX);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 558);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 559);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 560);
y = Math.min(y,  host._maxScrollY);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 562);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHost", 573);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 574);
var instance = this,
                host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 577);
if (host && host.get('rendered')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 578);
instance._focusHostSave();
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 581);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_getMaxPaginatorGotoIndex", 605);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 611);
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

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 624);
if (paginator && (listSize>0)) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 625);
lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 626);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 627);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 630);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 632);
if (hostModelList && itsainfiniteview) {
                    // list might have been expanded --> we need to recalculate liElements
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 634);
liElements = viewNode.get('children');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 636);
i = liElements.size();
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 637);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 638);
lastNode = liElements.item(i);
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 639);
if (yAxis) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 640);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 643);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 646);
if (size>=boundingSize) {i++;}
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 648);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHostSave", 659);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 660);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 662);
if (host && host.focus) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 663);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_clearEventhandlers", 677);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 678);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 4)", 680);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 681);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 703);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 704);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 720);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 721);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "pluginhost-base", "node", "dom-screen"]});
