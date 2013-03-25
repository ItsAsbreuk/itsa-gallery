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
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].code=["YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * @module gallery-itsamodellistviewextention"," * @class ITSAModellistViewExtention"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    YTemplateMicro = Y.Template.Micro,","    VIEW_TEMPLATE_UL = '<ul role=\"presentation\"></ul>',","    VIEW_MODEL_TEMPLATE_UL = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_UL = '<li>{content}</li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE = '<tr><td colspan=\"{cols}\">{content}</td></tr>',","    TEMPLATE_TABLE = '<table role=\"presentation\"></table>',","    VIEW_TEMPLATE_TBODY = '<tbody></tbody>',","    VIEW_MODEL_TEMPLATE_TABLE = '<tr role=\"presentation\"></tr>',","    LOADING_TEMPLATE = '<div>{loading}</div>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-scrollviewmodel',","    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',","    MODELLIST_CLASS = 'itsa-modellistview',","    SVML_LASTMODEL_CLASS = MODELLIST_CLASS + '-lastitem',","    SVML_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-noinitialitems',","    SVML_VIEW_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-view-noinitialitems',","    SVML_NOITEMS_CLASS = MODELLIST_CLASS + '-noitems',","    SVML_VIEW_NOITEMS_CLASS = MODELLIST_CLASS + '-view-noitems',","    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = MODELLIST_CLASS + '-styled',","    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = MODELLIST_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = MODELLIST_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = MODELLIST_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = MODELLIST_CLASS + '-sequelgroupheader',","    SVML_UNSELECTABLE = MODELLIST_CLASS + '-unselectable',","    SVML_SHOWLOADING_CLASS = MODELLIST_CLASS + '-showloading',","    LOADING_MESSAGE = 'Loading...',","    NO_DATA_MESSAGE = 'No data to display',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","//===============================================================================================","// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes","// We mix it to both Y.LazyModelList as well as Y.ModelList","// this way we can always call these methods regardsless of a ModelList or LazyModelList as used","//===============================================================================================","","function ITSAModellistAttrExtention() {}","","Y.mix(ITSAModellistAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                revivedModel = instance.revive(model);","                model[name] = value;","                if (revivedModel) {","                    //======================================================================================","                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530","                    //","                    revivedModel._set('clientId', model.clientId, {silent: true});","                    //","                    //======================================================================================","                    revivedModel.set(name, value, options);","                    instance.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","    }","","}, true);","","Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;","","Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);","//Y.Base.mix(Y.LazyModelList, [ITSAModellistAttrExtention]);","","// -- Mixing extra Methods to Y.ScrollView -----------------------------------","","function ITSAModellistViewExtention() {}","","ITSAModellistViewExtention.ATTRS = {","","   /**","    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","    *","    * @attribute modelList","    * @type {ModelList}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setNoDups'","    },","","   /**","    * Defines the listType. Use 'ul' for unsorted list, or 'table' for table-format.","    * This attrbute can only be set once during innitialisation.","    * <b>Caution:</b> if you set this attribute to 'table', then all items are tr-elements and you need to render the","    * td-elements yourself within 'renderModel' and groupHeaders (with the right number of td's).","    *","    * @attribute listType","    * @type {String}","    * @default 'ul'","    * @since 0.1","    */","    listType: {","        value: 'ul',","        validator: function(v){ return (v==='ul') || (v==='table');},","        writeOnce: 'initOnly'","    },","","   /**","    * Limits the number of rendered Models. The value of 0 means: no limit.","    *","    * @attribute limitModels","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    limitModels: {","        value: 0,","        validator: function(v){ return Lang.isNumber(v);},","        setter: '_setLimitModels'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi', 'null' or '' equals false.","    *","    * @default false","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: null,","        lazyAdd: false,","        validator:  function(v) {","            return ((v==='') || (v===null) || Lang.isBoolean(v) || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSel'","    },","","   /**","    * If set, then there ALWAYS REMAINS 1 Model selected.","    * <i>Only accounts when 'modelsSelectable' is active.","    *","    * @default true","    * @attribute modelsUnselectable","    * @type {Boolean}","    * @since 0.1","    */","    modelsUnselectable: {","        value: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        }","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default true","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: true,","        lazyAdd: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return (Lang.isNumber(v) && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setClkEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-dblclick.","    * When set to true, the events 'modelDblclicked' is fired when double-clicking on the Models.","    *","    * @attribute dblclickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    dblclickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setDblclkEv'","    },","","   /**","    * When set to a value > 0, the Models will be m highlighted whenever they change (or new added).","    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.","    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-scrollviewmodel-changed' fors ome seconds.","    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.","    *","    * @attribute highlightAfterModelChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    highlightAfterModelChange: {","        value: 0,","        validator: function(v) {return Lang.isNumber(v);},","        setter: '_setMarkModelChange'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterAdd","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterAdd: {","        value: false,","        validator: function(v) {return (Lang.isNumber(v) && (v>=0) && (v<=2));},","        setter: '_setIntoViewAdded'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after a ModelChange.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterChange: {","        value: false,","        validator: function(v) {return (Lang.isNumber(v) && (v>=0) && (v<=2));},","        setter: '_setIntoViewChanged'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setMouseDnUpEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setHoverEv'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setGrpH3'","    },","","    /**","     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's).","     * Example: '<td><%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderModel","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    renderModel: {","        value: '{clientId}', // default-template, so that there always is content. Best to be overwritten.","        validator: function(v){ return Lang.isString(v); },","        setter: '_setRenderModel'","    },","","    /**","     * Template to render an additional className to the rendered element. In fact: every Model will be rendered inside a <li>-element.","     * The innercontent of the LI-element is determined by 'renderModel' while renderClassName can add additional classes to the li-element.","     * The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{gender}'","     * <b>Example with Y.Template.Micro:</b>","     * '<% if (data.age>18) {%>adult<% } %>'","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderClassName","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    renderClassName: {","        value: null,","        validator: function(v){ return Lang.isString(v); },","        setter: '_setRenderClass'","    },","","    /**","     * Template for rendering of groupHeader1. If not set, renderGroupHeader1 will render the same as the attribute 'groupHeader1'.","     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader1: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH1'","    },","","    /**","     * Template for rendering of groupHeader2. If not set, renderGroupHeader2 will render the same as the attribute 'groupHeader2'.","     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader2: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH2'","    },","","    /**","     * Template for rendering of groupHeader3. If not set, renderGroupHeader3 will render the same as the attribute 'groupHeader3'.","     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute renderGroupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader3: {","        value: null,","        validator: function(v){ return Lang.isString(v) || v === null; },","        setter: '_setRenderGrH3'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'renderModel').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setDupComp'","    },","","    /**","     * Attribute that makes the message 'Loading...' visible until the view is rendered for the first time.","     * Only showed if you didn't not use 'itsa-modellistview-noinitialitems' to hide the widget...","     *","     * @attribute showLoadMessage","     * @type {Boolean}","     * @default false","     * @since 0.1","     */","    showLoadMessage: {","        value: false,","        validator: function(v){ return Lang.isBoolean(v); }","    }","","};","","Y.mix(ITSAModellistViewExtention.prototype, {","","    //-------------------------------------------------------------------------------------","    //---- Private properties -------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Internal list that holds event-references","     * @property _handlers","     * @private","     * @default []","     * @type Array","    */","    _handlers : [],","","    /**","     * Internal reference to the original models, which is only used when DupModels are avaialble.","     * It makes it posible to return the original models on a modelClick-event.","     * @property _origModels","     * @private","     * @default []","     * @type Array","    */","    _origModels : [],","","    /**","     * Internal eventhandle, defined when the attribute 'selectedModels' is used.","     * @property _selModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _selModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'clickEvents' is used.","     * @property _clkModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _clkModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.","     * @property _dblclkModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _dblclkModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","     * @property _mouseentModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseentModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","     * @property _mouseUpModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseUpModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","     * @property _mouseDnModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseDnModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","     * @property _mouseleaveModelEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _mouseleaveModelEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","     * @property _markModelChangeEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _markModelChangeEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","     * @property _markModelAddEv","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _markModelAddEv : null,","","    /**","     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.","     * @property _modelInViewChanged","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _modelInViewChanged : null,","","    /**","     * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.","     * @property _modelInViewAdded","     * @private","     * @default null","     * @type Y.EventHandle","    */","    _modelInViewAdded : null,","","    /**","     * Internal object with references to all selected Models.","     * @property _selectedModels","     * @private","     * @default {}","     * @type Object","    */","    _selectedModels : {},","","    /**","     * Internal reference to the viewNode","     * @property _viewNode","     * @private","     * @default null","     * @type Y.Node","    */","    _viewNode : null,","","    /**","     * The id of _viewNode","     * @property _viewId","     * @private","     * @default null","     * @type String","    */","    _viewId : null,","","    /**","     * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.","     * @property _currentViewPg","     * @private","     * @default 0","     * @type Int","    */","    _currentViewPg : 0,","","    /**","     * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.","     * @property _templFns","     * @private","     * @default null","     * @type Object","    */","    _templFns : null,","","    /**","     * Internal reference to the last Model that was clicked.","     * @property _lastClkModel","     * @private","     * @default null","     * @type Y.Model","    */","    _lastClkModel : null,","","    /**","     * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.","     * @property _abModelList","     * @private","     * @default null","     * @type Y.ModelList | Y.LazyModelList","    */","    _abModelList : null,","","    /**","     * Internal flag to tell whether the attribute 'viewFilter' is initiated.","     * @property _viewFilterInit","     * @private","     * @default false","     * @type Boolean","    */","    _viewFilterInit : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader1' is initiated.","     * @property _grpH1Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH1Init : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader2' is initiated.","     * @property _grpH2Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH2Init : false,","","    /**","     * Internal flag to tell whether the attribute 'groupHeader3' is initiated.","     * @property _grpH3Init","     * @private","     * @default false","     * @type Boolean","    */","    _grpH3Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader1' is initiated.","     * @property _renderGrpH1Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH1Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader2' is initiated.","     * @property _renderGrpH2Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH2Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderGroupHeader3' is initiated.","     * @property _renderGrpH3Init","     * @private","     * @default false","     * @type Boolean","    */","    _renderGrpH3Init : false,","","    /**","     * Internal flag to tell whether the attribute 'renderModel' is initiated.","     * @property _renderModelInit","     * @private","     * @default false","     * @type Boolean","    */","    _renderModelInit : false,","","    /**","     * Internal flag to tell whether the attribute 'renderClassName' is initiated.","     * @property _renderClassInit","     * @private","     * @default false","     * @type Boolean","    */","    _renderClassInit : false,","","    /**","     * Internal flag to tell whether the attribute 'dupComparator' is initiated.","     * @property _dupCompInit","     * @private","     * @default false","     * @type Boolean","    */","    _dupCompInit : false,","","    /**","     * Internal flag to tell whether the attribute 'noDups' is initiated.","     * @property _noDupsInit","     * @private","     * @default false","     * @type Boolean","    */","    _noDupsInit : false,","","    /**","     * Internal flag to tell whether the attribute 'limitModels' is initiated.","     * @property _limModelsInit","     * @private","     * @default false","     * @type Boolean","    */","    _limModelsInit : false,","","    /**","     * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.","     * @property _rerendAttrChg","     * @private","     * @default true","     * @type Boolean","    */","    _rerendAttrChg : true,","","    /**","     * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.","     * @property _itmsAvail","     * @private","     * @default false","     * @type Boolean","    */","    _itmsAvail : false, // must initially be set true","","    /**","     * Internal refrence to the index of the last rendered Model in the View.","     * @property _prevLastModelIndex","     * @private","     * @default -1","     * @type Int","    */","    _prevLastModelIndex : -1,","","    /**","     * Internal flag that tells is the used ModelList is a LazyModelList.","     * @property _listLazy","     * @private","     * @default false","     * @type Boolean","    */","    _listLazy : false,","","    /**","     * The content of the last rendered Header1","     * @property _prevH1","     * @private","     * @default null","     * @type String|null","    */","    _prevH1 : null,","","    /**","     * The content of the last rendered Header2","     * @property _prevH2","     * @private","     * @default null","     * @type String|null","    */","    _prevH2 : null,","","    /**","     * The content of the last rendered Header3","     * @property _prevH3","     * @private","     * @default null","     * @type String|null","    */","    _prevH3 : null,","","    /**","     * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.","     * @property _even","     * @private","     * @default false","     * @type Boolean","    */","    _even : false,","","    //-------------------------------------------------------------------------------------","    //---- Public methods -----------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        instance._viewId = Y.guid();","        instance._handlers.push(","            instance.after(","                'render',","                instance._render,","                instance","            )","        );","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerendAttrChg = false;","        instance.set(name, val, opts);","        instance._rerendAttrChg = true;","    },","","    /**","     * Retreives the Li-Node given the index from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromIndex","     * @param {Int} index Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromIndex : function(index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(null, index, maxExpansions);","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromModel","     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromModel : function(model, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(model, null, maxExpansions);","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method saveScrollTo","     * @since 0.1","     *","    */","    saveScrollTo : function() {","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method scrollIntoView","     * @since 0.1","    */","    scrollIntoView : function() {","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            isArray = Lang.isArray(models),","            singleSelectable = (instance.get('modelsSelectable')==='single'),","            prevSize, contentBox;","","        if (singleSelectable) {","            instance.clearSelectedModels(true, true);","        }","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","","        if (isArray && !singleSelectable) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true, maxExpansions);","                }","            );","            if (scrollIntoView && (models.length>0)) {","                instance.scrollIntoView(models[0], options, maxExpansions);","            }","        }","        else {","            if (isArray) {","                models = models[0];","            }","            instance._selectModel(models, true, maxExpansions);","            if (scrollIntoView) {","                instance.scrollIntoView(models, options, maxExpansions);","            }","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @since 0.1","    */","    unselectModels : function(models, silent) {","        var instance = this,","            prevSize, contentBox;","","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false);","                }","            );","        }","        else {","            instance._selectModel(models, false);","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.","     * @since 0.1","    */","    clearSelectedModels : function(silent, force) {","        var instance = this,","            contentBox = instance.get('contentBox'),","            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;","","        blurAll = function() {","            currentSelected.each(","                function(node) {","                    node.blur();","                }","            );","        };","        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);","        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);","        if (silent) {","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","        }","        else {","            fireEvent = (currentSelected.size()>0);","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","            if (fireEvent) {","                instance._fireSelectedModels();","            }","        }","        instance._selectedModels = {};","        if (instance.get('modelsUnselectable') && firstSelected && !force) {","            clientId = firstSelected.getData('modelClientId');","            modelList = instance.getModelListInUse();","            model = modelList.getByClientId(clientId);","            instance.selectModels(model, false, null, true);","        }","    },","","    /**","     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _origModels, then it has an originalModel","                    var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Normal speaken, you only need to call this method yourself, when the ModelList.comparator changes.","     * The viewNode will be updated automaticly when attributes change, or when the (Lazy)-ModelList changes, or when","     * Models change. Be aware though, that the Model needs to fire a *:change event in roder to make the changes happen. This means,","     * that if you are using a LazyModelList, then be sure the object is revived into a Model-instance.","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Returns the modellist that is responsible for building the items. Normally speaken, this is the attribute 'modelList'","     * itself. However, if DupModels are active, the list is axpanded and _abModelList is returned.","     *","     * @method getModelListInUse","     * @since 0.1","     *","    */","    getModelListInUse : function() {","        return this._abModelList || this.get('modelList');","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, modelList, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                modelList = instance.get('modelList');","                revivedModel = modelList.revive(model);","                model[name] = value;","                if (revivedModel) {","                    //======================================================================================","                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530","                    //","                    revivedModel._set('clientId', model.clientId, {silent: true});","                    //","                    //======================================================================================","                    revivedModel.set(name, value, options);","                    modelList.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selModelEv) {","            instance._selModelEv.detach();","        }","        if (instance._clkModelEv) {","            instance._clkModelEv.detach();","        }","        if (instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","        }","        if (instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","        }","        if (instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","        }","        if (instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","        }","        if (instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","        }","        if (instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","        }","        if (instance._markModelAddEv) {","            instance._markModelAddEv.detach();","        }","        if (instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","        }","        if (instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","        }","        instance._clearAbberantModelList();","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            listType = instance.get('listType'),","            boundingBox = instance.get('boundingBox'),","            viewNode;","","        instance.get('contentBox').setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));","        instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        viewNode.set('id', instance._viewId);","        viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);","        boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);","        if (instance.get('showLoadMessage')) {","            boundingBox.addClass(SVML_SHOWLOADING_CLASS);","        }","        instance._templFns = instance._getAllTemplateFuncs();","        instance._extraBindUI();","        if (modellist) {","            instance._renderView(null, {incrementbuild: true, initbuild: true});","        }","    },","","    /**","     * Focusses the modelNode and adds the className 'itsa-scrollviewmodel-focus'.","     * Previous focussed Node will be unmarked.","     *","     * @method _focusModelNode","     * @param {Y.Node} modelNode the ModelNode that should gain focus.","     * @private","     * @since 0.1","     *","    */","    _focusModelNode: function(modelNode) {","        if (modelNode) {","            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);","            modelNode.addClass(SVML_FOCUS_CLASS);","            modelNode.focus();","        }","    },","","    /**","     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","     * bumbs too much.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the param is needed.","     *","     * @method _getMaxPaginatorGotoIndex","     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","     * This only applies when the ITSAInifiniteView is plugged in.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Int} maximum PaginatorIndex that should be called.","     * @private","     * @since 0.1","     *","    */","    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            paginator = instance.hasPlugin('pages'),","            modelList = instance.getModelListInUse(),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","            i = 0,","            lastNode, size, liElements;","","        if (paginator && (modelList.size()>0)) {","            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);","            if (yAxis) {","                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","            }","            else {","                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","            }","            liElements = instance._viewNode.all('>li');","            i = liElements.size();","            while (lastNode && (--i>=0) && (size<boundingSize)) {","                lastNode = liElements.item(i);","                if (yAxis) {","                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","            }","            if (size>=boundingSize) {i++;}","        }","        return i;","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._handlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(MODELLIST_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(MODELLIST_CLASS);","                    instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});","                }","                else {","                    boundingBox.removeClass(MODELLIST_CLASS);","                    instance.get('contentBox').setHTML('');","                }","            })","        );","        // This was a though one!!","        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null","        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()","        // Thus, we need to reset _gesture when click without movement","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function() {","                    instance._gesture = null;","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction);","                }","            )","        );","        //========================================================","        //","        // LACK IN ModelList --> make resort after *:change","        //","        //=======================================================","        eventhandlers.push(","            instance.after(","                '*:change',","                function() {","                    var modellist = instance.get('modelList');","                    if (modellist && instance.get('modelList').comparator) {","                        modellist.sort();","                    }","                }","            )","        );","        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function(e) {","                    // Prevent links from navigating as part of a scroll gesture","                    if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {","                        e.preventDefault();","                        e.stopImmediatePropagation();","                    }","                },","                function() {","                    var tagName = this.get('tagName');","                    return ((tagName==='A') || (tagName==='BUTTON'));","                }","            )","        );","        // also prevent default on mousedown, to prevent the native \"drag link to desktop\" behavior on certain browsers.","        eventhandlers.push(","            boundingBox.delegate(","                'mousedown',","                function(e) {","                    // Prevent default anchor drag behavior, on browsers","                    // which let you drag anchors to the desktop","                    e.preventDefault();","                },","                'a'","            )","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after(","                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add', '*:change'],","                Y.bind(instance._renderView, instance, null, null)","            )","        );","        eventhandlers.push(","            instance.after(","                ['modelList:reset', 'lazyModelList:reset'],","                Y.bind(instance._renderView, instance, null, {keepstyles: false})","            )","        );","        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,","        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute","        instance.get('highlightAfterModelChange');","        instance.get('modelsIntoViewAfterAdd');","        instance.get('modelsIntoViewAfterChange');","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        instance._listLazy = (val instanceof Y.LazyModelList);","        instance._itmsAvail = val && (val.size()>0);","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._noDupsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._noDupsInit = true;","        }","    },","","    /**","     * Setter for attribute limitModels. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLimitModels","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLimitModels : function(val) {","        var instance = this;","","        if (instance._limModelsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({limitModels: val});","            }","        }","        else {","            instance._limModelsInit = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._viewFilterInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._viewFilterInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComp","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComp : function(val) {","        var instance = this;","","        if (instance._dupCompInit) {","            if (instance._rerendAttrChg && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._dupCompInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH1","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH1 : function(val) {","        var instance = this;","","        if (instance._grpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH1Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH2","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH2 : function(val) {","        var instance = this;","","        if (instance._grpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH2Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH3","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH3 : function(val) {","        var instance = this;","","        if (instance._grpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH3Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH1","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH1 : function(val) {","        var instance = this;","","        if (instance._renderGrpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderGrpH1Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH2","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH2 : function(val) {","        var instance = this;","","        if (instance._renderGrpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderGrpH2Init = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGrH3","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGrH3 : function(val) {","        var instance = this;","","        if (instance._renderGrpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderGrpH3Init = true;","        }","    },","","    /**","     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderModel","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderModel : function(val) {","        var instance = this;","","        if (instance._renderModelInit) {","            instance._templFns = instance._getAllTemplateFuncs({renderModel: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderModelInit = true;","        }","    },","","    /**","     * Setter for attribute renderClassName. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderClass","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderClass : function(val) {","        var instance = this;","","        if (instance._renderClassInit) {","            instance._templFns = instance._getAllTemplateFuncs({renderClassName: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderClassInit = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selModelEv.","     *","     * @method _setModelsSel","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSel : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.","        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation","        if (Y.UA.ie>0) {","            contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');","        }","        contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selModelEv) {","            instance._selModelEv = contentBox.delegate(","                'click',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selModelEv) {","            instance._selModelEv.detach();","            instance._selModelEv = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clkModelEv = contentBox.delegate(","                'click',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clkModelEv) {","            instance._clkModelEv.detach();","            instance._clkModelEv = null;","        }","    },","","    /**","     * Sets or removes dblclick-events when the mouse double-clicks on a Model.","     *","     * @method _setDblclkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setDblclkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._dblclkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelDblclick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._dblclkModelEv = contentBox.delegate(","                'dblclick',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelDblclick', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","            instance._dblclkModelEv = null;","        }","    },","","    /**","     * Sets or removes highlight-effects after a Model is changed.","     *","     * @method _setMarkModelChange","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMarkModelChange : function(val) {","        var instance = this;","","        if (val && (val>0) && !instance._markModelChangeEv) {","            instance._markModelChangeEv = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node = instance.getNodeFromModel(model);","                    if (node) {","                        node.addClass(MODEL_CHANGED_CLASS);","                        Y.later(","                            val,","                            instance,","                            function() {","                                if (node) {","                                    node.removeClass(MODEL_CHANGED_CLASS);","                                }","                            }","                        );","                    }","                }","            );","        }","        else if (!val && instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","            instance._markModelChangeEv = null;","        }","        if (val && (val>0) && !instance._markModelAddEv) {","            instance._markModelAddEv = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    var node = instance.getNodeFromIndex(e.index);","                    if (node) {","                        node.addClass(MODEL_CHANGED_CLASS);","                        Y.later(","                            val,","                            instance,","                            function() {","                                if (node) {","                                    node.removeClass(MODEL_CHANGED_CLASS);","                                }","                            }","                        );","                    }","                }","            );","        }","        else if (!val && instance._markModelAddEv) {","            instance._markModelAddEv.detach();","            instance._markModelAddEv = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is added to the list.","     *","     * @method _setIntoViewAdded","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewAdded : function(val) {","        var instance = this;","","        if ((val >0) && !instance._modelInViewAdded) {","            instance._modelInViewAdded = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});","                }","            );","        }","        else if ((val===0) && instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","            instance._modelInViewAdded = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is changed.","     *","     * @method _setIntoViewChanged","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewChanged : function(val) {","        var instance = this;","","        if ((val>0) && !instance._modelInViewChanged) {","            instance._modelInViewChanged = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node = instance.getNodeFromModel(model);","                    if (node) {","                        instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});","                    }","                }","            );","        }","        else if ((val===0) && instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","            instance._modelInViewChanged = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDnUpEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDnUpEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDnModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDnModelEv = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","            instance._mouseDnModelEv = null;","        }","        if (val && !instance._mouseUpModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEv = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","            instance._mouseUpModelEv = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseentModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseentModelEv = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","            instance._mouseentModelEv = null;","        }","        if (val && !instance._mouseleaveModelEv) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEv = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","            instance._mouseleaveModelEv = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance.getModelListInUse(),","            modelClientId = modelNode.getData('modelClientId'),","            model = modelList && modelList.getByClientId(modelClientId),","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,","            currentSelected, firstItemSelected;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        if (model) {","            // At this stage, 'modelsSelectable' is either 'single' or 'multi'","            if (singleSelectable || !ctrlClick) {","                if (instance.get('modelsUnselectable')) {","                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);","                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);","                }","                instance.clearSelectedModels(true, true);","            }","            if (shiftClick && instance._lastClkModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClkModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels, false, null, true);","            }","            else {","                if (modelPrevSelected && !firstItemSelected) {","                    instance.unselectModels(model, true);","                }","                else {","                    instance.selectModels(model, false, null, true);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClkModel = modelPrevSelected ? null : model;","            }","            instance._focusModelNode(modelNode);","        }","        instance._fireSelectedModels();","    },","","    /**","     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.","     *","     * @method _getAllTemplateFuncs","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @private","     * @return {Object} All templates --> an object with the fields: <b>renderModel, renderClassName, groupH1, groupH2, groupH3,","     * renderGH1, renderGH2, renderGH3, activeClass, activeGH1, activeGH2, activeGH3</b>. The last 4 keys are Booleans, the other are templates.","     * @since 0.1","     *","    */","    _getAllTemplateFuncs : function(setterAttrs) {","        var instance = this,","            renderModel = (setterAttrs && setterAttrs.renderModel) || instance.get('renderModel'),","            renderClassName = (setterAttrs && setterAttrs.renderModel) || instance.get('renderClassName'),","            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),","            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),","            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),","            renderGH1 = (setterAttrs && setterAttrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupH1,","            renderGH2 = (setterAttrs && setterAttrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupH2,","            renderGH3 = (setterAttrs && setterAttrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupH3,","            activeClass = renderClassName && (renderClassName.length>0),","            activeGH1 = groupH1 && (groupH1.length>0),","            activeGH2 = groupH2 && (groupH2.length>0),","            activeGH3 = groupH3 && (groupH3.length>0),","            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,","            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,","            compiledRenderGH3Engine, templateObject, isMicroTemplate, classNameEngine;","","        isMicroTemplate = function(template) {","            var microTemplateRegExp = /<%(.+)%>/;","            return microTemplateRegExp.test(template);","        };","        if (isMicroTemplate(renderModel)) {","            compiledModelEngine = YTemplateMicro.compile(renderModel);","            modelEngine = function(model) {","                return compiledModelEngine(instance.getModelToJSON(model));","            };","        }","        else {","            modelEngine = function(model) {","                return Lang.sub(renderModel, instance.getModelToJSON(model));","            };","        }","        if (isMicroTemplate(renderClassName)) {","            compiledModelEngine = YTemplateMicro.compile(renderClassName);","            classNameEngine = function(model) {","                return compiledModelEngine(instance.getModelToJSON(model));","            };","        }","        else {","            classNameEngine = function(model) {","                return Lang.sub(renderClassName, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(groupH1)) {","            compiledGroupH1Engine = YTemplateMicro.compile(groupH1);","            groupH1Engine = function(model) {","                return compiledGroupH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH1Engine = function(model) {","                return Lang.sub(groupH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(groupH2)) {","            compiledGroupH2Engine = YTemplateMicro.compile(groupH2);","            groupH2Engine = function(model) {","                return compiledGroupH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH2Engine = function(model) {","                return Lang.sub(groupH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(groupH3)) {","            compiledGroupH3Engine = YTemplateMicro.compile(groupH3);","            groupH3Engine = function(model) {","                return compiledGroupH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH3Engine = function(model) {","                return Lang.sub(groupH3, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(renderGH1)) {","            compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);","            renderGH1Engine = function(model) {","                return compiledRenderGH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH1Engine = function(model) {","                return Lang.sub(renderGH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(renderGH2)) {","            compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);","            renderGH2Engine = function(model) {","                return compiledRenderGH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH2Engine = function(model) {","                return Lang.sub(renderGH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(renderGH3)) {","            compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);","            renderGH3Engine = function(model) {","                return compiledRenderGH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH3Engine = function(model) {","                return Lang.sub(renderGH3, instance.getModelToJSON(model));","            };","        }","        templateObject = {","            renderModel : modelEngine,","            renderClassName : classNameEngine,","            groupH1 : groupH1Engine,","            groupH2 : groupH2Engine,","            groupH3 : groupH3Engine,","            renderGH1 : renderGH1Engine,","            renderGH2 : renderGH2Engine,","            renderGH3 : renderGH3Engine,","            activeClass : activeClass,","            activeGH1 : activeGH1,","            activeGH2 : activeGH2,","            activeGH3 : activeGH3","        };","        return templateObject;","    },","","    /**","     * Will try to render 'trymodel' through the template defined with tha attribute 'renderModel'.","     * Only succeeds if it passes all tests declared by the other params. Should it fail the tests, then 'false' is returned.","     * If succeeded, the the HTML (String) will be returned.","     *","     * @method _tryRenderModel","     * @param {Y.Model} trymodel The Model (might be an object in case of LazyModelList) to be rendered","     * @param {String} [prevrenderedmodel] The previous Model that was rendered: should be in a 'rendered-state'.","     * Is used to check against when nodups are permitted and dupComparator is undefined.","     * @param {Y.Array} modelListItemsArray (Lazy)ModelList in array-form","     * @param {Function} viewFilter the viewFilter function (attribute), passed as a parameter for performancereasons","     * @param {Boolean} noDups the value of the attribute 'nodups', passed as a parameter for performancereasons","     * @param {Function} dupComparator the dupComparator function (attribute), passed as a parameter for performancereasons","     * @param {Object} allTemplateFuncs passed as a parameter for performancereasons","     * @private","     * @return {HTML|false} false if failed -possibly because it's a dup or falls out of the filter-, otherwise returns the rendered HTML: rendered","     * through the 'renderModel'-template","     * @since 0.1","     *","    */","    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {","        var instance = this,","            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;","","        dubComparatorBinded = Y.rbind(dupComparator, instance);","        viewFilterBinded = Y.rbind(viewFilter, instance);","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dubComparatorBinded(model);","            YArray.some(","                modelListItemsArray,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dubComparatorBinded(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        allowed = (!viewFilter || viewFilterBinded(trymodel)) &&","                      (!noDups ||","                       (!dupComparator && ((renderedmodel = allTemplateFuncs.renderModel(trymodel))!==prevrenderedmodel)) ||","                       (dupComparator && !dupAvailable(trymodel))","                      );","        return allowed && (renderedmodel || allTemplateFuncs.renderModel(trymodel));","    },","","    _clearAbberantModelList : function() {","        var instance = this;","","        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","        if (instance._abModelList) {","            instance._abModelList.destroy();","        }","        instance._abModelList = null;","    },","","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","","     * @param {Object} [options]","     *    @param {Boolean} [options.rebuild=true] set to 'false' if you don't want to rebuild but want to add items at the end of the list","     *    unless the infiniteView-plugin is available OR limitModels>0","     *    @param {Int} [options.page=0] lets ITSAViewPagination make rendering pages","     *    @param {Boolean} [options.incrementbuild=false] if 'true': appends every element one by one.","     *    If 'false' the whole <ul> will be replaced at once.","     *    @param {Boolean} [options.keepstyles=true] set to 'false' if you don't want to retain selected/focused info (only when you 'reset' the list)","     *    @param {Boolean} [options.initbuild=false] internal flag to notify the initial build","     * @private","     * @since 0.1","    */","    _renderView : function(setterAttrs, options) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            noDups = (setterAttrs && setterAttrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAttrs && setterAttrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAttrs && setterAttrs.viewFilter) || instance.get('viewFilter'),","            paginator = instance.pages,","            changedLimitModels = (setterAttrs && setterAttrs.limitModels),","            limitModels = changedLimitModels || instance.get('limitModels'),","            allTemplateFuncs = instance._templFns,","            lastItemOnTop = (setterAttrs && setterAttrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            infiniteView = instance.itsainfiniteview,","            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,","            modelConfig, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,","            i, j, model, modelListItems, batchSize, items, modelListItemsLength, table, noDataTemplate;","","        options = options || {};","        options.page = options.page || instance._currentViewPg;","        pageSwitch = (instance._currentViewPg!==options.page);","        options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);","        options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;","        options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;","        if (!contentBox.one('#'+instance._viewId)) {","            if (instance.get('listType')==='ul') {","                contentBox.setHTML(viewNode);","            }","            else {","                contentBox.setHTML(TEMPLATE_TABLE);","                table = contentBox.one('table');","                if (table) {","                    table.append(viewNode);","                }","            }","            instance._set('srcNode', contentBox);","        }","        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (options.rebuild) {","            i = (options.page*limitModels) -1; // will be incread to zero at start loop","            instance._prevH1 = null;","            instance._prevH2 = null;","            instance._prevH3 = null;","            instance._even = false;","            if (infiniteView) {","                instance._itmsAvail = true;","            }","            instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);","            viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);","        }","        else {","            // start with the last index","            viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);","            i = (instance._prevLastModelIndex || -1); // i will be increased at start loop","        }","        if (!options.incrementbuild) {","            newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');","            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, options.rebuild);","                modelList = instance._abModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._clearAbberantModelList();","            }","        }","        else {","            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._clearAbberantModelList();","        }","","        // in case of ITSAViewPaginator is active --> limitModels is always>0","        renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;","        listIsLimited = (renderListLength<modelListItemsLength);","        items = 0;","        batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;","        if (i>0) {","            // when available: remove the fillNode that makes lastItemOnTop","            // It will be rendered on the bottom again","            instance._removeEmptyItem();","        }","        while ((items<batchSize) && (++i<renderListLength)) {","            model = modelListItems[i];","            renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,","                                                     dupComparator, allTemplateFuncs);","            if (renderedModel) {","                if (items===0) {","                    instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);","                    viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);","                    if (options.initbuild) {","                        instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);","                        viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);","                    }","                }","                items++;","                modelNode = instance._createModelNode(model, renderedModel);","                // modelNode is an ARRAY of Y.Node !!!","                for (j=0; j<modelNode.length; j++) {","                    if (options.incrementbuild) {","                        viewNode.append(modelNode[j]);","                    }","                    else {","                        newViewNode.append(modelNode[j]);","                    }","                }","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","        }","        if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {","            modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i;","        if (!options.incrementbuild) {","            if (options.keepstyles) {","                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first","                findNodeByClientId = function(modelClientId, nodelist) {","                    var nodeFound;","                    nodelist.some(","                        function(node) {","                            var found = (node.getData('modelClientId') === modelClientId);","                            if (found) {","                                nodeFound = node;","                            }","                            return found;","                        }","                    );","                    return nodeFound;","                };","                previousViewModels = viewNode.all('.'+MODEL_CLASS);","                newViewModels = newViewNode.all('.'+MODEL_CLASS);","                previousViewModels.each(","                    function(node) {","                        var hasSelected = node.hasClass(SVML_SELECTED_CLASS),","                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),","                            newnode;","                        if (hasSelected || hasFocus) {","                            newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);","                            if (newnode) {","                                newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);","                                newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);","                            }","                        }","                    }","                );","            }","            viewNode.replace(newViewNode);","            instance._viewNode = newViewNode;","            newViewNode.set('id', instance._viewId);","        }","        if (viewNode.getHTML()==='') {","            noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));","        }","        if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!","            instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);","        }","        instance._currentViewPg = options.page;","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","//========================================================","        // now a correction of PaginatorPlugin-bug:","        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin","        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown","        if (paginator) {","            currentPaginatorIndex = paginator.get('index');","            maxPaginatorIndex = viewNode.get('children').size() - 1;","            if (currentPaginatorIndex > maxPaginatorIndex) {","                paginator.set('index', maxPaginatorIndex);","            }","        }","//========================================================","        if (infiniteView) {","            infiniteView.checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","// return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.","    _createModelNode : function(model, renderedModel) {","        var instance = this,","            modelClientId = instance.getModelAttr(model, 'clientId'),","            nodes = [],","            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,","            modelNode = YNode.create(rowtemplate),","            header1, header2, header3, headerNode, allTemplateFuncs;","","        allTemplateFuncs = instance._templFns;","        if (allTemplateFuncs.activeGH1) {","            header1 = allTemplateFuncs.groupH1(model);","            if (header1!==instance._prevH1) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER1_CLASS);","                if (instance._prevH1) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH1(model));","                nodes.push(headerNode);","                instance._prevH1 = header1;","                instance._even = false;","                // force to make a header2 insertion (when appropriate)","                instance._prevH2 = null;","            }","        }","        if (allTemplateFuncs.activeGH2) {","            header2 = allTemplateFuncs.groupH2(model);","            if (header2!==instance._prevH2) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER2_CLASS);","                if (instance._prevH2) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH2(model));","                nodes.push(headerNode);","                instance._prevH2 = header2;","                instance._even = false;","                // force to make a header3 insertion (when appropriate)","                instance._prevH3 = null;","            }","        }","        if (allTemplateFuncs.activeGH3) {","            header3 = allTemplateFuncs.groupH3(model);","            if (header3!==instance._prevH3) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER3_CLASS);","                if (instance._prevH3) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH3(model));","                nodes.push(headerNode);","                instance._prevH3 = header3;","                instance._even = false;","            }","        }","        modelNode.setData('modelClientId', modelClientId);","        if (allTemplateFuncs.activeClass) {","            modelNode.addClass(allTemplateFuncs.renderClassName(model));","        }","        modelNode.addClass(MODEL_CLASS);","        modelNode.addClass(modelClientId);","        modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","        modelNode.setHTML(renderedModel || allTemplateFuncs.renderModel(model));","        nodes.push(modelNode);","        return nodes;","    },","","    /**","     * Adds an empty item to make the lastItemOnTop (or left).","     * Does not remove the previous one -if available-. If nescesairy, you need to do this manually with _removeEmptyItem.","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _addEmptyItem","     * @param {Y.Node} [lastModelNode] Reference to the last node in the scrollview-instance.","     * @param {Int} [lastItemOnTop] internal pass through of lastItemOnTop","     * @private","     * @since 0.1","    */","    _addEmptyItem : function(lastModelNode, lastItemOnTop) {","        var instance = this,","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBox = instance.get('boundingBox'),","            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),","            viewNode = instance._viewNode,","            listTypeUL = (instance.get('listType')==='ul'),","            template = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;","","        instance._removeEmptyItem();","        if (!lastModelNode) {","            modelElements = viewNode.all('.'+MODEL_CLASS);","            modelElementsSize = modelElements.size();","            if (modelElementsSize>0) {","                lastModelNode = modelElements.item(modelElementsSize-1);","            }","        }","        if (!listTypeUL) {","            // table template --> we must set colspan","            nrCells = lastModelNode.all('>td').size();","        }","        template = Lang.sub(template, {cols: nrCells, content: ''});","        modelNode = YNode.create(template),","        modelNode.addClass(EMPTY_ELEMENT_CLASS);","        viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');","        if (lastModelNode) {","            if (yAxis) {","                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');","            }","            else {","                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');","            }","        }","        lastModelNode = lastModelNode && lastModelNode.previous();","        if (itemOnTopValue===2) {","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                if (yAxis) {","                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));","                }","                else {","                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));","                }","                lastModelNode = lastModelNode.previous();","            }","        }","        modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');","        if (elementsize>0) {","            viewNode.append(modelNode);","        }","    },","","    /**","     * Removes the empty item that made the lastItemOnTop (or left).","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _removeEmptyItem","     * @private","     * @since 0.1","    */","    _removeEmptyItem : function() {","        var instance = this,","            removeNode;","","        removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);","        if (removeNode) {","            removeNode.remove(true);","        }","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList, or the index,","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method _getNodeFromModelOrIndex","     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [index] Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @private","     * @since 0.1","    */","    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),","            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),","            i = 0,","            nodeFound = false,","            nodeList, findNode, modelClientId;","","        if (model) {","            modelClientId = instance.getModelAttr(model, 'clientId');","        }","        findNode = function(node, loopindex) {","            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);","            if (found) {","                nodeFound = node;","            }","            return found;","        };","        do {","            nodeList = instance._viewNode.all('.'+MODEL_CLASS);","            nodeList.some(findNode);","            i++;","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());","        return nodeFound;","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),","            modelnode;","","        if (modelid && !itemUnselectable) {","            if (instance.hasPlugin('itsainfiniteview')) {","                // make sure the node is rendered","                instance._getNodeFromModelOrIndex(model, null, maxExpansions);","            }","            // each modelid-class should be present only once","            modelnode = contentBox.one('.'+modelid);","            if (modelnode) {","                if (!selectstatus) {","                    modelnode.blur();","                }","                modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","            if (!modelid) {","            }","            else {","            }","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned.","         *","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>","         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel","         * <b>is not part</b> of the original ModelList.","         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.","         * These models also exists in the original ModelList.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._handlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ITSAModellistViewExtention = ITSAModellistViewExtention;","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"dom-screen\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].lines = {"1":0,"3":0,"19":0,"56":0,"65":0,"67":0,"81":0,"102":0,"105":0,"106":0,"107":0,"108":0,"109":0,"110":0,"114":0,"117":0,"118":0,"122":0,"139":0,"144":0,"146":0,"151":0,"153":0,"166":0,"184":0,"201":0,"215":0,"233":0,"251":0,"268":0,"289":0,"309":0,"327":0,"343":0,"360":0,"377":0,"394":0,"412":0,"428":0,"456":0,"484":0,"512":0,"539":0,"562":0,"591":0,"620":0,"649":0,"669":0,"684":0,"689":0,"1068":0,"1070":0,"1071":0,"1094":0,"1096":0,"1097":0,"1098":0,"1122":0,"1146":0,"1178":0,"1181":0,"1182":0,"1185":0,"1186":0,"1191":0,"1193":0,"1219":0,"1224":0,"1225":0,"1227":0,"1228":0,"1229":0,"1232":0,"1233":0,"1236":0,"1239":0,"1240":0,"1244":0,"1245":0,"1247":0,"1248":0,"1249":0,"1252":0,"1253":0,"1266":0,"1269":0,"1270":0,"1271":0,"1273":0,"1274":0,"1277":0,"1282":0,"1284":0,"1285":0,"1298":0,"1302":0,"1303":0,"1305":0,"1309":0,"1310":0,"1311":0,"1312":0,"1313":0,"1316":0,"1317":0,"1318":0,"1319":0,"1320":0,"1323":0,"1324":0,"1325":0,"1326":0,"1327":0,"1328":0,"1343":0,"1346":0,"1347":0,"1350":0,"1351":0,"1355":0,"1356":0,"1357":0,"1362":0,"1377":0,"1389":0,"1404":0,"1425":0,"1428":0,"1429":0,"1430":0,"1431":0,"1432":0,"1433":0,"1434":0,"1438":0,"1441":0,"1442":0,"1446":0,"1463":0,"1473":0,"1476":0,"1477":0,"1478":0,"1479":0,"1481":0,"1482":0,"1484":0,"1485":0,"1487":0,"1488":0,"1490":0,"1491":0,"1493":0,"1494":0,"1496":0,"1497":0,"1499":0,"1500":0,"1502":0,"1503":0,"1505":0,"1506":0,"1508":0,"1509":0,"1511":0,"1512":0,"1528":0,"1534":0,"1535":0,"1536":0,"1537":0,"1538":0,"1539":0,"1540":0,"1542":0,"1543":0,"1544":0,"1545":0,"1560":0,"1561":0,"1562":0,"1563":0,"1593":0,"1602":0,"1603":0,"1604":0,"1605":0,"1608":0,"1610":0,"1611":0,"1612":0,"1613":0,"1614":0,"1615":0,"1618":0,"1621":0,"1623":0,"1634":0,"1640":0,"1641":0,"1642":0,"1645":0,"1647":0,"1649":0,"1650":0,"1652":0,"1653":0,"1654":0,"1655":0,"1658":0,"1659":0,"1667":0,"1671":0,"1675":0,"1676":0,"1685":0,"1689":0,"1690":0,"1691":0,"1697":0,"1702":0,"1703":0,"1704":0,"1708":0,"1709":0,"1714":0,"1720":0,"1727":0,"1733":0,"1741":0,"1742":0,"1743":0,"1756":0,"1758":0,"1759":0,"1772":0,"1774":0,"1775":0,"1776":0,"1780":0,"1794":0,"1796":0,"1797":0,"1798":0,"1802":0,"1816":0,"1818":0,"1819":0,"1820":0,"1824":0,"1838":0,"1840":0,"1841":0,"1842":0,"1846":0,"1860":0,"1862":0,"1863":0,"1864":0,"1865":0,"1869":0,"1883":0,"1885":0,"1886":0,"1887":0,"1888":0,"1892":0,"1906":0,"1908":0,"1909":0,"1910":0,"1911":0,"1915":0,"1929":0,"1931":0,"1932":0,"1933":0,"1934":0,"1938":0,"1952":0,"1954":0,"1955":0,"1956":0,"1957":0,"1961":0,"1975":0,"1977":0,"1978":0,"1979":0,"1980":0,"1984":0,"1998":0,"2000":0,"2001":0,"2002":0,"2003":0,"2007":0,"2021":0,"2023":0,"2024":0,"2025":0,"2026":0,"2030":0,"2045":0,"2048":0,"2049":0,"2051":0,"2053":0,"2058":0,"2059":0,"2061":0,"2062":0,"2063":0,"2076":0,"2078":0,"2091":0,"2094":0,"2095":0,"2096":0,"2101":0,"2102":0,"2106":0,"2107":0,"2108":0,"2122":0,"2125":0,"2134":0,"2137":0,"2141":0,"2145":0,"2146":0,"2150":0,"2151":0,"2152":0,"2166":0,"2169":0,"2178":0,"2181":0,"2185":0,"2190":0,"2191":0,"2192":0,"2206":0,"2208":0,"2209":0,"2212":0,"2214":0,"2215":0,"2216":0,"2220":0,"2221":0,"2229":0,"2230":0,"2231":0,"2233":0,"2234":0,"2237":0,"2238":0,"2239":0,"2240":0,"2244":0,"2245":0,"2253":0,"2254":0,"2255":0,"2269":0,"2271":0,"2272":0,"2275":0,"2279":0,"2280":0,"2281":0,"2295":0,"2297":0,"2298":0,"2301":0,"2303":0,"2304":0,"2309":0,"2310":0,"2311":0,"2325":0,"2329":0,"2338":0,"2341":0,"2345":0,"2350":0,"2351":0,"2352":0,"2354":0,"2363":0,"2366":0,"2370":0,"2375":0,"2376":0,"2377":0,"2391":0,"2394":0,"2403":0,"2406":0,"2410":0,"2415":0,"2416":0,"2417":0,"2419":0,"2428":0,"2431":0,"2435":0,"2440":0,"2441":0,"2442":0,"2455":0,"2469":0,"2470":0,"2472":0,"2473":0,"2474":0,"2475":0,"2477":0,"2479":0,"2480":0,"2481":0,"2482":0,"2483":0,"2484":0,"2485":0,"2486":0,"2487":0,"2488":0,"2491":0,"2494":0,"2495":0,"2498":0,"2502":0,"2504":0,"2506":0,"2521":0,"2538":0,"2539":0,"2540":0,"2542":0,"2543":0,"2544":0,"2545":0,"2549":0,"2550":0,"2553":0,"2554":0,"2555":0,"2556":0,"2560":0,"2561":0,"2564":0,"2565":0,"2566":0,"2567":0,"2571":0,"2572":0,"2575":0,"2576":0,"2577":0,"2578":0,"2582":0,"2583":0,"2586":0,"2587":0,"2588":0,"2589":0,"2593":0,"2594":0,"2597":0,"2598":0,"2599":0,"2600":0,"2604":0,"2605":0,"2608":0,"2609":0,"2610":0,"2611":0,"2615":0,"2616":0,"2619":0,"2620":0,"2621":0,"2622":0,"2626":0,"2627":0,"2630":0,"2644":0,"2668":0,"2671":0,"2672":0,"2673":0,"2674":0,"2676":0,"2679":0,"2680":0,"2681":0,"2684":0,"2686":0,"2691":0,"2695":0,"2698":0,"2699":0,"2701":0,"2724":0,"2741":0,"2742":0,"2743":0,"2744":0,"2745":0,"2746":0,"2747":0,"2748":0,"2749":0,"2752":0,"2753":0,"2754":0,"2755":0,"2758":0,"2763":0,"2764":0,"2765":0,"2766":0,"2767":0,"2768":0,"2769":0,"2770":0,"2771":0,"2772":0,"2774":0,"2775":0,"2779":0,"2780":0,"2782":0,"2783":0,"2785":0,"2786":0,"2787":0,"2788":0,"2789":0,"2791":0,"2792":0,"2796":0,"2801":0,"2805":0,"2806":0,"2807":0,"2808":0,"2809":0,"2812":0,"2814":0,"2815":0,"2816":0,"2818":0,"2819":0,"2820":0,"2821":0,"2822":0,"2823":0,"2824":0,"2827":0,"2828":0,"2830":0,"2831":0,"2832":0,"2835":0,"2838":0,"2839":0,"2840":0,"2844":0,"2845":0,"2848":0,"2849":0,"2850":0,"2852":0,"2853":0,"2854":0,"2856":0,"2857":0,"2858":0,"2860":0,"2863":0,"2865":0,"2866":0,"2867":0,"2869":0,"2872":0,"2873":0,"2874":0,"2875":0,"2876":0,"2882":0,"2883":0,"2884":0,"2886":0,"2887":0,"2890":0,"2893":0,"2895":0,"2897":0,"2902":0,"2903":0,"2904":0,"2905":0,"2906":0,"2910":0,"2911":0,"2919":0,"2924":0,"2931":0,"2932":0,"2933":0,"2934":0,"2935":0,"2937":0,"2938":0,"2939":0,"2941":0,"2942":0,"2943":0,"2944":0,"2946":0,"2949":0,"2950":0,"2951":0,"2952":0,"2954":0,"2955":0,"2956":0,"2958":0,"2959":0,"2960":0,"2961":0,"2963":0,"2966":0,"2967":0,"2968":0,"2969":0,"2971":0,"2972":0,"2973":0,"2975":0,"2976":0,"2977":0,"2978":0,"2981":0,"2982":0,"2983":0,"2985":0,"2986":0,"2987":0,"2988":0,"2989":0,"2990":0,"3005":0,"3015":0,"3016":0,"3017":0,"3018":0,"3019":0,"3020":0,"3023":0,"3025":0,"3027":0,"3028":0,"3030":0,"3031":0,"3032":0,"3033":0,"3036":0,"3039":0,"3040":0,"3041":0,"3043":0,"3044":0,"3047":0,"3049":0,"3052":0,"3053":0,"3054":0,"3067":0,"3070":0,"3071":0,"3072":0,"3099":0,"3106":0,"3107":0,"3109":0,"3110":0,"3111":0,"3112":0,"3114":0,"3116":0,"3117":0,"3118":0,"3119":0,"3126":0,"3148":0,"3154":0,"3155":0,"3157":0,"3160":0,"3161":0,"3162":0,"3163":0,"3165":0,"3167":0,"3168":0,"3171":0,"3175":0,"3190":0,"3206":0,"3207":0,"3208":0,"3226":0,"3229":0,"3236":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].functions = {"GETSTYLE:55":0,"ITSAModellistAttrExtention:65":0,"getModelAttr:80":0,"setModelAttr:101":0,"getModelToJSON:138":0,"ITSAModellistViewExtention:151":0,"validator:166":0,"validator:184":0,"validator:201":0,"validator:215":0,"validator:233":0,"validator:250":0,"validator:267":0,"validator:288":0,"validator:308":0,"validator:327":0,"validator:343":0,"validator:360":0,"validator:377":0,"validator:394":0,"validator:412":0,"validator:428":0,"validator:456":0,"validator:484":0,"validator:512":0,"validator:539":0,"validator:562":0,"validator:591":0,"validator:620":0,"validator:649":0,"validator:669":0,"validator:684":0,"initializer:1067":0,"setWithoutRerender:1093":0,"getNodeFromIndex:1116":0,"getNodeFromModel:1140":0,"(anonymous 2):1184":0,"modelIsSelected:1177":0,"(anonymous 3):1235":0,"selectModels:1213":0,"(anonymous 4):1276":0,"unselectModels:1265":0,"(anonymous 5):1304":0,"blurAll:1302":0,"clearSelectedModels:1297":0,"(anonymous 6):1353":0,"getSelectedModels:1342":0,"renderView:1376":0,"getModelListInUse:1388":0,"getModelAttr:1403":0,"setModelAttr:1424":0,"getModelToJSON:1462":0,"destructor:1472":0,"_render:1527":0,"_focusModelNode:1559":0,"_getMaxPaginatorGotoIndex:1587":0,"(anonymous 7):1646":0,"(anonymous 8):1670":0,"(anonymous 9):1673":0,"(anonymous 10):1688":0,"(anonymous 11):1700":0,"(anonymous 12):1707":0,"(anonymous 13):1717":0,"_extraBindUI:1633":0,"_setModelList:1755":0,"_setNoDups:1771":0,"_setLimitModels:1793":0,"_setViewFilter:1815":0,"_setDupComp:1837":0,"_setGrpH1:1859":0,"_setGrpH2:1882":0,"_setGrpH3:1905":0,"_setRenderGrH1:1928":0,"_setRenderGrH2:1951":0,"_setRenderGrH3:1974":0,"_setRenderModel:1997":0,"_setRenderClass:2020":0,"_setModelsSel:2044":0,"_setModelListStyled:2075":0,"(anonymous 14):2099":0,"_setSelectableEvents:2090":0,"(anonymous 15):2136":0,"(anonymous 16):2143":0,"_setClkEv:2121":0,"(anonymous 17):2180":0,"_setDblclkEv:2165":0,"(anonymous 19):2219":0,"(anonymous 18):2211":0,"(anonymous 21):2243":0,"(anonymous 20):2236":0,"_setMarkModelChange:2205":0,"(anonymous 22):2274":0,"_setIntoViewAdded:2268":0,"(anonymous 23):2300":0,"_setIntoViewChanged:2294":0,"(anonymous 24):2340":0,"(anonymous 25):2365":0,"_setMouseDnUpEv:2324":0,"(anonymous 26):2405":0,"(anonymous 27):2430":0,"_setHoverEv:2390":0,"_handleModelSelectionChange:2454":0,"isMicroTemplate:2538":0,"modelEngine:2544":0,"modelEngine:2549":0,"classNameEngine:2555":0,"classNameEngine:2560":0,"groupH1Engine:2566":0,"groupH1Engine:2571":0,"groupH2Engine:2577":0,"groupH2Engine:2582":0,"groupH3Engine:2588":0,"groupH3Engine:2593":0,"renderGH1Engine:2599":0,"renderGH1Engine:2604":0,"renderGH2Engine:2610":0,"renderGH2Engine:2615":0,"renderGH3Engine:2621":0,"renderGH3Engine:2626":0,"_getAllTemplateFuncs:2520":0,"(anonymous 28):2678":0,"dupAvailable:2673":0,"_tryRenderModel:2667":0,"_clearAbberantModelList:2694":0,"(anonymous 29):2855":0,"findNodeByClientId:2852":0,"(anonymous 30):2868":0,"_renderView:2723":0,"_createModelNode:2923":0,"_addEmptyItem:3004":0,"_removeEmptyItem:3066":0,"findNode:3109":0,"_getNodeFromModelOrIndex:3093":0,"_selectModel:3142":0,"_fireSelectedModels:3189":0,"(anonymous 31):3228":0,"_clearEventhandlers:3225":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredLines = 719;
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredFunctions = 138;
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
    VIEW_TEMPLATE_UL = '<ul role="presentation"></ul>',
    VIEW_MODEL_TEMPLATE_UL = '<li role="presentation"></li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE_UL = '<li>{content}</li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE = '<tr><td colspan="{cols}">{content}</td></tr>',
    TEMPLATE_TABLE = '<table role="presentation"></table>',
    VIEW_TEMPLATE_TBODY = '<tbody></tbody>',
    VIEW_MODEL_TEMPLATE_TABLE = '<tr role="presentation"></tr>',
    LOADING_TEMPLATE = '<div>{loading}</div>',
    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',
    MODEL_CLASS = 'itsa-scrollviewmodel',
    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',
    MODELLIST_CLASS = 'itsa-modellistview',
    SVML_LASTMODEL_CLASS = MODELLIST_CLASS + '-lastitem',
    SVML_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-noinitialitems',
    SVML_VIEW_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-view-noinitialitems',
    SVML_NOITEMS_CLASS = MODELLIST_CLASS + '-noitems',
    SVML_VIEW_NOITEMS_CLASS = MODELLIST_CLASS + '-view-noitems',
    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    SVML_STYLE_CLASS = MODELLIST_CLASS + '-styled',
    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',
    GROUPHEADER1_CLASS = MODELLIST_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = MODELLIST_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = MODELLIST_CLASS + '-groupheader3',
    GROUPHEADER_SEQUEL_CLASS = MODELLIST_CLASS + '-sequelgroupheader',
    SVML_UNSELECTABLE = MODELLIST_CLASS + '-unselectable',
    SVML_SHOWLOADING_CLASS = MODELLIST_CLASS + '-showloading',
    LOADING_MESSAGE = 'Loading...',
    NO_DATA_MESSAGE = 'No data to display',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "GETSTYLE", 55);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 56);
