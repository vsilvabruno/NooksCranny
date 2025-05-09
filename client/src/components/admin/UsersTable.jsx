import { useState } from 'react';
import { getToken } from '../../utils/auth';
import UsersTableSearch from './users/UsersTableSearch';
import UsersTableRow from './users/UsersTableRow';

function UsersTable({ users, fetchUsers, apiUsersBase }) {
  const [sortUsersConfig, setSortUsersConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    const token = getToken();
    try {
      const response = await fetch(`${apiUsersBase}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete user. Please try again.');
      fetchUsers();
      alert('User deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting user');
    }
  };

  const handleUsersSort = (key) => {
    let direction = 'asc';
    if (sortUsersConfig.key === key && sortUsersConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortUsersConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortUsersConfig.key) return 0;
    const valA = a[sortUsersConfig.key].toString().toLowerCase();
    const valB = b[sortUsersConfig.key].toString().toLowerCase();
    if (valA < valB) return sortUsersConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortUsersConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-center mb-4 mt-3">Users</h3>

      <UsersTableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <table className="table table-striped table-hover align-middle text-center">
        <thead className="table-danger">
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleUsersSort('email')}
            >
              User
              {sortUsersConfig.key === 'email' &&
                (sortUsersConfig.direction === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleUsersSort('email')}
            >
              Email
              {sortUsersConfig.key === 'email' &&
                (sortUsersConfig.direction === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UsersTableRow key={user.id} user={user} handleDeleteUser={handleDeleteUser} />
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;