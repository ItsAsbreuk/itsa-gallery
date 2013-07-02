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
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].code=["YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {","","'use strict';","","/**"," * @module gallery-itsacalendarmarkeddates"," * @class ITSACalendarModelList"," * @since 0.3"," *"," * <i>Copyright (c) 2013 Its Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html","**/","","var Lang                = Y.Lang,","    YArray              = Y.Array,","    YObject             = Y.Object,","    hasKey              = YObject.hasKey,","    YDate               = Y.DataType.Date,","    dateIsValid         = YDate.isValidDate,","    dateCopyObject      = function (oDate) {","                              return new Date(oDate.getTime());","                          },","    dateCopyValues      = function (aDate, bDate) {","                              bDate.setTime(aDate.getTime());","                          },","    dateAddMinutes      = function (oDate, numMinutes) {","                              oDate.setTime(oDate.getTime() + 60000*numMinutes);","                          },","    dateAddMonths       = function (oDate, numMonths) {","                              var newYear = oDate.getFullYear(),","                                  newMonth = oDate.getMonth() + numMonths;","                              newYear  = Math.floor(newYear + newMonth / 12);","                              newMonth = (newMonth % 12 + 12) % 12;","                              oDate.setFullYear(newYear);","                              oDate.setMonth(newMonth);","                          },","    dateAddDays         = function (oDate, numDays) {","                              oDate.setTime(oDate.getTime() + 86400000*numDays);","                          },","    dateEqualDays       = function(aDate, bDate) {","                              return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                      && (aDate.getFullYear()===bDate.getFullYear()));","                          },","    dayisGreater        = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                          },","    dayisGreaterOrEqual = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) || dateEqualDays(aDate, bDate));","                          };","","//===============================================================================================","// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes","// We mix it to both Y.LazyModelList as well as Y.ModelList","// this way we can always call these methods regardsless of a ModelList or LazyModelList as used","//===============================================================================================","","function ITSAModellistAttrExtention() {}","","Y.mix(ITSAModellistAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                revivedModel = instance.revive(model);","                model[name] = value;","                if (revivedModel) {","                    //======================================================================================","                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530","                    //","                    revivedModel._set('clientId', model.clientId, {silent: true});","                    //","                    //======================================================================================","                    revivedModel.set(name, value, options);","                    instance.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","    }","","}, true);","","Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;","","Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);","","//==========================================================================================================","//","// Now the final extention","//","//==========================================================================================================","","function ITSACalendarModelList() {}","","ITSACalendarModelList.ATTRS = {","","    /**","     * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","     * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","     * @attribute modelList","     * @type {ModelList}","     * @default null","     * @since 0.3","     */","    modelList : {","        value: null,","        lazyAdd: false,","        validator: function(v){ return (v.getByClientId) || v === null; },","        setter: '_setModelList'","    },","","    /**","     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b> attributes. These values are Strings and represent the attributenames","     * in the Models. The actual values (and its types) come form the Models itsself.","     *","     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.","     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,","     * by looking at the Models structure.","     *","     * @attribute modelConfig","     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b> and <b>intervalMonths</b>","     * @default null","     * @since 0.3","     */","    modelConfig: {","        value:      null,","        validator:  function(v){ return Lang.isObject(v) || v === null; },","        setter: '_setModelConfig'","    }","","};","","Y.mix(ITSACalendarModelList.prototype, {","","    /**","     * Internal subscriber to Calendar.after('selectionChange') events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 0.3","     */","","    /**","     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events","     *","     * @property _fireMarkEvent","     * @type EventHandle","     * @private","     * @since 0.3","     */","","    /**","     * Internal subscriber to Calendar.after('render') events","     *","     * @property _syncModelListEvent","     * @type EventHandle","     * @private","     * @since 0.3","     */","","    /**","     * Internal subscriber to modelList.after('*:change') events","     *","     * @property _syncModelListCheckEvent","     * @type EventHandle","     * @private","     * @since 0.3","     */","","    /**","     * Internal flag that tells whether the attribute modelConfig is initiated.","     *","     * @property _modelConfigInitiated","     * @type Boolean","     * @private","     * @since 0.3","     */","","    /**","     * Internal flag that tells whether the attribute modelList is initiated.","     *","     * @property _modelListInitiated","     * @type Boolean","     * @private","     * @since 0.3","     */","","    /**","     * Internal flag that is used to check whether modelConfig is updated by an internal set('modelList').","     *","     * @property _internalUpdate","     * @type Boolean","     * @private","     * @since 0.3","     */","","    /**","     * Designated initializer","     * Initializes instance-level properties of ITSACalendarModelList.","     *","     * @method initializer","     * @protected","     * @since 0.3","     */","    initializer : function () {","        var instance = this;","","        instance._modelConfigInitiated = false;","        instance._modelListInitiated = false;","        instance._internalUpdate = false;","        instance._storedModelDates = {};","        instance._fireModelsEvent = instance.after('selectionChange', instance._fireSelectedModels);","    },","","    /**","     * Returns an Array with the Models that fall with the specified Date-range.","     * If aDate is an Array, then the search will be inside this Array.","     * If aDate is a Date-Object then the search will go between the range aDate-bDate","     * (bDate included, when bDate is not specified, only aDate is taken)","     *","     * @method getModels","     * @param {Date|Array} aDate the startDate, or an Array of Dates to search within","     * @param {Date} [bDate] The last Date to search within (in case of a range aDate-bDate)","     * Will only be taken if aDate is a Date-object","     * @return {Array} Array with all unique Models that fall within the searchargument","     * @since 0.3","     */","    getModels : function (aDate, bDate) {","        var instance = this,","            returnModels = [],","            year, month, day, searchDay, modelArrayDay, useFunction;","","        if (Lang.isArray(aDate)) {","            returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});","        }","        else if (YDate.isValidDate(aDate)) {","            useFunction = function(model) {","                if (YArray.indexOf(returnModels, model) === -1) {","                    returnModels.push(model);","                }","            };","            if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {","                bDate = dateCopyObject(aDate);","            }","            searchDay = new Date(aDate.getTime());","            do {","                year = searchDay.getFullYear();","                month = searchDay.getMonth();","                day = searchDay.getDate();","                modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                && instance._storedModelDates[year][month][day]) || [];","                YArray.each(","                    modelArrayDay,","                    useFunction","                );","                dateAddDays(searchDay, 1);","            }","            while (!dayisGreater(searchDay, bDate));","        }","        return returnModels;","    },","","    /**","     * Returns whether a Date has any Models","     *","     * @method dateHasModels","     * @param {Date} oDate Date to be checked","     * @return {Boolean}","     * @since 0.3","     */","    dateHasModels : function (oDate) {","        var instance = this,","            storedModelDates = instance._storedModelDates,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate(),","            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],","            hasModels = (modelArray.length > 0);","","        return hasModels;","    },","","    /**","     * Returns an Array with the Models that fall in the specified <b>Date</b>.","     * <br />Sugar-method: the same as when calling the method getModels(oDate);","     *","     * @method getModelsInDate","     * @param {Date} oDate a Date-Object to search within.","     * @return {Array} Array with the Models within the specified Date","     * @since 0.3","     */","    getModelsInDate : function (oDate) {","        var instance = this;","","        return instance.getModels(oDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Week</b> specified by the Date-argument.","     *","     * @method getModelsInWeek","     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.","     * @return {Array} Array with the Models within the specified Week","     * @since 0.3","     */","    getModelsInWeek : function (oDate) {","        var instance = this,","            dayOfWeek = oDate.getDay(),","            aDate = dateCopyObject(oDate),","            bDate = dateCopyObject(oDate);","","        dateAddDays(aDate, -dayOfWeek);","        dateAddDays(bDate, 6-dayOfWeek);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Month</b> specified by the Date-argument.","     *","     * @method getModelsInMonth","     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.","     * @return {Array} Array with the Models within the specified Month","     * @since 0.3","     */","    getModelsInMonth : function (oDate) {","        var instance = this,","            aDate = dateCopyObject(oDate),","            bDate = YDate.addMonths(oDate, 1);","","        aDate.setDate(1);","        bDate.setDate(1);","        dateAddDays(bDate, -1);","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Returns an Array with the Models that fall with the <b>Year</b>.","     *","     * @method getModelsInYear","     * @param {int} year The <b>Year</b> to search within.","     * @return {Array} Array with the Models within the specified Year","     * @since 0.3","     */","    getModelsInYear : function (year) {","        var instance = this,","            aDate = new Date(year, 0, 1),","            bDate = new Date(year, 11, 31);","","        return instance.getModels(aDate, bDate);","    },","","    /**","     * Cleans up events","     *","     * @method destructor","     * @protected","     * @since 0.3","     */","    destructor: function () {","        var instance = this;","","        instance._clearSyncSubscriptionModelList();","        if (instance._fireModelsEvent) {","            instance._fireModelsEvent.detach();","        }","        if (instance._afterRenderEvent) {","            instance._afterRenderEvent.detach();","        }","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","     * Clears subscriptions _syncModelListEvent and _syncModelListCheckEvent","     *","     * @method _clearSyncSubscriptionModelList","     * @private","     * @since 0.3","     */","    _clearSyncSubscriptionModelList : function () {","        var instance = this;","","        if (instance._syncModelListEvent) {","            instance._syncModelListEvent.detach();","        }","        if (instance._syncModelListCheckEvent) {","            instance._syncModelListCheckEvent.detach();","        }","    },","","    /**","     * Setter when changing attribute modelConfig.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelConfig","     * @param {Object} val the new modelConfig","     * @private","     * @since 0.3","     */","    _setModelConfig : function (val) {","        var instance = this;","","        // do not sync at startup:","        if (instance._modelConfigInitiated && !instance._internalUpdate) {","            instance._syncModelList(null, null, val);","        }","        else {","            instance._modelConfigInitiated = true;","        }","    },","","    /**","     * Setter when changing attribute modelList.","     * Will sync the ModelList with the Calendar.","     *","     * @method _setModelList","     * @param {ModelList} val the new modelList","     * @private","     * @since 0.3","     */","    _setModelList : function (val) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modeldateattr = modelconfig.date,","            firstModel, valid;","","        // search datefield when not available","        if (!modeldateattr && val && val.size()>0) {","            firstModel = val.item(0);","            YObject.some(","                firstModel.getAttrs(),","                function(val, key) {","                    valid = Lang.isDate(val);","                    if (valid) {","                        modeldateattr = key;","                    }","                    return valid;","                }","            );","            if (valid) {","                instance._internalUpdate = true;","                modelconfig.date = modeldateattr;","                instance.set('modelConfig', modelconfig);","                instance._internalUpdate = false;","            }","            else {","            }","        }","        instance._clearSyncSubscriptionModelList();","        if (val) {","            instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);","            instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);","        }","        // do not sync at startup:","        if (instance._modelListInitiated || val) {","            instance._syncModelList(null, val);","        }","        else {","            instance._modelListInitiated = true;","        }","    },","","    /**","     * Subscriber to this.modelList.after('*:change')","     * Might call _syncModelList, but only if the Models-attribute that is changed is one of these:","     * date, enddate, count, intervalMinutes, intervalHours, intervalDays or intervalMonths","     *","     * @method _checkSyncModelList","     * @param {EventTarget} e","     * @private","     * @since 0.3","     */","    _checkSyncModelList : function (e) {","        var instance = this,","            modelconfig = instance.get('modelConfig') || {},","            modelconfigDate = modelconfig.date || '',","            modelconfigEnddate = modelconfig.enddate || '',","            modelconfigCount = modelconfig.count || '',","            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',","            modelconfigIntervalHours = modelconfig.intervalHours || '',","            modelconfigIntervalDays = modelconfig.intervalDays || '',","            modelconfigIntervalMonths = modelconfig.intervalMonths || '';","        if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]","            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {","            if (instance.get('rendered')) {","                instance._doSyncModelList();","            }","            else {","                instance._afterRenderEvent = instance.after(","                    'render',","                    Y.bind(instance._doSyncModelList, instance)","                );","            }","        }","        else {","        }","    },","","    /**","     * Will call _doSyncModelList, but waits until the Calendar is rendered.","     *","     * @method _syncModelList","     * @param {EventTarget} e","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 0.3","     */","    _syncModelList : function (e, attrmodellist, attrmodelconfig) {","        var instance = this;","        if (instance.get('rendered')) {","            instance._doSyncModelList(attrmodellist, attrmodelconfig);","        }","        else {","            instance._afterRenderEvent = instance.after(","                'render',","                Y.bind(instance._doSyncModelList, instance, attrmodellist, attrmodelconfig)","            );","        }","    },","","    /**","     * Syncs the modelList with Calendar using the attributes defined in modelConfig.","     *","     * @method _doSyncModelList","     * @param {EventTarget} [attrmodellist] for internal use: when coming from _setModelList","     * it holds the new value for modelList","     * @param {EventTarget} [attrmodelconfig] for internal use: when coming from _setModelConfig","     * it holds the new value for modelConfig","     * @private","     * @since 0.3","     */","    _doSyncModelList : function (attrmodellist, attrmodelconfig) {","        var instance = this,","            modellist = attrmodellist || instance.get('modelList'),","            modelconfig = attrmodelconfig || instance.get('modelConfig') || {},","            attrDate = modelconfig && modelconfig.date,","            attrEnddate = modelconfig && modelconfig.enddate,","            attrCount = modelconfig && modelconfig.count,","            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,","            attrIntervalHours = modelconfig && modelconfig.intervalHours,","            attrIntervalDays = modelconfig && modelconfig.intervalDays,","            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,","            dates = [],","            modelfunc, pushDate, i, prevDate, prevCount;","","        instance.clearMarkedDates(modellist && attrDate);","        prevCount = YObject.size(instance._storedModelDates);","        instance._storedModelDates = {};","        if (modellist && attrDate) {","            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when","            // an easier configuration is used (probably most of the cases)","            if (!attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = modellist.getModelAttr(model, attrDate);","                    if (dateIsValid(modelDate)) {","                        dates.push(modelDate);","                        instance._storeModelDate(model, modelDate);","                    }","                };","            }","            else if (attrEnddate && !attrCount) {","                modelfunc = function(model) {","                    var modelDate = modellist.getModelAttr(model, attrDate),","                        modelEndDate = modellist.getModelAttr(model, attrEnddate) || modelDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        pushDate = dateCopyObject(modelDate);","                        do {","                            dates.push(dateCopyObject(pushDate));","                            instance._storeModelDate(model, pushDate);","                            dateAddDays(pushDate, 1);","                        }","                        while (dayisGreaterOrEqual(modelEndDate, pushDate));","                    }","                };","            }","            else if (!attrEnddate && attrCount) {","                modelfunc = function(model) {","                    var modelDate = modellist.getModelAttr(model, attrDate),","                        modelCount = modellist.getModelAttr(model, attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && modellist.getModelAttr(model, attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && modellist.getModelAttr(model, attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && modellist.getModelAttr(model, attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && modellist.getModelAttr(model, attrIntervalMonths)),","                        stepMinutes;","                    if (dateIsValid(modelDate)) {","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        pushDate = dateCopyObject(modelDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            if (!dateEqualDays(pushDate, prevDate)) {","                                dates.push(dateCopyObject(pushDate));","                                instance._storeModelDate(model, pushDate);","                            }","                            dateCopyValues(pushDate, prevDate);","                            if (stepMinutes>0) {","                                dateAddMinutes(pushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(pushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            else if (attrEnddate && attrCount) {","                // Make pushDate a Date object, so we can copy Date-values to it","                pushDate = new Date(0);","                modelfunc = function(model) {","                    var modelDate = modellist.getModelAttr(model, attrDate),","                        modelEndDate = modellist.getModelAttr(model, attrEnddate) || modelDate,","                        modelCount = modellist.getModelAttr(model, attrCount) || 1,","                        modelIntervalMinutes = (attrIntervalMinutes && modellist.getModelAttr(model, attrIntervalMinutes)),","                        modelIntervalHours = (attrIntervalHours && modellist.getModelAttr(model, attrIntervalHours)),","                        modelIntervalDays = (attrIntervalDays && modellist.getModelAttr(model, attrIntervalDays)),","                        modelIntervalMonths = (attrIntervalMonths && modellist.getModelAttr(model, attrIntervalMonths)),","                        stepMinutes, startPushDate, endPushDate;","                    if (dateIsValid(modelDate)) {","                        if (!dateIsValid(modelEndDate)) {","                            modelEndDate = modelDate;","                        }","                        if (!Lang.isNumber(modelCount)) {","                            modelCount = 1;","                        }","                        if (!Lang.isNumber(modelIntervalMinutes)) {","                            modelIntervalMinutes = 0;","                        }","                        if (!Lang.isNumber(modelIntervalHours)) {","                            modelIntervalHours = 0;","                        }","                        if (!Lang.isNumber(modelIntervalDays)) {","                            modelIntervalDays = 0;","                        }","                        if (!Lang.isNumber(modelIntervalMonths)) {","                            modelIntervalMonths = 0;","                        }","                        stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                        if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                            stepMinutes = 1440;","                        }","                        startPushDate = dateCopyObject(modelDate);","                        endPushDate = dateCopyObject(modelEndDate);","                        prevDate = new Date(0);","                        for (i=0; i<modelCount; i++) {","                            dateCopyValues(startPushDate, pushDate);","                            do {","                                if (dayisGreater(pushDate, prevDate)) {","                                    dates.push(dateCopyObject(pushDate));","                                    instance._storeModelDate(model, pushDate);","                                }","                                dateAddDays(pushDate, 1);","                            }","                            while (dayisGreaterOrEqual(endPushDate, pushDate));","                            dateCopyValues(pushDate, prevDate);","                            // correct prevDate --> because pushDate has been added 1 day that has not been handled","                            dateAddDays(prevDate, -1);","                            if (stepMinutes>0) {","                                dateAddMinutes(startPushDate, stepMinutes);","                                dateAddMinutes(endPushDate, stepMinutes);","                            }","                            if (modelIntervalMonths>0) {","                                dateAddMonths(startPushDate, modelIntervalMonths);","                                dateAddMonths(endPushDate, modelIntervalMonths);","                            }","                        }","                    }","                };","            }","            modellist.each(modelfunc);","            instance.markDates(dates);","            instance._fireSelectedModels();","        }","        else {","            if (prevCount>0) {","                instance._fireSelectedModels();","            }","        }","    },","","    /**","     * Stores the model in an internal object: _storedModelDates","     * _storedModelDates is used to retrieve the models when a date is selected. Every model could","     * mark multiple Dates in case they have an <i>interval</i> set and/or in case an <i>enddate</i> is available.","     *","     * @method _storeModelDate","     * @param {Y.Model} model The model to store","     * @param {Date} oDate The Date that the model should mark the Calendar","     * @private","     * @since 0.3","     */","    _storeModelDate : function(model, oDate) {","        var instance = this,","            year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate();","","        if (!hasKey(instance._storedModelDates, year)) {","            instance._storedModelDates[year] = {};","        }","        if (!hasKey(instance._storedModelDates[year], month)) {","            instance._storedModelDates[year][month] = {};","        }","        if (!hasKey(instance._storedModelDates[year][month], day)) {","            // define as an Array, NOT an object --> needs to be filled with Models","            instance._storedModelDates[year][month][day] = [];","        }","        instance._storedModelDates[year][month][day].push(model);","    },","","    /**","     * A utility method that fires the selected Models on a selectionChange event or when syncing the modelList.","     *","     * @method _fireSelectedModels","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.3","     */","    _fireSelectedModels : function (e) {","        var instance = this;","","        /**","         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is","         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Model] with all modelList's unique original Models that are selected.","         * @param {Array} selectedDates contains [Date] with all selected Dates (passed through by the Calendar-instance)","         * @since 0.3","        **/","","        instance.fire(\"modelSelectionChange\", {","            newModelSelection: instance._getSelectedModelList(e),","            selectedDates: (e && e.newSelection) || instance.get('selectedDates')","        });","    },","","    /**","     * Retrieves the unique Models that are available in the selectedDates.","     *","     * @method _getSelectedModelList","     * @param {eventTarget} [e] The eventTarget after a selectionChange. When not provided, the attribute 'selectedDates' is taken.","     * @private","     * @protected","     * @return {Array} Unique list of Models that are present in selectedDates","     * @since 0.3","     */","    _getSelectedModelList : function(e) {","        var instance = this,","            dateselection = (e && e.newSelection) || instance.get('selectedDates'),","            modelArray = [];","","        YArray.each(","            dateselection,","            function(oDate) {","                // e.validateDate is undefined when comes from event --> in that case we always are sure","                // the array consist only Date-objects","                if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {","                    var year = oDate.getFullYear(),","                        month = oDate.getMonth(),","                        day = oDate.getDate(),","                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]","                                        && instance._storedModelDates[year][month][day]) || [];","                    YArray.each(","                        modelArrayDay,","                        function(model) {","                            if (YArray.indexOf(modelArray, model) === -1) {","                                modelArray.push(model);","                            }","                        }","                    );","                }","            }","        );","        return modelArray;","    }","","}, true);","","Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;","","Y.Base.mix(Y.Calendar, [ITSACalendarModelList]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"calendar-base\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\",","        \"datatype-date-math\",","        \"gallery-itsacalendarmarkeddates\"","    ]","});"];
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].lines = {"1":0,"3":0,"14":0,"21":0,"24":0,"27":0,"30":0,"32":0,"33":0,"34":0,"35":0,"38":0,"41":0,"45":0,"48":0,"57":0,"59":0,"73":0,"94":0,"97":0,"98":0,"99":0,"100":0,"101":0,"102":0,"106":0,"109":0,"110":0,"114":0,"131":0,"136":0,"138":0,"146":0,"148":0,"161":0,"182":0,"188":0,"262":0,"264":0,"265":0,"266":0,"267":0,"268":0,"285":0,"289":0,"290":0,"292":0,"293":0,"294":0,"295":0,"298":0,"299":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"308":0,"312":0,"316":0,"328":0,"336":0,"349":0,"351":0,"363":0,"368":0,"369":0,"370":0,"382":0,"386":0,"387":0,"388":0,"389":0,"401":0,"405":0,"416":0,"418":0,"419":0,"420":0,"422":0,"423":0,"439":0,"441":0,"442":0,"444":0,"445":0,"459":0,"462":0,"463":0,"466":0,"480":0,"486":0,"487":0,"488":0,"491":0,"492":0,"493":0,"495":0,"498":0,"499":0,"500":0,"501":0,"502":0,"507":0,"508":0,"509":0,"510":0,"513":0,"514":0,"517":0,"532":0,"541":0,"543":0,"544":0,"547":0,"570":0,"571":0,"572":0,"575":0,"594":0,"607":0,"608":0,"609":0,"610":0,"613":0,"614":0,"615":0,"616":0,"617":0,"618":0,"622":0,"623":0,"624":0,"626":0,"627":0,"628":0,"630":0,"631":0,"632":0,"633":0,"634":0,"640":0,"641":0,"642":0,"649":0,"650":0,"651":0,"653":0,"654":0,"656":0,"657":0,"659":0,"660":0,"662":0,"663":0,"665":0,"666":0,"667":0,"669":0,"670":0,"671":0,"672":0,"673":0,"674":0,"676":0,"677":0,"678":0,"680":0,"681":0,"687":0,"689":0,"690":0,"691":0,"699":0,"700":0,"701":0,"703":0,"704":0,"706":0,"707":0,"709":0,"710":0,"712":0,"713":0,"715":0,"716":0,"718":0,"719":0,"720":0,"722":0,"723":0,"724":0,"725":0,"726":0,"727":0,"728":0,"729":0,"730":0,"732":0,"735":0,"737":0,"738":0,"739":0,"740":0,"742":0,"743":0,"744":0,"750":0,"751":0,"752":0,"755":0,"756":0,"773":0,"778":0,"779":0,"781":0,"782":0,"784":0,"786":0,"788":0,"800":0,"811":0,"828":0,"832":0,"837":0,"838":0,"843":0,"846":0,"847":0,"854":0,"859":0,"861":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].functions = {"dateCopyObject:20":0,"dateCopyValues:23":0,"dateAddMinutes:26":0,"dateAddMonths:29":0,"dateAddDays:37":0,"dateEqualDays:40":0,"dayisGreater:44":0,"dayisGreaterOrEqual:47":0,"ITSAModellistAttrExtention:57":0,"getModelAttr:72":0,"setModelAttr:93":0,"getModelToJSON:130":0,"ITSACalendarModelList:146":0,"validator:161":0,"validator:182":0,"initializer:261":0,"useFunction:293":0,"getModels:284":0,"dateHasModels:327":0,"getModelsInDate:348":0,"getModelsInWeek:362":0,"getModelsInMonth:381":0,"getModelsInYear:400":0,"destructor:415":0,"_clearSyncSubscriptionModelList:438":0,"_setModelConfig:458":0,"(anonymous 2):490":0,"_setModelList:479":0,"_checkSyncModelList:531":0,"_syncModelList:569":0,"modelfunc:614":0,"modelfunc:623":0,"modelfunc:641":0,"modelfunc:690":0,"_doSyncModelList:593":0,"_storeModelDate:772":0,"_fireSelectedModels:799":0,"(anonymous 4):845":0,"(anonymous 3):834":0,"_getSelectedModelList:827":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredLines = 233;
_yuitest_coverage["build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js"].coveredFunctions = 41;
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 1);
YUI.add('gallery-itsacalendarmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 3);
'use strict';

/**
 * @module gallery-itsacalendarmarkeddates
 * @class ITSACalendarModelList
 * @since 0.3
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

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 57);
function ITSAModellistAttrExtention() {}

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 59);
Y.mix(ITSAModellistAttrExtention.prototype, {

    /**
     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     *
     * @method getModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {String} name Attribute name or object property path.
     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
     * @since 0.1
     *
    */
    getModelAttr: function(model, name) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelAttr", 72);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 73);
return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);
    },

    /**
     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way
     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,
     * it will return lazy afterwards.
     *
     * @method setModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {String} name Attribute name or object property path.
     * @param {any} value Value to set.
     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.
     * In case of Lazy-Model, this only has effect when 'revive' is true.
     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.
     * @since 0.1
     *
    */
    setModelAttr: function(model, name, value, options) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "setModelAttr", 93);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 94);
