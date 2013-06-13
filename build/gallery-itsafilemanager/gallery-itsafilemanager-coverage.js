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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uolaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    PROCESS_ERROR = 'An error occured during processing',","    FILTERITEMS = ['all files','images', 'non-images', 'word', 'excel', 'pdf'],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['copy file', 'rename file', 'delete file', 'copy dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<img src=\"{thumbnail}\" />',","    HIDDEN_CLASS = 'yui3-itsafilemanager-hidden',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\">{text}</button>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return Y.JSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._bodyNode = null;","            instance._resizeEvent = null;","            instance._busyResize = false;","            instance._panelHD = null;","            instance._panelBD = null;","            instance._panelFT = null;","            instance._nodeFilemanTree = null;","            instance._nodeFilemanTreeView = null;","            instance._nodeFilemanFlow = null;","            instance._nodeFilemanItems = null;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._bodyNode = Y.one('body');","            instance.publish(EVT_ERROR, {","                preventable: false,","                broadcast: 1  // --> to make it catchable by itsaerrorreporter","            });","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(HIDDEN_CLASS);","            (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                function() {","                    instance._setConstraints(true);","                    instance._correctHeightAfterResize();","                    boundingBox.removeClass(HIDDEN_CLASS);","                }","            );","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","/*","            instance.publish(EVT_ERROR, {","                preventable: false","            });","*/","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        getCurrentDirTreeNode : function() {","            return this._currentDirTreeNode;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file. When multiple files are selected, they will all get the smae name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFile","         * @param newFilename {String} new filename for the selected file","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFilename'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise","         *","         * @method _createPromises","         * @private","         * @since 0.1","        */","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        Y.batch(","                            instance.loadFiles(),","                            (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())","                        )","                    ).then(","                        resolve","                    );","                }","            );","        },","","        /**","         * Promise that resolves when all widgets are finished rendering","         *","         * @method _allWidgetsRenderedPromise","         * @private","         * @return {Y.Promise}","         * @since 0.1","        */","        _allWidgetsRenderedPromise : function() {","            var instance = this;","            return Y.batch(","                 // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.","                 instance._resizeConstrainPromise,","                 instance.filterSelect.renderPromise(),","                 instance.viewSelect.renderPromise(),","                 instance.editSelect.renderPromise(),","                 instance.filescrollview.renderPromise()","            );","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // init the value of the current selected tree","            instance._currentDir  = '/';","            // now we create the toolbar","            instance._renderToolbar();","            // now we create the directory tree","            instance._renderTree();","            instance._currentDirTreeNode = instance.tree.rootNode;","            // now we create the files tree:","            instance._renderFiles();","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            instance.files = files = new Y.LazyModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode, createDirNode, createUploadNode;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","                selectionOnButton: false,","                defaultButtonText: 'filter',","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                    instance.filescrollview.set(","                        'viewFilter',","                        (selecteditem==='all files') ? null : function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));","                            return true;","                        }","                    );","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","            //=====================","            // render the view-select:","            //=====================","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index,","                          currentName;","                    Y.alert(selecteditem);","                    switch (selecteditem) {","                        case 0:","                            // copy file","                        break;","                        case 1:","                            // rename file","                        break;","                        case 2:","                            // delete file","                        break;","                        case 3:","                            // clone dir","                            currentName = instance.getCurrentDirTreeNode.label;","                            Y.prompt('Duplicate directory '+currentName, 'Enter the directory-name of the duplicated directory:',currentName+'-copy')","                            .then(","                                function(response) {","                                    instance.cloneDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 4:","                            // rename dir","                            currentName = instance.getCurrentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', currentName)","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                            currentName = instance.getCurrentDirTreeNode.label;","                            Y.alert('Delete directory', 'Are you sure you want to delete '+currentName+' and all of its content?', {type: 'warn'})","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            eventhandlers.push(","                createDirNode.on('click', function() {","                    var currentName = instance.getCurrentDirTreeNode.label;","                    Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', 'New Directory')","                    .then(","                        function(response) {","                            instance.createDir(Y.Escape.html(response.value));","                        }","                    );","                })","            );","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the create dir button:","            //=====================","            createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));","            instance._nodeFilemanToolbar.append(createUploadNode);","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree, lazyRender;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function() {","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            rootnode = instance._nodeFilemanTreeRoot;","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    function() {","                        rootnode.set('tabIndex', 0);","                        rootnode.addClass(TREEVIEW_SELECTED_CLASS);","                        rootnode.focus();","                        instance._currentDir = '/';","                        instance._currentDirTreeNode = tree.rootNode;","                        instance.loadFiles();","                        YArray.each(","                            tree.getSelectedNodes(),","                            function(treenode) {","                                treenode.unselect();","                            }","                        );","                    }","                )","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        /**","         * Dynamically creates the next Class-methods:<br />","         * 'loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'","         *","         * @method _createMethods","         * @private","         * @protected","         * @since 0.1","        */","        _createMethods : function() {","","            var instance = this;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {};","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.newFilename = param1;","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options.selectedFiles =  instance.getSelectedFiles();","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.selectedFiles = instance.getSelectedFiles();","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.currentDir = instance.getCurrentDir();","                            options.destinationDir = param1;","                        }","                        return instance.readyPromise","                                    .then(","                                        Y.bind(instance.sync, instance, syncaction, options)","                                    )","                                    .then(","                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),","                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)","                                    );","                    };","                }","            );","        },","","        /**","         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).","         *","         * @method _handleSyncError","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSyncError : function(reason, syncaction, options) {","            var instance = this,","                  facade;","","            instance.fire(EVT_ERROR);","            Y.fire(EVT_ERROR);","","","            facade = {","                options: options,","                error: reason,","                src: syncaction","            };","            instance.fire(EVT_ERROR, facade);","            Y.fire(EVT_ERROR, facade);","            return reason;","       },","","        /**","         * Method that handles the sync-response returned from the server.","         *","         * @method _handleSync","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @param param1 {Any} The first parameter that was passed into the sync-action","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSync : function(response, syncaction, options, param1) {","            var instance = this,","                  parsedResponse = PARSE(response),","                  err = parsedResponse.error,","                  tree, facade;","","            if (err) {","                return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);","            }","            else {","                facade = {","                    response: response,","                    options: options","                };","                // Lazy publish.","                if (!instance['_'+syncaction]) {","                    instance['_'+syncaction] = instance.publish(syncaction, {","                        preventable: false","                    });","                }","                // now we need process the response","                if (syncaction === 'loadFiles') {","                    instance.files.reset(parsedResponse);","                }","                else if (syncaction === 'loadAppendFiles') {","                    // ....","                }","                else if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    instance.tree.insertNode(param1, parsedResponse);","                }","                else if (syncaction === 'renameFiles') {","                    // ....","                }","                else if (syncaction === 'renameDir') {","                    instance.getCurrentDirTreeNode.label = options.newDirName;","                    instance.sort();","                    instance.tree.render();","                }","                else if (syncaction === 'deleteFiles') {","                    // ....","                }","                else if (syncaction === 'deleteDir') {","                    // ....","                }","                else if (syncaction === 'createDir') {","                    // ....","                }","                else if (syncaction === 'moveDir') {","                    // ....","                }","                else if (syncaction === 'moveFiles') {","                    // ....","                }","                else if (syncaction === 'cloneDir') {","                    // ....","                }","                else if (syncaction === 'copyFiles') {","                    // ....","                }","                else if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {","                    tree = instance.tree;","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(tree.rootNode, parsedResponse);","                }","                // end of processing, now fire event","                instance.fire(syncaction, facade);","                return response;","            }","        },","","","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance._currentDirTreeNode = treenode;","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function(val) {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanTree.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanFlow.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._panelFT.setStyle('display', (val ? '' : 'none'));","                    instance._correctHeightAfterResize();","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"event\",","        \"event-custom\",","        \"event-touch\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json-parse\",","        \"tree-sortable\",","        \"gallery-sm-treeview\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"79":0,"83":0,"84":0,"85":0,"87":0,"92":0,"95":0,"217":0,"218":0,"221":0,"222":0,"223":0,"225":0,"229":0,"232":0,"237":0,"247":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"269":0,"273":0,"275":0,"276":0,"278":0,"279":0,"280":0,"292":0,"299":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"314":0,"324":0,"333":0,"343":0,"352":0,"361":0,"362":0,"364":0,"368":0,"375":0,"379":0,"389":0,"399":0,"409":0,"419":0,"626":0,"627":0,"639":0,"641":0,"642":0,"644":0,"645":0,"646":0,"647":0,"662":0,"663":0,"665":0,"667":0,"668":0,"669":0,"670":0,"671":0,"675":0,"676":0,"680":0,"686":0,"688":0,"697":0,"700":0,"701":0,"722":0,"723":0,"742":0,"747":0,"748":0,"749":0,"750":0,"751":0,"752":0,"753":0,"754":0,"755":0,"756":0,"758":0,"759":0,"760":0,"761":0,"763":0,"764":0,"771":0,"775":0,"776":0,"782":0,"784":0,"786":0,"787":0,"789":0,"800":0,"803":0,"804":0,"805":0,"807":0,"809":0,"817":0,"818":0,"829":0,"836":0,"843":0,"846":0,"847":0,"848":0,"853":0,"858":0,"859":0,"860":0,"864":0,"871":0,"874":0,"875":0,"878":0,"879":0,"880":0,"884":0,"891":0,"894":0,"896":0,"897":0,"900":0,"903":0,"906":0,"909":0,"910":0,"913":0,"916":0,"919":0,"920":0,"923":0,"926":0,"929":0,"930":0,"933":0,"936":0,"940":0,"941":0,"942":0,"946":0,"947":0,"949":0,"950":0,"953":0,"958":0,"962":0,"963":0,"974":0,"982":0,"983":0,"988":0,"989":0,"990":0,"992":0,"995":0,"996":0,"997":0,"1001":0,"1005":0,"1008":0,"1018":0,"1021":0,"1022":0,"1028":0,"1030":0,"1034":0,"1035":0,"1036":0,"1037":0,"1038":0,"1039":0,"1040":0,"1043":0,"1061":0,"1063":0,"1064":0,"1078":0,"1079":0,"1095":0,"1096":0,"1098":0,"1099":0,"1113":0,"1114":0,"1117":0,"1130":0,"1138":0,"1139":0,"1140":0,"1156":0,"1157":0,"1161":0,"1162":0,"1166":0,"1167":0,"1170":0,"1171":0,"1173":0,"1174":0,"1175":0,"1176":0,"1177":0,"1179":0,"1180":0,"1182":0,"1183":0,"1184":0,"1186":0,"1187":0,"1188":0,"1190":0,"1191":0,"1192":0,"1194":0,"1195":0,"1196":0,"1198":0,"1199":0,"1201":0,"1202":0,"1203":0,"1205":0,"1206":0,"1207":0,"1209":0,"1210":0,"1211":0,"1212":0,"1214":0,"1215":0,"1216":0,"1218":0,"1219":0,"1220":0,"1221":0,"1223":0,"1248":0,"1251":0,"1252":0,"1255":0,"1260":0,"1261":0,"1262":0,"1278":0,"1283":0,"1284":0,"1287":0,"1292":0,"1293":0,"1298":0,"1299":0,"1301":0,"1304":0,"1305":0,"1306":0,"1308":0,"1310":0,"1313":0,"1314":0,"1315":0,"1316":0,"1318":0,"1321":0,"1324":0,"1327":0,"1330":0,"1333":0,"1336":0,"1339":0,"1340":0,"1341":0,"1342":0,"1344":0,"1347":0,"1348":0,"1363":0,"1366":0,"1367":0,"1368":0,"1369":0,"1382":0,"1385":0,"1386":0,"1387":0,"1388":0,"1402":0,"1403":0,"1408":0,"1422":0,"1423":0,"1428":0,"1441":0,"1442":0,"1444":0,"1445":0,"1456":0,"1457":0,"1458":0,"1460":0,"1461":0,"1463":0,"1465":0,"1466":0,"1467":0,"1469":0,"1499":0,"1505":0,"1507":0,"1508":0,"1509":0,"1510":0,"1513":0,"1528":0,"1535":0,"1536":0,"1537":0,"1538":0,"1539":0,"1540":0,"1541":0,"1543":0,"1556":0,"1561":0,"1562":0,"1563":0,"1565":0,"1568":0,"1569":0,"1571":0,"1577":0,"1578":0,"1579":0,"1581":0,"1584":0,"1585":0,"1587":0,"1604":0,"1606":0,"1607":0,"1608":0,"1609":0,"1627":0,"1642":0,"1645":0,"1661":0,"1675":0,"1678":0,"1679":0,"1680":0,"1681":0,"1683":0,"1686":0,"1700":0,"1703":0,"1704":0,"1705":0,"1706":0,"1708":0,"1711":0,"1733":0,"1747":0,"1762":0,"1777":0,"1792":0,"1795":0,"1796":0,"1797":0,"1812":0,"1815":0,"1816":0,"1817":0,"1832":0,"1835":0,"1836":0,"1837":0,"1852":0,"1855":0,"1856":0,"1857":0,"1872":0,"1875":0,"1894":0,"1913":0,"1927":0,"1930":0,"1931":0,"1932":0,"1947":0,"1950":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:78":0,"PARSE:82":0,"getTreeInfo:217":0,"sortComparator:230":0,"(anonymous 2):277":0,"initializer:246":0,"(anonymous 3):367":0,"bindUI:291":0,"getCurrentDir:374":0,"getCurrentDirTreeNode:378":0,"hideFlow:388":0,"hideTree:398":0,"showFlow:408":0,"showTree:418":0,"(anonymous 4):626":0,"sync:625":0,"destructor:638":0,"(anonymous 7):669":0,"(anonymous 6):666":0,"(anonymous 5):664":0,"(anonymous 8):687":0,"(anonymous 9):698":0,"_createPromises:661":0,"_allWidgetsRenderedPromise:721":0,"(anonymous 10):774":0,"_afterRender:741":0,"comparator:804":0,"_renderFiles:799":0,"null:850":0,"(anonymous 11):845":0,"(anonymous 12):873":0,"(anonymous 14):912":0,"(anonymous 15):922":0,"(anonymous 16):932":0,"(anonymous 13):893":0,"(anonymous 18):952":0,"(anonymous 17):948":0,"_renderToolbar:828":0,"(anonymous 20):1002":0,"(anonymous 21):1007":0,"load:1000":0,"(anonymous 19):996":0,"(anonymous 22):1020":0,"(anonymous 24):1042":0,"(anonymous 23):1033":0,"_renderTree:973":0,"_checkEndResizeApprovement:1060":0,"_checkResizeAprovement:1077":0,"(anonymous 25):1116":0,"_clearEventhandlers:1111":0,"_correctHeightAfterResize:1129":0,"]:1161":0,"(anonymous 26):1160":0,"_createMethods:1154":0,"_handleSyncError:1247":0,"_handleSync:1277":0,"_endResizeApprovement:1362":0,"_loadFilePane:1380":0,"_resizeTree:1401":0,"_resizeFlow:1421":0,"_setConstraints:1440":0,"_setSizeFlowArea:1498":0,"_setSizeTreeArea:1527":0,"_startResize:1555":0,"_stopResize:1603":0,"validator:1626":0,"validator:1641":0,"setter:1644":0,"validator:1660":0,"validator:1674":0,"setter:1677":0,"getter:1685":0,"validator:1699":0,"setter:1702":0,"getter:1710":0,"validator:1732":0,"validator:1746":0,"validator:1761":0,"validator:1776":0,"validator:1791":0,"setter:1794":0,"validator:1811":0,"setter:1814":0,"validator:1831":0,"setter:1834":0,"validator:1851":0,"setter:1854":0,"validator:1871":0,"setter:1874":0,"validator:1893":0,"validator:1912":0,"validator:1926":0,"setter:1929":0,"validator:1946":0,"setter:1949":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 421;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 96;
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1);
YUI.add('gallery-itsafilemanager', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 3);
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
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 24);
var Lang = Y.Lang,
    YArray = Y.Array,
    IE = Y.UA.ie,
    CHARZERO = '\u0000',
    PROCESS_ERROR = 'An error occured during processing',
    FILTERITEMS = ['all files','images', 'non-images', 'word', 'excel', 'pdf'],
    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],
    EDITITEMS = ['copy file', 'rename file', 'delete file', 'copy dir', 'rename dir', 'delete dir'],
    THUMBNAIL_TEMPLATE = '<img src="{thumbnail}" />',
    HIDDEN_CLASS = 'yui3-itsafilemanager-hidden',
    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',
    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',
    EMPTY_DIVNODE = '<div></div>',
    EMPTY_BUTTONNODE = '<button class="pure-button pure-button-toolbar">{text}</button>',
    FILEMAN_TITLE = 'Filemanager',
    FILEMAN_FOOTERTEMPLATE = "ready",
    FILEMANCLASSNAME = 'yui3-itsafilemanager',
    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',
    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',
    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',
    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',
    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',
    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',
    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',
    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',
    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',
    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',
    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',
    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',
    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',
    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',
    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',
    FILEMAN_HEADERTEMPLATE = '<div class="'+FILEMAN_TITLE_CLASS+'">{title}</div><div class="'+FILEMAN_TOOLBAR_CLASS+'"></div>',
    FILEMAN_TEMPLATE = "<div class='"+FILEMAN_TREE_CLASS+"'>"+
                                            "<div class='"+FILEMAN_ROOTTREEVIEW_CLASS+" "+TREEVIEW_NODE_CLASS+ " "+ HIDDEN_CLASS+"'>"+
                                                "<div class='"+TREEVIEW_ROW_CLASS+"'>{root}</div>"+
                                            "</div>"+
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

    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 78);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 79);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 82);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 83);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 84);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 85);
