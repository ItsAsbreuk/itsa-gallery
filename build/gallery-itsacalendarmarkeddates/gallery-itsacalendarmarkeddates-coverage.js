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
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].code=["YUI.add('gallery-itsacalendarmarkeddates', function (Y, NAME) {","","'use strict';","","/**"," * @module gallery-itsacalendarmarkeddates"," * @class ITSACalendarMarkedDates"," * @constructor"," * @since 3.8.1"," *"," * <i>Copyright (c) 2013 Its Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html","**/","","var Lang            = Y.Lang,","    YDate           = Y.DataType.Date,","    YObject         = Y.Object,","    arrayEach       = Y.Array.each,","    objEach         = YObject.each,","    hasKey          = YObject.hasKey,","    getCN           = Y.ClassNameManager.getClassName,","    CALENDAR        = 'calendar',","    ITSA            = 'itsa',","    CAL_DAY_MARKED  = getCN(ITSA, 'markeddate'),","    WIDGET_CLASS    = getCN(CALENDAR, ITSA, 'markeddates'),","    dateCopyObject  = function (oDate) {","                          return new Date(oDate.getTime());","                      },","    dateCopyValues  = function (aDate, bDate) {","                        bDate.setTime(aDate.getTime());","                    },","    dateEqualDays   = function(aDate, bDate) {","                          return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                  && (aDate.getFullYear()===bDate.getFullYear()));","                      },","    dayisGreater    = function(aDate, bDate) {","                          return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                      },","    dateAddDays     = function (oDate, numDays) {","                          oDate.setTime(oDate.getTime() + 86400000*numDays);","                      },","    dateAddMonths   = function (oDate, numMonths) {","                          var newYear = oDate.getFullYear(),","                              newMonth = oDate.getMonth() + numMonths;","                          newYear  = Math.floor(newYear + newMonth / 12);","                          newMonth = (newMonth % 12 + 12) % 12;","                          oDate.setFullYear(newYear);","                          oDate.setMonth(newMonth);","                      };","","function ITSACalendarMarkedDates() {}","","Y.mix(ITSACalendarMarkedDates.prototype, {","","","    /**","     * The hash map of marked dates, populated with","     * markDates() and unmarkDates() methods","     *","     * @property _markedDates","     * @type Object","     * @private","     * @since 3.8.1","     */","","    /**","     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","","    /**","     * Designated initializer","     * Initializes instance-level properties of","     * calendar.","     *","     * @method initializer","     * @protected","     * @since 3.8.1","     */","    initializer : function () {","        var instance = this;","","        instance._markedDates = {};","        instance.get('boundingBox').addClass(WIDGET_CLASS);","        instance.after(","            'render',","            function() {","                instance._renderMarkedDates();","                // instance._fireMarkEvent must be attached AFTER rendering.","                // this way we are sure that Calendar._afterDateChange is excecuted before instance._renderMarkedDates","                // (Calendar._afterDateChange also subscribes after-dataChange)","                instance._fireMarkEvent = instance.after(['dateChange', 'markChange'], instance._renderMarkedDates);","            }","        );","    },","","    /**","     * Cleans up events","     * @method destructor","     * @protected","     * @since 3.8.1","     */","    destructor: function () {","        var instance = this;","","        if (instance._fireMarkEvent) {","            instance._fireMarkEvent.detach();","        }","    },","","    /**","     * Returns an Array with the marked Dates that fall with the specified Date-range.","     * If aDate is an Array, then the search will be inside this Array.","     * If aDate is a Date-Object then the search will go between the range aDate-bDate","     * (bDate included, when bDate is not specified, only aDate is taken)","     *","     * @method getMarkedDates","     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within","     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)","     * Will only be taken if aDate is a Date-object","     * @return {Array} Array with the marked Dates within the searchargument","     * @since 3.8.1","     */","    getMarkedDates : function (aDate, bDate) {","        var instance = this,","            markedDates = instance._markedDates,","            returnDates = [],","            year, month, day, searchDay;","","        if (Lang.isArray(aDate)) {","            arrayEach(","                aDate,","                function(oneDate) {","                    if (YDate.isValidDate(oneDate)) {","                        year = oneDate.getFullYear();","                        month = oneDate.getMonth();","                        day = oneDate.getDate();","                        if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {","                            returnDates.push(dateCopyObject(oneDate));","                        }","                    }","                }","            );","        }","        else if (YDate.isValidDate(aDate)) {","            if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {","                bDate = dateCopyObject(aDate);","            }","            searchDay = new Date(aDate.getTime());","            do {","                year = searchDay.getFullYear();","                month = searchDay.getMonth();","                day = searchDay.getDate();","                if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {","                    returnDates.push(dateCopyObject(searchDay));","                }","                dateAddDays(searchDay, 1);","            }","            while (!dayisGreater(searchDay, bDate));","        }","        return returnDates;","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Week</b> specified by the Date-argument.","     *","     * @method getMarkedDatesInWeek","     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Week","     * @since 3.8.1","     */","    getMarkedDatesInWeek : function (oDate) {","        var instance = this,","            dayOfWeek = oDate.getDay(),","            aDate = dateCopyObject(oDate),","            bDate = dateCopyObject(oDate);","","        dateAddDays(aDate, -dayOfWeek);","        dateAddDays(bDate, 6-dayOfWeek);","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Month</b> specified by the Date-argument.","     *","     * @method getMarkedDatesInMonth","     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Month","     * @since 3.8.1","     */","    getMarkedDatesInMonth : function (oDate) {","        var instance = this,","            aDate = dateCopyObject(oDate),","            bDate = YDate.addMonths(oDate, 1);","","        aDate.setDate(1);","        bDate.setDate(1);","        dateAddDays(bDate, -1);","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns an Array with the marked Dates that fall with the <b>Year</b>.","     *","     * @method getMarkedDatesInYear","     * @param {int} year The <b>Year</b> to search within.","     * @return {Array} Array with the marked Dates within the specified Year","     * @since 3.8.1","     */","    getMarkedDatesInYear : function (year) {","        var instance = this,","            aDate = new Date(year, 0, 1),","            bDate = new Date(year, 11, 31);","","        return instance.getMarkedDates(aDate, bDate);","    },","","    /**","     * Returns whether a Date is marked","     *","     * @method dateIsMarked","     * @param {Date} oDate Date to be checked","     * @return {Boolean}","     * @since 3.8.1","     */","    dateIsMarked : function (oDate) {","        var instance = this,","            markedDates = instance._markedDates,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            isMarked = (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) ? true : false;","","        return isMarked;","    },","","    /**","     * Marks a given date or array of dates. Is appending. If you want to 'reset' with new values,","     * then first call clearMarkedDates().","     *","     * @method markDates","     * @param {Date|Array} dates A `Date` or `Array` of `Date`s.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    markDates : function (dates) {","        var instance = this;","","        if (YDate.isValidDate(dates)) {","            instance._addDateToMarked(dates);","        }","        else if (Lang.isArray(dates)) {","            this._addDatesToMarked(dates);","        }","        return instance;","    },","","    /**","     * Unmarks a given date or array of dates, or unmarks all in case if no param","     * all dates if no argument is specified.","     *","     * @method unmarkDates","     * @param {Date|Array} [dates] A `Date` or `Array` of `Date`s, or no","     * argument if all dates should be deselected.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    unmarkDates : function (dates) {","        var instance = this;","","        if (!dates) {","            instance.clearMarkedDates();","        }","        else if (YDate.isValidDate(dates)) {","            instance._removeDateFromMarked(dates);","        }","        else if (Lang.isArray(dates)) {","            instance._removeDatesFromMarked(dates);","        }","        return instance;","    },","","    /**","     * Unmarks all dates.","     *","     * @method clearMarkedDates","     * @param {boolean} noevent A Boolean specifying whether a markChange","     * event should be fired. If true, no event is fired.","     * @return {CalendarBase} A reference to this object","     * @chainable","     * @since 3.8.1","     */","    clearMarkedDates : function (noevent) {","        var instance = this,","            prevMarked;","","        instance._markedDates = {};","        if (noevent) {","            instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);","        }","        else {","            prevMarked = instance._getMarkedDatesList();","            instance._fireMarkChange(prevMarked);","        }","        return instance;","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","     * A utility method that fires a markChange event.","     * @method _fireMarkChange","     * @param {Array} a list of previous marked dates","     * @private","     * @since 3.8.1","     */","    _fireMarkChange : function (prevMarked) {","        /**","        * Fired when the set of marked dates changes. Contains a payload with","        * a `newMarked` and `prevMarked` property which contains an array of marked dates.","        *","        * @event markChange","        * @param {Array} newVal contains [Date] with all marked Dates","        * @param {Array} prevVal contains [Date] with all marked Dates","        * @since 3.8.1","        */","        var instance = this;","","        instance.fire('markChange', {newVal: instance._getMarkedDatesList(), prevVal: prevMarked});","    },","","    /**","     * Generates a list of marked dates from the hash storage.","     *","     * @method _getMarkedDatesList","     * @private","     * @protected","     * @return {Array} The array of Dates that are currently marked.","     * @since 3.8.1","     */","    _getMarkedDatesList : function () {","        var instance = this,","            output = [];","","        objEach (instance._markedDates, function (year) {","            objEach (year, function (month) {","                objEach (month, function (day) {","                    output.push (day);","                }, instance);","            }, instance);","        }, instance);","","        return output;","    },","","    /**","     * Adds a given date to the markedDates.","     *","     * @method _addDateToMarked","     * @param {Date} oDate The date to add to the markeddates.","     * @param {int} [index] An optional parameter that is used","     * to differentiate between individual marked date and multiple","     * marked dates. If index is available, then this method does not fire an event.","     * @private","     * @since 3.8.1","     */","    _addDateToMarked : function (oDate, index) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            prevMarked;","","        if (!YDate.isValidDate(oDate)) {","        }","        else {","            if (!Lang.isValue(index)) {","                prevMarked = instance._getMarkedDatesList();","            }","            if (hasKey(instance._markedDates, year)) {","                if (hasKey(instance._markedDates[year], month)) {","                    instance._markedDates[year][month][day] = dateCopyObject(oDate);","                } else {","                    instance._markedDates[year][month] = {};","                    instance._markedDates[year][month][day] = dateCopyObject(oDate);","                }","            } else {","                instance._markedDates[year] = {};","                instance._markedDates[year][month] = {};","                instance._markedDates[year][month][day] = dateCopyObject(oDate);","            }","            if (!Lang.isValue(index)) {","                instance._fireMarkChange(prevMarked);","            }","        }","    },","","    /**","     * Adds a given list of dates to the markedDates.","     *","     * @method _addDatesToMarked","     * @param {Array} datesArray The list of dates to add to the markedDates.","     * @private","     * @since 3.8.1","     */","    _addDatesToMarked : function (datesArray) {","        var instance = this,","            prevMarked = instance._getMarkedDatesList();","","        arrayEach(datesArray, instance._addDateToMarked, instance);","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Adds a given range of dates to the markedDates.","     *","     * @method _addDateRangeToMarked","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     * @since 3.8.1","     */","    _addDateRangeToMarked : function (startDate, endDate) {","        var instance = this,","            timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,","            startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            prevMarked = instance._getMarkedDatesList(),","            tempTime, time, addedDate;","","        if (startTime > endTime) {","            tempTime = startTime;","            startTime = endTime;","            endTime = tempTime + timezoneDifference;","        }","        else {","            endTime = endTime - timezoneDifference;","        }","        for (time = startTime; time <= endTime; time += 86400000) {","            addedDate = new Date(time);","            addedDate.setHours(12);","            instance._addDateToMarked(addedDate);","        }","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Removes a given date from the markedDates.","     *","     * @method _removeDateFromMarked","     * @param {Date} oDate The date to remove from the markedDates.","     * @param {int} [index] An optional parameter that is used","     * to differentiate between individual date selections and multiple","     * date selections. If index is available, then this method does not fire an event.","     * @private","     * @since 3.8.1","     */","    _removeDateFromMarked : function (oDate, index) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            prevMarked;","","        if (!YDate.isValidDate(oDate)) {","        }","        else {","            if (hasKey(instance._markedDates, year) &&","                hasKey(instance._markedDates[year], month) &&","                hasKey(instance._markedDates[year][month], day))","            {","                if (Lang.isValue(index)) {","                    delete instance._markedDates[year][month][day];","                }","                else {","                    prevMarked = instance._getMarkedDatesList();","                    delete instance._markedDates[year][month][day];","                    instance._fireMarkChange(prevMarked);","                }","            }","        }","    },","","    /**","     * Removes a given list of dates from the markedDates.","     *","     * @method _removeDatesFromMarked","     * @param {Array} datesArray The list of dates to remove from the markedDates.","     * @private","     * @since 3.8.1","     */","    _removeDatesFromMarked : function (datesArray) {","        var instance = this,","            prevMarked = instance._getMarkedDatesList();","","        arrayEach(datesArray, instance._removeDateFromMarked, instance);","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Removes a given range of dates from the markedDates.","     *","     * @method _removeDateRangeFromMarked","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     * @since 3.8.1","     */","    _removeDateRangeFromMarked : function (startDate, endDate) {","        var instance = this,","            startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            prevMarked = instance._getMarkedDatesList(),","            time;","","        for (time = startTime; time <= endTime; time += 86400000) {","            instance._removeDateFromMarked(new Date(time));","        }","        instance._fireMarkChange(prevMarked);","    },","","    /**","     * Rendering assist method that renders all datecells that are currently marked.","     *","     * @method _renderMarkedDates","     * @private","     * @since 3.8.1","     */","    _renderMarkedDates : function () {","        var instance = this,","            edgeMonthDate = new Date(0),","            contentBox = instance.get('contentBox'),","            paneNum, paneDate, dateArray, dateNode, col1, col2;","","        instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);","        for (paneNum = 0; paneNum < instance._paneNumber; paneNum++) {","            paneDate = YDate.addMonths(instance.get('date'), paneNum);","            dateArray = instance._getMarkedDatesInMonth(paneDate);","            arrayEach(dateArray, Y.bind(instance._renderMarkedDatesHelper, instance));","            if (instance.get('showPrevMonth')) {","                dateCopyValues(paneDate, edgeMonthDate);","                edgeMonthDate.setDate(1);","                col1 = instance._getDateColumn(edgeMonthDate) - 1;","                col2 = 0;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    dateAddDays(edgeMonthDate, -1);","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1--;","                    col2--;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","            }","            if (instance.get('showNextMonth')) {","                dateCopyValues(paneDate, edgeMonthDate);","                dateAddMonths(edgeMonthDate, 1);","                dateAddDays(edgeMonthDate, -1);","                col1 = instance._getDateColumn(edgeMonthDate) + 1;","                col2 = edgeMonthDate.getDate() + 1;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    if (!dateNode.hasClass('yui3-calendar-column-hidden')) {","                        dateAddDays(edgeMonthDate, 1);","                    }","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1++;","                    col2++;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","                col1 = 0;","                col2 = 30;","                dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                while (dateNode) {","                    if (!dateNode.hasClass('yui3-calendar-column-hidden')) {","                        dateAddDays(edgeMonthDate, 1);","                    }","                    if (instance.dateIsMarked(edgeMonthDate)) {","                        dateNode.addClass(CAL_DAY_MARKED);","                    }","                    col1++;","                    col2++;","                    dateNode = contentBox.one(\"#\" + instance._calendarId + \"_pane_\" + paneNum + \"_\" + col1 + \"_\" + col2);","                }","            }","","        }","    },","","    /**","     * A utility method that converts a Date to the columnindex of the calendar cell the Date corresponds to.","     *","     * @method _getDateColumn","     * @param {Date} oDate The Date to retreive the columnindex from","     * @protected","     * @return {int} The columnindex","     */","    _getDateColumn : function (oDate) {","        var day = oDate.getDate(),","            col = 0,","            daymod = day%7,","            paneNum = (12 + oDate.getMonth() - this.get(\"date\").getMonth()) % 12,","            paneId = this._calendarId + \"_pane_\" + paneNum,","            cutoffCol = this._paneProperties[paneId].cutoffCol;","","        switch (daymod) {","            case (0):","                if (cutoffCol >= 6) {","                    col = 12;","                } else {","                    col = 5;","                }","                break;","            case (1):","                    col = 6;","                break;","            case (2):","                if (cutoffCol > 0) {","                    col = 7;","                } else {","                    col = 0;","                }","                break;","            case (3):","                if (cutoffCol > 1) {","                    col = 8;","                } else {","                    col = 1;","                }","                break;","            case (4):","                if (cutoffCol > 2) {","                    col = 9;","                } else {","                    col = 2;","                }","                break;","            case (5):","                if (cutoffCol > 3) {","                    col = 10;","                } else {","                    col = 3;","                }","                break;","            case (6):","                if (cutoffCol > 4) {","                    col = 11;","                } else {","                    col = 4;","                }","                break;","        }","        return col;","","    },","","    /**","    * Takes in a date and marks the datecell.","    *","    * @method _renderMarkedDatesHelper","    * @param {Date} oDate Date to be marked.","    * @private","    * @since 3.8.1","    */","    _renderMarkedDatesHelper: function (oDate) {","","        this._dateToNode(oDate).addClass(CAL_DAY_MARKED);","   },","","    /**","     * Returns all marked dates in a specific month.","     *","     * @method _getMarkedDatesInMonth","     * @param {Date} oDate corresponding to the month for which selected dates are requested.","     * @private","     * @protected","     * @return {Array} The array of `Date`s in a given month that are currently marked.","     * @since 3.8.1","     */","    _getMarkedDatesInMonth : function (oDate) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth();","","        if (hasKey(instance._markedDates, year) && hasKey(instance._markedDates[year], month)) {","            return YObject.values(instance._markedDates[year][month]);","        }","        else {","            return [];","        }","    }","","}, true);","","Y.Calendar.ITSACalendarMarkedDates = ITSACalendarMarkedDates;","","Y.Base.mix(Y.Calendar, [ITSACalendarMarkedDates]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"calendar-base\",","        \"datatype-date\",","        \"datatype-date-math\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].lines = {"1":0,"3":0,"15":0,"27":0,"30":0,"33":0,"37":0,"40":0,"43":0,"45":0,"46":0,"47":0,"48":0,"51":0,"53":0,"85":0,"87":0,"88":0,"89":0,"92":0,"96":0,"108":0,"110":0,"111":0,"129":0,"134":0,"135":0,"138":0,"139":0,"140":0,"141":0,"142":0,"143":0,"149":0,"150":0,"151":0,"153":0,"154":0,"155":0,"156":0,"157":0,"158":0,"159":0,"161":0,"165":0,"177":0,"182":0,"183":0,"184":0,"196":0,"200":0,"201":0,"202":0,"203":0,"215":0,"219":0,"231":0,"238":0,"252":0,"254":0,"255":0,"257":0,"258":0,"260":0,"275":0,"277":0,"278":0,"280":0,"281":0,"283":0,"284":0,"286":0,"300":0,"303":0,"304":0,"305":0,"308":0,"309":0,"311":0,"335":0,"337":0,"350":0,"353":0,"354":0,"355":0,"356":0,"361":0,"376":0,"382":0,"385":0,"386":0,"388":0,"389":0,"390":0,"392":0,"393":0,"396":0,"397":0,"398":0,"400":0,"401":0,"415":0,"418":0,"419":0,"432":0,"439":0,"440":0,"441":0,"442":0,"445":0,"447":0,"448":0,"449":0,"450":0,"452":0,"467":0,"473":0,"476":0,"480":0,"481":0,"484":0,"485":0,"486":0,"501":0,"504":0,"505":0,"518":0,"524":0,"525":0,"527":0,"538":0,"543":0,"544":0,"545":0,"546":0,"547":0,"548":0,"549":0,"550":0,"551":0,"552":0,"553":0,"554":0,"555":0,"556":0,"557":0,"559":0,"560":0,"561":0,"564":0,"565":0,"566":0,"567":0,"568":0,"569":0,"570":0,"571":0,"572":0,"573":0,"575":0,"576":0,"578":0,"579":0,"580":0,"582":0,"583":0,"584":0,"585":0,"586":0,"587":0,"589":0,"590":0,"592":0,"593":0,"594":0,"610":0,"617":0,"619":0,"620":0,"622":0,"624":0,"626":0,"627":0,"629":0,"630":0,"632":0,"634":0,"636":0,"637":0,"639":0,"641":0,"643":0,"644":0,"646":0,"648":0,"650":0,"651":0,"653":0,"655":0,"657":0,"658":0,"660":0,"662":0,"664":0,"678":0,"692":0,"696":0,"697":0,"700":0,"706":0,"708":0};
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].functions = {"dateCopyObject:26":0,"dateCopyValues:29":0,"dateEqualDays:32":0,"dayisGreater:36":0,"dateAddDays:39":0,"dateAddMonths:42":0,"ITSACalendarMarkedDates:51":0,"(anonymous 2):91":0,"initializer:84":0,"destructor:107":0,"(anonymous 3):137":0,"getMarkedDates:128":0,"getMarkedDatesInWeek:176":0,"getMarkedDatesInMonth:195":0,"getMarkedDatesInYear:214":0,"dateIsMarked:230":0,"markDates:251":0,"unmarkDates:274":0,"clearMarkedDates:299":0,"_fireMarkChange:325":0,"(anonymous 6):355":0,"(anonymous 5):354":0,"(anonymous 4):353":0,"_getMarkedDatesList:349":0,"_addDateToMarked:375":0,"_addDatesToMarked:414":0,"_addDateRangeToMarked:431":0,"_removeDateFromMarked:466":0,"_removeDatesFromMarked:500":0,"_removeDateRangeFromMarked:517":0,"_renderMarkedDates:537":0,"_getDateColumn:609":0,"_renderMarkedDatesHelper:676":0,"_getMarkedDatesInMonth:691":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].coveredLines = 211;
_yuitest_coverage["build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js"].coveredFunctions = 35;
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 1);
YUI.add('gallery-itsacalendarmarkeddates', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 3);
'use strict';

