const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      algorithms: ["HS256"],
    });

    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = validateToken;
