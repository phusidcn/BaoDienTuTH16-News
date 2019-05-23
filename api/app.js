const express = require('express')
const exphbs = require('express-handlebars')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const config = require('./config')
const errorHandler = require('./middleware/errorHandler')
const guestRoutes = require('./routes/guest/index')
const subscriberRoutes = require('./routes/subscriber/index')



/*======= */
/* ADMIN */
const adminRoutes = require('./routes/admin/index')
const adminWritersRoutes = require('./routes/admin/writer')
const adminCategoryRoutes = require('./routes/admin/category')
const adminTagRoutes = require('./routes/admin/tag')

const app = express()

app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB...')
}).catch(error => {
    console.log(error)
})

app.engine('handlebars', exphbs({ defaultLayout: 'guest'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))


/* Khách vãn lai + Khách VIP */
app.use('/', guestRoutes)
app.use('/subscriber', subscriberRoutes)

/* Nhân viên + Admin */
app.use('/admin', adminRoutes)
app.use('/admin/writer', adminWritersRoutes)
app.use('/admin/category', adminCategoryRoutes)
app.use('/admin/tag', adminTagRoutes)


app.use(errorHandler)

app.listen(config.port, () => {
    console.log('Listening')
})