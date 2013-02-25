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
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js",
    code: []
};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].code=["YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {","","'use strict';","","/**"," * Adds the feature to attach a ModelList to Calendar."," * Is an extention to Y.Calendar, meaning that you can call these methods like myCalendar.getModelsInYear(2015);"," *"," * <i>Uses <b>gallery-itsacalendarmarkeddates</b> under the hood.</i>"," *"," *"," * Coupling a ModelList to Calendar-instance results in highlighted dates for each Model that has a 'Date-match'."," * To determine a 'Date-match' the Model must have a field of a Date-type."," * This can be defined with the attribute 'modelConfig.date'. When not defined, this Module will"," * automaticly search in the first Model-structure for an appropriate modelConfig.date."," *"," * The attribute modelConfig can be omitted. But when applied, it should be an object with"," * the next possible fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,"," * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>."," *"," * If you look it this way, the Models can have an event (=happening) with a Date where something occurs."," * This event could also have an endDate, in case the event crosses multiple Dates. And events can be repeating (count times),"," * in case we need to define the repeat-Interval, either in Minutes, Hours, Days or Months. Thus, an arbitrary Model"," * could have the following structure:"," *"," * <pre><code>var someEvent = new Y.Model({"," *     name : 'Some conference',"," *     starts : new Date(2013, 01, 25),"," *     ends : new Date(2013, 01, 26),"," *     repeattimes : 10,"," *     monthStep : 12"," * });"," * </code></pre>"," *"," * Without specifying modelConfig, this would lead to just marking 25 feb. 2013."," * But when modelConfig specifies which Model-fields hold what values, we can enhance the behaviour in a way that startDate-endDate is marked"," * and that the marking is repeated over 10 years."," *"," * So, we need to specify modelConfig like this:"," * <pre><code>myModelConfig = {"," *        date: 'starts',"," *        enddate: 'ends',"," *     // intervalMinutes: '',  <-- not needed in this examples"," *     // intervalHours: '',  <-- not needed in this examples"," *     // intervalDays: '',  <-- not needed in this examples"," *        intervalMonths: 'monthStep',"," *        count: 'repeattimes'"," *    };"," * </code></pre>"," *"," * When a Date in the Calendar is clicked, Calendar fires a <b>modelSelectionChange</b>-event which holds an Array of unique bound Models."," * to the Date-selection"," *"," * <u><b>Example 1:</b></u>"," * <pre><code>var myModelList = new Y.ModelList(),"," *    appointment1, appointment2;"," *"," *    appointment1 = new Y.Model({"," *        name: 'Visit Marco',"," *        when: new Date(2013, 01, 03)"," *    });"," *"," *    appointment2 = new Y.Model({"," *        name: 'Carwash',"," *        when: new Date(2013, 01, 12)"," *    });"," *"," *    myModelList.add([appointment1, appointment2]);"," *"," *    var myCalendar = new Y.Calendar({"," *         contentBox: '#mycalendar',"," *         height:'300px',"," *         width:'300px',"," *         modelList: myModelList"," *     });"," *"," *     myCalendar.render();"," *"," *     // now check if Calendar has a Model at 3-feb 2013 (no need to wait for Calendar to be rendered):"," * </code></pre>"," *"," * <u><b>Example 2:</b></u>"," * <pre><code>var myModelList = new Y.ModelList(),"," *    appointment1, appointment2, myModelConfig;"," *"," *    appointment1 = new Y.Model({"," *        name: 'YUI Conf',"," *        starting: new Date(2013, 01, 03),"," *        ending: new Date(2013, 01, 05)"," *    });"," *"," *    appointment2 = new Y.Model({"," *        name: 'Swimming',"," *        starting: new Date(2013, 01, 12),"," *        numberOfTimes: 6,"," *        intervalInDays: 7"," *    });"," *"," *    myModelConfig = {"," *        date: 'starting',"," *        enddate: 'ending',"," *        intervalDays: 'intervalInDays',"," *        count: 'numberOfTimes'"," *    };"," *"," *    myModelList.add([appointment1, appointment2]);"," *"," *    var myCalendar = new Y.Calendar({"," *         contentBox: '#mycalendar',"," *         height:'300px',"," *         width:'300px',"," *         modelList: myModelList,"," *         modelConfig: myModelConfig"," *     });"," *"," *     myCalendar.render();"," * </code></pre>"," *"," * <u><b>Custom styling:</b></u>"," *"," * The way Matched-Dates are styled can be altered by overruling three styles:"," *      '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate'"," * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-itsa-markeddate:hover'"," * and  '.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,"," *       .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover'"," *"," * To make sure your new rule takes higher precedence, be sure you give it a finer declaration. For example no dots but red color:"," * <pre><code>.yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate {"," *     background-image: none;"," *     color: #F00;"," * }"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-itsa-markeddate:hover {"," *     background-image: none;"," *     color: #F00;"," * }"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-prevmonth-day.yui3-itsa-markeddate:hover,"," * .yui3-skin-sam .yui3-calendar-itsa-markeddates .yui3-calendar-content .yui3-calendar-nextmonth-day.yui3-itsa-markeddate:hover {"," *     background-image: none;"," *     color: #A00;"," * }"," * </code></pre>"," *"," * @module gallery-itsacalendarmarkeddates"," * @class ITSACalendarModelList"," * @since 3.8.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html","**/","","var Lang                = Y.Lang,","    YArray              = Y.Array,","    YObject             = Y.Object,","    hasKey              = YObject.hasKey,","    YDate               = Y.DataType.Date,","    dateIsValid         = YDate.isValidDate,","    dateCopyObject      = function (oDate) {","                              return new Date(oDate.getTime());","                          },","    dateCopyValues      = function (aDate, bDate) {","                              bDate.setTime(aDate.getTime());","                          },","    dateAddMinutes      = function (oDate, numMinutes) {","                              oDate.setTime(oDate.getTime() + 60000*numMinutes);","                          },","    dateAddMonths       = function (oDate, numMonths) {","                              var newYear = oDate.getFullYear(),","                                  newMonth = oDate.getMonth() + numMonths;","                              newYear  = Math.floor(newYear + newMonth / 12);","                              newMonth = (newMonth % 12 + 12) % 12;","                              oDate.setFullYear(newYear);","                              oDate.setMonth(newMonth);","                          },","    dateAddDays         = function (oDate, numDays) {","                              oDate.setTime(oDate.getTime() + 86400000*numDays);","                          },","    dateEqualDays       = function(aDate, bDate) {","                              return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                      && (aDate.getFullYear()===bDate.getFullYear()));","                          },","    dayisGreater        = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                          },","    dayisGreaterOrEqual = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) || dateEqualDays(aDate, bDate));","                          };","","function ITSACalendarModelList() {}","","ITSACalendarModelList.ATTRS = {","","    /**","     * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","     * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","     * @attribute modelList","     * @type {ModelList}","     * @default null","     * @since 3.8.1","     */","    modelList : {","        value: null,","        lazyAdd: false,","        validator: function(v){ return (v instanceof Y.ModelList) || v === null; },","        setter: '_setModelList'","    },","","    /**","     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b> attributes. These values are Strings and represent the attributenames","     * in the Models. The actual values (and its types) come form the Models itsself.","     *","     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.","     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,","     * by looking at the Models structure.","     *","     * @attribute modelConfig","     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>","     * @default null","     * @since 3.8.1","     */","    modelConfig: {","        value:      null,","        validator:  function(v){ return Lang.isObject(v) || v === null; },","        setter: '_setModelConfig'","    }","","};","","Y.mix(ITSACalendarModelList.prototype, {","","    /**","     * Internal subscriber to Calendar.after('selectionChange') events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _fireModelsEvent : null,","","    /**","     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _afterRenderEvent : null,","","    /**","     * Internal subscriber to Calendar.after('render') events","     *","     * @property _syncModelListEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _syncModelListEvent : null,","","    /**","     * Internal subscriber to modelList.after('*:change') events","     *","     * @property _syncModelListCheckEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _syncModelListCheckEvent : null,","","    /**","     * Internal flag that tells whether the attribute modelConfig is initiated.","     *","     * @property _modelConfigInitiated","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _modelConfigInitiated : false,","","    /**","     * Internal flag that tells whether the attribute modelList is initiated.","     *","     * @property _modelListInitiated","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _modelListInitiated : false,","","    /**","     * Internal flag that is used to check whether modelConfig is updated by an internal set('modelList').","     *","     * @property _internalUpdate","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _internalUpdate : false,","","","    /**","     * Designated initializer","     * Initializes instance-level properties of ITSACalendarModelList.","     *","     * @method initializer","     * @protected","     * @since 3.8.1","     */","    initializer : function () {","        var instance = this;","","        instance._fireModelsEvent = instance.after('selectionChange', instance._fireSelectedModels);","    },","","    /**","     * Returns an Array with the Models that fall with the specified Date-range.","     * If aDate is an Array, then the search will be inside this Array.","     * If aDate is a Date-Object then the search will go between the range aDate-bDate","     * (bDate included, when bDate is not specified, only aDate is taken)","     *","     * @method getModels","     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within","     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)","     * Will only be taken if aDate is a Date-object","     * @return {Array} Array with all unique Models that fall within the searchargument","     * @since 3.8.1","     */","    getModels : function (aDate, bDate) {","        var instance = this,","            returnModels = [],","            year, month, day, searchDay, modelArrayDay, useFunction;","","        if (Lang.isArray(aDate)) {","            returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});","        }","        else if (YDate.isValidDate(aDate)) {","            useFunction = function(model) {","                if (YArray.indexOf(returnModels, model) === -1) {","                    returnModels.push(model);","                }","            };","            if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {","                bDate = dateCopyObject(aDate);","            }","            searchDay = new Date(aDate.getTime());","            do {","                year = searchDay.getFullYear();","                month = searchDay.getMonth();","                day = searchDay.getDate();","                modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                && instance._storedModelDates[year][month][day]) || [];","                YArray.each(","                    modelArrayDay,","                    useFunction","                );","                dateAddDays(searchDay, 1);","            }","            while (!dayisGreater(searchDay, bDate));","        }","        return returnModels;","    },","","    /**","     * Returns whether a Date has any Models","     *","     * @method dateHasModels","     * @param {Date} oDate Date to be checked","     * @return {Boolean}","     * @since 3.8.1","     */","    dateHasModels : function (oDate) {","        var instance = this,","            storedModelDates = instance._storedModelDates,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],","            hasModels = (modelArray.length > 0);","","        return hasModels;","    },","","    /**","     * Returns an Array with the Models that fall in the specified <b>Date</b>.","     * <br />Sugar-method: the same as when calling the method getModels(oDate);","     *","     * @method getModelsInDate","     * @param {Date} oDate a Date-Object to search within.","     * @return {Array} Array with the Models within the specified Date","     * @since 3.8.1","     */","    getModelsInDate : function (oDate) {","        var instance = this;","","        return instance.getModels(oDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Week</b> specified by the Date-argument.","     *","     * @method getModelsInWeek","     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.","     * @return {Array} Array with the Models within the specified Week","     * @since 3.8.1","     */","    getModelsInWeek : function (oDate) {","        var instance = this,","            dayOfWeek = oDate.getDay(),","            aDate = dateCopyObject(oDate),","            bDate = dateCopyObject(oDate);","","        dateAddDays(aDate, -dayOfWeek);","        dateAddDays(bDate, 6-dayOfWeek);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Month</b> specified by the Date-argument.","     *","     * @method getModelsInMonth","     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.","     * @return {Array} Array with the Models within the specified Month","     * @since 3.8.1","     */","    getModelsInMonth : function (oDate) {","        var instance = this,","            aDate = dateCopyObject(oDate),","            bDate = YDate.addMonths(oDate, 1);","","        aDate.setDate(1);","        bDate.setDate(1);","        dateAddDays(bDate, -1);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Year</b>.","     *","     * @method getModelsInYear","     * @param {int} year The <b>Year</b> to search within.","     * @return {Array} Array with the Models within the specified Year","     * @since 3.8.1","     */","    getModelsInYear : function (year) {","        var instance = this,","            aDate = new Date(year, 0, 1),","            bDate = new Date(year, 11, 31);","","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Cleans up events","     *","     * @method destructor","     * @protected","     * @since 3.8.1","     */","    destructor: function () {","        var instance = this;","","        instance._clearSyncSubscriptionModelList();","        if (instance._fireModelsEvent) {","            instance._fireModelsEvent.detach();","        }","        if (instance._afterRenderEvent) {","            instance._afterRenderEvent.detach();","        }","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","     * Clears subscriptions _syncModelListEvent and _syncModelListCheckEvent","     *","     * @method _clearSyncSubscriptionModelList","     * @private","     * @since 3.8.1","     */","    _clearSyncSubscriptionModelList : function () {","        var instance = this;","","        if (instance._syncModelListEvent) {","            instance._syncModelListEvent.detach();","        }","        if (instance._syncModelListCheckEvent) {","            instance._syncModelListCheckEvent.detach();","        }","    },","","    /**","     * Setter when changing attribute modelConfig.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelConfig","     * @param {Object} val the new modelConfig","     * @private","     * @since 3.8.1","     */","    _setModelConfig : function (val) {","        var instance = this;","","        // do not sync at startup:","        if (instance._modelConfigInitiated && !instance._internalUpdate) {","            instance._syncModelList(null, null, val);","        }","        else {","            instance._modelConfigInitiated = true;","        }","    },","","    /**","     * Setter when changing attribute modelList.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelList","     * @param {ModelList} val the new modelList","     * @private","     * @since 3.8.1","     */","    _setModelList : function (val) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modeldateattr = modelconfig.date,","            firstModel, valid;","","        // search datefield when not available","        if (!modeldateattr && val && val.size()>0) {","            firstModel = val.item(0);","            YObject.some(","                firstModel.getAttrs(),","                function(val, key) {","                    valid = Lang.isDate(val);","                    if (valid) {","                        modeldateattr = key;","                    }","                    return valid;","                }","            );","            if (valid) {","                instance._internalUpdate = true;","                modelconfig.date = modeldateattr;","                instance.set('modelConfig', modelconfig);","                instance._internalUpdate = false;","            }","            else {","            }","        }","        instance._clearSyncSubscriptionModelList();","        if (val) {","            instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);","            instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);","        }","        // do not sync at startup:","        if (instance._modelListInitiated || val) {","            instance._syncModelList(null, val);","        }","        else {","            instance._modelListInitiated = true;","        }","    },","","    /**","     * Subscriber to this.modelList.after('*:change')","     * Might call _syncModelList, but only if the Models-attribute that is changed is one of these:","     * date, enddate, count, intervalMinutes, intervalHours, intervalDays or intervalMonths","     *","     * @method _checkSyncModelList","     * @param {EventTarget} e","     * @private","     * @since 3.8.1","     */","    _checkSyncModelList : function (e) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modelconfigDate = modelconfig.date || '',","            modelconfigEnddate = modelconfig.enddate || '',","            modelconfigCount = modelconfig.count || '',","            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',","            modelconfigIntervalHours = modelconfig.intervalHours || '',","            modelconfigIntervalDays = modelconfig.intervalDays || '',","            modelconfigIntervalMonths = modelconfig.intervalMonths || '';","        if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]","            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {","            if (instance.get('rendered')) {","                instance._doSyncModelList();","            }","            else {","                instance._afterRenderEvent = instance.after(","                    'render',","                    Y.bind(instance._doSyncModelList, instance)","                );","            }","        }","        else {","        }","    },","","    /**","     * Will call _doSyncModelList, but waits until the Calendar is rendered.","     *","     * @method _syncModelList","     * @param {EventTarget} e","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 3.8.1","     */","    _syncModelList : function (e, attrmodellist, attrmodelconfig) {","        var instance = this;","        if (instance.get('rendered')) {","            instance._doSyncModelList(attrmodellist, attrmodelconfig);","        }","        else {","            instance._afterRenderEvent = instance.after(","                'render',","                Y.bind(instance._doSyncModelList, instance, attrmodellist, attrmodelconfig)","            );","        }","    },","","    /**","     * Syncs the modelList with Calendar using the attributes defined in modelConfig.","     *","     * @method _doSyncModelList","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 3.8.1","     */","    _doSyncModelList : function (attrmodellist, attrmodelconfig) {","        var instance = this,","            modellist = attrmodellist || instance.get('modelList'),","            modelconfig = attrmodelconfig || instance.get('modelConfig') || {},","            attrDate = modelconfig.date,","            attrEnddate = modelconfig.enddate,","            attrCount = modelconfig.count,","            attrIntervalMinutes = modelconfig.intervalMinutes,","            attrIntervalHours = modelconfig.intervalHours,","            attrIntervalDays = modelconfig.intervalDays,","            attrIntervalMonths = modelconfig.intervalMonths,","            dates = [],","            modelfunc, pushDate, i, prevDate, prevCount;","","        instance.clearMarkedDates(modellist && attrDate);","        prevCount = YObject.size(instance._storedModelDates);","        instance._storedModelDates = {};","        if (modellist && attrDate) {","            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when","            // an easier configuration is used (probably most of the cases)","            if (!attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate);","                    if (dateIsValid(modelDate)) {","                        dates.push(modelDate);","                        instance._storeModelDate(model, modelDate);","                    }","                };","            }","            else if (attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelEndDate = model.get(attrEnddate) || modelDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        pushDate = dateCopyObject(modelDate);","                        do {","                            dates.push(dateCopyObject(pushDate));","                            instance._storeModelDate(model, pushDate);","                            dateAddDays(pushDate, 1);","                        }","                        while (dayisGreaterOrEqual(modelEndDate, pushDate));","                    }","                };","            }","            else if (!attrEnddate && attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelCount = model.get(attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),","                        stepMinutes;","                    if (dateIsValid(modelDate)) {","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        pushDate = dateCopyObject(modelDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            if (!dateEqualDays(pushDate, prevDate)) {","                                dates.push(dateCopyObject(pushDate));","                                instance._storeModelDate(model, pushDate);","                            }","                            dateCopyValues(pushDate, prevDate);","                            if (stepMinutes>0) {","                                dateAddMinutes(pushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(pushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            else if (attrEnddate && attrCount) {","                // Make pushDate a Date object, so we can copy Date-values to it","                pushDate = new Date(0);","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelEndDate = model.get(attrEnddate) || modelDate,","                        modelCount = model.get(attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),","                        stepMinutes, startPushDate, endPushDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        startPushDate = dateCopyObject(modelDate);","                        endPushDate = dateCopyObject(modelEndDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            dateCopyValues(startPushDate, pushDate);","                            do {","                                if (dayisGreater(pushDate, prevDate)) {","                                    dates.push(dateCopyObject(pushDate));","                                    instance._storeModelDate(model, pushDate);","                                }","                                dateAddDays(pushDate, 1);","                            }","                            while (dayisGreaterOrEqual(endPushDate, pushDate));","                            dateCopyValues(pushDate, prevDate);","                            // correct prevDate --> because pushDate has been added 1 day that has not been handled","                            dateAddDays(prevDate, -1);","                            if (stepMinutes>0) {","                                dateAddMinutes(startPushDate, stepMinutes);","                                dateAddMinutes(endPushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(startPushDate, modelIntervalMonths);","                                dateAddMonths(endPushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            modellist.each(modelfunc);","            instance.markDates(dates);","            instance._fireSelectedModels();","        }","        else {","            if (prevCount>0) {","                instance._fireSelectedModels();","            }","        }","    },","","    /**","     * Stores the model in an internal object: _storedModelDates","     * _storedModelDates is used to retrieve the models when a date is selected. Every model could","     * mark multiple Dates in case they have an <i>interval</i> set and/or in case an <i>enddate</i> is available.","     *","     * @method _storeModelDate","     * @param {Y.Model} model The model to store","     * @param {Date} oDate The Date that the model should mark the Calendar","     * @private","     * @since 3.8.1","     */","    _storeModelDate : function(model, oDate) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate();","","        if (!hasKey(instance._storedModelDates, year)) {","            instance._storedModelDates[year] = {};","        }","        if (!hasKey(instance._storedModelDates[year], month)) {","            instance._storedModelDates[year][month] = {};","        }","        if (!hasKey(instance._storedModelDates[year][month], day)) {","            // define as an Array, NOT an object --> needs to be filled with Models","            instance._storedModelDates[year][month][day] = [];","        }","        instance._storedModelDates[year][month][day].push(model);","    },","","    /**","     * A utility method that fires the selected Models on a selectionChange event or when syncing the modelList.","     *","     * @method _fireSelectedModels","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 3.8.1","     */","    _fireSelectedModels : function (e) {","        var instance = this;","","        /**","         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is","         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Models] with all modelList's Models who match the selected date(s)","         * @since 3.8.1","        **/","        instance.fire(\"modelSelectionChange\", {newModelSelection: instance._getSelectedModelList(e)});","    },","","    /**","     * Retrieves the unique Models that are available in the selectedDates.","     *","     * @method _getSelectedModelList","     * @param {eventTarget} [e] The eventTarget after a selectionChange. When not provided, the attribute 'selectedDates' is taken.","     * @private","     * @protected","     * @return {Array} Unique list of Models that are present in selectedDates","     * @since 3.8.1","     */","    _getSelectedModelList : function(e) {","        var instance = this,","            dateselection = (e && e.newSelection) || instance.get('selectedDates'),","            modelArray = [];","","        YArray.each(","            dateselection,","            function(oDate) {","                // e.validateDate is undefined when comes from event --> in that case we always are sure","                // the array consist only Date-objects","                if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {","                    var year = oDate.getFullYear(),","                        month = oDate.getMonth(),","                        day = oDate.getDate(),","                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                        && instance._storedModelDates[year][month][day]) || [];","                    YArray.each(","                        modelArrayDay,","                        function(model) {","                            if (YArray.indexOf(modelArray, model) === -1) {","                                modelArray.push(model);","                            }","                        }","                    );","                }","            }","        );","        return modelArray;","    }","","}, true);","","Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;","","Y.Base.mix(Y.Calendar, [ITSACalendarModelList]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"calendar-base\",","        \"model\",","        \"model-list\",","        \"datatype-date-math\",","        \"gallery-itsacalendarmarkeddates\"","    ]","});"];
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].lines = {"1":0,"3":0,"155":0,"162":0,"165":0,"168":0,"171":0,"173":0,"174":0,"175":0,"176":0,"179":0,"182":0,"186":0,"189":0,"192":0,"194":0,"207":0,"228":0,"234":0,"316":0,"318":0,"335":0,"339":0,"340":0,"342":0,"343":0,"344":0,"345":0,"348":0,"349":0,"351":0,"352":0,"353":0,"354":0,"355":0,"356":0,"358":0,"362":0,"366":0,"378":0,"386":0,"399":0,"401":0,"413":0,"418":0,"419":0,"420":0,"432":0,"436":0,"437":0,"438":0,"439":0,"451":0,"455":0,"466":0,"468":0,"469":0,"470":0,"472":0,"473":0,"489":0,"491":0,"492":0,"494":0,"495":0,"509":0,"512":0,"513":0,"516":0,"530":0,"536":0,"537":0,"538":0,"541":0,"542":0,"543":0,"545":0,"548":0,"549":0,"550":0,"551":0,"552":0,"557":0,"558":0,"559":0,"560":0,"563":0,"564":0,"567":0,"582":0,"591":0,"593":0,"594":0,"597":0,"620":0,"621":0,"622":0,"625":0,"644":0,"657":0,"658":0,"659":0,"660":0,"663":0,"664":0,"665":0,"666":0,"667":0,"668":0,"672":0,"673":0,"674":0,"676":0,"677":0,"678":0,"680":0,"681":0,"682":0,"683":0,"684":0,"690":0,"691":0,"692":0,"699":0,"700":0,"701":0,"703":0,"704":0,"706":0,"707":0,"709":0,"710":0,"712":0,"713":0,"715":0,"716":0,"717":0,"719":0,"720":0,"721":0,"722":0,"723":0,"724":0,"726":0,"727":0,"728":0,"730":0,"731":0,"737":0,"739":0,"740":0,"741":0,"749":0,"750":0,"751":0,"753":0,"754":0,"756":0,"757":0,"759":0,"760":0,"762":0,"763":0,"765":0,"766":0,"768":0,"769":0,"770":0,"772":0,"773":0,"774":0,"775":0,"776":0,"777":0,"778":0,"779":0,"780":0,"782":0,"785":0,"787":0,"788":0,"789":0,"790":0,"792":0,"793":0,"794":0,"800":0,"801":0,"802":0,"805":0,"806":0,"823":0,"828":0,"829":0,"831":0,"832":0,"834":0,"836":0,"838":0,"850":0,"859":0,"873":0,"877":0,"882":0,"883":0,"888":0,"891":0,"892":0,"899":0,"904":0,"906":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].functions = {"dateCopyObject:161":0,"dateCopyValues:164":0,"dateAddMinutes:167":0,"dateAddMonths:170":0,"dateAddDays:178":0,"dateEqualDays:181":0,"dayisGreater:185":0,"dayisGreaterOrEqual:188":0,"ITSACalendarModelList:192":0,"validator:207":0,"validator:228":0,"initializer:315":0,"useFunction:343":0,"getModels:334":0,"dateHasModels:377":0,"getModelsInDate:398":0,"getModelsInWeek:412":0,"getModelsInMonth:431":0,"getModelsInYear:450":0,"destructor:465":0,"_clearSyncSubscriptionModelList:488":0,"_setModelConfig:508":0,"(anonymous 2):540":0,"_setModelList:529":0,"_checkSyncModelList:581":0,"_syncModelList:619":0,"modelfunc:664":0,"modelfunc:673":0,"modelfunc:691":0,"modelfunc:740":0,"_doSyncModelList:643":0,"_storeModelDate:822":0,"_fireSelectedModels:849":0,"(anonymous 4):890":0,"(anonymous 3):879":0,"_getSelectedModelList:872":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredLines = 212;
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredFunctions = 37;
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 1);
YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 3);
'use strict';

