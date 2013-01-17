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
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].code=["YUI.add('gallery-itsadtcolumnresize', function (Y, NAME) {","","'use strict';","","/**"," * DataTable ColumnResize Plugin"," *"," *"," * @module gallery-itsadtcolumnresize"," * @class Plugin.ITSADTColumnResize"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal list that holds resize-event-references"," * @property _resizeEventhandlers"," * @private"," * @type Array"," */","","/**"," * Internal flag that states if datatable.get('colsresizable')===true"," * @property _allColsResizable"," * @private"," * @type Boolean"," */","","/**"," * plugin's host DataTable"," * @property datatable"," * @type Y.DataTable"," */","","/**"," * Internal flag that tells whether the browsers does a bad colwidth calculation (Opera, IE6, IE7).<br>"," * Determined by featuretest."," * @property _badColWidth"," * @type boolean"," * @private"," */","","/**"," * Node-reference to datatable's <col> elemets within <colgroup>"," * @property _dtColNodes"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-columns"," * @property _dtRealDataTableHeader"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's parentNode"," * @property _datatableParentNode"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's boundingbox"," * @property _dtBoundingBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's contentbox"," * @property _dtContentBox"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-x-scroller"," * @property _dtXScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller"," * @property _dtYScroller"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scrollbar"," * @property _dtYScrollBar"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-y-scroller-container"," * @property _dtYScrollerContainer"," * @type Y.Node"," * @private"," */","","/**"," * Node-reference to datatable's .yui3-datatable-scroll-columns"," * @property _dtScrollHeader"," * @type Y.Node"," * @private"," */","","/**"," * NodeList-reference to all datatable's .yui3-datatable-scroll-liner"," * @property _dtScrollLiner"," * @type Y.Node"," * @private"," */","","/**"," * Flag that tells whether DataTable is y-scrollable"," * @property _dtScrollY"," * @type Boolean"," * @private"," */","","/**"," * Flag that tells whether resize may start when the mouse gets pressed"," * @property _resizeApproved"," * @private"," * @type Boolean"," */","","/**"," * Flag that tells whether resizing is going on"," * @property _busyResize"," * @private"," * @type Boolean"," */","","/**"," * th-Node on the left side while resizing"," * @property _leftThNode"," * @private"," * @type Y.Node"," */","","/**"," * screens x-pos of the left th-Node while resizing (Y.Node.getX())"," * @property _leftThX"," * @private"," * @type int"," */","","/**"," * Mouse-offset compared to columnborder when starting to resize"," * @property _mouseOffset"," * @private"," * @type int"," */","","/**"," * index of the left th-Node while resizing"," * @property _leftColIndex"," * @private"," * @type int"," */","","/**"," * index of the most right th-Node"," * @property _lastColIndex"," * @private"," * @type int"," */","","/**"," * backup of the th-width before resize starts. This value is passed as prevVal when the event 'colWidthChange' is fired"," * @property _initialColWidth"," * @private"," * @type int"," */","","/**"," * Internal flag that tells whether distributeRemainingSpace is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace() because we could get into a loop"," * @property _busyDistributeRemainingSpace"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether transformAllColumnWidthToPixels is going on. In such situations,"," * we don't need (and want) to call this._checkRemainingColSpace()"," * @property _busyTransformAllColumnWidthToPixels"," * @private"," * @type boolean"," */","","/**"," * horizontal offset of the y-scrollbar (in case of y-scrollable datatable)"," * @property _scrollbarOffset"," * @private"," * @type int"," */","","/**"," * Reference to Y.one('body')"," * @property _bodyNode"," * @private"," * @type Y.Node"," */","","/**"," * internal flag that will prevent sorting columns while resizing"," * @property _comingFromResize"," * @private"," * @type boolean"," */","","/**"," * The value that -in case of x-scroller- is automaticly added to fill the table when other columns decreased the width in a way that"," * the total tablewidth needed to increase by enlargin the last col."," * @property _distributedSpace"," * @private"," * @type int"," */","","/**"," * Holds the backupvalues of 'unselectable' of the th-elements in case of IE. Will be restored after resizing"," * @property _unselectableBkpList"," * @private"," * @type Array"," */","","/**"," * Holds the configindexes of the colls that have no width specified. Used internally to distribute the remaining space after a colwidthchange"," * @property _notSpecCols"," * @private"," * @type int[]"," */","","/**"," * Internal flag that tells whether the datatable has its width-attribute defined"," * @property _dtWidthDefined"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether the datatable has its width-attribute in percent"," * @property _dtWidthIsPercented"," * @private"," * @type boolean"," */","","/**"," * Internal flag that tells whether datatable.widthChange is called from intern."," * To prevent event to call this._justifyTableWidth() in those cases."," * @property _widthChangeInternally"," * @private"," * @type boolean"," */","","","","","var Lang = Y.Lang,","    YArray = Y.Array,","    RESIZABLE_COLUMN_CLASS = 'itsa-resizable-col',","    DATATABLE_BUSY_RESIZING_CLASS = 'yui3-datatable-itsacolresizing',","    PERCENTEDWIDTHDATA = 'itsa_width_percented',","    EXPANSIONDATA = 'itsa_expansion',","    DEFINEDCOLWIDTHDATA = 'itsa_defined_col_width_data',","    DATAYES = 'yes',","    DATANO = 'no',","    DATATABLE_BORDERWIDTH = 2;","","Y.namespace('Plugin').ITSADTColumnResize = Y.Base.create('itsadtcolumnresize', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        _resizeEventhandlers : [],","        _allColsResizable : null,","        datatable : null,","        _badColWidth : null,","        _dtWidthDefined : null,","        _dtWidthIsPercented : null,","        _dtColNodes : null,","        _datatableParentNode : null,","        _dtBoundingBox : null,","        _dtContentBox : null,","        _dtXScroller : null,","        _dtYScroller : null,","        _dtYScrollBar : null,","        _dtYScrollerContainer : null,","        _dtRealDataTableHeader : null,","        _dtScrollHeader : null,","        _dtScrollLiners : null,","        _dtScrollY : null,","        _resizeApproved: false,","        _busyResize : false,","        _leftThNode : null,","        _leftThX : null,","        _mouseOffset : null,","        _leftColIndex : null,","        _lastColIndex : null,","        _initialColWidth : null,","        _busyDistributeRemainingSpace : null,","        _busyTransformAllColumnWidthToPixels : null,","        _scrollbarOffset : 0,","        _bodyNode : null,","        _comingFromResize : null,","        _widthChangeInternally : null,","        _unselectableBkpList : [],","        _distributedSpace : 0,","        _notSpecCols : [],","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","            instance.datatable = instance.get('host');","            instance._badColWidth = Y.Features.test('table', 'badColWidth');","            if (instance.datatable.get('rendered')) {","                instance._render();","            }","            else {","                instance.afterHostEvent('render', instance._render, instance);","            }","        },","","        /**","         * Transforms the columnwidth to percent. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPercent: function(name) {","            var instance = this,","                newValue, expansion;","","            if (instance._dtWidthDefined && !instance.columnWidthIsPercent(name)) {","                newValue = instance.getColumnWidthPercent(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to pixels. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToPixels: function(name) {","            var instance = this,","                newValue, expansion;","","            if (instance._dtWidthDefined && !instance.columnWidthIsPixels(name)) {","                newValue = instance.getColumnWidthPx(name, true);","                expansion = instance.getColumnExpansion(name);","                instance.setColumnWidth(name, newValue, expansion);","            }","        },","","        /**","         * Transforms the columnwidth to undefined. Doesn't change the occupied colspace, but an undefined width will lead to","         * adding expansion when other cols get width-changes. Can only be done if the DataTable has a defined width (either in pixels or percent)","         * Does not return result, because you would have to define whether you want the result with or without added expansion","         * (extra space that might be added to the column in order to make it fit the DataTable-width)","         * @method transformToPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        transformToUndefinedWidth: function(name) {","            var instance = this,","                thcell, newValue;","","            if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {","                newValue = instance.getColumnWidthPx(name);","                instance.setColumnWidth(name, newValue);","                thcell = this._getThCel(name);","                if (thcell) {","                    thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                }","            }","        },","","        /**","         * @method columnWidthIsPercent","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in percent. Returns false if in pixels or undefined","         * @since 0.1","        */","        columnWidthIsPercent: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            return (storedPercentedWidth.length>0);","        },","","        /**","         * @method columnWidthIsPixels","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined","         * @since 0.1","        */","        columnWidthIsPixels: function(name) {","            var thcell = this._getThCel(name),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return definedColWidth && (storedPercentedWidth.length===0);","        },","","        /**","         * @method columnWidthIsUndefined","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @return {boolean} whether the width is undefined","         * @since 0.1","        */","        columnWidthIsUndefined: function(name) {","            var thcell = this._getThCel(name),","                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","","            return !definedColWidth;","        },","","        /**","         * @method getColumnConfigWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null","         * @since 0.1","        */","        getColumnConfigWidth: function(name) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                columns = dt.get('columns'),","                colIndex = YArray.indexOf(columns, colConfigObject),","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","","            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.","            return (colConfigObject && ((storedPercentedWidth.length>0) ? storedPercentedWidth : colConfigObject.width)) || null;","        },","","        /**","         * Retreives the true col-width in pixels, exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPx","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {int} columnwidth in pixels","         * @since 0.1","        */","        getColumnWidthPx: function(name, withoutExpansion) {","            var instance = this,","                dt = instance.datatable,","                colConfigObject = dt.getColumn(name),","                allThHeader = instance._dtRealDataTableTHNodes,","                expansion = 0,","                colwidth = 0,","                cell;","","            if (colConfigObject && colConfigObject.width) {","                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px","                colwidth = parseInt(colConfigObject.width, 10) || 0;","            }","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;","            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth","            if (!instance._busyDistributeRemainingSpace) {","                colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));","            }","            return colwidth - expansion;","        },","","        /**","         * Retreives the true col-width in percent (in comparison to the DataTable-width) exact as is occupied on the screen.<br>","         * Some cols might have been expanded to fit a fixed DataTable-width. To retreive the colwith without this","         * expansion, you can set withoutExpansion=true.","         * @method getColumnWidthPercent","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {Boolean} [withoutExpansion] (defaults false) some cols may be expanded to fit the total datatablewidth.<br>","         * These are cols that have undefined width-settings themselves, or -if no undefined col- the last column.<br>","         * This expansion will be part of the width, because it is the true width on the screen. When set to true, you retreive<br>","         * the original width without the expansion, which is in fact the width that will be reached if the column can get narrower","         * for exampele when other column is set wider and no expansion is required.","         * @return {String} columnwidth in percent","         * @since 0.1","        */","        getColumnWidthPercent: function(name, withoutExpansion) {","            var instance = this,","                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH)","                                    : instance._datatableParentNode.get('offsetWidth'),","                width = instance.getColumnWidthPx(name, withoutExpansion);","","            return (100*width/dtWidthWithBorder).toFixed(2) + '%';","        },","","        /**","         * Retreives the expansion of the column in pixels. Some cols might have been expanded to fit a fixed DataTable-width.","         * @method getColumnExpansion","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @return {int} expansion in pixels","         * @since 0.1","        */","        getColumnExpansion: function(name) {","            var instance = this,","                allThHeader = instance._dtRealDataTableTHNodes,","                cell;","","            if (typeof name === 'string') {","                cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);","            }","            else if (Lang.isNumber(name)) {","                cell = allThHeader && allThHeader.item(name);","            }","            return (cell && cell.getData(EXPANSIONDATA)) || 0;","        },","","        /**","         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.","         *","         * @method setColumnWidth","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @param {int|String} width new width in pixels or percent. Numbers are treated as pixels","         * @param {int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.","         * @param {int} [fireInPercent] Only to be set internally: force the widthChange-event to fire e.newVal in percent","         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set","         * @since 0.1","        */","        setColumnWidth: function (name, width, expansion, fireInPercent) {","            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the","            // width style to the cells directly, allowing padding and borders to","            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all","            // make the rendered width equal the col's style width, reducing the","            // cells' calculated width.","            var instance = this,","                colIndex = Lang.isNumber(name) ? name : instance._getColIndexFromName(name),","                prevWidthPx = instance.getColumnWidthPx(colIndex),","                dt = instance.datatable,","                dtContentBox = instance._dtContentBox,","                allColl = instance._dtColNodes,","                col       = allColl && allColl.item(colIndex),","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                scrollY = instance._dtScrollY,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                thcell = allThRealHeader && allThRealHeader.item(colIndex),","                prevExpansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0,","                busyResize = instance._busyResize,","                dtWidth = parseInt(instance._dtXScroller.getStyle('width'), 10),","                dtWidthWithBorder = instance._dtWidthDefined ? (dtWidth + DATATABLE_BORDERWIDTH) : instance._datatableParentNode.get('offsetWidth'),","                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,","                colConfig = dt.getColumn(colIndex),","                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',","                prevWidthPercented = (prevWidthPercent.length>0),","                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),","                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,","                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,","                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;","","            expansion = expansion || 0;","            width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);","            widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);","            widthTypeChange = (newWidthPercented!==prevWidthPercented);","            expansionChange = (expansion!==prevExpansion);","            badColWidth = instance._badColWidth;","","            if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)","                && (width>=instance.get('minColWidth'))) {","","                getCellStyle = function (element, prop, nonComputed) {","                    return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);","                };","","                setColWidth = function (element, newColWidth) {","                    var corrected = 0,","                        cell;","                    if (badColWidth) {","                        cell = dt.getCell([0, colIndex]);","                        if (cell) {","                            corrected =  getCellStyle(cell, 'paddingLeft') +","                                         getCellStyle(cell, 'paddingRight') +","                                         getCellStyle(cell, 'borderLeftWidth') +","                                         getCellStyle(cell, 'borderRightWidth');","                        }","                    }","                    newColWidth -= corrected;","                    element.setStyle('width', newColWidth + 'px');","                };","","                setCellWidth = function(cellwidth, withExpansion) {","                    var prevExpansion;","                    // only when we are sure we manually set the width, then mark the thNode's widthPercented","                    if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                        if (newWidthPercented) {","                            // store the percented width and continue calculating with the width in pixels","                            thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');","                            cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);","                        }","                        else {","                            thcell.setData(PERCENTEDWIDTHDATA, null);","                        }","                    }","                    if (withExpansion) {","                        cellwidth += expansion;","                        prevExpansion = thcell.getData(EXPANSIONDATA) || 0;","                        thcell.setData(EXPANSIONDATA, expansion);","                        instance._distributedSpace += expansion - prevExpansion;","                        // only when we are sure we manually set the width, then mark the thNode as DATAYES","                        if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);","                        }","                    }","                    if (colConfig) {","                        colConfig.width = cellwidth+'px';","","                    }","                    setColWidth(col, cellwidth);","                };","","                if (!busyResize) {","                    // store previous value, because it will be event-fired","                    // do not use variable prevWidthPercent, for this one doesn't have expansion included","                    eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;","                }","","                // now, also for scrollheaders - if they are available","                if (scrollY) {","                    tableToBackup = yScrollerContainer;","                }","                else {","                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,","                    // the realDataTable-width will change to 100% when a user is resorting.","                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.","                    tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;","                }","","                bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);","","                lastIndex = allColl ? (allColl.size()-1) : 0;","                if (lastIndex>0) {","                    // do not perform this workarround when you have only 1 column","                    noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);","                    bkpColWidth = getCellStyle(noWidthCol, 'width', true);","                    noWidthCol.setStyle('width', '');","                }","                else {","                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,","                    // but to 1px (safari ans chrome would otherwise fail)","                    resetContainer = yScrollerContainer || realDataTable;","                    resetContainer.setStyle('width', '1px');","                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation","                    // if realDataTable has a width other than 1px","                    if (scrollY) {","                        realDataTable.setStyle('width', '1px');","                    }","                }","                ","                // next setCellWidth can handle both with in pixels as well as in percent","                setCellWidth(width, true);","                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.","                ","                widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;","","                width = instance.getColumnWidthPx(colIndex);","                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)","                // So, we need to redefine it again to both the col, as the colconfig.width","                if (widthPxAttempt!==width) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transform it again","                    setCellWidth((newWidthPercented ? Math.round(100*width/dtWidthWithBorder) : width), false);","                }","","                if (lastIndex>0) {","                    if (bkpColWidth>0) {","                        noWidthCol.setStyle('width', bkpColWidth+'px');","                    }","                }","                else {","                    resetContainer.setStyle('width', dtWidth+'px');","                    if (scrollY) {","                        realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');","                    }","                }","                newWidth = bkpDatatableWidth + width - prevWidthPx;","                ","                // was there any change anyway? Then reset the tableUI","                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable","                if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {","                    if (scrollY) {","                        // now set the innerwidth of the div inside scrollable TH","                        scrollThDiv = instance._dtScrollLiners.item(colIndex);","                        scrollTh = scrollThDiv.get('parentNode');","                        corrected =  badColWidth ? width : (width -","                                                            getCellStyle(scrollThDiv, 'paddingLeft') -","                                                            getCellStyle(scrollThDiv, 'paddingRight') -","                                                            getCellStyle(scrollTh, 'borderLeftWidth') -","                                                            getCellStyle(scrollTh, 'borderRightWidth'));","                        setColWidth(scrollThDiv, corrected);","                        if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {","                            if (instance._dtWidthDefined) {","                                yScrollerContainer.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                            else {","                                instance._syncYScrollerUI(newWidth);","                            }","","                        }","                    }","                    else {","                        if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {","                            realDataTable.setStyle('width', newWidth+'px');","                            if (!instance._dtWidthDefined) {","                                // don't reset the datatable width during resize: this would take too much performance.","                                // Instead, during resize, we will reset the dt-width after resize:end","                                instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);","                                instance._dtXScroller.setStyle('width', (newWidth)+'px');","                                instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');","                            }","                            else {","                                realDataTable.setStyle('width', newWidth+'px');","                                instance._checkRemainingColSpace();","                            }","                        }","                    }","                }","                else if (lastIndex===0) {","                    // no widthchange, but we need to reset the width on the resetcontainer","                    resetContainer.setStyle('width', prevWidthPx+'px');","                }","                // to return the with in percent (when needed), transform width","                if (newWidthPercented) {","                    // next setCellWidth we must take care: width is transformed to pixels.","                    // in case of percent, we need to transfprm it again","                    width = (100*width/dtWidthWithBorder).toFixed(2) + '%';","                }","                if (!busyResize) {","                    /**","                     * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing","                     * @event colWidthChange","                     * @param {EventFacade} e Event object","                     * @param {Int} e.colIndex","                     * @param {Int} e.prevVal","                     * @param {Int} e.newVal","                    */","                    // CAUTIOUS: if (fireInPercent && !newWidthPercented), then width is still in pixels, but we need percents to be fired!","                    dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue,","                             newVal: (fireInPercent && !newWidthPercented) ? (100*width/dtWidthWithBorder).toFixed(2)+'%' : width});","                }","","            }","            else {","                width = prevWidthPercent || prevWidthPx;","            }","            return width;","        },","","        /**","         * Syncs the DataTable's user interface.","         * Is used internally, but might be needed to call when the datatable content (header or cell) is changed","         * without using set('data') or set('columns'). For example, when you have images in the cells which content","         * is loaded, then the cellwidth will be changed after the true image is loaded. In those cases syncTableUI()","         * should be called afterwards.","         *","         * @method syncTableUI","         * @since 0.1","         *","        */","        syncTableUI : function() {","            var instance = this;","","            if (!instance._widthChangeInternally) {","                instance._widthChangeInternally = true;","                instance._justifyTableWidth();","            }","            instance._widthChangeInternally = false;","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this,","                dt = instance.datatable,","                dtHandles = dt._eventHandles,","                sortable = dt.get('sortable');","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance._clearResizeEventhandlers();","            instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);","            // now: in case of sortable datatable: we need to attach the original event again.","            if (Lang.isBoolean(sortable) && sortable) {","                dtHandles.sortUITrigger = dt.delegate(['click','keydown'],","                    Y.rbind('_onUITriggerSort', dt),","                    '.' + dt.getClassName('sortable', 'column'));","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Calls _initUI but only after checking -and modifying- the x-scroller.","         * This means: We ALWAYS want a x-scroller in cases the DataTable has a defined width.","         *","         * @method _render","         * @private","         * @since 0.1","         *","        */","        _render: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                xScrollableTable = scrollAttrs && (scrollAttrs.indexOf('x')>-1);","","            if (!xScrollableTable) {","                // always activate the xScroller --> this way we can controll the colwidths in a decent matter","                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes","                // the d-width to a defined value, the x-scroller is ready to be used imediately","                Y.use(","                    'datatable-scroll',","                    Y.bind(","                        function(Y) {","                            dt.set('scrollable', (scrollAttrs && (scrollAttrs.indexOf('y')>-1)) ? 'xy' : 'x');","                            this._initUI();","                        },","                        instance","                    )","                );","            }","            else {","                instance._initUI();","            }","        },","","        /**","         * Does the initialisation of the UI in a way that we can use predictable colwidths.","         * Will call _bindUI() afterwards.","         *","         * @method _initUI","         * @private","         * @since 0.1","         *","        */","        _initUI : function() {","            var instance = this,","                dt = instance.datatable,","                dtWidth = dt.get('width');","","            if (dtWidth==='') {","                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt","                // The final tablewidth will be set after resizing","                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                instance._dtWidthDefined = false;","                instance._setDTWidthFromInternal(1);","            }","            else {","                instance._dtWidthDefined = true;","                instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');","            }","            instance._initPrivateVars();","            instance._justifyTableWidth();","            instance._bindUI();","        },","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                dt = instance.datatable,","                eventhandlers = instance._eventhandlers,","                sortable = dt.get('sortable'),","                currentSortEventHandler;","","            instance._activateColResizer({newVal: dt.get('colsresizable')});","","            // Justify the tablewidth again after one of these changes:","            eventhandlers.push(","                dt.after(","                    ['colsresizableChange'],","                    instance._activateColResizer,","                    instance","                )","            );","","            // Justify the tablewidth again after one of these changes:","            eventhandlers.push(","                dt.after(","                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],","                    instance.syncTableUI,","                    instance","                )","            );","","            // Justify the tablewidth again after render view or when there is a columnChange","            eventhandlers.push(","                dt.after(","                    ['widthChange'],","                    instance._justifyTableAfterTableWidthChange,","                    instance","                )","            );","","            if (dt._scrollResizeHandle) {","                dt._scrollResizeHandle.detach();","            }","","            dt._scrollResizeHandle = Y.on(","                'resize',","                Y.rbind(instance._syncScrollUIPercentedDT, instance)","            );","","            if (Lang.isBoolean(sortable) && sortable) {","                // first detach current handler","                currentSortEventHandler = dt._eventHandles.sortUITrigger;","                if (currentSortEventHandler) {","                    currentSortEventHandler.detach();","                    currentSortEventHandler = null;","                }","                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area","                if (dt._theadNode) {","                    eventhandlers.push(","                        dt.delegate(","                            'keydown',","                            Y.rbind(instance._triggerSort, instance),","                            '.' + dt.getClassName('sortable', 'column')","                        )","                    );","                    eventhandlers.push(","                        dt.delegate(","                            'click',","                            Y.rbind(instance._triggerSort, instance),","                            function() {","                                return (!instance._comingFromResize && this.hasClass(dt.getClassName('sortable', 'column')));","                            }","                        )","                    );","                }","            }","        },","","        /**","         * Binds events which make resizing of the columns posible, or deactivate","         *","         * @method _activateColResizer","         * @private","         * @param {e} eventFacade","         * @since 0.1","        */","        _activateColResizer : function(e) {","            var instance = this,","                colsresizable = e.newVal,","                resizeEventhandlers = instance._resizeEventhandlers,","                colsresizableDefined = Lang.isBoolean(colsresizable),","                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;","","            if (colsresizableDefined && !colsresizable) {","                instance._clearResizeEventhandlers();","            }","            else {","                instance._allColsResizable = colsresizableDefined && colsresizable;","                // when the mouse moves, while not resizing, you might be entering the area where resizing may start","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousemove', 'touchstart'],","                        instance._checkResizeAprovement,","                        'th',","                        instance","                    )","                );","","                // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","                // In those cases this._resizeApproved needs to be set false","                resizeEventhandlers.push(","                    workingHeader.on(","                        'mouseleave',","                        instance._checkEndResizeApprovement,","                        instance","                    )","                );","","                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","                resizeEventhandlers.push(","                    workingHeader.delegate(","                        ['mousedown', 'touchstart'],","                        instance._startResize,","                        'th',","                        instance","                    )","                );","","                // stop resizing when the mouse comes up","                // also stop resizing when the mouse leaves the body (while still might be in down state)","                resizeEventhandlers.push(","                    instance._bodyNode.on(","                        ['mouseup', 'mouseleave', 'touchend'],","                        instance._stopResize,","                        instance","                    )","                );","            }","        },","","        /**","         * Syncs the UI of datatables whose width is in percents. It overrules datatable._syncScrollUI.","         *","         * @method _syncScrollUIPercentedDT","         * @private","         * @since 0.1","         *","        */","        _syncScrollUIPercentedDT: function() {","            var instance = this,","                dt = instance.datatable;","","            // will always be during rendering dt, so we need to suppress first call","            if (instance._resizeEventMayOccur && instance._dtWidthIsPercented) {","                // Actually we SHOULD call this method ALSO when datatable has no width specified,","                // and when there are percented cols available --> they need new width.","                // However, calling dt._syncScrollUI, or dt.set('width') will lead to hanging the","                // resize-event --> for 1 time everything is excecuted, but the resizeevent never fires again !!!!","                Y.rbind(dt._syncScrollUI, dt)();","                instance.syncTableUI();","            }","            else {","                instance._resizeEventMayOccur = true;","            }","        },","","        /**","         * Does the actual sort of columns - if sortable<br>","         * Reason to pverride the standard sortable is, that this module can have tablewidth with large width-values.","         * In order to prevent resetting the width of the table during sorting","         * (something the standard DataTable-sort will do), we need to set a fixed with on the contentbox (posible large value).","         * We don't want to keep that large width, because that would","         * lead to a screen x-sroller on the page.","         *","         * @method _triggerSort","         * @private","         * @protected","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _triggerSort: function(e) {","            var instance = this,","                dt = instance.datatable,","                contentBox = instance._dtContentBox,","                yScrollerContainer = instance._dtYScrollerContainer,","                realDataTable = instance._dtRealDataTable,","                prevYScrollerContainerWidth, prevRealDataTableWidth;","","            if (instance._dtScrollY) {","                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount","                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort","                // YScrollerContainer and realDataTable get wrong values. We need to restore that","                prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);","                prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);","                Y.bind('_onUITriggerSort', dt, e)();","                yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');","                realDataTable.setStyle('width', prevRealDataTableWidth+'px');","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","            else  {","                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area","                contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');","                Y.bind('_onUITriggerSort', dt, e)();","                // clear width contentbox to prevent big page x-scroller","                contentBox.setStyle('width', '');","            }","        },","","        /**","         * Will be executed at the start of a resizeaction<br>","         * This function will first check whether a resize can be made (cursor===cursor:column) and if so, it initializes some values.","         *","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _startResize: function(e) {","            var instance = this, dt,","                yScrollerContainer = instance._dtYScrollerContainer,","                resizeMargin, resizeMarginHalf, th, lastTh, allTh,","                mouseX, thWidth, thX, mouseInLeftNode, leftColIndex;","","            if (instance._resizeApproved) {","                instance._busyResize = true;","                instance._comingFromResize = true;","                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeColumn,","                    instance","                );","                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.","                // we need to know this, because the column-resize handlers overlap 2 th-nodes.","                dt = instance.datatable;","                resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');","                resizeMarginHalf = Math.round(resizeMargin/2);","                th = e.currentTarget;","                lastTh = (th.next('th')===null);","                mouseX = e.pageX;","                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);","                thX = th.getX();","                mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));","                if (mouseInLeftNode) {","                    instance._leftThNode = th;","                    instance._leftThX = thX;","                    instance._mouseOffset = thX+thWidth-mouseX;","                }","                else {","                    instance._leftThNode = th.previous('th');","                    instance._leftThX = instance._leftThNode.getX();","                    instance._mouseOffset = thX-mouseX;","                }","                allTh = th.get('parentNode').all('th');","                instance._leftColIndex = leftColIndex = allTh.indexOf(instance._leftThNode);","                instance._initialColWidth = instance.columnWidthIsPercent(leftColIndex) ? instance.getColumnWidthPercent(leftColIndex)","                                            : instance.getColumnWidthPx(leftColIndex);","                instance._changeUnselectableIE(true);","            }","        },","","        /**","         * Will be executed at the end of a resizeaction<br>","         * This function will first check whether resizing is actually happens. In case columnwidths have been changed, an event will be fired.","         * Fires the event colWidthChange","         * @method _startResize","         * @private","         * @param {e} eventFacade","         * @param {Array} e.prevVal","         * contains objects with fields: colindex and width","         * @param {Array} e.newVal","         * contains objects with fields: colindex, width and changed","         * @since 0.1","         *","        */","        _stopResize: function(e) {","            var instance = this,","                dt = instance.datatable,","                leftColIndex = instance._leftColIndex,","                dtWidthWithBorder, finalColWidth;","","            if (instance._busyResize) {","                // resizing will be ending. Fire event.","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);","                instance._busyResize = false;","                instance._changeUnselectableIE(false);","                instance._checkResizeAprovement(e);","                // Don't know why, but we need to e.halt in order to fire a new event.","                e.halt();","                if (instance._initialColWidth !== finalColWidth) {","                    // to return the with in percent (when needed), transform width","                    if (instance.columnWidthIsPercent(leftColIndex)) {","                        dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                            : instance._datatableParentNode.get('offsetWidth');","                        finalColWidth = (100*finalColWidth/dtWidthWithBorder).toFixed(2) + '%';","                    }","                    dt.fire('colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});","                }","                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value","                Y.later(","                    200,","                    instance,","                    function() {","                        instance._comingFromResize = false;","                    }","                );","","            }","        },","","        /**","         * Checks whether the nouse is in a position that start-resizing is possible. If so, then the cursor will change to col-resize<br>","         *","         * @method _checkResizeAprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _checkResizeAprovement: function(e) {","            if (!this._busyResize) {","                var instance = this,","                    dt = instance.datatable,","                    boundingBox = dt.get('boundingBox'),","                    th = e.currentTarget,","                    lastTh = (th.next('th')===null),","                    thX = th.getX(),","                    mouseX = e.pageX,","                    // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element","                    thWidth = th.get('offsetWidth')- (instance._dtYScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    resizeMarginHalf = Math.round(resizeMargin/2),","                    fromLeft, fromRight, insideLeftArea, insideRightArea, leftSideFirstTh;","","                fromLeft = mouseX-thX;","                fromRight = thX+thWidth-mouseX;","                insideLeftArea = (fromLeft<resizeMarginHalf);","                insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));","                leftSideFirstTh = insideLeftArea && (th.previous('th')===null);","                instance._resizeApproved = ((insideLeftArea || insideRightArea)","                    && !leftSideFirstTh","                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))","                );","                boundingBox.toggleClass(DATATABLE_BUSY_RESIZING_CLASS, instance._resizeApproved);","            }","        },","","        /**","         * Does the columnresize by calling this.setColumnWidth() of both left-th as well as right-th<br>","         * The right-th is the correction, where all pixels-difference from left-th are added/substracted to the right-th.","         * Fires the event resize:colWidthChange","         *","         * @method _resizeColumn","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _resizeColumn: function(e) {","            if (this._busyResize) {","                // preventDefault, because in case of touch-event, the screen would have been moved.","                e.preventDefault();","                var instance = this,","                    leftColIndex = instance._leftColIndex,","                    lastColIndex = instance._lastColIndex,","                    prevWidth = instance.getColumnWidthPx(leftColIndex),","                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),","                    distributedSpace = instance._distributedSpace,","                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;","","                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:","                if (leftColIndex===lastColIndex) {","                    compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                    widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);","                    widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);","                    noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)","                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);","                }","                if (!noaction) {","                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.","                    // This would be the case if compairContainer.width>xScroller.width","                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width","                    // corrected by instance._distributedSpace","                    // This could happen when the mouse moves very quick to the left","                    if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {","                        setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));","                    }","                    if (instance.columnWidthIsPercent(leftColIndex)) {","                        // set the new size in percent and NOT in pixels","                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels","                        dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                            : instance._datatableParentNode.get('offsetWidth');","                        setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';","                        prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';","                    }","                    newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);","                    if (prevWidth!==newWidth) {","                        /**","                         * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing","                         * @event resize:colWidthChange","                         * @param {EventFacade} e Event object","                         * @param {Int} e.colIndex","                         * @param {Int} e.prevVal","                         * @param {Int} e.newVal","                        */","                        instance.datatable.fire('resize:colWidthChange', {colIndex: leftColIndex, prevVal: prevWidth, newVal: newWidth});","                    }","                }","                else {","                }","            }","        },","","        /**","         * Determines whether a resize-state should be ended.","         * This is the case when this._resizeApproved===true && this._busyResize===false and the mouse gets out of thead","         *","         * @method _checkEndResizeApprovement","         * @private","         * @since 0.1","         *","        */","        _checkEndResizeApprovement: function() {","            var instance = this;","","            if (instance._resizeApproved && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Will togle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _endResizeApprovement: function() {","            var instance = this;","","            instance._resizeApproved = false;","            instance.datatable.get('boundingBox').toggleClass(DATATABLE_BUSY_RESIZING_CLASS, false);","        },","","","        /**","         * Defines some private datatable-variables","         * Use the method to prevent this from happening","         *","         * @method _initPrivateVars","         * @private","         * @since 0.1","         *","        */","        _initPrivateVars: function() {","            var instance = this,","                dt = instance.datatable,","                scrollAttrs = dt.get('scrollable'),","                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;","","            instance._bodyNode = Y.one('body');","            instance._dtBoundingBox = dt.get('boundingBox');","            instance._datatableParentNode = instance._dtBoundingBox.get('parentNode');","            instance._dtContentBox = contentBox = dt.get('contentBox');","            instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));","            instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));","            instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));","            instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));","            instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));","            instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));","            instance._dtRealDataTableTHNodes = allThRealHeader.all('th');","            colgroupNode = contentBox.one('colgroup');","            instance._dtColNodes = colgroupNode && colgroupNode.all('col');","            instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));","            instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));","            instance._dtScrollY = (scrollAttrs==='y') || (scrollAttrs==='xy') || (scrollAttrs===true);","        },","","","        /**","         * Justifies the tablewidth: will be called after datatable.changeWidth-event.","         *","         * @method _justifyTableAfterTableWidthChange","         * @private","         * @since 0.1","         *","        */","        _justifyTableAfterTableWidthChange : function() {","            var instance = this,","                dt = instance.datatable,","                dtWidth;","","            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes","            if (!instance._busyResize) {","                dtWidth = dt.get('width');","                if (dtWidth==='') {","                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered","                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to","                    // expansion of the dt","                    // The final tablewidth will be set after resizing","                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():","                    instance._dtWidthDefined = false;","                    instance._setDTWidthFromInternal(1);","                }","                else {","                    instance._dtWidthDefined = true;","                    instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');","                }","                instance.syncTableUI();","            }","        },","","        /**","         * When the DataTable's columns have widths that expend the viewport, than the colwidths would normally be shrinked.","         * Use the method to prevent this from happening","         *","         * @method _justifyTableWidth","         * @private","         * @since 0.1","         *","        */","        _justifyTableWidth: function() {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                yScrollBar = instance._dtYScrollBar,","                xScroller = instance._dtXScroller,","                scrollY = instance._dtScrollY,","                dtScrollHeader = instance._dtScrollHeader,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                dtWidthDefined = instance._dtWidthDefined,","                scrollbarOffset = 0,","                scrollTheaders, colObject, lastColIndex, totalWidth;","","            if (!dtWidthDefined) {","                xScroller.setStyle('overflowX', 'hidden');","            }","","            instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;","","            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths","            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)","            realDataTable.setStyle('width', '1px');","            if (scrollY) {","                yScrollerContainer.setStyle('width', '1px');","            }","","            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion","            totalWidth = instance._transformAllColumnWidthToPixels();","            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels","            // but just in case there are roundingerrors we set it exactly to 0","            if (instance._distributedSpace>0) {","                instance._distributedSpace = 0;","            }","","            if (scrollY) {","                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.","                // We need to capture this behaviour when we want to repositions the y-scrollbar","                scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');","                instance._scrollbarOffset = scrollbarOffset = (","                    scrollTheaders","                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)","                ) || 0;","                totalWidth += scrollbarOffset;","                // in this stage, we need to set the width of yScrollerContainer","                yScrollerContainer.setStyle('width', totalWidth + 'px');","            }","","            // in this stage, we need to set the width of realDataTable","            realDataTable.setStyle('width', totalWidth + 'px');","            totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));","","            if (scrollY) {","                dtScrollHeader.all('th').each(","                    function(th, index) {","                        // add the resizeclass to the th-elements of the scrollable header","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)","                yScrollBar.setStyle('width', '16px');","                instance._syncYScrollerUI(totalWidth);","            }","            else {","                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable","                allThRealHeader.each(","                    function(th, index) {","                        colObject = dt.getColumn(index);","                        th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);","                    }","                );","                if (!dtWidthDefined) {","                    instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);","                }","                else {","                    instance._checkRemainingColSpace();","                }","            }","        },","","        /**","         * Because we cannot use unpredictable columnwidth, all columns must have a defined width.","         *","         * @method _transformAllColumnWidthToPixels","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _transformAllColumnWidthToPixels: function() {","            var instance = this,","                dt = instance.datatable,","                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)","                                    : instance._datatableParentNode.get('offsetWidth'),","                notSpecCols = instance._notSpecCols,","                usedSpace = 0,","                remainingSpace = 0,","                allThRealHeader = instance._dtRealDataTableTHNodes, fireInPercent,","                width, configWidth, colConfigObject, percentWidth, total, thcell,","                storedPercentedWidth, expansion, definedColWidth, percentedIsStored;","            ","            // prevent expanding last cell at this stage:","            instance._busyTransformAllColumnWidthToPixels = true;","            // empty current definition of notspeccols:","            notSpecCols.length = 0;","            ","            allThRealHeader.each(","                function(th, index) {","                    colConfigObject = dt.getColumn(index);","                    configWidth = colConfigObject && colConfigObject.width;","                    percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');","                    thcell = allThRealHeader && allThRealHeader.item(index);","                    expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;","                    storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';","                    percentedIsStored = (storedPercentedWidth.length>0);","                    definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;","                    if (definedColWidth===DATAYES) {","                        if (percentWidth || percentedIsStored) {","                            // transform to pixels. BUT also need to store that the column was in percent!","                            if (percentedIsStored) {","                                // retake the percents instead of the set pixels","                                configWidth = storedPercentedWidth;","                            }","                            if (thcell) {","                                thcell.setData(PERCENTEDWIDTHDATA, configWidth);","                            }","                            configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';","                            fireInPercent = true;","                        }","                        else {","                            fireInPercent = false;","                            if (thcell) {","                                // reset","                                thcell.setData(PERCENTEDWIDTHDATA, null);","                            }","                        }","                    }","                    if (configWidth && (definedColWidth===DATAYES)) {","                        // width is defined in objectconfig","                        width = parseInt(configWidth, 10) - expansion;","                        usedSpace += instance.setColumnWidth(index, width, 0, fireInPercent);","                    }","                    else {","                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards","                        notSpecCols.push(index);","                        if (thcell) {","                            thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);","                        }","                    }","                }","            );","            if (notSpecCols.length>0) {","                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width","                remainingSpace = 0;","                YArray.each(","                    notSpecCols,","                    function(colIndex) {","                        remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));","                    }","                );","            }","            total = usedSpace + remainingSpace;","            instance._busyTransformAllColumnWidthToPixels = false;","            return total;","        },","","        /**","         * In case of IE: Change text-unselectable of the cols","         *","         * @method _changeUnselectableIE","         * @private","         * @return total width of all cols","         * @since 0.1","         *","        */","        _changeUnselectableIE : function(noSelect) {","            var instance = this,","                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,","                headerList = headers && headers.all('th'),","                unselectableBkpList = instance._unselectableBkpList,","                bkpMade;","","            if (Y.UA.ie>0) {","                bkpMade = (unselectableBkpList.length>0);","                headerList.each(","                    function(th, index) {","                        if (noSelect && !bkpMade) {","                            instance._unselectableBkpList.push(th.get('unselectable') || '');","                        }","                        th.setAttribute('unselectable', noSelect ? 'on' : ((unselectableBkpList.length>index) ? unselectableBkpList[index] : ''));","                    },","                    instance","                );","            }","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _checkRemainingColSpace","         * @param {Int} [yScrollerWidth] width of the previous YScrollerContainer","         * @private","         * @since 0.1","         *","        */","        _checkRemainingColSpace: function(yScrollerWidth) {","            var instance = this,","                xScroller = instance._dtXScroller,","                prevDistributedSpace = instance._distributedSpace,","                widthViewport = parseInt(xScroller.getStyle('width'), 10),","                distributeSpace, compairContainer, widthCompairContainer;","","            if (instance._dtWidthDefined) {","                instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth","                compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;","                widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);","                distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;","                xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');","                distributeSpace = Math.max(0, distributeSpace);","                compairContainer.setStyle('width', widthViewport+'px');","                instance._distributeRemainingSpace(distributeSpace);","                instance._busyDistributeRemainingSpace = false;","                widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;","                if (instance._dtScrollY) {","                    instance._syncYScrollerUI(widthCompairContainer, true);","                }","                else {","                    instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');","                }","                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):","                instance._distributedSpace = distributeSpace;","            }","        },","","        /**","         * Checks the remaining colspace (space that needs to be filled up in database with fixed width)","         *","         * @method _distributeRemainingSpace","         * @param {Int} amount number of pixels that have to be distributed","         * @private","         * @since 0.1","         *","        */","        _distributeRemainingSpace : function(amount) {","            var instance = this,","                notSpecCols = instance._notSpecCols,","                notSpecColSize = notSpecCols.length,","                correction, lastColCorrection;","","            // instance._distributedSpace will be filled during resizing cols","            if (notSpecColSize>0) {","                // remaining space needs to be added to the undefined colls","                correction = Math.round(amount/notSpecColSize);","                // due to roundingdifferences, not all space might be added. Therefore we need an extra check","                lastColCorrection = correction + amount - (correction*notSpecColSize);","                YArray.each(","                    notSpecCols,","                    function(colIndex, item) {","                        var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;","                        instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);","                    }","                );","            }","            else {","                instance._expandLastCell(amount);","            }","        },","","        /**","         * In case of x-scroller: If -after changing columnwidth- the real DataTable is smaller than the x-scroll area:","         * the last cell will be expanded so that the complete datatable fits within the scrollable area","         *","         * @method _expandLastCell","         * @private","         * @since 0.1","         *","        */","        _expandLastCell: function(expand) {","            var instance = this,","                lastColIndex = instance._lastColIndex;","","            instance.setColumnWidth(lastColIndex, instance.getColumnWidthPx(lastColIndex, true), expand);","        },","","        /**","         * Syncs the YScroller-UI after a column changes its width.","         * @method _syncYScrollerUI","         * @private","         * @param {int} tableWidth width of the datatable visible area, without outside datatable-borders","         * @param {boolean} [comesFromCheckRemainingColSpace] internally used to mark when function is called from this._checkRemainingColSpace","         * @since 0.1","        */","        _syncYScrollerUI : function(tableWidth, comesFromCheckRemainingColSpace) {","            // always scrollabeY when called","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                yScrollerContainer = instance._dtYScrollerContainer,","                prevWidthYScrollerContainer, xScrollerWidth;","","            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true","            if (!instance._busyDistributeRemainingSpace) {","                if (instance._dtWidthDefined) {","                    // dt has width either in percent or pixels","                    // never sync to values below xScroller-width","                    xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);","                    tableWidth = Math.max(tableWidth, xScrollerWidth);","                    realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');","                }","                else {","                    instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);","                    instance._dtXScroller.setStyle('width', tableWidth+'px');","                    instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');","                }","                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:","                // now resizing","                prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);","                yScrollerContainer.setStyle('width', tableWidth+'px');","                // Also reset scroller-y for this has a width of 1px","                instance._dtYScroller.setStyle('width', tableWidth+'px');","                // prevent looping by checking comesFromSetVisibilityXScroller","                if (!comesFromCheckRemainingColSpace) {","                    instance._checkRemainingColSpace(prevWidthYScrollerContainer);","                }","                if (!instance._dtWidthDefined) {","                    Y.rbind(dt._syncScrollUI, dt)();","                }","                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI","                instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');","            }","        },","","        /**","         * @method _getThCel","         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.","         * @private","         * @return {Node} TH-node of the real datatable","         * @since 0.1","        */","        _getThCel: function(name) {","            var instance = this,","                allThRealHeader = instance._dtRealDataTableTHNodes,","                colIndex;","","            if (!Lang.isNumber(name)) {","                colIndex = instance._getColIndexFromName(name);","            }","            return allThRealHeader && allThRealHeader.item(colIndex || name);","        },","","        /**","         * @method _getColIndexFromName","         * @param {String} name key or name of a column in the host's `_displayColumns` array.","         * @private","         * @return {int} col-index of a column in the host's `_displayColumns` array.","         * @since 0.1","        */","        _getColIndexFromName: function(name) {","            var instance = this,","                dt, colConfigObject, columns, colIndex;","","            if (typeof name === 'string') {","                dt = instance.datatable;","                colConfigObject = dt.getColumn(name);","                columns = dt.get('columns');","                colIndex = YArray.indexOf(columns, colConfigObject);","            }","            return colIndex || -1;","        },","","        /**","         * Sets the DT width, but only from calls within this module","         * It will prevent coming into a loop when datatable-Changewidth event occurs and it leaves this._dtWidthDefined to false","         * Should only be called when datatable has _dtWidthDefined set to false","         *","         * @method _setDTWidthFromInternal","         * @param {Number} newWidth new datatable width in pixels","         * @private","         * @protected","         * @since 0.1","        */","        _setDTWidthFromInternal : function(newWidth) {","            var instance = this,","                dt = instance.datatable,","                realDataTable = instance._dtRealDataTable,","                prevWidthRealDataTable;","","            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()","            // we don't need to restore this width anyway at that point.","            if (!instance._dtWidthDefined) {","                prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);","                instance._widthChangeInternally = true;","                dt.set('width', newWidth+'px');","                instance._widthChangeInternally = false;","                // now set instance._dtWidthDefined to false again, because it was false and is set to true!","                instance._dtWidthDefined = false;","                // always reset the realdatatable, because it wis resetted by dt.set(width)","                if (realDataTable) {","                    realDataTable.setStyle('width', Math.max(prevWidthRealDataTable, parseInt(instance._dtXScroller.getStyle('width'), 10))+'px');","                }","            }","            else {","            }","        },","","        /**","         * Cleaning up all resizeeventlisteners","         *","         * @method _clearResizeEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearResizeEventhandlers : function() {","            YArray.each(","                this._resizeEventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsadtcr',","        ATTRS : {","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value correspons with an area that overlaps 2 columns (50% each)<br>","             * Has the dame purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 10","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 10,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value correspons with an area that overlaps 2 columns (50% each)<br>","             * Has the dame purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 20","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 20,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Minamal colwidth that a column can reach by resizing<br>","             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>","             * minimum value = 0","             * @default 0","             * @attribute minColWidth","             * @type int","             * @since 0.1","            */","            minColWidth: {","                value: 0,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"plugin\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-resize\",","        \"event-touch\",","        \"datatable-column-widths\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].lines = {"1":0,"3":0,"281":0,"292":0,"339":0,"341":0,"342":0,"343":0,"344":0,"347":0,"360":0,"363":0,"364":0,"365":0,"366":0,"379":0,"382":0,"383":0,"384":0,"385":0,"399":0,"402":0,"403":0,"404":0,"405":0,"406":0,"407":0,"419":0,"422":0,"432":0,"436":0,"446":0,"449":0,"459":0,"469":0,"487":0,"495":0,"497":0,"499":0,"500":0,"502":0,"503":0,"505":0,"507":0,"508":0,"510":0,"528":0,"533":0,"544":0,"548":0,"549":0,"551":0,"552":0,"554":0,"574":0,"599":0,"600":0,"601":0,"602":0,"603":0,"604":0,"606":0,"609":0,"610":0,"613":0,"614":0,"616":0,"617":0,"618":0,"619":0,"625":0,"626":0,"629":0,"630":0,"632":0,"633":0,"635":0,"636":0,"639":0,"642":0,"643":0,"644":0,"645":0,"646":0,"648":0,"649":0,"652":0,"653":0,"656":0,"659":0,"662":0,"666":0,"667":0,"673":0,"676":0,"678":0,"679":0,"681":0,"682":0,"683":0,"688":0,"689":0,"692":0,"693":0,"698":0,"701":0,"703":0,"706":0,"709":0,"712":0,"713":0,"714":0,"718":0,"719":0,"720":0,"723":0,"727":0,"728":0,"730":0,"731":0,"732":0,"737":0,"738":0,"739":0,"740":0,"741":0,"744":0,"750":0,"751":0,"752":0,"755":0,"756":0,"757":0,"760":0,"761":0,"766":0,"768":0,"771":0,"774":0,"776":0,"786":0,"792":0,"794":0,"809":0,"811":0,"812":0,"813":0,"815":0,"825":0,"830":0,"831":0,"833":0,"834":0,"835":0,"837":0,"838":0,"858":0,"863":0,"867":0,"871":0,"872":0,"879":0,"893":0,"897":0,"902":0,"903":0,"906":0,"907":0,"909":0,"910":0,"911":0,"922":0,"928":0,"931":0,"940":0,"949":0,"957":0,"958":0,"961":0,"966":0,"968":0,"969":0,"970":0,"971":0,"974":0,"975":0,"982":0,"987":0,"1004":0,"1010":0,"1011":0,"1014":0,"1016":0,"1027":0,"1036":0,"1047":0,"1066":0,"1070":0,"1075":0,"1076":0,"1079":0,"1099":0,"1106":0,"1110":0,"1111":0,"1112":0,"1113":0,"1114":0,"1115":0,"1119":0,"1120":0,"1122":0,"1137":0,"1142":0,"1143":0,"1144":0,"1146":0,"1153":0,"1154":0,"1155":0,"1156":0,"1157":0,"1158":0,"1160":0,"1161":0,"1162":0,"1163":0,"1164":0,"1165":0,"1166":0,"1169":0,"1170":0,"1171":0,"1173":0,"1174":0,"1175":0,"1177":0,"1196":0,"1201":0,"1203":0,"1204":0,"1206":0,"1207":0,"1208":0,"1209":0,"1211":0,"1212":0,"1214":0,"1215":0,"1217":0,"1219":0,"1222":0,"1226":0,"1243":0,"1244":0,"1257":0,"1258":0,"1259":0,"1260":0,"1261":0,"1262":0,"1266":0,"1282":0,"1284":0,"1285":0,"1294":0,"1295":0,"1296":0,"1297":0,"1298":0,"1301":0,"1307":0,"1308":0,"1310":0,"1313":0,"1315":0,"1316":0,"1318":0,"1319":0,"1328":0,"1346":0,"1348":0,"1349":0,"1363":0,"1365":0,"1366":0,"1380":0,"1385":0,"1386":0,"1387":0,"1388":0,"1389":0,"1390":0,"1391":0,"1392":0,"1393":0,"1394":0,"1395":0,"1396":0,"1397":0,"1398":0,"1399":0,"1400":0,"1413":0,"1418":0,"1419":0,"1420":0,"1426":0,"1427":0,"1430":0,"1431":0,"1433":0,"1447":0,"1460":0,"1461":0,"1464":0,"1468":0,"1469":0,"1470":0,"1474":0,"1477":0,"1478":0,"1481":0,"1484":0,"1485":0,"1489":0,"1491":0,"1495":0,"1496":0,"1498":0,"1499":0,"1502":0,"1503":0,"1507":0,"1508":0,"1512":0,"1514":0,"1515":0,"1518":0,"1519":0,"1522":0,"1537":0,"1549":0,"1551":0,"1553":0,"1555":0,"1556":0,"1557":0,"1558":0,"1559":0,"1560":0,"1561":0,"1562":0,"1563":0,"1564":0,"1566":0,"1568":0,"1570":0,"1571":0,"1573":0,"1574":0,"1577":0,"1578":0,"1580":0,"1584":0,"1586":0,"1587":0,"1591":0,"1592":0,"1593":0,"1598":0,"1600":0,"1601":0,"1604":0,"1608":0,"1609":0,"1610":0,"1623":0,"1629":0,"1630":0,"1631":0,"1633":0,"1634":0,"1636":0,"1653":0,"1659":0,"1660":0,"1661":0,"1662":0,"1663":0,"1664":0,"1665":0,"1666":0,"1667":0,"1668":0,"1669":0,"1670":0,"1671":0,"1674":0,"1677":0,"1691":0,"1697":0,"1699":0,"1701":0,"1702":0,"1705":0,"1706":0,"1711":0,"1725":0,"1728":0,"1741":0,"1748":0,"1749":0,"1752":0,"1753":0,"1754":0,"1757":0,"1758":0,"1759":0,"1763":0,"1764":0,"1766":0,"1768":0,"1769":0,"1771":0,"1772":0,"1775":0,"1787":0,"1791":0,"1792":0,"1794":0,"1805":0,"1808":0,"1809":0,"1810":0,"1811":0,"1812":0,"1814":0,"1829":0,"1836":0,"1837":0,"1838":0,"1839":0,"1840":0,"1842":0,"1844":0,"1845":0,"1861":0,"1864":0,"1878":0,"1881":0,"1905":0,"1924":0,"1940":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].functions = {"initializer:338":0,"transformToPercent:359":0,"transformToPixels:378":0,"transformToUndefinedWidth:398":0,"columnWidthIsPercent:418":0,"columnWidthIsPixels:431":0,"columnWidthIsUndefined:445":0,"getColumnConfigWidth:458":0,"getColumnWidthPx:486":0,"getColumnWidthPercent:527":0,"getColumnExpansion:543":0,"getCellStyle:609":0,"setColWidth:613":0,"setCellWidth:629":0,"setColumnWidth:568":0,"syncTableUI:808":0,"destructor:824":0,"(anonymous 2):870":0,"_render:857":0,"_initUI:892":0,"(anonymous 3):986":0,"_bindUI:921":0,"_activateColResizer:1003":0,"_syncScrollUIPercentedDT:1065":0,"_triggerSort:1098":0,"_startResize:1136":0,"(anonymous 4):1225":0,"_stopResize:1195":0,"_checkResizeAprovement:1242":0,"_resizeColumn:1281":0,"_checkEndResizeApprovement:1345":0,"_endResizeApprovement:1362":0,"_initPrivateVars:1379":0,"_justifyTableAfterTableWidthChange:1412":0,"(anonymous 5):1500":0,"(anonymous 6):1513":0,"_justifyTableWidth:1446":0,"(anonymous 7):1554":0,"(anonymous 8):1603":0,"_transformAllColumnWidthToPixels:1536":0,"(anonymous 9):1632":0,"_changeUnselectableIE:1622":0,"_checkRemainingColSpace:1652":0,"(anonymous 10):1704":0,"_distributeRemainingSpace:1690":0,"_expandLastCell:1724":0,"_syncYScrollerUI:1739":0,"_getThCel:1786":0,"_getColIndexFromName:1804":0,"_setDTWidthFromInternal:1828":0,"(anonymous 11):1863":0,"_clearResizeEventhandlers:1860":0,"(anonymous 12):1880":0,"_clearEventhandlers:1877":0,"validator:1904":0,"validator:1923":0,"validator:1939":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js"].coveredLines = 454;
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




_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 281);
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

