import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { fullName, email, message };
      await axios.post("/api/contact", formData);
      alert("Message sent!");
      // Clear form after submission
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-4">
      <input
        type="text"
        placeholder="Your Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        rows="4"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
