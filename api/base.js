const express = require("express");
const router = express.Router();
const { generateLogsBase } = require("../utils/logs");

let totalBalance = 123456;
let simulateError = false;
let commandToFail = "";

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

router.post("/", (req, res) => {
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

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      case "get_account_balance":
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      case "add_account_game_bet":
        totalBalance -= amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      case "add_account_game_win":
        totalBalance += amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      case "cancel":
        totalBalance += amount;
        response.freeround_limit = 0;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogsBase(
          payload,
          command,
          simulateError,
          commandToFail,
          response
        );
        res.json(response);
        break;

      default:
        console.log("Unknown command received:", command);
        res.json({ message: "Unknown command" });
    }
  } catch (error) {
    console.error("Error parsing payload_json:", error);
    res.status(400).json({ message: "Invalid JSON format" });
  }

  if (simulateError && commandToFail === command) {
    resetResponse();
  }
});

module.exports = router;
