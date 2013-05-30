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
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaformelement/gallery-itsaformelement.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"].code=["YUI.add('gallery-itsaformelement', function (Y, NAME) {","","'use strict';","","/**"," * Class ITSAFormElement"," *"," * Basic Class that should not be used of its own: purely made for ITSAEditModel to use."," *"," *"," * @module gallery-itsaformelement"," * @class ITSAFormElement"," * @extends Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang  = Y.Lang,","    yDateFormat = Y.Date.format,","    ITSAFORMELEMENT_FOCUSABLE_CLASS = 'focusable',","    ITSAFORMELEMENT_CLASS = 'itsaformelement',","    yClassNameManagerGetClassName = Y.ClassNameManager.getClassName,","    ITSAFORMELEMENT_ELEMENT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS),","    ITSAFORMELEMENT_VALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation'),","    ITSAFORMELEMENT_HIDDEN_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'hidden'),","    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'firstfocus'),","    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'selectall'),","    ITSAFORMELEMENT_KEYVALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'keyvalidation'),","    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'enternextfield'),","    ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validationmessage'),","    ITSAFORMELEMENT_AUTOCORRECT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'autocorrect'),","    ITSAFORMELEMENT_LIFECHANGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'lifechange'),","/*","    ITSAFORMELEMENT_LOADING_CHECKBOX_CLASS = 'yui3-enabled widget-loading',","    ITSAFORMELEMENT_LOADING_SELECTLIST_CLASS = 'yui3-enabled widget-loading',","    ITSAFORMELEMENT_LOADING_COMBO_CLASS = 'yui3-enabled widget-loading',","    ITSAFORMELEMENT_LOADING_RADIOGROUP_CLASS = 'yui3-enabled widget-loading',","*/","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'button'),","    ITSAFORMELEMENT_INLINEBUTTON_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'inlinebutton'),","    YUI3BUTTON_CLASS = 'yui3-button',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',","    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',","    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',","","    ELEMENT_UNDEFINED = '<span id=\"{id}\">UNDEFINED ELEMENTTYPE</span>',","    ELEMENT_INPUT = '<input id=\"{id}\" type=\"text\" name=\"{name}\" value=\"{value}\"{classname}{placeholder} />',","    ELEMENT_PASSWORD = '<input id=\"{id}\" type=\"password\" name=\"{name}\" value=\"{value}\"{classname}{placeholder} />',","    ELEMENT_TEXTAREA = '<textarea id=\"{id}\" name=\"{name}\"{classname} />{value}</textarea>',","    ELEMENT_HIDDEN = '<input id=\"{id}\" type=\"hidden\" name=\"{name}\" value=\"{value}\"{classname} />',","","    ELEMENT_BUTTON = '<button id=\"{id}\" type=\"{type}\" name=\"{name}\"{classname}>{value}</button>',","","    ELEMENT_VALIDATION = '<div class=\"'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS+' '+ITSAFORMELEMENT_HIDDEN_CLASS+'\">{validation}</div>',","","    ELEMENT_CHECKBOX = '<div id=\"{id}\"{classname} /><input id=\"{id}_checkbox\" type=\"checkbox\" name=\"{name}\" {checked}class=\"'+","                       ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + ITSAFORMELEMENT_HIDDEN_CLASS+'\" /></div>',","    ELEMENT_SELECTLIST = '<div id=\"{id}\"{classname} /><select id=\"{id}_selectlist\" name=\"{name}\" class=\"'+ITSAFORMELEMENT_HIDDEN_CLASS+","                         ' ' + ITSAFORMELEMENT_ELEMENT_CLASS + '\" /><option value=\"\" selected=\"selected\"></option></select></div>',","    ELEMENT_COMBO = '<div id=\"{id}\"{classname} /><select id=\"{id}_combo\" name=\"{name}\" class=\"'+ITSAFORMELEMENT_HIDDEN_CLASS+","                    ' ' + ITSAFORMELEMENT_ELEMENT_CLASS + '\" /><option value=\"\" selected=\"selected\"></option></select></div>',","    ELEMENT_RADIOGROUP = '<div id=\"{id}\"{classname} /><input id=\"{id}_radiogroup\" type=\"radio\" name=\"{name}\" value=\"\" checked=\"checked\" class=\"'+","                         ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + ITSAFORMELEMENT_HIDDEN_CLASS+'\" /></div>',","    ELEMENT_DATE = '<span id=\"{id}\"{classname} />{value}</span><button id=\"{id}_datetime\" class=\"'+YUI3BUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+","                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}\"\"><span class=\"'+ITSAFORMELEMENT_DATE_CLASS+'\"></span></button>',","    ELEMENT_TIME = '<span id=\"{id}\"{classname} />{value}</span><button id=\"{id}_datetime\" class=\"'+YUI3BUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+","                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}\"><span class=\"'+ITSAFORMELEMENT_TIME_CLASS+'\"></span></button>',","    ELEMENT_DATETIME = '<span id=\"{id}\"{classname} />{value}</span><button id=\"{id}_datetime\" class=\"'+YUI3BUTTON_CLASS+' '+","                       ITSABUTTON_DATETIME_CLASS+' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}\"><span class=\"'+ITSAFORMELEMENT_DATETIME_CLASS+","                       '\"></span></button>',","","    ELEMENT_AUTOCOMPLETE = '<input id=\"{id}\" type=\"text\" name=\"{name}\" value=\"{value}\"{classname} />',","    ELEMENT_TOKENINPUT = '<input id=\"{id}\" type=\"text\" name=\"{name}\" value=\"{value}\"{classname} />',","    ELEMENT_TOKENAUTOCOMPLETE = '<input id=\"{id}\" type=\"text\" name=\"{name}\" value=\"{value}\"{classname} />';","","Y.ITSAFormElement = Y.Base.create('itsaformelement', Y.Base, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","        */","        initializer : function() {","        },","","        /**","         * Renderes a String that contains the completeFormElement definition.<br>","         * To be used in an external Form","         * @method render","         * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.","         * @param nodeId {String} The unique id of the node","         * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM","        */","        render : function(config, nodeId) {","            var instance = this,","                element, name, type, value, dateFormat, autoCorrection, validation, classnameAttr, classname, isDateOrTime,","                focusable, isButton, withLifeChange, classlevel2, focusinfoOnClass, focusinfo, enterNextField, placeholder, placeholdervalue;","","            if (typeof config === 'object') {","                instance.setAttrs(config);","            }","            name = instance.get('name');","            type = instance.get('type');","            value = instance.get('value');","            dateFormat = instance.get('dateFormat');","            autoCorrection = instance.get('autoCorrection');","            validation = !autoCorrection && instance.get('validation');","            enterNextField = (type==='input') || (type==='password');","            isDateOrTime = (type==='date') || (type==='time') || (type==='datetime');","            isButton = (type==='button') || (type==='submit') || (type==='reset') || (type==='save') ||","                       (type==='add') || (type==='destroy') || (type==='stopedit');","            focusable = instance.get('focusable');","            focusinfoOnClass = ((type==='input') || (type==='textarea') || (type==='password') || isButton);","            focusinfo = focusable ?","                        (","                            ITSAFORMELEMENT_FOCUSABLE_CLASS +","                            (instance.get('initialFocus') ? ' '+ITSAFORMELEMENT_FIRSTFOCUS_CLASS : '') +","                            (instance.get('selectOnFocus') ? ' '+ITSAFORMELEMENT_SELECTONFOCUS_CLASS : '')","                        )","                        : '';","            withLifeChange = (type==='input') || (type==='textarea') || (type==='password');","            classnameAttr = instance.get('className');","            classname = ' class=\"' + ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'property', name) +","                        ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, type) +","                        (classnameAttr ? ' '+classnameAttr : '') +","                        (enterNextField ? ' '+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS : '') +","                        (isButton ? ' '+YUI3BUTTON_CLASS+' '+ITSAFORMELEMENT_BUTTONTYPE_CLASS : '') +","                        (withLifeChange ? ' '+ITSAFORMELEMENT_LIFECHANGE_CLASS : '') +","                        (instance.get('keyValidation') ? ' '+ITSAFORMELEMENT_KEYVALIDATION_CLASS : '') +","                        (validation ? ' '+ITSAFORMELEMENT_VALIDATION_CLASS : '') +","                        (autoCorrection ? ' '+ITSAFORMELEMENT_AUTOCORRECT_CLASS : '') +","                        (focusinfoOnClass ? ' '+focusinfo : '') +","                        '\"';","            classlevel2 = focusinfoOnClass ? '' : ' '+focusinfo;","            if (type==='input') {","                element = ELEMENT_INPUT;","                if (validation) {","                    element += ELEMENT_VALIDATION;","                }","                placeholdervalue = instance.get('placeholder');","                placeholder = placeholdervalue ? ' placeholder=\"'+  placeholdervalue+'\"' : '';","            }","            else if (type==='password') {","                element = ELEMENT_PASSWORD;","                if (validation) {","                    element += ELEMENT_VALIDATION;","                }","                placeholdervalue = instance.get('placeholder');","                placeholder = placeholdervalue ? ' placeholder=\"'+  placeholdervalue+'\"' : '';","            }","            else if (type==='textarea') {","                element = ELEMENT_TEXTAREA;","                if (validation) {","                    element += ELEMENT_VALIDATION;","                }","            }","            else if (isButton) {","                type = 'button';","                element = ELEMENT_BUTTON;","            }","            else if (type==='checkbox') {","                element = ELEMENT_CHECKBOX;","            }","            else if (type==='radiogroup') {","                element = ELEMENT_RADIOGROUP;","            }","            else if (type==='selectlist') {","                element = ELEMENT_SELECTLIST;","            }","            else if (type==='combo') {","                element = ELEMENT_COMBO;","            }","            else if (type==='date') {","                element = ELEMENT_DATE;","                dateFormat = dateFormat || '%x';","            }","            else if (type==='time') {","                element = ELEMENT_TIME;","                dateFormat = dateFormat || '%X';","            }","            else if (type==='datetime') {","                element = ELEMENT_DATETIME;","                dateFormat = dateFormat || '%x %X';","            }","            else if (type==='autocomplete') {","                element = ELEMENT_AUTOCOMPLETE;","            }","            else if (type==='tokeninput') {","                element = ELEMENT_TOKENINPUT;","            }","            else if (type==='tokenautocomplete') {","                element = ELEMENT_TOKENAUTOCOMPLETE;","            }","            else if (type==='hidden') {","                element = ELEMENT_HIDDEN;","            }","            else {","                element = ELEMENT_UNDEFINED;","            }","            if (isDateOrTime) {","                value = yDateFormat(value, {format: dateFormat});","                // asynchronious preloading the module","                Y.use('gallery-itsadatetimepicker');","            }","            return Lang.sub(","                            element,","                            {","                                id: nodeId,","                                name: name,","                                value: value,","                                placeholder: placeholder,","                                classname: classname,","                                classlevel2: classlevel2,","                                type: type,","                                validation: instance.get('validationMessage')","                            }","            );","        },","","        /**","         * Hides the validationmessage","         * @method hideValidation","         * @param nodeId {String} Node's id","        */","        hideValidation : function(nodeId) {","            var elementNode = Y.one('#' + nodeId);","            if (elementNode) {","                elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, true);","            }","        },","","        /**","         * Shows the validationmessage","         * @method showValidation","         * @param nodeId {String} Node's id","        */","        showValidation : function(nodeId) {","            var elementNode = Y.one('#' + nodeId);","            if (elementNode) {","                elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, false);","            }","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor : function() {","        }","","    }, {","        ATTRS : {","            /**","             * @description The name of the element. You always need to set this attribute. It is used by the template to render.","             * @attribute name","             * @type String","             * @default 'undefined-name'","             * @since 0.1","            */","            name : {","                value: 'undefined-name',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description Whether the element is focusable","             * @attribute focusable","             * @type Boolean","             * @default true","             * @since 0.1","            */","            focusable : {","                value: true,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description Must have one of the following values:","             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>","             * @attribute type","             * @type String","             * @default ''","             * @since 0.1","            */","            type : {","                value: '',","                setter: function(val) {","                    if (Lang.isString(val)) {val=val.toLowerCase();}","                    return val;","                },","                validator: function(val) {","                    return (Lang.isString(val) &&","                            ((val==='input') ||","                             (val==='password') ||","                             (val==='textarea') ||","//                             (val==='checkbox') ||  // not ready yet","//                             (val==='radiogroup') ||  // not ready yet","//                             (val==='selectlist') ||  // not ready yet","//                             (val==='combo') ||  // not ready yet","                             (val==='date') ||","                             (val==='time') ||","                             (val==='datetime') ||","","                             (val==='button') ||","                             (val==='reset') ||","                             (val==='submit') ||","                             (val==='save') ||","                             (val==='add') ||","                             (val==='destroy') ||","                             (val==='stopedit') ||","//                             (val==='autocomplete') ||  // not ready yet","//                             (val==='tokeninput') ||  // not ready yet","//                             (val==='tokenautocomplete') ||  // not ready yet","                             (val==='hidden')","                            )","                    );","                }","            },","            /**","             * @description The value of the element","             * @attribute value","             * @type String | Boolean | Array(String)","             * @default ''","             * @since 0.1","            */","            value : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val) || Lang.isBoolean(val) || Lang.isArray(val) || Lang.isDate(val));","                }","            },","            /**","             * @description Validation during every keypress. The function that is passed will receive the keyevent, that can thus be prevented.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds","             * the className 'itsa-formelement-keyvalidation'","             * The function MUST return true or false.","             * @attribute keyValidation","             * @type Function","             * @default null","             * @since 0.1","            */","            keyValidation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Validation after changing the value (onblur). The function should return true or false.","             * In case of false, the validationerror is thrown.<br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds","             * the className 'itsa-formelement-validation'.","             * The function MUST return true or false.","             * Either use validation, or autocorrection.","             * @attribute validation","             * @type Function","             * @default null","             * @since 0.1","            */","            validation : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description The message that will be returned on a validationerror, this will be set within e.message.","             * @attribute validationMessage","             * @type String","             * @default ''","             * @since 0.1","            */","            validationMessage : {","                value: '',","                validator: function(val) {","                    return (Lang.isString(val));","                }","            },","            /**","             * @description If set, inputvalue will be replaced by the returnvalue of this function. <br>","             * Only has effect if the masterform knows how to use it through delegation: therefore it adds","             * the className 'itsa-formelement-autocorrect'.","             * The function MUST return a valid type for the given element.","             * Either use validation, or autocorrection.","             * @attribute autocorrection","             * @type Function","             * @return Boolean","             * @default null","             * @since 0.1","            */","            autoCorrection : {","                value: null,","                validator: function(val) {","                    return (Lang.isFunction(val));","                }","            },","            /**","             * @description Additional className that is passed on the value, during rendering.<br>","             * Only applies to rendering in tableform render(true).","             * @attribute className","             * @type String|null","             * @default null","             * @since 0.1","            */","            className : {","                value: null,","                validator: function(val) {","                    return (Lang.isString(val) || null);","                }","            },","            /**","             * @description To format the value<br>","             * Only applies for Date-types (attribute type).","             * @attribute dateFormat","             * @type String|null","             * @default null","             * @since 0.1","            */","            dateFormat : {","                value: null,","                validator: function(val) {","                    return (Lang.isString(val) || null);","                }","            },","            /**","             * @description Determines whether this element should have the initial focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).","             * @attribute initialFocus","             * @type Boolean","             * @default false","             * @since 0.1","            */","            initialFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description Determines whether this element should completely be selected when it gets focus.<br>","             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).","             * @attribute selectOnFocus","             * @type Boolean","             * @default false","             * @since 0.1","            */","            selectOnFocus : {","                value: false,","                validator: function(val) {","                    return (Lang.isBoolean(val));","                }","            },","            /**","             * @description config that will be added to the underlying widget (in case of Date/Time values)","             * @attribute widgetConfig","             * @type Object","             * @default {}","             * @since 0.1","             */","            widgetConfig : {","                value: {},","                validator: function(val) {","                    return (Lang.isObject(val));","                }","            }","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base\",","        \"node-core\",","        \"node-base\",","        \"datatype-date-format\",","        \"classnamemanager\",","        \"cssbutton\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"].lines = {"1":0,"3":0,"22":0,"81":0,"101":0,"105":0,"106":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"118":0,"119":0,"120":0,"127":0,"128":0,"129":0,"140":0,"141":0,"142":0,"143":0,"144":0,"146":0,"147":0,"149":0,"150":0,"151":0,"152":0,"154":0,"155":0,"157":0,"158":0,"159":0,"160":0,"163":0,"164":0,"165":0,"167":0,"168":0,"170":0,"171":0,"173":0,"174":0,"176":0,"177":0,"179":0,"180":0,"181":0,"183":0,"184":0,"185":0,"187":0,"188":0,"189":0,"191":0,"192":0,"194":0,"195":0,"197":0,"198":0,"200":0,"201":0,"204":0,"206":0,"207":0,"209":0,"211":0,"232":0,"233":0,"234":0,"244":0,"245":0,"246":0,"270":0,"283":0,"297":0,"298":0,"301":0,"338":0,"354":0,"372":0,"385":0,"403":0,"417":0,"431":0,"445":0,"459":0,"472":0};
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"].functions = {"render:100":0,"hideValidation:231":0,"showValidation:243":0,"validator:269":0,"validator:282":0,"setter:296":0,"validator:300":0,"validator:337":0,"validator:353":0,"validator:371":0,"validator:384":0,"validator:402":0,"validator:416":0,"validator:430":0,"validator:444":0,"validator:458":0,"validator:471":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"].coveredLines = 93;
_yuitest_coverage["build/gallery-itsaformelement/gallery-itsaformelement.js"].coveredFunctions = 18;
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 1);
YUI.add('gallery-itsaformelement', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 3);
'use strict';

