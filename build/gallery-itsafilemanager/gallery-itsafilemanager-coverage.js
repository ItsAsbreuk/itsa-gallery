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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsafilemanager/gallery-itsafilemanager.js",
    code: []
};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * DataTable ColumnResize Plugin"," *"," *"," * If you want to make the columns resizable, than you just define the datatable-attribute 'colsresizable' like:"," *"," * myDatatable.set('colsresizable', true);"," *"," * This can be done at initialisation of the datatable, before Y.Plugin.ITSADTColumnResize is plugged in, or later on."," * The attribute 'colsresizable' can have three states:"," *"," * <ul>"," * <li>true --> all columns are resizable</li>"," * <li>false --> colresizing is disabled</li>"," * <li>null/undefined --> colresizing is active where only columns(objects) that have the property 'resizable' will be resizable</li>"," * </ul>"," *"," * If myDatatable.get('colsresizable') is undefined or null, then only columns with colConfig.resizable=true are resizable."," *"," *"," * @module gallery-itsadtcolumnresize"," * @class Plugin.ITSADTColumnResize"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    FILEMAN_HEADERTEMPLATE = \"filemanager\",","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMAN_TEMPLATE = \"<div class='filemanTree'></div>\"","                     + \"<div class='filemanMain'><div class='filemanFlow'></div><div class='filemanItems'></div></div>\",","    FILEMAN_RESIZINGX_CLASS = 'yui3-filemanager-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = 'yui3-filemanager-itsaresehandlery',","    FILEMAN_BORDER = 'yui3-itsafilemanager-border',","    FILEMAN_SHADOW = 'yui3-itsafilemanager-shadow';","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        _resizeEventhandlers : [],","        _resizeApprovedX : false,","        _resizeApprovedY : false,","        _bodyNode : null,","        _resizeEvent : null,","        _busyResize : false,","        _panelHD : null,","        _panelBD : null,","        _panelFT : null,","        _nodeFilemanTree : null,","        _nodeFilemanFlow : null,","        _borderTreeArea : 0,","        _halfBorderTreeArea : 0,","        _borderFlowArea : 0,","        _halfBorderFlowArea : 0,","        _mouseOffset : 0,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","","            instance.set('headerContent', FILEMAN_HEADERTEMPLATE);","            instance.set('bodyContent', FILEMAN_TEMPLATE);","            if (instance.statusBar) {","                instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            }","            instance._bodyNode = Y.one('body');","            instance.after(","                'render',","                instance._afterRender,","                instance","            );","        },","","        _afterRender : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            // extend the time that the widget is invisible","            boundingBox.toggleClass('yui3-itsafilemanager-loading', true);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.filemanTree');","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.filemanFlow');","            instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);","            instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.yui3-widget-hd');","            }","            if (instance.hasPlugin('resize')) {","                if (!instance.resize.hasPlugin('con')) {","                    Y.use('resize-constrain', function() {","                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                        instance._setConstraints();","                        boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","                    });","                }","                else {","                    instance.resize.con.set('preserveRatio', false);","                    instance._setConstraints();","                    boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","                }","            }","            else {","                // set to minimal sizes, even when no resizeplugin is set","                instance._setConstraints();","                boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","            }","        },","","        _setConstraints : function() {","            var instance = this,","                pluginConstraints = instance.resize && instance.resize.con,","                panelHD = instance._panelHD,","                panelFT = instance._panelFT,","                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                minWidth = (instance.get('treeVisible') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0)","                         + instance.get('minSizeFileArea'),","                minHeight = (instance.get('flowVisible') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0)","                         + instance.get('minSizeFileArea') + heightPanelHD + heightPanelFT,","                boundingBox = instance.get('boundingBox');","            if (pluginConstraints) {","                pluginConstraints.set('minWidth', minWidth);","                pluginConstraints.set('minHeight', minHeight);","            }","            if (parseInt(boundingBox.getStyle('width'), 10)<minWidth) {","                boundingBox.setStyle('width', minWidth+'px');","                // initiate areawidths","                instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            }","            if (parseInt(boundingBox.getStyle('height'), 10)<minHeight) {","                boundingBox.setStyle('height', minHeight+'px');","                instance._panelBD.setStyle('height',","                    (minHeight","                        - heightPanelHD","                        - heightPanelFT","                    )+'px');","                // initiate areawidths","                instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            }","        },","","        _correctHeightAfterResize : function() {","            var instance = this,","                panelHD = instance._panelHD,","                panelFT = instance._panelFT,","                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;","            instance._panelBD.setStyle('height',","                (parseInt(instance.get('boundingBox').getStyle('height'), 10)","                    - heightPanelHD","                    - heightPanelFT","                )+'px');","        },","","        bindUI : function() {","            var instance = this,","                resizeEventhandlers = instance._resizeEventhandlers,","                contentBox = instance.get('contentBox'),","                panelBD;","","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            instance._panelBD = panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            resizeEventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            resizeEventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            resizeEventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            resizeEventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            if (instance.hasPlugin('resize')) {","                resizeEventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","            }","","        },","","        showFlow : function() {","            this.set('flowVisible', true);","        },","","        hideFlow : function() {","            this.set('flowVisible', false);","        },","","        showTree : function() {","            this.set('treeVisible', true);","        },","","        hideTree : function() {","            this.set('treeVisible', false);","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","        },","","        //=====================================================================","","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    treeVisible = instance.get('treeVisible'),","                    flowVisible = instance.get('flowVisible'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = treeVisible && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flowVisible && (offsetY<=halfResizeMargin)","                                            && (!treeVisible || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Will togle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @param {e} eventFacade","         * @since 0.1","         *","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeColumnX,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeColumnY,","                    instance","                );","            }","        },","","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        },","","        _resizeColumnX : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        _resizeColumnY : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        ATTRS : {","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * @attribute treeVisible","             * @type Boolean","             * @since 0.1","            */","            treeVisible: {","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanTree.setStyle('display', (val ? 'inline-block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                },","                getter: function() {","                    return this._nodeFilemanTree.getStyle('display')!=='none';","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * @attribute flowVisible","             * @type Boolean","             * @since 0.1","            */","            flowVisible: {","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                },","                getter: function() {","                    return this._nodeFilemanFlow.getStyle('display')!=='none';","                }","            },","","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (Lang.isNumber(val));","                },","                setter: function(val) {","                    var instance = this,","                        nodeFilemanTree = instance._nodeFilemanTree,","                        borderTreeArea = instance._borderTreeArea,","                        minWidth = Math.max(instance.get('minSizeTreeArea'), borderTreeArea),","                        maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minSizeFileArea'),","                        newWidth = Math.max(val, minWidth),","                        realTreeWidth;","                    newWidth = Math.min(newWidth, maxWidth);","                    realTreeWidth = newWidth - borderTreeArea;","                    nodeFilemanTree.setStyle('width', realTreeWidth+'px');","                    nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","                    instance._panelBD.setStyle('marginLeft', newWidth+'px');","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (Lang.isNumber(val));","                },","                setter: function(val) {","                    var instance = this,","                        borderFlowArea = instance._borderFlowArea,","                        minHeight = Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0),","                        maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minSizeFileArea')-borderFlowArea,","                        newHeight = Math.max(val-borderFlowArea, minHeight);","                    newHeight = Math.min(newHeight, maxHeight);","                    instance._nodeFilemanFlow.setStyle('height', newHeight+'px');","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 0<br>","             * @default 20","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 0<br>","             * @default 20","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 0<br>","             * @default 20","             * @attribute minSizeFileArea","             * @type int","             * @since 0.1","            */","            minSizeFileArea: {","                value: 100,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 14","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            statusBar: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function() {","                    this.set('footerContent', FILEMAN_FOOTERTEMPLATE);","                }","            },","","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            },","","            /**","             * @description Minamal colwidth that a column can reach by resizing<br>","             * Will be overruled by content of the columnheader, because the headingtext will always be visible<br>","             * minimum value = 0","             * @default 0","             * @attribute minColWidth","             * @type int","             * @since 0.1","            */","            minColWidth: {","                value: 0,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=0));","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-touch\",","        \"pluginhost-base\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"37":0,"48":0,"74":0,"76":0,"77":0,"78":0,"79":0,"81":0,"82":0,"90":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"103":0,"104":0,"105":0,"106":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"117":0,"118":0,"119":0,"124":0,"125":0,"130":0,"141":0,"142":0,"143":0,"145":0,"146":0,"148":0,"150":0,"151":0,"152":0,"158":0,"163":0,"168":0,"176":0,"181":0,"182":0,"183":0,"186":0,"196":0,"205":0,"215":0,"223":0,"224":0,"236":0,"240":0,"244":0,"248":0,"257":0,"259":0,"260":0,"262":0,"268":0,"269":0,"285":0,"286":0,"288":0,"289":0,"294":0,"296":0,"297":0,"311":0,"314":0,"315":0,"316":0,"317":0,"321":0,"326":0,"327":0,"328":0,"330":0,"333":0,"334":0,"336":0,"342":0,"343":0,"344":0,"346":0,"349":0,"350":0,"352":0,"361":0,"363":0,"364":0,"365":0,"366":0,"372":0,"373":0,"378":0,"383":0,"384":0,"389":0,"403":0,"406":0,"421":0,"424":0,"425":0,"426":0,"427":0,"431":0,"443":0,"446":0,"447":0,"448":0,"449":0,"453":0,"460":0,"463":0,"470":0,"471":0,"472":0,"473":0,"474":0,"475":0,"476":0,"484":0,"487":0,"492":0,"493":0,"494":0,"495":0,"514":0,"517":0,"518":0,"519":0,"538":0,"541":0,"542":0,"543":0,"562":0,"565":0,"566":0,"567":0,"587":0,"606":0,"614":0,"617":0,"625":0,"628":0,"636":0,"639":0,"655":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"initializer:73":0,"(anonymous 2):110":0,"_afterRender:89":0,"_setConstraints:129":0,"_correctHeightAfterResize:162":0,"bindUI:175":0,"showFlow:235":0,"hideFlow:239":0,"showTree:243":0,"hideTree:247":0,"destructor:256":0,"_checkResizeAprovement:267":0,"_checkEndResizeApprovement:293":0,"_endResizeApprovement:310":0,"_startResize:320":0,"_stopResize:360":0,"_resizeColumnX:371":0,"_resizeColumnY:382":0,"(anonymous 3):405":0,"_clearEventhandlers:401":0,"validator:420":0,"setter:423":0,"getter:430":0,"validator:442":0,"setter:445":0,"getter:452":0,"validator:459":0,"setter:462":0,"validator:483":0,"setter:486":0,"validator:513":0,"setter:516":0,"validator:537":0,"setter:540":0,"validator:561":0,"setter:564":0,"validator:586":0,"validator:605":0,"validator:613":0,"setter:616":0,"validator:624":0,"setter:627":0,"validator:635":0,"setter:638":0,"validator:654":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 155;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 46;
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1);
YUI.add('gallery-itsafilemanager', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 3);
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
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 37);
var Lang = Y.Lang,
    YArray = Y.Array,
    FILEMAN_HEADERTEMPLATE = "filemanager",
    FILEMAN_FOOTERTEMPLATE = "ready",
    FILEMAN_TEMPLATE = "<div class='filemanTree'></div>"
                     + "<div class='filemanMain'><div class='filemanFlow'></div><div class='filemanItems'></div></div>",
    FILEMAN_RESIZINGX_CLASS = 'yui3-filemanager-itsaresehandlerx',
    FILEMAN_RESIZINGY_CLASS = 'yui3-filemanager-itsaresehandlery',
    FILEMAN_BORDER = 'yui3-itsafilemanager-border',
    FILEMAN_SHADOW = 'yui3-itsafilemanager-shadow';

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 48);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        _resizeEventhandlers : [],
        _resizeApprovedX : false,
        _resizeApprovedY : false,
        _bodyNode : null,
        _resizeEvent : null,
        _busyResize : false,
        _panelHD : null,
        _panelBD : null,
        _panelFT : null,
        _nodeFilemanTree : null,
        _nodeFilemanFlow : null,
        _borderTreeArea : 0,
        _halfBorderTreeArea : 0,
        _borderFlowArea : 0,
        _halfBorderFlowArea : 0,
        _mouseOffset : 0,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 73);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 74);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 76);
