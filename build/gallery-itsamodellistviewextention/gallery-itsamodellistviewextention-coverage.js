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
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].code=["YUI.add('gallery-itsamodellistviewextention', function (Y, NAME) {","","'use strict';","","//","// TODO:","//","// 1. Expansion with promises","// 2. _repositionModel() needs smarter code. Remove first, locally update the view,","//    compare new position with lastemitem+1 and the highest of those 2 need to be inserted.","//    except when paginator is running: then we need to compare the newposition with firstitem-1","//    as well. Perhaps firstitem-1 needs to be inserted.","//","","/**"," * Basic Extention that should not be used of its own."," * ITSAViewModelList and ITSAScrollViewModelList are based upon this extention."," *"," *"," * @module gallery-itsamodellistviewextention"," * @class ITSAModellistViewExtention"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    YTemplateMicro = Y.Template.Micro,","    VIEW_TEMPLATE_UL = '<ul role=\"pxresentation\"></ul>',","    VIEW_MODEL_TEMPLATE_UL = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_UL = '<li>{content}</li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE = '<tr><td colspan=\"{cols}\">{content}</td></tr>',","    TEMPLATE_TABLE = '<table role=\"presentation\"></table>',","    VIEW_TEMPLATE_TBODY = '<tbody></tbody>',","    VIEW_MODEL_TEMPLATE_TABLE = '<tr role=\"presentation\"></tr>',","    LOADING_TEMPLATE = '<div>{loading}</div>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-model',","    MODEL_CHANGED_CLASS = MODEL_CLASS + '-changed',","    MODELLIST_CLASS = 'itsa-modellistview',","    SVML_LASTMODEL_CLASS = MODELLIST_CLASS + '-lastitem',","    SVML_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-noinitialitems',","    SVML_VIEW_NOINITIALITEMS_CLASS = MODELLIST_CLASS + '-view-noinitialitems',","    SVML_NOITEMS_CLASS = MODELLIST_CLASS + '-noitems',","    SVML_VIEW_NOITEMS_CLASS = MODELLIST_CLASS + '-view-noitems',","    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = MODELLIST_CLASS + '-styled',","    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = MODELLIST_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = MODELLIST_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = MODELLIST_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = MODELLIST_CLASS + '-sequelgroupheader',","    SVML_UNSELECTABLE = MODELLIST_CLASS + '-unselectable',","    SVML_SHOWLOADING_CLASS = MODELLIST_CLASS + '-showloading',","    FORM_STYLE_CLASS = 'yui3-form',","    LOADING_MESSAGE = 'Loading...',","    NO_DATA_MESSAGE = 'No data to display',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","//===============================================================================================","// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes","// We mix it to both Y.LazyModelList as well as Y.ModelList","// this way we can always call these methods regardsless of a ModelList or LazyModelList as used","//===============================================================================================","","function ITSAModellistAttrExtention() {}","","Y.mix(ITSAModellistAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (typeof model.get !== 'function');","            if (modelIsLazy) {","                revivedModel = instance.revive(model);","                model[name] = value;","                if (revivedModel) {","                    revivedModel.set(name, value, options);","                    instance.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;","    }","","}, true);","","Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;","","Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    /**","     * Cleansup the node by calling destroy(true) on all its children, as well as destroying all widgets that lie","     * within the node by calling widget.destroy(true);","     *","     * @method cleanup","     * @since 0.1","     *","    */","    cleanup: function() {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(true);","                        }","                    }","                }","            );","        }","        node.all('children').destroy(true);","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","// -- Now creating extention -----------------------------------","","function ITSAModellistViewExtention() {}","","ITSAModellistViewExtention.ATTRS = {","","   /**","    * The (Lazy)ModelList that is 'attached' to the instance. If you attach an Array, then it will be rebuild into a LazyModelList.","    * CAUTION: when attaching an Array, be sure it is ordered in the right way, because you don't have a ModelList.comparator.","    * Without a right order, 'headers' can appear in an unexpected way.","    *","    * @attribute modelList","    * @type {ModelList|LazyModelList|Array}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v === null) || (v.getByClientId) || Lang.isArray(v);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'modelTemplate') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return (typeof v === 'boolean');},","        setter: '_setNoDups'","    },","","   /**","    * Defines the listType. Use 'ul' for unsorted list, or 'table' for table-format.","    * This attrbute can only be set once during innitialisation.","    * <b>Caution:</b> if you set this attribute to 'table', then all items are tr-elements and you need to render the","    * td-elements yourself within 'modelTemplate' and groupHeaders (with the right number of td's).","    *","    * @attribute listType","    * @type {String}","    * @default 'ul'","    * @since 0.1","    */","    listType: {","        value: 'ul',","        validator: function(v){ return (v==='ul') || (v==='table');},","        writeOnce: 'initOnly'","    },","","   /**","    * Limits the number of rendered Models. The value of 0 means: no limit.","    *","    * @attribute limitModels","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    limitModels: {","        value: 0,","        validator: function(v){ return (typeof v === 'number');},","        setter: '_setLimitModels'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'function'); },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi', 'null' or '' equals false.","    *","    * @default false","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: null,","        lazyAdd: false,","        validator:  function(v) {","            return ((v===null) || (v==='') || (typeof v === 'boolean') || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSel'","    },","","   /**","    * If set, then there ALWAYS REMAINS 1 Model selected.","    * <i>Only accounts when 'modelsSelectable' is active.","    *","    * @default true","    * @attribute modelsUnselectable","    * @type {Boolean}","    * @since 0.1","    */","    modelsUnselectable: {","        value: false,","        validator:  function(v) {","            return (typeof v === 'boolean');","        }","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-modellistview-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default true","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: true,","        lazyAdd: false,","        validator:  function(v) {","            return (typeof v === 'boolean');","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return ((typeof v === 'number') && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return (typeof v === 'boolean');},","        setter: '_setClkEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-dblclick.","    * When set to true, the events 'modelDblclicked' is fired when double-clicking on the Models.","    *","    * @attribute dblclickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    dblclickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return (typeof v === 'boolean');},","        setter: '_setDblclkEv'","    },","","   /**","    * When set to a value > 0, the Models will be m highlighted whenever they change (or new added).","    * The attribute-value represents the <b>number of miliseconds</b> that the Model-node should be highlighted.","    * Disable highlighting by set to 0. Hghlighting is done by adding the  class 'itsa-model-changed' fors ome seconds.","    * You should define a css-rule for this className, or you should set the attribute 'modelListStyled' to true to make things visible.","    *","    * @attribute highlightAfterModelChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    highlightAfterModelChange: {","        value: 0,","        validator: function(v) {return (typeof v === 'number');},","        setter: '_setMarkModelChange'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after they are added to the list.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterAdd","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterAdd: {","        value: false,","        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=2));},","        setter: '_setIntoViewAdded'","    },","","   /**","    * Use this attribute you want the models to be scrolled into the viewport after a ModelChange.","    * 0 = no scroll into view","    * 1 = active: scroll into view","    * 2 = active: scroll into view <b>with headerdefinition</b> if the headers are just before the last item","    *","    * @attribute modelsIntoViewAfterChange","    * @type {Int}","    * @default 0","    * @since 0.1","    */","    modelsIntoViewAfterChange: {","        value: false,","        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=2));},","        setter: '_setIntoViewChanged'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v){ return (typeof v === 'boolean'); },","        setter: '_setMouseDnUpEv'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v){ return (typeof v === 'boolean'); },","        setter: '_setHoverEv'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader2')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-modellistview-groupheader3')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGrpH3'","    },","","    /**","     * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's).","     * Example: '<td><%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute modelTemplate","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    modelTemplate: {","        value: '{clientId}', // default-modelTemplate, so that there always is content. Best to be overwritten.","        validator: function(v){ return (typeof v === 'string'); },","        setter: '_setModelTemplate'","    },","","    /**","     * Template to render an additional className to the rendered element. In fact: every Model will be rendered inside a <li>-element.","     * The innercontent of the LI-element is determined by 'modelTemplate' while classNameTemplate can add additional classes to the li-element.","     * The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","     * where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{gender}'","     * <b>Example with Y.Template.Micro:</b>","     * '<% if (data.age>18) {%>adult<% } %>'","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute classNameTemplate","     * @type {String}","     * @default '{clientId}'","     * @since 0.1","     */","    classNameTemplate: {","        value: null,","        validator: function(v){ return (typeof v === 'string'); },","        setter: '_setClassNameTempl'","    },","","    /**","     * Template for rendering of groupHeader1. If not set, groupHeader1Template will render the same as the attribute 'groupHeader1'.","     * If you want the rendered content other than groupHeader1 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader1').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader1Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH1Templ'","    },","","    /**","     * Template for rendering of groupHeader2. If not set, groupHeader2Template will render the same as the attribute 'groupHeader2'.","     * If you want the rendered content other than groupHeader2 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader2').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader2Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH2Templ'","    },","","    /**","     * Template for rendering of groupHeader3. If not set, groupHeader3Template will render the same as the attribute 'groupHeader3'.","     * If you want the rendered content other than groupHeader3 generates, you can override this method. This is handy when the rendered","     * heading (this attribute) defers from the 'header-determination' (attribute 'groupHeader3').","     * The attribute is a template that can be rendered and returns a String. The attribute MUST be a template that can be processed by either","     * <i>Y.Lang.sub or Y.Template.Micro</i>, where Y.Lang.sub is more lightweight.","     *","     * <b>Example with Y.Lang.sub:</b> '{stardate}'","     * <b>Example with Y.Template.Micro:</b>","     * '<%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %>'","     * <b>Example 2 with Y.Template.Micro:</b>","     * '<% if (data.startdate) {%>Start: <%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %><br /><% } else { %>no startdate<br /><% } %>'","     *","     * <b>Caution:</b> if you set attribute 'listType' to 'table', then all items are tr-elements and you need to render the","     * td-elements yourself (with the right number of td's). Example: '<td><%= Y.Date.format(data.startdate, {format:\"%d-%m-%Y\"}) %></td>'.","     *","     * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","     *","     * @attribute groupHeader3Template","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3Template: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'string'); },","        setter: '_setGH3Templ'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'modelTemplate').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return (v === null) || (typeof v === 'function'); },","        setter: '_setDupComp'","    },","","    /**","     * Attribute that makes the message 'Loading...' visible until the view is rendered for the first time.","     * Only showed if you didn't not use 'itsa-modellistview-noinitialitems' to hide the widget...","     *","     * @attribute showLoadMessage","     * @type {Boolean}","     * @default false","     * @since 0.1","     */","    showLoadMessage: {","        value: false,","        validator: function(v){ return (typeof v === 'boolean'); }","    }","","};","","Y.mix(ITSAModellistViewExtention.prototype, {","","    //-------------------------------------------------------------------------------------","    //---- Public methods -----------------------------------------------------------------","    //-------------------------------------------------------------------------------------","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        //-------------------------------------------------------------------------------------","        //---- Private properties -------------------------------------------------------------","        //-------------------------------------------------------------------------------------","","        /**","         * Internal list that holds event-references","         * @property _handlers","         * @private","         * @default []","         * @type Array","        */","        instance._handlers = [];","","        /**","         * Internal reference to the original models, which is only used when DupModels are avaialble.","         * It makes it posible to return the original models on a modelClick-event.","         * @property _origModels","         * @private","         * @default []","         * @type Array","        */","        instance._origModels = [];","","        /**","         * Internal eventhandle, defined when the attribute 'selectedModels' is used.","         * @property _selModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._selModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'clickEvents' is used.","         * @property _clkModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._clkModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.","         * @property _dblclkModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._dblclkModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","         * @property _mouseentModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._mouseentModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","         * @property _mouseUpModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._mouseUpModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.","         * @property _mouseDnModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._mouseDnModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.","         * @property _mouseleaveModelEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._mouseleaveModelEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","         * @property _markModelChangeEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._markModelChangeEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.","         * @property _markModelAddEv","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._markModelAddEv = null;","","        /**","         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.","         * @property _modelInViewChanged","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._modelInViewChanged = null;","","        /**","         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.","         * @property _modelInViewAdded","         * @private","         * @default null","         * @type Y.EventHandle","        */","        instance._modelInViewAdded = null;","","        /**","         * Internal object with references to all selected Models.","         * @property _selectedModels","         * @private","         * @default {}","         * @type Object","        */","        instance._selectedModels = {};","","        /**","         * Internal reference to the viewNode","         * @property _viewNode","         * @private","         * @default null","         * @type Y.Node","        */","        instance._viewNode = null;","","        /**","         * The id of _viewNode","         * @property _viewId","         * @private","         * @default Y.guid()","         * @type String","        */","        instance._viewId = Y.guid();","","        /**","         * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.","         * @property _currentViewPg","         * @private","         * @default 0","         * @type Int","        */","        instance._currentViewPg = 0;","","        /**","         * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.","         * @property _templFns","         * @private","         * @default null","         * @type Object","        */","        instance._templFns = null;","","        /**","         * Internal reference to the last Model that was clicked.","         * @property _lastClkModel","         * @private","         * @default null","         * @type Y.Model","        */","        instance._lastClkModel = null;","","        /**","         * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.","         * @property _abModelList","         * @private","         * @default null","         * @type Y.ModelList | Y.LazyModelList","        */","        instance._abModelList = null;","","        /**","         * Internal flag to tell whether the attribute 'viewFilter' is initiated.","         * @property _viewFilterInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._viewFilterInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader1' is initiated.","         * @property _grpH1Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH1Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader2' is initiated.","         * @property _grpH2Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH2Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader3' is initiated.","         * @property _grpH3Init","         * @private","         * @default false","         * @type Boolean","        */","        instance._grpH3Init = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader1Template' is initiated.","         * @property _gH1TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH1TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader2Template' is initiated.","         * @property _gH2TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH2TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'groupHeader3Template' is initiated.","         * @property _gH3TemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._gH3TemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'modelTemplate' is initiated.","         * @property _modelTemplateInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._modelTemplateInit = false;","","        /**","         * Internal flag to tell whether the attribute 'classNameTemplate' is initiated.","         * @property _renderClassInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._renderClassInit = false;","","        /**","         * Internal flag to tell whether the attribute 'dupComparator' is initiated.","         * @property _dupCompInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._dupCompInit = false;","","        /**","         * Internal flag to tell whether the attribute 'noDups' is initiated.","         * @property _noDupsInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._noDupsInit = false;","","        /**","         * Internal flag to tell whether the attribute 'limitModels' is initiated.","         * @property _limModelsInit","         * @private","         * @default false","         * @type Boolean","        */","        instance._limModelsInit = false;","","        /**","         * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.","         * @property _rerendAttrChg","         * @private","         * @default true","         * @type Boolean","        */","        instance._rerendAttrChg = true;","","        /**","         * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.","         * @property _itmsAvail","         * @private","         * @default false","         * @type Boolean","        */","        instance._itmsAvail = false; // must initially be set true","","        /**","         * Internal refrence to the index of the last rendered Model in the View.","         * @property _prevLastModelIndex","         * @private","         * @default -1","         * @type Int","        */","        instance._prevLastModelIndex = -1;","","        /**","         * Internal flag that tells is the used ModelList is a LazyModelList.","         * @property _listLazy","         * @private","         * @default false","         * @type Boolean","        */","        instance._listLazy = false;","","        /**","         * The content of the last rendered Header1","         * @property _prevH1","         * @private","         * @default null","         * @type String|null","        */","        instance._prevH1 = null;","","        /**","         * The content of the last rendered Header2","         * @property _prevH2","         * @private","         * @default null","         * @type String|null","        */","        instance._prevH2 = null,","","        /**","         * The content of the last rendered Header3","         * @property _prevH3","         * @private","         * @default null","         * @type String|null","        */","        instance._prevH3 = null;","","        /**","         * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.","         * @property _even","         * @private","         * @default false","         * @type Boolean","        */","        instance._even = false;","","        /**","         * Internal flag that tells wheter a Template.Micro is being used.","         * @property _microTemplateUsed","         * @private","         * @default null","         * @type Boolean","        */","        instance._microTemplateUsed = null;","","        instance._handlers.push(","            instance.after(","                'render',","                instance._render,","                instance","            )","        );","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerendAttrChg = false;","        instance.set(name, val, opts);","        instance._rerendAttrChg = true;","    },","","    /**","     * Retreives the Li-Node given the index from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromIndex","     * @param {Int} index Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromIndex : function(index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(null, index, maxExpansions);","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed. getNodeFromIndex is quicker than getNodeFromModel.","     *","     * @method getNodeFromModel","     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromModel : function(model, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(model, null, maxExpansions);","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method saveScrollTo","     * @since 0.1","     *","    */","    saveScrollTo : function() {","    },","","    /**","     * Definition that needs to be redefined in a subclass","     *","     * @method scrollIntoView","     * @since 0.1","    */","    scrollIntoView : function() {","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            isArray = Lang.isArray(models),","            singleSelectable = (instance.get('modelsSelectable')==='single'),","            prevSize, contentBox;","","        if (singleSelectable) {","            instance.clearSelectedModels(true, true);","        }","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","","        if (isArray && !singleSelectable) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true, maxExpansions);","                }","            );","            if (scrollIntoView && (models.length>0)) {","                instance.scrollIntoView(models[0], options, maxExpansions);","            }","        }","        else {","            if (isArray) {","                models = models[0];","            }","            instance._selectModel(models, true, maxExpansions);","            if (scrollIntoView) {","                instance.scrollIntoView(models, options, maxExpansions);","            }","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true","     * @since 0.1","    */","    unselectModels : function(models, silent, force) {","        var instance = this,","            prevSize, contentBox;","","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false, null, force);","                }","            );","        }","        else {","            instance._selectModel(models, false, null, force);","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.","     * @since 0.1","    */","    clearSelectedModels : function(silent, force) {","        var instance = this,","            contentBox = instance.get('contentBox'),","            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;","","        blurAll = function() {","            currentSelected.each(","                function(node) {","                    node.blur();","                }","            );","        };","        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);","        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);","        if (silent) {","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","        }","        else {","            fireEvent = (currentSelected.size()>0);","            blurAll();","            currentSelected.removeClass(SVML_SELECTED_CLASS);","            if (fireEvent) {","                instance._fireSelectedModels();","            }","        }","        instance._selectedModels = {};","        if (instance.get('modelsUnselectable') && firstSelected && !force) {","            clientId = firstSelected.getData('modelClientId');","            modelList = instance.getModelListInUse();","            model = modelList.getByClientId(clientId);","            instance.selectModels(model, false, null, true);","        }","    },","","    /**","     * Returns an Array with the Models or Objects that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _origModels, then it has an originalModel","                    var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Normal speaken, you only need to call this method yourself, when the ModelList.comparator changes.","     * The viewNode will be updated automaticly when attributes change, or when the (Lazy)-ModelList changes, or when","     * Models change. Be aware though, that the Model needs to fire a *:change event in roder to make the changes happen. This means,","     * that if you are using a LazyModelList, then be sure the object is revived into a Model-instance.","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Returns the modellist that is responsible for building the items. Normally speaken, this is the attribute 'modelList'","     * itself. However, if DupModels are active, the list is axpanded and _abModelList is returned.","     *","     * @method getModelListInUse","     * @since 0.1","     *","    */","    getModelListInUse : function() {","        return this._abModelList || this.get('modelList');","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (typeof model.get === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the class (Y.ModelList v.s. Y.LazyModelList).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, name, value, options) {","        var instance = this,","            modelIsLazy, modelList, revivedModel;","","        if (model) {","            modelIsLazy = !model.get || (typeof model.get !== 'function');","            if (modelIsLazy) {","                modelList = instance.get('modelList');","                revivedModel = modelList.revive(model);","                model[name] = value;","                if (revivedModel) {","                    revivedModel.set(name, value, options);","                    modelList.free(revivedModel);","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","     * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","     * -in case of an object from a LazyModelList- than you get the reference to the original object.","     *","     * @method getModelToJSON","     * @param {Y.Model} model Model or Object from the (Lazy)ModelList","     * @return {Object} Object or model.toJSON()","     * @since 0.1","     *","    */","    getModelToJSON : function(model) {","        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selModelEv) {","            instance._selModelEv.detach();","        }","        if (instance._clkModelEv) {","            instance._clkModelEv.detach();","        }","        if (instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","        }","        if (instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","        }","        if (instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","        }","        if (instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","        }","        if (instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","        }","        if (instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","        }","        if (instance._markModelAddEv) {","            instance._markModelAddEv.detach();","        }","        if (instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","        }","        if (instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","        }","        instance._clearAbberantModelList();","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            listType = instance.get('listType'),","            boundingBox = instance.get('boundingBox'),","            viewNode;","","        instance.get('contentBox').setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));","        instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        viewNode.set('id', instance._viewId);","        viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);","        boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);","        if (instance.get('showLoadMessage')) {","            boundingBox.addClass(SVML_SHOWLOADING_CLASS);","        }","        instance._templFns = instance._getAllTemplateFuncs();","        instance._extraBindUI();","        if (modellist) {","            instance._renderView(null, {incrementbuild: true, initbuild: true});","        }","    },","","    /**","     * Focusses the modelNode and adds the className 'itsa-model-focus'.","     * Previous focussed Node will be unmarked.","     *","     * @method _focusModelNode","     * @param {Y.Node} modelNode the ModelNode that should gain focus.","     * @private","     * @since 0.1","     *","    */","    _focusModelNode: function(modelNode) {","        if (modelNode) {","            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);","            modelNode.addClass(SVML_FOCUS_CLASS);","            modelNode.focus();","        }","    },","","    /**","     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","     * bumbs too much.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the last Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the param is needed.","     *","     * @method _getMaxPaginatorGotoIndex","     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","     * This only applies when the ITSAInifiniteView is plugged in.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Int} maximum PaginatorIndex that should be called.","     * @private","     * @since 0.1","     *","    */","    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            paginator = instance.hasPlugin('pages'),","            modelList = instance.getModelListInUse(),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","            i = 0,","            lastNode, size, liElements;","","        if (paginator && (modelList.size()>0)) {","            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);","            if (yAxis) {","                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","            }","            else {","                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","            }","            liElements = instance._viewNode.all('>li');","            i = liElements.size();","            while (lastNode && (--i>=0) && (size<boundingSize)) {","                lastNode = liElements.item(i);","                if (yAxis) {","                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","            }","            if (size>=boundingSize) {i++;}","        }","        return i;","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            contentBox = instance.get('contentBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._handlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(MODELLIST_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                modellist = newmodellist;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(MODELLIST_CLASS);","                    instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});","                }","                else {","                    boundingBox.removeClass(MODELLIST_CLASS);","                    contentBox.setHTML('');","                }","            })","        );","        // This was a though one!!","        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null","        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()","        // Thus, we need to reset _gesture when click without movement","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function() {","                    instance._gesture = null;","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction);","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'model:change',","                function(e) {","                    var model = e.target;","                    if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {","                        //========================================================","                        //","                        // LACK IN ModelList --> make resort after model:change","                        //","                        //=======================================================","                        if (modellist && modellist.comparator) {","                            modellist.sort();","                            //====================================================","                            //","                            // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                            // As soon as issue is resolved, remove modellist.free() command","                            //","                            if (instance._listLazy) {","                                modellist.free();","                            }","                            //======================================================","                        }","                        instance._repositionModel(model);","                    }","                    if (instance.modelIsSelected(model)) {","                        instance._fireSelectedModels();","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'model:destroy',","                function(e) {","                    var model = e.target;","                    if (instance.modelIsSelected(model)) {","                        instance._fireSelectedModels();","                    }","                }","            )","        );","        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll","        // we set it on contentBox instead of BoundingBox to interupt as soon as posible","        eventhandlers.push(","            contentBox.delegate(","                'click',","                function(e) {","                    // Prevent links from navigating as part of a scroll gesture","                    if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {","                        e.preventDefault();","                        e.stopImmediatePropagation();","                    }","                },","                function() {","                    return this.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                }","            )","        );","        // also prevent default on mousedown, to prevent the native \"drag link to desktop\" behavior on certain browsers.","        eventhandlers.push(","            boundingBox.delegate(","                'mousedown',","                function(e) {","                    // Prevent default anchor drag behavior, on browsers","                    // which let you drag anchors to the desktop","                    e.preventDefault();","                },","                function() {","                    var tagName = this.get('tagName');","                    return ((tagName==='A') || (tagName==='IMG'));","                }","            )","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after(","                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add'],","                Y.bind(instance._renderView, instance, null, null)","            )","        );","        eventhandlers.push(","            instance.after(","                ['modelList:reset', 'lazyModelList:reset'],","                Y.bind(instance._renderView, instance, null, {keepstyles: false})","            )","        );","        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,","        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute","        instance.get('highlightAfterModelChange');","        instance.get('modelsIntoViewAfterAdd');","        instance.get('modelsIntoViewAfterChange');","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        if (Lang.isArray(val)) {","            val = new Y.LazyModelList({items: val});","        }","        instance._listLazy = val && val.revive;","        instance._itmsAvail = val && (val.size()>0);","        return val;","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._noDupsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._noDupsInit = true;","        }","    },","","    /**","     * Setter for attribute limitModels. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLimitModels","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLimitModels : function(val) {","        var instance = this;","","        if (instance._limModelsInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({limitModels: val});","            }","        }","        else {","            instance._limModelsInit = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._viewFilterInit) {","            if (instance._rerendAttrChg) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._viewFilterInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComp","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComp : function(val) {","        var instance = this;","","        if (instance._dupCompInit) {","            if (instance._rerendAttrChg && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._dupCompInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH1","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH1 : function(val) {","        var instance = this;","","        if (instance._grpH1Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH1Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH2","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH2 : function(val) {","        var instance = this;","","        if (instance._grpH2Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH2Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGrpH3","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGrpH3 : function(val) {","        var instance = this;","","        if (instance._grpH3Init) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._grpH3Init = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH1Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH1Templ : function(val) {","        var instance = this;","","        if (instance._gH1TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader1Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH1TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH2Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH2Templ : function(val) {","        var instance = this;","","        if (instance._gH2TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader2Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH2TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3Template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGH3Templ","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGH3Templ : function(val) {","        var instance = this;","","        if (instance._gH3TemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({groupHeader3Template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._gH3TemplateInit = true;","        }","    },","","    /**","     * Setter for attribute template. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setModelTemplate","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelTemplate : function(val) {","        var instance = this;","","        if (instance._modelTemplateInit) {","            instance._templFns = instance._getAllTemplateFuncs({template: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._modelTemplateInit = true;","        }","    },","","    /**","     * Setter for attribute classNameTemplate. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setClassNameTempl","     * @param {String} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setClassNameTempl : function(val) {","        var instance = this;","","        if (instance._renderClassInit) {","            instance._templFns = instance._getAllTemplateFuncs({classNameTemplate: val});","            if (instance._rerendAttrChg) {","                instance._renderView();","            }","        }","        else {","            instance._renderClassInit = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selModelEv.","     *","     * @method _setModelsSel","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSel : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.","        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation","        if (Y.UA.ie>0) {","            contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');","        }","        contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-modellistview-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val).toggleClass(FORM_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selModelEv) {","            instance._selModelEv = contentBox.delegate(","                'click',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function(node, e) {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),","                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+","                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                    return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selModelEv) {","            instance._selModelEv.detach();","            instance._selModelEv = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clkModelEv = contentBox.delegate(","                'click',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function(node, e) {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),","                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+","                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                    return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clkModelEv) {","            instance._clkModelEv.detach();","            instance._clkModelEv = null;","        }","    },","","    /**","     * Sets or removes dblclick-events when the mouse double-clicks on a Model.","     *","     * @method _setDblclkEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setDblclkEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._dblclkModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelDblclick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._dblclkModelEv = contentBox.delegate(","                'dblclick',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelDblclick', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._dblclkModelEv) {","            instance._dblclkModelEv.detach();","            instance._dblclkModelEv = null;","        }","    },","","    /**","     * Sets or removes highlight-effects after a Model is changed.","     *","     * @method _setMarkModelChange","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMarkModelChange : function(val) {","        var instance = this;","","        if (val && (val>0) && !instance._markModelChangeEv) {","            instance._markModelChangeEv = instance.after(","                'model:change',","                function(e) {","                    if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            node = instance.getNodeFromModel(model);","                        if (node) {","                            node.addClass(MODEL_CHANGED_CLASS);","                            Y.later(","                                val,","                                instance,","                                function() {","                                    if (node) {","                                        node.removeClass(MODEL_CHANGED_CLASS);","                                    }","                                }","                            );","                        }","                    }","                }","            );","        }","        else if (!val && instance._markModelChangeEv) {","            instance._markModelChangeEv.detach();","            instance._markModelChangeEv = null;","        }","        if (val && (val>0) && !instance._markModelAddEv) {","            instance._markModelAddEv = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    var node = instance.getNodeFromIndex(e.index);","                    if (node) {","                        node.addClass(MODEL_CHANGED_CLASS);","                        Y.later(","                            val,","                            instance,","                            function() {","                                if (node) {","                                    node.removeClass(MODEL_CHANGED_CLASS);","                                }","                            }","                        );","                    }","                }","            );","        }","        else if (!val && instance._markModelAddEv) {","            instance._markModelAddEv.detach();","            instance._markModelAddEv = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is added to the list.","     *","     * @method _setIntoViewAdded","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewAdded : function(val) {","        var instance = this;","","        if ((val >0) && !instance._modelInViewAdded) {","            instance._modelInViewAdded = instance.after(","                ['modelList:add', 'lazyModelList:add'],","                function(e) {","                    instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});","                }","            );","        }","        else if ((val===0) && instance._modelInViewAdded) {","            instance._modelInViewAdded.detach();","            instance._modelInViewAdded = null;","        }","    },","","    /**","     * Sets or removes scrollIntoView effects when a Model is changed.","     *","     * @method _setIntoViewChanged","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setIntoViewChanged : function(val) {","        var instance = this;","","        if ((val>0) && !instance._modelInViewChanged) {","            instance._modelInViewChanged = instance.after(","                'model:change',","                function(e) {","                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        node = instance.getNodeFromModel(model);","                    if (node) {","                        instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});","                    }","                }","            );","        }","        else if ((val===0) && instance._modelInViewChanged) {","            instance._modelInViewChanged.detach();","            instance._modelInViewChanged = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDnUpEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDnUpEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDnModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDnModelEv = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDnModelEv) {","            instance._mouseDnModelEv.detach();","            instance._mouseDnModelEv = null;","        }","        if (val && !instance._mouseUpModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEv = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEv) {","            instance._mouseUpModelEv.detach();","            instance._mouseUpModelEv = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEv","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEv : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseentModelEv) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseentModelEv = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseentModelEv) {","            instance._mouseentModelEv.detach();","            instance._mouseentModelEv = null;","        }","        if (val && !instance._mouseleaveModelEv) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEv = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEv) {","            instance._mouseleaveModelEv.detach();","            instance._mouseleaveModelEv = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance.getModelListInUse(),","            modelClientId = modelNode.getData('modelClientId'),","            model = modelList && modelList.getByClientId(modelClientId),","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,","            currentSelected, firstItemSelected;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        if (model) {","            // At this stage, 'modelsSelectable' is either 'single' or 'multi'","            if (singleSelectable || !ctrlClick) {","                if (instance.get('modelsUnselectable')) {","                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);","                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);","                }","                instance.clearSelectedModels(true, true);","            }","            if (shiftClick && instance._lastClkModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClkModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels, false, null, true);","            }","            else {","                if (modelPrevSelected && !firstItemSelected) {","                    instance.unselectModels(model, true);","                }","                else {","                    instance.selectModels(model, false, null, true);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClkModel = modelPrevSelected ? null : model;","            }","            instance._focusModelNode(modelNode);","        }","        instance._fireSelectedModels();","    },","","    /**","     * Returns an object with all the Templates. Can be used to quickly render a Li-Node from a Model, without calling all getters every time.","     *","     * @method _getAllTemplateFuncs","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @private","     * @return {Object} All templates --> an object with the fields: <b>template, classNameTemplate, groupH1, groupH2, groupH3,","     * renderGH1, renderGH2, renderGH3, activeClass, activeGH1, activeGH2, activeGH3</b>. The last 4 keys are Booleans, the other are templates.","     * @since 0.1","     *","    */","    _getAllTemplateFuncs : function(setterAttrs) {","        var instance = this,","            itsacmtemplate = instance.itsacmtemplate,","            template = (setterAttrs && setterAttrs.template) || instance.get('modelTemplate'),","            classNameTemplate = (setterAttrs && setterAttrs.template) || instance.get('classNameTemplate'),","            groupH1 = (setterAttrs && setterAttrs.groupHeader1) || instance.get('groupHeader1'),","            groupH2 = (setterAttrs && setterAttrs.groupHeader2) || instance.get('groupHeader2'),","            groupH3 = (setterAttrs && setterAttrs.groupHeader3) || instance.get('groupHeader3'),","            renderGH1 = (setterAttrs && setterAttrs.groupHeader1Template) || instance.get('groupHeader1Template') || groupH1,","            renderGH2 = (setterAttrs && setterAttrs.groupHeader2Template) || instance.get('groupHeader2Template') || groupH2,","            renderGH3 = (setterAttrs && setterAttrs.groupHeader3Template) || instance.get('groupHeader3Template') || groupH3,","            activeClass = classNameTemplate && (classNameTemplate.length>0),","            activeGH1 = groupH1 && (groupH1.length>0),","            activeGH2 = groupH2 && (groupH2.length>0),","            activeGH3 = groupH3 && (groupH3.length>0),","            modelEngine, compiledModelEngine, groupH1Engine, compiledGroupH1Engine, groupH2Engine, compiledGroupH2Engine, groupH3Engine,","            compiledGroupH3Engine, renderGH1Engine, compiledRenderGH1Engine, renderGH2Engine, compiledRenderGH2Engine, renderGH3Engine,","            compiledRenderGH3Engine, templateObject, isMicroTemplate, classNameEngine, microModelTemplate,","            microRenderGH1, microRenderGH2, microRenderGH3;","","        isMicroTemplate = function(checkTemplate) {","            var microTemplateRegExp = /<%(.+)%>/;","            return microTemplateRegExp.test(checkTemplate);","        };","        microModelTemplate = isMicroTemplate(template);","        microRenderGH1 = activeGH1 && isMicroTemplate(renderGH1);","        microRenderGH2 = activeGH2 && isMicroTemplate(renderGH2);","        microRenderGH3 = activeGH3 && isMicroTemplate(renderGH3);","        instance._microTemplateUsed = (microModelTemplate || microRenderGH1 || microRenderGH2 || microRenderGH3);","        if (!itsacmtemplate) {","            // default behaviour without Y.Plugin.ITSAChangeModelTemplate","            if (microModelTemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                modelEngine = function(model) {","                    return compiledModelEngine(instance.getModelToJSON(model));","                };","            }","            else {","                modelEngine = function(model) {","                    return Lang.sub(template, instance.getModelToJSON(model));","                };","            }","        }","        else {","            // WITH Y.Plugin.ITSAChangeModelTemplate","            if (microModelTemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                modelEngine = function(model) {","                    return itsacmtemplate._getModelEngine(model, null, compiledModelEngine);","                };","            }","            else {","                modelEngine = function(model) {","                    return itsacmtemplate._getModelEngine(model, template);","                };","            }","        }","        if (isMicroTemplate(classNameTemplate)) {","            compiledModelEngine = YTemplateMicro.compile(classNameTemplate);","            classNameEngine = function(model) {","                return compiledModelEngine(instance.getModelToJSON(model));","            };","        }","        else {","            classNameEngine = function(model) {","                return Lang.sub(classNameTemplate, instance.getModelToJSON(model));","            };","        }","        if (activeGH1 && isMicroTemplate(groupH1)) {","            compiledGroupH1Engine = YTemplateMicro.compile(groupH1);","            groupH1Engine = function(model) {","                return compiledGroupH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH1Engine = function(model) {","                return Lang.sub(groupH1, instance.getModelToJSON(model));","            };","        }","        if (activeGH2 && isMicroTemplate(groupH2)) {","            compiledGroupH2Engine = YTemplateMicro.compile(groupH2);","            groupH2Engine = function(model) {","                return compiledGroupH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH2Engine = function(model) {","                return Lang.sub(groupH2, instance.getModelToJSON(model));","            };","        }","        if (activeGH3 && isMicroTemplate(groupH3)) {","            compiledGroupH3Engine = YTemplateMicro.compile(groupH3);","            groupH3Engine = function(model) {","                return compiledGroupH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            groupH3Engine = function(model) {","                return Lang.sub(groupH3, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH1) {","            compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);","            renderGH1Engine = function(model) {","                return compiledRenderGH1Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH1Engine = function(model) {","                return Lang.sub(renderGH1, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH2) {","            compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);","            renderGH2Engine = function(model) {","                return compiledRenderGH2Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH2Engine = function(model) {","                return Lang.sub(renderGH2, instance.getModelToJSON(model));","            };","        }","        if (microRenderGH3) {","            compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);","            renderGH3Engine = function(model) {","                return compiledRenderGH3Engine(instance.getModelToJSON(model));","            };","        }","        else {","            renderGH3Engine = function(model) {","                return Lang.sub(renderGH3, instance.getModelToJSON(model));","            };","        }","        templateObject = {","            template : modelEngine,","            classNameTemplate : classNameEngine,","            groupH1 : groupH1Engine,","            groupH2 : groupH2Engine,","            groupH3 : groupH3Engine,","            renderGH1 : renderGH1Engine,","            renderGH2 : renderGH2Engine,","            renderGH3 : renderGH3Engine,","            activeClass : activeClass,","            activeGH1 : activeGH1,","            activeGH2 : activeGH2,","            activeGH3 : activeGH3","        };","        return templateObject;","    },","","    /**","     * Will try to render 'trymodel' through the template defined with tha attribute 'modelTemplate'.","     * Only succeeds if it passes all tests declared by the other params. Should it fail the tests, then 'false' is returned.","     * If succeeded, the the HTML (String) will be returned.","     *","     * @method _tryRenderModel","     * @param {Y.Model} trymodel The Model (might be an object in case of LazyModelList) to be rendered","     * @param {String} [prevrenderedmodel] The previous Model that was rendered: should be in a 'rendered-state'.","     * Is used to check against when nodups are permitted and dupComparator is undefined.","     * @param {Y.Array} modelListItemsArray (Lazy)ModelList in array-form","     * @param {Function} viewFilter the viewFilter function (attribute), passed as a parameter for performancereasons","     * @param {Boolean} noDups the value of the attribute 'nodups', passed as a parameter for performancereasons","     * @param {Function} dupComparator the dupComparator function (attribute), passed as a parameter for performancereasons","     * @param {Object} allTemplateFuncs passed as a parameter for performancereasons","     * @private","     * @return {HTML|false} false if failed -possibly because it's a dup or falls out of the filter-, otherwise returns the rendered HTML: rendered","     * through the 'modelTemplate'-template","     * @since 0.1","     *","    */","    _tryRenderModel : function(trymodel, prevrenderedmodel, modelListItemsArray, viewFilter, noDups, dupComparator, allTemplateFuncs) {","        var instance = this,","            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;","","        dubComparatorBinded = Y.rbind(dupComparator, instance);","        viewFilterBinded = Y.rbind(viewFilter, instance);","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dubComparatorBinded(model);","            YArray.some(","                modelListItemsArray,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dubComparatorBinded(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        allowed = (!viewFilter || viewFilterBinded(trymodel)) &&","                      (!noDups ||","                       (!dupComparator && ((renderedmodel = allTemplateFuncs.template(trymodel))!==prevrenderedmodel)) ||","                       (dupComparator && !dupAvailable(trymodel))","                      );","        return allowed && (renderedmodel || allTemplateFuncs.template(trymodel));","    },","","    _clearAbberantModelList : function() {","        var instance = this;","","        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","        if (instance._abModelList) {","            instance._abModelList.destroy();","        }","        instance._abModelList = null;","    },","","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAttrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","","     * @param {Object} [options]","     *    @param {Boolean} [options.rebuild=true] set to 'false' if you don't want to rebuild but want to add items at the end of the list","     *    unless the infiniteView-plugin is available OR limitModels>0","     *    @param {Int} [options.page=0] lets ITSAViewPagination make rendering pages","     *    @param {Boolean} [options.incrementbuild=false] if 'true': appends every element one by one.","     *    If 'false' the whole <ul> will be replaced at once.","     *    @param {Boolean} [options.keepstyles=true] set to 'false' if you don't want to retain selected/focused info (only when you 'reset' the list)","     *    @param {Boolean} [options.initbuild=false] internal flag to notify the initial build","     * @private","     * @since 0.1","    */","    _renderView : function(setterAttrs, options) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            noDups = (setterAttrs && setterAttrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAttrs && setterAttrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAttrs && setterAttrs.viewFilter) || instance.get('viewFilter'),","            paginator = instance.pages,","            changedLimitModels = (setterAttrs && setterAttrs.limitModels),","            limitModels = changedLimitModels || instance.get('limitModels'),","            allTemplateFuncs = instance._templFns,","            lastItemOnTop = (setterAttrs && setterAttrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            infiniteView = instance.itsainfiniteview,","            currentPaginatorIndex, maxPaginatorIndex, findNodeByClientId, previousViewModels, newViewModels,","            modelConfig, modelNode, renderedModel, prevRenderedModel, renderListLength, listIsLimited, newViewNode, pageSwitch,","            i, j, model, modelListItems, batchSize, items, modelListItemsLength, table, noDataTemplate;","","        options = options || {};","        options.page = options.page || instance._currentViewPg;","        pageSwitch = (instance._currentViewPg!==options.page);","        options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);","        options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;","        options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;","        if (!contentBox.one('#'+instance._viewId)) {","            if (instance.get('listType')==='ul') {","                contentBox.setHTML(viewNode);","            }","            else {","                contentBox.setHTML(TEMPLATE_TABLE);","                table = contentBox.one('table');","                if (table) {","                    table.append(viewNode);","                }","            }","            instance._set('srcNode', contentBox);","        }","        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (options.rebuild) {","            i = (options.page*limitModels) -1; // will be incread to zero at start loop","            instance._prevH1 = null;","            instance._prevH2 = null;","            instance._prevH3 = null;","            instance._even = false;","            if (infiniteView) {","                instance._itmsAvail = true;","            }","            instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);","            viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);","        }","        else {","            // start with the last index","            viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);","            i = (instance._prevLastModelIndex || -1); // i will be increased at start loop","        }","        if (!options.incrementbuild) {","            newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');","            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, options.rebuild);","                modelList = instance._abModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._clearAbberantModelList();","            }","        }","        else {","            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._clearAbberantModelList();","        }","","        // in case of ITSAViewPaginator is active --> limitModels is always>0","        renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;","        listIsLimited = (renderListLength<modelListItemsLength);","        items = 0;","        batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;","        if (i>0) {","            // when available: remove the fillNode that makes lastItemOnTop","            // It will be rendered on the bottom again","            instance._removeEmptyItem();","        }","        while ((items<batchSize) && (++i<renderListLength)) {","            model = modelListItems[i];","            renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,","                                                     dupComparator, allTemplateFuncs);","            if (renderedModel) {","                if (items===0) {","                    instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);","                    viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);","                    if (options.initbuild) {","                        instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);","                        viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);","                    }","                }","                items++;","                modelNode = instance._createModelNode(model, renderedModel);","                // modelNode is an ARRAY of Y.Node !!!","                for (j=0; j<modelNode.length; j++) {","                    if (options.incrementbuild) {","                        viewNode.append(modelNode[j]);","                    }","                    else {","                        newViewNode.append(modelNode[j]);","                    }","                }","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","        }","        if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {","            modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i;","        if (!options.incrementbuild) {","            if (options.keepstyles) {","                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first","                findNodeByClientId = function(modelClientId, nodelist) {","                    var nodeFound;","                    nodelist.some(","                        function(node) {","                            var found = (node.getData('modelClientId') === modelClientId);","                            if (found) {","                                nodeFound = node;","                            }","                            return found;","                        }","                    );","                    return nodeFound;","                };","                previousViewModels = viewNode.all('.'+MODEL_CLASS);","                newViewModels = newViewNode.all('.'+MODEL_CLASS);","                previousViewModels.each(","                    function(node) {","                        var hasSelected = node.hasClass(SVML_SELECTED_CLASS),","                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),","                            newnode;","                        if (hasSelected || hasFocus) {","                            newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);","                            if (newnode) {","                                newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);","                                newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);","                            }","                        }","                    }","                );","            }","            if (instance._microTemplateUsed) {","                viewNode.cleanup();","            }","            viewNode.replace(newViewNode);","            instance._viewNode = newViewNode;","            newViewNode.set('id', instance._viewId);","        }","        if (viewNode.getHTML()==='') {","            noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));","        }","        if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!","            instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);","        }","        instance._currentViewPg = options.page;","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","//========================================================","        // now a correction of PaginatorPlugin-bug:","        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin","        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown","        if (paginator) {","            currentPaginatorIndex = paginator.get('index');","            maxPaginatorIndex = viewNode.get('children').size() - 1;","            if (currentPaginatorIndex > maxPaginatorIndex) {","                paginator.set('index', maxPaginatorIndex);","            }","        }","//========================================================","        if (infiniteView) {","            infiniteView.checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","    /**","     * Repositions the model on a new position in the view. This method is called after a model:change-event.","     *","     * @method _repositionModel","     * @param {Y.Model} [model] The model to reposition","     * @private","     * @since 0.1","    */","//    _repositionModel : function(model) {","    _repositionModel : function() {","        // NEEDS UPDATED CODE","        // _renderView() is far too costly.","        this._renderView();","    },","","","    /**","     * Creates the node to be rendered <b>with its headers</b> (if applyable). This means that an array is returned,","     * where the last item is the rendered-model.","     *","     * @method _repositionModel","     * @param {Y.Model} [model] The model to reposition","     * @private","     * @return {Array} array of Y.Node --> the last element is always the ModelNode, but it can be precede with headerNodes.","     * @since 0.1","    */","    _createModelNode : function(model, renderedModel) {","        var instance = this,","            modelClientId = instance.getModelAttr(model, 'clientId'),","            nodes = [],","            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,","            modelNode = YNode.create(rowtemplate),","            header1, header2, header3, headerNode, allTemplateFuncs;","","        allTemplateFuncs = instance._templFns;","        if (allTemplateFuncs.activeGH1) {","            header1 = allTemplateFuncs.groupH1(model);","            if (header1!==instance._prevH1) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER1_CLASS);","                if (instance._prevH1) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH1(model));","                nodes.push(headerNode);","                instance._prevH1 = header1;","                instance._even = false;","                // force to make a header2 insertion (when appropriate)","                instance._prevH2 = null;","            }","        }","        if (allTemplateFuncs.activeGH2) {","            header2 = allTemplateFuncs.groupH2(model);","            if (header2!==instance._prevH2) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER2_CLASS);","                if (instance._prevH2) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH2(model));","                nodes.push(headerNode);","                instance._prevH2 = header2;","                instance._even = false;","                // force to make a header3 insertion (when appropriate)","                instance._prevH3 = null;","            }","        }","        if (allTemplateFuncs.activeGH3) {","            header3 = allTemplateFuncs.groupH3(model);","            if (header3!==instance._prevH3) {","                headerNode = YNode.create(rowtemplate),","                headerNode.addClass(GROUPHEADER_CLASS);","                headerNode.addClass(GROUPHEADER3_CLASS);","                if (instance._prevH3) {","                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                }","                headerNode.setHTML(allTemplateFuncs.renderGH3(model));","                nodes.push(headerNode);","                instance._prevH3 = header3;","                instance._even = false;","            }","        }","        modelNode.setData('modelClientId', modelClientId);","        if (allTemplateFuncs.activeClass) {","            modelNode.addClass(allTemplateFuncs.classNameTemplate(model));","        }","        modelNode.addClass(MODEL_CLASS);","        modelNode.addClass(modelClientId);","        modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","        modelNode.setHTML(renderedModel || allTemplateFuncs.template(model));","        nodes.push(modelNode);","        return nodes;","    },","","    /**","     * Adds an empty item to make the lastItemOnTop (or left).","     * Does not remove the previous one -if available-. If nescesairy, you need to do this manually with _removeEmptyItem.","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _addEmptyItem","     * @param {Y.Node} [lastModelNode] Reference to the last node in the scrollview-instance.","     * @param {Int} [lastItemOnTop] internal pass through of lastItemOnTop","     * @private","     * @since 0.1","    */","    _addEmptyItem : function(lastModelNode, lastItemOnTop) {","        var instance = this,","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBox = instance.get('boundingBox'),","            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),","            viewNode = instance._viewNode,","            listTypeUL = (instance.get('listType')==='ul'),","            itemTemplate = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,","            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;","","        instance._removeEmptyItem();","        if (!lastModelNode) {","            modelElements = viewNode.all('.'+MODEL_CLASS);","            modelElementsSize = modelElements.size();","            if (modelElementsSize>0) {","                lastModelNode = modelElements.item(modelElementsSize-1);","            }","        }","        if (!listTypeUL) {","            // table itemTemplate --> we must set colspan","            nrCells = lastModelNode.all('>td').size();","        }","        itemTemplate = Lang.sub(itemTemplate, {cols: nrCells, content: ''});","        modelNode = YNode.create(itemTemplate),","        modelNode.addClass(EMPTY_ELEMENT_CLASS);","        viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');","        if (lastModelNode) {","            if (yAxis) {","                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');","            }","            else {","                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');","            }","        }","        lastModelNode = lastModelNode && lastModelNode.previous();","        if (itemOnTopValue===2) {","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                if (yAxis) {","                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));","                }","                else {","                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));","                }","                lastModelNode = lastModelNode.previous();","            }","        }","        modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');","        if (elementsize>0) {","            viewNode.append(modelNode);","        }","    },","","    /**","     * Removes the empty item that made the lastItemOnTop (or left).","     * If you should call this method yourself: DO NOT forget to call syncUI() afterwards!","     *","     * @method _removeEmptyItem","     * @private","     * @since 0.1","    */","    _removeEmptyItem : function() {","        var instance = this,","            removeNode;","","        removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);","        if (removeNode) {","            removeNode.remove(true);","        }","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList, or the index,","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method _getNodeFromModelOrIndex","     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [index] Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @private","     * @since 0.1","    */","    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),","            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),","            i = 0,","            nodeFound = false,","            nodeList, findNode, modelClientId;","","        if (model) {","            modelClientId = instance.getModelAttr(model, 'clientId');","        }","        findNode = function(node, loopindex) {","            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);","            if (found) {","                nodeFound = node;","            }","            return found;","        };","        do {","            nodeList = instance._viewNode.all('.'+MODEL_CLASS);","            nodeList.some(findNode);","            i++;","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());","        return nodeFound;","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @param {boolean} [force] set true if you always want the model to be unselected, even if 'modelsUnselectable' is true","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus, maxExpansions, force) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),","            modelnode;","","        if (modelid && (!itemUnselectable || force)) {","            if (instance.hasPlugin('itsainfiniteview')) {","                // make sure the node is rendered","                instance._getNodeFromModelOrIndex(model, null, maxExpansions);","            }","            // each modelid-class should be present only once","            modelnode = contentBox.one('.'+modelid);","            if (modelnode) {","                if (!selectstatus) {","                    modelnode.blur();","                }","                modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","            if (!modelid) {","            }","            else {","            }","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned. In case of LazyModelList, the event","         *","         * @event modelSelectionChange","         * @param e {EventFacade} Event Facade including:","         * @param e.newModelSelection {String} contains [Model|Object] with all modelList's Models (Objects in case of LazyModelList)","         *  that are selected:<br />","         * -in case of repeated Models (see attribute/property 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel","         * <b>is not part</b> of the original (Lazy)ModelList.","         * @param e.originalModelSelection {Array} contains [Model|Object] with all modelList's unique original Models","         * (Objects in case of LazyModelList) that are selected. These Models/Objects also exists in the original (Lazy)ModelList.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._handlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ITSAModellistViewExtention = ITSAModellistViewExtention;","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-base\",","        \"node-style\",","        \"node-event-delegate\",","        \"base-build\",","        \"base-base\",","        \"widget-base\",","        \"oop\",","        \"yui-later\",","        \"dom-screen\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\",","        \"template-base\",","        \"template-micro\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].lines = {"1":0,"3":0,"30":0,"71":0,"80":0,"82":0,"96":0,"117":0,"120":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"131":0,"148":0,"153":0,"155":0,"163":0,"165":0,"176":0,"179":0,"180":0,"182":0,"183":0,"184":0,"185":0,"191":0,"196":0,"198":0,"202":0,"204":0,"218":0,"236":0,"253":0,"267":0,"285":0,"303":0,"320":0,"341":0,"361":0,"379":0,"395":0,"412":0,"429":0,"446":0,"464":0,"480":0,"508":0,"536":0,"564":0,"591":0,"614":0,"643":0,"672":0,"701":0,"721":0,"736":0,"741":0,"755":0,"768":0,"778":0,"787":0,"796":0,"805":0,"814":0,"823":0,"832":0,"841":0,"850":0,"859":0,"868":0,"877":0,"886":0,"895":0,"904":0,"913":0,"922":0,"931":0,"940":0,"949":0,"958":0,"967":0,"976":0,"985":0,"994":0,"1003":0,"1012":0,"1021":0,"1030":0,"1039":0,"1048":0,"1057":0,"1066":0,"1075":0,"1084":0,"1093":0,"1102":0,"1120":0,"1129":0,"1131":0,"1154":0,"1156":0,"1157":0,"1158":0,"1182":0,"1206":0,"1238":0,"1241":0,"1242":0,"1245":0,"1246":0,"1251":0,"1253":0,"1279":0,"1284":0,"1285":0,"1287":0,"1288":0,"1289":0,"1292":0,"1293":0,"1296":0,"1299":0,"1300":0,"1304":0,"1305":0,"1307":0,"1308":0,"1309":0,"1312":0,"1313":0,"1327":0,"1330":0,"1331":0,"1332":0,"1334":0,"1335":0,"1338":0,"1343":0,"1345":0,"1346":0,"1359":0,"1363":0,"1364":0,"1366":0,"1370":0,"1371":0,"1372":0,"1373":0,"1374":0,"1377":0,"1378":0,"1379":0,"1380":0,"1381":0,"1384":0,"1385":0,"1386":0,"1387":0,"1388":0,"1389":0,"1404":0,"1407":0,"1408":0,"1411":0,"1412":0,"1416":0,"1417":0,"1418":0,"1423":0,"1438":0,"1450":0,"1465":0,"1486":0,"1489":0,"1490":0,"1491":0,"1492":0,"1493":0,"1494":0,"1495":0,"1496":0,"1497":0,"1501":0,"1518":0,"1528":0,"1531":0,"1532":0,"1533":0,"1534":0,"1536":0,"1537":0,"1539":0,"1540":0,"1542":0,"1543":0,"1545":0,"1546":0,"1548":0,"1549":0,"1551":0,"1552":0,"1554":0,"1555":0,"1557":0,"1558":0,"1560":0,"1561":0,"1563":0,"1564":0,"1566":0,"1567":0,"1583":0,"1589":0,"1590":0,"1591":0,"1592":0,"1593":0,"1594":0,"1595":0,"1597":0,"1598":0,"1599":0,"1600":0,"1615":0,"1616":0,"1617":0,"1618":0,"1648":0,"1657":0,"1658":0,"1659":0,"1660":0,"1663":0,"1665":0,"1666":0,"1667":0,"1668":0,"1669":0,"1670":0,"1673":0,"1676":0,"1678":0,"1689":0,"1696":0,"1697":0,"1698":0,"1701":0,"1703":0,"1705":0,"1706":0,"1707":0,"1709":0,"1710":0,"1711":0,"1712":0,"1715":0,"1716":0,"1724":0,"1728":0,"1732":0,"1733":0,"1737":0,"1741":0,"1742":0,"1748":0,"1749":0,"1755":0,"1756":0,"1760":0,"1762":0,"1763":0,"1768":0,"1772":0,"1773":0,"1774":0,"1781":0,"1786":0,"1787":0,"1788":0,"1792":0,"1797":0,"1803":0,"1806":0,"1807":0,"1813":0,"1819":0,"1827":0,"1828":0,"1829":0,"1842":0,"1844":0,"1845":0,"1847":0,"1848":0,"1849":0,"1862":0,"1864":0,"1865":0,"1866":0,"1870":0,"1884":0,"1886":0,"1887":0,"1888":0,"1892":0,"1906":0,"1908":0,"1909":0,"1910":0,"1914":0,"1928":0,"1930":0,"1931":0,"1932":0,"1936":0,"1950":0,"1952":0,"1953":0,"1954":0,"1955":0,"1959":0,"1973":0,"1975":0,"1976":0,"1977":0,"1978":0,"1982":0,"1996":0,"1998":0,"1999":0,"2000":0,"2001":0,"2005":0,"2019":0,"2021":0,"2022":0,"2023":0,"2024":0,"2028":0,"2042":0,"2044":0,"2045":0,"2046":0,"2047":0,"2051":0,"2065":0,"2067":0,"2068":0,"2069":0,"2070":0,"2074":0,"2088":0,"2090":0,"2091":0,"2092":0,"2093":0,"2097":0,"2111":0,"2113":0,"2114":0,"2115":0,"2116":0,"2120":0,"2135":0,"2138":0,"2139":0,"2141":0,"2143":0,"2148":0,"2149":0,"2151":0,"2152":0,"2153":0,"2166":0,"2168":0,"2181":0,"2184":0,"2185":0,"2186":0,"2191":0,"2194":0,"2198":0,"2199":0,"2200":0,"2214":0,"2217":0,"2226":0,"2229":0,"2233":0,"2237":0,"2240":0,"2244":0,"2245":0,"2246":0,"2260":0,"2263":0,"2272":0,"2275":0,"2279":0,"2284":0,"2285":0,"2286":0,"2300":0,"2302":0,"2303":0,"2306":0,"2307":0,"2309":0,"2310":0,"2311":0,"2315":0,"2316":0,"2325":0,"2326":0,"2327":0,"2329":0,"2330":0,"2333":0,"2334":0,"2335":0,"2336":0,"2340":0,"2341":0,"2349":0,"2350":0,"2351":0,"2365":0,"2367":0,"2368":0,"2371":0,"2375":0,"2376":0,"2377":0,"2391":0,"2393":0,"2394":0,"2397":0,"2399":0,"2400":0,"2405":0,"2406":0,"2407":0,"2421":0,"2425":0,"2434":0,"2437":0,"2441":0,"2446":0,"2447":0,"2448":0,"2450":0,"2459":0,"2462":0,"2466":0,"2471":0,"2472":0,"2473":0,"2487":0,"2490":0,"2499":0,"2502":0,"2506":0,"2511":0,"2512":0,"2513":0,"2515":0,"2524":0,"2527":0,"2531":0,"2536":0,"2537":0,"2538":0,"2551":0,"2565":0,"2566":0,"2568":0,"2569":0,"2570":0,"2571":0,"2573":0,"2575":0,"2576":0,"2577":0,"2578":0,"2579":0,"2580":0,"2581":0,"2582":0,"2583":0,"2584":0,"2587":0,"2590":0,"2591":0,"2594":0,"2598":0,"2600":0,"2602":0,"2617":0,"2636":0,"2637":0,"2638":0,"2640":0,"2641":0,"2642":0,"2643":0,"2644":0,"2645":0,"2647":0,"2648":0,"2649":0,"2650":0,"2654":0,"2655":0,"2661":0,"2662":0,"2663":0,"2664":0,"2668":0,"2669":0,"2673":0,"2674":0,"2675":0,"2676":0,"2680":0,"2681":0,"2684":0,"2685":0,"2686":0,"2687":0,"2691":0,"2692":0,"2695":0,"2696":0,"2697":0,"2698":0,"2702":0,"2703":0,"2706":0,"2707":0,"2708":0,"2709":0,"2713":0,"2714":0,"2717":0,"2718":0,"2719":0,"2720":0,"2724":0,"2725":0,"2728":0,"2729":0,"2730":0,"2731":0,"2735":0,"2736":0,"2739":0,"2740":0,"2741":0,"2742":0,"2746":0,"2747":0,"2750":0,"2764":0,"2788":0,"2791":0,"2792":0,"2793":0,"2794":0,"2796":0,"2799":0,"2800":0,"2801":0,"2804":0,"2806":0,"2811":0,"2815":0,"2818":0,"2819":0,"2821":0,"2844":0,"2861":0,"2862":0,"2863":0,"2864":0,"2865":0,"2866":0,"2867":0,"2868":0,"2869":0,"2872":0,"2873":0,"2874":0,"2875":0,"2878":0,"2883":0,"2884":0,"2885":0,"2886":0,"2887":0,"2888":0,"2889":0,"2890":0,"2891":0,"2892":0,"2894":0,"2895":0,"2899":0,"2900":0,"2902":0,"2903":0,"2905":0,"2906":0,"2907":0,"2908":0,"2909":0,"2911":0,"2912":0,"2916":0,"2921":0,"2925":0,"2926":0,"2927":0,"2928":0,"2929":0,"2932":0,"2934":0,"2935":0,"2936":0,"2938":0,"2939":0,"2940":0,"2941":0,"2942":0,"2943":0,"2944":0,"2947":0,"2948":0,"2950":0,"2951":0,"2952":0,"2955":0,"2958":0,"2959":0,"2960":0,"2964":0,"2965":0,"2968":0,"2969":0,"2970":0,"2972":0,"2973":0,"2974":0,"2976":0,"2977":0,"2978":0,"2980":0,"2983":0,"2985":0,"2986":0,"2987":0,"2989":0,"2992":0,"2993":0,"2994":0,"2995":0,"2996":0,"3002":0,"3003":0,"3005":0,"3006":0,"3007":0,"3009":0,"3010":0,"3013":0,"3016":0,"3018":0,"3020":0,"3025":0,"3026":0,"3027":0,"3028":0,"3029":0,"3033":0,"3034":0,"3042":0,"3057":0,"3072":0,"3079":0,"3080":0,"3081":0,"3082":0,"3083":0,"3085":0,"3086":0,"3087":0,"3089":0,"3090":0,"3091":0,"3092":0,"3094":0,"3097":0,"3098":0,"3099":0,"3100":0,"3102":0,"3103":0,"3104":0,"3106":0,"3107":0,"3108":0,"3109":0,"3111":0,"3114":0,"3115":0,"3116":0,"3117":0,"3119":0,"3120":0,"3121":0,"3123":0,"3124":0,"3125":0,"3126":0,"3129":0,"3130":0,"3131":0,"3133":0,"3134":0,"3135":0,"3136":0,"3137":0,"3138":0,"3153":0,"3163":0,"3164":0,"3165":0,"3166":0,"3167":0,"3168":0,"3171":0,"3173":0,"3175":0,"3176":0,"3178":0,"3179":0,"3180":0,"3181":0,"3184":0,"3187":0,"3188":0,"3189":0,"3191":0,"3192":0,"3195":0,"3197":0,"3200":0,"3201":0,"3202":0,"3215":0,"3218":0,"3219":0,"3220":0,"3247":0,"3254":0,"3255":0,"3257":0,"3258":0,"3259":0,"3260":0,"3262":0,"3264":0,"3265":0,"3266":0,"3267":0,"3274":0,"3297":0,"3303":0,"3304":0,"3306":0,"3309":0,"3310":0,"3311":0,"3312":0,"3314":0,"3316":0,"3317":0,"3320":0,"3324":0,"3339":0,"3357":0,"3358":0,"3359":0,"3377":0,"3380":0,"3387":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].functions = {"GETSTYLE:70":0,"ITSAModellistAttrExtention:80":0,"getModelAttr:95":0,"setModelAttr:116":0,"getModelToJSON:147":0,"ITSANodeCleanup:163":0,"(anonymous 2):181":0,"cleanup:175":0,"ITSAModellistViewExtention:202":0,"validator:218":0,"validator:236":0,"validator:253":0,"validator:267":0,"validator:285":0,"validator:302":0,"validator:319":0,"validator:340":0,"validator:360":0,"validator:379":0,"validator:395":0,"validator:412":0,"validator:429":0,"validator:446":0,"validator:464":0,"validator:480":0,"validator:508":0,"validator:536":0,"validator:564":0,"validator:591":0,"validator:614":0,"validator:643":0,"validator:672":0,"validator:701":0,"validator:721":0,"validator:736":0,"initializer:754":0,"setWithoutRerender:1153":0,"getNodeFromIndex:1176":0,"getNodeFromModel:1200":0,"(anonymous 3):1244":0,"modelIsSelected:1237":0,"(anonymous 4):1295":0,"selectModels:1273":0,"(anonymous 5):1337":0,"unselectModels:1326":0,"(anonymous 6):1365":0,"blurAll:1363":0,"clearSelectedModels:1358":0,"(anonymous 7):1414":0,"getSelectedModels:1403":0,"renderView:1437":0,"getModelListInUse:1449":0,"getModelAttr:1464":0,"setModelAttr:1485":0,"getModelToJSON:1517":0,"destructor:1527":0,"_render:1582":0,"_focusModelNode:1614":0,"_getMaxPaginatorGotoIndex:1642":0,"(anonymous 8):1702":0,"(anonymous 9):1727":0,"(anonymous 10):1730":0,"(anonymous 11):1740":0,"(anonymous 12):1771":0,"(anonymous 13):1784":0,"(anonymous 14):1791":0,"(anonymous 15):1800":0,"(anonymous 16):1805":0,"_extraBindUI:1688":0,"_setModelList:1841":0,"_setNoDups:1861":0,"_setLimitModels:1883":0,"_setViewFilter:1905":0,"_setDupComp:1927":0,"_setGrpH1:1949":0,"_setGrpH2:1972":0,"_setGrpH3:1995":0,"_setGH1Templ:2018":0,"_setGH2Templ:2041":0,"_setGH3Templ:2064":0,"_setModelTemplate:2087":0,"_setClassNameTempl:2110":0,"_setModelsSel:2134":0,"_setModelListStyled:2165":0,"(anonymous 17):2189":0,"_setSelectableEvents:2180":0,"(anonymous 18):2228":0,"(anonymous 19):2235":0,"_setClkEv:2213":0,"(anonymous 20):2274":0,"_setDblclkEv:2259":0,"(anonymous 22):2314":0,"(anonymous 21):2305":0,"(anonymous 24):2339":0,"(anonymous 23):2332":0,"_setMarkModelChange:2299":0,"(anonymous 25):2370":0,"_setIntoViewAdded:2364":0,"(anonymous 26):2396":0,"_setIntoViewChanged:2390":0,"(anonymous 27):2436":0,"(anonymous 28):2461":0,"_setMouseDnUpEv:2420":0,"(anonymous 29):2501":0,"(anonymous 30):2526":0,"_setHoverEv:2486":0,"_handleModelSelectionChange:2550":0,"isMicroTemplate:2636":0,"modelEngine:2649":0,"modelEngine:2654":0,"modelEngine:2663":0,"modelEngine:2668":0,"classNameEngine:2675":0,"classNameEngine:2680":0,"groupH1Engine:2686":0,"groupH1Engine:2691":0,"groupH2Engine:2697":0,"groupH2Engine:2702":0,"groupH3Engine:2708":0,"groupH3Engine:2713":0,"renderGH1Engine:2719":0,"renderGH1Engine:2724":0,"renderGH2Engine:2730":0,"renderGH2Engine:2735":0,"renderGH3Engine:2741":0,"renderGH3Engine:2746":0,"_getAllTemplateFuncs:2616":0,"(anonymous 31):2798":0,"dupAvailable:2793":0,"_tryRenderModel:2787":0,"_clearAbberantModelList:2814":0,"(anonymous 32):2975":0,"findNodeByClientId:2972":0,"(anonymous 33):2988":0,"_renderView:2843":0,"_repositionModel:3054":0,"_createModelNode:3071":0,"_addEmptyItem:3152":0,"_removeEmptyItem:3214":0,"findNode:3257":0,"_getNodeFromModelOrIndex:3241":0,"_selectModel:3291":0,"_fireSelectedModels:3338":0,"(anonymous 34):3379":0,"_clearEventhandlers:3376":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredLines = 799;
_yuitest_coverage["build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js"].coveredFunctions = 146;
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
    VIEW_TEMPLATE_UL = '<ul role="pxresentation"></ul>',
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "GETSTYLE", 70);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 71);
return parseInt(node.getStyle(style), 10);
    };

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 80);
function ITSAModellistAttrExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 82);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 95);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 96);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 116);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 117);
var instance = this,
            modelIsLazy, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 120);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 121);
