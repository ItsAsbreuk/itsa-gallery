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
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].code=["YUI.add('gallery-itsadialogbox', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Dialogbox module."," *"," *"," * Dialogbox with sugar messages"," *"," * @module gallery-itsadialogbox"," * @class ITSADialogbox"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    ITSADIALOG_ICON_TEMPLATE = \"<div class='itsadialogbox-icon {iconclass}'></div>\",","    ITSADIALOG_BODY_TEMPLATE = \"<div{bdclass}>{bdtext}</div>\",","","    ITSAFORM_TABLETEMPLATE = '<td class=\"itsaform-tablelabel{classnamelabel}\"{paddingstyle}>{label}</td>'+","                            '<td class=\"itsaform-tableelement\"{paddingstyle}>{element}'+","                            '<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div></td>',","    ITSAFORM_INLINETEMPLATE = '<span class=\"itsaform-spanlabel{classnamelabel}\"{marginstyle}>{label}</span>'+","                            '{element}<div class=\"itsa-formelement-validationmessage itsa-formelement-hidden\">{validationMessage}</div>';","","//======================================","Y.ITSADIALOGBOX = Y.Base.create('itsadialogbox', Y.Panel, [], {","","        ICON_BUBBLE : 'icon-bubble',","        ICON_INFO : 'icon-info',","        ICON_QUESTION : 'icon-question',","        ICON_WARN : 'icon-warn',","        ICON_ERROR : 'icon-error',","        ICON_SUCCESS : 'icon-success',","        ACTION_HIDE : '_actionHide',","        ACTION_STAYALIVE : '_actionStayAlive',","        ACTION_RESET : '_actionReset',","        ACTION_CLEAR : '_actionClear',","        panelOptions : [],","        _activePanelOption : null,","        _validationButtons : null,","        _descendantChange : 0,","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property ICON_BUBBLE"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_INFO"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_QUESTION"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_WARN"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_ERROR"," * @type String"," */","","/**"," * Reference to the editor's instance"," * @property ICON_SUCCESS"," * @type String"," */","","/**"," * Reference to the hide-function that can be attached to button.action. This function closes the Panel and executes the callback."," * @property ACTION_HIDE"," * @type String"," */","","/**"," * Reference to the stayalive-function that can be attached to button.action. This function just execute the callback, but the Panel stays alive."," * In need you just want to read the Panel-values."," * @property ACTION_STAYALIVE"," * @type String"," */","","/**"," * Reference to the clear-function that can be attached to button.action. This function will clear any form-elements."," * @property ACTION_CLEAR"," * @type String"," */","","/**"," * Reference to the reset-function that can be attached to button.action. This function will reset any form-elements."," * @property ACTION_RESET"," * @type String"," */","","/**"," * Internal Array that holds all registred paneloptions, created through definePanel()"," * @property panelOptions"," * @type Array"," */","","/**"," * Internal reference to the active panelOptions (which is active after showPanel() is called"," * @property _activePanelOption"," * @type Object"," */","","/**"," * Nodelist that contains all current (from _activePanelOption) buttons that have button.validated set to true."," * @property _validationButtons"," * @type Y.NodeList"," */","","/**"," * Internal count that keeps track of how many times a descendentChange has been taken place by the focusManager"," * @property _descendantChange"," * @type Int"," */","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {","                descendants: 'button, input, textarea',","                circular: true,","                focusClass: 'focus'","            });","            instance._initiatePanels();","        },","","        /**","         * Defines a new Panel and stores it to the panelOptions-Array. Returns an panelId that can be used sot show the Panel later on using","         * showPanel(panelId).<br>","         * PanelOptions is an object that can have the following fields:<br>","           <ul><li>iconClass (String) className for the icon, for example Y.Global.ItsaDialog.ICON_QUESTION</li>","               <li>form (Array) Array with objects that will be transformed to Y.FORMELEMENT objects (not currently available)</li>","               <li>buttons (Object) Which buttons to use. For example:","               <br>&nbsp;&nbsp;{","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;footer: [","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'cancel', label:'Cancel', action: Y.Global.ItsaDialog.ACTION_HIDE},","                        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:'ok', label:'Ok',","                                action: Y.Global.ItsaDialog.ACTION_HIDE, validation: true, isDefault: true}","                    <br>&nbsp;&nbsp;&nbsp;&nbsp;]","               &nbsp;&nbsp;}","               </li>","            </ul>","            <br><br>","            You can use 4 actionfunctions to attach at the button: Y.Global.ItsaDialog.ACTION_HIDE, Y.Global.ItsaDialog.ACTION_STAYALIVE,","            Y.Global.ItsaDialog.ACTION_RESET and Y.Global.ItsaDialog.ACTION_CLEAR","         * @method definePanel","         * @param {Object} panelOptions The config-object.","         * @return {Integer} unique panelId","        */","        definePanel: function(panelOptions) {","            var instance = this;","            if (Lang.isObject(panelOptions)) {","                instance.panelOptions.push(panelOptions);","                return instance.panelOptions.length - 1;","            }","            else {","                return -1;","            }","        },","","        /**","         * Removes a panel by its panelId (which is generated by this.definePanel())","         *","         * @method removePanel","         * @param {Int} panelId Id of the panel to be removed. Retreive this value during definePanel()","        */","        removePanel: function(panelId) {","            var instance = this;","            if ((panelId>=0) && (panelId<instance.panelOptions.length)) {instance.panelOptions.splice(panelId, 1);}","        },","","        /**","         * Shows the panel when you have a panelId. For usage with custom panels. The sugarmethods (showMessage() f.i.)","         * use this method under the hood).","         *","         * @method showPanel","         * @param {Int} panelId Id of the panel that has to be shown. Retreive this value during definePanel()","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} [bodyText] showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want custom buttons that differ from those defined during definePanel.","         * @param {String} [customIconclass] In case you want to use an iconclass that is different from to one defined during definePanel.","         *                                                        Example: Y.Global.ItsaDialog.ICON_WARN","         * @param {Object} [eventArgs] do not use, only internal (temporarely)","        */","        showPanel: function(panelId, title, bodyText, callback, context, args, customButtons, customIconclass, eventArgs) {","            var instance = this,","                iconClass,","                contentBox = instance.get('contentBox');","            if ((panelId>=0) && (panelId<instance.panelOptions.length)) {","                instance._activePanelOption = instance.panelOptions[panelId];","                iconClass = customIconclass || instance._activePanelOption.iconClass;","                instance.get('boundingBox').toggleClass('withicon', Lang.isString(iconClass));","                // in case no title is given, the third argument will be the callback","                if (!Lang.isString(bodyText)) {","                    args = context;","                    context = callback;","                    callback = bodyText;","                    bodyText = title;","                    title = '&nbsp;'; // making the header appear","                }","                instance.set('headerContent', title || '&nbsp;'); // always making the header appear by display &nbsp;","                instance.set('bodyContent', (iconClass ? Lang.sub(ITSADIALOG_ICON_TEMPLATE, {iconclass: iconClass}) : '')","                    + Lang.sub(ITSADIALOG_BODY_TEMPLATE, {bdclass: (iconClass ? ' class=\"itsadialogbox-messageindent\"' : ''), bdtext: bodyText}));","                instance.set('buttons', customButtons || instance._activePanelOption.buttons || {});","                instance._activePanelOption.callback = callback;","                instance._activePanelOption.context = context;","                instance._activePanelOption.args = args;","                instance._activePanelOption.eventArgs = eventArgs;","                // refreshing focusdescendents","                contentBox.focusManager.refresh();","                // recenter dialogbox in case it has been moved","                instance.centered();","                instance.activatePanel();","                contentBox.focusManager.focus(instance._getFirstFocusNode());","                instance.show();","            }","        },","","        //==============================================================================","","        /**","         * Shows a Panel with the buttons: <b>Abort Ignore Retry</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getRetryConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        getRetryConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {","            this.showPanel(0, title, question, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with the buttons: <b>No Yes</b><br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.","         * @method getConfirmation","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} question showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        getConfirmation: function(title, question, callback, context, args, customButtons, customIconclass) {","            this.showPanel(1, title, question, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b><br>","         * @method getInput","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {String} [defaultmessage] showed inside the form-input.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getInput: function(title, message, defaultmessage, callback, context, args, customButtons, customIconclass) {","            var instance = this;","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultmessage,","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 10,","                initialFocus: true,","                selectOnFocus: true","            });","            instance.showPanel(2, title, message + '<br>' + instance.inputElement.render(), callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a login-Panel with an username/password fields and the buttons: <b>Cancel Ok</b><br>","         * @method getLogin","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {Object} [logindata] this data will be used to present the formfields and defaultinput-values.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {String} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getLogin: function(title, message, logindata, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                  logintable, defaultlogindata;","            defaultlogindata = {","                labelUsername: 'username',","                labelPassword: 'password',","                defaultUsername: '',","                defaultPassword: ''","            };","            logindata = logindata || defaultlogindata;","            instance.inputElementUsername = new Y.ITSAFORMELEMENT({","                label: logindata.labelUsername || defaultlogindata.labelUsername,","                name: 'username',","                type: 'input',","                value: logindata.defaultUsername || '',","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-firstelement',","                marginTop: 24,","                initialFocus: true,","                selectOnFocus: true","            });","            instance.inputElementPassword = new Y.ITSAFORMELEMENT({","                label: logindata.labelPassword || defaultlogindata.labelPassword,","                name: 'password',","                type: 'password',","                value: logindata.defaultPassword || '',","                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',","                marginTop: 7,","                initialFocus: false,","                selectOnFocus: true","            });","            logintable = '<table><tbody>';","            logintable += '<tr>'+instance.inputElementUsername.render(true)+'</tr>';","            logintable += '<tr>'+instance.inputElementPassword.render(true)+'</tr>';","            logintable += '</tbody></table>';","            instance.showPanel(7, title, message + '<br>' + logintable, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows a Panel with an inputfield and the buttons: <b>Cancel Ok</b>. Only accepts integer-number as return.<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","         * @method getNumber","         * @param {String} title showed in the header of the Panel.","         * @param {String} message showed inside the Panel.","         * @param {Integer} [defaultvalue] showed inside the form-input.","         * @param {Integer} [minvalue] used for validation.","         * @param {Integer} [maxvalue] used for validation.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","         * @return {Integer} passed by the eventTarget in the callback<br>","         * Look for <i>e.buttonName</i> to determine which button is pressed.<br>","         * Look for <i>e.value</i> to determine the userinput.","        */","        getNumber: function(title, message, defaultvalue, minvalue, maxvalue, callback, context, args, customButtons, customIconclass) {","            var instance = this,","                withMinValue = Lang.isNumber(minvalue),","                withMaxValue = Lang.isNumber(maxvalue),","                validationMessage = '',","                eventArguments = {};","            if (withMinValue && withMaxValue) {","                validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;","            }","            else {","                if (withMinValue) {","                    validationMessage = 'Input must not be below '+minvalue;","                }","                if (withMaxValue) {","                    validationMessage = 'Input must not be above '+maxvalue;","                }","            }","            instance.inputElement = new Y.ITSAFORMELEMENT({","                name: 'value',","                type: 'input',","                value: defaultvalue ? defaultvalue.toString() : '',","                label: message,","                keyValidation: function(e) {","                    var keycode = e.keyCode,","                        node = e.target,","                        reactivation = true,","                        cursor = node.get('selectionStart'),","                        cursorEnd = node.get('selectionEnd'),","                        previousStringValue = node.get('value'),","                        safeNumericalKeyCodeToString = String.fromCharCode(((keycode>=96) && (keycode<=105)) ? keycode - 48 : keycode),","                        nextValue,","                        minValue = e.minValue,","                        maxValue = e.maxValue,","                        digits = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],","                        valid = [8,9,13,27,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,173,189,45,96,97,98,99,100,101,102,103,104,105,109],","                        // 173,189,45 all can be minus-token","                        minustoken = [173,189,45,109];","                    if (Y.Array.indexOf(valid, keycode) === -1) {","                        e.halt(true);","                        return false;","                    }","                    if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) &&","                                                                                     (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at the beginning when minimum>0","                    if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {","                        e.halt(true);","                        return false;","                    }","                    // no digit of zero at second position when first position=0","                    if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {","                        e.halt(true);","                        return false;","                    }","                    // no minus at the beginning when minimum>=0","                    if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // no minus when not at the beginning","                    if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {","                        e.halt(true);","                        return false;","                    }","                    // not valid when number will become lower than minimum, only check if field is modified","                    if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) &&","                        ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {","                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical","                        // keyboard will be transformed to normal keyboard","                        if (keycode===8) {","                            nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) +","                                                previousStringValue.substring(cursorEnd), 10);","                        }","                        else if (keycode===46) {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) +","                                                previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);","                        }","                        else {","                            nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString +","                                                previousStringValue.substring(cursorEnd), 10);","                        }","                        if (!Lang.isNumber(nextValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(minValue) && (nextValue<minValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                        else if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {","                            if (e.showValidation) {e.showValidation();}","                            if (e.deactivatePanel) {e.deactivatePanel();}","                            reactivation = false;","                        }","                    }","                    // correct possible 0x by removing leading 0","                    // because for some reason, this also is called when got blurred: do only check if number is digit","                    if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {","                        node.set('value', '');","                    }","                    // only reactivate when the key is not a key that leaves the element","                    if ((keycode!==9) && (keycode!==13)) {","                        if (reactivation && e.hideValidation) {e.hideValidation();}","                        if (reactivation && e.activatePanel) {e.activatePanel();}","                    }","                    return true;","                },","                autoCorrection: function(e) {","                    var formelement = this,","                        minvalue = e && e.minValue,","                        maxvalue = e && e.maxValue,","                        previousValue = formelement.get('elementNode').get('value'),","                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,","                        newValue = parseInt(value, 10);","                    formelement.set('value', newValue.toString());","                    if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {","                        if (e.showValidation) {e.showValidation();}","                        if (e.activatePanel) {e.activatePanel();}","                        return false;","                    }","                    return true;","                },","                validationMessage: validationMessage,","                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',","                initialFocus: true,","                selectOnFocus: true","            });","            if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}","            if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}","            if (validationMessage) {","                eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);","                eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);","            }","            if (eventArguments.minValue || eventArguments.maxValue) {","                eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);","                eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);","            }","            instance.showPanel(3, title, instance.inputElement.render(), callback, context, args, customButtons, customIconclass, eventArguments);","        },","","        /**","         * Shows an ErrorMessage (Panel)","         * @method showErrorMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showErrorMessage: function(title, errormessage, callback, context, args) {","            this.showPanel(4, title, errormessage, callback, context, args);","        },","","        /**","         * Shows a Message (Panel)","         * @method showMessage","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} errormessage showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","         * @param {Object} [customButtons] In case you want buttons other that Cancel/Ok.","         * @param {String} [customIconclass] In case you want an Icon other that ICON_QUESTION.","        */","        showMessage: function(title, message, callback, context, args, customButtons, customIconclass) {","            this.showPanel(5, title, message, callback, context, args, customButtons, customIconclass);","        },","","        /**","         * Shows an Warning (Panel)","         * @method showWarning","         * @param {String} [title] showed in the header of the Panel.","         * @param {String} warning showed inside the Panel.","         * @param {Function} [callback] callbackfunction to be excecuted.","         * @param {Object} [context] (this) in the callback.","         * @param {String | Array} [args] Arguments for the callback.","        */","        showWarning: function(title, warning, callback, context, args) {","            this.showPanel(6, title, warning, callback, context, args);","        },","","        //==============================================================================","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionHide","         * @param {eventTarget} e","         * @private","        */","        _actionHide: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                instance.hide();","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            }","        },","","        /**","         * Just executes the callback while the Panel stays on the screen. Used when you just want to read form-information for example.<br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionStayAlive: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd),","                button = e.target;","            e.preventDefault();","            if (!button.hasClass('yui3-button-disabled')) {","                ev.buttonName = e.target.getData('name');","                if (Y.Lang.isFunction(instance._activePanelOption.callback)) {","                    Y.rbind(instance._activePanelOption.callback, instance._activePanelOption.context, ev, instance._activePanelOption.args)();","                }","            }","        },","","        /**","         * Resets any form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionReset: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * Clears all form-elements inside the panel.<br>","         * Does not execute the callback.","         * --- This function does not work yet ---","         * @method _actionStayAlive","         * @param {eventTarget} e","         * @private","        */","        _actionClear: function(e){","            var instance = this,","                bd = instance.get('contentBox').one('.yui3-widget-bd'),","                ev = instance._serializeForm(bd);","            e.preventDefault();","            ev.buttonName = e.target.getData('name');","        },","","        /**","         * overrules Y.panel.focus, by focussing on the panel first, and then using the focusmanager to focus on the right element.","         * @method focus","        */","        focus: function(){","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            // apply returns something, call just runs. First argument is 'this' in the function, next arguments are the arguments in targetfunction","            instance.constructor.superclass.focus.call(instance);","            if (focusManager) {","                focusManager.focus();","            }","        },","","        /**","         * Define all eventhandlers","         * @method bindUI","        */","        bindUI: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusManager = contentBox.focusManager;","            instance._panelListener = contentBox.on(","                'keydown',","                function (e) {","                    if (e.keyCode === 9) { // tab","                        e.preventDefault();","                        this.shiftFocus(e.shiftKey);","                    }","                },","                instance","            );","            instance._buttonsListener = instance.after(","                'buttonsChange',","                instance._setValidationButtons,","                instance","            );","            instance._descendantListener = focusManager.on(","                'activeDescendantChange',","                function (e) {","                    var instance = this,","                        previousDescendant = e.prevVal,","                        nextDescendant = e.newVal,","                        defaultButton,","                        isButton,","                        allDescendants = focusManager.get('descendants'),","                        sameDescendant;","                    instance._descendantChange++;","                    if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}","                    if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}","                    sameDescendant = nextDescendant.compareTo(previousDescendant);","                    defaultButton = contentBox.one('.yui3-button-primary');","                    isButton = (nextDescendant.get('tagName')==='BUTTON');","                    if (defaultButton) {","                        defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));","                    }","                    // to make a pressed button highlighted, we must add a seperate class","                    allDescendants.removeClass('mousepressfocus');","                    if (isButton) {","                        nextDescendant.addClass('mousepressfocus');","                    }","                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state","                    // in case of an element that gets focused.","                    // To make the content be selected again (if requested) look at the value of instance._descendant","                    if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {","                        nextDescendant.select();","                    }","                    if (!sameDescendant) {","                        instance._validate(isButton, nextDescendant);","                    }","                },","                instance,","                contentBox","            );","            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events","            // instead of binding it to the headernode","            instance._headerMousedownListener = contentBox.delegate(","                'mousedown',","                function(e) {e.target.addClass('cursormove');},","                '.yui3-widget-hd'","            );","            instance._headerMouseupListener = contentBox.delegate(","                'mouseup',","                function(e) {e.target.removeClass('cursormove');},","                '.yui3-widget-hd'","            );","            // same for input elements","            instance._inputListener = contentBox.delegate(","                'keydown',","                instance._checkInput,","                'input',","                instance","            );","            // now, listen for checkboxes: the loose focus when they get clicked.","            instance._checkBoxListener = contentBox.delegate(","                'change',","                instance._shiftFocusFromCheckbox,","                function(){","                    var node =this;","                    return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));","                },","                instance","            );","            // reset the focus when clicked on an area inside contentBox that is not an element","            contentBox.on(","                'click',","                function() {","                    // this = focusManeger","                    this.focus(this.get('activeDescendant'));","                },","                focusManager","            );","        },","","        /**","         * Hides the panel and executes the callback. <br>","         * Will not execute if the targetbutton has been disabled through validation.","         * @method shiftFocus","         * @param {Boolean} [backward] direction to shift","         * @param {eventTarget} [referenceNode] startnode, when not supplied, the node that currently has focused will be used.","        */","        shiftFocus: function(backward, referenceNode) {","            var instance = this,","                focusManager = instance.get('contentBox').focusManager,","                focusManagerNodes = focusManager.get('descendants'),","                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),","                numberDescendants = focusManagerNodes.size();","                if (referenceNode || focusManager.get('focused')) {","                    if (Lang.isBoolean(backward) && backward) {","                        activeDescendant--;","                        focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);","                    }","                    else {","                        activeDescendant++;","                        focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);","                    }","                }","                else {","                    focusManager.focus(instance._getFirstFocusNode());","                }","        },","","        /**","         * Makes the focus set on next element when a checkbox is clicked.<br>","         * @method _shiftFocusFromCheckbox","         * @param {eventTarget} e","         * @private","        */","        _shiftFocusFromCheckbox: function(e) {","            var instance = this,","                checkboxNode = e.target;","            if (checkboxNode.hasClass('itsa-formelement-lastelement')) {","                instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());","            }","            else {","                instance.shiftFocus(false, checkboxNode);","            }","        },","","        /**","         * Internal function that is called by 'keydown'-event when using input-elements.<br>","         * If the element has keyvalidation, then its keyvalidation-function is called, which could prevent the keyinput.<br>","         * If Enter is pressed, the focus is set on the next element <b>or</b> if it's the last element the ACTION_HIDE is called<br>","         * If the element has autocorrection, autocorrect-function is called.<br>","         * If this returns false, then all buttons with button.validation=true get disabled and  ACTION_HIDE is prevented, if returns true,","         * all these buttons get enabled.","         * @method _checkInput","         * @param {eventTarget} e","         * @private","        */","        _checkInput: function(e) {","            var instance = this,","                node = e.target,","                autoCorrection,","                autoCorrectResult,","                eventArgs = instance._activePanelOption.eventArgs;","            if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {","                Y.mix(e, eventArgs);","                if (!instance.inputElement.get('keyValidation')(e)) {","                    return;","                }","            }","            if (e.keyCode===13) {","                e.preventDefault();","                if (node.hasClass('itsa-formelement-lastelement')) {","                    autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');","                    autoCorrectResult = true;","                    if (autoCorrection) {","                        autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                        if (!autoCorrectResult) {","                            eventArgs.showValidation();","                            instance.deactivatePanel();","                            instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());","                        }","                    }","                    if (autoCorrectResult) {","                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node","                        node.setData('name', instance._getDefaultButtonNode().getData('name'));","                        instance._actionHide(e);","                    }","                    else {","                        node.select();","                    }","                }","                else {","                    instance.shiftFocus();","                }","            }","        },","","        /**","         * Internal function that is called when an descendant changes. To validate inputelements (if present)<br>","         * If the element has autocorrection, autocorrect-function is called.<br>If this returns false, then all buttons with button.validation=true","         * get disabled, if returns true, all these buttons get enabled.","         * @method _validate","         * @private","        */","        _validate: function(isButton, node) {","            var instance = this,","                eventArgs = instance._activePanelOption.eventArgs,","                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),","                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),","                autoCorrectResult = true;","            if (autoCorrection && buttonValidation) {","                autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();","                if (!autoCorrectResult) {","                    if (eventArgs && eventArgs.showValidation) {","                        eventArgs.showValidation();","                    }","                    instance.deactivatePanel();","                }","            }","            if (autoCorrectResult) {","                if (eventArgs && eventArgs.hideValidation) {","                    eventArgs.hideValidation();","                }","                instance.activatePanel();","            }","        },","","        /**","         * Enables all buttons with button.validation=true","         * @method activatePanel","        */","        activatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', false);","        },","","        /**","         * Disnables all buttons with button.validation=true","         * @method deactivatePanel","        */","        deactivatePanel: function() {","            this._validationButtons.toggleClass('yui3-button-disabled', true);","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this;","            if (instance.keyDownHandle) {instance.keyDownHandle.detach();}","            if (instance._panelListener) {instance._panelListener.detach();}","            if (instance._descendantListener) {instance._descendantListener.detach();}","            if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}","            if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}","            if (instance._inputListener) {instance._inputListener.detach();}","            if (instance._checkBoxListener) {instance._checkBoxListener.detach();}","            if (instance._buttonsListener) {instance._buttonsListener.detach();}","            instance.panelOptions.length = 0;","        },","","        //==============================================================================","","        /**","         * Internal method that looks for all buttons with button.validation=true and markes them with a validated-class<br>","         * Will be executed when the buttons are changed.","         * @method _setValidationButtons","         * @private","        */","        _setValidationButtons : function() {","            var instance = this,","                buttonsObject = instance._activePanelOption.buttons,","                contentBox = instance.get('contentBox');","            contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');","            if (buttonsObject) {","                if (buttonsObject.header) {","                    Y.Array.each(","                        buttonsObject.header,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.body) {","                    Y.Array.each(","                        buttonsObject.body,","                        instance._markButtonValidated,","                        instance","                    );","                }","                if (buttonsObject.footer) {","                    Y.Array.each(","                        buttonsObject.footer,","                        instance._markButtonValidated,","                        instance","                    );","                }","            }","            instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');","        },","","        /**","         * Internal method that markes a button with a validated-class if it has button.validation=true<br>","         * @method _markButtonValidated","         * @param {Object} buttonObject","         * @private","        */","        _markButtonValidated : function(buttonObject) {","            var instance = this,","                name = buttonObject.name,","                validation,","                buttonNode;","            buttonNode = instance.getButton(name);","            if (buttonNode) {","                validation = buttonObject.validation;","                if (Lang.isBoolean(validation) && validation) {","                    buttonNode.addClass('itsadialogbox-button-validated');","                }","            }","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * @method _initiatePanels","         * @private","        */","        _initiatePanels : function() {","            var instance = this;","            // creating getRetryConfirmation","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'abort', label:'Abort', action:instance.ACTION_HIDE},","                        {name:'ignore', label:'Ignore', action:instance.ACTION_HIDE},","                        {name:'retry', label:'Retry', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating getConfirmation","            instance.definePanel({","                iconClass: instance.ICON_INFO,","                buttons: {","                    footer: [","                        {name:'no', label:'No', action:instance.ACTION_HIDE, isDefault: true},","                        {name:'yes', label:'Yes', action:instance.ACTION_HIDE}","                    ]","                }","            });","            // creating getInput","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}","                    ]","                }","            });","            // creating getNumber","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'count', label:'{message}', value:'{count}'}","                ],","                buttons: {","                    footer: [","                        {name:'cancel', label:'Cancel', action:instance.ACTION_HIDE},","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, validation: true, isDefault: true}","                    ]","                }","            });","            // creating showErrorMessage","            instance.definePanel({","                iconClass: instance.ICON_ERROR,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating showMessage","            instance.definePanel({","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","            // creating showWarning","            instance.definePanel({","                iconClass: instance.ICON_WARN,","                buttons: {","                    footer: [","                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","","            // creating loginPanel (id=7)","            instance.definePanel({","                iconClass: instance.ICON_QUESTION,","                form: [","                    {name:'username', label:'{username}', value:'{username}'},","                    {name:'password', label:'{password}', value:'{password}'}","                ],","                buttons: {","                    footer: [","                        {name:'login', label:'Login', action:instance.ACTION_HIDE, isDefault: true}","                    ]","                }","            });","        },","","        /**","         * Definition of the predefined Panels (like showMessage() etc.)","         * this can be a form-element. But if no form-element has focus defined, the first form-element should get focus.","         * If no form element is present, then the defaultbutton should get focus","         * @method _getFirstFocusNode","         * @private","         * return {Y.Node} the Node that should get focus when panel is showed.","        */","        _getFirstFocusNode: function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                focusnode;","            focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') ||","                                                                                                                instance._getDefaultButtonNode();","            return focusnode;","        },","","        /**","         * Returns the default button: the buttonNode that has the primary focus.<br>","         * This should be set during definition of PanelOptions.","         * @method _getDefaultButtonNode","         * @private","         * return {Y.Node} buttonNode","        */","        _getDefaultButtonNode: function() {","            var node = this.get('contentBox').one('.yui3-button-primary');","            return node;","        },","","        /**","         * Returns all form-elements in panel","         * @method _serializeForm","         * @private","         * return {Object} Contains all form-elements with name/value pair","        */","        _serializeForm: function(masterNode) {","            // At this moment only text-inputs are allowed.","            // at later stage, handle this by Y.ITSAFORM with a true serialize function","            var formelements = masterNode.all('.itsa-formelement'),","                  value,","                  intValue,","                  serialdata = {};","            formelements.each(","                function(formelementNode) {","                    value = formelementNode.get('value');","                    intValue = parseInt(value, 10);","                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer","                    serialdata[formelementNode.get('name')] = (value===intValue.toString()) ? intValue : value;","                }","            );","            return serialdata;","        }","","    }, {","        ATTRS : {","        }","    }",");","","//=================================================================================","","if (!Y.Global.ItsaDialog) {","    Y.Global.ItsaDialog = new Y.ITSADIALOGBOX({","        visible: false,","        centered: true,","        render : true,","        zIndex : 21000,","        modal  : true,","        bodyContent : '',","        focusOn: [","            {eventName: 'clickoutside'}","        ]","    });","    Y.Global.ItsaDialog.plug(Y.Plugin.Drag);","    Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');","}","","Y.ItsaDialogBox = Y.Global.ItsaDialog;","","//=================================================================================","","// Y.ITSAFORMELEMENT should get an own module. For the short time being, we will keep it inside itsa-dialog","","/**"," * Y.ITSAFORMELEMENT"," *"," * @module gallery-itsadialogbox"," * @class ITSAFormelement"," * @extends Panel"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {","","        id: null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","        */","        initializer : function() {","            this.id = Y.guid();","        },","","        /**","         * Renderes a String that contains the completeFormElement definition.<br>","         * To be used in an external Form","         * @method render","         * @param {boolean} tableform If the renderedstring should be in tableform: encapsuled by td-elements (without tr)","         * @return {String} rendered String","        */","        render : function(tableform) {","            var instance = this,","                marginTop = instance.get('marginTop'),","                marginStyle = (marginTop && !tableform) ? ' style=\"margin-top:' + marginTop + 'px\"' : '',","                paddingStyle = marginTop ? ' style=\"padding-top:' + marginTop + 'px\"' : '',","                type = instance.get('type'),","                classNameLabel = instance.get('classNameLabel'),","                classNameValue = instance.get('classNameValue'),","                initialFocus = instance.get('initialFocus'),","                selectOnFocus = instance.get('selectOnFocus'),","                keyValidation = instance.get('keyValidation'),","                validation = instance.get('validation'),","                autoCorrection = instance.get('autoCorrection'),","                initialFocusClass = initialFocus ? ' itsa-formelement-firstfocus' : '',","                selectOnFocusClass = selectOnFocus ? ' itsa-formelement-selectall' : '',","                keyValidationClass = keyValidation ? ' itsa-formelement-keyvalidation' : '',","                validationClass = validation ? ' itsa-formelement-validation' : '',","                autoCorrectionClass = autoCorrection ? ' itsa-formelement-autocorrect' : '',","                elementClass = ' class=\"itsa-formelement ' + classNameValue + initialFocusClass + selectOnFocusClass + keyValidationClass +","                                          validationClass + autoCorrectionClass+'\"',","                element = '';","            if (type==='input') {element = '<input id=\"' + instance.id + '\" type=\"text\" name=\"' + instance.get('name') + '\" value=\"' +","                                                            instance.get('value') + '\"' + elementClass + marginStyle + ' />';}","            if (type==='password') {element = '<input id=\"' + instance.id + '\" type=\"password\" name=\"' + instance.get('name') + '\" value=\"' +","                                                                   instance.get('value') + '\"' + elementClass + marginStyle + ' />';}","            return  Lang.sub(","                        tableform ? ITSAFORM_TABLETEMPLATE : ITSAFORM_INLINETEMPLATE,","                        {","                            marginstyle: marginStyle,","                            paddingstyle: paddingStyle,","                            label: instance.get('label'),","                            element: element,","                            classnamelabel: classNameLabel,","                            validationMessage: instance.get('validationMessage'),","                            classnamevalue: classNameValue","                        }","                    );","        },","","        /**","         * Shows the validationmessage","         * @method showValidation","        */","        showValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);","            }","        },","","        /**","         * Hides the validationmessage","         * @method hideValidation","        */","        hideValidation : function() {","            var element = this.get('elementNode');","            if (element) {","                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);","            }","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor : function() {","            var instance = this;","            if (instance.blurevent) {instance.blurevent.detach();}","            if (instance.keyevent) {instance.keyevent.detach();}","        }","","    }, {","        ATTRS : {","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            name : {","                value: 'undefined-name',","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('name', val);","                    }","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Must have one of the following values:","             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>","             * @attribute typr","             * @type String","            */","            type : {","                value: '',","                setter: function(val) {","                    if (Lang.isString(val)) {val=val.toLowerCase();}","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val) &&","                            ((val==='input') ||","                             (val==='password') ||","                             (val==='textarea') ||","                             (val==='checkbox') ||","                             (val==='radiogroup') ||","                             (val==='selectbox') ||","                             (val==='button') ||","                             (val==='hidden')","                            )","                    );","                }","            },","            /**","             * @description The value of the element","             * @attribute [value]","             * @type String | Boolean | Array(String)","            */","            value : {","                value: null,","                setter: function(val) {","                    var node = this.get('elementNode');","                    if (node) {","                        node.set('value', val);","                    }","                    return val;","                }","            },","            /**","             * @description The label that wis present before the element","             * @attribute [label]","             * @type String","            */","            label : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds","             * the className 'itsa-formelement-keyvalidation'.","             * The function MUST return true or false.","             * @attribute [keyValidation]","             * @type Function","            */","            keyValidation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Validation after changing the value (onblur). The function should return true or false. In case of false,","             * the validationerror is thrown.<br>","             * Only has effect if the masterform knows how to use it through delegation:","             * therefore it adds the className 'itsa-formelement-validation'.","             * The function MUST return true or false.","             * Either use validation, or autocorrection.","             * @attribute [validation]","             * @type Function","             * @return Boolean","            */","            validation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description The message that will be returned on a validationerror, this will be set within e.message.","             * @attribute [validationMessage]","             * @type String","            */","            validationMessage : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description If set, value will be replaces by the returnvalue of this function. <br>","             * Only has effect if the masterform knows how to use it through delegation: therefore","             * it adds the className 'itsa-formelement-autocorrect'.","             * The function MUST return true or false: defining whether the input is accepted.","             * Either use validation, or autocorrection.","             * @attribute [autocorrection]","             * @type Function","             * @return Boolean","            */","            autoCorrection : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Additional className that is passed on the label, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameLabel]","             * @type String","            */","            classNameLabel : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Additional className that is passed on the value, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [classNameValue]","             * @type String","            */","            classNameValue : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Will create extra white whitespace during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute [marginTop]","             * @type Int","            */","            marginTop : {","                value: 0,","                validator: function(val) {","                    return (Lang.isNumber(val));","                }","            },","            /**","             * @description Determines whether this element should have the initial focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).","             * @attribute [initialFocus]","             * @type Boolean","            */","            initialFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description Determines whether this element should completely be selected when it gets focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).","             * @attribute [selectOnFocus]","             * @type Boolean","            */","            selectOnFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description DOM-node where the elementNode is bound to.<br>","             * Be carefull: it will only return a Node when you have manually inserted the result of this.render() into the DOM.","             * Otherwise returns null.","             * Readonly","             * @attribute [elementNode]","             * @type Y.Node","             * @readonly","            */","            elementNode : {","                value: null,","                readOnly: true,","                getter: function() {","                    return Y.one('#'+this.id);","                }","            }","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-build\",","        \"panel\",","        \"node-base\",","        \"node-event-delegate\",","        \"dd-plugin\",","        \"node-focusmanager\",","        \"event-valuechange\",","        \"event-custom-base\",","        \"node-core\",","        \"oop\",","        \"gallery-itsaformelement\"","    ]","});"];
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].lines = {"1":0,"3":0,"22":0,"33":0,"142":0,"143":0,"148":0,"175":0,"176":0,"177":0,"178":0,"181":0,"192":0,"193":0,"213":0,"216":0,"217":0,"218":0,"219":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"228":0,"229":0,"231":0,"232":0,"233":0,"234":0,"235":0,"237":0,"239":0,"240":0,"241":0,"242":0,"261":0,"277":0,"296":0,"297":0,"306":0,"325":0,"327":0,"333":0,"334":0,"344":0,"354":0,"355":0,"356":0,"357":0,"358":0,"381":0,"386":0,"387":0,"390":0,"391":0,"393":0,"394":0,"397":0,"403":0,"417":0,"418":0,"419":0,"421":0,"423":0,"424":0,"427":0,"428":0,"429":0,"432":0,"433":0,"434":0,"437":0,"438":0,"439":0,"442":0,"443":0,"444":0,"447":0,"451":0,"452":0,"455":0,"456":0,"460":0,"463":0,"464":0,"465":0,"466":0,"468":0,"469":0,"470":0,"471":0,"473":0,"474":0,"475":0,"476":0,"481":0,"482":0,"485":0,"486":0,"487":0,"489":0,"492":0,"498":0,"499":0,"500":0,"501":0,"502":0,"504":0,"511":0,"512":0,"513":0,"514":0,"515":0,"517":0,"518":0,"519":0,"521":0,"534":0,"549":0,"562":0,"575":0,"579":0,"580":0,"581":0,"582":0,"583":0,"584":0,"597":0,"601":0,"602":0,"603":0,"604":0,"605":0,"619":0,"622":0,"623":0,"635":0,"638":0,"639":0,"647":0,"651":0,"652":0,"653":0,"662":0,"665":0,"668":0,"669":0,"670":0,"675":0,"680":0,"683":0,"690":0,"691":0,"692":0,"693":0,"694":0,"695":0,"696":0,"697":0,"700":0,"701":0,"702":0,"707":0,"708":0,"710":0,"711":0,"719":0,"721":0,"724":0,"726":0,"730":0,"737":0,"741":0,"742":0,"747":0,"751":0,"765":0,"770":0,"771":0,"772":0,"773":0,"776":0,"777":0,"781":0,"792":0,"794":0,"795":0,"798":0,"814":0,"819":0,"820":0,"821":0,"822":0,"825":0,"826":0,"827":0,"828":0,"829":0,"830":0,"831":0,"832":0,"833":0,"834":0,"835":0,"838":0,"840":0,"841":0,"844":0,"848":0,"861":0,"866":0,"867":0,"868":0,"869":0,"870":0,"872":0,"875":0,"876":0,"877":0,"879":0,"888":0,"896":0,"905":0,"906":0,"907":0,"908":0,"909":0,"910":0,"911":0,"912":0,"913":0,"914":0,"926":0,"929":0,"930":0,"931":0,"932":0,"938":0,"939":0,"945":0,"946":0,"953":0,"963":0,"967":0,"968":0,"969":0,"970":0,"971":0,"982":0,"984":0,"995":0,"1005":0,"1018":0,"1031":0,"1040":0,"1048":0,"1058":0,"1081":0,"1084":0,"1086":0,"1097":0,"1098":0,"1110":0,"1114":0,"1116":0,"1117":0,"1119":0,"1122":0,"1133":0,"1134":0,"1145":0,"1146":0,"1149":0,"1168":0,"1179":0,"1190":0,"1210":0,"1212":0,"1214":0,"1233":0,"1234":0,"1235":0,"1244":0,"1245":0,"1246":0,"1256":0,"1257":0,"1258":0,"1271":0,"1272":0,"1273":0,"1275":0,"1278":0,"1290":0,"1291":0,"1294":0,"1315":0,"1316":0,"1317":0,"1319":0,"1330":0,"1344":0,"1361":0,"1372":0,"1388":0,"1400":0,"1412":0,"1424":0,"1436":0,"1448":0,"1464":0};
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].functions = {"initializer:141":0,"definePanel:174":0,"removePanel:191":0,"showPanel:212":0,"getRetryConfirmation:260":0,"getConfirmation:276":0,"getInput:295":0,"getLogin:324":0,"keyValidation:402":0,"autoCorrection:491":0,"getNumber:380":0,"showErrorMessage:533":0,"showMessage:548":0,"showWarning:561":0,"_actionHide:574":0,"_actionStayAlive:596":0,"_actionReset:618":0,"_actionClear:634":0,"focus:646":0,"(anonymous 2):667":0,"(anonymous 3):682":0,"(anonymous 4):721":0,"(anonymous 5):726":0,"(anonymous 6):740":0,"(anonymous 7):749":0,"bindUI:661":0,"shiftFocus:764":0,"_shiftFocusFromCheckbox:791":0,"_checkInput:813":0,"_validate:860":0,"activatePanel:887":0,"deactivatePanel:895":0,"destructor:904":0,"_setValidationButtons:925":0,"_markButtonValidated:962":0,"_initiatePanels:981":0,"_getFirstFocusNode:1080":0,"_getDefaultButtonNode:1096":0,"(anonymous 8):1115":0,"_serializeForm:1107":0,"initializer:1178":0,"render:1189":0,"showValidation:1232":0,"hideValidation:1243":0,"destructor:1255":0,"setter:1270":0,"validator:1277":0,"setter:1289":0,"validator:1293":0,"setter:1314":0,"validator:1329":0,"validator:1343":0,"validator:1360":0,"validator:1371":0,"validator:1387":0,"validator:1399":0,"validator:1411":0,"validator:1423":0,"validator:1435":0,"validator:1447":0,"getter:1463":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialogbox/gallery-itsadialogbox.js"].coveredLines = 313;
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
                  logintable, defaultlogindata;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 327);