instance.set('headerContent', FILEMAN_HEADERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 77);
instance.set('bodyContent', FILEMAN_TEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 78);
if (instance.statusBar) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 79);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 81);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 82);
instance.after(
                'render',
                instance._afterRender,
                instance
            );
        },

        _afterRender : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 89);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 90);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 95);
boundingBox.toggleClass('yui3-itsafilemanager-loading', true);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 96);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.filemanTree');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 97);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.filemanFlow');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 98);
instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 99);
instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 100);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 101);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 103);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 104);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 105);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 106);
instance.dd.addHandle('.yui3-widget-hd');
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 108);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 109);
if (!instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 110);
Y.use('resize-constrain', function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 110);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 111);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 112);
instance._setConstraints();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 113);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                    });
                }
                else {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 117);
instance.resize.con.set('preserveRatio', false);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 118);
instance._setConstraints();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 119);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                }
            }
            else {
                // set to minimal sizes, even when no resizeplugin is set
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 124);
instance._setConstraints();
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 125);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
            }
        },

        _setConstraints : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 129);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 130);
var instance = this,
                pluginConstraints = instance.resize && instance.resize.con,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                minWidth = (instance.get('treeVisible') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0)
                         + instance.get('minSizeFileArea'),
                minHeight = (instance.get('flowVisible') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0)
                         + instance.get('minSizeFileArea') + heightPanelHD + heightPanelFT,
                boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 141);
