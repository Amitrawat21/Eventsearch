import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/event.js"
import bookingRoutes from "./routes/booking.js";
dotenv.config();

const app = express();

app.use(cors());
app.use( express.json() );

app.use( "/api/auth", authRoutes );
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
