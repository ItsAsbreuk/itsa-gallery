YUI.add("gallery-itsamodellistsyncpromise",function(e,t){"use strict";function a(){}var n="error",r="save",i="submit",s="load",o="destroy",u=function(t){var n;try{n=e.JSON.parse(t)}catch(r){}return n};e.mix(a.prototype,{destroyPromise:function(t){var r=this,i=[];return r.each(function(e){i.push(e.destroyPromise(t))}),e.batch.apply(e,i).then(function(e){var n={options:t,src:"destroy"};return r.fire(o,n),e},function(e){var i={options:t,src:"destroy",error:e};return r.fire(n,i),e})},loadPromise:function(t){var r=this;return t=t||{},new e.Promise(function(e,i){r.sync("read",t,function(o,a){var f,l={options:t,response:a};o?(l.error=o,l.src="load",r.fire(n,l),i(new Error(o))):(r._loadEvent||(r._loadEvent=r.publish(s,{preventable:!1})),f=l.parsed=u(a),r.reset(f,t),r.fire(s,l),e(a,t))})})},savePromise:function(t){var i=this,s=[];return i.each(function(e){e.isModified()&&s.push(e.savePromise(t))}),e.batch.apply(e,s).then(function(e){var n={options:t,src:"save"};return i.fire(r,n),e},function(e){var r={options:t,src:"save",error:e};return i.fire(n,r),e})},submitPromise:function(t){var r=this,s=[];return r.each(function(e){s.push(e.submitPromise(t))}),e.batch.apply(e,s).then(function(e){var n={options:t,src:"submit"};return r.fire(i,n),e},function(e){var i={options:t,src:"submit",error:e};return r.fire(n,i),e})}},!0),e.ITSAModellistSyncPromise=a,e.Base.mix(e.ModelList,[a])},"@VERSION@",{requires:["yui-base","base-base","base-build","node-base","json-parse","promise","model","model-list","gallery-itsamodelsyncpromise"]});