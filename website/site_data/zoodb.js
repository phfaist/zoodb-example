
module.exports = async () => {

    const { load_zoodb } = await import('zoodb-example-peopledb-peobledbjs/myzoodb.js');

    const zoodb = await load_zoodb();

    return zoodb;
};
