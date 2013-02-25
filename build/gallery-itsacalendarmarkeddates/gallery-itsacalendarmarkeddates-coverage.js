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
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js",
    code: []
};
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].code=["YUI.add('gallery-itsacalendarmarkeddates', function (Y, NAME) {","","'use strict';","","/**"," * Adds the feature to Calendar to mark Dates."," * Is an extention to Y.Calendar, meaning that you can call these methods like myCalendar.getModelsInYear(2015);"," *"," * <i>Even though the methods in this extention can be used right out of the box, it's recommended to use"," * <b>gallery-itsacalendarmodellist</b> which uses this extention under the hood. gallery-itsacalendarmodellist uses Y.Models to mark the dates."," * <br />All Module-methods can be called without waiting for the Calendar to be rendered</i>"," *"," *"," * <pre><code>var myCalendar = new Y.Calendar({"," *         contentBox: \"#mycalendar\","," *         height:'300px',"," *         width:'300px'"," *     });"," *"," *     myCalendar.render();"," *"," *     var date1 = new Date(2013,01,02),"," *         date2 = new Date(2013,01,05),"," *         dateArray;"," *     dateArray.push(date1);"," *     dateArray.push(date2);"," *"," *     myCalendar.markDates(dateArray);"," *"," *     // now check if date2 is marked:"," * </code></pre>"," *"," * <u><b>Custom styling:</b></u>"," *"," * The way Matched-Dates are styled can be altered by overruling three styles:"," *      '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate'"," * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate:hover'"," * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover'"," *"," * To make sure your new rule takes higher precedence, be sure you give it a finer declaration. For example no dots but red color:"," * <pre><code>.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate {"," *     background-image: none;"," *     color: #F00;"," * }"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate:hover {"," *     background-image: none;"," *     color: #F00;"," * }"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover {"," *     background-image: none;"," *     color: #A00;"," * }"," * </code></pre>"," *"," * @module gallery-itsacalendarmarkeddates"," * @class ITSACalendarMarkedDates"," * @constructor"," * @since 3.8.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html","**/","","var Lang            = Y.Lang,","    YDate           = Y.DataType.Date,","    YObject         = Y.Object,","    arrayEach       = Y.Array.each,","    objEach         = YObject.each,","    hasKey          = YObject.hasKey,","    getCN           = Y.ClassNameManager.getClassName,","    CALENDAR        = 'calendar',","    ITSA            = 'itsa',","    CAL_DAY_MARKED  = getCN(ITSA, 'markeddate'),","    WIDGET_CLASS    = getCN(CALENDAR, ITSA, 'markeddates'),","    dateCopyObject  = function (oDate) {","                          return new Date(oDate.getTime());","                      },","    dateCopyValues  = function (aDate, bDate) {","                        bDate.setTime(aDate.getTime());","                    },","    dateEqualDays   = function(aDate, bDate) {","                          return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                  && (aDate.getFullYear()===bDate.getFullYear()));","                      },","    dayisGreater    = function(aDate, bDate) {","                          return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                      },","    dateAddDays     = function (oDate, numDays) {","                          oDate.setTime(oDate.getTime() + 86400000*numDays);","                      },","    dateAddMonths   = function (oDate, numMonths) {","                          var newYear = oDate.getFullYear(),","                              newMonth = oDate.getMonth() + numMonths;","                          newYear  = Math.floor(newYear + newMonth / 12);","                          newMonth = (newMonth % 12 + 12) % 12;","                          oDate.setFullYear(newYear);","                          oDate.setMonth(newMonth);","                      };","","function ITSACalendarMarkedDates() {}","","Y.mix(ITSACalendarMarkedDates.prototype, {","","","    /**","     * The hash map of marked dates, populated with","     * markDates() and unmarkDates() methods","     *","     * @property _markedDates","     * @type Object","     * @private","     * @since 3.8.1","     */","    _markedDates : {},","","    /**","     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _fireMarkEvent : null,","","    /**","     * Designated initializer","     * Initializes instance-level properties of","     * calendar.","     *","     * @method initializer","     * @protected","     * @since 3.8.1","     */","    initializer : function () {","        var instance = this;","","        instance._markedDates = {};","        instance.get('boundingBox').addClass(WIDGET_CLASS);","        instance.after(","            'render',","            function() {","                instance._renderMarkedDates();","                // instance._fireMarkEvent must be attached AFTER rendering.","                // this way we are sure that Calendar._afterDateChange is excecuted before instance._renderMarkedDates","                // (Calendar._afterDateChange also subscribes after-dataChange)","                instance._fireMarkEvent = instance.after(['dateChange', 'markChange'], instance._renderMarkedDates);","            }","        );","    },","","    /**","     * Cleans up events","     * @method destructor","     * @protected","     * @since 3.8.1","     */","    destructor: function () {","        var instance = this;","","        if (instance._fireMarkEvent) {","            instance._fireMarkEvent.detach();","        }","    },","","    /**","     * Returns an Array with the marked Dates that fall with the specified Date-range.","     * If aDate is an Array, then the search will be inside this Array.","     * If aDate is a Date-Object then the search will go between the range aDate-bDate","     * (bDate included, when bDate is not specified, only aDate is taken)","     *","     * @method getMarkedDates","     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within","     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)","     * Will only be taken if aDate is a Date-object","     * @return {Array} Array with the marked Dates within the searchargument","     * @since 3.8.1","     */","    getMarkedDates : function (aDate, bDate) {","        var instance = this,","            markedDates = instance._markedDates,","            returnDates = [],","            year, month, day, searchDay;","","        if (Lang.isArray(aDate)) {","            arrayEach(","                aDate,","                function(oneDate) {","                    if (YDate.isValidDate(oneDate)) {","                        year = oneDate.getFullYear();","                        month = oneDate.getMonth();","                        day = oneDate.getDate();","                        if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {","                            returnDates.push(dateCopyObject(oneDate));","                        }","                    }","                }","            );","        }","        else if (YDate.isValidDate(aDate)) {","            if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {","                bDate = dateCopyObject(aDate);","            }","            searchDay = new Date(aDate.getTime());","            do {","                year = searchDay.getFullYear();","                month = searchDay.getMonth();","                day = searchDay.getDate();","                if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {","                    returnDates.push(dateCopyObject(searchDay));","                }","                dateAddDays(searchDay, 1);","            }","            while (!dayisGreater(searchDay, bDate));","        }","        return returnDates;","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Week</b> specified by the Date-argument.","     *","     * @method getMarkedDatesInWeek","     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Week","     * @since 3.8.1","     */","    getMarkedDatesInWeek : function (oDate) {","        var instance = this,","            dayOfWeek = oDate.getDay(),","            aDate = dateCopyObject(oDate),","            bDate = dateCopyObject(oDate);","","        dateAddDays(aDate, -dayOfWeek);","        dateAddDays(bDate, 6-dayOfWeek);","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Month</b> specified by the Date-argument.","     *","     * @method getMarkedDatesInMonth","     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Month","     * @since 3.8.1","     */","    getMarkedDatesInMonth : function (oDate) {","        var instance = this,","            aDate = dateCopyObject(oDate),","            bDate = YDate.addMonths(oDate, 1);","","        aDate.setDate(1);","        bDate.setDate(1);","        dateAddDays(bDate, -1);","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Year</b>.","     *","     * @method getMarkedDatesInYear","     * @param {int} year The <b>Year</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Year","     * @since 3.8.1","     */","    getMarkedDatesInYear : function (year) {","        var instance = this,","            aDate = new Date(year, 0, 1),","            bDate = new Date(year, 11, 31);","","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns whether a Date is marked","     *","     * @method dateIsMarked","     * @param {Date} oDate Date to be checked","     * @return {Boolean}","     * @since 3.8.1","     */","    dateIsMarked : function (oDate) {","        var instance = this,","            markedDates = instance._markedDates,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            isMarked = (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) ? true : false;","","        return isMarked;","    },","","    /**","     * Marks a given date or array of dates. Is appending. If you want to 'reset' with new values,","     * then first call clearMarkedDates().","     *","     * @method markDates","     * @param {Date|Array} dates A `Date` or `Array` of `Date`s.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    markDates : function (dates) {","        var instance = this;","","        if (YDate.isValidDate(dates)) {","            instance._addDateToMarked(dates);","        }","        else if (Lang.isArray(dates)) {","            this._addDatesToMarked(dates);","        }","        return instance;","    },","","    /**","     * Unmarks a given date or array of dates, or unmarks all in case if no param","     * all dates if no argument is specified.","     *","     * @method unmarkDates","     * @param {Date|Array} [dates] A `Date` or `Array` of `Date`s, or no","     * argument if all dates should be deselected.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    unmarkDates : function (dates) {","        var instance = this;","","        if (!dates) {","            instance.clearMarkedDates();","        }","        else if (YDate.isValidDate(dates)) {","            instance._removeDateFromMarked(dates);","        }","        else if (Lang.isArray(dates)) {","            instance._removeDatesFromMarked(dates);","        }","        return instance;","    },","","    /**","     * Unmarks all dates.","     *","     * @method clearMarkedDates","     * @param {boolean} noevent A Boolean specifying whether a markChange","     * event should be fired. If true, no event is fired.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    clearMarkedDates : function (noevent) {","        var instance = this,","            prevMarked;","","        instance._markedDates = {};","        if (noevent) {","            instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);","        }","        else {","            prevMarked = instance._getMarkedDatesList();","            instance._fireMarkChange(prevMarked);","        }","        return instance;","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","     * A utility method that fires a markChange event.","     * @method _fireMarkChange","     * @param {Array} a list of previous marked dates","     * @private","     * @since 3.8.1","     */","    _fireMarkChange : function (prevMarked) {","        /**","        * Fired when the set of marked dates changes. Contains a payload with","        * a `newMarked` and `prevMarked` property which contains an array of marked dates.","        *","        * @event markChange","        * @param {Array} newVal contains [Date] with all marked Dates","        * @param {Array} prevVal contains [Date] with all marked Dates","        * @since 3.8.1","        */","        var instance = this;","","        instance.fire('markChange', {newVal: instance._getMarkedDatesList(), prevVal: prevMarked});","    },","","    /**","     * Generates a list of marked dates from the hash storage.","     *","     * @method _getMarkedDatesList","     * @private","     * @protected","     * @return {Array} The array of Dates that are currently marked.","     * @since 3.8.1","     */","    _getMarkedDatesList : function () {","        var instance = this,","            output = [];","","        objEach (instance._markedDates, function (year) {","            objEach (year, function (month) {","                objEach (month, function (day) {","                    output.push (day);","                }, instance);","            }, instance);","        }, instance);","","        return output;","    },","","    /**","     * Adds a given date to the markedDates.","     *","     * @method _addDateToMarked","     * @param {Date} oDate The date to add to the markeddates.","     * @param {int} [index] An optional parameter that is used","     * to differentiate between individual marked date and multiple","     * marked dates. If index is available, then this method does not fire an event.","     * @private","     * @since 3.8.1","     */","    _addDateToMarked : function (oDate, index) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            prevMarked;","","        if (!YDate.isValidDate(oDate)) {","        }","        else {","            if (!Lang.isValue(index)) {","                prevMarked = instance._getMarkedDatesList();","            }","            if (hasKey(instance._markedDates, year)) {","                if (hasKey(instance._markedDates[year], month)) {","                    instance._markedDates[year][month][day] = dateCopyObject(oDate);","                } else {","                    instance._markedDates[year][month] = {};","                    instance._markedDates[year][month][day] = dateCopyObject(oDate);","                }","            } else {","                instance._markedDates[year] = {};","                instance._markedDates[year][month] = {};","                instance._markedDates[year][month][day] = dateCopyObject(oDate);","            }","            if (!Lang.isValue(index)) {","                instance._fireMarkChange(prevMarked);","            }","        }","    },","","    /**","     * Adds a given list of dates to the markedDates.","     *","     * @method _addDatesToMarked","     * @param {Array} datesArray The list of dates to add to the markedDates.","     * @private","     * @since 3.8.1","     */","    _addDatesToMarked : function (datesArray) {","        var instance = this,","            prevMarked = instance._getMarkedDatesList();","","        arrayEach(datesArray, instance._addDateToMarked, instance);","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Adds a given range of dates to the markedDates.","     *","     * @method _addDateRangeToMarked","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     * @since 3.8.1","     */","    _addDateRangeToMarked : function (startDate, endDate) {","        var instance = this,","            timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,","            startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            prevMarked = instance._getMarkedDatesList(),","            tempTime, time, addedDate;","","        if (startTime > endTime) {","            tempTime = startTime;","            startTime = endTime;","            endTime = tempTime + timezoneDifference;","        }","        else {","            endTime = endTime - timezoneDifference;","        }","        for (time = startTime; time <= endTime; time += 86400000) {","            addedDate = new Date(time);","            addedDate.setHours(12);","            instance._addDateToMarked(addedDate);","        }","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Removes a given date from the markedDates.","     *","     * @method _removeDateFromMarked","     * @param {Date} oDate The date to remove from the markedDates.","     * @param {int} [index] An optional parameter that is used","     * to differentiate between individual date selections and multiple","     * date selections. If index is available, then this method does not fire an event.","     * @private","     * @since 3.8.1","     */","    _removeDateFromMarked : function (oDate, index) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            prevMarked;","","        if (!YDate.isValidDate(oDate)) {","        }","        else {","            if (hasKey(instance._markedDates, year) &&","                hasKey(instance._markedDates[year], month) &&","                hasKey(instance._markedDates[year][month], day))","            {","                if (Lang.isValue(index)) {","                    delete instance._markedDates[year][month][day];","                }","                else {","                    prevMarked = instance._getMarkedDatesList();","                    delete instance._markedDates[year][month][day];","                    instance._fireMarkChange(prevMarked);","                }","            }","        }","    },","","    /**","     * Removes a given list of dates from the markedDates.","     *","     * @method _removeDatesFromMarked","     * @param {Array} datesArray The list of dates to remove from the markedDates.","     * @private","     * @since 3.8.1","     */","    _removeDatesFromMarked : function (datesArray) {","        var instance = this,","            prevMarked = instance._getMarkedDatesList();","","        arrayEach(datesArray, instance._removeDatesFromMarked, instance);","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Removes a given range of dates from the markedDates.","     *","     * @method _removeDateRangeFromMarked","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     * @since 3.8.1","     */","    _removeDateRangeFromMarked : function (startDate, endDate) {","        var instance = this,","            startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            prevMarked = instance._getMarkedDatesList(),","            time;","","        for (time = startTime; time <= endTime; time += 86400000) {","            instance._removeDateFromMarked(new Date(time));","        }","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Rendering assist method that renders all datecells that are currently marked.","     *","     * @method _renderMarkedDates","     * @private","     * @since 3.8.1","     */","    _renderMarkedDates : function () {","        var instance = this,","            edgeMonthDate = new Date(0),","            contentBox = instance.get('contentBox'),","            paneNum, paneDate, dateArray, dateNode, col1, col2;","","        instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);","        for (paneNum = 0; paneNum < instance._paneNumber; paneNum++) {","            paneDate = YDate.addMonths(instance.get('date'), paneNum);","            dateArray = instance._getMarkedDatesInMonth(paneDate);","            arrayEach(dateArray, Y.bind(instance._renderMarkedDatesHelper, instance));","            if (instance.get('showPrevMonth')) {","                dateCopyValues(paneDate, edgeMonthDate);","                edgeMonthDate.setDate(1);","                col1 = instance._getDateColumn(edgeMonthDate) - 1;","                col2 = 0;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    dateAddDays(edgeMonthDate, -1);","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1--;","                    col2--;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","            }","            if (instance.get('showNextMonth')) {","                dateCopyValues(paneDate, edgeMonthDate);","                dateAddMonths(edgeMonthDate, 1);","                dateAddDays(edgeMonthDate, -1);","                col1 = instance._getDateColumn(edgeMonthDate) + 1;","                col2 = edgeMonthDate.getDate() + 1;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    if (!dateNode.hasClass('yui3-calendar-column-hidden')) {","                        dateAddDays(edgeMonthDate, 1);","                    }","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1++;","                    col2++;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","                col1 = 0;","                col2 = 30;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    if (!dateNode.hasClass('yui3-calendar-column-hidden')) {","                        dateAddDays(edgeMonthDate, 1);","                    }","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1++;","                    col2++;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","            }","","        }","    },","","    /**","     * A utility method that converts a Date to the columnindex of the calendar cell the Date corresponds to.","     *","     * @method _getDateColumn","     * @param {Date} oDate The Date to retreive the columnindex from","     * @protected","     * @return {int} The columnindex","     */","    _getDateColumn : function (oDate) {","        var day = oDate.getDate(),","            col = 0,","            daymod = day%7,","            paneNum = (12 + oDate.getMonth() - this.get(\"date\").getMonth()) % 12,","            paneId = this._calendarId + \"_pane_\" + paneNum,","            cutoffCol = this._paneProperties[paneId].cutoffCol;","","        switch (daymod) {","            case (0):","                if (cutoffCol >= 6) {","                    col = 12;","                } else {","                    col = 5;","                }","                break;","            case (1):","                    col = 6;","                break;","            case (2):","                if (cutoffCol > 0) {","                    col = 7;","                } else {","                    col = 0;","                }","                break;","            case (3):","                if (cutoffCol > 1) {","                    col = 8;","                } else {","                    col = 1;","                }","                break;","            case (4):","                if (cutoffCol > 2) {","                    col = 9;","                } else {","                    col = 2;","                }","                break;","            case (5):","                if (cutoffCol > 3) {","                    col = 10;","                } else {","                    col = 3;","                }","                break;","            case (6):","                if (cutoffCol > 4) {","                    col = 11;","                } else {","                    col = 4;","                }","                break;","        }","        return col;","","    },","","    /**","    * Takes in a date and marks the datecell.","    *","    * @method _renderMarkedDatesHelper","    * @param {Date} oDate Date to be marked.","    * @private","    * @since 3.8.1","    */","    _renderMarkedDatesHelper: function (oDate) {","","        this._dateToNode(oDate).addClass(CAL_DAY_MARKED);","   },","","    /**","     * Returns all marked dates in a specific month.","     *","     * @method _getMarkedDatesInMonth","     * @param {Date} oDate corresponding to the month for which selected dates are requested.","     * @private","     * @protected","     * @return {Array} The array of `Date`s in a given month that are currently marked.","     * @since 3.8.1","     */","    _getMarkedDatesInMonth : function (oDate) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth();","","        if (hasKey(instance._markedDates, year) && hasKey(instance._markedDates[year], month)) {","            return YObject.values(instance._markedDates[year][month]);","        }","        else {","            return [];","        }","    }","","}, true);","","Y.Calendar.ITSACalendarMarkedDates = ITSACalendarMarkedDates;","","Y.Base.mix(Y.Calendar, [ITSACalendarMarkedDates]);","","}, '@VERSION@', {\"requires\": [\"base-build\", \"calendar-base\", \"datatype-date\", \"datatype-date-math\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].lines = {"1":0,"3":0,"70":0,"82":0,"85":0,"88":0,"92":0,"95":0,"98":0,"100":0,"101":0,"102":0,"103":0,"106":0,"108":0,"142":0,"144":0,"145":0,"146":0,"149":0,"153":0,"165":0,"167":0,"168":0,"186":0,"191":0,"192":0,"195":0,"196":0,"197":0,"198":0,"199":0,"200":0,"206":0,"207":0,"208":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"216":0,"218":0,"222":0,"234":0,"239":0,"240":0,"241":0,"253":0,"257":0,"258":0,"259":0,"260":0,"272":0,"276":0,"288":0,"295":0,"309":0,"311":0,"312":0,"314":0,"315":0,"317":0,"332":0,"334":0,"335":0,"337":0,"338":0,"340":0,"341":0,"343":0,"357":0,"360":0,"361":0,"362":0,"365":0,"366":0,"368":0,"392":0,"394":0,"407":0,"410":0,"411":0,"412":0,"413":0,"418":0,"433":0,"439":0,"442":0,"443":0,"445":0,"446":0,"447":0,"449":0,"450":0,"453":0,"454":0,"455":0,"457":0,"458":0,"472":0,"475":0,"476":0,"489":0,"496":0,"497":0,"498":0,"499":0,"502":0,"504":0,"505":0,"506":0,"507":0,"509":0,"524":0,"530":0,"533":0,"537":0,"538":0,"541":0,"542":0,"543":0,"558":0,"561":0,"562":0,"575":0,"581":0,"582":0,"584":0,"595":0,"600":0,"601":0,"602":0,"603":0,"604":0,"605":0,"606":0,"607":0,"608":0,"609":0,"610":0,"611":0,"612":0,"613":0,"614":0,"616":0,"617":0,"618":0,"621":0,"622":0,"623":0,"624":0,"625":0,"626":0,"627":0,"628":0,"629":0,"630":0,"632":0,"633":0,"635":0,"636":0,"637":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"646":0,"647":0,"649":0,"650":0,"651":0,"667":0,"674":0,"676":0,"677":0,"679":0,"681":0,"683":0,"684":0,"686":0,"687":0,"689":0,"691":0,"693":0,"694":0,"696":0,"698":0,"700":0,"701":0,"703":0,"705":0,"707":0,"708":0,"710":0,"712":0,"714":0,"715":0,"717":0,"719":0,"721":0,"735":0,"749":0,"753":0,"754":0,"757":0,"763":0,"765":0};
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].functions = {"dateCopyObject:81":0,"dateCopyValues:84":0,"dateEqualDays:87":0,"dayisGreater:91":0,"dateAddDays:94":0,"dateAddMonths:97":0,"ITSACalendarMarkedDates:106":0,"(anonymous 2):148":0,"initializer:141":0,"destructor:164":0,"(anonymous 3):194":0,"getMarkedDates:185":0,"getMarkedDatesInWeek:233":0,"getMarkedDatesInMonth:252":0,"getMarkedDatesInYear:271":0,"dateIsMarked:287":0,"markDates:308":0,"unmarkDates:331":0,"clearMarkedDates:356":0,"_fireMarkChange:382":0,"(anonymous 6):412":0,"(anonymous 5):411":0,"(anonymous 4):410":0,"_getMarkedDatesList:406":0,"_addDateToMarked:432":0,"_addDatesToMarked:471":0,"_addDateRangeToMarked:488":0,"_removeDateFromMarked:523":0,"_removeDatesFromMarked:557":0,"_removeDateRangeFromMarked:574":0,"_renderMarkedDates:594":0,"_getDateColumn:666":0,"_renderMarkedDatesHelper:733":0,"_getMarkedDatesInMonth:748":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].coveredLines = 211;
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].coveredFunctions = 35;
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 1);
YUI.add('gallery-itsacalendarmarkeddates', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 3);
'use strict';

