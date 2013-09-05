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

var ITSAFormElement, tipsyOK, tipsyInvalid,
    YArray = Y.Array,
    Lang = Y.Lang,
    BODY = Y.one('body'),
    ACTION_FROMTAB = ACTION_FROMTAB,
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
    HIDEATSTARTUP = 'hideatstartup',
    INVISIBLE_CLASS = 'itsa-invisible',

    ERROR = 'error',
    BOOLEAN = 'boolean',

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
    PLAIN = 'plain',
    INITIALFOCUS = 'initialfocus',
    FULLSELECT = 'fullselect',
    NUMBER = 'number',

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
    LABELHTML  = 'labelHTML',
    SWITCH      = 'switch',
    SWITCHED    = SWITCH+'ed',
    SWITCHLABEL = SWITCH+LABEL,
    SWITCHVALUE = SWITCH+VALUE,
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
    VALUESWITCHED_SUB    = '{'+VALUESWITCHED+'}',
    VALUENONSWITCHED_SUB = '{'+VALUENONSWITCHED+'}',
    LABELDATA_SUB        = '{'+LABELDATA+'}',
    LABELHTML_SUB       = '{'+LABELHTML+'}',
    FOCUSABLE_SUB        = '{'+FOCUSABLE+'}',

    TYPE           = 'type',
    SUBMIT         = 'submit',
    RESET          = 'reset',
    INPUT_TYPE_IS  = '<input '+TYPE+'="',
    BUTTON_TYPE_IS = '<'+BUTTON+' '+TYPE+'="',
    CLASSNAME      = CLASS+NAMEDEF,
    LABELCLASSNAME = LABEL+'Class'+NAMEDEF,
    WIDGET         = 'widget',
    TYPE_SUB       = '{'+TYPE+'}',

    DATA_LABEL_DATETIME = ' data-labeldatetime="true"',
    DATA_DATETIME = DATA+'-'+DATETIME+'=', // used as node data-attribute data-datetime
    DATA_BUTTON_TYPE = DATA+'-'+BUTTON+TYPE,
    DATA_BUTTON_SUBTYPE = DATA+'-'+BUTTON+'sub'+TYPE,

    ELEMENT_UNDEFINED = '<'+SPAN+' '+ID_SUB+'>UNDEFINED ELEMENTTYPE</'+SPAN+'>',
    ELEMENT_PLAIN = '<'+SPAN+' '+ID_SUB+NAME_SUB+DATA_SUB+HIDDEN_SUB+CLASS_SUB+'>'+VALUE_SUB+'</'+SPAN+'>',
    ELEMENT_TEXT = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_PASSWORD = INPUT_TYPE_IS+PASSWORD+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+PATTERN_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_EMAIL = INPUT_TYPE_IS+EMAIL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_URL      = INPUT_TYPE_IS+URL+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_NUMBER = INPUT_TYPE_IS+TEXT+'" '+ID_SUB+NAME_SUB+VALUE_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+
                      HIDDEN_SUB+CLASS_SUB+PATTERN_SUB+' />',
    ELEMENT_RADIO = INPUT_TYPE_IS+RADIO+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+CHECKED_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_CHECKBOX = INPUT_TYPE_IS+CHECKBOX+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DISABLED_SUB+READONLY_SUB+CHECKED_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+' />',
    ELEMENT_HIDDEN = INPUT_TYPE_IS+HIDDEN+'" '+ID_SUB+NAME_SUB+VALUE_SUB+' />',
    ELEMENT_TEXTAREA = '<'+TEXTAREA+' '+ID_SUB+NAME_SUB+PLACEHOLDER_SUB+DISABLED_SUB+REQUIRED_SUB+READONLY_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+'>'+VALUE_SUB+'</'+TEXTAREA+'>',
    ELEMENT_WIDGET = VALUENONSWITCHED_SUB+'<'+DIV+' '+ID_SUB+NAME_SUB+HIDDEN_SUB+DATA_SUB+FOCUSABLE_SUB+CLASS_SUB+'></'+DIV+'>'+VALUESWITCHED_SUB,
    ELEMENT_BUTTON = BUTTON_TYPE_IS+TYPE_SUB+'" '+ID_SUB+NAME_SUB+VALUE_SUB+DATA_SUB+FOCUSABLE_SUB+HIDDEN_SUB+CLASS_SUB+'>'+LABELHTML_SUB+'</'+BUTTON+'>',
    ELEMENT_DATE = VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+HIDDEN_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+DATE+'"'+DATA_SUB+FOCUSABLE_SUB+CLASS_SUB+'><i '+CLASS+'="'+ICON_DATE_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB,
    ELEMENT_TIME = VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+HIDDEN_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+TIME+'"'+DATA_SUB+FOCUSABLE_SUB+CLASS_SUB+'><i '+CLASS+'="'+ICON_TIME_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB,
    ELEMENT_DATETIME = VALUENONSWITCHED_SUB+BUTTON_TYPE_IS+BUTTON+'" '+ID_SUB+NAME_SUB+VALUE_SUB+HIDDEN_SUB+REQUIRED_SUB+DATA_LABEL_DATETIME+READONLY_SUB+
                   ' '+DATA_DATETIME+'"'+DATETIME+'"'+DATA_SUB+FOCUSABLE_SUB+CLASS_SUB+'><i '+CLASS+'="'+ICON_DATETIME_CLASS+'"></i></'+BUTTON+'>'+VALUESWITCHED_SUB,

    TEMPLATES = {
        widget: ELEMENT_WIDGET,
        plain: ELEMENT_PLAIN,
        text: ELEMENT_TEXT,
        password: ELEMENT_PASSWORD,
        email: ELEMENT_EMAIL,
        url: ELEMENT_URL,
        number: ELEMENT_NUMBER,
        radio: ELEMENT_RADIO,
        checkbox: ELEMENT_CHECKBOX,
        hidden: ELEMENT_HIDDEN,
        textarea: ELEMENT_TEXTAREA,
        button: ELEMENT_BUTTON,
        reset: ELEMENT_BUTTON,
        submit: ELEMENT_BUTTON,
        date: ELEMENT_DATE,
        time: ELEMENT_TIME,
        datetime: ELEMENT_DATETIME
    },
    GETFORMATTED_DATEVALUE = function(type, name, value, format, classname, hiddenstring, hideatstartup, buttonnodeid) {
        var className = classname ? (' '+classname) : '',
            invisibleStarup = (hideatstartup ? (' '+INVISIBLE_CLASS) : ''),
            formattimename = ((typeof name === 'string') && (name.length>0)) ? (' formattime-'+name) : '';
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
        return SPANCLASSISFORMAT+'value'+formattimename+className+invisibleStarup+'" data-for="'+buttonnodeid+'"'+className+hiddenstring+'>'+Y.Date.format(value, {format: format})+ENDSPAN;
    },
    DATETIME_TYPES = { // proper date/time-formelement types
        date: true,
        time: true,
        datetime: true
    },
    FULLSELECT_TYPES = { // formelement types that are allowed to be full selected
        text: true,
        number: true,
        password: true,
        textarea: true,
        email: true,
        url: true
    },
    BUTTONS_TYPES = { // button-formelement types
        button: true,
        submit: true,
        reset: true
    },
    RADIO_CHECKBOX_TYPES = { // radio and checkbox-formelement types
        radio: true,
        checkbox: true
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
 *     <li>plain</li>
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
 * @param [config] {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the ITSAFormElement.
 *   @param [config.labelHTML] {String} only valid for non 'datetime'-buttons.
 *   @param [config.checked=false] {Boolean} only valid for checkboxes and radiobuttons.
 *   @param [config.classname] {String} additional classname for the html-element or widget.
 *   @param [config.data] {String} for extra data-attributes, f.i. data: 'data-someinfo="somedata" data-moreinfo="moredata"'.
 *   @param [config.digits=false] {Boolean} for floating numbers: only valid for type==='number'.
 *   @param [config.disabled=false] {Boolean}
 *   @param [config.focusable=true] {Boolean} adds an extra attribute 'focusable' which can be used as a selector by the FocusManager. Also applyable for Widgets.
 *   @param [config.format] {String} Date-format: only valid for type==='date', 'time' or 'datetime'.
 *   @param [config.fullselect=false] {Boolean} selects all text when focussed --> only valid for input-elements and textarea.
 *   @param [config.hidden=false] {Boolean}
 *   @param [config.initialfocus=false] {Boolean} makes this the first item that gets focus when the container gets focus.
 *   @param [config.label] {String} can by used for all elements (including Widgets and date-time), except for buttons.
 *   @param [config.labelClassname] {String} additional classname for the label. Can by used for all elements (including Widgets and date-time), except for buttons.
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
 *   @param [config.tooltip] {String} marks the data-attribute used by Y.Tipsy. Also applyable for Widgets.
 *   @param [config.tooltipinvalid] {String} marks the data-attribute used by Y.Tipsy in case of invalid data. Also applyable for Widgets. External routine should
 *           set this data (available as 'data-contentinvalid') into 'data-content' once invalid and replace it with 'data-contentvalid' once valid again.
 *   @param [config.value] {String} the value of the element.
 * @param [nodeid] {String} The unique id of the node (without the '#'). When not supplied, Y.guid() will generate a random one.
 * @return {object} with the folowwing proprties:<ul>
 *                  <li>config --> {object} reference to the original configobject</li>
 *                  <li>html   --> {String} rendered Node which is NOT part of the DOM! Must be inserted manually, or using Y.ITSAFormModel</li>
 *                  <li>name   --> {String} convenience-property===config.name</li>
 *                  <li>nodeid --> {String} created node's id (without #)</li>
 *                  <li>type   --> {String|WidgetClass} the created type - passed as the first parameter</li>
 *                  <li>widget --> {Widget-instance}handle to the created widgetinstance</li></ul>
 * @since 0.1
*/
ITSAFormElement.getElement = function(type, config, nodeid) {
    Y.log('getElement', 'info', 'ITSAFormElement');
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
 * @param config {Object} The config-attributes for the element which is passed through to the <b>Attributes</b> of the ITSAFormElement.
 * @param nodeid {String} The unique id of the node (without the '#').
 * @param [iswidget] {Boolean} whether the element is a widget
 * @return {String} rendered Node which is NOT part of the DOM yet! Must be inserted into the DOM manually, or through Y.ITSAFORM
 * @since 0.1
*/
ITSAFormElement._renderedElement = function(type, config, nodeid, iswidget) {
    Y.log('_renderedElement '+type, 'info', 'ITSAFormElement');
    var subtituteConfig = Y.merge(config),
        switchlabel = (typeof subtituteConfig[SWITCHLABEL]===BOOLEAN) ? subtituteConfig[SWITCHLABEL] : false,
        focusable = (typeof subtituteConfig[FOCUSABLE]===BOOLEAN) ? subtituteConfig[FOCUSABLE] : true,
        fullselect = (typeof subtituteConfig[FULLSELECT]===BOOLEAN) ? subtituteConfig[FULLSELECT] : false,
        hideatstartup = (typeof subtituteConfig[HIDEATSTARTUP]===BOOLEAN) ? subtituteConfig[HIDEATSTARTUP] : false,
        tooltip = config.tooltip,
        tooltipinvalid = config.tooltipinvalid,
        nossl = config.nossl,
        onlyssl = config.onlyssl,
        digits = config.digits,
        value = config[VALUE],
        modelattribute = config[MODELATTRIBUTE],
        switchvalue = config[SWITCHVALUE],
        configdata = config[DATA],
        data = DATA_FORM_ELEMENT, // always initialize
        isdatetime = DATETIME_TYPES[type],
        labelclass, disabledbutton, primarybutton, template, surroundlabelclass, hidden, disabled, required,
        checked, purebutton, readonly, extralabel;
    // first setting up global data-attributes
/*jshint expr:true */
    configdata && (data+=' '+configdata);
    modelattribute && (data+=' data-'+MODELATTRIBUTE+'="true"');
    subtituteConfig[DATA] = data;
    if (tooltip) {
        tooltip = tooltip.replace(/"/g, '\'\''),
        subtituteConfig[DATA] += ' data-content="'+tooltip+'" data-contentvalid="'+tooltip+'"';
    }
    tooltipinvalid && (typeof tooltipinvalid === 'string') && (tooltipinvalid.length>0) && (subtituteConfig[DATA] += ' data-contentinvalid="'+tooltipinvalid.replace(/"/g, '\'\'')+'"');
    config[INITIALFOCUS] && (subtituteConfig[DATA] += ' data-'+INITIALFOCUS+'="true"');
    config[NAMEDEF] && (subtituteConfig[NAMEDEF]=' '+NAMEDEF+'="'+subtituteConfig[NAMEDEF]+'"');
    hidden = (typeof config[HIDDEN]===BOOLEAN) ? config[HIDDEN] : false;
    subtituteConfig[HIDDEN] = hidden ? (' '+HIDDEN+'="'+HIDDEN+'"') : '';
/*jshint expr:false */
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++ specific widget formatting ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (iswidget) {
        subtituteConfig[DATA] += ' data-type="'+type+'"';
        subtituteConfig[CLASS]=' class="'+(config[CLASSNAME] || '') + ' ' + WIDGET_PARENT_CLASS + (hideatstartup ? (' '+INVISIBLE_CLASS) : '') + '"';
        if (config[LABEL]) {
            subtituteConfig[LABELDATA] = subtituteConfig[LABELDATA] || '';
            subtituteConfig[LABELDATA] += ' data-widgetlabel="true"';
        }
        subtituteConfig[FOCUSABLE] = focusable ? (' data-'+FOCUSABLE+'="true"') : '';
        if (type==='slider') {
            // we want the value visible inside a span
            subtituteConfig[switchvalue ? VALUESWITCHED : VALUENONSWITCHED] = SPANCLASSISFORMAT+'value formatslider-'+config.name+(config[CLASSNAME] ? (' '+config[CLASSNAME]) : '')+
                                                                              '" data-for="'+nodeid+'"'+subtituteConfig[HIDDEN]+'>'+value+ENDSPAN;
        }
        // now make sure we get the right 'template', by re-defining 'type'
        type = WIDGET;
    }
    else {
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ non-widget formatting +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        disabled = (typeof subtituteConfig[DISABLED]===BOOLEAN) ? subtituteConfig[DISABLED] : false;
        required = !config['remove'+REQUIRED] && ((typeof subtituteConfig[REQUIRED]===BOOLEAN) ? subtituteConfig[REQUIRED] : (type===PASSWORD));
        readonly = (typeof subtituteConfig[READONLY]===BOOLEAN) ? subtituteConfig[READONLY] : false;
/*jshint expr:true */
        subtituteConfig[FOCUSABLE] = focusable ? (' data-'+FOCUSABLE+'="true"') : '';
        subtituteConfig[DISABLED] = disabled ? (' '+DISABLED+'="'+DISABLED+'"') : '';
        subtituteConfig[REQUIRED] = required ? (' '+REQUIRED+'="'+REQUIRED+'"') : '';
        subtituteConfig[READONLY] = readonly ? (' '+READONLY+'="'+READONLY+'"') : '';
        config[PLACEHOLDER] && (subtituteConfig[PLACEHOLDER]=' '+PLACEHOLDER+'="'+subtituteConfig[PLACEHOLDER]+'"');
        config[PATTERN] && (subtituteConfig[PATTERN]=' '+PATTERN+'="'+subtituteConfig[PATTERN]+'"');
        (type!==TEXTAREA) && (type!==PLAIN) && value && (subtituteConfig[VALUE]=' '+VALUE+'="'+subtituteConfig[VALUE]+'"');
/*jshint expr:false */

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific email formatting +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (type===EMAIL) {
            // redefine pattern
            subtituteConfig[PATTERN] = ' '+PATTERN+'="'+PATTERN_EMAIL+'"';
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific url formatting +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (type===URL) {
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

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific number formatting ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (type===NUMBER) {
            subtituteConfig[PATTERN] =' '+PATTERN+'="'+(((typeof digits===BOOLEAN) && digits) ? PATTERN_FLOAT : PATTERN_INTEGER)+'"';
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific radio and checkbox formatting ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (RADIO_CHECKBOX_TYPES[type]) {
            surroundlabelclass = (type===RADIO) ? PURERADIO : PURECHECKBOX;
            checked = (typeof subtituteConfig[CHECKED]===BOOLEAN) ? subtituteConfig[CHECKED] : false;
            subtituteConfig[CHECKED] = checked ? (' '+CHECKED+'="'+CHECKED+'"') : '';
            subtituteConfig[DISABLED] = disabled ? (' '+DISABLED+'="'+DISABLED+'"') : '';
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific button/submit/reset formatting +++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (BUTTONS_TYPES[type]) {
            delete subtituteConfig[LABEL]; // not allowed for buttons
            purebutton = true;
            subtituteConfig[TYPE] = type;
            subtituteConfig[DATA] += ' data-'+BUTTON+TYPE+'="'+(config[BUTTON+TYPE] || type)+'"';
            primarybutton = config.primary;
            disabledbutton = disabled;
/*jshint expr:true */
            config[LABELHTML] || (subtituteConfig[LABELHTML]=(value||type));
            subtituteConfig[VALUE] || (subtituteConfig[VALUE] = ' '+VALUE+'="'+Y.Escape.html(subtituteConfig[LABELHTML])+'"');
/*jshint expr:false */
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ specific datetime formatting ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (isdatetime) {
/*jshint expr:true */
            Lang.isDate(value) || (value = new Date());
/*jshint expr:false */
            purebutton = true;
            disabledbutton = disabled;
            subtituteConfig[VALUE] = ' value="'+value.getTime()+'"';
            subtituteConfig[DATA] += ' data-'+DATETIME+'picker="true"';
            subtituteConfig[switchvalue ? VALUESWITCHED : VALUENONSWITCHED] = GETFORMATTED_DATEVALUE(type, (config.name || ''), value, subtituteConfig.format,
                                                                                                     config[CLASSNAME], subtituteConfig[HIDDEN], hideatstartup, nodeid);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++ ITSAFormModel uses own pattern instead of pattern by the element ++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (config.removepattern && subtituteConfig[PATTERN]) {
             // don't want pattern but want the pattern as a node-data-attribute --> this prevents the browser to focus unmatched patterns
             subtituteConfig[DATA] += ' data-'+PATTERN+'='+subtituteConfig[PATTERN].substr(9);
             delete subtituteConfig[PATTERN];
        }

/*jshint expr:true */
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        fullselect && FULLSELECT_TYPES[type] && (subtituteConfig[DATA] += ' data-'+FULLSELECT+'="true"');
        (config[CLASSNAME] || purebutton || hideatstartup || isdatetime) && (subtituteConfig[CLASS]=' class="'+(isdatetime ? '' : (config[CLASSNAME] || ''))+
                                (purebutton ? (' '+PUREBUTTON_CLASS) : '')+
                                (isdatetime ? (' '+ITSABUTTON_DATETIME_CLASS) : '')+
                                (disabledbutton ? (' '+DISABLED_BUTTON_CLASS) : '')+
                                (primarybutton ? (' '+PRIMARY_BUTTON_CLASS) : '')+
                                (hideatstartup ? (' '+INVISIBLE_CLASS) : '')+
                                '"');
/*jshint expr:false */
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++ creating template +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    template = TEMPLATES[type] || ELEMENT_UNDEFINED;

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++ creating label ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (subtituteConfig[LABEL]) {
        if (surroundlabelclass) {
            subtituteConfig[LABEL] = '<span class="formatlabel">' + subtituteConfig[LABEL] + ENDSPAN;
            labelclass = ' class="'+surroundlabelclass+(config[LABELCLASSNAME] ? (' '+config[LABELCLASSNAME]) : '') + '"';
            template = LABEL_FOR_IS+'{id}"'+HIDDEN_SUB+LABELDATA_SUB+labelclass+'>'+(switchlabel ? (template+'{label}') : ('{label}'+template))+ENDLABEL_EL;
        }
        else {
            labelclass = config[LABELCLASSNAME] ? (' class="'+config[LABELCLASSNAME] + '"') : '';
            extralabel = (isdatetime ? ('<'+LABEL) : (LABEL_FOR_IS+'{id}"'))+HIDDEN_SUB+LABELDATA_SUB+labelclass+'>{label}'+ENDLABEL_EL;
            if (switchlabel) {
                template += extralabel;
            }
            else {
                template = extralabel+template;
            }
        }
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++ set nodeid ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    subtituteConfig.id=nodeid;

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++ return result +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    return SUB(template, subtituteConfig);
};

// Now create two Y.Tipsy instances which will be used to show popover-content
// because the tipsy-instances should not be present staight ahead (the user must focus the element),
// we delay and making pagerendering speedup.
//
// However, there might be situations where you need to know is tipsy is ready, for example if you focus an element with JS
// and need to be sure that tipsy pops up. For those cases, there is the promise tooltipReadyPromise()

/**
 * Promise that fulfills as soon as the Tipsy-tooltip is rendered. Because it is rendered asynchroniously. <br />
 * This might be neede if you focus an element with JS and need to be sure that the tooltip will pop up.
 *
 * @method tooltipReadyPromise
 * @return {Promise} fulfills as soon as the Tipsy-tooltip is reendered.
 * @since 0.2
*/
ITSAFormElement.tooltipReadyPromise = function() {
    if (!ITSAFormElement._tooltipreadypromise) {
        ITSAFormElement._tooltipreadypromise = new Y.Promise(function (resolve, reject) {
            tipsyOK = new Y.Tipsy({
                placement: 'right',
                selector: '[data-formelement][data-content]:not([data-valid="false"])',
                showOn: ['touchstart', 'focus'],
                hideOn: ['touchend', 'blur', 'keypress']
            }).render();
            tipsyInvalid = new Y.Tipsy({
                placement: 'right',
                selector: '[data-formelement][data-content][data-valid="false"]',
                showOn: ['touchstart', 'focus'],
                hideOn: ['touchend', 'blur', 'keypress']
            }).render();
            tipsyOK.get('boundingBox').addClass('tipsy-formelement');
            tipsyInvalid.get('boundingBox').addClass('tipsy-formelement-invalid');
            Y.batch(
                tipsyOK.renderPromise(),
                tipsyInvalid.renderPromise()
            )
            .then(
                resolve,
                reject
            );
        });
    }
    return ITSAFormElement._tooltipreadypromise;
};

// force making promise ready after 0.5 seconds:
Y.later(500, null, ITSAFormElement.tooltipReadyPromise);

// listen to focus-events on input and textarea-items
BODY.delegate(
    'focus',
    function(e) {
        var node = e.target,
            fullselection = (node.getAttribute(DATA+'-'+FULLSELECT)==='true'),
            camefromtap;
/*jshint expr:true */
        // in case of 'input', default action would be that the content is fully selected. We suppress this:
        !fullselection && node.test('input') && e.preventDefault();
/*jshint expr:false */
        // because the behavious or selecting/cursor-to-end MUST NOT happen on a mouseclick or tap,
        // we need to make extra precautions. This is needed, because the tap-event occurs AFTER the focus-event.
        // Thus, we delay to make sure we take action after a tap-event might have been occurred

        camefromtap = node.getData(ACTION_FROMTAB);
        Y.ITSAFormElement._activeNode = node;
        if (camefromtap) {
            node.clearData(ACTION_FROMTAB);
        }
        else {
            if (fullselection) {
                node.select();
            }
            else {
                node.set('selectionStart', node.get('value').length);
                // set 'scrollTop' high to make Chrome scroll the last character into view
                node.set('scrollTop', 999999);
            }
        }
    },
    function(node, evt){
        var targetnode = evt.target;
        return (node===targetnode) && targetnode.test('input[type=text],input[type=password],input[type=url],input[type=email],textarea');
    }
);

// listen to focus-events on input and textarea-items
BODY.delegate(
    'mousedown',
    function(e) {
        var node = e.target;
/*jshint expr:true */
        (Y.ITSAFormElement._activeNode !== node) && node.setData(ACTION_FROMTAB, true);
/*jshint expr:false */
    },
    function(node, evt){
        var targetnode = evt.target;
        return (node===targetnode) && targetnode.test('input[type=text],input[type=password],input[type=url],input[type=email],textarea');
    }
);

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

YArray.each(
    [DATE, TIME, DATETIME],
    function(eventtype) {
        var conf = {
            on: function (node, subscription, notifier) {
                // To make detaching easy, a common pattern is to add the subscription
                // for the supporting DOM event to the subscription object passed in.
                // This is then referenced in the detach() method below.
                subscription._handle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    // do not compare with variabele BUTTON, because that one is lowercase
                    if (targetNode && (targetNode.get('tagName')!=='BUTTON')) {
                        targetNode = targetNode.get('parentNode');
                        e.target = targetNode;
                    }
                    if (targetNode && (targetNode.getAttribute(DATA+'-'+DATETIME)===eventtype)) {
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
            }
        };
        conf.delegate = conf.on;
        conf.detachDelegate = conf.detach;
        Y.Event.define(eventtype+PICKER+CLICK, conf);
    }
);

// Define synthetic events 'submitclick' and 'resetclick':

/**
  * Node-event fired when the submitbutton is clicked. This is not the same as the 'submit'-event because the latter
  * gets fired on a form-submit.
  *
  * @event Y.Node.submit:click
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the resetbutton is clicked. This is not the same as the 'reset'-event because the latter
  * gets fired on a form-reset.
  *
  * @event Y.Node.reset:click
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

YArray.each(
    [SUBMIT, RESET],
    function(eventtype) {
        var conf = {
            on: function (node, subscription, notifier) {
                // To make detaching easy, a common pattern is to add the subscription
                // for the supporting DOM event to the subscription object passed in.
                // This is then referenced in the detach() method below.
                subscription._handle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    // It could be that targetNode is an innerNode of the button! (in case of imagebuttons) --> we do a 1 level up check:
                    if (targetNode && (targetNode.get('tagName')!=='BUTTON')) {
                        targetNode = targetNode.get('parentNode');
                        e.target = targetNode;
                    }
                    if (targetNode && ((targetNode.getAttribute(DATA_BUTTON_TYPE)===eventtype) ||
                        ((targetNode.getAttribute(DATA_BUTTON_TYPE)===BUTTON) && (targetNode.getAttribute(DATA_BUTTON_SUBTYPE)===eventtype)))) {
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
            }
        };
        conf.delegate = conf.on;
        conf.detachDelegate = conf.detach;
        Y.Event.define(eventtype+':'+CLICK, conf);
    }
);


}, '@VERSION@', {
    "requires": [
        "yui-base",
        "datatype-date-format",
        "event-synthetic",
        "yui-later",
        "promise",
        "event-tap",
        "event-custom",
        "escape",
        "gallery-tipsy",
        "gallery-itsawidgetrenderpromise"
    ],
    "skinnable": true
});
