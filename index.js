const express = require("express");
const app = express();

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    res.render("index", {
        nome: nome,
        lang: lang
    });
});

app.listen(5000, () => {
    console.log("App rodando");
});