var instance = this,
            modelIsLazy, revivedModel;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 97);
if (model) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 98);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 99);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 100);
revivedModel = instance.revive(model);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 101);
model[name] = value;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 102);
if (revivedModel) {
                    //======================================================================================
                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530
                    //
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 106);
revivedModel._set('clientId', model.clientId, {silent: true});
                    //
                    //======================================================================================
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 109);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 110);
instance.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 114);
model.set(name, value, options);
            }
        }
    },

    /**
     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList
     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not
     * -in case of an object from a LazyModelList- than you get the reference to the original object.
     *
     * @method getModelToJSON
     * @param {Y.Model} model Model or Object from the (Lazy)ModelList
     * @return {Object} Object or model.toJSON()
     * @since 0.1
     *
    */
    getModelToJSON : function(model) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelToJSON", 130);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 131);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 136);
Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 138);
Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);

//==========================================================================================================
//
// Now the final extention
//
//==========================================================================================================

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 146);
function ITSACalendarModelList() {}

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 148);
ITSACalendarModelList.ATTRS = {

    /**
     * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model
     * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.
     * @attribute modelList
     * @type {ModelList}
     * @default null
     * @since 0.3
     */
    modelList : {
        value: null,
        lazyAdd: false,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 161);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 161);
return (v.getByClientId) || v === null; },
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
     * @since 0.3
     */
    modelConfig: {
        value:      null,
        validator:  function(v){ _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "validator", 182);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 182);
