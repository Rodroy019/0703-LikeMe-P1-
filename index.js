const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const postsRoutes = require('./src/routes/posts')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postsRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
