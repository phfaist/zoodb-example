//
// Eleventy site configuration
//
import path from 'path';

import eleventyParcelPlugin from "@kitschpatrol/eleventy-plugin-parcel";

import packageJson from './package.json' with { type: 'json' };

//
// Import our custom package to handle the ZooDB
//
import { load_zoodb } from 'zoodb-example-peopledb-peobledbjs/myzoodb.js';


// Use __dirname. *Requires Node >= 20.11 / 21.2* .
// If you need to support older versions of Node, copy the three lines of code given
// in https://stackoverflow.com/a/50052194/1694896
const __dirname = import.meta.dirname;



Error.stackTraceLimit = 999;

const data_dir = path.join(__dirname, '../data/');

export default async function (eleventyConfig)
{
    // Watch .yml files!
    eleventyConfig.addDataExtension(
        "yml, yaml", (contents) => ({ IDidntConfigure11tyToLoadYamlFiles: true })
    );
    eleventyConfig.addWatchTarget( '../data/' );

    // Load and build the zoo, and include it in the 11ty structure as global data.
    // The callback will be executed again on subsequent builds in dev mode.
    eleventyConfig.addGlobalData("zoodb", async () => {
        return await load_zoodb({ data_dir });
    });
    
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

    //
    // Configure Parcel.  See https://github.com/kitschpatrol/eleventy-plugin-parcel
    //
    if (!packageJson.config.skipParcelInEleventyBuild) {

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


