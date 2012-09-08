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
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/gallery-itsatoolbar/gallery-itsatoolbar.js",
    code: []
};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].code=["YUI.add('gallery-itsatoolbar', function(Y) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module itsa-toolbar"," */","","/**"," * Editor Toolbar Plugin"," * "," *"," * @class Plugin.ITSAToolbar"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","","    ITSA_BTNNODE = \"<button class='yui3-button'></button>\",","    ITSA_BTNINNERNODE = \"<span class='itsa-button-icon'></span>\",","    ITSA_BTNPRESSED = 'yui3-button-active',","    ITSA_BTNACTIVE = 'itsa-button-active',","    ITSA_BTNINDENT = 'itsa-button-indent',","    ITSA_BUTTON = 'itsa-button',","    ITSA_BTNSYNC = 'itsa-syncbutton',","    ITSA_BTNTOGGLE = 'itsa-togglebutton',","    ITSA_BTNGROUP = 'itsa-buttongroup',","    ITSA_BTNCUSTOMFUNC = 'itsa-button-customfunc',","    ITSA_TOOLBAR_TEMPLATE = \"<div class='itsatoolbar'></div>\",","    ITSA_TOOLBAR_SMALL = 'itsa-buttonsize-small',","    ITSA_TOOLBAR_MEDIUM = 'itsa-buttonsize-medium',","    ITSA_CLASSEDITORPART = 'itsatoolbar-editorpart',","    ITSA_SELECTCONTNODE = '<div></div>',","    ITSA_REFNODE = \"<span id='itsatoolbar-ref'></span>\";","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property editor"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @property editorY"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @property editorNode"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @property containerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node.<br>"," * @property toolbarNode"," * @type Y.Node"," */","","/**"," * Used internally to check if the toolbar should still be rendered after the editor is rendered<br>"," * To prevent rendering while it is already unplugged"," * @property _destroyed"," * @type Boolean"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_BOLD"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ITALIC"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDERLINE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_LEFT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_CENTER"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_RIGHT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_JUSTIFY"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUBSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUPERSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_TEXTCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_MARKCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_INDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_OUTDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_REDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_EMAIL"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_HYPERLINK"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_IMAGE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_FILE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_VIDEO"," * @type String"," */","","Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {","","        editor : null,","        editorY : null,","        editorNode : null,","        containerNode : null,","        toolbarNode : null,","        _destroyed : false,","","        ICON_BOLD : 'itsa-icon-bold',","        ICON_ITALIC : 'itsa-icon-italic',","        ICON_UNDERLINE : 'itsa-icon-underline',","        ICON_ALIGN_LEFT : 'itsa-icon-alignleft',","        ICON_ALIGN_CENTER : 'itsa-icon-aligncenter',","        ICON_ALIGN_RIGHT : 'itsa-icon-alignright',","        ICON_ALIGN_JUSTIFY : 'itsa-icon-alignjustify',","        ICON_SUBSCRIPT : 'itsa-icon-subscript',","        ICON_SUPERSCRIPT : 'itsa-icon-superscript',","        ICON_TEXTCOLOR : 'itsa-icon-textcolor',","        ICON_MARKCOLOR : 'itsa-icon-markcolor',","        ICON_INDENT : 'itsa-icon-indent',","        ICON_OUTDENT : 'itsa-icon-outdent',","        ICON_UNORDEREDLIST : 'itsa-icon-unorderedlist',","        ICON_ORDEREDLIST : 'itsa-icon-orderedlist',","        ICON_UNDO : 'itsa-icon-undo',","        ICON_REDO : 'itsa-icon-redo',","        ICON_EMAIL : 'itsa-icon-email',","        ICON_HYPERLINK : 'itsa-icon-hyperlink',","        ICON_IMAGE : 'itsa-icon-image',","        ICON_FILE : 'itsa-icon-file',","        ICON_VIDEO : 'itsa-icon-video',","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance.editor = instance.get('host');","            // need to make sure we can use execCommand, so do not render before the frame exists.","            if (instance.editor.frame && instance.editor.frame.get('node')) {instance._render();}","            else {instance.editor.on('frame:ready', instance._render, instance);}","        },","","        /**","         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.","         * It will invoke renderUI, bindUI and syncUI, just as within a widget.","         *","         * @method _render","         * @private","        */","        _render : function() {","            var instance = this;","            if (!instance._destroyed) {","                instance.editorY = instance.editor.getInstance();","                instance.editorNode = instance.editor.frame.get('node');","                instance.containerNode = instance.editorNode.get('parentNode');","                instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);","                instance.editor.plug(Y.Plugin.ExecCommand);","                instance._defineCustomExecCommands();","                instance._renderUI();","                instance._bindUI();","                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object","                // be sure the editor has focus already focus, otherwise safari cannot inserthtml at cursorposition!","                instance.editor.frame.focus(Y.bind(instance._initStatus, instance));","            }","        },","","        /**","         * Sync the toolbar for the first time, during ititialisation<br>","         * We need to do this manually, because there is no nodeChange-event fired by the editor.","         * @method _initStatus","         * @private","        */","        _initStatus : function() {","            // Fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object","            var instance = this,","                node = instance._getCursorRef();","            if (node) {instance.toolbarNode.fire('itsatoolbar:statusChange', {changedNode: node});}","        },","","        /**","         * Gets or creates a referencenode at cursorposition<br>","         * If no selection was made, a new tmp-node (empty span) will be created to serve as reference.","         * @method _getCursorRef","         * @private","         * @returns {Y.Node} reference to the first node of the selection, or the new created node","        */","        _getCursorRef : function() {","            var instance = this,","                sel,","                out,","                node;","            sel = new instance.editorY.EditorSelection();","            out = sel.getSelected();","            if (!sel.isCollapsed && out.size()) {","                //We have a selection","                node = out.item(0);","            }","            else {","                // insert cursor and use that node as the selected node","                // first remove previous","                instance._removeCursorRef();","                instance.editor.exec.command('inserthtml', ITSA_REFNODE);","                node = instance.editorY.one('#itsatoolbar-ref');","            }","            return node;","        },","","        /**","         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef","         * @method _removeCursorRef","         * @private","        */","        _removeCursorRef : function() {","            var instance = this,","                node,","                useY;","            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases","            useY = instance.editorY ? instance.editorY : Y;","            node = useY.all('#itsatoolbar-ref');","            if (node) {node.remove();}","        },","","        /**","         * Syncs the toolbar's status with the editor.<br>","         * At this point, it only works internal, because it needs the nodeChange-eventFacade.","         * @method sync","         * @param {EventFacade} e which will be passed when the edtior fires a nodeChange-event","         * @private","        */","        sync : function(e) {","            // syncUI will sync the toolbarstatus with the editors cursorposition","            var instance = this;","            if (e && e.changedNode) {","                instance.toolbarNode.fire('itsatoolbar:statusChange', e);","            }","        },","","        /**","         * Creates a new Button on the Toolbar. By default at the end of the toolbar.","         * @method addButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, or you want a custom Function to be executed, you must supply an object:<br>","         * <i>- [command]</i> (String): the execcommand<br>","         * <i>- [value]</i> (String): additional value","         * <i>- [customFunc]</i> (Function): reference to custom function: typicaly, this function will call editorinstance.itstoolbar.execCommand() by itsself","         * <i>- [context]]</i> (instance): the context for customFunc","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addButton : function(iconClass, execCommand, indent, position) {","            var instance = this,","                buttonNode,","                buttonInnerNode;","            buttonNode = Node.create(ITSA_BTNNODE);","            buttonNode.addClass(ITSA_BUTTON);","            if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","            else if (Lang.isObject(execCommand)) {","                if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}","                if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}","                if (Lang.isFunction(execCommand.customFunc)) {","                    buttonNode.addClass(ITSA_BTNCUSTOMFUNC);","                    buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);","                }","            }","            if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}","            buttonInnerNode = Node.create(ITSA_BTNINNERNODE);","            buttonInnerNode.addClass(iconClass);","            buttonNode.append(buttonInnerNode);","            instance.toolbarNode.append(buttonNode);","            return buttonNode;","        },","","        /**","         * Creates a new syncButton on the Toolbar. By default at the end of the toolbar.<br>","         * A syncButton is just like a normal toolbarButton, with the exception that the editor can sync it's status, which cannot be done with a normal button. ","         * Typically used in situations like a hyperlinkbutton: it never stays pressed, but when the cursos is on a hyperlink, he buttons look will change.","         * @method addSyncButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addSyncButton : function(iconClass, execCommand, syncFunc, context, indent, position, isToggleButton) {","            var instance = this,","                buttonNode = instance.addButton(iconClass, execCommand, indent, position);","            if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}","            instance.toolbarNode.addTarget(buttonNode);","            if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","            return buttonNode;","        },","","        /**","         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.","         * @method addToggleButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addToggleButton : function(iconClass, execCommand, syncFunc, context, indent, position) {","            var instance = this,","                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);","            buttonNode.addClass(ITSA_BTNTOGGLE);","            return buttonNode;","        },","","        /**","         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.","         * Position is by default at the end of the toolbar.<br>","         * @method addButtongroup","         * @private","         * @param {Array} buttons Should consist of objects with two fields:<br>","         * <i>- iconClass</i> (String): defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * <i>- command</i> (String): the execcommand that will be executed on buttonclick","         * <i>- [value]</i> (String) optional: additional value for the execcommand","         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)","         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the first buttonnode of the created buttongroup","        */","        addButtongroup : function(buttons, indent, position) {","            var instance = this,","                buttonGroup = Y.guid(),","                button,","                buttonNode,","                returnNode = null,","                execCommand,","                i;","            for (i=0; i<buttons.length; i++) {","                button = buttons[i];","                if (button.iconClass && button.command) {","                    if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}","                    else {execCommand = button.command;}","                    buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);","                    buttonNode.addClass(ITSA_BTNGROUP);","                    buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);","                    buttonNode.setData('buttongroup', buttonGroup);","                    instance.toolbarNode.addTarget(buttonNode);","                    if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}","                    if (!returnNode) {returnNode = buttonNode;}","                }","            }","            return returnNode;","        },","","        /**","         * Creates a selectList on the Toolbar. By default at the end of the toolbar.","         * When fired, the event-object returnes with 2 fields:<br>","         * <i>- e.value</i>: value of selected item<br>","         * <i>- e.index</i>: indexnr of the selected item","         * @method addSelectList","         * @private","         * @param {Array} items contains all the items. Should be either a list of (String), or a list of (Objects). In case of an Object-list, the objects should contain two fields:<br>","         * <i>- text</i> (String): the text shown in the selectlist<br>","         * <i>- returnValue</i> (String): the returnvalue of e.value<br>","         * In case a String-list is supplied, e.value will equal to the selected String-item (returnvalue==text)","","         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.execCommand().<br>","         * You could provide a second 'restoreCommand', in case you need a different execCommand to erase some format. In that case you must supply an object with three fields:<br>","         * <i>- command</i> (String): the standard execcommand<br>","         * <i>- restoreCommand</i> (String): the execcommand that will be executed in case e.value equals the restore-value<br>","         * <i>- restoreValue</i> (String): when e.value equals restoreValue, restoreCommand will be used instead of the standard command","","","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Object} [config] Object that will be passed into the selectinstance. Has with the following fields:<br>","         * <i>- listAlignRight</i> (Boolean): whether to rightalign the listitems. Default=false<br>","         * <i>- hideSelected</i> (Boolean): whether the selected item is hidden from the list. Default=false","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.ITSASelectlist} reference to the created object","        */","        addSelectlist : function(items, execCommand, syncFunc, context, indent, config, position) {","            var instance = this,","                selectlist;","            config = Y.merge(config, {items: items, defaultButtonText: ''});","            selectlist = new Y.ITSASelectList(config);","            selectlist.after('render', function(e, execCommand, syncFunc, context, indent){","                var instance = this,","                    selectlist = e.currentTarget,","                    buttonNode = selectlist.buttonNode;","                if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","                else {","                    if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    ","                    if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    ","                    if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    ","                }","                if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}","                instance.toolbarNode.addTarget(buttonNode);","                selectlist.on('selectChange', instance._handleSelectChange, instance);","                if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","                instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);","            }, instance, execCommand, syncFunc, context, indent);","            selectlist.render(instance.toolbarNode);","            return selectlist;","        },","","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this,","                srcNode = instance.get('srcNode');","             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction","            instance._destroyed = true;","            instance._removeCursorRef();","            if (instance.toolbarNode) {instance.toolbarNode.remove(true);}","        },","","        // -- Private Methods ----------------------------------------------------------","","        /**","         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode ","         *","         * @method _renderUI","         * @private","        */","        _renderUI : function() {","            var instance = this,","                srcNode = instance.get('srcNode'),","                btnSize = instance.get('btnSize');","            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering","            instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);","            if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}","            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}","            if (srcNode) {","                srcNode.prepend(instance.toolbarNode);","            }","            else {","                instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);","                instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');","                instance.editorNode.insert(instance.toolbarNode, 'before');","            }","            instance._initializeButtons();","        },","        ","        /**","         * Binds events when there is a cursorstatus changes in the editor","         *","         * @method _bindUI","         * @private","        */","        _bindUI : function() {","            var instance = this;","            instance.editor.on('nodeChange', instance.sync, instance);","            instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);","        },","","        /**","         * Defines all custom execCommands","         *","         * @method _defineCustomExecCommands","         * @private","        */","        _defineCustomExecCommands : function() {","            var instance = this;","            instance._defineExecCommandFontSize();","            instance._defineExecCommandHyperlink();","            instance._defineExecCommandMaillink();","            instance._defineExecCommandImage();","            instance._defineExecCommandYouTube();","        },","","        /**","         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)","         *","         * @method _bindUI","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleBtnClick : function(e) {","            var instance = this,","                node = e.currentTarget;","            // only execute for .itsa-button, not for all buttontags    ","            if (node.hasClass(ITSA_BUTTON)) {","                if (node.hasClass(ITSA_BTNTOGGLE)) {","                    node.toggleClass(ITSA_BTNPRESSED);","                }","                else if (node.hasClass(ITSA_BTNSYNC)) {","                    node.toggleClass(ITSA_BTNACTIVE, true);","                }","                else if (node.hasClass(ITSA_BTNGROUP)) {","                    instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);","                    node.toggleClass(ITSA_BTNPRESSED, true);","                }","                if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance._execCommandFromData(node);}","            }","        },","","        /**","         * Handling the selectChange event of a selectButton","         *","         * @method _handleSelectChange","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleSelectChange : function(e) {","            var selectButtonNode,","                restoreCommand,","                execCommand;","            selectButtonNode = e.currentTarget.buttonNode;","            restoreCommand = selectButtonNode.getData('restoreCommand');","            execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');","            this.execCommand(execCommand, e.value);","        },","","        /**","         * Executes this.editor.exec.command with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>","         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.","         *","         * @method _execCommandFromData","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _execCommandFromData: function(buttonNode) {","            var execCommand,","                execValue;","            execCommand = buttonNode.getData('execCommand');","            execValue = buttonNode.getData('execValue');","            this.execCommand(execCommand, execValue);","        },","","        /**","         * Performs a execCommand that will take into account the editors cursorposition<br>","         * This means that when no selection is made, the operation still works: you can preset an command this way.","         *","         * @method execCommand","         * @param {String} command The execCommand","         * @param {String} [value] additional commandvalue","        */","        execCommand: function(command, value) {","            var instance = this;","            instance.editor.focus();","            instance.editor.exec.command(command, value);","        },","","        /**","         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector","         *","         * @method _checkInbetweenSelector","         * @private","         * @param {String} selector The selector to check for","         * @param {String} refContent Should be Y.one('body').getHtml()","         * @param {int} cursorindex Index where the cursor retains","        */","        _checkInbetweenSelector : function(selector, refContent, cursorindex) {","            var instance = this,","                pattern = '<\\s*' + selector + '[^>]*>(.*?)<\\s*/\\s*' + selector  + '>',","                searchHeaderPattern = new RegExp(pattern, 'gi'), ","                fragment, ","                inbetween = false;","            fragment = searchHeaderPattern.exec(refContent);","            while ((fragment !== null) && !inbetween) {","                inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));","                fragment = searchHeaderPattern.exec(refContent); // next search","            }","            return inbetween;","        },","","        /**","         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.","         *","         * @method _initializeButtons","         * @private","        */","        _initializeButtons : function() { ","            var instance = this,","                i, r, g, b,","                item,","                items,","                bgcolor,","                docFontSize,","                bgcolors,","                buttons;","","            // create fonffamily button","            if (instance.get('btnFontfamily')) {","                items = instance.get('fontFamilies');","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    items[i] = {text: \"<span style='font-family:\"+item+\"'>\"+item+\"</span>\", returnValue: item};","                }","                instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {","                    var familyList = e.changedNode.getStyle('fontFamily'),","                        familyListArray = familyList.split(','),","                        activeFamily = familyListArray[0];","                    this.fontSelectlist.selectItemByValue(activeFamily, true, true);","                }, null, true, {buttonWidth: 145});","            }","","            // create fontsize button","            if (instance.get('btnFontsize')) {","                items = [];","                for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}","                instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {","                    var fontSize = e.changedNode.getStyle('fontSize'),","                        fontSizeNumber = parseFloat(fontSize),","                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);","                    // make sure not to display partial numbers    ","                    this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);","                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});","            }","","            // create header button","            if (instance.get('btnHeader')) {","                items = [];","                items.push({text: 'No header', returnValue: 'none'});","                for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}","                instance.headerSelectlist = instance.addSelectlist(items, 'itsaheading', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        currentHeader,","                        i,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {","                        if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}","                    }","                    if (!currentHeader) {currentHeader=0;}","                    instance.headerSelectlist.selectItem(currentHeader);","                }, null, true, {buttonWidth: 96});","            }","","            // create bold button","            if (instance.get('btnBold')) {","                instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));","                }, null, true);","            }","","            // create italic button","            if (instance.get('btnItalic')) {","                instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));","                });","            }","","            // create underline button","            if (instance.get('btnUnderline')) {","                instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));","                });","            }","","            // create align buttons","            if (instance.get('grpAlign')) {","                buttons = [","                    {","                        iconClass : instance.ICON_ALIGN_LEFT,","                        command : 'JustifyLeft',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_CENTER,","                        command : 'JustifyCenter',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_RIGHT,","                        command : 'JustifyRight',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));","                                    }","                    }","                ];","            // create justify button","                if (instance.get('btnJustify')) {","                    buttons.push({","                        iconClass : instance.ICON_ALIGN_JUSTIFY,","                        command : 'JustifyFull',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));","                                    }","                    });","                }","                instance.addButtongroup(buttons, true);","            }","","            // create subsuperscript buttons","            if (instance.get('grpSubsuper')) {","                instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));","                }, null, true);","                instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));","                });","            }","","            // create textcolor button","            if (instance.get('btnTextcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('color'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.colorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});","            }","","            // create markcolor button","            if (instance.get('btnMarkcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('backgroundColor'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});","            }","","            // create indent buttons","            if (instance.get('grpIndent')) {","                instance.addButton(instance.ICON_INDENT, 'indent', true);","                instance.addButton(instance.ICON_OUTDENT, 'outdent');","            }","","            // create list buttons","            if (instance.get('grpLists')) {","                instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));","                }, null, true);","                instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));","                });","            }","","            // create email button","            if (instance.get('btnEmail')) {","                instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isEmailLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                    if (isLink) {","                        // check if its a normal href or a mailto:","                        while (node && !node.test('a')) {node=node.get('parentNode');}","                        // be carefull: do not === /match() with text, that will fail","                        isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');","                    }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));","                }, null, true);","            }","","            // create hyperlink button","            if (instance.get('btnHyperlink')) {","                instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {","                    var instance = this,","                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isFileLink = false,","                        href,","                        lastDot,","                        fileExt,","                        isHyperLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));","                });","            }","","            // create image button","            if (instance.get('btnImage')) {","                instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));","                });","            }","","            // create video button","            if (instance.get('btnVideo')) {","                instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));","                });","            }","","//************************************************","// just for temporary local use ITS Asbreuk","// should NOT be part of the gallery","            if (false) {","                instance.addSyncButton(","                    instance.ICON_FILE,","                    {   customFunc: function(e) {","                            Y.config.cmas2plus.uploader.show(","                                null, ","                                Y.bind(function(e) {","                                    this.editor.execCommand('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);","                                }, this)","                            );","                        }","                    },","                    function(e) {","                        var instance = this,","                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                            node = e.changedNode,","                            nodePosition,","                            isFileLink = false,","                            isLink,","                            href,","                            lastDot,","                            fileExt,","                            isHyperLink,","                            bodyhtml = instance.editorY.one('body').getHTML();","                        nodePosition = bodyhtml.indexOf(node.getHTML());","                        isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                        e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);","                    }","                );","            }","//************************************************","","            if (instance.get('grpUndoredo')) {","                instance.addButton(instance.ICON_UNDO, 'undo', true);","                instance.addButton(instance.ICON_REDO, 'redo');","            }","","        },","","        /**","        * Based on YUI2 rich-editor code","        * @private","        * @method _filter_rgb","        * @param String css The CSS string containing rgb(#,#,#);","        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00","        * @return String","        */","        _filter_rgb: function(css) {","            if (css.toLowerCase().indexOf('rgb') != -1) {","                var exp = new RegExp(\"(.*?)rgb\\\\s*?\\\\(\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?\\\\)(.*?)\", \"gi\"),","                    rgb = css.replace(exp, \"$1,$2,$3,$4,$5\").split(','),","                    r, g, b;","            ","                if (rgb.length === 5) {","                    r = parseInt(rgb[1], 10).toString(16);","                    g = parseInt(rgb[2], 10).toString(16);","                    b = parseInt(rgb[3], 10).toString(16);","","                    r = r.length === 1 ? '0' + r : r;","                    g = g.length === 1 ? '0' + g : g;","                    b = b.length === 1 ? '0' + b : b;","","                    css = \"#\" + r + g + b;","                }","            }","            return css;","        },","","        /**********************************************************************************************************************","        ***********************************************************************************************************************","","        FUNCTIONS BELOW REALLY NEED TO BE REDISGNED","        THEY DO NOT WORK WELL","","        ***********************************************************************************************************************","        ***********************************************************************************************************************/","","        /**","        * Defines the execCommand itsaheading","        * @method _defineExecCommandHeader","        * @private","        */","   /*","        _defineExecCommandHeader : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsaheading) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsaheading: function(cmd, val) {","","","                        var exec = true,","                            el = null,","                            action = 'heading',","                            _sel = this._getSelection(),","                            _selEl = this._getSelectedElement();","","                        if (_selEl) {","                            _sel = _selEl;","                        }","            ","                        if (this.browser.ie) {","                            action = 'formatblock';","                        }","                        if (value == this.STR_NONE) {","                            if ((_sel && _sel.tagName && (_sel.tagName.toLowerCase().substring(0,1) == 'h')) || (_sel && _sel.parentNode && _sel.parentNode.tagName && (_sel.parentNode.tagName.toLowerCase().substring(0,1) == 'h'))) {","                                if (_sel.parentNode.tagName.toLowerCase().substring(0,1) == 'h') {","                                    _sel = _sel.parentNode;","                                }","                                if (this._isElement(_sel, 'html')) {","                                    return [false];","                                }","                                el = this._swapEl(_selEl, 'span', function(el) {","                                    el.className = 'yui-non';","                                });","                                this._selectNode(el);","                                this.currentElement[0] = el;","                            }","                            exec = false;","                        } else {","                            if (this._isElement(_selEl, 'h1') || this._isElement(_selEl, 'h2') || this._isElement(_selEl, 'h3') || this._isElement(_selEl, 'h4') || this._isElement(_selEl, 'h5') || this._isElement(_selEl, 'h6')) {","                                el = this._swapEl(_selEl, value);","                                this._selectNode(el);","                                this.currentElement[0] = el;","                            } else {","                                this._createCurrentElement(value);","                                this._selectNode(this.currentElement[0]);","                            }","                            exec = false;","                        }","","","                   }","                });","            }","        },","*/","        /**","        * Defines the execCommand itsafontsize","        * @method _defineExecCommandFontSize","        * @private","        */","        _defineExecCommandFontSize : function() {","            // This function seriously needs redesigned.","            // it does work, but as you can see in the comment, there are some flaws","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                   itsafontsize: function(cmd, val) {","                       var execCommandInstance = this,","                           editorY = execCommandInstance.get('host').getInstance(),","                           sel = new editorY.EditorSelection(),","                           newNodelist;","                       if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {","                           //We have a selection","                            if (Y.UA.webkit) {","                                if (sel.anchorNode.getStyle('lineHeight')) {","                                    sel.anchorNode.setStyle('lineHeight', '');","                                }","                            }","                            // first cleaning up old fontsize","                            // isn't done well !! there might be other tags than <span> that have fontSize declared","                            // And you should not wrap a new <span> when sel === previous <span>","                            sel.anchorNode.all('span').setStyle('fontSize', '');","                            // create new wrapper <span style='font-size: val'>....</span>","                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>","                            // in that case you create a span wrapped on a previous span","                            newNodelist = sel.wrapContent('span');","                            newNodelist.item(0).setStyle('fontSize', val);","                       }","                       else {","                           // Didn't find a way to set the focus yet.... damn...","                           /*","                           sel.setCursor();","                           execCommandInstance.command(\"inserthtml\", \"<span style='font-size:\" + val + \"'></span>\");","                           sel.focusCursor(true, true);","                           */","                       }","                   }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaehyperlink","        * @method _defineExecCommandHyperlink","        * @private","        */","        _defineExecCommandHyperlink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    // val can be:","                    // 'img', 'url', 'video', 'email'","                    itsacreatehyperlink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter url', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url + '\" target=\"_blank\">' + url + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaeemaillink","        * @method _defineExecCommandMaillink","        * @private","        */","        _defineExecCommandMaillink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreatemaillink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            urltext,","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter email', '');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            urltext = url;","                            url = 'mailto:' + url;","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url+ '\">' + urltext + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateimage","        * @method _defineExecCommandImage","        * @private","        */","        _defineExecCommandImage : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateimage: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<img src=\"' + url + '\" />');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateyoutube","        * @method _defineExecCommandYouTube","        * @private","        */","        _defineExecCommandYouTube : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateyoutube: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                    videoitempos = url.indexOf('watch?v=');","                                    if (videoitempos!==-1) {","                                        videoitem = url.substring(url.videoitempos+8);","                                        execCommandInstance.get('host').execCommand('inserthtml', '<iframe width=\"420\" height=\"315\" src=\"http://www.youtube.com/embed/' + videoitem + '\" frameborder=\"0\" allowfullscreen></iframe>');","                                    }","                            }","                        }","                        return a;","                    }","                });","            }","        }","","    }, {","        NS : 'itsatoolbar',","        ATTRS : {","","            /**","             * @description Defines whether keyboard-enter will lead to P-tag. Default=false (meaning that BR's will be created)","             * @attribute paraSupport","             * @type Boolean","            */","            paraSupport : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The sourceNode that holds the Toolbar. Could be an empty DIV.<br>","             * If not defined, than the Toolbar will be created just above the Editor.","             * By specifying the srcNode, one could create the Toolbar on top of the page, regardless of the Editor's position","             * @attribute srcNode","             * @type Y.Node ","            */","            srcNode : {","                value: null,","                writeOnce: 'initOnly',","                setter: function(val) {","                    return Y.one(val);","                },","                validator: function(val) {","                    return Y.one(val);","                }","            },","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 2,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description The amount of headerlevels that can be selected<br>","             * Should be a value from 1-9<br>","             * Default = 6","             * @attribute headerLevels","             * @type int","            */","            headerLevels : {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<10));","                }","            },","","            /**","             * @description The fontfamilies that can be selected<br>","             * Should be a value from 1-9<br>","             * @attribute fontFamilies","             * @type Array [String]","            */","            fontFamilies : {","                value: [","                    'Arial',","                    'Arial Black',","                    'Comic Sans MS',","                    'Courier New',","                    'Lucida Console',","                    'Tahoma',","                    'Times New Roman',","                    'Trebuchet MS',","                    'Verdana'","                ],","                validator: function(val) {","                    return (Lang.isArray(val));","                }","            },","","            /**","             * @description Whether the button fontfamily is available<br>","             * Default = true","             * @attribute btnFontfamily","             * @type Boolean","            */","            btnFontfamily : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button fontsize is available<br>","             * Default = true","             * @attribute btnFontsize","             * @type Boolean","            */","            btnFontsize : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button headers is available<br>","             * because this function doesn't work well on all browsers, it is set of by default.<br>","             * Is something to work on in fututr releases. It works within firefox though.","             * Default = false","             * @attribute btnHeader","             * @type Boolean","            */","            btnHeader : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button bold is available<br>","             * Default = true","             * @attribute btnBold","             * @type Boolean","            */","            btnBold : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button italic is available<br>","             * Default = true","             * @attribute btnItalic","             * @type Boolean","            */","            btnItalic : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button underline is available<br>","             * Default = true","             * @attribute btnUnderline","             * @type Boolean","            */","            btnUnderline : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group align is available<br>","             * Default = true","             * @attribute grpAlign","             * @type Boolean","            */","            grpAlign : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button justify is available<br>","             * will only be shown in combination with grpalign","             * Default = true","             * @attribute btnJustify","             * @type Boolean","            */","            btnJustify : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group sub/superscript is available<br>","             * Default = true","             * @attribute grpSubsuper","             * @type Boolean","            */","            grpSubsuper : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button textcolor is available<br>","             * Default = true","             * @attribute btnTextcolor","             * @type Boolean","            */","            btnTextcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button markcolor is available<br>","             * Default = true","             * @attribute btnMarkcolor","             * @type Boolean","            */","            btnMarkcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group indent is available<br>","             * Default = true","             * @attribute grpIndent","             * @type Boolean","            */","            grpIndent : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group lists is available<br>","             * Default = true","             * @attribute grpLists","             * @type Boolean","            */","            grpLists : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","/*","            btnremoveformat : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","            btnhiddenelements : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","*/","","            /**","             * @description Whether the group undo/redo is available<br>","             * Default = true","             * @attribute grpUndoredo","             * @type Boolean","            */","            grpUndoredo : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button email is available<br>","             * Default = true","             * @attribute btnEmail","             * @type Boolean","            */","            btnEmail : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button hyperlink is available<br>","             * Default = true","             * @attribute btnHyperlink","             * @type Boolean","            */","            btnHyperlink : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button image is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though.","             * Default = false","             * @attribute btnImage","             * @type Boolean","            */","            btnImage : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button video is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though. The end-user should enter a youtube-link once they click on this button.","             * Default = false","             * @attribute btnVideo","             * @type Boolean","            */","            btnVideo : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The colorpallet to use<br>","             * @attribute colorPallet","             * @type Array (String)","            */","            colorPallet : {","                value : [","                    '#111111',","                    '#2D2D2D',","                    '#434343',","                    '#5B5B5B',","                    '#737373',","                    '#8B8B8B',","                    '#A2A2A2',","                    '#B9B9B9',","                    '#000000',","                    '#D0D0D0',","                    '#E6E6E6',","                    '#FFFFFF',","                    '#BFBF00',","                    '#FFFF00',","                    '#FFFF40',","                    '#FFFF80',","                    '#FFFFBF',","                    '#525330',","                    '#898A49',","                    '#AEA945',","                    '#7F7F00',","                    '#C3BE71',","                    '#E0DCAA',","                    '#FCFAE1',","                    '#60BF00',","                    '#80FF00',","                    '#A0FF40',","                    '#C0FF80',","                    '#DFFFBF',","                    '#3B5738',","                    '#668F5A',","                    '#7F9757',","                    '#407F00',","                    '#8A9B55',","                    '#B7C296',","                    '#E6EBD5',","                    '#00BF00',","                    '#00FF80',","                    '#40FFA0',","                    '#80FFC0',","                    '#BFFFDF',","                    '#033D21',","                    '#438059',","                    '#7FA37C',","                    '#007F40',","                    '#8DAE94',","                    '#ACC6B5',","                    '#DDEBE2',","                    '#00BFBF',","                    '#00FFFF',","                    '#40FFFF',","                    '#80FFFF',","                    '#BFFFFF',","                    '#033D3D',","                    '#347D7E',","                    '#609A9F',","                    '#007F7F',","                    '#96BDC4',","                    '#B5D1D7',","                    '#E2F1F4',","                    '#0060BF',","                    '#0080FF',","                    '#40A0FF',","                    '#80C0FF',","                    '#BFDFFF',","                    '#1B2C48',","                    '#385376',","                    '#57708F',","                    '#00407F',","                    '#7792AC',","                    '#A8BED1',","                    '#DEEBF6',","                    '#0000BF',","                    '#0000FF',","                    '#4040FF',","                    '#8080FF',","                    '#BFBFFF',","                    '#212143',","                    '#373E68',","                    '#444F75',","                    '#00007F',","                    '#585E82',","                    '#8687A4',","                    '#D2D1E1',","                    '#6000BF',","                    '#8000FF',","                    '#A040FF',","                    '#C080FF',","                    '#DFBFFF',","                    '#302449',","                    '#54466F',","                    '#655A7F',","                    '#40007F',","                    '#726284',","                    '#9E8FA9',","                    '#DCD1DF',","                    '#BF00BF',","                    '#FF00FF',","                    '#FF40FF',","                    '#FF80FF',","                    '#FFBFFF',","                    '#4A234A',","                    '#794A72',","                    '#936386',","                    '#7F007F',","                    '#9D7292',","                    '#C0A0B6',","                    '#ECDAE5',","                    '#BF005F',","                    '#FF007F',","                    '#FF409F',","                    '#FF80BF',","                    '#FFBFDF',","                    '#451528',","                    '#823857',","                    '#A94A76',","                    '#7F003F',","                    '#BC6F95',","                    '#D8A5BB',","                    '#F7DDE9',","                    '#C00000',","                    '#FF0000',","                    '#FF4040',","                    '#FF8080',","                    '#FFC0C0',","                    '#441415',","                    '#82393C',","                    '#AA4D4E',","                    '#800000',","                    '#BC6E6E',","                    '#D8A3A4',","                    '#F8DDDD',","                    '#BF5F00',","                    '#FF7F00',","                    '#FF9F40',","                    '#FFBF80',","                    '#FFDFBF',","                    '#482C1B',","                    '#855A40',","                    '#B27C51',","                    '#7F3F00',","                    '#C49B71',","                    '#E1C4A8',","                    '#FDEEE0'","                ],","                validator: function(val) {","                    return Lang.isArray(val) ;","                }","","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].lines = {"1":0,"3":0,"24":0,"238":0,"277":0,"278":0,"280":0,"292":0,"293":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"300":0,"301":0,"304":0,"316":0,"318":0,"329":0,"333":0,"334":0,"335":0,"337":0,"342":0,"343":0,"344":0,"346":0,"355":0,"359":0,"360":0,"361":0,"373":0,"374":0,"375":0,"395":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"405":0,"406":0,"409":0,"410":0,"411":0,"412":0,"413":0,"414":0,"437":0,"439":0,"440":0,"441":0,"442":0,"463":0,"465":0,"466":0,"485":0,"492":0,"493":0,"494":0,"495":0,"497":0,"498":0,"499":0,"500":0,"501":0,"502":0,"503":0,"506":0,"538":0,"540":0,"541":0,"542":0,"543":0,"546":0,"548":0,"549":0,"550":0,"552":0,"553":0,"554":0,"555":0,"556":0,"558":0,"559":0,"569":0,"572":0,"573":0,"574":0,"586":0,"590":0,"591":0,"593":0,"594":0,"597":0,"598":0,"599":0,"601":0,"611":0,"612":0,"613":0,"623":0,"624":0,"625":0,"626":0,"627":0,"628":0,"639":0,"642":0,"643":0,"644":0,"646":0,"647":0,"649":0,"650":0,"651":0,"653":0,"665":0,"668":0,"669":0,"670":0,"671":0,"683":0,"685":0,"686":0,"687":0,"699":0,"700":0,"701":0,"714":0,"719":0,"720":0,"721":0,"722":0,"724":0,"734":0,"744":0,"745":0,"746":0,"747":0,"748":0,"750":0,"751":0,"754":0,"759":0,"760":0,"761":0,"762":0,"763":0,"767":0,"772":0,"773":0,"774":0,"775":0,"776":0,"777":0,"783":0,"784":0,"785":0,"787":0,"788":0,"793":0,"794":0,"795":0,"800":0,"801":0,"802":0,"807":0,"808":0,"809":0,"814":0,"815":0,"821":0,"829":0,"837":0,"842":0,"843":0,"848":0,"852":0,"856":0,"857":0,"858":0,"860":0,"861":0,"866":0,"867":0,"868":0,"869":0,"870":0,"871":0,"873":0,"874":0,"877":0,"882":0,"883":0,"884":0,"885":0,"886":0,"887":0,"889":0,"890":0,"893":0,"898":0,"899":0,"900":0,"904":0,"905":0,"906":0,"910":0,"911":0,"913":0,"914":0,"918":0,"919":0,"924":0,"925":0,"926":0,"932":0,"933":0,"934":0,"936":0,"938":0,"940":0,"945":0,"946":0,"947":0,"958":0,"959":0,"960":0,"962":0,"964":0,"965":0,"966":0,"967":0,"968":0,"969":0,"970":0,"974":0,"979":0,"980":0,"981":0,"986":0,"987":0,"988":0,"995":0,"996":0,"999":0,"1002":0,"1008":0,"1019":0,"1020":0,"1021":0,"1023":0,"1025":0,"1026":0,"1027":0,"1028":0,"1029":0,"1030":0,"1031":0,"1035":0,"1041":0,"1042":0,"1043":0,"1057":0,"1058":0,"1062":0,"1063":0,"1064":0,"1065":0,"1067":0,"1068":0,"1069":0,"1071":0,"1074":0,"1152":0,"1153":0,"1155":0,"1159":0,"1161":0,"1162":0,"1163":0,"1169":0,"1173":0,"1174":0,"1195":0,"1196":0,"1200":0,"1209":0,"1210":0,"1211":0,"1212":0,"1213":0,"1214":0,"1215":0,"1216":0,"1217":0,"1218":0,"1219":0,"1221":0,"1222":0,"1223":0,"1225":0,"1226":0,"1227":0,"1228":0,"1234":0,"1237":0,"1249":0,"1250":0,"1252":0,"1262":0,"1263":0,"1264":0,"1265":0,"1266":0,"1267":0,"1268":0,"1269":0,"1270":0,"1271":0,"1272":0,"1273":0,"1274":0,"1276":0,"1277":0,"1278":0,"1280":0,"1281":0,"1282":0,"1283":0,"1289":0,"1292":0,"1304":0,"1305":0,"1307":0,"1316":0,"1317":0,"1318":0,"1319":0,"1320":0,"1321":0,"1322":0,"1323":0,"1324":0,"1325":0,"1326":0,"1328":0,"1329":0,"1330":0,"1332":0,"1333":0,"1334":0,"1335":0,"1341":0,"1344":0,"1356":0,"1357":0,"1359":0,"1368":0,"1369":0,"1370":0,"1371":0,"1372":0,"1373":0,"1374":0,"1375":0,"1376":0,"1377":0,"1378":0,"1380":0,"1381":0,"1382":0,"1384":0,"1385":0,"1386":0,"1387":0,"1393":0,"1394":0,"1395":0,"1396":0,"1400":0,"1418":0,"1433":0,"1436":0,"1450":0,"1464":0,"1487":0,"1500":0,"1513":0,"1528":0,"1541":0,"1554":0,"1567":0,"1580":0,"1594":0,"1607":0,"1620":0,"1633":0,"1646":0,"1659":0,"1686":0,"1699":0,"1712":0,"1727":0,"1742":0,"1899":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].functions = {"initializer:276":0,"_render:291":0,"_initStatus:314":0,"_getCursorRef:328":0,"_removeCursorRef:354":0,"sync:371":0,"addButton:394":0,"addSyncButton:436":0,"addToggleButton:462":0,"addButtongroup:484":0,"(anonymous 2):542":0,"addSelectlist:537":0,"destructor:568":0,"_renderUI:585":0,"_bindUI:610":0,"_defineCustomExecCommands:622":0,"_handleBtnClick:638":0,"_handleSelectChange:664":0,"_execCommandFromData:682":0,"execCommand:698":0,"_checkInbetweenSelector:713":0,"(anonymous 3):750":0,"(anonymous 4):762":0,"(anonymous 5):776":0,"(anonymous 6):794":0,"(anonymous 7):801":0,"(anonymous 8):808":0,"syncFunc:820":0,"syncFunc:828":0,"syncFunc:836":0,"syncFunc:847":0,"(anonymous 9):857":0,"(anonymous 10):860":0,"(anonymous 11):873":0,"(anonymous 12):889":0,"(anonymous 13):905":0,"(anonymous 14):913":0,"(anonymous 15):925":0,"(anonymous 16):946":0,"(anonymous 17):980":0,"(anonymous 18):987":0,"(anonymous 19):1001":0,"customFunc:998":0,"(anonymous 20):1007":0,"_initializeButtons:733":0,"_filter_rgb:1056":0,"itsafontsize:1154":0,"_defineExecCommandFontSize:1149":0,"itsacreatehyperlink:1199":0,"_defineExecCommandHyperlink:1194":0,"itsacreatemaillink:1251":0,"_defineExecCommandMaillink:1248":0,"itsacreateimage:1306":0,"_defineExecCommandImage:1303":0,"itsacreateyoutube:1358":0,"_defineExecCommandYouTube:1355":0,"validator:1417":0,"setter:1432":0,"validator:1435":0,"validator:1449":0,"validator:1463":0,"validator:1486":0,"validator:1499":0,"validator:1512":0,"validator:1527":0,"validator:1540":0,"validator:1553":0,"validator:1566":0,"validator:1579":0,"validator:1593":0,"validator:1606":0,"validator:1619":0,"validator:1632":0,"validator:1645":0,"validator:1658":0,"validator:1685":0,"validator:1698":0,"validator:1711":0,"validator:1726":0,"validator:1741":0,"validator:1898":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredLines = 411;
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredFunctions = 82;
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1);
YUI.add('gallery-itsatoolbar', function(Y) {

_yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 3);
'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module itsa-toolbar
 */

/**
 * Editor Toolbar Plugin
 * 
 *
 * @class Plugin.ITSAToolbar
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 24);
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
    ITSA_REFNODE = "<span id='itsatoolbar-ref'></span>";

// -- Public Static Properties -------------------------------------------------

/**
 * Reference to the editor's instance
 * @property editor
 * @type Y.EditorBase instance
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
 * @type Boolean
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
 * @property ICON_FILE
 * @type String
 */

/**
 * Can be used as iconClass within buttondefinition
 * @static
 * @property ICON_VIDEO
 * @type String
 */

_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 238);
Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {

        editor : null,
        editorY : null,
        editorNode : null,
        containerNode : null,
        toolbarNode : null,
        _destroyed : false,

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
        ICON_IMAGE : 'itsa-icon-image',
        ICON_FILE : 'itsa-icon-file',
        ICON_VIDEO : 'itsa-icon-video',
        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @param {Object} config The config-object.
         * @protected
        */
        initializer : function(config) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "initializer", 276);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 277);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 278);
