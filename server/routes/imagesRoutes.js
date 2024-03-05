const express = require("express")
const router = express.Router();
const multer = require("multer");

const {UploadImage} = require("../controller/UploadImage")


const storage = multer.diskStorage({
    destination : function(req, file, cb){
        return cb(null, './uploads/images')  //null means no error    here file is that is getting upload
    },
    filename : function(req, file, cb){  //kis naame se image save karni hai 
        return cb(null, `${Date.now()}-${file.originalname}`)  //to maine date k sath original naam ko append kardiya
    },
})
const upload = multer({storage: storage})


//below commented code on 35 will encode our image so its solution is to first create a storage and then upload that is created above

//frontend se jo bhi file aayi hai usko /uploads folder mai daal do
//upload is an middleware that will help to upload image
// const upload = multer({dest:"uploads/"})

// single image upload => upload.single
// many images upload  => upload.array            


//upload the image before processing function






router.post('/upload',upload.single("image"),  UploadImage);

module.exports = router