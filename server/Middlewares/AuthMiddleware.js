const { request } = require("express");
const User = require("../Models/UserModels");
require('dotenv').config();
const jwt = require('jsonwebtoken');

//Middleware to verify user authentication via token
module.exports.userVerification = (request, response) => {
    //Retrieve the token from the request cookies
    const token = request.cookies.token;

    // If no token is found, return a false status
    if(!token) {
        return response.json({ status: false });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        // If there's an error during verification, return false status
        if (err) {
            return response.json({ status: false });
        } else {
            // If token is successfully verified, find the user by ID from token data
            const user = await User.findById(data.id);

            // If user is found, return a true status along with the username
            if(user) return response.json({ status: true, user: user.username });
            //If user is not found, return false status
            else return response.json({ status: false });
        }
    });
};