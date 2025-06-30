const { generateLogsBase } = require("../utils/logs");

let totalBalance = 123456;
let simulateError = false;
let commandToFail = "";
const errorResponseMessage = "temporary_error ";

const response = {
  currency: "EUR",
  response_message: "ok",
  response_code: "ok",
};

const resetResponse = () => {
  response.response_code = "ok";
  simulateError = false;
  commandToFail = "";
};

module.exports = (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const { command, amount, bet_amount, win_amount, command_to_fail } =
      payload;

    switch (command) {
      case "simulate_error":
        simulateError = true;
        commandToFail = command_to_fail;
        break;

      case "get_account_balance":
        response.totalbalance = totalBalance;
        break;

      case "add_account_game_bet":
        totalBalance -= amount;
        response.totalbalance = totalBalance;
        break;

      case "add_account_game_win":
        totalBalance += amount;
        response.totalbalance = totalBalance;
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;
        response.totalbalance = totalBalance;
        break;

      case "cancel":
        totalBalance += amount;
        response.freeround_limit = 0;
        response.totalbalance = totalBalance;
        break;

      default:
        console.log("Unknown command received:", command);
        return res.json({ message: "Unknown command" });
    }

    if (simulateError && commandToFail === command) {
      response.response_code = errorResponseMessage;
    } else {
      response.response_code = "ok";
    }

    generateLogsBase(
      req.headers,
      payload,
      command,
      simulateError,
      commandToFail,
      response
    );
    res.json(response);

    if (simulateError && commandToFail === command) {
      resetResponse();
    }
  } catch (error) {
    console.error("Base API Error:", error);
    res.status(400).json({ message: "Invalid JSON format" });
  }
};
