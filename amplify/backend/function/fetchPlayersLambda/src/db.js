const util = require("util");
const mysql = require("mysql");

const makeDb = (config) => {
  const connection = mysql.createConnection(config);

  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
    beginTransaction() {
      return util.promisify(connection.beginTransaction).call(connection);
    },
    commit() {
      return util.promisify(connection.commit).call(connection);
    },
    rollback() {
      return util.promisify(connection.rollback).call(connection);
    },
  };
};

// Credentials

const rds = {
  host: "ffplayerdb.csx7mxeeb5v9.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "xGK6hyA2Iawc9DsdrKT5",
  database: "ff_player_db",
};

const getPlayerById = async (playerId) => {
  const db = makeDb(rds);

  try {
    const [player] = await db.query(
      "SELECT * FROM players WHERE player_id = ?",
      [playerId]
    );

    return player;
  } catch (err) {
    // handle the error
    console.error(err.message);

    throw new Error(err.message);
  } finally {
    await db.close();
  }
};

module.exports = {
  getPlayerById,
};