_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 292);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "initializer", 338);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 339);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 341);
instance.datatable = instance.get('host');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 342);
instance._badColWidth = Y.Features.test('table', 'badColWidth');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 343);
if (instance.datatable.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 344);
instance._render();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 347);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPercent", 359);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 360);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 363);
if (instance._dtWidthDefined && !instance.columnWidthIsPercent(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 364);
newValue = instance.getColumnWidthPercent(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 365);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 366);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToPixels", 378);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 379);
var instance = this,
                newValue, expansion;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 382);
if (instance._dtWidthDefined && !instance.columnWidthIsPixels(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 383);
newValue = instance.getColumnWidthPx(name, true);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 384);
expansion = instance.getColumnExpansion(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 385);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "transformToUndefinedWidth", 398);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 399);
var instance = this,
                thcell, newValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 402);
if (instance._dtWidthDefined && !instance.columnWidthIsUndefined(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 403);
newValue = instance.getColumnWidthPx(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 404);
instance.setColumnWidth(name, newValue);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 405);
thcell = this._getThCel(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 406);
if (thcell) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 407);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPercent", 418);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 419);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 422);
return (storedPercentedWidth.length>0);
        },

        /**
         * @method columnWidthIsPixels
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is set in pixels. Returns false if in percent or undefined
         * @since 0.1
        */
        columnWidthIsPixels: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsPixels", 431);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 432);