return Y.JSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 87);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 92);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 95);
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

    /**
     * Holds a promise when the filemanager and all its widgets are rendered.<br />
     * Is solved <i>before</> any initial tree- and file-data is loaded.
     * @property readyPromise
     * @type Y.Promise
     */

    /**
     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.
     * @property dataPromise
     * @type Y.Promise
     */

    /**
     * Holds a promise when the constrain plugin is ready.
     * @property _resizeConstrainPromise
     * @type Y.Promise
     * @private
     */

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 217);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 217);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 218);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 221);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 222);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 223);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 225);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 229);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 230);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 232);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 237);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 246);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 247);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 249);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 250);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 251);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 253);
instance._bodyNode = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 254);
instance._resizeEvent = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 255);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 256);
instance._panelHD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 257);
instance._panelBD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 258);
instance._panelFT = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
instance._nodeFilemanTree = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
instance._nodeFilemanTreeView = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 261);
instance._nodeFilemanFlow = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
instance._nodeFilemanItems = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 263);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 264);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 265);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 266);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 267);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 268);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 269);
instance.publish(EVT_ERROR, {
                preventable: false,
                broadcast: 1  // --> to make it catchable by itsaerrorreporter
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 273);
instance._createPromises();
            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 275);
boundingBox.addClass(HIDDEN_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 276);
(instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 277);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 278);
instance._setConstraints(true);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 279);
instance._correctHeightAfterResize();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 280);
boundingBox.removeClass(HIDDEN_CLASS);
                }
            );
        },

        /**
         * Binding eventlisteners.
         *
         * @method bindUI
         * @since 0.1
        */
        bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 291);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 292);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 299);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 300);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 301);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 302);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 303);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 304);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 305);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 306);
