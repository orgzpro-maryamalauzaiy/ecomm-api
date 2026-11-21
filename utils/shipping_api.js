const axios = require('axios')

// Config Defaults Axios dengan RajaOngkir
axios.defaults.baseURL = process.env.SHIPPING_URL
axios.defaults.headers.common['key'] = process.env.SHIPPING_API_KEY
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports = axios