defaultlogindata = {
                labelUsername: 'username',
                labelPassword: 'password',
                defaultUsername: '',
                defaultPassword: ''
            };
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 333);
logindata = logindata || defaultlogindata;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 334);
instance.inputElementUsername = new Y.ITSAFORMELEMENT({
                label: logindata.labelUsername || defaultlogindata.labelUsername,
                name: 'username',
                type: 'input',
                value: logindata.defaultUsername || '',
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-firstelement',
                marginTop: 24,
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 344);
instance.inputElementPassword = new Y.ITSAFORMELEMENT({
                label: logindata.labelPassword || defaultlogindata.labelPassword,
                name: 'password',
                type: 'password',
                value: logindata.defaultPassword || '',
                classNameValue: 'yui3-itsadialogbox-stringinput itsa-formelement-lastelement',
                marginTop: 7,
                initialFocus: false,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 354);
logintable = '<table><tbody>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 355);
logintable += '<tr>'+instance.inputElementUsername.render(true)+'</tr>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 356);
logintable += '<tr>'+instance.inputElementPassword.render(true)+'</tr>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 357);
logintable += '</tbody></table>';
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 358);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getNumber", 380);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 381);
var instance = this,
                withMinValue = Lang.isNumber(minvalue),
                withMaxValue = Lang.isNumber(maxvalue),
                validationMessage = '',
                eventArguments = {};
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 386);
if (withMinValue && withMaxValue) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 387);
validationMessage = 'Input must be between '+minvalue+' and '+maxvalue;
            }
            else {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 390);
