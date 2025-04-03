const express = require("express");
const router = express.Router();

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

const generateLogs = (payload, command) => {
  console.log(`Received Command: ${command}`);
  console.log("Payload:");
  console.log(payload);
  console.log("Simulation status:");
  console.log(simulateError, commandToFail);
  console.log("Response:");
  console.log(response);
  console.log("EOL---------------------------------------------");
};

app.post("/", (req, res) => {
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

        generateLogs(payload, command);
        res.json(response);
        break;

      case "get_account_balance":
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogs(payload, command);
        res.json(response);

        if (simulateError && commandToFail === command) {
          resetResponse();
        }
        break;

      case "add_account_game_bet":
        totalBalance -= amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogs(payload, command);
        res.json(response);

        if (simulateError && commandToFail === command) {
          resetResponse();
        }
        break;

      case "add_account_game_win":
        totalBalance += amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogs(payload, command);
        res.json(response);

        if (simulateError && commandToFail === command) {
          resetResponse();
        }
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogs(payload, command);
        res.json(response);

        if (simulateError && commandToFail === command) {
          resetResponse();
        }
        break;

      case "cancel":
        totalBalance += amount;
        response.freeround_limit = 0;
        response.totalbalance = totalBalance;

        if (simulateError && commandToFail === command) {
          response.response_code = "error";
        }

        generateLogs(payload, command);
        res.json(response);

        if (simulateError && commandToFail === command) {
          resetResponse();
        }
        break;

      default:
        console.log("Unknown command received:", command);
        res.json({ message: "Unknown command" });
    }
  } catch (error) {
    console.error("Error parsing payload_json:", error);
    res.status(400).json({ message: "Invalid JSON format" });
  }
});

module.exports = router;
