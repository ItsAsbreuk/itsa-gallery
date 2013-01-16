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
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsatoolbar/gallery-itsatoolbar.js",
    code: []
};
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"].code=["YUI.add('gallery-itsatoolbar', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsatoolbar"," */","","/**"," * Editor Toolbar Plugin"," * "," *"," * @class Plugin.ITSAToolbar"," * @extends Plugin.Base"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","","    ITSA_BTNNODE = \"<button class='yui3-button'></button>\",","    ITSA_BTNINNERNODE = \"<span class='itsa-button-icon'></span>\",","    ITSA_BTNPRESSED = 'yui3-button-active',","    ITSA_BTNACTIVE = 'itsa-button-active',","    ITSA_BTNINDENT = 'itsa-button-indent',","    ITSA_BUTTON = 'itsa-button',","    ITSA_BTNSYNC = 'itsa-syncbutton',","    ITSA_BTNTOGGLE = 'itsa-togglebutton',","    ITSA_BTNGROUP = 'itsa-buttongroup',","    ITSA_BTNCUSTOMFUNC = 'itsa-button-customfunc',","    ITSA_TOOLBAR_TEMPLATE = \"<div class='itsatoolbar'></div>\",","    ITSA_TOOLBAR_SMALL = 'itsa-buttonsize-small',","    ITSA_TOOLBAR_MEDIUM = 'itsa-buttonsize-medium',","    ITSA_CLASSEDITORPART = 'itsatoolbar-editorpart',","    ITSA_SELECTCONTNODE = '<div></div>',","    ITSA_TMPREFNODE = \"<img id='itsatoolbar-tmpref' />\",","    ITSA_REFEMPTYCONTENT = \"<img class='itsatoolbar-tmpempty' src='itsa-buttonicons-2012-08-15.png' width=0 height=0>\",","    ITSA_REFNODE = \"<span id='itsatoolbar-ref'></span>\",","    ITSA_REFSELECTION = 'itsa-selection-tmp',","    ITSA_FONTSIZENODE = 'itsa-fontsize',","    ITSA_FONTFAMILYNODE = 'itsa-fontfamily',","    ITSA_FONTCOLORNODE = 'itsa-fontcolor',","    ITSA_MARKCOLORNODE = 'itsa-markcolor',","    ITSA_IFRAMENODE = 'itsa-iframenode',","    ITSA_YOUTUBENODE = 'itsa-youtubenode',","    ITSA_IFRAMEBLOCKER = 'itsa-iframeblocker',","    ITSA_IFRAMEBLOCKER_CSS = '.itsa-iframeblocker {position: relative; z-index: 1; background-color:#FFF; opacity:0; filter:alpha(opacity=0;} .itsa-iframeblocker:hover {opacity:0.4; filter:alpha(opacity=40;}',","    ITSA_IFRAMEBLOCKER_TEMPLATE = '<span style=\"padding-left:{width}px; margin-right:-{width}px; padding-top:{height}px; \" class=\"'+ITSA_IFRAMEBLOCKER+' {node}\"></span>';","","    // DO NOT make ITSA_IFRAMEBLOCKER_CSS position absolute! FF will append resizehandlers which we don't want","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property editor"," * @type Y.EditorBase instance"," */","","/**"," * Initial content of the editor"," * @property initialContent"," * @type String"," */","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @property editorY"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @property editorNode"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @property containerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node.<br>"," * @property toolbarNode"," * @type Y.Node"," */","","/**"," * Used internally to check if the toolbar should still be rendered after the editor is rendered<br>"," * To prevent rendering while it is already unplugged"," * @property _destroyed"," * @private"," * @type Boolean"," */","","/**"," * Timer: used internally to clean up empty fontsize-markings<br>"," * @property _timerClearEmptyFontRef"," * @private"," * @type Object"," */","","/**"," * Reference to a backup cursorposition<br>"," * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected."," * Reference is made on a show-event of the selectlist."," * @property _backupCursorRef"," * @private"," * @type Y.Node"," */","","/**"," * ItsaDialogBox-Reference to a the custom internat getUrl-panel<br>"," * Will be created during initialization"," * @property _dialogPanelId"," * @private"," * @type int"," */","","/**"," * Backup of the editors-value 'extracss'. Need to use internally, because the toolbar will add extra css of its own.<br>"," * @property _extracssBKP"," * @private"," * @type int"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_BOLD"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ITALIC"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDERLINE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_LEFT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_CENTER"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_RIGHT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_JUSTIFY"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUBSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUPERSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_TEXTCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_MARKCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_INDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_OUTDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_REDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_EMAIL"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_REMOVELINK"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_HYPERLINK"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_IMAGE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_IFRAME"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_FILE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_VIDEO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SAVE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_CANCEL"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_CLEAR"," * @type String"," */","","Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {","","        editor : null,","        editorY : null,","        editorNode : null,","        containerNode : null,","        toolbarNode : null,","        _destroyed : false,","        _timerClearEmptyFontRef : null,","        _backupCursorRef : null,","        _dialogPanelId : null,","        _extracssBKP : '',","        _eventhandlers : [],","","        ICON_BOLD : 'itsa-icon-bold',","        ICON_ITALIC : 'itsa-icon-italic',","        ICON_UNDERLINE : 'itsa-icon-underline',","        ICON_ALIGN_LEFT : 'itsa-icon-alignleft',","        ICON_ALIGN_CENTER : 'itsa-icon-aligncenter',","        ICON_ALIGN_RIGHT : 'itsa-icon-alignright',","        ICON_ALIGN_JUSTIFY : 'itsa-icon-alignjustify',","        ICON_SUBSCRIPT : 'itsa-icon-subscript',","        ICON_SUPERSCRIPT : 'itsa-icon-superscript',","        ICON_TEXTCOLOR : 'itsa-icon-textcolor',","        ICON_MARKCOLOR : 'itsa-icon-markcolor',","        ICON_INDENT : 'itsa-icon-indent',","        ICON_OUTDENT : 'itsa-icon-outdent',","        ICON_UNORDEREDLIST : 'itsa-icon-unorderedlist',","        ICON_ORDEREDLIST : 'itsa-icon-orderedlist',","        ICON_UNDO : 'itsa-icon-undo',","        ICON_REDO : 'itsa-icon-redo',","        ICON_EMAIL : 'itsa-icon-email',","        ICON_HYPERLINK : 'itsa-icon-hyperlink',","        ICON_REMOVELINK : 'itsa-icon-removelink',","        ICON_IFRAME : 'itsa-icon-iframe',","        ICON_IMAGE : 'itsa-icon-image',","        ICON_FILE : 'itsa-icon-file',","        ICON_VIDEO : 'itsa-icon-video',","        ICON_SAVE : 'itsa-icon-save',","        ICON_CANCEL : 'itsa-icon-cancel',","        ICON_CLEAR : 'itsa-icon-clear',","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance.editor = instance.get('host');","            // need to make sure we can use execCommand, so do not render before the frame exists.","            if (instance.editor.frame && instance.editor.frame.get('node')) {instance._render();}","            else {","                // do not subscribe to the frame:ready, but to the ready-event","                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors","                instance.editor.on('ready', instance._render, instance);","            }","        },","","        /**","         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.","         * It will invoke renderUI, bindUI and syncUI, just as within a widget.","         *","         * @method _render","         * @private","        */","        _render : function() {","            var instance = this;","            if (!instance._destroyed) {","                instance.initialContent = instance.editor.get('content');","                instance.editorY = instance.editor.getInstance();","                instance.editorNode = instance.editor.frame.get('node');","                instance.containerNode = instance.editorNode.get('parentNode');","                instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);","                // make the iframeblocker work through css:","                instance._extracssBKP = instance.editor.get('extracss');","                instance.editor.set('extracss', instance._extracssBKP + ITSA_IFRAMEBLOCKER_CSS);","                instance.editor.plug(Y.Plugin.ExecCommand);","                instance._defineCustomExecCommands();","                instance._createUrlDialog();","                instance._createBlockerRefs();","                instance._renderUI();","                instance._bindUI();","                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object","                // be sure the editor has focus already focus, otherwise safari cannot inserthtml at cursorposition!","                instance.editor.frame.focus(Y.bind(instance.sync, instance));","            }","        },","","        /**","         * Returns node at cursorposition<br>","         * This can be a selectionnode, or -in case of no selection- a new tmp-node (empty span) that will be created to serve as reference.","         * In case of selection, there will always be made a tmp-node as placeholder. But in that case, the tmp-node will be just before the returned node.","         * @method _getCursorRef","         * @private","         * @param {Boolean} [selectionIfAvailable] do return the selectionnode if a selection is made. If set to false, then always just the cursornode will be returned. ","         * Which means -in case of selection- that the cursornode exists as a last child of the selection. Default = false.","         * @return {Y.Node} created empty referencenode","        */","        _getCursorRef : function(selectionIfAvailable) {","            var instance = this,","                node,","                tmpnode,","                sel,","                out;","            // insert cursor and use that node as the selected node","            // first remove previous","            instance._removeCursorRef();","            sel = new instance.editorY.EditorSelection();","            if (!sel.isCollapsed && sel.anchorNode) {","                // We have a selection","                out = sel.getSelected();","                // a bug in Opera makes sel.getSelected()==='undefined. not bound to any nodes', even if there is a selection","                // we CANNOT use (typeof out === 'undefined'), because it IS a nodelist, but an empty one.","                if (out.size()===0) {","                    out = sel.anchorNode.all('[style],font[face]');","                    // even now, out.size can still be 0. !!!","                    // This is the case when you select exactly one tag, for instance an image.","                    // so we need to check for out.size()>0 before assinging out.item(0)","                }","                if (out.size()>0) {","                    node = out.item(0);","                }","            }","            // node only exist when selection is available","            if (node) {","                node.addClass(ITSA_REFSELECTION);","                node.insert(ITSA_REFNODE, 'after');","                if (!(Lang.isBoolean(selectionIfAvailable) && selectionIfAvailable)) {node = instance.editorY.one('#itsatoolbar-ref');}","            }","            else {","                instance.editor.focus();","                instance.execCommand('inserthtml', ITSA_REFNODE);","                node = instance.editorY.one('#itsatoolbar-ref');","            }","            return node;","        },","","        /**","         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef","         * @method _removeCursorRef","         * @private","        */","        _removeCursorRef : function() {","            var instance = this,","                node,","                useY;","            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases","            useY = instance.editorY || Y;","            // first cleanup single referencenode","            node = useY.all('#itsatoolbar-ref');","            if (node) {node.remove();}","            node = useY.all('#itsatoolbar-tmpempty');","            if (node) {node.remove();}","            // next clean up all selections, by replacing the nodes with its html-content. Thus elimination the <span> definitions","            node = useY.all('.' + ITSA_REFSELECTION);","            if (node.size()>0) {","                node.each(function(node){","                    // NEED to trim, because node.replace(' ') throws an error !?!","                    if (Lang.trim(node.getHTML())==='') {","                        node.remove(false);","                    }","                    else {","                        node.replace(node.getHTML());","                    }","                });","            }","        },","","        /**","         * Creates blocker spans above iframe-elements to make them clickable.","         * @method _createBlockerRefs","         * @private","        */","        _createBlockerRefs: function() {","            var instance = this,","                alliframes,","                regExp = /^http:\\/\\/www\\.youtube\\.com\\/embed\\/(\\w+)/; // search for strings like http://www.youtube.com/embed/PHIaeHAcE_A&whatever","            // first remove old references, should they exists    ","            instance._clearBlockerRef();    ","            alliframes = instance.editorY.all('iframe');","            alliframes.each(","                function(node) {","                    var blocker,","                        width,","                        height;","                    width = node.get('width');","                    height = node.get('height');","                    blocker = Lang.sub(","                        ITSA_IFRAMEBLOCKER_TEMPLATE,","                        {","                            width: width || 315,","                            height: height || 420,","                            node: regExp.test(node.get('src') || '') ? ITSA_YOUTUBENODE : ITSA_IFRAMENODE","                        }","                    );","                    node.insert(blocker, 'before');","                },","                instance","            );","        },","","        /**","         * Removes blocker spans that are created above iframe-elements to make them clickable.","         * @method _clearBlockerRef","         * @private","        */","        _clearBlockerRef : function() {","            var instance = this,","                useY;","            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases","            useY = instance.editorY || Y;","            useY.all('.'+ITSA_IFRAMEBLOCKER).remove(false);","        },","","        /**","         * Removes temporary created font-size-ref-Node that might have been created by inserting fontsizes","         * @method _clearEmptyFontRef","         * @private","        */","        _clearEmptyFontRef : function() {","            var instance = this,","                node,","                useY;","            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases","            useY = instance.editorY || Y;","            // first cleanup single referencenode","            node = useY.all('.itsatoolbar-tmpempty');","            if (node) {node.remove();}","            // next clean up all references that are empty","            node = useY.all('.itsa-fontsize');","            if (node.size()>0) {","                node.each(function(node){","                    if (node.getHTML()==='') {node.remove();}","                });","            }","            node = useY.all('.itsa-fontfamily');","            if (node.size()>0) {","                node.each(function(node){","                    if (node.getHTML()==='') {node.remove();}","                });","            }","            node = useY.all('.itsa-fontcolor');","            if (node.size()>0) {","                node.each(function(node){","                    if (node.getHTML()==='') {node.remove();}","                });","            }","            node = useY.all('.itsa-markcolor');","            if (node.size()>0) {","                node.each(function(node){","                    if (node.getHTML()==='') {node.remove();}","                });","            }","        },","","        /**","         * Sets the real editorcursor at the position of the tmp-node created by _getCursorRef<br>","         * Removes the cursor tmp-node afterward.","         * @method _setCursorAtRef","         * @private","        */","        _setCursorAtRef : function() {","            var instance = this,","                sel,","                node = instance.editorY.one('#itsatoolbar-ref');","            if (node) {","                instance.editor.focus();","                sel = new instance.editorY.EditorSelection();","                sel.selectNode(node);","                instance._removeCursorRef();","            }","            else {","                // even without '#itsatoolbar-ref' there might still be nodes that need to be cleaned up","                instance._removeCursorRef();","            }","        },","","        /**","         * Creates a reference at cursorposition for backupusage<br>","         * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected.","         * @method _createBackupCursorRef","         * @private","        */","        _createBackupCursorRef : function() {","            var instance = this;","            instance._backupCursorRef = instance._getCursorRef(true);","            return instance._backupCursorRef;","        },","","        /**","         * Returns backupnode at cursorposition that is created by _createBackupCursorRef()<br>","         * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected.","         * So descendenst of ItsaSelectlist should refer to this cursorref.","         * @method _getBackupCursorRef","         * @private","         * @return {Y.Node} created empty referencenode","        */","        _getBackupCursorRef : function() {","            var instance = this;","            return instance._backupCursorRef || instance._getCursorRef(true);","        },","","        /**","         * Syncs the toolbar's status with the editor.<br>","         * @method sync","         * @param {EventFacade} [e] will be passed when the editor fires a nodeChange-event, but if called manually, leave e undefined. Then the function will search for the current cursorposition.","        */","        sync : function(e) {","            // syncUI will sync the toolbarstatus with the editors cursorposition","            var instance = this,","                cursorRef;","            if (!(e && e.changedNode)) {","                cursorRef = instance._getCursorRef(false);","                if (!e) {e = {changedNode: cursorRef};}","                else {e.changedNode = cursorRef;}","                Y.later(250, instance, instance._removeCursorRef);","            }","            if (instance.toolbarNode) {instance.toolbarNode.fire('itsatoolbar:statusChange', e);}","        },","","        /**","         * Creates a new Button on the Toolbar. By default at the end of the toolbar.","         * @method addButton","         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, or you want a custom Function to be executed, you must supply an object:<br>","         * <i>- [command]</i> (String): the execcommand<br>","         * <i>- [value]</i> (String): additional value","         * <i>- [customFunc]</i> (Function): reference to custom function: typicaly, this function will call editorinstance.itstoolbar.execCommand() by itsself","         * <i>- [context]]</i> (instance): the context for customFunc","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addButton : function(iconClass, execCommand, indent, position) {","            var instance = this,","                buttonNode,","                buttonInnerNode;","            buttonNode = Node.create(ITSA_BTNNODE);","            buttonNode.addClass(ITSA_BUTTON);","            if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","            else if (Lang.isObject(execCommand)) {","                if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}","                if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}","                if (Lang.isFunction(execCommand.customFunc)) {","                    buttonNode.addClass(ITSA_BTNCUSTOMFUNC);","                    buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);","                }","            }","            if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}","            buttonInnerNode = Node.create(ITSA_BTNINNERNODE);","            buttonInnerNode.addClass(iconClass);","            buttonNode.append(buttonInnerNode);","            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist ","            if (instance.toolbarNode) {instance.toolbarNode.append(buttonNode);}","            else {","                // do not subscribe to the frame:ready, but to the ready-event","                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors","                instance.editor.on('ready', function(e, buttonNode){instance.toolbarNode.append(buttonNode);}, instance, buttonNode);","            }","            return buttonNode;","        },","","        /**","         * Creates a new syncButton on the Toolbar. By default at the end of the toolbar.<br>","         * A syncButton is just like a normal toolbarButton, with the exception that the editor can sync it's status, which cannot be done with a normal button. ","         * Typically used in situations like a hyperlinkbutton: it never stays pressed, but when the cursos is on a hyperlink, he buttons look will change.","         * @method addSyncButton","         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addSyncButton : function(iconClass, execCommand, syncFunc, context, indent, position, isToggleButton) {","            var instance = this,","                buttonNode = instance.addButton(iconClass, execCommand, indent, position);","            if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}","            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist ","            if (instance.toolbarNode) {instance.toolbarNode.addTarget(buttonNode);}","            else {","                // do not subscribe to the frame:ready, but to the ready-event","                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors","                instance.editor.on('ready', function(e, buttonNode){instance.toolbarNode.addTarget(buttonNode);}, instance, buttonNode);","            }","            if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","            return buttonNode;","        },","","        /**","         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.","         * @method addToggleButton","         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addToggleButton : function(iconClass, execCommand, syncFunc, context, indent, position) {","            var instance = this,","                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);","            buttonNode.addClass(ITSA_BTNTOGGLE);","            return buttonNode;","        },","","        /**","         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.","         * Position is by default at the end of the toolbar.<br>","         * @method addButtongroup","         * @param {Array} buttons Should consist of objects with two fields:<br>","         * <i>- iconClass</i> (String): defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.","         * <i>- command</i> (String): the execcommand that will be executed on buttonclick","         * <i>- [value]</i> (String) optional: additional value for the execcommand","         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)","         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","        */","        addButtongroup : function(buttons, indent, position) {","            var instance = this;","            if (instance.toolbarNode) {instance._addButtongroup(buttons, indent, position);}","            else {","                // do not subscribe to the frame:ready, but to the ready-event","                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors","                instance.editor.on('ready', function(e, buttons, indent, position){instance._addButtongroup(buttons, indent, position);}, instance, buttons, indent, position);","            }","        },","","        /**","         * Does the real action of addButtongroup, but assumes that the editor is rendered.<br>","         * therefore not to be called mannually, only by addButtongroup()","         * @method _addButtongroup","         * @private","         * @param {Array} buttons Should consist of objects with at least two fields:<br>","         * <i>- iconClass</i> (String): defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.<br>","         * <i>- command</i> (String): the execcommand that will be executed on buttonclick.<br>","         * <i>- [value]</i> (String) optional: additional value for the execcommand.<br>","         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton).<br>","         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance.","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","        */","        _addButtongroup : function(buttons, indent, position) {","            var instance = this,","                buttonGroup = Y.guid(),","                button,","                buttonNode,","                returnNode = null,","                execCommand,","                i;","            for (i=0; i<buttons.length; i++) {","                button = buttons[i];","                if (button.iconClass && button.command) {","                    if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}","                    else {execCommand = button.command;}","                    buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position ? position+i : null));","                    buttonNode.addClass(ITSA_BTNGROUP);","                    buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);","                    buttonNode.setData('buttongroup', buttonGroup);","                    instance.toolbarNode.addTarget(buttonNode);","                    if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}","                    if (!returnNode) {returnNode = buttonNode;}","                }","            }","            return returnNode;","        },","        /**","         * Creates a selectList on the Toolbar. By default at the end of the toolbar.","         * When fired, the event-object returnes with 2 fields:<br>","         * <i>- e.value</i>: value of selected item<br>","         * <i>- e.index</i>: indexnr of the selected item<br>.","         * CAUTION: when using a selectlist, you <u>cannot</u> use standard execCommands. That will not work in most browsers, because the focus will be lost. <br>","         * Instead, create your customexecCommand and use cursorrefference <i>_getBackupCursorRef()</i>: see example <i>_defineExecCommandFontFamily()</i>","         * @method addSelectList","         * @param {Array} items contains all the items. Should be either a list of (String), or a list of (Objects). In case of an Object-list, the objects should contain two fields:<br>","         * <i>- text</i> (String): the text shown in the selectlist<br>","         * <i>- returnValue</i> (String): the returnvalue of e.value<br>","         * In case a String-list is supplied, e.value will equal to the selected String-item (returnvalue==text)","","         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.execCommand().<br>","         * You could provide a second 'restoreCommand', in case you need a different execCommand to erase some format. In that case you must supply an object with three fields:<br>","         * <i>- command</i> (String): the standard execcommand<br>","         * <i>- restoreCommand</i> (String): the execcommand that will be executed in case e.value equals the restore-value<br>","         * <i>- restoreValue</i> (String): when e.value equals restoreValue, restoreCommand will be used instead of the standard command","","","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Object} [config] Object that will be passed into the selectinstance. Has with the following fields:<br>","         * <i>- listAlignRight</i> (Boolean): whether to rightalign the listitems. Default=false<br>","         * <i>- hideSelected</i> (Boolean): whether the selected item is hidden from the list. Default=false","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.ITSASelectlist} reference to the created object","        */","        addSelectlist : function(items, execCommand, syncFunc, context, indent, config, position) {","            var instance = this,","                selectlist;","            config = Y.merge(config, {items: items, defaultButtonText: ''});","            selectlist = new Y.ITSASelectList(config);","            selectlist.after('render', function(e, execCommand, syncFunc, context, indent){","                var instance = this,","                    selectlist = e.currentTarget,","                    buttonNode = selectlist.buttonNode;","                if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","                else {","                    if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    ","                    if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    ","                    if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    ","                }","                if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}","                // instance.toolbarNode should always exist here","                instance.toolbarNode.addTarget(buttonNode);","                selectlist.on('show', instance._createBackupCursorRef, instance);","                selectlist.on('selectChange', instance._handleSelectChange, instance);","                if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.rbind(syncFunc, context || instance));}","                instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);","            }, instance, execCommand, syncFunc, context, indent);","            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist ","            if (instance.toolbarNode) {selectlist.render(instance.toolbarNode);}","            else {","                // do not subscribe to the frame:ready, but to the ready-event","                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors","                instance.editor.on('ready', function(){selectlist.render(instance.toolbarNode);}, instance);","            }","            return selectlist;","        },","","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this,","                srcNode = instance.get('srcNode');","             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction","            instance._destroyed = true;","            instance._removeCursorRef();","            if (instance._timerClearEmptyFontRef) {instance._timerClearEmptyFontRef.cancel();}","            instance._clearEmptyFontRef();","            instance._clearBlockerRef();","            instance.editor.set('extracss', instance._extracssBKP);","            Y.Array.each(","                instance._eventhandlers,","                function(item){","                    item.detach();","                }","            );","            if (instance.toolbarNode) {instance.toolbarNode.remove(true);}","            if (instance._dialogPanelId) {Y.Global.ItsaDialog.panelOptions.splice(instance._dialogPanelId, 1);}","        },","","        // -- Private Methods ----------------------------------------------------------","","        /**","         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode ","         *","         * @method _renderUI","         * @private","        */","        _renderUI : function() {","            var instance = this,","                correctedHeight = 0,","                srcNode = instance.get('srcNode'),","                btnSize = instance.get('btnSize');","            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering","            instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);","            if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}","            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}","            if (srcNode) {","                srcNode.prepend(instance.toolbarNode);","            }","            else {","                instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);","                switch (instance.get('btnSize')) {","                    case 1:","                        correctedHeight = -40;","                    break;","                    case 2: ","                        correctedHeight = -44;","                    break;","                    case 3: ","                        correctedHeight = -46;","                    break;","                }","                correctedHeight += parseInt(instance.containerNode.get('offsetHeight'),10) ","                                 - parseInt(instance.containerNode.getComputedStyle('paddingTop'),10) ","                                 - parseInt(instance.containerNode.getComputedStyle('borderTopWidth'),10) ","                                 - parseInt(instance.containerNode.getComputedStyle('borderBottomWidth'),10);","                instance.editorNode.set('height', correctedHeight);","                instance.editorNode.insert(instance.toolbarNode, 'before');","            }","            instance._initializeButtons();","        },","        ","        /**","         * Binds events when there is a cursorstatus changes in the editor","         *","         * @method _bindUI","         * @private","        */","        _bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers;","            eventhandlers.push(","                instance.editor.on('nodeChange', instance.sync, instance)","            );","            eventhandlers.push(","                instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance)","            );","            // TODO: shortcutfunctions","            //instance.editorY.on('keydown', Y.bind(instance._handleShortcutFn, instance));","        },","","        /**","         * Not working yet. Handles shortcutfunctions (keyboard ctrl-bold etc)","         *","         * @method _handleShortcutFn","         * @private","        */","        _handleShortcutFn : function(e) {","            var instance = this;","            if (e.ctrlKey || e.metaKey) {","                switch (e.keyCode) {","                    case 66 :","                       e.halt(true);","                       instance.execCommand('bold');","                       instance.sync();","                       break;","                    case 73 :","                       e.halt(true);","                       instance.execCommand('italic');","                       instance.sync();","                       break;","                    case 85 :","                       e.halt(true);","                       instance.execCommand('underline');","                       instance.sync();","                       break;","                }","            }","        },","","        /**","         * Creates a Y.Global.ItsaDialog.panel that can be called through method this.getUrl()","         *","         * @method _createUrlDialog","         * @private","        */","        _createUrlDialog: function() {","            var instance = this;","            instance._dialogPanelId = Y.Global.ItsaDialog.definePanel({","                iconClass: Y.Global.ItsaDialog.ICON_INFO,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:Y.Global.ItsaDialog.ACTION_HIDE},","                        {name:'removelink', label:'Remove link', action:Y.Global.ItsaDialog.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}    ","                    ]","                }    ","            });","        },","","        /**","         * Shows the Url-Panel with an inputfield and the buttons: <b>Cancel, Remove Link, Ok</b><br>","         * @method getUrl","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {String} [defaultmessage] showed inside the form-input.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getUrl: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                bodyMessage,","                inputElement;","            inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultmessage,","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 10,","                initialFocus: true,","                selectOnFocus: true","            });","            Y.Global.ItsaDialog.showPanel(instance._dialogPanelId, title, message + '<br>' + inputElement.render(), callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Defines all custom execCommands","         *","         * @method _defineCustomExecCommands","         * @private","        */","        _defineCustomExecCommands : function() {","            var instance = this;","            instance._defineExecCommandHeader();","            instance._defineExecCommandFontFamily();","            instance._defineExecCommandFontSize();","            instance._defineExecCommandFontColor();","            instance._defineExecCommandMarkColor();","            instance._defineExecCommandHyperlink();","            instance._defineExecCommandRemoveHyperlink();","            instance._defineExecCommandMaillink();","            instance._defineExecCommandImage();","            instance._defineExecCommandIframe();","            instance._defineExecCommandYouTube();","            instance._defineExecSaveContent();","            instance._defineExecSetContent();","        },","","        /**","         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)","         *","         * @method _handleBtnClick","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleBtnClick : function(e) {","            var instance = this,","                node = e.currentTarget;","            // only execute for .itsa-button, not for all buttontags    ","            if (node.hasClass(ITSA_BUTTON)) {","                if (node.hasClass(ITSA_BTNTOGGLE)) {","                    node.toggleClass(ITSA_BTNPRESSED);","                }","                else if (node.hasClass(ITSA_BTNSYNC)) {","                    node.toggleClass(ITSA_BTNACTIVE, true);","                }","                else if (node.hasClass(ITSA_BTNGROUP)) {","                    instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);","                    node.toggleClass(ITSA_BTNPRESSED, true);","                }","                if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance._execCommandFromData(node);}","            }","        },","","        /**","         * Handling the selectChange event of a selectButton","         *","         * @method _handleSelectChange","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleSelectChange : function(e) {","            var selectButtonNode,","                restoreCommand,","                execCommand;","            selectButtonNode = e.currentTarget.buttonNode;","            restoreCommand = selectButtonNode.getData('restoreCommand');","            execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');","            this.execCommand(execCommand, e.value);","        },","","        /**","         * Executes this.editor.exec.command with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>","         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.","         *","         * @method _execCommandFromData","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _execCommandFromData: function(buttonNode) {","            var instance = this,","                execCommand,","                execValue;","            execCommand = buttonNode.getData('execCommand');","            execValue = buttonNode.getData('execValue');","            instance._createBackupCursorRef();","            instance.execCommand(execCommand, execValue);","        },","","        /**","         * Performs a execCommand that will take into account the editors cursorposition<br>","         * This means that when no selection is made, the operation still works: you can preset an command this way.<br>","         * It also makes 'inserthtml' work with all browsers.","         *","         * @method execCommand","         * @param {String} command The execCommand","         * @param {String} [value] additional commandvalue","        */","        execCommand: function(command, value) {","            var instance = this,","                tmpnode;","            instance.editor.focus();","            if (command==='inserthtml') {","                // we need a tmp-ref which is an img-element instead of a span-element --> inserthtml of span does not work in chrome and safari","                // but inserting img does, which can replaced afterwards","                // first a command that I don't understand: but we need this, because otherwise some browsers will replace <br> by <p> elements","                instance.editor._execCommand('createlink', '&nbsp;');","                instance.editor.exec.command('inserthtml', ITSA_TMPREFNODE);","                tmpnode = instance.editorY.one('#itsatoolbar-tmpref');","                tmpnode.replace(value);","            }","            else {instance.editor.exec.command(command, value);}","        },","","        /**","         * Checks whether there is a selection within the editor<br>","         *","         * @method _hasSelection","         * @private","         * @return {Boolean} whether there is a selection","        */","        _hasSelection : function() {","            var instance = this,","                sel = new instance.editorY.EditorSelection();","            // use sel.anchorNode for all browsers except IE","            // IE must use sel.getSelected().size(), BUT that will create a selection first.","            // Within IE this wont lead to extra dom-code, but in other browsers that would lead to extra <span> elements.","            // Therefore, FIRST check sel.anchorNode and if that fails,  sel.getSelected().size()","            return (!sel.isCollapsed && (sel.anchorNode || (sel.getSelected().size()>0)));","        },","","        /**","         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector","         *","         * @method _checkInbetweenSelector","         * @private","         * @param {String} selector The selector to check for","         * @param {Y.Node} cursornode Active node where the cursor resides, or the selection","         * @return {Boolean} whether node resides inbetween selector","        */","        _checkInbetweenSelector : function(selector, cursornode) {","            var instance = this,","                pattern = '<\\\\s*' + selector + '[^>]*>(.*?)<\\\\s*/\\\\s*' + selector  + '>',","                searchHeaderPattern = new RegExp(pattern, 'gi'),","                fragment,","                inbetween = false,","                refContent = instance.editorY.one('body').getHTML(),","                cursorid,","                cursorindex;","            cursorid = cursornode.get('id');","            cursorindex = refContent.indexOf(' id=\"' + cursorid + '\"');","            if (cursorindex===-1) {cursorindex = refContent.indexOf(\" id='\" + cursorid + \"'\");}","            if (cursorindex===-1) {cursorindex = refContent.indexOf(\" id=\" + cursorid);}","            fragment = searchHeaderPattern.exec(refContent);","            while ((fragment !== null) && !inbetween) {","                inbetween = ((cursorindex>=fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));","                fragment = searchHeaderPattern.exec(refContent); // next search","            }","            return inbetween;","        },","","        /**","         * Finds the headernode where the cursor, or selection remains in","         *","         * @method _getActiveHeader","         * @private","         * @param {Y.Node} cursornode Active node where the cursor resides, or the selection. Can be supplied by e.changedNode, or left empty to make this function determine itself.","         * @return {Y.Node|null} the headernode where the cursor remains. Returns null if outside any header.","        */","     _getActiveHeader : function(cursornode) {","            var instance = this,","                pattern,","                searchHeaderPattern,","                fragment,","                nodeFound,","                cursorid,","                nodetag,","                headingNumber = 0,","                returnNode = null,","                checkNode,","                endpos,","                refContent;","            if (cursornode) {    ","                // node can be a header right away, or it can be a node within a header. Check for both","                nodetag = cursornode.get('tagName');","                if (nodetag.length>1) {headingNumber = parseInt(nodetag.substring(1), 10);}","                if ((nodetag.length===2) && (nodetag.toLowerCase().substring(0,1)==='h') && (headingNumber>0) && (headingNumber<10)) {","                    returnNode = cursornode;","                }","                else {","                    cursorid = cursornode.get('id');","                    // first look for endtag, to determine which headerlevel to search for","                    pattern = ' id=(\"|\\')?' + cursorid + '(\"|\\')?(.*?)<\\\\s*/\\\\s*h\\\\d>';","                    searchHeaderPattern = new RegExp(pattern, 'gi');","                    refContent = instance.editorY.one('body').getHTML();","                    fragment = searchHeaderPattern.exec(refContent);","","","                    if (fragment !== null) {","                        // search again, looking for the right headernumber","                        endpos = fragment.index+fragment[0].length-1;","                        headingNumber = refContent.substring(endpos-1, endpos);","                        pattern = '<\\\\s*h' + headingNumber + '[^>]*>(.*?)id=(\"|\\')?' + cursorid + '(\"|\\')?(.*?)<\\\\s*/\\\\s*h' + headingNumber + '>';","                        searchHeaderPattern = new RegExp(pattern, 'gi');","                        fragment = searchHeaderPattern.exec(refContent); // next search","                        if (fragment !== null) {","                            nodeFound = refContent.substring(fragment.index, fragment.index+fragment[0].length);","                        }","                    }","                    if (nodeFound) {","                        checkNode = Node.create(nodeFound);","                        returnNode = instance.editorY.one('#' + checkNode.get('id'));","                    }","                }","            }","            return returnNode;","        },","","        /**","         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.","         *","         * @method _initializeButtons","         * @private","        */","        _initializeButtons : function() { ","            var instance = this,","                i, r, g, b,","                item,","                items,","                bgcolor,","                docFontSize,","                bgcolors,","                buttons;","","            // create fonffamily button","            if (instance.get('btnFontfamily')) {","                items = instance.get('fontFamilies');","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    items[i] = {text: \"<span style='font-family:\"+item+\"'>\"+item+\"</span>\", returnValue: item};","                }","                instance.fontSelectlist = instance.addSelectlist(items, 'itsafontfamily', function(e) {","                    var familyList = e.changedNode.getStyle('fontFamily'),","                        familyListArray = familyList.split(','),","                        activeFamily = familyListArray[0];","                    // some browsers place '' surround the string, when it should contain whitespaces.","                    // first remove them","                    if ((activeFamily.substring(0,1)===\"'\") || (activeFamily.substring(0,1)==='\"')) {activeFamily = activeFamily.substring(1, activeFamily.length-1);}","                    this.fontSelectlist.selectItemByValue(activeFamily, true, true);","                }, null, true, {buttonWidth: 145});","            }","","            // create fontsize button","            if (instance.get('btnFontsize')) {","                items = [];","                for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}","                instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {","                    var fontSize = e.changedNode.getComputedStyle('fontSize'),","                        fontSizeNumber = parseFloat(fontSize),","                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);","                    // make sure not to display partial numbers    ","                    this.sizeSelectlist.selectItemByValue(Lang.isNumber(fontSizeNumber) ? Math.round(fontSizeNumber)+fontsizeExt : '', true);","                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});","            }","","            // create header button","            if (instance.get('btnHeader')) {","                items = [];","                items.push({text: 'No header', returnValue: 'none'});","                for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}","                instance.headerSelectlist = instance.addSelectlist(items, 'itsaheading', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        internalcall = (e.sender && e.sender==='itsaheading'),","                        activeHeader;","                    // prevent update when sync is called after heading has made changes. Check this through e.sender","                    if (!internalcall) {","                        activeHeader = instance._getActiveHeader(node);","                        instance.headerSelectlist.selectItem(activeHeader ? parseInt(activeHeader.get('tagName').substring(1), 10) : 0);","                        instance.headerSelectlist.set('disabled', Lang.isNull(activeHeader) && !instance._hasSelection());","                    }","                }, null, true, {buttonWidth: 96});","            }","","            // create bold button","            if (instance.get('btnBold')) {","                instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {","                    var fontWeight = e.changedNode.getStyle('fontWeight');","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (Lang.isNumber(parseInt(fontWeight, 10)) ? (fontWeight>=600) : ((fontWeight==='bold') || (fontWeight==='bolder'))));","                }, null, true);","            }","","            // create italic button","            if (instance.get('btnItalic')) {","                instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));","                });","            }","","            // create underline button","            if (instance.get('btnUnderline')) {","                instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));","                });","            }","","            // create align buttons","            if (instance.get('grpAlign')) {","                buttons = [","                    {","                        iconClass : instance.ICON_ALIGN_LEFT,","                        command : 'JustifyLeft',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_CENTER,","                        command : 'JustifyCenter',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_RIGHT,","                        command : 'JustifyRight',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));","                                    }","                    }","                ];","            // create justify button","                if (instance.get('btnJustify')) {","                    buttons.push({","                        iconClass : instance.ICON_ALIGN_JUSTIFY,","                        command : 'JustifyFull',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));","                                    }","                    });","                }","                instance.addButtongroup(buttons, true);","            }","","            // create subsuperscript buttons","            if (instance.get('grpSubsuper')) {","                instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));","                }, null, true);","                instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));","                });","            }","","            // create textcolor button","            if (instance.get('btnTextcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.colorSelectlist = instance.addSelectlist(items, 'itsafontcolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('color'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.colorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});","            }","","            // create markcolor button","            if (instance.get('btnMarkcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.markcolorSelectlist = instance.addSelectlist(items, 'itsamarkcolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('backgroundColor'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});","            }","","            // create indent buttons","            if (instance.get('grpIndent')) {","                instance.addButton(instance.ICON_INDENT, 'indent', true);","                instance.addButton(instance.ICON_OUTDENT, 'outdent');","            }","","            // create list buttons","            if (instance.get('grpLists')) {","                instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode;","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', node)));","                }, null, true);","                instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode;","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', node)));","                });","            }","","            // create email button","            if (instance.get('btnEmail')) {","                instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isEmailLink;","                    isLink =  instance._checkInbetweenSelector('a', node);","                    if (isLink) {","                        // check if its a normal href or a mailto:","                        while (node && !node.test('a')) {node=node.get('parentNode');}","                        // be carefull: do not === /match() with text, that will fail","                        isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');","                    }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));","                }, null, true);","            }","","            // create hyperlink button","            if (instance.get('btnHyperlink')) {","                instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {","                    var instance = this,","                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isFileLink = false,","                        href,","                        lastDot,","                        fileExt,","                        isHyperLink;","                    isLink =  instance._checkInbetweenSelector('a', node);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));","                });","            }","","            // create remove-hyperlink button","            if (instance.get('btnRemoveHyperlink')) {","                instance.addSyncButton(instance.ICON_REMOVELINK, 'itsaremovehyperlink', function(e) {","                    var instance = this,","                        node = e.changedNode;","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, instance._checkInbetweenSelector('a', node));","                });","            }","","            // create image button","            if (instance.get('btnImage')) {","                instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));","                }, null, true);","            }","","            // create video button","            if (instance.get('btnVideo')) {","                instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.hasClass(ITSA_YOUTUBENODE)));","                });","            }","","            // create iframe button","            if (instance.get('btnIframe')) {","                instance.addSyncButton(instance.ICON_IFRAME, 'itsacreateiframe', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.hasClass(ITSA_IFRAMENODE)));","                },","                null, true);","            }","","            // create clear button","            if (instance.get('btnClear')) {","                instance.addButton(instance.ICON_CLEAR, {command: 'mysetcontent', value: ''}, true);","            }","","            // create save button","            if (instance.get('btnSave')) {","                instance.addButton(instance.ICON_SAVE, 'itsasavecontent', true);","            }","","            // create cancel button","            if (instance.get('btnCancel')) {","                instance.addButton(instance.ICON_CANCEL, {command: 'mysetcontent', value: instance.initialContent}, true);","            }","","//************************************************","// just for temporary local use ITS Asbreuk","// should NOT be part of the gallery","            if (false) {","//                instance.addButton(instance.ICON_EURO, {command: 'inserthtml', value: '&#8364;'}, true);","                instance.addSyncButton(","                    instance.ICON_FILE,","                    {   customFunc: Y.bind(","                            function(e) {","                                Y.config.cmas2plus.uploader.show(","                                    null, ","                                    Y.bind(function(e) {","                                        this.execCommand('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);","                                    }, this)","                                );","                            },","                            instance","                        )","                    },","                    function(e) {","                        var instance = this,","                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                            node = e.changedNode,","                            nodePosition,","                            isFileLink = false,","                            isLink,","                            href,","                            lastDot,","                            fileExt,","                            isHyperLink;","                        isLink =  instance._checkInbetweenSelector('a', node);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                        e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);","                    }","                );","            }","//************************************************","","            if (instance.get('grpUndoredo')) {","                instance.addButton(instance.ICON_UNDO, 'undo', true);","                instance.addButton(instance.ICON_REDO, 'redo');","            }","","        },","","        /**","        * Based on YUI2 rich-editor code","        * @private","        * @method _filter_rgb","        * @param String css The CSS string containing rgb(#,#,#);","        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00","        * @return String","        */","        _filter_rgb: function(css) {","            if (css.toLowerCase().indexOf('rgb') != -1) {","                var exp = new RegExp(\"(.*?)rgb\\\\s*?\\\\(\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?\\\\)(.*?)\", \"gi\"),","                    rgb = css.replace(exp, \"$1,$2,$3,$4,$5\").split(','),","                    r, g, b;","            ","                if (rgb.length === 5) {","                    r = parseInt(rgb[1], 10).toString(16);","                    g = parseInt(rgb[2], 10).toString(16);","                    b = parseInt(rgb[3], 10).toString(16);","","                    r = r.length === 1 ? '0' + r : r;","                    g = g.length === 1 ? '0' + g : g;","                    b = b.length === 1 ? '0' + b : b;","","                    css = \"#\" + r + g + b;","                }","            }","            return css;","        },","","        /**","        * Defines the execCommand itsaheading","        * @method _defineExecCommandHeader","        * @private","        */","        _defineExecCommandHeader : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsaheading) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsaheading: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef = itsatoolbar._getBackupCursorRef(),","                            activeHeader = itsatoolbar._getActiveHeader(noderef),","                            headingNumber = 0,","                            disableSelectbutton = false,","                            node;","                        if (val==='none') {","                            // want to clear heading","                            if (activeHeader) {","                                activeHeader.replace(\"<p>\"+activeHeader.getHTML()+\"</p>\");","                                // need to disable the selectbutton right away, because there will be no syncing on the headerselectbox","                                itsatoolbar.headerSelectlist.set('disabled', true);","                            }","                        } else {","                            // want to add or change a heading","                            if (val.length>1) {headingNumber = parseInt(val.substring(1), 10);}","                            if ((val.length===2) && (val.toLowerCase().substring(0,1)==='h') && (headingNumber>0) && (headingNumber<10)) {","                                node = activeHeader || noderef;","                                // make sure you set an id to the created header-element. Otherwise _getActiveHeader() cannot find it in next searches","                                node.replace(\"<\"+val+\" id='\" + editorY.guid() + \"'>\"+node.getHTML()+\"</\"+val+\">\");","                            }","                        }","                        // do a toolbarsync, because styles will change.","                        // but do not refresh the heading-selectlist! Therefore e.sender is defined","                        itsatoolbar.sync({sender: 'itsaheading', changedNode: editorY.one('#itsatoolbar-ref')});","                        // take some time to let the sync do its work before set and remove cursor","                        Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                   }","                });","            }","        },","","        /**","        * Defines the execCommand itsafontfamily","        * @method _defineExecCommandFontFamily","        * @private","        */","        _defineExecCommandFontFamily : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontfamily) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsafontfamily: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            browserNeedsContent,","                            selection;","                        if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}","                        itsatoolbar._clearEmptyFontRef();","                        noderef = itsatoolbar._getBackupCursorRef();","                        selection = noderef.hasClass(ITSA_REFSELECTION);","                        if (selection) {","                            // first cleaning up old fontsize","                            noderef.all('span').setStyle('fontFamily', '');","                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)","                            noderef.all('.'+ITSA_FONTFAMILYNODE).replaceClass(ITSA_FONTFAMILYNODE, ITSA_REFSELECTION);","                            noderef.setStyle('fontFamily', val);","                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)","                            noderef.addClass(ITSA_FONTFAMILYNODE);","                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node","                            noderef.removeClass(ITSA_REFSELECTION);","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element","                            noderef.replace(\"<span class='\" + ITSA_FONTFAMILYNODE + \"' style='font-family:\" + val + \"'>\" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + \"</span>\");","                            itsatoolbar._setCursorAtRef();","                            Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsafontsize","        * @method _defineExecCommandFontSize","        * @private","        */","        _defineExecCommandFontSize : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsafontsize: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            parentnode,","                            browserNeedsContent,","                            selection;","                        if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}","                        itsatoolbar._clearEmptyFontRef();","                        noderef = itsatoolbar._getBackupCursorRef();","                        selection = noderef.hasClass(ITSA_REFSELECTION);","                        if (selection) {","                            //We have a selection","                            parentnode = noderef.get('parentNode');","                            if (Y.UA.webkit) {","                                parentnode.setStyle('lineHeight', '');","                            }","                            // first cleaning up old fontsize","                            noderef.all('span').setStyle('fontSize', '');","                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)","                            noderef.all('.'+ITSA_FONTSIZENODE).replaceClass(ITSA_FONTSIZENODE, ITSA_REFSELECTION);","                            noderef.setStyle('fontSize', val);","                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)","                            noderef.addClass(ITSA_FONTSIZENODE);","                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node","                            noderef.removeClass(ITSA_REFSELECTION);","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element","                            noderef.replace(\"<span class='\" + ITSA_FONTSIZENODE + \"' style='font-size:\" + val + \"'>\" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + \"</span>\");","                            itsatoolbar._setCursorAtRef();","                            Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsafontcolor<br>","        * We need to overrule the standard color execCommand, because in IE the ItsaSelectlist will loose focus on the selection","        * @method _defineExecCommandFontColor","        * @private","        */","        _defineExecCommandFontColor : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontcolor) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsafontcolor: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            browserNeedsContent,","                            selection;","                        if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}","                        itsatoolbar._clearEmptyFontRef();","                        noderef = itsatoolbar._getBackupCursorRef();","                        selection = noderef.hasClass(ITSA_REFSELECTION);","                        if (selection) {","                            //We have a selection","                            // first cleaning up old fontcolors","                            noderef.all('span').setStyle('color', '');","                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)","                            noderef.all('.'+ITSA_FONTCOLORNODE).replaceClass(ITSA_FONTCOLORNODE, ITSA_REFSELECTION);","                            noderef.setStyle('color', val);","                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)","                            noderef.addClass(ITSA_FONTCOLORNODE);","                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node","                            noderef.removeClass(ITSA_REFSELECTION);","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element","                            noderef.replace(\"<span class='\" + ITSA_FONTCOLORNODE + \"' style='color:\" + val + \"'>\" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + \"</span>\");","                            itsatoolbar._setCursorAtRef();","                            Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsamarkcolor<br>","        * We need to overrule the standard hilitecolor execCommand, because in IE the ItsaSelectlist will loose focus on the selection","        * @method _defineExecCommandMarkColor","        * @private","        */","        _defineExecCommandMarkColor : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsamarkcolor) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsamarkcolor: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            browserNeedsContent,","                            selection;","                        if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}","                        itsatoolbar._clearEmptyFontRef();","                        noderef = itsatoolbar._getBackupCursorRef();","                        selection = noderef.hasClass(ITSA_REFSELECTION);","                        if (selection) {","                            //We have a selection","                            // first cleaning up old fontbgcolors","                            noderef.all('span').setStyle('backgroundColor', '');","                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)","                            noderef.all('.'+ITSA_MARKCOLORNODE).replaceClass(ITSA_MARKCOLORNODE, ITSA_REFSELECTION);","                            noderef.setStyle('backgroundColor', val);","                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)","                            noderef.addClass(ITSA_MARKCOLORNODE);","                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node","                            noderef.removeClass(ITSA_REFSELECTION);","                            // remove the tmp-node placeholder","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element","                            noderef.replace(\"<span class='\" + ITSA_MARKCOLORNODE + \"' style='background-color:\" + val + \"'>\" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + \"</span>\");","                            itsatoolbar._setCursorAtRef();","                            Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsasavecontent<br>","        * @method _defineExecSaveContent","        * @private","        */","        _defineExecSaveContent : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsamarkcolor) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsasavecontent: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef;","                        noderef = itsatoolbar._getBackupCursorRef();","","                        // save with clean content","","                        // remove the tmp-node placeholder","                        itsatoolbar._setCursorAtRef();","                    }","                });","            }","        },","","","        /**","        * Defines the execCommand itsasavecontent<br>","        * @method _defineExecSetContent","        * @private","        */","        _defineExecSetContent : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsasetcontent) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsasetcontent: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef;","                        noderef = itsatoolbar._getBackupCursorRef();","","                        // save with clean content","                        editor.set('content', val);","","                        // remove the tmp-node placeholder","                        itsatoolbar._setCursorAtRef();","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaehyperlink","        * @method _defineExecCommandHyperlink","        * @private","        */","        _defineExecCommandHyperlink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    // val can be:","                    // 'img', 'url', 'video', 'email'","                    itsacreatehyperlink: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            callFunc,","                            currentAnchorNode,","                            anchorNodeWithinSel,","                            currentHyperlink,","                            href,","                            noderefHTML,","                            wwwlink,","                            selectedText,","                            defaultHyperlink;","                        noderef = itsatoolbar._getBackupCursorRef();","                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection","                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink","                        anchorNodeWithinSel = noderef.one('a');","                        if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {","                            currentAnchorNode = anchorNodeWithinSel || noderef;","                            while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {","                                currentAnchorNode = currentAnchorNode.get('parentNode');","                            }","                            if (currentAnchorNode) {","                                currentHyperlink = currentAnchorNode.get('href');","                            }","                        }","                        if (noderef.hasClass(ITSA_REFSELECTION)) {","                            selectedText = Lang.trim(Y.EditorSelection.getText(noderef));","                            noderefHTML = noderef.getHTML();","                            wwwlink = (selectedText.substr(0,4) === 'www.');","                            if ((selectedText.substr(0,7) === 'http://') || (selectedText.substr(0,8) === 'https://') || wwwlink) {","                                defaultHyperlink = (wwwlink ? 'http://' : '') + selectedText;","                            }","                        }","                        if (val) {","                            href = val.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            if (currentAnchorNode) {","                                currentAnchorNode.set('href', href);","                            }","                            else {","                                noderef.setHTML('<a href=\"' + href+ '\">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);","                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                // of ITSA_REF_NODE. Because we need to keep the innercontent","                                noderef.set('id', ITSA_REFSELECTION);","                                noderef.toggleClass(ITSA_REFSELECTION, true);","                            }","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Ask for hyperlink","                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink","                            callFunc = currentAnchorNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);","                            callFunc(","                                'Hyperlink',","                                'Enter here the link',","                                currentHyperlink || defaultHyperlink || 'http://',","                                function(e) {","                                    var itsatoolbar = this;","                                    if (e.buttonName==='ok') {","                                        href = e.value.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                                        if (currentAnchorNode) {","                                            currentAnchorNode.set('href', href);","                                        }","                                        else {","                                            noderef.setHTML('<a href=\"' + href+ '\">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);","                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                            // of ITSA_REF_NODE. Because we need to keep the innercontent","                                            noderef.set('id', ITSA_REFSELECTION);","                                            noderef.toggleClass(ITSA_REFSELECTION, true);","                                        }","                                    }","                                    if (e.buttonName==='removelink') {","                                        if (currentAnchorNode.getHTML()==='') {","                                            currentAnchorNode.remove(false);","                                        }","                                        else {","                                            currentAnchorNode.replace(currentAnchorNode.getHTML());","                                        }","                                        itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                        // take some time to let the sync do its work before set and remove cursor","                                        Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                                    }","                                    else {","                                        itsatoolbar._setCursorAtRef();","                                    }","                                },","                                itsatoolbar","                            );","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaehyperlink","        * @method _defineExecCommandRemoveHyperlink","        * @private","        */","        _defineExecCommandRemoveHyperlink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsaremovehyperlink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    // val can be:","                    // 'img', 'url', 'video', 'email'","                    itsaremovehyperlink: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            currentAnchorNode,","                            anchorNodeWithinSel;","                        noderef = itsatoolbar._getBackupCursorRef();","                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection","                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink","                        anchorNodeWithinSel = noderef.one('a');","                        if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {","                            currentAnchorNode = anchorNodeWithinSel || noderef;","                            while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {","                                currentAnchorNode = currentAnchorNode.get('parentNode');","                            }","                            if (currentAnchorNode) {","                                if (currentAnchorNode.getHTML()==='') {","                                    currentAnchorNode.remove(false);","                                }","                                else {","                                    currentAnchorNode.replace(currentAnchorNode.getHTML());","                                }","                                itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                // take some time to let the sync do its work before set and remove cursor","                                Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                            }","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreatemaillink","        * @method _defineExecCommandMaillink","        * @private","        */","        _defineExecCommandMaillink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreatemaillink: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            callFunc,","                            currentAnchorNode,","                            anchorNodeWithinSel,","                            currentHyperlink,","                            href,","                            noderefHTML,","                            selectedText,","                            defaultHyperlink;","                        noderef = itsatoolbar._getBackupCursorRef();","                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection","                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink","                        anchorNodeWithinSel = noderef.one('a');","                        if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {","                            currentAnchorNode = anchorNodeWithinSel || noderef;","                            while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {","                                currentAnchorNode = currentAnchorNode.get('parentNode');","                            }","                            if (currentAnchorNode) {","                                currentHyperlink = currentAnchorNode.get('href');","                                if (currentHyperlink.toLowerCase().substr(0,7)==='mailto:') {currentHyperlink = currentHyperlink.substr(7);}","                            }","                        }","                        if (noderef.hasClass(ITSA_REFSELECTION)) {","                            selectedText = Lang.trim(Y.EditorSelection.getText(noderef));","                            noderefHTML = noderef.getHTML();","                            if (selectedText.indexOf('@') !== -1) {","                                defaultHyperlink = selectedText;","                            }","                        }","                        if (val) {","                            href = 'mailto:' + val.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            if (currentAnchorNode) {","                                currentAnchorNode.set('href', href);","                            }","                            else {","                                noderef.setHTML('<a href=\"' + href+ '\">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);","                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                // of ITSA_REF_NODE. Because we need to keep the innercontent","                                noderef.set('id', ITSA_REFSELECTION);","                                noderef.toggleClass(ITSA_REFSELECTION, true);","                            }","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Ask for emaillink","                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink","                            callFunc = currentAnchorNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);","                            callFunc(","                                'Emaillink',","                                'Enter here the emailaddress',","                                currentHyperlink || defaultHyperlink || '',","                                function(e) {","                                    var itsatoolbar = this,","                                        href,","                                        selection;","                                    if (e.buttonName==='ok') {","                                        href = 'mailto:' + e.value.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                                        if (currentAnchorNode) {","                                            currentAnchorNode.set('href', href);","                                        }","                                        else {","                                            noderef.setHTML('<a href=\"' + href+ '\">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);","                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                            // of ITSA_REF_NODE. Because we need to keep the innercontent","                                            noderef.set('id', ITSA_REFSELECTION);","                                            noderef.toggleClass(ITSA_REFSELECTION, true);","                                        }","                                    }","                                    if (e.buttonName==='removelink') {","                                        if (currentAnchorNode.getHTML()==='') {","                                            currentAnchorNode.remove(false);","                                        }","                                        else {","                                            currentAnchorNode.replace(currentAnchorNode.getHTML());","                                        }","                                        itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                        // take some time to let the sync do its work before set and remove cursor","                                        Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                                    }","                                    else {","                                        itsatoolbar._setCursorAtRef();","                                    }","                                },","                                itsatoolbar","                            );","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateimage","        * @method _defineExecCommandImage","        * @private","        */","        _defineExecCommandImage : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateimage: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","//                            callFunc,","                            src,","                            wwwlink,","                            currentImageNode,","                            currentImagelink,","                            selectedText,","                            defaultImagelink;","                        noderef = itsatoolbar._getBackupCursorRef();","                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection","                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink","                        currentImageNode = noderef.one('img');","                        if (currentImageNode) {","                            currentImagelink = currentImageNode.get('src');","                        }","","                        if (noderef.hasClass(ITSA_REFSELECTION)) {","                            selectedText = Lang.trim(Y.EditorSelection.getText(noderef));","                            wwwlink = (selectedText.substr(0,4) === 'www.');","                            if ((selectedText.substr(0,7) === 'http://') || (selectedText.substr(0,8) === 'https://') || wwwlink) {","                                defaultImagelink = (wwwlink ? 'http://' : '') + selectedText;","                            }","                        }","                        if (val) {","                            src = val.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            if (currentImageNode) {","                                currentImageNode.set('src', src);","                            }","                            else {","                                noderef.setHTML('<img src=\"' + src+ '\" />' + ITSA_REFNODE);","                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                // of ITSA_REF_NODE. Because we need to keep the innercontent","                                noderef.set('id', ITSA_REFSELECTION);","                                noderef.toggleClass(ITSA_REFSELECTION, true);","                            }","                            itsatoolbar._setCursorAtRef();","                        }","                        else {","                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink","//                            callFunc = currentImageNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);","                            Y.Global.ItsaDialog.getInput(","                                'Inline Image',","                                'Enter here the link to the image',","                                currentImagelink || defaultImagelink || 'http://',","                                function(e) {","                                    var itsatoolbar = this;","                                    if (e.buttonName==='ok') {","                                        src = e.value.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                                        if (currentImageNode) {","                                            currentImageNode.set('src', src);","                                        }","                                        else {","                                            noderef.setHTML('<img src=\"' + src+ '\" />' + ITSA_REFNODE);","                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                            // of ITSA_REF_NODE. Because we need to keep the innercontent","                                            noderef.set('id', ITSA_REFSELECTION);","                                            noderef.toggleClass(ITSA_REFSELECTION, true);","                                        }","                                    }","                                    if (e.buttonName==='removelink') {","                                        currentImageNode.remove(false);","                                        itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                        // take some time to let the sync do its work before set and remove cursor","                                        Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                                    }","                                    else {","                                        itsatoolbar._setCursorAtRef();","                                    }","                                },","                                itsatoolbar","                            );","                        }","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateyoutube","        * @method _defineExecCommandYouTube","        * @private","        */","        _defineExecCommandYouTube : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateyoutube: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            previousNode,","                            blockerNode,","                            callFunc,","                            regExp1 = /^http:\\/\\/www\\.youtube\\.com\\/watch?v=(\\w+)/, // search for strings like http://www.youtube.com/watch?v=PHIaeHAcE_A&whatever","                            regExp2 = /^http:\\/\\/youtu\\.be\\/(\\w+)/, // search for strings like http://youtu.be/PHIaeHAcE_A&whatever","                            regExp3 = /^http:\\/\\/www\\.youtube\\.com\\/embed\\/(\\w+)/, // search for strings like http://www.youtube.com/embed/PHIaeHAcE_A&whatever","                            regExp4 = /^v=(\\w+)/, // search for strings like v=PHIaeHAcE_A&whatever","                            regExp5 = /^(\\w+)$/, // search for strings like PHIaeHAcE_A&whatever","                            currentYouTubeNode,","                            currentYouTubeLink;","                        // BE CAREFULL: when manipulating: the selection surrounds the blockerdiv and the cursor is inbetween the blocker-div and the iframe!!!","                        noderef = itsatoolbar._getBackupCursorRef();","                        blockerNode = noderef.one('.'+ITSA_IFRAMEBLOCKER);","                        // Now check if you are manipulating an existing iframe-element:","                        if (blockerNode) {","                            // yes: a blockernode exists, so we are manipulating an existent iframe-element","                            currentYouTubeNode = noderef.next('iframe');","                            if (currentYouTubeNode) {","                                // First the most tricky part: We need to reset the position of JUST ITSA_REFNODE","                                previousNode = itsatoolbar.editorY.one('#itsatoolbar-ref');","                                previousNode.remove(false);","                                // now reposition the cursor","                                currentYouTubeNode.insert(ITSA_REFNODE, 'after');","                                // next: we read the src attribute","                                currentYouTubeLink = currentYouTubeNode.get('src');","                                // Try to extract the videoitem based on regExp1-regExp5","                                if (regExp1.test(currentYouTubeLink) || regExp2.test(currentYouTubeLink) || regExp3.test(currentYouTubeLink) || regExp4.test(currentYouTubeLink) || regExp5.test(currentYouTubeLink)) {","                                    currentYouTubeLink = RegExp.$1;","                                }","                            }","                        }","                        // Which function to call? Only with button 'Remove link' when there is already an anchorlink","                        callFunc = currentYouTubeNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);","                        callFunc(","                            'Inline YouTube movie',","                            'Enter here the link to the youtube-movie',","                            currentYouTubeLink || 'http://youtu.be/PHIaeHAcE_A',","                            function(e) {","                                var itsatoolbar = this,","                                    src,","                                    videoitem,","                                    width = 420,","                                    height = 315;","                                if (e.buttonName==='ok') {","                                    src = e.value.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                                    // Try to extract the videoitem based on regExp1-regExp5","                                    if (regExp1.test(src) || regExp2.test(src) || regExp3.test(src) || regExp4.test(src) || regExp5.test(src)) {","                                        videoitem = RegExp.$1;","                                    }","                                    if (videoitem) {","                                        if (currentYouTubeNode) {","                                            currentYouTubeNode.set('src', 'http://www.youtube.com/embed/' + videoitem);","                                        }","                                        else {","                                            noderef.setHTML('<span style=\"padding-left:'+width+'px; margin-right:-'+width+'px; padding-top:'+height+'px; \" class=\"'+ITSA_IFRAMEBLOCKER+' '+ITSA_YOUTUBENODE+'\"></span><iframe width=\"'+width+'\" height=\"'+height+'\" src=\"http://www.youtube.com/embed/' + videoitem + '\" frameborder=\"0\" allowfullscreen></iframe>');","                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                            // of ITSA_REF_NODE. Because we need to keep the innercontent","                                            noderef.set('id', ITSA_REFSELECTION);","                                            noderef.toggleClass(ITSA_REFSELECTION, true);","                                        }","                                    }","                                }","                                if (e.buttonName==='removelink') {","                                    if (currentYouTubeNode) {","                                        currentYouTubeNode.remove(false);","                                    }","                                    if (blockerNode) {","                                        blockerNode.remove(false);","                                    }","                                    itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                    // take some time to let the sync do its work before set and remove cursor","                                    Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                                }","                                else {","                                    itsatoolbar._setCursorAtRef();","                                }","                            },","                            itsatoolbar","                        );","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateiframe","        * @method _defineExecCommandIframe","        * @private","        */","        _defineExecCommandIframe : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateiframe) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateiframe: function(cmd, val) {","                        var editor = this.get('host'),","                            editorY = editor.getInstance(),","                            itsatoolbar = editor.itsatoolbar,","                            noderef,","                            blockerNode,","                            previousNode,","                            callFunc,","                            currentIframeNode,","                            currentIframeSrc;","                        noderef = itsatoolbar._getBackupCursorRef();","                        blockerNode = noderef.one('.'+ITSA_IFRAMEBLOCKER);","                        // Now check if you are manipulating an existing iframe-element:","                        if (blockerNode) {","                            // yes: a blockernode exists, so we are manipulating an existent iframe-element","                            currentIframeNode = noderef.next('iframe');","                            if (currentIframeNode) {","                                // First the most tricky part: We need to reset the position of JUST ITSA_REFNODE","                                previousNode = itsatoolbar.editorY.one('#itsatoolbar-ref');","                                previousNode.remove(false);","                                // now reposition the cursor","                                currentIframeNode.insert(ITSA_REFNODE, 'after');","                                // next: we read the src attribute","                                currentIframeSrc = currentIframeNode.get('src');","                            }","                        }","                        // Which function to call? Only with button 'Remove link' when there is already an anchorlink","                        callFunc = currentIframeNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);","                        callFunc(","                            'Inline iframe',","                            'Enter here the source to the iframe',","                            currentIframeSrc || 'http://',","                            function(e) {","                                var itsatoolbar = this,","                                    width = 420,","                                    height = 315,","                                    src;","                                if (e.buttonName==='ok') {","                                    src = e.value.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                                    if (currentIframeNode) {","                                        currentIframeNode.set('src', src);","                                    }","                                    else {","                                        noderef.setHTML('<span style=\"padding-left:'+width+'px; margin-right:-'+width+'px; padding-top:'+height+'px; \" class=\"'+ITSA_IFRAMEBLOCKER+' '+ITSA_IFRAMENODE+'\"></span><iframe width=\"'+width+'\" height=\"'+height+'\" src=\"' + src + '\" frameborder=\"0\"></iframe>');","                                        // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id ","                                        // of ITSA_REF_NODE. Because we need to keep the innercontent","                                        noderef.set('id', ITSA_REFSELECTION);","                                        noderef.toggleClass(ITSA_REFSELECTION, true);","                                    }","                                }","                                if (e.buttonName==='removelink') {","                                    if (currentIframeNode) {","                                        currentIframeNode.remove(false);","                                    }","                                    if (blockerNode) {","                                        blockerNode.remove(false);","                                    }","                                    itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});","                                    // take some time to let the sync do its work before set and remove cursor","                                    Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);","                                }","                                else {","                                    itsatoolbar._setCursorAtRef();","                                }","                            },","                            itsatoolbar","                        );","                    }","                });","            }","        }","","    }, {","        NS : 'itsatoolbar',","        ATTRS : {","","            /**","             * @description Defines whether keyboard-enter will lead to P-tag. Default=false (meaning that BR's will be created)","             * @attribute paraSupport","             * @type Boolean","            */","            paraSupport : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The sourceNode that holds the Toolbar. Could be an empty DIV.<br>","             * If not defined, than the Toolbar will be created just above the Editor.","             * By specifying the srcNode, one could create the Toolbar on top of the page, regardless of the Editor's position","             * @attribute srcNode","             * @type Y.Node ","            */","            srcNode : {","                value: null,","                writeOnce: 'initOnly',","                setter: function(val) {","                    return Y.one(val);","                },","                validator: function(val) {","                    return Y.one(val);","                }","            },","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 2,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description The amount of headerlevels that can be selected<br>","             * Should be a value from 1-9<br>","             * Default = 6","             * @attribute headerLevels","             * @type int","            */","            headerLevels : {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<10));","                }","            },","","            /**","             * @description The fontfamilies that can be selected.<br>","             * Be aware to supply fontFamilies that are supported by the browser.<br>","             * Typically usage is the standard families extended by some custom fonts.<br>","             * @attribute fontFamilies","             * @type Array [String]","            */","            fontFamilies : {","                value: [","                    'Arial',","                    'Arial Black',","                    'Comic Sans MS',","                    'Courier New',","                    'Lucida Console',","                    'Tahoma',","                    'Times New Roman',","                    'Trebuchet MS',","                    'Verdana'","                ],","                validator: function(val) {","                    return (Lang.isArray(val));","                }","            },","","            /**","             * @description Whether the button fontfamily is available<br>","             * Default = true","             * @attribute btnFontfamily","             * @type Boolean","            */","            btnFontfamily : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button fontsize is available<br>","             * Default = true","             * @attribute btnFontsize","             * @type Boolean","            */","            btnFontsize : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button headers is available<br>","             * because this function doesn't work well on all browsers, it is set of by default.<br>","             * Is something to work on in fututr releases. It works within firefox though.","             * Default = false","             * @attribute btnHeader","             * @type Boolean","            */","            btnHeader : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button bold is available<br>","             * Default = true","             * @attribute btnBold","             * @type Boolean","            */","            btnBold : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button italic is available<br>","             * Default = true","             * @attribute btnItalic","             * @type Boolean","            */","            btnItalic : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button underline is available<br>","             * Default = true","             * @attribute btnUnderline","             * @type Boolean","            */","            btnUnderline : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group align is available<br>","             * Default = true","             * @attribute grpAlign","             * @type Boolean","            */","            grpAlign : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button justify is available<br>","             * will only be shown in combination with grpalign","             * Default = true","             * @attribute btnJustify","             * @type Boolean","            */","            btnJustify : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group sub/superscript is available<br>","             * Default = true","             * @attribute grpSubsuper","             * @type Boolean","            */","            grpSubsuper : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button textcolor is available<br>","             * Default = true","             * @attribute btnTextcolor","             * @type Boolean","            */","            btnTextcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button markcolor is available<br>","             * Default = true","             * @attribute btnMarkcolor","             * @type Boolean","            */","            btnMarkcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group indent is available<br>","             * Default = true","             * @attribute grpIndent","             * @type Boolean","            */","            grpIndent : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group lists is available<br>","             * Default = true","             * @attribute grpLists","             * @type Boolean","            */","            grpLists : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","/*","            btnremoveformat : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","            btnhiddenelements : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","*/","","            /**","             * @description Whether the group undo/redo is available<br>","             * Default = true","             * @attribute grpUndoredo","             * @type Boolean","            */","            grpUndoredo : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button email is available<br>","             * Default = true","             * @attribute btnEmail","             * @type Boolean","            */","            btnEmail : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button hyperlink is available<br>","             * Default = true","             * @attribute btnHyperlink","             * @type Boolean","            */","            btnHyperlink : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button remove-hyperlink is available<br>","             * Default = true","             * @attribute btnRemoveHyperlink","             * @type Boolean","            */","            btnRemoveHyperlink : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button image is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though.","             * Default = false","             * @attribute btnImage","             * @type Boolean","            */","            btnImage : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button iframe is available<br>","             * because not all iframe-options can be entered, the function is disabled by default.<br>","             * It does work, but you cannot specify the iframesize.","             * Default = false","             * @attribute btnIframe","             * @type Boolean","            */","            btnIframe : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button video is available<br>","             * Default = true","             * @attribute btnVideo","             * @type Boolean","            */","            btnVideo : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button save is available<br>","             * Will only fire a 'save'-event, the user should take the approperiate action himself.","             * If the attribute 'confirmSave' is set: then a confirmationmessage will appear before.","             * Default = false","             * @attribute btnSave","             * @type Boolean","            */","            btnSave : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button cancel is available<br>","             * Will restore the initial content and fire a 'cancel'-event, the user can take the approperiate action himself.<br>","             * If the attribute 'confirmCancel' is set: then a confirmationmessage will appear before.","             * Default = false","             * @attribute btnCancel","             * @type Boolean","            */","            btnCancel : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button clear is available<br>","             * Will clear the editors content. If the attribute 'confirmClear' is set: then a confirmationmessage will appear before.","             * Default = false","             * @attribute btnClear","             * @type Boolean","            */","            btnClear : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether a confirmationmessage is shown before saving the editors content<br>","             * Only to be used in combination with btnSave=true.","             * Default = true","             * @attribute confirmSave","             * @type Boolean","            */","            confirmSave : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether a confirmationmessage is shown before canceling the editors content<br>","             * Only to be used in combination with btnCancel=true.","             * Default = true","             * @attribute confirmCancel","             * @type Boolean","            */","            confirmCancel : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether a confirmationmessage is shown before cleaning the editors content<br>","             * Only to be used in combination with btnClear=true.","             * Default = true","             * @attribute confirmClear","             * @type Boolean","            */","            confirmClear : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The colorpallet to use<br>","             * @attribute colorPallet","             * @type Array (String)","            */","            colorPallet : {","                value : [","                    '#111111',","                    '#2D2D2D',","                    '#434343',","                    '#5B5B5B',","                    '#737373',","                    '#8B8B8B',","                    '#A2A2A2',","                    '#B9B9B9',","                    '#000000',","                    '#D0D0D0',","                    '#E6E6E6',","                    '#FFFFFF',","                    '#BFBF00',","                    '#FFFF00',","                    '#FFFF40',","                    '#FFFF80',","                    '#FFFFBF',","                    '#525330',","                    '#898A49',","                    '#AEA945',","                    '#7F7F00',","                    '#C3BE71',","                    '#E0DCAA',","                    '#FCFAE1',","                    '#60BF00',","                    '#80FF00',","                    '#A0FF40',","                    '#C0FF80',","                    '#DFFFBF',","                    '#3B5738',","                    '#668F5A',","                    '#7F9757',","                    '#407F00',","                    '#8A9B55',","                    '#B7C296',","                    '#E6EBD5',","                    '#00BF00',","                    '#00FF80',","                    '#40FFA0',","                    '#80FFC0',","                    '#BFFFDF',","                    '#033D21',","                    '#438059',","                    '#7FA37C',","                    '#007F40',","                    '#8DAE94',","                    '#ACC6B5',","                    '#DDEBE2',","                    '#00BFBF',","                    '#00FFFF',","                    '#40FFFF',","                    '#80FFFF',","                    '#BFFFFF',","                    '#033D3D',","                    '#347D7E',","                    '#609A9F',","                    '#007F7F',","                    '#96BDC4',","                    '#B5D1D7',","                    '#E2F1F4',","                    '#0060BF',","                    '#0080FF',","                    '#40A0FF',","                    '#80C0FF',","                    '#BFDFFF',","                    '#1B2C48',","                    '#385376',","                    '#57708F',","                    '#00407F',","                    '#7792AC',","                    '#A8BED1',","                    '#DEEBF6',","                    '#0000BF',","                    '#0000FF',","                    '#4040FF',","                    '#8080FF',","                    '#BFBFFF',","                    '#212143',","                    '#373E68',","                    '#444F75',","                    '#00007F',","                    '#585E82',","                    '#8687A4',","                    '#D2D1E1',","                    '#6000BF',","                    '#8000FF',","                    '#A040FF',","                    '#C080FF',","                    '#DFBFFF',","                    '#302449',","                    '#54466F',","                    '#655A7F',","                    '#40007F',","                    '#726284',","                    '#9E8FA9',","                    '#DCD1DF',","                    '#BF00BF',","                    '#FF00FF',","                    '#FF40FF',","                    '#FF80FF',","                    '#FFBFFF',","                    '#4A234A',","                    '#794A72',","                    '#936386',","                    '#7F007F',","                    '#9D7292',","                    '#C0A0B6',","                    '#ECDAE5',","                    '#BF005F',","                    '#FF007F',","                    '#FF409F',","                    '#FF80BF',","                    '#FFBFDF',","                    '#451528',","                    '#823857',","                    '#A94A76',","                    '#7F003F',","                    '#BC6F95',","                    '#D8A5BB',","                    '#F7DDE9',","                    '#C00000',","                    '#FF0000',","                    '#FF4040',","                    '#FF8080',","                    '#FFC0C0',","                    '#441415',","                    '#82393C',","                    '#AA4D4E',","                    '#800000',","                    '#BC6E6E',","                    '#D8A3A4',","                    '#F8DDDD',","                    '#BF5F00',","                    '#FF7F00',","                    '#FF9F40',","                    '#FFBF80',","                    '#FFDFBF',","                    '#482C1B',","                    '#855A40',","                    '#B27C51',","                    '#7F3F00',","                    '#C49B71',","                    '#E1C4A8',","                    '#FDEEE0'","                ],","                validator: function(val) {","                    return Lang.isArray(val) ;","                }","","            }","        }","    }",");","","}, '@VERSION@', {","    \"supersedes\": [","        \"\"","    ],","    \"skinnable\": \"true\",","    \"requires\": [","        \"plugin\",","        \"base-build\",","        \"node-base\",","        \"editor\",","        \"event-delegate\",","        \"event-custom\",","        \"cssbutton\",","        \"gallery-itsaselectlist\",","        \"gallery-itsadialogbox\"","    ],","    \"optional\": [","        \"\"","    ]","});"];
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"].lines = {"1":0,"3":0,"25":0,"333":0,"383":0,"384":0,"386":0,"390":0,"402":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"410":0,"411":0,"412":0,"413":0,"414":0,"415":0,"416":0,"417":0,"420":0,"435":0,"442":0,"443":0,"444":0,"446":0,"449":0,"450":0,"455":0,"456":0,"460":0,"461":0,"462":0,"463":0,"466":0,"467":0,"468":0,"470":0,"479":0,"483":0,"485":0,"486":0,"487":0,"488":0,"490":0,"491":0,"492":0,"494":0,"495":0,"498":0,"510":0,"514":0,"515":0,"516":0,"518":0,"521":0,"522":0,"523":0,"531":0,"543":0,"546":0,"547":0,"556":0,"560":0,"562":0,"563":0,"565":0,"566":0,"567":0,"568":0,"571":0,"572":0,"573":0,"574":0,"577":0,"578":0,"579":0,"580":0,"583":0,"584":0,"585":0,"586":0,"598":0,"601":0,"602":0,"603":0,"604":0,"605":0,"609":0,"620":0,"621":0,"622":0,"634":0,"635":0,"645":0,"647":0,"648":0,"649":0,"651":0,"653":0,"671":0,"674":0,"675":0,"676":0,"677":0,"678":0,"679":0,"680":0,"681":0,"682":0,"685":0,"686":0,"687":0,"688":0,"690":0,"694":0,"696":0,"718":0,"720":0,"722":0,"726":0,"728":0,"729":0,"749":0,"751":0,"752":0,"769":0,"770":0,"774":0,"793":0,"800":0,"801":0,"802":0,"803":0,"805":0,"806":0,"807":0,"808":0,"809":0,"810":0,"811":0,"814":0,"846":0,"848":0,"849":0,"850":0,"851":0,"854":0,"856":0,"857":0,"858":0,"860":0,"862":0,"863":0,"864":0,"865":0,"866":0,"869":0,"873":0,"875":0,"885":0,"888":0,"889":0,"890":0,"891":0,"892":0,"893":0,"894":0,"897":0,"900":0,"901":0,"913":0,"918":0,"919":0,"921":0,"922":0,"925":0,"926":0,"928":0,"929":0,"931":0,"932":0,"934":0,"935":0,"937":0,"941":0,"942":0,"944":0,"954":0,"956":0,"959":0,"973":0,"974":0,"975":0,"977":0,"978":0,"979":0,"980":0,"982":0,"983":0,"984":0,"985":0,"987":0,"988":0,"989":0,"990":0,"1002":0,"1003":0,"1034":0,"1037":0,"1046":0,"1056":0,"1057":0,"1058":0,"1059":0,"1060":0,"1061":0,"1062":0,"1063":0,"1064":0,"1065":0,"1066":0,"1067":0,"1068":0,"1069":0,"1080":0,"1083":0,"1084":0,"1085":0,"1087":0,"1088":0,"1090":0,"1091":0,"1092":0,"1094":0,"1106":0,"1109":0,"1110":0,"1111":0,"1112":0,"1124":0,"1127":0,"1128":0,"1129":0,"1130":0,"1143":0,"1145":0,"1146":0,"1150":0,"1151":0,"1152":0,"1153":0,"1166":0,"1172":0,"1185":0,"1193":0,"1194":0,"1195":0,"1196":0,"1197":0,"1198":0,"1199":0,"1200":0,"1202":0,"1214":0,"1226":0,"1228":0,"1229":0,"1230":0,"1231":0,"1234":0,"1236":0,"1237":0,"1238":0,"1239":0,"1242":0,"1244":0,"1245":0,"1246":0,"1247":0,"1248":0,"1249":0,"1250":0,"1253":0,"1254":0,"1255":0,"1259":0,"1269":0,"1279":0,"1280":0,"1281":0,"1282":0,"1283":0,"1285":0,"1286":0,"1291":0,"1292":0,"1297":0,"1298":0,"1299":0,"1300":0,"1301":0,"1305":0,"1310":0,"1311":0,"1312":0,"1313":0,"1314":0,"1315":0,"1320":0,"1321":0,"1322":0,"1323":0,"1329":0,"1330":0,"1331":0,"1332":0,"1337":0,"1338":0,"1339":0,"1344":0,"1345":0,"1346":0,"1351":0,"1352":0,"1358":0,"1366":0,"1374":0,"1379":0,"1380":0,"1385":0,"1389":0,"1393":0,"1394":0,"1395":0,"1397":0,"1398":0,"1403":0,"1404":0,"1405":0,"1406":0,"1407":0,"1408":0,"1410":0,"1411":0,"1414":0,"1419":0,"1420":0,"1421":0,"1422":0,"1423":0,"1424":0,"1426":0,"1427":0,"1430":0,"1435":0,"1436":0,"1437":0,"1441":0,"1442":0,"1443":0,"1445":0,"1447":0,"1448":0,"1450":0,"1455":0,"1456":0,"1457":0,"1462":0,"1463":0,"1465":0,"1467":0,"1469":0,"1474":0,"1475":0,"1476":0,"1486":0,"1487":0,"1489":0,"1491":0,"1492":0,"1493":0,"1494":0,"1495":0,"1496":0,"1497":0,"1501":0,"1506":0,"1507":0,"1508":0,"1510":0,"1515":0,"1516":0,"1517":0,"1522":0,"1523":0,"1524":0,"1529":0,"1530":0,"1531":0,"1537":0,"1538":0,"1542":0,"1543":0,"1547":0,"1548":0,"1554":0,"1556":0,"1560":0,"1563":0,"1571":0,"1581":0,"1582":0,"1584":0,"1586":0,"1587":0,"1588":0,"1589":0,"1590":0,"1591":0,"1592":0,"1596":0,"1602":0,"1603":0,"1604":0,"1618":0,"1619":0,"1623":0,"1624":0,"1625":0,"1626":0,"1628":0,"1629":0,"1630":0,"1632":0,"1635":0,"1644":0,"1645":0,"1647":0,"1655":0,"1657":0,"1658":0,"1660":0,"1664":0,"1665":0,"1666":0,"1668":0,"1673":0,"1675":0,"1687":0,"1688":0,"1690":0,"1696":0,"1697":0,"1698":0,"1699":0,"1700":0,"1702":0,"1704":0,"1705":0,"1707":0,"1709":0,"1710":0,"1714":0,"1715":0,"1716":0,"1729":0,"1730":0,"1732":0,"1739":0,"1740":0,"1741":0,"1742":0,"1743":0,"1745":0,"1746":0,"1747":0,"1750":0,"1752":0,"1753":0,"1755":0,"1757":0,"1758":0,"1762":0,"1763":0,"1764":0,"1778":0,"1779":0,"1781":0,"1787":0,"1788":0,"1789":0,"1790":0,"1791":0,"1794":0,"1796":0,"1797":0,"1799":0,"1801":0,"1802":0,"1806":0,"1807":0,"1808":0,"1822":0,"1823":0,"1825":0,"1831":0,"1832":0,"1833":0,"1834":0,"1835":0,"1838":0,"1840":0,"1841":0,"1843":0,"1845":0,"1847":0,"1851":0,"1852":0,"1853":0,"1866":0,"1867":0,"1869":0,"1873":0,"1878":0,"1891":0,"1892":0,"1894":0,"1898":0,"1901":0,"1904":0,"1916":0,"1917":0,"1921":0,"1934":0,"1937":0,"1938":0,"1939":0,"1940":0,"1941":0,"1943":0,"1944":0,"1947":0,"1948":0,"1949":0,"1950":0,"1951":0,"1952":0,"1955":0,"1956":0,"1957":0,"1958":0,"1961":0,"1964":0,"1965":0,"1967":0,"1972":0,"1973":0,"1978":0,"1979":0,"1980":0,"1981":0,"1982":0,"1985":0,"1988":0,"1989":0,"1992":0,"1993":0,"1994":0,"1997":0,"1999":0,"2001":0,"2004":0,"2021":0,"2022":0,"2026":0,"2032":0,"2035":0,"2036":0,"2037":0,"2038":0,"2039":0,"2041":0,"2042":0,"2043":0,"2046":0,"2048":0,"2050":0,"2064":0,"2065":0,"2067":0,"2079":0,"2082":0,"2083":0,"2084":0,"2085":0,"2086":0,"2088":0,"2089":0,"2090":0,"2093":0,"2094":0,"2095":0,"2096":0,"2097":0,"2100":0,"2101":0,"2102":0,"2103":0,"2106":0,"2109":0,"2110":0,"2112":0,"2117":0,"2118":0,"2123":0,"2126":0,"2127":0,"2128":0,"2129":0,"2132":0,"2135":0,"2136":0,"2139":0,"2140":0,"2141":0,"2144":0,"2146":0,"2148":0,"2151":0,"2168":0,"2169":0,"2171":0,"2182":0,"2185":0,"2186":0,"2187":0,"2190":0,"2191":0,"2192":0,"2193":0,"2194":0,"2197":0,"2198":0,"2199":0,"2200":0,"2203":0,"2206":0,"2207":0,"2209":0,"2214":0,"2219":0,"2220":0,"2221":0,"2222":0,"2223":0,"2226":0,"2229":0,"2230":0,"2233":0,"2234":0,"2235":0,"2237":0,"2240":0,"2257":0,"2258":0,"2260":0,"2275":0,"2276":0,"2278":0,"2280":0,"2281":0,"2283":0,"2284":0,"2286":0,"2288":0,"2290":0,"2291":0,"2296":0,"2297":0,"2302":0,"2307":0,"2308":0,"2310":0,"2311":0,"2313":0,"2314":0,"2315":0,"2318":0,"2321":0,"2322":0,"2326":0,"2327":0,"2328":0,"2330":0,"2331":0,"2333":0,"2335":0,"2338":0,"2354":0,"2355":0,"2357":0,"2366":0,"2367":0,"2369":0,"2371":0,"2372":0,"2374":0,"2375":0,"2377":0,"2379":0,"2383":0,"2384":0,"2389":0,"2393":0,"2394":0,"2395":0,"2396":0,"2399":0,"2402":0,"2403":0,"2406":0,"2407":0,"2408":0,"2410":0,"2411":0,"2413":0,"2415":0,"2418":0,"2440":0,"2455":0,"2458":0,"2472":0,"2486":0,"2510":0,"2523":0,"2536":0,"2551":0,"2564":0,"2577":0,"2590":0,"2603":0,"2617":0,"2630":0,"2643":0,"2656":0,"2669":0,"2682":0,"2709":0,"2722":0,"2735":0,"2748":0,"2763":0,"2778":0,"2791":0,"2806":0,"2821":0,"2835":0,"2849":0,"2863":0,"2877":0,"3034":0};
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"].functions = {"initializer:382":0,"_render:401":0,"_getCursorRef:434":0,"(anonymous 2):492":0,"_removeCursorRef:478":0,"(anonymous 3):517":0,"_createBlockerRefs:509":0,"_clearBlockerRef:542":0,"(anonymous 4):567":0,"(anonymous 5):573":0,"(anonymous 6):579":0,"(anonymous 7):585":0,"_clearEmptyFontRef:555":0,"_setCursorAtRef:597":0,"_createBackupCursorRef:619":0,"_getBackupCursorRef:633":0,"sync:643":0,"(anonymous 8):694":0,"addButton:670":0,"(anonymous 9):726":0,"addSyncButton:717":0,"addToggleButton:748":0,"(anonymous 10):774":0,"addButtongroup:768":0,"_addButtongroup:792":0,"(anonymous 11):850":0,"(anonymous 12):873":0,"addSelectlist:845":0,"(anonymous 13):896":0,"destructor:884":0,"_renderUI:912":0,"_bindUI:953":0,"_handleShortcutFn:972":0,"_createUrlDialog:1001":0,"getUrl:1033":0,"_defineCustomExecCommands:1055":0,"_handleBtnClick:1079":0,"_handleSelectChange:1105":0,"_execCommandFromData:1123":0,"execCommand:1142":0,"_hasSelection:1165":0,"_checkInbetweenSelector:1184":0,"_getActiveHeader:1213":0,"(anonymous 14):1285":0,"(anonymous 15):1300":0,"(anonymous 16):1314":0,"(anonymous 17):1330":0,"(anonymous 18):1338":0,"(anonymous 19):1345":0,"syncFunc:1357":0,"syncFunc:1365":0,"syncFunc:1373":0,"syncFunc:1384":0,"(anonymous 20):1394":0,"(anonymous 21):1397":0,"(anonymous 22):1410":0,"(anonymous 23):1426":0,"(anonymous 24):1442":0,"(anonymous 25):1447":0,"(anonymous 26):1456":0,"(anonymous 27):1475":0,"(anonymous 28):1507":0,"(anonymous 29):1516":0,"(anonymous 30):1523":0,"(anonymous 31):1530":0,"(anonymous 33):1562":0,"(anonymous 32):1559":0,"(anonymous 34):1570":0,"_initializeButtons:1268":0,"_filter_rgb:1617":0,"itsaheading:1646":0,"_defineExecCommandHeader:1643":0,"itsafontfamily:1689":0,"_defineExecCommandFontFamily:1686":0,"itsafontsize:1731":0,"_defineExecCommandFontSize:1728":0,"itsafontcolor:1780":0,"_defineExecCommandFontColor:1777":0,"itsamarkcolor:1824":0,"_defineExecCommandMarkColor:1821":0,"itsasavecontent:1868":0,"_defineExecSaveContent:1865":0,"itsasetcontent:1893":0,"_defineExecSetContent:1890":0,"(anonymous 35):1977":0,"itsacreatehyperlink:1920":0,"_defineExecCommandHyperlink:1915":0,"itsaremovehyperlink:2025":0,"_defineExecCommandRemoveHyperlink:2020":0,"(anonymous 36):2122":0,"itsacreatemaillink:2066":0,"_defineExecCommandMaillink:2063":0,"(anonymous 37):2218":0,"itsacreateimage:2170":0,"_defineExecCommandImage:2167":0,"(anonymous 38):2301":0,"itsacreateyoutube:2259":0,"_defineExecCommandYouTube:2256":0,"(anonymous 39):2388":0,"itsacreateiframe:2356":0,"_defineExecCommandIframe:2353":0,"validator:2439":0,"setter:2454":0,"validator:2457":0,"validator:2471":0,"validator:2485":0,"validator:2509":0,"validator:2522":0,"validator:2535":0,"validator:2550":0,"validator:2563":0,"validator:2576":0,"validator:2589":0,"validator:2602":0,"validator:2616":0,"validator:2629":0,"validator:2642":0,"validator:2655":0,"validator:2668":0,"validator:2681":0,"validator:2708":0,"validator:2721":0,"validator:2734":0,"validator:2747":0,"validator:2762":0,"validator:2777":0,"validator:2790":0,"validator:2805":0,"validator:2820":0,"validator:2834":0,"validator:2848":0,"validator:2862":0,"validator:2876":0,"validator:3033":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredLines = 765;
_yuitest_coverage["build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredFunctions = 135;
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1);
YUI.add('gallery-itsatoolbar', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 3);
'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module gallery-itsatoolbar
 */

/**
 * Editor Toolbar Plugin
 * 
 *
 * @class Plugin.ITSAToolbar
 * @extends Plugin.Base
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 25);
var Lang = Y.Lang,
    Node = Y.Node,

    ITSA_BTNNODE = "<button class='yui3-button'></button>",
    ITSA_BTNINNERNODE = "<span class='itsa-button-icon'></span>",
    ITSA_BTNPRESSED = 'yui3-button-active',
    ITSA_BTNACTIVE = 'itsa-button-active',
    ITSA_BTNINDENT = 'itsa-button-indent',
    ITSA_BUTTON = 'itsa-button',
    ITSA_BTNSYNC = 'itsa-syncbutton',
    ITSA_BTNTOGGLE = 'itsa-togglebutton',
    ITSA_BTNGROUP = 'itsa-buttongroup',
    ITSA_BTNCUSTOMFUNC = 'itsa-button-customfunc',
    ITSA_TOOLBAR_TEMPLATE = "<div class='itsatoolbar'></div>",
    ITSA_TOOLBAR_SMALL = 'itsa-buttonsize-small',
    ITSA_TOOLBAR_MEDIUM = 'itsa-buttonsize-medium',
    ITSA_CLASSEDITORPART = 'itsatoolbar-editorpart',
    ITSA_SELECTCONTNODE = '<div></div>',
    ITSA_TMPREFNODE = "<img id='itsatoolbar-tmpref' />",
    ITSA_REFEMPTYCONTENT = "<img class='itsatoolbar-tmpempty' src='itsa-buttonicons-2012-08-15.png' width=0 height=0>",
    ITSA_REFNODE = "<span id='itsatoolbar-ref'></span>",
    ITSA_REFSELECTION = 'itsa-selection-tmp',
    ITSA_FONTSIZENODE = 'itsa-fontsize',
    ITSA_FONTFAMILYNODE = 'itsa-fontfamily',
    ITSA_FONTCOLORNODE = 'itsa-fontcolor',
    ITSA_MARKCOLORNODE = 'itsa-markcolor',
    ITSA_IFRAMENODE = 'itsa-iframenode',
    ITSA_YOUTUBENODE = 'itsa-youtubenode',
    ITSA_IFRAMEBLOCKER = 'itsa-iframeblocker',
    ITSA_IFRAMEBLOCKER_CSS = '.itsa-iframeblocker {position: relative; z-index: 1; background-color:#FFF; opacity:0; filter:alpha(opacity=0;} .itsa-iframeblocker:hover {opacity:0.4; filter:alpha(opacity=40;}',
    ITSA_IFRAMEBLOCKER_TEMPLATE = '<span style="padding-left:{width}px; margin-right:-{width}px; padding-top:{height}px; " class="'+ITSA_IFRAMEBLOCKER+' {node}"></span>';

    // DO NOT make ITSA_IFRAMEBLOCKER_CSS position absolute! FF will append resizehandlers which we don't want

// -- Public Static Properties -------------------------------------------------

/**
 * Reference to the editor's instance
 * @property editor
 * @type Y.EditorBase instance
 */

/**
 * Initial content of the editor
 * @property initialContent
 * @type String
 */

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

/**
 * Reference to the Y-instance of the host-editor
 * @property editorY
 * @type YUI-instance
 */

/**
 * Reference to the editor's iframe-node
 * @property editorNode
 * @type Y.Node
 */

/**
 * Reference to the editor's container-node, in which the host-editor is rendered.<br>
 * This is in fact editorNode.get('parentNode')
 * @property containerNode
 * @type Y.Node
 */

/**
 * Reference to the toolbar-node.<br>
 * @property toolbarNode
 * @type Y.Node
 */

/**
 * Used internally to check if the toolbar should still be rendered after the editor is rendered<br>
 * To prevent rendering while it is already unplugged
 * @property _destroyed
 * @private
 * @type Boolean
 */

/**
 * Timer: used internally to clean up empty fontsize-markings<br>
 * @property _timerClearEmptyFontRef
 * @private
 * @type Object
 */

/**
 * Reference to a backup cursorposition<br>
 * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected.
 * Reference is made on a show-event of the selectlist.
 * @property _backupCursorRef
 * @private
 * @type Y.Node
 */

/**
 * ItsaDialogBox-Reference to a the custom internat getUrl-panel<br>
 * Will be created during initialization
 * @property _dialogPanelId
 * @private
 * @type int
 */

/**
 * Backup of the editors-value 'extracss'. Need to use internally, because the toolbar will add extra css of its own.<br>
 * @property _extracssBKP
 * @private
 * @type int
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_BOLD
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ITALIC
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_UNDERLINE
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ALIGN_LEFT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ALIGN_CENTER
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ALIGN_RIGHT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ALIGN_JUSTIFY
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_SUBSCRIPT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_SUPERSCRIPT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_TEXTCOLOR
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_MARKCOLOR
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_INDENT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_OUTDENT
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_UNORDEREDLIST
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_ORDEREDLIST
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_UNDO
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_REDO
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_EMAIL
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_REMOVELINK
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_HYPERLINK
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_IMAGE
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_IFRAME
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_FILE
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_VIDEO
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_SAVE
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_CANCEL
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_CLEAR
 * @type String
 */

_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 333);
Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {

        editor : null,
        editorY : null,
        editorNode : null,
        containerNode : null,
        toolbarNode : null,
        _destroyed : false,
        _timerClearEmptyFontRef : null,
        _backupCursorRef : null,
        _dialogPanelId : null,
        _extracssBKP : '',
        _eventhandlers : [],

        ICON_BOLD : 'itsa-icon-bold',
        ICON_ITALIC : 'itsa-icon-italic',
        ICON_UNDERLINE : 'itsa-icon-underline',
        ICON_ALIGN_LEFT : 'itsa-icon-alignleft',
        ICON_ALIGN_CENTER : 'itsa-icon-aligncenter',
        ICON_ALIGN_RIGHT : 'itsa-icon-alignright',
        ICON_ALIGN_JUSTIFY : 'itsa-icon-alignjustify',
        ICON_SUBSCRIPT : 'itsa-icon-subscript',
        ICON_SUPERSCRIPT : 'itsa-icon-superscript',
        ICON_TEXTCOLOR : 'itsa-icon-textcolor',
        ICON_MARKCOLOR : 'itsa-icon-markcolor',
        ICON_INDENT : 'itsa-icon-indent',
        ICON_OUTDENT : 'itsa-icon-outdent',
        ICON_UNORDEREDLIST : 'itsa-icon-unorderedlist',
        ICON_ORDEREDLIST : 'itsa-icon-orderedlist',
        ICON_UNDO : 'itsa-icon-undo',
        ICON_REDO : 'itsa-icon-redo',
        ICON_EMAIL : 'itsa-icon-email',
        ICON_HYPERLINK : 'itsa-icon-hyperlink',
        ICON_REMOVELINK : 'itsa-icon-removelink',
        ICON_IFRAME : 'itsa-icon-iframe',
        ICON_IMAGE : 'itsa-icon-image',
        ICON_FILE : 'itsa-icon-file',
        ICON_VIDEO : 'itsa-icon-video',
        ICON_SAVE : 'itsa-icon-save',
        ICON_CANCEL : 'itsa-icon-cancel',
        ICON_CLEAR : 'itsa-icon-clear',

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @param {Object} config The config-object.
         * @protected
        */
        initializer : function(config) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "initializer", 382);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 383);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 384);
