const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req,res)=>{

    const q = req.query.q;

    if(!q){
        return res.json({
            success:false,
            message:"Use ?q=song name"
        });
    }

    try {

        const response = await axios.get(
            `https://api.popcat.xyz/ytmp3?url=${encodeURIComponent(q)}`
        );

        if(!response.data){
            return res.json({
                success:false,
                message:"Song not found"
            });
        }

        res.json({
            success:true,
            title:q,
            artist:"Unknown",
            audio:response.data.url
        });


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
