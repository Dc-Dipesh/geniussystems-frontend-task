import { Route, Routes } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import Subscribers from "./Subscribers";
import SubscriberDetail from "./SubscriberDetail";
import Analytics from "./Analytics";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="" index element={<Analytics />} />
        <Route path="subscribers/" element={<Subscribers />} />
        <Route path="subscribers/:id" element={<SubscriberDetail />} />
        <Route path="/*" element={<h1>notfound</h1>} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
