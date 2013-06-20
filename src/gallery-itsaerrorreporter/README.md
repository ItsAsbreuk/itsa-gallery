gallery-itsaerrorreporter
===============



This module full automaticly reports error-events by pop-up an error-dialog.

Catching errors during development (logging) are prominent available now.

Also error-events during production will be shown to the users.


By default it listens to both error-events and error-loggings. Both can be (un)set.
The 'error'-events MUST confirm the following rules:

* Do <b>not fire</b> Y.fire('error') --> because 'error' is a dom-event, the subscriber could fail to catch the event under some circumstances.
* Always fire through the instance (sub-class of EventTarget) --> for instance: yourModel.fire('error');
* Always make sure your instance targets Y. Either by <b>yourModel.addTarget(Y);</b>, or by <b>yourModel.publish('error', {broadcast: 1});</b> which also could be done inside the class-definition.



Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsaerrorreporter/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/Y.ITSAErrorReporter.html)

Usage
-----

<b>ErrorReport when fireing an 'error'-event</b>
```js
YUI({gallery: 'gallery-2013.06.13-01-19'}).use('gallery-itsaerrorreporter', 'model', function(Y) {

    var mymodel, facade;

    mymodel = new Y.Model();
    facade = {src: 'webapplication', msg: 'Simulating an error'};

    mymodel.addTarget(Y);
    mymodel.fire('error', facade);
    // the event is caught and leads to an error-pop-up

});
```

<b>ErrorReport when logging an 'error'</b>
```js
YUI({gallery: 'gallery-2013.06.13-01-19'}).use('gallery-itsaerrorreporter', function(Y) {

    Y.log('logging an error', 'error', 'webapp');
    // the logging is caught and leads to an error-pop-up

});
```

<b>Disabling error-messages when logging an 'error'</b>
```js
YUI({gallery: 'gallery-2013.06.13-01-19'}).use('gallery-itsaerrorreporter', 'model', function(Y) {

    var mymodel, facade;

    Y.ITSAErrorReporter.reportErrorLogs(false);
    mymodel = new Y.Model();
    facade = {src: 'webapplication', msg: 'Simulating an error'};

    mymodel.addTarget(Y);
    mymodel.fire('error', facade);
    // the event is caught and leads to an error-pop-up

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
