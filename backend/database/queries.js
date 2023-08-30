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

  async getAllCategories() {
    const queryString = "SELECT * FROM categories";

    try {
      const result = await db.query(queryString);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async updateCategory(id, newCategoryName) {
    const queryString =
      "UPDATE categories SET category_name = $1 WHERE id = $2 RETURNING *";
    const values = [newCategoryName, id];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async addCategory(newCategoryName) {
    const queryString =
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *";
    const values = [newCategoryName];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteCategory(categoryId) {
    const queryString =
      "DELETE FROM categories WHERE category_id = $1 RETURNING *";
    const values = [categoryId];

    try {
      const result = await db.query(queryString, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getFeaturedProduct() {
    const queryString = `
      SELECT * 
      FROM product 
      WHERE closing_date > CURRENT_DATE 
      ORDER BY RANDOM() 
      LIMIT 1;
    `;

    try {
      const result = await db.query(queryString);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getFeaturedProducts(count) {
    const queryString = `
      SELECT * 
      FROM product 
      WHERE closing_date > CURRENT_DATE 
      ORDER BY RANDOM() 
      LIMIT $1;
    `;

    try {
      const result = await db.query(queryString, [count]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getNewArrivals() {
    const queryString = `
      SELECT *
      FROM product
      WHERE closing_date > CURRENT_DATE 
      ORDER BY time_created DESC
      LIMIT 8;
    `;

    try {
      const result = await db.query(queryString);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getTopRated() {
    const queryString = `
      SELECT *
      FROM product
      WHERE closing_date > CURRENT_DATE
      ORDER BY rating DESC
      LIMIT 8;
    `;

    try {
      const result = await db.query(queryString);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getLastChance() {
    const queryString = `
      SELECT *
      FROM product
      WHERE closing_date > CURRENT_DATE 
      ORDER BY closing_date
      LIMIT 8;
    `;

    try {
      const result = await db.query(queryString);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};
