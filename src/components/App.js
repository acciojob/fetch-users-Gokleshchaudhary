import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Optional CSS for layout

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://reqres.in/api/users");
      const data = response.data?.data || [];
      setUsers(data);
    } catch (err) {
      setError("Error fetching users");
      setUsers([]);
    }
    setLoading(false);
  };

  return (
    <div id="main">
      <h1>Blue Whales App</h1>
      <button className="btn" onClick={fetchUsers}>Get User List</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && users.length === 0 && !error && (
        <p>No data found</p>
      )}

      {!loading && users.length > 0 && (
        <table border="1">
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
