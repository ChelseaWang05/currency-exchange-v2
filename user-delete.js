import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

// get
app.get("/user", async (req, res) => {
    try {
      const [results] = await pool.query("SELECT * FROM user");
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/user/:userid', async (req, res) => {
    try {
      const [results] = await pool.query("SELECT * FROM user WHERE userid = ?", [req.params.userid]);
      res.json(results[0] || {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//get based on id
app.get('/user/:userid', (req, res) => { 
    connection.query(
        `SELECT * FROM user where userid = ${req.params.userid}`, 
        (error, results, fields) => { res.json(results[0]); }
    ); 
});

//delete 
app.delete('/user/:userid', async (req, res) => {
    try {
      await pool.query("DELETE FROM user WHERE userid = ?", [req.params.userid]);
      res.json({ message: "User deleted (if existed)" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//post
app.post("/user", async (req, res) => {
    const { name, email, password, register_time } = req.body;
    const sql = "INSERT INTO user (name, email, password, register_time) VALUES (?, ?, ?, ?)";
      
    try {
        await pool.query(sql, [name, email, password, register_time]);
        res.status(201).json({ message: "New user added" });
    } catch (error) {
          res.status(500).json({ error: error.message });
        }
});

//update
app.put("/user/:userid", async (req, res) => {
    const { name, email, password, register_time } = req.body;
    const userid = req.params.userid;
  
    const sql = `
      UPDATE user 
      SET name = ?, email = ?, password = ?, register_time = ?
      WHERE userid = ?
    `;
  
    try {
      const [result] = await pool.query(sql, [name, email, password, register_time, userid]);
      res.json({ message: result.affectedRows > 0 ? "User updated" : "User not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

//start the server 
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
