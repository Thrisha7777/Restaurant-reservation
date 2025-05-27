import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5001/admin/menu');
        setMenuItems(response.data);
      } catch (err) {
        setError('Failed to load menu items');
      }
    };

    fetchMenu();
  }, []);

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Exquisite Italian Menu</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="menu-grid">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div className="menu-category" key={category}>
            <h3 className="category-title">{category}</h3>
            <ul className="menu-items">
              {items.map((item) => (
                <li key={item._id} className="menu-item">
                  <span className="item-name">🍽️ {item.name}</span>
                  <span className="item-price">₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuPage;
