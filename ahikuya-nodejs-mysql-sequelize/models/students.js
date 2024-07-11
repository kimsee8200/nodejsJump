'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  students.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profile: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,    // createdAt, updatedAt 컬럼 없음
    modelName: 'students',
  });
  return students;
};