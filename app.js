const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const FactoryMasterData = require('./masterData');

// add app.use... to use req.body
app.use(express.urlencoded({ extended: false }));

// apply ejs as current view engine
app.set("view engine", "ejs");

app.get('/about', (req, res) => {
    res.render("home");
});

app.get("/masterData", (req, res) => {
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

app.get("/add-masterData", (req, res) => {
    res.render("addMasterData");
});

app.post("/add-masterData", (req, res) => {
    
});

app.listen(PORT, () => {
    console.log("Application is running on http://localhost:" + PORT);
});