const express = require("express");
const port = 3000;
const path = require("path");

const app = express();

//setting up views
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("assets"));

app.use("/",require("./routes/index"));

app.listen(port,(err)=>{
    if(err){
        console.log("error in running the server");
    }
    console.log("server is up and running at port "+port);
});

