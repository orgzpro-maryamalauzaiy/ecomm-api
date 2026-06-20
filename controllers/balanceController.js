const pool = require("../config/postgres")

const getBalance = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT total_price.sum() FROM orders WHERE order_status = 'successed' AND deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when get balance"})
    }

    if(rows.length == 0){
      return res.status(200).json({error: false, message: "Balance empty", balance: 0})
    }

    res.status(200).json({error: false, message: "Successfully get balance", balance: rows[0].sum})
  } catch (error) {
    return res.status(500).json({error: true, message: "Error when get balance: " + error})

  }
}

const getTotalTransaction = async (req, res) => {
  try {
    const {rows} = await pool.query(`SELECT total_price.sum() FROM orders WHERE order_status = 'successed' AND deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: false, message: "Error when get total transaction"})
    }

    res.status(200).json({error: false, message: "Successfully get total transaction", total: rows[0].count})

  } catch (error) {

    return res.status(400).json({error: true, message: "Error when get total transaction: " + error})

  }
}

const getAmountOfTransaction = async (req, res) => {
  try {

    const {rows} = await pool.query(`SELECT id.count() FROM orders WHEN order_status = 'successed' AND deleted_at is null`)

    if(!rows){
      return res.status(200).json({error: true, message: "Error when get amount of transactions"})
    }

    res.status(200).json({error: false, message: "Successfully get amount of transactions", amount: rows[0].count})

  } catch (error) {

  }
}

module.exports = {getBalance}