import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

// const app = express();
// app.use(express.json());

// // get
// app.get("/user", async (req, res) => {
//     try {
//       const [results] = await pool.query("SELECT * FROM user");
//       res.json(results);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });

// //get based on id
// app.get('/user/:userid', async (req, res) => {
//     try {
//       const [results] = await pool.query("SELECT * FROM user WHERE userid = ?", [req.params.userid]);
//       res.json(results[0] || {});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });

// //delete 
// app.delete('/user/:userid', async (req, res) => {
//     try {
//       await pool.query("DELETE FROM user WHERE userid = ?", [req.params.userid]);
//       res.json({ message: "User deleted (if existed)" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });

// //post
// app.post("/user", async (req, res) => {
//     const { name, email, password, register_time } = req.body;
//     const sql = "INSERT INTO user (name, email, password, register_time) VALUES (?, ?, ?, ?)";
      
//     try {
//         await pool.query(sql, [name, email, password, register_time]);
//         res.status(201).json({ message: "New user added" });
//     } catch (error) {
//           res.status(500).json({ error: error.message });
//         }
// });

// //update
// app.put("/user/:userid", async (req, res) => {
//     const { name, email, password, register_time } = req.body;
//     const userid = req.params.userid;
  
//     const sql = `
//       UPDATE user 
//       SET name = ?, email = ?, password = ?, register_time = ?
//       WHERE userid = ?
//     `;
  
//     try {
//       const [result] = await pool.query(sql, [name, email, password, register_time, userid]);
//       res.json({ message: result.affectedRows > 0 ? "User updated" : "User not found" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  

//start the server 
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// // test
// fetch('http://localhost:3001/user')
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

// fetch('http://localhost:3001/user/1')  
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

// JavaScript code to send a POST request to insert a new user
// fetch('http://localhost:4000/users', {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//       name: "Vanya",
//       email: "newVanya@example.com",
//       password: "newpass456",
//       register_time:"2025-07-24 22:29:00"
//   })
// })
// .then(res => {
//   if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//   }
//   return res.json(); // Only attempt to parse JSON if response is OK
// })
// .then(data => console.log(data))
// .catch(err => console.error('Error:', err));



fetch('http://localhost:4000/users/19', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'NewSam',
          password: '12312312123',
          email: "newemail@example.com"  // New email to update
      })
      })
    .then(res => {
  if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json(); // Only attempt to parse JSON if response is OK
})
.then(data => console.log(data))
.catch(err => console.error('Error:', err));

// fetch('http://localhost:4000/users/12', {
//     method: 'DELETE'
//           })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
          
      
  
