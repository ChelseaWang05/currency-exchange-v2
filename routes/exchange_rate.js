import express from 'express';
import { getAllExchangeRates } from '../controllers/exchangeRateController.js';

const router = express.Router();

/* API exchange rate list. */
router.get('/', getAllExchangeRates);

router.put('/rate')

export default router;
