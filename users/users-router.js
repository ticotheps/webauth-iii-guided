const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, withRole('student'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function withRole(role) {
  return function(req, res, next) {
    if(req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {

      next();
    } else {
      res.status(403).json({ message: 'You have no power here!' });
    }
  }
};

module.exports = router;
