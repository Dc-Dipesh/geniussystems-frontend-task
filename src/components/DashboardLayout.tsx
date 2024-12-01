import React, { useState } from "react";
import "../assets/css/DashboardLayout.css";
import { Link, useLocation } from "react-router";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const Menus = [
    {
      name: "Analytics",
      link: "/dashboard",
    },
    {
      name: "Subscribers",
      link: "/dashboard/subscribers",
    },
  ];
  return (
    <div
      className={`dashboard ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            {Menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  className={pathname === menu.link ? "active" : ""}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
