gallery-itsadatetimepicker
==========================


Module Y.ITSADateTimePicker.


Widget that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.


There are several options that can make the picker to be modal, align next to the button that launched it and passing an initial date-time value. The Module also can render 3 <button> Nodes with calendar-icon, time-icon or both.

So, the Moduoe generates one instance Y.ItsaDateTimePicker which is available right away, acroos multiple YUI-instances. Actually only 1 instance is created to save unnecessary rendering. The real rendering of the panel-, calendar- and dial-instances are also delayed for 1 second for performancereason. Should the panel be needed before, then rendering will start when needed.

There are 3 Promises that can be asked for:

* Y.ItsaDateTimePicker.getDate(initialDate, activationNode, config)
* Y.ItsaDateTimePicker.getTime(initialDate, activationNode, config)
* Y.ItsaDateTimePicker.getDateTime(initialDate, activationNode, config)

These promises can be called at any time and will pop-up the panel-instance. Which will return the Promise. Most likely, these promises are called when a user presses a button (more about that later). The Promises can receive 3 paramers which are all optional:

* initialDate: date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
* activationNode: the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
* config: object to adjust the behaviour of the panel.

config is an object through which you can adjust the behaviour of the panel-instance. The next fields may be set:
* config.title: {String }Title on the Panel-instance
* config.modal: {Boolean} Whether the Panel-instance should appear modal
* config.dragable {Boolean} Whether the Panel-instance is dragable
* config.timeformat {String} Format of the rendered timestring (default = '%H:%M')
* config.customRenderer {Object} customRenderer that is passed to the Calendar-instance
* config.showPrevMonth {Boolean} showPrevMonth that is passed to the Calendar-instance
* config.showNextMonth {Boolean} showNextMonth that is passed to the Calendar-instance
* config.headerRenderer {String} headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
* config.minimumDate {Date} minimumDate that is passed to the Calendar-instance
* config.maximumDate {Date} maximumDate that is passed to the Calendar-instance
* config.enabledDatesRule {String} enabledDatesRule that is passed to the Calendar-instance
* config.disabledDatesRule {String} disabledDatesRule that is passed to the Calendar-instance

<b>Calling the Promise by buttons</b>
Most likely you will have a button-element on the page with a sort of calendar-icon. When pressed, you'll ask for one of the 3 Promises. This module has 3 methods that will create button-Nodes with nice css. Event better way is, to include the right html directly into the page.

<u>Methods to create button-Nodes</u>
There are 3 methods taht create buttonNodes. Remember that you have to insert them into the DOM yourself.

* Y.ItsaDateTimePicker.dateNode()
* Y.ItsaDateTimePicker.timeNode()
* Y.ItsaDateTimePicker.datetimeNode()

If you want to insert the html yourself right away (prefered way), you need to use this html:
```
<button class="yui3-button itsa-button-datetime"><span class="itsa-datetimepicker-icondate"></span></button>
<button class="yui3-button itsa-button-datetime"><span class="itsa-datetimepicker-icontime"></span></button>
<button class="yui3-button itsa-button-datetime"><span class="itsa-datetimepicker-icondatetime"></span></button>
```

Be aware that the css for the nodemarkup needs to be loaded. Without any precautions, you will suffer changes in the markup, just the same as with any widget that needs to be rendered. To overcomde this, it is suggested you add the class 'itsa-datetimepicker-loading' to the body-element. The module hass css that will hide elements with class '.yui3-js-enabled .itsa-datetimepicker-loading .itsa-button-datetime'. Once the module is available, it will remove 'datetimepicker-loading' from the body-node (should it be applied).


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsadatetimepicker/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSADateTimePicker.html)

Usage
-----

<b>HTML:</b>
```
<span id='datefield'></span><span id='status'></span>
```

<b>Date-picker which will be aligned next to the button-node with a calendar-icon:</b>
```js
YUI().use('node', 'gallery-itsadatetimepicker', 'datatype-date-format', function(Y) {
    // Y.ItsaDateTimePicker is ready to be used...

    var date = new Date();
    var datefield = Y.one('#datefield');
    var status = Y.one('#status');

    // creating a nice 'datebutton' and append it to the html
    // this also could have been done with HTML-code (better)
    // Y.ItsaDateTimePicker.dateNode() returns an Y.Node
    var btnDate = Y.ItsaDateTimePicker.dateNode();
    Y.one('body').append(btnDate);

    btnDate.on('click', function(e){
        status.setHTML('');
        // Y.ItsaDateTimePicker.getDate() returns an Y.Promise
        // first parameter holds the initial date. Second parameter is the node that causes the panel to appear.
        // By setting this, the panel is aligned to this Node.
        Y.ItsaDateTimePicker.getDate(date, e.currentTarget).then(
            function(newdate) {
                date.setTime(newdate.getTime());
                datefield.setHTML(Y.Date.format(date, {format: '%d/%m/%Y'}));
                status.setHTML('new date is set');
            },
            function(reason) {
                status.setHTML('no date set: '+reason);
            }
        );
    });
});
```

<b>date- and time-picker which is modal, centered on the page and dragable</b>
```js
YUI().use('node', 'gallery-itsadatetimepicker', 'datatype-date-format', function(Y) {
    // Y.ItsaDateTimePicker is ready to be used...

    var date = new Date();
    var datefield = Y.one('#datefield');
    var status = Y.one('#status');

    // creating a nice 'datebutton' and append it to the html
    // this also could have been done with HTML-code (better)
    // Y.ItsaDateTimePicker.dateNode() returns an Y.Node
    var btnDateTime = Y.ItsaDateTimePicker.datetimeNode();
    Y.one('body').append(btnDateTime);

    btnDateTime.on('click', function(e){
        status.setHTML('');
        // Y.ItsaDateTimePicker.getDateTime() returns an Y.Promise
        // first parameter holds the initial date.
        Y.ItsaDateTimePicker.getDate(date, null, {modal: true, dragable: true}).then(
            function(newdate) {
                date.setTime(newdate.getTime());
                datefield.setHTML(Y.Date.format(date, {format: '%d/%m/%Y %l:%M %p'}));
                status.setHTML('new date and time is set');
            },
            function(reason) {
                status.setHTML('no date or time set: '+reason);
            }
        );
    });
});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
