const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let totalbalance = 99880;

app.use(express.json());

app.post("/", (req, res) => {
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);

  const { command } = req.body;

  let response = {};

  // if (command === "get_account_balance")
  response = {
    currency: "EUR",
    // totalbalance: totalbalance,
    response_message: "ok",
    response_code: "ok",
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