var thcell = this._getThCel(name),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 436);
return definedColWidth && (storedPercentedWidth.length===0);
        },

        /**
         * @method columnWidthIsUndefined
         * @param {String} name key or name of a column in the host's `_displayColumns` array.
         * @return {boolean} whether the width is undefined
         * @since 0.1
        */
        columnWidthIsUndefined: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "columnWidthIsUndefined", 445);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 446);
var thcell = this._getThCel(name),
                definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 449);
return !definedColWidth;
        },

        /**
         * @method getColumnConfigWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @return {int} columnwidth as it exists in the column configuration object, might be in picels or percent or null
         * @since 0.1
        */
        getColumnConfigWidth: function(name) {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnConfigWidth", 458);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 459);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                columns = dt.get('columns'),
                colIndex = YArray.indexOf(columns, colConfigObject),
                allThRealHeader = instance._dtRealDataTableTHNodes,
                thcell = allThRealHeader && allThRealHeader.item(colIndex),
                storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';

            // colConfigObject.widthPercented is defined by this module: only exists if the width is defined in precent.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 469);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPx", 486);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 487);
var instance = this,
                dt = instance.datatable,
                colConfigObject = dt.getColumn(name),
                allThHeader = instance._dtRealDataTableTHNodes,
                expansion = 0,
                colwidth = 0,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 495);
