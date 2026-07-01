import { useEffect, useState } from "react";
import {
  getTrainingCenters,
  createTrainingCenter,
  updateTrainingCenter,
  deleteTrainingCenter,
} from "../services/trainingCenterService";

function TrainingCenters() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCenter, setNewCenter] = useState({
    centerName: "",
    district: "",
    address: "",
    capacity: "",
    contactNumber: "",
    coordinatorName: "",
    status: "Active",
    latitude: "",
    longitude: "",
  });
  const loadCenters = async () => {
    try {
      const response = await getTrainingCenters();
      setCenters(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCenters();
  }, []);

  const handleView = (center) => {
    setSelectedCenter(center);
    setShowModal(true);
  };

  const handleEdit = (center) => {
    setIsEditMode(true);

    setEditingId(center.id);

    setNewCenter(center);

    setShowAddModal(true);
  };

  const handleAdd = async () => {
    try {
      if (isEditMode) {
        await updateTrainingCenter(editingId, newCenter);

        alert("Training Center Updated Successfully");
      } else {
        await createTrainingCenter(newCenter);

        alert("Training Center Added Successfully");
      }

      setShowAddModal(false);

      setIsEditMode(false);

      setEditingId(null);

      setNewCenter({
        centerName: "",
        district: "",
        address: "",
        capacity: "",
        contactNumber: "",
        coordinatorName: "",
        status: "Active",
        latitude: "",
        longitude: "",
      });

      loadCenters();
    } catch (error) {
      console.error(error);

      alert("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Training Center?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTrainingCenter(id);

      alert("Training Center deleted successfully.");

      loadCenters();
    } catch (error) {
      console.error(error);

      alert("Failed to delete Training Center.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Training Centers...</h5>
      </div>
    );
  }

  const filteredCenters = centers.filter(
    (center) =>
      center.centerName.toLowerCase().includes(search.toLowerCase()) ||
      center.district.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Training Centers</h2>
          <p className="text-muted">Manage Disaster Training Infrastructure</p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => {
            setIsEditMode(false);

            setEditingId(null);

            setNewCenter({
              centerName: "",
              district: "",
              address: "",
              capacity: "",
              contactNumber: "",
              coordinatorName: "",
              status: "Active",
              latitude: "",
              longitude: "",
            });

            setShowAddModal(true);
          }}
        >
          + Add Training Center
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow border-0 bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Centers</h5>

              <h1>{centers.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 bg-success text-white">
            <div className="card-body text-center">
              <h5>Active Centers</h5>

              <h1>{centers.filter((c) => c.status === "Active").length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 bg-warning">
            <div className="card-body text-center">
              <h5>Total Capacity</h5>

              <h1>{centers.reduce((sum, c) => sum + c.capacity, 0)}</h1>
            </div>
          </div>
        </div>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Training Center..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredCenters.map((center) => (
          <div className="col-lg-4 mb-4" key={center.id}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h4>{center.centerName}</h4>

                <hr />

                <p>
                  <strong>District:</strong>

                  {center.district}
                </p>

                <p>
                  <strong>Capacity:</strong>

                  {center.capacity}
                </p>

                <p>
                  <strong>Coordinator:</strong>

                  {center.coordinatorName}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={
                      center.status === "Active"
                        ? "badge bg-success"
                        : "badge bg-secondary"
                    }
                  >
                    {center.status}
                  </span>
                </p>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleView(center)}
                >
                  View
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(center)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(center.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedCenter && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h4>Training Center Details</h4>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Center Name:</strong>
                    </p>
                    <p>{selectedCenter.centerName}</p>

                    <p>
                      <strong>District:</strong>
                    </p>
                    <p>{selectedCenter.district}</p>

                    <p>
                      <strong>Address:</strong>
                    </p>
                    <p>{selectedCenter.address}</p>

                    <p>
                      <strong>Capacity:</strong>
                    </p>
                    <p>{selectedCenter.capacity}</p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Coordinator:</strong>
                    </p>
                    <p>{selectedCenter.coordinatorName}</p>

                    <p>
                      <strong>Contact:</strong>
                    </p>
                    <p>{selectedCenter.contactNumber}</p>

                    <p>
                      <strong>Status:</strong>
                    </p>
                    <p>{selectedCenter.status}</p>

                    <p>
                      <strong>Latitude:</strong>
                    </p>
                    <p>{selectedCenter.latitude}</p>

                    <p>
                      <strong>Longitude:</strong>
                    </p>
                    <p>{selectedCenter.longitude}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h4>
                  {isEditMode ? "Edit Training Center" : "Add Training Center"}
                </h4>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Center Name</label>

                    <input
                      className="form-control"
                      value={newCenter.centerName}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          centerName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>District</label>

                    <input
                      className="form-control"
                      value={newCenter.district}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          district: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Address</label>

                    <input
                      className="form-control"
                      value={newCenter.address}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Capacity</label>

                    <input
                      type="number"
                      className="form-control"
                      value={newCenter.capacity}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          capacity: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Contact Number</label>

                    <input
                      className="form-control"
                      value={newCenter.contactNumber}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Coordinator Name</label>

                    <input
                      className="form-control"
                      value={newCenter.coordinatorName}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          coordinatorName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Status</label>

                    <select
                      className="form-select"
                      value={newCenter.status}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Latitude</label>

                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      value={newCenter.latitude}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          latitude: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Longitude</label>

                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      value={newCenter.longitude}
                      onChange={(e) =>
                        setNewCenter({
                          ...newCenter,
                          longitude: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleAdd}>
                  {isEditMode ? "Update Center" : "Save Center"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainingCenters;
