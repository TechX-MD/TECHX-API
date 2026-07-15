const express = require("express");
const router = express.Router();
const ytdl = require("@distube/ytdl-core");
router.get("/", async (req,res)=>{

    const url = req.query.url;

    if(!url){
        return res.json({
            success:false,
            message:"Use ?url=youtube_link"
        });
    }

    try{

        const info = await ytdl.getInfo(url);

        res.json({
            success:true,
            title:info.videoDetails.title,
            thumbnail:info.videoDetails.thumbnails.pop().url,
            author:info.videoDetails.author.name,
            message:"Video information ready",
            url:url
        });

    }catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
