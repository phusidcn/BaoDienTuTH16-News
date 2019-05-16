const express = require('express')
const exphbs = require('express-handlebars')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const config = require('./config')
const errorHandler = require('./middleware/errorHandler')
const guestRoutes = require('./routes/guest/index')
const subscriberRoutes = require('./routes/subscriber/index')
const adminRoutes = require('./routes/admin/index')

const app = express()

app.use(cors())

app.engine('handlebars', exphbs({ defaultLayout: 'guest'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', guestRoutes)
app.use('/subscriber', subscriberRoutes)
app.use('/admin', adminRoutes)

app.use(errorHandler)

app.listen(config.port, () => {
    console.log('Listening')
})