/**
 * Class ITSAFormElement
 *
 * Basic Class that should not be used of its own: purely made for ITSAEditModel to use.
 *
 *
 * @module gallery-itsaformelement
 * @class ITSAFormElement
 * @extends Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 22);
var Lang  = Y.Lang,
    yDateFormat = Y.Date.format,
    ITSAFORMELEMENT_FOCUSABLE_CLASS = 'focusable',
    ITSAFORMELEMENT_CLASS = 'itsaformelement',
    yClassNameManagerGetClassName = Y.ClassNameManager.getClassName,
    ITSAFORMELEMENT_ELEMENT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS),
    ITSAFORMELEMENT_VALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validation'),
    ITSAFORMELEMENT_HIDDEN_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'hidden'),
    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'firstfocus'),
    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'selectall'),
    ITSAFORMELEMENT_KEYVALIDATION_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'keyvalidation'),
    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'enternextfield'),
    ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'validationmessage'),
    ITSAFORMELEMENT_AUTOCORRECT_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'autocorrect'),
    ITSAFORMELEMENT_LIFECHANGE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'lifechange'),
/*
    ITSAFORMELEMENT_LOADING_CHECKBOX_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_SELECTLIST_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_COMBO_CLASS = 'yui3-enabled widget-loading',
    ITSAFORMELEMENT_LOADING_RADIOGROUP_CLASS = 'yui3-enabled widget-loading',
*/
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'button'),
    ITSAFORMELEMENT_INLINEBUTTON_CLASS = yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'inlinebutton'),
    YUI3BUTTON_CLASS = 'yui3-button',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',
    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',
    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',

    ELEMENT_UNDEFINED = '<span id="{id}">UNDEFINED ELEMENTTYPE</span>',
    ELEMENT_INPUT = '<input id="{id}" type="text" name="{name}" value="{value}"{classname}{placeholder} />',
    ELEMENT_PASSWORD = '<input id="{id}" type="password" name="{name}" value="{value}"{classname}{placeholder} />',
    ELEMENT_TEXTAREA = '<textarea id="{id}" name="{name}"{classname} />{value}</textarea>',
    ELEMENT_HIDDEN = '<input id="{id}" type="hidden" name="{name}" value="{value}"{classname} />',

    ELEMENT_BUTTON = '<button id="{id}" type="{type}" name="{name}"{classname}>{value}</button>',

    ELEMENT_VALIDATION = '<div class="'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS+' '+ITSAFORMELEMENT_HIDDEN_CLASS+'">{validation}</div>',

    ELEMENT_CHECKBOX = '<div id="{id}"{classname} /><input id="{id}_checkbox" type="checkbox" name="{name}" {checked}class="'+
                       ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_SELECTLIST = '<div id="{id}"{classname} /><select id="{id}_selectlist" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+
                         ' ' + ITSAFORMELEMENT_ELEMENT_CLASS + '" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_COMBO = '<div id="{id}"{classname} /><select id="{id}_combo" name="{name}" class="'+ITSAFORMELEMENT_HIDDEN_CLASS+
                    ' ' + ITSAFORMELEMENT_ELEMENT_CLASS + '" /><option value="" selected="selected"></option></select></div>',
    ELEMENT_RADIOGROUP = '<div id="{id}"{classname} /><input id="{id}_radiogroup" type="radio" name="{name}" value="" checked="checked" class="'+
                         ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + ITSAFORMELEMENT_HIDDEN_CLASS+'" /></div>',
    ELEMENT_DATE = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+
                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}""><span class="'+ITSAFORMELEMENT_DATE_CLASS+'"></span></button>',
    ELEMENT_TIME = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+
                   ' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}"><span class="'+ITSAFORMELEMENT_TIME_CLASS+'"></span></button>',
    ELEMENT_DATETIME = '<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+YUI3BUTTON_CLASS+' '+
                       ITSABUTTON_DATETIME_CLASS+' '+ITSAFORMELEMENT_INLINEBUTTON_CLASS+'{classlevel2}"><span class="'+ITSAFORMELEMENT_DATETIME_CLASS+
                       '"></span></button>',

    ELEMENT_AUTOCOMPLETE = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TOKENINPUT = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',
    ELEMENT_TOKENAUTOCOMPLETE = '<input id="{id}" type="text" name="{name}" value="{value}"{classname} />';

