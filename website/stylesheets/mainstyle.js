//
// This file collects the main style definitions for the site.
//

// The reason this file is a JS file and not a CSS/SCSS file with @import's is
// that Parcel appears to have some trouble importing tippy's stylesheets (via
// the module imports below) through CSS @import's.  But those same imports in
// JS appear to work well.


//
// our main style SCSS definitions
//
import './main.scss';

//
// The stylesheets that were dynamically generated during 11ty site generation
//
import '/dynamic_style/flm.css';

//
// styling the search widget popup -- you can replace this by your own custom
// stylesheet if you want to provide a fancier style
//
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
