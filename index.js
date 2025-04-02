const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

let totalBalance = 123456;
const simulateError = { isActive: false, command_to_fail: "" };
const response = {
  currency: "EUR",
  response_message: "ok",
  response_code: "ok",
};

app.post("/", (req, res) => {
  console.log("Body:");
  console.log(req.body);

  try {
    const payload = JSON.parse(req.body.payload_json);

    const { command, amount, bet_amount, win_amount, command_to_fail } =
      payload;

    console.log(`Received Command: ${command}`);

    switch (command) {
      case "simulate_error":
        simulateError.isActive = true;
        simulateError.command_to_fail = command_to_fail;

        res.json(response);
        break;

      case "get_account_balance":
        response.totalbalance = totalBalance;

        if (
          simulateError.isActive &&
          simulateError.command_to_fail === command
        ) {
          response.response_code = "error";
          simulateError = { isActive: false, command_to_fail: "" };
        }

        res.json(response);
        break;

      case "add_account_game_bet":
        totalBalance -= amount;
        response.totalbalance = totalBalance;

        if (
          simulateError.isActive &&
          simulateError.command_to_fail === command
        ) {
          response.response_code = "error";
          simulateError = { isActive: false, command_to_fail: "" };
        }

        res.json(response);
        break;

      case "add_account_game_win":
        totalBalance += amount;
        response.totalbalance = totalBalance;

        if (
          simulateError.isActive &&
          simulateError.command_to_fail === command
        ) {
          response.response_code = "error";
          simulateError = { isActive: false, command_to_fail: "" };
        }

        res.json(response);
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;
        response.totalbalance = totalBalance;

        if (
          simulateError.isActive &&
          simulateError.command_to_fail === command
        ) {
          response.response_code = "error";
          simulateError = { isActive: false, command_to_fail: "" };
        }

        res.json(response);
        break;

      case "cancel":
        totalBalance += amount;
        response.freeround_limit = 0;
        response.totalbalance = totalBalance;

        if (
          simulateError.isActive &&
          simulateError.command_to_fail === command
        ) {
          response.response_code = "error";
          simulateError = { isActive: false, command_to_fail: "" };
        }

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

  console.log("EOL--------------------------------");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
