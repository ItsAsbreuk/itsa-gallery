YUI.add('gallery-itsagarbagecollector-node', function (Y, NAME) {


/**
 Your Code Goes Here
*/
var REMOVECHILD = 'removeChild',
    BOOLEAN = 'boolean';

// I think -by making removeChild to destroy its node-refs- all the nodemethods are handled (like setHTML, set('text') etc)
// but gotta search more deeper to be sure.
Y.Node.prototype[REMOVECHILD] = function(arg1, arg2, arg3) {
/*jshint expr:true */
    arg1 && arg1.destroy && arg1.destroy(true);
/*jshint expr:false */
    return this.invoke(REMOVECHILD, arg1, arg2, arg3);
};


Y.Node.prototype.remove = function(destroy) {
    var node = this._node,
        destr = (typeof destroy === BOOLEAN) ? destroy : true;

    if (node && node.parentNode) {
        node.parentNode[REMOVECHILD](node);
    }

    if (destr) {
        this.destroy();
    }

    return this;
};


Y.Node.prototype.destroy = function(recursive) {
    var UID = Y.config.doc.uniqueID ? 'uniqueID' : '_yuid',
        deep = (typeof recursive === BOOLEAN) ? recursive : true,
        instance;

    this.purge(); // TODO: only remove events add via this Node

    if (this.unplug) { // may not be a PluginHost
        this.unplug();
    }

    this.clearData();

    if (deep) {
        Y.NodeList.each(this.all('*'), function(node) {
            instance = Y_Node._instances[node[UID]];
            if (instance) {
               instance.destroy();
            } else { // purge in case added by other means
                Y.Event.purgeElement(node);
            }
        });
    }

    this._node = null;
    this._stateProxy = null;

    delete Y_Node._instances[this._yuid];
};

}, '@VERSION@', {"requires": ["yui-base"]});
