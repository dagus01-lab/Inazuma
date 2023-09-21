var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs')
var router = express.Router();
var tokenSecretKey = fs.readFileSync('token_secret_key')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST login API */
router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user with Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);


    // Check if the provided password is correct (You may need to implement this)
    // For security, it's recommended to use a library like bcrypt to hash and compare passwords.

    // Generate a JWT token
    const token = jwt.sign(
      {
        uid: userRecord.uid,
        email: userRecord.email,
        // Add any other user-related data you want to include in the token
      },
      tokenSecretKey, // Replace with your own secret key
      {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      }
    );

    // Return the token to the client
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
})


module.exports = router;