instance._panelFT.setStyle('display', 'none');
            }
/*
            instance.publish(EVT_ERROR, {
                preventable: false
            });
*/
            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 314);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 333);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 343);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 352);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 361);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 362);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 364);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 367);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 368);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 374);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 375);
return this._currentDir;
        },

        getCurrentDirTreeNode : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDirTreeNode", 378);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 379);
return this._currentDirTreeNode;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 388);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 389);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 398);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 399);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 408);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 409);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 418);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 419);
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
         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).
         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />
         * <br />
         * `copyFiles`: Copies selected files.
         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />
         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />
         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />
         * <br />
         * `createDir`: Creates a subdirectory.
         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).
         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />
         * <br />
         * `deleteDir`: Erases a directory.
         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />
         * <br />
         * `deleteFiles`: Erases the selected files.
         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).
         * <br />'options.selectedFiles' --> the selected files that will be erased<br />
         * <br />
         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass
         *                     throught to Y.LazyModelList (items-attribute)<br />
         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />
         * <br />
         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form
         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />
         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared
         *                                 with this value in order to know when no more requests are needed.<br />
         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />
         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />
         *                     'options.size'  --> current number of files to be downloaded from the server<br />
         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />
         * <br />
         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />
         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure
         *                                                                  (passed through from the attribute 'showTreefiles')<br />
         * <br />
         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />
         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />
         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure
         *                                                                  (passed through from the attribute 'showTreefiles')<br />
         * <br />
         * `moveDir`: Moves a directory.
         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).
         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />
         * <br />
         * `moveFiles`: Moves the selected files.
         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).
         * <br />'options.selectedFiles' --> the selected files that needs to be moved.
         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />
         * <br />
         * `renameDir`: Renames a directory.
         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).
         * <br />'options.newDirName'  holds the new directory-name.<br />
         * <br />
         * `renameFiles` : Renames the selected file.
         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).
         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.
         * <br />'options.newFilename'  holds the new file-name.
         *
         * @method sync
         * @param action {String} The sync-action to perform. May be one of the following:
         *         *
         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.
         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync
         * implementation to determine how to handle 'options'.
        */
        sync: function (/* action, options */) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 625);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 626);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 626);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 627);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 638);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 639);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 641);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 642);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 644);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 645);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 646);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 647);
