const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

const imoveisRoutes = require("./routes/imoveisRoutes")

app.use("/imoveis/", imoveisRoutes)

module.exports = app;   