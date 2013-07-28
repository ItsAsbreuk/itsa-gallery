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
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].code=["YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {","","'use strict';","","//","// TODO:","//","// 1. Expansion with promises","// 2. _repositionModel() needs smarter code. Remove first, locally update the view,","//    compare new position with lastemitem+1 and the highest of those 2 need to be inserted.","//    except when paginator is running: then we need to compare the newposition with firstitem-1","//    as well. Perhaps firstitem-1 needs to be inserted.","//","","/**"," * Basic Extention that should not be used of its own."," * ITSAViewModelList and ITSAScrollViewModelList are based upon this extention."," *"," *"," * @module gallery-itsamodellistviewextention"," * @class ITSAModellistViewExtention"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    YTemplateMicro = Y.Template.Micro,","    EVT_READY = 'widget-ready',","    VIEW_TEMPLATE_UL = '<ul role=\"presentation\"></ul>',","    VIEW_MODEL_TEMPLATE_UL = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_UL = '<li>{content}</li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE = '<tr><td colspan=\"{cols}\">{content}</td></tr>',","    TEMPLATE_TABLE = '<table role=\"presentation\"></table>',","    VIEW_TEMPLATE_TBODY = '<tbody></tbody>',","    VIEW_MODEL_TEMPLATE_TABLE = '<tr role=\"presentation\"></tr>',","    LOADING_TEMPLATE = '<div>{loading}</div>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-model',","    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',","    MODELLIST_CLASS = 'itsa-modellistview',","    SVML_LASTMODEL_CLASS = MODELLIST_CLASS + '-lastitem',","    SVML_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-noinitialitems',","    SVML_VIEW_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-view-noinitialitems',","    SVML_NOITEMS_CLASS = MODELLIST_CLASS + '-noitems',","    SVML_VIEW_NOITEMS_CLASS = MODELLIST_CLASS + '-view-noitems',","    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = MODELLIST_CLASS + '-styled',","    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = MODELLIST_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = MODELLIST_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = MODELLIST_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = MODELLIST_CLASS + '-sequelgroupheader',","    SVML_UNSELECTABLE = MODELLIST_CLASS + '-unselectable',","    SVML_SHOWLOADING_CLASS = MODELLIST_CLASS + '-showloading',","    FORM_STYLE_CLASS = 'yui3-form',","    LOADING_MESSAGE = 'Loading...',","    NO_DATA_MESSAGE = 'No data to display',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","//===============================================================================================","// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes","// We mix it to both Y.LazyModelList as well as Y.ModelList","// this way we can always call these methods regardsless of a ModelList or LazyModelList as used","//===============================================================================================","","function ITSAModellistAttrExtention() {}","","Y.mix(ITSAModellistAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (typeof model.get !== 'function');","            if (modelIsLazy) {","                revivedModel = instance.revive(model);","                model[name] = value;","                if (revivedModel) {","                    revivedModel.set(name, value, options);","                    instance.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;","    },","","    /**","     * Returns whether Model is modified. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model.","     *","     * @method isModifiedModel","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Boolean} Whether Model or Object is modified","     * @since 0.1","     *","    */","    isModifiedModel : function(model) {","        var modelIsLazy = !model.get || (typeof model.get !== 'function');","","        // model._changed is self defines field for objects inseide LazyModelList","        return this.isNewModel(model) || (modelIsLazy ? model._changed : !YObject.isEmpty(model.changed));","    },","","    /**","     * Returns whether Model is new. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model.","     *","     * @method isNewModel","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Boolean} Whether Model or Object is new","     * @since 0.1","     *","    */","    isNewModel : function(model) {","        return !Lang.isValue(this.getModelAttr(model, 'id'));","    }","","}, true);","","Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;","","Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    /**","     * Cleansup the node by calling destroy(true) on all its children, as well as destroying all widgets that lie","     * within the node by calling widget.destroy(true);","     *","     * @method cleanup","     * @since 0.1","     *","    */","    cleanup: function() {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(true);","                        }","                    }","                }","            );","        }","        node.all('children').destroy(true);","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","// -- Now creating extention -----------------------------------","","function ITSAModellistViewExtention() {}","","ITSAModellistViewExtention.ATTRS = {","","   /**","    * The (Lazy)ModelList that is 'attached' to the instance. If you attach an Array, then it will be rebuild into a LazyModelList.","    * CAUTION: when attaching an Array, be sure it is ordered in the right way, because you don't have a ModelList.comparator.","    * Without a right order, 'headers' can appear in an unexpected way.","    *","    * @attribute modelList","    * @type {ModelList|LazyModelList|Array}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v === null) || (v.getByClientId) || Lang.isArray(v);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'modelTemplate') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return (typeof v === 'boolean');},","        setter: '_setNoDups'","    },","","   /**","    * Defines the listType. Use 'ul' for unsorted list, or 'table' for table-format.","    * This attrbute can only be set once during innitialisation.","    * <b>Caution:</b> if you set this attribute to 'table', then all items are tr-elements and you need to render the","    * td-elements yourself within 'modelTemplate' and groupHeaders (with the right number of td's).","    *","    * @attribute listType","    * @type {String}","    * @default 'ul'","    * @since 0.1","    */","    listType: {","        value: 'ul',","        validator: function(v){ return (v==='ul') || (v==='table');},","        writeOnce: 'initOnly'","    },","","   /**","    * Limits the number of rendered Models. The value of 0 means: no limit.","    *","    * @attribute limitModels","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    limitModels: {","        value: 0,","        validator: function(v){ return (typeof v === 'number');},","        setter: '_setLimitModels'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'function'); },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi', 'null' or '' equals false.","    *","    * @default false","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: null,","        lazyAdd: false,","        validator:  function(v) {","            return ((v===null) || (v==='') || (typeof v === 'boolean') || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSel'","    },","","   /**","    * If set, then there ALWAYS REMAINS 1 Model selected.","    * <i>Only accounts when 'modelsSelectable' is active.","    *","    * @default true","    * @attribute modelsUnselectable","    * @type {Boolean}","    * @since 0.1","    */","    modelsUnselectable: {","        value: false,","        validator:  function(v) {","            return (typeof v === 'boolean');","        }","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-modellistview-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default true","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: true,","        lazyAdd: false,","        validator:  function(v) {","            return (typeof v === 'boolean');","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return ((typeof v === 'number') && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return (typeof v === 'boolean');},","        setter: '_setClkEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-dblclick.","    * When set to true, the events 'modelDblclicked' is fired when double-clicking on the Models.","    *","    * @attribute dblclickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    dblclickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return (typeof v === 'boolean');},","        setter: '_setDblclkEv'","    },","","   /**","    * When set to a value > 0, the Models will be highlighted whenever they change (or new added).","    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.","    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-model-changed' fors ome seconds.","    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.","    *","    * @attribute highlightAfterModelChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    highlightAfterModelChange: {","        value: 0,","        validator: function(v) {return (typeof v === 'number');},","        setter: '_setMarkModelChange'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.<br />","    * 0 = no scroll into view<br />","    * 1 = active: scroll into view<br />","    * 2 = active: scroll into view with headerdefinition if the headers are just before the last item<br />","    * 3 = active: scroll into view, scroll to top<br />","    * 4 = active: scroll into view with headerdefinition if the headers are just before the last item, scroll to top<br />","    *","    * @attribute modelsIntoViewAfterAdd","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterAdd: {","        value: false,","        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=4));},","        setter: '_setIntoViewAdded'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after a ModelChange.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterChange: {","        value: false,","        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=2));},","        setter: '_setIntoViewChanged'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v){ return (typeof v === 'boolean'); },","        setter: '_setMouseDnUpEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v){ return (typeof v === 'boolean'); },","        setter: '_setHoverEv'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader2')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader3')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH3'","    },","","    /**","     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's).","     * Example: '<td><%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute modelTemplate","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    modelTemplate: {","        value: '{clientId}', // default-modelTemplate, so that there always is content. Best to be overwritten.","        validator: function(v){ return (typeof v === 'string'); },","        setter: '_setModelTemplate'","    },","","    /**","     * Template to render an additional className to the rendered element. In fact: every Model will be rendered inside a <li>-element.","     * The innercontent of the LI-element is determined by 'modelTemplate' while classNameTemplate can add additional classes to the li-element.","     * The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{gender}'","     * <b>Example with Y.Template.Micro:</b>","     * '<% if (data.age>18) {%>adult<% } %>'","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute classNameTemplate","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    classNameTemplate: {","        value: null,","        validator: function(v){ return (typeof v === 'string'); },","        setter: '_setClassNameTempl'","    },","","    /**","     * Template for rendering of groupHeader1. If not set, groupHeader1Template will render the same as the attribute 'groupHeader1'.","     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH1Templ'","    },","","    /**","     * Template for rendering of groupHeader2. If not set, groupHeader2Template will render the same as the attribute 'groupHeader2'.","     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH2Templ'","    },","","    /**","     * Template for rendering of groupHeader3. If not set, groupHeader3Template will render the same as the attribute 'groupHeader3'.","     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH3Templ'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'modelTemplate').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'function'); },","        setter: '_setDupComp'","    },","","    /**","     * Attribute that makes the message 'Loading...' visible until the view is rendered for the first time.","     * Only showed if you didn't not use 'itsa-modellistview-noinitialitems' to hide the widget...","     *","     * @attribute showLoadMessage","     * @type {Boolean}","     * @default false","     * @since 0.1","     */","    showLoadMessage: {","        value: false,","        validator: function(v){ return (typeof v === 'boolean'); }","    }","","};","","Y.mix(ITSAModellistViewExtention.prototype, {","","    //-------------------------------------------------------------------------------------","    //---- Public methods -----------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        //-------------------------------------------------------------------------------------","        //---- Private properties -------------------------------------------------------------","        //-------------------------------------------------------------------------------------","","","            instance.publish(","                'modelListRender',","                {","//                    defaultFn: Y.rbind(instance._defPluginAddFn, instance),","                    emitFacade: true","                }","            );","","","","","        /**","         * Internal list that holds event-references","         * @property _handlers","         * @private","         * @default []","         * @type Array","        */","        instance._handlers = [];","","        /**","         * Internal reference to the original models, which is only used when DupModels are avaialble.","         * It makes it posible to return the original models on a modelClick-event.","         * @property _origModels","         * @private","         * @default []","         * @type Array","        */","        instance._origModels = [];","","        /**","         * Internal eventhandle, defined when the attribute 'selectedModels' is used.","         * @property _selModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'clickEvents' is used.","         * @property _clkModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.","         * @property _dblclkModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","         * @property _mouseentModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","         * @property _mouseUpModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","         * @property _mouseDnModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","         * @property _mouseleaveModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","         * @property _markModelChangeEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","         * @property _markModelAddEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.","         * @property _modelInViewChanged","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.","         * @property _modelInViewAdded","         * @private","         * @default null","         * @type Y.EventHandle","        */","","        /**","         * Internal object with references to all selected Models.","         * @property _selectedModels","         * @private","         * @default {}","         * @type Object","        */","        instance._selectedModels = {};","","        /**","         * Internal reference to the viewNode","         * @property _viewNode","         * @private","         * @default null","         * @type Y.Node","        */","","        /**","         * The id of _viewNode","         * @property _viewId","         * @private","         * @default Y.guid()","         * @type String","        */","        instance._viewId = Y.guid();","","        /**","         * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.","         * @property _currentViewPg","         * @private","         * @default 0","         * @type Int","        */","        instance._currentViewPg = 0;","","        /**","         * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.","         * @property _templFns","         * @private","         * @default null","         * @type Object","        */","","        /**","         * Internal reference to the last Model that was clicked.","         * @property _lastClkModel","         * @private","         * @default null","         * @type Y.Model","        */","","        /**","         * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.","         * @property _abModelList","         * @private","         * @default null","         * @type Y.ModelList | Y.LazyModelList","        */","","        /**","         * Internal flag to tell whether the attribute 'viewFilter' is initiated.","         * @property _viewFilterInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._viewFilterInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader1' is initiated.","         * @property _grpH1Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH1Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader2' is initiated.","         * @property _grpH2Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH2Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader3' is initiated.","         * @property _grpH3Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH3Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader1Template' is initiated.","         * @property _gH1TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH1TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader2Template' is initiated.","         * @property _gH2TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH2TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader3Template' is initiated.","         * @property _gH3TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH3TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'modelTemplate' is initiated.","         * @property _modelTemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._modelTemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'classNameTemplate' is initiated.","         * @property _renderClassInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._renderClassInit = false;","","        /**","         * Internal flag to tell whether the attribute 'dupComparator' is initiated.","         * @property _dupCompInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._dupCompInit = false;","","        /**","         * Internal flag to tell whether the attribute 'noDups' is initiated.","         * @property _noDupsInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._noDupsInit = false;","","        /**","         * Internal flag to tell whether the attribute 'limitModels' is initiated.","         * @property _limModelsInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._limModelsInit = false;","","        /**","         * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.","         * @property _rerendAttrChg","         * @private","         * @default true","         * @type Boolean","        */","        instance._rerendAttrChg = true;","","        /**","         * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.","         * @property _itmsAvail","         * @private","         * @default false","         * @type Boolean","        */","        instance._itmsAvail = false; // must initially be set true","","        /**","         * Internal refrence to the index of the last rendered Model in the View.","         * @property _prevLastModelIndex","         * @private","         * @default -1","         * @type Int","        */","        instance._prevLastModelIndex = -1;","","        /**","         * Internal flag that tells is the used ModelList is a LazyModelList.","         * @property _listLazy","         * @private","         * @default false","         * @type Boolean","        */","        instance._listLazy = false;","","        /**","         * The content of the last rendered Header1","         * @property _prevH1","         * @private","         * @default null","         * @type String|null","        */","","        /**","         * The content of the last rendered Header2","         * @property _prevH2","         * @private","         * @default null","         * @type String|null","        */","","        /**","         * The content of the last rendered Header3","         * @property _prevH3","         * @private","         * @default null","         * @type String|null","        */","","        /**","         * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.","         * @property _even","         * @private","         * @default false","         * @type Boolean","        */","        instance._even = false;","","        /**","         * Internal flag that tells wheter a Template.Micro is being used.","         * @property _microTemplateUsed","         * @private","         * @default null","         * @type Boolean","        */","","        instance.renderPromise().then(","            Y.bind(instance._render, instance)","        );","    },","","    /**","     * Promise that holds any stuff that should be done before the widget is defined as 'ready'.","     * <b>Notion</b>It is not the intention to make a dircet call an promiseBeforeReady --> use readyPromise () instead,","     * because that promise will be fulfilled when both this promise as well as renderPromise() are fulfilled.","     *","     * @method promiseBeforeReady","     * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />","     *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.<br />","     *                                      The timeout-value can only be set at the first time the Promise is called.","     * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).","     * @since 0.2","    */","    promiseBeforeReady : function(timeout) {","        var instance = this,","              takenTimeout = timeout || 20000;","        return new Y.Promise(function (resolve, reject) {","            var readyEvent = instance.once(","                EVT_READY,","                resolve","            );","            if (instance._ready) {","                readyEvent.detach();","                resolve();","            }","            Y.later(","                takenTimeout,","                null,","                function() {","                    readyEvent.detach();","                    reject(new Error('Timeout: widget not ready within '+takenTimeout+' miliseconds'));","                }","            );","        });","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerendAttrChg = false;","        instance.set(name, val, opts);","        instance._rerendAttrChg = true;","    },","","    /**","     * Retreives the Li-Node given the index from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromIndex","     * @param {Int} index Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromIndex : function(index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(null, index, maxExpansions);","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromModel","     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromModel : function(model, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(model, null, maxExpansions);","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method saveScrollTo","     * @since 0.1","     *","    */","    saveScrollTo : function() {","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method scrollIntoView","     * @since 0.1","    */","    scrollIntoView : function() {","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            isArray = Lang.isArray(models),","            singleSelectable = (instance.get('modelsSelectable')==='single'),","            prevSize, contentBox;","","        if (singleSelectable) {","            instance.clearSelectedModels(true, true);","        }","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","","        if (isArray && !singleSelectable) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true, maxExpansions);","                }","            );","            if (scrollIntoView && (models.length>0)) {","                instance.scrollIntoView(models[0], options, maxExpansions);","            }","        }","        else {","            if (isArray) {","                models = models[0];","            }","            instance._selectModel(models, true, maxExpansions);","            if (scrollIntoView) {","                instance.scrollIntoView(models, options, maxExpansions);","            }","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true","     * @since 0.1","    */","    unselectModels : function(models, silent, force) {","        var instance = this,","            prevSize, contentBox;","","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false, null, force);","                }","            );","        }","        else {","            instance._selectModel(models, false, null, force);","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.","     * @since 0.1","    */","    clearSelectedModels : function(silent, force) {","        var instance = this,","            contentBox = instance.get('contentBox'),","            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;","","        blurAll = function() {","            currentSelected.each(","                function(node) {","                    node.blur();","                }","            );","        };","        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);","        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);","        if (silent) {","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","        }","        else {","            fireEvent = (currentSelected.size()>0);","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","            if (fireEvent) {","                instance._fireSelectedModels();","            }","        }","        instance._selectedModels = {};","        if (instance.get('modelsUnselectable') && firstSelected && !force) {","            clientId = firstSelected.getData('modelClientId');","            modelList = instance.getModelListInUse();","            model = modelList.getByClientId(clientId);","            instance.selectModels(model, false, null, true);","        }","    },","","    /**","     * Returns an Array with the Models or Objects that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _origModels, then it has an originalModel","                    var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Normal speaken, you only need to call this method yourself, when the ModelList.comparator changes.","     * The viewNode will be updated automaticly when attributes change, or when the (Lazy)-ModelList changes, or when","     * Models change. Be aware though, that the Model needs to fire a *:change event in roder to make the changes happen. This means,","     * that if you are using a LazyModelList, then be sure the object is revived into a Model-instance.","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Returns the modellist that is responsible for building the items. Normally speaken, this is the attribute 'modelList'","     * itself. However, if DupModels are active, the list is axpanded and _abModelList is returned.","     *","     * @method getModelListInUse","     * @since 0.1","     *","    */","    getModelListInUse : function() {","        return this._abModelList || this.get('modelList');","    },","","    /**","     * Gets the Model (or Object, in case of LazyModelList) from the specific Node.","     * The Node should be a Node that represent the listitems.","     *","     * @method getModelFromNode","     * @param {Y.Node} node","     * @return {Y.model|Object|null} The Model-instance, Object (in case of LazyModelList) or null in case of an invalid node","     * @since 0.1","     *","    */","    getModelFromNode : function(node) {","        var instance = this,","            modelList = instance.get('modelList'),","            modelClientId = node.getData('modelClientId');","","        return modelList && modelList.getByClientId(modelClientId);","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelList, revivedModel;","","        if (model) {","            if (instance._listLazy) {","                modelList = instance.get('modelList');","                revivedModel = modelList.revive(model);","                model[name] = value;","                if (revivedModel) {","                    revivedModel.set(name, value, options);","                    modelList.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;","    },","","    /**","     * Returns whether Model is modified. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model.","     *","     * @method isModifiedModel","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Boolean} Whether Model or Object is modified","     * @since 0.1","     *","    */","    isModifiedModel : function(model) {","        var instance = this;","","        // model._changed is self defines field for objects inseide LazyModelList","        return instance.isNewModel(model) || (instance._listLazy ? model._changed : !YObject.isEmpty(model.changed));","    },","","    /**","     * Returns whether Model is new. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model.","     *","     * @method isNewModel","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Boolean} Whether Model or Object is new","     * @since 0.1","     *","    */","    isNewModel : function(model) {","        return !Lang.isValue(this.getModelAttr(model, 'id'));","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selModelEv) {","            instance._selModelEv.detach();","        }","        if (instance._clkModelEv) {","            instance._clkModelEv.detach();","        }","        if (instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","        }","        if (instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","        }","        if (instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","        }","        if (instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","        }","        if (instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","        }","        if (instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","        }","        if (instance._markModelAddEv) {","            instance._markModelAddEv.detach();","        }","        if (instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","        }","        if (instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","        }","        instance._clearAbberantModelList();","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            listType = instance.get('listType'),","            boundingBox = instance.get('boundingBox'),","            contentBox = instance.get('contentBox'),","            viewNode;","","        contentBox = contentBox.one('.yui3-widget-bd') || contentBox;","        contentBox.setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));","        instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        viewNode.set('id', instance._viewId);","        viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);","        boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);","        if (instance.get('showLoadMessage')) {","            boundingBox.addClass(SVML_SHOWLOADING_CLASS);","        }","        instance._templFns = instance._getAllTemplateFuncs();","        instance._extraBindUI();","        if (modellist) {","            instance._renderView(null, {incrementbuild: true, initbuild: true});","        }","        instance._ready = true;","        instance.fire(EVT_READY);","    },","","    /**","     * Focusses the modelNode and adds the className 'itsa-model-focus'.","     * Previous focussed Node will be unmarked.","     *","     * @method _focusModelNode","     * @param {Y.Node} modelNode the ModelNode that should gain focus.","     * @private","     * @since 0.1","     *","    */","    _focusModelNode: function(modelNode) {","        if (modelNode) {","            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);","            modelNode.addClass(SVML_FOCUS_CLASS);","            modelNode.focus();","        }","    },","","    /**","     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","     * bumbs too much.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the param is needed.","     *","     * @method _getMaxPaginatorGotoIndex","     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","     * This only applies when the ITSAInifiniteView is plugged in.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Int} maximum PaginatorIndex that should be called.","     * @private","     * @since 0.1","     *","    */","    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            paginator = instance.hasPlugin('pages'),","            modelList = instance.getModelListInUse(),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","            i = 0,","            lastNode, size, liElements;","","        if (paginator && (modelList.size()>0)) {","            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);","            if (yAxis) {","                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","            }","            else {","                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","            }","            liElements = instance._viewNode.all('>li');","            i = liElements.size();","            while (lastNode && (--i>=0) && (size<boundingSize)) {","                lastNode = liElements.item(i);","                if (yAxis) {","                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","            }","            if (size>=boundingSize) {i++;}","        }","        return i;","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            contentBox = instance.get('contentBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._handlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(MODELLIST_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                modellist = newmodellist;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(MODELLIST_CLASS);","                    instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});","                }","                else {","                    boundingBox.removeClass(MODELLIST_CLASS);","                    contentBox.setHTML('');","                }","            })","        );","        // This was a though one!!","        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null","        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()","        // Thus, we need to reset _gesture when click without movement","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function() {","                    instance._gesture = null;","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction);","                }","            )","        );","        eventhandlers.push(","            instance.after(","                '*:change',","                function(e) {","                    var model = e.target;","                    if (model instanceof Y.Model) {","                        if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {","                            //========================================================","                            //","                            // LACK IN ModelList --> make resort after model:change","                            //","                            //=======================================================","                            if (modellist && modellist.comparator) {","                                modellist.sort();","                                //====================================================","                                //","                                // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                                // As soon as issue is resolved, remove modellist.free() command","                                //","                                if (instance._listLazy) {","                                    modellist.free();","                                }","                                //======================================================","                            }","                            instance._repositionModel(model);","                        }","                        if (instance.modelIsSelected(model)) {","                            instance._fireSelectedModels();","                        }","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                '*:destroy',","                function(e) {","                    var model = e.target;","                    if ((model instanceof Y.Model) && instance.modelIsSelected(model)) {","                        instance._fireSelectedModels();","                    }","                }","            )","        );","        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll","        // we set it on contentBox instead of BoundingBox to interupt as soon as posible","        eventhandlers.push(","            contentBox.delegate(","                'click',","                function(e) {","                    // Prevent links from navigating as part of a scroll gesture","                    if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {","                        e.preventDefault();","                        e.stopImmediatePropagation();","                    }","                },","                function() {","                    return this.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                }","            )","        );","        // also prevent default on mousedown, to prevent the native \"drag link to desktop\" behavior on certain browsers.","        eventhandlers.push(","            boundingBox.delegate(","                'mousedown',","                function(e) {","                    // Prevent default anchor drag behavior, on browsers","                    // which let you drag anchors to the desktop","                    e.preventDefault();","                },","                function() {","                    var tagName = this.get('tagName');","                    return ((tagName==='A') || (tagName==='IMG'));","                }","            )","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after(","                ['*:remove', '*:add'],","                function(e) {","                    var modellist = e.target;","                    if (modellist instanceof Y.ModelList) {","                        //====================================================","                        //","                        // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                        // As soon as issue is resolved, remove modellist.free() command","                        //","                        if (instance._listLazy) {","                            modellist.free();","                        }","                        //======================================================","                        instance._renderView();","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                ['*:reset'],","                function(e) {","                    if (e.target instanceof Y.ModelList) {","                        instance._renderView(null, {keepstyles: false, initbuild: true});","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                ['itsamodellistviewextention:destroy', 'itsamodellistviewextention:pluggedin'],","                function(e) {","                    if (e.target instanceof Y.ModelList) {","                        instance._renderView(null, {keepstyles: false, initbuild: true});","                    }","                }","            )","        );","        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,","        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute","        instance.get('highlightAfterModelChange');","        instance.get('modelsIntoViewAfterAdd');","        instance.get('modelsIntoViewAfterChange');","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        if (Lang.isArray(val)) {","            val = new Y.LazyModelList({items: val});","        }","        instance._listLazy = val && val.revive;","        instance._itmsAvail = val && (val.size()>0);","        return val;","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._noDupsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._noDupsInit = true;","        }","    },","","    /**","     * Setter for attribute limitModels. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLimitModels","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLimitModels : function(val) {","        var instance = this;","","        if (instance._limModelsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({limitModels: val});","            }","        }","        else {","            instance._limModelsInit = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._viewFilterInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._viewFilterInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComp","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComp : function(val) {","        var instance = this;","","        if (instance._dupCompInit) {","            if (instance._rerendAttrChg && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._dupCompInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH1","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH1 : function(val) {","        var instance = this;","","        if (instance._grpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH1Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH2","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH2 : function(val) {","        var instance = this;","","        if (instance._grpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH2Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH3","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH3 : function(val) {","        var instance = this;","","        if (instance._grpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH3Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH1Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH1Templ : function(val) {","        var instance = this;","","        if (instance._gH1TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH1TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH2Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH2Templ : function(val) {","        var instance = this;","","        if (instance._gH2TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH2TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH3Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH3Templ : function(val) {","        var instance = this;","","        if (instance._gH3TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH3TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setModelTemplate","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelTemplate : function(val) {","        var instance = this;","","        if (instance._modelTemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._modelTemplateInit = true;","        }","    },","","    /**","     * Setter for attribute classNameTemplate. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setClassNameTempl","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setClassNameTempl : function(val) {","        var instance = this;","","        if (instance._renderClassInit) {","            instance._templFns = instance._getAllTemplateFuncs({classNameTemplate: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderClassInit = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selModelEv.","     *","     * @method _setModelsSel","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSel : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.","        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation","        if (Y.UA.ie>0) {","            contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');","        }","        contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-modellistview-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val).toggleClass(FORM_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selModelEv) {","            instance._selModelEv = contentBox.delegate(","                'tap',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function(node, e) {","                    // The 'tap'-event will make no firing on mousemovements, so we don't need to check lastScrolledAmt","//                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),","                    var buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+","                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                    return (!buttonOrLink && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selModelEv) {","            instance._selModelEv.detach();","            instance._selModelEv = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clkModelEv) {","            /**","             * Is fired when the user clicks on a Model. <b>You must</b> have set 'clickEvents' true in order to work.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clkModelEv = contentBox.delegate(","                'tap',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function(node, e) {","                    // The 'tap'-event will make no firing on mousemovements, so we don't need to check lastScrolledAmt","//                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),","                    var buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+","                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                    return (!buttonOrLink && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clkModelEv) {","            instance._clkModelEv.detach();","            instance._clkModelEv = null;","        }","    },","","    /**","     * Sets or removes dblclick-events when the mouse double-clicks on a Model.","     *","     * @method _setDblclkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setDblclkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._dblclkModelEv) {","            /**","             * Is fired when the user doubleclicks on a Model. <b>You must</b> have set 'dblclickEvents' true in order to work.","             *","             * @event modelDblclick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._dblclkModelEv = contentBox.delegate(","                'dblclick',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelDblclick', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","            instance._dblclkModelEv = null;","        }","    },","","    /**","     * Sets or removes highlight-effects after a Model is changed.","     *","     * @method _setMarkModelChange","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMarkModelChange : function(val) {","        var instance = this;","","        if (val && (val>0) && !instance._markModelChangeEv) {","            instance._markModelChangeEv = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node;","                    if ((model instanceof Y.Model) && (!e.fromEditModel || !instance.itsacmtemplate ||","                                                       !instance.itsacmtemplate.get('modelsEditable'))) {","                        node = instance.getNodeFromModel(model);","                        if (node) {","                            node.addClass(MODEL_CHANGED_CLASS);","                            Y.later(","                                val,","                                instance,","                                function() {","                                    if (node) {","                                        node.removeClass(MODEL_CHANGED_CLASS);","                                    }","                                }","                            );","                        }","                    }","                }","            );","        }","        else if (!val && instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","            instance._markModelChangeEv = null;","        }","        if (val && (val>0) && !instance._markModelAddEv) {","            instance._markModelAddEv = instance.after(","                '*:add',","                function(e) {","                    if (e.target instanceof Y.ModelList) {","                        var node = instance.getNodeFromIndex(e.index);","                        if (node) {","                            node.addClass(MODEL_CHANGED_CLASS);","                            Y.later(","                                val,","                                instance,","                                function() {","                                    if (node) {","                                        node.removeClass(MODEL_CHANGED_CLASS);","                                    }","                                }","                            );","                        }","                    }","                }","            );","        }","        else if (!val && instance._markModelAddEv) {","            instance._markModelAddEv.detach();","            instance._markModelAddEv = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is added to the list.","     * Meaning val:","     * 0 = no scroll into view","     * 1 = active: scroll into view","     * 2 = active: scroll into view with headerdefinition if the headers are just before the last item","     * 3 = active: scroll into view, always on top of page","     * 4 = active: scroll into view with headerdefinition if the headers are just before the last item, always on top of page","     *","     * @method _setIntoViewAdded","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewAdded : function(val) {","        var instance = this;","","        if ((val >0) && !instance._modelInViewAdded) {","            instance._modelInViewAdded = instance.after(","                '*:add',","                function(e) {","                    var itsacmtemplate = instance.itsacmtemplate,","                        focus = itsacmtemplate && (itsacmtemplate.get('newModelMode')===3);","                    if (e.target instanceof Y.ModelList) {","                        instance.scrollIntoView(e.index,","                            {noFocus: !focus, forceTop: (val>2), editMode: focus, showHeaders: ((val===2) || (val===4))});","                    }","                }","            );","        }","        else if ((val===0) && instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","            instance._modelInViewAdded = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is changed.","     *","     * @method _setIntoViewChanged","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewChanged : function(val) {","        var instance = this;","","        if ((val>0) && !instance._modelInViewChanged) {","            instance._modelInViewChanged = instance.after(","                '*:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node;","                    if (model instanceof Y.Model) {","                        node = instance.getNodeFromModel(model);","                        if (node) {","                            instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});","                        }","                    }","                }","            );","        }","        else if ((val===0) && instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","            instance._modelInViewChanged = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDnUpEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDnUpEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDnModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDnModelEv = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","            instance._mouseDnModelEv = null;","        }","        if (val && !instance._mouseUpModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEv = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","            instance._mouseUpModelEv = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseentModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseentModelEv = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","            instance._mouseentModelEv = null;","        }","        if (val && !instance._mouseleaveModelEv) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEv = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        model = instance.getModelFromNode(node);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","            instance._mouseleaveModelEv = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance.getModelListInUse(),","            modelClientId = modelNode.getData('modelClientId'),","            model = modelList && modelList.getByClientId(modelClientId),","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,","            currentSelected, firstItemSelected;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        if (model) {","            // At this stage, 'modelsSelectable' is either 'single' or 'multi'","            if (singleSelectable || !ctrlClick) {","                if (instance.get('modelsUnselectable')) {","                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);","                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);","                }","                instance.clearSelectedModels(true, true);","            }","            if (shiftClick && instance._lastClkModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClkModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels, false, null, true);","            }","            else {","                if (modelPrevSelected && !firstItemSelected) {","                    instance.unselectModels(model, true);","                }","                else {","                    instance.selectModels(model, false, null, true);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClkModel = modelPrevSelected ? null : model;","            }","            instance._focusModelNode(modelNode);","        }","        instance._fireSelectedModels();","    },","","    /**","     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.","     *","     * @method _getAllTemplateFuncs","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @private","     * @return {Object} All templates --> an object with the fields: <b>template, classNameTemplate, groupH1, groupH2, groupH3,","     * renderGH1, renderGH2, renderGH3, activeClass, activeGH1, activeGH2, activeGH3</b>. The last 4 keys are Booleans, the other are templates.","     * @since 0.1","     *","    */","    _getAllTemplateFuncs : function(setterAttrs) {","        var instance = this,","            itsacmtemplate = instance.itsacmtemplate,","            template = (setterAttrs && setterAttrs.template) || instance.get('modelTemplate'),","            classNameTemplate = (setterAttrs && setterAttrs.template) || instance.get('classNameTemplate'),","            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),","            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),","            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),","            renderGH1 = (setterAttrs && setterAttrs.groupHeader1Template) || instance.get('groupHeader1Template') || groupH1,","            renderGH2 = (setterAttrs && setterAttrs.groupHeader2Template) || instance.get('groupHeader2Template') || groupH2,","            renderGH3 = (setterAttrs && setterAttrs.groupHeader3Template) || instance.get('groupHeader3Template') || groupH3,","            activeClass = classNameTemplate && (classNameTemplate.length>0),","            activeGH1 = groupH1 && (groupH1.length>0),","            activeGH2 = groupH2 && (groupH2.length>0),","            activeGH3 = groupH3 && (groupH3.length>0),","            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,","            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,","            compiledRenderGH3Engine, templateObject, isMicroTemplate, classNameEngine, microModelTemplate,","            microRenderGH1, microRenderGH2, microRenderGH3;","","        isMicroTemplate = function(checkTemplate) {","            var microTemplateRegExp = /<%(.+)%>/;","            return microTemplateRegExp.test(checkTemplate);","        };","        microModelTemplate = isMicroTemplate(template);","        microRenderGH1 = activeGH1 && isMicroTemplate(renderGH1);","        microRenderGH2 = activeGH2 && isMicroTemplate(renderGH2);","        microRenderGH3 = activeGH3 && isMicroTemplate(renderGH3);","        instance._microTemplateUsed = (microModelTemplate || microRenderGH1 || microRenderGH2 || microRenderGH3);","        if (!itsacmtemplate) {","            // default behaviour without Y.Plugin.ITSAChangeModelTemplate","            if (microModelTemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                modelEngine = function(model) {","                    return compiledModelEngine(instance.getModelToJSON(model));","                };","            }","            else {","                modelEngine = function(model) {","                    return Lang.sub(template, instance.getModelToJSON(model));","                };","            }","        }","        else {","            // WITH Y.Plugin.ITSAChangeModelTemplate","            if (microModelTemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                modelEngine = function(model) {","                    return itsacmtemplate._getModelEngine(model, null, compiledModelEngine);","                };","            }","            else {","                modelEngine = function(model) {","                    return itsacmtemplate._getModelEngine(model, template);","                };","            }","        }","        if (isMicroTemplate(classNameTemplate)) {","            compiledModelEngine = YTemplateMicro.compile(classNameTemplate);","            classNameEngine = function(model) {","                return compiledModelEngine(instance.getModelToJSON(model));","            };","        }","        else {","            classNameEngine = function(model) {","                return Lang.sub(classNameTemplate, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(groupH1)) {","            compiledGroupH1Engine = YTemplateMicro.compile(groupH1);","            groupH1Engine = function(model) {","                return compiledGroupH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH1Engine = function(model) {","                return Lang.sub(groupH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(groupH2)) {","            compiledGroupH2Engine = YTemplateMicro.compile(groupH2);","            groupH2Engine = function(model) {","                return compiledGroupH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH2Engine = function(model) {","                return Lang.sub(groupH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(groupH3)) {","            compiledGroupH3Engine = YTemplateMicro.compile(groupH3);","            groupH3Engine = function(model) {","                return compiledGroupH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH3Engine = function(model) {","                return Lang.sub(groupH3, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH1) {","            compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);","            renderGH1Engine = function(model) {","                return compiledRenderGH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH1Engine = function(model) {","                return Lang.sub(renderGH1, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH2) {","            compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);","            renderGH2Engine = function(model) {","                return compiledRenderGH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH2Engine = function(model) {","                return Lang.sub(renderGH2, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH3) {","            compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);","            renderGH3Engine = function(model) {","                return compiledRenderGH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH3Engine = function(model) {","                return Lang.sub(renderGH3, instance.getModelToJSON(model));","            };","        }","        templateObject = {","            template : modelEngine,","            classNameTemplate : classNameEngine,","            groupH1 : groupH1Engine,","            groupH2 : groupH2Engine,","            groupH3 : groupH3Engine,","            renderGH1 : renderGH1Engine,","            renderGH2 : renderGH2Engine,","            renderGH3 : renderGH3Engine,","            activeClass : activeClass,","            activeGH1 : activeGH1,","            activeGH2 : activeGH2,","            activeGH3 : activeGH3","        };","        return templateObject;","    },","","    /**","     * Will try to render 'trymodel' through the template defined with tha attribute 'modelTemplate'.","     * Only succeeds if it passes all tests declared by the other params. Should it fail the tests, then 'false' is returned.","     * If succeeded, the the HTML (String) will be returned.","     *","     * @method _tryRenderModel","     * @param {Y.Model} trymodel The Model (might be an object in case of LazyModelList) to be rendered","     * @param {String} [prevrenderedmodel] The previous Model that was rendered: should be in a 'rendered-state'.","     * Is used to check against when nodups are permitted and dupComparator is undefined.","     * @param {Y.Array} modelListItemsArray (Lazy)ModelList in array-form","     * @param {Function} viewFilter the viewFilter function (attribute), passed as a parameter for performancereasons","     * @param {Boolean} noDups the value of the attribute 'nodups', passed as a parameter for performancereasons","     * @param {Function} dupComparator the dupComparator function (attribute), passed as a parameter for performancereasons","     * @param {Object} allTemplateFuncs passed as a parameter for performancereasons","     * @private","     * @return {HTML|false} false if failed -possibly because it's a dup or falls out of the filter-, otherwise returns the rendered HTML: rendered","     * through the 'modelTemplate'-template","     * @since 0.1","     *","    */","    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {","        var instance = this,","            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;","","        dubComparatorBinded = Y.rbind(dupComparator, instance);","        viewFilterBinded = Y.rbind(viewFilter, instance);","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dubComparatorBinded(model);","            YArray.some(","                modelListItemsArray,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dubComparatorBinded(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        allowed = (!viewFilter || viewFilterBinded(trymodel)) &&","                      (!noDups ||","                       (!dupComparator && ((renderedmodel = allTemplateFuncs.template(trymodel))!==prevrenderedmodel)) ||","                       (dupComparator && !dupAvailable(trymodel))","                      );","        return allowed && (renderedmodel || allTemplateFuncs.template(trymodel));","    },","","    _clearAbberantModelList : function() {","        var instance = this;","","        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","        if (instance._abModelList) {","            instance._abModelList.destroy();","        }","        instance._abModelList = null;","    },","","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","","     * @param {Object} [options]","     *    @param {Boolean} [options.rebuild=true] set to 'false' if you don't want to rebuild but want to add items at the end of the list","     *    unless the infiniteView-plugin is available OR limitModels>0","     *    @param {Int} [options.page=0] lets ITSAViewPagination make rendering pages","     *    @param {Boolean} [options.incrementbuild=false] if 'true': appends every element one by one.","     *    If 'false' the whole <ul> will be replaced at once.","     *    @param {Boolean} [options.keepstyles=true] set to 'false' if you don't want to retain selected/focused info (only when you 'reset' the list)","     *    @param {Boolean} [options.initbuild=false] internal flag to notify the initial build","     * @private","     * @since 0.1","    */","    _renderView : function(setterAttrs, options) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            noDups = (setterAttrs && setterAttrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAttrs && setterAttrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAttrs && setterAttrs.viewFilter) || instance.get('viewFilter'),","            paginator = instance.pages,","            changedLimitModels = (setterAttrs && setterAttrs.limitModels),","            limitModels = changedLimitModels || instance.get('limitModels'),","            allTemplateFuncs = instance._templFns,","            lastItemOnTop = (setterAttrs && setterAttrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            infiniteView = instance.itsainfiniteview,","            widgetStdMod = contentBox.one('.yui3-widget-bd'),","            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,","            modelConfig, splitDays, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,","            i, j, model, modelListItems, batchSize, items, modelListItemsLength, table, noDataTemplate;","","        options = options || {};","        options.page = options.page || instance._currentViewPg;","        pageSwitch = (instance._currentViewPg!==options.page);","        options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);","        options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;","        options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;","        if (!contentBox.one('#'+instance._viewId)) {","            instance._set('srcNode', contentBox);","            contentBox = contentBox.one('.yui3-widget-bd') || contentBox;","            if (instance.get('listType')==='ul') {","                if (widgetStdMod) {","                    instance.set('bodyContent', viewNode);","                }","                else {","                    contentBox.setHTML(viewNode);","                }","            }","            else {","                if (widgetStdMod) {","                    instance.set('bodyContent', TEMPLATE_TABLE);","                }","                else {","                    contentBox.setHTML(TEMPLATE_TABLE);","                }","                table = contentBox.one('table');","                if (table) {","                    table.append(viewNode);","                }","            }","        }","        // if it finds out there is a 'modelconfig'-attribute, or 'splitDays' is true, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (options.rebuild) {","            i = (options.page*limitModels) -1; // will be incread to zero at start loop","            instance._prevH1 = null;","            instance._prevH2 = null;","            instance._prevH3 = null;","            instance._even = false;","            if (infiniteView) {","                instance._itmsAvail = true;","            }","            instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);","            viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);","        }","        else {","            // start with the last index","            viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);","            i = (instance._prevLastModelIndex || -1); // i will be increased at start loop","        }","        if (!options.incrementbuild) {","            newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');","            splitDays = (setterAttrs && setterAttrs.splitDays) || instance.get('splitDays');","            if (modelConfig && modelConfig.date && ((splitDays && modelConfig.enddate) || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, options.rebuild);","                modelList = instance._abModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._clearAbberantModelList();","            }","        }","        else {","            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._clearAbberantModelList();","        }","","        // in case of ITSAViewPaginator is active --> limitModels is always>0","        renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;","        listIsLimited = (renderListLength<modelListItemsLength);","        items = 0;","        batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;","        if (i>0) {","            // when available: remove the fillNode that makes lastItemOnTop","            // It will be rendered on the bottom again","            instance._removeEmptyItem();","        }","        while ((items<batchSize) && (++i<renderListLength)) {","            model = modelListItems[i];","            renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,","                                                     dupComparator, allTemplateFuncs);","            if (renderedModel) {","                if (items===0) {","                    instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);","                    viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);","                    if (options.initbuild) {","                        instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);","                        viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);","                    }","                }","                items++;","                modelNode = instance._createModelNode(model, renderedModel);","                // modelNode is an ARRAY of Y.Node !!!","                for (j=0; j<modelNode.length; j++) {","                    if (options.incrementbuild) {","                        viewNode.append(modelNode[j]);","                    }","                    else {","                        newViewNode.append(modelNode[j]);","                    }","                }","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","        }","        if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {","            modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i;","        if (!options.incrementbuild) {","            if (options.keepstyles) {","                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first","                findNodeByClientId = function(modelClientId, nodelist) {","                    var nodeFound;","                    nodelist.some(","                        function(node) {","                            var found = (node.getData('modelClientId') === modelClientId);","                            if (found) {","                                nodeFound = node;","                            }","                            return found;","                        }","                    );","                    return nodeFound;","                };","                previousViewModels = viewNode.all('.'+MODEL_CLASS);","                newViewModels = newViewNode.all('.'+MODEL_CLASS);","                previousViewModels.each(","                    function(node) {","                        var hasSelected = node.hasClass(SVML_SELECTED_CLASS),","                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),","                            newnode;","                        if (hasSelected || hasFocus) {","                            newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);","                            if (newnode) {","                                newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);","                                newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);","                            }","                        }","                    }","                );","            }","            if (instance._microTemplateUsed) {","                viewNode.cleanup();","            }","            if (widgetStdMod) {","                instance.set('bodyContent', newViewNode);","            }","            else {","                viewNode.replace(newViewNode);","            }","            viewNode = instance._viewNode = newViewNode;","            newViewNode.set('id', instance._viewId);","        }","        if (viewNode.getHTML()==='') {","            noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));","        }","        if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!","            instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);","        }","        instance._currentViewPg = options.page;","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","//========================================================","        // now a correction of PaginatorPlugin-bug:","        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin","        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown","        if (paginator) {","            currentPaginatorIndex = paginator.get('index');","            maxPaginatorIndex = viewNode.get('children').size() - 1;","            if (currentPaginatorIndex > maxPaginatorIndex) {","                paginator.set('index', maxPaginatorIndex);","            }","        }","//========================================================","        if (infiniteView) {","            infiniteView.checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","    /**","     * Repositions the model on a new position in the view. This method is called after a model:change-event.","     *","     * @method _repositionModel","     * @param {Y.Model} [model] The model to reposition","     * @private","     * @since 0.1","    */","//    _repositionModel : function(model) {","    _repositionModel : function() {","        // NEEDS UPDATED CODE","        // _renderView() is far too costly.","        this._renderView();","    },","","","    /**","     * Creates the node to be rendered <b>with its headers</b> (if applyable). This means that an array is returned,","     * where the last item is the rendered-model.","     *","     * @method _repositionModel","     * @param {Y.Model} [model] The model to reposition","     * @private","     * @return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.","     * @since 0.1","    */","    _createModelNode : function(model, renderedModel) {","        var instance = this,","            modelClientId = instance.getModelAttr(model, 'clientId'),","            nodes = [],","            itsacmtemplate = instance.itsacmtemplate,","            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,","            modelNode = YNode.create(rowtemplate),","            header1, header2, header3, headerNode, allTemplateFuncs;","","        allTemplateFuncs = instance._templFns;","        if (allTemplateFuncs.activeGH1) {","            header1 = allTemplateFuncs.groupH1(model);","            if (header1!==instance._prevH1) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER1_CLASS);","                if (instance._prevH1) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH1(model));","                nodes.push(headerNode);","                instance._prevH1 = header1;","                instance._even = false;","                // force to make a header2 insertion (when appropriate)","                instance._prevH2 = null;","            }","        }","        if (allTemplateFuncs.activeGH2) {","            header2 = allTemplateFuncs.groupH2(model);","            if (header2!==instance._prevH2) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER2_CLASS);","                if (instance._prevH2) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH2(model));","                nodes.push(headerNode);","                instance._prevH2 = header2;","                instance._even = false;","                // force to make a header3 insertion (when appropriate)","                instance._prevH3 = null;","            }","        }","        if (allTemplateFuncs.activeGH3) {","            header3 = allTemplateFuncs.groupH3(model);","            if (header3!==instance._prevH3) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER3_CLASS);","                if (instance._prevH3) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH3(model));","                nodes.push(headerNode);","                instance._prevH3 = header3;","                instance._even = false;","            }","        }","        modelNode.setData('modelClientId', modelClientId);","        if (allTemplateFuncs.activeClass) {","            modelNode.addClass(allTemplateFuncs.classNameTemplate(model));","        }","        modelNode.addClass(MODEL_CLASS);","        modelNode.addClass(modelClientId);","        modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","        if (itsacmtemplate && (itsacmtemplate._getMode(model)===3) && !modelNode.itsatabkeymanager) {","            Y.use('gallery-itsatabkeymanager', function(Y) {","                modelNode.plug(Y.Plugin.ITSATabKeyManager);","            });","        }","        modelNode.setHTML(renderedModel || allTemplateFuncs.template(model));","        nodes.push(modelNode);","        return nodes;","    },","","    /**","     * Adds an empty item to make the lastItemOnTop (or left).","     * Does not remove the previous one -if available-. If nescesairy, you need to do this manually with _removeEmptyItem.","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _addEmptyItem","     * @param {Y.Node} [lastModelNode] Reference to the last node in the scrollview-instance.","     * @param {Int} [lastItemOnTop] internal pass through of lastItemOnTop","     * @private","     * @since 0.1","    */","    _addEmptyItem : function(lastModelNode, lastItemOnTop) {","        var instance = this,","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBox = instance.get('boundingBox'),","            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),","            viewNode = instance._viewNode,","            listTypeUL = (instance.get('listType')==='ul'),","            itemTemplate = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;","","        instance._removeEmptyItem();","        if (!lastModelNode) {","            modelElements = viewNode.all('.'+MODEL_CLASS);","            modelElementsSize = modelElements.size();","            if (modelElementsSize>0) {","                lastModelNode = modelElements.item(modelElementsSize-1);","            }","        }","        if (!listTypeUL) {","            // table itemTemplate --> we must set colspan","            nrCells = lastModelNode.all('>td').size();","        }","        itemTemplate = Lang.sub(itemTemplate, {cols: nrCells, content: ''});","        modelNode = YNode.create(itemTemplate),","        modelNode.addClass(EMPTY_ELEMENT_CLASS);","        viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');","        if (lastModelNode) {","            if (yAxis) {","                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');","            }","            else {","                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');","            }","        }","        lastModelNode = lastModelNode && lastModelNode.previous();","        if (itemOnTopValue===2) {","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                if (yAxis) {","                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));","                }","                else {","                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));","                }","                lastModelNode = lastModelNode.previous();","            }","        }","        modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');","        if (elementsize>0) {","            viewNode.append(modelNode);","        }","    },","","    /**","     * Removes the empty item that made the lastItemOnTop (or left).","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _removeEmptyItem","     * @private","     * @since 0.1","    */","    _removeEmptyItem : function() {","        var instance = this,","            removeNode;","","        removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);","        if (removeNode) {","            removeNode.remove(true);","        }","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList, or the index,","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method _getNodeFromModelOrIndex","     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [index] Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @private","     * @since 0.1","    */","    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),","            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),","            i = 0,","            nodeFound = false,","            nodeList, findNode, modelClientId;","","        if (model) {","            modelClientId = instance.getModelAttr(model, 'clientId');","        }","        findNode = function(node, loopindex) {","            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);","            if (found) {","                nodeFound = node;","            }","            return found;","        };","        do {","            nodeList = instance._viewNode.all('.'+MODEL_CLASS);","            nodeList.some(findNode);","            i++;","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());","        return nodeFound;","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus, maxExpansions, force) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),","            modelnode;","","        if (modelid && (!itemUnselectable || force)) {","            if (instance.hasPlugin('itsainfiniteview')) {","                // make sure the node is rendered","                instance._getNodeFromModelOrIndex(model, null, maxExpansions);","            }","            // each modelid-class should be present only once","            modelnode = contentBox.one('.'+modelid);","            if (modelnode) {","                if (!selectstatus) {","                    modelnode.blur();","                }","                modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","            if (!modelid) {","            }","            else {","            }","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned. In case of LazyModelList, the event","         *","         * @event modelSelectionChange","         * @param e {EventFacade} Event Facade including:","         * @param e.newModelSelection {Array} contains [Model|Object] with all modelList's Models (Objects in case of LazyModelList)","         *  that are selected:<br />","         * -in case of repeated Models (see attribute/property 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel","         * <b>is not part</b> of the original (Lazy)ModelList.","         * @param e.originalModelSelection {Array} contains [Model|Object] with all modelList's unique original Models","         * (Objects in case of LazyModelList) that are selected. These Models/Objects also exists in the original (Lazy)ModelList.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._handlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ITSAModellistViewExtention = ITSAModellistViewExtention;","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-base\",","        \"node-style\",","        \"node-event-delegate\",","        \"base-build\",","        \"base-base\",","        \"widget-base\",","        \"oop\",","        \"yui-later\",","        \"dom-screen\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\",","        \"template-base\",","        \"template-micro\",","        \"event-tap\",","        \"gallery-itsawidgetrenderpromise\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].lines = {"1":0,"3":0,"30":0,"72":0,"81":0,"83":0,"97":0,"118":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"132":0,"149":0,"163":0,"166":0,"180":0,"185":0,"187":0,"195":0,"197":0,"208":0,"211":0,"212":0,"214":0,"215":0,"216":0,"217":0,"223":0,"228":0,"230":0,"234":0,"236":0,"250":0,"268":0,"285":0,"299":0,"317":0,"335":0,"352":0,"373":0,"393":0,"411":0,"427":0,"444":0,"463":0,"480":0,"498":0,"514":0,"542":0,"570":0,"598":0,"625":0,"648":0,"677":0,"706":0,"735":0,"755":0,"770":0,"775":0,"789":0,"796":0,"814":0,"824":0,"921":0,"938":0,"947":0,"980":0,"989":0,"998":0,"1007":0,"1016":0,"1025":0,"1034":0,"1043":0,"1052":0,"1061":0,"1070":0,"1079":0,"1088":0,"1097":0,"1106":0,"1115":0,"1148":0,"1158":0,"1176":0,"1178":0,"1179":0,"1183":0,"1184":0,"1185":0,"1187":0,"1191":0,"1192":0,"1212":0,"1214":0,"1215":0,"1216":0,"1240":0,"1264":0,"1296":0,"1299":0,"1300":0,"1303":0,"1304":0,"1309":0,"1311":0,"1337":0,"1342":0,"1343":0,"1345":0,"1346":0,"1347":0,"1350":0,"1351":0,"1354":0,"1357":0,"1358":0,"1362":0,"1363":0,"1365":0,"1366":0,"1367":0,"1370":0,"1371":0,"1385":0,"1388":0,"1389":0,"1390":0,"1392":0,"1393":0,"1396":0,"1401":0,"1403":0,"1404":0,"1417":0,"1421":0,"1422":0,"1424":0,"1428":0,"1429":0,"1430":0,"1431":0,"1432":0,"1435":0,"1436":0,"1437":0,"1438":0,"1439":0,"1442":0,"1443":0,"1444":0,"1445":0,"1446":0,"1447":0,"1462":0,"1465":0,"1466":0,"1469":0,"1470":0,"1474":0,"1475":0,"1476":0,"1481":0,"1496":0,"1508":0,"1522":0,"1526":0,"1541":0,"1562":0,"1565":0,"1566":0,"1567":0,"1568":0,"1569":0,"1570":0,"1571":0,"1572":0,"1576":0,"1593":0,"1607":0,"1610":0,"1624":0,"1634":0,"1637":0,"1638":0,"1639":0,"1640":0,"1642":0,"1643":0,"1645":0,"1646":0,"1648":0,"1649":0,"1651":0,"1652":0,"1654":0,"1655":0,"1657":0,"1658":0,"1660":0,"1661":0,"1663":0,"1664":0,"1666":0,"1667":0,"1669":0,"1670":0,"1672":0,"1673":0,"1689":0,"1696":0,"1697":0,"1698":0,"1699":0,"1700":0,"1701":0,"1702":0,"1703":0,"1705":0,"1706":0,"1707":0,"1708":0,"1710":0,"1711":0,"1725":0,"1726":0,"1727":0,"1728":0,"1758":0,"1767":0,"1768":0,"1769":0,"1770":0,"1773":0,"1775":0,"1776":0,"1777":0,"1778":0,"1779":0,"1780":0,"1783":0,"1786":0,"1788":0,"1799":0,"1806":0,"1807":0,"1808":0,"1811":0,"1813":0,"1815":0,"1816":0,"1817":0,"1819":0,"1820":0,"1821":0,"1822":0,"1825":0,"1826":0,"1834":0,"1838":0,"1842":0,"1843":0,"1847":0,"1851":0,"1852":0,"1853":0,"1859":0,"1860":0,"1866":0,"1867":0,"1871":0,"1873":0,"1874":0,"1880":0,"1884":0,"1885":0,"1886":0,"1893":0,"1898":0,"1899":0,"1900":0,"1904":0,"1909":0,"1915":0,"1918":0,"1919":0,"1925":0,"1929":0,"1930":0,"1936":0,"1937":0,"1940":0,"1945":0,"1949":0,"1950":0,"1955":0,"1959":0,"1960":0,"1967":0,"1968":0,"1969":0,"1982":0,"1984":0,"1985":0,"1987":0,"1988":0,"1989":0,"2002":0,"2004":0,"2005":0,"2006":0,"2010":0,"2024":0,"2026":0,"2027":0,"2028":0,"2032":0,"2046":0,"2048":0,"2049":0,"2050":0,"2054":0,"2068":0,"2070":0,"2071":0,"2072":0,"2076":0,"2090":0,"2092":0,"2093":0,"2094":0,"2095":0,"2099":0,"2113":0,"2115":0,"2116":0,"2117":0,"2118":0,"2122":0,"2136":0,"2138":0,"2139":0,"2140":0,"2141":0,"2145":0,"2159":0,"2161":0,"2162":0,"2163":0,"2164":0,"2168":0,"2182":0,"2184":0,"2185":0,"2186":0,"2187":0,"2191":0,"2205":0,"2207":0,"2208":0,"2209":0,"2210":0,"2214":0,"2228":0,"2230":0,"2231":0,"2232":0,"2233":0,"2237":0,"2251":0,"2253":0,"2254":0,"2255":0,"2256":0,"2260":0,"2275":0,"2278":0,"2279":0,"2281":0,"2283":0,"2288":0,"2289":0,"2291":0,"2292":0,"2293":0,"2306":0,"2308":0,"2321":0,"2324":0,"2325":0,"2326":0,"2332":0,"2334":0,"2338":0,"2339":0,"2340":0,"2354":0,"2357":0,"2366":0,"2369":0,"2371":0,"2376":0,"2378":0,"2382":0,"2383":0,"2384":0,"2398":0,"2401":0,"2410":0,"2413":0,"2415":0,"2420":0,"2421":0,"2422":0,"2436":0,"2438":0,"2439":0,"2442":0,"2444":0,"2446":0,"2447":0,"2448":0,"2449":0,"2453":0,"2454":0,"2463":0,"2464":0,"2465":0,"2467":0,"2468":0,"2471":0,"2472":0,"2473":0,"2474":0,"2475":0,"2479":0,"2480":0,"2489":0,"2490":0,"2491":0,"2511":0,"2513":0,"2514":0,"2517":0,"2519":0,"2520":0,"2526":0,"2527":0,"2528":0,"2542":0,"2544":0,"2545":0,"2548":0,"2550":0,"2551":0,"2552":0,"2553":0,"2559":0,"2560":0,"2561":0,"2575":0,"2579":0,"2588":0,"2591":0,"2593":0,"2598":0,"2599":0,"2600":0,"2602":0,"2611":0,"2614":0,"2616":0,"2621":0,"2622":0,"2623":0,"2637":0,"2640":0,"2649":0,"2652":0,"2654":0,"2659":0,"2660":0,"2661":0,"2663":0,"2672":0,"2675":0,"2677":0,"2682":0,"2683":0,"2684":0,"2697":0,"2711":0,"2712":0,"2714":0,"2715":0,"2716":0,"2717":0,"2719":0,"2721":0,"2722":0,"2723":0,"2724":0,"2725":0,"2726":0,"2727":0,"2728":0,"2729":0,"2730":0,"2733":0,"2736":0,"2737":0,"2740":0,"2744":0,"2746":0,"2748":0,"2763":0,"2782":0,"2783":0,"2784":0,"2786":0,"2787":0,"2788":0,"2789":0,"2790":0,"2791":0,"2793":0,"2794":0,"2795":0,"2796":0,"2800":0,"2801":0,"2807":0,"2808":0,"2809":0,"2810":0,"2814":0,"2815":0,"2819":0,"2820":0,"2821":0,"2822":0,"2826":0,"2827":0,"2830":0,"2831":0,"2832":0,"2833":0,"2837":0,"2838":0,"2841":0,"2842":0,"2843":0,"2844":0,"2848":0,"2849":0,"2852":0,"2853":0,"2854":0,"2855":0,"2859":0,"2860":0,"2863":0,"2864":0,"2865":0,"2866":0,"2870":0,"2871":0,"2874":0,"2875":0,"2876":0,"2877":0,"2881":0,"2882":0,"2885":0,"2886":0,"2887":0,"2888":0,"2892":0,"2893":0,"2896":0,"2910":0,"2934":0,"2937":0,"2938":0,"2939":0,"2940":0,"2942":0,"2945":0,"2946":0,"2947":0,"2950":0,"2952":0,"2957":0,"2961":0,"2964":0,"2965":0,"2967":0,"2990":0,"3008":0,"3009":0,"3010":0,"3011":0,"3012":0,"3013":0,"3014":0,"3015":0,"3016":0,"3017":0,"3018":0,"3019":0,"3022":0,"3026":0,"3027":0,"3030":0,"3032":0,"3033":0,"3034":0,"3041":0,"3042":0,"3043":0,"3044":0,"3045":0,"3046":0,"3047":0,"3048":0,"3049":0,"3050":0,"3052":0,"3053":0,"3057":0,"3058":0,"3060":0,"3061":0,"3063":0,"3064":0,"3065":0,"3066":0,"3067":0,"3068":0,"3070":0,"3071":0,"3075":0,"3080":0,"3084":0,"3085":0,"3086":0,"3087":0,"3088":0,"3091":0,"3093":0,"3094":0,"3095":0,"3097":0,"3098":0,"3099":0,"3100":0,"3101":0,"3102":0,"3103":0,"3106":0,"3107":0,"3109":0,"3110":0,"3111":0,"3114":0,"3117":0,"3118":0,"3119":0,"3123":0,"3124":0,"3127":0,"3128":0,"3129":0,"3131":0,"3132":0,"3133":0,"3135":0,"3136":0,"3137":0,"3139":0,"3142":0,"3144":0,"3145":0,"3146":0,"3148":0,"3151":0,"3152":0,"3153":0,"3154":0,"3155":0,"3161":0,"3162":0,"3164":0,"3165":0,"3168":0,"3170":0,"3171":0,"3173":0,"3174":0,"3177":0,"3180":0,"3182":0,"3184":0,"3189":0,"3190":0,"3191":0,"3192":0,"3193":0,"3197":0,"3198":0,"3206":0,"3221":0,"3236":0,"3244":0,"3245":0,"3246":0,"3247":0,"3248":0,"3250":0,"3251":0,"3252":0,"3254":0,"3255":0,"3256":0,"3257":0,"3259":0,"3262":0,"3263":0,"3264":0,"3265":0,"3267":0,"3268":0,"3269":0,"3271":0,"3272":0,"3273":0,"3274":0,"3276":0,"3279":0,"3280":0,"3281":0,"3282":0,"3284":0,"3285":0,"3286":0,"3288":0,"3289":0,"3290":0,"3291":0,"3294":0,"3295":0,"3296":0,"3298":0,"3299":0,"3300":0,"3301":0,"3302":0,"3303":0,"3306":0,"3307":0,"3308":0,"3323":0,"3333":0,"3334":0,"3335":0,"3336":0,"3337":0,"3338":0,"3341":0,"3343":0,"3345":0,"3346":0,"3348":0,"3349":0,"3350":0,"3351":0,"3354":0,"3357":0,"3358":0,"3359":0,"3361":0,"3362":0,"3365":0,"3367":0,"3370":0,"3371":0,"3372":0,"3385":0,"3388":0,"3389":0,"3390":0,"3417":0,"3424":0,"3425":0,"3427":0,"3428":0,"3429":0,"3430":0,"3432":0,"3434":0,"3435":0,"3436":0,"3437":0,"3444":0,"3467":0,"3473":0,"3474":0,"3476":0,"3479":0,"3480":0,"3481":0,"3482":0,"3484":0,"3486":0,"3487":0,"3490":0,"3494":0,"3509":0,"3527":0,"3528":0,"3529":0,"3547":0,"3550":0,"3557":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].functions = {"GETSTYLE:71":0,"ITSAModellistAttrExtention:81":0,"getModelAttr:96":0,"setModelAttr:117":0,"getModelToJSON:148":0,"isModifiedModel:162":0,"isNewModel:179":0,"ITSANodeCleanup:195":0,"(anonymous 2):213":0,"cleanup:207":0,"ITSAModellistViewExtention:234":0,"validator:250":0,"validator:268":0,"validator:285":0,"validator:299":0,"validator:317":0,"validator:334":0,"validator:351":0,"validator:372":0,"validator:392":0,"validator:411":0,"validator:427":0,"validator:444":0,"validator:463":0,"validator:480":0,"validator:498":0,"validator:514":0,"validator:542":0,"validator:570":0,"validator:598":0,"validator:625":0,"validator:648":0,"validator:677":0,"validator:706":0,"validator:735":0,"validator:755":0,"validator:770":0,"initializer:788":0,"(anonymous 4):1190":0,"(anonymous 3):1178":0,"promiseBeforeReady:1175":0,"setWithoutRerender:1211":0,"getNodeFromIndex:1234":0,"getNodeFromModel:1258":0,"(anonymous 5):1302":0,"modelIsSelected:1295":0,"(anonymous 6):1353":0,"selectModels:1331":0,"(anonymous 7):1395":0,"unselectModels:1384":0,"(anonymous 8):1423":0,"blurAll:1421":0,"clearSelectedModels:1416":0,"(anonymous 9):1472":0,"getSelectedModels:1461":0,"renderView:1495":0,"getModelListInUse:1507":0,"getModelFromNode:1521":0,"getModelAttr:1540":0,"setModelAttr:1561":0,"getModelToJSON:1592":0,"isModifiedModel:1606":0,"isNewModel:1623":0,"destructor:1633":0,"_render:1688":0,"_focusModelNode:1724":0,"_getMaxPaginatorGotoIndex:1752":0,"(anonymous 10):1812":0,"(anonymous 11):1837":0,"(anonymous 12):1840":0,"(anonymous 13):1850":0,"(anonymous 14):1883":0,"(anonymous 15):1896":0,"(anonymous 16):1903":0,"(anonymous 17):1912":0,"(anonymous 18):1917":0,"(anonymous 19):1928":0,"(anonymous 20):1948":0,"(anonymous 21):1958":0,"_extraBindUI:1798":0,"_setModelList:1981":0,"_setNoDups:2001":0,"_setLimitModels:2023":0,"_setViewFilter:2045":0,"_setDupComp:2067":0,"_setGrpH1:2089":0,"_setGrpH2:2112":0,"_setGrpH3:2135":0,"_setGH1Templ:2158":0,"_setGH2Templ:2181":0,"_setGH3Templ:2204":0,"_setModelTemplate:2227":0,"_setClassNameTempl:2250":0,"_setModelsSel:2274":0,"_setModelListStyled:2305":0,"(anonymous 22):2329":0,"_setSelectableEvents:2320":0,"(anonymous 23):2368":0,"(anonymous 24):2373":0,"_setClkEv:2353":0,"(anonymous 25):2412":0,"_setDblclkEv:2397":0,"(anonymous 27):2452":0,"(anonymous 26):2441":0,"(anonymous 29):2478":0,"(anonymous 28):2470":0,"_setMarkModelChange:2435":0,"(anonymous 30):2516":0,"_setIntoViewAdded:2510":0,"(anonymous 31):2547":0,"_setIntoViewChanged:2541":0,"(anonymous 32):2590":0,"(anonymous 33):2613":0,"_setMouseDnUpEv:2574":0,"(anonymous 34):2651":0,"(anonymous 35):2674":0,"_setHoverEv:2636":0,"_handleModelSelectionChange:2696":0,"isMicroTemplate:2782":0,"modelEngine:2795":0,"modelEngine:2800":0,"modelEngine:2809":0,"modelEngine:2814":0,"classNameEngine:2821":0,"classNameEngine:2826":0,"groupH1Engine:2832":0,"groupH1Engine:2837":0,"groupH2Engine:2843":0,"groupH2Engine:2848":0,"groupH3Engine:2854":0,"groupH3Engine:2859":0,"renderGH1Engine:2865":0,"renderGH1Engine:2870":0,"renderGH2Engine:2876":0,"renderGH2Engine:2881":0,"renderGH3Engine:2887":0,"renderGH3Engine:2892":0,"_getAllTemplateFuncs:2762":0,"(anonymous 36):2944":0,"dupAvailable:2939":0,"_tryRenderModel:2933":0,"_clearAbberantModelList:2960":0,"(anonymous 37):3134":0,"findNodeByClientId:3131":0,"(anonymous 38):3147":0,"_renderView:2989":0,"_repositionModel:3218":0,"(anonymous 39):3302":0,"_createModelNode:3235":0,"_addEmptyItem:3322":0,"_removeEmptyItem:3384":0,"findNode:3427":0,"_getNodeFromModelOrIndex:3411":0,"_selectModel:3461":0,"_fireSelectedModels:3508":0,"(anonymous 40):3549":0,"_clearEventhandlers:3546":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredLines = 829;
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredFunctions = 158;
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1);
YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3);
'use strict';

