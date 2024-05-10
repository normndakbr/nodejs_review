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
    console.log("test");
    // baca file
    fs.readFile("./departements.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            // buat menjadi instance
            const instanceDepartement = data.map(departement => {
                return FactoryMasterData.create(departement);
            });
            // array of instance
            console.log(instanceDepartement);
            // render ke products.ejs {}
            res.render("departements", { instanceDepartement });
        }
    });
});

app.listen(PORT, () => {
    console.log("Application is running on http://localhost:" + PORT);
});