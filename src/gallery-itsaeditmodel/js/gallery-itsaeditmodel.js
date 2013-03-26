'use strict';

/**
 * ScrollView ModelList Extention
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
    isMicroTemplate = function() {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    };


function ITSAChangeModelTemplate() {}

Y.mix(ITSAChangeModelTemplate.prototype, {

    /**
     * Changes the template that is used for rendering this model. Will do a re-render for only the modelnode that was bound to the model.
     *
     * @method changeTemplate
     * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
     * @param {String} template The new template to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
     * @since 0.1
     *
    */
    changeTemplate: function(model, template) {
        var instance = this;

        instance._alternateTemplates[model.get('clientId')] = alternateTemplate;
        instance._rerenderModel(model, alternateTemplate);
        Y.log('changeTemplate', 'info', 'Itsa-ChangeModelTemplate');
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
        var instance = this;

        Y.log('restoreTemplate', 'info', 'Itsa-ChangeModelTemplate');
        instance._rerenderModel(model, _templFns);
    },

    /**
     * Does a re-render for the modelnode that was bound to the model.
     *
     * @method _rerenderModel
     * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
     * @param {Function} templateRenderer The new template to be used. Must be rendered instance Y.Lang.sub() or Y.Template.Micro()
     * @private
     * @since 0.1
     *
    */
    _rerenderModel: function(model, templateRenderer) {
        var instance = this,
            original
            templateRenderer = templateRenderer || instance._templFns.modelTemplate;

        Y.log('_rerenderModel', 'info', 'Itsa-ChangeModelTemplate');
        if (isMicroTemplate(instance.get('modelTemplate'))) {
            modelNode.cleanup();
        }
        modelNode.setHTML(modelTemplate(model) || instance._templFns.modelTemplate(model));
    }

}, true);

Y.ITSAModellistViewExtention.ITSAChangeModelTemplate = ITSAChangeModelTemplate;

Y.Base.mix(Y.ITSAModellistViewExtention, [ITSAChangeModelTemplate]);

