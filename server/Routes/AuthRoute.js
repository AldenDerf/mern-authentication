const { Signup, Login } = require('../Controllers/AuthController.js'); // Importing the Signup method from the AuthController
const { userVerification } = require('../Middlewares/AuthMiddleware.js');
const router = require('express').Router(); // Creating an Express router instance

// Defining a POST route 'signup' and associating it with the Signup method
router.post('/signup', Signup);

router.post('/login', Login);

router.post('/', userVerification);

module.exports = router; // Exporting the router with the defined routes