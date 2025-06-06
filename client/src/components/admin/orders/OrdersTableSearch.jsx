import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function OrderTableSearch({ searchOrdersTerm, setSearchOrdersTerm }) {
  return (
    <div className="row justify-content-center mb-3">
      <div className="col-md-4">
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6c757d',
            }}
          />
          <input
            className="form-control"
            style={{ paddingLeft: '30px' }}
            placeholder="Search orders..."
            value={searchOrdersTerm}
            onChange={(e) => setSearchOrdersTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderTableSearch;