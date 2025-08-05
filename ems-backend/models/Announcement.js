module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define("Announcement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  return Announcement;
};