if (pluginConstraints) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 142);
pluginConstraints.set('minWidth', minWidth);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 143);
pluginConstraints.set('minHeight', minHeight);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 145);
if (parseInt(boundingBox.getStyle('width'), 10)<minWidth) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 146);
boundingBox.setStyle('width', minWidth+'px');
                // initiate areawidths
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 148);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 150);
if (parseInt(boundingBox.getStyle('height'), 10)<minHeight) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 151);
boundingBox.setStyle('height', minHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 152);
instance._panelBD.setStyle('height',
                    (minHeight
                        - heightPanelHD
                        - heightPanelFT
                    )+'px');
                // initiate areawidths
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 158);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            }
        },

        _correctHeightAfterResize : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 162);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 163);
var instance = this,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 168);
instance._panelBD.setStyle('height',
                (parseInt(instance.get('boundingBox').getStyle('height'), 10)
                    - heightPanelHD
                    - heightPanelFT
                )+'px');
        },

        bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 175);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 176);
var instance = this,
                resizeEventhandlers = instance._resizeEventhandlers,
                contentBox = instance.get('contentBox'),
                panelBD;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 181);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 182);
instance._panelBD = panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 183);
instance._panelFT = contentBox.one('.yui3-widget-ft');

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 186);
resizeEventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 196);
resizeEventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 205);
resizeEventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 215);
resizeEventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 223);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 224);
resizeEventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
            }

        },

        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 235);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 236);