/**
 * Adds the feature to attach a ModelList to Calendar.
 * Is an extention to Y.Calendar, meaning that you can call these methods like myCalendar.getModelsInYear(2015);
 *
 * <i>Uses <b>gallery-itsacalendarmarkeddates</b> under the hood.</i>
 *
 *
 * Coupling a ModelList to Calendar-instance results in highlighted dates for each Model that has a 'Date-match'.
 * To determine a 'Date-match' the Model must have a field of a Date-type.
 * This can be defined with the attribute 'modelConfig.date'. When not defined, this Module will
 * automaticly search in the first Model-structure for an appropriate modelConfig.date.
 *
 * The attribute modelConfig can be omitted. But when applied, it should be an object with
 * the next possible fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,
 * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>.
 *
 * If you look it this way, the Models can have an event (=happening) with a Date where something occurs.
 * This event could also have an endDate, in case the event crosses multiple Dates. And events can be repeating (count times),
 * in case we need to define the repeat-Interval, either in Minutes, Hours, Days or Months. Thus, an arbitrary Model
 * could have the following structure:
 *
 * <pre><code>var someEvent = new Y.Model({
 *     name : 'Some conference',
 *     starts : new Date(2013, 01, 25),
 *     ends : new Date(2013, 01, 26),
 *     repeattimes : 10,
 *     monthStep : 12
 * });
 * </code></pre>
 *
 * Without specifying modelConfig, this would lead to just marking 25 feb. 2013.
 * But when modelConfig specifies which Model-fields hold what values, we can enhance the behaviour in a way that startDate-endDate is marked
 * and that the marking is repeated over 10 years.
 *
 * So, we need to specify modelConfig like this:
 * <pre><code>myModelConfig = {
 *        date: 'starts',
 *        enddate: 'ends',
 *     // intervalMinutes: '',  <-- not needed in this examples
 *     // intervalHours: '',  <-- not needed in this examples
 *     // intervalDays: '',  <-- not needed in this examples
 *        intervalMonths: 'monthStep',
 *        count: 'repeattimes'
 *    };
 * </code></pre>
 *
 * When a Date in the Calendar is clicked, Calendar fires a <b>modelSelectionChange</b>-event which holds an Array of unique bound Models.
 * to the Date-selection
 *
 * <u><b>Example 1:</b></u>
 * <pre><code>var myModelList = new Y.ModelList(),
 *    appointment1, appointment2;
 *
 *    appointment1 = new Y.Model({
 *        name: 'Visit Marco',
 *        when: new Date(2013, 01, 03)
 *    });
 *
 *    appointment2 = new Y.Model({
 *        name: 'Carwash',
 *        when: new Date(2013, 01, 12)
 *    });
 *
 *    myModelList.add([appointment1, appointment2]);
 *
 *    var myCalendar = new Y.Calendar({
 *         contentBox: '#mycalendar',
 *         height:'300px',
 *         width:'300px',
 *         modelList: myModelList
 *     });
 *
 *     myCalendar.render();
 *
 *     // now check if Calendar has a Model at 3-feb 2013 (no need to wait for Calendar to be rendered):
 * </code></pre>
 *
 * <u><b>Example 2:</b></u>
 * <pre><code>var myModelList = new Y.ModelList(),
 *    appointment1, appointment2, myModelConfig;
 *
 *    appointment1 = new Y.Model({
 *        name: 'YUI Conf',
 *        starting: new Date(2013, 01, 03),
 *        ending: new Date(2013, 01, 05)
 *    });
 *
 *    appointment2 = new Y.Model({
 *        name: 'Swimming',
 *        starting: new Date(2013, 01, 12),
 *        numberOfTimes: 6,
 *        intervalInDays: 7
 *    });
 *
 *    myModelConfig = {
 *        date: 'starting',
 *        enddate: 'ending',
 *        intervalDays: 'intervalInDays',
 *        count: 'numberOfTimes'
 *    };
 *
 *    myModelList.add([appointment1, appointment2]);
 *
 *    var myCalendar = new Y.Calendar({
 *         contentBox: '#mycalendar',
 *         height:'300px',
 *         width:'300px',
 *         modelList: myModelList,
 *         modelConfig: myModelConfig
 *     });
 *
 *     myCalendar.render();
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
 * @class ITSACalendarModelList
 * @since 3.8.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
**/

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 155);
var Lang                = Y.Lang,
    YArray              = Y.Array,
    YObject             = Y.Object,
    hasKey              = YObject.hasKey,
    YDate               = Y.DataType.Date,
    dateIsValid         = YDate.isValidDate,
    dateCopyObject      = function (oDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateCopyObject", 161);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 162);
return new Date(oDate.getTime());
                          },
    dateCopyValues      = function (aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateCopyValues", 164);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 165);
bDate.setTime(aDate.getTime());
                          },
    dateAddMinutes      = function (oDate, numMinutes) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddMinutes", 167);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 168);
