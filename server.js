const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

var MONGO_URL = process.env.MONGO_URL  

var app = express();

app.all('*', function(req, res, next) {
    var Origin = req.get('Origin'); 
    res.header('Access-Control-Allow-Origin', Origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use(express.json())

mongoose.set('useFindAndModify', false);

// Iniciando o DB
mongoose.connect(MONGO_URL, { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(cors());

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(process.env.PORT || 3001)