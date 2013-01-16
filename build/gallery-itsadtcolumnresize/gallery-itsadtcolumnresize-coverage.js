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
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].code=["YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {","","'use strict';","","/**"," * DataTable ColumnResize Plugin"," *"," *"," * @module gallery-itsadtcolumnresize"," * @class Plugin.ITSADTColumnResize"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal list that holds resize-event-references"," * @property _resizeEventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal flag that states if datatable.get('colsresizable')===true"," * @property _allColsResizable"," * @private"," * @type Boolean"," */","","/**"," * plugin's host DataTable"," * @property datatable"," * @type Y.DataTable"," */","","/**"," * Internal flag that tells whether the browsers does a bad colwidth calculation (Opera, IE6, IE7).<br>"," * Determined by featuretest."," * @property _badColWidth"," * @type boolean"," * @private"," */","","/**"," * Node-reference to datatable's <col> elemets within <colgroup>"," * @property _dtColNodes"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-columns"," * @property _dtRealDataTableHeader"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's boundingbox"," * @property _dtBoundingBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's contentbox"," * @property _dtContentBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-x-scroller"," * @property _dtXScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller"," * @property _dtYScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scrollbar"," * @property _dtYScrollBar"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller-container"," * @property _dtYScrollerContainer"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scroll-columns"," * @property _dtScrollHeader"," * @type Y.Node"," * @private"," */","","/**"," * NodeList-reference to all datatable's .yui3-datatable-scroll-liner"," * @property _dtScrollLiner"," * @type Y.Node"," * @private"," */","","/**"," * Flag that tells whether DataTable is y-scrollable"," * @property _dtScrollY"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether resize may start when the mouse gets pressed"," * @property _resizeApproved"," * @private"," * @type Boolean"," */","","/**"," * Flag that tells whether resizing is going on"," * @property _busyResize"," * @private"," * @type Boolean"," */","","/**"," * th-Node on the left side while resizing"," * @property _leftThNode"," * @private"," * @type Y.Node"," */","","/**"," * screens x-pos of the left th-Node while resizing (Y.Node.getX())"," * @property _leftThX"," * @private"," * @type int"," */","","/**"," * Mouse-offset compared to columnborder when starting to resize"," * @property _mouseOffset"," * @private"," * @type int"," */","","/**"," * index of the left th-Node while resizing"," * @property _leftColIndex"," * @private"," * @type int"," */","","/**"," * index of the most right th-Node"," * @property _lastColIndex"," * @private"," * @type int"," */","","/**"," * backup of the th-width before resize starts. This value is passed as prevVal when the event 'colWidthChange' is fired"," * @property _initialColWidth"," * @private"," * @type int"," */","","/**"," * Internal flag that tells whether distributeRemainingSpace is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace() because we could get into a loop"," * @property _busyDistributeRemainingSpace"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether transformAllColumnWidthToPixels is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace()"," * @property _busyTransformAllColumnWidthToPixels"," * @private"," * @type boolean"," */","","/**"," * horizontal offset of the y-scrollbar (in case of y-scrollable datatable)"," * @property _scrollbarOffset"," * @private"," * @type int"," */","","/**"," * Reference to Y.one('body')"," * @property _bodyNode"," * @private"," * @type Y.Node"," */","","/**"," * internal flag that will prevent sorting columns while resizing"," * @property _comingFromResize"," * @private"," * @type boolean"," */","","/**"," * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that"," * the total tablewidth needed to increase by enlargin the last col."," * @property _distributedSpace"," * @private"," * @type int"," */","","/**"," * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing"," * @property _unselectableBkpList"," * @private"," * @type Array"," */","","/**"," * Holds the configindexes of the colls that have no width specified. Used internally to distribute the remaining space after a colwidthchange"," * @property _notSpecCols"," * @private"," * @type int[]"," */","","/**"," * Internal flag that tells whether the original datatable had the width defined"," * @property _dtWidthDefined"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether datatable.widthChange is called from intern."," * To prevent event to call this._justifyTableWidth() in those cases."," * @property _widthChangeInternally"," * @private"," * @type boolean"," */","","","","","var Lang = Y.Lang,","    YArray = Y.Array,","    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',","    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',","    PERCENTEDWIDTHDATA = 'itsa_width_percented',","    EXPANSIONDATA = 'itsa_expansion',","    DEFINEDCOLWIDTHDATA = 'itsa_defined_col_width_data',","    DATAYES = 'yes',","    DATANO = 'no',","    DATATABLE_BORDERWIDTH = 2;","","Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        _resizeEventhandlers : [],","        _allColsResizable : null,","        datatable : null,","        _badColWidth : null,","        _dtWidthDefined : null,","        _dtColNodes : null,","        _dtBoundingBox : null,","        _dtContentBox : null,","        _dtXScroller : null,","        _dtYScroller : null,","        _dtYScrollBar : null,","        _dtYScrollerContainer : null,","        _dtRealDataTableHeader : null,","        _dtScrollHeader : null,","        _dtScrollLiners : null,","        _dtScrollY : null,","        _resizeApproved: false,","        _busyResize : false,","        _leftThNode : null,","        _leftThX : null,","        _mouseOffset : null,","        _leftColIndex : null,","        _lastColIndex : null,","        _initialColWidth : null,","        _busyDistributeRemainingSpace : null,","        _busyTransformAllColumnWidthToPixels : null,","        _scrollbarOffset : 0,","        _bodyNode : null,","        _comingFromResize : null,","        _widthChangeInternally : null,","        _unselectableBkpList : [],","        _distributedSpace : 0,","        _notSpecCols : [],","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","            instance.datatable = instance.get('host');","            instance._badColWidth = Y.Features.test('table', 'badColWidth');","            if (instance.datatable.get('rendered')) {","                instance._render();","            }","            else {","                instance.afterHostEvent('render', instance._render, instance);","            }","        },","","        /**","         * Transforms the columnwidth to percent. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPercent: function(name) {","            var instance = this,","                newValue, expansion;","","            if (instance._dtWidthDefined && !instance.columnWidthIsPercent(name)) {","                newValue = instance.getColumnWidthPercent(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to pixels. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPixels: function(name) {","            var instance = this,","                newValue, expansion;","","            if (instance._dtWidthDefined && !instance.columnWidthIsPixels(name)) {","                newValue = instance.getColumnWidthPx(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to undefined. Doesn't change the occupied colspace, but an undefined width will lead to","         * adding expansion when other cols get width-changes. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToUndefinedWidth: function(name) {","            var instance = this,","                thcell, newValue;","","            if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {","                newValue = instance.getColumnWidthPx(name);","                instance.setColumnWidth(name, newValue);","                thcell = this._getThCel(name);","                if (thcell) {","                    thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                }","            }","        },","","        /**","         * @method columnWidthIsPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in percent. Returns false if in pixels or undefined","         * @since 0.1","        */","        columnWidthIsPercent: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            return (storedPercentedWidth.length>0);","        },","","        /**","         * @method columnWidthIsPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined","         * @since 0.1","        */","        columnWidthIsPixels: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return definedColWidth && (storedPercentedWidth.length===0);","        },","","        /**","         * @method columnWidthIsUndefined","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is undefined","         * @since 0.1","        */","        columnWidthIsUndefined: function(name) {","            var thcell = this._getThCel(name),","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return !definedColWidth;","        },","","        /**","         * @method getColumnConfigWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null","         * @since 0.1","        */","        getColumnConfigWidth: function(name) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                columns = dt.get('columns'),","                colIndex = YArray.indexOf(columns, colConfigObject),","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.","            return (colConfigObject && ((storedPercentedWidth.length>0) ? storedPercentedWidth : colConfigObject.width)) || null;","        },","","        /**","         * Retreives the true col-width in pixels, exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPx","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {int} columnwidth in pixels","         * @since 0.1","        */","        getColumnWidthPx: function(name, withoutExpansion) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                allThHeader = instance._dtRealDataTableTHNodes,","                expansion = 0,","                colwidth = 0,","                cell;","","            if (colConfigObject && colConfigObject.width) {","                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px","                colwidth = parseInt(colConfigObject.width, 10) || 0;","            }","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;","            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth","            if (!instance._busyDistributeRemainingSpace) {","                colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));","            }","            return colwidth - expansion;","        },","","        /**","         * Retreives the true col-width in percent (in comparison to the DataTable-width) exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPercent","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {String} columnwidth in percent","         * @since 0.1","        */","        getColumnWidthPercent: function(name, withoutExpansion) {","            var instance = this,","                width = parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH,","                dtWidthWithBorder = instance.getColumnWidthPx(name, withoutExpansion);","","            return (100*width/dtWidthWithBorder).toFixed(2) + '%';","        },","","        /**","         * Retreives the expansion of the column in pixels. Some cols might have been expanded to fit a fixed DataTable-width.","         * @method getColumnExpansion","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} expansion in pixels","         * @since 0.1","        */","        getColumnExpansion: function(name) {","            var instance = this,","                allThHeader = instance._dtRealDataTableTHNodes,","                cell;","","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            return (cell && cell.getData(EXPANSIONDATA)) || 0;","        },","","        /**","         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.","         *","         * @method setColumnWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Int} width new width in pixels or percent","         * @param {Int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.","         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set","         * @since 0.1","        */","        setColumnWidth: function (name, width, expansion) {","            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the","            // width style to the cells directly, allowing padding and borders to","            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all","            // make the rendered width equal the col's style width, reducing the","            // cells' calculated width.","            var instance = this,","                colIndex = Lang.isNumber(name) ? name : instance._getColIndexFromName(name),","                prevWidthPx = instance.getColumnWidthPx(colIndex),","                dt = instance.datatable,","                dtContentBox = instance._dtContentBox,","                allColl = instance._dtColNodes,","                col       = allColl && allColl.item(colIndex),","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                scrollY = instance._dtScrollY,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                prevExpansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0,","                busyResize = instance._busyResize,","                dtWidth = parseInt(instance._dtXScroller.getStyle('width'), 10),","                dtWidthWithBorder = dtWidth + DATATABLE_BORDERWIDTH,","                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,","                colConfig = dt.getColumn(colIndex),","                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                prevWidthPercented = (prevWidthPercent.length>0),","                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),","                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,","                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,","                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;","","            expansion = expansion || 0;","            if (!instance._dtWidthDefined && newWidthPercented) {","                width = instance.get('minColWidth');","            }","            else {","                width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);","            }","            widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);","            widthTypeChange = (newWidthPercented!==prevWidthPercented);","            expansionChange = (expansion!==prevExpansion);","            badColWidth = instance._badColWidth;","","            if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)","                && (width>=instance.get('minColWidth'))) {","","                getCellStyle = function (element, prop, nonComputed) {","                    return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);","                };","","                setColWidth = function (element, newColWidth) {","                    var corrected = 0,","                        cell;","                    if (badColWidth) {","                        cell = dt.getCell([0, colIndex]);","                        if (cell) {","                            corrected =  getCellStyle(cell, 'paddingLeft') +","                                         getCellStyle(cell, 'paddingRight') +","                                         getCellStyle(cell, 'borderLeftWidth') +","                                         getCellStyle(cell, 'borderRightWidth');","                        }","                    }","                    newColWidth -= corrected;","                    element.setStyle('width', newColWidth + 'px');","                };","","                setCellWidth = function(cellwidth, withExpansion) {","                    var prevExpansion;","                    // only when we are sure we manually set the width, then mark the thNode's widthPercented","                    if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                        if (newWidthPercented) {","                            // store the percented width and continue calculating with the width in pixels","                            thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');","                            cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);","                        }","                        else {","                            thcell.setData(PERCENTEDWIDTHDATA, null);","                        }","                    }","                    if (withExpansion) {","                        cellwidth += expansion;","                        prevExpansion = thcell.getData(EXPANSIONDATA) || 0;","                        thcell.setData(EXPANSIONDATA, expansion);","                        instance._distributedSpace += expansion - prevExpansion;","                        // only when we are sure we manually set the width, then mark the thNode as DATAYES","                        if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);","                        }","                    }","                    if (colConfig) {","                        colConfig.width = cellwidth+'px';","","                    }","                    setColWidth(col, cellwidth);","                };","","                if (!busyResize) {","                    // store previous value, because it will be event-fired","                    // do not use variable prevWidthPercent, for this one doesn't have expansion included","                    eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;","                }","","                // now, also for scrollheaders - if they are available","                if (scrollY) {","                    tableToBackup = yScrollerContainer;","                }","                else {","                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,","                    // the realDataTable-width will change to 100% when a user is resorting.","                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.","                    tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;","                }","","                bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);","","                lastIndex = allColl ? (allColl.size()-1) : 0;","                if (lastIndex>0) {","                    // do not perform this workarround when you have only 1 column","                    noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);","                    bkpColWidth = getCellStyle(noWidthCol, 'width', true);","                    noWidthCol.setStyle('width', '');","                }","                else {","                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,","                    // but to 1px (safari ans chrome would otherwise fail)","                    resetContainer = yScrollerContainer || realDataTable;","                    resetContainer.setStyle('width', '1px');","                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation","                    // if realDataTable has a width other than 1px","                    if (scrollY) {","                        realDataTable.setStyle('width', '1px');","                    }","                }","                ","                // next setCellWidth can handle both with in pixels as well as in percent","                setCellWidth(width, true);","                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.","                ","                widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;","","                width = instance.getColumnWidthPx(colIndex);","                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)","                // So, we need to redefine it again to both the col, as the colconfig.width","                if (widthPxAttempt!==width) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transform it again","                    setCellWidth((newWidthPercented ? Math.round(100*width/dtWidthWithBorder) : width), false);","                }","","                if (lastIndex>0) {","                    if (bkpColWidth>0) {","                        noWidthCol.setStyle('width', bkpColWidth+'px');","                    }","                }","                else {","                    resetContainer.setStyle('width', dtWidth+'px');","                    if (scrollY) {","                        realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');","                    }","                }","                newWidth = bkpDatatableWidth + width - prevWidthPx;","                ","                // was there any change anyway? Then reset the tableUI","                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable","                if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {","                    if (scrollY) {","                        // now set the innerwidth of the div inside scrollable TH","                        scrollThDiv = instance._dtScrollLiners.item(colIndex);","                        scrollTh = scrollThDiv.get('parentNode');","                        corrected =  badColWidth ? width : (width -","                                                            getCellStyle(scrollThDiv, 'paddingLeft') -","                                                            getCellStyle(scrollThDiv, 'paddingRight') -","                                                            getCellStyle(scrollTh, 'borderLeftWidth') -","                                                            getCellStyle(scrollTh, 'borderRightWidth'));","                        setColWidth(scrollThDiv, corrected);","                        if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {","                            if (instance._dtWidthDefined) {","                                yScrollerContainer.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                            else {","                                instance._syncYScrollerUI(newWidth);","                            }","","                        }","                    }","                    else {","                        if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {","                            realDataTable.setStyle('width', newWidth+'px');","                            if (!instance._dtWidthDefined) {","                                // don't reset the datatable width during resize: this would take too much performance.","                                // Instead, during resize, we will reset the dt-width after resize:end","                                instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);","                                instance._dtXScroller.setStyle('width', (newWidth)+'px');","                                instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');","                            }","                            else {","                                realDataTable.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                        }","                    }","                }","                else if (lastIndex===0) {","                    // no widthchange, but we need to reset the width on the resetcontainer","                    resetContainer.setStyle('width', prevWidthPx+'px');","                }","                // to return the with in percent (when needed), transform width","                if (newWidthPercented) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transfprm it again","                    width = (100*width/dtWidthWithBorder).toFixed(2) + '%';","                }","                if (!busyResize) {","                    /**","                     * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing","                     * @event colWidthChange","                     * @param {EventFacade} e Event object","                     * @param {Int} e.colIndex","                     * @param {Int} e.prevVal","                     * @param {Int} e.newVal","                    */","                    dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue, newVal: width});","                }","","            }","            else {","                width = prevWidthPercent || prevWidthPx;","            }","            return width;","        },","","        /**","         * Syncs the DataTable's user interface.","         * Is used internally, but might be needed to call when the datatable content (header or cell) is changed","         * without using set('data') or set('columns'). For example, when you have images in the cells which content","         * is loaded, then the cellwidth will be changed after the true image is loaded. In those cases syncTableUI()","         * should be called afterwards.","         *","         * @method syncTableUI","         * @since 0.1","         *","        */","        syncTableUI : function() {","            var instance = this;","","            if (!instance._widthChangeInternally) {","                instance._widthChangeInternally = true;","                instance._justifyTableWidth();","            }","            instance._widthChangeInternally = false;","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this,","                dt = instance.datatable,","                dtHandles = dt._eventHandles,","                sortable = dt.get('sortable');","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance._clearResizeEventhandlers();","            instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);","            // now: in case of sortable datatable: we need to attach the original event again.","            if (Lang.isBoolean(sortable) && sortable) {","                dtHandles.sortUITrigger = dt.delegate(['click','keydown'],","                    Y.rbind('_onUITriggerSort', dt),","                    '.' + dt.getClassName('sortable', 'column'));","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Calls _initUI but only after checking -and modifying- the x-scroller.","         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.","         *","         * @method _render","         * @private","         * @since 0.1","         *","        */","        _render: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                xScrollableTable = (scrollAttrs==='x') || (scrollAttrs==='xy') || (scrollAttrs===true);","","            if (!xScrollableTable) {","                // always activate the xScroller --> this way we can controll the colwidths in a decent matter","                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes","                // the d-width to a defined value, the x-scroller is ready to be used imediately","                Y.use(","                    'datatable-scroll',","                    Y.bind(","                        function(Y) {","                            dt.set('scrollable', (dt.get('scrollable')==='y') ? 'xy' : 'x');","                            this._initUI();","                        },","                        instance","                    )","                );","            }","            else {","                instance._initUI();","            }","        },","","        /**","         * Does the initialisation of the UI in a way that we can use predictable colwidths.","         * Will call _bindUI() afterwards.","         *","         * @method _initUI","         * @private","         * @since 0.1","         *","        */","        _initUI : function() {","            var instance = this,","                dt = instance.datatable;","","            if (dt.get('width')==='') {","                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt","                // The final tablewidth will be set after resizing","                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                instance._dtWidthDefined = false;","                instance._setDTWidthFromInternal(1);","            }","            else {","                instance._dtWidthDefined = true;","            }","            instance._initPrivateVars();","            instance._justifyTableWidth();","            instance._bindUI();","        },","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                dt = instance.datatable,","                eventhandlers = instance._eventhandlers,","                sortable = dt.get('sortable'),","                currentSortEventHandler;","","            instance._activateColResizer({newVal: dt.get('colsresizable')});","","            // Justify the tablewidth again after one of these changes:","            eventhandlers.push(","                dt.after(","                    ['colsresizableChange'],","                    instance._activateColResizer,","                    instance","                )","            );","","            // Justify the tablewidth again after one of these changes:","            eventhandlers.push(","                dt.after(","                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],","                    instance.syncTableUI,","                    instance","                )","            );","","            // Justify the tablewidth again after render view or when there is a columnChange","            eventhandlers.push(","                dt.after(","                    ['widthChange'],","                    instance._justifyTableAfterTableWidthChange,","                    instance","                )","            );","","            if (dt._scrollResizeHandle) {","                dt._scrollResizeHandle.detach();","            }","            dt._scrollResizeHandle = Y.on(","                'resize',","                instance._syncScrollUIPercentedDT,","                null,","                instance","            );","","            if (Lang.isBoolean(sortable) && sortable) {","                // first detach current handler","                currentSortEventHandler = dt._eventHandles.sortUITrigger;","                if (currentSortEventHandler) {","                    currentSortEventHandler.detach();","                    currentSortEventHandler = null;","                }","                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area","                if (dt._theadNode) {","                    eventhandlers.push(","                        dt.delegate(","                            'keydown',","                            Y.rbind(instance._triggerSort, instance),","                            '.' + dt.getClassName('sortable', 'column')","                        )","                    );","                    eventhandlers.push(","                        dt.delegate(","                            'click',","                            Y.rbind(instance._triggerSort, instance),","                            function() {","                                return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));","                            }","                        )","                    );","                }","            }","        },","","        /**","         * Binds events which make resizing of the columns posible, or deactivate","         *","         * @method _activateColResizer","         * @private","         * @param {e} eventFacade","         * @since 0.1","        */","        _activateColResizer : function(e) {","            var instance = this,","                colsresizable = e.newVal,","                resizeEventhandlers = instance._resizeEventhandlers,","                colsresizableDefined = Lang.isBoolean(colsresizable),","                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;","","            if (colsresizableDefined && !colsresizable) {","                instance._clearResizeEventhandlers();","            }","            else {","                instance._allColsResizable = colsresizableDefined && colsresizable;","                // when the mouse moves, while not resizing, you might be entering the area where resizing may start","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousemove', 'touchstart'],","                        instance._checkResizeAprovement,","                        'th',","                        instance","                    )","                );","","                // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","                // In those cases this._resizeApproved needs to be set false","                resizeEventhandlers.push(","                    workingHeader.on(","                        'mouseleave',","                        instance._checkEndResizeApprovement,","                        instance","                    )","                );","","                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousedown', 'touchstart'],","                        instance._startResize,","                        'th',","                        instance","                    )","                );","","                // stop resizing when the mouse comes up","                // also stop resizing when the mouse leaves the body (while still might be in down state)","                resizeEventhandlers.push(","                    instance._bodyNode.on(","                        ['mouseup', 'mouseleave', 'touchend'],","                        instance._stopResize,","                        instance","                    )","                );","            }","        },","","        /**","         * Syncs the UI of datatables whose width is in percents. It overrules datatable._syncScrollUI.","         *","         * @method _syncScrollUIPercentedDT","         * @private","         * @since 0.1","         *","        */","        _syncScrollUIPercentedDT: function() {","            var instance = this,","                dt = instance.datatable;","","            // will always be during rendering dt, so we need to suppress first call","            if (instance._resizeEventMayOccur) {","                Y.rbind(dt._syncScrollUI, dt)();","                instance.syncTableUI();","            }","            else {","                instance._resizeEventMayOccur = true;","            }","        },","","        /**","         * Does the actual sort of columns - if sortable<br>","         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values.","         * In order to prevent resetting the width of the table during sorting","         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value).","         * We don't want to keep that large width, because that would","         * lead to a screen x-sroller on the page.","         *","         * @method _triggerSort","         * @private","         * @protected","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _triggerSort: function(e) {","            var instance = this,","                dt = instance.datatable,","                contentBox = instance._dtContentBox,","                yScrollerContainer = instance._dtYScrollerContainer,","                realDataTable = instance._dtRealDataTable,","                prevYScrollerContainerWidth, prevRealDataTableWidth;","","            if (instance._dtScrollY) {","                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount","                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort","                // YScrollerContainer and realDataTable get wrong values. We need to restore that","                prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);","                prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);","                Y.bind('_onUITriggerSort', dt, e)();","                yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');","                realDataTable.setStyle('width', prevRealDataTableWidth+'px');","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","            else  {","                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area","                contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');","                Y.bind('_onUITriggerSort', dt, e)();","                // clear width contentbox to prevent big page x-scroller","                contentBox.setStyle('width', '');","            }","        },","","        /**","         * Will be executed at the start of a resizeaction<br>","         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.","         *","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _startResize: function(e) {","            var instance = this, dt,","                yScrollerContainer = instance._dtYScrollerContainer,","                resizeMargin, resizeMarginHalf, th, lastTh, allTh,","                mouseX, thWidth, thX, mouseInLeftNode;","","            if (instance._resizeApproved) {","                instance._busyResize = true;","                instance._comingFromResize = true;","                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeColumn,","                    instance","                );","                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.","                // we need to know this, because the column-resize handlers overlap 2 th-nodes.","                dt = instance.datatable;","                resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');","                resizeMarginHalf = Math.round(resizeMargin/2);","                th = e.currentTarget;","                lastTh = (th.next('th')===null);","                mouseX = e.pageX;","                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);","                thX = th.getX();","                mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));","                if (mouseInLeftNode) {","                    instance._leftThNode = th;","                    instance._leftThX = thX;","                    instance._mouseOffset = thX+thWidth-mouseX;","                }","                else {","                    instance._leftThNode = th.previous('th');","                    instance._leftThX = instance._leftThNode.getX();","                    instance._mouseOffset = thX-mouseX;","                }","                allTh = th.get('parentNode').all('th');","                instance._leftColIndex = allTh.indexOf(instance._leftThNode);","                instance._initialColWidth = instance.getColumnWidthPx(instance._leftColIndex);","                instance._changeUnselectableIE(true);","            }","        },","","        /**","         * Will be executed at the end of a resizeaction<br>","         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.","         * Fires the event colWidthChange","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @param {Array} e.prevVal","         * contains objects with fields: colindex and width","         * @param {Array} e.newVal","         * contains objects with fields: colindex, width and changed","         * @since 0.1","         *","        */","        _stopResize: function(e) {","            var instance = this,","                dt = instance.datatable,","                finalColWidth;","","            if (instance._busyResize) {","                // resizing will be ending. Fire event.","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);","                instance._busyResize = false;","                instance._changeUnselectableIE(false);","                instance._checkResizeAprovement(e);","                // Don't know why, but we need to e.halt in order to fire a new event.","                e.halt();","                if (instance._initialColWidth !== finalColWidth) {","                    dt.fire('colWidthChange', {colIndex: instance._leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});","                }","                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value","                Y.later(","                    200,","                    instance,","                    function() {","                        instance._comingFromResize = false;","                    }","                );","","            }","        },","","        /**","         * Checks whether the nouse is in a position that start-resizing is possible. If so, then the cursor will change to col-resize<br>","         *","         * @method _checkResizeAprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _checkResizeAprovement: function(e) {","            if (!this._busyResize) {","                var instance = this,","                    dt = instance.datatable,","                    boundingBox = dt.get('boundingBox'),","                    th = e.currentTarget,","                    lastTh = (th.next('th')===null),","                    thX = th.getX(),","                    mouseX = e.pageX,","                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    resizeMarginHalf = Math.round(resizeMargin/2),","                    fromLeft, fromRight, insideLeftArea, insideRightArea, leftSideFirstTh;","","                fromLeft = mouseX-thX;","                fromRight = thX+thWidth-mouseX;","                insideLeftArea = (fromLeft<resizeMarginHalf);","                insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));","                leftSideFirstTh = insideLeftArea && (th.previous('th')===null);","                instance._resizeApproved = ((insideLeftArea || insideRightArea)","                    && !leftSideFirstTh","                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))","                );","                boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);","            }","        },","","        /**","         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>","         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.","         * Fires the event resize:colWidthChange","         *","         * @method _resizeColumn","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _resizeColumn: function(e) {","            if (this._busyResize) {","                // preventDefault, because in case of touch-event, the screen would have been moved.","                e.preventDefault();","                var instance = this,","                    leftColIndex = instance._leftColIndex,","                    lastColIndex = instance._lastColIndex,","                    prevWidth = instance.getColumnWidthPx(leftColIndex),","                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),","                    distributedSpace = instance._distributedSpace,","                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;","","                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:","                if (leftColIndex===lastColIndex) {","                    compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                    widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);","                    widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);","                    noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)","                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);","                }","                if (!noaction) {","                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.","                    // This would be the case if compairContainer.width>xScroller.width","                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width","                    // corrected by instance._distributedSpace","                    // This could happen when the mouse moves very quick to the left","                    if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {","                        setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));","                    }","                    if (instance.columnWidthIsPercent(leftColIndex) && instance._dtWidthDefined) {","                        // set the new size in percent and NOT in pixels","                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels","                        dtWidthWithBorder = parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH;","                        setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';","                        prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';","                    }","                    newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);","                    if (prevWidth!==newWidth) {","                        /**","                         * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing","                         * @event resize:colWidthChange","                         * @param {EventFacade} e Event object","                         * @param {Int} e.colIndex","                         * @param {Int} e.prevVal","                         * @param {Int} e.newVal","                        */","                        instance.datatable.fire('resize:colWidthChange', {colIndex: leftColIndex, prevVal: prevWidth, newVal: newWidth});","                    }","                }","                else {","                }","            }","        },","","        /**","         * Determines whether a resize-state should be ended.","         * This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead","         *","         * @method _checkEndResizeApprovement","         * @private","         * @since 0.1","         *","        */","        _checkEndResizeApprovement: function() {","            var instance = this;","","            if (instance._resizeApproved && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Will togle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _endResizeApprovement: function() {","            var instance = this;","","            instance._resizeApproved = false;","            instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);","        },","","","        /**","         * Defines some private datatable-variables","         * Use the method to prevent this from happening","         *","         * @method _initPrivateVars","         * @private","         * @since 0.1","         *","        */","        _initPrivateVars: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;","","            instance._bodyNode = Y.one('body');","            instance._dtBoundingBox = dt.get('boundingBox');","            instance._dtContentBox = contentBox = dt.get('contentBox');","            instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));","            instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));","            instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));","            instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));","            instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));","            instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));","            instance._dtRealDataTableTHNodes = allThRealHeader.all('th');","            colgroupNode = contentBox.one('colgroup');","            instance._dtColNodes = colgroupNode && colgroupNode.all('col');","            instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));","            instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));","            instance._dtScrollY = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);","        },","","","        /**","         * Justifies the tablewidth: will be called after datatable.changeWidth-event.","         *","         * @method _justifyTableAfterTableWidthChange","         * @since 0.1","         *","        */","        _justifyTableAfterTableWidthChange : function() {","            var instance = this,","                dt = instance.datatable;","","            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes","            if (!instance._busyResize) {","                if (dt.get('width')==='') {","                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to","                    // expansion of the dt","                    // The final tablewidth will be set after resizing","                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                    instance._dtWidthDefined = false;","                    instance._setDTWidthFromInternal(1);","                }","                else {","                    instance._dtWidthDefined = true;","                }","                instance.syncTableUI();","            }","        },","","        /**","         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.","         * Use the method to prevent this from happening","         *","         * @method _justifyTableWidth","         * @private","         * @since 0.1","         *","        */","        _justifyTableWidth: function() {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                yScrollBar = instance._dtYScrollBar,","                xScroller = instance._dtXScroller,","                scrollY = instance._dtScrollY,","                dtScrollHeader = instance._dtScrollHeader,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                dtWidthDefined = instance._dtWidthDefined,","                scrollbarOffset = 0,","                scrollTheaders, colObject, lastColIndex, totalWidth;","","            if (!dtWidthDefined) {","                xScroller.setStyle('overflowX', 'hidden');","            }","","            instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;","","            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths","            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)","            realDataTable.setStyle('width', '1px');","            if (scrollY) {","                yScrollerContainer.setStyle('width', '1px');","            }","","","            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion","            totalWidth = instance._transformAllColumnWidthToPixels();","","            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels","            // but just in case there are roundingerrors we set it exactly to 0","            if (instance._distributedSpace>0) {","                instance._distributedSpace = 0;","            }","","            if (scrollY) {","                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.","                // We need to capture this behaviour when we want to repositions the y-scrollbar","                scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');","                instance._scrollbarOffset = scrollbarOffset = (","                    scrollTheaders","                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)","                ) || 0;","                totalWidth += scrollbarOffset;","                // in this stage, we need to set the width of yScrollerContainer","                yScrollerContainer.setStyle('width', totalWidth + 'px');","            }","","            // in this stage, we need to set the width of realDataTable","            realDataTable.setStyle('width', totalWidth + 'px');","            totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));","","            if (scrollY) {","                dtScrollHeader.all('th').each(","                    function(th, index) {","                        // add the resizeclass to the th-elements of the scrollable header","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)","                yScrollBar.setStyle('width', '16px');","                instance._syncYScrollerUI(totalWidth);","            }","            else {","                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable","                allThRealHeader.each(","                    function(th, index) {","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                if (!dtWidthDefined) {","                    instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);","                }","                else {","                    instance._checkRemainingColSpace();","                }","            }","        },","","        /**","         * In case of IE: Change text-unselectable of the cols","         *","         * @method _changeUnselectableIE","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _changeUnselectableIE : function(noSelect) {","            var instance = this,","                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,","                headerList = headers && headers.all('th'),","                unselectableBkpList = instance._unselectableBkpList,","                bkpMade;","","            if (Y.UA.ie>0) {","                bkpMade = (unselectableBkpList.length>0);","                headerList.each(","                    function(th, index) {","                        if (noSelect && !bkpMade) {","                            instance._unselectableBkpList.push(th.get('unselectable') || '');","                        }","                        th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));","                    },","                    instance","                );","            }","        },","","        /**","         * Because we cannot use unpredictable columnwidth, all columns must have a defined width.","         *","         * @method _transformAllColumnWidthToPixels","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _transformAllColumnWidthToPixels: function() {","            var instance = this,","                dt = instance.datatable,","                dtWidthWithBorder = parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH,","                notSpecCols = instance._notSpecCols,","                usedSpace = 0,","                remainingSpace = 0,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                width, configWidth, colConfigObject, percentWidth, total, thcell,","                storedPercentedWidth, expansion, definedColWidth, percentedIsStored;","            ","            // prevent expanding last cell at this stage:","            instance._busyTransformAllColumnWidthToPixels = true;","            // empty current definition of notspeccols:","            notSpecCols.length = 0;","            ","            allThRealHeader.each(","                function(th, index) {","                    colConfigObject = dt.getColumn(index);","                    configWidth = colConfigObject && colConfigObject.width;","                    percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');","                    thcell = allThRealHeader && allThRealHeader.item(index);","                    expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;","                    storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","                    percentedIsStored = (storedPercentedWidth.length>0);","                    definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","                    if (definedColWidth===DATAYES) {","                        if (percentWidth || percentedIsStored) {","                            // transform to pixels. BUT also need to store that the column was in percent!","                            if (percentedIsStored) {","                                // retake the percents instead of the set pixels","                                configWidth = storedPercentedWidth;","                            }","                            if (thcell) {","                                thcell.setData(PERCENTEDWIDTHDATA, configWidth);","                            }","                            if (instance._dtWidthDefined) {","                                configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';","                            }","                            else {","                                // treat as null, the width will be unpredictable: thus the col needs to be as small as posible","                                // just as if configWidth would have been undefined","                                configWidth = null;","                            }","                        }","                        else {","                            if (thcell) {","                                // reset","                                thcell.setData(PERCENTEDWIDTHDATA, null);","                            }","                        }","                    }","                    if (configWidth && (definedColWidth===DATAYES)) {","                        // width is defined in objectconfig","                        width = parseInt(configWidth, 10) - expansion;","                        usedSpace += instance.setColumnWidth(index, width);","                    }","                    else {","                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards","                        notSpecCols.push(index);","                        if (thcell) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                        }","                    }","                }","            );","            if (notSpecCols.length>0) {","                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width","                remainingSpace = 0;","                YArray.each(","                    notSpecCols,","                    function(colIndex) {","                        remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));","                    }","                );","            }","            total = usedSpace + remainingSpace;","            instance._busyTransformAllColumnWidthToPixels = false;","            return total;","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _checkRemainingColSpace","         * @param {Int} [yScrollerWidth] width of the previous YScrollerContainer","         * @private","         * @since 0.1","         *","        */","        _checkRemainingColSpace: function(yScrollerWidth) {","            var instance = this,","                xScroller = instance._dtXScroller,","                prevDistributedSpace = instance._distributedSpace,","                widthViewport = parseInt(xScroller.getStyle('width'), 10),","                distributeSpace, compairContainer, widthCompairContainer;","","            if (instance._dtWidthDefined) {","                instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth","                compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);","                distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;","                xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');","                distributeSpace = Math.max(0, distributeSpace);","                compairContainer.setStyle('width', widthViewport+'px');","                instance._distributeRemainingSpace(distributeSpace);","                instance._busyDistributeRemainingSpace = false;","                widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;","                if (instance._dtScrollY) {","                    instance._syncYScrollerUI(widthCompairContainer, true);","                }","                else {","                    instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');","                }","                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):","                instance._distributedSpace = distributeSpace;","            }","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _distributeRemainingSpace","         * @param {Int} amount number of pixels that have to be distributed","         * @private","         * @since 0.1","         *","        */","        _distributeRemainingSpace : function(amount) {","            var instance = this,","                notSpecCols = instance._notSpecCols,","                notSpecColSize = notSpecCols.length,","                correction, lastColCorrection;","","            // instance._distributedSpace will be filled during resizing cols","            if (notSpecColSize>0) {","                // remaining space needs to be added to the undefined colls","                correction = Math.round(amount/notSpecColSize);","                // due to roundingdifferences, not all space might be added. Therefore we need an extra check","                lastColCorrection = correction + amount - (correction*notSpecColSize);","                YArray.each(","                    notSpecCols,","                    function(colIndex, item) {","                        var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;","                        instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);","                    }","                );","            }","            else {","                instance._expandLastCell(amount);","            }","        },","","        /**","         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area:","         * the last cell will be expanded so that the complete datatable fits within the scrollable area","         *","         * @method _expandLastCell","         * @private","         * @since 0.1","         *","        */","        _expandLastCell: function(expand) {","            var instance = this,","                lastColIndex = instance._lastColIndex;","","            instance.setColumnWidth(lastColIndex, instance.getColumnWidthPx(lastColIndex, true), expand);","        },","","        /**","         * Syncs the YScroller-UI after a column changes its width.","         * @method _syncYScrollerUI","         * @param {int} tableWidth width of the datatable visible area, without outside datatable-borders","         * @param {boolean} [comesFromCheckRemainingColSpace] internally used to mark when function is called from this._checkRemainingColSpace","         * @since 0.1","        */","        _syncYScrollerUI : function(tableWidth, comesFromCheckRemainingColSpace) {","            // always scrollabeY when called","            var instance = this,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                prevWidthYScrollerContainer, xScrollerWidth;","","            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true","            if (!instance._busyDistributeRemainingSpace) {","                if (instance._dtWidthDefined) {","                    // dt has width either in percent or pixels","                    // never sync to values below xScroller-width","                    xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);","                    tableWidth = Math.max(tableWidth, xScrollerWidth);","/*","if ((tableWidth>xScrollerWidth) && (tableWidth<(xScrollerWidth+instance._scrollbarOffset))) {","var dt = instance.datatable;","    Y.rbind(dt._syncScrollUI, dt)();","}","*/","                    realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');","                }","                else {","                    instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);","                    instance._dtXScroller.setStyle('width', tableWidth+'px');","                    instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');","                }","                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                // now resizing","                prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);","                yScrollerContainer.setStyle('width', tableWidth+'px');","                // Also reset scroller-y for this has a width of 1px","                instance._dtYScroller.setStyle('width', tableWidth+'px');","                // prevent looping by checking comesFromSetVisibilityXScroller","                if (!comesFromCheckRemainingColSpace) {","                    instance._checkRemainingColSpace(prevWidthYScrollerContainer);","                }","                if (!instance._dtWidthDefined) {","                    instance.datatable._syncScrollUI();","                }","                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","        },","","        /**","         * @method _getThCel","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @private","         * @return {Node} TH-node of the real datatable","         * @since 0.1","        */","        _getThCel: function(name) {","            var instance = this,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                colIndex;","","            if (!Lang.isNumber(name)) {","                colIndex = instance._getColIndexFromName(name);","            }","            return allThRealHeader && allThRealHeader.item(colIndex || name);","        },","","        /**","         * @method _getColIndexFromName","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @private","         * @return {int} col-index of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        _getColIndexFromName: function(name) {","            var instance = this,","                dt, colConfigObject, columns, colIndex;","","            if (typeof name === 'string') {","                dt = instance.datatable;","                colConfigObject = dt.getColumn(name);","                columns = dt.get('columns');","                colIndex = YArray.indexOf(columns, colConfigObject);","            }","            return colIndex || -1;","        },","","        /**","         * Sets the DT width, but only from calls within this module","         * It will prevent coming into a loop when datatable-Changewidth event occurs and it leaves this._dtWidthDefined to false","         * Should only be called when datatable has _dtWidthDefined set to false","         *","         * @method _setDTWidthFromInternal","         * @param {Number} newWidth new datatable width in pixels","         * @private","         * @protected","         * @since 0.1","        */","        _setDTWidthFromInternal : function(newWidth) {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                prevWidthRealDataTable;","","            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()","            // we don't need to restore this width anyway at that point.","            if (!instance._dtWidthDefined) {","                prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);","                instance._widthChangeInternally = true;","                dt.set('width', newWidth+'px');","                instance._widthChangeInternally = false;","                // now set instance._dtWidthDefined to false again, because it was false and is set to true!","                instance._dtWidthDefined = false;","                // always reset the realdatatable, because it wis resetted by dt.set(width)","                if (realDataTable) {","                    realDataTable.setStyle('width', Math.max(prevWidthRealDataTable, parseInt(instance._dtXScroller.getStyle('width'), 10))+'px');","                }","            }","            else {","            }","        },","","        /**","         * Cleaning up all resizeeventlisteners","         *","         * @method _clearResizeEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearResizeEventhandlers : function() {","            YArray.each(","                this._resizeEventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsadtcr',","        ATTRS : {","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value correspons with an area that overlaps 2 columns (50% each)<br>","             * Has the dame purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 10","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 10,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value correspons with an area that overlaps 2 columns (50% each)<br>","             * Has the dame purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 20","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 20,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Minamal colwidth that a column can reach by resizing<br>","             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>","             * minimum value = 0","             * @default 0","             * @attribute minColWidth","             * @type int","             * @since 0.1","            */","            minColWidth: {","                value: 0,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"plugin\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-resize\",","        \"event-touch\",","        \"datatable-column-widths\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].lines = {"1":0,"3":0,"267":0,"278":0,"323":0,"325":0,"326":0,"327":0,"328":0,"331":0,"344":0,"347":0,"348":0,"349":0,"350":0,"363":0,"366":0,"367":0,"368":0,"369":0,"383":0,"386":0,"387":0,"388":0,"389":0,"390":0,"391":0,"403":0,"406":0,"416":0,"420":0,"430":0,"433":0,"443":0,"453":0,"471":0,"479":0,"481":0,"483":0,"484":0,"486":0,"487":0,"489":0,"491":0,"492":0,"494":0,"512":0,"516":0,"527":0,"531":0,"532":0,"534":0,"535":0,"537":0,"556":0,"581":0,"582":0,"583":0,"586":0,"588":0,"589":0,"590":0,"591":0,"593":0,"596":0,"597":0,"600":0,"601":0,"603":0,"604":0,"605":0,"606":0,"612":0,"613":0,"616":0,"617":0,"619":0,"620":0,"622":0,"623":0,"626":0,"629":0,"630":0,"631":0,"632":0,"633":0,"635":0,"636":0,"639":0,"640":0,"643":0,"646":0,"649":0,"653":0,"654":0,"660":0,"663":0,"665":0,"666":0,"668":0,"669":0,"670":0,"675":0,"676":0,"679":0,"680":0,"685":0,"688":0,"690":0,"693":0,"696":0,"699":0,"700":0,"701":0,"705":0,"706":0,"707":0,"710":0,"714":0,"715":0,"717":0,"718":0,"719":0,"724":0,"725":0,"726":0,"727":0,"728":0,"731":0,"737":0,"738":0,"739":0,"742":0,"743":0,"744":0,"747":0,"748":0,"753":0,"755":0,"758":0,"761":0,"763":0,"772":0,"777":0,"779":0,"794":0,"796":0,"797":0,"798":0,"800":0,"810":0,"815":0,"816":0,"818":0,"819":0,"820":0,"822":0,"823":0,"843":0,"848":0,"852":0,"856":0,"857":0,"864":0,"878":0,"881":0,"886":0,"887":0,"890":0,"892":0,"893":0,"894":0,"905":0,"911":0,"914":0,"923":0,"932":0,"940":0,"941":0,"943":0,"950":0,"952":0,"953":0,"954":0,"955":0,"958":0,"959":0,"966":0,"971":0,"988":0,"994":0,"995":0,"998":0,"1000":0,"1011":0,"1020":0,"1031":0,"1050":0,"1054":0,"1055":0,"1056":0,"1059":0,"1079":0,"1086":0,"1090":0,"1091":0,"1092":0,"1093":0,"1094":0,"1095":0,"1099":0,"1100":0,"1102":0,"1117":0,"1122":0,"1123":0,"1124":0,"1126":0,"1133":0,"1134":0,"1135":0,"1136":0,"1137":0,"1138":0,"1140":0,"1141":0,"1142":0,"1143":0,"1144":0,"1145":0,"1146":0,"1149":0,"1150":0,"1151":0,"1153":0,"1154":0,"1155":0,"1156":0,"1175":0,"1179":0,"1181":0,"1182":0,"1184":0,"1185":0,"1186":0,"1187":0,"1189":0,"1190":0,"1191":0,"1194":0,"1198":0,"1215":0,"1216":0,"1229":0,"1230":0,"1231":0,"1232":0,"1233":0,"1234":0,"1238":0,"1254":0,"1256":0,"1257":0,"1266":0,"1267":0,"1268":0,"1269":0,"1270":0,"1273":0,"1279":0,"1280":0,"1282":0,"1285":0,"1286":0,"1287":0,"1289":0,"1290":0,"1299":0,"1317":0,"1319":0,"1320":0,"1334":0,"1336":0,"1337":0,"1351":0,"1356":0,"1357":0,"1358":0,"1359":0,"1360":0,"1361":0,"1362":0,"1363":0,"1364":0,"1365":0,"1366":0,"1367":0,"1368":0,"1369":0,"1370":0,"1382":0,"1386":0,"1387":0,"1393":0,"1394":0,"1397":0,"1399":0,"1413":0,"1426":0,"1427":0,"1430":0,"1434":0,"1435":0,"1436":0,"1441":0,"1445":0,"1446":0,"1449":0,"1452":0,"1453":0,"1457":0,"1459":0,"1463":0,"1464":0,"1466":0,"1467":0,"1470":0,"1471":0,"1475":0,"1476":0,"1480":0,"1482":0,"1483":0,"1486":0,"1487":0,"1490":0,"1505":0,"1511":0,"1512":0,"1513":0,"1515":0,"1516":0,"1518":0,"1535":0,"1546":0,"1548":0,"1550":0,"1552":0,"1553":0,"1554":0,"1555":0,"1556":0,"1557":0,"1558":0,"1559":0,"1560":0,"1561":0,"1563":0,"1565":0,"1567":0,"1568":0,"1570":0,"1571":0,"1576":0,"1580":0,"1582":0,"1586":0,"1588":0,"1589":0,"1593":0,"1594":0,"1595":0,"1600":0,"1602":0,"1603":0,"1606":0,"1610":0,"1611":0,"1612":0,"1625":0,"1631":0,"1632":0,"1633":0,"1634":0,"1635":0,"1636":0,"1637":0,"1638":0,"1639":0,"1640":0,"1641":0,"1642":0,"1643":0,"1646":0,"1649":0,"1663":0,"1669":0,"1671":0,"1673":0,"1674":0,"1677":0,"1678":0,"1683":0,"1697":0,"1700":0,"1712":0,"1718":0,"1719":0,"1722":0,"1723":0,"1730":0,"1733":0,"1734":0,"1735":0,"1739":0,"1740":0,"1742":0,"1744":0,"1745":0,"1747":0,"1748":0,"1751":0,"1763":0,"1767":0,"1768":0,"1770":0,"1781":0,"1784":0,"1785":0,"1786":0,"1787":0,"1788":0,"1790":0,"1805":0,"1812":0,"1813":0,"1814":0,"1815":0,"1816":0,"1818":0,"1820":0,"1821":0,"1837":0,"1840":0,"1854":0,"1857":0,"1881":0,"1900":0,"1916":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].functions = {"initializer:322":0,"transformToPercent:343":0,"transformToPixels:362":0,"transformToUndefinedWidth:382":0,"columnWidthIsPercent:402":0,"columnWidthIsPixels:415":0,"columnWidthIsUndefined:429":0,"getColumnConfigWidth:442":0,"getColumnWidthPx:470":0,"getColumnWidthPercent:511":0,"getColumnExpansion:526":0,"getCellStyle:596":0,"setColWidth:600":0,"setCellWidth:616":0,"setColumnWidth:550":0,"syncTableUI:793":0,"destructor:809":0,"(anonymous 2):855":0,"_render:842":0,"_initUI:877":0,"(anonymous 3):970":0,"_bindUI:904":0,"_activateColResizer:987":0,"_syncScrollUIPercentedDT:1049":0,"_triggerSort:1078":0,"_startResize:1116":0,"(anonymous 4):1197":0,"_stopResize:1174":0,"_checkResizeAprovement:1214":0,"_resizeColumn:1253":0,"_checkEndResizeApprovement:1316":0,"_endResizeApprovement:1333":0,"_initPrivateVars:1350":0,"_justifyTableAfterTableWidthChange:1381":0,"(anonymous 5):1468":0,"(anonymous 6):1481":0,"_justifyTableWidth:1412":0,"(anonymous 7):1514":0,"_changeUnselectableIE:1504":0,"(anonymous 8):1551":0,"(anonymous 9):1605":0,"_transformAllColumnWidthToPixels:1534":0,"_checkRemainingColSpace:1624":0,"(anonymous 10):1676":0,"_distributeRemainingSpace:1662":0,"_expandLastCell:1696":0,"_syncYScrollerUI:1710":0,"_getThCel:1762":0,"_getColIndexFromName:1780":0,"_setDTWidthFromInternal:1804":0,"(anonymous 11):1839":0,"_clearResizeEventhandlers:1836":0,"(anonymous 12):1856":0,"_clearEventhandlers:1853":0,"validator:1880":0,"validator:1899":0,"validator:1915":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredLines = 449;
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredFunctions = 58;
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1);
YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 3);
'use strict';

