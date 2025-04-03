const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const baseApi = require("./api/base");
const softSwissV2Api = require("./api/softSwissV2");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", baseApi);
app.use("/v2/provider_a8r", softSwissV2Api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
