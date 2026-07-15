const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const YoutubeSearchApi = require("youtube-search-api");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success: false,
            message: "Use ?q=song name"
        });
    }

    try {

        const search = await YoutubeSearchApi.GetListByKeyword(
            q,
            false,
            1
        );

        if (!search.items.length) {
            return res.json({
                success:false,
                message:"Song not found"
            });
        }

        const video = search.items[0];

        const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;

        const fileName = Date.now() + ".mp3";
        const output = path.join(
            __dirname,
            "../downloads",
            fileName
        );


const command = `yt-dlp --js-runtimes deno --no-playlist -x --audio-format mp3 -o "${output}" "${videoUrl}"`;
        exec(command, (error)=>{

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
                title:video.title,
                artist:"YouTube",
                audio:`https://techx-api-79ow.onrender.com/downloads/${fileName}`
            });

        });


    } catch(err){

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
