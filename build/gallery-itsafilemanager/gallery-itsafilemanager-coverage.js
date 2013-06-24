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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uplaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    YJSON = Y.JSON,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    LABEL_UPLOAD_FILES = 'upload files',","    PROCESS_ERROR = 'An error occured during processing',","    FILTERITEMS = [","        {text: 'all files', returnValue: '*'},","        {text: 'images', returnValue: 'jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'non-images', returnValue: '!,jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'txt', returnValue: 'txt'},","        {text: 'word', returnValue: 'doc,docx'},","        {text: 'excel', returnValue: 'xls,xlsx'},","        {text: 'powerpoint', returnValue: 'ppt,pptx'},","        {text: 'pdf', returnValue: 'pdf'}","    ],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<% if (data.filename.isFileType([\"jpg\",\"jpeg\",\"gif\",\"bmp\",\"tif\",\"tiff\",\"png\"])) { %><img src=\"<%= data.thumbnail %>\" />' +","                                             '<% } else { %>' +","                                                 '<div class=\"itsa-thumbnail\">' +","                                                     '<div class=\"itsa-fileicon <%= data.filename.extractFileExtension() %>\"></div>' +","                                                     '<span class=\"file-label\"><%= data.filename %></span>' +","                                                 '</div>' +","                                             '<% } %>',","    LIST_TEMPLATE = '<td><%= data.filename %></td>' +","                                 '<td><%= data.size %></td>' +","                                 '<% if (data.width && data.height && (data.width>0) && (data.height>0)) { %>' +","                                     '<td><%= data.modified %></td>' +","                                     '<td><%= data.width %>x<%= data.height %></td>' +","                                 '<% } else { %>' +","                                     '<td colspan=2><%= data.modified %></td>' +","                                 '<% } %>',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\" type=\"button\">{text}</button>',","    INSTALL_FLASH_NODE = '<button class=\"pure-button pure-button-toolbar\" type=\"button\">{text}</button>',","    EMPTY_FILEUPLOADNODE = '<div class=\"pure-button pure-uploadbutton\"></div>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    HIDDEN_CLASS = FILEMANCLASSNAME + '-hidden',","    EXTEND_LOADING_CLASS = FILEMANCLASSNAME + '-extendloading',","    FILEMAN_LIST_TEMPLATE_CLASS = FILEMANCLASSNAME + '-list-files',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_DISK_CLASS = FILEMANCLASSNAME + '-disk',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'><div class='\"+FILEMAN_DISK_CLASS+\"'></div>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return YJSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTreeLazy' succesfully.","     * @event loadTreeLazy","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","String.prototype.extractFileExtension = function() {","    return this.match(/.+\\.(\\w+)$/)[1];","};","","String.prototype.isFileType = function(extentions) {","    return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);","};","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        },","        getByFileName: function(directoryTreeNode, filename) {","            var foundNode;","            YArray.some(","                directoryTreeNode.children,","                function(node) {","                    if (!node.canHaveChildren && (node.label === filename)) {","                        foundNode = node;","                    }","                    return foundNode;","                }","            );","            return foundNode;","        },","        directoryIsLoaded : function(treenode) {","            var instance = this;","            return (treenode.state.loaded || (treenode === instance.rootNode));","        }","    }",");","","Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {","        getByFileName: function (filename) {","            var instance = this,","                  foundModel;","            instance.some(","                function(model) {","                    if (model.filename === filename) {","                        foundModel = model;","                    }","                    return foundModel;","                }","            );","            return foundModel;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","","            // because IE<9 throws an focus-error combined with ITSADialog (only inside this module, don't know why),","            // we suppress error-reporting. This appears only in the debugmode","            if ((IE>0) && (IE<9)) {","                Y.ITSAErrorReporter.reportErrorLogs(false);","            }","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._busyResize = false;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._currentDir = '/';","            instance._bodyNode = Y.one('body');","            instance.publish(EVT_ERROR, {","                preventable: false,","                broadcast: 1  // --> to make it catchable by itsaerrorreporter","            });","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(EXTEND_LOADING_CLASS);","            // now call the promise, even if it is not used --> this will do the final settings in the right order.","            instance.initialized();","        },","","        initialized : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            if (!instance._isInitialized) {","                instance._isInitialized =  (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                    function() {","                        instance._setConstraints(true);","                        instance._correctHeightAfterResize();","                        boundingBox.removeClass(EXTEND_LOADING_CLASS);","                    }","                );","            }","            return instance._isInitialized;","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","/*","            instance.publish(EVT_ERROR, {","                preventable: false","            });","*/","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","","// when files are selected, the must be selected in the tree as well.","// suppres for the time being, because we need to find a way to prevent 'looping'","// that is: when the tree-files are selected, they will select the files again (by their own event)","/*","            eventhandlers.push(","                instance.after(","                    'itsascrollviewmodellist:modelSelectionChange',","                    function(e) {","                        var selectedfiles = e.originalModelSelection,","                              tree = instance.tree;","                        tree.unselect();","                        YArray.each(","                            selectedfiles,","                            function(fileobject) {","                                var treenode = tree.getByFileName(instance._currentDirTreeNode, fileobject.filename);","                                if (treenode) {","                                    tree.selectNode(treenode, {silent: true});","                                }","                            }","                        );","                    }","                )","            );","*/","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        getCurrentDirTreeNode : function() {","            return this._currentDirTreeNode;","        },","","        getSelectedFiles : function() {","            var instance = this,","                  selectedModels = instance.filescrollview.getSelectedModels(),","                  selectedFiles = [];","            YArray.each(","                selectedModels,","                function(fileobject) {","                    selectedFiles.push(fileobject.filename);","                }","            );","            return selectedFiles;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file(s). When multiple files are selected, the server needs to hanlde the right naming.","         * For example by giving the files the same name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFiles","         * @param newFilename {String} new filename for the selected file(s)","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFileName'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform.","         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise","         *","         * @method _createPromises","         * @private","         * @since 0.1","        */","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        // do not use Y.batch directly, for the context would be undefined","                        function() {","                            return Y.batch(","                                instance.loadFiles(),","                                instance.loadTreeLazy()","                            );","                       }","                    ).then(","                        resolve","                    );","                }","            );","        },","","        /**","         * Promise that resolves when all widgets are finished rendering","         *","         * @method _allWidgetsRenderedPromise","         * @private","         * @return {Y.Promise}","         * @since 0.1","        */","        _allWidgetsRenderedPromise : function() {","            var instance = this,","                  promiseslist = [];","","             // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.","            promiseslist.push(instance._resizeConstrainPromise);","            promiseslist.push(instance.filterSelect.renderPromise());","//            promiseslist.push(instance.viewSelect.renderPromise());","            promiseslist.push(instance.editSelect.renderPromise());","            if (instance.get('uploadURL') && (Y.Uploader.TYPE !== 'none')) {","                promiseslist.push(instance.uploader.renderPromise());","            }","            promiseslist.push(instance.filescrollview.renderPromise());","            return Y.batch.apply(Y, promiseslist);","","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // now we create the directory tree","            instance._renderTree();","            // init the value of the current selected tree, but do not load the files","            instance._selectRootNode(true);","            // now we create the files tree:","            instance._renderFiles();","            // now we create dd methods for moving the files:","            instance._createDDFiles();","            // now we create the toolbar","            instance._renderToolbar();","        },","","        /**","         * Creates drag-drop functionalities to the files, so that they can be dropped into a directory.","         *","         * @method _createDDFiles","         * @private","         * @since 0.1","        */","        _createDDFiles : function() {","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module","            instance.files = files = new Y.LazyFileModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelsSelectable: 'multi',","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        _renderViewSelect : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox'),","                  filescrollview = instance.filescrollview,","                  viewSelectNode, viewSelect;","","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index;","                    switch (selecteditem) {","                        case 0:","                            filescrollview.setWithoutRerender('listType', 'table');","                            filescrollview.set('modelTemplate', LIST_TEMPLATE);","                            boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                        case 1:","                            filescrollview.setWithoutRerender('listType', 'ul');","                            filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);","                            boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                    }","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  filescrollview = instance.filescrollview,","                  createDirNode, filterSelect, editSelect, filterSelectNode, editSelectNode,","                  selectedModels, multipleFiles, originalFilename;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","//                selectionOnButton: false,","                defaultItem: FILTERITEMS[0].text,","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var posibleExtentions = e.value.split(','),","                          contra = (posibleExtentions[0]==='!');","                    if (contra) {","                        posibleExtentions.splice(0, 1);","                    }","                    instance.filescrollview.set(","                        'viewFilter',","                        function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","                            var filematch;","                            if (posibleExtentions[0]==='*') {","                                return true;","                            }","                            filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));","                            return contra ? !filematch : filematch;","                        }","                    );","                    filescrollview.syncUI();","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","","            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!","            // instance._renderViewSelect();","","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index,","                          filescrollview = instance.filescrollview,","                          currentName;","                    switch (selecteditem) {","                        case 0:","                            // duplicate file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')","                            .then(","                                function() {","                                    instance.copyFiles(instance._currentDir);","                                }","                            );","                        break;","                        case 1:","                            // rename file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.prompt(","                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Enter new filename:',","                                {value: originalFilename})","                            .then(","                                function(response) {","                                    instance.renameFiles(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 2:","                            // delete file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')","                            .then(","                                function() {","                                    instance.deleteFiles();","                                }","                            );","                        break;","                        case 3:","                            // clone dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',","                                            {value: currentName+'-copy'})","                            .then(","                                function(response) {","                                    instance.cloneDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 4:","                            // rename dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.confirm('Delete directory', 'Are you sure you want to delete \\''+currentName+'\\'<br />and all of its content?')","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            eventhandlers.push(","                createDirNode.on('click', function() {","                    var currentName = instance._currentDirTreeNode.label;","                    Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})","                    .then(","                        function(response) {","                            instance.createDir(Y.Escape.html(response.value));","                        }","                    );","                })","            );","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the upload files button:","            //=====================","            instance._createUploader();","        },","","        /**","         * Creates the upload-button, either as a Flash, or as HTML5 uploader. If no html5-support and flash is not installed,","         * then the button will ask for Flash to be installed.","         *","         * @method _createUploader","         * @private","         * @since 0.1","        */","        _createUploader : function() {","            var instance = this,","                  uploadURL = instance.get('uploadURL'),","                  eventhandlers = instance._eventhandlers,","                  createUploadNode, uploaderType, uploader, shadowNode, createInstallFlashNode;","","            if (uploadURL) {","                uploaderType = Y.Uploader.TYPE;","                if (uploaderType === 'flash') {","                    // because the flashbutton seems not to be disabled (when told to),","                    // we overlay an extra div to prevent clicking on the flash-uploader.","                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,","                    // this feature can be removed (as well as the disabling of the upload-button during upload)","                    shadowNode = Y.Node.create(\"<div class='block-button'></div>\");","                    instance._nodeFilemanToolbar.append(shadowNode);","                }","                if (Y.Uploader.TYPE !== 'none') {","                    if (instance._installFlashNode) {","                        // remove previous rendered install-flash buttonnode","                        instance._installFlashNode.remove(true);","                    }","                    createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);","                    instance._nodeFilemanToolbar.append(createUploadNode);","                    uploader = instance.uploader = new Y.Uploader({","//                    uploader = instance.uploader = new Y.UploaderFlash({","//                    uploader = instance.uploader = new Y.UploaderHTML5({","                        enabled: instance.get('uploaderEnabled'),","                        errorAction: instance.get('uploaderErrorAction'),","                        fileFieldName: instance.get('uploaderFileFieldName'),","                        uploadHeaders: instance.get('uploadHeaders'),","                        uploadURL: uploadURL,","                        withCredentials: instance.get('withHTML5Credentials'),","                        swfURL: instance.get('swfURL') + '?t=' + Math.random(),","                        width: \"80px\",","                        height: \"25px\",","                        appendNewFiles: false,","                        multipleFiles: true,","                        buttonClassNames: {","                            hover: 'pure-button-hover',","                            active: 'pure-button',","                            disabled: 'pure-button-disabled',","                            focus: 'pure-button'","                        },","                        selectButtonLabel: LABEL_UPLOAD_FILES","                    });","//                    if (uploaderType==='html5') {","        //                uploader.set(\"dragAndDropArea\", instance._nodeFilemanItems);"," //                   }","                    uploader.after('fileselect', function (e) {","                        var fileList = e.fileList,","                              params = {};","                        if (fileList.length > 0) {","                           if (shadowNode) {","                               shadowNode.addClass('blocked');","                               createUploadNode.addClass('pure-button-disabled');","                           }","                           uploader.set('enabled', false);","                           YArray.each(fileList, function (fileInstance) {","                                // store currentDirTreeNode insode the fileinstance, so we know later win what directory to put the file","                                fileInstance.currentDirTreeNode = instance._currentDirTreeNode;","                                params[fileInstance.get('id')] = Y.merge(","                                    instance.get('uploaderPostVars'),","                                    {","                                        currentDir: instance._currentDir,","                                        filename: fileInstance.get(\"name\")","                                    }","                                );","                            });","                            uploader.set('postVarsPerFile', params);","                            uploader.uploadAll();","                        }","                    });","                    uploader.on('uploadcomplete', function (e) {","                        var response = PARSE(e.data),","                              error = response.error,","                              newfileobject = response.results,","                              tree = instance.tree,","                              showTreefiles = instance.get('showTreefiles'),","                              fileDirectoryNode = e.file.currentDirTreeNode;","                        if (error) {","                            instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));","                        }","                        else {","                            instance.files.add(newfileobject);","                            if (showTreefiles && fileDirectoryNode && tree.directoryIsLoaded(fileDirectoryNode)) {","                                tree.insertNode(fileDirectoryNode, {label: newfileobject.filename});","                            }","                        }","                    });","                    uploader.on('alluploadscomplete', function () {","                        if (shadowNode) {","                            shadowNode.removeClass('blocked');","                            createUploadNode.removeClass('pure-button-disabled');","                        }","                        uploader.set('enabled', true);","                    });","                    uploader.render(createUploadNode);","                }","                else {","                    // create the button that will prompt to install flash","                    createInstallFlashNode = instance._installFlashNode = Y.Node.create(Lang.sub(INSTALL_FLASH_NODE, {text: 'x'+LABEL_UPLOAD_FILES}));","                    instance._nodeFilemanToolbar.append(createInstallFlashNode);","                    eventhandlers.push(","                        createInstallFlashNode.on('click', function() {","                            Y.alert('Flash player',","                                        'The most recent version of Adobe Flash player should be installed if you want to upload files.'+","                                        '<br /><br /><a href=\"http://get.adobe.com/flashplayer\" target=\"_blank\">install flashplayer now</a>')","                            .then(","                                function() {","                                    // check if the flashplayer is indeed installed. If so, then uploader-button can be installed","                                    instance._redetectFlash();","                                    if (Y.SWFDetect.isFlashVersionAtLeast(10,0,45)) {","                                        Y.Uploader = Y.UploaderFlash;","                                        Y.Uploader.TYPE = \"flash\";","                                        instance._createUploader();","                                    }","                                }","                            );","                        })","                    );","                }","            }","        },","","        _redetectFlash : function() {","            var version = 0,","                uA = Y.UA,","                sF = \"ShockwaveFlash\",","                mF, eP, vS, ax6, ax;","","            function parseFlashVersion (flashVer) {","                if (Lang.isNumber(PARSTEINT(flashVer[0]))) {","                    uA.flashMajor = flashVer[0];","                }","","                if (Lang.isNumber(PARSTEINT(flashVer[1]))) {","                    uA.flashMinor = flashVer[1];","                }","","                if (Lang.isNumber(PARSTEINT(flashVer[2]))) {","                    uA.flashRev = flashVer[2];","                }","            }","            if (uA.gecko || uA.webkit || uA.opera) {","               if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {","                  if ((eP = mF.enabledPlugin)) {","                     vS = eP.description.replace(/\\s[rd]/g, '.').replace(/[A-Za-z\\s]+/g, '').split('.');","                     parseFlashVersion(vS);","                  }","               }","            }","            else if(uA.ie) {","                try","                {","                    ax6 = new ActiveXObject(sF + \".\" + sF + \".6\");","                    ax6.AllowScriptAccess = \"always\";","                }","                catch (e)","                {","                    if(ax6 !== null)","                    {","                        version = 6.0;","                    }","                }","                if (version === 0) {","                try","                {","                    ax = new ActiveXObject(sF + \".\" + sF);","                    vS = ax.GetVariable(\"$version\").replace(/[A-Za-z\\s]+/g, '').split(',');","                    parseFlashVersion(vS);","                } catch (e2) {}","                }","            }","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: true,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // Setup lazyRender's callbackfunc:","            tree.plug(Y.Plugin.Tree.Lazy, {","                // Custom function that Plugin.Tree.Lazy will call when it needs to","                // load the children for a node.","                load: function (node, callback) {","                    instance.loadTreeLazy(node).then(","                        function() {","                            // Call the callback function to tell Plugin.Tree.Lazy that","                            // we're done loading data.","                            callback();","                        },","                        function(err) {","                            callback(new Error(err));","                        }","                    );","                }","            });","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function() {","//                    var treenode = e.node,","//                          selectedfile;","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                    instance.filescrollview.clearSelectedModels(null, true);","/*","                    if (!treenode.canHaveChildren) {","                        // file selected","                        // suppressed for the time being --> we can only use the next methods","                        // when the files are present, which may be 'loading' when directory is just showed up. --> Promises!","                        selectedfile = instance.files.getByFileName(treenode.label);","                        instance.filescrollview.selectModels(selectedfile, true);","                    }","*/","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    Y.bind(instance._selectRootNode, instance, false)","                )","            );","        },","","        _selectRootNode : function(withoutFileLoad) {","            var instance = this;","            instance.initialized().then(","                function() {","                    var tree = instance.tree,","                          rootnode = instance._nodeFilemanTreeRoot;","                    rootnode.set('tabIndex', 0);","                    rootnode.addClass(TREEVIEW_SELECTED_CLASS);","                    rootnode.focus();","                    instance._currentDir = '/';","                    instance._currentDirTreeNode = tree.rootNode;","                    if (!withoutFileLoad) {","                        instance.loadFiles();","                    }","                    YArray.each(","                        tree.getSelectedNodes(),","                        function(treenode) {","                            treenode.unselect();","                        }","                    );","                }","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                instance._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        /**","         * Dynamically creates the next Class-methods:<br />","         * 'loadFiles', 'loadMoreFiles', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'","         *","         * @method _createMethods","         * @private","         * @protected","         * @since 0.1","        */","        _createMethods : function() {","","            var instance = this;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {},","                              filescrollview = instance.filescrollview;","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance._currentDir || '/';","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance._currentDir;","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.newFileName = param1;","                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:","                            param1 = instance._currentDirTreeNode;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance._currentDir;","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:","                            param1 = instance._currentDirTreeNode;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance._currentDir;","                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:","                            param1 = instance._currentDirTreeNode;","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance._currentDir;","                            options.dirName = param1;","                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:","                            param1 = instance._currentDirTreeNode;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance._currentDir;","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance._currentDir;","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            options.destinationDir = param1;","                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:","                            param1 = instance._currentDirTreeNode;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        return instance.readyPromise","                                    .then(","                                        Y.bind(instance.sync, instance, syncaction, options)","                                    )","                                    .then(","                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),","                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)","                                    );","                    };","                }","            );","        },","","        /**","         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).","         *","         * @method _handleSyncError","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSyncError : function(reason, syncaction, options) {","            var instance = this,","                  facade;","","            facade = {","                options: options,","                error: reason,","                src: syncaction","            };","            instance.fire(EVT_ERROR, facade);","            return reason;","       },","","        /**","         * Method that handles the sync-response returned from the server.","         *","         * @method _handleSync","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @param param1 {Any} The first parameter that was passed into the sync-action","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSync : function(response, syncaction, options, param1) {","            var instance = this,","                  parsedResponse = PARSE(response),","                  err = parsedResponse.error,","                  tree = instance.tree,","                  showTreefiles = instance.get('showTreefiles'),","                  files = instance.files,","                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;","","            if (err) {","                return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);","            }","            else {","                facade = {","                    response: response,","                    options: options","                };","                // Lazy publish.","                if (!instance['_'+syncaction]) {","                    instance['_'+syncaction] = instance.publish(syncaction, {","                        preventable: false","                    });","                }","                // now we need process the response","                if (syncaction === 'loadFiles') {","                    instance.files.reset(parsedResponse);","                }","//                else if (syncaction === 'loadAppendFiles') {","                    // ....","//                }","                else if (syncaction === 'loadTreeLazy') {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(param1, parsedResponse);","                }","                else if (syncaction === 'renameFiles') {","                    // should return an array with objects with the fields:","                    // {","                    //     filename: 'prev_filename.ext',","                    //     newfilename: 'new_filename.ext',","                    //     modified: 'modified datetimestring'","                    // }","                    createdFiles = parsedResponse.results;","                    if (createdFiles && createdFiles.length>0) {","                        fileDirectoryNode = param1;","                        YArray.each(","                            createdFiles,","                            function(changedFileObject) {","                                var previousFilename = changedFileObject.prevfilename,","                                      newFilename = changedFileObject.filename,","                                      modified = changedFileObject.modified,","                                      thumbnail = changedFileObject.thumbnail,","                                      preview = changedFileObject.preview;","                                if (showTreefiles && fileDirectoryNode) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);","                                    changedTreeNode.label = newFilename;","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(previousFilename);","                                if (modified) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'modified', modified, {silent: true});","                                }","                                if (thumbnail) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});","                                }","                                if (preview) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'preview', preview, {silent: true});","                                }","                                files.setModelAttr(fileobject, 'filename', newFilename);","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'renameDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    changedTreeNode.label = options.newDirName;","                    changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                    instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';","                }","                else if (syncaction === 'deleteFiles') {","                    // should return an array with filenames that are deleted","                    deletedFiles = parsedResponse.results;","                    if (deletedFiles && deletedFiles.length>0) {","                        fileDirectoryNode = param1;","                        YArray.each(","                            deletedFiles,","                            function(deletedFilename) {","                                if (showTreefiles && fileDirectoryNode && tree.directoryIsLoaded(fileDirectoryNode)) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);","                                    tree.removeNode(changedTreeNode, {remove: true, silent: false});","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(deletedFilename);","                                filemodel = files.revive(fileobject);","                                // no need to call the synclayer --> the file is already removed from the server","                                filemodel.destroy({remove: false});","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'deleteDir') {","                    changedTreeNode = param1;","                    parentnode = changedTreeNode.parent;","                    tree.removeNode(changedTreeNode, {destroy: true});","                    // now select its parentnode","                    if (parentnode === tree.rootNode) {","                        instance._selectRootNode();","                    }","                    else {","                        tree.selectNode(parentnode);","                    }","                }","                else if (syncaction === 'createDir') {","                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted","                    // Opening the treenode would load all subdirs and leads to double reference","                    changedTreeNode = param1;","                    if (tree.directoryIsLoaded(changedTreeNode)) {","                        dirName = parsedResponse.results; // the directoryname that was created on the server .","                                                                                 // this can be different from the requested dirname.","                        tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});","                    }","                    // always open the node to let the new directory be shown","                    tree.openNode(changedTreeNode);","                }","//                else if (syncaction === 'moveDir') {","                    // ....","//                }","//                else if (syncaction === 'moveFiles') {","                    // ....","//                }","//                else if (syncaction === 'cloneDir') {","                    // ....","//                }","                else if (syncaction === 'copyFiles') {","                    createdFiles = parsedResponse.results; // array with fileobjects","                    instance.files.add(createdFiles);","//                    changedTreeNode = instance._currentDirTreeNode;","                    changedTreeNode = param1;","                    if (showTreefiles) {","                        // now add the files to the tree","                        YArray.each(","                            createdFiles,","                            function(fileobject) {","                                tree.insertNode(changedTreeNode, {label: fileobject.filename});","                            }","                        );","                    }","                }","                // end of processing, now fire event","                instance.fire(syncaction, facade);","                return response;","            }","        },","","","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance._currentDirTreeNode = treenode;","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function() {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanTree) {","                        instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanTree && (this._nodeFilemanTree.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanFlow) {","                        instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanFlow && (this._nodeFilemanFlow.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._panelFT) {","                        instance._panelFT.setStyle('display', (val ? '' : 'none'));","                        instance._correctHeightAfterResize();","                    }","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            },","","            uploaderEnabled: {","                value: true","            },","","            uploaderErrorAction: {","                value: Y.Uploader.Queue.CONTINUE","            },","","            uploaderFileFieldName: {","                value: 'filedata'","            },","","            uploaderPostVars: {","                value: {}","            },","","            uploadHeaders: {","                value: {}","            },","","            uploadURL: {","                value: null","            },","","            // the absolute url to the swf-file, without a timestamp (this Module always adds a timestamp internally)","            swfURL: {","                value: 'http://yui.yahooapis.com/3.10.3/build/uploader/assets/flashuploader.swf'","            },","","            withHTML5Credentials: {","                value: false","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"event\",","        \"event-custom\",","        \"event-touch\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json\",","        \"uploader\",","        \"tree-lazy\",","        \"gallery-sm-treeview\",","        \"gallery-sm-treeview-sortable\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"109":0,"113":0,"114":0,"115":0,"117":0,"122":0,"125":0,"247":0,"248":0,"251":0,"252":0,"255":0,"256":0,"259":0,"260":0,"261":0,"263":0,"267":0,"270":0,"273":0,"274":0,"277":0,"278":0,"280":0,"283":0,"286":0,"287":0,"292":0,"294":0,"296":0,"298":0,"299":0,"301":0,"304":0,"309":0,"319":0,"324":0,"325":0,"327":0,"328":0,"329":0,"330":0,"331":0,"332":0,"333":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"343":0,"345":0,"347":0,"351":0,"353":0,"354":0,"356":0,"357":0,"358":0,"362":0,"372":0,"379":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"386":0,"394":0,"404":0,"413":0,"423":0,"432":0,"441":0,"442":0,"444":0,"448":0,"480":0,"484":0,"488":0,"491":0,"494":0,"497":0,"507":0,"517":0,"527":0,"537":0,"727":0,"728":0,"740":0,"742":0,"743":0,"745":0,"746":0,"747":0,"748":0,"763":0,"764":0,"766":0,"768":0,"769":0,"770":0,"771":0,"772":0,"776":0,"777":0,"781":0,"787":0,"789":0,"798":0,"801":0,"802":0,"805":0,"826":0,"830":0,"831":0,"833":0,"834":0,"835":0,"837":0,"838":0,"851":0,"856":0,"857":0,"858":0,"859":0,"860":0,"861":0,"862":0,"863":0,"864":0,"865":0,"867":0,"868":0,"869":0,"870":0,"872":0,"873":0,"880":0,"884":0,"885":0,"891":0,"893":0,"895":0,"897":0,"899":0,"920":0,"924":0,"925":0,"926":0,"928":0,"930":0,"939":0,"940":0,"944":0,"949":0,"956":0,"959":0,"960":0,"962":0,"963":0,"964":0,"965":0,"966":0,"968":0,"969":0,"970":0,"971":0,"972":0,"976":0,"977":0,"978":0,"989":0,"998":0,"1005":0,"1008":0,"1010":0,"1011":0,"1013":0,"1017":0,"1018":0,"1019":0,"1021":0,"1022":0,"1025":0,"1028":0,"1029":0,"1030":0,"1038":0,"1045":0,"1048":0,"1051":0,"1054":0,"1055":0,"1056":0,"1057":0,"1062":0,"1065":0,"1068":0,"1069":0,"1070":0,"1071":0,"1077":0,"1080":0,"1083":0,"1084":0,"1085":0,"1086":0,"1091":0,"1094":0,"1097":0,"1098":0,"1102":0,"1105":0,"1108":0,"1109":0,"1112":0,"1115":0,"1118":0,"1119":0,"1122":0,"1125":0,"1129":0,"1130":0,"1131":0,"1135":0,"1136":0,"1138":0,"1139":0,"1142":0,"1147":0,"1151":0,"1163":0,"1168":0,"1169":0,"1170":0,"1175":0,"1176":0,"1178":0,"1179":0,"1181":0,"1183":0,"1184":0,"1185":0,"1210":0,"1211":0,"1213":0,"1214":0,"1215":0,"1216":0,"1218":0,"1219":0,"1221":0,"1222":0,"1230":0,"1231":0,"1234":0,"1235":0,"1241":0,"1242":0,"1245":0,"1246":0,"1247":0,"1251":0,"1252":0,"1253":0,"1254":0,"1256":0,"1258":0,"1262":0,"1263":0,"1264":0,"1266":0,"1272":0,"1273":0,"1274":0,"1275":0,"1276":0,"1287":0,"1292":0,"1293":0,"1294":0,"1297":0,"1298":0,"1301":0,"1302":0,"1305":0,"1306":0,"1307":0,"1308":0,"1309":0,"1313":0,"1314":0,"1316":0,"1317":0,"1321":0,"1323":0,"1326":0,"1327":0,"1329":0,"1330":0,"1331":0,"1345":0,"1353":0,"1358":0,"1359":0,"1360":0,"1362":0,"1365":0,"1369":0,"1373":0,"1376":0,"1384":0,"1389":0,"1390":0,"1391":0,"1407":0,"1416":0,"1417":0,"1419":0,"1421":0,"1422":0,"1423":0,"1424":0,"1425":0,"1426":0,"1427":0,"1429":0,"1432":0,"1449":0,"1451":0,"1452":0,"1466":0,"1467":0,"1483":0,"1484":0,"1486":0,"1487":0,"1501":0,"1502":0,"1505":0,"1518":0,"1526":0,"1527":0,"1528":0,"1544":0,"1545":0,"1549":0,"1550":0,"1555":0,"1556":0,"1559":0,"1560":0,"1562":0,"1563":0,"1564":0,"1565":0,"1566":0,"1568":0,"1569":0,"1570":0,"1572":0,"1573":0,"1574":0,"1575":0,"1576":0,"1578":0,"1580":0,"1582":0,"1583":0,"1584":0,"1586":0,"1587":0,"1588":0,"1590":0,"1592":0,"1594":0,"1595":0,"1597":0,"1599":0,"1600":0,"1601":0,"1603":0,"1605":0,"1606":0,"1607":0,"1609":0,"1610":0,"1611":0,"1612":0,"1613":0,"1615":0,"1616":0,"1617":0,"1619":0,"1620":0,"1621":0,"1622":0,"1624":0,"1626":0,"1628":0,"1653":0,"1656":0,"1661":0,"1662":0,"1678":0,"1686":0,"1687":0,"1690":0,"1695":0,"1696":0,"1701":0,"1702":0,"1707":0,"1708":0,"1709":0,"1711":0,"1713":0,"1720":0,"1721":0,"1722":0,"1723":0,"1726":0,"1731":0,"1732":0,"1733":0,"1736":0,"1737":0,"1739":0,"1741":0,"1743":0,"1745":0,"1747":0,"1749":0,"1752":0,"1753":0,"1757":0,"1758":0,"1759":0,"1760":0,"1761":0,"1763":0,"1765":0,"1766":0,"1767":0,"1768":0,"1771":0,"1772":0,"1773":0,"1776":0,"1777":0,"1779":0,"1782":0,"1783":0,"1787":0,"1788":0,"1789":0,"1790":0,"1792":0,"1793":0,"1796":0,"1799":0,"1802":0,"1803":0,"1804":0,"1806":0,"1809":0,"1820":0,"1821":0,"1822":0,"1824":0,"1825":0,"1827":0,"1830":0,"1836":0,"1837":0,"1852":0,"1855":0,"1856":0,"1857":0,"1858":0,"1871":0,"1874":0,"1875":0,"1876":0,"1877":0,"1891":0,"1892":0,"1897":0,"1911":0,"1912":0,"1917":0,"1930":0,"1931":0,"1933":0,"1934":0,"1945":0,"1946":0,"1947":0,"1949":0,"1950":0,"1952":0,"1954":0,"1955":0,"1956":0,"1958":0,"1988":0,"1994":0,"1996":0,"1997":0,"1998":0,"1999":0,"2002":0,"2017":0,"2024":0,"2025":0,"2026":0,"2027":0,"2028":0,"2029":0,"2030":0,"2032":0,"2045":0,"2050":0,"2051":0,"2052":0,"2054":0,"2057":0,"2058":0,"2060":0,"2066":0,"2067":0,"2068":0,"2070":0,"2073":0,"2074":0,"2076":0,"2093":0,"2095":0,"2096":0,"2097":0,"2098":0,"2116":0,"2131":0,"2134":0,"2150":0,"2164":0,"2167":0,"2168":0,"2169":0,"2170":0,"2171":0,"2173":0,"2177":0,"2191":0,"2194":0,"2195":0,"2196":0,"2197":0,"2198":0,"2200":0,"2204":0,"2218":0,"2233":0,"2248":0,"2263":0,"2266":0,"2267":0,"2268":0,"2283":0,"2286":0,"2287":0,"2288":0,"2303":0,"2306":0,"2307":0,"2308":0,"2323":0,"2326":0,"2327":0,"2328":0,"2343":0,"2346":0,"2365":0,"2384":0,"2398":0,"2401":0,"2402":0,"2403":0,"2404":0,"2420":0,"2423":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:108":0,"PARSE:112":0,"extractFileExtension:247":0,"isFileType:251":0,"getTreeInfo:255":0,"sortComparator:268":0,"(anonymous 2):276":0,"getByFileName:272":0,"directoryIsLoaded:285":0,"(anonymous 3):297":0,"getByFileName:293":0,"initializer:318":0,"(anonymous 4):355":0,"initialized:350":0,"(anonymous 5):447":0,"bindUI:371":0,"getCurrentDir:479":0,"getCurrentDirTreeNode:483":0,"(anonymous 6):493":0,"getSelectedFiles:487":0,"hideFlow:506":0,"hideTree:516":0,"showFlow:526":0,"showTree:536":0,"(anonymous 7):727":0,"sync:726":0,"destructor:739":0,"(anonymous 10):770":0,"(anonymous 9):767":0,"(anonymous 8):765":0,"(anonymous 11):788":0,"(anonymous 13):804":0,"(anonymous 12):799":0,"_createPromises:762":0,"_allWidgetsRenderedPromise:825":0,"(anonymous 14):883":0,"_afterRender:850":0,"comparator:925":0,"_renderFiles:919":0,"(anonymous 15):958":0,"_renderViewSelect:943":0,"(anonymous 17):1015":0,"(anonymous 16):1007":0,"(anonymous 19):1061":0,"(anonymous 20):1076":0,"(anonymous 21):1090":0,"(anonymous 22):1101":0,"(anonymous 23):1111":0,"(anonymous 24):1121":0,"(anonymous 18):1047":0,"(anonymous 26):1141":0,"(anonymous 25):1137":0,"_renderToolbar:988":0,"(anonymous 28):1219":0,"(anonymous 27):1210":0,"(anonymous 29):1234":0,"(anonymous 30):1251":0,"(anonymous 32):1270":0,"(anonymous 31):1265":0,"_createUploader:1162":0,"parseFlashVersion:1292":0,"_redetectFlash:1286":0,"(anonymous 33):1370":0,"(anonymous 34):1375":0,"load:1368":0,"(anonymous 35):1386":0,"_renderTree:1344":0,"(anonymous 37):1431":0,"(anonymous 36):1418":0,"_selectRootNode:1415":0,"_checkEndResizeApprovement:1448":0,"_checkResizeAprovement:1465":0,"(anonymous 38):1504":0,"_clearEventhandlers:1499":0,"_correctHeightAfterResize:1517":0,"]:1549":0,"(anonymous 39):1548":0,"_createMethods:1542":0,"_handleSyncError:1652":0,"(anonymous 40):1725":0,"(anonymous 41):1770":0,"(anonymous 42):1829":0,"_handleSync:1677":0,"_endResizeApprovement:1851":0,"_loadFilePane:1869":0,"_resizeTree:1890":0,"_resizeFlow:1910":0,"_setConstraints:1929":0,"_setSizeFlowArea:1987":0,"_setSizeTreeArea:2016":0,"_startResize:2044":0,"_stopResize:2092":0,"validator:2115":0,"validator:2130":0,"setter:2133":0,"validator:2149":0,"validator:2163":0,"setter:2166":0,"getter:2176":0,"validator:2190":0,"setter:2193":0,"getter:2203":0,"validator:2217":0,"validator:2232":0,"validator:2247":0,"validator:2262":0,"setter:2265":0,"validator:2282":0,"setter:2285":0,"validator:2302":0,"setter:2305":0,"validator:2322":0,"setter:2325":0,"validator:2342":0,"setter:2345":0,"validator:2364":0,"validator:2383":0,"validator:2397":0,"setter:2400":0,"validator:2419":0,"setter:2422":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 597;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 122;
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1);
YUI.add('gallery-itsafilemanager', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 3);
'use strict';

/**
 * ITSAFileManager
 *
 *
 * Panel-widget for uplaoding and controlling files and folders
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
    LABEL_UPLOAD_FILES = 'upload files',
    PROCESS_ERROR = 'An error occured during processing',
    FILTERITEMS = [
        {text: 'all files', returnValue: '*'},
        {text: 'images', returnValue: 'jpg,jpeg,gif,bmp,tif,tiff,png'},
        {text: 'non-images', returnValue: '!,jpg,jpeg,gif,bmp,tif,tiff,png'},
        {text: 'txt', returnValue: 'txt'},
        {text: 'word', returnValue: 'doc,docx'},
        {text: 'excel', returnValue: 'xls,xlsx'},
        {text: 'powerpoint', returnValue: 'ppt,pptx'},
        {text: 'pdf', returnValue: 'pdf'}
    ],
    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],
    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],
    THUMBNAIL_TEMPLATE = '<% if (data.filename.isFileType(["jpg","jpeg","gif","bmp","tif","tiff","png"])) { %><img src="<%= data.thumbnail %>" />' +
                                             '<% } else { %>' +
                                                 '<div class="itsa-thumbnail">' +
                                                     '<div class="itsa-fileicon <%= data.filename.extractFileExtension() %>"></div>' +
                                                     '<span class="file-label"><%= data.filename %></span>' +
                                                 '</div>' +
                                             '<% } %>',
    LIST_TEMPLATE = '<td><%= data.filename %></td>' +
                                 '<td><%= data.size %></td>' +
                                 '<% if (data.width && data.height && (data.width>0) && (data.height>0)) { %>' +
                                     '<td><%= data.modified %></td>' +
                                     '<td><%= data.width %>x<%= data.height %></td>' +
                                 '<% } else { %>' +
                                     '<td colspan=2><%= data.modified %></td>' +
                                 '<% } %>',
    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',
    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',
    EMPTY_DIVNODE = '<div></div>',
    EMPTY_BUTTONNODE = '<button class="pure-button pure-button-toolbar" type="button">{text}</button>',
    INSTALL_FLASH_NODE = '<button class="pure-button pure-button-toolbar" type="button">{text}</button>',
    EMPTY_FILEUPLOADNODE = '<div class="pure-button pure-uploadbutton"></div>',
    FILEMAN_TITLE = 'Filemanager',
    FILEMAN_FOOTERTEMPLATE = "ready",
    FILEMANCLASSNAME = 'yui3-itsafilemanager',
    HIDDEN_CLASS = FILEMANCLASSNAME + '-hidden',
    EXTEND_LOADING_CLASS = FILEMANCLASSNAME + '-extendloading',
    FILEMAN_LIST_TEMPLATE_CLASS = FILEMANCLASSNAME + '-list-files',
    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',
    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',
    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',
    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',
    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',
    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',
    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',
    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',
    FILEMAN_DISK_CLASS = FILEMANCLASSNAME + '-disk',
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
                                                "<div class='"+TREEVIEW_ROW_CLASS+"'><div class='"+FILEMAN_DISK_CLASS+"'></div>{root}</div>"+
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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 108);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 109);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 112);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 113);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 114);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 115);
return YJSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 117);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 122);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 125);
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
     * Fired when the synclayer finishes the action 'loadTreeLazy' succesfully.
     * @event loadTreeLazy
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 247);
String.prototype.extractFileExtension = function() {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "extractFileExtension", 247);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 248);
return this.match(/.+\.(\w+)$/)[1];
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 251);
String.prototype.isFileType = function(extentions) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "isFileType", 251);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 255);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 255);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 256);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 261);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 263);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 267);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 268);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 270);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        },
        getByFileName: function(directoryTreeNode, filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 272);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 273);
var foundNode;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 274);
YArray.some(
                directoryTreeNode.children,
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 276);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 277);
if (!node.canHaveChildren && (node.label === filename)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 278);
foundNode = node;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 280);
return foundNode;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 283);
return foundNode;
        },
        directoryIsLoaded : function(treenode) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "directoryIsLoaded", 285);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 286);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 287);
return (treenode.state.loaded || (treenode === instance.rootNode));
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 292);
Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {
        getByFileName: function (filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 293);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 294);
var instance = this,
                  foundModel;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 296);
instance.some(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 297);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 298);
if (model.filename === filename) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 299);
foundModel = model;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 301);
return foundModel;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 304);
return foundModel;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 309);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 318);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 319);
var instance = this,
                  boundingBox = instance.get('boundingBox');

            // because IE<9 throws an focus-error combined with ITSADialog (only inside this module, don't know why),
            // we suppress error-reporting. This appears only in the debugmode
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
if ((IE>0) && (IE<9)) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 325);
Y.ITSAErrorReporter.reportErrorLogs(false);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 327);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 328);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 329);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 330);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 331);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 332);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 333);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 334);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 335);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 336);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 337);
instance._currentDir = '/';
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 338);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 339);
instance.publish(EVT_ERROR, {
                preventable: false,
                broadcast: 1  // --> to make it catchable by itsaerrorreporter
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 343);
instance._createPromises();
            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 345);
boundingBox.addClass(EXTEND_LOADING_CLASS);
            // now call the promise, even if it is not used --> this will do the final settings in the right order.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 347);
instance.initialized();
        },

        initialized : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initialized", 350);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 351);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 353);
if (!instance._isInitialized) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 354);
instance._isInitialized =  (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                    function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 355);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 356);
instance._setConstraints(true);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 357);
instance._correctHeightAfterResize();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 358);
boundingBox.removeClass(EXTEND_LOADING_CLASS);
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 362);
return instance._isInitialized;
        },

        /**
         * Binding eventlisteners.
         *
         * @method bindUI
         * @since 0.1
        */
        bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 371);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 372);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 379);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 380);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 381);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 382);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 383);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 384);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 385);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 386);