if (colConfigObject && colConfigObject.width) {
                // because _transformAllColumnWidthToPixels is already being executed, colConfigObject.width should exists and is defined in px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 497);
colwidth = parseInt(colConfigObject.width, 10) || 0;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 499);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 500);
cell = instance._dtContentBox.one('#'+dt.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 502);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 503);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 505);
expansion = withoutExpansion ? ((cell && cell.getData(EXPANSIONDATA)) || 0) : 0;
            // only if not this._busyDistributeRemainingSpace, we also have to look at the real cellwidth
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 507);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 508);
colwidth = Math.max(colwidth, ((cell && cell.get('offsetWidth')) || 0));
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 510);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnWidthPercent", 527);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 528);
var instance = this,
                dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'), 10) + DATATABLE_BORDERWIDTH)
                                    : instance._datatableParentNode.get('offsetWidth'),
                width = instance.getColumnWidthPx(name, withoutExpansion);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 533);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getColumnExpansion", 543);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 544);
var instance = this,
                allThHeader = instance._dtRealDataTableTHNodes,
                cell;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 548);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 549);
cell = instance._dtContentBox.one('#'+instance.datatable.getClassName('col') + '-' + name);
            }
            else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 551);
if (Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 552);
cell = allThHeader && allThHeader.item(name);
            }}
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 554);
return (cell && cell.getData(EXPANSIONDATA)) || 0;
        },

        /**
         * Changes the columnwidth. When called programaticly, it fires the event colWidthChange.
         *
         * @method setColumnWidth
         * @param {Number|String} name key, name, or index of a column in the host's `_displayColumns` array.
         * @param {int|String} width new width in pixels or percent. Numbers are treated as pixels
         * @param {int} [expansion] Only to be set internally: to expand the col in order to make it fit with the datatable's width.
         * @param {int} [fireInPercent] Only to be set internally: force the widthChange-event to fire e.newVal in percent
         * @return {int|String} final reached columnwidth in pixels (number) or percents (number+'%'), which might differ from which was tried to set
         * @since 0.1
        */
        setColumnWidth: function (name, width, expansion, fireInPercent) {
            // Opera (including Opera Next circa 1/13/2012) and IE7- pass on the
            // width style to the cells directly, allowing padding and borders to
            // expand the rendered width.  Chrome 16, Safari 5.1.1, and FF 3.6+ all
            // make the rendered width equal the col's style width, reducing the
            // cells' calculated width.
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColumnWidth", 568);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 574);
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
                dtWidthWithBorder = instance._dtWidthDefined ? (dtWidth + DATATABLE_BORDERWIDTH) : instance._datatableParentNode.get('offsetWidth'),
                busyTransformAllColumnWidthToPixels = instance._busyTransformAllColumnWidthToPixels,
                colConfig = dt.getColumn(colIndex),
                prevWidthPercent = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '',
                prevWidthPercented = (prevWidthPercent.length>0),
                newWidthPercented = width && width.substr && (width.substr(width.length-1)==='%'),
                resetContainer, tableToBackup, noWidthCol, bkpColWidth, lastIndex, bkpDatatableWidth, badColWidth,
                newWidth, getCellStyle, setColWidth, setCellWidth, corrected, scrollThDiv, scrollTh,
                widthPxAttempt, widthChange, widthTypeChange, expansionChange, eventPrevValue;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 599);
