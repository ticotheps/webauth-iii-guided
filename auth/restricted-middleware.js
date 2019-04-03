const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

// Step 5: Simplify the 'restricted()' middleware function due to
// addition of 'jsonwebtoken'
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // record the event
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        next();
      }
    });
  } else {  
    res.status(401).json({ message: 'You shall not pass!' });
  }
};
