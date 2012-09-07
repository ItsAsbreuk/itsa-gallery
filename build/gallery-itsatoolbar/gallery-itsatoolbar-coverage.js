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
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].code=["YUI.add('gallery-itsatoolbar', function(Y) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module itsa-toolbar"," */","","/**"," * Editor Toolbar Plugin"," * "," *"," * @class Plugin.ITSAToolbar"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","","    ITSA_BTNNODE = \"<button class='yui3-button'></button>\",","    ITSA_BTNINNERNODE = \"<span class='itsa-button-icon'></span>\",","    ITSA_BTNPRESSED = 'yui3-button-active',","    ITSA_BTNACTIVE = 'itsa-button-active',","    ITSA_BTNINDENT = 'itsa-button-indent',","    ITSA_BUTTON = 'itsa-button',","    ITSA_BTNSYNC = 'itsa-syncbutton',","    ITSA_BTNTOGGLE = 'itsa-togglebutton',","    ITSA_BTNGROUP = 'itsa-buttongroup',","    ITSA_BTNCUSTOMFUNC = 'itsa-button-customfunc',","    ITSA_TOOLBAR_TEMPLATE = \"<div class='itsatoolbar'></div>\",","    ITSA_TOOLBAR_SMALL = 'itsa-buttonsize-small',","    ITSA_TOOLBAR_MEDIUM = 'itsa-buttonsize-medium',","    ITSA_CLASSEDITORPART = 'itsatoolbar-editorpart',","    ITSA_SELECTCONTNODE = '<div></div>',","    ITSA_REFNODE = \"<span id='itsatoolbar-ref'></span>\";","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property editor"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @property editorY"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @property editorNode"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @property containerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node.<br>"," * @property toolbarNode"," * @type Y.Node"," */","","/**"," * Used internally to check if the toolbar should still be rendered after the editor is rendered<br>"," * To prevent rendering while it is already unplugged"," * @property _destroyed"," * @type Boolean"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_BOLD"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ITALIC"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDERLINE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_LEFT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_CENTER"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_RIGHT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_JUSTIFY"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUBSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUPERSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_TEXTCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_MARKCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_INDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_OUTDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_REDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_EMAIL"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_HYPERLINK"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_IMAGE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_FILE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_VIDEO"," * @type String"," */","","Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {","","        editor : null,","        editorY : null,","        editorNode : null,","        containerNode : null,","        toolbarNode : null,","        _destroyed : false,","","        ICON_BOLD : 'itsa-icon-bold',","        ICON_ITALIC : 'itsa-icon-italic',","        ICON_UNDERLINE : 'itsa-icon-underline',","        ICON_ALIGN_LEFT : 'itsa-icon-alignleft',","        ICON_ALIGN_CENTER : 'itsa-icon-aligncenter',","        ICON_ALIGN_RIGHT : 'itsa-icon-alignright',","        ICON_ALIGN_JUSTIFY : 'itsa-icon-alignjustify',","        ICON_SUBSCRIPT : 'itsa-icon-subscript',","        ICON_SUPERSCRIPT : 'itsa-icon-superscript',","        ICON_TEXTCOLOR : 'itsa-icon-textcolor',","        ICON_MARKCOLOR : 'itsa-icon-markcolor',","        ICON_INDENT : 'itsa-icon-indent',","        ICON_OUTDENT : 'itsa-icon-outdent',","        ICON_UNORDEREDLIST : 'itsa-icon-unorderedlist',","        ICON_ORDEREDLIST : 'itsa-icon-orderedlist',","        ICON_UNDO : 'itsa-icon-undo',","        ICON_REDO : 'itsa-icon-redo',","        ICON_EMAIL : 'itsa-icon-email',","        ICON_HYPERLINK : 'itsa-icon-hyperlink',","        ICON_IMAGE : 'itsa-icon-image',","        ICON_FILE : 'itsa-icon-file',","        ICON_VIDEO : 'itsa-icon-video',","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance.editor = instance.get('host');","            // need to make sure we can use execCommand, so do not render before the frame exists.","            if (instance.editor.frame && instance.editor.frame.get('node')) {instance._render();}","            else {instance.editor.on('frame:ready', instance._render, instance);}","        },","","        /**","         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.","         * It will invoke renderUI, bindUI and syncUI, just as within a widget.","         *","         * @method _render","         * @private","        */","        _render : function() {","            var instance = this;","            if (!instance._destroyed) {","                instance.editorY = instance.editor.getInstance();","                instance.editorNode = instance.editor.frame.get('node');","                instance.containerNode = instance.editorNode.get('parentNode');","                instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);","                instance.editor.plug(Y.Plugin.ExecCommand);","                instance._defineCustomExecCommands();","                instance._renderUI();","                instance._bindUI();","                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object","                instance._initStatus();","            }","        },","","        /**","         * Sync the toolbar for the first time, during ititialisation<br>","         * We need to do this manually, because there is no nodeChange-event fired by the editor.","         * @method _initStatus","         * @private","        */","        _initStatus : function() {","            // Fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object","            var instance = this;","            instance.toolbarNode.fire('itsatoolbar:statusChange', {changedNode: instance._getCursorRef()});","        },","","        /**","         * Gets or creates a referencenode at cursorposition<br>","         * If no selection was made, a new tmp-node (empty span) will be created to serve as reference.","         * @method _getCursorRef","         * @private","         * @returns {Y.Node} reference to the first node of the selection, or the new created node","        */","        _getCursorRef : function() {","            var instance = this,","                sel,","                out,","                node;","            sel = new instance.editorY.EditorSelection();","            out = sel.getSelected();","            if (!sel.isCollapsed && out.size()) {","                //We have a selection","                node = out.item(0);","            }","            else {","                // insert cursor and use that node as the selected node","                // first remove previous","                instance._removeRefNode();","                node = sel.insertContent(ITSA_REFNODE);","            }","            return node;","        },","","        /**","         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef","         * @method _removeRefNode","         * @private","        */","        _removeRefNode : function() {","            var instance = this,","                node,","                useY;","            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases","            useY = instance.editorY ? instance.editorY : Y;","            node = useY.all('#itsatoolbar-ref');","            if (node) {node.remove();}","        },","","        /**","         * Syncs the toolbar's status with the editor.<br>","         * At this point, it only works internal, because it needs the nodeChange-eventFacade.","         * @method sync","         * @param {EventFacade} e which will be passed when the edtior fires a nodeChange-event","         * @private","        */","        sync : function(e) {","            // syncUI will sync the toolbarstatus with the editors cursorposition","            var instance = this;","            if (e) {","                instance.toolbarNode.fire('itsatoolbar:statusChange', e);","            }","        },","","        /**","         * Creates a new Button on the Toolbar. By default at the end of the toolbar.","         * @method addButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, or you want a custom Function to be executed, you must supply an object:<br>","         * <i>- [command]</i> (String): the execcommand<br>","         * <i>- [value]</i> (String): additional value","         * <i>- [customFunc]</i> (Function): reference to custom function: typicaly, this function will call editorinstance.itstoolbar.execCommand() by itsself","         * <i>- [context]]</i> (instance): the context for customFunc","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addButton : function(iconClass, execCommand, indent, position) {","            var instance = this,","                buttonNode,","                buttonInnerNode;","            buttonNode = Node.create(ITSA_BTNNODE);","            buttonNode.addClass(ITSA_BUTTON);","            if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","            else if (Lang.isObject(execCommand)) {","                if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}","                if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}","                if (Lang.isFunction(execCommand.customFunc)) {","                    buttonNode.addClass(ITSA_BTNCUSTOMFUNC);","                    buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);","                }","            }","            if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}","            buttonInnerNode = Node.create(ITSA_BTNINNERNODE);","            buttonInnerNode.addClass(iconClass);","            buttonNode.append(buttonInnerNode);","            instance.toolbarNode.append(buttonNode);","            return buttonNode;","        },","","        /**","         * Creates a new syncButton on the Toolbar. By default at the end of the toolbar.<br>","         * A syncButton is just like a normal toolbarButton, with the exception that the editor can sync it's status, which cannot be done with a normal button. ","         * Typically used in situations like a hyperlinkbutton: it never stays pressed, but when the cursos is on a hyperlink, he buttons look will change.","         * @method addSyncButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addSyncButton : function(iconClass, execCommand, syncFunc, context, indent, position, isToggleButton) {","            var instance = this,","                buttonNode = instance.addButton(iconClass, execCommand, indent, position);","            if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}","            instance.toolbarNode.addTarget(buttonNode);","            if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","            return buttonNode;","        },","","        /**","         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.","         * @method addToggleButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addToggleButton : function(iconClass, execCommand, syncFunc, context, indent, position) {","            var instance = this,","                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);","            buttonNode.addClass(ITSA_BTNTOGGLE);","            return buttonNode;","        },","","        /**","         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.","         * Position is by default at the end of the toolbar.<br>","         * @method addButtongroup","         * @private","         * @param {Array} buttons Should consist of objects with two fields:<br>","         * <i>- iconClass</i> (String): defines the icon's look. Refer static Properties for some predefined classes like ICON_BOLD.","         * <i>- command</i> (String): the execcommand that will be executed on buttonclick","         * <i>- [value]</i> (String) optional: additional value for the execcommand","         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)","         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the first buttonnode of the created buttongroup","        */","        addButtongroup : function(buttons, indent, position) {","            var instance = this,","                buttonGroup = Y.guid(),","                button,","                buttonNode,","                returnNode = null,","                execCommand,","                i;","            for (i=0; i<buttons.length; i++) {","                button = buttons[i];","                if (button.iconClass && button.command) {","                    if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}","                    else {execCommand = button.command;}","                    buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);","                    buttonNode.addClass(ITSA_BTNGROUP);","                    buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);","                    buttonNode.setData('buttongroup', buttonGroup);","                    instance.toolbarNode.addTarget(buttonNode);","                    if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}","                    if (!returnNode) {returnNode = buttonNode;}","                }","            }","            return returnNode;","        },","","        /**","         * Creates a selectList on the Toolbar. By default at the end of the toolbar.","         * When fired, the event-object returnes with 2 fields:<br>","         * <i>- e.value</i>: value of selected item<br>","         * <i>- e.index</i>: indexnr of the selected item","         * @method addSelectList","         * @private","         * @param {Array} items contains all the items. Should be either a list of (String), or a list of (Objects). In case of an Object-list, the objects should contain two fields:<br>","         * <i>- text</i> (String): the text shown in the selectlist<br>","         * <i>- returnValue</i> (String): the returnvalue of e.value<br>","         * In case a String-list is supplied, e.value will equal to the selected String-item (returnvalue==text)","","         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.exec.command().<br>","         * You could provide a second 'restoreCommand', in case you need a different execCommand to erase some format. In that case you must supply an object with three fields:<br>","         * <i>- command</i> (String): the standard execcommand<br>","         * <i>- restoreCommand</i> (String): the execcommand that will be executed in case e.value equals the restore-value<br>","         * <i>- restoreValue</i> (String): when e.value equals restoreValue, restoreCommand will be used instead of the standard command","","","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Object} [config] Object that will be passed into the selectinstance. Has with the following fields:<br>","         * <i>- listAlignRight</i> (Boolean): whether to rightalign the listitems. Default=false<br>","         * <i>- hideSelected</i> (Boolean): whether the selected item is hidden from the list. Default=false","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.ITSASelectlist} reference to the created object","        */","        addSelectlist : function(items, execCommand, syncFunc, context, indent, config, position) {","            var instance = this,","                selectlist;","            config = Y.merge(config, {items: items, defaultButtonText: ''});","            selectlist = new Y.ITSASelectList(config);","            selectlist.after('render', function(e, execCommand, syncFunc, context, indent){","                var instance = this,","                    selectlist = e.currentTarget,","                    buttonNode = selectlist.buttonNode;","                if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","                else {","                    if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    ","                    if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    ","                    if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    ","                }","                if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}","                instance.toolbarNode.addTarget(buttonNode);","                selectlist.on('selectChange', instance._handleSelectChange, instance);","                if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","                instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);","            }, instance, execCommand, syncFunc, context, indent);","            selectlist.render(instance.toolbarNode);","            return selectlist;","        },","","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this,","                srcNode = instance.get('srcNode');","             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction","            instance._destroyed = true;","            instance._removeRefNode();","            if (instance.toolbarNode) {instance.toolbarNode.remove(true);}","        },","","        // -- Private Methods ----------------------------------------------------------","","        /**","         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode ","         *","         * @method _renderUI","         * @private","        */","        _renderUI : function() {","            var instance = this,","                srcNode = instance.get('srcNode'),","                btnSize = instance.get('btnSize');","            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering","            instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);","            if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}","            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}","            if (srcNode) {","                srcNode.prepend(instance.toolbarNode);","            }","            else {","                instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);","                instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');","                instance.editorNode.insert(instance.toolbarNode, 'before');","            }","            instance._initializeButtons();","        },","        ","        /**","         * Binds events when there is a cursorstatus changes in the editor","         *","         * @method _bindUI","         * @private","        */","        _bindUI : function() {","            var instance = this;","            instance.editor.on('nodeChange', instance.sync, instance);","            instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);","        },","","        /**","         * Defines all custom execCommands","         *","         * @method _defineCustomExecCommands","         * @private","        */","        _defineCustomExecCommands : function() {","            var instance = this;","            instance._defineExecCommandFontSize();","            instance._defineExecCommandHyperlink();","            instance._defineExecCommandMaillink();","            instance._defineExecCommandImage();","            instance._defineExecCommandYouTube();","        },","","        /**","         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)","         *","         * @method _bindUI","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleBtnClick : function(e) {","            var instance = this,","                node = e.currentTarget;","            // only execute for .itsa-button, not for all buttontags    ","            if (node.hasClass(ITSA_BUTTON)) {","                if (node.hasClass(ITSA_BTNTOGGLE)) {","                    node.toggleClass(ITSA_BTNPRESSED);","                }","                else if (node.hasClass(ITSA_BTNSYNC)) {","                    node.toggleClass(ITSA_BTNACTIVE, true);","                }","                else if (node.hasClass(ITSA_BTNGROUP)) {","                    instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);","                    node.toggleClass(ITSA_BTNPRESSED, true);","                }","                if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance.execCommand(node);}","            }","        },","","        /**","         * Executes this.editor.exec.commanc with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>","         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.","         *","         * @method execCommand","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        execCommand : function(buttonNode) {","            var execCommand,","                execValue;","            execCommand = buttonNode.getData('execCommand');","            execValue = buttonNode.getData('execValue');","            this.editor.exec.command(execCommand, execValue);","        },","","        /**","         * Handling the selectChange event of a selectButton","         *","         * @method _handleSelectChange","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleSelectChange : function(e) {","            var selectButtonNode,","                restoreCommand,","                execCommand;","            selectButtonNode = e.currentTarget.buttonNode;","            restoreCommand = selectButtonNode.getData('restoreCommand');","            execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');","            this.editor.exec.command(execCommand, e.value);","        },","","        /**","         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector","         *","         * @method _checkInbetweenSelector","         * @private","         * @param {String} selector The selector to check for","         * @param {String} refContent Should be Y.one('body').getHtml()","         * @param {int} cursorindex Index where the cursor retains","        */","        _checkInbetweenSelector : function(selector, refContent, cursorindex) {","            var instance = this,","                pattern = '<\\s*' + selector + '[^>]*>(.*?)<\\s*/\\s*' + selector  + '>',","                searchHeaderPattern = new RegExp(pattern, 'gi'), ","                fragment, ","                inbetween = false;","            fragment = searchHeaderPattern.exec(refContent);","            while ((fragment !== null) && !inbetween) {","                inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));","                fragment = searchHeaderPattern.exec(refContent); // next search","            }","            return inbetween;","        },","","        /**","         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.","         *","         * @method _initializeButtons","         * @private","        */","        _initializeButtons : function() { ","            var instance = this,","                i, r, g, b,","                item,","                items,","                bgcolor,","                docFontSize,","                bgcolors,","                buttons;","","            // create fonffamily button","            if (instance.get('btnFontfamily')) {","                items = instance.get('fontFamilies');","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    items[i] = {text: \"<span style='font-family:\"+item+\"'>\"+item+\"</span>\", returnValue: item};","                }","                instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {","                    var familyList = e.changedNode.getStyle('fontFamily'),","                        familyListArray = familyList.split(','),","                        activeFamily = familyListArray[0];","                    this.fontSelectlist.selectItemByValue(activeFamily, true, true);","                }, null, true, {buttonWidth: 145});","            }","","            // create fontsize button","            if (instance.get('btnFontsize')) {","                items = [];","                for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}","                instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {","                    var fontSize = e.changedNode.getStyle('fontSize'),","                        fontSizeNumber = parseFloat(fontSize),","                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);","                    // make sure not to display partial numbers    ","                    this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);","                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});","            }","","            // create header button","            if (instance.get('btnHeader')) {","                items = [];","                items.push({text: 'No header', returnValue: 'clear'});","                for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}","                instance.headerSelectlist = instance.addSelectlist(items, {command: 'heading', restoreCommand: 'insertParagraph', restoreValue: 'clear'}, function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        currentHeader,","                        i,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {","                        if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}","                    }","                    if (!currentHeader) {currentHeader=0;}","                    instance.headerSelectlist.selectItem(currentHeader);","                }, null, true, {buttonWidth: 96});","            }","","            // create bold button","            if (instance.get('btnBold')) {","                instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));","                }, null, true);","            }","","            // create italic button","            if (instance.get('btnItalic')) {","                instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));","                });","            }","","            // create underline button","            if (instance.get('btnUnderline')) {","                instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));","                });","            }","","            // create align buttons","            if (instance.get('grpAlign')) {","                buttons = [","                    {","                        iconClass : instance.ICON_ALIGN_LEFT,","                        command : 'JustifyLeft',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_CENTER,","                        command : 'JustifyCenter',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_RIGHT,","                        command : 'JustifyRight',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));","                                    }","                    }","                ];","            // create justify button","                if (instance.get('btnJustify')) {","                    buttons.push({","                        iconClass : instance.ICON_ALIGN_JUSTIFY,","                        command : 'JustifyFull',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));","                                    }","                    });","                }","                instance.addButtongroup(buttons, true);","            }","","            // create subsuperscript buttons","            if (instance.get('grpSubsuper')) {","                instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));","                }, null, true);","                instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));","                });","            }","","            // create textcolor button","            if (instance.get('btnTextcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('color'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.colorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});","            }","","            // create markcolor button","            if (instance.get('btnMarkcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('backgroundColor'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});","            }","","            // create indent buttons","            if (instance.get('grpIndent')) {","                instance.addButton(instance.ICON_INDENT, 'indent', true);","                instance.addButton(instance.ICON_OUTDENT, 'outdent');","            }","","            // create list buttons","            if (instance.get('grpLists')) {","                instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));","                }, null, true);","                instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));","                });","            }","","            // create email button","            if (instance.get('btnEmail')) {","                instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isEmailLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                    if (isLink) {","                        // check if its a normal href or a mailto:","                        while (node && !node.test('a')) {node=node.get('parentNode');}","                        // be carefull: do not === /match() with text, that will fail","                        isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');","                    }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));","                }, null, true);","            }","","            // create hyperlink button","            if (instance.get('btnHyperlink')) {","                instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {","                    var instance = this,","                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isFileLink = false,","                        href,","                        lastDot,","                        fileExt,","                        isHyperLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));","                });","            }","","            // create image button","            if (instance.get('btnImage')) {","                instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));","                });","            }","","            // create video button","            if (instance.get('btnVideo')) {","                instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));","                });","            }","","//************************************************","// just for temporary local use ITS Asbreuk","// should NOT be part of the gallery","            if (false) {","                instance.addSyncButton(","                    instance.ICON_FILE,","                    {   customFunc: function(e) {","                            Y.config.cmas2plus.uploader.show(","                                null, ","                                Y.bind(function(e) {","                                    this.editor.exec.command('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);","                                }, this)","                            );","                        }","                    },","                    function(e) {","                        var instance = this,","                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                            node = e.changedNode,","                            nodePosition,","                            isFileLink = false,","                            isLink,","                            href,","                            lastDot,","                            fileExt,","                            isHyperLink,","                            bodyhtml = instance.editorY.one('body').getHTML();","                        nodePosition = bodyhtml.indexOf(node.getHTML());","                        isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                        e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);","                    }","                );","            }","//************************************************","","            if (instance.get('grpUndoredo')) {","                instance.addButton(instance.ICON_UNDO, 'undo', true);","                instance.addButton(instance.ICON_REDO, 'redo');","            }","","        },","","        /**","        * @private","        * @method _filter_rgb","        * @param String css The CSS string containing rgb(#,#,#);","        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00","        * @return String","        */","        _filter_rgb: function(css) {","            if (css.toLowerCase().indexOf('rgb') != -1) {","                var exp = new RegExp(\"(.*?)rgb\\\\s*?\\\\(\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?\\\\)(.*?)\", \"gi\");","                var rgb = css.replace(exp, \"$1,$2,$3,$4,$5\").split(',');","            ","                if (rgb.length === 5) {","                    var r = parseInt(rgb[1], 10).toString(16);","                    var g = parseInt(rgb[2], 10).toString(16);","                    var b = parseInt(rgb[3], 10).toString(16);","","                    r = r.length === 1 ? '0' + r : r;","                    g = g.length === 1 ? '0' + g : g;","                    b = b.length === 1 ? '0' + b : b;","","                    css = \"#\" + r + g + b;","                }","            }","            return css;","        },","","        /**********************************************************************************************************************","        ***********************************************************************************************************************","","        FUNCTIONS BELOW REALLY NEED TO BE REDISGNED","        THEY DO NOT WORK WELL","","        ***********************************************************************************************************************","        ***********************************************************************************************************************/","","","        /**","        * Defines the execCommand itsafontsize","        * @method _defineExecCommandFontSize","        * @private","        */","        _defineExecCommandFontSize : function() {","            // This function seriously needs redesigned.","            // it does work, but as you can see in the comment, there are some flaws","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                   itsafontsize: function(cmd, val) {","                       var execCommandInstance = this,","                           editorY = execCommandInstance.get('host').getInstance(),","                           sel = new editorY.EditorSelection(),","                           newNodelist;","                       if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {","                           //We have a selection","                            if (Y.UA.webkit) {","                                if (sel.anchorNode.getStyle('lineHeight')) {","                                    sel.anchorNode.setStyle('lineHeight', '');","                                }","                            }","                            // first cleaning up old fontsize","                            // isn't done well !! there might be other tags than <span> that have fontSize declared","                            // And you should not wrap a new <span> when sel === previous <span>","                            sel.anchorNode.all('span').setStyle('fontSize', '');","                            // create new wrapper <span style='font-size: val'>....</span>","                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>","                            // in that case you create a span wrapped on a previous span","                            newNodelist = sel.wrapContent('span');","                            newNodelist.item(0).setStyle('fontSize', val);","                       }","                       else {","                           // Didn't find a way to set the focus yet.... damn...","                           /*","                           sel.setCursor();","                           execCommandInstance.command(\"inserthtml\", \"<span style='font-size:\" + val + \"'></span>\");","                           sel.focusCursor(true, true);","                           */","                       }","                   }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaehyperlink","        * @method _defineExecCommandHyperlink","        * @private","        */","        _defineExecCommandHyperlink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    // val can be:","                    // 'img', 'url', 'video', 'email'","                    itsacreatehyperlink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter url', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url + '\" target=\"_blank\">' + url + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaeemaillink","        * @method _defineExecCommandMaillink","        * @private","        */","        _defineExecCommandMaillink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreatemaillink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            urltext,","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter email', '');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            urltext = url;","                            url = 'mailto:' + url;","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url+ '\">' + urltext + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateimage","        * @method _defineExecCommandImage","        * @private","        */","        _defineExecCommandImage : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateimage: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<img src=\"' + url + '\" />');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateyoutube","        * @method _defineExecCommandYouTube","        * @private","        */","        _defineExecCommandYouTube : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateyoutube: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (a && Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                    videoitempos = url.indexOf('watch?v=');","                                    if (videoitempos!==-1) {","                                        videoitem = url.substring(url.videoitempos+8);","                                        execCommandInstance.get('host').execCommand('inserthtml', '<iframe width=\"420\" height=\"315\" src=\"http://www.youtube.com/embed/' + videoitem + '\" frameborder=\"0\" allowfullscreen></iframe>');","                                    }","                            }","                        }","                        return a;","                    }","                });","            }","        }","","    }, {","        NS : 'itsatoolbar',","        ATTRS : {","","            /**","             * @description Defines whether keyboard-enter will lead to P-tag. Default=false (meaning that BR's will be created)","             * @attribute paraSupport","             * @type Boolean","            */","            paraSupport : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The sourceNode that holds the Toolbar. Could be an empty DIV.<br>","             * If not defined, than the Toolbar will be created just above the Editor.","             * By specifying the srcNode, one could create the Toolbar on top of the page, regardless of the Editor's position","             * @attribute srcNode","             * @type Y.Node ","            */","            srcNode : {","                value: null,","                writeOnce: 'initOnly',","                setter: function(val) {","                    return Y.one(val);","                },","                validator: function(val) {","                    return Y.one(val);","                }","            },","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 2,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description The amount of headerlevels that can be selected<br>","             * Should be a value from 1-9<br>","             * Default = 6","             * @attribute headerLevels","             * @type int","            */","            headerLevels : {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<10));","                }","            },","","            /**","             * @description The fontfamilies that can be selected<br>","             * Should be a value from 1-9<br>","             * @attribute fontFamilies","             * @type Array [String]","            */","            fontFamilies : {","                value: [","                    'Arial',","                    'Arial Black',","                    'Comic Sans MS',","                    'Courier New',","                    'Lucida Console',","                    'Tahoma',","                    'Times New Roman',","                    'Trebuchet MS',","                    'Verdana'","                ],","                validator: function(val) {","                    return (Lang.isArray(val));","                }","            },","","            /**","             * @description Whether the button fontfamily is available<br>","             * Default = true","             * @attribute btnFontfamily","             * @type Boolean","            */","            btnFontfamily : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button fontsize is available<br>","             * Default = true","             * @attribute btnFontsize","             * @type Boolean","            */","            btnFontsize : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button headers is available<br>","             * because this function doesn't work well on all browsers, it is set of by default.<br>","             * Is something to work on in fututr releases. It works within firefox though.","             * Default = false","             * @attribute btnHeader","             * @type Boolean","            */","            btnHeader : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button bold is available<br>","             * Default = true","             * @attribute btnBold","             * @type Boolean","            */","            btnBold : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button italic is available<br>","             * Default = true","             * @attribute btnItalic","             * @type Boolean","            */","            btnItalic : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button underline is available<br>","             * Default = true","             * @attribute btnUnderline","             * @type Boolean","            */","            btnUnderline : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group align is available<br>","             * Default = true","             * @attribute grpAlign","             * @type Boolean","            */","            grpAlign : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button justify is available<br>","             * will only be shown in combination with grpalign","             * Default = true","             * @attribute btnJustify","             * @type Boolean","            */","            btnJustify : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group sub/superscript is available<br>","             * Default = true","             * @attribute grpSubsuper","             * @type Boolean","            */","            grpSubsuper : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button textcolor is available<br>","             * Default = true","             * @attribute btnTextcolor","             * @type Boolean","            */","            btnTextcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button markcolor is available<br>","             * Default = true","             * @attribute btnMarkcolor","             * @type Boolean","            */","            btnMarkcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group indent is available<br>","             * Default = true","             * @attribute grpIndent","             * @type Boolean","            */","            grpIndent : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group lists is available<br>","             * Default = true","             * @attribute grpLists","             * @type Boolean","            */","            grpLists : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","/*","            btnremoveformat : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","            btnhiddenelements : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","*/","","            /**","             * @description Whether the group undo/redo is available<br>","             * Default = true","             * @attribute grpUndoredo","             * @type Boolean","            */","            grpUndoredo : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button email is available<br>","             * Default = true","             * @attribute btnEmail","             * @type Boolean","            */","            btnEmail : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button hyperlink is available<br>","             * Default = true","             * @attribute btnHyperlink","             * @type Boolean","            */","            btnHyperlink : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button image is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though.","             * Default = false","             * @attribute btnImage","             * @type Boolean","            */","            btnImage : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button video is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though. The end-user should enter a youtube-link once they click on this button.","             * Default = false","             * @attribute btnVideo","             * @type Boolean","            */","            btnVideo : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The colorpallet to use<br>","             * @attribute colorPallet","             * @type Array (String)","            */","            colorPallet : {","                value : [","                    '#111111',","                    '#2D2D2D',","                    '#434343',","                    '#5B5B5B',","                    '#737373',","                    '#8B8B8B',","                    '#A2A2A2',","                    '#B9B9B9',","                    '#000000',","                    '#D0D0D0',","                    '#E6E6E6',","                    '#FFFFFF',","                    '#BFBF00',","                    '#FFFF00',","                    '#FFFF40',","                    '#FFFF80',","                    '#FFFFBF',","                    '#525330',","                    '#898A49',","                    '#AEA945',","                    '#7F7F00',","                    '#C3BE71',","                    '#E0DCAA',","                    '#FCFAE1',","                    '#60BF00',","                    '#80FF00',","                    '#A0FF40',","                    '#C0FF80',","                    '#DFFFBF',","                    '#3B5738',","                    '#668F5A',","                    '#7F9757',","                    '#407F00',","                    '#8A9B55',","                    '#B7C296',","                    '#E6EBD5',","                    '#00BF00',","                    '#00FF80',","                    '#40FFA0',","                    '#80FFC0',","                    '#BFFFDF',","                    '#033D21',","                    '#438059',","                    '#7FA37C',","                    '#007F40',","                    '#8DAE94',","                    '#ACC6B5',","                    '#DDEBE2',","                    '#00BFBF',","                    '#00FFFF',","                    '#40FFFF',","                    '#80FFFF',","                    '#BFFFFF',","                    '#033D3D',","                    '#347D7E',","                    '#609A9F',","                    '#007F7F',","                    '#96BDC4',","                    '#B5D1D7',","                    '#E2F1F4',","                    '#0060BF',","                    '#0080FF',","                    '#40A0FF',","                    '#80C0FF',","                    '#BFDFFF',","                    '#1B2C48',","                    '#385376',","                    '#57708F',","                    '#00407F',","                    '#7792AC',","                    '#A8BED1',","                    '#DEEBF6',","                    '#0000BF',","                    '#0000FF',","                    '#4040FF',","                    '#8080FF',","                    '#BFBFFF',","                    '#212143',","                    '#373E68',","                    '#444F75',","                    '#00007F',","                    '#585E82',","                    '#8687A4',","                    '#D2D1E1',","                    '#6000BF',","                    '#8000FF',","                    '#A040FF',","                    '#C080FF',","                    '#DFBFFF',","                    '#302449',","                    '#54466F',","                    '#655A7F',","                    '#40007F',","                    '#726284',","                    '#9E8FA9',","                    '#DCD1DF',","                    '#BF00BF',","                    '#FF00FF',","                    '#FF40FF',","                    '#FF80FF',","                    '#FFBFFF',","                    '#4A234A',","                    '#794A72',","                    '#936386',","                    '#7F007F',","                    '#9D7292',","                    '#C0A0B6',","                    '#ECDAE5',","                    '#BF005F',","                    '#FF007F',","                    '#FF409F',","                    '#FF80BF',","                    '#FFBFDF',","                    '#451528',","                    '#823857',","                    '#A94A76',","                    '#7F003F',","                    '#BC6F95',","                    '#D8A5BB',","                    '#F7DDE9',","                    '#C00000',","                    '#FF0000',","                    '#FF4040',","                    '#FF8080',","                    '#FFC0C0',","                    '#441415',","                    '#82393C',","                    '#AA4D4E',","                    '#800000',","                    '#BC6E6E',","                    '#D8A3A4',","                    '#F8DDDD',","                    '#BF5F00',","                    '#FF7F00',","                    '#FF9F40',","                    '#FFBF80',","                    '#FFDFBF',","                    '#482C1B',","                    '#855A40',","                    '#B27C51',","                    '#7F3F00',","                    '#C49B71',","                    '#E1C4A8',","                    '#FDEEE0'","                ],","                validator: function(val) {","                    return Lang.isArray(val) ;","                }","","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].lines = {"1":0,"3":0,"24":0,"238":0,"277":0,"278":0,"280":0,"292":0,"293":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"300":0,"301":0,"303":0,"315":0,"316":0,"327":0,"331":0,"332":0,"333":0,"335":0,"340":0,"341":0,"343":0,"352":0,"356":0,"357":0,"358":0,"370":0,"371":0,"372":0,"392":0,"395":0,"396":0,"397":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"406":0,"407":0,"408":0,"409":0,"410":0,"411":0,"434":0,"436":0,"437":0,"438":0,"439":0,"460":0,"462":0,"463":0,"482":0,"489":0,"490":0,"491":0,"492":0,"494":0,"495":0,"496":0,"497":0,"498":0,"499":0,"500":0,"503":0,"535":0,"537":0,"538":0,"539":0,"540":0,"543":0,"545":0,"546":0,"547":0,"549":0,"550":0,"551":0,"552":0,"553":0,"555":0,"556":0,"566":0,"569":0,"570":0,"571":0,"583":0,"587":0,"588":0,"590":0,"591":0,"594":0,"595":0,"596":0,"598":0,"608":0,"609":0,"610":0,"620":0,"621":0,"622":0,"623":0,"624":0,"625":0,"636":0,"639":0,"640":0,"641":0,"643":0,"644":0,"646":0,"647":0,"648":0,"650":0,"663":0,"665":0,"666":0,"667":0,"678":0,"681":0,"682":0,"683":0,"684":0,"697":0,"702":0,"703":0,"704":0,"705":0,"707":0,"717":0,"727":0,"728":0,"729":0,"730":0,"731":0,"733":0,"734":0,"737":0,"742":0,"743":0,"744":0,"745":0,"746":0,"750":0,"755":0,"756":0,"757":0,"758":0,"759":0,"760":0,"766":0,"767":0,"768":0,"770":0,"771":0,"776":0,"777":0,"778":0,"783":0,"784":0,"785":0,"790":0,"791":0,"792":0,"797":0,"798":0,"804":0,"812":0,"820":0,"825":0,"826":0,"831":0,"835":0,"839":0,"840":0,"841":0,"843":0,"844":0,"849":0,"850":0,"851":0,"852":0,"853":0,"854":0,"856":0,"857":0,"860":0,"865":0,"866":0,"867":0,"868":0,"869":0,"870":0,"872":0,"873":0,"876":0,"881":0,"882":0,"883":0,"887":0,"888":0,"889":0,"893":0,"894":0,"896":0,"897":0,"901":0,"902":0,"907":0,"908":0,"909":0,"915":0,"916":0,"917":0,"919":0,"921":0,"923":0,"928":0,"929":0,"930":0,"941":0,"942":0,"943":0,"945":0,"947":0,"948":0,"949":0,"950":0,"951":0,"952":0,"953":0,"957":0,"962":0,"963":0,"964":0,"969":0,"970":0,"971":0,"978":0,"979":0,"982":0,"985":0,"991":0,"1002":0,"1003":0,"1004":0,"1006":0,"1008":0,"1009":0,"1010":0,"1011":0,"1012":0,"1013":0,"1014":0,"1018":0,"1024":0,"1025":0,"1026":0,"1039":0,"1040":0,"1041":0,"1043":0,"1044":0,"1045":0,"1046":0,"1048":0,"1049":0,"1050":0,"1052":0,"1055":0,"1076":0,"1077":0,"1079":0,"1083":0,"1085":0,"1086":0,"1087":0,"1093":0,"1097":0,"1098":0,"1119":0,"1120":0,"1124":0,"1133":0,"1134":0,"1135":0,"1136":0,"1137":0,"1138":0,"1139":0,"1140":0,"1141":0,"1142":0,"1143":0,"1145":0,"1146":0,"1147":0,"1149":0,"1150":0,"1151":0,"1152":0,"1158":0,"1161":0,"1173":0,"1174":0,"1176":0,"1186":0,"1187":0,"1188":0,"1189":0,"1190":0,"1191":0,"1192":0,"1193":0,"1194":0,"1195":0,"1196":0,"1197":0,"1198":0,"1200":0,"1201":0,"1202":0,"1204":0,"1205":0,"1206":0,"1207":0,"1213":0,"1216":0,"1228":0,"1229":0,"1231":0,"1240":0,"1241":0,"1242":0,"1243":0,"1244":0,"1245":0,"1246":0,"1247":0,"1248":0,"1249":0,"1250":0,"1252":0,"1253":0,"1254":0,"1256":0,"1257":0,"1258":0,"1259":0,"1265":0,"1268":0,"1280":0,"1281":0,"1283":0,"1292":0,"1293":0,"1294":0,"1295":0,"1296":0,"1297":0,"1298":0,"1299":0,"1300":0,"1301":0,"1302":0,"1304":0,"1305":0,"1306":0,"1308":0,"1309":0,"1310":0,"1311":0,"1317":0,"1318":0,"1319":0,"1320":0,"1324":0,"1342":0,"1357":0,"1360":0,"1374":0,"1388":0,"1411":0,"1424":0,"1437":0,"1452":0,"1465":0,"1478":0,"1491":0,"1504":0,"1518":0,"1531":0,"1544":0,"1557":0,"1570":0,"1583":0,"1610":0,"1623":0,"1636":0,"1651":0,"1666":0,"1823":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].functions = {"initializer:276":0,"_render:291":0,"_initStatus:313":0,"_getCursorRef:326":0,"_removeRefNode:351":0,"sync:368":0,"addButton:391":0,"addSyncButton:433":0,"addToggleButton:459":0,"addButtongroup:481":0,"(anonymous 2):539":0,"addSelectlist:534":0,"destructor:565":0,"_renderUI:582":0,"_bindUI:607":0,"_defineCustomExecCommands:619":0,"_handleBtnClick:635":0,"execCommand:662":0,"_handleSelectChange:677":0,"_checkInbetweenSelector:696":0,"(anonymous 3):733":0,"(anonymous 4):745":0,"(anonymous 5):759":0,"(anonymous 6):777":0,"(anonymous 7):784":0,"(anonymous 8):791":0,"syncFunc:803":0,"syncFunc:811":0,"syncFunc:819":0,"syncFunc:830":0,"(anonymous 9):840":0,"(anonymous 10):843":0,"(anonymous 11):856":0,"(anonymous 12):872":0,"(anonymous 13):888":0,"(anonymous 14):896":0,"(anonymous 15):908":0,"(anonymous 16):929":0,"(anonymous 17):963":0,"(anonymous 18):970":0,"(anonymous 19):984":0,"customFunc:981":0,"(anonymous 20):990":0,"_initializeButtons:716":0,"_filter_rgb:1038":0,"itsafontsize:1078":0,"_defineExecCommandFontSize:1073":0,"itsacreatehyperlink:1123":0,"_defineExecCommandHyperlink:1118":0,"itsacreatemaillink:1175":0,"_defineExecCommandMaillink:1172":0,"itsacreateimage:1230":0,"_defineExecCommandImage:1227":0,"itsacreateyoutube:1282":0,"_defineExecCommandYouTube:1279":0,"validator:1341":0,"setter:1356":0,"validator:1359":0,"validator:1373":0,"validator:1387":0,"validator:1410":0,"validator:1423":0,"validator:1436":0,"validator:1451":0,"validator:1464":0,"validator:1477":0,"validator:1490":0,"validator:1503":0,"validator:1517":0,"validator:1530":0,"validator:1543":0,"validator:1556":0,"validator:1569":0,"validator:1582":0,"validator:1609":0,"validator:1622":0,"validator:1635":0,"validator:1650":0,"validator:1665":0,"validator:1822":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredLines = 408;
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredFunctions = 81;
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
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 303);
instance._initStatus();
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initStatus", 313);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 315);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 316);
instance.toolbarNode.fire('itsatoolbar:statusChange', {changedNode: instance._getCursorRef()});
        },

        /**
         * Gets or creates a referencenode at cursorposition<br>
         * If no selection was made, a new tmp-node (empty span) will be created to serve as reference.
         * @method _getCursorRef
         * @private
         * @returns {Y.Node} reference to the first node of the selection, or the new created node
        */
        _getCursorRef : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_getCursorRef", 326);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 327);