this.set('flowVisible', true);
        },

        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 239);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 240);
this.set('flowVisible', false);
        },

        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 243);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 244);
this.set('treeVisible', true);
        },

        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 247);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 248);
this.set('treeVisible', false);
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 256);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 257);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
instance._clearEventhandlers();
        },

        //=====================================================================

        _checkResizeAprovement : function(e) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 267);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 268);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 269);
var instance = this,
                    panelBD = instance._panelBD,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    mouseX = e.pageX,
                    mouseY = e.pageY,
                    panelBDX = panelBD.getX(),
                    panelBDY = panelBD.getY(),
                    contentBox = instance.get('contentBox'),
                    treeVisible = instance.get('treeVisible'),
                    flowVisible = instance.get('flowVisible'),
                    flowHeight = nodeFilemanFlow.get('offsetHeight'),
                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),
                    halfResizeMargin = Math.round(resizeMargin/2),
                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),
                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 285);
instance._resizeApprovedX = treeVisible && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 286);
instance._resizeApprovedY = flowVisible && (offsetY<=halfResizeMargin)
                                            && (!treeVisible || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 288);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 289);
contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);
            }
        },

        _checkEndResizeApprovement : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 293);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 294);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 296);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 297);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 310);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 311);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 314);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 315);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 316);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 317);
contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);
        },

        _startResize : function(e) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 320);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 321);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 326);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 327);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 328);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 330);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 333);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 334);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 336);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumnX,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 342);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 343);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 344);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 346);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 349);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 350);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 352);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumnY,
                    instance
                );
            }}
        },

        _stopResize : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 360);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 361);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 363);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 364);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 365);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 366);