instance.editor = instance.get('host');
            // need to make sure we can use execCommand, so do not render before the frame exists.
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 386);
if (instance.editor.frame && instance.editor.frame.get('node')) {instance._render();}
            else {
                // do not subscribe to the frame:ready, but to the ready-event
                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 390);
instance.editor.on('ready', instance._render, instance);
            }
        },

        /**
         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.
         * It will invoke renderUI, bindUI and syncUI, just as within a widget.
         *
         * @method _render
         * @private
        */
        _render : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_render", 401);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 402);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 403);
if (!instance._destroyed) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 404);
instance.initialContent = instance.editor.get('content');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 405);
instance.editorY = instance.editor.getInstance();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 406);
instance.editorNode = instance.editor.frame.get('node');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 407);
instance.containerNode = instance.editorNode.get('parentNode');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 408);
instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);
                // make the iframeblocker work through css:
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 410);
instance._extracssBKP = instance.editor.get('extracss');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 411);
instance.editor.set('extracss', instance._extracssBKP + ITSA_IFRAMEBLOCKER_CSS);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 412);
instance.editor.plug(Y.Plugin.ExecCommand);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 413);
instance._defineCustomExecCommands();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 414);
instance._createUrlDialog();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 415);
instance._createBlockerRefs();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 416);
instance._renderUI();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 417);
instance._bindUI();
                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object
                // be sure the editor has focus already focus, otherwise safari cannot inserthtml at cursorposition!
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 420);
instance.editor.frame.focus(Y.bind(instance.sync, instance));
            }
        },

        /**
         * Returns node at cursorposition<br>
         * This can be a selectionnode, or -in case of no selection- a new tmp-node (empty span) that will be created to serve as reference.
         * In case of selection, there will always be made a tmp-node as placeholder. But in that case, the tmp-node will be just before the returned node.
         * @method _getCursorRef
         * @private
         * @param {Boolean} [selectionIfAvailable] do return the selectionnode if a selection is made. If set to false, then always just the cursornode will be returned. 
         * Which means -in case of selection- that the cursornode exists as a last child of the selection. Default = false.
         * @return {Y.Node} created empty referencenode
        */
        _getCursorRef : function(selectionIfAvailable) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_getCursorRef", 434);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 435);
