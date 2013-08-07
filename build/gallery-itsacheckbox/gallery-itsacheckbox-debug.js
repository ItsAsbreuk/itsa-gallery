YUI.add('gallery-itsacheckbox', function (Y, NAME) {

var LANG = Y.Lang,
    YARRAY = Y.Array,
    WIDGET_CLASS = 'yui3-itsacheckbox',
    READONLY = 'readonly',
    READONLY_CLASS = WIDGET_CLASS + '-' + READONLY,
    LOADING_CLASS = WIDGET_CLASS + '-loading',
    HIDDEN_CLASS = WIDGET_CLASS + '-hidden',
    OPTION = 'option',
    OPTION_WRAPPER = OPTION + 'wrapper',
    OPTION_CONTAINER = OPTION + 'container',
    OPTION_ON = OPTION + 'on',
    OPTION_BTN = OPTION + 'btn',
    OPTION_OFF = OPTION + 'off',
    ISIE = (Y.UA.ie>0),
    BOUNDINGBOX = 'boundingBox',
    PADDINGLEFT = 'paddingLeft',
    PADDINGRIGHT = 'paddingRight',
    WIDTH = 'width',
    HEIGHT = 'height',
    OFFSETWIDTH = 'offsetWidth',
    OFFSETHEIGHT = 'offsetHeight',
    BORDERRADIUS = 'borderRadius',
    MARGINLEFT = 'marginLeft',
    PX = 'px',
    LEFT = 'left',
    DISABLED = 'disabled',
    CHECKED = 'checked',
    BTN_BORDERWIDTH = 1,
    DIVCLASS = '<div class="',
    ENDDIV = '</div>',
    TEMPLATE = DIVCLASS+OPTION_WRAPPER+'">'+
                   DIVCLASS+OPTION_CONTAINER+'"{unselectable}>'+
                       DIVCLASS+OPTION_ON+'">{'+OPTION_ON+'}'+ENDDIV+
                       DIVCLASS+OPTION_BTN+'">'+ENDDIV+
                       DIVCLASS+OPTION_OFF+'">{'+OPTION_OFF+'}'+ENDDIV+
                   ENDDIV+
               ENDDIV,
    PARSEINT = function(value) {
        return parseInt(value, 10);
    };




Y.ITSACheckBox = Y.Base.create('itsacheckbox', Y.Widget, [], {

        /**
         * @property {String} CONTENT_TEMPLATE
         * @public
         */
        CONTENT_TEMPLATE : null, // set contentBox===boundingBox will also make srcNode not to render inside boundingBox

        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            Y.log('initializer', 'info', 'ITSADIALOGBOX');
            var instance = this,
                boundingBox = instance.get(BOUNDINGBOX);
            // in case loadingclass is not added to the boundingBox, provide it here
            boundingBox.addClass(LOADING_CLASS);
            if (instance.get(READONLY)) {
                boundingBox.addClass(READONLY_CLASS);
            }
            instance._eventhandlers = [];
        },

        /**
         * Widget's renderUI-method. Creates the Selectlist in the DOM.
         *
         * @method renderUI
        */
        renderUI : function() {
            Y.log('renderUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                src;
            src = instance.get('srcNode');
            if (src && (src.get('tagName')==='INPUT') && (src.getAttribute('type')==='checkbox')) {
                instance.src = Y.one(src);
                src.addClass(HIDDEN_CLASS);
                src.removeClass(LOADING_CLASS); // if provided to hide, we don't need it anymore
                instance.get(BOUNDINGBOX).insert(src, 'before');
            }
            instance._setOptionLabels();
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI
        */
        bindUI : function() {
            Y.log('bindUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                boundingBox = instance.get(BOUNDINGBOX),
                dd;

            instance.dd = dd = new Y.DD.Drag({
                node: instance.containerNode,
                lock: instance.get(DISABLED) || instance.get(READONLY)
            }).plug(Y.Plugin.DDConstrained, {
                constrain: instance.wrapperNode
            });

            dd.on('drag:end', function(e){
                if (!instance._xpos) {
                    // didn't define it during rendering, while the class LOADING_CLASS made the x-pos negative
                    instance._xpos = instance.get(BOUNDINGBOX).getX();
                }
                var offset = (e.pageX-instance._xpos);
                // when at most right, the offset will be zero, otherwise it is negative
                instance.set(CHECKED, (offset>=-instance._changePosition));
            });

            instance._eventhandlers.push(
                instance.on('checkedChange', function(e) {
                    var checked = e.newVal;
                    instance._goFinal(checked);
                    if (instance.src) {
                        if (checked) {
                            instance.src.setAttribute(CHECKED, CHECKED);
                        }
                        else {
                            instance.src.removeAttribute(CHECKED);
                        }
                    }
                })
            );

            instance._eventhandlers.push(
                instance.on(
                    [OPTION_ON+'Change', OPTION_OFF+'Change'],
                    Y.bind(instance._setOptionDimensions, instance)
                )
            );

            instance._eventhandlers.push(
                instance.on(DISABLED+'Change', function(e) {
                    var disabled = e.newVal;
                    dd.set('lock', disabled || instance.get(READONLY));
                    instance._goFinal(instance.get(CHECKED, true), true);
                    if (instance.src) {
                        if (disabled) {
                            instance.src.setAttribute(DISABLED, DISABLED);
                        }
                        else {
                            instance.src.removeAttribute(DISABLED);
                        }
                    }
                })
            );

            instance._eventhandlers.push(
                instance.on(READONLY+'Change', function(e) {
                    var readonly = e.newVal;
                    boundingBox.toggleClass(READONLY_CLASS, readonly);
                    dd.set('lock', readonly|| instance.get(DISABLED));
                    instance._goFinal(instance.get(CHECKED, true), true);
                    if (instance.src) {
                        if (readonly) {
                            instance.src.setAttribute(READONLY, READONLY);
                        }
                        else {
                            instance.src.removeAttribute(READONLY);
                        }
                    }
                })
            );

            instance._eventhandlers.push(
                instance.containerNode.on('tap', function() {
                    instance.set(CHECKED, !instance.get(CHECKED));
                })
            );

            instance._eventhandlers.push(
                Y.on('keypress', function(e) {
                    if (instance.get('focused')) {
                        var keyCode = e.keyCode;
                        if ((keyCode === 37) || (keyCode === 40)) {
                            instance.set(CHECKED, false);
                        }
                        else if ((keyCode === 39) || (keyCode === 38)) {
                            instance.set(CHECKED, true);
                        }
                        else if (keyCode === 32) {
                            instance.set(CHECKED, !instance.get(CHECKED));
                        }
                    }
                })
            );
        },

        _goFinal : function(checked, force) {
            var instance = this;
            if (checked) {
                instance._goRight(true, force);
            }
            else {
                instance._goLeft(true, force);
            }
        },

        _goLeft : function(animated, force) {
console.log('goleft');
            var instance = this,
                containerNode = instance.containerNode;
            if ((!instance.get(DISABLED) && !instance.get(READONLY)) || force) {
                if (animated) {
                    instance._moveAnimated(0);
                }
                else {
                    containerNode.setStyle(LEFT, '0');
                }
            }
        },

        _goRight : function(animated, force) {
console.log('goright');
            var instance = this,
                containerNode = instance.containerNode;
            if ((!instance.get(DISABLED) && !instance.get(READONLY)) || force) {
                if (animated) {
                    instance._moveAnimated(instance._onPosition);
                }
                else {
                    containerNode.setStyle(LEFT, instance._onPosition+PX);
                }
            }
        },

        _moveAnimated : function(xpos) {
            var instance = this;
            instance.containerNode.transition({
                easing: 'ease-in',
                duration: instance.get('duration'), // 0.75  seconds
                left: xpos+PX
            });
        },

        getValue : function() {
            return this.get(CHECKED);
        },

        /**
         * Widget's syncUI-method. Syncs the right widths for the widget
         *
         * @method syncUI
        */
        syncUI : function() {
            Y.log('syncUI ', 'cmas', 'ITSASelectList');
            var instance = this;
            instance._setContainerDimensions();
            instance._setOptionDimensions();
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor : function() {
            Y.log('destructor', 'info', 'ITSAFORM');
            var instance = this,
                dd = instance.dd,
                src = instance.src;
            if (dd) {
                dd.destroy();
            }
            instance._clearEventhandlers();
            if (src) {
                src.removeClass(HIDDEN_CLASS);
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
            Y.log('_clearEventhandlers', 'info', 'DTColumnResize');
            YARRAY.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        _setContainerDimensions : function() {
            Y.log('renderUI ', 'cmas', 'ITSASelectList');
            var instance = this,
                boundingBox = instance.get(BOUNDINGBOX),
                optionBtnNode, optionOnNode, optionOffNode, radius, height, btnNodeSize, correctedPadding;
            optionBtnNode = instance.optionBtnNode;
            optionOnNode = optionBtnNode.previous();
            optionOffNode = optionBtnNode.next();
            // check height optionOnNode instead of optionBtnNode --> because that has a paddingtop
            height = optionOffNode.get(OFFSETHEIGHT);
            instance.widthBtnNode = height;
            btnNodeSize = height-(2*BTN_BORDERWIDTH)+PX;
            optionBtnNode.setStyle(WIDTH, btnNodeSize);
            optionBtnNode.setStyle(HEIGHT, btnNodeSize);

            instance.radius = radius = Math.round(height/2),
            optionBtnNode.setStyle(BORDERRADIUS, radius+PX);
            optionBtnNode.setStyle(MARGINLEFT, -radius+PX);
            optionOffNode.setStyle(MARGINLEFT, -radius+PX);
            optionOnNode.setStyle(BORDERRADIUS, radius+PX+ ' 0 0 0');
            optionOffNode.setStyle(BORDERRADIUS, '0 '+radius+PX + ' 0 0');
            // reset padding to have only stylesheet
            optionOnNode.setStyle(PADDINGRIGHT, '');
            optionOnNode.setStyle(PADDINGLEFT, '');
            optionOffNode.setStyle(PADDINGRIGHT, '');
            optionOffNode.setStyle(PADDINGLEFT, '');
            // apply new padding
            correctedPadding = PARSEINT(optionOnNode.getStyle(PADDINGLEFT))+radius;
            optionOnNode.setStyle(PADDINGLEFT, correctedPadding+PX);
            correctedPadding = PARSEINT(optionOnNode.getStyle(PADDINGRIGHT))+radius;
            optionOnNode.setStyle(PADDINGRIGHT, correctedPadding+PX);
            correctedPadding = PARSEINT(optionOffNode.getStyle(PADDINGLEFT))+radius;
            optionOffNode.setStyle(PADDINGLEFT, correctedPadding+PX);
            correctedPadding = PARSEINT(optionOffNode.getStyle(PADDINGRIGHT))+radius;
            optionOffNode.setStyle(PADDINGRIGHT, correctedPadding+PX);
            // set radius boundingBox
            boundingBox.setStyle(BORDERRADIUS, radius+(2*BTN_BORDERWIDTH)+PX);
        },

                /**
         * Widget's syncUI-method. Syncs the right widths for the widget
         *
         * @method _setContainerDimensions
        */
        _setOptionDimensions : function() {
            Y.log('_setOptionDimensions ', 'cmas', 'ITSASelectList');
            var instance = this,
                optionBtnNode = instance.optionBtnNode,
                optionOnNode = optionBtnNode.previous(),
                optionOffNode = optionBtnNode.next(),
                boundingBox = instance.get(BOUNDINGBOX),
                containerNode = boundingBox.one('.'+OPTION_CONTAINER),
                paddingLeftOptionOn = PARSEINT(optionOnNode.getStyle(PADDINGLEFT)),
                paddingRightOptionOn = PARSEINT(optionOnNode.getStyle(PADDINGRIGHT)),
                paddingLeftOptionOff = PARSEINT(optionOffNode.getStyle(PADDINGLEFT)),
                paddingRightOptionOff = PARSEINT(optionOffNode.getStyle(PADDINGRIGHT)),
                radius = instance.radius,
                widthOnNode, widthOffNode, optionWidth, onPosition;
            // reset customized width
            containerNode.setStyle(WIDTH, '');
            optionOnNode.setStyle(WIDTH, '');
            optionOffNode.setStyle(WIDTH, '');
            widthOnNode = optionOnNode.get(OFFSETWIDTH);
            widthOffNode = optionOffNode.get(OFFSETWIDTH);
            if (widthOnNode>widthOffNode) {
                optionOffNode.setStyle(WIDTH, (widthOnNode - paddingLeftOptionOff - paddingRightOptionOff)+PX);
                optionWidth = widthOnNode;
            }
            else {
                optionOnNode.setStyle(WIDTH, (widthOffNode - paddingLeftOptionOn - paddingRightOptionOn)+PX);
                optionWidth = widthOffNode;
            }
            onPosition = instance._onPosition = optionWidth-radius;

            total = optionWidth + radius - 1; // always 1 less, to correct rounderror of radius
            boundingBox.setStyle(WIDTH, total+PX);
            total += optionWidth;
            containerNode.setStyle(WIDTH, total+PX);


            total += optionWidth - radius;
            instance.wrapperNode.setStyle(WIDTH, total+PX);
            instance.wrapperNode.setStyle(LEFT, -onPosition +PX);
            // instance._changePosition is 1.5 time, because the wrapper li
            instance._changePosition = Math.round(onPosition/2);
            if (instance.get(CHECKED)) {
                instance._goRight(false, true);
            }
            else {
                instance._goLeft(false, true);
            }
        },

        _setOptionLabels : function() {
            Y.log('_setOptionLabels', 'cmas', 'ITSASelectList');
            var instance = this,
                boundingBox = instance.get(BOUNDINGBOX),
                optionon = instance.get(OPTION_ON),
                optionoff = instance.get(OPTION_OFF);
            boundingBox.setHTML(LANG.sub(TEMPLATE, {optionon: optionon, optionoff: optionoff, unselectable: (ISIE ? ' unselectable=on' : '')}));
            instance.wrapperNode = boundingBox.one('.'+OPTION_WRAPPER);
            instance.containerNode = boundingBox.one('.'+OPTION_CONTAINER);
            instance.optionBtnNode = boundingBox.one('.'+OPTION_BTN);
        },

        _srcNodeValidCheckbox : function(srcNode) {
            return ((srcNode.get('tagName')==='INPUT') && (srcNode.getAttribute('type')==='checkbox'));
        }

    }, {
        ATTRS : {
            /**
             * @description Label of the 'ON'-state
             * @attribute checked
             * @type Boolean
            */
            checked : {
                value: false,
                validator: function(val) {
                    return (typeof val === 'boolean') && !this.get(DISABLED) && !this.get(READONLY);
                },
                getter: function(val, force) {
                    return (((!this.get(DISABLED) && !this.get(READONLY)) || force) ? val : null);
                }
            },

            /**
             * @description Label of the 'ON'-state
             * @attribute duration
             * @type Int
            */
            duration : {
                value: 0.15,
                validator: function(val) {
                    return typeof val === 'number';
                }
            },

            /**
             * @description Label of the 'ON'-state
             * @attribute optionon
             * @type String
            */
            optionon : {
                value: 'I',
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
                value: 'O',
                validator: function(val) {
                    return typeof val === 'string';
                }
            },

            /**
             * @description Label of the 'OFF'-state
             * @attribute optionoff
             * @type Boolean
            */
            readonly : {
                value: false,
                validator: function(val) {
                    return typeof val === 'boolean';
                }
            }

        },
        HTML_PARSER: {
            checked: function (srcNode) {
                var checked = (srcNode.getAttribute(CHECKED).toLowerCase()===CHECKED);
                return (this._srcNodeValidCheckbox(srcNode) && checked);
            },
            readonly: function (srcNode) {
                var readonly = (srcNode.getAttribute(READONLY).toLowerCase()===READONLY);
                return (this._srcNodeValidCheckbox(srcNode) && readonly);
            },
            disabled: function (srcNode) {
                var disabled = (srcNode.getAttribute(DISABLED).toLowerCase()===DISABLED);
                return (this._srcNodeValidCheckbox(srcNode) && disabled);
            }
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-base",
        "dom-screen",
        "widget",
        "base-build",
        "dd-drag",
        "dd-constrain",
        "event-tap",
        "transition"
    ],
    "skinnable": true
});
