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
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].code=["YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {","","'use strict';","","/**"," *"," * Class ITSADateTimePicker"," *"," *"," * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />"," * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both."," *"," * @module gallery-itsadatetimepicker"," * @extends Base"," * @class ITSADateTimePicker"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YNode = Y.Node,","    YArray = Y.Array,","    WIDGET_CLASS = 'itsa-datetimepicker',","    LOADING_CLASS = WIDGET_CLASS + '-loading',","    UNCLOSABLE_CLASS = WIDGET_CLASS + '-unclosable',","    PANEL_CLASS = WIDGET_CLASS + '-panel',","    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',","    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,","                        // We don't need to slower things down during startup.","    CALENDAR_ID = WIDGET_CLASS + '-datepicker',","    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',","    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',","    HEADERCONTENT_DATE = 'Select date',","    HEADERCONTENT_DATETIME = 'Select date and time',","    HEADERCONTENT_TIME = 'Select time',","","    YUI3BUTTON_CLASS = 'yui3-button',","    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',","    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',","    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',","","    BUTTON_DATE = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATE_CLASS+'\"></span></button>',","    BUTTON_DATETIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATETIME_CLASS+'\"></span></button>',","    BUTTON_TIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_TIME_CLASS+'\"></span></button>',","","    EVENT_DATEPICKER = '_datetimepicker:',","    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',","    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',","    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    };","","//===============================================================================================","","Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {","","        /**","         * Reference to the Y.Panel-instance","         * @property panel","         * @default null","         * @type Y.Panel","         * @since 0.1","        */","        panel : null,","","        /**","         * Reference to the Y.Calendar-instance","         * @property calendar","         * @default null","         * @type Y.Calendar","         * @since 0.1","        */","        calendar : null,","","        /**","         * Reference to the Y.Dial-instance","         * @property timedial","         * @default null","         * @type Y.Dial","         * @since 0.1","        */","        timedial : null,","","        /**","         * Internal reference to the closebutton.","         * @property _closebutton","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _closebutton : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","         * @since 0.1","        */","        _eventhandlers : [],","","        /**","         * Internal reference to the timerobject that is used to delay the rendering.","         * @property _panelRendererDelay","         * @private","         * @default null","         * @type Object","         * @since 0.1","        */","        _panelRendererDelay : null,","","        /**","         * Reference to the Node inside Y.Dial-instance that draws the selected time.","         * @property _timeNode","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _timeNode : null,","","        /**","         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.","         * @property _timeFormat","         * @private","         * @default null","         * @type String","         * @since 0.1","        */","        _timeFormat : null,","","        /**","         * Internal state of the panel to be closable or not","         * @property _unclosable","         * @private","         * @default null","         * @type Boolean","         * @since 0.1","        */","        _unclosable : null,","","        /**","         * Reference to Y.one('window')","         * @property _window","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _window : null,","","        /**","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this;","","            instance._window = Y.one('window');","            instance._renderUI();","            instance._bindUI();","            Y.one('body').removeClass(LOADING_CLASS);","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method dateNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.","         * @since 0.1","        */","        dateNode : function() {","            return YNode.create(BUTTON_DATE);","        },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method datetimeNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.","         * @since 0.1","        */","        datetimeNode : function() {","            return YNode.create(BUTTON_DATETIME);","        },","","        /**","         * Picks a date using a pop-up Calendar.","         *","         * @method getDate","         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Date-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDate : function(initialDate, config) {","            var instance = this,","                promise;","","            instance._saveShow(1, initialDate, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTDATE,","                        function(e) {","                            rejecthandler.detach();","                            var selectedDate = e.newDate;","                            selectedDate.setMilliseconds(0);","                            selectedDate.setSeconds(0);","                            selectedDate.setMinutes(0);","                            selectedDate.setHours(0);","                            instance._hide();","                            resolve(selectedDate);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Picks a date+time using a pop-up Calendar+Dial.","         *","         * @method getDateTime","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the DateTime-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDateTime : function(initialDateTime, config) {","            var instance = this,","                promise;","","            instance._saveShow(2, initialDateTime, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var selectedDateTime = instance.calendar.get('selectedDates')[0],","                                timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours);","                            selectedDateTime.setMilliseconds(0);","                            selectedDateTime.setSeconds(0);","                            selectedDateTime.setMinutes(newMinutes);","                            selectedDateTime.setHours(newHours);","                            instance._hide();","                            resolve(selectedDateTime);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Picks a time using a pop-up Dial.","         *","         * @method getTime","         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Time-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getTime : function(initialTime, config) {","            var instance = this,","                promise;","","            instance._saveShow(3, initialTime, config);","            promise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours),","                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);","                            instance._hide();","                            resolve(selectedTime);","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            promise = null;","                        }","                    );","                }","            );","            return promise;","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method timeNode","         * @return {Y.Node} Node of the type 'button' with a timeicon inside.","         * @since 0.1","        */","        timeNode : function() {","            return YNode.create(BUTTON_TIME);","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor: function() {","            var instance = this;","","            instance._clearEventhandlers();","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","            }","            instance.timedial.destroy();","            instance.calendar.destroy();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method _bindUI","         * @private","         * @protected","         * @since 0.1","         */","        _bindUI: function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                panel = instance.panel;","","            panel.onceAfter(","                'render',","                function() {","                    var closebutton;","                    instance._closebutton = closebutton = panel.get('boundingBox').one('.yui3-button-close');","                    eventhandlers.push(","                        closebutton.on(","                            'click',","                            function() {","                                /**","                                * Fired when the Panel is closed without saving the values.","                                * No need to listen to --> the promises are using this event internally.","                                *","                                * @event _datetimepicker:cancel","                                * @private","                                * @since 0.1","                                */","                                if (!instance._unclosable) {","                                    Y.fire(EVENT_CANCEL);","                                }","                            }","                        )","                    );","                    instance._fillPanel();","                }","            );","            instance._panelRendererDelay = Y.later(","                RENDERDELAY,","                instance,","                function() {","                    instance._panelRendererDelay = null;","                    panel.render();","                }","            );","            eventhandlers.push(","                Y.one('body').delegate(","                    'click',","                    function(){},","                    '.'+ITSA_BUTTON_DATETIME_CLASS","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","        */","        _clearEventhandlers : function() {","            var eventhandlers = this._eventhandlers;","","            YArray.each(","                eventhandlers,","                function(item){","                    item.detach();","                }","            );","            eventhandlers.length = 0;","        },","","        /**","         * Creates (renderes) the Y.Dial-instance that is used for selecting times.","         *","         * @method _createTimeDial","         * @private","         * @since 0.1","        */","        _createTimeDial : function() {","            var instance = this,","                contentBox = instance.panel.get('contentBox'),","                timedial;","","            instance.timedial = timedial = new Y.Dial({","                min:0,","                max:1440,","                stepsPerRevolution: 720,","                strings: {","                    label: '0:00',","                    resetStr: 'Reset',","                    tooltipHandle: 'Drag to set time'","                },","                value: 0","            });","            timedial.onceAfter(","                'render',","                function() {","                    instance._timeNode = contentBox.one('.yui3-dial-label-string');","                }","            );","            timedial.render(contentBox.one('#'+TIMEDIAL_ID));","            instance._eventhandlers.push(","                timedial.on(","                    'valueChange',","                    function(e) {","                        var newVal = parseInt(e.newVal, 10),","                            newHours = Math.floor(newVal/60),","                            newMinutes = newVal - (60*newHours),","                            timeNode = instance._timeNode;","                        timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));","                        timeNode.addClass(TIME_CHANGED_CLASS);","                    }","                )","            );","        },","","        /**","         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _createCalendar : function() {","            var instance = this;","","            instance.calendar = new Y.Calendar({","                height:'250px',","                width:'250px',","                showPrevMonth: true,","                showNextMonth: true,","                visible: false,","                date: new Date()","            });","            instance._eventhandlers.push(","                instance.calendar.on(","                    'dateClick',","                    Y.rbind(instance._calendarNewDate, instance)","                )","            );","            instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));","        },","","        /**","         * Fires an event with the new selected Date.","         *","         * @method _calendarNewDate","         * @param {EventFacade} e","         * @private","         * @since 0.1","        */","        _calendarNewDate : function(e) {","            var instance = this,","                newdate;","","            // only if the calendar is visible --> there is also a new date set before showing up!","            if (instance.calendar.get('visible')) {","                newdate = e.date;","                /**","                * Fired when a new Date is selected from the Panel's Calendar-instance.","                * No need to listen to --> the promises are using this event internally.","                *","                * @event _datetimepicker:selectdate","                * @param {Date} newDate the selected date","                * @private","                * @since 0.1","                */","                Y.fire(EVENT_SELECTDATE, {newDate: newdate});","            }","        },","","        /**","         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _fillPanel : function() {","            var instance = this,","                panel = instance.panel,","                boundingBox = panel.get('boundingBox'),","                selectButton;","","            boundingBox.addClass(PANEL_CLASS);","            instance._createCalendar();","            instance._createTimeDial();","            selectButton = {","                value : 'Select',","                action: function(e) {","                    e.preventDefault();","                    /**","                    * Fired when new values are selected by the Panel by pressing the 'Select'-button","                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)","                    * No need to listen to --> the promises are using this event internally.","                    *","                    * @event _datetimepicker:selected","                    * @private","                    * @since 0.1","                    */","                    Y.fire(EVENT_SELECTBUTTON);","                },","                section: Y.WidgetStdMod.FOOTER","            };","            panel.addButton(selectButton);","        },","","        /**","         * Hides the panel-instance.","         *","         * @method _hide","         * @private","         * @since 0.1","        */","        _hide : function() {","            var instance = this;","","            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen","            instance.calendar.hide();","            instance._toggleTimePicker(false);","            instance.panel.hide();","         },","","        /**","         * Renderes the time in the right format (stored inside the property '_timeFormat')","         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}","         *","         * @method _calendarNewDate","         * @param {Int} hours","         * @param {Int} minutes","         * @private","         * @since 0.1","        */","        _renderDialTime : function(hours, minutes) {","            var instance = this,","                time = new Date(1900, 0, 1, hours, minutes, 0, 0);","","            return Y.Date.format(time, {format: instance._timeFormat || '%H:%M'});","        },","","        /**","         * Renderes the Panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.","         *","         * @method _renderUI","         * @private","         * @protected","         * @since 0.1","         */","        _renderUI: function() {","            var instance = this;","","            instance.panel = new Y.Panel({","                zIndex: 15000,","                modal   : false,","                visible: false,","                render  : false, // we will render after some delaytime, specified with RENDERDELAY","                fillHeight: null,","                bodyContent : '<div id=\"'+CALENDAR_ID+'\"></div><div id=\"'+TIMEDIAL_ID+'\"></div>'","            });","        },","","        /**","         * Will call _show() but only if the panel is rendered. If not, than it will wait for the rendering to be finished.","         *","         * @method _saveShow","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _saveShow : function(modus, initialDateTime, config) {","            var instance = this,","                panel = instance.panel;","","            if (panel.get('rendered')) {","                instance._show(modus, initialDateTime, config);","            }","            else {","                panel.onceAfter(","                    'render',","                    function() {","                        instance._show(modus, initialDateTime, config);","                    }","                );","            }","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","                panel.render();","            }","        },","","        /**","         * Shows the panel-instance, ready to select a date and/or time.","         *","         * @method _show","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _show : function(modus, initialDateTime, config) {","            var instance = this,","                panel = instance.panel,","                presentedDate = initialDateTime || new Date(),","                timeNode = instance._timeNode,","                modal = (config && config.modal) || false,","                forceSelectdate = (config && config.forceSelectdate) || false,","                alignToNode = (config && config.alignToNode) || false,","                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;","","            if (panel.get('visible')) {","                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:","                Y.fire(EVENT_CANCEL);","                // also hide the panel ourselves --> the cancel-event does not do this","                // we need this, because the panel wmigt be redrawed with other settings (like model-change)","                instance.panel.hide();","            }","            if (modus<3) {","                instance.calendar.deselectDates();","                instance.calendar.selectDates(presentedDate);","                if (Lang.isObject(config)) {","                    // Only accept limited properties. Also reset to default on new requests","                    calAttrs = {","                        customRenderer: config.customRenderer || {},","                        showPrevMonth: config.showPrevMonth || false,","                        showNextMonth: config.showNextMonth || false,","                        headerRenderer: config.headerRenderer || '%B %Y',","                        minimumDate: config.minimumDate || null,","                        maximumDate: config.maximumDate || null,","                        enabledDatesRule: config.enabledDatesRule || null,","                        disabledDatesRule: config.disabledDatesRule || null","                    };","                    instance.calendar.setAttrs(calAttrs);","                }","                instance.calendar.show();","            }","            else {","                instance.calendar.hide();","            }","            if (modus>1) {","                if (Lang.isObject(config) && Lang.isString(config.timeformat)) {","                    instance._timeFormat = config.timeformat;","                }","                else {","                    instance._timeFormat = null;","                }","                hours = presentedDate.getHours();","                minutes = presentedDate.getMinutes();","                dialvalue = minutes+60*hours;","                instance.timedial.set('value', dialvalue);","                instance.timedial._originalValue = dialvalue;","                timeNode.setHTML(instance._renderDialTime(hours, minutes));","                timeNode.removeClass(TIME_CHANGED_CLASS);","                instance._toggleTimePicker(true);","","            }","            else {","                instance._toggleTimePicker(false);","            }","            if (alignToNode instanceof Y.Node) {","                window = instance._window;","                if (window) {","                    winWidth = PARSTEINT(window.get('winWidth'));","                    currentScroll = PARSTEINT(window.get('docScrollX'));","                    // check minwidth when no other fontsize is set:","                    // values are just read before after rendering...","                    switch (modus) {","                        case 1: minPanelWidth = 285;","                        break;","                        case 2: minPanelWidth = 155;","                        break;","                        case 3: minPanelWidth = 415;","                        break;","                    }","                    panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);","                    nodeX = alignToNode.getX();","                    nodeWidth = alignToNode.get('offsetWidth');","                    rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);","                }","                panel.align(","                    alignToNode,","                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])","                );","            }","            else {","                panel.centered();","            }","            if (Lang.isBoolean(modal)) {","                panel.set('modal', modal);","            }","            else {","                panel.set('modal', false);","            }","            switch (modus) {","                case 1: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);","                    break;","                case 2: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);","                    break;","                case 3: panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);","            }","            if (config && Lang.isBoolean(config.dragable)) {","                if (config.dragable && !panel.hasPlugin('dd')) {","                    panel.plug(Y.Plugin.Drag);","                    panel.dd.addHandle('.yui3-widget-hd');","                }","                else if (panel.hasPlugin('dd')) {","                    panel.unplug('dd');","                }","            }","            else if (panel.hasPlugin('dd')) {","                panel.unplug('dd');","            }","            instance._unclosable = forceSelectdate;","            instance._closebutton.toggleClass(UNCLOSABLE_CLASS, forceSelectdate);","            panel.show();","         },","","        /**","         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.","         *","         * @method _toggleTimePicker","         * @param {Boolean} visible whether the time-selector will be visible or not","         * @private","         * @since 0.1","        */","        _toggleTimePicker : function(visible) {","            var instance = this;","","            instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);","            instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);","        }","","    }, {","        ATTRS : {","        }","    }",");","","if (!Y.Global.ItsaDateTimePicker) {","    Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();","}","","Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;","","}, '@VERSION@', {","    \"requires\": [","        \"base\",","        \"node-base\",","        \"node-screen\",","        \"panel\",","        \"calendar\",","        \"dial\",","        \"promise\",","        \"cssbutton\",","        \"datatype-date-format\",","        \"dd-plugin\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].lines = {"1":0,"3":0,"24":0,"57":0,"62":0,"167":0,"169":0,"170":0,"171":0,"172":0,"184":0,"196":0,"224":0,"227":0,"228":0,"230":0,"232":0,"235":0,"236":0,"237":0,"238":0,"239":0,"240":0,"241":0,"242":0,"244":0,"247":0,"250":0,"253":0,"254":0,"256":0,"261":0,"289":0,"292":0,"293":0,"295":0,"297":0,"300":0,"301":0,"305":0,"306":0,"307":0,"308":0,"309":0,"310":0,"312":0,"315":0,"318":0,"321":0,"322":0,"323":0,"325":0,"330":0,"358":0,"361":0,"362":0,"364":0,"366":0,"369":0,"370":0,"374":0,"375":0,"377":0,"380":0,"383":0,"386":0,"387":0,"389":0,"394":0,"406":0,"417":0,"419":0,"420":0,"421":0,"423":0,"424":0,"440":0,"444":0,"447":0,"448":0,"449":0,"461":0,"462":0,"467":0,"470":0,"474":0,"475":0,"478":0,"495":0,"497":0,"500":0,"503":0,"514":0,"518":0,"529":0,"532":0,"535":0,"536":0,"540":0,"544":0,"545":0,"559":0,"561":0,"569":0,"575":0,"587":0,"591":0,"592":0,"602":0,"614":0,"619":0,"620":0,"621":0,"622":0,"625":0,"635":0,"639":0,"650":0,"653":0,"654":0,"655":0,"669":0,"672":0,"684":0,"686":0,"721":0,"724":0,"725":0,"728":0,"731":0,"735":0,"736":0,"737":0,"766":0,"775":0,"777":0,"780":0,"782":0,"783":0,"784":0,"785":0,"787":0,"797":0,"799":0,"802":0,"804":0,"805":0,"806":0,"809":0,"811":0,"812":0,"813":0,"814":0,"815":0,"816":0,"817":0,"818":0,"822":0,"824":0,"825":0,"826":0,"827":0,"828":0,"831":0,"832":0,"833":0,"834":0,"835":0,"836":0,"837":0,"839":0,"840":0,"841":0,"842":0,"844":0,"850":0,"852":0,"853":0,"856":0,"858":0,"859":0,"860":0,"861":0,"862":0,"863":0,"865":0,"866":0,"867":0,"868":0,"870":0,"871":0,"874":0,"875":0,"877":0,"878":0,"879":0,"891":0,"893":0,"894":0,"903":0,"904":0,"907":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].functions = {"PARSTEINT:56":0,"initializer:166":0,"dateNode:183":0,"datetimeNode:195":0,"(anonymous 3):234":0,"(anonymous 4):249":0,"(anonymous 2):229":0,"getDate:223":0,"(anonymous 6):299":0,"(anonymous 7):317":0,"(anonymous 5):294":0,"getDateTime:288":0,"(anonymous 9):368":0,"(anonymous 10):382":0,"(anonymous 8):363":0,"getTime:357":0,"timeNode:405":0,"destructor:416":0,"(anonymous 12):452":0,"(anonymous 11):446":0,"(anonymous 13):473":0,"_bindUI:439":0,"(anonymous 15):499":0,"_clearEventhandlers:494":0,"(anonymous 16):531":0,"(anonymous 17):539":0,"_createTimeDial:513":0,"_createCalendar:558":0,"_calendarNewDate:586":0,"action:624":0,"_fillPanel:613":0,"_hide:649":0,"_renderDialTime:668":0,"_renderUI:683":0,"(anonymous 18):730":0,"_saveShow:720":0,"_show:765":0,"_toggleTimePicker:890":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredLines = 202;
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredFunctions = 39;
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

    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "PARSTEINT", 56);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 57);
