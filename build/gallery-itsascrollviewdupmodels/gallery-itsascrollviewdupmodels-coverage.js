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
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js",
    code: []
};
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"].code=["YUI.add('gallery-itsascrollviewdupmodels', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView DupModel Extention"," *"," * Coorporates with gallery-itsascrollviewmodellist --> it will load this module when not already loaded"," *"," * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set."," * See the attribute <b>modelConfig</b> for more info."," *"," *"," * @module gallery-itsscrollviewdupmodels"," * @class ITSAScrollViewDupModels"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YDate = Y.DataType.Date,","    dateIsValid = YDate.isValidDate,","    dateCopyObject      = function (oDate) {","                              return new Date(oDate.getTime());","                          },","    dateAddMinutes      = function (oDate, numMinutes) {","                              oDate.setTime(oDate.getTime() + 60000*numMinutes);","                          },","    dateEqualDays       = function(aDate, bDate) {","                              return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())","                                      && (aDate.getFullYear()===bDate.getFullYear()));","                          },","    dayisGreater        = function(aDate, bDate) {","                              return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));","                          },","    dateAddMonths       = function (oDate, numMonths) {","                              var newYear = oDate.getFullYear(),","                                  newMonth = oDate.getMonth() + numMonths;","                              newYear  = Math.floor(newYear + newMonth / 12);","                              newMonth = (newMonth % 12 + 12) % 12;","                              oDate.setFullYear(newYear);","                              oDate.setMonth(newMonth);","                          };","","// -- Mixing extra Methods to Y.ScrollView -----------------------------------","","function ITSAScrollViewDupModelsExtention() {}","","ITSAScrollViewDupModelsExtention.ATTRS = {","","    /**","     * Definition of the Model's <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b>, <b>intervalMonths</b> and <b>duplicateEveryMinutes</b> attributes.","     * These values are Strings and represent the attributenames in the Models. The actual values (and its types)","     * come form the Models itsself.","     *","     * For example: {date: 'startDate'}, which means that yourModel.get('startDate') should return a Date-object.","     * When not specified, the module tries to find a valid <b>modelConfig.date</b> which it can use,","     * by looking at the Models structure.","     *","     * @attribute modelConfig","     * @type {Object} with fields: <b>date</b>, <b>enddate</b>, <b>count</b>, <b>intervalMinutes</b>,","     * <b>intervalHours</b>, <b>intervalDays</b>, <b>intervalMonths</b> and <b>duplicateEveryMinutes</b>","     * @default null","     * @since 0.1","     */","    modelConfig: {","        value:      null,","        validator:  function(v){ return Lang.isObject(v) || v === null; },","        setter: '_setModelConfig'","    }","","};","","Y.mix(ITSAScrollViewDupModelsExtention.prototype, {","","// -- Public Static Properties -------------------------------------------------","","    /**","     * Internal flag that tells whether the attribute 'modelConfig' is initiated.","     * @property _setModelConfigInitiated","     * @private","     * @type Boolean","     */","    _setModelConfigInitiated : null,","    _prevLastAbberantModelIndex : null,","","    /**","     * Returns the ModelList which rendered the View. In case there are dupModels available, this is a abbarant","     * ModelList, which has more items than the bound modelList-attribute. This method always returns the 'full'-modellist","     * with all the items.","     *","     * @method getModelList","     * @since 0.1","     *","    */","    getModelList : function() {","        var instance = this;","","        return instance._abberantModelList || instance.get('modelList');","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender()","     * which is available from gallery-itsascrollviewmodellist.","     *","     * @method _setModelConfig","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelConfig : function(val) {","        var instance = this;","","        if (instance._setModelConfigInitiated) {","            if (instance.renderView) {","                // instance._renderView() is a function that is available from gallery-itsascrollviewmodellist.","                // instance._rerenderAttributesOnChange is a private variable that is available from gallery-itsascrollviewmodellist.","                if (instance._rerenderAttributesOnChange) {","                instance._renderView({modelConfig: val});","                }","            }","        }","        else {","            instance._setModelConfigInitiated = true;","        }","    },","","    /**","     * Generates _abberantModelList which is a abberant modelList that may contain more models thant the modelList-attribute.","     * These will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","     *","     * @method _generateAbberantModelList","     * @param {Boolean} infiniteView Whether the scrollview has the infinitescroll pluged-in","     * @param {Int} firstIndex Modellist's index to start generating","     * @param {Int} lastIndex Modellist's last index","     * @param {Boolean} [forceRebuild] Forces the list to be cleared and rebuild from the ground up.","     * @private","     * @protected","     * @since 0.1","     *","    */","    _generateAbberantModelList : function(infiniteView, forceRebuild) {","        var instance = this,","            modelList = instance.get('modelList'),","            modelListIsLazy = instance._modelListIsLazy,","            modelconfig = instance.get('modelConfig'),","            attrDate = modelconfig && modelconfig.date,","            attrEnddate = modelconfig && modelconfig.enddate,","            attrCount = modelconfig && modelconfig.count,","            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,","            attrIntervalHours = modelconfig && modelconfig.intervalHours,","            attrIntervalDays = modelconfig && modelconfig.intervalDays,","            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,","            attrDuplicateEveryMinutes = modelconfig && modelconfig.duplicateEveryMinutes,","            getModelAttr = instance.getModelAttr,","            setModelAttr = instance.setModelAttr,","            modelfunc, duppedModel, markOriginal, dupmodel, pushDate, genModel, i, firstIndex, lastIndex;","","        // duppedModel duplicates a Model-instance, but changes the startdate to the specified new Date.","        duppedModel = function(model, newStartDate, endDate, duplicateEveryMinutes, forceSetEndDate) {","            var modelIsLazy = (Lang.type(model.get) !== 'function'),","                dupModel, maxEndDate;","            if (modelIsLazy) {","                dupModel = {};","                Y.mix(dupModel, model);","                // Make the new object posible to be added to the LazyModelList by removing its","                delete dupModel.clientId;","                delete dupModel.id;","            }","            else {","                dupModel = new modelList.model(model.getAttrs());","            }","            if (endDate) {","                maxEndDate = dateCopyObject(newStartDate);","                dateAddMinutes(maxEndDate, duplicateEveryMinutes);","                if (YDate.isGreater(endDate, maxEndDate)) {","                    setModelAttr(dupModel, false, attrEnddate, maxEndDate);","                }","                else if (forceSetEndDate) {","                    setModelAttr(dupModel, false, attrEnddate, dateCopyObject(endDate));","                }","            }","            if (getModelAttr(dupModel, attrDate)) {","                setModelAttr(dupModel, false, attrDate, dateCopyObject(newStartDate));","            }","            return dupModel;","        };","        markOriginal = function(dupModel, model) {","            instance._originalModels[getModelAttr(dupModel, 'clientId')] = model;","        };","        if (!infiniteView || !instance._abberantModelList || forceRebuild) {","            instance._prevLastAbberantModelIndex = null;","            instance._originalModels.length = 0;","            if (instance._abberantModelList) {","                instance._abberantModelList.destroy();","            }","            instance._abberantModelList = modelListIsLazy ? new Y.LazyModelList() : new Y.ModelList();","            instance._abberantModelList.comparator = modelList && modelList.comparator;","            instance._abberantModelList.model = modelList.model;","        }","        // I choosed to split it up in 3 scenario's. This is a bit more code, but it makes runtime faster when","        // an easier configuration is used (probably most of the cases)","        if (attrEnddate && !attrCount) {","            modelfunc = function(model) {","                var modelDate = getModelAttr(model, attrDate),","                    modelEndDate = getModelAttr(model, attrEnddate),","                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes));","                if (dateIsValid(modelDate) && dateIsValid(modelEndDate)) {","                    if (!Lang.isNumber(duplicateEveryMinutes)) {","                        duplicateEveryMinutes = 1440;","                    }","                    pushDate = dateCopyObject(modelDate);","                    dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);","                    instance._abberantModelList.add(dupmodel);","                    markOriginal(dupmodel, model);","                    while (dayisGreater(modelEndDate, pushDate)) {","                        // duplicate pushDate, otherwise all subModels remain the same Date","                        dateAddMinutes(pushDate, duplicateEveryMinutes);","                        dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);","                        instance._abberantModelList.add(dupmodel);","                        markOriginal(dupmodel, model);","                    }","                }","                else {","                    instance._abberantModelList.add(model);","                }","            };","        }","        else if (!attrEnddate && attrCount) {","            modelfunc = function(model) {","                var modelDate = getModelAttr(model, attrDate),","                    modelCount = getModelAttr(model, attrCount) || 1,","                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),","                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),","                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),","                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),","                    stepMinutes, i;","                if (!dateIsValid(modelDate)) {","                    instance._abberantModelList.add(model);","                }","                else {","                    dupmodel = duppedModel(model, modelDate);","                    instance._abberantModelList.add(dupmodel);","                    markOriginal(dupmodel, model);","                    if (!Lang.isNumber(modelCount)) {","                        modelCount = 1;","                    }","                    if (!Lang.isNumber(modelIntervalMinutes)) {","                        modelIntervalMinutes = 0;","                    }","                    if (!Lang.isNumber(modelIntervalHours)) {","                        modelIntervalHours = 0;","                    }","                    if (!Lang.isNumber(modelIntervalDays)) {","                        modelIntervalDays = 0;","                    }","                    if (!Lang.isNumber(modelIntervalMonths)) {","                        modelIntervalMonths = 0;","                    }","                    stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                    if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                        stepMinutes = 1440;","                    }","                    pushDate = dateCopyObject(modelDate);","                    for (i=1; i<modelCount; i++) {","                        if (stepMinutes>0) {","                            dateAddMinutes(pushDate, stepMinutes);","                        }","                        if (modelIntervalMonths>0) {","                            dateAddMonths(pushDate, modelIntervalMonths);","                        }","                        dupmodel = duppedModel(model, pushDate);","                        instance._abberantModelList.add(dupmodel);","                        markOriginal(dupmodel, model);","                    }","                }","            };","        }","        else if (attrEnddate && attrCount) {","            // Make pushDate a Date object, so we can copy Date-values to it","            pushDate = new Date(0);","            modelfunc = function(model) {","                var modelDate = getModelAttr(model, attrDate),","                    modelEndDate = getModelAttr(model, attrEnddate) || modelDate,","                    modelCount = getModelAttr(model, attrCount) || 1,","                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),","                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),","                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),","                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),","                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes)),","                    stepMinutes, startPushDate, endPushDate, i, validModelEndDate;","                if (!dateIsValid(modelDate)) {","                    instance._abberantModelList.add(model);","                }","                else {","                    if (!Lang.isNumber(duplicateEveryMinutes)) {","                        duplicateEveryMinutes = 1440;","                    }","                    dupmodel = duppedModel(model, modelDate, modelEndDate, duplicateEveryMinutes);","                    instance._abberantModelList.add(dupmodel);","                    markOriginal(dupmodel, model);","                    validModelEndDate = dateIsValid(modelEndDate);","                    if (!validModelEndDate) {","                        modelEndDate = modelDate;","                    }","                    if (!Lang.isNumber(modelCount)) {","                        modelCount = 1;","                    }","                    if (!Lang.isNumber(modelIntervalMinutes)) {","                        modelIntervalMinutes = 0;","                    }","                    if (!Lang.isNumber(modelIntervalHours)) {","                        modelIntervalHours = 0;","                    }","                    if (!Lang.isNumber(modelIntervalDays)) {","                        modelIntervalDays = 0;","                    }","                    if (!Lang.isNumber(modelIntervalMonths)) {","                        modelIntervalMonths = 0;","                    }","                    stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;","                    if ((stepMinutes===0) && (modelIntervalMonths===0)) {","                        stepMinutes = 1440;","                    }","                    startPushDate = dateCopyObject(modelDate);","                    endPushDate = dateCopyObject(modelEndDate);","                    // duplicate based on enddate","                    if (validModelEndDate) {","                        pushDate = dateCopyObject(startPushDate);","                        while (dayisGreater(endPushDate, pushDate)) {","                            dateAddMinutes(pushDate, duplicateEveryMinutes);","                            dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes);","                            instance._abberantModelList.add(dupmodel);","                            markOriginal(dupmodel, model);","                        }","                    }","                    // now duplicate based on interval","                    for (i=1; i<modelCount; i++) {","                        if (stepMinutes>0) {","                            dateAddMinutes(startPushDate, stepMinutes);","                            dateAddMinutes(endPushDate, stepMinutes);","                        }","                        if (modelIntervalMonths>0) {","                            dateAddMonths(startPushDate, modelIntervalMonths);","                            dateAddMonths(endPushDate, modelIntervalMonths);","                        }","                        dupmodel = duppedModel(model, startPushDate, endPushDate, duplicateEveryMinutes, true);","                        instance._abberantModelList.add(dupmodel);","                        markOriginal(dupmodel, model);","                        // also duplicate based on enddate","                        if (validModelEndDate) {","                            pushDate = dateCopyObject(startPushDate);","                            while (dayisGreater(endPushDate, pushDate)) {","                                dateAddMinutes(pushDate, duplicateEveryMinutes);","                                dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes, true);","                                instance._abberantModelList.add(dupmodel);","                                markOriginal(dupmodel, model);","                            }","                        }","                    }","                }","            };","        }","        firstIndex = (instance._prevLastAbberantModelIndex || -1) + 1;","        instance._prevLastAbberantModelIndex = lastIndex = modelList.size()-1;","        for (i=firstIndex; i<=lastIndex; i++) {","            genModel = modelList.item(i);","            modelfunc(genModel);","        }","    }","","}, true);","","Y.ScrollView.ITSAScrollViewDupModelsExtention = ITSAScrollViewDupModelsExtention;","","Y.Base.mix(Y.ScrollView, [ITSAScrollViewDupModelsExtention]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"model-list\",","        \"datatype-date-math\",","        \"gallery-itsascrollviewmodellist\"","    ]","});"];
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"].lines = {"1":0,"3":0,"24":0,"28":0,"31":0,"34":0,"38":0,"41":0,"43":0,"44":0,"45":0,"46":0,"51":0,"53":0,"73":0,"79":0,"102":0,"104":0,"118":0,"120":0,"121":0,"124":0,"125":0,"130":0,"149":0,"166":0,"167":0,"169":0,"170":0,"171":0,"173":0,"174":0,"177":0,"179":0,"180":0,"181":0,"182":0,"183":0,"185":0,"186":0,"189":0,"190":0,"192":0,"194":0,"195":0,"197":0,"198":0,"199":0,"200":0,"201":0,"203":0,"204":0,"205":0,"209":0,"210":0,"211":0,"214":0,"215":0,"216":0,"218":0,"219":0,"220":0,"221":0,"222":0,"224":0,"225":0,"226":0,"227":0,"231":0,"235":0,"236":0,"237":0,"244":0,"245":0,"248":0,"249":0,"250":0,"251":0,"252":0,"254":0,"255":0,"257":0,"258":0,"260":0,"261":0,"263":0,"264":0,"266":0,"267":0,"268":0,"270":0,"271":0,"272":0,"273":0,"275":0,"276":0,"278":0,"279":0,"280":0,"285":0,"287":0,"288":0,"289":0,"298":0,"299":0,"302":0,"303":0,"305":0,"306":0,"307":0,"308":0,"309":0,"310":0,"312":0,"313":0,"315":0,"316":0,"318":0,"319":0,"321":0,"322":0,"324":0,"325":0,"327":0,"328":0,"329":0,"331":0,"332":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"340":0,"344":0,"345":0,"346":0,"347":0,"349":0,"350":0,"351":0,"353":0,"354":0,"355":0,"357":0,"358":0,"359":0,"360":0,"361":0,"362":0,"363":0,"370":0,"371":0,"372":0,"373":0,"374":0,"380":0,"382":0};
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"].functions = {"dateCopyObject:27":0,"dateAddMinutes:30":0,"dateEqualDays:33":0,"dayisGreater:37":0,"dateAddMonths:40":0,"ITSAScrollViewDupModelsExtention:51":0,"validator:73":0,"getModelList:101":0,"_setModelConfig:117":0,"duppedModel:166":0,"markOriginal:194":0,"modelfunc:210":0,"modelfunc:236":0,"modelfunc:288":0,"_generateAbberantModelList:148":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"].coveredLines = 159;
_yuitest_coverage["build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js"].coveredFunctions = 16;
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 1);
YUI.add('gallery-itsascrollviewdupmodels', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 3);
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

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 24);
var Lang = Y.Lang,
    YDate = Y.DataType.Date,
    dateIsValid = YDate.isValidDate,
    dateCopyObject      = function (oDate) {
                              _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "dateCopyObject", 27);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 28);
