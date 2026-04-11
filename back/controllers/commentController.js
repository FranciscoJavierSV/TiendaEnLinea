const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
	try {
		const comments = await Comment.getAllComments();

		res.status(200).json({
			ok: true,
			comments
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.createComment = async (req, res) => {
	try {
        console.log("Datos recibidos para crear comentario:", req.body);
		const {
			Nombre,
			Correo,
			Asunto,
			Mensaje
		} = req.body;

		const newId = await Comment.create({
			Nombre,
            Correo,
            Asunto,
            Mensaje
		});

		res.status(201).json({
			ok: true,
			message: "Comentario creado",
			comment_id: newId
		});

	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const { id } = req.params;

		const comment = await Comment.delete(id);

		if (!comment) {
			return res.status(404).json({
				ok: false,
				message: "Comentario no encontrado"
			});
		}

		const deleted = await Comment.delete(id);

		res.status(200).json({
			ok: true,
			message: "Producto eliminado",
			product_id: id
		});

	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};