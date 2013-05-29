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
    FILEMANCLASSNAME = 'yui3-itsafilemanager',
    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',
    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',
    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',
    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',
    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',
    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',
    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',
    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',
    FILEMAN_TEMPLATE = "<div class='"+FILEMAN_TREE_CLASS+"'></div>"+
                                        "<div class='"+FILEMAN_MAIN_CLASS+"'>"+
                                            "<div class='"+FILEMAN_FLOW_CLASS+"'></div>"+
                                            "<div class='"+FILEMAN_ITEMS_CLASS+"'></div>"+
                                        "</div>",

   /**
     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when
     * the sync layer submit-function returns an error.
     * @event error
     * @param e {EventFacade} Event Facade including:
     * @param e.error {any} Error message.
     * @param e.src {String} Source of the error. May be one of the following (or any
     *                     custom error source defined by a Model subclass):
     *
     * `submit`: An error submitting the model from within a sync layer.
     *
     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)
     *                        that failed validation will be provided as the `attribute` property on the event facade.
     *
     * @param e.attribute {String} The attribute/property that failed validation.
     * @param e.validationerror {String} The errormessage in case of attribute-validation error.
    **/
    EVT_ERROR = 'error',
   /**
     * Fired after model is submitted from the sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_LOADFILES
    EVT_LOADTREE = 'submit'
    EVT_CREATEDIR

Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            Y.log('initializer', 'info', 'Itsa-FileManager');
            var instance = this;

            instance._resizeEventhandlers = [];
            instance._resizeApprovedX = false;
            instance._resizeApprovedY = false;
            instance._bodyNode = null;
            instance._resizeEvent = null;
            instance._busyResize = false;
            instance._panelHD = null;
            instance._panelBD = null;
            instance._panelFT = null;
            instance._nodeFilemanTree = null;
            instance._nodeFilemanFlow = null;
            instance._borderTreeArea = 0;
            instance._halfBorderTreeArea = 0;
            instance._borderFlowArea = 0;
            instance._halfBorderFlowArea = 0;
            instance._mouseOffset = 0;
            instance._bodyNode = Y.one('body');
            instance._createMethods();
            instance.after(
                'render',
                instance._afterRender,
                instance
            );
        },

        /**
         * Binding eventlisteners.
         *
         * @method bindUI
         * @since 0.1
        */
        bindUI : function() {
            Y.log('bindUI', 'info', 'Itsa-FileManager');
            var instance = this,
                resizeEventhandlers = instance._resizeEventhandlers,
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next porperties here.
            instance.set('bodyContent', FILEMAN_TEMPLATE);
            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            instance._panelHD = contentBox.one('.yui3-widget-hd');
            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            instance._panelFT = contentBox.one('.yui3-widget-ft');
            if (!instance.get('statusBar')) {
                instance._panelFT.setStyle('display', 'none');
            }

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

        /**
         * Creates a new directory on the server and updates the treepane.
         *
         * @method createDir
         * @param dir {String} Directory-name to be created
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */
        createDir : function(dir) {
            var instance = this,
                  syncaction = 'createdir',
                  facade;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            facade = {
                src: syncaction
            };
            return instance.sync(syncaction).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._createdirEvent) {
                        instance._createdirEvent = instance.publish(EVT_CREATEDIR, {
                            preventable: false
                        });
                    }
                    // now we need to update Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_CREATEDIR, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            Y.log('hideFlow', 'info', 'Itsa-FileManager');
            this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            Y.log('hideTree', 'info', 'Itsa-FileManager');
            this.set('tree', false);
        },

        /**
         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.
         *
         * @method loadFiles
         * @param dir {String} Directory which files should be loaded
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */
        loadFiles : function(dir) {
            var instance = this,
                  syncaction = 'loadfiles',
                  facade;

            Y.log('loadFiles', 'info', 'Itsa-FileManager');
            facade = {
                src: syncaction
            };
            return instance.sync(syncaction).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadfilesEvent) {
                        instance._loadfilesEvent = instance.publish(EVT_LOADFILES, {
                            preventable: false
                        });
                    }
                    // now we need to add the fileresponse into Y.LazyModelList (directoryFiles)
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADFILES, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.
         *
         * @method loadFiles
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */
        loadTree : function() {
            var instance = this,
                  syncaction = 'loadtree',
                  facade, options;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            options = {
                showTreefiles: instance.get('showTreefiles')
            };
            facade = {
                options : options,
                src: syncaction
            };
            return instance.sync(syncaction, options).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_LOADTREE, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADTREE, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         *
         * @method moveDir
         * @param dir {String} Directory which files should be loaded
         * @param newParent {String} New parent-directory where 'dir' will be placed inside.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */
        moveDir : function(dir, newParent) {
            var instance = this,
                  syncaction = 'movedir',
                  facade;

            Y.log('moveDir', 'info', 'Itsa-FileManager');
            facade = {
                src: syncaction
            };
            return instance.sync(syncaction).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._movedirEvent) {
                        instance._movedirEvent = instance.publish(EVT_MOVEDIR, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_MOVEDIR, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         *
         * @method moveFiles
         * @param dir {String} New directoy where the files should be placed.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */
        moveFiles : function(dir) {
            var instance = this,
                  syncaction = 'movefiles',
                  facade;

            Y.log('moveFiles', 'info', 'Itsa-FileManager');
            facade = {
                src: syncaction
            };
            return instance.sync(syncaction).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_MOVEFILES, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_MOVEFILES, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         *
         * @method renameFile
         * @param dir {String} Directoy which files should be loaded
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */
        renameFile : function(dir) {
            var instance = this,
                  syncaction = 'renamefile',
                  facade, options;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            options = {
                showTreefiles: instance.get('showTreefiles')
            };
            facade = {
                options : options,
                src: syncaction
            };
            return instance.sync(syncaction, options).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_LOADTREE, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADTREE, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         *
         * @method renameDir
         * @param dir {String} Directoy which files should be loaded
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */
        renameDir : function(dir) {
            var instance = this,
                  syncaction = 'loadtree',
                  facade, options;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            options = {
                showTreefiles: instance.get('showTreefiles')
            };
            facade = {
                options : options,
                src: syncaction
            };
            return instance.sync(syncaction, options).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_LOADTREE, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADTREE, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         *
         * @method removeDir
         * @param dir {String} Directoy which files should be loaded
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */
        removeDir : function(dir) {
            var instance = this,
                  syncaction = 'loadtree',
                  facade, options;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            options = {
                showTreefiles: instance.get('showTreefiles')
            };
            facade = {
                options : options,
                src: syncaction
            };
            return instance.sync(syncaction, options).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_LOADTREE, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADTREE, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.
         *
         * @method removeFiles
         * @param dir {String} Directoy which files should be loaded
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */
        removeFiles : function(dir) {
            var instance = this,
                  syncaction = 'loadtree',
                  facade, options;

            Y.log('loadTree', 'info', 'Itsa-FileManager');
            options = {
                showTreefiles: instance.get('showTreefiles')
            };
            facade = {
                options : options,
                src: syncaction
            };
            return instance.sync(syncaction, options).then(
                function(response) {
                    // Lazy publish.
                    if (!instance._loadtreeEvent) {
                        instance._loadtreeEvent = instance.publish(EVT_LOADTREE, {
                            preventable: false
                        });
                    }
                    // now we need to add the treeresponse into Y.Tree
                    // ....
                    //
                    facade.response = response;
                    instance.fire(EVT_LOADTREE, facade);
                    return response;
                },
                function(err) {
                    facade.error = err;
                    instance.fire(EVT_ERROR, facade);
                    return err;
                }
            );
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            Y.log('showFlow', 'info', 'Itsa-FileManager');
            this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            Y.log('showTree', 'info', 'Itsa-FileManager');
            this.set('tree', true);
        },

      /**
         * Override this method to provide a custom persistence implementation for this
         * FileManager. The default just returns a solved Promise without actually doing anything.
         *
         * This method is called internally by `load()`, `save()`, and `destroy()`
         *
         * @method sync
         * @param action {String} The sync-action to perform. May be one of the following:
         *
         * `loadTree`: Store a newly-created model for the first time.
         * `loadFiles`: Delete an existing model.
         * `renameFile`  : Load an existing model.
         * `renameDir`: Update an existing model.
         * `removeFiles`: Update an existing model.
         * `removeDir`: Update an existing model.
         * `createDir`: Update an existing model.
         * `moveDir`: Update an existing model.
         * `moveFiles`: Update an existing model.
         * `copyDir`: Update an existing model.
         * `copyFiles`: Update an existing model.
         *
         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.
         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync
         * implementation to determine how to handle 'options'.
        */
        sync: function (/* action, options */) {
            return new Y.Promise(function (resolve, reject) {
                reject(new Error('The sync()-method was not overridden'));
            });
        },

        /**
         * Cleans up bindings
         *
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            Y.log('destructor', 'info', 'Itsa-FileManager');
            var instance = this;

            if (instance._resizeEvent) {
                instance._resizeEvent.detach();
            }
            instance._clearEventhandlers();
        },

        //=====================================================================
        // private functions
        //=====================================================================

        /**
         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's
         * and the dd- and resize-pluging are activated (if appropriate)
         *
         * @method _afterRender
         * @private
         * @since 0.1
        */
        _afterRender : function() {
            Y.log('_afterRender', 'info', 'Itsa-FileManager');
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            // extend the time that the widget is invisible
            boundingBox.toggleClass('yui3-itsafilemanager-loading', true);
            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
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

        /**
         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.
         * This needs to happen when the mouse leaves the bd-section.
         *
         * @method _checkEndResizeApprovement
         * @private
         * @protected
         * @since 0.1
        */
        _checkEndResizeApprovement : function() {
            Y.log('_checkEndResizeApprovement', 'info', 'Itsa-FileManager');
            var instance = this;

            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                instance._endResizeApprovement();
            }
        },

        /**
         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)
         *
         * @method _checkResizeAprovement
         * @param e {EventTarget}
         * @private
         * @protected
         * @since 0.1
        */
        _checkResizeAprovement : function(e) {
            if (!this._busyResize) {
                Y.log('_checkResizeAprovement', 'info', 'Itsa-FileManager');
                var instance = this,
                    panelBD = instance._panelBD,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    mouseX = e.pageX,
                    mouseY = e.pageY,
                    panelBDX = panelBD.getX(),
                    panelBDY = panelBD.getY(),
                    contentBox = instance.get('contentBox'),
                    tree = instance.get('tree'),
                    flow = instance.get('flow'),
                    flowHeight = nodeFilemanFlow.get('offsetHeight'),
                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),
                    halfResizeMargin = Math.round(resizeMargin/2),
                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),
                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));

                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-FileManager');

            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        /**
         * Resets the height of panel-bd after  resizing the panel.
         *
         * @method _correctHeightAfterResize
         * @private
         * @since 0.1
        */
        _correctHeightAfterResize : function() {
            Y.log('_correctHeightAfterResize', 'info', 'Itsa-FileManager');
            var instance = this,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;
            instance._panelBD.setStyle('height', (parseInt(instance.get('boundingBox').getStyle('height'), 10)-heightPanelHD-heightPanelFT)+'px');
        },


`loadTree`: Store a newly-created model for the first time.
         * `loadFiles`: Delete an existing model.
         * `renameFile`  : Load an existing model.
         * `renameDir`: Update an existing model.
         * `removeFiles`: Update an existing model.
         * `removeDir`: Update an existing model.
         * `createDir`: Update an existing model.
         * `moveDir`: Update an existing model.
         * `moveFiles`: Update an existing model.
         * `copyDir`: Update an existing model.
         * `copyFiles`: Upd


        _createMethods : function() {
            YArray.each(
                ['loadFiles', 'renameFile', 'renameDir', 'removeFiles', 'removeDir', 'createDir', 'moveDir', 'moveFiles', 'copyDir', 'copyFiles'],
                function (syncaction) {


                instance[syncaction] = function(dir) {
                    var instance = this,
                          facade, options;

                    Y.log(syncaction, 'info', 'Itsa-FileManager');
                    if (syncaction === 'loadTree') {
                        options = {
                            showTreefiles: instance.get('showTreefiles')
                        };
                    }
                    facade = {
                        options: options,
                        src: syncaction
                    };
                    return instance.sync(syncaction, options).then(
                        function(response) {
                            // Lazy publish.
                            if (!instance['_'+syncaction]) {
                                instance['_'+syncaction] = instance.publish(syncaction, {
                                    preventable: false
                                });
                            }
                            // now we need to add the treeresponse into Y.Tree
                            // ....
                            //
                            facade.response = response;
                            instance.fire(syncaction, facade);
                            return response;
                        },
                        function(err) {
                            facade.error = err;
                            instance.fire(EVT_ERROR, facade);
                            return err;
                        }
                    );
                };


            });
        },

        /**
         * Will toggle-off the cursor col-resize
         *
         * @method _endResizeApprovement
         * @private
         * @protected
         * @since 0.1
        */
        _endResizeApprovement: function() {
            Y.log('_endResizeApprovement', 'info', 'Itsa-FileManager');
            var instance = this,
                contentBox = instance.get('contentBox');

            instance._resizeApprovedX = false;
            instance._resizeApprovedY = false;
            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);
        },

        /**
         * Resizes the tree-section.
         *
         * @method _resizeTree
         * @param e {EventTarget}
         * @private
         * @protected
         * @since 0.1
        */
        _resizeTree : function(e) {
            if (this._busyResize) {
                Y.log('_resizeTree', 'info', 'Itsa-FileManager');
                var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                instance.set('sizeTreeArea', newWidth);
            }
        },

        /**
         * Resizes the flow-section.
         *
         * @method _resizeFlow
         * @param e {EventTarget}
         * @private
         * @protected
         * @since 0.1
        */
        _resizeFlow : function(e) {
            if (this._busyResize) {
                Y.log('_resizeFlow', 'info', 'Itsa-FileManager');
                var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                instance.set('sizeFlowArea', newHeight);
            }
        },

        /**
         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.
         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.
         *
         * @method _setConstraints
         * @private
         * @since 0.1
        */
        _setConstraints : function() {
            Y.log('_setConstraints', 'info', 'Itsa-FileManager');
            var instance = this,
                pluginConstraints = instance.resize && instance.resize.con,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +
                                    instance.get('minWidthFileArea'),
                minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +
                                      instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,
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
                instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                // initiate areawidths
                instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            }
        },

        /**
         * Setter for attribute showTreeFiles.
         *
         * @method _setShowTreefiles
         * @param val {Boolean} new value
         * @private
         * @protected
         * @since 0.1
        */
        _setShowTreefiles : function(val) {

        },

        /**
         * Setter for attribute sizeFlowArea.
         *
         * @method _startResize
         * @param val {Int} new value
         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeFlowArea : function(val, forceZero) {
            var instance = this,
                borderFlowArea = instance._borderFlowArea,
                minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                newHeight = Math.max(val-borderFlowArea, minHeight);
            newHeight = Math.min(newHeight, maxHeight);
            instance._nodeFilemanFlow.setStyle('height', newHeight+'px');
            if (instance.resize && instance.resize.hasPlugin('con')) {
                instance._setConstraints();
            }
            return newHeight;
        },

        /**
         * Setter for attribute sizeTreeArea.
         *
         * @method _startResize
         * @param val {Int} new value
         * @param forceZero {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeTreeArea : function(val, forceZero) {
            var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
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
            return newWidth;
        },

        /**
         * Attaches the resize-event to an innersection (tree or flow)
         *
         * @method _startResize
         * @param e {EventTarget}
         * @private
         * @protected
         * @since 0.1
        */
        _startResize : function(e) {
            var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            if (instance._resizeApprovedX) {
                Y.log('_startResize split-resize-x will be started', 'info', 'Itsa-FileManager');
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
                    instance._resizeTree,
                    instance
                );
            }
            else if (instance._resizeApprovedY) {
                Y.log('_startResize split-resize-y will be started', 'info', 'Itsa-FileManager');
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
                    instance._resizeFlow,
                    instance
                );
            }
        },

        /**
         * Detaches a resize-event of an innersection (tree or flow)
         *
         * @method _stopResize
         * @private
         * @protected
         * @since 0.1
        */
        _stopResize : function() {
            Y.log('_stopResize', 'info', 'Itsa-FileManager');
            var instance = this;

            if (instance._busyResize) {
                Y.log('_stopResize split-resize is ended', 'info', 'Itsa-FileManager');
                instance._busyResize = false;
                if (instance._resizeEvent) {
                    instance._resizeEvent.detach();
                }
            }
        }

    }, {
        ATTRS : {

            /**
             * Defines whether the panel has a border
             * @attribute border
             * @type Boolean
             * @default true
             * @since 0.1
            */
            border: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    return (typeof val === 'boolean');
                },
                setter: function(val) {
                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);
                }
            },

            /**
             * Defines whether the tree-pane is visible
             * @attribute tree
             * @default true
             * @type Boolean
             * @since 0.1
            */
            tree: {
                value: true,
                validator: function(val) {
                    return (typeof val === 'boolean');
                },
                setter: function(val) {
                    var instance = this;
                    instance._nodeFilemanTree.setStyle('display', (val ? 'inline-block' : 'none'));
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), true);
                },
                getter: function() {
                    return this._nodeFilemanTree.getStyle('display')!=='none';
                }
            },

            /**
             * Defines whether the flow-pane is visible
             * @attribute flow
             * @default false
             * @type Boolean
             * @since 0.1
            */
            flow: {
                value: false,
                validator: function(val) {
                    return (typeof val === 'boolean');
                },
                setter: function(val) {
                    var instance = this;
                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), true);
                },
                getter: function() {
                    return this._nodeFilemanFlow.getStyle('display')!=='none';
                }
            },

            /**
             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.
             * @attribute showTreefiles
             * @default false
             * @type Boolean
             * @since 0.1
            */
            showTreefiles: {
                value: false,
                validator: function(val) {
                    return (typeof val === 'boolean');
                }
                setter: '_setShowTreefiles'
            },

            /**
             * Defines width of the tree-pane. Only visible when 'tree' is set to true.
             * @attribute sizeTreeArea
             * @default 200
             * @type Int
             * @since 0.1
            */
            sizeTreeArea: {
                value: 200,
                validator: function(val) {
                    return (typeof val === 'number');
                },
                setter: '_setSizeTreeArea'
            },

            /**
             * Height of the flow-pane. Only visible when 'flow' is set to true.
             * @attribute sizeTreeArea
             * @default 200
             * @type Int
             * @since 0.1
            */
            sizeFlowArea: {
                value: 150,
                validator: function(val) {
                    return (typeof val === 'number');
                },
                setter: '_setSizeFlowArea'
            },

            /**
             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.
             * @default 100
             * @attribute minSizeTreeArea
             * @type int
             * @since 0.1
            */
            minSizeTreeArea: {
                value: 100,
                validator: function(val) {
                    return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                }
            },

            /**
             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.
             * @default 100
             * @attribute minSizeFlowArea
             * @type int
             * @since 0.1
            */
            minSizeFlowArea: {
                value: 100,
                validator: function(val) {
                    return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                }
            },

            /**
             * Defines minimum-posible width of the file-pane. Must be a number>=50.
             * @default 200
             * @attribute minWidthFileArea
             * @type int
             * @since 0.1
            */
            minWidthFileArea: {
                value: 200,
                validator: function(val) {
                    return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                }
            },

            /**
             * Defines minimum-posible height of the file-pane. Must be a number>=50.
             * @default 100
             * @attribute minHeightFileArea
             * @type int
             * @since 0.1
            */
            minHeightFileArea: {
                value: 100,
                validator: function(val) {
                    return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    var instance = this;
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                }
            },

            /**
             * Filemanager's title.
             * @default 'filemanager'
             * @attribute title
             * @type String
             * @since 0.1
            */
            title: {
                value: FILEMAN_HEADERTEMPLATE,
                lazyAdd: false,
                validator: function(val) {
                    return (typeof val === 'string');
                },
                setter: function(val) {
                    this.set('headerContent', val);
                }
            },

            /**
             * @description Width of the area where the mouse turns into col-resize<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default 6
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
                    return ((typeof val === 'number') && (val>=2) && (val<=60));
                }
            },

            /**
             * Whether the statusBar is visible.
             * @default true
             * @attribute statusBar
             * @type Boolean
             * @since 0.1
            */
            statusBar: {
                value: true,
                validator: function(val) {
                    return (typeof val === 'boolean');
                },
                setter: function(val) {
                    var instance = this;
                    instance._panelFT.setStyle('display', (val ? '' : 'none'));
                    instance._correctHeightAfterResize();
                }
            },

            /**
             * Whether the filemanager has a shadowbox.
             * @default true
             * @attribute shadow
             * @type Boolean
             * @since 0.1
            */
            shadow: {
                value: true,
                lazyAdd: false,
                validator: function(val) {
                    return Lang.isBoolean(val);
                },
                setter: function(val) {
                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);
                }
            }

        }
    }
);