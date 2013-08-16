YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-itsaformelement');

    suite.add(new Y.Test.Case({
        name: 'Test 1',
        'Create html-element input': function() {
            var formElement = Y.ITSAFormElement.getElement('text');
            Y.Assert.areEqual('<input type="text" id="', formElement.html.substr(0, 23), 'Created item doesn\'t seem to have the right syntax');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Test 2',
        'Create html-element input with default value': function() {
            var formElement, inputnode, nodevalue;
            formElement = Y.ITSAFormElement.getElement('text', {value: 'someName'});
            Y.one('body').append(formElement.html);
            inputnode = Y.one('#'+formElement.nodeid);
            nodevalue = inputnode.get('value');
            Y.Assert.areEqual('someName', nodevalue, 'Created inputelement doesn\'t seem to have the right default value');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Test 3',
        'Create widget-element ITSACheckbox': function() {
            var formElement = Y.ITSAFormElement.getElement(Y.ITSACheckbox);
            Y.Assert.isTrue((formElement.widget instanceof Y.ITSACheckbox), 'Created ITSACheckbox isn\'t instantiated as an ITSACheckbox-instance');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Test 4',
        'Create widget-element ITSACheckbox default checked': function() {
            var formElement = Y.ITSAFormElement.getElement(Y.ITSACheckbox, {checked: true});
            Y.Assert.isTrue(formElement.widget.getValue(), 'Created ITSACheckbox isn\'t checked true');
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Test 5',
        'Check if widget-element ITSACheckbox functions through its instance-handle': function() {
            var formElement = Y.ITSAFormElement.getElement(Y.ITSACheckbox, {checked: true});
            formElement.widget.uncheck();
            Y.Assert.isFalse(formElement.widget.getValue(), 'Created ITSACheckbox isn\'t checked false');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'gallery-itsaformelement', 'gallery-itsacheckbox' ] });