/**
 * Adds the feature to Calendar to mark Dates.
 * Is an extention to Y.Calendar, meaning that you can call these methods like myCalendar.getModelsInYear(2015);
 *
 * <i>Even though the methods in this extention can be used right out of the box, it's recommended to use
 * <b>gallery-itsacalendarmodellist</b> which uses this extention under the hood. gallery-itsacalendarmodellist uses Y.Models to mark the dates.
 * <br />All Module-methods can be called without waiting for the Calendar to be rendered</i>
 *
 *
 * <pre><code>var myCalendar = new Y.Calendar({
 *         contentBox: "#mycalendar",
 *         height:'300px',
 *         width:'300px'
 *     });
 *
 *     myCalendar.render();
 *
 *     var date1 = new Date(2013,01,02),
 *         date2 = new Date(2013,01,05),
 *         dateArray;
 *     dateArray.push(date1);
 *     dateArray.push(date2);
 *
 *     myCalendar.markDates(dateArray);
 *
 *     // now check if date2 is marked:
 * </code></pre>
 *
 * <u><b>Custom styling:</b></u>
 *
 * The way Matched-Dates are styled can be altered by overruling three styles:
 *      '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate'
 * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate:hover'
 * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,
 *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,
 *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,
 *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover'
 *
 * To make sure your new rule takes higher precedence, be sure you give it a finer declaration. For example no dots but red color:
 * <pre><code>.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate {
 *     background-image: none;
 *     color: #F00;
 * }
 * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate:hover {
 *     background-image: none;
 *     color: #F00;
 * }
 * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,
 * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,
 * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,
 * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover {
 *     background-image: none;
 *     color: #A00;
 * }
 * </code></pre>
 *
 * @module gallery-itsacalendarmarkeddates
 * @class ITSACalendarMarkedDates
 * @constructor
 * @since 3.8.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
**/

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 70);
var Lang            = Y.Lang,
    YDate           = Y.DataType.Date,
    YObject         = Y.Object,
    arrayEach       = Y.Array.each,
    objEach         = YObject.each,
    hasKey          = YObject.hasKey,
    getCN           = Y.ClassNameManager.getClassName,
    CALENDAR        = 'calendar',
    ITSA            = 'itsa',
    CAL_DAY_MARKED  = getCN(ITSA, 'markeddate'),
    WIDGET_CLASS    = getCN(CALENDAR, ITSA, 'markeddates'),
    dateCopyObject  = function (oDate) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateCopyObject", 81);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 82);
