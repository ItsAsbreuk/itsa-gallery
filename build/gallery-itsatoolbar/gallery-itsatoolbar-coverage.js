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
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].code=["YUI.add('gallery-itsatoolbar', function(Y) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module itsa-toolbar"," */","","/**"," * Editor Toolbar Plugin"," * "," *"," * @class Plugin.ITSAToolbar"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","","    ITSA_BTNNODE = \"<button class='yui3-button'></button>\",","    ITSA_BTNINNERNODE = \"<span class='itsa-button-icon'></span>\",","    ITSA_BTNPRESSED = 'yui3-button-active',","    ITSA_BTNACTIVE = 'itsa-button-active',","    ITSA_BTNINDENT = 'itsa-button-indent',","    ITSA_BUTTON = 'itsa-button',","    ITSA_BTNSYNC = 'itsa-syncbutton',","    ITSA_BTNTOGGLE = 'itsa-togglebutton',","    ITSA_BTNGROUP = 'itsa-buttongroup',","    ITSA_BTNCUSTOMFUNC = 'itsa-button-customfunc',","    ITSA_TOOLBAR_TEMPLATE = \"<div class='itsatoolbar'></div>\",","    ITSA_TOOLBAR_SMALL = 'itsa-buttonsize-small',","    ITSA_TOOLBAR_MEDIUM = 'itsa-buttonsize-medium',","    ITSA_CLASSEDITORPART = 'itsatoolbar-editorpart',","    ITSA_SELECTCONTNODE = '<div></div>';","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property editor"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @property editorY"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @property editorNode"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @property containerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node.<br>"," * @property toolbarNode"," * @type Y.Node"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_BOLD"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ITALIC"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDERLINE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_LEFT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_CENTER"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_RIGHT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ALIGN_JUSTIFY"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUBSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_SUPERSCRIPT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_TEXTCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_MARKCOLOR"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_INDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_OUTDENT"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_ORDEREDLIST"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_UNDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_REDO"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_EMAIL"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_HYPERLINK"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_IMAGE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_FILE"," * @type String"," */","","/**"," * Can be used as iconClass within buttondefinition"," * @static"," * @property ICON_VIDEO"," * @type String"," */","","Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {","","        editor : null,","        editorY : null,","        editorNode : null,","        containerNode : null,","        toolbarNode : null,","","        ICON_BOLD : 'itsa-icon-bold',","        ICON_ITALIC : 'itsa-icon-italic',","        ICON_UNDERLINE : 'itsa-icon-underline',","        ICON_ALIGN_LEFT : 'itsa-icon-alignleft',","        ICON_ALIGN_CENTER : 'itsa-icon-aligncenter',","        ICON_ALIGN_RIGHT : 'itsa-icon-alignright',","        ICON_ALIGN_JUSTIFY : 'itsa-icon-alignjustify',","        ICON_SUBSCRIPT : 'itsa-icon-subscript',","        ICON_SUPERSCRIPT : 'itsa-icon-superscript',","        ICON_TEXTCOLOR : 'itsa-icon-textcolor',","        ICON_MARKCOLOR : 'itsa-icon-markcolor',","        ICON_INDENT : 'itsa-icon-indent',","        ICON_OUTDENT : 'itsa-icon-outdent',","        ICON_UNORDEREDLIST : 'itsa-icon-unorderedlist',","        ICON_ORDEREDLIST : 'itsa-icon-orderedlist',","        ICON_UNDO : 'itsa-icon-undo',","        ICON_REDO : 'itsa-icon-redo',","        ICON_EMAIL : 'itsa-icon-email',","        ICON_HYPERLINK : 'itsa-icon-hyperlink',","        ICON_IMAGE : 'itsa-icon-image',","        ICON_FILE : 'itsa-icon-file',","        ICON_VIDEO : 'itsa-icon-video',","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance.editor = instance.get('host');","            // need to make sure we can use execCommand","            instance.editor.on('frame:ready', instance._render, instance);","        },","","        /**","         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.","         * It will invoke renderUI, bindUI and syncUI, just as within a widget.","         *","         * @method _render","         * @private","        */","        _render : function() {","            var instance = this;","            instance.editorY = instance.editor.getInstance();","            instance.editorNode = instance.editor.frame.get('node');","            instance.containerNode = instance.editorNode.get('parentNode');","            instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);","            instance.editor.plug(Y.Plugin.ExecCommand);","            instance._defineCustomExecCommands();","            instance._renderUI();","            instance._bindUI();","            // first time? then fire a nodeChange-event to sync the toolbox with the editors-event object","//            instance.editor.simulate('nodeChange');","            instance.editor.focus();","        },","","        /**","         * Syncs the toolbar's status with the editor.<br>","         * At this point, it only works internal, because it needs the nodeChange-eventFacade.","         * @method sync","         * @param {EventFacade} e which will be passed when the edtior fires a nodeChange-event","         * @private","        */","        sync : function(e) {","            // syncUI will sync the toolbarstatus with the editors cursorposition","            var instance = this;","            if (e) {","                instance.toolbarNode.fire('itsatoolbar:statusChange', e);","            }","        },","","        /**","         * Creates a new Button on the Toolbar. By default at the end of the toolbar.","         * @method addButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, or you want a custom Function to be executed, you must supply an object:<br>","         * <i>- [command]</i> (String): the execcommand<br>","         * <i>- [value]</i> (String): additional value","         * <i>- [customFunc]</i> (Function): reference to custom function: typicaly, this function will call editorinstance.itstoolbar.execCommand() by itsself","         * <i>- [context]]</i> (instance): the context for customFunc","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addButton : function(iconClass, execCommand, indent, position) {","            var instance = this,","                buttonNode,","                buttonInnerNode;","            buttonNode = Node.create(ITSA_BTNNODE);","            buttonNode.addClass(ITSA_BUTTON);","            if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","            else if (Lang.isObject(execCommand)) {","                if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}","                if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}","                if (Lang.isFunction(execCommand.customFunc)) {","                    buttonNode.addClass(ITSA_BTNCUSTOMFUNC);","                    buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);","                }","            }","            if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}","            buttonInnerNode = Node.create(ITSA_BTNINNERNODE);","            buttonInnerNode.addClass(iconClass);","            buttonNode.append(buttonInnerNode);","            instance.toolbarNode.append(buttonNode);","            return buttonNode;","        },","","        /**","         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.","         * @method addSyncButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addSyncButton : function(iconClass, execCommand, syncFunc, context, indent, position, isToggleButton) {","            var instance = this,","                buttonNode = instance.addButton(iconClass, execCommand, indent, position);","            if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}","            instance.toolbarNode.addTarget(buttonNode);","            if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","            return buttonNode;","        },","","        /**","         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.","         * @method addToggleButton","         * @private","         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.","         * @param {String | Object} execCommand ExecCommand that will be executed on buttonclick.<br>","         * when execCommand consists of a command and a value, you must supply an object with two fields:<br>","         * <i>- command</i> (String): the execcommand<br>","         * <i>- value</i> (String): additional value","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * This callbackfunction will receive the nodeChane-event, described in <a href='http://yuilibrary.com/yui/docs/editor/#nodechange' target='_blank'>http://yuilibrary.com/yui/docs/editor/#nodechange</a>.","         * This function should handle the responseaction to be taken.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the created buttonnode","        */","        addToggleButton : function(iconClass, execCommand, syncFunc, context, indent, position) {","            var instance = this,","                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);","            buttonNode.addClass(ITSA_BTNTOGGLE);","            return buttonNode;","        },","","        /**","         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.","         * Position is by default at the end of the toolbar.<br>","         * @method addButtongroup","         * @private","         * @param {Array} buttons Should consist of objects with two fields:<br>","         * <i>- iconClass</i> (String): which defines the icon's look<br>&nbsp;&nbsp; (refer to the general moduledescription for a list with available classes)<br>","         * <i>- command</i> (String): the execcommand that will be executed on buttonclick","         * <i>- [value]</i> (String) optional: additional value for the execcommand","         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)","         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.Node} reference to the first buttonnode of the created buttongroup","        */","        addButtongroup : function(buttons, indent, position) {","            var instance = this,","                buttonGroup = Y.guid(),","                button,","                buttonNode,","                returnNode = null,","                execCommand,","                i;","            for (i=0; i<buttons.length; i++) {","                button = buttons[i];","                if (button.iconClass && button.command) {","                    if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}","                    else {execCommand = button.command;}","                    buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);","                    buttonNode.addClass(ITSA_BTNGROUP);","                    buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);","                    buttonNode.setData('buttongroup', buttonGroup);","                    instance.toolbarNode.addTarget(buttonNode);","                    if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}","                    if (!returnNode) {returnNode = buttonNode;}","                }","            }","            return returnNode;","        },","","        /**","         * Creates a selectList on the Toolbar. By default at the end of the toolbar.","         * When fired, the event-object returnes with 2 fields:<br>","         * <i>- e.value</i>: value of selected item<br>","         * <i>- e.index</i>: indexnr of the selected item","         * @method addSelectList","         * @private","         * @param {Array} items contains all the items. Should be either a list of (String), or a list of (Objects). In case of an Object-list, the objects should contain two fields:<br>","         * <i>- text</i> (String): the text shown in the selectlist<br>","         * <i>- returnValue</i> (String): the returnvalue of e.value<br>","         * In case a String-list is supplied, e.value will equal to the selected String-item (returnvalue==text)","","         * @param {String | Object} execCommand ExecCommand that will be executed after a selectChange-event is fired. e.value will be placed as the second argument in editor.exec.command().<br>","         * You could provide a second 'restoreCommand', in case you need a different execCommand to erase some format. In that case you must supply an object with three fields:<br>","         * <i>- command</i> (String): the standard execcommand<br>","         * <i>- restoreCommand</i> (String): the execcommand that will be executed in case e.value equals the restore-value<br>","         * <i>- restoreValue</i> (String): when e.value equals restoreValue, restoreCommand will be used instead of the standard command","","","         * @param {Function} syncFunc callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved.","         * @param {instance} [context] context for the syncFunction. Default is Toolbar's instance","         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.","         * @param {Object} [config] Object that will be passed into the selectinstance. Has with the following fields:<br>","         * <i>- listAlignRight</i> (Boolean): whether to rightalign the listitems. Default=false<br>","         * <i>- hideSelected</i> (Boolean): whether the selected item is hidden from the list. Default=false","         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.","         * @return {Y.ITSASelectlist} reference to the created object","        */","        addSelectlist : function(items, execCommand, syncFunc, context, indent, config, position) {","            var instance = this,","                selectlist;","            config = Y.merge(config, {items: items, defaultButtonText: ''});","            selectlist = new Y.ITSASelectList(config);","            selectlist.after('render', function(e, execCommand, syncFunc, context, indent){","                var instance = this,","                    selectlist = e.currentTarget,","                    buttonNode = selectlist.buttonNode;","                if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}","                else {","                    if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    ","                    if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    ","                    if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    ","                }","                if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}","                instance.toolbarNode.addTarget(buttonNode);","                selectlist.on('selectChange', instance._handleSelectChange, instance);","                if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}","                instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);","            }, instance, execCommand, syncFunc, context, indent);","            selectlist.render(instance.toolbarNode);","            return selectlist;","        },","","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this,","                srcNode = instance.get('srcNode');","            if (instance.toolbarNode) {instance.toolbarNode.remove(true);}","        },","","        // -- Private Methods ----------------------------------------------------------","","        /**","         * Creates the toolbar in the DOM. Toolbar will appear just above the editor, or -when scrNode is defined-  it will be prepended within srcNode ","         *","         * @method _renderUI","         * @private","        */","        _renderUI : function() {","            var instance = this,","                srcNode = instance.get('srcNode'),","                btnSize = instance.get('btnSize');","            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering","            instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);","            if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}","            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}","            if (srcNode) {","                srcNode.prepend(instance.toolbarNode);","            }","            else {","                instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);","                instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');","                instance.editorNode.insert(instance.toolbarNode, 'before');","            }","            instance._initializeButtons();","        },","        ","        /**","         * Binds events when there is a cursorstatus changes in the editor","         *","         * @method _bindUI","         * @private","        */","        _bindUI : function() {","            var instance = this;","            instance.editor.on('nodeChange', instance.sync, instance);","            instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);","        },","","        /**","         * Defines all custom execCommands","         *","         * @method _defineCustomExecCommands","         * @private","        */","        _defineCustomExecCommands : function() {","            var instance = this;","            instance._defineExecCommandFontSize();","            instance._defineExecCommandHyperlink();","            instance._defineExecCommandMaillink();","            instance._defineExecCommandImage();","            instance._defineExecCommandYouTube();","        },","","        /**","         * Handling the buttonclicks for all buttons on the Toolbar within one eventhandler (delegated by the Toolbar-node)","         *","         * @method _bindUI","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleBtnClick : function(e) {","            var instance = this,","                node = e.currentTarget;","            // only execute for .itsa-button, not for all buttontags    ","            if (node.hasClass(ITSA_BUTTON)) {","                if (node.hasClass(ITSA_BTNTOGGLE)) {","                    node.toggleClass(ITSA_BTNPRESSED);","                }","                else if (node.hasClass(ITSA_BTNSYNC)) {","                    node.toggleClass(ITSA_BTNACTIVE, true);","                }","                else if (node.hasClass(ITSA_BTNGROUP)) {","                    instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);","                    node.toggleClass(ITSA_BTNPRESSED, true);","                }","                if (!node.hasClass(ITSA_BTNCUSTOMFUNC)) {instance.execCommand(node);}","            }","        },","","        /**","         * Executes this.editor.exec.commanc with the execCommand and value that is bound to the node through Node.setData('execCommand') and Node.setData('execValue'). <br>","         * these values are bound during definition of addButton(), addSyncButton(), addToggleButton etc.","         *","         * @method execCommand","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        execCommand : function(buttonNode) {","            var execCommand,","                execValue;","            execCommand = buttonNode.getData('execCommand');","            execValue = buttonNode.getData('execValue');","            this.editor.exec.command(execCommand, execValue);","        },","","        /**","         * Handling the selectChange event of a selectButton","         *","         * @method _handleSelectChange","         * @private","         * @param {EventFacade} e in case of selectList, e.value and e.index are also available","        */","        _handleSelectChange : function(e) {","            var selectButtonNode,","                restoreCommand,","                execCommand;","            selectButtonNode = e.currentTarget.buttonNode;","            restoreCommand = selectButtonNode.getData('restoreCommand');","            execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');","            this.editor.exec.command(execCommand, e.value);","        },","","        /**","         * Checks whether the cursor is inbetween a selector. For instance to check if cursor is inbetween a h1-selector","         *","         * @method _checkInbetweenSelector","         * @private","         * @param {String} selector The selector to check for","         * @param {String} refContent Should be Y.one('body').getHtml()","         * @param {int} cursorindex Index where the cursor retains","        */","        _checkInbetweenSelector : function(selector, refContent, cursorindex) {","            var instance = this,","                pattern = '<\\s*' + selector + '[^>]*>(.*?)<\\s*/\\s*' + selector  + '>',","                searchHeaderPattern = new RegExp(pattern, 'gi'), ","                fragment, ","                inbetween = false;","            fragment = searchHeaderPattern.exec(refContent);","            while ((fragment !== null) && !inbetween) {","                inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));","                fragment = searchHeaderPattern.exec(refContent); // next search","            }","            return inbetween;","        },","","        /**","         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.","         *","         * @method _initializeButtons","         * @private","        */","        _initializeButtons : function() { ","            var instance = this,","                i, r, g, b,","                item,","                items,","                bgcolor,","                docFontSize,","                bgcolors,","                buttons;","","            if (instance.get('btnFontfamily')) {","                items = instance.get('fontFamilies');","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    items[i] = {text: \"<span style='font-family:\"+item+\"'>\"+item+\"</span>\", returnValue: item};","                }","                instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {","                    var familyList = e.changedNode.getStyle('fontFamily'),","                        familyListArray = familyList.split(','),","                        activeFamily = familyListArray[0];","                    this.fontSelectlist.selectItemByValue(activeFamily, true, true);","                }, null, true, {buttonWidth: 145});","            }","","            if (instance.get('btnFontsize')) {","                items = [];","                for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}","                instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {","                    var fontSize = e.changedNode.getStyle('fontSize'),","                        fontSizeNumber = parseFloat(fontSize),","                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);","                    // make sure not to display partial numbers    ","                    this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);","                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});","            }","","            if (instance.get('btnHeader')) {","                items = [];","                items.push({text: 'No header', returnValue: 'clear'});","                for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}","                instance.headerSelectlist = instance.addSelectlist(items, {command: 'heading', restoreCommand: 'insertParagraph', restoreValue: 'clear'}, function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        currentHeader,","                        i,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {","                        if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}","                    }","                    if (!currentHeader) {currentHeader=0;}","                    instance.headerSelectlist.selectItem(currentHeader);","                }, null, true, {buttonWidth: 96});","            }","","            if (instance.get('btnBold')) {","                instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));","                }, null, true);","            }","","            if (instance.get('btnItalic')) {","                instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));","                });","            }","","            if (instance.get('btnUnderline')) {","                instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));","                });","            }","","            if (instance.get('grpAlign')) {","                buttons = [","                    {","                        iconClass : instance.ICON_ALIGN_LEFT,","                        command : 'JustifyLeft',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_CENTER,","                        command : 'JustifyCenter',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));","                                    }","                    },","                    {","                        iconClass : instance.ICON_ALIGN_RIGHT,","                        command : 'JustifyRight',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));","                                    }","                    }","                ];","                if (instance.get('btnJustify')) {","                    buttons.push({","                        iconClass : instance.ICON_ALIGN_JUSTIFY,","                        command : 'JustifyFull',","                        value : '',","                        syncFunc : function(e) {","                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));","                                    }","                    });","                }","                instance.addButtongroup(buttons, true);","            }","","            if (instance.get('grpSubsuper')) {","                instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));","                }, null, true);","                instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));","                });","            }","","            if (instance.get('btnTextcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('color'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.colorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});","            }","","            if (instance.get('btnMarkcolor')) {","                items = [];","                bgcolors = instance.get('colorPallet');","                for (i=0; i<bgcolors.length; i++) {","                    bgcolor = bgcolors[i];","                    items.push({text: \"<div style='background-color:\"+bgcolor+\";'></div>\", returnValue: bgcolor});","                }","                instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {","                    var instance = this,","                        styleColor = e.changedNode.getStyle('backgroundColor'),","                        hexColor = instance._filter_rgb(styleColor);","                    instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);","                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});","            }","","            if (instance.get('grpIndent')) {","                instance.addButton(instance.ICON_INDENT, 'indent', true);","                instance.addButton(instance.ICON_OUTDENT, 'outdent');","            }","","            if (instance.get('grpLists')) {","                instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));","                }, null, true);","                instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));","                });","            }","","            if (instance.get('btnEmail')) {","                instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {","                    var instance = this,","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isEmailLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                    if (isLink) {","                        // check if its a normal href or a mailto:","                        while (node && !node.test('a')) {node=node.get('parentNode');}","                        // be carefull: do not === /match() with text, that will fail","                        isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');","                    }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));","                }, null, true);","            }","","            if (instance.get('btnHyperlink')) {","                instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {","                    var instance = this,","                        posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                        node = e.changedNode,","                        nodePosition,","                        isLink,","                        isFileLink = false,","                        href,","                        lastDot,","                        fileExt,","                        isHyperLink,","                        bodyhtml = instance.editorY.one('body').getHTML();","                    nodePosition = bodyhtml.indexOf(node.getHTML());","                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));","                });","            }","","            if (instance.get('btnImage')) {","                instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));","                });","            }","","            if (instance.get('btnVideo')) {","                instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {","                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));","                });","            }","","//************************************************","// just for temporary local use ITS Asbreuk","// should NOT be part of the gallery","            if (false) {","                instance.addSyncButton(","                    instance.ICON_FILE,","                    {   customFunc: function(e) {","                            Y.config.cmas2plus.uploader.show(","                                null, ","                                Y.bind(function(e) {","                                    this.editor.exec.command('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);","                                }, this)","                            );","                        }","                    },","                    function(e) {","                        var instance = this,","                            posibleFiles = '.doc.docx.xls.xlsx.pdf.txt.zip.rar.',","                            node = e.changedNode,","                            nodePosition,","                            isFileLink = false,","                            isLink,","                            href,","                            lastDot,","                            fileExt,","                            isHyperLink,","                            bodyhtml = instance.editorY.one('body').getHTML();","                        nodePosition = bodyhtml.indexOf(node.getHTML());","                        isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);","                        if (isLink) {","                            // check if its a normal href or a mailto:","                            while (node && !node.test('a')) {node=node.get('parentNode');}","                            // be carefull: do not === /match() with text, that will fail","                            href = node.get('href');","                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';","                            if (isHyperLink) {","                                lastDot = href.lastIndexOf('.');","                                if (lastDot!==-1) {","                                    fileExt = href.substring(lastDot)+'.';","                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);","                                }","                            }","                        }","                        e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);","                    }","                );","            }","//************************************************","","            if (instance.get('grpUndoredo')) {","                instance.addButton(instance.ICON_UNDO, 'undo', true);","                instance.addButton(instance.ICON_REDO, 'redo');","            }","","        },","","        /**","        * @private","        * @method _filter_rgb","        * @param String css The CSS string containing rgb(#,#,#);","        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00","        * @return String","        */","        _filter_rgb: function(css) {","            if (css.toLowerCase().indexOf('rgb') != -1) {","                var exp = new RegExp(\"(.*?)rgb\\\\s*?\\\\(\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?,\\\\s*?([0-9]+).*?\\\\)(.*?)\", \"gi\");","                var rgb = css.replace(exp, \"$1,$2,$3,$4,$5\").split(',');","            ","                if (rgb.length === 5) {","                    var r = parseInt(rgb[1], 10).toString(16);","                    var g = parseInt(rgb[2], 10).toString(16);","                    var b = parseInt(rgb[3], 10).toString(16);","","                    r = r.length === 1 ? '0' + r : r;","                    g = g.length === 1 ? '0' + g : g;","                    b = b.length === 1 ? '0' + b : b;","","                    css = \"#\" + r + g + b;","                }","            }","            return css;","        },","","        /**********************************************************************************************************************","        ***********************************************************************************************************************","","        FUNCTIONS BELOW REALLY NEED TO BE REDISGNED","        THEY DO NOT WORK WELL","","        ***********************************************************************************************************************","        ***********************************************************************************************************************/","","","        /**","        * Defines the execCommand itsafontsize","        * @method _defineExecCommandFontSize","        * @private","        */","        _defineExecCommandFontSize : function() {","            // This function seriously needs redesigned.","            // it does work, but as you can see in the comment, there are some flaws","            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                   itsafontsize: function(cmd, val) {","                       var execCommandInstance = this,","                           editorY = execCommandInstance.get('host').getInstance(),","                           sel = new editorY.EditorSelection(),","                           newNodelist;","                       if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {","                           //We have a selection","                            if (Y.UA.webkit) {","                                if (sel.anchorNode.getStyle('lineHeight')) {","                                    sel.anchorNode.setStyle('lineHeight', '');","                                }","                            }","                            // first cleaning up old fontsize","                            // isn't done well !! there might be other tags than <span> that have fontSize declared","                            // And you should not wrap a new <span> when sel === previous <span>","                            sel.anchorNode.all('span').setStyle('fontSize', '');","                            // create new wrapper <span style='font-size: val'>....</span>","                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>","                            // in that case you create a span wrapped on a previous span","                            newNodelist = sel.wrapContent('span');","                            newNodelist.item(0).setStyle('fontSize', val);","                       }","                       else {","                           // Didn't find a way to set the focus yet.... damn...","                           /*","                           sel.setCursor();","                           execCommandInstance.command(\"inserthtml\", \"<span style='font-size:\" + val + \"'></span>\");","                           sel.focusCursor(true, true);","                           */","                       }","                   }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaehyperlink","        * @method _defineExecCommandHyperlink","        * @private","        */","        _defineExecCommandHyperlink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    // val can be:","                    // 'img', 'url', 'video', 'email'","                    itsacreatehyperlink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter url', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url + '\" target=\"_blank\">' + url + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacretaeemaillink","        * @method _defineExecCommandMaillink","        * @private","        */","        _defineExecCommandMaillink : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreatemaillink: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            urltext,","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter email', '');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            urltext = url;","                            url = 'mailto:' + url;","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<a href=\"' + url+ '\">' + urltext + '</a>');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateimage","        * @method _defineExecCommandImage","        * @private","        */","        _defineExecCommandImage : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateimage: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                execCommandInstance.get('host').execCommand('inserthtml', '<img src=\"' + url + '\" />');","                            }","                        }","                        return a;","                    }","                });","            }","        },","","        /**","        * Defines the execCommand itsacreateyoutube","        * @method _defineExecCommandYouTube","        * @private","        */","        _defineExecCommandYouTube : function() {","            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {","                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {","                    itsacreateyoutube: function(cmd, val) {","                        var execCommandInstance = this,","                            editorY = execCommandInstance.get('host').getInstance(),","                            out, ","                            a, ","                            sel, ","                            holder, ","                            url, ","                            videoitem, ","                            videoitempos;","                        url = val || prompt('Enter link to image', 'http://');","                        if (url) {","                            holder = editorY.config.doc.createElement('div');","                            url = url.replace(/\"/g, '').replace(/'/g, ''); //Remove single & double quotes","                            url = editorY.config.doc.createTextNode(url);","                            holder.appendChild(url);","                            url = holder.innerHTML;","                            execCommandInstance.get('host')._execCommand('createlink', url);","                            sel = new editorY.EditorSelection();","                            out = sel.getSelected();","                            if (!sel.isCollapsed && out.size()) {","                                //We have a selection","                                a = out.item(0).one('a');","                                if (a) {","                                    out.item(0).replace(a);","                                }","                                if (Y.UA.gecko) {","                                    if (a.get('parentNode').test('span')) {","                                        if (a.get('parentNode').one('br.yui-cursor')) {","                                           a.get('parentNode').insert(a, 'before');","                                        }","                                    }","                                }","                            } else {","                                //No selection, insert a new node..","                                    videoitempos = url.indexOf('watch?v=');","                                    if (videoitempos!==-1) {","                                        videoitem = url.substring(url.videoitempos+8);","                                        execCommandInstance.get('host').execCommand('inserthtml', '<iframe width=\"420\" height=\"315\" src=\"http://www.youtube.com/embed/' + videoitem + '\" frameborder=\"0\" allowfullscreen></iframe>');","                                    }","                            }","                        }","                        return a;","                    }","                });","            }","        }","","    }, {","        NS : 'itsatoolbar',","        ATTRS : {","","            /**","             * @description Defines whether keyboard-enter will lead to P-tag. Default=false (meaning that BR's will be created)","             * @attribute paraSupport","             * @type Boolean","            */","            paraSupport : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The sourceNode that holds the Toolbar. Could be an empty DIV.<br>","             * If not defined, than the Toolbar will be created just above the Editor.","             * By specifying the srcNode, one could create the Toolbar on top of the page, regardless of the Editor's position","             * @attribute srcNode","             * @type Y.Node ","            */","            srcNode : {","                value: null,","                writeOnce: 'initOnly',","                setter: function(val) {","                    return Y.one(val);","                },","                validator: function(val) {","                    return Y.one(val);","                }","            },","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 2,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description The amount of headerlevels that can be selected<br>","             * Should be a value from 1-9<br>","             * Default = 6","             * @attribute headerLevels","             * @type int","            */","            headerLevels : {","                value: 6,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<10));","                }","            },","","            /**","             * @description The fontfamilies that can be selected<br>","             * Should be a value from 1-9<br>","             * @attribute fontFamilies","             * @type Array [String]","            */","            fontFamilies : {","                value: [","                    'Arial',","                    'Arial Black',","                    'Comic Sans MS',","                    'Courier New',","                    'Lucida Console',","                    'Tahoma',","                    'Times New Roman',","                    'Trebuchet MS',","                    'Verdana'","                ],","                validator: function(val) {","                    return (Lang.isArray(val));","                }","            },","","            /**","             * @description Whether the button fontfamily is available<br>","             * Default = true","             * @attribute btnFontfamily","             * @type int","            */","            btnFontfamily : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button fontsize is available<br>","             * Default = true","             * @attribute btnFontsize","             * @type int","            */","            btnFontsize : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button headers is available<br>","             * because this function doesn't work well on all browsers, it is set of by default.<br>","             * Is something to work on in fututr releases. It works within firefox though.","             * Default = false","             * @attribute btnHeader","             * @type int","            */","            btnHeader : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button bold is available<br>","             * Default = true","             * @attribute btnBold","             * @type int","            */","            btnBold : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button italic is available<br>","             * Default = true","             * @attribute btnItalic","             * @type int","            */","            btnItalic : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button underline is available<br>","             * Default = true","             * @attribute btnUnderline","             * @type int","            */","            btnUnderline : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group align is available<br>","             * Default = true","             * @attribute grpAlign","             * @type int","            */","            grpAlign : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button justify is available<br>","             * will only be shown in combination with grpalign","             * Default = true","             * @attribute btnJustify","             * @type int","            */","            btnJustify : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group sub/superscript is available<br>","             * Default = true","             * @attribute grpSubsuper","             * @type int","            */","            grpSubsuper : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button textcolor is available<br>","             * Default = true","             * @attribute btnTextcolor","             * @type int","            */","            btnTextcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button markcolor is available<br>","             * Default = true","             * @attribute btnMarkcolor","             * @type int","            */","            btnMarkcolor : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group indent is available<br>","             * Default = true","             * @attribute grpIndent","             * @type int","            */","            grpIndent : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the group lists is available<br>","             * Default = true","             * @attribute grpLists","             * @type int","            */","            grpLists : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","/*","            btnremoveformat : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","            btnhiddenelements : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","*/","","            /**","             * @description Whether the group undo/redo is available<br>","             * Default = true","             * @attribute grpUndoredo","             * @type int","            */","            grpUndoredo : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button email is available<br>","             * Default = true","             * @attribute btnEmail","             * @type int","            */","            btnEmail : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button hyperlink is available<br>","             * Default = true","             * @attribute btnHyperlink","             * @type int","            */","            btnHyperlink : {","                value: true,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button image is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though.","             * Default = false","             * @attribute btnImage","             * @type int","            */","            btnImage : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description Whether the button video is available<br>","             * because this code needs to be developed in a better way, the function is disabled by default.<br>","             * It works in a simple way though. The end-user should enter a youtube-link once they click on this button.","             * Default = false","             * @attribute btnVideo","             * @type int","            */","            btnVideo : {","                value: false,","                validator: function(val) {","                    return Lang.isBoolean(val);","                }","            },","","            /**","             * @description The colorpallet to use<br>","             * @attribute colorPallet","             * @type Array (String)","            */","            colorPallet : {","                value : [","                    '#111111',","                    '#2D2D2D',","                    '#434343',","                    '#5B5B5B',","                    '#737373',","                    '#8B8B8B',","                    '#A2A2A2',","                    '#B9B9B9',","                    '#000000',","                    '#D0D0D0',","                    '#E6E6E6',","                    '#FFFFFF',","                    '#BFBF00',","                    '#FFFF00',","                    '#FFFF40',","                    '#FFFF80',","                    '#FFFFBF',","                    '#525330',","                    '#898A49',","                    '#AEA945',","                    '#7F7F00',","                    '#C3BE71',","                    '#E0DCAA',","                    '#FCFAE1',","                    '#60BF00',","                    '#80FF00',","                    '#A0FF40',","                    '#C0FF80',","                    '#DFFFBF',","                    '#3B5738',","                    '#668F5A',","                    '#7F9757',","                    '#407F00',","                    '#8A9B55',","                    '#B7C296',","                    '#E6EBD5',","                    '#00BF00',","                    '#00FF80',","                    '#40FFA0',","                    '#80FFC0',","                    '#BFFFDF',","                    '#033D21',","                    '#438059',","                    '#7FA37C',","                    '#007F40',","                    '#8DAE94',","                    '#ACC6B5',","                    '#DDEBE2',","                    '#00BFBF',","                    '#00FFFF',","                    '#40FFFF',","                    '#80FFFF',","                    '#BFFFFF',","                    '#033D3D',","                    '#347D7E',","                    '#609A9F',","                    '#007F7F',","                    '#96BDC4',","                    '#B5D1D7',","                    '#E2F1F4',","                    '#0060BF',","                    '#0080FF',","                    '#40A0FF',","                    '#80C0FF',","                    '#BFDFFF',","                    '#1B2C48',","                    '#385376',","                    '#57708F',","                    '#00407F',","                    '#7792AC',","                    '#A8BED1',","                    '#DEEBF6',","                    '#0000BF',","                    '#0000FF',","                    '#4040FF',","                    '#8080FF',","                    '#BFBFFF',","                    '#212143',","                    '#373E68',","                    '#444F75',","                    '#00007F',","                    '#585E82',","                    '#8687A4',","                    '#D2D1E1',","                    '#6000BF',","                    '#8000FF',","                    '#A040FF',","                    '#C080FF',","                    '#DFBFFF',","                    '#302449',","                    '#54466F',","                    '#655A7F',","                    '#40007F',","                    '#726284',","                    '#9E8FA9',","                    '#DCD1DF',","                    '#BF00BF',","                    '#FF00FF',","                    '#FF40FF',","                    '#FF80FF',","                    '#FFBFFF',","                    '#4A234A',","                    '#794A72',","                    '#936386',","                    '#7F007F',","                    '#9D7292',","                    '#C0A0B6',","                    '#ECDAE5',","                    '#BF005F',","                    '#FF007F',","                    '#FF409F',","                    '#FF80BF',","                    '#FFBFDF',","                    '#451528',","                    '#823857',","                    '#A94A76',","                    '#7F003F',","                    '#BC6F95',","                    '#D8A5BB',","                    '#F7DDE9',","                    '#C00000',","                    '#FF0000',","                    '#FF4040',","                    '#FF8080',","                    '#FFC0C0',","                    '#441415',","                    '#82393C',","                    '#AA4D4E',","                    '#800000',","                    '#BC6E6E',","                    '#D8A3A4',","                    '#F8DDDD',","                    '#BF5F00',","                    '#FF7F00',","                    '#FF9F40',","                    '#FFBF80',","                    '#FFDFBF',","                    '#482C1B',","                    '#855A40',","                    '#B27C51',","                    '#7F3F00',","                    '#C49B71',","                    '#E1C4A8',","                    '#FDEEE0'","                ],","                validator: function(val) {","                    return Lang.isArray(val) ;","                }","","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].lines = {"1":0,"3":0,"24":0,"230":0,"268":0,"269":0,"271":0,"282":0,"283":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"293":0,"305":0,"306":0,"307":0,"327":0,"330":0,"331":0,"332":0,"333":0,"334":0,"335":0,"336":0,"337":0,"338":0,"341":0,"342":0,"343":0,"344":0,"345":0,"346":0,"367":0,"369":0,"370":0,"371":0,"372":0,"393":0,"395":0,"396":0,"415":0,"422":0,"423":0,"424":0,"425":0,"427":0,"428":0,"429":0,"430":0,"431":0,"432":0,"433":0,"436":0,"468":0,"470":0,"471":0,"472":0,"473":0,"476":0,"478":0,"479":0,"480":0,"482":0,"483":0,"484":0,"485":0,"486":0,"488":0,"489":0,"499":0,"501":0,"513":0,"517":0,"518":0,"520":0,"521":0,"524":0,"525":0,"526":0,"528":0,"538":0,"539":0,"540":0,"550":0,"551":0,"552":0,"553":0,"554":0,"555":0,"566":0,"569":0,"570":0,"571":0,"573":0,"574":0,"576":0,"577":0,"578":0,"580":0,"593":0,"595":0,"596":0,"597":0,"608":0,"611":0,"612":0,"613":0,"614":0,"627":0,"632":0,"633":0,"634":0,"635":0,"637":0,"647":0,"656":0,"657":0,"658":0,"659":0,"660":0,"662":0,"663":0,"666":0,"670":0,"671":0,"672":0,"673":0,"674":0,"678":0,"682":0,"683":0,"684":0,"685":0,"686":0,"687":0,"693":0,"694":0,"695":0,"697":0,"698":0,"702":0,"703":0,"704":0,"708":0,"709":0,"710":0,"714":0,"715":0,"716":0,"720":0,"721":0,"727":0,"735":0,"743":0,"747":0,"748":0,"753":0,"757":0,"760":0,"761":0,"762":0,"764":0,"765":0,"769":0,"770":0,"771":0,"772":0,"773":0,"774":0,"776":0,"777":0,"780":0,"784":0,"785":0,"786":0,"787":0,"788":0,"789":0,"791":0,"792":0,"795":0,"799":0,"800":0,"801":0,"804":0,"805":0,"806":0,"810":0,"811":0,"813":0,"814":0,"818":0,"819":0,"823":0,"824":0,"825":0,"831":0,"832":0,"833":0,"835":0,"837":0,"839":0,"843":0,"844":0,"845":0,"856":0,"857":0,"858":0,"860":0,"862":0,"863":0,"864":0,"865":0,"866":0,"867":0,"868":0,"872":0,"876":0,"877":0,"878":0,"882":0,"883":0,"884":0,"891":0,"892":0,"895":0,"898":0,"904":0,"915":0,"916":0,"917":0,"919":0,"921":0,"922":0,"923":0,"924":0,"925":0,"926":0,"927":0,"931":0,"937":0,"938":0,"939":0,"952":0,"953":0,"954":0,"956":0,"957":0,"958":0,"959":0,"961":0,"962":0,"963":0,"965":0,"968":0,"989":0,"990":0,"992":0,"996":0,"998":0,"999":0,"1000":0,"1006":0,"1010":0,"1011":0,"1032":0,"1033":0,"1037":0,"1046":0,"1047":0,"1048":0,"1049":0,"1050":0,"1051":0,"1052":0,"1053":0,"1054":0,"1055":0,"1056":0,"1058":0,"1059":0,"1060":0,"1062":0,"1063":0,"1064":0,"1065":0,"1071":0,"1074":0,"1086":0,"1087":0,"1089":0,"1099":0,"1100":0,"1101":0,"1102":0,"1103":0,"1104":0,"1105":0,"1106":0,"1107":0,"1108":0,"1109":0,"1110":0,"1111":0,"1113":0,"1114":0,"1115":0,"1117":0,"1118":0,"1119":0,"1120":0,"1126":0,"1129":0,"1141":0,"1142":0,"1144":0,"1153":0,"1154":0,"1155":0,"1156":0,"1157":0,"1158":0,"1159":0,"1160":0,"1161":0,"1162":0,"1163":0,"1165":0,"1166":0,"1167":0,"1169":0,"1170":0,"1171":0,"1172":0,"1178":0,"1181":0,"1193":0,"1194":0,"1196":0,"1205":0,"1206":0,"1207":0,"1208":0,"1209":0,"1210":0,"1211":0,"1212":0,"1213":0,"1214":0,"1215":0,"1217":0,"1218":0,"1219":0,"1221":0,"1222":0,"1223":0,"1224":0,"1230":0,"1231":0,"1232":0,"1233":0,"1237":0,"1255":0,"1270":0,"1273":0,"1287":0,"1301":0,"1324":0,"1337":0,"1350":0,"1365":0,"1378":0,"1391":0,"1404":0,"1417":0,"1431":0,"1444":0,"1457":0,"1470":0,"1483":0,"1496":0,"1523":0,"1536":0,"1549":0,"1564":0,"1579":0,"1736":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].functions = {"initializer:267":0,"_render:281":0,"sync:303":0,"addButton:326":0,"addSyncButton:366":0,"addToggleButton:392":0,"addButtongroup:414":0,"(anonymous 2):472":0,"addSelectlist:467":0,"destructor:498":0,"_renderUI:512":0,"_bindUI:537":0,"_defineCustomExecCommands:549":0,"_handleBtnClick:565":0,"execCommand:592":0,"_handleSelectChange:607":0,"_checkInbetweenSelector:626":0,"(anonymous 3):662":0,"(anonymous 4):673":0,"(anonymous 5):686":0,"(anonymous 6):703":0,"(anonymous 7):709":0,"(anonymous 8):715":0,"syncFunc:726":0,"syncFunc:734":0,"syncFunc:742":0,"syncFunc:752":0,"(anonymous 9):761":0,"(anonymous 10):764":0,"(anonymous 11):776":0,"(anonymous 12):791":0,"(anonymous 13):805":0,"(anonymous 14):813":0,"(anonymous 15):824":0,"(anonymous 16):844":0,"(anonymous 17):877":0,"(anonymous 18):883":0,"(anonymous 19):897":0,"customFunc:894":0,"(anonymous 20):903":0,"_initializeButtons:646":0,"_filter_rgb:951":0,"itsafontsize:991":0,"_defineExecCommandFontSize:986":0,"itsacreatehyperlink:1036":0,"_defineExecCommandHyperlink:1031":0,"itsacreatemaillink:1088":0,"_defineExecCommandMaillink:1085":0,"itsacreateimage:1143":0,"_defineExecCommandImage:1140":0,"itsacreateyoutube:1195":0,"_defineExecCommandYouTube:1192":0,"validator:1254":0,"setter:1269":0,"validator:1272":0,"validator:1286":0,"validator:1300":0,"validator:1323":0,"validator:1336":0,"validator:1349":0,"validator:1364":0,"validator:1377":0,"validator:1390":0,"validator:1403":0,"validator:1416":0,"validator:1430":0,"validator:1443":0,"validator:1456":0,"validator:1469":0,"validator:1482":0,"validator:1495":0,"validator:1522":0,"validator:1535":0,"validator:1548":0,"validator:1563":0,"validator:1578":0,"validator:1735":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredLines = 391;
_yuitest_coverage["/build/gallery-itsatoolbar/gallery-itsatoolbar.js"].coveredFunctions = 78;
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
    ITSA_SELECTCONTNODE = '<div></div>';

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

_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 230);
Y.namespace('Plugin').ITSAToolbar = Y.Base.create('itsatoolbar', Y.Plugin.Base, [], {

        editor : null,
        editorY : null,
        editorNode : null,
        containerNode : null,
        toolbarNode : null,

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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "initializer", 267);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 268);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 269);
instance.editor = instance.get('host');
            // need to make sure we can use execCommand
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 271);
instance.editor.on('frame:ready', instance._render, instance);
        },

        /**
         * Establishes the initial DOM for the toolbar. This method ia automaticly invoked once during initialisation.
         * It will invoke renderUI, bindUI and syncUI, just as within a widget.
         *
         * @method _render
         * @private
        */
        _render : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_render", 281);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 282);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 283);
