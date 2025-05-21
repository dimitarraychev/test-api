const express = require("express");
const router = express.Router();
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

router.post("/", (req, res) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    console.log(payload);
    res.json({ hi: "hi" });
    return;

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

      default:
        console.log("Unknown command received:", command);
        res.json({ message: "Unknown command" });
    }

    if (simulateError && commandToFail === command) {
      resetResponse();
    }
  } catch (error) {
    console.error("Error parsing payload_json:", error);
    res.status(400).json({ message: "Invalid JSON format" });
  }
});

module.exports = router;
