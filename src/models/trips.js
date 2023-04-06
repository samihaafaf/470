const { default: mongoose } = require("mongoose");

const tripSchema = new mongoose.Schema({
    trip_t:{
        type:String,
        required: true
    },
    loc:{
        type:String,
        required:true
    },
    p_class:{
        type:String,
        required:true

    },
    
    dir:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        required:true 
    },
    dep:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true  
    }
})

const Trip_list = new mongoose.model("Trip",tripSchema);

module.exports = Trip_list;