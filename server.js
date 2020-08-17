const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

//iniciando o APP
const app = express()
app.use(express.json()) //permitir que eu envie dados para aplicação em formato de json.
app.use(cors())

// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/grcupomapi', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(3001)