//
// TODO:
//
// 1. Expansion with promises
// 2. _repositionModel() needs smarter code. Remove first, locally update the view,
//    compare new position with lastemitem+1 and the highest of those 2 need to be inserted.
//    except when paginator is running: then we need to compare the newposition with firstitem-1
//    as well. Perhaps firstitem-1 needs to be inserted.
//

/**
 * Basic Extention that should not be used of its own.
 * ITSAViewModelList and ITSAScrollViewModelList are based upon this extention.
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

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 30);
var Lang = Y.Lang,
    YObject = Y.Object,
    YArray = Y.Array,
    YNode = Y.Node,
    YTemplateMicro = Y.Template.Micro,
    EVT_READY = 'widget-ready',
    VIEW_TEMPLATE_UL = '<ul role="presentation"></ul>',
    VIEW_MODEL_TEMPLATE_UL = '<li role="presentation"></li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE_UL = '<li>{content}</li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE = '<tr><td colspan="{cols}">{content}</td></tr>',
    TEMPLATE_TABLE = '<table role="presentation"></table>',
    VIEW_TEMPLATE_TBODY = '<tbody></tbody>',
    VIEW_MODEL_TEMPLATE_TABLE = '<tr role="presentation"></tr>',
    LOADING_TEMPLATE = '<div>{loading}</div>',
    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',
    MODEL_CLASS = 'itsa-model',
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
    FORM_STYLE_CLASS = 'yui3-form',
    LOADING_MESSAGE = 'Loading...',
    NO_DATA_MESSAGE = 'No data to display',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "GETSTYLE", 71);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 72);
return parseInt(node.getStyle(style), 10);
    };

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 81);
function ITSAModellistAttrExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 83);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 96);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 97);
return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 117);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 118);
var instance = this,
            modelIsLazy, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 121);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 122);
modelIsLazy = !model.get || (typeof model.get !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 123);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 124);
revivedModel = instance.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 125);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 126);
if (revivedModel) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 127);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 128);
instance.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 132);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 148);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 149);
return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    },

    /**
     * Returns whether Model is modified. Regardless whether it is a Model-instance, or an item of a LazyModelList
     * which might be an Object or a Model.
     *
     * @method isModifiedModel
     * @param {Y.Model} model Model or Object from the (Lazy)ModelList
     * @return {Boolean} Whether Model or Object is modified
     * @since 0.1
     *
    */
    isModifiedModel : function(model) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isModifiedModel", 162);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 163);
