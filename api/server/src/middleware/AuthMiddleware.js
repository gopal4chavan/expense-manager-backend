import UserService from "../services/UserService";
import {jwtSecret} from '../secret/secret';
import jwt from 'jsonwebtoken';


export default class AuthMiddleware {
  static async authenticateUser(req, res, next) {
    let token = req.headers['x-access-token'] || req.query.token || req.cookies["access-token"];
    if (!token){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    try{
        let decoded = await jwt.verify(token, jwtSecret)
        res.cookie('access-token', token);
        req.userId = decoded.id
        req.currentUser = await UserService.findUserById(decoded.id);
        if(!req.currentUser) {
          res.status(401).send({ auth: false, message: 'Invalid Token, Authentication Failed' });
        }
    }catch(e){
        if(e.name == 'TokenExpiredError'){
            res.status(401).send({ auth: false, message: 'Invalid Token, Authentication Failed' });
        }
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    next()
  }
}