oDate.setTime(oDate.getTime() + 60000*numMinutes);
                          },
    dateAddMonths       = function (oDate, numMonths) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddMonths", 170);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 171);
var newYear = oDate.getFullYear(),
                                  newMonth = oDate.getMonth() + numMonths;
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 173);
newYear  = Math.floor(newYear + newMonth / 12);
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 174);
newMonth = (newMonth % 12 + 12) % 12;
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 175);
oDate.setFullYear(newYear);
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 176);
oDate.setMonth(newMonth);
                          },
    dateAddDays         = function (oDate, numDays) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddDays", 178);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 179);
oDate.setTime(oDate.getTime() + 86400000*numDays);
                          },
    dateEqualDays       = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateEqualDays", 181);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 182);
return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                      && (aDate.getFullYear()===bDate.getFullYear()));
                          },
    dayisGreater        = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dayisGreater", 185);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 186);
return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                          },
    dayisGreaterOrEqual = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dayisGreaterOrEqual", 188);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 189);
return (YDate.isGreater(aDate, bDate) || dateEqualDays(aDate, bDate));
                          };

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 192);
function ITSACalendarModelList() {}

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 194);
ITSACalendarModelList.ATTRS = {

    /**
     * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model
     * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.
     * @attribute modelList
     * @type {ModelList}
     * @default null
     * @since 3.8.1
     */
    modelList : {
        value: null,
        lazyAdd: false,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 207);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 207);
