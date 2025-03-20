const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let totalbalance = 99880;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log("Body:");
  console.log(req.body);

  let response = {};

  try {
    const payload = JSON.parse(req.body.payload_json);
    const command = payload.command;

    console.log(`Received Command: ${command}`);

    switch (command) {
      case "get_account_balance":
        response = {
          currency: "EUR",
          totalbalance: totalbalance,
          response_message: "ok",
          response_code: "ok",
        };

        res.json(response);
        break;

      case "add_account_game_win":
        res.json({ message: "Game win logic here" });
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
  console.log(`Server is running on port ${PORT}`);
});
