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
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js",
    code: []
};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].code=["YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * @module gallery-itsamodellistviewextention"," * @class ITSAModellistViewExtention"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    YTemplateMicro = Y.Template.Micro,","    VIEW_TEMPLATE = '<ul role=\"presentation\"></ul>',","    VIEW_MODEL_TEMPLATE = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE = '<li></li>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-scrollviewmodel',","    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',","    SVML_CLASS = 'itsa-scrollviewmodellist',","    SVML_NOINITIALITEMS_CLASS = SVML_CLASS + '-noinitialitems',","    SVML_VIEW_NOINITIALITEMS_CLASS = SVML_CLASS + '-view-noinitialitems',","    SVML_NOITEMS_CLASS = SVML_CLASS + '-noitems',","    SVML_VIEW_NOITEMS_CLASS = SVML_CLASS + '-view-noitems',","    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = SVML_CLASS + '-styled',","    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","//===============================================================================================","// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes","// We mix it to both Y.LazyModelList as well as Y.ModelList","// this way we can always call these methods regardsless of a ModelList or LazyModelList as used","//===============================================================================================","","function ITSAModellistAttrExtention() {}","","Y.mix(ITSAModellistAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                revivedModel = instance.revive(model);","                model[name] = value;","                if (revivedModel) {","                    //======================================================================================","                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530","                    //","                    revivedModel._set('clientId', model.clientId, {silent: true});","                    //","                    //======================================================================================","                    revivedModel.set(name, value, options);","                    instance.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","    }","","}, true);","","Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;","","Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);","//Y.Base.mix(Y.LazyModelList, [ITSAModellistAttrExtention]);","","// -- Mixing extra Methods to Y.ScrollView -----------------------------------","","function ITSAModellistViewExtention() {}","","ITSAModellistViewExtention.ATTRS = {","","   /**","    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","    *","    * @attribute modelList","    * @type {ModelList}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setNoDups'","    },","","   /**","    * Limits the number of rendered Models. The value of 0 means: no limit.","    *","    * @attribute limitModels","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    limitModels: {","        value: 0,","        validator: function(v){ return Lang.isNumber(v);},","        setter: '_setLimitModels'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi', 'null' or '' equals false.","    *","    * @default false","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: null,","        lazyAdd: false,","        validator:  function(v) {","            return ((v==='') || (v===null) || Lang.isBoolean(v) || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSel'","    },","","   /**","    * If set, then there ALWAYS REMAINS 1 Model selected.","    * <i>Only accounts when 'modelsSelectable' is active.","    *","    * @default true","    * @attribute modelsUnselectable","    * @type {Boolean}","    * @since 0.1","    */","    modelsUnselectable: {","        value: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        }","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default false","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: false,","        lazyAdd: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return (Lang.isNumber(v) && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setClkEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-dblclick.","    * When set to true, the events 'modelDblclicked' is fired when double-clicking on the Models.","    *","    * @attribute dblclickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    dblclickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setDblclkEv'","    },","","   /**","    * When set to a value > 0, the Models will be m highlighted whenever they change (or new added).","    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.","    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-scrollviewmodel-changed' fors ome seconds.","    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.","    *","    * @attribute highlightAfterModelChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    highlightAfterModelChange: {","        value: 0,","        validator: function(v) {return Lang.isNumber(v);},","        setter: '_setMarkModelChange'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterAdd","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterAdd: {","        value: false,","        validator: function(v) {return (Lang.isNumber(v) && (v>=0) && (v<=2));},","        setter: '_setIntoViewAdded'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after a ModelChange.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterChange: {","        value: false,","        validator: function(v) {return (Lang.isNumber(v) && (v>=0) && (v<=2));},","        setter: '_setIntoViewChanged'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setMouseDnUpEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setHoverEv'","    },","","    /**","     * Can make the last element be fixed to the bottom/right edge, but to the top/left edge.","     * 0 = not active (normal behaviour, bottom/right)","     * 1 = active: on top/left edge","     * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item","     *","     * @attribute lastItemOnTop","     * @type {Int}","     * @default 0","     * @since 0.1","     */","    lastItemOnTop: {","        value: 0,","        validator: function(v){ return (Lang.isNumber(v) && (v>-1) && (v<3));},","        setter: '_setLastItemOnTop'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH3'","    },","","    /**","     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderModel","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    renderModel: {","        value: '{clientId}', // default-template, so that there always is content. Best to be overwritten.","        validator: function(v){ return Lang.isString(v); },","        setter: '_setRenderModel'","    },","","    /**","     * Template for rendering of groupHeader1. If not set, renderGroupHeader1 will render the same as the attribute 'groupHeader1'.","     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader1: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH1'","    },","","    /**","     * Template for rendering of groupHeader2. If not set, renderGroupHeader2 will render the same as the attribute 'groupHeader2'.","     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader2: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH2'","    },","","    /**","     * Template for rendering of groupHeader3. If not set, renderGroupHeader3 will render the same as the attribute 'groupHeader3'.","     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader3: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH3'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'renderModel').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setDupComp'","    }","","};","","Y.mix(ITSAModellistViewExtention.prototype, {","","    //-------------------------------------------------------------------------------------","    //---- Private properties -------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Internal list that holds event-references","     * @property _handlers","     * @private","     * @default []","     * @type Array","    */","    _handlers : [],","","    /**","     * Internal reference to the original models, which is only used when DupModels are avaialble.","     * It makes it posible to return the original models on a modelClick-event.","     * @property _origModels","     * @private","     * @default []","     * @type Array","    */","    _origModels : [],","","    /**","     * Internal eventhandle, defined when the attribute 'selectedModels' is used.","     * @property _selModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _selModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'clickEvents' is used.","     * @property _clkModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _clkModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.","     * @property _dblclkModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _dblclkModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","     * @property _mouseentModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseentModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","     * @property _mouseUpModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseUpModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","     * @property _mouseDnModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseDnModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","     * @property _mouseleaveModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseleaveModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","     * @property _markModelChangeEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _markModelChangeEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","     * @property _markModelAddEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _markModelAddEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.","     * @property _modelInViewChanged","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _modelInViewChanged : null,","","    /**","     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.","     * @property _modelInViewAdded","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _modelInViewAdded : null,","","    /**","     * Internal object with references to all selected Models.","     * @property _selectedModels","     * @private","     * @default {}","     * @type Object","    */","    _selectedModels : {},","","    /**","     * Internal reference to the viewNode","     * @property _viewNode","     * @private","     * @default null","     * @type Y.Node","    */","    _viewNode : null,","","    /**","     * The id of _viewNode","     * @property _viewId","     * @private","     * @default null","     * @type String","    */","    _viewId : null,","","    /**","     * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.","     * @property _currentViewPg","     * @private","     * @default 0","     * @type Int","    */","    _currentViewPg : 0,","","    /**","     * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.","     * @property _templFns","     * @private","     * @default null","     * @type Object","    */","    _templFns : null,","","    /**","     * Internal reference to the last Model that was clicked.","     * @property _lastClkModel","     * @private","     * @default null","     * @type Y.Model","    */","    _lastClkModel : null,","","    /**","     * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.","     * @property _abModelList","     * @private","     * @default null","     * @type Y.ModelList | Y.LazyModelList","    */","    _abModelList : null,","","    /**","     * Internal flag to tell whether the attribute 'viewFilter' is initiated.","     * @property _viewFilterInit","     * @private","     * @default false","     * @type Boolean","    */","    _viewFilterInit : false,","","    /**","     * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.","     * @property _lastItemTopInit","     * @private","     * @default false","     * @type Boolean","    */","    _lastItemTopInit : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader1' is initiated.","     * @property _grpH1Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH1Init : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader2' is initiated.","     * @property _grpH2Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH2Init : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader3' is initiated.","     * @property _grpH3Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH3Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader1' is initiated.","     * @property _renderGrpH1Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH1Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader2' is initiated.","     * @property _renderGrpH2Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH2Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader3' is initiated.","     * @property _renderGrpH3Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH3Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderModel' is initiated.","     * @property _renderModelInit","     * @private","     * @default false","     * @type Boolean","    */","    _renderModelInit : false,","","    /**","     * Internal flag to tell whether the attribute 'dupComparator' is initiated.","     * @property _dupCompInit","     * @private","     * @default false","     * @type Boolean","    */","    _dupCompInit : false,","","    /**","     * Internal flag to tell whether the attribute 'noDups' is initiated.","     * @property _noDupsInit","     * @private","     * @default false","     * @type Boolean","    */","    _noDupsInit : false,","","    /**","     * Internal flag to tell whether the attribute 'limitModels' is initiated.","     * @property _limModelsInit","     * @private","     * @default false","     * @type Boolean","    */","    _limModelsInit : false,","","    /**","     * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.","     * @property _rerendAttrChg","     * @private","     * @default true","     * @type Boolean","    */","    _rerendAttrChg : true,","","    /**","     * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.","     * @property _itmsAvail","     * @private","     * @default true","     * @type Boolean","    */","    _itmsAvail : true, // must initially be set true","","    /**","     * Internal refrence to the index of the last rendered Model in the View.","     * @property _prevLastModelIndex","     * @private","     * @default -1","     * @type Int","    */","    _prevLastModelIndex : -1,","","    /**","     * Internal flag that tells is the used ModelList is a LazyModelList.","     * @property _listLazy","     * @private","     * @default false","     * @type Boolean","    */","    _listLazy : false,","","    /**","     * The content of the last rendered Header1","     * @property _prevH1","     * @private","     * @default null","     * @type String|null","    */","    _prevH1 : null,","","    /**","     * The content of the last rendered Header2","     * @property _prevH2","     * @private","     * @default null","     * @type String|null","    */","    _prevH2 : null,","","    /**","     * The content of the last rendered Header3","     * @property _prevH3","     * @private","     * @default null","     * @type String|null","    */","    _prevH3 : null,","","    /**","     * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.","     * @property _even","     * @private","     * @default false","     * @type Boolean","    */","    _even : false,","","    //-------------------------------------------------------------------------------------","    //---- Public methods -----------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        instance._viewId = Y.guid();","        instance._handlers.push(","            instance.after(","                'render',","                instance._render,","                instance","            )","        );","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerendAttrChg = false;","        instance.set(name, val, opts);","        instance._rerendAttrChg = true;","    },","","    /**","     * Retreives the Li-Node given the index from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromIndex","     * @param {Int} index Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromIndex : function(index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(null, index, maxExpansions);","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromModel","     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromModel : function(model, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(model, null, maxExpansions);","    },","","    /**","     * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","     *","     * @method saveScrollTo","     * @param x {Int} The x-position to scroll to. (null for no movement)","     * @param y {Int} The y-position to scroll to. (null for no movement)","     * @since 0.1","     *","    */","    saveScrollTo : function(x, y) {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            viewNode = instance._viewNode,","            max;","","        if (x) {","            x = Math.max(0, x);","            max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","            x = Math.min(x, max);","        }","        if (y) {","            y = Math.max(0, y);","            max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","            y = Math.min(y, max);","        }","        instance.scrollTo(x, y);","    },","","    /**","     * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear","     * on top. Items that are after the view: will appear on bottom.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the third param is needed.","     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","     *","     * @method scrollIntoView","     * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.","     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.","     *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and","     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    scrollIntoView : function(item, options, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),","            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),","            viewNode = instance._viewNode,","            infiniteView = instance.itsainfiniteview,","            paginatorPlugin = instance.pages,","            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,","            onTop, nodePosition, modelNodeSize, corrected, prevNode;","","        getNodePosition = function(node) {","            // returns -1 if (partial) before viewNode","            // returns 0 if inside viewNode","            // returns 1 if (partial) after viewNode","            var nodeLowerEdge = yAxis ? node.getY() : node.getX(),","                nodeUpperEdge;","            if (yAxis) {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');","            }","            else {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');","            }","","            if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {","                return -1;","            }","            else if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {","                return 1;","            }","            else {","                return 0;","            }","        };","        if (item instanceof Y.Node) {","            // we passed a Node","            modelNode = item;","        }","        if (modelNode || Lang.isNumber(item)) {","            modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // increase the modelIndex --> paginator is pased on all LI's, not just the Models","                liElements = viewNode.all('>li');","                liElements.some(","                    function(node, index) {","                        if (!node.hasClass(MODEL_CLASS)) {","                            item++;","                        }","                        return index===item;","                    }","                );","            }","        }","        else {","            modelNode = item && instance.getNodeFromModel(item, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // transform model to an index","                liElements = viewNode.all('>li');","                item = 0;","                liElements.some(","                    function(node, index) {","                        var found = (node===modelNode);","                        if (found) {","                            item = index;","                        }","                        return found;","                    }","                );","            }","        }","        if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {","            instance._focusModelNode(modelNode);","        }","        if ((modelNode) && (nodePosition!==0)) {","            onTop = (nodePosition===-1);","            if (onTop && options && Lang.isBoolean(options.showHeaders) && options.showHeaders) {","                // we need to bring into view the headernode","                prevNode = modelNode.previous();","                while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {","                    modelNode = prevNode;","                    prevNode = prevNode.previous();","                }","            }","            if (yAxis) {","                modelNodeEdge = modelNode.getY();","                currentOffset = instance.get('scrollY');","                modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;","            }","            else {","                modelNodeEdge = modelNode.getX();","                currentOffset = instance.get('scrollX');","                modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;","            }","            // You might need to expand the list in case ITSAInifiniteView is pluged-in AND maxOffset<newOffset","            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available","            if (infiniteView && !onTop) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","                infiniteView.checkExpansion();","            }","            if (paginatorPlugin) {","                if (!onTop) {","                    while ((modelNodeSize<boundingBoxSize) && (item>0)) {","                        corrected = true;","                        item--;","                        modelNode = modelNode.previous('li');","                        if (yAxis) {","                            modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                        }","                        else {","                            modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                        }","                    }","                    if (corrected) {","                        item++;","                    }","                    item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));","                }","                paginatorPlugin.scrollToIndex(item);","            }","            else {","                newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));","                if (yAxis) {","                    instance.saveScrollTo(null, newOffset);","                }","                else {","                    instance.saveScrollTo(newOffset, null);","                }","            }","        }","        else {","            if (!modelNode) {","            }","            else {","            }","        }","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            isArray = Lang.isArray(models),","            singleSelectable = (instance.get('modelsSelectable')==='single'),","            prevSize, contentBox;","","        if (singleSelectable) {","            instance.clearSelectedModels(true, true);","        }","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","","        if (isArray && !singleSelectable) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true, maxExpansions);","                }","            );","            if (scrollIntoView && (models.length>0)) {","                instance.scrollIntoView(models[0], options, maxExpansions);","            }","        }","        else {","            if (isArray) {","                models = models[0];","            }","            instance._selectModel(models, true, maxExpansions);","            if (scrollIntoView) {","                instance.scrollIntoView(models, options, maxExpansions);","            }","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @since 0.1","    */","    unselectModels : function(models, silent) {","        var instance = this,","            prevSize, contentBox;","","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false);","                }","            );","        }","        else {","            instance._selectModel(models, false);","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.","     * @since 0.1","    */","    clearSelectedModels : function(silent, force) {","        var instance = this,","            contentBox = instance.get('contentBox'),","            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;","","        blurAll = function() {","            currentSelected.each(","                function(node) {","                    node.blur();","                }","            );","        };","        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);","        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);","        if (silent) {","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","        }","        else {","            fireEvent = (currentSelected.size()>0);","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","            if (fireEvent) {","                instance._fireSelectedModels();","            }","        }","        instance._selectedModels = {};","        if (instance.get('modelsUnselectable') && firstSelected && !force) {","            clientId = firstSelected.getData('modelClientId');","            modelList = instance.getModelListInUse();","            model = modelList.getByClientId(clientId);","            instance.selectModels(model, false, null, true);","        }","    },","","    /**","     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _origModels, then it has an originalModel","                    var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Normal speaken, you only need to call this method yourself, when the ModelList.comparator changes.","     * The viewNode will be updated automaticly when attributes change, or when the (Lazy)-ModelList changes, or when","     * Models change. Be aware though, that the Model needs to fire a *:change event in roder to make the changes happen. This means,","     * that if you are using a LazyModelList, then be sure the object is revived into a Model-instance.","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Returns the modellist that is responsible for building the items. Normally speaken, this is the attribute 'modelList'","     * itself. However, if DupModels are active, the list is axpanded and _abModelList is returned.","     *","     * @method getModelListInUse","     * @since 0.1","     *","    */","    getModelListInUse : function() {","        return this._abModelList || this.get('modelList');","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, modelList, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                modelList = instance.get('modelList');","                revivedModel = modelList.revive(model);","                model[name] = value;","                if (revivedModel) {","                    //======================================================================================","                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530","                    //","                    revivedModel._set('clientId', model.clientId, {silent: true});","                    //","                    //======================================================================================","                    revivedModel.set(name, value, options);","                    modelList.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selModelEv) {","            instance._selModelEv.detach();","        }","        if (instance._clkModelEv) {","            instance._clkModelEv.detach();","        }","        if (instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","        }","        if (instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","        }","        if (instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","        }","        if (instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","        }","        if (instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","        }","        if (instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","        }","        if (instance._markModelAddEv) {","            instance._markModelAddEv.detach();","        }","        if (instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","        }","        if (instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","        }","        instance._clearAbberantModelList();","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            viewNode;","","        instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);","        viewNode.set('id', instance._viewId);","        viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);","        instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);","        instance._templFns = instance._getAllTemplateFuncs();","        instance._extraBindUI();","        if (modellist) {","            instance._renderView(null, {incrementbuild: true, initbuild: true});","        }","    },","","    /**","     * Focusses the modelNode and adds the className 'itsa-scrollviewmodel-focus'.","     * Previous focussed Node will be unmarked.","     *","     * @method _focusModelNode","     * @param {Y.Node} modelNode the ModelNode that should gain focus.","     * @private","     * @since 0.1","     *","    */","    _focusModelNode: function(modelNode) {","        if (modelNode) {","            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);","            modelNode.addClass(SVML_FOCUS_CLASS);","            modelNode.focus();","        }","    },","","    /**","     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","     * bumbs too much.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the param is needed.","     *","     * @method _getMaxPaginatorGotoIndex","     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","     * This only applies when the ITSAInifiniteView is plugged in.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Int} maximum PaginatorIndex that should be called.","     * @private","     * @since 0.1","     *","    */","    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            paginator = instance.hasPlugin('pages'),","            modelList = instance.getModelListInUse(),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","            i = 0,","            lastNode, size, liElements;","","        if (paginator && (modelList.size()>0)) {","            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);","            if (yAxis) {","                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","            }","            else {","                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","            }","            liElements = instance._viewNode.all('>li');","            i = liElements.size();","            while (lastNode && (--i>=0) && (size<boundingSize)) {","                lastNode = liElements.item(i);","                if (yAxis) {","                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","            }","            if (size>=boundingSize) {i++;}","        }","        return i;","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._handlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(SVML_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(SVML_CLASS);","                    instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});","                }","                else {","                    boundingBox.removeClass(SVML_CLASS);","                    instance.get('contentBox').setHTML('');","                }","            })","        );","        // This was a though one!!","        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null","        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()","        // Thus, we need to reset _gesture when click without movement","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function() {","                    instance._gesture = null;","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction);","                }","            )","        );","        //========================================================","        //","        // LACK IN ModelList --> make resort after *:change","        //","        //=======================================================","        eventhandlers.push(","            instance.after(","                '*:change',","                function() {","                    var modellist = instance.get('modelList');","                    if (modellist && instance.get('modelList').comparator) {","                        modellist.sort();","                    }","                }","            )","        );","        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function(e) {","                    // Prevent links from navigating as part of a scroll gesture","                    var lastScrolledAmt = instance.lastScrolledAmt;","                    if (lastScrolledAmt && (Math.abs(lastScrolledAmt) > instance.get('clickSensivity'))) {","                        e.preventDefault();","                        e.stopImmediatePropagation();","                    }","                },","                function() {","                    var tagName = this.get('tagName');","                    return ((tagName==='A') || (tagName==='BUTTON'));","                }","            )","        );","        // also prevent default on mousedown, to prevent the native \"drag link to desktop\" behavior on certain browsers.","        eventhandlers.push(","            boundingBox.delegate(","                'mousedown',","                function(e) {","                    // Prevent default anchor drag behavior, on browsers","                    // which let you drag anchors to the desktop","                    e.preventDefault();","                },","                'a'","            )","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after(","                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add', '*:change'],","                Y.bind(instance._renderView, instance, null, null)","            )","        );","        eventhandlers.push(","            instance.after(","                ['modelList:reset', 'lazyModelList:reset'],","                Y.bind(instance._renderView, instance, null, {keepstyles: false})","            )","        );","        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,","        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute","        instance.get('highlightAfterModelChange');","        instance.get('modelsIntoViewAfterAdd');","        instance.get('modelsIntoViewAfterChange');","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        instance._listLazy = (val instanceof Y.LazyModelList);","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._noDupsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._noDupsInit = true;","        }","    },","","    /**","     * Setter for attribute limitModels. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLimitModels","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLimitModels : function(val) {","        var instance = this;","","        if (instance._limModelsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({limitModels: val});","            }","        }","        else {","            instance._limModelsInit = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._viewFilterInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._viewFilterInit = true;","        }","    },","","    /**","     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLastItemOnTop","     * @param {Boolean} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLastItemOnTop : function(val) {","        var instance = this;","","        if (instance._lastItemTopInit) {","            if (val) {","                instance._addEmptyItem(null, val);","                instance.syncUI();","            }","            else {","                instance._removeEmptyItem();","                instance.syncUI();","            }","        }","        else {","            instance._lastItemTopInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComp","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComp : function(val) {","        var instance = this;","","        if (instance._dupCompInit) {","            if (instance._rerendAttrChg && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._dupCompInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH1 : function(val) {","        var instance = this;","","        if (instance._grpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView({groupHeader1: val});","            }","        }","        else {","            instance._grpH1Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH2 : function(val) {","        var instance = this;","","        if (instance._grpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView({groupHeader2: val});","            }","        }","        else {","            instance._grpH2Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH3 : function(val) {","        var instance = this;","","        if (instance._grpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView({groupHeader3: val});","            }","        }","        else {","            instance._grpH3Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH1 : function(val) {","        var instance = this;","","        if (instance._renderGrpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView({renderGroupHeader1: val});","            }","        }","        else {","            instance._renderGrpH1Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH2 : function(val) {","        var instance = this;","","        if (instance._renderGrpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView({renderGroupHeader2: val});","            }","        }","        else {","            instance._renderGrpH2Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH3 : function(val) {","        var instance = this;","","        if (instance._renderGrpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView({renderGroupHeader3: val});","            }","        }","        else {","            instance._renderGrpH3Init = true;","        }","    },","","    /**","     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderModel","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderModel : function(val) {","        var instance = this;","","        if (instance._renderModelInit) {","            instance._templFns = instance._getAllTemplateFuncs({renderModel: val});","            if (instance._rerendAttrChg) {","                instance._renderView({renderModel: val});","            }","        }","        else {","            instance._renderModelInit = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selModelEv.","     *","     * @method _setModelsSel","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSel : function(val) {","        var instance = this;","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selModelEv) {","            instance._selModelEv = contentBox.delegate(","                'click',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selModelEv) {","            instance._selModelEv.detach();","            instance._selModelEv = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clkModelEv = contentBox.delegate(","                'click',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clkModelEv) {","            instance._clkModelEv.detach();","            instance._clkModelEv = null;","        }","    },","","    /**","     * Sets or removes dblclick-events when the mouse double-clicks on a Model.","     *","     * @method _setDblclkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setDblclkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._dblclkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelDblclick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._dblclkModelEv = contentBox.delegate(","                'dblclick',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelDblclick', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","            instance._dblclkModelEv = null;","        }","    },","","    /**","     * Sets or removes highlight-effects after a Model is changed.","     *","     * @method _setMarkModelChange","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMarkModelChange : function(val) {","        var instance = this;","","        if (val && (val>0) && !instance._markModelChangeEv) {","            instance._markModelChangeEv = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node = instance.getNodeFromModel(model);","                    if (node) {","                        node.addClass(MODEL_CHANGED_CLASS);","                        Y.later(","                            val,","                            instance,","                            function() {","                                if (node) {","                                    node.removeClass(MODEL_CHANGED_CLASS);","                                }","                            }","                        );","                    }","                }","            );","        }","        else if (!val && instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","            instance._markModelChangeEv = null;","        }","        if (val && (val>0) && !instance._markModelAddEv) {","            instance._markModelAddEv = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    var node = instance.getNodeFromIndex(e.index);","                    if (node) {","                        node.addClass(MODEL_CHANGED_CLASS);","                        Y.later(","                            val,","                            instance,","                            function() {","                                if (node) {","                                    node.removeClass(MODEL_CHANGED_CLASS);","                                }","                            }","                        );","                    }","                }","            );","        }","        else if (!val && instance._markModelAddEv) {","            instance._markModelAddEv.detach();","            instance._markModelAddEv = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is added to the list.","     *","     * @method _setIntoViewAdded","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewAdded : function(val) {","        var instance = this;","","        if ((val >0) && !instance._modelInViewAdded) {","            instance._modelInViewAdded = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});","                }","            );","        }","        else if ((val===0) && instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","            instance._modelInViewAdded = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is changed.","     *","     * @method _setIntoViewChanged","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewChanged : function(val) {","        var instance = this;","","        if ((val>0) && !instance._modelInViewChanged) {","            instance._modelInViewChanged = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node = instance.getNodeFromModel(model);","                    if (node) {","                        instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});","                    }","                }","            );","        }","        else if ((val===0) && instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","            instance._modelInViewChanged = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDnUpEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDnUpEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDnModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDnModelEv = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","            instance._mouseDnModelEv = null;","        }","        if (val && !instance._mouseUpModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEv = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","            instance._mouseUpModelEv = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseentModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseentModelEv = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","            instance._mouseentModelEv = null;","        }","        if (val && !instance._mouseleaveModelEv) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEv = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","            instance._mouseleaveModelEv = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance.getModelListInUse(),","            modelClientId = modelNode.getData('modelClientId'),","            model = modelList && modelList.getByClientId(modelClientId),","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,","            currentSelected, firstItemSelected;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        if (model) {","            // At this stage, 'modelsSelectable' is either 'single' or 'multi'","            if (singleSelectable || !ctrlClick) {","                if (instance.get('modelsUnselectable')) {","                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);","                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);","                }","                instance.clearSelectedModels(true, true);","            }","            if (shiftClick && instance._lastClkModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClkModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels, false, null, true);","            }","            else {","                if (modelPrevSelected && !firstItemSelected) {","                    instance.unselectModels(model, true);","                }","                else {","                    instance.selectModels(model, false, null, true);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClkModel = modelPrevSelected ? null : model;","            }","            instance._focusModelNode(modelNode);","        }","        instance._fireSelectedModels();","    },","","    /**","     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.","     *","     * @method _getAllTemplateFuncs","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @private","     * @return {Object} All templates --> an object with the fields: <b>renderModel, groupH1, groupH2, groupH3, renderGH1, renderGH1, renderGH1,","     * activeGH1, activeGH2, activeGH3</b>. The last 3 keys are Booleans, the other are templates.","     * @since 0.1","     *","    */","    _getAllTemplateFuncs : function(setterAttrs) {","        var instance = this,","            renderModel = (setterAttrs && setterAttrs.renderModel) || instance.get('renderModel'),","            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),","            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),","            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),","            renderGH1 = (setterAttrs && setterAttrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupH1,","            renderGH2 = (setterAttrs && setterAttrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupH2,","            renderGH3 = (setterAttrs && setterAttrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupH3,","            activeGH1 = groupH1 && (groupH1.length>0),","            activeGH2 = groupH2 && (groupH2.length>0),","            activeGH3 = groupH3 && (groupH3.length>0),","            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,","            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,","            compiledRenderGH3Engine, templateObject, isMicroTemplate;","","        isMicroTemplate = function(template) {","            var microTemplateRegExp = /<%(.+)%>/;","            return microTemplateRegExp.test(template);","        };","        if (isMicroTemplate(renderModel)) {","            compiledModelEngine = YTemplateMicro.compile(renderModel);","            modelEngine = function(model) {","                return compiledModelEngine(instance.getModelToJSON(model));","            };","        }","        else {","            modelEngine = function(model) {","                return Lang.sub(renderModel, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(groupH1)) {","            compiledGroupH1Engine = YTemplateMicro.compile(groupH1);","            groupH1Engine = function(model) {","                return compiledGroupH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH1Engine = function(model) {","                return Lang.sub(groupH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(groupH2)) {","            compiledGroupH2Engine = YTemplateMicro.compile(groupH2);","            groupH2Engine = function(model) {","                return compiledGroupH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH2Engine = function(model) {","                return Lang.sub(groupH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(groupH3)) {","            compiledGroupH3Engine = YTemplateMicro.compile(groupH3);","            groupH3Engine = function(model) {","                return compiledGroupH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH3Engine = function(model) {","                return Lang.sub(groupH3, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(renderGH1)) {","            compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);","            renderGH1Engine = function(model) {","                return compiledRenderGH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH1Engine = function(model) {","                return Lang.sub(renderGH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(renderGH2)) {","            compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);","            renderGH2Engine = function(model) {","                return compiledRenderGH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH2Engine = function(model) {","                return Lang.sub(renderGH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(renderGH3)) {","            compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);","            renderGH3Engine = function(model) {","                return compiledRenderGH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH3Engine = function(model) {","                return Lang.sub(renderGH3, instance.getModelToJSON(model));","            };","        }","        templateObject = {","            renderModel : modelEngine,","            groupH1 : groupH1Engine,","            groupH2 : groupH2Engine,","            groupH3 : groupH3Engine,","            renderGH1 : renderGH1Engine,","            renderGH2 : renderGH2Engine,","            renderGH3 : renderGH3Engine,","            activeGH1 : activeGH1,","            activeGH2 : activeGH2,","            activeGH3 : activeGH3","        };","        return templateObject;","    },","","    /**","     * Will try to render 'trymodel' through the template defined with tha attribute 'renderModel'.","     * Only succeeds if it passes all tests declared by the other params. Should it fail the tests, then 'false' is returned.","     * If succeeded, the the HTML (String) will be returned.","     *","     * @method _tryRenderModel","     * @param {Y.Model} trymodel The Model (might be an object in case of LazyModelList) to be rendered","     * @param {String} [prevrenderedmodel] The previous Model that was rendered: should be in a 'rendered-state'.","     * Is used to check against when nodups are permitted and dupComparator is undefined.","     * @param {Y.Array} modelListItemsArray (Lazy)ModelList in array-form","     * @param {Function} viewFilter the viewFilter function (attribute), passed as a parameter for performancereasons","     * @param {Boolean} noDups the value of the attribute 'nodups', passed as a parameter for performancereasons","     * @param {Function} dupComparator the dupComparator function (attribute), passed as a parameter for performancereasons","     * @param {Object} allTemplateFuncs passed as a parameter for performancereasons","     * @private","     * @return {HTML|false} false if failed -possibly because it's a dup or falls out of the filter-, otherwise returns the rendered HTML: rendered","     * through the 'renderModel'-template","     * @since 0.1","     *","    */","    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {","        var instance = this,","            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;","","        dubComparatorBinded = Y.rbind(dupComparator, instance);","        viewFilterBinded = Y.rbind(viewFilter, instance);","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dubComparatorBinded(model);","            YArray.some(","                modelListItemsArray,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dubComparatorBinded(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        allowed = (!viewFilter || viewFilterBinded(trymodel)) &&","                      (!noDups ||","                       (!dupComparator && ((renderedmodel = allTemplateFuncs.renderModel(trymodel))!==prevrenderedmodel)) ||","                       (dupComparator && !dupAvailable(trymodel))","                      );","        return allowed && (renderedmodel || allTemplateFuncs.renderModel(trymodel));","    },","","    _clearAbberantModelList : function() {","        var instance = this;","","        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","        if (instance._abModelList) {","            instance._abModelList.destroy();","        }","        instance._abModelList = null;","    },","","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","","     * @param {Object} [options]","     *    @param {Boolean} [options.rebuild=true] set to 'false' if you don't want to rebuild but want to add items at the end of the list","     *    unless the infiniteView-plugin is available OR limitModels>0","     *    @param {Int} [options.page=0] lets ITSAViewPagination make rendering pages","     *    @param {Boolean} [options.incrementbuild=false] if 'true': appends every element one by one.","     *    If 'false' the whole <ul> will be replaced at once.","     *    @param {Boolean} [options.keepstyles=true] set to 'false' if you don't want to retain selected/focused info (only when you 'reset' the list)","     *    @param {Boolean} [options.initbuild=false] internal flag to notify the initial build","     * @private","     * @since 0.1","    */","    _renderView : function(setterAttrs, options) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            noDups = (setterAttrs && setterAttrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAttrs && setterAttrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAttrs && setterAttrs.viewFilter) || instance.get('viewFilter'),","            paginator = instance.pages,","            changedLimitModels = (setterAttrs && setterAttrs.limitModels),","            limitModels = changedLimitModels || instance.get('limitModels'),","            allTemplateFuncs = instance._templFns,","            lastItemOnTop = (setterAttrs && setterAttrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            infiniteView = instance.itsainfiniteview,","            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,","            modelConfig, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,","            i, j, model, modelListItems, batchSize, items, modelListItemsLength;","","        options = options || {};","        options.page = options.page || instance._currentViewPg;","        pageSwitch = (instance._currentViewPg!==options.page);","        options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);","        options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;","        options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;","        if (!contentBox.one('#'+instance._viewId)) {","            contentBox.setHTML(viewNode);","            instance._set('srcNode', contentBox);","        }","        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (options.rebuild) {","            i = (options.page*limitModels) -1; // will be incread to zero at start loop","            instance._prevH1 = null;","            instance._prevH2 = null;","            instance._prevH3 = null;","            instance._even = false;","            if (infiniteView) {","                instance._itmsAvail = true;","            }","            instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);","            viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);","        }","        else {","            // start with the last index","            i = (instance._prevLastModelIndex || -1); // will be increased at start loop","        }","        if (!options.incrementbuild) {","            newViewNode = YNode.create(VIEW_TEMPLATE);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');","            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, options.rebuild);","                modelList = instance._abModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._clearAbberantModelList();","            }","        }","        else {","            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._clearAbberantModelList();","        }","","        // in case of ITSAViewPaginator is active --> limitModels is always>0","        renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;","        listIsLimited = (renderListLength<modelListItemsLength);","        items = 0;","        batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;","        if (i>0) {","            // when available: remove the fillNode that makes lastItemOnTop","            // It will be rendered on the bottom again","            instance._removeEmptyItem();","        }","        while ((items<batchSize) && (++i<renderListLength)) {","            model = modelListItems[i];","            renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,","                                                     dupComparator, allTemplateFuncs);","            if (renderedModel) {","                if (items===0) {","                    instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);","                    viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);","                    if (options.initbuild) {","                        instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);","                        viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);","                    }","                }","                items++;","                modelNode = instance._createModelNode(model, renderedModel);","                // modelNode is an ARRAY of Y.Node !!!","                for (j=0; j<modelNode.length; j++) {","                    if (options.incrementbuild) {","                        viewNode.append(modelNode[j]);","                    }","                    else {","                        newViewNode.append(modelNode[j]);","                    }","                }","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i - 1;","        if (!options.incrementbuild) {","            if (options.keepstyles) {","                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first","                findNodeByClientId = function(modelClientId, nodelist) {","                    var nodeFound;","                    nodelist.some(","                        function(node) {","                            var found = (node.getData('modelClientId') === modelClientId);","                            if (found) {","                                nodeFound = node;","                            }","                            return found;","                        }","                    );","                    return nodeFound;","                };","                previousViewModels = viewNode.all('.'+MODEL_CLASS);","                newViewModels = newViewNode.all('.'+MODEL_CLASS);","                previousViewModels.each(","                    function(node) {","                        var hasSelected = node.hasClass(SVML_SELECTED_CLASS),","                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),","                            newnode;","                        if (hasSelected || hasFocus) {","                            newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);","                            if (newnode) {","                                newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);","                                newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);","                            }","                        }","                    }","                );","            }","            viewNode.replace(newViewNode);","            instance._viewNode = newViewNode;","            newViewNode.set('id', instance._viewId);","        }","        if (modelNode && lastItemOnTop && (!infiniteView || !instance._itmsAvail || listIsLimited)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!","            instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);","        }","        instance._currentViewPg = options.page;","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","//========================================================","        // now a correction of PaginatorPlugin-bug:","        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin","        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown","        if (paginator) {","            currentPaginatorIndex = paginator.get('index');","            maxPaginatorIndex = viewNode.get('children').size() - 1;","            if (currentPaginatorIndex > maxPaginatorIndex) {","                paginator.set('index', maxPaginatorIndex);","            }","        }","//========================================================","        if (infiniteView) {","            infiniteView.checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","// return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.","    _createModelNode : function(model, renderedModel) {","        var instance = this,","            modelClientId = instance.getModelAttr(model, 'clientId'),","            nodes = [],","            modelNode = YNode.create(VIEW_MODEL_TEMPLATE),","            header1, header2, header3, headerNode, allTemplateFuncs;","","        allTemplateFuncs = instance._templFns;","        if (allTemplateFuncs.activeGH1) {","            header1 = allTemplateFuncs.groupH1(model);","            if (header1!==instance._prevH1) {","                headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER1_CLASS);","                if (instance._prevH1) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH1(model));","                nodes.push(headerNode);","                instance._prevH1 = header1;","                instance._even = false;","                // force to make a header2 insertion (when appropriate)","                instance._prevH2 = null;","            }","        }","        if (allTemplateFuncs.activeGH2) {","            header2 = allTemplateFuncs.groupH2(model);","            if (header2!==instance._prevH2) {","                headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER2_CLASS);","                if (instance._prevH2) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH2(model));","                nodes.push(headerNode);","                instance._prevH2 = header2;","                instance._even = false;","                // force to make a header3 insertion (when appropriate)","                instance._prevH3 = null;","            }","        }","        if (allTemplateFuncs.activeGH3) {","            header3 = allTemplateFuncs.groupH3(model);","            if (header3!==instance._prevH3) {","                headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER3_CLASS);","                if (instance._prevH3) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH3(model));","                nodes.push(headerNode);","                instance._prevH3 = header3;","                instance._even = false;","            }","        }","        modelNode.setData('modelClientId', modelClientId);","        modelNode.addClass(MODEL_CLASS);","        modelNode.addClass(modelClientId);","        modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","        modelNode.setHTML(renderedModel || allTemplateFuncs.renderModel(model));","        nodes.push(modelNode);","        return nodes;","    },","","    /**","     * Adds an empty item to make the lastItemOnTop (or left).","     * Does not remove the previous one -if available-. If nescesairy, you need to do this manually with _removeEmptyItem.","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _addEmptyItem","     * @param {Y.Node} [lastModelNode] Reference to the last node in the scrollview-instance.","     * @param {Int} [lastItemOnTop] internal pass through of lastItemOnTop","     * @private","     * @since 0.1","    */","    _addEmptyItem : function(lastModelNode, lastItemOnTop) {","        var instance = this,","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBox = instance.get('boundingBox'),","            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),","            viewNode = instance._viewNode,","            modelNode, viewsize, elementsize, modelElements,modelElementsSize;","","        if (!lastModelNode) {","            modelElements = viewNode.all('.'+MODEL_CLASS);","            modelElementsSize = modelElements.size();","            if (modelElementsSize>0) {","                lastModelNode = modelElements.item(modelElementsSize-1);","            }","        }","        modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),","        modelNode.addClass(EMPTY_ELEMENT_CLASS);","        viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');","        if (lastModelNode) {","            if (yAxis) {","                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');","            }","            else {","                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');","            }","        }","        lastModelNode = lastModelNode && lastModelNode.previous();","        if (itemOnTopValue===2) {","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                if (yAxis) {","                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));","                }","                else {","                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));","                }","                lastModelNode = lastModelNode.previous();","            }","        }","        modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');","        if (elementsize>0) {","            viewNode.append(modelNode);","        }","    },","","    /**","     * Removes the empty item that made the lastItemOnTop (or left).","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _removeEmptyItem","     * @private","     * @since 0.1","    */","    _removeEmptyItem : function() {","        var instance = this,","            removeNode;","","        removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);","        if (removeNode) {","            removeNode.remove(true);","        }","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList, or the index,","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method _getNodeFromModelOrIndex","     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [index] Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @private","     * @since 0.1","    */","    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),","            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),","            i = 0,","            nodeFound = false,","            nodeList, findNode, modelClientId;","","        if (model) {","            modelClientId = instance.getModelAttr(model, 'clientId');","        }","        findNode = function(node, loopindex) {","            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);","            if (found) {","                nodeFound = node;","            }","            return found;","        };","        do {","            nodeList = instance._viewNode.all('.'+MODEL_CLASS);","            nodeList.some(findNode);","            i++;","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());","        return nodeFound;","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),","            modelnode;","","        if (modelid && !itemUnselectable) {","            if (instance.hasPlugin('itsainfiniteview')) {","                // make sure the node is rendered","                instance._getNodeFromModelOrIndex(model, null, maxExpansions);","            }","            // each modelid-class should be present only once","            modelnode = contentBox.one('.'+modelid);","            if (modelnode) {","                if (!selectstatus) {","                    modelnode.blur();","                }","                modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","            if (!modelid) {","            }","            else {","            }","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned.","         *","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>","         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel","         * <b>is not part</b> of the original ModelList.","         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.","         * These models also exists in the original ModelList.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._handlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ITSAModellistViewExtention = ITSAModellistViewExtention;","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"dom-screen\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].lines = {"1":0,"3":0,"19":0,"46":0,"55":0,"57":0,"71":0,"92":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"104":0,"107":0,"108":0,"112":0,"129":0,"134":0,"136":0,"141":0,"143":0,"156":0,"174":0,"188":0,"206":0,"224":0,"241":0,"262":0,"282":0,"300":0,"316":0,"333":0,"350":0,"367":0,"385":0,"401":0,"418":0,"441":0,"464":0,"487":0,"508":0,"532":0,"556":0,"580":0,"600":0,"606":0,"985":0,"987":0,"988":0,"1011":0,"1013":0,"1014":0,"1015":0,"1039":0,"1063":0,"1076":0,"1081":0,"1082":0,"1083":0,"1084":0,"1086":0,"1087":0,"1088":0,"1089":0,"1091":0,"1122":0,"1134":0,"1138":0,"1140":0,"1141":0,"1144":0,"1147":0,"1148":0,"1150":0,"1151":0,"1154":0,"1157":0,"1159":0,"1161":0,"1162":0,"1163":0,"1164":0,"1166":0,"1167":0,"1169":0,"1170":0,"1172":0,"1178":0,"1179":0,"1180":0,"1182":0,"1183":0,"1184":0,"1186":0,"1187":0,"1188":0,"1190":0,"1195":0,"1196":0,"1198":0,"1199":0,"1200":0,"1202":0,"1203":0,"1204":0,"1205":0,"1208":0,"1209":0,"1210":0,"1211":0,"1212":0,"1215":0,"1216":0,"1217":0,"1218":0,"1222":0,"1228":0,"1230":0,"1231":0,"1232":0,"1233":0,"1234":0,"1235":0,"1236":0,"1237":0,"1240":0,"1243":0,"1244":0,"1246":0,"1248":0,"1251":0,"1252":0,"1253":0,"1256":0,"1261":0,"1278":0,"1281":0,"1282":0,"1285":0,"1286":0,"1291":0,"1293":0,"1319":0,"1324":0,"1325":0,"1327":0,"1328":0,"1329":0,"1332":0,"1333":0,"1336":0,"1339":0,"1340":0,"1344":0,"1345":0,"1347":0,"1348":0,"1349":0,"1352":0,"1353":0,"1366":0,"1369":0,"1370":0,"1371":0,"1373":0,"1374":0,"1377":0,"1382":0,"1384":0,"1385":0,"1398":0,"1402":0,"1403":0,"1405":0,"1409":0,"1410":0,"1411":0,"1412":0,"1413":0,"1416":0,"1417":0,"1418":0,"1419":0,"1420":0,"1423":0,"1424":0,"1425":0,"1426":0,"1427":0,"1428":0,"1443":0,"1446":0,"1447":0,"1450":0,"1451":0,"1455":0,"1456":0,"1457":0,"1462":0,"1477":0,"1489":0,"1504":0,"1525":0,"1528":0,"1529":0,"1530":0,"1531":0,"1532":0,"1533":0,"1534":0,"1538":0,"1541":0,"1542":0,"1546":0,"1563":0,"1573":0,"1576":0,"1577":0,"1578":0,"1579":0,"1581":0,"1582":0,"1584":0,"1585":0,"1587":0,"1588":0,"1590":0,"1591":0,"1593":0,"1594":0,"1596":0,"1597":0,"1599":0,"1600":0,"1602":0,"1603":0,"1605":0,"1606":0,"1608":0,"1609":0,"1611":0,"1612":0,"1628":0,"1632":0,"1633":0,"1634":0,"1635":0,"1636":0,"1637":0,"1638":0,"1639":0,"1654":0,"1655":0,"1656":0,"1657":0,"1687":0,"1696":0,"1697":0,"1698":0,"1699":0,"1702":0,"1704":0,"1705":0,"1706":0,"1707":0,"1708":0,"1709":0,"1712":0,"1715":0,"1717":0,"1728":0,"1734":0,"1735":0,"1736":0,"1739":0,"1741":0,"1743":0,"1744":0,"1746":0,"1747":0,"1748":0,"1749":0,"1752":0,"1753":0,"1761":0,"1765":0,"1769":0,"1770":0,"1779":0,"1783":0,"1784":0,"1785":0,"1791":0,"1796":0,"1797":0,"1798":0,"1799":0,"1803":0,"1804":0,"1809":0,"1815":0,"1822":0,"1828":0,"1836":0,"1837":0,"1838":0,"1851":0,"1853":0,"1866":0,"1868":0,"1869":0,"1870":0,"1874":0,"1888":0,"1890":0,"1891":0,"1892":0,"1896":0,"1910":0,"1912":0,"1913":0,"1914":0,"1918":0,"1932":0,"1934":0,"1935":0,"1936":0,"1937":0,"1940":0,"1941":0,"1945":0,"1959":0,"1961":0,"1962":0,"1963":0,"1967":0,"1981":0,"1983":0,"1984":0,"1985":0,"1986":0,"1990":0,"2004":0,"2006":0,"2007":0,"2008":0,"2009":0,"2013":0,"2027":0,"2029":0,"2030":0,"2031":0,"2032":0,"2036":0,"2050":0,"2052":0,"2053":0,"2054":0,"2055":0,"2059":0,"2073":0,"2075":0,"2076":0,"2077":0,"2078":0,"2082":0,"2096":0,"2098":0,"2099":0,"2100":0,"2101":0,"2105":0,"2119":0,"2121":0,"2122":0,"2123":0,"2124":0,"2128":0,"2143":0,"2145":0,"2146":0,"2148":0,"2150":0,"2153":0,"2154":0,"2167":0,"2169":0,"2182":0,"2185":0,"2186":0,"2187":0,"2192":0,"2193":0,"2197":0,"2198":0,"2199":0,"2213":0,"2216":0,"2225":0,"2228":0,"2232":0,"2236":0,"2237":0,"2241":0,"2242":0,"2243":0,"2257":0,"2260":0,"2269":0,"2272":0,"2276":0,"2281":0,"2282":0,"2283":0,"2297":0,"2299":0,"2300":0,"2303":0,"2305":0,"2306":0,"2307":0,"2311":0,"2312":0,"2320":0,"2321":0,"2322":0,"2324":0,"2325":0,"2328":0,"2329":0,"2330":0,"2331":0,"2335":0,"2336":0,"2344":0,"2345":0,"2346":0,"2360":0,"2362":0,"2363":0,"2366":0,"2370":0,"2371":0,"2372":0,"2386":0,"2388":0,"2389":0,"2392":0,"2394":0,"2395":0,"2400":0,"2401":0,"2402":0,"2416":0,"2420":0,"2429":0,"2432":0,"2436":0,"2441":0,"2442":0,"2443":0,"2445":0,"2454":0,"2457":0,"2461":0,"2466":0,"2467":0,"2468":0,"2482":0,"2485":0,"2494":0,"2497":0,"2501":0,"2506":0,"2507":0,"2508":0,"2510":0,"2519":0,"2522":0,"2526":0,"2531":0,"2532":0,"2533":0,"2546":0,"2560":0,"2561":0,"2563":0,"2564":0,"2565":0,"2566":0,"2568":0,"2570":0,"2571":0,"2572":0,"2573":0,"2574":0,"2575":0,"2576":0,"2577":0,"2578":0,"2579":0,"2582":0,"2585":0,"2586":0,"2589":0,"2593":0,"2595":0,"2597":0,"2612":0,"2627":0,"2628":0,"2629":0,"2631":0,"2632":0,"2633":0,"2634":0,"2638":0,"2639":0,"2642":0,"2643":0,"2644":0,"2645":0,"2649":0,"2650":0,"2653":0,"2654":0,"2655":0,"2656":0,"2660":0,"2661":0,"2664":0,"2665":0,"2666":0,"2667":0,"2671":0,"2672":0,"2675":0,"2676":0,"2677":0,"2678":0,"2682":0,"2683":0,"2686":0,"2687":0,"2688":0,"2689":0,"2693":0,"2694":0,"2697":0,"2698":0,"2699":0,"2700":0,"2704":0,"2705":0,"2708":0,"2720":0,"2744":0,"2747":0,"2748":0,"2749":0,"2750":0,"2752":0,"2755":0,"2756":0,"2757":0,"2760":0,"2762":0,"2767":0,"2771":0,"2774":0,"2775":0,"2777":0,"2800":0,"2817":0,"2818":0,"2819":0,"2820":0,"2821":0,"2822":0,"2823":0,"2824":0,"2825":0,"2830":0,"2831":0,"2832":0,"2833":0,"2834":0,"2835":0,"2836":0,"2837":0,"2838":0,"2839":0,"2841":0,"2842":0,"2846":0,"2848":0,"2849":0,"2851":0,"2852":0,"2853":0,"2854":0,"2855":0,"2857":0,"2858":0,"2862":0,"2867":0,"2871":0,"2872":0,"2873":0,"2874":0,"2875":0,"2878":0,"2880":0,"2881":0,"2882":0,"2884":0,"2885":0,"2886":0,"2887":0,"2888":0,"2889":0,"2890":0,"2893":0,"2894":0,"2896":0,"2897":0,"2898":0,"2901":0,"2904":0,"2905":0,"2906":0,"2911":0,"2912":0,"2913":0,"2915":0,"2916":0,"2917":0,"2919":0,"2920":0,"2921":0,"2923":0,"2926":0,"2928":0,"2929":0,"2930":0,"2932":0,"2935":0,"2936":0,"2937":0,"2938":0,"2939":0,"2945":0,"2946":0,"2947":0,"2949":0,"2952":0,"2954":0,"2956":0,"2961":0,"2962":0,"2963":0,"2964":0,"2965":0,"2969":0,"2970":0,"2978":0,"2983":0,"2989":0,"2990":0,"2991":0,"2992":0,"2993":0,"2995":0,"2996":0,"2997":0,"2999":0,"3000":0,"3001":0,"3002":0,"3004":0,"3007":0,"3008":0,"3009":0,"3010":0,"3012":0,"3013":0,"3014":0,"3016":0,"3017":0,"3018":0,"3019":0,"3021":0,"3024":0,"3025":0,"3026":0,"3027":0,"3029":0,"3030":0,"3031":0,"3033":0,"3034":0,"3035":0,"3036":0,"3039":0,"3040":0,"3041":0,"3042":0,"3043":0,"3044":0,"3045":0,"3060":0,"3068":0,"3069":0,"3070":0,"3071":0,"3072":0,"3075":0,"3077":0,"3078":0,"3079":0,"3080":0,"3083":0,"3086":0,"3087":0,"3088":0,"3090":0,"3091":0,"3094":0,"3096":0,"3099":0,"3100":0,"3101":0,"3114":0,"3117":0,"3118":0,"3119":0,"3146":0,"3153":0,"3154":0,"3156":0,"3157":0,"3158":0,"3159":0,"3161":0,"3163":0,"3164":0,"3165":0,"3166":0,"3173":0,"3195":0,"3201":0,"3202":0,"3204":0,"3207":0,"3208":0,"3209":0,"3210":0,"3212":0,"3214":0,"3215":0,"3218":0,"3222":0,"3237":0,"3253":0,"3254":0,"3255":0,"3273":0,"3276":0,"3283":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].functions = {"GETSTYLE:45":0,"ITSAModellistAttrExtention:55":0,"getModelAttr:70":0,"setModelAttr:91":0,"getModelToJSON:128":0,"ITSAModellistViewExtention:141":0,"validator:156":0,"validator:174":0,"validator:188":0,"validator:206":0,"validator:223":0,"validator:240":0,"validator:261":0,"validator:281":0,"validator:300":0,"validator:316":0,"validator:333":0,"validator:350":0,"validator:367":0,"validator:385":0,"validator:401":0,"validator:418":0,"validator:441":0,"validator:464":0,"validator:487":0,"validator:508":0,"validator:532":0,"validator:556":0,"validator:580":0,"validator:600":0,"initializer:984":0,"setWithoutRerender:1010":0,"getNodeFromIndex:1033":0,"getNodeFromModel:1057":0,"saveScrollTo:1075":0,"getNodePosition:1134":0,"(anonymous 2):1168":0,"(anonymous 3):1185":0,"scrollIntoView:1116":0,"(anonymous 4):1284":0,"modelIsSelected:1277":0,"(anonymous 5):1335":0,"selectModels:1313":0,"(anonymous 6):1376":0,"unselectModels:1365":0,"(anonymous 7):1404":0,"blurAll:1402":0,"clearSelectedModels:1397":0,"(anonymous 8):1453":0,"getSelectedModels:1442":0,"renderView:1476":0,"getModelListInUse:1488":0,"getModelAttr:1503":0,"setModelAttr:1524":0,"getModelToJSON:1562":0,"destructor:1572":0,"_render:1627":0,"_focusModelNode:1653":0,"_getMaxPaginatorGotoIndex:1681":0,"(anonymous 9):1740":0,"(anonymous 10):1764":0,"(anonymous 11):1767":0,"(anonymous 12):1782":0,"(anonymous 13):1794":0,"(anonymous 14):1802":0,"(anonymous 15):1812":0,"_extraBindUI:1727":0,"_setModelList:1850":0,"_setNoDups:1865":0,"_setLimitModels:1887":0,"_setViewFilter:1909":0,"_setLastItemOnTop:1931":0,"_setDupComp:1958":0,"_setGrpH1:1980":0,"_setGrpH2:2003":0,"_setGrpH3:2026":0,"_setRenderGrH1:2049":0,"_setRenderGrH2:2072":0,"_setRenderGrH3:2095":0,"_setRenderModel:2118":0,"_setModelsSel:2142":0,"_setModelListStyled:2166":0,"(anonymous 16):2190":0,"_setSelectableEvents:2181":0,"(anonymous 17):2227":0,"(anonymous 18):2234":0,"_setClkEv:2212":0,"(anonymous 19):2271":0,"_setDblclkEv:2256":0,"(anonymous 21):2310":0,"(anonymous 20):2302":0,"(anonymous 23):2334":0,"(anonymous 22):2327":0,"_setMarkModelChange:2296":0,"(anonymous 24):2365":0,"_setIntoViewAdded:2359":0,"(anonymous 25):2391":0,"_setIntoViewChanged:2385":0,"(anonymous 26):2431":0,"(anonymous 27):2456":0,"_setMouseDnUpEv:2415":0,"(anonymous 28):2496":0,"(anonymous 29):2521":0,"_setHoverEv:2481":0,"_handleModelSelectionChange:2545":0,"isMicroTemplate:2627":0,"modelEngine:2633":0,"modelEngine:2638":0,"groupH1Engine:2644":0,"groupH1Engine:2649":0,"groupH2Engine:2655":0,"groupH2Engine:2660":0,"groupH3Engine:2666":0,"groupH3Engine:2671":0,"renderGH1Engine:2677":0,"renderGH1Engine:2682":0,"renderGH2Engine:2688":0,"renderGH2Engine:2693":0,"renderGH3Engine:2699":0,"renderGH3Engine:2704":0,"_getAllTemplateFuncs:2611":0,"(anonymous 30):2754":0,"dupAvailable:2749":0,"_tryRenderModel:2743":0,"_clearAbberantModelList:2770":0,"(anonymous 31):2918":0,"findNodeByClientId:2915":0,"(anonymous 32):2931":0,"_renderView:2799":0,"_createModelNode:2982":0,"_addEmptyItem:3059":0,"_removeEmptyItem:3113":0,"findNode:3156":0,"_getNodeFromModelOrIndex:3140":0,"_selectModel:3189":0,"_fireSelectedModels:3236":0,"(anonymous 33):3275":0,"_clearEventhandlers:3272":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredLines = 771;
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredFunctions = 139;
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1);
YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3);
'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * @module gallery-itsamodellistviewextention
 * @class ITSAModellistViewExtention
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 19);
var Lang = Y.Lang,
    YObject = Y.Object,
    YArray = Y.Array,
    YNode = Y.Node,
    YTemplateMicro = Y.Template.Micro,
    VIEW_TEMPLATE = '<ul role="presentation"></ul>',
    VIEW_MODEL_TEMPLATE = '<li role="presentation"></li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE = '<li></li>',
    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',
    MODEL_CLASS = 'itsa-scrollviewmodel',
    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',
    SVML_CLASS = 'itsa-scrollviewmodellist',
    SVML_NOINITIALITEMS_CLASS = SVML_CLASS + '-noinitialitems',
    SVML_VIEW_NOINITIALITEMS_CLASS = SVML_CLASS + '-view-noinitialitems',
    SVML_NOITEMS_CLASS = SVML_CLASS + '-noitems',
    SVML_VIEW_NOITEMS_CLASS = SVML_CLASS + '-view-noitems',
    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    SVML_STYLE_CLASS = SVML_CLASS + '-styled',
    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',
    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',
    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "GETSTYLE", 45);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 46);