var instance = this,
                node,
                tmpnode,
                sel,
                out;
            // insert cursor and use that node as the selected node
            // first remove previous
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 442);
instance._removeCursorRef();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 443);
sel = new instance.editorY.EditorSelection();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 444);
if (!sel.isCollapsed && sel.anchorNode) {
                // We have a selection
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 446);
out = sel.getSelected();
                // a bug in Opera makes sel.getSelected()==='undefined. not bound to any nodes', even if there is a selection
                // we CANNOT use (typeof out === 'undefined'), because it IS a nodelist, but an empty one.
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 449);
if (out.size()===0) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 450);
out = sel.anchorNode.all('[style],font[face]');
                    // even now, out.size can still be 0. !!!
                    // This is the case when you select exactly one tag, for instance an image.
                    // so we need to check for out.size()>0 before assinging out.item(0)
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 455);
if (out.size()>0) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 456);
node = out.item(0);
                }
            }
            // node only exist when selection is available
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 460);
if (node) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 461);
node.addClass(ITSA_REFSELECTION);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 462);
node.insert(ITSA_REFNODE, 'after');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 463);
if (!(Lang.isBoolean(selectionIfAvailable) && selectionIfAvailable)) {node = instance.editorY.one('#itsatoolbar-ref');}
            }
            else {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 466);
