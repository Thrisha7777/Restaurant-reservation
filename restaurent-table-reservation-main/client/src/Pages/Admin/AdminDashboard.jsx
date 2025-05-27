import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaClipboardList, FaUtensils, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { handleLogout } from '../../utils/logout';

// Chart.js imports
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showReservations, setShowReservations] = useState(false);
  const navigate = useNavigate();

  // Fetch reservations from backend API
  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5001/admin/reservations');
      console.log(response.data);  // Log the fetched data
      setReservations(response.data);
      setShowReservations(true);
    } catch (error) {
      console.log('Error fetching reservations:', error);  // Log error details
      setErrorMessage('Error fetching reservations.');
    }
  };

  // Helper functions for pie chart
  const getTimeSlotLabels = (reservations) => {
    const timeSlots = reservations.map(res => res.time);
    return [...new Set(timeSlots)];
  };

  const getTimeSlotCounts = (reservations) => {
    const counts = {};
    reservations.forEach(res => {
      counts[res.time] = (counts[res.time] || 0) + 1;
    });
    return Object.values(counts);
  };

  useEffect(() => {
    // Fetch reservations when the component loads
    fetchReservations();
  }, []);

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>BOOSHA</h2>
        <nav>
          <ul>
            <li onClick={fetchReservations}><FaClipboardList /> View Reservations</li>
            <li onClick={() => navigate('/admin/manage-menu')}><FaUtensils /> Manage Menu</li>
            <li onClick={() => navigate('/admin/statistic')}><FaChartBar /> View Statistics</li>
            <li onClick={() => handleLogout(navigate)}><FaSignOutAlt /> Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Admin! Here's what's happening today 👋</p>
        </header>

        <section className="dashboard-cards">
          <div className="card" onClick={fetchReservations}>
            <FaClipboardList className="card-icon" />
            <h3>View Reservations</h3>
          </div>
          <div className="card" onClick={() => navigate('/admin/manage-menu')}>
            <FaUtensils className="card-icon" />
            <h3>Manage Menu</h3>
          </div>
          <div className="card" onClick={() => navigate('/admin/statistic')}>
            <FaChartBar className="card-icon" />
            <h3>Statistics</h3>
          </div>
        </section>

        {showReservations && (
          <>
            <section className="reservation-list">
              <h2>Recent Reservations</h2>
              {errorMessage && <div className="error-message">{errorMessage}</div>}

              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Table Category</th> {/* Added Table Category Column */}
                  </tr>
                </thead>
                <tbody>
                  {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                      <tr key={reservation._id}>
                        <td>{reservation.firstName} {reservation.lastName}</td>
                        <td>{reservation.email}</td>
                        <td>{reservation.phone}</td>
                        <td>{reservation.date}</td>
                        <td>{reservation.time}</td>
                        <td>{reservation.tableCategory}</td> {/* Display Table Category */}
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6">No reservations available</td></tr>
                  )}
                </tbody>
              </table>
            </section>

            <section className="chart-section">
              <h2>Reservations by Time Slot</h2>
              <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <Pie
                  data={{
                    labels: getTimeSlotLabels(reservations),
                    datasets: [
                      {
                        label: 'Reservations',
                        data: getTimeSlotCounts(reservations),
                        backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56',
                          '#4BC0C0',
                          '#9966FF',
                          '#FF9F40'
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

