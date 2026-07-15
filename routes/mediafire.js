const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            success:false,
            message:"Use ?url=mediafire_link"
        });
    }

    try {

        const response = await axios.get(url, {
            headers:{
                "User-Agent":"Mozilla/5.0"
            }
        });

        const html = response.data;

        const title =
            html.match(/og:title" content="(.*?)"/)?.[1] ||
            "Unknown";

        const download =
            html.match(/https?:\/\/[^"]+download[^"]+/)?.[0] ||
            null;

        res.json({
            success:true,
            title,
            download,
            source:url
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
