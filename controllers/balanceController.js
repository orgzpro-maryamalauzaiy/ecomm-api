const pool = require("../config/postgres")

const getBalances = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT * FROM cash_flows WHERE deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when get balance flows"})
    }

    if(rows.length == 0){
      return res.status(200).json({error: false, message: "All balance flows empty", flows: 0})
    }

    res.status(200).json({error: false, message: "Successfully get balance flows", flows: rows})
  } catch (error) {
    return res.status(500).json({error: true, message: "Error when get balance flows: " + error})

  }
}

const getTotalBalance = async (req, res) => {

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
const getAllDebit = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT total_debit.sum() FROM with_draws WHERE deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when all debit"})
    }

    if(rows.length == 0){
      return res.status(200).json({error: false, message: "Debit empty", debit: 0})
    }

    res.status(200).json({error: false, message: "Successfully get debit", debit: rows[0].sum})
  } catch (error) {
    return res.status(500).json({error: true, message: "Error when get debit: " + error})

  }
}

const getAllCredit = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT total_credit.sum() FROM with_draws WHERE deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when get all credit"})
    }

    if(rows.length == 0){
      return res.status(200).json({error: false, message: "Credit empty", balance: 0})
    }

    res.status(200).json({error: false, message: "Successfully get credit", credit: rows[0].sum})
  } catch (error) {
    return res.status(500).json({error: true, message: "Error when get credit: " + error})

  }
}
const getLastDebit = async (req, res) => {

  try {

    const {rows} = await pool.query(`SELECT last_debit FROM with_drwas WHERE deleted_at is null`)

    if(!rows){
      return res.status(400).json({error: true, message: "Error when get last debit"})
    }

    if(rows.length == 0){
      return res.status(200).json({error: false, message: "Last debit not found", balance: 0})
    }

    res.status(200).json({error: false, message: "Successfully get last debit", last_debit: rows[0].last_debit})
  } catch (error) {
    return res.status(500).json({error: true, message: "Error when get last_debit: " + error})

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

module.exports = {getBalances, getTotalBalance, getAllDebit, getAllCredit, getLastDebit}