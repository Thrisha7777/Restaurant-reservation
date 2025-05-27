import express from 'express';
import { createReservation, cancelReservation, getReservations } from '../controllers/reservationController.js';

const router = express.Router();
router.post("/send_reservation", createReservation);
router.delete("/cancel", cancelReservation);
router.get("/admin/reservations", getReservations);

export default router;
