YUI.add("gallery-itsamodulesloadedpromise",function(e,t){"use strict";var n=2e4,r="Timeout: requested modules not loaded within 20 seconds";e.usePromise=function(){var t=arguments;return new e.Promise(function(i,s){[].push.apply(t,[function(){i()}]),e.use.apply(e,t),e.later(n,null,s,r)})}},"@VERSION@",{requires:["yui-base","promise","yui-later"]});
