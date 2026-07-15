const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const ip = req.query.ip;

    if (!ip) {
        return res.json({
            success:false,
            message:"Use ?ip=8.8.8.8"
        });
    }

    try {

        const response = await axios.get(
            `https://ipapi.co/${ip}/json/`
        );

        res.json({
            success:true,
            ip:response.data.ip,
            country:response.data.country_name,
            city:response.data.city,
            region:response.data.region,
            timezone:response.data.timezone,
            org:response.data.org
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
