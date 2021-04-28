'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    }
  };
  Invitation.init({
    inviteToken: DataTypes.TEXT,
    groupToken: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    receiverName: DataTypes.STRING,
    reciverMailId: DataTypes.STRING,
    groupName: DataTypes.STRING,
    senderName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};