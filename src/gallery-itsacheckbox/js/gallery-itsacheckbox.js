var LANG = Y.Lang,
    OPTION = 'option',
    OPTION_CONTAINER = OPTION + 'container',
    OPTION_ON = OPTION + 'on',
    OPTION_BTN = OPTION + 'btn',
    OPTION_OFF = OPTION + 'off',
    ISIE = (Y.UA.ie>0),
    BOUNDINGBOX_BORDERWIDTH = 10,
    BTN_BORDERWIDTH = 4,
    TEMPLATE = '<div class="'+OPTION_CONTAINER+'"{unselectable}>'+
                   '<div class="'+OPTION_ON+'">{'+OPTION_ON+'}</div>'+
                   '<div class="'+OPTION_BTN+'"></div>'+
                   '<div class="'+OPTION_OFF+'">{'+OPTION_OFF+'}</div>'+
               '</div>',
    PARSEINT = function(value) {
        return parseInt(value, 10);
    };




Y.ITSACheckBox = Y.Base.create('itsacheckbox', Y.Widget, [], {
        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            Y.log('initializer', 'info', 'ITSADIALOGBOX');
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
            Y.log('renderUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                contentBox = instance.get('contentBox'),
                optionon = instance.get('optionon'),
                optionoff = instance.get('optionoff'),
                optionBtnNode, optionOffNode, radius, height, btnNodeSize, correctedPadding;
            contentBox.append(LANG.sub(TEMPLATE, {optionon: optionon, optionoff: optionoff, unselectable: (ISIE ? ' unselectable=on' : '')}));
            optionBtnNode = instance.optionBtnNode = contentBox.one('.'+OPTION_BTN);
            optionOffNode = optionBtnNode.next();
            // check height optionOnNode instead of optionBtnNode --> because that has a paddingtop
            height = optionOffNode.get('offsetHeight');
            instance.widthBtnNode = height;
            btnNodeSize = height-(2*BTN_BORDERWIDTH)+'px';
            optionBtnNode.setStyle('width', btnNodeSize);
            optionBtnNode.setStyle('height', btnNodeSize);
            radius = Math.round(height/2),
            optionBtnNode.setStyle('borderRadius', radius+'px');
            optionBtnNode.setStyle('marginLeft', -radius+'px');
            optionOffNode.setStyle('marginLeft', -radius+'px');
            correctedPadding = PARSEINT(optionOffNode.getStyle('paddingLeft'))+radius;
            optionOffNode.setStyle('paddingLeft', correctedPadding+'px');
            contentBox.setStyle('borderRadius', radius+(2*BTN_BORDERWIDTH)+'px');
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI
        */
        bindUI : function() {
/*
            Y.log('bindUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                boundingBox = instance.get('boundingBox');
            instance._eventhandlers.push(
               boundingBox.on('click', instance._toggleListbox, instance)
            );
*/
        },

        /**
         * Widget's syncUI-method. Syncs the right widths for the widget
         *
         * @method syncUI
        */
        syncUI : function() {
            Y.log('syncUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                optionBtnNode = instance.optionBtnNode,
                optionOnNode = optionBtnNode.previous(),
                optionOffNode = optionBtnNode.next(),
                boundingBox = instance.get('boundingBox'),
                containerNode = boundingBox.one('.'+OPTION_CONTAINER),
                paddingLeftOption = PARSEINT(optionOnNode.getStyle('paddingLeft')),
                paddingRightOption = PARSEINT(optionOnNode.getStyle('paddingRight')),
                widthBtnNode = instance.widthBtnNode,
                widthOnNode, widthOffNode, optionWidth;
            // reset customized width
            containerNode.setStyle('width', '');
            optionOnNode.setStyle('width', '');
            optionOffNode.setStyle('width', '');
            widthOnNode = optionOnNode.get('offsetWidth');
            widthOffNode = optionOffNode.get('offsetWidth');
            if (widthOnNode>widthOffNode) {
                optionOffNode.setStyle('width', (widthOnNode - paddingLeftOption - paddingRightOption)+'px');
                optionWidth = widthOnNode;
            }
            else {
                optionOnNode.setStyle('width', (widthOffNode - paddingLeftOption - paddingRightOption)+'px');
                optionWidth = widthOffNode;
            }
            total = optionWidth + widthBtnNode + (2*BOUNDINGBOX_BORDERWIDTH);
            boundingBox.setStyle('width', total+'px');
            total += optionWidth;
            containerNode.setStyle('width', total+'px');
            containerNode.setStyle('left', -optionWidth+BOUNDINGBOX_BORDERWIDTH+'px');

        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'info', 'ITSAFORM');
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
            }

        }
    }
);