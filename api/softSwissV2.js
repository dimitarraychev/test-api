const express = require("express");
const { generateLogsSoftSwissV2 } = require("../utils/logs");
const router = express.Router();

let totalBalance = 123456;

// router.post("/provider_a8r.Player/Balance", (req, res) => {
//   generateLogsSoftSwissV2(req);

//   res.json({ message: "Balance retrieved", balance: totalBalance });
// });

router.post("/:subroute(*)", (req, res) => {
  generateLogsSoftSwissV2(req);

  const { subroute } = req.params;
  res.json({ message: `Matched subroute: ${subroute}`, balance: 1000 });
});

module.exports = router;