if (withMinValue) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 391);
validationMessage = 'Input must not be below '+minvalue;
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 393);
if (withMaxValue) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 394);
validationMessage = 'Input must not be above '+maxvalue;
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 397);
instance.inputElement = new Y.ITSAFORMELEMENT({
                name: 'value',
                type: 'input',
                value: defaultvalue ? defaultvalue.toString() : '',
                label: message,
                keyValidation: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "keyValidation", 402);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 403);
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
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 417);
if (Y.Array.indexOf(valid, keycode) === -1) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 418);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 419);
return false;
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 421);
if (((e.shiftKey) && (keycode!==9) && (keycode!==37) && (keycode!==38) && (keycode!==39) &&
                                                                                     (keycode!==40)) || (e.ctrlKey) || (e.altKey) || (e.metaKey)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 423);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 424);
return false;
                    }
                    // no digit of zero at the beginning when minimum>0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 427);
if (Lang.isNumber(minValue) && (minValue>0) && (cursor===0) && ((keycode===48) || (keycode===96))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 428);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 429);
return false;
                    }
                    // no digit of zero at second position when first position=0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 432);
if ((cursor===1) && ((keycode===48) || (keycode===96)) && ((previousStringValue==='0') || (previousStringValue==='-'))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 433);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 434);
return false;
                    }
                    // no minus at the beginning when minimum>=0
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 437);
if (Lang.isNumber(minValue) && (minValue>=0) && (cursor===0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 438);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 439);
return false;
                    }
                    // no minus when not at the beginning
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 442);
if ((cursor>0) && (Y.Array.indexOf(minustoken, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 443);
e.halt(true);
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 444);
return false;
                    }
                    // not valid when number will become lower than minimum, only check if field is modified
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 447);
if ((Lang.isNumber(minValue) || Lang.isNumber(maxValue)) &&
                        ((Y.Array.indexOf(digits, keycode) !== -1) || (keycode===8) || (keycode===46))) {
                        // transform e.keyCode to a keyCode that can be translated to chareacter --> numerical
                        // keyboard will be transformed to normal keyboard
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 451);
if (keycode===8) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 452);
nextValue = parseInt(previousStringValue.substring(0, (cursor===cursorEnd) ? cursor-1 : cursor) +
                                                previousStringValue.substring(cursorEnd), 10);
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 455);
if (keycode===46) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 456);
nextValue = parseInt(previousStringValue.substring(0, cursor) +
                                                previousStringValue.substring((cursor===cursorEnd) ? cursorEnd+1 : cursorEnd), 10);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 460);
