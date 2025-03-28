const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let totalBalance = 123456;

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log("Body:");
  console.log(req.body);

  const response = {
    currency: "EUR",
    response_message: "ok",
    response_code: "ok",
  };

  try {
    const payload = JSON.parse(req.body.payload_json);
    const { command, amount, bet_amount, win_amount } = payload;

    console.log(`Received Command: ${command}`);

    switch (command) {
      case "get_account_balance":
        response.totalbalance = totalBalance;

        res.json(response);
        break;

      case "add_account_game_bet":
        totalBalance -= amount;

        response.totalbalance = totalBalance;
        // response.response_code = "error";

        res.json(response);
        break;

      case "add_account_game_win":
        totalBalance += amount;

        response.totalbalance = totalBalance;

        res.json(response);
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;

        response.totalbalance = totalBalance;

        res.json(response);
        break;

      case "cancel":
        totalBalance += amount;

        response.freeround_limit = 0;
        response.totalbalance = totalBalance;

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
