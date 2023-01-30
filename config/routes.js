const express = require('express');
const routes = express.Router();
const database = require('./database');
const createTable = require('./createTable');

var request = require('request');
var j = request.jar();
var request = request.defaults({ jar: j });


function connWeb(config) {
    return new Promise(resolve => {
        request(config, (error, retorno, d1) => resolve(d1))
    })
}


routes.get('/v1/public/freefire/:id', (req, res) => {

    let id = req.params.id;

    const _ = async function (){

        await database.sync();
       
        let web1 = await connWeb({
            url: 'https://client.moedaz.com/v1/public/freefire/'+id,
            method: 'get'
        });
        let web = JSON.parse(web1);
        web = web["data"];
        username = web["username"];
        id = web["accountId"];
        statusLogin = web["success"];

        await createTable.create({
            username: username,
            accountId: Number(id),
            dateCreated: Date()
        });

        return res.json({username: username, status: statusLogin, id: Number(id)});
    }()

})


module.exports = routes
