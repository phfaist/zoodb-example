//
// Dump all the ZooDb data, including information about cross-references,
// citations, and graphics resources, in one big JSON file.
//

// `data` can be an object like this, but it can also be a function that returns
// an object (which may also be async) -- see the eleventy docs
const data = {
    layout: null,
    permalink: 'dat/zoodbdata.json',
};

async function render(data)
{
    const zoodb = data.zoodb;

    let db_data = await zoodb.data_dump();

    return JSON.stringify(db_data);

};

export default { data, render, };