return parseInt(node.getStyle(style), 10);
    };

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 65);
function ITSAModellistAttrExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 67);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 80);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 81);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 101);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 102);
var instance = this,
            modelIsLazy, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 105);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 106);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 107);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 108);
revivedModel = instance.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 109);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 110);
if (revivedModel) {
                    //======================================================================================
                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530
                    //
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 114);
revivedModel._set('clientId', model.clientId, {silent: true});
                    //
                    //======================================================================================
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 117);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 118);
instance.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 122);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 138);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 139);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 144);
Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 146);
Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);
//Y.Base.mix(Y.LazyModelList, [ITSAModellistAttrExtention]);

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 151);
function ITSAModellistViewExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 153);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 166);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 166);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 184);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 184);
return Lang.isBoolean(v);},
        setter: '_setNoDups'
    },

   /**
    * Defines the listType. Use 'ul' for unsorted list, or 'table' for table-format.
    * This attrbute can only be set once during innitialisation.
    * <b>Caution:</b> if you set this attribute to 'table', then all items are tr-elements and you need to render the
    * td-elements yourself within 'renderModel' and groupHeaders (with the right number of td's).
    *
    * @attribute listType
    * @type {String}
    * @default 'ul'
    * @since 0.1
    */
    listType: {
        value: 'ul',
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 201);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 201);
return (v==='ul') || (v==='table');},
        writeOnce: 'initOnly'
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 215);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 215);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 233);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 233);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 250);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 251);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 267);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 268);
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
    * @default true
    * @attribute modelListStyled
    * @type {Boolean}
    * @since 0.1
    */
    modelListStyled: {
        value: true,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 288);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 289);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 308);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 309);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 327);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 327);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 343);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 343);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 360);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 360);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 377);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 377);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 394);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 394);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 412);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 412);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 428);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 428);
