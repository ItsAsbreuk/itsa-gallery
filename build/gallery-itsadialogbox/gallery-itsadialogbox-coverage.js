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
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/gallery-itsadialogbox/gallery-itsadialogbox.js",
    code: []
};
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"].code=["YUI.add('gallery-itsadialogbox', function(Y) {","","'use strict';","","// TO DO:","// wait for show until the widget is rendered","// When form is disabled, the cancelbutton doesn only close when pressed twice","","/**"," * The Itsa Dialogbox module."," *"," * @module itsa-dialogbox"," */","","/**"," * Dialogbox with sugar messages"," * "," *"," * @class ITSADialogbox"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    ITSADIALOG_ICON_TEMPLATE = \"<div class='itsadialogbox-icon {iconclass}'></div>\",","    ITSADIALOG_BODY_TEMPLATE = \"<div{bdclass}>{bdtext}</div>\",","    ITSADIALOG_INLINEFORM = \"itsa-dialog-inlineform\";","","Y.ITSADIALOGBOX = Y.Base.create('itsadialogbox', Y.Panel, [], {","","        ICON_BUBBLE : 'icon-bubble',","        ICON_INFO : 'icon-info',","        ICON_QUESTION : 'icon-question',","        ICON_WARN : 'icon-warn',","        ICON_ERROR : 'icon-error',","        ICON_SUCCESS : 'icon-success',","        ACTION_HIDE : '_actionHide',","        ACTION_STAYALIVE : '_actionStayAlive',","        ACTION_RESET : '_actionReset',","        ACTION_CLEAR : '_actionClear',","        panelOptions : [], ","        _activePanelOption : null,","        _validationButtons : null,","        _descendantChange : 0,","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property ICON_BUBBLE"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_INFO"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_QUESTION"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_WARN"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_ERROR"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_SUCCESS"," * @type String"," */","","/**"," * Reference to the hide-function that can be attached to button.action. This function closes the Panel and executes the callback."," * @property ACTION_HIDE"," * @type String"," */","","/**"," * Reference to the stayalive-function that can be attached to button.action. This function just execute the callback, but the Panel stays alive. In need you just want to read the Panel-values."," * @property ACTION_STAYALIVE"," * @type String"," */","","/**"," * Reference to the clear-function that can be attached to button.action. This function will clear any form-elements."," * @property ACTION_CLEAR"," * @type String"," */","","/**"," * Reference to the reset-function that can be attached to button.action. This function will reset any form-elements."," * @property ACTION_RESET"," * @type String"," */","","/**"," * Internal Array that holds all registred paneloptions, created through definePanel()"," * @property panelOptions"," * @type Array"," */","","/**"," * Internal reference to the active panelOptions (which is active after showPanel() is called"," * @property _activePanelOption"," * @type Object"," */","","/**"," * Nodelist that contains all current (from _activePanelOption) buttons that have button.validated set to true."," * @property _validationButtons"," * @type Y.NodeList"," */","","/**"," * Internal count that keeps track of how many times a descendentChange has been taken place by the focusManager"," * @property _descendantChange"," * @type Int"," */","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {","                descendants: 'button, input, textarea',","                circular: true,","                focusClass: 'focus'","            });","            instance._initiatePanels();","        },","","        /**","         * Defines a new Panel and stores it to the panelOptions-Array. Returns an panelId that can be used sot show the Panel later on using showPanel(panelId).<br>","         * PanelOptions is an object that can have the following fields:<br>","           <ul><li>iconClass (String) className for the icon, for example Y.Global.ItsaDialog.ICON_QUESTION</li>","               <li>form (Array) Array with objects that will be transformed to Y.FORMELEMENT objects (not currently available)</li>","               <li>buttons (Object) Which buttons to use. For example:","               <br>&nbsp;&nbsp;{","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;footer: [","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'cancel', label:'Cancel', action: Y.Global.ItsaDialog.ACTION_HIDE},","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'ok', label:'Ok', action: Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}    ","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;]","               &nbsp;&nbsp;}","               </li>    ","            </ul>    ","            <br><br>","            You can use 4 actionfunctions to attach at the button: Y.Global.ItsaDialog.ACTION_HIDE, Y.Global.ItsaDialog.ACTION_STAYALIVE, Y.Global.ItsaDialog.ACTION_RESET and Y.Global.ItsaDialog.ACTION_CLEAR","         * @method definePanel","         * @param {Object} panelOptions The config-object.","         * @return {Integer} unique panelId","        */","        definePanel: function(panelOptions) {","            var instance = this;","            if (Lang.isObject(panelOptions)) {","                instance.panelOptions.push(panelOptions);","                return instance.panelOptions.length - 1;","            }","            else {","                return -1;","            }","        },","","        /**","         * Shows the panel when you have a panelId. For usage with custom panels. The sugarmethods (showMessage() f.i.) use this method under the hood).","         *","         * @method showPanel","         * @param {Int} panelId Id of the panel that has to be shown. Retreive this value during definePanel()","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} [bodyText] showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want custom buttons that differ from those defined during definePanel.","         * @param {String} [customIconclass] In case you want to use an iconclass that is different from to one defined during definePanel. Example: Y.Global.ItsaDialog.ICON_WARN","         * @param {Object} [eventArgs] do not use, only internal (temporarely)","        */","        showPanel: function(panelId, title, bodyText, callback, context, args, customButtons, customIconclass, eventArgs) {","            var instance = this,","                iconClass,","                contentBox = instance.get('contentBox');","            if ((panelId>=0) && (panelId<instance.panelOptions.length)) {","                instance._activePanelOption = instance.panelOptions[panelId];","                iconClass = customIconclass || instance._activePanelOption.iconClass;","                instance.get('boundingBox').toggleClass('withicon', Lang.isString(iconClass));","                // in case no title is given, the third argument will be the callback","                if (!Lang.isString(bodyText)) {","                    args = context;","                    context = callback;","                    callback = bodyText;","                    bodyText = title;","                    title = '&nbsp;'; // making the header appear","                }","                instance.set('headerContent', title || '&nbsp;'); // always making the header appear by display &nbsp;","                instance.set('bodyContent', (iconClass ? Lang.sub(ITSADIALOG_ICON_TEMPLATE, {iconclass: iconClass}) : '') + Lang.sub(ITSADIALOG_BODY_TEMPLATE, {bdclass: (iconClass ? ' class=\"itsadialogbox-messageindent\"' : ''), bdtext: bodyText}));","                instance.set('buttons', customButtons || instance._activePanelOption.buttons || {});","                instance._activePanelOption.callback = callback;","                instance._activePanelOption.context = context;","                instance._activePanelOption.args = args;","                instance._activePanelOption.eventArgs = eventArgs;","                // refreshing focusdescendents","                contentBox.focusManager.refresh();","                // recenter dialogbox in case it has been moved","                instance.centered();","                instance.activatePanel();","                contentBox.focusManager.focus(instance._getFirstFocusNode());","                instance.show();","            }","        },","","        //==============================================================================","      ","        /**","         * Shows a Panel with the buttons: <b>Abort Ignore Retry</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getRetryConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        getRetryConfirmation: function(title, question, callback, context, args) {","            this.showPanel(0, title, question, callback, context, args);","        },","","        /**","         * Shows a Panel with the buttons: <b>No Yes</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        getConfirmation: function(title, question, callback, context, args) {","            this.showPanel(1, title, question, callback, context, args);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b><br>","         * @method getInput","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {String} [defaultmessage] showed inside the form-input.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getInput: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                bodyMessage,","                inputElement;","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultmessage,","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 10,","                initialFocus: true,","                selectOnFocus: true","            });","            instance.showPanel(2, title, message + '<br>' + instance.inputElement.render(), callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b>. Only accepts integer-number as return.<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","         * @method getNumber","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {Integer} [defaultvalue] showed inside the form-input.","         * @param {Integer} [minvalue] used for validation.","         * @param {Integer} [maxvalue] used for validation.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {Integer} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getNumber: function(title, message, defaultvalue, minvalue, maxvalue, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                bodyMessage,","                withMinValue = Lang.isNumber(minvalue),","                withMaxValue = Lang.isNumber(maxvalue),","                inputElement,","                validationMessage = '',","                eventArguments = {};","            if (withMinValue && withMaxValue) {","                validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;","            }","            else {","                if (withMinValue) {","                    validationMessage = 'Input must not be below '+minvalue;","                }","                if (withMaxValue) {","                    validationMessage = 'Input must not be above '+maxvalue;","                }","            }","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultvalue ? defaultvalue.toString() : '',","                label: message,","                keyValidation: function(e) {","                    var keycode = e.keyCode,","                        node = e.target,","                        reactivation = true,","                        cursor = node.get('selectionStart'),","                        cursorEnd = node.get('selectionEnd'),","                        previousStringValue = node.get('value'),","                        safeNumericalKeyCodeToString = String.fromCharCode(((keycode>=96) && (keycode<=105)) ? keycode - 48 : keycode),","                        nextValue,","                        minValue = e.minValue,","                        maxValue = e.maxValue,","                        digits = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],","                        valid = [8,9,13,27,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,173,189,45,96,97,98,99,100,101,102,103,104,105,109],","                        // 173,189,45 all can be minus-token","                        minustoken = [173,189,45,109];","                    if (Y.Array.indexOf(valid, keycode) === -1) {","                        e.halt(true);","                        return false;","                    }","                    if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) && (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at the beginning when minimum>0","                    if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at second position when first position=0","                    if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {","                        e.halt(true);","                        return false;","                    }","                    // no minus at the beginning when minimum>=0","                    if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // no minus when not at the beginning","                    if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // not valid when number will become lower than minimum, only check if field is modified","                    if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) && ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {","                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical keyboard will be transformed to normal keyboard","                        if (keycode===8) {","                            nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) + previousStringValue.substring(cursorEnd), 10);","                        }","                        else if (keycode===46) {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) + previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);","                        }","                        else {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString + previousStringValue.substring(cursorEnd), 10);","                        }","                        if (!Lang.isNumber(nextValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(minValue) && (nextValue<minValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                    }","                    // correct possible 0x by removing leading 0","                    // because for some reason, this also is called when got blurred: do only check if number is digit","                    if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {","                        node.set('value', '');","                    }","                    // only reactivate when the key is not a key that leaves the element","                    if ((keycode!==9) && (keycode!==13)) {","                        if (reactivation && e.hideValidation) {e.hideValidation();}","                        if (reactivation && e.activatePanel) {e.activatePanel();}","                    }","                    return true;","                },","                autoCorrection: function(e) {","                    var formelement = this,","                        minvalue = e && e.minValue,","                        maxvalue = e && e.maxValue,","                        previousValue = formelement.get('elementNode').get('value'),","                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,","                        newValue = parseInt(value, 10);","                    formelement.set('value', newValue.toString());","                    if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {","                        if (newValue<minvalue) {","                        }","                        if (newValue>maxvalue) {","                        }","                        if (e.showValidation) {e.showValidation();}","                        if (e.activatePanel) {e.activatePanel();}","                        return false;","                    }","                    return true;","                },","                validationMessage: validationMessage,","                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',","                initialFocus: true,","                selectOnFocus: true","            });","            if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}","            if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}","            if (validationMessage) {","                eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);","                eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);","            }","            if (eventArguments.minValue || eventArguments.maxValue) {","                eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);","                eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);","            }","            instance.showPanel(3, title, instance.inputElement.render(), callback, context, args, customButtons, customIconclass, eventArguments);","        },","","        /**","         * Shows an ErrorMessage (Panel)","         * @method showErrorMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showErrorMessage: function(title, errormessage, callback, context, args) {","            this.showPanel(4, title, errormessage, callback, context, args);","        },","","        /**","         * Shows a Message (Panel)","         * @method showMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        showMessage: function(title, message, callback, context, args, customButtons, customIconclass) {","            this.showPanel(5, title, message, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows an Warning (Panel)","         * @method showWarning","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} warning showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showWarning: function(title, warning, callback, context, args) {","            this.showPanel(6, title, warning, callback, context, args);","        },","","        //==============================================================================","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionHide","         * @param {eventTarget} e","         * @private","        */","        _actionHide: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                instance.hide();       ","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            } ","        },","","        /**","         * Just executes the callback while the Panel stays on the screen. Used when you just want to read form-information for example.<br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionStayAlive: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            } ","        },","","        /**","         * Resets any form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionReset: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * Clears all form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionClear: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * overrules Y.panel.focus, by focussing on the panel furst, and then using the focusmanager to focus on the right element.","         * @method focus","        */","        focus: function(){","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            instance.constructor.superclass.focus.apply(instance, arguments);","            if (focusManager) {","                focusManager.focus();","            }","        },","","        /**","         * Define all eventhandlers","         * @method bindUI","        */","        bindUI: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            instance._panelListener = contentBox.on(","                'keydown', ","                function (e) {","                    if (e.keyCode === 9) { // tab","                        e.preventDefault();","                        this.shiftFocus(e.shiftKey);","                    }","                },","                instance","            );","            instance._buttonsListener = instance.after(","                'buttonsChange',","                instance._setValidationButtons,","                instance","            );","            instance._descendantListener = contentBox.focusManager.on(","                'activeDescendantChange',","                function (e, contentBox) {","                    var instance = this,","                        previousDescendant = e.prevVal,","                        nextDescendant = e.newVal,","                        defaultButton,","                        isButton,","                        allDescendants = contentBox.focusManager.get('descendants'),","                        sameDescendant;","                    instance._descendantChange++;","                    if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}","                    if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}","                    sameDescendant = nextDescendant.compareTo(previousDescendant);","                    defaultButton = contentBox.one('.yui3-button-primary');","                    isButton = (nextDescendant.get('tagName')==='BUTTON');","                    if (defaultButton) {","                        defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));","                    }","                    // to make a pressed button highlighted, we must add a seperate class","                    allDescendants.removeClass('mousepressfocus');","                    if (isButton) {","                        nextDescendant.addClass('mousepressfocus');","                    }","                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state in case of an element that gets focused.","                    // To make the content be selected again (if requested) look at the value of instance._descendant","                    if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {","                        nextDescendant.select();","                    }","                    if (!sameDescendant) {","                        instance._validate(isButton, nextDescendant);","                    }","                },","                instance,","                contentBox","            );","            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events instead of binding it to the headernode","            instance._headerMousedownListener = contentBox.delegate(","                'mousedown',","                function(e) {e.target.addClass('cursormove');},","                '.yui3-widget-hd'","            );","            instance._headerMouseupListener = contentBox.delegate(","                'mouseup',","                function(e) {e.target.removeClass('cursormove');},","                '.yui3-widget-hd'","            );","            // same for input elements","            instance._inputListener = contentBox.delegate(","                'keydown',","                instance._checkInput,","                'input',","                instance","            );","            // now, listen for checkboxes: the loose focus when they get clicked.","            instance._checkBoxListener = contentBox.delegate(","                'change',","                instance._shiftFocusFromCheckbox,","                function(){","                    var node =this;","                    return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));","                },","                instance","            );","            // reset the focus when clicked on an area inside contentBox that is not an element","            contentBox.on(","                'click',","                function() {","                    // this = focusManeger","                    this.focus(this.get('activeDescendant'));","                },","                focusManager","            );","        },","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method shiftFocus","         * @param {Boolean} [backward] direction to shift","         * @param {eventTarget} [referenceNode] startnode, when not supplied, the node that currently has focused will be used.","        */","        shiftFocus: function(backward, referenceNode) {","            var instance = this,","                focusManager = instance.get('contentBox').focusManager,","                focusManagerNodes = focusManager.get('descendants'),","                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),","                numberDescendants = focusManagerNodes.size();","                if (referenceNode || focusManager.get('focused')) {","                    if (Lang.isBoolean(backward) && backward) {","                        activeDescendant--;","                        focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);","                    } ","                    else {","                        activeDescendant++;","                        focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);","                    }","                }","                else {","                    focusManager.focus(instance._getFirstFocusNode());","                }","        },","","        /**","         * Makes the focus set on next element when a checkbox is clicked.<br>","         * @method _shiftFocusFromCheckbox","         * @param {eventTarget} e","         * @private","        */","        _shiftFocusFromCheckbox: function(e) {","            var instance = this,","                checkboxNode = e.target;","            if (checkboxNode.hasClass('itsa-formelement-lastelement')) {","                instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());","            }","            else {","                instance.shiftFocus(false, checkboxNode);","            }","        },","","        /**","         * Internal function that is called by 'keydown'-event when using input-elements.<br>","         * If the element has keyvalidation, then its keyvalidation-function is called, which could prevent the keyinput.<br>","         * If Enter is pressed, the focus is set on the next element <b>or</b> if it's the last element the ACTION_HIDE is called<br>","         * If the element has autocorrection, autocorrect-function is called.<br>","         * If this returns false, then all buttons with button.validation=true get disabled and  ACTION_HIDE is prevented, if returns true, all these buttons get enabled.","         * @method _checkInput","         * @param {eventTarget} e","         * @private","        */","        _checkInput: function(e) {","            var instance = this,","                node = e.target,","                autoCorrection,","                autoCorrectResult,","                eventArgs = instance._activePanelOption.eventArgs;","            if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {","                Y.mix(e, eventArgs);","                if (!instance.inputElement.get('keyValidation')(e)) {","                    return;","                }","            }","            if (e.keyCode===13) {","                e.preventDefault();","                if (node.hasClass('itsa-formelement-lastelement')) {","                    autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');","                    autoCorrectResult = true;","                    if (autoCorrection) {","                        autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                        if (!autoCorrectResult) {","                            eventArgs.showValidation();","                            instance.deactivatePanel();","                            instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());","                        }","                    }","                    if (autoCorrectResult) {","                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node","                        node.setData('name', instance._getDefaultButtonNode().getData('name'));","                        instance._actionHide(e);","                    }","                    else {","                        node.select();","                    }","                }","                else {","                    instance.shiftFocus();","                }","            }","        },","","        /**","         * Internal function that is called when an descendant changes. To validate inputelements (if present)<br>","         * If the element has autocorrection, autocorrect-function is called.<br>If this returns false, then all buttons with button.validation=true get disabled, if returns true, all these buttons get enabled.","         * @method _validate","         * @private","        */","        _validate: function(isButton, node) {","            var instance = this,","                eventArgs = instance._activePanelOption.eventArgs,","                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),","                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),","                autoCorrectResult = true;","            if (autoCorrection && buttonValidation) {","                autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                if (!autoCorrectResult) {","                    if (eventArgs && eventArgs.showValidation) {","                        eventArgs.showValidation();","                    }","                    instance.deactivatePanel();","                }","            }","            if (autoCorrectResult) {","                if (eventArgs && eventArgs.hideValidation) {","                    eventArgs.hideValidation();","                }","                instance.activatePanel();","            }","        },","","        /**","         * Enables all buttons with button.validation=true","         * @method activatePanel","        */","        activatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', false);","        },","","        /**","         * Disnables all buttons with button.validation=true","         * @method deactivatePanel","        */","        deactivatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', true);","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this;","            if (instance.keyDownHandle) {instance.keyDownHandle.detach();}","            if (instance._panelListener) {instance._panelListener.detach();} ","            if (instance._descendantListener) {instance._descendantListener.detach();}","            if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}","            if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}","            if (instance._inputListener) {instance._inputListener.detach();}","            if (instance._checkBoxListener) {instance._checkBoxListener.detach();}","            if (instance._buttonsListener) {instance._buttonsListener.detach();}","        },","","        //==============================================================================","","        /**","         * Internal method that looks for all buttons with button.validation=true and markes them with a validated-class<br>","         * Will be executed when the buttons are changed.","         * @method _setValidationButtons","         * @param {eventTarget} e","         * @private","        */","        _setValidationButtons : function(e) {","            var instance = this,","                buttonsObject = instance._activePanelOption.buttons,","                contentBox = instance.get('contentBox');","            contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');","            if (buttonsObject) {","                if (buttonsObject.header) {","                    Y.Array.each(","                        buttonsObject.header,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.body) {","                    Y.Array.each(","                        buttonsObject.body,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.footer) {","                    Y.Array.each(","                        buttonsObject.footer,","                        instance._markButtonValidated,","                        instance","                    );","                }","            }","            instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');","        },","","        /**","         * Internal method that markes a button with a validated-class if it has button.validation=true<br>","         * @method _markButtonValidated","         * @param {Object} buttonObject ","         * @param {Int} index","         * @param {Array} array ","         * @private","        */","        _markButtonValidated : function(buttonObject, index, array) {","            var instance = this,","                name = buttonObject.name,","                validation,","                buttonNode;","            buttonNode = instance.getButton(name);","            if (buttonNode) {","                validation = buttonObject.validation;","                if (Lang.isBoolean(validation) && validation) {","                    buttonNode.addClass('itsadialogbox-button-validated');","                }","            }","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * @method _initiatePanels","         * @private","        */","        _initiatePanels : function() {","            var instance = this;","            // creating getRetryConfirmation","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'abort', label:'Abort', action:instance.ACTION_HIDE},","                        {name:'ignore', label:'Ignore', action:instance.ACTION_HIDE},","                        {name:'retry', label:'Retry', action:instance.ACTION_HIDE, isDefault: true}    ","                    ]","                }    ","            });","            // creating getConfirmation","            instance.definePanel({","                iconClass: instance.ICON_INFO,","                buttons: {","                    footer: [","                        {name:'no', label:'No', action:instance.ACTION_HIDE},","                        {name:'yes', label:'Yes', action:instance.ACTION_HIDE, isDefault: true}    ","                    ]","                }    ","            });","            // creating getInput","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}    ","                    ]","                }    ","            });","            // creating getNumber","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}    ","                    ]","                }    ","            });","            // creating showErrorMessage","            instance.definePanel({","                iconClass: instance.ICON_ERROR,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    ","                    ]","                }    ","            });","            // creating showMessage","            instance.definePanel({","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    ","                    ]","                }    ","            });","            // creating showWarning","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    ","                    ]","                }    ","            });","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * this can be a form-element. But if no form-element has focus defined, the first form-element should get focus.","         * If no form element is present, then the defaultbutton should get focus","         * @method _getFirstFocusNode","         * @private","         * return {Y.Node} the Node that should get focus when panel is showed.","        */","        _getFirstFocusNode: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusnode;","            focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') || instance._getDefaultButtonNode();","            return focusnode;","        },","","        /**","         * Returns the default button: the buttonNode that has the primary focus.<br>","         * This should be set during definition of PanelOptions.","         * @method _getDefaultButtonNode","         * @private","         * return {Y.Node} buttonNode","        */","        _getDefaultButtonNode: function() {","            var node = this.get('contentBox').one('.yui3-button-primary');","            return node;","        },","","        /**","         * Returns all form-elements in panel","         * @method _serializeForm","         * @private","         * return {Object} Contains all form-elements with name/value pair","        */","        _serializeForm: function(masterNode) {","            // At this moment only text-inputs are allowed.","            // at later stage, handle this by Y.ITSAFORM with a true serialize function","            var instance = this,","                formelements = masterNode.all('.itsa-formelement'),","                value,","                intValue,","                serialdata = {};","            formelements.each(","                function(formelementNode, index, nodeList) {","                    value = formelementNode.get('value');","                    intValue = parseInt(value, 10);","                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer","                    serialdata[formelementNode.get('name')] = (value==intValue) ? intValue : value;","                }","            );","            return serialdata;","        }","","    }, {","        ATTRS : {","        }","    }",");","","//=================================================================================","","if (!Y.Global.ItsaDialog) {","    Y.Global.ItsaDialog = new Y.ITSADIALOGBOX({","        visible: false,","        centered: true,","        render : true,","        zIndex : 21000,","        modal  : true,","        bodyContent : '',","        focusOn: [","            {eventName: 'clickoutside'}","        ]","    });","    Y.Global.ItsaDialog.plug(Y.Plugin.Drag);","    Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');","}","","//=================================================================================","","// Y.ITSAFORMELEMENT should get an own module. For the short time being, we will keep it inside itsa-dialog","","/**"," * The Itsa Dialogbox module."," *"," * @module itsa-dialogbox"," */","","/**"," * Dialogbox with sugar messages"," * "," *"," * @class ITSAFormelement"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var ITSAFORM_TABLETEMPLATE = '<td class=\"itsaform-tablelabel{classnamelabel}\"{marginstyle}>{label}</td>'","                            +'<td class=\"itsaform-tableelement\">{element}<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div></td>',","    ITSAFORM_INLINETEMPLATE = '<span class=\"itsaform-spanlabel{classnamelabel}\"{marginstyle}>{label}</span>'","                            +'{element}<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div>';","","Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {","","        id: null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","        */","        initializer : function() {","            this.id = Y.guid();","        },","","        /**","         * Renderes a String that contains the completeFormElement definition.<br>","         * To be used in an external Form","         * @method render","         * @param {boolean} tableform If the renderedstring should be in tableform: encapsuled by td-elements (without tr)","         * @return {String} rendered String","        */","        render : function(tableform) {","            var instance = this,","                marginTop = instance.get('marginTop'),","                marginStyle = marginTop ? ' style=\"margin-top:' + marginTop + 'px\"' : '',","                type = instance.get('type'),","                classNameLabel = instance.get('classNameLabel'),","                classNameValue = instance.get('classNameValue'),","                initialFocus = instance.get('initialFocus'),","                selectOnFocus = instance.get('selectOnFocus'),","                keyValidation = instance.get('keyValidation'),","                validation = instance.get('validation'),","                autoCorrection = instance.get('autoCorrection'),","                initialFocusClass = initialFocus ? ' itsa-formelement-firstfocus' : '',","                selectOnFocusClass = selectOnFocus ? ' itsa-formelement-selectall' : '',","                keyValidationClass = keyValidation ? ' itsa-formelement-keyvalidation' : '',","                validationClass = validation ? ' itsa-formelement-validation' : '',","                autoCorrectionClass = autoCorrection ? ' itsa-formelement-autocorrect' : '',","                elementClass = ' class=\"itsa-formelement ' + classNameValue + initialFocusClass + selectOnFocusClass + keyValidationClass + validationClass + autoCorrectionClass+'\"',","                element = '';","            if (type==='input') {element = '<input id=\"' + instance.id + '\" type=\"text\" name=\"' + instance.get('name') + '\" value=\"' + instance.get('value') + '\"' + elementClass + marginStyle + ' />';}","            return  Lang.sub(","                        tableform ? ITSAFORM_TABLETEMPLATE : ITSAFORM_INLINETEMPLATE,","                        {","                            marginstyle: marginStyle,","                            label: instance.get('label'),","                            element: element,","                            classnamelabel: classNameLabel,","                            validationMessage: instance.get('validationMessage'),","                            classnamevalue: classNameValue","                        }","                    );","        },","","        /**","         * Shows the validationmessage","         * @method showValidation","        */","        showValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);","            }","        },","","        /**","         * Hides the validationmessage","         * @method hideValidation","        */","        hideValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);","            }","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this;","            if (instance.blurevent) {instance.blurevent.detach();}","            if (instance.keyevent) {instance.keyevent.detach();}","        }","","    }, {","        ATTRS : {","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            name : {","                value: 'undefined-name',","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('name', val);","                    }","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Must have one of the following values:","             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>","             * @attribute typr","             * @type String","            */","            type : {","                value: '',","                setter: function(val) {","                    if (Lang.isString(val)) {val=val.toLowerCase();}","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val) && ","                            ((val==='input') || ","                             (val==='password') || ","                             (val==='textarea') || ","                             (val==='checkbox') || ","                             (val==='radiogroup') || ","                             (val==='selectbox') || ","                             (val==='button') || ","                             (val==='hidden')","                            )","                    );","                }","            },","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            value : {","                value: null,","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('value', val);","                    }","                    return val;","                }","            },","            /**","             * @description The label that wis present before the element","             * @attribute [label]","             * @type String","            */","            label : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-keyvalidation'.","             * The function MUST return true or false.","             * @attribute [keyValidation]","             * @type Function","            */","            keyValidation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Validation after changing the value (onblur). The function should return true or false. In case of false, the validationerror is thrown.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-validation'.","             * The function MUST return true or false.","             * Either use validation, or autocorrection.","             * @attribute [validation]","             * @type Function","             * @return Boolean","            */","            validation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description The message that will be returned on a validationerror, this will be set within e.message.","             * @attribute [validationMessage]","             * @type String","            */","            validationMessage : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description If set, value will be replaces by the returnvalue of this function. <br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-autocorrect'.","             * The function MUST return true or false: defining whether the input is accepted.","             * Either use validation, or autocorrection.","             * @attribute [autocorrection]","             * @type Function","             * @return Boolean","            */","            autoCorrection : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Additional className that is passed on the label, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameLabel]","             * @type String","            */","            classNameLabel : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Additional className that is passed on the value, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameValue]","             * @type String","            */","            classNameValue : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Will create extra white whitespace during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [marginTop]","             * @type Int","            */","            marginTop : {","                value: 0,","                validator: function(val) {","                    return (Lang.isNumber(val));","                }","            },","            /**","             * @description Determines whether this element should have the initial focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).","             * @attribute [initialFocus]","             * @type Boolean","            */","            initialFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description Determines whether this element should completely be selected when it gets focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).","             * @attribute [selectOnFocus]","             * @type Boolean","            */","            selectOnFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description DOM-node where the elementNode is bound to.<br>","             * Be carefull: it will only return a Node when you have manually inserted the result of this.render() into the DOM. Otherwise returns null.","             * Readonly","             * @attribute [elementNode]","             * @type Y.Node","             * @readonly","            */","            elementNode : {","                value: null,","                readOnly: true,","                getter: function() {","                    return Y.one('#'+this.id);","                }","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['base-build', 'panel', 'node-base', 'dd-plugin', 'node-focusmanager', 'event-valuechange'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"].lines = {"1":0,"3":0,"29":0,"34":0,"142":0,"143":0,"148":0,"172":0,"173":0,"174":0,"175":0,"178":0,"197":0,"200":0,"201":0,"202":0,"203":0,"205":0,"206":0,"207":0,"208":0,"209":0,"210":0,"212":0,"213":0,"214":0,"215":0,"216":0,"217":0,"218":0,"220":0,"222":0,"223":0,"224":0,"225":0,"242":0,"256":0,"275":0,"278":0,"287":0,"310":0,"317":0,"318":0,"321":0,"322":0,"324":0,"325":0,"328":0,"334":0,"348":0,"349":0,"350":0,"352":0,"353":0,"354":0,"357":0,"358":0,"359":0,"362":0,"363":0,"364":0,"367":0,"368":0,"369":0,"372":0,"373":0,"374":0,"377":0,"379":0,"380":0,"382":0,"383":0,"386":0,"388":0,"389":0,"390":0,"391":0,"393":0,"394":0,"395":0,"396":0,"398":0,"399":0,"400":0,"401":0,"406":0,"407":0,"410":0,"411":0,"412":0,"414":0,"417":0,"423":0,"424":0,"425":0,"427":0,"429":0,"430":0,"431":0,"433":0,"440":0,"441":0,"442":0,"443":0,"444":0,"446":0,"447":0,"448":0,"450":0,"463":0,"478":0,"491":0,"504":0,"508":0,"509":0,"510":0,"511":0,"512":0,"513":0,"526":0,"530":0,"531":0,"532":0,"533":0,"534":0,"548":0,"551":0,"552":0,"564":0,"567":0,"568":0,"576":0,"579":0,"580":0,"581":0,"590":0,"593":0,"596":0,"597":0,"598":0,"603":0,"608":0,"611":0,"618":0,"619":0,"620":0,"621":0,"622":0,"623":0,"624":0,"625":0,"628":0,"629":0,"630":0,"634":0,"635":0,"637":0,"638":0,"645":0,"647":0,"650":0,"652":0,"656":0,"663":0,"667":0,"668":0,"673":0,"677":0,"691":0,"696":0,"697":0,"698":0,"699":0,"702":0,"703":0,"707":0,"718":0,"720":0,"721":0,"724":0,"739":0,"744":0,"745":0,"746":0,"747":0,"750":0,"751":0,"752":0,"753":0,"754":0,"755":0,"756":0,"757":0,"758":0,"759":0,"760":0,"763":0,"765":0,"766":0,"769":0,"773":0,"785":0,"790":0,"791":0,"792":0,"793":0,"794":0,"796":0,"799":0,"800":0,"801":0,"803":0,"812":0,"820":0,"829":0,"830":0,"831":0,"832":0,"833":0,"834":0,"835":0,"836":0,"837":0,"850":0,"853":0,"854":0,"855":0,"856":0,"862":0,"863":0,"869":0,"870":0,"877":0,"889":0,"893":0,"894":0,"895":0,"896":0,"897":0,"908":0,"910":0,"921":0,"931":0,"944":0,"957":0,"966":0,"974":0,"993":0,"996":0,"997":0,"1008":0,"1009":0,"1021":0,"1026":0,"1028":0,"1029":0,"1031":0,"1034":0,"1045":0,"1046":0,"1057":0,"1058":0,"1084":0,"1089":0,"1100":0,"1111":0,"1129":0,"1130":0,"1148":0,"1149":0,"1150":0,"1159":0,"1160":0,"1161":0,"1171":0,"1172":0,"1173":0,"1186":0,"1187":0,"1188":0,"1190":0,"1193":0,"1205":0,"1206":0,"1209":0,"1230":0,"1231":0,"1232":0,"1234":0,"1245":0,"1258":0,"1273":0,"1284":0,"1299":0,"1311":0,"1323":0,"1335":0,"1347":0,"1359":0,"1374":0};
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"].functions = {"initializer:141":0,"definePanel:171":0,"showPanel:196":0,"getRetryConfirmation:241":0,"getConfirmation:255":0,"getInput:274":0,"keyValidation:333":0,"autoCorrection:416":0,"getNumber:309":0,"showErrorMessage:462":0,"showMessage:477":0,"showWarning:490":0,"_actionHide:503":0,"_actionStayAlive:525":0,"_actionReset:547":0,"_actionClear:563":0,"focus:575":0,"(anonymous 2):595":0,"(anonymous 3):610":0,"(anonymous 4):647":0,"(anonymous 5):652":0,"(anonymous 6):666":0,"(anonymous 7):675":0,"bindUI:589":0,"shiftFocus:690":0,"_shiftFocusFromCheckbox:717":0,"_checkInput:738":0,"_validate:784":0,"activatePanel:811":0,"deactivatePanel:819":0,"destructor:828":0,"_setValidationButtons:849":0,"_markButtonValidated:888":0,"_initiatePanels:907":0,"_getFirstFocusNode:992":0,"_getDefaultButtonNode:1007":0,"(anonymous 8):1027":0,"_serializeForm:1018":0,"initializer:1099":0,"render:1110":0,"showValidation:1147":0,"hideValidation:1158":0,"destructor:1170":0,"setter:1185":0,"validator:1192":0,"setter:1204":0,"validator:1208":0,"setter:1229":0,"validator:1244":0,"validator:1257":0,"validator:1272":0,"validator:1283":0,"validator:1298":0,"validator:1310":0,"validator:1322":0,"validator:1334":0,"validator:1346":0,"validator:1358":0,"getter:1373":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"].coveredLines = 300;
_yuitest_coverage["/build/gallery-itsadialogbox/gallery-itsadialogbox.js"].coveredFunctions = 60;
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1);
YUI.add('gallery-itsadialogbox', function(Y) {

_yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 3);
'use strict';

// TO DO:
// wait for show until the widget is rendered
// When form is disabled, the cancelbutton doesn only close when pressed twice

/**
 * The Itsa Dialogbox module.
 *
 * @module itsa-dialogbox
 */

/**
 * Dialogbox with sugar messages
 * 
 *
 * @class ITSADialogbox
 * @extends Panel
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 29);
var Lang = Y.Lang,
    ITSADIALOG_ICON_TEMPLATE = "<div class='itsadialogbox-icon {iconclass}'></div>",
    ITSADIALOG_BODY_TEMPLATE = "<div{bdclass}>{bdtext}</div>",
    ITSADIALOG_INLINEFORM = "itsa-dialog-inlineform";

_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 34);
Y.ITSADIALOGBOX = Y.Base.create('itsadialogbox', Y.Panel, [], {

        ICON_BUBBLE : 'icon-bubble',
        ICON_INFO : 'icon-info',
        ICON_QUESTION : 'icon-question',
        ICON_WARN : 'icon-warn',
        ICON_ERROR : 'icon-error',
        ICON_SUCCESS : 'icon-success',
        ACTION_HIDE : '_actionHide',
        ACTION_STAYALIVE : '_actionStayAlive',
        ACTION_RESET : '_actionReset',
        ACTION_CLEAR : '_actionClear',
        panelOptions : [], 
        _activePanelOption : null,
        _validationButtons : null,
        _descendantChange : 0,

// -- Public Static Properties -------------------------------------------------

/**
 * Reference to the editor's instance
 * @property ICON_BUBBLE
 * @type String
 */

/**
 * Reference to the editor's instance
 * @property ICON_INFO
 * @type String
 */

/**
 * Reference to the editor's instance
 * @property ICON_QUESTION
 * @type String
 */

/**
 * Reference to the editor's instance
 * @property ICON_WARN
 * @type String
 */

/**
 * Reference to the editor's instance
 * @property ICON_ERROR
 * @type String
 */

/**
 * Reference to the editor's instance
 * @property ICON_SUCCESS
 * @type String
 */

/**
 * Reference to the hide-function that can be attached to button.action. This function closes the Panel and executes the callback.
 * @property ACTION_HIDE
 * @type String
 */

/**
 * Reference to the stayalive-function that can be attached to button.action. This function just execute the callback, but the Panel stays alive. In need you just want to read the Panel-values.
 * @property ACTION_STAYALIVE
 * @type String
 */

/**
 * Reference to the clear-function that can be attached to button.action. This function will clear any form-elements.
 * @property ACTION_CLEAR
 * @type String
 */

/**
 * Reference to the reset-function that can be attached to button.action. This function will reset any form-elements.
 * @property ACTION_RESET
 * @type String
 */

/**
 * Internal Array that holds all registred paneloptions, created through definePanel()
 * @property panelOptions
 * @type Array
 */

/**
 * Internal reference to the active panelOptions (which is active after showPanel() is called
 * @property _activePanelOption
 * @type Object
 */

/**
 * Nodelist that contains all current (from _activePanelOption) buttons that have button.validated set to true.
 * @property _validationButtons
 * @type Y.NodeList
 */

/**
 * Internal count that keeps track of how many times a descendentChange has been taken place by the focusManager
 * @property _descendantChange
 * @type Int
 */

        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "initializer", 141);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 142);
