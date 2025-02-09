// React Frontend - UserManagement.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import NavigationBar3 from "../components/NavigationBar3";
import { toast } from "react-toastify";


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", id: null });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/create/getalluser",
        { 
          headers: { 
            "Authorization": `Bearer ${authtoken}` 
          } 
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const authtoken = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/create/delete/${id}`,
        { 
          headers: {
            "Authorization": `Bearer ${authtoken}`
          }
        }
      );
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

  const token = localStorage.getItem("token");

  const handleUpdateUser = async () => {
    const authToken = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (newUser.name && newUser.email && newUser.phone && newUser.role) { 
        try {
            const updatedData = {
                Name: newUser.name,
                Email: newUser.email,
                Phone: newUser.phone,
                Role: newUser.role
            };

            const response = await axios.put(
                `http://localhost:8080/create/updatebyadmin/${newUser.id}`,
                updatedData,
                { 
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Content-Type": "application/json", 
                    }
                }
            );

            const updatedUser = response.data;

            setUsers((prevUsers) => 
              prevUsers.map((user) => user.id === newUser.id ? updatedUser : user)
          );

            setEditingId(null);
            setNewUser({ name: "", email: "", role: "", phone: "", id: null });
            toast.success("User updated successfully!");
        } catch (error) {
          toast.error(`Error updating user: ${error.response?.data?.message || "Something went wrong!"}`);
      }
  } else {
      toast.warn("Please fill in all fields.");
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
      <NavigationBar3 />
      <div className="container">
        <h2>User Management</h2>

        {editingId !== null && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={newUser.name || ""} 
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email || ""} 
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
              value={newUser.phone || ""} 
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <select
              className="form-control"
              value={newUser.role || ""} 
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
