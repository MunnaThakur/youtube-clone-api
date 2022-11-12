const route = require("express").Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controller/productController");

//For image storeage
//difine of image path and original file name
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/images/')
    },
    filename : function(req,file,cb){
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//filter image by chaking image extantion 
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false);
    }
}
//set limit in image
const upload = multer({storage:storage, limits:{fileSize: 1024*1024*5}, fileFilter:fileFilter});


//api route

route.post("/product", upload.single("thumbnailImage"), productController.createProduct)




//For video storeage and uploading
const videoStorage = multer.diskStorage({
    destination: './upload/videos/', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        // cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        )
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 100000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
})
//vieos route
route.post("/video", videoUpload.single("videoUrl"), productController.createVideo)

module.exports = route

