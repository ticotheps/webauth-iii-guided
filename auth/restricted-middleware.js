const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Step 6a: Import 'jsonwebtoken'
const Users = require('../users/users-model.js');

// Step 6b: Simplify the 'restricted()' middleware function due to
// addition of 'jsonwebtoken'
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // is it valid?
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // record the event
        res.status(401).json({ message: "Can't touch this!" });
      } else {
        next();
      }
    });
  } else {  
    res.status(401).json({ message: 'You shall not pass!' });
  }
};
