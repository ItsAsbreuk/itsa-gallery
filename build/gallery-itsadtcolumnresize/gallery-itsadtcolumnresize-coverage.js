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
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].code=["YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {","","'use strict';","","/**"," * DataTable ColumnResize Plugin"," *"," *"," * If you want to make the columns resizable, than you just define the datatable-attribute 'colsresizable' like:"," *"," * myDatatable.set('colsresizable', true);"," *"," * This can be done at initialisation of the datatable, before Y.Plugin.ITSADTColumnResize is plugged in, or later on."," * The attribute 'colsresizable' can have three states:"," *"," * <ul>"," * <li>true --> all columns are resizable</li>"," * <li>false --> colresizing is disabled</li>"," * <li>null/undefined --> colresizing is active where only columns(objects) that have the property 'resizable' will be resizable</li>"," * </ul>"," *"," * If myDatatable.get('colsresizable') is undefined or null, then only columns with colConfig.resizable=true are resizable."," *"," *"," * @module gallery-itsadtcolumnresize"," * @class Plugin.ITSADTColumnResize"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal list that holds resize-event-references"," * @property _resizeEventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal flag that states if datatable.get('colsresizable')===true"," * @property _allColsResizable"," * @private"," * @type Boolean"," */","","/**"," * plugin's host DataTable"," * @property datatable"," * @type Y.DataTable"," */","","/**"," * Internal flag that tells whether the browsers does a bad colwidth calculation (Opera, IE6, IE7).<br>"," * Determined by featuretest."," * @property _badColWidth"," * @type boolean"," * @private"," */","","/**"," * Node-reference to datatable's <col> elemets within <colgroup>"," * @property _dtColNodes"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-columns"," * @property _dtRealDataTableHeader"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's parentNode"," * @property _datatableParentNode"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's boundingbox"," * @property _dtBoundingBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's contentbox"," * @property _dtContentBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-x-scroller"," * @property _dtXScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller"," * @property _dtYScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scrollbar"," * @property _dtYScrollBar"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller-container"," * @property _dtYScrollerContainer"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scroll-columns"," * @property _dtScrollHeader"," * @type Y.Node"," * @private"," */","","/**"," * NodeList-reference to all datatable's .yui3-datatable-scroll-liner"," * @property _dtScrollLiner"," * @type Y.Node"," * @private"," */","","/**"," * Flag that tells whether DataTable is y-scrollable"," * @property _dtScrollY"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether resize may start when the mouse gets pressed"," * @property _resizeApproved"," * @private"," * @type Boolean"," */","","/**"," * Flag that tells whether resizing is going on"," * @property _busyResize"," * @private"," * @type Boolean"," */","","/**"," * th-Node on the left side while resizing"," * @property _leftThNode"," * @private"," * @type Y.Node"," */","","/**"," * screens x-pos of the left th-Node while resizing (Y.Node.getX())"," * @property _leftThX"," * @private"," * @type int"," */","","/**"," * Mouse-offset compared to columnborder when starting to resize"," * @property _mouseOffset"," * @private"," * @type int"," */","","/**"," * index of the left th-Node while resizing"," * @property _leftColIndex"," * @private"," * @type int"," */","","/**"," * index of the most right th-Node"," * @property _lastColIndex"," * @private"," * @type int"," */","","/**"," * backup of the th-width before resize starts. This value is passed as prevVal when the event 'colWidthChange' is fired"," * @property _initialColWidth"," * @private"," * @type int"," */","","/**"," * Internal flag that tells whether distributeRemainingSpace is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace() because we could get into a loop"," * @property _busyDistributeRemainingSpace"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether transformAllColumnWidthToPixels is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace()"," * @property _busyTransformAllColumnWidthToPixels"," * @private"," * @type boolean"," */","","/**"," * horizontal offset of the y-scrollbar (in case of y-scrollable datatable)"," * @property _scrollbarOffset"," * @private"," * @type int"," */","","/**"," * Reference to Y.one('body')"," * @property _bodyNode"," * @private"," * @type Y.Node"," */","","/**"," * internal flag that will prevent sorting columns while resizing"," * @property _comingFromResize"," * @private"," * @type boolean"," */","","/**"," * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that"," * the total tablewidth needed to increase by enlargin the last col."," * @property _distributedSpace"," * @private"," * @type int"," */","","/**"," * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing"," * @property _unselectableBkpList"," * @private"," * @type Array"," */","","/**"," * Holds the configindexes of the colls that have no width specified. Used internally to distribute the remaining space after a colwidthchange"," * @property _notSpecCols"," * @private"," * @type int[]"," */","","/**"," * Internal flag that tells whether the datatable has its width-attribute defined"," * @property _dtWidthDefined"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether the datatable has its width-attribute in percent"," * @property _dtWidthIsPercented"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether datatable.widthChange is called from intern."," * To prevent event to call this._justifyTableWidth() in those cases."," * @property _widthChangeInternally"," * @private"," * @type boolean"," */","","","","","var Lang = Y.Lang,","    YArray = Y.Array,","    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',","    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',","    PERCENTEDWIDTHDATA = 'itsa_width_percented',","    EXPANSIONDATA = 'itsa_expansion',","    DEFINEDCOLWIDTHDATA = 'itsa_defined_col_width_data',","    DATAYES = 'yes',","    DATANO = 'no',","    DATATABLE_BORDERWIDTH = 2;","","Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        _resizeEventhandlers : [],","        _allColsResizable : null,","        datatable : null,","        _badColWidth : null,","        _dtWidthDefined : null,","        _dtWidthIsPercented : null,","        _dtColNodes : null,","        _datatableParentNode : null,","        _dtBoundingBox : null,","        _dtContentBox : null,","        _dtXScroller : null,","        _dtYScroller : null,","        _dtYScrollBar : null,","        _dtYScrollerContainer : null,","        _dtRealDataTableHeader : null,","        _dtScrollHeader : null,","        _dtScrollLiners : null,","        _dtScrollY : null,","        _resizeApproved: false,","        _busyResize : false,","        _leftThNode : null,","        _leftThX : null,","        _mouseOffset : null,","        _leftColIndex : null,","        _lastColIndex : null,","        _initialColWidth : null,","        _busyDistributeRemainingSpace : null,","        _busyTransformAllColumnWidthToPixels : null,","        _scrollbarOffset : 0,","        _bodyNode : null,","        _comingFromResize : null,","        _widthChangeInternally : null,","        _unselectableBkpList : [],","        _distributedSpace : 0,","        _notSpecCols : [],","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","            instance.datatable = instance.get('host');","            instance._badColWidth = Y.Features.test('table', 'badColWidth');","            if (instance.datatable.get('rendered')) {","                instance._render();","            }","            else {","                instance.afterHostEvent('render', instance._render, instance);","            }","        },","","        /**","         * Transforms the columnwidth to percent.","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPercent: function(name) {","            var instance = this,","                newValue, expansion;","","            if (!instance.columnWidthIsPercent(name)) {","                newValue = instance.getColumnWidthPercent(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to pixels.","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPixels: function(name) {","            var instance = this,","                newValue, expansion;","","            if (!instance.columnWidthIsPixels(name)) {","                newValue = instance.getColumnWidthPx(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to undefined. Doesn't change the occupied colspace, but an undefined width will lead to","         * adding expansion when other cols get width-changes. Can only be done if the DataTable has a defined width (either in pixels or percent),","         * otherwise, the columnwidth-type will remain.","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToUndefinedWidth","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToUndefinedWidth: function(name) {","            var instance = this,","                thcell, newValue;","","            if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {","                newValue = instance.getColumnWidthPx(name);","                instance.setColumnWidth(name, newValue);","                thcell = this._getThCel(name);","                if (thcell) {","                    thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                }","            }","        },","","        /**","         * @method columnWidthIsPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in percent. Returns false if in pixels or undefined","         * @since 0.1","        */","        columnWidthIsPercent: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            return (storedPercentedWidth.length>0);","        },","","        /**","         * @method columnWidthIsPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined","         * @since 0.1","        */","        columnWidthIsPixels: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return definedColWidth && (storedPercentedWidth.length===0);","        },","","        /**","         * @method columnWidthIsUndefined","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is undefined","         * @since 0.1","        */","        columnWidthIsUndefined: function(name) {","            var thcell = this._getThCel(name),","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return !definedColWidth;","        },","","        /**","         * @method getColumnConfigWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null","         * @since 0.1","        */","        getColumnConfigWidth: function(name) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                columns = dt.get('columns'),","                colIndex = YArray.indexOf(columns, colConfigObject),","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.","            return (colConfigObject && ((storedPercentedWidth.length>0) ? storedPercentedWidth : colConfigObject.width)) || null;","        },","","        /**","         * Retreives the true col-width in pixels, exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPx","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {int} columnwidth in pixels","         * @since 0.1","        */","        getColumnWidthPx: function(name, withoutExpansion) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                allThHeader = instance._dtRealDataTableTHNodes,","                expansion = 0,","                colwidth = 0,","                cell;","","            if (colConfigObject && colConfigObject.width) {","                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px","                colwidth = parseInt(colConfigObject.width, 10) || 0;","            }","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;","            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth","            if (!instance._busyDistributeRemainingSpace) {","                colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));","            }","            return colwidth - expansion;","        },","","        /**","         * Retreives the true col-width in percent (in comparison to the DataTable-width) exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPercent","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {String} columnwidth in percent","         * @since 0.1","        */","        getColumnWidthPercent: function(name, withoutExpansion) {","            var instance = this,","                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH)","                                    : instance._datatableParentNode.get('offsetWidth'),","                width = instance.getColumnWidthPx(name, withoutExpansion);","","            return (100*width/dtWidthWithBorder).toFixed(2) + '%';","        },","","        /**","         * Retreives the expansion of the column in pixels. Some cols might have been expanded to fit a fixed DataTable-width.","         * @method getColumnExpansion","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} expansion in pixels","         * @since 0.1","        */","        getColumnExpansion: function(name) {","            var instance = this,","                allThHeader = instance._dtRealDataTableTHNodes,","                cell;","","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            return (cell && cell.getData(EXPANSIONDATA)) || 0;","        },","","        /**","         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.","         *","         * @method setColumnWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {int|String} width new width in pixels or percent. Numbers are treated as pixels","         * @param {int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.","         * @param {boolean} [fireInPercent] Only to be set internally: force the widthChange-event to fire e.newVal in percent","         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set","         * @since 0.1","        */","        setColumnWidth: function (name, width, expansion, fireInPercent) {","            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the","            // width style to the cells directly, allowing padding and borders to","            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all","            // make the rendered width equal the col's style width, reducing the","            // cells' calculated width.","            var instance = this,","                colIndex = Lang.isNumber(name) ? name : instance._getColIndexFromName(name),","                prevWidthPx = instance.getColumnWidthPx(colIndex),","                dt = instance.datatable,","                dtContentBox = instance._dtContentBox,","                allColl = instance._dtColNodes,","                col       = allColl && allColl.item(colIndex),","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                scrollY = instance._dtScrollY,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                prevExpansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0,","                busyResize = instance._busyResize,","                dtWidth = parseInt(instance._dtXScroller.getStyle('width'), 10),","                dtWidthDefined = instance._dtWidthDefined,","                dtWidthWithBorder = dtWidthDefined ? (dtWidth + DATATABLE_BORDERWIDTH) : instance._datatableParentNode.get('offsetWidth'),","                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,","                colConfig = dt.getColumn(colIndex),","                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                prevWidthPercented = (prevWidthPercent.length>0),","                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),","                busyDistributeRemainingSpace = instance._busyDistributeRemainingSpace,","                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,","                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,","                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;","","            expansion = expansion || 0;","            width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);","            widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);","            widthTypeChange = (newWidthPercented!==prevWidthPercented);","            expansionChange = (expansion!==prevExpansion);","            badColWidth = instance._badColWidth;","","            if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)","                && (width>=instance.get('minColWidth'))) {","","                getCellStyle = function (element, prop, nonComputed) {","                    return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);","                };","","                setColWidth = function (element, newColWidth) {","                    var corrected = 0,","                        cell;","                    if (badColWidth) {","                        cell = dt.getCell([0, colIndex]);","                        if (cell) {","                            corrected =  getCellStyle(cell, 'paddingLeft') +","                                         getCellStyle(cell, 'paddingRight') +","                                         getCellStyle(cell, 'borderLeftWidth') +","                                         getCellStyle(cell, 'borderRightWidth');","                        }","                    }","                    newColWidth -= corrected;","                    element.setStyle('width', newColWidth + 'px');","                };","","                setCellWidth = function(cellwidth, withExpansion) {","                    var prevExpansion;","                    // only when we are sure we manually set the width, then mark the thNode's widthPercented","                    if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                        if (newWidthPercented) {","                            // store the percented width and continue calculating with the width in pixels","                            thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');","                            cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);","                        }","                        else {","                            thcell.setData(PERCENTEDWIDTHDATA, null);","                        }","                    }","                    if (withExpansion) {","                        cellwidth += expansion;","                        prevExpansion = thcell.getData(EXPANSIONDATA) || 0;","                        thcell.setData(EXPANSIONDATA, expansion);","                        instance._distributedSpace += expansion - prevExpansion;","                        // only when we are sure we manually set the width, then mark the thNode as DATAYES","                        if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);","                        }","                    }","                    if (colConfig) {","                        colConfig.width = cellwidth+'px';","","                    }","                    setColWidth(col, cellwidth);","                };","","                if (!busyResize) {","                    // store previous value, because it will be event-fired","                    // do not use variable prevWidthPercent, for this one doesn't have expansion included","                    eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;","                }","","                // now, also for scrollheaders - if they are available","                if (scrollY) {","                    tableToBackup = yScrollerContainer;","                }","                else {","                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,","                    // the realDataTable-width will change to 100% when a user is resorting.","                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.","                    tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;","                }","","                bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);","","                lastIndex = allColl ? (allColl.size()-1) : 0;","                if (lastIndex>0) {","                    // do not perform this workarround when you have only 1 column","                    noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);","                    bkpColWidth = getCellStyle(noWidthCol, 'width', true);","                    noWidthCol.setStyle('width', '');","                }","                else {","                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,","                    // but to 1px (safari ans chrome would otherwise fail)","                    resetContainer = yScrollerContainer || realDataTable;","                    resetContainer.setStyle('width', '1px');","                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation","                    // if realDataTable has a width other than 1px","                    if (scrollY) {","                        realDataTable.setStyle('width', '1px');","                    }","                }","                ","                // next setCellWidth can handle both with in pixels as well as in percent","                setCellWidth(width, true);","                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.","                ","                widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;","","                width = instance.getColumnWidthPx(colIndex);","                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)","                // So, we need to redefine it again to both the col, as the colconfig.width","                if (widthPxAttempt!==width) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transform it again","                    setCellWidth((newWidthPercented ? (100*width/dtWidthWithBorder).toFixed(2) : width), false);","                }","","                if (lastIndex>0) {","                    if (bkpColWidth>0) {","                        noWidthCol.setStyle('width', bkpColWidth+'px');","                    }","                }","                else {","                    resetContainer.setStyle('width', dtWidth+'px');","                    if (scrollY) {","                        realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');","                    }","                }","                newWidth = bkpDatatableWidth + width - prevWidthPx;","                ","                // was there any change anyway? Then reset the tableUI","                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable","                if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {","                    if (scrollY) {","                        // now set the innerwidth of the div inside scrollable TH","                        scrollThDiv = instance._dtScrollLiners.item(colIndex);","                        scrollTh = scrollThDiv.get('parentNode');","                        corrected =  badColWidth ? width : (width -","                                                            getCellStyle(scrollThDiv, 'paddingLeft') -","                                                            getCellStyle(scrollThDiv, 'paddingRight') -","                                                            getCellStyle(scrollTh, 'borderLeftWidth') -","                                                            getCellStyle(scrollTh, 'borderRightWidth'));","                        setColWidth(scrollThDiv, corrected);","                        if (!busyDistributeRemainingSpace && !busyTransformAllColumnWidthToPixels) {","                            if (dtWidthDefined) {","                                yScrollerContainer.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                            else {","                                instance._syncYScrollerUI(newWidth);","                            }","","                        }","                    }","                    else {","                        if (!busyDistributeRemainingSpace && !busyTransformAllColumnWidthToPixels) {","                            realDataTable.setStyle('width', newWidth+'px');","                            if (!dtWidthDefined) {","                                // don't reset the datatable width during resize: this would take too much performance.","                                // Instead, during resize, we will reset the dt-width after resize:end","                                instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);","                                instance._dtXScroller.setStyle('width', (newWidth)+'px');","                                instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');","                            }","                            else {","                                realDataTable.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                        }","                    }","                }","                else if (lastIndex===0) {","                    // no widthchange, but we need to reset the width on the resetcontainer","                    resetContainer.setStyle('width', prevWidthPx+'px');","                }","                // to return the with in percent (when needed), transform width","                if (newWidthPercented) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transfprm it again","                    width = (100*width/dtWidthWithBorder).toFixed(2) + '%';","                }","                if (!busyResize || busyDistributeRemainingSpace) {","                    /**","                     * In case of a resized column, colWidthChange will be fired by the host-datatable during resizing","                     * When pixels are set: a number is returned, in case of percented value: a String (ending with %)","                     * @event colWidthChange","                     * @param {EventFacade} e Event object","                     * @param {Int} e.colIndex","                     * @param {Int|String} e.prevVal","                     * @param {Int|String} e.newVal","                    */","                    // CAUTIOUS: if (fireInPercent && !newWidthPercented), then width is still in pixels, but we need percents to be fired!","                    dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue,","                             newVal: (fireInPercent && !newWidthPercented) ? (100*width/dtWidthWithBorder).toFixed(2)+'%' : width});","                }","","            }","            else {","                width = prevWidthPercent || prevWidthPx;","            }","            return width;","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this,","                dt = instance.datatable,","                dtHandles = dt._eventHandles,","                sortable = dt.get('sortable');","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance._clearResizeEventhandlers();","            instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);","            // we need to attach the original resize-event again.","            if (!dt._scrollResizeHandle) {","                dt._scrollResizeHandle = Y.on('resize',","                    Y.rbind(dt._syncScrollUI, dt)","                );","            }","            // In case of sortable datatable: we need to attach the original event again.","            if (Lang.isBoolean(sortable) && sortable) {","                dtHandles.sortUITrigger = dt.delegate(['click','keydown'],","                    Y.rbind('_onUITriggerSort', dt),","                    '.' + dt.getClassName('sortable', 'column')","                );","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Calls _initUI but only after checking -and modifying- the x-scroller.","         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.","         *","         * @method _render","         * @private","         * @since 0.1","         *","        */","        _render: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                xScrollableTable = scrollAttrs && (scrollAttrs.indexOf('x')>-1);","","            if (!xScrollableTable) {","                // always activate the xScroller --> this way we can controll the colwidths in a decent matter","                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes","                // the d-width to a defined value, the x-scroller is ready to be used imediately","                Y.use(","                    'datatable-scroll',","                    Y.bind(","                        function(Y) {","                            dt.set('scrollable', (scrollAttrs && (scrollAttrs.indexOf('y')>-1)) ? 'xy' : 'x');","                            this._initUI();","                        },","                        instance","                    )","                );","            }","            else {","                instance._initUI();","            }","        },","","        /**","         * Does the initialisation of the UI in a way that we can use predictable colwidths.","         * Will call _bindUI() afterwards.","         *","         * @method _initUI","         * @private","         * @since 0.1","         *","        */","        _initUI : function() {","            var instance = this,","                dt = instance.datatable,","                dtWidth = dt.get('width');","","            if (dtWidth==='') {","                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt","                // The final tablewidth will be set after resizing","                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                instance._dtWidthDefined = false;","                instance._setDTWidthFromInternal(1);","            }","            else {","                instance._dtWidthDefined = true;","                instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');","            }","            instance._initPrivateVars();","            instance._justifyTableWidth();","            instance._bindUI();","        },","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                dt = instance.datatable,","                eventhandlers = instance._eventhandlers,","                sortable = dt.get('sortable'),","                currentSortEventHandler;","","            instance._activateColResizer({newVal: dt.get('colsresizable')});","","            // Justify the tablewidth again after one of these changes:","            eventhandlers.push(","                dt.after(","                    'colsresizableChange',","                    instance._activateColResizer,","                    instance","                )","            );","","            // Justify the tablewidth again after one of these changes:","            // CAUTION: as soon as row-update or cell-update comes available in datatable, dataChange might not be fired!","            // We need to bind that new event also (at that time)","            eventhandlers.push(","                dt.after(","                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],","                    instance._syncTableUI,","                    instance","                )","            );","","            // Justify the tablewidth again after render view or when there is a columnChange","            eventhandlers.push(","                dt.after(","                    'widthChange',","                    instance._justifyTableAfterTableWidthChange,","                    instance","                )","            );","","            // In case there are images in the data that get loaded, the cell will expand after rendering","            // So we need to catch those events and resync if they occur","            eventhandlers.push(","                dt.delegate(","                    'load',","                    Y.rbind(instance._syncTableUI, instance),","                    'img'","                )","            );","","            // Detach the _scrollResizeHandle that was made by datatable-scroll, and redefine it with _syncScrollUIPercentedDT","            if (dt._scrollResizeHandle) {","                dt._scrollResizeHandle.detach();","                dt._scrollResizeHandle = null;","            }","","            dt._scrollResizeHandle = Y.on(","                'resize',","                Y.rbind(instance._syncScrollUIPercentedDT, instance)","            );","","            if (Lang.isBoolean(sortable) && sortable) {","                // first detach current handler","                currentSortEventHandler = dt._eventHandles.sortUITrigger;","                if (currentSortEventHandler) {","                    currentSortEventHandler.detach();","                    currentSortEventHandler = null;","                }","                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area","                if (dt._theadNode) {","                    eventhandlers.push(","                        dt.delegate(","                            'keydown',","                            Y.rbind(instance._triggerSort, instance),","                            '.' + dt.getClassName('sortable', 'column')","                        )","                    );","                    eventhandlers.push(","                        dt.delegate(","                            'click',","                            Y.rbind(instance._triggerSort, instance),","                            function() {","                                return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));","                            }","                        )","                    );","                }","            }","        },","","        /**","         * Syncs the DataTable's user interface, used internally","         * If the user should ever update cellcontent without without using set('data') or set('columns'),","         * then this method should be excecuted to make the UI fit again!","         *","         * @method _syncTableUI","         * @private","         * @since 0.1","         *","        */","        _syncTableUI : function() {","            var instance = this;","","            if (!instance._widthChangeInternally) {","                instance._widthChangeInternally = true;","                instance._justifyTableWidth();","            }","            instance._widthChangeInternally = false;","        },","","        /**","         * Binds events which make resizing of the columns posible, or deactivate","         *","         * @method _activateColResizer","         * @private","         * @param {e} eventFacade","         * @since 0.1","        */","        _activateColResizer : function(e) {","            var instance = this,","                colsresizable = e.newVal,","                resizeEventhandlers = instance._resizeEventhandlers,","                colsresizableDefined = Lang.isBoolean(colsresizable),","                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;","","            if (colsresizableDefined && !colsresizable) {","                instance._clearResizeEventhandlers();","            }","            else {","                instance._allColsResizable = colsresizableDefined && colsresizable;","                // when the mouse moves, while not resizing, you might be entering the area where resizing may start","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousemove', 'touchstart'],","                        instance._checkResizeAprovement,","                        'th',","                        instance","                    )","                );","","                // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","                // In those cases this._resizeApproved needs to be set false","                resizeEventhandlers.push(","                    workingHeader.on(","                        'mouseleave',","                        instance._checkEndResizeApprovement,","                        instance","                    )","                );","","                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousedown', 'touchstart'],","                        instance._startResize,","                        'th',","                        instance","                    )","                );","","                // stop resizing when the mouse comes up","                // also stop resizing when the mouse leaves the body (while still might be in down state)","                resizeEventhandlers.push(","                    instance._bodyNode.on(","                        ['mouseup', 'mouseleave', 'touchend'],","                        instance._stopResize,","                        instance","                    )","                );","            }","        },","","        /**","         * Syncs the UI of datatables whose width is in percents. It overrules datatable._syncScrollUI.","         *","         * @method _syncScrollUIPercentedDT","         * @private","         * @since 0.1","         *","        */","        _syncScrollUIPercentedDT: function() {","            var instance = this,","                dt = instance.datatable;","","            // will always be during rendering dt, so we need to suppress first call","            if (instance._resizeEventMayOccur && instance._dtWidthIsPercented) {","                // Actually we SHOULD call this method ALSO when datatable has no width specified,","                // and when there are percented cols available --> they need new width.","                // However, calling dt._syncScrollUI, or dt.set('width') will lead to hanging the","                // resize-event --> for 1 time everything is excecuted, but the resizeevent never fires again !!!!","                Y.rbind(dt._syncScrollUI, dt)();","                instance._syncTableUI();","            }","            else {","                instance._resizeEventMayOccur = true;","            }","        },","","        /**","         * Does the actual sort of columns - if sortable<br>","         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values.","         * In order to prevent resetting the width of the table during sorting","         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value).","         * We don't want to keep that large width, because that would","         * lead to a screen x-sroller on the page.","         *","         * @method _triggerSort","         * @private","         * @protected","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _triggerSort: function(e) {","            var instance = this,","                dt = instance.datatable,","                contentBox = instance._dtContentBox,","                yScrollerContainer = instance._dtYScrollerContainer,","                realDataTable = instance._dtRealDataTable,","                scrollHeaders, resizableThNodes, prevYScrollerContainerWidth, prevRealDataTableWidth;","","            if (instance._dtScrollY) {","                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount","                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort","                // YScrollerContainer and realDataTable get wrong values. We need to restore that.","                // Also: YScroller WILL REMOVE RESIZABLE_COLUMN_CLASS of ALL th-nodes, so we need to add that again!","                prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);","                prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);","                resizableThNodes = [];","                scrollHeaders = instance._dtScrollHeader.all('th');","                scrollHeaders.each(","                    function(thNode, index) {","                        if (thNode.hasClass(RESIZABLE_COLUMN_CLASS)) {","                            resizableThNodes.push(index);","                        }","                    }","                );","                Y.bind('_onUITriggerSort', dt, e)();","                YArray.each(","                    resizableThNodes,","                    function(item) {","                        scrollHeaders.item(item).addClass(RESIZABLE_COLUMN_CLASS);","                    }","                );","                yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');","                realDataTable.setStyle('width', prevRealDataTableWidth+'px');","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","            else  {","                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area","                contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');","                Y.bind('_onUITriggerSort', dt, e)();","                // clear width contentbox to prevent big page x-scroller","                contentBox.setStyle('width', '');","            }","        },","","        /**","         * Will be executed at the start of a resizeaction<br>","         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.","         *","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _startResize: function(e) {","            var instance = this, dt,","                yScrollerContainer = instance._dtYScrollerContainer,","                resizeMargin, resizeMarginHalf, th, lastTh, allTh,","                mouseX, thWidth, thX, mouseInLeftNode, leftColIndex;","","            if (instance._resizeApproved) {","                instance._busyResize = true;","                instance._comingFromResize = true;","                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeColumn,","                    instance","                );","                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.","                // we need to know this, because the column-resize handlers overlap 2 th-nodes.","                dt = instance.datatable;","                resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');","                resizeMarginHalf = Math.round(resizeMargin/2);","                th = e.currentTarget;","                lastTh = (th.next('th')===null);","                mouseX = e.pageX;","                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);","                thX = th.getX();","                mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));","                if (mouseInLeftNode) {","                    instance._leftThNode = th;","                    instance._leftThX = thX;","                    instance._mouseOffset = thX+thWidth-mouseX;","                }","                else {","                    instance._leftThNode = th.previous('th');","                    instance._leftThX = instance._leftThNode.getX();","                    instance._mouseOffset = thX-mouseX;","                }","                allTh = th.get('parentNode').all('th');","                instance._leftColIndex = leftColIndex = allTh.indexOf(instance._leftThNode);","                instance._initialColWidth = instance.columnWidthIsPercent(leftColIndex) ? instance.getColumnWidthPercent(leftColIndex)","                                            : instance.getColumnWidthPx(leftColIndex);","                instance._changeUnselectableIE(true);","            }","        },","","        /**","         * Will be executed at the end of a resizeaction<br>","         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.","         * Fires the event colWidthChange","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @param {Array} e.prevVal","         * contains objects with fields: colindex and width","         * @param {Array} e.newVal","         * contains objects with fields: colindex, width and changed","         * @since 0.1","         *","        */","        _stopResize: function(e) {","            var instance = this,","                dt = instance.datatable,","                leftColIndex = instance._leftColIndex,","                dtWidthWithBorder, finalColWidth;","","            if (instance._busyResize) {","                // resizing will be ending. Fire event.","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);","                instance._busyResize = false;","                instance._changeUnselectableIE(false);","                instance._checkResizeAprovement(e);","                // Don't know why, but we need to e.halt in order to fire a new event.","                e.halt();","                if (instance._initialColWidth !== finalColWidth) {","                    // to return the with in percent (when needed), transform width","                    if (instance.columnWidthIsPercent(leftColIndex)) {","                        dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                            : instance._datatableParentNode.get('offsetWidth');","                        finalColWidth = (100*finalColWidth/dtWidthWithBorder).toFixed(2) + '%';","                    }","                    dt.fire('colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});","                    /**","                     * In case of a resized column, endresize:colWidthChange will be fired by the host-datatable after resizing","                     * This event will occur parallel to the colWidthChange-event which also occurs. You can listen for either of these.","                     * The difference between these events is that a datatable.setColumnWidth fires only the colWidthChange-event.","                     * When pixels are set: a number is returned, in case of percented value: a String (ending with %)","                     * @event resize:colWidthChange","                     * @param {EventFacade} e Event object","                     * @param {Int} e.colIndex","                     * @param {Int|String} e.prevVal","                     * @param {Int|String} e.newVal","                    */","                    dt.fire('endresize:colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});","                }","                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value","                Y.later(","                    200,","                    instance,","                    function() {","                        instance._comingFromResize = false;","                    }","                );","","            }","        },","","        /**","         * Checks whether the nouse is in a position that start-resizing is possible. If so, then the cursor will change to col-resize<br>","         *","         * @method _checkResizeAprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _checkResizeAprovement: function(e) {","            if (!this._busyResize) {","                var instance = this,","                    dt = instance.datatable,","                    boundingBox = dt.get('boundingBox'),","                    th = e.currentTarget,","                    lastTh = (th.next('th')===null),","                    thX = th.getX(),","                    mouseX = e.pageX,","                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    resizeMarginHalf = Math.round(resizeMargin/2),","                    fromLeft, fromRight, insideLeftArea, insideRightArea, leftSideFirstTh;","","                fromLeft = mouseX-thX;","                fromRight = thX+thWidth-mouseX;","                insideLeftArea = (fromLeft<resizeMarginHalf);","                insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));","                leftSideFirstTh = insideLeftArea && (th.previous('th')===null);","                instance._resizeApproved = ((insideLeftArea || insideRightArea)","                    && !leftSideFirstTh","                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))","                );","                boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);","            }","        },","","        /**","         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>","         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.","         * Fires the event resize:colWidthChange","         *","         * @method _resizeColumn","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _resizeColumn: function(e) {","            if (this._busyResize) {","                // preventDefault, because in case of touch-event, the screen would have been moved.","                e.preventDefault();","                var instance = this,","                    leftColIndex = instance._leftColIndex,","                    lastColIndex = instance._lastColIndex,","                    prevWidth = instance.getColumnWidthPx(leftColIndex),","                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),","                    distributedSpace = instance._distributedSpace,","                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;","                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:","                if (leftColIndex===lastColIndex) {","                    compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                    widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);","                    widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);","                    noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)","                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);","                }","                if (!noaction) {","                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.","                    // This would be the case if compairContainer.width>xScroller.width","                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width","                    // corrected by instance._distributedSpace","                    // This could happen when the mouse moves very quick to the left","                    if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {","                        setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));","                    }","                    if (instance.columnWidthIsPercent(leftColIndex)) {","                        // set the new size in percent and NOT in pixels","                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels","                        dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                            : instance._datatableParentNode.get('offsetWidth');","                        setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';","                        prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';","                    }","                    newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);","                    if (prevWidth!==newWidth) {","                        instance.datatable.fire('resize:colWidthChange', {colIndex: leftColIndex, prevVal: prevWidth, newVal: newWidth});","                    }","                }","                else {","                }","            }","        },","","        /**","         * Determines whether a resize-state should be ended.","         * This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead","         *","         * @method _checkEndResizeApprovement","         * @private","         * @since 0.1","         *","        */","        _checkEndResizeApprovement: function() {","            var instance = this;","","            if (instance._resizeApproved && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Will togle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _endResizeApprovement: function() {","            var instance = this;","","            instance._resizeApproved = false;","            instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);","        },","","","        /**","         * Defines some private datatable-variables","         * Use the method to prevent this from happening","         *","         * @method _initPrivateVars","         * @private","         * @since 0.1","         *","        */","        _initPrivateVars: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;","","            instance._bodyNode = Y.one('body');","            instance._dtBoundingBox = dt.get('boundingBox');","            instance._datatableParentNode = instance._dtBoundingBox.get('parentNode');","            instance._dtContentBox = contentBox = dt.get('contentBox');","            instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));","            instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));","            instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));","            instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));","            instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));","            instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));","            instance._dtRealDataTableTHNodes = allThRealHeader.all('th');","            colgroupNode = contentBox.one('colgroup');","            instance._dtColNodes = colgroupNode && colgroupNode.all('col');","            instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));","            instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));","            instance._dtScrollY = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);","        },","","","        /**","         * Justifies the tablewidth: will be called after datatable.changeWidth-event.","         *","         * @method _justifyTableAfterTableWidthChange","         * @private","         * @since 0.1","         *","        */","        _justifyTableAfterTableWidthChange : function() {","            var instance = this,","                dt = instance.datatable,","                dtWidth;","","            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes","            if (!instance._busyResize) {","                dtWidth = dt.get('width');","                if (dtWidth==='') {","                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to","                    // expansion of the dt","                    // The final tablewidth will be set after resizing","                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                    instance._dtWidthDefined = false;","                    instance._setDTWidthFromInternal(1);","                }","                else {","                    instance._dtWidthDefined = true;","                    instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');","                }","                instance._syncTableUI();","            }","        },","","        /**","         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.","         * Use the method to prevent this from happening","         *","         * @method _justifyTableWidth","         * @private","         * @since 0.1","         *","        */","        _justifyTableWidth: function() {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                yScrollBar = instance._dtYScrollBar,","                xScroller = instance._dtXScroller,","                scrollY = instance._dtScrollY,","                dtScrollHeader = instance._dtScrollHeader,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                dtWidthDefined = instance._dtWidthDefined,","                scrollbarOffset = 0,","                scrollTheaders, colObject, lastColIndex, totalWidth;","","            if (!dtWidthDefined) {","                xScroller.setStyle('overflowX', 'hidden');","            }","","            instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;","","            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths","            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)","            realDataTable.setStyle('width', '1px');","            if (scrollY) {","                yScrollerContainer.setStyle('width', '1px');","            }","","            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion","            totalWidth = instance._transformAllColumnWidthToPixels();","            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels","            // but just in case there are roundingerrors we set it exactly to 0","            if (instance._distributedSpace>0) {","                instance._distributedSpace = 0;","            }","","            if (scrollY) {","                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.","                // We need to capture this behaviour when we want to repositions the y-scrollbar","                scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');","                instance._scrollbarOffset = scrollbarOffset = (","                    scrollTheaders","                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)","                ) || 0;","                totalWidth += scrollbarOffset;","                // in this stage, we need to set the width of yScrollerContainer","                yScrollerContainer.setStyle('width', totalWidth + 'px');","            }","","            // in this stage, we need to set the width of realDataTable","            realDataTable.setStyle('width', totalWidth + 'px');","            totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));","","            if (scrollY) {","                dtScrollHeader.all('th').each(","                    function(th, index) {","                        // add the resizeclass to the th-elements of the scrollable header","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)","                yScrollBar.setStyle('width', '16px');","                instance._syncYScrollerUI(totalWidth);","            }","            else {","                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable","                allThRealHeader.each(","                    function(th, index) {","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                if (!dtWidthDefined) {","                    instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);","                }","                else {","                    instance._checkRemainingColSpace();","                }","            }","        },","","        /**","         * Because we cannot use unpredictable columnwidth, all columns must have a defined width.","         *","         * @method _transformAllColumnWidthToPixels","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _transformAllColumnWidthToPixels: function() {","            var instance = this,","                dt = instance.datatable,","                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                    : instance._datatableParentNode.get('offsetWidth'),","                notSpecCols = instance._notSpecCols,","                usedSpace = 0,","                remainingSpace = 0,","                allThRealHeader = instance._dtRealDataTableTHNodes, fireInPercent,","                width, configWidth, colConfigObject, percentWidth, total, thcell,","                storedPercentedWidth, expansion, definedColWidth, percentedIsStored;","            ","            // prevent expanding last cell at this stage:","            instance._busyTransformAllColumnWidthToPixels = true;","            // empty current definition of notspeccols:","            notSpecCols.length = 0;","            ","            allThRealHeader.each(","                function(th, index) {","                    colConfigObject = dt.getColumn(index);","                    configWidth = colConfigObject && colConfigObject.width;","                    percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');","                    thcell = allThRealHeader && allThRealHeader.item(index);","                    expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;","                    storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","                    percentedIsStored = (storedPercentedWidth.length>0);","                    definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","                    if (definedColWidth===DATAYES) {","                        if (percentWidth || percentedIsStored) {","                            // transform to pixels. BUT also need to store that the column was in percent!","                            if (percentedIsStored) {","                                // retake the percents instead of the set pixels","                                configWidth = storedPercentedWidth;","                            }","                            if (thcell) {","                                thcell.setData(PERCENTEDWIDTHDATA, configWidth);","                            }","                            configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';","                            fireInPercent = true;","                        }","                        else {","                            fireInPercent = false;","                            if (thcell) {","                                // reset","                                thcell.setData(PERCENTEDWIDTHDATA, null);","                            }","                        }","                    }","                    if (configWidth && (definedColWidth===DATAYES)) {","                        // width is defined in objectconfig","                        width = parseInt(configWidth, 10) - expansion;","                        usedSpace += instance.setColumnWidth(index, width, 0, fireInPercent);","                    }","                    else {","                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards","                        notSpecCols.push(index);","                        if (thcell) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                        }","                    }","                }","            );","            if (notSpecCols.length>0) {","                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width","                remainingSpace = 0;","                YArray.each(","                    notSpecCols,","                    function(colIndex) {","                        remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));","                    }","                );","            }","            total = usedSpace + remainingSpace;","            instance._busyTransformAllColumnWidthToPixels = false;","            return total;","        },","","        /**","         * In case of IE: Change text-unselectable of the cols","         *","         * @method _changeUnselectableIE","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _changeUnselectableIE : function(noSelect) {","            var instance = this,","                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,","                headerList = headers && headers.all('th'),","                unselectableBkpList = instance._unselectableBkpList,","                bkpMade;","","            if (Y.UA.ie>0) {","                bkpMade = (unselectableBkpList.length>0);","                headerList.each(","                    function(th, index) {","                        if (noSelect && !bkpMade) {","                            instance._unselectableBkpList.push(th.get('unselectable') || '');","                        }","                        th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));","                    },","                    instance","                );","            }","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _checkRemainingColSpace","         * @param {Int} [yScrollerWidth] width of the previous YScrollerContainer","         * @private","         * @since 0.1","         *","        */","        _checkRemainingColSpace: function(yScrollerWidth) {","            var instance = this,","                xScroller = instance._dtXScroller,","                prevDistributedSpace = instance._distributedSpace,","                widthViewport = parseInt(xScroller.getStyle('width'), 10),","                distributeSpace, compairContainer, widthCompairContainer;","","            if (instance._dtWidthDefined) {","                instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth","                compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);","                distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;","                xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');","                distributeSpace = Math.max(0, distributeSpace);","                compairContainer.setStyle('width', widthViewport+'px');","                instance._distributeRemainingSpace(distributeSpace);","                instance._busyDistributeRemainingSpace = false;","                widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;","                if (instance._dtScrollY) {","                    instance._syncYScrollerUI(widthCompairContainer, true);","                }","                else {","                    instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');","                }","                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):","                instance._distributedSpace = distributeSpace;","            }","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _distributeRemainingSpace","         * @param {Int} amount number of pixels that have to be distributed","         * @private","         * @since 0.1","         *","        */","        _distributeRemainingSpace : function(amount) {","            var instance = this,","                notSpecCols = instance._notSpecCols,","                notSpecColSize = notSpecCols.length,","                correction, lastColCorrection;","","            // instance._distributedSpace will be filled during resizing cols","            if (notSpecColSize>0) {","                // remaining space needs to be added to the undefined colls","                correction = Math.round(amount/notSpecColSize);","                // due to roundingdifferences, not all space might be added. Therefore we need an extra check","                lastColCorrection = correction + amount - (correction*notSpecColSize);","                YArray.each(","                    notSpecCols,","                    function(colIndex, item) {","                        var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;","                        instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);","                    }","                );","            }","            else {","                instance._expandLastCell(amount);","            }","        },","","        /**","         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area:","         * the last cell will be expanded so that the complete datatable fits within the scrollable area","         *","         * @method _expandLastCell","         * @private","         * @since 0.1","         *","        */","        _expandLastCell: function(expand) {","            var instance = this,","                lastColIndex = instance._lastColIndex;","","            instance.setColumnWidth(lastColIndex, instance.getColumnWidthPx(lastColIndex, true), expand);","        },","","        /**","         * Syncs the YScroller-UI after a column changes its width.","         * @method _syncYScrollerUI","         * @private","         * @param {int} tableWidth width of the datatable visible area, without outside datatable-borders","         * @param {boolean} [comesFromCheckRemainingColSpace] internally used to mark when function is called from this._checkRemainingColSpace","         * @since 0.1","        */","        _syncYScrollerUI : function(tableWidth, comesFromCheckRemainingColSpace) {","            // always scrollabeY when called","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                prevWidthYScrollerContainer, xScrollerWidth;","","            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true","            if (!instance._busyDistributeRemainingSpace) {","                if (instance._dtWidthDefined) {","                    // dt has width either in percent or pixels","                    // never sync to values below xScroller-width","                    xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);","                    tableWidth = Math.max(tableWidth, xScrollerWidth);","                    realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');","                }","                else {","                    instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);","                    instance._dtXScroller.setStyle('width', tableWidth+'px');","                    instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');","                }","                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                // now resizing","                prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);","                yScrollerContainer.setStyle('width', tableWidth+'px');","                // Also reset scroller-y for this has a width of 1px","                instance._dtYScroller.setStyle('width', tableWidth+'px');","                // prevent looping by checking comesFromSetVisibilityXScroller","                if (!comesFromCheckRemainingColSpace) {","                    instance._checkRemainingColSpace(prevWidthYScrollerContainer);","                }","                if (!instance._dtWidthDefined) {","                    Y.rbind(dt._syncScrollUI, dt)();","                }","                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","        },","","        /**","         * @method _getThCel","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @private","         * @return {Node} TH-node of the real datatable","         * @since 0.1","        */","        _getThCel: function(name) {","            var instance = this,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                colIndex;","","            if (!Lang.isNumber(name)) {","                colIndex = instance._getColIndexFromName(name);","            }","            return allThRealHeader && allThRealHeader.item(colIndex || name);","        },","","        /**","         * @method _getColIndexFromName","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @private","         * @return {int} col-index of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        _getColIndexFromName: function(name) {","            var instance = this,","                dt, colConfigObject, columns, colIndex;","","            if (typeof name === 'string') {","                dt = instance.datatable;","                colConfigObject = dt.getColumn(name);","                columns = dt.get('columns');","                colIndex = YArray.indexOf(columns, colConfigObject);","            }","            return colIndex || -1;","        },","","        /**","         * Sets the DT width, but only from calls within this module","         * It will prevent coming into a loop when datatable-Changewidth event occurs and it leaves this._dtWidthDefined to false","         * Should only be called when datatable has _dtWidthDefined set to false","         *","         * @method _setDTWidthFromInternal","         * @param {Number} newWidth new datatable width in pixels","         * @private","         * @protected","         * @since 0.1","        */","        _setDTWidthFromInternal : function(newWidth) {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                prevWidthRealDataTable;","","            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()","            // we don't need to restore this width anyway at that point.","            if (!instance._dtWidthDefined) {","                prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);","                instance._widthChangeInternally = true;","                dt.set('width', newWidth+'px');","                instance._widthChangeInternally = false;","                // now set instance._dtWidthDefined to false again, because it was false and is set to true!","                instance._dtWidthDefined = false;","                // always reset the realdatatable, because it wis resetted by dt.set(width)","                if (realDataTable) {","                    realDataTable.setStyle('width', Math.max(prevWidthRealDataTable, parseInt(instance._dtXScroller.getStyle('width'), 10))+'px');","                }","            }","            else {","            }","        },","","        /**","         * Cleaning up all resizeeventlisteners","         *","         * @method _clearResizeEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearResizeEventhandlers : function() {","            YArray.each(","                this._resizeEventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsadtcr',","        ATTRS : {","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 10","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 14,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 20","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Minamal colwidth that a column can reach by resizing<br>","             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>","             * minimum value = 0","             * @default 0","             * @attribute minColWidth","             * @type int","             * @since 0.1","            */","            minColWidth: {","                value: 0,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"plugin\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-resize\",","        \"event-touch\",","        \"datatable-column-widths\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].lines = {"1":0,"3":0,"297":0,"308":0,"355":0,"357":0,"358":0,"359":0,"360":0,"363":0,"376":0,"379":0,"380":0,"381":0,"382":0,"395":0,"398":0,"399":0,"400":0,"401":0,"416":0,"419":0,"420":0,"421":0,"422":0,"423":0,"424":0,"436":0,"439":0,"449":0,"453":0,"463":0,"466":0,"476":0,"486":0,"504":0,"512":0,"514":0,"516":0,"517":0,"519":0,"520":0,"522":0,"524":0,"525":0,"527":0,"545":0,"550":0,"561":0,"565":0,"566":0,"568":0,"569":0,"571":0,"591":0,"618":0,"619":0,"620":0,"621":0,"622":0,"623":0,"625":0,"628":0,"629":0,"632":0,"633":0,"635":0,"636":0,"637":0,"638":0,"644":0,"645":0,"648":0,"649":0,"651":0,"652":0,"654":0,"655":0,"658":0,"661":0,"662":0,"663":0,"664":0,"665":0,"667":0,"668":0,"671":0,"672":0,"675":0,"678":0,"681":0,"685":0,"686":0,"692":0,"695":0,"697":0,"698":0,"700":0,"701":0,"702":0,"707":0,"708":0,"711":0,"712":0,"717":0,"720":0,"722":0,"725":0,"728":0,"731":0,"732":0,"733":0,"737":0,"738":0,"739":0,"742":0,"746":0,"747":0,"749":0,"750":0,"751":0,"756":0,"757":0,"758":0,"759":0,"760":0,"763":0,"769":0,"770":0,"771":0,"774":0,"775":0,"776":0,"779":0,"780":0,"785":0,"787":0,"790":0,"793":0,"795":0,"806":0,"812":0,"814":0,"824":0,"829":0,"830":0,"832":0,"833":0,"834":0,"836":0,"837":0,"842":0,"843":0,"864":0,"869":0,"873":0,"877":0,"878":0,"885":0,"899":0,"903":0,"908":0,"909":0,"912":0,"913":0,"915":0,"916":0,"917":0,"928":0,"934":0,"937":0,"948":0,"957":0,"967":0,"976":0,"977":0,"978":0,"981":0,"986":0,"988":0,"989":0,"990":0,"991":0,"994":0,"995":0,"1002":0,"1007":0,"1026":0,"1028":0,"1029":0,"1030":0,"1032":0,"1044":0,"1050":0,"1051":0,"1054":0,"1056":0,"1067":0,"1076":0,"1087":0,"1106":0,"1110":0,"1115":0,"1116":0,"1119":0,"1139":0,"1146":0,"1151":0,"1152":0,"1153":0,"1154":0,"1155":0,"1157":0,"1158":0,"1162":0,"1163":0,"1166":0,"1169":0,"1170":0,"1171":0,"1175":0,"1176":0,"1178":0,"1193":0,"1198":0,"1199":0,"1200":0,"1202":0,"1209":0,"1210":0,"1211":0,"1212":0,"1213":0,"1214":0,"1216":0,"1217":0,"1218":0,"1219":0,"1220":0,"1221":0,"1222":0,"1225":0,"1226":0,"1227":0,"1229":0,"1230":0,"1231":0,"1233":0,"1252":0,"1257":0,"1259":0,"1260":0,"1262":0,"1263":0,"1264":0,"1265":0,"1267":0,"1268":0,"1270":0,"1271":0,"1273":0,"1275":0,"1287":0,"1290":0,"1294":0,"1311":0,"1312":0,"1325":0,"1326":0,"1327":0,"1328":0,"1329":0,"1330":0,"1334":0,"1350":0,"1352":0,"1353":0,"1361":0,"1362":0,"1363":0,"1364":0,"1365":0,"1368":0,"1374":0,"1375":0,"1377":0,"1380":0,"1382":0,"1383":0,"1385":0,"1386":0,"1387":0,"1405":0,"1407":0,"1408":0,"1422":0,"1424":0,"1425":0,"1439":0,"1444":0,"1445":0,"1446":0,"1447":0,"1448":0,"1449":0,"1450":0,"1451":0,"1452":0,"1453":0,"1454":0,"1455":0,"1456":0,"1457":0,"1458":0,"1459":0,"1472":0,"1477":0,"1478":0,"1479":0,"1485":0,"1486":0,"1489":0,"1490":0,"1492":0,"1506":0,"1519":0,"1520":0,"1523":0,"1527":0,"1528":0,"1529":0,"1533":0,"1536":0,"1537":0,"1540":0,"1543":0,"1544":0,"1548":0,"1550":0,"1554":0,"1555":0,"1557":0,"1558":0,"1561":0,"1562":0,"1566":0,"1567":0,"1571":0,"1573":0,"1574":0,"1577":0,"1578":0,"1581":0,"1596":0,"1608":0,"1610":0,"1612":0,"1614":0,"1615":0,"1616":0,"1617":0,"1618":0,"1619":0,"1620":0,"1621":0,"1622":0,"1623":0,"1625":0,"1627":0,"1629":0,"1630":0,"1632":0,"1633":0,"1636":0,"1637":0,"1639":0,"1643":0,"1645":0,"1646":0,"1650":0,"1651":0,"1652":0,"1657":0,"1659":0,"1660":0,"1663":0,"1667":0,"1668":0,"1669":0,"1682":0,"1688":0,"1689":0,"1690":0,"1692":0,"1693":0,"1695":0,"1712":0,"1718":0,"1719":0,"1720":0,"1721":0,"1722":0,"1723":0,"1724":0,"1725":0,"1726":0,"1727":0,"1728":0,"1729":0,"1730":0,"1733":0,"1736":0,"1750":0,"1756":0,"1758":0,"1760":0,"1761":0,"1764":0,"1765":0,"1770":0,"1784":0,"1787":0,"1800":0,"1807":0,"1808":0,"1811":0,"1812":0,"1813":0,"1816":0,"1817":0,"1818":0,"1822":0,"1823":0,"1825":0,"1827":0,"1828":0,"1830":0,"1831":0,"1834":0,"1846":0,"1850":0,"1851":0,"1853":0,"1864":0,"1867":0,"1868":0,"1869":0,"1870":0,"1871":0,"1873":0,"1888":0,"1895":0,"1896":0,"1897":0,"1898":0,"1899":0,"1901":0,"1903":0,"1904":0,"1920":0,"1923":0,"1937":0,"1940":0,"1964":0,"1983":0,"1999":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].functions = {"initializer:354":0,"transformToPercent:375":0,"transformToPixels:394":0,"transformToUndefinedWidth:415":0,"columnWidthIsPercent:435":0,"columnWidthIsPixels:448":0,"columnWidthIsUndefined:462":0,"getColumnConfigWidth:475":0,"getColumnWidthPx:503":0,"getColumnWidthPercent:544":0,"getColumnExpansion:560":0,"getCellStyle:628":0,"setColWidth:632":0,"setCellWidth:648":0,"setColumnWidth:585":0,"destructor:823":0,"(anonymous 2):876":0,"_render:863":0,"_initUI:898":0,"(anonymous 3):1006":0,"_bindUI:927":0,"_syncTableUI:1025":0,"_activateColResizer:1043":0,"_syncScrollUIPercentedDT:1105":0,"(anonymous 4):1156":0,"(anonymous 5):1165":0,"_triggerSort:1138":0,"_startResize:1192":0,"(anonymous 6):1293":0,"_stopResize:1251":0,"_checkResizeAprovement:1310":0,"_resizeColumn:1349":0,"_checkEndResizeApprovement:1404":0,"_endResizeApprovement:1421":0,"_initPrivateVars:1438":0,"_justifyTableAfterTableWidthChange:1471":0,"(anonymous 7):1559":0,"(anonymous 8):1572":0,"_justifyTableWidth:1505":0,"(anonymous 9):1613":0,"(anonymous 10):1662":0,"_transformAllColumnWidthToPixels:1595":0,"(anonymous 11):1691":0,"_changeUnselectableIE:1681":0,"_checkRemainingColSpace:1711":0,"(anonymous 12):1763":0,"_distributeRemainingSpace:1749":0,"_expandLastCell:1783":0,"_syncYScrollerUI:1798":0,"_getThCel:1845":0,"_getColIndexFromName:1863":0,"_setDTWidthFromInternal:1887":0,"(anonymous 13):1922":0,"_clearResizeEventhandlers:1919":0,"(anonymous 14):1939":0,"_clearEventhandlers:1936":0,"validator:1963":0,"validator:1982":0,"validator:1998":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredLines = 466;
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredFunctions = 60;
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1);
YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 3);
'use strict';

