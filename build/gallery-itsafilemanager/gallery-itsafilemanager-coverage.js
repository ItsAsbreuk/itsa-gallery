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
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].code=["YUI.add('gallery-itsafilemanager', function (Y, NAME) {","","'use strict';","","/**"," * ITSAFileManager"," *"," *"," * Panel-widget for uolaoding and controlling files and folders"," *"," *"," * @module gallery-itsafilemanager"," * @class ITSAFileManager"," * @extends Panel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","var Lang = Y.Lang,","    YArray = Y.Array,","    IE = Y.UA.ie,","    CHARZERO = '\\u0000',","    THUMBNAIL_TEMPLATE = '<img src=\"{thumbnail}\" />',","","    FILEMAN_TITLE = 'Filemanager',","","    FILEMAN_FOOTERTEMPLATE = \"ready\",","    FILEMANCLASSNAME = 'yui3-itsafilemanager',","    FILEMAN_TITLE_CLASS = FILEMANCLASSNAME + '-title',","    FILEMAN_BUTTONS_CLASS = FILEMANCLASSNAME + '-buttons',","    FILEMAN_HIDDEN = FILEMANCLASSNAME + '-hidden',","    FILEMAN_BORDER = FILEMANCLASSNAME + '-border',","    FILEMAN_SHADOW = FILEMANCLASSNAME + '-shadow',","    FILEMAN_RESIZINGX_CLASS = FILEMANCLASSNAME + '-itsaresehandlerx',","    FILEMAN_RESIZINGY_CLASS = FILEMANCLASSNAME + '-itsaresehandlery',","    FILEMAN_TREE_CLASS = FILEMANCLASSNAME + '-tree',","    FILEMAN_TREEVIEW_CLASS = FILEMANCLASSNAME + '-treeview',","    FILEMAN_MAIN_CLASS = FILEMANCLASSNAME + '-main',","    FILEMAN_FLOW_CLASS = FILEMANCLASSNAME + '-flow',","    FILEMAN_ITEMS_CLASS = FILEMANCLASSNAME + '-items',","    FILEMAN_HEADERTEMPLATE = '<div class=\"'+FILEMAN_TITLE_CLASS+'\">{title}</div><div class=\"'+FILEMAN_BUTTONS_CLASS+'\">edit</div>',","    FILEMAN_TEMPLATE = \"<div class='\"+FILEMAN_TREE_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_TREEVIEW_CLASS+\"'></div>\"+","                                        \"</div>\"+","                                        \"<div class='\"+FILEMAN_MAIN_CLASS+\"'>\"+","                                            \"<div class='\"+FILEMAN_FLOW_CLASS+\"'></div>\"+","                                            \"<div class='\"+FILEMAN_ITEMS_CLASS+\"'></div>\"+","                                        \"</div>\",","","   /**","     * Fired after the filemanager is completely rendered and ready to be used.","     * @event ready","     * @since 0.1","    **/","    EVT_READY = 'ready',","","   /**","     * Fired when an error occurs, such as when the sync layer returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. This is in fact the sync-action that caused the error.","     * @since 0.1","    **/","    EVT_ERROR = 'error',","","    PARSE = function (response) {","        if (typeof response === 'string') {","            try {","                return Y.JSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","   /**","     * Fired when the synclayer finishes the action 'loadFiles' succesfully.","     * @event loadFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'loadTree' succesfully.","     * @event loadTree","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameFile' succesfully.","     * @event renameFile","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'renameDir' succesfully.","     * @event renameDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteFiles' succesfully.","     * @event deleteFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'deleteDir' succesfully.","     * @event deleteDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'createDir' succesfully.","     * @event createDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveDir' succesfully.","     * @event moveDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'moveFiles' succesfully.","     * @event moveFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'cloneDir' succesfully.","     * @event cloneDir","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","   /**","     * Fired when the synclayer finishes the action 'copyFiles' succesfully.","     * @event copyFiles","     * @param e {EventFacade} Event Facade including:","     * @param e.response {Any} response from the server.","     * @param e.options {Object} Options that were passed when the action was called.","     * @since 0.1","    **/","","Y.Tree.Node.prototype.getTreeInfo = function(field) {","    var instance = this,","          treeField = instance.isRoot() ? '/' : '/' + instance[field],","          parentNode = instance.parent;","    while (parentNode && !parentNode.isRoot()) {","        treeField = '/' + parentNode[field] + treeField;","        parentNode = parentNode.parent;","    }","    return treeField;","};","","Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable]);","","Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {","","        /**","         * Initializes the File","         *","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this;","            instance._promiseReadyEvent = new Y.Promise(function (resolve) {","                instance.once(","                    EVT_READY,","                    resolve","                );","            });","            instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');","            instance._eventhandlers = [];","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            instance._bodyNode = null;","            instance._resizeEvent = null;","            instance._busyResize = false;","            instance._panelHD = null;","            instance._panelBD = null;","            instance._panelFT = null;","            instance._nodeFilemanTree = null;","            instance._nodeFilemanTreeView = null;","            instance._nodeFilemanFlow = null;","            instance._nodeFilemanItems = null;","            instance._borderTreeArea = 0;","            instance._halfBorderTreeArea = 0;","            instance._borderFlowArea = 0;","            instance._halfBorderFlowArea = 0;","            instance._mouseOffset = 0;","            instance._bodyNode = Y.one('body');","            instance._createMethods();","            instance.after(","                'render',","                instance._afterRender,","                instance","            );","        },","","        /**","         * Binding eventlisteners.","         *","         * @method bindUI","         * @since 0.1","        */","        bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                panelBD;","","            // bindUI comes before _afterRender, therefore we initialize the next properties here.","            instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));","            instance.set('bodyContent', FILEMAN_TEMPLATE);","            instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);","            instance._panelHD = contentBox.one('.yui3-widget-hd');","            panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');","            instance._panelFT = contentBox.one('.yui3-widget-ft');","            if (!instance.get('statusBar')) {","                instance._panelFT.setStyle('display', 'none');","            }","","            // when the mouse moves, while not resizing, you might be entering the area where resizing may start","            eventhandlers.push(","                panelBD.on(","                    ['mousemove', 'touchstart'],","                    instance._checkResizeAprovement,","                    instance","                )","            );","","            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.","            // In those cases this._resizeApproved needs to be set false","            eventhandlers.push(","                panelBD.on(","                    'mouseleave',","                    instance._checkEndResizeApprovement,","                    instance","                )","            );","","            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)","            eventhandlers.push(","                panelBD.on(","                    ['mousedown', 'touchstart'],","                    instance._startResize,","                    instance","                )","            );","","            // stop resizing when the mouse comes up","            // also stop resizing when the mouse leaves the body (while still might be in down state)","            eventhandlers.push(","                instance._bodyNode.on(","                    ['mouseup', 'mouseleave', 'touchend'],","                    instance._stopResize,","                    instance","                )","            );","","            // Listen when a tree node is selected","            eventhandlers.push(","                instance.on(","                    'sortableTreeView:select',","                    instance._loadFilePane,","                    instance","                )","            );","","            // Making sure any extended Class doesn't fail to react to the hide() and show() methods","            if (!instance.get('visible')) {","                    boundingBox.addClass(FILEMAN_HIDDEN);","            }","            eventhandlers.push(","                instance.after(","                    'visibleChange',","                    function(e) {","                        boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);","                    }","                )","            );","","            if (instance.hasPlugin('resize')) {","                eventhandlers.push(","                    instance.resize.on(","                        'resize:end',","                        instance._correctHeightAfterResize,","                        instance","                    )","                );","            }","","        },","","        /**","         * Promise that will be resolved as soon as the fileManager is completely ready to use.","         * Most internal methods rely on the state of this Promise.","         *","         * @method filemanagerReady","         * @return {Y.Promise} Promised value, which never gets rejected, but will be resolved as soon as the 'ready'-event gets fired.","         * @since 0.1","        */","        filemanagerReady : function() {","            return this._promiseReadyEvent;","        },","","        getCurrentDir : function() {","            return this._currentDir;","        },","","        /**","         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideFlow : function() {","            this.set('flow', false);","        },","","        /**","         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        hideTree : function() {","            this.set('tree', false);","        },","","        /**","         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showFlow : function() {","            this.set('flow', true);","        },","","        /**","         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.","         *","         * @method showFlow","         * @since 0.1","        */","        showTree : function() {","            this.set('tree', true);","        },","","        /**","         * Copies the selected directory on the server and updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method cloneDir","         * @param cloneDirname {String} Directory-name of the new to be created clone-directory","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Copies the selected files and places them in the optional directory.  Updates the  panes if appropriate.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method copyFiles","         * @param [destinationDir] {String} Directory where the copied files are to be placed. If not specified,","         *               then the current directory will be used.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Creates a new directory inside the selcted directory. Updates the treepane.","         * Is using the internal 'sync'-method to realize the update on the server. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method createDir","         * @param dirName {String} Directory-name to be created","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteDir","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Erases the selected files. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method deleteFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the files of the selected directory, using the internal 'sync'-method. See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method loadFiles","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to false.","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: It is used automaticly at rendering.","         *","         * @method loadTree","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Loads the tree-structure of a treenode, using the internal 'sync'-method. See 'sync' how to set up the synclayer.<br />","         * <b>Remark 1</b>: you can only use this method when the attribute 'lazyRender' is set to true.<br />","         * <b>Remark 2</b>: with normal usage, you don't need to call this method: Y.Tree is using it automaticly.","         *","         * @method loadTreeLazy","         * @param node {Y.Tree.Node} the treenode which should be loaded.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveDir","         * @param newParentDir {String} New parent-directory where 'dir' will be placed inside.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Moves the selected files into another directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method moveFiles","         * @param dirName {String} New directory where the files should be placed.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * Renames the selected directory. Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameDir","         * @param newDirname {String} New directoy-name.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","        /**","         * renames the selected file. When multiple files are selected, they will all get the smae name, followed by '_index'.","         * Is using the internal 'sync'-method to realize the update on the server.","         * See 'sync' how to set up the synclayer.","         * <br /><b>Remark</b>: with normal usage, you don't need to call this method: Y.Tree is using it through the UI.","         *","         * @method renameFile","         * @param newFilename {String} new filename for the selected file","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","         * @since 0.1","        */","","      /**","         * Override this method to provide a custom persistence implementation for this","         * FileManager. The default just returns a solved Promise without actually doing anything.<br />","         * <b>Best practice:</b> always end the method with a 'reject()'-command which handles all undeclared sync-actions.","         * <br /><br />","         * The next  actions should be declared:<br />","         * <br />","         * `cloneDir`: Clones a directory.","         * <br />'options.currentDir' --> selected directory to be cloned.<br />","         *                                                    'options.cloneDirname'  --> new directory name.<br />","         * <br />","         * `copyFiles`: Copies selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be copied<br />","         *            'options.destinationDir'  --> directory name where the files should be copied to.<br />","         * <br />","         * `createDir`: Creates a directory.","         * <br />'options.currentDir' --> current directory wherein the new directory will be created<br />","         *                                                      'options.dirName'  --> the new directory name.<br />","         * <br />","         * `deleteDir`: Erases a directory.","         * <br />'options.currentDir' --> current directory which will be erased<br />","         * <br />","         * `deleteFiles`: Erases the selected files.","         * <br />'options.selectedFiles' --> the selected files that will be erased<br />","         * <br />","         * `loadFiles`: Loads all the files of the current directory in the filepane: response must be in a form that can pass","         *                     throught to Y.LazyModelList (items-attribute)<br />","         *                     'options.currentDir'  --> current directory which files should be loaded<br />","         * <br />","         * `loadAppendFiles`: Loads a limited amount of files (of the current directory) in the filepane: response must be in a form","         *                                 that can pass throught to Y.LazyModelList (items-attribute)<br />","         *                                 <b>caution</b>The sync-action must use options.batchSize --> the number of responsed files is compared","         *                                 with this value in order to know when no more requests are needed.<br />","         *                     'options.currentDir'  --> current directory which files should be loaded<br />","         *                     'options.batchSize'  --> number of files to be downloaded from the server<br />","         *                     'options.size'  --> current number of files to be downloaded from the server<br />","         *                     'options.lastFileId'  --> Model-id of the last file that is already available in the filepane<br />","         * <br />","         * `loadTree`: Loads the tree-structure: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                     'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `loadTreeLazy`: Loads the tree-structure of one treenode: must be in a form that can pass through to Y.TreeView (nodes-attribute).<br />","         *                           'options.directory' --> the directory which content should be loaded.<br />","         *                           'options.showTreefiles' --> whether files should be loaded into the treestructure","         *                                                                  (passed through from the attribute 'showTreefiles')<br />","         * <br />","         * `moveDir`: Moves a directory.","         * <br />'options.currentDir' --> selected directory to be moved.<br />","         *                                                   'options.newParentDir'  --> the name of the new parent-directory.<br />","         * <br />","         * `moveFiles`: Moves the selected files.","         * <br />'options.selectedFiles' --> the selected files that needs to be moved<br />","         *            'options.dirName'  holds the name of the directory where the files should be placed.<br />","         * <br />","         * `renameDir`: Renames a directory.","         * <br />'options.currentDir' --> current directory which will be renamed<br />","         *                                                           'options.newDirname'  holds the new directory-name.<br />","         * <br />","         * `renameFile` : Renames the selected file.","         * <br />'options.selectedFiles' --> the selected files that needs to be renamed<br />","         *                                                                     'options.newFilename'  holds the new file-name.","         *","         * @method sync","         * @param action {String} The sync-action to perform. May be one of the following:","         *         *","         * @param [options] {Object} Sync options. At this moment the only sync-command that gets options is 'loadTree'.","         * options.showTreeFiles is true/false (based on the attribute 'showTreeFiles'). It's up to the custom sync","         * implementation to determine how to handle 'options'.","        */","        sync: function (/* action, options */) {","            return new Y.Promise(function (resolve, reject) {","                reject(new Error('The sync()-method was not overridden'));","            });","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._resizeEvent) {","                instance._resizeEvent.detach();","            }","            instance._clearEventhandlers();","            instance.files.destroy();","            instance.filescrollview.destroy();","            instance.tree.destroy();","        },","","        //=====================================================================","        // private functions","        //=====================================================================","","        /**","         * Method that starts after the Panel has rendered. Inside this method the bodysection is devided into multiple area's","         * and the dd- and resize-pluging are activated (if appropriate)","         *","         * @method _afterRender","         * @private","         * @since 0.1","        */","        _afterRender : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;","","            // extend the time that the widget is invisible","            boundingBox.toggleClass('yui3-itsafilemanager-loading', true);","            instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);","            instance._nodeFilemanTreeView = boundingBox.one('.'+FILEMAN_TREEVIEW_CLASS);","            instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);","            instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);","            instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);","            instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);","            instance._halfBorderTreeArea = Math.round(borderTreeArea/2);","            instance._halfBorderFlowArea = Math.round(borderFlowArea/2);","            // initiate areawidths","            instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            if (instance.hasPlugin('dd')) {","                instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);","            }","            if (instance.hasPlugin('resize')) {","                if (!instance.resize.hasPlugin('con')) {","                    Y.use('resize-constrain', function() {","                        instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});","                        instance._setConstraints();","                        boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","                    });","                }","                else {","                    instance.resize.con.set('preserveRatio', false);","                    instance._setConstraints();","                    boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","                }","            }","            else {","                // set to minimal sizes, even when no resizeplugin is set","                instance._setConstraints();","                boundingBox.toggleClass('yui3-itsafilemanager-loading', false);","            }","            // init the value of the current selected tree","            instance._currentDir  = '/';","            // now we create the directory tree","            instance._renderTree();","            // now we create the files tree:","            instance._renderFiles();","            // fire 'ready'-event:","            instance.fire(EVT_READY);","        },","","        /**","         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.","         *","         * @method _renderFiles","         * @private","         * @since 0.1","        */","        _renderFiles : function() {","            var instance = this,","                  files, rendermodel, filescrollview;","","            instance.files = files = new Y.LazyModelList();","            files.comparator = function (model) {","                return model.filename || '';","            };","            rendermodel = THUMBNAIL_TEMPLATE;","","            instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({","                boundingBox: instance._nodeFilemanItems,","                height:'394px',"," //               width:'240px',","                modelTemplate: rendermodel,","                axis: 'y',","                modelListStyled: false,","                modelList: files","            });","            filescrollview.addTarget(instance);","            filescrollview.render();","            instance.loadFiles();","        },","","        /**","         * Renders the tree-view by creating an Y.Tree inside the tree-pane.","         *","         * @method _renderTree","         * @private","         * @since 0.1","        */","        _renderTree : function() {","            var instance = this,","                  tree, lazyRender;","","            lazyRender = instance.get('lazyRender');","            instance.tree = tree = new Y.SortableTreeView({","                container: instance._nodeFilemanTreeView,","                lazyRender: lazyRender,","                multiSelect: false, // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown","                sortComparator: function (node) {","                    // directories are appended by char(0) --> this will make them appear on top","                    return (node.canHaveChildren ? CHARZERO : '') + node.label;","                }","            });","            tree.addTarget(instance);","            tree.render();","            if (lazyRender) {","                instance.loadTreeLazy();","            }","            else {","                instance.loadTree();","            }","            // If lazyRender the setup its callbackfunc:","            if (lazyRender) {","                Y.use('tree-lazy', function() {","                    tree.plug(Y.Plugin.Tree.Lazy, {","                        // Custom function that Plugin.Tree.Lazy will call when it needs to","                        // load the children for a node.","                        load: function (node, callback) {","                            instance.loadTreeLazy(node).then(","                                function() {","                                    // Call the callback function to tell Plugin.Tree.Lazy that","                                    // we're done loading data.","                                    callback();","                                },","                                function(err) {","                                    callback(new Error(err));","                                }","                            );","                        }","                    });","                });","            }","        },","","        /**","         * Check whether whether the cursor -of resizing of the innersections- should be toggled of.","         * This needs to happen when the mouse leaves the bd-section.","         *","         * @method _checkEndResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _checkEndResizeApprovement : function() {","            var instance = this;","","            if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {","                instance._endResizeApprovement();","            }","        },","","        /**","         * Toggles the cursor when it moves above the edges of the innersections (tree- and flow-Area)","         *","         * @method _checkResizeAprovement","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _checkResizeAprovement : function(e) {","            if (!this._busyResize) {","                var instance = this,","                    panelBD = instance._panelBD,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    mouseX = e.pageX,","                    mouseY = e.pageY,","                    panelBDX = panelBD.getX(),","                    panelBDY = panelBD.getY(),","                    contentBox = instance.get('contentBox'),","                    tree = instance.get('tree'),","                    flow = instance.get('flow'),","                    flowHeight = nodeFilemanFlow.get('offsetHeight'),","                    resizeMargin = Y.UA.mobile ? instance.get('resizeMarginTouchDevice') : instance.get('resizeMargin'),","                    halfResizeMargin = Math.round(resizeMargin/2),","                    offsetX = Math.abs(mouseX - panelBDX + instance._halfBorderTreeArea),","                    offsetY = Math.abs(mouseY - (panelBDY+flowHeight-instance._halfBorderFlowArea));","","                instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);","                instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)","                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));","                contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);","                contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, instance._resizeApprovedY);","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","","            var instance = this;","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Resets the height of panel-bd after  resizing the panel.","         *","         * @method _correctHeightAfterResize","         * @private","         * @since 0.1","        */","        _correctHeightAfterResize : function() {","            var instance = this,","                panelHD = instance._panelHD,","                panelFT = instance._panelFT,","                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;","            instance._panelBD.setStyle('height', (parseInt(instance.get('boundingBox').getStyle('height'), 10)-heightPanelHD-heightPanelFT)+'px');","        },","","        _createMethods : function() {","","            var instance = this,","                  tree;","            YArray.each(","                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFile', 'renameDir', 'deleteFiles',","                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],","                function (syncaction) {","                    instance[syncaction] = function(param1) {","                        var options = {},","                              facade;","                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.","                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event","                        // that makes the Promise 'filemanagerReady' fulfilled.","                        if (!instance.get('rendered')) {","                            instance.render();","                        }","                        // now we must extend options for each action","                        if (syncaction === 'loadFiles') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'loadAppendFiles') {","                            options.currentDir = instance.getCurrentDir();","                            options.batchSize = instance.get('batchSize');","                            options.size = instance.files.size();","                            options.lastFileId = instance._lastFileId;","                        }","                        else if (syncaction === 'loadTree') {","                            options.showTreefiles = instance.get('showTreefiles');","                        }","                        else if (syncaction === 'loadTreeLazy') {","                            options.showTreefiles = instance.get('showTreefiles');","                            options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');","                        }","                        else if (syncaction === 'renameFile') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.newFilename = param1;","                        }","                        else if (syncaction === 'renameDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newDirname = param1;","                        }","                        else if (syncaction === 'deleteFiles') {","                            options.selectedFiles =  instance.getSelectedFiles();","                        }","                        else if (syncaction === 'deleteDir') {","                            options.currentDir = instance.getCurrentDir();","                        }","                        else if (syncaction === 'createDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.dirName = param1;","                        }","                        else if (syncaction === 'moveDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.newParentDir = param1;","                        }","                        else if (syncaction === 'moveFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.dirName = param1;","                        }","                        else if (syncaction === 'cloneDir') {","                            options.currentDir = instance.getCurrentDir();","                            options.cloneDirname = param1;","                        }","                        else if (syncaction === 'copyFiles') {","                            options.selectedFiles = instance.getSelectedFiles();","                            options.destinationDir = param1;","                        }","                        facade = {","                            options: options","                        };","                        return instance.filemanagerReady()","                        .then(","                            Y.bind(instance.sync, instance, syncaction, options)","                        )","                        .then(","                            function(response) {","                                // Lazy publish.","                                if (!instance['_'+syncaction]) {","                                    instance['_'+syncaction] = instance.publish(syncaction, {","                                        preventable: false","                                    });","                                }","                                // now we need process the response","                                if (syncaction === 'loadFiles') {","                                    instance.files.reset(PARSE(response));","                                }","                                else if (syncaction === 'loadAppendFiles') {","                                    // ....","                                }","                                else if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {","                                    instance.tree.insertNode(param1, PARSE(response));","                                }","                                else if (syncaction === 'renameFile') {","                                    // ....","                                }","                                else if (syncaction === 'renameDir') {","                                    // ....","                                }","                                else if (syncaction === 'deleteFiles') {","                                    // ....","                                }","                                else if (syncaction === 'deleteDir') {","                                    // ....","                                }","                                else if (syncaction === 'createDir') {","                                    // ....","                                }","                                else if (syncaction === 'moveDir') {","                                    // ....","                                }","                                else if (syncaction === 'moveFiles') {","                                    // ....","                                }","                                else if (syncaction === 'cloneDir') {","                                    // ....","                                }","                                else if (syncaction === 'copyFiles') {","                                    // ....","                                }","                                else if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {","                                    tree = instance.tree;","                                    tree.insertNode(tree.rootNode, PARSE(response));","                                }","                                // end of processing, now fire event","                                facade.response = response;","                                instance.fire(syncaction, facade);","                                return response;","                            },","                            function(err) {","                                facade.error = err;","                                facade.src = syncaction;","                                instance.fire(EVT_ERROR, facade);","                                return err;","                            }","                        );","                    };","                }","            );","        },","","        /**","         * Will toggle-off the cursor col-resize","         *","         * @method _endResizeApprovement","         * @private","         * @protected","         * @since 0.1","        */","        _endResizeApprovement: function() {","            var instance = this,","                contentBox = instance.get('contentBox');","","            instance._resizeApprovedX = false;","            instance._resizeApprovedY = false;","            contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);","            contentBox.toggleClass(FILEMAN_RESIZINGY_CLASS, false);","        },","","        /**","         * Loads the filepane after a directory from the Tree is selected.","         *","         * @method _loadFilePane","         * @param e {EventTarget}","         * @private","         * @since 0.1","        */","        _loadFilePane : function(e) {","","            var instance = this,","                  treenode = e.node;","","            if (treenode.canHaveChildren) {","                instance._currentDir = treenode.getTreeInfo('label') + '/';","                instance.loadFiles();","            }","        },","","        /**","         * Resizes the tree-section.","         *","         * @method _resizeTree","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeTree : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanTree = instance._nodeFilemanTree,","                    nodeX = nodeFilemanTree.getX(),","                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);","","                instance.set('sizeTreeArea', newWidth);","            }","        },","","        /**","         * Resizes the flow-section.","         *","         * @method _resizeFlow","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _resizeFlow : function(e) {","            if (this._busyResize) {","                var instance = this,","                    nodeFilemanFlow = instance._nodeFilemanFlow,","                    nodeY = nodeFilemanFlow.getY(),","                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);","","                instance.set('sizeFlowArea', newHeight);","            }","        },","","        /**","         * Makes the panel- and inner-sections sizes adjusted between the right dimensions.","         * The dimensions are determined by 'tree', 'flow', 'sizeTreeArea', 'sizeFlowArea', 'minWidthFileArea' and 'minHeightFileArea'.","         *","         * @method _setConstraints","         * @private","         * @since 0.1","        */","        _setConstraints : function() {","            var instance = this,","                pluginConstraints = instance.resize && instance.resize.con,","                panelHD = instance._panelHD,","                panelFT = instance._panelFT,","                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,","                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0,","                minWidth = (instance.get('tree') ? Math.max(instance.get('sizeTreeArea'), instance._borderTreeArea) : 0) +","                                    instance.get('minWidthFileArea'),","                minHeight = (instance.get('flow') ? Math.max(instance.get('sizeFlowArea'), instance._borderFlowArea) : 0) +","                                      instance.get('minHeightFileArea') + heightPanelHD + heightPanelFT,","                boundingBox = instance.get('boundingBox');","            if (pluginConstraints) {","                pluginConstraints.set('minWidth', minWidth);","                pluginConstraints.set('minHeight', minHeight);","            }","            if (parseInt(boundingBox.getStyle('width'), 10)<minWidth) {","                boundingBox.setStyle('width', minWidth+'px');","                // initiate areawidths","                instance.set('sizeTreeArea', instance.get('sizeTreeArea'));","            }","            if (parseInt(boundingBox.getStyle('height'), 10)<minHeight) {","                boundingBox.setStyle('height', minHeight+'px');","                instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');","                // initiate areawidths","                instance.set('sizeFlowArea', instance.get('sizeFlowArea'));","            }","        },","","        /**","         * Setter for attribute showTreeFiles.","         *","         * @method _setShowTreefiles","         * @param val {Boolean} new value","         * @private","         * @protected","         * @since 0.1","        */","        _setShowTreefiles : function(val) {","","        },","","        /**","         * Setter for attribute sizeFlowArea.","         *","         * @method _startResize","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'minSizeFlowArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeFlowArea : function(val, attribute, forceZero) {","            var instance = this,","                borderFlowArea = instance._borderFlowArea,","                minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),","                maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,","                newHeight = Math.max(val-borderFlowArea, minHeight);","            newHeight = Math.min(newHeight, maxHeight);","            instance._nodeFilemanFlow.setStyle('height', newHeight+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newHeight;","        },","","        /**","         * Setter for attribute sizeTreeArea.","         *","         * @method _startResize","         * @param val {Int} new value","         * @param [attribute] {String} name of the attribute","         * @param [forceZero] {Boolean} set to true to force setting a zero value, instead of restricting to 'sizeTreeArea'","         * @private","         * @protected","         * @since 0.1","        */","        _setSizeTreeArea : function(val, attribute, forceZero) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                borderTreeArea = instance._borderTreeArea,","                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),","                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),","                newWidth = Math.max(val, minWidth),","                realTreeWidth;","            newWidth = Math.min(newWidth, maxWidth);","            realTreeWidth = newWidth - borderTreeArea;","            nodeFilemanTree.setStyle('width', realTreeWidth+'px');","            nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');","            instance._panelBD.setStyle('marginLeft', newWidth+'px');","            if (instance.resize && instance.resize.hasPlugin('con')) {","                instance._setConstraints();","            }","            return newWidth;","        },","","        /**","         * Attaches the resize-event to an innersection (tree or flow)","         *","         * @method _startResize","         * @param e {EventTarget}","         * @private","         * @protected","         * @since 0.1","        */","        _startResize : function(e) {","            var instance = this,","                nodeFilemanTree = instance._nodeFilemanTree,","                nodeFilemanFlow = instance._nodeFilemanFlow,","                nodeX, nodeY, nodeWidth, nodeHeight;","","            if (instance._resizeApprovedX) {","                instance._busyResize = true;","                nodeX = nodeFilemanTree.getX(),","                nodeWidth = nodeFilemanTree.get('offsetWidth');","                instance._mouseOffset = e.pageX-(nodeX+nodeWidth);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeTree,","                    instance","                );","            }","            else if (instance._resizeApprovedY) {","                instance._busyResize = true;","                nodeY = nodeFilemanFlow.getY(),","                nodeHeight = nodeFilemanFlow.get('offsetHeight');","                instance._mouseOffset = e.pageY-(nodeY+nodeHeight);","                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize","                // in some cases/error the event still seems to be there","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","                instance._resizeEvent = instance._bodyNode.on(","                    ['mousemove', 'touchmove'],","                    instance._resizeFlow,","                    instance","                );","            }","        },","","        /**","         * Detaches a resize-event of an innersection (tree or flow)","         *","         * @method _stopResize","         * @private","         * @protected","         * @since 0.1","        */","        _stopResize : function() {","            var instance = this;","","            if (instance._busyResize) {","                instance._busyResize = false;","                if (instance._resizeEvent) {","                    instance._resizeEvent.detach();","                }","            }","        }","","    }, {","        ATTRS : {","","            /**","             * Defines how may file should be requested when the sync-action: 'loadAppendFiles' is used.","             * @attribute batchSize","             * @type Int","             * @default 500","             * @since 0.1","            */","            batchSize: {","                value: 500,","                validator: function(val) {","                    return (typeof val === 'number') && (val>0);","                }","            },","","            /**","             * Defines whether the panel has a border","             * @attribute border","             * @type Boolean","             * @default true","             * @since 0.1","            */","            border: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_BORDER, val);","                }","            },","","            /**","             * Defines whether the tree-pane is visible","             * @attribute tree","             * @default true","             * @type Boolean","             * @since 0.1","            */","            tree: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanTree.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the flow-pane is visible","             * @attribute flow","             * @default false","             * @type Boolean","             * @since 0.1","            */","            flow: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                    instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);","                },","                getter: function() {","                    return this._nodeFilemanFlow.getStyle('display')!=='none';","                }","            },","","            /**","             * Defines whether the tree is lazy: every subdirectory will be loaded by itself, not deep.<br />","             * Can only be set during initialization.<br /><br />","             * <b>Caution:</b><br />","             * When true, you need to setup the sync-action 'loadTreeLazy'.<br />","             * When false, you need to setup the sync-action 'loadTree'.<br /><br />","             * lazyRender can significantly speed up the time it takes to render a large","             * tree, but might not make sense if you're using CSS that doesn't hide the","             * contents of closed nodes, or when your directory-structure has no children.","             * @attribute lazyRender","             * @default false","             * @type Boolean","             * @since 0.1","            */","            lazyRender: {","                value: false,","                writeOnce: 'initOnly',","                validator: function(val) {","                    return (typeof val === 'boolean');","                }","            },","","            /**","             * Defines whether the tree-pane shows files as well. Only visible when 'tree' is set to true.","             * @attribute showTreefiles","             * @default false","             * @type Boolean","             * @since 0.1","            */","            showTreefiles: {","                value: false,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: '_setShowTreefiles'","            },","","            /**","             * Defines width of the tree-pane. Only visible when 'tree' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeTreeArea: {","                value: 200,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeTreeArea'","            },","","            /**","             * Height of the flow-pane. Only visible when 'flow' is set to true.","             * @attribute sizeTreeArea","             * @default 200","             * @type Int","             * @since 0.1","            */","            sizeFlowArea: {","                value: 150,","                validator: function(val) {","                    return (typeof val === 'number');","                },","                setter: '_setSizeFlowArea'","            },","","            /**","             * Defines minimum-posible width of the tree-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeTreeArea","             * @type int","             * @since 0.1","            */","            minSizeTreeArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the flow-pane. Only visible when 'tree' is set to true.","             * @default 100","             * @attribute minSizeFlowArea","             * @type int","             * @since 0.1","            */","            minSizeFlowArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible width of the file-pane. Must be a number>=50.","             * @default 200","             * @attribute minWidthFileArea","             * @type int","             * @since 0.1","            */","            minWidthFileArea: {","                value: 200,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Defines minimum-posible height of the file-pane. Must be a number>=50.","             * @default 100","             * @attribute minHeightFileArea","             * @type int","             * @since 0.1","            */","            minHeightFileArea: {","                value: 100,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=50));","                },","                setter: function() {","                    var instance = this;","                    if (instance.resize && instance.resize.hasPlugin('con')) {","                        instance._setConstraints();","                    }","                }","            },","","            /**","             * Filemanager's title.","             * @default 'filemanager'","             * @attribute title","             * @type String","             * @since 0.1","            */","            title: {","                value: FILEMAN_TITLE,","                validator: function(val) {","                    return (typeof val === 'string');","                },","                setter: function(val) {","                    this.set('headerContent', val);","                }","            },","","            /**","             * @description Width of the area where the mouse turns into col-resize<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMarginTouchDevice, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 6","             * @attribute resizeMargin","             * @type int","             * @since 0.1","            */","            resizeMargin: {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>=2) && (val<=60));","                }","            },","","            /**","             * @description Width of the area where you can resize in touchdevices.<br>","             * The value corresponds with an area that overlaps 2 columns (50% each)<br>","             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>","             * While resizeMarginTouchDevice will be used on mobile devices<br>","             * minimum value = 2<br>","             * maximum value = 60","             * @default 32","             * @attribute resizeMarginTouchDevice","             * @type int","             * @since 0.1","            */","            resizeMarginTouchDevice: {","                value: 32,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=2) && (val<=60));","                }","            },","","            /**","             * Whether the statusBar is visible.","             * @default true","             * @attribute statusBar","             * @type Boolean","             * @since 0.1","            */","            statusBar: {","                value: true,","                validator: function(val) {","                    return (typeof val === 'boolean');","                },","                setter: function(val) {","                    var instance = this;","                    instance._panelFT.setStyle('display', (val ? '' : 'none'));","                    instance._correctHeightAfterResize();","                }","            },","","            /**","             * Whether the filemanager has a shadowbox.","             * @default true","             * @attribute shadow","             * @type Boolean","             * @since 0.1","            */","            shadow: {","                value: true,","                lazyAdd: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                },","                setter: function(val) {","                    this.get('boundingBox').toggleClass(FILEMAN_SHADOW, val);","                }","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"panel\",","        \"node-base\",","        \"node-screen\",","        \"node-event-delegate\",","        \"event-mouseenter\",","        \"event-custom\",","        \"event-touch\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"gallery-sm-treeview\",","        \"gallery-itsascrollviewmodellist\",","        \"gallery-itsawidgetrenderpromise\",","        \"promise\",","        \"json-parse\",","        \"tree-sortable\"","    ],","    \"skinnable\": false","});"];
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].lines = {"1":0,"3":0,"24":0,"73":0,"74":0,"75":0,"77":0,"82":0,"85":0,"187":0,"188":0,"191":0,"192":0,"193":0,"195":0,"198":0,"200":0,"210":0,"211":0,"212":0,"217":0,"218":0,"219":0,"220":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"238":0,"252":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"270":0,"280":0,"289":0,"299":0,"308":0,"317":0,"318":0,"320":0,"324":0,"329":0,"330":0,"350":0,"354":0,"364":0,"374":0,"384":0,"394":0,"597":0,"598":0,"610":0,"612":0,"613":0,"615":0,"616":0,"617":0,"618":0,"634":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"645":0,"646":0,"647":0,"649":0,"650":0,"651":0,"652":0,"654":0,"655":0,"656":0,"657":0,"658":0,"659":0,"663":0,"664":0,"665":0,"670":0,"671":0,"674":0,"676":0,"678":0,"680":0,"691":0,"694":0,"695":0,"696":0,"698":0,"700":0,"709":0,"710":0,"711":0,"722":0,"725":0,"726":0,"732":0,"735":0,"736":0,"737":0,"738":0,"741":0,"744":0,"745":0,"746":0,"750":0,"754":0,"757":0,"776":0,"778":0,"779":0,"793":0,"794":0,"810":0,"811":0,"813":0,"814":0,"828":0,"829":0,"832":0,"845":0,"850":0,"855":0,"857":0,"861":0,"862":0,"867":0,"868":0,"871":0,"872":0,"874":0,"875":0,"876":0,"877":0,"878":0,"880":0,"881":0,"883":0,"884":0,"885":0,"887":0,"888":0,"889":0,"891":0,"892":0,"893":0,"895":0,"896":0,"898":0,"899":0,"901":0,"902":0,"903":0,"905":0,"906":0,"907":0,"909":0,"910":0,"911":0,"913":0,"914":0,"915":0,"917":0,"918":0,"919":0,"921":0,"924":0,"931":0,"932":0,"937":0,"938":0,"940":0,"943":0,"944":0,"946":0,"949":0,"952":0,"955":0,"958":0,"961":0,"964":0,"967":0,"970":0,"973":0,"974":0,"975":0,"978":0,"979":0,"980":0,"983":0,"984":0,"985":0,"986":0,"1003":0,"1006":0,"1007":0,"1008":0,"1009":0,"1022":0,"1025":0,"1026":0,"1027":0,"1041":0,"1042":0,"1047":0,"1061":0,"1062":0,"1067":0,"1080":0,"1091":0,"1092":0,"1093":0,"1095":0,"1096":0,"1098":0,"1100":0,"1101":0,"1102":0,"1104":0,"1133":0,"1138":0,"1139":0,"1140":0,"1141":0,"1143":0,"1158":0,"1165":0,"1166":0,"1167":0,"1168":0,"1169":0,"1170":0,"1171":0,"1173":0,"1186":0,"1191":0,"1192":0,"1193":0,"1195":0,"1198":0,"1199":0,"1201":0,"1207":0,"1208":0,"1209":0,"1211":0,"1214":0,"1215":0,"1217":0,"1234":0,"1236":0,"1237":0,"1238":0,"1239":0,"1257":0,"1272":0,"1275":0,"1289":0,"1292":0,"1293":0,"1294":0,"1295":0,"1297":0,"1300":0,"1314":0,"1317":0,"1318":0,"1319":0,"1320":0,"1322":0,"1325":0,"1347":0,"1361":0,"1376":0,"1391":0,"1406":0,"1409":0,"1410":0,"1411":0,"1426":0,"1429":0,"1430":0,"1431":0,"1446":0,"1449":0,"1450":0,"1451":0,"1466":0,"1469":0,"1470":0,"1471":0,"1486":0,"1489":0,"1508":0,"1527":0,"1541":0,"1544":0,"1545":0,"1546":0,"1561":0,"1564":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].functions = {"PARSE:72":0,"getTreeInfo:187":0,"(anonymous 2):211":0,"initializer:209":0,"(anonymous 3):323":0,"bindUI:251":0,"filemanagerReady:349":0,"getCurrentDir:353":0,"hideFlow:363":0,"hideTree:373":0,"showFlow:383":0,"showTree:393":0,"(anonymous 4):597":0,"sync:596":0,"destructor:609":0,"(anonymous 5):656":0,"_afterRender:633":0,"comparator:695":0,"_renderFiles:690":0,"sortComparator:730":0,"(anonymous 7):751":0,"(anonymous 8):756":0,"load:749":0,"(anonymous 6):745":0,"_renderTree:721":0,"_checkEndResizeApprovement:775":0,"_checkResizeAprovement:792":0,"(anonymous 9):831":0,"_clearEventhandlers:826":0,"_correctHeightAfterResize:844":0,"(anonymous 11):929":0,"(anonymous 12):982":0,"]:861":0,"(anonymous 10):860":0,"_createMethods:853":0,"_endResizeApprovement:1002":0,"_loadFilePane:1020":0,"_resizeTree:1040":0,"_resizeFlow:1060":0,"_setConstraints:1079":0,"_setSizeFlowArea:1132":0,"_setSizeTreeArea:1157":0,"_startResize:1185":0,"_stopResize:1233":0,"validator:1256":0,"validator:1271":0,"setter:1274":0,"validator:1288":0,"setter:1291":0,"getter:1299":0,"validator:1313":0,"setter:1316":0,"getter:1324":0,"validator:1346":0,"validator:1360":0,"validator:1375":0,"validator:1390":0,"validator:1405":0,"setter:1408":0,"validator:1425":0,"setter:1428":0,"validator:1445":0,"setter:1448":0,"validator:1465":0,"setter:1468":0,"validator:1485":0,"setter:1488":0,"validator:1507":0,"validator:1526":0,"validator:1540":0,"setter:1543":0,"validator:1560":0,"setter:1563":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredLines = 323;
_yuitest_coverage["build/gallery-itsafilemanager/gallery-itsafilemanager.js"].coveredFunctions = 74;
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
     * Fired after the filemanager is completely rendered and ready to be used.
     * @event ready
     * @since 0.1
    **/
    EVT_READY = 'ready',

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
        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "PARSE", 72);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 73);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 74);