return Lang.isBoolean(v);},
        setter: '_setHoverEv'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 456);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 456);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH1'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')
     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 484);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 484);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH2'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')
     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute groupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 512);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 512);
return Lang.isString(v) || v === null; },
        setter: '_setGrpH3'
    },

    /**
     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
     * where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class="eat">Eat a Slice!</button>'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class="eat">Eat a Slice!</button>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class="eat">Eat a Slice!</button><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's).
     * Example: '<td><%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class="eat">Eat a Slice!</button></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderModel
     * @type {String}
     * @default '{clientId}'
     * @since 0.1
     */
    renderModel: {
        value: '{clientId}', // default-template, so that there always is content. Best to be overwritten.
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 539);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 539);
return Lang.isString(v); },
        setter: '_setRenderModel'
    },

    /**
     * Template to render an additional className to the rendered element. In fact: every Model will be rendered inside a <li>-element.
     * The innercontent of the LI-element is determined by 'renderModel' while renderClassName can add additional classes to the li-element.
     * The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
     * where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{gender}'
     * <b>Example with Y.Template.Micro:</b>
     * '<% if (data.age>18) {%>adult<% } %>'
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderClassName
     * @type {String}
     * @default '{clientId}'
     * @since 0.1
     */
    renderClassName: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 562);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 562);
