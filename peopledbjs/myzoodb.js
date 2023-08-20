import fs from 'fs';

import loMerge from 'lodash/merge.js';


import { ZooDb, ZooDbDataLoaderHandler } from '@phfaist/zoodb';

import { use_relations_populator } from '@phfaist/zoodb/std/use_relations_populator';
import { use_gitlastmodified_processor } from '@phfaist/zoodb/std/use_gitlastmodified_processor';
import { use_flm_environment } from '@phfaist/zoodb/std/use_flm_environment';
import { use_flm_processor } from '@phfaist/zoodb/std/use_flm_processor';
import { use_searchable_text_processor } from '@phfaist/zoodb/std/use_searchable_text_processor';

import { makeStandardZooDb } from '@phfaist/zoodb/std/stdzoodb';
import { makeStandardYamlDbDataLoader } from '@phfaist/zoodb/std/stdyamldbdataloader';




// support __filename & __dirname here
import path from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const example_root_dir = path.resolve(__dirname, '..');


// -------------------------------------

const csl_filename = path.join(__dirname, 'american-physical-society-et-al--patched.csl');


// -----------------------------------------------------------------------------


// import the permalinks
import { permalinks } from './permalinks.js';


// -----------------------------------------------------------------------------


export class MyZooDb extends ZooDb
{
    constructor(config)
    {
        super(config);
    }

    //
    // simple example of ZooDb validation -- check that spouses always report
    // the other spouse as their spouse
    //
    async validate()
    {
        for (const [person_id, person] of Object.entries(this.objects.person)) {
            if (person.relations != null && person.relations.spouse != null) {
                // remember, person.relations.spouse is the ID of the spouse
                // person, not the person object itself
                const other_person = this.objects.person[person.relations.spouse];
                if (other_person?.relations?.spouse !== person_id) {
                    throw new Error(
                        `Person ‘${person_id}’ lists ‘${person.relations.spouse}’ as their `
                        + `spouse but not the other way around`
                    );
                }
            }
        }
    }

}



export async function createMyZooDb(config = {}, { schema_root }={})
{
    schema_root ??= example_root_dir;

    config = loMerge(
        {
            ZooDbClass: MyZooDb,

            fs: fs,
            fs_data_dir: path.join(example_root_dir, 'data'),

            use_relations_populator,
            use_gitlastmodified_processor,
            use_flm_environment,
            use_flm_processor,
            use_searchable_text_processor,

            flm_options: {

                refs:  {
                    person: {
                        formatted_ref_flm_text_fn: (person_id, person) => person.name,
                    },
                },

                citations: {
                    csl_style: fs.readFileSync( csl_filename, { encoding: 'utf-8', }, ),
                    override_arxiv_dois_file:
                        'citations_info/override_arxiv_dois.yml',
                    preset_bibliography_files: [
                        'citations_info/bib_preset.yml',
                    ],
                    default_user_agent: null,
                },
                
                resources: {
                    // "null" means to use defaults
                    rename_figure_template: null,
                    figure_filename_extensions: null,
                    graphics_resources_fs_data_dir: null,
                    
                    // enable srcset= attributes on <img> tags.  This requires
                    // postprocessing the site files with ParcelJS, as we indeed
                    // do in this example setup.
                    graphics_use_srcset_parceljs: {
                        enabled: true,
                        image_max_zoom_factor: 2,
                    }
                },

            },

            searchable_text_options: {
                object_types: ['person',]  // which DB object types to search
            },

            zoo_permalinks: permalinks,

            //
            // specify where to find schemas
            //
            schemas: {
                schema_root: schema_root,
                schema_rel_path: 'schemas/',
                schema_add_extension: '.yml',
            },
            // The SchemaLoader will automatically load all files in the
            // folder if the schema_root is a filesystem path.  Otherwise,
            // specify a list of schema names to load here:
            //schema_names: [ 'person', ]

        },
        config
    );

    return await makeStandardZooDb(config);
}






// -----------------------------------------------------------------------------



export async function createMyYamlDbDataLoader(zoodb)
{
    let config = {
        //
        // specify objects & where to find them
        //
        objects: {
            person: {
                schema_name: 'person',
                data_src_path: 'people/',
            },
        },

    }

    return await makeStandardYamlDbDataLoader(zoodb, config);
}




// -----------------------------------------------------------------------------

export async function load_zoodb()
{
    const zoodb = await createMyZooDb();
    const loader = await createMyYamlDbDataLoader(zoodb);

    const loader_handler = new ZooDbDataLoaderHandler(
        loader,
        {
            throw_reload_errors: false, // for when in devel mode with eleventy
        }
    );
    zoodb.install_zoo_loader_handler(loader_handler);

    await zoodb.load();

    return zoodb;
}
