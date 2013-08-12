YUI.add('gallery-itsaformelement', function (Y, NAME) {

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

var ITSAFormElement,
    Lang  = Y.Lang,
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

    ELEMENT_WIDGET = '<div id="{id}"{classname}></div>',
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

Lang.getValue = function(o) {
    return Lang.isValue(o) ? o : null;
};


ITSAFormElement = Y.ITSAFormElement = {};

/**
 * Renderes a String that contains the completeFormElement definition.<br>
 * To be used in an external Form
 * @method render
 * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
 * @param [nodeid] {String} The unique id of the node (without the '#').
 * @return {Y.Promise} 1st element --> rendered Node which is NOT part of the DOM yet!
 *                 Must be inserted into the DOM manually, or through Y.ITSAFORM<br />
 *                 2nd element --> null|widget = handle to the widget, which automaticly will be rendered once the element is in the dom.
*/
ITSAFormElement.getElement = function(type, config, nodeid) {
    var element, iswidget, WidgetClass, widget;
    nodeid = nodeid || Y.guid();
    config = config || {};
    iswidget = ((typeof type === 'function') && type.prototype.BOUNDING_TEMPLATE);
    if (typeof type==='string') {
        type = type.toLowerCase();
    }
    element = {
        nodeid : nodeid,
        html : ITSAFormElement._renderedElement((iswidget ? type.constructor.NAME : type), config, nodeid, iswidget)
    };
    if (iswidget) {
        WidgetClass = type;
        try {
            widget = element.widget = new WidgetClass(config);
            // when it is inserted in the dom: render it
            widget.renderWhenAvailable('#'+nodeid);
        }
        catch (e) {
            Y.log(e.message, 'error', 'ITSAFormElement');
            Y.fire('error', e);
        }
    }
    return element;
};

/**
 * Renderes a String that contains the completeFormElement definition.<br>
 * To be used in an external Form
 * @method _renderedElement
 * @private
 * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
 * @param nodeid {String} The unique id of the node (without the '#').
 * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
*/
ITSAFormElement._renderedElement = function(type, config, nodeid, iswidget) {
    var element, name, value, dateFormat, autoCorrection, validation, classnameAttr, classname, isDateOrTime,
        focusable, isButton, withLifeChange, classlevel2, focusinfoOnClass, focusinfo, enterNextField, placeholder, placeholdervalue,
        initialFocus, selectOnFocus, keyValidation, validationMessage;

    Y.log('renderElement', 'info', 'ITSAFORMELEMENT');
    name = config.name || 'undefined-name';
    value = config.value || '';
    dateFormat = config.dateFormat || '';
    classnameAttr = config.className || '';
    validationMessage = config.validationMessage || '',
    keyValidation = Lang.getValue(config.keyValidation) || false;
    autoCorrection = Lang.getValue(config.autoCorrection) || false;
    placeholdervalue = config.placeholdervalue;
    validation = !autoCorrection && (Lang.getValue(config.validation) || false);
    enterNextField = (type==='input') || (type==='password');
    isDateOrTime = (type==='date') || (type==='time') || (type==='datetime');
    isButton = (type==='button') || (type==='submit') || (type==='reset') || (type==='save') ||
               (type==='add') || (type==='destroy') || (type==='stopedit');

    focusable = Lang.getValue(config.focusable) || true;
    initialFocus =  Lang.getValue(config.initialFocus) || false;
    selectOnFocus =  Lang.getValue(config.selectOnFocus) || false;

    focusinfoOnClass = ((type==='input') || (type==='textarea') || (type==='password') || isButton);
    focusinfo = focusable ?
                (
                    ITSAFORMELEMENT_FOCUSABLE_CLASS +
                    (initialFocus ? ' '+ITSAFORMELEMENT_FIRSTFOCUS_CLASS : '') +
                    (selectOnFocus ? ' '+ITSAFORMELEMENT_SELECTONFOCUS_CLASS : '')
                )
                : '';
    withLifeChange = (type==='input') || (type==='textarea') || (type==='password');
    classname = ' class="' + ITSAFORMELEMENT_ELEMENT_CLASS + ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, 'property', name) +
                ' ' + yClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS, type) +
                (classnameAttr ? ' '+classnameAttr : '') +
                (enterNextField ? ' '+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS : '') +
                (isButton ? ' '+YUI3BUTTON_CLASS+' '+ITSAFORMELEMENT_BUTTONTYPE_CLASS : '') +
                (withLifeChange ? ' '+ITSAFORMELEMENT_LIFECHANGE_CLASS : '') +
                (keyValidation ? ' '+ITSAFORMELEMENT_KEYVALIDATION_CLASS : '') +
                (validation ? ' '+ITSAFORMELEMENT_VALIDATION_CLASS : '') +
                (autoCorrection ? ' '+ITSAFORMELEMENT_AUTOCORRECT_CLASS : '') +
                (focusinfoOnClass ? ' '+focusinfo : '') +
                '"';
    classlevel2 = focusinfoOnClass ? '' : ' '+focusinfo;
    if (iswidget) {
        element = ELEMENT_WIDGET;
    }
    else if (type==='input') {
        element = ELEMENT_INPUT;
        if (validation) {
            element += ELEMENT_VALIDATION;
        }
        placeholder = placeholdervalue ? ' placeholder="'+  placeholdervalue+'"' : '';
    }
    else if (type==='password') {
        element = ELEMENT_PASSWORD;
        if (validation) {
            element += ELEMENT_VALIDATION;
        }
        placeholder = placeholdervalue ? ' placeholder="'+  placeholdervalue+'"' : '';
    }
    else if (type==='textarea') {
        element = ELEMENT_TEXTAREA;
        if (validation) {
            element += ELEMENT_VALIDATION;
        }
    }
    else if (isButton) {
        type = 'button';
        element = ELEMENT_BUTTON;
    }
    else if (type==='radiogroup') {
        element = ELEMENT_RADIOGROUP;
    }
    else if (type==='selectlist') {
        element = ELEMENT_SELECTLIST;
    }
    else if (type==='combo') {
        element = ELEMENT_COMBO;
    }
    else if (type==='date') {
        element = ELEMENT_DATE;
        dateFormat = dateFormat || '%x';
    }
    else if (type==='time') {
        element = ELEMENT_TIME;
        dateFormat = dateFormat || '%X';
    }
    else if (type==='datetime') {
        element = ELEMENT_DATETIME;
        dateFormat = dateFormat || '%x %X';
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
    else {
        element = ELEMENT_UNDEFINED;
    }
    if (isDateOrTime) {
        value = yDateFormat(value, {format: dateFormat});
        // asynchronious preloading the module
        Y.use('gallery-itsadatetimepicker');
    }
    return Lang.sub(
                    element,
                    {
                        id: nodeid,
                        name: name,
                        value: value,
                        placeholder: placeholder,
                        classname: classname,
                        classlevel2: classlevel2,
                        type: type,
                        validation: validationMessage
                    }
    );
};



}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base",
        "node-core",
        "node-base",
        "datatype-date-format",
        "classnamemanager",
        "cssbutton",
        "promise",
        "widget-base",
        "gallery-itsawidgetrenderpromise"
    ],
    "skinnable": true
});
