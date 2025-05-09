const itemsService = require('../services/items-service');

exports.getItems = async (req, res) => {
  const { category, search } = req.query;

  try {
    const items = await itemsService.getItems(category, search);
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

exports.addItem = async (req, res) => {
  const { name, price, category, image_url } = req.body;

  try {
    await itemsService.addItem(name, price, category, image_url);
    res.json({ message: 'Item added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image_url } = req.body;

  try {
    await itemsService.updateItem(id, name, price, category, image_url);
    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await itemsService.deleteItem(id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};