const { Pool } = require('pg')

const pool = new Pool({
  user: 'rodrigo',
  host: 'localhost',
  database: 'like_me_db',
  password: '1234',
  port: 5432
})

module.exports = pool
