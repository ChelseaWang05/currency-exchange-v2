import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise'

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  console.error('Current env values:');
  requiredEnvVars.forEach(varName => {
    console.error(`${varName}: ${process.env[varName] ? '[SET]' : '[NOT SET]'}`);
  });
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default db