var instance = this;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 143);
instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                descendants: 'button, input, textarea',
                circular: true,
                focusClass: 'focus'
            });
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 148);
instance._initiatePanels();
        },

        /**
         * Defines a new Panel and stores it to the panelOptions-Array. Returns an panelId that can be used sot show the Panel later on using showPanel(panelId).<br>
         * PanelOptions is an object that can have the following fields:<br>
           <ul><li>iconClass (String) className for the icon, for example Y.Global.ItsaDialog.ICON_QUESTION</li>
               <li>form (Array) Array with objects that will be transformed to Y.FORMELEMENT objects (not currently available)</li>
               <li>buttons (Object) Which buttons to use. For example:
               <br>&nbsp;&nbsp;{
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;footer: [
                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'cancel', label:'Cancel', action: Y.Global.ItsaDialog.ACTION_HIDE},
                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'ok', label:'Ok', action: Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}    
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;]
               &nbsp;&nbsp;}
               </li>    
            </ul>    
            <br><br>
            You can use 4 actionfunctions to attach at the button: Y.Global.ItsaDialog.ACTION_HIDE, Y.Global.ItsaDialog.ACTION_STAYALIVE, Y.Global.ItsaDialog.ACTION_RESET and Y.Global.ItsaDialog.ACTION_CLEAR
         * @method definePanel
         * @param {Object} panelOptions The config-object.
         * @return {Integer} unique panelId
        */
        definePanel: function(panelOptions) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "definePanel", 171);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 172);