instance.editorY = instance.editor.getInstance();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 284);
instance.editorNode = instance.editor.frame.get('node');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 285);
instance.containerNode = instance.editorNode.get('parentNode');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 286);
instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 287);
instance.editor.plug(Y.Plugin.ExecCommand);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 288);
instance._defineCustomExecCommands();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 289);
instance._renderUI();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 290);
instance._bindUI();
            // first time? then fire a nodeChange-event to sync the toolbox with the editors-event object
//            instance.editor.simulate('nodeChange');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 293);
instance.editor.focus();
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "sync", 303);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 305);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 306);
if (e) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 307);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButton", 326);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 327);
var instance = this,
                buttonNode,
                buttonInnerNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 330);
buttonNode = Node.create(ITSA_BTNNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 331);
buttonNode.addClass(ITSA_BUTTON);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 332);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
            else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 333);
if (Lang.isObject(execCommand)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 334);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 335);
if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 336);
if (Lang.isFunction(execCommand.customFunc)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 337);
buttonNode.addClass(ITSA_BTNCUSTOMFUNC);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 338);
buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);
                }
            }}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 341);
if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 342);
buttonInnerNode = Node.create(ITSA_BTNINNERNODE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 343);
buttonInnerNode.addClass(iconClass);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 344);
buttonNode.append(buttonInnerNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 345);
instance.toolbarNode.append(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 346);
return buttonNode;
        },

        /**
         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.
         * @method addSyncButton
         * @private
         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSyncButton", 366);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 367);
var instance = this,
                buttonNode = instance.addButton(iconClass, execCommand, indent, position);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 369);
if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 370);
instance.toolbarNode.addTarget(buttonNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 371);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 372);
return buttonNode;
        },

        /**
         * Creates a new toggleButton on the Toolbar. By default at the end of the toolbar.
         * @method addToggleButton
         * @private
         * @param {String} iconClass Defines the icon's look. Refer to the general moduledescription for a list with available classes.
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addToggleButton", 392);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 393);
var instance = this,
                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 395);
buttonNode.addClass(ITSA_BTNTOGGLE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 396);
return buttonNode;
        },

        /**
         * Creates a group of toggleButtons on the Toolbar which are related to each-other. For instance when you might need 3 related buttons: leftalign, center, rightalign.
         * Position is by default at the end of the toolbar.<br>
         * @method addButtongroup
         * @private
         * @param {Array} buttons Should consist of objects with two fields:<br>
         * <i>- iconClass</i> (String): which defines the icon's look<br>&nbsp;&nbsp; (refer to the general moduledescription for a list with available classes)<br>
         * <i>- command</i> (String): the execcommand that will be executed on buttonclick
         * <i>- [value]</i> (String) optional: additional value for the execcommand
         * <i>- syncFunc</i> (Function): callback-function that will be called after a statusChange, when the users manupilates the text, or the cursor is moved (for more info on the sync-function, see addToggleButton)
         * <i>- [context]</i> (instance): context for the syncFunction. Default is Toolbar's instance
         * @param {Boolean} [indent] To indent the button thus creating a whitespace between the previous button. Default=false.
         * @param {Number} [position] Index where to insert the button. Default=null, which means added as the last button.
         * @return {Y.Node} reference to the first buttonnode of the created buttongroup
        */
        addButtongroup : function(buttons, indent, position) {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addButtongroup", 414);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 415);
var instance = this,
                buttonGroup = Y.guid(),
                button,
                buttonNode,
                returnNode = null,
                execCommand,
                i;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 422);
