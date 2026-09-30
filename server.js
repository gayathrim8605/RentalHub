const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("MONGO_URL starts with:", process.env.MONGO_URL?.substring(0, 14));
const authRoutes = require("./routes/authRoutes");

const equipmentRoutes = require("./routes/equipmentRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/equipment",equipmentRoutes);
app.get("/", (req, res) => {
    res.send("RentalHub Backend is Running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});