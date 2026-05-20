const {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    getProductsByCategoryService,
} = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const data = await getAllProductsService(req.query);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await getProductsByCategoryService(category);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductsByCategory,
};
