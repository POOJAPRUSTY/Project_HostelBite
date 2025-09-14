// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">HostelBite</h2>
      <ul className="space-y-4">
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </li>
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("attendance")}
        >
          Attendance
        </li>
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("payments")}
        >
          Payments
        </li>
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("menu")}
        >
          Menu
        </li>
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("feedback")}
        >
          Feedback
        </li>
        <li
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => onNavigate("logout")}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
