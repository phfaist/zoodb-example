import {
    generate_search_index
} from '../../javascripts/searchGenerateIndex.js';


// `data` can be an object like this, but it can also be a function that returns
// an object (which may also be async) -- see the eleventy docs
const data = {
    layout: null,
    permalink: 'dat/searchindex.json',
};

async function render(data)
{
    const search_index_data = await generate_search_index({ zoodb: data.zoodb });

    return JSON.stringify(search_index_data);
};

export default { data, render, };