modelIsLazy = !model.get || (typeof model.get !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 122);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 123);
revivedModel = instance.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 124);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 125);
if (revivedModel) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 126);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 127);
instance.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 131);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 147);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 148);
return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 153);
Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 155);
Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);

//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 163);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 165);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "cleanup", 175);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 176);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 179);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 180);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 2)", 181);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 182);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 183);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 184);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 185);
widgetInstance.destroy(true);
                        }
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 191);
node.all('children').destroy(true);
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 196);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 198);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

// -- Now creating extention -----------------------------------

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 202);
function ITSAModellistViewExtention() {}

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 204);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 218);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 218);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 236);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 236);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 253);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 253);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 267);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 267);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 285);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 285);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 302);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 303);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 319);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 320);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 340);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 341);
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
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 360);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 361);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 379);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 379);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 395);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 395);
return (typeof v === 'boolean');},
        setter: '_setDblclkEv'
    },

   /**
    * When set to a value > 0, the Models will be m highlighted whenever they change (or new added).
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 412);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 412);
return (typeof v === 'number');},
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 429);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 429);
return ((typeof v === 'number') && (v>=0) && (v<=2));},
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 446);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 446);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 464);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 464);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 480);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 480);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 508);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 508);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 536);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 536);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 564);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 564);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 591);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 591);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 614);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 614);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 643);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 643);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 672);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 672);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 701);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 701);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 721);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 721);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "validator", 736);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 736);
return (typeof v === 'boolean'); }
    }

};

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 741);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "initializer", 754);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 755);
var instance = this;

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
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 768);
instance._handlers = [];

        /**
         * Internal reference to the original models, which is only used when DupModels are avaialble.
         * It makes it posible to return the original models on a modelClick-event.
         * @property _origModels
         * @private
         * @default []
         * @type Array
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 778);
instance._origModels = [];

        /**
         * Internal eventhandle, defined when the attribute 'selectedModels' is used.
         * @property _selModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 787);
instance._selModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'clickEvents' is used.
         * @property _clkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 796);
instance._clkModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.
         * @property _dblclkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 805);
instance._dblclkModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseentModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 814);
instance._mouseentModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseUpModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 823);
instance._mouseUpModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseDnModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 832);
instance._mouseDnModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseleaveModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 841);
instance._mouseleaveModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelChangeEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 850);
instance._markModelChangeEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelAddEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 859);
instance._markModelAddEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.
         * @property _modelInViewChanged
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 868);
instance._modelInViewChanged = null;

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.
         * @property _modelInViewAdded
         * @private
         * @default null
         * @type Y.EventHandle
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 877);
instance._modelInViewAdded = null;

        /**
         * Internal object with references to all selected Models.
         * @property _selectedModels
         * @private
         * @default {}
         * @type Object
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 886);
instance._selectedModels = {};

        /**
         * Internal reference to the viewNode
         * @property _viewNode
         * @private
         * @default null
         * @type Y.Node
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 895);
instance._viewNode = null;

        /**
         * The id of _viewNode
         * @property _viewId
         * @private
         * @default Y.guid()
         * @type String
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 904);
instance._viewId = Y.guid();

        /**
         * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.
         * @property _currentViewPg
         * @private
         * @default 0
         * @type Int
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 913);
instance._currentViewPg = 0;

        /**
         * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.
         * @property _templFns
         * @private
         * @default null
         * @type Object
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 922);
instance._templFns = null;

        /**
         * Internal reference to the last Model that was clicked.
         * @property _lastClkModel
         * @private
         * @default null
         * @type Y.Model
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 931);
instance._lastClkModel = null;

        /**
         * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.
         * @property _abModelList
         * @private
         * @default null
         * @type Y.ModelList | Y.LazyModelList
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 940);
instance._abModelList = null;

        /**
         * Internal flag to tell whether the attribute 'viewFilter' is initiated.
         * @property _viewFilterInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 949);
instance._viewFilterInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1' is initiated.
         * @property _grpH1Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 958);
instance._grpH1Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2' is initiated.
         * @property _grpH2Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 967);
instance._grpH2Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3' is initiated.
         * @property _grpH3Init
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 976);
instance._grpH3Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1Template' is initiated.
         * @property _gH1TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 985);
instance._gH1TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2Template' is initiated.
         * @property _gH2TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 994);
instance._gH2TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3Template' is initiated.
         * @property _gH3TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1003);
instance._gH3TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'modelTemplate' is initiated.
         * @property _modelTemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1012);
instance._modelTemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'classNameTemplate' is initiated.
         * @property _renderClassInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1021);
instance._renderClassInit = false;

        /**
         * Internal flag to tell whether the attribute 'dupComparator' is initiated.
         * @property _dupCompInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1030);
instance._dupCompInit = false;

        /**
         * Internal flag to tell whether the attribute 'noDups' is initiated.
         * @property _noDupsInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1039);
instance._noDupsInit = false;

        /**
         * Internal flag to tell whether the attribute 'limitModels' is initiated.
         * @property _limModelsInit
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1048);
instance._limModelsInit = false;

        /**
         * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.
         * @property _rerendAttrChg
         * @private
         * @default true
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1057);
instance._rerendAttrChg = true;

        /**
         * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.
         * @property _itmsAvail
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1066);
instance._itmsAvail = false; // must initially be set true

        /**
         * Internal refrence to the index of the last rendered Model in the View.
         * @property _prevLastModelIndex
         * @private
         * @default -1
         * @type Int
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1075);
instance._prevLastModelIndex = -1;

        /**
         * Internal flag that tells is the used ModelList is a LazyModelList.
         * @property _listLazy
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1084);
instance._listLazy = false;

        /**
         * The content of the last rendered Header1
         * @property _prevH1
         * @private
         * @default null
         * @type String|null
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1093);
instance._prevH1 = null;

        /**
         * The content of the last rendered Header2
         * @property _prevH2
         * @private
         * @default null
         * @type String|null
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1102);
instance._prevH2 = null,

        /**
         * The content of the last rendered Header3
         * @property _prevH3
         * @private
         * @default null
         * @type String|null
        */
        instance._prevH3 = null;

        /**
         * Whether the last rendered item was even or odd. Needed to draw the right class in the next item.
         * @property _even
         * @private
         * @default false
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1120);
instance._even = false;

        /**
         * Internal flag that tells wheter a Template.Micro is being used.
         * @property _microTemplateUsed
         * @private
         * @default null
         * @type Boolean
        */
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1129);
instance._microTemplateUsed = null;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1131);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setWithoutRerender", 1153);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1154);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1156);
instance._rerendAttrChg = false;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1157);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1158);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromIndex", 1176);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1182);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getNodeFromModel", 1200);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1206);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelIsSelected", 1237);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1238);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1241);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1242);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 3)", 1244);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1245);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1246);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1251);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1253);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "selectModels", 1273);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1279);
var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1284);
if (singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1285);
instance.clearSelectedModels(true, true);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1287);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1288);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1289);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1292);
if (isArray && !singleSelectable) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1293);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 4)", 1295);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1296);
instance._selectModel(model, true, maxExpansions);
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1299);
if (scrollIntoView && (models.length>0)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1300);
instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1304);
if (isArray) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1305);
models = models[0];
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1307);
instance._selectModel(models, true, maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1308);
if (scrollIntoView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1309);
instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1312);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1313);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "unselectModels", 1326);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1327);
var instance = this,
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1330);
if (!silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1331);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1332);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1334);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1335);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 5)", 1337);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1338);
instance._selectModel(model, false, null, force);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1343);
instance._selectModel(models, false, null, force);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1345);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1346);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "clearSelectedModels", 1358);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1359);
var instance = this,
            contentBox = instance.get('contentBox'),
            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1363);
