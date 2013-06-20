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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uplaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    YJSON = Y.JSON,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    LABEL_UPLOAD_FILES = 'upload files',","    PROCESS_ERROR = 'An error occured during processing',","    FILTERITEMS = [","        {text: 'all files', returnValue: '*'},","        {text: 'images', returnValue: 'jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'non-images', returnValue: '!,jpg,jpeg,gif,bmp,tif,tiff,png'},","        {text: 'txt', returnValue: 'txt'},","        {text: 'word', returnValue: 'doc,docx'},","        {text: 'excel', returnValue: 'xls,xlsx'},","        {text: 'powerpoint', returnValue: 'ppt,pptx'},","        {text: 'pdf', returnValue: 'pdf'}","    ],","    VIEWITEMS = ['list', 'thumbnails', 'tree', 'coverflow'],","    EDITITEMS = ['duplicate file', 'rename file', 'delete file', 'clone dir', 'rename dir', 'delete dir'],","    THUMBNAIL_TEMPLATE = '<% if (data.filename.isFileType([\"jpg\",\"jpeg\",\"gif\",\"bmp\",\"tif\",\"tiff\",\"png\"])) { %><img src=\"<%= data.thumbnail %>\" />' +","                                             '<% } else { %>' +","                                                 '<div class=\"itsa-thumbnail\">' +","                                                     '<div class=\"itsa-fileicon <%= data.filename.extractFileExtension() %>\"></div>' +","                                                     '<span class=\"file-label\"><%= data.filename %></span>' +","                                                 '</div>' +","                                             '<% } %>',","    LIST_TEMPLATE = '<td><%= data.filename %></td>' +","                                 '<td><%= data.size %></td>' +","                                 '<% if (data.width && data.height && (data.width>0) && (data.height>0)) { %>' +","                                     '<td><%= data.modified %></td>' +","                                     '<td><%= data.width %>x<%= data.height %></td>' +","                                 '<% } else { %>' +","                                     '<td colspan=2><%= data.modified %></td>' +","                                 '<% } %>',","    TREEVIEW_NOTOUCH_CLASS = 'yui3-treeview-notouch',","    TREEVIEW_SELECTED_CLASS = 'yui3-treeview-selected',","    EMPTY_DIVNODE = '<div></div>',","    EMPTY_BUTTONNODE = '<button class=\"pure-button pure-button-toolbar\">{text}</button>',","    EMPTY_FILEUPLOADNODE = '<div class=\"pure-button pure-uploadbutton\"></div>',","    FILEMAN_TITLE = 'Filemanager',","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    HIDDEN_CLASS = FILEMANCLASSNAME + '-hidden',","    FILEMAN_LIST_TEMPLATE_CLASS = FILEMANCLASSNAME + '-list-files',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_TOOLBAR_CLASS = FILEMANCLASSNAME + '-toolbar',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_ROOTTREEVIEW_CLASS = FILEMANCLASSNAME + '-roottreeview',","    TREEVIEW_NODE_CLASS = 'yui3-treeview-node',","    TREEVIEW_ROW_CLASS = 'yui3-treeview-row',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_TOOLBAR_CLASS+'\"></div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_ROOTTREEVIEW_CLASS+\" \"+TREEVIEW_NODE_CLASS+ \" \"+ HIDDEN_CLASS+\"'>\"+","                                                \"<div class='\"+TREEVIEW_ROW_CLASS+\"'>{root}</div>\"+","                                            \"</div>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    },","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return YJSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","    /**","     * Holds a promise when the filemanager and all its widgets are rendered.<br />","     * Is solved <i>before</> any initial tree- and file-data is loaded.","     * @property readyPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the filemanager is ready (readyPromise) <i>and</i> initial tree- and file-data are loaded as well.","     * @property dataPromise","     * @type Y.Promise","     */","","    /**","     * Holds a promise when the constrain plugin is ready.","     * @property _resizeConstrainPromise","     * @type Y.Promise","     * @private","     */","","String.prototype.extractFileExtension = function() {","    return this.match(/.+\\.(\\w+)$/)[1];","};","","String.prototype.isFileType = function(extentions) {","    return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);","};","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {","        sortComparator: function (node) {","            // directories are appended by char(0) --> this will make them appear on top","            return (node.canHaveChildren ? CHARZERO : '') + node.label;","        },","        getByFileName: function(directoryTreeNode, filename) {","            var foundNode;","            YArray.some(","                directoryTreeNode.children,","                function(node) {","                    if (!node.canHaveChildren && (node.label === filename)) {","                        foundNode = node;","                    }","                    return foundNode;","                }","            );","            return foundNode;","        }","    }",");","","Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {","        getByFileName: function (filename) {","            var instance = this,","                  foundModel;","            instance.some(","                function(model) {","                    if (model.filename === filename) {","                        foundModel = model;","                    }","                    return foundModel;","                }","            );","            return foundModel;","        }","    }",");","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox');","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._bodyNode = null;","            instance._resizeEvent = null;","            instance._busyResize = false;","            instance._panelHD = null;","            instance._panelBD = null;","            instance._panelFT = null;","            instance._nodeFilemanTree = null;","            instance._nodeFilemanTreeView = null;","            instance._nodeFilemanFlow = null;","            instance._nodeFilemanItems = null;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._bodyNode = Y.one('body');","            instance.publish(EVT_ERROR, {","                preventable: false,","                broadcast: 1  // --> to make it catchable by itsaerrorreporter","            });","            instance._createPromises();","            // extend the time that the widget is invisible","            boundingBox.addClass(HIDDEN_CLASS);","            (instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(","                function() {","                    instance._setConstraints(true);","                    instance._correctHeightAfterResize();","                    boundingBox.removeClass(HIDDEN_CLASS);","                }","            );","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","/*","            instance.publish(EVT_ERROR, {","                preventable: false","            });","*/","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        getCurrentDirTreeNode : function() {","            return this._currentDirTreeNode;","        },","","        getSelectedFiles : function() {","            var instance = this,","                  selectedModels = instance.filescrollview.getSelectedModels(),","                  selectedFiles = [];","            YArray.each(","                selectedModels,","                function(fileobject) {","                    selectedFiles.push(fileobject.filename);","                }","            );","            return selectedFiles;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file(s). When multiple files are selected, the server needs to hanlde the right naming.","         * For example by giving the files the same name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFiles","         * @param newFilename {String} new filename for the selected file(s)","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned (full dir-tree form root).","         * <br />'options.clonedDirName'  --> new directory name (no dir-tree: without slashes).<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.currentDir'  --> current directory of the selected files (full dir-tree form root).<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to (full dir-tree form root).<br />","         * <br />","         * `createDir`: Creates a subdirectory.","         * <br />'options.currentDir' --> current directory wherein the new subdirectory will be created (full dir-tree form root).","         * <br />'options.dirName'  --> the new sub-directory name (no dir-tree: without slashes).<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.currentDir' --> current directory which will be erased (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded (full dir-tree form root).<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded (full dir-tree form root).<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.newParentDir'  --> the name of the new parent-directory (full dir-tree form root).<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.currentDir' --> selected directory to be moved (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be moved.","         * <br />'options.destinationDir'  holds the name of the directory where the files should be placed (full dir-tree form root).<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed (full dir-tree form root).","         * <br />'options.newDirName'  holds the new directory-name.<br />","         * <br />","         * `renameFiles` : Renames the selected file.","         * <br />'options.currentDir' --> Current directory where the files reside (full dir-tree form root).","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed.","         * <br />'options.newFileName'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Creates the internalPromises: this._resizeConstrainPromise, this.readyPromise and this.dataPromise","         *","         * @method _createPromises","         * @private","         * @since 0.1","        */","        _createPromises : function() {","            var instance = this;","            instance._resizeConstrainPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        function() {","                            if (instance.hasPlugin('resize')) {","                                if (!instance.resize.hasPlugin('con')) {","                                    Y.use('resize-constrain', function() {","                                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                                        resolve();","                                    });","                                }","                                else {","                                    instance.resize.con.set('preserveRatio', false);","                                    resolve();","                                }","                            }","                            else {","                                resolve();","                            }","                        }","                    );","                }","            );","            instance.readyPromise = new Y.Promise(","                function(resolve) {","                    instance.renderPromise().then(","                        Y.rbind(instance._afterRender, instance)","                    ).then(","                        Y.rbind(instance._allWidgetsRenderedPromise, instance)","                    ).then(","                        resolve","                    );","                }","            );","            instance.dataPromise = new Y.Promise(","                function(resolve) {","                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined","                    instance._createMethods();","                    instance.readyPromise.then(","                        Y.batch(","                            instance.loadFiles(),","                            (instance.get('lazyRender') ? instance.loadTreeLazy() : instance.loadTree())","                        )","                    ).then(","                        resolve","                    );","                }","            );","        },","","        /**","         * Promise that resolves when all widgets are finished rendering","         *","         * @method _allWidgetsRenderedPromise","         * @private","         * @return {Y.Promise}","         * @since 0.1","        */","        _allWidgetsRenderedPromise : function() {","            var instance = this;","            return Y.batch(","                 // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.","                 instance._resizeConstrainPromise,","                 instance.filterSelect.renderPromise(),","//                 instance.viewSelect.renderPromise(),","                 instance.editSelect.renderPromise(),","                 instance.uploader.renderPromise(),","                 instance.filescrollview.renderPromise()","            );","        },","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  boundingBox = instance.get('boundingBox'),","                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);","            instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));","            instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:resize',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        function() {","                            instance._correctHeightAfterResize();","                            instance.filescrollview.syncUI();","                        }","                    )","                );","            }","            // now we create the directory tree","            instance._renderTree();","            // init the value of the current selected tree, but do not load the files","            instance._selectRootNode(true);","            // now we create the files tree:","            instance._renderFiles();","            // now we create dd methods for moving the files:","            instance._createDDFiles();","            // now we create the toolbar","            instance._renderToolbar();","        },","","        /**","         * Creates drag-drop functionalities to the files, so that they can be dropped into a directory.","         *","         * @method _createDDFiles","         * @private","         * @since 0.1","        */","        _createDDFiles : function() {","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module","            instance.files = files = new Y.LazyFileModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                showLoadMessage: false,","                modelsSelectable: 'multi',","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","        },","","        _renderViewSelect : function() {","            var instance = this,","                  boundingBox = instance.get('boundingBox'),","                  filescrollview = instance.filescrollview,","                  viewSelectNode, viewSelect;","","            viewSelect = instance.viewSelect = new Y.ITSASelectList({","                items: VIEWITEMS,","                selectionOnButton: false,","                defaultButtonText: 'view',","                btnSize: 1,","                buttonWidth: 60","            });","            viewSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index;","                    switch (selecteditem) {","                        case 0:","                            filescrollview.setWithoutRerender('listType', 'table');","                            filescrollview.set('modelTemplate', LIST_TEMPLATE);","                            boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                        case 1:","                            filescrollview.setWithoutRerender('listType', 'ul');","                            filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);","                            boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);","                            filescrollview.syncUI();","                        break;","                    }","                }","            );","            viewSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(viewSelectNode);","            viewSelect.render(viewSelectNode);","        },","","        /**","         * Renders the widgets and buttons in the toolbar","         *","         * @method _renderToolbar","         * @private","         * @since 0.1","        */","        _renderToolbar : function() {","            var instance = this,","                  eventhandlers = instance._eventhandlers,","                  uploadURL = instance.get('uploadURL'),","                  filescrollview = instance.filescrollview,","                  filterSelect, editSelect, filterSelectNode, editSelectNode, shadowNode,","                  createDirNode, createUploadNode, selectedModels, multipleFiles, originalFilename, uploaderType, uploader;","","            //=====================","            // render the filter-select:","            //=====================","            filterSelect = instance.filterSelect = new Y.ITSASelectList({","                items: FILTERITEMS,","//                selectionOnButton: false,","                defaultItem: FILTERITEMS[0].text,","                btnSize: 1,","                buttonWidth: 60","            });","            filterSelect.after(","                'selectChange',","                function(e) {","                    var posibleExtentions = e.value.split(','),","                          contra = (posibleExtentions[0]==='!');","                    if (contra) {","                        posibleExtentions.splice(0, 1);","                    }","                    instance.filescrollview.set(","                        'viewFilter',","                        function(fileitem) {","                            // isFileType is a prototype-method that is added to the String-class","                            var filematch;","                            if (posibleExtentions[0]==='*') {","                                return true;","                            }","                            filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));","                            return contra ? !filematch : filematch;","                        }","                    );","                    filescrollview.syncUI();","                }","            );","            filterSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(filterSelectNode);","            filterSelect.render(filterSelectNode);","","            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!","            // instance._renderViewSelect();","","            //=====================","            // render the edit-select:","            //=====================","            editSelect = instance.editSelect = new Y.ITSASelectList({","                items: EDITITEMS,","                selectionOnButton: false,","                defaultButtonText: 'edit',","                btnSize: 1,","                buttonWidth: 60","            });","            editSelect.after(","                'selectChange',","                function(e) {","                    var selecteditem = e.index,","                          filescrollview = instance.filescrollview,","                          currentName;","                    switch (selecteditem) {","                        case 0:","                            // duplicate file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')","                            .then(","                                function(response) {","                                    instance.copyFiles(instance._currentDir);","                                }","                            );","                        break;","                        case 1:","                            // rename file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.prompt(","                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Enter new filename:',","                                {value: originalFilename})","                            .then(","                                function(response) {","                                    instance.renameFiles(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 2:","                            // delete file(s)","                            selectedModels = filescrollview.getSelectedModels();","                            multipleFiles = selectedModels && (selectedModels.length>1);","                            originalFilename = selectedModels && selectedModels[0].filename;","                            Y.confirm(","                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),","                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')","                            .then(","                                function() {","                                    instance.deleteFiles();","                                }","                            );","                        break;","                        case 3:","                            // clone dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',","                                            {value: currentName+'-copy'})","                            .then(","                                function(response) {","                                    instance.cloneDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 4:","                            // rename dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})","                            .then(","                                function(response) {","                                    instance.renameDir(Y.Escape.html(response.value));","                                }","                            );","                        break;","                        case 5:","                            // delete dir","                            currentName = instance._currentDirTreeNode.label;","                            Y.confirm('Delete directory', 'Are you sure you want to delete \\''+currentName+'\\'<br />and all of its content?')","                            .then(","                                function() {","                                    instance.deleteDir();","                                }","                            );","                        break;","                    }","                }","            );","            editSelectNode = Y.Node.create(EMPTY_DIVNODE);","            instance._nodeFilemanToolbar.append(editSelectNode);","            editSelect.render(editSelectNode);","            //=====================","            // render the create dir button:","            //=====================","            createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));","            eventhandlers.push(","                createDirNode.on('click', function() {","                    var currentName = instance._currentDirTreeNode.label;","                    Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})","                    .then(","                        function(response) {","                            instance.createDir(Y.Escape.html(response.value));","                        }","                    );","                })","            );","            instance._nodeFilemanToolbar.append(createDirNode);","            //=====================","            // render the upload files button:","            //=====================","            if (uploadURL) {","                uploaderType = Y.Uploader.TYPE;","                if (uploaderType === 'flash') {","                    // because the flashbutton seems not to be disabled (when told to),","                    // we overlay an extra div to prevent clicking on the flash-uploader.","                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,","                    // this feature can be removed (as well as the disabling of the upload-button during upload)","                    shadowNode = Y.Node.create(\"<div class='block-button'></div>\");","                    instance._nodeFilemanToolbar.append(shadowNode);","                }","                createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);","                instance._nodeFilemanToolbar.append(createUploadNode);","                if (Y.Uploader.TYPE !== 'none') {","                    uploader = instance.uploader = new Y.Uploader({"," //                   uploader = instance.uploader = new Y.UploaderFlash({","//                    uploader = instance.uploader = new Y.UploaderHTML5({","                        enabled: instance.get('uploaderEnabled'),","                        errorAction: instance.get('uploaderErrorAction'),","                        fileFieldName: instance.get('uploaderFileFieldName'),","                        uploadHeaders: instance.get('uploadHeaders'),","                        uploadURL: uploadURL,","                        withCredentials: instance.get('withHTML5Credentials'),","                        swfURL: instance.get('swfURL') + '?t=' + Math.random(),","                        tabElements: {","                            from: createDirNode,","                            to: filterSelect","                        },","                        width: \"80px\",","                        height: \"25px\",","                        appendNewFiles: false,","                        multipleFiles: true,","                        buttonClassNames: {","                            hover: 'pure-button-hover',","                            active: 'pure-button',","                            disabled: 'pure-button-disabled',","                            focus: 'pure-button'","                        },","                        selectButtonLabel: LABEL_UPLOAD_FILES","                    });","//                    if (uploaderType==='html5') {","        //                uploader.set(\"dragAndDropArea\", instance._nodeFilemanItems);"," //                   }","                    uploader.after('fileselect', function (e) {","                        var fileList = e.fileList,","                              params = {};","                        if (fileList.length > 0) {","                           if (shadowNode) {","                               shadowNode.addClass('blocked');","                               createUploadNode.addClass('pure-button-disabled');","                           }","                           uploader.set('enabled', false);","                           YArray.each(fileList, function (fileInstance) {","                                params[fileInstance.get('id')] = Y.merge(","                                    instance.get('uploaderPostVars'),","                                    {","                                        currentDir: instance._currentDir,","                                        filename: fileInstance.get(\"name\")","                                    }","                                );","                            });","                            uploader.set('postVarsPerFile', params);","                            uploader.uploadAll();","                        }","                    });","                    uploader.on('uploadcomplete', function (e) {","                        var response = PARSE(e.data),","                              error = response.error,","                              newfileobject = response.results;","                        if (error) {","                            instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));","                        }","                        else {","                            instance.files.add(newfileobject);","                        }","                    });","                    uploader.on('alluploadscomplete', function () {","                        if (shadowNode) {","                            shadowNode.removeClass('blocked');","                            createUploadNode.removeClass('pure-button-disabled');","                        }","                        uploader.set('enabled', true);","                    });","                    uploader.render(createUploadNode);","                }","            }","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  rootnode = instance._nodeFilemanTreeRoot,","                  eventhandlers = instance._eventhandlers,","                  tree, lazyRender;","","            //=====================","            // render Y.SortableTreeView","            //=====================","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","            });","            tree.addTarget(instance);","            tree.render();","            if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {","                // this makes the root-node behave the same as the tree-nodes","                instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","            //============================","            // attach events to treenodes","            //============================","            tree.after(","                'sortableTreeView:select',","                function() {","                    rootnode.removeAttribute('tabIndex');","                    rootnode.removeClass(TREEVIEW_SELECTED_CLASS);","                    instance.filescrollview.clearSelectedModels(null, true);","                }","            );","            //============================","            // attach events to the rootnode the root node","            //============================","            // When clicked, set the right tab-index and load the rootfiles","            eventhandlers.push(","                rootnode.on(","                    'click',","                    instance._selectRootNode,","                    instance","                )","            );","        },","","        _selectRootNode : function(withoutFileLoad) {","            var instance = this,","                  tree = instance.tree,","                  rootnode = instance._nodeFilemanTreeRoot;","            rootnode.set('tabIndex', 0);","            rootnode.addClass(TREEVIEW_SELECTED_CLASS);","            rootnode.focus();","            instance._currentDir = '/';","            instance._currentDirTreeNode = tree.rootNode;","            if (!withoutFileLoad) {","                instance.loadFiles();","            }","            YArray.each(","                tree.getSelectedNodes(),","                function(treenode) {","                    treenode.unselect();","                }","            );","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                  panelHD = instance._panelHD,","                  panelFT = instance._panelFT,","                  nodeFilemanItems = instance._nodeFilemanItems,","                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,","                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');","            instance._panelBD.setStyle('height', newHeightBD+'px');","            if (nodeFilemanItems) {","                nodeFilemanItems.setStyle('height', newHeightFiles+'px');","            }","        },","","        /**","         * Dynamically creates the next Class-methods:<br />","         * 'loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","         * 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'","         *","         * @method _createMethods","         * @private","         * @protected","         * @since 0.1","        */","        _createMethods : function() {","","            var instance = this;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {},","                              filescrollview = instance.filescrollview;","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance._currentDir;","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance._currentDir;","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.newFileName = param1;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance._currentDir;","                            options.newDirName = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance._currentDir;","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance._currentDir;","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance._currentDir;","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.currentDir = instance._currentDir;","                            options._currentDirTreeNode = instance._currentDirTreeNode;","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.destinationDir = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance._currentDir;","                            options.clonedDirName = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());","                            options.currentDir = instance._currentDir;","                            options.destinationDir = param1;","                            // now unselect the selected files, for convenience experience","                            filescrollview.clearSelectedModels(null, true);","                        }","                        return instance.readyPromise","                                    .then(","                                        Y.bind(instance.sync, instance, syncaction, options)","                                    )","                                    .then(","                                        Y.rbind(instance._handleSync, instance, syncaction, options, param1),","                                        Y.rbind(instance._handleSyncError, instance, syncaction, options)","                                    );","                    };","                }","            );","        },","","        /**","         * Method that handles any sync-error or error-data returned from the server (defined by 'error'-property in the response).","         *","         * @method _handleSyncError","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSyncError : function(reason, syncaction, options) {","            var instance = this,","                  facade;","","            facade = {","                options: options,","                error: reason,","                src: syncaction","            };","            instance.fire(EVT_ERROR, facade);","            return reason;","       },","","        /**","         * Method that handles the sync-response returned from the server.","         *","         * @method _handleSync","         * @param reason {Object} The rejected value by the syncpromise","         * @param syncaction {Object} The original syncaction","         * @param options {Object} The options that were passed with the syncaction","         * @param param1 {Any} The first parameter that was passed into the sync-action","         * @private","         * @return {Object} reason --> returns the promised reason for failure, so it can be chained.","         * @since 0.1","        */","       _handleSync : function(response, syncaction, options, param1) {","            var instance = this,","                  parsedResponse = PARSE(response),","                  err = parsedResponse.error,","                  tree = instance.tree,","                  lazyRender = instance.get('lazyRender'),","                  showTreefiles = instance.get('showTreefiles'),","                  files = instance.files,","                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;","","            if (err) {","                return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);","            }","            else {","                facade = {","                    response: response,","                    options: options","                };","                // Lazy publish.","                if (!instance['_'+syncaction]) {","                    instance['_'+syncaction] = instance.publish(syncaction, {","                        preventable: false","                    });","                }","                // now we need process the response","                if (syncaction === 'loadFiles') {","                    instance.files.reset(parsedResponse);","                }","//                else if (syncaction === 'loadAppendFiles') {","                    // ....","//                }","                else if ((syncaction === 'loadTreeLazy') && lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(param1, parsedResponse);","                }","                else if (syncaction === 'renameFiles') {","                    // should return an array with objects with the fields:","                    // {","                    //     filename: 'prev_filename.ext',","                    //     newfilename: 'new_filename.ext',","                    //     modified: 'modified datetimestring'","                    // }","                    createdFiles = parsedResponse.results;","                    if (createdFiles && createdFiles.length>0) {","                        fileDirectoryNode = options._currentDirTreeNode;","                        YArray.each(","                            createdFiles,","                            function(changedFileObject) {","                                var previousFilename = changedFileObject.prevfilename,","                                      newFilename = changedFileObject.filename,","                                      modified = changedFileObject.modified,","                                      thumbnail = changedFileObject.thumbnail,","                                      preview = changedFileObject.preview;","                                if (showTreefiles && fileDirectoryNode) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);","                                    changedTreeNode.label = newFilename;","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(previousFilename);","                                if (modified) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'modified', modified, {silent: true});","                                }","                                if (thumbnail) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});","                                }","                                if (preview) {","                                    // silent: do not force any refresh stuff --> that will be done after changing the filename","                                    files.setModelAttr(fileobject, 'preview', preview, {silent: true});","                                }","                                files.setModelAttr(fileobject, 'filename', newFilename);","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'renameDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    changedTreeNode.label = options.newDirName;","                    changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                    instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';","                }","                else if (syncaction === 'deleteFiles') {","                    // should return an array with filenames that are deleted","                    deletedFiles = parsedResponse.results;","                    if (deletedFiles && deletedFiles.length>0) {","                        fileDirectoryNode = options._currentDirTreeNode;","                        YArray.each(","                            deletedFiles,","                            function(deletedFilename) {","                                if (showTreefiles && fileDirectoryNode && fileDirectoryNode.state.loaded) {","                                    changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);","                                    tree.removeNode(changedTreeNode, {remove: true, silent: false});","                                }","                                // find the right fileobject and update the corresponding fileobject inside instance.files","                                fileobject = files.getByFileName(deletedFilename);","                                filemodel = files.revive(fileobject);","                                // no need to call the synclayer --> the file is already removed from the server","                                filemodel.destroy({remove: false});","                            }","                        );","                        if (showTreefiles && fileDirectoryNode) {","                            fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.","                        }","                    }","                }","                else if (syncaction === 'deleteDir') {","                    changedTreeNode = instance._currentDirTreeNode;","                    parentnode = changedTreeNode.parent;","                    tree.removeNode(changedTreeNode, {destroy: true});","                    // now select its parentnode","                    if (parentnode === tree.rootNode) {","                        instance._selectRootNode();","                    }","                    else {","                        tree.selectNode(parentnode);","                    }","                }","                else if (syncaction === 'createDir') {","                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted","                    // Opening the treenode would load all subdirs and leads to double reference","                    changedTreeNode = instance._currentDirTreeNode;","                    if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {","                        dirName = parsedResponse.results; // the directoryname that was created on the server .","                                                                                 // this can be different from the requested dirname.","                        tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});","                    }","                    // always open the node to let the new directory be shown","                    tree.openNode(changedTreeNode);","                }","//                else if (syncaction === 'moveDir') {","                    // ....","//                }","//                else if (syncaction === 'moveFiles') {","                    // ....","//                }","//                else if (syncaction === 'cloneDir') {","                    // ....","//                }","                else if (syncaction === 'copyFiles') {","                    createdFiles = parsedResponse.results; // array with fileobjects","                    instance.files.add(createdFiles);","                    changedTreeNode = instance._currentDirTreeNode;","                    if (showTreefiles) {","                        // now add the files to the tree","                        YArray.each(","                            createdFiles,","                            function(fileobject) {","                                tree.insertNode(changedTreeNode, {label: fileobject.filename});","                            }","                        );","                    }","                }","                else if ((syncaction === 'loadTree') && !lazyRender) {","                    if (!instance._rootVisible) {","                        instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);","                    }","                    tree.insertNode(tree.rootNode, parsedResponse);","                }","                // end of processing, now fire event","                instance.fire(syncaction, facade);","                return response;","            }","        },","","","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance._currentDirTreeNode = treenode;","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function(activate) {","            if (activate) {","                this._constraintsSetable = true;","            }","            if (this._constraintsSetable) {","                var instance = this,","                    pluginConstraints = instance.resize && instance.resize.con,","                    panelHD = instance._panelHD,","                    panelFT = instance._panelFT,","                    heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                    heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                    minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                        instance.get('minWidthFileArea'),","                    minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                          instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                    boundingBox = instance.get('boundingBox');","                if (pluginConstraints) {","                    pluginConstraints.set('minWidth', minWidth);","                    pluginConstraints.set('minHeight', minHeight);","                }","                if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {","                    boundingBox.setStyle('width', minWidth+'px');","                    // initiate areawidths","                    instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","                }","                if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {","                    boundingBox.setStyle('height', minHeight+'px');","                    instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                    // initiate areawidths","                    instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","                }","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function(val) {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _setSizeFlowArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                  borderFlowArea = instance._borderFlowArea,","                  nodeFilemanFlow = instance._nodeFilemanFlow,","                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                  newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            // we need to check whether nodeFilemanFlow already exists","            if (nodeFilemanFlow) {","                nodeFilemanFlow.setStyle('height', newHeight+'px');","                if (instance.resize && instance.resize.hasPlugin('con')) {","                    instance._setConstraints();","                }","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _setSizeTreeArea","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * When set to false, the filemanager can show up even if it has no initial tree and filecontent.<br />","             * Set to true if you want the filemanager delay its appearance until the initial tree and files are loaded.","             *","             * @attribute delayView","             * @type Boolean","             * @default false","             * @since 0.1","            */","            delayView: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanTree) {","                        instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanTree && (this._nodeFilemanTree.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._nodeFilemanFlow) {","                        instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                        if (instance.resize && instance.resize.hasPlugin('con')) {","                            instance._setConstraints();","                        }","                        instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                    }","                },","                getter: function() {","                    return this._nodeFilemanFlow && (this._nodeFilemanFlow.getStyle('display')!=='none');","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    if (instance._panelFT) {","                        instance._panelFT.setStyle('display', (val ? '' : 'none'));","                        instance._correctHeightAfterResize();","                    }","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            },","","            uploaderEnabled: {","                value: true","            },","","            uploaderErrorAction: {","                value: Y.Uploader.Queue.CONTINUE","            },","","            uploaderFileFieldName: {","                value: 'filedata'","            },","","            uploaderPostVars: {","                value: {}","            },","","            uploadHeaders: {","                value: {}","            },","","            uploadURL: {","                value: null","            },","","            // the absolute url to the swf-file, without a timestamp (this Module always adds a timestamp internally)","            swfURL: {","                value: 'http://yui.yahooapis.com/3.10.3/build/uploader/assets/flashuploader.swf'","            },","","            withHTML5Credentials: {","                value: false","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"event\",","        \"event-custom\",","        \"event-touch\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"promise\",","        \"json\",","        \"uploader\",","        \"gallery-sm-treeview\",","        \"gallery-sm-treeview-sortable\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsadialog\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsaselectlist\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"106":0,"110":0,"111":0,"112":0,"114":0,"119":0,"122":0,"244":0,"245":0,"248":0,"249":0,"252":0,"253":0,"256":0,"257":0,"258":0,"260":0,"264":0,"267":0,"270":0,"271":0,"274":0,"275":0,"277":0,"280":0,"285":0,"287":0,"289":0,"291":0,"292":0,"294":0,"297":0,"302":0,"312":0,"314":0,"315":0,"316":0,"317":0,"318":0,"319":0,"320":0,"321":0,"322":0,"323":0,"324":0,"325":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"332":0,"333":0,"334":0,"338":0,"340":0,"341":0,"343":0,"344":0,"345":0,"357":0,"364":0,"365":0,"366":0,"367":0,"368":0,"369":0,"370":0,"371":0,"379":0,"389":0,"398":0,"408":0,"417":0,"426":0,"427":0,"429":0,"433":0,"440":0,"444":0,"448":0,"451":0,"454":0,"457":0,"467":0,"477":0,"487":0,"497":0,"705":0,"706":0,"718":0,"720":0,"721":0,"723":0,"724":0,"725":0,"726":0,"741":0,"742":0,"744":0,"746":0,"747":0,"748":0,"749":0,"750":0,"754":0,"755":0,"759":0,"765":0,"767":0,"776":0,"779":0,"780":0,"801":0,"802":0,"822":0,"827":0,"828":0,"829":0,"830":0,"831":0,"832":0,"833":0,"834":0,"835":0,"836":0,"838":0,"839":0,"840":0,"841":0,"843":0,"844":0,"851":0,"855":0,"856":0,"862":0,"864":0,"866":0,"868":0,"870":0,"891":0,"895":0,"896":0,"897":0,"899":0,"901":0,"910":0,"911":0,"915":0,"920":0,"927":0,"930":0,"931":0,"933":0,"934":0,"935":0,"936":0,"937":0,"939":0,"940":0,"941":0,"942":0,"943":0,"947":0,"948":0,"949":0,"960":0,"970":0,"977":0,"980":0,"982":0,"983":0,"985":0,"989":0,"990":0,"991":0,"993":0,"994":0,"997":0,"1000":0,"1001":0,"1002":0,"1010":0,"1017":0,"1020":0,"1023":0,"1026":0,"1027":0,"1028":0,"1029":0,"1034":0,"1037":0,"1040":0,"1041":0,"1042":0,"1043":0,"1049":0,"1052":0,"1055":0,"1056":0,"1057":0,"1058":0,"1063":0,"1066":0,"1069":0,"1070":0,"1074":0,"1077":0,"1080":0,"1081":0,"1084":0,"1087":0,"1090":0,"1091":0,"1094":0,"1097":0,"1101":0,"1102":0,"1103":0,"1107":0,"1108":0,"1110":0,"1111":0,"1114":0,"1119":0,"1123":0,"1124":0,"1125":0,"1130":0,"1131":0,"1133":0,"1134":0,"1135":0,"1136":0,"1165":0,"1166":0,"1168":0,"1169":0,"1170":0,"1171":0,"1173":0,"1174":0,"1175":0,"1183":0,"1184":0,"1187":0,"1188":0,"1191":0,"1192":0,"1195":0,"1198":0,"1199":0,"1200":0,"1201":0,"1203":0,"1205":0,"1218":0,"1226":0,"1227":0,"1232":0,"1233":0,"1234":0,"1236":0,"1239":0,"1240":0,"1241":0,"1245":0,"1249":0,"1252":0,"1262":0,"1265":0,"1266":0,"1267":0,"1274":0,"1284":0,"1287":0,"1288":0,"1289":0,"1290":0,"1291":0,"1292":0,"1293":0,"1295":0,"1298":0,"1313":0,"1315":0,"1316":0,"1330":0,"1331":0,"1347":0,"1348":0,"1350":0,"1351":0,"1365":0,"1366":0,"1369":0,"1382":0,"1390":0,"1391":0,"1392":0,"1408":0,"1409":0,"1413":0,"1414":0,"1419":0,"1420":0,"1423":0,"1424":0,"1426":0,"1427":0,"1428":0,"1429":0,"1430":0,"1432":0,"1433":0,"1435":0,"1436":0,"1437":0,"1439":0,"1440":0,"1441":0,"1442":0,"1443":0,"1445":0,"1447":0,"1448":0,"1449":0,"1451":0,"1452":0,"1453":0,"1454":0,"1456":0,"1458":0,"1459":0,"1461":0,"1462":0,"1463":0,"1465":0,"1466":0,"1467":0,"1469":0,"1470":0,"1471":0,"1472":0,"1473":0,"1475":0,"1476":0,"1477":0,"1479":0,"1480":0,"1481":0,"1482":0,"1484":0,"1486":0,"1511":0,"1514":0,"1519":0,"1520":0,"1536":0,"1545":0,"1546":0,"1549":0,"1554":0,"1555":0,"1560":0,"1561":0,"1566":0,"1567":0,"1568":0,"1570":0,"1572":0,"1579":0,"1580":0,"1581":0,"1582":0,"1585":0,"1590":0,"1591":0,"1592":0,"1595":0,"1596":0,"1598":0,"1600":0,"1602":0,"1604":0,"1606":0,"1608":0,"1611":0,"1612":0,"1616":0,"1617":0,"1618":0,"1619":0,"1620":0,"1622":0,"1624":0,"1625":0,"1626":0,"1627":0,"1630":0,"1631":0,"1632":0,"1635":0,"1636":0,"1638":0,"1641":0,"1642":0,"1646":0,"1647":0,"1648":0,"1649":0,"1651":0,"1652":0,"1655":0,"1658":0,"1661":0,"1662":0,"1663":0,"1665":0,"1668":0,"1679":0,"1680":0,"1681":0,"1682":0,"1683":0,"1685":0,"1688":0,"1693":0,"1694":0,"1695":0,"1697":0,"1700":0,"1701":0,"1716":0,"1719":0,"1720":0,"1721":0,"1722":0,"1735":0,"1738":0,"1739":0,"1740":0,"1741":0,"1755":0,"1756":0,"1761":0,"1775":0,"1776":0,"1781":0,"1794":0,"1795":0,"1797":0,"1798":0,"1809":0,"1810":0,"1811":0,"1813":0,"1814":0,"1816":0,"1818":0,"1819":0,"1820":0,"1822":0,"1852":0,"1858":0,"1860":0,"1861":0,"1862":0,"1863":0,"1866":0,"1881":0,"1888":0,"1889":0,"1890":0,"1891":0,"1892":0,"1893":0,"1894":0,"1896":0,"1909":0,"1914":0,"1915":0,"1916":0,"1918":0,"1921":0,"1922":0,"1924":0,"1930":0,"1931":0,"1932":0,"1934":0,"1937":0,"1938":0,"1940":0,"1957":0,"1959":0,"1960":0,"1961":0,"1962":0,"1980":0,"1995":0,"1998":0,"2014":0,"2028":0,"2031":0,"2032":0,"2033":0,"2034":0,"2035":0,"2037":0,"2041":0,"2055":0,"2058":0,"2059":0,"2060":0,"2061":0,"2062":0,"2064":0,"2068":0,"2090":0,"2104":0,"2119":0,"2134":0,"2149":0,"2152":0,"2153":0,"2154":0,"2169":0,"2172":0,"2173":0,"2174":0,"2189":0,"2192":0,"2193":0,"2194":0,"2209":0,"2212":0,"2213":0,"2214":0,"2229":0,"2232":0,"2251":0,"2270":0,"2284":0,"2287":0,"2288":0,"2289":0,"2290":0,"2306":0,"2309":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSTEINT:105":0,"PARSE:109":0,"extractFileExtension:244":0,"isFileType:248":0,"getTreeInfo:252":0,"sortComparator:265":0,"(anonymous 2):273":0,"getByFileName:269":0,"(anonymous 3):290":0,"getByFileName:286":0,"(anonymous 4):342":0,"initializer:311":0,"(anonymous 5):432":0,"bindUI:356":0,"getCurrentDir:439":0,"getCurrentDirTreeNode:443":0,"(anonymous 6):453":0,"getSelectedFiles:447":0,"hideFlow:466":0,"hideTree:476":0,"showFlow:486":0,"showTree:496":0,"(anonymous 7):705":0,"sync:704":0,"destructor:717":0,"(anonymous 10):748":0,"(anonymous 9):745":0,"(anonymous 8):743":0,"(anonymous 11):766":0,"(anonymous 12):777":0,"_createPromises:740":0,"_allWidgetsRenderedPromise:800":0,"(anonymous 13):854":0,"_afterRender:821":0,"comparator:896":0,"_renderFiles:890":0,"(anonymous 14):929":0,"_renderViewSelect:914":0,"(anonymous 16):987":0,"(anonymous 15):979":0,"(anonymous 18):1033":0,"(anonymous 19):1048":0,"(anonymous 20):1062":0,"(anonymous 21):1073":0,"(anonymous 22):1083":0,"(anonymous 23):1093":0,"(anonymous 17):1019":0,"(anonymous 25):1113":0,"(anonymous 24):1109":0,"(anonymous 27):1174":0,"(anonymous 26):1165":0,"(anonymous 28):1187":0,"(anonymous 29):1198":0,"_renderToolbar:959":0,"(anonymous 31):1246":0,"(anonymous 32):1251":0,"load:1244":0,"(anonymous 30):1240":0,"(anonymous 33):1264":0,"_renderTree:1217":0,"(anonymous 34):1297":0,"_selectRootNode:1283":0,"_checkEndResizeApprovement:1312":0,"_checkResizeAprovement:1329":0,"(anonymous 35):1368":0,"_clearEventhandlers:1363":0,"_correctHeightAfterResize:1381":0,"]:1413":0,"(anonymous 36):1412":0,"_createMethods:1406":0,"_handleSyncError:1510":0,"(anonymous 37):1584":0,"(anonymous 38):1629":0,"(anonymous 39):1687":0,"_handleSync:1535":0,"_endResizeApprovement:1715":0,"_loadFilePane:1733":0,"_resizeTree:1754":0,"_resizeFlow:1774":0,"_setConstraints:1793":0,"_setSizeFlowArea:1851":0,"_setSizeTreeArea:1880":0,"_startResize:1908":0,"_stopResize:1956":0,"validator:1979":0,"validator:1994":0,"setter:1997":0,"validator:2013":0,"validator:2027":0,"setter:2030":0,"getter:2040":0,"validator:2054":0,"setter:2057":0,"getter:2067":0,"validator:2089":0,"validator:2103":0,"validator:2118":0,"validator:2133":0,"validator:2148":0,"setter:2151":0,"validator:2168":0,"setter:2171":0,"validator:2188":0,"setter:2191":0,"validator:2208":0,"setter:2211":0,"validator:2228":0,"setter:2231":0,"validator:2250":0,"validator:2269":0,"validator:2283":0,"setter:2286":0,"validator:2305":0,"setter:2308":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 554;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 115;
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
    EMPTY_BUTTONNODE = '<button class="pure-button pure-button-toolbar">{text}</button>',
    EMPTY_FILEUPLOADNODE = '<div class="pure-button pure-uploadbutton"></div>',
    FILEMAN_TITLE = 'Filemanager',
    FILEMAN_FOOTERTEMPLATE = "ready",
    FILEMANCLASSNAME = 'yui3-itsafilemanager',
    HIDDEN_CLASS = FILEMANCLASSNAME + '-hidden',
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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSTEINT", 105);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 106);
return parseInt(value, 10);
    },

    PARSE = function (response) {
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 109);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 110);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 111);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 112);
return YJSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 114);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 119);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 122);
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 244);
String.prototype.extractFileExtension = function() {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "extractFileExtension", 244);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 245);
return this.match(/.+\.(\w+)$/)[1];
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 248);
String.prototype.isFileType = function(extentions) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "isFileType", 248);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 249);
return (YArray.indexOf(extentions, this.extractFileExtension()) !== -1);
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 252);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 253);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 256);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 257);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 258);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
return treeField;
};