return new Date(oDate.getTime());
                          },
    dateAddMinutes      = function (oDate, numMinutes) {
                              _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "dateAddMinutes", 30);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 31);
oDate.setTime(oDate.getTime() + 60000*numMinutes);
                          },
    dateEqualDays       = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "dateEqualDays", 33);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 34);
return ((aDate.getDate()===bDate.getDate()) && (aDate.getMonth()===bDate.getMonth())
                                      && (aDate.getFullYear()===bDate.getFullYear()));
                          },
    dayisGreater        = function(aDate, bDate) {
                              _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "dayisGreater", 37);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 38);
return (YDate.isGreater(aDate, bDate) && !dateEqualDays(aDate, bDate));
                          },
    dateAddMonths       = function (oDate, numMonths) {
                              _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "dateAddMonths", 40);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 41);
var newYear = oDate.getFullYear(),
                                  newMonth = oDate.getMonth() + numMonths;
                              _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 43);
newYear  = Math.floor(newYear + newMonth / 12);
                              _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 44);
newMonth = (newMonth % 12 + 12) % 12;
                              _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 45);
oDate.setFullYear(newYear);
                              _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 46);
oDate.setMonth(newMonth);
                          };

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 51);
function ITSAScrollViewDupModelsExtention() {}

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 53);
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
        validator:  function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "validator", 73);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 73);