for (i=0; i<buttons.length; i++) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 423);
button = buttons[i];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 424);
if (button.iconClass && button.command) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 425);
if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}
                    else {execCommand = button.command;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 427);
buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 428);
buttonNode.addClass(ITSA_BTNGROUP);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 429);
buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 430);
buttonNode.setData('buttongroup', buttonGroup);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 431);
instance.toolbarNode.addTarget(buttonNode);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 432);
if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 433);
if (!returnNode) {returnNode = buttonNode;}
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 436);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "addSelectlist", 467);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 468);
var instance = this,
                selectlist;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 470);
config = Y.merge(config, {items: items, defaultButtonText: ''});
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 471);
selectlist = new Y.ITSASelectList(config);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 472);
selectlist.after('render', function(e, execCommand, syncFunc, context, indent){
                _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 2)", 472);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 473);
var instance = this,
                    selectlist = e.currentTarget,
                    buttonNode = selectlist.buttonNode;
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 476);
if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
                else {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 478);
if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 479);
if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 480);
if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 482);
if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 483);
instance.toolbarNode.addTarget(buttonNode);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 484);
selectlist.on('selectChange', instance._handleSelectChange, instance);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 485);
if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 486);
instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);
            }, instance, execCommand, syncFunc, context, indent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 488);
