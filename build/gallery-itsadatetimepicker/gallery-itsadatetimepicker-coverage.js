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
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].code=["YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSADateTimePicker"," *"," *"," * This widget ...."," *"," * @module gallery-itsadatetimepicker"," * @extends Base"," * @class ITSADateTimePicker"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YNode = Y.Node,","    YArray = Y.Array,","    WIDGET_CLASS = 'itsa-datetimepicker',","    PANEL_CLASS = WIDGET_CLASS + '-panel',","    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',","    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,","                        // We don't need to slower things down during startup.","    CALENDAR_ID = WIDGET_CLASS + '-datepicker',","    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',","    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',","    HEADERCONTENT_DATE = 'Select date',","    HEADERCONTENT_DATETIME = 'Select date and time',","    HEADERCONTENT_TIME = 'Select time',","","    YUI3BUTTON_CLASS = 'yui3-button',","    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',","    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',","    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',","","    BUTTON_DATE = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATE_CLASS+'\"></span></button>',","    BUTTON_DATETIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATETIME_CLASS+'\"></span></button>',","    BUTTON_TIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_TIME_CLASS+'\"></span></button>',","","    EVENT_DATEPICKER = 'datetimepicker:',","    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',","    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',","    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    };","","//===============================================================================================","","Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {","","        /**","         * Reference to the Y.Panel-instance","         * @property panel","         * @default null","         * @type Y.Panel","         * @since 0.1","        */","        panel : null,","","        /**","         * Reference to the Y.Calendar-instance","         * @property calendar","         * @default null","         * @type Y.Calendar","         * @since 0.1","        */","        calendar : null,","","        /**","         * Reference to the Y.Dial-instance","         * @property timedial","         * @default null","         * @type Y.Dial","         * @since 0.1","        */","        timedial : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","         * @since 0.1","        */","        _eventhandlers : [],","","        /**","         * Internal reference to the timerobject that is used to delay the rendering.","         * @property _panelRendererDelay","         * @private","         * @default null","         * @type Object","         * @since 0.1","        */","        _panelRendererDelay : null,","","        /**","         * Reference to Y.one('window')","         * @property _window","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _window : null,","","        /**","         * Reference to the Node inside Y.Dial-instance that draws the selected time.","         * @property _timeNode","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _timeNode : null,","","        /**","         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.","         * @property _timeFormat","         * @private","         * @default null","         * @type String","         * @since 0.1","        */","        _timeFormat : null,","","        /**","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this;","","            instance._window = Y.one('window');","            instance._renderUI();","            instance._bindUI();","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method createDateNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.","         * @since 0.1","        */","        dateNode : function() {","            return YNode.create(BUTTON_DATE);","        },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method datetimeNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.","         * @since 0.1","        */","        datetimeNode : function() {","            return YNode.create(BUTTON_DATETIME);","        },","","        /**","         * Picks a date using a pop-up Calendar.","         *","         * @method getDate","         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Date-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDate : function(initialDate, activationNode, config) {","            var instance = this;","","            instance._saveShow(1, initialDate, activationNode, config);","            return new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTDATE,","                        function(e) {","                            rejecthandler.detach();","                            var selectedDate = e.newDate;","                            selectedDate.setMilliseconds(0);","                            selectedDate.setSeconds(0);","                            selectedDate.setMinutes(0);","                            selectedDate.setHours(0);","                            instance._hide();","                            resolve(selectedDate);","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            reject(new Error('canceled'));","                        }","                    );","                }","            );","         },","","        /**","         * Picks a date+time using a pop-up Calendar+Dial.","         *","         * @method getDateTime","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the DateTime-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDateTime : function(initialDateTime, activationNode, config) {","            var instance = this;","","            instance._saveShow(2, initialDateTime, activationNode, config);","            return new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var selectedDateTime = instance.calendar.get('selectedDates')[0],","                                timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours);","                            selectedDateTime.setMilliseconds(0);","                            selectedDateTime.setSeconds(0);","                            selectedDateTime.setMinutes(newMinutes);","                            selectedDateTime.setHours(newHours);","                            instance._hide();","                            resolve(selectedDateTime);","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                        }","                    );","                }","            );","         },","","        /**","         * Picks a time using a pop-up Dial.","         *","         * @method getTime","         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Time-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getTime : function(initialTime, activationNode, config) {","            var instance = this;","","            instance._saveShow(3, initialTime, activationNode, config);","            return new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours),","                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);","                            instance._hide();","                            resolve(selectedTime);","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                        }","                    );","                }","            );","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method timeNode","         * @return {Y.Node} Node of the type 'button' with a timeicon inside.","         * @since 0.1","        */","        timeNode : function() {","            return YNode.create(BUTTON_TIME);","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor: function() {","            var instance = this;","","            instance._clearEventhandlers();","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","            }","            instance.timedial.destroy();","            instance.calendar.destroy();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method _bindUI","         * @private","         * @protected","         * @since 0.1","         */","        _bindUI: function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                panel = instance.panel;","","            panel.onceAfter(","                'render',","                function() {","                    eventhandlers.push(","                        panel.get('boundingBox').one('.yui3-button-close').on(","                            'click',","                            function() {","                                /**","                                * Fired when the Panel is closed without saving the values.","                                *","                                * @event datetimepicker:cancel","                                * @since 0.1","                                */","                                Y.fire(EVENT_CANCEL);","                            }","                        )","                    );","                    instance._fillPanel();","                }","            );","            instance._panelRendererDelay = Y.later(","                RENDERDELAY,","                instance,","                function() {","                    instance._panelRendererDelay = null;","                    panel.render();","                }","            );","            eventhandlers.push(","                Y.one('body').delegate(","                    'click',","                    function(){},","                    '.'+ITSA_BUTTON_DATETIME_CLASS","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Creates (renderes) the Y.Dial-instance that is used for selecting times.","         *","         * @method _createTimeDial","         * @private","         * @since 0.1","        */","        _createTimeDial : function() {","            var instance = this,","                contentBox = instance.panel.get('contentBox'),","                timedial;","","            instance.timedial = timedial = new Y.Dial({","                min:0,","                max:1440,","                stepsPerRevolution: 720,","                strings: {","                    label: '0:00',","                    resetStr: 'Reset',","                    tooltipHandle: 'Drag to set time'","                },","                value: 0","            });","            timedial.onceAfter(","                'render',","                function() {","                    instance._timeNode = contentBox.one('.yui3-dial-label-string');","                }","            );","            timedial.render(contentBox.one('#'+TIMEDIAL_ID));","            instance._eventhandlers.push(","                timedial.on(","                    'valueChange',","                    function(e) {","                        var newVal = parseInt(e.newVal, 10),","                            newHours = Math.floor(newVal/60),","                            newMinutes = newVal - (60*newHours),","                            timeNode = instance._timeNode;","                        timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));","                        timeNode.addClass(TIME_CHANGED_CLASS);","                    }","                )","            );","        },","","        /**","         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _createCalendar : function() {","            var instance = this;","","            instance.calendar = new Y.Calendar({","                height:'250px',","                width:'250px',","                showPrevMonth: true,","                showNextMonth: true,","                visible: false,","                date: new Date()","            });","            instance._eventhandlers.push(","                instance.calendar.on(","                    'selectionChange',","                    Y.rbind(instance._calendarNewDate, instance)","                )","            );","            instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));","        },","","        /**","         * Fires an event with the new selected Date.","         *","         * @method _calendarNewDate","         * @param {EventFacade} e","         * @private","         * @since 0.1","        */","        _calendarNewDate : function(e) {","            var instance = this,","                newdate;","","            // only if the calendar is visible --> there is also a new date set before showing up!","            if (instance.calendar.get('visible')) {","                newdate = e.newSelection[0];","                /**","                * Fired when a new Date is selected from the Panel's Calendar-instance.","                *","                * @event datetimepicker:selectdate","                * @param {Date} newDate the selected date","                * @since 0.1","                */","                Y.fire(EVENT_SELECTDATE, {newDate: newdate});","            }","        },","","        /**","         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _fillPanel : function() {","            var instance = this,","                panel = instance.panel,","                boundingBox = panel.get('boundingBox'),","                selectButton;","","            boundingBox.addClass(PANEL_CLASS);","            instance._createCalendar();","            instance._createTimeDial();","            selectButton = {","                value : 'Select',","                action: function(e) {","                    e.preventDefault();","                    /**","                    * Fired when new values are selected by the Panel by pressing the 'Select'-button","                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)","                    *","                    * @event datetimepicker:selected","                    * @since 0.1","                    */","                    Y.fire(EVENT_SELECTBUTTON);","                },","                section: Y.WidgetStdMod.FOOTER","            };","            panel.addButton(selectButton);","        },","","        /**","         * Hides the panel-instance.","         *","         * @method _hide","         * @private","         * @since 0.1","        */","        _hide : function() {","            var instance = this;","","            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen","            instance.calendar.hide();","            instance._toggleTimePicker(false);","            instance.panel.hide();","         },","","        /**","         * Renderes the time in the right format (stored inside the property '_timeFormat')","         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}","         *","         * @method _calendarNewDate","         * @param {Int} hours","         * @param {Int} minutes","         * @private","         * @since 0.1","        */","        _renderDialTime : function(hours, minutes) {","            var instance = this,","                time = new Date(1900, 0, 1, hours, minutes, 0, 0);","","            return Y.Date.format(time, {format: instance._timeFormat || '%H:%M'});","        },","","        /**","         * Renderes the Panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.","         *","         * @method _renderUI","         * @private","         * @protected","         * @since 0.1","         */","        _renderUI: function() {","            var instance = this;","","            instance.panel = new Y.Panel({","                zIndex: 15000,","                modal   : false,","                visible: false,","                render  : false, // we will render after some delaytime, specified with RENDERDELAY","                fillHeight: null,","                bodyContent : '<div id=\"'+CALENDAR_ID+'\"></div><div id=\"'+TIMEDIAL_ID+'\"></div>'","            });","        },","","        /**","         * Will call _show() but only if the panel is rendered. If not, than it will wait for the rendering to be finished.","         *","         * @method _saveShow","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _saveShow : function(modus, initialDateTime, activationNode, config) {","            var instance = this,","                panel = instance.panel;","","            if (panel.get('rendered')) {","                instance._show(modus, initialDateTime, activationNode, config);","            }","            else {","                panel.onceAfter(","                    'render',","                    function() {","                        instance._show(modus, initialDateTime, activationNode, config);","                    }","                );","            }","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","                panel.render();","            }","        },","","        /**","         * Shows the panel-instance, ready to select a date and/or time.","         *","         * @method _show","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _show : function(modus, initialDateTime, activationNode, config) {","            var instance = this,","                panel = instance.panel,","                presentedDate = initialDateTime || new Date(),","                timeNode = instance._timeNode,","                modal = config && config.modal,","                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;","","            if (panel.get('visible')) {","                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:","                Y.fire(EVENT_CANCEL);","                // also hide the panel ourselves --> the cancel-event does not do this","                // we need this, because the panel wmigt be redrawed with other settings (like model-change)","                instance.panel.hide();","            }","            if (modus<3) {","                instance.calendar.deselectDates();","                instance.calendar.selectDates(presentedDate);","                if (Lang.isObject(config)) {","                    // Only accept limited properties. Also reset to default on new requests","                    calAttrs = {","                        customRenderer: config.customRenderer || {},","                        showPrevMonth: config.showPrevMonth || false,","                        showNextMonth: config.showNextMonth || false,","                        headerRenderer: config.headerRenderer || '%B %Y',","                        minimumDate: config.minimumDate || null,","                        maximumDate: config.maximumDate || null,","                        enabledDatesRule: config.enabledDatesRule || null,","                        disabledDatesRule: config.disabledDatesRule || null","                    };","                    instance.calendar.setAttrs(calAttrs);","                }","                instance.calendar.show();","            }","            else {","                instance.calendar.hide();","            }","            if (modus>1) {","                if (Lang.isObject(config) && Lang.isString(config.timeformat)) {","                    instance._timeFormat = config.timeformat;","                }","                else {","                    instance._timeFormat = null;","                }","                hours = presentedDate.getHours();","                minutes = presentedDate.getMinutes();","                dialvalue = minutes+60*hours;","                instance.timedial.set('value', dialvalue);","                instance.timedial._originalValue = dialvalue;","                timeNode.setHTML(instance._renderDialTime(hours, minutes));","                timeNode.removeClass(TIME_CHANGED_CLASS);","                instance._toggleTimePicker(true);","","            }","            else {","                instance._toggleTimePicker(false);","            }","            if (activationNode) {","                window = instance._window;","                if (window) {","                    winWidth = PARSTEINT(window.get('winWidth'));","                    currentScroll = PARSTEINT(window.get('docScrollX'));","                    // check minwidth when no other fontsize is set:","                    // values are just read before after rendering...","                    switch (modus) {","                        case 1: minPanelWidth = 285;","                        break;","                        case 2: minPanelWidth = 155;","                        break;","                        case 3: minPanelWidth = 415;","                        break;","                    }","                    panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);","                    nodeX = activationNode.getX();","                    nodeWidth = activationNode.get('offsetWidth');","                    rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);","                }","                panel.align(","                    activationNode,","                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])","                );","            }","            else {","                panel.centered();","            }","            if (Lang.isBoolean(modal)) {","                panel.set('modal', modal);","            }","            else {","                panel.set('modal', false);","            }","            switch (modus) {","                case 1: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);","                    break;","                case 2: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);","                    break;","                case 3: panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);","            }","            if (config && Lang.isBoolean(config.dragable)) {","                if (config.dragable && !panel.hasPlugin('dd')) {","                    panel.plug(Y.Plugin.Drag);","                    panel.dd.addHandle('.yui3-widget-hd');","                }","                else if (panel.hasPlugin('dd')) {","                    panel.unplug('dd');","                }","            }","            else if (panel.hasPlugin('dd')) {","                panel.unplug('dd');","            }","            panel.show();","         },","","        /**","         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.","         *","         * @method _toggleTimePicker","         * @param {Boolean} visible whether the time-selector will be visible or not","         * @private","         * @since 0.1","        */","        _toggleTimePicker : function(visible) {","            var instance = this;","","            instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);","            instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);","        }","","    }, {","        ATTRS : {","        }","    }",");","","if (!Y.Global.ItsaDateTimePicker) {","    Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();","}","","Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;","","}, '@VERSION@', {","    \"requires\": [","        \"base\",","        \"node-base\",","        \"node-screen\",","        \"panel\",","        \"calendar\",","        \"dial\",","        \"promise\",","        \"cssbutton\",","        \"datatype-date-format\",","        \"dd-plugin\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].lines = {"1":0,"3":0,"23":0,"54":0,"59":0,"144":0,"146":0,"147":0,"148":0,"160":0,"172":0,"199":0,"201":0,"202":0,"204":0,"206":0,"209":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"216":0,"219":0,"222":0,"225":0,"226":0,"257":0,"259":0,"260":0,"262":0,"264":0,"267":0,"268":0,"272":0,"273":0,"274":0,"275":0,"276":0,"277":0,"280":0,"283":0,"286":0,"287":0,"288":0,"319":0,"321":0,"322":0,"324":0,"326":0,"329":0,"330":0,"334":0,"335":0,"338":0,"341":0,"344":0,"345":0,"361":0,"372":0,"374":0,"375":0,"376":0,"378":0,"379":0,"395":0,"399":0,"402":0,"412":0,"416":0,"419":0,"423":0,"424":0,"427":0,"444":0,"447":0,"460":0,"464":0,"475":0,"478":0,"481":0,"482":0,"486":0,"490":0,"491":0,"505":0,"507":0,"515":0,"521":0,"533":0,"537":0,"538":0,"546":0,"558":0,"563":0,"564":0,"565":0,"566":0,"569":0,"577":0,"581":0,"592":0,"595":0,"596":0,"597":0,"611":0,"614":0,"626":0,"628":0,"662":0,"665":0,"666":0,"669":0,"672":0,"676":0,"677":0,"678":0,"706":0,"713":0,"715":0,"718":0,"720":0,"721":0,"722":0,"723":0,"725":0,"735":0,"737":0,"740":0,"742":0,"743":0,"744":0,"747":0,"749":0,"750":0,"751":0,"752":0,"753":0,"754":0,"755":0,"756":0,"760":0,"762":0,"763":0,"764":0,"765":0,"766":0,"769":0,"770":0,"771":0,"772":0,"773":0,"774":0,"775":0,"777":0,"778":0,"779":0,"780":0,"782":0,"788":0,"790":0,"791":0,"794":0,"796":0,"797":0,"798":0,"799":0,"800":0,"801":0,"803":0,"804":0,"805":0,"806":0,"808":0,"809":0,"812":0,"813":0,"815":0,"827":0,"829":0,"830":0,"839":0,"840":0,"843":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].functions = {"PARSTEINT:53":0,"initializer:143":0,"dateNode:159":0,"datetimeNode:171":0,"(anonymous 3):208":0,"(anonymous 4):221":0,"(anonymous 2):203":0,"getDate:198":0,"(anonymous 6):266":0,"(anonymous 7):282":0,"(anonymous 5):261":0,"getDateTime:256":0,"(anonymous 9):328":0,"(anonymous 10):340":0,"(anonymous 8):323":0,"getTime:318":0,"timeNode:360":0,"destructor:371":0,"(anonymous 12):405":0,"(anonymous 11):401":0,"(anonymous 13):422":0,"_bindUI:394":0,"(anonymous 15):446":0,"_clearEventhandlers:443":0,"(anonymous 16):477":0,"(anonymous 17):485":0,"_createTimeDial:459":0,"_createCalendar:504":0,"_calendarNewDate:532":0,"action:568":0,"_fillPanel:557":0,"_hide:591":0,"_renderDialTime:610":0,"_renderUI:625":0,"(anonymous 18):671":0,"_saveShow:661":0,"_show:705":0,"_toggleTimePicker:826":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredLines = 185;
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredFunctions = 39;
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1);
YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 3);
'use strict';

