const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const FactoryMasterData = require('./masterData');

// add app.use... to use req.body
app.use(express.urlencoded({ extended: false }));

// apply ejs as current view engine
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    console.log("test");
    res.render("home");
});

app.get("/departements", (req, res) => {
    fs.readFile("./database/departements.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            const instanceDepartement = data.map(departement => {
                return FactoryMasterData.create(departement);
            });
            res.render("viewDepartements", { instanceDepartement });
        }
    });
});

app.get("/positions", (req, res) => {
    fs.readFile("./database/positions.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            const instancePositions = data.map(position => {
                return FactoryMasterData.create(position);
            });
            res.render("viewPositions", { instancePositions });
        }
    });
});

app.get("/Sections", (req, res) => {
    fs.readFile("./database/sections.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            const instanceSections = data.map(section => {
                return FactoryMasterData.create(section);
            });
            res.render("viewSections", { instanceSections });
        }
    });
});

app.get("/add-masterData", (req, res) => {
    res.render("addMasterData");
});

app.get("/masterData/:id/edit-masterData", (req, res) => {
    // get id from request params (:id) and convert it to number
    let id = +req.params.id;
    fs.readFile("./departements.json", "utf-8", (err, data) => {
        if (err) {
            res.render(err);
        } else {
            data = JSON.parse(data);
            const instanceMasterData = data.filter(masterData => {
                if (masterData.id === id) {
                    return FactoryMasterData.create(masterData);
                }
            });
            // console.log(instanceMasterData[0]);
            res.render("editMasterData", { instanceMasterData });
        }
    });
});

app.post("/add-masterData", (req, res) => {
    const { code, name, type } = req.body;
    let currentDate = new Date().toLocaleString();
    let createdAt = currentDate;
    let updatedAt = currentDate;
    let parentId = 0;
    let status = "AKTIF";

    // baca file
    fs.readFile("./departements.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            // dibuat instance
            const instanceDataMaster = data.map(departement => {
                return FactoryMasterData.create(departement);
            });

            // generate id for new data master
            let id = 1;
            if (instanceDataMaster.length > 0) {
                id = instanceDataMaster[instanceDataMaster.length - 1].id + 1;
            }

            const objDataMaster = {
                id, parentId, code, name, type, status, createdAt, updatedAt
            };

            // factory, inputan menjadi instance
            const newDataMaster = FactoryMasterData.create(objDataMaster);

            // add ke arr instance
            instanceDataMaster.push(newDataMaster);

            const newData = JSON.stringify(instanceDataMaster, null, 2);

            // write file
            fs.writeFile("./departements.json", newData, "utf-8", (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect("/masterData");
                }
            });
        }
    });
});

app.post("/masterData/:id/edit-masterData", (req, res) => {
    // get id from request params (:id) and convert it to number
    let id = +req.params.id;

    fs.readFile("./departements.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            data = JSON.parse(data);
            // dibuat instance
            const instanceDataMaster = data.map(departement => {
                return FactoryMasterData.create(departement);
            });

            console.log(instanceDataMaster);

            const objDataMaster = {
                id, parentId, code, name, type, status, createdAt, updatedAt
            };

            for (let i = 0; i < instanceDataMaster.length; i++) {
                if (id === instanceDataMaster[i].id) {
                    const newDataMaster = FactoryMasterData.create(objDataMaster);
                    instanceDataMaster.splice(i, 1, newDataMaster);
                }
            }

            const newData = JSON.stringify(instanceDataMaster, null, 2);

            // write file
            fs.writeFile("./departements.json", newData, "utf-8", (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect("/masterData");
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log("Application is running on http://localhost:" + PORT);
});