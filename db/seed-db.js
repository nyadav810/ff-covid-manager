const https = require("https");
const uploadPlayers = require("./upload-players");

const sleeperApiUrl = "https://api.sleeper.app/v1/players/nfl";

console.log("Fetching player data...");

https
  .get(sleeperApiUrl, (res) => {
    const { statusCode } = res;
    const contentType = res.headers["content-type"];

    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" +
          `Expected application/json but received ${contentType}`
      );
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      console.log("Player data fetched!");

      uploadPlayers(rawData);
    });
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
