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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uolaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    FILTERITEMS = ['all files','images', 'non-images', 'word', 'excel', 'pdf'],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['copy file', 'rename file', 'delete file', 'copy dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<img src=\"{thumbnail}\" />',","    HIDDEN_CLASS = 'yui3-itsafilemanager-hidden',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\">{text}</button>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return Y.JSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._bodyNode = null;","            instance._resizeEvent = null;","            instance._busyResize = false;","            instance._panelHD = null;","            instance._panelBD = null;","            instance._panelFT = null;","            instance._nodeFilemanTree = null;","            instance._nodeFilemanTreeView = null;","            instance._nodeFilemanFlow = null;","            instance._nodeFilemanItems = null;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._bodyNode = Y.one('body');","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(HIDDEN_CLASS);","            (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                function() {","                    instance._setConstraints(true);","                    instance._correctHeightAfterResize();","                    boundingBox.removeClass(HIDDEN_CLASS);","                }","            );","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file. When multiple files are selected, they will all get the smae name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFile","         * @param newFilename {String} new filename for the selected file","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFilename'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        Y.batch(","                            instance.loadFiles(),","                            (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())","                        )","                    ).then(","                        resolve","                    );","                }","            );","        },","","        _allWidgetsRenderedPromise : function() {","            var instance = this;","            return Y.batch(","//                 instance.tree.renderPromise(), // Y.TreeView doesn't have/need a renderpromise --> it renders synchronious","                 instance._resizeConstrainPromise,","                 instance.filterSelect.renderPromise(),","                 instance.viewSelect.renderPromise(),","                 instance.editSelect.renderPromise(),","                 instance.filescrollview.renderPromise()","            );","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // init the value of the current selected tree","            instance._currentDir  = '/';","            // now we create the toolbar","            instance._renderToolbar();","            // now we create the directory tree","            instance._renderTree();","            // now we create the files tree:","            instance._renderFiles();","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            instance.files = files = new Y.LazyModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode, createDirNode, createUploadNode;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","                selectionOnButton: false,","                defaultButtonText: 'filter',","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                    instance.filescrollview.set(","                        'viewFilter',","                        (selecteditem==='all files') ? null : function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));","                            return true;","                        }","                    );","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","            //=====================","            // render the view-select:","            //=====================","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.value;","                    Y.alert(selecteditem);","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index;","                    Y.alert(selecteditem);","                    switch (selecteditem) {","                        case 0:","                            // copy file","                        break;","                        case 1:","                            // rename file","                        break;","                        case 2:","                            // delete file","                        break;","                        case 3:","                            // clone dir","                        break;","                        case 4:","                            // rename dir","                            Y.prompt('Rename directory', 'Enter new directory-name:')","                            .then(","                                function(response) {","                                    instance.renameDir(response.value);","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the create dir button:","            //=====================","            createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));","            instance._nodeFilemanToolbar.append(createUploadNode);","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree, lazyRender;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function() {","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            rootnode = instance._nodeFilemanTreeRoot;","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    function() {","                        rootnode.set('tabIndex', 0);","                        rootnode.addClass(TREEVIEW_SELECTED_CLASS);","                        rootnode.focus();","                        instance._currentDir = '/';","                        instance.loadFiles();","                        YArray.each(","                            tree.getSelectedNodes(),","                            function(treenode) {","                                treenode.unselect();","                            }","                        );","                    }","                )","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        _createMethods : function() {","","            var instance = this,","                  tree;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {},","                              facade;","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.newFilename = param1;","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options.selectedFiles =  instance.getSelectedFiles();","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.selectedFiles = instance.getSelectedFiles();","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.currentDir = instance.getCurrentDir();","                            options.destinationDir = param1;","                        }","                        facade = {","                            options: options","                        };","                        return instance.readyPromise.then(","                            Y.bind(instance.sync, instance, syncaction, options)","                        ).then(","                            function(response) {","                                // Lazy publish.","                                if (!instance['_'+syncaction]) {","                                    instance['_'+syncaction] = instance.publish(syncaction, {","                                        preventable: false","                                    });","                                }","                                // now we need process the response","                                if (syncaction === 'loadFiles') {","                                    instance.files.reset(PARSE(response));","                                }","                                else if (syncaction === 'loadAppendFiles') {","                                    // ....","                                }","                                else if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {","                                    if (!instance._rootVisible) {","                                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                                    }","                                    instance.tree.insertNode(param1, PARSE(response));","                                }","                                else if (syncaction === 'renameFiles') {","                                    // ....","                                }","                                else if (syncaction === 'renameDir') {","                                    // ....","                                }","                                else if (syncaction === 'deleteFiles') {","                                    // ....","                                }","                                else if (syncaction === 'deleteDir') {","                                    // ....","                                }","                                else if (syncaction === 'createDir') {","                                    // ....","                                }","                                else if (syncaction === 'moveDir') {","                                    // ....","                                }","                                else if (syncaction === 'moveFiles') {","                                    // ....","                                }","                                else if (syncaction === 'cloneDir') {","                                    // ....","                                }","                                else if (syncaction === 'copyFiles') {","                                    // ....","                                }","                                else if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {","                                    tree = instance.tree;","                                    if (!instance._rootVisible) {","                                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                                    }","                                    tree.insertNode(tree.rootNode, PARSE(response));","                                }","                                // end of processing, now fire event","                                facade.response = response;","                                instance.fire(syncaction, facade);","                                return response;","                            },","                            function(err) {","alert(err);","                                facade.error = err;","                                facade.src = syncaction;","                                instance.fire(EVT_ERROR, facade);","                                return err;","                            }","                        );","                    };","                }","            );","        },","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function(val) {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanTree.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanFlow.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._panelFT.setStyle('display', (val ? '' : 'none'));","                    instance._correctHeightAfterResize();","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-touch\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json-parse\",","        \"tree-sortable\",","        \"gallery-sm-treeview\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"78":0,"82":0,"83":0,"84":0,"86":0,"91":0,"94":0,"216":0,"217":0,"220":0,"221":0,"222":0,"224":0,"228":0,"231":0,"236":0,"246":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"270":0,"271":0,"273":0,"274":0,"275":0,"287":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"300":0,"301":0,"305":0,"315":0,"324":0,"334":0,"343":0,"352":0,"353":0,"355":0,"359":0,"366":0,"376":0,"386":0,"396":0,"406":0,"613":0,"614":0,"626":0,"628":0,"629":0,"631":0,"632":0,"633":0,"634":0,"642":0,"643":0,"645":0,"647":0,"648":0,"649":0,"650":0,"651":0,"655":0,"656":0,"660":0,"666":0,"668":0,"677":0,"680":0,"681":0,"694":0,"695":0,"714":0,"719":0,"720":0,"721":0,"722":0,"723":0,"724":0,"725":0,"726":0,"727":0,"728":0,"730":0,"731":0,"732":0,"733":0,"735":0,"736":0,"743":0,"747":0,"748":0,"754":0,"756":0,"758":0,"760":0,"771":0,"774":0,"775":0,"776":0,"778":0,"780":0,"788":0,"789":0,"800":0,"806":0,"813":0,"816":0,"817":0,"818":0,"823":0,"828":0,"829":0,"830":0,"834":0,"841":0,"844":0,"845":0,"848":0,"849":0,"850":0,"854":0,"861":0,"864":0,"865":0,"866":0,"869":0,"872":0,"875":0,"878":0,"881":0,"884":0,"887":0,"890":0,"894":0,"895":0,"896":0,"900":0,"901":0,"905":0,"906":0,"917":0,"925":0,"926":0,"931":0,"932":0,"933":0,"935":0,"938":0,"939":0,"940":0,"944":0,"948":0,"951":0,"961":0,"964":0,"965":0,"971":0,"973":0,"977":0,"978":0,"979":0,"980":0,"981":0,"982":0,"985":0,"1003":0,"1005":0,"1006":0,"1020":0,"1021":0,"1037":0,"1038":0,"1040":0,"1041":0,"1055":0,"1056":0,"1059":0,"1072":0,"1080":0,"1081":0,"1082":0,"1088":0,"1090":0,"1094":0,"1095":0,"1100":0,"1101":0,"1104":0,"1105":0,"1107":0,"1108":0,"1109":0,"1110":0,"1111":0,"1113":0,"1114":0,"1116":0,"1117":0,"1118":0,"1120":0,"1121":0,"1122":0,"1124":0,"1125":0,"1126":0,"1128":0,"1129":0,"1130":0,"1132":0,"1133":0,"1135":0,"1136":0,"1137":0,"1139":0,"1140":0,"1141":0,"1143":0,"1144":0,"1145":0,"1146":0,"1148":0,"1149":0,"1150":0,"1152":0,"1153":0,"1154":0,"1155":0,"1157":0,"1160":0,"1165":0,"1166":0,"1171":0,"1172":0,"1174":0,"1177":0,"1178":0,"1179":0,"1181":0,"1183":0,"1186":0,"1189":0,"1192":0,"1195":0,"1198":0,"1201":0,"1204":0,"1207":0,"1210":0,"1211":0,"1212":0,"1213":0,"1215":0,"1218":0,"1219":0,"1220":0,"1223":0,"1224":0,"1225":0,"1226":0,"1227":0,"1244":0,"1247":0,"1248":0,"1249":0,"1250":0,"1263":0,"1266":0,"1267":0,"1268":0,"1282":0,"1283":0,"1288":0,"1302":0,"1303":0,"1308":0,"1321":0,"1322":0,"1324":0,"1325":0,"1336":0,"1337":0,"1338":0,"1340":0,"1341":0,"1343":0,"1345":0,"1346":0,"1347":0,"1349":0,"1379":0,"1385":0,"1387":0,"1388":0,"1389":0,"1390":0,"1393":0,"1408":0,"1415":0,"1416":0,"1417":0,"1418":0,"1419":0,"1420":0,"1421":0,"1423":0,"1436":0,"1441":0,"1442":0,"1443":0,"1445":0,"1448":0,"1449":0,"1451":0,"1457":0,"1458":0,"1459":0,"1461":0,"1464":0,"1465":0,"1467":0,"1484":0,"1486":0,"1487":0,"1488":0,"1489":0,"1507":0,"1522":0,"1525":0,"1541":0,"1555":0,"1558":0,"1559":0,"1560":0,"1561":0,"1563":0,"1566":0,"1580":0,"1583":0,"1584":0,"1585":0,"1586":0,"1588":0,"1591":0,"1613":0,"1627":0,"1642":0,"1657":0,"1672":0,"1675":0,"1676":0,"1677":0,"1692":0,"1695":0,"1696":0,"1697":0,"1712":0,"1715":0,"1716":0,"1717":0,"1732":0,"1735":0,"1736":0,"1737":0,"1752":0,"1755":0,"1774":0,"1793":0,"1807":0,"1810":0,"1811":0,"1812":0,"1827":0,"1830":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:77":0,"PARSE:81":0,"getTreeInfo:216":0,"sortComparator:229":0,"(anonymous 2):272":0,"initializer:245":0,"(anonymous 3):358":0,"bindUI:286":0,"getCurrentDir:365":0,"hideFlow:375":0,"hideTree:385":0,"showFlow:395":0,"showTree:405":0,"(anonymous 4):613":0,"sync:612":0,"destructor:625":0,"(anonymous 7):649":0,"(anonymous 6):646":0,"(anonymous 5):644":0,"(anonymous 8):667":0,"(anonymous 9):678":0,"_createPromises:641":0,"_allWidgetsRenderedPromise:693":0,"(anonymous 10):746":0,"_afterRender:713":0,"comparator:775":0,"_renderFiles:770":0,"null:820":0,"(anonymous 11):815":0,"(anonymous 12):843":0,"(anonymous 14):883":0,"(anonymous 13):863":0,"_renderToolbar:799":0,"(anonymous 16):945":0,"(anonymous 17):950":0,"load:943":0,"(anonymous 15):939":0,"(anonymous 18):963":0,"(anonymous 20):984":0,"(anonymous 19):976":0,"_renderTree:916":0,"_checkEndResizeApprovement:1002":0,"_checkResizeAprovement:1019":0,"(anonymous 21):1058":0,"_clearEventhandlers:1053":0,"_correctHeightAfterResize:1071":0,"(anonymous 23):1163":0,"(anonymous 24):1222":0,"]:1094":0,"(anonymous 22):1093":0,"_createMethods:1086":0,"_endResizeApprovement:1243":0,"_loadFilePane:1261":0,"_resizeTree:1281":0,"_resizeFlow:1301":0,"_setConstraints:1320":0,"_setSizeFlowArea:1378":0,"_setSizeTreeArea:1407":0,"_startResize:1435":0,"_stopResize:1483":0,"validator:1506":0,"validator:1521":0,"setter:1524":0,"validator:1540":0,"validator:1554":0,"setter:1557":0,"getter:1565":0,"validator:1579":0,"setter:1582":0,"getter:1590":0,"validator:1612":0,"validator:1626":0,"validator:1641":0,"validator:1656":0,"validator:1671":0,"setter:1674":0,"validator:1691":0,"setter:1694":0,"validator:1711":0,"setter:1714":0,"validator:1731":0,"setter:1734":0,"validator:1751":0,"setter:1754":0,"validator:1773":0,"validator:1792":0,"validator:1806":0,"setter:1809":0,"validator:1826":0,"setter:1829":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 398;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 91;
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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 77);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 78);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 81);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 82);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 83);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 84);
return Y.JSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 86);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 91);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 94);
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 216);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 216);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 217);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 220);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 221);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 222);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 224);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 228);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 229);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 231);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 236);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 245);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 246);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 248);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 249);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 250);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 251);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
instance._bodyNode = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 253);
instance._resizeEvent = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 254);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 255);
instance._panelHD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 256);
instance._panelBD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 257);
instance._panelFT = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 258);
instance._nodeFilemanTree = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
instance._nodeFilemanTreeView = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
instance._nodeFilemanFlow = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 261);
instance._nodeFilemanItems = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 263);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 264);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 265);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 266);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 267);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 268);
instance._createPromises();
            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 270);