/**
 * DataTable ColumnResize Plugin
 *
 *
 * If you want to make the columns resizable, than you just define the datatable-attribute 'colsresizable' like:
 *
 * myDatatable.set('colsresizable', true);
 *
 * This can be done at initialisation of the datatable, before Y.Plugin.ITSADTColumnResize is plugged in, or later on.
 * The attribute 'colsresizable' can have three states:
 *
 * <ul>
 * <li>true --> all columns are resizable</li>
 * <li>false --> colresizing is disabled</li>
 * <li>null/undefined --> colresizing is active where only columns(objects) that have the property 'resizable' will be resizable</li>
 * </ul>
 *
 * If myDatatable.get('colsresizable') is undefined or null, then only columns with colConfig.resizable=true are resizable.
 *
 *
 * @module gallery-itsadtcolumnresize
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
 * Internal list that holds resize-event-references
 * @property _resizeEventhandlers
 * @private
 * @type Array
 */

/**
 * Internal flag that states if datatable.get('colsresizable')===true
 * @property _allColsResizable
 * @private
 * @type Boolean
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
 * Node-reference to datatable's <col> elemets within <colgroup>
 * @property _dtColNodes
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
 * Node-reference to datatable's parentNode
 * @property _datatableParentNode
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
 * Node-reference to datatable's .yui3-datatable-scrollbar
 * @property _dtYScrollBar
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
 * Node-reference to datatable's .yui3-datatable-scroll-columns
 * @property _dtScrollHeader
 * @type Y.Node
 * @private
 */

