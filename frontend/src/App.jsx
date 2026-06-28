import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Disasters from "./pages/Disasters";
import TrainingCenters from "./pages/TrainingCenters";
import TrainingPrograms from "./pages/TrainingPrograms";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <MainLayout>
                            <Users />
                        </MainLayout>
                    }
                />

                <Route
                    path="/disasters"
                    element={
                        <MainLayout>
                            <Disasters />
                        </MainLayout>
                    }
                />

                <Route
                    path="/training-centers"
                    element={
                        <MainLayout>
                            <TrainingCenters />
                        </MainLayout>
                    }
                />

                <Route
                    path="/training-programs"
                    element={
                        <MainLayout>
                            <TrainingPrograms />
                        </MainLayout>
                    }
                />

                <Route path="/login" element={<Login />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;