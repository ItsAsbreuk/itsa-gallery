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
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].code=["YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {","","'use strict';","","/**"," * @module gallery-itsacalendarmarkeddates"," * @class ITSACalendarModelList"," * @since 3.8.1"," *"," * <i>Copyright (c) 2013 Its Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html","**/","","var Lang                = Y.Lang,","    YArray              = Y.Array,","    YObject             = Y.Object,","    hasKey              = YObject.hasKey,","    YDate               = Y.DataType.Date,","    dateIsValid         = YDate.isValidDate,","    dateCopyObject      = function (oDate) {","                              return new Date(oDate.getTime());","                          },","    dateCopyValues      = function (aDate, bDate) {","                              bDate.setTime(aDate.getTime());","                          },","    dateAddMinutes      = function (oDate, numMinutes) {","                              oDate.setTime(oDate.getTime() + 60000*numMinutes);","                          },","    dateAddMonths       = function (oDate, numMonths) {","                              var newYear = oDate.getFullYear(),","                                  newMonth = oDate.getMonth() + numMonths;","                              newYear  = Math.floor(newYear + newMonth / 12);","                              newMonth = (newMonth % 12 + 12) % 12;","                              oDate.setFullYear(newYear);","                              oDate.setMonth(newMonth);","                          },","    dateAddDays         = function (oDate, numDays) {","                              oDate.setTime(oDate.getTime() + 86400000*numDays);","                          },","    dateEqualDays       = function(aDate, bDate) {","                              return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                      && (aDate.getFullYear()===bDate.getFullYear()));","                          },","    dayisGreater        = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                          },","    dayisGreaterOrEqual = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) || dateEqualDays(aDate, bDate));","                          };","","function ITSACalendarModelList() {}","","ITSACalendarModelList.ATTRS = {","","    /**","     * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","     * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","     * @attribute modelList","     * @type {ModelList}","     * @default null","     * @since 3.8.1","     */","    modelList : {","        value: null,","        lazyAdd: false,","        validator: function(v){ return (v instanceof Y.ModelList) || v === null; },","        setter: '_setModelList'","    },","","    /**","     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b> attributes. These values are Strings and represent the attributenames","     * in the Models. The actual values (and its types) come form the Models itsself.","     *","     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.","     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,","     * by looking at the Models structure.","     *","     * @attribute modelConfig","     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>","     * @default null","     * @since 3.8.1","     */","    modelConfig: {","        value:      null,","        validator:  function(v){ return Lang.isObject(v) || v === null; },","        setter: '_setModelConfig'","    }","","};","","Y.mix(ITSACalendarModelList.prototype, {","","    /**","     * Internal subscriber to Calendar.after('selectionChange') events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _fireModelsEvent : null,","","    /**","     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _afterRenderEvent : null,","","    /**","     * Internal subscriber to Calendar.after('render') events","     *","     * @property _syncModelListEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _syncModelListEvent : null,","","    /**","     * Internal subscriber to modelList.after('*:change') events","     *","     * @property _syncModelListCheckEvent","     * @type EventHandle","     * @private","     * @since 3.8.1","     */","    _syncModelListCheckEvent : null,","","    /**","     * Internal flag that tells whether the attribute modelConfig is initiated.","     *","     * @property _modelConfigInitiated","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _modelConfigInitiated : false,","","    /**","     * Internal flag that tells whether the attribute modelList is initiated.","     *","     * @property _modelListInitiated","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _modelListInitiated : false,","","    /**","     * Internal flag that is used to check whether modelConfig is updated by an internal set('modelList').","     *","     * @property _internalUpdate","     * @type Boolean","     * @private","     * @since 3.8.1","     */","    _internalUpdate : false,","","","    /**","     * Designated initializer","     * Initializes instance-level properties of ITSACalendarModelList.","     *","     * @method initializer","     * @protected","     * @since 3.8.1","     */","    initializer : function () {","        var instance = this;","","        instance._fireModelsEvent = instance.after('selectionChange', instance._fireSelectedModels);","    },","","    /**","     * Returns an Array with the Models that fall with the specified Date-range.","     * If aDate is an Array, then the search will be inside this Array.","     * If aDate is a Date-Object then the search will go between the range aDate-bDate","     * (bDate included, when bDate is not specified, only aDate is taken)","     *","     * @method getModels","     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within","     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)","     * Will only be taken if aDate is a Date-object","     * @return {Array} Array with all unique Models that fall within the searchargument","     * @since 3.8.1","     */","    getModels : function (aDate, bDate) {","        var instance = this,","            returnModels = [],","            year, month, day, searchDay, modelArrayDay, useFunction;","","        if (Lang.isArray(aDate)) {","            returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});","        }","        else if (YDate.isValidDate(aDate)) {","            useFunction = function(model) {","                if (YArray.indexOf(returnModels, model) === -1) {","                    returnModels.push(model);","                }","            };","            if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {","                bDate = dateCopyObject(aDate);","            }","            searchDay = new Date(aDate.getTime());","            do {","                year = searchDay.getFullYear();","                month = searchDay.getMonth();","                day = searchDay.getDate();","                modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                && instance._storedModelDates[year][month][day]) || [];","                YArray.each(","                    modelArrayDay,","                    useFunction","                );","                dateAddDays(searchDay, 1);","            }","            while (!dayisGreater(searchDay, bDate));","        }","        return returnModels;","    },","","    /**","     * Returns whether a Date has any Models","     *","     * @method dateHasModels","     * @param {Date} oDate Date to be checked","     * @return {Boolean}","     * @since 3.8.1","     */","    dateHasModels : function (oDate) {","        var instance = this,","            storedModelDates = instance._storedModelDates,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],","            hasModels = (modelArray.length > 0);","","        return hasModels;","    },","","    /**","     * Returns an Array with the Models that fall in the specified <b>Date</b>.","     * <br />Sugar-method: the same as when calling the method getModels(oDate);","     *","     * @method getModelsInDate","     * @param {Date} oDate a Date-Object to search within.","     * @return {Array} Array with the Models within the specified Date","     * @since 3.8.1","     */","    getModelsInDate : function (oDate) {","        var instance = this;","","        return instance.getModels(oDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Week</b> specified by the Date-argument.","     *","     * @method getModelsInWeek","     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.","     * @return {Array} Array with the Models within the specified Week","     * @since 3.8.1","     */","    getModelsInWeek : function (oDate) {","        var instance = this,","            dayOfWeek = oDate.getDay(),","            aDate = dateCopyObject(oDate),","            bDate = dateCopyObject(oDate);","","        dateAddDays(aDate, -dayOfWeek);","        dateAddDays(bDate, 6-dayOfWeek);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Month</b> specified by the Date-argument.","     *","     * @method getModelsInMonth","     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.","     * @return {Array} Array with the Models within the specified Month","     * @since 3.8.1","     */","    getModelsInMonth : function (oDate) {","        var instance = this,","            aDate = dateCopyObject(oDate),","            bDate = YDate.addMonths(oDate, 1);","","        aDate.setDate(1);","        bDate.setDate(1);","        dateAddDays(bDate, -1);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Year</b>.","     *","     * @method getModelsInYear","     * @param {int} year The <b>Year</b> to search within.","     * @return {Array} Array with the Models within the specified Year","     * @since 3.8.1","     */","    getModelsInYear : function (year) {","        var instance = this,","            aDate = new Date(year, 0, 1),","            bDate = new Date(year, 11, 31);","","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Cleans up events","     *","     * @method destructor","     * @protected","     * @since 3.8.1","     */","    destructor: function () {","        var instance = this;","","        instance._clearSyncSubscriptionModelList();","        if (instance._fireModelsEvent) {","            instance._fireModelsEvent.detach();","        }","        if (instance._afterRenderEvent) {","            instance._afterRenderEvent.detach();","        }","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","     * Clears subscriptions _syncModelListEvent and _syncModelListCheckEvent","     *","     * @method _clearSyncSubscriptionModelList","     * @private","     * @since 3.8.1","     */","    _clearSyncSubscriptionModelList : function () {","        var instance = this;","","        if (instance._syncModelListEvent) {","            instance._syncModelListEvent.detach();","        }","        if (instance._syncModelListCheckEvent) {","            instance._syncModelListCheckEvent.detach();","        }","    },","","    /**","     * Setter when changing attribute modelConfig.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelConfig","     * @param {Object} val the new modelConfig","     * @private","     * @since 3.8.1","     */","    _setModelConfig : function (val) {","        var instance = this;","","        // do not sync at startup:","        if (instance._modelConfigInitiated && !instance._internalUpdate) {","            instance._syncModelList(null, null, val);","        }","        else {","            instance._modelConfigInitiated = true;","        }","    },","","    /**","     * Setter when changing attribute modelList.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelList","     * @param {ModelList} val the new modelList","     * @private","     * @since 3.8.1","     */","    _setModelList : function (val) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modeldateattr = modelconfig.date,","            firstModel, valid;","","        // search datefield when not available","        if (!modeldateattr && val && val.size()>0) {","            firstModel = val.item(0);","            YObject.some(","                firstModel.getAttrs(),","                function(val, key) {","                    valid = Lang.isDate(val);","                    if (valid) {","                        modeldateattr = key;","                    }","                    return valid;","                }","            );","            if (valid) {","                instance._internalUpdate = true;","                modelconfig.date = modeldateattr;","                instance.set('modelConfig', modelconfig);","                instance._internalUpdate = false;","            }","            else {","            }","        }","        instance._clearSyncSubscriptionModelList();","        if (val) {","            instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);","            instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);","        }","        // do not sync at startup:","        if (instance._modelListInitiated || val) {","            instance._syncModelList(null, val);","        }","        else {","            instance._modelListInitiated = true;","        }","    },","","    /**","     * Subscriber to this.modelList.after('*:change')","     * Might call _syncModelList, but only if the Models-attribute that is changed is one of these:","     * date, enddate, count, intervalMinutes, intervalHours, intervalDays or intervalMonths","     *","     * @method _checkSyncModelList","     * @param {EventTarget} e","     * @private","     * @since 3.8.1","     */","    _checkSyncModelList : function (e) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modelconfigDate = modelconfig.date || '',","            modelconfigEnddate = modelconfig.enddate || '',","            modelconfigCount = modelconfig.count || '',","            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',","            modelconfigIntervalHours = modelconfig.intervalHours || '',","            modelconfigIntervalDays = modelconfig.intervalDays || '',","            modelconfigIntervalMonths = modelconfig.intervalMonths || '';","        if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]","            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {","            if (instance.get('rendered')) {","                instance._doSyncModelList();","            }","            else {","                instance._afterRenderEvent = instance.after(","                    'render',","                    Y.bind(instance._doSyncModelList, instance)","                );","            }","        }","        else {","        }","    },","","    /**","     * Will call _doSyncModelList, but waits until the Calendar is rendered.","     *","     * @method _syncModelList","     * @param {EventTarget} e","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 3.8.1","     */","    _syncModelList : function (e, attrmodellist, attrmodelconfig) {","        var instance = this;","        if (instance.get('rendered')) {","            instance._doSyncModelList(attrmodellist, attrmodelconfig);","        }","        else {","            instance._afterRenderEvent = instance.after(","                'render',","                Y.bind(instance._doSyncModelList, instance, attrmodellist, attrmodelconfig)","            );","        }","    },","","    /**","     * Syncs the modelList with Calendar using the attributes defined in modelConfig.","     *","     * @method _doSyncModelList","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 3.8.1","     */","    _doSyncModelList : function (attrmodellist, attrmodelconfig) {","        var instance = this,","            modellist = attrmodellist || instance.get('modelList'),","            modelconfig = attrmodelconfig || instance.get('modelConfig') || {},","            attrDate = modelconfig.date,","            attrEnddate = modelconfig.enddate,","            attrCount = modelconfig.count,","            attrIntervalMinutes = modelconfig.intervalMinutes,","            attrIntervalHours = modelconfig.intervalHours,","            attrIntervalDays = modelconfig.intervalDays,","            attrIntervalMonths = modelconfig.intervalMonths,","            dates = [],","            modelfunc, pushDate, i, prevDate, prevCount;","","        instance.clearMarkedDates(modellist && attrDate);","        prevCount = YObject.size(instance._storedModelDates);","        instance._storedModelDates = {};","        if (modellist && attrDate) {","            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when","            // an easier configuration is used (probably most of the cases)","            if (!attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate);","                    if (dateIsValid(modelDate)) {","                        dates.push(modelDate);","                        instance._storeModelDate(model, modelDate);","                    }","                };","            }","            else if (attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelEndDate = model.get(attrEnddate) || modelDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        pushDate = dateCopyObject(modelDate);","                        do {","                            dates.push(dateCopyObject(pushDate));","                            instance._storeModelDate(model, pushDate);","                            dateAddDays(pushDate, 1);","                        }","                        while (dayisGreaterOrEqual(modelEndDate, pushDate));","                    }","                };","            }","            else if (!attrEnddate && attrCount) {","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelCount = model.get(attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),","                        stepMinutes;","                    if (dateIsValid(modelDate)) {","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        pushDate = dateCopyObject(modelDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            if (!dateEqualDays(pushDate, prevDate)) {","                                dates.push(dateCopyObject(pushDate));","                                instance._storeModelDate(model, pushDate);","                            }","                            dateCopyValues(pushDate, prevDate);","                            if (stepMinutes>0) {","                                dateAddMinutes(pushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(pushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            else if (attrEnddate && attrCount) {","                // Make pushDate a Date object, so we can copy Date-values to it","                pushDate = new Date(0);","                modelfunc = function(model) {","                    var modelDate = model.get(attrDate),","                        modelEndDate = model.get(attrEnddate) || modelDate,","                        modelCount = model.get(attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),","                        stepMinutes, startPushDate, endPushDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        startPushDate = dateCopyObject(modelDate);","                        endPushDate = dateCopyObject(modelEndDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            dateCopyValues(startPushDate, pushDate);","                            do {","                                if (dayisGreater(pushDate, prevDate)) {","                                    dates.push(dateCopyObject(pushDate));","                                    instance._storeModelDate(model, pushDate);","                                }","                                dateAddDays(pushDate, 1);","                            }","                            while (dayisGreaterOrEqual(endPushDate, pushDate));","                            dateCopyValues(pushDate, prevDate);","                            // correct prevDate --> because pushDate has been added 1 day that has not been handled","                            dateAddDays(prevDate, -1);","                            if (stepMinutes>0) {","                                dateAddMinutes(startPushDate, stepMinutes);","                                dateAddMinutes(endPushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(startPushDate, modelIntervalMonths);","                                dateAddMonths(endPushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            modellist.each(modelfunc);","            instance.markDates(dates);","            instance._fireSelectedModels();","        }","        else {","            if (prevCount>0) {","                instance._fireSelectedModels();","            }","        }","    },","","    /**","     * Stores the model in an internal object: _storedModelDates","     * _storedModelDates is used to retrieve the models when a date is selected. Every model could","     * mark multiple Dates in case they have an <i>interval</i> set and/or in case an <i>enddate</i> is available.","     *","     * @method _storeModelDate","     * @param {Y.Model} model The model to store","     * @param {Date} oDate The Date that the model should mark the Calendar","     * @private","     * @since 3.8.1","     */","    _storeModelDate : function(model, oDate) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate();","","        if (!hasKey(instance._storedModelDates, year)) {","            instance._storedModelDates[year] = {};","        }","        if (!hasKey(instance._storedModelDates[year], month)) {","            instance._storedModelDates[year][month] = {};","        }","        if (!hasKey(instance._storedModelDates[year][month], day)) {","            // define as an Array, NOT an object --> needs to be filled with Models","            instance._storedModelDates[year][month][day] = [];","        }","        instance._storedModelDates[year][month][day].push(model);","    },","","    /**","     * A utility method that fires the selected Models on a selectionChange event or when syncing the modelList.","     *","     * @method _fireSelectedModels","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 3.8.1","     */","    _fireSelectedModels : function (e) {","        var instance = this;","","        /**","         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is","         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Models] with all modelList's Models who match the selected date(s)","         * @since 3.8.1","        **/","        instance.fire(\"modelSelectionChange\", {newModelSelection: instance._getSelectedModelList(e)});","    },","","    /**","     * Retrieves the unique Models that are available in the selectedDates.","     *","     * @method _getSelectedModelList","     * @param {eventTarget} [e] The eventTarget after a selectionChange. When not provided, the attribute 'selectedDates' is taken.","     * @private","     * @protected","     * @return {Array} Unique list of Models that are present in selectedDates","     * @since 3.8.1","     */","    _getSelectedModelList : function(e) {","        var instance = this,","            dateselection = (e && e.newSelection) || instance.get('selectedDates'),","            modelArray = [];","","        YArray.each(","            dateselection,","            function(oDate) {","                // e.validateDate is undefined when comes from event --> in that case we always are sure","                // the array consist only Date-objects","                if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {","                    var year = oDate.getFullYear(),","                        month = oDate.getMonth(),","                        day = oDate.getDate(),","                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                        && instance._storedModelDates[year][month][day]) || [];","                    YArray.each(","                        modelArrayDay,","                        function(model) {","                            if (YArray.indexOf(modelArray, model) === -1) {","                                modelArray.push(model);","                            }","                        }","                    );","                }","            }","        );","        return modelArray;","    }","","}, true);","","Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;","","Y.Base.mix(Y.Calendar, [ITSACalendarModelList]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"calendar-base\",","        \"model\",","        \"model-list\",","        \"datatype-date-math\",","        \"gallery-itsacalendarmarkeddates\"","    ]","});"];
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].lines = {"1":0,"3":0,"14":0,"21":0,"24":0,"27":0,"30":0,"32":0,"33":0,"34":0,"35":0,"38":0,"41":0,"45":0,"48":0,"51":0,"53":0,"66":0,"87":0,"93":0,"175":0,"177":0,"194":0,"198":0,"199":0,"201":0,"202":0,"203":0,"204":0,"207":0,"208":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"217":0,"221":0,"225":0,"237":0,"245":0,"258":0,"260":0,"272":0,"277":0,"278":0,"279":0,"291":0,"295":0,"296":0,"297":0,"298":0,"310":0,"314":0,"325":0,"327":0,"328":0,"329":0,"331":0,"332":0,"348":0,"350":0,"351":0,"353":0,"354":0,"368":0,"371":0,"372":0,"375":0,"389":0,"395":0,"396":0,"397":0,"400":0,"401":0,"402":0,"404":0,"407":0,"408":0,"409":0,"410":0,"411":0,"416":0,"417":0,"418":0,"419":0,"422":0,"423":0,"426":0,"441":0,"450":0,"452":0,"453":0,"456":0,"479":0,"480":0,"481":0,"484":0,"503":0,"516":0,"517":0,"518":0,"519":0,"522":0,"523":0,"524":0,"525":0,"526":0,"527":0,"531":0,"532":0,"533":0,"535":0,"536":0,"537":0,"539":0,"540":0,"541":0,"542":0,"543":0,"549":0,"550":0,"551":0,"558":0,"559":0,"560":0,"562":0,"563":0,"565":0,"566":0,"568":0,"569":0,"571":0,"572":0,"574":0,"575":0,"576":0,"578":0,"579":0,"580":0,"581":0,"582":0,"583":0,"585":0,"586":0,"587":0,"589":0,"590":0,"596":0,"598":0,"599":0,"600":0,"608":0,"609":0,"610":0,"612":0,"613":0,"615":0,"616":0,"618":0,"619":0,"621":0,"622":0,"624":0,"625":0,"627":0,"628":0,"629":0,"631":0,"632":0,"633":0,"634":0,"635":0,"636":0,"637":0,"638":0,"639":0,"641":0,"644":0,"646":0,"647":0,"648":0,"649":0,"651":0,"652":0,"653":0,"659":0,"660":0,"661":0,"664":0,"665":0,"682":0,"687":0,"688":0,"690":0,"691":0,"693":0,"695":0,"697":0,"709":0,"718":0,"732":0,"736":0,"741":0,"742":0,"747":0,"750":0,"751":0,"758":0,"763":0,"765":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].functions = {"dateCopyObject:20":0,"dateCopyValues:23":0,"dateAddMinutes:26":0,"dateAddMonths:29":0,"dateAddDays:37":0,"dateEqualDays:40":0,"dayisGreater:44":0,"dayisGreaterOrEqual:47":0,"ITSACalendarModelList:51":0,"validator:66":0,"validator:87":0,"initializer:174":0,"useFunction:202":0,"getModels:193":0,"dateHasModels:236":0,"getModelsInDate:257":0,"getModelsInWeek:271":0,"getModelsInMonth:290":0,"getModelsInYear:309":0,"destructor:324":0,"_clearSyncSubscriptionModelList:347":0,"_setModelConfig:367":0,"(anonymous 2):399":0,"_setModelList:388":0,"_checkSyncModelList:440":0,"_syncModelList:478":0,"modelfunc:523":0,"modelfunc:532":0,"modelfunc:550":0,"modelfunc:599":0,"_doSyncModelList:502":0,"_storeModelDate:681":0,"_fireSelectedModels:708":0,"(anonymous 4):749":0,"(anonymous 3):738":0,"_getSelectedModelList:731":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredLines = 212;
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredFunctions = 37;
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 1);
YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 3);
'use strict';

