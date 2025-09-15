// components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
// import AttendanceMonitorCard from "./AttendanceMonitorCard";
// import StaffManagementCard from "./StaffManagementCard";
// import PaymentsOverviewCard from "./PaymentsOverviewCard";
// import MenuUpdateCard from "./MenuUpdateCard";
// import InventoryCard from "./InventoryCard";
// import ExpensesCard from "./ExpensesCard";
import axios from "axios";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [attendanceData, setAttendanceData] = useState({});
  const [staff, setStaff] = useState([]);
  const [payments, setPayments] = useState([]);
  const [menu, setMenu] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://localhost:5000/api/admin/profile", { headers })
      .then((res) => setAdminName(res.data.name))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/attendance", { headers })
      .then((res) => setAttendanceData(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/staff", { headers })
      .then((res) => setStaff(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/payments", { headers })
      .then((res) => setPayments(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/menu", { headers })
      .then((res) => setMenu(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/expenses", { headers })
      .then((res) => setExpenses(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/api/admin/inventory", { headers })
      .then((res) => setInventory(res.data))
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
        <Navbar studentName={adminName} />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentView === "dashboard" && (
            <>
              <AttendanceMonitorCard data={attendanceData} />
              <PaymentsOverviewCard payments={payments} />
              <MenuUpdateCard menu={menu} />
              <StaffManagementCard staff={staff} />
              <ExpensesCard expenses={expenses} />
              <InventoryCard inventory={inventory} />
            </>
          )}
          {currentView === "attendance" && <AttendanceMonitorCard data={attendanceData} />}
          {currentView === "staff" && <StaffManagementCard staff={staff} />}
          {currentView === "payments" && <PaymentsOverviewCard payments={payments} />}
          {currentView === "menu" && <MenuUpdateCard menu={menu} />}
          {currentView === "expenses" && <ExpensesCard expenses={expenses} />}
          {currentView === "inventory" && <InventoryCard inventory={inventory} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