nextValue = parseInt(previousStringValue.substring(0, cursor) + safeNumericalKeyCodeToString +
                                                previousStringValue.substring(cursorEnd), 10);
                        }}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 463);
if (!Lang.isNumber(nextValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 464);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 465);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 466);
reactivation = false;
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 468);
if (Lang.isNumber(minValue) && (nextValue<minValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 469);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 470);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 471);
reactivation = false;
                        }
                        else {_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 473);
if (Lang.isNumber(maxValue) && (nextValue>maxValue)) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 474);
if (e.showValidation) {e.showValidation();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 475);
if (e.deactivatePanel) {e.deactivatePanel();}
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 476);
reactivation = false;
                        }}}
                    }
                    // correct possible 0x by removing leading 0
                    // because for some reason, this also is called when got blurred: do only check if number is digit
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 481);
if ((cursor===1) && (previousStringValue==='0') && (Y.Array.indexOf(digits, keycode) !== -1)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 482);
node.set('value', '');
                    }
                    // only reactivate when the key is not a key that leaves the element
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 485);
if ((keycode!==9) && (keycode!==13)) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 486);
if (reactivation && e.hideValidation) {e.hideValidation();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 487);
if (reactivation && e.activatePanel) {e.activatePanel();}
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 489);
return true;
                },
                autoCorrection: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "autoCorrection", 491);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 492);
