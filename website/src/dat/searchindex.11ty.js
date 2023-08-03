const data = {
    layout: null,
    permalink: 'dat/searchindex.json',
};

const render = async (data) => {

    const { generate_search_index } =
          await import('../../javascripts/searchGenerateIndex.js');

    const search_index_data = await generate_search_index({ zoodb: data.zoodb });

    return JSON.stringify(search_index_data);
};

module.exports = { data, render, };
