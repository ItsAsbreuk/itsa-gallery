'use strict';

/**
 * ITSASubscribeModelButtons Plugin
 *
 *
 * Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel
 *
 * The plugin makes that clicking on some elements within the Model causes the <i>Modelinstance</i> fire an event.
 *
 * Be aware that -in case of LazyModelList- the objects are revived into Modelinstances and not freed. You may want to use
 * ITSAViewModel.get('modelList').free(model) in the subscriber after handling the event.
 * This also means that -within the subscriber- e.target is always a Modelinstance.
 *
 * 1. <i>buttons</i> or <i>input[type=button]</i> fire a <b>'model:buttonclick'</b>-event
 * 2. <i>a (anchor)-elements with class '.firemodel'</i> will fire a <b>'model:anchorclick'</b>-event <i>instead of the default behaviour</i>
 * 3. <i>DateTime-buttons</i> fire a <b>'model:datetimeclick'</b>-event <i>determined by the class '.itsa-button-datetime'</i>
 *
 * NS: 'itsamodelbtn'
 *
 * @module gallery-itsasubscribemodelbuttons
 * @class ITSASubscribeModelButtons
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------

var YArray = Y.Array,
    MODEL_CLASS = 'itsa-model',
    FIREMODEL = 'firemodel',
    ANCHOREVENT = 'anchorclick',
    BUTTONEVENT = 'buttonclick',
    DATETIMEEVENT = 'datetimeclick',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton';

Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {

        /**
         * Internal list that holds event-references
         * @property _eventhandlers
         * @private
         * @type Array
         */
        _eventhandlers : [],

        /**
         * The plugin's host, which should be a ScrollView-instance
         * @property host
         * @type Y.ITSAViewModellist|Y.ITSAScrollViewModellist-instance
         */
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this;

            Y.log('initializer', 'info', 'Itsa-SubscribeModelButtons');
            instance.host = instance.get('host');
            instance._bindUI();
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            Y.log('destructor', 'info', 'Itsa-SubscribeModelButtons');
            this._clearEventhandlers();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            var instance = this,
                host = instance.host,
                boundingBox = host.get('boundingBox');

            Y.log('_bindUI', 'info', 'Itsa-SubscribeModelButtons');
            instance._eventhandlers.push(
                boundingBox.delegate(
                    'click',
                    Y.rbind(instance._fireCustomEvent, instance),
                    function() {
                        return this.test('button,input[type=button],a.'+FIREMODEL+
                                         ',.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    }
                )
            );
        },

        /**
         * Will make the model fire an event (either model:buttonclick, model:anchorclick or model:datetimeclick).
         *
         * @method _fireCustomEvent
         * @param {EventTarget} e
         * @private
         * @since 0.1
         *
        */
        _fireCustomEvent : function(e) {
            var instance = this,
                host = instance.host,
                model, node, clientId, modelList, tagName, eventtype, isModelInstance;

            Y.log('_checkAndFire proceeding (not scrolling a scrollview-instance)', 'info', 'Itsa-SubscribeModelButtons');
            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available
            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'
            model = host.get('model');
            node = e.currentTarget;
            tagName = node.get('tagName');

            if ((tagName==='BUTTON') || (tagName==='INPUT')) {
                if (node.hasClass(ITSABUTTON_DATETIME_CLASS)) {
                    eventtype = DATETIMEEVENT;
                }
                else {
                    eventtype = BUTTONEVENT;
                }
            }
            else if (tagName==='A') {
                eventtype = ANCHOREVENT;
                e.preventDefault();
            }
            else {
                eventtype = e.type;
            }
            if (!model) {
                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList
                node = node.get('parentNode');
                while (node && !node.hasClass(MODEL_CLASS)) {
                    node = node.get('parentNode');
                }
                if (node && node.hasClass(MODEL_CLASS)) {
                    // found the node-element that holds the model
                    clientId = node.getData('modelClientId');
                    modelList = host.getModelListInUse && host.getModelListInUse();
                    model = modelList && modelList.getByClientId(clientId);
                }
            }
            // now make sure model is a Model and not an object of LazyModelList
            isModelInstance = (model.get && (typeof model.get==='function'));
            if (!isModelInstance) {
                modelList = modelList || (host.getModelListInUse && host.getModelListInUse());
                model = modelList.revive(model);
            }
            if (model) {
                Y.log('_checkAndFire fires event '+eventtype, 'info', 'Itsa-SubscribeModelButtons');
                /**
                 * Is fired when the user clicks on a <b>button</b> or a <input[type=button]</b>.
                 *
                 * @event model:buttonclick
                 * @param node {Y.Node} the button - or input[type=button] - that was clicked.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.
                 *
                 * @event model:anchorclick
                 * @param node {Y.Node} the anchor-elementnode that was clicked.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a datetime-icon (see gallery-itsadatetimepicker).
                 *
                 * @event model:datetimeclick
                 * @param node {Y.Node} the node that was clicked.
                 * @since 0.1
                **/
                e.type = eventtype;
                e.node = e.currentTarget;
                model.fire(eventtype, e);
            }
            else {
                Y.log('_checkAndFire cannot fire event '+eventtype+ ' --> no model found', 'warn', 'Itsa-SubscribeModelButtons');
            }
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-SubscribeModelButtons');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        }

    }, {
        NS : 'itsamodelbtn',
        ATTRS : {
        }
    }
);