instance._panelFT.setStyle('display', 'none');
            }
/*
            instance.publish(EVT_ERROR, {
                preventable: false
            });
*/
            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 394);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 404);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 413);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 423);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 432);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 441);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 442);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 444);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 447);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 448);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );

// when files are selected, the must be selected in the tree as well.
// suppres for the time being, because we need to find a way to prevent 'looping'
// that is: when the tree-files are selected, they will select the files again (by their own event)
/*
            eventhandlers.push(
                instance.after(
                    'itsascrollviewmodellist:modelSelectionChange',
                    function(e) {
                        var selectedfiles = e.originalModelSelection,
                              tree = instance.tree;
                        tree.unselect();
                        YArray.each(
                            selectedfiles,
                            function(fileobject) {
                                var treenode = tree.getByFileName(instance._currentDirTreeNode, fileobject.filename);
                                if (treenode) {
                                    tree.selectNode(treenode, {silent: true});
                                }
                            }
                        );
                    }
                )
            );
*/
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 479);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 480);
return this._currentDir;
        },

        getCurrentDirTreeNode : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDirTreeNode", 483);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 484);
return this._currentDirTreeNode;
        },

        getSelectedFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getSelectedFiles", 487);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 488);
var instance = this,
                  selectedModels = instance.filescrollview.getSelectedModels(),
                  selectedFiles = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 491);
