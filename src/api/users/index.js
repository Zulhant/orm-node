`use strict`;

const { Router } = require('express')
const { getAll, create, getOne, destroyPermanent  } = require('./controller')
const body = require('bodymen').middleware
const query = require('querymen').middleware
const { token } = require('../../services/passport')
const { schema } = require('./model')

const router = new Router();
const { username, fullName, email, password  } = schema

router.post('/', 
    body({ username,fullName, email, password }),
    create)

router.get('/',
    token(),
    query({ }),
    getAll)

router.get('/:id', 
    getOne)

router.put('/:id', destroyPermanent)

router.delete('/:id', 
    destroyPermanent)

module.exports = router