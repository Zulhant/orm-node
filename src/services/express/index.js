'use strict';

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const bodymen = require('bodymen')
const querymen = require('querymen')
const passport = require('passport')

const app = (router) => {
    const app = express()

    app.use(cors({
        origin: true,
        exposedHeaders: '*'
    }))
    
    app.use(bodyParser.json({ limit: '20mb'}))
    app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
    app.use(router)
    app.use(querymen.errorHandler)
    app.use(bodymen.errorHandler)

    return app
}


module.exports = app