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
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].code=["YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {","","'use strict';","","/**"," * DataTable ColumnResize Plugin"," * "," *"," * @module itsa-dtcolumnresize"," * @class Plugin.ITSADTColumnResize"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * plugin's host DataTable"," * @property datatable"," * @type Y.DataTable"," */","","/**"," * Internal flag that tells whether the browsers does a bad colwidth calculation (Opera, IE6, IE7).<br>"," * Determined by featuretest."," * @property _badColWidth"," * @type boolean"," * @private"," */","","/**"," * Node-reference to datatable's <colgroup>"," * @property _dtColgroupNode"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-columns"," * @property _dtRealDataTableHeader"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's boundingbox"," * @property _dtBoundingBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's contentbox"," * @property _dtContentBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-x-scroller"," * @property _dtXScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller"," * @property _dtYScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller-container"," * @property _dtYScrollerContainer"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scrollbar"," * @property _dtYScrollBar"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scroll-columns"," * @property _dtScrollHeader"," * @type Y.Node"," * @private"," */","","/**"," * Flag that tells whether DataTable is only x-scrollable"," * @property _dtScrollX"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether DataTable is only y-scrollable"," * @property _dtScrollY"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether DataTable is both x-scrollable and y-scrollable"," * @property _dtScrollXY"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether DataTable is both not x-scrollable and y-scrollable"," * @property _dtNoScroll"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether resize may start when the mouse gets pressed"," * @property _resizeApproved"," * @private"," * @type Boolean"," */","","/**"," * Flag that tells whether resizing is going on"," * @property _busyResize"," * @private"," * @type Boolean"," */","","/**"," * th-Node on the left side while resizing"," * @property _leftThNode"," * @private"," * @type Y.Node"," */","","/**"," * screens x-pos of the left th-Node while resizing (Y.Node.getX())"," * @property _leftThX"," * @private"," * @type int"," */","","/**"," * Mouse-offset compared to columnborder when starting to resize"," * @property _mouseOffset"," * @private"," * @type int"," */","","/**"," * index of the left th-Node while resizing"," * @property _leftColIndex"," * @private"," * @type int"," */","","/**"," * index of the most right th-Node"," * @property _lastColIndex"," * @private"," * @type int"," */","","/**"," * backup of the th-width before resize starts. This value is passed as prevVal when the event 'colWidthChange' is fired"," * @property _initialColWidth"," * @private"," * @type int"," */","","/**"," * Internal flag that tells whether expandingLastCell would posibly be called. In such situations, we don't need (and want) to call this._setVisibilityXScroller() because we could get into a loop "," * @property _posibleExpandingLastCell"," * @private"," * @type boolean"," */","","/**"," * horizontal offset of the y-scrollbar (in case of y-scrollable datatable)"," * @property _scrollbarOffset"," * @private"," * @type int"," */","","/**"," * Internal backup of DataTable.get('width') --> used to apply a fix during resorting"," * @property _dtBkpWidth"," * @private"," * @type String"," */","","/**"," * Internal flag that tells whether the DataTable has a width set in percentage"," * @property _dtWidthPercent"," * @private"," * @type boolean"," */","","/**"," * Reference to Y.one('body')"," * @property _bodyNode"," * @private"," * @type Y.Node"," */","","/**"," * internal flag that will prevent sorting columns while resizing"," * @property _comingFromResize"," * @private"," * @type boolean"," */","","/**"," * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that the total tablewidth needed to increase by enlargin the last col."," * @property _lastColExpanded"," * @private"," * @type int"," */","","/**"," * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing"," * @property _unselectableBkpList"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',","    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',","    DATATABLE_BORDERWIDTH = 2;","","Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        datatable : null,","        _badColWidth : null,","        _dtColgroupNode : null,","        _dtBoundingBox : null,","        _dtContentBox : null,","        _dtXScroller : null,","        _dtYScroller : null,","        _dtYScrollerContainer : null,","        _dtYScrollBar : null,","        _dtRealDataTableHeader : null,","        _dtScrollHeader : null,","        _dtScrollX : null,","        _dtScrollY : null,","        _dtNoScroll : null,","        _dtScrollXY : null,","        _resizeApproved: false,","        _busyResize : false,","        _leftThNode : null,","        _leftThX : null,","        _mouseOffset : null,","        _leftColIndex : null,","        _lastColIndex : null,","        _initialColWidth : null,","        _posibleExpandingLastCell : null,","        _scrollbarOffset : 0,","        _dtBkpWidth : null,","        _dtWidthPercent: null,","        _bodyNode : null,","        _comingFromResize : null,","        _unselectableBkpList : [],","        _lastColExpanded : 0,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","		 * @since 0.1","         */","        initializer : function(config) {","            var instance = this;","            instance.datatable = instance.get('host');","            instance._badColWidth = Y.Features.test('table', 'badColWidth');","            if (instance.datatable.get('rendered')) {","                instance._render();","            }","            else {","                instance.afterHostEvent('render', instance._render, instance);","            }","        },","","        /**","         * Calls _bindUI but only after checking -and modifying- the x-scroller.","         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.","         *","         * @method _render","         * @private","		 * @since 0.1","         *","        */","        _render: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                xScrollableTable = (scrollAttrs==='x') || (scrollAttrs==='xy') || (scrollAttrs===true);","            instance._dtBkpWidth = dt.get('width');","            if ((typeof instance._dtBkpWidth === 'string') && (instance._dtBkpWidth.length>0) && !xScrollableTable) {","                // always activate the xScroller when it isn't there while DataTable has a defined width","                Y.use(","                    'datatable-scroll', ","                    Y.bind(","                        function(Y) {","                            dt.set('scrollable', (dt.get('scrollable')==='y') ? 'xy' : 'x');    ","                            this._bindUI();","                        }, ","                        instance","                    )","                );","            }","            else {","                instance._bindUI();","            }","        },","","        /**","         * Binds events which make resizing of the columns posible","         *","         * @method _bindUI","         * @private","        */","        _bindUI : function() {","            var instance = this,","                dt = instance.datatable,","                eventhandlers = instance._eventhandlers,","                sortable = dt.get('sortable'),","                currentSortEventHandler,","                workingHeader;","            // First justify the table with and set all hidden references","            instance._justifyTableWidth();","            workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;","","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start    ","            eventhandlers.push(","                workingHeader.delegate(","                    'mousemove',","                    instance._checkResizeAprovement,","                    'th',","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize. In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                workingHeader.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                workingHeader.delegate(","                    'mousedown',","                    instance._startResize,","                    'th',","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave'],","                    instance._stopResize,","                    instance","                )","            );","","            // Justify the tablewidth agian after render view or when there is a columnChange","            eventhandlers.push(","                dt.after(","                    ['renderView', 'columnsChange', 'scrollableChange', 'widthChange'],","                    instance._justifyTableWidth,","                    instance","                )","            );","","            if (Lang.isBoolean(sortable) && sortable) {","                // first detach current handler","                currentSortEventHandler = dt._eventHandles.sortUITrigger;","                if (currentSortEventHandler) {","                    currentSortEventHandler.detach();","                    currentSortEventHandler = null;","                }","                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area","                if (dt._theadNode) {","                    eventhandlers.push(","                        dt.delegate(","                            'keydown',","                            Y.rbind(instance._triggerSort, instance),","                            '.' + dt.getClassName('sortable', 'column')","                        )","                    );","                    eventhandlers.push(","                        dt.delegate(","                            'click',","                            Y.rbind(instance._triggerSort, instance),","                            function() {","                                return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));","                            }","                        )","                    );","                }","            }","","        },","","        /**","         * Does the actual sort of columns - if sortable<br>","         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values. In order to prevent resetting the width of the table during sorting","         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value). We don't want to keep that large width, because that would","         * lead to a screen x-sroller on the page.","         *","         * @method _triggerSort","         * @private","         * @protected","         * @param {e} eventFacade","         *","        */","        _triggerSort: function(e) {","            var instance = this,","                dt = instance.datatable,","                container,","                contentBox = instance._dtContentBox;","","            if (instance._dtScrollX) {","                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area","                contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');","                Y.bind('_onUITriggerSort', dt, e)();","                // clear width contentbox to prevent big page x-scroller","                contentBox.setStyle('width', '');","            }","            else if (instance._dtScrollY || instance._dtNoScroll) {","                // we NEED to set dt.width because sortable tables will reset the with while sorting. In these cases the width will be read from this value","                // restore the value, because sizes on the boundingbox might be in % and still need to work afterwards","                container = instance._dtScrollY ? instance._dtYScrollerContainer : instance._dtRealDataTable;","                dt.set('width', (parseInt(container.getStyle('width'), 10)+DATATABLE_BORDERWIDTH)+'px');","                Y.bind('_onUITriggerSort', dt, e)();","                dt.set('width', instance._dtBkpWidth);","            }","            else  {","                // instance._dtScrollXY","                Y.bind('_onUITriggerSort', dt, e)();","            }","        },","","        /**","         * Will be executed at the start of a resizeaction<br>","         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.","         *","         * @method _startResize","         * @private","         * @param {e} eventFacade","         *","        */","        _startResize: function(e) {","            var instance = this,","                dt,","                boundingBox = instance._dtBoundingBox,","                yScrollerContainer = instance._dtYScrollerContainer,","                resizeMargin,","                resizeMarginHalf,","                th,","                lastTh,","                allTh,","                mouseX,","                thWidth,","                thX,","                mouseInLeftNode;","            if (instance._resizeApproved) {","                instance._busyResize = true;","                instance._comingFromResize = true;","                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)","                instance._resizeEvent = instance._bodyNode.on(","                    'mousemove',","                    instance._resizeColumn,","                    instance","                );","                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.","                // we need to know this, because the column-resize handlers overlap 2 th-nodes.","                dt = instance.datatable;","                resizeMargin = instance.get('resizeMargin');","                resizeMarginHalf = Math.round(resizeMargin/2);","                th = e.currentTarget;","                lastTh = (th.next('th')===null);","                mouseX = e.pageX;","                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);","                thX = th.getX();","                mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));","                if (mouseInLeftNode) {","                    instance._leftThNode = th;","                    instance._leftThX = thX;","                    instance._mouseOffset = thX+thWidth-mouseX;","                }","                else {","                    instance._leftThNode = th.previous('th');","                    instance._leftThX = instance._leftThNode.getX();","                    instance._mouseOffset = thX-mouseX;","                }","                allTh = th.get('parentNode').all('th');","                instance._leftColIndex = allTh.indexOf(instance._leftThNode);","                instance._initialColWidth = instance.getColumnWidth(instance._leftColIndex);","                instance._changeUnselectableIE(true);","            }","        },","","        /**","         * Will be executed at the end of a resizeaction<br>","         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.","         *","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @param {Array} e.prevVal<br>","         * contains objects with fields: colindex and width","         * @param {Array} e.newVal<br>","         * contains objects with fields: colindex, width and changed","         *","        */","        _stopResize: function(e) {","            var instance = this,","                dt = instance.datatable,","                finalColWidth;","            if (instance._busyResize) {","                // resizing will be ending. Fire event.","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                finalColWidth = instance.getColumnWidth(instance._leftColIndex);","","                instance._busyResize = false;","                instance._changeUnselectableIE(false);","                instance._checkResizeAprovement(e);","","                // Don't know why, but we need to e.halt in order to fire a new event.","                e.halt();","                if (instance._initialColWidth !== finalColWidth) {","                    /**","                     * In case of a resized column, colWidthChange will be fired by the host-datatable. ","                     * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()","                     * @event colWidthChange","                     * @param {EventFacade} e Event object","                     * @param {Int} e.colIndex","                     * @param {Int} e.prevVal","                     * @param {Int} e.newVal","                    */                ","                    dt.fire('colWidthChange', {colIndex: instance._leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});","                }","                ","                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value","                Y.later(","                    200, ","                    instance, ","                    function() {","                        instance._comingFromResize = false;","                    }","                );","","            }","        },","","        /**","         * Checks whether the nouse is in a position that start-resizing is possible. If so, then the cursor will change to col-resize<br>","         *","         * @method _checkResizeAprovement","         * @private","         * @param {e} eventFacade","         *","        */","        _checkResizeAprovement: function(e) {","            var instance = this;","            if (instance.get('active') && !instance._busyResize) {","                var dt = instance.datatable,","                    boundingBox = dt.get('boundingBox'),","                    th = e.currentTarget,","                    lastTh = (th.next('th')===null),","                    thX = th.getX(),","                    mouseX = e.pageX,","                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),","                    fromLeft,","                    fromRight,","                    insideLeftArea,","                    insideRightArea,","                    resizeMargin = instance.get('resizeMargin'),","                    resizeMarginHalf = Math.round(resizeMargin/2),","                    leftSideFirstTh;","                fromLeft = mouseX-thX;","                fromRight = thX+thWidth-mouseX;","                insideLeftArea = (fromLeft<resizeMarginHalf);","                insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));","                leftSideFirstTh = insideLeftArea && (th.previous('th')===null);","                instance._resizeApproved = ((insideLeftArea || insideRightArea) && !leftSideFirstTh && (instance.get('allColsSortable') || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS)));","                boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);","            }","        },","","        /**","         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>","         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.","         *","         * @method _resizeColumn","         * @private","         * @param {e} eventFacade","         *","        */","        _resizeColumn: function(e) {","            if (this._busyResize) {","                var instance = this,","                    noaction,","                    xScroller = instance._dtXScroller,","                    leftColIndex = instance._leftColIndex,","                    lastColIndex = instance._lastColIndex,","                    prevWidth = instance.getColumnWidth(leftColIndex),","                    lastColExpanded = instance._lastColExpanded,","                    newWidth,","                    decreaseLastCol,","                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset);","                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:                    ","                noaction = ((leftColIndex===lastColIndex) && xScroller && (xScroller.getStyle('overflowX')==='hidden') && (setNewLeftWidth<prevWidth));","                if (!noaction) {","                    newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);","                    if (leftColIndex!==lastColIndex) {","                        if ((lastColExpanded>0) && (newWidth>prevWidth)) {","                            // we must decrease the width of the last col","                            decreaseLastCol = Math.min(lastColExpanded, (newWidth-prevWidth));","                            instance.setColumnWidth(lastColIndex, instance.getColumnWidth(lastColIndex)-decreaseLastCol);","                            instance._lastColExpanded -= decreaseLastCol;","                        }","                    }","                    else {","                        // reset","                        instance._lastColExpanded = 0;","                    }","                }","                else {","                }","            }","        },","","        /**","         * Determines whether a resize-state should be ended. This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead","         *","         * @method _checkEndResizeApprovement","         * @private","         * @param {e} eventFacade","         *","        */","        _checkEndResizeApprovement: function(e) {","            var instance = this;","            if (instance._resizeApproved && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Will toglle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @param {e} eventFacade","         *","        */","        _endResizeApprovement: function() {","            var instance = this;","            instance._resizeApproved = false;","            instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);","        },","","        /**","         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.","         * Use the method to prevent this from happening","         *","         * @method _justifyTableWidth","         * @private","         *","        */","        _justifyTableWidth: function() {","            var instance = this,","                dt = instance.datatable,","                boundingBox,","                contentBox,","                realDataTable,","                realDataTableHeader,","                yScrollerContainer,","                yScrollBar,","                xScroller,","                yScroller,","                scrollX,","                scrollY,","                noScroll,","                scrollXY,","                resetContainer,","                dtScrollHeader,","                allThRealHeader,","                scrollContainer,","                scrollTheaders,","                colObject,","                scrollAttrs,","                yScrollableTable,","                bkpWidth = instance._dtBkpWidth,","                scrollbarOffset = 0,","                totalWidth = 0;","","            instance._bodyNode = Y.one('body');","            instance._dtBoundingBox = boundingBox = dt.get('boundingBox');","            instance._dtWidthPercent = (bkpWidth.substr(bkpWidth.length-1)==='%');","","            scrollAttrs = dt.get('scrollable');","            yScrollableTable = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);","            // In case yScrollable: always take a fixed width. This we MUST do, because of a bug that doesn't replace the y-scroller on a window-resize.","            // That impacts DataTables width percent widths. I gave up a bugfix for this, for I couldn't rewrite dt._bindScrollResize: for some reason the 'resize'-listener didn't work","            if (yScrollableTable && instance._dtWidthPercent) {","                instance._dtBkpWidth = bkpWidth = boundingBox.get('offsetWidth')+'px';","                dt.set('width', bkpWidth);","                instance._dtWidthPercent = false;","            }","","            instance._dtContentBox = contentBox = dt.get('contentBox');","            instance._dtColgroupNode = contentBox.one('colgroup');","            instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));","            instance._dtXScroller = xScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));","            instance._dtYScroller = yScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));","            instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));","            instance._dtYScrollBar = yScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));","            instance._dtRealDataTableHeader = realDataTableHeader = realDataTable.one('.'+dt.getClassName('columns'));","            instance._dtScrollHeader = dtScrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));","            instance._dtScrollX = scrollX = (xScroller!==null) && !yScrollerContainer;","            instance._dtScrollY = scrollY = !xScroller && (yScrollerContainer!==null);","            instance._dtNoScroll = noScroll = !xScroller && !yScrollerContainer;","            instance._dtScrollXY = scrollXY = (xScroller!==null) && (yScrollerContainer!==null);","            resetContainer = yScrollerContainer || realDataTable;","            allThRealHeader = realDataTableHeader.all('th');","            instance._lastColIndex = allThRealHeader.size()-1;","","            // We MUST set the tablesize to 1px, otherwise Safari and Chrome will stretch it and return a false value of the columnwidths","            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)","            resetContainer.setStyle('width', '1px');","","            if (!noScroll) {","                instance._justifySortableColumns();","            }","","            // Next: calculate the sum of all columnwidths                ","            allThRealHeader.each(","                function(th, index, nodelist) {","                    totalWidth += instance.getColumnWidth(index);","                    if (!scrollY && !scrollXY) {","                        // add the resizeclass to the th-elements of the real datatable","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                }","            );","            ","            if (scrollY || scrollXY) {","                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.","                // We need to capture this behaviour when we want to repositions the y-scrollbar","                scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');","                instance._scrollbarOffset = scrollbarOffset = (scrollTheaders && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)) || 0;","                totalWidth += scrollbarOffset;","                dtScrollHeader.all('th').each(","                    function(th, index, nodelist) {","                        // add the resizeclass to the th-elements of the scrollable header","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","            }","","            if (scrollX) {","                realDataTable.setStyle('width', totalWidth+'px');","                instance._setVisibilityXScroller();","            }","","            if (scrollXY) {","                yScrollerContainer.setStyle('width', totalWidth+'px');","                // Also reset scroller-y for this has a width of 1px","                yScroller.setStyle('width', totalWidth+'px');","                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)","                yScrollBar.setStyle('width', '16px');","                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                realDataTable.setStyle('width', '');","                instance._setVisibilityXScroller();","                // The scrollbar NEEDS to be set AFTER _setVisibilityXScroller, because this method can cause yScrollerContainer to expand","                yScrollBar.setStyle('left', (parseInt(xScroller.getStyle('width'),10)-15)+'px');","            }","","            if (scrollY) {","                // only AFTER that, we add our own settings:","                yScrollerContainer.setStyle('width', totalWidth+'px');","                // Also reset scroller-y for this has a width of 1px","                yScroller.setStyle('width', totalWidth+'px');","                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                realDataTable.setStyle('width', '');","            }","","            if (noScroll) {","                realDataTable.setStyle('width', totalWidth+'px');","            }","","        },","","        _changeUnselectableIE : function(noSelect) {","            var instance = this,","                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,","                headerList = headers && headers.all('th'),","                unselectableBkpList = instance._unselectableBkpList,","                bkpMade;","            if (Y.UA.ie>0) {","                bkpMade = (unselectableBkpList.length>0);","                headerList.each(","                    function(th, index, nodelist) {","                        if (noSelect && !bkpMade) {","                            instance._unselectableBkpList.push(th.get('unselectable'));","                        }","                        th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));","                    },","                    instance","                );","            }","        },","","        /**","         * Because we cannot use unpredictable columnwidth, all columns must have a defined width. Second: when col.width is smaller than realized width, we need the actual width","         *","         * @method _justifySortableColumns","         * @private","         *","        */","        _justifySortableColumns: function() {","            var instance = this,","                allThRealHeader;","            ","            // prevent expanding last cell at this stage:","            instance._posibleExpandingLastCell = true;","","            allThRealHeader = instance._dtRealDataTableHeader.all('th');","            allThRealHeader.each(","                function(th, index, nodelist) {","                    instance.setColumnWidth(index, instance.getColumnWidth(index));","                }","            );","            instance._posibleExpandingLastCell = false;","        },","","        /**","         * Make things prettier by hiding the x-scrollbar when not needed","         *","         * @method _setVisibilityXScroller","         * @private","         *","        */","        _setVisibilityXScroller: function() {","            var instance = this,","                offset,","                compairContainer,","                xScroller = instance._dtXScroller;","            if (xScroller) {","                compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                offset = parseInt(xScroller.getStyle('width'),10) - parseInt(compairContainer.getStyle('width'),10);","                xScroller.setStyle('overflowX', (offset<0) ? 'scroll' : 'hidden');","                if ((offset>=0) && (instance._leftColIndex!==instance._lastColIndex)) {","                    instance._expandLastCell(offset);","                }","            }","        },","","        /**","         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area: the last cell will be expanded so that the complete datatable fits within teh scrollable area","         *","         * @method _expandLastCell","         * @private","         *","        */","        _expandLastCell: function(expand) {","            var instance = this,","                lastColIndex = instance._lastColIndex,","                widthLastCol = instance.getColumnWidth(lastColIndex),","                newWidth = instance.setColumnWidth(lastColIndex, widthLastCol+expand);","            instance._lastColExpanded += (newWidth-widthLastCol);","        },","","        /**","         *  @method setColumnWidth","         *  @param {Int} colIndex index of the column","         *  @param {Int} width new width in pixels","         *  @return {int} final reached columnwidth in pixels, which might differ from the pixels trying to set","        */","        setColumnWidth: function (colIndex, width) {","            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the","            // width style to the cells directly, allowing padding and borders to","            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all","            // make the rendered width equal the col's style width, reducing the","            // cells' calculated width.","            var instance = this,","                dt = instance.datatable,","                dtContentBox = instance._dtContentBox,","                colgroup  = instance._dtColgroupNode,","                allColl = colgroup && colgroup.all('col'),","                col       = allColl && allColl.item(colIndex),","                realDataTable = instance._dtRealDataTable,","                xScroller = instance._dtXScroller,","                yScroller = instance._dtYScroller,","                yScrollerContainer = instance._dtYScrollerContainer,","                yScrollBar = instance._dtYScrollBar,","                scrollX = instance._dtScrollX,","                scrollY = instance._dtScrollY,","                noScroll = instance._dtNoScroll,","                scrollXY = instance._dtScrollXY,","                resetContainer,","                tableToBackup,","                noWidthCol,","                bkpColWidth,","                lastIndex,","                bkpDatatableWidth,","                scrollBar,","                badColWidth,","                newWidth,","                getCStyle,","                setCWidth,","                getCellWidthFirstRow,","                corrected,","                scrollHeader = instance._dtScrollHeader,","                scrollThDiv,","                scrollTh;","     ","            if (col && width && Y.Lang.isNumber(width) && (width>=instance.get('minColWidth'))) {","                badColWidth = instance._badColWidth;","                getCStyle = function (element, prop, nonComputed) {","                    return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) | 0);","                };","                getCellWidthFirstRow = function() {","                    var cell = dt.getCell([0, colIndex]) || col,","                        corrected = 0;","                    if (badColWidth) {","                        corrected =  getCStyle(cell, 'paddingLeft') +","                                     getCStyle(cell, 'paddingRight') +","                                     getCStyle(cell, 'borderLeftWidth') +","                                     getCStyle(cell, 'borderRightWidth');","                    }","                    return Math.max(getCStyle(cell, 'width', true), cell.get('offsetWidth'), getCStyle(col, 'width', true)+corrected);","                };","                setCWidth = function (element, newColWidth) {","                    var corrected = 0,","                        cell;","                    if (badColWidth) {","                        cell = dt.getCell([0, colIndex]);","                        if (cell) {","                            corrected =  getCStyle(cell, 'paddingLeft') +","                                         getCStyle(cell, 'paddingRight') +","                                         getCStyle(cell, 'borderLeftWidth') +","                                         getCStyle(cell, 'borderRightWidth');","                        }","                    }","                    newColWidth -= corrected;","                    element.setStyle('width', newColWidth + 'px');","                };","","                // now, also for scrollheaders - if they are available","                newWidth = -getCellWidthFirstRow();","","                if (scrollX) {","                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width, the realDataTable-width will change to 100% when a user is resorting.","                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.","                    tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;","                }","                else if (scrollY || scrollXY) {","                    tableToBackup = yScrollerContainer;","                }","                else {","                    tableToBackup = realDataTable;","                }","                bkpDatatableWidth = getCStyle(tableToBackup, 'width', true);","","","                lastIndex = allColl ? (allColl.size()-1) : 0;","                if (lastIndex>0) {","                    // do not perform this workarround when you have only 1 column","                    noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);","                    bkpColWidth = getCStyle(noWidthCol, 'width', true);","                    noWidthCol.setStyle('width', '');","                }","                else {","                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px, but to 1px (safari ans chrome would otherwise fail)","                    resetContainer = yScrollerContainer || realDataTable;","                    resetContainer.setStyle('width', '1px');","                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation if realDataTable has a width other than 1px","                    if (scrollY) {","                        realDataTable.setStyle('width', '1px');","                    }","                }","                setCWidth(col, width);","                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.","                width = getCellWidthFirstRow();","                dt.getColumn(colIndex).width = width+'px';","","                if (lastIndex>0) {","                    if (bkpColWidth>0) {","                        noWidthCol.setStyle('width', bkpColWidth+'px');","                    }","                }","                newWidth += bkpDatatableWidth + width;","","                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable","","                if (scrollXY) {","                    yScrollerContainer.setStyle('width', newWidth+'px');","                    // now reset the datatable-width","                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')","                    corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth + instance._scrollbarOffset;","                    yScroller.setStyle('width', corrected+'px');","                    // now set the innerwidth of the div inside scrollable TH","                    scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);","                    scrollTh = scrollThDiv.get('parentNode');","                    corrected =  badColWidth ? width : (width -","                                                        getCStyle(scrollThDiv, 'paddingLeft') -","                                                        getCStyle(scrollThDiv, 'paddingRight') - ","                                                        getCStyle(scrollTh, 'borderLeftWidth') -","                                                        getCStyle(scrollTh, 'borderRightWidth'));","                    setCWidth(scrollThDiv, corrected);","                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                    realDataTable.setStyle('width', '');","                }","                if (scrollY) {","                    yScrollerContainer.setStyle('width', newWidth+'px');","                    // now reset the scrollbar-position","                    yScrollBar.setStyle('left', (newWidth-15)+'px');","                    // now reset the datatable-width","                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')","                    corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth;","                    yScroller.setStyle('width', corrected+'px');","                    // now set the innerwidth of the div inside scrollable TH","                    scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);","                    scrollTh = scrollThDiv.get('parentNode');","                    corrected =  badColWidth ? width : (width -","                                                        getCStyle(scrollThDiv, 'paddingLeft') -","                                                        getCStyle(scrollThDiv, 'paddingRight') - ","                                                        getCStyle(scrollTh, 'borderLeftWidth') -","                                                        getCStyle(scrollTh, 'borderRightWidth'));","                    setCWidth(scrollThDiv, corrected);","                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                    realDataTable.setStyle('width', '');","                }","","                if (scrollX) {","                    realDataTable.setStyle('width', newWidth+'px');","                }","","                if (noScroll) {","                    realDataTable.setStyle('width', newWidth+'px');","                }","","                if (scrollX || scrollXY) {","                   if (!instance._posibleExpandingLastCell) { // prevent being looped","                       instance._posibleExpandingLastCell = true;","                       instance._setVisibilityXScroller();","                       // reset instance._posibleExpandingLastCell","                       instance._posibleExpandingLastCell = false;","                   }","                }","                else {","                    dt.get('boundingBox').setStyle('width', '');","                }","            }","            else {","                width = -1;","                // actually need to return an error","            }","            return width;","        },","","        /**","         *  @method getColumnWidth","         *  @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         *  @return {int} columnwidth in pixels","        */","        getColumnWidth: function(name) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                cell,","                headergroup,","                colwidth  = 0,","                width;","            if (colConfigObject && colConfigObject.width) {","                colwidth = parseInt(colConfigObject.width, 10) || 0;","            }","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                headergroup  = instance._dtRealDataTableHeader;","                cell = headergroup && headergroup.all('th').item(name);","            }","            width = Math.max(colwidth, cell && (cell.get('offsetWidth') + (instance._dtYScrollerContainer ? (-parseInt(cell.getStyle('paddingLeft'), 10)-parseInt(cell.getStyle('paddingRight'), 10)) : 0)));","            return Math.max(colwidth, width);","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         *","        */","        _clearEventhandlers : function() {","            var instance = this;","            Y.Array.each(","                instance._eventhandlers,","                function(item, index, array){","                    item.detach();","                }    ","            );","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this,","                dt = instance.datatable,","                dtHandles = dt._eventHandles,","                sortable = dt.get('sortable');","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);","            // now: in case of sortable datatable: we need to attach the original event again.","            if (Lang.isBoolean(sortable) && sortable) {","                dtHandles.sortUITrigger = dt.delegate(['click','keydown'],","                    Y.rbind('_onUITriggerSort', dt),","                    '.' + dt.getClassName('sortable', 'column'));","            }","        }","","    }, {","        NS : 'itsadtcr',","        ATTRS : {","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value correspons with an area that overlaps 2 columns (50% each)<br>","             * @default 10","             * @minimum 2","             * @maximum 60","             * Default=10, Min=2, Max=60","             * @attribute resizeMargin","             * @type int","            */","            resizeMargin: {","                value: 10,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Minamal colwidth that a column can reach by resizing<br>","             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>","             * @default 0","             * @minimum 0","             * @attribute minColWidth","             * @type int","            */","            minColWidth: {","                value: 0,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Whether resizing is active or not<br>","             * You might us this to temporarely disable resizing, or if you want to have the DataTable fixes for large tables and setWidth but don't need the resize utility.<br>","             * Default = true","             * @attribute active","             * @default true","             * @type Boolean","            */","            active: {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the resizehandlers will show up for all columns. If set to false, you have to specify in the columnobject for each column whether the column is resizable.<br>","             * This can be done by setting the resizable field to true. Example: columns = [{label: 'firstname'}, {label: 'lastname', resizable: true}];<br>","             * Default = true","             * @attribute allColsSortable","             * @default true","             * @type Boolean","            */","            allColsSortable: {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"plugin\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-resize\",","        \"datatable-column-widths\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].lines = {"1":0,"3":0,"247":0,"252":0,"296":0,"297":0,"298":0,"299":0,"300":0,"303":0,"317":0,"321":0,"322":0,"324":0,"328":0,"329":0,"336":0,"347":0,"354":0,"355":0,"358":0,"368":0,"377":0,"388":0,"397":0,"405":0,"407":0,"408":0,"409":0,"410":0,"413":0,"414":0,"421":0,"426":0,"448":0,"453":0,"455":0,"456":0,"458":0,"460":0,"463":0,"464":0,"465":0,"466":0,"470":0,"484":0,"497":0,"498":0,"499":0,"501":0,"508":0,"509":0,"510":0,"511":0,"512":0,"513":0,"515":0,"516":0,"517":0,"518":0,"519":0,"520":0,"521":0,"524":0,"525":0,"526":0,"528":0,"529":0,"530":0,"531":0,"549":0,"552":0,"554":0,"555":0,"557":0,"559":0,"560":0,"561":0,"564":0,"565":0,"575":0,"579":0,"583":0,"599":0,"600":0,"601":0,"616":0,"617":0,"618":0,"619":0,"620":0,"621":0,"622":0,"636":0,"637":0,"648":0,"649":0,"650":0,"651":0,"652":0,"654":0,"655":0,"656":0,"661":0,"678":0,"679":0,"680":0,"693":0,"694":0,"695":0,"707":0,"733":0,"734":0,"735":0,"737":0,"738":0,"741":0,"742":0,"743":0,"744":0,"747":0,"748":0,"749":0,"750":0,"751":0,"752":0,"753":0,"754":0,"755":0,"756":0,"757":0,"758":0,"759":0,"760":0,"761":0,"762":0,"766":0,"768":0,"769":0,"773":0,"775":0,"776":0,"778":0,"779":0,"784":0,"787":0,"788":0,"789":0,"790":0,"793":0,"794":0,"799":0,"800":0,"801":0,"804":0,"805":0,"807":0,"809":0,"811":0,"812":0,"814":0,"817":0,"819":0,"821":0,"823":0,"826":0,"827":0,"833":0,"838":0,"839":0,"840":0,"842":0,"843":0,"845":0,"860":0,"864":0,"866":0,"867":0,"869":0,"872":0,"883":0,"887":0,"888":0,"889":0,"890":0,"891":0,"892":0,"905":0,"909":0,"924":0,"956":0,"957":0,"958":0,"959":0,"961":0,"962":0,"964":0,"965":0,"970":0,"972":0,"973":0,"975":0,"976":0,"977":0,"978":0,"984":0,"985":0,"989":0,"991":0,"994":0,"996":0,"997":0,"1000":0,"1002":0,"1005":0,"1006":0,"1008":0,"1009":0,"1010":0,"1014":0,"1015":0,"1017":0,"1018":0,"1021":0,"1023":0,"1024":0,"1026":0,"1027":0,"1028":0,"1031":0,"1035":0,"1036":0,"1039":0,"1040":0,"1042":0,"1043":0,"1044":0,"1049":0,"1051":0,"1053":0,"1054":0,"1056":0,"1059":0,"1060":0,"1062":0,"1063":0,"1064":0,"1069":0,"1071":0,"1074":0,"1075":0,"1078":0,"1079":0,"1082":0,"1083":0,"1084":0,"1085":0,"1087":0,"1091":0,"1095":0,"1098":0,"1107":0,"1114":0,"1115":0,"1117":0,"1118":0,"1120":0,"1121":0,"1122":0,"1124":0,"1125":0,"1136":0,"1137":0,"1140":0,"1151":0,"1155":0,"1156":0,"1158":0,"1159":0,"1161":0,"1162":0,"1185":0,"1200":0,"1215":0,"1230":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].functions = {"initializer:295":0,"(anonymous 2):327":0,"_render:316":0,"(anonymous 3):425":0,"_bindUI:346":0,"_triggerSort:447":0,"_startResize:483":0,"(anonymous 4):582":0,"_stopResize:548":0,"_checkResizeAprovement:598":0,"_resizeColumn:635":0,"_checkEndResizeApprovement:677":0,"_endResizeApprovement:692":0,"(anonymous 5):774":0,"(anonymous 6):791":0,"_justifyTableWidth:706":0,"(anonymous 7):841":0,"_changeUnselectableIE:832":0,"(anonymous 8):868":0,"_justifySortableColumns:859":0,"_setVisibilityXScroller:882":0,"_expandLastCell:904":0,"getCStyle:958":0,"getCellWidthFirstRow:961":0,"setCWidth:972":0,"setColumnWidth:918":0,"getColumnWidth:1106":0,"(anonymous 9):1139":0,"_clearEventhandlers:1135":0,"destructor:1150":0,"validator:1184":0,"validator:1199":0,"validator:1214":0,"validator:1229":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredLines = 285;
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredFunctions = 35;
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1);
YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 3);
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


