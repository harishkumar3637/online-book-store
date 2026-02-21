const router = require("express").Router();
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

router.post("/create", protect, async (req, res) => {
  const { books, totalAmount } = req.body;

  const order = await Order.create({
    user: req.user,
    books,
    totalAmount,
    paid: true
  });

  res.json(order);
});

router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user });
  res.json(orders);
});

module.exports = router;