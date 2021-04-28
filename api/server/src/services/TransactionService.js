import database from '../models';

export default class TransactionService {

  static async create(data, transaction = null) {
    return await database.Transaction.create({
      ...data
    }, {transaction});
  }
  
  static async getAll(options, order) {
    return await database.Transaction.findAll({
      where: options,
      order
    })
  }
}