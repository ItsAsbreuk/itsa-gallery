'use strict';

/**
 * Extention ChangeModelTemplate
 *
 * Extention to ITSAModellistViewExtention that makes it possible to toggle templates per model.
 * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle
 * some of them. For instance: to transform from a 'normal'-state into 'editable'-state.
 *
 * @module gallery-itsachangemodeltemplate
 * @class ITSAChangeModelTemplate
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    isMicroTemplate = function(template) {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    };


function ITSAChangeModelTemplate() {}

Y.mix(ITSAChangeModelTemplate.prototype, {

    /**
     * Internal reference to the compiled alternate template.
     * @property _altTempl
     * @private
     * @default null
     * @type Function
    */
    _altTempl : null,

    /**
     * Internal flag to state whether the alternate template is of the type Y.Template.Micro
     * @property _altTemplIsMicro
     * @private
     * @default null
     * @type Boolean
    */
    _altTemplIsMicro : null,

    /**
     * Set the alternate template that will be used when changin the template.
     *
     * @method setSecondTemplate
     * @param {String} template The new template to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
     * @since 0.1
     *
    */
    setSecondTemplate: function(template) {
        var instance = this,
            compiledModelEngine, alternateTemplateIsMicro;

        Y.log('setSecondTemplate', 'info', 'Itsa-ChangeModelTemplate');
        if (!template || (template==='')) {
            instance._altTempl = null;
        }
        else {
            alternateTemplateIsMicro = instance._altTemplIsMicro = isMicroTemplate(template);
            if (alternateTemplateIsMicro) {
                compiledModelEngine = Y.TemplateMicro.compile(template);
                instance._altTempl = function(model) {
                    return compiledModelEngine(instance.getModelToJSON(model));
                };
            }
            else {
                instance._altTempl = function(model) {
                    return Lang.sub(template, instance.getModelToJSON(model));
                };
            }
        }
    },

    /**
     * Changes the template that is used for rendering this model to its second-version -defined with 'setSecondTemplate'.
     * Will do a re-render for only the modelnode that was bound to the model.
     *
     * @method renderSecondTemplate
     * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
     * @since 0.1
     *
    */
    renderSecondTemplate: function(model) {
        var instance = this,
            alternateTemplate = instance._altTempl,
            modelNode;

        Y.log('changeTemplate', 'info', 'Itsa-ChangeModelTemplate');
        modelNode = (Lang.isNumber(model) ? instance.getNodeFromIndex(model, 0) : instance.getNodeFromModel(model, 0));
        if (modelNode && alternateTemplate) {
            if (isMicroTemplate(instance.get('template'))) {
                modelNode.cleanup();
            }
            modelNode.setHTML(alternateTemplate(model));
        }
    },

    /**
     * Restores the standard-template that is used for rendering this model. Will do a re-render for only the modelnode that was bound to the model.
     * Restoring is useful after changing the template with 'changeTemplate()'.
     *
     * @method restoreTemplate
     * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
     * @since 0.1
     *
    */
    restoreTemplate: function(model) {
        var instance = this,
            modelNode;

        Y.log('restoreTemplate', 'info', 'Itsa-ChangeModelTemplate');
        modelNode = (Lang.isNumber(model) ? instance.getNodeFromIndex(model, 0) : instance.getNodeFromModel(model, 0));
        if (modelNode) {
            if (instance._altTempl && instance._altTemplIsMicro) {
                modelNode.cleanup();
            }
            modelNode.setHTML(instance._templFns.template(model));
        }
    }

}, true);

Y.ITSAChangeModelTemplate = ITSAChangeModelTemplate;
Y.Base.mix(Y.ITSAModellistViewExtention, [ITSAChangeModelTemplate]);