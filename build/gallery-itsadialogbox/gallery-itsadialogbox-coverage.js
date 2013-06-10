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
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadialogbox/gallery-itsadialogbox.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].code=["YUI.add('gallery-itsadialogbox', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Dialogbox module."," *"," *"," * Dialogbox with sugar messages"," *"," * @module gallery-itsadialogbox"," * @class ITSADialogbox"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    ITSADIALOG_ICON_TEMPLATE = \"<div class='itsadialogbox-icon {iconclass}'></div>\",","    ITSADIALOG_BODY_TEMPLATE = \"<div{bdclass}>{bdtext}</div>\",","","    ITSAFORM_TABLETEMPLATE = '<td class=\"itsaform-tablelabel{classnamelabel}\"{paddingstyle}>{label}</td>'+","                            '<td class=\"itsaform-tableelement\"{paddingstyle}>{element}'+","                            '<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div></td>',","    ITSAFORM_INLINETEMPLATE = '<span class=\"itsaform-spanlabel{classnamelabel}\"{marginstyle}>{label}</span>'+","                            '{element}<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div>';","","//======================================","Y.ITSADIALOGBOX = Y.Base.create('itsadialogbox', Y.Panel, [], {","","        ICON_BUBBLE : 'icon-bubble',","        ICON_INFO : 'icon-info',","        ICON_QUESTION : 'icon-question',","        ICON_WARN : 'icon-warn',","        ICON_ERROR : 'icon-error',","        ICON_SUCCESS : 'icon-success',","        ACTION_HIDE : '_actionHide',","        ACTION_STAYALIVE : '_actionStayAlive',","        ACTION_RESET : '_actionReset',","        ACTION_CLEAR : '_actionClear',","        panelOptions : [],","        _activePanelOption : null,","        _validationButtons : null,","        _descendantChange : 0,","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property ICON_BUBBLE"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_INFO"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_QUESTION"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_WARN"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_ERROR"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_SUCCESS"," * @type String"," */","","/**"," * Reference to the hide-function that can be attached to button.action. This function closes the Panel and executes the callback."," * @property ACTION_HIDE"," * @type String"," */","","/**"," * Reference to the stayalive-function that can be attached to button.action. This function just execute the callback, but the Panel stays alive."," * In need you just want to read the Panel-values."," * @property ACTION_STAYALIVE"," * @type String"," */","","/**"," * Reference to the clear-function that can be attached to button.action. This function will clear any form-elements."," * @property ACTION_CLEAR"," * @type String"," */","","/**"," * Reference to the reset-function that can be attached to button.action. This function will reset any form-elements."," * @property ACTION_RESET"," * @type String"," */","","/**"," * Internal Array that holds all registred paneloptions, created through definePanel()"," * @property panelOptions"," * @type Array"," */","","/**"," * Internal reference to the active panelOptions (which is active after showPanel() is called"," * @property _activePanelOption"," * @type Object"," */","","/**"," * Nodelist that contains all current (from _activePanelOption) buttons that have button.validated set to true."," * @property _validationButtons"," * @type Y.NodeList"," */","","/**"," * Internal count that keeps track of how many times a descendentChange has been taken place by the focusManager"," * @property _descendantChange"," * @type Int"," */","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {","                descendants: 'button, input, textarea',","                circular: true,","                focusClass: 'focus'","            });","            instance._initiatePanels();","        },","","        /**","         * Defines a new Panel and stores it to the panelOptions-Array. Returns an panelId that can be used sot show the Panel later on using","         * showPanel(panelId).<br>","         * PanelOptions is an object that can have the following fields:<br>","           <ul><li>iconClass (String) className for the icon, for example Y.Global.ItsaDialog.ICON_QUESTION</li>","               <li>form (Array) Array with objects that will be transformed to Y.FORMELEMENT objects (not currently available)</li>","               <li>buttons (Object) Which buttons to use. For example:","               <br>&nbsp;&nbsp;{","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;footer: [","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'cancel', label:'Cancel', action: Y.Global.ItsaDialog.ACTION_HIDE},","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'ok', label:'Ok',","                                action: Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;]","               &nbsp;&nbsp;}","               </li>","            </ul>","            <br><br>","            You can use 4 actionfunctions to attach at the button: Y.Global.ItsaDialog.ACTION_HIDE, Y.Global.ItsaDialog.ACTION_STAYALIVE,","            Y.Global.ItsaDialog.ACTION_RESET and Y.Global.ItsaDialog.ACTION_CLEAR","         * @method definePanel","         * @param {Object} panelOptions The config-object.","         * @return {Integer} unique panelId","        */","        definePanel: function(panelOptions) {","            var instance = this;","            if (Lang.isObject(panelOptions)) {","                instance.panelOptions.push(panelOptions);","                return instance.panelOptions.length - 1;","            }","            else {","                return -1;","            }","        },","","        /**","         * Removes a panel by its panelId (which is generated by this.definePanel())","         *","         * @method removePanel","         * @param {Int} panelId Id of the panel to be removed. Retreive this value during definePanel()","        */","        removePanel: function(panelId) {","            var instance = this;","            if ((panelId>=0) && (panelId<instance.panelOptions.length)) {instance.panelOptions.splice(panelId, 1);}","        },","","        /**","         * Shows the panel when you have a panelId. For usage with custom panels. The sugarmethods (showMessage() f.i.)","         * use this method under the hood).","         *","         * @method showPanel","         * @param {Int} panelId Id of the panel that has to be shown. Retreive this value during definePanel()","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} [bodyText] showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want custom buttons that differ from those defined during definePanel.","         * @param {String} [customIconclass] In case you want to use an iconclass that is different from to one defined during definePanel.","         *                                                        Example: Y.Global.ItsaDialog.ICON_WARN","         * @param {Object} [eventArgs] do not use, only internal (temporarely)","        */","        showPanel: function(panelId, title, bodyText, callback, context, args, customButtons, customIconclass, eventArgs) {","            var instance = this,","                iconClass,","                contentBox = instance.get('contentBox');","            if ((panelId>=0) && (panelId<instance.panelOptions.length)) {","                instance._activePanelOption = instance.panelOptions[panelId];","                iconClass = customIconclass || instance._activePanelOption.iconClass;","                instance.get('boundingBox').toggleClass('withicon', Lang.isString(iconClass));","                // in case no title is given, the third argument will be the callback","                if (!Lang.isString(bodyText)) {","                    args = context;","                    context = callback;","                    callback = bodyText;","                    bodyText = title;","                    title = '&nbsp;'; // making the header appear","                }","                instance.set('headerContent', title || '&nbsp;'); // always making the header appear by display &nbsp;","                instance.set('bodyContent', (iconClass ? Lang.sub(ITSADIALOG_ICON_TEMPLATE, {iconclass: iconClass}) : '')","                    + Lang.sub(ITSADIALOG_BODY_TEMPLATE, {bdclass: (iconClass ? ' class=\"itsadialogbox-messageindent\"' : ''), bdtext: bodyText}));","                instance.set('buttons', customButtons || instance._activePanelOption.buttons || {});","                instance._activePanelOption.callback = callback;","                instance._activePanelOption.context = context;","                instance._activePanelOption.args = args;","                instance._activePanelOption.eventArgs = eventArgs;","                // refreshing focusdescendents","                contentBox.focusManager.refresh();","                // recenter dialogbox in case it has been moved","                instance.centered();","                instance.activatePanel();","                contentBox.focusManager.focus(instance._getFirstFocusNode());","                instance.show();","            }","        },","","        //==============================================================================","","        /**","         * Shows a Panel with the buttons: <b>Abort Ignore Retry</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getRetryConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        getRetryConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {","            this.showPanel(0, title, question, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with the buttons: <b>No Yes</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        getConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {","            this.showPanel(1, title, question, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b><br>","         * @method getInput","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {String} [defaultmessage] showed inside the form-input.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getInput: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {","            var instance = this;","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultmessage,","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 10,","                initialFocus: true,","                selectOnFocus: true","            });","            instance.showPanel(2, title, message + '<br>' + instance.inputElement.render(), callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a login-Panel with an username/password fields and the buttons: <b>Cancel Ok</b><br>","         * @method getLogin","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {Object} [logindata] this data will be used to present the formfields and defaultinput-values.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getLogin: function(title, message, logindata, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                logintable;","            logindata = {","                usernameLabel: 'username',","                passwordLabel: 'password',","                defaultUsername: 'enter username'","            };","            instance.inputElementUsername = new Y.ITSAFORMELEMENT({","                label: logindata.usernameLabel,","                name: 'username',","                type: 'input',","                value: logindata.defaultUsername,","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-firstelement',","                marginTop: 24,","                initialFocus: true,","                selectOnFocus: true","            });","            instance.inputElementPassword = new Y.ITSAFORMELEMENT({","                label: logindata.passwordLabel,","                name: 'password',","                type: 'password',","                value: '',","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 7,","                initialFocus: false,","                selectOnFocus: true","            });","            logintable = '<table><tbody>';","            logintable += '<tr>'+instance.inputElementUsername.render(true)+'</tr>';","            logintable += '<tr>'+instance.inputElementPassword.render(true)+'</tr>';","            logintable += '</tbody></table>';","            instance.showPanel(7, title, message + '<br>' + logintable, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b>. Only accepts integer-number as return.<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","         * @method getNumber","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {Integer} [defaultvalue] showed inside the form-input.","         * @param {Integer} [minvalue] used for validation.","         * @param {Integer} [maxvalue] used for validation.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {Integer} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getNumber: function(title, message, defaultvalue, minvalue, maxvalue, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                withMinValue = Lang.isNumber(minvalue),","                withMaxValue = Lang.isNumber(maxvalue),","                validationMessage = '',","                eventArguments = {};","            if (withMinValue && withMaxValue) {","                validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;","            }","            else {","                if (withMinValue) {","                    validationMessage = 'Input must not be below '+minvalue;","                }","                if (withMaxValue) {","                    validationMessage = 'Input must not be above '+maxvalue;","                }","            }","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultvalue ? defaultvalue.toString() : '',","                label: message,","                keyValidation: function(e) {","                    var keycode = e.keyCode,","                        node = e.target,","                        reactivation = true,","                        cursor = node.get('selectionStart'),","                        cursorEnd = node.get('selectionEnd'),","                        previousStringValue = node.get('value'),","                        safeNumericalKeyCodeToString = String.fromCharCode(((keycode>=96) && (keycode<=105)) ? keycode - 48 : keycode),","                        nextValue,","                        minValue = e.minValue,","                        maxValue = e.maxValue,","                        digits = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],","                        valid = [8,9,13,27,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,173,189,45,96,97,98,99,100,101,102,103,104,105,109],","                        // 173,189,45 all can be minus-token","                        minustoken = [173,189,45,109];","                    if (Y.Array.indexOf(valid, keycode) === -1) {","                        e.halt(true);","                        return false;","                    }","                    if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) &&","                                                                                     (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at the beginning when minimum>0","                    if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at second position when first position=0","                    if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {","                        e.halt(true);","                        return false;","                    }","                    // no minus at the beginning when minimum>=0","                    if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // no minus when not at the beginning","                    if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // not valid when number will become lower than minimum, only check if field is modified","                    if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) &&","                        ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {","                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical","                        // keyboard will be transformed to normal keyboard","                        if (keycode===8) {","                            nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) +","                                                previousStringValue.substring(cursorEnd), 10);","                        }","                        else if (keycode===46) {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) +","                                                previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);","                        }","                        else {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString +","                                                previousStringValue.substring(cursorEnd), 10);","                        }","                        if (!Lang.isNumber(nextValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(minValue) && (nextValue<minValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                    }","                    // correct possible 0x by removing leading 0","                    // because for some reason, this also is called when got blurred: do only check if number is digit","                    if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {","                        node.set('value', '');","                    }","                    // only reactivate when the key is not a key that leaves the element","                    if ((keycode!==9) && (keycode!==13)) {","                        if (reactivation && e.hideValidation) {e.hideValidation();}","                        if (reactivation && e.activatePanel) {e.activatePanel();}","                    }","                    return true;","                },","                autoCorrection: function(e) {","                    var formelement = this,","                        minvalue = e && e.minValue,","                        maxvalue = e && e.maxValue,","                        previousValue = formelement.get('elementNode').get('value'),","                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,","                        newValue = parseInt(value, 10);","                    formelement.set('value', newValue.toString());","                    if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {","                        if (e.showValidation) {e.showValidation();}","                        if (e.activatePanel) {e.activatePanel();}","                        return false;","                    }","                    return true;","                },","                validationMessage: validationMessage,","                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',","                initialFocus: true,","                selectOnFocus: true","            });","            if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}","            if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}","            if (validationMessage) {","                eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);","                eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);","            }","            if (eventArguments.minValue || eventArguments.maxValue) {","                eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);","                eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);","            }","            instance.showPanel(3, title, instance.inputElement.render(), callback, context, args, customButtons, customIconclass, eventArguments);","        },","","        /**","         * Shows an ErrorMessage (Panel)","         * @method showErrorMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showErrorMessage: function(title, errormessage, callback, context, args) {","            this.showPanel(4, title, errormessage, callback, context, args);","        },","","        /**","         * Shows a Message (Panel)","         * @method showMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        showMessage: function(title, message, callback, context, args, customButtons, customIconclass) {","            this.showPanel(5, title, message, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows an Warning (Panel)","         * @method showWarning","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} warning showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showWarning: function(title, warning, callback, context, args) {","            this.showPanel(6, title, warning, callback, context, args);","        },","","        //==============================================================================","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionHide","         * @param {eventTarget} e","         * @private","        */","        _actionHide: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                instance.hide();","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            }","        },","","        /**","         * Just executes the callback while the Panel stays on the screen. Used when you just want to read form-information for example.<br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionStayAlive: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            }","        },","","        /**","         * Resets any form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionReset: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * Clears all form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionClear: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * overrules Y.panel.focus, by focussing on the panel first, and then using the focusmanager to focus on the right element.","         * @method focus","        */","        focus: function(){","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            // apply returns something, call just runs. First argument is 'this' in the function, next arguments are the arguments in targetfunction","            instance.constructor.superclass.focus.call(instance);","            if (focusManager) {","                focusManager.focus();","            }","        },","","        /**","         * Define all eventhandlers","         * @method bindUI","        */","        bindUI: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            instance._panelListener = contentBox.on(","                'keydown',","                function (e) {","                    if (e.keyCode === 9) { // tab","                        e.preventDefault();","                        this.shiftFocus(e.shiftKey);","                    }","                },","                instance","            );","            instance._buttonsListener = instance.after(","                'buttonsChange',","                instance._setValidationButtons,","                instance","            );","            instance._descendantListener = focusManager.on(","                'activeDescendantChange',","                function (e) {","                    var instance = this,","                        previousDescendant = e.prevVal,","                        nextDescendant = e.newVal,","                        defaultButton,","                        isButton,","                        allDescendants = focusManager.get('descendants'),","                        sameDescendant;","                    instance._descendantChange++;","                    if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}","                    if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}","                    sameDescendant = nextDescendant.compareTo(previousDescendant);","                    defaultButton = contentBox.one('.yui3-button-primary');","                    isButton = (nextDescendant.get('tagName')==='BUTTON');","                    if (defaultButton) {","                        defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));","                    }","                    // to make a pressed button highlighted, we must add a seperate class","                    allDescendants.removeClass('mousepressfocus');","                    if (isButton) {","                        nextDescendant.addClass('mousepressfocus');","                    }","                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state","                    // in case of an element that gets focused.","                    // To make the content be selected again (if requested) look at the value of instance._descendant","                    if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {","                        nextDescendant.select();","                    }","                    if (!sameDescendant) {","                        instance._validate(isButton, nextDescendant);","                    }","                },","                instance,","                contentBox","            );","            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events","            // instead of binding it to the headernode","            instance._headerMousedownListener = contentBox.delegate(","                'mousedown',","                function(e) {e.target.addClass('cursormove');},","                '.yui3-widget-hd'","            );","            instance._headerMouseupListener = contentBox.delegate(","                'mouseup',","                function(e) {e.target.removeClass('cursormove');},","                '.yui3-widget-hd'","            );","            // same for input elements","            instance._inputListener = contentBox.delegate(","                'keydown',","                instance._checkInput,","                'input',","                instance","            );","            // now, listen for checkboxes: the loose focus when they get clicked.","            instance._checkBoxListener = contentBox.delegate(","                'change',","                instance._shiftFocusFromCheckbox,","                function(){","                    var node =this;","                    return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));","                },","                instance","            );","            // reset the focus when clicked on an area inside contentBox that is not an element","            contentBox.on(","                'click',","                function() {","                    // this = focusManeger","                    this.focus(this.get('activeDescendant'));","                },","                focusManager","            );","        },","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method shiftFocus","         * @param {Boolean} [backward] direction to shift","         * @param {eventTarget} [referenceNode] startnode, when not supplied, the node that currently has focused will be used.","        */","        shiftFocus: function(backward, referenceNode) {","            var instance = this,","                focusManager = instance.get('contentBox').focusManager,","                focusManagerNodes = focusManager.get('descendants'),","                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),","                numberDescendants = focusManagerNodes.size();","                if (referenceNode || focusManager.get('focused')) {","                    if (Lang.isBoolean(backward) && backward) {","                        activeDescendant--;","                        focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);","                    }","                    else {","                        activeDescendant++;","                        focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);","                    }","                }","                else {","                    focusManager.focus(instance._getFirstFocusNode());","                }","        },","","        /**","         * Makes the focus set on next element when a checkbox is clicked.<br>","         * @method _shiftFocusFromCheckbox","         * @param {eventTarget} e","         * @private","        */","        _shiftFocusFromCheckbox: function(e) {","            var instance = this,","                checkboxNode = e.target;","            if (checkboxNode.hasClass('itsa-formelement-lastelement')) {","                instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());","            }","            else {","                instance.shiftFocus(false, checkboxNode);","            }","        },","","        /**","         * Internal function that is called by 'keydown'-event when using input-elements.<br>","         * If the element has keyvalidation, then its keyvalidation-function is called, which could prevent the keyinput.<br>","         * If Enter is pressed, the focus is set on the next element <b>or</b> if it's the last element the ACTION_HIDE is called<br>","         * If the element has autocorrection, autocorrect-function is called.<br>","         * If this returns false, then all buttons with button.validation=true get disabled and  ACTION_HIDE is prevented, if returns true,","         * all these buttons get enabled.","         * @method _checkInput","         * @param {eventTarget} e","         * @private","        */","        _checkInput: function(e) {","            var instance = this,","                node = e.target,","                autoCorrection,","                autoCorrectResult,","                eventArgs = instance._activePanelOption.eventArgs;","            if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {","                Y.mix(e, eventArgs);","                if (!instance.inputElement.get('keyValidation')(e)) {","                    return;","                }","            }","            if (e.keyCode===13) {","                e.preventDefault();","                if (node.hasClass('itsa-formelement-lastelement')) {","                    autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');","                    autoCorrectResult = true;","                    if (autoCorrection) {","                        autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                        if (!autoCorrectResult) {","                            eventArgs.showValidation();","                            instance.deactivatePanel();","                            instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());","                        }","                    }","                    if (autoCorrectResult) {","                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node","                        node.setData('name', instance._getDefaultButtonNode().getData('name'));","                        instance._actionHide(e);","                    }","                    else {","                        node.select();","                    }","                }","                else {","                    instance.shiftFocus();","                }","            }","        },","","        /**","         * Internal function that is called when an descendant changes. To validate inputelements (if present)<br>","         * If the element has autocorrection, autocorrect-function is called.<br>If this returns false, then all buttons with button.validation=true","         * get disabled, if returns true, all these buttons get enabled.","         * @method _validate","         * @private","        */","        _validate: function(isButton, node) {","            var instance = this,","                eventArgs = instance._activePanelOption.eventArgs,","                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),","                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),","                autoCorrectResult = true;","            if (autoCorrection && buttonValidation) {","                autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                if (!autoCorrectResult) {","                    if (eventArgs && eventArgs.showValidation) {","                        eventArgs.showValidation();","                    }","                    instance.deactivatePanel();","                }","            }","            if (autoCorrectResult) {","                if (eventArgs && eventArgs.hideValidation) {","                    eventArgs.hideValidation();","                }","                instance.activatePanel();","            }","        },","","        /**","         * Enables all buttons with button.validation=true","         * @method activatePanel","        */","        activatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', false);","        },","","        /**","         * Disnables all buttons with button.validation=true","         * @method deactivatePanel","        */","        deactivatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', true);","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this;","            if (instance.keyDownHandle) {instance.keyDownHandle.detach();}","            if (instance._panelListener) {instance._panelListener.detach();}","            if (instance._descendantListener) {instance._descendantListener.detach();}","            if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}","            if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}","            if (instance._inputListener) {instance._inputListener.detach();}","            if (instance._checkBoxListener) {instance._checkBoxListener.detach();}","            if (instance._buttonsListener) {instance._buttonsListener.detach();}","            instance.panelOptions.length = 0;","        },","","        //==============================================================================","","        /**","         * Internal method that looks for all buttons with button.validation=true and markes them with a validated-class<br>","         * Will be executed when the buttons are changed.","         * @method _setValidationButtons","         * @private","        */","        _setValidationButtons : function() {","            var instance = this,","                buttonsObject = instance._activePanelOption.buttons,","                contentBox = instance.get('contentBox');","            contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');","            if (buttonsObject) {","                if (buttonsObject.header) {","                    Y.Array.each(","                        buttonsObject.header,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.body) {","                    Y.Array.each(","                        buttonsObject.body,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.footer) {","                    Y.Array.each(","                        buttonsObject.footer,","                        instance._markButtonValidated,","                        instance","                    );","                }","            }","            instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');","        },","","        /**","         * Internal method that markes a button with a validated-class if it has button.validation=true<br>","         * @method _markButtonValidated","         * @param {Object} buttonObject","         * @private","        */","        _markButtonValidated : function(buttonObject) {","            var instance = this,","                name = buttonObject.name,","                validation,","                buttonNode;","            buttonNode = instance.getButton(name);","            if (buttonNode) {","                validation = buttonObject.validation;","                if (Lang.isBoolean(validation) && validation) {","                    buttonNode.addClass('itsadialogbox-button-validated');","                }","            }","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * @method _initiatePanels","         * @private","        */","        _initiatePanels : function() {","            var instance = this;","            // creating getRetryConfirmation","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'abort', label:'Abort', action:instance.ACTION_HIDE},","                        {name:'ignore', label:'Ignore', action:instance.ACTION_HIDE},","                        {name:'retry', label:'Retry', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating getConfirmation","            instance.definePanel({","                iconClass: instance.ICON_INFO,","                buttons: {","                    footer: [","                        {name:'no', label:'No', action:instance.ACTION_HIDE, isDefault: true},","                        {name:'yes', label:'Yes', action:instance.ACTION_HIDE}","                    ]","                }","            });","            // creating getInput","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}","                    ]","                }","            });","            // creating getNumber","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}","                    ]","                }","            });","            // creating showErrorMessage","            instance.definePanel({","                iconClass: instance.ICON_ERROR,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating showMessage","            instance.definePanel({","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating showWarning","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","","            // creating loginPanel (id=7)","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'username', label:'{username}', value:'{username}'},","                    {name:'password', label:'{password}', value:'{password}'}","                ],","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * this can be a form-element. But if no form-element has focus defined, the first form-element should get focus.","         * If no form element is present, then the defaultbutton should get focus","         * @method _getFirstFocusNode","         * @private","         * return {Y.Node} the Node that should get focus when panel is showed.","        */","        _getFirstFocusNode: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusnode;","            focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') ||","                                                                                                                instance._getDefaultButtonNode();","            return focusnode;","        },","","        /**","         * Returns the default button: the buttonNode that has the primary focus.<br>","         * This should be set during definition of PanelOptions.","         * @method _getDefaultButtonNode","         * @private","         * return {Y.Node} buttonNode","        */","        _getDefaultButtonNode: function() {","            var node = this.get('contentBox').one('.yui3-button-primary');","            return node;","        },","","        /**","         * Returns all form-elements in panel","         * @method _serializeForm","         * @private","         * return {Object} Contains all form-elements with name/value pair","        */","        _serializeForm: function(masterNode) {","            // At this moment only text-inputs are allowed.","            // at later stage, handle this by Y.ITSAFORM with a true serialize function","            var formelements = masterNode.all('.itsa-formelement'),","                  value,","                  intValue,","                  serialdata = {};","            formelements.each(","                function(formelementNode) {","                    value = formelementNode.get('value');","                    intValue = parseInt(value, 10);","                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer","                    serialdata[formelementNode.get('name')] = (value===intValue.toString()) ? intValue : value;","                }","            );","            return serialdata;","        }","","    }, {","        ATTRS : {","        }","    }",");","","//=================================================================================","","if (!Y.Global.ItsaDialog) {","    Y.Global.ItsaDialog = new Y.ITSADIALOGBOX({","        visible: false,","        centered: true,","        render : true,","        zIndex : 21000,","        modal  : true,","        bodyContent : '',","        focusOn: [","            {eventName: 'clickoutside'}","        ]","    });","    Y.Global.ItsaDialog.plug(Y.Plugin.Drag);","    Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');","}","","Y.ItsaDialogBox = Y.Global.ItsaDialog;","","//=================================================================================","","// Y.ITSAFORMELEMENT should get an own module. For the short time being, we will keep it inside itsa-dialog","","/**"," * Y.ITSAFORMELEMENT"," *"," * @module gallery-itsadialogbox"," * @class ITSAFormelement"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {","","        id: null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","        */","        initializer : function() {","            this.id = Y.guid();","        },","","        /**","         * Renderes a String that contains the completeFormElement definition.<br>","         * To be used in an external Form","         * @method render","         * @param {boolean} tableform If the renderedstring should be in tableform: encapsuled by td-elements (without tr)","         * @return {String} rendered String","        */","        render : function(tableform) {","            var instance = this,","                marginTop = instance.get('marginTop'),","                marginStyle = (marginTop && !tableform) ? ' style=\"margin-top:' + marginTop + 'px\"' : '',","                paddingStyle = marginTop ? ' style=\"padding-top:' + marginTop + 'px\"' : '',","                type = instance.get('type'),","                classNameLabel = instance.get('classNameLabel'),","                classNameValue = instance.get('classNameValue'),","                initialFocus = instance.get('initialFocus'),","                selectOnFocus = instance.get('selectOnFocus'),","                keyValidation = instance.get('keyValidation'),","                validation = instance.get('validation'),","                autoCorrection = instance.get('autoCorrection'),","                initialFocusClass = initialFocus ? ' itsa-formelement-firstfocus' : '',","                selectOnFocusClass = selectOnFocus ? ' itsa-formelement-selectall' : '',","                keyValidationClass = keyValidation ? ' itsa-formelement-keyvalidation' : '',","                validationClass = validation ? ' itsa-formelement-validation' : '',","                autoCorrectionClass = autoCorrection ? ' itsa-formelement-autocorrect' : '',","                elementClass = ' class=\"itsa-formelement ' + classNameValue + initialFocusClass + selectOnFocusClass + keyValidationClass +","                                          validationClass + autoCorrectionClass+'\"',","                element = '';","            if (type==='input') {element = '<input id=\"' + instance.id + '\" type=\"text\" name=\"' + instance.get('name') + '\" value=\"' +","                                                            instance.get('value') + '\"' + elementClass + marginStyle + ' />';}","            if (type==='password') {element = '<input id=\"' + instance.id + '\" type=\"password\" name=\"' + instance.get('name') + '\" value=\"' +","                                                                   instance.get('value') + '\"' + elementClass + marginStyle + ' />';}","            return  Lang.sub(","                        tableform ? ITSAFORM_TABLETEMPLATE : ITSAFORM_INLINETEMPLATE,","                        {","                            marginstyle: marginStyle,","                            paddingstyle: paddingStyle,","                            label: instance.get('label'),","                            element: element,","                            classnamelabel: classNameLabel,","                            validationMessage: instance.get('validationMessage'),","                            classnamevalue: classNameValue","                        }","                    );","        },","","        /**","         * Shows the validationmessage","         * @method showValidation","        */","        showValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);","            }","        },","","        /**","         * Hides the validationmessage","         * @method hideValidation","        */","        hideValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);","            }","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this;","            if (instance.blurevent) {instance.blurevent.detach();}","            if (instance.keyevent) {instance.keyevent.detach();}","        }","","    }, {","        ATTRS : {","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            name : {","                value: 'undefined-name',","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('name', val);","                    }","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Must have one of the following values:","             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>","             * @attribute typr","             * @type String","            */","            type : {","                value: '',","                setter: function(val) {","                    if (Lang.isString(val)) {val=val.toLowerCase();}","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val) &&","                            ((val==='input') ||","                             (val==='password') ||","                             (val==='textarea') ||","                             (val==='checkbox') ||","                             (val==='radiogroup') ||","                             (val==='selectbox') ||","                             (val==='button') ||","                             (val==='hidden')","                            )","                    );","                }","            },","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            value : {","                value: null,","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('value', val);","                    }","                    return val;","                }","            },","            /**","             * @description The label that wis present before the element","             * @attribute [label]","             * @type String","            */","            label : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds","             * the className 'itsa-formelement-keyvalidation'.","             * The function MUST return true or false.","             * @attribute [keyValidation]","             * @type Function","            */","            keyValidation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Validation after changing the value (onblur). The function should return true or false. In case of false,","             * the validationerror is thrown.<br>","             * Only has effect if the masterform knows how to use it through delegation:","             * therefore it adds the className 'itsa-formelement-validation'.","             * The function MUST return true or false.","             * Either use validation, or autocorrection.","             * @attribute [validation]","             * @type Function","             * @return Boolean","            */","            validation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description The message that will be returned on a validationerror, this will be set within e.message.","             * @attribute [validationMessage]","             * @type String","            */","            validationMessage : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description If set, value will be replaces by the returnvalue of this function. <br>","             * Only has effect if the masterform knows how to use it through delegation: therefore","             * it adds the className 'itsa-formelement-autocorrect'.","             * The function MUST return true or false: defining whether the input is accepted.","             * Either use validation, or autocorrection.","             * @attribute [autocorrection]","             * @type Function","             * @return Boolean","            */","            autoCorrection : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Additional className that is passed on the label, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameLabel]","             * @type String","            */","            classNameLabel : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Additional className that is passed on the value, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameValue]","             * @type String","            */","            classNameValue : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Will create extra white whitespace during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [marginTop]","             * @type Int","            */","            marginTop : {","                value: 0,","                validator: function(val) {","                    return (Lang.isNumber(val));","                }","            },","            /**","             * @description Determines whether this element should have the initial focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).","             * @attribute [initialFocus]","             * @type Boolean","            */","            initialFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description Determines whether this element should completely be selected when it gets focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).","             * @attribute [selectOnFocus]","             * @type Boolean","            */","            selectOnFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description DOM-node where the elementNode is bound to.<br>","             * Be carefull: it will only return a Node when you have manually inserted the result of this.render() into the DOM.","             * Otherwise returns null.","             * Readonly","             * @attribute [elementNode]","             * @type Y.Node","             * @readonly","            */","            elementNode : {","                value: null,","                readOnly: true,","                getter: function() {","                    return Y.one('#'+this.id);","                }","            }","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-build\",","        \"panel\",","        \"node-base\",","        \"node-event-delegate\",","        \"dd-plugin\",","        \"node-focusmanager\",","        \"event-valuechange\",","        \"event-custom-base\",","        \"node-core\",","        \"oop\"","    ]","});"];
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].lines = {"1":0,"3":0,"22":0,"33":0,"142":0,"143":0,"148":0,"175":0,"176":0,"177":0,"178":0,"181":0,"192":0,"193":0,"213":0,"216":0,"217":0,"218":0,"219":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"228":0,"229":0,"231":0,"232":0,"233":0,"234":0,"235":0,"237":0,"239":0,"240":0,"241":0,"242":0,"261":0,"277":0,"296":0,"297":0,"306":0,"325":0,"327":0,"332":0,"342":0,"352":0,"353":0,"354":0,"355":0,"356":0,"379":0,"384":0,"385":0,"388":0,"389":0,"391":0,"392":0,"395":0,"401":0,"415":0,"416":0,"417":0,"419":0,"421":0,"422":0,"425":0,"426":0,"427":0,"430":0,"431":0,"432":0,"435":0,"436":0,"437":0,"440":0,"441":0,"442":0,"445":0,"449":0,"450":0,"453":0,"454":0,"458":0,"461":0,"462":0,"463":0,"464":0,"466":0,"467":0,"468":0,"469":0,"471":0,"472":0,"473":0,"474":0,"479":0,"480":0,"483":0,"484":0,"485":0,"487":0,"490":0,"496":0,"497":0,"498":0,"499":0,"500":0,"502":0,"509":0,"510":0,"511":0,"512":0,"513":0,"515":0,"516":0,"517":0,"519":0,"532":0,"547":0,"560":0,"573":0,"577":0,"578":0,"579":0,"580":0,"581":0,"582":0,"595":0,"599":0,"600":0,"601":0,"602":0,"603":0,"617":0,"620":0,"621":0,"633":0,"636":0,"637":0,"645":0,"649":0,"650":0,"651":0,"660":0,"663":0,"666":0,"667":0,"668":0,"673":0,"678":0,"681":0,"688":0,"689":0,"690":0,"691":0,"692":0,"693":0,"694":0,"695":0,"698":0,"699":0,"700":0,"705":0,"706":0,"708":0,"709":0,"717":0,"719":0,"722":0,"724":0,"728":0,"735":0,"739":0,"740":0,"745":0,"749":0,"763":0,"768":0,"769":0,"770":0,"771":0,"774":0,"775":0,"779":0,"790":0,"792":0,"793":0,"796":0,"812":0,"817":0,"818":0,"819":0,"820":0,"823":0,"824":0,"825":0,"826":0,"827":0,"828":0,"829":0,"830":0,"831":0,"832":0,"833":0,"836":0,"838":0,"839":0,"842":0,"846":0,"859":0,"864":0,"865":0,"866":0,"867":0,"868":0,"870":0,"873":0,"874":0,"875":0,"877":0,"886":0,"894":0,"903":0,"904":0,"905":0,"906":0,"907":0,"908":0,"909":0,"910":0,"911":0,"912":0,"924":0,"927":0,"928":0,"929":0,"930":0,"936":0,"937":0,"943":0,"944":0,"951":0,"961":0,"965":0,"966":0,"967":0,"968":0,"969":0,"980":0,"982":0,"993":0,"1003":0,"1016":0,"1029":0,"1038":0,"1046":0,"1056":0,"1079":0,"1082":0,"1084":0,"1095":0,"1096":0,"1108":0,"1112":0,"1114":0,"1115":0,"1117":0,"1120":0,"1131":0,"1132":0,"1143":0,"1144":0,"1147":0,"1166":0,"1177":0,"1188":0,"1208":0,"1210":0,"1212":0,"1231":0,"1232":0,"1233":0,"1242":0,"1243":0,"1244":0,"1254":0,"1255":0,"1256":0,"1269":0,"1270":0,"1271":0,"1273":0,"1276":0,"1288":0,"1289":0,"1292":0,"1313":0,"1314":0,"1315":0,"1317":0,"1328":0,"1342":0,"1359":0,"1370":0,"1386":0,"1398":0,"1410":0,"1422":0,"1434":0,"1446":0,"1462":0};
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].functions = {"initializer:141":0,"definePanel:174":0,"removePanel:191":0,"showPanel:212":0,"getRetryConfirmation:260":0,"getConfirmation:276":0,"getInput:295":0,"getLogin:324":0,"keyValidation:400":0,"autoCorrection:489":0,"getNumber:378":0,"showErrorMessage:531":0,"showMessage:546":0,"showWarning:559":0,"_actionHide:572":0,"_actionStayAlive:594":0,"_actionReset:616":0,"_actionClear:632":0,"focus:644":0,"(anonymous 2):665":0,"(anonymous 3):680":0,"(anonymous 4):719":0,"(anonymous 5):724":0,"(anonymous 6):738":0,"(anonymous 7):747":0,"bindUI:659":0,"shiftFocus:762":0,"_shiftFocusFromCheckbox:789":0,"_checkInput:811":0,"_validate:858":0,"activatePanel:885":0,"deactivatePanel:893":0,"destructor:902":0,"_setValidationButtons:923":0,"_markButtonValidated:960":0,"_initiatePanels:979":0,"_getFirstFocusNode:1078":0,"_getDefaultButtonNode:1094":0,"(anonymous 8):1113":0,"_serializeForm:1105":0,"initializer:1176":0,"render:1187":0,"showValidation:1230":0,"hideValidation:1241":0,"destructor:1253":0,"setter:1268":0,"validator:1275":0,"setter:1287":0,"validator:1291":0,"setter:1312":0,"validator:1327":0,"validator:1341":0,"validator:1358":0,"validator:1369":0,"validator:1385":0,"validator:1397":0,"validator:1409":0,"validator:1421":0,"validator:1433":0,"validator:1445":0,"getter:1461":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].coveredLines = 312;
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].coveredFunctions = 62;
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1);
YUI.add('gallery-itsadialogbox', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 3);
'use strict';

