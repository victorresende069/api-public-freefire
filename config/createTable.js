const Sequelize = require('sequelize');
const database = require('./database');


const table = database.define('PublicFF',
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

table.sync({force: true});
module.exports = table;