const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { syncDb } = require("./models");

const employeeRoutes = require("./routes/employee.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

syncDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
