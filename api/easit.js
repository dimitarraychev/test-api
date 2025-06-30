const express = require("express");
const router = express.Router();

let balance = 1234567;

router.get("/session", (req, res) => {
  const sessionRes = {
    playerId: 1234,
    gameId: "1000",
    currency: "EUR",
    token: crypto.randomUUID(),
  };

  res.send(sessionRes);
});

router.get("/balance", (req, res) => {
  res.send({ balance });
});

router.post("/bet", (req, res) => {
  const { amount } = req.body;
  const transactionId = crypto.randomUUID();
  balance -= amount;
  res.send({ balance, transactionId });
});

router.post("/win", (req, res) => {
  const { amount } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.send({ balance, transactionId });
});

router.post("/jackpotwin", (req, res) => {
  const { amount } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.send({ balance, transactionId });
});

router.post("/refund", (req, res) => {
  const { amount } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.send({ balance, transactionId });
});

module.exports = router;
