YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n,r,i,s=e.Array,o=e.Lang,u=e.one("body"),a=a,f="disabled",l="widget",c="itsa-"+l+"-parent",h="pure",p="button",d=h+"-"+p,v=" itsa"+p+"-bordered",m="date",g="time",y=m+g,b=" "+d+"-"+y+" "+d+"-notext",w=d+"-"+f,E=d+"-primary",S="modelattribute",x="hideatstartup",T="itsa-invisible",N="renderpromise",C="gallery",k="-itsa",L="editor",A="error",O="boolean",M="picker",_="click",D="itsaicon-datetime-",P=D+m,H=D+g,B=D+y,j=' data-formelement="true"',F='<span class="format',I="</span>",q="^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",R="[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*",U="^(http://)?"+R,z="^(https://)?"+R,W="^(https?://)?"+R,X="^(([-]?[1-9][0-9]*)|0)$",V="^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$",$='<label for="',J="</label>",K="text",Q="password",G="email",Y="url",Z="radio",et="checkbox",tt="hidden",nt="textarea",rt="div",it="label",st="span",ot="plain",ut="initialfocus",at="fullselect",ft="number",lt=h+"-"+Z,ct=h+"-"+et,ht="readonly",pt="checked",dt="required",vt="name",mt="value",gt="placeholder",yt="pattern",bt="data",wt="class",Et="labelHTML",St="switch",xt=St+"ed",Tt=St+it,Nt=St+mt,Ct=it+bt,kt=mt+xt,Lt=mt+"non"+xt,At="focusable",Ot="spinbusy",Mt="{"+f+"}",_t="{"+ht+"}",Dt="{"+pt+"}",Pt="{"+dt+"}",Ht="{"+vt+"}",Bt="{"+mt+"}",jt="{"+gt+"}",Ft="{"+yt+"}",It="{"+bt+"}",qt="{"+wt+"}",Rt="{"+tt+"}",Ut='id="{id}"',zt="{"+kt+"}",Wt="{"+Lt+"}",Xt="{"+Ct+"}",Vt="{"+Et+"}",$t="{"+At+"}",Jt="type",Kt="submit",Qt="reset",Gt="<input "+Jt+'="',Yt="<"+p+" "+Jt+'="',Zt=wt+vt,en=it+"Class"+vt,tn="{"+Jt+"}",nn=' data-labeldatetime="true"',rn=bt+"-"+y+"=",sn=bt+"-"+p+Jt,on=bt+"-"+p+"sub"+Jt,un="<"+st+" "+Ut+">UNDEFINED ELEMENTTYPE</"+st+">",an="<"+st+" "+Ut+Ht+It+Rt+qt+">"+Bt+"</"+st+">",fn=Gt+K+'" '+Ut+Ht+Bt+jt+Mt+Pt+_t+Ft+It+$t+Rt+qt+" />",ln=Gt+Q+'" '+Ut+Ht+Bt+jt+Mt+Pt+_t+Ft+It+$t+Rt+qt+" />",cn=Gt+G+'" '+Ut+Ht+Bt+jt+Mt+Pt+_t+It+$t+Rt+qt+Ft+" />",hn=Gt+Y+'" '+Ut+Ht+Bt+jt+Mt+Pt+_t+It+$t+Rt+qt+Ft+" />",pn=Gt+K+'" '+Ut+Ht+Bt+jt+Mt+Pt+_t+It+$t+Rt+qt+Ft+" />",dn=Gt+Z+'" '+Ut+Ht+Bt+Mt+Dt+It+$t+Rt+qt+" />",vn=Gt+et+'" '+Ut+Ht+Bt+Mt+_t+Dt+It+$t+Rt+qt+" />",mn=Gt+tt+'" '+Ut+Ht+Bt+" />",gn="<"+nt+" "+Ut+Ht+jt+Mt+Pt+_t+It+$t+Rt+qt+">"+Bt+"</"+nt+">",yn=Wt+"<"+rt+" "+Ut+Ht+Rt+It+$t+qt+"></"+rt+">"+zt,bn=Yt+tn+'" '+Ut+Ht+Bt+It+$t+Rt+qt+">"+Vt+"</"+p+">",wn=Wt+Yt+p+'" '+Ut+Ht+Bt+Rt+Pt+nn+_t+" "+rn+'"'+m+'"'+It+$t+qt+"><i "+wt+'="'+P+'"></i></'+p+">"+zt,En=Wt+Yt+p+'" '+Ut+Ht+Bt+Rt+Pt+nn+_t+" "+rn+'"'+g+'"'+It+$t+qt+"><i "+wt+'="'+H+'"></i></'+p+">"+zt,Sn=Wt+Yt+p+'" '+Ut+Ht+Bt+Rt+Pt+nn+_t+" "+rn+'"'+y+'"'+It+$t+qt+"><i "+wt+'="'+B+'"></i></'+p+">"+zt,xn={widget:yn,plain:an,text:fn,password:ln,email:cn,url:hn,number:pn,radio:dn,checkbox:vn,hidden:mn,textarea:gn,button:bn,reset:bn,submit:bn,date:wn,time:En,datetime:Sn},Tn=function(t,n,r,i,s,o,u,a,f){var l=s?" "+s:"",c=a?" "+T:"",h=typeof n=="string"&&n.length>0?" formattime-"+n:"";return i||(t==="date"?i="%x":t==="time"?i="%X":i="%x %X"),e.use(C+k+"datetimepicker"),F+"value"+h+l+c+'" data-for="'+f+'"'+l+o+u+">"+e.Date.format(r,{format:i})+I},Nn={date:!0,time:!0,datetime:!0},Cn={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},kn={button:!0,submit:!0,reset:!0},Ln={radio:!0,checkbox:!0},An=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,On=function(t,n){return t.replace?t.replace(An,function(t,r){return e.Lang.isUndefined(n[r])?"":n[r]}):t};n=e.ITSAFormElement={},n.getElement=function(t,r,i){var s,o,u,a;i=i||e.guid(),r=r||{},o=typeof t=="function"&&t.NAME,typeof t=="string"&&(t=t.toLowerCase()),s={type:t,nodeid:i,config:r,name:r.name,html:n._renderedElement(o?t.NAME:t,r,i,o)};if(o){u=t;try{a=s.widget=new u(r.widgetconfig),t.NAME===L+"Base"?e.use(C+k+L+N,function(){a.renderOnAvailable("#"+i)}):e.use(C+k+l+N,function(){a.renderOnAvailable("#"+i)})}catch(f){e.fire(A,f)}}return s},n._renderedElement=function(t,n,r,i){var s=e.merge(n),u=typeof s[Tt]===O?s[Tt]:!1,a=typeof s[At]===O?s[At]:!0,h=typeof s[at]===O?s[at]:!1,m=typeof s[x]===O?s[x]:!1,g=n.tooltip,N=n.tooltipinvalid,L=n.nossl,A=n.onlyssl,M=n.digits,_=n[mt],D=n[S],P=n[Nt],H=n[bt],B=j,R=Nn[t],K,et,rt,st,St,xt,Mt,_t,Dt,Pt,Ht,Bt;return H&&(B+=" "+H),D&&(B+=" data-"+S+'="true"'),s[bt]=B,g&&(g=g.replace(/"/g,"''"),s[bt]+=' data-content="'+g+'" data-contentvalid="'+g+'"'),N&&typeof N=="string"&&N.length>0&&(s[bt]+=' data-contentinvalid="'+N.replace(/"/g,"''")+'"'),n[ut]&&(s[bt]+=" data-"+ut+'="true"'),n[vt]&&(s[vt]=" "+vt+'="'+s[vt]+'"'),xt=typeof n[tt]===O?n[tt]:!1,Mt=typeof s[f]===O?s[f]:!1,s[tt]=xt?" "+tt+'="'+tt+'"':"",s[f]=Mt?" "+f+'="'+f+'"':"",i?(s[bt]+=' data-type="'+t+'"',s[wt]=' class="'+(n[Zt]||"")+" "+c+(m?" "+T:"")+'"',n[it]&&(s[Ct]=s[Ct]||"",s[Ct]+=" data-"+l+it+'="true"'),s[At]=a?" data-"+At+'="true"':"",t==="slider"&&(s[P?kt:Lt]=F+"value formatslider-"+n.name+(n[Zt]?" "+n[Zt]:"")+'" data-for="'+r+'"'+s[tt]+s[f]+">"+_+I),t=l):(_t=!n["remove"+dt]&&(typeof s[dt]===O?s[dt]:t===Q),Ht=typeof s[ht]===O?s[ht]:!1,s[At]=a?" data-"+At+'="true"':"",s[dt]=_t?" "+dt+'="'+dt+'"':"",s[ht]=Ht?" "+ht+'="'+ht+'"':"",n[gt]&&(s[gt]=" "+gt+'="'+s[gt]+'"'),n[yt]&&(s[yt]=" "+yt+'="'+s[yt]+'"'),t!==nt&&t!==ot&&_&&(s[mt]=" "+mt+'="'+s[mt]+'"'),t===G?s[yt]=" "+yt+'="'+q+'"':t===Y?typeof L===O&&L?s[yt]=" "+yt+'="'+U+'"':typeof A===O&&A?s[yt]=" "+yt+'="'+z+'"':s[yt]=" "+yt+'="'+W+'"':t===ft?s[yt]=" "+yt+'="'+(typeof M===O&&M?V:X)+'"':Ln[t]?(St=t===Z?lt:ct,Dt=typeof s[pt]===O?s[pt]:!1,s[pt]=Dt?" "+pt+'="'+pt+'"':""):kn[t]?(delete s[it],Pt=!0,s[Jt]=t,s[bt]+=" data-"+p+Jt+'="'+(n[p+Jt]||t)+'"',rt=n.primary,et=Mt,n[Ot]&&(s[bt]+=" data-"+Ot+'="true"',e.use(C+"css"+k+"-animatespin")),n[Et]||(s[Et]=_||t),s[mt]=" "+mt+'="'+(n[mt]||e.Escape.html(s[Et]))+'"'):R&&(e.use(C+"css"+k+"-"+y),o.isDate(_)||(_=new Date),Pt=!0,et=Mt,s[mt]=' value="'+_.getTime()+'"',s[bt]+=" data-"+y+'picker="true"',s[P?kt:Lt]=Tn(t,n.name||"",_,s.format,n[Zt],s[tt],s[f],m,r)),n.removepattern&&s[yt]&&(s[bt]+=" data-"+yt+"="+s[yt].substr(9),delete s[yt]),h&&Cn[t]&&(s
[bt]+=" data-"+at+'="true"'),(n[Zt]||Pt||m||R)&&(s[wt]=' class="'+(R?"":n[Zt]||"")+(Pt?" "+d+v:"")+(R?b:"")+(et?" "+w:"")+(rt?" "+E:"")+(m?" "+T:"")+'"')),st=xn[t]||un,s[it]&&(St?(s[it]='<span class="formatlabel">'+s[it]+I,K=' class="'+St+(n[en]?" "+n[en]:"")+'"',st=$+'{id}"'+Rt+Xt+K+">"+(u?st+"{label}":"{label}"+st)+J):(K=n[en]?' class="'+n[en]+'"':"",Bt=(R?"<"+it:$+'{id}"')+Rt+Xt+K+">{label}"+J,u?st+=Bt:st=Bt+st)),s.id=r,On(st,s)},n.tooltipReadyPromise=function(){return n._tooltipreadypromise||(n._tooltipreadypromise=new e.Promise(function(t,n){e.use(C+"-tipsy",C+k+l+N,function(){r=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content]:not([data-valid="false"])',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),i=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content][data-valid="false"]',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),r.get("boundingBox").addClass("tipsy-formelement"),i.get("boundingBox").addClass("tipsy-formelement-invalid"),e.batch(r.renderPromise(),i.renderPromise()).then(t,n)})})),n._tooltipreadypromise},e.later(500,null,n.tooltipReadyPromise),u.delegate("focus",function(t){var n=t.target,r=n.getAttribute(bt+"-"+at)==="true",i;!r&&n.test("input")&&t.preventDefault(),i=n.getData(a),e.ITSAFormElement._activeNode=n,i?n.clearData(a):r?n.select():(n.set("selectionStart",n.get("value").length),n.set("scrollTop",999999))},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),u.delegate("mousedown",function(t){var n=t.target;e.ITSAFormElement._activeNode!==n&&n.setData(a,!0)},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),s.each([m,g,y],function(t){var n={on:function(e,n,r){n._handle=e.on(_,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(bt+"-"+y)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+M+_,n)}),s.each([Kt,Qt],function(t){var n={on:function(e,n,r){n._handle=e.on(_,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&(n.getAttribute(sn)===t||n.getAttribute(sn)===p&&n.getAttribute(on)===t)&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+_,n)})},"@VERSION@",{requires:["yui-base","node-core","node-event-delegate","datatype-date-format","event-base","event-synthetic","yui-later","promise","event-tap","event-custom","escape","gallerycss-itsa-base"],skinnable:!0});