selectlist.render(instance.toolbarNode);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 489);
return selectlist;
        },


        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "destructor", 498);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 499);
var instance = this,
                srcNode = instance.get('srcNode');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 501);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_renderUI", 512);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 513);
var instance = this,
                srcNode = instance.get('srcNode'),
                btnSize = instance.get('btnSize');
            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 517);
instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 518);
if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}
            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 520);
if (srcNode) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 521);
srcNode.prepend(instance.toolbarNode);
            }
            else {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 524);
instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 525);
instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 526);
instance.editorNode.insert(instance.toolbarNode, 'before');
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 528);
instance._initializeButtons();
        },
        
        /**
         * Binds events when there is a cursorstatus changes in the editor
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_bindUI", 537);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 538);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 539);
instance.editor.on('nodeChange', instance.sync, instance);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 540);
instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);
        },

        /**
         * Defines all custom execCommands
         *
         * @method _defineCustomExecCommands
         * @private
        */
        _defineCustomExecCommands : function() {
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineCustomExecCommands", 549);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 550);
var instance = this;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 551);
instance._defineExecCommandFontSize();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 552);
instance._defineExecCommandHyperlink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 553);
instance._defineExecCommandMaillink();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 554);
instance._defineExecCommandImage();
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 555);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleBtnClick", 565);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 566);
var instance = this,
                node = e.currentTarget;
            // only execute for .itsa-button, not for all buttontags    
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 569);
if (node.hasClass(ITSA_BUTTON)) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 570);
if (node.hasClass(ITSA_BTNTOGGLE)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 571);
node.toggleClass(ITSA_BTNPRESSED);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 573);
if (node.hasClass(ITSA_BTNSYNC)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 574);
node.toggleClass(ITSA_BTNACTIVE, true);
                }
                else {_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 576);
