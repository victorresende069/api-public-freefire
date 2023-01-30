const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./config/routes');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
        origin: '*'
})); 

app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extendedFalse: false }));




//Roding
app.listen(port, () => {
    console.log('listening on port ' + port);
});