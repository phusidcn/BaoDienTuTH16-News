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
    ifvalue,
    ifnotvalue,
    paginate
} = require('./helpers/handlebars-helpers')

const app = express()

const config = require('./config/config')

require('./config/passport')(passport)

app.engine('handlebars', exphbs({
    defaultLayout: 'guest',
    helpers: {
        select: select,
        generateTime: generateTime,
        ifvalue: ifvalue,
        ifnotvalue: ifnotvalue,
        paginate: paginate
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
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/home', require('./routes/customer/index'))
app.use('/auth', require('./routes/customer/auth'))
app.use('/guests', require('./routes/customer/guests'))
app.use('/subscribers',require('./routes/customer/subscribers'))
app.use('/employee', require('./routes/employee/index'))
app.use('/employee/writers', require('./routes/employee/writers'))
app.use('/employee/editors', require('./routes/employee/editors'))
app.use('/employee/admins', require('./routes/employee/admins'))


app.listen(config.port,
    () => console.log('Listening')
)