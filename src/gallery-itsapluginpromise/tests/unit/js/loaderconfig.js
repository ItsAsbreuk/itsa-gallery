var itsagallerydir = (itsagalleryversion ? itsagalleryversion+'/' : ''),
    filter = (window.location.search.match(/[?&]filter=([^&]+)/) || [])[1] || 'raw',
    yuiconfig = {
        base     : loaderdomain+'/combo?yui3/'+yui3version+'/build/',
        comboBase: loaderdomain+'/combo?',
        root     : 'yui3/'+yui3version+'/build/',
        combine  : combine || true,
        filter   : filter,
        coverage : coverage,
        groups   : {
          itsagallery : {
             combine  : combine,
             base     : loaderdomain+'/combo?itsa-gallery/' + itsagallerydir + 'build/',
             comboBase: loaderdomain+'/combo?',
             root     : 'itsa-gallery/' + itsagallerydir + 'build/',
             patterns:
             {
                'gallery-itsa':      { },
                'lang/gallery-itsa': { },
                'gallerycss-itsa':   { type: 'css' }
             },
             update: function() { }
          },
          gallery : {
             combine  : combine,
             base     : loaderdomain+'/combo?yui3-gallery/'+galleryversion+'/build/',
             comboBase: loaderdomain+'/combo?',
             root     : 'yui3-gallery/'+galleryversion+'/build/',
             patterns:
             {
                'gallery-':      { },
                'lang/gallery-': { },
                'gallerycss-':   { type: 'css' }
             },
             update: function() { }
          }
       }
    };
