const express = require('express'); 

let port = 80;

var app = express();

app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname + '/../resources/index.html'));
    res.json({
        'hi': 'hello'
    })
})

app.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`))