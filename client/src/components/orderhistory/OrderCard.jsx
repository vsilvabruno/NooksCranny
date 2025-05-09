function OrderCard({ order }) {
    const formattedDate = new Date(order.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  
    const capitalizeStatus = (status) => {
      if (!status) return '';
      return status.charAt(0).toUpperCase() + status.slice(1);
    };
  
    const getStatusClass = (status) => {
      switch (status) {
        case 'pending':
          return 'text-warning';
        case 'shipped':
          return 'text-primary';
        case 'completed':
          return 'text-success';
        default:
          return '';
      }
    };
  
    return (
      <div className="card shadow-sm p-3">
        <div className="mb-2 d-flex justify-content-between">
          <strong>Order #{order.id}</strong>
          <span className="text-muted">{formattedDate}</span>
        </div>
  
        <div className="mb-3 text-muted">
          <strong>Status: </strong>
          <span className={getStatusClass(order.status)}>
            {capitalizeStatus(order.status)}
          </span>
        </div>
  
        {order.items.map(item => (
          <div key={item.id} className="row align-items-center g-3 mb-2 border-bottom pb-2">
            <div className="col-auto">
              <img
                src={item.image_url || '/images/store/leaf.png'}
                alt={item.name}
                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-6 col-md-4">
              <h6 className="mb-1 text-capitalize">{item.name}</h6>
              <div className="text-muted">{item.price} Bells</div>
            </div>
            <div className="col-auto">
              <span className="fw-bold">x{item.quantity}</span>
            </div>
          </div>
        ))}
  
        <div className="text-end mt-2">
          <strong>Total: {order.total} Bells</strong>
        </div>
      </div>
    );
  }
  
export default OrderCard;  