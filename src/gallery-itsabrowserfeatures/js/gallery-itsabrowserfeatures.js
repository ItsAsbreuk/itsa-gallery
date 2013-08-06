// adding featurecheck for pseudoelements
Y.Features.add('css', 'pseudo', {
    test: function () {
        var body = Y.one('body'),
            node, hasfeature;
        if (body) {
            node = Y.Node.create('<div class="itsa-pseudofeature-cont"><div class="itsa-pseudofeature"></div></div>');
            body.prepend(node);
            hasfeature = node.get('offsetWidth')>0;
        }
        return hasfeature;
    }
});