instance.tree.destroy();
        },

        //=====================================================================
        // private functions
        //=====================================================================

        /**
         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise
         *
         * @method _createPromises
         * @private
         * @since 0.1
        */
        _createPromises : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 661);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 662);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 663);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 664);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 665);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 666);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 667);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 668);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 669);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 669);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 670);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 671);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 675);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 676);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 680);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 686);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 687);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 688);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 697);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 698);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 700);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 701);
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

        /**
         * Promise that resolves when all widgets are finished rendering
         *
         * @method _allWidgetsRenderedPromise
         * @private
         * @return {Y.Promise}
         * @since 0.1
        */
        _allWidgetsRenderedPromise : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 721);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 722);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 723);
return Y.batch(
                 // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.
                 instance._resizeConstrainPromise,
                 instance.filterSelect.renderPromise(),
                 instance.viewSelect.renderPromise(),
                 instance.editSelect.renderPromise(),
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 741);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 742);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 747);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 748);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 749);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 750);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 751);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 752);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 753);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 754);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 755);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 756);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 758);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 759);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 760);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 761);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 763);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 764);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 771);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 774);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 775);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 776);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // init the value of the current selected tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 782);
instance._currentDir  = '/';
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 784);
instance._renderToolbar();
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 786);
instance._renderTree();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 787);
instance._currentDirTreeNode = instance.tree.rootNode;
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 789);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 799);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 800);
var instance = this,
                  files, rendermodel, filescrollview;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 803);
