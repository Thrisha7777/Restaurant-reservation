import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import reservationRoutes from './routes/reservation.js';
import adminRoutes from './routes/adminRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import statisticsRoutes from './routes/statisticsRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));


app.use("/reservation", reservationRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/menu", menuRoutes);
app.use('/admin/statistics', statisticsRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is working!" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log(`🚀 SERVER STARTED AT PORT ${port}`);
});