boundingBox.addClass(HIDDEN_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 271);
(instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 272);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 273);
instance._setConstraints(true);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 274);
instance._correctHeightAfterResize();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 275);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 286);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 287);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 294);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 295);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 296);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 297);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 298);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 299);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 300);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 301);
instance._panelFT.setStyle('display', 'none');
            }

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 305);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 315);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 334);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 343);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 352);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 353);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 355);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 358);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 359);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 365);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 366);
return this._currentDir;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 375);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 376);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 385);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 386);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 395);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 396);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 405);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 406);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 612);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 613);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 613);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 614);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 625);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 626);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 628);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 629);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 631);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 632);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 633);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 634);
instance.tree.destroy();
        },

        //=====================================================================
        // private functions
        //=====================================================================

        _createPromises : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 641);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 642);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 643);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 644);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 645);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 646);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 647);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 648);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 649);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 649);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 650);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 651);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 655);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 656);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 660);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 666);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 667);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 668);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 677);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 678);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 680);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 681);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 693);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 694);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 695);
return Y.batch(
//                 instance.tree.renderPromise(), // Y.TreeView doesn't have/need a renderpromise --> it renders synchronious
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 713);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 714);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 719);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 720);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 721);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 722);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 723);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 724);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 725);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 726);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 727);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 728);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 730);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 731);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 732);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 733);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 735);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 736);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 743);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 746);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 747);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 748);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // init the value of the current selected tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 754);
instance._currentDir  = '/';
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 756);
instance._renderToolbar();
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 758);
instance._renderTree();
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 760);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 770);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 771);
var instance = this,
                  files, rendermodel, filescrollview;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 774);