var instance = this;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 173);
if (Lang.isObject(panelOptions)) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 174);
instance.panelOptions.push(panelOptions);
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 175);
return instance.panelOptions.length - 1;
            }
            else {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 178);
return -1;
            }
        },

        /**
         * Shows the panel when you have a panelId. For usage with custom panels. The sugarmethods (showMessage() f.i.) use this method under the hood).
         *
         * @method showPanel
         * @param {Int} panelId Id of the panel that has to be shown. Retreive this value during definePanel()
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} [bodyText] showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want custom buttons that differ from those defined during definePanel.
         * @param {String} [customIconclass] In case you want to use an iconclass that is different from to one defined during definePanel. Example: Y.Global.ItsaDialog.ICON_WARN
         * @param {Object} [eventArgs] do not use, only internal (temporarely)
        */
        showPanel: function(panelId, title, bodyText, callback, context, args, customButtons, customIconclass, eventArgs) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showPanel", 196);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 197);
var instance = this,
                iconClass,
                contentBox = instance.get('contentBox');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 200);
if ((panelId>=0) && (panelId<instance.panelOptions.length)) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 201);
instance._activePanelOption = instance.panelOptions[panelId];
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 202);
iconClass = customIconclass || instance._activePanelOption.iconClass;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 203);
instance.get('boundingBox').toggleClass('withicon', Lang.isString(iconClass));
                // in case no title is given, the third argument will be the callback
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 205);
if (!Lang.isString(bodyText)) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 206);
args = context;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 207);
context = callback;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 208);
callback = bodyText;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 209);
bodyText = title;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 210);
title = '&nbsp;'; // making the header appear
                }
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 212);
instance.set('headerContent', title || '&nbsp;'); // always making the header appear by display &nbsp;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 213);
instance.set('bodyContent', (iconClass ? Lang.sub(ITSADIALOG_ICON_TEMPLATE, {iconclass: iconClass}) : '') + Lang.sub(ITSADIALOG_BODY_TEMPLATE, {bdclass: (iconClass ? ' class="itsadialogbox-messageindent"' : ''), bdtext: bodyText}));
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 214);
instance.set('buttons', customButtons || instance._activePanelOption.buttons || {});
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 215);
instance._activePanelOption.callback = callback;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 216);
instance._activePanelOption.context = context;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 217);
instance._activePanelOption.args = args;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 218);
instance._activePanelOption.eventArgs = eventArgs;
                // refreshing focusdescendents
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 220);
contentBox.focusManager.refresh();
                // recenter dialogbox in case it has been moved
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 222);
instance.centered();
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 223);
instance.activatePanel();
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 224);
contentBox.focusManager.focus(instance._getFirstFocusNode());
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 225);
instance.show();
            }
        },

        //==============================================================================
      
        /**
         * Shows a Panel with the buttons: <b>Abort Ignore Retry</b><br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.
         * @method getRetryConfirmation
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} question showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
        */
        getRetryConfirmation: function(title, question, callback, context, args) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getRetryConfirmation", 241);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 242);