/**
 * The Itsa Dialogbox module.
 *
 *
 * Dialogbox with sugar messages
 *
 * @module gallery-itsadialogbox
 * @class ITSADialogbox
 * @extends Panel
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 22);
var Lang = Y.Lang,
    ITSADIALOG_ICON_TEMPLATE = "<div class='itsadialogbox-icon {iconclass}'></div>",
    ITSADIALOG_BODY_TEMPLATE = "<div{bdclass}>{bdtext}</div>",

    ITSAFORM_TABLETEMPLATE = '<td class="itsaform-tablelabel{classnamelabel}"{paddingstyle}>{label}</td>'+
                            '<td class="itsaform-tableelement"{paddingstyle}>{element}'+
                            '<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div></td>',
    ITSAFORM_INLINETEMPLATE = '<span class="itsaform-spanlabel{classnamelabel}"{marginstyle}>{label}</span>'+
                            '{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div>';

//======================================
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 33);
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
 * Reference to the stayalive-function that can be attached to button.action. This function just execute the callback, but the Panel stays alive.
 * In need you just want to read the Panel-values.
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "initializer", 141);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 142);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 143);
instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                descendants: 'button, input, textarea',
                circular: true,
                focusClass: 'focus'
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 148);
instance._initiatePanels();
        },

        /**
         * Defines a new Panel and stores it to the panelOptions-Array. Returns an panelId that can be used sot show the Panel later on using
         * showPanel(panelId).<br>
         * PanelOptions is an object that can have the following fields:<br>
           <ul><li>iconClass (String) className for the icon, for example Y.Global.ItsaDialog.ICON_QUESTION</li>
               <li>form (Array) Array with objects that will be transformed to Y.FORMELEMENT objects (not currently available)</li>
               <li>buttons (Object) Which buttons to use. For example:
               <br>&nbsp;&nbsp;{
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;footer: [
                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'cancel', label:'Cancel', action: Y.Global.ItsaDialog.ACTION_HIDE},
                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'ok', label:'Ok',
                                action: Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;]
               &nbsp;&nbsp;}
               </li>
            </ul>
            <br><br>
            You can use 4 actionfunctions to attach at the button: Y.Global.ItsaDialog.ACTION_HIDE, Y.Global.ItsaDialog.ACTION_STAYALIVE,
            Y.Global.ItsaDialog.ACTION_RESET and Y.Global.ItsaDialog.ACTION_CLEAR
         * @method definePanel
         * @param {Object} panelOptions The config-object.
         * @return {Integer} unique panelId
        */
        definePanel: function(panelOptions) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "definePanel", 174);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 175);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 176);
