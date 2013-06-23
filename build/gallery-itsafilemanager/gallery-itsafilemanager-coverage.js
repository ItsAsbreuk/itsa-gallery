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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uplaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    YJSON = Y.JSON,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    LABEL_UPLOAD_FILES = 'upload files',","    PROCESS_ERROR = 'An error occured during processing',","    FILTERITEMS = [","        {text: 'all files', returnValue: '*'},","        {text: 'images', returnValue: 'jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'non-images', returnValue: '!,jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'txt', returnValue: 'txt'},","        {text: 'word', returnValue: 'doc,docx'},","        {text: 'excel', returnValue: 'xls,xlsx'},","        {text: 'powerpoint', returnValue: 'ppt,pptx'},","        {text: 'pdf', returnValue: 'pdf'}","    ],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<% if (data.filename.isFileType([\"jpg\",\"jpeg\",\"gif\",\"bmp\",\"tif\",\"tiff\",\"png\"])) { %><img src=\"<%= data.thumbnail %>\" />' +","                                             '<% } else { %>' +","                                                 '<div class=\"itsa-thumbnail\">' +","                                                     '<div class=\"itsa-fileicon <%= data.filename.extractFileExtension() %>\"></div>' +","                                                     '<span class=\"file-label\"><%= data.filename %></span>' +","                                                 '</div>' +","                                             '<% } %>',","    LIST_TEMPLATE = '<td><%= data.filename %></td>' +","                                 '<td><%= data.size %></td>' +","                                 '<% if (data.width && data.height && (data.width>0) && (data.height>0)) { %>' +","                                     '<td><%= data.modified %></td>' +","                                     '<td><%= data.width %>x<%= data.height %></td>' +","                                 '<% } else { %>' +","                                     '<td colspan=2><%= data.modified %></td>' +","                                 '<% } %>',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\" type=\"button\">{text}</button>',","    INSTALL_FLASH_NODE = '<button class=\"pure-button pure-button-toolbar\" type=\"button\">{text}</button>',","    EMPTY_FILEUPLOADNODE = '<div class=\"pure-button pure-uploadbutton\"></div>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    HIDDEN_CLASS = FILEMANCLASSNAME + '-hidden',","    EXTEND_LOADING_CLASS = FILEMANCLASSNAME + '-extendloading',","    FILEMAN_LIST_TEMPLATE_CLASS = FILEMANCLASSNAME + '-list-files',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return YJSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","String.prototype.extractFileExtension = function() {","    return this.match(/.+\\.(\\w+)$/)[1];","};","","String.prototype.isFileType = function(extentions) {","    return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);","};","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        },","        getByFileName: function(directoryTreeNode, filename) {","            var foundNode;","            YArray.some(","                directoryTreeNode.children,","                function(node) {","                    if (!node.canHaveChildren && (node.label === filename)) {","                        foundNode = node;","                    }","                    return foundNode;","                }","            );","            return foundNode;","        }","    }",");","","Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {","        getByFileName: function (filename) {","            var instance = this,","                  foundModel;","            instance.some(","                function(model) {","                    if (model.filename === filename) {","                        foundModel = model;","                    }","                    return foundModel;","                }","            );","            return foundModel;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","","            // because IE<9 throws an focus-error combined with ITSADialog (only inside this module, don't know why),","            // we suppress error-reporting. This appears only in the debugmode","            if ((IE>0) && (IE<9)) {","                Y.ITSAErrorReporter.reportErrorLogs(false);","            }","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._busyResize = false;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._currentDir = '/';","            instance._bodyNode = Y.one('body');","            instance.publish(EVT_ERROR, {","                preventable: false,","                broadcast: 1  // --> to make it catchable by itsaerrorreporter","            });","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(EXTEND_LOADING_CLASS);","            // now call the promise, even if it is not used --> this will do the final settings in the right order.","            instance.initialized();","        },","","        initialized : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            if (!instance._isInitialized) {","                instance._isInitialized =  (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                    function() {","                        instance._setConstraints(true);","                        instance._correctHeightAfterResize();","                        boundingBox.removeClass(EXTEND_LOADING_CLASS);","                    }","                );","            }","            return instance._isInitialized;","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","/*","            instance.publish(EVT_ERROR, {","                preventable: false","            });","*/","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        getCurrentDirTreeNode : function() {","            return this._currentDirTreeNode;","        },","","        getSelectedFiles : function() {","            var instance = this,","                  selectedModels = instance.filescrollview.getSelectedModels(),","                  selectedFiles = [];","            YArray.each(","                selectedModels,","                function(fileobject) {","                    selectedFiles.push(fileobject.filename);","                }","            );","            return selectedFiles;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file(s). When multiple files are selected, the server needs to hanlde the right naming.","         * For example by giving the files the same name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFiles","         * @param newFilename {String} new filename for the selected file(s)","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFileName'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise","         *","         * @method _createPromises","         * @private","         * @since 0.1","        */","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        // do not use Y.batch directly, for the context would be undefined","                        function() {","                            return Y.batch(","                                instance.loadFiles(),","                                (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())","                            );","                       }","                    ).then(","                        resolve","                    );","                }","            );","        },","","        /**","         * Promise that resolves when all widgets are finished rendering","         *","         * @method _allWidgetsRenderedPromise","         * @private","         * @return {Y.Promise}","         * @since 0.1","        */","        _allWidgetsRenderedPromise : function() {","            var instance = this,","                  promiseslist = [];","","             // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.","            promiseslist.push(instance._resizeConstrainPromise);","            promiseslist.push(instance.filterSelect.renderPromise());","//            promiseslist.push(instance.viewSelect.renderPromise());","            promiseslist.push(instance.editSelect.renderPromise());","            if (instance.get('uploadURL') && (Y.Uploader.TYPE !== 'none')) {","                promiseslist.push(instance.uploader.renderPromise());","            }","            promiseslist.push(instance.filescrollview.renderPromise());","            return Y.batch.apply(Y, promiseslist);","","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // now we create the directory tree","            instance._renderTree();","            // init the value of the current selected tree, but do not load the files","            instance._selectRootNode(true);","            // now we create the files tree:","            instance._renderFiles();","            // now we create dd methods for moving the files:","            instance._createDDFiles();","            // now we create the toolbar","            instance._renderToolbar();","        },","","        /**","         * Creates drag-drop functionalities to the files, so that they can be dropped into a directory.","         *","         * @method _createDDFiles","         * @private","         * @since 0.1","        */","        _createDDFiles : function() {","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module","            instance.files = files = new Y.LazyFileModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelsSelectable: 'multi',","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        _renderViewSelect : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox'),","                  filescrollview = instance.filescrollview,","                  viewSelectNode, viewSelect;","","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index;","                    switch (selecteditem) {","                        case 0:","                            filescrollview.setWithoutRerender('listType', 'table');","                            filescrollview.set('modelTemplate', LIST_TEMPLATE);","                            boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                        case 1:","                            filescrollview.setWithoutRerender('listType', 'ul');","                            filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);","                            boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                    }","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  filescrollview = instance.filescrollview,","                  createDirNode, filterSelect, editSelect, filterSelectNode, editSelectNode,","                  selectedModels, multipleFiles, originalFilename;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","//                selectionOnButton: false,","                defaultItem: FILTERITEMS[0].text,","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var posibleExtentions = e.value.split(','),","                          contra = (posibleExtentions[0]==='!');","                    if (contra) {","                        posibleExtentions.splice(0, 1);","                    }","                    instance.filescrollview.set(","                        'viewFilter',","                        function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","                            var filematch;","                            if (posibleExtentions[0]==='*') {","                                return true;","                            }","                            filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));","                            return contra ? !filematch : filematch;","                        }","                    );","                    filescrollview.syncUI();","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","","            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!","            // instance._renderViewSelect();","","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index,","                          filescrollview = instance.filescrollview,","                          currentName;","                    switch (selecteditem) {","                        case 0:","                            // duplicate file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')","                            .then(","                                function() {","                                    instance.copyFiles(instance._currentDir);","                                }","                            );","                        break;","                        case 1:","                            // rename file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.prompt(","                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Enter new filename:',","                                {value: originalFilename})","                            .then(","                                function(response) {","                                    instance.renameFiles(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 2:","                            // delete file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')","                            .then(","                                function() {","                                    instance.deleteFiles();","                                }","                            );","                        break;","                        case 3:","                            // clone dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',","                                            {value: currentName+'-copy'})","                            .then(","                                function(response) {","                                    instance.cloneDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 4:","                            // rename dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.confirm('Delete directory', 'Are you sure you want to delete \\''+currentName+'\\'<br />and all of its content?')","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            eventhandlers.push(","                createDirNode.on('click', function() {","                    var currentName = instance._currentDirTreeNode.label;","                    Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})","                    .then(","                        function(response) {","                            instance.createDir(Y.Escape.html(response.value));","                        }","                    );","                })","            );","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the upload files button:","            //=====================","            instance._createUploader();","        },","","        /**","         * Creates the upload-button, either as a Flash, or as HTML5 uploader. If no html5-support and flash is not installed,","         * then the button will ask for Flash to be installed.","         *","         * @method _createUploader","         * @private","         * @since 0.1","        */","        _createUploader : function() {","            var instance = this,","                  uploadURL = instance.get('uploadURL'),","                  eventhandlers = instance._eventhandlers,","                  createUploadNode, uploaderType, uploader, shadowNode, createInstallFlashNode;","","            if (uploadURL) {","                uploaderType = Y.Uploader.TYPE;","                if (uploaderType === 'flash') {","                    // because the flashbutton seems not to be disabled (when told to),","                    // we overlay an extra div to prevent clicking on the flash-uploader.","                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,","                    // this feature can be removed (as well as the disabling of the upload-button during upload)","                    shadowNode = Y.Node.create(\"<div class='block-button'></div>\");","                    instance._nodeFilemanToolbar.append(shadowNode);","                }","                if (Y.Uploader.TYPE !== 'none') {","                    if (instance._installFlashNode) {","                        // remove previous rendered install-flash buttonnode","                        instance._installFlashNode.remove(true);","                    }","                    createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);","                    instance._nodeFilemanToolbar.append(createUploadNode);","                    uploader = instance.uploader = new Y.Uploader({","//                    uploader = instance.uploader = new Y.UploaderFlash({","//                    uploader = instance.uploader = new Y.UploaderHTML5({","                        enabled: instance.get('uploaderEnabled'),","                        errorAction: instance.get('uploaderErrorAction'),","                        fileFieldName: instance.get('uploaderFileFieldName'),","                        uploadHeaders: instance.get('uploadHeaders'),","                        uploadURL: uploadURL,","                        withCredentials: instance.get('withHTML5Credentials'),","                        swfURL: instance.get('swfURL') + '?t=' + Math.random(),","                        width: \"80px\",","                        height: \"25px\",","                        appendNewFiles: false,","                        multipleFiles: true,","                        buttonClassNames: {","                            hover: 'pure-button-hover',","                            active: 'pure-button',","                            disabled: 'pure-button-disabled',","                            focus: 'pure-button'","                        },","                        selectButtonLabel: LABEL_UPLOAD_FILES","                    });","//                    if (uploaderType==='html5') {","        //                uploader.set(\"dragAndDropArea\", instance._nodeFilemanItems);"," //                   }","                    uploader.after('fileselect', function (e) {","                        var fileList = e.fileList,","                              params = {};","                        if (fileList.length > 0) {","                           if (shadowNode) {","                               shadowNode.addClass('blocked');","                               createUploadNode.addClass('pure-button-disabled');","                           }","                           uploader.set('enabled', false);","                           YArray.each(fileList, function (fileInstance) {","                                params[fileInstance.get('id')] = Y.merge(","                                    instance.get('uploaderPostVars'),","                                    {","                                        currentDir: instance._currentDir,","                                        filename: fileInstance.get(\"name\")","                                    }","                                );","                            });","                            uploader.set('postVarsPerFile', params);","                            uploader.uploadAll();","                        }","                    });","                    uploader.on('uploadcomplete', function (e) {","                        var response = PARSE(e.data),","                              error = response.error,","                              newfileobject = response.results;","                        if (error) {","                            instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));","                        }","                        else {","                            instance.files.add(newfileobject);","                        }","                    });","                    uploader.on('alluploadscomplete', function () {","                        if (shadowNode) {","                            shadowNode.removeClass('blocked');","                            createUploadNode.removeClass('pure-button-disabled');","                        }","                        uploader.set('enabled', true);","                    });","                    uploader.render(createUploadNode);","                }","                else {","                    // create the button that will prompt to install flash","                    createInstallFlashNode = instance._installFlashNode = Y.Node.create(Lang.sub(INSTALL_FLASH_NODE, {text: 'x'+LABEL_UPLOAD_FILES}));","                    instance._nodeFilemanToolbar.append(createInstallFlashNode);","                    eventhandlers.push(","                        createInstallFlashNode.on('click', function() {","                            Y.alert('Flash player',","                                        'The most recent version of Adobe Flash player should be installed if you want to upload files.'+","                                        '<br /><br /><a href=\"http://get.adobe.com/flashplayer\" target=\"_blank\">install flashplayer now</a>')","                            .then(","                                function() {","                                    // check if the flashplayer is indeed installed. If so, then uploader-button can be installed","                                    instance._redetectFlash();","                                    if (Y.SWFDetect.isFlashVersionAtLeast(10,0,45)) {","                                        Y.Uploader = Y.UploaderFlash;","                                        Y.Uploader.TYPE = \"flash\";","                                        instance._createUploader();","                                    }","                                }","                            );","                        })","                    );","                }","            }","        },","","        _redetectFlash : function() {","            var version = 0,","                uA = Y.UA,","                sF = \"ShockwaveFlash\",","                mF, eP, vS, ax6, ax;","","            function parseFlashVersion (flashVer) {","                if (Lang.isNumber(PARSTEINT(flashVer[0]))) {","                    uA.flashMajor = flashVer[0];","                }","","                if (Lang.isNumber(PARSTEINT(flashVer[1]))) {","                    uA.flashMinor = flashVer[1];","                }","","                if (Lang.isNumber(PARSTEINT(flashVer[2]))) {","                    uA.flashRev = flashVer[2];","                }","            }","            if (uA.gecko || uA.webkit || uA.opera) {","               if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {","                  if ((eP = mF.enabledPlugin)) {","                     vS = eP.description.replace(/\\s[rd]/g, '.').replace(/[A-Za-z\\s]+/g, '').split('.');","                     parseFlashVersion(vS);","                  }","               }","            }","            else if(uA.ie) {","                try","                {","                    ax6 = new ActiveXObject(sF + \".\" + sF + \".6\");","                    ax6.AllowScriptAccess = \"always\";","                }","                catch (e)","                {","                    if(ax6 !== null)","                    {","                        version = 6.0;","                    }","                }","                if (version === 0) {","                try","                {","                    ax = new ActiveXObject(sF + \".\" + sF);","                    vS = ax.GetVariable(\"$version\").replace(/[A-Za-z\\s]+/g, '').split(',');","                    parseFlashVersion(vS);","                } catch (e2) {}","                }","            }","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree, lazyRender;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function(e) {","                    var treenode = e.node,","                          selectedfile;","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                    instance.filescrollview.clearSelectedModels(null, true);","                    if (!treenode.canHaveChildren) {","                        // file selected","                        selectedfile = instance.files.getByFileName(treenode.label);","                        instance.filescrollview.selectModels(selectedfile, true);","                    }","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    Y.bind(instance._selectRootNode, instance, false)","                )","            );","        },","","        _selectRootNode : function(withoutFileLoad) {","            var instance = this;","            instance.initialized().then(","                function() {","                    var tree = instance.tree,","                          rootnode = instance._nodeFilemanTreeRoot;","                    rootnode.set('tabIndex', 0);","                    rootnode.addClass(TREEVIEW_SELECTED_CLASS);","                    rootnode.focus();","                    instance._currentDir = '/';","                    instance._currentDirTreeNode = tree.rootNode;","                    if (!withoutFileLoad) {","                        instance.loadFiles();","                    }","                    YArray.each(","                        tree.getSelectedNodes(),","                        function(treenode) {","                            treenode.unselect();","                        }","                    );","                }","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                instance._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        /**","         * Dynamically creates the next Class-methods:<br />","         * 'loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'","         *","         * @method _createMethods","         * @private","         * @protected","         * @since 0.1","        */","        _createMethods : function() {","","            var instance = this;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {},","                              filescrollview = instance.filescrollview;","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance._currentDir || '/';","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance._currentDir;","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.newFileName = param1;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance._currentDir;","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance._currentDir;","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance._currentDir;","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance._currentDir;","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance._currentDir;","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            options.destinationDir = param1;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        return instance.readyPromise","                                    .then(","                                        Y.bind(instance.sync, instance, syncaction, options)","                                    )","                                    .then(","                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),","                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)","                                    );","                    };","                }","            );","        },","","        /**","         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).","         *","         * @method _handleSyncError","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSyncError : function(reason, syncaction, options) {","            var instance = this,","                  facade;","","            facade = {","                options: options,","                error: reason,","                src: syncaction","            };","            instance.fire(EVT_ERROR, facade);","            return reason;","       },","","        /**","         * Method that handles the sync-response returned from the server.","         *","         * @method _handleSync","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @param param1 {Any} The first parameter that was passed into the sync-action","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSync : function(response, syncaction, options, param1) {","            var instance = this,","                  parsedResponse = PARSE(response),","                  err = parsedResponse.error,","                  tree = instance.tree,","                  lazyRender = instance.get('lazyRender'),","                  showTreefiles = instance.get('showTreefiles'),","                  files = instance.files,","                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;","","            if (err) {","                return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);","            }","            else {","                facade = {","                    response: response,","                    options: options","                };","                // Lazy publish.","                if (!instance['_'+syncaction]) {","                    instance['_'+syncaction] = instance.publish(syncaction, {","                        preventable: false","                    });","                }","                // now we need process the response","                if (syncaction === 'loadFiles') {","                    instance.files.reset(parsedResponse);","                }","//                else if (syncaction === 'loadAppendFiles') {","                    // ....","//                }","                else if ((syncaction === 'loadTreeLazy') && lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(param1, parsedResponse);","                }","                else if (syncaction === 'renameFiles') {","                    // should return an array with objects with the fields:","                    // {","                    //     filename: 'prev_filename.ext',","                    //     newfilename: 'new_filename.ext',","                    //     modified: 'modified datetimestring'","                    // }","                    createdFiles = parsedResponse.results;","                    if (createdFiles && createdFiles.length>0) {","                        fileDirectoryNode = options._currentDirTreeNode;","                        YArray.each(","                            createdFiles,","                            function(changedFileObject) {","                                var previousFilename = changedFileObject.prevfilename,","                                      newFilename = changedFileObject.filename,","                                      modified = changedFileObject.modified,","                                      thumbnail = changedFileObject.thumbnail,","                                      preview = changedFileObject.preview;","                                if (showTreefiles && fileDirectoryNode) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);","                                    changedTreeNode.label = newFilename;","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(previousFilename);","                                if (modified) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'modified', modified, {silent: true});","                                }","                                if (thumbnail) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});","                                }","                                if (preview) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'preview', preview, {silent: true});","                                }","                                files.setModelAttr(fileobject, 'filename', newFilename);","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'renameDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    changedTreeNode.label = options.newDirName;","                    changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                    instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';","                }","                else if (syncaction === 'deleteFiles') {","                    // should return an array with filenames that are deleted","                    deletedFiles = parsedResponse.results;","                    if (deletedFiles && deletedFiles.length>0) {","                        fileDirectoryNode = options._currentDirTreeNode;","                        YArray.each(","                            deletedFiles,","                            function(deletedFilename) {","                                if (showTreefiles && fileDirectoryNode && fileDirectoryNode.state.loaded) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);","                                    tree.removeNode(changedTreeNode, {remove: true, silent: false});","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(deletedFilename);","                                filemodel = files.revive(fileobject);","                                // no need to call the synclayer --> the file is already removed from the server","                                filemodel.destroy({remove: false});","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'deleteDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    parentnode = changedTreeNode.parent;","                    tree.removeNode(changedTreeNode, {destroy: true});","                    // now select its parentnode","                    if (parentnode === tree.rootNode) {","                        instance._selectRootNode();","                    }","                    else {","                        tree.selectNode(parentnode);","                    }","                }","                else if (syncaction === 'createDir') {","                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted","                    // Opening the treenode would load all subdirs and leads to double reference","                    changedTreeNode = instance._currentDirTreeNode;","                    if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {","                        dirName = parsedResponse.results; // the directoryname that was created on the server .","                                                                                 // this can be different from the requested dirname.","                        tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});","                    }","                    // always open the node to let the new directory be shown","                    tree.openNode(changedTreeNode);","                }","//                else if (syncaction === 'moveDir') {","                    // ....","//                }","//                else if (syncaction === 'moveFiles') {","                    // ....","//                }","//                else if (syncaction === 'cloneDir') {","                    // ....","//                }","                else if (syncaction === 'copyFiles') {","                    createdFiles = parsedResponse.results; // array with fileobjects","                    instance.files.add(createdFiles);","                    changedTreeNode = instance._currentDirTreeNode;","                    if (showTreefiles) {","                        // now add the files to the tree","                        YArray.each(","                            createdFiles,","                            function(fileobject) {","                                tree.insertNode(changedTreeNode, {label: fileobject.filename});","                            }","                        );","                    }","                }","                else if ((syncaction === 'loadTree') && !lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(tree.rootNode, parsedResponse);","                }","                // end of processing, now fire event","                instance.fire(syncaction, facade);","                return response;","            }","        },","","","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance._currentDirTreeNode = treenode;","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function() {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanTree) {","                        instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanTree && (this._nodeFilemanTree.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanFlow) {","                        instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanFlow && (this._nodeFilemanFlow.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._panelFT) {","                        instance._panelFT.setStyle('display', (val ? '' : 'none'));","                        instance._correctHeightAfterResize();","                    }","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            },","","            uploaderEnabled: {","                value: true","            },","","            uploaderErrorAction: {","                value: Y.Uploader.Queue.CONTINUE","            },","","            uploaderFileFieldName: {","                value: 'filedata'","            },","","            uploaderPostVars: {","                value: {}","            },","","            uploadHeaders: {","                value: {}","            },","","            uploadURL: {","                value: null","            },","","            // the absolute url to the swf-file, without a timestamp (this Module always adds a timestamp internally)","            swfURL: {","                value: 'http://yui.yahooapis.com/3.10.3/build/uploader/assets/flashuploader.swf'","            },","","            withHTML5Credentials: {","                value: false","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"event\",","        \"event-custom\",","        \"event-touch\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json\",","        \"uploader\",","        \"gallery-sm-treeview\",","        \"gallery-sm-treeview-sortable\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"108":0,"112":0,"113":0,"114":0,"116":0,"121":0,"124":0,"246":0,"247":0,"250":0,"251":0,"254":0,"255":0,"258":0,"259":0,"260":0,"262":0,"266":0,"269":0,"272":0,"273":0,"276":0,"277":0,"279":0,"282":0,"287":0,"289":0,"291":0,"293":0,"294":0,"296":0,"299":0,"304":0,"314":0,"319":0,"320":0,"322":0,"323":0,"324":0,"325":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"332":0,"333":0,"334":0,"338":0,"340":0,"342":0,"346":0,"348":0,"349":0,"351":0,"352":0,"353":0,"357":0,"367":0,"374":0,"375":0,"376":0,"377":0,"378":0,"379":0,"380":0,"381":0,"389":0,"399":0,"408":0,"418":0,"427":0,"436":0,"437":0,"439":0,"443":0,"450":0,"454":0,"458":0,"461":0,"464":0,"467":0,"477":0,"487":0,"497":0,"507":0,"715":0,"716":0,"728":0,"730":0,"731":0,"733":0,"734":0,"735":0,"736":0,"751":0,"752":0,"754":0,"756":0,"757":0,"758":0,"759":0,"760":0,"764":0,"765":0,"769":0,"775":0,"777":0,"786":0,"789":0,"790":0,"793":0,"814":0,"818":0,"819":0,"821":0,"822":0,"823":0,"825":0,"826":0,"839":0,"844":0,"845":0,"846":0,"847":0,"848":0,"849":0,"850":0,"851":0,"852":0,"853":0,"855":0,"856":0,"857":0,"858":0,"860":0,"861":0,"868":0,"872":0,"873":0,"879":0,"881":0,"883":0,"885":0,"887":0,"908":0,"912":0,"913":0,"914":0,"916":0,"918":0,"927":0,"928":0,"932":0,"937":0,"944":0,"947":0,"948":0,"950":0,"951":0,"952":0,"953":0,"954":0,"956":0,"957":0,"958":0,"959":0,"960":0,"964":0,"965":0,"966":0,"977":0,"986":0,"993":0,"996":0,"998":0,"999":0,"1001":0,"1005":0,"1006":0,"1007":0,"1009":0,"1010":0,"1013":0,"1016":0,"1017":0,"1018":0,"1026":0,"1033":0,"1036":0,"1039":0,"1042":0,"1043":0,"1044":0,"1045":0,"1050":0,"1053":0,"1056":0,"1057":0,"1058":0,"1059":0,"1065":0,"1068":0,"1071":0,"1072":0,"1073":0,"1074":0,"1079":0,"1082":0,"1085":0,"1086":0,"1090":0,"1093":0,"1096":0,"1097":0,"1100":0,"1103":0,"1106":0,"1107":0,"1110":0,"1113":0,"1117":0,"1118":0,"1119":0,"1123":0,"1124":0,"1126":0,"1127":0,"1130":0,"1135":0,"1139":0,"1151":0,"1156":0,"1157":0,"1158":0,"1163":0,"1164":0,"1166":0,"1167":0,"1169":0,"1171":0,"1172":0,"1173":0,"1198":0,"1199":0,"1201":0,"1202":0,"1203":0,"1204":0,"1206":0,"1207":0,"1208":0,"1216":0,"1217":0,"1220":0,"1221":0,"1224":0,"1225":0,"1228":0,"1231":0,"1232":0,"1233":0,"1234":0,"1236":0,"1238":0,"1242":0,"1243":0,"1244":0,"1246":0,"1252":0,"1253":0,"1254":0,"1255":0,"1256":0,"1267":0,"1272":0,"1273":0,"1274":0,"1277":0,"1278":0,"1281":0,"1282":0,"1285":0,"1286":0,"1287":0,"1288":0,"1289":0,"1293":0,"1294":0,"1296":0,"1297":0,"1301":0,"1303":0,"1306":0,"1307":0,"1309":0,"1310":0,"1311":0,"1325":0,"1333":0,"1334":0,"1339":0,"1340":0,"1341":0,"1343":0,"1346":0,"1347":0,"1348":0,"1352":0,"1356":0,"1359":0,"1369":0,"1372":0,"1374":0,"1375":0,"1376":0,"1377":0,"1379":0,"1380":0,"1388":0,"1397":0,"1398":0,"1400":0,"1402":0,"1403":0,"1404":0,"1405":0,"1406":0,"1407":0,"1408":0,"1410":0,"1413":0,"1430":0,"1432":0,"1433":0,"1447":0,"1448":0,"1464":0,"1465":0,"1467":0,"1468":0,"1482":0,"1483":0,"1486":0,"1499":0,"1507":0,"1508":0,"1509":0,"1525":0,"1526":0,"1530":0,"1531":0,"1536":0,"1537":0,"1540":0,"1541":0,"1543":0,"1544":0,"1545":0,"1546":0,"1547":0,"1549":0,"1550":0,"1552":0,"1553":0,"1554":0,"1556":0,"1557":0,"1558":0,"1559":0,"1560":0,"1562":0,"1564":0,"1565":0,"1566":0,"1568":0,"1569":0,"1570":0,"1571":0,"1573":0,"1575":0,"1576":0,"1578":0,"1579":0,"1580":0,"1582":0,"1583":0,"1584":0,"1586":0,"1587":0,"1588":0,"1589":0,"1590":0,"1592":0,"1593":0,"1594":0,"1596":0,"1597":0,"1598":0,"1599":0,"1601":0,"1603":0,"1628":0,"1631":0,"1636":0,"1637":0,"1653":0,"1662":0,"1663":0,"1666":0,"1671":0,"1672":0,"1677":0,"1678":0,"1683":0,"1684":0,"1685":0,"1687":0,"1689":0,"1696":0,"1697":0,"1698":0,"1699":0,"1702":0,"1707":0,"1708":0,"1709":0,"1712":0,"1713":0,"1715":0,"1717":0,"1719":0,"1721":0,"1723":0,"1725":0,"1728":0,"1729":0,"1733":0,"1734":0,"1735":0,"1736":0,"1737":0,"1739":0,"1741":0,"1742":0,"1743":0,"1744":0,"1747":0,"1748":0,"1749":0,"1752":0,"1753":0,"1755":0,"1758":0,"1759":0,"1763":0,"1764":0,"1765":0,"1766":0,"1768":0,"1769":0,"1772":0,"1775":0,"1778":0,"1779":0,"1780":0,"1782":0,"1785":0,"1796":0,"1797":0,"1798":0,"1799":0,"1800":0,"1802":0,"1805":0,"1810":0,"1811":0,"1812":0,"1814":0,"1817":0,"1818":0,"1833":0,"1836":0,"1837":0,"1838":0,"1839":0,"1852":0,"1855":0,"1856":0,"1857":0,"1858":0,"1872":0,"1873":0,"1878":0,"1892":0,"1893":0,"1898":0,"1911":0,"1912":0,"1914":0,"1915":0,"1926":0,"1927":0,"1928":0,"1930":0,"1931":0,"1933":0,"1935":0,"1936":0,"1937":0,"1939":0,"1969":0,"1975":0,"1977":0,"1978":0,"1979":0,"1980":0,"1983":0,"1998":0,"2005":0,"2006":0,"2007":0,"2008":0,"2009":0,"2010":0,"2011":0,"2013":0,"2026":0,"2031":0,"2032":0,"2033":0,"2035":0,"2038":0,"2039":0,"2041":0,"2047":0,"2048":0,"2049":0,"2051":0,"2054":0,"2055":0,"2057":0,"2074":0,"2076":0,"2077":0,"2078":0,"2079":0,"2097":0,"2112":0,"2115":0,"2131":0,"2145":0,"2148":0,"2149":0,"2150":0,"2151":0,"2152":0,"2154":0,"2158":0,"2172":0,"2175":0,"2176":0,"2177":0,"2178":0,"2179":0,"2181":0,"2185":0,"2207":0,"2221":0,"2236":0,"2251":0,"2266":0,"2269":0,"2270":0,"2271":0,"2286":0,"2289":0,"2290":0,"2291":0,"2306":0,"2309":0,"2310":0,"2311":0,"2326":0,"2329":0,"2330":0,"2331":0,"2346":0,"2349":0,"2368":0,"2387":0,"2401":0,"2404":0,"2405":0,"2406":0,"2407":0,"2423":0,"2426":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:107":0,"PARSE:111":0,"extractFileExtension:246":0,"isFileType:250":0,"getTreeInfo:254":0,"sortComparator:267":0,"(anonymous 2):275":0,"getByFileName:271":0,"(anonymous 3):292":0,"getByFileName:288":0,"initializer:313":0,"(anonymous 4):350":0,"initialized:345":0,"(anonymous 5):442":0,"bindUI:366":0,"getCurrentDir:449":0,"getCurrentDirTreeNode:453":0,"(anonymous 6):463":0,"getSelectedFiles:457":0,"hideFlow:476":0,"hideTree:486":0,"showFlow:496":0,"showTree:506":0,"(anonymous 7):715":0,"sync:714":0,"destructor:727":0,"(anonymous 10):758":0,"(anonymous 9):755":0,"(anonymous 8):753":0,"(anonymous 11):776":0,"(anonymous 13):792":0,"(anonymous 12):787":0,"_createPromises:750":0,"_allWidgetsRenderedPromise:813":0,"(anonymous 14):871":0,"_afterRender:838":0,"comparator:913":0,"_renderFiles:907":0,"(anonymous 15):946":0,"_renderViewSelect:931":0,"(anonymous 17):1003":0,"(anonymous 16):995":0,"(anonymous 19):1049":0,"(anonymous 20):1064":0,"(anonymous 21):1078":0,"(anonymous 22):1089":0,"(anonymous 23):1099":0,"(anonymous 24):1109":0,"(anonymous 18):1035":0,"(anonymous 26):1129":0,"(anonymous 25):1125":0,"_renderToolbar:976":0,"(anonymous 28):1207":0,"(anonymous 27):1198":0,"(anonymous 29):1220":0,"(anonymous 30):1231":0,"(anonymous 32):1250":0,"(anonymous 31):1245":0,"_createUploader:1150":0,"parseFlashVersion:1272":0,"_redetectFlash:1266":0,"(anonymous 34):1353":0,"(anonymous 35):1358":0,"load:1351":0,"(anonymous 33):1347":0,"(anonymous 36):1371":0,"_renderTree:1324":0,"(anonymous 38):1412":0,"(anonymous 37):1399":0,"_selectRootNode:1396":0,"_checkEndResizeApprovement:1429":0,"_checkResizeAprovement:1446":0,"(anonymous 39):1485":0,"_clearEventhandlers:1480":0,"_correctHeightAfterResize:1498":0,"]:1530":0,"(anonymous 40):1529":0,"_createMethods:1523":0,"_handleSyncError:1627":0,"(anonymous 41):1701":0,"(anonymous 42):1746":0,"(anonymous 43):1804":0,"_handleSync:1652":0,"_endResizeApprovement:1832":0,"_loadFilePane:1850":0,"_resizeTree:1871":0,"_resizeFlow:1891":0,"_setConstraints:1910":0,"_setSizeFlowArea:1968":0,"_setSizeTreeArea:1997":0,"_startResize:2025":0,"_stopResize:2073":0,"validator:2096":0,"validator:2111":0,"setter:2114":0,"validator:2130":0,"validator:2144":0,"setter:2147":0,"getter:2157":0,"validator:2171":0,"setter:2174":0,"getter:2184":0,"validator:2206":0,"validator:2220":0,"validator:2235":0,"validator:2250":0,"validator:2265":0,"setter:2268":0,"validator:2285":0,"setter:2288":0,"validator:2305":0,"setter:2308":0,"validator:2325":0,"setter:2328":0,"validator:2345":0,"setter:2348":0,"validator:2367":0,"validator:2386":0,"validator:2400":0,"setter:2403":0,"validator:2422":0,"setter:2425":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 602;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 123;
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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 107);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 108);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 111);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 112);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 113);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 114);
return YJSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 116);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 121);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 124);
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 246);
String.prototype.extractFileExtension = function() {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "extractFileExtension", 246);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 247);
return this.match(/.+\.(\w+)$/)[1];
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 250);
String.prototype.isFileType = function(extentions) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "isFileType", 250);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 251);
return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 254);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 254);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 255);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 258);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 266);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 267);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 269);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        },
        getByFileName: function(directoryTreeNode, filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 271);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 272);
