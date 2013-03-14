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
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].code=["YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView KeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * The scrollview-instance needs to have foces (either set by myScrollView.focus() or by setting the attribute 'initialFocus' to true)."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    MODEL_CLASS = 'itsa-scrollviewmodel',","    FOCUS_CLASS = MODEL_CLASS + '-focus',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            instance.host = host = instance.get('host');","            if (host instanceof Y.ScrollView) {","                instance._bindUI();","            }","            else {","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this;","","            instance._eventhandlers.push(","                Y.on(","                    'keydown',","                    Y.rbind(instance._handleKeyDown, instance)","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _handleKeyDown","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _handleKeyDown : function(e) {","            var instance = this,","                host = instance.host,","                keyCode = e.keyCode,","                infiniteScroll = host.itssvinfinite,","                scrollTo = Y.rbind(host.scrollTo, host),","                boundingBox = host.get('boundingBox'),","                boundingBoxX = boundingBox.getX(),","                boundingBoxY = boundingBox.getY(),","                boundingBoxHeight = boundingBox.get('offsetHeight'),","                boundingBoxWidth = boundingBox.get('offsetWidth'),","                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),","                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),","                paginationActive, axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,","                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,","                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, paginatorScrollToIndexSave, currentScroll, remaining,","                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,","                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,","                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;","","            // tells if node1 is in region of node2","            // for some reason Y.DOM.inRegion() did not work ???","            inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {","                var node1XY = node1.getXY(),","                    node2XY = node2.getXY(),","                    left1 = node1XY[0],","                    top1 = node1XY[1],","                    right1 = left1 + node1.get('offsetWidth'),","                    bottom1 = top1 + node1.get('offsetHeight'),","                    left2 = node2XY[0] + (shiftLeftnode2 || 0),","                    top2 = node2XY[1] + (shiftTopnode2 || 0),","                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),","                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');","                return (","                    left1   >= left2   &&","                    right1  <= right2  &&","                    top1    >= top2    &&","                    bottom1 <= bottom2","                );","            };","            getDistanceToLowerEdge = function(modelNode, yAxis) {","                var nodeEdge, boundingSize;","                if (yAxis) {","                    nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');","                    boundingSize = boundingBoxY + boundingBoxHeight;","                }","                else {","                    nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');","                    boundingSize = boundingBoxX + boundingBoxWidth;","                }","                return boundingSize - nodeEdge;","            };","            getDistanceToUpperEdge = function(modelNode, yAxis) {","                var nodeEdge;","                if (yAxis) {","                    nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');","                }","                else {","                    nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');","                }","                return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);","            };","            itemFullVisible = function(modelNode) {","                return modelNode && inRegion(modelNode, boundingBox);","            };","            nextModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.next('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            prevModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            lastListItemIsInView = function(liElem) {","                return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);","            };","            getFirstFullVisibleModelNode = function(liElem) {","                var visibleNode;","                liElem.some(","                    function(node) {","                        visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;","                        return visibleNode;","                    }","                );","                return visibleNode;","            };","            getLastFullVisibleModelNode = function(liElem) {","                var visibleFound = false,","                    visibleNode;","                liElem.some(","                    function(node) {","                        var visible = itemFullVisible(node);","                        if (visible) {","                            visibleFound = true;","                            if (node.hasClass(MODEL_CLASS)) {","                                visibleNode = node;","                            }","                        }","                        return visibleFound && !visible;","                    }","                );","                return visibleNode;","            };","            scrollHome = function() {","                host.scrollIntoView(0);","                if (yAxis) {","                    scrollTo(null, 0);","                }","                else {","                    scrollTo(0, null);","                }","            };","            scrollEnd = function() {","                host.scrollIntoView(modelList.size()-1);","            };","            scrollToModelNode = function(modelNode) {","                var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));","                if (model) {","                    host.scrollIntoView(model);","                }","            };","            if (host.get('focused')) {","                modelsSelectable = host.get('modelsSelectable');","                viewNode = host._viewNode || host.get('srcNode');","                paginationActive = host.hasPlugin('pages');","                if (paginationActive) {","                    pagination = host.pages;","                    paginatorScrollToIndexSave = Y.rbind(instance._paginatorScrollToIndex, instance);","                    paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);","                }","                axis = host.get('axis');","                xAxis = axis.x;","                yAxis = axis.y;","                itemHome = (keyCode===36);","                itemEnd = (keyCode===35);","                itemLeft = (keyCode===37) && xAxis;","                itemRight = (keyCode===39) && xAxis;","                itemUp = (keyCode===38) && yAxis;","                itemDown = (keyCode===40) && yAxis;","                pageLeft = (keyCode===33) && xAxis && !yAxis;","                pageRight = (keyCode===34) && xAxis && !yAxis;","                pageUp = (keyCode===33) && yAxis;","                pageDown = (keyCode===34) && yAxis;","                selectKey = ((keyCode===13) || (keyCode===32));","                if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {","                    e.preventDefault();","                }","                // Movementbehavior is different in different cases","                if (modelsSelectable) {","                    // models are selectable --> no scrolling but shifting through items","                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.","                    modelList = host._abberantModelList || host.get('modelList');","                    if (itemHome) {","                        scrollHome();","                    }","                    else if (itemEnd) {","                        scrollEnd();","                    }","                    else if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {","                        lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);","                        if (lastFocusedModelNode) {","                            if (itemLeft || itemRight || itemUp || itemDown) {","                                lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)","                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                if (lastFocusedModelNode) {","                                    scrollToModelNode(lastFocusedModelNode);","                                }","                                if ((itemUp || itemLeft) && !lastFocusedModelNode) {","                                    scrollHome();","                                }","                            }","                            else if (pageRight || pageDown) {","                                nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('li');","                                        scrollToModelNode(getLastFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);","                                        while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {","                                            lastFocusedModelNode = nextModelNode;","                                            nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        }","                                        scrollToModelNode(lastFocusedModelNode);","                                    }","                                }","                            }","                            else if (pageLeft || pageUp) {","                                nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('li');","                                        scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                        if (!nextModelNode) {","                                            scrollHome();","                                        }","                                        else {","                                            remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);","                                            while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {","                                                lastFocusedModelNode = nextModelNode;","                                                nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                            }","                                            scrollToModelNode(lastFocusedModelNode);","                                        }","                                    }","                                }","                            }","                            else if (selectKey) {","                                clientId = lastFocusedModelNode.getData('modelClientId');","                                model = modelList.getByClientId(clientId);","                                if (host.modelIsSelected(model)) {","                                    host.unselectModels(model);","                                }","                                else {","                                    host.selectModels(model);","                                }","                            }","                        }","                        else if (itemDown || itemRight || pageDown || pageRight) {","                            // no model has active focus yet, only take action if shiftdown","                            liElements = viewNode.all('li');","                            if (itemDown || itemRight) {","                                // select first visible element on page","                                scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                            }","                            else {","                                // select last visible element on page","                                scrollToModelNode(getLastFullVisibleModelNode(liElements));","                            }","                        }","                    }","                }","                else {","                    // models are unselectable --> scroll the view","                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time","                    // If not, then we scroll 1 pixel at a time","                    if (paginationActive) {","                        // no ModelsSelectable, with Pagination","                        // we need the currentindex to calculate how many items to shift.","                        currentIndex = pagination.get('index');","                        totalCount = pagination.get('total');","                        liElements = viewNode.all('li');","                        if (itemLeft || itemUp) {","                            pagination.prev();","                        }","                        if (pageUp && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight)); // needs dom-base","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (pageLeft && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0)); // needs dom-base","                            }","                            paginatorScrollToIndex(i+2);","                        }","                        if (itemHome) {","                            paginatorScrollToIndex(0);","                        }","                        // next we handle shifting to the end","                        if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {","                            paginatorScrollToIndexSave(currentIndex + 1);","                        }","                        if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {","                            // now we need to find out what element is the last one that is not full-visible in the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {","                                modelNode = liElements.item(i);","                                currentVisible = inRegion(modelNode, boundingBox);","                            }","                            paginatorScrollToIndexSave(i-1);","                        }","                        if (itemEnd && !lastListItemIsInView(liElements)) {","                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.","                            if (infiniteScroll && host._moreItemsAvailable) {","                                host.itssvinfinite.loadAllItems();","                            }","                            paginatorScrollToIndexSave(totalCount-1);","                        }","                    }","                    else {","                        // no ModelsSelectable, no Pagination","                        currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');","                        scrollToSave = Y.rbind(instance._saveScrollTo, instance);","                        if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {","                            if (itemLeft || itemUp || itemRight || itemDown) {","                                step = instance.get('step');","                            }","                            else {","                                step = yAxis ? boundingBoxHeight : boundingBoxWidth;","                            }","                            down = (pageRight || pageDown || itemRight || itemDown);","                            if (yAxis) {","                                scrollToSave(null, currentScroll + (down ? step : -step));","                            }","                            else {","                                scrollToSave(currentScroll + (down ? step : -step), null);","                            }","                            if (infiniteScroll && down) {","                                infiniteScroll.checkExpansion();","                            }","                        }","                        else if (itemHome) {","                            if (yAxis) {","                                scrollTo(null, 0);","                            }","                            else {","                                scrollTo(0, null);","                            }","                        }","                        else if (itemEnd) {","                            if (infiniteScroll) {","                                infiniteScroll.loadAllItems();","                            }","                            if (yAxis) {","                                scrollToSave(null, viewNode.get('offsetHeight'));","                            }","                            else {","                                scrollToSave(viewNode.get('offsetWidth'), null);","                            }","                        }","                    }","                }","            }","            else {","            }","        },","","        /**","         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,","         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.","         *","         * @method _paginatorScrollToIndex","         * @private","         * @since 0.1","         *","        */","        _paginatorScrollToIndex : function(index) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                pagination = host && host.pages;","","            if (pagination) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","                pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));","            }","        },","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method _saveScrollTo","         * @param x {Int} The x-position to scroll to. (null for no movement)","         * @param y {Int} The y-position to scroll to. (null for no movement)","         * @private","         * @since 0.1","         *","        */","        _saveScrollTo : function(x, y) {","            var host = this.host,","                boundingBox = host.get('boundingBox'),","                viewNode = host._viewNode || host.get('scrNode'),","                max;","","            if (x) {","                x = Math.max(0, x);","                max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","                x = Math.min(x, max);","            }","            if (y) {","                y = Math.max(0, y);","                max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","                y = Math.min(y, max);","            }","            host.scrollTo(x, y);","        },","","        /**","         * Focuses the ScrollView-instance (host)","         *","         * @method _focusHost","         * @private","         * @since 0.1","         *","        */","        _focusHost : function() {","            var host = this.host;","","            if (host && host.focus) {","                host.focus();","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itssvkeynav',","        ATTRS : {","","            /**","             * @description Whether the ScrollView-instance has initial focus when plugged in.","             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.","             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.","             *","             * @default true","             * @attribute initialFocus","             * @type Boolean","             * @since 0.1","            */","            initialFocus: {","                value: true,","                lazyAdd: false,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                },","                setter: '_focusHost'","            },","","            /**","             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.","             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>","             *","             * @default 10","             * @attribute step","             * @type Int","             * @since 0.1","            */","            step: {","                value: 10,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"pluginhost-base\", \"node-base\"]});"];
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].lines = {"1":0,"3":0,"35":0,"40":0,"44":0,"57":0,"60":0,"61":0,"62":0,"75":0,"90":0,"92":0,"110":0,"131":0,"132":0,"142":0,"149":0,"150":0,"151":0,"152":0,"153":0,"156":0,"157":0,"159":0,"161":0,"162":0,"163":0,"164":0,"167":0,"169":0,"171":0,"172":0,"174":0,"175":0,"176":0,"178":0,"179":0,"180":0,"182":0,"183":0,"185":0,"186":0,"187":0,"189":0,"190":0,"193":0,"195":0,"196":0,"198":0,"200":0,"201":0,"202":0,"203":0,"204":0,"207":0,"210":0,"212":0,"213":0,"214":0,"215":0,"218":0,"221":0,"222":0,"224":0,"225":0,"226":0,"227":0,"230":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"239":0,"240":0,"241":0,"242":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"257":0,"260":0,"261":0,"262":0,"264":0,"265":0,"267":0,"268":0,"269":0,"270":0,"271":0,"273":0,"274":0,"276":0,"277":0,"280":0,"281":0,"282":0,"283":0,"284":0,"287":0,"288":0,"289":0,"293":0,"294":0,"295":0,"298":0,"299":0,"301":0,"305":0,"306":0,"307":0,"308":0,"309":0,"312":0,"313":0,"314":0,"318":0,"319":0,"320":0,"323":0,"324":0,"327":0,"328":0,"330":0,"335":0,"336":0,"337":0,"338":0,"339":0,"342":0,"346":0,"348":0,"349":0,"351":0,"355":0,"364":0,"367":0,"368":0,"369":0,"370":0,"371":0,"373":0,"376":0,"377":0,"378":0,"379":0,"382":0,"383":0,"384":0,"387":0,"390":0,"393":0,"394":0,"395":0,"396":0,"399":0,"401":0,"402":0,"405":0,"406":0,"408":0,"411":0,"412":0,"413":0,"414":0,"416":0,"418":0,"420":0,"421":0,"423":0,"428":0,"429":0,"430":0,"431":0,"432":0,"435":0,"437":0,"438":0,"439":0,"442":0,"444":0,"445":0,"448":0,"449":0,"450":0,"453":0,"456":0,"457":0,"458":0,"460":0,"461":0,"464":0,"489":0,"492":0,"498":0,"513":0,"518":0,"519":0,"520":0,"521":0,"523":0,"524":0,"525":0,"526":0,"528":0,"540":0,"542":0,"543":0,"556":0,"559":0,"582":0,"599":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].functions = {"GETSTYLE:39":0,"initializer:56":0,"destructor:74":0,"_bindUI:89":0,"inRegion:131":0,"getDistanceToLowerEdge:149":0,"getDistanceToUpperEdge:161":0,"itemFullVisible:171":0,"nextModelNodeIsFullVisible:174":0,"prevModelNodeIsFullVisible:178":0,"lastListItemIsInView:182":0,"(anonymous 2):188":0,"getFirstFullVisibleModelNode:185":0,"(anonymous 3):199":0,"getLastFullVisibleModelNode:195":0,"scrollHome:212":0,"scrollEnd:221":0,"scrollToModelNode:224":0,"_handleKeyDown:109":0,"_paginatorScrollToIndex:483":0,"_saveScrollTo:512":0,"_focusHost:539":0,"(anonymous 4):558":0,"_clearEventhandlers:555":0,"validator:581":0,"validator:598":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredLines = 224;
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredFunctions = 27;
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

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 60);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 61);
if (host instanceof Y.ScrollView) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 62);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "destructor", 74);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 75);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_bindUI", 89);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 90);
var instance = this;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 92);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_handleKeyDown", 109);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 110);
var instance = this,
                host = instance.host,
                keyCode = e.keyCode,
                infiniteScroll = host.itssvinfinite,
                scrollTo = Y.rbind(host.scrollTo, host),
                boundingBox = host.get('boundingBox'),
                boundingBoxX = boundingBox.getX(),
                boundingBoxY = boundingBox.getY(),
                boundingBoxHeight = boundingBox.get('offsetHeight'),
                boundingBoxWidth = boundingBox.get('offsetWidth'),
                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),
                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),
                paginationActive, axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,
                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,
                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, paginatorScrollToIndexSave, currentScroll, remaining,
                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,
                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,
                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;

            // tells if node1 is in region of node2
            // for some reason Y.DOM.inRegion() did not work ???
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 131);
inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "inRegion", 131);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 132);
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
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 142);
return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 149);
getDistanceToLowerEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToLowerEdge", 149);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 150);
var nodeEdge, boundingSize;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 151);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 152);
nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 153);
boundingSize = boundingBoxY + boundingBoxHeight;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 156);
nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 157);
boundingSize = boundingBoxX + boundingBoxWidth;
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 159);
return boundingSize - nodeEdge;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 161);
getDistanceToUpperEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToUpperEdge", 161);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 162);
var nodeEdge;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 163);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 164);
nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 167);
nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 169);
return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 171);
itemFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "itemFullVisible", 171);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 172);
return modelNode && inRegion(modelNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 174);
nextModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "nextModelNodeIsFullVisible", 174);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 175);
var nextNode = modelNode.next('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 176);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 178);
prevModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "prevModelNodeIsFullVisible", 178);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 179);
var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 180);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 182);
lastListItemIsInView = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "lastListItemIsInView", 182);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 183);
return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 185);
getFirstFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getFirstFullVisibleModelNode", 185);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 186);
var visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 187);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 2)", 188);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 189);
visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 190);
return visibleNode;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 193);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 195);
getLastFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getLastFullVisibleModelNode", 195);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 196);
var visibleFound = false,
                    visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 198);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 3)", 199);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 200);