/**
 * NodeList-reference to all datatable's .yui3-datatable-scroll-liner
 * @property _dtScrollLiner
 * @type Y.Node
 * @private
 */

/**
 * Flag that tells whether DataTable is y-scrollable
 * @property _dtScrollY
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
 * Internal flag that tells whether distributeRemainingSpace is going on. In such situations,
 * we don't need (and want) to call this._checkRemainingColSpace() because we could get into a loop
 * @property _busyDistributeRemainingSpace
 * @private
 * @type boolean
 */

/**
 * Internal flag that tells whether transformAllColumnWidthToPixels is going on. In such situations,
 * we don't need (and want) to call this._checkRemainingColSpace()
 * @property _busyTransformAllColumnWidthToPixels
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
 * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that
 * the total tablewidth needed to increase by enlargin the last col.
 * @property _distributedSpace
 * @private
 * @type int
 */

/**
 * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing
 * @property _unselectableBkpList
 * @private
 * @type Array
 */

/**
 * Holds the configindexes of the colls that have no width specified. Used internally to distribute the remaining space after a colwidthchange
 * @property _notSpecCols
 * @private
 * @type int[]
 */

/**
 * Internal flag that tells whether the datatable has its width-attribute defined
 * @property _dtWidthDefined
 * @private
 * @type boolean
 */

