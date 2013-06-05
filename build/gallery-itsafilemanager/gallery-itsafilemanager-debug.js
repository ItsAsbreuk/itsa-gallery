YUI.add('gallery-itsafilemanager', function (Y, NAME) {

'use strict';

/**
 * ITSAFileManager
 *
 *
 * Panel-widget for uolaoding and controlling files and folders
 *
 *
 * @module gallery-itsafilemanager
 * @class ITSAFileManager
 * @extends Panel
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------
var Lang = Y.Lang,
    YArray = Y.Array,
    IE = Y.UA.ie,
    CHARZERO = '\u0000',
    THUMBNAIL_TEMPLATE = '<img src="{thumbnail}" />',

    FILEMAN_TITLE = 'Filemanager',

    FILEMAN_FOOTERTEMPLATE = "ready",
    FILEMANCLASSNAME = 'yui3-itsafilemanager',
    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',
    FILEMAN_BUTTONS_CLASS = FILEMANCLASSNAME + '-buttons',
    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',
    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',
    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',
    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',
    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',
    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',
    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',
    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',
    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',
    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',
    FILEMAN_HEADERTEMPLATE = '<div class="'+FILEMAN_TITLE_CLASS+'">{title}</div><div class="'+FILEMAN_BUTTONS_CLASS+'">edit</div>',
    FILEMAN_TEMPLATE = "<div class='"+FILEMAN_TREE_CLASS+"'>"+
                                            "<div class='"+FILEMAN_TREEVIEW_CLASS+"'></div>"+
                                        "</div>"+
                                        "<div class='"+FILEMAN_MAIN_CLASS+"'>"+
                                            "<div class='"+FILEMAN_FLOW_CLASS+"'></div>"+
                                            "<div class='"+FILEMAN_ITEMS_CLASS+"'></div>"+
                                        "</div>",

   /**
     * Fired when an error occurs, such as when the sync layer returns an error.
     * @event error
     * @param e {EventFacade} Event Facade including:
     * @param e.error {any} Error message.
     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.
     * @since 0.1
    **/
    EVT_ERROR = 'error',

    PARSE = function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                return null;
            }
        }
        return response;
    };

   /**
     * Fired when the synclayer finishes the action 'loadFiles' succesfully.
     * @event loadFiles
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'loadTree' succesfully.
     * @event loadTree
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'renameFile' succesfully.
     * @event renameFile
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'renameDir' succesfully.
     * @event renameDir
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.
     * @event deleteFiles
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'deleteDir' succesfully.
     * @event deleteDir
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'createDir' succesfully.
     * @event createDir
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'moveDir' succesfully.
     * @event moveDir
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'moveFiles' succesfully.
     * @event moveFiles
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'cloneDir' succesfully.
     * @event cloneDir
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

   /**
     * Fired when the synclayer finishes the action 'copyFiles' succesfully.
     * @event copyFiles
     * @param e {EventFacade} Event Facade including:
     * @param e.response {Any} response from the server.
     * @param e.options {Object} Options that were passed when the action was called.
     * @since 0.1
    **/