if (Lang.isObject(panelOptions)) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 177);
instance.panelOptions.push(panelOptions);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 178);
return instance.panelOptions.length - 1;
            }
            else {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 181);
return -1;
            }
        },

        /**
         * Removes a panel by its panelId (which is generated by this.definePanel())
         *
         * @method removePanel
         * @param {Int} panelId Id of the panel to be removed. Retreive this value during definePanel()
        */
        removePanel: function(panelId) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "removePanel", 191);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 192);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 193);
if ((panelId>=0) && (panelId<instance.panelOptions.length)) {instance.panelOptions.splice(panelId, 1);}
        },

        /**
         * Shows the panel when you have a panelId. For usage with custom panels. The sugarmethods (showMessage() f.i.)
         * use this method under the hood).
         *
         * @method showPanel
         * @param {Int} panelId Id of the panel that has to be shown. Retreive this value during definePanel()
         * @param {String} [title] showed in the header of the Panel.
         * @param {String} [bodyText] showed inside the Panel.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want custom buttons that differ from those defined during definePanel.
         * @param {String} [customIconclass] In case you want to use an iconclass that is different from to one defined during definePanel.
         *                                                        Example: Y.Global.ItsaDialog.ICON_WARN
         * @param {Object} [eventArgs] do not use, only internal (temporarely)
        */
        showPanel: function(panelId, title, bodyText, callback, context, args, customButtons, customIconclass, eventArgs) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showPanel", 212);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 213);