return parseInt(node.getStyle(style), 10);
    };

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 55);
function ITSAModellistAttrExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 57);
Y.mix(ITSAModellistAttrExtention.prototype, {

    /**
     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 70);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 71);
return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);
    },

    /**
     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 91);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 92);
var instance = this,
            modelIsLazy, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 95);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 96);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 97);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 98);
revivedModel = instance.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 99);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 100);
if (revivedModel) {
                    //======================================================================================
                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530
                    //
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 104);
revivedModel._set('clientId', model.clientId, {silent: true});
                    //
                    //======================================================================================
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 107);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 108);
instance.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 112);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 128);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 129);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 134);
Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 136);
Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);
//Y.Base.mix(Y.LazyModelList, [ITSAModellistAttrExtention]);

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 141);
function ITSAModellistViewExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 143);
ITSAModellistViewExtention.ATTRS = {

   /**
    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model
    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.
    *
    * @attribute modelList
    * @type {ModelList}
    * @default null
    * @since 0.1
    */
    modelList: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 156);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 156);
return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},
        setter: '_setModelList'
    },

   /**
    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.
    * By default, this will be compared with the previous rendered Model.
    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator
    * has a significant performance-hit.
    * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
    *
    * @attribute noDups
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    noDups: {
        value: false,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 174);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 174);
return Lang.isBoolean(v);},
        setter: '_setNoDups'
    },

   /**
    * Limits the number of rendered Models. The value of 0 means: no limit.
    *
    * @attribute limitModels
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    limitModels: {
        value: 0,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 188);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 188);
return Lang.isNumber(v);},
        setter: '_setLimitModels'
    },

    /**
     * Function that can filter the modellist, in a way that only specific models are rendered.
     * The function must look like: <b>function(model)</b> and must return true or false (which the developer
     * can determine based on the model that is passed).
     *
     * For example: function(model) {return model.get('country')==='US';}
     *
     * @attribute viewFilter
     * @type {Function} The function must look like: <b>function(model)</b>
     * @default null
     * @since 0.1
     */
    viewFilter: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 206);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 206);