_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 247);
var Lang = Y.Lang,
    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',
    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',
    DATATABLE_BORDERWIDTH = 2;

_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 252);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "initializer", 295);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 296);
var instance = this;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 297);
instance.datatable = instance.get('host');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 298);
instance._badColWidth = Y.Features.test('table', 'badColWidth');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 299);
if (instance.datatable.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 300);
instance._render();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 303);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_render", 316);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 317);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                xScrollableTable = (scrollAttrs==='x') || (scrollAttrs==='xy') || (scrollAttrs===true);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 321);
instance._dtBkpWidth = dt.get('width');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 322);
if ((typeof instance._dtBkpWidth === 'string') && (instance._dtBkpWidth.length>0) && !xScrollableTable) {
                // always activate the xScroller when it isn't there while DataTable has a defined width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 324);
Y.use(
                    'datatable-scroll', 
                    Y.bind(
                        function(Y) {
                            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 2)", 327);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 328);
dt.set('scrollable', (dt.get('scrollable')==='y') ? 'xy' : 'x');    
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 329);
this._bindUI();
                        }, 
                        instance
                    )
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 336);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_bindUI", 346);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 347);
var instance = this,
                dt = instance.datatable,
                eventhandlers = instance._eventhandlers,
                sortable = dt.get('sortable'),
                currentSortEventHandler,
                workingHeader;
            // First justify the table with and set all hidden references
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 354);
instance._justifyTableWidth();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 355);
workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start    
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 358);
eventhandlers.push(
                workingHeader.delegate(
                    'mousemove',
                    instance._checkResizeAprovement,
                    'th',
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize. In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 368);
eventhandlers.push(
                workingHeader.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 377);
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
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 388);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave'],
                    instance._stopResize,
                    instance
                )
            );

            // Justify the tablewidth agian after render view or when there is a columnChange
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 397);
eventhandlers.push(
                dt.after(
                    ['renderView', 'columnsChange', 'scrollableChange', 'widthChange'],
                    instance._justifyTableWidth,
                    instance
                )
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 405);
if (Lang.isBoolean(sortable) && sortable) {
                // first detach current handler
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 407);
currentSortEventHandler = dt._eventHandles.sortUITrigger;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 408);
if (currentSortEventHandler) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 409);
currentSortEventHandler.detach();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 410);
currentSortEventHandler = null;
                }
                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 413);
