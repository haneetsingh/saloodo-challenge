const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();

const orders = require('../data/orders.json');

router.get("/", (req, res) => {
	res.send(orders);
});

router.get("/:id", (req, res) => {
	const order = orders.find(item => item.order_id === parseInt(req.params.id));
	if (!order)
		return res.status(404).send("Order with given ID was not found");
	res.send(order);
});

router.put("/:id", auth, (req, res) => {
	const order = orders.find(item => item.order_id === parseInt(req.params.id));
	if (!order) {
		return res.status(404).send("Order with given ID was not found");
	}

	if (req.body.user_id) {
		order.assignee_id = parseInt(req.body.user_id, 10);
		order.status = 'assigned';
	}

	if (req.body.status) {
		order.status = req.body.status;
		if (req.body.status === 'picked_up') {
			order.picked_up_time = Date.now();
		}
		else if (req.body.status === 'delivered') {
			order.delivered_time = Date.now();
		}
	}
	res.send(order);
});

module.exports = router;