/**
 * @module gallery-itsacalendarmarkeddates
 * @class ITSACalendarModelList
 * @since 3.8.1
 *
 * <i>Copyright (c) 2013 Its Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
**/

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 14);
var Lang                = Y.Lang,
    YArray              = Y.Array,
    YObject             = Y.Object,
    hasKey              = YObject.hasKey,
    YDate               = Y.DataType.Date,
    dateIsValid         = YDate.isValidDate,
    dateCopyObject      = function (oDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateCopyObject", 20);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 21);
return new Date(oDate.getTime());
                          },
    dateCopyValues      = function (aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateCopyValues", 23);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 24);
bDate.setTime(aDate.getTime());
                          },
    dateAddMinutes      = function (oDate, numMinutes) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddMinutes", 26);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 27);
oDate.setTime(oDate.getTime() + 60000*numMinutes);
                          },
    dateAddMonths       = function (oDate, numMonths) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddMonths", 29);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 30);
var newYear = oDate.getFullYear(),
                                  newMonth = oDate.getMonth() + numMonths;
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 32);
newYear  = Math.floor(newYear + newMonth / 12);
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 33);
newMonth = (newMonth % 12 + 12) % 12;
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 34);
oDate.setFullYear(newYear);
                              _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 35);
oDate.setMonth(newMonth);
                          },
    dateAddDays         = function (oDate, numDays) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateAddDays", 37);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 38);
