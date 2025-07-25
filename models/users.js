import db from '../db.js'

class Users{
    constructor(userId,name,password,email,register_time){
        this._userId = userId
        this._name = name
        this._password = password
        this._email = email
        this._register_time = register_time
    }

    toJSON(){
        return{
            userId:this._userId,
            name: this._name,
            email:this._email,
            register_time:this._register_time
        };
    }

    static fromJSON(json){
        return new Users(
            json.userId,
            json.name,
            json.email,
            json.register_time
        )
    }

    static async userFindAll(){
        const [rows] = await db.query('SELECT * FROM user');
        return rows.map(row=>Users.fromJSON(row))
    }

    static async userFindOne(userid) {
        try {
            const [rows] = await db.query('SELECT * FROM user WHERE userid = ?', [userid]);
            if (rows.length === 0) {
                return { error: "User not found" };
            }
            return rows[0];
        } catch (error) {
            console.error('Database error:', error);
            return { error: "Database query failed" };
        }
    }


    static async userInsert(name, email, password,register_time){
        const [result] = await db.query(
            'INSERT INTO user (name,email,password,register_time) VALUES (?,?,?,?)',
            [name, email, password,register_time]
        );
        this._userId = result.userId

        return this; // return object
    }


    static async userUpdate(userid,name,password,email) {
        // console.log('Executing SQL to update user email:', userid, password,email);
        await db.query(
            'UPDATE user SET email = ?, name = ?, password = ? WHERE userid = ?',
            [email,name,password,userid]
        );
        return { message: 'User updated successfully', email,name,password,userid};
    }

    static async userDelete(userid) {
        await db.query('DELETE FROM user WHERE userid = ?', [userid]);
        return this;
    }

    static async search(email=null, name=null) {
        let query = 'SELECT * FROM user WHERE 1=1';
        const params = [];

        if (email) {
            query += ' AND email LIKE ?';
            params.push(`%${email}%`);
        }
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }

        const [rows] = await db.query(query, params);
        return rows.map(row => Users.fromJSON(row));
    }


}

export default Users;