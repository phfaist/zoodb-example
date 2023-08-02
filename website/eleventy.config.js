//
// Eleventy site configuration
//


const eleventyParcelPlugin = require("@kitschpatrol/eleventy-plugin-parcel");

const packageJson = require('./package.json');


Error.stackTraceLimit = 999;


module.exports = (eleventyConfig) => {

    // Watch .yml files!
    eleventyConfig.addDataExtension(
        "yml, yaml", (contents) => ({ IDidntConfigure11tyToLoadYamlFiles: true })
    );

    eleventyConfig.addWatchTarget( '../data/' );

    // building the zoo is pretty consequential, even incrementally, so don't
    // react right away but wait for a couple seconds first
    eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds

    eleventyConfig.addLayoutAlias('base_page', 'base_page.njk');

    eleventyConfig.setTemplateFormats(['html','md','njk','11ty.js']);

    eleventyConfig.addFilter("hrefUrl", function (pagePermalink) {
        if (pagePermalink == null || pagePermalink === '') {
            return '';
        }
        let hrefUrl = eleventyConfig.getFilter('url')(pagePermalink);
        if (hrefUrl.endsWith('.html')) {
            return hrefUrl.slice(0, -5);
        }
        return hrefUrl;
    });

    // eleventyConfig.addPassthroughCopy({ "stylesheets": "stylesheets" })


    const pathRewrite = (p, req) => {
        console.log(`Request ${p}`);

        let finalPath = p;
        if (/^(\/[^.]+)$/.test(p)) {
            // page requested -- rewrite path to include .html
            finalPath = `${p}.html`;
        }
        // if (finalPath === '/' || finalPath.endsWith('.html')) {
        //     touchDirsTree( [eleventy_out_dir] );
        // }
        return finalPath;
    };

    //
    // Configure Parcel.  See https://github.com/kitschpatrol/eleventy-plugin-parcel
    //
    if (!packageJson.config.skipParcelInEleventyBuild) {
        eleventyConfig.addPlugin(
            eleventyParcelPlugin,
            {
                parcelOptions: {
                    // parcel paths to include -- configered in ./package.json ->
                    entries: packageJson.config.siteLandingPaths,
                    defaultConfig: "@parcel/config-default",
                    shouldDisableCache: true,
                    shouldAutoInstall: true,
                    serveOptions: {
                        port: 3000,
                    },
                    hmrOptions: {
                        port: 3001,
                    },

                    // build only the pages/modules that were requested --- should
                    // only set to true in watch/dev mode, need to set to false
                    // otherwise.
                    shouldBuildLazily: false,

                },
                useMiddleware: true,
                middlewareOptions: {
                    pathRewrite,
                },
            },
        );
    }

    return {
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",

        dir: {
            input: 'src',
            output: '_site',

            includes: '../templates',
            layouts: '../templates/layout',
            data: '../site_data',
        },

        jsDataFileSuffix: '.11tydata',
    };
};