blurAll = function() {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "blurAll", 1363);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1364);
currentSelected.each(
                function(node) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 6)", 1365);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1366);
node.blur();
                }
            );
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1370);
currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1371);
firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1372);
if (silent) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1373);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1374);
currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1377);
fireEvent = (currentSelected.size()>0);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1378);
blurAll();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1379);
currentSelected.removeClass(SVML_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1380);
if (fireEvent) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1381);
instance._fireSelectedModels();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1384);
instance._selectedModels = {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1385);
if (instance.get('modelsUnselectable') && firstSelected && !force) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1386);
clientId = firstSelected.getData('modelClientId');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1387);
modelList = instance.getModelListInUse();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1388);
model = modelList.getByClientId(clientId);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1389);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getSelectedModels", 1403);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1404);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1407);
if (!original) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1408);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1411);
selected = [];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1412);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _origModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 7)", 1414);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1416);
var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1417);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1418);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1423);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderView", 1437);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1438);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelListInUse", 1449);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1450);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelAttr", 1464);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1465);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "setModelAttr", 1485);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1486);
var instance = this,
            modelIsLazy, modelList, revivedModel;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1489);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1490);
modelIsLazy = !model.get || (typeof model.get !== 'function');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1491);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1492);
modelList = instance.get('modelList');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1493);
revivedModel = modelList.revive(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1494);
model[name] = value;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1495);
if (revivedModel) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1496);
revivedModel.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1497);
modelList.free(revivedModel);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1501);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "getModelToJSON", 1517);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1518);
return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "destructor", 1527);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1528);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1531);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1532);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1533);
if (instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1534);
instance._selModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1536);
if (instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1537);
instance._clkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1539);
if (instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1540);
instance._dblclkModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1542);
if (instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1543);
instance._mouseDnModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1545);
if (instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1546);
instance._mouseUpModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1548);
if (instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1549);
instance._mouseentModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1551);
if (instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1552);
instance._mouseleaveModelEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1554);
if (instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1555);
instance._markModelChangeEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1557);
if (instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1558);
instance._markModelAddEv.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1560);
if (instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1561);
instance._modelInViewChanged.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1563);
if (instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1564);
instance._modelInViewAdded.detach();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1566);
instance._clearAbberantModelList();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1567);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_render", 1582);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1583);
var instance = this,
            modellist = instance.get('modelList'),
            listType = instance.get('listType'),
            boundingBox = instance.get('boundingBox'),
            viewNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1589);
