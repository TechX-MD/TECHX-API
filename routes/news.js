const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q || "technology";

    try {

        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=5&apiKey=demo`
        );

        const articles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage
        }));

        res.json({
            success:true,
            query:q,
            results:articles
        });

    } catch(err){

        res.json({
            success:false,
            message:"News API requires an API key",
            error:err.message
        });

    }

});

module.exports = router;
