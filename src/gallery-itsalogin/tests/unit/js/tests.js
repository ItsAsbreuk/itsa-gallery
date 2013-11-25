YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-itsalogin');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',
        'test is empty': function() {
            var d = new Y.Dial();
            Y.Assert.fail('No Tests Provided For This Module');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'dial' ] });