return Lang.isObject(v) || v === null; },
        setter: '_setModelConfig'
    }

};

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 188);
Y.mix(ITSACalendarModelList.prototype, {

    /**
     * Internal subscriber to Calendar.after('selectionChange') events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 0.3
     */

    /**
     * Internal subscriber to Calendar.after(['dateChange', 'markChange']) events
     *
     * @property _fireMarkEvent
     * @type EventHandle
     * @private
     * @since 0.3
     */

    /**
     * Internal subscriber to Calendar.after('render') events
     *
     * @property _syncModelListEvent
     * @type EventHandle
     * @private
     * @since 0.3
     */

    /**
     * Internal subscriber to modelList.after('*:change') events
     *
     * @property _syncModelListCheckEvent
     * @type EventHandle
     * @private
     * @since 0.3
     */

    /**
     * Internal flag that tells whether the attribute modelConfig is initiated.
     *
     * @property _modelConfigInitiated
     * @type Boolean
     * @private
     * @since 0.3
     */

    /**
     * Internal flag that tells whether the attribute modelList is initiated.
     *
     * @property _modelListInitiated
     * @type Boolean
     * @private
     * @since 0.3
     */

    /**
     * Internal flag that is used to check whether modelConfig is updated by an internal set('modelList').
     *
     * @property _internalUpdate
     * @type Boolean
     * @private
     * @since 0.3
     */

    /**
     * Designated initializer
     * Initializes instance-level properties of ITSACalendarModelList.
     *
     * @method initializer
     * @protected
     * @since 0.3
     */
    initializer : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "initializer", 261);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 262);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 264);
