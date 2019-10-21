const users = require('../data/users.json');

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  const token = header.split(' ')[1];
  const auth = new Buffer.from(token, 'base64').toString();
  const parts = auth.split(':');
  const user = users.find(user => user.username === parts[0]);

  if (!header) return res.status(401).send("Access denied. No token provided.");

  if (user && user.password === parts[1]) {
    return next()
  }
  else {
    return res.status(400).send("Invalid token.");
  }
};