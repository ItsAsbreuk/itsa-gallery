YUI.add('gallery-itsafilemanager', function (Y, NAME) {

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
            Y.log('initializer', 'info', 'ITSAFileManager');
            var instance = this;

            instance.set('headerContent', FILEMAN_HEADERTEMPLATE);
            instance.set('bodyContent', FILEMAN_TEMPLATE);
            if (instance.statusBar) {
                instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            }
            instance._bodyNode = Y.one('body');
            instance.after(
                'render',
                instance._afterRender,
                instance
            );
        },

        _afterRender : function() {
            Y.log('_afterRender', 'info', 'ITSAFileManager');
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            // extend the time that the widget is invisible
            boundingBox.toggleClass('yui3-itsafilemanager-loading', true);
            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.filemanTree');
            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.filemanFlow');
            instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);
            instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);
            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            if (instance.hasPlugin('dd')) {
                instance.dd.addHandle('.yui3-widget-hd');
            }
            if (instance.hasPlugin('resize')) {
                if (!instance.resize.hasPlugin('con')) {
                    Y.use('resize-constrain', function() {
                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                        instance._setConstraints();
                        boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                    });
                }
                else {
                    instance.resize.con.set('preserveRatio', false);
                    instance._setConstraints();
                    boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                }
            }
            else {
                // set to minimal sizes, even when no resizeplugin is set
                instance._setConstraints();
                boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
            }
        },

        _setConstraints : function() {
            Y.log('_setConstraints', 'info', 'ITSAFileManager');
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
            if (pluginConstraints) {
                pluginConstraints.set('minWidth', minWidth);
                pluginConstraints.set('minHeight', minHeight);
            }
            if (parseInt(boundingBox.getStyle('width'), 10)<minWidth) {
                boundingBox.setStyle('width', minWidth+'px');
                // initiate areawidths
                instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            }
            if (parseInt(boundingBox.getStyle('height'), 10)<minHeight) {
                boundingBox.setStyle('height', minHeight+'px');
                instance._panelBD.setStyle('height',
                    (minHeight
                        - heightPanelHD
                        - heightPanelFT
                    )+'px');
                // initiate areawidths
                instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            }
        },

        _correctHeightAfterResize : function() {
            Y.log('_correctHeightAfterResize', 'info', 'ITSAFileManager');
            var instance = this,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;
            instance._panelBD.setStyle('height',
                (parseInt(instance.get('boundingBox').getStyle('height'), 10)
                    - heightPanelHD
                    - heightPanelFT
                )+'px');
        },

        bindUI : function() {
            Y.log('bindUI', 'info', 'ITSAFileManager');
            var instance = this,
                resizeEventhandlers = instance._resizeEventhandlers,
                contentBox = instance.get('contentBox'),
                panelBD;

            instance._panelHD = contentBox.one('.yui3-widget-hd');
            instance._panelBD = panelBD = contentBox.one('.yui3-widget-bd');
            instance._panelFT = contentBox.one('.yui3-widget-ft');

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            resizeEventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            resizeEventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            resizeEventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            resizeEventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            if (instance.hasPlugin('resize')) {
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
            this.set('flowVisible', true);
        },

        hideFlow : function() {
            this.set('flowVisible', false);
        },

        showTree : function() {
            this.set('treeVisible', true);
        },

        hideTree : function() {
            this.set('treeVisible', false);
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'info', 'ITSAFileManager');
            var instance = this;

            if (instance._resizeEvent) {
                instance._resizeEvent.detach();
            }
            instance._clearEventhandlers();
        },

        //=====================================================================

        _checkResizeAprovement : function(e) {
            if (!this._busyResize) {
                Y.log('_checkResizeAprovement', 'info', 'ITSAFileManager');
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

                instance._resizeApprovedX = treeVisible && (offsetX<=halfResizeMargin);
                instance._resizeApprovedY = flowVisible && (offsetY<=halfResizeMargin)
                                            && (!treeVisible || (mouseX>(panelBDX+halfResizeMargin)));
                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);
            }
        },

        _checkEndResizeApprovement : function() {
            Y.log('_checkEndResizeApprovement', 'info', 'ITSAFileManager');
            var instance = this;

            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
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
            Y.log('_endResizeApprovement', 'info', 'ITSAFileManager');
            var instance = this,
                contentBox = instance.get('contentBox');

            instance._resizeApprovedX = false;
            instance._resizeApprovedY = false;
            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);
        },

        _startResize : function(e) {
            var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            if (instance._resizeApprovedX) {
                Y.log('_startResize split-resize-x will be started', 'info', 'ITSAFileManager');
                instance._busyResize = true;
                nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                if (instance._resizeEvent) {
                    instance._resizeEvent.detach();
                }
                instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumnX,
                    instance
                );
            }
            else if (instance._resizeApprovedY) {
                Y.log('_startResize split-resize-y will be started', 'info', 'ITSAFileManager');
                instance._busyResize = true;
                nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                if (instance._resizeEvent) {
                    instance._resizeEvent.detach();
                }
                instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeColumnY,
                    instance
                );
            }
        },

        _stopResize : function() {
            Y.log('_stopResize', 'info', 'ITSAFileManager');
            var instance = this;

            if (instance._busyResize) {
                Y.log('_stopResize split-resize is ended', 'info', 'ITSAFileManager');
                instance._busyResize = false;
                if (instance._resizeEvent) {
                    instance._resizeEvent.detach();
                }
            }
        },

        _resizeColumnX : function(e) {
            if (this._busyResize) {
                Y.log('_resizeColumnX', 'info', 'ITSAFileManager');
                var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                instance.set('sizeTreeArea', newWidth);
            }
        },

        _resizeColumnY : function(e) {
            if (this._busyResize) {
                Y.log('_resizeColumnY', 'info', 'ITSAFileManager');
                var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

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
            Y.log('_clearEventhandlers', 'info', 'ITSAFileManager');

            YArray.each(
                this._eventhandlers,
                function(item){
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
                    return Lang.isBoolean(val);
                },
                setter: function(val) {
                    var instance = this;
                    instance._nodeFilemanTree.setStyle('display', (val ? 'inline-block' : 'none'));
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                },
                getter: function() {
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
                    return Lang.isBoolean(val);
                },
                setter: function(val) {
                    var instance = this;
                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                },
                getter: function() {
                    return this._nodeFilemanFlow.getStyle('display')!=='none';
                }
            },

            sizeTreeArea: {
                value: 200,
                validator: function(val) {
                    return (Lang.isNumber(val));
                },
                setter: function(val) {
                    var instance = this,
                        nodeFilemanTree = instance._nodeFilemanTree,
                        borderTreeArea = instance._borderTreeArea,
                        minWidth = Math.max(instance.get('minSizeTreeArea'), borderTreeArea),
                        maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minSizeFileArea'),
                        newWidth = Math.max(val, minWidth),
                        realTreeWidth;
                    newWidth = Math.min(newWidth, maxWidth);
                    realTreeWidth = newWidth - borderTreeArea;
                    nodeFilemanTree.setStyle('width', realTreeWidth+'px');
                    nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
                    instance._panelBD.setStyle('marginLeft', newWidth+'px');
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                }
            },

            sizeFlowArea: {
                value: 150,
                validator: function(val) {
                    return (Lang.isNumber(val));
                },
                setter: function(val) {
                    var instance = this,
                        borderFlowArea = instance._borderFlowArea,
                        minHeight = Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0),
                        maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minSizeFileArea')-borderFlowArea,
                        newHeight = Math.max(val-borderFlowArea, minHeight);
                    newHeight = Math.min(newHeight, maxHeight);
                    instance._nodeFilemanFlow.setStyle('height', newHeight+'px');
                    if (instance.resize && instance.resize.hasPlugin('con')) {
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
                    return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
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
                    return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
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
                    return (Lang.isNumber(val) && (val>=0));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
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
                    return (Lang.isNumber(val) && (val>=2) && (val<=60));
                }
            },

            statusBar: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    return Lang.isBoolean(val);
                },
                setter: function() {
                    this.set('footerContent', FILEMAN_FOOTERTEMPLATE);
                }
            },

            border: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    return Lang.isBoolean(val);
                },
                setter: function(val) {
                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);
                }
            },

            shadow: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    return Lang.isBoolean(val);
                },
                setter: function(val) {
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
