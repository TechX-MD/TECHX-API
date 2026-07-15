const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=keyword"
        });
    }

    try {

        const response = await axios.get(
            "https://api.github.com/search/repositories",
            {
                params:{
                    q:q,
                    per_page:5
                },
                headers:{
                    "User-Agent":"TECHX-API"
                }
            }
        );

        const results = response.data.items.map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
            stars: repo.stargazers_count,
            url: repo.html_url
        }));

        res.json({
            success:true,
            query:q,
            results
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
