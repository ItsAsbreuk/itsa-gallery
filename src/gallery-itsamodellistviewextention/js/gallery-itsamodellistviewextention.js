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
        return parseInt(node.getStyle(style), 10);
    };

//===============================================================================================
// First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes
// We mix it to both Y.LazyModelList as well as Y.ModelList
// this way we can always call these methods regardsless of a ModelList or LazyModelList as used
//===============================================================================================

function ITSAModellistAttrExtention() {}

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
        Y.log('getModelAttr', 'info', 'Itsa-LazyModelListAttr');
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
        var instance = this,
            modelIsLazy, revivedModel;

        Y.log('setModelAttr', 'info', 'Itsa-LazyModelListAttr');
        if (model) {
            modelIsLazy = !model.get || (typeof model.get !== 'function');
            if (modelIsLazy) {
                revivedModel = instance.revive(model);
                model[name] = value;
                if (revivedModel) {
                    revivedModel.set(name, value, options);
                    instance.free(revivedModel);
                }
            }
            else {
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
        Y.log('getModelToJSON', 'info', 'Itsa-LazyModelListAttr');
        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    }

}, true);

Y.ITSAModellistAttrExtention = ITSAModellistAttrExtention;

Y.Base.mix(Y.ModelList, [ITSAModellistAttrExtention]);

//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

function ITSANodeCleanup() {}

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
        var node = this,
            YWidget = Y.Widget;

        Y.log('cleanup', 'info', 'Itsa-NodeCleanup');
        if (YWidget) {
            node.all('.yui3-widget').each(
                function(widgetNode) {
                    if (node.one('#'+widgetNode.get('id'))) {
                        var widgetInstance = YWidget.getByNode(widgetNode);
                        if (widgetInstance) {
                            widgetInstance.destroy(true);
                        }
                    }
                }
            );
        }
        node.all('children').destroy(true);
    }

}, true);

Y.Node.ITSANodeCleanup = ITSANodeCleanup;

Y.Base.mix(Y.Node, [ITSANodeCleanup]);

// -- Now creating extention -----------------------------------

