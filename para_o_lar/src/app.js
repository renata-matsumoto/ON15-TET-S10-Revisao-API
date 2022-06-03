const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

const livrariasRotas = require("./routes/livrariasRoutes")

app.use("/livrarias/", livrariasRotas)


module.exports = app;   