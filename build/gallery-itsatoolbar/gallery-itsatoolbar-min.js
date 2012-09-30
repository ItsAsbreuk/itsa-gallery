YUI.add("gallery-itsatoolbar",function(d){var g=d.Lang,w=d.Node,h="<button class='yui3-button'></button>",m="<span class='itsa-button-icon'></span>",o="yui3-button-active",u="itsa-button-active",k="itsa-button-indent",s="itsa-button",y="itsa-syncbutton",r="itsa-togglebutton",n="itsa-buttongroup",t="itsa-button-customfunc",x="<div class='itsatoolbar'></div>",c="itsa-buttonsize-small",a="itsa-buttonsize-medium",z="itsatoolbar-editorpart",e="<div></div>",q="<img id='itsatoolbar-tmpref' />",b="<img class='itsatoolbar-tmpempty' src='itsa-buttonicons-2012-08-15.png' width=0 height=0>",p="<span id='itsatoolbar-ref'></span>",j="itsa-selection-tmp",l="itsa-fontsize",i="itsa-fontfamily",f="itsa-fontcolor",v="itsa-markcolor";d.namespace("Plugin").ITSAToolbar=d.Base.create("itsatoolbar",d.Plugin.Base,[],{editor:null,editorY:null,editorNode:null,containerNode:null,toolbarNode:null,_destroyed:false,_timerClearEmptyFontRef:null,_backupCursorRef:null,ICON_BOLD:"itsa-icon-bold",ICON_ITALIC:"itsa-icon-italic",ICON_UNDERLINE:"itsa-icon-underline",ICON_ALIGN_LEFT:"itsa-icon-alignleft",ICON_ALIGN_CENTER:"itsa-icon-aligncenter",ICON_ALIGN_RIGHT:"itsa-icon-alignright",ICON_ALIGN_JUSTIFY:"itsa-icon-alignjustify",ICON_SUBSCRIPT:"itsa-icon-subscript",ICON_SUPERSCRIPT:"itsa-icon-superscript",ICON_TEXTCOLOR:"itsa-icon-textcolor",ICON_MARKCOLOR:"itsa-icon-markcolor",ICON_INDENT:"itsa-icon-indent",ICON_OUTDENT:"itsa-icon-outdent",ICON_UNORDEREDLIST:"itsa-icon-unorderedlist",ICON_ORDEREDLIST:"itsa-icon-orderedlist",ICON_UNDO:"itsa-icon-undo",ICON_REDO:"itsa-icon-redo",ICON_EMAIL:"itsa-icon-email",ICON_HYPERLINK:"itsa-icon-hyperlink",ICON_IMAGE:"itsa-icon-image",ICON_FILE:"itsa-icon-file",ICON_VIDEO:"itsa-icon-video",initializer:function(B){var A=this;A.editor=A.get("host");if(A.editor.frame&&A.editor.frame.get("node")){A._render();}else{A.editor.on("ready",A._render,A);}},_render:function(){var A=this;if(!A._destroyed){A.editorY=A.editor.getInstance();A.editorNode=A.editor.frame.get("node");A.containerNode=A.editorNode.get("parentNode");A.get("paraSupport")?A.editor.plug(d.Plugin.EditorPara):A.editor.plug(d.Plugin.EditorBR);A.editor.plug(d.Plugin.ExecCommand);A._defineCustomExecCommands();A._renderUI();A._bindUI();A.editor.frame.focus(d.bind(A.sync,A));}},_getCursorRef:function(C){var A=this,D,F,E,B;A._removeCursorRef();E=new A.editorY.EditorSelection();B=E.getSelected();if(!E.isCollapsed&&B.size()){D=B.item(0);}if(D){D.addClass(j);D.insert(p,"after");if(!(g.isBoolean(C)&&C)){D=A.editorY.one("#itsatoolbar-ref");}}else{A.editor.focus();A.execCommand("inserthtml",p);D=A.editorY.one("#itsatoolbar-ref");}return D;},_removeCursorRef:function(){var A=this,C,B;B=A.editorY?A.editorY:d;C=B.all("#itsatoolbar-ref");if(C){C.remove();}C=B.all("#itsatoolbar-tmpempty");if(C){C.remove();}C=B.all("."+j);if(C.size()>0){C.each(function(D){D.replace(D.getHTML());});}},_clearEmptyFontRef:function(){var A=this,C,B;B=A.editorY?A.editorY:d;C=B.all(".itsatoolbar-tmpempty");if(C){C.remove();}C=B.all(".itsa-fontsize");if(C.size()>0){C.each(function(D){if(D.getHTML()===""){D.remove();}});}C=B.all(".itsa-fontfamily");if(C.size()>0){C.each(function(D){if(D.getHTML()===""){D.remove();}});}C=B.all(".itsa-fontcolor");if(C.size()>0){C.each(function(D){if(D.getHTML()===""){D.remove();}});}C=B.all(".itsa-markcolor");if(C.size()>0){C.each(function(D){if(D.getHTML()===""){D.remove();}});}},_setCursorAtRef:function(){var A=this,C,B=A.editorY.one("#itsatoolbar-ref");if(B){C=new A.editorY.EditorSelection();C.selectNode(B);d.later(100,A,A._removeCursorRef);}},_createBackupCursorRef:function(){var A=this;A._backupCursorRef=A._getCursorRef(true);},_getBackupCursorRef:function(){return this._backupCursorRef;},sync:function(C){var A=this,B;if(!(C&&C.changedNode)){B=A._getCursorRef(false);if(!C){C={changedNode:B};}else{C.changedNode=B;}d.later(250,A,A._removeCursorRef);}if(A.toolbarNode){A.toolbarNode.fire("itsatoolbar:statusChange",C);}},addButton:function(D,F,C,B){var A=this,E,G;E=w.create(h);E.addClass(s);if(g.isString(F)){E.setData("execCommand",F);}else{if(g.isObject(F)){if(g.isString(F.command)){E.setData("execCommand",F.command);}if(g.isString(F.value)){E.setData("execValue",F.value);}if(g.isFunction(F.customFunc)){E.addClass(t);E.on("click",F.customFunc,F.context||A);}}}if(g.isBoolean(C)&&C){E.addClass(k);}G=w.create(m);G.addClass(D);E.append(G);if(A.toolbarNode){A.toolbarNode.append(E);}else{A.editor.on("ready",function(I,H){A.toolbarNode.append(H);},A,E);}return E;},addSyncButton:function(G,H,E,A,C,D,F){var I=this,B=I.addButton(G,H,C,D);if(!F){B.addClass(y);}if(I.toolbarNode){I.toolbarNode.addTarget(B);}else{I.editor.on("ready",function(K,J){I.toolbarNode.addTarget(J);},I,B);}if(g.isFunction(E)){B.on("itsatoolbar:statusChange",d.bind(E,A||I));}return B;},addToggleButton:function(D,G,H,F,C,B){var A=this,E=A.addSyncButton(D,G,H,F,C,B,true);E.addClass(r);return E;},addButtongroup:function(D,C,B){var A=this;if(A.toolbarNode){A._addButtongroup(D,C,B);}else{A.editor.on("ready",function(H,G,F,E){A._addButtongroup(G,F,E);},A,D,C,B);}},_addButtongroup:function(H,C,G){var J=this,F=d.guid(),E,B,A=null,I,D;for(D=0;D<H.length;D++){E=H[D];if(E.iconClass&&E.command){if(g.isString(E.value)){I={command:E.command,value:E.value};}else{I=E.command;}B=J.addButton(E.iconClass,I,C&&(D===0),(G)?G+D:null);B.addClass(n);B.addClass(n+"-"+F);B.setData("buttongroup",F);J.toolbarNode.addTarget(B);if(g.isFunction(E.syncFunc)){B.on("itsatoolbar:statusChange",d.bind(E.syncFunc,E.context||J));}if(!A){A=B;}}}return A;},addSelectlist:function(G,H,F,A,C,B,E){var I=this,D;B=d.merge(B,{items:G,defaultButtonText:""});D=new d.ITSASelectList(B);D.after("render",function(Q,N,O,M,K){var J=this,P=Q.currentTarget,L=P.buttonNode;if(g.isString(N)){L.setData("execCommand",N);}else{if(g.isString(N.command)){L.setData("execCommand",N.command);}if(g.isString(N.restoreCommand)){L.setData("restoreCommand",N.restoreCommand);}if(g.isString(N.restoreValue)){L.setData("restoreValue",N.restoreValue);}}if(K){P.get("boundingBox").addClass("itsa-button-indent");
}J.toolbarNode.addTarget(L);P.on("show",J._createBackupCursorRef,J);P.on("selectChange",J._handleSelectChange,J);if(g.isFunction(O)){L.on("itsatoolbar:statusChange",d.rbind(O,M||J));}J.editor.on("nodeChange",P.hideListbox,P);},I,H,F,A,C);if(I.toolbarNode){D.render(I.toolbarNode);}else{I.editor.on("ready",function(){D.render(I.toolbarNode);},I);}return D;},destructor:function(){var A=this,B=A.get("srcNode");A._destroyed=true;A._removeCursorRef();if(A._timerClearEmptyFontRef){A._timerClearEmptyFontRef.cancel();}A._clearEmptyFontRef();if(A.toolbarNode){A.toolbarNode.remove(true);}},_renderUI:function(){var C=this,B=0,D=C.get("srcNode"),A=C.get("btnSize");C.toolbarNode=w.create(x);if(A===1){C.toolbarNode.addClass(c);}else{if(A===2){C.toolbarNode.addClass(a);}}if(D){D.prepend(C.toolbarNode);}else{C.toolbarNode.addClass(z);switch(C.get("btnSize")){case 1:B=-40;break;case 2:B=-44;break;case 3:B=-46;break;}B+=parseInt(C.containerNode.get("offsetHeight"),10)-parseInt(C.containerNode.getComputedStyle("paddingTop"),10)-parseInt(C.containerNode.getComputedStyle("borderTopWidth"),10)-parseInt(C.containerNode.getComputedStyle("borderBottomWidth"),10);C.editorNode.set("height",B);C.editorNode.insert(C.toolbarNode,"before");}C._initializeButtons();},_bindUI:function(){var A=this;A.editor.on("nodeChange",A.sync,A);A.toolbarNode.delegate("click",A._handleBtnClick,"button",A);},_defineCustomExecCommands:function(){var A=this;A._defineExecCommandHeader();A._defineExecCommandFontFamily();A._defineExecCommandFontSize();A._defineExecCommandFontColor();A._defineExecCommandMarkColor();A._defineExecCommandHyperlink();A._defineExecCommandMaillink();A._defineExecCommandImage();A._defineExecCommandYouTube();},_handleBtnClick:function(C){var A=this,B=C.currentTarget;if(B.hasClass(s)){if(B.hasClass(r)){B.toggleClass(o);}else{if(B.hasClass(y)){B.toggleClass(u,true);}else{if(B.hasClass(n)){A.toolbarNode.all("."+n+"-"+B.getData("buttongroup")).toggleClass(o,false);B.toggleClass(o,true);}}}if(!B.hasClass(t)){A._execCommandFromData(B);}}},_handleSelectChange:function(D){var C,A,B;C=D.currentTarget.buttonNode;A=C.getData("restoreCommand");B=(A&&(D.value===C.getData("restoreValue")))?A:C.getData("execCommand");this.execCommand(B,D.value);},_execCommandFromData:function(A){var B,C;B=A.getData("execCommand");C=A.getData("execValue");this.execCommand(B,C);},execCommand:function(D,B){var A=this,C;A.editor.focus();if(D==="inserthtml"){A.editor._execCommand("createlink","&nbsp;");A.editor.exec.command("inserthtml",q);C=A.editorY.one("#itsatoolbar-tmpref");C.replace(B);}else{A.editor.exec.command(D,B);}},_hasSelection:function(){var A=this,B=new A.editorY.EditorSelection();return(!B.isCollapsed&&B.anchorNode);},_checkInbetweenSelector:function(B,I){var J=this,F="<\\s*"+B+"[^>]*>(.*?)<\\s*/\\s*"+B+">",A=new RegExp(F,"gi"),D,G=false,C=J.editorY.one("body").getHTML(),H,E;H=I.get("id");E=C.indexOf(' id="'+H+'"');if(E===-1){E=C.indexOf(" id='"+H+"'");}if(E===-1){E=C.indexOf(" id="+H);}D=A.exec(C);while((D!==null)&&!G){G=((E>=D.index)&&(E<(D.index+D[0].length)));D=A.exec(C);}return G;},_getActiveHeader:function(K){var M=this,H,B,G,L,J,F,D=0,C=null,I,A,E;if(K){F=K.get("tagName");if(F.length>1){D=parseInt(F.substring(1),10);}if((F.length===2)&&(F.toLowerCase().substring(0,1)==="h")&&(D>0)&&(D<10)){C=K;}else{J=K.get("id");H=" id=(\"|')?"+J+"(\"|')?(.*?)<\\s*/\\s*h\\d>";B=new RegExp(H,"gi");E=M.editorY.one("body").getHTML();G=B.exec(E);if(G!==null){A=G.index+G[0].length-1;D=E.substring(A-1,A);H="<\\s*h"+D+"[^>]*>(.*?)id=(\"|')?"+J+"(\"|')?(.*?)<\\s*/\\s*h"+D+">";B=new RegExp(H,"gi");G=B.exec(E);if(G!==null){L=E.substring(G.index,G.index+G[0].length);}}if(L){I=w.create(L);C=M.editorY.one("#"+I.get("id"));}}}return C;},_initializeButtons:function(){var I=this,D,B,E,H,J,F,K,A,C,G;if(I.get("btnFontfamily")){F=I.get("fontFamilies");for(D=0;D<F.length;D++){J=F[D];F[D]={text:"<span style='font-family:"+J+"'>"+J+"</span>",returnValue:J};}I.fontSelectlist=I.addSelectlist(F,"itsafontfamily",function(O){var N=O.changedNode.getStyle("fontFamily"),M=N.split(","),L=M[0];if((L.substring(0,1)==="'")||(L.substring(0,1)==='"')){L=L.substring(1,L.length-1);}this.fontSelectlist.selectItemByValue(L,true,true);},null,true,{buttonWidth:145});}if(I.get("btnFontsize")){F=[];for(D=6;D<=32;D++){F.push({text:D.toString(),returnValue:D+"px"});}I.sizeSelectlist=I.addSelectlist(F,"itsafontsize",function(O){var N=O.changedNode.getComputedStyle("fontSize"),M=parseFloat(N),L=N.substring(M.toString().length);this.sizeSelectlist.selectItemByValue(g.isNumber(M)?Math.round(M)+L:"",true);},null,true,{buttonWidth:42,className:"itsatoolbar-fontsize",listAlignLeft:false});}if(I.get("btnHeader")){F=[];F.push({text:"No header",returnValue:"none"});for(D=1;D<=I.get("headerLevels");D++){F.push({text:"Header "+D,returnValue:"h"+D});}I.headerSelectlist=I.addSelectlist(F,"itsaheading",function(O){var M=this,N=O.changedNode,P=(O.sender&&O.sender==="itsaheading"),L;if(!P){L=M._getActiveHeader(N);M.headerSelectlist.selectItem(L?parseInt(L.get("tagName").substring(1),10):0);M.headerSelectlist.set("disabled",g.isNull(L)&&!M._hasSelection());}},null,true,{buttonWidth:96});}if(I.get("btnBold")){I.addToggleButton(I.ICON_BOLD,"bold",function(M){var L=M.changedNode.getStyle("fontWeight");M.currentTarget.toggleClass(o,(g.isNumber(parseInt(L,10))?(L>=600):((L==="bold")||(L==="bolder"))));},null,true);}if(I.get("btnItalic")){I.addToggleButton(I.ICON_ITALIC,"italic",function(L){L.currentTarget.toggleClass(o,(L.changedNode.getStyle("fontStyle")==="italic"));});}if(I.get("btnUnderline")){I.addToggleButton(I.ICON_UNDERLINE,"underline",function(L){L.currentTarget.toggleClass(o,(L.changedNode.getStyle("textDecoration")==="underline"));});}if(I.get("grpAlign")){G=[{iconClass:I.ICON_ALIGN_LEFT,command:"JustifyLeft",value:"",syncFunc:function(L){L.currentTarget.toggleClass(o,((L.changedNode.getStyle("textAlign")==="left")||(L.changedNode.getStyle("textAlign")==="start")));}},{iconClass:I.ICON_ALIGN_CENTER,command:"JustifyCenter",value:"",syncFunc:function(L){L.currentTarget.toggleClass(o,(L.changedNode.getStyle("textAlign")==="center"));
}},{iconClass:I.ICON_ALIGN_RIGHT,command:"JustifyRight",value:"",syncFunc:function(L){L.currentTarget.toggleClass(o,(L.changedNode.getStyle("textAlign")==="right"));}}];if(I.get("btnJustify")){G.push({iconClass:I.ICON_ALIGN_JUSTIFY,command:"JustifyFull",value:"",syncFunc:function(L){L.currentTarget.toggleClass(o,(L.changedNode.getStyle("textAlign")==="justify"));}});}I.addButtongroup(G,true);}if(I.get("grpSubsuper")){I.addToggleButton(I.ICON_SUBSCRIPT,"subscript",function(L){L.currentTarget.toggleClass(o,(L.changedNode.test("sub")));},null,true);I.addToggleButton(I.ICON_SUPERSCRIPT,"superscript",function(L){L.currentTarget.toggleClass(o,(L.changedNode.test("sup")));});}if(I.get("btnTextcolor")){F=[];C=I.get("colorPallet");for(D=0;D<C.length;D++){K=C[D];F.push({text:"<div style='background-color:"+K+";'></div>",returnValue:K});}I.colorSelectlist=I.addSelectlist(F,"itsafontcolor",function(O){var L=this,N=O.changedNode.getStyle("color"),M=L._filter_rgb(N);L.colorSelectlist.selectItemByValue(M,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:I.ICON_TEXTCOLOR});}if(I.get("btnMarkcolor")){F=[];C=I.get("colorPallet");for(D=0;D<C.length;D++){K=C[D];F.push({text:"<div style='background-color:"+K+";'></div>",returnValue:K});}I.markcolorSelectlist=I.addSelectlist(F,"itsamarkcolor",function(O){var L=this,N=O.changedNode.getStyle("backgroundColor"),M=L._filter_rgb(N);L.markcolorSelectlist.selectItemByValue(M,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:I.ICON_MARKCOLOR});}if(I.get("grpIndent")){I.addButton(I.ICON_INDENT,"indent",true);I.addButton(I.ICON_OUTDENT,"outdent");}if(I.get("grpLists")){I.addToggleButton(I.ICON_UNORDEREDLIST,"insertunorderedlist",function(N){var L=this,M=N.changedNode;N.currentTarget.toggleClass(o,(L._checkInbetweenSelector("ul",M)));},null,true);I.addToggleButton(I.ICON_ORDEREDLIST,"insertorderedlist",function(N){var L=this,M=N.changedNode;N.currentTarget.toggleClass(o,(L._checkInbetweenSelector("ol",M)));});}if(I.get("btnEmail")){I.addSyncButton(I.ICON_EMAIL,"itsacreatemaillink",function(P){var M=this,N=P.changedNode,Q,O,L;O=M._checkInbetweenSelector("a",N);if(O){while(N&&!N.test("a")){N=N.get("parentNode");}L=(N.get("href").match("^mailto:","i")=="mailto:");}P.currentTarget.toggleClass(u,(O&&L));},null,true);}if(I.get("btnHyperlink")){I.addSyncButton(I.ICON_HYPERLINK,"itsacreatehyperlink",function(Q){var T=this,R=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",O=Q.changedNode,N,P,S=false,M,L,V,U;P=T._checkInbetweenSelector("a",O);if(P){while(O&&!O.test("a")){O=O.get("parentNode");}M=O.get("href");U=M.match("^mailto:","i")!="mailto:";if(U){L=M.lastIndexOf(".");if(L!==-1){V=M.substring(L)+".";S=(R.indexOf(V)!==-1);}}}Q.currentTarget.toggleClass(u,(P&&U&&!S));});}if(I.get("btnImage")){I.addSyncButton(I.ICON_IMAGE,"itsacreateimage",function(L){L.currentTarget.toggleClass(u,(L.changedNode.test("img")));});}if(I.get("btnVideo")){I.addSyncButton(I.ICON_VIDEO,"itsacreateyoutube",function(L){L.currentTarget.toggleClass(u,(L.changedNode.test("iframe")));});}if(false){I.addButton(I.ICON_EURO,{command:"inserthtml",value:"&#8364;"},true);I.addSyncButton(I.ICON_FILE,{customFunc:function(L){d.config.cmas2plus.uploader.show(null,d.bind(function(M){this.editor.execCommand("itsacreatehyperlink","http://files.brongegevens.nl/"+d.config.cmas2plusdomain+"/"+M.n);},this));}},function(Q){var T=this,R=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",O=Q.changedNode,N,S=false,P,M,L,V,U;P=T._checkInbetweenSelector("a",O);if(P){while(O&&!O.test("a")){O=O.get("parentNode");}M=O.get("href");U=M.match("^mailto:","i")!="mailto:";if(U){L=M.lastIndexOf(".");if(L!==-1){V=M.substring(L)+".";S=(R.indexOf(V)!==-1);}}}Q.currentTarget.toggleClass(u,S);});}if(I.get("grpUndoredo")){I.addButton(I.ICON_UNDO,"undo",true);I.addButton(I.ICON_REDO,"redo");}},_filter_rgb:function(C){if(C.toLowerCase().indexOf("rgb")!=-1){var F=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi"),B=C.replace(F,"$1,$2,$3,$4,$5").split(","),E,D,A;if(B.length===5){E=parseInt(B[1],10).toString(16);D=parseInt(B[2],10).toString(16);A=parseInt(B[3],10).toString(16);E=E.length===1?"0"+E:E;D=D.length===1?"0"+D:D;A=A.length===1?"0"+A:A;C="#"+E+D+A;}}return C;},_defineExecCommandHeader:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsaheading){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsaheading:function(D,B){var G=this.get("host"),I=G.getInstance(),A=G.itsatoolbar,J=A._getBackupCursorRef(),E=A._getActiveHeader(J),F=0,H=false,C;if(B==="none"){if(E){E.replace("<p>"+E.getHTML()+"</p>");A.headerSelectlist.set("disabled",true);}}else{if(B.length>1){F=parseInt(B.substring(1),10);}if((B.length===2)&&(B.toLowerCase().substring(0,1)==="h")&&(F>0)&&(F<10)){C=E?E:J;C.replace("<"+B+" id='"+I.guid()+"'>"+C.getHTML()+"</"+B+">");}}A.sync({sender:"itsaheading",changedNode:I.one("#itsatoolbar-ref")});d.later(250,A,A._setCursorAtRef);}});}},_defineExecCommandFontFamily:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsafontfamily){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsafontfamily:function(E,G){var C=this.get("host"),H=C.getInstance(),A=C.itsatoolbar,F,D,B;if(A._timerClearEmptyFontRef){A._timerClearEmptyFontRef.cancel();}A._clearEmptyFontRef();F=A._getBackupCursorRef();B=F.hasClass(j);if(B){F.all("span").setStyle("fontFamily","");F.all("."+i).replaceClass(i,j);F.setStyle("fontFamily",G);F.addClass(i);F.removeClass(j);A._setCursorAtRef();}else{A.execCommand("inserthtml","<span class='"+i+"' style='font-family:"+G+"'>"+b+p+"</span>");A._setCursorAtRef();d.later(30000,A,A._clearEmptyFontRef);}}});}},_defineExecCommandFontSize:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsafontsize){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsafontsize:function(D,C){var E=this.get("host"),F=E.getInstance(),B=E.itsatoolbar,G,A,I,H;if(B._timerClearEmptyFontRef){B._timerClearEmptyFontRef.cancel();}B._clearEmptyFontRef();G=B._getBackupCursorRef();H=G.hasClass(j);if(H){A=G.get("parentNode");if(d.UA.webkit){A.setStyle("lineHeight","");
}G.all("span").setStyle("fontSize","");G.all("."+l).replaceClass(l,j);G.setStyle("fontSize",C);G.addClass(l);G.removeClass(j);B._setCursorAtRef();}else{B.execCommand("inserthtml","<span class='"+l+"' style='font-size:"+C+"'>"+b+p+"</span>");B._setCursorAtRef();d.later(30000,B,B._clearEmptyFontRef);}}});}},_defineExecCommandFontColor:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsafontcolor){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsafontcolor:function(E,G){var C=this.get("host"),H=C.getInstance(),A=C.itsatoolbar,F,D,B;if(A._timerClearEmptyFontRef){A._timerClearEmptyFontRef.cancel();}A._clearEmptyFontRef();F=A._getBackupCursorRef();B=F.hasClass(j);if(B){F.all("span").setStyle("color","");F.all("."+f).replaceClass(f,j);F.setStyle("color",G);F.addClass(f);F.removeClass(j);A._setCursorAtRef();}else{A.execCommand("inserthtml","<span class='"+f+"' style='color:"+G+"'>"+b+p+"</span>");A._setCursorAtRef();d.later(30000,A,A._clearEmptyFontRef);}}});}},_defineExecCommandMarkColor:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsamarkcolor){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsamarkcolor:function(E,G){var C=this.get("host"),H=C.getInstance(),A=C.itsatoolbar,F,D,B;if(A._timerClearEmptyFontRef){A._timerClearEmptyFontRef.cancel();}A._clearEmptyFontRef();F=A._getBackupCursorRef();B=F.hasClass(j);if(B){F.all("span").setStyle("backgroundColor","");F.all("."+v).replaceClass(v,j);F.setStyle("backgroundColor",G);F.addClass(v);F.removeClass(j);A._setCursorAtRef();}else{A.execCommand("inserthtml","<span class='"+v+"' style='background-color:"+G+"'>"+b+p+"</span>");A._setCursorAtRef();d.later(30000,A,A._clearEmptyFontRef);}}});}},_defineExecCommandHyperlink:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsacreatehyperlink:function(D,C){var F=this,I=F.get("host").getInstance(),E,J,B,H,A,G,K;A=C||prompt("Enter url","http://");if(A){H=I.config.doc.createElement("div");A=A.replace(/"/g,"").replace(/'/g,"");A=I.config.doc.createTextNode(A);H.appendChild(A);A=H.innerHTML;F.get("host")._execCommand("createlink",A);B=new I.EditorSelection();E=B.getSelected();if(!B.isCollapsed&&E.size()){J=E.item(0).one("a");if(J){E.item(0).replace(J);}if(J&&d.UA.gecko){if(J.get("parentNode").test("span")){if(J.get("parentNode").one("br.yui-cursor")){J.get("parentNode").insert(J,"before");}}}}else{F.get("host").execCommand("inserthtml",'<a href="'+A+'" target="_blank">'+A+"</a>");}}return J;}});}},_defineExecCommandMaillink:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsacreatemaillink){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsacreatemaillink:function(D,C){var F=this,I=F.get("host").getInstance(),E,J,B,H,A,K,G,L;A=C||prompt("Enter email","");if(A){H=I.config.doc.createElement("div");A=A.replace(/"/g,"").replace(/'/g,"");K=A;A="mailto:"+A;A=I.config.doc.createTextNode(A);H.appendChild(A);A=H.innerHTML;F.get("host")._execCommand("createlink",A);B=new I.EditorSelection();E=B.getSelected();if(!B.isCollapsed&&E.size()){J=E.item(0).one("a");if(J){E.item(0).replace(J);}if(J&&d.UA.gecko){if(J.get("parentNode").test("span")){if(J.get("parentNode").one("br.yui-cursor")){J.get("parentNode").insert(J,"before");}}}}else{F.get("host").execCommand("inserthtml",'<a href="'+A+'">'+K+"</a>");}}return J;}});}},_defineExecCommandImage:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsacreateimage){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsacreateimage:function(D,C){var F=this,I=F.get("host").getInstance(),E,J,B,H,A,G,K;A=C||prompt("Enter link to image","http://");if(A){H=I.config.doc.createElement("div");A=A.replace(/"/g,"").replace(/'/g,"");A=I.config.doc.createTextNode(A);H.appendChild(A);A=H.innerHTML;F.get("host")._execCommand("createlink",A);B=new I.EditorSelection();E=B.getSelected();if(!B.isCollapsed&&E.size()){J=E.item(0).one("a");if(J){E.item(0).replace(J);}if(J&&d.UA.gecko){if(J.get("parentNode").test("span")){if(J.get("parentNode").one("br.yui-cursor")){J.get("parentNode").insert(J,"before");}}}}else{F.get("host").execCommand("inserthtml",'<img src="'+A+'" />');}}return J;}});}},_defineExecCommandYouTube:function(){if(!d.Plugin.ExecCommand.COMMANDS.itsacreateyoutube){d.mix(d.Plugin.ExecCommand.COMMANDS,{itsacreateyoutube:function(D,C){var F=this,I=F.get("host").getInstance(),E,J,B,H,A,G,K;A=C||prompt("Enter link to image","http://");if(A){H=I.config.doc.createElement("div");A=A.replace(/"/g,"").replace(/'/g,"");A=I.config.doc.createTextNode(A);H.appendChild(A);A=H.innerHTML;F.get("host")._execCommand("createlink",A);B=new I.EditorSelection();E=B.getSelected();if(!B.isCollapsed&&E.size()){J=E.item(0).one("a");if(J){E.item(0).replace(J);}if(J&&d.UA.gecko){if(J.get("parentNode").test("span")){if(J.get("parentNode").one("br.yui-cursor")){J.get("parentNode").insert(J,"before");}}}}else{K=A.indexOf("watch?v=");if(K!==-1){G=A.substring(A.videoitempos+8);F.get("host").execCommand("inserthtml",'<iframe width="420" height="315" src="http://www.youtube.com/embed/'+G+'" frameborder="0" allowfullscreen></iframe>');}}}return J;}});}}},{NS:"itsatoolbar",ATTRS:{paraSupport:{value:false,validator:function(A){return g.isBoolean(A);}},srcNode:{value:null,writeOnce:"initOnly",setter:function(A){return d.one(A);},validator:function(A){return d.one(A);}},btnSize:{value:2,validator:function(A){return(g.isNumber(A)&&(A>0)&&(A<4));}},headerLevels:{value:6,validator:function(A){return(g.isNumber(A)&&(A>0)&&(A<10));}},fontFamilies:{value:["Arial","Arial Black","Comic Sans MS","Courier New","Lucida Console","Tahoma","Times New Roman","Trebuchet MS","Verdana"],validator:function(A){return(g.isArray(A));}},btnFontfamily:{value:true,validator:function(A){return g.isBoolean(A);}},btnFontsize:{value:true,validator:function(A){return g.isBoolean(A);}},btnHeader:{value:true,validator:function(A){return g.isBoolean(A);}},btnBold:{value:true,validator:function(A){return g.isBoolean(A);}},btnItalic:{value:true,validator:function(A){return g.isBoolean(A);}},btnUnderline:{value:true,validator:function(A){return g.isBoolean(A);}},grpAlign:{value:true,validator:function(A){return g.isBoolean(A);
}},btnJustify:{value:true,validator:function(A){return g.isBoolean(A);}},grpSubsuper:{value:true,validator:function(A){return g.isBoolean(A);}},btnTextcolor:{value:true,validator:function(A){return g.isBoolean(A);}},btnMarkcolor:{value:true,validator:function(A){return g.isBoolean(A);}},grpIndent:{value:true,validator:function(A){return g.isBoolean(A);}},grpLists:{value:true,validator:function(A){return g.isBoolean(A);}},grpUndoredo:{value:true,validator:function(A){return g.isBoolean(A);}},btnEmail:{value:true,validator:function(A){return g.isBoolean(A);}},btnHyperlink:{value:true,validator:function(A){return g.isBoolean(A);}},btnImage:{value:false,validator:function(A){return g.isBoolean(A);}},btnVideo:{value:false,validator:function(A){return g.isBoolean(A);}},colorPallet:{value:["#111111","#2D2D2D","#434343","#5B5B5B","#737373","#8B8B8B","#A2A2A2","#B9B9B9","#000000","#D0D0D0","#E6E6E6","#FFFFFF","#BFBF00","#FFFF00","#FFFF40","#FFFF80","#FFFFBF","#525330","#898A49","#AEA945","#7F7F00","#C3BE71","#E0DCAA","#FCFAE1","#60BF00","#80FF00","#A0FF40","#C0FF80","#DFFFBF","#3B5738","#668F5A","#7F9757","#407F00","#8A9B55","#B7C296","#E6EBD5","#00BF00","#00FF80","#40FFA0","#80FFC0","#BFFFDF","#033D21","#438059","#7FA37C","#007F40","#8DAE94","#ACC6B5","#DDEBE2","#00BFBF","#00FFFF","#40FFFF","#80FFFF","#BFFFFF","#033D3D","#347D7E","#609A9F","#007F7F","#96BDC4","#B5D1D7","#E2F1F4","#0060BF","#0080FF","#40A0FF","#80C0FF","#BFDFFF","#1B2C48","#385376","#57708F","#00407F","#7792AC","#A8BED1","#DEEBF6","#0000BF","#0000FF","#4040FF","#8080FF","#BFBFFF","#212143","#373E68","#444F75","#00007F","#585E82","#8687A4","#D2D1E1","#6000BF","#8000FF","#A040FF","#C080FF","#DFBFFF","#302449","#54466F","#655A7F","#40007F","#726284","#9E8FA9","#DCD1DF","#BF00BF","#FF00FF","#FF40FF","#FF80FF","#FFBFFF","#4A234A","#794A72","#936386","#7F007F","#9D7292","#C0A0B6","#ECDAE5","#BF005F","#FF007F","#FF409F","#FF80BF","#FFBFDF","#451528","#823857","#A94A76","#7F003F","#BC6F95","#D8A5BB","#F7DDE9","#C00000","#FF0000","#FF4040","#FF8080","#FFC0C0","#441415","#82393C","#AA4D4E","#800000","#BC6E6E","#D8A3A4","#F8DDDD","#BF5F00","#FF7F00","#FF9F40","#FFBF80","#FFDFBF","#482C1B","#855A40","#B27C51","#7F3F00","#C49B71","#E1C4A8","#FDEEE0"],validator:function(A){return g.isArray(A);}}}});},"@VERSION@",{requires:["plugin","base-build","node-base","editor","event-delegate","event-custom","cssbutton","gallery-itsaselectlist"],skinnable:true});