/**
 * DataTable ColumnResize Plugin
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
 * Internal flag that tells whether the original datatable had the width defined
 * @property _dtWidthDefined
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




_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 267);
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

_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 278);
Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {

        _eventhandlers : [],
        _resizeEventhandlers : [],
        _allColsResizable : null,
        datatable : null,
        _badColWidth : null,
        _dtWidthDefined : null,
        _dtColNodes : null,
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "initializer", 322);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 323);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 325);
instance.datatable = instance.get('host');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 326);
instance._badColWidth = Y.Features.test('table', 'badColWidth');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 327);
if (instance.datatable.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 328);
instance._render();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 331);
instance.afterHostEvent('render', instance._render, instance);
            }
        },

        /**
         * Transforms the columnwidth to percent. Can only be done if the DataTable has a defined width (either in pixels or percent)
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToPercent
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToPercent: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPercent", 343);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 344);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 347);
if (instance._dtWidthDefined && !instance.columnWidthIsPercent(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 348);
newValue = instance.getColumnWidthPercent(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 349);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 350);
instance.setColumnWidth(name, newValue, expansion);
            }
        },

        /**
         * Transforms the columnwidth to pixels. Can only be done if the DataTable has a defined width (either in pixels or percent)
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToPixels: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPixels", 362);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 363);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 366);
if (instance._dtWidthDefined && !instance.columnWidthIsPixels(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 367);
newValue = instance.getColumnWidthPx(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 368);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 369);
instance.setColumnWidth(name, newValue, expansion);
            }
        },

        /**
         * Transforms the columnwidth to undefined. Doesn't change the occupied colspace, but an undefined width will lead to
         * adding expansion when other cols get width-changes. Can only be done if the DataTable has a defined width (either in pixels or percent)
         * Does not return result, because you would have to define whether you want the result with or without added expansion
         * (extra space that might be added to the column in order to make it fit the DataTable-width)
         * @method transformToPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @since 0.1
        */
        transformToUndefinedWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToUndefinedWidth", 382);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 383);