expansion = expansion || 0;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 600);
width = newWidthPercented ? parseFloat(width) : parseInt(width, 10);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 601);
widthChange = newWidthPercented ? (prevWidthPercent!==(width+'%')) : (width!==prevWidthPx);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 602);
widthTypeChange = (newWidthPercented!==prevWidthPercented);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 603);
expansionChange = (expansion!==prevExpansion);
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 604);
badColWidth = instance._badColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 606);
if (col && thcell && Y.Lang.isNumber(width) && (widthChange || widthTypeChange || expansionChange || busyTransformAllColumnWidthToPixels)
                && (width>=instance.get('minColWidth'))) {

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 609);
getCellStyle = function (element, prop, nonComputed) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "getCellStyle", 609);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 610);
return (parseInt((nonComputed ? element.getStyle(prop) : element.getComputedStyle(prop)), 10) || 0);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 613);
setColWidth = function (element, newColWidth) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setColWidth", 613);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 614);
var corrected = 0,
                        cell;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 616);
if (badColWidth) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 617);
cell = dt.getCell([0, colIndex]);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 618);
if (cell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 619);
corrected =  getCellStyle(cell, 'paddingLeft') +
                                         getCellStyle(cell, 'paddingRight') +
                                         getCellStyle(cell, 'borderLeftWidth') +
                                         getCellStyle(cell, 'borderRightWidth');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 625);
