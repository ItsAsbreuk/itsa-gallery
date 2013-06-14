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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uolaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    YJSON = Y.JSON,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    PROCESS_ERROR = 'An error occured during processing',","    FILTERITEMS = ['all files','images', 'non-images', 'word', 'excel', 'pdf'],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<img src=\"{thumbnail}\" />',","    HIDDEN_CLASS = 'yui3-itsafilemanager-hidden',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\">{text}</button>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return YJSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._bodyNode = null;","            instance._resizeEvent = null;","            instance._busyResize = false;","            instance._panelHD = null;","            instance._panelBD = null;","            instance._panelFT = null;","            instance._nodeFilemanTree = null;","            instance._nodeFilemanTreeView = null;","            instance._nodeFilemanFlow = null;","            instance._nodeFilemanItems = null;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._bodyNode = Y.one('body');","            instance.publish(EVT_ERROR, {","                preventable: false,","                broadcast: 1  // --> to make it catchable by itsaerrorreporter","            });","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(HIDDEN_CLASS);","            (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                function() {","                    instance._setConstraints(true);","                    instance._correctHeightAfterResize();","                    boundingBox.removeClass(HIDDEN_CLASS);","                }","            );","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","/*","            instance.publish(EVT_ERROR, {","                preventable: false","            });","*/","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        getCurrentDirTreeNode : function() {","            return this._currentDirTreeNode;","        },","","        getSelectedFiles : function() {","            var instance = this,","                  selectedModels = instance.filescrollview.getSelectedModels(),","                  selectedFiles = [];","            YArray.each(","                selectedModels,","                function(fileobject) {","                    selectedFiles.push(fileobject.filename);","                }","            );","            return selectedFiles;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file. When multiple files are selected, they will all get the smae name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFile","         * @param newFilename {String} new filename for the selected file","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFilename'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise","         *","         * @method _createPromises","         * @private","         * @since 0.1","        */","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        Y.batch(","                            instance.loadFiles(),","                            (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())","                        )","                    ).then(","                        resolve","                    );","                }","            );","        },","","        /**","         * Promise that resolves when all widgets are finished rendering","         *","         * @method _allWidgetsRenderedPromise","         * @private","         * @return {Y.Promise}","         * @since 0.1","        */","        _allWidgetsRenderedPromise : function() {","            var instance = this;","            return Y.batch(","                 // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.","                 instance._resizeConstrainPromise,","                 instance.filterSelect.renderPromise(),","                 instance.viewSelect.renderPromise(),","                 instance.editSelect.renderPromise(),","                 instance.filescrollview.renderPromise()","            );","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // now we create the toolbar","            instance._renderToolbar();","            // now we create the directory tree","            instance._renderTree();","            // init the value of the current selected tree, but do not load the files","            instance._selectRootNode(true);","            // now we create the files tree:","            instance._renderFiles();","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            instance.files = files = new Y.LazyModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelsSelectable: 'multi',","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode,","                  createDirNode, createUploadNode, selectedModels, multipleFiles, originalFilename;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","                selectionOnButton: false,","                defaultButtonText: 'filter',","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                    instance.filescrollview.set(","                        'viewFilter',","                        (selecteditem==='all files') ? null : function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));","                            return true;","                        }","                    );","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","            //=====================","            // render the view-select:","            //=====================","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index,","                          filescrollview = instance.filescrollview,","                          currentName;","                    switch (selecteditem) {","                        case 0:","                            // duplicate file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')","                            .then(","                                function(response) {","                                    instance.copyFiles(instance._currentDir);","                                }","                            );","                        break;","                        case 1:","                            // rename file(s)","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', {value: currentName})","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 2:","                            // delete file(s)","                            currentName = instance._currentDirTreeNode.label;","                            Y.confirm('Delete directory', 'Are you sure you want to delete \\''+currentName+'\\'<br />and all of its content?')","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                        case 3:","                            // clone dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Duplicate directory '+currentName, 'Enter the directory-name of the duplicated directory:',","                                            {value: currentName+'-copy'})","                            .then(","                                function(response) {","                                    instance.cloneDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 4:","                            // rename dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', {value: currentName})","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.confirm('Delete directory', 'Are you sure you want to delete \\''+currentName+'\\'<br />and all of its content?')","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            eventhandlers.push(","                createDirNode.on('click', function() {","                    var currentName = instance._currentDirTreeNode.label;","                    Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})","                    .then(","                        function(response) {","                            instance.createDir(Y.Escape.html(response.value));","                        }","                    );","                })","            );","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the create dir button:","            //=====================","            createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));","            instance._nodeFilemanToolbar.append(createUploadNode);","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree, lazyRender;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function() {","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                    instance.filescrollview.clearSelectedModels(null, true);","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    instance._selectRootNode,","                    instance","                )","            );","        },","","        _selectRootNode : function(withoutFileLoad) {","            var instance = this,","                  tree = instance.tree,","                  rootnode = instance._nodeFilemanTreeRoot;","            rootnode.set('tabIndex', 0);","            rootnode.addClass(TREEVIEW_SELECTED_CLASS);","            rootnode.focus();","            instance._currentDir = '/';","            instance._currentDirTreeNode = tree.rootNode;","            if (!withoutFileLoad) {","                instance.loadFiles();","            }","            YArray.each(","                tree.getSelectedNodes(),","                function(treenode) {","                    treenode.unselect();","                }","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        /**","         * Dynamically creates the next Class-methods:<br />","         * 'loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'","         *","         * @method _createMethods","         * @private","         * @protected","         * @since 0.1","        */","        _createMethods : function() {","","            var instance = this;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {};","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.newFilename = param1;","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options.selectedFiles =  instance.getSelectedFiles();","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.selectedFiles = instance.getSelectedFiles();","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance.getCurrentDir();","                            options.destinationDir = param1;","                            // now unselect the selected files, for convenience experience","                            instance.filescrollview.clearSelectedModels(null, true);","                        }","                        return instance.readyPromise","                                    .then(","                                        Y.bind(instance.sync, instance, syncaction, options)","                                    )","                                    .then(","                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),","                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)","                                    );","                    };","                }","            );","        },","","        /**","         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).","         *","         * @method _handleSyncError","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSyncError : function(reason, syncaction, options) {","            var instance = this,","                  facade;","","            instance.fire(EVT_ERROR);","            Y.fire(EVT_ERROR);","","","            facade = {","                options: options,","                error: reason,","                src: syncaction","            };","            instance.fire(EVT_ERROR, facade);","            Y.fire(EVT_ERROR, facade);","            return reason;","       },","","        /**","         * Method that handles the sync-response returned from the server.","         *","         * @method _handleSync","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @param param1 {Any} The first parameter that was passed into the sync-action","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSync : function(response, syncaction, options, param1) {","            var instance = this,","                  parsedResponse = PARSE(response),","                  err = parsedResponse.error,","                  tree = instance.tree,","                  lazyRender = instance.get('lazyRender'),","                  showTreefiles = instance.get('showTreefiles'),","                  facade, changedTreeNode, dirName, parentnode, createdFiles;","","            if (err) {","                return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);","            }","            else {","                facade = {","                    response: response,","                    options: options","                };","                // Lazy publish.","                if (!instance['_'+syncaction]) {","                    instance['_'+syncaction] = instance.publish(syncaction, {","                        preventable: false","                    });","                }","                // now we need process the response","                if (syncaction === 'loadFiles') {","                    instance.files.reset(parsedResponse);","                }","                else if (syncaction === 'loadAppendFiles') {","                    // ....","                }","                else if ((syncaction === 'loadTreeLazy') && lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(param1, parsedResponse);","                }","                else if (syncaction === 'renameFiles') {","                    // ....","                }","                else if (syncaction === 'renameDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    changedTreeNode.label = options.newDirName;","                    changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                    instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';","                }","                else if (syncaction === 'deleteFiles') {","                    // ....","                }","                else if (syncaction === 'deleteDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    parentnode = changedTreeNode.parent;","                    tree.removeNode(changedTreeNode, {destroy: true});","                    // now select its parentnode","                    if (parentnode === tree.rootNode) {","                        instance._selectRootNode();","                    }","                    else {","                        tree.selectNode(parentnode);","                    }","                }","                else if (syncaction === 'createDir') {","                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted","                    // Opening the treenode would load all subdirs and leads to double reference","                    changedTreeNode = instance._currentDirTreeNode;","                    if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {","                        dirName = parsedResponse.result; // the directoryname that was created on the server .","                                                                               // this can be different from the requested dirname.","                        tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});","                    }","                    // always open the node to let the new directory be shown","                    tree.openNode(changedTreeNode);","                }","                else if (syncaction === 'moveDir') {","                    // ....","                }","                else if (syncaction === 'moveFiles') {","                    // ....","                }","                else if (syncaction === 'cloneDir') {","                    // ....","                }","                else if (syncaction === 'copyFiles') {","                    createdFiles = parsedResponse.result; // array with fileobjects","                    instance.files.add(createdFiles);","                    changedTreeNode = instance._currentDirTreeNode;","alert('showTreefiles: '+showTreefiles);","alert('changedTreeNode: '+changedTreeNode);","                    if (showTreefiles) {","                        // now add the files to the tree","                        YArray.each(","                            createdFiles,","                            function(fileobject) {","alert('fileobject.filename: '+fileobject.filename);","                                tree.insertNode(changedTreeNode, {label: fileobject.filename});","                            }","                        );","                    }","                }","                else if ((syncaction === 'loadTree') && !lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(tree.rootNode, parsedResponse);","                }","                // end of processing, now fire event","                instance.fire(syncaction, facade);","                return response;","            }","        },","","","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance._currentDirTreeNode = treenode;","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function(val) {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanTree.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanFlow.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._panelFT.setStyle('display', (val ? '' : 'none'));","                    instance._correctHeightAfterResize();","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"event\",","        \"event-custom\",","        \"event-touch\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json\",","        \"gallery-sm-treeview\",","        \"gallery-sm-treeview-sortable\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"80":0,"84":0,"85":0,"86":0,"88":0,"93":0,"96":0,"218":0,"219":0,"222":0,"223":0,"224":0,"226":0,"230":0,"233":0,"238":0,"248":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"269":0,"270":0,"274":0,"276":0,"277":0,"279":0,"280":0,"281":0,"293":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"315":0,"325":0,"334":0,"344":0,"353":0,"362":0,"363":0,"365":0,"369":0,"376":0,"380":0,"384":0,"387":0,"390":0,"393":0,"403":0,"413":0,"423":0,"433":0,"640":0,"641":0,"653":0,"655":0,"656":0,"658":0,"659":0,"660":0,"661":0,"676":0,"677":0,"679":0,"681":0,"682":0,"683":0,"684":0,"685":0,"689":0,"690":0,"694":0,"700":0,"702":0,"711":0,"714":0,"715":0,"736":0,"737":0,"756":0,"761":0,"762":0,"763":0,"764":0,"765":0,"766":0,"767":0,"768":0,"769":0,"770":0,"772":0,"773":0,"774":0,"775":0,"777":0,"778":0,"785":0,"789":0,"790":0,"796":0,"798":0,"800":0,"802":0,"813":0,"816":0,"817":0,"818":0,"820":0,"822":0,"831":0,"832":0,"843":0,"851":0,"858":0,"861":0,"862":0,"863":0,"868":0,"873":0,"874":0,"875":0,"879":0,"886":0,"889":0,"890":0,"893":0,"894":0,"895":0,"899":0,"906":0,"909":0,"912":0,"915":0,"916":0,"917":0,"918":0,"923":0,"926":0,"929":0,"930":0,"933":0,"936":0,"939":0,"940":0,"943":0,"946":0,"949":0,"950":0,"954":0,"957":0,"960":0,"961":0,"964":0,"967":0,"970":0,"971":0,"974":0,"977":0,"981":0,"982":0,"983":0,"987":0,"988":0,"990":0,"991":0,"994":0,"999":0,"1003":0,"1004":0,"1015":0,"1023":0,"1024":0,"1029":0,"1030":0,"1031":0,"1033":0,"1036":0,"1037":0,"1038":0,"1042":0,"1046":0,"1049":0,"1059":0,"1062":0,"1063":0,"1064":0,"1071":0,"1081":0,"1084":0,"1085":0,"1086":0,"1087":0,"1088":0,"1089":0,"1090":0,"1092":0,"1095":0,"1110":0,"1112":0,"1113":0,"1127":0,"1128":0,"1144":0,"1145":0,"1147":0,"1148":0,"1162":0,"1163":0,"1166":0,"1179":0,"1187":0,"1188":0,"1189":0,"1205":0,"1206":0,"1210":0,"1211":0,"1215":0,"1216":0,"1219":0,"1220":0,"1222":0,"1223":0,"1224":0,"1225":0,"1226":0,"1228":0,"1229":0,"1231":0,"1232":0,"1233":0,"1235":0,"1236":0,"1237":0,"1239":0,"1240":0,"1241":0,"1243":0,"1244":0,"1245":0,"1247":0,"1248":0,"1250":0,"1251":0,"1252":0,"1254":0,"1255":0,"1256":0,"1258":0,"1259":0,"1260":0,"1261":0,"1263":0,"1264":0,"1265":0,"1267":0,"1268":0,"1269":0,"1270":0,"1272":0,"1274":0,"1299":0,"1302":0,"1303":0,"1306":0,"1311":0,"1312":0,"1313":0,"1329":0,"1337":0,"1338":0,"1341":0,"1346":0,"1347":0,"1352":0,"1353":0,"1355":0,"1358":0,"1359":0,"1360":0,"1362":0,"1364":0,"1367":0,"1368":0,"1369":0,"1370":0,"1371":0,"1373":0,"1376":0,"1377":0,"1378":0,"1379":0,"1381":0,"1382":0,"1385":0,"1388":0,"1391":0,"1392":0,"1393":0,"1395":0,"1398":0,"1400":0,"1403":0,"1406":0,"1409":0,"1410":0,"1411":0,"1412":0,"1413":0,"1414":0,"1415":0,"1417":0,"1420":0,"1421":0,"1426":0,"1427":0,"1428":0,"1430":0,"1433":0,"1434":0,"1449":0,"1452":0,"1453":0,"1454":0,"1455":0,"1468":0,"1471":0,"1472":0,"1473":0,"1474":0,"1488":0,"1489":0,"1494":0,"1508":0,"1509":0,"1514":0,"1527":0,"1528":0,"1530":0,"1531":0,"1542":0,"1543":0,"1544":0,"1546":0,"1547":0,"1549":0,"1551":0,"1552":0,"1553":0,"1555":0,"1585":0,"1591":0,"1593":0,"1594":0,"1595":0,"1596":0,"1599":0,"1614":0,"1621":0,"1622":0,"1623":0,"1624":0,"1625":0,"1626":0,"1627":0,"1629":0,"1642":0,"1647":0,"1648":0,"1649":0,"1651":0,"1654":0,"1655":0,"1657":0,"1663":0,"1664":0,"1665":0,"1667":0,"1670":0,"1671":0,"1673":0,"1690":0,"1692":0,"1693":0,"1694":0,"1695":0,"1713":0,"1728":0,"1731":0,"1747":0,"1761":0,"1764":0,"1765":0,"1766":0,"1767":0,"1769":0,"1772":0,"1786":0,"1789":0,"1790":0,"1791":0,"1792":0,"1794":0,"1797":0,"1819":0,"1833":0,"1848":0,"1863":0,"1878":0,"1881":0,"1882":0,"1883":0,"1898":0,"1901":0,"1902":0,"1903":0,"1918":0,"1921":0,"1922":0,"1923":0,"1938":0,"1941":0,"1942":0,"1943":0,"1958":0,"1961":0,"1980":0,"1999":0,"2013":0,"2016":0,"2017":0,"2018":0,"2033":0,"2036":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:79":0,"PARSE:83":0,"getTreeInfo:218":0,"sortComparator:231":0,"(anonymous 2):278":0,"initializer:247":0,"(anonymous 3):368":0,"bindUI:292":0,"getCurrentDir:375":0,"getCurrentDirTreeNode:379":0,"(anonymous 4):389":0,"getSelectedFiles:383":0,"hideFlow:402":0,"hideTree:412":0,"showFlow:422":0,"showTree:432":0,"(anonymous 5):640":0,"sync:639":0,"destructor:652":0,"(anonymous 8):683":0,"(anonymous 7):680":0,"(anonymous 6):678":0,"(anonymous 9):701":0,"(anonymous 10):712":0,"_createPromises:675":0,"_allWidgetsRenderedPromise:735":0,"(anonymous 11):788":0,"_afterRender:755":0,"comparator:817":0,"_renderFiles:812":0,"null:865":0,"(anonymous 12):860":0,"(anonymous 13):888":0,"(anonymous 15):922":0,"(anonymous 16):932":0,"(anonymous 17):942":0,"(anonymous 18):953":0,"(anonymous 19):963":0,"(anonymous 20):973":0,"(anonymous 14):908":0,"(anonymous 22):993":0,"(anonymous 21):989":0,"_renderToolbar:842":0,"(anonymous 24):1043":0,"(anonymous 25):1048":0,"load:1041":0,"(anonymous 23):1037":0,"(anonymous 26):1061":0,"_renderTree:1014":0,"(anonymous 27):1094":0,"_selectRootNode:1080":0,"_checkEndResizeApprovement:1109":0,"_checkResizeAprovement:1126":0,"(anonymous 28):1165":0,"_clearEventhandlers:1160":0,"_correctHeightAfterResize:1178":0,"]:1210":0,"(anonymous 29):1209":0,"_createMethods:1203":0,"_handleSyncError:1298":0,"(anonymous 30):1419":0,"_handleSync:1328":0,"_endResizeApprovement:1448":0,"_loadFilePane:1466":0,"_resizeTree:1487":0,"_resizeFlow:1507":0,"_setConstraints:1526":0,"_setSizeFlowArea:1584":0,"_setSizeTreeArea:1613":0,"_startResize:1641":0,"_stopResize:1689":0,"validator:1712":0,"validator:1727":0,"setter:1730":0,"validator:1746":0,"validator:1760":0,"setter:1763":0,"getter:1771":0,"validator:1785":0,"setter:1788":0,"getter:1796":0,"validator:1818":0,"validator:1832":0,"validator:1847":0,"validator:1862":0,"validator:1877":0,"setter:1880":0,"validator:1897":0,"setter:1900":0,"validator:1917":0,"setter:1920":0,"validator:1937":0,"setter:1940":0,"validator:1957":0,"setter:1960":0,"validator:1979":0,"validator:1998":0,"validator:2012":0,"setter:2015":0,"validator:2032":0,"setter:2035":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 457;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 102;
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
    YJSON = Y.JSON,
    IE = Y.UA.ie,
    CHARZERO = '\u0000',
    PROCESS_ERROR = 'An error occured during processing',
    FILTERITEMS = ['all files','images', 'non-images', 'word', 'excel', 'pdf'],
    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],
    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],
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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 79);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 80);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 83);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 84);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 85);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 86);
return YJSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 88);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 93);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 96);
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 218);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 218);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 219);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 222);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 223);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 224);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 226);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 230);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 231);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 233);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 238);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 247);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 248);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 250);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 251);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 253);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 254);
instance._bodyNode = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 255);
instance._resizeEvent = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 256);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 257);
instance._panelHD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 258);
instance._panelBD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
instance._panelFT = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
instance._nodeFilemanTree = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 261);
instance._nodeFilemanTreeView = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
instance._nodeFilemanFlow = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 263);
instance._nodeFilemanItems = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 264);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 265);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 266);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 267);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 268);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 269);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 270);
instance.publish(EVT_ERROR, {
                preventable: false,
                broadcast: 1  // --> to make it catchable by itsaerrorreporter
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 274);
instance._createPromises();
            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 276);
