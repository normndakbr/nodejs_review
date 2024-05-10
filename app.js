const express = require('express');
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.get('/about', (req, res) => {
    res.render("home");
});

app.listen(PORT, () => {
    console.log("Application is running on http://localhost:" + PORT);
});