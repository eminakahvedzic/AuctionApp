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
    origin: "http://localhost:3000",
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

module.exports = router;

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

    console.log(res.getHeaders());
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: 0,
      sameSite: "lax",
      secure: false,
    });

    res.json({ message: "Login successful", token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user-details", validateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    client.release();

    const user = result.rows[0];
    if (!user) {
      return res.sendStatus(405);
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/profile", validateToken, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