var formelement = this,
                        minvalue = e && e.minValue,
                        maxvalue = e && e.maxValue,
                        previousValue = formelement.get('elementNode').get('value'),
                        value = ((previousValue==='') || (previousValue==='-')) ? 0 : previousValue,
                        newValue = parseInt(value, 10);
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 498);
formelement.set('value', newValue.toString());
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 499);
if ((Lang.isNumber(minvalue) && (newValue<minvalue)) || (Lang.isNumber(maxvalue) && (newValue>maxvalue))) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 500);
if (e.showValidation) {e.showValidation();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 501);
if (e.activatePanel) {e.activatePanel();}
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 502);
return false;
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 504);
return true;
                },
                validationMessage: validationMessage,
                classNameValue: 'yui3-itsadialogbox-numberinput itsa-formelement-lastelement',
                initialFocus: true,
                selectOnFocus: true
            });
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 511);
if (Lang.isNumber(minvalue)) {eventArguments.minValue = minvalue;}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 512);
if (Lang.isNumber(maxvalue)) {eventArguments.maxValue = maxvalue;}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 513);
if (validationMessage) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 514);
eventArguments.showValidation = Y.bind(instance.inputElement.showValidation, instance.inputElement);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 515);
eventArguments.hideValidation = Y.bind(instance.inputElement.hideValidation, instance.inputElement);
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 517);
if (eventArguments.minValue || eventArguments.maxValue) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 518);
eventArguments.activatePanel = Y.bind(instance.activatePanel, instance);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 519);
eventArguments.deactivatePanel = Y.bind(instance.deactivatePanel, instance);
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 521);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showErrorMessage", 533);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 534);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showMessage", 548);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 549);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showWarning", 561);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 562);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionHide", 574);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 575);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 579);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 580);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 581);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 582);
instance.hide();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 583);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 584);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionStayAlive", 596);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 597);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd),
                button = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 601);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 602);
