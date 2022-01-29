const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({

name : {
    type: String,
    required:true
},
phone : {
    type: Number,
    required:true,
    unique:true
},

passport : {
    type: String,
    required:true,
    unique:true
},


trip : {
    type: String,
    required:true
}
})




const RegisterSolo = new mongoose.model("RegisterSolo",registerSchema);

module.exports=RegisterSolo;