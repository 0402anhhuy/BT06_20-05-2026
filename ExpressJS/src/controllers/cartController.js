const cartService = require("../services/cartService");

const getCart = async (req, res) => {
    try {
        const email = req.user.email;
        const cart = await cartService.getCartByEmail(email);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { productId, qty } = req.body;
        const cart = await cartService.addToCart(email, productId, qty || 1);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const email = req.user.email;
        const { productId, qty } = req.body;
        const cart = await cartService.updateItem(email, productId, qty);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const removeItem = async (req, res) => {
    try {
        const email = req.user.email;
        const { productId } = req.params;
        const cart = await cartService.removeItem(email, productId);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, updateItem, removeItem };
