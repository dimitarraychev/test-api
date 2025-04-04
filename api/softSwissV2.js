const express = require("express");
const { generateLogsSoftSwissV2 } = require("../utils/logs");
const router = express.Router();

let totalBalance = 123456;

router.post("/provider_a8r.Player/Balance", (req, res) => {
  generateLogsSoftSwissV2(req);

  res.json({ message: "Balance retrieved", balance: totalBalance });
});

module.exports = router;