return Lang.isString(v); },
        setter: '_setRenderClass'
    },

    /**
     * Template for rendering of groupHeader1. If not set, renderGroupHeader1 will render the same as the attribute 'groupHeader1'.
     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 591);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 591);
return Lang.isString(v) || v === null; },
        setter: '_setRenderGrH1'
    },

    /**
     * Template for rendering of groupHeader2. If not set, renderGroupHeader2 will render the same as the attribute 'groupHeader2'.
     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 620);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 620);
return Lang.isString(v) || v === null; },
        setter: '_setRenderGrH2'
    },

    /**
     * Template for rendering of groupHeader3. If not set, renderGroupHeader3 will render the same as the attribute 'groupHeader3'.
     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered
     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').
     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either
     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{stardate}'
     * <b>Example with Y.Template.Micro:</b>
     * '<%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %>'
     * <b>Example 2 with Y.Template.Micro:</b>
     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %><br /><% } else { %>no startdate<br /><% } %>'
     *
     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the
     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:"%d-%m-%Y"}) %></td>'.
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute renderGroupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 649);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 649);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 669);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 669);
return Lang.isFunction(v) || v === null; },
        setter: '_setDupComp'
    },

    /**
     * Attribute that makes the message 'Loading...' visible until the view is rendered for the first time.
     * Only showed if you didn't not use 'itsa-modellistview-noinitialitems' to hide the widget...
     *
     * @attribute showLoadMessage
     * @type {Boolean}
     * @default false
     * @since 0.1
     */
    showLoadMessage: {
        value: false,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 684);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 684);
