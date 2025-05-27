import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageMenu.css'; 
const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5001/admin/menu');
      setMenuItems(response.data);
    } catch (err) {
      setError('Failed to load menu items');
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/admin/menu', form);
      setMenuItems([...menuItems, res.data.item]);
      setForm({ name: '', price: '', category: '', description: '' });
    } catch (err) {
      setError('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/admin/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Exquisite Italian Menu</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="add-form">
        <h3>Add New Item</h3>
        <form onSubmit={handleAddItem} className="menu-form">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="menu-grid">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div className="menu-category" key={category}>
            <h3 className="category-title">{category}</h3>
            <ul className="menu-items">
              {items.map((item) => (
                <li key={item._id} className="menu-item">
                  <div>
                    <span className="item-name">🍽️ {item.name}</span> - <span className="item-price">₹{item.price}</span>
                    <p className="item-description">{item.description}</p>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageMenu;
