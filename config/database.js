const Sequelize = require('sequelize');
const UserDB = process.env.user;
const PassDB = process.env.password;
const DBServ = process.env.database;
const HostDB = process.env.host;

//Connection database configuration
 const Connection = new Sequelize(DBServ, UserDB, PassDB, {
    host: HostDB,
    dialect: 'mysql'
}); 

/* 
componentSequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!');
}).catch(function(error){
    console.log('Falha ao se conectar:' + error);
}); */

module.exports = Connection;