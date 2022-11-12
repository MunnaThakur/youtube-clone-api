require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const prductController = require("./route/allRoute")

const app = express();

app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(express.json({limit: "30mb", extended:true}));

//connedt to Mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Database is connected...")})
.catch((error)=>{console.log(`${error} database is not connected!`)});

//API route of images
app.use("/thumbnailImage", express.static('upload/images'));
app.use("/api", prductController);

//video route
app.use("/videoUrl", express.static('upload/videos'));


//create server
const server = process.env.PORT;
app.listen(server, ()=>{console.log(`Server is listning on port http://localhost:${server}`)});