try {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 75);
return Y.JSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 77);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 82);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 85);
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

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 187);
Y.Tree.Node.prototype.getTreeInfo = function(field) {
    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getTreeInfo", 187);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 188);
var instance = this,
          treeField = instance.isRoot() ? '/' : '/' + instance[field],
          parentNode = instance.parent;
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 191);
while (parentNode && !parentNode.isRoot()) {
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 192);
treeField = '/' + parentNode[field] + treeField;
        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 193);
parentNode = parentNode.parent;
    }
    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 195);
return treeField;
};

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 198);
Y.SortableTreeView = Y.Base.create('sortableTreeView', Y.TreeView, [Y.Tree.Sortable]);

_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 200);
Y.ITSAFileManager = Y.Base.create('itsafilemanager', Y.Panel, [], {

        /**
         * Initializes the File
         *
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "initializer", 209);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 210);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 211);
instance._promiseReadyEvent = new Y.Promise(function (resolve) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 2)", 211);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 212);
instance.once(
                    EVT_READY,
                    resolve
                );
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 217);
instance._inlineblock = 'inline' + (((IE>0) && (IE<8)) ? '' : '-block');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 218);
instance._eventhandlers = [];
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 219);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 220);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 221);
instance._bodyNode = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 222);
instance._resizeEvent = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 223);
instance._busyResize = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 224);
instance._panelHD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 225);
instance._panelBD = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 226);
instance._panelFT = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 227);
instance._nodeFilemanTree = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 228);
instance._nodeFilemanTreeView = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 229);
instance._nodeFilemanFlow = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 230);
instance._nodeFilemanItems = null;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 231);
instance._borderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 232);
instance._halfBorderTreeArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 233);
instance._borderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 234);
instance._halfBorderFlowArea = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 235);
instance._mouseOffset = 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 236);
instance._bodyNode = Y.one('body');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 237);
instance._createMethods();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 238);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "bindUI", 251);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 252);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                panelBD;

            // bindUI comes before _afterRender, therefore we initialize the next properties here.
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 259);
instance.set('headerContent', Lang.sub(FILEMAN_HEADERTEMPLATE, {title: instance.get('title')}));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 260);
instance.set('bodyContent', FILEMAN_TEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 261);
instance.set('footerContent', FILEMAN_FOOTERTEMPLATE);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 262);
instance._panelHD = contentBox.one('.yui3-widget-hd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 263);
panelBD = instance._panelBD = contentBox.one('.yui3-widget-bd');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 264);
instance._panelFT = contentBox.one('.yui3-widget-ft');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 265);
if (!instance.get('statusBar')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 266);
instance._panelFT.setStyle('display', 'none');
            }

            // when the mouse moves, while not resizing, you might be entering the area where resizing may start
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 270);
eventhandlers.push(
                panelBD.on(
                    ['mousemove', 'touchstart'],
                    instance._checkResizeAprovement,
                    instance
                )
            );

            // mouse might leave the thead when the state was this._resizeApproved, but not this._busyResize.
            // In those cases this._resizeApproved needs to be set false
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 280);
eventhandlers.push(
                panelBD.on(
                    'mouseleave',
                    instance._checkEndResizeApprovement,
                    instance
                )
            );

            // on mousedown, you might be starting resizing (depending on the value of this._resizeApproved)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 289);
eventhandlers.push(
                panelBD.on(
                    ['mousedown', 'touchstart'],
                    instance._startResize,
                    instance
                )
            );

            // stop resizing when the mouse comes up
            // also stop resizing when the mouse leaves the body (while still might be in down state)
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 299);
eventhandlers.push(
                instance._bodyNode.on(
                    ['mouseup', 'mouseleave', 'touchend'],
                    instance._stopResize,
                    instance
                )
            );

            // Listen when a tree node is selected
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 308);
eventhandlers.push(
                instance.on(
                    'sortableTreeView:select',
                    instance._loadFilePane,
                    instance
                )
            );

            // Making sure any extended Class doesn't fail to react to the hide() and show() methods
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 317);
if (!instance.get('visible')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 318);
boundingBox.addClass(FILEMAN_HIDDEN);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 320);
eventhandlers.push(
                instance.after(
                    'visibleChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 3)", 323);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 324);
boundingBox.toggleClass(FILEMAN_HIDDEN, !e.newVal);
                    }
                )
            );

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 329);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 330);
eventhandlers.push(
                    instance.resize.on(
                        'resize:end',
                        instance._correctHeightAfterResize,
                        instance
                    )
                );
            }

        },

        /**
         * Promise that will be resolved as soon as the fileManager is completely ready to use.
         * Most internal methods rely on the state of this Promise.
         *
         * @method filemanagerReady
         * @return {Y.Promise} Promised value, which never gets rejected, but will be resolved as soon as the 'ready'-event gets fired.
         * @since 0.1
        */
        filemanagerReady : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "filemanagerReady", 349);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 350);
