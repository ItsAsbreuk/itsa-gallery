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
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].code=["YUI.add('gallery-itsascrollviewkeynav', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView KeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * The scrollview-instance needs to have foces (either set by myScrollView.focus() or by setting the attribute 'initialFocus' to true)."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    MODEL_CLASS = 'itsa-scrollviewmodel',","    FOCUS_CLASS = MODEL_CLASS + '-focus',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","            instance.host = host = instance.get('host');","            if (host instanceof Y.ScrollView) {","                instance._bindUI();","            }","            else {","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this;","","            instance._eventhandlers.push(","                Y.on(","                    'keydown',","                    Y.rbind(instance._handleKeyDown, instance)","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _handleKeyDown","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _handleKeyDown : function(e) {","            var instance = this,","                host = instance.host,","                keyCode = e.keyCode,","                infiniteScroll = host.itssvinfinite,","                scrollTo = Y.rbind(host.scrollTo, host),","                boundingBox = host.get('boundingBox'),","                boundingBoxX = boundingBox.getX(),","                boundingBoxY = boundingBox.getY(),","                boundingBoxHeight = boundingBox.get('offsetHeight'),","                boundingBoxWidth = boundingBox.get('offsetWidth'),","                rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10),","                bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10),","                paginationActive, axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, viewNode, inRegion,","                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,","                itemHome, itemEnd, lastListItemIsInView, paginatorScrollToIndex, paginatorScrollToIndexSave, currentScroll, remaining,","                step, scrollToSave, down, lastFocusedModelNode, modelList, scrollHome, scrollEnd, nextModelNodeIsFullVisible,","                prevModelNodeIsFullVisible, itemFullVisible, getFirstFullVisibleModelNode, getLastFullVisibleModelNode, nextModelNode,","                scrollToModelNode, getDistanceToLowerEdge, getDistanceToUpperEdge, nextModelNodeVisible, newIndex, clientId, model;","","            // tells if node1 is in region of node2","            // for some reason Y.DOM.inRegion() did not work ???","            inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {","                var node1XY = node1.getXY(),","                    node2XY = node2.getXY(),","                    left1 = node1XY[0],","                    top1 = node1XY[1],","                    right1 = left1 + node1.get('offsetWidth'),","                    bottom1 = top1 + node1.get('offsetHeight'),","                    left2 = node2XY[0] + (shiftLeftnode2 || 0),","                    top2 = node2XY[1] + (shiftTopnode2 || 0),","                    right2 = node2XY[0] + (shiftRight2node2 || 0) + node2.get('offsetWidth'),","                    bottom2 = node2XY[1] + (shiftBottom2node2 || 0) + node2.get('offsetHeight');","                return (","                    left1   >= left2   &&","                    right1  <= right2  &&","                    top1    >= top2    &&","                    bottom1 <= bottom2","                );","            };","            getDistanceToLowerEdge = function(modelNode, yAxis) {","                var nodeEdge, boundingSize;","                if (yAxis) {","                    nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');","                    boundingSize = boundingBoxY + boundingBoxHeight;","                }","                else {","                    nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');","                    boundingSize = boundingBoxX + boundingBoxWidth;","                }","                return boundingSize - nodeEdge;","            };","            getDistanceToUpperEdge = function(modelNode, yAxis) {","                var nodeEdge;","                if (yAxis) {","                    nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');","                }","                else {","                    nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');","                }","                return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);","            };","            itemFullVisible = function(modelNode) {","                return modelNode && inRegion(modelNode, boundingBox);","            };","            nextModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.next('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            prevModelNodeIsFullVisible = function(modelNode) {","                var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;","                return nextNode && inRegion(nextNode, boundingBox);","            };","            lastListItemIsInView = function(liElem) {","                return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);","            };","            getFirstFullVisibleModelNode = function(liElem) {","                var visibleNode;","                liElem.some(","                    function(node) {","                        visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;","                        return visibleNode;","                    }","                );","                return visibleNode;","            };","            getLastFullVisibleModelNode = function(liElem) {","                var visibleFound = false,","                    visibleNode;","                liElem.some(","                    function(node) {","                        var visible = itemFullVisible(node);","                        if (visible) {","                            visibleFound = true;","                            if (node.hasClass(MODEL_CLASS)) {","                                visibleNode = node;","                            }","                        }","                        return visibleFound && !visible;","                    }","                );","                return visibleNode;","            };","            scrollHome = function() {","                host.scrollIntoView(0);","                if (yAxis) {","                    scrollTo(null, 0);","                }","                else {","                    scrollTo(0, null);","                }","            };","            scrollEnd = function() {","                host.scrollIntoView(modelList.size()-1);","            };","            scrollToModelNode = function(modelNode) {","                var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));","                if (model) {","                    host.scrollIntoView(model);","                }","            };","            if (host.get('focused')) {","                modelsSelectable = host.get('modelsSelectable');","                viewNode = host._viewNode || host.get('srcNode').one('ul');","                paginationActive = host.hasPlugin('pages');","                if (paginationActive) {","                    pagination = host.pages;","                    paginatorScrollToIndexSave = Y.rbind(instance._paginatorScrollToIndex, instance);","                    paginatorScrollToIndex = Y.rbind(pagination.scrollToIndex, pagination);","                }","                axis = host.get('axis');","                xAxis = axis.x;","                yAxis = axis.y;","                itemHome = (keyCode===36);","                itemEnd = (keyCode===35);","                itemLeft = (keyCode===37) && xAxis;","                itemRight = (keyCode===39) && xAxis;","                itemUp = (keyCode===38) && yAxis;","                itemDown = (keyCode===40) && yAxis;","                pageLeft = (keyCode===33) && xAxis && !yAxis;","                pageRight = (keyCode===34) && xAxis && !yAxis;","                pageUp = (keyCode===33) && yAxis;","                pageDown = (keyCode===34) && yAxis;","                selectKey = ((keyCode===13) || (keyCode===32));","                if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {","                    e.preventDefault();","                }","                // Movementbehavior is different in different cases","                if (modelsSelectable) {","                    // models are selectable --> no scrolling but shifting through items","                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.","                    modelList = host._abberantModelList || host.get('modelList');","                    if (itemHome) {","                        scrollHome();","                    }","                    else if (itemEnd) {","                        scrollEnd();","                    }","                    else if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {","                        lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);","                        if (lastFocusedModelNode) {","                            if (itemLeft || itemRight || itemUp || itemDown) {","                                lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)","                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                if (lastFocusedModelNode) {","                                    scrollToModelNode(lastFocusedModelNode);","                                }","                                if ((itemUp || itemLeft) && !lastFocusedModelNode) {","                                    scrollHome();","                                }","                            }","                            else if (pageRight || pageDown) {","                                nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('li');","                                        scrollToModelNode(getLastFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);","                                        while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,","                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {","                                            lastFocusedModelNode = nextModelNode;","                                            nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);","                                        }","                                        scrollToModelNode(lastFocusedModelNode);","                                    }","                                }","                            }","                            else if (pageLeft || pageUp) {","                                nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);","                                if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {","                                    nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                    scrollToModelNode(nextModelNode || lastFocusedModelNode);","                                }","                                else {","                                    if (nextModelNodeVisible) {","                                        liElements = viewNode.all('li');","                                        scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                                    }","                                    else {","                                        // scroll to modelNode that is outside the area. Scroll 1 page.","                                        nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                        if (!nextModelNode) {","                                            scrollHome();","                                        }","                                        else {","                                            remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);","                                            while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,","                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {","                                                lastFocusedModelNode = nextModelNode;","                                                nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);","                                            }","                                            scrollToModelNode(lastFocusedModelNode);","                                        }","                                    }","                                }","                            }","                            else if (selectKey) {","                                clientId = lastFocusedModelNode.getData('modelClientId');","                                model = modelList.getByClientId(clientId);","                                if (host.modelIsSelected(model)) {","                                    host.unselectModels(model);","                                }","                                else {","                                    host.selectModels(model);","                                }","                            }","                        }","                        else if (itemDown || itemRight || pageDown || pageRight) {","                            // no model has active focus yet, only take action if shiftdown","                            liElements = viewNode.all('li');","                            if (itemDown || itemRight) {","                                // select first visible element on page","                                scrollToModelNode(getFirstFullVisibleModelNode(liElements));","                            }","                            else {","                                // select last visible element on page","                                scrollToModelNode(getLastFullVisibleModelNode(liElements));","                            }","                        }","                    }","                }","                else {","                    // models are unselectable --> scroll the view","                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time","                    // If not, then we scroll 1 pixel at a time","                    if (paginationActive) {","                        // no ModelsSelectable, with Pagination","                        // we need the currentindex to calculate how many items to shift.","                        currentIndex = pagination.get('index');","                        totalCount = pagination.get('total');","                        liElements = viewNode.all('li');","                        if (itemLeft || itemUp) {","                            pagination.prev();","                        }","                        if (pageUp && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (pageLeft && (currentIndex>0)) {","                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {","                                modelNode = liElements.item(i);","                                currentVisible = ((i===currentIndex-1) ||","                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));","                            }","                            newIndex = i + 2;","                            if (currentIndex === newIndex) {","                                paginatorScrollToIndex(0);","                            }","                            else {","                                paginatorScrollToIndex(newIndex);","                            }","                        }","                        if (itemHome) {","                            paginatorScrollToIndex(0);","                        }","                        // next we handle shifting to the end","                        if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {","                            paginatorScrollToIndexSave(Math.min(currentIndex+1, totalCount-1));","                        }","                        if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {","                            // now we need to find out what element is the last one that is not full-visible in the viewport.","                            // because we always need to shift 1 item, we can set currentVisible = true","                            currentVisible = true;","                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {","                                modelNode = liElements.item(i);","                                currentVisible = inRegion(modelNode, boundingBox);","                            }","                            paginatorScrollToIndexSave(i-1);","                        }","                        if (itemEnd && !lastListItemIsInView(liElements)) {","                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.","                            if (infiniteScroll && host._moreItemsAvailable) {","                                host.itssvinfinite.loadAllItems();","                            }","                            paginatorScrollToIndexSave(totalCount-1);","                        }","                    }","                    else {","                        // no ModelsSelectable, no Pagination","                        currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');","                        scrollToSave = Y.rbind(instance._saveScrollTo, instance);","                        if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {","                            if (itemLeft || itemUp || itemRight || itemDown) {","                                step = instance.get('step');","                            }","                            else {","                                step = yAxis ? boundingBoxHeight : boundingBoxWidth;","                            }","                            down = (pageRight || pageDown || itemRight || itemDown);","                            if (yAxis) {","                                scrollToSave(null, currentScroll + (down ? step : -step));","                            }","                            else {","                                scrollToSave(currentScroll + (down ? step : -step), null);","                            }","                            if (infiniteScroll && down) {","                                infiniteScroll.checkExpansion();","                            }","                        }","                        else if (itemHome) {","                            if (yAxis) {","                                scrollTo(null, 0);","                            }","                            else {","                                scrollTo(0, null);","                            }","                        }","                        else if (itemEnd) {","                            if (infiniteScroll) {","                                infiniteScroll.loadAllItems();","                            }","                            if (yAxis) {","                                scrollToSave(null, viewNode.get('offsetHeight'));","                            }","                            else {","                                scrollToSave(viewNode.get('offsetWidth'), null);","                            }","                        }","                    }","                }","            }","            else {","            }","        },","","        /**","         * Equals pages.scrollToIndex, but makes sure the maximum PaginatorIndex is used that can be called. This is <b>lower</b> than the list-size,","         * because it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem) bumbs too much.","         *","         * @method _paginatorScrollToIndex","         * @private","         * @since 0.1","         *","        */","        _paginatorScrollToIndex : function(index) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                pagination = host && host.pages,","                itssvinfinite = host && host.itssvinfinite;","","            if (pagination) {","                if (itssvinfinite) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","                    pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));","                }","                else {","                    pagination.scrollToIndex(index);","                }","            }","        },","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method _saveScrollTo","         * @param x {Int} The x-position to scroll to. (null for no movement)","         * @param y {Int} The y-position to scroll to. (null for no movement)","         * @private","         * @since 0.1","         *","        */","        _saveScrollTo : function(x, y) {","            var host = this.host,","                boundingBox = host.get('boundingBox'),","                viewNode = host._viewNode || host.get('srcNode').one('ul'),","                max;","            if (x) {","                x = Math.max(0, x);","                max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","                x = Math.min(x, max);","            }","            if (y) {","                y = Math.max(0, y);","                max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","                y = Math.min(y, max);","            }","            host.scrollTo(x, y);","        },","","        /**","         * Focuses the ScrollView-instance (host)","         *","         * @method _focusHost","         * @private","         * @since 0.1","         *","        */","        _focusHost : function() {","            var instance = this,","                host = this.host;","","            if (host && host.get('rendered')) {","                instance._focusHostSave();","            }","            else {","                instance.afterHostEvent('render', instance._focusHostSave, instance);","            }","        },","","        /**","         * Focuses the ScrollView-instance (host), but is safe: the scrollview-instance is rendered here.","         *","         * @method _focusHostSave","         * @private","         * @since 0.1","         *","        */","        _focusHostSave : function() {","            var host = this.host;","","            if (host && host.focus) {","                host.focus();","            }","            else {","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itssvkeynav',","        ATTRS : {","","            /**","             * @description Whether the ScrollView-instance has initial focus when plugged in.","             * Key-Navigation only works when the scrollview has focus. This attribute may focus, but only during pluging.","             * If you want to change the focus afterward, you must do this with <b>yourScrollView.focus()</b> or <b>yourScrollView.blur()</b>.","             *","             * @default true","             * @attribute initialFocus","             * @type Boolean","             * @since 0.1","            */","            initialFocus: {","                value: true,","                lazyAdd: false,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                },","                setter: '_focusHost'","            },","","            /**","             * @description The ammount of <b>pixels</b> that the scrollview should be scrolled when an arrow-key is pressed.","             * <i>Is only relevant when ScrollViewPaginator is not plugged in --> if it is plugged in, the scolling will be item-based)</i>","             *","             * @default 10","             * @attribute step","             * @type Int","             * @since 0.1","            */","            step: {","                value: 10,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"pluginhost-base\", \"node\", \"dom-screen\"]});"];
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].lines = {"1":0,"3":0,"35":0,"40":0,"44":0,"57":0,"59":0,"60":0,"61":0,"74":0,"89":0,"91":0,"109":0,"130":0,"131":0,"141":0,"148":0,"149":0,"150":0,"151":0,"152":0,"155":0,"156":0,"158":0,"160":0,"161":0,"162":0,"163":0,"166":0,"168":0,"170":0,"171":0,"173":0,"174":0,"175":0,"177":0,"178":0,"179":0,"181":0,"182":0,"184":0,"185":0,"186":0,"188":0,"189":0,"192":0,"194":0,"195":0,"197":0,"199":0,"200":0,"201":0,"202":0,"203":0,"206":0,"209":0,"211":0,"212":0,"213":0,"214":0,"217":0,"220":0,"221":0,"223":0,"224":0,"225":0,"226":0,"229":0,"230":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"238":0,"239":0,"240":0,"241":0,"242":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"256":0,"259":0,"260":0,"261":0,"263":0,"264":0,"266":0,"267":0,"268":0,"269":0,"270":0,"272":0,"273":0,"275":0,"276":0,"279":0,"280":0,"281":0,"282":0,"283":0,"286":0,"287":0,"288":0,"292":0,"293":0,"294":0,"297":0,"298":0,"300":0,"304":0,"305":0,"306":0,"307":0,"308":0,"311":0,"312":0,"313":0,"317":0,"318":0,"319":0,"322":0,"323":0,"326":0,"327":0,"329":0,"334":0,"335":0,"336":0,"337":0,"338":0,"341":0,"345":0,"347":0,"348":0,"350":0,"354":0,"363":0,"366":0,"367":0,"368":0,"369":0,"370":0,"372":0,"375":0,"376":0,"377":0,"378":0,"381":0,"382":0,"383":0,"386":0,"389":0,"392":0,"393":0,"394":0,"395":0,"398":0,"399":0,"400":0,"403":0,"406":0,"407":0,"410":0,"411":0,"413":0,"416":0,"417":0,"418":0,"419":0,"421":0,"423":0,"425":0,"426":0,"428":0,"433":0,"434":0,"435":0,"436":0,"437":0,"440":0,"442":0,"443":0,"444":0,"447":0,"449":0,"450":0,"453":0,"454":0,"455":0,"458":0,"461":0,"462":0,"463":0,"465":0,"466":0,"469":0,"494":0,"498":0,"499":0,"505":0,"508":0,"524":0,"528":0,"529":0,"530":0,"531":0,"533":0,"534":0,"535":0,"536":0,"538":0,"550":0,"553":0,"554":0,"557":0,"570":0,"572":0,"573":0,"588":0,"591":0,"614":0,"631":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].functions = {"GETSTYLE:39":0,"initializer:56":0,"destructor:73":0,"_bindUI:88":0,"inRegion:130":0,"getDistanceToLowerEdge:148":0,"getDistanceToUpperEdge:160":0,"itemFullVisible:170":0,"nextModelNodeIsFullVisible:173":0,"prevModelNodeIsFullVisible:177":0,"lastListItemIsInView:181":0,"(anonymous 2):187":0,"getFirstFullVisibleModelNode:184":0,"(anonymous 3):198":0,"getLastFullVisibleModelNode:194":0,"scrollHome:211":0,"scrollEnd:220":0,"scrollToModelNode:223":0,"_handleKeyDown:108":0,"_paginatorScrollToIndex:488":0,"_saveScrollTo:523":0,"_focusHost:549":0,"_focusHostSave:569":0,"(anonymous 4):590":0,"_clearEventhandlers:587":0,"validator:613":0,"validator:630":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredLines = 233;
_yuitest_coverage["build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js"].coveredFunctions = 28;
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
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 130);
inRegion = function(node1, node2, shiftLeftnode2, shiftTopnode2, shiftRight2node2, shiftBottom2node2) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "inRegion", 130);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 131);
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
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 141);
return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 148);
getDistanceToLowerEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToLowerEdge", 148);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 149);
var nodeEdge, boundingSize;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 150);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 151);
nodeEdge = modelNode.getY() + modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginBottom');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 152);
boundingSize = boundingBoxY + boundingBoxHeight;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 155);
nodeEdge = modelNode.getX() + modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginRight');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 156);
boundingSize = boundingBoxX + boundingBoxWidth;
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 158);
return boundingSize - nodeEdge;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 160);
getDistanceToUpperEdge = function(modelNode, yAxis) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getDistanceToUpperEdge", 160);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 161);
var nodeEdge;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 162);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 163);
nodeEdge = modelNode.getY() - GETSTYLE(modelNode, 'marginTop');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 166);
nodeEdge = modelNode.getX() - GETSTYLE(modelNode, 'marginLeft');
                }
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 168);
return nodeEdge - (yAxis ? boundingBoxY : boundingBoxX);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 170);
itemFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "itemFullVisible", 170);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 171);
return modelNode && inRegion(modelNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 173);
nextModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "nextModelNodeIsFullVisible", 173);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 174);
var nextNode = modelNode.next('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 175);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 177);
prevModelNodeIsFullVisible = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "prevModelNodeIsFullVisible", 177);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 178);
var nextNode = modelNode.previous('.'+MODEL_CLASS) || false;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 179);
return nextNode && inRegion(nextNode, boundingBox);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 181);
lastListItemIsInView = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "lastListItemIsInView", 181);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 182);
return !host._moreItemsAvailable && inRegion(liElem.item(liElem.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 184);
getFirstFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getFirstFullVisibleModelNode", 184);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 185);
var visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 186);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 2)", 187);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 188);
visibleNode = itemFullVisible(node) && node.hasClass(MODEL_CLASS) && node;
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 189);
return visibleNode;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 192);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 194);
getLastFullVisibleModelNode = function(liElem) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "getLastFullVisibleModelNode", 194);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 195);
var visibleFound = false,
                    visibleNode;
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 197);
liElem.some(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 3)", 198);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 199);
var visible = itemFullVisible(node);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 200);
if (visible) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 201);
visibleFound = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 202);
if (node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 203);
visibleNode = node;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 206);
return visibleFound && !visible;
                    }
                );
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 209);
return visibleNode;
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 211);
scrollHome = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollHome", 211);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 212);
host.scrollIntoView(0);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 213);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 214);
scrollTo(null, 0);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 217);
scrollTo(0, null);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 220);
scrollEnd = function() {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollEnd", 220);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 221);
host.scrollIntoView(modelList.size()-1);
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 223);
scrollToModelNode = function(modelNode) {
                _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "scrollToModelNode", 223);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 224);
