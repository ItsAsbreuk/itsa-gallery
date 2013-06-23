YUI.add("gallery-itsafilemanager",function(e,t){"use strict";var n=e.Lang,r=e.Array,i=e.JSON,s=e.UA.ie,o="\0",u="upload files",a="An error occured during processing",f=[{text:"all files",returnValue:"*"},{text:"images",returnValue:"jpg,jpeg,gif,bmp,tif,tiff,png"},{text:"non-images",returnValue:"!,jpg,jpeg,gif,bmp,tif,tiff,png"},{text:"txt",returnValue:"txt"},{text:"word",returnValue:"doc,docx"},{text:"excel",returnValue:"xls,xlsx"},{text:"powerpoint",returnValue:"ppt,pptx"},{text:"pdf",returnValue:"pdf"}],l=["list","thumbnails","tree","coverflow"],c=["duplicate file","rename file","delete file","clone dir","rename dir","delete dir"],h='<% if (data.filename.isFileType(["jpg","jpeg","gif","bmp","tif","tiff","png"])) { %><img src="<%= data.thumbnail %>" /><% } else { %><div class="itsa-thumbnail"><div class="itsa-fileicon <%= data.filename.extractFileExtension() %>"></div><span class="file-label"><%= data.filename %></span></div><% } %>',p="<td><%= data.filename %></td><td><%= data.size %></td><% if (data.width && data.height && (data.width>0) && (data.height>0)) { %><td><%= data.modified %></td><td><%= data.width %>x<%= data.height %></td><% } else { %><td colspan=2><%= data.modified %></td><% } %>",d="yui3-treeview-notouch",v="yui3-treeview-selected",m="<div></div>",g='<button class="pure-button pure-button-toolbar" type="button">{text}</button>',y='<button class="pure-button pure-button-toolbar" type="button">{text}</button>',b='<div class="pure-button pure-uploadbutton"></div>',w="Filemanager",E="ready",S="yui3-itsafilemanager",x=S+"-hidden",T=S+"-extendloading",N=S+"-list-files",C=S+"-title",k=S+"-toolbar",L=S+"-hidden",A=S+"-border",O=S+"-shadow",M=S+"-itsaresehandlerx",_=S+"-itsaresehandlery",D=S+"-tree",P=S+"-disk",H=S+"-roottreeview",B="yui3-treeview-node",j="yui3-treeview-row",F=S+"-treeview",I=S+"-main",q=S+"-flow",R=S+"-items",U='<div class="'+C+'">{title}</div><div class="'+k+'"></div>',z="<div class='"+D+"'>"+"<div class='"+H+" "+B+" "+x+"'>"+"<div class='"+j+"'><div class='"+P+"'></div>{root}</div>"+"</div>"+"<div class='"+F+"'></div>"+"</div>"+"<div class='"+I+"'>"+"<div class='"+q+"'></div>"+"<div class='"+R+"'></div>"+"</div>",W="error",X=function(e){return parseInt(e,10)},V=function(e){if(typeof e=="string")try{return i.parse(e)}catch(t){return this.fire(W,{error:t,response:e,src:"parse"}),null}return e};String.prototype.extractFileExtension=function(){return this.match(/.+\.(\w+)$/)[1]},String.prototype.isFileType=function(e){return r.indexOf(e,this.extractFileExtension())!==-1},e.Tree.Node.prototype.getTreeInfo=function(e){var t=this,n=t.isRoot()?"/":"/"+t[e],r=t.parent;while(r&&!r.isRoot())n="/"+r[e]+n,r=r.parent;return n},e.SortableTreeView=e.Base.create("sortableTreeView",e.TreeView,[e.TreeView.Sortable],{sortComparator:function(e){return(e.canHaveChildren?o:"")+e.label},getByFileName:function(e,t){var n;return r.some(e.children,function(e){return!e.canHaveChildren&&e.label===t&&(n=e),n}),n},directoryIsLoaded:function(e){var t=this;return!t.hasPlugin("lazy")||e.state.loaded||e===t.rootNode}}),e.LazyFileModelList=e.Base.create("lazyfile-model-list",e.LazyModelList,[],{getByFileName:function(e){var t=this,n;return t.some(function(t){return t.filename===e&&(n=t),n}),n}}),e.ITSAFileManager=e.Base.create("itsafilemanager",e.Panel,[],{initializer:function(){var t=this,n=t.get("boundingBox");s>0&&s<9&&e.ITSAErrorReporter.reportErrorLogs(!1),t._inlineblock="inline"+(s>0&&s<8?"":"-block"),t._eventhandlers=[],t._resizeApprovedX=!1,t._resizeApprovedY=!1,t._busyResize=!1,t._borderTreeArea=0,t._halfBorderTreeArea=0,t._borderFlowArea=0,t._halfBorderFlowArea=0,t._mouseOffset=0,t._currentDir="/",t._bodyNode=e.one("body"),t.publish(W,{preventable:!1,broadcast:1}),t._createPromises(),n.addClass(T),t.initialized()},initialized:function(){var e=this,t=e.get("boundingBox");return e._isInitialized||(e._isInitialized=(e.get("delayView")?e.dataPromise:e.readyPromise).then(function(){e._setConstraints(!0),e._correctHeightAfterResize(),t.removeClass(T)})),e._isInitialized},bindUI:function(){var e=this,t=e._eventhandlers,r=e.get("boundingBox"),i=e.get("contentBox"),s;e.set("headerContent",n.sub(U,{title:e.get("title")})),e.set("bodyContent",n.sub(z,{root:"root"})),e.set("footerContent",E),e._panelHD=i.one(".yui3-widget-hd"),s=e._panelBD=i.one(".yui3-widget-bd"),e._panelFT=i.one(".yui3-widget-ft"),e.get("statusBar")||e._panelFT.setStyle("display","none"),t.push(s.on(["mousemove","touchstart"],e._checkResizeAprovement,e)),t.push(s.on("mouseleave",e._checkEndResizeApprovement,e)),t.push(s.on(["mousedown","touchstart"],e._startResize,e)),t.push(e._bodyNode.on(["mouseup","mouseleave","touchend"],e._stopResize,e)),t.push(e.on("sortableTreeView:select",e._loadFilePane,e)),e.get("visible")||r.addClass(L),t.push(e.after("visibleChange",function(e){r.toggleClass(L,!e.newVal)}))},getCurrentDir:function(){return this._currentDir},getCurrentDirTreeNode:function(){return this._currentDirTreeNode},getSelectedFiles:function(){var e=this,t=e.filescrollview.getSelectedModels(),n=[];return r.each(t,function(e){n.push(e.filename)}),n},hideFlow:function(){this.set("flow",!1)},hideTree:function(){this.set("tree",!1)},showFlow:function(){this.set("flow",!0)},showTree:function(){this.set("tree",!0)},sync:function(){return new e.Promise(function(e,t){t(new Error("The sync()-method was not overridden"))})},destructor:function(){var e=this;e._resizeEvent&&e._resizeEvent.detach(),e._clearEventhandlers(),e.files.destroy(),e.filescrollview.destroy(),e.tree.destroy()},_createPromises:function(){var t=this;t._resizeConstrainPromise=new e.Promise(function(n){t.renderPromise().then(function(){t.hasPlugin("resize")?t.resize.hasPlugin("con")?(t.resize.con.set("preserveRatio",!1),n()):e.use("resize-constrain",function(){t.resize.plug(e.Plugin.ResizeConstrained,{preserveRatio:!1}),n()}):n()})}),t.readyPromise=new e.Promise(function(n){t.renderPromise().then(e.rbind(t._afterRender,t)).then(e.rbind(t._allWidgetsRenderedPromise,t)).then
(n)}),t.dataPromise=new e.Promise(function(n){t._createMethods(),t.readyPromise.then(function(){return e.batch(t.loadFiles(),t.get("lazyRender")?t.loadTreeLazy():t.loadTree())}).then(n)})},_allWidgetsRenderedPromise:function(){var t=this,n=[];return n.push(t._resizeConstrainPromise),n.push(t.filterSelect.renderPromise()),n.push(t.editSelect.renderPromise()),t.get("uploadURL")&&e.Uploader.TYPE!=="none"&&n.push(t.uploader.renderPromise()),n.push(t.filescrollview.renderPromise()),e.batch.apply(e,n)},_afterRender:function(){var e=this,t=e._eventhandlers,n=e.get("boundingBox"),r,i,s,o;e._nodeFilemanToolbar=n.one("."+k),e._nodeFilemanTree=r=n.one("."+D),e._nodeFilemanTreeRoot=r.one("."+H),e._nodeFilemanTreeView=r.one("."+F),e._nodeFilemanFlow=i=n.one("."+q),e._nodeFilemanItems=n.one("."+R),e._borderTreeArea=s=X(r.getStyle("borderRightWidth")),e._borderFlowArea=o=X(i.getStyle("borderBottomWidth")),e._halfBorderTreeArea=Math.round(s/2),e._halfBorderFlowArea=Math.round(o/2),e.set("sizeTreeArea",e.get("sizeTreeArea")),e.set("sizeFlowArea",e.get("sizeFlowArea")),e.hasPlugin("dd")&&e.dd.addHandle("."+C),e.hasPlugin("resize")&&(t.push(e.resize.on("resize:resize",e._correctHeightAfterResize,e)),t.push(e.resize.on("resize:end",function(){e._correctHeightAfterResize(),e.filescrollview.syncUI()}))),e._renderTree(),e._selectRootNode(!0),e._renderFiles(),e._createDDFiles(),e._renderToolbar()},_createDDFiles:function(){},_renderFiles:function(){var t=this,n,r,i;t.files=n=new e.LazyFileModelList,n.comparator=function(e){return e.filename||""},r=h,t.filescrollview=i=new e.ITSAScrollViewModellist({boundingBox:t._nodeFilemanItems,modelTemplate:r,axis:"y",modelListStyled:!1,showLoadMessage:!1,modelsSelectable:"multi",modelList:n}),i.addTarget(t),i.render()},_renderViewSelect:function(){var t=this,n=t.get("boundingBox"),r=t.filescrollview,i,s;s=t.viewSelect=new e.ITSASelectList({items:l,selectionOnButton:!1,defaultButtonText:"view",btnSize:1,buttonWidth:60}),s.after("selectChange",function(e){var t=e.index;switch(t){case 0:r.setWithoutRerender("listType","table"),r.set("modelTemplate",p),n.addClass(N),r.syncUI();break;case 1:r.setWithoutRerender("listType","ul"),r.set("modelTemplate",h),n.removeClass(N),r.syncUI()}}),i=e.Node.create(m),t._nodeFilemanToolbar.append(i),s.render(i)},_renderToolbar:function(){var t=this,r=t._eventhandlers,i=t.filescrollview,s,o,u,a,l,h,p,d;o=t.filterSelect=new e.ITSASelectList({items:f,defaultItem:f[0].text,btnSize:1,buttonWidth:60}),o.after("selectChange",function(e){var n=e.value.split(","),r=n[0]==="!";r&&n.splice(0,1),t.filescrollview.set("viewFilter",function(e){var t;return n[0]==="*"?!0:(t=e.filename&&e.filename.isFileType(n),r?!t:t)}),i.syncUI()}),a=e.Node.create(m),t._nodeFilemanToolbar.append(a),o.render(a),u=t.editSelect=new e.ITSASelectList({items:c,selectionOnButton:!1,defaultButtonText:"edit",btnSize:1,buttonWidth:60}),u.after("selectChange",function(n){var r=n.index,i=t.filescrollview,s;switch(r){case 0:h=i.getSelectedModels(),p=h&&h.length>1,d=h&&h[0].filename,e.confirm("Duplicate file"+(p?"s":" "+d),"Are you sure you want to duplicate the selected file"+(p?"s":"")+"?").then(function(){t.copyFiles(t._currentDir)});break;case 1:h=i.getSelectedModels(),p=h&&h.length>1,d=h&&h[0].filename,e.prompt("Rename file"+(p?"s":" "+d),"Enter new filename:",{value:d}).then(function(n){t.renameFiles(e.Escape.html(n.value))});break;case 2:h=i.getSelectedModels(),p=h&&h.length>1,d=h&&h[0].filename,e.confirm("Delete file"+(p?"s":" "+d),"Are you sure you want to delete "+(p?"the selected files":d)+"?").then(function(){t.deleteFiles()});break;case 3:s=t._currentDirTreeNode.label,e.prompt("Duplicate directory "+s,"Enter the directoryname of the duplicated directory:",{value:s+"-copy"}).then(function(n){t.cloneDir(e.Escape.html(n.value))});break;case 4:s=t._currentDirTreeNode.label,e.prompt("Rename directory "+s,"Enter new directoryname:",{value:s}).then(function(n){t.renameDir(e.Escape.html(n.value))});break;case 5:s=t._currentDirTreeNode.label,e.confirm("Delete directory","Are you sure you want to delete '"+s+"'<br />and all of its content?").then(function(){t.deleteDir()})}}),l=e.Node.create(m),t._nodeFilemanToolbar.append(l),u.render(l),s=e.Node.create(n.sub(g,{text:"create dir"})),r.push(s.on("click",function(){var n=t._currentDirTreeNode.label;e.prompt("Create sub-directory of "+n,"Enter new directory-name:",{value:"New Directory"}).then(function(n){t.createDir(e.Escape.html(n.value))})})),t._nodeFilemanToolbar.append(s),t._createUploader()},_createUploader:function(){var t=this,i=t.get("uploadURL"),s=t._eventhandlers,o,a,f,l,c;i&&(a=e.Uploader.TYPE,a==="flash"&&(l=e.Node.create("<div class='block-button'></div>"),t._nodeFilemanToolbar.append(l)),e.Uploader.TYPE!=="none"?(t._installFlashNode&&t._installFlashNode.remove(!0),o=e.Node.create(b),t._nodeFilemanToolbar.append(o),f=t.uploader=new e.Uploader({enabled:t.get("uploaderEnabled"),errorAction:t.get("uploaderErrorAction"),fileFieldName:t.get("uploaderFileFieldName"),uploadHeaders:t.get("uploadHeaders"),uploadURL:i,withCredentials:t.get("withHTML5Credentials"),swfURL:t.get("swfURL")+"?t="+Math.random(),width:"80px",height:"25px",appendNewFiles:!1,multipleFiles:!0,buttonClassNames:{hover:"pure-button-hover",active:"pure-button",disabled:"pure-button-disabled",focus:"pure-button"},selectButtonLabel:u}),f.after("fileselect",function(n){var i=n.fileList,s={};i.length>0&&(l&&(l.addClass("blocked"),o.addClass("pure-button-disabled")),f.set("enabled",!1),r.each(i,function(n){n.currentDirTreeNode=t._currentDirTreeNode,s[n.get("id")]=e.merge(t.get("uploaderPostVars"),{currentDir:t._currentDir,filename:n.get("name")})}),f.set("postVarsPerFile",s),f.uploadAll())}),f.on("uploadcomplete",function(e){var n=V(e.data),r=n.error,i=n.results,s=t.tree,o=t.get("showTreefiles"),u=e.file.currentDirTreeNode;r?t._handleSyncError(r&&r.description,"Upload "+e.file.get("name")):(t.files.add(i),o&&u&&s.directoryIsLoaded(u)&&s.insertNode(u,{label:i.filename}))}),
f.on("alluploadscomplete",function(){l&&(l.removeClass("blocked"),o.removeClass("pure-button-disabled")),f.set("enabled",!0)}),f.render(o)):(c=t._installFlashNode=e.Node.create(n.sub(y,{text:"x"+u})),t._nodeFilemanToolbar.append(c),s.push(c.on("click",function(){e.alert("Flash player",'The most recent version of Adobe Flash player should be installed if you want to upload files.<br /><br /><a href="http://get.adobe.com/flashplayer" target="_blank">install flashplayer now</a>').then(function(){t._redetectFlash(),e.SWFDetect.isFlashVersionAtLeast(10,0,45)&&(e.Uploader=e.UploaderFlash,e.Uploader.TYPE="flash",t._createUploader())})}))))},_redetectFlash:function(){function l(e){n.isNumber(X(e[0]))&&(r.flashMajor=e[0]),n.isNumber(X(e[1]))&&(r.flashMinor=e[1]),n.isNumber(X(e[2]))&&(r.flashRev=e[2])}var t=0,r=e.UA,i="ShockwaveFlash",s,o,u,a,f;if(r.gecko||r.webkit||r.opera){if(s=navigator.mimeTypes["application/x-shockwave-flash"])if(o=s.enabledPlugin)u=o.description.replace(/\s[rd]/g,".").replace(/[A-Za-z\s]+/g,"").split("."),l(u)}else if(r.ie){try{a=new ActiveXObject(i+"."+i+".6"),a.AllowScriptAccess="always"}catch(c){a!==null&&(t=6)}if(t===0)try{f=new ActiveXObject(i+"."+i),u=f.GetVariable("$version").replace(/[A-Za-z\s]+/g,"").split(","),l(u)}catch(h){}}},_renderTree:function(){var t=this,n=t._nodeFilemanTreeRoot,r=t._eventhandlers,i,s;s=t.get("lazyRender"),t.tree=i=new e.SortableTreeView({container:t._nodeFilemanTreeView,lazyRender:s,multiSelect:!1}),i.addTarget(t),i.render(),t._nodeFilemanTreeView.hasClass(d)&&t._nodeFilemanTreeRoot.addClass(d),s&&e.use("tree-lazy",function(){i.plug(e.Plugin.Tree.Lazy,{load:function(e,n){t.loadTreeLazy(e).then(function(){n()},function(e){n(new Error(e))})}})}),i.after("sortableTreeView:select",function(){n.removeAttribute("tabIndex"),n.removeClass(v),t.filescrollview.clearSelectedModels(null,!0)}),r.push(n.on("click",e.bind(t._selectRootNode,t,!1)))},_selectRootNode:function(e){var t=this;t.initialized().then(function(){var n=t.tree,i=t._nodeFilemanTreeRoot;i.set("tabIndex",0),i.addClass(v),i.focus(),t._currentDir="/",t._currentDirTreeNode=n.rootNode,e||t.loadFiles(),r.each(n.getSelectedNodes(),function(e){e.unselect()})})},_checkEndResizeApprovement:function(){var e=this;(e._resizeApprovedX||e._resizeApprovedY)&&!e._busyResize&&e._endResizeApprovement()},_checkResizeAprovement:function(t){if(!this._busyResize){var n=this,r=n._panelBD,i=n._nodeFilemanFlow,s=t.pageX,o=t.pageY,u=r.getX(),a=r.getY(),f=n.get("contentBox"),l=n.get("tree"),c=n.get("flow"),h=i.get("offsetHeight"),p=e.UA.mobile?n.get("resizeMarginTouchDevice"):n.get("resizeMargin"),d=Math.round(p/2),v=Math.abs(s-u+n._halfBorderTreeArea),m=Math.abs(o-(a+h-n._halfBorderFlowArea));n._resizeApprovedX=l&&v<=d,n._resizeApprovedY=c&&m<=d&&(!l||s>u+d),f.toggleClass(M,n._resizeApprovedX),f.toggleClass(_,n._resizeApprovedY)}},_clearEventhandlers:function(){var e=this;r.each(e._eventhandlers,function(e){e.detach()})},_correctHeightAfterResize:function(){var e=this,t=e._panelHD,n=e._panelFT,r=e._nodeFilemanItems,i=t?t.get("offsetHeight"):0,s=n?n.get("offsetHeight"):0,o=X(e.get("boundingBox").getStyle("height"))-i-s,u=o-e.get("sizeFlowArea");e._panelBD.setStyle("height",o+"px"),r&&r.setStyle("height",u+"px")},_createMethods:function(){var t=this;r.each(["loadFiles","loadMoreFiles","loadTree","loadTreeLazy","renameFiles","renameDir","deleteFiles","deleteDir","createDir","moveDir","moveFiles","cloneDir","copyFiles"],function(n){t[n]=function(r){var s={},o=t.filescrollview;return t.get("rendered")||t.render(),n==="loadFiles"?s.currentDir=t._currentDir||"/":n==="loadAppendFiles"?(s.currentDir=t._currentDir,s.batchSize=t.get("batchSize"),s.size=t.files.size(),s.lastFileId=t._lastFileId):n==="loadTree"?s.showTreefiles=t.get("showTreefiles"):n==="loadTreeLazy"?(s.showTreefiles=t.get("showTreefiles"),s.directory=r?r.getTreeInfo("label")+"/":"/"):n==="renameFiles"?(s.currentDir=t._currentDir,s._currentDirTreeNode=t._currentDirTreeNode,s.selectedFiles=i.stringify(t.getSelectedFiles()),s.newFileName=r,r=t._currentDirTreeNode,o.clearSelectedModels(null,!0)):n==="renameDir"?(s.currentDir=t._currentDir,s.newDirName=r):n==="deleteFiles"?(s.selectedFiles=i.stringify(t.getSelectedFiles()),s.currentDir=t._currentDir,r=t._currentDirTreeNode,o.clearSelectedModels(null,!0)):n==="deleteDir"?(s.currentDir=t._currentDir,r=t._currentDirTreeNode):n==="createDir"?(s.currentDir=t._currentDir,s.dirName=r,r=t._currentDirTreeNode):n==="moveDir"?(s.currentDir=t._currentDir,s.newParentDir=r):n==="moveFiles"?(s.currentDir=t._currentDir,s._currentDirTreeNode=t._currentDirTreeNode,s.selectedFiles=i.stringify(t.getSelectedFiles()),s.destinationDir=r):n==="cloneDir"?(s.currentDir=t._currentDir,s.clonedDirName=r):n==="copyFiles"&&(s.selectedFiles=i.stringify(t.getSelectedFiles()),s.currentDir=t._currentDir,s.destinationDir=r,r=t._currentDirTreeNode,o.clearSelectedModels(null,!0)),t.readyPromise.then(e.bind(t.sync,t,n,s)).then(e.rbind(t._handleSync,t,n,s,r),e.rbind(t._handleSyncError,t,n,s))}})},_handleSyncError:function(e,t,n){var r=this,i;return i={options:n,error:e,src:t},r.fire(W,i),e},_handleSync:function(e,t,n,i){var s=this,o=V(e),u=o.error,f=s.tree,l=s.get("lazyRender"),c=s.get("showTreefiles"),h=s.files,p,d,v,m,g,y,b,w,E;return u?s._handleSyncError(u.description||a,t,n):(p={response:e,options:n},s["_"+t]||(s["_"+t]=s.publish(t,{preventable:!1})),t==="loadFiles"?s.files.reset(o):t==="loadTreeLazy"&&l?(s._rootVisible||(s._rootVisible=s._nodeFilemanTreeRoot.removeClass(x)),f.insertNode(i,o)):t==="renameFiles"?(g=o.results,g&&g.length>0&&(E=i,r.each(g,function(e){var t=e.prevfilename,n=e.filename,r=e.modified,i=e.thumbnail,s=e.preview;c&&E&&(d=f.getByFileName(E,t),d.label=n),y=h.getByFileName(t),r&&h.setModelAttr(y,"modified",r,{silent:!0}),i&&h.setModelAttr(y,"thumbnail",i,{silent:!0}),s&&h.setModelAttr(y,"preview",s,{silent:!0}),h.setModelAttr(y,"filename",n)}),c&&E&&E.sort())):t==="renameDir"?(d=s._currentDirTreeNode,d.label=n.newDirName,d.parent
.sort(),s._currentDir=d.getTreeInfo("label")+"/"):t==="deleteFiles"?(w=o.results,w&&w.length>0&&(E=i,r.each(w,function(e){c&&E&&f.directoryIsLoaded(E)&&(d=f.getByFileName(E,e),f.removeNode(d,{remove:!0,silent:!1})),y=h.getByFileName(e),b=h.revive(y),b.destroy({remove:!1})}),c&&E&&E.sort())):t==="deleteDir"?(d=i,m=d.parent,f.removeNode(d,{destroy:!0}),m===f.rootNode?s._selectRootNode():f.selectNode(m)):t==="createDir"?(d=i,f.directoryIsLoaded(d)&&(v=o.results,f.insertNode(d,{label:v,canHaveChildren:!0})),f.openNode(d)):t==="copyFiles"?(g=o.results,s.files.add(g),d=i,c&&r.each(g,function(e){f.insertNode(d,{label:e.filename})})):t==="loadTree"&&!l&&(s._rootVisible||(s._rootVisible=s._nodeFilemanTreeRoot.removeClass(x)),f.insertNode(f.rootNode,o)),s.fire(t,p),e)},_endResizeApprovement:function(){var e=this,t=e.get("contentBox");e._resizeApprovedX=!1,e._resizeApprovedY=!1,t.toggleClass(M,!1),t.toggleClass(_,!1)},_loadFilePane:function(e){var t=this,n=e.node;n.canHaveChildren&&(t._currentDir=n.getTreeInfo("label")+"/",t._currentDirTreeNode=n,t.loadFiles())},_resizeTree:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanTree,r=n.getX(),i=Math.round(e.pageX-r-t._mouseOffset);t.set("sizeTreeArea",i)}},_resizeFlow:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanFlow,r=n.getY(),i=Math.round(e.pageY-r-t._mouseOffset);t.set("sizeFlowArea",i)}},_setConstraints:function(e){e&&(this._constraintsSetable=!0);if(this._constraintsSetable){var t=this,n=t.resize&&t.resize.con,r=t._panelHD,i=t._panelFT,s=r?r.get("offsetHeight"):0,o=i?i.get("offsetHeight"):0,u=(t.get("tree")?Math.max(t.get("sizeTreeArea"),t._borderTreeArea):0)+t.get("minWidthFileArea"),a=(t.get("flow")?Math.max(t.get("sizeFlowArea"),t._borderFlowArea):0)+t.get("minHeightFileArea")+s+o,f=t.get("boundingBox");n&&(n.set("minWidth",u),n.set("minHeight",a)),X(f.getStyle("width"))<u&&(f.setStyle("width",u+"px"),t.set("sizeTreeArea",t.get("sizeTreeArea"))),X(f.getStyle("height"))<a&&(f.setStyle("height",a+"px"),t._panelBD.setStyle("height",a-s-o+"px"),t.set("sizeFlowArea",t.get("sizeFlowArea")))}},_setShowTreefiles:function(){},_setSizeFlowArea:function(e,t,n){var r=this,i=r._borderFlowArea,s=r._nodeFilemanFlow,o=n?0:Math.max(r.get("minSizeFlowArea")-i,0),u=r._panelBD.get("offsetHeight")-r.get("minHeightFileArea")-i,a=Math.max(e-i,o);return a=Math.min(a,u),s&&(s.setStyle("height",a+"px"),r.resize&&r.resize.hasPlugin("con")&&r._setConstraints()),a},_setSizeTreeArea:function(e,t,n){var r=this,i=r._nodeFilemanTree,s=r._borderTreeArea,o=n?0:Math.max(r.get("minSizeTreeArea"),s),u=r.get("contentBox").get("offsetWidth")-r.get("minWidthFileArea"),a=Math.max(e,o),f;return a=Math.min(a,u),f=a-s,i.setStyle("width",f+"px"),i.setStyle("marginLeft",-a+"px"),r._panelBD.setStyle("marginLeft",a+"px"),r.resize&&r.resize.hasPlugin("con")&&r._setConstraints(),a},_startResize:function(e){var t=this,n=t._nodeFilemanTree,r=t._nodeFilemanFlow,i,s,o,u;t._resizeApprovedX?(t._busyResize=!0,i=n.getX(),o=n.get("offsetWidth"),t._mouseOffset=e.pageX-(i+o),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeTree,t)):t._resizeApprovedY&&(t._busyResize=!0,s=r.getY(),u=r.get("offsetHeight"),t._mouseOffset=e.pageY-(s+u),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeFlow,t))},_stopResize:function(){var e=this;e._busyResize&&(e._busyResize=!1,e._resizeEvent&&e._resizeEvent.detach())}},{ATTRS:{batchSize:{value:500,validator:function(e){return typeof e=="number"&&e>0}},border:{value:!0,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:function(e){this.get("boundingBox").toggleClass(A,e)}},delayView:{value:!1,validator:function(e){return typeof e=="boolean"}},tree:{value:!0,validator:function(e){return typeof e=="boolean"},setter:function(e){var t=this;t._nodeFilemanTree&&(t._nodeFilemanTree.setStyle("display",e?t._inlineblock:"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints(),t._setSizeTreeArea(e?t.get("sizeTreeArea"):0,null,!0))},getter:function(){return this._nodeFilemanTree&&this._nodeFilemanTree.getStyle("display")!=="none"}},flow:{value:!1,validator:function(e){return typeof e=="boolean"},setter:function(e){var t=this;t._nodeFilemanFlow&&(t._nodeFilemanFlow.setStyle("display",e?"block":"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints(),t._setSizeFlowArea(e?t.get("sizeFlowArea"):0,null,!0))},getter:function(){return this._nodeFilemanFlow&&this._nodeFilemanFlow.getStyle("display")!=="none"}},lazyRender:{value:!1,writeOnce:"initOnly",validator:function(e){return typeof e=="boolean"}},showTreefiles:{value:!1,validator:function(e){return typeof e=="boolean"},setter:"_setShowTreefiles"},sizeTreeArea:{value:200,validator:function(e){return typeof e=="number"},setter:"_setSizeTreeArea"},sizeFlowArea:{value:150,validator:function(e){return typeof e=="number"},setter:"_setSizeFlowArea"},minSizeTreeArea:{value:100,validator:function(e){return typeof e=="number"&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minSizeFlowArea:{value:100,validator:function(e){return typeof e=="number"&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minWidthFileArea:{value:200,validator:function(e){return typeof e=="number"&&e>=50},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minHeightFileArea:{value:100,validator:function(e){return typeof e=="number"&&e>=50},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},title:{value:w,validator:function(e){return typeof e=="string"},setter:function(e){this.set("headerContent",e)}},resizeMargin:{value:6,validator:function(e){return n.isNumber(e)&&e>=2&&e<=60}},resizeMarginTouchDevice:{value:32,validator:function(e){return typeof e=="number"&&e>=2&&e<=60}},statusBar:{value:!0,validator:function(e){return typeof e=="boolean"},setter:function(
e){var t=this;t._panelFT&&(t._panelFT.setStyle("display",e?"":"none"),t._correctHeightAfterResize())}},shadow:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:function(e){this.get("boundingBox").toggleClass(O,e)}},uploaderEnabled:{value:!0},uploaderErrorAction:{value:e.Uploader.Queue.CONTINUE},uploaderFileFieldName:{value:"filedata"},uploaderPostVars:{value:{}},uploadHeaders:{value:{}},uploadURL:{value:null},swfURL:{value:"http://yui.yahooapis.com/3.10.3/build/uploader/assets/flashuploader.swf"},withHTML5Credentials:{value:!1}}})},"@VERSION@",{requires:["base-build","panel","event","event-custom","event-touch","node-base","node-screen","node-event-delegate","pluginhost-base","lazy-model-list","promise","json","uploader","gallery-sm-treeview","gallery-sm-treeview-sortable","gallery-itsaerrorreporter","gallery-itsadialog","gallery-itsascrollviewmodellist","gallery-itsawidgetrenderpromise","gallery-itsaselectlist"],skinnable:!0});