// Y.TreeView has no renderpromise, but doesn't need one: it renders synchronious
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 264);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.TreeView.Sortable], {
        sortComparator: function (node) {
            // directories are appended by char(0) --> this will make them appear on top
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 265);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 267);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
        },
        getByFileName: function(directoryTreeNode, filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 269);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 270);
var foundNode;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 271);
YArray.some(
                directoryTreeNode.children,
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 273);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 274);
if (!node.canHaveChildren && (node.label === filename)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 275);
foundNode = node;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 277);
return foundNode;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 280);
return foundNode;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 285);
Y.LazyFileModelList = Y.Base.create('lazyfile-model-list', Y.LazyModelList, [], {
        getByFileName: function (filename) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getByFileName", 286);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 287);
var instance = this,
                  foundModel;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 289);
instance.some(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 290);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 291);
if (model.filename === filename) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 292);
foundModel = model;
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 294);
return foundModel;
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 297);
return foundModel;
        }
    }
);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 302);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 311);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 312);
var instance = this,
                  boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 314);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 315);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 316);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 317);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 318);
instance._bodyNode = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 319);
instance._resizeEvent = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 320);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 321);
instance._panelHD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 322);
instance._panelBD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 323);
instance._panelFT = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
instance._nodeFilemanTree = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 325);
instance._nodeFilemanTreeView = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 326);
instance._nodeFilemanFlow = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 327);
instance._nodeFilemanItems = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 328);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 329);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 330);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 331);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 332);
instance._mouseOffset = 0;
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
boundingBox.addClass(HIDDEN_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 341);
(instance.get('delayView') ? instance.dataPromise : instance.readyPromise).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 342);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 343);
instance._setConstraints(true);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 344);
instance._correctHeightAfterResize();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 345);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 356);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 357);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 364);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 365);
instance.set('bodyContent', Lang.sub(FILEMAN_TEMPLATE, {root: 'root'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 366);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 367);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 368);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 369);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 370);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 371);
instance._panelFT.setStyle('display', 'none');
            }
