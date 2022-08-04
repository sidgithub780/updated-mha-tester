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
  } catch (e) {
    console.log(e.message);
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
