import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Users", path: "/users" },
        { name: "Disasters", path: "/disasters" },
        { name: "Training Centers", path: "/training-centers" },
        { name: "Training Programs", path: "/training-programs" }
    ];

    return (

        <div
            style={{
                width: "240px",
                background: "#1f2937",
                color: "white",
                minHeight: "100vh",
                flexShrink: 0
            }}
        >

            <div
                className="text-center py-4 border-bottom"
                style={{
                    borderColor: "#374151"
                }}
            >

                <h3 className="fw-bold mb-0">

                    Disaster

                </h3>

                <small className="text-secondary">

                    Management System

                </small>

            </div>

            <div className="mt-4">

                {menuItems.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: "block",
                            padding: "14px 25px",
                            margin: "6px 12px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            color: "white",
                            background:
                                location.pathname === item.path
                                    ? "#2563eb"
                                    : "transparent",
                            transition: "0.3s"
                        }}
                    >

                        {item.name}

                    </Link>

                ))}

            </div>

        </div>

    );

}

export default Sidebar;