var instance = this,
                thcell, newValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 386);
if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 387);
newValue = instance.getColumnWidthPx(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 388);
instance.setColumnWidth(name, newValue);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 389);
thcell = this._getThCel(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 390);
if (thcell) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 391);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPercent", 402);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 403);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 406);
return (storedPercentedWidth.length>0);
        },

        /**
         * @method columnWidthIsPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined
         * @since 0.1
        */
        columnWidthIsPixels: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPixels", 415);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 416);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 420);
return definedColWidth && (storedPercentedWidth.length===0);
        },

        /**
         * @method columnWidthIsUndefined
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is undefined
         * @since 0.1
        */
        columnWidthIsUndefined: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsUndefined", 429);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 430);
var thcell = this._getThCel(name),
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 433);
return !definedColWidth;
        },

        /**
         * @method getColumnConfigWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null
         * @since 0.1
        */
        getColumnConfigWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnConfigWidth", 442);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 443);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                columns = dt.get('columns'),
                colIndex = YArray.indexOf(columns, colConfigObject),
                allThRealHeader = instance._dtRealDataTableTHNodes,
                thcell = allThRealHeader && allThRealHeader.item(colIndex),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 453);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPx", 470);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 471);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                allThHeader = instance._dtRealDataTableTHNodes,
                expansion = 0,
                colwidth = 0,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 479);