/*
            instance.publish(EVT_ERROR, {
                preventable: false
            });
*/
            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 379);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 389);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 398);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 408);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 417);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 426);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 427);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 429);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 432);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 433);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 439);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 440);
return this._currentDir;
        },

        getCurrentDirTreeNode : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDirTreeNode", 443);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 444);
return this._currentDirTreeNode;
        },

        getSelectedFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getSelectedFiles", 447);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 448);
var instance = this,
                  selectedModels = instance.filescrollview.getSelectedModels(),
                  selectedFiles = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 451);
YArray.each(
                selectedModels,
                function(fileobject) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 453);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 454);
selectedFiles.push(fileobject.filename);
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 457);
return selectedFiles;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 466);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 467);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 476);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 477);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 486);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 487);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 496);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 497);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 704);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 705);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 705);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 706);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 717);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 718);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 720);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 721);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 723);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 724);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 725);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 726);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createPromises", 740);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 741);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 742);
instance._resizeConstrainPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 743);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 744);
instance.renderPromise().then(
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 745);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 746);
if (instance.hasPlugin('resize')) {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 747);
if (!instance.resize.hasPlugin('con')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 748);
Y.use('resize-constrain', function() {
                                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 748);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 749);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 750);
resolve();
                                    });
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 754);
instance.resize.con.set('preserveRatio', false);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 755);
resolve();
                                }
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 759);
resolve();
                            }
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 765);
instance.readyPromise = new Y.Promise(
                function(resolve) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 766);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 767);