instance.get('contentBox').setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1590);
instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1591);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1592);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1593);
boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1594);
if (instance.get('showLoadMessage')) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1595);
boundingBox.addClass(SVML_SHOWLOADING_CLASS);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1597);
instance._templFns = instance._getAllTemplateFuncs();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1598);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1599);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1600);
instance._renderView(null, {incrementbuild: true, initbuild: true});
        }
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_focusModelNode", 1614);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1615);
if (modelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1616);
this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1617);
modelNode.addClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1618);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getMaxPaginatorGotoIndex", 1642);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1648);
var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance.getModelListInUse(),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1657);
if (paginator && (modelList.size()>0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1658);
lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1659);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1660);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1663);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1665);
liElements = instance._viewNode.all('>li');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1666);
i = liElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1667);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1668);
lastNode = liElements.item(i);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1669);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1670);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1673);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1676);
if (size>=boundingSize) {i++;}
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1678);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_extraBindUI", 1688);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1689);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            contentBox = instance.get('contentBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._handlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1696);
if (modellist) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1697);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1698);
boundingBox.addClass(MODELLIST_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1701);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 8)", 1702);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1703);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1705);
modellist = newmodellist;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1706);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1707);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1709);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1710);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1711);
boundingBox.addClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1712);
instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1715);
boundingBox.removeClass(MODELLIST_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1716);
contentBox.setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1724);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 9)", 1727);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1728);
instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 10)", 1730);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1732);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1733);
return (!scrollingInAction);
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1737);
eventhandlers.push(
            instance.after(
                'model:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 11)", 1740);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1741);
var model = e.target;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1742);
if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {
                        //========================================================
                        //
                        // LACK IN ModelList --> make resort after model:change
                        //
                        //=======================================================
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1748);
if (modellist && modellist.comparator) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1749);
modellist.sort();
                            //====================================================
                            //
                            // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                            // As soon as issue is resolved, remove modellist.free() command
                            //
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1755);
if (instance._listLazy) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1756);
modellist.free();
                            }
                            //======================================================
                        }
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1760);
instance._repositionModel(model);
                    }
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1762);
if (instance.modelIsSelected(model)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1763);
instance._fireSelectedModels();
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1768);
eventhandlers.push(
            instance.after(
                'model:destroy',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 12)", 1771);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1772);
var model = e.target;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1773);
if (instance.modelIsSelected(model)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1774);
instance._fireSelectedModels();
                    }
                }
            )
        );
        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll
        // we set it on contentBox instead of BoundingBox to interupt as soon as posible
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1781);
eventhandlers.push(
            contentBox.delegate(
                'click',
                function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 13)", 1784);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1786);
if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1787);
e.preventDefault();
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1788);
e.stopImmediatePropagation();
                    }
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 14)", 1791);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1792);
return this.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                }
            )
        );
        // also prevent default on mousedown, to prevent the native "drag link to desktop" behavior on certain browsers.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1797);