/**
 *
 * Widget ITSADateTimePicker
 *
 *
 * This widget ....
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

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 23);
var Lang = Y.Lang,
    YNode = Y.Node,
    YArray = Y.Array,
    WIDGET_CLASS = 'itsa-datetimepicker',
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

    EVENT_DATEPICKER = 'datetimepicker:',
    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',
    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',
    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',

    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "PARSTEINT", 53);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 54);
return parseInt(value, 10);
    };

//===============================================================================================

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 59);
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
         * Reference to Y.one('window')
         * @property _window
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _window : null,

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
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "initializer", 143);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 144);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 146);
instance._window = Y.one('window');
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 147);
instance._renderUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 148);
instance._bindUI();
         },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method createDateNode
         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.
         * @since 0.1
        */
        dateNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "dateNode", 159);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 160);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "datetimeNode", 171);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 172);
return YNode.create(BUTTON_DATETIME);
        },

        /**
         * Picks a date using a pop-up Calendar.
         *
         * @method getDate
         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
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
        getDate : function(initialDate, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDate", 198);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 199);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 201);
instance._saveShow(1, initialDate, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 202);
return new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 2)", 203);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 204);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 206);
resolvehandler = Y.once(
                        EVENT_SELECTDATE,
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 3)", 208);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 209);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 210);
var selectedDate = e.newDate;
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 211);
selectedDate.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 212);
selectedDate.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 213);
selectedDate.setMinutes(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 214);
selectedDate.setHours(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 215);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 216);
resolve(selectedDate);
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 219);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 4)", 221);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 222);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 225);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 226);
reject(new Error('canceled'));
                        }
                    );
                }
            );
         },

        /**
         * Picks a date+time using a pop-up Calendar+Dial.
         *
         * @method getDateTime
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
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
        getDateTime : function(initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDateTime", 256);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 257);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 259);
instance._saveShow(2, initialDateTime, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 260);
return new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 5)", 261);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 262);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 264);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 6)", 266);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 267);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 268);
var selectedDateTime = instance.calendar.get('selectedDates')[0],
                                timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 272);
selectedDateTime.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 273);
selectedDateTime.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 274);
selectedDateTime.setMinutes(newMinutes);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 275);
selectedDateTime.setHours(newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 276);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 277);
resolve(selectedDateTime);
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 280);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 7)", 282);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 283);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 286);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 287);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 288);
reject(new Error('canceled'));
                        }
                    );
                }
            );
         },

        /**
         * Picks a time using a pop-up Dial.
         *
         * @method getTime
         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
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
        getTime : function(initialTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getTime", 318);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 319);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 321);
instance._saveShow(3, initialTime, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 322);
return new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 8)", 323);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 324);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 326);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 9)", 328);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 329);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 330);
var timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours),
                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 334);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 335);
resolve(selectedTime);
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 338);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 10)", 340);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 341);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 344);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 345);
reject(new Error('canceled'));
                        }
                    );
                }
            );
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "timeNode", 360);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 361);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "destructor", 371);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 372);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 374);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 375);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 376);
instance._panelRendererDelay.cancel();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 378);
instance.timedial.destroy();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 379);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_bindUI", 394);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 395);
var instance = this,
                eventhandlers = instance._eventhandlers,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 399);
panel.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 11)", 401);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 402);
eventhandlers.push(
                        panel.get('boundingBox').one('.yui3-button-close').on(
                            'click',
                            function() {
                                /**
                                * Fired when the Panel is closed without saving the values.
                                *
                                * @event datetimepicker:cancel
                                * @since 0.1
                                */
                                _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 12)", 405);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 412);
