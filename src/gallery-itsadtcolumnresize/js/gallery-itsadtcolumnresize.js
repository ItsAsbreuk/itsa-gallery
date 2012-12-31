'use strict';

/**
 * DataTable ColumnResize Plugin
 * 
 *
 * @module itsa-dtcolumnresize
 * @class Plugin.ITSADTColumnResize
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
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
 * plugin's host DataTable
 * @property datatable
 * @type Y.DataTable
 */

/**
 * Internal flag that tells whether the browsers does a bad colwidth calculation (Opera, IE6, IE7).<br>
 * Determined by featuretest.
 * @property _badColWidth
 * @type boolean
 * @private
 */

/**
 * Node-reference to datatable's <colgroup>
 * @property _dtColgroupNode
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-columns
 * @property _dtRealDataTableHeader
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's boundingbox
 * @property _dtBoundingBox
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's contentbox
 * @property _dtContentBox
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-x-scroller
 * @property _dtXScroller
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-y-scroller
 * @property _dtYScroller
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-y-scroller-container
 * @property _dtYScrollerContainer
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-scrollbar
 * @property _dtYScrollBar
 * @type Y.Node
 * @private
 */

/**
 * Node-reference to datatable's .yui3-datatable-scroll-columns
 * @property _dtScrollHeader
 * @type Y.Node
 * @private
 */

/**
 * Flag that tells whether DataTable is only x-scrollable
 * @property _dtScrollX
 * @type Boolean
 * @private
 */

/**
 * Flag that tells whether DataTable is only y-scrollable
 * @property _dtScrollY
 * @type Boolean
 * @private
 */

/**
 * Flag that tells whether DataTable is both x-scrollable and y-scrollable
 * @property _dtScrollXY
 * @type Boolean
 * @private
 */

/**
 * Flag that tells whether DataTable is both not x-scrollable and y-scrollable
 * @property _dtNoScroll
 * @type Boolean
 * @private
 */

/**
 * Flag that tells whether resize may start when the mouse gets pressed
 * @property _resizeApproved
 * @private
 * @type Boolean
 */

/**
 * Flag that tells whether resizing is going on
 * @property _busyResize
 * @private
 * @type Boolean
 */

/**
 * th-Node on the left side while resizing
 * @property _leftThNode
 * @private
 * @type Y.Node
 */

/**
 * screens x-pos of the left th-Node while resizing (Y.Node.getX())
 * @property _leftThX
 * @private
 * @type int
 */

/**
 * Mouse-offset compared to columnborder when starting to resize
 * @property _mouseOffset
 * @private
 * @type int
 */

/**
 * index of the left th-Node while resizing
 * @property _leftColIndex
 * @private
 * @type int
 */

/**
 * index of the most right th-Node
 * @property _lastColIndex
 * @private
 * @type int
 */

/**
 * backup of the th-width before resize starts. This value is passed as prevVal when the event 'colWidthChange' is fired
 * @property _initialColWidth
 * @private
 * @type int
 */

/**
 * Internal flag that tells whether expandingLastCell would posibly be called. In such situations, we don't need (and want) to call this._setVisibilityXScroller() because we could get into a loop 
 * @property _posibleExpandingLastCell
 * @private
 * @type boolean
 */

/**
 * horizontal offset of the y-scrollbar (in case of y-scrollable datatable)
 * @property _scrollbarOffset
 * @private
 * @type int
 */

/**
 * Internal backup of DataTable.get('width') --> used to apply a fix during resorting
 * @property _dtBkpWidth
 * @private
 * @type String
 */

/**
 * Internal flag that tells whether the DataTable has a width set in percentage
 * @property _dtWidthPercent
 * @private
 * @type boolean
 */

/**
 * Reference to Y.one('body')
 * @property _bodyNode
 * @private
 * @type Y.Node
 */

/**
 * internal flag that will prevent sorting columns while resizing
 * @property _comingFromResize
 * @private
 * @type boolean
 */

/**
 * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that the total tablewidth needed to increase by enlargin the last col.
 * @property _lastColExpanded
 * @private
 * @type int
 */

/**
 * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing
 * @property _unselectableBkpList
 * @private
 * @type Array
 */


