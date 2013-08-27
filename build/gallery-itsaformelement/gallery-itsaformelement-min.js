YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n,r,i,s=e.Array,o=e.Lang,u=200,a=e.one("body"),f=f,l="disabled",c="itsa-widget-parent",h="pure",p="button",d=h+"-"+p,v="date",m="time",g=v+m,y=d+"-"+g,b=d+"-"+l,w=d+"-primary",E="modelattribute",S="error",x="boolean",T="picker",N="click",C="itsa-icon",k=C+v,L=C+m,A=C+g,O=' data-formelement="true"',M='<span class="format',_="</span>",D="^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",P="[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*",H="^(http://)?"+P,B="^(https://)?"+P,j="^(https?://)?"+P,F="^(([-]?[1-9][0-9]*)|0)$",I="^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$",q='<label for="',R="</label>",U="text",z="password",W="email",X="url",V="radio",$="checkbox",J="hidden",K="textarea",Q="div",G="label",Y="span",Z="plain",et="initialfocus",tt="fullselect",nt="number",rt=h+"-"+V,it=h+"-"+$,st="readonly",ot="checked",ut="required",at="name",ft="value",lt="placeholder",ct="pattern",ht="data",pt="class",dt="buttonText",vt="switch",mt=vt+"ed",gt=vt+G,yt=vt+ft,bt=g+pt,wt=G+ht,Et=ft+mt,St=ft+"non"+mt,xt="focusable",Tt="{"+l+"}",Nt="{"+st+"}",Ct="{"+ot+"}",kt="{"+ut+"}",Lt="{"+at+"}",At="{"+ft+"}",Ot="{"+lt+"}",Mt="{"+ct+"}",_t="{"+ht+"}",Dt="{"+pt+"}",Pt="{"+J+"}",Ht='id="{id}"',Bt='<label for="{id}"',jt="{"+Et+"}",Ft="{"+St+"}",It="{"+wt+"}",qt="{"+bt+"}",Rt="{"+dt+"}",Ut="{"+xt+"}",zt="type",Wt="submit",Xt="reset",Vt="<input "+zt+'="',$t="<"+p+" "+zt+'="',Jt=pt+at,Kt=G+"Class"+at,Qt="widget",Gt=' data-labeldatetime="true"',Yt=ht+"-"+g+"=",Zt="<"+Y+" "+Ht+">UNDEFINED ELEMENTTYPE</"+Y+">",en="<"+Y+" "+Ht+Lt+_t+Pt+Dt+">"+At+"</"+Y+">",tn=Vt+U+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+Mt+_t+Ut+Pt+Dt+" />",nn=Vt+z+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+Mt+_t+Ut+Pt+Dt+" />",rn=Vt+W+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+Ut+Pt+Dt+Mt+" />",sn=Vt+X+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+Ut+Pt+Dt+Mt+" />",on=Vt+U+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+Ut+Pt+Dt+Mt+" />",un=Vt+V+'" '+Ht+Lt+At+Tt+Ct+_t+Ut+Pt+Dt+" />",an=Vt+$+'" '+Ht+Lt+At+Tt+Nt+Ct+_t+Ut+Pt+Dt+" />",fn=Vt+J+'" '+Ht+Lt+At+" />",ln="<"+K+" "+Ht+Lt+Ot+Tt+kt+Nt+_t+Ut+Pt+Dt+">"+At+"</"+K+">",cn=Ft+"<"+Q+" "+Ht+Lt+_t+Ut+Dt+"></"+Q+">"+jt,hn=$t+p+'" '+Ht+Lt+At+_t+Ut+Pt+Dt+">"+Rt+"</"+p+">",pn=Bt+Pt+kt+Gt+Dt+">"+Ft+$t+p+'" '+Ht+Lt+At+Nt+" "+Yt+'"'+v+'"'+_t+Ut+" "+pt+'="'+qt+'"><i '+pt+'="'+k+'"></i></'+p+">"+jt+"</"+G+">",dn=Bt+Pt+kt+Gt+Dt+">"+Ft+$t+p+'" '+Ht+Lt+At+Nt+" "+Yt+'"'+m+'"'+_t+Ut+" "+pt+'="'+qt+'"><i '+pt+'="'+L+'"></i></'+p+">"+jt+"</"+G+">",vn=Bt+Pt+kt+Gt+Dt+">"+Ft+$t+p+'" '+Ht+Lt+At+Nt+" "+Yt+'"'+g+'"'+_t+Ut+" "+pt+'="'+qt+'"><i '+pt+'="'+A+'"></i></'+p+">"+jt+"</"+G+">",mn={widget:cn,plain:en,text:tn,password:nn,email:rn,url:sn,number:on,radio:un,checkbox:an,hidden:fn,textarea:ln,button:hn,reset:hn,submit:hn,date:pn,time:dn,datetime:vn},gn=function(t,n,r,i,s){return i||(t==="date"?i="%x":t==="time"?i="%X":i="%x %X"),e.use("gallery-itsadatetimepicker"),M+"value formattime-"+n+'" data-for="'+s+'">'+e.Date.format(r,{format:i})+_},yn=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,bn=function(t,n){return t.replace?t.replace(yn,function(t,r){return e.Lang.isUndefined(n[r])?"":n[r]}):t};n=e.ITSAFormElement={},n.getElement=function(t,r,i){var s,o,u,a;i=i||e.guid(),r=r||{},o=typeof t=="function"&&t.NAME,typeof t=="string"&&(t=t.toLowerCase()),s={type:t,nodeid:i,config:r,name:r.name,html:n._renderedElement(o?t.NAME:t,r,i,o)};if(o){u=t;try{a=s.widget=new u(r.widgetconfig),t.NAME==="editorBase"?e.use("gallery-itsaeditorrenderpromise",function(){a.renderOnAvailable("#"+i)}):e.use("gallery-itsawidgetrenderpromise",function(){a.renderOnAvailable("#"+i)})}catch(f){e.fire(S,f)}}return s},n._renderedElement=function(t,n,r,i){var s=e.merge(n),u=typeof s[gt]===x?s[gt]:!1,a=typeof s[xt]===x?s[xt]:!0,f=typeof s[tt]===x?s[tt]:!1,h=n.tooltip,S=n.tooltipinvalid,T=n.nossl,N=n.onlyssl,C=n.digits,k=n[ft],L=n[E],A=n[yt],P=n[ht],Q=O,Y,vt,mt,Tt,Nt,Ct,kt,Lt,At,Ot,Mt,_t;P&&(Q+=" "+P),L&&(Q+=" data-"+E+'="true"'),s[ht]=Q,h&&(h=h.replace(/"/g,"''"),s[ht]+=' data-content="'+h+'" data-contentvalid="'+h+'"'),S&&typeof S=="string"&&S.length>0&&(s[ht]+=' data-contentinvalid="'+S.replace(/"/g,"''")+'"'),n[et]&&(s[ht]+=" data-"+et+'="true"'),n[at]&&(s[at]=" "+at+'="'+s[at]+'"');if(i)s[ht]+=' data-type="'+t+'"',s[pt]=' class="'+(n[Jt]||"")+" "+c+'"',n[G]&&(s[wt]=s[wt]||"",s[wt]+=' data-widgetlabel="true"'),s[xt]=a?" data-"+xt+'="true"':"",t==="slider"&&(s[A?Et:St]=M+"value formatslider-"+n.name+'" data-for="'+r+'">'+k+_),t=Qt;else{kt=typeof s[l]===x?s[l]:!1,Lt=typeof s[ut]===x?s[ut]:t===z,Mt=typeof s[st]===x?s[st]:!1,Ct=typeof n[J]===x?n[J]:!1,s[xt]=a?" data-"+xt+'="true"':"",s[J]=Ct?" "+J+'="'+J+'"':"",s[l]=kt?" "+l+'="'+l+'"':"",s[ut]=Lt?" "+ut+'="'+ut+'"':"",s[st]=Mt?" "+st+'="'+st+'"':"",n[lt]&&(s[lt]=" "+lt+'="'+s[lt]+'"'),n[ct]&&(s[ct]=" "+ct+'="'+s[ct]+'"'),t!==K&&t!==Z&&k&&(s[ft]=" "+ft+'="'+s[ft]+'"');if(t===W)s[ct]=" "+ct+'="'+D+'"';else if(t===X)typeof T===x&&T?s[ct]=" "+ct+'="'+H+'"':typeof N===x&&N?s[ct]=" "+ct+'="'+B+'"':s[ct]=" "+ct+'="'+j+'"';else if(t===nt)s[ct]=" "+ct+'="'+(typeof C===x&&C?I:F)+'"';else if(t===V||t===$)Nt=t===V?rt:it,At=typeof s[ot]===x?s[ot]:!1,s[ot]=At?" "+ot+'="'+ot+'"':"",s[l]=kt?" "+l+'="'+l+'"':"";else if(t===p||t===Wt||t===Xt)delete s[G],Ot=!0,s[ht]+=" data-"+p+zt+'="'+t+'"',mt=n.primary,vt=kt,n[dt]||(s[dt]=k||t),s[ft]||(s[ft]=" "+ft+'="'+s[dt]+'"');else if(t===v||t===m||t===g)o.isDate(k)||(k=new Date),s[ft]=' value="'+k.getTime()+'"',s[ht]+=" data-"+g+'picker="true"',s[bt]=d+" "+y+(kt?" "+b:"")+(n.primary?" "+w:""),s[A?Et:St]=gn(t,n.name||"",k,s.format,r);n.removepattern&&s[ct]&&(s[ht]+=" data-"+ct+"="+s[ct].substr(9),delete s[ct]),f&&(t===U||t===nt||t===z||t===K||t===W||t===X)&&(s[ht]+=" data-"+tt+'="true"'),(n[Jt]||Ot)&&(s[pt]=' class="'+(n[Jt]||"")+(Ot?" "+d:"")+(vt?" "+b:"")+(mt?" "+w:"")+'"')}return Tt=mn[t]||Zt,s[G]&&(Nt?(s[G]='<span class="formatlabel">'+s[G]+_,Y=' class="'+Nt+(n[Kt]?" "+n[Kt]:"")+'"',Tt=q+'{id}"'+Pt+It+Y+">"+(u?Tt+"{label}":"{label}"+Tt)+R):(Y=n[Kt]?' class="'+n[Kt]+'"':"",_t=q+'{id}"'+
Pt+It+Y+">{label}"+R,u?Tt+=_t:Tt=_t+Tt)),s.id=r,bn(Tt,s)},n.tooltipReadyPromise=function(){return n._tooltipreadypromise||(n._tooltipreadypromise=new e.Promise(function(t,n){r=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content]:not([data-valid="false"])',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),i=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content][data-valid="false"]',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),r.get("boundingBox").addClass("tipsy-formelement"),i.get("boundingBox").addClass("tipsy-formelement-invalid"),e.batch(r.renderPromise(),i.renderPromise()).then(t,n)})),n._tooltipreadypromise},e.later(500,null,n.tooltipReadyPromise),a.delegate("focus",function(t){var n=t.target,r=n.getAttribute(ht+"-"+tt)==="true";!r&&n.test("input")&&t.preventDefault(),e.ITSAFormElement._focustimer&&e.ITSAFormElement._focustimer.cancel(),e.ITSAFormElement._focustimer=e.later(u,null,function(){var t=n.getData(f);e.ITSAFormElement._activeNode=n,t?n.clearData(f):r?n.select():(n.set("selectionStart",n.get("value").length),n.set("scrollTop",999999))})},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),a.delegate("tap",function(t){var n=t.target;e.ITSAFormElement._activeNode!==n&&n.setData(f,!0)},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),a.delegate("blur",function(){e.ITSAFormElement._focustimer&&e.ITSAFormElement._focustimer.cancel()}),s.each([v,m,g],function(t){e.Event.define(t+T+N,{on:function(e,n,r){n._handle=e.on(N,function(e){var n=e.target;n.getAttribute(ht+"-"+g)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()},delegate:function(e,n,r,i){n._delegatehandle=e.on(N,function(e){var n=e.target;i&&n.getAttribute(ht+"-"+g)===t&&r.fire(e)},i)},detachDelegate:function(e,t){t._delegatehandle.detach()}})}),s.each([Wt,Xt],function(t){e.Event.define(t+N,{on:function(e,n,r){n._handle=e.on(N,function(e){var n=e.target;n.getAttribute(ht+"-"+p+zt)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()},delegate:function(e,n,r,i){n._delegatehandle=e.on(N,function(e){var n=e.target;i&&n.getAttribute(ht+"-"+p+zt)===t&&r.fire(e)},i)},detachDelegate:function(e,t){t._delegatehandle.detach()}})})},"@VERSION@",{requires:["yui-base","datatype-date-format","event-synthetic","yui-later","promise","event-tap","gallery-tipsy","gallery-itsawidgetrenderpromise"],skinnable:!0});
