'use strict';

const Sequelize = require('sequelize')
const { mysqlDB } = require('../../services/databases')
const { noImage } = require('../../config')

const userSchema = {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            min: 6
        }
    },
    fullName: {
        type: Sequelize.STRING(30),
        validate: {
            notEmpty: [true, "nama harus diisi"],
        }
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 6
        }
    },
    picture: {
        type: Sequelize.TEXT,
        defaultValue: noImage
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now())
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now())
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
}

const Users = mysqlDB.define('users', userSchema, {
    timestamps: true,
    validate: true
})


mysqlDB.sync({
    force: false,
    logging: console.log
})
.catch(err => {
    console.log(err)
})

exports.view =  ["id","username","fullName","email", "picture"]
exports.schema = userSchema
exports.Users = Users