return this._promiseReadyEvent;
        },

        getCurrentDir : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getCurrentDir", 353);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 354);
return this._currentDir;
        },

        /**
         * Sugarmethod to hide the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideFlow", 363);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 364);
this.set('flow', false);
        },

        /**
         * Sugarmethod to hide the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        hideTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "hideTree", 373);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 374);
this.set('tree', false);
        },

        /**
         * Sugarmethod to show the flow. Passes through to the 'flow' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showFlow : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showFlow", 383);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 384);
this.set('flow', true);
        },

        /**
         * Sugarmethod to show the tree. Passes through to the 'tree' attribute.
         *
         * @method showFlow
         * @since 0.1
        */
        showTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "showTree", 393);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 394);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sync", 596);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 597);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 4)", 597);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 598);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "destructor", 609);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 610);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 612);
if (instance._resizeEvent) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 613);
instance._resizeEvent.detach();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 615);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 616);
instance.files.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 617);
instance.filescrollview.destroy();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 618);
instance.tree.destroy();
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_afterRender", 633);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 634);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                nodeFilemanTree, nodeFilemanFlow, borderTreeArea, borderFlowArea;

            // extend the time that the widget is invisible
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 639);
boundingBox.toggleClass('yui3-itsafilemanager-loading', true);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 640);
instance._nodeFilemanTree = nodeFilemanTree = boundingBox.one('.'+FILEMAN_TREE_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 641);
instance._nodeFilemanTreeView = boundingBox.one('.'+FILEMAN_TREEVIEW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 642);
instance._nodeFilemanFlow = nodeFilemanFlow = boundingBox.one('.'+FILEMAN_FLOW_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 643);
instance._nodeFilemanItems = boundingBox.one('.'+FILEMAN_ITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 644);
instance._borderTreeArea = borderTreeArea = parseInt(nodeFilemanTree.getStyle('borderRightWidth'), 10);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 645);
instance._borderFlowArea = borderFlowArea = parseInt(nodeFilemanFlow.getStyle('borderBottomWidth'), 10);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 646);
instance._halfBorderTreeArea = Math.round(borderTreeArea/2);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 647);
instance._halfBorderFlowArea = Math.round(borderFlowArea/2);
            // initiate areawidths
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 649);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 650);
instance.set('sizeFlowArea', instance.get('sizeFlowArea'));
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 651);
if (instance.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 652);
instance.dd.addHandle('.'+FILEMAN_TITLE_CLASS);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 654);
if (instance.hasPlugin('resize')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 655);
if (!instance.resize.hasPlugin('con')) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 656);
Y.use('resize-constrain', function() {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 5)", 656);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 657);
instance.resize.plug(Y.Plugin.ResizeConstrained, {preserveRatio: false});
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 658);
instance._setConstraints();
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 659);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                    });
                }
                else {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 663);
