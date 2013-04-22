gallery-itsaviewdupmodels
=========================


Extends Y.ITSAViewModellist by adding the posibility to duplicate ModelList's items, when these items have an 'endDate' or Interval set.
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
The attribute 'splitDays' tells whether every Model-item that has a date and enddate whoch extends over multiple Dates, is splitted. This way you can achieve one single Model to split-up for every day the event last.


<i>The module will load 'gallery-itsaviewmodellist' under the hood, if it isn't loaded yet.</i>


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsaviewdupmodels/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAViewDupModels.html)

Usage
-----

<b>View rendered as unsorted list</b>
```html
<div id='myview' class='itsa-modellistview-noinitialitems'></div>
```
```js
YUI({gallery: 'gallery-2013.02.27-21-03'}).use('gallery-itsaviewmodellist', 'gallery-itsaviewdupmodels', 'lazy-model-list', 'datatype-date-format', function(Y) {
var myModellist, rendermodel, groupheader, myView, modelconfig;

myModellist = new Y.LazyModelList();
myModellist.comparator = function (model) {
    var startdate = model.Start;
    return (startdate && startdate.getTime && startdate.getTime()) || 0;
};
myModellist.add([
    {Happening: 'Concert', Start: new Date(2013, 1, 1), End: new Date(2013, 1, 2)},
    {Happening: 'Another Concert', Start: new Date(2013, 1, 14), End: new Date(2013, 1, 16)},
    ....
]);

groupHeader = '<%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>';
modelTemplate = '<%= data.Country %><br />'+
                'Startdate: <%= Y.Date.format(data.Start, {format:"%d-%m-%Y"}) %>'+
                'Enddate: <%= Y.Date.format(data.End, {format:"%d-%m-%Y"}) %>';

modelconfig = {
    date: 'Start'
    enddate: 'End'
};

myView = new Y.ITSAViewModellist({
    boundingBox: "#myview",
    height:'600px',
    width:'240px',
    modelTemplate: rendermodel,
    groupHeader1: groupheader,
    axis: 'y',
    modelList: myModellist,
    modelConfig: modelconfig,
    splitDays: true
});

myView.render();

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
