const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

var MONGO_URL = process.env.MONGO_URL  || 'mongodb://localhost:27017/grcupomapi'

//iniciando o APP
const app = express()
app.use(express.json()) //permitir que eu envie dados para aplicação em formato de json.
app.use(cors())

mongoose.set('useFindAndModify', false);

// Iniciando o DB
mongoose.connect(MONGO_URL, { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

requireDir('./src/models')



// Rotas
app.use('/', require('./src/routes'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.listen(process.env.PORT || 3001)