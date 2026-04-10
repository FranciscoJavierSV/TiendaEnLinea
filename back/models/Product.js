const pool = require("../db/conexion");

const Product = {
  async create(productData) {
    const sql = `
      INSERT INTO productos 
      (Nombre, Categoria, Marca, Precio, Stock, Imagen, Descripcion, Disponibilidad, NasaId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      productData.Nombre,
      productData.Categoria,
      productData.Marca,
      productData.Precio,
      productData.Stock,
      productData.Imagen || null,
      productData.Descripcion || null,
      productData.Disponibilidad,
      productData.NasaId || null
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  async update(product_id, productData) {
    const sql = `
      UPDATE productos
      SET 
        Nombre = ?, 
        Categoria = ?, 
        Marca = ?,
        Precio = ?, 
        Stock = ?, 
        Imagen = ?, 
        Descripcion = ?, 
        Disponibilidad = ?,
        NasaId = ?
      WHERE Id = ?
    `;

    const params = [
      productData.Nombre,
      productData.Categoria,
      productData.Marca,
      productData.Precio,
      productData.Stock,
      productData.Imagen || null,
      productData.Descripcion || null,
      productData.Disponibilidad,
      productData.NasaId || null,
      product_id
    ];

    const [result] = await pool.query(sql, params);
    return result.affectedRows;
  },
  
  async getProductById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM productos WHERE Id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async getProductsByCategory(categoria) {
    const [rows] = await pool.query(
      `SELECT * FROM productos
       WHERE Categoria = ?
       ORDER BY Nombre ASC`,
      [categoria]
    );
    return rows;
  },
  
  async delete(product_id) {
    const sql = `DELETE FROM productos WHERE Id = ?`;
    const [result] = await pool.query(sql, [product_id]);
    return result.affectedRows; 
  },

  async getAllProducts() {
    const [rows] = await pool.query(`SELECT * FROM productos`);
    return rows;
  },

  async getCategories() {
    const [rows] = await pool.query(`
      SELECT DISTINCT Categoria 
      FROM productos
      WHERE Categoria IS NOT NULL AND Categoria != ''
      ORDER BY Categoria ASC
    `);

    return rows;
  }
}

module.exports = Product;