import express from 'express';
import { getAllCurrencies, searchCurrencies } from '../controllers/currencyController.js'; // Adjust the path as necessary

const router = express.Router();

// routerc.use(bodyParser.json());

/* API currency list. */
router.get('/', getAllCurrencies);
router.post('/search', searchCurrencies);
// routerc.getSearch('/getSearch', (req, res) => {
//   res.send('respond with a resource');
// });

/* PUT home page. */
router.put('/:code/:date', putRate);

export default router;
