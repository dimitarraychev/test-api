const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let totalbalance = 100000;

app.use(express.json());
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
    const command = payload.command;
    const amount = payload.amount;

    console.log(`Received Command: ${command}`);

    switch (command) {
      case "get_account_balance":
        response.totalbalance = totalbalance;

        res.json(response);
        break;

      case "add_account_game_bet":
        response.totalbalance = totalbalance - amount;
        response.response_code = "limit_error";

        res.json(response);
        break;

      case "add_account_game_win":
        response.totalbalance = totalbalance + amount;

        res.json(response);
        break;

      case "cancel":
        response.totalbalance = totalbalance;
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

  console.log("EOF----------------");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
