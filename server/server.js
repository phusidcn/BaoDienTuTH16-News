const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello Node')
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})