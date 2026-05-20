const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    name: String,
    price: Number,
    qty: Number,
});

const orderSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    items: [orderItemSchema],
    total: Number,
    paymentMethod: { type: String, default: "COD" },
    status: {
        type: String,
        enum: ["new", "confirmed", "preparing", "delivering", "delivered", "cancelled"],
        default: "new",
    },
    cancelRequested: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
