import express from 'express';
import { getAllCurrencies, searchCurrencies, addCurrency } from '../controllers/currencyController.js'; // Adjust the path as necessary

const routerc = express.Router();


// routerc.use(bodyParser.json());

/* API currency list. */
routerc.get('/', getAllCurrencies);
routerc.post('/search', searchCurrencies);
// routerc.getSearch('/getSearch', (req, res) => {
//   res.send('respond with a resource');
// });
routerc.post('/', addCurrency);

export default routerc;