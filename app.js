import express from "express";
import cors from "cors";
import authRoutes from "./auth.js";

const app = express();

// Allow frontend to send cookies
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5173, () => console.log("Server running on port 5000"));