var visible = itemFullVisible(node);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 201);
if (visible) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 202);
visibleFound = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 203);
if (node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 204);
visibleNode = node;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 207);
return visibleFound && !visible;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 210);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 212);
scrollHome = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollHome", 212);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 213);
host.scrollIntoView(0);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 214);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 215);
scrollTo(null, 0);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 218);
scrollTo(0, null);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 221);
scrollEnd = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollEnd", 221);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 222);
host.scrollIntoView(modelList.size()-1);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 224);
scrollToModelNode = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollToModelNode", 224);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 225);
var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 226);
if (model) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 227);
host.scrollIntoView(model);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 230);
if (host.get('focused')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 231);
modelsSelectable = host.get('modelsSelectable');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 232);
viewNode = host._viewNode || host.get('srcNode');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 233);
paginationActive = host.hasPlugin('pages');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 234);
if (paginationActive) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 235);
pagination = host.pages;
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 236);
paginatorScrollToIndexSave = Y.rbind(instance._paginatorScrollToIndex, instance);
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 237);
paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 239);
axis = host.get('axis');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 240);
xAxis = axis.x;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 241);
yAxis = axis.y;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 242);
itemHome = (keyCode===36);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 243);
itemEnd = (keyCode===35);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 244);
itemLeft = (keyCode===37) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 245);
itemRight = (keyCode===39) && xAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 246);
itemUp = (keyCode===38) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 247);
itemDown = (keyCode===40) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 248);
pageLeft = (keyCode===33) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 249);
pageRight = (keyCode===34) && xAxis && !yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 250);
pageUp = (keyCode===33) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 251);
pageDown = (keyCode===34) && yAxis;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 252);
selectKey = ((keyCode===13) || (keyCode===32));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 253);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 254);
e.preventDefault();
                }
                // Movementbehavior is different in different cases
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 257);
if (modelsSelectable) {
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 260);
modelList = host._abberantModelList || host.get('modelList');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 261);
if (itemHome) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 262);
scrollHome();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 264);
if (itemEnd) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 265);
scrollEnd();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 267);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 268);
lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 269);
if (lastFocusedModelNode) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 270);
if (itemLeft || itemRight || itemUp || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 271);
lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)
                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 273);
