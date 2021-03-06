YUI.add('gallery-itsaviewdupmodels', function (Y, NAME) {

'use strict';

/**
 * ITSAViewDupModels is an Extention to ITSAViewModellist
 *
 * Coorporates with gallery-itsaviewmodellist --> it will load this module when not already loaded
 *
 * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set.
 * See the attribute <b>modelConfig</b> for more info.
 *
 *
 * @module gallery-itsaviewdupmodels
 * @extends ITSAViewModellist
 * @uses ITSADupModelViewExtention
 * @class ITSAViewDupModels
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

Y.Base.mix(Y.ITSAViewModellist, [Y.ITSADupModelViewExtention]);

}, '@VERSION@', {"requires": ["base-base", "gallery-itsadupmodelviewextention", "gallery-itsaviewmodellist"]});
