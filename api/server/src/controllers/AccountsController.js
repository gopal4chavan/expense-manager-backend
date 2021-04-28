import AccountService from '../services/AccountService';
import TransactionService from '../services/TransactionService';
import database from '../models';
import {filterRecord} from '../utils/filterRecord';


export default class GroupsController {
  static async create(req, res) {
    const {name, balance, deposit} = req.body;
    const account = await AccountService.create({name, balance, deposit}, req.currentUser.id, req.currentUser.groupId);
    res.status(201).send({account, success: true});
  }

  static async getAll(req, res) {
    try {
      const accountsList = await AccountService.getAll(req.currentUser.id);
      res.status(200).send(accountsList)
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async addIncome(req, res) {
    const {amount, date, description, title} = req.body;
    if(amount <= 0){
      res.status(400).send("Invalid income amount");
      return;
    }
    const t = await database.sequelize.transaction();
    try {
      let account = await AccountService.findAccount(req.params.id);
      if(!account) {
        res.status(400).send("Invalid Account ID");
        return;
      }
      account = await AccountService.updateBalance(account, amount, t);
      console.log(req.currentUser, account)
      const transaction = await TransactionService.create({
        title,
        description,
        amount,
        date,
        userId: req.currentUser.id,
        groupId: req.currentUser.groupId,
        accountId: account.id,
        type: 'income',
      }, t);
      await t.commit();
      res.status(200).send({success: true, message: 'Amount successfully Added to Account', account: filterRecord(account), transaction: filterRecord(transaction)});
    } catch (error) {
      await t.rollback();
      res.status(500).send({error, success: false})
    }
  }

  static async addDeposit(req, res) {
    const {amount} = req.body;
    if(amount <= 0) {
      res.status(400).send("Invalid income amount");
      return;
    }
    try {
      let account = await AccountService.findAccount(req.params.id);
      if(!account) {
        res.status(400).send("Invalid Account ID");
      }
      account = await AccountService.updateDeposit(account, amount);
      res.status(200).send({account, success: true, message: 'Amount successfully Added to Deposit'})
    } catch(error) {
      res.status(500).send({error, success: false})
    }
  }
}
