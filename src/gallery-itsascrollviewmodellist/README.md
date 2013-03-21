gallery-itsascrollviewmodellist
===============================


Adds an Y.ModelList or Y.LazyModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list
lies within the scrollview's-contentBox. This results in an ul-list with Models. For performancereason, it is recommended to
use Y.LazyModelList instead of Y.ModelList.

Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview would otherwise
fail autofind the value of axis.

To make both Y.ModelList as well as Y.LazyModelList interchangable, this module adds 3 sugar-methods to Y.ModelList and Y.LazyModelList:
getModelAttr(), setModelAttr() and getModelToJSON(). This way you can get/set model-properties without bothering the kind of list being used.

This module is extremely powerful, in a way that the scrollview will be updated whenever it is needed. This means, changes to Models, ModelList,
some specific attributes, renderMethods and so on will cause an update of the scrollview-content. It is also posible to make changed Models to scroll
into view and be highlighted. See the API Docs for further information.

This module can also generate headers above the listitems. This is handy when you need f.i. alphabetical- or Date- headers.

To render the items (and if you wish also the headers), you must define a 'template' for the Models and Headers. There are 3 header-levels to use.
The templates must be passed through the attributes: <b>renderModel, groupHeader1, groupHeader2 and groupHeader3</b>. A template is a String that can
be processed through Y.Lang.sub, or Y.Template.Micro. The Model-attributes are referred through {someAttribute}, or in case of
Y.Template.Micro: <%= someAttribute %>

As long as there are no <b>initial items</b> (for the first time , the classes 'itsa-scrollviewmodellist-noinitialitems' and
'itsa-scrollviewmodellist-view-noinitialitems' will be added to the boudingBox and viewNode.

During each renderingprocess, as there are no items at that time, the classes 'itsa-scrollviewmodellist-noitems' and
'itsa-scrollviewmodellist-view-noitems' will be added to the boudingBox and viewNode.

You can use css to style (f.i. hide) these node at will.


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsascrollviewmodellist/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSACalendarMarkedDates.html)

Usage
-----

```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('scrollview', 'gallery-itsamodellistviewextention', 'lazy-model-list', function(Y) {

var myModellist = new Y.LazyModelList();
myModellist.add([
    {Country: 'The Netherlands'},
    {Country: 'USA'},
    {},
    ....
]);

var rendermodel = '{Country}';
var groupheader = '<%= data.Country.substr(0,1) %>';

var myScrollview = new Y.ScrollView({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelListStyled: true,
    renderModel: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist
});

myScrollview.render();

});
```

<u><b>Custom styling:</b></u>

The module will add several css-classes to the scrollview-instance and listelements. By default, there will be no styling and you
may do so yourself. However, if the attribute 'modelListStyled' is set to true, everything gets a predefined style. You can style yourself
by define your own styles, or by setting 'modelListStyled' and overrule some of its styles.

Creating your own styles:
Redefine the next classes:
```js
.itsa-scrollviewmodellist-noinitialitems {
    visibility: hidden;
}

.itsa-scrollviewmodellist-groupheader1 {
    background-color: #000;
    color: #FFF;
    padding: 3px 10px 2px 10px;
}

.itsa-scrollviewmodellist-groupheader2 {
    background-color: #3E6495;
    color: #FFF;
    border-bottom: solid 1px #FFF;
    padding: 3px 10px 2px 10px;
}

.itsa-scrollviewmodellist-groupheader3 {
    background-color: #DDD;
    color: #666;
    padding: 3px 10px 2px 10px;
}

.itsa-scrollviewmodel {
    padding: 10px;
    background-color: #FFF;
    color: #000;
    border-bottom: 1px solid #797F90;
}

.itsa-scrollviewmodel-even {
    background-color: #EDF5FF;
}

.itsa-scrollviewmodel-odd.itsa-scrollviewmodel-selected {
    background-color: #4C7DBB;
    color: #FFF;
    border-color: #FFF;
}

.itsa-scrollviewmodel-even.itsa-scrollviewmodel-selected {
    background-color: #4C7DBB;
    color: #FFF;
    border-color: #FFF;
}

.itsa-scrollviewmodel:hover {
    cursor: pointer;
    background-color: #C0DCFF;
}

.itsa-scrollviewmodel.itsa-scrollviewmodel-selected:hover {
    background-color: #C0DCFF;
}

.itsa-scrollviewmodel.itsa-scrollviewmodel-selected:hover {
    background-color: #4C7DBB;
}

.itsa-scrollviewmodellist-groupheader1.itsa-scrollviewmodellist-sequelgroupheader {
    margin-top: 38px;
}

.itsa-scrollviewmodel.itsa-scrollviewmodel-focus {
    background-color: #C0DCFF;
}

.itsa-scrollviewmodel.itsa-scrollviewmodel-changed {
    background-color: #D84A4A;
    color: #FF0;
}

.itsa-scrollviewmodel.itsa-scrollviewmodel-changed:hover,
.itsa-scrollviewmodel.itsa-scrollviewmodel-changed.itsa-scrollviewmodel-selected:hover {
    background-color: #D84A4A;
    color: #FF0;
}
```

Using 'modelListStyled' and redefine classes: make sure your new rule takes higher precedence, be sure you give it a finer declaration.
In this example the finer definition as made by adjoining the class 'itsa-scrollviewmodellist' which always will be added to the boundingBox.
```js
.itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodellist-noinitialitems {
    visibility: hidden;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled {
    border: solid 1px #000;
    background-color: #DDD;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodellist-groupheader1 {
    background-color: #000;
    color: #FFF;
    padding: 3px 10px 2px 10px;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodellist-groupheader2 {
    background-color: #3E6495;
    color: #FFF;
    border-bottom: solid 1px #FFF;
    padding: 3px 10px 2px 10px;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodellist-groupheader3 {
    background-color: #DDD;
    color: #666;
    padding: 3px 10px 2px 10px;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel {
    padding: 10px;
    background-color: #FFF;
    color: #000;
    border-bottom: 1px solid #797F90;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel-even {
    background-color: #EDF5FF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel-odd.itsa-scrollviewmodel-selected {
    background-color: #4C7DBB;
    color: #FFF;
    border-color: #FFF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel-even.itsa-scrollviewmodel-selected {
    background-color: #4C7DBB;
    color: #FFF;
    border-color: #FFF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel:hover {
    cursor: pointer;
    background-color: #C0DCFF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-selected:hover {
    background-color: #C0DCFF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-selected:hover {
    background-color: #4C7DBB;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodellist-groupheader1.itsa-scrollviewmodellist-sequelgroupheader {
    margin-top: 38px;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-focus {
    background-color: #C0DCFF;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-changed {
    background-color: #D84A4A;
    color: #FF0;
}

.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-changed:hover,
.yui3-skin-sam .itsa-scrollviewmodellist.itsa-scrollviewmodellist-styled .itsa-scrollviewmodel.itsa-scrollviewmodel-changed.itsa-scrollviewmodel-selected:hover {
    background-color: #D84A4A;
    color: #FF0;
}
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
