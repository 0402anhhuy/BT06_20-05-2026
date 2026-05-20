const Order = require("../models/order");
const Cart = require("../models/cart");

const createOrderFromCart = async (email, name, address, paymentMethod = "COD") => {
    const cart = await Cart.findOne({ userEmail: email });
    if (!cart || !cart.items.length) throw new Error("Cart is empty");
    const items = cart.items.map((i) => ({ product: i.product, name: i.name, price: i.price, qty: i.qty }));
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = await Order.create({ userEmail: email, userName: name, items, total, paymentMethod, status: "new" });
    // clear cart
    cart.items = [];
    await cart.save();
    return order;
};

const getOrdersByUser = async (email) => {
    return Order.find({ userEmail: email }).sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
    return Order.findById(orderId);
};

const requestCancel = async (orderId, email) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (String(order.userEmail) !== String(email)) throw new Error("Not allowed");
    const now = new Date();
    const minutes = (now - order.createdAt) / (1000 * 60);
    // allow cancel if within 30 minutes and status is new or confirmed
    if (minutes <= 30 && (order.status === "new" || order.status === "confirmed")) {
        order.status = "cancelled";
        order.updatedAt = new Date();
        await order.save();
        return order;
    }
    // if in preparing (shop preparing) then set cancelRequested flag
    if (order.status === "preparing") {
        order.cancelRequested = true;
        order.updatedAt = new Date();
        await order.save();
        return order;
    }
    throw new Error("Không thể hủy đơn theo trạng thái hiện tại");
};

const autoConfirmOldOrders = async () => {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const res = await Order.updateMany({ status: "new", createdAt: { $lte: thirtyMinutesAgo } }, { status: "confirmed", updatedAt: new Date() });
    return res;
};

module.exports = { createOrderFromCart, getOrdersByUser, getOrderById, requestCancel, autoConfirmOldOrders };