instance.renderPromise().then(
                        Y.rbind(instance._afterRender, instance)
                    ).then(
                        Y.rbind(instance._allWidgetsRenderedPromise, instance)
                    ).then(
                        resolve
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 776);
instance.dataPromise = new Y.Promise(
                function(resolve) {
                    // only now we can call _createMethods --> because instance.readyPromise and instance.dataPromise are defined
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 777);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 779);
instance._createMethods();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 780);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_allWidgetsRenderedPromise", 800);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 801);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 802);
return Y.batch(
                 // NO instance.tree.renderPromise() --> Y.TreeView doesn't have/need a renderpromise, it renders synchronious.
                 instance._resizeConstrainPromise,
                 instance.filterSelect.renderPromise(),
//                 instance.viewSelect.renderPromise(),
                 instance.editSelect.renderPromise(),
                 instance.uploader.renderPromise(),
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 821);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 822);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  boundingBox = instance.get('boundingBox'),
                  nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 827);
instance._nodeFilemanToolbar = boundingBox.one('.'+FILEMAN_TOOLBAR_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 828);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 829);
instance._nodeFilemanTreeRoot = nodeFilemanTree.one('.'+FILEMAN_ROOTTREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 830);
instance._nodeFilemanTreeView = nodeFilemanTree.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 831);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 832);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 833);
instance._borderTreeArea = borderTreeArea = PARSTEINT(nodeFilemanTree.getStyle('borderRightWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 834);
instance._borderFlowArea = borderFlowArea = PARSTEINT(nodeFilemanFlow.getStyle('borderBottomWidth'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 835);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 836);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 838);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 839);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 840);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 841);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 843);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 844);
eventhandlers.push(
                    instance.resize.on(
                        'resize:resize',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 851);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        function() {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 13)", 854);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 855);
instance._correctHeightAfterResize();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 856);
instance.filescrollview.syncUI();
                        }
                    )
                );
            }
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 862);
instance._renderTree();
            // init the value of the current selected tree, but do not load the files
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 864);
instance._selectRootNode(true);
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 866);
instance._renderFiles();
            // now we create dd methods for moving the files:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 868);
