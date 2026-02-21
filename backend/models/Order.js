const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: Array,
  totalAmount: Number,
  paid: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);