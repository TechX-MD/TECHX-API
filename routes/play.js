const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", async (req,res)=>{

    const q = req.query.q;

    if(!q){
        return res.json({
            success:false,
            message:"Use ?q=song name"
        });
    }

    const fileName = Date.now() + ".mp3";
    const output = path.join(__dirname,"../downloads",fileName);

const command = `yt-dlp --js-runtimes deno --extractor-args "youtube:player_client=android" --no-playlist -x --audio-format mp3 -o "${output}" "ytsearch1:${q}"`;
    exec(command,(error)=>{

        if(error){
            return res.json({
                success:false,
                error:error.message
            });
        }

        if(!fs.existsSync(output)){
            return res.json({
                success:false,
                message:"Audio not created"
            });
        }

        res.json({
            success:true,
            title:q,
            artist:"Unknown",
            audio:`https://${req.get("host")}/downloads/${fileName}`
        });

    });

});

module.exports = router;
