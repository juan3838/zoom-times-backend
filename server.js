const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Postgres con variables de entorno de Render
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false } // Render requiere SSL
});

app.use(cors());
app.use(express.json());

// Endpoint: todas las noticias
app.get("/noticias", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_noticia, titulo, subtitulo, fecha_publicacion
      FROM noticias
      WHERE estado='publicada'
      ORDER BY fecha_publicacion DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo noticias" });
  }
});

// Endpoint: una sola noticia
app.get("/noticias/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM noticias WHERE id_noticia = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo noticia" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


