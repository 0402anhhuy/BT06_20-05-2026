const orderService = require("../services/orderService");

const checkout = async (req, res) => {
    try {
        const email = req.user.email;
        const name = req.user.name;
        const { paymentMethod, address } = req.body;
        const order = await orderService.createOrderFromCart(email, name, address, paymentMethod || "COD");
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const email = req.user.email;
        const orders = await orderService.getOrdersByUser(email);
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const requestCancel = async (req, res) => {
    try {
        const orderId = req.params.id;
        const email = req.user.email;
        const order = await orderService.requestCancel(orderId, email);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { checkout, getOrders, getOrderById, requestCancel };
