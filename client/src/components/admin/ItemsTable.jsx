import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth';
import ItemsTableForm from './items/ItemsTableForm';
import ItemsTableSearch from './items/ItemsTableSearch';
import ItemsTableRow from './items/ItemsTableRow';

function ItemsTable({ items, fetchItems, apiItemsBase }) {
  const [sortItemsConfig, setSortItemsConfig] = useState({ key: null, direction: 'asc' });
  const [form, setForm] = useState({ name: '', price: '', category: '', image_url: '' });
  const [editId, setEditId] = useState(null);
  const [searchItemsTerm, setSearchItemsTerm] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const categories = Array.from(new Set(items.map((item) => item.category))).sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' && (parseInt(value) < 0 || parseInt(value) > 1000000)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category || parseInt(form.price) <= 0 || parseInt(form.price) > 1000000) {
      return alert('Please fill in Name, Price, and Category, with price between 1 and 1,000,000 Bells.');
    }

    const finalForm = {
      ...form,
      image_url: form.image_url.trim() || '/images/store/leaf.png',
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${apiItemsBase}/${editId}` : apiItemsBase;
    const wasEditing = !!editId;
    const token = getToken();

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(finalForm),
    })
      .then((response) => {
        const successMessage = response.ok
          ? wasEditing ? 'Item updated successfully!' : 'Item added successfully!'
          : 'Failed to add/edit item. Please try again.';
        if (response.ok) fetchItems();
        setFeedbackMessage(successMessage);
        alert(successMessage);
        if (response.ok) setForm({ name: '', price: '', category: '', image_url: '' });
        setEditId(null);
      })
      .catch(() => {
        setFeedbackMessage('Error occurred while saving item.');
        alert('Error occurred while saving item.');
      });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const token = getToken();
    fetch(`${apiItemsBase}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        const successMessage = response.ok ? 'Item deleted successfully!' : 'Failed to delete item. Please try again.';
        if (response.ok) fetchItems();
        setFeedbackMessage(successMessage);
        alert(successMessage);
      })
      .catch(() => {
        setFeedbackMessage('Error occurred while deleting item.');
        alert('Error occurred while deleting item.');
      });
  };

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => setFeedbackMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const sortedItems = [...items].sort((a, b) => {
    if (!sortItemsConfig.key) return 0;
    const valA = sortItemsConfig.key === 'price' ? parseFloat(a[sortItemsConfig.key]) : a[sortItemsConfig.key].toString().toLowerCase();
    const valB = sortItemsConfig.key === 'price' ? parseFloat(b[sortItemsConfig.key]) : b[sortItemsConfig.key].toString().toLowerCase();
    if (valA < valB) return sortItemsConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortItemsConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter((item) => {
    const searchTerm = searchItemsTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.price.toString().includes(searchTerm)
    );
  });

  return (
    <div>
      <h3 className="text-center mb-4 mt-3">Items</h3>

      <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
        {feedbackMessage && (
          <div className="alert alert-info text-center shadow rounded-pill px-4 py-2">
            {feedbackMessage}
          </div>
        )}
      </div>

      <ItemsTableSearch searchItemsTerm={searchItemsTerm} setSearchItemsTerm={setSearchItemsTerm} />
      <ItemsTableForm
        form={form}
        setForm={setForm}
        categories={categories}
        handleSubmit={handleSubmit}
        editId={editId}
        handleChange={handleChange}
      />
      
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle text-center">
          <thead className="table-danger">
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => setSortItemsConfig({ key: 'name', direction: sortItemsConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                Name
                {sortItemsConfig.key === 'name' ? (sortItemsConfig.direction === 'asc' ? ' ↑' : ' ↓') : null}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => setSortItemsConfig({ key: 'price', direction: sortItemsConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                Price
                {sortItemsConfig.key === 'price' ? (sortItemsConfig.direction === 'asc' ? ' ↑' : ' ↓') : null}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => setSortItemsConfig({ key: 'category', direction: sortItemsConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                Category
                {sortItemsConfig.key === 'category' ? (sortItemsConfig.direction === 'asc' ? ' ↑' : ' ↓') : null}
              </th>
              <th>Image</th>
              <th style={{ width: '130px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ItemsTableRow key={item.id} item={item} handleEdit={handleEdit} handleDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="5">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsTable;