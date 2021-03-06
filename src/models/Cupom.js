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
    
})


mongoose.model("Cupom", CupomSchema)