instance.files = files = new Y.LazyModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 804);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 804);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 805);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 807);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 809);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 817);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 818);
filescrollview.render();
        },

        /**
         * Renders the widgets and buttons in the toolbar
         *
         * @method _renderToolbar
         * @private
         * @since 0.1
        */
        _renderToolbar : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 828);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 829);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode, createDirNode, createUploadNode;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 836);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
                selectionOnButton: false,
                defaultButtonText: 'filter',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 843);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 845);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 846);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 847);
Y.alert(selecteditem);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 848);
instance.filescrollview.set(
                        'viewFilter',
                        (selecteditem==='all files') ? null : function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "null", 850);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 853);
return true;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 858);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 859);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 860);
filterSelect.render(filterSelectNode);
            //=====================
            // render the view-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 864);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 871);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 873);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 874);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 875);
Y.alert(selecteditem);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 878);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 879);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 880);
viewSelect.render(viewSelectNode);
            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 884);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 891);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 893);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 894);
var selecteditem = e.index,
                          currentName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 896);
Y.alert(selecteditem);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 897);
switch (selecteditem) {
                        case 0:
                            // copy file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 900);
break;
                        case 1:
                            // rename file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 903);
break;
                        case 2:
                            // delete file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 906);
break;
                        case 3:
                            // clone dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 909);
currentName = instance.getCurrentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 910);
Y.prompt('Duplicate directory '+currentName, 'Enter the directory-name of the duplicated directory:',currentName+'-copy')
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 912);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 913);
instance.cloneDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 916);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 919);
currentName = instance.getCurrentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 920);
Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', currentName)
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 922);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 923);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 926);
break;
                        case 5:
                            // delete dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 929);
