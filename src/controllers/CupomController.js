const mongoose = require('mongoose')
const moment = require('moment');
const convertDate  = require('../utils/convertDate')

const Cupom = mongoose.model('Cupom')


module.exports = {

    async index(req, res) {//
       
        let result = []
        try {
            if(req.query.situation && req.query.dateMax && req.query.dateMin ){
        
                let dateMax = moment(new Date(convertDate(req.query.dateMax))).format('YYYY-MM-DD')
                let dateMin = moment(new Date(convertDate(req.query.dateMin))).format('YYYY-MM-DD')

                result = await Cupom.find({
                    'situation': { $eq: req.query.situation},
                    'date_max': { $gte : dateMin, $lte: dateMax },
                })
                    
        } 
            //filtering by situation
            else if(req.query.situation){
                
                result  = await Cupom.find(
                    {'situation': { $eq: req.query.situation }}) 
                    
            } 
            
            // filtering by date range
            else if(req.query.dateMax && req.query.dateMin){
        
                let dateMax = moment(new Date(convertDate(req.query.dateMax))).format('YYYY-MM-DD')
                let dateMin = moment(new Date(convertDate(req.query.dateMin))).format('YYYY-MM-DD')
                
                result = await Cupom.find({
                    'date_max': { $gte : dateMin, $lte: dateMax },
                                      
                })
                        
            } 
            //show all
            else {
                result = await Cupom.find()     
            }

            
            return res.json(result)
        } catch (err){
            response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }
        
    },

    async show(req, res) {
        const cupons = await Cupom.findById(req.params._id)

        return res.json(cupons)
    },

    
    async store(req, res) {
        
        if(req.body.situation === 'Usado'  ){
            req.body.use_date = moment(new Date()).format('YYYY-MM-DD')
        } else {
            req.body.use_date =  ''
        } 

        try{      

            const cupom = await Cupom.create(req.body)

            return res.send({cupom})

        } catch (err) {
            console.log(err)
        }
    },

    async update(req, res) {
        
        if(req.body.situation === 'Usado'  ){
            req.body.use_date = moment(new Date()).format('YYYY-MM-DD')
        } else {
            req.body.use_date =  ''
        } 
        
        try {
            const cupom = await Cupom.findByIdAndUpdate(req.params._id, req.body, { new: true})
            return res.send({cupom})
        } catch (err) {
            console.log(err)
        }
    },


    async destroy(req, res){
        await Cupom.findByIdAndRemove(req.params._id)

        return res.send() //resposta de sucesso
    }

}