var instance = this,
                iconClass,
                contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 216);
if ((panelId>=0) && (panelId<instance.panelOptions.length)) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 217);
instance._activePanelOption = instance.panelOptions[panelId];
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 218);
iconClass = customIconclass || instance._activePanelOption.iconClass;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 219);
instance.get('boundingBox').toggleClass('withicon', Lang.isString(iconClass));
                // in case no title is given, the third argument will be the callback
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 221);
if (!Lang.isString(bodyText)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 222);
args = context;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 223);
context = callback;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 224);
callback = bodyText;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 225);
bodyText = title;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 226);
title = '&nbsp;'; // making the header appear
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 228);
instance.set('headerContent', title || '&nbsp;'); // always making the header appear by display &nbsp;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 229);
instance.set('bodyContent', (iconClass ? Lang.sub(ITSADIALOG_ICON_TEMPLATE, {iconclass: iconClass}) : '')
                    + Lang.sub(ITSADIALOG_BODY_TEMPLATE, {bdclass: (iconClass ? ' class="itsadialogbox-messageindent"' : ''), bdtext: bodyText}));
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 231);
instance.set('buttons', customButtons || instance._activePanelOption.buttons || {});
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 232);
instance._activePanelOption.callback = callback;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 233);
instance._activePanelOption.context = context;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 234);
instance._activePanelOption.args = args;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 235);
instance._activePanelOption.eventArgs = eventArgs;
                // refreshing focusdescendents
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 237);
contentBox.focusManager.refresh();
                // recenter dialogbox in case it has been moved
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 239);
instance.centered();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 240);
instance.activatePanel();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 241);
contentBox.focusManager.focus(instance._getFirstFocusNode());
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 242);
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
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
        */
        getRetryConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getRetryConfirmation", 260);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 261);
