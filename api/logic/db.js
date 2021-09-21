// import mysql from 'mysql'
const fs = require('fs')
const mysql = require('mysql')

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CA_PATH,
} = require('../config')

// ---------------------------------------------------------------
console.error('*** 開始 ***')

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    ca: fs.readFileSync(DB_CA_PATH),
    // ca: fs.readFileSync('./server-ca.pem'),
    // key: fs.readFileSync('./client-key.pem'),
    // cert: fs.readFileSync('./client-cert.pem'),
  },
}
// mysql -h pq1lwsw6eg33.us-west-2.psdb.cloud
// -u 296zgokoxqzh
// -ppscale_pw_170Ar3YmC_xpPl9-pbIqaX0y4tXWyZp7Z-LafROT2Eg
// --ssl-mode=VERIFY_IDENTITY --ssl-ca=/etc/ssl/cert.pem

// "mysql://<USERNAME>:<PLAIN TEXT PASSWORD>@<ACCESS HOST URL>/<your-db-name>?sslmode=require"

const handleDisconnect = () => {
  const connection = mysql.createConnection(config)
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack)
      return
    }
    console.log('connect success')
  })

  connection.query('SELECT VERSION()', (err, results, fields) => {
    if (err) throw err

    // for (const result of results) {
    //   console.log(result.one)
    // }
    console.log('rows', results)
    console.log('fields', fields)
  })

  module.exports = connection
}

// 接続を開始する.
handleDisconnect()