newColWidth -= corrected;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 626);
element.setStyle('width', newColWidth + 'px');
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 629);
setCellWidth = function(cellwidth, withExpansion) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "setCellWidth", 629);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 630);
var prevExpansion;
                    // only when we are sure we manually set the width, then mark the thNode's widthPercented
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 632);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 633);
if (newWidthPercented) {
                            // store the percented width and continue calculating with the width in pixels
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 635);
thcell.setData(PERCENTEDWIDTHDATA, cellwidth + '%');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 636);
cellwidth = Math.round(dtWidthWithBorder*cellwidth/100);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 639);
thcell.setData(PERCENTEDWIDTHDATA, null);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 642);
if (withExpansion) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 643);
cellwidth += expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 644);
prevExpansion = thcell.getData(EXPANSIONDATA) || 0;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 645);
thcell.setData(EXPANSIONDATA, expansion);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 646);
instance._distributedSpace += expansion - prevExpansion;
                        // only when we are sure we manually set the width, then mark the thNode as DATAYES
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 648);
if (!busyTransformAllColumnWidthToPixels && (expansion===0)) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 649);
thcell.setData(DEFINEDCOLWIDTHDATA, DATAYES);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 652);
if (colConfig) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 653);
colConfig.width = cellwidth+'px';

                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 656);
setColWidth(col, cellwidth);
                };

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 659);
if (!busyResize) {
                    // store previous value, because it will be event-fired
                    // do not use variable prevWidthPercent, for this one doesn't have expansion included
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 662);
eventPrevValue = prevWidthPercented ? instance.getColumnWidthPercent(colIndex) : prevWidthPx;
                }

                // now, also for scrollheaders - if they are available
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 666);
if (scrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 667);
tableToBackup = yScrollerContainer;
                }
                else {
                    // if you should have sortable headers, than in case the realDataTable-width < contentBox-width,
                    // the realDataTable-width will change to 100% when a user is resorting.
                    // therefore we must check if the width==='100%' and if so, we take the width of the contentbox.
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 673);
tableToBackup = (realDataTable.getStyle('width')==='100%') ? dtContentBox : realDataTable;
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 676);
bkpDatatableWidth = getCellStyle(tableToBackup, 'width', true);

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 678);
lastIndex = allColl ? (allColl.size()-1) : 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 679);
if (lastIndex>0) {
                    // do not perform this workarround when you have only 1 column
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 681);
noWidthCol = allColl.item((colIndex===lastIndex) ? 0 : lastIndex);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 682);
bkpColWidth = getCellStyle(noWidthCol, 'width', true);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 683);
noWidthCol.setStyle('width', '');
                }
                else {
                    // in case of only 1 column: another workarround. DO NOT set width to '' or 0px,
                    // but to 1px (safari ans chrome would otherwise fail)
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 688);
resetContainer = yScrollerContainer || realDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 689);
resetContainer.setStyle('width', '1px');
                    // ALSO in case of only 1 column and scrollable-y: safari ans chrome will fail cellwidth-calculation
                    // if realDataTable has a width other than 1px
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 692);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 693);
realDataTable.setStyle('width', '1px');
                    }
                }
                
                // next setCellWidth can handle both with in pixels as well as in percent
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 698);
setCellWidth(width, true);
                // From now on: we MUST take the final reached width, because due to cellrestrictions, it might differ from what is set.
                
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 701);
widthPxAttempt = (newWidthPercented ? Math.round((dtWidthWithBorder*width/100)) : width) + expansion;

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 703);
width = instance.getColumnWidthPx(colIndex);
                // now comes the tricky part: final width might be different then was requested, due to celrestrictions (unbeakable content)
                // So, we need to redefine it again to both the col, as the colconfig.width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 706);
if (widthPxAttempt!==width) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transform it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 709);
setCellWidth((newWidthPercented ? Math.round(100*width/dtWidthWithBorder) : width), false);
                }

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 712);
if (lastIndex>0) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 713);
if (bkpColWidth>0) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 714);
noWidthCol.setStyle('width', bkpColWidth+'px');
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 718);
resetContainer.setStyle('width', dtWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 719);
if (scrollY) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 720);
realDataTable.setStyle('width', parseInt(yScrollerContainer.getStyle('width'), 10)+'px');
                    }
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 723);
newWidth = bkpDatatableWidth + width - prevWidthPx;
                
                // was there any change anyway? Then reset the tableUI
                // reset the datatable-width or the container width. What need to be set -or justified- depends on the scroll-type of DataTable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 727);
if ((width !== prevWidthPx) || busyTransformAllColumnWidthToPixels) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 728);
if (scrollY) {
                        // now set the innerwidth of the div inside scrollable TH
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 730);
scrollThDiv = instance._dtScrollLiners.item(colIndex);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 731);
scrollTh = scrollThDiv.get('parentNode');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 732);
corrected =  badColWidth ? width : (width -
                                                            getCellStyle(scrollThDiv, 'paddingLeft') -
                                                            getCellStyle(scrollThDiv, 'paddingRight') -
                                                            getCellStyle(scrollTh, 'borderLeftWidth') -
                                                            getCellStyle(scrollTh, 'borderRightWidth'));
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 737);
setColWidth(scrollThDiv, corrected);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 738);
if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 739);
if (instance._dtWidthDefined) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 740);
yScrollerContainer.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 741);
instance._checkRemainingColSpace();
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 744);
instance._syncYScrollerUI(newWidth);
                            }

                        }
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 750);
if (!instance._busyDistributeRemainingSpace && !instance._busyTransformAllColumnWidthToPixels) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 751);
realDataTable.setStyle('width', newWidth+'px');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 752);
if (!instance._dtWidthDefined) {
                                // don't reset the datatable width during resize: this would take too much performance.
                                // Instead, during resize, we will reset the dt-width after resize:end
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 755);
instance._setDTWidthFromInternal(newWidth+DATATABLE_BORDERWIDTH);
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 756);
instance._dtXScroller.setStyle('width', (newWidth)+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 757);
instance._dtBoundingBox.setStyle('width', (newWidth+DATATABLE_BORDERWIDTH)+'px');
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 760);
realDataTable.setStyle('width', newWidth+'px');
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 761);
instance._checkRemainingColSpace();
                            }
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 766);
if (lastIndex===0) {
                    // no widthchange, but we need to reset the width on the resetcontainer
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 768);
resetContainer.setStyle('width', prevWidthPx+'px');
                }}
                // to return the with in percent (when needed), transform width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 771);
if (newWidthPercented) {
                    // next setCellWidth we must take care: width is transformed to pixels.
                    // in case of percent, we need to transfprm it again
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 774);
width = (100*width/dtWidthWithBorder).toFixed(2) + '%';
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 776);
if (!busyResize) {
                    /**
                     * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing
                     * @event colWidthChange
                     * @param {EventFacade} e Event object
                     * @param {Int} e.colIndex
                     * @param {Int} e.prevVal
                     * @param {Int} e.newVal
                    */
                    // CAUTIOUS: if (fireInPercent && !newWidthPercented), then width is still in pixels, but we need percents to be fired!
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 786);
dt.fire('colWidthChange', {colIndex: colIndex, prevVal: eventPrevValue,
                             newVal: (fireInPercent && !newWidthPercented) ? (100*width/dtWidthWithBorder).toFixed(2)+'%' : width});
                }

            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 792);
width = prevWidthPercent || prevWidthPx;
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 794);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "syncTableUI", 808);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 809);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 811);
if (!instance._widthChangeInternally) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 812);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 813);
instance._justifyTableWidth();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 815);
instance._widthChangeInternally = false;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "destructor", 824);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 825);
var instance = this,
                dt = instance.datatable,
                dtHandles = dt._eventHandles,
                sortable = dt.get('sortable');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 830);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 831);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 833);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 834);
instance._clearResizeEventhandlers();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 835);
instance._dtBoundingBox.removeClass(DATATABLE_BUSY_RESIZING_CLASS);
            // now: in case of sortable datatable: we need to attach the original event again.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 837);
if (Lang.isBoolean(sortable) && sortable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 838);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_render", 857);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 858);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                xScrollableTable = scrollAttrs && (scrollAttrs.indexOf('x')>-1);

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 863);
if (!xScrollableTable) {
                // always activate the xScroller --> this way we can controll the colwidths in a decent matter
                // even if no dt-width is set (and dt is always as width as all colls), it stil is useful, because if the users changes
                // the d-width to a defined value, the x-scroller is ready to be used imediately
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 867);
Y.use(
                    'datatable-scroll',
                    Y.bind(
                        function(Y) {
                            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 2)", 870);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 871);
dt.set('scrollable', (scrollAttrs && (scrollAttrs.indexOf('y')>-1)) ? 'xy' : 'x');
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 872);
this._initUI();
                        },
                        instance
                    )
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 879);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initUI", 892);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 893);
var instance = this,
                dt = instance.datatable,
                dtWidth = dt.get('width');

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 897);
if (dtWidth==='') {
                // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to expansion of the dt
                // The final tablewidth will be set after resizing
                // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 902);
instance._dtWidthDefined = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 903);
instance._setDTWidthFromInternal(1);
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 906);
instance._dtWidthDefined = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 907);
instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 909);
instance._initPrivateVars();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 910);
instance._justifyTableWidth();
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 911);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_bindUI", 921);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 922);
var instance = this,
                dt = instance.datatable,
                eventhandlers = instance._eventhandlers,
                sortable = dt.get('sortable'),
                currentSortEventHandler;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 928);
instance._activateColResizer({newVal: dt.get('colsresizable')});

            // Justify the tablewidth again after one of these changes:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 931);
eventhandlers.push(
                dt.after(
                    ['colsresizableChange'],
                    instance._activateColResizer,
                    instance
                )
            );

            // Justify the tablewidth again after one of these changes:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 940);
eventhandlers.push(
                dt.after(
                    ['renderView', 'columnsChange', 'dataChange', 'scrollableChange'],
                    instance.syncTableUI,
                    instance
                )
            );

            // Justify the tablewidth again after render view or when there is a columnChange
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 949);
eventhandlers.push(
                dt.after(
                    ['widthChange'],
                    instance._justifyTableAfterTableWidthChange,
                    instance
                )
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 957);
if (dt._scrollResizeHandle) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 958);
dt._scrollResizeHandle.detach();
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 961);
dt._scrollResizeHandle = Y.on(
                'resize',
                Y.rbind(instance._syncScrollUIPercentedDT, instance)
            );

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 966);
if (Lang.isBoolean(sortable) && sortable) {
                // first detach current handler
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 968);
currentSortEventHandler = dt._eventHandles.sortUITrigger;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 969);
if (currentSortEventHandler) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 970);
currentSortEventHandler.detach();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 971);
currentSortEventHandler = null;
                }
                // now attach it again. keydown without restriction, but click should check first if mouse is in resizable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 974);
if (dt._theadNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 975);
eventhandlers.push(
                        dt.delegate(
                            'keydown',
                            Y.rbind(instance._triggerSort, instance),
                            '.' + dt.getClassName('sortable', 'column')
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 982);
eventhandlers.push(
                        dt.delegate(
                            'click',
                            Y.rbind(instance._triggerSort, instance),
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 3)", 986);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 987);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_activateColResizer", 1003);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1004);
var instance = this,
                colsresizable = e.newVal,
                resizeEventhandlers = instance._resizeEventhandlers,
                colsresizableDefined = Lang.isBoolean(colsresizable),
                workingHeader = instance._dtScrollHeader || instance._dtRealDataTableHeader;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1010);
