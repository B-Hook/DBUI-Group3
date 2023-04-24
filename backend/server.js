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
  password: 'CoolPasswordThanks',
  database: 'DBUI'
});

connection.connect()

app.post('/login', (req, res) => {
  connection.query('SELECT * FROM users WHERE username = ? AND password = ? AND type = ?', [req.body.username, req.body.password, req.body.userType], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred during the login process' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Get the user type from the query result
    const userType = rows[0].type;
    const username = rows[0].username;
    const id = rows[0].id;

    // Perform login actions, such as setting a session or issuing a token
    res.status(200).json({
      username: username,
      userType: userType,
      id: id
    });
  });
});
app.get('/surgeons', (req, res) => {
  connection.query(`SELECT * FROM users WHERE type = 'surgeon'`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});

app.get('/surgeons/:id', (req, res) => {
  connection.query('SELECT * FROM users WHERE id = ? AND type = "surgeon"', [req.params.id], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while retrieving the surgeon' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Surgeon not found' });
    }

    res.status(200).json(rows[0]);
  });
});

app.get('/surgeons/filter/specialty', (req, res) => {
  const { specialty } = req.query;

  connection.query('SELECT * FROM users WHERE specialty = ?', [specialty], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while filtering users by specialty' });
    }

    res.status(200).json(rows);
  });
});



app.post('/surgeons', (req, res) => {
  const { first_name, last_name, username, password, specialty } = req.body;
  const type = 'surgeon'

  // Check if the username already exists
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while checking for duplicate usernames' });
    }

    if (rows.length > 0) {
      return res.status(401).json({ error: 'Username already exists' });
    }

    // Create a new user
    const query = `
      INSERT INTO users (first_name, last_name, username, password, type, specialty)
      VALUES (?, ?, ?, ?, ?, ?)
      `;

    connection.query(query, [first_name, last_name, username, password, type, specialty], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while creating the surgeon' });
      }

      res.status(200).json({
        id: result.insertId,
        first_name,
        last_name,
        username,
        userType: type,
        specialty
      });
    });
  });
});
app.put('/surgeons/:id', (req, res) => {
  const { first_name, last_name, username, password, type, specialty } = req.body;
  const userId = req.params.id;

  const validUserTypes = ['surgeon'];
  if (!validUserTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  const query = `
    UPDATE users
    SET first_name = ?, last_name = ?, username = ?, password = ?, type = ?, specialty = ?
    WHERE id = ? AND type = 'surgeon'
  `;

  connection.query(query, [first_name, last_name, username, password, type, specialty, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while updating the surgeon' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Surgeon not found' });
    }

    res.status(200).json({ message: 'Surgeon updated successfully' });
  });
});

app.get('/surgeons/:id/pending_surgeries', (req, res) => {
  connection.query('SELECT * FROM surgeries WHERE surgeon_id = ? AND status = "pending"', [req.params.id], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the surgeon\'s pending surgeries' });
    }
    res.status(200).json(rows);
  });
});

app.get('/surgeons/:id/rejected_surgeries', (req, res) => {
  connection.query('SELECT * FROM surgeries WHERE surgeon_id = ? AND status = "rejected"', [req.params.id], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the surgeon\'s rejected surgeries' });
    }
    res.status(200).json(rows);
  });
});

app.get('/surgeons/:id/accepted_surgeries', (req, res) => {
  connection.query('SELECT * FROM surgeries WHERE surgeon_id = ? AND status = "accepted"', [req.params.id], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the surgeon\'s accepted surgeries' });
    }
    res.status(200).json(rows);
  });
});



app.delete('/surgeons/:id', (req, res) => {
  const userId = req.params.id;

  // Set surgeon_id to null for all surgeries associated with the surgeon
  connection.query('UPDATE surgeries SET surgeon_id = NULL WHERE surgeon_id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while updating the surgeries' });
    }

    // Delete the surgeon after updating the surgeries
    connection.query('DELETE FROM users WHERE id = ? AND type = "surgeon"', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the surgeon' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Surgeon not found' });
      }

      res.status(200).json({ message: 'Surgeon deleted successfully' });
    });
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
app.get('/surgeries/counts', (req, res) => {
  const countQuery = `SELECT status, COUNT(*) as count FROM surgeries GROUP BY status`;
  connection.query(countQuery, (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching surgery counts' });
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


app.get('/surgeons/:surgeon_id/surgeries', (req, res) => {
  const surgeon_id = req.params.surgeon_id;

  connection.query('SELECT * FROM surgeries WHERE surgeon_id = ?', [surgeon_id], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the surgeries' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Surgeries not found' });
    }

    res.status(200).json(rows);
  });
});

app.get('/surgeries/filter/location', (req, res) => {
  const { location } = req.query;

  connection.query('SELECT * FROM surgeries WHERE room_num = ?', [location], (err, rows, fields) => {
    if (err) {
      //console.error(err); 
      return res.status(500).json({ error: 'An error occurred while filtering surgeries by location' });
    }

    res.status(200).json(rows);
  });
});

app.get('/surgeries/filter/specialty', (req, res) => {
  const { specialty } = req.query;

  connection.query('SELECT * FROM surgeries WHERE specialty = ?', [specialty], (err, rows, fields) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while filtering surgeries by specialty' });
    }

    res.status(200).json(rows);
  });
});




app.post('/surgeries', (req, res) => {
  const { surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, notes } = req.body;

  const status = "pending";
  
  const query = `
    INSERT INTO surgeries (surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [(surgeon_id === '')?null:surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while creating the surgery' });
    }

    res.status(200).json({ message: 'Surgery created successfully', surgeryId: result.insertId });
  });
});
app.delete('/surgeries/:id', (req, res) => {
    const id = req.params.id;
  
    connection.query('DELETE FROM surgeries WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while deleting the surgery' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Surgery not found' });
      }
  
      res.status(200).json({ message: 'Surgery deleted successfully' });
    });
  });

app.put('/surgeries/:id', (req,res) => {
  const { surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes } = req.body;
  const surgeryId = req.params.id;


  const query = `
    UPDATE surgeries
    SET surgeon_id = ?, patient_name = ?, staff_num = ?, month = ?, day = ?, time = ?, duration = ?, room_num = ?, specialty = ?, status = ?, notes = ?
    WHERE id = ?
    `;

    connection.query(query, [(surgeon_id === '')?null:surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes, surgeryId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while updating the surgery'});
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Surgery not found' });
    }

    res.status(200).json(req.body);
  });
})


app.listen(8080, () => console.log('API is running on http://localhost:8080/'));