'use strict';

const { Users, view } = require('./model')
const { notFound, success, badRequest } = require('../../services/response')
const { generateHash } = require('../../services/passport')

exports.create = ({ bodymen: { body } }, res) => {
    body.password = generateHash(body.password)
    Users.create(body)
    .then(users => users)
    .then(success(res))
    .catch(e => e.errors.map(({ message }) => ({ err : message })))
    .then(badRequest(res, null))
}
    
exports.getAll = ({ querymen: { query, cursor  } }, res, next) => {
    Users.count({
        where: query
    })
    .then(count => Users.findAll({
        where: query,
        attributes: view,
        limit: cursor.limit,
        offset: cursor.skip
    })
    .then((users) => ({
        count,
        perpage: cursor.limit,
        rows: users
    }))
    ).then(success(res))
    .catch(next)
}

exports.getOne = ({ params }, res, next) => 
    Users.findById(params.id, {
        attributes: view
    })
    .then(notFound(res))
    .then((data) => data ? data : null)
    .then(success(res))
    .catch(next)

exports.destroyPermanent = ({ params }, res, next) => {
    Users.findById(params.id, {
        attributes: view
    })
    .then(notFound(res))
    .then(user => {
        Users.destroy({ where: { id: params.id } })
        return user
    })
    .then((user) => user)
    .then(success(res))
    .catch(next)
}