instance._createDDFiles();
            // now we create the toolbar
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 870);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 890);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 891);
var instance = this,
                  files, rendermodel, filescrollview;

            // LazyFileModelList extends Y.LazyModelList and is declared at the top of this module
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 895);
instance.files = files = new Y.LazyFileModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 896);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 896);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 897);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 899);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 901);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                showLoadMessage: false,
                modelsSelectable: 'multi',
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 910);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 911);
filescrollview.render();
        },

        _renderViewSelect : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderViewSelect", 914);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 915);
var instance = this,
                  boundingBox = instance.get('boundingBox'),
                  filescrollview = instance.filescrollview,
                  viewSelectNode, viewSelect;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 920);
viewSelect = instance.viewSelect = new Y.ITSASelectList({
                items: VIEWITEMS,
                selectionOnButton: false,
                defaultButtonText: 'view',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 927);
viewSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 14)", 929);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 930);
var selecteditem = e.index;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 931);
switch (selecteditem) {
                        case 0:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 933);
filescrollview.setWithoutRerender('listType', 'table');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 934);
filescrollview.set('modelTemplate', LIST_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 935);
boundingBox.addClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 936);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 937);
break;
                        case 1:
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 939);
filescrollview.setWithoutRerender('listType', 'ul');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
filescrollview.set('modelTemplate', THUMBNAIL_TEMPLATE);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 941);
boundingBox.removeClass(FILEMAN_LIST_TEMPLATE_CLASS);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 942);
filescrollview.syncUI();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 943);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 947);
viewSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 948);
instance._nodeFilemanToolbar.append(viewSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 949);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderToolbar", 959);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 960);
var instance = this,
                  eventhandlers = instance._eventhandlers,
                  uploadURL = instance.get('uploadURL'),
                  filescrollview = instance.filescrollview,
                  filterSelect, editSelect, filterSelectNode, editSelectNode, shadowNode,
                  createDirNode, createUploadNode, selectedModels, multipleFiles, originalFilename, uploaderType, uploader;

            //=====================
            // render the filter-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 970);
