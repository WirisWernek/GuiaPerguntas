const express = require("express");
const app = express();

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(5000, () => {
    console.log("App rodando");
});