if (dt._theadNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 414);
eventhandlers.push(
                        dt.delegate(
                            'keydown',
                            Y.rbind(instance._triggerSort, instance),
                            '.' + dt.getClassName('sortable', 'column')
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 421);
eventhandlers.push(
                        dt.delegate(
                            'click',
                            Y.rbind(instance._triggerSort, instance),
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 3)", 425);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 426);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_triggerSort", 447);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 448);
var instance = this,
                dt = instance.datatable,
                container,
                contentBox = instance._dtContentBox;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 453);
if (instance._dtScrollX) {
                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 455);
contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 456);
Y.bind('_onUITriggerSort', dt, e)();
                // clear width contentbox to prevent big page x-scroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 458);
contentBox.setStyle('width', '');
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 460);
if (instance._dtScrollY || instance._dtNoScroll) {
                // we NEED to set dt.width because sortable tables will reset the with while sorting. In these cases the width will be read from this value
                // restore the value, because sizes on the boundingbox might be in % and still need to work afterwards
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 463);
container = instance._dtScrollY ? instance._dtYScrollerContainer : instance._dtRealDataTable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 464);
dt.set('width', (parseInt(container.getStyle('width'), 10)+DATATABLE_BORDERWIDTH)+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 465);
Y.bind('_onUITriggerSort', dt, e)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 466);
dt.set('width', instance._dtBkpWidth);
            }
            else  {
                // instance._dtScrollXY
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 470);
Y.bind('_onUITriggerSort', dt, e)();
            }}
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_startResize", 483);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 484);
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
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 497);
if (instance._resizeApproved) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 498);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 499);
instance._comingFromResize = true;
                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 501);