currentName = instance.getCurrentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 930);
Y.alert('Delete directory', 'Are you sure you want to delete '+currentName+' and all of its content?', {type: 'warn'})
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 932);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 933);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 936);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 941);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 942);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 946);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 947);
eventhandlers.push(
                createDirNode.on('click', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 948);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 949);
var currentName = instance.getCurrentDirTreeNode.label;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 950);
Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', 'New Directory')
                    .then(
                        function(response) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 952);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 953);
instance.createDir(Y.Escape.html(response.value));
                        }
                    );
                })
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 958);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 962);
createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 963);
instance._nodeFilemanToolbar.append(createUploadNode);
        },

        /**
         * Renders the tree-view by creating an Y.Tree inside the tree-pane.
         *
         * @method _renderTree
         * @private
         * @since 0.1
        */
        _renderTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 973);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 974);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree, lazyRender;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 982);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 983);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 988);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 989);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 990);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 992);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 995);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 996);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 996);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 997);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 1000);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1001);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 1002);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1005);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 1007);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1008);
callback(new Error(err));
                                }
                            );
                        }
                    });
                });
            }
            //============================
            // attach events to treenodes
            //============================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1018);
tree.after(
                'sortableTreeView:select',
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 1020);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1021);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1022);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1028);
rootnode = instance._nodeFilemanTreeRoot;
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1030);
eventhandlers.push(
                rootnode.on(
                    'click',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1033);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1034);