if (!button.hasClass('yui3-button-disabled')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 603);
ev.buttonName = e.target.getData('name');
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 604);
if (Y.Lang.isFunction(instance._activePanelOption.callback)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 605);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionReset", 618);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 619);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 622);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 623);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_actionClear", 634);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 635);
var instance = this,
                bd = instance.get('contentBox').one('.yui3-widget-bd'),
                ev = instance._serializeForm(bd);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 638);
e.preventDefault();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 639);
ev.buttonName = e.target.getData('name');
        },

        /**
         * overrules Y.panel.focus, by focussing on the panel first, and then using the focusmanager to focus on the right element.
         * @method focus
        */
        focus: function(){
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "focus", 646);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 647);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            // apply returns something, call just runs. First argument is 'this' in the function, next arguments are the arguments in targetfunction
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 651);
instance.constructor.superclass.focus.call(instance);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 652);
if (focusManager) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 653);
focusManager.focus();
            }
        },

        /**
         * Define all eventhandlers
         * @method bindUI
        */
        bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "bindUI", 661);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 662);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusManager = contentBox.focusManager;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 665);
instance._panelListener = contentBox.on(
                'keydown',
                function (e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 2)", 667);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 668);
if (e.keyCode === 9) { // tab
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 669);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 670);
this.shiftFocus(e.shiftKey);
                    }
                },
                instance
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 675);
instance._buttonsListener = instance.after(
                'buttonsChange',
                instance._setValidationButtons,
                instance
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 680);
instance._descendantListener = focusManager.on(
                'activeDescendantChange',
                function (e) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 3)", 682);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 683);
