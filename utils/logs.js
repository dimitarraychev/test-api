const generateLogs = (
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

module.exports = generateLogs;