this.showPanel(0, title, question, callback, context, args, customButtons, customIconclass);
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
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
        */
        getConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getConfirmation", 276);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 277);
this.showPanel(1, title, question, callback, context, args, customButtons, customIconclass);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getInput", 295);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 296);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 297);
instance.inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultmessage,
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',
                marginTop: 10,
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 306);
instance.showPanel(2, title, message + '<br>' + instance.inputElement.render(), callback, context, args, customButtons, customIconclass);
        },

        /**
         * Shows a login-Panel with an username/password fields and the buttons: <b>Cancel Ok</b><br>
         * @method getLogin
         * @param {String} title showed in the header of the Panel.
         * @param {String} message showed inside the Panel.
         * @param {Object} [logindata] this data will be used to present the formfields and defaultinput-values.
         * @param {Function} [callback] callbackfunction to be excecuted.
         * @param {Object} [context] (this) in the callback.
         * @param {String | Array} [args] Arguments for the callback.
         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.
         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.
         * @return {String} passed by the eventTarget in the callback<br>
         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>
         * Look for <i>e.value</i> to determine the userinput.
        */
        getLogin: function(title, message, logindata, callback, context, args, customButtons, customIconclass) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getLogin", 324);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 325);
var instance = this,
                logintable;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 327);
logindata = {
                usernameLabel: 'username',
                passwordLabel: 'password',
                defaultUsername: 'enter username'
            };
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 332);
instance.inputElementUsername = new Y.ITSAFORMELEMENT({
                label: logindata.usernameLabel,
                name: 'username',
                type: 'input',
                value: logindata.defaultUsername,
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-firstelement',
                marginTop: 24,
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 342);
instance.inputElementPassword = new Y.ITSAFORMELEMENT({
                label: logindata.passwordLabel,
                name: 'password',
                type: 'password',
                value: '',
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',
                marginTop: 7,
                initialFocus: false,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 352);
logintable = '<table><tbody>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 353);
logintable += '<tr>'+instance.inputElementUsername.render(true)+'</tr>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 354);
logintable += '<tr>'+instance.inputElementPassword.render(true)+'</tr>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 355);
logintable += '</tbody></table>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 356);
instance.showPanel(7, title, message + '<br>' + logintable, callback, context, args, customButtons, customIconclass);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getNumber", 378);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 379);
var instance = this,
                withMinValue = Lang.isNumber(minvalue),
                withMaxValue = Lang.isNumber(maxvalue),
                validationMessage = '',
                eventArguments = {};
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 384);
if (withMinValue && withMaxValue) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 385);
validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;
            }
            else {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 388);
