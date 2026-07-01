import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDisasters: 0,
    totalTrainingCenters: 0,
    totalTrainingPrograms: 0,
  });

  const [recentDisasters, setRecentDisasters] = useState([]);
  const [recentPrograms, setRecentPrograms] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/dashboard");

        console.log("Dashboard Response:", response.data);

        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };
    async function loadRecentDisasters() {
      try {
        const response = await api.get("/dashboard/recent-disasters");

        console.log("Recent Disasters:", response.data);

        setRecentDisasters(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function loadRecentPrograms() {
      try {
        const response = await api.get("/dashboard/recent-programs");

        console.log("Recent Programs:", response.data);

        setRecentPrograms(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
    loadRecentDisasters();
    loadRecentPrograms();
  }, []);

  return (
    <div className="container-fluid px-0">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card bg-primary text-white shadow h-100">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{dashboard.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card bg-danger text-white shadow h-100">
            <div className="card-body text-center">
              <h5>Total Disasters</h5>
              <h2>{dashboard.totalDisasters}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card bg-success text-white shadow h-100">
            <div className="card-body text-center">
              <h5>Training Centers</h5>
              <h2>{dashboard.totalTrainingCenters}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card bg-warning text-dark shadow h-100">
            <div className="card-body text-center">
              <h5>Training Programs</h5>
              <h2>{dashboard.totalTrainingPrograms}</h2>
            </div>
          </div>
        </div>

        <div className="card mt-5">
          <div className="card-header bg-dark text-white">
            <h4 className="mb-0">Recent Disasters</h4>
          </div>

          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Disaster</th>

                  <th>District</th>

                  <th>Severity</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentDisasters.map((disaster) => (
                  <tr key={disaster.id}>
                    <td>{disaster.id}</td>

                    <td>{disaster.disasterName}</td>

                    <td>{disaster.district}</td>

                    <td>{disaster.severity}</td>

                    <td>{disaster.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Recent Training Programs</h4>
          </div>

          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Program</th>
                  <th>Trainer</th>
                  <th>Status</th>
                  <th>Training Center</th>
                </tr>
              </thead>

              <tbody>
                {recentPrograms.map((program) => (
                  <tr key={program.id}>
                    <td>{program.id}</td>

                    <td>{program.programName}</td>

                    <td>{program.trainerName}</td>

                    <td>{program.status}</td>

                    <td>{program.trainingCenterName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
