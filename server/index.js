const express = require("express");
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const app = express();
const path = require('path');

// Import internal modules
const sfAuthentication = require('./utilities/sf-authentication');
const { selectObject } = require('./utilities/select-object');

const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());

/**
 * POST METHODS
 */
app.post("/authenticate", async (req, res, next) => {

    try {

        let conn = await sfAuthentication.main(req.body);
        res.send( { error: false, body: toJSON(conn.metadata) } );
        
    } catch (error) {
        
        console.log('Error authenticating: ' + error);
        res.send( { error: true, body: error} );
        next(error);

    }
});

app.post("/selectObject", async (req, res) => {

    let availableObjects = selectObject();
    console.log('Av Objects' + JSON.stringify(availableObjects));

})

/**
 * GET METHODS
 */
app.get("/api", (req, res) => {
    res.json( { message: "Hello from server 🤘🏻" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})