import express from 'express';
import { getAllCurrencies, searchCurrencies, deleteCurrencies } from '../controllers/currencyController.js'; // Adjust the path as necessary

const routerc = express.Router();


// routerc.use(bodyParser.json());

/* API currency list. */
routerc.get('/', getAllCurrencies);
routerc.post('/search', searchCurrencies);
routerc.delete('/delete', deleteCurrencies); 

export default routerc;