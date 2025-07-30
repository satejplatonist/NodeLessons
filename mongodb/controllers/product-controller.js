const Product = require('../models/Product.js');

const sampleProducts = [
    {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    inStock: true,
    tags: ["computer", "tech"],
    },
    {
    name: "Smartphone",
    category: "Electronics",
    price: 699,
    inStock: true,
    tags: ["mobile", "tech"],
    },
    {
    name: "Headphones",
    category: "Electronics",
    price: 199,
    inStock: false,
    tags: ["audio", "tech"],
    },
    {
    name: "Running Shoes",
    category: "Sports",
    price: 89,
    inStock: true,
    tags: ["footwear", "running"],
    },
    {
    name: "Novel",
    category: "Books",
    price: 15,
    inStock: true,
    tags: ["fiction", "bestseller"],
    },
];

const getProductStats = async (req,res) => {
    try {
        const result = await Product.aggregate([
            // stage 1
            {
                $match:{
                    inStock:true,
                    price:{
                        $gte: 100
                    }
                }
            },
            // stage 2: group documents
            {
                $group:{
                    _id:"$category",
                    avgPrice:{
                        $avg: "$price"
                    },
                    count:{
                        $sum: 1,
                    }
                }
            }
        ]);

        console.log(result)

        return res.status(200).json({
            sucess:true,
            mgs:`data : ${result}`
        })
    } catch (error) {
        console.log(`stats error : ${error}`);
        res.status(404).json({
            msg:`stats error ${error}`
        })
    }
}

const getAnalysis = async (req,res) => {
    try {
        const result = await Product.aggregate([
            {
                $match:{
                    category: 'Electronics'
                }
            },
            {
                $group:{
                    _id:null,
                    totalRevenue:{
                        $sum: "$price"
                    },
                    avgPrice:{
                        $avg: "$price"
                    },
                    maxPrice:{
                        $max: "$price"
                    },
                    minPrice:{
                        $min: "$price"
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    totalRevenue:1,
                    avgPrice:1,
                    maxPrice:1,
                    minPrice:1,
                    priceRange:{
                        $subtract:["$maxPrice","$minPrice"]
                    }
                }
            }
        ]);
        console.log(result);
        return res.status(200).json({
            sucess:true,
            data: result
        })
    } catch (error) {
        console.log(`analysis error : ${error}`);
        res.status(404).json({
            msg:`analysis error ${error}`
        })
    }
}

const insertSampleProducts = async (req,res) => {
    try {
        const response = Product.insertMany(sampleProducts);
        res.status(200).json({data : `Inserted ${response.length} sample products`}); 
    } catch (error) {
        console.log(`insertion error : ${error}`);
        res.status(404).json({
            msg:`insertion error ${error}`
        })
    }
}

module.exports = {insertSampleProducts, getProductStats, getAnalysis};