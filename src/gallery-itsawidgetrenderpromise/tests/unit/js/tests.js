YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-itsawidgetrenderpromise');

    suite.add(new Y.Test.Case({
        name: 'test 1',
        'check renderPromise if widget is indeed completely rendered':  function() {
            var cal = new Y.Calendar();
            cal.renderPromise(5000).then(
                function() {
                    Y.Assert.isTrue(cal.get('rendered'), 'renderPromise is fulfilled, but the rendered-attribute is false');
                },
                function(reason) {
                    Y.Assert.fail(reason);
                }
            );
            cal.render();
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'gallery-itsawidgetrenderpromise', 'calendar' ] });