if (node.hasClass(ITSA_BTNGROUP)) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 577);
instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 578);
node.toggleClass(ITSA_BTNPRESSED, true);
                }}}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 580);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "execCommand", 592);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 593);
var execCommand,
                execValue;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 595);
execCommand = buttonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 596);
execValue = buttonNode.getData('execValue');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 597);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_handleSelectChange", 607);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 608);
var selectButtonNode,
                restoreCommand,
                execCommand;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 611);
selectButtonNode = e.currentTarget.buttonNode;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 612);
restoreCommand = selectButtonNode.getData('restoreCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 613);
execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 614);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_checkInbetweenSelector", 626);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 627);
var instance = this,
                pattern = '<\s*' + selector + '[^>]*>(.*?)<\s*/\s*' + selector  + '>',
                searchHeaderPattern = new RegExp(pattern, 'gi'), 
                fragment, 
                inbetween = false;
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 632);
fragment = searchHeaderPattern.exec(refContent);
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 633);
while ((fragment !== null) && !inbetween) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 634);
inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 635);
fragment = searchHeaderPattern.exec(refContent); // next search
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 637);
return inbetween;
        },

        /**
         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.
         *
         * @method _initializeButtons
         * @private
        */
        _initializeButtons : function() { 
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_initializeButtons", 646);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 647);
var instance = this,
                i, r, g, b,
                item,
                items,
                bgcolor,
                docFontSize,
                bgcolors,
                buttons;

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 656);
if (instance.get('btnFontfamily')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 657);
items = instance.get('fontFamilies');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 658);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 659);
item = items[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 660);
items[i] = {text: "<span style='font-family:"+item+"'>"+item+"</span>", returnValue: item};
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 662);
instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 3)", 662);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 663);
var familyList = e.changedNode.getStyle('fontFamily'),
                        familyListArray = familyList.split(','),
                        activeFamily = familyListArray[0];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 666);