/**
 * @module gallery-itsacalendarmarkeddates
 * @class ITSACalendarMarkedDates
 * @constructor
 * @since 3.8.1
 *
 * <i>Copyright (c) 2013 Its Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
**/

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 15);
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
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateCopyObject", 26);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 27);
return new Date(oDate.getTime());
                      },
    dateCopyValues  = function (aDate, bDate) {
                        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateCopyValues", 29);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 30);
bDate.setTime(aDate.getTime());
                    },
    dateEqualDays   = function(aDate, bDate) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateEqualDays", 32);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 33);
return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                  && (aDate.getFullYear()===bDate.getFullYear()));
                      },
    dayisGreater    = function(aDate, bDate) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dayisGreater", 36);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 37);
return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                      },
    dateAddDays     = function (oDate, numDays) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateAddDays", 39);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 40);
oDate.setTime(oDate.getTime() + 86400000*numDays);
                      },
    dateAddMonths   = function (oDate, numMonths) {
                          _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateAddMonths", 42);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 43);
var newYear = oDate.getFullYear(),
                              newMonth = oDate.getMonth() + numMonths;
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 45);
newYear  = Math.floor(newYear + newMonth / 12);
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 46);
newMonth = (newMonth % 12 + 12) % 12;
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 47);
oDate.setFullYear(newYear);
                          _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 48);
