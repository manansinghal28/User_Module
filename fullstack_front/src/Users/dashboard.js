import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import LongMenu from '../muicomponents/LongMenu';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/user/${userId}`);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // If searchQuery is empty, load all users
      loadUsers();
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/user/search/${searchQuery}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 175 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <LongMenu id={params.row.id} onClick={() => handleDeleteUser(params.row.id)} />
      ),
    },
  ];

  return (
    <div className="container" style={{ width: '100%' }}>
      <h2 className="mt-3">Admin</h2>
      <div className="py-2" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // Handle Enter key press
              handleSearch();
            }
          }}
        />
        <button button onClick={handleSearch}>Search</button>
      </div>
      {/* <Link className='btn btn-outline-dark mx-1' to={`/SignIn`}>
                        Logout
                    </Link> */}
      <div className="py-2" style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pagination
          pageSize={9}
          autoHeight
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}