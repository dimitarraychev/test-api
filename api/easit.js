const express = require("express");
const router = express.Router();

const sessionRes = {
  playerId: 1234,
  gameId: "1000",
  currency: "EUR",
  token: crypto.randomUUID(),
};

router.get("/session", (req, res) => {
  console.log(req);
  res.send(sessionRes);
});

router.get("/somethingelse", (req, res) => {
  res.send("Something else endpoint");
});

module.exports = router;
