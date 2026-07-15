const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            success:false,
            message:"Use ?url=https://example.com"
        });
    }

    try {

        const response = await axios.get(
            `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
        );

        res.json({
            success:true,
            original:url,
            short:response.data
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