YArray.each(
                selectedModels,
                function(fileobject) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 493);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 494);
selectedFiles.push(fileobject.filename);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 497);
return selectedFiles;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 506);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 507);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 516);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 517);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 526);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 527);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 536);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 537);
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
         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />
         * <b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.
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
         * renames the selected file(s). When multiple files are selected, the server needs to hanlde the right naming.
         * For example by giving the files the same name, followed by '_index'.
         * Is using the internal 'sync'-method to realize the update on the server.
         * See 'sync' how to set up the synclayer.
         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.
         *
         * @method renameFiles
         * @param newFilename {String} new filename for the selected file(s)
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
         * <br />'options.newFileName'  holds the new file-name.
         *
         * @method sync
         * @param action {String} The sync-action to perform.
         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.
        */
        sync: function (/* action, options */) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 726);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 727);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 727);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 728);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 739);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 740);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 742);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 743);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 745);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 746);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 747);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 748);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 762);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 763);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 764);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 765);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 766);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 767);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 768);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 769);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 770);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 770);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 771);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 772);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 776);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 777);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 781);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 787);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 788);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 789);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 798);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 799);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 801);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 802);
instance.readyPromise.then(
                        // do not use Y.batch directly, for the context would be undefined
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 804);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 805);
return Y.batch(
                                instance.loadFiles(),
                                instance.loadTreeLazy()
                            );
                       }
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 825);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 826);
var instance = this,
                  promiseslist = [];

             // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 830);