if (colsresizableDefined && !colsresizable) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1011);
instance._clearResizeEventhandlers();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1014);
instance._allColsResizable = colsresizableDefined && colsresizable;
                // when the mouse moves, while not resizing, you might be entering the area where resizing may start
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1016);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1027);
resizeEventhandlers.push(
                    workingHeader.on(
                        'mouseleave',
                        instance._checkEndResizeApprovement,
                        instance
                    )
                );

                // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1036);
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
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1047);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncScrollUIPercentedDT", 1065);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1066);
var instance = this,
                dt = instance.datatable;

            // will always be during rendering dt, so we need to suppress first call
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1070);
if (instance._resizeEventMayOccur && instance._dtWidthIsPercented) {
                // Actually we SHOULD call this method ALSO when datatable has no width specified,
                // and when there are percented cols available --> they need new width.
                // However, calling dt._syncScrollUI, or dt.set('width') will lead to hanging the
                // resize-event --> for 1 time everything is excecuted, but the resizeevent never fires again !!!!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1075);
Y.rbind(dt._syncScrollUI, dt)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1076);
instance.syncTableUI();
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1079);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_triggerSort", 1098);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1099);
var instance = this,
                dt = instance.datatable,
                contentBox = instance._dtContentBox,
                yScrollerContainer = instance._dtYScrollerContainer,
                realDataTable = instance._dtRealDataTable,
                prevYScrollerContainerWidth, prevRealDataTableWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1106);
if (instance._dtScrollY) {
                // Due to a bug: Only in browsers where Y-Scroller is always visible (FF), when the extra amount
                // that is overlapping reaches just in the width-area (xscroller between 1-15 px), then after a col-resort
                // YScrollerContainer and realDataTable get wrong values. We need to restore that
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1110);
prevYScrollerContainerWidth = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1111);
prevRealDataTableWidth = parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1112);
Y.bind('_onUITriggerSort', dt, e)();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1113);
yScrollerContainer.setStyle('width', prevYScrollerContainerWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1114);
realDataTable.setStyle('width', prevRealDataTableWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1115);
instance._dtYScrollBar.setStyle('left', (parseInt(instance._dtXScroller.getStyle('width'),10)-15)+'px');
            }
            else  {
                // we must set the width of contentbox, otherwise resorting will reset the tablewidth to fit in the x-scrollable area
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1119);
contentBox.setStyle('width', parseInt(instance._dtRealDataTable.getStyle('width'), 10)+DATATABLE_BORDERWIDTH+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1120);
Y.bind('_onUITriggerSort', dt, e)();
                // clear width contentbox to prevent big page x-scroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1122);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_startResize", 1136);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1137);
var instance = this, dt,
                yScrollerContainer = instance._dtYScrollerContainer,
                resizeMargin, resizeMarginHalf, th, lastTh, allTh,
                mouseX, thWidth, thX, mouseInLeftNode, leftColIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1142);
if (instance._resizeApproved) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1143);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1144);
instance._comingFromResize = true;
                // attach move-event as soon as posible, to prevent users from dragging column (most right handler)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1146);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumn,
                    instance
                );
                // first find out whether the mouse is in the left area of the right-th node, or in the right area of the left-th node.
                // we need to know this, because the column-resize handlers overlap 2 th-nodes.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1153);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1154);
resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1155);
resizeMarginHalf = Math.round(resizeMargin/2);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1156);
th = e.currentTarget;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1157);
lastTh = (th.next('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1158);
mouseX = e.pageX;
                // Need to correct for padding-right: scrollable DataTables will add a padding-right to the last th-element
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1160);
thWidth = th.get('offsetWidth')- (yScrollerContainer ? parseInt(th.getStyle('paddingRight'), 10) : 0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1161);
thX = th.getX();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1162);
mouseInLeftNode = mouseX>(thX+thWidth-(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1163);
if (mouseInLeftNode) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1164);
instance._leftThNode = th;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1165);
instance._leftThX = thX;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1166);
instance._mouseOffset = thX+thWidth-mouseX;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1169);
instance._leftThNode = th.previous('th');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1170);
instance._leftThX = instance._leftThNode.getX();
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1171);
instance._mouseOffset = thX-mouseX;
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1173);
allTh = th.get('parentNode').all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1174);
instance._leftColIndex = leftColIndex = allTh.indexOf(instance._leftThNode);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1175);
instance._initialColWidth = instance.columnWidthIsPercent(leftColIndex) ? instance.getColumnWidthPercent(leftColIndex)
                                            : instance.getColumnWidthPx(leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1177);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_stopResize", 1195);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1196);
var instance = this,
                dt = instance.datatable,
                leftColIndex = instance._leftColIndex,
                dtWidthWithBorder, finalColWidth;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1201);
if (instance._busyResize) {
                // resizing will be ending. Fire event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1203);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1204);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1206);
finalColWidth = instance.getColumnWidthPx(instance._leftColIndex);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1207);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1208);
instance._changeUnselectableIE(false);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1209);
instance._checkResizeAprovement(e);
                // Don't know why, but we need to e.halt in order to fire a new event.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1211);
e.halt();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1212);
if (instance._initialColWidth !== finalColWidth) {
                    // to return the with in percent (when needed), transform width
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1214);
if (instance.columnWidthIsPercent(leftColIndex)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1215);
dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)
                                            : instance._datatableParentNode.get('offsetWidth');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1217);
finalColWidth = (100*finalColWidth/dtWidthWithBorder).toFixed(2) + '%';
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1219);
dt.fire('colWidthChange', {colIndex: leftColIndex, prevVal: instance._initialColWidth, newVal: finalColWidth});
                }
                // set _comingFromResize to false AFTER a delay --> sorting headers will notice a click that needs to be prevented by this value
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1222);
Y.later(
                    200,
                    instance,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 4)", 1225);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1226);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkResizeAprovement", 1242);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1243);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1244);
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

                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1257);
fromLeft = mouseX-thX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1258);
fromRight = thX+thWidth-mouseX;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1259);
insideLeftArea = (fromLeft<resizeMarginHalf);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1260);
insideRightArea = (fromRight<(lastTh ? resizeMargin : resizeMarginHalf));
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1261);
leftSideFirstTh = insideLeftArea && (th.previous('th')===null);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1262);
instance._resizeApproved = ((insideLeftArea || insideRightArea)
                    && !leftSideFirstTh
                    && (instance._allColsResizable || (insideLeftArea ? th.previous('th') : th).hasClass(RESIZABLE_COLUMN_CLASS))
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1266);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_resizeColumn", 1281);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1282);
if (this._busyResize) {
                // preventDefault, because in case of touch-event, the screen would have been moved.
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1284);
e.preventDefault();
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1285);
var instance = this,
                    leftColIndex = instance._leftColIndex,
                    lastColIndex = instance._lastColIndex,
                    prevWidth = instance.getColumnWidthPx(leftColIndex),
                    setNewLeftWidth = Math.round(e.pageX-instance._leftThX+instance._mouseOffset),
                    distributedSpace = instance._distributedSpace,
                    noaction, newWidth, compairContainer, widthXScroller, dtWidthWithBorder, widthCompairContainer;

                // we cannot decrease the last col if we have a x-scroller that is invisible because the cols fit exactly:
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1294);
if (leftColIndex===lastColIndex) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1295);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1296);
widthXScroller = parseInt(instance._dtXScroller.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1297);
widthCompairContainer = parseInt(compairContainer.getStyle('width'),10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1298);
noaction = instance._dtWidthDefined && (widthXScroller>=widthCompairContainer)
                               && (setNewLeftWidth<prevWidth) && (distributedSpace===0);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1301);
if (!noaction) {
                    // trick one: with fixed dt-width: the last col might get smaller value EVEN is noaction did not interupt.
                    // This would be the case if compairContainer.width>xScroller.width
                    // BUT the number of pixels that will be decreased CAN NEVER exceed the difference of compairContainer.width and xScroller.width
                    // corrected by instance._distributedSpace
                    // This could happen when the mouse moves very quick to the left
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1307);
if (instance._dtWidthDefined && (leftColIndex===lastColIndex) && (setNewLeftWidth<prevWidth)) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1308);
setNewLeftWidth = prevWidth - Math.min((prevWidth-setNewLeftWidth), (widthCompairContainer-widthXScroller+distributedSpace));
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1310);
if (instance.columnWidthIsPercent(leftColIndex)) {
                        // set the new size in percent and NOT in pixels
                        // Only if the datatable-width is defined: if not, then percented-col has no meaning and we transform the colwidth to pixels
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1313);
dtWidthWithBorder = instance._dtWidthDefined ? (parseInt(instance._dtXScroller.getStyle('width'),10) + DATATABLE_BORDERWIDTH)
                                            : instance._datatableParentNode.get('offsetWidth');
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1315);
setNewLeftWidth = (100*setNewLeftWidth/dtWidthWithBorder).toFixed(2)+'%';
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1316);
prevWidth = (100*prevWidth/dtWidthWithBorder).toFixed(2)+'%';
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1318);
newWidth = instance.setColumnWidth(leftColIndex, setNewLeftWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1319);
if (prevWidth!==newWidth) {
                        /**
                         * In case of a resized column, resize:colWidthChange will be fired by the host-datatable during resizing
                         * @event resize:colWidthChange
                         * @param {EventFacade} e Event object
                         * @param {Int} e.colIndex
                         * @param {Int} e.prevVal
                         * @param {Int} e.newVal
                        */
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1328);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkEndResizeApprovement", 1345);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1346);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1348);
if (instance._resizeApproved && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1349);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_endResizeApprovement", 1362);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1363);
var instance = this;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1365);
instance._resizeApproved = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1366);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_initPrivateVars", 1379);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1380);
var instance = this,
                dt = instance.datatable,
                scrollAttrs = dt.get('scrollable'),
                contentBox, realDataTable, scrollHeader, yScrollerContainer, allThRealHeader, colgroupNode;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1385);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1386);
instance._dtBoundingBox = dt.get('boundingBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1387);
instance._datatableParentNode = instance._dtBoundingBox.get('parentNode');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1388);
instance._dtContentBox = contentBox = dt.get('contentBox');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1389);
instance._dtRealDataTable = realDataTable = contentBox.one('.'+dt.getClassName('table'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1390);
instance._dtXScroller = contentBox.one('.'+dt.getClassName('x', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1391);
instance._dtYScroller = contentBox.one('.'+dt.getClassName('y', 'scroller'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1392);
instance._dtYScrollerContainer = yScrollerContainer = contentBox.one('.'+dt.getClassName('y', 'scroller', 'container'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1393);
instance._dtYScrollBar = contentBox.one('.'+dt.getClassName('scrollbar'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1394);
instance._dtRealDataTableHeader = allThRealHeader = realDataTable.one('.'+dt.getClassName('columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1395);
instance._dtRealDataTableTHNodes = allThRealHeader.all('th');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1396);
colgroupNode = contentBox.one('colgroup');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1397);
instance._dtColNodes = colgroupNode && colgroupNode.all('col');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1398);
instance._dtScrollHeader = scrollHeader = yScrollerContainer && yScrollerContainer.one('.'+dt.getClassName('scroll', 'columns'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1399);
instance._dtScrollLiners = scrollHeader && scrollHeader.all('.'+dt.getClassName('scroll', 'liner'));
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1400);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableAfterTableWidthChange", 1412);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1413);
var instance = this,
                dt = instance.datatable,
                dtWidth;

            // do not do this when busyResizing, because it will interfer, and it was meant for react for external width-changes
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1418);
if (!instance._busyResize) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1419);
dtWidth = dt.get('width');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1420);
if (dtWidth==='') {
                    // If no dt-width is defined, then we set it ourselves in order to get the x-scroller rendered
                    // Also, we must store the fact that the original dt had no width specified: when resizing colls this will lead to
                    // expansion of the dt
                    // The final tablewidth will be set after resizing
                    // don't want event 'datatable.widthChange' to trigger this._justifyTableWidth():
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1426);
instance._dtWidthDefined = false;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1427);
instance._setDTWidthFromInternal(1);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1430);
instance._dtWidthDefined = true;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1431);
instance._dtWidthIsPercented = (dtWidth.substr(dtWidth.length-1)==='%');
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1433);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_justifyTableWidth", 1446);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1447);
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

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1460);
if (!dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1461);
xScroller.setStyle('overflowX', 'hidden');
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1464);
instance._lastColIndex = lastColIndex = allThRealHeader.size()-1;

            // We MUST set the tablesize to 1px, otherwise some browsers will stretch it and return a false value of the columnwidths
            // DO NOT set width to '' or 0px, but to 1px (safari and chrome would otherwise fail)
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1468);
realDataTable.setStyle('width', '1px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1469);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1470);
yScrollerContainer.setStyle('width', '1px');
            }

            // ALWAYS transform columnwidth to pixels. This is KEY to a predictable colwidth. But first reset lastcolwidthexpansion
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1474);
totalWidth = instance._transformAllColumnWidthToPixels();
            // instance._distributedSpace should have been set to 0 by instance._transformAllColumnWidthToPixels
            // but just in case there are roundingerrors we set it exactly to 0
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1477);
if (instance._distributedSpace>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1478);
instance._distributedSpace = 0;
            }

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1481);
if (scrollY) {
                // Some browsers have the y-scrollbar above the last cell, dissapearing at will. Others have them laying next to the last cell.
                // We need to capture this behaviour when we want to repositions the y-scrollbar
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1484);
scrollTheaders = yScrollerContainer && dtScrollHeader.all('th');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1485);
instance._scrollbarOffset = scrollbarOffset = (
                    scrollTheaders
                    && parseInt(scrollTheaders.item(scrollTheaders.size()-1).getStyle('paddingRight'), 10)
                ) || 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1489);
