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
    YArray = Y.Array,
    yDateFormat = Y.Date.format,
    ITSAFORMELEMENT_CLASS = 'itsaformelement',
    yClassNameManagerGetClassName = Y.ClassNameManager.getClassName,
    ITSAFORMELEMENT_ELEMENT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS),
    ITSAFORMELEMENT_VALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation'),
    ITSAFORMELEMENT_HIDDEN_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'hidden'),
    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'firstfocus'),
    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'selectall'),
    ITSAFORMELEMENT_KEYVALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'keyvalidation'),
    ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validationmessage'),
    ITSAFORMELEMENT_AUTOCORRECT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'autocorrect'),
    ITSAFORMELEMENT_LOADING_CHECKBOX_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_SELECTLIST_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_COMBOBOX_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_RADIOGROUP_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_INLINEBUTTON_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'inlinebutton'),
    YUI3BUTTON_CLASS = 'yui3-button',
    YUI3BUTTON_DATETIME_CLASS = 'yui3-button-datetime',
    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',
    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',
    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',

    ELEMENT_INPUT = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TEXTAREA = '<textarea id="{id}" name="{name}"{classname} />{value}</textarea>',
    ELEMENT_PASSWORD = '<input id="{id}" type="password" name="{name}" value="{value}"{classname} />',
    ELEMENT_HIDDEN = '<input id="{id}" type="hidden" name="{name}" value="{value}"{classname} />',
    ELEMENT_BUTTON = '<input id="{id}" type="{type}" name="{name}" value="{value}"{classname} />',
    ELEMENT_VALIDATION = '<div class="'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS+' '+ITSAFORMELEMENT_HIDDEN_CLASS+'">{validation}</div>',

    ELEMENT_CHECKBOX = '<div id="{id}"{classname} /><input id="{id}_checkbox" type="checkbox" name="{name}" {checked}class="'+
                       ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_SELECTLIST = '<div id="{id}"{classname} /><select id="{id}_selectlist" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+
                          '" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_COMBOBOX = '<div id="{id}"{classname} /><select id="{id}_combobox" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+
                        '" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_RADIOGROUP = '<div id="{id}"{classname} /><input id="{id}_radiogroup" type="radio" name="{name}" value="" checked="checked" class="'+
                         ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_DATE = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+YUI3BUTTON_DATETIME_CLASS+
                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'"><span class="'+ITSAFORMELEMENT_DATE_CLASS+'"></span></button>',
    ELEMENT_TIME = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+YUI3BUTTON_DATETIME_CLASS+
                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'"><span class="'+ITSAFORMELEMENT_TIME_CLASS+'"></span></button>',
    ELEMENT_DATETIME = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+
                       YUI3BUTTON_DATETIME_CLASS+' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'"><span class="'+ITSAFORMELEMENT_DATETIME_CLASS+
                       '"></span></button>',

    ELEMENT_AUTOCOMPLETE = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TOKENINPUT = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TOKENAUTOCOMPLETE = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />';