eventhandlers.push(
            boundingBox.delegate(
                'mousedown',
                function(e) {
                    // Prevent default anchor drag behavior, on browsers
                    // which let you drag anchors to the desktop
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 15)", 1800);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1803);
e.preventDefault();
                },
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 16)", 1805);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1806);
var tagName = this.get('tagName');
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1807);
return ((tagName==='A') || (tagName==='IMG'));
                }
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1813);
eventhandlers.push(
            instance.after(
                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add'],
                Y.bind(instance._renderView, instance, null, null)
            )
        );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1819);
eventhandlers.push(
            instance.after(
                ['modelList:reset', 'lazyModelList:reset'],
                Y.bind(instance._renderView, instance, null, {keepstyles: false})
            )
        );
        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,
        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1827);
instance.get('highlightAfterModelChange');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1828);
instance.get('modelsIntoViewAfterAdd');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1829);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelList", 1841);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1842);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1844);
if (Lang.isArray(val)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1845);
val = new Y.LazyModelList({items: val});
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1847);
instance._listLazy = val && val.revive;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1848);
instance._itmsAvail = val && (val.size()>0);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1849);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setNoDups", 1861);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1862);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1864);
if (instance._noDupsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1865);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1866);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1870);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setLimitModels", 1883);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1884);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1886);
if (instance._limModelsInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1887);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1888);
instance._renderView({limitModels: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1892);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setViewFilter", 1905);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1906);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1908);
if (instance._viewFilterInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1909);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1910);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1914);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDupComp", 1927);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1928);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1930);
if (instance._dupCompInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1931);
if (instance._rerendAttrChg && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1932);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1936);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH1", 1949);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1950);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1952);
if (instance._grpH1Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1953);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1954);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1955);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1959);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH2", 1972);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1973);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1975);
if (instance._grpH2Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1976);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1977);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1978);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1982);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGrpH3", 1995);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1996);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1998);
if (instance._grpH3Init) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 1999);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2000);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2001);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2005);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH1Templ", 2018);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2019);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2021);
if (instance._gH1TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2022);
instance._templFns = instance._getAllTemplateFuncs({groupHeader1Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2023);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2024);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2028);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH2Templ", 2041);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2042);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2044);
if (instance._gH2TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2045);
instance._templFns = instance._getAllTemplateFuncs({groupHeader2Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2046);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2047);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2051);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setGH3Templ", 2064);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2065);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2067);
if (instance._gH3TemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2068);
instance._templFns = instance._getAllTemplateFuncs({groupHeader3Template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2069);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2070);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2074);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelTemplate", 2087);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2088);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2090);
if (instance._modelTemplateInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2091);
instance._templFns = instance._getAllTemplateFuncs({template: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2092);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2093);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2097);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClassNameTempl", 2110);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2111);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2113);
if (instance._renderClassInit) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2114);
instance._templFns = instance._getAllTemplateFuncs({classNameTemplate: val});
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2115);
if (instance._rerendAttrChg) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2116);
instance._renderView();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2120);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelsSel", 2134);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2135);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2138);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2139);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2141);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2143);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.
        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2148);
