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
            Y.log('initializer', 'info', 'ITSAToolbar');
            var instance = this;
            instance.editor = instance.get('host');
            // need to make sure we can use execCommand, so do not render before the frame exists.
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
            Y.log('_render', 'info', 'ITSAToolbar');
            var instance = this;
            if (!instance._destroyed) {
                instance.editorY = instance.editor.getInstance();
                instance.editorNode = instance.editor.frame.get('node');
                instance.containerNode = instance.editorNode.get('parentNode');
                instance.get('paraSupport') ? instance.editor.plug(Y.Plugin.EditorPara) : instance.editor.plug(Y.Plugin.EditorBR);
                instance.editor.plug(Y.Plugin.ExecCommand);
                instance._defineCustomExecCommands();
                instance._renderUI();
                instance._bindUI();
                // first time: fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object
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
            Y.log('_initStatus', 'info', 'ITSAToolbar');
            // Fire a statusChange with a e.changedNode to sync the toolbox with the editors-event object
            var instance = this;
                node = instance._getCursorRef();
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
            Y.log('_getCursorRef', 'info', 'ITSAToolbar');
            var instance = this,
                sel,
                out,
                node;
            sel = new instance.editorY.EditorSelection();
            out = sel.getSelected();
            if (!sel.isCollapsed && out.size()) {
                //We have a selection
                node = out.item(0);
            }
            else {
                // insert cursor and use that node as the selected node
                // first remove previous
                instance._removeRefNode();
                instance.editor.exec.command('inserthtml', ITSA_REFNODE);
                node = instance.editorY.one('#itsatoolbar-ref');
            }
            return node;
        },

        /**
         * Removes temporary created cursor-ref-Node that might have been created by _getCursorRef
         * @method _removeRefNode
         * @private
        */
        _removeRefNode : function() {
            Y.log('_removeRefNode', 'info', 'ITSAToolbar');
            var instance = this,
                node,
                useY;
            // because it can be called when editorY is already destroyed, you need to take Y-instance instead of editorY in those cases
            useY = instance.editorY ? instance.editorY : Y;
            node = useY.all('#itsatoolbar-ref');
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
            Y.log('sync', 'info', 'ITSAToolbar');
            var instance = this;
            if (e) {
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
            Y.log('addButton', 'info', 'ITSAToolbar');
            var instance = this,
                buttonNode,
                buttonInnerNode;
            buttonNode = Node.create(ITSA_BTNNODE);
            buttonNode.addClass(ITSA_BUTTON);
            if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
            else if (Lang.isObject(execCommand)) {
                if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}
                if (Lang.isString(execCommand.value)) {buttonNode.setData('execValue', execCommand.value);}
                if (Lang.isFunction(execCommand.customFunc)) {
                    buttonNode.addClass(ITSA_BTNCUSTOMFUNC);
                    buttonNode.on('click', execCommand.customFunc, execCommand.context || instance);
                }
            }
            if (Lang.isBoolean(indent) && indent) {buttonNode.addClass(ITSA_BTNINDENT);}
            buttonInnerNode = Node.create(ITSA_BTNINNERNODE);
            buttonInnerNode.addClass(iconClass);
            buttonNode.append(buttonInnerNode);
            instance.toolbarNode.append(buttonNode);
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
            Y.log('addSyncButton', 'info', 'ITSAToolbar');
            var instance = this,
                buttonNode = instance.addButton(iconClass, execCommand, indent, position);
            if (!isToggleButton) {buttonNode.addClass(ITSA_BTNSYNC);}
            instance.toolbarNode.addTarget(buttonNode);
            if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
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
            Y.log('addToggleButton', 'info', 'ITSAToolbar');
            var instance = this,
                buttonNode = instance.addSyncButton(iconClass, execCommand, syncFunc, context, indent, position, true);
            buttonNode.addClass(ITSA_BTNTOGGLE);
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
            Y.log('addButtongroup', 'info', 'ITSAToolbar');
            var instance = this,
                buttonGroup = Y.guid(),
                button,
                buttonNode,
                returnNode = null,
                execCommand,
                i;
            for (i=0; i<buttons.length; i++) {
                button = buttons[i];
                if (button.iconClass && button.command) {
                    if (Lang.isString(button.value)) {execCommand = {command: button.command, value: button.value};}
                    else {execCommand = button.command;}
                    buttonNode = instance.addButton(button.iconClass, execCommand, indent && (i===0), (position) ? position+i : null);
                    buttonNode.addClass(ITSA_BTNGROUP);
                    buttonNode.addClass(ITSA_BTNGROUP+'-'+buttonGroup);
                    buttonNode.setData('buttongroup', buttonGroup);
                    instance.toolbarNode.addTarget(buttonNode);
                    if (Lang.isFunction(button.syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(button.syncFunc, button.context || instance));}
                    if (!returnNode) {returnNode = buttonNode;}
                }
            }
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
            Y.log('addSelectlist', 'info', 'ITSAToolbar');
            var instance = this,
                selectlist;
            config = Y.merge(config, {items: items, defaultButtonText: ''});
            selectlist = new Y.ITSASelectList(config);
            selectlist.after('render', function(e, execCommand, syncFunc, context, indent){
                Y.log('addSelectlist - rendered', 'cmas', 'ITSAToolbar');
                var instance = this,
                    selectlist = e.currentTarget,
                    buttonNode = selectlist.buttonNode;
                if (Lang.isString(execCommand)) {buttonNode.setData('execCommand', execCommand);}
                else {
                    if (Lang.isString(execCommand.command)) {buttonNode.setData('execCommand', execCommand.command);}                    
                    if (Lang.isString(execCommand.restoreCommand)) {buttonNode.setData('restoreCommand', execCommand.restoreCommand);}                    
                    if (Lang.isString(execCommand.restoreValue)) {buttonNode.setData('restoreValue', execCommand.restoreValue);}                    
                }
                if (indent) {selectlist.get('boundingBox').addClass('itsa-button-indent');}
                instance.toolbarNode.addTarget(buttonNode);
                selectlist.on('selectChange', instance._handleSelectChange, instance);
                if (Lang.isFunction(syncFunc)) {buttonNode.on('itsatoolbar:statusChange', Y.bind(syncFunc, context || instance));}
                instance.editor.on('nodeChange', selectlist.hideListbox, selectlist);
            }, instance, execCommand, syncFunc, context, indent);
            selectlist.render(instance.toolbarNode);
            return selectlist;
        },


        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'info', 'ITSAToolbar');
            var instance = this,
                srcNode = instance.get('srcNode');
             // first, set _notDestroyed to false --> this will prevent rendering if editor.frame:ready fires after toolbars destruction
            instance._destroyed = true;
            instance._removeRefNode();
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
            Y.log('_renderUI', 'info', 'ITSAToolbar');
            var instance = this,
                srcNode = instance.get('srcNode'),
                btnSize = instance.get('btnSize');
            // be sure that its.yui3-widget-loading, because display:none will make it impossible to calculate size of nodes during rendering
            instance.toolbarNode = Node.create(ITSA_TOOLBAR_TEMPLATE);
            if (btnSize===1) {instance.toolbarNode.addClass(ITSA_TOOLBAR_SMALL);}
            else {if (btnSize===2) {instance.toolbarNode.addClass(ITSA_TOOLBAR_MEDIUM);}}
            if (srcNode) {
                srcNode.prepend(instance.toolbarNode);
            }
            else {
                instance.toolbarNode.addClass(ITSA_CLASSEDITORPART);
                instance.editorNode.set('height', parseInt(instance.containerNode.getStyle('height'),10)-parseInt(instance.toolbarNode.getStyle('height'),10)+'px');
                instance.editorNode.insert(instance.toolbarNode, 'before');
            }
            instance._initializeButtons();
        },
        
        /**
         * Binds events when there is a cursorstatus changes in the editor
         *
         * @method _bindUI
         * @private
        */
        _bindUI : function() {
            Y.log('_bindUI', 'info', 'ITSAToolbar');
            var instance = this;
            instance.editor.on('nodeChange', instance.sync, instance);
            instance.toolbarNode.delegate('click', instance._handleBtnClick, 'button', instance);
        },

        /**
         * Defines all custom execCommands
         *
         * @method _defineCustomExecCommands
         * @private
        */
        _defineCustomExecCommands : function() {
            Y.log('_defineCustomExecCommands', 'info', 'ITSAToolbar');
            var instance = this;
            instance._defineExecCommandFontSize();
            instance._defineExecCommandHyperlink();
            instance._defineExecCommandMaillink();
            instance._defineExecCommandImage();
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
            Y.log('_handleBtnClick', 'info', 'ITSAToolbar');
            var instance = this,
                node = e.currentTarget;
            // only execute for .itsa-button, not for all buttontags    
            if (node.hasClass(ITSA_BUTTON)) {
                if (node.hasClass(ITSA_BTNTOGGLE)) {
                    node.toggleClass(ITSA_BTNPRESSED);
                }
                else if (node.hasClass(ITSA_BTNSYNC)) {
                    node.toggleClass(ITSA_BTNACTIVE, true);
                }
                else if (node.hasClass(ITSA_BTNGROUP)) {
                    instance.toolbarNode.all('.' + ITSA_BTNGROUP + '-' + node.getData('buttongroup')).toggleClass(ITSA_BTNPRESSED, false);
                    node.toggleClass(ITSA_BTNPRESSED, true);
                }
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
            Y.log('execCommand', 'info', 'ITSAToolbar');
            var execCommand,
                execValue;
            execCommand = buttonNode.getData('execCommand');
            execValue = buttonNode.getData('execValue');
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
            Y.log('_handleSelectChange', 'info', 'ITSAToolbar');
            var selectButtonNode,
                restoreCommand,
                execCommand;
            selectButtonNode = e.currentTarget.buttonNode;
            restoreCommand = selectButtonNode.getData('restoreCommand');
            execCommand = (restoreCommand && (e.value===selectButtonNode.getData('restoreValue'))) ? restoreCommand : selectButtonNode.getData('execCommand');
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
            Y.log('_checkInbetweenHeader', 'info', 'ITSAToolbar');
            var instance = this,
                pattern = '<\s*' + selector + '[^>]*>(.*?)<\s*/\s*' + selector  + '>',
                searchHeaderPattern = new RegExp(pattern, 'gi'), 
                fragment, 
                inbetween = false;
            fragment = searchHeaderPattern.exec(refContent);
            while ((fragment !== null) && !inbetween) {
                inbetween = ((cursorindex>fragment.index) && (cursorindex<(fragment.index+fragment[0].length)));
                fragment = searchHeaderPattern.exec(refContent); // next search
            }
            return inbetween;
        },

        /**
         * Performs the initialisation of the visible buttons. By setting the attributes, one can change which buttons will be rendered.
         *
         * @method _initializeButtons
         * @private
        */
        _initializeButtons : function() { 
            Y.log('_initializeButtons', 'info', 'ITSAToolbar');
            var instance = this,
                i, r, g, b,
                item,
                items,
                bgcolor,
                docFontSize,
                bgcolors,
                buttons;

            // create fonffamily button
            if (instance.get('btnFontfamily')) {
                Y.log('Defining button btnFontfamily', 'info', 'ITSAToolbar');
                items = instance.get('fontFamilies');
                for (i=0; i<items.length; i++) {
                    item = items[i];
                    items[i] = {text: "<span style='font-family:"+item+"'>"+item+"</span>", returnValue: item};
                }
                instance.fontSelectlist = instance.addSelectlist(items, 'fontname2', function(e) {
                    var familyList = e.changedNode.getStyle('fontFamily'),
                        familyListArray = familyList.split(','),
                        activeFamily = familyListArray[0];
                    this.fontSelectlist.selectItemByValue(activeFamily, true, true);
                }, null, true, {buttonWidth: 145});
            }

            // create fontsize button
            if (instance.get('btnFontsize')) {
                Y.log('Defining button btnFontsize', 'info', 'ITSAToolbar');
                items = [];
                for (i=6; i<=32; i++) {items.push({text: i.toString(), returnValue: i+'px'});}
                instance.sizeSelectlist = instance.addSelectlist(items, 'itsafontsize', function(e) {
                    var fontSize = e.changedNode.getStyle('fontSize'),
                        fontSizeNumber = parseFloat(fontSize),
                        fontsizeExt = fontSize.substring(fontSizeNumber.toString().length);
                    // make sure not to display partial numbers    
                    this.sizeSelectlist.selectItemByValue(Math.round(fontSizeNumber)+fontsizeExt, true);
                }, null, true, {buttonWidth: 42, className: 'itsatoolbar-fontsize', listAlignLeft: false});
            }

            // create header button
            if (instance.get('btnHeader')) {
                Y.log('Defining button btnHeader', 'info', 'ITSAToolbar');
                items = [];
                items.push({text: 'No header', returnValue: 'clear'});
                for (i=1; i<=instance.get('headerLevels'); i++) {items.push({text: 'Header '+i, returnValue: 'h'+i});}
                instance.headerSelectlist = instance.addSelectlist(items, {command: 'heading', restoreCommand: 'insertParagraph', restoreValue: 'clear'}, function(e) {
                    var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        currentHeader,
                        i,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    nodePosition = bodyhtml.indexOf(node.getHTML());
                    for (i=1; (!currentHeader && (i<=instance.get('headerLevels'))); i++) {
                        if (instance._checkInbetweenSelector('h'+i, bodyhtml, nodePosition)) {currentHeader = i;}
                    }
                    if (!currentHeader) {currentHeader=0;}
                    instance.headerSelectlist.selectItem(currentHeader);
                }, null, true, {buttonWidth: 96});
            }

            // create bold button
            if (instance.get('btnBold')) {
                Y.log('Defining button btnBold', 'info', 'ITSAToolbar');
                instance.addToggleButton(instance.ICON_BOLD, 'bold', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontWeight')==='bold'));
                }, null, true);
            }

            // create italic button
            if (instance.get('btnItalic')) {
                Y.log('Defining button btnItalic', 'info', 'ITSAToolbar');
                instance.addToggleButton(instance.ICON_ITALIC, 'italic', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('fontStyle')==='italic'));
                });
            }

            // create underline button
            if (instance.get('btnUnderline')) {
                Y.log('Defining button btnUnderline', 'info', 'ITSAToolbar');
                instance.addToggleButton(instance.ICON_UNDERLINE, 'underline', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textDecoration')==='underline'));
                });
            }

            // create align buttons
            if (instance.get('grpAlign')) {
                Y.log('Defining buttongroup grpAlign', 'info', 'ITSAToolbar');
                buttons = [
                    {
                        iconClass : instance.ICON_ALIGN_LEFT,
                        command : 'JustifyLeft',
                        value : '',
                        syncFunc : function(e) {
                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, ((e.changedNode.getStyle('textAlign')==='left') || (e.changedNode.getStyle('textAlign')==='start')));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_CENTER,
                        command : 'JustifyCenter',
                        value : '',
                        syncFunc : function(e) {
                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='center'));
                                    }
                    },
                    {
                        iconClass : instance.ICON_ALIGN_RIGHT,
                        command : 'JustifyRight',
                        value : '',
                        syncFunc : function(e) {
                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='right'));
                                    }
                    }
                ];
            // create justify button
                if (instance.get('btnJustify')) {
                    Y.log('Defining button btnJustify', 'info', 'ITSAToolbar');
                    buttons.push({
                        iconClass : instance.ICON_ALIGN_JUSTIFY,
                        command : 'JustifyFull',
                        value : '',
                        syncFunc : function(e) {
                                       e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.getStyle('textAlign')==='justify'));
                                    }
                    });
                }
                instance.addButtongroup(buttons, true);
            }

            // create subsuperscript buttons
            if (instance.get('grpSubsuper')) {
                Y.log('Defining buttongroup grpSubsuper', 'info', 'ITSAToolbar');
                instance.addToggleButton(instance.ICON_SUBSCRIPT, 'subscript', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sub')));
                }, null, true);
                instance.addToggleButton(instance.ICON_SUPERSCRIPT, 'superscript', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (e.changedNode.test('sup')));
                });
            }

            // create textcolor button
            if (instance.get('btnTextcolor')) {
                Y.log('Defining button btnTextcolor', 'info', 'ITSAToolbar');
                items = [];
                bgcolors = instance.get('colorPallet');
                for (i=0; i<bgcolors.length; i++) {
                    bgcolor = bgcolors[i];
                    items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                instance.colorSelectlist = instance.addSelectlist(items, 'forecolor', function(e) {
                    var instance = this,
                        styleColor = e.changedNode.getStyle('color'),
                        hexColor = instance._filter_rgb(styleColor);
                    instance.colorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_TEXTCOLOR});
            }

            // create markcolor button
            if (instance.get('btnMarkcolor')) {
                Y.log('Defining button btnMarkcolor', 'info', 'ITSAToolbar');
                items = [];
                bgcolors = instance.get('colorPallet');
                for (i=0; i<bgcolors.length; i++) {
                    bgcolor = bgcolors[i];
                    items.push({text: "<div style='background-color:"+bgcolor+";'></div>", returnValue: bgcolor});
                }
                instance.markcolorSelectlist = instance.addSelectlist(items, 'hilitecolor', function(e) {
                    var instance = this,
                        styleColor = e.changedNode.getStyle('backgroundColor'),
                        hexColor = instance._filter_rgb(styleColor);
                    instance.markcolorSelectlist.selectItemByValue(hexColor, true, true);
                }, null, true, {listWidth: 256, className: 'itsatoolbar-colors', iconClassName: instance.ICON_MARKCOLOR});
            }

            // create indent buttons
            if (instance.get('grpIndent')) {
                Y.log('Defining buttongroup grpIndent', 'info', 'ITSAToolbar');
                instance.addButton(instance.ICON_INDENT, 'indent', true);
                instance.addButton(instance.ICON_OUTDENT, 'outdent');
            }

            // create list buttons
            if (instance.get('grpLists')) {
                Y.log('Defining buttongroup grpLists', 'info', 'ITSAToolbar');
                instance.addToggleButton(instance.ICON_UNORDEREDLIST, 'insertunorderedlist', function(e) {
                    var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    nodePosition = bodyhtml.indexOf(node.getHTML());
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ul', bodyhtml, nodePosition)));
                }, null, true);
                instance.addToggleButton(instance.ICON_ORDEREDLIST, 'insertorderedlist', function(e) {
                    var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    nodePosition = bodyhtml.indexOf(node.getHTML());
                    e.currentTarget.toggleClass(ITSA_BTNPRESSED, (instance._checkInbetweenSelector('ol', bodyhtml, nodePosition)));
                });
            }

            // create email button
            if (instance.get('btnEmail')) {
                Y.log('Defining button btnEmail', 'info', 'ITSAToolbar');
                instance.addSyncButton(instance.ICON_EMAIL, 'itsacreatemaillink', function(e) {
                    var instance = this,
                        node = e.changedNode,
                        nodePosition,
                        isLink,
                        isEmailLink,
                        bodyhtml = instance.editorY.one('body').getHTML();
                    nodePosition = bodyhtml.indexOf(node.getHTML());
                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                    if (isLink) {
                        // check if its a normal href or a mailto:
                        while (node && !node.test('a')) {node=node.get('parentNode');}
                        // be carefull: do not === /match() with text, that will fail
                        isEmailLink = (node.get('href').match('^mailto:', 'i')=='mailto:');
                    }
                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isEmailLink));
                }, null, true);
            }

            // create hyperlink button
            if (instance.get('btnHyperlink')) {
                Y.log('Defining button btnHyperlink', 'info', 'ITSAToolbar');
                instance.addSyncButton(instance.ICON_HYPERLINK, 'itsacreatehyperlink', function(e) {
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
                    nodePosition = bodyhtml.indexOf(node.getHTML());
                    isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        if (isLink) {
                            // check if its a normal href or a mailto:
                            while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            href = node.get('href');
                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            if (isHyperLink) {
                                lastDot = href.lastIndexOf('.');
                                if (lastDot!==-1) {
                                    fileExt = href.substring(lastDot)+'.';
                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (isLink && isHyperLink && !isFileLink));
                });
            }

            // create image button
            if (instance.get('btnImage')) {
                Y.log('Defining button btnImage', 'info', 'ITSAToolbar');
                instance.addSyncButton(instance.ICON_IMAGE, 'itsacreateimage', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('img')));
                });
            }

            // create video button
            if (instance.get('btnVideo')) {
                Y.log('Defining button btnVideo', 'info', 'ITSAToolbar');
                instance.addSyncButton(instance.ICON_VIDEO, 'itsacreateyoutube', function(e) {
                    e.currentTarget.toggleClass(ITSA_BTNACTIVE, (e.changedNode.test('iframe')));
                });
            }

