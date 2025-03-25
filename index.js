const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let totalBalance = 100000;

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log("Body:");
  console.log(req.body);

  const response = {
    currency: "EUR",
    response_message: "ok",
    response_code: "ok",
    totalbalance: totalBalance,
  };

  try {
    const payload = JSON.parse(req.body.payload_json);
    const { command, amount, bet_amount, win_amount } = payload;

    console.log(`Received Command: ${command}`);

    switch (command) {
      case "get_account_balance":
        res.json(response);
        break;

      case "add_account_game_bet":
        totalBalance -= amount;
        // response.response_code = "error";

        res.json(response);
        break;

      case "add_account_game_win":
        totalBalance += amount;

        res.json(response);
        break;

      case "add_account_game_bet_and_win":
        totalBalance -= bet_amount;
        totalBalance += win_amount;

        res.json(response);
        break;

      case "cancel":
        response.freeround_limit = 0;

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
