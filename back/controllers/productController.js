const Product = require('../models/Product');

exports.getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.getProductById(id);

		if (!product) {
			return res.status(404).json({
				ok: false,
				message: "Producto no encontrado"
			});
		}

		res.status(200).json({ ok: true, product });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.getCategories = async (req, res) => {
	try {
		const rows = await Product.getCategories();
		const categories = rows.map(row => row.Categoria);

		res.status(200).json({
			ok: true,
			categories
		});
	} catch (error) {
		console.error("Error obteniendo categorias:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.getProductsByCategory = async (req, res) => {
	try {
		const { categoria } = req.params;
		const products = await Product.getProductsByCategory(categoria);

		res.status(200).json({
			ok: true,
			products
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.createProduct = async (req, res) => {
	try {
		const {
			Nombre,
			Categoria,
			Marca,
			Precio,
			Stock,
			Descripcion,
			Disponibilidad,
			NasaId
		} = req.body;

		let Imagen = null;

		if (req.file) {
			Imagen = `${req.file.filename}`;
		}

		const newId = await Product.create({
			Nombre,
			Categoria,
			Marca,
			Precio,
			Stock,
			Imagen,
			Descripcion,
			Disponibilidad,
			NasaId
		});

		res.status(201).json({
			ok: true,
			message: "Producto creado",
			product_id: newId
		});

	} catch (error) {
		console.error("ERROR REAL:", error);
		res.status(500).json({
			ok: false,
			message: error.message
		});
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const existing = await Product.getProductById(id);
    
		if (!existing) {
			return res.status(404).json({
				ok: false,
				message: "Producto no encontrado"
			});
		}

		const {
			Nombre,
			Categoria,
			Marca,
			Precio,
			Stock,
			Descripcion,
			Disponibilidad,
			NasaId
		} = req.body;

		let Imagen = existing.Imagen;

		if (req.file) {
			const baseUrl = `${req.protocol}://${req.get('host')}`;
			Imagen = `${baseUrl}/images/${req.file.filename}`;
		}

		const updated = await Product.update(id, {
			Nombre,
			Categoria,
			Marca,
			Precio,
			Stock,
			Imagen,
			Descripcion,
			Disponibilidad,
			NasaId
		});

		if (updated === 0) {
			return res.status(400).json({
				ok: false,
				message: "No se pudo actualizar"
			});
		}

		res.status(200).json({
			ok: true,
			message: "Producto actualizado"
		});

	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.getProductById(id);

		if (!product) {
			return res.status(404).json({
				ok: false,
				message: "Producto no encontrado"
			});
		}

		const deleted = await Product.delete(id);

		if (deleted === 0) {
			return res.status(400).json({
				ok: false,
				message: "No se pudo eliminar"
			});
		}

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

exports.getAllProducts = async (req, res) => {
	try {
		const page = Math.max(1, parseInt(req.query.page, 10) || 1);
		const limit = Math.max(1, parseInt(req.query.limit, 10) || 8);

		const [products, total] = await Promise.all([
			Product.getAllProducts(page, limit),
			Product.countAllProducts(),
		]);

		const totalPages = Math.max(1, Math.ceil(total / limit));

		res.status(200).json({
			ok: true,
			products,
			page,
			limit,
			total,
			totalPages
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			ok: false,
			message: "Error interno"
		});
	}
};