Y.Tree.Node.prototype.getTreeInfo = function(field) {
    var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    while (parentNode && !parentNode.isRoot()) {
        treeField = '/' + parentNode[field] + treeField;
        parentNode = parentNode.parent;
    }
    return treeField;
};

Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            return (node.canHaveChildren ? CHARZERO : '') + node.label;
        },
        renderPromise : function() {
            Y.log('renderPromise', 'info', 'treeview');
            var instance = this;
            if (!instance._renderPromise) {
                instance._renderPromise = new Y.Promise(function (resolve) {
                    // first create a private property to the resolver, so we can resolve it manually from outside the promise
                    instance._renderResolver = resolve;
                    if (instance.get('rendered')) {
                        Y.log('renderPromise is resolved by the rendered-attribute', 'info', 'treeview');
                        resolve();
                    }
                });
            }
            return instance._renderPromise;
        }
    }
);

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
            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            instance._eventhandlers = [];
            instance._resizeApprovedX = false;
            instance._resizeApprovedY = false;
            instance._bodyNode = null;
            instance._resizeEvent = null;
            instance._busyResize = false;
            instance._panelHD = null;
            instance._panelBD = null;
            instance._panelFT = null;
            instance._nodeFilemanTree = null;
            instance._nodeFilemanTreeView = null;
            instance._nodeFilemanFlow = null;
            instance._nodeFilemanItems = null;
            instance._borderTreeArea = 0;
            instance._halfBorderTreeArea = 0;
            instance._borderFlowArea = 0;
            instance._halfBorderFlowArea = 0;
            instance._mouseOffset = 0;
            instance._bodyNode = Y.one('body');
            instance._createPromises();
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
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            instance.set('bodyContent', FILEMAN_TEMPLATE);
            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            instance._panelHD = contentBox.one('.yui3-widget-hd');
            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            instance._panelFT = contentBox.one('.yui3-widget-ft');
            if (!instance.get('statusBar')) {
                instance._panelFT.setStyle('display', 'none');
            }

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            if (!instance.get('visible')) {
                    boundingBox.addClass(FILEMAN_HIDDEN);
            }
            eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );

            if (instance.hasPlugin('resize')) {
                eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
            }

        },

        getCurrentDir : function() {
            return this._currentDir;
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
         * Copies the selected directory on the server and updates the treepane.
         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method cloneDir
         * @param cloneDirname {String} Directory-name of the new to be created clone-directory
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.
         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method copyFiles
         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,
         *               then the current directory will be used.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Creates a new directory inside the selcted directory. Updates the treepane.
         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method createDir
         * @param dirName {String} Directory-name to be created
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method deleteDir
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method deleteFiles
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method loadFiles
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />
         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.
         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.
         *
         * @method loadTree
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */

        /**
         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />
         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />
         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.
         *
         * @method loadTreeLazy
         * @param node {Y.Tree.Node} the treenode which should be loaded.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
         * @since 0.1
        */

        /**
         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method moveDir
         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method moveFiles
         * @param dirName {String} New directory where the files should be placed.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method renameDir
         * @param newDirname {String} New directoy-name.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

        /**
         * renames the selected file. When multiple files are selected, they will all get the smae name, followed by '_index'.
         * Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method renameFile
         * @param newFilename {String} new filename for the selected file
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
         * @since 0.1
        */

      /**
         * Override this method to provide a custom persistence implementation for this
         * FileManager. The default just returns a solved Promise without actually doing anything.<br />
         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.
         * <br /><br />
         * The next  actions should be declared:<br />
         * <br />
         * `cloneDir`: Clones a directory.
         * <br />'options.currentDir' --> selected directory to be cloned.<br />
         *                                                    'options.cloneDirname'  --> new directory name.<br />
         * <br />
         * `copyFiles`: Copies selected files.
         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />
         *            'options.destinationDir'  --> directory name where the files should be copied to.<br />
         * <br />
         * `createDir`: Creates a directory.
         * <br />'options.currentDir' --> current directory wherein the new directory will be created<br />
         *                                                      'options.dirName'  --> the new directory name.<br />
         * <br />
         * `deleteDir`: Erases a directory.
         * <br />'options.currentDir' --> current directory which will be erased<br />
         * <br />
         * `deleteFiles`: Erases the selected files.
         * <br />'options.selectedFiles' --> the selected files that will be erased<br />
         * <br />
         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass
         *                     throught to Y.LazyModelList (items-attribute)<br />
         *                     'options.currentDir'  --> current directory which files should be loaded<br />
         * <br />
         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form
         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />
         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared
         *                                 with this value in order to know when no more requests are needed.<br />
         *                     'options.currentDir'  --> current directory which files should be loaded<br />
         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />
         *                     'options.size'  --> current number of files to be downloaded from the server<br />
         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />
         * <br />
         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />
         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure
         *                                                                  (passed through from the attribute 'showTreefiles')<br />
         * <br />
         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />
         *                           'options.directory' --> the directory which content should be loaded.<br />
         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure
         *                                                                  (passed through from the attribute 'showTreefiles')<br />
         * <br />
         * `moveDir`: Moves a directory.
         * <br />'options.currentDir' --> selected directory to be moved.<br />
         *                                                   'options.newParentDir'  --> the name of the new parent-directory.<br />
         * <br />
         * `moveFiles`: Moves the selected files.
         * <br />'options.selectedFiles' --> the selected files that needs to be moved<br />
         *            'options.dirName'  holds the name of the directory where the files should be placed.<br />
         * <br />
         * `renameDir`: Renames a directory.
         * <br />'options.currentDir' --> current directory which will be renamed<br />
         *                                                           'options.newDirname'  holds the new directory-name.<br />
         * <br />
         * `renameFile` : Renames the selected file.
         * <br />'options.selectedFiles' --> the selected files that needs to be renamed<br />
         *                                                                     'options.newFilename'  holds the new file-name.
         *
         * @method sync
         * @param action {String} The sync-action to perform. May be one of the following:
         *         *
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
            instance.files.destroy();
            instance.filescrollview.destroy();
            instance.tree.destroy();
        },

        //=====================================================================
        // private functions
        //=====================================================================

        _createPromises : function() {
            var instance = this;
            instance.readyPromise = new Y.Promise(
                function(resolve) {
                    instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    instance._createMethods();
                    instance.readyPromise.then(
                        Y.batch(
                            instance.loadFiles(),
                            (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())
                        )
                    ).then(
                        resolve
                    );
                }
            );
        },

        _allWidgetsRenderedPromise : function() {
            var instance = this;
            return Y.batch(
                 instance.tree.renderPromise(),
                 instance.filescrollview.renderPromise()
            );
        },

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
            instance._nodeFilemanTreeView = boundingBox.one('.'+FILEMAN_TREEVIEW_CLASS);
            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);
            instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);
            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            if (instance.hasPlugin('dd')) {
                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
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
            // init the value of the current selected tree
            instance._currentDir  = '/';
            // now we create the directory tree
            instance._renderTree();
            // now we create the files tree:
            instance._renderFiles();
        },

        /**
         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.
         *
         * @method _renderFiles
         * @private
         * @since 0.1
        */
        _renderFiles : function() {
            Y.log('_renderFiles', 'info', 'Itsa-FileManager');
            var instance = this,
                  files, rendermodel, filescrollview;

            instance.files = files = new Y.LazyModelList();
            files.comparator = function (model) {
                return model.filename || '';
            };
            rendermodel = THUMBNAIL_TEMPLATE;

            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                height:'394px',
 //               width:'240px',
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                modelList: files
            });
            filescrollview.addTarget(instance);
            filescrollview.render();
        },

        /**
         * Renders the tree-view by creating an Y.Tree inside the tree-pane.
         *
         * @method _renderTree
         * @private
         * @since 0.1
        */
        _renderTree : function() {
            Y.log('_renderTree', 'info', 'Itsa-FileManager');
            var instance = this,
                  tree, lazyRender;

            lazyRender = instance.get('lazyRender');
            instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            tree.addTarget(instance);
            tree.render();
            // If lazyRender the setup its callbackfunc:
            if (lazyRender) {
                Y.use('tree-lazy', function() {
                    tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    callback();
                                },
                                function(err) {
                                    callback(new Error(err));
                                }
                            );
                        }
                    });
                });
            }
            // now resolve the tree-promise from outside the promise:
            tree._renderResolver();
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

            var instance = this;
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

        _createMethods : function() {
            Y.log('_createMethods', 'info', 'Itsa-FileManager');

            var instance = this,
                  tree;
            YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFile', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    instance[syncaction] = function(param1) {
                        var options = {},
                              facade;
                        Y.log(syncaction, 'info', 'Itsa-FileManager');
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        if (!instance.get('rendered')) {
                            instance.render();
                        }
                        // now we must extend options for each action
                        if (syncaction === 'loadFiles') {
                            options.currentDir = instance.getCurrentDir();
                        }
                        else if (syncaction === 'loadAppendFiles') {
                            options.currentDir = instance.getCurrentDir();
                            options.batchSize = instance.get('batchSize');
                            options.size = instance.files.size();
                            options.lastFileId = instance._lastFileId;
                        }
                        else if (syncaction === 'loadTree') {
                            options.showTreefiles = instance.get('showTreefiles');
                        }
                        else if (syncaction === 'loadTreeLazy') {
                            options.showTreefiles = instance.get('showTreefiles');
                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else if (syncaction === 'renameFile') {
                            options.selectedFiles = instance.getSelectedFiles();
                            options.newFilename = param1;
                        }
                        else if (syncaction === 'renameDir') {
                            options.currentDir = instance.getCurrentDir();
                            options.newDirname = param1;
                        }
                        else if (syncaction === 'deleteFiles') {
                            options.selectedFiles =  instance.getSelectedFiles();
                        }
                        else if (syncaction === 'deleteDir') {
                            options.currentDir = instance.getCurrentDir();
                        }
                        else if (syncaction === 'createDir') {
                            options.currentDir = instance.getCurrentDir();
                            options.dirName = param1;
                        }
                        else if (syncaction === 'moveDir') {
                            options.currentDir = instance.getCurrentDir();
                            options.newParentDir = param1;
                        }
                        else if (syncaction === 'moveFiles') {
                            options.selectedFiles = instance.getSelectedFiles();
                            options.dirName = param1;
                        }
                        else if (syncaction === 'cloneDir') {
                            options.currentDir = instance.getCurrentDir();
                            options.cloneDirname = param1;
                        }
                        else if (syncaction === 'copyFiles') {
                            options.selectedFiles = instance.getSelectedFiles();
                            options.destinationDir = param1;
                        }
                        facade = {
                            options: options
                        };
                        return instance.readyPromise.then(
                            Y.bind(instance.sync, instance, syncaction, options)
                        ).then(
                            function(response) {
                                // Lazy publish.
                                if (!instance['_'+syncaction]) {
                                    instance['_'+syncaction] = instance.publish(syncaction, {
                                        preventable: false
                                    });
                                }
                                // now we need process the response
                                if (syncaction === 'loadFiles') {
                                    instance.files.reset(PARSE(response));
                                }
                                else if (syncaction === 'loadAppendFiles') {
                                    // ....
                                }
                                else if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {
                                    instance.tree.insertNode(param1, PARSE(response));
                                }
                                else if (syncaction === 'renameFile') {
                                    // ....
                                }
                                else if (syncaction === 'renameDir') {
                                    // ....
                                }
                                else if (syncaction === 'deleteFiles') {
                                    // ....
                                }
                                else if (syncaction === 'deleteDir') {
                                    // ....
                                }
                                else if (syncaction === 'createDir') {
                                    // ....
                                }
                                else if (syncaction === 'moveDir') {
                                    // ....
                                }
                                else if (syncaction === 'moveFiles') {
                                    // ....
                                }
                                else if (syncaction === 'cloneDir') {
                                    // ....
                                }
                                else if (syncaction === 'copyFiles') {
                                    // ....
                                }
                                else if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {
                                    tree = instance.tree;
                                    tree.insertNode(tree.rootNode, PARSE(response));
                                }
                                // end of processing, now fire event
                                facade.response = response;
                                instance.fire(syncaction, facade);
                                return response;
                            },
                            function(err) {
                                facade.error = err;
                                facade.src = syncaction;
                                instance.fire(EVT_ERROR, facade);
                                return err;
                            }
                        );
                    };
                }
            );
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
         * Loads the filepane after a directory from the Tree is selected.
         *
         * @method _loadFilePane
         * @param e {EventTarget}
         * @private
         * @since 0.1
        */
        _loadFilePane : function(e) {
        Y.log('_loadFilePane', 'info', 'Itsa-FileManager');

            var instance = this,
                  treenode = e.node;

            if (treenode.canHaveChildren) {
                instance._currentDir = treenode.getTreeInfo('label') + '/';
                instance.loadFiles();
            }
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
         * @param [attribute] {String} name of the attribute
         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeFlowArea : function(val, attribute, forceZero) {
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
         * @param [attribute] {String} name of the attribute
         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeTreeArea : function(val, attribute, forceZero) {
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
             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.
             * @attribute batchSize
             * @type Int
             * @default 500
             * @since 0.1
            */
            batchSize: {
                value: 500,
                validator: function(val) {
                    return (typeof val === 'number') && (val>0);
                }
            },

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
                    instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                    if (instance.resize && instance.resize.hasPlugin('con')) {
                        instance._setConstraints();
                    }
                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
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
                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                },
                getter: function() {
                    return this._nodeFilemanFlow.getStyle('display')!=='none';
                }
            },

            /**
             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />
             * Can only be set during initialization.<br /><br />
             * <b>Caution:</b><br />
             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />
             * When false, you need to setup the sync-action 'loadTree'.<br /><br />
             * lazyRender can significantly speed up the time it takes to render a large
             * tree, but might not make sense if you're using CSS that doesn't hide the
             * contents of closed nodes, or when your directory-structure has no children.
             * @attribute lazyRender
             * @default false
             * @type Boolean
             * @since 0.1
            */
            lazyRender: {
                value: false,
                writeOnce: 'initOnly',
                validator: function(val) {
                    return (typeof val === 'boolean');
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
                },
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
                value: FILEMAN_TITLE,
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
        "pluginhost-base",
        "lazy-model-list",
        "gallery-sm-treeview",
        "gallery-itsascrollviewmodellist",
        "gallery-itsawidgetrenderpromise",
        "promise",
        "json-parse",
        "tree-sortable"
    ],
    "skinnable": false
});
