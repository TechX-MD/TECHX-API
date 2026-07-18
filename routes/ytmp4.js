const express = require("express");
const router = express.Router();
const { Innertube } = require("youtubei.js");

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            success:false,
            message:"Use ?url=youtube_link"
        });
    }

    try {

        const youtube = await Innertube.create();

        const videoId = url.includes("v=")
            ? url.split("v=")[1].split("&")[0]
            : url.split("/").pop();


        const info = await youtube.getInfo(videoId);


        res.setHeader(
            "Content-Type",
            "video/mp4"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${videoId}.mp4"`
        );


        const stream = await youtube.download(videoId, {
            type: "video+audio",
            quality: "best"
        });


        stream.pipe(res);


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