promiseslist.push(instance._resizeConstrainPromise);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 831);
promiseslist.push(instance.filterSelect.renderPromise());
//            promiseslist.push(instance.viewSelect.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 833);
promiseslist.push(instance.editSelect.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 834);
if (instance.get('uploadURL') && (Y.Uploader.TYPE !== 'none')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 835);
promiseslist.push(instance.uploader.renderPromise());
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 837);
promiseslist.push(instance.filescrollview.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 838);
return Y.batch.apply(Y, promiseslist);

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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 850);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 851);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 856);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 857);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 858);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 859);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 860);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 861);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 862);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 863);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 864);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 865);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 867);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 868);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 869);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 870);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 872);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 873);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 880);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 883);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 884);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 885);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 891);
instance._renderTree();
            // init the value of the current selected tree, but do not load the files
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 893);
instance._selectRootNode(true);
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 895);
instance._renderFiles();
            // now we create dd methods for moving the files:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 897);
instance._createDDFiles();
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 899);
instance._renderToolbar();
        },

        /**
         * Creates drag-drop functionalities to the files, so that they can be dropped into a directory.
         *
         * @method _createDDFiles
         * @private
         * @since 0.1
        */
        _createDDFiles : function() {
        },

        /**
         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.
         *
         * @method _renderFiles
         * @private
         * @since 0.1
        */
        _renderFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 919);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 920);
