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
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].code=["YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {","","'use strict';","","/**"," *"," * Class ITSADateTimePicker"," *"," *"," * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />"," * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both."," *"," * @module gallery-itsadatetimepicker"," * @extends Base"," * @class ITSADateTimePicker"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YNode = Y.Node,","    YArray = Y.Array,","    WIDGET_CLASS = 'itsa-datetimepicker',","    LOADING_CLASS = WIDGET_CLASS + '-loading',","    UNCLOSABLE_CLASS = WIDGET_CLASS + '-unclosable',","    PANEL_CLASS = WIDGET_CLASS + '-panel',","    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',","    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,","                        // We don't need to slower things down during startup.","    CALENDAR_ID = WIDGET_CLASS + '-datepicker',","    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',","    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',","    HEADERCONTENT_DATE = 'Select date',","    HEADERCONTENT_DATETIME = 'Select date and time',","    HEADERCONTENT_TIME = 'Select time',","","    YUI3BUTTON_CLASS = 'yui3-button',","    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',","    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',","    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',","","    BUTTON_DATE = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATE_CLASS+'\"></span></button>',","    BUTTON_DATETIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATETIME_CLASS+'\"></span></button>',","    BUTTON_TIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_TIME_CLASS+'\"></span></button>',","","    EVENT_DATEPICKER = '_datetimepicker:',","    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',","    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',","    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',","","    DEFAULT_CONFIG = {","        titleDate: HEADERCONTENT_DATE,","        titleDateTime: HEADERCONTENT_DATETIME,","        titleTime: HEADERCONTENT_TIME,","        alignToNode: null,","        modal: false,","        dragable: false,","        forceSelectdate: false,","        minTime: '00:00',","        maxTime: '24:00',","        timeFormat: '%H:%M',","        resetStr: 'Reset',","        tooltipHandle: 'Drag to set time',","        selectOnRelease: true,","        customRenderer: {},","        showPrevMonth: false,","        showNextMonth: false,","        headerRenderer: '%B %Y',","        minimumDate: null,","        maximumDate: null,","        enabledDatesRule: null,","        disabledDatesRule: null","    },","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    };","","//===============================================================================================","","Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {","","        /**","         * Reference to the Y.Panel-instance","         * @property panel","         * @default null","         * @type Y.Panel","         * @since 0.1","        */","        panel : null,","","        /**","         * Reference to the Y.Calendar-instance","         * @property calendar","         * @default null","         * @type Y.Calendar","         * @since 0.1","        */","        calendar : null,","","        /**","         * Reference to the Y.Dial-instance","         * @property timedial","         * @default null","         * @type Y.Dial","         * @since 0.1","        */","        timedial : null,","","        /**","         * Internal reference to the closebutton.","         * @property _closebutton","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _closebutton : null,","","        /**","         * Internal reference to the dialhandle-Node.","         * @property _dialHandle","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _dialHandle : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","         * @since 0.1","        */","        _eventhandlers : [],","","        /**","         * Internal reference to the timerobject that is used to delay the rendering.","         * @property _panelRendererDelay","         * @private","         * @default null","         * @type Object","         * @since 0.1","        */","        _panelRendererDelay : null,","","        /**","         * Internal reference to the resetnode.","         * @property _resetNode","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _resetNode : null,","","        /**","         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.","         * @property _timeFormat","         * @private","         * @default null","         * @type String","         * @since 0.1","        */","        _timeFormat : null,","","        /**","         * Reference to the Node inside Y.Dial-instance that draws the selected time.","         * @property _timeNode","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _timeNode : null,","","        /**","         * Internal backupstate of getTime()'s config.selectOnRelease.","         * @property _timepickerSelectOnRelease","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _timepickerSelectOnRelease : null,","","        /**","         * Internal state of the picker to be closable or not","         * @property _unclosable","         * @private","         * @default null","         * @type Boolean","         * @since 0.1","        */","        _unclosable : null,","","        /**","         * Reference to Y.one('window')","         * @property _window","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _window : null,","","        /**","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this;","","            instance._window = Y.one('window');","            instance._renderUI();","            instance._bindUI();","            Y.one('body').removeClass(LOADING_CLASS);","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method dateNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.","         * @since 0.1","        */","        dateNode : function() {","            return YNode.create(BUTTON_DATE);","        },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method datetimeNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.","         * @since 0.1","        */","        datetimeNode : function() {","            return YNode.create(BUTTON_DATETIME);","        },","","        /**","         * Picks a date using a pop-up Calendar.","         *","         * @method getDate","         * @param {Date} [initialDate] Date-object that holds the initial date-time for the picker. If not set, then the current date-time is used.","         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Date-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDate : function(initialDate, config) {","            var instance = this,","                promise;","","            instance._saveShow(1, initialDate, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTDATE,","                        function(e) {","                            rejecthandler.detach();","                            var selectedDate = e.newDate;","                            selectedDate.setMilliseconds(0);","                            selectedDate.setSeconds(0);","                            selectedDate.setMinutes(0);","                            selectedDate.setHours(0);","                            instance.hide();","                            resolve(selectedDate);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // picker will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Picks a date+time using a pop-up Calendar+Dial.","         *","         * @method getDateTime","         * @param {Date} [initialDateTime] Date-object that holds the initial values for the picker. If not set then the current date-time is used.","         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] The node that causes the panel to appear. When set, the picker is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.timeformat] Format of the timestring inside the Dial-instance","         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)","         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the DateTime-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDateTime : function(initialDateTime, config) {","            var instance = this,","                promise;","","            config = config || {};","            config.selectOnRelease = false;","            instance._saveShow(2, initialDateTime, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var selectedDateTime = instance.calendar.get('selectedDates')[0],","                                timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours);","                            selectedDateTime.setMilliseconds(0);","                            selectedDateTime.setSeconds(0);","                            selectedDateTime.setMinutes(newMinutes);","                            selectedDateTime.setHours(newHours);","                            instance.hide();","                            resolve(selectedDateTime);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // picker will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            instance._toggleTimePicker(false, false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Picks a time using a pop-up Dial.","         *","         * @method getTime","         * @param {Date} [initialTime] Date-object that holds the initial values for the picker. If not set, then the current date-time is used.","         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] The node that causes the panel to appear. When set, the picker is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.timeformat] Format of the timestring inside the Dial-instance","         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)","         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)","         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Time-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getTime : function(initialTime, config) {","            var instance = this,","                promise;","","            instance._saveShow(3, initialTime, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours),","                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);","                            instance.hide();","                            resolve(selectedTime);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // picker will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance._toggleTimePicker(false, false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method timeNode","         * @return {Y.Node} Node of the type 'button' with a timeicon inside.","         * @since 0.1","        */","        timeNode : function() {","            return YNode.create(BUTTON_TIME);","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor: function() {","            var instance = this;","","            instance._clearEventhandlers();","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","            }","            instance.timedial.destroy();","            instance.calendar.destroy();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method _bindUI","         * @private","         * @protected","         * @since 0.1","         */","        _bindUI: function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                panel = instance.panel;","","            panel.onceAfter(","                'render',","                function() {","                    var boundingBox = panel.get('boundingBox'),","                        closebutton;","                    instance._closebutton = closebutton = boundingBox.one('.yui3-button-close');","                    eventhandlers.push(","                        closebutton.on(","                            'click',","                            function() {","                                /**","                                * Fired when the Panel is closed without saving the values.","                                * No need to listen to --> the promises are using this event internally.","                                *","                                * @event _datetimepicker:cancel","                                * @private","                                * @since 0.1","                                */","                                if (!instance._unclosable) {","                                    instance.hide();","                                }","                            }","                        )","                    );","                    eventhandlers.push(","                        Y.on(","                            'keydown',","                            function(e) {","                                if ((e.keyCode === 27) && !instance._unclosable && instance.panel.get('focused')) { // escape","                                    instance.hide();","                                }","                            }","                        )","                    );","                    instance._fillPanel();","                }","            );","            instance._panelRendererDelay = Y.later(","                RENDERDELAY,","                instance,","                function() {","                    instance._panelRendererDelay = null;","                    panel.render();","                }","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","        */","        _clearEventhandlers : function() {","            var eventhandlers = this._eventhandlers;","","            YArray.each(","                eventhandlers,","                function(item){","                    item.detach();","                }","            );","            eventhandlers.length = 0;","        },","","        /**","         * Creates (renderes) the Y.Dial-instance that is used for selecting times.","         *","         * @method _createTimeDial","         * @private","         * @since 0.1","        */","        _createTimeDial : function() {","            var instance = this,","                contentBox = instance.panel.get('contentBox'),","                timedial;","","            instance.timedial = timedial = new Y.Dial({","                min:0,","                max:1440,","                stepsPerRevolution: 720,","                value: 0","            });","            timedial.onceAfter(","                'render',","                function() {","                    instance._timeNode = contentBox.one('.yui3-dial-label-string');","                    instance._resetNode = contentBox.one('.yui3-dial-reset-string');","                    instance._dialHandle = contentBox.one('.yui3-dial-handle');","                    instance._eventhandlers.push(","                        timedial._dd1.on(","                            'drag:end',","                            instance._afterDialChange,","                            instance","                        )","                    );","                }","            );","            timedial.render(contentBox.one('#'+TIMEDIAL_ID));","            instance._eventhandlers.push(","                timedial.after(","                    'valueChange',","                    function(e) {","                        var newVal = parseInt(e.newVal, 10),","                            newHours = Math.floor(newVal/60),","                            newMinutes = newVal - (60*newHours),","                            timeNode = instance._timeNode;","                        timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));","                        timeNode.addClass(TIME_CHANGED_CLASS);","                    }","                )","            );","        },","","        _afterDialChange : function() {","            var instance = this;","","            if (instance._timepickerSelectOnRelease) {","                Y.fire(EVENT_SELECTBUTTON);","            }","        },","","        /**","         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _createCalendar : function() {","            var instance = this;","","            instance.calendar = new Y.Calendar({","                height:'250px',","                width:'250px',","                showPrevMonth: true,","                showNextMonth: true,","                visible: false,","                date: new Date()","            });","            instance._eventhandlers.push(","                instance.calendar.on(","                    'dateClick',","                    Y.rbind(instance._calendarNewDate, instance)","                )","            );","            instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));","        },","","        /**","         * Fires an event with the new selected Date.","         *","         * @method _calendarNewDate","         * @param {EventFacade} e","         * @private","         * @since 0.1","        */","        _calendarNewDate : function(e) {","            var instance = this,","                newdate;","","            // only if the calendar is visible --> there is also a new date set before showing up!","            if (instance.calendar.get('visible')) {","                newdate = e.date;","                /**","                * Fired when a new Date is selected from the Panel's Calendar-instance.","                * No need to listen to --> the promises are using this event internally.","                *","                * @event _datetimepicker:selectdate","                * @param {Date} newDate the selected date","                * @private","                * @since 0.1","                */","                Y.fire(EVENT_SELECTDATE, {newDate: newdate});","            }","        },","","        /**","         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _fillPanel : function() {","            var instance = this,","                panel = instance.panel,","                boundingBox = panel.get('boundingBox'),","                selectButton;","","            boundingBox.addClass(PANEL_CLASS);","            instance._createCalendar();","            instance._createTimeDial();","            selectButton = {","                value : 'Select',","                action: function(e) {","                    e.preventDefault();","                    /**","                    * Fired when new values are selected by the Panel by pressing the 'Select'-button","                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)","                    * No need to listen to --> the promises are using this event internally.","                    *","                    * @event _datetimepicker:selected","                    * @private","                    * @since 0.1","                    */","                    Y.fire(EVENT_SELECTBUTTON);","                },","                section: Y.WidgetStdMod.FOOTER","            };","            panel.addButton(selectButton);","        },","","        /**","         * Hides the picker-instance and will make the Promise to be rejected.","         *","         * @method hide","         * @param [force] {Boolean} Force closing, even when config.forceSelectdate is set to true","         * @since 0.1","        */","        hide : function(force) {","            var instance = this;","","            force = Lang.isBoolean(force) && force;","            if (instance.panel.get('visible') && (force || !instance._unclosable)) {","                instance.calendar.hide();","                instance._toggleTimePicker(false, false);","                instance.panel.hide();","                Y.fire(EVENT_CANCEL);","            }","         },","","        /**","         * Renderes the time in the right format (stored inside the property '_timeFormat')","         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}","         *","         * @method _calendarNewDate","         * @param {Int} hours","         * @param {Int} minutes","         * @private","         * @since 0.1","        */","        _renderDialTime : function(hours, minutes) {","            var instance = this,","                time = new Date(1900, 0, 1, hours, minutes, 0, 0);","","            return Y.Date.format(time, {format: instance._timeFormat});","        },","","        /**","         * Renderes the Picker-panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.","         *","         * @method _renderUI","         * @private","         * @protected","         * @since 0.1","         */","        _renderUI: function() {","            var instance = this;","","            instance.panel = new Y.Panel({","                zIndex: 15000,","                modal   : false,","                visible: false,","                render  : false, // we will render after some delaytime, specified with RENDERDELAY","                fillHeight: null,","                hideOn: [],","                bodyContent : '<div id=\"'+CALENDAR_ID+'\"></div><div id=\"'+TIMEDIAL_ID+'\"></div>'","            });","        },","","        /**","         * Will call _show() but only if the picker-panel is rendered. If not, than it will wait for the rendering to be finished.","         *","         * @method _saveShow","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial values for the picker. If not set then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the picker.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)","         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)","         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _saveShow : function(modus, initialDateTime, config) {","            var instance = this,","                panel = instance.panel;","","            if (panel.get('rendered')) {","                instance._show(modus, initialDateTime, config || {});","            }","            else {","                panel.onceAfter(","                    'render',","                    function() {","                        instance._show(modus, initialDateTime, config || {});","                    }","                );","            }","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","                panel.render();","            }","        },","","        /**","         * Shows the picker-instance, ready to select a date and/or time.","         *","         * @method _show","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial values for the picker. If not set then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the picker.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'","         * @param {String} [config.timeformat] Format of the rendered timestring","         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)","         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)","         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _show : function(modus, initialDateTime, config) {","            var instance = this,","                panel = instance.panel,","                presentedDate = initialDateTime || new Date(),","                timeNode = instance._timeNode,","                userConfig = Y.merge(instance.get('defaultConfig'), config),","                timedial = instance.timedial,","                calendar = instance.calendar,","                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours,","                dialvalue, minPanelWidth, alignToNode, minTime, maxTime, minTimeValue, maxTimeValue, timesplitArray,","                minMinutes, maxMinutes, minHours, maxHours;","","            alignToNode = userConfig.alignToNode;","            if (panel.get('visible')) {","                // previous picker is up --> we need to reject the promise by firing an EVENT_CANCEL-event:","                instance.hide();","            }","            if (modus<3) {","                calendar.deselectDates();","                calendar.selectDates(presentedDate);","                calendar.set('date', presentedDate);","                if (Lang.isObject(config)) {","                    // Only accept limited properties. Also reset to default on new requests","                    calAttrs = {","                        customRenderer: userConfig.customRenderer,","                        showPrevMonth: userConfig.showPrevMonth,","                        showNextMonth: userConfig.showNextMonth,","                        headerRenderer: userConfig.headerRenderer,","                        minimumDate: userConfig.minimumDate,","                        maximumDate: userConfig.maximumDate,","                        enabledDatesRule: userConfig.enabledDatesRule,","                        disabledDatesRule: userConfig.disabledDatesRule","                    };","                    calendar.setAttrs(calAttrs);","                }","                calendar.show();","            }","            else {","                calendar.hide();","            }","            if (modus>1) {","                instance._resetNode.setHTML(userConfig.resetStr);","                instance._dialHandle.setAttribute('title', userConfig.tooltipHandle);","                instance._timeFormat = userConfig.timeFormat;","                minTime = userConfig.minTime;","                maxTime = userConfig.maxTime;","                if (typeof minTime === 'string') {","                    timesplitArray = minTime.split(':');","                    if (timesplitArray.length===2) {","                        minHours = parseInt(timesplitArray[0], 10);","                        minMinutes = parseInt(timesplitArray[1], 10);","                        minTimeValue = minMinutes+60*minHours;","                    }","                }","                if (typeof maxTime === 'string') {","                    timesplitArray = maxTime.split(':');","                    if (timesplitArray.length===2) {","                        maxHours = parseInt(timesplitArray[0], 10);","                        maxMinutes = parseInt(timesplitArray[1], 10);","                        maxTimeValue = maxMinutes+60*maxHours;","                    }","                }","                if (!minTimeValue) {","                    minTimeValue = 0;","                }","                if (!maxTimeValue) {","                    maxTimeValue = 1440;","                }","                timedial.set('min', minTimeValue);","                timedial.set('max', maxTimeValue);","                hours = presentedDate.getHours();","                minutes = presentedDate.getMinutes();","                dialvalue = minutes+60*hours;","                if (dialvalue<minTimeValue) {","                    dialvalue=minTimeValue;","                    hours = minHours;","                    minutes = minMinutes;","                }","                if (dialvalue>maxTimeValue) {","                    dialvalue=maxTimeValue;","                    hours = maxHours;","                    minutes = maxMinutes;","                }","                timedial.set('value', dialvalue);","                timedial._originalValue = dialvalue;","                timeNode.setHTML(instance._renderDialTime(hours, minutes));","                timeNode.removeClass(TIME_CHANGED_CLASS);","                instance._toggleTimePicker(true, !userConfig.selectOnRelease);","","            }","            else {","                instance._toggleTimePicker(false, false);","            }","            if (userConfig.alignToNode instanceof Y.Node) {","                window = instance._window;","                if (window) {","                    winWidth = PARSTEINT(window.get('winWidth'));","                    currentScroll = PARSTEINT(window.get('docScrollX'));","                    // check minwidth when no other fontsize is set:","                    // values are just read before after rendering...","                    switch (modus) {","                        case 1: minPanelWidth = 285;","                        break;","                        case 2: minPanelWidth = 155;","                        break;","                        case 3: minPanelWidth = 415;","                        break;","                    }","                    panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);","                    nodeX = alignToNode.getX();","                    nodeWidth = alignToNode.get('offsetWidth');","                    rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);","                }","                panel.align(","                    alignToNode,","                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])","                );","            }","            else {","                panel.centered();","            }","            panel.set('modal', userConfig.modal);","            switch (modus) {","                case 1:","                    panel.set('headerContent', userConfig.title || userConfig.titleDate);","                    break;","                case 2:","                    panel.set('headerContent', userConfig.title || userConfig.titleDateTime);","                    break;","                case 3:","                    panel.set('headerContent', userConfig.title || userConfig.titleTime);","            }","            if (userConfig.dragable) {","                if (!panel.hasPlugin('dd')) {","                    panel.plug(Y.Plugin.Drag);","                    panel.dd.addHandle('.yui3-widget-hd');","                }","                else if (panel.hasPlugin('dd')) {","                    panel.unplug('dd');","                }","            }","            else if (panel.hasPlugin('dd')) {","                panel.unplug('dd');","            }","            // backup 2 properties for later use","            instance._unclosable = userConfig.forceSelectdate;","            instance._timepickerSelectOnRelease = userConfig.selectOnRelease;","            instance._closebutton.toggleClass(UNCLOSABLE_CLASS, instance._unclosable);","            panel.show();","            panel.focus();","         },","","        /**","         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.","         *","         * @method _toggleTimePicker","         * @param {Boolean} timeVisible whether the time-selector will be visible or not","         * @param {Boolean} selectButtonVisible whether the selectButton will be visible or not","         * @private","         * @since 0.1","        */","        _toggleTimePicker : function(timeVisible, selectButtonVisible) {","            var instance = this;","","            instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !timeVisible);","            instance._resetNode.toggleClass(TIMEDIAL_HIDDEN, !selectButtonVisible);","            instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !selectButtonVisible);","        }","","    }, {","        ATTRS : {","            /**","             * @description Determines the default layout and behaviour of the date-time picker. The finale appearance","             * of the picker can be overruled per promisecall (with an own config-object)<br />","             * <br />","             * <b>defaultConfig.titleDate</b>: <i>(default='Select date')</i> Title on the Date-picker<br />","             * <b>defaultConfig.titleDateTime</b>: <i>(default='Select date and time')</i> Title on the DateTime-picker<br />","             * <b>defaultConfig.titleTime</b>: <i>(default='Select time')</i> Title on the Time-picker<br />","             * <b>defaultConfig.alignToNode</b>: <i>(default=null)</i> The node that causes the picker to appear.","               When set, the picker is aligned to this Node.<br />","             * <b>defaultConfig.modal</b>: <i>(default=false)</i> Whether the Panel-instance should appear modal<br />","             * <b>defaultConfig.dragable</b>: <i>(default=false)</i> Whether the Panel-instance is dragable<br />","             * <b>defaultConfig.forceSelectdate</b>: <i>(default=false)</i>","             * Force the promise always to become fulfilled by hiding the close-button<br />","             * <b>defaultConfig.minTime</b>: <i>(default='00:00')</i> Lowest timevalue that can be picked.","               Should be in format 'h:m', 'h:mm' or 'hh:mm'<br />","             * <b>defaultConfig.maxTime</b>: <i>(default='24:00')</i> Highest timevalue that can be picked.","               Should be in format 'h:m', 'h:mm' or 'hh:mm'<br />","             * <b>defaultConfig.timeformat</b>: <i>(default='%H:%M')</i> Format of the rendered timestring<br />","             * <b>defaultConfig.resetStr</b>: <i>(default='Reset')</i> resetStr that is passed to the Dial-instance (timepicker)<br />","             * <b>defaultConfig.tooltipHandle</b>: <i>(default='Drag to set time')</i>","             * tooltipHandle that is passed to the Dial-instance (timepicker)<br />","             * <b>defaultConfig.selectOnRelease</b>: <i>(default=true)</i> When only timepicker: select time when mouse releases the dial,","               without a Selectbutton.<br />","             * <b>defaultConfig.customRenderer</b>: <i>(default={})</i> customRenderer that is passed to the Calendar-instance<br />","             * <b>defaultConfig.showPrevMonth</b>: <i>(default=false)</i> showPrevMonth that is passed to the Calendar-instance<br />","             * <b>defaultConfig.showNextMonth</b>: <i>(default=false)</i> showNextMonth that is passed to the Calendar-instance<br />","             * <b>defaultConfig.headerRenderer</b>: <i>(default='%B %Y')</i> headerRenderer that is passed to the Calendar-instance<br />","             * <b>defaultConfig.minimumDate</b>: <i>(default=null)</i> minimumDate that is passed to the Calendar-instance<br />","             * <b>defaultConfig.maximumDate</b>: <i>(default=null)</i> maximumDate that is passed to the Calendar-instance<br />","             * <b>defaultConfig.enabledDatesRule</b>: <i>(default=null)</i> enabledDatesRule that is passed to the Calendar-instance<br />","             * <b>defaultConfig.disabledDatesRule</b>: <i>(default=null)</i> disabledDatesRule that is passed to the Calendar-instance","             * @attribute defaultConfig","             * @type Object","            */","            defaultConfig : {","                value: DEFAULT_CONFIG,","                validator: function(val) {","                    return (Lang.isObject(val));","                },","                setter: function(val) {","                    return Y.merge(DEFAULT_CONFIG, val);","                }","            }","        }","    }",");","","if (!Y.Global.ItsaDateTimePicker) {","    Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();","}","","Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;","","}, '@VERSION@', {","    \"requires\": [","        \"base\",","        \"node-base\",","        \"node-screen\",","        \"panel\",","        \"calendar\",","        \"dial\",","        \"promise\",","        \"cssbutton\",","        \"datatype-date-format\",","        \"dd-plugin\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].lines = {"1":0,"3":0,"24":0,"81":0,"86":0,"221":0,"223":0,"224":0,"225":0,"226":0,"238":0,"250":0,"277":0,"280":0,"281":0,"283":0,"285":0,"288":0,"289":0,"290":0,"291":0,"292":0,"293":0,"294":0,"295":0,"297":0,"300":0,"303":0,"306":0,"307":0,"309":0,"314":0,"346":0,"349":0,"350":0,"351":0,"352":0,"354":0,"356":0,"359":0,"360":0,"364":0,"365":0,"366":0,"367":0,"368":0,"369":0,"371":0,"374":0,"377":0,"380":0,"381":0,"382":0,"384":0,"389":0,"414":0,"417":0,"418":0,"420":0,"422":0,"425":0,"426":0,"430":0,"431":0,"433":0,"436":0,"439":0,"442":0,"443":0,"445":0,"450":0,"462":0,"473":0,"475":0,"476":0,"477":0,"479":0,"480":0,"496":0,"500":0,"503":0,"505":0,"506":0,"518":0,"519":0,"524":0,"528":0,"529":0,"534":0,"537":0,"541":0,"542":0,"555":0,"557":0,"560":0,"563":0,"574":0,"578":0,"584":0,"587":0,"588":0,"589":0,"590":0,"599":0,"600":0,"604":0,"608":0,"609":0,"616":0,"618":0,"619":0,"631":0,"633":0,"641":0,"647":0,"659":0,"663":0,"664":0,"674":0,"686":0,"691":0,"692":0,"693":0,"694":0,"697":0,"707":0,"711":0,"722":0,"724":0,"725":0,"726":0,"727":0,"728":0,"729":0,"744":0,"747":0,"759":0,"761":0,"802":0,"805":0,"806":0,"809":0,"812":0,"816":0,"817":0,"818":0,"852":0,"863":0,"864":0,"866":0,"868":0,"869":0,"870":0,"871":0,"872":0,"874":0,"884":0,"886":0,"889":0,"891":0,"892":0,"893":0,"894":0,"895":0,"896":0,"897":0,"898":0,"899":0,"900":0,"901":0,"902":0,"905":0,"906":0,"907":0,"908":0,"909":0,"910":0,"913":0,"914":0,"916":0,"917":0,"919":0,"920":0,"921":0,"922":0,"923":0,"924":0,"925":0,"926":0,"927":0,"929":0,"930":0,"931":0,"932":0,"934":0,"935":0,"936":0,"937":0,"938":0,"942":0,"944":0,"945":0,"946":0,"947":0,"948":0,"951":0,"952":0,"953":0,"954":0,"955":0,"956":0,"957":0,"959":0,"960":0,"961":0,"962":0,"964":0,"970":0,"972":0,"973":0,"975":0,"976":0,"978":0,"979":0,"981":0,"983":0,"984":0,"985":0,"986":0,"988":0,"989":0,"992":0,"993":0,"996":0,"997":0,"998":0,"999":0,"1000":0,"1013":0,"1015":0,"1016":0,"1017":0,"1059":0,"1062":0,"1069":0,"1070":0,"1073":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].functions = {"PARSTEINT:80":0,"initializer:220":0,"dateNode:237":0,"datetimeNode:249":0,"(anonymous 3):287":0,"(anonymous 4):302":0,"(anonymous 2):282":0,"getDate:276":0,"(anonymous 6):358":0,"(anonymous 7):376":0,"(anonymous 5):353":0,"getDateTime:345":0,"(anonymous 9):424":0,"(anonymous 10):438":0,"(anonymous 8):419":0,"getTime:413":0,"timeNode:461":0,"destructor:472":0,"(anonymous 12):509":0,"(anonymous 13):527":0,"(anonymous 11):502":0,"(anonymous 14):540":0,"_bindUI:495":0,"(anonymous 15):559":0,"_clearEventhandlers:554":0,"(anonymous 16):586":0,"(anonymous 17):603":0,"_createTimeDial:573":0,"_afterDialChange:615":0,"_createCalendar:630":0,"_calendarNewDate:658":0,"action:696":0,"_fillPanel:685":0,"hide:721":0,"_renderDialTime:743":0,"_renderUI:758":0,"(anonymous 18):811":0,"_saveShow:801":0,"_show:851":0,"_toggleTimePicker:1012":0,"validator:1058":0,"setter:1061":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredLines = 247;
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredFunctions = 43;
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1);
YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 3);
'use strict';

