import UserService from '../services/UserService'

export default class UsersController {
  static async getAllGroupUsers(req, res) {
    try {
      const usersList = await UserService.getAll(req.params.groupId);
      res.status(200).send(usersList)
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  static async login(req, res) {
    try {
      const user = await UserService.findUserByLoginId(req.body.loginId);
      if(!user) {
        res.status(400).send({field: 'loginId', message: 'Invalid LoginId'});
        return;
      }
      if(!UserService.validatePassword(user, req.body.password)) {
        res.status(400).send({field: 'password', message: 'Wrong password'});
        return;
      }
      res.status(200).send({token: UserService.generateToken(user)});
    }catch(error){
      res.status(500).send(error);
    }
  }
}
