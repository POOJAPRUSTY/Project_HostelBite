import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "/frontend/components/LandingPage";
import LoginPage from "/frontend/components/LoginPage";
import StudentDashboard from "/frontend/components/StudentDashboard";
import SignupPage from "/frontend/components/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
