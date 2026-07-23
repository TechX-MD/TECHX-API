




const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Missing query parameter (?q=)"
        });
    }

    try {

        const response = await axios.get(
            "https://api.duckduckgo.com/",
            {
                params:{
                    q,
                    format:"json",
                    no_html:1
                }
            }
        );

        const results = [];

        if (response.data.AbstractText) {
            results.push({
                title: response.data.Heading,
                link: response.data.AbstractURL,
                snippet: response.data.AbstractText
            });
        }

        response.data.RelatedTopics?.slice(0,5)
        .forEach(item => {

            if(item.Text){

                results.push({
                    title:item.Text.split(" - ")[0],
                    link:item.FirstURL,
                    snippet:item.Text
                });

            }

        });

        res.json({
            success:true,
            query:q,
            results
        });

    } catch(err){

        res.json({
            success:false,
            message:"Search failed",
            error:err.message
        });

    }

});

module.exports = router;
