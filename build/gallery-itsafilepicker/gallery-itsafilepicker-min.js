YUI.add("gallery-itsafilepicker",function(e,t){"use strict";e.ITSAFilePicker=e.Base.create("itsafilepicker",e.ITSAFileManager,[],{initializer:function(){var e=this;e.renderPromise().then(function(){return e.readyPromise}).then(function(){e.filescrollview.set("dblclickEvents",!0)})},getFile:function(t){var n=this;return n.dataPromise.then(function(){var r=n.filescrollview,i;return r.set("modelsSelectable",t?"multi":"single"),i=new e.Promise(function(i,s){var o,u;o=n.once("itsascrollviewmodellist:modelDblclick",function(s){var o=s.model,a;u.detach(),t&&(a=r.getSelectedModels(!0),e.Array.indexOf(a,o)===-1&&a.push(o)),i({directory:n.getCurrentDir(),file:o,files:a}),n.hide()}),u=n.once("*:visibleChange",function(t){var n=t.target,r=t.newVal===!1;r&&n instanceof e.ITSAFilePicker&&(o.detach(),s(new Error("Fileselector closed without selecting a file")))})}),n.show(),i})}});if(!e.Global.ItsaFilePicker){var n,r,i,s,o;n=parseInt(e.one("window").get("winHeight"),10),r=parseInt(e.one("window").get("winWidth"),10),s=Math.round(n*.9),i=Math.min(Math.round(s*1.3),Math.round(r*.9)),o={width:i,height:s,zIndex:15e3,centered:!0,modal:!0,visible:!1,plugins:[e.Plugin.Drag,e.Plugin.Resize]},e.Global.ItsaFilePicker=(new e.ITSAFilePicker(o)).render()}e.ItsaFilePicker=e.Global.ItsaFilePicker},"@VERSION@",{requires:["yui-base","promise","dd-plugin","resize-plugin","gallery-itsawidgetrenderpromise","gallery-itsafilemanager"]});
