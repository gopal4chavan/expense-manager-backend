'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
      Transaction.belongsTo(models.Group, {foreignKey: 'groupId', as: 'group'})
      Transaction.belongsTo(models.Account, {foreignKey: 'accountId', as: 'account'})
      Transaction.belongsTo(models.Transaction, {foreignKey: 'masterExpenseId', as: 'masterExpense'})
    }
  };
  Transaction.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    masterExpenseId: DataTypes.INTEGER,
    isMasterExpense: DataTypes.BOOLEAN,
    isExpenseActive: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};