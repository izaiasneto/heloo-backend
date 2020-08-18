const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

var MONGO_URL = process.env.MONGO_URL  

var app = express();

mongoose.set('useFindAndModify', false);

// Iniciando o DB
mongoose.connect(MONGO_URL, { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})


app.use(cors());
app.options('/cupons', (req, res) => {
    res.sendStatus(204);
});
app.use(express.json())
app.use(express.urlencoded({extended: false}))

requireDir('./src/models')

// Rotas
app.use('/', require('./src/routes'))

app.listen(process.env.PORT || 3001)