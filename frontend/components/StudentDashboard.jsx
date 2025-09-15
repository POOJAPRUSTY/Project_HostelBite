// components/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
// import AttendanceCard from "./AttendanceCard";
// import PaymentsCard from "./PaymentsCard";
// import MenuCard from "./MenuCard";
import axios from "axios";

const StudentDashboard = () => {
  const [ī, setī] = useState("Student");
  const [attendance, setAttendance] = useState({});
  const [payments, setPayments] = useState([]);
  const [menu, setMenu] = useState({});
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    // Fetch student info, attendance, payments, menu
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://localhost:5000/api/student/profile", { headers })
      .then((res) => setī(res.data.name))
      .catch(console.error);
    axios.get("http://localhost:5000/api/student/attendance", { headers })
      .then((res) => setAttendance(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/student/payments", { headers })
      .then((res) => setPayments(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/student/menu", { headers })
      .then((res) => setMenu(res.data))
      .catch(console.error);
  }, []);

  const handleNavigate = (view) => {
    if (view === "logout") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      setCurrentView(view);
    }
  };

  return (
    <div className="flex">
      <Sidebar onNavigate={handleNavigate} />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar studentName={ī} />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentView === "dashboard" && (
            <>
              <AttendanceCard attendance={attendance} />
              <PaymentsCard payments={payments} />
              <MenuCard menu={menu} />
            </>
          )}
          {currentView === "attendance" && <AttendanceCard attendance={attendance} />}
          {currentView === "payments" && <PaymentsCard payments={payments} />}
          {currentView === "menu" && <MenuCard menu={menu} />}
          {/* You can add Feedback / Complaints cards similarly */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
