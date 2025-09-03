const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a Postgres
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Necesario para Railway
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Backend de Noticias funcionando');
});

// Endpoint de noticias
app.get('/noticias', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_noticia, titulo, subtitulo, fecha_publicacion 
      FROM noticias 
      WHERE estado = 'publicada'
      ORDER BY fecha_publicacion DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener noticias:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