var foundNode;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 273);
YArray.some(
                directoryTreeNode.children,
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 275);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 276);
if (!node.canHaveChildren && (node.label === filename)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 277);
foundNode = node;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 279);
return foundNode;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 282);
return foundNode;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 287);
Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {
        getByFileName: function (filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 288);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 289);
var instance = this,
                  foundModel;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 291);
instance.some(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 292);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 293);
if (model.filename === filename) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 294);
foundModel = model;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 296);
return foundModel;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 299);
return foundModel;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 304);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 313);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 314);
var instance = this,
                  boundingBox = instance.get('boundingBox');

            // because IE<9 throws an focus-error combined with ITSADialog (only inside this module, don't know why),
            // we suppress error-reporting. This appears only in the debugmode
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 319);
if ((IE>0) && (IE<9)) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 320);
Y.ITSAErrorReporter.reportErrorLogs(false);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 322);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 323);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 325);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 326);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 327);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 328);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 329);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 330);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 331);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 332);
instance._currentDir = '/';
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 333);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 334);
instance.publish(EVT_ERROR, {
                preventable: false,
                broadcast: 1  // --> to make it catchable by itsaerrorreporter
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 338);
instance._createPromises();
            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 340);
boundingBox.addClass(EXTEND_LOADING_CLASS);
            // now call the promise, even if it is not used --> this will do the final settings in the right order.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 342);
