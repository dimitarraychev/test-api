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
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);
  console.log("EOL----------------------------------");
};

module.exports = { generateLogsBase, generateLogsSoftSwissV2 };
