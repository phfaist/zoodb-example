import { SearchIndex } from '@phfaist/zoodbtools_search/searchindex';

import {
    getLunrCustomOptionsAdvancedSetup
} from '@phfaist/zoodbtools_search/lunradvancedsetup';

import {
    lunrAdvancedOptions
} from './searchLunrAdvancedOptions.js';


export async function generate_search_index({ zoodb })
{
    //const zoo_flm_environment = zoodb.zoo_flm_environment;

    const search_index = SearchIndex.create(
        zoodb,
        zoodb.searchable_text_fieldset,
        {}
    );

    // install advanced Lunr customization options -- exact same setup must be done on
    // client script! (see setupSearch.js)
    const indexLunrCustomOptions = getLunrCustomOptionsAdvancedSetup(lunrAdvancedOptions);
    search_index.install_lunr_customization(indexLunrCustomOptions);

    // We can either pre-build the index and serve the prebuilt index to the client, or
    // let clients build the index each time they want to perform a search.  After some
    // playing around, it looks like the resulting prebuilt index is pretty large whereas
    // it can be build pretty quickly by the client.
    //
    // Uncomment the following line to prebuild the index, or leave it commented out to
    // let the client build the index when they want to perform a search.
    //search_index.build();

    return search_index.toJSON();
}