instance.editor = instance.get('host');
            // need to make sure we can use execCommand, so do not render before the frame exists.
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 280);
if (instance.editor.frame && instance.editor.frame.get('node')) {instance._render();}
            else {instance.editor.on('frame:ready', instance._render, instance);}
        },

        /**
         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.
         * It will invoke renderUI, bindUI and syncUI, just as within a widget.
         *
         * @method _render
         * @private
        */
        _render : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_render", 291);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 292);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 293);
if (!instance._destroyed) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 294);
instance.editorY = instance.editor.getInstance();
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 295);
instance.editorNode = instance.editor.frame.get('node');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 296);
instance.containerNode = instance.editorNode.get('parentNode');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 297);
instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 298);
instance.editor.plug(Y.Plugin.ExecCommand);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 299);
instance._defineCustomExecCommands();
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 300);
instance._renderUI();
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 301);
instance._bindUI();
                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object
                // be sure the editor has focus already focus, otherwise safari cannot inserthtml at cursorposition!
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 304);
instance.editor.frame.focus(Y.bind(instance._initStatus, instance));
            }
        },

        /**
         * Sync the toolbar for the first time, during ititialisation<br>
         * We need to do this manually, because there is no nodeChange-event fired by the editor.
         * @method _initStatus
         * @private
        */
        _initStatus : function() {
            // Fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initStatus", 314);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 316);
var instance = this,
                node = instance._getCursorRef();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 318);