var model = modelList && modelNode && modelList.getByClientId(modelNode.getData('modelClientId'));
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 225);
if (model) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 226);
host.scrollIntoView(model);
                }
            };
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 229);
if (host.get('focused')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 230);
modelsSelectable = host.get('modelsSelectable');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 231);
viewNode = host._viewNode || host.get('srcNode').one('ul');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 232);
paginationActive = host.hasPlugin('pages');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 233);
if (paginationActive) {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 234);
pagination = host.pages;
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 235);
paginatorScrollToIndexSave = Y.rbind(instance._paginatorScrollToIndex, instance);
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
                // Movementbehavior is different in different cases
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 256);
if (modelsSelectable) {
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 259);
modelList = host._abberantModelList || host.get('modelList');
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 260);
if (itemHome) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 261);
scrollHome();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 263);
if (itemEnd) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 264);
scrollEnd();
                    }
                    else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 266);
if (selectKey || itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown) {
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 267);
lastFocusedModelNode = viewNode.one('.'+FOCUS_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 268);
if (lastFocusedModelNode) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 269);
if (itemLeft || itemRight || itemUp || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 270);
lastFocusedModelNode = (itemDown || itemRight) ? lastFocusedModelNode.next('.'+MODEL_CLASS)
                                                   : lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 272);
