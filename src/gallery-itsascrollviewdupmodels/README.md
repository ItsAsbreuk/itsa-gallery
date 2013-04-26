gallery-itsascrollviewdupmodels
===============================


Extends Y.ITSAScrollViewModellist by adding the posibility to duplicate ModelList's items, when these items have an 'endDate' or Interval set.
To make all this work, you need to define these 2 extended attributes <i>modelConfig</i> and <i>'splitDays'</i>:


<b>Attribute 'modelConfig' {Object}:</b>
```js
modelconfig = {
    date: 'Startdate'
    enddate: 'Enddate',
    count: 'repeattimes',
    intervalMinutes: 'stepMinutes',
    intervalHours: 'stepHours',
    intervalDays: 'stepDays',
    intervalMonths: 'stepMonths',
};
```
The 'modelConfig' describes which attributes of the Models can be used for which specific purpose.


<b>Attribute 'splitDays' {Boolean}:</b>
The attribute 'splitDays' tells whether every Model-item that has a date and enddate whoch extends over multiple Dates, is splitted. This way you can achieve one single Model to split-up for every day the event last. By splitting days, you get extra items with new 'own' start en end date. Typically, when corsses multiple
date, the date and enddate are the beginningdate at 0:00:00 and the next date at 0:00:00. If you want the template to render 'original' date and enddate instead, you must take use of two extra attributes 'date_original' and 'enddate_original' which are appended to every model that is introduced (see examples).


<b>Caution:</b>You cannot use just 'splitDays' without 'modelConfig'. This is, because splitDays needs to know the 'modelConfig.enddate' in order to be effective.


<i>The module will load 'gallery-itsascrollviewmodellist' under the hood, if it isn't loaded yet.</i>


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsascrollviewdupmodels/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAScrollViewDupModels.html)

Usage
-----

<b>View events split into several days</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'gallery-itsascrollviewdupmodels', 'lazy-model-list', 'datatype-date-format', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview, modelconfig;

myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    var startdate = model.Start;
    return (startdate && startdate.getTime && startdate.getTime()) || 0;
};
myModellist.add([
    {
        Happening: 'Concert',
        Start: new Date(2013, 1, 1),
        End: new Date(2013, 1, 2)
    },
    {
        Happening: 'Another Concert',
        Start: new Date(2013, 1, 14),
        End: new Date(2013, 1, 16)
    },
    ....
]);

groupHeader = '<%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>';
modelTemplate = '<%= data.Country %><br />'+
                'Startdate: <%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>'+
                'Enddate: <%= Y.Date.format(data.End, {format:"%d-%m-%Y"}) %>';

modelconfig = {
    date: 'Start',
    enddate: 'End'
};

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist,
    modelConfig: modelconfig,
    splitDays: true
});

myScrollview.render();

});
```

<b>View events split into several days and repeat them using 'Repeat'</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'gallery-itsascrollviewdupmodels', 'lazy-model-list', 'datatype-date-format', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview, modelconfig;

myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    var startdate = model.Start;
    return (startdate && startdate.getTime && startdate.getTime()) || 0;
};
myModellist.add([
    {
        Happening: 'Concert',
        Start: new Date(2013, 1, 1),
        End: new Date(2013, 1, 2),
        Repeat: 4,
        StepMonths: 1
    },
    {
        Happening: 'Another Concert',
        Start: new Date(2013, 1, 14),
        End: new Date(2013, 1, 16),
        Repeat: 6,
        StepMonths: 1
    },
    ....
]);

groupHeader = '<%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>';
modelTemplate = '<%= data.Country %><br />'+
                'Startdate: <%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>'+
                'Enddate: <%= Y.Date.format(data.End, {format:"%d-%m-%Y"}) %>';

modelconfig = {
    date: 'Start',
    enddate: 'End',
    count: 'Repeat',
    intervalMonths: 'StepMonths'
};

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist,
    modelConfig: modelconfig,
    splitDays: true
});

myScrollview.render();

});
```

<b>View events split into several days while rendering the original date and enddate</b>
```html
<div id='myscrollview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsascrollviewmodellist', 'gallery-itsascrollviewdupmodels', 'lazy-model-list', 'datatype-date-format', function(Y) {
var myModellist, rendermodel, groupheader, myScrollview, modelconfig;

myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    var startdate = model.Start;
    return (startdate && startdate.getTime && startdate.getTime()) || 0;
};
myModellist.add([
    {
        Happening: 'Concert',
        Start: new Date(2013, 1, 1),
        End: new Date(2013, 1, 2),
        Repeat: 4,
        StepMonths: 1
    },
    {
        Happening: 'Another Concert',
        Start: new Date(2013, 1, 14),
        End: new Date(2013, 1, 16),
        Repeat: 6,
        StepMonths: 1
    },
    ....
]);

groupHeader = '<%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>';
modelTemplate = '<%= data.Country %><br />'+
                'Startdate: <% if (data.date_original) { %>'+
                           '<%= Y.Date.format(data.date_original, {format:"%d-%m-%Y %H %M %S"}) %>'+
                           '<% } else { %>'+
                           '<%= Y.Date.format(data.Start, {format:"%d-%m-%Y %H %M %S"}) %>'+
                           '<% } %><br />'+
                'Enddate: <% if (data.enddate_original) { %>'+
                         '<%= Y.Date.format(data.enddate_original, {format:"%d-%m-%Y %H %M %S"}) %>'+
                         '<% } else { %>'+
                         '<%= Y.Date.format(data.End, {format:"%d-%m-%Y %H %M %S"}) %>'+
                         '<% } %>';

modelconfig = {
    date: 'Start',
    enddate: 'End',
    count: 'Repeat',
    intervalMonths: 'StepMonths'
};

myScrollview = new Y.ITSAScrollViewModellist({
    boundingBox: "#myscrollview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist,
    modelConfig: modelconfig,
    splitDays: true
});

myScrollview.render();

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
