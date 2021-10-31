function selectObject(conn) {

    // let availableObjects = ['Account', 'Contact', 'Opportunity'];
    // return availableObjects;

    let types = [{type: 'CustomObject', folder: null}];
    conn.metadata.list(types, '53.0', function(err, metadata) {
        if (err) { return console.error('err', err); }
        
        metadata.map((meta) => {
            console.log('Meta ' + meta.fullName );
        });
        
    });

}

module.exports = { selectObject };