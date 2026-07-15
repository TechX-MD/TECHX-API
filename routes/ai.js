const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const prompt = req.query.prompt;

    if (!prompt) {
        return res.json({
            success:false,
            message:"Use ?prompt=your question"
        });
    }

    try {

        const response = await axios.get(
            "https://api.github.com"
        );

        res.json({
            success:true,
            prompt,
            reply:"AI endpoint ready. Connect your AI provider here.",
            status:"online"
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
