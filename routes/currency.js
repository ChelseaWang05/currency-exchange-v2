import express from 'express';
import { getAllCurrencies } from '../controllers/currencyController.js'; // Adjust the path as necessary

const routerc = express.Router();


// routerc.use(bodyParser.json());

/* API currency list. */
routerc.get('/currencies', getAllCurrencies);
routerc.post('/currencies/search', searchCurrencies);

export default routerc;