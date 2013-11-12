YUI.add("gallery-itsanodepromise",function(e,t){"use strict";var n=e.Node,r=e.Array,i=document.implementation.hasFeature("MutationEvents","2.0"),s=250,o="availableagain",u="unavailableagain",a="contentreadyagain";n.fireAvailabilities=function(t){var n=this,r;n._loopingEvents||(n._loopingEvents={}),r=n._loopingEvents,r[t]||(r[t]=function(){n.availablePromise(t).then(function(i){e.fire(o,{target:i,type:o}),n.unavailablePromise(t).then(function(n){e.fire(u,{target:n,type:u}),r[t]()})}),n.contentreadyPromise(t).then(function(t){e.fire(a,{target:t,type:a})})},r[t]())},n.availablePromise=function(t,n){return new e.Promise(function(r,i){var s=!1,o=e.once("available",function(){r(e.one(t)),s=!0,u&&u.cancel()},t),u=n&&e.later(n,null,function(){s||i(new Error(t+" was not available within "+n+" ms"))})})},n.contentreadyPromise=function(t,n){return new e.Promise(function(r,i){var s=!1,o=e.once("available",function(){r(e.one(t)),s=!0,u&&u.cancel()},t),u=n&&e.later(n,null,function(){s||i(new Error(t+" was not ready within "+n+" ms"))})})},r.each(["show","hide"],function(t){n[t+"Promise"]=function(n,r){var i=this;return e.usePromise("transition").then(function(){return new e.Promise(function(s){i[t](n||!0,r,e.bind(s,null,i))})},function(t){e.soon(function(){throw t})})}}),n.unavailablePromise=function(t,n){var r=this,o,u;return n=n||{},n.afteravailable?(o=e.merge(n),delete o.afteravailable,this.availablePromise(t,n.timeout).then(e.bind(r.unavailablePromise,r,t,o))):(u=new e.Promise(function(r,o){var a,f,l=n&&n.timeout,c=n&&n.intervalNonNative;e.one(t)?(i?f=e.after("DOMNodeRemoved",function(){e.soon(function(){e.one(t)||(f.detach(),r(t))})}):a=e.later(c||s,null,function(){e.one(t)||(a.cancel(),r(t))},null,!0),l&&e.later(l,null,function(){var n="node "+t+" was not removed within "+l+" ms";!i&&!e.one(t)?r(t):o(new Error(n)),f&&u.getStatus()==="pending"&&f.detach()})):r(t)}),u)},i&&e.mix(e.Node.DOM_EVENTS,{DOMNodeRemoved:!0}),e.Node.prototype.availablePromise=n.availablePromise,e.Node.prototype.contentreadyPromise=n.contentreadyPromise,e.Node.prototype.unavailablePromise=n.unavailablePromise,e.Node.prototype.showPromise=n.showPromise,e.Node.prototype.hidePromise=n.hidePromise},"@VERSION@",{requires:["yui-base","yui-later","event-base","event-custom","node-base","timers","promise","gallery-itsamodulesloadedpromise"]});
