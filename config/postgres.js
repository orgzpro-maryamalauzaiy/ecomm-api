const pkg = require("pg")
// import pkg from "pg"
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
// const DB_URI = process.env.DB_PG_URI
// const connectionString = DB_URI

const { Pool } = pkg
dotenv.config()

// const pool = new Pool({
//   connectionString
// })

const ca_fileName = "../ca-cert-postgres-database/ca.pem"
const ca_filePath = path.join(__dirname, ca_fileName)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(ca_filePath, function(error, data) {
      if(error){
        console.log(error)
        return
      }

      return data.toString()
    })
    // ca: fs.readFileSync('./ca-cert-postgres-database/ca.pem', function(error, data) {
    //   if(error){
    //     console.log(error)
    //     return
    //   }

    //   return data.toString()
    // })
    // ca: fs.readFileSync('../ca-cert-postgres-database/ca.pem').toString()
  }
})

module.exports = {pool}

// pool.on('connect', () => {
//   console.log('Connection pool established with Database')
// })