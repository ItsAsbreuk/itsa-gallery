YUI.add('itsa-form', function(Y) {

'use strict';

/**
 * ITSAFORM
 *
 * @module gallery-itsaform
 * @class ITSAForm
 * @extends Widget
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
*/

var Lang  = Y.Lang,
    TABLE_START_TEMPLATE = '<table><tbody>',
    TABLE_END_TEMPLATE = '</tbody></table>',

    ITSAFORM_TABLETEMPLATE = '<td class="itsaform-tablelabel {classnamelabel}"{paddingstyle}>{label}</td>'
        +'<td class="itsaform-tableelement"{paddingstyle}>{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">'
        +'{validationMessage}</div></td>',

    ITSAFORM_INLINETEMPLATE = '<span class="itsaform-spanlabel {classnamelabel}"{marginstyle}>{label}</span>'
                            +'{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div>',

    ITSAFORM_TABLETEMPLATE_MERGED = '<td colspan="2"{paddingstyle}><span class="itsaform-spanlabelmerged {classnamelabel}">{label}</span><br />'
        +'{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">'
        +'{validationMessage}</div></td>',

    ITSAFORM_INLINETEMPLATE_MERGED = '<span class="itsaform-spanlabelmerged {classnamelabel}"{marginstyle}>{label}</span><br />'
                            +'{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div>',

    ITSAFORM_TABLETEMPLATE_MERGED_NOLABEL = '<td colspan="2"{paddingstyle}>'
        +'{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">'
        +'{validationMessage}</div></td>',

    ITSAFORM_INLINETEMPLATE_MERGED_NOLABEL = '{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">'
        +'{validationMessage}</div>';

Y.ITSAFORM = Y.Base.create('itsaform', Y.Widget, [], {

        CONTENT_TEMPLATE : '<form></form>',
        elementObjects : [],

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            Y.log('initializer', 'cmas', 'ITSAFORM');
            this.id = Y.guid();
        },

        /**
         *
         * @method renderUI
        */
        renderUI : function() {
            Y.log('renderUI', 'cmas', 'ITSAFORM');
            var instance = this,
                elementObject,
                tableform = instance.get('tableform'),
                contentBox = instance.get('contentBox');
            instance._clearMemory();
            contentBox.setHTML(tableform ? TABLE_START_TEMPLATE : '');
            Y.Array.each(
                instance.get('elements'),
                function(elementConfig) {
                    elementObject = new Y.ITSAFORMEL(elementConfig);
                    contentBox.append(elementObject.getNode(tableform));
                    instance.elementObjects.push(elementObject);
                }
            );
            if (tableform) {
                contentBox.append(TABLE_END_TEMPLATE);
            }
//            instance._syncFormAttributes();
        },

        bindUI : function() {
            Y.log('bindUI', 'cmas', 'ITSAFORM');
            var instance = this,
                contentBox = instance.get('contentBox');
            contentBox.delegate(
                'click',
                instance._sendForm,
                function() {
                    var el = this;
                    return ((el.get('tagName')==='INPUT') && (el.get('type')==='submit'));
                },
                instance
            );
        },

        /**
         * @method _syncFormAttributes
         * @protected
         * @private
         * @description Syncs the form node action and method attributes
         */
        _syncFormAttributes : function () {
            Y.log('_syncFormAttributes', 'cmas', 'ITSAFORM');
            var instance = this,
                contentBox = instance.get('contentBox');
            contentBox.setAttrs({
                action : instance.get('action'),
                method : instance.get('method')
            });
            if (instance.get('encodingType') === Y.ITSAFORM.MULTIPART_ENCODED) {
                contentBox.setAttribute('enctype', 'multipart/form-data');
            }
        },

        /**
         * @method _sendForm
         * @private
         * @description Sends the form to this.get('action') using ajax
         */
        _sendForm : function(e) {
            Y.log('_sendForm', 'cmas', 'ITSAFORM');
            var instance = this,
                cfg;
            e.preventDefault();
            cfg = {
                method: instance.get('method'),
                on: {
                    success: instance._sendSuccess,
                    failure: instance._sendFailure
                },
                context: instance,
                form: {
                    id: instance.get('contentBox'),
                    useDisabled: false,
                    upload: false
                }
            };
            instance._sendRequest = Y.io(instance.get('action'), cfg);
        },

        /**
         * @method _sendSuccess
         * @private
         * @description Called when form is sent succesfuly
         */
        _sendSuccess : function() {
            Y.log('_sendSuccess', 'cmas', 'ITSAFORM');
            var instance = this,
                message = instance.get('messageSuccess');
            instance.resetForm();
            if (message) {
                Y.Global.ItsaDialog.showMessage(message);
            }
        },

        /**
         * @method resetForm
         * @description Resets the form
         */
        resetForm : function() {
            var cb = Y.Node.getDOMNode(this.get('contentBox'));
            if (Y.Lang.isFunction(cb.reset)) {
                cb.reset();
            }
        },

        /**
         * @method _sendFailure
         * @private
         * @description Called when form failed to send
         */
        _sendFailure : function() {
            Y.log('_sendFailure', 'cmas', 'ITSAFORM');
            var message = this.get('messageFailure');
            if (message) {
                Y.Global.ItsaDialog.showErrorMessage(message);
            }
        },

        /**
         * @method _clearMemory
         * @private
         * @description Cleanes up memory
         */
        _clearMemory : function() {
            Y.log('_clearMemory', 'cmas', 'ITSAFORM');
            var instance = this;
            Y.Array.each(
                instance.elementObjects,
                function(element) {
                    element.destroy(false);
                }
            );
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'cmas', 'ITSAFORM');
            var instance = this;
            instance._clearMemory();
            if (instance._sendRequest && instance._sendRequest.isInProgress()) {
                instance._sendRequest.abort();
            }
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
                    var node = this.get('elementNode');
                    if (node) {
                        node.set('name', val);
                    }
                    return val;
                },
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },

            action : {
                value: '/',
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },

            method : {
                value: 'post'
            },
            
            tableform : {
                value: false
            },
            
            elements : {
                value: []
            },

            messageSuccess : {
                value: null,
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },

            messageFailure : {
                value: null,
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },

            /**
             * @attribute encodingType
             * @type Number
             * @description Set to Form.MULTIPART_ENCODED in order to use the FileField for uploads
             * @default Form.URL_ENCODED
             */
            encodingType : {
                value : 1,
                validator : Y.Lang.isNumber
            }

        },

        /**
         * @property Form.URL_ENCODED
         * @type Number
         * @description Set the form the default text encoding
         */
        URL_ENCODED : 1,

        /**
         * @property Form.MULTIPART_ENCODED
         * @type Number
         * @description Set form to multipart/form-data encoding for file uploads
         */
        MULTIPART_ENCODED : 2

    }
);

