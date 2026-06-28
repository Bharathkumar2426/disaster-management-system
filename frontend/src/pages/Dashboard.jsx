import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalDisasters: 0,
        totalTrainingCenters: 0,
        totalTrainingPrograms: 0,
    });

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

        loadDashboard();
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Dashboard</h2>

            <div className="row g-3">
                <div className="col-md-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body text-center">
                            <h5>Total Users</h5>
                            <h2>{dashboard.totalUsers}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-danger text-white">
                        <div className="card-body text-center">
                            <h5>Total Disasters</h5>
                            <h2>{dashboard.totalDisasters}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-success text-white">
                        <div className="card-body text-center">
                            <h5>Training Centers</h5>
                            <h2>{dashboard.totalTrainingCenters}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-warning text-dark">
                        <div className="card-body text-center">
                            <h5>Training Programs</h5>
                            <h2>{dashboard.totalTrainingPrograms}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;