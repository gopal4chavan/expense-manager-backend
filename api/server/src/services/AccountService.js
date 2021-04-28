import database from '../models';

export default class AccountService {
  static async create(account, userId, groupId) {
    return await database.Account.create({
      ...account,
      userId: userId,
      groupId: groupId
    });
  }

  static async getAll(userId) {
    return await database.Account.findAll({
      where: {userId},
      attributes: ['id', 'name', 'balance', 'deposit', 'userId', 'groupId'],
      order: database.sequelize.col('id'),
    });
  }
  
  static async findAccount(accountId) {
    return await database.Account.findByPk(accountId);
  }

  static async getAllAccounts(userId) {
    return await database.Account.findAll({where: {
      userId: userId
    }})
  }

  static async updateBalance(account, amount, transaction = null) {
    return await account.update({
      balance: parseInt(account.balance) + parseInt(amount)
    }, {transaction});
  }

  static async updateDeposit(account, amount) {
    return await account.update({deposit: parseInt(account.deposit) + parseInt(amount)})
  }

}