return (v instanceof Y.ModelList) || v === null; },
        setter: '_setModelList'
    },

    /**
     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,
     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b> attributes. These values are Strings and represent the attributenames
     * in the Models. The actual values (and its types) come form the Models itsself.
     *
     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.
     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,
     * by looking at the Models structure.
     *
     * @attribute modelConfig
     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,
     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>
     * @default null
     * @since 3.8.1
     */
    modelConfig: {
        value:      null,
        validator:  function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 228);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 228);
return Lang.isObject(v) || v === null; },
        setter: '_setModelConfig'
    }

};

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 234);
Y.mix(ITSACalendarModelList.prototype, {

    /**
     * Internal subscriber to Calendar.after('selectionChange') events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */
    _fireModelsEvent : null,

    /**
     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */
    _afterRenderEvent : null,

    /**
     * Internal subscriber to Calendar.after('render') events
     *
     * @property _syncModelListEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */
    _syncModelListEvent : null,

    /**
     * Internal subscriber to modelList.after('*:change') events
     *
     * @property _syncModelListCheckEvent
     * @type EventHandle
     * @private
     * @since 3.8.1
     */
    _syncModelListCheckEvent : null,

    /**
     * Internal flag that tells whether the attribute modelConfig is initiated.
     *
     * @property _modelConfigInitiated
     * @type Boolean
     * @private
     * @since 3.8.1
     */
    _modelConfigInitiated : false,

    /**
     * Internal flag that tells whether the attribute modelList is initiated.
     *
     * @property _modelListInitiated
     * @type Boolean
     * @private
     * @since 3.8.1
     */
    _modelListInitiated : false,

    /**
     * Internal flag that is used to check whether modelConfig is updated by an internal set('modelList').
     *
     * @property _internalUpdate
     * @type Boolean
     * @private
     * @since 3.8.1
     */
    _internalUpdate : false,


    /**
     * Designated initializer
     * Initializes instance-level properties of ITSACalendarModelList.
     *
     * @method initializer
     * @protected
     * @since 3.8.1
     */
    initializer : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "initializer", 315);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 316);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 318);
