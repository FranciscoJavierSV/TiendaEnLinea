    const express = require("express");
    const router = express.Router();
    const multer = require("multer"); 
    const path = require("path");
const fs = require("fs");

const productController = require('../controllers/productController');
const { validateNewProduct } = require('../middlewares/validateNewProduct');

const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
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