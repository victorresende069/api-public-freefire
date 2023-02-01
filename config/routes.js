const express = require('express');
const routes = express.Router();
const database = require('./database');
//const createTable = require('./createTable');

var request = require('request');
var j = request.jar();
var request = request.defaults({ jar: j });

function connWeb(config) {
    return new Promise(resolve => {
        request(config, (error, retorno, d1) => resolve(d1))
    })
}

routes.get('/v1/public/freefire/:id', (req, res) => {

    //Start Async System Player Login
    var idPlayerFF = req.params.id;

    /*Aplication API Public Moedaz Async */
    const _ = async function (){
        statusLogin=false; 
        await database.sync(); //Sync Database

        databaseVerifyRow = await database.query(`SELECT accountId FROM PublicFFs WHERE accountId = ${idPlayerFF}`, (err,rows) => {
                if(err) throw err;
                console.log(rows);
            });
        
        if(databaseVerifyRow[0].length <= 0){ 

            var web1 = await connWeb({
                url: 'https://client.moedaz.com/v1/public/freefire/'+idPlayerFF,
                method: 'get'
            });

            var web = JSON.parse(web1);
            var web2 = web["data"];
            var statusLogin = web2["success"];

            if(statusLogin){
                var username = web2['username'];
                var accountId = web2['accountId']; 
                await database.query('INSERT INTO `PublicFFs` (`username`, `accountId`) VALUES ("'+username+'", '+accountId+');', (err,rows) => {
                    if(err) throw err;
                    console.log(rows);
                  });
            }
        }

        else{
            var databaseSelectRow = await database.query(`SELECT * FROM PublicFFs WHERE accountId = ${idPlayerFF}`, (err,rows) => {
                if(err) throw err;
                console.log(rows);
              });
                var databaseSelectRows = databaseSelectRow[0][0];
                var username = databaseSelectRows['username']
                var accountId = databaseSelectRows['accountId']
                statusLogin=true; 
        }

    
        return res.json({status: statusLogin, username: username, accountId: accountId});
    }()
    //End Async System Player Login

})


module.exports = routes
