YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {

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

var Lang = Y.Lang,
    YNode = Y.Node,
    YArray = Y.Array,
    WIDGET_CLASS = 'itsa-datetimepicker',
    LOADING_CLASS = WIDGET_CLASS + '-loading',
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
        return parseInt(value, 10);
    };

//===============================================================================================

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
            var instance = this;

            Y.log('initializer', 'info', 'Itsa-DateTimePicker');
            instance._window = Y.one('window');
            instance._renderUI();
            instance._bindUI();
            Y.one('body').removeClass(LOADING_CLASS);
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
            Y.log('dateNode', 'info', 'Itsa-DateTimePicker');
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
            Y.log('datetimeNode', 'info', 'Itsa-DateTimePicker');
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
            var instance = this,
                testPromise;

            Y.log('getDate', 'info', 'Itsa-DateTimePicker');
            instance._saveShow(1, initialDate, config);
            testPromise = new Y.Promise(
                function(resolve, reject) {
                    var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    resolvehandler = Y.once(
                        EVENT_SELECTDATE,
                        function(e) {
                            rejecthandler.detach();
                            var selectedDate = e.newDate;
                            selectedDate.setMilliseconds(0);
                            selectedDate.setSeconds(0);
                            selectedDate.setMinutes(0);
                            selectedDate.setHours(0);
                            instance._hide();
                            resolve(selectedDate);
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                    rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            instance.calendar.hide();
                            reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                }
            );
            return testPromise;
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
            var instance = this,
                testPromise;

            Y.log('getDateTime', 'info', 'Itsa-DateTimePicker');
            instance._saveShow(2, initialDateTime, config);
            testPromise = new Y.Promise(
                function(resolve, reject) {
                    var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            rejecthandler.detach();
                            var selectedDateTime = instance.calendar.get('selectedDates')[0],
                                timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours);
                            selectedDateTime.setMilliseconds(0);
                            selectedDateTime.setSeconds(0);
                            selectedDateTime.setMinutes(newMinutes);
                            selectedDateTime.setHours(newHours);
                            instance._hide();
                            resolve(selectedDateTime);
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                    rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            instance.calendar.hide();
                            instance._toggleTimePicker(false);
                            reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                }
            );
            return testPromise;
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
            var instance = this,
                testPromise;

            Y.log('getTime', 'info', 'Itsa-DateTimePicker');
            instance._saveShow(3, initialTime, config);
            testPromise = new Y.Promise(
                function(resolve, reject) {
                    var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            rejecthandler.detach();
                            var timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours),
                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);
                            instance._hide();
                            resolve(selectedTime);
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                    rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            instance._toggleTimePicker(false);
                            reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            testPromise = null;
                        }
                    );
                }
            );
            return testPromise;
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
            Y.log('timeNode', 'info', 'Itsa-DateTimePicker');
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
            var instance = this;

            Y.log('destructor', 'info', 'Itsa-DateTimePicker');
            instance._clearEventhandlers();
            if (instance._panelRendererDelay) {
                instance._panelRendererDelay.cancel();
            }
            instance.timedial.destroy();
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
            var instance = this,
                eventhandlers = instance._eventhandlers,
                panel = instance.panel;

            Y.log('_bindUI', 'info', 'Itsa-DateTimePicker');
            panel.onceAfter(
                'render',
                function() {
                    eventhandlers.push(
                        panel.get('boundingBox').one('.yui3-button-close').on(
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
                                Y.fire(EVENT_CANCEL);
                            }
                        )
                    );
                    instance._fillPanel();
                }
            );
            instance._panelRendererDelay = Y.later(
                RENDERDELAY,
                instance,
                function() {
                    instance._panelRendererDelay = null;
                    panel.render();
                }
            );
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-DateTimePicker');
            YArray.each(
                this._eventhandlers,
                function(item){
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
            var instance = this,
                contentBox = instance.panel.get('contentBox'),
                timedial;

            Y.log('_createTimeDial', 'info', 'Itsa-DateTimePicker');
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
            timedial.onceAfter(
                'render',
                function() {
                    instance._timeNode = contentBox.one('.yui3-dial-label-string');
                }
            );
            timedial.render(contentBox.one('#'+TIMEDIAL_ID));
            instance._eventhandlers.push(
                timedial.on(
                    'valueChange',
                    function(e) {
                        var newVal = parseInt(e.newVal, 10),
                            newHours = Math.floor(newVal/60),
                            newMinutes = newVal - (60*newHours),
                            timeNode = instance._timeNode;
                        timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));
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
            var instance = this;

            Y.log('_createCalendar', 'info', 'Itsa-DateTimePicker');
            instance.calendar = new Y.Calendar({
                height:'250px',
                width:'250px',
                showPrevMonth: true,
                showNextMonth: true,
                visible: false,
                date: new Date()
            });
            instance._eventhandlers.push(
                instance.calendar.on(
                    'selectionChange',
                    Y.rbind(instance._calendarNewDate, instance)
                )
            );
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
            var instance = this,
                newdate;

            Y.log('_calendarNewDate', 'info', 'Itsa-DateTimePicker');
            // only if the calendar is visible --> there is also a new date set before showing up!
            if (instance.calendar.get('visible')) {
                newdate = e.newSelection[0];
                /**
                * Fired when a new Date is selected from the Panel's Calendar-instance.
                * No need to listen to --> the promises are using this event internally.
                *
                * @event _datetimepicker:selectdate
                * @param {Date} newDate the selected date
                * @private
                * @since 0.1
                */
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
            var instance = this,
                panel = instance.panel,
                boundingBox = panel.get('boundingBox'),
                selectButton;

            Y.log('_fillPanel', 'info', 'Itsa-DateTimePicker');
            boundingBox.addClass(PANEL_CLASS);
            instance._createCalendar();
            instance._createTimeDial();
            selectButton = {
                value : 'Select',
                action: function(e) {
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
                    Y.fire(EVENT_SELECTBUTTON);
                },
                section: Y.WidgetStdMod.FOOTER
            };
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
            var instance = this;

            Y.log('_hide', 'info', 'Itsa-DateTimePicker');
            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen
            instance.calendar.hide();
            instance._toggleTimePicker(false);
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
            var instance = this,
                time = new Date(1900, 0, 1, hours, minutes, 0, 0);

            Y.log('_renderDialTime', 'info', 'Itsa-DateTimePicker');
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
            var instance = this;

            Y.log('_renderUI', 'info', 'Itsa-DateTimePicker');
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
            var instance = this,
                panel = instance.panel;

            Y.log('_saveShow', 'info', 'Itsa-DateTimePicker');
            if (panel.get('rendered')) {
                instance._show(modus, initialDateTime, config);
            }
            else {
                panel.onceAfter(
                    'render',
                    function() {
                        instance._show(modus, initialDateTime, config);
                    }
                );
            }
            if (instance._panelRendererDelay) {
                instance._panelRendererDelay.cancel();
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
            var instance = this,
                panel = instance.panel,
                presentedDate = initialDateTime || new Date(),
                timeNode = instance._timeNode,
                modal = config && config.modal,
                alignToNode = config && config.alignToNode,
                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;

            Y.log('_show modus '+modus, 'info', 'Itsa-DateTimePicker');
            if (panel.get('visible')) {
                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:
                Y.fire(EVENT_CANCEL);
                // also hide the panel ourselves --> the cancel-event does not do this
                // we need this, because the panel wmigt be redrawed with other settings (like model-change)
                instance.panel.hide();
            }
            if (modus<3) {
                instance.calendar.deselectDates();
                instance.calendar.selectDates(presentedDate);
                if (Lang.isObject(config)) {
                    // Only accept limited properties. Also reset to default on new requests
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
                    instance.calendar.setAttrs(calAttrs);
                }
                instance.calendar.show();
            }
            else {
                instance.calendar.hide();
            }
            if (modus>1) {
                if (Lang.isObject(config) && Lang.isString(config.timeformat)) {
                    instance._timeFormat = config.timeformat;
                }
                else {
                    instance._timeFormat = null;
                }
                hours = presentedDate.getHours();
                minutes = presentedDate.getMinutes();
                dialvalue = minutes+60*hours;
                instance.timedial.set('value', dialvalue);
                instance.timedial._originalValue = dialvalue;
                timeNode.setHTML(instance._renderDialTime(hours, minutes));
                timeNode.removeClass(TIME_CHANGED_CLASS);
                instance._toggleTimePicker(true);

            }
            else {
                instance._toggleTimePicker(false);
            }
            if (alignToNode instanceof Y.Node) {
                window = instance._window;
                if (window) {
                    winWidth = PARSTEINT(window.get('winWidth'));
                    currentScroll = PARSTEINT(window.get('docScrollX'));
                    // check minwidth when no other fontsize is set:
                    // values are just read before after rendering...
                    switch (modus) {
                        case 1: minPanelWidth = 285;
                        break;
                        case 2: minPanelWidth = 155;
                        break;
                        case 3: minPanelWidth = 415;
                        break;
                    }
                    panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);
                    nodeX = alignToNode.getX();
                    nodeWidth = alignToNode.get('offsetWidth');
                    rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);
                }
                panel.align(
                    alignToNode,
                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])
                );
            }
            else {
                panel.centered();
            }
            if (Lang.isBoolean(modal)) {
                panel.set('modal', modal);
            }
            else {
                panel.set('modal', false);
            }
            switch (modus) {
                case 1: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);
                    break;
                case 2: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);
                    break;
                case 3: panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);
            }
            if (config && Lang.isBoolean(config.dragable)) {
                if (config.dragable && !panel.hasPlugin('dd')) {
                    panel.plug(Y.Plugin.Drag);
                    panel.dd.addHandle('.yui3-widget-hd');
                }
                else if (panel.hasPlugin('dd')) {
                    panel.unplug('dd');
                }
            }
            else if (panel.hasPlugin('dd')) {
                panel.unplug('dd');
            }
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
            var instance = this;

            Y.log('_toggleTimePicker: '+visible, 'info', 'Itsa-DateTimePicker');
            instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);
            instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);
        }

    }, {
        ATTRS : {
        }
    }
);

if (!Y.Global.ItsaDateTimePicker) {
    Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();
}

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
