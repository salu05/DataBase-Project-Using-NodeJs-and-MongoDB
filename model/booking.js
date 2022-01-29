const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({

firstname : {
    type: String,
    required:true
},
lastname : {
    type: String,
    required:true
},

age : {
    type: Number,
    required:true
},

email : {
    type: String,
    required:true,
    unique:true
},

address : {
    type: String,
    required:true
},

passport : {
    type: String,
    required:true,
    unique:true
},

phonenumber : {
    type: Number,
    required:true,
    unique:true
},


// possiblevalues:['Unique','Experienced','Luxury']



    // description: {type: String, possibleValues: ['blue','red','yellow','black']}

package : {
    type: String,
    required:true
}

})



const Booking = new mongoose.model("Booking",bookingsSchema);

module.exports=Booking;