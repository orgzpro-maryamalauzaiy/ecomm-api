const express = require('express')
const {historyOrder, historyOrderById} = require('../controllers/historyOrdersController')
const { verifyUser } = require('../utils/verifyToken')

const router = express.Router()

router.get('/', verifyUser, historyOrder)
router.get('/:id', verifyUser, historyOrderById)
// verifyUser,

module.exports = router