/**
 * Internal flag that tells whether the datatable has its width-attribute in percent
 * @property _dtWidthIsPercented
 * @private
 * @type boolean
 */

/**
 * Internal flag that tells whether datatable.widthChange is called from intern.
 * To prevent event to call this._justifyTableWidth() in those cases.
 * @property _widthChangeInternally
 * @private
 * @type boolean
 */




_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 297);
var Lang = Y.Lang,
    YArray = Y.Array,
    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',
    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',
    PERCENTEDWIDTHDATA = 'itsa_width_percented',
    EXPANSIONDATA = 'itsa_expansion',
    DEFINEDCOLWIDTHDATA = 'itsa_defined_col_width_data',
    DATAYES = 'yes',
    DATANO = 'no',
    DATATABLE_BORDERWIDTH = 2;

_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 308);
Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {

        _eventhandlers : [],
        _resizeEventhandlers : [],
        _allColsResizable : null,
        datatable : null,
        _badColWidth : null,
        _dtWidthDefined : null,
        _dtWidthIsPercented : null,
        _dtColNodes : null,
        _datatableParentNode : null,
        _dtBoundingBox : null,
        _dtContentBox : null,
        _dtXScroller : null,
        _dtYScroller : null,
        _dtYScrollBar : null,
        _dtYScrollerContainer : null,
        _dtRealDataTableHeader : null,
        _dtScrollHeader : null,
        _dtScrollLiners : null,
        _dtScrollY : null,
        _resizeApproved: false,
        _busyResize : false,
        _leftThNode : null,
        _leftThX : null,
        _mouseOffset : null,
        _leftColIndex : null,
        _lastColIndex : null,
        _initialColWidth : null,
        _busyDistributeRemainingSpace : null,
        _busyTransformAllColumnWidthToPixels : null,
        _scrollbarOffset : 0,
        _bodyNode : null,
        _comingFromResize : null,
        _widthChangeInternally : null,
        _unselectableBkpList : [],
        _distributedSpace : 0,
        _notSpecCols : [],

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "initializer", 354);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 355);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 357);
instance.datatable = instance.get('host');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 358);
instance._badColWidth = Y.Features.test('table', 'badColWidth');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 359);
if (instance.datatable.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 360);
instance._render();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 363);
instance.afterHostEvent('render', instance._render, instance);
            }
        },

        /**
         * Transforms the columnwidth to percent.
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToPercent
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToPercent: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPercent", 375);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 376);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 379);
if (!instance.columnWidthIsPercent(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 380);
newValue = instance.getColumnWidthPercent(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 381);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 382);
instance.setColumnWidth(name, newValue, expansion);
            }
        },

        /**
         * Transforms the columnwidth to pixels.
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToPixels: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPixels", 394);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 395);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 398);
if (!instance.columnWidthIsPixels(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 399);
newValue = instance.getColumnWidthPx(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 400);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 401);
instance.setColumnWidth(name, newValue, expansion);
            }
        },

        /**
         * Transforms the columnwidth to undefined. Doesn't change the occupied colspace, but an undefined width will lead to
         * adding expansion when other cols get width-changes. Can only be done if the DataTable has a defined width (either in pixels or percent),
         * otherwise, the columnwidth-type will remain.
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToUndefinedWidth
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToUndefinedWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToUndefinedWidth", 415);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 416);
var instance = this,
                thcell, newValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 419);
if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 420);
newValue = instance.getColumnWidthPx(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 421);
instance.setColumnWidth(name, newValue);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 422);
thcell = this._getThCel(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 423);
if (thcell) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 424);
thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);
                }
            }
        },

        /**
         * @method columnWidthIsPercent
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is set in percent. Returns false if in pixels or undefined
         * @since 0.1
        */
        columnWidthIsPercent: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPercent", 435);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 436);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 439);