instance._modelConfigInitiated = false;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 265);
instance._modelListInitiated = false;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 266);
instance._internalUpdate = false;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 267);
instance._storedModelDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 268);
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
     * @since 0.3
     */
    getModels : function (aDate, bDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModels", 284);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 285);
var instance = this,
            returnModels = [],
            year, month, day, searchDay, modelArrayDay, useFunction;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 289);
if (Lang.isArray(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 290);
returnModels = instance._getSelectedModelList({newSelection: aDate, validateDate: true});
        }
        else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 292);
if (YDate.isValidDate(aDate)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 293);
useFunction = function(model) {
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "useFunction", 293);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 294);
if (YArray.indexOf(returnModels, model) === -1) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 295);
returnModels.push(model);
                }
            };
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 298);
if (!YDate.isValidDate(bDate) || dayisGreater(aDate, bDate)) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 299);
bDate = dateCopyObject(aDate);
            }
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 301);
searchDay = new Date(aDate.getTime());
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 302);
do {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 303);
year = searchDay.getFullYear();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 304);
month = searchDay.getMonth();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 305);
day = searchDay.getDate();
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 306);
modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                && instance._storedModelDates[year][month][day]) || [];
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 308);
YArray.each(
                    modelArrayDay,
                    useFunction
                );
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 312);
dateAddDays(searchDay, 1);
            }while (!dayisGreater(searchDay, bDate));
        }}
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 316);
return returnModels;
    },

    /**
     * Returns whether a Date has any Models
     *
     * @method dateHasModels
     * @param {Date} oDate Date to be checked
     * @return {Boolean}
     * @since 0.3
     */
    dateHasModels : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "dateHasModels", 327);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 328);
