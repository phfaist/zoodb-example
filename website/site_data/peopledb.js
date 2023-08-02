
module.exports = async () => {

    const { load_people_db } = await import('zoodb-example-peopledb-peobledbjs/peopledb.js');

    const peopledb = await load_people_db();

    //console.log('loaded peopledb.', { peopledb, });

    return peopledb;
};
