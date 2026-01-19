var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/form', function(req,res){
    var Name = req.body.name;
    var Number = req.body.email;
    var Phone = req.body.phone;
    var Project = req.body.project;
    var Message = req.body.message;
    var city = req.body.city;
    var Designation = req.body.designation;
    var data = {
        "name": Name,
        "num":Number,
        "phone":Phone,
        "project":Project,
        "message":Message,

    }
db.collection('Orders').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(8002);
console.log("server listening at port 8002");