var instance = this,
                sel,
                out,
                node;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 331);
sel = new instance.editorY.EditorSelection();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 332);
out = sel.getSelected();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 333);
if (!sel.isCollapsed && out.size()) {
                //We have a selection
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 335);
node = out.item(0);
            }
            else {
                // insert cursor and use that node as the selected node
                // first remove previous
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 340);
instance._removeRefNode();
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 341);
node = sel.insertContent(ITSA_REFNODE);
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 343);
return node;
        },

        /**
         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef
         * @method _removeRefNode
         * @private
        */
        _removeRefNode : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_removeRefNode", 351);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 352);
var instance = this,
                node,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 356);
useY = instance.editorY ? instance.editorY : Y;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 357);
node = useY.all('#itsatoolbar-ref');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 358);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "sync", 368);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 370);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 371);
if (e) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 372);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButton", 391);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 392);
var instance = this,
                buttonNode,
                buttonInnerNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 395);
buttonNode = Node.create(ITSA_BTNNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 396);
buttonNode.addClass(ITSA_BUTTON);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 397);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
            else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 398);
if (Lang.isObject(execCommand)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 399);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 400);
if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 401);
if (Lang.isFunction(execCommand.customFunc)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 402);
buttonNode.addClass(ITSA_BTNCUSTOMFUNC);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 403);
buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);
                }
            }}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 406);
