YUI.add("gallery-itsaerrorreporter",function(e,t){"use strict";function l(){}var n="error",r="warn",i="javascript "+n,s="boolean",o="undefined ",u=o+n,a=o+r+"ing",f;e.Global.ITSAErrorReporter||(e.mix(l.prototype,{_handleWindowError:function(t,n,r){var s=this;s._reportWindowErrors&&e.showError(i,t+"<br /><br />"+n+" (line "+r+")")},reportErrorEvents:function(t){var r=this,i=typeof t===s?t:!0;i&&!r._reportErrorEvents?r._reportErrorEvents=e.after(["*:"+n],function(t){var n=t.err||t.error||t.msg||t.message||u,r=t.src||t.source;n=n.toString(),e.showError(r,n)}):!i&&r._reportErrorEvents&&(r._reportErrorEvents.detach(),r._reportErrorEvents=null)},reportWarnEvents:function(t){var n=this,i=typeof t===s?t:!0;i&&!n._reportWarnEvents?n._reportWarnEvents=e.after(["*:"+r],function(t){var n=t.warn||t.warning||t.msg||t.message||a,r=t.src||t.source;e.showWarning(r,n)}):!i&&n._reportWarnEvents&&(n._reportWarnEvents.detach(),n._reportWarnEvents=null)},reportErrorLogs:function(t){var r=this,i=typeof t===s?t:!0;i&&!r._reportErrorLogs?r._reportErrorLogs=e.on("yui:log",function(t){var r=t.msg||u,i=t.cat,s=t.src;i===n&&e.showError(s,r)}):!i&&r._reportErrorLogs&&(r._reportErrorLogs.detach(),r._reportErrorLogs=null)},reportWarnLogs:function(t){var n=this,i=typeof t===s?t:!0;i&&!n._reportWarnLogs?n._reportWarnLogs=e.on("yui:log",function(t){var n=t.msg||a,i=t.cat,s=t.src;i===r&&e.showWarning(s,n)}):!i&&n._reportWarnLogs&&(n._reportWarnLogs.detach(),n._reportWarnLogs=null)},reportWindowErrors:function(e){var t=typeof e===s?e:!0;this._reportWindowErrors=t}}),f=e.Global.ITSAErrorReporter=new l,window.onerror=e.bind(f._handleWindowError,f),f.reportWindowErrors(),f.reportErrorLogs(),f.reportErrorEvents(),f.reportWarnEvents(),f.reportWarnLogs()),e.ITSAErrorReporter=e.Global.ITSAErrorReporter},"@VERSION@",{requires:["yui-base","event-base","event-custom-base","gallery-itsadialog"]});
