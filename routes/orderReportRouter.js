const express = require('express')
const { verifyAdmin } = require('../utils/verifyToken')
const { getBalance, getTotalTransaction, getAmountOfTransaction } = require('../controllers/orderReportController')

const router = express.Router()

router.get('/balances', verifyAdmin, getBalance)
router.get('/total-transactions', verifyAdmin, getTotalTransaction)
router.get('/amount-transactions', verifyAdmin, getAmountOfTransaction)

module.exports = router