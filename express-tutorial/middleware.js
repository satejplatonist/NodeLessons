const express = require('express')
const app = express()

// const myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// app.use(myLogger)

app.get('/', (req, res,next) => {
  res.send('Hello World!');
  next();
})

app.get('/users', (req, res,next) => {
  res.send('Hello user!');
})

app.listen(3000)
