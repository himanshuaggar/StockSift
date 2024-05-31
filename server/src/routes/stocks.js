const express = require('express');
const { getStockBySymbol, registerStock, getAllStocks } = require('../controllers/stock');
const { buyStock, getAllHoldings } = require('../controllers/holdings');
const { getOrder } = require('../controllers/order');

const router = express.Router();

router.get("/stock", getStockBySymbol);
router.post("/register",registerStock);
router.get("",getAllStocks);
router.post("/buy",buyStock);
router.post("/order",getOrder);
router.get("/holding",getAllHoldings);

module.exports = router;