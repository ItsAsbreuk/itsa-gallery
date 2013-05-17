gallery-itsamodellistsyncpromise
======================


This module comes with the extention Y.ITSAModellistSyncPromise


Extends Y.ModelList with Promised sync-methods. The synclayer can be made just as usual. But instead of calling
ModelList.load you can use:

* ModelList.<b>loadPromise()</b>


<b>ModelList's sync-layer MUST call the callback-function of its 'read' promise-method, otherwise loadPromise is not resolved.</b>


Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:


* ModelList.<b>destroyPromise()</b>
* ModelList.<b>savePromise()</b>
* ModelList.<b>submitPromise()</b>

<b>Model's sync-layer MUST call the callback-function of its related promises-method, otherwise destroyPromise, savePromise and submitPromise are not resolved.</b>


All methods return Promises.

Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsamodellistsyncpromise/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSAModellistSyncPromise.html)

Usage
-----

<b>Loading ModelList-data with ModelList.loadPromise</b>
```js
YUI().use('model', 'gallery-itsamodellistsyncpromise', 'base-build', function(Y) {

    var pielist;
    Y.PieModel = Y.Base.create('pieModel', Y.Model, [], {
        // ... you might want to set  up the sync-layer, but ModelList.loadPromise doesn't call the 'read' method of every separate Y.PieModel
        // instaed, it calls its own ModelList synclayer
    });
    Y.PieList = Y.Base.create('pieList', Y.ModelList, [], {
        model: Y.PieModel,
      // ... create Y.PieList just as the example on http://yuilibrary.com/yui/docs/model-list/#the-sync-method specifies ...
    });
    pielist = new Y.PieList({...});

    pielist.loadPromise().then(
        function(response, options) {
            // we are sure now pielist is filled with all PieModels.
            // we could read 'response' or 'options', but don't need to
        },
        function(reason) {
            // 'reason' gives you the reason why loading has failed
        }
    );

});
```

<b>Saving ModelList-data with ModelList.savePromise</b>
```js
YUI().use('model', 'gallery-itsamodellistsyncpromise', 'base-build', function(Y) {

    var pielist;
    Y.PieModel = Y.Base.create('pieModel', Y.Model, [], {
        // ... you might want to set  up the sync-layer, but ModelList.loadPromise doesn't call the 'read' method of every separate Y.PieModel
        // instaed, it calls its own ModelList synclayer
    });
    Y.PieList = Y.Base.create('pieList', Y.ModelList, [], {
        model: Y.PieModel,
      // ... create Y.PieList just as the example on http://yuilibrary.com/yui/docs/model-list/#the-sync-method specifies ...
    });
    pielist = new Y.PieList({...});

    pielist.savePromise().then(
        function(response, options) {
            // we are sure now that the ModelList has saved all modified PieModels.
            // we could read 'response' or 'options', but don't need to
        },
        function(reason) {
            // 'reason' gives you the reason why loading has failed
        }
    );

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
