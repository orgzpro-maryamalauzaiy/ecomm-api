const express = require("express")
const { getBalances, getTotalBalance , getAllDebit, getAllCredit, getLastDebit} = require("../controllers/balanceController")
const { verifyAdmin } = require("../utils/verifyToken")

const router = express.Router()

router.get('/flows', verifyAdmin, getBalances)
router.get('/', verifyAdmin, getTotalBalance)
router.get('/debit', verifyAdmin, getAllDebit)
router.get('/credit', verifyAdmin, getAllCredit)
router.get('/last-debit', verifyAdmin, getLastDebit)
// router.get('/')


module.exports = router