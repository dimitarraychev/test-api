const generateLogsBase = (
  payload,
  command,
  simulateError,
  commandToFail,
  response
) => {
  console.log(`Received Command: ${command}`);
  console.log("Payload:");
  console.log(payload);
  console.log("Simulation status:");
  console.log(simulateError, commandToFail);
  console.log("Response:");
  console.log(response);
  console.log("EOL---------------------------------------------");
};

const generateLogsSoftSwissV2 = (req) => {
  console.log("URL:");
  console.log(req.url);
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);
  console.log("EOL----------------------------------");
};

const generateLogsISoftBet = (req) => {
  console.log("URL:");
  console.log(req.url);
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);
  console.log("Additional Game Values:");
  console.log(req.body.action.parameters.additional_game_values);
  console.log("EOL----------------------------------");
};

module.exports = {
  generateLogsBase,
  generateLogsSoftSwissV2,
  generateLogsISoftBet,
};
