const express = require("express");
const axios = require("axios");

const router = express.Router();

const headers = {
    "User-Agent": "TECHX-API/1.0 (contact: techx@example.com)"
};

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=topic"
        });
    }

    try {

        const search = await axios.get(
            "https://en.wikipedia.org/w/api.php",
            {
                headers,
                params:{
                    action:"query",
                    list:"search",
                    srsearch:q,
                    format:"json"
                }
            }
        );

        const result = search.data.query.search[0];

        if (!result) {
            return res.json({
                success:false,
                message:"No result found"
            });
        }

        const summary = await axios.get(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`,
            {
                headers
            }
        );

        res.json({
            success:true,
            title: summary.data.title,
            description: summary.data.extract,
            image: summary.data.thumbnail?.source || null,
            link: summary.data.content_urls?.desktop?.page || null
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;