if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 407);
buttonInnerNode = Node.create(ITSA_BTNINNERNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 408);
buttonInnerNode.addClass(iconClass);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 409);
buttonNode.append(buttonInnerNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 410);
instance.toolbarNode.append(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 411);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSyncButton", 433);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 434);
var instance = this,
                buttonNode = instance.addButton(iconClass, execCommand, indent, position);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 436);
if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 437);
instance.toolbarNode.addTarget(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 438);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 439);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addToggleButton", 459);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 460);
var instance = this,
                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 462);
buttonNode.addClass(ITSA_BTNTOGGLE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 463);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButtongroup", 481);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 482);
var instance = this,
                buttonGroup = Y.guid(),
                button,
                buttonNode,
                returnNode = null,
                execCommand,
                i;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 489);
for (i=0; i<buttons.length; i++) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 490);
button = buttons[i];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 491);
if (button.iconClass && button.command) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 492);
if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}
                    else {execCommand = button.command;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 494);
buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 495);
buttonNode.addClass(ITSA_BTNGROUP);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 496);
buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 497);
buttonNode.setData('buttongroup', buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 498);
instance.toolbarNode.addTarget(buttonNode);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 499);
if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 500);
if (!returnNode) {returnNode = buttonNode;}
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 503);
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

         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.exec.command().<br>
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSelectlist", 534);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 535);
var instance = this,
                selectlist;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 537);