if (Y.UA.ie>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2149);
contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2151);
contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2152);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2153);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setModelListStyled", 2165);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2166);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2168);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setSelectableEvents", 2180);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2181);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2184);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2185);
if (val && !instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2186);
instance._selModelEv = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function(node, e) {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 17)", 2189);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2191);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2194);
return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2198);
if (!val && instance._selModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2199);
instance._selModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2200);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setClkEv", 2213);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2214);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2217);
if (val && !instance._clkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2226);
instance._clkModelEv = contentBox.delegate(
                'click',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 18)", 2228);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2229);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2233);
instance.fire('modelClick', {node: node, model: model});
                },
                function(node, e) {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 19)", 2235);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2237);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2240);
return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2244);
if (!val && instance._clkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2245);
instance._clkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2246);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setDblclkEv", 2259);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2260);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2263);
if (val && !instance._dblclkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelDblclick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2272);
instance._dblclkModelEv = contentBox.delegate(
                'dblclick',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 20)", 2274);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2275);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2279);
instance.fire('modelDblclick', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2284);
if (!val && instance._dblclkModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2285);
instance._dblclkModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2286);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMarkModelChange", 2299);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2300);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2302);
if (val && (val>0) && !instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2303);
instance._markModelChangeEv = instance.after(
                'model:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 21)", 2305);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2306);
if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2307);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            node = instance.getNodeFromModel(model);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2309);
if (node) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2310);
node.addClass(MODEL_CHANGED_CLASS);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2311);
Y.later(
                                val,
                                instance,
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 22)", 2314);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2315);
if (node) {
                                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2316);
