import db from '../db.js'

class ExchangeRate {
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
        return new ExchangeRate(
            json.id,
            json.currency_id,
            json.base,
            json.date,
            json.rate
        );
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM exchange_rate');
        return rows.map(row => ExchangeRate.fromJSON(row));
    }

    async insert() {
        const [result] = await db.query(
            'INSERT INTO exchange_rate (currency_id, base, rate, date) VALUES (?, ?, ?, ?)',
            [this.currency_id, this.base, this.rate, this.date]
        );
        this.id = result.insertId;
        return this;
    }

    async update() {
        await db.query(
            'UPDATE exchange_rate SET currency_id = ?, base = ?, rate = ?, date = ? WHERE id = ?',
            [this.currency_id, this.base, this.rate, this.date, this.id]
        );
        return this;
    }

    async delete() {
        await db.query('DELETE FROM exchange_rate WHERE id = ?', [this.id]);
        return this;
    }

    static search(id = null, currency_id = null, base = null, date = null) {
        let query = 'SELECT * FROM exchange_rate WHERE 1=1';
        const params = [];

        if (id) {
            query += ' AND id = ?';
            params.push(id);
        }
        if (currency_id) {
            query += ' AND currency_id = ?';
            params.push(currency_id);
        }
        if (base) {
            query += ' AND base = ?';
            params.push(base);
        }
        
        if (date) {
            query += ' AND date = ?';
            params.push(date);
        } else {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const todayStr = `${yyyy}${mm}${dd}`;
            query += ' AND date = ?';
            params.push(todayStr);
        }

        return db.query(query, params).then(([rows]) => rows.map(row => ExchangeRate.fromJSON(row)));
    }
}

export default ExchangeRate