filterSelect = instance.filterSelect = new Y.ITSASelectList({
                items: FILTERITEMS,
//                selectionOnButton: false,
                defaultItem: FILTERITEMS[0].text,
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 977);
filterSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 15)", 979);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 980);
var posibleExtentions = e.value.split(','),
                          contra = (posibleExtentions[0]==='!');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 982);
if (contra) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 983);
posibleExtentions.splice(0, 1);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 985);
instance.filescrollview.set(
                        'viewFilter',
                        function(fileitem) {
                            // isFileType is a prototype-method that is added to the String-class
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 16)", 987);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 989);
var filematch;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 990);
if (posibleExtentions[0]==='*') {
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 991);
return true;
                            }
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 993);
filematch = (fileitem.filename && fileitem.filename.isFileType(posibleExtentions));
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 994);
return contra ? !filematch : filematch;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 997);
filescrollview.syncUI();
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1000);
filterSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1001);
instance._nodeFilemanToolbar.append(filterSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1002);
filterSelect.render(filterSelectNode);

            // the viewselect will be used later on --> also make sure to update _allWidgetsRenderedPromise() !!!
            // instance._renderViewSelect();

            //=====================
            // render the edit-select:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1010);
editSelect = instance.editSelect = new Y.ITSASelectList({
                items: EDITITEMS,
                selectionOnButton: false,
                defaultButtonText: 'edit',
                btnSize: 1,
                buttonWidth: 60
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1017);
editSelect.after(
                'selectChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 17)", 1019);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1020);
var selecteditem = e.index,
                          filescrollview = instance.filescrollview,
                          currentName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1023);
switch (selecteditem) {
                        case 0:
                            // duplicate file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1026);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1027);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1028);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1029);
Y.confirm(
                                'Duplicate file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to duplicate the selected file'+(multipleFiles ? 's' : '')+'?')
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 18)", 1033);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1034);
instance.copyFiles(instance._currentDir);
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1037);
break;
                        case 1:
                            // rename file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1040);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1041);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1042);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1043);
Y.prompt(
                                'Rename file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Enter new filename:',
                                {value: originalFilename})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 19)", 1048);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1049);
instance.renameFiles(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1052);
break;
                        case 2:
                            // delete file(s)
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1055);
selectedModels = filescrollview.getSelectedModels();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1056);
multipleFiles = selectedModels && (selectedModels.length>1);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1057);
originalFilename = selectedModels && selectedModels[0].filename;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1058);
Y.confirm(
                                'Delete file'+(multipleFiles ? 's' : (' '+ originalFilename)),
                                'Are you sure you want to delete ' + (multipleFiles ? 'the selected files' : originalFilename) + '?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 20)", 1062);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1063);
instance.deleteFiles();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1066);
break;
                        case 3:
                            // clone dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1069);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1070);
