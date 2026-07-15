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

    try {

        if(!ytdl.validateURL(url)){
            return res.json({
                success:false,
                message:"Invalid YouTube URL"
            });
        }

        const info = await ytdl.getInfo(url);

        res.json({
            success:true,
            title:info.videoDetails.title,
            author:info.videoDetails.author.name,
            format:"mp3",
            message:"Audio information ready",
            url:url
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
