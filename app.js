const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const FactoryMasterData = require('./masterData');

app.set("view engine", "ejs");

app.get('/about', (req, res) => {
    res.render("home");
});

app.get("/departements", (req, res) => {
    // baca file
    fs.readFile("./departements.json", "utf-8", (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            const instanceDepartement = data.map( departement => {
                return FactoryMasterData.create(departement);
            })

            console.log(instanceDepartement);
            // buat menjadi instance
            // array of instance
            // render ke products.ejs {}
            // res.render("products");
        }
    });
    // buat menjadi instance, array of instance, render ke departements.ejs
    res.render("departements");
});

app.listen(PORT, () => {
    console.log("Application is running on http://localhost:" + PORT);
});