return Lang.isFunction(v) || v === null; },
        setter: '_setViewFilter'
    },

   /**
    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)
    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>
    * The value true equals 'multi', 'null' or '' equals false.
    *
    * @default false
    * @attribute modelsSelectable
    * @type {Boolean|String|null}
    * @since 0.1
    */
    modelsSelectable: {
        value: null,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 223);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 224);
return ((v==='') || (v===null) || Lang.isBoolean(v) || (v==='single') || (v==='multi'));
        },
        setter: '_setModelsSel'
    },

   /**
    * If set, then there ALWAYS REMAINS 1 Model selected.
    * <i>Only accounts when 'modelsSelectable' is active.
    *
    * @default true
    * @attribute modelsUnselectable
    * @type {Boolean}
    * @since 0.1
    */
    modelsUnselectable: {
        value: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 240);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 241);
return Lang.isBoolean(v);
        }
    },

   /**
    * Whether the Models is styled using the css of this module.
    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox
    * and the css-rules do all the rest. The developer may override these rules, or set this value to false
    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules
    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements
    * thus the developer can style it at own will.
    *
    * @default false
    * @attribute modelListStyled
    * @type {Boolean}
    * @since 0.1
    */
    modelListStyled: {
        value: false,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 261);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 262);
return Lang.isBoolean(v);
        },
        setter: '_setModelListStyled'
    },

   /**
    * Sets the sensibility when clicking on a model.
    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item
    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click
    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire
    * a click-event.
    *
    * @default 2
    * @attribute clickSensivity
    * @type int
    * @since 0.1
    */
    clickSensivity: {
        value: 2,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 281);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 282);
