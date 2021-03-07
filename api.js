const express = require('express'); 
const path = require('path');
let port = 80;

var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`))