/**
 *
 * Class ITSADateTimePicker
 *
 *
 * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />
 * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both.
 *
 * @module gallery-itsadatetimepicker
 * @extends Base
 * @class ITSADateTimePicker
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 24);
var Lang = Y.Lang,
    YNode = Y.Node,
    YArray = Y.Array,
    WIDGET_CLASS = 'itsa-datetimepicker',
    LOADING_CLASS = WIDGET_CLASS + '-loading',
    UNCLOSABLE_CLASS = WIDGET_CLASS + '-unclosable',
    PANEL_CLASS = WIDGET_CLASS + '-panel',
    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',
    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,
                        // We don't need to slower things down during startup.
    CALENDAR_ID = WIDGET_CLASS + '-datepicker',
    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',
    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',
    HEADERCONTENT_DATE = 'Select date',
    HEADERCONTENT_DATETIME = 'Select date and time',
    HEADERCONTENT_TIME = 'Select time',

    YUI3BUTTON_CLASS = 'yui3-button',
    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',
    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',
    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',

    BUTTON_DATE = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_DATE_CLASS+'"></span></button>',
    BUTTON_DATETIME = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_DATETIME_CLASS+'"></span></button>',
    BUTTON_TIME = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_TIME_CLASS+'"></span></button>',

    EVENT_DATEPICKER = '_datetimepicker:',
    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',
    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',
    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',

    DEFAULT_CONFIG = {
        titleDate: HEADERCONTENT_DATE,
        titleDateTime: HEADERCONTENT_DATETIME,
        titleTime: HEADERCONTENT_TIME,
        alignToNode: null,
        modal: false,
        dragable: false,
        forceSelectdate: false,
        minTime: '00:00',
        maxTime: '24:00',
        timeFormat: '%H:%M',
        resetStr: 'Reset',
        tooltipHandle: 'Drag to set time',
        selectOnRelease: true,
        customRenderer: {},
        showPrevMonth: false,
        showNextMonth: false,
        headerRenderer: '%B %Y',
        minimumDate: null,
        maximumDate: null,
        enabledDatesRule: null,
        disabledDatesRule: null
    },

    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "PARSTEINT", 80);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 81);
return parseInt(value, 10);
    };

//===============================================================================================

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 86);
Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {

        /**
         * Reference to the Y.Panel-instance
         * @property panel
         * @default null
         * @type Y.Panel
         * @since 0.1
        */
        panel : null,

        /**
         * Reference to the Y.Calendar-instance
         * @property calendar
         * @default null
         * @type Y.Calendar
         * @since 0.1
        */
        calendar : null,

        /**
         * Reference to the Y.Dial-instance
         * @property timedial
         * @default null
         * @type Y.Dial
         * @since 0.1
        */
        timedial : null,

        /**
         * Internal reference to the closebutton.
         * @property _closebutton
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _closebutton : null,

        /**
         * Internal reference to the dialhandle-Node.
         * @property _dialHandle
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _dialHandle : null,

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
         * @since 0.1
        */
        _eventhandlers : [],

        /**
         * Internal reference to the timerobject that is used to delay the rendering.
         * @property _panelRendererDelay
         * @private
         * @default null
         * @type Object
         * @since 0.1
        */
        _panelRendererDelay : null,

        /**
         * Internal reference to the resetnode.
         * @property _resetNode
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _resetNode : null,

        /**
         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.
         * @property _timeFormat
         * @private
         * @default null
         * @type String
         * @since 0.1
        */
        _timeFormat : null,

        /**
         * Reference to the Node inside Y.Dial-instance that draws the selected time.
         * @property _timeNode
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _timeNode : null,

        /**
         * Internal backupstate of getTime()'s config.selectOnRelease.
         * @property _timepickerSelectOnRelease
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _timepickerSelectOnRelease : null,

        /**
         * Internal state of the picker to be closable or not
         * @property _unclosable
         * @private
         * @default null
         * @type Boolean
         * @since 0.1
        */
        _unclosable : null,

        /**
         * Reference to Y.one('window')
         * @property _window
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _window : null,

        /**
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "initializer", 220);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 221);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 223);
instance._window = Y.one('window');
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 224);
instance._renderUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 225);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 226);
Y.one('body').removeClass(LOADING_CLASS);
         },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method dateNode
         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.
         * @since 0.1
        */
        dateNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "dateNode", 237);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 238);