return parseInt(value, 10);
    };

//===============================================================================================

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 62);
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
         * Reference to the Node inside Y.Dial-instance that draws the selected time.
         * @property _timeNode
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _timeNode : null,

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
         * Internal state of the panel to be closable or not
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "initializer", 166);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 167);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 169);
instance._window = Y.one('window');
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 170);
instance._renderUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 171);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 172);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "dateNode", 183);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 184);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "datetimeNode", 195);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 196);
return YNode.create(BUTTON_DATETIME);
        },

        /**
         * Picks a date using a pop-up Calendar.
         *
         * @method getDate
         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Date-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDate : function(initialDate, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDate", 223);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 224);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 227);
instance._saveShow(1, initialDate, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 228);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 2)", 229);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 230);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 232);
resolvehandler = Y.once(
                        EVENT_SELECTDATE,
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 3)", 234);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 235);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 236);
var selectedDate = e.newDate;
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 237);
selectedDate.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 238);
selectedDate.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 239);
selectedDate.setMinutes(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 240);
selectedDate.setHours(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 241);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 242);
resolve(selectedDate);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 244);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 247);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 4)", 249);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 250);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 253);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 254);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 256);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 261);
return promise;
         },

        /**
         * Picks a date+time using a pop-up Calendar+Dial.
         *
         * @method getDateTime
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the DateTime-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDateTime : function(initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDateTime", 288);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 289);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 292);
instance._saveShow(2, initialDateTime, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 293);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 5)", 294);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 295);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 297);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 6)", 299);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 300);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 301);
var selectedDateTime = instance.calendar.get('selectedDates')[0],
                                timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 305);
selectedDateTime.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 306);
selectedDateTime.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 307);
selectedDateTime.setMinutes(newMinutes);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 308);
selectedDateTime.setHours(newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 309);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 310);
resolve(selectedDateTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 312);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 315);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 7)", 317);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 318);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 321);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 322);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 323);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 325);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 330);
return promise;
         },

        /**
         * Picks a time using a pop-up Dial.
         *
         * @method getTime
         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Time-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getTime : function(initialTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getTime", 357);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 358);
var instance = this,
                promise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 361);
instance._saveShow(3, initialTime, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 362);
promise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 8)", 363);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 364);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 366);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 9)", 368);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 369);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 370);
var timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours),
                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 374);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 375);
resolve(selectedTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 377);
promise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 380);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 10)", 382);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 383);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 386);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 387);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 389);
promise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 394);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "timeNode", 405);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 406);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "destructor", 416);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 417);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 419);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 420);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 421);
instance._panelRendererDelay.cancel();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 423);
instance.timedial.destroy();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 424);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_bindUI", 439);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 440);
var instance = this,
                eventhandlers = instance._eventhandlers,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 444);
panel.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 11)", 446);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 447);
var closebutton;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 448);
instance._closebutton = closebutton = panel.get('boundingBox').one('.yui3-button-close');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 449);
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
                                _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 12)", 452);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 461);
if (!instance._unclosable) {
                                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 462);
Y.fire(EVENT_CANCEL);
                                }
                            }
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 467);
instance._fillPanel();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 470);
instance._panelRendererDelay = Y.later(
                RENDERDELAY,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 13)", 473);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 474);
instance._panelRendererDelay = null;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 475);
panel.render();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 478);
eventhandlers.push(
                Y.one('body').delegate(
                    'click',
                    function(){},
                    '.'+ITSA_BUTTON_DATETIME_CLASS
                )
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_clearEventhandlers", 494);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 495);
var eventhandlers = this._eventhandlers;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 497);
YArray.each(
                eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 15)", 499);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 500);
item.detach();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 503);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createTimeDial", 513);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 514);
var instance = this,
                contentBox = instance.panel.get('contentBox'),
                timedial;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 518);
instance.timedial = timedial = new Y.Dial({
                min:0,
                max:1440,
                stepsPerRevolution: 720,
                strings: {
                    label: '0:00',
                    resetStr: 'Reset',
                    tooltipHandle: 'Drag to set time'
                },
                value: 0
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 529);
timedial.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 16)", 531);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 532);
instance._timeNode = contentBox.one('.yui3-dial-label-string');
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 535);
timedial.render(contentBox.one('#'+TIMEDIAL_ID));
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 536);
instance._eventhandlers.push(
                timedial.on(
                    'valueChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 17)", 539);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 540);
var newVal = parseInt(e.newVal, 10),
                            newHours = Math.floor(newVal/60),
                            newMinutes = newVal - (60*newHours),
                            timeNode = instance._timeNode;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 544);
timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 545);
timeNode.addClass(TIME_CHANGED_CLASS);
                    }
                )
            );
        },

        /**
         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.
         *
         * @method _createCalendar
         * @private
         * @since 0.1
        */
        _createCalendar : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createCalendar", 558);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 559);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 561);
