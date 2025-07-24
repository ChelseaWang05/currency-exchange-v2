// exchange-rates helper function
import db from '../db.js'

class Rates {
    constructor(id, currency_id, base, date, rate) {
        this.id = id;
        this.currency_id = currency_id;
        this.base = base;
        this.date = date;
        this.rate = rate;
    }

    toJSON() {
        return {
            id: this.id,
            currency_id: this.currency_id,
            base: this.base,
            date: this.date,
            rate: this.rate
        };
    }

    static fromJSON(json) {
        return new Rates(
            json.id,
            json.currency_id,
            json.base,
            json.date,
            json.rate
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

export default RatesHelper;