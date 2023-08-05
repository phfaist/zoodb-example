//
// Dump all the ZooDb data, including information about cross-references,
// citations, and graphics resources, in one big JSON file.
//

const data = {
    layout: null,
    permalink: 'dat/zoodbdata.json',
};

const render = async (data) => {

    const zoodb = data.zoodb;

    let db_data = await zoodb.data_dump();

    return JSON.stringify(db_data);

};

module.exports = { data, render, };
