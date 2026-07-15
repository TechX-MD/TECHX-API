const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const from = req.query.from;
    const to = req.query.to;
    const amount = req.query.amount || 1;

    if (!from || !to) {
        return res.json({
            success:false,
            message:"Use ?from=USD&to=ZAR&amount=10"
        });
    }

    try {

        const response = await axios.get(
            `https://open.er-api.com/v6/latest/${from.toUpperCase()}`
        );

        const rate = response.data.rates[to.toUpperCase()];

        if (!rate) {
            return res.json({
                success:false,
                message:"Currency not found"
            });
        }

        res.json({
            success:true,
            from,
            to,
            amount,
            result: Number(amount) * rate,
            rate
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
