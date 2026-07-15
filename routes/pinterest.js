const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=image"
        });
    }

    try {

        const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;

        const response = await axios.get(url, {
            headers:{
                "User-Agent":"Mozilla/5.0"
            }
        });

        const $ = cheerio.load(response.data);

        let images = [];

        $("img").each((i, el)=>{

            const img = $(el).attr("src");

            if(img && images.length < 10){
                images.push(img);
            }

        });

        res.json({
            success:true,
            query:q,
            results:images
        });


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