Y.fire(EVENT_CANCEL);
                            }
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 416);
instance._fillPanel();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 419);
instance._panelRendererDelay = Y.later(
                RENDERDELAY,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 13)", 422);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 423);
instance._panelRendererDelay = null;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 424);
panel.render();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 427);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_clearEventhandlers", 443);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 444);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 15)", 446);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 447);
item.detach();
                }
            );
        },

        /**
         * Creates (renderes) the Y.Dial-instance that is used for selecting times.
         *
         * @method _createTimeDial
         * @private
         * @since 0.1
        */
        _createTimeDial : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createTimeDial", 459);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 460);
var instance = this,
                contentBox = instance.panel.get('contentBox'),
                timedial;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 464);
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
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 475);
timedial.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 16)", 477);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 478);
instance._timeNode = contentBox.one('.yui3-dial-label-string');
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 481);
timedial.render(contentBox.one('#'+TIMEDIAL_ID));
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 482);
instance._eventhandlers.push(
                timedial.on(
                    'valueChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 17)", 485);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 486);
var newVal = parseInt(e.newVal, 10),
                            newHours = Math.floor(newVal/60),
                            newMinutes = newVal - (60*newHours),
                            timeNode = instance._timeNode;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 490);
timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 491);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createCalendar", 504);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 505);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 507);
instance.calendar = new Y.Calendar({
                height:'250px',
                width:'250px',
                showPrevMonth: true,
                showNextMonth: true,
                visible: false,
                date: new Date()
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 515);
instance._eventhandlers.push(
                instance.calendar.on(
                    'selectionChange',
                    Y.rbind(instance._calendarNewDate, instance)
                )
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 521);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_calendarNewDate", 532);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 533);
var instance = this,
                newdate;

            // only if the calendar is visible --> there is also a new date set before showing up!
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 537);
if (instance.calendar.get('visible')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 538);
newdate = e.newSelection[0];
                /**
                * Fired when a new Date is selected from the Panel's Calendar-instance.
                *
                * @event datetimepicker:selectdate
                * @param {Date} newDate the selected date
                * @since 0.1
                */
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 546);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_fillPanel", 557);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 558);
var instance = this,
                panel = instance.panel,
                boundingBox = panel.get('boundingBox'),
                selectButton;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 563);
