function ItemsTableForm({ form, categories, handleSubmit, editId, handleChange }) {
    return (
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <input className="form-control" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              name="price"
              placeholder="Price"
              type="number"
              min="1"
              max="1000000"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select Category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="image_url"
              placeholder="Image URL (optional)"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1 d-grid">
            <button className={`btn rounded-pill ${editId ? 'btn-primary' : 'btn-success'}`} type="submit">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    );
  }
  
  export default ItemsTableForm;  