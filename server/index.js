const express = require("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());

app.post("/api", (req, res) => {
    console.log('REQ '+ JSON.stringify(req.body));
    res.json( { message: "Hello from server 🤘🏻" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})