instance.editor.focus();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 467);
instance.execCommand('inserthtml', ITSA_REFNODE);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 468);
node = instance.editorY.one('#itsatoolbar-ref');
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 470);
return node;
        },

        /**
         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef
         * @method _removeCursorRef
         * @private
        */
        _removeCursorRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_removeCursorRef", 478);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 479);
var instance = this,
                node,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 483);
useY = instance.editorY || Y;
            // first cleanup single referencenode
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 485);
node = useY.all('#itsatoolbar-ref');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 486);
if (node) {node.remove();}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 487);
node = useY.all('#itsatoolbar-tmpempty');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 488);
if (node) {node.remove();}
            // next clean up all selections, by replacing the nodes with its html-content. Thus elimination the <span> definitions
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 490);
node = useY.all('.' + ITSA_REFSELECTION);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 491);
if (node.size()>0) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 492);
node.each(function(node){
                    // NEED to trim, because node.replace(' ') throws an error !?!
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 2)", 492);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 494);
if (Lang.trim(node.getHTML())==='') {
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 495);
node.remove(false);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 498);
node.replace(node.getHTML());
                    }
                });
            }
        },

        /**
         * Creates blocker spans above iframe-elements to make them clickable.
         * @method _createBlockerRefs
         * @private
        */
        _createBlockerRefs: function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_createBlockerRefs", 509);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 510);
