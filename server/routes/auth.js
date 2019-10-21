const express = require("express");
const router = express.Router();
const users = require('../data/users.json');

router.post('/', (req, res) => {
  const user = users.find(item => item.username === req.body.username && item.password === req.body.password);

  if (!user)
    return res.status(404).send("Invalid credentials");
  res.json(user);
});

module.exports = router;