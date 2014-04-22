YUI.add("gallery-itsalevelbarrel",function(e,t){"use strict";function A(){A.superclass.constructor.apply(this,arguments)}var n=e.Lang,r=e.Array,i="label",s="value",o="unity",u="maxValue",a="Change",f="className",l="olor",c="c"+l,h="C"+l,p="line"+h,d="barrel",v="background"+h,m="etails",g="d"+m,y="showD"+m,b=d+g,w="itsa-"+d+"-hidden",E="boundingBox",S="contentBox",x="level-indicator",T='<i class="itsaicon-dialog-info"></i>',N='<i class="itsaicon-dialog-error"></i>',C="1px 1px {color}, -1px 1px {color}, 1px -1px {color}, -1px -1px {color}",k='<button class="pure-button itsabutton-bordered itsabutton-onlyicon itsa-'+b+'-button {buttonvisible}">{'+g+"button}</button>"+'<div class="'+b+" {"+g+'class}"><div>{'+g+"}</div></div>"+'<div class="'+d+'label"><span>{label}</span></div>'+'<div class="'+d+'value"></div>'+'<div class="'+x+'"></div>',L="itsa-"+d+"-container";A.NAME="itsalevelbarrel",A.ATTRS={showDetails:{value:!1,validator:function(e){return typeof e=="boolean"}},details:{value:null,validator:function(e){return e===null||typeof e=="string"}},value:{value:0,validator:function(e){return typeof e=="number"||e===""}},maxValue:{value:100,validator:function(e){return typeof e=="number"}},className:{value:null,validator:function(e){return e===null||typeof e=="string"}},label:{value:null,validator:function(e){return e===null||typeof e=="string"}},color:{value:null,validator:function(e){return e===null||typeof e=="string"}},unity:{value:null,validator:function(e){return e===null||typeof e=="string"}},backgroundColor:{value:null,validator:function(e){return e===null||typeof e=="string"}},lineColor:{value:null,validator:function(e){return e===null||typeof e=="string"}}},e.ITSALevelBarrel=e.extend(A,e.Widget),A.prototype.initializer=function(){},A.prototype.renderUI=function(){var e=this,t=e.get(E),r=e.get(S),s=e.get(f),o=e.get(y),u=e.get(g)||"",a=e.get(c),l=e.get(v),h=e.get(p);t.addClass(L),s&&t.addClass(s),r.setHTML(n.sub(k,{label:e.get(i)||"",buttonvisible:u===""?w:"",detailsbutton:o?N:T,details:u,detailsclass:o?"":w})),a&&e._setColor({newVal:a}),l&&e._setBackgroundColor({newVal:l}),h&&e._setLineColor({newVal:h})},A.prototype.bindUI=function(){var t=this,n=t.get(S).one(".itsa-"+b+"-button"),r;r=t._eventhandlers=[],r.push(t.after([s+a,u+a,o+a],e.bind(t.syncUI,t))),r.push(t.after([c+a],e.bind(t._setColor,t))),r.push(t.after([p+a],e.bind(t._setLineColor,t))),r.push(t.after([v+a],e.bind(t._setBackgroundColor,t))),r.push(t.after([f+a],e.bind(t._changeClassName,t))),r.push(t.after([i+a],e.bind(t._changeLabel,t))),r.push(t.after([g+a],e.bind(t._changeDetails,t))),r.push(t.after([y+a],e.bind(t._changeShowDetails,t))),r.push(n.on("click",e.bind(t.toggleDetails,t)))},A.prototype.syncUI=function(){var e=this,t=e.get(S),n=t.one("."+x),r=e.get(s),i=e.get(u),a=Math.round(100*(i-(r||0))/i),f=e.get(o),l=t.one(".barrelvalue");n.setStyle("top",a+"%"),l.setHTML(r+(f?'<span class="barrelunity">'+e.get(o)+"</span>":""))},A.prototype.toggleDetails=function(){var e=this;e.set(y,!e.get(y))},A.prototype.destructor=function(){var e=this;e._clearEventhandlers()},A.prototype._changeDetails=function(e){var t=this,n=e.newVal||"",r=t.get(S),i=r.one(".barreldetails div"),s=r.one(".itsa-"+b+"-button");i.setHTML(n),s.toggleClass(w,n==="")},A.prototype._changeShowDetails=function(e){var t=this,n=e.newVal,r=t.get(S),i=r.one(".barreldetails"),s=r.one(".itsa-"+b+"-button");i.toggleClass(w,!n),s.setHTML(n?N:T)},A.prototype._changeLabel=function(e){var t=this,n=e.newVal||"",r=t.get(S),i=r.one(".barrellabel span");i.setHTML(n)},A.prototype._changeClassName=function(e){var t=this,n=e.newVal,r=e.prevVal,i=t.get(E);r&&i.removeClass(r),n&&i.addClass(n)},A.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},A.prototype._setColor=function(e){var t=this,n=e.newVal||"",r=t.get(S),i=r.one(".barrelvalue");i.setStyle("color",n)},A.prototype._setLineColor=function(e){var t=this,r=e.newVal,i=t.get(S),s=i.one(".barrelvalue"),o=r&&r!==""?n.sub(C,{color:r}):"";s.setStyle("textShadow",o)},A.prototype._setBackgroundColor=function(e){var t=this,n=e.newVal||"",r=t.get(S),i=r.one("."+x);i.setStyle("backgroundColor",n)}},"@VERSION@",{requires:["widget","node-base","node-style","gallerycss-itsa-base","gallerycss-itsa-dialog"],skinnable:!0});
