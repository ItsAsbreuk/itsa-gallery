YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-itsamodelsyncpromise');
    Y.CountryModel = Y.Base.create('countryModel', Y.Model, [], {
        sync: function (action, options, callback) {
            var instance = this,
                data;
            switch (action) {
              case 'create':
                Y.later(1500, null, function() {
                    data = {id: 1, Country: "The Netherlands"};
                    callback(null, Y.JSON.stringify(data));
                });
                return;
              case 'update':
                Y.later(1500, null, function() {
                    data = {Country: "The Netherlands"};
                    callback(null, Y.JSON.stringify(data));
                });
                return;
              case 'delete':
                Y.later(1500, null, function() {
                    data = {Country: "The Netherlands"};
                    callback(null, Y.JSON.stringify(data));
                });
                return;
              case 'read':
                Y.later(1500, null, function() {
                    data = {Country: "The Netherlands"};
                    callback(null, Y.JSON.stringify(data));
                });
                return;
              default:
                callback('Invalid action');
            }
        }
    });

    Y.CountryModelError = Y.Base.create('countryModel', Y.Model, [], {
        sync: function (action, options, callback) {
            var instance = this,
                data;
            switch (action) {
              case 'create':
                Y.later(1500, null, function() {
                    data = {id: 1, Country: "The Netherlands"};
                    callback(null, Y.JSON.stringify(data));
                });
                return;
              case 'update':
                Y.later(1500, null, function() {
                    callback('Error during update');
                });
                return;
              case 'delete':
                Y.later(1500, null, function() {
                    callback('Error during delete');
                });
                return;
              case 'read':
                Y.later(1500, null, function() {
                    callback('Error during read');
                });
                return;
              default:
                callback('Invalid action');
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'Check destroy when sync goes well',
        setUp : function () {
//            mycountrymodel = new Y.CountryModel({id: 1});
        },
        tearDown : function () {
//            mycountrymodel.destroy({remove: true});
        },
        '1. On-event in time': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.on('destroy', function() {
                test.resume(function(){
                    Y.Assert.pass();
                });
            });
            mycountrymodel.destroy();
            this.wait(function(){
                Y.Assert.fail('Model\'s on-destroy is not executed before the synclayer started');
            }, 750);
        },
        '2. After-event not too early': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.after('destroy', function() {
                test.resume(function(){
console.log('fase 3');
                    Y.Assert.fail('Model\'s after-destroy is executed before the synclayer started');
console.log('fase 4');
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
console.log('fase 1');
                Y.Assert.pass();
console.log('fase 2');
            }, 750);
        },
        '3. After-event after syncing': function() {
            var test = this,
                mycountrymodel3 = new Y.CountryModel({id: 1});
            mycountrymodel3.after('destroy', function() {
                test.resume(function(){
console.log('fase 1a');
                    Y.Assert.pass();
console.log('fase 1b');
                });
            });
            mycountrymodel3.destroy({remove: true});
            this.wait(function(){
console.log('fase 1c');
               Y.Assert.fail('Model\'s after-destroy is not executed at all');
console.log('fase 1d');
            }, 2250);
/*        },
        '4. DefaultFn check': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.isTrue(mycountrymodel.get('destroyed'), 'Model\'s defaultFn seems not to work: model is not destroyed');
            }, 2250);
        },
        '5. DefaultFn not executed when prevented': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.on('destroy', function() {
                e.preventDefault();
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.isFalse(mycountrymodel.get('destroyed'), 'Model\'s defaultFn is not prevented: model is destroyed nevertheless');
            }, 2250);
        },
        '6. After-event not executed when prevented': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.on('destroy', function() {
                e.preventDefault();
            });
            mycountrymodel.after('destroy', function() {
                test.resume(function(){
                   Y.Assert.fail('Model\'s after-destroy is executed even if event was prevented');
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.pass();
            }, 2250);
        },
        '7. check promise': function() {
            var startdelayed = false,
                test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            Y.later(750, null, function() {
                startdelayed = true;
            });
            mycountrymodel.destroyPromise({remove: true}).then(
                function() {
                    test.resume(function(){
                        Y.Assert.isTrue(startdelayed, 'Destroypromise is fulfilled before the synclayer is finished');
                    });
                },
                function() {
                    test.resume(function(){
                        Y.Assert.fail('Destroypromise is rejected while it should have been fulfilled');
                    });
                }
            );
            this.wait(function(){
               Y.Assert.fail('Destroypromise is not resolved within expected time');
            }, 2250);
        },
        '8. check error-event': function() {
            var test = this,
                mycountrymodel = new Y.CountryModel({id: 1});
            mycountrymodel.on('error', function() {
                test.resume(function(){
                   Y.Assert.fail('error event occured while the sync should be ok');
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.pass();
            }, 2250);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Check destroy when sync has error',
        setUp : function () {

        },
        tearDown : function () {
//            mycountrymodel.destroy({remove: true});
        },
        '9. On-event in time': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.on('destroy', function() {
                test.resume(function(){
                   Y.Assert.pass();
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.fail('syncing with error: Model\'s on-destroy is not executed before the synclayer started');
            }, 750);
        },
        '10. After-event not too early': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.after('destroy', function() {
                test.resume(function(){
                   Y.Assert.fail('syncing with error: Model\'s after-destroy is executed before the synclayer started');
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.pass();
            }, 750);
        },
        '11. After-event after syncing': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.after('destroy', function() {
                test.resume(function(){
                   Y.Assert.pass();
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
               Y.Assert.fail('syncing with error: Model\'s after-destroy is executed even when sync had an error');
            }, 2250);
        },
        '12. DefaultFn check': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.isFalse(mycountrymodel.get('destroyed'), 'syncing with error: Model\'s defaultFn destoyed the model, even when syncin had an error');
            }, 2250);
        },
        '13. DefaultFn not executed when prevented': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.on('destroy', function() {
                e.preventDefault();
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.isFalse(mycountrymodel.get('destroyed'), 'syncing with error: Model\'s defaultFn is not prevented: model is destroyed nevertheless');
            }, 2250);
        },
        '14. After-event not executed when prevented': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.on('destroy', function() {
                e.preventDefault();
            });
            mycountrymodel.after('destroy', function() {
                test.resume(function(){
                   Y.Assert.fail('syncing with error: Model\'s after-destroy is executed even if event was prevented');
                });
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.pass();
            }, 2250);
        },
        '15. check promise': function() {
            var startdelayed = false,
                test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            Y.later(750, null, function() {
                startdelayed = true;
            });
            mycountrymodel.destroyPromise({remove: true}).then(
                function() {
                    if (startdelayed) {
                        test.resume(function(){
                            Y.Assert.isTrue(startdelayed, 'syncing with error: Destroypromise is fulfilled before the synclayer is finished');
                       });
                    }
                    else {
                        test.resume(function(){
                            Y.Assert.fail('syncing with error: Destroypromise is fulfilled even if syncing gave an error');
                        });
                    }
                },
                function(reason) {
                    test.resume(function(){
                       Y.Assert.areSame('Error during delete', reason.error, 'syncing with error: Destroypromise is rejected as should be, but the error is different');
                    });
                }
            );
            this.wait(function(){
               Y.Assert.fail('syncing with error: Destroypromise is not resolved within expected time');
            }, 2250);
        },
        '16. check error-event': function() {
            var test = this,
                mycountrymodel = new Y.CountryModelError({id: 1});
            mycountrymodel.on('error', function() {
                Y.Assert.pass();
            });
            mycountrymodel.destroy({remove: true});
            this.wait(function(){
                Y.Assert.fail('error event DID NOT occur while the sync should return an error');
            }, 2250);
*/        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'test', 'gallery-itsamodelsyncpromise' ] });
