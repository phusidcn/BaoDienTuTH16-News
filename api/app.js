const express = require('express')
const exphbs = require('express-handlebars')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const mongoose = require('mongoose')
const upload = require('express-fileupload')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')


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
const adminEditorRoutes = require('./routes/admin/editor')
const adminPostRoutes = require('./routes/admin/post')

/*======= */
/* WRITER */
const writerRoutes = require('./routes/writer/index')
const writerPostRoutes = require('./routes/writer/post')

/*======= */
/* EDITOR */
const editorRoutes = require('./routes/editor/index')

const app = express()

const { select, generateTime } = require('./helpers/handlebars-helpers')

// app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB...')
}).catch(error => {
    console.log(error)
})

app.engine('handlebars', exphbs({ defaultLayout: 'guest', helpers: { select: select, generateTime: generateTime }}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(upload())
// app.use(morgan())

app.use(session({
    secret: 'lequocduyquang',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.guest = req.user
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message')
    res.locals.error = req.flash('error')
    next()
})

/* Khách vãn lai + Khách VIP */
app.use('/', guestRoutes)
app.use('/subscriber', subscriberRoutes)

/* Admin */
app.use('/admin', adminRoutes)
app.use('/admin/writer', adminWritersRoutes)
app.use('/admin/category', adminCategoryRoutes)
app.use('/admin/tag', adminTagRoutes)
app.use('/admin/editor',adminEditorRoutes)
app.use('/admin/post', adminPostRoutes)

/* Writer */
app.use('/writer', writerRoutes)
app.use('/writer/post', writerPostRoutes)

/* Editor */
app.use('/editor', editorRoutes)

app.use(errorHandler)

app.listen(config.port, () => {
    console.log('Listening')
})