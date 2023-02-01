"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Schedules", {
      // currentNumber: DataTypes.INTEGER,
      // maxNumber: DataTypes.INTEGER,
      // date: DataTypes.DATE,
      // timeType: DataTypes.STRING,
      // doctorID: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currentNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      maxNumber: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      doctorID: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Schedules");
  },
};
