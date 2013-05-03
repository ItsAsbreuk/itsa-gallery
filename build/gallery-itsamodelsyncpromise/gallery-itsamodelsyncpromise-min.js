YUI.add("gallery-itsamodelsyncpromise",function(e,t){"use strict";function a(){}function f(){}var n=e.Array,r="error",i="submit",s="load",o="save",u=function(t){var n;try{n=e.JSON.parse(t)}catch(r){}return n};e.mix(a.prototype,{submitPromise:function(t){t=t||{};var n=this,s=new e.Promise(function(e,s){n.sync("submit",t,function(o,u){var a={options:t,response:u};o?(a.error=o,a.src="submit",n.fire(r,a),s(new Error(o))):(n._submitEvent||(n._submitEvent=n.publish(i,{preventable:!1})),n.fire(i,a),e(u,t))})});return s},loadPromise:function(t){t=t||{};var n=this,i=new e.Promise(function(e,i){n.sync("read",t,function(o,a){var f,l={options:t,response:a};o?(l.error=o,l.src="load",n.fire(r,l),i(new Error(o))):(n._loadEvent||(n._loadEvent=n.publish(s,{preventable:!1})),f=l.parsed=u(a),n.setAttrs(f,t),n.changed={},n.fire(s,l),e(a,t))})});return i},savePromise:function(t){t=t||{};var n=this,i=new e.Promise(function(e,i){var s={options:t,src:"save"};n._validate(n.toJSON(),function(a){a?(s.error=a,n.fire(r,s),i(new Error(a))):n.sync(n.isNew()?"create":"update",t,function(a,f){var l;s.response=f,a?(s.error=a,s.src="save",n.fire(r,s),i(new Error(a))):(n._saveEvent||(n._saveEvent=n.publish(o,{preventable:!1})),l=s.parsed=u(f),n.setAttrs(l,t),n.changed={},n.fire(o,s),e(f,t))})})});return i},destroyPromise:function(t){t=t||{};var i=this,s=new e.Promise(function(e,s){i.onceAfter("destroy",function(){function o(){n.each(i.lists.concat(),function(e){e.remove(i,t)})}t.remove||t["delete"]?i.sync("delete",t,function(n){if(n){var u={error:n,src:"destroy",options:t};i.fire(r,u),s(new Error(n))}else o(),e(t)}):(o(),e(t))})});return e.Model.superclass.destroy.call(i),s}},!0),e.ITSAModelSyncPromise=a,e.Base.mix(e.Model,[a]),e.mix(f.prototype,{loadPromise:function(t){t=t||{};var n=this,i=new e.Promise(function(e,i){n.sync("read",t,function(o,a){var f,l={options:t,response:a};o?(l.error=o,l.src="load",n.fire(r,l),i(new Error(o))):(n._loadEvent||(n._loadEvent=n.publish(s,{preventable:!1})),f=l.parsed=u(a),n.reset(f,t),n.fire(s,l),e(a,t))})});return i}},!0),e.ITSAModellistSyncPromise=f,e.Base.mix(e.ModelList,[f])},"@VERSION@",{requires:["yui-base","base-base","base-build","node-base","json-parse","promise","model","model-list","yui-later"]});
