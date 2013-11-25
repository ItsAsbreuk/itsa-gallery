
/**
 Your Code Goes Here
*/
var REMOVECHILD = 'removeChild';

// I think -by making removeChild to destroy its node-refs- all the nodemethods are handled (like setHTML, set('text') etc)
// but gotta search more deeper to be sure.
Y.Node.prototype[REMOVECHILD] = function(arg1, arg2, arg3) {
/*jshint expr:true */
    arg1 && arg1.destroy && arg1.destroy(true);
/*jshint expr:false */
    return this.invoke(REMOVECHILD, arg1, arg2, arg3);
};