const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/google", require("./routes/google"));
app.use("/weather", require("./routes/weather"));
app.use("/apk", require("./routes/apk"));
app.use("/qrcode", require("./routes/qrcode"));
app.use("/wiki", require("./routes/wikipedia"));
app.use("/pinterest", require("./routes/pinterest"));
app.use("/mediafire", require("./routes/mediafire"));
app.use("/shorten", require("./routes/shorten"));
app.use("/ai", require("./routes/ai"));
app.use("/github", require("./routes/github"));
app.use("/npm", require("./routes/npm"));
app.use("/ip", require("./routes/ip"));
app.use("/currency", require("./routes/currency"));
app.use("/youtube", require("./routes/youtube"));
app.use("/news", require("./routes/news"));
app.use("/ytmp4", require("./routes/ytmp4"));
app.use("/ytmp3", require("./routes/ytmp3"));
app.use("/play", require("./routes/play"));
app.use("/remini", require("./routes/remini"));
app.use("/downloads", express.static("downloads"));
app.use("/tiktok", require("./routes/tiktok"));
app.use("/instagram", require("./routes/instagram"));

app.get("/", (req,res)=>{

    res.json({
        success: true,
        name: "TECHX API",
        version: "1.0.0",
        developer: "Kelly",
        status: "Online",
        website: "https://techx-md.onrender.com",
        endpoints: [
            "/google",
            "/weather",
            "/apk",
            "/wiki",
            "/translate",
            "/mediafire",
            "/pinterest",
            "/qrcode",
            "/shorten"
        ]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 TECHX API running on port ${PORT}`);
});
