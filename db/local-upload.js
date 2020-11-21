const fs = require("fs");
const uploadPlayers = require("./upload-players");

console.log("Reading players.json file...");
const rawData = fs.readFileSync("./players.json");
console.log("Reading players.json file read!");

uploadPlayers(rawData);