_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 81);
Y.ITSAFormElement = Y.Base.create('itsaformelement', Y.Base, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
        */
        initializer : function() {
        },

        /**
         * Renderes a String that contains the completeFormElement definition.<br>
         * To be used in an external Form
         * @method render
         * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
         * @param nodeId {String} The unique id of the node
         * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
        */
        render : function(config, nodeId) {
            _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "render", 100);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 101);
var instance = this,
                element, name, type, value, dateFormat, autoCorrection, validation, classnameAttr, classname, isDateOrTime,
                focusable, isButton, withLifeChange, classlevel2, focusinfoOnClass, focusinfo, enterNextField, placeholder, placeholdervalue;

            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 105);
if (typeof config === 'object') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 106);
instance.setAttrs(config);
            }
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 108);
name = instance.get('name');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 109);
type = instance.get('type');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 110);
value = instance.get('value');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 111);
dateFormat = instance.get('dateFormat');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 112);
autoCorrection = instance.get('autoCorrection');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 113);
validation = !autoCorrection && instance.get('validation');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 114);
enterNextField = (type==='input') || (type==='password');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 115);
isDateOrTime = (type==='date') || (type==='time') || (type==='datetime');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 116);
isButton = (type==='button') || (type==='submit') || (type==='reset') || (type==='save') ||
                       (type==='add') || (type==='destroy') || (type==='stopedit');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 118);
