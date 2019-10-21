const express = require("express");
const router = express.Router();
const users = require('../data/users.json');
const orders = require('../data/orders.json');

router.get('/biker', (req, res) => {
  const bikers = users.filter(user => user.role === 'biker');

  if (!bikers.length)
    res.status(404).send("No users with the role found");

  res.send(bikers);
});

router.get('/:id/orders', (req, res) => {
  const orderList = orders.filter(order => order.assignee_id === parseInt(req.params.id));
  res.json(orderList);
});

module.exports = router;