instance.resize.con.set('preserveRatio', false);
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 664);
instance._setConstraints();
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 665);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
                }
            }
            else {
                // set to minimal sizes, even when no resizeplugin is set
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 670);
instance._setConstraints();
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 671);
boundingBox.toggleClass('yui3-itsafilemanager-loading', false);
            }
            // init the value of the current selected tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 674);
instance._currentDir  = '/';
            // now we create the directory tree
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 676);
instance._renderTree();
            // now we create the files tree:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 678);
instance._renderFiles();
            // fire 'ready'-event:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 680);
instance.fire(EVT_READY);
        },

        /**
         * Renders the file-view by creating an Y.ScrollViewModelList inside the file-pane.
         *
         * @method _renderFiles
         * @private
         * @since 0.1
        */
        _renderFiles : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderFiles", 690);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 691);
var instance = this,
                  files, rendermodel, filescrollview;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 694);
instance.files = files = new Y.LazyModelList();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 695);
files.comparator = function (model) {
                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "comparator", 695);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 696);
return model.filename || '';
            };
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 698);
rendermodel = THUMBNAIL_TEMPLATE;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 700);
instance.filescrollview = filescrollview = new Y.ITSAScrollViewModellist({
                boundingBox: instance._nodeFilemanItems,
                height:'394px',
 //               width:'240px',
                modelTemplate: rendermodel,
                axis: 'y',
                modelListStyled: false,
                modelList: files
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 709);
filescrollview.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 710);
filescrollview.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 711);
instance.loadFiles();
        },

        /**
         * Renders the tree-view by creating an Y.Tree inside the tree-pane.
         *
         * @method _renderTree
         * @private
         * @since 0.1
        */
        _renderTree : function() {
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_renderTree", 721);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 722);
var instance = this,
                  tree, lazyRender;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 725);