if (colConfigObject && colConfigObject.width) {
                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 481);
colwidth = parseInt(colConfigObject.width, 10) || 0;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 483);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 484);
cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 486);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 487);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 489);
expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;
            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 491);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 492);
colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 494);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPercent", 511);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 512);
var instance = this,
                width = parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH,
                dtWidthWithBorder = instance.getColumnWidthPx(name, withoutExpansion);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 516);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnExpansion", 526);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 527);
var instance = this,
                allThHeader = instance._dtRealDataTableTHNodes,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 531);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 532);
cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 534);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 535);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 537);
return (cell && cell.getData(EXPANSIONDATA)) || 0;
        },

        /**
         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.
         *
         * @method setColumnWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @param {Int} width new width in pixels or percent
         * @param {Int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.
         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set
         * @since 0.1
        */
        setColumnWidth: function (name, width, expansion) {
            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the
            // width style to the cells directly, allowing padding and borders to
            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all
            // make the rendered width equal the col's style width, reducing the
            // cells' calculated width.
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColumnWidth", 550);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 556);
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
                dtWidthWithBorder = dtWidth + DATATABLE_BORDERWIDTH,
                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,
                colConfig = dt.getColumn(colIndex),
                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                prevWidthPercented = (prevWidthPercent.length>0),
                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),
                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,
                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,
                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 581);
