const Product = require("../models/product");

const getAllProductsService = async (query = {}) => {
    const { category, search, sort, page = 1, limit = 12 } = query;
    
    let filter = {};
    
    if (category) {
        filter.category = category;
    }
    
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    const skip = (page - 1) * limit;
    
    let sortOption = {};
    if (sort === "price-asc") {
        sortOption = { price: 1 };
    } else if (sort === "price-desc") {
        sortOption = { price: -1 };
    } else if (sort === "newest") {
        sortOption = { createdAt: -1 };
    } else if (sort === "best-seller") {
        sortOption = { sold: -1 };
    } else {
        sortOption = { createdAt: -1 };
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));

    return {
        products,
        pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit),
        },
    };
};

const getProductByIdService = async (id) => {
    const product = await Product.findById(id);
    return product;
};

const createProductService = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};

const getProductsByCategoryService = async (category) => {
    const products = await Product.find({ category }).limit(6);
    return products;
};

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    getProductsByCategoryService,
};
