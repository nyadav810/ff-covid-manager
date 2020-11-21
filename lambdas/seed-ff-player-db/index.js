const https = require("https");
const mysql = require("mysql");

// Credentials
const rds = {
  host: "ffplayerdb.csx7mxeeb5v9.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "xGK6hyA2Iawc9DsdrKT5",
  database: "ff_player_db",
};

// Sleeper API Endpoint
const sleeperApiUrl = "https://api.sleeper.app/v1/players/nfl";

// Fantasy Positions (Offense)
const validPlayerPositions = ["QB", "WR", "RB", "TE", "K", "DEF"];

exports.handler = (event) => {
  console.log("Fetching player data...");

  let parsedPlayerData;

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
        try {
          console.log("Player data fetched!");

          parsedPlayerData = JSON.parse(rawData);

          const con = mysql.createConnection(rds);

          con.connect(function (err) {
            if (err) throw err;
            console.log("Connected to db!");

            const filteredPlayers = Object.values(parsedPlayerData)
              .filter(({ active }) => active) // filter out inactive players
              .filter(({ position }) =>
                validPlayerPositions.includes(position)
              ); // filter out defense players

            // Map Players
            const values = filteredPlayers.map(
              ({
                player_id = null,
                first_name = null,
                last_name = null,
                team = null,
                fantasy_positions,
                number = null,
                injury_status = null,
                rotowire_id = null,
                rotoworld_id = null,
                sportradar_id = null,
                stats_id = null,
                yahoo_id = null,
              }) => {
                let fantasy_position_1 = null;
                let fantasy_position_2 = null;
                if (fantasy_positions && fantasy_positions.length) {
                  [fantasy_position_1, fantasy_position_2] = fantasy_positions;
                }
                return [
                  player_id,
                  first_name,
                  last_name,
                  team,
                  fantasy_position_1,
                  fantasy_position_2,
                  number,
                  injury_status,
                  rotowire_id,
                  rotoworld_id,
                  sportradar_id,
                  stats_id,
                  yahoo_id,
                ];
              }
            );

            // for each Player, insert into players table
            const sql =
              "INSERT INTO players (player_id, first_name, last_name, team, fantasy_position_1, fantasy_position_2, number, injury_status, rotowire_id, rotoworld_id, sportradar_id, stats_id, yahoo_id) VALUES ? ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), team = VALUES(team), fantasy_position_1 = VALUES(fantasy_position_1), fantasy_position_2 = VALUES(fantasy_position_2), number = VALUES(number), injury_status = VALUES(injury_status), rotowire_id = VALUES(rotowire_id), rotoworld_id = VALUES(rotoworld_id), sportradar_id = VALUES(sportradar_id), stats_id = VALUES(stats_id), yahoo_id = VALUES(yahoo_id)";
            con.query(sql, [values], function (err, result) {
              if (err) throw err;
              console.log(
                `Inserted/updated ${result.affectedRows} rows in table players.`
              );
              console.log("Terminating db connection...");
              con.destroy();
            });
          });
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
};
