const sequelize = require("../config/db");
const Employee = require("./employee.model");

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected...");
    await sequelize.sync({ alter: true });
    console.log("Models synced...");
  } catch (err) {
    console.error("DB sync error:", err);
  }
};

module.exports = {
  sequelize,
  syncDb,
  Employee,
};