if (withMinValue) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 389);
validationMessage = 'Input must not be below '+minvalue;
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 391);
if (withMaxValue) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 392);
validationMessage = 'Input must not be above '+maxvalue;
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 395);
instance.inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultvalue ? defaultvalue.toString() : '',
                label: message,
                keyValidation: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "keyValidation", 400);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 401);
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
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 415);
if (Y.Array.indexOf(valid, keycode) === -1) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 416);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 417);
return false;
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 419);
if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) &&
                                                                                     (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 421);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 422);
return false;
                    }
                    // no digit of zero at the beginning when minimum>0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 425);
if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 426);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 427);
return false;
                    }
                    // no digit of zero at second position when first position=0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 430);
if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 431);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 432);
return false;
                    }
                    // no minus at the beginning when minimum>=0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 435);
if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 436);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 437);
return false;
                    }
                    // no minus when not at the beginning
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 440);
if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 441);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 442);
return false;
                    }
                    // not valid when number will become lower than minimum, only check if field is modified
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 445);
if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) &&
                        ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {
                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical
                        // keyboard will be transformed to normal keyboard
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 449);
if (keycode===8) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 450);
nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) +
                                                previousStringValue.substring(cursorEnd), 10);
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 453);
if (keycode===46) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 454);
nextValue = parseInt(previousStringValue.substring(0, cursor) +
                                                previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 458);
nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString +
                                                previousStringValue.substring(cursorEnd), 10);
                        }}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 461);
if (!Lang.isNumber(nextValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 462);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 463);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 464);
reactivation = false;
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 466);
if (Lang.isNumber(minValue) && (nextValue<minValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 467);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 468);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 469);
reactivation = false;
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 471);
if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 472);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 473);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 474);
reactivation = false;
                        }}}
                    }
                    // correct possible 0x by removing leading 0
                    // because for some reason, this also is called when got blurred: do only check if number is digit
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 479);
if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 480);
node.set('value', '');
                    }
                    // only reactivate when the key is not a key that leaves the element
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 483);
if ((keycode!==9) && (keycode!==13)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 484);
if (reactivation && e.hideValidation) {e.hideValidation();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 485);
if (reactivation && e.activatePanel) {e.activatePanel();}
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 487);
return true;
                },
                autoCorrection: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "autoCorrection", 489);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 490);
