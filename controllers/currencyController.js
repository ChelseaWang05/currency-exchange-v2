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
  const { id, code, name, is_active } = req.body;

  Currency.search(id, code, name, is_active)
    .then(currencies => {
      res.json(currencies);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

export function addCurrency(req, res) {
  const { code, name, is_active } = req.body;

  const newCurrency = new Currency(null, code, name, is_active);

  newCurrency.insert()
    .then(currency => {
      res.status(201).json(currency);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

export function deleteCurrencies(req, res) {
  console.log("Deleting currencies with IDs:", req.body.ids);
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or empty IDs array" });
  }

  Promise.all(ids.map(id => {
    const currency = new Currency(id);
    return currency.delete();
  }))
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}