instance.initialized();
        },

        initialized : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initialized", 345);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 346);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 348);
if (!instance._isInitialized) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 349);
instance._isInitialized =  (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                    function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 350);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 351);
instance._setConstraints(true);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 352);
instance._correctHeightAfterResize();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 353);
boundingBox.removeClass(EXTEND_LOADING_CLASS);
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 357);
return instance._isInitialized;
        },

        /**
         * Binding eventlisteners.
         *
         * @method bindUI
         * @since 0.1
        */
        bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 366);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 367);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 374);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 375);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 376);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 377);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 378);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 379);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 380);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 381);
instance._panelFT.setStyle('display', 'none');
            }
/*
            instance.publish(EVT_ERROR, {
                preventable: false
            });
*/
            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 389);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 399);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 408);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 418);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 427);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 436);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 437);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 439);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 442);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 443);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 449);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 450);
return this._currentDir;
        },

        getCurrentDirTreeNode : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDirTreeNode", 453);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 454);
return this._currentDirTreeNode;
        },

        getSelectedFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getSelectedFiles", 457);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 458);
var instance = this,
                  selectedModels = instance.filescrollview.getSelectedModels(),
                  selectedFiles = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 461);
YArray.each(
                selectedModels,
                function(fileobject) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 463);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 464);