return new Date(oDate.getTime());
                      },
    dateCopyValues  = function (aDate, bDate) {
                        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateCopyValues", 84);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 85);
bDate.setTime(aDate.getTime());
                    },
    dateEqualDays   = function(aDate, bDate) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateEqualDays", 87);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 88);
return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                  && (aDate.getFullYear()===bDate.getFullYear()));
                      },
    dayisGreater    = function(aDate, bDate) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dayisGreater", 91);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 92);
return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                      },
    dateAddDays     = function (oDate, numDays) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateAddDays", 94);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 95);
oDate.setTime(oDate.getTime() + 86400000*numDays);
                      },
    dateAddMonths   = function (oDate, numMonths) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateAddMonths", 97);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 98);
var newYear = oDate.getFullYear(),
                              newMonth = oDate.getMonth() + numMonths;
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 100);
newYear  = Math.floor(newYear + newMonth / 12);
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 101);
newMonth = (newMonth % 12 + 12) % 12;
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 102);
oDate.setFullYear(newYear);
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 103);
oDate.setMonth(newMonth);
                      };

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 106);
function ITSACalendarMarkedDates() {}

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 108);
Y.mix(ITSACalendarMarkedDates.prototype, {


    /**
     * The hash map of marked dates, populated with
     * markDates() and unmarkDates() methods
     *
     * @property _markedDates
     * @type Object
     * @private
     * @since 3.8.1
     */
    _markedDates : {},

    /**
     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */
    _fireMarkEvent : null,

    /**
     * Designated initializer
     * Initializes instance-level properties of
     * calendar.
     *
     * @method initializer
     * @protected
     * @since 3.8.1
     */
    initializer : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "initializer", 141);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 142);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 144);
