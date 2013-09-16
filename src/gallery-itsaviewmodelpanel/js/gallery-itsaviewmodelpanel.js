'use strict';

/**
 *
 * Widget ITSAViewModelPanel
 *
 *
 * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default).
 * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added.
 *
 * These buttons are available by the module and will call Model's corresponding methods:
 *
 * close (visible by default)
 * add
 * destroy
 * reset
 * save
 * submit
 *
 *
 * @class ITSAViewModelPanel
 * @constructor
 * @extends ITSAViewModel
 * @uses WidgetAutohide
 * @uses WidgetButtons
 * @uses WidgetModality
 * @uses WidgetPosition
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @uses WidgetStack
 * @uses WidgetStdMod
 * @since 0.1
 */

var STRING = 'string',
    DEFAULT_FOOTERVIEW = '<div class="itsa-panelfooter">{footer}</div>',
    DEFAULT_HEADERVIEW = '<div class="itsa-panelheader">{header}<button class="itsa-alignright itsabutton-onlyicon"><i class="itsaicon-form-ok"></i></button></div>';

Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [
    // Other Widget extensions depend on these two.
    Y.WidgetPosition,
    Y.WidgetStdMod,

    Y.WidgetAutohide,
    Y.WidgetButtons,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
], null, {
    ATTRS: {
        /**
         * Change Panel-appearance after save is clicked.<br />
         * 0 = no action<br />
         * 1 = close panel<br />
         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />
         * @attribute actionAfterSave
         * @type Int
         * @default 0
         * @since 0.1
        */
        bodyView : {
            value: null,
            validator: function(val) {
                return (v===null) || (typeof val===STRING) || (val instanceof Y.View);
            }
        },
        footer : {
            value: null,
            validator: function(val) {
                return (v===null) || (typeof val===STRING);
            }
        },
        footerView : {
            value: null,
            validator: function(val) {
                return (v===null) || (typeof val===STRING) || (val instanceof Y.View);
            }
        },
        headerView : {
            value: DEFAULT_HEADERVIEW,
            validator: function(val) {
                return (v===null) || (typeof val====STRING) || (val instanceof Y.View);
            }
        },
        title : {
            value: null,
            validator: function(val) {
                return (v===null) || (typeof val===STRING);
            }
        }
    }
});