lazyRender = instance.get('lazyRender');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 726);
instance.tree = tree = new Y.SortableTreeView({
                container: instance._nodeFilemanTreeView,
                lazyRender: lazyRender,
                multiSelect: false, // leave false, because multiselect a dir makes inconsistancy about which dirfiles should be shown
                sortComparator: function (node) {
                    // directories are appended by char(0) --> this will make them appear on top
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "sortComparator", 730);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 732);
return (node.canHaveChildren ? CHARZERO : '') + node.label;
                }
            });
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 735);
tree.addTarget(instance);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 736);
tree.render();
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 737);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 738);
instance.loadTreeLazy();
            }
            else {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 741);
instance.loadTree();
            }
            // If lazyRender the setup its callbackfunc:
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 744);
if (lazyRender) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 745);
Y.use('tree-lazy', function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 6)", 745);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 746);
tree.plug(Y.Plugin.Tree.Lazy, {
                        // Custom function that Plugin.Tree.Lazy will call when it needs to
                        // load the children for a node.
                        load: function (node, callback) {
                            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "load", 749);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 750);
instance.loadTreeLazy(node).then(
                                function() {
                                    // Call the callback function to tell Plugin.Tree.Lazy that
                                    // we're done loading data.
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 7)", 751);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 754);
callback();
                                },
                                function(err) {
                                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 8)", 756);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 757);
callback(new Error(err));
                                }
                            );
                        }
                    });
                });
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkEndResizeApprovement", 775);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 776);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 778);
if ((instance._resizeApprovedX || instance._resizeApprovedY) && !instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 779);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_checkResizeAprovement", 792);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 793);
if (!this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 794);
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

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 810);
instance._resizeApprovedX = tree && (offsetX<=halfResizeMargin);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 811);
instance._resizeApprovedY = flow && (offsetY<=halfResizeMargin)
                                            && (!tree || (mouseX>(panelBDX+halfResizeMargin)));
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 813);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, instance._resizeApprovedX);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 814);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_clearEventhandlers", 826);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 828);
var instance = this;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 829);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 9)", 831);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 832);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_correctHeightAfterResize", 844);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 845);
var instance = this,
                panelHD = instance._panelHD,
                panelFT = instance._panelFT,
                heightPanelHD = panelHD ? panelHD.get('offsetHeight') : 0,
                heightPanelFT = panelFT ? panelFT.get('offsetHeight') : 0;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 850);