if (node) {instance.toolbarNode.fire('itsatoolbar:statusChange', {changedNode: node});}
        },

        /**
         * Gets or creates a referencenode at cursorposition<br>
         * If no selection was made, a new tmp-node (empty span) will be created to serve as reference.
         * @method _getCursorRef
         * @private
         * @returns {Y.Node} reference to the first node of the selection, or the new created node
        */
        _getCursorRef : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_getCursorRef", 328);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 329);
var instance = this,
                sel,
                out,
                node;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 333);
sel = new instance.editorY.EditorSelection();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 334);
out = sel.getSelected();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 335);
if (!sel.isCollapsed && out.size()) {
                //We have a selection
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 337);
node = out.item(0);
            }
            else {
                // insert cursor and use that node as the selected node
                // first remove previous
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 342);
instance._removeCursorRef();
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 343);
instance.editor.exec.command('inserthtml', ITSA_REFNODE);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 344);
node = instance.editorY.one('#itsatoolbar-ref');
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 346);
return node;
        },

        /**
         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef
         * @method _removeCursorRef
         * @private
        */
        _removeCursorRef : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_removeCursorRef", 354);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 355);
var instance = this,
                node,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 359);
useY = instance.editorY ? instance.editorY : Y;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 360);
node = useY.all('#itsatoolbar-ref');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 361);
if (node) {node.remove();}
        },

        /**
         * Syncs the toolbar's status with the editor.<br>
         * At this point, it only works internal, because it needs the nodeChange-eventFacade.
         * @method sync
         * @param {EventFacade} e which will be passed when the edtior fires a nodeChange-event
         * @private
        */
        sync : function(e) {
            // syncUI will sync the toolbarstatus with the editors cursorposition
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "sync", 371);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 373);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 374);
if (e && e.changedNode) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 375);
instance.toolbarNode.fire('itsatoolbar:statusChange', e);
            }
        },

        /**
         * Creates a new Button on the Toolbar. By default at the end of the toolbar.
         * @method addButton
         * @private
         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButton", 394);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 395);
var instance = this,
                buttonNode,
                buttonInnerNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 398);
buttonNode = Node.create(ITSA_BTNNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 399);
buttonNode.addClass(ITSA_BUTTON);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 400);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
            else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 401);
if (Lang.isObject(execCommand)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 402);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 403);
if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 404);
if (Lang.isFunction(execCommand.customFunc)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 405);
buttonNode.addClass(ITSA_BTNCUSTOMFUNC);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 406);
buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);
                }
            }}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 409);
if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 410);
buttonInnerNode = Node.create(ITSA_BTNINNERNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 411);
buttonInnerNode.addClass(iconClass);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 412);
buttonNode.append(buttonInnerNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 413);
instance.toolbarNode.append(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 414);
return buttonNode;
        },

        /**
         * Creates a new syncButton on the Toolbar. By default at the end of the toolbar.<br>
         * A syncButton is just like a normal toolbarButton, with the exception that the editor can sync it's status, which cannot be done with a normal button. 
         * Typically used in situations like a hyperlinkbutton: it never stays pressed, but when the cursos is on a hyperlink, he buttons look will change.
         * @method addSyncButton
         * @private
         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSyncButton", 436);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 437);
var instance = this,
                buttonNode = instance.addButton(iconClass, execCommand, indent, position);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 439);
if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 440);
instance.toolbarNode.addTarget(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 441);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 442);
return buttonNode;
        },

        /**
         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.
         * @method addToggleButton
         * @private
         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addToggleButton", 462);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 463);
var instance = this,
                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 465);
buttonNode.addClass(ITSA_BTNTOGGLE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 466);
return buttonNode;
        },

        /**
         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.
         * Position is by default at the end of the toolbar.<br>
         * @method addButtongroup
         * @private
         * @param {Array} buttons Should consist of objects with two fields:<br>
         * <i>- iconClass</i> (String): defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.
         * <i>- command</i> (String): the execcommand that will be executed on buttonclick
         * <i>- [value]</i> (String) optional: additional value for the execcommand
         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)
         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.Node} reference to the first buttonnode of the created buttongroup
        */
        addButtongroup : function(buttons, indent, position) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButtongroup", 484);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 485);
