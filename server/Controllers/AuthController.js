const User = require('../Models/UserModels.js'); //Importing the User model
const { createSecretToken } = require('../util/SecretToken'); // Importing token creation utility
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing

// Signup
module.exports.Signup = async (request, response, next) => {
    try {
      // Extracting necessary data from request body
      const { email, password, username, createdAt } = request.body;

      //Checking if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.json({ message: "User already exists" });
      }

      // Creating a new user using the User model
      const user = await User.create({ email, password, username, createdAt });

      // Generating  a secret token for the newly created user
      const token = createSecretToken(user._id);

      // setting the token in a cookie
      response.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      // Sending a success response
      response
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      
        next(); // Moving to the next middlware
      
    } catch (error) {
            console.error(error); // Logging any encountered errors
        }
};


//LOGIN
module.exports.Login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return response.json({ message: 'All fields are required' });
        }

        // Find the user with provided email
        const user = await User.findOne({ email });

        // If user doesn't exist, return an error message
        if (!user) {
            return response.json({ message: 'Incorrect password or email' });
        }

        // Compare the provided password with user's hashed password
        const auth = await bcrypt.compare(password, user.password);

        //If passwords don't match, return an error message
        if(!auth) {
            return response.json({ message: 'Incorrect password or email' });
        }

        // Generate a token for the authenticated user
        const token = createSecretToken(user._id);

        // Set the token as a cookies in the response
        response.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        });

        // Send a success response for successful login
        response.status(201).json({ message: 'User logged in successfully', success: true });

        // Move to the next middleware
        next();
    }catch (error) {
        console.log(error);
    }
};