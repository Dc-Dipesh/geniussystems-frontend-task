import { Route, Routes } from "react-router";
import "./index.css";
import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

/**
 * The main application component that sets up the routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <App />
 *
 * @remarks
 * This component uses `react-router-dom` for routing and `react-hot-toast` for displaying toast notifications.
 *
 * @description
 * The `App` component defines the main routes of the application:
 * - `/` and `/login` routes render the `Login` component.
 * - `/dashboard/*` route renders the `Dashboard` component wrapped in a `ProtectedRoute` component to ensure authentication.
 *
 * The `Toaster` component is used to display toast notifications at the top-center of the screen.
 */
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