var instance = this,
                buttonGroup = Y.guid(),
                button,
                buttonNode,
                returnNode = null,
                execCommand,
                i;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 492);
for (i=0; i<buttons.length; i++) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 493);
button = buttons[i];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 494);
if (button.iconClass && button.command) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 495);
if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}
                    else {execCommand = button.command;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 497);
buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 498);
buttonNode.addClass(ITSA_BTNGROUP);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 499);
buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 500);
buttonNode.setData('buttongroup', buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 501);
instance.toolbarNode.addTarget(buttonNode);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 502);
if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 503);
if (!returnNode) {returnNode = buttonNode;}
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 506);
return returnNode;
        },

        /**
         * Creates a selectList on the Toolbar. By default at the end of the toolbar.
         * When fired, the event-object returnes with 2 fields:<br>
         * <i>- e.value</i>: value of selected item<br>
         * <i>- e.index</i>: indexnr of the selected item
         * @method addSelectList
         * @private
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSelectlist", 537);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 538);
var instance = this,
                selectlist;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 540);
config = Y.merge(config, {items: items, defaultButtonText: ''});
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 541);
selectlist = new Y.ITSASelectList(config);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 542);
selectlist.after('render', function(e, execCommand, syncFunc, context, indent){
                _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 2)", 542);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 543);
var instance = this,
                    selectlist = e.currentTarget,
                    buttonNode = selectlist.buttonNode;
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 546);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
                else {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 548);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 549);
if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 550);
if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 552);
if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 553);
instance.toolbarNode.addTarget(buttonNode);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 554);
selectlist.on('selectChange', instance._handleSelectChange, instance);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 555);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 556);
instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);
            }, instance, execCommand, syncFunc, context, indent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 558);
selectlist.render(instance.toolbarNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 559);
return selectlist;
        },


        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "destructor", 568);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 569);
var instance = this,
                srcNode = instance.get('srcNode');
             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 572);
instance._destroyed = true;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 573);
instance._removeCursorRef();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 574);
if (instance.toolbarNode) {instance.toolbarNode.remove(true);}
        },

        // -- Private Methods ----------------------------------------------------------

        /**
         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode 
         *
         * @method _renderUI
         * @private
        */
        _renderUI : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_renderUI", 585);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 586);
