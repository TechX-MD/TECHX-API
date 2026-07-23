const express = require("express");
const axios = require("axios");
const router = express.Router();

const {
    GOOGLE_API_KEY,
    GOOGLE_CX
} = require("../config");

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
            "https://www.googleapis.com/customsearch/v1",
            {
                params: {
                    key: GOOGLE_API_KEY,
                    cx: GOOGLE_CX,
                    q,
                    num: 5
                }
            }
        );

        const results = (response.data.items || []).map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));

        res.json({
            success: true,
            developer: "Kelly",
            query: q,
            total: results.length,
            results
        });

    } catch (err) {

        res.json({
            success: false,
            message: "Google search failed.",
            error: err.response?.data || err.message
        });

    }

});

module.exports = router;
