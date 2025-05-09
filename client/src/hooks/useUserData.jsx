import { useState, useEffect } from 'react';

function useUserData() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUsers([]);
        return;
      }
      const res = await fetch(`${apiUrl}/api/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setErrorUsers(error.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loadingUsers,
    errorUsers,
    fetchUsers
  };
}

export default useUserData;