node.removeClass(MODEL_CHANGED_CLASS);
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2325);
if (!val && instance._markModelChangeEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2326);
instance._markModelChangeEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2327);
instance._markModelChangeEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2329);
if (val && (val>0) && !instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2330);
instance._markModelAddEv = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 23)", 2332);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2333);
var node = instance.getNodeFromIndex(e.index);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2334);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2335);
node.addClass(MODEL_CHANGED_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2336);
Y.later(
                            val,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 24)", 2339);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2340);
if (node) {
                                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2341);
node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2349);
if (!val && instance._markModelAddEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2350);
instance._markModelAddEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2351);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewAdded", 2364);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2365);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2367);
if ((val >0) && !instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2368);
instance._modelInViewAdded = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 25)", 2370);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2371);
instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2375);
if ((val===0) && instance._modelInViewAdded) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2376);
instance._modelInViewAdded.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2377);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setIntoViewChanged", 2390);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2391);
var instance = this;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2393);
if ((val>0) && !instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2394);
instance._modelInViewChanged = instance.after(
                'model:change',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 26)", 2396);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2397);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2399);
if (node) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2400);
instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});
                    }
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2405);
if ((val===0) && instance._modelInViewChanged) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2406);
instance._modelInViewChanged.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2407);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setMouseDnUpEv", 2420);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2421);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2425);
if (val && !instance._mouseDnModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2434);
instance._mouseDnModelEv = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 27)", 2436);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2437);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2441);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2446);
if (!val && instance._mouseDnModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2447);
instance._mouseDnModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2448);
instance._mouseDnModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2450);
if (val && !instance._mouseUpModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2459);
instance._mouseUpModelEv = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 28)", 2461);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2462);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2466);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2471);
if (!val && instance._mouseUpModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2472);
instance._mouseUpModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2473);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_setHoverEv", 2486);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2487);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2490);
if (val && !instance._mouseentModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2499);
instance._mouseentModelEv = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 29)", 2501);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2502);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2506);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2511);
if (!val && instance._mouseentModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2512);
instance._mouseentModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2513);
instance._mouseentModelEv = null;
        }}
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2515);
if (val && !instance._mouseleaveModelEv) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2524);
instance._mouseleaveModelEv = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 30)", 2526);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2527);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2531);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2536);
if (!val && instance._mouseleaveModelEv) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2537);
instance._mouseleaveModelEv.detach();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2538);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_handleModelSelectionChange", 2550);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2551);
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

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2565);
modelPrevSelected = model && instance.modelIsSelected(model);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2566);
if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2568);
if (singleSelectable || !ctrlClick) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2569);
if (instance.get('modelsUnselectable')) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2570);
currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2571);
firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2573);
instance.clearSelectedModels(true, true);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2575);
if (shiftClick && instance._lastClkModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2576);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2577);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2578);
prevModelIndex = modelList.indexOf(instance._lastClkModel);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2579);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2580);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2581);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2582);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2583);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2584);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2587);
instance.selectModels(multipleModels, false, null, true);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2590);
if (modelPrevSelected && !firstItemSelected) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2591);
instance.unselectModels(model, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2594);
instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2598);
instance._lastClkModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2600);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2602);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getAllTemplateFuncs", 2616);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2617);
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

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2636);
isMicroTemplate = function(checkTemplate) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "isMicroTemplate", 2636);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2637);
var microTemplateRegExp = /<%(.+)%>/;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2638);
return microTemplateRegExp.test(checkTemplate);
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2640);
microModelTemplate = isMicroTemplate(template);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2641);
microRenderGH1 = activeGH1 && isMicroTemplate(renderGH1);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2642);
microRenderGH2 = activeGH2 && isMicroTemplate(renderGH2);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2643);
microRenderGH3 = activeGH3 && isMicroTemplate(renderGH3);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2644);
instance._microTemplateUsed = (microModelTemplate || microRenderGH1 || microRenderGH2 || microRenderGH3);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2645);
if (!itsacmtemplate) {
            // default behaviour without Y.Plugin.ITSAChangeModelTemplate
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2647);
if (microModelTemplate) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2648);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2649);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2649);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2650);
return compiledModelEngine(instance.getModelToJSON(model));
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2654);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2654);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2655);
return Lang.sub(template, instance.getModelToJSON(model));
                };
            }
        }
        else {
            // WITH Y.Plugin.ITSAChangeModelTemplate
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2661);
if (microModelTemplate) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2662);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2663);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2663);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2664);
return itsacmtemplate._getModelEngine(model, null, compiledModelEngine);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2668);
modelEngine = function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "modelEngine", 2668);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2669);
return itsacmtemplate._getModelEngine(model, template);
                };
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2673);
if (isMicroTemplate(classNameTemplate)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2674);
compiledModelEngine = YTemplateMicro.compile(classNameTemplate);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2675);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2675);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2676);
return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2680);
classNameEngine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "classNameEngine", 2680);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2681);
return Lang.sub(classNameTemplate, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2684);
if (activeGH1 && isMicroTemplate(groupH1)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2685);
compiledGroupH1Engine = YTemplateMicro.compile(groupH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2686);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2686);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2687);
return compiledGroupH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2691);
groupH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH1Engine", 2691);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2692);
return Lang.sub(groupH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2695);
if (activeGH2 && isMicroTemplate(groupH2)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2696);
compiledGroupH2Engine = YTemplateMicro.compile(groupH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2697);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2697);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2698);
return compiledGroupH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2702);
groupH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH2Engine", 2702);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2703);
return Lang.sub(groupH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2706);
if (activeGH3 && isMicroTemplate(groupH3)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2707);
compiledGroupH3Engine = YTemplateMicro.compile(groupH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2708);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2708);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2709);
return compiledGroupH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2713);
groupH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "groupH3Engine", 2713);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2714);
return Lang.sub(groupH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2717);
if (microRenderGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2718);
compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2719);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2719);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2720);
return compiledRenderGH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2724);
renderGH1Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH1Engine", 2724);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2725);
return Lang.sub(renderGH1, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2728);
if (microRenderGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2729);
compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2730);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2730);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2731);
return compiledRenderGH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2735);
renderGH2Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH2Engine", 2735);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2736);
return Lang.sub(renderGH2, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2739);
if (microRenderGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2740);
compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2741);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2741);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2742);
return compiledRenderGH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2746);
renderGH3Engine = function(model) {
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "renderGH3Engine", 2746);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2747);
return Lang.sub(renderGH3, instance.getModelToJSON(model));
            };
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2750);
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
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2764);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_tryRenderModel", 2787);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2788);
var instance = this,
            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2791);