boundingBox.addClass(HIDDEN_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 277);
(instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 278);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 279);
instance._setConstraints(true);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 280);
instance._correctHeightAfterResize();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 281);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 292);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 293);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 300);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 301);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 302);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 303);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 304);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 305);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 306);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 307);
instance._panelFT.setStyle('display', 'none');
            }
/*
            instance.publish(EVT_ERROR, {
                preventable: false
            });
*/
            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 315);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 325);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 334);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 344);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 353);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 362);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 363);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 365);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 368);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 369);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 375);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 376);
return this._currentDir;
        },

        getCurrentDirTreeNode : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDirTreeNode", 379);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 380);
return this._currentDirTreeNode;
        },

        getSelectedFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getSelectedFiles", 383);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 384);
var instance = this,
                  selectedModels = instance.filescrollview.getSelectedModels(),
                  selectedFiles = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 387);
YArray.each(
                selectedModels,
                function(fileobject) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 389);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 390);
selectedFiles.push(fileobject.filename);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 393);
return selectedFiles;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 402);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 403);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 412);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 413);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 422);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 423);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 432);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 433);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 639);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 640);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 640);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 641);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 652);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 653);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 655);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 656);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 658);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 659);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 660);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 661);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 675);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 676);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 677);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 678);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 679);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 680);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 681);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 682);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 683);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 683);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 684);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 685);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 689);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 690);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 694);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 700);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 701);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 702);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 711);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 712);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 714);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 715);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 735);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 736);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 737);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 755);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 756);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 761);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 762);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 763);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 764);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 765);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 766);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 767);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 768);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 769);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 770);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 772);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 773);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 774);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 775);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 777);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 778);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 785);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 788);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 789);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 790);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 796);
instance._renderToolbar();
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 798);
instance._renderTree();
            // init the value of the current selected tree, but do not load the files
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 800);
instance._selectRootNode(true);
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 802);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 812);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 813);
var instance = this,
                  files, rendermodel, filescrollview;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 816);