return Lang.isBoolean(v); }
    }

};

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 689);
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
     * Internal flag to tell whether the attribute 'renderClassName' is initiated.
     * @property _renderClassInit
     * @private
     * @default false
     * @type Boolean
    */
    _renderClassInit : false,

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
     * @default false
     * @type Boolean
    */
    _itmsAvail : false, // must initially be set true

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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "initializer", 1067);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1068);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1070);
instance._viewId = Y.guid();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1071);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setWithoutRerender", 1093);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1094);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1096);
instance._rerendAttrChg = false;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1097);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1098);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromIndex", 1116);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1122);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromModel", 1140);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1146);
return this._getNodeFromModelOrIndex(model, null, maxExpansions);
    },

    /**
     * Definition that needs to be redefined in a subclass
     *
     * @method saveScrollTo
     * @since 0.1
     *
    */
    saveScrollTo : function() {
    },

    /**
     * Definition that needs to be redefined in a subclass
     *
     * @method scrollIntoView
     * @since 0.1
    */
    scrollIntoView : function() {
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelIsSelected", 1177);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1178);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1181);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1182);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 2)", 1184);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1185);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1186);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1191);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1193);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "selectModels", 1213);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1219);
var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1224);
if (singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1225);
instance.clearSelectedModels(true, true);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1227);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1228);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1229);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1232);
if (isArray && !singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1233);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 3)", 1235);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1236);
instance._selectModel(model, true, maxExpansions);
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1239);
if (scrollIntoView && (models.length>0)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1240);
instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1244);
if (isArray) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1245);
models = models[0];
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1247);
instance._selectModel(models, true, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1248);
if (scrollIntoView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1249);
instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1252);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1253);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "unselectModels", 1265);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1266);
var instance = this,
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1269);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1270);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1271);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1273);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1274);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 4)", 1276);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1277);
instance._selectModel(model, false);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1282);
instance._selectModel(models, false);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1284);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1285);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "clearSelectedModels", 1297);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1298);
var instance = this,
            contentBox = instance.get('contentBox'),
            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1302);
