gallery-itsadatetimepicker
==========================


Widget Y.ITSADateTimePicker.


Widget that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.


There are several options that can make the picker to be modal, align next to the button that launched it and passing an initial date-time value.
The Module also can render 3 <button> Nodes with calendar-icon, time-icon or both.


By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false.


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