selectedFiles.push(fileobject.filename);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 467);
return selectedFiles;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 476);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 477);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 486);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 487);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 496);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 497);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 506);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 507);
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
         * <br />'options.newFileName'  holds the new file-name.
         *
         * @method sync
         * @param action {String} The sync-action to perform. May be one of the following:
         *         *
         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.
         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync
         * implementation to determine how to handle 'options'.
        */
        sync: function (/* action, options */) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 714);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 715);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 715);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 716);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 727);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 728);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 730);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 731);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 733);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 734);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 735);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 736);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 750);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 751);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 752);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 753);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 754);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 755);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 756);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 757);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 758);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 758);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 759);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 760);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 764);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 765);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 769);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 775);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 776);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 777);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 786);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 787);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 789);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 790);
instance.readyPromise.then(
                        // do not use Y.batch directly, for the context would be undefined
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 792);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 793);
return Y.batch(
                                instance.loadFiles(),
                                (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 813);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 814);
var instance = this,
                  promiseslist = [];

             // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 818);
promiseslist.push(instance._resizeConstrainPromise);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 819);
promiseslist.push(instance.filterSelect.renderPromise());
//            promiseslist.push(instance.viewSelect.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 821);
promiseslist.push(instance.editSelect.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 822);
if (instance.get('uploadURL') && (Y.Uploader.TYPE !== 'none')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 823);
promiseslist.push(instance.uploader.renderPromise());
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 825);
promiseslist.push(instance.filescrollview.renderPromise());
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 826);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 838);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 839);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 844);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 845);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 846);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 847);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 848);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 849);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 850);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 851);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 852);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 853);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 855);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 856);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 857);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 858);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 860);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 861);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 868);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 871);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 872);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 873);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 879);
instance._renderTree();
            // init the value of the current selected tree, but do not load the files
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 881);
instance._selectRootNode(true);
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 883);
instance._renderFiles();
            // now we create dd methods for moving the files:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 885);
