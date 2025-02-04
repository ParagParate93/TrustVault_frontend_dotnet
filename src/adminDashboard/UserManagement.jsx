// React Frontend - UserManagement.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import NavigationBar2 from "../components/NavigationBar2";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", id: null });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/create/getalluser");
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/create/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleEditUser = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingId(id);
    setNewUser({ name: user.name || "", email: user.email || "", password: user.password || "", phone: user.phone || "", role: user.role || "", id: user.id });
  };

  const handleUpdateUser = async () => {
    if (newUser.name && newUser.email && newUser.password && newUser.phone && newUser.role) { // *********** Added validation ***********
      try {
        const updatedUser = await axios.put(`http://localhost:8080/create/update/${newUser.id}`, newUser);
        setUsers(
          users.map((user) =>
            user.id === editingId ? updatedUser.data : user
          )
        );
        setEditingId(null);
        setNewUser({ name: "", email: "", role: "", password: "", phone: "", id: null });
      } catch (error) {
        console.error("There was an error updating the user!", error);
      }
    } else {
      alert("Please fill in all fields."); // *********** Added alert for incomplete data ***********
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const role = user.role || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="user-dashboard-container">
      <NavigationBar2 />
      <div className="container">
        <h2>User Management</h2>

        {editingId !== null && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={newUser.name || ""} // ****** Ensured controlled component behavior ********
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email || ""} // ****** Ensured controlled component behavior ********
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              disabled
            />
            {/* <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={newUser.password || ""} // ****** Ensured controlled component behavior ********
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          /> */}
            <input
              type="phone"
              className="form-control"
              placeholder="Phone"
              value={newUser.phone || ""} // ****** Ensured controlled component behavior ********
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <select
              className="form-control"
              value={newUser.role || ""} // ****** Ensured controlled component behavior ********
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="ROLE_USER">ROLE_USER</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </select>
            <button className="btn btn-success" onClick={handleUpdateUser}>
              Update User
            </button>
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name, email, or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
