
Y.Widget.prototype.destroy = function(destroyAllNodes) {
    // setting _destroyAllNodes true by default
    this._destroyAllNodes = (typeof destroyAllNodes === 'boolean') ? destroyAllNodes : true;
    return Widget.superclass.destroy.apply(this);
};

/**
 * Repositions the mask in the DOM for nested modality cases.
 *
 * @method _repositionMask
 * @param {Widget} nextElem The Y.Widget instance that will be visible in the stack once the current widget is closed.
 */
 Y.WidgetModality.prototype._repositionMask = function(nextElem) {
   var currentModal = this.get('modal'),
        nextModal    = nextElem.get('modal'),
        maskNode     = this.get('maskNode'),
        bb, bbParent;
    //if this is modal and host is not modal
    if (currentModal && !nextModal) {
        //leave the mask where it is, since the host is not modal.
        maskNode.remove(true);
        this.fire(MaskHide);
    }
    //if the main widget is not modal but the host is modal, or both of them are modal
    else if ((!currentModal && nextModal) || (currentModal && nextModal)) {

        //then remove the mask off DOM, reposition it, and reinsert it into the DOM
        maskNode.remove(true);
        this.fire(MaskHide);
        bb = nextElem.get(BOUNDING_BOX);
        bbParent = bb.get('parentNode') || Y.one('body');
        bbParent.insert(maskNode, bbParent.get('firstChild'));
        this.fire(MaskShow);
    }
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