this.showPanel(0, title, question, callback, context, args);
        },

        /**
         * Shows a Panel with the buttons: <b>No Yes</b><br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.
         * @method getConfirmation
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} question showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
        */
        getConfirmation: function(title, question, callback, context, args) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getConfirmation", 255);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 256);
this.showPanel(1, title, question, callback, context, args);
        },

        /**
         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b><br>
         * @method getInput
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
        getInput: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getInput", 274);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 275);
var instance = this,
                bodyMessage,
                inputElement;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 278);
instance.inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultmessage,
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',
                marginTop: 10,
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 287);
instance.showPanel(2, title, message + '<br>' + instance.inputElement.render(), callback, context, args, customButtons, customIconclass);
        },

        /**
         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b>. Only accepts integer-number as return.<br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>
         * Look for <i>e.value</i> to determine the userinput.
         * @method getNumber
         * @param {String} title showed in the header of the Panel.
         * @param {String} message showed inside the Panel.
         * @param {Integer} [defaultvalue] showed inside the form-input.
         * @param {Integer} [minvalue] used for validation.
         * @param {Integer} [maxvalue] used for validation.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
         * @return {Integer} passed by the eventTarget in the callback<br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>
         * Look for <i>e.value</i> to determine the userinput.
        */
        getNumber: function(title, message, defaultvalue, minvalue, maxvalue, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getNumber", 309);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 310);
var instance = this,
                bodyMessage,
                withMinValue = Lang.isNumber(minvalue),
                withMaxValue = Lang.isNumber(maxvalue),
                inputElement,
                validationMessage = '',
                eventArguments = {};
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 317);
if (withMinValue && withMaxValue) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 318);
validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;
            }
            else {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 321);
