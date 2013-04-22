YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n=e.Lang,r=e.Date.format,i="focusable",s="itsaformelement",o=e.ClassNameManager.getClassName,u=o(s),a=o(s,"validation"),f=o(s,"hidden"),l=o(s,"firstfocus"),c=o(s,"selectall"),h=o(s,"keyvalidation"),p=o(s,"enternextfield"),d=o(s,"validationmessage"),v=o(s,"autocorrect"),m=o(s,"lifechange"),g=o(s,"inputbutton"),y=o(s,"inlinebutton"),b="yui3-button",w="itsa-button-datetime",E="itsa-datetimepicker-icondate",S="itsa-datetimepicker-icontime",x="itsa-datetimepicker-icondatetime",T='<span id="{id}">UNDEFINED ELEMENTTYPE</span>',N='<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',C='<textarea id="{id}" name="{name}"{classname} />{value}</textarea>',k='<input id="{id}" type="password" name="{name}" value="{value}"{classname} />',L='<input id="{id}" type="hidden" name="{name}" value="{value}"{classname} />',A='<input id="{id}" type="{type}" name="{name}" value="{value}"{classname} />',O='<div class="'+d+" "+f+'">{validation}</div>',M='<div id="{id}"{classname} /><input id="{id}_checkbox" type="checkbox" name="{name}" {checked}class="'+u+" "+f+'" /></div>',_='<div id="{id}"{classname} /><select id="{id}_selectlist" name="{name}" class="'+f+" "+u+'" /><option value="" selected="selected"></option></select></div>',D='<div id="{id}"{classname} /><select id="{id}_combo" name="{name}" class="'+f+" "+u+'" /><option value="" selected="selected"></option></select></div>',P='<div id="{id}"{classname} /><input id="{id}_radiogroup" type="radio" name="{name}" value="" checked="checked" class="'+u+" "+f+'" /></div>',H='<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+b+" "+w+" "+y+'{classlevel2}""><span class="'+E+'"></span></button>',B='<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+b+" "+w+" "+y+'{classlevel2}"><span class="'+S+'"></span></button>',j='<span id="{id}"{classname} />{value}</span><button id="{id}_datetime" class="'+b+" "+w+" "+y+'{classlevel2}"><span class="'+x+'"></span></button>',F='<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',I='<input id="{id}" type="text" name="{name}" value="{value}"{classname} />',q='<input id="{id}" type="text" name="{name}" value="{value}"{classname} />';e.ITSAFormElement=e.Base.create("itsaformelement",e.Base,[],{initializer:function(){},render:function(t,f){var d=this,y,w,E,S,x,R,U,z,W,X,V,$,J,K,Q,G,Z;return typeof t=="object"&&d.setAttrs(t),w=d.get("name"),E=d.get("type"),S=d.get("value"),x=d.get("dateFormat"),R=d.get("autoCorrection"),U=!R&&d.get("validation"),Z=E==="input"||E==="password",X=E==="date"||E==="time"||E==="datetime",$=E==="button"||E==="submit"||E==="reset"||E==="save"||E==="destroy",V=d.get("focusable"),Q=E==="input"||E==="textarea"||E==="password"||$,G=V?i+(d.get("initialFocus")?" "+l:"")+(d.get("selectOnFocus")?" "+c:""):"",J=E==="input"||E==="textarea"||E==="password",z=d.get("className"),W=' class="'+u+" "+o(s,"property",w)+" "+o(s,E)+(z?" "+z:"")+(Z?" "+p:"")+($?" "+b+" "+g:"")+(J?" "+m:"")+(d.get("keyValidation")?" "+h:"")+(U?" "+a:"")+(R?" "+v:"")+(Q?" "+G:"")+'"',K=Q?"":" "+G,E==="input"?(y=N,U&&(y+=O)):E==="textarea"?(y=C,U&&(y+=O)):E==="password"?(y=k,U&&(y+=O)):$?(E="button",y=A):E==="checkbox"?y=M:E==="radiogroup"?y=P:E==="selectlist"?y=_:E==="combo"?y=D:E==="date"?(y=H,x=x||"%x"):E==="time"?(y=B,x=x||"%X"):E==="datetime"?(y=j,x=x||"%x %X"):E==="autocomplete"?y=F:E==="tokeninput"?y=I:E==="tokenautocomplete"?y=q:E==="hidden"?y=L:y=T,X&&(S=r(S,{format:x}),e.use("gallery-itsadatetimepicker")),n.sub(y,{id:f,name:w,value:S,classname:W,classlevel2:K,type:E,validation:d.get("validationMessage")})},hideValidation:function(t){var n=e.one("#"+t);n&&n.get("parentNode").one("."+d).toggleClass(f,!0)},showValidation:function(t){var n=e.one("#"+t);n&&n.get("parentNode").one("."+d).toggleClass(f,!1)},destructor:function(){}},{ATTRS:{name:{value:"undefined-name",validator:function(e){return n.isString(e)}},focusable:{value:!0,validator:function(e){return n.isBoolean(e)}},type:{value:"",setter:function(e){return n.isString(e)&&(e=e.toLowerCase()),e},validator:function(e){return n.isString(e)&&(e==="input"||e==="password"||e==="textarea"||e==="date"||e==="time"||e==="datetime"||e==="button"||e==="reset"||e==="submit"||e==="save"||e==="destroy"||e==="hidden")}},value:{value:"",validator:function(e){return n.isString(e)||n.isBoolean(e)||n.isArray(e)||n.isDate(e)}},keyValidation:{value:null,validator:function(e){return n.isFunction(e)}},validation:{value:null,validator:function(e){return n.isFunction(e)}},validationMessage:{value:"",validator:function(e){return n.isString(e)}},autoCorrection:{value:null,validator:function(e){return n.isFunction(e)}},className:{value:null,validator:function(e){return n.isString(e)||null}},dateFormat:{value:null,validator:function(e){return n.isString(e)||null}},initialFocus:{value:!1,validator:function(e){return n.isBoolean(e)}},selectOnFocus:{value:!1,validator:function(e){return n.isBoolean(e)}},widgetConfig:{value:{},validator:function(e){return n.isObject(e)}}}})},"@VERSION@",{requires:["yui-base","base","node-core","node-base","datatype-date-format","classnamemanager","cssbutton"],skinnable:!0});
