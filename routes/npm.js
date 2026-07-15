const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=package"
        });
    }

    try {

        const response = await axios.get(
            `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=5`
        );

        const results = response.data.objects.map(pkg => ({
            name: pkg.package.name,
            version: pkg.package.version,
            description: pkg.package.description,
            url: pkg.package.links.npm
        }));

        res.json({
            success:true,
            query:q,
            results
        });

    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
