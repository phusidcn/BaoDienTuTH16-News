const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()

require('./config/passport')(passport)

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Express body parser
app.use(express.urlencoded({ extended: true }))

const db = require('./config/keys').mongoURI

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connect'))
    .catch(err => console.log(err))

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Listening'))