const express = require("express")

const controller = require("../controllers/imoveisControllers")

const router = express.Router();

router.get("/all", controller.allImoveis)
router.get("/:id", controller.imoveisById)
// router.get("/title", controller.imoveisByTitle)
// router.post("/create", controller.createImovel)

module.exports = router