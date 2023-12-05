// Import neccessary modules
require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken'); // Import JSOn Web Token library

// Function to generate a JWT secret token
module.exports.createSecretToken = (id) => {
    // Create a JWT with a payload containing the provided 'id'
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60, // Token expiration time set 3 days
    });
};