focusable = instance.get('focusable');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 119);
focusinfoOnClass = ((type==='input') || (type==='textarea') || (type==='password') || isButton);
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 120);
focusinfo = focusable ?
                        (
                            ITSAFORMELEMENT_FOCUSABLE_CLASS +
                            (instance.get('initialFocus') ? ' '+ITSAFORMELEMENT_FIRSTFOCUS_CLASS : '') +
                            (instance.get('selectOnFocus') ? ' '+ITSAFORMELEMENT_SELECTONFOCUS_CLASS : '')
                        )
                        : '';
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 127);
withLifeChange = (type==='input') || (type==='textarea') || (type==='password');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 128);
classnameAttr = instance.get('className');
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 129);
classname = ' class="' + ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'property', name) +
                        ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, type) +
                        (classnameAttr ? ' '+classnameAttr : '') +
                        (enterNextField ? ' '+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS : '') +
                        (isButton ? ' '+YUI3BUTTON_CLASS+' '+ITSAFORMELEMENT_BUTTONTYPE_CLASS : '') +
                        (withLifeChange ? ' '+ITSAFORMELEMENT_LIFECHANGE_CLASS : '') +
                        (instance.get('keyValidation') ? ' '+ITSAFORMELEMENT_KEYVALIDATION_CLASS : '') +
                        (validation ? ' '+ITSAFORMELEMENT_VALIDATION_CLASS : '') +
                        (autoCorrection ? ' '+ITSAFORMELEMENT_AUTOCORRECT_CLASS : '') +
                        (focusinfoOnClass ? ' '+focusinfo : '') +
                        '"';
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 140);
classlevel2 = focusinfoOnClass ? '' : ' '+focusinfo;
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 141);
if (type==='input') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 142);
element = ELEMENT_INPUT;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 143);
if (validation) {
                    _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 144);