if (lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 274);
scrollToModelNode(lastFocusedModelNode);
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 276);
if ((itemUp || itemLeft) && !lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 277);
scrollHome();
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 280);
if (pageRight || pageDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 281);
nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 282);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 283);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 284);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 287);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 288);
liElements = viewNode.all('li');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 289);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 293);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 294);
remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 295);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 298);
lastFocusedModelNode = nextModelNode;
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 299);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        }
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 301);
scrollToModelNode(lastFocusedModelNode);
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 305);
if (pageLeft || pageUp) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 306);
nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 307);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 308);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 309);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 312);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 313);
liElements = viewNode.all('li');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 314);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 318);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 319);
if (!nextModelNode) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 320);
scrollHome();
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 323);
remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 324);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 327);
lastFocusedModelNode = nextModelNode;
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 328);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                            }
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 330);
scrollToModelNode(lastFocusedModelNode);
                                        }
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 335);
if (selectKey) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 336);
clientId = lastFocusedModelNode.getData('modelClientId');
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 337);
model = modelList.getByClientId(clientId);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 338);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 339);
host.unselectModels(model);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 342);
host.selectModels(model);
                                }
                            }}}}
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 346);
if (itemDown || itemRight || pageDown || pageRight) {
                            // no model has active focus yet, only take action if shiftdown
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 348);
liElements = viewNode.all('li');
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 349);
if (itemDown || itemRight) {
                                // select first visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 351);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                            }
                            else {
                                // select last visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 355);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                            }
                        }}
                    }}}
                }
                else {
                    // models are unselectable --> scroll the view
                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time
                    // If not, then we scroll 1 pixel at a time
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 364);
if (paginationActive) {
                        // no ModelsSelectable, with Pagination
                        // we need the currentindex to calculate how many items to shift.
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 367);
currentIndex = pagination.get('index');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 368);
totalCount = pagination.get('total');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 369);
liElements = viewNode.all('li');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 370);
if (itemLeft || itemUp) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 371);
pagination.prev();
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 373);
if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 376);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 377);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 378);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 379);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight)); // needs dom-base
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 382);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 383);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 384);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 387);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 390);
if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 393);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 394);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 395);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 396);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0)); // needs dom-base
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 399);
paginatorScrollToIndex(i+2);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 401);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 402);
paginatorScrollToIndex(0);
                        }
                        // next we handle shifting to the end
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 405);
if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 406);
paginatorScrollToIndexSave(currentIndex + 1);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 408);
if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 411);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 412);
for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 413);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 414);
currentVisible = inRegion(modelNode, boundingBox);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 416);
paginatorScrollToIndexSave(i-1);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 418);
if (itemEnd && !lastListItemIsInView(liElements)) {
                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 420);
