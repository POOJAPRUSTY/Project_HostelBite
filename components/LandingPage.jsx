import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ContactForm from "/components/ContactForm";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-900 text-white px-8 py-4 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold">HostelBite</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#home">Home</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#features">Features</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#about">About</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col bg-blue-900 text-white w-full text-center space-y-4 py-4 md:hidden">
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li className="hover:text-yellow-300 cursor-pointer"><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      )}

      {/* Hero Section */}
      <header
        id="home"
        className="flex flex-col items-center justify-center text-center flex-grow bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-20 px-6"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Simplify Hostel Mess Management 🍽️
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-3xl">
          HostelBite is a smart Hostel Mess Management System that helps
          admins and students manage attendance, payments, menu, feedback,
          complaints, staff, and expenses – all in one platform.
        </p>
        <div className="space-x-4">
          {/* Changed "Get Started" to "Login" */}
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("#features")}
            className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200"
          >
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-100" id="features">
        <h3 className="text-3xl font-bold text-center mb-10">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Attendance Tracking", desc: "Track daily attendance of students with accuracy." },
            { title: "Online Payments", desc: "Students can pay mess fees easily and securely." },
            { title: "Menu Updates", desc: "Weekly menu displayed and updated by admins." },
            { title: "Feedback & Complaints", desc: "Students can share feedback and raise complaints." },
            { title: "Staff Management", desc: "Admins can manage staff details, salary, and duty schedules." },
            { title: "Expenses & Revenue", desc: "Monitor mess expenses and track revenue efficiently." },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-white" id="about">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">About HostelBite</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            HostelBite is a modern solution designed to simplify the challenges
            of managing hostel mess operations. From handling student
            attendance and payments to tracking expenses and staff management,
            HostelBite ensures smooth communication between students and admins
            while increasing transparency and efficiency. 🚀
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8 bg-gray-100" id="contact">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
          <p className="text-gray-700 mb-8">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <ContactForm/>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} HostelBite | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