instance.calendar = new Y.Calendar({
                height:'250px',
                width:'250px',
                showPrevMonth: true,
                showNextMonth: true,
                visible: false,
                date: new Date()
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 569);
instance._eventhandlers.push(
                instance.calendar.on(
                    'dateClick',
                    Y.rbind(instance._calendarNewDate, instance)
                )
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 575);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_calendarNewDate", 586);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 587);
var instance = this,
                newdate;

            // only if the calendar is visible --> there is also a new date set before showing up!
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 591);
if (instance.calendar.get('visible')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 592);
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
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 602);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_fillPanel", 613);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 614);
var instance = this,
                panel = instance.panel,
                boundingBox = panel.get('boundingBox'),
                selectButton;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 619);
boundingBox.addClass(PANEL_CLASS);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 620);
instance._createCalendar();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 621);
instance._createTimeDial();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 622);
selectButton = {
                value : 'Select',
                action: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "action", 624);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 625);
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
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 635);
Y.fire(EVENT_SELECTBUTTON);
                },
                section: Y.WidgetStdMod.FOOTER
            };
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 639);
panel.addButton(selectButton);
        },

        /**
         * Hides the panel-instance.
         *
         * @method _hide
         * @private
         * @since 0.1
        */
        _hide : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_hide", 649);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 650);
