'use strict';

/**
 * ScrollView DupModel Extention
 *
 * Coorporates with gallery-itsascrollviewmodellist --> it will load this module when not already loaded
 *
 * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set.
 * See the attribute <b>modelConfig</b> for more info.
 *
 *
 * @module gallery-itsscrollviewdupmodels
 * @class ITSAScrollViewDupModels
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    YDate = Y.DataType.Date,
    dateIsValid = YDate.isValidDate,
    dateCopyObject      = function (oDate) {
                              return new Date(oDate.getTime());
                          },
    dateAddMinutes      = function (oDate, numMinutes) {
                              oDate.setTime(oDate.getTime() + 60000*numMinutes);
                          },
    dateEqualDays       = function(aDate, bDate) {
                              return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                      && (aDate.getFullYear()===bDate.getFullYear()));
                          },
    dayisGreater        = function(aDate, bDate) {
                              return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                          },
    dateAddMonths       = function (oDate, numMonths) {
                              var newYear = oDate.getFullYear(),
                                  newMonth = oDate.getMonth() + numMonths;
                              newYear  = Math.floor(newYear + newMonth / 12);
                              newMonth = (newMonth % 12 + 12) % 12;
                              oDate.setFullYear(newYear);
                              oDate.setMonth(newMonth);
                          };

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

function ITSAScrollViewDupModelsExtention() {}

ITSAScrollViewDupModelsExtention.ATTRS = {

    /**
     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,
     * <b>intervalHours</b>, <b>intervalDays</b>, <b>intervalMonths</b> and <b>duplicateEveryMinutes</b> attributes.
     * These values are Strings and represent the attributenames in the Models. The actual values (and its types)
     * come form the Models itsself.
     *
     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.
     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,
     * by looking at the Models structure.
     *
     * @attribute modelConfig
     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,
     * <b>intervalHours</b>, <b>intervalDays</b>, <b>intervalMonths</b> and <b>duplicateEveryMinutes</b>
     * @default null
     * @since 0.1
     */
    modelConfig: {
        value:      null,
        validator:  function(v){ return Lang.isObject(v) || v === null; },
        setter: '_setModelConfig'
    }

};