var instance = this,
                alliframes,
                regExp = /^http:\/\/www\.youtube\.com\/embed\/(\w+)/; // search for strings like http://www.youtube.com/embed/PHIaeHAcE_A&whatever
            // first remove old references, should they exists    
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 514);
instance._clearBlockerRef();    
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 515);
alliframes = instance.editorY.all('iframe');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 516);
alliframes.each(
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 3)", 517);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 518);
var blocker,
                        width,
                        height;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 521);
width = node.get('width');
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 522);
height = node.get('height');
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 523);
blocker = Lang.sub(
                        ITSA_IFRAMEBLOCKER_TEMPLATE,
                        {
                            width: width || 315,
                            height: height || 420,
                            node: regExp.test(node.get('src') || '') ? ITSA_YOUTUBENODE : ITSA_IFRAMENODE
                        }
                    );
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 531);
node.insert(blocker, 'before');
                },
                instance
            );
        },

        /**
         * Removes blocker spans that are created above iframe-elements to make them clickable.
         * @method _clearBlockerRef
         * @private
        */
        _clearBlockerRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_clearBlockerRef", 542);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 543);
var instance = this,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 546);
useY = instance.editorY || Y;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 547);
useY.all('.'+ITSA_IFRAMEBLOCKER).remove(false);
        },

        /**
         * Removes temporary created font-size-ref-Node that might have been created by inserting fontsizes
         * @method _clearEmptyFontRef
         * @private
        */
        _clearEmptyFontRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_clearEmptyFontRef", 555);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 556);
var instance = this,
                node,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 560);
useY = instance.editorY || Y;
            // first cleanup single referencenode
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 562);
node = useY.all('.itsatoolbar-tmpempty');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 563);
if (node) {node.remove();}
            // next clean up all references that are empty
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 565);
node = useY.all('.itsa-fontsize');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 566);
if (node.size()>0) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 567);
node.each(function(node){
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 4)", 567);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 568);
if (node.getHTML()==='') {node.remove();}
                });
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 571);
node = useY.all('.itsa-fontfamily');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 572);
if (node.size()>0) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 573);
node.each(function(node){
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 5)", 573);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 574);
if (node.getHTML()==='') {node.remove();}
                });
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 577);
node = useY.all('.itsa-fontcolor');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 578);
if (node.size()>0) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 579);
node.each(function(node){
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 6)", 579);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 580);
if (node.getHTML()==='') {node.remove();}
                });
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 583);
node = useY.all('.itsa-markcolor');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 584);
if (node.size()>0) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 585);
node.each(function(node){
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 7)", 585);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 586);
if (node.getHTML()==='') {node.remove();}
                });
            }
        },

        /**
         * Sets the real editorcursor at the position of the tmp-node created by _getCursorRef<br>
         * Removes the cursor tmp-node afterward.
         * @method _setCursorAtRef
         * @private
        */
        _setCursorAtRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_setCursorAtRef", 597);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 598);
var instance = this,
                sel,
                node = instance.editorY.one('#itsatoolbar-ref');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 601);
if (node) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 602);
instance.editor.focus();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 603);
sel = new instance.editorY.EditorSelection();
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 604);
sel.selectNode(node);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 605);
instance._removeCursorRef();
            }
            else {
                // even without '#itsatoolbar-ref' there might still be nodes that need to be cleaned up
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 609);
instance._removeCursorRef();
            }
        },

        /**
         * Creates a reference at cursorposition for backupusage<br>
         * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected.
         * @method _createBackupCursorRef
         * @private
        */
        _createBackupCursorRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_createBackupCursorRef", 619);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 620);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 621);
instance._backupCursorRef = instance._getCursorRef(true);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 622);
return instance._backupCursorRef;
        },

        /**
         * Returns backupnode at cursorposition that is created by _createBackupCursorRef()<br>
         * Is needed for ItsaSelectlist instances, because IE will loose focus when an item is selected.
         * So descendenst of ItsaSelectlist should refer to this cursorref.
         * @method _getBackupCursorRef
         * @private
         * @return {Y.Node} created empty referencenode
        */
        _getBackupCursorRef : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_getBackupCursorRef", 633);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 634);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 635);
return instance._backupCursorRef || instance._getCursorRef(true);
        },

        /**
         * Syncs the toolbar's status with the editor.<br>
         * @method sync
         * @param {EventFacade} [e] will be passed when the editor fires a nodeChange-event, but if called manually, leave e undefined. Then the function will search for the current cursorposition.
        */
        sync : function(e) {
            // syncUI will sync the toolbarstatus with the editors cursorposition
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "sync", 643);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 645);
var instance = this,
                cursorRef;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 647);
if (!(e && e.changedNode)) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 648);
cursorRef = instance._getCursorRef(false);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 649);
if (!e) {e = {changedNode: cursorRef};}
                else {e.changedNode = cursorRef;}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 651);
Y.later(250, instance, instance._removeCursorRef);
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 653);
if (instance.toolbarNode) {instance.toolbarNode.fire('itsatoolbar:statusChange', e);}
        },

        /**
         * Creates a new Button on the Toolbar. By default at the end of the toolbar.
         * @method addButton
         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.
         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>
         * when execCommand consists of a command and a value, or you want a custom Function to be executed, you must supply an object:<br>
         * <i>- [command]</i> (String): the execcommand<br>
         * <i>- [value]</i> (String): additional value
         * <i>- [customFunc]</i> (Function): reference to custom function: typicaly, this function will call editorinstance.itstoolbar.execCommand() by itsself
         * <i>- [context]]</i> (instance): the context for customFunc
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.Node} reference to the created buttonnode
        */
        addButton : function(iconClass, execCommand, indent, position) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButton", 670);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 671);
var instance = this,
                buttonNode,
                buttonInnerNode;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 674);
buttonNode = Node.create(ITSA_BTNNODE);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 675);
buttonNode.addClass(ITSA_BUTTON);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 676);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
            else {_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 677);
if (Lang.isObject(execCommand)) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 678);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 679);
if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 680);
if (Lang.isFunction(execCommand.customFunc)) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 681);
buttonNode.addClass(ITSA_BTNCUSTOMFUNC);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 682);
buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);
                }
            }}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 685);
if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 686);
buttonInnerNode = Node.create(ITSA_BTNINNERNODE);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 687);
buttonInnerNode.addClass(iconClass);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 688);
buttonNode.append(buttonInnerNode);
            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist 
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 690);
if (instance.toolbarNode) {instance.toolbarNode.append(buttonNode);}
            else {
                // do not subscribe to the frame:ready, but to the ready-event
                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 694);
instance.editor.on('ready', function(e, buttonNode){_yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 8)", 694);
instance.toolbarNode.append(buttonNode);}, instance, buttonNode);
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 696);
return buttonNode;
        },

        /**
         * Creates a new syncButton on the Toolbar. By default at the end of the toolbar.<br>
         * A syncButton is just like a normal toolbarButton, with the exception that the editor can sync it's status, which cannot be done with a normal button. 
         * Typically used in situations like a hyperlinkbutton: it never stays pressed, but when the cursos is on a hyperlink, he buttons look will change.
         * @method addSyncButton
         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.
         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>
         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>
         * <i>- command</i> (String): the execcommand<br>
         * <i>- value</i> (String): additional value
         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.
         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.
         * This function should handle the responseaction to be taken.
         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.Node} reference to the created buttonnode
        */
        addSyncButton : function(iconClass, execCommand, syncFunc, context, indent, position, isToggleButton) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSyncButton", 717);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 718);
var instance = this,
                buttonNode = instance.addButton(iconClass, execCommand, indent, position);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 720);
if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}
            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist 
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 722);
if (instance.toolbarNode) {instance.toolbarNode.addTarget(buttonNode);}
            else {
                // do not subscribe to the frame:ready, but to the ready-event
                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 726);