instance._markedDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 145);
instance.get('boundingBox').addClass(WIDGET_CLASS);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 146);
instance.after(
            'render',
            function() {
                _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 2)", 148);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 149);
instance._renderMarkedDates();
                // instance._fireMarkEvent must be attached AFTER rendering.
                // this way we are sure that Calendar._afterDateChange is excecuted before instance._renderMarkedDates
                // (Calendar._afterDateChange also subscribes after-dataChange)
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 153);
instance._fireMarkEvent = instance.after(['dateChange', 'markChange'], instance._renderMarkedDates);
            }
        );
    },

    /**
     * Cleans up events
     * @method destructor
     * @protected
     * @since 3.8.1
     */
    destructor: function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "destructor", 164);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 165);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 167);
if (instance._fireMarkEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 168);
instance._fireMarkEvent.detach();
        }
    },

    /**
     * Returns an Array with the marked Dates that fall with the specified Date-range.
     * If aDate is an Array, then the search will be inside this Array.
     * If aDate is a Date-Object then the search will go between the range aDate-bDate
     * (bDate included, when bDate is not specified, only aDate is taken)
     *
     * @method getMarkedDates
     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within
     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)
     * Will only be taken if aDate is a Date-object
     * @return {Array} Array with the marked Dates within the searchargument
     * @since 3.8.1
     */
    getMarkedDates : function (aDate, bDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDates", 185);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 186);
var instance = this,
            markedDates = instance._markedDates,
            returnDates = [],
            year, month, day, searchDay;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 191);
