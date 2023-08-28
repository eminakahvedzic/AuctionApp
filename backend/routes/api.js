const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const queries = require("../database/queries");
const validateToken = require("../middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

router.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await queries.getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await queries.createUser(firstName, lastName, email, hashedPassword);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await queries.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "3650d",
    });

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: 0,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      message: "Login successful",
      token: token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await queries.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { newCategoryName } = req.body;

    const updatedCategory = await queries.updateCategory(
      categoryId,
      newCategoryName
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const { newCategoryName } = req.body;

    const addedCategory = await queries.addCategory(newCategoryName);
    res.json(addedCategory);
  } catch (error) {
    console.error("Error adding category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/categories/:category_id", async (req, res) => {
  try {
    const categoryId = req.params.category_id;

    const deletedCategory = await queries.deleteCategory(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products/featured", async (req, res) => {
  const count = req.query.count || 1; 
  try {
    const featuredProducts = await queries.getFeaturedProducts(count);
    res.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products/:category", async (req, res) => {
  try {
    const { category } = req.params;
    let products;

    if (category === "new_arrivals") {
      products = await queries.getNewArrivals();
    } else if (category === "top_rated") {
      products = await queries.getTopRated();
    } else if (category === "last_chance") {
      products = await queries.getLastChance();
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
