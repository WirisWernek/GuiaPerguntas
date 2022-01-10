const express = require("express");
const app = express();

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

// setando local dos aquivos estáticos
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(5000, () => {
    console.log("App rodando");
});