expansion = expansion || 0;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 582);
if (!instance._dtWidthDefined && newWidthPercented) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 583);
width = instance.get('minColWidth');
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 586);
width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 588);
widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 589);
widthTypeChange = (newWidthPercented!==prevWidthPercented);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 590);
expansionChange = (expansion!==prevExpansion);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 591);
badColWidth = instance._badColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 593);
if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)
                && (width>=instance.get('minColWidth'))) {

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 596);
getCellStyle = function (element, prop, nonComputed) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getCellStyle", 596);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 597);
return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 600);
setColWidth = function (element, newColWidth) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColWidth", 600);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 601);
var corrected = 0,
                        cell;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 603);
if (badColWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 604);
cell = dt.getCell([0, colIndex]);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 605);
if (cell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 606);
corrected =  getCellStyle(cell, 'paddingLeft') +
                                         getCellStyle(cell, 'paddingRight') +
                                         getCellStyle(cell, 'borderLeftWidth') +
                                         getCellStyle(cell, 'borderRightWidth');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 612);
newColWidth -= corrected;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 613);
element.setStyle('width', newColWidth + 'px');
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 616);
setCellWidth = function(cellwidth, withExpansion) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setCellWidth", 616);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 617);
var prevExpansion;
                    // only when we are sure we manually set the width, then mark the thNode's widthPercented
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 619);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 620);
if (newWidthPercented) {
                            // store the percented width and continue calculating with the width in pixels
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 622);
thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 623);
cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 626);
thcell.setData(PERCENTEDWIDTHDATA, null);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 629);
if (withExpansion) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 630);
cellwidth += expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 631);
prevExpansion = thcell.getData(EXPANSIONDATA) || 0;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 632);
thcell.setData(EXPANSIONDATA, expansion);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 633);
instance._distributedSpace += expansion - prevExpansion;
                        // only when we are sure we manually set the width, then mark the thNode as DATAYES
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 635);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 636);
thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 639);
if (colConfig) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 640);
colConfig.width = cellwidth+'px';

                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 643);
