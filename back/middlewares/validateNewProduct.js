const validateNewProduct = (req, res,next) => {
	try {
		const {
			Nombre,
			Categoria,
			Marca,
			Precio,
			Stock,
			Disponibilidad
		} = req.body;

		// --- VALIDACIONES ---

		if (!Nombre || Nombre.trim().length < 2) {
			return res.status(400).json({
				ok: false,
				message: "El nombre es requerido"
			});
		}

		if (!Categoria || Categoria.trim().length < 2) {
			return res.status(400).json({
				ok: false,
				message: "La categoria es requerida"
			});
		}

		if (!Marca || Marca.trim().length < 2) {
			return res.status(400).json({
				ok: false,
				message: "La marca es requerida"
			});
		}

		if (Precio === undefined || isNaN(Precio) || Number(Precio) <= 0) {
			return res.status(400).json({
				ok: false,
				message: "El precio debe ser un numero mayor a 0"
			});
		}

		if (Stock === undefined || isNaN(Stock) || Number(Stock) < 0) {
			return res.status(400).json({
				ok: false,
				message: "El stock debe ser un numero valido"
			});
		}

		if (req.file) {
			const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

			if (!allowedTypes.includes(req.file.mimetype)) {
				return res.status(400).json({
					ok: false,
					message: "Imagen no valida"
				});
			}
		}

		if (Disponibilidad === undefined || isNaN(Disponibilidad) || Number(Disponibilidad) < 0) {
			return res.status(400).json({
				ok: false,
				message: "La disponibilidad debe ser un numero valido"
			});
		}

		next();

	} catch (error) {
		console.error("Validation error:", error);
		return res.status(500).json({
			ok: false,
			message: "Error validando datos"
		});
	}
};

module.exports = { validateNewProduct };