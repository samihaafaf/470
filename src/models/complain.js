const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    regarding:{
        type:String,
        required: true
    },
    details:{
        type:String,
        required: true
    }

    
})

const admin = new mongoose.model("Admin",adminSchema);


module.exports = admin;