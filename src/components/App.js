import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState(null); // null initially
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://reqres.in/api/users");
      setUsers(res.data.data); // array of users
    } catch (error) {
      setUsers([]); // treat as no data
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <h1>Blue Whales App</h1>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>

      {loading && <p>Loading...</p>}

      {!loading && users?.length === 0 && <p>No data found</p>}

      {!loading && Array.isArray(users) && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt="avatar" width="50" />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
