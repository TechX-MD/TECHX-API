const express = require("express");
const axios = require("axios");

const router = express.Router();

const SEARX_URL = "https://searx.tiekoetter.com";

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success: false,
            message: "Missing query parameter (?q=)"
        });
    }

    try {

        const response = await axios.get(
            `${SEARX_URL}/search`,
            {
                params: {
                    q,
                    format: "json"
                },
                timeout: 15000,
                headers: {
                    "User-Agent": "TECHX-API"
                }
            }
        );

        const results = (response.data.results || [])
            .slice(0, 5)
            .map(r => ({
                title: r.title,
                link: r.url,
                snippet: r.content
            }));

        res.json({
            success: true,
            query: q,
            total: results.length,
            results
        });

    } catch (err) {

        res.json({
            success: false,
            message: "Search failed",
            error: err.response?.data || err.message
        });

    }

});

module.exports = router;

