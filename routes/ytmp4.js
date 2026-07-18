const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");

router.get("/", (req,res)=>{

    const url = req.query.url;

    if(!url){
        return res.json({
            success:false,
            message:"Use ?url=youtube_link"
        });
    }

    const file = path.join(
        __dirname,
        "../downloads/video.mp4"
    );

    const command =
    `yt-dlp -f "mp4" -o "${file}" "${url}"`;
exec(command, (error, stdout, stderr)=>{

    if(error){
        console.log("YTDLP ERROR:", stderr);

        return res.json({
            success:false,
            error:stderr || error.message
        });
    }

    res.download(file);

});



});

module.exports = router;