config = Y.merge(config, {items: items, defaultButtonText: ''});
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 538);
selectlist = new Y.ITSASelectList(config);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 539);
selectlist.after('render', function(e, execCommand, syncFunc, context, indent){
                _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 2)", 539);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 540);
var instance = this,
                    selectlist = e.currentTarget,
                    buttonNode = selectlist.buttonNode;
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 543);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
                else {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 545);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 546);
if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 547);
if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 549);
if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 550);
instance.toolbarNode.addTarget(buttonNode);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 551);
selectlist.on('selectChange', instance._handleSelectChange, instance);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 552);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 553);
instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);
            }, instance, execCommand, syncFunc, context, indent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 555);
selectlist.render(instance.toolbarNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 556);
return selectlist;
        },


        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "destructor", 565);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 566);
var instance = this,
                srcNode = instance.get('srcNode');
             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 569);
instance._destroyed = true;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 570);
instance._removeRefNode();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 571);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_renderUI", 582);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 583);
var instance = this,
                srcNode = instance.get('srcNode'),
                btnSize = instance.get('btnSize');
            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 587);
instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 588);
if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}
            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 590);
if (srcNode) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 591);
srcNode.prepend(instance.toolbarNode);
            }
            else {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 594);
instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 595);
instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 596);
instance.editorNode.insert(instance.toolbarNode, 'before');
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 598);
instance._initializeButtons();
        },
        
        /**
         * Binds events when there is a cursorstatus changes in the editor
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_bindUI", 607);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 608);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 609);
instance.editor.on('nodeChange', instance.sync, instance);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 610);
instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);
        },

        /**
         * Defines all custom execCommands
         *
         * @method _defineCustomExecCommands
         * @private
        */
        _defineCustomExecCommands : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineCustomExecCommands", 619);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 620);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 621);