dubComparatorBinded = Y.rbind(dupComparator, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2792);
viewFilterBinded = Y.rbind(viewFilter, instance);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2793);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "dupAvailable", 2793);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2794);
var dupFound = false,
                modelComp = dubComparatorBinded(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2796);
YArray.some(
                modelListItemsArray,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 31)", 2798);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2799);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2800);
dupFound = (dubComparatorBinded(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2801);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2804);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2806);
allowed = (!viewFilter || viewFilterBinded(trymodel)) &&
                      (!noDups ||
                       (!dupComparator && ((renderedmodel = allTemplateFuncs.template(trymodel))!==prevrenderedmodel)) ||
                       (dupComparator && !dupAvailable(trymodel))
                      );
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2811);
return allowed && (renderedmodel || allTemplateFuncs.template(trymodel));
    },

    _clearAbberantModelList : function() {
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearAbberantModelList", 2814);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2815);
var instance = this;

        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2818);
if (instance._abModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2819);
instance._abModelList.destroy();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2821);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_renderView", 2843);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2844);
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

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2861);
options = options || {};
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2862);
options.page = options.page || instance._currentViewPg;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2863);
pageSwitch = (instance._currentViewPg!==options.page);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2864);
options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2865);
options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2866);
options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2867);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2868);
if (instance.get('listType')==='ul') {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2869);
contentBox.setHTML(viewNode);
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2872);
contentBox.setHTML(TEMPLATE_TABLE);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2873);
table = contentBox.one('table');
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2874);
if (table) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2875);
table.append(viewNode);
                }
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2878);
instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2883);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2884);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2885);
if (options.rebuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2886);
i = (options.page*limitModels) -1; // will be incread to zero at start loop
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2887);
instance._prevH1 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2888);
instance._prevH2 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2889);
instance._prevH3 = null;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2890);
instance._even = false;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2891);
if (infiniteView) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2892);
instance._itmsAvail = true;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2894);
instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2895);
viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);
        }
        else {
            // start with the last index
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2899);
viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2900);
i = (instance._prevLastModelIndex || -1); // i will be increased at start loop
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2902);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2903);
newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2905);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2906);
modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2907);
if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2908);
instance._generateAbberantModelList(infiniteView, options.rebuild);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2909);
modelList = instance._abModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2911);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2912);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2916);
instance._clearAbberantModelList();
            }
        }
        else {
            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2921);
instance._clearAbberantModelList();
        }

        // in case of ITSAViewPaginator is active --> limitModels is always>0
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2925);
renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2926);
listIsLimited = (renderListLength<modelListItemsLength);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2927);
items = 0;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2928);
batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2929);
if (i>0) {
            // when available: remove the fillNode that makes lastItemOnTop
            // It will be rendered on the bottom again
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2932);
instance._removeEmptyItem();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2934);
while ((items<batchSize) && (++i<renderListLength)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2935);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2936);
renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,
                                                     dupComparator, allTemplateFuncs);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2938);
if (renderedModel) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2939);
if (items===0) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2940);
instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2941);
viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2942);
if (options.initbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2943);
instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2944);
viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2947);
items++;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2948);
modelNode = instance._createModelNode(model, renderedModel);
                // modelNode is an ARRAY of Y.Node !!!
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2950);
for (j=0; j<modelNode.length; j++) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2951);
if (options.incrementbuild) {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2952);
viewNode.append(modelNode[j]);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2955);
newViewNode.append(modelNode[j]);
                    }
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2958);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2959);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2960);
prevRenderedModel = renderedModel;
                }
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2964);
if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2965);
modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2968);
instance._prevLastModelIndex = i;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2969);
if (!options.incrementbuild) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2970);
if (options.keepstyles) {
                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2972);
findNodeByClientId = function(modelClientId, nodelist) {
                    _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNodeByClientId", 2972);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2973);
var nodeFound;
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2974);
nodelist.some(
                        function(node) {
                            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 32)", 2975);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2976);
var found = (node.getData('modelClientId') === modelClientId);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2977);
if (found) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2978);
nodeFound = node;
                            }
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2980);
return found;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2983);
return nodeFound;
                };
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2985);
previousViewModels = viewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2986);
newViewModels = newViewNode.all('.'+MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2987);
previousViewModels.each(
                    function(node) {
                        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 33)", 2988);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2989);
var hasSelected = node.hasClass(SVML_SELECTED_CLASS),
                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),
                            newnode;
                        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2992);
if (hasSelected || hasFocus) {
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2993);
newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);
                            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2994);
if (newnode) {
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2995);
newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);
                                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 2996);
newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);
                            }
                        }
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3002);
if (instance._microTemplateUsed) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3003);
viewNode.cleanup();
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3005);
viewNode.replace(newViewNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3006);
instance._viewNode = newViewNode;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3007);
newViewNode.set('id', instance._viewId);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3009);
if (viewNode.getHTML()==='') {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3010);
noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3013);
if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3016);
instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3018);
instance._currentViewPg = options.page;
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3020);
instance.syncUI();
//========================================================
        // now a correction of PaginatorPlugin-bug:
        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin
        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3025);
if (paginator) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3026);
currentPaginatorIndex = paginator.get('index');
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3027);
maxPaginatorIndex = viewNode.get('children').size() - 1;
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3028);
if (currentPaginatorIndex > maxPaginatorIndex) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3029);
paginator.set('index', maxPaginatorIndex);
            }
        }
//========================================================
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3033);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3034);
infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3042);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_repositionModel", 3054);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3057);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_createModelNode", 3071);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3072);
var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            nodes = [],
            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,
            modelNode = YNode.create(rowtemplate),
            header1, header2, header3, headerNode, allTemplateFuncs;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3079);
allTemplateFuncs = instance._templFns;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3080);
if (allTemplateFuncs.activeGH1) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3081);
header1 = allTemplateFuncs.groupH1(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3082);
if (header1!==instance._prevH1) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3083);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3085);
headerNode.addClass(GROUPHEADER1_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3086);
if (instance._prevH1) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3087);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3089);
headerNode.setHTML(allTemplateFuncs.renderGH1(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3090);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3091);
instance._prevH1 = header1;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3092);
instance._even = false;
                // force to make a header2 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3094);
instance._prevH2 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3097);
if (allTemplateFuncs.activeGH2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3098);
header2 = allTemplateFuncs.groupH2(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3099);
if (header2!==instance._prevH2) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3100);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3102);
headerNode.addClass(GROUPHEADER2_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3103);
if (instance._prevH2) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3104);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3106);
headerNode.setHTML(allTemplateFuncs.renderGH2(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3107);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3108);
instance._prevH2 = header2;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3109);
instance._even = false;
                // force to make a header3 insertion (when appropriate)
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3111);
instance._prevH3 = null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3114);
if (allTemplateFuncs.activeGH3) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3115);
header3 = allTemplateFuncs.groupH3(model);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3116);
if (header3!==instance._prevH3) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3117);
headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3119);
headerNode.addClass(GROUPHEADER3_CLASS);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3120);
if (instance._prevH3) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3121);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3123);
headerNode.setHTML(allTemplateFuncs.renderGH3(model));
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3124);
nodes.push(headerNode);
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3125);
instance._prevH3 = header3;
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3126);
instance._even = false;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3129);
modelNode.setData('modelClientId', modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3130);
if (allTemplateFuncs.activeClass) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3131);
modelNode.addClass(allTemplateFuncs.classNameTemplate(model));
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3133);
modelNode.addClass(MODEL_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3134);
modelNode.addClass(modelClientId);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3135);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3136);
modelNode.setHTML(renderedModel || allTemplateFuncs.template(model));
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3137);
nodes.push(modelNode);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3138);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_addEmptyItem", 3152);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3153);
var instance = this,
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBox = instance.get('boundingBox'),
            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),
            viewNode = instance._viewNode,
            listTypeUL = (instance.get('listType')==='ul'),
            itemTemplate = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3163);
instance._removeEmptyItem();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3164);
if (!lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3165);
modelElements = viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3166);
modelElementsSize = modelElements.size();
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3167);
if (modelElementsSize>0) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3168);
lastModelNode = modelElements.item(modelElementsSize-1);
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3171);
if (!listTypeUL) {
            // table itemTemplate --> we must set colspan
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3173);
nrCells = lastModelNode.all('>td').size();
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3175);
itemTemplate = Lang.sub(itemTemplate, {cols: nrCells, content: ''});
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3176);
modelNode = YNode.create(itemTemplate),
        modelNode.addClass(EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3178);
viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3179);
if (lastModelNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3180);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3181);
elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3184);
elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3187);
lastModelNode = lastModelNode && lastModelNode.previous();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3188);
if (itemOnTopValue===2) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3189);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3191);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3192);
elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3195);
elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3197);
lastModelNode = lastModelNode.previous();
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3200);
modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3201);
if (elementsize>0) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3202);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_removeEmptyItem", 3214);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3215);
var instance = this,
            removeNode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3218);
removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3219);
if (removeNode) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3220);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_getNodeFromModelOrIndex", 3241);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3247);
var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3254);
if (model) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3255);
modelClientId = instance.getModelAttr(model, 'clientId');
        }
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3257);
findNode = function(node, loopindex) {
            _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "findNode", 3257);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3258);
var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3259);
if (found) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3260);
nodeFound = node;
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3262);
return found;
        };
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3264);
do {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3265);
nodeList = instance._viewNode.all('.'+MODEL_CLASS);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3266);
nodeList.some(findNode);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3267);
i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        }while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3274);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_selectModel", 3291);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3297);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnode;

        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3303);
if (modelid && (!itemUnselectable || force)) {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3304);
if (instance.hasPlugin('itsainfiniteview')) {
                // make sure the node is rendered
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3306);
instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3309);
modelnode = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3310);
if (modelnode) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3311);
if (!selectstatus) {
                    _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3312);
modelnode.blur();
                }
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3314);
modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3316);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3317);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3320);
delete instance._selectedModels[modelid];
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3324);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_fireSelectedModels", 3338);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3339);
var instance = this,
            selectedModels, originalModels;

        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Models), the Model is only once in the resultarray.
         * Meaning: only original unique Models are returned. In case of LazyModelList, the event
         *
         * @event modelSelectionChange
         * @param e {EventFacade} Event Facade including:
         * @param e.newModelSelection {String} contains [Model|Object] with all modelList's Models (Objects in case of LazyModelList)
         *  that are selected:<br />
         * -in case of repeated Models (see attribute/property 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel
         * <b>is not part</b> of the original (Lazy)ModelList.
         * @param e.originalModelSelection {Array} contains [Model|Object] with all modelList's unique original Models
         * (Objects in case of LazyModelList) that are selected. These Models/Objects also exists in the original (Lazy)ModelList.
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3357);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3358);
originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3359);
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
        _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "_clearEventhandlers", 3376);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3377);
YArray.each(
            this._handlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", "(anonymous 34)", 3379);
_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3380);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsamodellistviewextention/gallery-itsamodellistviewextention.js", 3387);
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
        "template-micro"
    ],
    "skinnable": true
});
