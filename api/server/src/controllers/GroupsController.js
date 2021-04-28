import database from '../models';
import GroupService from '../services/GroupService';
import UserService from '../services/UserService';

export default class GroupsController {
  static async createGroup(req, res) {
    const t = await database.sequelize.transaction();
    try {
      const {name, loginId, password, mailId, groupName} = req.body
      const group = await GroupService.create(groupName, t);
      const user = await UserService.create({name, loginId, mailId, admin: true}, password, group.id, t);
      await t.commit();
      res.status(201).send({message: 'group successfully create', token: UserService.generateToken(user)})
    } catch (error) {
      await t.rollback();
      const response = error.errors.map(item => { return {field: item.path, message: item.message}})
      res.status(500).send(response)
    }
  }
}

