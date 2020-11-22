const express = require("express");
const port = 3000;
const path = require("path");
const app = express();
const sassMiddleware = require("node-sass-middleware");
const db  = require("./config/mongoose");
//setting up scss
app.use(sassMiddleware({
    src : "./assets/scss",
    dest:"./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix:"/css"    
}));
app.use(express.urlencoded());

//setting up views
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("assets"));

//using routes..
app.use("/",require("./routes/index"));

app.listen(port,(err)=>{
    if(err){
        console.log("error in running the server");
    }
    console.log("server is up and running at port "+port);
});