var instance = this,
                        previousDescendant = e.prevVal,
                        nextDescendant = e.newVal,
                        defaultButton,
                        isButton,
                        allDescendants = focusManager.get('descendants'),
                        sameDescendant;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 690);
instance._descendantChange++;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 691);
if (Lang.isNumber(previousDescendant) && (previousDescendant>=0)) {previousDescendant = allDescendants.item(e.prevVal);}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 692);
if (Lang.isNumber(nextDescendant)) {nextDescendant = allDescendants.item(e.newVal);}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 693);
sameDescendant = nextDescendant.compareTo(previousDescendant);
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 694);
defaultButton = contentBox.one('.yui3-button-primary');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 695);
isButton = (nextDescendant.get('tagName')==='BUTTON');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 696);
if (defaultButton) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 697);
defaultButton.toggleClass('nofocus', ((nextDescendant!==defaultButton) && isButton));
                    }
                    // to make a pressed button highlighted, we must add a seperate class
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 700);
allDescendants.removeClass('mousepressfocus');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 701);
if (isButton) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 702);
nextDescendant.addClass('mousepressfocus');
                    }
                    // now: by first time showing the Panel, the focusManager activeDescendent will be called three times, before steady state
                    // in case of an element that gets focused.
                    // To make the content be selected again (if requested) look at the value of instance._descendant
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 707);
if ((!sameDescendant || (instance._descendantChange<4)) && nextDescendant.hasClass('itsa-formelement-selectall')) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 708);
nextDescendant.select();
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 710);
if (!sameDescendant) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 711);
instance._validate(isButton, nextDescendant);
                    }
                },
                instance,
                contentBox
            );
            // because the header might not exists yet (at rendering it doesn't), we have to delegate next events
            // instead of binding it to the headernode
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 719);
instance._headerMousedownListener = contentBox.delegate(
                'mousedown',
                function(e) {_yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 4)", 721);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 721);
e.target.addClass('cursormove');},
                '.yui3-widget-hd'
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 724);
instance._headerMouseupListener = contentBox.delegate(
                'mouseup',
                function(e) {_yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 5)", 726);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 726);
e.target.removeClass('cursormove');},
                '.yui3-widget-hd'
            );
            // same for input elements
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 730);
instance._inputListener = contentBox.delegate(
                'keydown',
                instance._checkInput,
                'input',
                instance
            );
            // now, listen for checkboxes: the loose focus when they get clicked.
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 737);
instance._checkBoxListener = contentBox.delegate(
                'change',
                instance._shiftFocusFromCheckbox,
                function(){
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 6)", 740);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 741);
var node =this;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 742);
return ((node.get('tagName')==='INPUT') && (node.get('type')==='checkbox'));
                },
                instance
            );
            // reset the focus when clicked on an area inside contentBox that is not an element
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 747);
contentBox.on(
                'click',
                function() {
                    // this = focusManeger
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 7)", 749);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 751);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "shiftFocus", 764);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 765);
var instance = this,
                focusManager = instance.get('contentBox').focusManager,
                focusManagerNodes = focusManager.get('descendants'),
                activeDescendant = referenceNode ? focusManagerNodes.indexOf(referenceNode) : focusManager.get('activeDescendant'),
                numberDescendants = focusManagerNodes.size();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 770);
if (referenceNode || focusManager.get('focused')) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 771);
if (Lang.isBoolean(backward) && backward) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 772);
activeDescendant--;
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 773);
focusManager.focus((activeDescendant<0) ? numberDescendants-1 : activeDescendant);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 776);
activeDescendant++;
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 777);
focusManager.focus((activeDescendant>=numberDescendants) ? 0 : activeDescendant);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 781);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_shiftFocusFromCheckbox", 791);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 792);
var instance = this,
                checkboxNode = e.target;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 794);
if (checkboxNode.hasClass('itsa-formelement-lastelement')) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 795);
instance.get('contentBox').focusManager.focus(instance._getDefaultButtonNode());
            }
            else {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 798);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_checkInput", 813);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 814);
var instance = this,
                node = e.target,
                autoCorrection,
                autoCorrectResult,
                eventArgs = instance._activePanelOption.eventArgs;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 819);
if (node.hasClass('itsa-formelement-keyvalidation') && instance.inputElement) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 820);
Y.mix(e, eventArgs);
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 821);
if (!instance.inputElement.get('keyValidation')(e)) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 822);
return;
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 825);
if (e.keyCode===13) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 826);
e.preventDefault();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 827);
if (node.hasClass('itsa-formelement-lastelement')) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 828);
autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 829);
autoCorrectResult = true;
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 830);
if (autoCorrection) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 831);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 832);
if (!autoCorrectResult) {
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 833);
eventArgs.showValidation();
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 834);
instance.deactivatePanel();
                            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 835);