oDate.setTime(oDate.getTime() + 86400000*numDays);
                          },
    dateEqualDays       = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateEqualDays", 40);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 41);
return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                      && (aDate.getFullYear()===bDate.getFullYear()));
                          },
    dayisGreater        = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dayisGreater", 44);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 45);
return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                          },
    dayisGreaterOrEqual = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dayisGreaterOrEqual", 47);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 48);
return (YDate.isGreater(aDate, bDate) || dateEqualDays(aDate, bDate));
                          };

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 51);
function ITSACalendarModelList() {}

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 53);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 66);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 66);
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
        validator:  function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 87);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 87);
return Lang.isObject(v) || v === null; },
        setter: '_setModelConfig'
    }

};

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 93);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "initializer", 174);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 175);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 177);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModels", 193);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 194);
var instance = this,
            returnModels = [],
            year, month, day, searchDay, modelArrayDay, useFunction;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 198);
if (Lang.isArray(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 199);
returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 201);
if (YDate.isValidDate(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 202);
useFunction = function(model) {
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "useFunction", 202);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 203);
if (YArray.indexOf(returnModels, model) === -1) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 204);
returnModels.push(model);
                }
            };
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 207);
if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 208);
bDate = dateCopyObject(aDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 210);
searchDay = new Date(aDate.getTime());
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 211);
do {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 212);
year = searchDay.getFullYear();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 213);
month = searchDay.getMonth();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 214);
day = searchDay.getDate();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 215);
modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                && instance._storedModelDates[year][month][day]) || [];
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 217);
YArray.each(
                    modelArrayDay,
                    useFunction
                );
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 221);
dateAddDays(searchDay, 1);
            }while (!dayisGreater(searchDay, bDate));
        }}
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 225);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateHasModels", 236);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 237);
var instance = this,
            storedModelDates = instance._storedModelDates,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],
            hasModels = (modelArray.length > 0);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 245);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInDate", 257);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 258);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 260);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInWeek", 271);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 272);
