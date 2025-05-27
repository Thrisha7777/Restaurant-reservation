import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './Pages/Home/Home';
import Reservation from './components/Reservation';
import Success from './Pages/Success/Success';
import NotFound from './Pages/NotFound/NotFound';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import MenuPage from './Pages/Menu/MenuPage';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageMenuComponent from './Pages/Admin/ManageMenu';
import StatisticsPage from './Pages/Admin/StatisticsPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ← New route for your reservation form */}
        <Route path="/reservation" element={<Reservation />} />

        <Route path="/success" element={<Success />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/menu" element={<MenuPage />} />          {/* 🍽️ Customer Menu */}
        <Route path="/admin" element={<AdminDashboard />} />   {/* 🔐 Admin Dashboard */}
        <Route path="/admin/manage-menu" element={<ManageMenuComponent />} /> {/* 🛠️ Admin Menu Manager */}
        <Route path="/admin/statistic" element={<StatisticsPage />} />
        <Route path="*" element={<NotFound />} />              {/* 404 Fallback */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