var formelement = this,
                        minvalue = e && e.minValue,
                        maxvalue = e && e.maxValue,
                        previousValue = formelement.get('elementNode').get('value'),
                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,
                        newValue = parseInt(value, 10);
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 496);
formelement.set('value', newValue.toString());
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 497);
if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 498);
if (e.showValidation) {e.showValidation();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 499);
if (e.activatePanel) {e.activatePanel();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 500);
return false;
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 502);
return true;
                },
                validationMessage: validationMessage,
                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 509);
if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 510);
if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 511);
if (validationMessage) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 512);
eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 513);
eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 515);
if (eventArguments.minValue || eventArguments.maxValue) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 516);
eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 517);
eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 519);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showErrorMessage", 531);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 532);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showMessage", 546);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 547);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showWarning", 559);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 560);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionHide", 572);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 573);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 577);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 578);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 579);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 580);
instance.hide();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 581);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 582);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionStayAlive", 594);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 595);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 599);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 600);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 601);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 602);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 603);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionReset", 616);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 617);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 620);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 621);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionClear", 632);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 633);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 636);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 637);
ev.buttonName = e.target.getData('name');
        },

        /**
         * overrules Y.panel.focus, by focussing on the panel first, and then using the focusmanager to focus on the right element.
         * @method focus
        */
        focus: function(){
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "focus", 644);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 645);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            // apply returns something, call just runs. First argument is 'this' in the function, next arguments are the arguments in targetfunction
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 649);
instance.constructor.superclass.focus.call(instance);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 650);
if (focusManager) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 651);
focusManager.focus();
            }
        },

        /**
         * Define all eventhandlers
         * @method bindUI
        */
        bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "bindUI", 659);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 660);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 663);
instance._panelListener = contentBox.on(
                'keydown',
                function (e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 2)", 665);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 666);
if (e.keyCode === 9) { // tab
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 667);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 668);
this.shiftFocus(e.shiftKey);
                    }
                },
                instance
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 673);
instance._buttonsListener = instance.after(
                'buttonsChange',
                instance._setValidationButtons,
                instance
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 678);
instance._descendantListener = focusManager.on(
                'activeDescendantChange',
                function (e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 3)", 680);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 681);
var instance = this,
                        previousDescendant = e.prevVal,
                        nextDescendant = e.newVal,
                        defaultButton,
                        isButton,
                        allDescendants = focusManager.get('descendants'),
                        sameDescendant;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 688);
instance._descendantChange++;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 689);
if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 690);
if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 691);
sameDescendant = nextDescendant.compareTo(previousDescendant);
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 692);
defaultButton = contentBox.one('.yui3-button-primary');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 693);
isButton = (nextDescendant.get('tagName')==='BUTTON');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 694);
if (defaultButton) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 695);
defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));
                    }
                    // to make a pressed button highlighted, we must add a seperate class
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 698);
allDescendants.removeClass('mousepressfocus');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 699);
if (isButton) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 700);
nextDescendant.addClass('mousepressfocus');
                    }
                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state
                    // in case of an element that gets focused.
                    // To make the content be selected again (if requested) look at the value of instance._descendant
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 705);
if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 706);
nextDescendant.select();
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 708);
if (!sameDescendant) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 709);
instance._validate(isButton, nextDescendant);
                    }
                },
                instance,
                contentBox
            );
            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events
            // instead of binding it to the headernode
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 717);
instance._headerMousedownListener = contentBox.delegate(
                'mousedown',
                function(e) {_yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 4)", 719);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 719);
e.target.addClass('cursormove');},
                '.yui3-widget-hd'
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 722);
instance._headerMouseupListener = contentBox.delegate(
                'mouseup',
                function(e) {_yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 5)", 724);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 724);
e.target.removeClass('cursormove');},
                '.yui3-widget-hd'
            );
            // same for input elements
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 728);
instance._inputListener = contentBox.delegate(
                'keydown',
                instance._checkInput,
                'input',
                instance
            );
            // now, listen for checkboxes: the loose focus when they get clicked.
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 735);
instance._checkBoxListener = contentBox.delegate(
                'change',
                instance._shiftFocusFromCheckbox,
                function(){
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 6)", 738);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 739);
var node =this;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 740);
return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));
                },
                instance
            );
            // reset the focus when clicked on an area inside contentBox that is not an element
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 745);
contentBox.on(
                'click',
                function() {
                    // this = focusManeger
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 7)", 747);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 749);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "shiftFocus", 762);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 763);
var instance = this,
                focusManager = instance.get('contentBox').focusManager,
                focusManagerNodes = focusManager.get('descendants'),
                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),
                numberDescendants = focusManagerNodes.size();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 768);
if (referenceNode || focusManager.get('focused')) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 769);
if (Lang.isBoolean(backward) && backward) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 770);
activeDescendant--;
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 771);
focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 774);
activeDescendant++;
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 775);
focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 779);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_shiftFocusFromCheckbox", 789);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 790);
var instance = this,
                checkboxNode = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 792);
if (checkboxNode.hasClass('itsa-formelement-lastelement')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 793);
instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());
            }
            else {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 796);
instance.shiftFocus(false, checkboxNode);
            }
        },

        /**
         * Internal function that is called by 'keydown'-event when using input-elements.<br>
         * If the element has keyvalidation, then its keyvalidation-function is called, which could prevent the keyinput.<br>
         * If Enter is pressed, the focus is set on the next element <b>or</b> if it's the last element the ACTION_HIDE is called<br>
         * If the element has autocorrection, autocorrect-function is called.<br>
         * If this returns false, then all buttons with button.validation=true get disabled and  ACTION_HIDE is prevented, if returns true,
         * all these buttons get enabled.
         * @method _checkInput
         * @param {eventTarget} e
         * @private
        */
        _checkInput: function(e) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_checkInput", 811);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 812);
var instance = this,
                node = e.target,
                autoCorrection,
                autoCorrectResult,
                eventArgs = instance._activePanelOption.eventArgs;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 817);
if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 818);
Y.mix(e, eventArgs);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 819);
if (!instance.inputElement.get('keyValidation')(e)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 820);
return;
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 823);
if (e.keyCode===13) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 824);
e.preventDefault();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 825);
if (node.hasClass('itsa-formelement-lastelement')) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 826);
autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 827);
autoCorrectResult = true;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 828);
if (autoCorrection) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 829);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 830);
if (!autoCorrectResult) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 831);
eventArgs.showValidation();
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 832);
instance.deactivatePanel();
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 833);
instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 836);
if (autoCorrectResult) {
                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 838);
node.setData('name', instance._getDefaultButtonNode().getData('name'));
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 839);
instance._actionHide(e);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 842);
node.select();
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 846);
instance.shiftFocus();
                }
            }
        },

        /**
         * Internal function that is called when an descendant changes. To validate inputelements (if present)<br>
         * If the element has autocorrection, autocorrect-function is called.<br>If this returns false, then all buttons with button.validation=true
         * get disabled, if returns true, all these buttons get enabled.
         * @method _validate
         * @private
        */
        _validate: function(isButton, node) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_validate", 858);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 859);
var instance = this,
                eventArgs = instance._activePanelOption.eventArgs,
                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),
                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),
                autoCorrectResult = true;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 864);
if (autoCorrection && buttonValidation) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 865);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 866);
if (!autoCorrectResult) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 867);
if (eventArgs && eventArgs.showValidation) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 868);
eventArgs.showValidation();
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 870);
instance.deactivatePanel();
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 873);
if (autoCorrectResult) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 874);
if (eventArgs && eventArgs.hideValidation) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 875);
eventArgs.hideValidation();
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 877);
instance.activatePanel();
            }
        },

        /**
         * Enables all buttons with button.validation=true
         * @method activatePanel
        */
        activatePanel: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "activatePanel", 885);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 886);
this._validationButtons.toggleClass('yui3-button-disabled', false);
        },

        /**
         * Disnables all buttons with button.validation=true
         * @method deactivatePanel
        */
        deactivatePanel: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "deactivatePanel", 893);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 894);
