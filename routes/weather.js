const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.json({
            success: false,
            message: "Use ?city=Harare"
        });
    }

    try {

        const data = await axios.get(
            `https://wttr.in/${city}?format=j1`
        );

        const weather = data.data.current_condition[0];

        res.json({
            success: true,
            city: city,
            temperature: weather.temp_C + "°C",
            humidity: weather.humidity + "%",
            wind: weather.windspeedKmph + " km/h",
            condition: weather.weatherDesc[0].value
        });

    } catch (error) {

        res.json({
            success: false,
            error: error.message
        });

    }

});

module.exports = router;
