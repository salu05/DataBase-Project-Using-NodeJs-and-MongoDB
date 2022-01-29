const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupSchema = new mongoose.Schema({

uname : {
    type: String,
    required:true
},

email : {
    type: String,
    required:true,
    unique:true
},


password : {
    type: String,
    required:true
},

cpassword: {
    type: String,
    required:true
},
tokens:[{
    token:{
    type: String,
    required:true
    }
}]



})

 signupSchema.methods.generateAuthToken = async function(){
try{
    console.log(this._id);
    const token = jwt.sign({ _id:this._id.toString()},"mynameissalmansajidfromfastuniveristy");
    console.log(token);
this.tokens= this.tokens.concat({token:token})
await this.save();
return token;

}catch(e){
    res.send(e);
}

 }



signupSchema.pre("save", async function(next){
 if(this.isModified("password")){

    this.password = await bcrypt.hash(this.password,10);
    this.cpassword = await bcrypt.hash(this.password,10);
    //console.log(`password = ${this.password}`);
// this.cpassword = undefined;
 }
next();

})



const Signup = new mongoose.model("Signup",signupSchema);

module.exports=Signup;