return (Lang.isNumber(v) && (v>=0) && (v<11));
        }
    },

   /**
    * Whether an event is fired when a Model catches a mouse-click.
    * When set to true, the events 'modelClicked' is fired when clicking on the Models.
    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.
    * See the attribute clickSensivity for more details.
    *
    * @attribute clickEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    clickEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 300);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 300);
return Lang.isBoolean(v);},
        setter: '_setClkEv'
    },

   /**
    * Whether an event is fired when a Model catches a mouse-dblclick.
    * When set to true, the events 'modelDblclicked' is fired when double-clicking on the Models.
    *
    * @attribute dblclickEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    dblclickEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 316);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 316);
return Lang.isBoolean(v);},
        setter: '_setDblclkEv'
    },

   /**
    * When set to a value > 0, the Models will be m highlighted whenever they change (or new added).
    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.
    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-scrollviewmodel-changed' fors ome seconds.
    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.
    *
    * @attribute highlightAfterModelChange
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    highlightAfterModelChange: {
        value: 0,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 333);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 333);
return Lang.isNumber(v);},
        setter: '_setMarkModelChange'
    },

   /**
    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.
    * 0 = no scroll into view
    * 1 = active: scroll into view
    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item
    *
    * @attribute modelsIntoViewAfterAdd
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    modelsIntoViewAfterAdd: {
        value: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 350);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 350);
return (Lang.isNumber(v) && (v>=0) && (v<=2));},
        setter: '_setIntoViewAdded'
    },

   /**
    * Use this attribute you want the models to be scrolled into the viewport after a ModelChange.
    * 0 = no scroll into view
    * 1 = active: scroll into view
    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item
    *
    * @attribute modelsIntoViewAfterChange
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    modelsIntoViewAfterChange: {
        value: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 367);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 367);
return (Lang.isNumber(v) && (v>=0) && (v<=2));},
        setter: '_setIntoViewChanged'
    },

   /**
    * Whether an event is fired when a Model catches a mousedown or mouseup event.
    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup
    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.
    * This means they are fired no matter if scrolling is busy or not.
    *
    * @attribute mouseDownUpEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    mouseDownUpEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 385);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 385);
return Lang.isBoolean(v);},
        setter: '_setMouseDnUpEv'
    },

   /**
    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.
    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.
    *
    * @attribute hoverEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    hoverEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 401);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 401);
return Lang.isBoolean(v);},
        setter: '_setHoverEv'
    },

    /**
     * Can make the last element be fixed to the bottom/right edge, but to the top/left edge.
     * 0 = not active (normal behaviour, bottom/right)
     * 1 = active: on top/left edge
     * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item
     *
     * @attribute lastItemOnTop
     * @type {Int}
     * @default 0
     * @since 0.1
     */
    lastItemOnTop: {
        value: 0,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 418);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 418);
