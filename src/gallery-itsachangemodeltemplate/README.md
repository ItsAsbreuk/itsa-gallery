
gallery-itsachangemodeltemplate
===============================


Y.Plugin.ITSAChangeModelTemplate which can be used for Y.ITSAViewModellist- or Y.ITSAScrollViewModellist-instances.


The plugin makes it possible to toggle templates per model. This might be useful if your (scroll)viewModellist has many rendered models,
where you need to toggle some of them. There are three different states:


 1. Original Template (standard defined by the host)
 2. 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 3. 'editTemplate' (can be set up within this plugin: to edit the Models)


Be aware that 'secondTemplate' and 'editTemplate' are used for rendering <i>all Models</i> that are in stae 2 or 3.


If you need the buttons with the same style on the normal template as how are styled inside the editTemplate, then use:
```html
<input type="button" value="edit" class="yui3-button" />
```

<i>To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
through to Y.Plugin.ITSAEditModel.</i>


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsachangemodeltemplate/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAChangeModelTemplate.html)

Usage
-----

<b>View rendered as unsorted list</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview, editmodeltemplate, editmodelConfigAttrs, configForEditModel, changeModelTemplateConfig;

//----- defining the LazyModelList -----------------------------------------------------
myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    return model.Continental.toUpperCase() + model.Country.toUpperCase();
};
myModellist.add([
    {Country: 'The Netherlands'},
    {Country: 'USA'},
    {},
    ....
]);
//--------------------------------------------------------------------------------------


rendermodel = '{Continental}';
groupheader = '<%= data.Country.substr(0,1).toUpperCase() %>';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist
});


//----- defining everything we need to know about Y.Plugin.ITSAChangeModelTemplate -----
editmodeltemplate = 'continental: {Continental}<br />'+
                        'country: {Country}<br />'+
                        '{Save} {Reset}';

editmodelConfigAttrs = {
    Continental: {type: 'input', selectOnFocus: true},
    Country: {type: 'textarea', initialFocus: true},
    Save: {type: 'save', buttonText: 'bewaren'},
    Reset: {type: 'reset', buttonText: 'resetten'}
};

configForEditModel = {
    updateMode: 1
};

changeModelTemplateConfig = {
    modelsEditable: true,
    editTemplate: editmodeltemplate,
    editmodelConfigAttrs: editmodelConfigAttrs,
    configForEditModel: configForEditModel
};
//--------------------------------------------------------------------------------------
scrollview.plug(Y.Plugin.ITSAChangeModelTemplate, changeModelTemplateConfig);


myScrollview.render();

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
