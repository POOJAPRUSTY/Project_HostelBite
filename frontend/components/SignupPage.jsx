import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    studentID: "",
    name: "",
    email: "",
    password: "",
    role: "student",
    course: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("✅ Signup successful! Please login.");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <input
          type="text"
          name="studentID"
          placeholder="Student ID"
          value={formData.studentID}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* Show Course input only for Students */}
        {formData.role === "student" && (
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4"
            required={formData.role === "student"}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
