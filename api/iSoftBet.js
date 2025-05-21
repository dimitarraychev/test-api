const { generateLogsISoftBet } = require("../utils/logs");

const response = {
  status: "success",
  sessionid: "LRzyoAhcB0za3B3HcBJayvk57OqF1YUd",
  playerid: "frankId",
  username: "frankId",
  currency: "EUR",
  balance: 10860,
};

module.exports = (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const { command } = payload.action || {};

    generateLogsISoftBet(req);

    if (command === "initsession") {
      return res.json(response);
    }

    // Add more iSoftBet commands here...
    return res.status(400).json({ message: "Unknown iSoftBet command" });
  } catch (err) {
    console.error("iSoftBet handler error:", err);
    res.status(400).json({ message: "Invalid iSoftBet format" });
  }
};