return YNode.create(BUTTON_DATE);
        },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method datetimeNode
         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.
         * @since 0.1
        */
        datetimeNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "datetimeNode", 249);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 250);
return YNode.create(BUTTON_DATETIME);
        },

        /**
         * Picks a date using a pop-up Calendar.
         *
         * @method getDate
         * @param {Date} [initialDate] Date-object that holds the initial date-time for the picker. If not set, then the current date-time is used.
         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Date-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDate : function(initialDate, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDate", 276);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 277);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 280);
instance._saveShow(1, initialDate, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 281);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 2)", 282);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 283);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 285);
resolvehandler = Y.once(
                        EVENT_SELECTDATE,
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 3)", 287);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 288);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 289);
var selectedDate = e.newDate;
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 290);
selectedDate.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 291);
selectedDate.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 292);
selectedDate.setMinutes(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 293);
selectedDate.setHours(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 294);
instance.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 295);
resolve(selectedDate);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 297);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 300);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 4)", 302);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 303);
resolvehandler.detach();
                            // picker will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 306);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 307);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 309);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 314);
return promise;
         },

        /**
         * Picks a date+time using a pop-up Calendar+Dial.
         *
         * @method getDateTime
         * @param {Date} [initialDateTime] Date-object that holds the initial values for the picker. If not set then the current date-time is used.
         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] The node that causes the panel to appear. When set, the picker is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.timeformat] Format of the timestring inside the Dial-instance
         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)
         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the DateTime-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDateTime : function(initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDateTime", 345);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 346);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 349);
config = config || {};
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 350);
config.selectOnRelease = false;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 351);
instance._saveShow(2, initialDateTime, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 352);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 5)", 353);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 354);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 356);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 6)", 358);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 359);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 360);
var selectedDateTime = instance.calendar.get('selectedDates')[0],
                                timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 364);
selectedDateTime.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 365);
selectedDateTime.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 366);
selectedDateTime.setMinutes(newMinutes);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 367);
selectedDateTime.setHours(newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 368);
instance.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 369);
resolve(selectedDateTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 371);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 374);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 7)", 376);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 377);
resolvehandler.detach();
                            // picker will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 380);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 381);
instance._toggleTimePicker(false, false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 382);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 384);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 389);
return promise;
         },

        /**
         * Picks a time using a pop-up Dial.
         *
         * @method getTime
         * @param {Date} [initialTime] Date-object that holds the initial values for the picker. If not set, then the current date-time is used.
         * @param {Object} [config] Object to adjust the behaviour of the picker. Defaults to the attribute 'defaultConfig'.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] The node that causes the panel to appear. When set, the picker is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.timeformat] Format of the timestring inside the Dial-instance
         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)
         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)
         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Time-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getTime : function(initialTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getTime", 413);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 414);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 417);
instance._saveShow(3, initialTime, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 418);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 8)", 419);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 420);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 422);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 9)", 424);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 425);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 426);
var timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours),
                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 430);
instance.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 431);
resolve(selectedTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 433);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 436);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 10)", 438);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 439);
resolvehandler.detach();
                            // picker will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 442);
instance._toggleTimePicker(false, false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 443);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 445);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 450);
return promise;
         },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method timeNode
         * @return {Y.Node} Node of the type 'button' with a timeicon inside.
         * @since 0.1
        */
        timeNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "timeNode", 461);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 462);
