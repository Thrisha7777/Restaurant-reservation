export const handleLogout = (navigate) => {
    // Remove any stored tokens or session data
    localStorage.removeItem('adminToken');
  
    // Navigate to login page
    navigate('/admin-login');
  };