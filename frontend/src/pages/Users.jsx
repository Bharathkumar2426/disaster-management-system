import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "PARTICIPANT",
  });

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("User deleted successfully.");

      loadUsers();
    } catch (error) {
      console.error(error);

      alert("Failed to delete user.");
    }
  }
  function handleEdit(user) {
    setIsEditMode(true);

    setSelectedUserId(user.id);

    setNewUser({
      fullName: user.fullName,
      email: user.email,
      password: "",
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

    setShowModal(true);
  }
  async function handleSaveUser() {
    try {
      if (isEditMode) {
        await updateUser(selectedUserId, newUser);

        alert("User updated successfully.");
      } else {
        await createUser(newUser);

        alert("User added successfully.");
      }

      loadUsers();

      setShowModal(false);

      setIsEditMode(false);

      setSelectedUserId(null);

      setNewUser({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "PARTICIPANT",
      });
    } catch (error) {
      console.error(error);

      alert("Operation failed.");
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            setIsEditMode(false);

            setSelectedUserId(null);

            setNewUser({
              fullName: "",
              email: "",
              password: "",
              phoneNumber: "",
              role: "PARTICIPANT",
            });

            setShowModal(true);
          }}
        >
          + Add User
        </button>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.fullName}</td>

                  <td>{user.email}</td>

                  <td>{user.phoneNumber}</td>

                  <td>{user.role}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>

                  <input
                    type="text"
                    className="form-control"
                    value={newUser.phoneNumber}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>

                  <select
                    className="form-select"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="ADMIN">ADMIN</option>

                    <option value="TRAINER">TRAINER</option>

                    <option value="PARTICIPANT">PARTICIPANT</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleSaveUser}>
                  {isEditMode ? "Update User" : "Save User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
