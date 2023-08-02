
async function generate_search_index({ zoodb })
{
    const { SearchIndex } = await import('@phfaist/zoodb/search/searchindex');

    const zoo_flm_environment = zoodb.zoo_flm_environment;

    const search_index = SearchIndex.create(
        zoodb,
        zoodb.searchable_text_fieldset,
        {}
    );

    // comment this out to let the client build the index
    //search_index.build();

    return search_index.toJSON();
}


module.exports = { generate_search_index };
