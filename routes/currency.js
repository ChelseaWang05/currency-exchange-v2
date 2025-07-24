import express from 'express';


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* PUT home page. */
router.put('/:code/:date', putRate);

export default router;

