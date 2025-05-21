const express = require("express");
const router = express.Router();

const baseHandler = require("./base");
const isoftbetHandler = require("./iSoftBet");

router.post("/", (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    if (payload?.action?.command && payload?.ISBskinid) {
      return isoftbetHandler(req, res);
    }

    return baseHandler(req, res);
  } catch (err) {
    console.error("Routing error:", err);
    res.status(400).json({ message: "Invalid request format" });
  }
});

module.exports = router;
