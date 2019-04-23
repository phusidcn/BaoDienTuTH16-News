// Server.js

// Set up =================================================== 

const express       = require('express')
const exphbs        = require('express-handlebars')
const mongoose      = require('mongoose')
const passport      = require('passport')
const flash         = require('connect-flash')


const morgan        = require('morgan')
const cookieParser  = require('cookie-parser')
const bodyParser    = require('body-parser')
const session       = require('express-session')

const app   = express()
const PORT  = process.env.PORT || 3000

const configDB = require('./config/database')

// Configuration =============================================
mongoose.connect(configDB.url, {
    useNewUrlParser: true
}) 
.then(() => {
    console.log('Connect to MongoDB Atlas')
})
.catch(err => {
    console.log(err)
    throw err
})

// require('./config/passport')(passport) // pass passport for configuration


// Set up Express application
app.use(morgan('dev')) // log every requests to the console
app.use(cookieParser()) // read cookies (need for auth)
app.use(bodyParser())
app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))   
app.set('view engine', 'handlebars')    // set up handlebars for templating

// required for passport
app.use(session({
    secret: 'baodientunews'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) // flash messages

// routes ====================================================
require('./app/routes')(app, passport)

// Running server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})