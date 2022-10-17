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
    const { name, email, os, city } = req.body
    let errors = []
    if(!name || !email || !os) {
        errors.push({ message: 'Lütfen tüm alanları doldurun'})
    }

    if(os === '0') {
        errors.push({ message: 'Lütfen telefon işletim sisteminizi seçin'})
    }

    if(errors.length > 0) {
        res.render('form', { errors, name, email, os, city })
    } else {
        
        const newForm = new Form({ name:name, email:email,  os:os,  city:city })
        newForm.save()
            .then(form => {
                req.flash('success_msg', 'Başvurunuz için teşekkürler!')
                res.redirect('/beta')
            })
            .catch(err => console.log(err))

    }
})

module.exports = router;