const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./config/routes');
//const createTable = require('./config/createTable');
const app = express();
const port = process.env.PORT || 3000;

//createTable;

app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extendedFalse: false }));



app.listen(port, () => {
    console.log('listening on port ' + port);
});