return (storedPercentedWidth.length>0);
        },

        /**
         * @method columnWidthIsPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined
         * @since 0.1
        */
        columnWidthIsPixels: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPixels", 448);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 449);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 453);
return definedColWidth && (storedPercentedWidth.length===0);
        },

        /**
         * @method columnWidthIsUndefined
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is undefined
         * @since 0.1
        */
        columnWidthIsUndefined: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsUndefined", 462);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 463);
var thcell = this._getThCel(name),
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 466);
return !definedColWidth;
        },

        /**
         * @method getColumnConfigWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null
         * @since 0.1
        */
        getColumnConfigWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnConfigWidth", 475);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 476);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                columns = dt.get('columns'),
                colIndex = YArray.indexOf(columns, colConfigObject),
                allThRealHeader = instance._dtRealDataTableTHNodes,
                thcell = allThRealHeader && allThRealHeader.item(colIndex),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 486);
return (colConfigObject && ((storedPercentedWidth.length>0) ? storedPercentedWidth : colConfigObject.width)) || null;
        },

        /**
         * Retreives the true col-width in pixels, exact as is occupied on the screen.<br>
         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this
         * expansion, you can set withoutExpansion=true.
         * @method getColumnWidthPx
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>
         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>
         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>
         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower
         * for exampele when other column is set wider and no expansion is required.
         * @return {int} columnwidth in pixels
         * @since 0.1
        */
        getColumnWidthPx: function(name, withoutExpansion) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPx", 503);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 504);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                allThHeader = instance._dtRealDataTableTHNodes,
                expansion = 0,
                colwidth = 0,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 512);
if (colConfigObject && colConfigObject.width) {
                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 514);
colwidth = parseInt(colConfigObject.width, 10) || 0;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 516);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 517);
cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 519);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 520);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 522);
expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;
            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 524);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 525);
colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 527);
return colwidth - expansion;
        },

        /**
         * Retreives the true col-width in percent (in comparison to the DataTable-width) exact as is occupied on the screen.<br>
         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this
         * expansion, you can set withoutExpansion=true.
         * @method getColumnWidthPercent
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>
         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>
         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>
         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower
         * for exampele when other column is set wider and no expansion is required.
         * @return {String} columnwidth in percent
         * @since 0.1
        */
        getColumnWidthPercent: function(name, withoutExpansion) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPercent", 544);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 545);
var instance = this,
                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH)
                                    : instance._datatableParentNode.get('offsetWidth'),
                width = instance.getColumnWidthPx(name, withoutExpansion);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 550);
return (100*width/dtWidthWithBorder).toFixed(2) + '%';
        },

        /**
         * Retreives the expansion of the column in pixels. Some cols might have been expanded to fit a fixed DataTable-width.
         * @method getColumnExpansion
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @return {int} expansion in pixels
         * @since 0.1
        */
        getColumnExpansion: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnExpansion", 560);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 561);
var instance = this,
                allThHeader = instance._dtRealDataTableTHNodes,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 565);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 566);
cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 568);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 569);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 571);
return (cell && cell.getData(EXPANSIONDATA)) || 0;
        },

        /**
         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.
         *
         * @method setColumnWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @param {int|String} width new width in pixels or percent. Numbers are treated as pixels
         * @param {int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.
         * @param {boolean} [fireInPercent] Only to be set internally: force the widthChange-event to fire e.newVal in percent
         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set
         * @since 0.1
        */
        setColumnWidth: function (name, width, expansion, fireInPercent) {
            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the
            // width style to the cells directly, allowing padding and borders to
            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all
            // make the rendered width equal the col's style width, reducing the
            // cells' calculated width.
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColumnWidth", 585);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 591);
var instance = this,
                colIndex = Lang.isNumber(name) ? name : instance._getColIndexFromName(name),
                prevWidthPx = instance.getColumnWidthPx(colIndex),
                dt = instance.datatable,
                dtContentBox = instance._dtContentBox,
                allColl = instance._dtColNodes,
                col       = allColl && allColl.item(colIndex),
                realDataTable = instance._dtRealDataTable,
                yScrollerContainer = instance._dtYScrollerContainer,
                scrollY = instance._dtScrollY,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                thcell = allThRealHeader && allThRealHeader.item(colIndex),
                prevExpansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0,
                busyResize = instance._busyResize,
                dtWidth = parseInt(instance._dtXScroller.getStyle('width'), 10),
                dtWidthDefined = instance._dtWidthDefined,
                dtWidthWithBorder = dtWidthDefined ? (dtWidth + DATATABLE_BORDERWIDTH) : instance._datatableParentNode.get('offsetWidth'),
                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,
                colConfig = dt.getColumn(colIndex),
                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                prevWidthPercented = (prevWidthPercent.length>0),
                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),
                busyDistributeRemainingSpace = instance._busyDistributeRemainingSpace,
                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,
                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,
                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 618);
expansion = expansion || 0;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 619);
width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 620);
widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 621);
widthTypeChange = (newWidthPercented!==prevWidthPercented);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 622);
expansionChange = (expansion!==prevExpansion);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 623);
badColWidth = instance._badColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 625);
if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)
                && (width>=instance.get('minColWidth'))) {

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 628);
getCellStyle = function (element, prop, nonComputed) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getCellStyle", 628);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 629);
return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 632);
setColWidth = function (element, newColWidth) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColWidth", 632);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 633);
var corrected = 0,
                        cell;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 635);
if (badColWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 636);
cell = dt.getCell([0, colIndex]);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 637);
if (cell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 638);
corrected =  getCellStyle(cell, 'paddingLeft') +
                                         getCellStyle(cell, 'paddingRight') +
                                         getCellStyle(cell, 'borderLeftWidth') +
                                         getCellStyle(cell, 'borderRightWidth');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 644);
newColWidth -= corrected;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 645);
element.setStyle('width', newColWidth + 'px');
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 648);
setCellWidth = function(cellwidth, withExpansion) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setCellWidth", 648);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 649);
var prevExpansion;
                    // only when we are sure we manually set the width, then mark the thNode's widthPercented
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 651);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 652);
if (newWidthPercented) {
                            // store the percented width and continue calculating with the width in pixels
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 654);
thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 655);
cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 658);
thcell.setData(PERCENTEDWIDTHDATA, null);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 661);
if (withExpansion) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 662);
cellwidth += expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 663);
prevExpansion = thcell.getData(EXPANSIONDATA) || 0;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 664);
thcell.setData(EXPANSIONDATA, expansion);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 665);
instance._distributedSpace += expansion - prevExpansion;
                        // only when we are sure we manually set the width, then mark the thNode as DATAYES
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 667);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 668);
thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 671);
if (colConfig) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 672);
colConfig.width = cellwidth+'px';

                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 675);
setColWidth(col, cellwidth);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 678);
if (!busyResize) {
                    // store previous value, because it will be event-fired
                    // do not use variable prevWidthPercent, for this one doesn't have expansion included
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 681);
eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;
                }

                // now, also for scrollheaders - if they are available
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 685);
if (scrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 686);
tableToBackup = yScrollerContainer;
                }
                else {
                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,
                    // the realDataTable-width will change to 100% when a user is resorting.
                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 692);
tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 695);
bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 697);
lastIndex = allColl ? (allColl.size()-1) : 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 698);
if (lastIndex>0) {
                    // do not perform this workarround when you have only 1 column
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 700);
noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 701);
bkpColWidth = getCellStyle(noWidthCol, 'width', true);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 702);
noWidthCol.setStyle('width', '');
                }
                else {
                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,
                    // but to 1px (safari ans chrome would otherwise fail)
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 707);
resetContainer = yScrollerContainer || realDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 708);
resetContainer.setStyle('width', '1px');
                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation
                    // if realDataTable has a width other than 1px
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 711);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 712);
realDataTable.setStyle('width', '1px');
                    }
                }
                
                // next setCellWidth can handle both with in pixels as well as in percent
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 717);
setCellWidth(width, true);
                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.
                
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 720);
widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 722);
width = instance.getColumnWidthPx(colIndex);
                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)
                // So, we need to redefine it again to both the col, as the colconfig.width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 725);
if (widthPxAttempt!==width) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transform it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 728);
setCellWidth((newWidthPercented ? (100*width/dtWidthWithBorder).toFixed(2) : width), false);
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 731);
if (lastIndex>0) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 732);
if (bkpColWidth>0) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 733);
noWidthCol.setStyle('width', bkpColWidth+'px');
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 737);
resetContainer.setStyle('width', dtWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 738);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 739);
realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');
                    }
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 742);
newWidth = bkpDatatableWidth + width - prevWidthPx;
                
                // was there any change anyway? Then reset the tableUI
                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 746);
if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 747);
if (scrollY) {
                        // now set the innerwidth of the div inside scrollable TH
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 749);
scrollThDiv = instance._dtScrollLiners.item(colIndex);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 750);
scrollTh = scrollThDiv.get('parentNode');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 751);
corrected =  badColWidth ? width : (width -
                                                            getCellStyle(scrollThDiv, 'paddingLeft') -
                                                            getCellStyle(scrollThDiv, 'paddingRight') -
                                                            getCellStyle(scrollTh, 'borderLeftWidth') -
                                                            getCellStyle(scrollTh, 'borderRightWidth'));
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 756);
setColWidth(scrollThDiv, corrected);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 757);
if (!busyDistributeRemainingSpace && !busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 758);
if (dtWidthDefined) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 759);
yScrollerContainer.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 760);
instance._checkRemainingColSpace();
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 763);
instance._syncYScrollerUI(newWidth);
                            }

                        }
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 769);
if (!busyDistributeRemainingSpace && !busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 770);
realDataTable.setStyle('width', newWidth+'px');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 771);
if (!dtWidthDefined) {
                                // don't reset the datatable width during resize: this would take too much performance.
                                // Instead, during resize, we will reset the dt-width after resize:end
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 774);
instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 775);
instance._dtXScroller.setStyle('width', (newWidth)+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 776);
instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 779);
realDataTable.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 780);
instance._checkRemainingColSpace();
                            }
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 785);
if (lastIndex===0) {
                    // no widthchange, but we need to reset the width on the resetcontainer
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 787);
resetContainer.setStyle('width', prevWidthPx+'px');
                }}
                // to return the with in percent (when needed), transform width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 790);
if (newWidthPercented) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transfprm it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 793);
width = (100*width/dtWidthWithBorder).toFixed(2) + '%';
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 795);
if (!busyResize || busyDistributeRemainingSpace) {
                    /**
                     * In case of a resized column, colWidthChange will be fired by the host-datatable during resizing
                     * When pixels are set: a number is returned, in case of percented value: a String (ending with %)
                     * @event colWidthChange
                     * @param {EventFacade} e Event object
                     * @param {Int} e.colIndex
                     * @param {Int|String} e.prevVal
                     * @param {Int|String} e.newVal
                    */
                    // CAUTIOUS: if (fireInPercent && !newWidthPercented), then width is still in pixels, but we need percents to be fired!
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 806);
dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue,
                             newVal: (fireInPercent && !newWidthPercented) ? (100*width/dtWidthWithBorder).toFixed(2)+'%' : width});
                }

            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 812);
width = prevWidthPercent || prevWidthPx;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 814);
return width;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "destructor", 823);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 824);
var instance = this,
                dt = instance.datatable,
                dtHandles = dt._eventHandles,
                sortable = dt.get('sortable');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 829);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 830);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 832);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 833);
instance._clearResizeEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 834);
instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);
            // we need to attach the original resize-event again.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 836);
if (!dt._scrollResizeHandle) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 837);
dt._scrollResizeHandle = Y.on('resize',
                    Y.rbind(dt._syncScrollUI, dt)
                );
            }
            // In case of sortable datatable: we need to attach the original event again.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 842);
if (Lang.isBoolean(sortable) && sortable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 843);
dtHandles.sortUITrigger = dt.delegate(['click','keydown'],
                    Y.rbind('_onUITriggerSort', dt),
                    '.' + dt.getClassName('sortable', 'column')
                );
            }
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Calls _initUI but only after checking -and modifying- the x-scroller.
         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.
         *
         * @method _render
         * @private
         * @since 0.1
         *
        */
        _render: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_render", 863);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 864);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                xScrollableTable = scrollAttrs && (scrollAttrs.indexOf('x')>-1);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 869);
if (!xScrollableTable) {
                // always activate the xScroller --> this way we can controll the colwidths in a decent matter
                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes
                // the d-width to a defined value, the x-scroller is ready to be used imediately
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 873);
Y.use(
                    'datatable-scroll',
                    Y.bind(
                        function(Y) {
                            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 2)", 876);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 877);
dt.set('scrollable', (scrollAttrs && (scrollAttrs.indexOf('y')>-1)) ? 'xy' : 'x');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 878);
this._initUI();
                        },
                        instance
                    )
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 885);
instance._initUI();
            }
        },

        /**
         * Does the initialisation of the UI in a way that we can use predictable colwidths.
         * Will call _bindUI() afterwards.
         *
         * @method _initUI
         * @private
         * @since 0.1
         *
        */
        _initUI : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initUI", 898);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 899);
var instance = this,
                dt = instance.datatable,
                dtWidth = dt.get('width');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 903);
if (dtWidth==='') {
                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt
                // The final tablewidth will be set after resizing
                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 908);
instance._dtWidthDefined = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 909);
instance._setDTWidthFromInternal(1);
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 912);
instance._dtWidthDefined = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 913);
instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 915);
instance._initPrivateVars();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 916);
instance._justifyTableWidth();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 917);
instance._bindUI();
        },

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_bindUI", 927);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 928);
var instance = this,
                dt = instance.datatable,
                eventhandlers = instance._eventhandlers,
                sortable = dt.get('sortable'),
                currentSortEventHandler;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 934);
instance._activateColResizer({newVal: dt.get('colsresizable')});

            // Justify the tablewidth again after one of these changes:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 937);
eventhandlers.push(
                dt.after(
                    'colsresizableChange',
                    instance._activateColResizer,
                    instance
                )
            );

            // Justify the tablewidth again after one of these changes:
            // CAUTION: as soon as row-update or cell-update comes available in datatable, dataChange might not be fired!
            // We need to bind that new event also (at that time)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 948);
eventhandlers.push(
                dt.after(
                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],
                    instance._syncTableUI,
                    instance
                )
            );

            // Justify the tablewidth again after render view or when there is a columnChange
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 957);
eventhandlers.push(
                dt.after(
                    'widthChange',
                    instance._justifyTableAfterTableWidthChange,
                    instance
                )
            );

            // In case there are images in the data that get loaded, the cell will expand after rendering
            // So we need to catch those events and resync if they occur
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 967);
eventhandlers.push(
                dt.delegate(
                    'load',
                    Y.rbind(instance._syncTableUI, instance),
                    'img'
                )
            );

            // Detach the _scrollResizeHandle that was made by datatable-scroll, and redefine it with _syncScrollUIPercentedDT
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 976);
if (dt._scrollResizeHandle) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 977);
dt._scrollResizeHandle.detach();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 978);
dt._scrollResizeHandle = null;
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 981);
dt._scrollResizeHandle = Y.on(
                'resize',
                Y.rbind(instance._syncScrollUIPercentedDT, instance)
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 986);
if (Lang.isBoolean(sortable) && sortable) {
                // first detach current handler
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 988);
currentSortEventHandler = dt._eventHandles.sortUITrigger;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 989);
if (currentSortEventHandler) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 990);
currentSortEventHandler.detach();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 991);
currentSortEventHandler = null;
                }
                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 994);
if (dt._theadNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 995);
eventhandlers.push(
                        dt.delegate(
                            'keydown',
                            Y.rbind(instance._triggerSort, instance),
                            '.' + dt.getClassName('sortable', 'column')
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1002);
eventhandlers.push(
                        dt.delegate(
                            'click',
                            Y.rbind(instance._triggerSort, instance),
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 3)", 1006);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1007);
return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));
                            }
                        )
                    );
                }
            }
        },

        /**
         * Syncs the DataTable's user interface, used internally
         * If the user should ever update cellcontent without without using set('data') or set('columns'),
         * then this method should be excecuted to make the UI fit again!
         *
         * @method _syncTableUI
         * @private
         * @since 0.1
         *
        */
        _syncTableUI : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncTableUI", 1025);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1026);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1028);
