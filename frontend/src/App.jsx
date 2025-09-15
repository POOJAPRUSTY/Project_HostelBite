import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "/components/LandingPage";
import LoginPage from "/components/LoginPage";
import StudentDashboard from "/components/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
