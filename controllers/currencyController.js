// Currency controller
import Currency from "../models/currency.js";

export function getAllCurrencies(req, res) {
  Currency.findAll()
    .then(currencies => {
      res.json(currencies);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

export function searchCurrencies(req, res) {
  const { code, name, is_active } = req.body;

  Currency.search(code, name, is_active)
    .then(currencies => {
      res.json(currencies);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

export async function putCurrency(req, res) {
  try {
    const _id = req.params.id;
    const { code, name, is_active } = req.body;   // already validated earlier
    const currency = new Currency(_id, code, name, is_active);
    await currency.update();                  // <‑‑ idempotent UPSERT

    // console.log(name,is_active);

    res.json(currency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}