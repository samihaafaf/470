const { default: mongoose } = require("mongoose");

const bookedSchema = new mongoose.Schema({
    booked_by:{
        type:String,
        required: false
    }
    
})

const booked_list = new mongoose.model("Booked",bookedSchema);

module.exports = booked_list;