this.fontSelectlist.selectItemByValue(activeFamily, true, true);
                }, null, true, {buttonWidth: 145});
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 670);
if (instance.get('btnFontsize')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 671);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 672);
for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 673);
instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 4)", 673);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 674);
var fontSize = e.changedNode.getStyle('fontSize'),
                        fontSizeNumber = parseFloat(fontSize),
                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);
                    // make sure not to display partial numbers    
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 678);
this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);
                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 682);
if (instance.get('btnHeader')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 683);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 684);
items.push({text: 'No header', returnValue: 'clear'});
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 685);
for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 686);
instance.headerSelectlist = instance.addSelectlist(items, {command: 'heading', restoreCommand: 'insertParagraph', restoreValue: 'clear'}, function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 5)", 686);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 687);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        currentHeader,
                        i,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 693);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 694);
for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 695);
if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 697);
if (!currentHeader) {currentHeader=0;}
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 698);
instance.headerSelectlist.selectItem(currentHeader);
                }, null, true, {buttonWidth: 96});
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 702);
if (instance.get('btnBold')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 703);
instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 6)", 703);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 704);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));
                }, null, true);
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 708);
if (instance.get('btnItalic')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 709);
instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 7)", 709);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 710);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 714);
if (instance.get('btnUnderline')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 715);
instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 8)", 715);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 716);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 720);
if (instance.get('grpAlign')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 721);
buttons = [
                    {
                        iconClass : instance.ICON_ALIGN_LEFT,
                        command : 'JustifyLeft',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 726);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 727);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_CENTER,
                        command : 'JustifyCenter',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 734);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 735);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_RIGHT,
                        command : 'JustifyRight',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 742);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 743);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));
                                    }
                    }
                ];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 747);
