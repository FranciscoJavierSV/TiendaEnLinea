const pool = require("../db/conexion");

const Comment = {
    async getAllComments() {
        const [rows] = await pool.query(`SELECT * FROM mensajes`);
        return rows;
    },

    async create(commentData) {
        const sql = `
          INSERT INTO mensajes 
          (Nombre, Correo, Asunto, Mensaje)
          VALUES (?, ?, ?, ?)
        `;

    const params = [
        commentData.Nombre,
        commentData.Correo,
        commentData.Asunto,
        commentData.Mensaje
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

    async delete(comment_id) {
        const sql = `DELETE FROM mensajes WHERE Id = ?`;
        const [result] = await pool.query(sql, [comment_id]);
        return result.affectedRows; 
  }
}

module.exports = Comment;