instance._createDDFiles();
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 887);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 907);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 908);
var instance = this,
                  files, rendermodel, filescrollview;

            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 912);
instance.files = files = new Y.LazyFileModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 913);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 913);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 914);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 916);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 918);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelsSelectable: 'multi',
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 927);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 928);
filescrollview.render();
        },

        _renderViewSelect : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderViewSelect", 931);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 932);
var instance = this,
                  boundingBox = instance.get('boundingBox'),
                  filescrollview = instance.filescrollview,
                  viewSelectNode, viewSelect;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 937);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 944);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 946);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 947);
var selecteditem = e.index;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 948);
switch (selecteditem) {
                        case 0:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 950);
filescrollview.setWithoutRerender('listType', 'table');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 951);
filescrollview.set('modelTemplate', LIST_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 952);
boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 953);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 954);
break;
                        case 1:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 956);
filescrollview.setWithoutRerender('listType', 'ul');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 957);
filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 958);
boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 959);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 960);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 964);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 965);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 966);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 976);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 977);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  filescrollview = instance.filescrollview,
                  createDirNode, filterSelect, editSelect, filterSelectNode, editSelectNode,
                  selectedModels, multipleFiles, originalFilename;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 986);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
//                selectionOnButton: false,
                defaultItem: FILTERITEMS[0].text,
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 993);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 995);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 996);
var posibleExtentions = e.value.split(','),
                          contra = (posibleExtentions[0]==='!');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 998);
