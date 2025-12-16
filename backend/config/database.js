import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'memora_web_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// testar conexão
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Database connection failed:', err);
  } finally {
    if (connection) connection.release();
  }
}

testConnection();

export default pool;