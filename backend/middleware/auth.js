const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    console.log(token);

    if (!token) {
      console.log("No token found");
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      algorithms: ["HS256"],
    });
    console.log("Decoded user ID:", decoded.userId);
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = validateToken;