instance._resizeEvent = instance._bodyNode.on(
                    'mousemove',
                    instance._resizeColumn,
                    instance
                );
                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.
                // we need to know this, because the column-resize handlers overlap 2 th-nodes.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 508);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 509);
resizeMargin = instance.get('resizeMargin');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 510);
resizeMarginHalf = Math.round(resizeMargin/2);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 511);
th = e.currentTarget;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 512);
lastTh = (th.next('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 513);
mouseX = e.pageX;
                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 515);
thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 516);
thX = th.getX();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 517);
mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 518);
if (mouseInLeftNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 519);
instance._leftThNode = th;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 520);
instance._leftThX = thX;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 521);
instance._mouseOffset = thX+thWidth-mouseX;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 524);
instance._leftThNode = th.previous('th');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 525);
instance._leftThX = instance._leftThNode.getX();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 526);
instance._mouseOffset = thX-mouseX;
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 528);
allTh = th.get('parentNode').all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 529);
instance._leftColIndex = allTh.indexOf(instance._leftThNode);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 530);
instance._initialColWidth = instance.getColumnWidth(instance._leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 531);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_stopResize", 548);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 549);
var instance = this,
                dt = instance.datatable,
                finalColWidth;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 552);
if (instance._busyResize) {
                // resizing will be ending. Fire event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 554);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 555);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 557);
finalColWidth = instance.getColumnWidth(instance._leftColIndex);

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 559);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 560);
instance._changeUnselectableIE(false);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 561);
instance._checkResizeAprovement(e);

                // Don't know why, but we need to e.halt in order to fire a new event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 564);
