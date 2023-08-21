const db = require("./db");

module.exports = {
  async createUser(first_name, last_name, email, password) {
    const queryString =
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [first_name, last_name, email, password];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    const queryString = "SELECT * FROM users WHERE email = $1";
    const values = [email];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    const queryString = "SELECT * FROM users WHERE id = $1";
    const values = [id];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};