instance.files = files = new Y.LazyModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 775);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 775);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 776);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 778);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 780);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 788);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 789);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 799);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 800);
var instance = this,
                  filterSelect, viewSelect, editSelect, filterSelectNode, viewSelectNode, editSelectNode, createDirNode, createUploadNode;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 806);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
                selectionOnButton: false,
                defaultButtonText: 'filter',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 813);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 815);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 816);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 817);
Y.alert(selecteditem);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 818);
instance.filescrollview.set(
                        'viewFilter',
                        (selecteditem==='all files') ? null : function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
//                            return (fileitem.filename && fileitem.filename.isFileType(selecteditem));
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "null", 820);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 823);
return true;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 828);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 829);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 830);
filterSelect.render(filterSelectNode);
            //=====================
            // render the view-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 834);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 841);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 843);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 844);
var selecteditem = e.value;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 845);
Y.alert(selecteditem);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 848);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 849);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 850);
viewSelect.render(viewSelectNode);
            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 854);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 861);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 863);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 864);
var selecteditem = e.index;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 865);
Y.alert(selecteditem);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 866);
switch (selecteditem) {
                        case 0:
                            // copy file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 869);
break;
                        case 1:
                            // rename file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 872);
break;
                        case 2:
                            // delete file
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 875);
break;
                        case 3:
                            // clone dir
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 878);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 881);
Y.prompt('Rename directory', 'Enter new directory-name:')
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 883);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 884);
instance.renameDir(response.value);
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 887);
break;
                        case 5:
                            // delete dir
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 890);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 894);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 895);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 896);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 900);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 901);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 905);
createUploadNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'upload files'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 906);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 916);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 917);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree, lazyRender;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 925);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 926);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 931);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 932);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 933);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 935);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 938);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 939);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 939);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 943);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 944);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 945);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 948);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 950);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 951);
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
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 961);
tree.after(
                'sortableTreeView:select',
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 963);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 964);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 965);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 971);
rootnode = instance._nodeFilemanTreeRoot;
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 973);
eventhandlers.push(
                rootnode.on(
                    'click',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 976);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 977);
rootnode.set('tabIndex', 0);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 978);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 979);
rootnode.focus();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 980);
instance._currentDir = '/';
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 981);
instance.loadFiles();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 982);
YArray.each(
                            tree.getSelectedNodes(),
                            function(treenode) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 984);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 985);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1002);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1003);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1005);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1006);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1019);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1020);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1021);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1037);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1038);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1040);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1041);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1053);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1055);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1056);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 1058);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1059);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1071);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1072);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1080);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1081);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1082);
nodeFilemanItems.setStyle('height', newHeightFiles+'px');
            }
        },

        _createMethods : function() {

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1086);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1088);
var instance = this,
                  tree;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1090);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 1093);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1094);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1094);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1095);
var options = {},
                              facade;
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1100);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1101);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1104);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1105);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1107);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1108);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1109);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1110);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1111);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1113);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1114);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1116);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1117);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1118);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1120);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1121);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1122);
options.newFilename = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1124);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1125);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1126);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1128);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1129);
options.selectedFiles =  instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1130);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1132);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1133);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1135);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1136);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1137);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1139);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1140);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1141);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1143);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1144);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1145);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1146);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1148);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1149);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1150);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1152);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1153);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1154);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1155);
options.destinationDir = param1;
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1157);
facade = {
                            options: options
                        };
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1160);
return instance.readyPromise.then(
                            Y.bind(instance.sync, instance, syncaction, options)
                        ).then(
                            function(response) {
                                // Lazy publish.
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1163);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1165);
if (!instance['_'+syncaction]) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
instance['_'+syncaction] = instance.publish(syncaction, {
                                        preventable: false
                                    });
                                }
                                // now we need process the response
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1171);
if (syncaction === 'loadFiles') {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1172);
instance.files.reset(PARSE(response));
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1174);
if (syncaction === 'loadAppendFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1177);
if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1178);
if (!instance._rootVisible) {
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1179);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                                    }
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1181);
instance.tree.insertNode(param1, PARSE(response));
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1183);
if (syncaction === 'renameFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1186);
if (syncaction === 'renameDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1189);
if (syncaction === 'deleteFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1192);
if (syncaction === 'deleteDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1195);
if (syncaction === 'createDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1198);
if (syncaction === 'moveDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1201);
if (syncaction === 'moveFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1204);
if (syncaction === 'cloneDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1207);
if (syncaction === 'copyFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1210);
if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1211);
tree = instance.tree;
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1212);
if (!instance._rootVisible) {
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1213);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                                    }
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1215);
tree.insertNode(tree.rootNode, PARSE(response));
                                }}}}}}}}}}}}}
                                // end of processing, now fire event
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1218);
facade.response = response;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1219);
instance.fire(syncaction, facade);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1220);
return response;
                            },
                            function(err) {
_yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1222);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1223);
alert(err);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1224);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1225);
facade.src = syncaction;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1226);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1227);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1243);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1244);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1247);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1248);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1249);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1250);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1261);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1263);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1266);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1267);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1268);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1281);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1282);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1283);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1288);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1301);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1302);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1303);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1308);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1320);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1321);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1322);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1324);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1325);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1336);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1337);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1338);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1340);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1341);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1343);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1345);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1346);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1349);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1378);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1379);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1385);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1387);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1388);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1389);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1390);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1393);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1407);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1408);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1415);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1416);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1417);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1418);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1419);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1420);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1421);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1423);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 1435);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1436);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1441);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1442);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1443);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1445);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1448);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1449);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1451);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1457);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1458);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1459);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1461);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1464);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1465);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1467);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 1483);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1484);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1486);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1487);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1488);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1489);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1506);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1507);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1521);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1522);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1524);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1525);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1540);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1541);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1554);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1555);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1557);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1558);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1559);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1560);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1561);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1563);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1565);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1566);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1579);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1580);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1582);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1583);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1584);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1585);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1586);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1588);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1590);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1591);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1612);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1613);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1626);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1627);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1641);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1642);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1656);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1657);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1671);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1672);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1674);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1675);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1676);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1677);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1691);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1692);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1694);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1695);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1696);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1697);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1711);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1712);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1714);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1715);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1716);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1717);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1731);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1732);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1734);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1735);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1736);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1737);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1751);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1752);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1754);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1755);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1773);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1774);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1792);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1793);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1806);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1807);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1809);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1810);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1811);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1812);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1826);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1827);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1829);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1830);
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
        "promise",
        "json-parse",
        "tree-sortable",
        "gallery-sm-treeview",
        "gallery-itsadialog",
        "gallery-itsascrollviewmodellist",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsaselectlist"
    ],
    "skinnable": false
});