var instance = this,
            storedModelDates = instance._storedModelDates,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate(),
            modelArray = (storedModelDates[year] && storedModelDates[year][month] && storedModelDates[year][month][day]) || [],
            hasModels = (modelArray.length > 0);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 336);
return hasModels;
    },

    /**
     * Returns an Array with the Models that fall in the specified <b>Date</b>.
     * <br />Sugar-method: the same as when calling the method getModels(oDate);
     *
     * @method getModelsInDate
     * @param {Date} oDate a Date-Object to search within.
     * @return {Array} Array with the Models within the specified Date
     * @since 0.3
     */
    getModelsInDate : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInDate", 348);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 349);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 351);
return instance.getModels(oDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Week</b> specified by the Date-argument.
     *
     * @method getModelsInWeek
     * @param {Date} oDate a Date-Object that determines the <b>Week</b> to search within.
     * @return {Array} Array with the Models within the specified Week
     * @since 0.3
     */
    getModelsInWeek : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInWeek", 362);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 363);
var instance = this,
            dayOfWeek = oDate.getDay(),
            aDate = dateCopyObject(oDate),
            bDate = dateCopyObject(oDate);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 368);
dateAddDays(aDate, -dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 369);
dateAddDays(bDate, 6-dayOfWeek);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 370);
return instance.getModels(aDate, bDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Month</b> specified by the Date-argument.
     *
     * @method getModelsInMonth
     * @param {Date} oDate a Date-Object that determines the <b>Month</b> to search within.
     * @return {Array} Array with the Models within the specified Month
     * @since 0.3
     */
    getModelsInMonth : function (oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInMonth", 381);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 382);
var instance = this,
            aDate = dateCopyObject(oDate),
            bDate = YDate.addMonths(oDate, 1);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 386);
aDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 387);
bDate.setDate(1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 388);
dateAddDays(bDate, -1);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 389);
return instance.getModels(aDate, bDate);
    },

    /**
     * Returns an Array with the Models that fall with the <b>Year</b>.
     *
     * @method getModelsInYear
     * @param {int} year The <b>Year</b> to search within.
     * @return {Array} Array with the Models within the specified Year
     * @since 0.3
     */
    getModelsInYear : function (year) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "getModelsInYear", 400);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 401);