element += ELEMENT_VALIDATION;
                }
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 146);
placeholdervalue = instance.get('placeholder');
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 147);
placeholder = placeholdervalue ? ' placeholder="'+  placeholdervalue+'"' : '';
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 149);
if (type==='password') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 150);
element = ELEMENT_PASSWORD;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 151);
if (validation) {
                    _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 152);
element += ELEMENT_VALIDATION;
                }
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 154);
placeholdervalue = instance.get('placeholder');
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 155);
placeholder = placeholdervalue ? ' placeholder="'+  placeholdervalue+'"' : '';
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 157);
if (type==='textarea') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 158);
element = ELEMENT_TEXTAREA;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 159);
if (validation) {
                    _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 160);
element += ELEMENT_VALIDATION;
                }
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 163);
if (isButton) {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 164);
type = 'button';
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 165);
element = ELEMENT_BUTTON;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 167);
if (type==='checkbox') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 168);
element = ELEMENT_CHECKBOX;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 170);
if (type==='radiogroup') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 171);
element = ELEMENT_RADIOGROUP;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 173);
if (type==='selectlist') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 174);
element = ELEMENT_SELECTLIST;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 176);
if (type==='combo') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 177);
element = ELEMENT_COMBO;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 179);
if (type==='date') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 180);
element = ELEMENT_DATE;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 181);
dateFormat = dateFormat || '%x';
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 183);
if (type==='time') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 184);
element = ELEMENT_TIME;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 185);
dateFormat = dateFormat || '%X';
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 187);
if (type==='datetime') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 188);
element = ELEMENT_DATETIME;
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 189);
dateFormat = dateFormat || '%x %X';
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 191);
if (type==='autocomplete') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 192);
element = ELEMENT_AUTOCOMPLETE;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 194);
if (type==='tokeninput') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 195);
element = ELEMENT_TOKENINPUT;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 197);
if (type==='tokenautocomplete') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 198);
element = ELEMENT_TOKENAUTOCOMPLETE;
            }
            else {_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 200);