instance._defineExecCommandFontSize();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 622);
instance._defineExecCommandHyperlink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 623);
instance._defineExecCommandMaillink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 624);
instance._defineExecCommandImage();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 625);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleBtnClick", 635);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 636);
var instance = this,
                node = e.currentTarget;
            // only execute for .itsa-button, not for all buttontags    
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 639);
if (node.hasClass(ITSA_BUTTON)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 640);
if (node.hasClass(ITSA_BTNTOGGLE)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 641);
node.toggleClass(ITSA_BTNPRESSED);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 643);
if (node.hasClass(ITSA_BTNSYNC)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 644);
node.toggleClass(ITSA_BTNACTIVE, true);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 646);
if (node.hasClass(ITSA_BTNGROUP)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 647);
instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 648);
node.toggleClass(ITSA_BTNPRESSED, true);
                }}}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 650);
if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance.execCommand(node);}
            }
        },

        /**
         * Executes this.editor.exec.commanc with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>
         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.
         *
         * @method execCommand
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        execCommand : function(buttonNode) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "execCommand", 662);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 663);
var execCommand,
                execValue;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 665);
execCommand = buttonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 666);
execValue = buttonNode.getData('execValue');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 667);
this.editor.exec.command(execCommand, execValue);
        },

        /**
         * Handling the selectChange event of a selectButton
         *
         * @method _handleSelectChange
         * @private
         * @param {EventFacade} e in case of selectList, e.value and e.index are also available
        */
        _handleSelectChange : function(e) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleSelectChange", 677);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 678);