//************************************************
// just for temporary local use ITS Asbreuk
// should NOT be part of the gallery
            if (false) {
                instance.addSyncButton(
                    instance.ICON_FILE,
                    {   customFunc: function(e) {
                            Y.config.cmas2plus.uploader.show(
                                null, 
                                Y.bind(function(e) {
                                    this.editor.exec.command('itsacreatehyperlink', 'http://files.brongegevens.nl/' + Y.config.cmas2plusdomain + '/' + e.n);
                                }, this)
                            );
                        }
                    },
                    function(e) {
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
                        nodePosition = bodyhtml.indexOf(node.getHTML());
                        isLink =  instance._checkInbetweenSelector('a', bodyhtml, nodePosition);
                        if (isLink) {
                            // check if its a normal href or a mailto:
                            while (node && !node.test('a')) {node=node.get('parentNode');}
                            // be carefull: do not === /match() with text, that will fail
                            href = node.get('href');
                            isHyperLink = href.match('^mailto:', 'i')!='mailto:';
                            if (isHyperLink) {
                                lastDot = href.lastIndexOf('.');
                                if (lastDot!==-1) {
                                    fileExt = href.substring(lastDot)+'.';
                                    isFileLink = (posibleFiles.indexOf(fileExt) !== -1);
                                }
                            }
                        }
                        e.currentTarget.toggleClass(ITSA_BTNACTIVE, isFileLink);
                    }
                );
            }
