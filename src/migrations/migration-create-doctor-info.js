"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctor_info", {
      // key: DataTypes.STRING,
      // type: DataTypes.STRING,
      // value_en: DataTypes.STRING,
      // value_vi: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorID: {
        type: Sequelize.INTEGER,
      },
      clinicID: {
        type: Sequelize.INTEGER,
      },
      specialtyID: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctor_info");
  },
};
