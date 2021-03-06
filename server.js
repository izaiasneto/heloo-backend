const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")
 

var app = express();

mongoose.set('useFindAndModify', false);

// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/helooapi', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(3001)