instance._fireModelsEvent = instance.after('selectionChange', instance._fireSelectedModels);
    },

    /**
     * Returns an Array with the Models that fall with the specified Date-range.
     * If aDate is an Array, then the search will be inside this Array.
     * If aDate is a Date-Object then the search will go between the range aDate-bDate
     * (bDate included, when bDate is not specified, only aDate is taken)
     *
     * @method getModels
     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within
     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)
     * Will only be taken if aDate is a Date-object
     * @return {Array} Array with all unique Models that fall within the searchargument
     * @since 3.8.1
     */
    getModels : function (aDate, bDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModels", 334);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 335);
var instance = this,
            returnModels = [],
            year, month, day, searchDay, modelArrayDay, useFunction;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 339);
if (Lang.isArray(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 340);
returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 342);
if (YDate.isValidDate(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 343);
useFunction = function(model) {
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "useFunction", 343);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 344);
if (YArray.indexOf(returnModels, model) === -1) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 345);
returnModels.push(model);
                }
            };
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 348);
if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 349);
bDate = dateCopyObject(aDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 351);
searchDay = new Date(aDate.getTime());
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 352);
do {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 353);
year = searchDay.getFullYear();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 354);
month = searchDay.getMonth();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 355);
day = searchDay.getDate();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 356);
modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                && instance._storedModelDates[year][month][day]) || [];
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 358);
YArray.each(
                    modelArrayDay,
                    useFunction
                );
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 362);
dateAddDays(searchDay, 1);
            }while (!dayisGreater(searchDay, bDate));
        }}
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 366);
return returnModels;
    },

    /**
     * Returns whether a Date has any Models
     *
     * @method dateHasModels
     * @param {Date} oDate Date to be checked
     * @return {Boolean}
     * @since 3.8.1
     */
    dateHasModels : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateHasModels", 377);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 378);
