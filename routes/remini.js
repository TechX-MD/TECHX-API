const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

    res.json({
        success: true,
        message: "Remini API is working 🚀"
    });

});

module.exports = router;