if (withMinValue) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 322);
validationMessage = 'Input must not be below '+minvalue;
                }
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 324);
if (withMaxValue) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 325);
validationMessage = 'Input must not be above '+maxvalue;
                }
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 328);
instance.inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultvalue ? defaultvalue.toString() : '',
                label: message,
                keyValidation: function(e) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "keyValidation", 333);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 334);
var keycode = e.keyCode,
                        node = e.target,
                        reactivation = true,
                        cursor = node.get('selectionStart'),
                        cursorEnd = node.get('selectionEnd'),
                        previousStringValue = node.get('value'),
                        safeNumericalKeyCodeToString = String.fromCharCode(((keycode>=96) && (keycode<=105)) ? keycode - 48 : keycode),
                        nextValue,
                        minValue = e.minValue,
                        maxValue = e.maxValue,
                        digits = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],
                        valid = [8,9,13,27,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,173,189,45,96,97,98,99,100,101,102,103,104,105,109],
                        // 173,189,45 all can be minus-token
                        minustoken = [173,189,45,109];
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 348);
if (Y.Array.indexOf(valid, keycode) === -1) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 349);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 350);
return false;
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 352);
if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) && (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 353);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 354);
return false;
                    }
                    // no digit of zero at the beginning when minimum>0
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 357);
if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 358);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 359);
return false;
                    }
                    // no digit of zero at second position when first position=0
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 362);
if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 363);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 364);
return false;
                    }
                    // no minus at the beginning when minimum>=0
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 367);
if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 368);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 369);
return false;
                    }
                    // no minus when not at the beginning
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 372);
if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 373);
e.halt(true);
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 374);
return false;
                    }
                    // not valid when number will become lower than minimum, only check if field is modified
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 377);
if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) && ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {
                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical keyboard will be transformed to normal keyboard
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 379);
if (keycode===8) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 380);
nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) + previousStringValue.substring(cursorEnd), 10);
                        }
                        else {_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 382);
