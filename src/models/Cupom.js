const mongoose = require("mongoose")


const CupomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    date_max : {
        type: String,
        required: true,
    },
    use_date: {
        type: String,
    },
    situation: {
        type: String,
        required: true
    },
    date_min:{
        type: Date,
        default: Date.now
    }
    
})


mongoose.model("Cupom", CupomSchema)