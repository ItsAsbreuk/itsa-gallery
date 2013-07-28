
gallery-itsachangemodeltemplate
===============================


Y.Plugin.ITSAChangeModelTemplate which can be used for Y.ITSAViewModellist- or Y.ITSAScrollViewModellist-instances.


The plugin makes it possible to toggle templates per model. This might be useful if your (scroll)viewModellist has many rendered models,
where you need to toggle some of them. There are three different states:


 1. 'originalTemplate' (standard defined by the host)
 2. 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 3. 'editTemplate' (can be set up within this plugin: to edit the Models)


Be aware that 'secondTemplate' and 'editTemplate' are used for rendering <i>all Models</i> that are in state 2 or 3.


If you need the buttons with the same style on the original template as how are styled inside the editTemplate, then use:
```html
<button type="button" class="yui3-button">press me</button>
```

If you use buttons or anchor-elements within the 'originalTemplate', you can make advantage of some techniques that make buttons 'know' in which model they are active:


Render the original template by calling host.setModelToOriginalTemplate() on the model:
```html
<button type="button" class="yui3-button originaltemplate">press me</button>
<a class="originaltemplate">press me</a>
```


Render the second-template by calling host.setModelToSecondTemplate() on the model
```html
<button type="button" class="yui3-button secondtemplate">press me</button>
<a class="secondtemplate">press me</a>
```


Render the edit-template by calling host.setModelToEditTemplate() on the model
```html
<button type="button" class="yui3-button edittemplate">press me</button>
<a class="edittemplate">press me</a>
```


For all other actions that need to be done. This plugin will make the buttons fire a model:buttonclick or model:anchorclick
```html
<button type="button" class="yui3-button">press me</button> with the use plugin [Y.Plugin.ITSASubscribeModelButtons](src/gallery-itsasubscribemodelbuttons)
<a class="firemodel">press me</a>
```



<i>To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
through to Y.Plugin.ITSAEditModel.</i> Should you use a LazyModelList, then the editable Object is revived into a Model. For performance-reasons,
the revived models will not be freed: you may want to do this yourself.


<b>Caution:</b> If you do not need to change templates, then better NOT use this plugin. The plugin will slower rendering of all items,
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
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'gallery-itsachangemodeltemplate', 'lazy-model-list', function(Y) {
var myModellist, rendertemplate, secondrendertemplate, myScrollview, changeModelTemplateConfig;

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

rendertemplate = '{Country} <button type="button" class="yui3-button secondtemplate">show details</button>';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendertemplate,
    axis: 'y',
    modelList: myModellist
});

//----- defining everything we need to know about Y.Plugin.ITSAChangeModelTemplate -----

secondrendertemplate = '{Country} is part of continental {Continental} <button type="button" class="yui3-button originaltemplate">hide details</button>';
changeModelTemplateConfig = {
    secondTemplate: secondrendertemplate
};

//--------------------------------------------------------------------------------------

myScrollview.plug(Y.Plugin.ITSAChangeModelTemplate, changeModelTemplateConfig);

myScrollview.render();

});
```

<b>Change Models into editable form</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'gallery-itsachangemodeltemplate', 'lazy-model-list', function(Y) {
var myModellist, rendertemplate, myScrollview, editmodeltemplate, editmodelConfigAttrs, configForEditModel, changeModelTemplateConfig;

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

rendertemplate = '{Country} <button type="button" class="yui3-button edittemplate">edit</button>';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendertemplate,
    axis: 'y',
    modelList: myModellist
});

//----- defining everything we need to know about Y.Plugin.ITSAChangeModelTemplate -----

editmodeltemplate = 'continental: {Continental}<br />'+
                        'country: {Country}<br />'+
                        '{Reset} {Close} {Save}';

editmodelConfigAttrs = {
    Continental: {type: 'input', selectOnFocus: true},
    Country: {type: 'textarea', initialFocus: true},
    Reset: {type: 'reset', buttonText: 'reset'},
    Close: {type: 'stopedit', buttonText: 'close'},
    Save: {type: 'save', buttonText: 'save'}
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

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
