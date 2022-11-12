const mongoose = require("mongoose");

const videosModel = mongoose.Schema({
    user_id : {
        type : String
    },
    videoUrl :{
        type : String
    },
}, {timestamps : true});

module.exports = mongoose.model("videosModel", videosModel);

