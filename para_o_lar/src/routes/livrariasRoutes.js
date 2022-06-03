const express = require("express")

const controller = require("../controllers/livrariasControllers")

const router = express.Router();

router.get("/all", controller.findAllLibrary)

router.get("/:id", controller.findLibraryById)

router.post("/create", controller.createLibrary)

router.patch("/update", controller.updateLibraryAddress)

module.exports = router