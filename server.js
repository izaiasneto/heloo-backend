const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

MONGO_URL = 'mongodb://localhost:27017/grcupomapi'

//iniciando o APP
const app = express()
app.use(express.json()) //permitir que eu envie dados para aplicação em formato de json.
app.use(cors())

// Iniciando o DB
mongoose.connect(MONGO_URL, { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(process.env.PORT || 8080, function(){
    console.log('listening on', http.address().port);
  });