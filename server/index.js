// Import  required packages/modules
const express = require("express"); // Import Express.js framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const cors = require("cors"); // Import CORS  for handling Cross-Origin Resources Sharing
const app = express(); // Crea an instance of Exress
require("dotenv").config(); // Load environment variables from a .env file
const cookieParser = require('cookie-parser'); // Importing coike-parser for parsing cookies
const authRoute = require('./Routes/AuthRoute'); // Importing the authentication routes
const { MONGO_URL, PORT } = process.env; // Extract environment variables froma env file



// Connect to MongoDB database using Mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true, // MongoDB connection options
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully")) // Log success message upon connection
  .catch((err) => console.error(err)); // Logging any errors encountered during connection

// Start the Express server, listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Configure CORS setting for the Express app
app.use(
  cors({
    origin: ["http://localhost:4000"], // Allow request from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true, // Allow sending cookies in cross-origin requests
  })
);

app.use(cookieParser()); // Using cookie-parser middleware for parsing cookies

app.use(express.json()); // Parsing incoming request bodies in JSON format

app.use('/', authRoute); // Using the authentication routes for the root endpoint