Y.prompt('Duplicate directory '+currentName, 'Enter the directoryname of the duplicated directory:',
                                            {value: currentName+'-copy'})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 21)", 1073);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1074);
instance.cloneDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1077);
break;
                        case 4:
                            // rename dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1080);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1081);
Y.prompt('Rename directory '+currentName, 'Enter new directoryname:', {value: currentName})
                            .then(
                                function(response) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 22)", 1083);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1084);
instance.renameDir(Y.Escape.html(response.value));
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1087);
break;
                        case 5:
                            // delete dir
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1090);
currentName = instance._currentDirTreeNode.label;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1091);
Y.confirm('Delete directory', 'Are you sure you want to delete \''+currentName+'\'<br />and all of its content?')
                            .then(
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 23)", 1093);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1094);
instance.deleteDir();
                                }
                            );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1097);
break;
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1101);
editSelectNode = Y.Node.create(EMPTY_DIVNODE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1102);
instance._nodeFilemanToolbar.append(editSelectNode);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1103);
editSelect.render(editSelectNode);
            //=====================
            // render the create dir button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1107);
createDirNode = Y.Node.create(Lang.sub(EMPTY_BUTTONNODE, {text: 'create dir'}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1108);
eventhandlers.push(
                createDirNode.on('click', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 24)", 1109);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1110);
var currentName = instance._currentDirTreeNode.label;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1111);
Y.prompt('Create sub-directory of '+currentName, 'Enter new directory-name:', {value: 'New Directory'})
                    .then(
                        function(response) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 25)", 1113);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1114);
instance.createDir(Y.Escape.html(response.value));
                        }
                    );
                })
            );
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1119);
instance._nodeFilemanToolbar.append(createDirNode);
            //=====================
            // render the upload files button:
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1123);
if (uploadURL) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1124);
uploaderType = Y.Uploader.TYPE;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1125);
if (uploaderType === 'flash') {
                    // because the flashbutton seems not to be disabled (when told to),
                    // we overlay an extra div to prevent clicking on the flash-uploader.
                    // As soon as we upgrade uploader-queue to work with mutiple simultanious fileuploads,
                    // this feature can be removed (as well as the disabling of the upload-button during upload)
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1130);
shadowNode = Y.Node.create("<div class='block-button'></div>");
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1131);
instance._nodeFilemanToolbar.append(shadowNode);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1133);
createUploadNode = Y.Node.create(EMPTY_FILEUPLOADNODE);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1134);
instance._nodeFilemanToolbar.append(createUploadNode);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1135);
if (Y.Uploader.TYPE !== 'none') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1136);
uploader = instance.uploader = new Y.Uploader({
 //                   uploader = instance.uploader = new Y.UploaderFlash({
//                    uploader = instance.uploader = new Y.UploaderHTML5({
                        enabled: instance.get('uploaderEnabled'),
                        errorAction: instance.get('uploaderErrorAction'),
                        fileFieldName: instance.get('uploaderFileFieldName'),
                        uploadHeaders: instance.get('uploadHeaders'),
                        uploadURL: uploadURL,
                        withCredentials: instance.get('withHTML5Credentials'),
                        swfURL: instance.get('swfURL') + '?t=' + Math.random(),
                        tabElements: {
                            from: createDirNode,
                            to: filterSelect
                        },
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
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1165);
uploader.after('fileselect', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 26)", 1165);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
var fileList = e.fileList,
                              params = {};
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1168);
if (fileList.length > 0) {
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1169);
if (shadowNode) {
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1170);
shadowNode.addClass('blocked');
                               _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1171);
createUploadNode.addClass('pure-button-disabled');
                           }
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1173);
uploader.set('enabled', false);
                           _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1174);
YArray.each(fileList, function (fileInstance) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 27)", 1174);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1175);
params[fileInstance.get('id')] = Y.merge(
                                    instance.get('uploaderPostVars'),
                                    {
                                        currentDir: instance._currentDir,
                                        filename: fileInstance.get("name")
                                    }
                                );
                            });
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1183);
uploader.set('postVarsPerFile', params);
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1184);
uploader.uploadAll();
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1187);
uploader.on('uploadcomplete', function (e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 28)", 1187);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1188);
var response = PARSE(e.data),
                              error = response.error,
                              newfileobject = response.results;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1191);
if (error) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1192);
instance._handleSyncError(error && error.description, 'Upload '+ e.file.get('name'));
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1195);
instance.files.add(newfileobject);
                        }
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1198);
uploader.on('alluploadscomplete', function () {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 29)", 1198);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1199);
if (shadowNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1200);
shadowNode.removeClass('blocked');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1201);
createUploadNode.removeClass('pure-button-disabled');
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1203);
uploader.set('enabled', true);
                    });
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1205);
uploader.render(createUploadNode);
                }
            }
        },

        /**
         * Renders the tree-view by creating an Y.Tree inside the tree-pane.
         *
         * @method _renderTree
         * @private
         * @since 0.1
        */
        _renderTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 1217);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1218);
var instance = this,
                  rootnode = instance._nodeFilemanTreeRoot,
                  eventhandlers = instance._eventhandlers,
                  tree, lazyRender;

            //=====================
            // render Y.SortableTreeView
            //=====================
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1226);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1227);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1232);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1233);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1234);
if (instance._nodeFilemanTreeView.hasClass(TREEVIEW_NOTOUCH_CLASS)) {
                // this makes the root-node behave the same as the tree-nodes
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1236);
instance._nodeFilemanTreeRoot.addClass(TREEVIEW_NOTOUCH_CLASS);
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1239);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1240);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 30)", 1240);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1241);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 1244);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1245);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 31)", 1246);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1249);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 32)", 1251);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1252);
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
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1262);
tree.after(
                'sortableTreeView:select',
                function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 33)", 1264);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1265);
rootnode.removeAttribute('tabIndex');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1266);
rootnode.removeClass(TREEVIEW_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1267);
instance.filescrollview.clearSelectedModels(null, true);
                }
            );
            //============================
            // attach events to the rootnode the root node
            //============================
            // When clicked, set the right tab-index and load the rootfiles
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1274);
eventhandlers.push(
                rootnode.on(
                    'click',
                    instance._selectRootNode,
                    instance
                )
            );
        },

        _selectRootNode : function(withoutFileLoad) {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_selectRootNode", 1283);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1284);
var instance = this,
                  tree = instance.tree,
                  rootnode = instance._nodeFilemanTreeRoot;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1287);
rootnode.set('tabIndex', 0);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1288);
rootnode.addClass(TREEVIEW_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1289);
rootnode.focus();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1290);
instance._currentDir = '/';
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1291);
instance._currentDirTreeNode = tree.rootNode;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1292);
if (!withoutFileLoad) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1293);
instance.loadFiles();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1295);
YArray.each(
                tree.getSelectedNodes(),
                function(treenode) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 34)", 1297);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1298);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 1312);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1313);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1315);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1316);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 1329);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1330);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1331);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1348);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1350);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1351);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 1363);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1365);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1366);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 35)", 1368);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1369);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 1381);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1382);
var instance = this,
                  panelHD = instance._panelHD,
                  panelFT = instance._panelFT,
                  nodeFilemanItems = instance._nodeFilemanItems,
                  heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                  heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,
                  newHeightBD = PARSTEINT(instance.get('boundingBox').getStyle('height'))-heightPanelHD-heightPanelFT,
                  newHeightFiles = newHeightBD - instance.get('sizeFlowArea');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1390);
instance._panelBD.setStyle('height', newHeightBD+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1391);
if (nodeFilemanItems) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1392);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 1406);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1408);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1409);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFiles', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 36)", 1412);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1413);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 1413);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1414);
var options = {},
                              filescrollview = instance.filescrollview;
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1419);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1420);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1423);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1424);
options.currentDir = instance._currentDir;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1426);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1427);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1428);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1429);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1430);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1432);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1433);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1435);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1436);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1437);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1439);
if (syncaction === 'renameFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1440);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1441);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1442);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1443);
options.newFileName = param1;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1445);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1447);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1448);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1449);
options.newDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1451);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1452);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1453);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1454);
options.currentDir = instance._currentDir;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1456);
filescrollview.clearSelectedModels(null, true);
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1458);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1459);
options.currentDir = instance._currentDir;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1461);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1462);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1463);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1465);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1466);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1467);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1469);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1470);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1471);
options._currentDirTreeNode = instance._currentDirTreeNode;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1472);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1473);
options.destinationDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1475);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1476);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1477);
options.clonedDirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1479);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1480);
options.selectedFiles = YJSON.stringify(instance.getSelectedFiles());
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1481);
options.currentDir = instance._currentDir;
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1482);
options.destinationDir = param1;
                            // now unselect the selected files, for convenience experience
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1484);
filescrollview.clearSelectedModels(null, true);
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1486);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSyncError", 1510);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1511);
var instance = this,
                  facade;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1514);
