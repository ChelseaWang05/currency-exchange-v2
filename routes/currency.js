import express from 'express';
import { getAllCurrencies, searchCurrencies, addCurrency, deleteCurrencies } from '../controllers/currencyController.js'; // Adjust the path as necessary

const routerc = express.Router();


// routerc.use(bodyParser.json());

/* API currency list. */
routerc.get('/', getAllCurrencies);
routerc.post('/search', searchCurrencies);
routerc.post('/', addCurrency);
routerc.delete('/', deleteCurrencies); 

export default routerc;