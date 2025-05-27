import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatisticPage.css';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/admin/statistics');
        setStats(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch statistics');
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!stats) {
    return <div className="loading">Loading statistics...</div>;
  }

  const pieData = [
    { name: 'Upcoming Reservations', value: stats.upcomingReservations },
    { name: 'Total Tables Booked', value: stats.totalTablesBooked },
  ];

  const barData = stats.reservationTrends || [
    { date: '2025-04-01', count: 5 },
    { date: '2025-04-02', count: 7 },
    { date: '2025-04-03', count: 3 },
    { date: '2025-04-04', count: 6 },
  ];

  return (
    <div className="statistics-container">
      <h1>📊 Reservation Statistics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Reservations</h2>
          <p>{stats.totalReservations}</p>
        </div>
        <div className="stat-card">
          <h2>Upcoming Reservations</h2>
          <p>{stats.upcomingReservations}</p>
        </div>
        <div className="stat-card">
          <h2>Most Popular Time Slot</h2>
          <p>{stats.mostPopularTime}</p>
        </div>
        <div className="stat-card">
          <h2>Total Tables Booked</h2>
          <p>{stats.totalTablesBooked}</p>
        </div>
        <div className="stat-card">
          <h2>Most Reserved Day</h2>
          <p>{stats.mostReservedDay}</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>📈 Reservations Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h2>🧁 Reservation Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <button className="back-btn" onClick={() => navigate('/admin')}>⬅ Back to Dashboard</button>
    </div>
  );
};

export default StatisticsPage;