e.halt();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 565);
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
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 575);
dt.fire('colWidthChange', {colIndex: instance._leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                }
                
                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 579);
Y.later(
                    200, 
                    instance, 
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 4)", 582);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 583);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkResizeAprovement", 598);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 599);
var instance = this;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 600);
if (instance.get('active') && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 601);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 616);
fromLeft = mouseX-thX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 617);
fromRight = thX+thWidth-mouseX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 618);
insideLeftArea = (fromLeft<resizeMarginHalf);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 619);
insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 620);
leftSideFirstTh = insideLeftArea && (th.previous('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 621);
instance._resizeApproved = ((insideLeftArea || insideRightArea) && !leftSideFirstTh && (instance.get('allColsSortable') || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS)));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 622);
boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_resizeColumn", 635);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 636);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 637);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 648);
noaction = ((leftColIndex===lastColIndex) && xScroller && (xScroller.getStyle('overflowX')==='hidden') && (setNewLeftWidth<prevWidth));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 649);
if (!noaction) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 650);
newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 651);
if (leftColIndex!==lastColIndex) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 652);
if ((lastColExpanded>0) && (newWidth>prevWidth)) {
                            // we must decrease the width of the last col
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 654);
decreaseLastCol = Math.min(lastColExpanded, (newWidth-prevWidth));
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 655);
instance.setColumnWidth(lastColIndex, instance.getColumnWidth(lastColIndex)-decreaseLastCol);
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 656);
instance._lastColExpanded -= decreaseLastCol;
                        }
                    }
                    else {
                        // reset
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 661);
instance._lastColExpanded = 0;
                    }
                }
                else {
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkEndResizeApprovement", 677);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 678);
var instance = this;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 679);
if (instance._resizeApproved && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 680);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_endResizeApprovement", 692);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 693);
var instance = this;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 694);
instance._resizeApproved = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 695);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableWidth", 706);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 707);
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

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 733);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 734);
instance._dtBoundingBox = boundingBox = dt.get('boundingBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 735);
instance._dtWidthPercent = (bkpWidth.substr(bkpWidth.length-1)==='%');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 737);
scrollAttrs = dt.get('scrollable');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 738);
yScrollableTable = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);
            // In case yScrollable: always take a fixed width. This we MUST do, because of a bug that doesn't replace the y-scroller on a window-resize.
            // That impacts DataTables width percent widths. I gave up a bugfix for this, for I couldn't rewrite dt._bindScrollResize: for some reason the 'resize'-listener didn't work
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 741);
if (yScrollableTable && instance._dtWidthPercent) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 742);
instance._dtBkpWidth = bkpWidth = boundingBox.get('offsetWidth')+'px';
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 743);
dt.set('width', bkpWidth);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 744);
instance._dtWidthPercent = false;
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 747);
instance._dtContentBox = contentBox = dt.get('contentBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 748);
instance._dtColgroupNode = contentBox.one('colgroup');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 749);
instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 750);
instance._dtXScroller = xScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 751);
instance._dtYScroller = yScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 752);
instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 753);
instance._dtYScrollBar = yScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 754);
instance._dtRealDataTableHeader = realDataTableHeader = realDataTable.one('.'+dt.getClassName('columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 755);
instance._dtScrollHeader = dtScrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 756);
instance._dtScrollX = scrollX = (xScroller!==null) && !yScrollerContainer;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 757);
instance._dtScrollY = scrollY = !xScroller && (yScrollerContainer!==null);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 758);
instance._dtNoScroll = noScroll = !xScroller && !yScrollerContainer;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 759);
instance._dtScrollXY = scrollXY = (xScroller!==null) && (yScrollerContainer!==null);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 760);
resetContainer = yScrollerContainer || realDataTable;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 761);
allThRealHeader = realDataTableHeader.all('th');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 762);
instance._lastColIndex = allThRealHeader.size()-1;

            // We MUST set the tablesize to 1px, otherwise Safari and Chrome will stretch it and return a false value of the columnwidths
            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 766);