return Lang.isObject(v) || v === null; },
        setter: '_setModelConfig'
    }

};

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 79);
Y.mix(ITSAScrollViewDupModelsExtention.prototype, {

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
     * Returns the ModelList which rendered the View. In case there are dupModels available, this is a abbarant
     * ModelList, which has more items than the bound modelList-attribute. This method always returns the 'full'-modellist
     * with all the items.
     *
     * @method getModelList
     * @since 0.1
     *
    */
    getModelList : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "getModelList", 101);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 102);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 104);
return instance._abberantModelList || instance.get('modelList');
    },

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender()
     * which is available from gallery-itsascrollviewmodellist.
     *
     * @method _setModelConfig
     * @param {Object} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setModelConfig : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "_setModelConfig", 117);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 118);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 120);
if (instance._setModelConfigInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 121);
if (instance.renderView) {
                // instance._renderView() is a function that is available from gallery-itsascrollviewmodellist.
                // instance._rerenderAttributesOnChange is a private variable that is available from gallery-itsascrollviewmodellist.
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 124);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 125);
instance._renderView({modelConfig: val});
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 130);
instance._setModelConfigInitiated = true;
        }
    },

    /**
     * Generates _abberantModelList which is a abberant modelList that may contain more models thant the modelList-attribute.
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
        _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "_generateAbberantModelList", 148);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 149);
var instance = this,
            modelList = instance.get('modelList'),
            modelListIsLazy = instance._modelListIsLazy,
            modelconfig = instance.get('modelConfig'),
            attrDate = modelconfig && modelconfig.date,
            attrEnddate = modelconfig && modelconfig.enddate,
            attrCount = modelconfig && modelconfig.count,
            attrIntervalMinutes = modelconfig && modelconfig.intervalMinutes,
            attrIntervalHours = modelconfig && modelconfig.intervalHours,
            attrIntervalDays = modelconfig && modelconfig.intervalDays,
            attrIntervalMonths = modelconfig && modelconfig.intervalMonths,
            attrDuplicateEveryMinutes = modelconfig && modelconfig.duplicateEveryMinutes,
            getModelAttr = instance.getModelAttr,
            setModelAttr = instance.setModelAttr,
            modelfunc, duppedModel, markOriginal, dupmodel, pushDate, genModel, i, firstIndex, lastIndex;

        // duppedModel duplicates a Model-instance, but changes the startdate to the specified new Date.
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 166);
duppedModel = function(model, newStartDate, endDate, duplicateEveryMinutes, forceSetEndDate) {
            _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "duppedModel", 166);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 167);
var modelIsLazy = (Lang.type(model.get) !== 'function'),
                dupModel, maxEndDate;
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 169);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 170);
dupModel = {};
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 171);
Y.mix(dupModel, model);
                // Make the new object posible to be added to the LazyModelList by removing its
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 173);
delete dupModel.clientId;
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 174);
delete dupModel.id;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 177);
dupModel = new modelList.model(model.getAttrs());
            }
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 179);
if (endDate) {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 180);
maxEndDate = dateCopyObject(newStartDate);
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 181);
dateAddMinutes(maxEndDate, duplicateEveryMinutes);
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 182);
if (YDate.isGreater(endDate, maxEndDate)) {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 183);
setModelAttr(dupModel, false, attrEnddate, maxEndDate);
                }
                else {_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 185);
if (forceSetEndDate) {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 186);
setModelAttr(dupModel, false, attrEnddate, dateCopyObject(endDate));
                }}
            }
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 189);
if (getModelAttr(dupModel, attrDate)) {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 190);
setModelAttr(dupModel, false, attrDate, dateCopyObject(newStartDate));
            }
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 192);
return dupModel;
        };
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 194);
markOriginal = function(dupModel, model) {
            _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "markOriginal", 194);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 195);
instance._originalModels[getModelAttr(dupModel, 'clientId')] = model;
        };
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 197);
if (!infiniteView || !instance._abberantModelList || forceRebuild) {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 198);
instance._prevLastAbberantModelIndex = null;
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 199);
instance._originalModels.length = 0;
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 200);
if (instance._abberantModelList) {
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 201);
instance._abberantModelList.destroy();
            }
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 203);
instance._abberantModelList = modelListIsLazy ? new Y.LazyModelList() : new Y.ModelList();
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 204);
instance._abberantModelList.comparator = modelList && modelList.comparator;
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 205);
instance._abberantModelList.model = modelList.model;
        }
        // I choosed to split it up in 3 scenario's. This is a bit more code, but it makes runtime faster when
        // an easier configuration is used (probably most of the cases)
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 209);
if (attrEnddate && !attrCount) {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 210);
modelfunc = function(model) {
                _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "modelfunc", 210);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 211);
var modelDate = getModelAttr(model, attrDate),
                    modelEndDate = getModelAttr(model, attrEnddate),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes));
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 214);
if (dateIsValid(modelDate) && dateIsValid(modelEndDate)) {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 215);
if (!Lang.isNumber(duplicateEveryMinutes)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 216);
duplicateEveryMinutes = 1440;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 218);
pushDate = dateCopyObject(modelDate);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 219);
dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 220);
instance._abberantModelList.add(dupmodel);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 221);
markOriginal(dupmodel, model);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 222);
while (dayisGreater(modelEndDate, pushDate)) {
                        // duplicate pushDate, otherwise all subModels remain the same Date
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 224);
dateAddMinutes(pushDate, duplicateEveryMinutes);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 225);
dupmodel = duppedModel(model, pushDate, modelEndDate, duplicateEveryMinutes);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 226);
instance._abberantModelList.add(dupmodel);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 227);
markOriginal(dupmodel, model);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 231);
instance._abberantModelList.add(model);
                }
            };
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 235);
if (!attrEnddate && attrCount) {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 236);
modelfunc = function(model) {
                _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "modelfunc", 236);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 237);
var modelDate = getModelAttr(model, attrDate),
                    modelCount = getModelAttr(model, attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),
                    stepMinutes, i;
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 244);
if (!dateIsValid(modelDate)) {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 245);
instance._abberantModelList.add(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 248);
dupmodel = duppedModel(model, modelDate);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 249);
instance._abberantModelList.add(dupmodel);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 250);
markOriginal(dupmodel, model);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 251);
if (!Lang.isNumber(modelCount)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 252);
modelCount = 1;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 254);
if (!Lang.isNumber(modelIntervalMinutes)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 255);
modelIntervalMinutes = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 257);
if (!Lang.isNumber(modelIntervalHours)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 258);
modelIntervalHours = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 260);
if (!Lang.isNumber(modelIntervalDays)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 261);
modelIntervalDays = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 263);
if (!Lang.isNumber(modelIntervalMonths)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 264);
modelIntervalMonths = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 266);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 267);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 268);
stepMinutes = 1440;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 270);
pushDate = dateCopyObject(modelDate);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 271);
for (i=1; i<modelCount; i++) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 272);
if (stepMinutes>0) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 273);
dateAddMinutes(pushDate, stepMinutes);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 275);
if (modelIntervalMonths>0) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 276);
dateAddMonths(pushDate, modelIntervalMonths);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 278);
dupmodel = duppedModel(model, pushDate);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 279);
instance._abberantModelList.add(dupmodel);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 280);
markOriginal(dupmodel, model);
                    }
                }
            };
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 285);
if (attrEnddate && attrCount) {
            // Make pushDate a Date object, so we can copy Date-values to it
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 287);
pushDate = new Date(0);
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 288);
modelfunc = function(model) {
                _yuitest_coverfunc("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", "modelfunc", 288);
_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 289);
var modelDate = getModelAttr(model, attrDate),
                    modelEndDate = getModelAttr(model, attrEnddate) || modelDate,
                    modelCount = getModelAttr(model, attrCount) || 1,
                    modelIntervalMinutes = (attrIntervalMinutes && getModelAttr(model, attrIntervalMinutes)),
                    modelIntervalHours = (attrIntervalHours && getModelAttr(model, attrIntervalHours)),
                    modelIntervalDays = (attrIntervalDays && getModelAttr(model, attrIntervalDays)),
                    modelIntervalMonths = (attrIntervalMonths && getModelAttr(model, attrIntervalMonths)),
                    duplicateEveryMinutes = (attrDuplicateEveryMinutes && getModelAttr(model, attrDuplicateEveryMinutes)),
                    stepMinutes, startPushDate, endPushDate, i, validModelEndDate;
                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 298);
if (!dateIsValid(modelDate)) {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 299);
instance._abberantModelList.add(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 302);
if (!Lang.isNumber(duplicateEveryMinutes)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 303);
duplicateEveryMinutes = 1440;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 305);
dupmodel = duppedModel(model, modelDate, modelEndDate, duplicateEveryMinutes);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 306);
instance._abberantModelList.add(dupmodel);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 307);
markOriginal(dupmodel, model);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 308);
validModelEndDate = dateIsValid(modelEndDate);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 309);
if (!validModelEndDate) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 310);
modelEndDate = modelDate;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 312);
if (!Lang.isNumber(modelCount)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 313);
modelCount = 1;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 315);
if (!Lang.isNumber(modelIntervalMinutes)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 316);
modelIntervalMinutes = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 318);
if (!Lang.isNumber(modelIntervalHours)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 319);
modelIntervalHours = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 321);
if (!Lang.isNumber(modelIntervalDays)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 322);
modelIntervalDays = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 324);
if (!Lang.isNumber(modelIntervalMonths)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 325);
modelIntervalMonths = 0;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 327);
stepMinutes = (1440*modelIntervalDays) + (60*modelIntervalHours) + modelIntervalMinutes;
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 328);
if ((stepMinutes===0) && (modelIntervalMonths===0)) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 329);
stepMinutes = 1440;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 331);
startPushDate = dateCopyObject(modelDate);
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 332);
endPushDate = dateCopyObject(modelEndDate);
                    // duplicate based on enddate
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 334);
if (validModelEndDate) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 335);
pushDate = dateCopyObject(startPushDate);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 336);
while (dayisGreater(endPushDate, pushDate)) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 337);
dateAddMinutes(pushDate, duplicateEveryMinutes);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 338);
dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 339);
instance._abberantModelList.add(dupmodel);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 340);
markOriginal(dupmodel, model);
                        }
                    }
                    // now duplicate based on interval
                    _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 344);
for (i=1; i<modelCount; i++) {
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 345);
if (stepMinutes>0) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 346);
dateAddMinutes(startPushDate, stepMinutes);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 347);
dateAddMinutes(endPushDate, stepMinutes);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 349);
if (modelIntervalMonths>0) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 350);
dateAddMonths(startPushDate, modelIntervalMonths);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 351);
dateAddMonths(endPushDate, modelIntervalMonths);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 353);
dupmodel = duppedModel(model, startPushDate, endPushDate, duplicateEveryMinutes, true);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 354);
instance._abberantModelList.add(dupmodel);
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 355);
markOriginal(dupmodel, model);
                        // also duplicate based on enddate
                        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 357);
if (validModelEndDate) {
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 358);
pushDate = dateCopyObject(startPushDate);
                            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 359);
while (dayisGreater(endPushDate, pushDate)) {
                                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 360);
dateAddMinutes(pushDate, duplicateEveryMinutes);
                                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 361);
dupmodel = duppedModel(model, pushDate, endPushDate, duplicateEveryMinutes, true);
                                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 362);
instance._abberantModelList.add(dupmodel);
                                _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 363);
markOriginal(dupmodel, model);
                            }
                        }
                    }
                }
            };
        }}}
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 370);
firstIndex = (instance._prevLastAbberantModelIndex || -1) + 1;
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 371);
instance._prevLastAbberantModelIndex = lastIndex = modelList.size()-1;
        _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 372);
for (i=firstIndex; i<=lastIndex; i++) {
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 373);
genModel = modelList.item(i);
            _yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 374);
modelfunc(genModel);
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 380);
Y.ScrollView.ITSAScrollViewDupModelsExtention = ITSAScrollViewDupModelsExtention;

_yuitest_coverline("build/gallery-itsascrollviewdupmodels/gallery-itsascrollviewdupmodels.js", 382);
Y.Base.mix(Y.ScrollView, [ITSAScrollViewDupModelsExtention]);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "node-base",
        "model-list",
        "datatype-date-math",
        "gallery-itsascrollviewmodellist"
    ]
});
