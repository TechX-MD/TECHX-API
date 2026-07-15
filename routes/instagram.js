const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async(req,res)=>{

    const url = req.query.url;

    if(!url){
        return res.json({
            success:false,
            message:"Use ?url=instagram_link"
        });
    }

    try{

        const response = await axios.get(
            `https://api.saveig.app/api/download?url=${encodeURIComponent(url)}`
        );

        res.json({
            success:true,
            data:response.data
        });

    }catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
