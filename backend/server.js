const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Your routes and other server configurations will go here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
