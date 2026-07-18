const express = require("express");
const router = express.Router();
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            success:false,
            message:"Use ?url=youtube_link"
        });
    }

    try {

        const info = await ytdl.getInfo(url);

        const title = info.videoDetails.title
        .replace(/[^a-zA-Z0-9]/g,"_");

        const file =
        path.join(
            __dirname,
            "../downloads",
            title + ".mp4"
        );



ytdl(url, {
    quality:"highest",
    filter:"audioandvideo"
})        .pipe(fs.createWriteStream(file))
        .on("finish",()=>{

            res.download(file, title+".mp4");

        });


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;



