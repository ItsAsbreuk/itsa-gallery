if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/gallery-itsamarkermodel/gallery-itsamarkermodel.js']) {
   __coverage__['build/gallery-itsamarkermodel/gallery-itsamarkermodel.js'] = {"path":"build/gallery-itsamarkermodel/gallery-itsamarkermodel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0,0,0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"ITSAMarkerModel","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":27}}},"3":{"name":"(anonymous_3)","line":30,"loc":{"start":{"line":30,"column":19},"end":{"line":30,"column":30}}},"4":{"name":"(anonymous_4)","line":35,"loc":{"start":{"line":35,"column":19},"end":{"line":35,"column":30}}},"5":{"name":"(anonymous_5)","line":40,"loc":{"start":{"line":40,"column":19},"end":{"line":40,"column":30}}},"6":{"name":"(anonymous_6)","line":45,"loc":{"start":{"line":45,"column":19},"end":{"line":45,"column":30}}},"7":{"name":"(anonymous_7)","line":50,"loc":{"start":{"line":50,"column":19},"end":{"line":50,"column":30}}},"8":{"name":"(anonymous_8)","line":55,"loc":{"start":{"line":55,"column":19},"end":{"line":55,"column":30}}},"9":{"name":"(anonymous_9)","line":80,"loc":{"start":{"line":80,"column":19},"end":{"line":80,"column":30}}},"10":{"name":"(anonymous_10)","line":85,"loc":{"start":{"line":85,"column":19},"end":{"line":85,"column":30}}},"11":{"name":"(anonymous_11)","line":92,"loc":{"start":{"line":92,"column":35},"end":{"line":92,"column":46}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":108,"column":60}},"2":{"start":{"line":20,"column":0},"end":{"line":22,"column":1}},"3":{"start":{"line":21,"column":4},"end":{"line":21,"column":66}},"4":{"start":{"line":24,"column":0},"end":{"line":24,"column":41}},"5":{"start":{"line":26,"column":0},"end":{"line":88,"column":2}},"6":{"start":{"line":30,"column":32},"end":{"line":30,"column":64}},"7":{"start":{"line":35,"column":32},"end":{"line":35,"column":63}},"8":{"start":{"line":40,"column":32},"end":{"line":40,"column":63}},"9":{"start":{"line":45,"column":32},"end":{"line":45,"column":77}},"10":{"start":{"line":50,"column":32},"end":{"line":50,"column":77}},"11":{"start":{"line":55,"column":32},"end":{"line":55,"column":78}},"12":{"start":{"line":80,"column":32},"end":{"line":80,"column":64}},"13":{"start":{"line":85,"column":32},"end":{"line":85,"column":124}},"14":{"start":{"line":90,"column":0},"end":{"line":90,"column":55}},"15":{"start":{"line":92,"column":0},"end":{"line":106,"column":2}},"16":{"start":{"line":93,"column":4},"end":{"line":94,"column":83}},"17":{"start":{"line":96,"column":4},"end":{"line":96,"column":34}},"18":{"start":{"line":97,"column":4},"end":{"line":97,"column":35}},"19":{"start":{"line":98,"column":4},"end":{"line":98,"column":39}},"20":{"start":{"line":99,"column":4},"end":{"line":99,"column":37}},"21":{"start":{"line":100,"column":4},"end":{"line":100,"column":39}},"22":{"start":{"line":101,"column":4},"end":{"line":101,"column":29}},"23":{"start":{"line":102,"column":4},"end":{"line":102,"column":32}},"24":{"start":{"line":103,"column":4},"end":{"line":103,"column":31}},"25":{"start":{"line":104,"column":4},"end":{"line":104,"column":29}},"26":{"start":{"line":105,"column":4},"end":{"line":105,"column":18}}},"branchMap":{"1":{"line":45,"type":"binary-expr","locations":[{"start":{"line":45,"column":40},"end":{"line":45,"column":48}},{"start":{"line":45,"column":54},"end":{"line":45,"column":75}}]},"2":{"line":50,"type":"binary-expr","locations":[{"start":{"line":50,"column":40},"end":{"line":50,"column":48}},{"start":{"line":50,"column":54},"end":{"line":50,"column":75}}]},"3":{"line":55,"type":"binary-expr","locations":[{"start":{"line":55,"column":40},"end":{"line":55,"column":48}},{"start":{"line":55,"column":54},"end":{"line":55,"column":76}}]},"4":{"line":85,"type":"binary-expr","locations":[{"start":{"line":85,"column":40},"end":{"line":85,"column":48}},{"start":{"line":85,"column":54},"end":{"line":85,"column":65}},{"start":{"line":85,"column":71},"end":{"line":85,"column":83}},{"start":{"line":85,"column":89},"end":{"line":85,"column":100}},{"start":{"line":85,"column":106},"end":{"line":85,"column":122}}]}},"code":["(function () { YUI.add('gallery-itsamarkermodel', function (Y, NAME) {","","'use strict';","/*jshint maxlen:200 */","","/**"," *"," * Desc<br />"," *"," * @module gallery-itsamarkermodel"," * @extends Model"," * @class Y.ITSAMarkerModel"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","function ITSAMarkerModel() {","    ITSAMarkerModel.superclass.constructor.apply(this, arguments);","}","","ITSAMarkerModel.NAME = 'itsamarkermodel';","","ITSAMarkerModel.ATTRS = {","","    extraZ: {","        value: 0,","        validator: function(v){ return (typeof v === 'boolean'); }","    },","","    lat: {","        value: 0,","        validator: function(v){ return (typeof v === 'number'); }","    },","","    lon: {","        value: 0,","        validator: function(v){ return (typeof v === 'number'); }","    },","","    markerClassname: {","        value: null,","        validator: function(v){ return (v===null) || (typeof v === 'string'); }","    },","","    markerColorClass: { // classname, should be one of the predefined 'red', 'blue' etc, or a custom classname","        value: null,","        validator: function(v){ return (v===null) || (typeof v === 'string'); }","    },","","    markerDetailsClosable: {","        value: null,","        validator: function(v){ return (v===null) || (typeof v === 'boolean'); }","    },","","    markerHeaderTemplate: {","        value: null","    },","","    markerBodyTemplate: {","        value: null","    },","","    markerFooterTemplate: {","        value: null","    },","","    markerHTML: {","        value: null","    },","","    markerNumber: {","        value: null","    },","","    markerVisible: {","        value: true,","        validator: function(v){ return (typeof v === 'boolean'); }","    },","","    markerSize: {","        value: null,","        validator: function(v){ return (v===null) || (v==='small') || (v==='normal') || (v==='large') || (v==='extralarge'); }","    }","","};","","Y.ITSAMarkerModel = Y.extend(ITSAMarkerModel, Y.Model);","","ITSAMarkerModel.prototype.toJSON = function() {","    var instance = this,","        tojson = instance.constructor.superclass.toJSON.apply(instance, arguments);","    // Attribute 'markerNumber' must be part of toJSON!","    delete tojson.markerClassname;","    delete tojson.markerColorClass;","    delete tojson.markerHeaderTemplate;","    delete tojson.markerBodyTemplate;","    delete tojson.markerFooterTemplate;","    delete tojson.markerText;","    delete tojson.markerVisible;","    delete tojson.markerZindex;","    delete tojson.markerSize;","    return tojson;","};","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"oop\", \"model\"]});","","}());"]};
}
var __cov_$sA4Ht63$uyHzCW90H2i9g = __coverage__['build/gallery-itsamarkermodel/gallery-itsamarkermodel.js'];
__cov_$sA4Ht63$uyHzCW90H2i9g.s['1']++;YUI.add('gallery-itsamarkermodel',function(Y,NAME){'use strict';__cov_$sA4Ht63$uyHzCW90H2i9g.f['1']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['2']++;function ITSAMarkerModel(){__cov_$sA4Ht63$uyHzCW90H2i9g.f['2']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['3']++;ITSAMarkerModel.superclass.constructor.apply(this,arguments);}__cov_$sA4Ht63$uyHzCW90H2i9g.s['4']++;ITSAMarkerModel.NAME='itsamarkermodel';__cov_$sA4Ht63$uyHzCW90H2i9g.s['5']++;ITSAMarkerModel.ATTRS={extraZ:{value:0,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['3']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['6']++;return typeof v==='boolean';}},lat:{value:0,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['4']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['7']++;return typeof v==='number';}},lon:{value:0,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['5']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['8']++;return typeof v==='number';}},markerClassname:{value:null,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['6']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['9']++;return(__cov_$sA4Ht63$uyHzCW90H2i9g.b['1'][0]++,v===null)||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['1'][1]++,typeof v==='string');}},markerColorClass:{value:null,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['7']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['10']++;return(__cov_$sA4Ht63$uyHzCW90H2i9g.b['2'][0]++,v===null)||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['2'][1]++,typeof v==='string');}},markerDetailsClosable:{value:null,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['8']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['11']++;return(__cov_$sA4Ht63$uyHzCW90H2i9g.b['3'][0]++,v===null)||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['3'][1]++,typeof v==='boolean');}},markerHeaderTemplate:{value:null},markerBodyTemplate:{value:null},markerFooterTemplate:{value:null},markerHTML:{value:null},markerNumber:{value:null},markerVisible:{value:true,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['9']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['12']++;return typeof v==='boolean';}},markerSize:{value:null,validator:function(v){__cov_$sA4Ht63$uyHzCW90H2i9g.f['10']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['13']++;return(__cov_$sA4Ht63$uyHzCW90H2i9g.b['4'][0]++,v===null)||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['4'][1]++,v==='small')||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['4'][2]++,v==='normal')||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['4'][3]++,v==='large')||(__cov_$sA4Ht63$uyHzCW90H2i9g.b['4'][4]++,v==='extralarge');}}};__cov_$sA4Ht63$uyHzCW90H2i9g.s['14']++;Y.ITSAMarkerModel=Y.extend(ITSAMarkerModel,Y.Model);__cov_$sA4Ht63$uyHzCW90H2i9g.s['15']++;ITSAMarkerModel.prototype.toJSON=function(){__cov_$sA4Ht63$uyHzCW90H2i9g.f['11']++;__cov_$sA4Ht63$uyHzCW90H2i9g.s['16']++;var instance=this,tojson=instance.constructor.superclass.toJSON.apply(instance,arguments);__cov_$sA4Ht63$uyHzCW90H2i9g.s['17']++;delete tojson.markerClassname;__cov_$sA4Ht63$uyHzCW90H2i9g.s['18']++;delete tojson.markerColorClass;__cov_$sA4Ht63$uyHzCW90H2i9g.s['19']++;delete tojson.markerHeaderTemplate;__cov_$sA4Ht63$uyHzCW90H2i9g.s['20']++;delete tojson.markerBodyTemplate;__cov_$sA4Ht63$uyHzCW90H2i9g.s['21']++;delete tojson.markerFooterTemplate;__cov_$sA4Ht63$uyHzCW90H2i9g.s['22']++;delete tojson.markerText;__cov_$sA4Ht63$uyHzCW90H2i9g.s['23']++;delete tojson.markerVisible;__cov_$sA4Ht63$uyHzCW90H2i9g.s['24']++;delete tojson.markerZindex;__cov_$sA4Ht63$uyHzCW90H2i9g.s['25']++;delete tojson.markerSize;__cov_$sA4Ht63$uyHzCW90H2i9g.s['26']++;return tojson;};},'@VERSION@',{'requires':['yui-base','oop','model']});
