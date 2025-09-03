const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conexión a la base de datos
// ⚠️ Acá poné los datos de tu hosting de MySQL / MariaDB / Postgres (Railway, PlanetScale, etc.)
const dbConfig = {
  host: process.env.DB_HOST || "tu-host",
  user: process.env.DB_USER || "tu-usuario",
  password: process.env.DB_PASS || "tu-password",
  database: process.env.DB_NAME || "noticias_db"
};

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Endpoint: todas las noticias
app.get("/noticias", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT id, titulo, contenido, fecha_publicacion, categoria FROM noticias ORDER BY fecha_publicacion DESC");
    await conn.end();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo noticias" });
  }
});

// 🔹 Endpoint: noticia por ID
app.get("/noticias/:id", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT * FROM noticias WHERE id = ?", [req.params.id]);
    await conn.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo noticia" });
  }
});

// 🔹 Servidor en marcha
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