if (instance.get('btnJustify')) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 748);
buttons.push({
                        iconClass : instance.ICON_ALIGN_JUSTIFY,
                        command : 'JustifyFull',
                        value : '',
                        syncFunc : function(e) {
                                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "syncFunc", 752);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 753);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));
                                    }
                    });
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 757);
instance.addButtongroup(buttons, true);
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 760);
if (instance.get('grpSubsuper')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 761);
instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 9)", 761);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 762);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 764);
instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 10)", 764);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 765);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 769);
if (instance.get('btnTextcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 770);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 771);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 772);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 773);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 774);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 776);
instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 11)", 776);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 777);
var instance = this,
                        styleColor = e.changedNode.getStyle('color'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 780);
instance.colorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 784);
if (instance.get('btnMarkcolor')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 785);
items = [];
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 786);
bgcolors = instance.get('colorPallet');
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 787);
for (i=0; i<bgcolors.length; i++) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 788);
bgcolor = bgcolors[i];
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 789);
items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 791);
instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 12)", 791);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 792);
var instance = this,
                        styleColor = e.changedNode.getStyle('backgroundColor'),
                        hexColor = instance._filter_rgb(styleColor);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 795);
instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 799);
if (instance.get('grpIndent')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 800);
instance.addButton(instance.ICON_INDENT, 'indent', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 801);
instance.addButton(instance.ICON_OUTDENT, 'outdent');
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 804);
if (instance.get('grpLists')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 805);
instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 13)", 805);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 806);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 810);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 811);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));
                }, null, true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 813);
instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 14)", 813);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 814);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 818);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 819);
e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 823);
if (instance.get('btnEmail')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 824);
instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 15)", 824);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 825);
var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isEmailLink,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 831);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 832);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 833);
if (isLink) {
                        // check if its a normal href or a mailto:
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 835);
while (node && !node.test('a')) {node=node.get('parentNode');}
                        // be carefull: do not === /match() with text, that will fail
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 837);
isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');
                    }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 839);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));
                }, null, true);
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 843);
if (instance.get('btnHyperlink')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 844);
instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 16)", 844);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 845);
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
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 856);
nodePosition = bodyhtml.indexOf(node.getHTML());
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 857);
isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 858);
if (isLink) {
                            // check if its a normal href or a mailto:
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 860);
while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 862);
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 863);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 864);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 865);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 866);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 867);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 868);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 872);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 876);
if (instance.get('btnImage')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 877);
instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 17)", 877);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 878);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));
                });
            }

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 882);
if (instance.get('btnVideo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 883);
instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 18)", 883);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 884);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));
                });
            }

//************************************************
// just for temporary local use ITS Asbreuk
// should NOT be part of the gallery
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 891);
if (false) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 892);
instance.addSyncButton(
                    instance.ICON_FILE,
                    {   customFunc: function(e) {
                            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "customFunc", 894);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 895);
Y.config.cmas2plus.uploader.show(
                                null, 
                                Y.bind(function(e) {
                                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 19)", 897);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 898);
this.editor.exec.command('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);
                                }, this)
                            );
                        }
                    },
                    function(e) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "(anonymous 20)", 903);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 904);
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
href = node.get('href');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 922);
isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 923);
if (isHyperLink) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 924);
lastDot = href.lastIndexOf('.');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 925);
if (lastDot!==-1) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 926);
fileExt = href.substring(lastDot)+'.';
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 927);
isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 931);
e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);
                    }
                );
            }