resetContainer.setStyle('width', '1px');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 768);
if (!noScroll) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 769);
instance._justifySortableColumns();
            }

            // Next: calculate the sum of all columnwidths                
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 773);
allThRealHeader.each(
                function(th, index, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 5)", 774);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 775);
totalWidth += instance.getColumnWidth(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 776);
if (!scrollY && !scrollXY) {
                        // add the resizeclass to the th-elements of the real datatable
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 778);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 779);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                }
            );
            
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 784);
if (scrollY || scrollXY) {
                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.
                // We need to capture this behaviour when we want to repositions the y-scrollbar
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 787);
scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 788);
instance._scrollbarOffset = scrollbarOffset = (scrollTheaders && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)) || 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 789);
totalWidth += scrollbarOffset;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 790);
dtScrollHeader.all('th').each(
                    function(th, index, nodelist) {
                        // add the resizeclass to the th-elements of the scrollable header
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 6)", 791);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 793);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 794);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 799);
if (scrollX) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 800);
realDataTable.setStyle('width', totalWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 801);
instance._setVisibilityXScroller();
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 804);
if (scrollXY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 805);
yScrollerContainer.setStyle('width', totalWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 807);
yScroller.setStyle('width', totalWidth+'px');
                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 809);
yScrollBar.setStyle('width', '16px');
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 811);
realDataTable.setStyle('width', '');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 812);
instance._setVisibilityXScroller();
                // The scrollbar NEEDS to be set AFTER _setVisibilityXScroller, because this method can cause yScrollerContainer to expand
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 814);
yScrollBar.setStyle('left', (parseInt(xScroller.getStyle('width'),10)-15)+'px');
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 817);
if (scrollY) {
                // only AFTER that, we add our own settings:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 819);
yScrollerContainer.setStyle('width', totalWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 821);
yScroller.setStyle('width', totalWidth+'px');
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 823);
realDataTable.setStyle('width', '');
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 826);
if (noScroll) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 827);
realDataTable.setStyle('width', totalWidth+'px');
            }

        },

        _changeUnselectableIE : function(noSelect) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_changeUnselectableIE", 832);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 833);
