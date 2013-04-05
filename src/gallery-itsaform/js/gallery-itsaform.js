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
    TABLE_END_TEMPLATE = '</tbody></table>';
    ITSAFORMELEMENT_CLASS = 'itsa-formelement',
    YClassNameManagerGetClassName = Y.ClassNameManager.getClassName,
    ITSAFORMELEMENT_LABEL_CLASS = YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'label'),
    ITSAFORMELEMENT_LABELMERGED_CLASS = YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'label', 'merged'),
    ITSAFORMELEMENT_ELEMENT_CLASS = YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'element'),
    ITSAFORMELEMENT_VALIDATION_CLASS = YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation'),
    ITSAFORMELEMENT_HIDDEN_CLASS = YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'hidden'),
    EXPRESSION_LABEL = '{label}',
    EXPRESSION_LABEL_CLASSNAME = '{classnamelabel}',
    EXPRESSION_ELEMENT = '{element}',
    EXPRESSION_ELEMENT_CLASSNAME = '{classnameelement}',
    EXPRESSION_VALIDATION = '{validationmessage}',

    ITSAFORM_TABLETEMPLATE = '<td class="'+ITSAFORMELEMENT_LABEL_CLASS+' '+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+'</td>'
        +'<td class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'
        +EXPRESSION_VALIDATION+'</div></td>',

    ITSAFORM_INLINETEMPLATE = '<span class="'+ITSAFORMELEMENT_LABEL_CLASS+' '+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+'</span>'
        +'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'</span>'
        +'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+'</div>',

    ITSAFORM_TABLETEMPLATE_MERGED = '<td colspan="2"><span class="'+ITSAFORMELEMENT_LABEL_CLASS+ITSAFORMELEMENT_LABELMERGED_CLASS
        +' '+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+'</span><br />'
        +'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'</span>'
        +'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+'</div></td>',

    ITSAFORM_INLINETEMPLATE_MERGED = '<span class="'+ITSAFORMELEMENT_LABEL_CLASS+ITSAFORMELEMENT_LABELMERGED_CLASS
        +' '+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+'</span><br />'
        +'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'</span>'
        +'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+'</div>',

    ITSAFORM_TABLETEMPLATE_MERGED_NOLABEL = '<td colspan="2">'
        +'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'</span>'
        +'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+'</div></td>',

    ITSAFORM_INLINETEMPLATE_MERGED_NOLABEL = '<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'</span>'
        +'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+'</div>';

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
                    elementObject = new Y.ITSAFORMELEMENT(elementConfig);
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