totalWidth += scrollbarOffset;
                // in this stage, we need to set the width of yScrollerContainer
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1491);
yScrollerContainer.setStyle('width', totalWidth + 'px');
            }

            // in this stage, we need to set the width of realDataTable
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1495);
realDataTable.setStyle('width', totalWidth + 'px');
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1496);
totalWidth = Math.max(totalWidth, parseInt(xScroller.getStyle('width'), 10));

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1498);
if (scrollY) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1499);
dtScrollHeader.all('th').each(
                    function(th, index) {
                        // add the resizeclass to the th-elements of the scrollable header
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 5)", 1500);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1502);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1503);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                // Next is a fix to have the y-scroller also visible in browsers that autohide it (chrome, safari)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1507);
yScrollBar.setStyle('width', '16px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1508);
instance._syncYScrollerUI(totalWidth);
            }
            else {
                // If not y-scroller, then add the resizeclass to the th-elements of the real datatable
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1512);
allThRealHeader.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 6)", 1513);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1514);
colObject = dt.getColumn(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1515);
th.toggleClass(RESIZABLE_COLUMN_CLASS, Lang.isBoolean(colObject.resizable) && colObject.resizable);
                    }
                );
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1518);
if (!dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1519);
instance._setDTWidthFromInternal(totalWidth+DATATABLE_BORDERWIDTH);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1522);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_transformAllColumnWidthToPixels", 1536);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1537);
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
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1549);
instance._busyTransformAllColumnWidthToPixels = true;
            // empty current definition of notspeccols:
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1551);
notSpecCols.length = 0;
            
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1553);
allThRealHeader.each(
                function(th, index) {
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 7)", 1554);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1555);
colConfigObject = dt.getColumn(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1556);
configWidth = colConfigObject && colConfigObject.width;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1557);
percentWidth = configWidth &&  (configWidth.substr(configWidth.length-1)==='%');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1558);
thcell = allThRealHeader && allThRealHeader.item(index);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1559);
expansion = (thcell && thcell.getData(EXPANSIONDATA)) || 0;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1560);
storedPercentedWidth = (thcell && thcell.getData(PERCENTEDWIDTHDATA)) || '';
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1561);
percentedIsStored = (storedPercentedWidth.length>0);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1562);
definedColWidth = (thcell && thcell.getData(DEFINEDCOLWIDTHDATA)) || DATAYES;
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1563);
if (definedColWidth===DATAYES) {
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1564);
if (percentWidth || percentedIsStored) {
                            // transform to pixels. BUT also need to store that the column was in percent!
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1566);
if (percentedIsStored) {
                                // retake the percents instead of the set pixels
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1568);
configWidth = storedPercentedWidth;
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1570);
if (thcell) {
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1571);
thcell.setData(PERCENTEDWIDTHDATA, configWidth);
                            }
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1573);
configWidth = colConfigObject.width = Math.round(dtWidthWithBorder*parseFloat(configWidth)/100)+'px';
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1574);
fireInPercent = true;
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1577);
fireInPercent = false;
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1578);
if (thcell) {
                                // reset
                                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1580);
thcell.setData(PERCENTEDWIDTHDATA, null);
                            }
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1584);
if (configWidth && (definedColWidth===DATAYES)) {
                        // width is defined in objectconfig
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1586);
width = parseInt(configWidth, 10) - expansion;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1587);
usedSpace += instance.setColumnWidth(index, width, 0, fireInPercent);
                    }
                    else {
                        // no width is defined in objectconfig --> store the column because we need to redefine all remaining space afterwards
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1591);
notSpecCols.push(index);
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1592);
if (thcell) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1593);
thcell.setData(DEFINEDCOLWIDTHDATA, DATANO);
                        }
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1598);
if (notSpecCols.length>0) {
                // Define the exact colwidth to the colls in this second loop: need to be done after the predefined colls have their width
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1600);
remainingSpace = 0;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1601);
YArray.each(
                    notSpecCols,
                    function(colIndex) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 8)", 1603);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1604);
remainingSpace += instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true));
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1608);
total = usedSpace + remainingSpace;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1609);
instance._busyTransformAllColumnWidthToPixels = false;
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1610);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_changeUnselectableIE", 1622);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1623);
var instance = this,
                headers = instance._dtScrollHeader || instance._dtRealDataTableHeader,
                headerList = headers && headers.all('th'),
                unselectableBkpList = instance._unselectableBkpList,
                bkpMade;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1629);
if (Y.UA.ie>0) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1630);
bkpMade = (unselectableBkpList.length>0);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1631);
headerList.each(
                    function(th, index) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 9)", 1632);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1633);
if (noSelect && !bkpMade) {
                            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1634);
instance._unselectableBkpList.push(th.get('unselectable') || '');
                        }
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1636);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_checkRemainingColSpace", 1652);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1653);
var instance = this,
                xScroller = instance._dtXScroller,
                prevDistributedSpace = instance._distributedSpace,
                widthViewport = parseInt(xScroller.getStyle('width'), 10),
                distributeSpace, compairContainer, widthCompairContainer;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1659);
if (instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1660);
instance._busyDistributeRemainingSpace = true;  // prevent being looped within setColumnWidth
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1661);
compairContainer = instance._dtYScrollerContainer || instance._dtRealDataTable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1662);
widthCompairContainer = yScrollerWidth || parseInt(compairContainer.getStyle('width'),10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1663);
distributeSpace = prevDistributedSpace + widthViewport - widthCompairContainer;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1664);
xScroller.setStyle('overflowX', (distributeSpace<0) ? 'scroll' : 'hidden');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1665);
distributeSpace = Math.max(0, distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1666);
compairContainer.setStyle('width', widthViewport+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1667);
instance._distributeRemainingSpace(distributeSpace);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1668);
instance._busyDistributeRemainingSpace = false;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1669);
widthCompairContainer = widthCompairContainer+distributeSpace-prevDistributedSpace;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1670);
if (instance._dtScrollY) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1671);
instance._syncYScrollerUI(widthCompairContainer, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1674);
instance._dtRealDataTable.setStyle('width', widthCompairContainer + 'px');
                }
                // even if it is set within setColumnWidth, always reset it now (prevent diferentation over time due to rounding errors):
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1677);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_distributeRemainingSpace", 1690);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1691);
var instance = this,
                notSpecCols = instance._notSpecCols,
                notSpecColSize = notSpecCols.length,
                correction, lastColCorrection;

            // instance._distributedSpace will be filled during resizing cols
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1697);
if (notSpecColSize>0) {
                // remaining space needs to be added to the undefined colls
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1699);
correction = Math.round(amount/notSpecColSize);
                // due to roundingdifferences, not all space might be added. Therefore we need an extra check
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1701);
lastColCorrection = correction + amount - (correction*notSpecColSize);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1702);
YArray.each(
                    notSpecCols,
                    function(colIndex, item) {
                        _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 10)", 1704);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1705);
var extra = (item===(notSpecColSize-1)) ? lastColCorrection : correction;
                        _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1706);
instance.setColumnWidth(colIndex, instance.getColumnWidthPx(colIndex, true), extra);
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1711);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_expandLastCell", 1724);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1725);
var instance = this,
                lastColIndex = instance._lastColIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1728);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_syncYScrollerUI", 1739);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1741);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                yScrollerContainer = instance._dtYScrollerContainer,
                prevWidthYScrollerContainer, xScrollerWidth;

            // to prevent getting into a loop: we must not call this method when this._busyDistributeRemainingSpace===true
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1748);
if (!instance._busyDistributeRemainingSpace) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1749);
if (instance._dtWidthDefined) {
                    // dt has width either in percent or pixels
                    // never sync to values below xScroller-width
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1752);
xScrollerWidth = parseInt(instance._dtXScroller.getStyle('width'), 10);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1753);
tableWidth = Math.max(tableWidth, xScrollerWidth);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1754);
realDataTable.setStyle('width', (tableWidth-instance._scrollbarOffset)+'px');
                }
                else {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1757);
instance._setDTWidthFromInternal(tableWidth+DATATABLE_BORDERWIDTH);
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1758);
instance._dtXScroller.setStyle('width', tableWidth+'px');
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1759);
instance._dtBoundingBox.setStyle('width', (tableWidth+DATATABLE_BORDERWIDTH)+'px');
                }
                // Next we must do some settings to prevent chrome and safari to reset the totalwidth after resorting a column:
                // now resizing
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1763);
prevWidthYScrollerContainer = parseInt(yScrollerContainer.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1764);
yScrollerContainer.setStyle('width', tableWidth+'px');
                // Also reset scroller-y for this has a width of 1px
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1766);
instance._dtYScroller.setStyle('width', tableWidth+'px');
                // prevent looping by checking comesFromSetVisibilityXScroller
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1768);
if (!comesFromCheckRemainingColSpace) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1769);
instance._checkRemainingColSpace(prevWidthYScrollerContainer);
                }
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1771);
if (!instance._dtWidthDefined) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1772);
Y.rbind(dt._syncScrollUI, dt)();
                }
                // The scrollbar NEEDS to be set AFTER _checkRemainingColSpace and after _syncScrollUI
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1775);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getThCel", 1786);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1787);
var instance = this,
                allThRealHeader = instance._dtRealDataTableTHNodes,
                colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1791);
if (!Lang.isNumber(name)) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1792);
colIndex = instance._getColIndexFromName(name);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1794);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_getColIndexFromName", 1804);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1805);
var instance = this,
                dt, colConfigObject, columns, colIndex;

            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1808);
if (typeof name === 'string') {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1809);
dt = instance.datatable;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1810);
colConfigObject = dt.getColumn(name);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1811);
columns = dt.get('columns');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1812);
colIndex = YArray.indexOf(columns, colConfigObject);
            }
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1814);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_setDTWidthFromInternal", 1828);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1829);
var instance = this,
                dt = instance.datatable,
                realDataTable = instance._dtRealDataTable,
                prevWidthRealDataTable;

            // be careful: realDataTable does not exist when called during very first initialisation by InitUI()
            // we don't need to restore this width anyway at that point.
            _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1836);
if (!instance._dtWidthDefined) {
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1837);
prevWidthRealDataTable = realDataTable && parseInt(realDataTable.getStyle('width'), 10);
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1838);
instance._widthChangeInternally = true;
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1839);
dt.set('width', newWidth+'px');
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1840);
instance._widthChangeInternally = false;
                // now set instance._dtWidthDefined to false again, because it was false and is set to true!
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1842);
instance._dtWidthDefined = false;
                // always reset the realdatatable, because it wis resetted by dt.set(width)
                _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1844);
if (realDataTable) {
                    _yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1845);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearResizeEventhandlers", 1860);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1861);
YArray.each(
                this._resizeEventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 11)", 1863);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1864);
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
            _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "_clearEventhandlers", 1877);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1878);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "(anonymous 12)", 1880);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1881);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1904);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1905);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1923);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1924);
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
                    _yuitest_coverfunc("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", "validator", 1939);
_yuitest_coverline("build/gallery-itsadtcolumnresize/gallery-itsadtcolumnresize.js", 1940);
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
