const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const Form = require('../models/Form')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/beta', (req, res) => {
    res.render('form')
})

router.post('/beta', (req, res) => {
    const { name, email, os } = req.body
    let errors = []
    if(!name || !email || !os) {
        errors.push({ message: 'Please fill in all the fields'})
    }

    if(os === '0') {
        errors.push({ message: 'Please choose preferred OS'})
    }

    if(errors.length > 0) {
        res.render('form', { errors, name, email, os })
    } else {
        
        const newForm = new Form({ name:name, email:email,  os:os })
        newForm.save()
            .then(form => {
                req.flash('success_msg', 'Successfully registered!')
                res.redirect('/beta')
            })
            .catch(err => console.log(err))

    }
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})


module.exports = router;