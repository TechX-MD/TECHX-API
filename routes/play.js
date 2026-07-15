const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const yts = require("yt-search");

const router = express.Router();

router.get("/", async (req, res) => {

    const q = req.query.q;

    if (!q) {
        return res.json({
            success:false,
            message:"Use ?q=song name"
        });
    }

    try {

        const result = await yts(q);

        const video = result.videos[0];

        if (!video) {
            return res.json({
                success:false,
                message:"Song not found"
            });
        }

        const fileName = Date.now() + ".mp3";
        const output = path.join(__dirname, "../downloads", fileName);

        const command = `yt-dlp --js-runtimes deno --extractor-args "youtube:player_client=android_vr" --no-playlist -x --audio-format mp3 -o "${output}" "${video.url}"`;

        exec(command, (error) => {

            if (error) {
                return res.json({
                    success:false,
                    error:error.message
                });
            }

            if (!fs.existsSync(output)) {
                return res.json({
                    success:false,
                    message:"Audio not created"
                });
            }

            res.json({
                success:true,
                title:video.title,
                artist:video.author.name,
                thumbnail:video.thumbnail,
                audio:`https://${req.get("host")}/downloads/${fileName}`
            });

        });

    } catch(err) {

        res.json({
            success:false,
            error:err.message
        });

    }

});

module.exports = router;
