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

    // Get video info first
const infoCommand = `yt-dlp --no-playlist --extractor-args "youtube:player_client=android" -j "ytsearch1:${q}"`;
    exec(infoCommand, (infoError, infoStdout)=>{

        if(infoError){
            return res.json({
                success:false,
                error:infoError.message
            });
        }

        let info;

        try {
            info = JSON.parse(infoStdout);
        } catch(e){
            return res.json({
                success:false,
                error:"Failed to read video info"
            });
        }


        // Download MP3
const downloadCommand = `yt-dlp --no-playlist --extractor-args "youtube:player_client=android" -x --audio-format mp3 -o "${output}" "${info.webpage_url}"`;
        exec(downloadCommand, (error)=>{

            if(error){
                return res.json({
                    success:false,
                    error:error.message
                });
            }

            if(!fs.existsSync(output)){
                return res.json({
                    success:false,
                    message:"Audio file not created"
                });
            }


            res.json({
                success:true,
                title:info.title,
                artist:info.uploader,
                thumbnail:info.thumbnail,
                duration:info.duration_string,
                audio:`http://localhost:3000/downloads/${fileName}`
            });

        });

    });

});

module.exports = router;