blurAll = function() {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "blurAll", 1302);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1303);
currentSelected.each(
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 5)", 1304);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1305);
node.blur();
                }
            );
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1309);
currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1310);
firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1311);
if (silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1312);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1313);
currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1316);
fireEvent = (currentSelected.size()>0);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1317);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1318);
currentSelected.removeClass(SVML_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1319);
if (fireEvent) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1320);
instance._fireSelectedModels();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1323);
instance._selectedModels = {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1324);
if (instance.get('modelsUnselectable') && firstSelected && !force) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1325);
clientId = firstSelected.getData('modelClientId');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1326);
modelList = instance.getModelListInUse();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1327);
model = modelList.getByClientId(clientId);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1328);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getSelectedModels", 1342);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1343);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1346);
if (!original) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1347);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1350);
selected = [];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1351);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _origModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 6)", 1353);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1355);
var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1356);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1357);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1362);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderView", 1376);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1377);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelListInUse", 1388);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1389);
return this._abModelList || this.get('modelList');
    },

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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 1403);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1404);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 1424);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1425);
var instance = this,
            modelIsLazy, modelList, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1428);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1429);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1430);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1431);
modelList = instance.get('modelList');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1432);
revivedModel = modelList.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1433);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1434);
if (revivedModel) {
                    //======================================================================================
                    // due to a bug, we need to sync cliendId first https://github.com/yui/yui3/issues/530
                    //
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1438);
revivedModel._set('clientId', model.clientId, {silent: true});
                    //
                    //======================================================================================
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1441);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1442);
modelList.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1446);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 1462);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1463);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "destructor", 1472);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1473);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1476);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1477);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1478);
if (instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1479);
instance._selModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1481);
if (instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1482);
instance._clkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1484);
if (instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1485);
instance._dblclkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1487);
if (instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1488);
instance._mouseDnModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1490);
if (instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1491);
instance._mouseUpModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1493);
if (instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1494);
instance._mouseentModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1496);
if (instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1497);
instance._mouseleaveModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1499);
if (instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1500);
instance._markModelChangeEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1502);
if (instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1503);
instance._markModelAddEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1505);
if (instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1506);
instance._modelInViewChanged.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1508);
if (instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1509);
instance._modelInViewAdded.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1511);
instance._clearAbberantModelList();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1512);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_render", 1527);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1528);
var instance = this,
            modellist = instance.get('modelList'),
            listType = instance.get('listType'),
            boundingBox = instance.get('boundingBox'),
            viewNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1534);