function ITSAModellistViewExtention() {}

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
        validator: function(v){ return (v === null) || (v.getByClientId) || Lang.isArray(v);},
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
        validator: function(v){ return (typeof v === 'boolean');},
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
        validator: function(v){ return (v==='ul') || (v==='table');},
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
        validator: function(v){ return (typeof v === 'number');},
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
        validator: function(v){ return (v === null) || (typeof v === 'function'); },
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
        validator: function(v) {return (typeof v === 'boolean');},
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
        validator: function(v) {return (typeof v === 'boolean');},
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
        validator: function(v) {return (typeof v === 'number');},
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
        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=2));},
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
        validator: function(v) {return ((typeof v === 'number') && (v>=0) && (v<=2));},
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
        validator: function(v){ return (typeof v === 'boolean'); },
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
        validator: function(v){ return (typeof v === 'boolean'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (typeof v === 'string'); },
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
        validator: function(v){ return (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'string'); },
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
        validator: function(v){ return (v === null) || (typeof v === 'function'); },
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
        validator: function(v){ return (typeof v === 'boolean'); }
    }

};

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
        var instance = this;

        Y.log('initializer', 'info', 'Itsa-ModellistViewExtention');
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
        instance._handlers = [];

        /**
         * Internal reference to the original models, which is only used when DupModels are avaialble.
         * It makes it posible to return the original models on a modelClick-event.
         * @property _origModels
         * @private
         * @default []
         * @type Array
        */
        instance._origModels = [];

        /**
         * Internal eventhandle, defined when the attribute 'selectedModels' is used.
         * @property _selModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._selModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'clickEvents' is used.
         * @property _clkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._clkModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'dblclickEvents' is used.
         * @property _dblclkModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._dblclkModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseentModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._mouseentModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseUpModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._mouseUpModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'mouseDownUpEvents' is used.
         * @property _mouseDnModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._mouseDnModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'hoverEvents' is used.
         * @property _mouseleaveModelEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._mouseleaveModelEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelChangeEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._markModelChangeEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'highlightAfterModelChange' is used.
         * @property _markModelAddEv
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._markModelAddEv = null;

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterChange' is used.
         * @property _modelInViewChanged
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._modelInViewChanged = null;

        /**
         * Internal eventhandle, defined when the attribute 'modelsIntoViewAfterAdd' is used.
         * @property _modelInViewAdded
         * @private
         * @default null
         * @type Y.EventHandle
        */
        instance._modelInViewAdded = null;

        /**
         * Internal object with references to all selected Models.
         * @property _selectedModels
         * @private
         * @default {}
         * @type Object
        */
        instance._selectedModels = {};

        /**
         * Internal reference to the viewNode
         * @property _viewNode
         * @private
         * @default null
         * @type Y.Node
        */
        instance._viewNode = null;

        /**
         * The id of _viewNode
         * @property _viewId
         * @private
         * @default Y.guid()
         * @type String
        */
        instance._viewId = Y.guid();

        /**
         * Internal reference to the current viewpage. Only used when ITSAViewPaginator is pluged-in.
         * @property _currentViewPg
         * @private
         * @default 0
         * @type Int
        */
        instance._currentViewPg = 0;

        /**
         * Internal Object with all template-functions. See the Method '_getAllTemplateFuncs' to find out what the Object consists of.
         * @property _templFns
         * @private
         * @default null
         * @type Object
        */
        instance._templFns = null;

        /**
         * Internal reference to the last Model that was clicked.
         * @property _lastClkModel
         * @private
         * @default null
         * @type Y.Model
        */
        instance._lastClkModel = null;

        /**
         * An abbarant (copy) (Lazy)ModelList that will be used (filled) with Models that can be duplicated in case of DupModelExtention.
         * @property _abModelList
         * @private
         * @default null
         * @type Y.ModelList | Y.LazyModelList
        */
        instance._abModelList = null;

        /**
         * Internal flag to tell whether the attribute 'viewFilter' is initiated.
         * @property _viewFilterInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._viewFilterInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1' is initiated.
         * @property _grpH1Init
         * @private
         * @default false
         * @type Boolean
        */
        instance._grpH1Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2' is initiated.
         * @property _grpH2Init
         * @private
         * @default false
         * @type Boolean
        */
        instance._grpH2Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3' is initiated.
         * @property _grpH3Init
         * @private
         * @default false
         * @type Boolean
        */
        instance._grpH3Init = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader1Template' is initiated.
         * @property _gH1TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._gH1TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader2Template' is initiated.
         * @property _gH2TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._gH2TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'groupHeader3Template' is initiated.
         * @property _gH3TemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._gH3TemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'modelTemplate' is initiated.
         * @property _modelTemplateInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._modelTemplateInit = false;

        /**
         * Internal flag to tell whether the attribute 'classNameTemplate' is initiated.
         * @property _renderClassInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._renderClassInit = false;

        /**
         * Internal flag to tell whether the attribute 'dupComparator' is initiated.
         * @property _dupCompInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._dupCompInit = false;

        /**
         * Internal flag to tell whether the attribute 'noDups' is initiated.
         * @property _noDupsInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._noDupsInit = false;

        /**
         * Internal flag to tell whether the attribute 'limitModels' is initiated.
         * @property _limModelsInit
         * @private
         * @default false
         * @type Boolean
        */
        instance._limModelsInit = false;

        /**
         * Internal flag to tell whether attributes can cause the view to re-render. See 'setWithoutRerender' for more information.
         * @property _rerendAttrChg
         * @private
         * @default true
         * @type Boolean
        */
        instance._rerendAttrChg = true;

        /**
         * Internal flag that tells whether more Items are available. Only when ITSAInfiniteView is pluged-in.
         * @property _itmsAvail
         * @private
         * @default false
         * @type Boolean
        */
        instance._itmsAvail = false; // must initially be set true

        /**
         * Internal refrence to the index of the last rendered Model in the View.
         * @property _prevLastModelIndex
         * @private
         * @default -1
         * @type Int
        */
        instance._prevLastModelIndex = -1;

        /**
         * Internal flag that tells is the used ModelList is a LazyModelList.
         * @property _listLazy
         * @private
         * @default false
         * @type Boolean
        */
        instance._listLazy = false;

        /**
         * The content of the last rendered Header1
         * @property _prevH1
         * @private
         * @default null
         * @type String|null
        */
        instance._prevH1 = null;

        /**
         * The content of the last rendered Header2
         * @property _prevH2
         * @private
         * @default null
         * @type String|null
        */
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
        instance._even = false;

        /**
         * Internal flag that tells wheter a Template.Micro is being used.
         * @property _microTemplateUsed
         * @private
         * @default null
         * @type Boolean
        */
        instance._microTemplateUsed = null;

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
        var instance = this;

        Y.log('setWithoutRerender', 'info', 'Itsa-ModellistViewExtention');
        instance._rerendAttrChg = false;
        instance.set(name, val, opts);
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
        Y.log('getNodeFromIndex', 'info', 'Itsa-ModellistViewExtention');
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
        Y.log('getNodeFromModel', 'info', 'Itsa-ModellistViewExtention');
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
        var instance = this,
            selected;

        Y.log('modelIsSelected', 'info', 'Itsa-ModellistViewExtention');
        if (Lang.isArray(model)) {
            YArray.some(
                model,
                function(onemodel) {
                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    return selected ? false : true;
                }
            );
        }
        else {
            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
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
        var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        Y.log('selectModels', 'info', 'Itsa-ModellistViewExtention');
        if (singleSelectable) {
            instance.clearSelectedModels(true, true);
        }
        if (!silent) {
            contentBox = instance.get('contentBox');
            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        if (isArray && !singleSelectable) {
            YArray.each(
                models,
                function(model) {
                    instance._selectModel(model, true, maxExpansions);
                }
            );
            if (scrollIntoView && (models.length>0)) {
                instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            if (isArray) {
                models = models[0];
            }
            instance._selectModel(models, true, maxExpansions);
            if (scrollIntoView) {
                instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
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
        var instance = this,
            prevSize, contentBox;

        Y.log('unselectModels', 'info', 'Itsa-ModellistViewExtention');
        if (!silent) {
            contentBox = instance.get('contentBox');
            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        if (Lang.isArray(models)) {
            YArray.each(
                models,
                function(model) {
                    instance._selectModel(model, false, null, force);
                }
            );
        }
        else {
            instance._selectModel(models, false, null, force);
        }
        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
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
        var instance = this,
            contentBox = instance.get('contentBox'),
            blurAll, currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        Y.log('clearSelectedModels', 'info', 'Itsa-ModellistViewExtention');
        blurAll = function() {
            currentSelected.each(
                function(node) {
                    node.blur();
                }
            );
        };
        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        if (silent) {
            blurAll();
            currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            fireEvent = (currentSelected.size()>0);
            blurAll();
            currentSelected.removeClass(SVML_SELECTED_CLASS);
            if (fireEvent) {
                instance._fireSelectedModels();
            }
        }
        instance._selectedModels = {};
        if (instance.get('modelsUnselectable') && firstSelected && !force) {
            clientId = firstSelected.getData('modelClientId');
            modelList = instance.getModelListInUse();
            model = modelList.getByClientId(clientId);
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
        var instance = this,
            selected;

        Y.log('getSelectedModels', 'info', 'Itsa-ModellistViewExtention');
        if (!original) {
            selected = YObject.values(instance._selectedModels);
        }
        else {
            selected = [];
            YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _origModels, then it has an originalModel
                    var originalModel = instance._origModels[instance.getModelAttr(model, 'clientId')];
                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        selected.push(originalModel || model);
                    }
                }
            );
        }
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
        Y.log('renderView', 'info', 'Itsa-ModellistViewExtention');
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
        Y.log('getModelListInUse', 'info', 'Itsa-ModellistViewExtention');
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
        Y.log('getModelAttr', 'info', 'Itsa-ModellistViewExtention');
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
        var instance = this,
            modelIsLazy, modelList, revivedModel;

        Y.log('setModelAttr', 'info', 'Itsa-ModellistViewExtention');
        if (model) {
            modelIsLazy = !model.get || (typeof model.get !== 'function');
            if (modelIsLazy) {
                modelList = instance.get('modelList');
                revivedModel = modelList.revive(model);
                model[name] = value;
                if (revivedModel) {
                    revivedModel.set(name, value, options);
                    modelList.free(revivedModel);
                }
            }
            else {
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
        Y.log('getModelToJSON', 'info', 'Itsa-ModellistViewExtention');
        return (model.get && (typeof model.get === 'function')) ? model.toJSON() : model;
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        var instance = this,
            modellist = instance.get('modelList');

        Y.log('destructor', 'info', 'Itsa-ModellistViewExtention');
        instance._clearEventhandlers();
        modellist.removeTarget(instance);
        if (instance._selModelEv) {
            instance._selModelEv.detach();
        }
        if (instance._clkModelEv) {
            instance._clkModelEv.detach();
        }
        if (instance._dblclkModelEv) {
            instance._dblclkModelEv.detach();
        }
        if (instance._mouseDnModelEv) {
            instance._mouseDnModelEv.detach();
        }
        if (instance._mouseUpModelEv) {
            instance._mouseUpModelEv.detach();
        }
        if (instance._mouseentModelEv) {
            instance._mouseentModelEv.detach();
        }
        if (instance._mouseleaveModelEv) {
            instance._mouseleaveModelEv.detach();
        }
        if (instance._markModelChangeEv) {
            instance._markModelChangeEv.detach();
        }
        if (instance._markModelAddEv) {
            instance._markModelAddEv.detach();
        }
        if (instance._modelInViewChanged) {
            instance._modelInViewChanged.detach();
        }
        if (instance._modelInViewAdded) {
            instance._modelInViewAdded.detach();
        }
        instance._clearAbberantModelList();
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
        var instance = this,
            modellist = instance.get('modelList'),
            listType = instance.get('listType'),
            boundingBox = instance.get('boundingBox'),
            viewNode;

        Y.log('_render', 'info', 'Itsa-ModellistViewExtention');
        instance.get('contentBox').setHTML(Lang.sub(LOADING_TEMPLATE, {loading: LOADING_MESSAGE}));
        instance._viewNode = viewNode = YNode.create((listType==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        viewNode.set('id', instance._viewId);
        viewNode.addClass(SVML_VIEW_NOITEMS_CLASS).addClass(SVML_VIEW_NOINITIALITEMS_CLASS);
        boundingBox.addClass(SVML_NOITEMS_CLASS).addClass(SVML_NOINITIALITEMS_CLASS);
        if (instance.get('showLoadMessage')) {
            boundingBox.addClass(SVML_SHOWLOADING_CLASS);
        }
        instance._templFns = instance._getAllTemplateFuncs();
        instance._extraBindUI();
        if (modellist) {
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
        Y.log('_focusModelNode', 'info', 'Itsa-ModellistViewExtention');
        if (modelNode) {
            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            modelNode.addClass(SVML_FOCUS_CLASS);
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
        var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance.getModelListInUse(),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        Y.log('_getMaxPaginatorGotoIndex', 'info', 'Itsa-ModellistViewExtention');
        if (paginator && (modelList.size()>0)) {
            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            if (yAxis) {
                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            liElements = instance._viewNode.all('>li');
            i = liElements.size();
            while (lastNode && (--i>=0) && (size<boundingSize)) {
                lastNode = liElements.item(i);
                if (yAxis) {
                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            if (size>=boundingSize) {i++;}
        }
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
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            contentBox = instance.get('contentBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._handlers;

        Y.log('_extraBindUI', 'info', 'Itsa-ModellistViewExtention');
        // making models bubble up to the scrollview-instance:
        if (modellist) {
            modellist.addTarget(instance);
            boundingBox.addClass(MODELLIST_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                modellist = newmodellist;
                if (prevmodellist) {
                    prevmodellist.removeTarget(instance);
                }
                if (newmodellist) {
                    newmodellist.addTarget(instance);
                    boundingBox.addClass(MODELLIST_CLASS);
                    instance._renderView(null, {incrementbuild: !prevmodellist, initbuild: !prevmodellist});
                }
                else {
                    boundingBox.removeClass(MODELLIST_CLASS);
                    contentBox.setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    return (!scrollingInAction);
                }
            )
        );
        eventhandlers.push(
            instance.after(
                'model:change',
                function(e) {
                    var model = e.target;
                    if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {
                        //========================================================
                        //
                        // LACK IN ModelList --> make resort after model:change
                        //
                        //=======================================================
                        if (modellist && modellist.comparator) {
                            modellist.sort();
                            //====================================================
                            //
                            // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                            // As soon as issue is resolved, remove modellist.free() command
                            //
                            if (instance._listLazy) {
                                modellist.free();
                            }
                            //======================================================
                        }
                        instance._repositionModel(model);
                    }
                    if (instance.modelIsSelected(model)) {
                        instance._fireSelectedModels();
                    }
                }
            )
        );
        eventhandlers.push(
            instance.after(
                'model:destroy',
                function(e) {
                    var model = e.target;
                    if (instance.modelIsSelected(model)) {
                        instance._fireSelectedModels();
                    }
                }
            )
        );
        // now make clicks on <a> an <button> elements prevented when scrollview does a scroll
        // we set it on contentBox instead of BoundingBox to interupt as soon as posible
        eventhandlers.push(
            contentBox.delegate(
                'click',
                function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    if (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                },
                function() {
                    return this.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                }
            )
        );
        // also prevent default on mousedown, to prevent the native "drag link to desktop" behavior on certain browsers.
        eventhandlers.push(
            boundingBox.delegate(
                'mousedown',
                function(e) {
                    // Prevent default anchor drag behavior, on browsers
                    // which let you drag anchors to the desktop
                    e.preventDefault();
                },
                function() {
                    var tagName = this.get('tagName');
                    return ((tagName==='A') || (tagName==='IMG'));
                }
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        eventhandlers.push(
            instance.after(
                ['modelList:remove', 'lazyModelList:remove', 'modelList:add', 'lazyModelList:add'],
                Y.bind(instance._renderView, instance, null, null)
            )
        );
        eventhandlers.push(
            instance.after(
                ['modelList:reset', 'lazyModelList:reset'],
                Y.bind(instance._renderView, instance, null, {keepstyles: false})
            )
        );
        // only now we must initiate 3 binders --> if we would have done this with lazyAdd=false,
        // they would be defined before the _renderView subscribers (which we don't want). Activate them by calling the attribute
        instance.get('highlightAfterModelChange');
        instance.get('modelsIntoViewAfterAdd');
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
        var instance = this;

        Y.log('_setModelList', 'info', 'Itsa-ModellistViewExtention');
        if (Lang.isArray(val)) {
            val = new Y.LazyModelList({items: val});
        }
        instance._listLazy = val && val.revive;
        instance._itmsAvail = val && (val.size()>0);
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
        var instance = this;

        Y.log('_setNoDups', 'info', 'Itsa-ModellistViewExtention');
        if (instance._noDupsInit) {
            if (instance._rerendAttrChg) {
                instance._renderView({noDups: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setLimitModels', 'info', 'Itsa-ModellistViewExtention');
        if (instance._limModelsInit) {
            if (instance._rerendAttrChg) {
                instance._renderView({limitModels: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setViewFilter', 'info', 'Itsa-ModellistViewExtention');
        if (instance._viewFilterInit) {
            if (instance._rerendAttrChg) {
                instance._renderView({viewFilter: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setDupComp', 'info', 'Itsa-ModellistViewExtention');
        if (instance._dupCompInit) {
            if (instance._rerendAttrChg && instance.get('noDups')) {
                instance._renderView({dupComparator: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGrpH1', 'info', 'Itsa-ModellistViewExtention');
        if (instance._grpH1Init) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader1: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGrpH2', 'info', 'Itsa-ModellistViewExtention');
        if (instance._grpH2Init) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader2: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGrpH3', 'info', 'Itsa-ModellistViewExtention');
        if (instance._grpH3Init) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader3: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGH1Templ', 'info', 'Itsa-ModellistViewExtention');
        if (instance._gH1TemplateInit) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader1Template: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGH2Templ', 'info', 'Itsa-ModellistViewExtention');
        if (instance._gH2TemplateInit) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader2Template: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGH3Templ', 'info', 'Itsa-ModellistViewExtention');
        if (instance._gH3TemplateInit) {
            instance._templFns = instance._getAllTemplateFuncs({groupHeader3Template: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setModelTemplate', 'info', 'Itsa-ModellistViewExtention');
        if (instance._modelTemplateInit) {
            instance._templFns = instance._getAllTemplateFuncs({template: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this;

        Y.log('_setClassNameTempl', 'info', 'Itsa-ModellistViewExtention');
        if (instance._renderClassInit) {
            instance._templFns = instance._getAllTemplateFuncs({classNameTemplate: val});
            if (instance._rerendAttrChg) {
                instance._renderView();
            }
        }
        else {
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setModelsSel', 'info', 'Itsa-ModellistViewExtention');
        if ((val==='') || !val) {
            val = null;
        }
        else if (Lang.isBoolean(val)) {
            // val===true
            val = 'multi';
        }
        // At this point, val can have three states: null, 'single' and 'multi'
        // now -in case of multi-selectable: if ViewModelList, then multiselect would lead to selected text as well.
        // we need to suppress this. We set it to the contentBox --> this._viewNode is not there at initialisation
        if (Y.UA.ie>0) {
            contentBox.setAttribute('unselectable', (val==='multi') ? 'on' : '');
        }
        contentBox.toggleClass(SVML_UNSELECTABLE, (val==='multi'));
        instance._setSelectableEvents(val);
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
        var instance = this;

        Y.log('_setModelListStyled', 'info', 'Itsa-ModellistViewExtention');
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setSelectableEvents', 'info', 'Itsa-ModellistViewExtention');
        instance.clearSelectedModels();
        if (val && !instance._selModelEv) {
            instance._selModelEv = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function(node, e) {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else if (!val && instance._selModelEv) {
            instance._selModelEv.detach();
            instance._selModelEv = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setClkEv', 'info', 'Itsa-ModellistViewExtention');
        if (val && !instance._clkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._clkModelEv = contentBox.delegate(
                'click',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelClick', {node: node, model: model});
                },
                function(node, e) {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity')),
                        buttonOrLink = e.target.test('input[type=button],button,a,.focusable,.'+ITSABUTTON_DATETIME_CLASS+
                                       ',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    return (!scrollingInAction && !buttonOrLink && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else if (!val && instance._clkModelEv) {
            instance._clkModelEv.detach();
            instance._clkModelEv = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setDblclkEv', 'info', 'Itsa-ModellistViewExtention');
        if (val && !instance._dblclkModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelDblclick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._dblclkModelEv = contentBox.delegate(
                'dblclick',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelDblclick', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else if (!val && instance._dblclkModelEv) {
            instance._dblclkModelEv.detach();
            instance._dblclkModelEv = null;
        }
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
        var instance = this;

        Y.log('_setMarkModelChange', 'info', 'Itsa-ModellistViewExtention');
        if (val && (val>0) && !instance._markModelChangeEv) {
            instance._markModelChangeEv = instance.after(
                'model:change',
                function(e) {
                    if (!e.fromEditModel || !instance.itsacmtemplate || !instance.itsacmtemplate.get('modelsEditable')) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            node = instance.getNodeFromModel(model);
                        if (node) {
                            node.addClass(MODEL_CHANGED_CLASS);
                            Y.later(
                                val,
                                instance,
                                function() {
                                    if (node) {
                                        node.removeClass(MODEL_CHANGED_CLASS);
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
        else if (!val && instance._markModelChangeEv) {
            instance._markModelChangeEv.detach();
            instance._markModelChangeEv = null;
        }
        if (val && (val>0) && !instance._markModelAddEv) {
            instance._markModelAddEv = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    var node = instance.getNodeFromIndex(e.index);
                    if (node) {
                        node.addClass(MODEL_CHANGED_CLASS);
                        Y.later(
                            val,
                            instance,
                            function() {
                                if (node) {
                                    node.removeClass(MODEL_CHANGED_CLASS);
                                }
                            }
                        );
                    }
                }
            );
        }
        else if (!val && instance._markModelAddEv) {
            instance._markModelAddEv.detach();
            instance._markModelAddEv = null;
        }
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
        var instance = this;

        Y.log('_setIntoViewAdded', 'info', 'Itsa-ModellistViewExtention');
        if ((val >0) && !instance._modelInViewAdded) {
            instance._modelInViewAdded = instance.after(
                ['modelList:add', 'lazyModelList:add'],
                function(e) {
                    instance.scrollIntoView(e.index, {noFocus: true, showHeaders: (val===2)});
                }
            );
        }
        else if ((val===0) && instance._modelInViewAdded) {
            instance._modelInViewAdded.detach();
            instance._modelInViewAdded = null;
        }
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
        var instance = this;

        Y.log('_setIntoViewChanged', 'info', 'Itsa-ModellistViewExtention');
        if ((val>0) && !instance._modelInViewChanged) {
            instance._modelInViewChanged = instance.after(
                'model:change',
                function(e) {
                    var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        node = instance.getNodeFromModel(model);
                    if (node) {
                        instance.scrollIntoView(node, {noFocus: true, showHeaders: (val===2)});
                    }
                }
            );
        }
        else if ((val===0) && instance._modelInViewChanged) {
            instance._modelInViewChanged.detach();
            instance._modelInViewChanged = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');


        Y.log('_setMouseDnUpEv', 'info', 'Itsa-ModellistViewExtention');
        if (val && !instance._mouseDnModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseDnModelEv = contentBox.delegate(
                'mousedown',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else if (!val && instance._mouseDnModelEv) {
            instance._mouseDnModelEv.detach();
            instance._mouseDnModelEv = null;
        }
        if (val && !instance._mouseUpModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseUpModelEv = contentBox.delegate(
                'mouseup',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else if (!val && instance._mouseUpModelEv) {
            instance._mouseUpModelEv.detach();
            instance._mouseUpModelEv = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setHoverEv', 'info', 'Itsa-ModellistViewExtention');
        if (val && !instance._mouseentModelEv) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseentModelEv = contentBox.delegate(
                'mouseenter',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else if (!val && instance._mouseentModelEv) {
            instance._mouseentModelEv.detach();
            instance._mouseentModelEv = null;
        }
        if (val && !instance._mouseleaveModelEv) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseleaveModelEv = contentBox.delegate(
                'mouseleave',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else if (!val && instance._mouseleaveModelEv) {
            instance._mouseleaveModelEv.detach();
            instance._mouseleaveModelEv = null;
        }
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

        Y.log('_handleModelSelectionChange', 'info', 'Itsa-ModellistViewExtention');
        modelPrevSelected = model && instance.modelIsSelected(model);
        if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            if (singleSelectable || !ctrlClick) {
                if (instance.get('modelsUnselectable')) {
                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                instance.clearSelectedModels(true, true);
            }
            if (shiftClick && instance._lastClkModel) {
                multipleModels = [];
                newModelIndex = modelList.indexOf(model);
                prevModelIndex = modelList.indexOf(instance._lastClkModel);
                startIndex = Math.min(newModelIndex, prevModelIndex);
                endIndex = Math.max(newModelIndex, prevModelIndex);
                for (i=startIndex; i<=endIndex; i++) {
                    nextModel = modelList.item(i);
                    if (!viewFilter || viewFilter(nextModel)) {
                        multipleModels.push(nextModel);
                    }
                }
                instance.selectModels(multipleModels, false, null, true);
            }
            else {
                if (modelPrevSelected && !firstItemSelected) {
                    instance.unselectModels(model, true);
                }
                else {
                    instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                instance._lastClkModel = modelPrevSelected ? null : model;
            }
            instance._focusModelNode(modelNode);
        }
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

        Y.log('_getAllTemplateFuncs', 'info', 'Itsa-ModellistViewExtention');
        isMicroTemplate = function(checkTemplate) {
            var microTemplateRegExp = /<%(.+)%>/;
            return microTemplateRegExp.test(checkTemplate);
        };
        microModelTemplate = isMicroTemplate(template);
        microRenderGH1 = activeGH1 && isMicroTemplate(renderGH1);
        microRenderGH2 = activeGH2 && isMicroTemplate(renderGH2);
        microRenderGH3 = activeGH3 && isMicroTemplate(renderGH3);
        instance._microTemplateUsed = (microModelTemplate || microRenderGH1 || microRenderGH2 || microRenderGH3);
        if (!itsacmtemplate) {
            // default behaviour without Y.Plugin.ITSAChangeModelTemplate
            if (microModelTemplate) {
                compiledModelEngine = YTemplateMicro.compile(template);
                modelEngine = function(model) {
                    return compiledModelEngine(instance.getModelToJSON(model));
                };
            }
            else {
                modelEngine = function(model) {
                    return Lang.sub(template, instance.getModelToJSON(model));
                };
            }
        }
        else {
            // WITH Y.Plugin.ITSAChangeModelTemplate
            if (microModelTemplate) {
                compiledModelEngine = YTemplateMicro.compile(template);
                modelEngine = function(model) {
                    return itsacmtemplate._getModelEngine(model, null, compiledModelEngine);
                };
            }
            else {
                modelEngine = function(model) {
                    return itsacmtemplate._getModelEngine(model, template);
                };
            }
        }
        if (isMicroTemplate(classNameTemplate)) {
            compiledModelEngine = YTemplateMicro.compile(classNameTemplate);
            classNameEngine = function(model) {
                return compiledModelEngine(instance.getModelToJSON(model));
            };
        }
        else {
            classNameEngine = function(model) {
                return Lang.sub(classNameTemplate, instance.getModelToJSON(model));
            };
        }
        if (activeGH1 && isMicroTemplate(groupH1)) {
            compiledGroupH1Engine = YTemplateMicro.compile(groupH1);
            groupH1Engine = function(model) {
                return compiledGroupH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            groupH1Engine = function(model) {
                return Lang.sub(groupH1, instance.getModelToJSON(model));
            };
        }
        if (activeGH2 && isMicroTemplate(groupH2)) {
            compiledGroupH2Engine = YTemplateMicro.compile(groupH2);
            groupH2Engine = function(model) {
                return compiledGroupH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            groupH2Engine = function(model) {
                return Lang.sub(groupH2, instance.getModelToJSON(model));
            };
        }
        if (activeGH3 && isMicroTemplate(groupH3)) {
            compiledGroupH3Engine = YTemplateMicro.compile(groupH3);
            groupH3Engine = function(model) {
                return compiledGroupH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            groupH3Engine = function(model) {
                return Lang.sub(groupH3, instance.getModelToJSON(model));
            };
        }
        if (microRenderGH1) {
            compiledRenderGH1Engine = YTemplateMicro.compile(renderGH1);
            renderGH1Engine = function(model) {
                return compiledRenderGH1Engine(instance.getModelToJSON(model));
            };
        }
        else {
            renderGH1Engine = function(model) {
                return Lang.sub(renderGH1, instance.getModelToJSON(model));
            };
        }
        if (microRenderGH2) {
            compiledRenderGH2Engine = YTemplateMicro.compile(renderGH2);
            renderGH2Engine = function(model) {
                return compiledRenderGH2Engine(instance.getModelToJSON(model));
            };
        }
        else {
            renderGH2Engine = function(model) {
                return Lang.sub(renderGH2, instance.getModelToJSON(model));
            };
        }
        if (microRenderGH3) {
            compiledRenderGH3Engine = YTemplateMicro.compile(renderGH3);
            renderGH3Engine = function(model) {
                return compiledRenderGH3Engine(instance.getModelToJSON(model));
            };
        }
        else {
            renderGH3Engine = function(model) {
                return Lang.sub(renderGH3, instance.getModelToJSON(model));
            };
        }
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
        var instance = this,
            renderedmodel, allowed, dupAvailable, dubComparatorBinded, viewFilterBinded;

        Y.log('_tryRenderModel', 'info', 'Itsa-ModellistViewExtention');
        dubComparatorBinded = Y.rbind(dupComparator, instance);
        viewFilterBinded = Y.rbind(viewFilter, instance);
        dupAvailable = function(model) {
            var dupFound = false,
                modelComp = dubComparatorBinded(model);
            YArray.some(
                modelListItemsArray,
                function(checkModel) {
                    if (checkModel===model) {return true;}
                    dupFound = (dubComparatorBinded(checkModel)===modelComp);
                    return dupFound;
                }
            );
            return dupFound;
        };
        allowed = (!viewFilter || viewFilterBinded(trymodel)) &&
                      (!noDups ||
                       (!dupComparator && ((renderedmodel = allTemplateFuncs.template(trymodel))!==prevrenderedmodel)) ||
                       (dupComparator && !dupAvailable(trymodel))
                      );
        return allowed && (renderedmodel || allTemplateFuncs.template(trymodel));
    },

    _clearAbberantModelList : function() {
        var instance = this;

        // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
        if (instance._abModelList) {
            instance._abModelList.destroy();
        }
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

        Y.log('_renderView', 'info', 'Itsa-ModellistViewExtention');
        options = options || {};
        options.page = options.page || instance._currentViewPg;
        pageSwitch = (instance._currentViewPg!==options.page);
        options.rebuild = pageSwitch || (Lang.isBoolean(options.rebuild) ? options.rebuild : true);
        options.incrementbuild = Lang.isBoolean(options.incrementbuild) ? options.incrementbuild : !options.rebuild;
        options.keepstyles = Lang.isBoolean(options.keepstyles) ? options.keepstyles : true;
        if (!contentBox.one('#'+instance._viewId)) {
            if (instance.get('listType')==='ul') {
                contentBox.setHTML(viewNode);
            }
            else {
                contentBox.setHTML(TEMPLATE_TABLE);
                table = contentBox.one('table');
                if (table) {
                    table.append(viewNode);
                }
            }
            instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        modelListItems = modelList._items.concat();
        modelListItemsLength = modelListItems.length;
        if (options.rebuild) {
            i = (options.page*limitModels) -1; // will be incread to zero at start loop
            instance._prevH1 = null;
            instance._prevH2 = null;
            instance._prevH3 = null;
            instance._even = false;
            if (infiniteView) {
                instance._itmsAvail = true;
            }
            instance.get('boundingBox').addClass(SVML_NOITEMS_CLASS);
            viewNode.addClass(SVML_VIEW_NOITEMS_CLASS);
        }
        else {
            // start with the last index
            viewNode.all('.'+SVML_LASTMODEL_CLASS).removeClass(SVML_LASTMODEL_CLASS);
            i = (instance._prevLastModelIndex || -1); // i will be increased at start loop
        }
        if (!options.incrementbuild) {
            newViewNode = YNode.create((instance.get('listType')==='ul') ? VIEW_TEMPLATE_UL : VIEW_TEMPLATE_TBODY);
        }
        if (instance._generateAbberantModelList) {
            modelConfig = (setterAttrs && setterAttrs.modelConfig) || instance.get('modelConfig');
            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                instance._generateAbberantModelList(infiniteView, options.rebuild);
                modelList = instance._abModelList;
                // reset next 2 items
                modelListItems = modelList._items.concat();
                modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
                instance._clearAbberantModelList();
            }
        }
        else {
            // clear _abModelList to make sure in other methods the actual modelList (from attribute) will be used.
            instance._clearAbberantModelList();
        }

        // in case of ITSAViewPaginator is active --> limitModels is always>0
        renderListLength = (limitModels>0) ? Math.min(modelListItemsLength, (options.page+1)*limitModels) : modelListItemsLength;
        listIsLimited = (renderListLength<modelListItemsLength);
        items = 0;
        batchSize = infiniteView ? Math.min(instance.itsainfiniteview.get('batchSize'), modelListItemsLength) : modelListItemsLength;
        if (i>0) {
            // when available: remove the fillNode that makes lastItemOnTop
            // It will be rendered on the bottom again
            instance._removeEmptyItem();
        }
        while ((items<batchSize) && (++i<renderListLength)) {
            model = modelListItems[i];
            renderedModel = instance._tryRenderModel(model, prevRenderedModel, modelListItems, viewFilter, noDups,
                                                     dupComparator, allTemplateFuncs);
            if (renderedModel) {
                if (items===0) {
                    instance.get('boundingBox').removeClass(SVML_NOITEMS_CLASS);
                    viewNode.removeClass(SVML_VIEW_NOITEMS_CLASS);
                    if (options.initbuild) {
                        instance.get('boundingBox').removeClass(SVML_NOINITIALITEMS_CLASS);
                        viewNode.removeClass(SVML_VIEW_NOINITIALITEMS_CLASS);
                    }
                }
                items++;
                modelNode = instance._createModelNode(model, renderedModel);
                // modelNode is an ARRAY of Y.Node !!!
                for (j=0; j<modelNode.length; j++) {
                    if (options.incrementbuild) {
                        viewNode.append(modelNode[j]);
                    }
                    else {
                        newViewNode.append(modelNode[j]);
                    }
                }
                instance._even = !instance._even;
                if (noDups && !dupComparator) {
                    prevRenderedModel = renderedModel;
                }
            }
        }
        if (modelNode && (modelNode.length>0) && (lastItemOnTop===0)) {
            modelNode[modelNode.length-1].addClass(SVML_LASTMODEL_CLASS);
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        instance._prevLastModelIndex = i;
        if (!options.incrementbuild) {
            if (options.keepstyles) {
                // we must retain the marked nodes --> copy these classes from viewNode to newViewNode first
                findNodeByClientId = function(modelClientId, nodelist) {
                    var nodeFound;
                    nodelist.some(
                        function(node) {
                            var found = (node.getData('modelClientId') === modelClientId);
                            if (found) {
                                nodeFound = node;
                            }
                            return found;
                        }
                    );
                    return nodeFound;
                };
                previousViewModels = viewNode.all('.'+MODEL_CLASS);
                newViewModels = newViewNode.all('.'+MODEL_CLASS);
                previousViewModels.each(
                    function(node) {
                        var hasSelected = node.hasClass(SVML_SELECTED_CLASS),
                            hasFocus = node.hasClass(SVML_FOCUS_CLASS),
                            newnode;
                        if (hasSelected || hasFocus) {
                            newnode = findNodeByClientId(node.getData('modelClientId'), newViewModels);
                            if (newnode) {
                                newnode.toggleClass(SVML_SELECTED_CLASS, hasSelected);
                                newnode.toggleClass(SVML_FOCUS_CLASS, hasFocus);
                            }
                        }
                    }
                );
            }
            if (instance._microTemplateUsed) {
                viewNode.cleanup();
            }
            viewNode.replace(newViewNode);
            instance._viewNode = newViewNode;
            newViewNode.set('id', instance._viewId);
        }
        if (viewNode.getHTML()==='') {
            noDataTemplate = (instance.get('listType')==='ul') ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            viewNode.setHTML(Lang.sub(noDataTemplate, {cols: 1, content: NO_DATA_MESSAGE}));
        }
        if (modelNode && (lastItemOnTop>0) && (!infiniteView || !instance._itmsAvail || listIsLimited)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element WHICH IS AN ARRAY !!!
            instance._addEmptyItem(modelNode[modelNode.length-1], lastItemOnTop);
        }
        instance._currentViewPg = options.page;
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        instance.syncUI();
//========================================================
        // now a correction of PaginatorPlugin-bug:
        // this CAN ME REMOVED when the bug is fixed in ScrollViewPaginatorPlugin
        // if the current pages-index > new list-items, then on a paginator-move there would be an error thrown
        if (paginator) {
            currentPaginatorIndex = paginator.get('index');
            maxPaginatorIndex = viewNode.get('children').size() - 1;
            if (currentPaginatorIndex > maxPaginatorIndex) {
                paginator.set('index', maxPaginatorIndex);
            }
        }
//========================================================
        if (infiniteView) {
            infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
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
        var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            nodes = [],
            rowtemplate = (instance.get('listType')==='ul') ? VIEW_MODEL_TEMPLATE_UL : VIEW_MODEL_TEMPLATE_TABLE,
            modelNode = YNode.create(rowtemplate),
            header1, header2, header3, headerNode, allTemplateFuncs;

        Y.log('_createModelNode', 'info', 'Itsa-ModellistViewExtention');
        allTemplateFuncs = instance._templFns;
        if (allTemplateFuncs.activeGH1) {
            header1 = allTemplateFuncs.groupH1(model);
            if (header1!==instance._prevH1) {
                headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                headerNode.addClass(GROUPHEADER1_CLASS);
                if (instance._prevH1) {
                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                headerNode.setHTML(allTemplateFuncs.renderGH1(model));
                nodes.push(headerNode);
                instance._prevH1 = header1;
                instance._even = false;
                // force to make a header2 insertion (when appropriate)
                instance._prevH2 = null;
            }
        }
        if (allTemplateFuncs.activeGH2) {
            header2 = allTemplateFuncs.groupH2(model);
            if (header2!==instance._prevH2) {
                headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                headerNode.addClass(GROUPHEADER2_CLASS);
                if (instance._prevH2) {
                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                headerNode.setHTML(allTemplateFuncs.renderGH2(model));
                nodes.push(headerNode);
                instance._prevH2 = header2;
                instance._even = false;
                // force to make a header3 insertion (when appropriate)
                instance._prevH3 = null;
            }
        }
        if (allTemplateFuncs.activeGH3) {
            header3 = allTemplateFuncs.groupH3(model);
            if (header3!==instance._prevH3) {
                headerNode = YNode.create(rowtemplate),
                headerNode.addClass(GROUPHEADER_CLASS);
                headerNode.addClass(GROUPHEADER3_CLASS);
                if (instance._prevH3) {
                    headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                }
                headerNode.setHTML(allTemplateFuncs.renderGH3(model));
                nodes.push(headerNode);
                instance._prevH3 = header3;
                instance._even = false;
            }
        }
        modelNode.setData('modelClientId', modelClientId);
        if (allTemplateFuncs.activeClass) {
            modelNode.addClass(allTemplateFuncs.classNameTemplate(model));
        }
        modelNode.addClass(MODEL_CLASS);
        modelNode.addClass(modelClientId);
        modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
        modelNode.setHTML(renderedModel || allTemplateFuncs.template(model));
        nodes.push(modelNode);
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
        var instance = this,
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBox = instance.get('boundingBox'),
            itemOnTopValue = lastItemOnTop || instance.get('lastItemOnTop'),
            viewNode = instance._viewNode,
            listTypeUL = (instance.get('listType')==='ul'),
            itemTemplate = listTypeUL ? VIEW_EMPTY_ELEMENT_TEMPLATE_UL : VIEW_EMPTY_ELEMENT_TEMPLATE_TABLE,
            modelNode, viewsize, elementsize, modelElements,modelElementsSize, nrCells;

        Y.log('_addEmptyItem', 'info', 'Itsa-ModellistViewExtention');
        instance._removeEmptyItem();
        if (!lastModelNode) {
            modelElements = viewNode.all('.'+MODEL_CLASS);
            modelElementsSize = modelElements.size();
            if (modelElementsSize>0) {
                lastModelNode = modelElements.item(modelElementsSize-1);
            }
        }
        if (!listTypeUL) {
            // table itemTemplate --> we must set colspan
            nrCells = lastModelNode.all('>td').size();
        }
        itemTemplate = Lang.sub(itemTemplate, {cols: nrCells, content: ''});
        modelNode = YNode.create(itemTemplate),
        modelNode.addClass(EMPTY_ELEMENT_CLASS);
        viewsize = boundingBox.get(yAxis ? 'offsetHeight' : 'offsetWidth');
        if (lastModelNode) {
            if (yAxis) {
                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
        }
        lastModelNode = lastModelNode && lastModelNode.previous();
        if (itemOnTopValue===2) {
            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                if (yAxis) {
                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                lastModelNode = lastModelNode.previous();
            }
        }
        modelNode.setStyle((yAxis ? 'height' : 'width'), elementsize+'px');
        if (elementsize>0) {
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
        var instance = this,
            removeNode;

        Y.log('_removeEmptyItem', 'info', 'Itsa-ModellistViewExtention');
        removeNode = instance._viewNode.one('.'+EMPTY_ELEMENT_CLASS);
        if (removeNode) {
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
        var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itsainfiniteview'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        Y.log('_getNodeFromModelOrIndex', 'info', 'Itsa-ModellistViewExtention');
        if (model) {
            modelClientId = instance.getModelAttr(model, 'clientId');
        }
        findNode = function(node, loopindex) {
            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            if (found) {
                nodeFound = node;
            }
            return found;
        };
        do {
            nodeList = instance._viewNode.all('.'+MODEL_CLASS);
            nodeList.some(findNode);
            i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
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
        var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnode;

        if (modelid && (!itemUnselectable || force)) {
            Y.log('_selectModel '+instance.getModelAttr(model, "clientId")+' new selectstatus: '+selectstatus, 'info', 'Itsa-ModellistViewExtention');
            if (instance.hasPlugin('itsainfiniteview')) {
                // make sure the node is rendered
                instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            modelnode = contentBox.one('.'+modelid);
            if (modelnode) {
                if (!selectstatus) {
                    modelnode.blur();
                }
                modelnode.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            if (selectstatus) {
                instance._selectedModels[modelid] = model;
            }
            else {
                delete instance._selectedModels[modelid];
            }
        }
        else {
            if (!modelid) {
                Y.log('_selectModel --> no action taken: undefined Model', 'warn', 'Itsa-ModellistViewExtention');
            }
            else {
                Y.log('_selectModel --> cannot unselect Model --> there always should remain 1 selected', 'info', 'Itsa-ModellistViewExtention');
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
        var instance = this,
            selectedModels, originalModels;

        Y.log('_fireSelectedModels', 'info', 'Itsa-ModellistViewExtention');
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
        selectedModels = instance.getSelectedModels();
        originalModels = instance._abModelList ? instance.getSelectedModels(true) : selectedModels;
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
        Y.log('_clearEventhandlers', 'info', 'DTColumnResize');
        YArray.each(
            this._handlers,
            function(item){
                item.detach();
            }
        );
    }

}, true);

Y.ITSAModellistViewExtention = ITSAModellistViewExtention;