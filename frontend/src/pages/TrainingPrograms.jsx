import { useEffect, useState } from "react";
import {
  getTrainingPrograms,
  createTrainingProgram,
  updateTrainingProgram,
  deleteTrainingProgram,
} from "../services/trainingProgramService";

function TrainingPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedProgram, setSelectedProgram] = useState(null);

  const [programForm, setProgramForm] = useState({
    programName: "",
    trainerName: "",
    durationDays: "",
    startDate: "",
    endDate: "",
    maxParticipants: "",
    status: "Upcoming",
    description: "",
    trainingCenterId: "",
  });

  const loadPrograms = async () => {
    try {
      const response = await getTrainingPrograms();

      setPrograms(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleView = (program) => {
    setSelectedProgram(program);
    setShowViewModal(true);
  };

  const handleAddClick = () => {
    setEditing(false);
    setEditingId(null);
    setProgramForm({
      programName: "",
      trainerName: "",
      durationDays: "",
      startDate: "",
      endDate: "",
      maxParticipants: "",
      status: "Upcoming",
      description: "",
      trainingCenterId: "",
    });

    setShowAddModal(true);
  };
  const handleEdit = (program) => {
    setEditing(true);
    setEditingId(program.id);
    setSelectedProgram(program);

    setProgramForm({
      programName: program.programName,
      trainerName: program.trainerName,
      durationDays: program.durationDays,
      startDate: program.startDate,
      endDate: program.endDate,
      maxParticipants: program.maxParticipants,
      status: program.status,
      description: program.description,
      trainingCenterId: program.trainingCenterId,
    });

    setShowAddModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateTrainingProgram(editingId, programForm);

        alert("Program Updated Successfully");
      } else {
        await createTrainingProgram(programForm);

        alert("Program Added Successfully");
      }

      setShowAddModal(false);

      setEditing(false);

      setEditingId(null);

      setProgramForm({
        programName: "",
        trainerName: "",
        durationDays: "",
        startDate: "",
        endDate: "",
        maxParticipants: "",
        status: "Upcoming",
        description: "",
        trainingCenterId: "",
      });

      loadPrograms();
    } catch (error) {
      console.error(error);

      alert("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) return;

    try {
      await deleteTrainingProgram(id);

      alert("Program Deleted Successfully");

      loadPrograms();
    } catch (error) {
      console.error(error);

      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">Loading Programs...</h5>
      </div>
    );
  }

  const filteredPrograms = programs.filter(
    (program) =>
      program.programName.toLowerCase().includes(search.toLowerCase()) ||
      program.trainerName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Training Programs</h2>

          <p className="text-muted">Disaster Awareness & Skill Development</p>
        </div>

        <button className="btn btn-primary" onClick={handleAddClick}>
          + Add Program
        </button>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Program..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredPrograms.map((program) => (
          <div className="col-lg-6 mb-4" key={program.id}>
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              <div className="row g-0">
                <div className="col-2 bg-primary text-white text-center p-3">
                  <h2>{new Date(program.startDate).getDate()}</h2>

                  <h5>
                    {new Date(program.startDate).toLocaleString("default", {
                      month: "short",
                    })}
                  </h5>

                  <small>{new Date(program.startDate).getFullYear()}</small>
                </div>

                <div className="col-10">
                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="fw-bold">{program.programName}</h4>

                        <p className="text-muted mb-2">{program.description}</p>
                      </div>

                      <span
                        className={
                          program.status === "Active"
                            ? "badge bg-success h-25"
                            : program.status === "Upcoming"
                              ? "badge bg-warning text-dark h-25"
                              : "badge bg-secondary h-25"
                        }
                      >
                        {program.status}
                      </span>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <small className="text-muted">👨 TRAINER</small>
                          <h6 className="fw-bold">{program.trainerName}</h6>
                        </div>

                        <div>
                          <small className="text-muted">
                            🏢 TRAINING CENTER
                          </small>
                          <h6>{program.trainingCenterName}</h6>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <small className="text-muted">👥 PARTICIPANTS</small>
                          <h6>{program.maxParticipants}</h6>
                        </div>

                        <div>
                          <small className="text-muted">⏱ DURATION</small>
                          <h6>{program.durationDays} Days</h6>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleView(program)}
                      >
                        👁 View
                      </button>

                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => handleEdit(program)}
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(program.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showViewModal && selectedProgram && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h4>Training Program Details</h4>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Program Name</strong>
                    </p>
                    <p>{selectedProgram.programName}</p>

                    <p>
                      <strong>Trainer</strong>
                    </p>
                    <p>{selectedProgram.trainerName}</p>

                    <p>
                      <strong>Status</strong>
                    </p>
                    <p>{selectedProgram.status}</p>

                    <p>
                      <strong>Duration</strong>
                    </p>
                    <p>{selectedProgram.durationDays} Days</p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Participants</strong>
                    </p>
                    <p>{selectedProgram.maxParticipants}</p>

                    <p>
                      <strong>Training Center</strong>
                    </p>
                    <p>{selectedProgram.trainingCenterName}</p>

                    <p>
                      <strong>Start Date</strong>
                    </p>
                    <p>{selectedProgram.startDate}</p>

                    <p>
                      <strong>End Date</strong>
                    </p>
                    <p>{selectedProgram.endDate}</p>
                  </div>
                </div>

                <hr />

                <p>
                  <strong>Description</strong>
                </p>

                <p>{selectedProgram.description}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
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
                  {editing ? "Edit Program" : "Register New Training Program"}
                </h4>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Program Name</label>

                    <input
                      className="form-control"
                      value={programForm.programName}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          programName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Trainer Name</label>

                    <input
                      className="form-control"
                      value={programForm.trainerName}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          trainerName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label>Description</label>

                    <textarea
                      className="form-control"
                      rows="3"
                      value={programForm.description}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Training Center ID</label>

                    <input
                      type="number"
                      className="form-control"
                      value={programForm.trainingCenterId}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          trainingCenterId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Duration (Days)</label>

                    <input
                      type="number"
                      className="form-control"
                      value={programForm.durationDays}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          durationDays: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Maximum Participants</label>

                    <input
                      type="number"
                      className="form-control"
                      value={programForm.maxParticipants}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          maxParticipants: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Start Date</label>

                    <input
                      type="date"
                      className="form-control"
                      value={programForm.startDate}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>End Date</label>

                    <input
                      type="date"
                      className="form-control"
                      value={programForm.endDate}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Status</label>

                  <select
                    className="form-select"
                    value={programForm.status}
                    onChange={(e) =>
                      setProgramForm({
                        ...programForm,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Upcoming">Upcoming</option>

                    <option value="Active">Active</option>

                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleSave}>
                  {editing ? "Update Program" : "Save Program"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainingPrograms;
