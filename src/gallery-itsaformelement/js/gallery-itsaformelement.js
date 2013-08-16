'use strict';

/*jshint maxlen:200 */

/**
 * Class ITSAFormElement
 *
 * Static Class that should not be used of its own: purely made for ITSAEditModel to use.
 *
 *
 * @module gallery-itsaformelement
 * @class ITSAFormElement
 * @static
 * @constructor
 * @since 0.2
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ITSAFormElement,
    DISABLED    = 'disabled',
    WIDGET_PARENT_CLASS = 'itsa-widget-parent',
    PUREBUTTON_CLASS = 'pure-button',
    ITSABUTTON_DATETIME_CLASS = 'pure-button-datetime',
    DISABLED_BUTTON_CLASS = PUREBUTTON_CLASS+'-'+DISABLED,
    PRIMARY_BUTTON_CLASS = PUREBUTTON_CLASS+'-primary',

    ERROR = 'error',
    BOOLEAN = 'boolean',
    DATE = 'date',
    TIME = 'time',
    DATETIME = DATE+TIME,

    PICKER_ICON = 'itsa-'+DATETIME+'picker-icon',
    ICON_DATE_CLASS = PICKER_ICON+DATE,
    ICON_TIME_CLASS = PICKER_ICON+TIME,
    ICON_DATETIME_CLASS = PICKER_ICON+DATETIME,

    PATTERN_EMAIL = '',
    PATTERN_URLHTTP = '',
    PATTERN_URLHTTPS = '',
    PATTERN_URL = '',
    PATTERN_INTEGER = '',
    PATTERN_FLOAT = '',

    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    URL = 'url',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    HIDDEN = 'hidden',
    TEXTAREA = 'textarea',
    DIV = 'div',
    BUTTON = 'button',
    LABEL = 'label',
    SPAN  = 'span',

    READONLY    = 'readonly',
    CHECKED     = 'checked',
    REQUIRED    = 'required',
    NAME        = 'name',
    VALUE       = 'value',
    PLACEHOLDER = 'placeholder',
    PATTERN     = 'pattern',
    DATA        = 'data',
    CLASS       = 'class',
    VALUESWITCHED    = 'valueswitched',
    VALUENONSWITCHED = 'valuenonswitched',
    DISABLED_SUB         = '{'+DISABLED+'}',
    READONLY_SUB         = '{'+READONLY+'}',
    CHECKED_SUB          = '{'+CHECKED+'}',
    REQUIRED_SUB         = '{'+REQUIRED+'}',
    NAME_SUB             = '{'+NAME+'}',
    VALUE_SUB            = '{'+VALUE+'}',
    PLACEHOLDER_SUB      = '{'+PLACEHOLDER+'}',
    PATTERN_SUB          = '{'+PATTERN+'}',
    DATA_SUB             = '{'+DATA+'}',
    CLASS_SUB            = '{'+CLASS+'}',
    ID_SUB               = 'id="{id}"',
    LABEL_FOR_ID_SUB     = '<label for="{id}"',
    VALUESWITCHED_SUB    = '{'+VALUESWITCHED+'}',
    VALUENONSWITCHED_SUB = '{'+VALUENONSWITCHED+'}',

    TYPE           = 'type',
    BUTTON         = 'button',
    SUBMIT         = 'submit',
    RESET          = 'reset',
    INPUT_TYPE_IS  = '<input '+TYPE+'="',
    BUTTON_TYPE_IS = '<'+BUTTON+' '+TYPE+'="',
    BUTTONTEXT     = 'buttonText',
    CLASSNAME      = CLASS+'name',
    FOCUSABLE      = 'focusable',

    DATA_DATETIME = DATA+'-'+DATETIME+'=', // used as node data-attribute data-datetime

    ELEMENT_UNDEFINED = '<'+SPAN+' '+ID_SUB+'>UNDEFINED ELEMENTTYPE</'+SPAN+'>',

    ELEMENT_TEXT = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+CLASS_SUB+' />',
    ELEMENT_PASSWORD = INPUT_TYPE_IS+PASSWORD+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+CLASS_SUB+' />',
    ELEMENT_EMAIL = INPUT_TYPE_IS+EMAIL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_EMAIL+'" />',
    ELEMENT_URL = INPUT_TYPE_IS+URL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_URL+'" />',
    ELEMENT_URLHTTP = INPUT_TYPE_IS+URL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_URLHTTP+'" />',
    ELEMENT_URLHTTPS = INPUT_TYPE_IS+URL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_URLHTTPS+'" />',
    ELEMENT_INTEGER = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_INTEGER+'" />',
    ELEMENT_FLOAT = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' '+PATTERN+'="'+PATTERN_FLOAT+'" />',
    ELEMENT_RADIO = INPUT_TYPE_IS+RADIO+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+CHECKED_SUB+DATA_SUB+CLASS_SUB+' />',
    ELEMENT_CHECKBOX = INPUT_TYPE_IS+CHECKBOX+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+READONLY_SUB+CHECKED_SUB+DATA_SUB+CLASS_SUB+' />',
    ELEMENT_HIDDEN = INPUT_TYPE_IS+HIDDEN+'" '+ID_SUB+NAME_SUB+VALUE_SUB+' />',

    ELEMENT_TEXTAREA = '<'+TEXTAREA+' '+ID_SUB+NAME_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+CLASS_SUB+' />'+VALUE_SUB+'</'+TEXTAREA+'>',

    ELEMENT_WIDGET = '<'+DIV+' '+ID_SUB+DATA_SUB+CLASS_SUB+'></'+DIV+'>',

    ELEMENT_BUTTON = BUTTON_TYPE_IS+'"'+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DATA_SUB+CLASS_SUB+'>{'+BUTTONTEXT+'}</'+BUTTON+'>',
    ELEMENT_SUBMIT = BUTTON_TYPE_IS+'"'+SUBMIT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DATA_SUB+CLASS_SUB+'>{'+BUTTONTEXT+'}</'+BUTTON+'>',
    ELEMENT_RESET = BUTTON_TYPE_IS+'"'+RESET+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DATA_SUB+CLASS_SUB+'>{'+BUTTONTEXT+'}</'+BUTTON+'>',


    ELEMENT_DATE = LABEL_FOR_ID_SUB+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+'<'+BUTTON+' '+ID_SUB+' '+DATA_DATETIME+'"'+DATE+'"'+DATA_SUB+
                   ' '+CLASS+'="'+PUREBUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+'"><'+SPAN+' '+CLASS+'="'+ICON_DATE_CLASS+'"></'+SPAN+'></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',
    ELEMENT_TIME = LABEL_FOR_ID_SUB+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+'<'+BUTTON+' '+ID_SUB+' '+DATA_DATETIME+'"'+TIME+'"'+DATA_SUB+
                   ' '+CLASS+'="'+PUREBUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+'"><'+SPAN+' '+CLASS+'="'+ICON_TIME_CLASS+'"></'+SPAN+'></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',
    ELEMENT_DATETIME = LABEL_FOR_ID_SUB+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+'<'+BUTTON+' '+ID_SUB+' '+DATA_DATETIME+'"'+DATETIME+'"'+DATA_SUB+
                       ' '+CLASS+'="'+PUREBUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS+'"><'+SPAN+' '+CLASS+'="'+ICON_DATETIME_CLASS+'"></'+SPAN+'></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',

    GETFORMATTED_DATEVALUE = function(type, value, format) {
        if (type==='date') {
            format = format || '%x';
        }
        else if (type==='time') {
            format = format || '%X';
        }
        else if (type==='datetime') {
            format = format || '%x %X';
        }
        // asynchronious preloading the module
        Y.use('gallery-itsadatetimepicker');
        return Y.Date.format(value, {format: format});
    },

    SUBREGEX = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,
    SUB = function(s, o) {
        return s.replace ? s.replace(SUBREGEX, function (match, key) {
            return Y.Lang.isUndefined(o[key]) ? '' : o[key];
        }) : s;
    };


ITSAFormElement = Y.ITSAFormElement = {};

/**
 * Renderes a String that contains the completeFormElement definition. You can also define a widgetclass, by which the widget will
 * be created as soon as the returned 'html' gets into the dom. To be used in an external Form or with Y.ITSAEditModel.
 * @method getElement
 * @param type {String|widgetClass} the elementtype to be created. Can also be a widgetclass.
 * @param [config] {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
 * @param [nodeid] {String} The unique id of the node (without the '#'). When not supplied, Y.guid() will generate a random one.
 * @return {object} o.html --> rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAForm,
 *                             or Y.ITSAEditModel<br />
 *                  o.widget --> handle to the created widgetinstance.
 *                  o.nodeid --> created node's id.
*/
ITSAFormElement.getElement = function(type, config, nodeid) {
    Y.log('getElement', 'info', 'ITSAFormElement');
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
            Y.log(e.message, ERROR, 'ITSAFormElement');
            Y.fire(ERROR, e);
        }
    }
    return element;
};

