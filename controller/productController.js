const productModel = require("../models/productMode");
const videosModel = require("../models/videoModel");


const createProduct = async(req,res)=>{
    try {
        const imagename = req.file.filename;
        const host = req.hostname;
        const protocol = req.protocol;
        // const PORT = process.env.PORT
        //PORT is only required while we test on local
        const filePath = `${protocol}://${host}/thumbnailImage/${imagename}`;
        const addProduct = await productModel({
            title : req.body.title,
            channelName : req.body.channelName,
            views : req.body.views,
            // uploadedDate : req.body.uploadedDate,
            thumbnailImage : filePath,
        })
        const data = await addProduct.save();
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({"Message" : "Internal server error!"});
    }
}



//create videos
const createVideo = async(req,res)=>{
    try {
        const videoname = req.file.filename;
        const host = req.hostname;
        const protocol = req.protocol;
        // const PORT = process.env.PORT
            
        //PORT is only required while we test on local
            const filePath = `${protocol}://${host}/videoUrl/${videoname}`;

            const addVideo = await videosModel({
                videoUrl : filePath
            })
            // console.log(addVideo);
            const addedVideo = await addVideo.save();
            res.status(200).json({addedVideo});
        }
        
         catch (error) {
            res.status(500).json({Message : "Internal server error!"})
        }
}


module.exports = {
    createProduct,createVideo
}

