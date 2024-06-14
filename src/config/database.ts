import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
})
