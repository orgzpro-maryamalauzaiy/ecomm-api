const express = require('express')
const { getProvince, getCities, getCosts } = require('../controllers/shippingController')

const router = express.Router()

router.get('/provinces', getProvince)
router.get('/cities/:prov_id', getCities)
router.get('/costs/:origin/:destination/:weight/:courier', getCosts)

module.exports = router