if (contra) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 999);
posibleExtentions.splice(0, 1);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1001);
instance.filescrollview.set(
                        'viewFilter',
                        function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 1003);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1005);
var filematch;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1006);
if (posibleExtentions[0]==='*') {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1007);
return true;
                            }
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1009);
filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1010);
return contra ? !filematch : filematch;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1013);
filescrollview.syncUI();
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1016);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1017);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1018);
filterSelect.render(filterSelectNode);

            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!
            // instance._renderViewSelect();

            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1026);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1033);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 1035);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1036);
var selecteditem = e.index,
                          filescrollview = instance.filescrollview,
                          currentName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1039);
switch (selecteditem) {
                        case 0:
                            // duplicate file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1042);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1043);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1044);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1045);
Y.confirm(
                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 1049);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1050);
instance.copyFiles(instance._currentDir);
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1053);
break;
                        case 1:
                            // rename file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1056);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1057);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1058);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1059);
Y.prompt(
                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Enter new filename:',
                                {value: originalFilename})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 1064);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1065);
instance.renameFiles(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1068);
break;
                        case 2:
                            // delete file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1071);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1072);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1073);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1074);
Y.confirm(
                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 1078);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1079);
instance.deleteFiles();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1082);
break;
                        case 3:
                            // clone dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1085);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1086);
Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',
                                            {value: currentName+'-copy'})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 1089);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1090);
instance.cloneDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1093);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1096);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1097);
Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1099);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1100);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1103);
break;
                        case 5:
                            // delete dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1106);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1107);