instance._panelBD.setStyle('height', (parseInt(instance.get('boundingBox').getStyle('height'), 10)-heightPanelHD-heightPanelFT)+'px');
        },

        _createMethods : function() {

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_createMethods", 853);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 855);
var instance = this,
                  tree;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 857);
YArray.each(
                ['loadFiles', 'loadMoreFiles', 'loadTree', 'loadTreeLazy', 'renameFile', 'renameDir', 'deleteFiles',
                 'deleteDir', 'createDir', 'moveDir', 'moveFiles', 'cloneDir', 'copyFiles'],
                function (syncaction) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 10)", 860);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 861);
instance[syncaction] = function(param1) {
                        _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "]", 861);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 862);
var options = {},
                              facade;
                        // in order to handle the syncaction well, the filemanager-instance must have been rendered.
                        // If not, then we render it now. At the very end or renderer(), there will be an 'instance.ready'-event
                        // that makes the Promise 'filemanagerReady' fulfilled.
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 867);
if (!instance.get('rendered')) {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 868);
instance.render();
                        }
                        // now we must extend options for each action
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 871);
if (syncaction === 'loadFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 872);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 874);
if (syncaction === 'loadAppendFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 875);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 876);
options.batchSize = instance.get('batchSize');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 877);
options.size = instance.files.size();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 878);
options.lastFileId = instance._lastFileId;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 880);
if (syncaction === 'loadTree') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 881);
options.showTreefiles = instance.get('showTreefiles');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 883);
if (syncaction === 'loadTreeLazy') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 884);
options.showTreefiles = instance.get('showTreefiles');
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 885);
options.directory = (param1 ? (param1.getTreeInfo('label') + '/') : '/');
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 887);
if (syncaction === 'renameFile') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 888);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 889);
options.newFilename = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 891);
if (syncaction === 'renameDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 892);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 893);
options.newDirname = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 895);
if (syncaction === 'deleteFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 896);
options.selectedFiles =  instance.getSelectedFiles();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 898);
if (syncaction === 'deleteDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 899);
options.currentDir = instance.getCurrentDir();
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 901);
if (syncaction === 'createDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 902);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 903);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 905);
if (syncaction === 'moveDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 906);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 907);
options.newParentDir = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 909);
if (syncaction === 'moveFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 910);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 911);
options.dirName = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 913);
if (syncaction === 'cloneDir') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 914);
options.currentDir = instance.getCurrentDir();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 915);
options.cloneDirname = param1;
                        }
                        else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 917);