oDate.setMonth(newMonth);
                      };

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 51);
function ITSACalendarMarkedDates() {}

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 53);
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

    /**
     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */

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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "initializer", 84);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 85);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 87);
instance._markedDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 88);
instance.get('boundingBox').addClass(WIDGET_CLASS);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 89);
instance.after(
            'render',
            function() {
                _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 2)", 91);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 92);
instance._renderMarkedDates();
                // instance._fireMarkEvent must be attached AFTER rendering.
                // this way we are sure that Calendar._afterDateChange is excecuted before instance._renderMarkedDates
                // (Calendar._afterDateChange also subscribes after-dataChange)
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 96);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "destructor", 107);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 108);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 110);
if (instance._fireMarkEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 111);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDates", 128);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 129);
var instance = this,
            markedDates = instance._markedDates,
            returnDates = [],
            year, month, day, searchDay;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 134);
if (Lang.isArray(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 135);
arrayEach(
                aDate,
                function(oneDate) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 3)", 137);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 138);
if (YDate.isValidDate(oneDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 139);
year = oneDate.getFullYear();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 140);
month = oneDate.getMonth();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 141);
day = oneDate.getDate();
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 142);
if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {
                            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 143);
returnDates.push(dateCopyObject(oneDate));
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 149);
if (YDate.isValidDate(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 150);
if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 151);
bDate = dateCopyObject(aDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 153);
searchDay = new Date(aDate.getTime());
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 154);
do {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 155);
year = searchDay.getFullYear();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 156);
month = searchDay.getMonth();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 157);
day = searchDay.getDate();
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 158);
if (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 159);
returnDates.push(dateCopyObject(searchDay));
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 161);
dateAddDays(searchDay, 1);
            }while (!dayisGreater(searchDay, bDate));
        }}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 165);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInWeek", 176);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 177);
