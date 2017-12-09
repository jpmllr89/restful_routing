var express = require("express"),
mongoose = require("mongoose"),
bodyParser= require("body-parser"),
keys = require("./config/dev/keys"),
app = express()

//connect to dependencies and create app
//tell the app how and when to use to dependencies (app.set and app.use)
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
//connect to mongoose and create Schema(s) w/ new mongoose.Schema
//then model it with the schema just created.
var uname = keys.mlab.username,
pword = keys.mlab.password;
mongoose.connect('mongodb://'+uname+':'+pword+'@ds111178.mlab.com:11178/bloggo');

var barSchema = new mongoose.Schema({
  title: String,
  image: String,
  address: String,
  description: String,
  times: String,
  openNow: Boolean,
  rating: Number
});

var Bar = mongoose.model("Bar", barSchema);
//Routes below

Bar.create({
  title:"Drunkies",
  image:"https://media.timeout.com/images/100519023/image.jpg",
  address: "1212 fuckyou st.",
  description: "Best place to have a baby and etc.",
  times: "5pm-12am",
  openNow: false,
  rating: 4.5
});

app.get("/", function(req, res){
    res.redirect("/bars");
});

app.get("/bars", function(req,res){
  Bar.find({}, function(err, bar){
    if(err){
      console.log(err);
    }else{
      res.render("index", {bar:bar});
    }
  })
})


//port to lsiten on
app.listen(3000, function(){

  console.log("server is running");
});