setColWidth(col, cellwidth);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 646);
if (!busyResize) {
                    // store previous value, because it will be event-fired
                    // do not use variable prevWidthPercent, for this one doesn't have expansion included
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 649);
eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;
                }

                // now, also for scrollheaders - if they are available
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 653);
if (scrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 654);
tableToBackup = yScrollerContainer;
                }
                else {
                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,
                    // the realDataTable-width will change to 100% when a user is resorting.
                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 660);
tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 663);
bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 665);
lastIndex = allColl ? (allColl.size()-1) : 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 666);
if (lastIndex>0) {
                    // do not perform this workarround when you have only 1 column
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 668);
noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 669);
bkpColWidth = getCellStyle(noWidthCol, 'width', true);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 670);
noWidthCol.setStyle('width', '');
                }
                else {
                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,
                    // but to 1px (safari ans chrome would otherwise fail)
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 675);
resetContainer = yScrollerContainer || realDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 676);
resetContainer.setStyle('width', '1px');
                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation
                    // if realDataTable has a width other than 1px
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 679);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 680);
realDataTable.setStyle('width', '1px');
                    }
                }
                
                // next setCellWidth can handle both with in pixels as well as in percent
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 685);
setCellWidth(width, true);
                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.
                
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 688);
widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 690);
width = instance.getColumnWidthPx(colIndex);
                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)
                // So, we need to redefine it again to both the col, as the colconfig.width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 693);
if (widthPxAttempt!==width) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transform it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 696);
setCellWidth((newWidthPercented ? Math.round(100*width/dtWidthWithBorder) : width), false);
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 699);
if (lastIndex>0) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 700);
if (bkpColWidth>0) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 701);
noWidthCol.setStyle('width', bkpColWidth+'px');
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 705);
resetContainer.setStyle('width', dtWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 706);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 707);
realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');
                    }
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 710);
newWidth = bkpDatatableWidth + width - prevWidthPx;
                
                // was there any change anyway? Then reset the tableUI
                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 714);
if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 715);
if (scrollY) {
                        // now set the innerwidth of the div inside scrollable TH
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 717);
scrollThDiv = instance._dtScrollLiners.item(colIndex);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 718);
scrollTh = scrollThDiv.get('parentNode');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 719);
corrected =  badColWidth ? width : (width -
                                                            getCellStyle(scrollThDiv, 'paddingLeft') -
                                                            getCellStyle(scrollThDiv, 'paddingRight') -
                                                            getCellStyle(scrollTh, 'borderLeftWidth') -
                                                            getCellStyle(scrollTh, 'borderRightWidth'));
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 724);
setColWidth(scrollThDiv, corrected);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 725);
if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 726);
if (instance._dtWidthDefined) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 727);
yScrollerContainer.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 728);
instance._checkRemainingColSpace();
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 731);
instance._syncYScrollerUI(newWidth);
                            }

                        }
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 737);
if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 738);
realDataTable.setStyle('width', newWidth+'px');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 739);
if (!instance._dtWidthDefined) {
                                // don't reset the datatable width during resize: this would take too much performance.
                                // Instead, during resize, we will reset the dt-width after resize:end
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 742);
instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 743);
instance._dtXScroller.setStyle('width', (newWidth)+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 744);
instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 747);
realDataTable.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 748);
instance._checkRemainingColSpace();
                            }
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 753);
if (lastIndex===0) {
                    // no widthchange, but we need to reset the width on the resetcontainer
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 755);
resetContainer.setStyle('width', prevWidthPx+'px');
                }}
                // to return the with in percent (when needed), transform width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 758);
if (newWidthPercented) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transfprm it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 761);
width = (100*width/dtWidthWithBorder).toFixed(2) + '%';
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 763);
if (!busyResize) {
                    /**
                     * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing
                     * @event colWidthChange
                     * @param {EventFacade} e Event object
                     * @param {Int} e.colIndex
                     * @param {Int} e.prevVal
                     * @param {Int} e.newVal
                    */
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 772);
dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue, newVal: width});
                }

            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 777);
width = prevWidthPercent || prevWidthPx;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 779);
return width;
        },

        /**
         * Syncs the DataTable's user interface.
         * Is used internally, but might be needed to call when the datatable content (header or cell) is changed
         * without using set('data') or set('columns'). For example, when you have images in the cells which content
         * is loaded, then the cellwidth will be changed after the true image is loaded. In those cases syncTableUI()
         * should be called afterwards.
         *
         * @method syncTableUI
         * @since 0.1
         *
        */
        syncTableUI : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "syncTableUI", 793);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 794);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 796);