var instance = this,
            dayOfWeek = oDate.getDay(),
            aDate = dateCopyObject(oDate),
            bDate = dateCopyObject(oDate);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 182);
dateAddDays(aDate, -dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 183);
dateAddDays(bDate, 6-dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 184);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInMonth", 195);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 196);
var instance = this,
            aDate = dateCopyObject(oDate),
            bDate = YDate.addMonths(oDate, 1);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 200);
aDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 201);
bDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 202);
dateAddDays(bDate, -1);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 203);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "getMarkedDatesInYear", 214);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 215);
var instance = this,
            aDate = new Date(year, 0, 1),
            bDate = new Date(year, 11, 31);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 219);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "dateIsMarked", 230);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 231);
var instance = this,
            markedDates = instance._markedDates,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            isMarked = (markedDates[year] && markedDates[year][month] && markedDates[year][month][day]) ? true : false;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 238);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "markDates", 251);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 252);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 254);
if (YDate.isValidDate(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 255);
instance._addDateToMarked(dates);
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 257);
if (Lang.isArray(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 258);
this._addDatesToMarked(dates);
        }}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 260);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "unmarkDates", 274);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 275);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 277);
if (!dates) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 278);
instance.clearMarkedDates();
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 280);
if (YDate.isValidDate(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 281);
instance._removeDateFromMarked(dates);
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 283);
if (Lang.isArray(dates)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 284);
instance._removeDatesFromMarked(dates);
        }}}
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 286);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "clearMarkedDates", 299);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 300);
var instance = this,
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 303);
instance._markedDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 304);
if (noevent) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 305);
instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 308);
prevMarked = instance._getMarkedDatesList();
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 309);
instance._fireMarkChange(prevMarked);
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 311);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_fireMarkChange", 325);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 335);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 337);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getMarkedDatesList", 349);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 350);
var instance = this,
            output = [];

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 353);
objEach (instance._markedDates, function (year) {
            _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 4)", 353);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 354);
objEach (year, function (month) {
                _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 5)", 354);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 355);
objEach (month, function (day) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "(anonymous 6)", 355);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 356);
output.push (day);
                }, instance);
            }, instance);
        }, instance);

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 361);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDateToMarked", 375);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 376);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 382);
if (!YDate.isValidDate(oDate)) {
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 385);
if (!Lang.isValue(index)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 386);
prevMarked = instance._getMarkedDatesList();
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 388);
if (hasKey(instance._markedDates, year)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 389);
if (hasKey(instance._markedDates[year], month)) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 390);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 392);
instance._markedDates[year][month] = {};
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 393);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
                }
            } else {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 396);