boundingBox.addClass(PANEL_CLASS);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 564);
instance._createCalendar();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 565);
instance._createTimeDial();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 566);
selectButton = {
                value : 'Select',
                action: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "action", 568);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 569);
e.preventDefault();
                    /**
                    * Fired when new values are selected by the Panel by pressing the 'Select'-button
                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)
                    *
                    * @event datetimepicker:selected
                    * @since 0.1
                    */
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 577);
Y.fire(EVENT_SELECTBUTTON);
                },
                section: Y.WidgetStdMod.FOOTER
            };
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 581);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_hide", 591);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 592);
var instance = this;

            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 595);
instance.calendar.hide();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 596);
instance._toggleTimePicker(false);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 597);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderDialTime", 610);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 611);
var instance = this,
                time = new Date(1900, 0, 1, hours, minutes, 0, 0);

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 614);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderUI", 625);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 626);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 628);
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
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
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
        _saveShow : function(modus, initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_saveShow", 661);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 662);
var instance = this,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 665);
if (panel.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 666);
instance._show(modus, initialDateTime, activationNode, config);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 669);
panel.onceAfter(
                    'render',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 18)", 671);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 672);
instance._show(modus, initialDateTime, activationNode, config);
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 676);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 677);
instance._panelRendererDelay.cancel();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 678);
panel.render();
            }
        },

        /**
         * Shows the panel-instance, ready to select a date and/or time.
         *
         * @method _show
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
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
        _show : function(modus, initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_show", 705);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 706);
var instance = this,
                panel = instance.panel,
                presentedDate = initialDateTime || new Date(),
                timeNode = instance._timeNode,
                modal = config && config.modal,
                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 713);
if (panel.get('visible')) {
                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 715);
Y.fire(EVENT_CANCEL);
                // also hide the panel ourselves --> the cancel-event does not do this
                // we need this, because the panel wmigt be redrawed with other settings (like model-change)
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 718);
instance.panel.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 720);
if (modus<3) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 721);
instance.calendar.deselectDates();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 722);
instance.calendar.selectDates(presentedDate);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 723);
if (Lang.isObject(config)) {
                    // Only accept limited properties. Also reset to default on new requests
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 725);
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
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 735);
instance.calendar.setAttrs(calAttrs);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 737);
instance.calendar.show();
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 740);
instance.calendar.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 742);
if (modus>1) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 743);
if (Lang.isObject(config) && Lang.isString(config.timeformat)) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 744);
instance._timeFormat = config.timeformat;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 747);
instance._timeFormat = null;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 749);
hours = presentedDate.getHours();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 750);
minutes = presentedDate.getMinutes();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 751);
dialvalue = minutes+60*hours;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 752);
instance.timedial.set('value', dialvalue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 753);
instance.timedial._originalValue = dialvalue;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 754);
timeNode.setHTML(instance._renderDialTime(hours, minutes));
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 755);
timeNode.removeClass(TIME_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 756);
instance._toggleTimePicker(true);

            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 760);
instance._toggleTimePicker(false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 762);
if (activationNode) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 763);
window = instance._window;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 764);
if (window) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 765);
winWidth = PARSTEINT(window.get('winWidth'));
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 766);
currentScroll = PARSTEINT(window.get('docScrollX'));
                    // check minwidth when no other fontsize is set:
                    // values are just read before after rendering...
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 769);
switch (modus) {
                        case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 770);
minPanelWidth = 285;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 771);
break;
                        case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 772);
minPanelWidth = 155;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 773);
break;
                        case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 774);
minPanelWidth = 415;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 775);
break;
                    }
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 777);
panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 778);
nodeX = activationNode.getX();
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 779);
nodeWidth = activationNode.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 780);
rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 782);
panel.align(
                    activationNode,
                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 788);
panel.centered();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 790);
if (Lang.isBoolean(modal)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 791);
panel.set('modal', modal);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 794);
panel.set('modal', false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 796);
switch (modus) {
                case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 797);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 798);
break;
                case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 799);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 800);
break;
                case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 801);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 803);
if (config && Lang.isBoolean(config.dragable)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 804);
if (config.dragable && !panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 805);
panel.plug(Y.Plugin.Drag);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 806);
panel.dd.addHandle('.yui3-widget-hd');
                }
                else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 808);
if (panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 809);
panel.unplug('dd');
                }}
            }
            else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 812);
if (panel.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 813);
panel.unplug('dd');
            }}
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 815);
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
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_toggleTimePicker", 826);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 827);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 829);
instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 830);
instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);
        }

    }, {
        ATTRS : {
        }
    }
);

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 839);
if (!Y.Global.ItsaDateTimePicker) {
    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 840);
Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();
}

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 843);
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
