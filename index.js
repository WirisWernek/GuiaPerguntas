const express = require("express");
const app = express();

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

// setando local dos aquivos estáticos
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(5000, () => {
    console.log("App rodando");
});