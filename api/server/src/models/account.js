'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
      Account.belongsTo(models.Group, {foreignKey: 'groupId', as: 'group'})
    }
  };
  Account.init({
    name: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    deposit: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};