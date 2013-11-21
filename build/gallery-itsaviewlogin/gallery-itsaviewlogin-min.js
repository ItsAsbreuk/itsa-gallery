YUI.add("gallery-itsaviewlogin",function(e,t){"use strict";function Dt(){Dt.superclass.constructor.apply(this,arguments)}var n=e.Lang,r="icon",i="message",s="model",o="formconfig",u="validator",a="validationerror",f="mail",l="e"+f,c="address",h=l+c,p="button",d="primarybtnonenter",v="fullselect",m="required",g="logged",y=g+"in",b=g+"out",w="stay"+y,E="sername",S="assword",x="emember",T="u"+E,N="p"+S,C="r"+x,k="U"+E,L="P"+S,A="R"+x,O=T+"IsEmail",M="sync",_="itsa",D="ogin",P="get",H="messageLoggedin",B=P+"L"+D,j="l"+D,F="logout",I=P+j,q=_+"-"+j,R="label",U="placeholder",z="classname",W='<span class="itsa-messagewrapper">',X='<fieldset class="'+q+'">',V="</span>",$='<div class="pure-control-group">',J='<div class="pure-controls">',K='<div class="itsa-',Q="</fieldset>",G="</div>",Y="error",Z="_pub_"+y,et="Change",tt="object",nt="string",rt="boolean",it="function",st="create",ot="ccount",ut="img",at="submit",ft="btn_",lt=ft+at,ct=ut+ft,ht=st+"a"+ot,pt="btn_"+ht,dt=ut+pt,vt=st+"A"+ot,mt="regain",gt=T+"or"+N,yt="forgot",bt="dialog",wt="destroyed",Et="imageButtons",St='<i class="{icon}"></i>',xt="itsabutton-iconleft",Tt='<i class="itsaicon-'+bt,Nt="gallery",Ct=Nt+"css-itsa-",kt=Ct+bt,Lt=Ct+"form",At=Ct+"animatespin",Ot=Nt+"-itsa-i18n-login",Mt=Nt+"-itsa"+bt,_t=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(Y,{error:n,response:t,src:"parse"}),{}}return t||{}};Dt.NAME="itsaviewlogin",e.ITSAViewLogin=e.extend(Dt,e.ITSAViewModel,{},{ATTRS:{createAccount:{value:null,validator:function(t){return t instanceof e.LazyPromise}},editable:{value:!0,readOnly:!0},formconfigPassword:{value:{},validator:function(e){return typeof e===tt},initOnly:!0},formconfigRemember:{value:{},validator:function(e){return typeof e===tt},initOnly:!0},formconfigUsername:{value:{},validator:function(e){return typeof e===tt},initOnly:!0},icon:{value:null,validator:function(e){return typeof e===nt}},imageButtons:{value:!1,validator:function(e){return typeof e===rt},initOnly:!0},message:{value:null,validator:function(e){return typeof e===nt}},messageLoggedin:{value:null,validator:function(e){return typeof e===nt}},model:{readOnly:!0},partOfMultiView:{value:!1,readOnly:!0},password:{value:""},regain:{value:null,validator:function(e){return e===null||e===gt||e===T||e===N},initOnly:!0},remember:{value:!1},showStayLoggedin:{value:!1,initOnly:!0},sync:{value:null,validator:function(e){return typeof e===it}},template:{readOnly:!0,getter:"_getterTemplate"},username:{value:""},usernameIsEmail:{value:!1,initOnly:!0},validationerrorPassword:{value:null,validator:function(e){return e===null||typeof e===nt},initOnly:!0},validationerrorUsername:{value:null,validator:function(e){return e===null||typeof e===nt},initOnly:!0},validatorPassword:{value:null,validator:function(e){return e===null||typeof e===it},initOnly:!0},validatorUsername:{value:null,validator:function(e){return e===null||typeof e===it},initOnly:!0}}}),Dt.prototype.setSubmitButtons=function(e){var t=this,n=e?j:F,r=t._loginintl;t.get(Et)?t.setButtonLabel(ct+at,Tt+"-"+n+'"></i>'+r[n]):t.setButtonLabel(lt,r[n])},Dt.prototype.initializer=function(){var t=this,n=t._eventhandlers,r;r=t._loginintl,t.setSubmitButtons(!0),t.get(Et)?(t.setPrimaryButton(ct+at),e.usePromise("gallerycss-itsa-dialog","gallerycss-itsa-form","gallerycss-itsa-animatespin")):t.setPrimaryButton(lt),t._defineModel(),n.push(t.after(T+et,function(e){t.get(s).set(T,e.newVal)})),n.push(t.after(N+et,function(e){t.get(s).set(N,e.newVal)})),n.push(t.after(C+et,function(e){t.get(s).set(C,e.newVal)})),n.push(t.after(M+et,function(e){t.get(s)[M+"Promise"]=e.newVal})),n.push(e.after(y,function(e){var n=e.messageLoggedin,i=t.get(s);t._loggedin=!0,t._user=e.user,t.get(wt)||(n&&t.set(H,n),t.setSubmitButtons(!1),i._set(p,F),i.setSyncMessage(at,r.loggingout),t._setTemplateRenderer(!1),t.render())})),n.push(e.on(b,function(e){console.log("event logout occured");var n=t.get(s);t._loggedin=!1,t._user=null,t.get(wt)||(t.setSubmitButtons(!0),n._set(p,I),n.setSyncMessage(at,r.attemptlogin),t._setTemplateRenderer(!0),t.render())})),n.push(t.on("*:submit",function(t){var n=t.target,r=n.get("button")===F;t.promise._logout=r,r&&e.fire(b)})),n.push(t.after("*:submit",function(n){var r=n.target,i=n.promise;n.currentTarget===t&&i.then(function(n){var s=_t(n),o=t._loginintl,u=r.messageType,a,f;s&&s.status&&!i._logout?(s.status==="ERROR"&&(a=s.message||o.unspecifiederror,e.showError(s.title||o[Y],a)),s.status==="OK"?(f=e.merge(s,r.toJSON()),e.fire(y,f),(a=s.message)&&e.showMessage(s.title,a)):u===B&&s.status==="NOACCESS"?(a=s.message||o.loginblocked,e.usePromise(Mt).then(function(){e.showError(s.title||o[Y],a)})):s.status==="RETRY"?(a=s.message||o.unknownlogin,e.usePromise(Mt).then(function(){e.showWarning(s.title||o[Y],a)})):s.status!=="CHANGEPASSWORD"&&(a="Wrong response.status found: "+s.status,f={src:"Y.ITSALogin.submit()",msg:a},t.fire("warn",f))):(a="Response returned without response.status",f={src:"Y.ITSALogin.submit()",msg:a},t.fire("warn",f))}).then(null,function(t){var n=t&&(t.message||t)||"Undefined error during submission";e.usePromise(Mt).then(function(){e.showWarning(n)})})}))},Dt.prototype.getLogin=function(){},Dt.prototype.renderOnReady=function(){var t=this;return e.usePromise(kt,Lt,At).then(function(){t.render()})},Dt.prototype._defineModel=function(){var t=this,n=t._loginintl,r=t.get(O),i=t.get(Et),f=[],l,c,p,g,y;c=t.get(o+k),c[R]||c[U]||(c[R]=n[r?h:T]),c.initialfocus=!0,c[v]=!0,c[d]=!1,c[z]=q+(c[z]?" "+c[z]:""),c[m]=!0,p=t.get(o+L),p[R]||p[U]||(p[R]=n[N]),p[v]=!0,p[d]=!0,p[z]=q+(p[z]?" "+p[z]:""),p[m]=!0,g=t.get(o+A),g.widgetconfig={primarybtnonenter:!0},c[R]&&!p[R]&&(p[R]=" "),p[R]&&!c[R]&&(c[R]=" "),g[R]||(g[R]=n[w]),g.switchlabel=!0,t.get(mt)&&f.push(i?{buttonId:ct+yt,labelHTML:Tt+'-question"></i>'+n[yt],config:{value:yt,classname:xt}}:{buttonId:ft+yt,labelHTML:n[yt],config:{value:yt}}),t.get(vt)&&f.push(i?{buttonId:ct+ht,labelHTML:Tt+'-user"></i>'+n[ht],config:{value:ht,classname:xt}}:{
buttonId:pt,labelHTML:n[ht],config:{value:ht}}),f.length>0&&t.addCustomBtns(f),l=e.Base.create("itsaviewloginmodel",e.ITSAFormModel,[],null,{ATTRS:{username:{value:t.get(T),formtype:r?"email":"text",formconfig:c,validator:t.get(u+k),validationerror:t.get(a+k)},password:{value:t.get(N),formtype:N,formconfig:p,validator:t.get(u+L),validationerror:t.get(a+L)},remember:{value:t.get(C),formtype:e.ITSACheckbox,formconfig:g},button:{value:I,writeOnce:"initOnly"}}}),y=new l,y.setSyncMessage(at,n.attemptlogin),t._set(s,y),y.addTarget(t),y.syncPromise=t.get(M),t._setTemplateRenderer(!0)},Dt.prototype._getterTemplate=function(){var e=this;return e._loggedin?e._loggedoutTemplate():e._loggedinTemplate()},Dt.prototype._loggedinTemplate=function(){var e=this,t=e.get(r),s=e.get(Et),o;return s?(o=e.get(mt)?"{"+ct+yt+"}":"",e.get(vt)&&(o+="{"+dt+"}"),o+="{"+ct+at+"}"):(o=e.get(mt)?"{"+ft+yt+"}":"",e.get(vt)&&(o+="{"+pt+"}"),o+="{"+lt+"}"),(t?n.sub(St,{icon:t}):"")+W+(e.get(i)||"")+V+X+$+"{"+T+"}"+G+$+"{"+N+"}"+G+(e.get("showStayLoggedin")?K+'login-checkbox pure-controls">'+"{remember}"+G:"")+J+o+G+Q},Dt.prototype._loggedoutTemplate=function(){var e=this,t=e.get(r),i=e.get(Et),s=e._user,o=e.get(H)||(s?e._loginintl.youareloggedinas:e._loginintl.youareloggedin),u=s||"",a;return i?a="{"+ct+at+"}":a="{"+lt+"}",(t?n.sub(St,{icon:t}):"")+W+n.sub(o,{user:u})+V+X+J+a+G+Q},Dt.prototype._loginintl=e.Intl.get(Ot)},"@VERSION@",{requires:["yui-base","intl","base-build","gallery-itsaformmodel","gallery-itsaviewmodel","gallery-itsacheckbox","gallery-itsa-i18n-login","gallery-itsamodelsyncpromise","gallery-itsamodulesloadedpromise","gallery-lazy-promise"],skinnable:!0});
