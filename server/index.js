const express = require("express");
const cors = require('cors');
const auth = require('./routes/auth');
const users = require('./routes/users');
const orders = require('./routes/orders');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use('/api/users', users);
app.use("/api/orders", orders);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));