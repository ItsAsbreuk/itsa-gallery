'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list
 * lies within the scrollview's-contentBox. This results in an ul-list with Models.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsascrollviewmodellist
 * @extends ITSAModellistViewExtention
 * @class ITSAScrollViewModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

Y.Base.mix(Y.ScrollView, [Y.ITSAModellistViewExtention]);