if (infiniteScroll && host._moreItemsAvailable) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 421);
host.itssvinfinite.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 423);
paginatorScrollToIndexSave(totalCount-1);
                        }
                    }
                    else {
                        // no ModelsSelectable, no Pagination
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 428);
currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 429);
scrollToSave = Y.rbind(instance._saveScrollTo, instance);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 430);
if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 431);
if (itemLeft || itemUp || itemRight || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 432);
step = instance.get('step');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 435);
step = yAxis ? boundingBoxHeight : boundingBoxWidth;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 437);
down = (pageRight || pageDown || itemRight || itemDown);
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 438);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 439);
scrollToSave(null, currentScroll + (down ? step : -step));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 442);
scrollToSave(currentScroll + (down ? step : -step), null);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 444);
if (infiniteScroll && down) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 445);
infiniteScroll.checkExpansion();
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 448);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 449);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 450);
scrollTo(null, 0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 453);
scrollTo(0, null);
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 456);
if (itemEnd) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 457);
if (infiniteScroll) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 458);
infiniteScroll.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 460);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 461);
scrollToSave(null, viewNode.get('offsetHeight'));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 464);
scrollToSave(viewNode.get('offsetWidth'), null);
                            }
                        }}}
                    }
                }
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_paginatorScrollToIndex", 483);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 489);
var host = this.host,
                pagination = host && host.pages;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 492);
if (pagination) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 498);
pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));
            }
        },

        /**
         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
         *
         * @method _saveScrollTo
         * @param x {Int} The x-position to scroll to. (null for no movement)
         * @param y {Int} The y-position to scroll to. (null for no movement)
         * @private
         * @since 0.1
         *
        */
        _saveScrollTo : function(x, y) {
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_saveScrollTo", 512);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 513);
var host = this.host,
                boundingBox = host.get('boundingBox'),
                viewNode = host._viewNode || host.get('scrNode'),
                max;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 518);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 519);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 520);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 521);
x = Math.min(x, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 523);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 524);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 525);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 526);
y = Math.min(y, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 528);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHost", 539);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 540);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 542);
if (host && host.focus) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 543);
host.focus();
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_clearEventhandlers", 555);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 556);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 4)", 558);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 559);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 581);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 582);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 598);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 599);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "pluginhost-base", "node-base"]});