return YNode.create(BUTTON_TIME);
        },

        /**
         * Cleans up bindings
         *
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "destructor", 472);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 473);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 475);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 476);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 477);
instance._panelRendererDelay.cancel();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 479);
instance.timedial.destroy();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 480);
instance.calendar.destroy();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method _bindUI
         * @private
         * @protected
         * @since 0.1
         */
        _bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_bindUI", 495);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 496);
var instance = this,
                eventhandlers = instance._eventhandlers,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 500);
panel.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 11)", 502);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 503);
var boundingBox = panel.get('boundingBox'),
                        closebutton;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 505);
instance._closebutton = closebutton = boundingBox.one('.yui3-button-close');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 506);
eventhandlers.push(
                        closebutton.on(
                            'click',
                            function() {
                                /**
                                * Fired when the Panel is closed without saving the values.
                                * No need to listen to --> the promises are using this event internally.
                                *
                                * @event _datetimepicker:cancel
                                * @private
                                * @since 0.1
                                */
                                _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 12)", 509);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 518);
if (!instance._unclosable) {
                                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 519);
instance.hide();
                                }
                            }
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 524);
eventhandlers.push(
                        Y.on(
                            'keydown',
                            function(e) {
                                _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 13)", 527);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 528);
if ((e.keyCode === 27) && !instance._unclosable && instance.panel.get('focused')) { // escape
                                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 529);
instance.hide();
                                }
                            }
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 534);
instance._fillPanel();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 537);
instance._panelRendererDelay = Y.later(
                RENDERDELAY,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 14)", 540);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 541);