if (Lang.isArray(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 192);
arrayEach(
                aDate,
                function(oneDate) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 3)", 194);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 195);
if (YDate.isValidDate(oneDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 196);
year = oneDate.getFullYear();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 197);
month = oneDate.getMonth();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 198);
day = oneDate.getDate();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 199);
if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {
                            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 200);
returnDates.push(dateCopyObject(oneDate));
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 206);
if (YDate.isValidDate(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 207);
if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 208);
bDate = dateCopyObject(aDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 210);
searchDay = new Date(aDate.getTime());
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 211);
do {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 212);
year = searchDay.getFullYear();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 213);
month = searchDay.getMonth();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 214);
day = searchDay.getDate();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 215);
if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 216);
returnDates.push(dateCopyObject(searchDay));
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 218);
dateAddDays(searchDay, 1);
            }while (!dayisGreater(searchDay, bDate));
        }}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 222);
return returnDates;
    },

    /**
     * Returns an Array with the marked Dates that fall with the <b>Week</b> specified by the Date-argument.
     *
     * @method getMarkedDatesInWeek
     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.
     * @return {Array} Array with the marked Dates within the specified Week
     * @since 3.8.1
     */
    getMarkedDatesInWeek : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInWeek", 233);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 234);
var instance = this,
            dayOfWeek = oDate.getDay(),
            aDate = dateCopyObject(oDate),
            bDate = dateCopyObject(oDate);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 239);
