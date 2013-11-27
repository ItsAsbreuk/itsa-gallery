if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/gallery-itsa-app/gallery-itsa-app.js']) {
   __coverage__['build/gallery-itsa-app/gallery-itsa-app.js'] = {"path":"build/gallery-itsa-app/gallery-itsa-app.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0},"b":{},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":28},"end":{"line":1,"column":47}}},"2":{"name":"ITSA_App","line":23,"loc":{"start":{"line":23,"column":0},"end":{"line":23,"column":20}}},"3":{"name":"(anonymous_3)","line":49,"loc":{"start":{"line":49,"column":33},"end":{"line":49,"column":44}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":73,"column":3}},"2":{"start":{"line":23,"column":0},"end":{"line":25,"column":1}},"3":{"start":{"line":24,"column":4},"end":{"line":24,"column":59}},"4":{"start":{"line":27,"column":0},"end":{"line":27,"column":27}},"5":{"start":{"line":29,"column":0},"end":{"line":42,"column":3}},"6":{"start":{"line":49,"column":0},"end":{"line":60,"column":2}},"7":{"start":{"line":50,"column":4},"end":{"line":51,"column":18}},"8":{"start":{"line":53,"column":4},"end":{"line":53,"column":38}},"9":{"start":{"line":54,"column":4},"end":{"line":54,"column":34}},"10":{"start":{"line":55,"column":4},"end":{"line":55,"column":34}},"11":{"start":{"line":56,"column":4},"end":{"line":56,"column":35}},"12":{"start":{"line":57,"column":4},"end":{"line":57,"column":29}},"13":{"start":{"line":58,"column":4},"end":{"line":58,"column":32}},"14":{"start":{"line":59,"column":4},"end":{"line":59,"column":42}}},"branchMap":{},"code":["(function () { YUI.add('gallery-itsa-app', function (Y, NAME) {","","'use strict';","","/*jshint maxlen:200 */","","/**"," *"," * View ITSAViewLogin"," *"," *"," * @module gallery-itsa-app"," * @extends App"," * @class ITSA_App"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","function ITSA_App() {","    ITSA_App.superclass.constructor.apply(this, arguments);","}","","ITSA_App.NAME = 'itsa-app';","","Y.ITSA_App = Y.extend(ITSA_App, Y.App, {}, {","    ATTRS: {","        /**","         * Whether the panel should have a statusbar (Y.ITSAStatusbar). Targeting should be done directly at the panel-instance. See gallery-itsastatusbar.","         *","         * @attribute statusBar","         * @type Y.ITSAStatusbar","         * @since 0.1","        */","        statusBar : {","            readOnly: true","        }","    }","});","","/**"," * @method initializer"," * @protected"," * @since 0.1","*/","ITSA_App.prototype.initializer = function() {","    var instance = this,","        statusbar;","","    statusbar = new Y.ITSAStatusbar();","    statusbar.handleLevel('info');","    statusbar.handleLevel('warn');","    statusbar.handleLevel('error');","    statusbar.handleStatus();","    statusbar.handleModelSync();","    instance._set('statusBar', statusbar);","};","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"app\",","        \"gallery-itsagarbagecollector-node\",","        \"gallery-itsagarbagecollector-widget\",","        \"gallery-itsaerrorreporter\",","        \"gallery-itsacurrentuser\",","        \"gallery-itsadialog\",","        \"gallery-itsastatusbar\"","    ]","});","","}());"]};
}
var __cov_5OfT27ErBrIXht$bpWOZAg = __coverage__['build/gallery-itsa-app/gallery-itsa-app.js'];
__cov_5OfT27ErBrIXht$bpWOZAg.s['1']++;YUI.add('gallery-itsa-app',function(Y,NAME){'use strict';__cov_5OfT27ErBrIXht$bpWOZAg.f['1']++;__cov_5OfT27ErBrIXht$bpWOZAg.s['2']++;function ITSA_App(){__cov_5OfT27ErBrIXht$bpWOZAg.f['2']++;__cov_5OfT27ErBrIXht$bpWOZAg.s['3']++;ITSA_App.superclass.constructor.apply(this,arguments);}__cov_5OfT27ErBrIXht$bpWOZAg.s['4']++;ITSA_App.NAME='itsa-app';__cov_5OfT27ErBrIXht$bpWOZAg.s['5']++;Y.ITSA_App=Y.extend(ITSA_App,Y.App,{},{ATTRS:{statusBar:{readOnly:true}}});__cov_5OfT27ErBrIXht$bpWOZAg.s['6']++;ITSA_App.prototype.initializer=function(){__cov_5OfT27ErBrIXht$bpWOZAg.f['3']++;__cov_5OfT27ErBrIXht$bpWOZAg.s['7']++;var instance=this,statusbar;__cov_5OfT27ErBrIXht$bpWOZAg.s['8']++;statusbar=new Y.ITSAStatusbar();__cov_5OfT27ErBrIXht$bpWOZAg.s['9']++;statusbar.handleLevel('info');__cov_5OfT27ErBrIXht$bpWOZAg.s['10']++;statusbar.handleLevel('warn');__cov_5OfT27ErBrIXht$bpWOZAg.s['11']++;statusbar.handleLevel('error');__cov_5OfT27ErBrIXht$bpWOZAg.s['12']++;statusbar.handleStatus();__cov_5OfT27ErBrIXht$bpWOZAg.s['13']++;statusbar.handleModelSync();__cov_5OfT27ErBrIXht$bpWOZAg.s['14']++;instance._set('statusBar',statusbar);};},'@VERSION@',{'requires':['yui-base','app','gallery-itsagarbagecollector-node','gallery-itsagarbagecollector-widget','gallery-itsaerrorreporter','gallery-itsacurrentuser','gallery-itsadialog','gallery-itsastatusbar']});