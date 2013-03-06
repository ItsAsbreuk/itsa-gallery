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


var Lang = Y.Lang,
    YArray = Y.Array;

Y.namespace('Plugin').ITSAScrollViewKeyNav = Y.Base.create('itsscrollviewkeynav', Y.Plugin.Base, [], {

        _eventhandlers : [],

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this,
                host = instance.get('host');

            if (host instanceof Y.ScrollView) {
                Y.log('initializer', 'info', 'Itsa-ScrollViewKeyNav');
                instance._bindUI();
            }
            else {
                Y.log('initializer --> cannot continue ataching eventlisteners: Host is not a ScrollView-instance', 'warn', 'Itsa-ScrollViewKeyNav');
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            Y.log('destructor', 'info', 'Itsa-ScrollViewKeyNav');
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

            Y.log('_bindUI', 'info', 'Itsa-ScrollViewKeyNav');
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
            var host = this.get('host'),
                keyCode = e.keyCode,
                paginationActive, axis, xAxis, yAxis, itemLeft, itemRight, itemUp, itemDown, currentVisible, i, boundingBox, viewNode, inRegion,
                pageLeft, pageRight, pageUp, pageDown, selectKey, modelsSelectable, pagination, currentIndex, totalCount, modelNode, liElements,
                itemHome, itemEnd, lastItemInView, rightborder, bottomborder;

            // tells if node1 is in region of node2
            // for some reason Y.DOM.inRegion() did not work ???
            inRegion = function(node1, node2, shiftXnode2, shiftYnode2, shiftX2node2, shiftY2node2) {
                var node1XY = node1.getXY(),
                    node2XY = node2.getXY(),
                    left1 = node1XY[0],
                    top1 = node1XY[1],
                    right1 = left1 + node1.get('offsetWidth'),
                    bottom1 = top1 + node1.get('offsetHeight'),
                    left2 = node2XY[0] + (shiftXnode2 || 0),
                    top2 = node2XY[1] + (shiftYnode2 || 0),
                    right2 = node2XY[0] + (shiftX2node2 || 0) + node2.get('offsetWidth'),
                    bottom2 = node2XY[1] + (shiftY2node2 || 0) + node2.get('offsetHeight');
                var res = (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );

    Y.log('CHECK '+node1.getHTML()+' IN AREA: '+res+' left1: '+left1+' right1: '+right1+' top1: '+top1+' bottom1: '+bottom1+' left2: '+left2+' right2: '+right2+' top2: '+top2+' bottom2: '+bottom2, 'warn', 'Itsa-ScrollViewModelList');
                return (
                    left1   >= left2   &&
                    right1  <= right2  &&
                    top1    >= top2    &&
                    bottom1 <= bottom2
                );
            };
            if (host.get('focused')) {
                Y.log('_handleKeyDown keyCode: '+keyCode, 'info', 'Itsa-ScrollViewKeyNav');
                modelsSelectable = host.get('modelsSelectable');
                boundingBox = host.get('boundingBox');
                viewNode = host._viewNode;
                paginationActive = host.hasPlugin('pages');
                pagination = paginationActive && host.pages;
                axis = host.get('axis');
                xAxis = axis.x;
                yAxis = axis.y;
                itemHome = (keyCode===36);
                itemEnd = (keyCode===35);
                itemLeft = (keyCode===37) && xAxis;
                itemRight = (keyCode===39) && xAxis;
                itemUp = (keyCode===38) && yAxis;
                itemDown = (keyCode===40) && yAxis;
                pageLeft = (keyCode===33) && xAxis && !yAxis;
                pageRight = (keyCode===34) && xAxis && !yAxis;
                pageUp = (keyCode===33) && yAxis;
                pageDown = (keyCode===34) && yAxis;
                selectKey = ((keyCode===13) || (keyCode===32));
                if (itemLeft || itemRight || itemUp || itemDown || pageLeft || pageRight || pageUp || pageDown || itemHome || itemEnd) {
                    e.preventDefault();
                }
                // Movementbehavior is different in different cases
                if (modelsSelectable) {
                    // models are selectable --> no scrolling but shifting through items
                    // UNLESS the selected items come out of view --> in that case we need to scroll again to get it into position.
                    // We need the Paginator to make this happen
                }
                else {
                    // models are unselectable --> scroll the view
                    // How to scroll depends on whether Paginator is active. If active, than we can scroll a complete item at a time
                    // If not, then we scroll 1 pixel at a time
                    if (paginationActive) {
                        // we need the currentindex to calculate how many items to shift.
                        currentIndex = pagination.get('index');
                        totalCount = pagination.get('total');
                        liElements = viewNode.all('li');
                        rightborder = parseInt(boundingBox.getStyle('borderRightWidth'), 10);
                        bottomborder = parseInt(boundingBox.getStyle('borderBottomWidth'), 10);
                        lastItemInView = inRegion(liElements.item(liElements.size()-1), boundingBox, 0, 0, rightborder, bottomborder);
                        if (itemHome) {
                            pagination.scrollToIndex(0);
                        }
                        if (itemEnd && !lastItemInView) {
                            pagination.scrollToIndex(totalCount-1);
                        }
                        if (itemLeft || itemUp) {
                            pagination.prev();
                        }
                        if ((itemRight || itemDown) && !lastItemInView) {
                            pagination.next();
                        }
                        if ((pageDown || pageRight) && !lastItemInView) {
                            // now we need to find out what element is the last one that is not full-visible in the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            currentVisible = true;
                            for (i=currentIndex+1; currentVisible && (i<totalCount); i++) {
                                modelNode = liElements.item(i);
                                currentVisible = inRegion(modelNode, boundingBox); // needs dom-base
                            }
                            pagination.scrollToIndex(i-1);
                        }
                        if (pageUp && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            currentVisible = true;
                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                modelNode = liElements.item(i);
                                currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, 0, -boundingBox.get('offsetHeight'))); // needs dom-base
                            }
                            pagination.scrollToIndex(i+2);
                        }
                        if (pageLeft && (currentIndex>0)) {
                            // now we need to find out what element is the last one that is full-visible in the area ABOVE the viewport.
                            // because we always need to shift 1 item, we can set currentVisible = true
                            currentVisible = true;
                            for (i=currentIndex-1; currentVisible && (i>=0); i--) {
                                modelNode = liElements.item(i);
                                currentVisible = ((i===currentIndex-1) ||
                                                  inRegion(modelNode, boundingBox, -boundingBox.get('offsetWidth'), 0)); // needs dom-base
                            }
                            pagination.scrollToIndex(i+2);
                        }




                    }

                }

            }
            else {
                Y.log('_handleKeyDown wil not perform any action: the scrollviewinstance is not focused', 'info', 'Itsa-ScrollViewKeyNav');
            }
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
            var host = this.get('host');

            Y.log('_focusHost', 'info', 'Itsa-ScrollViewKeyNav');
            if (host && host.focus) {
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-ScrollViewKeyNav');
            YArray.each(
                this._eventhandlers,
                function(item){
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
                    return Lang.isBoolean(v);
                },
                setter: '_focusHost'
            }

        }
    }
);