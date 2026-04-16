require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const pool = require("./db/conexion");
const productRoutes = require("./routes/productRoutes");
const commentRoutes = require("./routes/commentRoutes");
const nasaRoutes = require("./routes/nasaRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configuracion
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Imagenes
const imagesPath = path.join(__dirname, "images");
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}
console.log("Sirviendo imagenes desde:", imagesPath);
app.use("/images", express.static(imagesPath));

// Rutas 
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/nasa", nasaRoutes);

async function testDBConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await testDBConnection();
});
