const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const app = express();
// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// setando EJS como engine de renderização de HTML
app.set('view engine', 'ejs');

// setando local dos aquivos estáticos
app.use(express.static('public'))

// configurando body-parser para converter os dados do formulário em uma estrutura javascript
app.use(bodyparser.urlencoded({
    extended: false
}))

// permitindo body-parser entender json
app.use(bodyparser.json());


// Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(5000, () => {
    console.log("App rodando");
});