instance._markedDates[year] = {};
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 397);
instance._markedDates[year][month] = {};
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 398);
instance._markedDates[year][month][day] = dateCopyObject(oDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 400);
if (!Lang.isValue(index)) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 401);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDatesToMarked", 414);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 415);
var instance = this,
            prevMarked = instance._getMarkedDatesList();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 418);
arrayEach(datesArray, instance._addDateToMarked, instance);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 419);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_addDateRangeToMarked", 431);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 432);
var instance = this,
            timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,
            startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            prevMarked = instance._getMarkedDatesList(),
            tempTime, time, addedDate;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 439);
if (startTime > endTime) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 440);
tempTime = startTime;
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 441);
startTime = endTime;
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 442);
endTime = tempTime + timezoneDifference;
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 445);
endTime = endTime - timezoneDifference;
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 447);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 448);
addedDate = new Date(time);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 449);
addedDate.setHours(12);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 450);
instance._addDateToMarked(addedDate);
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 452);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDateFromMarked", 466);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 467);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            prevMarked;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 473);
if (!YDate.isValidDate(oDate)) {
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 476);
if (hasKey(instance._markedDates, year) &&
                hasKey(instance._markedDates[year], month) &&
                hasKey(instance._markedDates[year][month], day))
            {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 480);
if (Lang.isValue(index)) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 481);
delete instance._markedDates[year][month][day];
                }
                else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 484);