instance._panelRendererDelay = null;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 542);
panel.render();
                }
            );
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
        */
        _clearEventhandlers : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_clearEventhandlers", 554);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 555);
var eventhandlers = this._eventhandlers;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 557);
YArray.each(
                eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 15)", 559);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 560);
item.detach();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 563);
eventhandlers.length = 0;
        },

        /**
         * Creates (renderes) the Y.Dial-instance that is used for selecting times.
         *
         * @method _createTimeDial
         * @private
         * @since 0.1
        */
        _createTimeDial : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createTimeDial", 573);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 574);
var instance = this,
                contentBox = instance.panel.get('contentBox'),
                timedial;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 578);
instance.timedial = timedial = new Y.Dial({
                min:0,
                max:1440,
                stepsPerRevolution: 720,
                value: 0
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 584);
timedial.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 16)", 586);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 587);
instance._timeNode = contentBox.one('.yui3-dial-label-string');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 588);
instance._resetNode = contentBox.one('.yui3-dial-reset-string');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 589);
instance._dialHandle = contentBox.one('.yui3-dial-handle');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 590);
instance._eventhandlers.push(
                        timedial._dd1.on(
                            'drag:end',
                            instance._afterDialChange,
                            instance
                        )
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 599);
timedial.render(contentBox.one('#'+TIMEDIAL_ID));
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 600);
instance._eventhandlers.push(
                timedial.after(
                    'valueChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 17)", 603);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 604);
var newVal = parseInt(e.newVal, 10),
                            newHours = Math.floor(newVal/60),
                            newMinutes = newVal - (60*newHours),
                            timeNode = instance._timeNode;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 608);
timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 609);
timeNode.addClass(TIME_CHANGED_CLASS);
                    }
                )
            );
        },

        _afterDialChange : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_afterDialChange", 615);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 616);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 618);
