gallery-itsasubscribemodelbuttons
=================================


<b<Plugin Y.Plugin.ITSASubscribeModelButtons</b>

Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel


The plugin makes that clicking on some elements within the Model causes the <i>Modelinstance</i> fire an event.


Be aware that -in case of LazyModelList- the objects are revived into Modelinstances and not freed. You may want to use
ITSAViewModel.get('modelList').free(model) in the subscriber after handling the event.
This also means that -within the subscriber- e.target is always a Modelinstance.


1. <i>buttons</i> or <i>input[type=button]</i> fire a <b>'model:buttonclick'</b>-event
2. <i>a (anchor)-elements with class '.firemodel'</i> will fire a <b>'model:anchorclick'</b>-event <i>instead of the default behaviour</i>
3. <i>DateTime-buttons</i> fire a <b>'model:datetimeclick'</b>-event <i>determined by the class '.itsa-button-datetime'</i>


Examples
--------
[Online example](http://projects.itsasbreuk.nl/examples/itsasubscribemodelbuttons/index.html)

Documentation
--------------
[API Docs](http://projects.itsasbreuk.nl/apidocs/classes/ITSASubscribeModelButtons.html)

Usage
-----

<b>ITSAViewModel with Y.Lang.sub as template:</b>
```js
YUI().use('model', 'gallery-itsaviewmodel', 'gallery-itsasubscribemodelbuttons', function(Y) {

    var viewmodel, model, modeltemplate;
    model = new Y.Model({
        artist: 'Madonna',
        country: 'USA'
    });
    modeltemplate = '{artist}<br />'+
                    '{country}<br />'+
                    '<a href="moreabout'+{artist}+'.html" class=".firemodel">read more...</a>';

    viewmodel = new Y.ITSAViewModel({
        boundingBox: "#myview",
        width:'280px',
        height:'284px',
        template: modeltemplate,
        model: model
    });
    viewmodel.plug(Y.Plugin.ITSASubscribeModelButtons)
    viewmodel.render();

    viewmodel.on(
        'model:anchorclick',
        function(e) {
            var model = e.target;
            ... // handle here how to show 'more info' instead of loading 'moreaboutmadonna.html'
        }
    );

});
```

License
-------

Copyright (c) 2013 [Its Asbreuk](http://http://itsasbreuk.nl)

[YUI BSD License](http://developer.yahoo.com/yui/license.html)
