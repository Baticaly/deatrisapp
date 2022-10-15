const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/templogin', (req, res) => {
    res.render('login')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})

module.exports = router;