return (Lang.isNumber(v) && (v>-1) && (v<3));},
        setter: '_setLastItemOnTop'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 441);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 441);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH1'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')
     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 464);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 464);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH2'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')
     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 487);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 487);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH3'
    },

    /**
     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
     * where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class="eat">Eat a Slice!</button>'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class="eat">Eat a Slice!</button>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class="eat">Eat a Slice!</button><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderModel
     * @type {String}
     * @default '{clientId}'
     * @since 0.1
     */
    renderModel: {
        value: '{clientId}', // default-template, so that there always is content. Best to be overwritten.
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 508);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 508);
return Lang.isString(v); },
        setter: '_setRenderModel'
    },

    /**
     * Template for rendering of groupHeader1. If not set, renderGroupHeader1 will render the same as the attribute 'groupHeader1'.
     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 532);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 532);
return Lang.isString(v) || v === null; },
        setter: '_setRenderGrH1'
    },

    /**
     * Template for rendering of groupHeader2. If not set, renderGroupHeader2 will render the same as the attribute 'groupHeader2'.
     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 556);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 556);
return Lang.isString(v) || v === null; },
        setter: '_setRenderGrH2'
    },

    /**
     * Template for rendering of groupHeader3. If not set, renderGroupHeader3 will render the same as the attribute 'groupHeader3'.
     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 580);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 580);
return Lang.isString(v) || v === null; },
        setter: '_setRenderGrH3'
    },

    /**
     * Attribute that identifies duplicate Models.
     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.
     * (based on the value of 'renderModel').
     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:
     * the dupComparator has a significant performance-hit.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered
     * (only is 'noDups'===true).</u>
     *
     * @attribute dupComparator
     * @type {Function}
     * @default null
     * @since 0.1
     */
    dupComparator: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 600);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 600);
return Lang.isFunction(v) || v === null; },
        setter: '_setDupComp'
    }

};

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 606);
Y.mix(ITSAModellistViewExtention.prototype, {

    //-------------------------------------------------------------------------------------
    //---- Private properties -------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    /**
     * Internal list that holds event-references
     * @property _handlers
     * @private
     * @default []
     * @type Array
    */
    _handlers : [],

    /**
     * Internal reference to the original models, which is only used when DupModels are avaialble.
     * It makes it posible to return the original models on a modelClick-event.
     * @property _origModels
     * @private
     * @default []
     * @type Array
    */
    _origModels : [],

    /**
     * Internal eventhandle, defined when the attribute 'selectedModels' is used.
     * @property _selModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _selModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'clickEvents' is used.
     * @property _clkModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _clkModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.
     * @property _dblclkModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _dblclkModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
     * @property _mouseentModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _mouseentModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
     * @property _mouseUpModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _mouseUpModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
     * @property _mouseDnModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _mouseDnModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
     * @property _mouseleaveModelEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _mouseleaveModelEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
     * @property _markModelChangeEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _markModelChangeEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
     * @property _markModelAddEv
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _markModelAddEv : null,

    /**
     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.
     * @property _modelInViewChanged
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _modelInViewChanged : null,

    /**
     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.
     * @property _modelInViewAdded
     * @private
     * @default null
     * @type Y.EventHandle
    */
    _modelInViewAdded : null,

    /**
     * Internal object with references to all selected Models.
     * @property _selectedModels
     * @private
     * @default {}
     * @type Object
    */
    _selectedModels : {},

    /**
     * Internal reference to the viewNode
     * @property _viewNode
     * @private
     * @default null
     * @type Y.Node
    */
    _viewNode : null,

    /**
     * The id of _viewNode
     * @property _viewId
     * @private
     * @default null
     * @type String
    */
    _viewId : null,

    /**
     * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.
     * @property _currentViewPg
     * @private
     * @default 0
     * @type Int
    */
    _currentViewPg : 0,

    /**
     * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.
     * @property _templFns
     * @private
     * @default null
     * @type Object
    */
    _templFns : null,

    /**
     * Internal reference to the last Model that was clicked.
     * @property _lastClkModel
     * @private
     * @default null
     * @type Y.Model
    */
    _lastClkModel : null,

    /**
     * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.
     * @property _abModelList
     * @private
     * @default null
     * @type Y.ModelList | Y.LazyModelList
    */
    _abModelList : null,

    /**
     * Internal flag to tell whether the attribute 'viewFilter' is initiated.
     * @property _viewFilterInit
     * @private
     * @default false
     * @type Boolean
    */
    _viewFilterInit : false,

    /**
     * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.
     * @property _lastItemTopInit
     * @private
     * @default false
     * @type Boolean
    */
    _lastItemTopInit : false,

    /**
     * Internal flag to tell whether the attribute 'groupHeader1' is initiated.
     * @property _grpH1Init
     * @private
     * @default false
     * @type Boolean
    */
    _grpH1Init : false,

    /**
     * Internal flag to tell whether the attribute 'groupHeader2' is initiated.
     * @property _grpH2Init
     * @private
     * @default false
     * @type Boolean
    */
    _grpH2Init : false,

    /**
     * Internal flag to tell whether the attribute 'groupHeader3' is initiated.
     * @property _grpH3Init
     * @private
     * @default false
     * @type Boolean
    */
    _grpH3Init : false,

    /**
     * Internal flag to tell whether the attribute 'renderGroupHeader1' is initiated.
     * @property _renderGrpH1Init
     * @private
     * @default false
     * @type Boolean
    */
    _renderGrpH1Init : false,

    /**
     * Internal flag to tell whether the attribute 'renderGroupHeader2' is initiated.
     * @property _renderGrpH2Init
     * @private
     * @default false
     * @type Boolean
    */
    _renderGrpH2Init : false,

    /**
     * Internal flag to tell whether the attribute 'renderGroupHeader3' is initiated.
     * @property _renderGrpH3Init
     * @private
     * @default false
     * @type Boolean
    */
    _renderGrpH3Init : false,

    /**
     * Internal flag to tell whether the attribute 'renderModel' is initiated.
     * @property _renderModelInit
     * @private
     * @default false
     * @type Boolean
    */
    _renderModelInit : false,

    /**
     * Internal flag to tell whether the attribute 'dupComparator' is initiated.
     * @property _dupCompInit
     * @private
     * @default false
     * @type Boolean
    */
    _dupCompInit : false,

    /**
     * Internal flag to tell whether the attribute 'noDups' is initiated.
     * @property _noDupsInit
     * @private
     * @default false
     * @type Boolean
    */
    _noDupsInit : false,

    /**
     * Internal flag to tell whether the attribute 'limitModels' is initiated.
     * @property _limModelsInit
     * @private
     * @default false
     * @type Boolean
    */
    _limModelsInit : false,

    /**
     * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.
     * @property _rerendAttrChg
     * @private
     * @default true
     * @type Boolean
    */
    _rerendAttrChg : true,

    /**
     * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.
     * @property _itmsAvail
     * @private
     * @default true
     * @type Boolean
    */
    _itmsAvail : true, // must initially be set true

    /**
     * Internal refrence to the index of the last rendered Model in the View.
     * @property _prevLastModelIndex
     * @private
     * @default -1
     * @type Int
    */
    _prevLastModelIndex : -1,

    /**
     * Internal flag that tells is the used ModelList is a LazyModelList.
     * @property _listLazy
     * @private
     * @default false
     * @type Boolean
    */
    _listLazy : false,

    /**
     * The content of the last rendered Header1
     * @property _prevH1
     * @private
     * @default null
     * @type String|null
    */
    _prevH1 : null,

    /**
     * The content of the last rendered Header2
     * @property _prevH2
     * @private
     * @default null
     * @type String|null
    */
    _prevH2 : null,

    /**
     * The content of the last rendered Header3
     * @property _prevH3
     * @private
     * @default null
     * @type String|null
    */
    _prevH3 : null,

    /**
     * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.
     * @property _even
     * @private
     * @default false
     * @type Boolean
    */
    _even : false,

    //-------------------------------------------------------------------------------------
    //---- Public methods -----------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    /**
     * Initialisation of the Plugin
     *
     * @method initializer
     * @protected
     * @since 0.1
     */
    initializer : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "initializer", 984);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 985);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 987);