Y.confirm('Delete directory', 'Are you sure you want to delete \''+currentName+'\'<br />and all of its content?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1109);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1110);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1113);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1117);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1118);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1119);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1123);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1124);
eventhandlers.push(
                createDirNode.on('click', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 25)", 1125);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1126);
var currentName = instance._currentDirTreeNode.label;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1127);
Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})
                    .then(
                        function(response) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 26)", 1129);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1130);
instance.createDir(Y.Escape.html(response.value));
                        }
                    );
                })
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1135);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the upload files button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1139);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createUploader", 1150);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1151);
var instance = this,
                  uploadURL = instance.get('uploadURL'),
                  eventhandlers = instance._eventhandlers,
                  createUploadNode, uploaderType, uploader, shadowNode, createInstallFlashNode;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1156);
if (uploadURL) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1157);
uploaderType = Y.Uploader.TYPE;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1158);
if (uploaderType === 'flash') {
                    // because the flashbutton seems not to be disabled (when told to),
                    // we overlay an extra div to prevent clicking on the flash-uploader.
                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,
                    // this feature can be removed (as well as the disabling of the upload-button during upload)
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1163);
shadowNode = Y.Node.create("<div class='block-button'></div>");
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1164);
instance._nodeFilemanToolbar.append(shadowNode);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
if (Y.Uploader.TYPE !== 'none') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1167);
if (instance._installFlashNode) {
                        // remove previous rendered install-flash buttonnode
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1169);
instance._installFlashNode.remove(true);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1171);
createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1172);
instance._nodeFilemanToolbar.append(createUploadNode);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1173);
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
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1198);
uploader.after('fileselect', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 27)", 1198);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1199);
var fileList = e.fileList,
                              params = {};
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1201);
if (fileList.length > 0) {
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1202);
if (shadowNode) {
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1203);
shadowNode.addClass('blocked');
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1204);
createUploadNode.addClass('pure-button-disabled');
                           }
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1206);
uploader.set('enabled', false);
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1207);
YArray.each(fileList, function (fileInstance) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 28)", 1207);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1208);
params[fileInstance.get('id')] = Y.merge(
                                    instance.get('uploaderPostVars'),
                                    {
                                        currentDir: instance._currentDir,
                                        filename: fileInstance.get("name")
                                    }
                                );
                            });
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1216);
uploader.set('postVarsPerFile', params);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1217);
uploader.uploadAll();
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1220);
uploader.on('uploadcomplete', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 29)", 1220);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1221);
var response = PARSE(e.data),
                              error = response.error,
                              newfileobject = response.results;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1224);
if (error) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1225);
instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1228);
instance.files.add(newfileobject);
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1231);
uploader.on('alluploadscomplete', function () {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 30)", 1231);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1232);
if (shadowNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1233);
shadowNode.removeClass('blocked');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1234);
createUploadNode.removeClass('pure-button-disabled');
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1236);
uploader.set('enabled', true);
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1238);
uploader.render(createUploadNode);
                }
                else {
                    // create the button that will prompt to install flash
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1242);
createInstallFlashNode = instance._installFlashNode = Y.Node.create(Lang.sub(INSTALL_FLASH_NODE, {text: 'x'+LABEL_UPLOAD_FILES}));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1243);
instance._nodeFilemanToolbar.append(createInstallFlashNode);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1244);
eventhandlers.push(
                        createInstallFlashNode.on('click', function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 31)", 1245);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1246);
Y.alert('Flash player',
                                        'The most recent version of Adobe Flash player should be installed if you want to upload files.'+
                                        '<br /><br /><a href="http://get.adobe.com/flashplayer" target="_blank">install flashplayer now</a>')
                            .then(
                                function() {
                                    // check if the flashplayer is indeed installed. If so, then uploader-button can be installed
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 32)", 1250);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1252);
instance._redetectFlash();
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1253);
if (Y.SWFDetect.isFlashVersionAtLeast(10,0,45)) {
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1254);
Y.Uploader = Y.UploaderFlash;
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1255);
Y.Uploader.TYPE = "flash";
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1256);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_redetectFlash", 1266);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1267);
var version = 0,
                uA = Y.UA,
                sF = "ShockwaveFlash",
                mF, eP, vS, ax6, ax;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1272);
function parseFlashVersion (flashVer) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "parseFlashVersion", 1272);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1273);
if (Lang.isNumber(PARSTEINT(flashVer[0]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1274);
uA.flashMajor = flashVer[0];
                }

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1277);
if (Lang.isNumber(PARSTEINT(flashVer[1]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1278);
uA.flashMinor = flashVer[1];
                }

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1281);
if (Lang.isNumber(PARSTEINT(flashVer[2]))) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1282);
uA.flashRev = flashVer[2];
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1285);
if (uA.gecko || uA.webkit || uA.opera) {
               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1286);
if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
                  _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1287);
if ((eP = mF.enabledPlugin)) {
                     _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1288);
vS = eP.description.replace(/\s[rd]/g, '.').replace(/[A-Za-z\s]+/g, '').split('.');
                     _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1289);
parseFlashVersion(vS);
                  }
               }
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1293);
if(uA.ie) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1294);
try
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1296);
ax6 = new ActiveXObject(sF + "." + sF + ".6");
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1297);
ax6.AllowScriptAccess = "always";
                }
                catch (e)
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1301);
if(ax6 !== null)
                    {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1303);
version = 6.0;
                    }
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1306);
if (version === 0) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1307);
try
                {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1309);
ax = new ActiveXObject(sF + "." + sF);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1310);
vS = ax.GetVariable("$version").replace(/[A-Za-z\s]+/g, '').split(',');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1311);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 1324);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1325);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree, lazyRender;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1333);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1334);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1339);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1340);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1341);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1343);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1346);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 33)", 1347);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1348);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 1351);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1352);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 34)", 1353);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1356);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 35)", 1358);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1359);
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
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1369);
tree.after(
                'sortableTreeView:select',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 36)", 1371);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1372);
var treenode = e.node,
                          selectedfile;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1374);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1375);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1376);
instance.filescrollview.clearSelectedModels(null, true);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1377);
if (!treenode.canHaveChildren) {
                        // file selected
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1379);
selectedfile = instance.files.getByFileName(treenode.label);
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1380);
instance.filescrollview.selectModels(selectedfile, true);
                    }
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1388);
eventhandlers.push(
                rootnode.on(
                    'click',
                    Y.bind(instance._selectRootNode, instance, false)
                )
            );
        },

        _selectRootNode : function(withoutFileLoad) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_selectRootNode", 1396);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1397);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1398);
instance.initialized().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 37)", 1399);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1400);
var tree = instance.tree,
                          rootnode = instance._nodeFilemanTreeRoot;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1402);
rootnode.set('tabIndex', 0);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1403);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1404);
rootnode.focus();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1405);
instance._currentDir = '/';
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1406);
instance._currentDirTreeNode = tree.rootNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1407);
if (!withoutFileLoad) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1408);
instance.loadFiles();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1410);
YArray.each(
                        tree.getSelectedNodes(),
                        function(treenode) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 38)", 1412);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1413);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1429);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1430);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1432);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1433);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1446);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1447);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1448);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1464);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1465);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1467);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1468);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1480);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1482);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1483);
YArray.each(
                instance._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 39)", 1485);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1486);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1498);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1499);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1507);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1508);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1509);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1523);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1525);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1526);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 40)", 1529);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1530);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1530);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1531);
