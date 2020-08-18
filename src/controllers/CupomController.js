const mongoose = require('mongoose')
const moment = require('moment');
const convertDate  = require('../utils/convertDate')

const Cupom = mongoose.model('Cupom')


module.exports = {

    async index(req, res) {//
       
        let result = []
        try {
            if(req.query.situation && req.query.dateMax && req.query.dateMin ){
        
                let dateMax = moment(new Date(convertDate(req.query.dateMax))).format('YYYY-MM-DD[T00:00:00.000Z]')
                let dateMin = moment(new Date(convertDate(req.query.dateMin))).format('YYYY-MM-DD[T00:00:00.000Z]')

                result = await Cupom.find({
                    'situation': { $eq: req.query.situation},
                    'date_max': { $lte: dateMax},
                    'date_min': { $gt: dateMin} 
                })
                    
        } 
            //filtering by situation
            else if(req.query.situation){
                
                result  = await Cupom.find(
                    {'situation': { $eq: req.query.situation }}) 
                    
            } 
            
            // filtering by date range
            else if(req.query.dateMax && req.query.dateMin ){
        
                    let dateMax = moment(new Date(convertDate(req.query.dateMax))).format('YYYY-MM-DD[T00:00:00.000Z]')
                    let dateMin = moment(new Date(convertDate(req.query.dateMin))).format('YYYY-MM-DD[T00:00:00.000Z]')

                    result = await Cupom.find({ 
                        'date_max': { $lte: dateMax},
                        'date_min': { $gt: dateMin} 
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
        

        try{ 
            
            if(req.body.situation === 'Usado'  ){
                req.body.use_date = moment(new Date()).format('YYYY-MM-DD')
            } else if (req.body.situation === 'Expirado'){
                req.body.use_date =  ''
            } else {
                req.body.use_date = ''
            }

            
            /*if(req.body.use_date){
                let dateNew2 = convertDate(req.body.use_date)
                req.body.use_date =  moment(new Date(dateNew2)).format('YYYY-MM-DD')
            }*/
            
            //Converter Data
            const dateNew = convertDate(req.body.date_max)
            req.body.date_max = moment(new Date(dateNew)).format('YYYY-MM-DD')

            const cupom = await Cupom.create(req.body)

            return res.json(cupom)
        } catch (err) {
            console.log(err)
        }
    },

    async update(req, res) {

        try {
            if(req.body.situation === 'Usado'  ){
                req.body.use_date = moment(new Date()).format('YYYY-MM-DD')
            } else if (req.body.situation === 'Expirado'){
                req.body.use_date =  ''
            } else {
                req.body.use_date = ''
            }

            const cupom = await Cupom.findByIdAndUpdate(req.params._id, req.body, { new: true})
            return res.json(cupom)
        }  catch (err) {
            console.log(err)
        }
    },


    async destroy(req, res){
        await Cupom.findByIdAndRemove(req.params._id)

        return res.send() //resposta de sucesso
    }

}