if (lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 273);
scrollToModelNode(lastFocusedModelNode);
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 275);
if ((itemUp || itemLeft) && !lastFocusedModelNode) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 276);
scrollHome();
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 279);
if (pageRight || pageDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 280);
nextModelNodeVisible = nextModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 281);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 282);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 283);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 286);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 287);
liElements = viewNode.all('li');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 288);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 292);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 293);
remaining = getDistanceToLowerEdge(lastFocusedModelNode, pageDown);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 294);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining, 0,
                                                                        (pageDown ? boundingBoxHeight : boundingBoxWidth)-remaining)) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 297);
lastFocusedModelNode = nextModelNode;
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 298);
nextModelNode = lastFocusedModelNode.next('.'+MODEL_CLASS);
                                        }
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 300);
scrollToModelNode(lastFocusedModelNode);
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 304);
if (pageLeft || pageUp) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 305);
nextModelNodeVisible = prevModelNodeIsFullVisible(lastFocusedModelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 306);
if (!itemFullVisible(lastFocusedModelNode) && !nextModelNodeVisible) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 307);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 308);
scrollToModelNode(nextModelNode || lastFocusedModelNode);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 311);
if (nextModelNodeVisible) {
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 312);
liElements = viewNode.all('li');
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 313);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                                    }
                                    else {
                                        // scroll to modelNode that is outside the area. Scroll 1 page.
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 317);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 318);
if (!nextModelNode) {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 319);
scrollHome();
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 322);
remaining = getDistanceToUpperEdge(lastFocusedModelNode, pageUp);
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 323);
while (nextModelNode && inRegion(nextModelNode, boundingBox, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining, 0,
                                                                            -(pageUp ? boundingBoxHeight : boundingBoxWidth)+remaining)) {
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 326);
lastFocusedModelNode = nextModelNode;
                                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 327);
