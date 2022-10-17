if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config()
} else {
    console.log('Running production config...')
}

const indexRoute = require('./routes/index')
const adminRoute = require('./routes/admin')

const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()

require('./config/passport')(passport)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true })
    .then(() => console.log(`Mongo connected`))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', indexRoute)
app.use('/app-admin', adminRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Started on ${PORT}`))