const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const path = require("path")
const fs = require("fs")

app.use(cookieParser());
app.use(express.urlencoded({extended:false})); //It helps to parse the  form data
app.use(bodyParser.json());   //It helps to parse json data
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
);

app.get('/download/:pdf', (req, res) => {
  const pdfName = req.params.pdf
  const pdfFilePath = path.join(__dirname  + `/uploads/pdfs`, pdfName);
  
  res.download(pdfFilePath, 'PDFify.pdf', (err)=>{
    if(err){
      res.status(500).send("File is now deleted from server")
    }else{
      //download ho chuki hai ab
      fs.unlink(pdfFilePath, function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
    });
    }
  });

});


const imagesRoutes  = require("./routes/imagesRoutes");
app.use("", imagesRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`App is listenign on PORT ${process.env.PORT}`)
});

