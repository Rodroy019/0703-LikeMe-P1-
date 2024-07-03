require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
  user: 'rodrigo',
  host: 'localhost',
  database: 'like_me_db',
  password: '1234',
  port: 5432
})

client.connect()
  .then(() => console.log('Conexión exitosa'))
  .catch(err => console.error('Error de conexión', err))
  .finally(() => client.end())
