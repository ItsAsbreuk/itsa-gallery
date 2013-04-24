gallery-itsaeditmodel
=====================

Plugin for Y.Model that extends Y.Model-instances into having editable properties.
After pluged-in, Each property can be rendered into a form-element by using: <b>yourModel.itsaeditmodel.formelement()</b>
You can also retreive a copy of the model's (or object's) attributes with: <b>yourModel.itsaeditmodel.toJSON()</b>


You may not need to call the plugin's methods yourself, but want to use one of the next 3 view-widgets who do this automaticly:

* [ITSAViewModel](src/gallery-itsaviewmodel) --> you need to plug this plugin into to viewed model
* [ITSAViewModelList](src/gallery-itsaviewmodellist) --> you need [Y.Plugin.ITSAChangeModelTemplate](src/gallery-itsachangemodeltemplate) to activate editmode
* [ITSAScrollViewModelList](src/gallery-itsascrollviewmodellist) --> you need [Y.Plugin.ITSAChangeModelTemplate](src/gallery-itsachangemodeltemplate) to activate editmode


The plugin can create form-elements of all Model's-attributes. It also can create the next UI-buttons: <i>button, submit, save, cancel, destroy</i>. In order to do so, you must declare 2 attributes:

* <b>'template'</b> where the Model's-attributes can be between brackets (it uses Y.Lang.sub() for this), or conform the Y.Template.Micro-format. Also the UI-buttons -which are not part of the model- can be declared between brackets: just make sure you use a unique name: '{firstname} {lastname} {send}'.
* <b>'editmodelConfigAttrs'</b> this is the configuration by which the plugin determines what type must be used for all specified properties within 'template'



Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsaeditmodel/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAEditModel.html)

Usage
-----

<b>Usage in conjunction with ITSAViewModel</b>
```js
YUI().use('model', 'gallery-itsaviewmodel', 'datatype-date-format', function(Y) {

    var viewmodel, model, modeltemplate, edittemplate, editmodelConfigAttrs;
    model = new Y.Model({
        artist: 'Madonna',
        country: 'USA',
        firstRelease: new Date(1983, 1, 1)
    });
    modeltemplate = '<%= data.artist %><br />'+
                    '<%= country %><br />'+
                    'First album released: <%= Y.Date.format(data.firstRelease, {format:"%d-%m-%Y"}) %>';
    edittemplate = 'Artist: {artist}<br />'+
                   'Country: {country}<br />'+
                   'First album released: {firstRelease}<br />'+
                   '{cancelButton} {saveButton}';

    editmodelConfigAttrs = {
        artist: {type: 'input'},
        country: {type: 'input'},
        firstRelease: {type: 'date', dateFormat: '%d-%m-%Y'},
        cancelButton: {type: 'cancel', buttonText: 'cancel'},
        saveButton: {type: 'save', buttonText: 'save'}
    };

    model.plug(Y.Plugin.ITSAEditModel, {template: edittemplate, editmodelConfigAttrs : editmodelConfigAttrs});

    viewmodel = new Y.ITSAViewModel({
        boundingBox: "#myview",
        width:'280px',
        height:'284px',
        template: modeltemplate,
        modelEditable: true,
        model: model
    });
    viewmodel.render();

});
```

<b>Usage in conjunction with ITSAViewModellist</b>
```js
YUI().use('model', 'lazy-model-list', 'gallery-itsaviewmodellist', 'gallery-itsachangemodeltemplate', 'datatype-date-format', function(Y) {

    var viewmodellist, onemodel, modellist, items, modeltemplate, edittemplate, editmodelConfigAttrs;
    items = [
        {
            artist: 'Madonna',
            country: 'USA',
            firstRelease: new Date(1983, 1, 1)
        },
        {
            artist: 'Marillion',
            country: 'UK',
            firstRelease: new Date(1983, 1, 1)
        }
    ];

    modellist = new Y.LazyModelList(items: items);

    modeltemplate = '<%= data.artist %><br />'+
                    '<%= country %><br />'+
                    'First album released: <%= Y.Date.format(data.firstRelease, {format:"%d-%m-%Y"}) %>';
    edittemplate = 'Artist: {artist}<br />'+
                   'Country: {country}<br />'+
                   'First album released: {firstRelease}<br />'+
                   '{cancelButton} {saveButton}';

    editmodelConfigAttrs = {
        artist: {type: 'input'},
        country: {type: 'input'},
        firstRelease: {type: 'date', dateFormat: '%d-%m-%Y'},
        cancelButton: {type: 'cancel', buttonText: 'cancel'},
        saveButton: {type: 'save', buttonText: 'save'}
    };

    viewmodelllist = new Y.ITSAViewModellist({
        boundingBox: "#myview",
        width:'280px',
        height:'600px',
        modelTemplate: modeltemplate,
        modelList: modellist
    });
    viewmodellist.plug(Y.Plugin.ITSAChangeModelTemplate, {modelsEditable: true, editmodelConfig: editmodelconfig});
    viewmodellist.render();

    onemodel = modellist.item(0); // no need to revive, ITSAChangeModelTemplate does this onder the hood
    scrollview.itsacmtemplate.setModelToEditTemplate(model);

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