prevMarked = instance._getMarkedDatesList();
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 485);
delete instance._markedDates[year][month][day];
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 486);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDatesFromMarked", 500);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 501);
var instance = this,
            prevMarked = instance._getMarkedDatesList();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 504);
arrayEach(datesArray, instance._removeDateFromMarked, instance);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 505);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_removeDateRangeFromMarked", 517);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 518);
var instance = this,
            startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            prevMarked = instance._getMarkedDatesList(),
            time;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 524);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 525);
instance._removeDateFromMarked(new Date(time));
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 527);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_renderMarkedDates", 537);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 538);
var instance = this,
            edgeMonthDate = new Date(0),
            contentBox = instance.get('contentBox'),
            paneNum, paneDate, dateArray, dateNode, col1, col2;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 543);
instance.get('contentBox').all('.' + CAL_DAY_MARKED).removeClass(CAL_DAY_MARKED);
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 544);
for (paneNum = 0; paneNum < instance._paneNumber; paneNum++) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 545);
paneDate = YDate.addMonths(instance.get('date'), paneNum);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 546);
dateArray = instance._getMarkedDatesInMonth(paneDate);
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 547);
arrayEach(dateArray, Y.bind(instance._renderMarkedDatesHelper, instance));
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 548);
if (instance.get('showPrevMonth')) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 549);
dateCopyValues(paneDate, edgeMonthDate);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 550);
edgeMonthDate.setDate(1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 551);
col1 = instance._getDateColumn(edgeMonthDate) - 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 552);
col2 = 0;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 553);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 554);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 555);
dateAddDays(edgeMonthDate, -1);
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 556);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 557);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 559);
col1--;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 560);
col2--;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 561);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                }
            }
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 564);
if (instance.get('showNextMonth')) {
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 565);
dateCopyValues(paneDate, edgeMonthDate);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 566);
dateAddMonths(edgeMonthDate, 1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 567);
dateAddDays(edgeMonthDate, -1);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 568);
col1 = instance._getDateColumn(edgeMonthDate) + 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 569);
col2 = edgeMonthDate.getDate() + 1;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 570);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 571);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 572);
if (!dateNode.hasClass('yui3-calendar-column-hidden')) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 573);
dateAddDays(edgeMonthDate, 1);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 575);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 576);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 578);
col1++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 579);
col2++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 580);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 582);
col1 = 0;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 583);
col2 = 30;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 584);
dateNode = contentBox.one("#" + instance._calendarId + "_pane_" + paneNum + "_" + col1 + "_" + col2);
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 585);
while (dateNode) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 586);
if (!dateNode.hasClass('yui3-calendar-column-hidden')) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 587);
dateAddDays(edgeMonthDate, 1);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 589);
if (instance.dateIsMarked(edgeMonthDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 590);
dateNode.addClass(CAL_DAY_MARKED);
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 592);
col1++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 593);
col2++;
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 594);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getDateColumn", 609);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 610);
var day = oDate.getDate(),
            col = 0,
            daymod = day%7,
            paneNum = (12 + oDate.getMonth() - this.get("date").getMonth()) % 12,
            paneId = this._calendarId + "_pane_" + paneNum,
            cutoffCol = this._paneProperties[paneId].cutoffCol;

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 617);
switch (daymod) {
            case (0):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 619);
