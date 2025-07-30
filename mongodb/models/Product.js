const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    tags: [String]
});

const Product = new mongoose.model('Product',ProductSchema);

module.exports = Product;