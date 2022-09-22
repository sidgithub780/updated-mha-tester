const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// create

app.post('/person', async (req, res) => {
  try {
    const {name, id, home_number, mobile_number} = req.body;
    const newPerson = await pool.query(
      'INSERT INTO person (name, id, home_number, mobile_number) VALUES($1, $2, $3, $4) RETURNING *',
      [name, id, home_number, mobile_number],
    );
    res.json(newPerson.rows);
    console.log('sent');
  } catch (e) {
    console.log(e.message);
  }
});

app.post('/calls', async (req, res) => {
  try {
    const {
      user_id,
      time,
      duration,
      friend_phone,
      rawtype,
      call_type,
      friend_id,
    } = req.body;
    const newCall = await pool.query(
      'INSERT INTO calls (user_id, time, duration, friend_phone, rawtype, call_type, friend_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, time, duration, friend_phone, rawtype, call_type, friend_id],
    );

    console.log(res.json(newCall.rows));
  } catch (e) {
    console.log(e);
  }
});

//get

app.get('/person', async (req, res) => {
  try {
    const allPersons = await pool.query('SELECT * FROM person');
    res.json(allPersons.rows);
  } catch (e) {
    console.log(e.message);
  }
});

app.get('/calls', async (req, res) => {
  try {
    const allCalls = await pool.query('SELECT * FROM calls');
    res.json(allCalls.rows);
  } catch (e) {
    console.log(e);
  }
});

//udpate

app.put('/person/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const updatePerson = await pool.query(
      'UPDATE person SET name = $1 WHERE id = $2',
      [name, id],
    );
    res.json('todo was updated');
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(8921, () => {
  console.log('server has started');
});