instance._viewId = Y.guid();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 988);
instance._handlers.push(
            instance.after(
                'render',
                instance._render,
                instance
            )
        );
    },

    /**
     * Sets an attribute, but in a way that there will be no rerendering of the view.
     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the
     * last attributes is set, instead of every time after eacht attribute-change.
     *
     * @method setWithoutRerender
     * @param {String} name The name of the attribute. If the
     * current value of the attribute is an Object, dot notation can be used
     * to set the value of a property within the object (e.g. <code>set("x.y.z", 5)</code>).
     * @param {Any} value The value to set the attribute to.
     * @param {Object} [opts] Optional data providing the circumstances for the change.
     * @since 0.1
    */
    setWithoutRerender : function(name, val, opts) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setWithoutRerender", 1010);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1011);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1013);
instance._rerendAttrChg = false;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1014);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1015);
instance._rerendAttrChg = true;
    },

    /**
     * Retreives the Li-Node given the index from the ModelList.
     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.
     *
     * @method getNodeFromIndex
     * @param {Int} index Index of item in the modelList.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    getNodeFromIndex : function(index, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromIndex", 1033);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1039);
return this._getNodeFromModelOrIndex(null, index, maxExpansions);
    },

    /**
     * Retreives the Li-Node given a Model from the ModelList.
     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.
     *
     * @method getNodeFromModel
     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    getNodeFromModel : function(model, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromModel", 1057);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1063);
return this._getNodeFromModelOrIndex(model, null, maxExpansions);
    },

    /**
     * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
     *
     * @method saveScrollTo
     * @param x {Int} The x-position to scroll to. (null for no movement)
     * @param y {Int} The y-position to scroll to. (null for no movement)
     * @since 0.1
     *
    */
    saveScrollTo : function(x, y) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "saveScrollTo", 1075);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1076);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            viewNode = instance._viewNode,
            max;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1081);
if (x) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1082);
x = Math.max(0, x);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1083);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1084);
x = Math.min(x, max);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1086);
if (y) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1087);
y = Math.max(0, y);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1088);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1089);
y = Math.min(y, max);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1091);
instance.scrollTo(x, y);
    },

    /**
     * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear
     * on top. Items that are after the view: will appear on bottom.
     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the third param is needed.
     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
     *
     * @method scrollIntoView
     * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.
     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
     *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.
     *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and
     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @since 0.1
    */
    scrollIntoView : function(item, options, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "scrollIntoView", 1116);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1122);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),
            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),
            viewNode = instance._viewNode,
            infiniteView = instance.itsainfiniteview,
            paginatorPlugin = instance.pages,
            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,
            onTop, nodePosition, modelNodeSize, corrected, prevNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1134);
getNodePosition = function(node) {
            // returns -1 if (partial) before viewNode
            // returns 0 if inside viewNode
            // returns 1 if (partial) after viewNode
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodePosition", 1134);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1138);
var nodeLowerEdge = yAxis ? node.getY() : node.getX(),
                nodeUpperEdge;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1140);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1141);
nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1144);
nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');
            }

            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1147);
if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1148);
return -1;
            }
            else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1150);
if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1151);
return 1;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1154);
return 0;
            }}
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1157);
if (item instanceof Y.Node) {
            // we passed a Node
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1159);
modelNode = item;
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1161);
if (modelNode || Lang.isNumber(item)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1162);
modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1163);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1164);
if (paginatorPlugin && (nodePosition!==0)) {
                // increase the modelIndex --> paginator is pased on all LI's, not just the Models
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1166);
liElements = viewNode.all('>li');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1167);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 2)", 1168);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1169);
if (!node.hasClass(MODEL_CLASS)) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1170);
item++;
                        }
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1172);
return index===item;
                    }
                );
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1178);
modelNode = item && instance.getNodeFromModel(item, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1179);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1180);
if (paginatorPlugin && (nodePosition!==0)) {
                // transform model to an index
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1182);
liElements = viewNode.all('>li');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1183);
item = 0;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1184);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 3)", 1185);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1186);
var found = (node===modelNode);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1187);
if (found) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1188);
item = index;
                        }
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1190);
return found;
                    }
                );
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1195);
if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1196);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1198);
if ((modelNode) && (nodePosition!==0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1199);
onTop = (nodePosition===-1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1200);
if (onTop && options && Lang.isBoolean(options.showHeaders) && options.showHeaders) {
                // we need to bring into view the headernode
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1202);
prevNode = modelNode.previous();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1203);
while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1204);
modelNode = prevNode;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1205);
prevNode = prevNode.previous();
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1208);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1209);
modelNodeEdge = modelNode.getY();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1210);
currentOffset = instance.get('scrollY');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1211);
modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1212);
maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1215);
modelNodeEdge = modelNode.getX();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1216);
currentOffset = instance.get('scrollX');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1217);
modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1218);
maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;
            }
            // You might need to expand the list in case ITSAInifiniteView is pluged-in AND maxOffset<newOffset
            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1222);
if (infiniteView && !onTop) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1228);
infiniteView.checkExpansion();
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1230);
if (paginatorPlugin) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1231);
if (!onTop) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1232);
while ((modelNodeSize<boundingBoxSize) && (item>0)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1233);
corrected = true;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1234);
item--;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1235);
modelNode = modelNode.previous('li');
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1236);
if (yAxis) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1237);
modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1240);
modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1243);
if (corrected) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1244);
item++;
                    }
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1246);
item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1248);
paginatorPlugin.scrollToIndex(item);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1251);
newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1252);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1253);
instance.saveScrollTo(null, newOffset);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1256);
instance.saveScrollTo(newOffset, null);
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1261);
if (!modelNode) {
            }
            else {
            }
        }
    },

    /**
     * If the Model/Models has a 'selected-status' in the ScrollView-instance.
     *
     * @method modelIsSelected
     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'
     * @since 0.1
    */
    modelIsSelected : function(model) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelIsSelected", 1277);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1278);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1281);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1282);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 4)", 1284);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1285);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1286);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1291);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1293);
return Lang.isValue(selected);
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method selectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).
     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @since 0.1
    */
    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "selectModels", 1313);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1319);
var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1324);
if (singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1325);
instance.clearSelectedModels(true, true);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1327);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1328);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1329);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1332);
if (isArray && !singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1333);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 5)", 1335);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1336);
instance._selectModel(model, true, maxExpansions);
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1339);
if (scrollIntoView && (models.length>0)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1340);
instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1344);
if (isArray) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1345);
models = models[0];
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1347);
instance._selectModel(models, true, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1348);
if (scrollIntoView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1349);
instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1352);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1353);
instance._fireSelectedModels();
        }
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method unselectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @since 0.1
    */
    unselectModels : function(models, silent) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "unselectModels", 1365);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1366);
var instance = this,
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1369);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1370);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1371);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1373);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1374);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 6)", 1376);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1377);
instance._selectModel(model, false);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1382);
instance._selectModel(models, false);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1384);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1385);
instance._fireSelectedModels();
        }
    },

    /**
     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false
     *
     * @method clearSelectedModels
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.
     * @since 0.1
    */
    clearSelectedModels : function(silent, force) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "clearSelectedModels", 1397);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1398);
var instance = this,
            contentBox = instance.get('contentBox'),
            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1402);
blurAll = function() {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "blurAll", 1402);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1403);
currentSelected.each(
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 7)", 1404);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1405);
node.blur();
                }
            );
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1409);
currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1410);
firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1411);
if (silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1412);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1413);
currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1416);
fireEvent = (currentSelected.size()>0);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1417);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1418);
currentSelected.removeClass(SVML_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1419);
if (fireEvent) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1420);
instance._fireSelectedModels();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1423);
instance._selectedModels = {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1424);
if (instance.get('modelsUnselectable') && firstSelected && !force) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1425);
clientId = firstSelected.getData('modelClientId');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1426);
modelList = instance.getModelListInUse();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1427);
model = modelList.getByClientId(clientId);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1428);
instance.selectModels(model, false, null, true);
        }
    },

    /**
     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true
     *
     * @method getSelectedModels
     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>
     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the
     * latter case, you have full control of the exact item that was selected.
     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.
     * @since 0.1
     */
    getSelectedModels : function(original) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getSelectedModels", 1442);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1443);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1446);
if (!original) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1447);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1450);
selected = [];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1451);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _origModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 8)", 1453);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1455);
var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1456);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1457);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1462);
return selected;
    },

    /**
     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Normal speaken, you only need to call this method yourself, when the ModelList.comparator changes.
     * The viewNode will be updated automaticly when attributes change, or when the (Lazy)-ModelList changes, or when
     * Models change. Be aware though, that the Model needs to fire a *:change event in roder to make the changes happen. This means,
     * that if you are using a LazyModelList, then be sure the object is revived into a Model-instance.
     *
     * @method renderView
     * @since 0.1
     *
    */
    renderView : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderView", 1476);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1477);
this._renderView();
    },

    /**
     * Returns the modellist that is responsible for building the items. Normally speaken, this is the attribute 'modelList'
     * itself. However, if DupModels are active, the list is axpanded and _abModelList is returned.
     *
     * @method getModelListInUse
     * @since 0.1
     *
    */
    getModelListInUse : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelListInUse", 1488);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1489);
return this._abModelList || this.get('modelList');
    },

    /**
     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 1503);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1504);
return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);
    },

    /**
     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 1524);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1525);
var instance = this,
            modelIsLazy, modelList, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1528);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1529);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1530);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1531);
modelList = instance.get('modelList');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1532);
revivedModel = modelList.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1533);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1534);
if (revivedModel) {
                    //======================================================================================
                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530
                    //
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1538);
revivedModel._set('clientId', model.clientId, {silent: true});
                    //
                    //======================================================================================
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1541);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1542);
modelList.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1546);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 1562);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1563);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "destructor", 1572);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1573);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1576);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1577);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1578);
if (instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1579);
instance._selModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1581);
if (instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1582);
instance._clkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1584);
if (instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1585);
instance._dblclkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1587);
if (instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1588);
instance._mouseDnModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1590);
if (instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1591);
instance._mouseUpModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1593);
if (instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1594);
instance._mouseentModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1596);
if (instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1597);
instance._mouseleaveModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1599);
if (instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1600);
instance._markModelChangeEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1602);
if (instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1603);
instance._markModelAddEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1605);
if (instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1606);
instance._modelInViewChanged.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1608);
if (instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1609);
instance._modelInViewAdded.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1611);
instance._clearAbberantModelList();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1612);
instance._viewNode.destroy(true);
    },

    //===============================================================================================
    // private methods
    //===============================================================================================

    /**
     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.
     *
     * @method _render
     * @private
     * @since 0.1
     *
    */
    _render: function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_render", 1627);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1628);
var instance = this,
            modellist = instance.get('modelList'),
            viewNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1632);
instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1633);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1634);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1635);
instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1636);
instance._templFns = instance._getAllTemplateFuncs();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1637);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1638);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1639);
instance._renderView(null, {incrementbuild: true, initbuild: true});
        }
    },

    /**
     * Focusses the modelNode and adds the className 'itsa-scrollviewmodel-focus'.
     * Previous focussed Node will be unmarked.
     *
     * @method _focusModelNode
     * @param {Y.Node} modelNode the ModelNode that should gain focus.
     * @private
     * @since 0.1
     *
    */
    _focusModelNode: function(modelNode) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_focusModelNode", 1653);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1654);
if (modelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1655);
this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1656);
modelNode.addClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1657);
modelNode.focus();
        }
    },

    /**
     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because
     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)
     * bumbs too much.
     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the param is needed.
     *
     * @method _getMaxPaginatorGotoIndex
     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.
     * This only applies when the ITSAInifiniteView is plugged in.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Int} maximum PaginatorIndex that should be called.
     * @private
     * @since 0.1
     *
    */
    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getMaxPaginatorGotoIndex", 1681);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1687);
var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance.getModelListInUse(),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1696);
if (paginator && (modelList.size()>0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1697);
lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1698);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1699);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1702);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1704);
liElements = instance._viewNode.all('>li');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1705);
i = liElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1706);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1707);
lastNode = liElements.item(i);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1708);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1709);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1712);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1715);
if (size>=boundingSize) {i++;}
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1717);
return i;
    },

    /**
     * Binding all events we need to make ModelList work with the ScrollView-instance
     *
     * @method _extraBindUI
     * @private
     * @since 0.1
    */
    _extraBindUI : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_extraBindUI", 1727);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1728);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._handlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1734);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1735);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1736);
boundingBox.addClass(SVML_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1739);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 9)", 1740);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1741);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1743);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1744);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1746);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1747);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1748);
boundingBox.addClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1749);
instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1752);
boundingBox.removeClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1753);
instance.get('contentBox').setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1761);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 10)", 1764);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1765);
instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 11)", 1767);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1769);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1770);
return (!scrollingInAction);
                }
            )
        );
        //========================================================
        //
        // LACK IN ModelList --> make resort after *:change
        //
        //=======================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1779);
eventhandlers.push(
            instance.after(
                '*:change',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 12)", 1782);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1783);
var modellist = instance.get('modelList');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1784);
if (modellist && instance.get('modelList').comparator) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1785);
modellist.sort();
                    }
                }
            )
        );
        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1791);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 13)", 1794);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1796);
