import express from 'express'; 
import bodyParser from 'body-parser';
import mysql from 'mysql';

//set up and configure express 
const app = express(); 
app.use(bodyParser.json());

//set up and intialize the database connection 
const connection = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "n3u3da!", 
    database: "currency_db" 
});

//connect to the database
connection.connect(error => {
    if (error) {
        console.error("Database connection failed:", error);
        return;
    }
    console.log("Connect to MySQL database.")
});


// get
app.get("/currency_db", (req,res) => { 
    connection.query("SELECT * FROM user", (error, results, fields) => { res.json(results); }); 
});

//get based on id
app.get('/currency_db/:userid', (req, res) => { 
    connection.query(
        `SELECT * FROM user where userid = ${req.params.userid}`, 
        (error, results, fields) => { res.json(results[0]); }
    ); 
});

//delete 
app.delete('/currency_db/:userid', (req, res) => {
    connection.query(
        `DELETE FROM compact_discs where userid = ${req.params.userid}`, 
        (error, results, fields) => { res.end(JSON.stringify({ message: "ok" })); }
    );
});

//post
app.post("/currency_db", (req, res) => { 
    let sql = "INSERT INTO compact_disc(name,email,password,register_name)"; 
    sql += `VALUES ('${req.body.name}','${req.body.email}',${req.body.password},${req.body.register_name})` 
    connection.query(sql, function(error, results, fields) { res.end(JSON.stringify({ message:"added new item"})); }); });

//update
app.put("/currency_db/:userid", (req, res) => {
    const { name, email, password, register_time } = req.body;
    const userid = req.params.userid;
  
    const sql = `
      UPDATE user 
      SET name = ?, email = ?, password = ?, register_time = ?
      WHERE userid = ?
    `;
  
    connection.query(sql, [name, email, password, register_time, userid], (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Database error", error });
      }
  
      res.json({ message: "User updated successfully (if exists)" });
    });
  });
  

//start the server 
app.listen(3000, () => { console.log("Server is running."); });

