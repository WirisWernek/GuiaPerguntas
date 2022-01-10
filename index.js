const express = require("express");
const app = express();

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    let produtos = [{
            nome: "alface",
            preco: 1.20
        },
        {
            nome: "colve",
            preco: 2
        },
        {
            nome: "requeijão",
            preco: 5
        },
        {
            nome: "refrigerante",
            preco: 4
        }
    ]
    res.render("index", {
        nome: nome,
        lang: lang,
        msg: false,
        produtos: produtos
    });
});

app.listen(5000, () => {
    console.log("App rodando");
});