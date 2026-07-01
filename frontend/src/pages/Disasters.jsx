import { useEffect, useState } from "react";
import {
  getDisasters,
  createDisaster,
  updateDisaster,
  deleteDisaster,
} from "../services/disasterService";

function Disasters() {
  const [disasters, setDisasters] = useState([]);
  const [filteredDisasters, setFilteredDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDisasterId, setSelectedDisasterId] = useState(null);

  const [newDisaster, setNewDisaster] = useState({
    disasterName: "",
    disasterType: "",
    district: "",
    location: "",
    severity: "MEDIUM",
    status: "ACTIVE",
    description: "",
    latitude: "",
    longitude: "",
  });
  const loadDisasters = async () => {
    setLoading(true);

    try {
      const response = await getDisasters();

      setDisasters(response.data);
      setFilteredDisasters(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisasters();
  }, []);

  useEffect(() => {
    const result = disasters.filter(
      (d) =>
        d.disasterName.toLowerCase().includes(search.toLowerCase()) ||
        d.district.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredDisasters(result);
  }, [search, disasters]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this disaster?")) return;

    try {
      await deleteDisaster(id);

      alert("Disaster deleted successfully.");

      loadDisasters();
    } catch (error) {
      console.error(error);

      alert("Delete failed.");
    }
  }
  function handleEdit(disaster) {
    setIsEditMode(true);

    setSelectedDisasterId(disaster.id);

    setNewDisaster({
      disasterName: disaster.disasterName,
      disasterType: disaster.disasterType,
      district: disaster.district,
      location: disaster.location,
      severity: disaster.severity,
      status: disaster.status,
      description: disaster.description,
      latitude: disaster.latitude,
      longitude: disaster.longitude,
    });

    setShowModal(true);
  }
  async function handleSave() {
    try {
      if (isEditMode) {
        await updateDisaster(selectedDisasterId, newDisaster);

        alert("Disaster updated successfully.");
      } else {
        await createDisaster(newDisaster);

        alert("Disaster reported successfully.");
      }

      setShowModal(false);

      setIsEditMode(false);

      setSelectedDisasterId(null);

      setNewDisaster({
        disasterName: "",
        disasterType: "",
        district: "",
        location: "",
        severity: "MEDIUM",
        status: "ACTIVE",
        description: "",
        latitude: "",
        longitude: "",
      });

      loadDisasters();
    } catch (error) {
      console.error(error);

      alert("Operation failed.");
    }
  }

  const total = disasters.length;
  const active = disasters.filter((d) => d.status === "ACTIVE").length;
  const controlled = disasters.filter(
    (d) => d.status === "UNDER_CONTROL",
  ).length;
  const high = disasters.filter((d) => d.severity === "HIGH").length;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger"></div>
        <h5 className="mt-3">Loading Disasters...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Disaster Management</h2>

        <button
          className="btn btn-danger"
          onClick={() => {
            setIsEditMode(false);

            setSelectedDisasterId(null);

            setNewDisaster({
              disasterName: "",
              disasterType: "",
              district: "",
              location: "",
              severity: "MEDIUM",
              status: "ACTIVE",
              description: "",
              latitude: "",
              longitude: "",
            });

            setShowModal(true);
          }}
        >
          + Report Disaster
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h6>Total Disasters</h6>

              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning shadow">
            <div className="card-body text-center">
              <h6>Active</h6>

              <h2>{active}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h6>Under Control</h6>

              <h2>{controlled}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark text-white shadow">
            <div className="card-body text-center">
              <h6>High Severity</h6>

              <h2>{high}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <input
              className="form-control w-25"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Disaster</th>
                <th>Type</th>
                <th>District</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDisasters.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>

                  <td>{d.disasterName}</td>

                  <td>{d.disasterType}</td>

                  <td>{d.district}</td>

                  <td>{d.severity}</td>

                  <td>{d.status}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(d.id)}
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
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Report New Disaster</h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Disaster Name</label>

                    <input
                      className="form-control"
                      value={newDisaster.disasterName}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          disasterName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Disaster Type</label>

                    <input
                      className="form-control"
                      value={newDisaster.disasterType}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          disasterType: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>District</label>

                    <input
                      className="form-control"
                      value={newDisaster.district}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          district: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Location</label>

                    <input
                      className="form-control"
                      value={newDisaster.location}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Severity</label>

                    <select
                      className="form-select"
                      value={newDisaster.severity}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          severity: e.target.value,
                        })
                      }
                    >
                      <option>LOW</option>
                      <option>MEDIUM</option>
                      <option>HIGH</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Status</label>

                    <select
                      className="form-select"
                      value={newDisaster.status}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>ACTIVE</option>
                      <option>UNDER_CONTROL</option>
                      <option>RESOLVED</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Latitude</label>

                    <input
                      type="number"
                      className="form-control"
                      value={newDisaster.latitude}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          latitude: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Longitude</label>

                    <input
                      type="number"
                      className="form-control"
                      value={newDisaster.longitude}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          longitude: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Description</label>

                    <textarea
                      rows="4"
                      className="form-control"
                      value={newDisaster.description}
                      onChange={(e) =>
                        setNewDisaster({
                          ...newDisaster,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={handleSave}>
                  Save Disaster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Disasters;