var instance = this,
                  files, rendermodel, filescrollview;

            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 924);
instance.files = files = new Y.LazyFileModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 925);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 925);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 926);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 928);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 930);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelsSelectable: 'multi',
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 939);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
filescrollview.render();
        },

        _renderViewSelect : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderViewSelect", 943);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 944);
var instance = this,
                  boundingBox = instance.get('boundingBox'),
                  filescrollview = instance.filescrollview,
                  viewSelectNode, viewSelect;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 949);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 956);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 958);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 959);
var selecteditem = e.index;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 960);
switch (selecteditem) {
                        case 0:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 962);
filescrollview.setWithoutRerender('listType', 'table');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 963);
filescrollview.set('modelTemplate', LIST_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 964);
boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 965);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 966);
break;
                        case 1:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 968);
filescrollview.setWithoutRerender('listType', 'ul');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 969);
filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 970);
boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 971);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 972);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 976);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 977);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 978);
viewSelect.render(viewSelectNode);
        },

        /**
         * Renders the widgets and buttons in the toolbar
         *
         * @method _renderToolbar
         * @private
         * @since 0.1
        */
        _renderToolbar : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 988);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 989);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  filescrollview = instance.filescrollview,
                  createDirNode, filterSelect, editSelect, filterSelectNode, editSelectNode,
                  selectedModels, multipleFiles, originalFilename;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 998);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
