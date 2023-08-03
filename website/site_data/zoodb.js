
module.exports = async () => {

    const { load_zoodb } = await import('zoodb-example-peopledb-peobledbjs/peopledb.js');

    const zoodb = await load_zoodb();

    //console.log('loaded zoodb.', { peopledb, });

    return zoodb;
};