dateAddDays(aDate, -dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 240);
dateAddDays(bDate, 6-dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 241);
return instance.getMarkedDates(aDate, bDate);
    },

    /**
     * Returns an Array with the marked Dates that fall with the <b>Month</b> specified by the Date-argument.
     *
     * @method getMarkedDatesInMonth
     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.
     * @return {Array} Array with the marked Dates within the specified Month
     * @since 3.8.1
     */
    getMarkedDatesInMonth : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInMonth", 252);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 253);
var instance = this,
            aDate = dateCopyObject(oDate),
            bDate = YDate.addMonths(oDate, 1);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 257);
aDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 258);
bDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 259);
dateAddDays(bDate, -1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 260);
return instance.getMarkedDates(aDate, bDate);
    },

    /**
     * Returns an Array with the marked Dates that fall with the <b>Year</b>.
     *
     * @method getMarkedDatesInYear
     * @param {int} year The <b>Year</b> to search within.
     * @return {Array} Array with the marked Dates within the specified Year
     * @since 3.8.1
     */
    getMarkedDatesInYear : function (year) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInYear", 271);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 272);
var instance = this,
            aDate = new Date(year, 0, 1),
            bDate = new Date(year, 11, 31);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 276);
return instance.getMarkedDates(aDate, bDate);
    },

    /**
     * Returns whether a Date is marked
     *
     * @method dateIsMarked
     * @param {Date} oDate Date to be checked
     * @return {Boolean}
     * @since 3.8.1
     */
    dateIsMarked : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateIsMarked", 287);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 288);
var instance = this,
            markedDates = instance._markedDates,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            isMarked = (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) ? true : false;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 295);
return isMarked;
    },

    /**
     * Marks a given date or array of dates. Is appending. If you want to 'reset' with new values,
     * then first call clearMarkedDates().
     *
     * @method markDates
     * @param {Date|Array} dates A `Date` or `Array` of `Date`s.
     * @return {CalendarBase} A reference to this object
     * @chainable
     * @since 3.8.1
     */
    markDates : function (dates) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "markDates", 308);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 309);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 311);
if (YDate.isValidDate(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 312);
instance._addDateToMarked(dates);
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 314);
if (Lang.isArray(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 315);
this._addDatesToMarked(dates);
        }}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 317);
return instance;
    },

    /**
     * Unmarks a given date or array of dates, or unmarks all in case if no param
     * all dates if no argument is specified.
     *
     * @method unmarkDates
     * @param {Date|Array} [dates] A `Date` or `Array` of `Date`s, or no
     * argument if all dates should be deselected.
     * @return {CalendarBase} A reference to this object
     * @chainable
     * @since 3.8.1
     */
    unmarkDates : function (dates) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "unmarkDates", 331);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 332);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 334);
if (!dates) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 335);
instance.clearMarkedDates();
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 337);
if (YDate.isValidDate(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 338);
instance._removeDateFromMarked(dates);
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 340);
if (Lang.isArray(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 341);
instance._removeDatesFromMarked(dates);
        }}}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 343);
return instance;
    },

    /**
     * Unmarks all dates.
     *
     * @method clearMarkedDates
     * @param {boolean} noevent A Boolean specifying whether a markChange
     * event should be fired. If true, no event is fired.
     * @return {CalendarBase} A reference to this object
     * @chainable
     * @since 3.8.1
     */
    clearMarkedDates : function (noevent) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "clearMarkedDates", 356);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 357);