instance.get('contentBox').setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1535);
instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1536);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1537);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1538);
boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1539);
if (instance.get('showLoadMessage')) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1540);
boundingBox.addClass(SVML_SHOWLOADING_CLASS);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1542);
instance._templFns = instance._getAllTemplateFuncs();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1543);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1544);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1545);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_focusModelNode", 1559);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1560);
if (modelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1561);
this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1562);
modelNode.addClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1563);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getMaxPaginatorGotoIndex", 1587);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1593);
var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance.getModelListInUse(),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1602);
if (paginator && (modelList.size()>0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1603);
lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1604);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1605);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1608);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1610);
liElements = instance._viewNode.all('>li');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1611);
i = liElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1612);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1613);
lastNode = liElements.item(i);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1614);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1615);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1618);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1621);
if (size>=boundingSize) {i++;}
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1623);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_extraBindUI", 1633);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1634);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._handlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1640);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1641);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1642);
boundingBox.addClass(MODELLIST_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1645);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 7)", 1646);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1647);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1649);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1650);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1652);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1653);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1654);
boundingBox.addClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1655);
instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1658);
boundingBox.removeClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1659);
instance.get('contentBox').setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1667);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 8)", 1670);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1671);
instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 9)", 1673);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1675);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1676);
return (!scrollingInAction);
                }
            )
        );
        //========================================================
        //
        // LACK IN ModelList --> make resort after *:change
        //
        //=======================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1685);
eventhandlers.push(
            instance.after(
                '*:change',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 10)", 1688);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1689);
var modellist = instance.get('modelList');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1690);
if (modellist && instance.get('modelList').comparator) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1691);
modellist.sort();
                    }
                }
            )
        );
        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1697);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 11)", 1700);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1702);
if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1703);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1704);
e.stopImmediatePropagation();
                    }
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 12)", 1707);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1708);
var tagName = this.get('tagName');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1709);
return ((tagName==='A') || (tagName==='BUTTON'));
                }
            )
        );
        // also prevent default on mousedown, to prevent the native "drag link to desktop" behavior on certain browsers.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1714);
eventhandlers.push(
            boundingBox.delegate(
                'mousedown',
                function(e) {
                    // Prevent default anchor drag behavior, on browsers
                    // which let you drag anchors to the desktop
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 13)", 1717);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1720);
e.preventDefault();
                },
                'a'
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1727);
eventhandlers.push(
            instance.after(
                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add', '*:change'],
                Y.bind(instance._renderView, instance, null, null)
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1733);
eventhandlers.push(
            instance.after(
                ['modelList:reset', 'lazyModelList:reset'],
                Y.bind(instance._renderView, instance, null, {keepstyles: false})
            )
        );
        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,
        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1741);
instance.get('highlightAfterModelChange');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1742);
instance.get('modelsIntoViewAfterAdd');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1743);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelList", 1755);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1756);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1758);
instance._listLazy = (val instanceof Y.LazyModelList);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1759);
instance._itmsAvail = val && (val.size()>0);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setNoDups", 1771);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1772);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1774);
if (instance._noDupsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1775);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1776);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1780);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setLimitModels", 1793);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1794);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1796);
if (instance._limModelsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1797);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1798);
instance._renderView({limitModels: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1802);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setViewFilter", 1815);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1816);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1818);
if (instance._viewFilterInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1819);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1820);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1824);
instance._viewFilterInit = true;
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDupComp", 1837);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1838);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1840);
if (instance._dupCompInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1841);
if (instance._rerendAttrChg && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1842);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1846);
instance._dupCompInit = true;
        }
    },

    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH1
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH1", 1859);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1860);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1862);
if (instance._grpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1863);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1864);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1865);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1869);
instance._grpH1Init = true;
        }
    },

    /**
     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH2
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH2", 1882);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1883);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1885);
if (instance._grpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1886);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1887);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1888);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1892);
instance._grpH2Init = true;
        }
    },

    /**
     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGrpH3
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGrpH3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH3", 1905);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1906);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1908);
if (instance._grpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1909);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1910);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1911);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1915);
instance._grpH3Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH1
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH1", 1928);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1929);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1931);
if (instance._renderGrpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1932);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1933);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1934);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1938);
instance._renderGrpH1Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH2
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH2", 1951);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1952);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1954);
if (instance._renderGrpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1955);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1956);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1957);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1961);
instance._renderGrpH2Init = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGrH3
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGrH3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderGrH3", 1974);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1975);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1977);
if (instance._renderGrpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1978);
instance._templFns = instance._getAllTemplateFuncs({renderGroupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1979);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1980);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1984);
instance._renderGrpH3Init = true;
        }
    },

    /**
     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderModel
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderModel : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderModel", 1997);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1998);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2000);
if (instance._renderModelInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2001);
instance._templFns = instance._getAllTemplateFuncs({renderModel: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2002);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2003);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2007);
instance._renderModelInit = true;
        }
    },

    /**
     * Setter for attribute renderClassName. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderClass
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderClass : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setRenderClass", 2020);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2021);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2023);
if (instance._renderClassInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2024);
instance._templFns = instance._getAllTemplateFuncs({renderClassName: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2025);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2026);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2030);
instance._renderClassInit = true;
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelsSel", 2044);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2045);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2048);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2049);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2051);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2053);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.
        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2058);
if (Y.UA.ie>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2059);
contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2061);
contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2062);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2063);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelListStyled", 2075);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2076);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2078);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setSelectableEvents", 2090);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2091);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2094);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2095);
if (val && !instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2096);
instance._selModelEv = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 14)", 2099);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2101);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2102);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2106);
if (!val && instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2107);
instance._selModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2108);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClkEv", 2121);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2122);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2125);
if (val && !instance._clkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2134);
instance._clkModelEv = contentBox.delegate(
                'click',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 15)", 2136);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2137);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2141);
instance.fire('modelClick', {node: node, model: model});
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 16)", 2143);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2145);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2146);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2150);
if (!val && instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2151);
instance._clkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2152);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDblclkEv", 2165);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2166);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2169);
if (val && !instance._dblclkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelDblclick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2178);
instance._dblclkModelEv = contentBox.delegate(
                'dblclick',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 17)", 2180);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2181);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2185);
instance.fire('modelDblclick', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2190);
if (!val && instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2191);
instance._dblclkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2192);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMarkModelChange", 2205);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2206);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2208);
if (val && (val>0) && !instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2209);
instance._markModelChangeEv = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 18)", 2211);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2212);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2214);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2215);
node.addClass(MODEL_CHANGED_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2216);
Y.later(
                            val,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 19)", 2219);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2220);
if (node) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2221);
node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2229);
if (!val && instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2230);
instance._markModelChangeEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2231);
instance._markModelChangeEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2233);
if (val && (val>0) && !instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2234);
instance._markModelAddEv = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 20)", 2236);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2237);
var node = instance.getNodeFromIndex(e.index);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2238);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2239);
node.addClass(MODEL_CHANGED_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2240);
Y.later(
                            val,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 21)", 2243);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2244);
if (node) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2245);
node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2253);
if (!val && instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2254);
instance._markModelAddEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2255);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewAdded", 2268);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2269);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2271);
if ((val >0) && !instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2272);
instance._modelInViewAdded = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 22)", 2274);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2275);
instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2279);
if ((val===0) && instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2280);
instance._modelInViewAdded.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2281);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewChanged", 2294);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2295);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2297);
if ((val>0) && !instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2298);
instance._modelInViewChanged = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 23)", 2300);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2301);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2303);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2304);
instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2309);
if ((val===0) && instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2310);
instance._modelInViewChanged.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2311);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMouseDnUpEv", 2324);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2325);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2329);
if (val && !instance._mouseDnModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2338);
instance._mouseDnModelEv = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 24)", 2340);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2341);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2345);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2350);
if (!val && instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2351);
instance._mouseDnModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2352);
instance._mouseDnModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2354);
if (val && !instance._mouseUpModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2363);
instance._mouseUpModelEv = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 25)", 2365);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2366);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2370);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2375);
if (!val && instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2376);
instance._mouseUpModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2377);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setHoverEv", 2390);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2391);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2394);
if (val && !instance._mouseentModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2403);
instance._mouseentModelEv = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 26)", 2405);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2406);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2410);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2415);
if (!val && instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2416);
instance._mouseentModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2417);
instance._mouseentModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2419);
if (val && !instance._mouseleaveModelEv) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2428);
instance._mouseleaveModelEv = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 27)", 2430);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2431);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2435);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2440);
if (!val && instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2441);
instance._mouseleaveModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2442);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_handleModelSelectionChange", 2454);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2455);
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

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2469);
modelPrevSelected = model && instance.modelIsSelected(model);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2470);
if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2472);
if (singleSelectable || !ctrlClick) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2473);
if (instance.get('modelsUnselectable')) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2474);
currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2475);
firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2477);
instance.clearSelectedModels(true, true);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2479);
if (shiftClick && instance._lastClkModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2480);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2481);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2482);
prevModelIndex = modelList.indexOf(instance._lastClkModel);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2483);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2484);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2485);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2486);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2487);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2488);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2491);
instance.selectModels(multipleModels, false, null, true);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2494);
if (modelPrevSelected && !firstItemSelected) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2495);
instance.unselectModels(model, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2498);
instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2502);
instance._lastClkModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2504);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2506);
instance._fireSelectedModels();
    },

    /**
     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.
     *
     * @method _getAllTemplateFuncs
     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.
     * @private
     * @return {Object} All templates --> an object with the fields: <b>renderModel, renderClassName, groupH1, groupH2, groupH3,
     * renderGH1, renderGH2, renderGH3, activeClass, activeGH1, activeGH2, activeGH3</b>. The last 4 keys are Booleans, the other are templates.
     * @since 0.1
     *
    */
    _getAllTemplateFuncs : function(setterAttrs) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getAllTemplateFuncs", 2520);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2521);