var modelIsLazy = !model.get || (typeof model.get !== 'function');

        // model._changed is self defines field for objects inseide LazyModelList
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 166);
return this.isNewModel(model) || (modelIsLazy ? model._changed : !YObject.isEmpty(model.changed));
    },

    /**
     * Returns whether Model is new. Regardless whether it is a Model-instance, or an item of a LazyModelList
     * which might be an Object or a Model.
     *
     * @method isNewModel
     * @param {Y.Model} model Model or Object from the (Lazy)ModelList
     * @return {Boolean} Whether Model or Object is new
     * @since 0.1
     *
    */
    isNewModel : function(model) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isNewModel", 179);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 180);
return !Lang.isValue(this.getModelAttr(model, 'id'));
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 185);
Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 187);
Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);

//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 195);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 197);
Y.mix(ITSANodeCleanup.prototype, {

    /**
     * Cleansup the node by calling destroy(true) on all its children, as well as destroying all widgets that lie
     * within the node by calling widget.destroy(true);
     *
     * @method cleanup
     * @since 0.1
     *
    */
    cleanup: function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "cleanup", 207);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 208);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 211);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 212);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 2)", 213);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 214);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 215);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 216);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 217);
widgetInstance.destroy(true);
                        }
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 223);
node.all('children').destroy(true);
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 228);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 230);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