var lastScrolledAmt = instance.lastScrolledAmt;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1797);
if (lastScrolledAmt && (Math.abs(lastScrolledAmt) > instance.get('clickSensivity'))) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1798);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1799);
e.stopImmediatePropagation();
                    }
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 14)", 1802);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1803);
var tagName = this.get('tagName');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1804);
return ((tagName==='A') || (tagName==='BUTTON'));
                }
            )
        );
        // also prevent default on mousedown, to prevent the native "drag link to desktop" behavior on certain browsers.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1809);
eventhandlers.push(
            boundingBox.delegate(
                'mousedown',
                function(e) {
                    // Prevent default anchor drag behavior, on browsers
                    // which let you drag anchors to the desktop
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 15)", 1812);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1815);
e.preventDefault();
                },
                'a'
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1822);
eventhandlers.push(
            instance.after(
                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add', '*:change'],
                Y.bind(instance._renderView, instance, null, null)
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1828);
eventhandlers.push(
            instance.after(
                ['modelList:reset', 'lazyModelList:reset'],
                Y.bind(instance._renderView, instance, null, {keepstyles: false})
            )
        );
        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,
        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1836);
instance.get('highlightAfterModelChange');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1837);
instance.get('modelsIntoViewAfterAdd');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1838);
instance.get('modelsIntoViewAfterChange');
    },

    /**
     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.
     *
     * @method _setModelList
     * @param {Object} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setModelList : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelList", 1850);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1851);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1853);
instance._listLazy = (val instanceof Y.LazyModelList);
    },

    /**
     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setNoDups
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setNoDups : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setNoDups", 1865);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1866);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1868);
if (instance._noDupsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1869);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1870);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1874);
instance._noDupsInit = true;
        }
    },

    /**
     * Setter for attribute limitModels. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setLimitModels
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setLimitModels : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setLimitModels", 1887);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1888);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1890);
if (instance._limModelsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1891);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1892);
instance._renderView({limitModels: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1896);
instance._limModelsInit = true;
        }
    },

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setViewFilter
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setViewFilter : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setViewFilter", 1909);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1910);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1912);
if (instance._viewFilterInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1913);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1914);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1918);
instance._viewFilterInit = true;
        }
    },

    /**
     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setLastItemOnTop
     * @param {Boolean} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setLastItemOnTop : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setLastItemOnTop", 1931);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1932);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1934);
if (instance._lastItemTopInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1935);
if (val) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1936);
instance._addEmptyItem(null, val);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1937);
instance.syncUI();
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1940);
instance._removeEmptyItem();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1941);
instance.syncUI();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1945);
instance._lastItemTopInit = true;
        }
    },

    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setDupComp
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setDupComp : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDupComp", 1958);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1959);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1961);
if (instance._dupCompInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1962);
if (instance._rerendAttrChg && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1963);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1967);
instance._dupCompInit = true;
        }
    },

    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH1
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH1", 1980);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1981);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1983);
if (instance._grpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1984);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1985);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1986);
instance._renderView({groupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1990);
instance._grpH1Init = true;
        }
    },

    /**
     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH2
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH2", 2003);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2004);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2006);
if (instance._grpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2007);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2008);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2009);
instance._renderView({groupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2013);
instance._grpH2Init = true;
        }
    },

    /**
     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH3
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH3", 2026);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2027);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2029);
if (instance._grpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2030);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2031);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2032);
instance._renderView({groupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2036);
instance._grpH3Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH1
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH1", 2049);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2050);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2052);
if (instance._renderGrpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2053);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2054);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2055);
instance._renderView({renderGroupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2059);
instance._renderGrpH1Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH2
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH2", 2072);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2073);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2075);
if (instance._renderGrpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2076);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2077);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2078);
instance._renderView({renderGroupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2082);
instance._renderGrpH2Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH3
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH3", 2095);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2096);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2098);
if (instance._renderGrpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2099);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2100);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2101);
instance._renderView({renderGroupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2105);
instance._renderGrpH3Init = true;
        }
    },

    /**
     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderModel
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderModel : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderModel", 2118);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2119);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2121);
if (instance._renderModelInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2122);
instance._templFns = instance._getAllTemplateFuncs({renderModel: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2123);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2124);
instance._renderView({renderModel: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2128);
instance._renderModelInit = true;
        }
    },

    /**
     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'
     * Also resets _selModelEv.
     *
     * @method _setModelsSel
     * @param {Boolean|String|null} val
     * @private
     * @since 0.1
     *
    */
    _setModelsSel : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelsSel", 2142);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2143);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2145);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2146);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2148);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2150);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2153);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2154);
return val;
    },

    /**
     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.
     *
     * @method _setModelListStyled
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setModelListStyled : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelListStyled", 2166);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2167);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2169);
instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);
    },

    /**
     * Sets or removes selectable click-events when the mouse clicks on a Model.
     *
     * @method _setSelectableEvents
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setSelectableEvents : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setSelectableEvents", 2181);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2182);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2185);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2186);
if (val && !instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2187);
instance._selModelEv = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 16)", 2190);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2192);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2193);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2197);
if (!val && instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2198);
instance._selModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2199);
instance._selModelEv = null;
        }}
    },

    /**
     * Sets or removes click-events when the mouse clicks on a Model.
     *
     * @method _setClkEv
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setClkEv : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClkEv", 2212);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2213);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2216);
if (val && !instance._clkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2225);
instance._clkModelEv = contentBox.delegate(
                'click',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 17)", 2227);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2228);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2232);
instance.fire('modelClick', {node: node, model: model});
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 18)", 2234);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2236);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2237);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2241);
if (!val && instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2242);
instance._clkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2243);
instance._clkModelEv = null;
        }}
    },

    /**
     * Sets or removes dblclick-events when the mouse double-clicks on a Model.
     *
     * @method _setDblclkEv
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setDblclkEv : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDblclkEv", 2256);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2257);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2260);
if (val && !instance._dblclkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelDblclick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2269);
instance._dblclkModelEv = contentBox.delegate(
                'dblclick',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 19)", 2271);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2272);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2276);
instance.fire('modelDblclick', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2281);
if (!val && instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2282);
instance._dblclkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2283);
instance._dblclkModelEv = null;
        }}
    },

    /**
     * Sets or removes highlight-effects after a Model is changed.
     *
     * @method _setMarkModelChange
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setMarkModelChange : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMarkModelChange", 2296);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2297);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2299);
if (val && (val>0) && !instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2300);
instance._markModelChangeEv = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 20)", 2302);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2303);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2305);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2306);
node.addClass(MODEL_CHANGED_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2307);
Y.later(
                            val,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 21)", 2310);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2311);
if (node) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2312);
node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2320);
if (!val && instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2321);
instance._markModelChangeEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2322);
instance._markModelChangeEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2324);
if (val && (val>0) && !instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2325);
instance._markModelAddEv = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 22)", 2327);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2328);
var node = instance.getNodeFromIndex(e.index);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2329);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2330);
node.addClass(MODEL_CHANGED_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2331);
Y.later(
                            val,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 23)", 2334);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2335);
if (node) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2336);
node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2344);
if (!val && instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2345);
instance._markModelAddEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2346);
instance._markModelAddEv = null;
        }}
    },

    /**
     * Sets or removes scrollIntoView effects when a Model is added to the list.
     *
     * @method _setIntoViewAdded
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setIntoViewAdded : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewAdded", 2359);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2360);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2362);
if ((val >0) && !instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2363);
instance._modelInViewAdded = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 24)", 2365);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2366);
instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2370);
if ((val===0) && instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2371);
instance._modelInViewAdded.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2372);
instance._modelInViewAdded = null;
        }}
    },

    /**
     * Sets or removes scrollIntoView effects when a Model is changed.
     *
     * @method _setIntoViewChanged
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setIntoViewChanged : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewChanged", 2385);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2386);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2388);
if ((val>0) && !instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2389);
instance._modelInViewChanged = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 25)", 2391);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2392);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2394);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2395);
instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2400);
if ((val===0) && instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2401);
instance._modelInViewChanged.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2402);
instance._modelInViewChanged = null;
        }}
    },

    /**
     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.
     *
     * @method _setMouseDnUpEv
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setMouseDnUpEv : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMouseDnUpEv", 2415);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2416);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2420);
if (val && !instance._mouseDnModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2429);
instance._mouseDnModelEv = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 26)", 2431);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2432);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2436);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2441);
if (!val && instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2442);
instance._mouseDnModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2443);
instance._mouseDnModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2445);
if (val && !instance._mouseUpModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2454);
instance._mouseUpModelEv = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 27)", 2456);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2457);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2461);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2466);
if (!val && instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2467);
instance._mouseUpModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2468);
instance._mouseUpModelEv = null;
        }}
    },

    /**
     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.
     *
     * @method _setHoverEv
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setHoverEv : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setHoverEv", 2481);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2482);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2485);
if (val && !instance._mouseentModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2494);
instance._mouseentModelEv = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 28)", 2496);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2497);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2501);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2506);
if (!val && instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2507);
instance._mouseentModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2508);
instance._mouseentModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2510);
if (val && !instance._mouseleaveModelEv) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2519);
instance._mouseleaveModelEv = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 29)", 2521);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2522);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2526);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2531);
if (!val && instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2532);
instance._mouseleaveModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2533);
instance._mouseleaveModelEv = null;
        }}
    },

    /**
     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.
     *
     * @method _handleModelSelectionChange
     * @param {eventTarget} [e] The eventTarget after a selectionChange
     * @private
     * @since 0.1
     */
    _handleModelSelectionChange : function(e) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_handleModelSelectionChange", 2545);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2546);
var instance = this,
            modelNode = e.currentTarget,
            // first check _abModelList --> this might be available and it will overrule this.get('modelList')
            modelList = instance.getModelListInUse(),
            modelClientId = modelNode.getData('modelClientId'),
            model = modelList && modelList.getByClientId(modelClientId),
            modelsSelectable = instance.get('modelsSelectable'),
            singleSelectable = (modelsSelectable==='single'),
            shiftClick = e.shiftKey && !singleSelectable,
            ctrlClick = (e.metaKey || e.ctrlKey),
            viewFilter = instance.get('viewFilter'),
            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,
            currentSelected, firstItemSelected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2560);
modelPrevSelected = model && instance.modelIsSelected(model);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2561);
if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2563);
if (singleSelectable || !ctrlClick) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2564);
if (instance.get('modelsUnselectable')) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2565);
currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2566);
firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2568);
instance.clearSelectedModels(true, true);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2570);
if (shiftClick && instance._lastClkModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2571);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2572);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2573);
prevModelIndex = modelList.indexOf(instance._lastClkModel);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2574);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2575);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2576);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2577);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2578);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2579);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2582);
instance.selectModels(multipleModels, false, null, true);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2585);
if (modelPrevSelected && !firstItemSelected) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2586);
instance.unselectModels(model, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2589);
instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2593);
instance._lastClkModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2595);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2597);
instance._fireSelectedModels();
    },

    /**
     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.
     *
     * @method _getAllTemplateFuncs
     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.
     * @private
     * @return {Object} All templates --> an object with the fields: <b>renderModel, groupH1, groupH2, groupH3, renderGH1, renderGH1, renderGH1,
     * activeGH1, activeGH2, activeGH3</b>. The last 3 keys are Booleans, the other are templates.
     * @since 0.1
     *
    */
    _getAllTemplateFuncs : function(setterAttrs) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getAllTemplateFuncs", 2611);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2612);
var instance = this,
            renderModel = (setterAttrs && setterAttrs.renderModel) || instance.get('renderModel'),
            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),
            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),
            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),
            renderGH1 = (setterAttrs && setterAttrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupH1,
            renderGH2 = (setterAttrs && setterAttrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupH2,
            renderGH3 = (setterAttrs && setterAttrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupH3,
            activeGH1 = groupH1 && (groupH1.length>0),
            activeGH2 = groupH2 && (groupH2.length>0),
            activeGH3 = groupH3 && (groupH3.length>0),
            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,
            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,
            compiledRenderGH3Engine, templateObject, isMicroTemplate;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2627);
isMicroTemplate = function(template) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isMicroTemplate", 2627);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2628);
var microTemplateRegExp = /<%(.+)%>/;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2629);
return microTemplateRegExp.test(template);
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2631);
if (isMicroTemplate(renderModel)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2632);
compiledModelEngine = YTemplateMicro.compile(renderModel);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2633);
modelEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2633);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2634);
return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2638);
modelEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2638);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2639);
return Lang.sub(renderModel, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2642);
if (activeGH1 && isMicroTemplate(groupH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2643);
compiledGroupH1Engine = YTemplateMicro.compile(groupH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2644);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2644);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2645);
return compiledGroupH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2649);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2649);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2650);
return Lang.sub(groupH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2653);
if (activeGH2 && isMicroTemplate(groupH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2654);
compiledGroupH2Engine = YTemplateMicro.compile(groupH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2655);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2655);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2656);
return compiledGroupH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2660);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2660);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2661);
return Lang.sub(groupH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2664);
if (activeGH3 && isMicroTemplate(groupH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2665);
compiledGroupH3Engine = YTemplateMicro.compile(groupH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2666);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2666);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2667);
return compiledGroupH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2671);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2671);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2672);
return Lang.sub(groupH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2675);
if (activeGH1 && isMicroTemplate(renderGH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2676);
compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2677);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2677);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2678);
return compiledRenderGH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2682);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2682);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2683);
return Lang.sub(renderGH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2686);
if (activeGH2 && isMicroTemplate(renderGH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2687);
compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2688);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2688);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2689);
return compiledRenderGH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2693);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2693);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2694);
return Lang.sub(renderGH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2697);
if (activeGH3 && isMicroTemplate(renderGH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2698);
compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2699);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2699);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2700);
return compiledRenderGH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2704);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2704);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2705);
return Lang.sub(renderGH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2708);
templateObject = {
            renderModel : modelEngine,
            groupH1 : groupH1Engine,
            groupH2 : groupH2Engine,
            groupH3 : groupH3Engine,
            renderGH1 : renderGH1Engine,
            renderGH2 : renderGH2Engine,
            renderGH3 : renderGH3Engine,
            activeGH1 : activeGH1,
            activeGH2 : activeGH2,
            activeGH3 : activeGH3
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2720);
return templateObject;
    },

    /**
     * Will try to render 'trymodel' through the template defined with tha attribute 'renderModel'.
     * Only succeeds if it passes all tests declared by the other params. Should it fail the tests, then 'false' is returned.
     * If succeeded, the the HTML (String) will be returned.
     *
     * @method _tryRenderModel
     * @param {Y.Model} trymodel The Model (might be an object in case of LazyModelList) to be rendered
     * @param {String} [prevrenderedmodel] The previous Model that was rendered: should be in a 'rendered-state'.
     * Is used to check against when nodups are permitted and dupComparator is undefined.
     * @param {Y.Array} modelListItemsArray (Lazy)ModelList in array-form
     * @param {Function} viewFilter the viewFilter function (attribute), passed as a parameter for performancereasons
     * @param {Boolean} noDups the value of the attribute 'nodups', passed as a parameter for performancereasons
     * @param {Function} dupComparator the dupComparator function (attribute), passed as a parameter for performancereasons
     * @param {Object} allTemplateFuncs passed as a parameter for performancereasons
     * @private
     * @return {HTML|false} false if failed -possibly because it's a dup or falls out of the filter-, otherwise returns the rendered HTML: rendered
     * through the 'renderModel'-template
     * @since 0.1
     *
    */
    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_tryRenderModel", 2743);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2744);