//                selectionOnButton: false,
                defaultItem: FILTERITEMS[0].text,
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1005);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 1007);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1008);
var posibleExtentions = e.value.split(','),
                          contra = (posibleExtentions[0]==='!');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1010);
if (contra) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1011);
posibleExtentions.splice(0, 1);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1013);
instance.filescrollview.set(
                        'viewFilter',
                        function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 1015);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1017);
var filematch;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1018);
if (posibleExtentions[0]==='*') {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1019);
return true;
                            }
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1021);
filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1022);
return contra ? !filematch : filematch;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1025);
filescrollview.syncUI();
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1028);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1029);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1030);
filterSelect.render(filterSelectNode);

            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!
            // instance._renderViewSelect();

            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1038);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1045);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 1047);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1048);
var selecteditem = e.index,
                          filescrollview = instance.filescrollview,
                          currentName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1051);
switch (selecteditem) {
                        case 0:
                            // duplicate file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1054);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1055);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1056);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1057);
Y.confirm(
                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 1061);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1062);
instance.copyFiles(instance._currentDir);
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1065);
break;
                        case 1:
                            // rename file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1068);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1069);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1070);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1071);
Y.prompt(
                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Enter new filename:',
                                {value: originalFilename})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 1076);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1077);
instance.renameFiles(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1080);
break;
                        case 2:
                            // delete file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1083);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1084);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1085);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1086);
Y.confirm(
                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 1090);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1091);
instance.deleteFiles();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1094);
break;
                        case 3:
                            // clone dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1097);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1098);
Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',
                                            {value: currentName+'-copy'})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 1101);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1102);
instance.cloneDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1105);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1108);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1109);
Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1111);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1112);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1115);
break;
                        case 5:
                            // delete dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1118);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1119);
Y.confirm('Delete directory', 'Are you sure you want to delete \''+currentName+'\'<br />and all of its content?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1121);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1122);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1125);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1129);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1130);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1131);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1135);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1136);
eventhandlers.push(
                createDirNode.on('click', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 25)", 1137);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1138);
var currentName = instance._currentDirTreeNode.label;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1139);
Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})
                    .then(
                        function(response) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 26)", 1141);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1142);
instance.createDir(Y.Escape.html(response.value));
                        }
                    );
                })
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1147);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the upload files button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1151);
instance._createUploader();
        },

        /**
         * Creates the upload-button, either as a Flash, or as HTML5 uploader. If no html5-support and flash is not installed,
         * then the button will ask for Flash to be installed.
         *
         * @method _createUploader
         * @private
         * @since 0.1
        */
        _createUploader : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createUploader", 1162);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1163);
var instance = this,
                  uploadURL = instance.get('uploadURL'),
                  eventhandlers = instance._eventhandlers,
                  createUploadNode, uploaderType, uploader, shadowNode, createInstallFlashNode;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1168);
if (uploadURL) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1169);
uploaderType = Y.Uploader.TYPE;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1170);
if (uploaderType === 'flash') {
                    // because the flashbutton seems not to be disabled (when told to),
                    // we overlay an extra div to prevent clicking on the flash-uploader.
                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,
                    // this feature can be removed (as well as the disabling of the upload-button during upload)
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1175);
shadowNode = Y.Node.create("<div class='block-button'></div>");
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1176);
instance._nodeFilemanToolbar.append(shadowNode);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1178);
if (Y.Uploader.TYPE !== 'none') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1179);
if (instance._installFlashNode) {
                        // remove previous rendered install-flash buttonnode
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1181);
instance._installFlashNode.remove(true);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1183);
createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1184);
instance._nodeFilemanToolbar.append(createUploadNode);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1185);
uploader = instance.uploader = new Y.Uploader({
//                    uploader = instance.uploader = new Y.UploaderFlash({
//                    uploader = instance.uploader = new Y.UploaderHTML5({
                        enabled: instance.get('uploaderEnabled'),
                        errorAction: instance.get('uploaderErrorAction'),
                        fileFieldName: instance.get('uploaderFileFieldName'),
                        uploadHeaders: instance.get('uploadHeaders'),
                        uploadURL: uploadURL,
                        withCredentials: instance.get('withHTML5Credentials'),
                        swfURL: instance.get('swfURL') + '?t=' + Math.random(),
                        width: "80px",
                        height: "25px",
                        appendNewFiles: false,
                        multipleFiles: true,
                        buttonClassNames: {
                            hover: 'pure-button-hover',
                            active: 'pure-button',
                            disabled: 'pure-button-disabled',
                            focus: 'pure-button'
                        },
                        selectButtonLabel: LABEL_UPLOAD_FILES
                    });
