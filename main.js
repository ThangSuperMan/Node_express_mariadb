const express = require('express')
const mariadb = require('mariadb')
const bodyParser = require('body-parser')
require('dotenv').config()

/*
 * Variables
 */
const app = express()
const port = 3001

/*
 * Middleware
 */

app.use(bodyParser.urlencoded({ extended: false }))

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'thangphan',
  password: process.env.DB_PASSWORD,
  connectionLimit: 2,
})

app.get('/test', async (req, res) => {
  let connect
  try {
    connect = await pool.getConnection()
    const rows = await connect.query('SELECT * FROM root_db.product')
    console.log(rows)
    const json = JSON.stringify(rows)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(json)
  } catch (e) {
    console.log('error here :>> ', e)
  }
})

app.listen(port, () => {
  console.log(`Server is listening on the port: ${port}`)
})

console.log('hello')
