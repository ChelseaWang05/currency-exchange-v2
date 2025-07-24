// Currency model
import db from '../db.js'

class User {
    constructor(id, email, user_name) {
        this.id = id;
        this.email = email;
        this.user_name = user_name;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            user_name: this.user_name
        };
    }

    static fromJSON(json) {
        return new User(
            json.id,
            json.email,
            json.user_name
        );
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows.map(row => User.fromJSON(row));
    }

    async insert() {
        const [result] = await db.query(
            'INSERT INTO users (email, user_name) VALUES (?, ?)',
            [this.email, this.user_name]
        );
        this.id = result.insertId;
        return this;
    }

    async update() {
        await db.query(
            'UPDATE users SET email = ?, user_name = ? WHERE id = ?',
            [this.email, this.user_name, this.id]
        );
        return this;
    }

    async delete() {
        await db.query('DELETE FROM users WHERE id = ?', [this.id]);
        return this;
    }

    static async search(email=null, user_name=null) {
        let query = 'SELECT * FROM users WHERE 1=1';
        const params = [];

        if (email) {
            query += ' AND email LIKE ?';
            params.push(`%${email}%`);
        }
        if (user_name) {
            query += ' AND user_name LIKE ?';
            params.push(`%${user_name}%`);
        }

        const [rows] = await db.query(query, params);
        return rows.map(row => User.fromJSON(row));
    }
}

export default User;
