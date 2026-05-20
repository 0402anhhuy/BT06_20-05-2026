const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    name: String,
    price: Number,
    qty: Number,
});

const cartSchema = new mongoose.Schema({
    userEmail: String,
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
