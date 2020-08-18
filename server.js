const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const requireDir = require("require-dir")

var MONGO_URL = process.env.MONGO_URL  

var app = express();
app.use(express.json())

// CORS
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type, Accept, X-Access-Token, X-Key"
    );
    if ("OPTIONS" == req.method) res.status(200).end();
    else next();
});

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