var instance = this,
            storedModelDates = instance._storedModelDates,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],
            hasModels = (modelArray.length > 0);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 386);
return hasModels;
    },

    /**
     * Returns an Array with the Models that fall in the specified <b>Date</b>.
     * <br />Sugar-method: the same as when calling the method getModels(oDate);
     *
     * @method getModelsInDate
     * @param {Date} oDate a Date-Object to search within.
     * @return {Array} Array with the Models within the specified Date
     * @since 3.8.1
     */
    getModelsInDate : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInDate", 398);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 399);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 401);
return instance.getModels(oDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Week</b> specified by the Date-argument.
     *
     * @method getModelsInWeek
     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.
     * @return {Array} Array with the Models within the specified Week
     * @since 3.8.1
     */
    getModelsInWeek : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInWeek", 412);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 413);
var instance = this,
            dayOfWeek = oDate.getDay(),
            aDate = dateCopyObject(oDate),
            bDate = dateCopyObject(oDate);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 418);
dateAddDays(aDate, -dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 419);
dateAddDays(bDate, 6-dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 420);
return instance.getModels(aDate, bDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Month</b> specified by the Date-argument.
     *
     * @method getModelsInMonth
     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.
     * @return {Array} Array with the Models within the specified Month
     * @since 3.8.1
     */
    getModelsInMonth : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInMonth", 431);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 432);
var instance = this,
            aDate = dateCopyObject(oDate),
            bDate = YDate.addMonths(oDate, 1);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 436);
aDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 437);
bDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 438);
dateAddDays(bDate, -1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 439);
return instance.getModels(aDate, bDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Year</b>.
     *
     * @method getModelsInYear
     * @param {int} year The <b>Year</b> to search within.
     * @return {Array} Array with the Models within the specified Year
     * @since 3.8.1
     */
    getModelsInYear : function (year) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInYear", 450);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 451);
var instance = this,
            aDate = new Date(year, 0, 1),
            bDate = new Date(year, 11, 31);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 455);
return instance.getModels(aDate, bDate);
    },

    /**
     * Cleans up events
     *
     * @method destructor
     * @protected
     * @since 3.8.1
     */
    destructor: function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "destructor", 465);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 466);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 468);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 469);
if (instance._fireModelsEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 470);
instance._fireModelsEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 472);
if (instance._afterRenderEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 473);
instance._afterRenderEvent.detach();
        }
    },

    //--------------------------------------------------------------------------
    // Protected properties and methods
    //--------------------------------------------------------------------------

    /**
     * Clears subscriptions _syncModelListEvent and _syncModelListCheckEvent
     *
     * @method _clearSyncSubscriptionModelList
     * @private
     * @since 3.8.1
     */
    _clearSyncSubscriptionModelList : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_clearSyncSubscriptionModelList", 488);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 489);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 491);
if (instance._syncModelListEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 492);
instance._syncModelListEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 494);
if (instance._syncModelListCheckEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 495);
instance._syncModelListCheckEvent.detach();
        }
    },

    /**
     * Setter when changing attribute modelConfig.
     * Will sync the ModelList with the Calendar.
     *
     * @method _setModelConfig
     * @param {Object} val the new modelConfig
     * @private
     * @since 3.8.1
     */
    _setModelConfig : function (val) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelConfig", 508);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 509);
var instance = this;

        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 512);
if (instance._modelConfigInitiated && !instance._internalUpdate) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 513);
instance._syncModelList(null, null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 516);
instance._modelConfigInitiated = true;
        }
    },

    /**
     * Setter when changing attribute modelList.
     * Will sync the ModelList with the Calendar.
     *
     * @method _setModelList
     * @param {ModelList} val the new modelList
     * @private
     * @since 3.8.1
     */
    _setModelList : function (val) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelList", 529);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 530);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modeldateattr = modelconfig.date,
            firstModel, valid;

        // search datefield when not available
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 536);
if (!modeldateattr && val && val.size()>0) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 537);
firstModel = val.item(0);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 538);
YObject.some(
                firstModel.getAttrs(),
                function(val, key) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 2)", 540);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 541);
valid = Lang.isDate(val);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 542);
if (valid) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 543);
modeldateattr = key;
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 545);
return valid;
                }
            );
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 548);
if (valid) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 549);
instance._internalUpdate = true;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 550);
modelconfig.date = modeldateattr;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 551);
instance.set('modelConfig', modelconfig);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 552);
instance._internalUpdate = false;
            }
            else {
            }
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 557);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 558);
if (val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 559);
instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 560);
instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);
        }
        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 563);
if (instance._modelListInitiated || val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 564);
instance._syncModelList(null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 567);
instance._modelListInitiated = true;
        }
    },

    /**
     * Subscriber to this.modelList.after('*:change')
     * Might call _syncModelList, but only if the Models-attribute that is changed is one of these:
     * date, enddate, count, intervalMinutes, intervalHours, intervalDays or intervalMonths
     *
     * @method _checkSyncModelList
     * @param {EventTarget} e
     * @private
     * @since 3.8.1
     */
    _checkSyncModelList : function (e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_checkSyncModelList", 581);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 582);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modelconfigDate = modelconfig.date || '',
            modelconfigEnddate = modelconfig.enddate || '',
            modelconfigCount = modelconfig.count || '',
            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',
            modelconfigIntervalHours = modelconfig.intervalHours || '',
            modelconfigIntervalDays = modelconfig.intervalDays || '',
            modelconfigIntervalMonths = modelconfig.intervalMonths || '';
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 591);
if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]
            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 593);
if (instance.get('rendered')) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 594);
instance._doSyncModelList();
            }
            else {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 597);
instance._afterRenderEvent = instance.after(
                    'render',
                    Y.bind(instance._doSyncModelList, instance)
                );
            }
        }
        else {
        }
    },

    /**
     * Will call _doSyncModelList, but waits until the Calendar is rendered.
     *
     * @method _syncModelList
     * @param {EventTarget} e
     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList
     * it holds the new value for modelList
     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig
     * it holds the new value for modelConfig
     * @private
     * @since 3.8.1
     */
    _syncModelList : function (e, attrmodellist, attrmodelconfig) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_syncModelList", 619);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 620);
var instance = this;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 621);
if (instance.get('rendered')) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 622);
instance._doSyncModelList(attrmodellist, attrmodelconfig);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 625);
instance._afterRenderEvent = instance.after(
                'render',
                Y.bind(instance._doSyncModelList, instance, attrmodellist, attrmodelconfig)
            );
        }
    },

    /**
     * Syncs the modelList with Calendar using the attributes defined in modelConfig.
     *
     * @method _doSyncModelList
     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList
     * it holds the new value for modelList
     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig
     * it holds the new value for modelConfig
     * @private
     * @since 3.8.1
     */
    _doSyncModelList : function (attrmodellist, attrmodelconfig) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_doSyncModelList", 643);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 644);
var instance = this,
            modellist = attrmodellist || instance.get('modelList'),
            modelconfig = attrmodelconfig || instance.get('modelConfig') || {},
            attrDate = modelconfig.date,
            attrEnddate = modelconfig.enddate,
            attrCount = modelconfig.count,
            attrIntervalMinutes = modelconfig.intervalMinutes,
            attrIntervalHours = modelconfig.intervalHours,
            attrIntervalDays = modelconfig.intervalDays,
            attrIntervalMonths = modelconfig.intervalMonths,
            dates = [],
            modelfunc, pushDate, i, prevDate, prevCount;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 657);
