const express = require("express");
const router = express.Router();

const commentController = require('../controllers/commentController');

// Obtener todos los comentarios
router.get("/", commentController.getAllComments);

// Crear comentario
router.post("/", commentController.createComment);

// Eliminar comentario
router.delete("/:id", commentController.deleteComment);

module.exports = router;