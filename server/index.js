const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")

app.use(cookieParser());
app.use(express.urlencoded({extended:false})); //It helps to parse the  form data
app.use(bodyParser.json());   //It helps to parse json data
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
);


const imagesRoutes  = require("./routes/imagesRoutes");
app.use("", imagesRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`App is listenign on PORT ${process.env.PORT}`)
});