if (keycode===46) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 383);
nextValue = parseInt(previousStringValue.substring(0, cursor) + previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);
                        }
                        else {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 386);
nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString + previousStringValue.substring(cursorEnd), 10);
                        }}
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 388);
if (!Lang.isNumber(nextValue)) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 389);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 390);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 391);
reactivation = false;
                        }
                        else {_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 393);
if (Lang.isNumber(minValue) && (nextValue<minValue)) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 394);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 395);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 396);
reactivation = false;
                        }
                        else {_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 398);
if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 399);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 400);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 401);
reactivation = false;
                        }}}
                    }
                    // correct possible 0x by removing leading 0
                    // because for some reason, this also is called when got blurred: do only check if number is digit
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 406);
if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 407);
node.set('value', '');
                    }
                    // only reactivate when the key is not a key that leaves the element
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 410);
if ((keycode!==9) && (keycode!==13)) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 411);
if (reactivation && e.hideValidation) {e.hideValidation();}
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 412);
if (reactivation && e.activatePanel) {e.activatePanel();}
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 414);
return true;
                },
                autoCorrection: function(e) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "autoCorrection", 416);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 417);
var formelement = this,
                        minvalue = e && e.minValue,
                        maxvalue = e && e.maxValue,
                        previousValue = formelement.get('elementNode').get('value'),
                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,
                        newValue = parseInt(value, 10);
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 423);
formelement.set('value', newValue.toString());
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 424);
if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 425);
if (newValue<minvalue) {
                        }
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 427);
if (newValue>maxvalue) {
                        }
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 429);
if (e.showValidation) {e.showValidation();}
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 430);
if (e.activatePanel) {e.activatePanel();}
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 431);
return false;
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 433);
return true;
                },
                validationMessage: validationMessage,
                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 440);
if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 441);
if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 442);
if (validationMessage) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 443);
eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 444);
eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 446);
if (eventArguments.minValue || eventArguments.maxValue) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 447);
eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 448);
eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 450);
instance.showPanel(3, title, instance.inputElement.render(), callback, context, args, customButtons, customIconclass, eventArguments);
        },

        /**
         * Shows an ErrorMessage (Panel)
         * @method showErrorMessage
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} errormessage showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
        */
        showErrorMessage: function(title, errormessage, callback, context, args) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showErrorMessage", 462);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 463);
this.showPanel(4, title, errormessage, callback, context, args);
        },

        /**
         * Shows a Message (Panel)
         * @method showMessage
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} errormessage showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
        */
        showMessage: function(title, message, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showMessage", 477);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 478);
this.showPanel(5, title, message, callback, context, args, customButtons, customIconclass);
        },

        /**
         * Shows an Warning (Panel)
         * @method showWarning
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} warning showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
        */
        showWarning: function(title, warning, callback, context, args) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showWarning", 490);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 491);
this.showPanel(6, title, warning, callback, context, args);
        },

        //==============================================================================

        /**
         * Hides the panel and executes the callback. <br>
         * Will not execute if the targetbutton has been disabled through validation.
         * @method _actionHide
         * @param {eventTarget} e
         * @private
        */
        _actionHide: function(e){
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionHide", 503);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 504);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 508);
e.preventDefault();
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 509);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 510);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 511);
instance.hide();       
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 512);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 513);
Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();
                }
            } 
        },

        /**
         * Just executes the callback while the Panel stays on the screen. Used when you just want to read form-information for example.<br>
         * Will not execute if the targetbutton has been disabled through validation.
         * @method _actionStayAlive
         * @param {eventTarget} e
         * @private
        */
        _actionStayAlive: function(e){
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionStayAlive", 525);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 526);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 530);
e.preventDefault();
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 531);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 532);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 533);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 534);
Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();
                }
            } 
        },

        /**
         * Resets any form-elements inside the panel.<br>
         * Does not execute the callback.
         * --- This function does not work yet ---
         * @method _actionStayAlive
         * @param {eventTarget} e
         * @private
        */
        _actionReset: function(e){
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionReset", 547);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 548);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 551);
e.preventDefault();
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 552);
ev.buttonName = e.target.getData('name');
        },

        /**
         * Clears all form-elements inside the panel.<br>
         * Does not execute the callback.
         * --- This function does not work yet ---
         * @method _actionStayAlive
         * @param {eventTarget} e
         * @private
        */
        _actionClear: function(e){
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionClear", 563);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 564);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 567);
e.preventDefault();
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 568);
ev.buttonName = e.target.getData('name');
        },

        /**
         * overrules Y.panel.focus, by focussing on the panel furst, and then using the focusmanager to focus on the right element.
         * @method focus
        */
        focus: function(){
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "focus", 575);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 576);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 579);
instance.constructor.superclass.focus.apply(instance, arguments);
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 580);
if (focusManager) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 581);
focusManager.focus();
            }
        },

        /**
         * Define all eventhandlers
         * @method bindUI
        */
        bindUI: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "bindUI", 589);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 590);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 593);
instance._panelListener = contentBox.on(
                'keydown', 
                function (e) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 2)", 595);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 596);
if (e.keyCode === 9) { // tab
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 597);
e.preventDefault();
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 598);
this.shiftFocus(e.shiftKey);
                    }
                },
                instance
            );
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 603);
instance._buttonsListener = instance.after(
                'buttonsChange',
                instance._setValidationButtons,
                instance
            );
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 608);
instance._descendantListener = contentBox.focusManager.on(
                'activeDescendantChange',
                function (e, contentBox) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 3)", 610);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 611);
var instance = this,
                        previousDescendant = e.prevVal,
                        nextDescendant = e.newVal,
                        defaultButton,
                        isButton,
                        allDescendants = contentBox.focusManager.get('descendants'),
                        sameDescendant;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 618);
instance._descendantChange++;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 619);
if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 620);
if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 621);
sameDescendant = nextDescendant.compareTo(previousDescendant);
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 622);
defaultButton = contentBox.one('.yui3-button-primary');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 623);
isButton = (nextDescendant.get('tagName')==='BUTTON');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 624);
if (defaultButton) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 625);
defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));
                    }
                    // to make a pressed button highlighted, we must add a seperate class
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 628);
allDescendants.removeClass('mousepressfocus');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 629);
if (isButton) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 630);
nextDescendant.addClass('mousepressfocus');
                    }
                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state in case of an element that gets focused.
                    // To make the content be selected again (if requested) look at the value of instance._descendant
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 634);
if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 635);
nextDescendant.select();
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 637);
if (!sameDescendant) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 638);
instance._validate(isButton, nextDescendant);
                    }
                },
                instance,
                contentBox
            );
            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events instead of binding it to the headernode
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 645);
instance._headerMousedownListener = contentBox.delegate(
                'mousedown',
                function(e) {_yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 4)", 647);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 647);
e.target.addClass('cursormove');},
                '.yui3-widget-hd'
            );
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 650);
instance._headerMouseupListener = contentBox.delegate(
                'mouseup',
                function(e) {_yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 5)", 652);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 652);
e.target.removeClass('cursormove');},
                '.yui3-widget-hd'
            );
            // same for input elements
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 656);
instance._inputListener = contentBox.delegate(
                'keydown',
                instance._checkInput,
                'input',
                instance
            );
            // now, listen for checkboxes: the loose focus when they get clicked.
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 663);
instance._checkBoxListener = contentBox.delegate(
                'change',
                instance._shiftFocusFromCheckbox,
                function(){
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 6)", 666);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 667);
var node =this;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 668);
return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));
                },
                instance
            );
            // reset the focus when clicked on an area inside contentBox that is not an element
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 673);
contentBox.on(
                'click',
                function() {
                    // this = focusManeger
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 7)", 675);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 677);
this.focus(this.get('activeDescendant'));
                },
                focusManager
            );
        },

        /**
         * Hides the panel and executes the callback. <br>
         * Will not execute if the targetbutton has been disabled through validation.
         * @method shiftFocus
         * @param {Boolean} [backward] direction to shift
         * @param {eventTarget} [referenceNode] startnode, when not supplied, the node that currently has focused will be used.
        */
        shiftFocus: function(backward, referenceNode) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "shiftFocus", 690);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 691);