var instance = this,
                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,
                headerList = headers && headers.all('th'),
                unselectableBkpList = instance._unselectableBkpList,
                bkpMade;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 838);
if (Y.UA.ie>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 839);
bkpMade = (unselectableBkpList.length>0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 840);
headerList.each(
                    function(th, index, nodelist) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 7)", 841);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 842);
if (noSelect && !bkpMade) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 843);
instance._unselectableBkpList.push(th.get('unselectable'));
                        }
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 845);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifySortableColumns", 859);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 860);
var instance = this,
                allThRealHeader;
            
            // prevent expanding last cell at this stage:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 864);
instance._posibleExpandingLastCell = true;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 866);
allThRealHeader = instance._dtRealDataTableHeader.all('th');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 867);
allThRealHeader.each(
                function(th, index, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 8)", 868);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 869);
instance.setColumnWidth(index, instance.getColumnWidth(index));
                }
            );
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 872);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_setVisibilityXScroller", 882);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 883);
var instance = this,
                offset,
                compairContainer,
                xScroller = instance._dtXScroller;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 887);
if (xScroller) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 888);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 889);
offset = parseInt(xScroller.getStyle('width'),10) - parseInt(compairContainer.getStyle('width'),10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 890);
xScroller.setStyle('overflowX', (offset<0) ? 'scroll' : 'hidden');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 891);
if ((offset>=0) && (instance._leftColIndex!==instance._lastColIndex)) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 892);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_expandLastCell", 904);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 905);
var instance = this,
                lastColIndex = instance._lastColIndex,
                widthLastCol = instance.getColumnWidth(lastColIndex),
                newWidth = instance.setColumnWidth(lastColIndex, widthLastCol+expand);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 909);
instance._lastColExpanded += (newWidth-widthLastCol);
        },

        /**
         *  @method setColumnWidth
         *  @param {Int} colIndex index of the column
         *  @param {Int} width new width in pixels
         *  @return {int} final reached columnwidth in pixels, which might differ from the pixels trying to set
        */
        setColumnWidth: function (colIndex, width) {
            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the
            // width style to the cells directly, allowing padding and borders to
            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all
            // make the rendered width equal the col's style width, reducing the
            // cells' calculated width.
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColumnWidth", 918);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 924);
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
     
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 956);
if (col && width && Y.Lang.isNumber(width) && (width>=instance.get('minColWidth'))) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 957);
badColWidth = instance._badColWidth;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 958);
getCStyle = function (element, prop, nonComputed) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getCStyle", 958);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 959);
return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) | 0);
                };
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 961);
getCellWidthFirstRow = function() {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getCellWidthFirstRow", 961);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 962);
var cell = dt.getCell([0, colIndex]) || col,
                        corrected = 0;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 964);
