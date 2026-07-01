function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                background: "#2563eb",
                height: "70px",
                paddingLeft: "30px",
                paddingRight: "30px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >
            <div className="container-fluid p-0">

                <div>

                    <h4
                        className="text-white mb-0 fw-bold"
                    >
                        AI Disaster Management System
                    </h4>

                    <small
                        className="text-light"
                    >
                        Disaster Monitoring & Training Platform
                    </small>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;