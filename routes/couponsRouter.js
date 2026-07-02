const express = require('express')
const { createCoupon, updateCoupon, getCoupons, getCouponById } = require('../controllers/couponsController')
const { verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()

router.post('/', createCoupon)
router.get('/', getCoupons)
router.get('/:id', getCouponById)
router.patch('/:id', verifyAdmin, updateCoupon)

module.exports = router