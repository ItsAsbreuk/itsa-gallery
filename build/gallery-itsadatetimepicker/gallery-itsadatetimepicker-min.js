YUI.add("gallery-itsadatetimepicker",function(e,t){"use strict";var n=e.Lang,r=e.Node,i=e.Array,s="itsa-datetimepicker",o=s+"-panel",u=s+"-timechanged",a=1e3,f=s+"-datepicker",l=s+"-timepicker",c=l+"-hidden",h="Select date",p="Select date and time",d="Select time",v="yui3-button",m="itsa-button-datetime",g=s+"-icondate",y=s+"-icontime",b=s+"-icondatetime",w='<button class="'+v+" "+m+'"><span class="'+g+'"></span></button>',E='<button class="'+v+" "+m+'"><span class="'+b+'"></span></button>',S='<button class="'+v+" "+m+'"><span class="'+y+'"></span></button>',x="datetimepicker:",T=x+"selectdate",N=x+"selected",C=x+"cancel",k=function(e){return parseInt(e,10)};e.ITSADateTimePicker=e.Base.create("itsadatetimepicker",e.Base,[],{panel:null,calendar:null,timedial:null,_eventhandlers:[],_panelRendererDelay:null,_window:null,_timeNode:null,_timeFormat:null,initializer:function(){var t=this;t._window=e.one("window"),t._renderUI(),t._bindUI()},dateNode:function(){return r.create(w)},datetimeNode:function(){return r.create(E)},getDate:function(t,n,r){var i=this;return i._saveShow(1,t,n,r),new e.Promise(function(t,n){var r,s;r=e.once(T,function(e){s.detach();var n=e.newDate;n.setMilliseconds(0),n.setSeconds(0),n.setMinutes(0),n.setHours(0),i._hide(),t(n)}),s=e.once(C,function(){r.detach(),i.calendar.hide(),n(new Error("canceled"))})})},getDateTime:function(t,n,r){var i=this;return i._saveShow(2,t,n,r),new e.Promise(function(t,n){var r,s;r=e.once(N,function(){s.detach();var e=i.calendar.get("selectedDates")[0],n=k(i.timedial.get("value")),r=Math.floor(n/60),o=n-60*r;e.setMilliseconds(0),e.setSeconds(0),e.setMinutes(o),e.setHours(r),i._hide(),t(e)}),s=e.once(C,function(){r.detach(),i.calendar.hide(),i._toggleTimePicker(!1),n(new Error("canceled"))})})},getTime:function(t,n,r){var i=this;return i._saveShow(3,t,n,r),new e.Promise(function(t,n){var r,s;r=e.once(N,function(){s.detach();var e=k(i.timedial.get("value")),n=Math.floor(e/60),r=e-60*n,o=new Date(1900,0,1,n,r,0,0);i._hide(),t(o)}),s=e.once(C,function(){r.detach(),i._toggleTimePicker(!1),n(new Error("canceled"))})})},timeNode:function(){return r.create(S)},destructor:function(){var e=this;e._clearEventhandlers(),e._panelRendererDelay&&e._panelRendererDelay.cancel(),e.timedial.destroy(),e.calendar.destroy()},_bindUI:function(){var t=this,n=t._eventhandlers,r=t.panel;r.onceAfter("render",function(){n.push(r.get("boundingBox").one(".yui3-button-close").on("click",function(){e.fire(C)})),t._fillPanel()}),t._panelRendererDelay=e.later(a,t,function(){t._panelRendererDelay=null,r.render()}),n.push(e.one("body").delegate("click",function(){},"."+m))},_clearEventhandlers:function(){i.each(this._eventhandlers,function(e){e.detach()})},_createTimeDial:function(){var t=this,n=t.panel.get("contentBox"),r;t.timedial=r=new e.Dial({min:0,max:1440,stepsPerRevolution:720,strings:{label:"0:00",resetStr:"Reset",tooltipHandle:"Drag to set time"},value:0}),r.onceAfter("render",function(){t._timeNode=n.one(".yui3-dial-label-string")}),r.render(n.one("#"+l)),t._eventhandlers.push(r.on("valueChange",function(e){var n=parseInt(e.newVal,10),r=Math.floor(n/60),i=n-60*r,s=t._timeNode;s.setHTML(t._renderDialTime(r,i)),s.addClass(u)}))},_createCalendar:function(){var t=this;t.calendar=new e.Calendar({height:"250px",width:"250px",showPrevMonth:!0,showNextMonth:!0,visible:!1,date:new Date}),t._eventhandlers.push(t.calendar.on("selectionChange",e.rbind(t._calendarNewDate,t))),t.calendar.render(t.panel.get("contentBox").one("#"+f))},_calendarNewDate:function(t){var n=this,r;n.calendar.get("visible")&&(r=t.newSelection[0],e.fire(T,{newDate:r}))},_fillPanel:function(){var t=this,n=t.panel,r=n.get("boundingBox"),i;r.addClass(o),t._createCalendar(),t._createTimeDial(),i={value:"Select",action:function(t){t.preventDefault(),e.fire(N)},section:e.WidgetStdMod.FOOTER},n.addButton(i)},_hide:function(){var e=this;e.calendar.hide(),e._toggleTimePicker(!1),e.panel.hide()},_renderDialTime:function(t,n){var r=this,i=new Date(1900,0,1,t,n,0,0);return e.Date.format(i,{format:r._timeFormat||"%H:%M"})},_renderUI:function(){var t=this;t.panel=new e.Panel({zIndex:15e3,modal:!1,visible:!1,render:!1,fillHeight:null,bodyContent:'<div id="'+f+'"></div><div id="'+l+'"></div>'})},_saveShow:function(e,t,n,r){var i=this,s=i.panel;s.get("rendered")?i._show(e,t,n,r):s.onceAfter("render",function(){i._show(e,t,n,r)}),i._panelRendererDelay&&(i._panelRendererDelay.cancel(),s.render())},_show:function(t,r,i,s){var o=this,a=o.panel,f=r||new Date,l=o._timeNode,c=s&&s.modal,v,m,g,y,b,w,E,S,x,T,N,L;a.get("visible")&&(e.fire(C),o.panel.hide()),t<3?(o.calendar.deselectDates(),o.calendar.selectDates(f),n.isObject(s)&&(S={customRenderer:s.customRenderer||{},showPrevMonth:s.showPrevMonth||!1,showNextMonth:s.showNextMonth||!1,headerRenderer:s.headerRenderer||"%B %Y",minimumDate:s.minimumDate||null,maximumDate:s.maximumDate||null,enabledDatesRule:s.enabledDatesRule||null,disabledDatesRule:s.disabledDatesRule||null},o.calendar.setAttrs(S)),o.calendar.show()):o.calendar.hide(),t>1?(n.isObject(s)&&n.isString(s.timeformat)?o._timeFormat=s.timeformat:o._timeFormat=null,T=f.getHours(),x=f.getMinutes(),N=x+60*T,o.timedial.set("value",N),o.timedial._originalValue=N,l.setHTML(o._renderDialTime(T,x)),l.removeClass(u),o._toggleTimePicker(!0)):o._toggleTimePicker(!1);if(i){m=o._window;if(m){g=k(m.get("winWidth")),y=k(m.get("docScrollX"));switch(t){case 1:L=285;break;case 2:L=155;break;case 3:L=415}b=Math.max(a.get("boundingBox").get("offsetWidth"),L),w=i.getX(),E=i.get("offsetWidth"),v=w+E+b<y+g||w+E<b}a.align(i,v?[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.TR]:[e.WidgetPositionAlign.TR,e.WidgetPositionAlign.BR])}else a.centered();n.isBoolean(c)?a.set("modal",c):a.set("modal",!1);switch(t){case 1:a.set("headerContent",s&&s.title||h);break;case 2:a.set("headerContent",s&&s.title||p);break;case 3:a.set("headerContent",s&&s.title||d)}s&&n.isBoolean(s.dragable)?s.dragable&&!a.hasPlugin("dd")?(a.plug(e.Plugin.Drag),a.dd.addHandle(".yui3-widget-hd"
)):a.hasPlugin("dd")&&a.unplug("dd"):a.hasPlugin("dd")&&a.unplug("dd"),a.show()},_toggleTimePicker:function(e){var t=this;t.timedial.get("boundingBox").toggleClass(c,!e),t.panel.get("contentBox").one(".yui3-widget-ft").toggleClass(c,!e)}},{ATTRS:{}}),e.Global.ItsaDateTimePicker||(e.Global.ItsaDateTimePicker=new e.ITSADateTimePicker),e.ItsaDateTimePicker=e.Global.ItsaDateTimePicker},"@VERSION@",{requires:["base","node-base","node-screen","panel","calendar","dial","promise","cssbutton","datatype-date-format","dd-plugin"],skinnable:!0});
