const pool = require('../config/postgres')
const axios = require('../utils/shipping_api')

const getProvince = async (req, res, next) => {

  axios.get('/destination/province')
    .then(result =>
      res.status(200).json({error: false, message: 'Successfully get provinces.', data: result.data.data})
    )
    .catch(error =>
      next(error)
      // {
      //   return res.status(400).json({error: true, message: 'Error when get provinces: ' + error})
      // }
    )

}

const getCities = async (req, res, next) => {

  const id = req.params.province_id
  axios.get(`/destination/city/${id}`)
    .then(result =>
      res.status(200).json({error: false, message: 'Successfully get cites.', data: result.data.data})
    )
    .catch(error =>
      next(error)
      // {
      //   return res.status(400).json({error: true, message: 'Error when get cities: ' + error})
      // }
    )

}

const getCosts = async (req, res, next) => {

  const param = req.params
  axios.post('/calculate/district/domestic-cost', {
      origin: param.origin,
      destination: param.destination,
      weight: param.weight,
      courier: param.courier,
      price: 'lowest'
    })
    .then(result =>
      res.status(200).json({error: false, message: 'Successfully calculate shippping cost.', data: result.data.data})
    )
    .catch(error =>
      next(error)
    )

}

module.exports = {getProvince, getCities, getCosts}