this._validationButtons.toggleClass('yui3-button-disabled', true);
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 902);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 903);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 904);
if (instance.keyDownHandle) {instance.keyDownHandle.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 905);
if (instance._panelListener) {instance._panelListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 906);
if (instance._descendantListener) {instance._descendantListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 907);
if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 908);
if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 909);
if (instance._inputListener) {instance._inputListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 910);
if (instance._checkBoxListener) {instance._checkBoxListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 911);
if (instance._buttonsListener) {instance._buttonsListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 912);
instance.panelOptions.length = 0;
        },

        //==============================================================================

        /**
         * Internal method that looks for all buttons with button.validation=true and markes them with a validated-class<br>
         * Will be executed when the buttons are changed.
         * @method _setValidationButtons
         * @private
        */
        _setValidationButtons : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_setValidationButtons", 923);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 924);
var instance = this,
                buttonsObject = instance._activePanelOption.buttons,
                contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 927);
contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 928);
if (buttonsObject) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 929);
if (buttonsObject.header) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 930);
Y.Array.each(
                        buttonsObject.header,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 936);
if (buttonsObject.body) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 937);
Y.Array.each(
                        buttonsObject.body,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 943);
if (buttonsObject.footer) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 944);
Y.Array.each(
                        buttonsObject.footer,
                        instance._markButtonValidated,
                        instance
                    );
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 951);
instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');
        },

        /**
         * Internal method that markes a button with a validated-class if it has button.validation=true<br>
         * @method _markButtonValidated
         * @param {Object} buttonObject
         * @private
        */
        _markButtonValidated : function(buttonObject) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_markButtonValidated", 960);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 961);
var instance = this,
                name = buttonObject.name,
                validation,
                buttonNode;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 965);
buttonNode = instance.getButton(name);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 966);
if (buttonNode) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 967);
validation = buttonObject.validation;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 968);
if (Lang.isBoolean(validation) && validation) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 969);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_initiatePanels", 979);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 980);
var instance = this;
            // creating getRetryConfirmation
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 982);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 993);
instance.definePanel({
                iconClass: instance.ICON_INFO,
                buttons: {
                    footer: [
                        {name:'no', label:'No', action:instance.ACTION_HIDE, isDefault: true},
                        {name:'yes', label:'Yes', action:instance.ACTION_HIDE}
                    ]
                }
            });
            // creating getInput
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1003);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1016);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1029);
instance.definePanel({
                iconClass: instance.ICON_ERROR,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });
            // creating showMessage
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1038);
instance.definePanel({
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });
            // creating showWarning
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1046);
instance.definePanel({
                iconClass: instance.ICON_WARN,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });

            // creating loginPanel (id=7)
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1056);
instance.definePanel({
                iconClass: instance.ICON_QUESTION,
                form: [
                    {name:'username', label:'{username}', value:'{username}'},
                    {name:'password', label:'{password}', value:'{password}'}
                ],
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getFirstFocusNode", 1078);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1079);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusnode;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1082);
focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') ||
                                                                                                                instance._getDefaultButtonNode();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1084);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getDefaultButtonNode", 1094);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1095);
var node = this.get('contentBox').one('.yui3-button-primary');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1096);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_serializeForm", 1105);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1108);
var formelements = masterNode.all('.itsa-formelement'),
                  value,
                  intValue,
                  serialdata = {};
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1112);
formelements.each(
                function(formelementNode) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 8)", 1113);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1114);
value = formelementNode.get('value');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1115);
intValue = parseInt(value, 10);
                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1117);
serialdata[formelementNode.get('name')] = (value===intValue.toString()) ? intValue : value;
                }
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1120);
return serialdata;
        }

    }, {
        ATTRS : {
        }
    }
);

//=================================================================================

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1131);
if (!Y.Global.ItsaDialog) {
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1132);
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
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1143);
Y.Global.ItsaDialog.plug(Y.Plugin.Drag);
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1144);
Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');
}

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1147);
Y.ItsaDialogBox = Y.Global.ItsaDialog;

//=================================================================================

// Y.ITSAFORMELEMENT should get an own module. For the short time being, we will keep it inside itsa-dialog

/**
 * Y.ITSAFORMELEMENT
 *
 * @module gallery-itsadialogbox
 * @class ITSAFormelement
 * @extends Panel
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1166);
Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {

        id: null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "initializer", 1176);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1177);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "render", 1187);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1188);
var instance = this,
                marginTop = instance.get('marginTop'),
                marginStyle = (marginTop && !tableform) ? ' style="margin-top:' + marginTop + 'px"' : '',
                paddingStyle = marginTop ? ' style="padding-top:' + marginTop + 'px"' : '',
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
                elementClass = ' class="itsa-formelement ' + classNameValue + initialFocusClass + selectOnFocusClass + keyValidationClass +
                                          validationClass + autoCorrectionClass+'"',
                element = '';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1208);
if (type==='input') {element = '<input id="' + instance.id + '" type="text" name="' + instance.get('name') + '" value="' +
                                                            instance.get('value') + '"' + elementClass + marginStyle + ' />';}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1210);
if (type==='password') {element = '<input id="' + instance.id + '" type="password" name="' + instance.get('name') + '" value="' +
                                                                   instance.get('value') + '"' + elementClass + marginStyle + ' />';}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1212);
return  Lang.sub(
                        tableform ? ITSAFORM_TABLETEMPLATE : ITSAFORM_INLINETEMPLATE,
                        {
                            marginstyle: marginStyle,
                            paddingstyle: paddingStyle,
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showValidation", 1230);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1231);
var element = this.get('elementNode');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1232);
if (element) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1233);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);
            }
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
        */
        hideValidation : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "hideValidation", 1241);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1242);
var element = this.get('elementNode');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1243);
if (element) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1244);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 1253);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1254);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1255);
if (instance.blurevent) {instance.blurevent.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1256);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1268);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1269);
var node = this.get('elementNode');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1270);
if (node) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1271);
node.set('name', val);
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1273);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1275);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1276);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1287);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1288);
if (Lang.isString(val)) {val=val.toLowerCase();}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1289);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1291);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1292);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1312);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1313);
var node = this.get('elementNode');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1314);
if (node) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1315);
node.set('value', val);
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1317);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1327);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1328);
return (Lang.isString(val));
                }
            },
            /**
             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             * the className 'itsa-formelement-keyvalidation'.
             * The function MUST return true or false.
             * @attribute [keyValidation]
             * @type Function
            */
            keyValidation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1341);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1342);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description Validation after changing the value (onblur). The function should return true or false. In case of false,
             * the validationerror is thrown.<br>
             * Only has effect if the masterform knows how to use it through delegation:
             * therefore it adds the className 'itsa-formelement-validation'.
             * The function MUST return true or false.
             * Either use validation, or autocorrection.
             * @attribute [validation]
             * @type Function
             * @return Boolean
            */
            validation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1358);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1359);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1369);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1370);
return (Lang.isString(val));
                }
            },
            /**
             * @description If set, value will be replaces by the returnvalue of this function. <br>
             * Only has effect if the masterform knows how to use it through delegation: therefore
             * it adds the className 'itsa-formelement-autocorrect'.
             * The function MUST return true or false: defining whether the input is accepted.
             * Either use validation, or autocorrection.
             * @attribute [autocorrection]
             * @type Function
             * @return Boolean
            */
            autoCorrection : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1385);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1386);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1397);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1398);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1409);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1410);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1421);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1422);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1433);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1434);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1445);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1446);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description DOM-node where the elementNode is bound to.<br>
             * Be carefull: it will only return a Node when you have manually inserted the result of this.render() into the DOM.
             * Otherwise returns null.
             * Readonly
             * @attribute [elementNode]
             * @type Y.Node
             * @readonly
            */
            elementNode : {
                value: null,
                readOnly: true,
                getter: function() {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getter", 1461);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1462);
return Y.one('#'+this.id);
                }
            }
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-build",
        "panel",
        "node-base",
        "node-event-delegate",
        "dd-plugin",
        "node-focusmanager",
        "event-valuechange",
        "event-custom-base",
        "node-core",
        "oop"
    ]
});
