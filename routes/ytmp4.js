const express = require("express");
const router = express.Router();
const ytdlp = require("yt-dlp-exec");
const path = require("path");

router.get("/", async (req,res)=>{

    const url = req.query.url;

    if(!url){
        return res.json({
            success:false,
            message:"Use ?url=youtube_link"
        });
    }

    try {

        const file =
        path.join(
            __dirname,
            "../downloads/video.mp4"
        );

        await ytdlp(url, {
            output: file,
            format: "mp4"
        });


        res.download(file);


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;