var instance = this,
            renderModel = (setterAttrs && setterAttrs.renderModel) || instance.get('renderModel'),
            renderClassName = (setterAttrs && setterAttrs.renderModel) || instance.get('renderClassName'),
            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),
            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),
            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),
            renderGH1 = (setterAttrs && setterAttrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupH1,
            renderGH2 = (setterAttrs && setterAttrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupH2,
            renderGH3 = (setterAttrs && setterAttrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupH3,
            activeClass = renderClassName && (renderClassName.length>0),
            activeGH1 = groupH1 && (groupH1.length>0),
            activeGH2 = groupH2 && (groupH2.length>0),
            activeGH3 = groupH3 && (groupH3.length>0),
            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,
            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,
            compiledRenderGH3Engine, templateObject, isMicroTemplate, classNameEngine;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2538);
isMicroTemplate = function(template) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isMicroTemplate", 2538);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2539);
var microTemplateRegExp = /<%(.+)%>/;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2540);
return microTemplateRegExp.test(template);
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2542);
if (isMicroTemplate(renderModel)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2543);
compiledModelEngine = YTemplateMicro.compile(renderModel);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2544);
modelEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2544);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2545);
return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2549);
modelEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2549);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2550);
return Lang.sub(renderModel, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2553);
if (isMicroTemplate(renderClassName)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2554);
compiledModelEngine = YTemplateMicro.compile(renderClassName);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2555);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2555);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2556);
return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2560);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2560);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2561);
return Lang.sub(renderClassName, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2564);
if (activeGH1 && isMicroTemplate(groupH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2565);
compiledGroupH1Engine = YTemplateMicro.compile(groupH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2566);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2566);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2567);
return compiledGroupH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2571);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2571);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2572);
return Lang.sub(groupH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2575);
if (activeGH2 && isMicroTemplate(groupH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2576);
compiledGroupH2Engine = YTemplateMicro.compile(groupH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2577);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2577);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2578);
return compiledGroupH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2582);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2582);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2583);
return Lang.sub(groupH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2586);
if (activeGH3 && isMicroTemplate(groupH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2587);
compiledGroupH3Engine = YTemplateMicro.compile(groupH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2588);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2588);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2589);
return compiledGroupH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2593);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2593);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2594);
return Lang.sub(groupH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2597);
if (activeGH1 && isMicroTemplate(renderGH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2598);
compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2599);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2599);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2600);
return compiledRenderGH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2604);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2604);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2605);
return Lang.sub(renderGH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2608);
if (activeGH2 && isMicroTemplate(renderGH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2609);
compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2610);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2610);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2611);
return compiledRenderGH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2615);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2615);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2616);
return Lang.sub(renderGH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2619);
if (activeGH3 && isMicroTemplate(renderGH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2620);
compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2621);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2621);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2622);
return compiledRenderGH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2626);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2626);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2627);
return Lang.sub(renderGH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2630);
templateObject = {
            renderModel : modelEngine,
            renderClassName : classNameEngine,
            groupH1 : groupH1Engine,
            groupH2 : groupH2Engine,
            groupH3 : groupH3Engine,
            renderGH1 : renderGH1Engine,
            renderGH2 : renderGH2Engine,
            renderGH3 : renderGH3Engine,
            activeClass : activeClass,
            activeGH1 : activeGH1,
            activeGH2 : activeGH2,
            activeGH3 : activeGH3
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2644);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_tryRenderModel", 2667);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2668);
var instance = this,
            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2671);
dubComparatorBinded = Y.rbind(dupComparator, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2672);
viewFilterBinded = Y.rbind(viewFilter, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2673);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "dupAvailable", 2673);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2674);
var dupFound = false,
                modelComp = dubComparatorBinded(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2676);
YArray.some(
                modelListItemsArray,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 28)", 2678);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2679);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2680);
dupFound = (dubComparatorBinded(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2681);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2684);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2686);
allowed = (!viewFilter || viewFilterBinded(trymodel)) &&
                      (!noDups ||
                       (!dupComparator && ((renderedmodel = allTemplateFuncs.renderModel(trymodel))!==prevrenderedmodel)) ||
                       (dupComparator && !dupAvailable(trymodel))
                      );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2691);
return allowed && (renderedmodel || allTemplateFuncs.renderModel(trymodel));
    },

    _clearAbberantModelList : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearAbberantModelList", 2694);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2695);
var instance = this;

        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2698);
if (instance._abModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2699);
instance._abModelList.destroy();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2701);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_renderView", 2723);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2724);
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
            i, j, model, modelListItems, batchSize, items, modelListItemsLength, table, noDataTemplate;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2741);
options = options || {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2742);
options.page = options.page || instance._currentViewPg;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2743);
pageSwitch = (instance._currentViewPg!==options.page);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2744);
options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2745);
options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2746);
options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2747);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2748);
if (instance.get('listType')==='ul') {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2749);
contentBox.setHTML(viewNode);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2752);
contentBox.setHTML(TEMPLATE_TABLE);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2753);
table = contentBox.one('table');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2754);
if (table) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2755);
table.append(viewNode);
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2758);
instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2763);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2764);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2765);
if (options.rebuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2766);
i = (options.page*limitModels) -1; // will be incread to zero at start loop
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2767);
instance._prevH1 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2768);
instance._prevH2 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2769);
instance._prevH3 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2770);
instance._even = false;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2771);
if (infiniteView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2772);
instance._itmsAvail = true;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2774);
instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2775);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);
        }
        else {
            // start with the last index
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2779);
viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2780);
i = (instance._prevLastModelIndex || -1); // i will be increased at start loop
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2782);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2783);
newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2785);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2786);
modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2787);
if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2788);
instance._generateAbberantModelList(infiniteView, options.rebuild);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2789);
modelList = instance._abModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2791);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2792);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2796);
instance._clearAbberantModelList();
            }
        }
        else {
            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2801);
instance._clearAbberantModelList();
        }

        // in case of ITSAViewPaginator is active --> limitModels is always>0
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2805);
renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2806);
listIsLimited = (renderListLength<modelListItemsLength);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2807);
items = 0;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2808);
batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2809);
if (i>0) {
            // when available: remove the fillNode that makes lastItemOnTop
            // It will be rendered on the bottom again
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2812);
instance._removeEmptyItem();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2814);
while ((items<batchSize) && (++i<renderListLength)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2815);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2816);
renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,
                                                     dupComparator, allTemplateFuncs);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2818);
if (renderedModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2819);
if (items===0) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2820);
instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2821);
viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2822);
if (options.initbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2823);
instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2824);
viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2827);
items++;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2828);
modelNode = instance._createModelNode(model, renderedModel);
                // modelNode is an ARRAY of Y.Node !!!
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2830);
for (j=0; j<modelNode.length; j++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2831);
if (options.incrementbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2832);
viewNode.append(modelNode[j]);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2835);
newViewNode.append(modelNode[j]);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2838);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2839);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2840);
prevRenderedModel = renderedModel;
                }
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2844);
if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2845);
modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2848);
instance._prevLastModelIndex = i;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2849);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2850);
if (options.keepstyles) {
                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2852);
findNodeByClientId = function(modelClientId, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNodeByClientId", 2852);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2853);
var nodeFound;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2854);
nodelist.some(
                        function(node) {
                            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 29)", 2855);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2856);
var found = (node.getData('modelClientId') === modelClientId);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2857);
if (found) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2858);
nodeFound = node;
                            }
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2860);
return found;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2863);
return nodeFound;
                };
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2865);
previousViewModels = viewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2866);
newViewModels = newViewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2867);
previousViewModels.each(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 30)", 2868);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2869);
var hasSelected = node.hasClass(SVML_SELECTED_CLASS),
                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),
                            newnode;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2872);
if (hasSelected || hasFocus) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2873);
newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2874);
if (newnode) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2875);
newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2876);
newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);
                            }
                        }
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2882);
viewNode.replace(newViewNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2883);
instance._viewNode = newViewNode;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2884);
newViewNode.set('id', instance._viewId);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2886);
if (viewNode.getHTML()==='') {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2887);
noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2890);
if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2893);
instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2895);
instance._currentViewPg = options.page;
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2897);
instance.syncUI();
//========================================================
        // now a correction of PaginatorPlugin-bug:
        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin
        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2902);
if (paginator) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2903);
currentPaginatorIndex = paginator.get('index');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2904);
maxPaginatorIndex = viewNode.get('children').size() - 1;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2905);
if (currentPaginatorIndex > maxPaginatorIndex) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2906);
paginator.set('index', maxPaginatorIndex);
            }
        }
//========================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2910);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2911);
infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2919);
instance.fire('modelListRender');
    },

// return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.
    _createModelNode : function(model, renderedModel) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_createModelNode", 2923);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2924);
var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            nodes = [],
            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,
            modelNode = YNode.create(rowtemplate),
            header1, header2, header3, headerNode, allTemplateFuncs;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2931);
allTemplateFuncs = instance._templFns;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2932);
if (allTemplateFuncs.activeGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2933);
header1 = allTemplateFuncs.groupH1(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2934);
if (header1!==instance._prevH1) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2935);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2937);
headerNode.addClass(GROUPHEADER1_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2938);
if (instance._prevH1) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2939);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2941);
headerNode.setHTML(allTemplateFuncs.renderGH1(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2942);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2943);
instance._prevH1 = header1;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2944);
instance._even = false;
                // force to make a header2 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2946);
instance._prevH2 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2949);
if (allTemplateFuncs.activeGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2950);
header2 = allTemplateFuncs.groupH2(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2951);
if (header2!==instance._prevH2) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2952);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2954);
headerNode.addClass(GROUPHEADER2_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2955);
if (instance._prevH2) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2956);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2958);
headerNode.setHTML(allTemplateFuncs.renderGH2(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2959);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2960);
instance._prevH2 = header2;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2961);
instance._even = false;
                // force to make a header3 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2963);
instance._prevH3 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2966);
if (allTemplateFuncs.activeGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2967);
header3 = allTemplateFuncs.groupH3(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2968);
if (header3!==instance._prevH3) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2969);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2971);
headerNode.addClass(GROUPHEADER3_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2972);
if (instance._prevH3) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2973);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2975);
headerNode.setHTML(allTemplateFuncs.renderGH3(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2976);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2977);
instance._prevH3 = header3;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2978);
instance._even = false;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2981);
modelNode.setData('modelClientId', modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2982);
if (allTemplateFuncs.activeClass) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2983);
modelNode.addClass(allTemplateFuncs.renderClassName(model));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2985);
modelNode.addClass(MODEL_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2986);
modelNode.addClass(modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2987);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2988);
modelNode.setHTML(renderedModel || allTemplateFuncs.renderModel(model));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2989);
nodes.push(modelNode);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2990);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_addEmptyItem", 3004);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3005);
var instance = this,
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBox = instance.get('boundingBox'),
            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),
            viewNode = instance._viewNode,
            listTypeUL = (instance.get('listType')==='ul'),
            template = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3015);
instance._removeEmptyItem();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3016);
if (!lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3017);
modelElements = viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3018);
modelElementsSize = modelElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3019);
if (modelElementsSize>0) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3020);
lastModelNode = modelElements.item(modelElementsSize-1);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3023);
if (!listTypeUL) {
            // table template --> we must set colspan
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3025);
nrCells = lastModelNode.all('>td').size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3027);
template = Lang.sub(template, {cols: nrCells, content: ''});
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3028);
modelNode = YNode.create(template),
        modelNode.addClass(EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3030);
viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3031);
if (lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3032);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3033);
elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3036);
elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3039);
lastModelNode = lastModelNode && lastModelNode.previous();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3040);
if (itemOnTopValue===2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3041);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3043);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3044);
elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3047);
elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3049);
lastModelNode = lastModelNode.previous();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3052);
modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3053);
if (elementsize>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3054);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_removeEmptyItem", 3066);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3067);
var instance = this,
            removeNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3070);
removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3071);
if (removeNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3072);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getNodeFromModelOrIndex", 3093);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3099);
var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3106);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3107);
modelClientId = instance.getModelAttr(model, 'clientId');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3109);
findNode = function(node, loopindex) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNode", 3109);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3110);
var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3111);
if (found) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3112);
nodeFound = node;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3114);
return found;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3116);
do {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3117);
nodeList = instance._viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3118);
nodeList.some(findNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3119);
i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        }while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3126);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_selectModel", 3142);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3148);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3154);
if (modelid && !itemUnselectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3155);
if (instance.hasPlugin('itsainfiniteview')) {
                // make sure the node is rendered
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3157);
instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3160);
modelnode = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3161);
if (modelnode) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3162);
if (!selectstatus) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3163);
modelnode.blur();
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3165);
modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3167);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3168);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3171);
delete instance._selectedModels[modelid];
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3175);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_fireSelectedModels", 3189);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3190);
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
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3206);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3207);
originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3208);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearEventhandlers", 3225);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3226);
YArray.each(
            this._handlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 31)", 3228);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3229);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3236);
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