if (badColWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 965);
corrected =  getCStyle(cell, 'paddingLeft') +
                                     getCStyle(cell, 'paddingRight') +
                                     getCStyle(cell, 'borderLeftWidth') +
                                     getCStyle(cell, 'borderRightWidth');
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 970);
return Math.max(getCStyle(cell, 'width', true), cell.get('offsetWidth'), getCStyle(col, 'width', true)+corrected);
                };
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 972);
setCWidth = function (element, newColWidth) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setCWidth", 972);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 973);
var corrected = 0,
                        cell;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 975);
if (badColWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 976);
cell = dt.getCell([0, colIndex]);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 977);
if (cell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 978);
corrected =  getCStyle(cell, 'paddingLeft') +
                                         getCStyle(cell, 'paddingRight') +
                                         getCStyle(cell, 'borderLeftWidth') +
                                         getCStyle(cell, 'borderRightWidth');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 984);
newColWidth -= corrected;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 985);
element.setStyle('width', newColWidth + 'px');
                };

                // now, also for scrollheaders - if they are available
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 989);
newWidth = -getCellWidthFirstRow();

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 991);
if (scrollX) {
                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width, the realDataTable-width will change to 100% when a user is resorting.
                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 994);
tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;
                }
                else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 996);
if (scrollY || scrollXY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 997);
tableToBackup = yScrollerContainer;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1000);
tableToBackup = realDataTable;
                }}
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1002);
bkpDatatableWidth = getCStyle(tableToBackup, 'width', true);


                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1005);
lastIndex = allColl ? (allColl.size()-1) : 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1006);
if (lastIndex>0) {
                    // do not perform this workarround when you have only 1 column
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1008);
noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1009);
bkpColWidth = getCStyle(noWidthCol, 'width', true);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1010);
noWidthCol.setStyle('width', '');
                }
                else {
                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px, but to 1px (safari ans chrome would otherwise fail)
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1014);
resetContainer = yScrollerContainer || realDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1015);
resetContainer.setStyle('width', '1px');
                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation if realDataTable has a width other than 1px
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1017);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1018);
realDataTable.setStyle('width', '1px');
                    }
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1021);
setCWidth(col, width);
                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1023);
width = getCellWidthFirstRow();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1024);
dt.getColumn(colIndex).width = width+'px';

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1026);
if (lastIndex>0) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1027);
if (bkpColWidth>0) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1028);
noWidthCol.setStyle('width', bkpColWidth+'px');
                    }
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1031);
newWidth += bkpDatatableWidth + width;

                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1035);
if (scrollXY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1036);
yScrollerContainer.setStyle('width', newWidth+'px');
                    // now reset the datatable-width
                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1039);
corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth + instance._scrollbarOffset;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1040);
yScroller.setStyle('width', corrected+'px');
                    // now set the innerwidth of the div inside scrollable TH
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1042);
scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1043);
scrollTh = scrollThDiv.get('parentNode');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1044);
corrected =  badColWidth ? width : (width -
                                                        getCStyle(scrollThDiv, 'paddingLeft') -
                                                        getCStyle(scrollThDiv, 'paddingRight') - 
                                                        getCStyle(scrollTh, 'borderLeftWidth') -
                                                        getCStyle(scrollTh, 'borderRightWidth'));
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1049);
setCWidth(scrollThDiv, corrected);
                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1051);
realDataTable.setStyle('width', '');
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1053);
if (scrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1054);
yScrollerContainer.setStyle('width', newWidth+'px');
                    // now reset the scrollbar-position
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1056);
yScrollBar.setStyle('left', (newWidth-15)+'px');
                    // now reset the datatable-width
                    // In case of Scrollable AND sortable containers, the width MUST be set on contentBox.one('.yui3-datatable-y-scroller')
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1059);
corrected = getCStyle(yScroller, 'width', true) + newWidth - bkpDatatableWidth;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1060);
yScroller.setStyle('width', corrected+'px');
                    // now set the innerwidth of the div inside scrollable TH
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1062);
scrollThDiv = scrollHeader.all('.yui3-datatable-scroll-liner').item(colIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1063);
scrollTh = scrollThDiv.get('parentNode');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1064);
corrected =  badColWidth ? width : (width -
                                                        getCStyle(scrollThDiv, 'paddingLeft') -
                                                        getCStyle(scrollThDiv, 'paddingRight') - 
                                                        getCStyle(scrollTh, 'borderLeftWidth') -
                                                        getCStyle(scrollTh, 'borderRightWidth'));
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1069);
setCWidth(scrollThDiv, corrected);
                    // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1071);
realDataTable.setStyle('width', '');
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1074);
if (scrollX) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1075);
realDataTable.setStyle('width', newWidth+'px');
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1078);
if (noScroll) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1079);
realDataTable.setStyle('width', newWidth+'px');
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1082);
if (scrollX || scrollXY) {
                   _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1083);
if (!instance._posibleExpandingLastCell) { // prevent being looped
                       _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1084);
instance._posibleExpandingLastCell = true;
                       _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1085);
instance._setVisibilityXScroller();
                       // reset instance._posibleExpandingLastCell
                       _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1087);
instance._posibleExpandingLastCell = false;
                   }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1091);
dt.get('boundingBox').setStyle('width', '');
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1095);
width = -1;
                // actually need to return an error
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1098);
return width;
        },

        /**
         *  @method getColumnWidth
         *  @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         *  @return {int} columnwidth in pixels
        */
        getColumnWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidth", 1106);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1107);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                cell,
                headergroup,
                colwidth  = 0,
                width;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1114);
if (colConfigObject && colConfigObject.width) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1115);
colwidth = parseInt(colConfigObject.width, 10) || 0;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1117);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1118);
cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1120);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1121);
headergroup  = instance._dtRealDataTableHeader;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1122);
cell = headergroup && headergroup.all('th').item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1124);
width = Math.max(colwidth, cell && (cell.get('offsetWidth') + (instance._dtYScrollerContainer ? (-parseInt(cell.getStyle('paddingLeft'), 10)-parseInt(cell.getStyle('paddingRight'), 10)) : 0)));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1125);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearEventhandlers", 1135);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1136);
var instance = this;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1137);
Y.Array.each(
                instance._eventhandlers,
                function(item, index, array){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 9)", 1139);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1140);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "destructor", 1150);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1151);
var instance = this,
                dt = instance.datatable,
                dtHandles = dt._eventHandles,
                sortable = dt.get('sortable');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1155);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1156);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1158);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1159);
instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);
            // now: in case of sortable datatable: we need to attach the original event again.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1161);
if (Lang.isBoolean(sortable) && sortable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1162);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1184);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1185);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1199);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1200);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1214);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1215);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1229);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1230);
return Y.Lang.isBoolean(val);
                }
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "plugin",
        "node-base",
        "node-screen",
        "node-event-delegate",
        "event-mouseenter",
        "event-custom",
        "event-resize",
        "datatable-column-widths"
    ],
    "skinnable": true
});
