// Currency model
import db from '../db.js'

class Currency {
    constructor(id, code, name, is_active = false) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.is_active = is_active;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            is_active: this.is_active
        };
    }

    static fromJSON(json) {
        return new Currency(
            json.id,
            json.code,
            json.name,
            json.is_active
        );
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM currency');
        return rows.map(row => Currency.fromJSON(row));
    }

    async insert() {
        const [result] = await db.query(
            'INSERT INTO currency (code, name, is_active) VALUES (?, ?, ?)',
            [this.code, this.name, this.is_active]
        );
        console.log('Insert result:', result);
        this.id = result.insertId;
        return this;
    }

    async update() {
        await db.query(
            'UPDATE currency SET code = ?, name = ?, is_active = ? WHERE id = ?',
            [this.code, this.name, this.is_active, this.id]
        );
        return this;
    }

    async delete() {
        await db.query('DELETE FROM currency WHERE id = ?', [this.id]);
        return this;
    }

    static async search(code=null, name=null, is_active=null) {
        let query = 'SELECT * FROM currency WHERE 1=1';
        const params = [];

        if (code) {
            query += ' AND code LIKE ?';
            params.push(`%${code}%`);
        }
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        if (is_active !== null) {
            query += ' AND is_active = ?';
            params.push(is_active);
        }

        const [rows] = await db.query(query, params);
        return rows.map(row => Currency.fromJSON(row));
    }
}

export default Currency;