if (syncaction === 'copyFiles') {
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 918);
options.selectedFiles = instance.getSelectedFiles();
                            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 919);
options.destinationDir = param1;
                        }}}}}}}}}}}}}
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 921);
facade = {
                            options: options
                        };
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 924);
return instance.filemanagerReady()
                        .then(
                            Y.bind(instance.sync, instance, syncaction, options)
                        )
                        .then(
                            function(response) {
                                // Lazy publish.
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 11)", 929);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 931);
if (!instance['_'+syncaction]) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 932);
instance['_'+syncaction] = instance.publish(syncaction, {
                                        preventable: false
                                    });
                                }
                                // now we need process the response
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 937);
if (syncaction === 'loadFiles') {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 938);
instance.files.reset(PARSE(response));
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 940);
if (syncaction === 'loadAppendFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 943);
if ((syncaction === 'loadTreeLazy') && instance.get('lazyRender')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 944);
instance.tree.insertNode(param1, PARSE(response));
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 946);
if (syncaction === 'renameFile') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 949);
if (syncaction === 'renameDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 952);
if (syncaction === 'deleteFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 955);
if (syncaction === 'deleteDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 958);
if (syncaction === 'createDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 961);
if (syncaction === 'moveDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 964);
if (syncaction === 'moveFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 967);
if (syncaction === 'cloneDir') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 970);
if (syncaction === 'copyFiles') {
                                    // ....
                                }
                                else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 973);
if ((syncaction === 'loadTree') && !instance.get('lazyRender')) {
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 974);
tree = instance.tree;
                                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 975);
tree.insertNode(tree.rootNode, PARSE(response));
                                }}}}}}}}}}}}}
                                // end of processing, now fire event
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 978);
facade.response = response;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 979);
instance.fire(syncaction, facade);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 980);
return response;
                            },
                            function(err) {
                                _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "(anonymous 12)", 982);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 983);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 984);