//                    if (uploaderType==='html5') {
        //                uploader.set("dragAndDropArea", instance._nodeFilemanItems);
 //                   }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1210);
uploader.after('fileselect', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 27)", 1210);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1211);
var fileList = e.fileList,
                              params = {};
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1213);
if (fileList.length > 0) {
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1214);
if (shadowNode) {
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1215);
shadowNode.addClass('blocked');
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1216);
createUploadNode.addClass('pure-button-disabled');
                           }
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1218);
uploader.set('enabled', false);
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1219);
YArray.each(fileList, function (fileInstance) {
                                // store currentDirTreeNode insode the fileinstance, so we know later win what directory to put the file
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 28)", 1219);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1221);
fileInstance.currentDirTreeNode = instance._currentDirTreeNode;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1222);
params[fileInstance.get('id')] = Y.merge(
                                    instance.get('uploaderPostVars'),
                                    {
                                        currentDir: instance._currentDir,
                                        filename: fileInstance.get("name")
                                    }
                                );
                            });
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1230);
uploader.set('postVarsPerFile', params);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1231);
uploader.uploadAll();
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1234);
uploader.on('uploadcomplete', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 29)", 1234);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1235);
var response = PARSE(e.data),
                              error = response.error,
                              newfileobject = response.results,
                              tree = instance.tree,
                              showTreefiles = instance.get('showTreefiles'),
                              fileDirectoryNode = e.file.currentDirTreeNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1241);
if (error) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1242);
instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1245);
instance.files.add(newfileobject);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1246);
if (showTreefiles && fileDirectoryNode && tree.directoryIsLoaded(fileDirectoryNode)) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1247);
tree.insertNode(fileDirectoryNode, {label: newfileobject.filename});
                            }
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1251);
uploader.on('alluploadscomplete', function () {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 30)", 1251);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1252);
if (shadowNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1253);
shadowNode.removeClass('blocked');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1254);
createUploadNode.removeClass('pure-button-disabled');
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1256);
uploader.set('enabled', true);
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1258);
uploader.render(createUploadNode);
                }
                else {
                    // create the button that will prompt to install flash
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1262);
createInstallFlashNode = instance._installFlashNode = Y.Node.create(Lang.sub(INSTALL_FLASH_NODE, {text: 'x'+LABEL_UPLOAD_FILES}));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1263);
instance._nodeFilemanToolbar.append(createInstallFlashNode);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1264);
eventhandlers.push(
                        createInstallFlashNode.on('click', function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 31)", 1265);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1266);
Y.alert('Flash player',
                                        'The most recent version of Adobe Flash player should be installed if you want to upload files.'+
                                        '<br /><br /><a href="http://get.adobe.com/flashplayer" target="_blank">install flashplayer now</a>')
                            .then(
                                function() {
                                    // check if the flashplayer is indeed installed. If so, then uploader-button can be installed
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 32)", 1270);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1272);
instance._redetectFlash();
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1273);
if (Y.SWFDetect.isFlashVersionAtLeast(10,0,45)) {
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1274);
Y.Uploader = Y.UploaderFlash;
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1275);
Y.Uploader.TYPE = "flash";
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1276);
instance._createUploader();
                                    }
                                }
                            );
                        })
                    );
                }
            }
        },

        _redetectFlash : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_redetectFlash", 1286);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1287);
var version = 0,
                uA = Y.UA,
                sF = "ShockwaveFlash",
                mF, eP, vS, ax6, ax;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1292);
function parseFlashVersion (flashVer) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "parseFlashVersion", 1292);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1293);
if (Lang.isNumber(PARSTEINT(flashVer[0]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1294);
uA.flashMajor = flashVer[0];
                }

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1297);
if (Lang.isNumber(PARSTEINT(flashVer[1]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1298);
uA.flashMinor = flashVer[1];
                }

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1301);
if (Lang.isNumber(PARSTEINT(flashVer[2]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1302);
uA.flashRev = flashVer[2];
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1305);
if (uA.gecko || uA.webkit || uA.opera) {
               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1306);
if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
                  _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1307);
if ((eP = mF.enabledPlugin)) {
                     _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1308);
vS = eP.description.replace(/\s[rd]/g, '.').replace(/[A-Za-z\s]+/g, '').split('.');
                     _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1309);
parseFlashVersion(vS);
                  }
               }
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1313);
if(uA.ie) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1314);
try
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1316);
ax6 = new ActiveXObject(sF + "." + sF + ".6");
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1317);
ax6.AllowScriptAccess = "always";
                }
                catch (e)
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1321);
if(ax6 !== null)
                    {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1323);
version = 6.0;
                    }
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1326);
if (version === 0) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1327);
try
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1329);
ax = new ActiveXObject(sF + "." + sF);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1330);
vS = ax.GetVariable("$version").replace(/[A-Za-z\s]+/g, '').split(',');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1331);
parseFlashVersion(vS);
                } catch (e2) {}
                }
            }}
        },

        /**
         * Renders the tree-view by creating an Y.Tree inside the tree-pane.
         *
         * @method _renderTree
         * @private
         * @since 0.1
        */
        _renderTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 1344);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1345);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1353);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: true,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1358);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1359);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1360);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1362);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // Setup lazyRender's callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1365);
tree.plug(Y.Plugin.Tree.Lazy, {
                // Custom function that Plugin.Tree.Lazy will call when it needs to
                // load the children for a node.
                load: function (node, callback) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 1368);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1369);
instance.loadTreeLazy(node).then(
                        function() {
                            // Call the callback function to tell Plugin.Tree.Lazy that
                            // we're done loading data.
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 33)", 1370);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1373);
callback();
                        },
                        function(err) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 34)", 1375);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1376);
callback(new Error(err));
                        }
                    );
                }
            });
            //============================
            // attach events to treenodes
            //============================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1384);
tree.after(
                'sortableTreeView:select',
                function() {
//                    var treenode = e.node,
//                          selectedfile;
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 35)", 1386);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1389);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1390);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1391);
instance.filescrollview.clearSelectedModels(null, true);
/*
                    if (!treenode.canHaveChildren) {
                        // file selected
                        // suppressed for the time being --> we can only use the next methods
                        // when the files are present, which may be 'loading' when directory is just showed up. --> Promises!
                        selectedfile = instance.files.getByFileName(treenode.label);
                        instance.filescrollview.selectModels(selectedfile, true);
                    }
*/
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1407);
eventhandlers.push(
                rootnode.on(
                    'click',
                    Y.bind(instance._selectRootNode, instance, false)
                )
            );
        },

        _selectRootNode : function(withoutFileLoad) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_selectRootNode", 1415);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1416);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1417);
instance.initialized().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 36)", 1418);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1419);
var tree = instance.tree,
                          rootnode = instance._nodeFilemanTreeRoot;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1421);
rootnode.set('tabIndex', 0);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1422);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1423);
rootnode.focus();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1424);
instance._currentDir = '/';
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1425);
instance._currentDirTreeNode = tree.rootNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1426);
if (!withoutFileLoad) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1427);
instance.loadFiles();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1429);
YArray.each(
                        tree.getSelectedNodes(),
                        function(treenode) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 37)", 1431);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1432);
treenode.unselect();
                        }
                    );
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1448);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1449);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1451);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1452);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1465);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1466);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1467);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1483);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1484);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1486);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1487);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1499);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1501);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1502);
YArray.each(
                instance._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 38)", 1504);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1505);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1517);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1518);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1526);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1527);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1528);
nodeFilemanItems.setStyle('height', newHeightFiles+'px');
            }
        },

        /**
         * Dynamically creates the next Class-methods:<br />
         * 'loadFiles', 'loadMoreFiles', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'
         *
         * @method _createMethods
         * @private
         * @protected
         * @since 0.1
        */
        _createMethods : function() {

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1542);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1544);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1545);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 39)", 1548);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1549);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1549);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1550);
var options = {},
                              filescrollview = instance.filescrollview;
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1555);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1556);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1559);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1560);
options.currentDir = instance._currentDir || '/';
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1562);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1563);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1564);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1565);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1566);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1568);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1569);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1570);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1572);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1573);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1574);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1575);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1576);
options.newFileName = param1;
                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1578);
