const express = require("express");
const router = express.Router();
const multer = require("multer"); 
const path = require("path");

const productController = require('../controllers/productController');
const { validateNewProduct } = require('../middlewares/validateMiddleware');

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); 
    },
    filename: function (req, file, cb) {
        // Nombre: timestamp + extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// --- RUTAS PUBLICAS ---

// Obtener todos los productos
router.get("/", productController.getAllProducts);

// Obtener producto por ID
router.get("/:id", productController.getProductById);

// Obtener productos por categoria
router.get("/categoria/:categoria", productController.getProductsByCategory);

// Obtener categorias disponibles
router.get("/categorias", productController.getCategories);

// --- RUTAS ADMIN ---

// Crear producto 
router.post(
	"/",
	upload.single("image"),
	validateNewProduct,
	productController.createProduct
);

// Actualizar producto
router.put(
	"/:id",
	upload.single("image"),
	productController.updateProduct
);

// Eliminar producto
router.delete("/:id", productController.deleteProduct);

module.exports = router;