var Lang = Y.Lang,
    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',
    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',
    DATATABLE_BORDERWIDTH = 2;

Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {

        _eventhandlers : [],
        datatable : null,
        _badColWidth : null,
        _dtColgroupNode : null,
        _dtBoundingBox : null,
        _dtContentBox : null,
        _dtXScroller : null,
        _dtYScroller : null,
        _dtYScrollerContainer : null,
        _dtYScrollBar : null,
        _dtRealDataTableHeader : null,
        _dtScrollHeader : null,
        _dtScrollX : null,
        _dtScrollY : null,
        _dtNoScroll : null,
        _dtScrollXY : null,
        _resizeApproved: false,
        _busyResize : false,
        _leftThNode : null,
        _leftThX : null,
        _mouseOffset : null,
        _leftColIndex : null,
        _lastColIndex : null,
        _initialColWidth : null,
        _posibleExpandingLastCell : null,
        _scrollbarOffset : 0,
        _dtBkpWidth : null,
        _dtWidthPercent: null,
        _bodyNode : null,
        _comingFromResize : null,
        _unselectableBkpList : [],
        _lastColExpanded : 0,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @param {Object} config The config-object.
         * @protected
		 * @since 0.1
         */
        initializer : function(config) {
            Y.log('initializer', 'info', 'DTColumnResize');
            var instance = this;
            instance.datatable = instance.get('host');
            instance._badColWidth = Y.Features.test('table', 'badColWidth');
            if (instance.datatable.get('rendered')) {
                instance._render();
            }
            else {
                instance.afterHostEvent('render', instance._render, instance);
            }
        },

        /**
         * Calls _bindUI but only after checking -and modifying- the x-scroller.
         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.
         *
         * @method _render
         * @private
		 * @since 0.1
         *
        */
        _render: function() {
            Y.log('_render', 'info', 'DTColumnResize');
            var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                xScrollableTable = (scrollAttrs==='x') || (scrollAttrs==='xy') || (scrollAttrs===true);
            instance._dtBkpWidth = dt.get('width');
            if ((typeof instance._dtBkpWidth === 'string') && (instance._dtBkpWidth.length>0) && !xScrollableTable) {
                // always activate the xScroller when it isn't there while DataTable has a defined width
                Y.use(
                    'datatable-scroll', 
                    Y.bind(
                        function(Y) {
                            Y.log('Adding a x-scroller', 'info', 'DTColumnResize');
                            dt.set('scrollable', (dt.get('scrollable')==='y') ? 'xy' : 'x');    
                            this._bindUI();
                        }, 
                        instance
                    )
                );
            }
            else {
                instance._bindUI();
            }
        },

        /**
         * Binds events which make resizing of the columns posible
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            Y.log('_bindUI', 'info', 'DTColumnResize');
            var instance = this,
                dt = instance.datatable,
                eventhandlers = instance._eventhandlers,
                sortable = dt.get('sortable'),
                currentSortEventHandler,
                workingHeader;
            // First justify the table with and set all hidden references
            instance._justifyTableWidth();
            workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start    
            eventhandlers.push(
                workingHeader.delegate(
                    'mousemove',
                    instance._checkResizeAprovement,
                    'th',
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize. In those cases this._resizeApproved needs to be set false
            eventhandlers.push(
                workingHeader.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            eventhandlers.push(
                workingHeader.delegate(
                    'mousedown',
                    instance._startResize,
                    'th',
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave'],
                    instance._stopResize,
                    instance
                )
            );

            // Justify the tablewidth agian after render view or when there is a columnChange
            eventhandlers.push(
                dt.after(
                    ['renderView', 'columnsChange', 'scrollableChange', 'widthChange'],
                    instance._justifyTableWidth,
                    instance
                )
            );

            if (Lang.isBoolean(sortable) && sortable) {
                // first detach current handler
                currentSortEventHandler = dt._eventHandles.sortUITrigger;
                if (currentSortEventHandler) {
                    currentSortEventHandler.detach();
                    currentSortEventHandler = null;
                }
                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area
                if (dt._theadNode) {
                    eventhandlers.push(
                        dt.delegate(
                            'keydown',
                            Y.rbind(instance._triggerSort, instance),
                            '.' + dt.getClassName('sortable', 'column')
                        )
                    );
                    eventhandlers.push(
                        dt.delegate(
                            'click',
                            Y.rbind(instance._triggerSort, instance),
                            function() {
                                return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));
                            }
                        )
                    );
                }
            }

        },

        /**
         * Does the actual sort of columns - if sortable<br>
         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values. In order to prevent resetting the width of the table during sorting
         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value). We don't want to keep that large width, because that would
         * lead to a screen x-sroller on the page.
         *
         * @method _triggerSort
         * @private
         * @protected
         * @param {e} eventFacade
         *
        */
        _triggerSort: function(e) {
            var instance = this,
                dt = instance.datatable,
                container,
                contentBox = instance._dtContentBox;
            Y.log('_triggerSort', 'info', 'DTColumnResize');

            if (instance._dtScrollX) {
                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area
                contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');
                Y.bind('_onUITriggerSort', dt, e)();
                // clear width contentbox to prevent big page x-scroller
                contentBox.setStyle('width', '');
            }
            else if (instance._dtScrollY || instance._dtNoScroll) {
                // we NEED to set dt.width because sortable tables will reset the with while sorting. In these cases the width will be read from this value
                // restore the value, because sizes on the boundingbox might be in % and still need to work afterwards
                container = instance._dtScrollY ? instance._dtYScrollerContainer : instance._dtRealDataTable;
                dt.set('width', (parseInt(container.getStyle('width'), 10)+DATATABLE_BORDERWIDTH)+'px');
                Y.bind('_onUITriggerSort', dt, e)();
                dt.set('width', instance._dtBkpWidth);
            }
            else  {
                // instance._dtScrollXY
                Y.bind('_onUITriggerSort', dt, e)();
            }
        },

        /**
         * Will be executed at the start of a resizeaction<br>
         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.
         *
         * @method _startResize
         * @private
         * @param {e} eventFacade
         *
        */
        _startResize: function(e) {
            Y.log('_startResize', 'info', 'DTColumnResize');
            var instance = this,
                dt,
                boundingBox = instance._dtBoundingBox,
                yScrollerContainer = instance._dtYScrollerContainer,
                resizeMargin,
                resizeMarginHalf,
                th,
                lastTh,
                allTh,
                mouseX,
                thWidth,
                thX,
                mouseInLeftNode;
            if (instance._resizeApproved) {
                instance._busyResize = true;
                instance._comingFromResize = true;
                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)
                instance._resizeEvent = instance._bodyNode.on(
                    'mousemove',
                    instance._resizeColumn,
                    instance
                );
                Y.log('_startResize datatable column-resize will be started', 'info', 'DTColumnResize');
                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.
                // we need to know this, because the column-resize handlers overlap 2 th-nodes.
                dt = instance.datatable;
                resizeMargin = instance.get('resizeMargin');
                resizeMarginHalf = Math.round(resizeMargin/2);
                th = e.currentTarget;
                lastTh = (th.next('th')===null);
                mouseX = e.pageX;
                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);
                thX = th.getX();
                mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));
                if (mouseInLeftNode) {
                    instance._leftThNode = th;
                    instance._leftThX = thX;
                    instance._mouseOffset = thX+thWidth-mouseX;
                }
                else {
                    instance._leftThNode = th.previous('th');
                    instance._leftThX = instance._leftThNode.getX();
                    instance._mouseOffset = thX-mouseX;
                }
                allTh = th.get('parentNode').all('th');
                instance._leftColIndex = allTh.indexOf(instance._leftThNode);
                instance._initialColWidth = instance.getColumnWidth(instance._leftColIndex);
                instance._changeUnselectableIE(true);
            }
        },

        /**
         * Will be executed at the end of a resizeaction<br>
         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.
         *
         * @method _startResize
         * @private
         * @param {e} eventFacade
         * @param {Array} e.prevVal<br>
         * contains objects with fields: colindex and width
         * @param {Array} e.newVal<br>
         * contains objects with fields: colindex, width and changed
         *
        */
        _stopResize: function(e) {
            Y.log('_stopResize', 'info', 'DTColumnResize');
            var instance = this,
                dt = instance.datatable,
                finalColWidth;
            if (instance._busyResize) {
                Y.log('_stopResize datatable column-resize is ended', 'info', 'DTColumnResize');
                // resizing will be ending. Fire event.
                if (instance._resizeEvent) {
                    instance._resizeEvent.detach();
                }
                finalColWidth = instance.getColumnWidth(instance._leftColIndex);

                instance._busyResize = false;
                instance._changeUnselectableIE(false);
                instance._checkResizeAprovement(e);

                // Don't know why, but we need to e.halt in order to fire a new event.
                e.halt();
                if (instance._initialColWidth !== finalColWidth) {
                    /**
                     * In case of a resized column, colWidthChange will be fired by the host-datatable. 
                     * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()
                     * @event colWidthChange
                     * @param {EventFacade} e Event object
                     * @param {Int} e.colIndex
                     * @param {Int} e.prevVal
                     * @param {Int} e.newVal
                    */                
                    dt.fire('colWidthChange', {colIndex: instance._leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                }
                
                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value
                Y.later(
                    200, 
                    instance, 
                    function() {
                        instance._comingFromResize = false;
                    }
                );

            }
        },

        /**
         * Checks whether the nouse is in a position that start-resizing is possible. If so, then the cursor will change to col-resize<br>
         *
         * @method _checkResizeAprovement
         * @private
         * @param {e} eventFacade
         *
        */
        _checkResizeAprovement: function(e) {
            Y.log('_checkResizeAprovement', 'info', 'DTColumnResize');
            var instance = this;
            if (instance.get('active') && !instance._busyResize) {
                var dt = instance.datatable,
                    boundingBox = dt.get('boundingBox'),
                    th = e.currentTarget,
                    lastTh = (th.next('th')===null),
                    thX = th.getX(),
                    mouseX = e.pageX,
                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),
                    fromLeft,
                    fromRight,
                    insideLeftArea,
                    insideRightArea,
                    resizeMargin = instance.get('resizeMargin'),
                    resizeMarginHalf = Math.round(resizeMargin/2),
                    leftSideFirstTh;
                fromLeft = mouseX-thX;
                fromRight = thX+thWidth-mouseX;
                insideLeftArea = (fromLeft<resizeMarginHalf);
                insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));
                leftSideFirstTh = insideLeftArea && (th.previous('th')===null);
                instance._resizeApproved = ((insideLeftArea || insideRightArea) && !leftSideFirstTh && (instance.get('allColsSortable') || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS)));
                boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);
                Y.log('_checkResizeAprovement toggleClass '+DATATABLE_BUSY_RESIZING_CLASS+' '+instance._resizeApproved, 'info', 'DTColumnResize');
            }
        },

        /**
         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>
         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.
         *
         * @method _resizeColumn
         * @private
         * @param {e} eventFacade
         *
        */
        _resizeColumn: function(e) {
            if (this._busyResize) {
                var instance = this,
                    noaction,
                    xScroller = instance._dtXScroller,
                    leftColIndex = instance._leftColIndex,
                    lastColIndex = instance._lastColIndex,
                    prevWidth = instance.getColumnWidth(leftColIndex),
                    lastColExpanded = instance._lastColExpanded,
                    newWidth,
                    decreaseLastCol,
                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset);
                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:                    
                noaction = ((leftColIndex===lastColIndex) && xScroller && (xScroller.getStyle('overflowX')==='hidden') && (setNewLeftWidth<prevWidth));
                if (!noaction) {
                    Y.log('_resizeColumn, leftcol-id:'+leftColIndex+' try set to '+setNewLeftWidth+'px', 'info', 'DTColumnResize');
                    newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);
                    if (leftColIndex!==lastColIndex) {
                        if ((lastColExpanded>0) && (newWidth>prevWidth)) {
                            // we must decrease the width of the last col
                            decreaseLastCol = Math.min(lastColExpanded, (newWidth-prevWidth));
                            instance.setColumnWidth(lastColIndex, instance.getColumnWidth(lastColIndex)-decreaseLastCol);
                            instance._lastColExpanded -= decreaseLastCol;
                        }
                    }
                    else {
                        // reset
                        instance._lastColExpanded = 0;
                    }
                }
                else {
                    Y.log('_resizeColumn, no action is taken: last col cannot become smaller', 'info', 'DTColumnResize');
                }
            }
        },

        /**
         * Determines whether a resize-state should be ended. This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead
         *
         * @method _checkEndResizeApprovement
         * @private
         * @param {e} eventFacade
         *
        */
        _checkEndResizeApprovement: function(e) {
            Y.log('_checkEndResizeApprovement', 'info', 'DTColumnResize');
            var instance = this;
            if (instance._resizeApproved && !instance._busyResize) {
                instance._endResizeApprovement();
            }
        },

        /**
         * Will toglle-off the cursor col-resize
         *
         * @method _endResizeApprovement
         * @private
         * @param {e} eventFacade
         *
        */
        _endResizeApprovement: function() {
            Y.log('_endResizeApprovement', 'info', 'DTColumnResize');
            var instance = this;
            instance._resizeApproved = false;
            instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);
        },

        /**
         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.
         * Use the method to prevent this from happening
         *
         * @method _justifyTableWidth
         * @private
         *
        */
        _justifyTableWidth: function() {
            var instance = this,
                dt = instance.datatable,
                boundingBox,
                contentBox,
                realDataTable,
                realDataTableHeader,
                yScrollerContainer,
                yScrollBar,
                xScroller,
                yScroller,
                scrollX,
                scrollY,
                noScroll,
                scrollXY,
                resetContainer,
                dtScrollHeader,
                allThRealHeader,
                scrollContainer,
                scrollTheaders,
                colObject,
                scrollAttrs,
                yScrollableTable,
                bkpWidth = instance._dtBkpWidth,
                scrollbarOffset = 0,
                totalWidth = 0;

            instance._bodyNode = Y.one('body');
            instance._dtBoundingBox = boundingBox = dt.get('boundingBox');
            instance._dtWidthPercent = (bkpWidth.substr(bkpWidth.length-1)==='%');

            scrollAttrs = dt.get('scrollable');
            yScrollableTable = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);
            // In case yScrollable: always take a fixed width. This we MUST do, because of a bug that doesn't replace the y-scroller on a window-resize.
            // That impacts DataTables width percent widths. I gave up a bugfix for this, for I couldn't rewrite dt._bindScrollResize: for some reason the 'resize'-listener didn't work
            if (yScrollableTable && instance._dtWidthPercent) {
                instance._dtBkpWidth = bkpWidth = boundingBox.get('offsetWidth')+'px';
                dt.set('width', bkpWidth);
                instance._dtWidthPercent = false;
            }

            instance._dtContentBox = contentBox = dt.get('contentBox');
            instance._dtColgroupNode = contentBox.one('colgroup');
            instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));
            instance._dtXScroller = xScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));
            instance._dtYScroller = yScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));
            instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));
            instance._dtYScrollBar = yScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));
            instance._dtRealDataTableHeader = realDataTableHeader = realDataTable.one('.'+dt.getClassName('columns'));
            instance._dtScrollHeader = dtScrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));
            instance._dtScrollX = scrollX = (xScroller!==null) && !yScrollerContainer;
            instance._dtScrollY = scrollY = !xScroller && (yScrollerContainer!==null);
            instance._dtNoScroll = noScroll = !xScroller && !yScrollerContainer;
            instance._dtScrollXY = scrollXY = (xScroller!==null) && (yScrollerContainer!==null);
            resetContainer = yScrollerContainer || realDataTable;
            allThRealHeader = realDataTableHeader.all('th');
            instance._lastColIndex = allThRealHeader.size()-1;

            // We MUST set the tablesize to 1px, otherwise Safari and Chrome will stretch it and return a false value of the columnwidths
            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)
            resetContainer.setStyle('width', '1px');

            if (!noScroll) {
                instance._justifySortableColumns();
            }

            // Next: calculate the sum of all columnwidths                
            allThRealHeader.each(
                function(th, index, nodelist) {
                    totalWidth += instance.getColumnWidth(index);
                    if (!scrollY && !scrollXY) {
                        // add the resizeclass to the th-elements of the real datatable
                        colObject = dt.getColumn(index);
                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                }
            );
            
            if (scrollY || scrollXY) {
                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.
                // We need to capture this behaviour when we want to repositions the y-scrollbar
                scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');
                instance._scrollbarOffset = scrollbarOffset = (scrollTheaders && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)) || 0;
                totalWidth += scrollbarOffset;
                dtScrollHeader.all('th').each(
                    function(th, index, nodelist) {
                        // add the resizeclass to the th-elements of the scrollable header
                        colObject = dt.getColumn(index);
                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
            }

            if (scrollX) {
                realDataTable.setStyle('width', totalWidth+'px');
                instance._setVisibilityXScroller();
            }

            if (scrollXY) {
                yScrollerContainer.setStyle('width', totalWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                yScroller.setStyle('width', totalWidth+'px');
                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)
                yScrollBar.setStyle('width', '16px');
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                realDataTable.setStyle('width', '');
                instance._setVisibilityXScroller();
                // The scrollbar NEEDS to be set AFTER _setVisibilityXScroller, because this method can cause yScrollerContainer to expand
                yScrollBar.setStyle('left', (parseInt(xScroller.getStyle('width'),10)-15)+'px');
            }

            if (scrollY) {
                // only AFTER that, we add our own settings:
                yScrollerContainer.setStyle('width', totalWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                yScroller.setStyle('width', totalWidth+'px');
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                realDataTable.setStyle('width', '');
            }

            if (noScroll) {
                realDataTable.setStyle('width', totalWidth+'px');
            }

            Y.log('_justifyTableWidth --> setting container to '+totalWidth+'px', 'info', 'DTColumnResize');
        },

        _changeUnselectableIE : function(noSelect) {
            var instance = this,
                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,
                headerList = headers && headers.all('th'),
                unselectableBkpList = instance._unselectableBkpList,
                bkpMade;
            if (Y.UA.ie>0) {
                Y.log('_changeUnselectableIE make unselectable: '+noSelect, 'info', 'DTColumnResize');
                bkpMade = (unselectableBkpList.length>0);
                headerList.each(
                    function(th, index, nodelist) {
                        if (noSelect && !bkpMade) {
                            instance._unselectableBkpList.push(th.get('unselectable'));
                        }
                        th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));
                    },
                    instance
                );
            }
        },

        /**
         * Because we cannot use unpredictable columnwidth, all columns must have a defined width. Second: when col.width is smaller than realized width, we need the actual width
         *
         * @method _justifySortableColumns
         * @private
         *
        */
        _justifySortableColumns: function() {
            var instance = this,
                allThRealHeader;
            Y.log('_justifySortableColumns', 'info', 'DTColumnResize');
            
            // prevent expanding last cell at this stage:
            instance._posibleExpandingLastCell = true;

            allThRealHeader = instance._dtRealDataTableHeader.all('th');
            allThRealHeader.each(
                function(th, index, nodelist) {
                    instance.setColumnWidth(index, instance.getColumnWidth(index));
                }
            );
            instance._posibleExpandingLastCell = false;
        },

        /**
         * Make things prettier by hiding the x-scrollbar when not needed
         *
         * @method _setVisibilityXScroller
         * @private
         *
        */
        _setVisibilityXScroller: function() {
            var instance = this,
                offset,
                compairContainer,
                xScroller = instance._dtXScroller;
            if (xScroller) {
                compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                offset = parseInt(xScroller.getStyle('width'),10) - parseInt(compairContainer.getStyle('width'),10);
                Y.log('_setVisibilityXScroller --> set visibility to: '+((offset<0) ? 'scroll' : 'hidden'), 'info', 'DTColumnResize');
                xScroller.setStyle('overflowX', (offset<0) ? 'scroll' : 'hidden');
                if ((offset>=0) && (instance._leftColIndex!==instance._lastColIndex)) {
                    instance._expandLastCell(offset);
                }
            }
        },

        /**
         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area: the last cell will be expanded so that the complete datatable fits within teh scrollable area
         *
         * @method _expandLastCell
         * @private
         *
        */
        _expandLastCell: function(expand) {
            var instance = this,
                lastColIndex = instance._lastColIndex,
                widthLastCol = instance.getColumnWidth(lastColIndex),
                newWidth = instance.setColumnWidth(lastColIndex, widthLastCol+expand);
            instance._lastColExpanded += (newWidth-widthLastCol);
            Y.log('_expandLastCell expanding last cell with '+expand+' extra pixels. New expanded value='+instance._lastColExpanded, 'info', 'DTColumnResize');
        },

        /**
         *  @method setColumnWidth
         *  @param {Int} colIndex index of the column
         *  @param {Int} width new width in pixels
         *  @return {int} final reached columnwidth in pixels, which might differ from the pixels trying to set
        */
        setColumnWidth: function (colIndex, width) {
            Y.log('setColumnWidth colindex: '+colIndex+' --> width: '+width, 'info', 'DTColumnResize');
            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the
            // width style to the cells directly, allowing padding and borders to
            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all
            // make the rendered width equal the col's style width, reducing the
            // cells' calculated width.
            var instance = this,
                dt = instance.datatable,
                dtContentBox = instance._dtContentBox,
                colgroup  = instance._dtColgroupNode,
                allColl = colgroup && colgroup.all('col'),
                col       = allColl && allColl.item(colIndex),
                realDataTable = instance._dtRealDataTable,
                xScroller = instance._dtXScroller,
                yScroller = instance._dtYScroller,
                yScrollerContainer = instance._dtYScrollerContainer,
                yScrollBar = instance._dtYScrollBar,
                scrollX = instance._dtScrollX,
                scrollY = instance._dtScrollY,
                noScroll = instance._dtNoScroll,
                scrollXY = instance._dtScrollXY,
                resetContainer,
                tableToBackup,
                noWidthCol,
                bkpColWidth,
                lastIndex,
                bkpDatatableWidth,
                scrollBar,
                badColWidth,
                newWidth,
                getCStyle,
                setCWidth,
                getCellWidthFirstRow,
                corrected,
                scrollHeader = instance._dtScrollHeader,
                scrollThDiv,
                scrollTh;
     
            if (col && width && Y.Lang.isNumber(width) && (width>=instance.get('minColWidth'))) {
                badColWidth = instance._badColWidth;
                getCStyle = function (element, prop, nonComputed) {
                    return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) | 0);
                };
                getCellWidthFirstRow = function() {
                    var cell = dt.getCell([0, colIndex]) || col,
                        corrected = 0;
                    if (badColWidth) {
                        corrected =  getCStyle(cell, 'paddingLeft') +
                                     getCStyle(cell, 'paddingRight') +
                                     getCStyle(cell, 'borderLeftWidth') +
                                     getCStyle(cell, 'borderRightWidth');
                    }
                    return Math.max(getCStyle(cell, 'width', true), cell.get('offsetWidth'), getCStyle(col, 'width', true)+corrected);
                };
                setCWidth = function (element, newColWidth) {
                    var corrected = 0,
                        cell;
                    if (badColWidth) {
                        cell = dt.getCell([0, colIndex]);
                        if (cell) {
                            corrected =  getCStyle(cell, 'paddingLeft') +
                                         getCStyle(cell, 'paddingRight') +
                                         getCStyle(cell, 'borderLeftWidth') +
                                         getCStyle(cell, 'borderRightWidth');
                        }
                    }
                    newColWidth -= corrected;
                    element.setStyle('width', newColWidth + 'px');
                };

                // now, also for scrollheaders - if they are available
                newWidth = -getCellWidthFirstRow();

                if (scrollX) {
                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width, the realDataTable-width will change to 100% when a user is resorting.
                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.
                    tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;
                }
                else if (scrollY || scrollXY) {
                    tableToBackup = yScrollerContainer;
                }
                else {
                    tableToBackup = realDataTable;
                }
                bkpDatatableWidth = getCStyle(tableToBackup, 'width', true);


                lastIndex = allColl ? (allColl.size()-1) : 0;
                if (lastIndex>0) {
                    // do not perform this workarround when you have only 1 column
                    noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);
                    bkpColWidth = getCStyle(noWidthCol, 'width', true);
                    noWidthCol.setStyle('width', '');
                }
                else {
                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px, but to 1px (safari ans chrome would otherwise fail)
                    resetContainer = yScrollerContainer || realDataTable;
                    resetContainer.setStyle('width', '1px');
                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation if realDataTable has a width other than 1px
                    if (scrollY) {
                        realDataTable.setStyle('width', '1px');
                    }
                }
                setCWidth(col, width);
                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.
                width = getCellWidthFirstRow();
                dt.getColumn(colIndex).width = width+'px';

                if (lastIndex>0) {
                    if (bkpColWidth>0) {
                        noWidthCol.setStyle('width', bkpColWidth+'px');
                    }
                }
                Y.log('setColumnWidth: colwidth changed from '+(-1*newWidth)+'px --> '+width+'px | setting tablewidth from '+bkpDatatableWidth+'px --> '+(newWidth + bkpDatatableWidth + width)+'px', 'info', 'DTColumnResize');
                newWidth += bkpDatatableWidth + width;

                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable

                if (scrollXY) {
                    Y.log('setColumnWidth setting tablewidth to '+newWidth+'px using scrollXY', 'info', 'DTColumnResize');
                    yScrollerContainer.setStyle('width', newWidth+'px');
                    // now reset the datatable-width
                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')
                    corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth + instance._scrollbarOffset;
                    yScroller.setStyle('width', corrected+'px');
                    // now set the innerwidth of the div inside scrollable TH
                    scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);
                    scrollTh = scrollThDiv.get('parentNode');
                    corrected =  badColWidth ? width : (width -
                                                        getCStyle(scrollThDiv, 'paddingLeft') -
                                                        getCStyle(scrollThDiv, 'paddingRight') - 
                                                        getCStyle(scrollTh, 'borderLeftWidth') -
                                                        getCStyle(scrollTh, 'borderRightWidth'));
                    setCWidth(scrollThDiv, corrected);
                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                    realDataTable.setStyle('width', '');
                }
                if (scrollY) {
                    Y.log('setColumnWidth setting tablewidth to '+newWidth+'px using scrollY', 'info', 'DTColumnResize');
                    yScrollerContainer.setStyle('width', newWidth+'px');
                    // now reset the scrollbar-position
                    yScrollBar.setStyle('left', (newWidth-15)+'px');
                    // now reset the datatable-width
                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')
                    corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth;
                    yScroller.setStyle('width', corrected+'px');
                    // now set the innerwidth of the div inside scrollable TH
                    scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);
                    scrollTh = scrollThDiv.get('parentNode');
                    corrected =  badColWidth ? width : (width -
                                                        getCStyle(scrollThDiv, 'paddingLeft') -
                                                        getCStyle(scrollThDiv, 'paddingRight') - 
                                                        getCStyle(scrollTh, 'borderLeftWidth') -
                                                        getCStyle(scrollTh, 'borderRightWidth'));
                    setCWidth(scrollThDiv, corrected);
                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                    realDataTable.setStyle('width', '');
                }

                if (scrollX) {
                    Y.log('setColumnWidth setting tablewidth to '+newWidth+'px using scrollX', 'info', 'DTColumnResize');
                    realDataTable.setStyle('width', newWidth+'px');
                }

                if (noScroll) {
                    Y.log('setColumnWidth setting tablewidth to '+newWidth+'px using noScroll', 'info', 'DTColumnResize');
                    realDataTable.setStyle('width', newWidth+'px');
                }

                if (scrollX || scrollXY) {
                   if (!instance._posibleExpandingLastCell) { // prevent being looped
                       instance._posibleExpandingLastCell = true;
                       instance._setVisibilityXScroller();
                       // reset instance._posibleExpandingLastCell
                       instance._posibleExpandingLastCell = false;
                   }
                }
                else {
                    dt.get('boundingBox').setStyle('width', '');
                }
            }
            else {
                width = -1;
                // actually need to return an error
            }
            return width;
        },

        /**
         *  @method getColumnWidth
         *  @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         *  @return {int} columnwidth in pixels
        */
        getColumnWidth: function(name) {
            var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                cell,
                headergroup,
                colwidth  = 0,
                width;
            if (colConfigObject && colConfigObject.width) {
                colwidth = parseInt(colConfigObject.width, 10) || 0;
            }
            if (typeof name === 'string') {
                cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);
            }
            else if (Lang.isNumber(name)) {
                headergroup  = instance._dtRealDataTableHeader;
                cell = headergroup && headergroup.all('th').item(name);
            }
            width = Math.max(colwidth, cell && (cell.get('offsetWidth') + (instance._dtYScrollerContainer ? (-parseInt(cell.getStyle('paddingLeft'), 10)-parseInt(cell.getStyle('paddingRight'), 10)) : 0)));
            Y.log('getColumnWidth '+name+' --> '+width, 'info', 'DTColumnResize');
            return Math.max(colwidth, width);
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         *
        */
        _clearEventhandlers : function() {
            Y.log('_clearEventhandlers', 'info', 'DTColumnResize');
            var instance = this;
            Y.Array.each(
                instance._eventhandlers,
                function(item, index, array){
                    item.detach();
                }    
            );
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'info', 'DTColumnResize');
            var instance = this,
                dt = instance.datatable,
                dtHandles = dt._eventHandles,
                sortable = dt.get('sortable');
            if (instance._resizeEvent) {
                instance._resizeEvent.detach();
            }
            instance._clearEventhandlers();
            instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);
            // now: in case of sortable datatable: we need to attach the original event again.
            if (Lang.isBoolean(sortable) && sortable) {
                dtHandles.sortUITrigger = dt.delegate(['click','keydown'],
                    Y.rbind('_onUITriggerSort', dt),
                    '.' + dt.getClassName('sortable', 'column'));
            }
        }

    }, {
        NS : 'itsadtcr',
        ATTRS : {

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value correspons with an area that overlaps 2 columns (50% each)<br>
             * @default 10
             * @minimum 2
             * @maximum 60
             * Default=10, Min=2, Max=60
             * @attribute resizeMargin
             * @type int
            */
            resizeMargin: {
                value: 10,
                validator: function(val) {
                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            /**
             * @description Minamal colwidth that a column can reach by resizing<br>
             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>
             * @default 0
             * @minimum 0
             * @attribute minColWidth
             * @type int
            */
            minColWidth: {
                value: 0,
                validator: function(val) {
                    return (Y.Lang.isNumber(val) && (val>=0));
                }
            },

            /**
             * @description Whether resizing is active or not<br>
             * You might us this to temporarely disable resizing, or if you want to have the DataTable fixes for large tables and setWidth but don't need the resize utility.<br>
             * Default = true
             * @attribute active
             * @default true
             * @type Boolean
            */
            active: {
                value: true,
                validator: function(val) {
                    return Y.Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the resizehandlers will show up for all columns. If set to false, you have to specify in the columnobject for each column whether the column is resizable.<br>
             * This can be done by setting the resizable field to true. Example: columns = [{label: 'firstname'}, {label: 'lastname', resizable: true}];<br>
             * Default = true
             * @attribute allColsSortable
             * @default true
             * @type Boolean
            */
            allColsSortable: {
                value: true,
                validator: function(val) {
                    return Y.Lang.isBoolean(val);
                }
            }

        }
    }
);