rootnode.set('tabIndex', 0);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1035);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1036);
rootnode.focus();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1037);
instance._currentDir = '/';
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1038);
instance._currentDirTreeNode = tree.rootNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1039);
instance.loadFiles();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1040);
YArray.each(
                            tree.getSelectedNodes(),
                            function(treenode) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1042);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1043);
treenode.unselect();
                            }
                        );
                    }
                )
            );
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1060);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1061);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1063);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1064);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1077);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1078);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1079);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1095);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1096);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1098);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1099);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1111);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1113);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1114);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 25)", 1116);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1117);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1129);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1130);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1138);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1139);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1140);
nodeFilemanItems.setStyle('height', newHeightFiles+'px');
            }
        },

        /**
         * Dynamically creates the next Class-methods:<br />
         * 'loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'
         *
         * @method _createMethods
         * @private
         * @protected
         * @since 0.1
        */
        _createMethods : function() {

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1154);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1156);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1157);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 26)", 1160);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1161);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1161);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1162);
var options = {};
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1167);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1170);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1171);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1173);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1174);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1175);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1176);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1177);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1179);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1180);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1182);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1183);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1184);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1186);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1187);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1188);
options.newFilename = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1190);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1191);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1192);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1194);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1195);
options.selectedFiles =  instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1196);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1198);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1199);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1201);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1202);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1203);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1205);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1206);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1207);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1209);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1210);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1211);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1212);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1214);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1215);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1216);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1218);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1219);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1220);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1221);
options.destinationDir = param1;
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1223);
return instance.readyPromise
                                    .then(
                                        Y.bind(instance.sync, instance, syncaction, options)
                                    )
                                    .then(
                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),
                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)
                                    );
                    };
                }
            );
        },

        /**
         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).
         *
         * @method _handleSyncError
         * @param reason {Object} The rejected value by the syncpromise
         * @param syncaction {Object} The original syncaction
         * @param options {Object} The options that were passed with the syncaction
         * @private
         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.
         * @since 0.1
        */
       _handleSyncError : function(reason, syncaction, options) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSyncError", 1247);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1248);
var instance = this,
                  facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1251);
instance.fire(EVT_ERROR);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1252);
Y.fire(EVT_ERROR);


            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1255);
facade = {
                options: options,
                error: reason,
                src: syncaction
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1260);
instance.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1261);
Y.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1262);
return reason;
       },

        /**
         * Method that handles the sync-response returned from the server.
         *
         * @method _handleSync
         * @param reason {Object} The rejected value by the syncpromise
         * @param syncaction {Object} The original syncaction
         * @param options {Object} The options that were passed with the syncaction
         * @param param1 {Any} The first parameter that was passed into the sync-action
         * @private
         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.
         * @since 0.1
        */
       _handleSync : function(response, syncaction, options, param1) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSync", 1277);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1278);
var instance = this,
                  parsedResponse = PARSE(response),
                  err = parsedResponse.error,
                  tree, facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1283);
