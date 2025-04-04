const express = require("express");
const { generateLogsSoftSwissV2 } = require("../utils/logs");
const router = express.Router();

router.post("/", (req, res) => {
  generateLogsSoftSwissV2(req);

  res.json({ message: "Balance retrieved", balance: 1000 });
});

module.exports = router;