if (type==='hidden') {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 201);
element = ELEMENT_HIDDEN;
            }
            else {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 204);
element = ELEMENT_UNDEFINED;
            }}}}}}}}}}}}}}}
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 206);
if (isDateOrTime) {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 207);
value = yDateFormat(value, {format: dateFormat});
                // asynchronious preloading the module
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 209);
Y.use('gallery-itsadatetimepicker');
            }
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 211);
return Lang.sub(
                            element,
                            {
                                id: nodeId,
                                name: name,
                                value: value,
                                placeholder: placeholder,
                                classname: classname,
                                classlevel2: classlevel2,
                                type: type,
                                validation: instance.get('validationMessage')
                            }
            );
        },

        /**
         * Hides the validationmessage
         * @method hideValidation
         * @param nodeId {String} Node's id
        */
        hideValidation : function(nodeId) {
            _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "hideValidation", 231);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 232);
var elementNode = Y.one('#' + nodeId);
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 233);
if (elementNode) {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 234);
elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, true);
            }
        },

        /**
         * Shows the validationmessage
         * @method showValidation
         * @param nodeId {String} Node's id
        */
        showValidation : function(nodeId) {
            _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "showValidation", 243);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 244);
var elementNode = Y.one('#' + nodeId);
            _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 245);
if (elementNode) {
                _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 246);
