const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',         
  database: 'user_auth',
  password: 'Yogeswaran',     
  port: 5432,    
});

module.exports = pool;