var instance = this;

            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 653);
instance.calendar.hide();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 654);
instance._toggleTimePicker(false);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 655);
instance.panel.hide();
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderDialTime", 668);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 669);
var instance = this,
                time = new Date(1900, 0, 1, hours, minutes, 0, 0);

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 672);
return Y.Date.format(time, {format: instance._timeFormat || '%H:%M'});
        },

        /**
         * Renderes the Panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.
         *
         * @method _renderUI
         * @private
         * @protected
         * @since 0.1
         */
        _renderUI: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderUI", 683);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 684);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 686);
instance.panel = new Y.Panel({
                zIndex: 15000,
                modal   : false,
                visible: false,
                render  : false, // we will render after some delaytime, specified with RENDERDELAY
                fillHeight: null,
                bodyContent : '<div id="'+CALENDAR_ID+'"></div><div id="'+TIMEDIAL_ID+'"></div>'
            });
        },

        /**
         * Will call _show() but only if the panel is rendered. If not, than it will wait for the rendering to be finished.
         *
         * @method _saveShow
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _saveShow : function(modus, initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_saveShow", 720);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 721);
var instance = this,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 724);
if (panel.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 725);
instance._show(modus, initialDateTime, config);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 728);
panel.onceAfter(
                    'render',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 18)", 730);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 731);
instance._show(modus, initialDateTime, config);
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 735);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 736);
instance._panelRendererDelay.cancel();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 737);
panel.render();
            }
        },

        /**
         * Shows the panel-instance, ready to select a date and/or time.
         *
         * @method _show
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Y.Node} [config.alignToNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {Boolean} [forceSelectdate] Force the promise always to become fulfilled by hiding the close-button
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _show : function(modus, initialDateTime, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_show", 765);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 766);
var instance = this,
                panel = instance.panel,
                presentedDate = initialDateTime || new Date(),
                timeNode = instance._timeNode,
                modal = (config && config.modal) || false,
                forceSelectdate = (config && config.forceSelectdate) || false,
                alignToNode = (config && config.alignToNode) || false,
                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 775);
if (panel.get('visible')) {
                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 777);
Y.fire(EVENT_CANCEL);
                // also hide the panel ourselves --> the cancel-event does not do this
                // we need this, because the panel wmigt be redrawed with other settings (like model-change)
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 780);
instance.panel.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 782);
if (modus<3) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 783);
instance.calendar.deselectDates();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 784);
instance.calendar.selectDates(presentedDate);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 785);
if (Lang.isObject(config)) {
                    // Only accept limited properties. Also reset to default on new requests
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 787);
calAttrs = {
                        customRenderer: config.customRenderer || {},
                        showPrevMonth: config.showPrevMonth || false,
                        showNextMonth: config.showNextMonth || false,
                        headerRenderer: config.headerRenderer || '%B %Y',
                        minimumDate: config.minimumDate || null,
                        maximumDate: config.maximumDate || null,
                        enabledDatesRule: config.enabledDatesRule || null,
                        disabledDatesRule: config.disabledDatesRule || null
                    };
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 797);
instance.calendar.setAttrs(calAttrs);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 799);
instance.calendar.show();
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 802);
instance.calendar.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 804);
if (modus>1) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 805);
if (Lang.isObject(config) && Lang.isString(config.timeformat)) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 806);
instance._timeFormat = config.timeformat;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 809);
instance._timeFormat = null;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 811);
hours = presentedDate.getHours();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 812);
minutes = presentedDate.getMinutes();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 813);
dialvalue = minutes+60*hours;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 814);
instance.timedial.set('value', dialvalue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 815);
instance.timedial._originalValue = dialvalue;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 816);
timeNode.setHTML(instance._renderDialTime(hours, minutes));
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 817);
timeNode.removeClass(TIME_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 818);
instance._toggleTimePicker(true);

            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 822);
instance._toggleTimePicker(false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 824);
if (alignToNode instanceof Y.Node) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 825);
window = instance._window;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 826);
if (window) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 827);
winWidth = PARSTEINT(window.get('winWidth'));
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 828);
currentScroll = PARSTEINT(window.get('docScrollX'));
                    // check minwidth when no other fontsize is set:
                    // values are just read before after rendering...
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 831);
switch (modus) {
                        case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 832);
minPanelWidth = 285;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 833);
break;
                        case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 834);
minPanelWidth = 155;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 835);
break;
                        case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 836);
minPanelWidth = 415;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 837);
break;
                    }
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 839);
panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 840);
nodeX = alignToNode.getX();
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 841);
nodeWidth = alignToNode.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 842);
rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 844);
panel.align(
                    alignToNode,
                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 850);
panel.centered();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 852);
if (Lang.isBoolean(modal)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 853);
panel.set('modal', modal);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 856);
panel.set('modal', false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 858);
switch (modus) {
                case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 859);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 860);
break;
                case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 861);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 862);
break;
                case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 863);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 865);
if (config && Lang.isBoolean(config.dragable)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 866);
if (config.dragable && !panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 867);
panel.plug(Y.Plugin.Drag);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 868);
panel.dd.addHandle('.yui3-widget-hd');
                }
                else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 870);
if (panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 871);
panel.unplug('dd');
                }}
            }
            else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 874);
if (panel.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 875);
panel.unplug('dd');
            }}
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 877);
instance._unclosable = forceSelectdate;
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 878);
instance._closebutton.toggleClass(UNCLOSABLE_CLASS, forceSelectdate);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 879);
panel.show();
         },

        /**
         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.
         *
         * @method _toggleTimePicker
         * @param {Boolean} visible whether the time-selector will be visible or not
         * @private
         * @since 0.1
        */
        _toggleTimePicker : function(visible) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_toggleTimePicker", 890);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 891);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 893);
instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 894);
instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);
        }

    }, {
        ATTRS : {
        }
    }
);

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 903);
if (!Y.Global.ItsaDateTimePicker) {
    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 904);
Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();
}

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 907);
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
