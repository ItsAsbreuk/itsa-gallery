YUI.add("gallery-itsapanel",function(e,t){"use strict";var n,r=e.Array,i=e.Lang,s="gallerycss-itsa-",o="destroyed",u="string",a="boolean",f="visible",l="boundingBox",c="contentBox",h="paddingTop",p="paddingBottom",d="itsa-",v="hidden",m="View",g="panel",y="Change",b="floated",w="header"+m,E="body"+m,S="footer"+m,x="rendered",T="number",N="offsetHeight",C="offsetWidth",k="borderTopWidth",L="borderBottomWidth",A="borderLeftWidth",O="borderRightWidth",M="modal",_="px",D="centered",P="dragable",H="resize",B="resizable",j="dd",F="-plugin",I="styled",q=d+g,R=d+I+g,U=d+v+g,z=d+v+"section",W=d+"inline"+g,X=d+"panelheader",V=d+"panelbody",$=d+"panelfooter",J=d+"panelinnerheader",K=d+"panelinnerbody",Q=d+"panelinnerfooter",G=d+g+"closebtn",Y='<div class="'+X+'"><div class="'+J+'"></div></div>',Z='<div class="'+V+'"><div class="'+K+'"></div></div>',et='<div class="'+$+'"><div class="'+Q+'"></div></div>',tt='{panel_title}<button class="pure-button itsabutton-onlyicon '+G+'" data-focusable="true"><i class="itsaicon-form-abort"></i></button>',nt="",rt="{panel_footer}",it=function(e,t){return parseInt(e.getStyle(t),10)},st="button",ot="click",ut="value",at=st+ot;n=e.ITSAPanel=e.Base.create("itsapanel",e.Widget,[e.WidgetPosition,e.WidgetAutohide,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],null,{ATTRS:{bodyView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View},setter:"_setBodyView"},dragable:{value:!1,validator:function(e){return typeof e===a}},footer:{value:null,validator:function(e){return e===null||typeof e===u}},footerView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View},setter:"_setFooterView"},floated:{value:!0,validator:function(e){return typeof e===a}},headerView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View},setter:"_setHeaderView"},height:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},getter:"_getHeight",setter:"_setHeight"},maxHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},setter:"_setMaxHeight"},maxWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},setter:"_setMaxWidth"},minHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},setter:"_setMinHeight"},minWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},setter:"_setMinWidth"},resizable:{value:!1,validator:function(e){return typeof e===a}},styled:{value:!0,validator:function(e){return typeof e===a}},visible:{value:!1,validator:function(e){return typeof e===a}},width:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===T},getter:"_getWidth",setter:"_setWidth"},title:{value:null,validator:function(e){return e===null||typeof e===u}}}}),n.prototype.initializer=function(){var t=this,n=t.get(l);e.use(s+"base",s+"form"),t._eventhandlers=[],n.addClass(q),n.toggleClass(W,!t.get(b)),n.toggleClass(R,t.get(I)),n.addClass(U),t.renderPromise().then(function(){t._setDimensions(),t.get(f)&&n.removeClass(U)})},n.prototype._setDimensions=function(){var e=this,t=e.get(c);e._widthSet||t.setStyle("width",""),e._heightSet||t.setStyle("height",""),e._widthSet||t.setStyle("width",t.get(C)+_),e._heightSet||t.setStyle("height",t.get(N)+_)},n.prototype.bindUI=function(){var t=this,n=t.get(l),r=t.get(c),i=t._eventhandlers,s=t.get(w),u=t.get(E),a=t.get(S);s instanceof e.View&&s.addTarget(t),u instanceof e.View&&u.addTarget(t),a instanceof e.View&&a.addTarget(t),t.get(P)&&t.get(b)&&e.use(j+F,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+X)}),t.get(B)&&e.use(H+F,function(){t.get(o)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),i.push(t.after(b+y,function(r){n.toggleClass(W,!r.newVal),t.get(P)&&(r.newVal&&!n.dd&&e.use(j+F,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+X)}),!r.newVal&&n.dd&&n.unplug(j))})),i.push(t.after(P+y,function(r){r.newVal&&t.get(b)&&!n.dd&&e.use(j+F,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+X)}),!r.newVal&&n.dd&&n.unplug(j)})),i.push(t.after(B+y,function(n){n.newVal&&!r[H]&&e.use(H+F,function(){t.get(o)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),!n.newVal&&r[H]&&r[H].removeTarget(t)&&r[H].unplug(H)})),i.push(t.after([H+":end","height"+y,"width"+y,"minHeight"+y,"minWidth"+y],function(){t.get(D)&&t.centered()})),i.push(t.after(f+y,function(e){n.toggleClass(U,!e.newVal)})),i.push(t.after([w+y,E+y,S+y],function(n){n.prevVal instanceof e.View&&n.prevVal.removeTarget(t),n.newVal instanceof e.View&&n.newVal.addTarget(t)})),i.push(t.after(I+y,function(e){n.toggleClass(R,e.newVal)})),i.push(t.on(M+y,function(e){!t.get(b)&&e.preventDefault()})),i.push(t._header.delegate(ot,e.bind(t.hide,t),"."+G)),i.push(r.on(ot,function(e){var n=e.target,r={type:at,target:t,value:n.get(ut),buttonNode:n};t.fire(at,r)})),i.push(t.after("*:viewrendered",function(){t._adjustPaddingTop(),t._adjustPaddingBottom()}))},n.prototype.renderUI=function(){var e=this,t=e.get(c);t.setHTML(Y+Z+et),e._header=t.one("."+J),e._body=t.one("."+K),e._footer=t.one("."+Q),e._renderHeader(),e._renderBody(),e._renderFooter()},n.prototype.destructor=function(){var t=this,n=t.get(l),r=t.get(c),i=t.get(w),s=t.get(E),o=t.get(S);i instanceof e.View&&i.removeTarget(t),s instanceof e.View&&s.removeTarget(t),o instanceof e.View&&o.removeTarget(t),n.hasPlugin(j)&&n.unplug(j),r.hasPlugin[H]&&r[H].removeTarget(t)&&r.unplug(H),t._clearEventhandlers()},n.prototype._adjustPaddingBottom=function(){var e=this;e.get(c).setStyle(p,e._footer.get(N)+_)},n.prototype._adjustPaddingTop=function(){var e=this;e.get(c).setStyle(h,e._header.get(N)+_)},n.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},n.prototype._getHeight=function(){this.get(l).get(N)},n.prototype._getWidth=function(){this.get(l).get(C)},n.prototype._renderHeader=function(){var t=this,n=t.get("title"),r=
t.get(w);!r||typeof r===u?t._header.setHTML(i.sub(r||tt,{panel_title:n||""})):r instanceof e.View&&(r._set("container",t._header),r.render&&r.render()),t._adjustPaddingTop()},n.prototype._renderBody=function(){var t=this,n=t.get(E);!n||typeof n===u?t._body.setHTML(n||nt):n instanceof e.View&&(n._set("container",t._body),n.render&&n.render())},n.prototype._renderFooter=function(){var t=this,n=t.get("footer"),r=t.get(S),s=t._footer,o=!r&&!n;o?s.addClass(z):(!r||typeof headerView===u?s.setHTML(i.sub(r||rt,{panel_footer:n||""})):r instanceof e.View&&(r._set("container",t._footer),r.render&&r.render()),s.removeClass(z)),t._adjustPaddingBottom()},n.prototype._setBodyView=function(){var e=this;e.get(x)&&e._renderBody()},n.prototype._setFooterView=function(){var e=this;e.get(x)&&e._renderFooter()},n.prototype._setHeaderView=function(){var e=this;e.get(x)&&e._renderHeader()},n.prototype._setHeight=function(e){var t=this,n=t.get(l);e&&(e-=it(n,k)+it(n,L)),t.get(c).setStyle("height",e?e+_:""),t._heightSet=typeof e===T},n.prototype._setMaxHeight=function(e){this.get(c).setStyle("maxHeight",e?e+_:"")},n.prototype._setMaxWidth=function(e){this.get(c).setStyle("maxWidth",e?e+_:"")},n.prototype._setMinHeight=function(e){this.get(c).setStyle("minHeight",e?e+_:"")},n.prototype._setMinWidth=function(e){this.get(c).setStyle("minWidth",e?e+_:"")},n.prototype._setWidth=function(e){var t=this,n=t.get(l);e&&(e-=it(n,A)+it(n,O)),t.get(c).setStyle("width",e?e+_:""),t._widthSet=typeof e===T}},"@VERSION@",{requires:["node-pluginhost","dd-ddm","base-build","widget-autohide","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","view","widget","gallery-itsawidgetrenderpromise"],skinnable:!0});
