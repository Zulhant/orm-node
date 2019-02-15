'use strict';

const express = require('./services/express')
const router = require('./api')

const app = express(router)

app.listen(3000, () => {
    console.log("server running on port 3000")
})

module.exports = app
