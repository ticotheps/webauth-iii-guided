const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Step 1: Install and import 'jsonwebtoken'

const Users = require('../users/users-model.js');
const secret = require('../api/secrets').jwtSecret; 
// Step 7a: Make 'secret' an env variable to give restricted-middleware.js access to it.
// Step 7b: Import 'jwtSecret' in from 'secrets'.

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // Step 2a: GENERATE A TOKEN HERE.
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // Step 2b: RETURN A TOKEN HERE.
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// Step 3: Build a 'generateToken(user)' function.
function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ... any other data that we might want to add to the token here
    roles: ['student', 'ta'] // pretend they come from the database (user.roles)
  };

  // ----------Step 7 extracts the 'const secret' into an env variable
  // ----------so that we can use it in more than one place. 
  // Step 4: Define a variable called 'secret' for the parameter returned
  // in the 'generateToken()' function.
  // const secret = 'add a third table for many to many relationships';
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options); // returns a valid token
};

module.exports = router;