instance.editor.on('ready', function(e, buttonNode){_yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 9)", 726);
instance.toolbarNode.addTarget(buttonNode);}, instance, buttonNode);
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 728);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 729);
return buttonNode;
        },

        /**
         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.
         * @method addToggleButton
         * @param {String} iconClass Defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.
         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>
         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>
         * <i>- command</i> (String): the execcommand<br>
         * <i>- value</i> (String): additional value
         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.
         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.
         * This function should handle the responseaction to be taken.
         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.Node} reference to the created buttonnode
        */
        addToggleButton : function(iconClass, execCommand, syncFunc, context, indent, position) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addToggleButton", 748);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 749);
var instance = this,
                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 751);
buttonNode.addClass(ITSA_BTNTOGGLE);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 752);
return buttonNode;
        },

        /**
         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.
         * Position is by default at the end of the toolbar.<br>
         * @method addButtongroup
         * @param {Array} buttons Should consist of objects with two fields:<br>
         * <i>- iconClass</i> (String): defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.
         * <i>- command</i> (String): the execcommand that will be executed on buttonclick
         * <i>- [value]</i> (String) optional: additional value for the execcommand
         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)
         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
        */
        addButtongroup : function(buttons, indent, position) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButtongroup", 768);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 769);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 770);
if (instance.toolbarNode) {instance._addButtongroup(buttons, indent, position);}
            else {
                // do not subscribe to the frame:ready, but to the ready-event
                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 774);
instance.editor.on('ready', function(e, buttons, indent, position){_yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 10)", 774);
instance._addButtongroup(buttons, indent, position);}, instance, buttons, indent, position);
            }
        },

        /**
         * Does the real action of addButtongroup, but assumes that the editor is rendered.<br>
         * therefore not to be called mannually, only by addButtongroup()
         * @method _addButtongroup
         * @private
         * @param {Array} buttons Should consist of objects with at least two fields:<br>
         * <i>- iconClass</i> (String): defines the icon's look. Refer to the static Properties for some predefined classes like ICON_BOLD.<br>
         * <i>- command</i> (String): the execcommand that will be executed on buttonclick.<br>
         * <i>- [value]</i> (String) optional: additional value for the execcommand.<br>
         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton).<br>
         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance.
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
        */
        _addButtongroup : function(buttons, indent, position) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_addButtongroup", 792);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 793);
var instance = this,
                buttonGroup = Y.guid(),
                button,
                buttonNode,
                returnNode = null,
                execCommand,
                i;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 800);
for (i=0; i<buttons.length; i++) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 801);
button = buttons[i];
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 802);
if (button.iconClass && button.command) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 803);
if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}
                    else {execCommand = button.command;}
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 805);
buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position ? position+i : null));
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 806);
buttonNode.addClass(ITSA_BTNGROUP);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 807);
buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 808);
buttonNode.setData('buttongroup', buttonGroup);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 809);
instance.toolbarNode.addTarget(buttonNode);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 810);
if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 811);
if (!returnNode) {returnNode = buttonNode;}
                }
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 814);
return returnNode;
        },
        /**
         * Creates a selectList on the Toolbar. By default at the end of the toolbar.
         * When fired, the event-object returnes with 2 fields:<br>
         * <i>- e.value</i>: value of selected item<br>
         * <i>- e.index</i>: indexnr of the selected item<br>.
         * CAUTION: when using a selectlist, you <u>cannot</u> use standard execCommands. That will not work in most browsers, because the focus will be lost. <br>
         * Instead, create your customexecCommand and use cursorrefference <i>_getBackupCursorRef()</i>: see example <i>_defineExecCommandFontFamily()</i>
         * @method addSelectList
         * @param {Array} items contains all the items. Should be either a list of (String), or a list of (Objects). In case of an Object-list, the objects should contain two fields:<br>
         * <i>- text</i> (String): the text shown in the selectlist<br>
         * <i>- returnValue</i> (String): the returnvalue of e.value<br>
         * In case a String-list is supplied, e.value will equal to the selected String-item (returnvalue==text)

         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.execCommand().<br>
         * You could provide a second 'restoreCommand', in case you need a different execCommand to erase some format. In that case you must supply an object with three fields:<br>
         * <i>- command</i> (String): the standard execcommand<br>
         * <i>- restoreCommand</i> (String): the execcommand that will be executed in case e.value equals the restore-value<br>
         * <i>- restoreValue</i> (String): when e.value equals restoreValue, restoreCommand will be used instead of the standard command


         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.
         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Object} [config] Object that will be passed into the selectinstance. Has with the following fields:<br>
         * <i>- listAlignRight</i> (Boolean): whether to rightalign the listitems. Default=false<br>
         * <i>- hideSelected</i> (Boolean): whether the selected item is hidden from the list. Default=false
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.ITSASelectlist} reference to the created object
        */
        addSelectlist : function(items, execCommand, syncFunc, context, indent, config, position) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSelectlist", 845);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 846);
var instance = this,
                selectlist;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 848);
config = Y.merge(config, {items: items, defaultButtonText: ''});
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 849);
selectlist = new Y.ITSASelectList(config);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 850);
selectlist.after('render', function(e, execCommand, syncFunc, context, indent){
                _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 11)", 850);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 851);
var instance = this,
                    selectlist = e.currentTarget,
                    buttonNode = selectlist.buttonNode;
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 854);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
                else {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 856);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 857);
if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 858);
if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 860);
if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}
                // instance.toolbarNode should always exist here
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 862);
instance.toolbarNode.addTarget(buttonNode);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 863);
selectlist.on('show', instance._createBackupCursorRef, instance);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 864);
selectlist.on('selectChange', instance._handleSelectChange, instance);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 865);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.rbind(syncFunc, context || instance));}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 866);
instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);
            }, instance, execCommand, syncFunc, context, indent);
            // be aware of that addButton might get called when the editor isn't rendered yet. In that case instance.toolbarNode does not exist 
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 869);
if (instance.toolbarNode) {selectlist.render(instance.toolbarNode);}
            else {
                // do not subscribe to the frame:ready, but to the ready-event
                // Iliyan Peychev made an editor that doesn't use Frame, so this way it works on all editors
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 873);
instance.editor.on('ready', function(){_yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 12)", 873);
selectlist.render(instance.toolbarNode);}, instance);
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 875);
return selectlist;
        },


        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "destructor", 884);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 885);
var instance = this,
                srcNode = instance.get('srcNode');
             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 888);
instance._destroyed = true;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 889);
instance._removeCursorRef();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 890);
if (instance._timerClearEmptyFontRef) {instance._timerClearEmptyFontRef.cancel();}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 891);
instance._clearEmptyFontRef();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 892);
instance._clearBlockerRef();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 893);
instance.editor.set('extracss', instance._extracssBKP);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 894);
Y.Array.each(
                instance._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 13)", 896);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 897);
item.detach();
                }
            );
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 900);
if (instance.toolbarNode) {instance.toolbarNode.remove(true);}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 901);
if (instance._dialogPanelId) {Y.Global.ItsaDialog.panelOptions.splice(instance._dialogPanelId, 1);}
        },

        // -- Private Methods ----------------------------------------------------------

        /**
         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode 
         *
         * @method _renderUI
         * @private
        */
        _renderUI : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_renderUI", 912);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 913);
var instance = this,
                correctedHeight = 0,
                srcNode = instance.get('srcNode'),
                btnSize = instance.get('btnSize');
            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 918);
instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 919);
if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}
            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 921);
if (srcNode) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 922);
srcNode.prepend(instance.toolbarNode);
            }
            else {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 925);
instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 926);
switch (instance.get('btnSize')) {
                    case 1:
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 928);
correctedHeight = -40;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 929);
break;
                    case 2: 
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 931);
correctedHeight = -44;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 932);
break;
                    case 3: 
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 934);
correctedHeight = -46;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 935);
break;
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 937);
correctedHeight += parseInt(instance.containerNode.get('offsetHeight'),10) 
                                 - parseInt(instance.containerNode.getComputedStyle('paddingTop'),10) 
                                 - parseInt(instance.containerNode.getComputedStyle('borderTopWidth'),10) 
                                 - parseInt(instance.containerNode.getComputedStyle('borderBottomWidth'),10);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 941);
instance.editorNode.set('height', correctedHeight);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 942);
instance.editorNode.insert(instance.toolbarNode, 'before');
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 944);
instance._initializeButtons();
        },
        
        /**
         * Binds events when there is a cursorstatus changes in the editor
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_bindUI", 953);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 954);
var instance = this,
                eventhandlers = instance._eventhandlers;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 956);
eventhandlers.push(
                instance.editor.on('nodeChange', instance.sync, instance)
            );
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 959);
eventhandlers.push(
                instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance)
            );
            // TODO: shortcutfunctions
            //instance.editorY.on('keydown', Y.bind(instance._handleShortcutFn, instance));
        },

        /**
         * Not working yet. Handles shortcutfunctions (keyboard ctrl-bold etc)
         *
         * @method _handleShortcutFn
         * @private
        */
        _handleShortcutFn : function(e) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleShortcutFn", 972);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 973);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 974);
if (e.ctrlKey || e.metaKey) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 975);
switch (e.keyCode) {
                    case 66 :
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 977);
e.halt(true);
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 978);
instance.execCommand('bold');
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 979);
instance.sync();
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 980);
break;
                    case 73 :
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 982);
e.halt(true);
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 983);
instance.execCommand('italic');
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 984);
instance.sync();
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 985);
break;
                    case 85 :
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 987);
e.halt(true);
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 988);
instance.execCommand('underline');
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 989);
instance.sync();
                       _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 990);
break;
                }
            }
        },

        /**
         * Creates a Y.Global.ItsaDialog.panel that can be called through method this.getUrl()
         *
         * @method _createUrlDialog
         * @private
        */
        _createUrlDialog: function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_createUrlDialog", 1001);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1002);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1003);
instance._dialogPanelId = Y.Global.ItsaDialog.definePanel({
                iconClass: Y.Global.ItsaDialog.ICON_INFO,
                form: [
                    {name:'count', label:'{message}', value:'{count}'}
                ],
                buttons: {
                    footer: [
                        {name:'cancel', label:'Cancel', action:Y.Global.ItsaDialog.ACTION_HIDE},
                        {name:'removelink', label:'Remove link', action:Y.Global.ItsaDialog.ACTION_HIDE},
                        {name:'ok', label:'Ok', action:Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}    
                    ]
                }    
            });
        },

        /**
         * Shows the Url-Panel with an inputfield and the buttons: <b>Cancel, Remove Link, Ok</b><br>
         * @method getUrl
         * @param {String} title showed in the header of the Panel.
         * @param {String} message showed inside the Panel.
         * @param {String} [defaultmessage] showed inside the form-input.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
         * @return {String} passed by the eventTarget in the callback<br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>
         * Look for <i>e.value</i> to determine the userinput.
        */
        getUrl: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "getUrl", 1033);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1034);
var instance = this,
                bodyMessage,
                inputElement;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1037);
inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultmessage,
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',
                marginTop: 10,
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1046);
Y.Global.ItsaDialog.showPanel(instance._dialogPanelId, title, message + '<br>' + inputElement.render(), callback, context, args, customButtons, customIconclass);
        },

        /**
         * Defines all custom execCommands
         *
         * @method _defineCustomExecCommands
         * @private
        */
        _defineCustomExecCommands : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineCustomExecCommands", 1055);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1056);
var instance = this;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1057);
instance._defineExecCommandHeader();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1058);
instance._defineExecCommandFontFamily();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1059);
instance._defineExecCommandFontSize();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1060);
instance._defineExecCommandFontColor();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1061);
instance._defineExecCommandMarkColor();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1062);
instance._defineExecCommandHyperlink();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1063);
instance._defineExecCommandRemoveHyperlink();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1064);
instance._defineExecCommandMaillink();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1065);
instance._defineExecCommandImage();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1066);
instance._defineExecCommandIframe();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1067);
instance._defineExecCommandYouTube();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1068);
instance._defineExecSaveContent();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1069);
instance._defineExecSetContent();
        },

        /**
         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)
         *
         * @method _handleBtnClick
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        _handleBtnClick : function(e) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleBtnClick", 1079);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1080);
var instance = this,
                node = e.currentTarget;
            // only execute for .itsa-button, not for all buttontags    
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1083);
if (node.hasClass(ITSA_BUTTON)) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1084);
if (node.hasClass(ITSA_BTNTOGGLE)) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1085);
node.toggleClass(ITSA_BTNPRESSED);
                }
                else {_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1087);
if (node.hasClass(ITSA_BTNSYNC)) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1088);
node.toggleClass(ITSA_BTNACTIVE, true);
                }
                else {_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1090);
if (node.hasClass(ITSA_BTNGROUP)) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1091);
instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1092);
node.toggleClass(ITSA_BTNPRESSED, true);
                }}}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1094);
if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance._execCommandFromData(node);}
            }
        },

        /**
         * Handling the selectChange event of a selectButton
         *
         * @method _handleSelectChange
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        _handleSelectChange : function(e) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleSelectChange", 1105);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1106);
var selectButtonNode,
                restoreCommand,
                execCommand;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1109);
selectButtonNode = e.currentTarget.buttonNode;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1110);
restoreCommand = selectButtonNode.getData('restoreCommand');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1111);
execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1112);
this.execCommand(execCommand, e.value);
        },

        /**
         * Executes this.editor.exec.command with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>
         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.
         *
         * @method _execCommandFromData
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        _execCommandFromData: function(buttonNode) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_execCommandFromData", 1123);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1124);
var instance = this,
                execCommand,
                execValue;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1127);
execCommand = buttonNode.getData('execCommand');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1128);
execValue = buttonNode.getData('execValue');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1129);
instance._createBackupCursorRef();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1130);
instance.execCommand(execCommand, execValue);
        },

        /**
         * Performs a execCommand that will take into account the editors cursorposition<br>
         * This means that when no selection is made, the operation still works: you can preset an command this way.<br>
         * It also makes 'inserthtml' work with all browsers.
         *
         * @method execCommand
         * @param {String} command The execCommand
         * @param {String} [value] additional commandvalue
        */
        execCommand: function(command, value) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "execCommand", 1142);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1143);
var instance = this,
                tmpnode;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1145);
instance.editor.focus();
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1146);
if (command==='inserthtml') {
                // we need a tmp-ref which is an img-element instead of a span-element --> inserthtml of span does not work in chrome and safari
                // but inserting img does, which can replaced afterwards
                // first a command that I don't understand: but we need this, because otherwise some browsers will replace <br> by <p> elements
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1150);
instance.editor._execCommand('createlink', '&nbsp;');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1151);
instance.editor.exec.command('inserthtml', ITSA_TMPREFNODE);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1152);
tmpnode = instance.editorY.one('#itsatoolbar-tmpref');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1153);
tmpnode.replace(value);
            }
            else {instance.editor.exec.command(command, value);}
        },

        /**
         * Checks whether there is a selection within the editor<br>
         *
         * @method _hasSelection
         * @private
         * @return {Boolean} whether there is a selection
        */
        _hasSelection : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_hasSelection", 1165);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1166);
var instance = this,
                sel = new instance.editorY.EditorSelection();
            // use sel.anchorNode for all browsers except IE
            // IE must use sel.getSelected().size(), BUT that will create a selection first.
            // Within IE this wont lead to extra dom-code, but in other browsers that would lead to extra <span> elements.
            // Therefore, FIRST check sel.anchorNode and if that fails,  sel.getSelected().size()
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1172);
return (!sel.isCollapsed && (sel.anchorNode || (sel.getSelected().size()>0)));
        },

        /**
         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector
         *
         * @method _checkInbetweenSelector
         * @private
         * @param {String} selector The selector to check for
         * @param {Y.Node} cursornode Active node where the cursor resides, or the selection
         * @return {Boolean} whether node resides inbetween selector
        */
        _checkInbetweenSelector : function(selector, cursornode) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_checkInbetweenSelector", 1184);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1185);
var instance = this,
                pattern = '<\\s*' + selector + '[^>]*>(.*?)<\\s*/\\s*' + selector  + '>',
                searchHeaderPattern = new RegExp(pattern, 'gi'),
                fragment,
                inbetween = false,
                refContent = instance.editorY.one('body').getHTML(),
                cursorid,
                cursorindex;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1193);
cursorid = cursornode.get('id');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1194);
cursorindex = refContent.indexOf(' id="' + cursorid + '"');
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1195);
if (cursorindex===-1) {cursorindex = refContent.indexOf(" id='" + cursorid + "'");}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1196);
if (cursorindex===-1) {cursorindex = refContent.indexOf(" id=" + cursorid);}
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1197);
fragment = searchHeaderPattern.exec(refContent);
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1198);
while ((fragment !== null) && !inbetween) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1199);
inbetween = ((cursorindex>=fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1200);
fragment = searchHeaderPattern.exec(refContent); // next search
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1202);
return inbetween;
        },

        /**
         * Finds the headernode where the cursor, or selection remains in
         *
         * @method _getActiveHeader
         * @private
         * @param {Y.Node} cursornode Active node where the cursor resides, or the selection. Can be supplied by e.changedNode, or left empty to make this function determine itself.
         * @return {Y.Node|null} the headernode where the cursor remains. Returns null if outside any header.
        */
     _getActiveHeader : function(cursornode) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_getActiveHeader", 1213);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1214);
var instance = this,
                pattern,
                searchHeaderPattern,
                fragment,
                nodeFound,
                cursorid,
                nodetag,
                headingNumber = 0,
                returnNode = null,
                checkNode,
                endpos,
                refContent;
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1226);
if (cursornode) {    
                // node can be a header right away, or it can be a node within a header. Check for both
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1228);
nodetag = cursornode.get('tagName');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1229);
if (nodetag.length>1) {headingNumber = parseInt(nodetag.substring(1), 10);}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1230);
if ((nodetag.length===2) && (nodetag.toLowerCase().substring(0,1)==='h') && (headingNumber>0) && (headingNumber<10)) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1231);
returnNode = cursornode;
                }
                else {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1234);
cursorid = cursornode.get('id');
                    // first look for endtag, to determine which headerlevel to search for
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1236);
pattern = ' id=("|\')?' + cursorid + '("|\')?(.*?)<\\s*/\\s*h\\d>';
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1237);
searchHeaderPattern = new RegExp(pattern, 'gi');
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1238);
refContent = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1239);
fragment = searchHeaderPattern.exec(refContent);


                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1242);
if (fragment !== null) {
                        // search again, looking for the right headernumber
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1244);
endpos = fragment.index+fragment[0].length-1;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1245);
headingNumber = refContent.substring(endpos-1, endpos);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1246);
pattern = '<\\s*h' + headingNumber + '[^>]*>(.*?)id=("|\')?' + cursorid + '("|\')?(.*?)<\\s*/\\s*h' + headingNumber + '>';
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1247);
searchHeaderPattern = new RegExp(pattern, 'gi');
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1248);
fragment = searchHeaderPattern.exec(refContent); // next search
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1249);
if (fragment !== null) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1250);
nodeFound = refContent.substring(fragment.index, fragment.index+fragment[0].length);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1253);
if (nodeFound) {
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1254);
checkNode = Node.create(nodeFound);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1255);
returnNode = instance.editorY.one('#' + checkNode.get('id'));
                    }
                }
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1259);
return returnNode;
        },

        /**
         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.
         *
         * @method _initializeButtons
         * @private
        */
        _initializeButtons : function() { 
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initializeButtons", 1268);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1269);
var instance = this,
                i, r, g, b,
                item,
                items,
                bgcolor,
                docFontSize,
                bgcolors,
                buttons;

            // create fonffamily button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1279);
if (instance.get('btnFontfamily')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1280);
items = instance.get('fontFamilies');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1281);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1282);
item = items[i];
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1283);
items[i] = {text: "<span style='font-family:"+item+"'>"+item+"</span>", returnValue: item};
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1285);
instance.fontSelectlist = instance.addSelectlist(items, 'itsafontfamily', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 14)", 1285);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1286);
var familyList = e.changedNode.getStyle('fontFamily'),
                        familyListArray = familyList.split(','),
                        activeFamily = familyListArray[0];
                    // some browsers place '' surround the string, when it should contain whitespaces.
                    // first remove them
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1291);
if ((activeFamily.substring(0,1)==="'") || (activeFamily.substring(0,1)==='"')) {activeFamily = activeFamily.substring(1, activeFamily.length-1);}
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1292);
this.fontSelectlist.selectItemByValue(activeFamily, true, true);
                }, null, true, {buttonWidth: 145});
            }

            // create fontsize button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1297);
if (instance.get('btnFontsize')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1298);
items = [];
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1299);
for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1300);
instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 15)", 1300);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1301);
var fontSize = e.changedNode.getComputedStyle('fontSize'),
                        fontSizeNumber = parseFloat(fontSize),
                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);
                    // make sure not to display partial numbers    
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1305);
this.sizeSelectlist.selectItemByValue(Lang.isNumber(fontSizeNumber) ? Math.round(fontSizeNumber)+fontsizeExt : '', true);
                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});
            }

            // create header button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1310);
if (instance.get('btnHeader')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1311);
items = [];
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1312);
items.push({text: 'No header', returnValue: 'none'});
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1313);
for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1314);
instance.headerSelectlist = instance.addSelectlist(items, 'itsaheading', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 16)", 1314);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1315);
var instance = this,
                        node = e.changedNode,
                        internalcall = (e.sender && e.sender==='itsaheading'),
                        activeHeader;
                    // prevent update when sync is called after heading has made changes. Check this through e.sender
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1320);
if (!internalcall) {
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1321);
activeHeader = instance._getActiveHeader(node);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1322);
instance.headerSelectlist.selectItem(activeHeader ? parseInt(activeHeader.get('tagName').substring(1), 10) : 0);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1323);
instance.headerSelectlist.set('disabled', Lang.isNull(activeHeader) && !instance._hasSelection());
                    }
                }, null, true, {buttonWidth: 96});
            }

            // create bold button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1329);
if (instance.get('btnBold')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1330);
instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 17)", 1330);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1331);
var fontWeight = e.changedNode.getStyle('fontWeight');
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1332);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (Lang.isNumber(parseInt(fontWeight, 10)) ? (fontWeight>=600) : ((fontWeight==='bold') || (fontWeight==='bolder'))));
                }, null, true);
            }

            // create italic button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1337);
if (instance.get('btnItalic')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1338);
instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 18)", 1338);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1339);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));
                });
            }

            // create underline button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1344);
