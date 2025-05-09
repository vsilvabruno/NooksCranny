import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ItemsTableRow({ item, handleEdit, handleDelete }) {
  return (
    <tr key={item.id}>
      <td className="text-start">
        {item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </td>
      <td>{item.price} Bells</td>
      <td>{item.category}</td>
      <td>
        <img src={item.image_url || '/images/store/leaf.png'} alt={item.name} width="50" />
      </td>
      <td>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default ItemsTableRow;