param1 = instance._currentDirTreeNode;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1580);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1582);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1583);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1584);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1586);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1587);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1588);
options.currentDir = instance._currentDir;
                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1590);
param1 = instance._currentDirTreeNode;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1592);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1594);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1595);
options.currentDir = instance._currentDir;
                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1597);
param1 = instance._currentDirTreeNode;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1599);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1600);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1601);
options.dirName = param1;
                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1603);
param1 = instance._currentDirTreeNode;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1605);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1606);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1607);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1609);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1610);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1611);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1612);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1613);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1615);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1616);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1617);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1619);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1620);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1621);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1622);
options.destinationDir = param1;
                            // change param1 to _currentDirTreeNode, so we have reference to it after the sync:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1624);
param1 = instance._currentDirTreeNode;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1626);
filescrollview.clearSelectedModels(null, true);
                        }}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1628);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSyncError", 1652);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1653);
var instance = this,
                  facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1656);
facade = {
                options: options,
                error: reason,
                src: syncaction
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1661);
instance.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1662);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSync", 1677);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1678);
var instance = this,
                  parsedResponse = PARSE(response),
                  err = parsedResponse.error,
                  tree = instance.tree,
                  showTreefiles = instance.get('showTreefiles'),
                  files = instance.files,
                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1686);
if (err) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1687);
return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1690);
facade = {
                    response: response,
                    options: options
                };
                // Lazy publish.
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1695);
if (!instance['_'+syncaction]) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1696);
instance['_'+syncaction] = instance.publish(syncaction, {
                        preventable: false
                    });
                }
                // now we need process the response
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1701);
if (syncaction === 'loadFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1702);
instance.files.reset(parsedResponse);
                }
//                else if (syncaction === 'loadAppendFiles') {
                    // ....
//                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1707);
if (syncaction === 'loadTreeLazy') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1708);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1709);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1711);
tree.insertNode(param1, parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1713);
if (syncaction === 'renameFiles') {
                    // should return an array with objects with the fields:
                    // {
                    //     filename: 'prev_filename.ext',
                    //     newfilename: 'new_filename.ext',
                    //     modified: 'modified datetimestring'
                    // }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1720);
createdFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1721);
if (createdFiles && createdFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1722);
fileDirectoryNode = param1;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1723);
YArray.each(
                            createdFiles,
                            function(changedFileObject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 40)", 1725);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1726);
var previousFilename = changedFileObject.prevfilename,
                                      newFilename = changedFileObject.filename,
                                      modified = changedFileObject.modified,
                                      thumbnail = changedFileObject.thumbnail,
                                      preview = changedFileObject.preview;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1731);
if (showTreefiles && fileDirectoryNode) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1732);
changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1733);
changedTreeNode.label = newFilename;
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1736);
fileobject = files.getByFileName(previousFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1737);
if (modified) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1739);
files.setModelAttr(fileobject, 'modified', modified, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1741);
if (thumbnail) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1743);
files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1745);
if (preview) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1747);
files.setModelAttr(fileobject, 'preview', preview, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1749);
files.setModelAttr(fileobject, 'filename', newFilename);
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1752);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1753);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1757);
if (syncaction === 'renameDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1758);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1759);
changedTreeNode.label = options.newDirName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1760);
changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1761);
instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1763);
if (syncaction === 'deleteFiles') {
                    // should return an array with filenames that are deleted
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1765);
deletedFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1766);
if (deletedFiles && deletedFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1767);
fileDirectoryNode = param1;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1768);
YArray.each(
                            deletedFiles,
                            function(deletedFilename) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 41)", 1770);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1771);
if (showTreefiles && fileDirectoryNode && tree.directoryIsLoaded(fileDirectoryNode)) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1772);
changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1773);
tree.removeNode(changedTreeNode, {remove: true, silent: false});
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1776);
fileobject = files.getByFileName(deletedFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1777);
filemodel = files.revive(fileobject);
                                // no need to call the synclayer --> the file is already removed from the server
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1779);
filemodel.destroy({remove: false});
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1782);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1783);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1787);
if (syncaction === 'deleteDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1788);
changedTreeNode = param1;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1789);
parentnode = changedTreeNode.parent;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1790);
tree.removeNode(changedTreeNode, {destroy: true});
                    // now select its parentnode
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1792);
if (parentnode === tree.rootNode) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1793);
instance._selectRootNode();
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1796);
tree.selectNode(parentnode);
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1799);
if (syncaction === 'createDir') {
                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted
                    // Opening the treenode would load all subdirs and leads to double reference
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1802);
changedTreeNode = param1;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1803);
if (tree.directoryIsLoaded(changedTreeNode)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1804);
dirName = parsedResponse.results; // the directoryname that was created on the server .
                                                                                 // this can be different from the requested dirname.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1806);
tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});
                    }
                    // always open the node to let the new directory be shown
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1809);
tree.openNode(changedTreeNode);
                }
//                else if (syncaction === 'moveDir') {
                    // ....
//                }
//                else if (syncaction === 'moveFiles') {
                    // ....
//                }
//                else if (syncaction === 'cloneDir') {
                    // ....
//                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1820);
if (syncaction === 'copyFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1821);
createdFiles = parsedResponse.results; // array with fileobjects
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1822);
instance.files.add(createdFiles);
//                    changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1824);
changedTreeNode = param1;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1825);
if (showTreefiles) {
                        // now add the files to the tree
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1827);
YArray.each(
                            createdFiles,
                            function(fileobject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 42)", 1829);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1830);
tree.insertNode(changedTreeNode, {label: fileobject.filename});
                            }
                        );
                    }
                }}}}}}}}
                // end of processing, now fire event
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1836);
instance.fire(syncaction, facade);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1837);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1851);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1852);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1855);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1856);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1857);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1858);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1869);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1871);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1874);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1875);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1876);
instance._currentDirTreeNode = treenode;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1877);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1890);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1891);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1892);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1897);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1910);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1911);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1912);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1917);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1929);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1930);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1931);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1933);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1934);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1945);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1946);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1947);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1949);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1950);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1952);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1954);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1955);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1956);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1958);
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
        _setShowTreefiles : function() {

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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1987);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1988);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1994);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1996);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1997);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1998);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1999);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2002);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 2016);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2017);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2024);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2025);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2026);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2027);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2028);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2029);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2030);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2032);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 2044);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2045);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2050);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2051);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2052);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2054);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2057);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2058);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2060);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2066);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2067);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2068);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2070);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2073);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2074);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2076);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 2092);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2093);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2095);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2096);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2097);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2098);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2115);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2116);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2130);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2131);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2133);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2134);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2149);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2150);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2163);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2164);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2166);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2167);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2168);
if (instance._nodeFilemanTree) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2169);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2170);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2171);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2173);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2176);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2177);
return this._nodeFilemanTree && (this._nodeFilemanTree.getStyle('display')!=='none');
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2190);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2191);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2193);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2194);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2195);
if (instance._nodeFilemanFlow) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2196);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2197);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2198);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2200);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2203);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2204);
return this._nodeFilemanFlow && (this._nodeFilemanFlow.getStyle('display')!=='none');
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2217);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2218);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2232);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2233);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2247);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2248);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2262);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2263);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2265);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2266);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2267);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2268);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2282);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2283);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2285);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2286);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2287);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2288);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2302);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2303);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2305);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2306);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2307);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2308);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2322);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2323);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2325);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2326);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2327);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2328);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2342);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2343);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2345);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2346);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2364);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2365);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2383);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2384);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2397);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2398);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2400);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2401);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2402);
if (instance._panelFT) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2403);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2404);
instance._correctHeightAfterResize();
                    }
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2419);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2420);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2422);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2423);
this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);
                }
            },

            uploaderEnabled: {
                value: true
            },

            uploaderErrorAction: {
                value: Y.Uploader.Queue.CONTINUE
            },

            uploaderFileFieldName: {
                value: 'filedata'
            },

            uploaderPostVars: {
                value: {}
            },

            uploadHeaders: {
                value: {}
            },

            uploadURL: {
                value: null
            },

            // the absolute url to the swf-file, without a timestamp (this Module always adds a timestamp internally)
            swfURL: {
                value: 'http://yui.yahooapis.com/3.10.3/build/uploader/assets/flashuploader.swf'
            },

            withHTML5Credentials: {
                value: false
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
        "uploader",
        "tree-lazy",
        "gallery-sm-treeview",
        "gallery-sm-treeview-sortable",
        "gallery-itsaerrorreporter",
        "gallery-itsadialog",
        "gallery-itsascrollviewmodellist",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsaselectlist"
    ],
    "skinnable": true
});