instance.clearMarkedDates(modellist && attrDate);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 658);
prevCount = YObject.size(instance._storedModelDates);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 659);
instance._storedModelDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 660);
if (modellist && attrDate) {
            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when
            // an easier configuration is used (probably most of the cases)
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 663);
if (!attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 664);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 664);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 665);
var modelDate = model.get(attrDate);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 666);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 667);
dates.push(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 668);
instance._storeModelDate(model, modelDate);
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 672);
if (attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 673);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 673);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 674);
var modelDate = model.get(attrDate),
                        modelEndDate = model.get(attrEnddate) || modelDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 676);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 677);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 678);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 680);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 681);
do {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 682);
dates.push(dateCopyObject(pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 683);
instance._storeModelDate(model, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 684);
dateAddDays(pushDate, 1);
                        }while (dayisGreaterOrEqual(modelEndDate, pushDate));
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 690);
if (!attrEnddate && attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 691);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 691);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 692);
var modelDate = model.get(attrDate),
                        modelCount = model.get(attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                        stepMinutes;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 699);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 700);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 701);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 703);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 704);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 706);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 707);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 709);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 710);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 712);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 713);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 715);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 716);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 717);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 719);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 720);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 721);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 722);
if (!dateEqualDays(pushDate, prevDate)) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 723);
dates.push(dateCopyObject(pushDate));
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 724);
instance._storeModelDate(model, pushDate);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 726);
dateCopyValues(pushDate, prevDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 727);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 728);
dateAddMinutes(pushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 730);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 731);
dateAddMonths(pushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 737);
if (attrEnddate && attrCount) {
                // Make pushDate a Date object, so we can copy Date-values to it
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 739);
pushDate = new Date(0);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 740);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 740);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 741);
var modelDate = model.get(attrDate),
                        modelEndDate = model.get(attrEnddate) || modelDate,
                        modelCount = model.get(attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                        stepMinutes, startPushDate, endPushDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 749);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 750);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 751);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 753);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 754);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 756);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 757);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 759);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 760);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 762);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 763);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 765);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 766);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 768);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 769);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 770);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 772);
startPushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 773);
endPushDate = dateCopyObject(modelEndDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 774);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 775);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 776);
dateCopyValues(startPushDate, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 777);
do {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 778);
if (dayisGreater(pushDate, prevDate)) {
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 779);
dates.push(dateCopyObject(pushDate));
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 780);
instance._storeModelDate(model, pushDate);
                                }
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 782);
dateAddDays(pushDate, 1);
                            }while (dayisGreaterOrEqual(endPushDate, pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 785);
dateCopyValues(pushDate, prevDate);
                            // correct prevDate --> because pushDate has been added 1 day that has not been handled
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 787);
dateAddDays(prevDate, -1);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 788);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 789);
dateAddMinutes(startPushDate, stepMinutes);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 790);
dateAddMinutes(endPushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 792);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 793);
dateAddMonths(startPushDate, modelIntervalMonths);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 794);
dateAddMonths(endPushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }}}}
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 800);
modellist.each(modelfunc);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 801);
instance.markDates(dates);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 802);
instance._fireSelectedModels();
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 805);
if (prevCount>0) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 806);
instance._fireSelectedModels();
            }
        }
    },

    /**
     * Stores the model in an internal object: _storedModelDates
     * _storedModelDates is used to retrieve the models when a date is selected. Every model could
     * mark multiple Dates in case they have an <i>interval</i> set and/or in case an <i>enddate</i> is available.
     *
     * @method _storeModelDate
     * @param {Y.Model} model The model to store
     * @param {Date} oDate The Date that the model should mark the Calendar
     * @private
     * @since 3.8.1
     */
    _storeModelDate : function(model, oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_storeModelDate", 822);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 823);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate();

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 828);
if (!hasKey(instance._storedModelDates, year)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 829);
instance._storedModelDates[year] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 831);
if (!hasKey(instance._storedModelDates[year], month)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 832);
instance._storedModelDates[year][month] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 834);
if (!hasKey(instance._storedModelDates[year][month], day)) {
            // define as an Array, NOT an object --> needs to be filled with Models
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 836);
instance._storedModelDates[year][month][day] = [];
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 838);
instance._storedModelDates[year][month][day].push(model);
    },

    /**
     * A utility method that fires the selected Models on a selectionChange event or when syncing the modelList.
     *
     * @method _fireSelectedModels
     * @param {eventTarget} [e] The eventTarget after a selectionChange
     * @private
     * @since 3.8.1
     */
    _fireSelectedModels : function (e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_fireSelectedModels", 849);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 850);
var instance = this;

        /**
         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is
         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Models] with all modelList's Models who match the selected date(s)
         * @since 3.8.1
        **/
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 859);
instance.fire("modelSelectionChange", {newModelSelection: instance._getSelectedModelList(e)});
    },

    /**
     * Retrieves the unique Models that are available in the selectedDates.
     *
     * @method _getSelectedModelList
     * @param {eventTarget} [e] The eventTarget after a selectionChange. When not provided, the attribute 'selectedDates' is taken.
     * @private
     * @protected
     * @return {Array} Unique list of Models that are present in selectedDates
     * @since 3.8.1
     */
    _getSelectedModelList : function(e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_getSelectedModelList", 872);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 873);
var instance = this,
            dateselection = (e && e.newSelection) || instance.get('selectedDates'),
            modelArray = [];

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 877);
YArray.each(
            dateselection,
            function(oDate) {
                // e.validateDate is undefined when comes from event --> in that case we always are sure
                // the array consist only Date-objects
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 3)", 879);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 882);
if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 883);
var year = oDate.getFullYear(),
                        month = oDate.getMonth(),
                        day = oDate.getDate(),
                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                        && instance._storedModelDates[year][month][day]) || [];
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 888);
YArray.each(
                        modelArrayDay,
                        function(model) {
                            _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 4)", 890);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 891);
if (YArray.indexOf(modelArray, model) === -1) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 892);
modelArray.push(model);
                            }
                        }
                    );
                }
            }
        );
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 899);
return modelArray;
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 904);
Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 906);
Y.Base.mix(Y.Calendar, [ITSACalendarModelList]);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "calendar-base",
        "model",
        "model-list",
        "datatype-date-math",
        "gallery-itsacalendarmarkeddates"
    ]
});
