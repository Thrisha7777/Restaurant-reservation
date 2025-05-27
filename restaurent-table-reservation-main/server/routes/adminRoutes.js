import express from 'express';
import { adminLogin, getReservations } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);             
router.get('/reservations', getReservations);  

export default router;
