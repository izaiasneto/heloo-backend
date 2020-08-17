const express = require('express')
const routes = express.Router()

const CupomController = require('./controllers/CupomController')


routes.get('/cupons', CupomController.index)
routes.get('/cupons/:_id', CupomController.show)
routes.post('/cupons', CupomController.store)
routes.put('/cupons/:_id', CupomController.update)
routes.delete('/cupons/:_id', CupomController.destroy)

module.exports  = routes;