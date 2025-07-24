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

export async function getExchangeRate(req, res) {
  const { from, to, date } = req.query;

  const fromExchangeRate = await ExchangeRate.search(null, from, null, date)
  const toExchangeRate = await ExchangeRate.search(null, to, null, date)
  console.log('fromExchangeRate', fromExchangeRate)
  console.log('toExchangeRate', toExchangeRate)

  if (fromExchangeRate.length === 0 || toExchangeRate.length === 0) {
    return res.status(404).json({ error: 'Exchange rate not found' })
  }

  const rate = fromExchangeRate[0].rate / toExchangeRate[0].rate
  res.json({
    from: from,
    to: to,
    rate: rate,
    date: date
  })
}