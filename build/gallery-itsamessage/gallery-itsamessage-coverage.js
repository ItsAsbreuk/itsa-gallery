if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/gallery-itsamessage/gallery-itsamessage.js']) {
   __coverage__['build/gallery-itsamessage/gallery-itsamessage.js'] = {"path":"build/gallery-itsamessage/gallery-itsamessage.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":50}}},"2":{"name":"(anonymous_2)","line":46,"loc":{"start":{"line":46,"column":23},"end":{"line":46,"column":35}}},"3":{"name":"(anonymous_3)","line":52,"loc":{"start":{"line":52,"column":23},"end":{"line":52,"column":35}}},"4":{"name":"(anonymous_4)","line":59,"loc":{"start":{"line":59,"column":23},"end":{"line":59,"column":35}}},"5":{"name":"(anonymous_5)","line":66,"loc":{"start":{"line":66,"column":23},"end":{"line":66,"column":35}}},"6":{"name":"(anonymous_6)","line":72,"loc":{"start":{"line":72,"column":23},"end":{"line":72,"column":35}}},"7":{"name":"(anonymous_7)","line":79,"loc":{"start":{"line":79,"column":23},"end":{"line":79,"column":35}}},"8":{"name":"(anonymous_8)","line":85,"loc":{"start":{"line":85,"column":23},"end":{"line":85,"column":35}}},"9":{"name":"(anonymous_9)","line":92,"loc":{"start":{"line":92,"column":23},"end":{"line":92,"column":35}}},"10":{"name":"(anonymous_10)","line":98,"loc":{"start":{"line":98,"column":23},"end":{"line":98,"column":35}}},"11":{"name":"(anonymous_11)","line":104,"loc":{"start":{"line":104,"column":23},"end":{"line":104,"column":35}}},"12":{"name":"(anonymous_12)","line":110,"loc":{"start":{"line":110,"column":23},"end":{"line":110,"column":35}}},"13":{"name":"(anonymous_13)","line":117,"loc":{"start":{"line":117,"column":23},"end":{"line":117,"column":35}}},"14":{"name":"(anonymous_14)","line":123,"loc":{"start":{"line":123,"column":23},"end":{"line":123,"column":35}}},"15":{"name":"(anonymous_15)","line":129,"loc":{"start":{"line":129,"column":23},"end":{"line":129,"column":35}}},"16":{"name":"(anonymous_16)","line":136,"loc":{"start":{"line":136,"column":30},"end":{"line":136,"column":41}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":143,"column":69}},"2":{"start":{"line":25,"column":0},"end":{"line":31,"column":6}},"3":{"start":{"line":33,"column":0},"end":{"line":134,"column":3}},"4":{"start":{"line":47,"column":16},"end":{"line":47,"column":45}},"5":{"start":{"line":53,"column":16},"end":{"line":53,"column":45}},"6":{"start":{"line":60,"column":16},"end":{"line":60,"column":46}},"7":{"start":{"line":67,"column":16},"end":{"line":67,"column":65}},"8":{"start":{"line":73,"column":16},"end":{"line":73,"column":45}},"9":{"start":{"line":80,"column":16},"end":{"line":80,"column":46}},"10":{"start":{"line":86,"column":16},"end":{"line":86,"column":45}},"11":{"start":{"line":93,"column":16},"end":{"line":93,"column":46}},"12":{"start":{"line":99,"column":16},"end":{"line":99,"column":71}},"13":{"start":{"line":105,"column":16},"end":{"line":105,"column":45}},"14":{"start":{"line":111,"column":16},"end":{"line":111,"column":45}},"15":{"start":{"line":118,"column":16},"end":{"line":118,"column":46}},"16":{"start":{"line":124,"column":16},"end":{"line":124,"column":45}},"17":{"start":{"line":130,"column":16},"end":{"line":130,"column":45}},"18":{"start":{"line":136,"column":0},"end":{"line":141,"column":2}},"19":{"start":{"line":137,"column":4},"end":{"line":137,"column":38}},"20":{"start":{"line":139,"column":4},"end":{"line":139,"column":25}}},"branchMap":{"1":{"line":67,"type":"binary-expr","locations":[{"start":{"line":67,"column":24},"end":{"line":67,"column":43}},{"start":{"line":67,"column":48},"end":{"line":67,"column":64}}]},"2":{"line":99,"type":"binary-expr","locations":[{"start":{"line":99,"column":24},"end":{"line":99,"column":44}},{"start":{"line":99,"column":50},"end":{"line":99,"column":69}}]},"3":{"line":139,"type":"binary-expr","locations":[{"start":{"line":139,"column":4},"end":{"line":139,"column":11}},{"start":{"line":139,"column":15},"end":{"line":139,"column":24}}]}},"code":["(function () { YUI.add('gallery-itsamessage', function (Y, NAME) {","","'use strict';","","/*jshint maxlen:200 */","","/**"," *"," * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value."," * This model is for defining the UI-structure for all Model's properties and for firing model-events for"," * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel."," *"," * @module gallery-itsaformmodel"," * @extends Model"," * @uses gallery-itsamodelsyncpromise"," * @class ITSAFormModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var ITSAMessage,","    INFO = 'info',","    MESSAGELEVELS = {","        info: true,","        warn: true,","        error: true","    };","","ITSAMessage = Y.ITSAMessage = Y.Base.create('itsamessage', Y.ITSAFormModel, [], {}, {","    ATTRS: {","        /**","         * Axis upon which the Slider's thumb moves.  &quot;x&quot; for","         * horizontal, &quot;y&quot; for vertical.","         *","         * @attribute handleAnonymous","         * @type {Boolean}","         * @default false","         */","        autoDestroy: {","            value: 1000,","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='number');","            }","        },","        footer: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        },","        imageButtons: {","            value: false,","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='boolean');","            }","        },","        level: {","            value: INFO,","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string') && MESSAGELEVELS[v];","            }","        },","        message: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        },","        noButtons: {","            value: false,","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='boolean');","            }","        },","        options: {","            readOnly: true,","            validator: function(v) {","                return (typeof v==='object');","            }","        },","        processing: {","            readOnly: true,","            value: false,","            validator: function(v) {","                return (typeof v==='boolean');","            }","        },","        primaryButton: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='boolean') || (typeof v==='string');","            }","        },","        rejectButton: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        },","        source: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        },","        suspended: {","            value: false,","            readOnly: true,","            validator: function(v) {","                return (typeof v==='boolean');","            }","        },","        title: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        },","        target: {","            writeOnce: 'initOnly',","            validator: function(v) {","                return (typeof v==='string');","            }","        }","    }","});","","ITSAMessage.prototype.erase = function() {","    var resolve = this.resolvePromise;","/*jshint expr:true */","    resolve && resolve();","/*jshint expr:false */","};","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"gallery-itsaformmodel\"]});","","}());"]};
}
var __cov_aA7qaoG77CyMLQqu9rE0BQ = __coverage__['build/gallery-itsamessage/gallery-itsamessage.js'];
__cov_aA7qaoG77CyMLQqu9rE0BQ.s['1']++;YUI.add('gallery-itsamessage',function(Y,NAME){'use strict';__cov_aA7qaoG77CyMLQqu9rE0BQ.f['1']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['2']++;var ITSAMessage,INFO='info',MESSAGELEVELS={info:true,warn:true,error:true};__cov_aA7qaoG77CyMLQqu9rE0BQ.s['3']++;ITSAMessage=Y.ITSAMessage=Y.Base.create('itsamessage',Y.ITSAFormModel,[],{},{ATTRS:{autoDestroy:{value:1000,writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['2']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['4']++;return typeof v==='number';}},footer:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['3']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['5']++;return typeof v==='string';}},imageButtons:{value:false,writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['4']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['6']++;return typeof v==='boolean';}},level:{value:INFO,writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['5']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['7']++;return(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['1'][0]++,typeof v==='string')&&(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['1'][1]++,MESSAGELEVELS[v]);}},message:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['6']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['8']++;return typeof v==='string';}},noButtons:{value:false,writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['7']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['9']++;return typeof v==='boolean';}},options:{readOnly:true,validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['8']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['10']++;return typeof v==='object';}},processing:{readOnly:true,value:false,validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['9']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['11']++;return typeof v==='boolean';}},primaryButton:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['10']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['12']++;return(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['2'][0]++,typeof v==='boolean')||(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['2'][1]++,typeof v==='string');}},rejectButton:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['11']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['13']++;return typeof v==='string';}},source:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['12']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['14']++;return typeof v==='string';}},suspended:{value:false,readOnly:true,validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['13']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['15']++;return typeof v==='boolean';}},title:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['14']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['16']++;return typeof v==='string';}},target:{writeOnce:'initOnly',validator:function(v){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['15']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['17']++;return typeof v==='string';}}}});__cov_aA7qaoG77CyMLQqu9rE0BQ.s['18']++;ITSAMessage.prototype.erase=function(){__cov_aA7qaoG77CyMLQqu9rE0BQ.f['16']++;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['19']++;var resolve=this.resolvePromise;__cov_aA7qaoG77CyMLQqu9rE0BQ.s['20']++;(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['3'][0]++,resolve)&&(__cov_aA7qaoG77CyMLQqu9rE0BQ.b['3'][1]++,resolve());};},'@VERSION@',{'requires':['yui-base','gallery-itsaformmodel']});
