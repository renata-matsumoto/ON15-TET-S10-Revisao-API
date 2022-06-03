//dependências
const express = require("express")


//preciso da controller
const controller = require("../controllers/livroController")

//nossas rotas

const router = express.Router();


//..........path + endpoint |controller
// / livros é o  path
///biblioteca -> endpoint
router.get("/all", controller.findAllEbooks)
router.get("/", controller.findOneEbookByTitle)

router.get ("/:id", controller.findById)
router.post("/create", controller.createEbook)

module.exports = router



