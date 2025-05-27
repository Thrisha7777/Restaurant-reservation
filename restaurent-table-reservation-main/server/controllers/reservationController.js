import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time, tableCategory } = req.body;
    if (!firstName || !lastName || !email || !phone || !date || !time || !tableCategory) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newReservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      tableCategory,
    });
    await newReservation.save();

    res.status(201).json({ success: true, message: "Reservation successful!" });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelReservation = async (req, res) => {
  const { email, date, time, tableCategory } = req.body;
  const trimmedEmail = email.trim();
  const trimmedDate = date.trim();
  const trimmedTime = time.trim();
  const trimmedCategory = tableCategory.trim();
  if (!['Standard', 'Premium', 'VIP'].includes(trimmedCategory)) {
    console.log("Invalid tableCategory value:", trimmedCategory);
    return res.status(400).json({ success: false, message: "Invalid table category" });
  }

  try {
    const deleted = await Reservation.findOneAndDelete({
      email: trimmedEmail,
      date: trimmedDate,
      time: trimmedTime,
      tableCategory: trimmedCategory, 
    });

    if (!deleted) {
      console.log("No reservation found for the provided details.");
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }

    res.status(200).json({ success: true, message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
