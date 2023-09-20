const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'siddhanthkumar',
  password: '[REDACTED]',
  port: 5432,
  database: 'uci',
});

module.exports = pool;
