const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
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
        raw: true,
        order: [
            ["id", "DESC"] // ASC = Crescente || DESC = Decrescente 
        ]
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

app.post("/salvarresposta", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then((pergunta) => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [
                    ["id", "DESC"]
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
        }
    })
})

app.listen(5000, () => {
    console.log("App rodando");
});