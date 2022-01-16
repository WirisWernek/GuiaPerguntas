const express = require("express");
const bodyparser = require("body-parser");
const app = express();

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

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("Formulário Recebido! titulo " + titulo + " Descrição: " + descricao);
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(5000, () => {
    console.log("App rodando");
});