const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Balance retrieved", balance: 1000 });
});

module.exports = router;