var instance = this,
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 360);
instance._markedDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 361);
if (noevent) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 362);
instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 365);
prevMarked = instance._getMarkedDatesList();
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 366);
instance._fireMarkChange(prevMarked);
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 368);
return instance;
    },

    //--------------------------------------------------------------------------
    // Protected properties and methods
    //--------------------------------------------------------------------------

    /**
     * A utility method that fires a markChange event.
     * @method _fireMarkChange
     * @param {Array} a list of previous marked dates
     * @private
     * @since 3.8.1
     */
    _fireMarkChange : function (prevMarked) {
        /**
        * Fired when the set of marked dates changes. Contains a payload with
        * a `newMarked` and `prevMarked` property which contains an array of marked dates.
        *
        * @event markChange
        * @param {Array} newVal contains [Date] with all marked Dates
        * @param {Array} prevVal contains [Date] with all marked Dates
        * @since 3.8.1
        */
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_fireMarkChange", 382);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 392);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 394);
instance.fire('markChange', {newVal: instance._getMarkedDatesList(), prevVal: prevMarked});
    },

    /**
     * Generates a list of marked dates from the hash storage.
     *
     * @method _getMarkedDatesList
     * @private
     * @protected
     * @return {Array} The array of Dates that are currently marked.
     * @since 3.8.1
     */
    _getMarkedDatesList : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getMarkedDatesList", 406);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 407);
var instance = this,
            output = [];

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 410);
objEach (instance._markedDates, function (year) {
            _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 4)", 410);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 411);
objEach (year, function (month) {
                _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 5)", 411);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 412);
objEach (month, function (day) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 6)", 412);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 413);
output.push (day);
                }, instance);
            }, instance);
        }, instance);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 418);
return output;
    },

    /**
     * Adds a given date to the markedDates.
     *
     * @method _addDateToMarked
     * @param {Date} oDate The date to add to the markeddates.
     * @param {int} [index] An optional parameter that is used
     * to differentiate between individual marked date and multiple
     * marked dates. If index is available, then this method does not fire an event.
     * @private
     * @since 3.8.1
     */
    _addDateToMarked : function (oDate, index) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDateToMarked", 432);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 433);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 439);
if (!YDate.isValidDate(oDate)) {
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 442);
if (!Lang.isValue(index)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 443);
prevMarked = instance._getMarkedDatesList();
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 445);
if (hasKey(instance._markedDates, year)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 446);
if (hasKey(instance._markedDates[year], month)) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 447);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 449);
instance._markedDates[year][month] = {};
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 450);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
                }
            } else {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 453);
instance._markedDates[year] = {};
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 454);
instance._markedDates[year][month] = {};
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 455);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 457);
if (!Lang.isValue(index)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 458);
instance._fireMarkChange(prevMarked);
            }
        }
    },

    /**
     * Adds a given list of dates to the markedDates.
     *
     * @method _addDatesToMarked
     * @param {Array} datesArray The list of dates to add to the markedDates.
     * @private
     * @since 3.8.1
     */
    _addDatesToMarked : function (datesArray) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDatesToMarked", 471);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 472);
var instance = this,
            prevMarked = instance._getMarkedDatesList();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 475);
arrayEach(datesArray, instance._addDateToMarked, instance);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 476);
instance._fireMarkChange(prevMarked);
    },

    /**
     * Adds a given range of dates to the markedDates.
     *
     * @method _addDateRangeToMarked
     * @param {Date} startDate The first date of the given range.
     * @param {Date} endDate The last date of the given range.
     * @private
     * @since 3.8.1
     */
    _addDateRangeToMarked : function (startDate, endDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDateRangeToMarked", 488);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 489);
var instance = this,
            timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,
            startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            prevMarked = instance._getMarkedDatesList(),
            tempTime, time, addedDate;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 496);
if (startTime > endTime) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 497);
tempTime = startTime;
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 498);
startTime = endTime;
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 499);
endTime = tempTime + timezoneDifference;
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 502);
endTime = endTime - timezoneDifference;
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 504);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 505);
addedDate = new Date(time);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 506);
addedDate.setHours(12);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 507);
instance._addDateToMarked(addedDate);
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 509);
instance._fireMarkChange(prevMarked);
    },

    /**
     * Removes a given date from the markedDates.
     *
     * @method _removeDateFromMarked
     * @param {Date} oDate The date to remove from the markedDates.
     * @param {int} [index] An optional parameter that is used
     * to differentiate between individual date selections and multiple
     * date selections. If index is available, then this method does not fire an event.
     * @private
     * @since 3.8.1
     */
    _removeDateFromMarked : function (oDate, index) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDateFromMarked", 523);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 524);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 530);
if (!YDate.isValidDate(oDate)) {
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 533);
if (hasKey(instance._markedDates, year) &&
                hasKey(instance._markedDates[year], month) &&
                hasKey(instance._markedDates[year][month], day))
            {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 537);
if (Lang.isValue(index)) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 538);
delete instance._markedDates[year][month][day];
                }
                else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 541);
prevMarked = instance._getMarkedDatesList();
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 542);
delete instance._markedDates[year][month][day];
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 543);
instance._fireMarkChange(prevMarked);
                }
            }
        }
    },

    /**
     * Removes a given list of dates from the markedDates.
     *
     * @method _removeDatesFromMarked
     * @param {Array} datesArray The list of dates to remove from the markedDates.
     * @private
     * @since 3.8.1
     */
    _removeDatesFromMarked : function (datesArray) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDatesFromMarked", 557);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 558);
var instance = this,
            prevMarked = instance._getMarkedDatesList();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 561);