nextModelNode = lastFocusedModelNode.previous('.'+MODEL_CLASS);
                                            }
                                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 329);
scrollToModelNode(lastFocusedModelNode);
                                        }
                                    }
                                }
                            }
                            else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 334);
if (selectKey) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 335);
clientId = lastFocusedModelNode.getData('modelClientId');
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 336);
model = modelList.getByClientId(clientId);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 337);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 338);
host.unselectModels(model);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 341);
host.selectModels(model);
                                }
                            }}}}
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 345);
if (itemDown || itemRight || pageDown || pageRight) {
                            // no model has active focus yet, only take action if shiftdown
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 347);
liElements = viewNode.all('li');
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 348);
if (itemDown || itemRight) {
                                // select first visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 350);
scrollToModelNode(getFirstFullVisibleModelNode(liElements));
                            }
                            else {
                                // select last visible element on page
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 354);
scrollToModelNode(getLastFullVisibleModelNode(liElements));
                            }
                        }}
                    }}}
                }
                else {
                    // models are unselectable --> scroll the view
                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time
                    // If not, then we scroll 1 pixel at a time
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 363);
if (paginationActive) {
                        // no ModelsSelectable, with Pagination
                        // we need the currentindex to calculate how many items to shift.
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 366);
currentIndex = pagination.get('index');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 367);
totalCount = pagination.get('total');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 368);
liElements = viewNode.all('li');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 369);
if (itemLeft || itemUp) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 370);
pagination.prev();
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 372);
if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 375);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 376);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 377);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 378);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBoxHeight));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 381);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 382);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 383);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 386);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 389);
if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 392);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 393);
for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 394);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 395);
currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBoxWidth, 0));
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 398);
newIndex = i + 2;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 399);
if (currentIndex === newIndex) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 400);
paginatorScrollToIndex(0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 403);
paginatorScrollToIndex(newIndex);
                            }
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 406);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 407);
paginatorScrollToIndex(0);
                        }
                        // next we handle shifting to the end
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 410);
if ((itemRight || itemDown) && !lastListItemIsInView(liElements)) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 411);
paginatorScrollToIndexSave(Math.min(currentIndex+1, totalCount-1));
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 413);
if ((pageDown || pageRight) && !lastListItemIsInView(liElements)) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 416);
currentVisible = true;
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 417);
for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 418);
modelNode = liElements.item(i);
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 419);
currentVisible = inRegion(modelNode, boundingBox);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 421);
paginatorScrollToIndexSave(i-1);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 423);
if (itemEnd && !lastListItemIsInView(liElements)) {
                            // Be aware that if ITSAScrollViewInifiniteScroll is plugged in, we need to be sure the items are available.
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 425);
if (infiniteScroll && host._moreItemsAvailable) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 426);
host.itssvinfinite.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 428);
paginatorScrollToIndexSave(totalCount-1);
                        }
                    }
                    else {
                        // no ModelsSelectable, no Pagination
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 433);
currentScroll = host.get(yAxis ? 'scrollY' : 'scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 434);
scrollToSave = Y.rbind(instance._saveScrollTo, instance);
                        _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 435);
