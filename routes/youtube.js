const express = require("express");
const yts = require("yt-search");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=song name"
        });
    }

    try {

        const result = await yts(q);

        const videos = result.videos.slice(0,5).map(video => ({
            title: video.title,
            url: video.url,
            duration: video.timestamp,
            views: video.views,
            thumbnail: video.thumbnail
        }));

        res.json({
            success:true,
            query:q,
            results:videos
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