var instance = this,
                srcNode = instance.get('srcNode'),
                btnSize = instance.get('btnSize');
            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 590);
instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 591);
if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}
            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 593);
if (srcNode) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 594);
srcNode.prepend(instance.toolbarNode);
            }
            else {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 597);
instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 598);
instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 599);
instance.editorNode.insert(instance.toolbarNode, 'before');
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 601);
instance._initializeButtons();
        },
        
        /**
         * Binds events when there is a cursorstatus changes in the editor
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_bindUI", 610);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 611);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 612);
instance.editor.on('nodeChange', instance.sync, instance);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 613);
instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);
        },

        /**
         * Defines all custom execCommands
         *
         * @method _defineCustomExecCommands
         * @private
        */
        _defineCustomExecCommands : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineCustomExecCommands", 622);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 623);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 624);
instance._defineExecCommandFontSize();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 625);
instance._defineExecCommandHyperlink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 626);
instance._defineExecCommandMaillink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 627);
instance._defineExecCommandImage();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 628);
instance._defineExecCommandYouTube();
        },

        /**
         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)
         *
         * @method _bindUI
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        _handleBtnClick : function(e) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleBtnClick", 638);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 639);
var instance = this,
                node = e.currentTarget;
            // only execute for .itsa-button, not for all buttontags    
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 642);
if (node.hasClass(ITSA_BUTTON)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 643);
if (node.hasClass(ITSA_BTNTOGGLE)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 644);
node.toggleClass(ITSA_BTNPRESSED);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 646);
if (node.hasClass(ITSA_BTNSYNC)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 647);
node.toggleClass(ITSA_BTNACTIVE, true);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 649);
if (node.hasClass(ITSA_BTNGROUP)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 650);
instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 651);
node.toggleClass(ITSA_BTNPRESSED, true);
                }}}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 653);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleSelectChange", 664);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 665);
var selectButtonNode,
                restoreCommand,
                execCommand;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 668);
selectButtonNode = e.currentTarget.buttonNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 669);
restoreCommand = selectButtonNode.getData('restoreCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 670);
execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 671);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_execCommandFromData", 682);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 683);
var execCommand,
                execValue;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 685);
execCommand = buttonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 686);
execValue = buttonNode.getData('execValue');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 687);
this.execCommand(execCommand, execValue);
        },

        /**
         * Performs a execCommand that will take into account the editors cursorposition<br>
         * This means that when no selection is made, the operation still works: you can preset an command this way.
         *
         * @method execCommand
         * @param {String} command The execCommand
         * @param {String} [value] additional commandvalue
        */
        execCommand: function(command, value) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "execCommand", 698);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 699);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 700);