//=============================================================================================================
//=============================================================================================================

/**
 * ITSAFORMEL
 *
 *
 * @module gallery-itsaform
 * @class ITSAFORMEL
 * @extends Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

Y.ITSAFORMEL = Y.Base.create('itsaformelement', Y.Base, [], {

        id: '',

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            Y.log('initializer', 'cmas', 'ITSAFORMEL');
            this.id = Y.guid();
        },

        /**
         * Renderes a String that contains the completeFormElement definition.<br>
         * To be used in an external Form
         * @method render
         * @param {boolean} tableform If the renderedstring should be in tableform: encapsuled by td-elements (without tr)
         * @return {Y.Node} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
        */
        getNode : function(tableform) {
            Y.log('getNode', 'cmas', 'ITSAFORMEL');
            var instance = this,
                node,
                id = instance.id,
                marginTop = instance.get('marginTop'),
                marginStyle = (marginTop && !tableform) ? ' style="margin-top:' + marginTop + 'px"' : '',
                paddingStyle = marginTop ? ' style="padding-top:' + marginTop + 'px"' : '',
                type = instance.get('type'),
                label = instance.get('label'),
                name = instance.get('name') || label || 'undefined',
                value = instance.get('value'),
                classNameLabel = instance.get('classNameLabel'),
                classNameValue = instance.get('classNameValue'),
                initialFocus = instance.get('initialFocus'),
                selectOnFocus = instance.get('selectOnFocus'),
                keyValidation = instance.get('keyValidation'),
                validation = instance.get('validation'),
                autoCorrection = instance.get('autoCorrection'),
                classNameValueClass = (classNameValue==='') ? '' : ' ' + classNameValue,
                initialFocusClass = initialFocus ? ' itsa-formelement-firstfocus' : '',
                selectOnFocusClass = selectOnFocus ? ' itsa-formelement-selectall' : '',
                keyValidationClass = keyValidation ? ' itsa-formelement-keyvalidation' : '',
                validationClass = validation ? ' itsa-formelement-validation' : '',
                autoCorrectionClass = autoCorrection ? ' itsa-formelement-autocorrect' : '',
                cssButtonClass = ((type==='button') || (type==='submit') || (type==='reset')) ? ' yui3-button' : '',
                elementClass = ' class="itsa-formelement ' + Y.ClassNameManager.getClassName('itsaformelement', name)
                             + ' ' + Y.ClassNameManager.getClassName('itsaformelement', type) + classNameValueClass + cssButtonClass
                             + initialFocusClass + selectOnFocusClass + keyValidationClass + validationClass + autoCorrectionClass + '"',
                element = '';
            if (type==='input') {
                element = '<input id="' + id + '" type="text" name="' + name + '" value="'
                        + (value || '') + '"' + elementClass + marginStyle + ' />';
            }
            if (instance._isButton()) {
                element = '<input id="' + id + '" type="' + type + '" name="' + name + '" value="'
                        + (label || value || '') + '"' + elementClass + marginStyle + ' />';
            }
            else if (type==='textarea') {
                element = '<textarea id="' + id + '" name="' + name + '" ' + elementClass + marginStyle + ' />' + (value || '') + '</textarea>';
            }
            else if (type==='password') {
                element = '<input id="' + id + '" type="password" name="' + name + '" value="'
                        + (value || '') + '"' + elementClass + marginStyle + ' />';
            }
            else if (type==='text') {
                element = '<span id="' + id + '" name="' + name + '" ' + elementClass + marginStyle + ' />' + (value || '') + '</span>';
            }
            if (type==='hidden') {
                element = '<input id="' + id + '" type="hidden" name="' + name + '" value="'
                        + (value || '') + '"' + elementClass + marginStyle + ' />';
            }
            node = Y.Node.create(Lang.sub(
                    instance._getElementTemplate(tableform),
                    {
                        marginstyle: marginStyle,
                        paddingstyle: paddingStyle,
                        label: label,
                        element: element,
                        classnamelabel: classNameLabel,
                        validationMessage: instance.get('validationMessage'),
                        classnamevalue: classNameValue
                    }
                )
            );
            return node;
        },

        _isButton: function() {
            Y.log('_isButton', 'cmas', 'ITSAFORMEL');
            var type = this.get('type');
            return (type==='button') || (type==='submit') || (type==='reset');
        },

        _getElementTemplate: function(tableform) {
            Y.log('_getElementTemplate', 'cmas', 'ITSAFORMEL');
            var instance = this,
                isbutton = instance._isButton(),
                nolabel = (instance.get('label') === '') || isbutton,
                merged = instance.get('labelAboveElement') || instance.get('fullWidth') || isbutton,
                template;
            if (tableform) {
                template = !merged ? ITSAFORM_TABLETEMPLATE : (nolabel ? ITSAFORM_TABLETEMPLATE_MERGED_NOLABEL : ITSAFORM_TABLETEMPLATE_MERGED);
            }
            else {
                template = !merged ? ITSAFORM_INLINETEMPLATE : (nolabel ? ITSAFORM_INLINETEMPLATE_MERGED_NOLABEL : ITSAFORM_INLINETEMPLATE_MERGED);
            }
            return template;
        },

        /**
         * Shows the validationmessage
         * @method showValidation
        */
        showValidation : function() {
            Y.log('showValidation', 'cmas', 'ITSAFORMEL');
            var element = this.get('elementNode');
            if (element) {
                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', false);
            }
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
        */
        hideValidation : function() {
            Y.log('hideValidation', 'cmas', 'ITSAFORMEL');
            var element = this.get('elementNode');
            if (element) {
                element.get('parentNode').one('.itsa-formelement-validationmessage').toggleClass('itsa-formelement-hidden', true);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'cmas', 'ITSAFORMEL');
            var instance = this;
            if (instance.blurevent) {instance.blurevent.detach();}
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
                lazyAdd: false,
                setter: function(val) {
                    var node = this.get('elementNode');
                    if (node) {
                        node.set('name', val);
                    }
                    return val;
                },
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },
            /**
             * @description Must have one of the following values:
             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>
             * @attribute type
             * @type String
            */
            type : {
                value: '',
                setter: function(val) {
                    if (Lang.isString(val)) {val=val.toLowerCase();}
                    return val;
                },
                validator: function(val) {
                    return (Lang.isString(val) &&
                            ((val==='input') ||
                             (val==='password') ||
                             (val==='text') ||
                             (val==='textarea') ||
                             (val==='checkbox') ||
                             (val==='radiogroup') ||
                             (val==='selectbox') ||
                             (val==='button') ||
                             (val==='reset') ||
                             (val==='submit') ||
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
                lazyAdd: false,
                setter: function(val) {
                    var node = this.get('elementNode');
                    if (node) {
                        node.set('value', val);
                    }
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
                    return (Lang.isString(val));
                }
            },
            /**
             * @description The label that wis present before the element
             * @attribute [labelAboveElement]
             * @type boolean
            */
            labelAboveElement : {
                value: false,
                validator: function(val) {
                    return (Lang.isBoolean(val));
                }
            },
            /**
             * @description Forces the field to be expanded along with the label. Is handy when you use 'text'-element
             * @attribute fullWidth
             * @type boolean
            */
            fullWidth : {
                value: false,
                validator: function(val) {
                    return (Lang.isBoolean(val));
                }
            },
            /**
             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             * the className 'itsa-formelement-keyvalidation'
             * The function MUST return true or false.
             * @attribute [keyValidation]
             * @type Function
            */
            keyValidation : {
                value: null,
                validator: function(val) {
                    return (Lang.isFunction(val));
                }
            },
            /**
             * @description Validation after changing the value (onblur). The function should return true or false.
             * In case of false, the validationerror is thrown.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             *the className 'itsa-formelement-validation'.
             * The function MUST return true or false.
             * Either use validation, or autocorrection.
             * @attribute [validation]
             * @type Function
             * @return Boolean
            */
            validation : {
                value: null,
                validator: function(val) {
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
                    return (Lang.isString(val));
                }
            },
            /**
             * @description If set, value will be replaces by the returnvalue of this function. <br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             * the className 'itsa-formelement-autocorrect'.
             * The function MUST return true or false: defining whether the input is accepted.
             * Either use validation, or autocorrection.
             * @attribute [autocorrection]
             * @type Function
             * @return Boolean
            */
            autoCorrection : {
                value: null,
                validator: function(val) {
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
                    return Y.one('#'+this.id);
                }
            }
        }
    }
);
}, '0.0.1', {requires: ['base-build', 'widget', 'node-base', 'classnamemanager', 'cssbutton', 'io', 'gallery-itsadialogbox']});