if (err) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1284);
return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1287);
facade = {
                    response: response,
                    options: options
                };
                // Lazy publish.
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1292);
if (!instance['_'+syncaction]) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1293);
instance['_'+syncaction] = instance.publish(syncaction, {
                        preventable: false
                    });
                }
                // now we need process the response
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1298);
if (syncaction === 'loadFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1299);
instance.files.reset(parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1301);
if (syncaction === 'loadAppendFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1304);
if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1305);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1306);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1308);
instance.tree.insertNode(param1, parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1310);
if (syncaction === 'renameFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1313);
if (syncaction === 'renameDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1314);
instance.getCurrentDirTreeNode.label = options.newDirName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1315);
instance.sort();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1316);
instance.tree.render();
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1318);
if (syncaction === 'deleteFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1321);
if (syncaction === 'deleteDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1324);
if (syncaction === 'createDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1327);
if (syncaction === 'moveDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1330);
if (syncaction === 'moveFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1333);
if (syncaction === 'cloneDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1336);
if (syncaction === 'copyFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1339);
if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1340);
tree = instance.tree;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1341);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1342);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1344);
tree.insertNode(tree.rootNode, parsedResponse);
                }}}}}}}}}}}}}
                // end of processing, now fire event
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
instance.fire(syncaction, facade);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1348);
return response;
            }
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1362);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1363);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1366);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1367);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1368);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1369);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1380);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1382);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1385);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1386);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1387);
instance._currentDirTreeNode = treenode;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1388);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1401);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1402);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1403);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1408);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1421);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1422);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1423);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1428);
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
        _setConstraints : function(activate) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1440);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1441);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1442);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1444);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1445);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1456);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1457);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1458);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1460);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1461);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1463);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1465);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1466);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1467);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1469);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
                }
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
         * @method _setSizeFlowArea
         * @param val {Int} new value
         * @param [attribute] {String} name of the attribute
         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeFlowArea : function(val, attribute, forceZero) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1498);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1499);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1505);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1507);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1508);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1509);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1510);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1513);
return newHeight;
        },

        /**
         * Setter for attribute sizeTreeArea.
         *
         * @method _setSizeTreeArea
         * @param val {Int} new value
         * @param [attribute] {String} name of the attribute
         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'
         * @private
         * @protected
         * @since 0.1
        */
        _setSizeTreeArea : function(val, attribute, forceZero) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1527);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1528);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1535);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1536);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1537);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1538);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1539);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1540);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1541);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1543);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 1555);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1556);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1561);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1562);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1563);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1565);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1568);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1569);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1571);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1577);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1578);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1579);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1581);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1584);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1585);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1587);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeFlow,
                    instance
                );
            }}
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 1603);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1604);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1606);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1607);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1608);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1609);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1626);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1627);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1641);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1642);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1644);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1645);
this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);
                }
            },

            /**
             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />
             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.
             *
             * @attribute delayView
             * @type Boolean
             * @default false
             * @since 0.1
            */
            delayView: {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1660);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1661);
return (typeof val === 'boolean');
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1674);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1675);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1677);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1678);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1679);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1680);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1681);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1683);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1685);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1686);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1699);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1700);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1702);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1703);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1704);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1705);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1706);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1708);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1710);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1711);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1732);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1733);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1746);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1747);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1761);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1762);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1776);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1777);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1791);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1792);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1794);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1795);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1796);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1797);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1811);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1812);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1814);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1815);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1816);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1817);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1831);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1832);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1834);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1835);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1836);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1837);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1851);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1852);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1854);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1855);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1856);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1857);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1871);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1872);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1874);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1875);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1893);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1894);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1912);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1913);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1926);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1927);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1929);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1930);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1931);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1932);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1946);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1947);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1949);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1950);
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
        "event",
        "event-custom",
        "event-touch",
        "node-base",
        "node-screen",
        "node-event-delegate",
        "pluginhost-base",
        "lazy-model-list",
        "promise",
        "json-parse",
        "tree-sortable",
        "gallery-sm-treeview",
        "gallery-itsaerrorreporter",
        "gallery-itsadialog",
        "gallery-itsascrollviewmodellist",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsaselectlist"
    ],
    "skinnable": false
});