var instance = this,
            dayOfWeek = oDate.getDay(),
            aDate = dateCopyObject(oDate),
            bDate = dateCopyObject(oDate);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 277);
dateAddDays(aDate, -dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 278);
dateAddDays(bDate, 6-dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 279);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInMonth", 290);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 291);
var instance = this,
            aDate = dateCopyObject(oDate),
            bDate = YDate.addMonths(oDate, 1);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 295);
aDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 296);
bDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 297);
dateAddDays(bDate, -1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 298);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInYear", 309);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 310);
var instance = this,
            aDate = new Date(year, 0, 1),
            bDate = new Date(year, 11, 31);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 314);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "destructor", 324);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 325);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 327);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 328);
if (instance._fireModelsEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 329);
instance._fireModelsEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 331);
if (instance._afterRenderEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 332);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_clearSyncSubscriptionModelList", 347);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 348);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 350);
if (instance._syncModelListEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 351);
instance._syncModelListEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 353);
if (instance._syncModelListCheckEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 354);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelConfig", 367);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 368);
var instance = this;

        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 371);
if (instance._modelConfigInitiated && !instance._internalUpdate) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 372);
instance._syncModelList(null, null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 375);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelList", 388);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 389);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modeldateattr = modelconfig.date,
            firstModel, valid;

        // search datefield when not available
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 395);
if (!modeldateattr && val && val.size()>0) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 396);
firstModel = val.item(0);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 397);
YObject.some(
                firstModel.getAttrs(),
                function(val, key) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 2)", 399);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 400);