if (instance._timepickerSelectOnRelease) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 619);
Y.fire(EVENT_SELECTBUTTON);
            }
        },

        /**
         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.
         *
         * @method _createCalendar
         * @private
         * @since 0.1
        */
        _createCalendar : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createCalendar", 630);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 631);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 633);
instance.calendar = new Y.Calendar({
                height:'250px',
                width:'250px',
                showPrevMonth: true,
                showNextMonth: true,
                visible: false,
                date: new Date()
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 641);
instance._eventhandlers.push(
                instance.calendar.on(
                    'dateClick',
                    Y.rbind(instance._calendarNewDate, instance)
                )
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 647);
instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));
        },

        /**
         * Fires an event with the new selected Date.
         *
         * @method _calendarNewDate
         * @param {EventFacade} e
         * @private
         * @since 0.1
        */
        _calendarNewDate : function(e) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_calendarNewDate", 658);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 659);
var instance = this,
                newdate;

            // only if the calendar is visible --> there is also a new date set before showing up!
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 663);
if (instance.calendar.get('visible')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 664);
newdate = e.date;
                /**
                * Fired when a new Date is selected from the Panel's Calendar-instance.
                * No need to listen to --> the promises are using this event internally.
                *
                * @event _datetimepicker:selectdate
                * @param {Date} newDate the selected date
                * @private
                * @since 0.1
                */
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 674);
Y.fire(EVENT_SELECTDATE, {newDate: newdate});
            }
        },

        /**
         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.
         *
         * @method _createCalendar
         * @private
         * @since 0.1
        */
        _fillPanel : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_fillPanel", 685);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 686);
var instance = this,
                panel = instance.panel,
                boundingBox = panel.get('boundingBox'),
                selectButton;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 691);