if (!instance._widthChangeInternally) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 797);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 798);
instance._justifyTableWidth();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 800);
instance._widthChangeInternally = false;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "destructor", 809);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 810);
var instance = this,
                dt = instance.datatable,
                dtHandles = dt._eventHandles,
                sortable = dt.get('sortable');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 815);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 816);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 818);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 819);
instance._clearResizeEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 820);
instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);
            // now: in case of sortable datatable: we need to attach the original event again.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 822);
if (Lang.isBoolean(sortable) && sortable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 823);
dtHandles.sortUITrigger = dt.delegate(['click','keydown'],
                    Y.rbind('_onUITriggerSort', dt),
                    '.' + dt.getClassName('sortable', 'column'));
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_render", 842);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 843);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                xScrollableTable = (scrollAttrs==='x') || (scrollAttrs==='xy') || (scrollAttrs===true);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 848);
if (!xScrollableTable) {
                // always activate the xScroller --> this way we can controll the colwidths in a decent matter
                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes
                // the d-width to a defined value, the x-scroller is ready to be used imediately
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 852);
Y.use(
                    'datatable-scroll',
                    Y.bind(
                        function(Y) {
                            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 2)", 855);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 856);
dt.set('scrollable', (dt.get('scrollable')==='y') ? 'xy' : 'x');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 857);
this._initUI();
                        },
                        instance
                    )
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 864);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initUI", 877);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 878);
var instance = this,
                dt = instance.datatable;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 881);
if (dt.get('width')==='') {
                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt
                // The final tablewidth will be set after resizing
                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 886);
instance._dtWidthDefined = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 887);
instance._setDTWidthFromInternal(1);
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 890);
instance._dtWidthDefined = true;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 892);
instance._initPrivateVars();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 893);
instance._justifyTableWidth();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 894);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_bindUI", 904);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 905);
var instance = this,
                dt = instance.datatable,
                eventhandlers = instance._eventhandlers,
                sortable = dt.get('sortable'),
                currentSortEventHandler;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 911);
instance._activateColResizer({newVal: dt.get('colsresizable')});

            // Justify the tablewidth again after one of these changes:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 914);
eventhandlers.push(
                dt.after(
                    ['colsresizableChange'],
                    instance._activateColResizer,
                    instance
                )
            );

            // Justify the tablewidth again after one of these changes:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 923);
eventhandlers.push(
                dt.after(
                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],
                    instance.syncTableUI,
                    instance
                )
            );

            // Justify the tablewidth again after render view or when there is a columnChange
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 932);
eventhandlers.push(
                dt.after(
                    ['widthChange'],
                    instance._justifyTableAfterTableWidthChange,
                    instance
                )
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 940);
if (dt._scrollResizeHandle) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 941);
dt._scrollResizeHandle.detach();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 943);
dt._scrollResizeHandle = Y.on(
                'resize',
                instance._syncScrollUIPercentedDT,
                null,
                instance
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 950);
if (Lang.isBoolean(sortable) && sortable) {
                // first detach current handler
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 952);
currentSortEventHandler = dt._eventHandles.sortUITrigger;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 953);
if (currentSortEventHandler) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 954);
currentSortEventHandler.detach();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 955);
currentSortEventHandler = null;
                }
                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 958);
if (dt._theadNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 959);
eventhandlers.push(
                        dt.delegate(
                            'keydown',
                            Y.rbind(instance._triggerSort, instance),
                            '.' + dt.getClassName('sortable', 'column')
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 966);
eventhandlers.push(
                        dt.delegate(
                            'click',
                            Y.rbind(instance._triggerSort, instance),
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 3)", 970);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 971);
return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));
                            }
                        )
                    );
                }
            }
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_activateColResizer", 987);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 988);
var instance = this,
                colsresizable = e.newVal,
                resizeEventhandlers = instance._resizeEventhandlers,
                colsresizableDefined = Lang.isBoolean(colsresizable),
                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 994);
if (colsresizableDefined && !colsresizable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 995);
instance._clearResizeEventhandlers();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 998);
instance._allColsResizable = colsresizableDefined && colsresizable;
                // when the mouse moves, while not resizing, you might be entering the area where resizing may start
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1000);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1011);
resizeEventhandlers.push(
                    workingHeader.on(
                        'mouseleave',
                        instance._checkEndResizeApprovement,
                        instance
                    )
                );

                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1020);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1031);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncScrollUIPercentedDT", 1049);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1050);
var instance = this,
                dt = instance.datatable;

            // will always be during rendering dt, so we need to suppress first call
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1054);
if (instance._resizeEventMayOccur) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1055);
Y.rbind(dt._syncScrollUI, dt)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1056);
instance.syncTableUI();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1059);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_triggerSort", 1078);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1079);
var instance = this,
                dt = instance.datatable,
                contentBox = instance._dtContentBox,
                yScrollerContainer = instance._dtYScrollerContainer,
                realDataTable = instance._dtRealDataTable,
                prevYScrollerContainerWidth, prevRealDataTableWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1086);
if (instance._dtScrollY) {
                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount
                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort
                // YScrollerContainer and realDataTable get wrong values. We need to restore that
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1090);
prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1091);
prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1092);
Y.bind('_onUITriggerSort', dt, e)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1093);
yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1094);
realDataTable.setStyle('width', prevRealDataTableWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1095);
instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');
            }
            else  {
                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1099);
contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1100);
Y.bind('_onUITriggerSort', dt, e)();
                // clear width contentbox to prevent big page x-scroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1102);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_startResize", 1116);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1117);
var instance = this, dt,
                yScrollerContainer = instance._dtYScrollerContainer,
                resizeMargin, resizeMarginHalf, th, lastTh, allTh,
                mouseX, thWidth, thX, mouseInLeftNode;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1122);
if (instance._resizeApproved) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1123);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1124);
instance._comingFromResize = true;
                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1126);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumn,
                    instance
                );
                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.
                // we need to know this, because the column-resize handlers overlap 2 th-nodes.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1133);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1134);
resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1135);
resizeMarginHalf = Math.round(resizeMargin/2);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1136);
th = e.currentTarget;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1137);
lastTh = (th.next('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1138);
mouseX = e.pageX;
                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1140);
thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1141);
thX = th.getX();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1142);
mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1143);
if (mouseInLeftNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1144);
instance._leftThNode = th;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1145);
instance._leftThX = thX;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1146);
instance._mouseOffset = thX+thWidth-mouseX;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1149);
instance._leftThNode = th.previous('th');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1150);
instance._leftThX = instance._leftThNode.getX();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1151);
instance._mouseOffset = thX-mouseX;
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1153);
allTh = th.get('parentNode').all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1154);
instance._leftColIndex = allTh.indexOf(instance._leftThNode);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1155);
instance._initialColWidth = instance.getColumnWidthPx(instance._leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1156);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_stopResize", 1174);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1175);
var instance = this,
                dt = instance.datatable,
                finalColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1179);
if (instance._busyResize) {
                // resizing will be ending. Fire event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1181);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1182);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1184);
finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1185);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1186);
instance._changeUnselectableIE(false);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1187);
instance._checkResizeAprovement(e);
                // Don't know why, but we need to e.halt in order to fire a new event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1189);
e.halt();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1190);
if (instance._initialColWidth !== finalColWidth) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1191);
dt.fire('colWidthChange', {colIndex: instance._leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                }
                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1194);
Y.later(
                    200,
                    instance,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 4)", 1197);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1198);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkResizeAprovement", 1214);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1215);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1216);
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

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1229);
fromLeft = mouseX-thX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1230);
fromRight = thX+thWidth-mouseX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1231);
insideLeftArea = (fromLeft<resizeMarginHalf);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1232);
insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1233);
leftSideFirstTh = insideLeftArea && (th.previous('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1234);
instance._resizeApproved = ((insideLeftArea || insideRightArea)
                    && !leftSideFirstTh
                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1238);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_resizeColumn", 1253);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1254);
if (this._busyResize) {
                // preventDefault, because in case of touch-event, the screen would have been moved.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1256);
e.preventDefault();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1257);
var instance = this,
                    leftColIndex = instance._leftColIndex,
                    lastColIndex = instance._lastColIndex,
                    prevWidth = instance.getColumnWidthPx(leftColIndex),
                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),
                    distributedSpace = instance._distributedSpace,
                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;

                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1266);
if (leftColIndex===lastColIndex) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1267);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1268);
widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1269);
widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1270);
noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)
                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1273);
if (!noaction) {
                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.
                    // This would be the case if compairContainer.width>xScroller.width
                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width
                    // corrected by instance._distributedSpace
                    // This could happen when the mouse moves very quick to the left
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1279);
if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1280);
setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1282);
if (instance.columnWidthIsPercent(leftColIndex) && instance._dtWidthDefined) {
                        // set the new size in percent and NOT in pixels
                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1285);
dtWidthWithBorder = parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1286);
setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1287);
prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1289);
newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1290);
if (prevWidth!==newWidth) {
                        /**
                         * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing
                         * @event resize:colWidthChange
                         * @param {EventFacade} e Event object
                         * @param {Int} e.colIndex
                         * @param {Int} e.prevVal
                         * @param {Int} e.newVal
                        */
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1299);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkEndResizeApprovement", 1316);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1317);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1319);
if (instance._resizeApproved && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1320);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_endResizeApprovement", 1333);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1334);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1336);
instance._resizeApproved = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1337);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initPrivateVars", 1350);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1351);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1356);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1357);
instance._dtBoundingBox = dt.get('boundingBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1358);
instance._dtContentBox = contentBox = dt.get('contentBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1359);
instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1360);
instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1361);
instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1362);
instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1363);
instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1364);
instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1365);
instance._dtRealDataTableTHNodes = allThRealHeader.all('th');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1366);
colgroupNode = contentBox.one('colgroup');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1367);
instance._dtColNodes = colgroupNode && colgroupNode.all('col');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1368);
instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1369);
instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1370);
instance._dtScrollY = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);
        },


        /**
         * Justifies the tablewidth: will be called after datatable.changeWidth-event.
         *
         * @method _justifyTableAfterTableWidthChange
         * @since 0.1
         *
        */
        _justifyTableAfterTableWidthChange : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableAfterTableWidthChange", 1381);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1382);
var instance = this,
                dt = instance.datatable;

            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1386);
