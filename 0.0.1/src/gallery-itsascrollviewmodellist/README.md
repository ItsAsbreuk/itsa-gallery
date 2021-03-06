gallery-itsascrollviewmodellist
===============================


Widget Y.ITSAScrollViewModellist which extends Y.ScrollView by adding an Y.ModelList or Y.LazyModelList as an attribute 'modelList'.


Y.ITSAScrollViewModellist <i>does not use Progressive Enhancement</i>, but uses the 'modelList'-attribute for rendering.
The Models from the ModelList will be used to render an unsorted-list inside the scrollview-instance. The ul-element (viewNode)
lies within the scrollview's-contentBox. This results in an ul-list with Models. For performance-reasons, it is recommended to
use Y.LazyModelList instead of Y.ModelList.


<b>Caution:</b> you <i>MUST set the axis-atribute before rendering!</i> Because the content is empty at start, scrollview would otherwise
fail autofind the value of axis.


To make both Y.ModelList as well as Y.LazyModelList interchangable, this module adds 3 sugar-methods to Y.ModelList and Y.LazyModelList:
getModelAttr(), setModelAttr() and getModelToJSON(). This way you can get/set model-properties without bothering the kind of list being used.


This module is extremely powerful, in a way that the scrollview will be updated whenever it is needed. This means, changes to Models, ModelList,
some specific attributes, renderMethods and so on will cause an update of the scrollview-content. It is also posible to make changed Models to scroll
into view and be highlighted. See the API Docs for further information.


This module can also generate headers above the listitems. This is handy when you need f.i. alphabetical- or Date- headers.
<b>Caution:</b> Without a right order, 'headers' can appear in an unexpected way: use ModelList.comparator when using headers.


To render the items (and if you wish also the headers), you must define a 'template' for the Models and Headers. There are 3 header-levels to use.
The templates must be passed through the attributes: <b>modelTemplate, groupHeader1, groupHeader2 and groupHeader3</b>. A template is a String that can
be processed through Y.Lang.sub, or Y.Template.Micro. The Model-attributes are referred through {someAttribute}, or in case of
Y.Template.Micro: <%= someAttribute %>


The module can generate the view with an unsorted list, or table. This can be set with the attribute 'listType' (see example). Be aware that
-should you use 'table'- the templates need to render the td-elements.


As long as there are no <b>initial items</b> (for the first time , the classes 'itsa-modellistview-noinitialitems' and
'itsa-modellistview-view-noinitialitems' will be added to the boudingBox and viewNode. These can be used for styling. The messages that are use defaults
to 'No data to display' and 'Loading...'. The latter will only be shown if the attribute 'showLoadMessage' is set true (and you didn't not use
'itsa-modellistview-noinitialitems' to hide the widget...)


During each renderingprocess, as there are no items at that time, the classes 'itsa-modellistview-noitems' and
'itsa-modellistview-view-noitems' will be added to the boudingBox and viewNode.


You can use css to style (f.i. hide) these node at will.


Available plugins
-----------------
* [Y.Plugin.ITSAScrollViewKeyNav](../gallery-itsascrollviewkeynav) <i>to support key navigation/scrolling</i>
* [Y.Plugin.ITSASubscribeModelButtons](../gallery-itsasubscribemodelbuttons) <i>make models fire model:buttonclick and model:anchorclick events-</i>
* [Y.Plugin.ITSAChangeModelTemplate](../gallery-itsachangemodeltemplate) <i>enables models to toggle templates, either a second template or an editabletemplate</i>
* [Y.Plugin.ITSAViewPaginator](../gallery-itsaviewpaginator) <i>under construction</i>
* [Y.Plugin.ITSAInfiniteView](../gallery-itsaviewpaginator) <i>under construction</i>
* [Y.Plugin.ITSAScrollViewLoop](../gallery-itsascrollviewloop) <i>under construction</i>

Available extentions
--------------------
* [Y.Plugin.ITSAScrollViewDupModels](../gallery-itsascrollviewdupmodels) <i>to support duplicated models, based on a Date-interval</i>

Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsascrollviewmodellist/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAScrollViewModellist.html)

Usage
-----

<b>View rendered as unsorted list</b>
```css
.itsa-modellistview-noinitialitems {
    visibility: hidden;
}
```
```html
<div id='myscrollview'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview;

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

myScrollview.render();

});
```

<b>View rendered as table</b>
```css
.itsa-modellistview-noinitialitems {
    visibility: hidden;
}
```
```html
<div id='myscrollview'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview;

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

rendermodel = '<td>{Continental} %></td>';
groupheader = '<td><%= data.Country.substr(0,1).toUpperCase() %></td>';

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    listType: 'table,'
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist
});

myScrollview.render();

});
```

<b>View with a filter on the modellist</b>
```css
.itsa-modellistview-noinitialitems {
    visibility: hidden;
}
```
```html
<div id='myscrollview'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'lazy-model-list', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview, filter;

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

rendermodel = '{Continental}';
groupheader = '<%= data.Country.substr(0,1).toUpperCase() %>';

filter = function(model) {
    return model.Country==='USA';
};

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    viewFilter: filter,
    modelList: myModellist
});

myScrollview.render();

});
```

Custom styling
--------------

The module will add several css-classes to the scrollview-instance and listelements. <b>By default, the ModelList is styled.</b> This is defined by the attribute 'modelListStyled'. However, if the attribute 'modelListStyled' is set to false, you can style yourself by define your own styles. You could also set 'modelListStyled' to 'true' and overrule some of its styles.

[View styles](src/assets/gallery-itsascrollviewmodellist-core.css)

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
