const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

var MONGO_URL = process.env.MONGO_URL  || 'mongodb://localhost:27017/grcupomapi'

//iniciando o APP
const app = express()
app.use(express.json()) //permitir que eu envie dados para aplicação em formato de json.
app.use(cors())

// Iniciando o DB
mongoose.connect('mongodb+srv://izaiasneto:ZBXh3VyqvqORG9RI@cluster0.2nldu.mongodb.net/<dbname>?retryWrites=true&w=majority', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(process.env.PORT || 3001)