var selectButtonNode,
                restoreCommand,
                execCommand;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 681);
selectButtonNode = e.currentTarget.buttonNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 682);
restoreCommand = selectButtonNode.getData('restoreCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 683);
execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 684);
this.editor.exec.command(execCommand, e.value);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_checkInbetweenSelector", 696);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 697);
var instance = this,
                pattern = '<\s*' + selector + '[^>]*>(.*?)<\s*/\s*' + selector  + '>',
                searchHeaderPattern = new RegExp(pattern, 'gi'), 
                fragment, 
                inbetween = false;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 702);
fragment = searchHeaderPattern.exec(refContent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 703);
while ((fragment !== null) && !inbetween) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 704);
inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 705);
fragment = searchHeaderPattern.exec(refContent); // next search
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 707);
return inbetween;
        },

        /**
         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.
         *
         * @method _initializeButtons
         * @private
        */
        _initializeButtons : function() { 
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initializeButtons", 716);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 717);
var instance = this,
                i, r, g, b,
                item,
                items,
                bgcolor,
                docFontSize,
                bgcolors,
                buttons;

            // create fonffamily button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 727);
if (instance.get('btnFontfamily')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 728);
items = instance.get('fontFamilies');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 729);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 730);
item = items[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 731);
items[i] = {text: "<span style='font-family:"+item+"'>"+item+"</span>", returnValue: item};
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 733);
instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 3)", 733);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 734);
var familyList = e.changedNode.getStyle('fontFamily'),
                        familyListArray = familyList.split(','),
                        activeFamily = familyListArray[0];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 737);