instance.editor.focus();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 701);
instance.editor.exec.command(command, value);
        },

        /**
         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector
         *
         * @method _checkInbetweenSelector
         * @private
         * @param {String} selector The selector to check for
         * @param {String} refContent Should be Y.one('body').getHtml()
         * @param {int} cursorindex Index where the cursor retains
        */
        _checkInbetweenSelector : function(selector, refContent, cursorindex) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_checkInbetweenSelector", 713);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 714);
var instance = this,
                pattern = '<\s*' + selector + '[^>]*>(.*?)<\s*/\s*' + selector  + '>',
                searchHeaderPattern = new RegExp(pattern, 'gi'), 
                fragment, 
                inbetween = false;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 719);
fragment = searchHeaderPattern.exec(refContent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 720);
while ((fragment !== null) && !inbetween) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 721);
inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 722);
fragment = searchHeaderPattern.exec(refContent); // next search
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 724);
return inbetween;
        },

        /**
         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.
         *
         * @method _initializeButtons
         * @private
        */
        _initializeButtons : function() { 
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initializeButtons", 733);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 734);
var instance = this,
                i, r, g, b,
                item,
                items,
                bgcolor,
                docFontSize,
                bgcolors,
                buttons;

            // create fonffamily button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 744);
if (instance.get('btnFontfamily')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 745);
items = instance.get('fontFamilies');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 746);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 747);
item = items[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 748);
items[i] = {text: "<span style='font-family:"+item+"'>"+item+"</span>", returnValue: item};
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 750);
instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 3)", 750);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 751);
var familyList = e.changedNode.getStyle('fontFamily'),
                        familyListArray = familyList.split(','),
                        activeFamily = familyListArray[0];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 754);
