YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-ITSAViewModelPanel');

/*

todo:

test1: is a form generated when editable elements, but no formtag in the template nor in the container

test2: is a form NOT generated when editable elements and a formtag in the template available but not in the container

test3: is a form NOT generated when editable elements and the container is a formtag

*/
    suite.add(new Y.Test.Case({
        name: 'Memory Tests',
        setUp : function () {
            this.viewmodel = new Y.ITSAViewModelPanel();
            this.viewmodel2 = new Y.ITSAViewModelPanel();
            this.viewmodel3 = new Y.ITSAViewModelPanel();
            this.viewmodel4 = new Y.ITSAViewModelPanel();
            this.viewmodel5 = new Y.ITSAViewModelPanel();
            this.viewmodel6 = new Y.ITSAViewModelPanel();
            this.viewmodel7 = new Y.ITSAViewModelPanel();
            this.viewmodel8 = new Y.ITSAViewModelPanel();
            this.viewmodel9 = new Y.ITSAViewModelPanel();
            this.viewmodel10 = new Y.ITSAViewModelPanel();
            this.viewmodel11 = new Y.ITSAViewModelPanel();
            this.viewmodel12 = new Y.ITSAViewModelPanel();
            this.viewmodel13 = new Y.ITSAViewModelPanel();
            this.viewmodel14 = new Y.ITSAViewModelPanel();
            this.viewmodel15 = new Y.ITSAViewModelPanel();
            this.viewmodel16 = new Y.ITSAViewModelPanel();
            this.viewmodel17 = new Y.ITSAViewModelPanel();
            this.viewmodel18 = new Y.ITSAViewModelPanel();
            this.viewmodel19 = new Y.ITSAViewModelPanel();
            this.viewmodel20 = new Y.ITSAViewModelPanel();
        },
        tearDown : function () {
            this.viewmodel.destroy();
            this.viewmodel2.destroy();
            this.viewmodel3.destroy();
            this.viewmodel4.destroy();
            this.viewmodel5.destroy();
            this.viewmodel6.destroy();
            this.viewmodel7.destroy();
            this.viewmodel8.destroy();
            this.viewmodel9.destroy();
            this.viewmodel10.destroy();
            this.viewmodel11.destroy();
            this.viewmodel12.destroy();
            this.viewmodel13.destroy();
            this.viewmodel14.destroy();
            this.viewmodel15.destroy();
            this.viewmodel16.destroy();
            this.viewmodel17.destroy();
            this.viewmodel18.destroy();
            this.viewmodel19.destroy();
            this.viewmodel20.destroy();
        },
        'test GC': function() {
            this.viewmodel.render();
            this.viewmodel2.render();
            // no rendering viewmodel3, because that leads to different destruction
            this.viewmodel4.render();
            this.viewmodel5.render();
            this.viewmodel6.render();
            this.viewmodel7.render();
            this.viewmodel8.render();
            this.viewmodel9.render();
            this.viewmodel10.render();
            this.viewmodel11.render();
            this.viewmodel12.render();
            this.viewmodel13.render();
            this.viewmodel14.render();
            this.viewmodel15.render();
            this.viewmodel16.render();
            this.viewmodel17.render();
            this.viewmodel18.render();
            this.viewmodel19.render();
            this.viewmodel20.render();
            Y.Assert.pass();
        }
    }));
/*
    suite.add(new Y.Test.Case({
        name: 'Memory Tests with model',
        setUp : function () {
            Y.ArtistModel = Y.Base.create('formmodel', Y.ITSAFormModel, [], {
                sync: function (action, options, callback) {
                    switch (action) {
                      case 'submit':
                        Y.later(1500, null, function() {
                            callback();
                        });
                        return;
                      default:
                        callback('Invalid action');
                    }
                }
            }, {
                ATTRS: {
                    name: {
                        formtype: 'text',
                        formconfig: {
                            label: 'Artist',
                            placeholder: 'artist',
                            required: true
                        }
                    },
                    country: {
                        formtype: 'text',
                        formconfig: {
                            label: 'Country',
                            placeholder: 'country',
                            required: true,
                            initialfocus: true
                        }
                    },
                    firstalbum: {
                        formtype: 'text',
                        formconfig: {
                            label: 'First album',
                            placeholder: 'first album',
                            required: true
                        }
                    },
                    release: {
                        formtype: Y.Slider,
                        formconfig: {
                            label: 'Releaseyear',
                            widgetconfig: {
                                min: 1950,
                                max: 2010
                            }
                        }
                    }
                }
            });

            this.artist = new Y.ArtistModel({
                name: 'U2',
                country: 'Ireland',
                firstalbum: 'Boy',
                release: 1980
            });
            this.artist.setLifeUpdate(true);

            var template = '<fieldset>'+
                            '<legend>Editable template</legend>'+
                            '<div class="pure-control-group">{name}</div>'+
                            '<div class="pure-control-group">{country}</div>'+
                            '<div class="pure-control-group">{firstalbum}</div>'+
                            '<div class="pure-control-group">{release}</div>'+
                            '<div class="pure-controls">{btn_reset} {spinbtn_submit}</div>'+
                        '</fieldset>';

            this.viewmodel = new Y.ITSAViewModelPanel({
                model: this.artist,
                template: template,
                editable: true
            });
            this.viewmodel2 = new Y.ITSAViewModelPanel({
                model: this.artist,
                template: template,
                editable: true
            });
            this.viewmodel3 = new Y.ITSAViewModelPanel({
                model: this.artist,
                template: template,
                editable: true
            });
        },
        tearDown : function () {
            this.viewmodel.destroy();
            this.viewmodel2.destroy();
            this.viewmodel3.destroy();
            this.artist.destroy();
        },
        'test GC2': function() {
            this.viewmodel.render();
            this.viewmodel2.render();
           // this.viewmodel3.render();
            Y.Assert.pass();
        }
    }));
*/
    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'gallery-itsaviewmodelpanel', 'gallery-itsaformmodel' , 'base-build'] });