this.fontSelectlist.selectItemByValue(activeFamily, true, true);
                }, null, true, {buttonWidth: 145});
            }

            // create fontsize button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 742);
if (instance.get('btnFontsize')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 743);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 744);
for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 745);
instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 4)", 745);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 746);
var fontSize = e.changedNode.getStyle('fontSize'),
                        fontSizeNumber = parseFloat(fontSize),
                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);
                    // make sure not to display partial numbers    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 750);
this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);
                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});
            }

            // create header button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 755);
if (instance.get('btnHeader')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 756);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 757);
items.push({text: 'No header', returnValue: 'clear'});
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 758);
for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 759);
instance.headerSelectlist = instance.addSelectlist(items, {command: 'heading', restoreCommand: 'insertParagraph', restoreValue: 'clear'}, function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 5)", 759);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 760);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        currentHeader,
                        i,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 766);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 767);
for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 768);
if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 770);
if (!currentHeader) {currentHeader=0;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 771);
instance.headerSelectlist.selectItem(currentHeader);
                }, null, true, {buttonWidth: 96});
            }

            // create bold button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 776);
if (instance.get('btnBold')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 777);
instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 6)", 777);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 778);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));
                }, null, true);
            }

            // create italic button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 783);
if (instance.get('btnItalic')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 784);
instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 7)", 784);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 785);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));
                });
            }

            // create underline button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 790);
if (instance.get('btnUnderline')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 791);
instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 8)", 791);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 792);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));
                });
            }

            // create align buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 797);
if (instance.get('grpAlign')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 798);
buttons = [
                    {
                        iconClass : instance.ICON_ALIGN_LEFT,
                        command : 'JustifyLeft',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 803);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 804);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_CENTER,
                        command : 'JustifyCenter',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 811);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 812);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_RIGHT,
                        command : 'JustifyRight',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 819);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 820);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));
                                    }
                    }
                ];
            // create justify button
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 825);
if (instance.get('btnJustify')) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 826);
buttons.push({
                        iconClass : instance.ICON_ALIGN_JUSTIFY,
                        command : 'JustifyFull',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 830);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 831);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));
                                    }
                    });
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 835);
instance.addButtongroup(buttons, true);
            }

            // create subsuperscript buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 839);
if (instance.get('grpSubsuper')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 840);
instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 9)", 840);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 841);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 843);
instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 10)", 843);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 844);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));
                });
            }

            // create textcolor button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 849);
if (instance.get('btnTextcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 850);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 851);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 852);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 853);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 854);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 856);
instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 11)", 856);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 857);
var instance = this,
                        styleColor = e.changedNode.getStyle('color'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 860);
instance.colorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});
            }

            // create markcolor button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 865);
