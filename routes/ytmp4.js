const express = require("express");
const router = express.Router();
const { Innertube } = require("youtubei.js");

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            success: false,
            message: "Use ?url=youtube_link"
        });
    }

    try {

        const youtube = await Innertube.create();

        const videoId = url.split("v=")[1] || url.split("/").pop();

        const info = await youtube.getInfo(videoId);

        res.json({
            success: true,
            title: info.basic_info.title,
            author: info.basic_info.author,
            message: "Video found",
            url: url
        });


    } catch (err) {

        res.json({
            success:false,
            error: err.message
        });

    }

});

module.exports = router;