var options = {},
                              filescrollview = instance.filescrollview;
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1536);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1537);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1540);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1541);
options.currentDir = instance._currentDir || '/';
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1543);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1544);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1545);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1546);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1547);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1549);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1550);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1552);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1553);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1554);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1556);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1557);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1558);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1559);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1560);
options.newFileName = param1;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1562);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1564);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1565);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1566);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1568);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1569);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1570);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1571);
options.currentDir = instance._currentDir;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1573);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1575);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1576);
options.currentDir = instance._currentDir;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1578);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1579);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1580);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1582);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1583);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1584);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1586);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1587);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1588);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1589);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1590);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1592);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1593);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1594);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1596);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1597);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1598);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1599);
options.destinationDir = param1;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1601);
filescrollview.clearSelectedModels(null, true);
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1603);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSyncError", 1627);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1628);
var instance = this,
                  facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1631);
facade = {
                options: options,
                error: reason,
                src: syncaction
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1636);
instance.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1637);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSync", 1652);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1653);
var instance = this,
                  parsedResponse = PARSE(response),
                  err = parsedResponse.error,
                  tree = instance.tree,
                  lazyRender = instance.get('lazyRender'),
                  showTreefiles = instance.get('showTreefiles'),
                  files = instance.files,
                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1662);
if (err) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1663);
return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1666);
facade = {
                    response: response,
                    options: options
                };
                // Lazy publish.
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1671);
if (!instance['_'+syncaction]) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1672);
instance['_'+syncaction] = instance.publish(syncaction, {
                        preventable: false
                    });
                }
                // now we need process the response
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1677);
if (syncaction === 'loadFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1678);
instance.files.reset(parsedResponse);
                }
//                else if (syncaction === 'loadAppendFiles') {
                    // ....
//                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1683);
if ((syncaction === 'loadTreeLazy') && lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1684);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1685);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1687);
tree.insertNode(param1, parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1689);
if (syncaction === 'renameFiles') {
                    // should return an array with objects with the fields:
                    // {
                    //     filename: 'prev_filename.ext',
                    //     newfilename: 'new_filename.ext',
                    //     modified: 'modified datetimestring'
                    // }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1696);
createdFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1697);
if (createdFiles && createdFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1698);
fileDirectoryNode = options._currentDirTreeNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1699);
YArray.each(
                            createdFiles,
                            function(changedFileObject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 41)", 1701);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1702);
var previousFilename = changedFileObject.prevfilename,
                                      newFilename = changedFileObject.filename,
                                      modified = changedFileObject.modified,
                                      thumbnail = changedFileObject.thumbnail,
                                      preview = changedFileObject.preview;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1707);
if (showTreefiles && fileDirectoryNode) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1708);
changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1709);
changedTreeNode.label = newFilename;
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1712);
fileobject = files.getByFileName(previousFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1713);
if (modified) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1715);
files.setModelAttr(fileobject, 'modified', modified, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1717);
if (thumbnail) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1719);
files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1721);
if (preview) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1723);
files.setModelAttr(fileobject, 'preview', preview, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1725);
files.setModelAttr(fileobject, 'filename', newFilename);
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1728);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1729);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1733);
if (syncaction === 'renameDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1734);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1735);
changedTreeNode.label = options.newDirName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1736);
changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1737);
instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1739);
if (syncaction === 'deleteFiles') {
                    // should return an array with filenames that are deleted
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1741);
deletedFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1742);
if (deletedFiles && deletedFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1743);
fileDirectoryNode = options._currentDirTreeNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1744);
YArray.each(
                            deletedFiles,
                            function(deletedFilename) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 42)", 1746);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1747);
if (showTreefiles && fileDirectoryNode && fileDirectoryNode.state.loaded) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1748);
changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1749);
tree.removeNode(changedTreeNode, {remove: true, silent: false});
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1752);
fileobject = files.getByFileName(deletedFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1753);
filemodel = files.revive(fileobject);
                                // no need to call the synclayer --> the file is already removed from the server
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1755);
filemodel.destroy({remove: false});
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1758);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1759);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1763);
if (syncaction === 'deleteDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1764);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1765);
parentnode = changedTreeNode.parent;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1766);
tree.removeNode(changedTreeNode, {destroy: true});
                    // now select its parentnode
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1768);
if (parentnode === tree.rootNode) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1769);
instance._selectRootNode();
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1772);
tree.selectNode(parentnode);
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1775);
if (syncaction === 'createDir') {
                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted
                    // Opening the treenode would load all subdirs and leads to double reference
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1778);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1779);
if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1780);
dirName = parsedResponse.results; // the directoryname that was created on the server .
                                                                                 // this can be different from the requested dirname.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1782);
tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});
                    }
                    // always open the node to let the new directory be shown
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1785);
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
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1796);
if (syncaction === 'copyFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1797);
createdFiles = parsedResponse.results; // array with fileobjects
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1798);
instance.files.add(createdFiles);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1799);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1800);
if (showTreefiles) {
                        // now add the files to the tree
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1802);
YArray.each(
                            createdFiles,
                            function(fileobject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 43)", 1804);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1805);
tree.insertNode(changedTreeNode, {label: fileobject.filename});
                            }
                        );
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1810);
if ((syncaction === 'loadTree') && !lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1811);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1812);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1814);
tree.insertNode(tree.rootNode, parsedResponse);
                }}}}}}}}}
                // end of processing, now fire event
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1817);
instance.fire(syncaction, facade);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1818);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1832);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1833);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1836);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1837);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1838);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1839);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1850);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1852);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1855);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1856);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1857);
instance._currentDirTreeNode = treenode;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1858);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1871);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1872);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1873);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1878);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1891);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1892);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1893);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1898);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1910);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1911);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1912);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1914);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1915);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1926);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1927);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1928);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1930);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1931);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1933);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1935);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1936);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1937);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1939);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1968);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1969);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1975);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1977);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1978);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1979);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1980);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1983);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1997);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1998);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2005);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2006);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2007);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2008);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2009);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2010);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2011);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2013);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 2025);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2026);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2031);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2032);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2033);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2035);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2038);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2039);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2041);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2047);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2048);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2049);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2051);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2054);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2055);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2057);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 2073);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2074);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2076);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2077);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2078);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2079);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2096);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2097);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2111);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2112);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2114);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2115);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2130);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2131);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2144);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2145);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2147);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2148);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2149);
if (instance._nodeFilemanTree) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2150);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2151);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2152);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2154);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2157);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2158);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2171);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2172);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2174);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2175);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2176);
if (instance._nodeFilemanFlow) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2177);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2178);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2179);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2181);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2184);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2185);
return this._nodeFilemanFlow && (this._nodeFilemanFlow.getStyle('display')!=='none');
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2206);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2207);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2220);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2221);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2235);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2236);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2250);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2251);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2265);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2266);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2268);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2269);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2270);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2271);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2285);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2286);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2288);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2289);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2290);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2291);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2305);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2306);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2308);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2309);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2310);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2311);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2325);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2326);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2328);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2329);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2330);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2331);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2345);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2346);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2348);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2349);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2367);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2368);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2386);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2387);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2400);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2401);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2403);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2404);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2405);
if (instance._panelFT) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2406);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2407);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2422);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2423);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2425);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2426);
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
