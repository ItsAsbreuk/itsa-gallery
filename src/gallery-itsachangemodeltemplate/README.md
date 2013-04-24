
gallery-itsachangemodeltemplate
===============================


Y.Plugin.ITSAChangeModelTemplate which can be used for Y.ITSAViewModellist- or Y.ITSAScrollViewModellist-instances.


The plugin makes it possible to toggle templates per model. This might be useful if your (scroll)viewModellist has many rendered models,
where you need to toggle some of them. There are three different states:


 1. Original Template (standard defined by the host)
 2. 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 3. 'editTemplate' (can be set up within this plugin: to edit the Models)


Be aware that 'secondTemplate' and 'editTemplate' are used for rendering <i>all Models</i> that are in state 2 or 3.


If you need the buttons with the same style on the normal template as how are styled inside the editTemplate, then use:
```html
<input type="button" value="edit" class="yui3-button" />
```
<b>Note:</b> If you use buttons on every model-item, it is strongly suggested to plugin [Y.Plugin.ITSASubscribeModelButtons](src/gallery-itsasubscribemodelbuttons)


<i>To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
through to Y.Plugin.ITSAEditModel.</i> Should you use a LazyModelList, then the editable Object is revived into a Model. For performance-reasons,
the revived models will not be freed: you may want to do this yourself.


<b>Caution:</b> If you do not need to change templates, then better not use this plugin. The plugin will slower rendering of all items,
because the host needs to check what template to use for every single item.

NS: <b>itsacmtemplate</b>

Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsachangemodeltemplate/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAChangeModelTemplate.html)

Usage
-----

<b>Change Models into detailed form</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', 'gallery-itsasubscribemodelbuttons', function(Y) {
var myModellist, rendermodel, secondrendermodel, myScrollview, changeModelTemplateConfig;

//----- defining the LazyModelList -----------------------------------------------------
myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    return model.Country.toUpperCase();
};
myModellist.add([
    {Country: 'The Netherlands', Continental: 'Europe'},
    {Country: 'USA', Continental: 'North-America'},
    {},
    ....
]);
//--------------------------------------------------------------------------------------


rendermodel = '{Country} <input type="button" value="show details" class="yui3-button" />';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    axis: 'y',
    modelList: myModellist
});


//----- defining everything we need to know about Y.Plugin.ITSAChangeModelTemplate -----
secondrendermodel = '{Country} is part of continental {Continental} <input type="button" value="hide details" class="yui3-button" />';

changeModelTemplateConfig = {
    secondTemplate: secondrendermodel
};
//--------------------------------------------------------------------------------------
myScrollview.plug(Y.Plugin.ITSAChangeModelTemplate, changeModelTemplateConfig);
myScrollview.plug(Y.Plugin.ITSASubscribeModelButtons); // making models to fie 'model:buttonclick'

myScrollview.render();

//--------------------------------------------------------------------------------------
myScrollview.on(
    'model:buttonclick',
    function(e){
        var model = e.target,
            node = e.node;
        if (node.getAttribute('value')==='show details') {
            myScrollview.itsacmtemplate.setModelToSecondTemplate(model);
        }
        if (node.getAttribute('value')==='hide details') {
            myScrollview.itsacmtemplate.setModelToOriginalTemplate(model);
        }
    }
);
//--------------------------------------------------------------------------------------

});
```

<b>Change Models into editable form</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', 'gallery-itsasubscribemodelbuttons', function(Y) {
var myModellist, rendermodel, myScrollview, editmodeltemplate, editmodelConfigAttrs, configForEditModel, changeModelTemplateConfig;

//----- defining the LazyModelList -----------------------------------------------------
myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    return model.Country.toUpperCase();
};
myModellist.add([
    {Country: 'The Netherlands'},
    {Country: 'USA'},
    {},
    ....
]);
//--------------------------------------------------------------------------------------


rendermodel = '{Country} <input type="button" value="edit" class="yui3-button" />';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    axis: 'y',
    modelList: myModellist
});


//----- defining everything we need to know about Y.Plugin.ITSAChangeModelTemplate -----
editmodeltemplate = 'continental: {Continental}<br />'+
                        'country: {Country}<br />'+
                        '{Reset} {Cancel} {Save}';

editmodelConfigAttrs = {
    Continental: {type: 'input', selectOnFocus: true},
    Country: {type: 'textarea', initialFocus: true},
    Save: {type: 'save', buttonText: 'save'},
    Cancel: {type: 'button', buttonText: 'cancel'},
    Reset: {type: 'reset', buttonText: 'reset'}
};

configForEditModel = {
    updateMode: 1
};

changeModelTemplateConfig = {
    editTemplate: editmodeltemplate,
    editmodelConfigAttrs: editmodelConfigAttrs,
    configForEditModel: configForEditModel
};
//--------------------------------------------------------------------------------------
scrollview.plug(Y.Plugin.ITSAChangeModelTemplate, changeModelTemplateConfig);

myScrollview.render();

//--------------------------------------------------------------------------------------
myScrollview.on(
    'model:buttonclick',
    function(e){
        var model = e.target,
            node = e.node;
        if (node.getAttribute('value')==='edit') {
            myScrollview.itsacmtemplate.setModelToEditTemplate(model);
        }
        if (node.getAttribute('value')==='cancel') {
            myScrollview.itsacmtemplate.setModelToOriginalTemplate(model);
        }
    }
);
myScrollview.after(
    'model:saveclick',
    function(e){
        var model = e.target,
            node = e.node;
        myScrollview.itsacmtemplate.setModelToOriginalTemplate(model);
    }
);
//--------------------------------------------------------------------------------------

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
