//Required modules for user authentication and data encryption
const mongoose = require('mongoose'); // Import Mongoose for MongoDB Interactions
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

//Define the user shcema for MongoDB
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your email address is required'], // Email field validation
        unique: true,// Ensure uniquences in the database
    },
    username: {
        type: String,
        required: [true, 'Your username us required'], // User field validation
    },
    password: {
        type: String,
        required: [true, 'Your password is required'], // Password field validation
    },
    createdAt: {
        type: Date,
        default: new Date(), // Automatically set the creation date
    },
});

// Use a pre-save hook to hast hte user's password before saving it to the database
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12); // Hash the password using bcrypt
});

// Export the user model based on the defined schemas
module.exports = mongoose.model('User', userSchema);