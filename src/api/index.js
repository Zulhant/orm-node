'use strict'

const { Router } = require('express');

const users = require('./users')
const auth =  require('./auth')

const router = new Router()

router.use('/users', users)
router.use('/auth', auth)

module.exports = router