valid = Lang.isDate(val);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 401);
if (valid) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 402);
modeldateattr = key;
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 404);
return valid;
                }
            );
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 407);
if (valid) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 408);
instance._internalUpdate = true;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 409);
modelconfig.date = modeldateattr;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 410);
instance.set('modelConfig', modelconfig);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 411);
instance._internalUpdate = false;
            }
            else {
            }
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 416);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 417);
if (val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 418);
instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 419);
instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);
        }
        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 422);
if (instance._modelListInitiated || val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 423);
instance._syncModelList(null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 426);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_checkSyncModelList", 440);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 441);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modelconfigDate = modelconfig.date || '',
            modelconfigEnddate = modelconfig.enddate || '',
            modelconfigCount = modelconfig.count || '',
            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',
            modelconfigIntervalHours = modelconfig.intervalHours || '',
            modelconfigIntervalDays = modelconfig.intervalDays || '',
            modelconfigIntervalMonths = modelconfig.intervalMonths || '';
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 450);
if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]
            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 452);
if (instance.get('rendered')) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 453);
instance._doSyncModelList();
            }
            else {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 456);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_syncModelList", 478);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 479);
var instance = this;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 480);
if (instance.get('rendered')) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 481);
instance._doSyncModelList(attrmodellist, attrmodelconfig);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 484);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_doSyncModelList", 502);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 503);
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

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 516);
instance.clearMarkedDates(modellist && attrDate);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 517);
prevCount = YObject.size(instance._storedModelDates);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 518);
instance._storedModelDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 519);
if (modellist && attrDate) {
            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when
            // an easier configuration is used (probably most of the cases)
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 522);
if (!attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 523);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 523);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 524);
var modelDate = model.get(attrDate);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 525);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 526);
dates.push(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 527);
instance._storeModelDate(model, modelDate);
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 531);
if (attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 532);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 532);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 533);
var modelDate = model.get(attrDate),
                        modelEndDate = model.get(attrEnddate) || modelDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 535);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 536);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 537);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 539);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 540);
