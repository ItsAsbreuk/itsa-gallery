'use strict';

/**
 * DupModel View Extention
 *
 * Coorporates with gallery-itsamodellistviewextention --> it will load this module when not already loaded
 *
 * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set.
 * See the attribute <b>modelConfig</b> for more info.
 *
 *
 * @module gallery-itsadupmodelviewextention
 * @class ITSADupModelViewExtention
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

function ITSADupModelViewExtention() {}

ITSADupModelViewExtention.ATTRS = {

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

Y.mix(ITSADupModelViewExtention.prototype, {

// -- Public Static Properties -------------------------------------------------

    /**
     * Internal flag that tells whether the attribute 'modelConfig' is initiated.
     * @property _setModelConfigInitiated
     * @private
     * @type Boolean
     */
    _setModelConfigInitiated : null,
    _prevLastAbberantModelIndex : null,

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender()
     * which is available from gallery-ITSAScrollViewModellist.
     *
     * @method _setModelConfig
     * @param {Object} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setModelConfig : function(val) {
        var instance = this;

        Y.log('_setModelConfig', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setModelConfigInitiated) {
            if (instance.renderView) {
                // instance._renderView() is a function that is available from gallery-ITSAScrollViewModellist.
                // instance._rerendAttrChg is a private variable that is available from gallery-ITSAScrollViewModellist.
                if (instance._rerendAttrChg) {
                instance._renderView({modelConfig: val});
                }
            }
        }
        else {
            instance._setModelConfigInitiated = true;
        }
    },

    /**
     * Generates _abModelList which is a abberant modelList that may contain more models thant the modelList-attribute.
     * These will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
     *
     * @method _generateAbberantModelList
     * @param {Boolean} infiniteView Whether the scrollview has the infinitescroll pluged-in
     * @param {Int} firstIndex Modellist's index to start generating
     * @param {Int} lastIndex Modellist's last index
     * @param {Boolean} [forceRebuild] Forces the list to be cleared and rebuild from the ground up.
     * @private
     * @protected
     * @since 0.1
     *
    */
    _generateAbberantModelList : function(infiniteView, forceRebuild) {
        var instance = this,
            modelList = instance.get('modelList'),
            modelListIsLazy = instance._listLazy,
            modelconfig = instance.get('modelConfig'),
            attrDate = modelconfig && modelconfig.date,
            attrEnddate = modelconfig && modelconfig.enddate,
            attrCount = modelconfig && modelconfig.count,
            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,
            attrIntervalHours = modelconfig && modelconfig.intervalHours,
            attrIntervalDays = modelconfig && modelconfig.intervalDays,
            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,
            attrDuplicateEveryMinutes = modelconfig && modelconfig.duplicateEveryMinutes,
            getModelAttr = Y.rbind(instance.getModelAttr, instance),
            setModelAttr = Y.rbind(instance.setModelAttr, instance),
            modelfunc, duppedModel, markOriginal, dupmodel, pushDate, genModel, i, firstIndex, lastIndex;

        Y.log('_generateAbberantModelList', 'info', 'Itsa-ScrollViewDupModels');
        // duppedModel duplicates a Model-instance, but changes the startdate to the specified new Date.
        duppedModel = function(model, newStartDate, endDate, duplicateEveryMinutes, forceSetEndDate) {
            var modelIsLazy = (Lang.type(model.get) !== 'function'),
                dupModel, maxEndDate;
            if (modelIsLazy) {
                dupModel = {};
                Y.mix(dupModel, model);
                // Make the new object posible to be added to the LazyModelList by removing its
                delete dupModel.clientId;
                delete dupModel.id;
            }
            else {
                dupModel = new modelList.model(model.getAttrs());
            }
            if (endDate) {
                maxEndDate = dateCopyObject(newStartDate);
                dateAddMinutes(maxEndDate, duplicateEveryMinutes);
                if (YDate.isGreater(endDate, maxEndDate)) {
                    setModelAttr(dupModel, attrEnddate, maxEndDate);
                }
                else if (forceSetEndDate) {
                    setModelAttr(dupModel, attrEnddate, dateCopyObject(endDate));
                }
            }
            if (getModelAttr(dupModel, attrDate)) {
                setModelAttr(dupModel, attrDate, dateCopyObject(newStartDate));
            }
            return dupModel;
        };
        markOriginal = function(dupModel, model) {
            instance._origModels[getModelAttr(dupModel, 'clientId')] = model;
        };
        if (!infiniteView || !instance._abModelList || forceRebuild) {
            instance._prevLastAbberantModelIndex = null;
            instance._origModels.length = 0;
            if (instance._abModelList) {
                instance._abModelList.destroy();
            }
            instance._abModelList = modelListIsLazy ? new Y.LazyModelList() : new Y.ModelList();
            instance._abModelList.comparator = modelList && modelList.comparator;
            instance._abModelList.model = modelList.model;
        }
        // I choosed to split it up in 3 scenario's. This is a bit more code, but it makes runtime faster when
        // an easier configuration is used (probably most of the cases)
        if (attrEnddate && !attrCount) {
            Y.log('_generateAbberantModelList adds the model to _abModelList spread until endDate without intervals',
                  'info', 'Itsa-ScrollViewDupModels');
            modelfunc = function(model) {
                var modelDate = getModelAttr(model, attrDate),
                    modelEndDate = getModelAttr(model, attrEnddate),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes));
                if (dateIsValid(modelDate) && dateIsValid(modelEndDate)) {
                    if (!Lang.isNumber(duplicateEveryMinutes)) {
                        duplicateEveryMinutes = 1440;
                    }
                    pushDate = dateCopyObject(modelDate);
                    dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);
                    instance._abModelList.add(dupmodel);
                    markOriginal(dupmodel, model);
                    while (dayisGreater(modelEndDate, pushDate)) {
                        // duplicate pushDate, otherwise all subModels remain the same Date
                        dateAddMinutes(pushDate, duplicateEveryMinutes);
                        dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);
                        instance._abModelList.add(dupmodel);
                        markOriginal(dupmodel, model);
                    }
                }
                else {
                    instance._abModelList.add(model);
                }
            };
        }
        else if (!attrEnddate && attrCount) {
            Y.log('_generateAbberantModelList will sync only the startdates with intervals', 'info', 'Itsa-ScrollViewDupModels');
            modelfunc = function(model) {
                var modelDate = getModelAttr(model, attrDate),
                    modelCount = getModelAttr(model, attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),
                    stepMinutes, i;
                if (!dateIsValid(modelDate)) {
                    instance._abModelList.add(model);
                }
                else {
                    dupmodel = duppedModel(model, modelDate);
                    instance._abModelList.add(dupmodel);
                    markOriginal(dupmodel, model);
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
                        dupmodel = duppedModel(model, pushDate);
                        instance._abModelList.add(dupmodel);
                        markOriginal(dupmodel, model);
                    }
                }
            };
        }
        else if (attrEnddate && attrCount) {
            Y.log('_generateAbberantModelList will sync startdates and enddates with intervals', 'info', 'Itsa-ScrollViewDupModels');
            // Make pushDate a Date object, so we can copy Date-values to it
            pushDate = new Date(0);
            modelfunc = function(model) {
                var modelDate = getModelAttr(model, attrDate),
                    modelEndDate = getModelAttr(model, attrEnddate) || modelDate,
                    modelCount = getModelAttr(model, attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes)),
                    stepMinutes, startPushDate, endPushDate, i, validModelEndDate;
                if (!dateIsValid(modelDate)) {
                    instance._abModelList.add(model);
                }
                else {
                    if (!Lang.isNumber(duplicateEveryMinutes)) {
                        duplicateEveryMinutes = 1440;
                    }
                    dupmodel = duppedModel(model, modelDate, modelEndDate, duplicateEveryMinutes);
                    instance._abModelList.add(dupmodel);
                    markOriginal(dupmodel, model);
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
                            dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes);
                            instance._abModelList.add(dupmodel);
                            markOriginal(dupmodel, model);
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
                        dupmodel = duppedModel(model, startPushDate, endPushDate, duplicateEveryMinutes, true);
                        instance._abModelList.add(dupmodel);
                        markOriginal(dupmodel, model);
                        // also duplicate based on enddate
                        if (validModelEndDate) {
                            pushDate = dateCopyObject(startPushDate);
                            while (dayisGreater(endPushDate, pushDate)) {
                                dateAddMinutes(pushDate, duplicateEveryMinutes);
                                dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes, true);
                                instance._abModelList.add(dupmodel);
                                markOriginal(dupmodel, model);
                            }
                        }
                    }
                }
            };
        }
        firstIndex = (instance._prevLastAbberantModelIndex || -1) + 1;
        instance._prevLastAbberantModelIndex = lastIndex = modelList.size()-1;
        for (i=firstIndex; i<=lastIndex; i++) {
            genModel = modelList.item(i);
            modelfunc(genModel);
        }
    }

}, true);

Y.ITSADupModelViewExtention = ITSADupModelViewExtention;