// -- Now creating extention -----------------------------------

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 234);
function ITSAModellistViewExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 236);
ITSAModellistViewExtention.ATTRS = {

   /**
    * The (Lazy)ModelList that is 'attached' to the instance. If you attach an Array, then it will be rebuild into a LazyModelList.
    * CAUTION: when attaching an Array, be sure it is ordered in the right way, because you don't have a ModelList.comparator.
    * Without a right order, 'headers' can appear in an unexpected way.
    *
    * @attribute modelList
    * @type {ModelList|LazyModelList|Array}
    * @default null
    * @since 0.1
    */
    modelList: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 250);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 250);
return (v === null) || (v.getByClientId) || Lang.isArray(v);},
        setter: '_setModelList'
    },

   /**
    * Whether duplicate values (rendered by the attributefunction 'modelTemplate') are possible.
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 268);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 268);
return (typeof v === 'boolean');},
        setter: '_setNoDups'
    },

   /**
    * Defines the listType. Use 'ul' for unsorted list, or 'table' for table-format.
    * This attrbute can only be set once during innitialisation.
    * <b>Caution:</b> if you set this attribute to 'table', then all items are tr-elements and you need to render the
    * td-elements yourself within 'modelTemplate' and groupHeaders (with the right number of td's).
    *
    * @attribute listType
    * @type {String}
    * @default 'ul'
    * @since 0.1
    */
    listType: {
        value: 'ul',
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 285);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 285);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 299);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 299);
return (typeof v === 'number');},
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 317);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 317);
return (v === null) || (typeof v === 'function'); },
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 334);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 335);
return ((v===null) || (v==='') || (typeof v === 'boolean') || (v==='single') || (v==='multi'));
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 351);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 352);
return (typeof v === 'boolean');
        }
    },

   /**
    * Whether the Models is styled using the css of this module.
    * In fact, just the classname 'itsa-modellistview-styled' is added to the boundingBox
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 372);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 373);
return (typeof v === 'boolean');
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 392);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 393);
return ((typeof v === 'number') && (v>=0) && (v<11));
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 411);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 411);
return (typeof v === 'boolean');},
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 427);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 427);
return (typeof v === 'boolean');},
        setter: '_setDblclkEv'
    },

   /**
    * When set to a value > 0, the Models will be highlighted whenever they change (or new added).
    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.
    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-model-changed' fors ome seconds.
    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.
    *
    * @attribute highlightAfterModelChange
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    highlightAfterModelChange: {
        value: 0,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 444);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 444);
return (typeof v === 'number');},
        setter: '_setMarkModelChange'
    },

   /**
    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.<br />
    * 0 = no scroll into view<br />
    * 1 = active: scroll into view<br />
    * 2 = active: scroll into view with headerdefinition if the headers are just before the last item<br />
    * 3 = active: scroll into view, scroll to top<br />
    * 4 = active: scroll into view with headerdefinition if the headers are just before the last item, scroll to top<br />
    *
    * @attribute modelsIntoViewAfterAdd
    * @type {Int}
    * @default 0
    * @since 0.1
    */
    modelsIntoViewAfterAdd: {
        value: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 463);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 463);