if (instance.get('btnUnderline')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1345);
instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 19)", 1345);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1346);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));
                });
            }

            // create align buttons
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1351);
if (instance.get('grpAlign')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1352);
buttons = [
                    {
                        iconClass : instance.ICON_ALIGN_LEFT,
                        command : 'JustifyLeft',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 1357);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1358);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_CENTER,
                        command : 'JustifyCenter',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 1365);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1366);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_RIGHT,
                        command : 'JustifyRight',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 1373);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1374);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));
                                    }
                    }
                ];
            // create justify button
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1379);
if (instance.get('btnJustify')) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1380);
buttons.push({
                        iconClass : instance.ICON_ALIGN_JUSTIFY,
                        command : 'JustifyFull',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 1384);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1385);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));
                                    }
                    });
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1389);
instance.addButtongroup(buttons, true);
            }

            // create subsuperscript buttons
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1393);
if (instance.get('grpSubsuper')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1394);
instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 20)", 1394);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1395);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));
                }, null, true);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1397);
instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 21)", 1397);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1398);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));
                });
            }

            // create textcolor button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1403);
if (instance.get('btnTextcolor')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1404);
items = [];
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1405);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1406);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1407);
bgcolor = bgcolors[i];
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1408);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1410);
instance.colorSelectlist = instance.addSelectlist(items, 'itsafontcolor', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 22)", 1410);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1411);
var instance = this,
                        styleColor = e.changedNode.getStyle('color'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1414);
instance.colorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});
            }

            // create markcolor button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1419);
if (instance.get('btnMarkcolor')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1420);
items = [];
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1421);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1422);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1423);
bgcolor = bgcolors[i];
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1424);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1426);
instance.markcolorSelectlist = instance.addSelectlist(items, 'itsamarkcolor', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 23)", 1426);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1427);
var instance = this,
                        styleColor = e.changedNode.getStyle('backgroundColor'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1430);
instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});
            }

            // create indent buttons
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1435);
if (instance.get('grpIndent')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1436);
instance.addButton(instance.ICON_INDENT, 'indent', true);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1437);
instance.addButton(instance.ICON_OUTDENT, 'outdent');
            }

            // create list buttons
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1441);
if (instance.get('grpLists')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1442);
instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 24)", 1442);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1443);
var instance = this,
                        node = e.changedNode;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1445);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', node)));
                }, null, true);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1447);
instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 25)", 1447);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1448);
var instance = this,
                        node = e.changedNode;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1450);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', node)));
                });
            }

            // create email button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1455);
if (instance.get('btnEmail')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1456);
instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 26)", 1456);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1457);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isEmailLink;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1462);
isLink =  instance._checkInbetweenSelector('a', node);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1463);
if (isLink) {
                        // check if its a normal href or a mailto:
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1465);
while (node && !node.test('a')) {node=node.get('parentNode');}
                        // be carefull: do not === /match() with text, that will fail
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1467);
isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');
                    }
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1469);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));
                }, null, true);
            }

            // create hyperlink button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1474);
if (instance.get('btnHyperlink')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1475);
instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 27)", 1475);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1476);
var instance = this,
                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isFileLink = false,
                        href,
                        lastDot,
                        fileExt,
                        isHyperLink;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1486);
isLink =  instance._checkInbetweenSelector('a', node);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1487);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1489);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1491);
href = node.get('href');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1492);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1493);
if (isHyperLink) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1494);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1495);
if (lastDot!==-1) {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1496);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1497);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1501);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));
                });
            }

            // create remove-hyperlink button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1506);
if (instance.get('btnRemoveHyperlink')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1507);
instance.addSyncButton(instance.ICON_REMOVELINK, 'itsaremovehyperlink', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 28)", 1507);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1508);
var instance = this,
                        node = e.changedNode;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1510);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, instance._checkInbetweenSelector('a', node));
                });
            }

            // create image button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1515);
if (instance.get('btnImage')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1516);
instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 29)", 1516);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1517);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));
                }, null, true);
            }

            // create video button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1522);
if (instance.get('btnVideo')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1523);
instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 30)", 1523);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1524);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.hasClass(ITSA_YOUTUBENODE)));
                });
            }

            // create iframe button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1529);
if (instance.get('btnIframe')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1530);
instance.addSyncButton(instance.ICON_IFRAME, 'itsacreateiframe', function(e) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 31)", 1530);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1531);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.hasClass(ITSA_IFRAMENODE)));
                },
                null, true);
            }

            // create clear button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1537);
if (instance.get('btnClear')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1538);
instance.addButton(instance.ICON_CLEAR, {command: 'mysetcontent', value: ''}, true);
            }

            // create save button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1542);
if (instance.get('btnSave')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1543);
instance.addButton(instance.ICON_SAVE, 'itsasavecontent', true);
            }

            // create cancel button
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1547);
if (instance.get('btnCancel')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1548);
instance.addButton(instance.ICON_CANCEL, {command: 'mysetcontent', value: instance.initialContent}, true);
            }

//************************************************
// just for temporary local use ITS Asbreuk
// should NOT be part of the gallery
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1554);
if (false) {
//                instance.addButton(instance.ICON_EURO, {command: 'inserthtml', value: '&#8364;'}, true);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1556);
instance.addSyncButton(
                    instance.ICON_FILE,
                    {   customFunc: Y.bind(
                            function(e) {
                                _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 32)", 1559);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1560);
Y.config.cmas2plus.uploader.show(
                                    null, 
                                    Y.bind(function(e) {
                                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 33)", 1562);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1563);
this.execCommand('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);
                                    }, this)
                                );
                            },
                            instance
                        )
                    },
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 34)", 1570);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1571);
var instance = this,
                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',
                            node = e.changedNode,
                            nodePosition,
                            isFileLink = false,
                            isLink,
                            href,
                            lastDot,
                            fileExt,
                            isHyperLink;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1581);
isLink =  instance._checkInbetweenSelector('a', node);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1582);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1584);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1586);
href = node.get('href');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1587);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1588);
if (isHyperLink) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1589);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1590);
if (lastDot!==-1) {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1591);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1592);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1596);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);
                    }
                );
            }
//************************************************

            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1602);
if (instance.get('grpUndoredo')) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1603);
instance.addButton(instance.ICON_UNDO, 'undo', true);
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1604);
instance.addButton(instance.ICON_REDO, 'redo');
            }

        },

        /**
        * Based on YUI2 rich-editor code
        * @private
        * @method _filter_rgb
        * @param String css The CSS string containing rgb(#,#,#);
        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00
        * @return String
        */
        _filter_rgb: function(css) {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_filter_rgb", 1617);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1618);
if (css.toLowerCase().indexOf('rgb') != -1) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1619);
var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi"),
                    rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(','),
                    r, g, b;
            
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1623);
if (rgb.length === 5) {
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1624);
r = parseInt(rgb[1], 10).toString(16);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1625);
g = parseInt(rgb[2], 10).toString(16);
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1626);
b = parseInt(rgb[3], 10).toString(16);

                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1628);
r = r.length === 1 ? '0' + r : r;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1629);
g = g.length === 1 ? '0' + g : g;
                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1630);
b = b.length === 1 ? '0' + b : b;

                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1632);
css = "#" + r + g + b;
                }
            }
            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1635);
return css;
        },

        /**
        * Defines the execCommand itsaheading
        * @method _defineExecCommandHeader
        * @private
        */
        _defineExecCommandHeader : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandHeader", 1643);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1644);
if (!Y.Plugin.ExecCommand.COMMANDS.itsaheading) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1645);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsaheading: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsaheading", 1646);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1647);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef = itsatoolbar._getBackupCursorRef(),
                            activeHeader = itsatoolbar._getActiveHeader(noderef),
                            headingNumber = 0,
                            disableSelectbutton = false,
                            node;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1655);
if (val==='none') {
                            // want to clear heading
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1657);
if (activeHeader) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1658);
activeHeader.replace("<p>"+activeHeader.getHTML()+"</p>");
                                // need to disable the selectbutton right away, because there will be no syncing on the headerselectbox
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1660);
itsatoolbar.headerSelectlist.set('disabled', true);
                            }
                        } else {
                            // want to add or change a heading
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1664);
if (val.length>1) {headingNumber = parseInt(val.substring(1), 10);}
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1665);
if ((val.length===2) && (val.toLowerCase().substring(0,1)==='h') && (headingNumber>0) && (headingNumber<10)) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1666);
node = activeHeader || noderef;
                                // make sure you set an id to the created header-element. Otherwise _getActiveHeader() cannot find it in next searches
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1668);
node.replace("<"+val+" id='" + editorY.guid() + "'>"+node.getHTML()+"</"+val+">");
                            }
                        }
                        // do a toolbarsync, because styles will change.
                        // but do not refresh the heading-selectlist! Therefore e.sender is defined
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1673);
itsatoolbar.sync({sender: 'itsaheading', changedNode: editorY.one('#itsatoolbar-ref')});
                        // take some time to let the sync do its work before set and remove cursor
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1675);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                   }
                });
            }
        },

        /**
        * Defines the execCommand itsafontfamily
        * @method _defineExecCommandFontFamily
        * @private
        */
        _defineExecCommandFontFamily : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontFamily", 1686);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1687);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontfamily) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1688);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsafontfamily: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontfamily", 1689);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1690);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            browserNeedsContent,
                            selection;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1696);
if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1697);
itsatoolbar._clearEmptyFontRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1698);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1699);
selection = noderef.hasClass(ITSA_REFSELECTION);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1700);
if (selection) {
                            // first cleaning up old fontsize
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1702);
noderef.all('span').setStyle('fontFamily', '');
                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1704);
noderef.all('.'+ITSA_FONTFAMILYNODE).replaceClass(ITSA_FONTFAMILYNODE, ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1705);
noderef.setStyle('fontFamily', val);
                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1707);
noderef.addClass(ITSA_FONTFAMILYNODE);
                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1709);
noderef.removeClass(ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1710);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1714);
noderef.replace("<span class='" + ITSA_FONTFAMILYNODE + "' style='font-family:" + val + "'>" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + "</span>");
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1715);
itsatoolbar._setCursorAtRef();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1716);
Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsafontsize
        * @method _defineExecCommandFontSize
        * @private
        */
        _defineExecCommandFontSize : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontSize", 1728);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1729);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1730);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsafontsize: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontsize", 1731);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1732);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            parentnode,
                            browserNeedsContent,
                            selection;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1739);
if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1740);
itsatoolbar._clearEmptyFontRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1741);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1742);
selection = noderef.hasClass(ITSA_REFSELECTION);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1743);
if (selection) {
                            //We have a selection
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1745);
parentnode = noderef.get('parentNode');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1746);
if (Y.UA.webkit) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1747);
parentnode.setStyle('lineHeight', '');
                            }
                            // first cleaning up old fontsize
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1750);
noderef.all('span').setStyle('fontSize', '');
                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1752);
noderef.all('.'+ITSA_FONTSIZENODE).replaceClass(ITSA_FONTSIZENODE, ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1753);
noderef.setStyle('fontSize', val);
                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1755);
noderef.addClass(ITSA_FONTSIZENODE);
                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1757);
noderef.removeClass(ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1758);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1762);
noderef.replace("<span class='" + ITSA_FONTSIZENODE + "' style='font-size:" + val + "'>" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + "</span>");
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1763);
itsatoolbar._setCursorAtRef();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1764);
Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsafontcolor<br>
        * We need to overrule the standard color execCommand, because in IE the ItsaSelectlist will loose focus on the selection
        * @method _defineExecCommandFontColor
        * @private
        */
        _defineExecCommandFontColor : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontColor", 1777);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1778);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontcolor) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1779);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsafontcolor: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontcolor", 1780);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1781);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            browserNeedsContent,
                            selection;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1787);
if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1788);
itsatoolbar._clearEmptyFontRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1789);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1790);
selection = noderef.hasClass(ITSA_REFSELECTION);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1791);
if (selection) {
                            //We have a selection
                            // first cleaning up old fontcolors
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1794);
noderef.all('span').setStyle('color', '');
                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1796);
noderef.all('.'+ITSA_FONTCOLORNODE).replaceClass(ITSA_FONTCOLORNODE, ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1797);
noderef.setStyle('color', val);
                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1799);
noderef.addClass(ITSA_FONTCOLORNODE);
                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1801);
noderef.removeClass(ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1802);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1806);
noderef.replace("<span class='" + ITSA_FONTCOLORNODE + "' style='color:" + val + "'>" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + "</span>");
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1807);
itsatoolbar._setCursorAtRef();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1808);
Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsamarkcolor<br>
        * We need to overrule the standard hilitecolor execCommand, because in IE the ItsaSelectlist will loose focus on the selection
        * @method _defineExecCommandMarkColor
        * @private
        */
        _defineExecCommandMarkColor : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandMarkColor", 1821);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1822);
if (!Y.Plugin.ExecCommand.COMMANDS.itsamarkcolor) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1823);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsamarkcolor: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsamarkcolor", 1824);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1825);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            browserNeedsContent,
                            selection;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1831);
if (itsatoolbar._timerClearEmptyFontRef) {itsatoolbar._timerClearEmptyFontRef.cancel();}
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1832);
itsatoolbar._clearEmptyFontRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1833);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1834);
selection = noderef.hasClass(ITSA_REFSELECTION);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1835);
if (selection) {
                            //We have a selection
                            // first cleaning up old fontbgcolors
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1838);
noderef.all('span').setStyle('backgroundColor', '');
                            // now previous created span-tags will be marked as temp-selection --> this way the can be removed (retaining innerhtml)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1840);
noderef.all('.'+ITSA_MARKCOLORNODE).replaceClass(ITSA_MARKCOLORNODE, ITSA_REFSELECTION);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1841);
noderef.setStyle('backgroundColor', val);
                            // now, mark this node, so we know it is made by itsafontsize. This way, we can cleanup when fontsize is generated multiple times (prevent creating span within span)
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1843);
noderef.addClass(ITSA_MARKCOLORNODE);
                            // remove the selection-mark before removing tmp-node placeholder: we need to keep the node
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1845);
noderef.removeClass(ITSA_REFSELECTION);
                            // remove the tmp-node placeholder
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1847);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Don't forget to place a ITSA_REFEMPTYCONTENT before ITSA_REFNODE --> IE cannot focus cursor inside an empty <span>-element and would otherwise focus just before the outerside <span>-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1851);
noderef.replace("<span class='" + ITSA_MARKCOLORNODE + "' style='background-color:" + val + "'>" + ITSA_REFEMPTYCONTENT + ITSA_REFNODE + "</span>");
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1852);
itsatoolbar._setCursorAtRef();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1853);
Y.later(30000, itsatoolbar, itsatoolbar._clearEmptyFontRef);
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsasavecontent<br>
        * @method _defineExecSaveContent
        * @private
        */
        _defineExecSaveContent : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecSaveContent", 1865);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1866);
if (!Y.Plugin.ExecCommand.COMMANDS.itsamarkcolor) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1867);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsasavecontent: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsasavecontent", 1868);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1869);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1873);
noderef = itsatoolbar._getBackupCursorRef();

                        // save with clean content

                        // remove the tmp-node placeholder
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1878);
itsatoolbar._setCursorAtRef();
                    }
                });
            }
        },


        /**
        * Defines the execCommand itsasavecontent<br>
        * @method _defineExecSetContent
        * @private
        */
        _defineExecSetContent : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecSetContent", 1890);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1891);
if (!Y.Plugin.ExecCommand.COMMANDS.itsasetcontent) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1892);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsasetcontent: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsasetcontent", 1893);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1894);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1898);
noderef = itsatoolbar._getBackupCursorRef();

                        // save with clean content
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1901);
editor.set('content', val);

                        // remove the tmp-node placeholder
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1904);
itsatoolbar._setCursorAtRef();
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacretaehyperlink
        * @method _defineExecCommandHyperlink
        * @private
        */
        _defineExecCommandHyperlink : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandHyperlink", 1915);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1916);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1917);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsacreatehyperlink: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatehyperlink", 1920);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1921);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            callFunc,
                            currentAnchorNode,
                            anchorNodeWithinSel,
                            currentHyperlink,
                            href,
                            noderefHTML,
                            wwwlink,
                            selectedText,
                            defaultHyperlink;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1934);
noderef = itsatoolbar._getBackupCursorRef();
                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection
                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1937);
anchorNodeWithinSel = noderef.one('a');
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1938);
if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1939);
currentAnchorNode = anchorNodeWithinSel || noderef;
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1940);
while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1941);
currentAnchorNode = currentAnchorNode.get('parentNode');
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1943);
if (currentAnchorNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1944);
currentHyperlink = currentAnchorNode.get('href');
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1947);
if (noderef.hasClass(ITSA_REFSELECTION)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1948);
selectedText = Lang.trim(Y.EditorSelection.getText(noderef));
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1949);
noderefHTML = noderef.getHTML();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1950);
wwwlink = (selectedText.substr(0,4) === 'www.');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1951);
if ((selectedText.substr(0,7) === 'http://') || (selectedText.substr(0,8) === 'https://') || wwwlink) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1952);
defaultHyperlink = (wwwlink ? 'http://' : '') + selectedText;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1955);
if (val) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1956);
href = val.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1957);
if (currentAnchorNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1958);
currentAnchorNode.set('href', href);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1961);
noderef.setHTML('<a href="' + href+ '">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);
                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                // of ITSA_REF_NODE. Because we need to keep the innercontent
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1964);
noderef.set('id', ITSA_REFSELECTION);
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1965);
noderef.toggleClass(ITSA_REFSELECTION, true);
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1967);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Ask for hyperlink
                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1972);
callFunc = currentAnchorNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1973);
callFunc(
                                'Hyperlink',
                                'Enter here the link',
                                currentHyperlink || defaultHyperlink || 'http://',
                                function(e) {
                                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 35)", 1977);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1978);
var itsatoolbar = this;
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1979);
if (e.buttonName==='ok') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1980);
href = e.value.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1981);
if (currentAnchorNode) {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1982);
currentAnchorNode.set('href', href);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1985);
noderef.setHTML('<a href="' + href+ '">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);
                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                            // of ITSA_REF_NODE. Because we need to keep the innercontent
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1988);
noderef.set('id', ITSA_REFSELECTION);
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1989);
noderef.toggleClass(ITSA_REFSELECTION, true);
                                        }
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1992);
if (e.buttonName==='removelink') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1993);
if (currentAnchorNode.getHTML()==='') {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1994);
currentAnchorNode.remove(false);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1997);
currentAnchorNode.replace(currentAnchorNode.getHTML());
                                        }
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1999);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                        // take some time to let the sync do its work before set and remove cursor
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2001);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2004);
itsatoolbar._setCursorAtRef();
                                    }
                                },
                                itsatoolbar
                            );
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacretaehyperlink
        * @method _defineExecCommandRemoveHyperlink
        * @private
        */
        _defineExecCommandRemoveHyperlink : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandRemoveHyperlink", 2020);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2021);
if (!Y.Plugin.ExecCommand.COMMANDS.itsaremovehyperlink) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2022);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsaremovehyperlink: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsaremovehyperlink", 2025);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2026);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            currentAnchorNode,
                            anchorNodeWithinSel;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2032);
noderef = itsatoolbar._getBackupCursorRef();
                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection
                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2035);
anchorNodeWithinSel = noderef.one('a');
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2036);
if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2037);
currentAnchorNode = anchorNodeWithinSel || noderef;
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2038);
while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2039);
currentAnchorNode = currentAnchorNode.get('parentNode');
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2041);
if (currentAnchorNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2042);
if (currentAnchorNode.getHTML()==='') {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2043);
currentAnchorNode.remove(false);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2046);
currentAnchorNode.replace(currentAnchorNode.getHTML());
                                }
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2048);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                // take some time to let the sync do its work before set and remove cursor
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2050);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                            }
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacreatemaillink
        * @method _defineExecCommandMaillink
        * @private
        */
        _defineExecCommandMaillink : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandMaillink", 2063);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2064);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2065);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreatemaillink: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatemaillink", 2066);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2067);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            callFunc,
                            currentAnchorNode,
                            anchorNodeWithinSel,
                            currentHyperlink,
                            href,
                            noderefHTML,
                            selectedText,
                            defaultHyperlink;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2079);
noderef = itsatoolbar._getBackupCursorRef();
                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection
                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2082);
anchorNodeWithinSel = noderef.one('a');
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2083);
if (anchorNodeWithinSel || itsatoolbar._checkInbetweenSelector('a', noderef)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2084);
currentAnchorNode = anchorNodeWithinSel || noderef;
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2085);
while (currentAnchorNode && (currentAnchorNode.get('tagName')!=='A')) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2086);
currentAnchorNode = currentAnchorNode.get('parentNode');
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2088);
if (currentAnchorNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2089);
currentHyperlink = currentAnchorNode.get('href');
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2090);
if (currentHyperlink.toLowerCase().substr(0,7)==='mailto:') {currentHyperlink = currentHyperlink.substr(7);}
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2093);
if (noderef.hasClass(ITSA_REFSELECTION)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2094);
selectedText = Lang.trim(Y.EditorSelection.getText(noderef));
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2095);
noderefHTML = noderef.getHTML();
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2096);
if (selectedText.indexOf('@') !== -1) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2097);
defaultHyperlink = selectedText;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2100);
if (val) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2101);
href = 'mailto:' + val.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2102);
if (currentAnchorNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2103);
currentAnchorNode.set('href', href);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2106);
noderef.setHTML('<a href="' + href+ '">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);
                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                // of ITSA_REF_NODE. Because we need to keep the innercontent
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2109);
noderef.set('id', ITSA_REFSELECTION);
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2110);
noderef.toggleClass(ITSA_REFSELECTION, true);
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2112);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Ask for emaillink
                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2117);
callFunc = currentAnchorNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2118);
callFunc(
                                'Emaillink',
                                'Enter here the emailaddress',
                                currentHyperlink || defaultHyperlink || '',
                                function(e) {
                                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 36)", 2122);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2123);
var itsatoolbar = this,
                                        href,
                                        selection;
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2126);
if (e.buttonName==='ok') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2127);
href = 'mailto:' + e.value.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2128);
if (currentAnchorNode) {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2129);
currentAnchorNode.set('href', href);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2132);
noderef.setHTML('<a href="' + href+ '">' + (noderefHTML || href) + '</a>'+ ITSA_REFNODE);
                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                            // of ITSA_REF_NODE. Because we need to keep the innercontent
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2135);
noderef.set('id', ITSA_REFSELECTION);
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2136);
noderef.toggleClass(ITSA_REFSELECTION, true);
                                        }
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2139);
if (e.buttonName==='removelink') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2140);
if (currentAnchorNode.getHTML()==='') {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2141);
currentAnchorNode.remove(false);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2144);
currentAnchorNode.replace(currentAnchorNode.getHTML());
                                        }
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2146);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                        // take some time to let the sync do its work before set and remove cursor
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2148);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2151);
itsatoolbar._setCursorAtRef();
                                    }
                                },
                                itsatoolbar
                            );
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacreateimage
        * @method _defineExecCommandImage
        * @private
        */
        _defineExecCommandImage : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandImage", 2167);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2168);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2169);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateimage: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateimage", 2170);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2171);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
