const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorHandler = require('./middleware/errorHandler')
const postRoutes = require('./routes/post')
const app = express()

const PORT = 3000 || process.env.PORT

app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/rest-api', {
    useNewUrlParser: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + 'public')))

app.use('/api/post', postRoutes)
app.use(errorHandler)


app.listen(3000, () => {
    console.log(`App running on PORT ${PORT}`)
})