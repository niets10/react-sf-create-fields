const express = require("express");
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const app = express();
const path = require('path');
const sfAuthentication = require('./utilities/sf-authentication');

const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());

app.post("/authenticate", async (req, res) => {
    let conn = await sfAuthentication.main(req.body);
    res.send( toJSON(conn.metadata) );
});

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