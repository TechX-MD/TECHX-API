const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();

router.get("/", async (req, res) => {

    const text = req.query.text;

    if (!text) {
        return res.json({
            success: false,
            message: "Use ?text=your-message"
        });
    }

    try {

        const qr = await QRCode.toDataURL(text);

        res.json({
            success: true,
            text: text,
            qr: qr
        });

    } catch (err) {

        res.json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;