var instance = this,
            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2747);
dubComparatorBinded = Y.rbind(dupComparator, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2748);
viewFilterBinded = Y.rbind(viewFilter, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2749);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "dupAvailable", 2749);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2750);
var dupFound = false,
                modelComp = dubComparatorBinded(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2752);
YArray.some(
                modelListItemsArray,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 30)", 2754);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2755);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2756);
dupFound = (dubComparatorBinded(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2757);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2760);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2762);
allowed = (!viewFilter || viewFilterBinded(trymodel)) &&
                      (!noDups ||
                       (!dupComparator && ((renderedmodel = allTemplateFuncs.renderModel(trymodel))!==prevrenderedmodel)) ||
                       (dupComparator && !dupAvailable(trymodel))
                      );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2767);
return allowed && (renderedmodel || allTemplateFuncs.renderModel(trymodel));
    },

    _clearAbberantModelList : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearAbberantModelList", 2770);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2771);
var instance = this;

        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2774);
if (instance._abModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2775);
instance._abModelList.destroy();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2777);
instance._abModelList = null;
    },


    /**
     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.
     *
     * @method _renderView
     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.

     * @param {Object} [options]
     *    @param {Boolean} [options.rebuild=true] set to 'false' if you don't want to rebuild but want to add items at the end of the list
     *    unless the infiniteView-plugin is available OR limitModels>0
     *    @param {Int} [options.page=0] lets ITSAViewPagination make rendering pages
     *    @param {Boolean} [options.incrementbuild=false] if 'true': appends every element one by one.
     *    If 'false' the whole <ul> will be replaced at once.
     *    @param {Boolean} [options.keepstyles=true] set to 'false' if you don't want to retain selected/focused info (only when you 'reset' the list)
     *    @param {Boolean} [options.initbuild=false] internal flag to notify the initial build
     * @private
     * @since 0.1
    */
    _renderView : function(setterAttrs, options) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_renderView", 2799);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2800);
var instance = this,
            viewNode = instance._viewNode,
            contentBox = instance.get('contentBox'),
            modelList = instance.get('modelList'),
            noDups = (setterAttrs && setterAttrs.noDups) || instance.get('noDups'),
            dupComparator = (setterAttrs && setterAttrs.dupComparator) || instance.get('dupComparator'),
            viewFilter = (setterAttrs && setterAttrs.viewFilter) || instance.get('viewFilter'),
            paginator = instance.pages,
            changedLimitModels = (setterAttrs && setterAttrs.limitModels),
            limitModels = changedLimitModels || instance.get('limitModels'),
            allTemplateFuncs = instance._templFns,
            lastItemOnTop = (setterAttrs && setterAttrs.lastItemOnTop) || instance.get('lastItemOnTop'),
            infiniteView = instance.itsainfiniteview,
            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,
            modelConfig, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,
            i, j, model, modelListItems, batchSize, items, modelListItemsLength;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2817);
options = options || {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2818);
options.page = options.page || instance._currentViewPg;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2819);
pageSwitch = (instance._currentViewPg!==options.page);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2820);
options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2821);
options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2822);
options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2823);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2824);
contentBox.setHTML(viewNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2825);
instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2830);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2831);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2832);
if (options.rebuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2833);
i = (options.page*limitModels) -1; // will be incread to zero at start loop
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2834);
instance._prevH1 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2835);
instance._prevH2 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2836);
instance._prevH3 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2837);
instance._even = false;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2838);
if (infiniteView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2839);
instance._itmsAvail = true;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2841);
instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2842);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);
        }
        else {
            // start with the last index
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2846);
i = (instance._prevLastModelIndex || -1); // will be increased at start loop
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2848);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2849);
newViewNode = YNode.create(VIEW_TEMPLATE);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2851);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2852);
modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2853);
if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2854);
instance._generateAbberantModelList(infiniteView, options.rebuild);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2855);
modelList = instance._abModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2857);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2858);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2862);
instance._clearAbberantModelList();
            }
        }
        else {
            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2867);
instance._clearAbberantModelList();
        }

        // in case of ITSAViewPaginator is active --> limitModels is always>0
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2871);
renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2872);
listIsLimited = (renderListLength<modelListItemsLength);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2873);
items = 0;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2874);
batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2875);
if (i>0) {
            // when available: remove the fillNode that makes lastItemOnTop
            // It will be rendered on the bottom again
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2878);
instance._removeEmptyItem();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2880);
while ((items<batchSize) && (++i<renderListLength)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2881);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2882);
renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,
                                                     dupComparator, allTemplateFuncs);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2884);
if (renderedModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2885);
if (items===0) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2886);
instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2887);
viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2888);
if (options.initbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2889);
instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2890);
viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2893);
items++;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2894);
modelNode = instance._createModelNode(model, renderedModel);
                // modelNode is an ARRAY of Y.Node !!!
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2896);
for (j=0; j<modelNode.length; j++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2897);
if (options.incrementbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2898);
viewNode.append(modelNode[j]);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2901);
newViewNode.append(modelNode[j]);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2904);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2905);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2906);
prevRenderedModel = renderedModel;
                }
            }
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2911);
instance._prevLastModelIndex = i - 1;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2912);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2913);
if (options.keepstyles) {
                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2915);
findNodeByClientId = function(modelClientId, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNodeByClientId", 2915);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2916);
var nodeFound;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2917);
nodelist.some(
                        function(node) {
                            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 31)", 2918);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2919);
var found = (node.getData('modelClientId') === modelClientId);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2920);
if (found) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2921);
nodeFound = node;
                            }
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2923);
return found;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2926);
return nodeFound;
                };
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2928);
previousViewModels = viewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2929);
newViewModels = newViewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2930);
previousViewModels.each(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 32)", 2931);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2932);
var hasSelected = node.hasClass(SVML_SELECTED_CLASS),
                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),
                            newnode;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2935);
if (hasSelected || hasFocus) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2936);
newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2937);
if (newnode) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2938);
newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2939);
newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);
                            }
                        }
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2945);
viewNode.replace(newViewNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2946);
instance._viewNode = newViewNode;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2947);
newViewNode.set('id', instance._viewId);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2949);
if (modelNode && lastItemOnTop && (!infiniteView || !instance._itmsAvail || listIsLimited)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2952);
instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2954);
instance._currentViewPg = options.page;
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2956);
instance.syncUI();
//========================================================
        // now a correction of PaginatorPlugin-bug:
        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin
        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2961);
if (paginator) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2962);
currentPaginatorIndex = paginator.get('index');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2963);
maxPaginatorIndex = viewNode.get('children').size() - 1;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2964);
if (currentPaginatorIndex > maxPaginatorIndex) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2965);
paginator.set('index', maxPaginatorIndex);
            }
        }
//========================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2969);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2970);
infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2978);
instance.fire('modelListRender');
    },

// return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.
    _createModelNode : function(model, renderedModel) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_createModelNode", 2982);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2983);
var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            nodes = [],
            modelNode = YNode.create(VIEW_MODEL_TEMPLATE),
            header1, header2, header3, headerNode, allTemplateFuncs;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2989);
allTemplateFuncs = instance._templFns;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2990);
if (allTemplateFuncs.activeGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2991);
header1 = allTemplateFuncs.groupH1(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2992);
if (header1!==instance._prevH1) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2993);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2995);
headerNode.addClass(GROUPHEADER1_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2996);
if (instance._prevH1) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2997);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2999);
headerNode.setHTML(allTemplateFuncs.renderGH1(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3000);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3001);
instance._prevH1 = header1;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3002);
instance._even = false;
                // force to make a header2 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3004);
instance._prevH2 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3007);
if (allTemplateFuncs.activeGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3008);
header2 = allTemplateFuncs.groupH2(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3009);
if (header2!==instance._prevH2) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3010);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3012);
headerNode.addClass(GROUPHEADER2_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3013);
if (instance._prevH2) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3014);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3016);
headerNode.setHTML(allTemplateFuncs.renderGH2(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3017);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3018);
instance._prevH2 = header2;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3019);
instance._even = false;
                // force to make a header3 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3021);
instance._prevH3 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3024);
if (allTemplateFuncs.activeGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3025);
header3 = allTemplateFuncs.groupH3(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3026);
if (header3!==instance._prevH3) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3027);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3029);
headerNode.addClass(GROUPHEADER3_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3030);
if (instance._prevH3) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3031);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3033);
headerNode.setHTML(allTemplateFuncs.renderGH3(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3034);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3035);
instance._prevH3 = header3;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3036);
instance._even = false;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3039);
modelNode.setData('modelClientId', modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3040);
modelNode.addClass(MODEL_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3041);
modelNode.addClass(modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3042);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3043);
modelNode.setHTML(renderedModel || allTemplateFuncs.renderModel(model));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3044);
nodes.push(modelNode);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3045);
return nodes;
    },

    /**
     * Adds an empty item to make the lastItemOnTop (or left).
     * Does not remove the previous one -if available-. If nescesairy, you need to do this manually with _removeEmptyItem.
     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!
     *
     * @method _addEmptyItem
     * @param {Y.Node} [lastModelNode] Reference to the last node in the scrollview-instance.
     * @param {Int} [lastItemOnTop] internal pass through of lastItemOnTop
     * @private
     * @since 0.1
    */
    _addEmptyItem : function(lastModelNode, lastItemOnTop) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_addEmptyItem", 3059);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3060);
var instance = this,
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBox = instance.get('boundingBox'),
            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),
            viewNode = instance._viewNode,
            modelNode, viewsize, elementsize, modelElements,modelElementsSize;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3068);
if (!lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3069);
modelElements = viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3070);
modelElementsSize = modelElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3071);
if (modelElementsSize>0) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3072);
lastModelNode = modelElements.item(modelElementsSize-1);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3075);
modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),
        modelNode.addClass(EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3077);
viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3078);
if (lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3079);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3080);
elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3083);
elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3086);
lastModelNode = lastModelNode && lastModelNode.previous();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3087);
if (itemOnTopValue===2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3088);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3090);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3091);
elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3094);
elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3096);
lastModelNode = lastModelNode.previous();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3099);
modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3100);
if (elementsize>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3101);
viewNode.append(modelNode);
        }
    },

    /**
     * Removes the empty item that made the lastItemOnTop (or left).
     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!
     *
     * @method _removeEmptyItem
     * @private
     * @since 0.1
    */
    _removeEmptyItem : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_removeEmptyItem", 3113);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3114);
var instance = this,
            removeNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3117);
removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3118);
if (removeNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3119);
removeNode.remove(true);
        }
    },

    /**
     * Retreives the Li-Node given a Model from the ModelList, or the index,
     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed.
     *
     * @method _getNodeFromModelOrIndex
     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.
     * @param {Int} [index] Index of item in the modelList.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @private
     * @since 0.1
    */
    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getNodeFromModelOrIndex", 3140);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3146);
var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3153);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3154);
modelClientId = instance.getModelAttr(model, 'clientId');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3156);
findNode = function(node, loopindex) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNode", 3156);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3157);
var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3158);
if (found) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3159);
nodeFound = node;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3161);
return found;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3163);
do {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3164);
nodeList = instance._viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3165);
nodeList.some(findNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3166);
i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        }while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3173);
return nodeFound;
    },

    /**
     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method _selectModel
     * @param {Y.Model|Array} model Model or Array of Models to be checked
     * @param {Boolean} selectstatus whether the new status is true or false
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @private
     * @since 0.1
    */
    _selectModel : function(model, selectstatus, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_selectModel", 3189);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3195);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3201);
if (modelid && !itemUnselectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3202);
if (instance.hasPlugin('itsainfiniteview')) {
                // make sure the node is rendered
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3204);
instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3207);
modelnode = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3208);
if (modelnode) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3209);
if (!selectstatus) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3210);
modelnode.blur();
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3212);
modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3214);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3215);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3218);
delete instance._selectedModels[modelid];
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3222);
if (!modelid) {
            }
            else {
            }
        }
    },

    /**
     * A utility method that fires the selected Models.
     *
     * @method _fireSelectedModels
     * @private
     * @since 0.1
     */
    _fireSelectedModels : function () {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_fireSelectedModels", 3236);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3237);
var instance = this,
            selectedModels, originalModels;

        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Models), the Model is only once in the resultarray.
         * Meaning: only original unique Models are returned.
         *
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>
         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel
         * <b>is not part</b> of the original ModelList.
         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.
         * These models also exists in the original ModelList.
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3253);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3254);
originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3255);
instance.fire(
            'modelSelectionChange',
            {
                newModelSelection: selectedModels,
                originalModelSelection: originalModels
            }
        );
    },

    /**
     * Cleaning up all eventlisteners
     *
     * @method _clearEventhandlers
     * @private
     * @since 0.1
     *
    */
    _clearEventhandlers : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearEventhandlers", 3272);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3273);
YArray.each(
            this._handlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 33)", 3275);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3276);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3283);
Y.ITSAModellistViewExtention = ITSAModellistViewExtention;

}, '@VERSION@', {
    "requires": [
        "base-build",
        "node-base",
        "node-event-delegate",
        "dom-screen",
        "pluginhost-base",
        "event-mouseenter",
        "event-custom",
        "model",
        "model-list",
        "lazy-model-list",
        "template-micro"
    ]
});
