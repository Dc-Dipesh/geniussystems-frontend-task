import { Route, Routes } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import Subscribers from "./Subscribers";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="" index element={<h1>Analytics</h1>} />
        <Route path="subscribers/" element={<Subscribers />} />
        <Route path="/*" element={<h1>notfound</h1>} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