elementNode.get('parentNode').one('.'+ITSAFORMELEMENT_VALIDATION_MESSAGE_CLASS).toggleClass(ITSAFORMELEMENT_HIDDEN_CLASS, false);
            }
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
        }

    }, {
        ATTRS : {
            /**
             * @description The name of the element. You always need to set this attribute. It is used by the template to render.
             * @attribute name
             * @type String
             * @default 'undefined-name'
             * @since 0.1
            */
            name : {
                value: 'undefined-name',
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 269);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 270);
return (Lang.isString(val));
                }
            },
            /**
             * @description Whether the element is focusable
             * @attribute focusable
             * @type Boolean
             * @default true
             * @since 0.1
            */
            focusable : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 282);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 283);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description Must have one of the following values:
             * <ul><li>input</li><li>password</li><li>textarea</li><li>checkbox</li><li>radiogroup</li><li>selectbox</li><li>hidden</li></ul>
             * @attribute type
             * @type String
             * @default ''
             * @since 0.1
            */
            type : {
                value: '',
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "setter", 296);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 297);
if (Lang.isString(val)) {val=val.toLowerCase();}
                    _yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 298);
return val;
                },
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 300);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 301);
return (Lang.isString(val) &&
                            ((val==='input') ||
                             (val==='password') ||
                             (val==='textarea') ||
//                             (val==='checkbox') ||  // not ready yet
//                             (val==='radiogroup') ||  // not ready yet
//                             (val==='selectlist') ||  // not ready yet
//                             (val==='combo') ||  // not ready yet
                             (val==='date') ||
                             (val==='time') ||
                             (val==='datetime') ||

                             (val==='button') ||
                             (val==='reset') ||
                             (val==='submit') ||
                             (val==='save') ||
                             (val==='add') ||
                             (val==='destroy') ||
                             (val==='stopedit') ||
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
             * @default ''
             * @since 0.1
            */
            value : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 337);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 338);
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
             * @default null
             * @since 0.1
            */
            keyValidation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 353);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 354);
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
             * @default null
             * @since 0.1
            */
            validation : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 371);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 372);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description The message that will be returned on a validationerror, this will be set within e.message.
             * @attribute validationMessage
             * @type String
             * @default ''
             * @since 0.1
            */
            validationMessage : {
                value: '',
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 384);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 385);
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
             * @default null
             * @since 0.1
            */
            autoCorrection : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 402);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 403);
