    const express = require("express");
    const router = express.Router();
    const multer = require("multer"); 
    const path = require("path");

    const productController = require('../controllers/productController');
    const { validateNewProduct } = require('../middlewares/validateNewProduct');

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

    // Obtener categorias disponibles
    router.get("/categorias", productController.getCategories);

    // Obtener productos por categoria
    router.get("/producto/:categoria", productController.getProductsByCategory);

    // Obtener producto por ID
    router.get("/:id", productController.getProductById);

    // --- RUTAS ADMIN ---

    // Crear producto 
    router.post("/",upload.single("Imagen"),validateNewProduct,productController.createProduct);

    // Actualizar producto
    router.put("/:id",upload.single("Imagen"),validateNewProduct,productController.updateProduct);

    // Eliminar producto
    router.delete("/:id", productController.deleteProduct);

    module.exports = router;