'use strict';

const { Router } = require('express')
const { password, google, googleCallBack  } = require('../../services/passport')
const { login } = require('./controller')

const router = new Router();

router.post('/', 
    password(),
    login)

router.get('/google', 
    google(),
    login)


module.exports = router