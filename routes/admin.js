const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')
const { checkNotAuthenticated } = require('../config/auth')
const passport = require('passport')

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})
/*
router.post('/register', checkNotAuthenticated, (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    if(!name || !email || !password || !password2) {
        errors.push({ message: 'Please fill in all the fields'})
    }
    if(password !== password2) {
        errors.push({ message: 'Password do not match'})
    }
    if(password.length < 5) {
        errors.push({ message: 'Password should be at least 5 characters'})
    }

    if(errors.length > 0) {
        res.render('register', { errors, name, email, password, password2 })
    } else {
        
        Admin.findOne({ email: email })
            .then(admin => {
                if(admin) {
                    errors.push({ message: "Email is already registered" })
                    res.render('register', { errors, name, email, password, password2 })
                } else {
                    const newAdmin = new Admin({ name, email, password })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                            if(err) throw err
                            newAdmin.password = hash
                            newAdmin.save()
                                .then(admin => {
                                    req.flash('success_msg', 'Successfully registered')
                                    res.redirect('/app-admin/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })

    }
})
*/
router.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/app-admin/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        req.flash('success_msg', 'Logged out')
        res.redirect('/app-admin/login')
    });
})

module.exports = router;