const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('<h1>Hello World from Express.js!</h1><br>This is Homepage');
});

app.get('/pokemon', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.send(data);
        }
    });
});

// get data with get params /:id
app.get('/pokemon/:id', (req, res) => {
    console.log("req params = ", req.params);
});

app.listen(port, () => {
    console.log('Running on port:', port);
});