return ((typeof v === 'number') && (v>=0) && (v<=4));},
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 480);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 480);
return ((typeof v === 'number') && (v>=0) && (v<=2));},
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 498);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 498);
return (typeof v === 'boolean'); },
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 514);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 514);
return (typeof v === 'boolean'); },
        setter: '_setHoverEv'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader1')
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 542);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 542);
return (v === null) || (typeof v === 'string'); },
        setter: '_setGrpH1'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader2')
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 570);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 570);
return (v === null) || (typeof v === 'string'); },
        setter: '_setGrpH2'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader3')
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 598);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 598);
return (v === null) || (typeof v === 'string'); },
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
     * @attribute modelTemplate
     * @type {String}
     * @default '{clientId}'
     * @since 0.1
     */
    modelTemplate: {
        value: '{clientId}', // default-modelTemplate, so that there always is content. Best to be overwritten.
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 625);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 625);
return (typeof v === 'string'); },
        setter: '_setModelTemplate'
    },

    /**
     * Template to render an additional className to the rendered element. In fact: every Model will be rendered inside a <li>-element.
     * The innercontent of the LI-element is determined by 'modelTemplate' while classNameTemplate can add additional classes to the li-element.
     * The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
     * where Y.Lang.sub is more lightweight.
     *
     * <b>Example with Y.Lang.sub:</b> '{gender}'
     * <b>Example with Y.Template.Micro:</b>
     * '<% if (data.age>18) {%>adult<% } %>'
     *
     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
     *
     * @attribute classNameTemplate
     * @type {String}
     * @default '{clientId}'
     * @since 0.1
     */
    classNameTemplate: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 648);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 648);
