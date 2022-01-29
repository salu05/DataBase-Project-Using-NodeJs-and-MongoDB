const mongoose = require("mongoose");

const helpsSchema = new mongoose.Schema({

name : {
    type: String,
    required:true
},

email : {
    type: String,
    required:true,
    unique:true
},


msg : {
    type: String,
    required:true
},

star: {
    type: Number,
    required:false
}



})



const Help = new mongoose.model("Help",helpsSchema);

module.exports=Help;