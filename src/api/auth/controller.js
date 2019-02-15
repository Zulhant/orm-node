`use strict`;

const { Users } = require('../users/model')
const { notFound, success, badRequest } = require('../../services/response')
const { sign } = require('../../services/jwt')

exports.login = ({ user }, res) => {
    console.log(user)
    // console.log(id)
    // const token = sign(id)
    // res.header('authorization', `Bearer ${token}`);
    // res.status(200).jsonp({
    //     code: 200,
    //     message: 'success',
    //     payload: {
    //         token,
    //         user: {
    //             id,
    //             username,
    //             email
    //         }
    //     }
    // })
}