return (typeof v === 'string'); },
        setter: '_setClassNameTempl'
    },

    /**
     * Template for rendering of groupHeader1. If not set, groupHeader1Template will render the same as the attribute 'groupHeader1'.
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
     * @attribute groupHeader1Template
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader1Template: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 677);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 677);
return (v === null) || (typeof v === 'string'); },
        setter: '_setGH1Templ'
    },

    /**
     * Template for rendering of groupHeader2. If not set, groupHeader2Template will render the same as the attribute 'groupHeader2'.
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
     * @attribute groupHeader2Template
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader2Template: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 706);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 706);
return (v === null) || (typeof v === 'string'); },
        setter: '_setGH2Templ'
    },

    /**
     * Template for rendering of groupHeader3. If not set, groupHeader3Template will render the same as the attribute 'groupHeader3'.
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
     * @attribute groupHeader3Template
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader3Template: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 735);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 735);
return (v === null) || (typeof v === 'string'); },
        setter: '_setGH3Templ'
    },

    /**
     * Attribute that identifies duplicate Models.
     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.
     * (based on the value of 'modelTemplate').
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 755);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 755);
return (v === null) || (typeof v === 'function'); },
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 770);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 770);
return (typeof v === 'boolean'); }
    }

};

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 775);
Y.mix(ITSAModellistViewExtention.prototype, {

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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "initializer", 788);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 789);
var instance = this;

        //-------------------------------------------------------------------------------------
        //---- Private properties -------------------------------------------------------------
        //-------------------------------------------------------------------------------------


            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 796);
instance.publish(
                'modelListRender',
                {
//                    defaultFn: Y.rbind(instance._defPluginAddFn, instance),
                    emitFacade: true
                }
            );




        /**
         * Internal list that holds event-references
         * @property _handlers
         * @private
         * @default []
         * @type Array
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 814);
instance._handlers = [];

        /**
         * Internal reference to the original models, which is only used when DupModels are avaialble.
         * It makes it posible to return the original models on a modelClick-event.
         * @property _origModels
         * @private
         * @default []
         * @type Array
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 824);
instance._origModels = [];

        /**
         * Internal eventhandle, defined when the attribute 'selectedModels' is used.
         * @property _selModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'clickEvents' is used.
         * @property _clkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.
         * @property _dblclkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseentModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseUpModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseDnModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseleaveModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelChangeEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelAddEv
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.
         * @property _modelInViewChanged
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.
         * @property _modelInViewAdded
         * @private
         * @default null
         * @type Y.EventHandle
        */

        /**
         * Internal object with references to all selected Models.
         * @property _selectedModels
         * @private
         * @default {}
         * @type Object
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 921);
instance._selectedModels = {};

        /**
         * Internal reference to the viewNode
         * @property _viewNode
         * @private
         * @default null
         * @type Y.Node
        */

        /**
         * The id of _viewNode
         * @property _viewId
         * @private
         * @default Y.guid()
         * @type String
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 938);
instance._viewId = Y.guid();

        /**
         * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.
         * @property _currentViewPg
         * @private
         * @default 0
         * @type Int
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 947);
instance._currentViewPg = 0;

        /**
         * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.
         * @property _templFns
         * @private
         * @default null
         * @type Object
        */

        /**
         * Internal reference to the last Model that was clicked.
         * @property _lastClkModel
         * @private
         * @default null
         * @type Y.Model
        */

        /**
         * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.
         * @property _abModelList
         * @private
         * @default null
         * @type Y.ModelList | Y.LazyModelList
        */

        /**
         * Internal flag to tell whether the attribute 'viewFilter' is initiated.
         * @property _viewFilterInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 980);
instance._viewFilterInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1' is initiated.
         * @property _grpH1Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 989);
instance._grpH1Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2' is initiated.
         * @property _grpH2Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 998);
instance._grpH2Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3' is initiated.
         * @property _grpH3Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1007);
instance._grpH3Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1Template' is initiated.
         * @property _gH1TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1016);
instance._gH1TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2Template' is initiated.
         * @property _gH2TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1025);
instance._gH2TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3Template' is initiated.
         * @property _gH3TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1034);
instance._gH3TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'modelTemplate' is initiated.
         * @property _modelTemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1043);
instance._modelTemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'classNameTemplate' is initiated.
         * @property _renderClassInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1052);
instance._renderClassInit = false;

        /**
         * Internal flag to tell whether the attribute 'dupComparator' is initiated.
         * @property _dupCompInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1061);
instance._dupCompInit = false;

        /**
         * Internal flag to tell whether the attribute 'noDups' is initiated.
         * @property _noDupsInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1070);
instance._noDupsInit = false;

        /**
         * Internal flag to tell whether the attribute 'limitModels' is initiated.
         * @property _limModelsInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1079);
instance._limModelsInit = false;

        /**
         * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.
         * @property _rerendAttrChg
         * @private
         * @default true
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1088);
instance._rerendAttrChg = true;

        /**
         * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.
         * @property _itmsAvail
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1097);
instance._itmsAvail = false; // must initially be set true

        /**
         * Internal refrence to the index of the last rendered Model in the View.
         * @property _prevLastModelIndex
         * @private
         * @default -1
         * @type Int
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1106);
instance._prevLastModelIndex = -1;

        /**
         * Internal flag that tells is the used ModelList is a LazyModelList.
         * @property _listLazy
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1115);
instance._listLazy = false;

        /**
         * The content of the last rendered Header1
         * @property _prevH1
         * @private
         * @default null
         * @type String|null
        */

        /**
         * The content of the last rendered Header2
         * @property _prevH2
         * @private
         * @default null
         * @type String|null
        */

        /**
         * The content of the last rendered Header3
         * @property _prevH3
         * @private
         * @default null
         * @type String|null
        */

        /**
         * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.
         * @property _even
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1148);
instance._even = false;

        /**
         * Internal flag that tells wheter a Template.Micro is being used.
         * @property _microTemplateUsed
         * @private
         * @default null
         * @type Boolean
        */

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1158);
instance.renderPromise().then(
            Y.bind(instance._render, instance)
        );
    },

    /**
     * Promise that holds any stuff that should be done before the widget is defined as 'ready'.
     * <b>Notion</b>It is not the intention to make a dircet call an promiseBeforeReady --> use readyPromise () instead,
     * because that promise will be fulfilled when both this promise as well as renderPromise() are fulfilled.
     *
     * @method promiseBeforeReady
     * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
     *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.<br />
     *                                      The timeout-value can only be set at the first time the Promise is called.
     * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
     * @since 0.2
    */
    promiseBeforeReady : function(timeout) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "promiseBeforeReady", 1175);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1176);
var instance = this,
              takenTimeout = timeout || 20000;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1178);
return new Y.Promise(function (resolve, reject) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 3)", 1178);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1179);
var readyEvent = instance.once(
                EVT_READY,
                resolve
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1183);
if (instance._ready) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1184);
readyEvent.detach();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1185);
resolve();
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1187);
Y.later(
                takenTimeout,
                null,
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 4)", 1190);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1191);
readyEvent.detach();
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1192);
reject(new Error('Timeout: widget not ready within '+takenTimeout+' miliseconds'));
                }
            );
        });
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setWithoutRerender", 1211);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1212);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1214);
instance._rerendAttrChg = false;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1215);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1216);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromIndex", 1234);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1240);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromModel", 1258);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1264);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelIsSelected", 1295);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1296);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1299);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1300);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 5)", 1302);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1303);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1304);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1309);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1311);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "selectModels", 1331);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1337);
var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1342);
if (singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1343);
instance.clearSelectedModels(true, true);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1345);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1346);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1347);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1350);
if (isArray && !singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1351);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 6)", 1353);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1354);
instance._selectModel(model, true, maxExpansions);
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1357);
if (scrollIntoView && (models.length>0)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1358);
instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1362);
if (isArray) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1363);
models = models[0];
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1365);
instance._selectModel(models, true, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1366);
if (scrollIntoView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1367);
instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1370);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1371);
instance._fireSelectedModels();
        }
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method unselectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true
     * @since 0.1
    */
    unselectModels : function(models, silent, force) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "unselectModels", 1384);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1385);
var instance = this,
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1388);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1389);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1390);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1392);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1393);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 7)", 1395);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1396);
instance._selectModel(model, false, null, force);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1401);
instance._selectModel(models, false, null, force);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1403);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1404);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "clearSelectedModels", 1416);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1417);
var instance = this,
            contentBox = instance.get('contentBox'),
            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1421);
blurAll = function() {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "blurAll", 1421);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1422);
currentSelected.each(
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 8)", 1423);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1424);
node.blur();
                }
            );
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1428);
currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1429);
firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1430);
if (silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1431);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1432);
currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1435);
fireEvent = (currentSelected.size()>0);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1436);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1437);
currentSelected.removeClass(SVML_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1438);
if (fireEvent) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1439);
instance._fireSelectedModels();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1442);
instance._selectedModels = {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1443);
if (instance.get('modelsUnselectable') && firstSelected && !force) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1444);
clientId = firstSelected.getData('modelClientId');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1445);
modelList = instance.getModelListInUse();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1446);
model = modelList.getByClientId(clientId);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1447);
instance.selectModels(model, false, null, true);
        }
    },

    /**
     * Returns an Array with the Models or Objects that have the 'selected-status' in the ScrollView-instance set to true
     *
     * @method getSelectedModels
     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>
     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the
     * latter case, you have full control of the exact item that was selected.
     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.
     * @since 0.1
     */
    getSelectedModels : function(original) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getSelectedModels", 1461);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1462);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1465);
if (!original) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1466);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1469);
selected = [];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1470);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _origModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 9)", 1472);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1474);
var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1475);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1476);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1481);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderView", 1495);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1496);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelListInUse", 1507);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1508);
return this._abModelList || this.get('modelList');
    },

    /**
     * Gets the Model (or Object, in case of LazyModelList) from the specific Node.
     * The Node should be a Node that represent the listitems.
     *
     * @method getModelFromNode
     * @param {Y.Node} node
     * @return {Y.model|Object|null} The Model-instance, Object (in case of LazyModelList) or null in case of an invalid node
     * @since 0.1
     *
    */
    getModelFromNode : function(node) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelFromNode", 1521);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1522);
var instance = this,
            modelList = instance.get('modelList'),
            modelClientId = node.getData('modelClientId');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1526);
return modelList && modelList.getByClientId(modelClientId);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 1540);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1541);
return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 1561);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1562);
var instance = this,
            modelList, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1565);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1566);
if (instance._listLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1567);
modelList = instance.get('modelList');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1568);
revivedModel = modelList.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1569);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1570);
if (revivedModel) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1571);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1572);
modelList.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1576);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 1592);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1593);
return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    },

    /**
     * Returns whether Model is modified. Regardless whether it is a Model-instance, or an item of a LazyModelList
     * which might be an Object or a Model.
     *
     * @method isModifiedModel
     * @param {Y.Model} model Model or Object from the (Lazy)ModelList
     * @return {Boolean} Whether Model or Object is modified
     * @since 0.1
     *
    */
    isModifiedModel : function(model) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isModifiedModel", 1606);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1607);
var instance = this;

        // model._changed is self defines field for objects inseide LazyModelList
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1610);
return instance.isNewModel(model) || (instance._listLazy ? model._changed : !YObject.isEmpty(model.changed));
    },

    /**
     * Returns whether Model is new. Regardless whether it is a Model-instance, or an item of a LazyModelList
     * which might be an Object or a Model.
     *
     * @method isNewModel
     * @param {Y.Model} model Model or Object from the (Lazy)ModelList
     * @return {Boolean} Whether Model or Object is new
     * @since 0.1
     *
    */
    isNewModel : function(model) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isNewModel", 1623);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1624);
return !Lang.isValue(this.getModelAttr(model, 'id'));
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "destructor", 1633);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1634);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1637);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1638);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1639);
if (instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1640);
instance._selModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1642);
if (instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1643);
instance._clkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1645);
if (instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1646);
instance._dblclkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1648);
if (instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1649);
instance._mouseDnModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1651);
if (instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1652);
instance._mouseUpModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1654);
if (instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1655);
instance._mouseentModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1657);
if (instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1658);
instance._mouseleaveModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1660);
if (instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1661);
instance._markModelChangeEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1663);
if (instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1664);
instance._markModelAddEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1666);
if (instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1667);
instance._modelInViewChanged.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1669);
if (instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1670);
instance._modelInViewAdded.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1672);
instance._clearAbberantModelList();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1673);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_render", 1688);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1689);
var instance = this,
            modellist = instance.get('modelList'),
            listType = instance.get('listType'),
            boundingBox = instance.get('boundingBox'),
            contentBox = instance.get('contentBox'),
            viewNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1696);
contentBox = contentBox.one('.yui3-widget-bd') || contentBox;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1697);
contentBox.setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1698);
instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1699);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1700);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1701);
boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1702);
if (instance.get('showLoadMessage')) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1703);
boundingBox.addClass(SVML_SHOWLOADING_CLASS);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1705);
instance._templFns = instance._getAllTemplateFuncs();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1706);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1707);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1708);
instance._renderView(null, {incrementbuild: true, initbuild: true});
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1710);
instance._ready = true;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1711);
instance.fire(EVT_READY);
    },

    /**
     * Focusses the modelNode and adds the className 'itsa-model-focus'.
     * Previous focussed Node will be unmarked.
     *
     * @method _focusModelNode
     * @param {Y.Node} modelNode the ModelNode that should gain focus.
     * @private
     * @since 0.1
     *
    */
    _focusModelNode: function(modelNode) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_focusModelNode", 1724);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1725);
