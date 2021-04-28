import database from '../models';
import crypto from 'crypto';

export default class GroupService {
  static async create(groupName, transaction = null) {
    return await database.Group.create({
      groupName, 
      token: crypto.randomBytes(64).toString('hex')
    }, {transaction});
  }
}