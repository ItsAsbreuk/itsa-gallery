YUI.add("gallery-itsamarkermodel",function(e,t){"use strict";function n(){n.superclass.constructor.apply(this,arguments)}n.NAME="itsamarkermodel",n.ATTRS={extraZ:{value:0,validator:function(e){return typeof e=="boolean"}},lat:{value:0,validator:function(e){return typeof e=="number"}},lon:{value:0,validator:function(e){return typeof e=="number"}},markerClassname:{value:null,validator:function(e){return e===null||typeof e=="string"}},markerColorClass:{value:null,validator:function(e){return e===null||typeof e=="string"}},markerDetailsClosable:{value:null,validator:function(e){return e===null||typeof e=="boolean"}},markerHeaderTemplate:{value:null},markerBodyTemplate:{value:null},markerFooterTemplate:{value:null},markerHTML:{value:null},markerNumber:{value:null},markerVisible:{value:!0,validator:function(e){return typeof e=="boolean"}},markerSize:{value:null,validator:function(e){return e===null||e==="small"||e==="normal"||e==="large"||e==="extralarge"}}},e.ITSAMarkerModel=e.extend(n,e.Model),n.prototype.toJSON=function(){var e=this,t=e.constructor.superclass.toJSON.apply(e,arguments);return delete t.markerClassname,delete t.markerColorClass,delete t.markerHeaderTemplate,delete t.markerBodyTemplate,delete t.markerFooterTemplate,delete t.markerText,delete t.markerVisible,delete t.markerZindex,delete t.markerSize,t}},"@VERSION@",{requires:["yui-base","oop","model"]});
