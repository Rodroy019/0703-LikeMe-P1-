require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

client.connect()
  .then(() => console.log('Conexión exitosa'))
  .catch(err => console.error('Error de conexión', err))
  .finally(() => client.end())
