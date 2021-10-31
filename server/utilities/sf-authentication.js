const jsforce = require('jsforce');

async function main(body) {

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

module.exports = { main };