instance._resizeEvent.detach();
                }
            }
        },

        _resizeColumnX : function(e) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeColumnX", 371);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 372);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 373);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 378);
instance.set('sizeTreeArea', newWidth);
            }
        },

        _resizeColumnY : function(e) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeColumnY", 382);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 383);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 384);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 389);
instance.set('sizeFlowArea', newHeight);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 401);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 403);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 405);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 406);
item.detach();
                }
            );
        }

    }, {
        ATTRS : {
            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * @attribute treeVisible
             * @type Boolean
             * @since 0.1
            */
            treeVisible: {
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 420);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 421);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 423);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 424);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 425);
instance._nodeFilemanTree.setStyle('display', (val ? 'inline-block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 426);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 427);
instance._setConstraints();
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 430);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 431);
return this._nodeFilemanTree.getStyle('display')!=='none';
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * @attribute flowVisible
             * @type Boolean
             * @since 0.1
            */
            flowVisible: {
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 442);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 443);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 445);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 446);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 447);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 448);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 449);
instance._setConstraints();
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 452);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 453);
return this._nodeFilemanFlow.getStyle('display')!=='none';
                }
            },

            sizeTreeArea: {
                value: 200,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 459);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 460);
return (Lang.isNumber(val));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 462);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 463);
var instance = this,
                        nodeFilemanTree = instance._nodeFilemanTree,
                        borderTreeArea = instance._borderTreeArea,
                        minWidth = Math.max(instance.get('minSizeTreeArea'), borderTreeArea),
                        maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minSizeFileArea'),
                        newWidth = Math.max(val, minWidth),
                        realTreeWidth;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 470);
newWidth = Math.min(newWidth, maxWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 471);
realTreeWidth = newWidth - borderTreeArea;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 472);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 473);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 474);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 475);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 476);
instance._setConstraints();
                    }
                }
            },

            sizeFlowArea: {
                value: 150,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 483);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 484);
return (Lang.isNumber(val));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 486);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 487);
var instance = this,
                        borderFlowArea = instance._borderFlowArea,
                        minHeight = Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0),
                        maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minSizeFileArea')-borderFlowArea,
                        newHeight = Math.max(val-borderFlowArea, minHeight);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 492);
newHeight = Math.min(newHeight, maxHeight);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 493);
instance._nodeFilemanFlow.setStyle('height', newHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 494);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 495);
instance._setConstraints();
                    }
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 0<br>
             * @default 20
             * @attribute minSizeTreeArea
             * @type int
             * @since 0.1
            */
            minSizeTreeArea: {
                value: 100,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 513);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 514);
return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 516);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 517);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 518);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 519);
instance._setConstraints();
                    }
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 0<br>
             * @default 20
             * @attribute minSizeFlowArea
             * @type int
             * @since 0.1
            */
            minSizeFlowArea: {
                value: 100,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 537);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 538);
return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 540);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 541);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 542);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 543);
instance._setConstraints();
                    }
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 0<br>
             * @default 20
             * @attribute minSizeFileArea
             * @type int
             * @since 0.1
            */
            minSizeFileArea: {
                value: 100,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 561);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 562);
return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 564);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 565);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 566);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 567);
instance._setConstraints();
                    }
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 14
             * @attribute resizeMargin
             * @type int
             * @since 0.1
            */
            resizeMargin: {
                value: 6,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 586);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 587);
return (Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            /**
             * @description Width of the area where you can resize in touchdevices.<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 32
             * @attribute resizeMarginTouchDevice
             * @type int
             * @since 0.1
            */
            resizeMarginTouchDevice: {
                value: 32,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 605);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 606);
return (Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            statusBar: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 613);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 614);
return Lang.isBoolean(val);
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 616);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 617);
this.set('footerContent', FILEMAN_FOOTERTEMPLATE);
                }
            },

            border: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 624);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 625);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 627);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 628);
this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);
                }
            },

            shadow: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 635);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 636);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 638);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 639);
this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 654);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 655);
return (Lang.isNumber(val) && (val>=0));
                }
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "panel",
        "node-base",
        "node-screen",
        "node-event-delegate",
        "event-mouseenter",
        "event-custom",
        "event-touch",
        "pluginhost-base"
    ],
    "skinnable": false
});
