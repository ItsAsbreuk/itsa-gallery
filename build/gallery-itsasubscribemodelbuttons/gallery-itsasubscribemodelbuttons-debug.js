YUI.add('gallery-itsasubscribemodelbuttons', function (Y, NAME) {

'use strict';

/**
 * ITSASubscribeModelButtons Plugin
 *
 *
 * Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel
 *
 * The plugin makes that clicking on Buttons fire a <b>'buttonclick'</b>-event with e.model as an extra property.
 * Also, anchor-elements can be transformed to firing a <b>'anchorclick'</b>-event with e.model instead of the default behaviour.
 * You just need to add the className <b>'firemodel'</b> to the anchor-element to get this behaviour.
 *
 * e.model can be a Model-instance OR an object. This depends on the type that was rendered (using LazyModelList or ITSAViewModel with an object).
 *
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

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

/**
 * The plugin's host
 * @property host
 * @type ScrollView-instance
 */

var YArray = Y.Array,
    MODEL_CLASS = 'itsa-model',
    FIREMODEL = 'firemodel',
    ANCHOREVENT = 'anchorclick',
    BUTTONEVENT = 'buttonclick';

Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {

        _eventhandlers : [],
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
                contentBox = host.get('contentBox');

            Y.log('_bindUI', 'info', 'Itsa-SubscribeModelButtons');
            instance._eventhandlers.push(
                contentBox.delegate(
                    'click',
                    Y.rbind(instance._fireEvent, instance, BUTTONEVENT),
                    function() {
                        var node = this,
                            tagName = node.get('tagName'),
                            lastScrolledAmt = host.lastScrolledAmt,
                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));
                        return (!scrollingInAction && (tagName==='BUTTON'));
                    }
                )
            );
            instance._eventhandlers.push(
                contentBox.delegate(
                    'click',
                    Y.rbind(instance._fireEvent, instance, ANCHOREVENT),
                    function() {
                        var node = this,
                            tagName = node.get('tagName'),
                            lastScrolledAmt = host.lastScrolledAmt,
                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));
                        return (!scrollingInAction && ((tagName==='A') && node.hasClass(FIREMODEL)));
                    }
                )
            );
        },

        /**
         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.
         *
         * @method _fireEvent
         * @param {EventTarget} e
         * @private
         * @since 0.1
         *
        */
        _fireEvent : function(e, eventname) {
            var instance = this,
                host = instance.host,
                model, node, clientId, modelList;

            Y.log('_fireEvent', 'info', 'Itsa-SubscribeModelButtons');
            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available
            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'
            model = host.get('model');
            if (!model) {
                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList
                node = e.currentTarget.get('parentNode');
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
            if (model) {
                Y.log('_fireEvent fires event '+eventname, 'info', 'Itsa-SubscribeModelButtons');
                /**
                 * Is fired when the user clicks on a Button.
                 *
                 * @event buttonclick
                 * @param {Y.Node} currentTarget the node that was clicked.
                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.
                 *
                 * @event anchorclick
                 * @param {Y.Node} currentTarget the node that was clicked.
                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.
                 * @since 0.1
                **/
                e.model = model;
                if (eventname===ANCHOREVENT) {
                    e.preventDefault();
                }
                host.fire(eventname, e);
            }
            else {
                Y.log('_fireEvent cannot fire event '+eventname+ ' --> no model found', 'warn', 'Itsa-SubscribeModelButtons');

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

}, '@VERSION@', {"requires": ["base-build", "node-base", "event-custom", "node-event-delegate", "plugin"]});