var instance = this,
            aDate = new Date(year, 0, 1),
            bDate = new Date(year, 11, 31);

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 405);
return instance.getModels(aDate, bDate);
    },

    /**
     * Cleans up events
     *
     * @method destructor
     * @protected
     * @since 0.3
     */
    destructor: function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "destructor", 415);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 416);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 418);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 419);
if (instance._fireModelsEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 420);
instance._fireModelsEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 422);
if (instance._afterRenderEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 423);
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
     * @since 0.3
     */
    _clearSyncSubscriptionModelList : function () {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_clearSyncSubscriptionModelList", 438);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 439);
var instance = this;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 441);
if (instance._syncModelListEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 442);
instance._syncModelListEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 444);
if (instance._syncModelListCheckEvent) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 445);
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
     * @since 0.3
     */
    _setModelConfig : function (val) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelConfig", 458);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 459);
var instance = this;

        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 462);
if (instance._modelConfigInitiated && !instance._internalUpdate) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 463);
instance._syncModelList(null, null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 466);
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
     * @since 0.3
     */
    _setModelList : function (val) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_setModelList", 479);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 480);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modeldateattr = modelconfig.date,
            firstModel, valid;

        // search datefield when not available
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 486);
if (!modeldateattr && val && val.size()>0) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 487);
firstModel = val.item(0);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 488);
YObject.some(
                firstModel.getAttrs(),
                function(val, key) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 2)", 490);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 491);
