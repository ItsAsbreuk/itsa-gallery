YUI.add('gallery-itsacheckbox', function (Y, NAME) {

var LANG = Y.Lang,
    CLASS_SLIDERBOX = 'sliderbox',
    TEMPLATE = '<div class="'+CLASS_SLIDERBOX+'"></div>',
    TEMPLATE_IE7 = '<div class="optionon">{optionon}</div><div class="'+CLASS_SLIDERBOX+'"></div><div class="optionoff">{optionoff}</div>',
    IE_VERSION = Y.UA.ie;




Y.ITSACheckBox = Y.Base.create('itsacheckbox', Y.Widget, [], {
        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            var instance = this;
/*
            instance.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                descendants: 'button, input, textarea',
                circular: true,
                focusClass: 'focus'
            });
            instance._initiatePanels();
*/
        },

        /**
         * Widget's renderUI-method. Creates the Selectlist in the DOM.
         *
         * @method renderUI
        */
        renderUI : function() {
            var instance = this,
                contentBox = instance.get('contentBox'),
                optionon = instance.get('optionon'),
                optionoff = instance.get('optionoff'),
                size = instance.get('size'),
                radius = Math.round(size/2),
                supportPseudo = ((IE_VERSION>7) || (IE_VERSION===0)),
                sliderbox;
alert(IE_VERSION);
            contentBox.append(supportPseudo ? TEMPLATE : LANG.sub(TEMPLATE_IE7, {optionon: optionon, optionoff: optionoff}));
            sliderbox = contentBox.one('.'+CLASS_SLIDERBOX);
            if (supportPseudo) {
                sliderbox.setAttribute('data-optionoff', optionoff);
                sliderbox.setAttribute('data-optionon', optionon);
            }
            sliderbox.setAttribute('data-size', size+'px');
            sliderbox.setAttribute('data-radius', radius+'px');
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI
        */
        bindUI : function() {
/*
            var instance = this,
                boundingBox = instance.get('boundingBox');
            instance._eventhandlers.push(
               boundingBox.on('click', instance._toggleListbox, instance)
            );
*/
        },

        /**
         *  Widget's syncUI-method. Renders the selectlist items
         *
         * @method syncUI
        */
        syncUI : function() {
            var instance = this;
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            var instance = this;
  /*
            if (instance.blurevent) {instance.blurevent.detach();}
            if (instance.keyevent) {instance.keyevent.detach();}
*/
        }

    }, {
        ATTRS : {
            /**
             * @description Label of the 'ON'-state
             * @attribute optionon
             * @type String
            */
            optionon : {
                value: 'ON',
                validator: function(val) {
                    return typeof val === 'string';
                }
            },

            /**
             * @description Label of the 'OFF'-state
             * @attribute optionoff
             * @type String
            */
            optionoff : {
                value: 'OFF',
                validator: function(val) {
                    return typeof val === 'string';
                }
            },

            /**
             * @description Size of the checkboxbutton in pixels
             * @attribute size
             * @type int
            */
            size : {
                value: 32,
                validator: function(val) {
                    return typeof val === 'number';
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["widget", "base-build"], "skinnable": true});
