const express = require('express');
const { insertSampleProducts, getProductStats, getAnalysis } = require('../controllers/product-controller.js');

const router = express.Router();

router.post('/add',insertSampleProducts);
router.get('/get-stats',getProductStats);
router.get('/get-analysis',getAnalysis);

module.exports = router;