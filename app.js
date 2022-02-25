// require('dotenv').config()
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mongoose= require("mongoose")
// const encrypt = require('mongoose-encryption')


// app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine','ejs');
// app.use(express.static("public"));

// mongoose.connect("mongodb+srv://Admin-Rohan:"+ process.env.ADMIN_PASS +"@cluster0.2vxj1.mongodb.net/newUserDB",{useNewUrlParser:true, useUnifiedTopology:true});
// const userSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// // mongoose encrypt

// userSchema.plugin(encrypt, { secret: process.env.SECRET ,encryptedFields: ['password']});


// const Users = mongoose.model("User",userSchema);

// app.get("/",(req,res)=>{
// res.render("home")
// })

// app.get("/login",(req,res)=>{
// res.render("login")
// })

// app.get("/register",(req,res)=>{
//     res.render("register")
// })

// app.post("/register",(req,res)=>{
//     const newUser = new Users({
//         email: req.body.username,
//         password: req.body.password
//     })
//     newUser.save((err)=>{
//         if(!err){
//             res.render("secrets")
//         }else{
//             console.log(err);
//         }
//     });
// })


// app.post("/login",(req,res)=>{
//     const user_name = req.body.username;
//     const pass= req.body.password;
//     Users.findOne({email:user_name},(err,founduser)=>{
//         if(!err){
//             if(founduser){
//                 if(founduser.password === pass){
//                     res.render("secrets");
//                 }
//             }
//         }
//     })
// })









// app.listen(process.env.PORT || 3000,()=>{
//     console.log("server started on port : 3000");
// })


require('dotenv').config()
// console.log(process.env);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const md5 = require("md5")

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Amit12:" + process.env.MONGO + "@cluster0.jyvg6.mongodb.net/secretDB", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = new mongoose.model("user", userSchema)


app.route("/")
.get((req,res)=>{
    res.render("home")
    console.log(md5("hello world"))
});



app.route("/register")
.get((req,res)=>{
res.render("register")
})
.post((req,res)=>{
const userName = req.body.username
const password = req.body.password

const user = new User({
    email:userName,
    password:password
})

user.save((err)=>{
    if(!err){
       res.render("secrets") 
    }
})
});

app.route("/login")
.get((req,res)=>{
res.render("login")
})
.post((req,res)=>{
const userName = req.body.username
const password = req.body.password

User.findOne({email : userName},(err,foundUser)=>{
    if(!err){
        if(foundUser.password == password){
            res.render("secrets")
        }
    }
})


});

app.listen(process.env.PORT || 3000, () => {
    console.log("server started on port : 3000");
})

