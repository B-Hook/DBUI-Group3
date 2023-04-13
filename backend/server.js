const express = require('express')
const app = express()
const port = 8000

const fs = require('fs');

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())

// Connect to mysql
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CoolPasswordThanks',
  database: 'DBUI',
  multipleStatements: true
})

connection.connect()

// API routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.put('/parse', (req, res) => {
    console.log(req.body)
    
    try {
        const { first, last, specialty, type, username, password } = req.body
        const name = `${first} ${last}`

        res.status(200)
        res.send(`${name} is the users name`)
    } catch (err) {
        console.log(err)
    }
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) =>{
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

app.post('/user', (req, res) => {
    const { first, last, specialty, type, username, password} = req.body
    const query = `INSERT INTO users (first_name, last_name, specialty, type, username, password) VALUES ('${first}', '${last}', '${specialty}', '${type}', '${username}', '${password}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send("Successfully added user!")
    })
})

app.get('/users', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

app.put('/users/clear', (req, res) => {
    connection.query(`DELETE FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send("Successfully cleared users!")
    })
})

// Start server
app.listen(port, () => {

    fs.readFile("DBUI.session.sql", (err, buff) => {
        // if any error
        if (err) {
            console.error(err);
            return;
        }
        
        // otherwise log contents
        console.log(buff.toString());

    });

    console.log(`Example app listening on port ${port}`)
})

app.post('/login', (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.userName}' AND password = '${req.body.password}'`, (err, rows, fields) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred during the login process' });
      }
  
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Perform login actions, such as setting a session or issuing a token
      res.status(200).json({ userName: req.body.userName,
                            userType: req.body.userType});
    });
  });