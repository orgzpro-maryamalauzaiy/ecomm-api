const express = require("express")
const { getBalance } = require("../controllers/balanceController")
const { verifyAdmin } = require("../utils/verifyToken")

const router = express.Router()

router.get('/total', verifyAdmin, getBalance)
// router.get('/')


module.exports = router