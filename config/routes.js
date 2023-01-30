const express = require('express');
const routes = express.Router();

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
       
        let web1 = await connWeb({
            url: 'https://client.moedaz.com/v1/public/freefire/'+id,
            method: 'get'
        });
        let web = JSON.parse(web1);
        web = web["data"];
        username = web["username"];
        id = web["accountId"];
        statusLogin = web["success"];

        return res.json({username: username, statusLogin: statusLogin, id: id});
    }()


    
})


module.exports = routes
