import ExchangeRate from '../models/exchangeRate.js';

export function getAllExchangeRates(req, res) {
  ExchangeRate.findAll()
    .then(exchangeRates => {
      res.json(exchangeRates);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}