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
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].code=["YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView KeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * The scrollview-instance needs to have foces (either set by myScrollView.focus() or by setting the attribute 'initialFocus' to true)."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    MODEL_CLASS = 'itsa-scrollviewmodel',","    FOCUS_CLASS = MODEL_CLASS + '-focus',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","            instance.host = host = instance.get('host');","            if (host instanceof Y.ScrollView) {","                instance._bindUI();","            }","            else {","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this;","","            instance._eventhandlers.push(","                Y.on(","                    'keydown',","                    Y.rbind(instance._handleKeyDown, instance)","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _handleKeyDown","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _handleKeyDown : function(e) {","            var instance = this,","                host = instance.host,","                keyCode = e.keyCode,","                infiniteScroll = host.itssvinfinite,","                scrollTo = Y.rbind(host.scrollTo, host),","                boundingBox = host.get('boundingBox'),","                boundingBoxX = boundingBox.getX(),","                boundingBoxY = boundingBox.getY(),","                boundingBoxHeight = boundingBox.get('offsetHeight') + GETSTYLE(boundingBox, 'borderTopWidth')","                        + GETSTYLE(boundingBox, 'borderBottomWidth') + GETSTYLE(boundingBox, 'paddingTop') + GETSTYLE(boundingBox,'paddingBottom'),","                boundingBoxWidth = boundingBox.get('offsetWidth')+GETSTYLE(boundingBox,'borderLeftWidth')+GETSTYLE(boundingBox,'borderRightWidth')","                        + GETSTYLE(boundingBox, 'paddingLeft') + GETSTYLE(boundingBox, 'paddingRight'),","                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),","                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),","                axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,","                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,","                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, currentScroll, remaining,","                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,","                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,","                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;","","            // tells if node1 is in region of node2","            // for some reason Y.DOM.inRegion() did not work ???","            inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {","                var node1XY = node1.getXY(),","                    node2XY = node2.getXY(),","                    left1 = node1XY[0],","                    top1 = node1XY[1],","                    right1 = left1 + node1.get('offsetWidth'),","                    bottom1 = top1 + node1.get('offsetHeight'),","                    left2 = node2XY[0] + (shiftLeftnode2 || 0),","                    top2 = node2XY[1] + (shiftTopnode2 || 0),","                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),","                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');","                return (","                    left1   >= left2   &&","                    right1  <= right2  &&","                    top1    >= top2    &&","                    bottom1 <= bottom2","                );","            };","            getDistanceToLowerEdge = function(modelNode, yAxis) {","                var nodeEdge, boundingSize;","                if (yAxis) {","                    nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');","                    boundingSize = boundingBoxY + boundingBoxHeight;","                }","                else {","                    nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');","                    boundingSize = boundingBoxX + boundingBoxWidth;","                }","                return boundingSize - nodeEdge;","            };","            getDistanceToUpperEdge = function(modelNode, yAxis) {","                var nodeEdge;","                if (yAxis) {","                    nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');","                }","                else {","                    nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');","                }","                return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);","            };","            itemFullVisible = function(modelNode) {","                return modelNode && inRegion(modelNode, boundingBox);","            };","            nextModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.next('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            prevModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            lastListItemIsInView = function(liElem) {","                return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);","            };","            getFirstFullVisibleModelNode = function(liElem) {","                var visibleNode;","                liElem.some(","                    function(node) {","                        visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;","                        return visibleNode;","                    }","                );","                return visibleNode;","            };","            getLastFullVisibleModelNode = function(liElem) {","                var visibleFound = false,","                    visibleNode;","                liElem.some(","                    function(node) {","                        var visible = itemFullVisible(node);","                        if (visible) {","                            visibleFound = true;","                            if (node.hasClass(MODEL_CLASS)) {","                                visibleNode = node;","                            }","                        }","                        return visibleFound && !visible;","                    }","                );","                return visibleNode;","            };","            scrollHome = function() {","                host.scrollIntoView(0);","                if (yAxis) {","                    scrollTo(null, 0);","                }","                else {","                    scrollTo(0, null);","                }","            };","            scrollEnd = function() {","                host.scrollIntoView(modelList.size()-1);","            };","            scrollToModelNode = function(modelNode) {","                var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));","                if (model) {","                    host.scrollIntoView(model);","                }","            };","            if (host.get('focused')) {","                modelsSelectable = host.get('modelsSelectable');","                viewNode = host._viewNode || host.get('srcNode').one('*');","                pagination = host.pages;","                if (pagination) {","                    paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);","                }","                axis = host.get('axis');","                xAxis = axis.x;","                yAxis = axis.y;","                itemHome = (keyCode===36);","                itemEnd = (keyCode===35);","                itemLeft = (keyCode===37) && xAxis;","                itemRight = (keyCode===39) && xAxis;","                itemUp = (keyCode===38) && yAxis;","                itemDown = (keyCode===40) && yAxis;","                pageLeft = (keyCode===33) && xAxis && !yAxis;","                pageRight = (keyCode===34) && xAxis && !yAxis;","                pageUp = (keyCode===33) && yAxis;","                pageDown = (keyCode===34) && yAxis;","                selectKey = ((keyCode===13) || (keyCode===32));","                if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {","                    e.preventDefault();","                }","                //===================================================================================================================================","                //","                // Elements might be selectable when ItsaScrollViewModelList is available","                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview","                //","                //===================================================================================================================================","                if (modelsSelectable) { // only when ItsaScrollViewModelList is active and host.get('modelsSelectable')===true","                    // models are selectable --> no scrolling but shifting through items","                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.","                    modelList = host._abberantModelList || host.get('modelList');","                    if (itemHome) {","                        scrollHome();","                    }","                    else if (itemEnd) {","                        scrollEnd();","                    }","                    else if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {","                        lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);","                        if (lastFocusedModelNode) {","                            if (itemLeft || itemRight || itemUp || itemDown) {","                                lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)","                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                if (lastFocusedModelNode) {","                                    scrollToModelNode(lastFocusedModelNode);","                                }","                                if ((itemUp || itemLeft) && !lastFocusedModelNode) {","                                    scrollHome();","                                }","                            }","                            else if (pageRight || pageDown) {","                                nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('>*');","                                        scrollToModelNode(getLastFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);","                                        while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {","                                            lastFocusedModelNode = nextModelNode;","                                            nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        }","                                        scrollToModelNode(lastFocusedModelNode);","                                    }","                                }","                            }","                            else if (pageLeft || pageUp) {","                                nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('>*');","                                        scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                        if (!nextModelNode) {","                                            scrollHome();","                                        }","                                        else {","                                            remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);","                                            while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {","                                                lastFocusedModelNode = nextModelNode;","                                                nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                            }","                                            scrollToModelNode(lastFocusedModelNode);","                                        }","                                    }","                                }","                            }","                            else if (selectKey) {","                                clientId = lastFocusedModelNode.getData('modelClientId');","                                model = modelList.getByClientId(clientId);","                                if (host.modelIsSelected(model)) {","                                    host.unselectModels(model);","                                }","                                else {","                                    host.selectModels(model);","                                }","                            }","                        }","                        else if (itemDown || itemRight || pageDown || pageRight) {","                            // no model has active focus yet, only take action if shiftdown","                            liElements = viewNode.all('>*');","                            if (itemDown || itemRight) {","                                // select first visible element on page","                                scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                            }","                            else {","                                // select last visible element on page","                                scrollToModelNode(getLastFullVisibleModelNode(liElements));","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // When elements are not selectable, do a 'normal' scrolling (dependent whether the Paginator is plugged in)","                //","                //===================================================================================================================================","                else {","                    // models are unselectable --> scroll the view","                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time","                    // If not, then we scroll 1 pixel at a time","                    if (pagination) {","                        // no ModelsSelectable, with Pagination","                        // we need the currentindex to calculate how many items to shift.","                        currentIndex = pagination.get('index');","                        totalCount = pagination.get('total');","                        liElements = viewNode.all('>*');","                        if (itemLeft || itemUp) {","                            pagination.prev();","                        }","                        if (pageUp && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (pageLeft && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (itemHome) {","                            paginatorScrollToIndex(0);","                        }","                        // next we handle shifting to the end","                        if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {","                            newIndex = currentIndex+1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {","                            // now we need to find out what element is the last one that is not full-visible in the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {","                                modelNode = liElements.item(i);","                                currentVisible = inRegion(modelNode, boundingBox);","                            }","                            newIndex = i-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));","                            paginatorScrollToIndex(newIndex);","                        }","                        if (itemEnd && !lastListItemIsInView(liElements)) {","                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.","                            if (infiniteScroll && host._moreItemsAvailable) {","                                host.itssvinfinite.loadAllItems();","                                totalCount = pagination.get('total');","                            }","                            newIndex = totalCount-1;","                            newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));","                            paginatorScrollToIndex(newIndex);","                        }","                    }","                    else {","                        // no ModelsSelectable, no Pagination","                        currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');","                        scrollToSave = Y.rbind(instance._saveScrollTo, instance);","                        if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {","                            if (itemLeft || itemUp || itemRight || itemDown) {","                                step = instance.get('step');","                            }","                            else {","                                step = yAxis ? boundingBoxHeight : boundingBoxWidth;","                            }","                            down = (pageRight || pageDown || itemRight || itemDown);","                            if (yAxis) {","                                scrollToSave(null, currentScroll + (down ? step : -step));","                            }","                            else {","                                scrollToSave(currentScroll + (down ? step : -step), null);","                            }","                            if (infiniteScroll && down) {","                                infiniteScroll.checkExpansion();","                            }","                        }","                        else if (itemHome) {","                            if (yAxis) {","                                scrollTo(null, 0);","                            }","                            else {","                                scrollTo(0, null);","                            }","                        }","                        else if (itemEnd) {","                            if (infiniteScroll) {","                                infiniteScroll.loadAllItems();","                            }","                            if (yAxis) {","                                scrollToSave(null, host._maxScrollY);","                            }","                            else {","                                scrollToSave(host._maxScrollX, null);","                            }","                        }","                    }","                }","                //===================================================================================================================================","                //","                // End of scrollnehaviour","                //","                //===================================================================================================================================","            }","            else {","            }","        },","","        /**","         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,","         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.","         *","         * @method _paginatorScrollToIndex","         * @private","         * @since 0.1","         *","        */","        _paginatorScrollToIndex : function(index) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                pagination = host && host.pages,","                itssvinfinite = host && host.itssvinfinite;","","            if (pagination) {","                if (itssvinfinite) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","                    pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));","                }","                else {","                    pagination.scrollToIndex(index);","                }","            }","        },","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method _saveScrollTo","         * @param {Int} x The x-position to scroll to. (null for no movement)","         * @param {Int} y The y-position to scroll to. (null for no movement)","         * @private","         * @since 0.1","         *","        */","        _saveScrollTo : function(x, y) {","            var host = this.host;","","            if (x) {","                x = Math.max(0, x);","                x = Math.min(x, host._maxScrollX);","            }","            if (y) {","                y = Math.max(0, y);","                y = Math.min(y,  host._maxScrollY);","            }","            host.scrollTo(x, y);","        },","","        /**","         * Focuses the ScrollView-instance (host)","         *","         * @method _focusHost","         * @private","         * @since 0.1","         *","        */","        _focusHost : function() {","            var instance = this,","                host = this.host;","","            if (host && host.get('rendered')) {","                instance._focusHostSave();","            }","            else {","                instance.afterHostEvent('render', instance._focusHostSave, instance);","            }","        },","","        /**","         * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","         * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","         * bumbs too much.","         * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the last Node, there might be a lot of","         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","         * That's why the param is needed.","         *","         * @method _getMaxPaginatorGotoIndex","         * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","         * This only applies when the ITSAScrollViewInifiniteScroll is plugged in.","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @return {Int} maximum PaginatorIndex that should be called.","         * @private","         * @since 0.1","         *","        */","        _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                paginator = host.hasPlugin('pages'),","                itssvinfinite = host.hasPlugin('itssvinfinite'),","                axis = host.get('axis'),","                yAxis = axis.y,","                boundingSize = host.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","                i = 0,","                hostModelList = host._abberantModelList || host.get('modelList'), // only when ItsaScrollviewModelList is active","                viewNode = host._viewNode || host.get('srcNode').one('*'),","                liElements = viewNode.all('>*'),","                listSize = (hostModelList && hostModelList.size()) || liElements.size(),","                lastNode, size;","","            if (paginator && (listSize>0)) {","                lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);","                if (yAxis) {","                    size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","                if (hostModelList && itssvinfinite) {","                    // list might have been expanded --> we need to recalculate liElements","                    liElements = viewNode.all('>*');","                }","                i = liElements.size();","                while (lastNode && (--i>=0) && (size<boundingSize)) {","                    lastNode = liElements.item(i);","                    if (yAxis) {","                        size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                    }","                    else {","                        size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                    }","                }","                if (size>=boundingSize) {i++;}","            }","            return i;","        },","","        /**","         * Focuses the ScrollView-instance (host), but is safe: the scrollview-instance is rendered here.","         *","         * @method _focusHostSave","         * @private","         * @since 0.1","         *","        */","        _focusHostSave : function() {","            var host = this.host;","","            if (host && host.focus) {","                host.focus();","            }","            else {","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itssvkeynav',","        ATTRS : {","","            /**","             * @description Whether the ScrollView-instance has initial focus when plugged in.","             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.","             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.","             *","             * @default true","             * @attribute initialFocus","             * @type Boolean","             * @since 0.1","            */","            initialFocus: {","                value: true,","                lazyAdd: false,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                },","                setter: '_focusHost'","            },","","            /**","             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.","             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>","             *","             * @default 10","             * @attribute step","             * @type Int","             * @since 0.1","            */","            step: {","                value: 10,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"pluginhost-base\", \"node\", \"dom-screen\"]});"];
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].lines = {"1":0,"3":0,"35":0,"40":0,"44":0,"57":0,"59":0,"60":0,"61":0,"74":0,"89":0,"91":0,"109":0,"132":0,"133":0,"143":0,"150":0,"151":0,"152":0,"153":0,"154":0,"157":0,"158":0,"160":0,"162":0,"163":0,"164":0,"165":0,"168":0,"170":0,"172":0,"173":0,"175":0,"176":0,"177":0,"179":0,"180":0,"181":0,"183":0,"184":0,"186":0,"187":0,"188":0,"190":0,"191":0,"194":0,"196":0,"197":0,"199":0,"201":0,"202":0,"203":0,"204":0,"205":0,"208":0,"211":0,"213":0,"214":0,"215":0,"216":0,"219":0,"222":0,"223":0,"225":0,"226":0,"227":0,"228":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"238":0,"239":0,"240":0,"241":0,"242":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"261":0,"264":0,"265":0,"266":0,"268":0,"269":0,"271":0,"272":0,"273":0,"274":0,"275":0,"277":0,"278":0,"280":0,"281":0,"284":0,"285":0,"286":0,"287":0,"288":0,"291":0,"292":0,"293":0,"297":0,"298":0,"299":0,"302":0,"303":0,"305":0,"309":0,"310":0,"311":0,"312":0,"313":0,"316":0,"317":0,"318":0,"322":0,"323":0,"324":0,"327":0,"328":0,"331":0,"332":0,"334":0,"339":0,"340":0,"341":0,"342":0,"343":0,"346":0,"350":0,"352":0,"353":0,"355":0,"359":0,"373":0,"376":0,"377":0,"378":0,"379":0,"380":0,"382":0,"385":0,"386":0,"387":0,"388":0,"391":0,"392":0,"393":0,"396":0,"399":0,"402":0,"403":0,"404":0,"405":0,"408":0,"409":0,"410":0,"413":0,"416":0,"417":0,"420":0,"421":0,"422":0,"423":0,"425":0,"428":0,"429":0,"430":0,"431":0,"433":0,"434":0,"435":0,"437":0,"439":0,"440":0,"441":0,"443":0,"444":0,"445":0,"450":0,"451":0,"452":0,"453":0,"454":0,"457":0,"459":0,"460":0,"461":0,"464":0,"466":0,"467":0,"470":0,"471":0,"472":0,"475":0,"478":0,"479":0,"480":0,"482":0,"483":0,"486":0,"516":0,"520":0,"521":0,"527":0,"530":0,"546":0,"548":0,"549":0,"550":0,"552":0,"553":0,"554":0,"556":0,"568":0,"571":0,"572":0,"575":0,"605":0,"618":0,"619":0,"620":0,"621":0,"624":0,"626":0,"628":0,"630":0,"631":0,"632":0,"633":0,"634":0,"637":0,"640":0,"642":0,"654":0,"656":0,"657":0,"672":0,"675":0,"698":0,"715":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].functions = {"GETSTYLE:39":0,"initializer:56":0,"destructor:73":0,"_bindUI:88":0,"inRegion:132":0,"getDistanceToLowerEdge:150":0,"getDistanceToUpperEdge:162":0,"itemFullVisible:172":0,"nextModelNodeIsFullVisible:175":0,"prevModelNodeIsFullVisible:179":0,"lastListItemIsInView:183":0,"(anonymous 2):189":0,"getFirstFullVisibleModelNode:186":0,"(anonymous 3):200":0,"getLastFullVisibleModelNode:196":0,"scrollHome:213":0,"scrollEnd:222":0,"scrollToModelNode:225":0,"_handleKeyDown:108":0,"_paginatorScrollToIndex:510":0,"_saveScrollTo:545":0,"_focusHost:567":0,"_getMaxPaginatorGotoIndex:599":0,"_focusHostSave:653":0,"(anonymous 4):674":0,"_clearEventhandlers:671":0,"validator:697":0,"validator:714":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredLines = 252;
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredFunctions = 29;
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 1);
YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 3);
'use strict';

/**
 * ScrollView KeyNav Plugin
 *
 *
 * Plugin that enables scrollview-navigation with keys.
 *
 * The scrollview-instance needs to have foces (either set by myScrollView.focus() or by setting the attribute 'initialFocus' to true).
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


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 35);
var Lang = Y.Lang,
    YArray = Y.Array,
    MODEL_CLASS = 'itsa-scrollviewmodel',
    FOCUS_CLASS = MODEL_CLASS + '-focus',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "GETSTYLE", 39);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 40);
return parseInt(node.getStyle(style), 10);
    };


_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 44);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "initializer", 56);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 57);
var instance = this,
                host;
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 59);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 60);
if (host instanceof Y.ScrollView) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 61);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "destructor", 73);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 74);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_bindUI", 88);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 89);
var instance = this;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 91);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_handleKeyDown", 108);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 109);
var instance = this,
                host = instance.host,
                keyCode = e.keyCode,
                infiniteScroll = host.itssvinfinite,
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
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 132);
inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "inRegion", 132);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 133);
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
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 143);
return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 150);
getDistanceToLowerEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToLowerEdge", 150);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 151);
var nodeEdge, boundingSize;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 152);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 153);
nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 154);
boundingSize = boundingBoxY + boundingBoxHeight;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 157);
nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 158);
boundingSize = boundingBoxX + boundingBoxWidth;
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 160);
return boundingSize - nodeEdge;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 162);
getDistanceToUpperEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToUpperEdge", 162);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 163);
var nodeEdge;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 164);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 165);
nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 168);
nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 170);
return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 172);
itemFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "itemFullVisible", 172);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 173);
return modelNode && inRegion(modelNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 175);
nextModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "nextModelNodeIsFullVisible", 175);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 176);
var nextNode = modelNode.next('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 177);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 179);
prevModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "prevModelNodeIsFullVisible", 179);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 180);
var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 181);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 183);
lastListItemIsInView = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "lastListItemIsInView", 183);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 184);
return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 186);
getFirstFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getFirstFullVisibleModelNode", 186);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 187);
var visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 188);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 2)", 189);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 190);
visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 191);
return visibleNode;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 194);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 196);
getLastFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getLastFullVisibleModelNode", 196);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 197);
var visibleFound = false,
                    visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 199);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 3)", 200);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 201);
var visible = itemFullVisible(node);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 202);
if (visible) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 203);
visibleFound = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 204);
if (node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 205);
visibleNode = node;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 208);
return visibleFound && !visible;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 211);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 213);
scrollHome = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollHome", 213);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 214);
host.scrollIntoView(0);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 215);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 216);
scrollTo(null, 0);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 219);
scrollTo(0, null);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 222);
scrollEnd = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollEnd", 222);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 223);
host.scrollIntoView(modelList.size()-1);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 225);
scrollToModelNode = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollToModelNode", 225);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 226);
var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 227);
if (model) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 228);
host.scrollIntoView(model);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 231);
if (host.get('focused')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 232);
modelsSelectable = host.get('modelsSelectable');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 233);
viewNode = host._viewNode || host.get('srcNode').one('*');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 234);
pagination = host.pages;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 235);
if (pagination) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 236);
paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 238);
axis = host.get('axis');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 239);
xAxis = axis.x;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 240);
yAxis = axis.y;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 241);
itemHome = (keyCode===36);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 242);
itemEnd = (keyCode===35);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 243);
itemLeft = (keyCode===37) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 244);
itemRight = (keyCode===39) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 245);
itemUp = (keyCode===38) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 246);
itemDown = (keyCode===40) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 247);
pageLeft = (keyCode===33) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 248);
pageRight = (keyCode===34) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 249);
pageUp = (keyCode===33) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 250);
pageDown = (keyCode===34) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 251);
selectKey = ((keyCode===13) || (keyCode===32));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 252);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 253);
e.preventDefault();
                }
                //===================================================================================================================================
                //
                // Elements might be selectable when ItsaScrollViewModelList is available
                // We need other behaviour in that case: scrolling through the items instead of scrolling through the scrollview
                //
                //===================================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 261);
if (modelsSelectable) { // only when ItsaScrollViewModelList is active and host.get('modelsSelectable')===true
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 264);
modelList = host._abberantModelList || host.get('modelList');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 265);
if (itemHome) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 266);
scrollHome();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 268);
if (itemEnd) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 269);
scrollEnd();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 271);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 272);
lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 273);
if (lastFocusedModelNode) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 274);
if (itemLeft || itemRight || itemUp || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 275);
lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)
                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 277);
if (lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 278);
scrollToModelNode(lastFocusedModelNode);
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 280);
if ((itemUp || itemLeft) && !lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 281);
scrollHome();
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 284);
if (pageRight || pageDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 285);
nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 286);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 287);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 288);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 291);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 292);
liElements = viewNode.all('>*');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 293);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 297);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 298);
remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 299);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 302);
lastFocusedModelNode = nextModelNode;
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 303);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        }
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 305);
scrollToModelNode(lastFocusedModelNode);
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 309);
if (pageLeft || pageUp) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 310);
nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 311);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 312);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 313);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 316);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 317);
liElements = viewNode.all('>*');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 318);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 322);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 323);
if (!nextModelNode) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 324);
scrollHome();
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 327);
remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 328);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 331);
lastFocusedModelNode = nextModelNode;
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 332);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                            }
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 334);
scrollToModelNode(lastFocusedModelNode);
                                        }
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 339);
if (selectKey) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 340);
clientId = lastFocusedModelNode.getData('modelClientId');
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 341);
model = modelList.getByClientId(clientId);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 342);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 343);
host.unselectModels(model);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 346);
host.selectModels(model);
                                }
                            }}}}
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 350);
if (itemDown || itemRight || pageDown || pageRight) {
                            // no model has active focus yet, only take action if shiftdown
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 352);
liElements = viewNode.all('>*');
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 353);
if (itemDown || itemRight) {
                                // select first visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 355);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                            }
                            else {
                                // select last visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 359);
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
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 373);
if (pagination) {
                        // no ModelsSelectable, with Pagination
                        // we need the currentindex to calculate how many items to shift.
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 376);
currentIndex = pagination.get('index');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 377);
totalCount = pagination.get('total');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 378);
liElements = viewNode.all('>*');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 379);
if (itemLeft || itemUp) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 380);
pagination.prev();
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 382);
if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 385);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 386);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 387);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 388);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 391);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 392);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 393);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 396);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 399);
if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 402);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 403);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 404);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 405);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 408);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 409);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 410);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 413);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 416);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 417);
paginatorScrollToIndex(0);
                        }
                        // next we handle shifting to the end
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 420);
if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 421);
newIndex = currentIndex+1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 422);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 423);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 425);
if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 428);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 429);
for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 430);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 431);
currentVisible = inRegion(modelNode, boundingBox);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 433);
newIndex = i-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 434);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex, 0));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 435);
paginatorScrollToIndex(newIndex);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 437);
if (itemEnd && !lastListItemIsInView(liElements)) {
                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 439);
if (infiniteScroll && host._moreItemsAvailable) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 440);
host.itssvinfinite.loadAllItems();
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 441);
totalCount = pagination.get('total');
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 443);
newIndex = totalCount-1;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 444);
newIndex = Math.min(newIndex, instance._getMaxPaginatorGotoIndex(newIndex));
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 445);
paginatorScrollToIndex(newIndex);
                        }
                    }
                    else {
                        // no ModelsSelectable, no Pagination
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 450);
currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 451);
scrollToSave = Y.rbind(instance._saveScrollTo, instance);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 452);
if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 453);
if (itemLeft || itemUp || itemRight || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 454);
step = instance.get('step');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 457);
step = yAxis ? boundingBoxHeight : boundingBoxWidth;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 459);
down = (pageRight || pageDown || itemRight || itemDown);
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 460);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 461);
scrollToSave(null, currentScroll + (down ? step : -step));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 464);
scrollToSave(currentScroll + (down ? step : -step), null);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 466);
if (infiniteScroll && down) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 467);
infiniteScroll.checkExpansion();
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 470);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 471);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 472);
scrollTo(null, 0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 475);
scrollTo(0, null);
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 478);
if (itemEnd) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 479);
if (infiniteScroll) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 480);
infiniteScroll.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 482);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 483);
scrollToSave(null, host._maxScrollY);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 486);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_paginatorScrollToIndex", 510);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 516);
var host = this.host,
                pagination = host && host.pages,
                itssvinfinite = host && host.itssvinfinite;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 520);
if (pagination) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 521);
if (itssvinfinite) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 527);
pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 530);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_saveScrollTo", 545);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 546);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 548);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 549);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 550);
x = Math.min(x, host._maxScrollX);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 552);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 553);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 554);
y = Math.min(y,  host._maxScrollY);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 556);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHost", 567);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 568);
var instance = this,
                host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 571);
if (host && host.get('rendered')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 572);
instance._focusHostSave();
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 575);
instance.afterHostEvent('render', instance._focusHostSave, instance);
            }
        },

        /**
         * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because
         * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)
         * bumbs too much.
         * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the last Node, there might be a lot of
         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
         * That's why the param is needed.
         *
         * @method _getMaxPaginatorGotoIndex
         * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.
         * This only applies when the ITSAScrollViewInifiniteScroll is plugged in.
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_getMaxPaginatorGotoIndex", 599);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 605);
var host = this.host,
                paginator = host.hasPlugin('pages'),
                itssvinfinite = host.hasPlugin('itssvinfinite'),
                axis = host.get('axis'),
                yAxis = axis.y,
                boundingSize = host.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
                i = 0,
                hostModelList = host._abberantModelList || host.get('modelList'), // only when ItsaScrollviewModelList is active
                viewNode = host._viewNode || host.get('srcNode').one('*'),
                liElements = viewNode.all('>*'),
                listSize = (hostModelList && hostModelList.size()) || liElements.size(),
                lastNode, size;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 618);
if (paginator && (listSize>0)) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 619);
lastNode = hostModelList ? host.getNodeFromIndex(Math.min(searchedIndex,listSize-1),maxExpansions) : liElements.item(listSize-1);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 620);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 621);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 624);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 626);
if (hostModelList && itssvinfinite) {
                    // list might have been expanded --> we need to recalculate liElements
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 628);
liElements = viewNode.all('>*');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 630);
i = liElements.size();
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 631);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 632);
lastNode = liElements.item(i);
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 633);
if (yAxis) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 634);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 637);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 640);
if (size>=boundingSize) {i++;}
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 642);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHostSave", 653);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 654);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 656);
if (host && host.focus) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 657);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_clearEventhandlers", 671);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 672);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 4)", 674);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 675);
item.detach();
                }
            );
        }

    }, {
        NS : 'itssvkeynav',
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 697);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 698);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 714);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 715);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "pluginhost-base", "node", "dom-screen"]});
