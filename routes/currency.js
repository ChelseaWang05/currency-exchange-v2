import express from 'express';
import { getAllCurrencies, searchCurrencies, putCurrency } from '../controllers/currencyController.js'; // Adjust the path as necessary

const router = express.Router();

// routerc.use(bodyParser.json());

/* API currency list. */
router.get('/', getAllCurrencies);
router.post('/search', searchCurrencies);
// routerc.getSearch('/getSearch', (req, res) => {
//   res.send('respond with a resource');
// });

router.put('/:id', putCurrency);

export default router;
