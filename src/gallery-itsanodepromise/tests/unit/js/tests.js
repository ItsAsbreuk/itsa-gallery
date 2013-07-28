YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-itsanodepromise'),
        nodeName = 'testnode',
        nodeId = '#'+nodeName,
        nodeTemplate = '<div id="'+nodeName+'">Here is some content<div>with an innerdiv</div></div>',
        NODE_NOT_AVAILABLE = 'Node not available',
        NODE_SHOULD_NOT_BE_AVAILABLE = 'Node is found, but should not be available yet',
        NODE_SHOULD_NOT_BE_CONTENTREADY = 'Node is found, but should not be contentready yet',
        NODE_NOT_CONTENTREADY = 'Node not contentready',
        bodynode = Y.one('body');

    function insertNode() {
        bodynode.append(nodeTemplate);
    }

    function insertNodeTimedout() {
        Y.later(
            1000,
            null,
            insertNode
        );
    }

    suite.add(new Y.Test.Case({
        name: 'test 1',
        'check node which is already available - without timeout':  function() {
            insertNode();
            var nodefound = false,
                nodeAvailablePromise = bodynode.availablePromise(nodeId);
            nodeAvailablePromise.then(
                function() {
                    nodefound = true;
                }
            );
            Y.Assert.isTrue(nodefound, NODE_NOT_AVAILABLE);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 2',
        'check node which is already available - with timeout of 1 second':  function() {
            insertNode();
            var nodefound = false,
                nodeAvailablePromise = bodynode.availablePromise(nodeId, 1000);
            nodeAvailablePromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_AVAILABLE);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 3',
        'check node that is inserted after 1 second - without timeout':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeAvailablePromise = bodynode.availablePromise(nodeId);
            nodeAvailablePromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_AVAILABLE);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 4',
        'check node that is inserted after 1 second - with timeout of 0.5 seconds':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeAvailablePromise = bodynode.availablePromise(nodeId, 500);
            nodeAvailablePromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isFalse(nodefound, NODE_SHOULD_NOT_BE_AVAILABLE);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 5',
        'check node that is inserted after 1 second - with timeout of 2 seconds':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeAvailablePromise = bodynode.availablePromise(nodeId, 2000);
            nodeAvailablePromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 2500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_AVAILABLE);
            }, 2500);
        }
    }));

    // the same for the contentReady promise

    suite.add(new Y.Test.Case({
        name: 'test 6',
        'check node which is already contentready - without timeout':  function() {
            insertNode();
            var nodefound = false,
                nodeContentreadyPromise = bodynode.contentreadyPromise(nodeId);
            nodeContentreadyPromise.then(
                function() {
                    nodefound = true;
                }
            );
            Y.Assert.isTrue(nodefound, NODE_NOT_CONTENTREADY);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 7',
        'check node which is already contentready - with timeout of 1 second':  function() {
            insertNode();
            var nodefound = false,
                nodeContentreadyPromise = bodynode.contentreadyPromise(nodeId, 1000);
            nodeContentreadyPromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_CONTENTREADY);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 8',
        'check node that is contentready after 1 second - without timeout':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeContentreadyPromise = bodynode.contentreadyPromise(nodeId);
            nodeContentreadyPromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_CONTENTREADY);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 9',
        'check node that is contentready after 1 second - with timeout of 0.5 seconds':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeContentreadyPromise = bodynode.contentreadyPromise(nodeId, 500);
            nodeContentreadyPromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 1500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isFalse(nodefound, NODE_SHOULD_NOT_BE_CONTENTREADY);
            }, 1500);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'test 10',
        'check node that is contentready after 1 second - with timeout of 2 seconds':  function() {
            insertNodeTimedout();
            var nodefound = false,
                nodeContentreadyPromise = bodynode.contentreadyPromise(nodeId, 2000);
            nodeContentreadyPromise.then(
                function() {
                    nodefound = true;
                }
            );
            //wait 2500 milliseconds and then run this function
            this.wait(function(){
                Y.Assert.isTrue(nodefound, NODE_NOT_CONTENTREADY);
            }, 2500);
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'gallery-itsanodepromise', 'yui-later' ] });