valid = Lang.isDate(val);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 492);
if (valid) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 493);
modeldateattr = key;
                    }
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 495);
return valid;
                }
            );
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 498);
if (valid) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 499);
instance._internalUpdate = true;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 500);
modelconfig.date = modeldateattr;
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 501);
instance.set('modelConfig', modelconfig);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 502);
instance._internalUpdate = false;
            }
            else {
            }
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 507);
instance._clearSyncSubscriptionModelList();
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 508);
if (val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 509);
instance._syncModelListEvent = val.after(['add', 'remove', 'reset'], instance._syncModelList, instance);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 510);
instance._syncModelListCheckEvent = val.after('*:change', instance._checkSyncModelList, instance);
        }
        // do not sync at startup:
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 513);
if (instance._modelListInitiated || val) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 514);
instance._syncModelList(null, val);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 517);
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
     * @since 0.3
     */
    _checkSyncModelList : function (e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_checkSyncModelList", 531);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 532);
var instance = this,
            modelconfig = instance.get('modelConfig') || {},
            modelconfigDate = modelconfig.date || '',
            modelconfigEnddate = modelconfig.enddate || '',
            modelconfigCount = modelconfig.count || '',
            modelconfigIntervalMinutes = modelconfig.intervalMinutes || '',
            modelconfigIntervalHours = modelconfig.intervalHours || '',
            modelconfigIntervalDays = modelconfig.intervalDays || '',
            modelconfigIntervalMonths = modelconfig.intervalMonths || '';
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 541);
if (e.changed[modelconfigDate] || e.changed[modelconfigEnddate] || e.changed[modelconfigCount] || e.changed[modelconfigIntervalMinutes]
            || e.changed[modelconfigIntervalHours] || e.changed[modelconfigIntervalDays] || e.changed[modelconfigIntervalMonths]) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 543);
if (instance.get('rendered')) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 544);
instance._doSyncModelList();
            }
            else {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 547);
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
     * @since 0.3
     */
    _syncModelList : function (e, attrmodellist, attrmodelconfig) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_syncModelList", 569);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 570);
var instance = this;
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 571);
if (instance.get('rendered')) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 572);
instance._doSyncModelList(attrmodellist, attrmodelconfig);
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 575);
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
     * @since 0.3
     */
    _doSyncModelList : function (attrmodellist, attrmodelconfig) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_doSyncModelList", 593);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 594);
var instance = this,
            modellist = attrmodellist || instance.get('modelList'),
            modelconfig = attrmodelconfig || instance.get('modelConfig') || {},
            attrDate = modelconfig && modelconfig.date,
            attrEnddate = modelconfig && modelconfig.enddate,
            attrCount = modelconfig && modelconfig.count,
            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,
            attrIntervalHours = modelconfig && modelconfig.intervalHours,
            attrIntervalDays = modelconfig && modelconfig.intervalDays,
            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,
            dates = [],
            modelfunc, pushDate, i, prevDate, prevCount;

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 607);
instance.clearMarkedDates(modellist && attrDate);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 608);
prevCount = YObject.size(instance._storedModelDates);
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 609);
instance._storedModelDates = {};
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 610);
if (modellist && attrDate) {
            // I choosed to split it up in 4 scenario's. This is a bit more code, but it makes runtime faster when
            // an easier configuration is used (probably most of the cases)
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 613);
if (!attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 614);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 614);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 615);
var modelDate = modellist.getModelAttr(model, attrDate);
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 616);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 617);
dates.push(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 618);
instance._storeModelDate(model, modelDate);
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 622);
if (attrEnddate && !attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 623);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 623);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 624);
var modelDate = modellist.getModelAttr(model, attrDate),
                        modelEndDate = modellist.getModelAttr(model, attrEnddate) || modelDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 626);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 627);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 628);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 630);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 631);
do {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 632);
dates.push(dateCopyObject(pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 633);
instance._storeModelDate(model, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 634);
dateAddDays(pushDate, 1);
                        }while (dayisGreaterOrEqual(modelEndDate, pushDate));
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 640);
if (!attrEnddate && attrCount) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 641);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 641);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 642);
var modelDate = modellist.getModelAttr(model, attrDate),
                        modelCount = modellist.getModelAttr(model, attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && modellist.getModelAttr(model, attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && modellist.getModelAttr(model, attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && modellist.getModelAttr(model, attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && modellist.getModelAttr(model, attrIntervalMonths)),
                        stepMinutes;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 649);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 650);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 651);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 653);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 654);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 656);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 657);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 659);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 660);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 662);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 663);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 665);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 666);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 667);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 669);
pushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 670);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 671);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 672);
if (!dateEqualDays(pushDate, prevDate)) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 673);
dates.push(dateCopyObject(pushDate));
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 674);
instance._storeModelDate(model, pushDate);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 676);
dateCopyValues(pushDate, prevDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 677);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 678);
dateAddMinutes(pushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 680);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 681);
dateAddMonths(pushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }
            else {_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 687);
if (attrEnddate && attrCount) {
                // Make pushDate a Date object, so we can copy Date-values to it
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 689);
pushDate = new Date(0);
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 690);
modelfunc = function(model) {
                    _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "modelfunc", 690);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 691);
