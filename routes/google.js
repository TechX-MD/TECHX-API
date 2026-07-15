const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success: false,
            message: "Missing query parameter (?q=)"
        });
    }

    res.json({
        success: true,
        query: q,
        message: "Google Search endpoint is working.",
        developer: "Kelly"
    });

});

module.exports = router;