//************************************************

            if (instance.get('grpUndoredo')) {
                Y.log('Defining buttongroup grpundoredo', 'info', 'ITSAToolbar');
                instance.addButton(instance.ICON_UNDO, 'undo', true);
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
            Y.log('_filter_rgb', 'info', 'ITSAToolbar');
            if (css.toLowerCase().indexOf('rgb') != -1) {
                var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi");
                var rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(',');
            
                if (rgb.length === 5) {
                    var r = parseInt(rgb[1], 10).toString(16);
                    var g = parseInt(rgb[2], 10).toString(16);
                    var b = parseInt(rgb[3], 10).toString(16);

                    r = r.length === 1 ? '0' + r : r;
                    g = g.length === 1 ? '0' + g : g;
                    b = b.length === 1 ? '0' + b : b;

                    css = "#" + r + g + b;
                }
            }
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
            Y.log('_defineExecCommandFontSize', 'info', 'ITSAToolbar');
            // This function seriously needs redesigned.
            // it does work, but as you can see in the comment, there are some flaws
            if (!Y.Plugin.ExecCommand.COMMANDS.itsafontsize) {
                Y.log('declaring Y.Plugin.ExecCommand.COMMANDS.itsafontsize', 'info', 'ITSAToolbar');
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                   itsafontsize: function(cmd, val) {
                       var execCommandInstance = this,
                           editorY = execCommandInstance.get('host').getInstance(),
                           sel = new editorY.EditorSelection(),
                           newNodelist;
                       if (!sel.isCollapsed  && sel.anchorNode && (execCommandInstance._lastKey !== 32)) {
                           //We have a selection
                            if (Y.UA.webkit) {
                                if (sel.anchorNode.getStyle('lineHeight')) {
                                    sel.anchorNode.setStyle('lineHeight', '');
                                }
                            }
                            // first cleaning up old fontsize
                            // isn't done well !! there might be other tags than <span> that have fontSize declared
                            // And you should not wrap a new <span> when sel === previous <span>
                            sel.anchorNode.all('span').setStyle('fontSize', '');
                            // create new wrapper <span style='font-size: val'>....</span>
                            // isn't done well !! you might disturbe the html when sel already is previous <span style='font-size: val'>....</span>
                            // in that case you create a span wrapped on a previous span
                            newNodelist = sel.wrapContent('span');
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
            Y.log('_defineExecCommandHyperlink', 'info', 'ITSAToolbar');
            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink) {
                Y.log('declaring Y.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink', 'info', 'ITSAToolbar');
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    // val can be:
                    // 'img', 'url', 'video', 'email'
                    itsacreatehyperlink: function(cmd, val) {
                        var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        url = val || prompt('Enter url', 'http://');
                        if (url) {
                            holder = editorY.config.doc.createElement('div');
                            url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            url = editorY.config.doc.createTextNode(url);
                            holder.appendChild(url);
                            url = holder.innerHTML;
                            execCommandInstance.get('host')._execCommand('createlink', url);
                            sel = new editorY.EditorSelection();
                            out = sel.getSelected();
                            if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                a = out.item(0).one('a');
                                if (a) {
                                    out.item(0).replace(a);
                                }
                                if (a && Y.UA.gecko) {
                                    if (a.get('parentNode').test('span')) {
                                        if (a.get('parentNode').one('br.yui-cursor')) {
                                           a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url + '" target="_blank">' + url + '</a>');
                            }
                        }
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
            Y.log('_defineExecCommandMaillink', 'info', 'ITSAToolbar');
            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink) {
                Y.log('declaring Y.Plugin.ExecCommand.COMMANDS.itsacreatemaillink', 'info', 'ITSAToolbar');
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreatemaillink: function(cmd, val) {
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
                        url = val || prompt('Enter email', '');
                        if (url) {
                            holder = editorY.config.doc.createElement('div');
                            url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            urltext = url;
                            url = 'mailto:' + url;
                            url = editorY.config.doc.createTextNode(url);
                            holder.appendChild(url);
                            url = holder.innerHTML;
                            execCommandInstance.get('host')._execCommand('createlink', url);
                            sel = new editorY.EditorSelection();
                            out = sel.getSelected();
                            if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                a = out.item(0).one('a');
                                if (a) {
                                    out.item(0).replace(a);
                                }
                                if (a && Y.UA.gecko) {
                                    if (a.get('parentNode').test('span')) {
                                        if (a.get('parentNode').one('br.yui-cursor')) {
                                           a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                execCommandInstance.get('host').execCommand('inserthtml', '<a href="' + url+ '">' + urltext + '</a>');
                            }
                        }
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
            Y.log('_defineExecCommandImage', 'info', 'ITSAToolbar');
            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateimage) {
                Y.log('declaring Y.Plugin.ExecCommand.COMMANDS.itsacreateimage', 'info', 'ITSAToolbar');
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateimage: function(cmd, val) {
                        var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        url = val || prompt('Enter link to image', 'http://');
                        if (url) {
                            holder = editorY.config.doc.createElement('div');
                            url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            url = editorY.config.doc.createTextNode(url);
                            holder.appendChild(url);
                            url = holder.innerHTML;
                            execCommandInstance.get('host')._execCommand('createlink', url);
                            sel = new editorY.EditorSelection();
                            out = sel.getSelected();
                            if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                a = out.item(0).one('a');
                                if (a) {
                                    out.item(0).replace(a);
                                }
                                if (a && Y.UA.gecko) {
                                    if (a.get('parentNode').test('span')) {
                                        if (a.get('parentNode').one('br.yui-cursor')) {
                                           a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                execCommandInstance.get('host').execCommand('inserthtml', '<img src="' + url + '" />');
                            }
                        }
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
            Y.log('_defineExecCommandYouTube', 'info', 'ITSAToolbar');
            if (!Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube) {
                Y.log('declaring Y.Plugin.ExecCommand.COMMANDS.itsacreateyoutube', 'info', 'ITSAToolbar');
                Y.mix(Y.Plugin.ExecCommand.COMMANDS, {
                    itsacreateyoutube: function(cmd, val) {
                        var execCommandInstance = this,
                            editorY = execCommandInstance.get('host').getInstance(),
                            out, 
                            a, 
                            sel, 
                            holder, 
                            url, 
                            videoitem, 
                            videoitempos;
                        url = val || prompt('Enter link to image', 'http://');
                        if (url) {
                            holder = editorY.config.doc.createElement('div');
                            url = url.replace(/"/g, '').replace(/'/g, ''); //Remove single & double quotes
                            url = editorY.config.doc.createTextNode(url);
                            holder.appendChild(url);
                            url = holder.innerHTML;
                            execCommandInstance.get('host')._execCommand('createlink', url);
                            sel = new editorY.EditorSelection();
                            out = sel.getSelected();
                            if (!sel.isCollapsed && out.size()) {
                                //We have a selection
                                a = out.item(0).one('a');
                                if (a) {
                                    out.item(0).replace(a);
                                }
                                if (a && Y.UA.gecko) {
                                    if (a.get('parentNode').test('span')) {
                                        if (a.get('parentNode').one('br.yui-cursor')) {
                                           a.get('parentNode').insert(a, 'before');
                                        }
                                    }
                                }
                            } else {
                                //No selection, insert a new node..
                                    videoitempos = url.indexOf('watch?v=');
                                    if (videoitempos!==-1) {
                                        videoitem = url.substring(url.videoitempos+8);
                                        execCommandInstance.get('host').execCommand('inserthtml', '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + videoitem + '" frameborder="0" allowfullscreen></iframe>');
                                    }
                            }
                        }
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
                    return Y.one(val);
                },
                validator: function(val) {
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
                    return Lang.isArray(val) ;
                }

            }
        }
    }
);