this.fontSelectlist.selectItemByValue(activeFamily, true, true);
                }, null, true, {buttonWidth: 145});
            }

            // create fontsize button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 759);
if (instance.get('btnFontsize')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 760);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 761);
for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 762);
instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 4)", 762);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 763);
var fontSize = e.changedNode.getStyle('fontSize'),
                        fontSizeNumber = parseFloat(fontSize),
                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);
                    // make sure not to display partial numbers    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 767);
this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);
                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});
            }

            // create header button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 772);
if (instance.get('btnHeader')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 773);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 774);
items.push({text: 'No header', returnValue: 'none'});
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 775);
for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 776);
instance.headerSelectlist = instance.addSelectlist(items, 'itsaheading', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 5)", 776);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 777);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        currentHeader,
                        i,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 783);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 784);
for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 785);
if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 787);
if (!currentHeader) {currentHeader=0;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 788);
instance.headerSelectlist.selectItem(currentHeader);
                }, null, true, {buttonWidth: 96});
            }

            // create bold button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 793);
if (instance.get('btnBold')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 794);
instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 6)", 794);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 795);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));
                }, null, true);
            }

            // create italic button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 800);
if (instance.get('btnItalic')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 801);
instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 7)", 801);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 802);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));
                });
            }

            // create underline button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 807);
if (instance.get('btnUnderline')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 808);
instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 8)", 808);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 809);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));
                });
            }

            // create align buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 814);
if (instance.get('grpAlign')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 815);
buttons = [
                    {
                        iconClass : instance.ICON_ALIGN_LEFT,
                        command : 'JustifyLeft',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 820);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 821);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_CENTER,
                        command : 'JustifyCenter',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 828);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 829);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_RIGHT,
                        command : 'JustifyRight',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 836);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 837);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));
                                    }
                    }
                ];
            // create justify button
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 842);
if (instance.get('btnJustify')) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 843);
buttons.push({
                        iconClass : instance.ICON_ALIGN_JUSTIFY,
                        command : 'JustifyFull',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 847);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 848);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));
                                    }
                    });
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 852);
instance.addButtongroup(buttons, true);
            }

            // create subsuperscript buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 856);
if (instance.get('grpSubsuper')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 857);
instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 9)", 857);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 858);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 860);
instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 10)", 860);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 861);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));
                });
            }

            // create textcolor button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 866);
if (instance.get('btnTextcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 867);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 868);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 869);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 870);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 871);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 873);
instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 11)", 873);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 874);
var instance = this,
                        styleColor = e.changedNode.getStyle('color'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 877);
instance.colorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});
            }

            // create markcolor button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 882);
if (instance.get('btnMarkcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 883);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 884);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 885);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 886);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 887);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 889);
instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 12)", 889);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 890);
var instance = this,
                        styleColor = e.changedNode.getStyle('backgroundColor'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 893);
instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});
            }

            // create indent buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 898);
if (instance.get('grpIndent')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 899);
instance.addButton(instance.ICON_INDENT, 'indent', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 900);
instance.addButton(instance.ICON_OUTDENT, 'outdent');
            }

            // create list buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 904);
if (instance.get('grpLists')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 905);
instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 13)", 905);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 906);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 910);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 911);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 913);
instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 14)", 913);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 914);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 918);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 919);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));
                });
            }

            // create email button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 924);
if (instance.get('btnEmail')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 925);
instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 15)", 925);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 926);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isEmailLink,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 932);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 933);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 934);
if (isLink) {
                        // check if its a normal href or a mailto:
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 936);
while (node && !node.test('a')) {node=node.get('parentNode');}
                        // be carefull: do not === /match() with text, that will fail
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 938);
isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 940);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));
                }, null, true);
            }

            // create hyperlink button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 945);
if (instance.get('btnHyperlink')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 946);
instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 16)", 946);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 947);
var instance = this,
                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isFileLink = false,
                        href,
                        lastDot,
                        fileExt,
                        isHyperLink,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 958);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 959);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 960);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 962);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 964);
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 965);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 966);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 967);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 968);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 969);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 970);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 974);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));
                });
            }

            // create image button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 979);
if (instance.get('btnImage')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 980);
instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 17)", 980);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 981);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));
                });
            }

            // create video button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 986);
if (instance.get('btnVideo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 987);
instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 18)", 987);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 988);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));
                });
            }

