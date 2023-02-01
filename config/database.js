const Sequelize = require('sequelize');



//Connection database configuration
 const Connection = new Sequelize('webservice', 'webservice', 'Hacker666@', {
    host: "172.106.0.121",
    dialect: 'mysql'
}); 

/* 
componentSequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!');
}).catch(function(error){
    console.log('Falha ao se conectar:' + error);
}); */

module.exports = Connection;