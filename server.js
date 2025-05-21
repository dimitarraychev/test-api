const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const unifiedRouter = require("./api/router"); // updated
const softSwissV2Api = require("./api/softSwissV2");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", unifiedRouter); // <- this handles both base and iSoftBet
app.use("/v2/provider_a8r.:subroute(*)", softSwissV2Api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