facade = {
                options: options,
                error: reason,
                src: syncaction
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1519);
instance.fire(EVT_ERROR, facade);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1520);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_handleSync", 1535);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1536);
var instance = this,
                  parsedResponse = PARSE(response),
                  err = parsedResponse.error,
                  tree = instance.tree,
                  lazyRender = instance.get('lazyRender'),
                  showTreefiles = instance.get('showTreefiles'),
                  files = instance.files,
                  facade, changedTreeNode, dirName, parentnode, createdFiles, fileobject, filemodel, deletedFiles, fileDirectoryNode;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1545);
if (err) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1546);
return instance._handleSyncError(err.description || PROCESS_ERROR, syncaction, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1549);
facade = {
                    response: response,
                    options: options
                };
                // Lazy publish.
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1554);
if (!instance['_'+syncaction]) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1555);
instance['_'+syncaction] = instance.publish(syncaction, {
                        preventable: false
                    });
                }
                // now we need process the response
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1560);
if (syncaction === 'loadFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1561);
instance.files.reset(parsedResponse);
                }
//                else if (syncaction === 'loadAppendFiles') {
                    // ....
//                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1566);
if ((syncaction === 'loadTreeLazy') && lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1567);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1568);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1570);
tree.insertNode(param1, parsedResponse);
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1572);
if (syncaction === 'renameFiles') {
                    // should return an array with objects with the fields:
                    // {
                    //     filename: 'prev_filename.ext',
                    //     newfilename: 'new_filename.ext',
                    //     modified: 'modified datetimestring'
                    // }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1579);
createdFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1580);
if (createdFiles && createdFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1581);
fileDirectoryNode = options._currentDirTreeNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1582);
YArray.each(
                            createdFiles,
                            function(changedFileObject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 37)", 1584);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1585);
var previousFilename = changedFileObject.prevfilename,
                                      newFilename = changedFileObject.filename,
                                      modified = changedFileObject.modified,
                                      thumbnail = changedFileObject.thumbnail,
                                      preview = changedFileObject.preview;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1590);
if (showTreefiles && fileDirectoryNode) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1591);
changedTreeNode = tree.getByFileName(fileDirectoryNode, previousFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1592);
changedTreeNode.label = newFilename;
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1595);
fileobject = files.getByFileName(previousFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1596);
if (modified) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1598);
files.setModelAttr(fileobject, 'modified', modified, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1600);
if (thumbnail) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1602);
files.setModelAttr(fileobject, 'thumbnail', thumbnail, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1604);
if (preview) {
                                    // silent: do not force any refresh stuff --> that will be done after changing the filename
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1606);
files.setModelAttr(fileobject, 'preview', preview, {silent: true});
                                }
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1608);
files.setModelAttr(fileobject, 'filename', newFilename);
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1611);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1612);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1616);
if (syncaction === 'renameDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1617);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1618);
changedTreeNode.label = options.newDirName;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1619);
changedTreeNode.parent.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1620);
instance._currentDir = changedTreeNode.getTreeInfo('label') + '/';
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1622);
if (syncaction === 'deleteFiles') {
                    // should return an array with filenames that are deleted
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1624);
deletedFiles = parsedResponse.results;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1625);
if (deletedFiles && deletedFiles.length>0) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1626);
fileDirectoryNode = options._currentDirTreeNode;
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1627);
YArray.each(
                            deletedFiles,
                            function(deletedFilename) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 38)", 1629);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1630);
if (showTreefiles && fileDirectoryNode && fileDirectoryNode.state.loaded) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1631);
changedTreeNode = tree.getByFileName(fileDirectoryNode, deletedFilename);
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1632);
tree.removeNode(changedTreeNode, {remove: true, silent: false});
                                }
                                // find the right fileobject and update the corresponding fileobject inside instance.files
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1635);
fileobject = files.getByFileName(deletedFilename);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1636);
filemodel = files.revive(fileobject);
                                // no need to call the synclayer --> the file is already removed from the server
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1638);
filemodel.destroy({remove: false});
                            }
                        );
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1641);
if (showTreefiles && fileDirectoryNode) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1642);
fileDirectoryNode.sort(); // will rerender the children-nodes, making the new dirname visible as well.
                        }
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1646);
if (syncaction === 'deleteDir') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1647);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1648);
parentnode = changedTreeNode.parent;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1649);
tree.removeNode(changedTreeNode, {destroy: true});
                    // now select its parentnode
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1651);
if (parentnode === tree.rootNode) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1652);
instance._selectRootNode();
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1655);
tree.selectNode(parentnode);
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1658);
if (syncaction === 'createDir') {
                    // Be careful: when LazyRender and the node has no content yet, the new directory  must not be inserted
                    // Opening the treenode would load all subdirs and leads to double reference
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1661);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1662);
if (!lazyRender || changedTreeNode.state.loaded || (changedTreeNode === tree.rootNode)) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1663);
dirName = parsedResponse.results; // the directoryname that was created on the server .
                                                                                 // this can be different from the requested dirname.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1665);
tree.insertNode(changedTreeNode, {label: dirName, canHaveChildren: true});
                    }
                    // always open the node to let the new directory be shown
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1668);
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
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1679);
if (syncaction === 'copyFiles') {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1680);
createdFiles = parsedResponse.results; // array with fileobjects
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1681);
instance.files.add(createdFiles);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1682);
changedTreeNode = instance._currentDirTreeNode;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1683);
if (showTreefiles) {
                        // now add the files to the tree
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1685);
YArray.each(
                            createdFiles,
                            function(fileobject) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 39)", 1687);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1688);
tree.insertNode(changedTreeNode, {label: fileobject.filename});
                            }
                        );
                    }
                }
                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1693);
if ((syncaction === 'loadTree') && !lazyRender) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1694);
if (!instance._rootVisible) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1695);
instance._rootVisible = instance._nodeFilemanTreeRoot.removeClass(HIDDEN_CLASS);
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1697);
tree.insertNode(tree.rootNode, parsedResponse);
                }}}}}}}}}
                // end of processing, now fire event
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1700);
instance.fire(syncaction, facade);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1701);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1715);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1716);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1719);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1720);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1721);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1722);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1733);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1735);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1738);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1739);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1740);
instance._currentDirTreeNode = treenode;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1741);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1754);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1755);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1756);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1761);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1774);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1775);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1776);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1781);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1793);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1794);
if (activate) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1795);
this._constraintsSetable = true;
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1797);
if (this._constraintsSetable) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1798);
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
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1809);
if (pluginConstraints) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1810);
pluginConstraints.set('minWidth', minWidth);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1811);
pluginConstraints.set('minHeight', minHeight);
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1813);
if (PARSTEINT(boundingBox.getStyle('width'))<minWidth) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1814);
boundingBox.setStyle('width', minWidth+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1816);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1818);
if (PARSTEINT(boundingBox.getStyle('height'))<minHeight) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1819);
boundingBox.setStyle('height', minHeight+'px');
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1820);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                    // initiate areawidths
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1822);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1851);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1852);
var instance = this,
                  borderFlowArea = instance._borderFlowArea,
                  nodeFilemanFlow = instance._nodeFilemanFlow,
                  minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                  maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                  newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1858);
newHeight = Math.min(newHeight, maxHeight);
            // we need to check whether nodeFilemanFlow already exists
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1860);
if (nodeFilemanFlow) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1861);
nodeFilemanFlow.setStyle('height', newHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1862);
if (instance.resize && instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1863);
instance._setConstraints();
                }
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1866);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1880);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1881);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1888);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1889);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1890);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1891);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1892);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1893);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1894);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1896);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 1908);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1909);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1914);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1915);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1916);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1918);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1921);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1922);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1924);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1930);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1931);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1932);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1934);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1937);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1938);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1940);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 1956);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1957);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1959);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1960);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1961);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1962);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1979);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1980);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1994);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1995);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1997);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1998);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2013);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2014);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2027);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2028);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2030);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2031);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2032);
if (instance._nodeFilemanTree) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2033);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2034);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2035);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2037);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2040);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2041);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2054);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2055);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2057);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2058);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2059);
if (instance._nodeFilemanFlow) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2060);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2061);
if (instance.resize && instance.resize.hasPlugin('con')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2062);
instance._setConstraints();
                        }
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2064);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                    }
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 2067);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2068);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2089);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2090);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2103);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2104);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2118);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2119);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2133);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2134);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2148);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2149);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2151);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2152);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2153);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2154);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2168);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2169);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2171);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2172);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2173);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2174);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2188);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2189);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2191);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2192);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2193);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2194);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2208);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2209);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2211);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2212);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2213);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2214);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2228);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2229);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2231);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2232);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2250);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2251);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2269);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2270);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2283);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2284);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2286);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2287);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2288);
if (instance._panelFT) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2289);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2290);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 2305);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2306);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 2308);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 2309);
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
