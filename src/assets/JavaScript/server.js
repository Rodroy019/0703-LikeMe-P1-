const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const PORT = 3000

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json())

// Ruta PUT para modificar registros
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  try {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).send('Error actualizando el post')
  }
})

// Ruta DELETE para eliminar registros
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }

    res.send('Post eliminado')
  } catch (error) {
    res.status(500).send('Error eliminando el post')
  }
})

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
