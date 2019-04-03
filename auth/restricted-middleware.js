const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Step 6a: Import 'jsonwebtoken'

const secrets = require('../api/secrets');
const Users = require('../users/users-model.js');

// Step 6b: Simplify the 'restricted()' middleware function due to
// addition of 'jsonwebtoken'
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // is it valid?
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        // the token is not valid
        // record the event
        res.status(401).json({ message: "Can't touch this!" });
      } else {
        // all good

        req.decodedJwt = decodedToken; // <- if we wanted it, this makes the rest of the payload available to the API

        next();
      }
    });
  } else {  
    res.status(401).json({ message: 'No token provided!' });
  }
};
