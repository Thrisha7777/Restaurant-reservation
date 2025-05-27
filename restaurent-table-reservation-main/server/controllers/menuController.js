
import MenuItem from '../models/MenuItem.js';
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

export const addMenuItem = async (req, res) => {
  const { name, price, category, description } = req.body;

  try {
    const newItem = new MenuItem({ name, price, category, description });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add menu item' });
  }
};
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Item updated', item: updated });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item' });
  }
};
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
};
