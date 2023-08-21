const { Pool } = require("pg");

const pool = new Pool({
  user: "emina",
  host: "localhost",
  database: "auctionapp",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
