// index.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json()); // for parsing application/json

// Handling CORS - Allows you to call the API from any front-end, not recommended for production
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Sample POST endpoint to receive data
app.post("/data", (req, res) => {
  console.log("Received data:", req.body);
  // Save data to database or do other server side actions here...

  // Responding back to the client
  res.json({ success: true, message: "Data received!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});