var instance = this,
                focusManager = instance.get('contentBox').focusManager,
                focusManagerNodes = focusManager.get('descendants'),
                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),
                numberDescendants = focusManagerNodes.size();
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 696);
if (referenceNode || focusManager.get('focused')) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 697);
if (Lang.isBoolean(backward) && backward) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 698);
activeDescendant--;
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 699);
focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);
                    } 
                    else {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 702);
activeDescendant++;
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 703);
focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);
                    }
                }
                else {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 707);
focusManager.focus(instance._getFirstFocusNode());
                }
        },

        /**
         * Makes the focus set on next element when a checkbox is clicked.<br>
         * @method _shiftFocusFromCheckbox
         * @param {eventTarget} e
         * @private
        */
        _shiftFocusFromCheckbox: function(e) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_shiftFocusFromCheckbox", 717);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 718);
var instance = this,
                checkboxNode = e.target;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 720);
if (checkboxNode.hasClass('itsa-formelement-lastelement')) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 721);
instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());
            }
            else {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 724);
instance.shiftFocus(false, checkboxNode);
            }
        },

        /**
         * Internal function that is called by 'keydown'-event when using input-elements.<br>
         * If the element has keyvalidation, then its keyvalidation-function is called, which could prevent the keyinput.<br>
         * If Enter is pressed, the focus is set on the next element <b>or</b> if it's the last element the ACTION_HIDE is called<br>
         * If the element has autocorrection, autocorrect-function is called.<br>
         * If this returns false, then all buttons with button.validation=true get disabled and  ACTION_HIDE is prevented, if returns true, all these buttons get enabled.
         * @method _checkInput
         * @param {eventTarget} e
         * @private
        */
        _checkInput: function(e) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_checkInput", 738);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 739);
var instance = this,
                node = e.target,
                autoCorrection,
                autoCorrectResult,
                eventArgs = instance._activePanelOption.eventArgs;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 744);
if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 745);
Y.mix(e, eventArgs);
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 746);
if (!instance.inputElement.get('keyValidation')(e)) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 747);
return;
                }
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 750);
if (e.keyCode===13) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 751);
e.preventDefault();
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 752);
if (node.hasClass('itsa-formelement-lastelement')) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 753);
autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 754);
autoCorrectResult = true;
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 755);
if (autoCorrection) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 756);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 757);
if (!autoCorrectResult) {
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 758);
eventArgs.showValidation();
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 759);
instance.deactivatePanel();
                            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 760);
instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());
                        }
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 763);
if (autoCorrectResult) {
                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 765);
node.setData('name', instance._getDefaultButtonNode().getData('name'));
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 766);
instance._actionHide(e);
                    }
                    else {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 769);
node.select();
                    }
                }
                else {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 773);
instance.shiftFocus();
                }
            }
        },

        /**
         * Internal function that is called when an descendant changes. To validate inputelements (if present)<br>
         * If the element has autocorrection, autocorrect-function is called.<br>If this returns false, then all buttons with button.validation=true get disabled, if returns true, all these buttons get enabled.
         * @method _validate
         * @private
        */
        _validate: function(isButton, node) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_validate", 784);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 785);
var instance = this,
                eventArgs = instance._activePanelOption.eventArgs,
                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),
                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),
                autoCorrectResult = true;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 790);
if (autoCorrection && buttonValidation) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 791);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 792);
if (!autoCorrectResult) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 793);
if (eventArgs && eventArgs.showValidation) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 794);
eventArgs.showValidation();
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 796);
instance.deactivatePanel();
                }
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 799);
if (autoCorrectResult) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 800);
if (eventArgs && eventArgs.hideValidation) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 801);
eventArgs.hideValidation();
                }
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 803);
instance.activatePanel();
            }
        },

        /**
         * Enables all buttons with button.validation=true
         * @method activatePanel
        */
        activatePanel: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "activatePanel", 811);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 812);
this._validationButtons.toggleClass('yui3-button-disabled', false);
        },

        /**
         * Disnables all buttons with button.validation=true
         * @method deactivatePanel
        */
        deactivatePanel: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "deactivatePanel", 819);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 820);
this._validationButtons.toggleClass('yui3-button-disabled', true);
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 828);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 829);
var instance = this;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 830);
if (instance.keyDownHandle) {instance.keyDownHandle.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 831);
if (instance._panelListener) {instance._panelListener.detach();} 
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 832);
if (instance._descendantListener) {instance._descendantListener.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 833);
if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 834);
if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 835);
if (instance._inputListener) {instance._inputListener.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 836);
if (instance._checkBoxListener) {instance._checkBoxListener.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 837);
if (instance._buttonsListener) {instance._buttonsListener.detach();}
        },

        //==============================================================================

        /**
         * Internal method that looks for all buttons with button.validation=true and markes them with a validated-class<br>
         * Will be executed when the buttons are changed.
         * @method _setValidationButtons
         * @param {eventTarget} e
         * @private
        */
        _setValidationButtons : function(e) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_setValidationButtons", 849);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 850);
var instance = this,
                buttonsObject = instance._activePanelOption.buttons,
                contentBox = instance.get('contentBox');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 853);
contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 854);
if (buttonsObject) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 855);
if (buttonsObject.header) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 856);
Y.Array.each(
                        buttonsObject.header,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 862);
if (buttonsObject.body) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 863);
Y.Array.each(
                        buttonsObject.body,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 869);
if (buttonsObject.footer) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 870);
Y.Array.each(
                        buttonsObject.footer,
                        instance._markButtonValidated,
                        instance
                    );
                }
            }
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 877);
instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');
        },

        /**
         * Internal method that markes a button with a validated-class if it has button.validation=true<br>
         * @method _markButtonValidated
         * @param {Object} buttonObject 
         * @param {Int} index
         * @param {Array} array 
         * @private
        */
        _markButtonValidated : function(buttonObject, index, array) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_markButtonValidated", 888);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 889);
var instance = this,
                name = buttonObject.name,
                validation,
                buttonNode;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 893);
buttonNode = instance.getButton(name);
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 894);
if (buttonNode) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 895);
validation = buttonObject.validation;
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 896);
if (Lang.isBoolean(validation) && validation) {
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 897);
buttonNode.addClass('itsadialogbox-button-validated');
                }
            }
        },

        /**
         * Definition of the predefined Panels (like showMessage() etc.)
         * @method _initiatePanels
         * @private
        */
        _initiatePanels : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_initiatePanels", 907);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 908);
var instance = this;
            // creating getRetryConfirmation
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 910);
instance.definePanel({
                iconClass: instance.ICON_WARN,
                buttons: {
                    footer: [
                        {name:'abort', label:'Abort', action:instance.ACTION_HIDE},
                        {name:'ignore', label:'Ignore', action:instance.ACTION_HIDE},
                        {name:'retry', label:'Retry', action:instance.ACTION_HIDE, isDefault: true}    
                    ]
                }    
            });
            // creating getConfirmation
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 921);
instance.definePanel({
                iconClass: instance.ICON_INFO,
                buttons: {
                    footer: [
                        {name:'no', label:'No', action:instance.ACTION_HIDE},
                        {name:'yes', label:'Yes', action:instance.ACTION_HIDE, isDefault: true}    
                    ]
                }    
            });
            // creating getInput
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 931);
instance.definePanel({
                iconClass: instance.ICON_QUESTION,
                form: [
                    {name:'count', label:'{message}', value:'{count}'}
                ],
                buttons: {
                    footer: [
                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}    
                    ]
                }    
            });
            // creating getNumber
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 944);
instance.definePanel({
                iconClass: instance.ICON_QUESTION,
                form: [
                    {name:'count', label:'{message}', value:'{count}'}
                ],
                buttons: {
                    footer: [
                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}    
                    ]
                }    
            });
            // creating showErrorMessage
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 957);
instance.definePanel({
                iconClass: instance.ICON_ERROR,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    
                    ]
                }    
            });
            // creating showMessage
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 966);
instance.definePanel({
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    
                    ]
                }    
            });
            // creating showWarning
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 974);
instance.definePanel({
                iconClass: instance.ICON_WARN,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}    
                    ]
                }    
            });
        },

        /**
         * Definition of the predefined Panels (like showMessage() etc.)
         * this can be a form-element. But if no form-element has focus defined, the first form-element should get focus.
         * If no form element is present, then the defaultbutton should get focus
         * @method _getFirstFocusNode
         * @private
         * return {Y.Node} the Node that should get focus when panel is showed.
        */
        _getFirstFocusNode: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getFirstFocusNode", 992);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 993);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusnode;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 996);
focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') || instance._getDefaultButtonNode();
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 997);
return focusnode;
        },

        /**
         * Returns the default button: the buttonNode that has the primary focus.<br>
         * This should be set during definition of PanelOptions.
         * @method _getDefaultButtonNode
         * @private
         * return {Y.Node} buttonNode
        */
        _getDefaultButtonNode: function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getDefaultButtonNode", 1007);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1008);
