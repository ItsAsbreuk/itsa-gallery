YUI.add("gallery-itsatoolbar",function(c){var e=c.Lang,o=c.Node,f="<button class='yui3-button'></button>",h="<span class='itsa-button-icon'></span>",j="yui3-button-active",n="itsa-button-active",g="itsa-button-indent",l="itsa-button",q="itsa-syncbutton",k="itsa-togglebutton",i="itsa-buttongroup",m="itsa-button-customfunc",p="<div class='itsatoolbar'></div>",b="itsa-buttonsize-small",a="itsa-buttonsize-medium",r="itsatoolbar-editorpart",d="<div></div>";c.namespace("Plugin").ITSAToolbar=c.Base.create("itsatoolbar",c.Plugin.Base,[],{editor:null,editorY:null,editorNode:null,containerNode:null,toolbarNode:null,ICON_BOLD:"itsa-icon-bold",ICON_ITALIC:"itsa-icon-italic",ICON_UNDERLINE:"itsa-icon-underline",ICON_ALIGN_LEFT:"itsa-icon-alignleft",ICON_ALIGN_CENTER:"itsa-icon-aligncenter",ICON_ALIGN_RIGHT:"itsa-icon-alignright",ICON_ALIGN_JUSTIFY:"itsa-icon-alignjustify",ICON_SUBSCRIPT:"itsa-icon-subscript",ICON_SUPERSCRIPT:"itsa-icon-superscript",ICON_TEXTCOLOR:"itsa-icon-textcolor",ICON_MARKCOLOR:"itsa-icon-markcolor",ICON_INDENT:"itsa-icon-indent",ICON_OUTDENT:"itsa-icon-outdent",ICON_UNORDEREDLIST:"itsa-icon-unorderedlist",ICON_ORDEREDLIST:"itsa-icon-orderedlist",ICON_UNDO:"itsa-icon-undo",ICON_REDO:"itsa-icon-redo",ICON_EMAIL:"itsa-icon-email",ICON_HYPERLINK:"itsa-icon-hyperlink",ICON_IMAGE:"itsa-icon-image",ICON_FILE:"itsa-icon-file",ICON_VIDEO:"itsa-icon-video",initializer:function(t){var s=this;s.editor=s.get("host");s.editor.on("frame:ready",s.render,s);},render:function(){var s=this;s.editorY=s.editor.getInstance();s.editorNode=s.editor.frame.get("node");s.containerNode=s.editorNode.get("parentNode");s.get("paraSupport")?s.editor.plug(c.Plugin.EditorPara):s.editor.plug(c.Plugin.EditorBR);s.editor.plug(c.Plugin.ExecCommand);s._defineCustomExecCommands();s._renderUI();s._bindUI();s.editor.focus();},sync:function(t){var s=this;if(t){s.toolbarNode.fire("itsatoolbar:statusChange",t);}},addButton:function(v,x,u,t){var s=this,w,y;w=o.create(f);w.addClass(l);if(e.isString(x)){w.setData("execCommand",x);}else{if(e.isObject(x)){if(e.isString(x.command)){w.setData("execCommand",x.command);}if(e.isString(x.value)){w.setData("execValue",x.value);}if(e.isFunction(x.customFunc)){w.addClass(m);w.on("click",x.customFunc,x.context||s);}}}if(e.isBoolean(u)&&u){w.addClass(g);}y=o.create(h);y.addClass(v);w.append(y);s.toolbarNode.append(w);return w;},addSyncButton:function(y,z,w,s,u,v,x){var A=this,t=A.addButton(y,z,u,v);if(!x){t.addClass(q);}A.toolbarNode.addTarget(t);if(e.isFunction(w)){t.on("itsatoolbar:statusChange",c.bind(w,s||A));}return t;},addToggleButton:function(v,y,z,x,u,t){var s=this,w=s.addSyncButton(v,y,z,x,u,t,true);w.addClass(k);return w;},addButtongroup:function(z,u,y){var B=this,x=c.guid(),w,t,s=null,A,v;for(v=0;v<z.length;v++){w=z[v];if(w.iconClass&&w.command){if(e.isString(w.value)){A={command:w.command,value:w.value};}else{A=w.command;}t=B.addButton(w.iconClass,A,u&&(v===0),(y)?y+v:null);t.addClass(i);t.addClass(i+"-"+x);t.setData("buttongroup",x);B.toolbarNode.addTarget(t);if(e.isFunction(w.syncFunc)){t.on("itsatoolbar:statusChange",c.bind(w.syncFunc,w.context||B));}if(!s){s=t;}}}return s;},addSelectlist:function(y,z,x,s,u,t,w){var A=this,v;t=c.merge(t,{items:y,defaultButtonText:""});v=new c.ITSASelectList(t);v.after("render",function(I,F,G,E,C){var B=this,H=I.currentTarget,D=H.buttonNode;if(e.isString(F)){D.setData("execCommand",F);}else{if(e.isString(F.command)){D.setData("execCommand",F.command);}if(e.isString(F.restoreCommand)){D.setData("restoreCommand",F.restoreCommand);}if(e.isString(F.restoreValue)){D.setData("restoreValue",F.restoreValue);}}if(C){H.get("boundingBox").addClass("itsa-button-indent");}B.toolbarNode.addTarget(D);H.on("selectChange",B._handleSelectChange,B);if(e.isFunction(G)){D.on("itsatoolbar:statusChange",c.bind(G,E||B));}B.editor.on("nodeChange",H.hideListbox,H);},A,z,x,s,u);v.render(A.toolbarNode);return v;},destructor:function(){var s=this,t=s.get("srcNode");if(s.toolbarNode){s.toolbarNode.remove(true);}},_renderUI:function(){var t=this,u=t.get("srcNode"),s=t.get("btnSize");t.toolbarNode=o.create(p);if(s===1){t.toolbarNode.addClass(b);}else{if(s===2){t.toolbarNode.addClass(a);}}if(u){u.prepend(t.toolbarNode);}else{t.toolbarNode.addClass(r);t.editorNode.set("height",parseInt(t.containerNode.getStyle("height"),10)-parseInt(t.toolbarNode.getStyle("height"),10)+"px");t.editorNode.insert(t.toolbarNode,"before");}t._initializeButtons();},_bindUI:function(){var s=this;s.editor.on("nodeChange",s.sync,s);s.toolbarNode.delegate("click",s._handleBtnClick,"button",s);},_defineCustomExecCommands:function(){var s=this;s._defineExecCommandFontSize();s._defineExecCommandHyperlink();s._defineExecCommandMaillink();s._defineExecCommandImage();s._defineExecCommandYouTube();},_handleBtnClick:function(u){var s=this,t=u.currentTarget;if(t.hasClass(l)){if(t.hasClass(k)){t.toggleClass(j);}else{if(t.hasClass(q)){t.toggleClass(n,true);}else{if(t.hasClass(i)){s.toolbarNode.all("."+i+"-"+t.getData("buttongroup")).toggleClass(j,false);t.toggleClass(j,true);}}}if(!t.hasClass(m)){s.execCommand(t);}}},execCommand:function(s){var t,u;t=s.getData("execCommand");u=s.getData("execValue");this.editor.exec.command(t,u);},_handleSelectChange:function(v){var u,s,t;u=v.currentTarget.buttonNode;s=u.getData("restoreCommand");t=(s&&(v.value===u.getData("restoreValue")))?s:u.getData("execCommand");this.editor.exec.command(t,v.value);},_checkInbetweenSelector:function(u,t,x){var s=this,z="<s*"+u+"[^>]*>(.*?)<s*/s*"+u+">",y=new RegExp(z,"gi"),w,v=false;w=y.exec(t);while((w!==null)&&!v){v=((x>w.index)&&(x<(w.index+w[0].length)));w=y.exec(t);}return v;},_initializeButtons:function(){var A=this,v,t,w,z,B,x,C,s,u,y;if(A.get("btnFontfamily")){x=A.get("fontFamilies");for(v=0;v<x.length;v++){B=x[v];x[v]={text:"<span style='font-family:"+B+"'>"+B+"</span>",returnValue:B};}A.fontSelectlist=A.addSelectlist(x,"fontname2",function(G){var F=G.changedNode.getStyle("fontFamily"),E=F.split(","),D=E[0];this.fontSelectlist.selectItemByValue(D,true,true);
},null,true,{buttonWidth:145});}if(A.get("btnFontsize")){x=[];for(v=6;v<=32;v++){x.push({text:v.toString(),returnValue:v+"px"});}A.sizeSelectlist=A.addSelectlist(x,"itsafontsize",function(G){var F=G.changedNode.getStyle("fontSize"),E=parseFloat(F),D=F.substring(E.toString().length);this.sizeSelectlist.selectItemByValue(Math.round(E)+D,true);},null,true,{buttonWidth:42,className:"itsatoolbar-fontsize",listAlignLeft:false});}if(A.get("btnHeader")){x=[];x.push({text:"No header",returnValue:"clear"});for(v=1;v<=A.get("headerLevels");v++){x.push({text:"Header "+v,returnValue:"h"+v});}A.headerSelectlist=A.addSelectlist(x,{command:"heading",restoreCommand:"insertParagraph",restoreValue:"clear"},function(I){var D=this,G=I.changedNode,J,H,E,F=D.editorY.one("body").getHTML();J=F.indexOf(G.getHTML());for(E=1;(!H&&(E<=D.get("headerLevels")));E++){if(D._checkInbetweenSelector("h"+E,F,J)){H=E;}}if(!H){H=0;}D.headerSelectlist.selectItem(H);},null,true,{buttonWidth:96});}if(A.get("btnBold")){A.addToggleButton(A.ICON_BOLD,"bold",function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("fontWeight")==="bold"));},null,true);}if(A.get("btnItalic")){A.addToggleButton(A.ICON_ITALIC,"italic",function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("fontStyle")==="italic"));});}if(A.get("btnUnderline")){A.addToggleButton(A.ICON_UNDERLINE,"underline",function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("textDecoration")==="underline"));});}if(A.get("grpAlign")){y=[{iconClass:A.ICON_ALIGN_LEFT,command:"JustifyLeft",value:"",syncFunc:function(D){D.currentTarget.toggleClass(j,((D.changedNode.getStyle("textAlign")==="left")||(D.changedNode.getStyle("textAlign")==="start")));}},{iconClass:A.ICON_ALIGN_CENTER,command:"JustifyCenter",value:"",syncFunc:function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("textAlign")==="center"));}},{iconClass:A.ICON_ALIGN_RIGHT,command:"JustifyRight",value:"",syncFunc:function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("textAlign")==="right"));}}];if(A.get("btnJustify")){y.push({iconClass:A.ICON_ALIGN_JUSTIFY,command:"JustifyFull",value:"",syncFunc:function(D){D.currentTarget.toggleClass(j,(D.changedNode.getStyle("textAlign")==="justify"));}});}A.addButtongroup(y,true);}if(A.get("grpSubsuper")){A.addToggleButton(A.ICON_SUBSCRIPT,"subscript",function(D){D.currentTarget.toggleClass(j,(D.changedNode.test("sub")));},null,true);A.addToggleButton(A.ICON_SUPERSCRIPT,"superscript",function(D){D.currentTarget.toggleClass(j,(D.changedNode.test("sup")));});}if(A.get("btnTextcolor")){x=[];u=A.get("colorPallet");for(v=0;v<u.length;v++){C=u[v];x.push({text:"<div style='background-color:"+C+";'></div>",returnValue:C});}A.colorSelectlist=A.addSelectlist(x,"forecolor",function(G){var D=this,F=G.changedNode.getStyle("color"),E=D._filter_rgb(F);D.colorSelectlist.selectItemByValue(E,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:A.ICON_TEXTCOLOR});}if(A.get("btnMarkcolor")){x=[];u=A.get("colorPallet");for(v=0;v<u.length;v++){C=u[v];x.push({text:"<div style='background-color:"+C+";'></div>",returnValue:C});}A.markcolorSelectlist=A.addSelectlist(x,"hilitecolor",function(G){var D=this,F=G.changedNode.getStyle("backgroundColor"),E=D._filter_rgb(F);D.markcolorSelectlist.selectItemByValue(E,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:A.ICON_MARKCOLOR});}if(A.get("grpIndent")){A.addButton(A.ICON_INDENT,"indent",true);A.addButton(A.ICON_OUTDENT,"outdent");}if(A.get("grpLists")){A.addToggleButton(A.ICON_UNORDEREDLIST,"insertunorderedlist",function(G){var D=this,F=G.changedNode,H,E=D.editorY.one("body").getHTML();H=E.indexOf(F.getHTML());G.currentTarget.toggleClass(j,(D._checkInbetweenSelector("ul",E,H)));},null,true);A.addToggleButton(A.ICON_ORDEREDLIST,"insertorderedlist",function(G){var D=this,F=G.changedNode,H,E=D.editorY.one("body").getHTML();H=E.indexOf(F.getHTML());G.currentTarget.toggleClass(j,(D._checkInbetweenSelector("ol",E,H)));});}if(A.get("btnEmail")){A.addSyncButton(A.ICON_EMAIL,"itsacreatemaillink",function(I){var E=this,G=I.changedNode,J,H,D,F=E.editorY.one("body").getHTML();J=F.indexOf(G.getHTML());H=E._checkInbetweenSelector("a",F,J);if(H){while(G&&!G.test("a")){G=G.get("parentNode");}D=(G.get("href").match("^mailto:","i")=="mailto:");}I.currentTarget.toggleClass(n,(H&&D));},null,true);}if(A.get("btnHyperlink")){A.addSyncButton(A.ICON_HYPERLINK,"itsacreatehyperlink",function(J){var M=this,K=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",H=J.changedNode,G,I,L=false,E,D,O,N,F=M.editorY.one("body").getHTML();G=F.indexOf(H.getHTML());I=M._checkInbetweenSelector("a",F,G);if(I){while(H&&!H.test("a")){H=H.get("parentNode");}E=H.get("href");N=E.match("^mailto:","i")!="mailto:";if(N){D=E.lastIndexOf(".");if(D!==-1){O=E.substring(D)+".";L=(K.indexOf(O)!==-1);}}}J.currentTarget.toggleClass(n,(I&&N&&!L));});}if(A.get("btnImage")){A.addSyncButton(A.ICON_IMAGE,"itsacreateimage",function(D){D.currentTarget.toggleClass(n,(D.changedNode.test("img")));});}if(A.get("btnVideo")){A.addSyncButton(A.ICON_VIDEO,"itsacreateyoutube",function(D){D.currentTarget.toggleClass(n,(D.changedNode.test("iframe")));});}if(false){A.addSyncButton(A.ICON_FILE,{customFunc:function(D){c.config.cmas2plus.uploader.show(null,c.bind(function(E){this.editor.exec.command("itsacreatehyperlink","http://files.brongegevens.nl/"+c.config.cmas2plusdomain+"/"+E.n);},this));}},function(J){var M=this,K=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",H=J.changedNode,G,L=false,I,E,D,O,N,F=M.editorY.one("body").getHTML();G=F.indexOf(H.getHTML());I=M._checkInbetweenSelector("a",F,G);if(I){while(H&&!H.test("a")){H=H.get("parentNode");}E=H.get("href");N=E.match("^mailto:","i")!="mailto:";if(N){D=E.lastIndexOf(".");if(D!==-1){O=E.substring(D)+".";L=(K.indexOf(O)!==-1);}}}J.currentTarget.toggleClass(n,L);});}if(A.get("grpUndoredo")){A.addButton(A.ICON_UNDO,"undo",true);A.addButton(A.ICON_REDO,"redo");}},_filter_rgb:function(u){if(u.toLowerCase().indexOf("rgb")!=-1){var x=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");
var t=u.replace(x,"$1,$2,$3,$4,$5").split(",");if(t.length===5){var w=parseInt(t[1],10).toString(16);var v=parseInt(t[2],10).toString(16);var s=parseInt(t[3],10).toString(16);w=w.length===1?"0"+w:w;v=v.length===1?"0"+v:v;s=s.length===1?"0"+s:s;u="#"+w+v+s;}}return u;},_defineExecCommandFontSize:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsafontsize){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsafontsize:function(v,w){var u=this,x=u.get("host").getInstance(),t=new x.EditorSelection(),s;if(!t.isCollapsed&&t.anchorNode&&(u._lastKey!==32)){if(c.UA.webkit){if(t.anchorNode.getStyle("lineHeight")){t.anchorNode.setStyle("lineHeight","");}}t.anchorNode.all("span").setStyle("fontSize","");s=t.wrapContent("span");s.item(0).setStyle("fontSize",w);}else{}}});}},_defineExecCommandHyperlink:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreatehyperlink:function(v,u){var x=this,A=x.get("host").getInstance(),w,B,t,z,s,y,C;s=u||prompt("Enter url","http://");if(s){z=A.config.doc.createElement("div");s=s.replace(/"/g,"").replace(/'/g,"");s=A.config.doc.createTextNode(s);z.appendChild(s);s=z.innerHTML;x.get("host")._execCommand("createlink",s);t=new A.EditorSelection();w=t.getSelected();if(!t.isCollapsed&&w.size()){B=w.item(0).one("a");if(B){w.item(0).replace(B);}if(c.UA.gecko){if(B.get("parentNode").test("span")){if(B.get("parentNode").one("br.yui-cursor")){B.get("parentNode").insert(B,"before");}}}}else{x.get("host").execCommand("inserthtml",'<a href="'+s+'" target="_blank">'+s+"</a>");}}return B;}});}},_defineExecCommandMaillink:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreatemaillink){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreatemaillink:function(v,u){var x=this,A=x.get("host").getInstance(),w,B,t,z,s,C,y,D;s=u||prompt("Enter email","");if(s){z=A.config.doc.createElement("div");s=s.replace(/"/g,"").replace(/'/g,"");C=s;s="mailto:"+s;s=A.config.doc.createTextNode(s);z.appendChild(s);s=z.innerHTML;x.get("host")._execCommand("createlink",s);t=new A.EditorSelection();w=t.getSelected();if(!t.isCollapsed&&w.size()){B=w.item(0).one("a");if(B){w.item(0).replace(B);}if(c.UA.gecko){if(B.get("parentNode").test("span")){if(B.get("parentNode").one("br.yui-cursor")){B.get("parentNode").insert(B,"before");}}}}else{x.get("host").execCommand("inserthtml",'<a href="'+s+'">'+C+"</a>");}}return B;}});}},_defineExecCommandImage:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreateimage){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreateimage:function(v,u){var x=this,A=x.get("host").getInstance(),w,B,t,z,s,y,C;s=u||prompt("Enter link to image","http://");if(s){z=A.config.doc.createElement("div");s=s.replace(/"/g,"").replace(/'/g,"");s=A.config.doc.createTextNode(s);z.appendChild(s);s=z.innerHTML;x.get("host")._execCommand("createlink",s);t=new A.EditorSelection();w=t.getSelected();if(!t.isCollapsed&&w.size()){B=w.item(0).one("a");if(B){w.item(0).replace(B);}if(c.UA.gecko){if(B.get("parentNode").test("span")){if(B.get("parentNode").one("br.yui-cursor")){B.get("parentNode").insert(B,"before");}}}}else{x.get("host").execCommand("inserthtml",'<img src="'+s+'" />');}}return B;}});}},_defineExecCommandYouTube:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreateyoutube){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreateyoutube:function(v,u){var x=this,A=x.get("host").getInstance(),w,B,t,z,s,y,C;s=u||prompt("Enter link to image","http://");if(s){z=A.config.doc.createElement("div");s=s.replace(/"/g,"").replace(/'/g,"");s=A.config.doc.createTextNode(s);z.appendChild(s);s=z.innerHTML;x.get("host")._execCommand("createlink",s);t=new A.EditorSelection();w=t.getSelected();if(!t.isCollapsed&&w.size()){B=w.item(0).one("a");if(B){w.item(0).replace(B);}if(c.UA.gecko){if(B.get("parentNode").test("span")){if(B.get("parentNode").one("br.yui-cursor")){B.get("parentNode").insert(B,"before");}}}}else{C=s.indexOf("watch?v=");if(C!==-1){y=s.substring(s.videoitempos+8);x.get("host").execCommand("inserthtml",'<iframe width="420" height="315" src="http://www.youtube.com/embed/'+y+'" frameborder="0" allowfullscreen></iframe>');}}}return B;}});}}},{NS:"itsatoolbar",ATTRS:{paraSupport:{value:false,validator:function(s){return e.isBoolean(s);}},srcNode:{value:null,writeOnce:"initOnly",setter:function(s){return c.one(s);},validator:function(s){return c.one(s);}},btnSize:{value:2,validator:function(s){return(e.isNumber(s)&&(s>0)&&(s<4));}},headerLevels:{value:6,validator:function(s){return(e.isNumber(s)&&(s>0)&&(s<10));}},fontFamilies:{value:["Arial","Arial Black","Comic Sans MS","Courier New","Lucida Console","Tahoma","Times New Roman","Trebuchet MS","Verdana"],validator:function(s){return(e.isArray(s));}},btnFontfamily:{value:true,validator:function(s){return e.isBoolean(s);}},btnFontsize:{value:true,validator:function(s){return e.isBoolean(s);}},btnHeader:{value:false,validator:function(s){return e.isBoolean(s);}},btnBold:{value:true,validator:function(s){return e.isBoolean(s);}},btnItalic:{value:true,validator:function(s){return e.isBoolean(s);}},btnUnderline:{value:true,validator:function(s){return e.isBoolean(s);}},grpAlign:{value:true,validator:function(s){return e.isBoolean(s);}},btnJustify:{value:true,validator:function(s){return e.isBoolean(s);}},grpSubsuper:{value:true,validator:function(s){return e.isBoolean(s);}},btnTextcolor:{value:true,validator:function(s){return e.isBoolean(s);}},btnMarkcolor:{value:true,validator:function(s){return e.isBoolean(s);}},grpIndent:{value:true,validator:function(s){return e.isBoolean(s);}},grpLists:{value:true,validator:function(s){return e.isBoolean(s);}},grpUndoredo:{value:true,validator:function(s){return e.isBoolean(s);}},btnEmail:{value:true,validator:function(s){return e.isBoolean(s);}},btnHyperlink:{value:true,validator:function(s){return e.isBoolean(s);}},btnImage:{value:false,validator:function(s){return e.isBoolean(s);}},btnVideo:{value:false,validator:function(s){return e.isBoolean(s);}},colorPallet:{value:["#111111","#2D2D2D","#434343","#5B5B5B","#737373","#8B8B8B","#A2A2A2","#B9B9B9","#000000","#D0D0D0","#E6E6E6","#FFFFFF","#BFBF00","#FFFF00","#FFFF40","#FFFF80","#FFFFBF","#525330","#898A49","#AEA945","#7F7F00","#C3BE71","#E0DCAA","#FCFAE1","#60BF00","#80FF00","#A0FF40","#C0FF80","#DFFFBF","#3B5738","#668F5A","#7F9757","#407F00","#8A9B55","#B7C296","#E6EBD5","#00BF00","#00FF80","#40FFA0","#80FFC0","#BFFFDF","#033D21","#438059","#7FA37C","#007F40","#8DAE94","#ACC6B5","#DDEBE2","#00BFBF","#00FFFF","#40FFFF","#80FFFF","#BFFFFF","#033D3D","#347D7E","#609A9F","#007F7F","#96BDC4","#B5D1D7","#E2F1F4","#0060BF","#0080FF","#40A0FF","#80C0FF","#BFDFFF","#1B2C48","#385376","#57708F","#00407F","#7792AC","#A8BED1","#DEEBF6","#0000BF","#0000FF","#4040FF","#8080FF","#BFBFFF","#212143","#373E68","#444F75","#00007F","#585E82","#8687A4","#D2D1E1","#6000BF","#8000FF","#A040FF","#C080FF","#DFBFFF","#302449","#54466F","#655A7F","#40007F","#726284","#9E8FA9","#DCD1DF","#BF00BF","#FF00FF","#FF40FF","#FF80FF","#FFBFFF","#4A234A","#794A72","#936386","#7F007F","#9D7292","#C0A0B6","#ECDAE5","#BF005F","#FF007F","#FF409F","#FF80BF","#FFBFDF","#451528","#823857","#A94A76","#7F003F","#BC6F95","#D8A5BB","#F7DDE9","#C00000","#FF0000","#FF4040","#FF8080","#FFC0C0","#441415","#82393C","#AA4D4E","#800000","#BC6E6E","#D8A3A4","#F8DDDD","#BF5F00","#FF7F00","#FF9F40","#FFBF80","#FFDFBF","#482C1B","#855A40","#B27C51","#7F3F00","#C49B71","#E1C4A8","#FDEEE0"],validator:function(s){return e.isArray(s);
}}}});},"@VERSION@",{requires:["plugin","base-build","node-base","editor","event-delegate","event-custom","cssbutton","gallery-itsaselectlist"],skinnable:true});