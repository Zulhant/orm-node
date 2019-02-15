'use strict';

const Sequelize = require('sequelize')

const dbOptions = {
    mysql: 'mysql',
    sqlite: 'sqlite',
    postgres: 'postgres',
    mssql: 'mssql'
}

exports.mysqlDB =  new Sequelize('db_squilize', 'root', "zulhan", {
    dialect: dbOptions.mysql,
    // storage: 'path/to/database.sqlite' if you make sqlite
})