arrayEach(datesArray, instance._removeDatesFromMarked, instance);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 562);
instance._fireMarkChange(prevMarked);
    },

    /**
     * Removes a given range of dates from the markedDates.
     *
     * @method _removeDateRangeFromMarked
     * @param {Date} startDate The first date of the given range.
     * @param {Date} endDate The last date of the given range.
     * @private
     * @since 3.8.1
     */
    _removeDateRangeFromMarked : function (startDate, endDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDateRangeFromMarked", 574);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 575);
var instance = this,
            startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            prevMarked = instance._getMarkedDatesList(),
            time;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 581);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 582);
instance._removeDateFromMarked(new Date(time));
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 584);
instance._fireMarkChange(prevMarked);
    },

    /**
     * Rendering assist method that renders all datecells that are currently marked.
     *
     * @method _renderMarkedDates
     * @private
     * @since 3.8.1
     */
    _renderMarkedDates : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_renderMarkedDates", 594);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 595);
var instance = this,
            edgeMonthDate = new Date(0),
            contentBox = instance.get('contentBox'),
            paneNum, paneDate, dateArray, dateNode, col1, col2;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 600);
instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 601);
for (paneNum = 0; paneNum < instance._paneNumber; paneNum++) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 602);
paneDate = YDate.addMonths(instance.get('date'), paneNum);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 603);
dateArray = instance._getMarkedDatesInMonth(paneDate);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 604);
arrayEach(dateArray, Y.bind(instance._renderMarkedDatesHelper, instance));
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 605);
if (instance.get('showPrevMonth')) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 606);
dateCopyValues(paneDate, edgeMonthDate);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 607);
edgeMonthDate.setDate(1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 608);
col1 = instance._getDateColumn(edgeMonthDate) - 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 609);
col2 = 0;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 610);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 611);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 612);
dateAddDays(edgeMonthDate, -1);
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 613);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 614);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 616);
col1--;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 617);
col2--;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 618);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                }
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 621);
if (instance.get('showNextMonth')) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 622);
dateCopyValues(paneDate, edgeMonthDate);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 623);
dateAddMonths(edgeMonthDate, 1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 624);
dateAddDays(edgeMonthDate, -1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 625);
col1 = instance._getDateColumn(edgeMonthDate) + 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 626);
col2 = edgeMonthDate.getDate() + 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 627);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 628);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 629);
if (!dateNode.hasClass('yui3-calendar-column-hidden')) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 630);
dateAddDays(edgeMonthDate, 1);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 632);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 633);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 635);
col1++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 636);
col2++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 637);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 639);
col1 = 0;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 640);
col2 = 30;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 641);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 642);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 643);
if (!dateNode.hasClass('yui3-calendar-column-hidden')) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 644);
dateAddDays(edgeMonthDate, 1);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 646);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 647);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 649);
col1++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 650);
col2++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 651);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                }
            }

        }
    },

    /**
     * A utility method that converts a Date to the columnindex of the calendar cell the Date corresponds to.
     *
     * @method _getDateColumn
     * @param {Date} oDate The Date to retreive the columnindex from
     * @protected
     * @return {int} The columnindex
     */
    _getDateColumn : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getDateColumn", 666);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 667);
var day = oDate.getDate(),
            col = 0,
            daymod = day%7,
            paneNum = (12 + oDate.getMonth() - this.get("date").getMonth()) % 12,
            paneId = this._calendarId + "_pane_" + paneNum,
            cutoffCol = this._paneProperties[paneId].cutoffCol;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 674);
switch (daymod) {
            case (0):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 676);
if (cutoffCol >= 6) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 677);
col = 12;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 679);
col = 5;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 681);
break;
            case (1):
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 683);
col = 6;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 684);
break;
            case (2):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 686);
if (cutoffCol > 0) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 687);
col = 7;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 689);
col = 0;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 691);
break;
            case (3):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 693);
if (cutoffCol > 1) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 694);
col = 8;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 696);
col = 1;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 698);
break;
            case (4):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 700);
if (cutoffCol > 2) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 701);
col = 9;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 703);
col = 2;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 705);
break;
            case (5):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 707);
if (cutoffCol > 3) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 708);
col = 10;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 710);
col = 3;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 712);
break;
            case (6):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 714);
if (cutoffCol > 4) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 715);
col = 11;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 717);
col = 4;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 719);
break;
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 721);
return col;

    },

    /**
    * Takes in a date and marks the datecell.
    *
    * @method _renderMarkedDatesHelper
    * @param {Date} oDate Date to be marked.
    * @private
    * @since 3.8.1
    */
    _renderMarkedDatesHelper: function (oDate) {

        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_renderMarkedDatesHelper", 733);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 735);
this._dateToNode(oDate).addClass(CAL_DAY_MARKED);
   },

    /**
     * Returns all marked dates in a specific month.
     *
     * @method _getMarkedDatesInMonth
     * @param {Date} oDate corresponding to the month for which selected dates are requested.
     * @private
     * @protected
     * @return {Array} The array of `Date`s in a given month that are currently marked.
     * @since 3.8.1
     */
    _getMarkedDatesInMonth : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getMarkedDatesInMonth", 748);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 749);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 753);
if (hasKey(instance._markedDates, year) && hasKey(instance._markedDates[year], month)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 754);
return YObject.values(instance._markedDates[year][month]);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 757);
return [];
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 763);
Y.Calendar.ITSACalendarMarkedDates = ITSACalendarMarkedDates;

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 765);
Y.Base.mix(Y.Calendar, [ITSACalendarMarkedDates]);

}, '@VERSION@', {"requires": ["base-build", "calendar-base", "datatype-date", "datatype-date-math"], "skinnable": true});
