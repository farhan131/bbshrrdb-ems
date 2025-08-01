const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { syncDb } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ROUTES
const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const taskRoutes = require("./routes/task.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const deliverableRoutes = require("./routes/deliverable.routes");
const documentRoutes = require("./routes/document.routes");
const explanationRoutes = require("./routes/explanation.routes");
const messageRoutes = require("./routes/message.routes");
const profileRoutes = require("./routes/profile.routes");
const showCauseRoutes = require("./routes/showCause.routes");
const transferPostingRoutes = require("./routes/transferPosting.routes");
// Add other routes here as needed...

// Route Mapping
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/deliverables", deliverableRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/explanations", explanationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/showCause", showCauseRoutes);
app.use("/api/transferPosting", transferPostingRoutes);
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
// Add more here...

// Sync DB
syncDb().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ DB sync failed:", err);
});
