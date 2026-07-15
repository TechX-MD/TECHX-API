const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req,res)=>{

    const url = req.query.url;




if(!url){
    return res.json({
        success:false,
        message:"Use ?url=tiktok_link"
    });
}

if(!url.includes("tiktok.com")){
    return res.json({
        success:false,
        message:"Invalid TikTok URL"
    });
}

try{

    const response = await axios.post(
        "https://www.tikwm.com/api/",
        {
            url:url
        },
        {
            headers:{
                    "Content-Type":"application/json"
                }
            }
        );



const data = response.data.data;

if(!data){
    return res.json({
        success:false,
        message:"TikTok video not found or API failed",
        response: response.data
    });
}

res.json({
    success:true,
    title:data.title || "No title",
    author:data.author?.unique_id || "Unknown",
    thumbnail:data.cover,
    video:data.play,
    audio:data.music
});
    }catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
