const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const query = req.query.q;

    if (!query) {
        return res.json({
            success: false,
            message: "Use ?q=appname"
        });
    }

    try {

        const response = await axios.get(
            `https://api.github.com/search/repositories?q=${query}+android`
        );

        const apps = response.data.items.slice(0,5).map(app => ({
            name: app.name,
            developer: app.owner.login,
            url: app.html_url
        }));

        res.json({
            success: true,
            query,
            results: apps
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
