// Currency controller
import Currency from "../models/currency";

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
