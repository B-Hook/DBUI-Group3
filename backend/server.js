const express = require('express')
const app = express()
const port = 8000

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
  password: 'Ilikepie1673',
  database: 'DBUI'
})

connection.connect()


app.post('/login', (req, res) => {
  connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during the login process' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Perform login actions, such as setting a session or issuing a token
    res.status(200).json({
      username: req.body.username,
      userType: req.body.userType
    });
  });
}); 


// Surgeon login route
app.post('/login/surgeon', (req, res) => {
  connection.query(`SELECT * FROM users WHERE username = ? AND password = ? AND type = 'surgeon'`, [req.body.username, req.body.password], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during the login process' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Perform login actions, such as setting a session or issuing a token
    res.status(200).json({ username: req.body.username, userType: 'surgeon' });
  });
});

// Admin login route
app.post('/login/admin', (req, res) => {
  connection.query(`SELECT * FROM users WHERE username = ? AND password = ? AND type = 'admin'`, [req.body.username, req.body.password], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during the login process' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Perform login actions, such as setting a session or issuing a token
    res.status(200).json({ username: req.body.username, userType: 'admin' });
  });
});
app.get('/users', (req, res) => {
     connection.query(`SELECT * FROM users`, (err, rows, fields) => {
         if (err) throw err

        res.status(200)
        res.send(rows)
    })
});
app.get('/users/:id', (req, res) => {
  // Your code to fetch a specific user by ID
  connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows, fields) => {
    if (err) throw err

    res.status(200)
    res.send(rows)
  })
});
app.post('/users', (req, res) => {
  const { first_name, last_name, username, password, type, specialty } = req.body;

  // Check if the user type is valid
  const validUserTypes = ['surgeon', 'admin'];
  if (!validUserTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  // Your code to create a new user
  const query = `
    INSERT INTO users (first_name, last_name, username, password, type, specialty)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [first_name, last_name, username, password, type, specialty], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while creating the user' });
    }

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
});

app.put('/users/:id', (req, res) => {
  const { first_name, last_name, username, password, type, specialty } = req.body;
  const userId = req.params.id;

  const validUserTypes = ['surgeon', 'admin'];
  if (!validUserTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  const query = `
    UPDATE users
    SET first_name = ?, last_name = ?, username = ?, password = ?, type = ?, specialty = ?
    WHERE id = ?
  `;

  connection.query(query, [first_name, last_name, username, password, type, specialty, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while updating the user' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while deleting the user' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.get('/surgeries', (req, res) => {
  connection.query('SELECT * FROM surgeries', (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching surgeries' });
    }

    res.status(200).json(rows);
  });
});

app.get('/surgeries/:id', (req, res) => {
  const surgeryId = req.params.id;

  connection.query('SELECT * FROM surgeries WHERE id = ?', [surgeryId], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the surgery' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Surgery not found' });
    }

    res.status(200).json(rows[0]);
  });
});

app.post('/surgeries', (req, res) => {
  const { surgeon_id, patient_name, support_staff_number, date, time, duration, location, specialty } = req.body;

  const query = `
    INSERT INTO surgeries (surgeon_id, patient_name, support_staff_number, date, time, duration, location, specialty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [surgeon_id, patient_name, support_staff_number, date, time, duration, location, specialty], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while creating the surgery' });
    }

    res.status(201).json({ message: 'Surgery created successfully', surgeryId: result.insertId });
  });
});





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


app.listen(8080, () => console.log('API is running on http://localhost:8080/'));



// // Start server
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })