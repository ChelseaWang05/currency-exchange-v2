import express from 'express';
import { getAllUsers,userFindOne,userUpdate,userInsert,userDelete } from '../controllers/userController.js';
const router = express.Router();

/* GET users listing. */
router.get('/',getAllUsers);
router.get('/:id',userFindOne);
router.delete('/:id',userDelete);
router.post('/',userInsert);
router.put('/:id',userUpdate);

export default router;