/**
 * Renderes a String that contains the completeFormElement definition.
 *
 * @method _renderedElement
 * @private
 * @param type {String} the elementtype
 * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
 * @param nodeid {String} The unique id of the node (without the '#').
 * @param [iswidget] {Boolean} whether the element is a widget
 * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
*/
ITSAFormElement._renderedElement = function(type, config, nodeid, iswidget) {
    Y.log('_renderedElement', 'info', 'ITSAFormElement');
    var subtituteConfig = Y.merge(config),
        disabled = (typeof subtituteConfig[DISABLED]===BOOLEAN) ? subtituteConfig[DISABLED] : false,
        required = (typeof subtituteConfig[REQUIRED]===BOOLEAN) ? subtituteConfig[REQUIRED] : false,
        readonly = (typeof subtituteConfig[READONLY]===BOOLEAN) ? subtituteConfig[READONLY] : false,
        focusable = (typeof subtituteConfig[FOCUSABLE]===BOOLEAN) ? subtituteConfig[FOCUSABLE] : true,
        tooltip = config.tooltip,
        tooltipHeader = config.tooltipHeader,
        tooltipFooter = config.tooltipFooter,
        tooltipPlacement = config.tooltipPlacement,
        nossl = config.nossl,
        onlyssl = config.onlyssl,
        digits = config.digits,
        disabledbutton, primarybutton, template, data;
    if (iswidget) {
        template = ELEMENT_WIDGET;
        subtituteConfig[CLASS]=' '+CLASS+'="'+(config[CLASSNAME] || '') + ' ' + WIDGET_PARENT_CLASS + (focusable && (' '+FOCUSABLE)) + '"';
    }
    else {
/*jshint expr:true */
        disabled && (subtituteConfig[DISABLED]=' '+DISABLED+'="'+DISABLED+'"');
        required && (subtituteConfig[REQUIRED]=' '+REQUIRED+'="'+REQUIRED+'"');
        readonly && (subtituteConfig[READONLY]=' '+READONLY+'="'+READONLY+'"');
        config[PLACEHOLDER] && (subtituteConfig[PLACEHOLDER]=' '+PLACEHOLDER+'="'+subtituteConfig[PLACEHOLDER]+'"');
        config[PATTERN] && (subtituteConfig[PATTERN]=' '+PATTERN+'="'+subtituteConfig[PATTERN]+'"');
        config[NAME] && (subtituteConfig[NAME]=' '+NAME+'="'+subtituteConfig[NAME]+'"');
        (type!==TEXTAREA) && config[VALUE] && (subtituteConfig[VALUE]=' '+VALUE+'="'+subtituteConfig[VALUE]+'"');
        if (tooltip) {
            data = ' data-content="'+tooltip+'"';
            tooltipHeader && (data+=' data-header="'+tooltipHeader+'"');
            tooltipFooter && (data+=' data-footer="'+tooltipFooter+'"');
            tooltipPlacement && (data+=' data-placement="'+tooltipPlacement+'"');
            subtituteConfig[DATA] = data;
        }
/*jshint expr:false */
        if (type===TEXT) {
            template = ELEMENT_TEXT;
        }
        else if (type===PASSWORD) {
            template = ELEMENT_PASSWORD;
        }
        else if (type===EMAIL) {
            template = ELEMENT_EMAIL;
        }
        else if (type===URL) {
            if ((typeof nossl===BOOLEAN) && nossl) {
                template = ELEMENT_URLHTTP;
            }
            if ((typeof onlyssl===BOOLEAN) && onlyssl) {
                template = ELEMENT_URLHTTPS;
            }
            else {
                template = ELEMENT_URL;
            }
        }
        else if (type==='number') {
            template = ((typeof digits===BOOLEAN) && digits) ? ELEMENT_FLOAT : ELEMENT_INTEGER;
        }
        else if (type===RADIO) {
            template = ELEMENT_RADIO;
        }
        else if (type===CHECKBOX) {
            template = ELEMENT_CHECKBOX;
        }
        else if (type===HIDDEN) {
            template = ELEMENT_HIDDEN;
        }
        else if (type===TEXTAREA) {
            template = ELEMENT_TEXTAREA;
        }
        else if ((type===BUTTON) || (type==='save') || (type==='destroy') || (type==='add') || (type==='stopedit')) {
            template = ELEMENT_BUTTON;
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else if (type===SUBMIT) {
            template = ELEMENT_SUBMIT;
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else if (type===RESET) {
            template = ELEMENT_RESET;
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else if (type===DATE) {
            template = ELEMENT_DATE;
            subtituteConfig[config.switched ? VALUESWITCHED : VALUENONSWITCHED] = GETFORMATTED_DATEVALUE(type, subtituteConfig[VALUE], subtituteConfig.format);
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else if (type===TIME) {
            template = ELEMENT_TIME;
            subtituteConfig[config.switched ? VALUESWITCHED : VALUENONSWITCHED] = GETFORMATTED_DATEVALUE(type, subtituteConfig[VALUE], subtituteConfig.format);
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else if (type===DATETIME) {
            template = ELEMENT_DATETIME;
            subtituteConfig[config.switched ? VALUESWITCHED : VALUENONSWITCHED] = GETFORMATTED_DATEVALUE(type, subtituteConfig[VALUE], subtituteConfig.format);
            primarybutton = config.primary;
            disabledbutton = config.disabled;
        }
        else {
            template = ELEMENT_UNDEFINED;
        }
/*jshint expr:true */
        (config[CLASSNAME] || focusable) && (subtituteConfig[CLASS]=' '+CLASS+'="'+(config[CLASSNAME] || '')+
                                (focusable && (' '+FOCUSABLE))+
                                (disabledbutton && (' '+DISABLED_BUTTON_CLASS))+
                                (primarybutton && (' '+PRIMARY_BUTTON_CLASS))+
                                '"');
/*jshint expr:false */
    }
    return SUB(template, subtituteConfig);
};