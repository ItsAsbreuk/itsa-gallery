YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n,r=e.Array,i="disabled",s="itsa-widget-parent",o="pure",u="button",a=o+"-"+u,f="date",l="time",c=f+l,h=a+"-"+c,p=a+"-"+i,d=a+"-primary",v="modelattribute",m="error",g="boolean",y="min",b="max",w="picker",E="click",S="itsa-icon",x=S+f,T=S+l,N=S+c,C=' data-formelement="true"',k='<span class="format',L="</span>",A="^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",O="[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*",M="^(http://)?"+O,_="^(https://)?"+O,D="^(https?://)?"+O,P="^(([-]?[1-9][0-9]*)|0)$",H="^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$",B='<label for="',j="</label>",F="text",I="password",q="email",R="url",U="radio",z="checkbox",W="hidden",X="textarea",V="div",$="label",J="span",K=o+"-"+U,Q=o+"-"+z,G="readonly",Y="checked",Z="required",et="name",tt="value",nt="placeholder",rt="pattern",it="data",st="class",ot="buttonText",ut="switch",at=ut+"ed",ft=ut+$,lt=ut+tt,ct=c+st,ht=$+it,pt=tt+at,dt=tt+"non"+at,vt="focusable",mt="{"+i+"}",gt="{"+G+"}",yt="{"+Y+"}",bt="{"+Z+"}",wt="{"+et+"}",Et="{"+tt+"}",St="{"+nt+"}",xt="{"+rt+"}",Tt="{"+it+"}",Nt="{"+st+"}",Ct="{"+W+"}",kt='id="{id}"',Lt='<label for="{id}"',At="{"+pt+"}",Ot="{"+dt+"}",Mt="{"+ht+"}",_t="{"+ct+"}",Dt="{"+ot+"}",Pt="{"+vt+"}",Ht="{"+y+"}",Bt="{"+b+"}",jt="type",Ft="submit",It="reset",qt="<input "+jt+'="',Rt="<"+u+" "+jt+'="',Ut=st+et,zt=$+"Class"+et,Wt=' data-labeldatetime="true"',Xt=it+"-"+c+"=",Vt="<"+J+" "+kt+">UNDEFINED ELEMENTTYPE</"+J+">",$t=qt+F+'" '+kt+wt+Et+St+mt+bt+gt+xt+Tt+Pt+Ct+Nt+" />",Jt=qt+I+'" '+kt+wt+Et+St+mt+bt+gt+xt+Tt+Pt+Ct+Nt+" />",Kt=qt+q+'" '+kt+wt+Et+St+mt+bt+gt+Tt+Pt+Ct+Nt+xt+" />",Qt=qt+R+'" '+kt+wt+Et+St+mt+bt+gt+Tt+Pt+Ct+Nt+xt+" />",Gt=qt+F+'" '+kt+wt+Ht+Bt+Et+St+mt+bt+gt+Tt+Pt+Ct+Nt+xt+" />",Yt=qt+U+'" '+kt+wt+Et+mt+yt+Tt+Pt+Ct+Nt+" />",Zt=qt+z+'" '+kt+wt+Et+mt+gt+yt+Tt+Pt+Ct+Nt+" />",en=qt+W+'" '+kt+wt+Et+" />",tn="<"+X+" "+kt+wt+St+mt+bt+gt+Tt+Pt+Ct+Nt+" />"+Et+"</"+X+">",nn=Ot+"<"+V+" "+kt+Tt+Pt+Nt+"></"+V+">"+At,rn=Rt+u+'" '+kt+wt+Et+Tt+Pt+Ct+Nt+">"+Dt+"</"+u+">",sn=Lt+bt+Wt+Nt+">"+Ot+Rt+u+'" '+kt+wt+Et+gt+" "+Xt+'"'+f+'"'+Tt+Pt+" "+st+'="'+_t+'"><i '+st+'="'+x+'"></i></'+u+">"+At+"</"+$+">",on=Lt+bt+Wt+Nt+">"+Ot+Rt+u+'" '+kt+wt+Et+gt+" "+Xt+'"'+l+'"'+Tt+Pt+" "+st+'="'+_t+'"><i '+st+'="'+T+'"></i></'+u+">"+At+"</"+$+">",un=Lt+bt+Wt+Nt+">"+Ot+Rt+u+'" '+kt+wt+Et+gt+" "+Xt+'"'+c+'"'+Tt+Pt+" "+st+'="'+_t+'"><i '+st+'="'+N+'"></i></'+u+">"+At+"</"+$+">",an=function(t,n,r,i,s){return i||(t==="date"?i="%x":t==="time"?i="%X":i="%x %X"),e.use("gallery-itsadatetimepicker"),k+"value formattime-"+n+'" data-for="'+s+'">'+e.Date.format(r,{format:i})+L},fn=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,ln=function(t,n){return t.replace?t.replace(fn,function(t,r){return e.Lang.isUndefined(n[r])?"":n[r]}):t};n=e.ITSAFormElement={},n.getElement=function(t,r,i){var s,o,u,a;i=i||e.guid(),r=r||{},o=typeof t=="function"&&t.NAME,typeof t=="string"&&(t=t.toLowerCase()),s={type:t,nodeid:i,config:r,name:r.name,html:n._renderedElement(o?t.NAME:t,r,i,o)};if(o){u=t;try{a=s.widget=new u(r.widgetconfig),t.NAME==="editorBase"?e.use("gallery-itsaeditorrenderpromise",function(){a.renderOnAvailable("#"+i)}):e.use("gallery-itsawidgetrenderpromise",function(){a.renderOnAvailable("#"+i)})}catch(f){e.fire(m,f)}}return s},n._renderedElement=function(t,n,r,o){var m=e.merge(n),w=typeof m[ft]===g?m[ft]:!1,E=typeof m[vt]===g?m[vt]:!0,S=n.tooltip,x=n.tooltipHeader,T=n.tooltipFooter,N=n.tooltipPlacement,O=n.nossl,V=n.onlyssl,J=n.digits,Y=n.length,ut=n[tt],at=n[v],mt=n[lt],gt=n[it],yt=C,bt,wt,Et,St,xt,Tt,Nt,Ct,kt,Lt,At;return gt&&(yt+=" "+gt),Y&&(yt+=' data-length="'+Y+'"'),at&&(yt+=" data-"+v+'="true"'),m[it]=yt,S&&(yt=' data-content="'+S+'"',x&&(yt+=' data-header="'+x+'"'),T&&(yt+=' data-footer="'+T+'"'),N&&(yt+=' data-placement="'+N+'"'),m[ht]=m[ht]||"",m[it]+=yt),o?(St=nn,m[it]+=' data-type="'+t+'"',m[st]=' class="'+(n[Ut]||"")+" "+s+'"',n[$]&&(m[ht]+=' data-widgetlabel="true"'),m[vt]=E?" "+vt+'="'+vt+'"':"",t==="slider"&&(m[mt?pt:dt]=k+"value formatslider-"+n.name+'" data-for="'+r+'">'+ut+L)):(Nt=typeof m[i]===g?m[i]:!1,Ct=typeof m[Z]===g?m[Z]:t===I,Lt=typeof m[G]===g?m[G]:!1,Tt=typeof n[W]===g?n[W]:!1,m[vt]=E?" "+vt+'="'+vt+'"':"",m[W]=Tt?" "+W+'="'+W+'"':"",m[i]=Nt?" "+i+'="'+i+'"':"",m[Z]=Ct?" "+Z+'="'+Z+'"':"",m[G]=Lt?" "+G+'="'+G+'"':"",n[nt]&&(m[nt]=" "+nt+'="'+m[nt]+'"'),n[rt]&&(m[rt]=" "+rt+'="'+m[rt]+'"'),n[et]&&(m[et]=" "+et+'="'+m[et]+'"'),t!==X&&ut&&(m[tt]=" "+tt+'="'+m[tt]+'"'),t===F?St=$t:t===I?St=Jt:t===q?(St=Kt,m[rt]=" "+rt+'="'+A+'"'):t===R?(St=Qt,typeof O===g&&O?m[rt]=" "+rt+'="'+M+'"':typeof V===g&&V?m[rt]=" "+rt+'="'+_+'"':m[rt]=" "+rt+'="'+D+'"'):t==="number"?(St=Gt,m[rt]=" "+rt+'="'+(typeof J===g&&J?H:P)+'"',n.min&&(m[y]=" min="+n.min+'"'),n.max&&(m[b]+=" max="+n.max+'"')):t===U?(xt=K,St=Yt):t===z?(xt=Q,St=Zt):t===W?St=en:t===X?St=tn:t===u||t===Ft||t===It?(delete m[$],St=rn,kt=!0,m[it]+=" data-"+u+jt+'="'+t+'"',Et=n.primary,wt=Nt,n[ot]||(m[ot]=ut||t),m[tt]||(m[tt]=" "+tt+'="'+m[ot]+'"')):t===f||t===l||t===c?(t===f?St=sn:t===l?St=on:t===c&&(St=un),ut&&(m[tt]=' value="'+ut.getTime()+'"'),m[it]+=" data-"+c+'picker="true"',m[ct]=a+" "+h+(Nt?" "+p:"")+(n.primary?" "+d:""),m[mt?pt:dt]=an(t,n.name||"",ut,m.format,r)):St=Vt,n.removepattern&&m[rt]&&(m[it]+=" data-"+rt+"="+m[rt].substr(9),delete m[rt]),(n[Ut]||kt)&&(m[st]=' class="'+(n[Ut]||"")+(kt?" "+a:"")+(wt?" "+p:"")+(Et?" "+d:"")+'"')),m[$]&&(xt?(m[$]='<span class="formatlabel">'+m[$]+L,bt=' class="'+xt+(n[zt]?" "+n[zt]:"")+'"',St=B+'{id}"'+Mt+bt+">"+(w?St+"{label}":"{label}"+St)+j):(bt=n[zt]?' class="'+n[zt]+'"':"",At=B+'{id}"'+Mt+bt+">{label}"+j,w?St+=At:St=At+St)),m.id=r,ln(St,m)},r.each([f,l,c],function(t){e.Event.define(t+w+E,{on:function(e,n,r){n._handle=e.on(E,function(e){var n=e.target;n.getAttribute(it+"-"+c)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()},delegate:function(e,n,r,i){n._delegatehandle=e.on(E,function(e){var n=e.target;i&&n.getAttribute(it+"-"+c)===
t&&r.fire(e)},i)},detachDelegate:function(e,t){t._delegatehandle.detach()}})}),r.each([Ft,It],function(t){e.Event.define(t+E,{on:function(e,n,r){n._handle=e.on(E,function(e){var n=e.target;n.getAttribute(it+"-"+u+jt)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()},delegate:function(e,n,r,i){n._delegatehandle=e.on(E,function(e){var n=e.target;i&&n.getAttribute(it+"-"+u+jt)===t&&r.fire(e)},i)},detachDelegate:function(e,t){t._delegatehandle.detach()}})})},"@VERSION@",{requires:["yui-base","datatype-date-format","event-synthetic"],skinnable:!0});
