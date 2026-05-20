const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    originalPrice: Number,
    category: String,
    image: String,
    images: [String],
    stock: Number,
    sold: Number,
    rating: Number,
    reviews: Number,
    tags: [String],
    discount: Number,
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
