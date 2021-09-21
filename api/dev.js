const app = require('./app')
const port = 9000

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
