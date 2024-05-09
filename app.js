const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('<h1>Hello World from Express.js!</h1><br>This is Homepage');
});

// modified get /pokemon route, added req.query
// example : if you want to look for pokemon with fire type, hit localhost:3000/pokemon?type=fire
app.get('/pokemon', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            if (!req.query.type) {
                res.send(data);
            } else {
                data = JSON.parse(data);
                let queryData = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === req.query.type) {
                        queryData.push(data[i]);
                    }
                }
                res.send(queryData);
            }
        }
    });
});

// get data with get params /:id
app.get('/pokemon/:id', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            // console.log(data);
            data = JSON.parse(data);
            let pokemonData = {};
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === Number(req.params.id)) {
                    pokemonData = data[i];
                }
            }
            res.send(pokemonData);
        }
    });
});

app.listen(port, () => {
    console.log('Running on port:', port);
});