var node = this.get('contentBox').one('.yui3-button-primary');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1009);
return node;
        },

        /**
         * Returns all form-elements in panel
         * @method _serializeForm
         * @private
         * return {Object} Contains all form-elements with name/value pair
        */
        _serializeForm: function(masterNode) {
            // At this moment only text-inputs are allowed.
            // at later stage, handle this by Y.ITSAFORM with a true serialize function
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_serializeForm", 1018);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1021);
var instance = this,
                formelements = masterNode.all('.itsa-formelement'),
                value,
                intValue,
                serialdata = {};
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1026);
formelements.each(
                function(formelementNode, index, nodeList) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 8)", 1027);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1028);
value = formelementNode.get('value');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1029);
intValue = parseInt(value, 10);
                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1031);
serialdata[formelementNode.get('name')] = (value==intValue) ? intValue : value;
                }
            );
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1034);
return serialdata;
        }

    }, {
        ATTRS : {
        }
    }
);

//=================================================================================

_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1045);
if (!Y.Global.ItsaDialog) {
    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1046);
Y.Global.ItsaDialog = new Y.ITSADIALOGBOX({
        visible: false,
        centered: true,
        render : true,
        zIndex : 21000,
        modal  : true,
        bodyContent : '',
        focusOn: [
            {eventName: 'clickoutside'}
        ]
    });
    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1057);
Y.Global.ItsaDialog.plug(Y.Plugin.Drag);
    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1058);
Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');
}

//=================================================================================

// Y.ITSAFORMELEMENT should get an own module. For the short time being, we will keep it inside itsa-dialog

/**
 * The Itsa Dialogbox module.
 *
 * @module itsa-dialogbox
 */

/**
 * Dialogbox with sugar messages
 * 
 *
 * @class ITSAFormelement
 * @extends Panel
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1084);
var ITSAFORM_TABLETEMPLATE = '<td class="itsaform-tablelabel{classnamelabel}"{marginstyle}>{label}</td>'
                            +'<td class="itsaform-tableelement">{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div></td>',
    ITSAFORM_INLINETEMPLATE = '<span class="itsaform-spanlabel{classnamelabel}"{marginstyle}>{label}</span>'
                            +'{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div>';

_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1089);
Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {

        id: null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "initializer", 1099);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1100);
this.id = Y.guid();
        },

        /**
         * Renderes a String that contains the completeFormElement definition.<br>
         * To be used in an external Form
         * @method render
         * @param {boolean} tableform If the renderedstring should be in tableform: encapsuled by td-elements (without tr)
         * @return {String} rendered String
        */
        render : function(tableform) {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "render", 1110);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1111);
var instance = this,
                marginTop = instance.get('marginTop'),
                marginStyle = marginTop ? ' style="margin-top:' + marginTop + 'px"' : '',
                type = instance.get('type'),
                classNameLabel = instance.get('classNameLabel'),
                classNameValue = instance.get('classNameValue'),
                initialFocus = instance.get('initialFocus'),
                selectOnFocus = instance.get('selectOnFocus'),
                keyValidation = instance.get('keyValidation'),
                validation = instance.get('validation'),
                autoCorrection = instance.get('autoCorrection'),
                initialFocusClass = initialFocus ? ' itsa-formelement-firstfocus' : '',
                selectOnFocusClass = selectOnFocus ? ' itsa-formelement-selectall' : '',
                keyValidationClass = keyValidation ? ' itsa-formelement-keyvalidation' : '',
                validationClass = validation ? ' itsa-formelement-validation' : '',
                autoCorrectionClass = autoCorrection ? ' itsa-formelement-autocorrect' : '',
                elementClass = ' class="itsa-formelement ' + classNameValue + initialFocusClass + selectOnFocusClass + keyValidationClass + validationClass + autoCorrectionClass+'"',
                element = '';
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1129);
if (type==='input') {element = '<input id="' + instance.id + '" type="text" name="' + instance.get('name') + '" value="' + instance.get('value') + '"' + elementClass + marginStyle + ' />';}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1130);
return  Lang.sub(
                        tableform ? ITSAFORM_TABLETEMPLATE : ITSAFORM_INLINETEMPLATE,
                        {
                            marginstyle: marginStyle,
                            label: instance.get('label'),
                            element: element,
                            classnamelabel: classNameLabel,
                            validationMessage: instance.get('validationMessage'),
                            classnamevalue: classNameValue
                        }
                    );
        },

        /**
         * Shows the validationmessage
         * @method showValidation
        */
        showValidation : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showValidation", 1147);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1148);
var element = this.get('elementNode');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1149);
if (element) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1150);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);
            }
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
        */
        hideValidation : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "hideValidation", 1158);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1159);
var element = this.get('elementNode');
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1160);
if (element) {
                _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1161);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 1170);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1171);
var instance = this;
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1172);
if (instance.blurevent) {instance.blurevent.detach();}
            _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1173);
if (instance.keyevent) {instance.keyevent.detach();}
        }

    }, {
        ATTRS : {
            /**
             * @description The value of the element
             * @attribute [value]
             * @type String | Boolean | Array(String)
            */
            name : {
                value: 'undefined-name',
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1185);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1186);
var node = this.get('elementNode');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1187);
if (node) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1188);
node.set('name', val);
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1190);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1192);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1193);
return (Lang.isString(val));
                }
            },
            /**
             * @description Must have one of the following values:
             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>
             * @attribute typr
             * @type String
            */
            type : {
                value: '',
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1204);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1205);
if (Lang.isString(val)) {val=val.toLowerCase();}
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1206);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1208);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1209);
return (Lang.isString(val) && 
                            ((val==='input') || 
                             (val==='password') || 
                             (val==='textarea') || 
                             (val==='checkbox') || 
                             (val==='radiogroup') || 
                             (val==='selectbox') || 
                             (val==='button') || 
                             (val==='hidden')
                            )
                    );
                }
            },
            /**
             * @description The value of the element
             * @attribute [value]
             * @type String | Boolean | Array(String)
            */
            value : {
                value: null,
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1229);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1230);
var node = this.get('elementNode');
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1231);
if (node) {
                        _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1232);
node.set('value', val);
                    }
                    _yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1234);
return val;
                }
            },
            /**
             * @description The label that wis present before the element
             * @attribute [label]
             * @type String
            */
            label : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1244);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1245);
return (Lang.isString(val));
                }
            },
            /**
             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-keyvalidation'.
             * The function MUST return true or false.
             * @attribute [keyValidation]
             * @type Function
            */
            keyValidation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1257);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1258);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description Validation after changing the value (onblur). The function should return true or false. In case of false, the validationerror is thrown.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-validation'.
             * The function MUST return true or false.
             * Either use validation, or autocorrection.
             * @attribute [validation]
             * @type Function
             * @return Boolean
            */
            validation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1272);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1273);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description The message that will be returned on a validationerror, this will be set within e.message.
             * @attribute [validationMessage]
             * @type String
            */
            validationMessage : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1283);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1284);
return (Lang.isString(val));
                }
            },
            /**
             * @description If set, value will be replaces by the returnvalue of this function. <br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds the className 'itsa-formelement-autocorrect'.
             * The function MUST return true or false: defining whether the input is accepted.
             * Either use validation, or autocorrection.
             * @attribute [autocorrection]
             * @type Function
             * @return Boolean
            */
            autoCorrection : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1298);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1299);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description Additional className that is passed on the label, during rendering.<br>
             * Only applies to rendering in tableform render(true).
             * @attribute [classNameLabel]
             * @type String
            */
            classNameLabel : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1310);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1311);
return (Lang.isString(val));
                }
            },
            /**
             * @description Additional className that is passed on the value, during rendering.<br>
             * Only applies to rendering in tableform render(true).
             * @attribute [classNameValue]
             * @type String
            */
            classNameValue : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1322);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1323);
return (Lang.isString(val));
                }
            },
            /**
             * @description Will create extra white whitespace during rendering.<br>
             * Only applies to rendering in tableform render(true).
             * @attribute [marginTop]
             * @type Int
            */
            marginTop : {
                value: 0,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1334);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1335);
return (Lang.isNumber(val));
                }
            },
            /**
             * @description Determines whether this element should have the initial focus.<br>
             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).
             * @attribute [initialFocus]
             * @type Boolean
            */
            initialFocus : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1346);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1347);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description Determines whether this element should completely be selected when it gets focus.<br>
             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).
             * @attribute [selectOnFocus]
             * @type Boolean
            */
            selectOnFocus : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1358);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1359);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description DOM-node where the elementNode is bound to.<br>
             * Be carefull: it will only return a Node when you have manually inserted the result of this.render() into the DOM. Otherwise returns null.
             * Readonly
             * @attribute [elementNode]
             * @type Y.Node
             * @readonly
            */
            elementNode : {
                value: null,
                readOnly: true,
                getter: function() {
                    _yuitest_coverfunc("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getter", 1373);
_yuitest_coverline("/build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1374);
return Y.one('#'+this.id);
                }
            }
        }
    }
);


}, '@VERSION@' ,{requires:['base-build', 'panel', 'node-base', 'dd-plugin', 'node-focusmanager', 'event-valuechange'], skinnable:true});