if (instance.get('btnMarkcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 866);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 867);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 868);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 869);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 870);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 872);
instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 12)", 872);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 873);
var instance = this,
                        styleColor = e.changedNode.getStyle('backgroundColor'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 876);
instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});
            }

            // create indent buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 881);
if (instance.get('grpIndent')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 882);
instance.addButton(instance.ICON_INDENT, 'indent', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 883);
instance.addButton(instance.ICON_OUTDENT, 'outdent');
            }

            // create list buttons
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 887);
if (instance.get('grpLists')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 888);
instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 13)", 888);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 889);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 893);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 894);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 896);
instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 14)", 896);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 897);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 901);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 902);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));
                });
            }

            // create email button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 907);
if (instance.get('btnEmail')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 908);
instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 15)", 908);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 909);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isEmailLink,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 915);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 916);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 917);
if (isLink) {
                        // check if its a normal href or a mailto:
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 919);
while (node && !node.test('a')) {node=node.get('parentNode');}
                        // be carefull: do not === /match() with text, that will fail
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 921);
isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 923);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));
                }, null, true);
            }

            // create hyperlink button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 928);
if (instance.get('btnHyperlink')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 929);
instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 16)", 929);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 930);
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
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 941);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 942);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 943);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 945);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 947);
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 948);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 949);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 950);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 951);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 952);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 953);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 957);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));
                });
            }

            // create image button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 962);
if (instance.get('btnImage')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 963);
instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 17)", 963);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 964);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));
                });
            }

            // create video button
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 969);
if (instance.get('btnVideo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 970);
instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 18)", 970);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 971);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));
                });
            }

//************************************************
// just for temporary local use ITS Asbreuk
// should NOT be part of the gallery
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 978);
if (false) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 979);
instance.addSyncButton(
                    instance.ICON_FILE,
                    {   customFunc: function(e) {
                            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "customFunc", 981);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 982);
Y.config.cmas2plus.uploader.show(
                                null, 
                                Y.bind(function(e) {
                                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 19)", 984);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 985);
this.editor.exec.command('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);
                                }, this)
                            );
                        }
                    },
                    function(e) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 20)", 990);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 991);
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
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1002);
nodePosition = bodyhtml.indexOf(node.getHTML());
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1003);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1004);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1006);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1008);
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1009);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1010);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1011);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1012);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1013);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1014);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1018);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);
                    }
                );
            }
//************************************************

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1024);
if (instance.get('grpUndoredo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1025);
instance.addButton(instance.ICON_UNDO, 'undo', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1026);
instance.addButton(instance.ICON_REDO, 'redo');
            }

        },

        /**
        * @private
        * @method _filter_rgb
        * @param String css The CSS string containing rgb(#,#,#);
        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00
        * @return String
        */
        _filter_rgb: function(css) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_filter_rgb", 1038);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1039);
if (css.toLowerCase().indexOf('rgb') != -1) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1040);
var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi");
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1041);
var rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(',');
            
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1043);
if (rgb.length === 5) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1044);
var r = parseInt(rgb[1], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1045);
var g = parseInt(rgb[2], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1046);
var b = parseInt(rgb[3], 10).toString(16);

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1048);
r = r.length === 1 ? '0' + r : r;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1049);
g = g.length === 1 ? '0' + g : g;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1050);
b = b.length === 1 ? '0' + b : b;

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1052);
css = "#" + r + g + b;
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1055);
return css;
        },

        /**********************************************************************************************************************
        ***********************************************************************************************************************

        FUNCTIONS BELOW REALLY NEED TO BE REDISGNED
        THEY DO NOT WORK WELL

        ***********************************************************************************************************************
        ***********************************************************************************************************************/


        /**
        * Defines the execCommand itsafontsize
        * @method _defineExecCommandFontSize
        * @private
        */
        _defineExecCommandFontSize : function() {
            // This function seriously needs redesigned.
            // it does work, but as you can see in the comment, there are some flaws
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontSize", 1073);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1076);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1077);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                   itsafontsize: function(cmd, val) {
                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontsize", 1078);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1079);
var execCommandInstance = this,
                           editorY = execCommandInstance.get('host').getInstance(),
                           sel = new editorY.EditorSelection(),
                           newNodelist;
                       _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1083);
if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {
                           //We have a selection
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1085);
if (Y.UA.webkit) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1086);
if (sel.anchorNode.getStyle('lineHeight')) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1087);
sel.anchorNode.setStyle('lineHeight', '');
                                }
                            }
                            // first cleaning up old fontsize
                            // isn't done well !! there might be other tags than <span> that have fontSize declared
                            // And you should not wrap a new <span> when sel === previous <span>
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1093);
sel.anchorNode.all('span').setStyle('fontSize', '');
                            // create new wrapper <span style='font-size: val'>....</span>
                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>
                            // in that case you create a span wrapped on a previous span
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1097);
newNodelist = sel.wrapContent('span');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1098);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandHyperlink", 1118);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1119);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1120);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsacreatehyperlink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatehyperlink", 1123);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1124);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1133);
url = val || prompt('Enter url', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1134);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1135);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1136);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1137);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1138);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1139);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1140);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1141);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1142);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1143);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1145);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1146);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1147);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1149);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1150);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1151);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1152);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1158);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url + '" target="_blank">' + url + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1161);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandMaillink", 1172);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1173);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1174);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreatemaillink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatemaillink", 1175);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1176);
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
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1186);
url = val || prompt('Enter email', '');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1187);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1188);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1189);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1190);
urltext = url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1191);
url = 'mailto:' + url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1192);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1193);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1194);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1195);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1196);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1197);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1198);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1200);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1201);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1202);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1204);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1205);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1206);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1207);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1213);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url+ '">' + urltext + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1216);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandImage", 1227);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1228);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1229);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateimage: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateimage", 1230);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1231);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1240);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1241);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1242);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1243);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1244);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1245);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1246);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1247);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1248);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1249);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1250);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1252);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1253);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1254);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1256);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1257);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1258);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1259);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1265);
execCommandInstance.get('host').execCommand('inserthtml', '<img src="' + url + '" />');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1268);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandYouTube", 1279);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1280);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1281);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateyoutube: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateyoutube", 1282);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1283);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1292);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1293);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1294);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1295);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1296);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1297);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1298);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1299);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1300);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1301);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1302);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1304);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1305);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1306);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1308);
if (a && Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1309);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1310);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1311);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1317);
videoitempos = url.indexOf('watch?v=');
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1318);
if (videoitempos!==-1) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1319);
videoitem = url.substring(url.videoitempos+8);
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1320);
execCommandInstance.get('host').execCommand('inserthtml', '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + videoitem + '" frameborder="0" allowfullscreen></iframe>');
                                    }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1324);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1341);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1342);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "setter", 1356);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1357);
return Y.one(val);
                },
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1359);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1360);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1373);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1374);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1387);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1388);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1410);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1411);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1423);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1424);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1436);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1437);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1451);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1452);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1464);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1465);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1477);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1478);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1490);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1491);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1503);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1504);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1517);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1518);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1530);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1531);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1543);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1544);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1556);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1557);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1569);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1570);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1582);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1583);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1609);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1610);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1622);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1623);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1635);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1636);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1650);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1651);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1665);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1666);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1822);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1823);
return Lang.isArray(val) ;
                }

            }
        }
    }
);


}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});