instance.files = files = new Y.LazyModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 817);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 817);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 818);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 820);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 822);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelsSelectable: 'multi',
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 831);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 832);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 842);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 843);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode,
                  createDirNode, createUploadNode, selectedModels, multipleFiles, originalFilename;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 851);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
                selectionOnButton: false,
                defaultButtonText: 'filter',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 858);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 860);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 861);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 862);
Y.alert(selecteditem);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 863);
instance.filescrollview.set(
                        'viewFilter',
                        (selecteditem==='all files') ? null : function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "null", 865);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 868);
return true;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 873);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 874);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 875);
filterSelect.render(filterSelectNode);
            //=====================
            // render the view-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 879);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 886);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 888);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 889);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 890);
Y.alert(selecteditem);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 893);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 894);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 895);
viewSelect.render(viewSelectNode);
            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 899);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 906);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 908);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 909);
var selecteditem = e.index,
                          filescrollview = instance.filescrollview,
                          currentName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 912);
switch (selecteditem) {
                        case 0:
                            // duplicate file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 915);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 916);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 917);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 918);
Y.confirm(
                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 922);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 923);
instance.copyFiles(instance._currentDir);
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 926);
break;
                        case 1:
                            // rename file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 929);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 930);
Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', {value: currentName})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 932);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 933);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 936);
break;
                        case 2:
                            // delete file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 939);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
