//app
//server
//Controller
//Model
//Rota




//importar as dependencias
const express = require('express');
const cors = require('cors');

//criar a api
const app = express();

const livrosRotas = require("./routes/livroRotas")

//configurar a api
app.use(express.json());
app.use(cors())

//rota
//............path.....rotas
app.use("/livros/", livrosRotas)

//exporta (deixa a api disponivel para outros arquivos)
module.exports = app;