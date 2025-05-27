// controllers/statisticsController.js
import Reservation from '../models/reservationModel.js';

export const getStatistics = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    const totalReservations = reservations.length;

    const currentDate = new Date();
    const upcomingReservations = reservations.filter(r => new Date(r.date) >= currentDate).length;

    const timeFrequency = {};
    const dayFrequency = {};
    let totalTablesBooked = 0;

    reservations.forEach(r => {
      const time = r.time;
      const date = new Date(r.date).toLocaleDateString();
      const tables = r.numberOfTables || 1;

      timeFrequency[time] = (timeFrequency[time] || 0) + 1;
      dayFrequency[date] = (dayFrequency[date] || 0) + 1;
      totalTablesBooked += tables;
    });

    const mostPopularTime = Object.entries(timeFrequency).reduce((a, b) => a[1] > b[1] ? a : b, [])[0] || 'N/A';
    const mostReservedDay = Object.entries(dayFrequency).reduce((a, b) => a[1] > b[1] ? a : b, [])[0] || 'N/A';

    res.json({
      totalReservations,
      upcomingReservations,
      mostPopularTime,
      totalTablesBooked,
      mostReservedDay,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};
