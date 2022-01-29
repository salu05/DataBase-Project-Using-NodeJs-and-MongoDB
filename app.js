const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("./db/conn");
const Booking = require("./model/booking");
const Help = require("./model/help");
const Signup = require("./model/signup");
const RegisterSolo = require("./model/register");

const port = process.env.port || 3000;

//console.log (path.join(__dirname,"../public"));
const static_path = (path.join(__dirname,"../public"));
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.get("/",(req,res)=> {
res.render("index")
});

app.get("/aboutus",(req,res)=> {
    res.render("aboutus")
    });

app.get("/index",(req,res)=> {
    res.render("index")
    });

    app.get("/register",(req,res)=> {
        res.render("register")
        });


    app.get("/details",(req,res)=> {
        res.render("details")
        });

app.get("/booking", (req,res)=> {
    res.render("booking")
});

app.get("/createadmin", (req,res)=> {
    res.render("createadmin")
});

app.get("/generate", (req,res)=> {
    res.render("generate")
});

app.get("/bpass", (req,res)=> {
    res.render("bpass")
});

app.get("/help", (req,res)=> {
    res.render("help");
});

app.get("/change", (req,res)=> {
    res.render("change")
});







app.post("/booking", async(req,res)=>{
    try{
        
const bookingcus =  new Booking({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
    passport: req.body.passport,
    phonenumber: req.body.phonenumber,
    package: req.body.package


})
  
const booked = await bookingcus.save();
res.status(201).render("generate");



} catch (error){
        res.status(400).send(error);
8    }
});





app.post("/register", async(req,res)=>{
    
    // try {
    //     console.log(req.body.name);
    //     console.log(req.body.email);
    // } catch (error) {
    //     res.status(400).send(error);
    // }
    
        
        try{
      
    const solo =  new RegisterSolo({
        name: req.body.name,
        phone: req.body.phone,
        passport: req.body.passport,
        trip: req.body.trip
    
    
    })
      
    const regdone = await solo.save();
    res.status(201).render("index");
    
    
    
    } catch (error){
            res.status(400).send(error);
        }
    }
    );
    





app.post("/help", async(req,res)=>{
    
// try {
//     console.log(req.body.name);
//     console.log(req.body.email);
// } catch (error) {
//     res.status(400).send(error);
// }

    
    try{
  
const helprs =  new Help({
    name: req.body.name,
    email: req.body.email,
    msg: req.body.msg,
    star: req.body.star


})
  
const msged = await helprs.save();
res.status(201).render("index");



} catch (error){
        res.status(400).send(error);
    }
}
);









app.post("/createadmin", async(req,res)=>{
    try{
   
const password = req.body.password;
const cpassword = req.body.cpassword;

if(password === cpassword){

    const signupadmin = new Signup({

    uname: req.body.uname,
    email: req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword

    })

    const token = await signupadmin.generateAuthToken();

    const Signuped = await signupadmin.save();
    res.status(201).render("createadmin");
            
}
else{
    res.send("Password not matched")
}
    
    } catch (error){
            res.status(400).send(error);
        }
    });


    


app.post("/loginAdmin", async(req,res)=>{
    try{

    const email = req.body.emails;
    const password = req.body.passwords;
        
//console.log(`${email} and password is ${password}`)
const useremail = await  Signup.findOne({email:email});
// res.send(useremail);
//  console.log("Done");


// console.log(token);
const match = await bcrypt.compare(password,useremail.password)


if (match){
    res.status(201).render("change");
}
else {
    res.send("Incorrect");
}

    } catch (error){
            res.status(400).send(error);
        }
    });







//     app.get("/change", async(req,res)=>{
// try{
//     const user = await  Signup.find();
//     res.json(user);

// }
// catch (error){
//     res.status(400).send(error);
// }
        
//     });





app.get("/change", (req,res)=> {
    res.render("change")
});


app.post("/change", async(req,res)=>{
    try{

    const email = req.body.email;
    const name = req.body.uname;
        
//console.log(`${email} and password is ${password}`)
const useremail = await  Signup.findOneAndUpdate({email:email},
    {uname: name });
  res.send("Updated");
  //console.log(username.uname);
  
//name: req.body.uname;
//res.status(201).render("index");


// if (useremail.password === password){
//     res.status(201).render("index");
// }
// else {
//     res.send("Incorrect");
// }

    } catch (error){
            res.status(400).send(error);
        }
    });




    app.post("/generate", async(req,res)=>{
        try{
    
        const email = req.body.email;
        const package = req.body.package;
            
    //console.log(`${email} and password is ${password}`)
    const useremail = await  Booking.findOneAndUpdate({email:email},{package:package});
      res.send(useremail);
      console.log(useremail.name);
      
    //name: req.body.uname;
    // res.status(201).render("index");
    
    
    // if (useremail.password === password){
    //     res.status(201).render("index");
    // }
    // else {
    //     res.send("Incorrect");
    // }
    
        } catch (error){
                res.status(400).send(error);
            }
        });
    
    

        
    app.post("/delete", async(req,res)=>{
        try{
    
        const email = req.body.email;
        //const package = req.body.package;
            
    //console.log(`${email} and password is ${password}`)
    const useremail = await  Booking.deleteOne({email:email});

      res.send("deleted");
      //console.log(useremail);
      
    //name: req.body.uname;
    // res.status(201).render("index");
    
    
    // if (useremail.password === password){
    //     res.status(201).render("index");
    // }
    // else {
    //     res.send("Incorrect");
    // }
    
        } catch (error){
                res.status(400).send(error);
            }
        });







// app.get("/booking/:email",async (req,res)=> {
//     try{
//         const _email = req.params.email;
//         const Data = await Booking.findOne({email:_email});
//         if(!Data){
//             return res.status(404).send();
//         }
//         else{
//             res.send(data);
//         }
//     }catch(e){
//         res.status(400).send(e);
//     }
// });




app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})


