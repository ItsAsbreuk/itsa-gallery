'use strict';

/**
 * ITSAFORMELEMENT
 *
 *
 * @module gallery-itsaformelement
 * @class ITSAFORMELEMENT
 * @extends Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang  = Y.Lang,
    ITSAFORMELEMENT_CLASS = 'itsaformelement',
    yClassNameManagerGetClassName = Y.ClassNameManager.getClassName,
    ITSAFORMELEMENT_ELEMENT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS),
    ITSAFORMELEMENT_VALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation'),
    ITSAFORMELEMENT_HIDDEN_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'hidden'),
    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'firstfocus'),
    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'selectall'),
    ITSAFORMELEMENT_KEYVALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'keyvalidation'),
    ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation', 'message'),
    ITSAFORMELEMENT_AUTOCORRECT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'autocorrect'),
    ITSAFORMELEMENT_LOADING_CHECKBOX_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_SELECTLIST_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_COMBOBOX_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_RADIOGROUP_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_DATETIME_CLASS = 'yui3-enabled widget-loading',
    YUI3BUTTON_CLASS = 'yui3-button',

    ELEMENT_INPUT = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TEXTAREA = '<textarea id="{id}" name="{name}"{classname} />{value}</textarea>',
    ELEMENT_PASSWORD = '<input id="{id}" type="password" name="{name}" value="{value}"{classname} />',
    ELEMENT_HIDDEN = '<input id="{id}" type="hidden" name="{name}" value="{value}"{classname} />',
    ELEMENT_BUTTON = '<input id="{id}" type="{type}" name="{name}" value="{value}"{classname} />',
    ELEMENT_VALIDATION = '<div class="'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS+' '+ITSAFORMELEMENT_HIDDEN_CLASS+'">{validation}</div>',

    ELEMENT_CHECKBOX = '<div id="{id}"{classname} /><input id="{id}_checkbox" type="checkbox" name="{name}" {checked}class="'+ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_SELECTLIST = '<div id="{id}"{classname} /><select id="{id}_selectlist" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+'" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_COMBOBOX = '<div id="{id}"{classname} /><select id="{id}_combobox" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+'" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_RADIOGROUP = '<div id="{id}"{classname} /><input id="{id}_radiogroup" type="radio" name="{name}" value="" checked="checked" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_DATETIME = '<span id="{id}"{classname} />{value}</span><div id="{id}_datetime" class="'+ITSAFORMELEMENT_LOADING_DATETIME_CLASS+'"></div>';

Y.ITSAFormElement = Y.Base.create('itsaformelement', Y.Base, [], {

        /**
         * Node's id of the created element.
         * @property id
         * @private
         * @type String
        */
        _id: '',

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            Y.log('initializer', 'cmas', 'ITSAFORMELEMENT');
            this._id = Y.guid();
        },

        /**
         * @description DOM-node where the elementNode is bound to.<br>
         * It will only return a Node when the result of getNode() has been inserted into the page by yourself.
         * Otherwise returns null.
         * Readonly
         * @attribute elementNode
         * @type Y.Node
         * @readonly
        */
        getNode : function() {
            var instance = this;
            if (!instance._domNode) {
                instance._domNode = Y.one('#'+this._id);
            }
            return instance._domNode;
        },

        /**
         * Renderes a String that contains the completeFormElement definition.<br>
         * To be used in an external Form
         * @method render
         * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
        */
        render : function() {
            var instance = this,
                element = '',
                name = instance.get('name'),
                type = instance.get('type'),
                autoCorrection = instance.get('autoCorrection'),
                validation = !autoCorrection && instance.get('validation'),
                classnameAttr = instance.get('className'),
                classname = ' class="' + ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, name)
                            + ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, type)
                            + (classnameAttr ? ' '+classnameAttr : '')
                            + (((type==='button') || (type==='submit') || (type==='reset')) ? ' '+YUI3BUTTON_CLASS : '')
                            + (instance.get('initialFocus') ? ' '+ITSAFORMELEMENT_FIRSTFOCUS_CLASS : '')
                            + (instance.get('selectOnFocus') ? ' '+ITSAFORMELEMENT_SELECTONFOCUS_CLASS : '')
                            + (instance.get('keyValidation') ? ' '+ITSAFORMELEMENT_KEYVALIDATION_CLASS : '')
                            + (validation ? ' '+ITSAFORMELEMENT_VALIDATION_CLASS : '')
                            + (autoCorrection ? ' '+ITSAFORMELEMENT_AUTOCORRECT_CLASS : '')
                            + '"';

            Y.log('renderElement', 'cmas', 'ITSAFORMELEMENT');
            if (type==='input') {
                element = ELEMENT_INPUT;
                if (validation) {
                    element += ELEMENT_VALIDATION;
                }
            }
            else if (type==='textarea') {
                element = ELEMENT_TEXTAREA;
                if (validation) {
                    element += ELEMENT_VALIDATION;
                }
            }
            else if (type==='password') {
                element = ELEMENT_PASSWORD;
                if (validation) {
                    element += ELEMENT_VALIDATION;
                }
            }
            else if (type==='hidden') {
                element = ELEMENT_HIDDEN;
            }
            else if (instance._isButton()) {
                element = ELEMENT_BUTTON;
            }
            return Lang.sub(
                            element,
                            {
                                id: instance._id,
                                name: name,
                                value: instance.get('value'),
                                classname: classname,
                                type: type,
                                validation: instance.get('validationMessage')
                            }
            );
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
        */
        hideValidation : function() {
            Y.log('hideValidation', 'cmas', 'ITSAFORMELEMENT');
            var elementNode = this.getNode();
            if (elementNode) {
                elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, true);
            }
        },

        /**
         * Shows the validationmessage
         * @method showValidation
        */
        showValidation : function() {
            Y.log('showValidation', 'cmas', 'ITSAFORMELEMENT');
            var elementNode = this.getNode();
            if (elementNode) {
                elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, false);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'cmas', 'ITSAFORMELEMENT');
        },

        //------------------------------------------------------------------------------------------------------
        // private methods
        //------------------------------------------------------------------------------------------------------

        _isButton: function() {
            Y.log('_isButton', 'cmas', 'ITSAFORMELEMENT');
            var type = this.get('type');
            return (type==='button') || (type==='submit') || (type==='reset');
        }

    }, {
        ATTRS : {
            /**
             * @description The name of the element. You always need to set this attribute. It is used by the template to render.
             * @attribute name
             * @type String
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
                             (val==='textarea') ||
                             (val==='checkbox') ||
                             (val==='radiogroup') ||
                             (val==='selectlist') ||
                             (val==='combobox') ||
                             (val==='date') ||
                             (val==='time') ||
                             (val==='datetime') ||
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
             * @attribute value
             * @type String | Boolean | Array(String)
            */
            value : {
                value: null,
                setter: function(val) {
                    var node = this.get('elementNode');
                    if (node) {
                        node.set('value', val);
                    }
                    return val;
                }
            },
            /**
             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             * the className 'itsa-formelement-keyvalidation'
             * The function MUST return true or false.
             * @attribute keyValidation
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
             * the className 'itsa-formelement-validation'.
             * The function MUST return true or false.
             * Either use validation, or autocorrection.
             * @attribute validation
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
             * @attribute validationMessage
             * @type String
            */
            validationMessage : {
                value: '',
                validator: function(val) {
                    return (Lang.isString(val));
                }
            },
            /**
             * @description If set, inputvalue will be replaced by the returnvalue of this function. <br>
             * Only has effect if the masterform knows how to use it through delegation: therefore it adds
             * the className 'itsa-formelement-autocorrect'.
             * The function MUST return a valid type for the given element.
             * Either use validation, or autocorrection.
             * @attribute autocorrection
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
             * @description Additional className that is passed on the value, during rendering.<br>
             * Only applies to rendering in tableform render(true).
             * @attribute className
             * @type String|null
            */
            className : {
                value: null,
                validator: function(val) {
                    return (Lang.isString(val) || null);
                }
            },
            /**
             * @description Determines whether this element should have the initial focus.<br>
             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).
             * @attribute initialFocus
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
             * @attribute selectOnFocus
             * @type Boolean
            */
            selectOnFocus : {
                value: false,
                validator: function(val) {
                    return (Lang.isBoolean(val));
                }
            }
        }
    }
);