//                            callFunc,
                            src,
                            wwwlink,
                            currentImageNode,
                            currentImagelink,
                            selectedText,
                            defaultImagelink;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2182);
noderef = itsatoolbar._getBackupCursorRef();
                        // first we need to find out whether the cursor is within a current hyperlink, or a hyperlink is within selection
                        // If that is the case, then this hyperlink needs to be modified. Otherwise create a new hyperlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2185);
currentImageNode = noderef.one('img');
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2186);
if (currentImageNode) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2187);
currentImagelink = currentImageNode.get('src');
                        }

                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2190);
if (noderef.hasClass(ITSA_REFSELECTION)) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2191);
selectedText = Lang.trim(Y.EditorSelection.getText(noderef));
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2192);
wwwlink = (selectedText.substr(0,4) === 'www.');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2193);
if ((selectedText.substr(0,7) === 'http://') || (selectedText.substr(0,8) === 'https://') || wwwlink) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2194);
defaultImagelink = (wwwlink ? 'http://' : '') + selectedText;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2197);
if (val) {
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2198);
src = val.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2199);
if (currentImageNode) {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2200);
currentImageNode.set('src', src);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2203);
noderef.setHTML('<img src="' + src+ '" />' + ITSA_REFNODE);
                                // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                // of ITSA_REF_NODE. Because we need to keep the innercontent
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2206);
noderef.set('id', ITSA_REFSELECTION);
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2207);
noderef.toggleClass(ITSA_REFSELECTION, true);
                            }
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2209);
itsatoolbar._setCursorAtRef();
                        }
                        else {
                            // Which function to call? Only with button 'Remove link' when there is already an anchorlink
//                            callFunc = currentImageNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2214);
Y.Global.ItsaDialog.getInput(
                                'Inline Image',
                                'Enter here the link to the image',
                                currentImagelink || defaultImagelink || 'http://',
                                function(e) {
                                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 37)", 2218);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2219);
var itsatoolbar = this;
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2220);
if (e.buttonName==='ok') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2221);
src = e.value.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2222);
if (currentImageNode) {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2223);
currentImageNode.set('src', src);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2226);
noderef.setHTML('<img src="' + src+ '" />' + ITSA_REFNODE);
                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                            // of ITSA_REF_NODE. Because we need to keep the innercontent
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2229);
noderef.set('id', ITSA_REFSELECTION);
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2230);
noderef.toggleClass(ITSA_REFSELECTION, true);
                                        }
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2233);
if (e.buttonName==='removelink') {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2234);
currentImageNode.remove(false);
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2235);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                        // take some time to let the sync do its work before set and remove cursor
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2237);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2240);
itsatoolbar._setCursorAtRef();
                                    }
                                },
                                itsatoolbar
                            );
                        }
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacreateyoutube
        * @method _defineExecCommandYouTube
        * @private
        */
        _defineExecCommandYouTube : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandYouTube", 2256);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2257);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2258);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateyoutube: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateyoutube", 2259);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2260);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            previousNode,
                            blockerNode,
                            callFunc,
                            regExp1 = /^http:\/\/www\.youtube\.com\/watch?v=(\w+)/, // search for strings like http://www.youtube.com/watch?v=PHIaeHAcE_A&whatever
                            regExp2 = /^http:\/\/youtu\.be\/(\w+)/, // search for strings like http://youtu.be/PHIaeHAcE_A&whatever
                            regExp3 = /^http:\/\/www\.youtube\.com\/embed\/(\w+)/, // search for strings like http://www.youtube.com/embed/PHIaeHAcE_A&whatever
                            regExp4 = /^v=(\w+)/, // search for strings like v=PHIaeHAcE_A&whatever
                            regExp5 = /^(\w+)$/, // search for strings like PHIaeHAcE_A&whatever
                            currentYouTubeNode,
                            currentYouTubeLink;
                        // BE CAREFULL: when manipulating: the selection surrounds the blockerdiv and the cursor is inbetween the blocker-div and the iframe!!!
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2275);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2276);
blockerNode = noderef.one('.'+ITSA_IFRAMEBLOCKER);
                        // Now check if you are manipulating an existing iframe-element:
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2278);
if (blockerNode) {
                            // yes: a blockernode exists, so we are manipulating an existent iframe-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2280);
currentYouTubeNode = noderef.next('iframe');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2281);
if (currentYouTubeNode) {
                                // First the most tricky part: We need to reset the position of JUST ITSA_REFNODE
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2283);
previousNode = itsatoolbar.editorY.one('#itsatoolbar-ref');
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2284);
previousNode.remove(false);
                                // now reposition the cursor
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2286);
currentYouTubeNode.insert(ITSA_REFNODE, 'after');
                                // next: we read the src attribute
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2288);
currentYouTubeLink = currentYouTubeNode.get('src');
                                // Try to extract the videoitem based on regExp1-regExp5
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2290);
if (regExp1.test(currentYouTubeLink) || regExp2.test(currentYouTubeLink) || regExp3.test(currentYouTubeLink) || regExp4.test(currentYouTubeLink) || regExp5.test(currentYouTubeLink)) {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2291);
currentYouTubeLink = RegExp.$1;
                                }
                            }
                        }
                        // Which function to call? Only with button 'Remove link' when there is already an anchorlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2296);
callFunc = currentYouTubeNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2297);
callFunc(
                            'Inline YouTube movie',
                            'Enter here the link to the youtube-movie',
                            currentYouTubeLink || 'http://youtu.be/PHIaeHAcE_A',
                            function(e) {
                                _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 38)", 2301);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2302);
var itsatoolbar = this,
                                    src,
                                    videoitem,
                                    width = 420,
                                    height = 315;
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2307);
if (e.buttonName==='ok') {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2308);
src = e.value.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                                    // Try to extract the videoitem based on regExp1-regExp5
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2310);
if (regExp1.test(src) || regExp2.test(src) || regExp3.test(src) || regExp4.test(src) || regExp5.test(src)) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2311);
videoitem = RegExp.$1;
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2313);
if (videoitem) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2314);
if (currentYouTubeNode) {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2315);
currentYouTubeNode.set('src', 'http://www.youtube.com/embed/' + videoitem);
                                        }
                                        else {
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2318);
noderef.setHTML('<span style="padding-left:'+width+'px; margin-right:-'+width+'px; padding-top:'+height+'px; " class="'+ITSA_IFRAMEBLOCKER+' '+ITSA_YOUTUBENODE+'"></span><iframe width="'+width+'" height="'+height+'" src="http://www.youtube.com/embed/' + videoitem + '" frameborder="0" allowfullscreen></iframe>');
                                            // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                            // of ITSA_REF_NODE. Because we need to keep the innercontent
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2321);
noderef.set('id', ITSA_REFSELECTION);
                                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2322);
noderef.toggleClass(ITSA_REFSELECTION, true);
                                        }
                                    }
                                }
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2326);
if (e.buttonName==='removelink') {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2327);
if (currentYouTubeNode) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2328);
currentYouTubeNode.remove(false);
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2330);
if (blockerNode) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2331);
blockerNode.remove(false);
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2333);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                    // take some time to let the sync do its work before set and remove cursor
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2335);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2338);
itsatoolbar._setCursorAtRef();
                                }
                            },
                            itsatoolbar
                        );
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacreateiframe
        * @method _defineExecCommandIframe
        * @private
        */
        _defineExecCommandIframe : function() {
            _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandIframe", 2353);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2354);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateiframe) {
                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2355);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateiframe: function(cmd, val) {
                        _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateiframe", 2356);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2357);
var editor = this.get('host'),
                            editorY = editor.getInstance(),
                            itsatoolbar = editor.itsatoolbar,
                            noderef,
                            blockerNode,
                            previousNode,
                            callFunc,
                            currentIframeNode,
                            currentIframeSrc;
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2366);
noderef = itsatoolbar._getBackupCursorRef();
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2367);
blockerNode = noderef.one('.'+ITSA_IFRAMEBLOCKER);
                        // Now check if you are manipulating an existing iframe-element:
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2369);
if (blockerNode) {
                            // yes: a blockernode exists, so we are manipulating an existent iframe-element
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2371);
currentIframeNode = noderef.next('iframe');
                            _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2372);
if (currentIframeNode) {
                                // First the most tricky part: We need to reset the position of JUST ITSA_REFNODE
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2374);
previousNode = itsatoolbar.editorY.one('#itsatoolbar-ref');
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2375);
previousNode.remove(false);
                                // now reposition the cursor
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2377);
currentIframeNode.insert(ITSA_REFNODE, 'after');
                                // next: we read the src attribute
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2379);
currentIframeSrc = currentIframeNode.get('src');
                            }
                        }
                        // Which function to call? Only with button 'Remove link' when there is already an anchorlink
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2383);
callFunc = currentIframeNode ? Y.bind(itsatoolbar.getUrl, itsatoolbar) : Y.bind(Y.Global.ItsaDialog.getInput, Y.Global.ItsaDialog);
                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2384);
callFunc(
                            'Inline iframe',
                            'Enter here the source to the iframe',
                            currentIframeSrc || 'http://',
                            function(e) {
                                _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 39)", 2388);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2389);
var itsatoolbar = this,
                                    width = 420,
                                    height = 315,
                                    src;
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2393);
if (e.buttonName==='ok') {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2394);
src = e.value.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2395);
if (currentIframeNode) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2396);
currentIframeNode.set('src', src);
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2399);
noderef.setHTML('<span style="padding-left:'+width+'px; margin-right:-'+width+'px; padding-top:'+height+'px; " class="'+ITSA_IFRAMEBLOCKER+' '+ITSA_IFRAMENODE+'"></span><iframe width="'+width+'" height="'+height+'" src="' + src + '" frameborder="0"></iframe>');
                                        // even if there was no selection, we pretent if so AND change the id: we DON'T want the noderef have the id 
                                        // of ITSA_REF_NODE. Because we need to keep the innercontent
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2402);
noderef.set('id', ITSA_REFSELECTION);
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2403);
noderef.toggleClass(ITSA_REFSELECTION, true);
                                    }
                                }
                                _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2406);
if (e.buttonName==='removelink') {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2407);
if (currentIframeNode) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2408);
currentIframeNode.remove(false);
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2410);
if (blockerNode) {
                                        _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2411);
blockerNode.remove(false);
                                    }
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2413);
itsatoolbar.sync({changedNode: editorY.one('#itsatoolbar-ref')});
                                    // take some time to let the sync do its work before set and remove cursor
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2415);
Y.later(250, itsatoolbar, itsatoolbar._setCursorAtRef);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2418);
itsatoolbar._setCursorAtRef();
                                }
                            },
                            itsatoolbar
                        );
                    }
                });
            }
        }

    }, {
        NS : 'itsatoolbar',
        ATTRS : {

            /**
             * @description Defines whether keyboard-enter will lead to P-tag. Default=false (meaning that BR's will be created)
             * @attribute paraSupport
             * @type Boolean
            */
            paraSupport : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2439);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2440);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description The sourceNode that holds the Toolbar. Could be an empty DIV.<br>
             * If not defined, than the Toolbar will be created just above the Editor.
             * By specifying the srcNode, one could create the Toolbar on top of the page, regardless of the Editor's position
             * @attribute srcNode
             * @type Y.Node 
            */
            srcNode : {
                value: null,
                writeOnce: 'initOnly',
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "setter", 2454);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2455);
return Y.one(val);
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2457);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2458);
return Y.one(val);
                }
            },

            /**
             * @description The size of the buttons<br>
             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>
             * Default = 2
             * @attribute btnSize
             * @type int
            */
            btnSize : {
                value: 2,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2471);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2472);
return (Lang.isNumber(val) && (val>0) && (val<4));
                }
            },

            /**
             * @description The amount of headerlevels that can be selected<br>
             * Should be a value from 1-9<br>
             * Default = 6
             * @attribute headerLevels
             * @type int
            */
            headerLevels : {
                value: 6,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2485);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2486);
return (Lang.isNumber(val) && (val>0) && (val<10));
                }
            },

            /**
             * @description The fontfamilies that can be selected.<br>
             * Be aware to supply fontFamilies that are supported by the browser.<br>
             * Typically usage is the standard families extended by some custom fonts.<br>
             * @attribute fontFamilies
             * @type Array [String]
            */
            fontFamilies : {
                value: [
                    'Arial',
                    'Arial Black',
                    'Comic Sans MS',
                    'Courier New',
                    'Lucida Console',
                    'Tahoma',
                    'Times New Roman',
                    'Trebuchet MS',
                    'Verdana'
                ],
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2509);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2510);
return (Lang.isArray(val));
                }
            },

            /**
             * @description Whether the button fontfamily is available<br>
             * Default = true
             * @attribute btnFontfamily
             * @type Boolean
            */
            btnFontfamily : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2522);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2523);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button fontsize is available<br>
             * Default = true
             * @attribute btnFontsize
             * @type Boolean
            */
            btnFontsize : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2535);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2536);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button headers is available<br>
             * because this function doesn't work well on all browsers, it is set of by default.<br>
             * Is something to work on in fututr releases. It works within firefox though.
             * Default = false
             * @attribute btnHeader
             * @type Boolean
            */
            btnHeader : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2550);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2551);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button bold is available<br>
             * Default = true
             * @attribute btnBold
             * @type Boolean
            */
            btnBold : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2563);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2564);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button italic is available<br>
             * Default = true
             * @attribute btnItalic
             * @type Boolean
            */
            btnItalic : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2576);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2577);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button underline is available<br>
             * Default = true
             * @attribute btnUnderline
             * @type Boolean
            */
            btnUnderline : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2589);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2590);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group align is available<br>
             * Default = true
             * @attribute grpAlign
             * @type Boolean
            */
            grpAlign : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2602);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2603);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button justify is available<br>
             * will only be shown in combination with grpalign
             * Default = true
             * @attribute btnJustify
             * @type Boolean
            */
            btnJustify : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2616);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2617);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group sub/superscript is available<br>
             * Default = true
             * @attribute grpSubsuper
             * @type Boolean
            */
            grpSubsuper : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2629);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2630);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button textcolor is available<br>
             * Default = true
             * @attribute btnTextcolor
             * @type Boolean
            */
            btnTextcolor : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2642);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2643);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button markcolor is available<br>
             * Default = true
             * @attribute btnMarkcolor
             * @type Boolean
            */
            btnMarkcolor : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2655);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2656);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group indent is available<br>
             * Default = true
             * @attribute grpIndent
             * @type Boolean
            */
            grpIndent : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2668);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2669);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group lists is available<br>
             * Default = true
             * @attribute grpLists
             * @type Boolean
            */
            grpLists : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2681);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2682);
return Lang.isBoolean(val);
                }
            },
/*
            btnremoveformat : {
                value: true,
                validator: function(val) {
                    return Lang.isBoolean(val);
                }
            },
            btnhiddenelements : {
                value: true,
                validator: function(val) {
                    return Lang.isBoolean(val);
                }
            },
*/

            /**
             * @description Whether the group undo/redo is available<br>
             * Default = true
             * @attribute grpUndoredo
             * @type Boolean
            */
            grpUndoredo : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2708);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2709);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button email is available<br>
             * Default = true
             * @attribute btnEmail
             * @type Boolean
            */
            btnEmail : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2721);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2722);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button hyperlink is available<br>
             * Default = true
             * @attribute btnHyperlink
             * @type Boolean
            */
            btnHyperlink : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2734);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2735);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button remove-hyperlink is available<br>
             * Default = true
             * @attribute btnRemoveHyperlink
             * @type Boolean
            */
            btnRemoveHyperlink : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2747);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2748);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button image is available<br>
             * because this code needs to be developed in a better way, the function is disabled by default.<br>
             * It works in a simple way though.
             * Default = false
             * @attribute btnImage
             * @type Boolean
            */
            btnImage : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2762);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2763);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button iframe is available<br>
             * because not all iframe-options can be entered, the function is disabled by default.<br>
             * It does work, but you cannot specify the iframesize.
             * Default = false
             * @attribute btnIframe
             * @type Boolean
            */
            btnIframe : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2777);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2778);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button video is available<br>
             * Default = true
             * @attribute btnVideo
             * @type Boolean
            */
            btnVideo : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2790);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2791);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button save is available<br>
             * Will only fire a 'save'-event, the user should take the approperiate action himself.
             * If the attribute 'confirmSave' is set: then a confirmationmessage will appear before.
             * Default = false
             * @attribute btnSave
             * @type Boolean
            */
            btnSave : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2805);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2806);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button cancel is available<br>
             * Will restore the initial content and fire a 'cancel'-event, the user can take the approperiate action himself.<br>
             * If the attribute 'confirmCancel' is set: then a confirmationmessage will appear before.
             * Default = false
             * @attribute btnCancel
             * @type Boolean
            */
            btnCancel : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2820);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2821);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button clear is available<br>
             * Will clear the editors content. If the attribute 'confirmClear' is set: then a confirmationmessage will appear before.
             * Default = false
             * @attribute btnClear
             * @type Boolean
            */
            btnClear : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2834);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2835);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether a confirmationmessage is shown before saving the editors content<br>
             * Only to be used in combination with btnSave=true.
             * Default = true
             * @attribute confirmSave
             * @type Boolean
            */
            confirmSave : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2848);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2849);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether a confirmationmessage is shown before canceling the editors content<br>
             * Only to be used in combination with btnCancel=true.
             * Default = true
             * @attribute confirmCancel
             * @type Boolean
            */
            confirmCancel : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2862);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2863);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether a confirmationmessage is shown before cleaning the editors content<br>
             * Only to be used in combination with btnClear=true.
             * Default = true
             * @attribute confirmClear
             * @type Boolean
            */
            confirmClear : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 2876);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 2877);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description The colorpallet to use<br>
             * @attribute colorPallet
             * @type Array (String)
            */
            colorPallet : {
                value : [
                    '#111111',
                    '#2D2D2D',
                    '#434343',
                    '#5B5B5B',
                    '#737373',
                    '#8B8B8B',
                    '#A2A2A2',
                    '#B9B9B9',
                    '#000000',
                    '#D0D0D0',
                    '#E6E6E6',
                    '#FFFFFF',
                    '#BFBF00',
                    '#FFFF00',
                    '#FFFF40',
                    '#FFFF80',
                    '#FFFFBF',
                    '#525330',
                    '#898A49',
                    '#AEA945',
                    '#7F7F00',
                    '#C3BE71',
                    '#E0DCAA',
                    '#FCFAE1',
                    '#60BF00',
                    '#80FF00',
                    '#A0FF40',
                    '#C0FF80',
                    '#DFFFBF',
                    '#3B5738',
                    '#668F5A',
                    '#7F9757',
                    '#407F00',
                    '#8A9B55',
                    '#B7C296',
                    '#E6EBD5',
                    '#00BF00',
                    '#00FF80',
                    '#40FFA0',
                    '#80FFC0',
                    '#BFFFDF',
                    '#033D21',
                    '#438059',
                    '#7FA37C',
                    '#007F40',
                    '#8DAE94',
                    '#ACC6B5',
                    '#DDEBE2',
                    '#00BFBF',
                    '#00FFFF',
                    '#40FFFF',
                    '#80FFFF',
                    '#BFFFFF',
                    '#033D3D',
                    '#347D7E',
                    '#609A9F',
                    '#007F7F',
                    '#96BDC4',
                    '#B5D1D7',
                    '#E2F1F4',
                    '#0060BF',
                    '#0080FF',
                    '#40A0FF',
                    '#80C0FF',
                    '#BFDFFF',
                    '#1B2C48',
                    '#385376',
                    '#57708F',
                    '#00407F',
                    '#7792AC',
                    '#A8BED1',
                    '#DEEBF6',
                    '#0000BF',
                    '#0000FF',
                    '#4040FF',
                    '#8080FF',
                    '#BFBFFF',
                    '#212143',
                    '#373E68',
                    '#444F75',
                    '#00007F',
                    '#585E82',
                    '#8687A4',
                    '#D2D1E1',
                    '#6000BF',
                    '#8000FF',
                    '#A040FF',
                    '#C080FF',
                    '#DFBFFF',
                    '#302449',
                    '#54466F',
                    '#655A7F',
                    '#40007F',
                    '#726284',
                    '#9E8FA9',
                    '#DCD1DF',
                    '#BF00BF',
                    '#FF00FF',
                    '#FF40FF',
                    '#FF80FF',
                    '#FFBFFF',
                    '#4A234A',
                    '#794A72',
                    '#936386',
                    '#7F007F',
                    '#9D7292',
                    '#C0A0B6',
                    '#ECDAE5',
                    '#BF005F',
                    '#FF007F',
                    '#FF409F',
                    '#FF80BF',
                    '#FFBFDF',
                    '#451528',
                    '#823857',
                    '#A94A76',
                    '#7F003F',
                    '#BC6F95',
                    '#D8A5BB',
                    '#F7DDE9',
                    '#C00000',
                    '#FF0000',
                    '#FF4040',
                    '#FF8080',
                    '#FFC0C0',
                    '#441415',
                    '#82393C',
                    '#AA4D4E',
                    '#800000',
                    '#BC6E6E',
                    '#D8A3A4',
                    '#F8DDDD',
                    '#BF5F00',
                    '#FF7F00',
                    '#FF9F40',
                    '#FFBF80',
                    '#FFDFBF',
                    '#482C1B',
                    '#855A40',
                    '#B27C51',
                    '#7F3F00',
                    '#C49B71',
                    '#E1C4A8',
                    '#FDEEE0'
                ],
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 3033);
_yuitest_coverline("build/gallery-itsatoolbar/gallery-itsatoolbar.js", 3034);
return Lang.isArray(val) ;
                }

            }
        }
    }
);

}, '@VERSION@', {
    "supersedes": [
        ""
    ],
    "skinnable": "true",
    "requires": [
        "plugin",
        "base-build",
        "node-base",
        "editor",
        "event-delegate",
        "event-custom",
        "cssbutton",
        "gallery-itsaselectlist",
        "gallery-itsadialogbox"
    ],
    "optional": [
        ""
    ]
});
