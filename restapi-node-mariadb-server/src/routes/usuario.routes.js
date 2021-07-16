const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/usuario/auth", usuarioController.auth)
router.get("/usuarios", usuarioController.list)
router.post("/usuario", usuarioController.insert)
router.get("/usuario/:id", usuarioController.edit)
router.put("/usuario", usuarioController.save)
router.delete("/usuario/:id", usuarioController.delete);

module.exports = router;
