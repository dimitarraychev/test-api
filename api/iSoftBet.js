const { generateLogsISoftBet } = require("../utils/logs");

let totalBalance = 123456;

const baseResponse = {
  status: "success",
  currency: "EUR",
};

module.exports = (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    generateLogsISoftBet(req);

    if (payload.action) {
      const { command, parameters } = payload.action;

      if (command === "initsession") {
        return res.json({
          ...baseResponse,
          sessionid: "LRzyoAhcB0za3B3HcBJayvk57OqF1YUd",
          playerid: payload.playerid,
          username: payload.username,
          balance: totalBalance,
        });
      }

      if (command === "bet") {
        totalBalance -= parameters.amount;
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      if (command === "win") {
        totalBalance += parameters.amount;
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      if (command === "balance") {
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      if (command === "cancel") {
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      if (command === "end") {
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      if (command === "depositmoney") {
        return res.json({ ...baseResponse, balance: totalBalance });
      }

      return res.status(400).json({ message: "Unknown iSoftBet command" });
    }

    if (Array.isArray(payload.actions)) {
      for (const action of payload.actions) {
        const { command, parameters } = action;

        if (command === "bet") {
          totalBalance -= parameters.amount;
        } else if (command === "win") {
          totalBalance += parameters.amount;
        } else {
          console.warn("Unknown command in batch:", command);
        }
      }

      return res.json({ ...baseResponse, balance: totalBalance });
    }

    return res
      .status(400)
      .json({ message: "No recognizable action(s) provided" });
  } catch (err) {
    console.error("iSoftBet handler error:", err);
    res.status(400).json({ message: "Invalid iSoftBet format" });
  }
};
