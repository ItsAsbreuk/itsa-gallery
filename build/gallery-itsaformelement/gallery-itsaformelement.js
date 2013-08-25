YUI.add('gallery-itsaformelement', function (Y, NAME) {

'use strict';

/*jshint maxlen:215 */

/**
 *
 * Provides stringifying html-elements based on a config-object
 *
 * @module gallery-itsaformelement
 * @class ITSAFormElement
 * @static
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ITSAFormElement,
    YARRAY = Y.Array,
    DISABLED    = 'disabled',
    WIDGET_PARENT_CLASS = 'itsa-widget-parent',
    PURE = 'pure',
    BUTTON = 'button',
    PUREBUTTON_CLASS = PURE+'-'+BUTTON,
    DATE = 'date',
    TIME = 'time',
    DATETIME = DATE+TIME,
    ITSABUTTON_DATETIME_CLASS = PUREBUTTON_CLASS+'-'+DATETIME,
    DISABLED_BUTTON_CLASS = PUREBUTTON_CLASS+'-'+DISABLED,
    PRIMARY_BUTTON_CLASS = PUREBUTTON_CLASS+'-primary',
    MODELATTRIBUTE = 'modelattribute',

    ERROR = 'error',
    BOOLEAN = 'boolean',
    MIN = 'min',
    MAX = 'max',

    PICKER = 'picker',
    CLICK = 'click',
    PICKER_ICON = 'itsa-icon',
    ICON_DATE_CLASS = PICKER_ICON+DATE,
    ICON_TIME_CLASS = PICKER_ICON+TIME,
    ICON_DATETIME_CLASS = PICKER_ICON+DATETIME,
    DATA_FORM_ELEMENT = ' data-formelement="true"',
    SPANCLASSISFORMAT = '<span class="format',
    ENDSPAN = '</span>',

    PATTERN_EMAIL = '^[\\w!#$%&\'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&\'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$',
    PATTERN_URLEND = '[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*',
    PATTERN_URLHTTP =  '^(http://)?'+PATTERN_URLEND,
    PATTERN_URLHTTPS =  '^(https://)?'+PATTERN_URLEND,
    PATTERN_URL = '^(https?://)?'+PATTERN_URLEND,
    PATTERN_INTEGER = '^(([-]?[1-9][0-9]*)|0)$',
    PATTERN_FLOAT = '^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$',

    LABEL_FOR_IS = '<label for="',
    ENDLABEL_EL = '</label>',

    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    URL = 'url',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    HIDDEN = 'hidden',
    TEXTAREA = 'textarea',
    DIV = 'div',
    LABEL = 'label',
    SPAN  = 'span',

    PURERADIO    = PURE+'-'+RADIO,
    PURECHECKBOX = PURE+'-'+CHECKBOX,

    READONLY    = 'readonly',
    CHECKED     = 'checked',
    REQUIRED    = 'required',
    NAMEDEF     = 'name', // cannot use NAME
    VALUE       = 'value',
    PLACEHOLDER = 'placeholder',
    PATTERN     = 'pattern',
    DATA        = 'data',
    CLASS       = 'class',
    BUTTONTEXT  = 'buttonText',
    SWITCH      = 'switch',
    SWITCHED    = SWITCH+'ed',
    SWITCHLABEL = SWITCH+LABEL,
    SWITCHVALUE = SWITCH+VALUE,
    DATETIME_CLASS   = DATETIME+CLASS,
    LABELDATA        = LABEL+DATA,
    VALUESWITCHED    = VALUE+SWITCHED,
    VALUENONSWITCHED = VALUE+'non'+SWITCHED,
    FOCUSABLE      = 'focusable',
    DISABLED_SUB         = '{'+DISABLED+'}',
    READONLY_SUB         = '{'+READONLY+'}',
    CHECKED_SUB          = '{'+CHECKED+'}',
    REQUIRED_SUB         = '{'+REQUIRED+'}',
    NAME_SUB             = '{'+NAMEDEF+'}',
    VALUE_SUB            = '{'+VALUE+'}',
    PLACEHOLDER_SUB      = '{'+PLACEHOLDER+'}',
    PATTERN_SUB          = '{'+PATTERN+'}',
    DATA_SUB             = '{'+DATA+'}',
    CLASS_SUB            = '{'+CLASS+'}',
    HIDDEN_SUB           = '{'+HIDDEN+'}',
    ID_SUB               = 'id="{id}"',
    LABEL_FOR_ID_SUB     = '<label for="{id}"',
    VALUESWITCHED_SUB    = '{'+VALUESWITCHED+'}',
    VALUENONSWITCHED_SUB = '{'+VALUENONSWITCHED+'}',
    LABELDATA_SUB        = '{'+LABELDATA+'}',
    DATETIME_CLASS_SUB   = '{'+DATETIME_CLASS+'}',
    BUTTONTEXT_SUB       = '{'+BUTTONTEXT+'}',
    FOCUSABLE_SUB        = '{'+FOCUSABLE+'}',
    MIN_SUB              = '{'+MIN+'}',
    MAX_SUB              = '{'+MAX+'}',

    TYPE           = 'type',
    SUBMIT         = 'submit',
    RESET          = 'reset',
    INPUT_TYPE_IS  = '<input '+TYPE+'="',
    BUTTON_TYPE_IS = '<'+BUTTON+' '+TYPE+'="',
    CLASSNAME      = CLASS+NAMEDEF,
    LABELCLASSNAME = LABEL+'Class'+NAMEDEF,

    DATA_LABEL_DATETIME = ' data-labeldatetime="true"',
    DATA_DATETIME = DATA+'-'+DATETIME+'=', // used as node data-attribute data-datetime

    ELEMENT_UNDEFINED = '<'+SPAN+' '+ID_SUB+'>UNDEFINED ELEMENTTYPE</'+SPAN+'>',

    ELEMENT_TEXT = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_PASSWORD = INPUT_TYPE_IS+PASSWORD+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_EMAIL = INPUT_TYPE_IS+EMAIL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_URL      = INPUT_TYPE_IS+URL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_NUMBER = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+MIN_SUB+MAX_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+
                      HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_RADIO = INPUT_TYPE_IS+RADIO+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+CHECKED_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_CHECKBOX = INPUT_TYPE_IS+CHECKBOX+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+READONLY_SUB+CHECKED_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_HIDDEN = INPUT_TYPE_IS+HIDDEN+'" '+ID_SUB+NAME_SUB+VALUE_SUB+' />',
    ELEMENT_TEXTAREA = '<'+TEXTAREA+' '+ID_SUB+NAME_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />'+VALUE_SUB+'</'+TEXTAREA+'>',
    ELEMENT_WIDGET = VALUENONSWITCHED_SUB+'<'+DIV+' '+ID_SUB+DATA_SUB+FOCUSABLE_SUB+CLASS_SUB+'></'+DIV+'>'+VALUESWITCHED_SUB,
    ELEMENT_BUTTON = BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+'>'+BUTTONTEXT_SUB+'</'+BUTTON+'>',
    ELEMENT_DATE = LABEL_FOR_ID_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+DATE+'"'+DATA_SUB+FOCUSABLE_SUB+' '+CLASS+'="'+DATETIME_CLASS_SUB+'"><i '+CLASS+'="'+ICON_DATE_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',
    ELEMENT_TIME = LABEL_FOR_ID_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+TIME+'"'+DATA_SUB+FOCUSABLE_SUB+' '+CLASS+'="'+DATETIME_CLASS_SUB+'"><i '+CLASS+'="'+ICON_TIME_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',
    ELEMENT_DATETIME = LABEL_FOR_ID_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+CLASS_SUB+'>'+VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+DATETIME+'"'+DATA_SUB+FOCUSABLE_SUB+' '+CLASS+'="'+DATETIME_CLASS_SUB+'"><i '+CLASS+'="'+ICON_DATETIME_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB+'</'+LABEL+'>',

    GETFORMATTED_DATEVALUE = function(type, name, value, format, buttonnodeid) {
        if (!format) {
            if (type==='date') {
                format = '%x';
            }
            else if (type==='time') {
                format = '%X';
            }
            else {
                format = '%x %X';
            }
        }
        // asynchronious preloading the module
        Y.use('gallery-itsadatetimepicker');
        return SPANCLASSISFORMAT+'value formattime-'+name+'" data-for="'+buttonnodeid+'">'+Y.Date.format(value, {format: format})+ENDSPAN;
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
 * be created as soon as the returned 'html' gets into the dom. The next html-elements can be rendered:
 *   <ul>
 *     <li>text</li>
 *     <li>number</li>
 *     <li>password</li>
 *     <li>textarea</li>
 *     <li>radio</li>
 *     <li>checkbox</li>
 *     <li>date</li>
 *     <li>time</li>
 *     <li>datetime</li>
 *     <li>reset</li>
 *     <li>submit</li>
 *     <li>button</li>
 *     <li>email</li>
 *     <li>url</li>
 *   </ul>
 * Or when widgets need to be created, use the <u>Class</u> (<b>not instance</b>) of the widget. F.i.:
 *   <ul>
 *     <li>Y.Slider</li>
 *     <li>Y.Dial</li>
 *     <li>Y.EditorBase</li>
 *     <li>Y.ITSACheckbox</li>
 *     <li>Y.ITSASelectlist</li>
 *  </ul>
 *
 * @method getElement
 * @param type {String|widgetClass} the elementtype to be created. Can also be a widgetclass.
 * @param [config] {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the instance.
 *   @param [config.buttonTekst] {String} only valid for non 'datetime'-buttons.
 *   @param [config.checked=false] {Boolean} only valid for checkboxes and radiobuttons.
 *   @param [config.classname] {String} additional classname for the html-element or widget.
 *   @param [config.data] {String} for extra data-attributes, f.i. data: 'data-someinfo="somedata" data-moreinfo="moredata"'.
 *   @param [config.digits=false] {Boolean} for floating numbers: only valid for type==='number'.
 *   @param [config.disabled=false] {Boolean}
 *   @param [config.focusable=true] {Boolean} adds an extra attribute 'focusable' which can be used as a selector by the FocusManager. Also applyable for Widgets.
 *   @param [config.format] {String} Date-format: only valid for type==='date', 'time' or 'datetime'
 *   @param [config.hidden=false] {Boolean}
 *   @param [config.label] {String} can by used for all elements (including Widgets and date-time), except for buttons.
 *   @param [config.labelClassname] {String} additional classname for the label. Can by used for all elements (including Widgets and date-time), except for buttons.
 *   @param [config.length] {Number} adds a node attribute 'data-length': needs to be processed yourself. Only valid for input-elements.
 *   @param [config.min] {Number} adds a node attribute 'data-min': needs to be processed yourself. Only valid for type==='number'.
 *   @param [config.max] {Number} adds a node attribute 'data-min': needs to be processed yourself. Only valid for type==='number'.
 *   @param [config.name] {String} used by html-forms to identify the element.
 *   @param [config.nossl=false] {Boolean} making url's to validate only on non-ssl url's. Only applyable for type==='url'.
 *   @param [config.onlyssl=false] {Boolean} making url's to validate only on ssl url's. Only applyable for type==='url'
 *   @param [config.pattern] {String} regexp pattern that should be matched. Only applyable for type==='text' or 'password'.
 *   @param [config.placeholder] {String} only applyable for input-elements and textarea.
 *   @param [config.primary=false] {Boolean} making a button the primary button. Only applyable for buttons.
 *   @param [config.required=false] {Boolean} (defaults true for 'type===password') when data is required. Only applyable for input-elements, textarea and date/time.
 *   @param [config.readonly=false] {Boolean} not applyable for buttons.
 *   @param [config.switchvalue=false] {Boolean} make the value go behind the element. Only applyable for type=='Y.Slider', 'date', 'time' or 'datetime'.
 *   @param [config.switchlabel=false] {Boolean} make the label go behind the element.
 *   @param [config.tooltip] {String} marks the data-attribute used by Y.Tipsy and Y.Tooltip. Also applyable for Widgets.
 *   @param [config.tooltipHeader] {String} marks the data-attribute used by Y.Tipsy and Y.Tooltip. Also applyable for Widgets.
 *   @param [config.tooltipFooter] {String} marks the data-attribute used by Y.Tipsy and Y.Tooltip. Also applyable for Widgets.
 *   @param [config.tooltipPlacement] {String} marks the data-attribute used by Y.Tipsy and Y.Tooltip. Also applyable for Widgets.
 *   @param [config.value] {String} the value of the element.
 * @param [nodeid] {String} The unique id of the node (without the '#'). When not supplied, Y.guid() will generate a random one.
 * @return {object} o.html   --> rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAForm,
 *                               or Y.ITSAEditModel<br />
 *                  o.name   --> convenience-property===config.name
 *                  o.config --> reference to the original configobject
 *                  o.nodeid --> created node's id (without #)
 *                  o.type   --> the created type - passed as the first parameter
 *                  o.widget --> handle to the created widgetinstance.<br />
*/
ITSAFormElement.getElement = function(type, config, nodeid) {
    var element, iswidget, WidgetClass, widget;
    nodeid = nodeid || Y.guid();
    config = config || {};
    iswidget = ((typeof type === 'function') && type.NAME);
    if (typeof type==='string') {
        type = type.toLowerCase();
    }
    element = {
        type : type,
        nodeid : nodeid,
        config : config,
        name : config.name,
        html : ITSAFormElement._renderedElement((iswidget ? type.NAME : type), config, nodeid, iswidget)
    };
    if (iswidget) {
        WidgetClass = type;
        try {
            widget = element.widget = new WidgetClass(config.widgetconfig);
            // when it is inserted in the dom: render it
            if (type.NAME==='editorBase') {
                Y.use('gallery-itsaeditorrenderpromise', function() {
                    widget.renderOnAvailable('#'+nodeid);
                });
            }
            else {
                Y.use('gallery-itsawidgetrenderpromise', function() {
                    widget.renderOnAvailable('#'+nodeid);
                });
            }
        }
        catch (e) {
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
    var subtituteConfig = Y.merge(config),
        switchlabel = (typeof subtituteConfig[SWITCHLABEL]===BOOLEAN) ? subtituteConfig[SWITCHLABEL] : false,
        focusable = (typeof subtituteConfig[FOCUSABLE]===BOOLEAN) ? subtituteConfig[FOCUSABLE] : true,
        tooltip = config.tooltip,
        tooltipHeader = config.tooltipHeader,
        tooltipFooter = config.tooltipFooter,
        tooltipPlacement = config.tooltipPlacement,
        nossl = config.nossl,
        onlyssl = config.onlyssl,
        digits = config.digits,
        length = config.length,
        value = config[VALUE],
        modelattribute = config[MODELATTRIBUTE],
        switchvalue = config[SWITCHVALUE],
        configdata = config[DATA],
        data = DATA_FORM_ELEMENT, // always initialize
        labelclass, disabledbutton, primarybutton, template, surroundlabelclass, hidden, disabled, required,
        purebutton, readonly, extralabel;
/*jshint expr:true */
    configdata && (data+=' '+configdata);
    length && (data+=' data-length="'+length+'"');
    modelattribute && (data+=' data-'+MODELATTRIBUTE+'="true"');
    subtituteConfig[DATA] = data;
    if (tooltip) {
        data = ' data-content="'+tooltip+'"';
        tooltipHeader && (data+=' data-header="'+tooltipHeader+'"');
        tooltipFooter && (data+=' data-footer="'+tooltipFooter+'"');
        tooltipPlacement && (data+=' data-placement="'+tooltipPlacement+'"');
        // making it posible to concat data to labeldata by making it a string:
        subtituteConfig[LABELDATA] = subtituteConfig[LABELDATA] || '';
        // now cancatting:
        subtituteConfig[DATA] += data;
    }
/*jshint expr:false */
    if (iswidget) {
        template = ELEMENT_WIDGET;
        subtituteConfig[DATA] += ' data-type="'+type+'"'
        subtituteConfig[CLASS]=' class="'+(config[CLASSNAME] || '') + ' ' + WIDGET_PARENT_CLASS + '"';
/*jshint expr:true */
        config[LABEL] && (subtituteConfig[LABELDATA] += ' data-widgetlabel="true"');
/*jshint expr:false */
        subtituteConfig[FOCUSABLE] = focusable ? (' '+FOCUSABLE+'="'+FOCUSABLE+'"') : '';
        if (type==='slider') {
            // we want the value visible inside a span
            subtituteConfig[switchvalue ? VALUESWITCHED : VALUENONSWITCHED] = SPANCLASSISFORMAT+'value formatslider-'+config.name+'" data-for="'+nodeid+'">'+value+ENDSPAN;
        }
    }
    else {
        disabled = (typeof subtituteConfig[DISABLED]===BOOLEAN) ? subtituteConfig[DISABLED] : false;
        required = (typeof subtituteConfig[REQUIRED]===BOOLEAN) ? subtituteConfig[REQUIRED] : (type===PASSWORD);
        readonly = (typeof subtituteConfig[READONLY]===BOOLEAN) ? subtituteConfig[READONLY] : false;
        hidden = (typeof config[HIDDEN]===BOOLEAN) ? config[HIDDEN] : false;
/*jshint expr:true */
        subtituteConfig[FOCUSABLE] = focusable ? (' '+FOCUSABLE+'="'+FOCUSABLE+'"') : '';
        subtituteConfig[HIDDEN] = hidden ? (' '+HIDDEN+'="'+HIDDEN+'"') : '';
        subtituteConfig[DISABLED] = disabled ? (' '+DISABLED+'="'+DISABLED+'"') : '';
        subtituteConfig[REQUIRED] = required ? (' '+REQUIRED+'="'+REQUIRED+'"') : '';
        subtituteConfig[READONLY] = readonly ? (' '+READONLY+'="'+READONLY+'"') : '';
        config[PLACEHOLDER] && (subtituteConfig[PLACEHOLDER]=' '+PLACEHOLDER+'="'+subtituteConfig[PLACEHOLDER]+'"');
        config[PATTERN] && (subtituteConfig[PATTERN]=' '+PATTERN+'="'+subtituteConfig[PATTERN]+'"');
        config[NAMEDEF] && (subtituteConfig[NAMEDEF]=' '+NAMEDEF+'="'+subtituteConfig[NAMEDEF]+'"');
        (type!==TEXTAREA) && value && (subtituteConfig[VALUE]=' '+VALUE+'="'+subtituteConfig[VALUE]+'"');
/*jshint expr:false */
        if (type===TEXT) {
            template = ELEMENT_TEXT;
        }
        else if (type===PASSWORD) {
            template = ELEMENT_PASSWORD;
        }
        else if (type===EMAIL) {
            template = ELEMENT_EMAIL;
            // redefine pattern
            subtituteConfig[PATTERN] = ' '+PATTERN+'="'+PATTERN_EMAIL+'"';
        }
        else if (type===URL) {
            template = ELEMENT_URL;
            if ((typeof nossl===BOOLEAN) && nossl) {
                subtituteConfig[PATTERN] =' '+PATTERN+'="'+PATTERN_URLHTTP+'"';
            }
            else if ((typeof onlyssl===BOOLEAN) && onlyssl) {
                subtituteConfig[PATTERN] =' '+PATTERN+'="'+PATTERN_URLHTTPS+'"';
            }
            else {
                subtituteConfig[PATTERN] =' '+PATTERN+'="'+PATTERN_URL+'"';
            }
        }
        else if (type==='number') {
            template = ELEMENT_NUMBER;
            subtituteConfig[PATTERN] =' '+PATTERN+'="'+(((typeof digits===BOOLEAN) && digits) ? PATTERN_FLOAT : PATTERN_INTEGER)+'"';
/*jshint expr:true */
            config.min && (subtituteConfig[MIN] = ' min='+config.min+'"');
            config.max && (subtituteConfig[MAX] += ' max='+config.max+'"');
/*jshint expr:false */
        }
        else if (type===RADIO) {
            surroundlabelclass = PURERADIO;
            template = ELEMENT_RADIO;
        }
        else if (type===CHECKBOX) {
            surroundlabelclass = PURECHECKBOX;
            template = ELEMENT_CHECKBOX;
        }
        else if (type===HIDDEN) {
            template = ELEMENT_HIDDEN;
        }
        else if (type===TEXTAREA) {
            template = ELEMENT_TEXTAREA;
        }
        else if ((type===BUTTON) || (type===SUBMIT) || (type===RESET)) {
            delete subtituteConfig[LABEL]; // not allowed for buttons
            template = ELEMENT_BUTTON;
            purebutton = true;
            subtituteConfig[DATA] += ' data-'+BUTTON+TYPE+'="'+type+'"';
            primarybutton = config.primary;
            disabledbutton = disabled;
/*jshint expr:true */
            config[BUTTONTEXT] || (subtituteConfig[BUTTONTEXT]=(value||type));
            subtituteConfig[VALUE] || (subtituteConfig[VALUE] = ' '+VALUE+'="'+subtituteConfig[BUTTONTEXT]+'"');
/*jshint expr:false */
        }
        else if ((type===DATE) || (type===TIME) || (type===DATETIME)) {
            if (type===DATE) {
                template = ELEMENT_DATE;
            }
            else if (type===TIME) {
                template = ELEMENT_TIME;
            }
            else if (type===DATETIME) {
                template = ELEMENT_DATETIME;
            }
/*jshint expr:true */
            value && (subtituteConfig[VALUE] = ' value="'+value.getTime()+'"');
/*jshint expr:false */
            subtituteConfig[DATA] += ' data-'+DATETIME+'picker="true"';
            subtituteConfig[DATETIME_CLASS] = PUREBUTTON_CLASS+' '+ITSABUTTON_DATETIME_CLASS +
                                              (disabled ? (' '+DISABLED_BUTTON_CLASS) : '') +
                                              (config.primary ? (' '+PRIMARY_BUTTON_CLASS) : '');
            subtituteConfig[switchvalue ? VALUESWITCHED : VALUENONSWITCHED] = GETFORMATTED_DATEVALUE(type, (config.name || ''), value, subtituteConfig.format, nodeid);
        }
        else {
            template = ELEMENT_UNDEFINED;
        }
        if (config.removepattern && subtituteConfig[PATTERN]) {
             // don't want pattern but want the pattern as a node-data-attribute --> this prevents the browser to focus unmatched patterns
             subtituteConfig[DATA] += ' data-'+PATTERN+'='+subtituteConfig[PATTERN].substr(9);
             delete subtituteConfig[PATTERN];
        }
/*jshint expr:true */
        (config[CLASSNAME] || purebutton) && (subtituteConfig[CLASS]=' class="'+(config[CLASSNAME] || '')+
                                (purebutton ? (' '+PUREBUTTON_CLASS) : '')+
                                (disabledbutton ? (' '+DISABLED_BUTTON_CLASS) : '')+
                                (primarybutton ? (' '+PRIMARY_BUTTON_CLASS) : '')+
                                '"');
/*jshint expr:false */
    }
    if (subtituteConfig[LABEL]) {
        if (surroundlabelclass) {
            subtituteConfig[LABEL] = '<span class="formatlabel">' + subtituteConfig[LABEL] + ENDSPAN;
            labelclass = ' class="'+surroundlabelclass+(config[LABELCLASSNAME] ? (' '+config[LABELCLASSNAME]) : '') + '"';
            template = LABEL_FOR_IS+'{id}"'+LABELDATA_SUB+labelclass+'>'+(switchlabel ? (template+'{label}') : ('{label}'+template))+ENDLABEL_EL;
        }
        else {
            labelclass = config[LABELCLASSNAME] ? (' class="'+config[LABELCLASSNAME] + '"') : '';
            extralabel = LABEL_FOR_IS+'{id}"'+LABELDATA_SUB+labelclass+'>{label}'+ENDLABEL_EL;
            if (switchlabel) {
                template += extralabel;
            }
            else {
                template = extralabel+template;
            }
        }
    }
    subtituteConfig.id=nodeid;
    return SUB(template, subtituteConfig);
};


// Define synthetic events 'datepickerclick', 'timepickerclick' and 'datetimepickerclick':

/**
  * Node-event fired when the datepicker-button is clicked.
  *
  * @event Y.Node.datepickerclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the timepicker-button is clicked.
  *
  * @event Y.Node.timepickerclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the datetimepicker-button is clicked.
  *
  * @event Y.Node.datetimepickerclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

YARRAY.each(
    [DATE, TIME, DATETIME],
    function(eventtype) {
        Y.Event.define(eventtype+PICKER+CLICK, {
            on: function (node, subscription, notifier) {
                // To make detaching easy, a common pattern is to add the subscription
                // for the supporting DOM event to the subscription object passed in.
                // This is then referenced in the detach() method below.
                subscription._handle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if (targetNode.getAttribute(DATA+'-'+DATETIME)===eventtype) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                });
            },
            // The logic executed when the 'tripleclick' subscription is `detach()`ed
            detach: function (node, subscription) {
                // Clean up supporting DOM subscriptions and other external hooks
                // when the synthetic event subscription is detached.
                subscription._handle.detach();
            },
            delegate: function (node, subscription, notifier, filter) {
                subscription._delegatehandle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if (filter && targetNode.getAttribute(DATA+'-'+DATETIME)===eventtype) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                }, filter); // filter is passed on to the underlying `delegate()` call
            },
            detachDelegate: function (node, subscription) {
                subscription._delegatehandle.detach();
            }
        });
    }
);

// Define synthetic events 'submitclick' and 'resetclick':

/**
  * Node-event fired when the submitbutton is clicked. This is not the same as the 'submit'-event because the latter
  * gets fired on a form-submit.
  *
  * @event Y.Node.submitclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the resetbutton is clicked. This is not the same as the 'reset'-event because the latter
  * gets fired on a form-reset.
  *
  * @event Y.Node.resetclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

YARRAY.each(
    [SUBMIT, RESET],
    function(eventtype) {
        Y.Event.define(eventtype+CLICK, {
            on: function (node, subscription, notifier) {
                // To make detaching easy, a common pattern is to add the subscription
                // for the supporting DOM event to the subscription object passed in.
                // This is then referenced in the detach() method below.
                subscription._handle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if (targetNode.getAttribute(DATA+'-'+BUTTON+TYPE)===eventtype) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                });
            },
            // The logic executed when the 'tripleclick' subscription is `detach()`ed
            detach: function (node, subscription) {
                // Clean up supporting DOM subscriptions and other external hooks
                // when the synthetic event subscription is detached.
                subscription._handle.detach();
            },
            delegate: function (node, subscription, notifier, filter) {
                subscription._delegatehandle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if (filter && targetNode.getAttribute(DATA+'-'+BUTTON+TYPE)===eventtype) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                }, filter); // filter is passed on to the underlying `delegate()` call
            },
            detachDelegate: function (node, subscription) {
                subscription._delegatehandle.detach();
            }
        });
    }
);


}, '@VERSION@', {"requires": ["yui-base", "datatype-date-format", "event-synthetic"], "skinnable": true});