if (!instance._widthChangeInternally) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1029);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1030);
instance._justifyTableWidth();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1032);
instance._widthChangeInternally = false;
        },

        /**
         * Binds events which make resizing of the columns posible, or deactivate
         *
         * @method _activateColResizer
         * @private
         * @param {e} eventFacade
         * @since 0.1
        */
        _activateColResizer : function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_activateColResizer", 1043);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1044);
var instance = this,
                colsresizable = e.newVal,
                resizeEventhandlers = instance._resizeEventhandlers,
                colsresizableDefined = Lang.isBoolean(colsresizable),
                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1050);
if (colsresizableDefined && !colsresizable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1051);
instance._clearResizeEventhandlers();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1054);
instance._allColsResizable = colsresizableDefined && colsresizable;
                // when the mouse moves, while not resizing, you might be entering the area where resizing may start
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1056);
resizeEventhandlers.push(
                    workingHeader.delegate(
                        ['mousemove', 'touchstart'],
                        instance._checkResizeAprovement,
                        'th',
                        instance
                    )
                );

                // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
                // In those cases this._resizeApproved needs to be set false
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1067);
resizeEventhandlers.push(
                    workingHeader.on(
                        'mouseleave',
                        instance._checkEndResizeApprovement,
                        instance
                    )
                );

                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1076);
resizeEventhandlers.push(
                    workingHeader.delegate(
                        ['mousedown', 'touchstart'],
                        instance._startResize,
                        'th',
                        instance
                    )
                );

                // stop resizing when the mouse comes up
                // also stop resizing when the mouse leaves the body (while still might be in down state)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1087);
resizeEventhandlers.push(
                    instance._bodyNode.on(
                        ['mouseup', 'mouseleave', 'touchend'],
                        instance._stopResize,
                        instance
                    )
                );
            }
        },

        /**
         * Syncs the UI of datatables whose width is in percents. It overrules datatable._syncScrollUI.
         *
         * @method _syncScrollUIPercentedDT
         * @private
         * @since 0.1
         *
        */
        _syncScrollUIPercentedDT: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncScrollUIPercentedDT", 1105);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1106);
var instance = this,
                dt = instance.datatable;

            // will always be during rendering dt, so we need to suppress first call
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1110);
if (instance._resizeEventMayOccur && instance._dtWidthIsPercented) {
                // Actually we SHOULD call this method ALSO when datatable has no width specified,
                // and when there are percented cols available --> they need new width.
                // However, calling dt._syncScrollUI, or dt.set('width') will lead to hanging the
                // resize-event --> for 1 time everything is excecuted, but the resizeevent never fires again !!!!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1115);
Y.rbind(dt._syncScrollUI, dt)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1116);
instance._syncTableUI();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1119);
instance._resizeEventMayOccur = true;
            }
        },

        /**
         * Does the actual sort of columns - if sortable<br>
         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values.
         * In order to prevent resetting the width of the table during sorting
         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value).
         * We don't want to keep that large width, because that would
         * lead to a screen x-sroller on the page.
         *
         * @method _triggerSort
         * @private
         * @protected
         * @param {e} eventFacade
         * @since 0.1
         *
        */
        _triggerSort: function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_triggerSort", 1138);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1139);
var instance = this,
                dt = instance.datatable,
                contentBox = instance._dtContentBox,
                yScrollerContainer = instance._dtYScrollerContainer,
                realDataTable = instance._dtRealDataTable,
                scrollHeaders, resizableThNodes, prevYScrollerContainerWidth, prevRealDataTableWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1146);
if (instance._dtScrollY) {
                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount
                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort
                // YScrollerContainer and realDataTable get wrong values. We need to restore that.
                // Also: YScroller WILL REMOVE RESIZABLE_COLUMN_CLASS of ALL th-nodes, so we need to add that again!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1151);
prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1152);
prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1153);
resizableThNodes = [];
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1154);
scrollHeaders = instance._dtScrollHeader.all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1155);
scrollHeaders.each(
                    function(thNode, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 4)", 1156);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1157);
if (thNode.hasClass(RESIZABLE_COLUMN_CLASS)) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1158);
resizableThNodes.push(index);
                        }
                    }
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1162);
Y.bind('_onUITriggerSort', dt, e)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1163);
YArray.each(
                    resizableThNodes,
                    function(item) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 5)", 1165);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1166);
scrollHeaders.item(item).addClass(RESIZABLE_COLUMN_CLASS);
                    }
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1169);
yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1170);
realDataTable.setStyle('width', prevRealDataTableWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1171);
instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');
            }
            else  {
                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1175);
contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1176);
Y.bind('_onUITriggerSort', dt, e)();
                // clear width contentbox to prevent big page x-scroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1178);
contentBox.setStyle('width', '');
            }
        },

        /**
         * Will be executed at the start of a resizeaction<br>
         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.
         *
         * @method _startResize
         * @private
         * @param {e} eventFacade
         * @since 0.1
         *
        */
        _startResize: function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_startResize", 1192);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1193);
var instance = this, dt,
                yScrollerContainer = instance._dtYScrollerContainer,
                resizeMargin, resizeMarginHalf, th, lastTh, allTh,
                mouseX, thWidth, thX, mouseInLeftNode, leftColIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1198);
if (instance._resizeApproved) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1199);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1200);
instance._comingFromResize = true;
                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1202);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumn,
                    instance
                );
                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.
                // we need to know this, because the column-resize handlers overlap 2 th-nodes.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1209);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1210);
resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1211);
resizeMarginHalf = Math.round(resizeMargin/2);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1212);
th = e.currentTarget;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1213);
lastTh = (th.next('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1214);
mouseX = e.pageX;
                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1216);
thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1217);
thX = th.getX();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1218);
mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1219);
if (mouseInLeftNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1220);
instance._leftThNode = th;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1221);
instance._leftThX = thX;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1222);
instance._mouseOffset = thX+thWidth-mouseX;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1225);
instance._leftThNode = th.previous('th');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1226);
instance._leftThX = instance._leftThNode.getX();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1227);
instance._mouseOffset = thX-mouseX;
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1229);
allTh = th.get('parentNode').all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1230);
instance._leftColIndex = leftColIndex = allTh.indexOf(instance._leftThNode);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1231);
instance._initialColWidth = instance.columnWidthIsPercent(leftColIndex) ? instance.getColumnWidthPercent(leftColIndex)
                                            : instance.getColumnWidthPx(leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1233);
instance._changeUnselectableIE(true);
            }
        },

        /**
         * Will be executed at the end of a resizeaction<br>
         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.
         * Fires the event colWidthChange
         * @method _startResize
         * @private
         * @param {e} eventFacade
         * @param {Array} e.prevVal
         * contains objects with fields: colindex and width
         * @param {Array} e.newVal
         * contains objects with fields: colindex, width and changed
         * @since 0.1
         *
        */
        _stopResize: function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_stopResize", 1251);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1252);
var instance = this,
                dt = instance.datatable,
                leftColIndex = instance._leftColIndex,
                dtWidthWithBorder, finalColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1257);
if (instance._busyResize) {
                // resizing will be ending. Fire event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1259);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1260);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1262);
finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1263);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1264);
instance._changeUnselectableIE(false);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1265);
instance._checkResizeAprovement(e);
                // Don't know why, but we need to e.halt in order to fire a new event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1267);
e.halt();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1268);
if (instance._initialColWidth !== finalColWidth) {
                    // to return the with in percent (when needed), transform width
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1270);
if (instance.columnWidthIsPercent(leftColIndex)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1271);
dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)
                                            : instance._datatableParentNode.get('offsetWidth');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1273);
finalColWidth = (100*finalColWidth/dtWidthWithBorder).toFixed(2) + '%';
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1275);
dt.fire('colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                    /**
                     * In case of a resized column, endresize:colWidthChange will be fired by the host-datatable after resizing
                     * This event will occur parallel to the colWidthChange-event which also occurs. You can listen for either of these.
                     * The difference between these events is that a datatable.setColumnWidth fires only the colWidthChange-event.
                     * When pixels are set: a number is returned, in case of percented value: a String (ending with %)
                     * @event resize:colWidthChange
                     * @param {EventFacade} e Event object
                     * @param {Int} e.colIndex
                     * @param {Int|String} e.prevVal
                     * @param {Int|String} e.newVal
                    */
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1287);
dt.fire('endresize:colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                }
                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1290);
Y.later(
                    200,
                    instance,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 6)", 1293);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1294);
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
         * @since 0.1
         *
        */
        _checkResizeAprovement: function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkResizeAprovement", 1310);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1311);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1312);
var instance = this,
                    dt = instance.datatable,
                    boundingBox = dt.get('boundingBox'),
                    th = e.currentTarget,
                    lastTh = (th.next('th')===null),
                    thX = th.getX(),
                    mouseX = e.pageX,
                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),
                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),
                    resizeMarginHalf = Math.round(resizeMargin/2),
                    fromLeft, fromRight, insideLeftArea, insideRightArea, leftSideFirstTh;

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1325);
fromLeft = mouseX-thX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1326);
fromRight = thX+thWidth-mouseX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1327);
insideLeftArea = (fromLeft<resizeMarginHalf);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1328);
insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1329);
leftSideFirstTh = insideLeftArea && (th.previous('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1330);
instance._resizeApproved = ((insideLeftArea || insideRightArea)
                    && !leftSideFirstTh
                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1334);
boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);
            }
        },

        /**
         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>
         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.
         * Fires the event resize:colWidthChange
         *
         * @method _resizeColumn
         * @private
         * @param {e} eventFacade
         * @since 0.1
         *
        */
        _resizeColumn: function(e) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_resizeColumn", 1349);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1350);
if (this._busyResize) {
                // preventDefault, because in case of touch-event, the screen would have been moved.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1352);
e.preventDefault();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1353);
var instance = this,
                    leftColIndex = instance._leftColIndex,
                    lastColIndex = instance._lastColIndex,
                    prevWidth = instance.getColumnWidthPx(leftColIndex),
                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),
                    distributedSpace = instance._distributedSpace,
                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;
                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1361);
if (leftColIndex===lastColIndex) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1362);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1363);
widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1364);
widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1365);
noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)
                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1368);
if (!noaction) {
                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.
                    // This would be the case if compairContainer.width>xScroller.width
                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width
                    // corrected by instance._distributedSpace
                    // This could happen when the mouse moves very quick to the left
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1374);
if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1375);
setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1377);
if (instance.columnWidthIsPercent(leftColIndex)) {
                        // set the new size in percent and NOT in pixels
                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1380);
dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)
                                            : instance._datatableParentNode.get('offsetWidth');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1382);
setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1383);
prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1385);
newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1386);
if (prevWidth!==newWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1387);
instance.datatable.fire('resize:colWidthChange', {colIndex: leftColIndex, prevVal: prevWidth, newVal: newWidth});
                    }
                }
                else {
                }
            }
        },

        /**
         * Determines whether a resize-state should be ended.
         * This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead
         *
         * @method _checkEndResizeApprovement
         * @private
         * @since 0.1
         *
        */
        _checkEndResizeApprovement: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkEndResizeApprovement", 1404);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1405);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1407);
if (instance._resizeApproved && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1408);
instance._endResizeApprovement();
            }
        },

        /**
         * Will togle-off the cursor col-resize
         *
         * @method _endResizeApprovement
         * @private
         * @param {e} eventFacade
         * @since 0.1
         *
        */
        _endResizeApprovement: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_endResizeApprovement", 1421);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1422);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1424);
instance._resizeApproved = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1425);
instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);
        },


        /**
         * Defines some private datatable-variables
         * Use the method to prevent this from happening
         *
         * @method _initPrivateVars
         * @private
         * @since 0.1
         *
        */
        _initPrivateVars: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initPrivateVars", 1438);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1439);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1444);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1445);
instance._dtBoundingBox = dt.get('boundingBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1446);
instance._datatableParentNode = instance._dtBoundingBox.get('parentNode');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1447);
instance._dtContentBox = contentBox = dt.get('contentBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1448);
instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1449);
instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1450);
instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1451);
instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1452);
instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1453);
instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1454);
instance._dtRealDataTableTHNodes = allThRealHeader.all('th');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1455);
colgroupNode = contentBox.one('colgroup');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1456);
instance._dtColNodes = colgroupNode && colgroupNode.all('col');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1457);
instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1458);
instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1459);
instance._dtScrollY = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);
        },


        /**
         * Justifies the tablewidth: will be called after datatable.changeWidth-event.
         *
         * @method _justifyTableAfterTableWidthChange
         * @private
         * @since 0.1
         *
        */
        _justifyTableAfterTableWidthChange : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableAfterTableWidthChange", 1471);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1472);
var instance = this,
                dt = instance.datatable,
                dtWidth;

            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1477);
if (!instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1478);
dtWidth = dt.get('width');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1479);
if (dtWidth==='') {
                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to
                    // expansion of the dt
                    // The final tablewidth will be set after resizing
                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1485);
