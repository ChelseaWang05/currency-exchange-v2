import express from 'express';
import { getAllExchangeRates, getExchangeRate } from '../controllers/exchangeRateController.js';

const router = express.Router();

/* API exchange rate list. */
router.get('/', getAllExchangeRates)
router.get('/convert', getExchangeRate)

export default router;
