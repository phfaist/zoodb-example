
import { SearchIndex } from '@phfaist/zoodbtools_search/searchindex';
import { SearchWidget } from '@phfaist/zoodbtools_search/searchwidget';
import {
    getLunrCustomOptionsAdvancedSetup
} from '@phfaist/zoodbtools_search/lunradvancedsetup';
import {
    permalinks
} from 'zoodb-example-peopledb-peobledbjs/permalinks.js';
import {
    lunrAdvancedOptions
} from './searchLunrAdvancedOptions.js';


async function setupSearch()
{
    const dom_container = window.document.getElementById('SearchWidget');

    const search_index_url = dom_container.dataset.searchIndexUrl;

    // install advanced Lunr customization options -- exact same setup must be done on
    // script that generated the index! (see searchGenerateIndex.js).  The indexLunrCustomOptions
    // will be provided to SearchIndex.load().
    const indexLunrCustomOptions = getLunrCustomOptionsAdvancedSetup(lunrAdvancedOptions);

    // download the search data
    console.log("Downloading the search data...");
    const response = await window.fetch(search_index_url);
    const search_index_data = await response.json();
    const search_index = SearchIndex.load(search_index_data, indexLunrCustomOptions);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    let initial_search_query = params.q ?? null;

    const resolve_href = (object_type, object_id, object_doc) => {
        return permalinks.object(object_type, object_id);
    };

    window.search_widget = new SearchWidget(search_index, {
        dom_container,
        initial_search_query,
        resolve_href,
        context_length: 200,
        getMathJax: () => window.MathJax,
        tippyAppearanceTheme: 'light',
    });
    
}

window.addEventListener('load', setupSearch);
