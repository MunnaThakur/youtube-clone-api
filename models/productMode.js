const mongoose = require("mongoose");

const productDetails = mongoose.Schema({
    title:{
        type: String
    },
    channelName:{
        type : String
    },
    views : {
        type: String
    },
    // uploadedDate : {
    //     String
    // },
    thumbnailImage :{
        type : String
    },
    videoUrl :{
        type : String
    },
}, {timestamps : true});

module.exports = mongoose.model("productDetails", productDetails);