Y.ITSAFormElement = Y.Base.create('itsaformelement', Y.Base, [], {

        /**
         * Node's id of the created element.
         * @property id
         * @private
         * @type String
        */
        _id: '',
        _eventhandlers : [],
        _typechangeHandler : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
            var instance = this;

            Y.log('initializer', 'cmas', 'ITSAFORMELEMENT');
            instance._id = Y.guid();
            instance._bindUI();
            instance._typechangeHandler = instance.after('typeChange', instance._bindUI, instance);
        },

        /**
         * DOM-node where the elementNode is bound to.<br>
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
                value = instance.get('value'),
                dateFormat = instance.get('dateFormat'),
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
            else if (instance._isButton()) {
                element = ELEMENT_BUTTON;
            }
            else if (type==='checkbox') {
                element = ELEMENT_CHECKBOX;
            }
            else if (type==='radiogroup') {
                element = ELEMENT_RADIOGROUP;
            }
            else if (type==='selectlist') {
                element = ELEMENT_SELECTLIST;
            }
            else if (type==='combobox') {
                element = ELEMENT_COMBOBOX;
            }
            else if (type==='date') {
                element = ELEMENT_DATE;
                dateFormat = dateFormat || '%x';
                value = yDateFormat(value, {format: dateFormat});
            }
            else if (type==='time') {
                element = ELEMENT_TIME;
                dateFormat = dateFormat || '%X';
                value = yDateFormat(value, {format: dateFormat});
            }
            else if (type==='datetime') {
                element = ELEMENT_DATETIME;
                dateFormat = dateFormat || '%x %X';
                value = yDateFormat(value, {format: dateFormat});
            }
            else if (type==='autocomplete') {
                element = ELEMENT_AUTOCOMPLETE;
            }
            else if (type==='tokeninput') {
                element = ELEMENT_TOKENINPUT;
            }
            else if (type==='tokenautocomplete') {
                element = ELEMENT_TOKENAUTOCOMPLETE;
            }
            else if (type==='hidden') {
                element = ELEMENT_HIDDEN;
            }
            return Lang.sub(
                            element,
                            {
                                id: instance._id,
                                name: name,
                                value: value,
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
            var instance = this;

            Y.log('destructor', 'cmas', 'ITSAFORMELEMENT');
            if (instance._typechangeHandler) {
                instance._typechangeHandler.detach();
            }
            instance._clearEventhandlers();
        },

        //------------------------------------------------------------------------------------------------------
        // private methods
        //------------------------------------------------------------------------------------------------------

        _bindUI : function() {
            var instance = this;

            Y.log('_bindUI', 'cmas', 'ITSAFORMELEMENT');
            if (instance._isDateTime()) {
                Y.use('gallery-itsadatetimepicker', function(Y) {
                    instance._eventhandlers.push(
                        Y.one('body').delegate(
                            'click',
                            function(e) {
                                var button = e.currentTarget,
                                    span = button.one('span'),
                                    picker = Y.ItsaDateTimePicker,
                                    promise;
                                if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {
                                    promise = picker.getDate;
                                }
                                else if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {
                                    promise = picker.getTime;
                                }
                                else if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {
                                    promise = picker.getDateTime;
                                }
                                promise.then(
                                    function(newdate) {
alert(newdate);
                                    }
                                );
                            },
                            '.'+ITSAFORMELEMENT_INLINEBUTTON_CLASS
                        )
                    );
                });
            }
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
        */
        _clearEventhandlers : function() {
            var eventhandlers = this._eventhandlers;

            Y.log('_clearEventhandlers', 'info', 'ITSAFORMELEMENT');
            YArray.each(
                eventhandlers,
                function(item){
                    item.detach();
                }
            );
            eventhandlers.length = 0;
        },

        _isButton: function() {
            Y.log('_isButton', 'cmas', 'ITSAFORMELEMENT');
            var type = this.get('type');
            return (type==='button') || (type==='submit') || (type==='reset');
        },

        _isDateTime : function() {
            Y.log('_isDateTime', 'cmas', 'ITSAFORMELEMENT');
            var type = this.get('type');
            return (type==='date') || (type==='time') || (type==='datetime');
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
                             (val==='checkbox') ||  // not ready yet
//                             (val==='radiogroup') ||  // not ready yet
//                             (val==='selectlist') ||  // not ready yet
//                             (val==='combobox') ||  // not ready yet
                             (val==='date') ||
                             (val==='time') ||
                             (val==='datetime') ||
                             (val==='button') ||
                             (val==='reset') ||
                             (val==='submit') ||
//                             (val==='autocomplete') ||  // not ready yet
//                             (val==='tokeninput') ||  // not ready yet
//                             (val==='tokenautocomplete') ||  // not ready yet
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
                value: '',
                setter: function(val) {
                    var node = this.get('elementNode');
                    if (node) {
                        node.set('value', val);
                    }
                    return val;
                },
                validator: function(val) {
                    return (Lang.isString(val) || Lang.isBoolean(val) || Lang.isArray(val) || Lang.isDate(val));
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
             * @description To format the value<br>
             * Only applies for Date-types (attribute type).
             * @attribute className
             * @type String|null
            */
            dateFormat : {
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