return (Lang.isFunction(val));
                }
            },
            /**
             * @description Additional className that is passed on the value, during rendering.<br>
             * Only applies to rendering in tableform render(true).
             * @attribute className
             * @type String|null
             * @default null
             * @since 0.1
            */
            className : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 416);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 417);
return (Lang.isString(val) || null);
                }
            },
            /**
             * @description To format the value<br>
             * Only applies for Date-types (attribute type).
             * @attribute dateFormat
             * @type String|null
             * @default null
             * @since 0.1
            */
            dateFormat : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 430);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 431);
return (Lang.isString(val) || null);
                }
            },
            /**
             * @description Determines whether this element should have the initial focus.<br>
             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-firstfocus' is added).
             * @attribute initialFocus
             * @type Boolean
             * @default false
             * @since 0.1
            */
            initialFocus : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 444);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 445);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description Determines whether this element should completely be selected when it gets focus.<br>
             * Only has effect if the masterform knows how to use it (in fact, just the className 'itsa-formelement-selectall' is added).
             * @attribute selectOnFocus
             * @type Boolean
             * @default false
             * @since 0.1
            */
            selectOnFocus : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 458);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 459);
return (Lang.isBoolean(val));
                }
            },
            /**
             * @description config that will be added to the underlying widget (in case of Date/Time values)
             * @attribute widgetConfig
             * @type Object
             * @default {}
             * @since 0.1
             */
            widgetConfig : {
                value: {},
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaformelement/gallery-itsaformelement.js", "validator", 471);
_yuitest_coverline("build/gallery-itsaformelement/gallery-itsaformelement.js", 472);
return (Lang.isObject(val));
                }
            }
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base",
        "node-core",
        "node-base",
        "datatype-date-format",
        "classnamemanager",
        "cssbutton"
    ],
    "skinnable": true
});
