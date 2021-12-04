/*=================================INIT - BEGIN===============================*/
const express         = require("express"),
      app             = express(),
      dotenv          = require("dotenv").config(); // Configure .env variables

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));     

/* Create route variables*/
const indexRoutes         = require("./routes/index");

// require routes
app.use("/", indexRoutes);

/*=================================INIT - END=================================*/
/*=================================LISTEN - BEGIN=============================*/
app.listen(process.env.PORT, function(){
  console.log("Server Started");
});
/*=================================LISTEN - END===============================*/