//************************************************

            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 937);
if (instance.get('grpUndoredo')) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 938);
instance.addButton(instance.ICON_UNDO, 'undo', true);
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 939);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_filter_rgb", 951);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 952);
if (css.toLowerCase().indexOf('rgb') != -1) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 953);
var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi");
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 954);
var rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(',');
            
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 956);
if (rgb.length === 5) {
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 957);
var r = parseInt(rgb[1], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 958);
var g = parseInt(rgb[2], 10).toString(16);
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 959);
var b = parseInt(rgb[3], 10).toString(16);

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 961);
r = r.length === 1 ? '0' + r : r;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 962);
g = g.length === 1 ? '0' + g : g;
                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 963);
b = b.length === 1 ? '0' + b : b;

                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 965);
css = "#" + r + g + b;
                }
            }
            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 968);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandFontSize", 986);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 989);
if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 990);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                   itsafontsize: function(cmd, val) {
                       _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsafontsize", 991);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 992);
var execCommandInstance = this,
                           editorY = execCommandInstance.get('host').getInstance(),
                           sel = new editorY.EditorSelection(),
                           newNodelist;
                       _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 996);
if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {
                           //We have a selection
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 998);
if (Y.UA.webkit) {
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 999);
if (sel.anchorNode.getStyle('lineHeight')) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1000);
sel.anchorNode.setStyle('lineHeight', '');
                                }
                            }
                            // first cleaning up old fontsize
                            // isn't done well !! there might be other tags than <span> that have fontSize declared
                            // And you should not wrap a new <span> when sel === previous <span>
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1006);
sel.anchorNode.all('span').setStyle('fontSize', '');
                            // create new wrapper <span style='font-size: val'>....</span>
                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>
                            // in that case you create a span wrapped on a previous span
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1010);
newNodelist = sel.wrapContent('span');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1011);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandHyperlink", 1031);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1032);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1033);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsacreatehyperlink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatehyperlink", 1036);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1037);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1046);
url = val || prompt('Enter url', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1047);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1048);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1049);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1050);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1051);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1052);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1053);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1054);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1055);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1056);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1058);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1059);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1060);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1062);
if (Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1063);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1064);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1065);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1071);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url + '" target="_blank">' + url + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1074);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandMaillink", 1085);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1086);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1087);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreatemaillink: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreatemaillink", 1088);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1089);
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
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1099);
url = val || prompt('Enter email', '');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1100);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1101);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1102);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1103);
urltext = url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1104);
url = 'mailto:' + url;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1105);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1106);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1107);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1108);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1109);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1110);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1111);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1113);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1114);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1115);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1117);
if (Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1118);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1119);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1120);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1126);
execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url+ '">' + urltext + '</a>');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1129);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandImage", 1140);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1141);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1142);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateimage: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateimage", 1143);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1144);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1153);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1154);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1155);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1156);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1157);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1158);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1159);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1160);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1161);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1162);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1163);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1165);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1166);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1167);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1169);
if (Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1170);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1171);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1172);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1178);
execCommandInstance.get('host').execCommand('inserthtml', '<img src="' + url + '" />');
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1181);
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
            _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "_defineExecCommandYouTube", 1192);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1193);
if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {
                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1194);
Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateyoutube: function(cmd, val) {
                        _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "itsacreateyoutube", 1195);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1196);
var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1205);
url = val || prompt('Enter link to image', 'http://');
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1206);
if (url) {
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1207);
holder = editorY.config.doc.createElement('div');
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1208);
url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1209);
url = editorY.config.doc.createTextNode(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1210);
holder.appendChild(url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1211);
url = holder.innerHTML;
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1212);
execCommandInstance.get('host')._execCommand('createlink', url);
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1213);
sel = new editorY.EditorSelection();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1214);
out = sel.getSelected();
                            _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1215);
if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1217);
a = out.item(0).one('a');
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1218);
if (a) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1219);
out.item(0).replace(a);
                                }
                                _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1221);
if (Y.UA.gecko) {
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1222);
if (a.get('parentNode').test('span')) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1223);
if (a.get('parentNode').one('br.yui-cursor')) {
                                           _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1224);
a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1230);
videoitempos = url.indexOf('watch?v=');
                                    _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1231);
if (videoitempos!==-1) {
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1232);
videoitem = url.substring(url.videoitempos+8);
                                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1233);
execCommandInstance.get('host').execCommand('inserthtml', '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + videoitem + '" frameborder="0" allowfullscreen></iframe>');
                                    }
                            }
                        }
                        _yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1237);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1254);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1255);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "setter", 1269);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1270);
return Y.one(val);
                },
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1272);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1273);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1286);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1287);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1300);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1301);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1323);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1324);
return (Lang.isArray(val));
                }
            },

            /**
             * @description Whether the button fontfamily is available<br>
             * Default = true
             * @attribute btnFontfamily
             * @type int
            */
            btnFontfamily : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1336);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1337);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button fontsize is available<br>
             * Default = true
             * @attribute btnFontsize
             * @type int
            */
            btnFontsize : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1349);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1350);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button headers is available<br>
             * because this function doesn't work well on all browsers, it is set of by default.<br>
             * Is something to work on in fututr releases. It works within firefox though.
             * Default = false
             * @attribute btnHeader
             * @type int
            */
            btnHeader : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1364);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1365);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button bold is available<br>
             * Default = true
             * @attribute btnBold
             * @type int
            */
            btnBold : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1377);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1378);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button italic is available<br>
             * Default = true
             * @attribute btnItalic
             * @type int
            */
            btnItalic : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1390);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1391);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button underline is available<br>
             * Default = true
             * @attribute btnUnderline
             * @type int
            */
            btnUnderline : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1403);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1404);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group align is available<br>
             * Default = true
             * @attribute grpAlign
             * @type int
            */
            grpAlign : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1416);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1417);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button justify is available<br>
             * will only be shown in combination with grpalign
             * Default = true
             * @attribute btnJustify
             * @type int
            */
            btnJustify : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1430);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1431);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group sub/superscript is available<br>
             * Default = true
             * @attribute grpSubsuper
             * @type int
            */
            grpSubsuper : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1443);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1444);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button textcolor is available<br>
             * Default = true
             * @attribute btnTextcolor
             * @type int
            */
            btnTextcolor : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1456);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1457);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button markcolor is available<br>
             * Default = true
             * @attribute btnMarkcolor
             * @type int
            */
            btnMarkcolor : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1469);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1470);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group indent is available<br>
             * Default = true
             * @attribute grpIndent
             * @type int
            */
            grpIndent : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1482);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1483);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the group lists is available<br>
             * Default = true
             * @attribute grpLists
             * @type int
            */
            grpLists : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1495);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1496);
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
             * @type int
            */
            grpUndoredo : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1522);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1523);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button email is available<br>
             * Default = true
             * @attribute btnEmail
             * @type int
            */
            btnEmail : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1535);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1536);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button hyperlink is available<br>
             * Default = true
             * @attribute btnHyperlink
             * @type int
            */
            btnHyperlink : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1548);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1549);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button image is available<br>
             * because this code needs to be developed in a better way, the function is disabled by default.<br>
             * It works in a simple way though.
             * Default = false
             * @attribute btnImage
             * @type int
            */
            btnImage : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1563);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1564);
return Lang.isBoolean(val);
                }
            },

            /**
             * @description Whether the button video is available<br>
             * because this code needs to be developed in a better way, the function is disabled by default.<br>
             * It works in a simple way though. The end-user should enter a youtube-link once they click on this button.
             * Default = false
             * @attribute btnVideo
             * @type int
            */
            btnVideo : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1578);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1579);
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
                    _yuitest_coverfunc("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", "validator", 1735);
_yuitest_coverline("/build/gallery-itsatoolbar/gallery-itsatoolbar.js", 1736);
return Lang.isArray(val) ;
                }

            }
        }
    }
);


}, '@VERSION@' ,{requires:['plugin', 'base-build', 'node-base', 'editor', 'event-delegate', 'event-custom', 'cssbutton', 'gallery-itsaselectlist'], skinnable:true});