var modelDate = modellist.getModelAttr(model, attrDate),
                        modelEndDate = modellist.getModelAttr(model, attrEnddate) || modelDate,
                        modelCount = modellist.getModelAttr(model, attrCount) || 1,
                        modelIntervalMinutes = (attrIntervalMinutes && modellist.getModelAttr(model, attrIntervalMinutes)),
                        modelIntervalHours = (attrIntervalHours && modellist.getModelAttr(model, attrIntervalHours)),
                        modelIntervalDays = (attrIntervalDays && modellist.getModelAttr(model, attrIntervalDays)),
                        modelIntervalMonths = (attrIntervalMonths && modellist.getModelAttr(model, attrIntervalMonths)),
                        stepMinutes, startPushDate, endPushDate;
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 699);
if (dateIsValid(modelDate)) {
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 700);
if (!dateIsValid(modelEndDate)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 701);
modelEndDate = modelDate;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 703);
if (!Lang.isNumber(modelCount)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 704);
modelCount = 1;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 706);
if (!Lang.isNumber(modelIntervalMinutes)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 707);
modelIntervalMinutes = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 709);
if (!Lang.isNumber(modelIntervalHours)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 710);
modelIntervalHours = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 712);
if (!Lang.isNumber(modelIntervalDays)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 713);
modelIntervalDays = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 715);
if (!Lang.isNumber(modelIntervalMonths)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 716);
modelIntervalMonths = 0;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 718);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 719);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 720);
stepMinutes = 1440;
                        }
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 722);
startPushDate = dateCopyObject(modelDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 723);
endPushDate = dateCopyObject(modelEndDate);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 724);
prevDate = new Date(0);
                        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 725);
for (i=0; i<modelCount; i++) {
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 726);
dateCopyValues(startPushDate, pushDate);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 727);
do {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 728);
if (dayisGreater(pushDate, prevDate)) {
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 729);
dates.push(dateCopyObject(pushDate));
                                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 730);
instance._storeModelDate(model, pushDate);
                                }
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 732);
dateAddDays(pushDate, 1);
                            }while (dayisGreaterOrEqual(endPushDate, pushDate));
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 735);
dateCopyValues(pushDate, prevDate);
                            // correct prevDate --> because pushDate has been added 1 day that has not been handled
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 737);
dateAddDays(prevDate, -1);
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 738);
if (stepMinutes>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 739);
dateAddMinutes(startPushDate, stepMinutes);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 740);
dateAddMinutes(endPushDate, stepMinutes);
                            }
                            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 742);
if (modelIntervalMonths>0) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 743);
dateAddMonths(startPushDate, modelIntervalMonths);
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 744);
dateAddMonths(endPushDate, modelIntervalMonths);
                            }
                        }
                    }
                };
            }}}}
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 750);
modellist.each(modelfunc);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 751);
instance.markDates(dates);
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 752);
instance._fireSelectedModels();
        }
        else {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 755);
if (prevCount>0) {
                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 756);
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
     * @since 0.3
     */
    _storeModelDate : function(model, oDate) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_storeModelDate", 772);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 773);
var instance = this,
            year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate();

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 778);
if (!hasKey(instance._storedModelDates, year)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 779);
instance._storedModelDates[year] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 781);
if (!hasKey(instance._storedModelDates[year], month)) {
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 782);
instance._storedModelDates[year][month] = {};
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 784);
if (!hasKey(instance._storedModelDates[year][month], day)) {
            // define as an Array, NOT an object --> needs to be filled with Models
            _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 786);
instance._storedModelDates[year][month][day] = [];
        }
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 788);
instance._storedModelDates[year][month][day].push(model);
    },

    /**
     * A utility method that fires the selected Models on a selectionChange event or when syncing the modelList.
     *
     * @method _fireSelectedModels
     * @param {eventTarget} [e] The eventTarget after a selectionChange
     * @private
     * @since 0.3
     */
    _fireSelectedModels : function (e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_fireSelectedModels", 799);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 800);
var instance = this;

        /**
         * Is fired when the user changes the dateselection. In case multiple Dates are selected and the same Model is
         * available in more than one Date: the Model is only once in the resultarray. Meaning: only unique Models are returned.
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Model] with all modelList's unique original Models that are selected.
         * @param {Array} selectedDates contains [Date] with all selected Dates (passed through by the Calendar-instance)
         * @since 0.3
        **/

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 811);
instance.fire("modelSelectionChange", {
            newModelSelection: instance._getSelectedModelList(e),
            selectedDates: (e && e.newSelection) || instance.get('selectedDates')
        });
    },

    /**
     * Retrieves the unique Models that are available in the selectedDates.
     *
     * @method _getSelectedModelList
     * @param {eventTarget} [e] The eventTarget after a selectionChange. When not provided, the attribute 'selectedDates' is taken.
     * @private
     * @protected
     * @return {Array} Unique list of Models that are present in selectedDates
     * @since 0.3
     */
    _getSelectedModelList : function(e) {
        _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "_getSelectedModelList", 827);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 828);
var instance = this,
            dateselection = (e && e.newSelection) || instance.get('selectedDates'),
            modelArray = [];

        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 832);
YArray.each(
            dateselection,
            function(oDate) {
                // e.validateDate is undefined when comes from event --> in that case we always are sure
                // the array consist only Date-objects
                _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 3)", 834);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 837);
if ((e && !e.validateDate) || YDate.isValidDate(oDate)) {
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 838);
var year = oDate.getFullYear(),
                        month = oDate.getMonth(),
                        day = oDate.getDate(),
                        modelArrayDay = (instance._storedModelDates[year] && instance._storedModelDates[year][month]
                                        && instance._storedModelDates[year][month][day]) || [];
                    _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 843);
YArray.each(
                        modelArrayDay,
                        function(model) {
                            _yuitest_coverfunc("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", "(anonymous 4)", 845);
_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 846);
if (YArray.indexOf(modelArray, model) === -1) {
                                _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 847);
modelArray.push(model);
                            }
                        }
                    );
                }
            }
        );
        _yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 854);
return modelArray;
    }

}, true);

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 859);
Y.Calendar.ITSACalendarModelList = ITSACalendarModelList;

_yuitest_coverline("build/gallery-itsacalendarmodellist/gallery-itsacalendarmodellist.js", 861);
Y.Base.mix(Y.Calendar, [ITSACalendarModelList]);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "node-base",
        "calendar-base",
        "model",
        "model-list",
        "lazy-model-list",
        "datatype-date-math",
        "gallery-itsacalendarmarkeddates"
    ]
});