if (cutoffCol >= 6) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 620);
col = 12;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 622);
col = 5;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 624);
break;
            case (1):
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 626);
col = 6;
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 627);
break;
            case (2):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 629);
if (cutoffCol > 0) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 630);
col = 7;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 632);
col = 0;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 634);
break;
            case (3):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 636);
if (cutoffCol > 1) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 637);
col = 8;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 639);
col = 1;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 641);
break;
            case (4):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 643);
if (cutoffCol > 2) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 644);
col = 9;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 646);
col = 2;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 648);
break;
            case (5):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 650);
if (cutoffCol > 3) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 651);
col = 10;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 653);
col = 3;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 655);
break;
            case (6):
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 657);
if (cutoffCol > 4) {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 658);
col = 11;
                } else {
                    _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 660);
col = 4;
                }
                _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 662);
break;
        }
        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 664);
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

        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_renderMarkedDatesHelper", 676);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 678);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", "_getMarkedDatesInMonth", 691);
_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 692);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth();

        _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 696);
if (hasKey(instance._markedDates, year) && hasKey(instance._markedDates[year], month)) {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 697);
return YObject.values(instance._markedDates[year][month]);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 700);
return [];
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 706);
Y.Calendar.ITSACalendarMarkedDates = ITSACalendarMarkedDates;

_yuitest_coverline("build/gallery-itsacalendarmarkeddates/gallery-itsacalendarmarkeddates.js", 708);
Y.Base.mix(Y.Calendar, [ITSACalendarMarkedDates]);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "node-base",
        "calendar-base",
        "datatype-date",
        "datatype-date-math"
    ],
    "skinnable": true
});