boundingBox.addClass(PANEL_CLASS);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 692);
instance._createCalendar();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 693);
instance._createTimeDial();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 694);
selectButton = {
                value : 'Select',
                action: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "action", 696);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 697);
e.preventDefault();
                    /**
                    * Fired when new values are selected by the Panel by pressing the 'Select'-button
                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)
                    * No need to listen to --> the promises are using this event internally.
                    *
                    * @event _datetimepicker:selected
                    * @private
                    * @since 0.1
                    */
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 707);
Y.fire(EVENT_SELECTBUTTON);
                },
                section: Y.WidgetStdMod.FOOTER
            };
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 711);
panel.addButton(selectButton);
        },

        /**
         * Hides the picker-instance and will make the Promise to be rejected.
         *
         * @method hide
         * @param [force] {Boolean} Force closing, even when config.forceSelectdate is set to true
         * @since 0.1
        */
        hide : function(force) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "hide", 721);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 722);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 724);
force = Lang.isBoolean(force) && force;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 725);
if (instance.panel.get('visible') && (force || !instance._unclosable)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 726);
instance.calendar.hide();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 727);
instance._toggleTimePicker(false, false);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 728);
instance.panel.hide();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 729);
Y.fire(EVENT_CANCEL);
            }
         },

        /**
         * Renderes the time in the right format (stored inside the property '_timeFormat')
         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}
         *
         * @method _calendarNewDate
         * @param {Int} hours
         * @param {Int} minutes
         * @private
         * @since 0.1
        */
        _renderDialTime : function(hours, minutes) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderDialTime", 743);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 744);
var instance = this,
                time = new Date(1900, 0, 1, hours, minutes, 0, 0);

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 747);
return Y.Date.format(time, {format: instance._timeFormat});
        },

        /**
         * Renderes the Picker-panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.
         *
         * @method _renderUI
         * @private
         * @protected
         * @since 0.1
         */
        _renderUI: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderUI", 758);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 759);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 761);
instance.panel = new Y.Panel({
                zIndex: 15000,
                modal   : false,
                visible: false,
                render  : false, // we will render after some delaytime, specified with RENDERDELAY
                fillHeight: null,
                hideOn: [],
                bodyContent : '<div id="'+CALENDAR_ID+'"></div><div id="'+TIMEDIAL_ID+'"></div>'
            });
        },

        /**
         * Will call _show() but only if the picker-panel is rendered. If not, than it will wait for the rendering to be finished.
         *
         * @method _saveShow
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial values for the picker. If not set then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the picker.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)
         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)
         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _saveShow : function(modus, initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_saveShow", 801);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 802);
var instance = this,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 805);
if (panel.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 806);
instance._show(modus, initialDateTime, config || {});
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 809);
panel.onceAfter(
                    'render',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 18)", 811);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 812);
instance._show(modus, initialDateTime, config || {});
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 816);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 817);
instance._panelRendererDelay.cancel();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 818);
panel.render();
            }
        },

        /**
         * Shows the picker-instance, ready to select a date and/or time.
         *
         * @method _show
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial values for the picker. If not set then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the picker.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] The node that causes the picker to appear. When set, the picker is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [config.forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.minTime] Lowest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.maxTime] Highest timevalue that can be picked. Should be in format 'h:m', 'h:mm' or 'hh:mm'
         * @param {String} [config.timeformat] Format of the rendered timestring
         * @param {String} [config.resetStr] resetStr that is passed to the Dial-instance (timepicker)
         * @param {String} [config.tooltipHandle] tooltipHandle that is passed to the Dial-instance (timepicker)
         * @param {String} [config.selectOnRelease] When only timepicker: select time when mouse releases the dial, without a Selectbutton.
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _show : function(modus, initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_show", 851);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 852);
var instance = this,
                panel = instance.panel,
                presentedDate = initialDateTime || new Date(),
                timeNode = instance._timeNode,
                userConfig = Y.merge(instance.get('defaultConfig'), config),
                timedial = instance.timedial,
                calendar = instance.calendar,
                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours,
                dialvalue, minPanelWidth, alignToNode, minTime, maxTime, minTimeValue, maxTimeValue, timesplitArray,
                minMinutes, maxMinutes, minHours, maxHours;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 863);
alignToNode = userConfig.alignToNode;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 864);
if (panel.get('visible')) {
                // previous picker is up --> we need to reject the promise by firing an EVENT_CANCEL-event:
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 866);
instance.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 868);
if (modus<3) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 869);
calendar.deselectDates();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 870);
calendar.selectDates(presentedDate);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 871);
calendar.set('date', presentedDate);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 872);
if (Lang.isObject(config)) {
                    // Only accept limited properties. Also reset to default on new requests
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 874);
calAttrs = {
                        customRenderer: userConfig.customRenderer,
                        showPrevMonth: userConfig.showPrevMonth,
                        showNextMonth: userConfig.showNextMonth,
                        headerRenderer: userConfig.headerRenderer,
                        minimumDate: userConfig.minimumDate,
                        maximumDate: userConfig.maximumDate,
                        enabledDatesRule: userConfig.enabledDatesRule,
                        disabledDatesRule: userConfig.disabledDatesRule
                    };
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 884);
calendar.setAttrs(calAttrs);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 886);
calendar.show();
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 889);
calendar.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 891);
if (modus>1) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 892);
instance._resetNode.setHTML(userConfig.resetStr);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 893);
instance._dialHandle.setAttribute('title', userConfig.tooltipHandle);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 894);
instance._timeFormat = userConfig.timeFormat;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 895);
minTime = userConfig.minTime;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 896);
maxTime = userConfig.maxTime;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 897);
if (typeof minTime === 'string') {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 898);
timesplitArray = minTime.split(':');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 899);
if (timesplitArray.length===2) {
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 900);
minHours = parseInt(timesplitArray[0], 10);
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 901);
minMinutes = parseInt(timesplitArray[1], 10);
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 902);
minTimeValue = minMinutes+60*minHours;
                    }
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 905);
if (typeof maxTime === 'string') {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 906);
timesplitArray = maxTime.split(':');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 907);
if (timesplitArray.length===2) {
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 908);
maxHours = parseInt(timesplitArray[0], 10);
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 909);
maxMinutes = parseInt(timesplitArray[1], 10);
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 910);
maxTimeValue = maxMinutes+60*maxHours;
                    }
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 913);
if (!minTimeValue) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 914);
minTimeValue = 0;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 916);
if (!maxTimeValue) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 917);
maxTimeValue = 1440;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 919);
timedial.set('min', minTimeValue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 920);
timedial.set('max', maxTimeValue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 921);
hours = presentedDate.getHours();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 922);
minutes = presentedDate.getMinutes();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 923);
dialvalue = minutes+60*hours;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 924);
if (dialvalue<minTimeValue) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 925);
dialvalue=minTimeValue;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 926);
hours = minHours;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 927);
minutes = minMinutes;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 929);
if (dialvalue>maxTimeValue) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 930);
dialvalue=maxTimeValue;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 931);
hours = maxHours;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 932);
minutes = maxMinutes;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 934);
timedial.set('value', dialvalue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 935);
timedial._originalValue = dialvalue;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 936);
timeNode.setHTML(instance._renderDialTime(hours, minutes));
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 937);
timeNode.removeClass(TIME_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 938);
instance._toggleTimePicker(true, !userConfig.selectOnRelease);

            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 942);
instance._toggleTimePicker(false, false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 944);
if (userConfig.alignToNode instanceof Y.Node) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 945);
window = instance._window;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 946);
if (window) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 947);
winWidth = PARSTEINT(window.get('winWidth'));
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 948);
currentScroll = PARSTEINT(window.get('docScrollX'));
                    // check minwidth when no other fontsize is set:
                    // values are just read before after rendering...
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 951);
switch (modus) {
                        case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 952);
minPanelWidth = 285;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 953);
break;
                        case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 954);
minPanelWidth = 155;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 955);
break;
                        case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 956);
minPanelWidth = 415;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 957);
break;
                    }
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 959);
panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 960);
nodeX = alignToNode.getX();
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 961);
nodeWidth = alignToNode.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 962);
rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 964);
panel.align(
                    alignToNode,
                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 970);
panel.centered();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 972);
panel.set('modal', userConfig.modal);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 973);
switch (modus) {
                case 1:
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 975);
panel.set('headerContent', userConfig.title || userConfig.titleDate);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 976);
break;
                case 2:
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 978);
panel.set('headerContent', userConfig.title || userConfig.titleDateTime);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 979);
break;
                case 3:
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 981);
panel.set('headerContent', userConfig.title || userConfig.titleTime);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 983);
if (userConfig.dragable) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 984);
if (!panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 985);
panel.plug(Y.Plugin.Drag);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 986);
panel.dd.addHandle('.yui3-widget-hd');
                }
                else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 988);
if (panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 989);
panel.unplug('dd');
                }}
            }
            else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 992);
if (panel.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 993);
panel.unplug('dd');
            }}
            // backup 2 properties for later use
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 996);
instance._unclosable = userConfig.forceSelectdate;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 997);
instance._timepickerSelectOnRelease = userConfig.selectOnRelease;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 998);
instance._closebutton.toggleClass(UNCLOSABLE_CLASS, instance._unclosable);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 999);
panel.show();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1000);
panel.focus();
         },

        /**
         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.
         *
         * @method _toggleTimePicker
         * @param {Boolean} timeVisible whether the time-selector will be visible or not
         * @param {Boolean} selectButtonVisible whether the selectButton will be visible or not
         * @private
         * @since 0.1
        */
        _toggleTimePicker : function(timeVisible, selectButtonVisible) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_toggleTimePicker", 1012);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1013);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1015);
instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !timeVisible);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1016);
instance._resetNode.toggleClass(TIMEDIAL_HIDDEN, !selectButtonVisible);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1017);
instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !selectButtonVisible);
        }

    }, {
        ATTRS : {
            /**
             * @description Determines the default layout and behaviour of the date-time picker. The finale appearance
             * of the picker can be overruled per promisecall (with an own config-object)<br />
             * <br />
             * <b>defaultConfig.titleDate</b>: <i>(default='Select date')</i> Title on the Date-picker<br />
             * <b>defaultConfig.titleDateTime</b>: <i>(default='Select date and time')</i> Title on the DateTime-picker<br />
             * <b>defaultConfig.titleTime</b>: <i>(default='Select time')</i> Title on the Time-picker<br />
             * <b>defaultConfig.alignToNode</b>: <i>(default=null)</i> The node that causes the picker to appear.
               When set, the picker is aligned to this Node.<br />
             * <b>defaultConfig.modal</b>: <i>(default=false)</i> Whether the Panel-instance should appear modal<br />
             * <b>defaultConfig.dragable</b>: <i>(default=false)</i> Whether the Panel-instance is dragable<br />
             * <b>defaultConfig.forceSelectdate</b>: <i>(default=false)</i>
             * Force the promise always to become fulfilled by hiding the close-button<br />
             * <b>defaultConfig.minTime</b>: <i>(default='00:00')</i> Lowest timevalue that can be picked.
               Should be in format 'h:m', 'h:mm' or 'hh:mm'<br />
             * <b>defaultConfig.maxTime</b>: <i>(default='24:00')</i> Highest timevalue that can be picked.
               Should be in format 'h:m', 'h:mm' or 'hh:mm'<br />
             * <b>defaultConfig.timeformat</b>: <i>(default='%H:%M')</i> Format of the rendered timestring<br />
             * <b>defaultConfig.resetStr</b>: <i>(default='Reset')</i> resetStr that is passed to the Dial-instance (timepicker)<br />
             * <b>defaultConfig.tooltipHandle</b>: <i>(default='Drag to set time')</i>
             * tooltipHandle that is passed to the Dial-instance (timepicker)<br />
             * <b>defaultConfig.selectOnRelease</b>: <i>(default=true)</i> When only timepicker: select time when mouse releases the dial,
               without a Selectbutton.<br />
             * <b>defaultConfig.customRenderer</b>: <i>(default={})</i> customRenderer that is passed to the Calendar-instance<br />
             * <b>defaultConfig.showPrevMonth</b>: <i>(default=false)</i> showPrevMonth that is passed to the Calendar-instance<br />
             * <b>defaultConfig.showNextMonth</b>: <i>(default=false)</i> showNextMonth that is passed to the Calendar-instance<br />
             * <b>defaultConfig.headerRenderer</b>: <i>(default='%B %Y')</i> headerRenderer that is passed to the Calendar-instance<br />
             * <b>defaultConfig.minimumDate</b>: <i>(default=null)</i> minimumDate that is passed to the Calendar-instance<br />
             * <b>defaultConfig.maximumDate</b>: <i>(default=null)</i> maximumDate that is passed to the Calendar-instance<br />
             * <b>defaultConfig.enabledDatesRule</b>: <i>(default=null)</i> enabledDatesRule that is passed to the Calendar-instance<br />
             * <b>defaultConfig.disabledDatesRule</b>: <i>(default=null)</i> disabledDatesRule that is passed to the Calendar-instance
             * @attribute defaultConfig
             * @type Object
            */
            defaultConfig : {
                value: DEFAULT_CONFIG,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "validator", 1058);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1059);
return (Lang.isObject(val));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "setter", 1061);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1062);
return Y.merge(DEFAULT_CONFIG, val);
                }
            }
        }
    }
);

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1069);
if (!Y.Global.ItsaDateTimePicker) {
    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1070);
Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();
}

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1073);
Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;

}, '@VERSION@', {
    "requires": [
        "base",
        "node-base",
        "node-screen",
        "panel",
        "calendar",
        "dial",
        "promise",
        "cssbutton",
        "datatype-date-format",
        "dd-plugin"
    ],
    "skinnable": true
});
