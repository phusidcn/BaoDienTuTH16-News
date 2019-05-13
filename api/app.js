const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const errorHandler = require('./middleware/errorHandler')
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const PORT = 3000 || process.env.PORT

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(errorHandler)

app.get('/', (req, res) => {
    res.render('guest/guestHome')
})

app.get('/category', (req, res) => {
    res.render('guest/guestCategory')
})

app.get('/post', (req, res) => {
    res.render('guest/guestPost')
})

app.listen(3000, () => {
    console.log(`App running on PORT ${PORT}`)
})