instance._dtWidthDefined = false;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1486);
instance._setDTWidthFromInternal(1);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1489);
instance._dtWidthDefined = true;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1490);
instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1492);
instance._syncTableUI();
            }
        },

        /**
         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.
         * Use the method to prevent this from happening
         *
         * @method _justifyTableWidth
         * @private
         * @since 0.1
         *
        */
        _justifyTableWidth: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableWidth", 1505);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1506);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                yScrollerContainer = instance._dtYScrollerContainer,
                yScrollBar = instance._dtYScrollBar,
                xScroller = instance._dtXScroller,
                scrollY = instance._dtScrollY,
                dtScrollHeader = instance._dtScrollHeader,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                dtWidthDefined = instance._dtWidthDefined,
                scrollbarOffset = 0,
                scrollTheaders, colObject, lastColIndex, totalWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1519);
if (!dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1520);
xScroller.setStyle('overflowX', 'hidden');
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1523);
instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;

            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths
            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1527);
realDataTable.setStyle('width', '1px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1528);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1529);
yScrollerContainer.setStyle('width', '1px');
            }

            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1533);
totalWidth = instance._transformAllColumnWidthToPixels();
            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels
            // but just in case there are roundingerrors we set it exactly to 0
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1536);
if (instance._distributedSpace>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1537);
instance._distributedSpace = 0;
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1540);
if (scrollY) {
                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.
                // We need to capture this behaviour when we want to repositions the y-scrollbar
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1543);
scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1544);
instance._scrollbarOffset = scrollbarOffset = (
                    scrollTheaders
                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)
                ) || 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1548);
totalWidth += scrollbarOffset;
                // in this stage, we need to set the width of yScrollerContainer
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1550);
yScrollerContainer.setStyle('width', totalWidth + 'px');
            }

            // in this stage, we need to set the width of realDataTable
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1554);
realDataTable.setStyle('width', totalWidth + 'px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1555);
totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1557);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1558);
dtScrollHeader.all('th').each(
                    function(th, index) {
                        // add the resizeclass to the th-elements of the scrollable header
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 7)", 1559);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1561);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1562);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1566);
yScrollBar.setStyle('width', '16px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1567);
instance._syncYScrollerUI(totalWidth);
            }
            else {
                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1571);
allThRealHeader.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 8)", 1572);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1573);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1574);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1577);
if (!dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1578);
instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1581);
instance._checkRemainingColSpace();
                }
            }
        },

        /**
         * Because we cannot use unpredictable columnwidth, all columns must have a defined width.
         *
         * @method _transformAllColumnWidthToPixels
         * @private
         * @return total width of all cols
         * @since 0.1
         *
        */
        _transformAllColumnWidthToPixels: function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_transformAllColumnWidthToPixels", 1595);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1596);
var instance = this,
                dt = instance.datatable,
                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)
                                    : instance._datatableParentNode.get('offsetWidth'),
                notSpecCols = instance._notSpecCols,
                usedSpace = 0,
                remainingSpace = 0,
                allThRealHeader = instance._dtRealDataTableTHNodes, fireInPercent,
                width, configWidth, colConfigObject, percentWidth, total, thcell,
                storedPercentedWidth, expansion, definedColWidth, percentedIsStored;
            
            // prevent expanding last cell at this stage:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1608);
instance._busyTransformAllColumnWidthToPixels = true;
            // empty current definition of notspeccols:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1610);
notSpecCols.length = 0;
            
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1612);
allThRealHeader.each(
                function(th, index) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 9)", 1613);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1614);
colConfigObject = dt.getColumn(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1615);
configWidth = colConfigObject && colConfigObject.width;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1616);
percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1617);
thcell = allThRealHeader && allThRealHeader.item(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1618);
expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1619);
storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1620);
percentedIsStored = (storedPercentedWidth.length>0);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1621);
definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1622);
if (definedColWidth===DATAYES) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1623);
if (percentWidth || percentedIsStored) {
                            // transform to pixels. BUT also need to store that the column was in percent!
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1625);
if (percentedIsStored) {
                                // retake the percents instead of the set pixels
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1627);
configWidth = storedPercentedWidth;
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1629);
if (thcell) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1630);
thcell.setData(PERCENTEDWIDTHDATA, configWidth);
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1632);
configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1633);
fireInPercent = true;
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1636);
fireInPercent = false;
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1637);
if (thcell) {
                                // reset
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1639);
thcell.setData(PERCENTEDWIDTHDATA, null);
                            }
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1643);
if (configWidth && (definedColWidth===DATAYES)) {
                        // width is defined in objectconfig
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1645);
width = parseInt(configWidth, 10) - expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1646);
usedSpace += instance.setColumnWidth(index, width, 0, fireInPercent);
                    }
                    else {
                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1650);
notSpecCols.push(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1651);
if (thcell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1652);
thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);
                        }
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1657);
if (notSpecCols.length>0) {
                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1659);
remainingSpace = 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1660);
YArray.each(
                    notSpecCols,
                    function(colIndex) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 10)", 1662);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1663);
remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1667);
total = usedSpace + remainingSpace;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1668);
instance._busyTransformAllColumnWidthToPixels = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1669);
return total;
        },

        /**
         * In case of IE: Change text-unselectable of the cols
         *
         * @method _changeUnselectableIE
         * @private
         * @return total width of all cols
         * @since 0.1
         *
        */
        _changeUnselectableIE : function(noSelect) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_changeUnselectableIE", 1681);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1682);
var instance = this,
                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,
                headerList = headers && headers.all('th'),
                unselectableBkpList = instance._unselectableBkpList,
                bkpMade;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1688);
if (Y.UA.ie>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1689);
bkpMade = (unselectableBkpList.length>0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1690);
headerList.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 11)", 1691);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1692);
if (noSelect && !bkpMade) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1693);
instance._unselectableBkpList.push(th.get('unselectable') || '');
                        }
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1695);
th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));
                    },
                    instance
                );
            }
        },

        /**
         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)
         *
         * @method _checkRemainingColSpace
         * @param {Int} [yScrollerWidth] width of the previous YScrollerContainer
         * @private
         * @since 0.1
         *
        */
        _checkRemainingColSpace: function(yScrollerWidth) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkRemainingColSpace", 1711);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1712);
var instance = this,
                xScroller = instance._dtXScroller,
                prevDistributedSpace = instance._distributedSpace,
                widthViewport = parseInt(xScroller.getStyle('width'), 10),
                distributeSpace, compairContainer, widthCompairContainer;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1718);
if (instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1719);
instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1720);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1721);
widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1722);
distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1723);
xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1724);
distributeSpace = Math.max(0, distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1725);
compairContainer.setStyle('width', widthViewport+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1726);
instance._distributeRemainingSpace(distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1727);
instance._busyDistributeRemainingSpace = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1728);
widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1729);
if (instance._dtScrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1730);
instance._syncYScrollerUI(widthCompairContainer, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1733);
instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');
                }
                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1736);
instance._distributedSpace = distributeSpace;
            }
        },

        /**
         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)
         *
         * @method _distributeRemainingSpace
         * @param {Int} amount number of pixels that have to be distributed
         * @private
         * @since 0.1
         *
        */
        _distributeRemainingSpace : function(amount) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_distributeRemainingSpace", 1749);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1750);
var instance = this,
                notSpecCols = instance._notSpecCols,
                notSpecColSize = notSpecCols.length,
                correction, lastColCorrection;

            // instance._distributedSpace will be filled during resizing cols
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1756);
if (notSpecColSize>0) {
                // remaining space needs to be added to the undefined colls
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1758);
correction = Math.round(amount/notSpecColSize);
                // due to roundingdifferences, not all space might be added. Therefore we need an extra check
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1760);
lastColCorrection = correction + amount - (correction*notSpecColSize);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1761);
YArray.each(
                    notSpecCols,
                    function(colIndex, item) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 12)", 1763);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1764);
var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1765);
instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1770);
instance._expandLastCell(amount);
            }
        },

        /**
         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area:
         * the last cell will be expanded so that the complete datatable fits within the scrollable area
         *
         * @method _expandLastCell
         * @private
         * @since 0.1
         *
        */
        _expandLastCell: function(expand) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_expandLastCell", 1783);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1784);
var instance = this,
                lastColIndex = instance._lastColIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1787);
instance.setColumnWidth(lastColIndex, instance.getColumnWidthPx(lastColIndex, true), expand);
        },

        /**
         * Syncs the YScroller-UI after a column changes its width.
         * @method _syncYScrollerUI
         * @private
         * @param {int} tableWidth width of the datatable visible area, without outside datatable-borders
         * @param {boolean} [comesFromCheckRemainingColSpace] internally used to mark when function is called from this._checkRemainingColSpace
         * @since 0.1
        */
        _syncYScrollerUI : function(tableWidth, comesFromCheckRemainingColSpace) {
            // always scrollabeY when called
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncYScrollerUI", 1798);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1800);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                yScrollerContainer = instance._dtYScrollerContainer,
                prevWidthYScrollerContainer, xScrollerWidth;

            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1807);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1808);
if (instance._dtWidthDefined) {
                    // dt has width either in percent or pixels
                    // never sync to values below xScroller-width
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1811);
xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1812);
tableWidth = Math.max(tableWidth, xScrollerWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1813);
realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1816);
instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1817);
instance._dtXScroller.setStyle('width', tableWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1818);
instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');
                }
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                // now resizing
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1822);
prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1823);
yScrollerContainer.setStyle('width', tableWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1825);
instance._dtYScroller.setStyle('width', tableWidth+'px');
                // prevent looping by checking comesFromSetVisibilityXScroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1827);
if (!comesFromCheckRemainingColSpace) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1828);
instance._checkRemainingColSpace(prevWidthYScrollerContainer);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1830);
if (!instance._dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1831);
Y.rbind(dt._syncScrollUI, dt)();
                }
                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1834);
instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');
            }
        },

        /**
         * @method _getThCel
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @private
         * @return {Node} TH-node of the real datatable
         * @since 0.1
        */
        _getThCel: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getThCel", 1845);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1846);
var instance = this,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1850);
if (!Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1851);
colIndex = instance._getColIndexFromName(name);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1853);
return allThRealHeader && allThRealHeader.item(colIndex || name);
        },

        /**
         * @method _getColIndexFromName
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @private
         * @return {int} col-index of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        _getColIndexFromName: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getColIndexFromName", 1863);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1864);
var instance = this,
                dt, colConfigObject, columns, colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1867);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1868);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1869);
colConfigObject = dt.getColumn(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1870);
columns = dt.get('columns');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1871);
colIndex = YArray.indexOf(columns, colConfigObject);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1873);
return colIndex || -1;
        },

        /**
         * Sets the DT width, but only from calls within this module
         * It will prevent coming into a loop when datatable-Changewidth event occurs and it leaves this._dtWidthDefined to false
         * Should only be called when datatable has _dtWidthDefined set to false
         *
         * @method _setDTWidthFromInternal
         * @param {Number} newWidth new datatable width in pixels
         * @private
         * @protected
         * @since 0.1
        */
        _setDTWidthFromInternal : function(newWidth) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_setDTWidthFromInternal", 1887);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1888);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                prevWidthRealDataTable;

            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()
            // we don't need to restore this width anyway at that point.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1895);
if (!instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1896);
prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1897);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1898);
dt.set('width', newWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1899);
instance._widthChangeInternally = false;
                // now set instance._dtWidthDefined to false again, because it was false and is set to true!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1901);
instance._dtWidthDefined = false;
                // always reset the realdatatable, because it wis resetted by dt.set(width)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1903);
if (realDataTable) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1904);
realDataTable.setStyle('width', Math.max(prevWidthRealDataTable, parseInt(instance._dtXScroller.getStyle('width'), 10))+'px');
                }
            }
            else {
            }
        },

        /**
         * Cleaning up all resizeeventlisteners
         *
         * @method _clearResizeEventhandlers
         * @private
         * @since 0.1
         *
        */
        _clearResizeEventhandlers : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearResizeEventhandlers", 1919);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1920);
YArray.each(
                this._resizeEventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 13)", 1922);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1923);
item.detach();
                }
            );
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearEventhandlers", 1936);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1937);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 14)", 1939);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1940);
item.detach();
                }
            );
        }

    }, {
        NS : 'itsadtcr',
        ATTRS : {

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 10
             * @attribute resizeMargin
             * @type int
             * @since 0.1
            */
            resizeMargin: {
                value: 14,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1963);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1964);
return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            /**
             * @description Width of the area where you can resize in touchdevices.<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 20
             * @attribute resizeMarginTouchDevice
             * @type int
             * @since 0.1
            */
            resizeMarginTouchDevice: {
                value: 32,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1982);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1983);
return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            /**
             * @description Minamal colwidth that a column can reach by resizing<br>
             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>
             * minimum value = 0
             * @default 0
             * @attribute minColWidth
             * @type int
             * @since 0.1
            */
            minColWidth: {
                value: 0,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1998);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1999);
return (Y.Lang.isNumber(val) && (val>=0));
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
        "event-touch",
        "datatable-column-widths"
    ],
    "skinnable": true
});
