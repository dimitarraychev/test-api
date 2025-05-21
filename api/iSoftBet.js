module.exports = (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const { command } = payload.action || {};

    if (command === "initsession") {
      return res.json({
        response_code: "ok",
        response_message: "session initialized",
        balance: 5000,
        currency: payload.currency,
      });
    }

    // Add more iSoftBet commands here...
    return res.status(400).json({ message: "Unknown iSoftBet command" });
  } catch (err) {
    console.error("iSoftBet handler error:", err);
    res.status(400).json({ message: "Invalid iSoftBet format" });
  }
};
