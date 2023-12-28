
async function generate_search_index({ zoodb })
{
    const { SearchIndex } = await import('@phfaist/zoodbtools_search/searchindex');

    const { getLunrCustomOptionsAdvancedSetup } =
        await import('@phfaist/zoodbtools_search/lunradvancedsetup');

    const { lunrAdvancedOptions } = await import('./searchLunrAdvancedOptions.js');

    const zoo_flm_environment = zoodb.zoo_flm_environment;

    const search_index = SearchIndex.create(
        zoodb,
        zoodb.searchable_text_fieldset,
        {}
    );

    // install advanced Lunr customization options -- exact same setup must be done on
    // client script! (see setupSearch.js)
    const indexLunrCustomOptions = getLunrCustomOptionsAdvancedSetup(lunrAdvancedOptions);
    search_index.install_lunr_customization(indexLunrCustomOptions);

    // comment this out to let the client build the index
    //search_index.build();

    return search_index.toJSON();
}


module.exports = { generate_search_index };
