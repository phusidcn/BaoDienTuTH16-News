const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const upload = require('express-fileupload')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const {
    select,
    generateTime,
    ifvalue
} = require('./helpers/handlebars-helpers')

const app = express()

const config = require('./config/config')

require('./config/passport')(passport)

app.engine('handlebars', exphbs({
    defaultLayout: 'guest',
    helpers: {
        select: select,
        generateTime: generateTime,
        ifvalue: ifvalue
    }
}))
app.set('view engine', 'handlebars')

// Express body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(upload())
app.use(morgan('dev'))

mongoose.Promise = global.Promise
mongoose.connect(config.db.development,
    {
        useNewUrlParser: true
    })
    .then(
        () => console.log('MongoDB connect')
    )
    .catch(
        err => console.log(err)
    )

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.errors = req.flash('error')
    next()
})

// Routes
// caching disabled for every route
// app.use(function (req, res, next) {
//     if (!req.user)
//         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     next();
// });

app.use('/guests', require('./routes/guest/guests'))
app.use('/subscribers',require('./routes/subscriber/subscriber'))
app.use('/employee', require('./routes/employee/index'))
app.use('/employee/writers', require('./routes/employee/writers'))
app.use('/employee/editors', require('./routes/employee/editors'))
app.use('/employee/admins', require('./routes/employee/admins'))

app.use('/', require('./routes/guest/index'))

app.listen(config.port,
    () => console.log('Listening')
)