if (modelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1726);
this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1727);
modelNode.addClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1728);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getMaxPaginatorGotoIndex", 1752);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1758);
var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance.getModelListInUse(),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1767);
if (paginator && (modelList.size()>0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1768);
lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1769);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1770);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1773);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1775);
liElements = instance._viewNode.all('>li');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1776);
i = liElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1777);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1778);
lastNode = liElements.item(i);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1779);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1780);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1783);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1786);
if (size>=boundingSize) {i++;}
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1788);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_extraBindUI", 1798);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1799);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            contentBox = instance.get('contentBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._handlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1806);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1807);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1808);
boundingBox.addClass(MODELLIST_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1811);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 10)", 1812);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1813);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1815);
modellist = newmodellist;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1816);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1817);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1819);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1820);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1821);
boundingBox.addClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1822);
instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1825);
boundingBox.removeClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1826);
contentBox.setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1834);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 11)", 1837);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1838);
instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 12)", 1840);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1842);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1843);
return (!scrollingInAction);
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1847);
eventhandlers.push(
            instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 13)", 1850);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1851);
var model = e.target;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1852);
if (model instanceof Y.Model) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1853);
if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {
                            //========================================================
                            //
                            // LACK IN ModelList --> make resort after model:change
                            //
                            //=======================================================
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1859);
if (modellist && modellist.comparator) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1860);
modellist.sort();
                                //====================================================
                                //
                                // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                                // As soon as issue is resolved, remove modellist.free() command
                                //
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1866);
if (instance._listLazy) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1867);
modellist.free();
                                }
                                //======================================================
                            }
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1871);
instance._repositionModel(model);
                        }
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1873);
if (instance.modelIsSelected(model)) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1874);
instance._fireSelectedModels();
                        }
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1880);
eventhandlers.push(
            instance.after(
                '*:destroy',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 14)", 1883);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1884);
var model = e.target;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1885);
if ((model instanceof Y.Model) && instance.modelIsSelected(model)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1886);
instance._fireSelectedModels();
                    }
                }
            )
        );
        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll
        // we set it on contentBox instead of BoundingBox to interupt as soon as posible
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1893);
eventhandlers.push(
            contentBox.delegate(
                'click',
                function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 15)", 1896);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1898);
if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1899);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1900);
e.stopImmediatePropagation();
                    }
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 16)", 1903);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1904);
return this.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                }
            )
        );
        // also prevent default on mousedown, to prevent the native "drag link to desktop" behavior on certain browsers.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1909);
eventhandlers.push(
            boundingBox.delegate(
                'mousedown',
                function(e) {
                    // Prevent default anchor drag behavior, on browsers
                    // which let you drag anchors to the desktop
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 17)", 1912);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1915);
e.preventDefault();
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 18)", 1917);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1918);
var tagName = this.get('tagName');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1919);
return ((tagName==='A') || (tagName==='IMG'));
                }
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1925);
eventhandlers.push(
            instance.after(
                ['*:remove', '*:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 19)", 1928);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1929);
var modellist = e.target;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1930);
if (modellist instanceof Y.ModelList) {
                        //====================================================
                        //
                        // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                        // As soon as issue is resolved, remove modellist.free() command
                        //
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1936);
if (instance._listLazy) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1937);
modellist.free();
                        }
                        //======================================================
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1940);
instance._renderView();
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1945);
eventhandlers.push(
            instance.after(
                ['*:reset'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 20)", 1948);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1949);
if (e.target instanceof Y.ModelList) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1950);
instance._renderView(null, {keepstyles: false, initbuild: true});
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1955);
eventhandlers.push(
            instance.after(
                ['itsamodellistviewextention:destroy', 'itsamodellistviewextention:pluggedin'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 21)", 1958);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1959);
if (e.target instanceof Y.ModelList) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1960);
instance._renderView(null, {keepstyles: false, initbuild: true});
                    }
                }
            )
        );
        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,
        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1967);
instance.get('highlightAfterModelChange');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1968);
instance.get('modelsIntoViewAfterAdd');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1969);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelList", 1981);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1982);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1984);
if (Lang.isArray(val)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1985);
val = new Y.LazyModelList({items: val});
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1987);
instance._listLazy = val && val.revive;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1988);
instance._itmsAvail = val && (val.size()>0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1989);
return val;
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setNoDups", 2001);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2002);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2004);
if (instance._noDupsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2005);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2006);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2010);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setLimitModels", 2023);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2024);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2026);
if (instance._limModelsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2027);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2028);
instance._renderView({limitModels: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2032);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setViewFilter", 2045);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2046);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2048);
if (instance._viewFilterInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2049);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2050);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2054);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDupComp", 2067);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2068);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2070);
if (instance._dupCompInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2071);
if (instance._rerendAttrChg && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2072);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2076);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH1", 2089);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2090);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2092);
if (instance._grpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2093);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2094);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2095);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2099);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH2", 2112);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2113);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2115);
if (instance._grpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2116);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2117);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2118);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2122);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH3", 2135);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2136);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2138);
if (instance._grpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2139);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2140);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2141);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2145);
instance._grpH3Init = true;
        }
    },

    /**
     * Setter for attribute groupHeader1Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGH1Templ
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGH1Templ : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH1Templ", 2158);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2159);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2161);
if (instance._gH1TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2162);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2163);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2164);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2168);
instance._gH1TemplateInit = true;
        }
    },

    /**
     * Setter for attribute groupHeader2Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGH2Templ
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGH2Templ : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH2Templ", 2181);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2182);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2184);
if (instance._gH2TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2185);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2186);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2187);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2191);
instance._gH2TemplateInit = true;
        }
    },

    /**
     * Setter for attribute groupHeader3Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGH3Templ
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGH3Templ : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH3Templ", 2204);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2205);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2207);
if (instance._gH3TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2208);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2209);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2210);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2214);
instance._gH3TemplateInit = true;
        }
    },

    /**
     * Setter for attribute template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setModelTemplate
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setModelTemplate : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelTemplate", 2227);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2228);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2230);
if (instance._modelTemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2231);
instance._templFns = instance._getAllTemplateFuncs({template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2232);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2233);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2237);
instance._modelTemplateInit = true;
        }
    },

    /**
     * Setter for attribute classNameTemplate. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setClassNameTempl
     * @param {String} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setClassNameTempl : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClassNameTempl", 2250);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2251);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2253);
if (instance._renderClassInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2254);
instance._templFns = instance._getAllTemplateFuncs({classNameTemplate: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2255);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2256);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2260);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelsSel", 2274);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2275);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2278);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2279);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2281);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2283);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.
        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2288);
if (Y.UA.ie>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2289);
contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2291);
contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2292);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2293);
return val;
    },

    /**
     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-modellistview-styled' to the boundingBox.
     *
     * @method _setModelListStyled
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setModelListStyled : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelListStyled", 2305);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2306);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2308);
instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val).toggleClass(FORM_STYLE_CLASS, val);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setSelectableEvents", 2320);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2321);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2324);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2325);
if (val && !instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2326);
instance._selModelEv = contentBox.delegate(
                'tap',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function(node, e) {
                    // The 'tap'-event will make no firing on mousemovements, so we don't need to check lastScrolledAmt
//                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 22)", 2329);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2332);
var buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2334);
return (!buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2338);
if (!val && instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2339);
instance._selModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2340);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClkEv", 2353);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2354);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2357);
if (val && !instance._clkModelEv) {
            /**
             * Is fired when the user clicks on a Model. <b>You must</b> have set 'clickEvents' true in order to work.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2366);
instance._clkModelEv = contentBox.delegate(
                'tap',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 23)", 2368);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2369);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2371);
instance.fire('modelClick', {node: node, model: model});
                },
                function(node, e) {
                    // The 'tap'-event will make no firing on mousemovements, so we don't need to check lastScrolledAmt
//                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 24)", 2373);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2376);
var buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2378);
return (!buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2382);
if (!val && instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2383);
instance._clkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2384);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDblclkEv", 2397);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2398);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2401);
if (val && !instance._dblclkModelEv) {
            /**
             * Is fired when the user doubleclicks on a Model. <b>You must</b> have set 'dblclickEvents' true in order to work.
             *
             * @event modelDblclick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2410);
instance._dblclkModelEv = contentBox.delegate(
                'dblclick',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 25)", 2412);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2413);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2415);
instance.fire('modelDblclick', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2420);
if (!val && instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2421);
instance._dblclkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2422);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMarkModelChange", 2435);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2436);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2438);
if (val && (val>0) && !instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2439);
instance._markModelChangeEv = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 26)", 2441);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2442);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2444);
if ((model instanceof Y.Model) && (!e.fromEditModel || !instance.itsacmtemplate ||
                                                       !instance.itsacmtemplate.get('modelsEditable'))) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2446);
node = instance.getNodeFromModel(model);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2447);
if (node) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2448);
node.addClass(MODEL_CHANGED_CLASS);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2449);
Y.later(
                                val,
                                instance,
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 27)", 2452);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2453);
if (node) {
                                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2454);
node.removeClass(MODEL_CHANGED_CLASS);
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2463);
if (!val && instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2464);
instance._markModelChangeEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2465);
instance._markModelChangeEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2467);
if (val && (val>0) && !instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2468);
instance._markModelAddEv = instance.after(
                '*:add',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 28)", 2470);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2471);
if (e.target instanceof Y.ModelList) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2472);
var node = instance.getNodeFromIndex(e.index);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2473);
if (node) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2474);
node.addClass(MODEL_CHANGED_CLASS);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2475);
Y.later(
                                val,
                                instance,
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 29)", 2478);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2479);
if (node) {
                                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2480);
node.removeClass(MODEL_CHANGED_CLASS);
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2489);
if (!val && instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2490);
instance._markModelAddEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2491);
instance._markModelAddEv = null;
        }}
    },

    /**
     * Sets or removes scrollIntoView effects when a Model is added to the list.
     * Meaning val:
     * 0 = no scroll into view
     * 1 = active: scroll into view
     * 2 = active: scroll into view with headerdefinition if the headers are just before the last item
     * 3 = active: scroll into view, always on top of page
     * 4 = active: scroll into view with headerdefinition if the headers are just before the last item, always on top of page
     *
     * @method _setIntoViewAdded
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setIntoViewAdded : function(val) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewAdded", 2510);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2511);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2513);
if ((val >0) && !instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2514);
instance._modelInViewAdded = instance.after(
                '*:add',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 30)", 2516);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2517);
var itsacmtemplate = instance.itsacmtemplate,
                        focus = itsacmtemplate && (itsacmtemplate.get('newModelMode')===3);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2519);
if (e.target instanceof Y.ModelList) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2520);
instance.scrollIntoView(e.index,
                            {noFocus: !focus, forceTop: (val>2), editMode: focus, showHeaders: ((val===2) || (val===4))});
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2526);
if ((val===0) && instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2527);
instance._modelInViewAdded.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2528);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewChanged", 2541);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2542);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2544);
if ((val>0) && !instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2545);
instance._modelInViewChanged = instance.after(
                '*:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 31)", 2547);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2548);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2550);
if (model instanceof Y.Model) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2551);
node = instance.getNodeFromModel(model);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2552);
if (node) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2553);
instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2559);
if ((val===0) && instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2560);
instance._modelInViewChanged.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2561);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMouseDnUpEv", 2574);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2575);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2579);
if (val && !instance._mouseDnModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2588);
instance._mouseDnModelEv = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 32)", 2590);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2591);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2593);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2598);
if (!val && instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2599);
instance._mouseDnModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2600);
instance._mouseDnModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2602);
if (val && !instance._mouseUpModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2611);
instance._mouseUpModelEv = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 33)", 2613);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2614);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2616);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2621);
if (!val && instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2622);
instance._mouseUpModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2623);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setHoverEv", 2636);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2637);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2640);
if (val && !instance._mouseentModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2649);
instance._mouseentModelEv = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 34)", 2651);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2652);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2654);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2659);
if (!val && instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2660);
instance._mouseentModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2661);
instance._mouseentModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2663);
if (val && !instance._mouseleaveModelEv) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2672);
instance._mouseleaveModelEv = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 35)", 2674);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2675);
var node = e.currentTarget,
                        model = instance.getModelFromNode(node);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2677);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2682);
if (!val && instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2683);
instance._mouseleaveModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2684);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_handleModelSelectionChange", 2696);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2697);
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

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2711);
modelPrevSelected = model && instance.modelIsSelected(model);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2712);
if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2714);
if (singleSelectable || !ctrlClick) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2715);
if (instance.get('modelsUnselectable')) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2716);
currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2717);
firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2719);
instance.clearSelectedModels(true, true);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2721);
if (shiftClick && instance._lastClkModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2722);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2723);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2724);
prevModelIndex = modelList.indexOf(instance._lastClkModel);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2725);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2726);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2727);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2728);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2729);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2730);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2733);
instance.selectModels(multipleModels, false, null, true);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2736);
if (modelPrevSelected && !firstItemSelected) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2737);
instance.unselectModels(model, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2740);
instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2744);
instance._lastClkModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2746);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2748);
instance._fireSelectedModels();
    },

    /**
     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.
     *
     * @method _getAllTemplateFuncs
     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.
     * @private
     * @return {Object} All templates --> an object with the fields: <b>template, classNameTemplate, groupH1, groupH2, groupH3,
     * renderGH1, renderGH2, renderGH3, activeClass, activeGH1, activeGH2, activeGH3</b>. The last 4 keys are Booleans, the other are templates.
     * @since 0.1
     *
    */
    _getAllTemplateFuncs : function(setterAttrs) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getAllTemplateFuncs", 2762);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2763);
var instance = this,
            itsacmtemplate = instance.itsacmtemplate,
            template = (setterAttrs && setterAttrs.template) || instance.get('modelTemplate'),
            classNameTemplate = (setterAttrs && setterAttrs.template) || instance.get('classNameTemplate'),
            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),
            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),
            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),
            renderGH1 = (setterAttrs && setterAttrs.groupHeader1Template) || instance.get('groupHeader1Template') || groupH1,
            renderGH2 = (setterAttrs && setterAttrs.groupHeader2Template) || instance.get('groupHeader2Template') || groupH2,
            renderGH3 = (setterAttrs && setterAttrs.groupHeader3Template) || instance.get('groupHeader3Template') || groupH3,
            activeClass = classNameTemplate && (classNameTemplate.length>0),
            activeGH1 = groupH1 && (groupH1.length>0),
            activeGH2 = groupH2 && (groupH2.length>0),
            activeGH3 = groupH3 && (groupH3.length>0),
            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,
            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,
            compiledRenderGH3Engine, templateObject, isMicroTemplate, classNameEngine, microModelTemplate,
            microRenderGH1, microRenderGH2, microRenderGH3;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2782);