//************************************************
// just for temporary local use ITS Asbreuk
// should NOT be part of the gallery
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 995);
if (false) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 996);
instance.addSyncButton(
                    instance.ICON_FILE,
                    {   customFunc: function(e) {
                            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "customFunc", 998);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 999);
Y.config.cmas2plus.uploader.show(
                                null, 
                                Y.bind(function(e) {
                                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 19)", 1001);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1002);
this.editor.execCommand('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);
                                }, this)
                            );
                        }
                    },
                    function(e) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 20)", 1007);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1008);
var instance = this,
                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',
                            node = e.changedNode,
                            nodePosition,
                            isFileLink = false,
                            isLink,
                            href,
                            lastDot,
                            fileExt,
                            isHyperLink,
                            bodyhtml = instance.editorY.one('body').getHTML();
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1019);
nodePosition = bodyhtml.indexOf(node.getHTML());
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1020);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1021);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1023);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1025);
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1026);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1027);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1028);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1029);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1030);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1031);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1035);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);
                    }
                );
            }
//************************************************

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1041);
if (instance.get('grpUndoredo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1042);
instance.addButton(instance.ICON_UNDO, 'undo', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1043);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_filter_rgb", 1056);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1057);
if (css.toLowerCase().indexOf('rgb') != -1) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1058);
var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi"),
                    rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(','),
                    r, g, b;
            
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1062);
if (rgb.length === 5) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1063);
r = parseInt(rgb[1], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1064);
g = parseInt(rgb[2], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1065);
b = parseInt(rgb[3], 10).toString(16);

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1067);
r = r.length === 1 ? '0' + r : r;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1068);
g = g.length === 1 ? '0' + g : g;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1069);
b = b.length === 1 ? '0' + b : b;

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1071);
css = "#" + r + g + b;
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1074);
return css;
        },

        /**********************************************************************************************************************
        ***********************************************************************************************************************

        FUNCTIONS BELOW REALLY NEED TO BE REDISGNED
        THEY DO NOT WORK WELL

        ***********************************************************************************************************************
        ***********************************************************************************************************************/

        /**
        * Defines the execCommand itsaheading
        * @method _defineExecCommandHeader
        * @private
        */
   /*
        _defineExecCommandHeader : function() {
            if (!Y.Plugin.ExecCommand.COMMANDS.itsaheading) {
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsaheading: function(cmd, val) {


                        var exec = true,
                            el = null,
                            action = 'heading',
                            _sel = this._getSelection(),
                            _selEl = this._getSelectedElement();

                        if (_selEl) {
                            _sel = _selEl;
                        }
            
                        if (this.browser.ie) {
                            action = 'formatblock';
                        }
                        if (value == this.STR_NONE) {
                            if ((_sel && _sel.tagName && (_sel.tagName.toLowerCase().substring(0,1) == 'h')) || (_sel && _sel.parentNode && _sel.parentNode.tagName && (_sel.parentNode.tagName.toLowerCase().substring(0,1) == 'h'))) {
                                if (_sel.parentNode.tagName.toLowerCase().substring(0,1) == 'h') {
                                    _sel = _sel.parentNode;
                                }
                                if (this._isElement(_sel, 'html')) {
                                    return [false];
                                }
                                el = this._swapEl(_selEl, 'span', function(el) {
                                    el.className = 'yui-non';
                                });
                                this._selectNode(el);
                                this.currentElement[0] = el;
                            }
                            exec = false;
                        } else {
                            if (this._isElement(_selEl, 'h1') || this._isElement(_selEl, 'h2') || this._isElement(_selEl, 'h3') || this._isElement(_selEl, 'h4') || this._isElement(_selEl, 'h5') || this._isElement(_selEl, 'h6')) {
                                el = this._swapEl(_selEl, value);
                                this._selectNode(el);
                                this.currentElement[0] = el;
                            } else {
                                this._createCurrentElement(value);
                                this._selectNode(this.currentElement[0]);
                            }
                            exec = false;
                        }


                   }
                });
            }
        },
*/
        /**
        * Defines the execCommand itsafontsize
        * @method _defineExecCommandFontSize
        * @private
        */
        _defineExecCommandFontSize : function() {
            // This function seriously needs redesigned.
            // it does work, but as you can see in the comment, there are some flaws
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontSize", 1149);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1152);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1153);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                   itsafontsize: function(cmd, val) {
                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontsize", 1154);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1155);
var execCommandInstance = this,
                           editorY = execCommandInstance.get('host').getInstance(),
                           sel = new editorY.EditorSelection(),
                           newNodelist;
                       _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1159);
if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {
                           //We have a selection
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1161);
if (Y.UA.webkit) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1162);
if (sel.anchorNode.getStyle('lineHeight')) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1163);
sel.anchorNode.setStyle('lineHeight', '');
                                }
                            }
                            // first cleaning up old fontsize
                            // isn't done well !! there might be other tags than <span> that have fontSize declared
                            // And you should not wrap a new <span> when sel === previous <span>
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1169);
sel.anchorNode.all('span').setStyle('fontSize', '');
                            // create new wrapper <span style='font-size: val'>....</span>
                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>
                            // in that case you create a span wrapped on a previous span
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1173);
newNodelist = sel.wrapContent('span');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1174);
newNodelist.item(0).setStyle('fontSize', val);
                       }
                       else {
                           // Didn't find a way to set the focus yet.... damn...
                           /*
                           sel.setCursor();
                           execCommandInstance.command("inserthtml", "<span style='font-size:" + val + "'></span>");
                           sel.focusCursor(true, true);
                           */
                       }
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandHyperlink", 1194);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1195);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1196);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsacreatehyperlink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatehyperlink", 1199);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1200);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1209);
url = val || prompt('Enter url', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1210);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1211);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1212);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1213);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1214);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1215);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1216);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1217);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1218);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1219);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1221);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1222);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1223);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1225);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1226);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1227);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1228);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1234);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url + '" target="_blank">' + url + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1237);
return a;
                    }
                });
            }
        },

        /**
        * Defines the execCommand itsacretaeemaillink
        * @method _defineExecCommandMaillink
        * @private
        */
        _defineExecCommandMaillink : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandMaillink", 1248);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1249);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1250);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreatemaillink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatemaillink", 1251);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1252);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            urltext,
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1262);
url = val || prompt('Enter email', '');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1263);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1264);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1265);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1266);
urltext = url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1267);
url = 'mailto:' + url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1268);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1269);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1270);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1271);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1272);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1273);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1274);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1276);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1277);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1278);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1280);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1281);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1282);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1283);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1289);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url+ '">' + urltext + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1292);
return a;
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandImage", 1303);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1304);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1305);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateimage: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateimage", 1306);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1307);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1316);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1317);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1318);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1319);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1320);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1321);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1322);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1323);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1324);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1325);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1326);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1328);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1329);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1330);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1332);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1333);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1334);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1335);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1341);
execCommandInstance.get('host').execCommand('inserthtml', '<img src="' + url + '" />');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1344);
return a;
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandYouTube", 1355);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1356);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1357);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateyoutube: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateyoutube", 1358);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1359);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1368);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1369);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1370);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1371);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1372);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1373);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1374);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1375);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1376);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1377);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1378);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1380);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1381);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1382);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1384);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1385);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1386);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1387);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1393);
videoitempos = url.indexOf('watch?v=');
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1394);
if (videoitempos!==-1) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1395);
videoitem = url.substring(url.videoitempos+8);
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1396);
execCommandInstance.get('host').execCommand('inserthtml', '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + videoitem + '" frameborder="0" allowfullscreen></iframe>');
                                    }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1400);
return a;
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1417);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1418);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "setter", 1432);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1433);
return Y.one(val);
                },
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1435);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1436);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1449);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1450);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1463);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1464);
return (Lang.isNumber(val) && (val>0) && (val<10));
                }
            },

            /**
             * @description The fontfamilies that can be selected<br>
             * Should be a value from 1-9<br>
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1486);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1487);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1499);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1500);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1512);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1513);
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
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1527);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1528);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1540);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1541);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1553);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1554);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1566);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1567);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1579);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1580);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1593);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1594);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1606);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1607);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1619);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1620);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1632);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1633);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1645);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1646);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1658);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1659);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1685);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1686);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1698);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1699);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1711);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1712);
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
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1726);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1727);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button video is available<br>
             * because this code needs to be developed in a better way, the function is disabled by default.<br>
             * It works in a simple way though. The end-user should enter a youtube-link once they click on this button.
             * Default = false
             * @attribute btnVideo
             * @type Boolean
            */
            btnVideo : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1741);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1742);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1898);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1899);
return Lang.isArray(val) ;
                }

            }
        }
    }
);


}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});
