import { Route, Routes } from "react-router";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="" index element={<h1>Analytics</h1>} />
        <Route path="user/" element={<h1>Users</h1>} />
        <Route path="/*" element={<h1>notfound</h1>} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
