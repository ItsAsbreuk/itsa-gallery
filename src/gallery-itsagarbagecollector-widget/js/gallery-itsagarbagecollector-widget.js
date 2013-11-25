
Y.Widget.prototype.destroy = function(destroyAllNodes) {
    // setting _destroyAllNodes true by default
    this._destroyAllNodes = (typeof destroyAllNodes === 'boolean') ? destroyAllNodes : true;
    return Widget.superclass.destroy.apply(this);
};

/**
 * Returns the mask if it exists on the page - otherwise creates a mask. There's only
 * one mask on a page at a given time.
 * <p>
 * This method in invoked internally by the getter of the maskNode ATTR.
 * </p>
 * @method _GET_MASK
 * @static
 */
WidgetModal._GET_MASK = function() {

    var mask = this._mask || Y.one('.' + MODAL_CLASSES.mask),
        win  = Y.one('win');
    if (mask) {
        return mask;
    }

    mask = this._mask = Y.Node.create('<div></div>').addClass(MODAL_CLASSES.mask);

    if (supportsPosFixed) {
        mask.setStyles({
            position: 'fixed',
            width   : '100%',
            height  : '100%',
            top     : '0',
            left    : '0',
            display : 'block'
        });
    } else {
        mask.setStyles({
            position: 'absolute',
            width   : win.get('winWidth') +'px',
            height  : win.get('winHeight') + 'px',
            top     : '0',
            left    : '0',
            display : 'block'
        });
    }

    return mask;
};
