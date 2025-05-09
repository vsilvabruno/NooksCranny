import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

function UsersTableRow({ user, handleDeleteUser }) {
  const getUsername = (email) => {
    if (email === 'tomnook@bell.ac') return 'Tom Nook';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <tr key={user.id}>
      <td>{getUsername(user.email)}</td>
      <td>{user.email}</td>
      <td>
        {user.email !== 'tomnook@bell.ac' && (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteUser(user.id)}
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
        )}
      </td>
    </tr>
  );
}

export default UsersTableRow;