Y.mix(ITSAScrollViewDupModelsExtention.prototype, {

// -- Public Static Properties -------------------------------------------------

    /**
     * Internal flag that tells whether the attribute 'modelConfig' is initiated.
     * @property _setModelConfigInitiated
     * @private
     * @type Boolean
     */
    _setModelConfigInitiated : null,

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed.
     *
     * @method _setModelConfig
     * @private
     * @since 0.1
     *
    */
    _setModelConfig : function() {
        var instance = this;

        Y.log('_setModelConfig', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setModelConfigInitiated) {
            if (instance.renderView) {
                // instance.renderView() is a function that is available from gallery-itsascrollviewmodellist
                instance.renderView();
            }
        }
        else {
            instance._setModelConfigInitiated = true;
        }
    },

    /**
     * Generates _abberantModelList which is a abberant modelList that may contain more models thant the modelList-attribute.
     * These will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
     *
     * @method _generateAbberantModelList
     * @private
     * @protected
     * @since 0.1
     *
    */
    _generateAbberantModelList : function() {
        var instance = this,
            modelList = instance.get('modelList'),
            modelconfig = instance.get('modelConfig'),
            attrDate = modelconfig && modelconfig.date,
            attrEnddate = modelconfig && modelconfig.enddate,
            attrCount = modelconfig && modelconfig.count,
            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,
            attrIntervalHours = modelconfig && modelconfig.intervalHours,
            attrIntervalDays = modelconfig && modelconfig.intervalDays,
            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,
            attrDuplicateEveryMinutes = modelconfig && modelconfig.duplicateEveryMinutes,
            modelfunc, duppedModel, pushDate;

        Y.log('_generateAbberantModelList', 'info', 'Itsa-ScrollViewDupModels');
        // duppedModel duplicates a Y.Model, but changes the startdate to the specified new Date.
        duppedModel = function(model, newStartDate, endDate, duplicateEveryMinutes, forceSetEndDate) {
            var dupModel = new Y.Model(),
                maxEndDate;
            dupModel.setAttrs(model.getAttrs());
            if (endDate) {
                maxEndDate = dateCopyObject(newStartDate);
                dateAddMinutes(maxEndDate, duplicateEveryMinutes);
                if (YDate.isGreater(endDate, maxEndDate)) {
                    dupModel.set(attrEnddate, maxEndDate);
                }
                else if (forceSetEndDate) {
                    dupModel.set(attrEnddate, dateCopyObject(endDate));
                }
            }
            if (dupModel.get(attrDate)) {
                dupModel.set(attrDate, dateCopyObject(newStartDate));
            }
            instance._originalModels[dupModel.get('clientId')] = model;
            return dupModel;
        };

        instance._originalModels.length = 0;
        if (instance._abberantModelList) {
            instance._abberantModelList.destroy();
        }
        instance._abberantModelList = new Y.ModelList();
        instance._abberantModelList.comparator = modelList && modelList.comparator;
        // I choosed to split it up in 3 scenario's. This is a bit more code, but it makes runtime faster when
        // an easier configuration is used (probably most of the cases)
        if (attrEnddate && !attrCount) {
            Y.log('_generateAbberantModelList adds the model to _abberantModelList spread until endDate without intervals',
                  'info', 'Itsa-ScrollViewDupModels');
            modelfunc = function(model) {
                var modelDate = model.get(attrDate),
                    modelEndDate = model.get(attrEnddate),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && model.get(attrDuplicateEveryMinutes));
                if (dateIsValid(modelDate) && dateIsValid(modelEndDate)) {
                    if (!Lang.isNumber(duplicateEveryMinutes)) {
                        duplicateEveryMinutes = 1440;
                    }
                    pushDate = dateCopyObject(modelDate);
                    instance._abberantModelList.add(duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes));
                    while (dayisGreater(modelEndDate, pushDate)) {
                        // duplicate pushDate, otherwise all subModels remain the same Date
                        dateAddMinutes(pushDate, duplicateEveryMinutes);
                        instance._abberantModelList.add(duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes));
                    }
                }
                else {
                    instance._abberantModelList.add(model);
                }
            };
        }
        else if (!attrEnddate && attrCount) {
            Y.log('_generateAbberantModelList will sync only the startdates with intervals', 'info', 'Itsa-ScrollViewDupModels');
            modelfunc = function(model) {
                var modelDate = model.get(attrDate),
                    modelCount = model.get(attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                    stepMinutes, i;
                if (!dateIsValid(modelDate)) {
                    instance._abberantModelList.add(model);
                }
                else {
                    instance._abberantModelList.add(duppedModel(model, modelDate));
                    if (!Lang.isNumber(modelCount)) {
                        modelCount = 1;
                    }
                    if (!Lang.isNumber(modelIntervalMinutes)) {
                        modelIntervalMinutes = 0;
                    }
                    if (!Lang.isNumber(modelIntervalHours)) {
                        modelIntervalHours = 0;
                    }
                    if (!Lang.isNumber(modelIntervalDays)) {
                        modelIntervalDays = 0;
                    }
                    if (!Lang.isNumber(modelIntervalMonths)) {
                        modelIntervalMonths = 0;
                    }
                    stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                    if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                        stepMinutes = 1440;
                    }
                    pushDate = dateCopyObject(modelDate);
                    for (i=1; i<modelCount; i++) {
                        if (stepMinutes>0) {
                            dateAddMinutes(pushDate, stepMinutes);
                        }
                        if (modelIntervalMonths>0) {
                            dateAddMonths(pushDate, modelIntervalMonths);
                        }
                        instance._abberantModelList.add(duppedModel(model, pushDate));
                    }
                }
            };
        }
        else if (attrEnddate && attrCount) {
            Y.log('_generateAbberantModelList will sync startdates and enddates with intervals', 'info', 'Itsa-ScrollViewDupModels');
            // Make pushDate a Date object, so we can copy Date-values to it
            pushDate = new Date(0);
            modelfunc = function(model) {
                var modelDate = model.get(attrDate),
                    modelEndDate = model.get(attrEnddate) || modelDate,
                    modelCount = model.get(attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && model.get(attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && model.get(attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && model.get(attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && model.get(attrIntervalMonths)),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && model.get(attrDuplicateEveryMinutes)),
                    stepMinutes, startPushDate, endPushDate, dupped, i, validModelEndDate;
                if (!dateIsValid(modelDate)) {
                    instance._abberantModelList.add(model);
                }
                else {
                    if (!Lang.isNumber(duplicateEveryMinutes)) {
                        duplicateEveryMinutes = 1440;
                    }
                    instance._abberantModelList.add(duppedModel(model, modelDate, modelEndDate, duplicateEveryMinutes));
                    validModelEndDate = dateIsValid(modelEndDate);
                    if (!validModelEndDate) {
                        modelEndDate = modelDate;
                    }
                    if (!Lang.isNumber(modelCount)) {
                        modelCount = 1;
                    }
                    if (!Lang.isNumber(modelIntervalMinutes)) {
                        modelIntervalMinutes = 0;
                    }
                    if (!Lang.isNumber(modelIntervalHours)) {
                        modelIntervalHours = 0;
                    }
                    if (!Lang.isNumber(modelIntervalDays)) {
                        modelIntervalDays = 0;
                    }
                    if (!Lang.isNumber(modelIntervalMonths)) {
                        modelIntervalMonths = 0;
                    }
                    stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                    if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                        stepMinutes = 1440;
                    }
                    startPushDate = dateCopyObject(modelDate);
                    endPushDate = dateCopyObject(modelEndDate);
                    // duplicate based on enddate
                    if (validModelEndDate) {
                        pushDate = dateCopyObject(startPushDate);
                        while (dayisGreater(endPushDate, pushDate)) {
                            dateAddMinutes(pushDate, duplicateEveryMinutes);
                            instance._abberantModelList.add(duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes));
                        }
                    }
                    // now duplicate based on interval
                    for (i=1; i<modelCount; i++) {
                        if (stepMinutes>0) {
                            dateAddMinutes(startPushDate, stepMinutes);
                            dateAddMinutes(endPushDate, stepMinutes);
                        }
                        if (modelIntervalMonths>0) {
                            dateAddMonths(startPushDate, modelIntervalMonths);
                            dateAddMonths(endPushDate, modelIntervalMonths);
                        }
                        dupped = duppedModel(model, startPushDate, endPushDate, duplicateEveryMinutes, true);
                        instance._abberantModelList.add(dupped);
                        // also duplicate based on enddate
                        if (validModelEndDate) {
                            pushDate = dateCopyObject(startPushDate);
                            while (dayisGreater(endPushDate, pushDate)) {
                                dateAddMinutes(pushDate, duplicateEveryMinutes);
                                instance._abberantModelList.add(duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes, true));
                            }
                        }
                    }
                }
            };
        }
        modelList.each(
            modelfunc
        );
    }

}, true);

Y.ScrollView.ITSAScrollViewDupModelsExtention = ITSAScrollViewDupModelsExtention;

Y.Base.mix(Y.ScrollView, [ITSAScrollViewDupModelsExtention]);