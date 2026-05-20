const Cart = require("../models/cart");
const Product = require("../models/product");

const getCartByEmail = async (email) => {
    let cart = await Cart.findOne({ userEmail: email }).populate("items.product");
    if (!cart) {
        cart = await Cart.create({ userEmail: email, items: [] });
    }
    return cart;
};

const addToCart = async (email, productId, qty = 1) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    const cart = await getCartByEmail(email);
    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx >= 0) {
        cart.items[idx].qty += qty;
    } else {
        cart.items.push({ product: productId, name: product.name, price: product.price, qty });
    }
    cart.updatedAt = new Date();
    await cart.save();
    return cart;
};

const updateItem = async (email, productId, qty) => {
    const cart = await getCartByEmail(email);
    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx >= 0) {
        cart.items[idx].qty = qty;
        cart.updatedAt = new Date();
        await cart.save();
    }
    return cart;
};

const removeItem = async (email, productId) => {
    const cart = await getCartByEmail(email);
    cart.items = cart.items.filter((i) => String(i.product) !== String(productId));
    cart.updatedAt = new Date();
    await cart.save();
    return cart;
};

const clearCart = async (email) => {
    const cart = await Cart.findOneAndUpdate({ userEmail: email }, { items: [], updatedAt: new Date() }, { new: true });
    return cart;
};

module.exports = { getCartByEmail, addToCart, updateItem, removeItem, clearCart };
