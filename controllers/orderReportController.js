const pool = require('../config/postgres.js')


const getBalance = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT total_price.sum() FROM orders WHERE order_status = 'successed' AND deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when get balance"})
    }

    const cash_flows = await pool.query(`SELECT last_balance FROM cash_flows WHERE deleted_at is null`)

    if(!cash_flows.rows){
      return res.status(400).json({error: true, message: "Error when get balance"})
    }

    if(cash_flows.rows.length > 0 && cash_flows.rows[0].last_balance){
      return res.status(200).json({error: false, message: "Successfully get balance", balance: cash_flows.rows[0].last_balance})
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

    res.status(200).json({error: false, message: "Successfully get total transaction", total_transactions: rows[0].count})

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

    res.status(200).json({error: false, message: "Successfully get amount of transactions", amount_transactions: rows[0].count})

  } catch (error) {

  }
}


module.exports = {getBalance, getTotalTransaction, getAmountOfTransaction}