if (itemLeft || itemUp || itemRight || itemDown || pageLeft || pageUp || pageRight || pageDown) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 436);
if (itemLeft || itemUp || itemRight || itemDown) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 437);
step = instance.get('step');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 440);
step = yAxis ? boundingBoxHeight : boundingBoxWidth;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 442);
down = (pageRight || pageDown || itemRight || itemDown);
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 443);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 444);
scrollToSave(null, currentScroll + (down ? step : -step));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 447);
scrollToSave(currentScroll + (down ? step : -step), null);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 449);
if (infiniteScroll && down) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 450);
infiniteScroll.checkExpansion();
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 453);
if (itemHome) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 454);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 455);
scrollTo(null, 0);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 458);
scrollTo(0, null);
                            }
                        }
                        else {_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 461);
if (itemEnd) {
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 462);
if (infiniteScroll) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 463);
infiniteScroll.loadAllItems();
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 465);
if (yAxis) {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 466);
scrollToSave(null, viewNode.get('offsetHeight'));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 469);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_paginatorScrollToIndex", 488);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 494);
var host = this.host,
                pagination = host && host.pages,
                itssvinfinite = host && host.itssvinfinite;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 498);
if (pagination) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 499);
if (itssvinfinite) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 505);
pagination.scrollToIndex(Math.min(index, host._getMaxPaginatorGotoIndex(0)));
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 508);
pagination.scrollToIndex(index);
                }
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_saveScrollTo", 523);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 524);
var host = this.host,
                boundingBox = host.get('boundingBox'),
                viewNode = host._viewNode || host.get('srcNode').one('ul'),
                max;
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 528);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 529);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 530);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 531);
x = Math.min(x, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 533);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 534);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 535);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 536);
y = Math.min(y, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 538);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHost", 549);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 550);
var instance = this,
                host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 553);
if (host && host.get('rendered')) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 554);
instance._focusHostSave();
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 557);
instance.afterHostEvent('render', instance._focusHostSave, instance);
            }
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_focusHostSave", 569);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 570);
var host = this.host;

            _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 572);
if (host && host.focus) {
                _yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 573);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "_clearEventhandlers", 587);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 588);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "(anonymous 4)", 590);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 591);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 613);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 614);
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
                    _yuitest_coverfunc("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", "validator", 630);
_yuitest_coverline("build/gallery-itsascrollviewkeynav/gallery-itsascrollviewkeynav.js", 631);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "pluginhost-base", "node", "dom-screen"]});
