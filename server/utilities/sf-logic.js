const jsforce = require('jsforce');

let conn;

async function sfAuthentication(body) {

    const { username, password, token, environment } = body;

    let url = environment === 'sf-production' ? 'https://login.salesforce.com/' : 'https://test.salesforce.com/';

    try {
        conn = new jsforce.Connection({ loginUrl: url });

        await conn.login(username, password + token);

        console.log("Logged in correctly!");

        return conn;

    } catch (error) {
        throw error;
    }
}

async function getAvailableObjects() {

    let objectNames = [];

    let types = [{type: 'CustomObject', folder: null}];
    await conn.metadata.list(types, '53.0', function(err, metadata) {
        if (err) { return console.error('err', err); }
        
        objectNames = metadata.map((meta) => {
            
            return meta.fullName;
        });
        
    });

    return objectNames;

}

module.exports = { sfAuthentication, getAvailableObjects };