facade.src = syncaction;
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 985);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 986);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_endResizeApprovement", 1002);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1003);
var instance = this,
                contentBox = instance.get('contentBox');

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1006);
instance._resizeApprovedX = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1007);
instance._resizeApprovedY = false;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1008);
contentBox.toggleClass(FILEMAN_RESIZINGX_CLASS, false);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1009);
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

            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_loadFilePane", 1020);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1022);
var instance = this,
                  treenode = e.node;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1025);
if (treenode.canHaveChildren) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1026);
instance._currentDir = treenode.getTreeInfo('label') + '/';
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1027);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeTree", 1040);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1041);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1042);
var instance = this,
                    nodeFilemanTree = instance._nodeFilemanTree,
                    nodeX = nodeFilemanTree.getX(),
                    newWidth = Math.round(e.pageX-nodeX-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1047);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_resizeFlow", 1060);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1061);
if (this._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1062);
var instance = this,
                    nodeFilemanFlow = instance._nodeFilemanFlow,
                    nodeY = nodeFilemanFlow.getY(),
                    newHeight = Math.round(e.pageY-nodeY-instance._mouseOffset);

                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1067);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setConstraints", 1079);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1080);
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
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1091);
if (pluginConstraints) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1092);
pluginConstraints.set('minWidth', minWidth);
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1093);
pluginConstraints.set('minHeight', minHeight);
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1095);
if (parseInt(boundingBox.getStyle('width'), 10)<minWidth) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1096);
boundingBox.setStyle('width', minWidth+'px');
                // initiate areawidths
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1098);
instance.set('sizeTreeArea', instance.get('sizeTreeArea'));
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1100);
if (parseInt(boundingBox.getStyle('height'), 10)<minHeight) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1101);
boundingBox.setStyle('height', minHeight+'px');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1102);
instance._panelBD.setStyle('height', (minHeight - heightPanelHD - heightPanelFT)+'px');
                // initiate areawidths
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1104);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeFlowArea", 1132);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1133);
var instance = this,
                borderFlowArea = instance._borderFlowArea,
                minHeight = (forceZero ? 0 : Math.max(instance.get('minSizeFlowArea')-borderFlowArea, 0)),
                maxHeight = instance._panelBD.get('offsetHeight')-instance.get('minHeightFileArea')-borderFlowArea,
                newHeight = Math.max(val-borderFlowArea, minHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1138);
newHeight = Math.min(newHeight, maxHeight);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1139);
instance._nodeFilemanFlow.setStyle('height', newHeight+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1140);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1141);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1143);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_setSizeTreeArea", 1157);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1158);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                borderTreeArea = instance._borderTreeArea,
                minWidth = (forceZero ? 0 : Math.max(instance.get('minSizeTreeArea'), borderTreeArea)),
                maxWidth = instance.get('contentBox').get('offsetWidth')-instance.get('minWidthFileArea'),
                newWidth = Math.max(val, minWidth),
                realTreeWidth;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1165);
newWidth = Math.min(newWidth, maxWidth);
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1166);
realTreeWidth = newWidth - borderTreeArea;
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1167);
nodeFilemanTree.setStyle('width', realTreeWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1168);
nodeFilemanTree.setStyle('marginLeft', -newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1169);
instance._panelBD.setStyle('marginLeft', newWidth+'px');
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1170);
if (instance.resize && instance.resize.hasPlugin('con')) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1171);
instance._setConstraints();
            }
            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1173);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_startResize", 1185);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1186);
var instance = this,
                nodeFilemanTree = instance._nodeFilemanTree,
                nodeFilemanFlow = instance._nodeFilemanFlow,
                nodeX, nodeY, nodeWidth, nodeHeight;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1191);
if (instance._resizeApprovedX) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1192);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1193);
nodeX = nodeFilemanTree.getX(),
                nodeWidth = nodeFilemanTree.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1195);
instance._mouseOffset = e.pageX-(nodeX+nodeWidth);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1198);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1199);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1201);
instance._resizeEvent = instance._bodyNode.on(
                    ['mousemove', 'touchmove'],
                    instance._resizeTree,
                    instance
                );
            }
            else {_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1207);
if (instance._resizeApprovedY) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1208);
instance._busyResize = true;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1209);
nodeY = nodeFilemanFlow.getY(),
                nodeHeight = nodeFilemanFlow.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1211);
instance._mouseOffset = e.pageY-(nodeY+nodeHeight);
                // always clear instance._resizeEvent, even if it should have been cleared by _stopResize
                // in some cases/error the event still seems to be there
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1214);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1215);
instance._resizeEvent.detach();
                }
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1217);
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
            _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "_stopResize", 1233);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1234);
var instance = this;

            _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1236);
if (instance._busyResize) {
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1237);
instance._busyResize = false;
                _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1238);
if (instance._resizeEvent) {
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1239);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1256);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1257);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1271);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1272);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1274);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1275);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1288);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1289);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1291);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1292);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1293);
instance._nodeFilemanTree.setStyle('display', (val ? instance._inlineblock : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1294);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1295);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1297);
instance._setSizeTreeArea((val ? instance.get('sizeTreeArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1299);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1300);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1313);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1314);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1316);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1317);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1318);
instance._nodeFilemanFlow.setStyle('display', (val ? 'block' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1319);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1320);
instance._setConstraints();
                    }
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1322);
instance._setSizeFlowArea((val ? instance.get('sizeFlowArea') : 0), null, true);
                },
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "getter", 1324);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1325);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1346);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1347);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1360);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1361);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1375);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1376);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1390);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1391);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1405);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1406);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1408);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1409);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1410);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1411);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1425);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1426);
return ((typeof val === 'number') && (val>=0));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1428);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1429);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1430);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1431);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1445);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1446);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1448);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1449);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1450);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1451);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1465);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1466);
return ((typeof val === 'number') && (val>=50));
                },
                setter: function() {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1468);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1469);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1470);
if (instance.resize && instance.resize.hasPlugin('con')) {
                        _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1471);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1485);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1486);
return (typeof val === 'string');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1488);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1489);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1507);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1508);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1526);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1527);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1540);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1541);
return (typeof val === 'boolean');
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1543);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1544);
var instance = this;
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1545);
instance._panelFT.setStyle('display', (val ? '' : 'none'));
                    _yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1546);
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
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "validator", 1560);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1561);
return Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsafilemanager/gallery-itsafilemanager.js", "setter", 1563);
_yuitest_coverline("build/gallery-itsafilemanager/gallery-itsafilemanager.js", 1564);
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
