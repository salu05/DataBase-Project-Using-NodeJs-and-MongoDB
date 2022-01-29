const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/DBPROJECT",
{
    useNewUrlParser: true, 

    useUnifiedTopology: true 

}).then(()=> {
    console.log(`connection Successful`);
}).catch((e)=>{
    console.log(`Not Successful Connection ${e}`);
})
