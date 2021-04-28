import database from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {jwtSecret, month} from '../secret/secret';

export default class UserService {
  static async getAll(groupId) {
    return await database.User.findAll({
      where: {groupId: groupId},
      attributes: ['id', 'name', 'admin', 'loginId', 'groupId']
    });
  }

  static async create(user, password, groupId, transaction = null) {
    const passwordHash = bcrypt.hashSync(password, 8);
    return await database.User.create({
      groupId: groupId,
     ...user,
      passwordHash
    }, {transaction});
  }

  static async findUserById(userId) {
    return await database.User.findByPk(userId);
  }

  static async findUserByLoginId(loginId) {
    return await database.User.findOne({where: {loginId}});
  }

  static validatePassword(user, password) {
    return bcrypt.compareSync(password, user.passwordHash);
  }

  static generateToken(user) {
    return jwt.sign({
      id: user.id,
      loginId: user.loginId,
      name: user.name
    }, jwtSecret, {expiresIn: month});
  }
}
