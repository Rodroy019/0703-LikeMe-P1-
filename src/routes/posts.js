const express = require('express')
const router = express.Router()
const pool = require('../models/db')

// Obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Agregar un nuevo post
router.post('/', async (req, res) => {
  const { titulo, url, descripcion } = req.body
  try {
    await pool.query(
      'INSERT INTO posts (titulo, url, descripcion) VALUES ($1, $2, $3)',
      [titulo, url, descripcion]
    )
    res.status(201).json({ message: 'Post created' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Dar like a un post
router.put('/like/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [id])
    res.status(200).json({ message: 'Post liked' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Eliminar un post
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id])
    res.status(200).json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