Y.confirm('Delete directory', 'Are you sure you want to delete \''+currentName+'\'<br />and all of its content?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 942);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 943);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 946);
break;
                        case 3:
                            // clone dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 949);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 950);
Y.prompt('Duplicate directory '+currentName, 'Enter the directory-name of the duplicated directory:',
                                            {value: currentName+'-copy'})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 953);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 954);
instance.cloneDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 957);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 960);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 961);
Y.prompt('Rename directory '+currentName, 'Enter new directory-name:', {value: currentName})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 963);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 964);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 967);
break;
                        case 5:
                            // delete dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 970);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 971);
Y.confirm('Delete directory', 'Are you sure you want to delete \''+currentName+'\'<br />and all of its content?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 973);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 974);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 977);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 981);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 982);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 983);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 987);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 988);
eventhandlers.push(
                createDirNode.on('click', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 989);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 990);
var currentName = instance._currentDirTreeNode.label;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 991);
Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})
                    .then(
                        function(response) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 993);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 994);
instance.createDir(Y.Escape.html(response.value));
                        }
                    );
                })
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 999);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1003);
createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1004);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 1014);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1015);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree, lazyRender;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1023);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1024);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1029);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1030);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1031);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1033);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1036);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1037);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1037);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1038);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 1041);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1042);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1043);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1046);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 25)", 1048);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1049);
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
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1059);
tree.after(
                'sortableTreeView:select',
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 26)", 1061);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1062);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1063);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1064);
instance.filescrollview.clearSelectedModels(null, true);
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1071);
eventhandlers.push(
                rootnode.on(
                    'click',
                    instance._selectRootNode,
                    instance
                )
            );
        },

        _selectRootNode : function(withoutFileLoad) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_selectRootNode", 1080);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1081);
