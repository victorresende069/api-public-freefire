const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extendedFalse: false }));
app.use(cors());
app.use(express.json());




app.get('/v1/public/freefire/:id', (req, res) => {
    return res.json({status: 200});
})


app.listen(port, () => {
    console.log('listening on port ' + port);
});