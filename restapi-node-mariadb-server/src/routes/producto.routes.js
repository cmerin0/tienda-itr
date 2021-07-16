const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/productos", productoController.list)
router.post("/producto", productoController.insert)
router.get("/producto/:id", productoController.edit)
router.put("/producto", productoController.save)
router.delete("/producto/:id", productoController.delete);
router.get("/productos/buscar/:field", productoController.search)

module.exports = router;