var instance = this,
                  tree = instance.tree,
                  rootnode = instance._nodeFilemanTreeRoot;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1084);
rootnode.set('tabIndex', 0);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1085);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1086);
rootnode.focus();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1087);
instance._currentDir = '/';
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1088);
instance._currentDirTreeNode = tree.rootNode;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1089);
if (!withoutFileLoad) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1090);
instance.loadFiles();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1092);
YArray.each(
                tree.getSelectedNodes(),
                function(treenode) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 27)", 1094);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1095);
treenode.unselect();
                }
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1109);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1110);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1112);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1113);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1126);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1127);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1128);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1144);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1145);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1147);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1148);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1160);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1162);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1163);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 28)", 1165);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1178);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1179);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1187);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1188);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1189);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1203);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1205);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1206);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 29)", 1209);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1210);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1210);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1211);
var options = {};
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1215);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1216);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1219);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1220);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1222);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1223);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1224);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1225);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1226);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1228);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1229);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1231);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1232);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1233);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1235);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1236);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1237);
options.newFilename = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1239);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1240);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1241);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1243);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1244);
options.selectedFiles =  instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1245);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1247);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1248);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1250);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1251);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1252);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1254);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1255);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1256);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1258);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1259);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1260);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1261);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1263);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1264);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1265);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1267);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1268);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1269);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1270);
options.destinationDir = param1;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1272);
instance.filescrollview.clearSelectedModels(null, true);
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1274);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSyncError", 1298);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1299);
var instance = this,
                  facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1302);
