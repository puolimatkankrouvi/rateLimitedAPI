const express = require('express')
const app = express()
const rateLimiter = require('./rateLimiter.js')

var options = {
  maxRequests: 3,
  timeWindow: 10
}

//app.set('trust proxy', true)

app.use(
  rateLimiter(options)
)

app.get('/', (req, res) => {
  res.send('Hello')
})

const PORT = '3000'

app.listen(PORT, () => {
  console.log('Server running at port %s', PORT)
})