do {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 541);
dates.push(dateCopyObject(pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 542);
instance._storeModelDate(model, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 543);
dateAddDays(pushDate, 1);
                        }while (dayisGreaterOrEqual(modelEndDate, pushDate));
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 549);
if (!attrEnddate && attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 550);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 550);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 551);
var modelDate = model.get(attrDate),
                        modelCount = model.get(attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                        stepMinutes;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 558);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 559);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 560);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 562);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 563);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 565);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 566);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 568);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 569);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 571);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 572);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 574);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 575);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 576);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 578);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 579);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 580);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 581);
if (!dateEqualDays(pushDate, prevDate)) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 582);
dates.push(dateCopyObject(pushDate));
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 583);
instance._storeModelDate(model, pushDate);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 585);
dateCopyValues(pushDate, prevDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 586);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 587);
dateAddMinutes(pushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 589);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 590);
dateAddMonths(pushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 596);
if (attrEnddate && attrCount) {
                // Make pushDate a Date object, so we can copy Date-values to it
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 598);
pushDate = new Date(0);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 599);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 599);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 600);
var modelDate = model.get(attrDate),
                        modelEndDate = model.get(attrEnddate) || modelDate,
                        modelCount = model.get(attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                        stepMinutes, startPushDate, endPushDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 608);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 609);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 610);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 612);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 613);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 615);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 616);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 618);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 619);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 621);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 622);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 624);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 625);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 627);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 628);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 629);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 631);
startPushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 632);
endPushDate = dateCopyObject(modelEndDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 633);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 634);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 635);
dateCopyValues(startPushDate, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 636);
do {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 637);
if (dayisGreater(pushDate, prevDate)) {
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 638);
dates.push(dateCopyObject(pushDate));
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 639);
instance._storeModelDate(model, pushDate);
                                }
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 641);
dateAddDays(pushDate, 1);
                            }while (dayisGreaterOrEqual(endPushDate, pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 644);
dateCopyValues(pushDate, prevDate);
                            // correct prevDate --> because pushDate has been added 1 day that has not been handled
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 646);
dateAddDays(prevDate, -1);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 647);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 648);
dateAddMinutes(startPushDate, stepMinutes);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 649);
dateAddMinutes(endPushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 651);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 652);
dateAddMonths(startPushDate, modelIntervalMonths);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 653);
dateAddMonths(endPushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }}}}
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 659);
modellist.each(modelfunc);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 660);
instance.markDates(dates);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 661);
instance._fireSelectedModels();
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 664);
if (prevCount>0) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 665);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_storeModelDate", 681);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 682);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate();

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 687);
if (!hasKey(instance._storedModelDates, year)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 688);
instance._storedModelDates[year] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 690);
if (!hasKey(instance._storedModelDates[year], month)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 691);
instance._storedModelDates[year][month] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 693);
if (!hasKey(instance._storedModelDates[year][month], day)) {
            // define as an Array, NOT an object --> needs to be filled with Models
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 695);
instance._storedModelDates[year][month][day] = [];
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 697);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_fireSelectedModels", 708);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 709);
var instance = this;

        /**
         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is
         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Models] with all modelList's Models who match the selected date(s)
         * @since 3.8.1
        **/
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 718);
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
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_getSelectedModelList", 731);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 732);
var instance = this,
            dateselection = (e && e.newSelection) || instance.get('selectedDates'),
            modelArray = [];

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 736);
YArray.each(
            dateselection,
            function(oDate) {
                // e.validateDate is undefined when comes from event --> in that case we always are sure
                // the array consist only Date-objects
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 3)", 738);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 741);
if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 742);
var year = oDate.getFullYear(),
                        month = oDate.getMonth(),
                        day = oDate.getDate(),
                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                        && instance._storedModelDates[year][month][day]) || [];
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 747);
YArray.each(
                        modelArrayDay,
                        function(model) {
                            _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 4)", 749);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 750);
if (YArray.indexOf(modelArray, model) === -1) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 751);
modelArray.push(model);
                            }
                        }
                    );
                }
            }
        );
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 758);
return modelArray;
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 763);
Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 765);
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
