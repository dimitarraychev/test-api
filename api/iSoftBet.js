const { generateLogsISoftBet } = require("../utils/logs");

let totalBalance = 123456;

const response = {
  status: "success",
  currency: "EUR",
};

module.exports = (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const { command, parameters } = payload.action || {};

    generateLogsISoftBet(req);

    if (command === "initsession") {
      response.sessionid = "LRzyoAhcB0za3B3HcBJayvk57OqF1YUd";
      response.playerid = "mitko";
      response.username = "mitko";
      response.balance = totalBalance;
      return res.json(response);
    }

    if (command === "bet") {
      totalBalance -= parameters.amount;
      response.balance = totalBalance;
      return res.json(response);
    }

    if (command === "win") {
      totalBalance += parameters.amount;
      response.balance = totalBalance;
      return res.json(response);
    }

    return res.status(400).json({ message: "Unknown iSoftBet command" });
  } catch (err) {
    console.error("iSoftBet handler error:", err);
    res.status(400).json({ message: "Invalid iSoftBet format" });
  }
};