instance.fire(EVT_ERROR);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1303);
Y.fire(EVT_ERROR);


            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1306);
facade = {
                options: options,
                error: reason,
                src: syncaction
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1311);
instance.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1312);
Y.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1313);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSync", 1328);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1329);
var instance = this,
                  parsedResponse = PARSE(response),
                  err = parsedResponse.error,
                  tree = instance.tree,
                  lazyRender = instance.get('lazyRender'),
                  showTreefiles = instance.get('showTreefiles'),
                  facade, changedTreeNode, dirName, parentnode, createdFiles;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1337);
if (err) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1338);
return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1341);
facade = {
                    response: response,
                    options: options
                };
                // Lazy publish.
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1346);
if (!instance['_'+syncaction]) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
instance['_'+syncaction] = instance.publish(syncaction, {
                        preventable: false
                    });
                }
                // now we need process the response
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1352);
if (syncaction === 'loadFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1353);
instance.files.reset(parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1355);
if (syncaction === 'loadAppendFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1358);
if ((syncaction === 'loadTreeLazy') && lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1359);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1360);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1362);
tree.insertNode(param1, parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1364);
if (syncaction === 'renameFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1367);
if (syncaction === 'renameDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1368);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1369);
changedTreeNode.label = options.newDirName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1370);
changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1371);
instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1373);
if (syncaction === 'deleteFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1376);
if (syncaction === 'deleteDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1377);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1378);
parentnode = changedTreeNode.parent;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1379);
tree.removeNode(changedTreeNode, {destroy: true});
                    // now select its parentnode
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1381);
if (parentnode === tree.rootNode) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1382);
instance._selectRootNode();
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1385);
tree.selectNode(parentnode);
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1388);
if (syncaction === 'createDir') {
                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted
                    // Opening the treenode would load all subdirs and leads to double reference
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1391);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1392);
if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1393);
dirName = parsedResponse.result; // the directoryname that was created on the server .
                                                                               // this can be different from the requested dirname.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1395);
tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});
                    }
                    // always open the node to let the new directory be shown
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1398);
tree.openNode(changedTreeNode);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1400);
if (syncaction === 'moveDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1403);
if (syncaction === 'moveFiles') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1406);
if (syncaction === 'cloneDir') {
                    // ....
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1409);
if (syncaction === 'copyFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1410);
createdFiles = parsedResponse.result; // array with fileobjects
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1411);
instance.files.add(createdFiles);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1412);
changedTreeNode = instance._currentDirTreeNode;
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1413);
alert('showTreefiles: '+showTreefiles);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1414);
alert('changedTreeNode: '+changedTreeNode);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1415);
if (showTreefiles) {
                        // now add the files to the tree
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1417);
YArray.each(
                            createdFiles,
                            function(fileobject) {
_yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 30)", 1419);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1420);
alert('fileobject.filename: '+fileobject.filename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1421);
tree.insertNode(changedTreeNode, {label: fileobject.filename});
                            }
                        );
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1426);
if ((syncaction === 'loadTree') && !lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1427);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1428);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1430);
tree.insertNode(tree.rootNode, parsedResponse);
                }}}}}}}}}}}}}
                // end of processing, now fire event
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1433);
instance.fire(syncaction, facade);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1434);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1448);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1449);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1452);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1453);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1454);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1455);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1466);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1468);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1471);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1472);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1473);
instance._currentDirTreeNode = treenode;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1474);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1487);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1488);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1489);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1494);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1507);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1508);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1509);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1514);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1526);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1527);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1528);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1530);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1531);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1542);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1543);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1544);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1546);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1547);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1549);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1551);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1552);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1553);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1555);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1584);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1585);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1591);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1593);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1594);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1595);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1596);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1599);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1613);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1614);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1621);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1622);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1623);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1624);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1625);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1626);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1627);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1629);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 1641);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1642);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1647);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1648);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1649);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1651);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1654);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1655);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1657);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1663);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1664);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1665);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1667);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1670);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1671);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1673);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 1689);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1690);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1692);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1693);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1694);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1695);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1712);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1713);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1727);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1728);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1730);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1731);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1746);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1747);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1760);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1761);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1763);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1764);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1765);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1766);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1767);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1769);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1771);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1772);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1785);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1786);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1788);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1789);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1790);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1791);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1792);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1794);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1796);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1797);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1818);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1819);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1832);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1833);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1847);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1848);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1862);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1863);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1877);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1878);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1880);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1881);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1882);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1883);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1897);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1898);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1900);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1901);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1902);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1903);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1917);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1918);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1920);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1921);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1922);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1923);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1937);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1938);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1940);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1941);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1942);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1943);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1957);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1958);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1960);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1961);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1979);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1980);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1998);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1999);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2012);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2013);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2015);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2016);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2017);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2018);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2032);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2033);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2035);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2036);
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
        "json",
        "gallery-sm-treeview",
        "gallery-sm-treeview-sortable",
        "gallery-itsaerrorreporter",
        "gallery-itsadialog",
        "gallery-itsascrollviewmodellist",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsaselectlist"
    ],
    "skinnable": false
});