if (!instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1387);
if (dt.get('width')==='') {
                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to
                    // expansion of the dt
                    // The final tablewidth will be set after resizing
                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1393);
instance._dtWidthDefined = false;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1394);
instance._setDTWidthFromInternal(1);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1397);
instance._dtWidthDefined = true;
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1399);
instance.syncTableUI();
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableWidth", 1412);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1413);
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

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1426);
if (!dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1427);
xScroller.setStyle('overflowX', 'hidden');
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1430);
instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;

            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths
            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1434);
realDataTable.setStyle('width', '1px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1435);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1436);
yScrollerContainer.setStyle('width', '1px');
            }


            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1441);
totalWidth = instance._transformAllColumnWidthToPixels();

            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels
            // but just in case there are roundingerrors we set it exactly to 0
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1445);
if (instance._distributedSpace>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1446);
instance._distributedSpace = 0;
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1449);
if (scrollY) {
                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.
                // We need to capture this behaviour when we want to repositions the y-scrollbar
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1452);
scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1453);
instance._scrollbarOffset = scrollbarOffset = (
                    scrollTheaders
                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)
                ) || 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1457);
totalWidth += scrollbarOffset;
                // in this stage, we need to set the width of yScrollerContainer
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1459);
yScrollerContainer.setStyle('width', totalWidth + 'px');
            }

            // in this stage, we need to set the width of realDataTable
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1463);
realDataTable.setStyle('width', totalWidth + 'px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1464);
totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1466);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1467);
dtScrollHeader.all('th').each(
                    function(th, index) {
                        // add the resizeclass to the th-elements of the scrollable header
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 5)", 1468);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1470);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1471);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1475);
yScrollBar.setStyle('width', '16px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1476);
instance._syncYScrollerUI(totalWidth);
            }
            else {
                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1480);
allThRealHeader.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 6)", 1481);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1482);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1483);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1486);
if (!dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1487);
instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1490);
instance._checkRemainingColSpace();
                }
            }
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_changeUnselectableIE", 1504);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1505);
var instance = this,
                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,
                headerList = headers && headers.all('th'),
                unselectableBkpList = instance._unselectableBkpList,
                bkpMade;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1511);
if (Y.UA.ie>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1512);
bkpMade = (unselectableBkpList.length>0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1513);
headerList.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 7)", 1514);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1515);
if (noSelect && !bkpMade) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1516);
instance._unselectableBkpList.push(th.get('unselectable') || '');
                        }
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1518);
th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));
                    },
                    instance
                );
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_transformAllColumnWidthToPixels", 1534);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1535);
var instance = this,
                dt = instance.datatable,
                dtWidthWithBorder = parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH,
                notSpecCols = instance._notSpecCols,
                usedSpace = 0,
                remainingSpace = 0,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                width, configWidth, colConfigObject, percentWidth, total, thcell,
                storedPercentedWidth, expansion, definedColWidth, percentedIsStored;
            
            // prevent expanding last cell at this stage:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1546);
instance._busyTransformAllColumnWidthToPixels = true;
            // empty current definition of notspeccols:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1548);
notSpecCols.length = 0;
            
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1550);
allThRealHeader.each(
                function(th, index) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 8)", 1551);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1552);
colConfigObject = dt.getColumn(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1553);
configWidth = colConfigObject && colConfigObject.width;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1554);
percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1555);
thcell = allThRealHeader && allThRealHeader.item(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1556);
expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1557);
storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1558);
percentedIsStored = (storedPercentedWidth.length>0);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1559);
definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1560);
if (definedColWidth===DATAYES) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1561);
if (percentWidth || percentedIsStored) {
                            // transform to pixels. BUT also need to store that the column was in percent!
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1563);
if (percentedIsStored) {
                                // retake the percents instead of the set pixels
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1565);
configWidth = storedPercentedWidth;
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1567);
if (thcell) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1568);
thcell.setData(PERCENTEDWIDTHDATA, configWidth);
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1570);
if (instance._dtWidthDefined) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1571);
configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';
                            }
                            else {
                                // treat as null, the width will be unpredictable: thus the col needs to be as small as posible
                                // just as if configWidth would have been undefined
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1576);
configWidth = null;
                            }
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1580);
if (thcell) {
                                // reset
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1582);
thcell.setData(PERCENTEDWIDTHDATA, null);
                            }
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1586);
if (configWidth && (definedColWidth===DATAYES)) {
                        // width is defined in objectconfig
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1588);
width = parseInt(configWidth, 10) - expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1589);
usedSpace += instance.setColumnWidth(index, width);
                    }
                    else {
                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1593);
notSpecCols.push(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1594);
if (thcell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1595);
thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);
                        }
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1600);
if (notSpecCols.length>0) {
                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1602);
remainingSpace = 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1603);
YArray.each(
                    notSpecCols,
                    function(colIndex) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 9)", 1605);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1606);
remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1610);
total = usedSpace + remainingSpace;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1611);
instance._busyTransformAllColumnWidthToPixels = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1612);
return total;
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkRemainingColSpace", 1624);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1625);
var instance = this,
                xScroller = instance._dtXScroller,
                prevDistributedSpace = instance._distributedSpace,
                widthViewport = parseInt(xScroller.getStyle('width'), 10),
                distributeSpace, compairContainer, widthCompairContainer;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1631);
if (instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1632);
instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1633);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1634);
widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1635);
distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1636);
xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1637);
distributeSpace = Math.max(0, distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1638);
compairContainer.setStyle('width', widthViewport+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1639);
instance._distributeRemainingSpace(distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1640);
instance._busyDistributeRemainingSpace = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1641);
widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1642);
if (instance._dtScrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1643);
instance._syncYScrollerUI(widthCompairContainer, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1646);
instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');
                }
                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1649);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_distributeRemainingSpace", 1662);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1663);
var instance = this,
                notSpecCols = instance._notSpecCols,
                notSpecColSize = notSpecCols.length,
                correction, lastColCorrection;

            // instance._distributedSpace will be filled during resizing cols
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1669);
if (notSpecColSize>0) {
                // remaining space needs to be added to the undefined colls
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1671);
correction = Math.round(amount/notSpecColSize);
                // due to roundingdifferences, not all space might be added. Therefore we need an extra check
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1673);
lastColCorrection = correction + amount - (correction*notSpecColSize);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1674);
YArray.each(
                    notSpecCols,
                    function(colIndex, item) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 10)", 1676);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1677);
var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1678);
instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1683);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_expandLastCell", 1696);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1697);
var instance = this,
                lastColIndex = instance._lastColIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1700);
instance.setColumnWidth(lastColIndex, instance.getColumnWidthPx(lastColIndex, true), expand);
        },

        /**
         * Syncs the YScroller-UI after a column changes its width.
         * @method _syncYScrollerUI
         * @param {int} tableWidth width of the datatable visible area, without outside datatable-borders
         * @param {boolean} [comesFromCheckRemainingColSpace] internally used to mark when function is called from this._checkRemainingColSpace
         * @since 0.1
        */
        _syncYScrollerUI : function(tableWidth, comesFromCheckRemainingColSpace) {
            // always scrollabeY when called
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncYScrollerUI", 1710);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1712);
var instance = this,
                realDataTable = instance._dtRealDataTable,
                yScrollerContainer = instance._dtYScrollerContainer,
                prevWidthYScrollerContainer, xScrollerWidth;

            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1718);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1719);
if (instance._dtWidthDefined) {
                    // dt has width either in percent or pixels
                    // never sync to values below xScroller-width
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1722);
xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1723);
tableWidth = Math.max(tableWidth, xScrollerWidth);
/*
if ((tableWidth>xScrollerWidth) && (tableWidth<(xScrollerWidth+instance._scrollbarOffset))) {
var dt = instance.datatable;
    Y.rbind(dt._syncScrollUI, dt)();
}
*/
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1730);
realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1733);
instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1734);
instance._dtXScroller.setStyle('width', tableWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1735);
instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');
                }
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                // now resizing
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1739);
prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1740);
yScrollerContainer.setStyle('width', tableWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1742);
instance._dtYScroller.setStyle('width', tableWidth+'px');
                // prevent looping by checking comesFromSetVisibilityXScroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1744);
if (!comesFromCheckRemainingColSpace) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1745);
instance._checkRemainingColSpace(prevWidthYScrollerContainer);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1747);
if (!instance._dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1748);
instance.datatable._syncScrollUI();
                }
                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1751);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getThCel", 1762);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1763);
var instance = this,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1767);
if (!Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1768);
colIndex = instance._getColIndexFromName(name);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1770);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getColIndexFromName", 1780);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1781);
var instance = this,
                dt, colConfigObject, columns, colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1784);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1785);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1786);
colConfigObject = dt.getColumn(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1787);
columns = dt.get('columns');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1788);
colIndex = YArray.indexOf(columns, colConfigObject);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1790);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_setDTWidthFromInternal", 1804);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1805);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                prevWidthRealDataTable;

            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()
            // we don't need to restore this width anyway at that point.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1812);
if (!instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1813);
prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1814);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1815);
dt.set('width', newWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1816);
instance._widthChangeInternally = false;
                // now set instance._dtWidthDefined to false again, because it was false and is set to true!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1818);
instance._dtWidthDefined = false;
                // always reset the realdatatable, because it wis resetted by dt.set(width)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1820);
if (realDataTable) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1821);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearResizeEventhandlers", 1836);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1837);
YArray.each(
                this._resizeEventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 11)", 1839);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1840);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearEventhandlers", 1853);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1854);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 12)", 1856);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1857);
item.detach();
                }
            );
        }

    }, {
        NS : 'itsadtcr',
        ATTRS : {

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value correspons with an area that overlaps 2 columns (50% each)<br>
             * Has the dame purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 10
             * @attribute resizeMargin
             * @type int
             * @since 0.1
            */
            resizeMargin: {
                value: 10,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1880);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1881);
return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            /**
             * @description Width of the area where you can resize in touchdevices.<br>
             * The value correspons with an area that overlaps 2 columns (50% each)<br>
             * Has the dame purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 20
             * @attribute resizeMarginTouchDevice
             * @type int
             * @since 0.1
            */
            resizeMarginTouchDevice: {
                value: 20,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1899);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1900);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1915);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1916);
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