instance.get('contentBox').focusManager.focus(instance._getFirstFocusNode());
                        }
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 838);
if (autoCorrectResult) {
                        // because the callback should think the activebutton was clicked, we add the right name-data to this Node
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 840);
node.setData('name', instance._getDefaultButtonNode().getData('name'));
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 841);
instance._actionHide(e);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 844);
node.select();
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 848);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_validate", 860);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 861);
var instance = this,
                eventArgs = instance._activePanelOption.eventArgs,
                buttonValidation = isButton && node.hasClass('itsadialogbox-button-validated'),
                autoCorrection = instance.inputElement && instance.inputElement.get('autoCorrection'),
                autoCorrectResult = true;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 866);
if (autoCorrection && buttonValidation) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 867);
autoCorrectResult = Y.bind(autoCorrection, instance.inputElement, eventArgs)();
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 868);
if (!autoCorrectResult) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 869);
if (eventArgs && eventArgs.showValidation) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 870);
eventArgs.showValidation();
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 872);
instance.deactivatePanel();
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 875);
if (autoCorrectResult) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 876);
if (eventArgs && eventArgs.hideValidation) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 877);
eventArgs.hideValidation();
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 879);
instance.activatePanel();
            }
        },

        /**
         * Enables all buttons with button.validation=true
         * @method activatePanel
        */
        activatePanel: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "activatePanel", 887);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 888);
this._validationButtons.toggleClass('yui3-button-disabled', false);
        },

        /**
         * Disnables all buttons with button.validation=true
         * @method deactivatePanel
        */
        deactivatePanel: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "deactivatePanel", 895);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 896);
this._validationButtons.toggleClass('yui3-button-disabled', true);
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 904);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 905);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 906);
if (instance.keyDownHandle) {instance.keyDownHandle.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 907);
if (instance._panelListener) {instance._panelListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 908);
if (instance._descendantListener) {instance._descendantListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 909);
if (instance._headerMousedownListener) {instance._headerMousedownListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 910);
if (instance._headerMouseupListener) {instance._headerMouseupListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 911);
if (instance._inputListener) {instance._inputListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 912);
if (instance._checkBoxListener) {instance._checkBoxListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 913);
if (instance._buttonsListener) {instance._buttonsListener.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 914);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_setValidationButtons", 925);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 926);
var instance = this,
                buttonsObject = instance._activePanelOption.buttons,
                contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 929);
contentBox.all('.itsadialogbox-button-validated').removeClass('itsadialogbox-button-validated');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 930);
if (buttonsObject) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 931);
if (buttonsObject.header) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 932);
Y.Array.each(
                        buttonsObject.header,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 938);
if (buttonsObject.body) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 939);
Y.Array.each(
                        buttonsObject.body,
                        instance._markButtonValidated,
                        instance
                    );
                }
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 945);
if (buttonsObject.footer) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 946);
Y.Array.each(
                        buttonsObject.footer,
                        instance._markButtonValidated,
                        instance
                    );
                }
            }
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 953);
instance._validationButtons = contentBox.all('.itsadialogbox-button-validated');
        },

        /**
         * Internal method that markes a button with a validated-class if it has button.validation=true<br>
         * @method _markButtonValidated
         * @param {Object} buttonObject
         * @private
        */
        _markButtonValidated : function(buttonObject) {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_markButtonValidated", 962);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 963);
var instance = this,
                name = buttonObject.name,
                validation,
                buttonNode;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 967);
buttonNode = instance.getButton(name);
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 968);
if (buttonNode) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 969);
validation = buttonObject.validation;
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 970);
if (Lang.isBoolean(validation) && validation) {
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 971);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_initiatePanels", 981);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 982);
var instance = this;
            // creating getRetryConfirmation
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 984);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 995);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1005);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1018);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1031);
instance.definePanel({
                iconClass: instance.ICON_ERROR,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });
            // creating showMessage
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1040);
instance.definePanel({
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });
            // creating showWarning
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1048);
instance.definePanel({
                iconClass: instance.ICON_WARN,
                buttons: {
                    footer: [
                        {name:'ok', label:'Ok', action:instance.ACTION_HIDE, isDefault: true}
                    ]
                }
            });

            // creating loginPanel (id=7)
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1058);
instance.definePanel({
                iconClass: instance.ICON_QUESTION,
                form: [
                    {name:'username', label:'{username}', value:'{username}'},
                    {name:'password', label:'{password}', value:'{password}'}
                ],
                buttons: {
                    footer: [
                        {name:'login', label:'Login', action:instance.ACTION_HIDE, isDefault: true}
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getFirstFocusNode", 1080);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1081);
var instance = this,
                contentBox = instance.get('contentBox'),
                focusnode;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1084);
focusnode = contentBox.one('.itsa-formelement-firstfocus') || contentBox.one('.itsa-firstformelement') ||
                                                                                                                instance._getDefaultButtonNode();
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1086);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_getDefaultButtonNode", 1096);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1097);
var node = this.get('contentBox').one('.yui3-button-primary');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1098);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "_serializeForm", 1107);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1110);
var formelements = masterNode.all('.itsa-formelement'),
                  value,
                  intValue,
                  serialdata = {};
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1114);
formelements.each(
                function(formelementNode) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "(anonymous 8)", 1115);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1116);
value = formelementNode.get('value');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1117);
intValue = parseInt(value, 10);
                    // now check with DOUBLE == (not threedouble) to see if value == intValue --> in that case we have an integer
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1119);
serialdata[formelementNode.get('name')] = (value===intValue.toString()) ? intValue : value;
                }
            );
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1122);
return serialdata;
        }

    }, {
        ATTRS : {
        }
    }
);

//=================================================================================

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1133);
if (!Y.Global.ItsaDialog) {
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1134);
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
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1145);
Y.Global.ItsaDialog.plug(Y.Plugin.Drag);
    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1146);
Y.Global.ItsaDialog.dd.addHandle('.yui3-widget-hd');
}

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1149);
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

_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1168);
Y.ITSAFORMELEMENT = Y.Base.create('itsaformelement', Y.Base, [], {

        id: null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "initializer", 1178);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1179);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "render", 1189);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1190);
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
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1210);
if (type==='input') {element = '<input id="' + instance.id + '" type="text" name="' + instance.get('name') + '" value="' +
                                                            instance.get('value') + '"' + elementClass + marginStyle + ' />';}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1212);
if (type==='password') {element = '<input id="' + instance.id + '" type="password" name="' + instance.get('name') + '" value="' +
                                                                   instance.get('value') + '"' + elementClass + marginStyle + ' />';}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1214);
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
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "showValidation", 1232);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1233);
var element = this.get('elementNode');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1234);
if (element) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1235);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);
            }
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
        */
        hideValidation : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "hideValidation", 1243);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1244);
var element = this.get('elementNode');
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1245);
if (element) {
                _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1246);
element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "destructor", 1255);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1256);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1257);
if (instance.blurevent) {instance.blurevent.detach();}
            _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1258);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1270);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1271);
var node = this.get('elementNode');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1272);
if (node) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1273);
node.set('name', val);
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1275);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1277);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1278);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1289);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1290);
if (Lang.isString(val)) {val=val.toLowerCase();}
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1291);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1293);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1294);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "setter", 1314);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1315);
var node = this.get('elementNode');
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1316);
if (node) {
                        _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1317);
node.set('value', val);
                    }
                    _yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1319);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1329);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1330);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1343);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1344);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1360);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1361);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1371);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1372);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1387);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1388);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1399);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1400);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1411);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1412);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1423);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1424);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1435);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1436);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "validator", 1447);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1448);
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
                    _yuitest_coverfunc("build/gallery-itsadialogbox/gallery-itsadialogbox.js", "getter", 1463);
_yuitest_coverline("build/gallery-itsadialogbox/gallery-itsadialogbox.js", 1464);
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
        "oop",
        "gallery-itsaformelement"
    ]
});
