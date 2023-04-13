const express = require('express')
const app = express()
const port = 8000

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())

// app.post('/login', (req, res) => {
//     // check if the username and password exist in the database
//     // if they do send back the token below

//     res.status(200).json({
//       userName: req.body.userName,
//       userType: req.body.userType
//     });

//     // if not send back an error message

//     /*catch (err) {
//         console.error('Failed to authenticate user:', err);
//         res.status(500).json({ message: err.toString() });
//     }*/
// });

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

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

// // Connect to mysql
// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'CoolPasswordThanks',
//   database: 'DBUI'
// })

// connection.connect()

// // API routes
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.put('/parse', (req, res) => {
//     console.log(req.body)
    
//     try {
//         const { first, last, age, admin } = req.body
//         const name = `${first} ${last}`
//         const isAdmin = admin ? "is an admin" : "is not an admin"

//         res.status(200)
//         res.send(`${name} is ${age} years old and ${isAdmin}`)
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.get('/db', (req, res) => {
//     connection.query('SHOW TABLES', (err, rows, fields) =>{
//         if (err) throw err

//         console.log(rows)
//         res.status(200)
//         res.send(rows)
//     })
// })

// app.post('/user', (req, res) => {
//     const { username, password } = req.body
//     const query = `INSERT INTO users (first_name, last_name, age, admin) VALUES ('${first}', '${last}', ${age}, ${admin})`
//     connection.query(query, (err, rows, fields) => {
//         if (err) throw err

//         console.log(rows)
//         res.status(200)
//         res.send("Successfully added user!")
//     })
// })

// app.get('/users', (req, res) => {
//     connection.query(`SELECT * FROM users`, (err, rows, fields) => {
//         if (err) throw err

//         res.status(200)
//         res.send(rows)
//     })
// })

// app.put('/users/clear', (req, res) => {
//     connection.query(`DELETE FROM users`, (err, rows, fields) => {
//         if (err) throw err

//         res.status(200)
//         res.send("Successfully cleared users!")
//     })
// })

// // Start server
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })