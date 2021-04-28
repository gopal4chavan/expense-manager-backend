'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inviteToken: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      groupToken: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      active: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      receiverName: {
        type: Sequelize.STRING
      },
      reciverMailId: {
        type: Sequelize.STRING
      },
      groupName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      senderName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invitations');
  }
};