isMicroTemplate = function(checkTemplate) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isMicroTemplate", 2782);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2783);
var microTemplateRegExp = /<%(.+)%>/;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2784);
return microTemplateRegExp.test(checkTemplate);
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2786);
microModelTemplate = isMicroTemplate(template);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2787);
microRenderGH1 = activeGH1 && isMicroTemplate(renderGH1);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2788);
microRenderGH2 = activeGH2 && isMicroTemplate(renderGH2);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2789);
microRenderGH3 = activeGH3 && isMicroTemplate(renderGH3);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2790);
instance._microTemplateUsed = (microModelTemplate || microRenderGH1 || microRenderGH2 || microRenderGH3);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2791);
if (!itsacmtemplate) {
            // default behaviour without Y.Plugin.ITSAChangeModelTemplate
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2793);
if (microModelTemplate) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2794);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2795);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2795);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2796);
return compiledModelEngine(instance.getModelToJSON(model));
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2800);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2800);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2801);
return Lang.sub(template, instance.getModelToJSON(model));
                };
            }
        }
        else {
            // WITH Y.Plugin.ITSAChangeModelTemplate
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2807);
if (microModelTemplate) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2808);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2809);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2809);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2810);
return itsacmtemplate._getModelEngine(model, null, compiledModelEngine);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2814);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2814);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2815);
return itsacmtemplate._getModelEngine(model, template);
                };
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2819);
if (isMicroTemplate(classNameTemplate)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2820);
compiledModelEngine = YTemplateMicro.compile(classNameTemplate);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2821);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2821);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2822);
return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2826);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2826);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2827);
return Lang.sub(classNameTemplate, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2830);
if (activeGH1 && isMicroTemplate(groupH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2831);
compiledGroupH1Engine = YTemplateMicro.compile(groupH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2832);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2832);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2833);
return compiledGroupH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2837);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2837);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2838);
return Lang.sub(groupH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2841);
if (activeGH2 && isMicroTemplate(groupH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2842);
compiledGroupH2Engine = YTemplateMicro.compile(groupH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2843);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2843);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2844);
return compiledGroupH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2848);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2848);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2849);
return Lang.sub(groupH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2852);
if (activeGH3 && isMicroTemplate(groupH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2853);
compiledGroupH3Engine = YTemplateMicro.compile(groupH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2854);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2854);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2855);
return compiledGroupH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2859);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2859);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2860);
return Lang.sub(groupH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2863);
if (microRenderGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2864);
compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2865);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2865);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2866);
return compiledRenderGH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2870);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2870);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2871);
return Lang.sub(renderGH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2874);
if (microRenderGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2875);
compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2876);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2876);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2877);
return compiledRenderGH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2881);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2881);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2882);
return Lang.sub(renderGH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2885);
if (microRenderGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2886);
compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2887);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2887);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2888);
return compiledRenderGH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2892);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2892);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2893);
return Lang.sub(renderGH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2896);
templateObject = {
            template : modelEngine,
            classNameTemplate : classNameEngine,
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
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2910);
return templateObject;
    },

    /**
     * Will try to render 'trymodel' through the template defined with tha attribute 'modelTemplate'.
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
     * through the 'modelTemplate'-template
     * @since 0.1
     *
    */
    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_tryRenderModel", 2933);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2934);
var instance = this,
            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2937);
dubComparatorBinded = Y.rbind(dupComparator, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2938);
viewFilterBinded = Y.rbind(viewFilter, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2939);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "dupAvailable", 2939);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2940);
var dupFound = false,
                modelComp = dubComparatorBinded(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2942);
YArray.some(
                modelListItemsArray,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 36)", 2944);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2945);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2946);
dupFound = (dubComparatorBinded(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2947);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2950);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2952);
allowed = (!viewFilter || viewFilterBinded(trymodel)) &&
                      (!noDups ||
                       (!dupComparator && ((renderedmodel = allTemplateFuncs.template(trymodel))!==prevrenderedmodel)) ||
                       (dupComparator && !dupAvailable(trymodel))
                      );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2957);
return allowed && (renderedmodel || allTemplateFuncs.template(trymodel));
    },

    _clearAbberantModelList : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearAbberantModelList", 2960);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2961);
var instance = this;

        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2964);
if (instance._abModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2965);
instance._abModelList.destroy();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2967);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_renderView", 2989);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2990);
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
            widgetStdMod = contentBox.one('.yui3-widget-bd'),
            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,
            modelConfig, splitDays, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,
            i, j, model, modelListItems, batchSize, items, modelListItemsLength, table, noDataTemplate;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3008);
options = options || {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3009);
options.page = options.page || instance._currentViewPg;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3010);
pageSwitch = (instance._currentViewPg!==options.page);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3011);
options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3012);
options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3013);
options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3014);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3015);
instance._set('srcNode', contentBox);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3016);
contentBox = contentBox.one('.yui3-widget-bd') || contentBox;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3017);
if (instance.get('listType')==='ul') {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3018);
if (widgetStdMod) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3019);
instance.set('bodyContent', viewNode);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3022);
contentBox.setHTML(viewNode);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3026);
if (widgetStdMod) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3027);
instance.set('bodyContent', TEMPLATE_TABLE);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3030);
contentBox.setHTML(TEMPLATE_TABLE);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3032);
table = contentBox.one('table');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3033);
if (table) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3034);
table.append(viewNode);
                }
            }
        }
        // if it finds out there is a 'modelconfig'-attribute, or 'splitDays' is true, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3041);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3042);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3043);
if (options.rebuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3044);
i = (options.page*limitModels) -1; // will be incread to zero at start loop
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3045);
instance._prevH1 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3046);
instance._prevH2 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3047);
instance._prevH3 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3048);
instance._even = false;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3049);
if (infiniteView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3050);
instance._itmsAvail = true;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3052);
instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3053);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);
        }
        else {
            // start with the last index
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3057);
viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3058);
i = (instance._prevLastModelIndex || -1); // i will be increased at start loop
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3060);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3061);
newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3063);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3064);
modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3065);
splitDays = (setterAttrs && setterAttrs.splitDays) || instance.get('splitDays');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3066);
if (modelConfig && modelConfig.date && ((splitDays && modelConfig.enddate) || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3067);
instance._generateAbberantModelList(infiniteView, options.rebuild);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3068);
modelList = instance._abModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3070);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3071);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3075);
instance._clearAbberantModelList();
            }
        }
        else {
            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3080);
instance._clearAbberantModelList();
        }

        // in case of ITSAViewPaginator is active --> limitModels is always>0
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3084);
renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3085);
listIsLimited = (renderListLength<modelListItemsLength);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3086);
items = 0;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3087);
batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3088);
if (i>0) {
            // when available: remove the fillNode that makes lastItemOnTop
            // It will be rendered on the bottom again
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3091);
instance._removeEmptyItem();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3093);
while ((items<batchSize) && (++i<renderListLength)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3094);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3095);
renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,
                                                     dupComparator, allTemplateFuncs);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3097);
if (renderedModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3098);
if (items===0) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3099);
instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3100);
viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3101);
if (options.initbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3102);
instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3103);
viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3106);
items++;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3107);
modelNode = instance._createModelNode(model, renderedModel);
                // modelNode is an ARRAY of Y.Node !!!
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3109);
for (j=0; j<modelNode.length; j++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3110);
if (options.incrementbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3111);
viewNode.append(modelNode[j]);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3114);
newViewNode.append(modelNode[j]);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3117);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3118);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3119);
prevRenderedModel = renderedModel;
                }
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3123);
if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3124);
modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3127);
instance._prevLastModelIndex = i;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3128);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3129);
if (options.keepstyles) {
                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3131);
findNodeByClientId = function(modelClientId, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNodeByClientId", 3131);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3132);
var nodeFound;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3133);
nodelist.some(
                        function(node) {
                            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 37)", 3134);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3135);
var found = (node.getData('modelClientId') === modelClientId);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3136);
if (found) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3137);
nodeFound = node;
                            }
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3139);
return found;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3142);
return nodeFound;
                };
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3144);
previousViewModels = viewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3145);
newViewModels = newViewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3146);
previousViewModels.each(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 38)", 3147);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3148);
var hasSelected = node.hasClass(SVML_SELECTED_CLASS),
                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),
                            newnode;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3151);
if (hasSelected || hasFocus) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3152);
newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3153);
if (newnode) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3154);
newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3155);
newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);
                            }
                        }
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3161);
if (instance._microTemplateUsed) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3162);
viewNode.cleanup();
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3164);
if (widgetStdMod) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3165);
instance.set('bodyContent', newViewNode);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3168);
viewNode.replace(newViewNode);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3170);
viewNode = instance._viewNode = newViewNode;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3171);
newViewNode.set('id', instance._viewId);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3173);
if (viewNode.getHTML()==='') {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3174);
noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3177);
if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3180);
instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3182);
instance._currentViewPg = options.page;
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3184);
instance.syncUI();
//========================================================
        // now a correction of PaginatorPlugin-bug:
        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin
        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3189);
if (paginator) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3190);
currentPaginatorIndex = paginator.get('index');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3191);
maxPaginatorIndex = viewNode.get('children').size() - 1;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3192);
if (currentPaginatorIndex > maxPaginatorIndex) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3193);
paginator.set('index', maxPaginatorIndex);
            }
        }
//========================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3197);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3198);
infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3206);
instance.fire('modelListRender');
    },

    /**
     * Repositions the model on a new position in the view. This method is called after a model:change-event.
     *
     * @method _repositionModel
     * @param {Y.Model} [model] The model to reposition
     * @private
     * @since 0.1
    */
//    _repositionModel : function(model) {
    _repositionModel : function() {
        // NEEDS UPDATED CODE
        // _renderView() is far too costly.
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_repositionModel", 3218);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3221);
this._renderView();
    },


    /**
     * Creates the node to be rendered <b>with its headers</b> (if applyable). This means that an array is returned,
     * where the last item is the rendered-model.
     *
     * @method _repositionModel
     * @param {Y.Model} [model] The model to reposition
     * @private
     * @return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.
     * @since 0.1
    */
    _createModelNode : function(model, renderedModel) {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_createModelNode", 3235);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3236);
var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            nodes = [],
            itsacmtemplate = instance.itsacmtemplate,
            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,
            modelNode = YNode.create(rowtemplate),
            header1, header2, header3, headerNode, allTemplateFuncs;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3244);
allTemplateFuncs = instance._templFns;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3245);
if (allTemplateFuncs.activeGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3246);
header1 = allTemplateFuncs.groupH1(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3247);
if (header1!==instance._prevH1) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3248);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3250);
headerNode.addClass(GROUPHEADER1_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3251);
if (instance._prevH1) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3252);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3254);
headerNode.setHTML(allTemplateFuncs.renderGH1(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3255);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3256);
instance._prevH1 = header1;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3257);
instance._even = false;
                // force to make a header2 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3259);
instance._prevH2 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3262);
if (allTemplateFuncs.activeGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3263);
header2 = allTemplateFuncs.groupH2(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3264);
if (header2!==instance._prevH2) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3265);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3267);
headerNode.addClass(GROUPHEADER2_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3268);
if (instance._prevH2) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3269);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3271);
headerNode.setHTML(allTemplateFuncs.renderGH2(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3272);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3273);
instance._prevH2 = header2;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3274);
instance._even = false;
                // force to make a header3 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3276);
instance._prevH3 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3279);
if (allTemplateFuncs.activeGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3280);
header3 = allTemplateFuncs.groupH3(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3281);
if (header3!==instance._prevH3) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3282);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3284);
headerNode.addClass(GROUPHEADER3_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3285);
if (instance._prevH3) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3286);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3288);
headerNode.setHTML(allTemplateFuncs.renderGH3(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3289);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3290);
instance._prevH3 = header3;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3291);
instance._even = false;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3294);
modelNode.setData('modelClientId', modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3295);
if (allTemplateFuncs.activeClass) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3296);
modelNode.addClass(allTemplateFuncs.classNameTemplate(model));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3298);
modelNode.addClass(MODEL_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3299);
modelNode.addClass(modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3300);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3301);
if (itsacmtemplate && (itsacmtemplate._getMode(model)===3) && !modelNode.itsatabkeymanager) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3302);
Y.use('gallery-itsatabkeymanager', function(Y) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 39)", 3302);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3303);
modelNode.plug(Y.Plugin.ITSATabKeyManager);
            });
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3306);
modelNode.setHTML(renderedModel || allTemplateFuncs.template(model));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3307);
nodes.push(modelNode);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3308);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_addEmptyItem", 3322);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3323);
var instance = this,
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBox = instance.get('boundingBox'),
            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),
            viewNode = instance._viewNode,
            listTypeUL = (instance.get('listType')==='ul'),
            itemTemplate = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3333);
instance._removeEmptyItem();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3334);
if (!lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3335);
modelElements = viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3336);
modelElementsSize = modelElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3337);
if (modelElementsSize>0) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3338);
lastModelNode = modelElements.item(modelElementsSize-1);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3341);
if (!listTypeUL) {
            // table itemTemplate --> we must set colspan
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3343);
nrCells = lastModelNode.all('>td').size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3345);
itemTemplate = Lang.sub(itemTemplate, {cols: nrCells, content: ''});
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3346);
modelNode = YNode.create(itemTemplate),
        modelNode.addClass(EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3348);
viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3349);
if (lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3350);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3351);
elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3354);
elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3357);
lastModelNode = lastModelNode && lastModelNode.previous();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3358);
if (itemOnTopValue===2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3359);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3361);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3362);
elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3365);
elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3367);
lastModelNode = lastModelNode.previous();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3370);
modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3371);
if (elementsize>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3372);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_removeEmptyItem", 3384);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3385);
var instance = this,
            removeNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3388);
removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3389);
if (removeNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3390);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getNodeFromModelOrIndex", 3411);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3417);
var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3424);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3425);
modelClientId = instance.getModelAttr(model, 'clientId');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3427);
findNode = function(node, loopindex) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNode", 3427);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3428);
var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3429);
if (found) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3430);
nodeFound = node;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3432);
return found;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3434);
do {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3435);
nodeList = instance._viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3436);
nodeList.some(findNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3437);
i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        }while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3444);
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
     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true
     * @private
     * @since 0.1
    */
    _selectModel : function(model, selectstatus, maxExpansions, force) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_selectModel", 3461);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3467);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3473);
if (modelid && (!itemUnselectable || force)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3474);
if (instance.hasPlugin('itsainfiniteview')) {
                // make sure the node is rendered
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3476);
instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3479);
modelnode = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3480);
if (modelnode) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3481);
if (!selectstatus) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3482);
modelnode.blur();
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3484);
modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3486);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3487);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3490);
delete instance._selectedModels[modelid];
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3494);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_fireSelectedModels", 3508);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3509);
var instance = this,
            selectedModels, originalModels;

        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Models), the Model is only once in the resultarray.
         * Meaning: only original unique Models are returned. In case of LazyModelList, the event
         *
         * @event modelSelectionChange
         * @param e {EventFacade} Event Facade including:
         * @param e.newModelSelection {Array} contains [Model|Object] with all modelList's Models (Objects in case of LazyModelList)
         *  that are selected:<br />
         * -in case of repeated Models (see attribute/property 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel
         * <b>is not part</b> of the original (Lazy)ModelList.
         * @param e.originalModelSelection {Array} contains [Model|Object] with all modelList's unique original Models
         * (Objects in case of LazyModelList) that are selected. These Models/Objects also exists in the original (Lazy)ModelList.
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3527);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3528);
originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3529);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearEventhandlers", 3546);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3547);
YArray.each(
            this._handlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 40)", 3549);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3550);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3557);
Y.ITSAModellistViewExtention = ITSAModellistViewExtention;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-base",
        "node-style",
        "node-event-delegate",
        "base-build",
        "base-base",
        "widget-base",
        "oop",
        "yui-later",
        "dom-screen",
        "pluginhost-base",
        "event-mouseenter",
        "event-custom",
        "model",
        "model-list",
        "lazy-model-list",
        "template-base",
        "template-micro",
        "event-tap",
        "gallery-itsawidgetrenderpromise"
    ],
    "skinnable": true
});
