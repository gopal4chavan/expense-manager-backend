



// import database from '../models';


// getAllExpenses
// getAllGroupExpenses
// getAllAccountExpenses/:accountId
import TransactionService from '../services/TransactionService';

const EXPENSE = 'expense';
const SUBEXPENSE = 'sub expense';
const INCOME = 'income';

export default class ExpenseController {
  static async addExpense(req, res) {
    try {
      const expense = await TransactionService.create({
        ...req.body,
        type: EXPENSE,
        userId: req.currentUser.id,
        groupId: req.currentUser.groupId,
      })
      res.status(200).send({success: true, expense});
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }

  static async addSubExpense(req, res) {
    try {
      const expense = await TransactionService.create({
        ...req.body,
        type: SUBEXPENSE,
        userId: req.currentUser.id,
        masterExpenseId: req.params.id,
        groupId: req.currentUser.groupId
      })
      res.status(200).send({success: true, expense});
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }

  static async getAllExpenses(req, res) {
    const userId = req.params.id || req.currentUser.id;
    try {
      const expenses = await TransactionService.getAll({
        userId,
        groupId: req.currentUser.groupId,
        type: [EXPENSE, INCOME]
      },[['id', 'ASC']]);
      res.status(200).send({success: true, expenses})
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }

  static async getAllSubExpenses(req, res) {
    try {
      const expenses = await TransactionService.getAll({
        userId: req.currentUser.id,
        type: SUBEXPENSE,
        masterExpenseId: req.params.id
      }, [['id', 'ASC']]);
      res.status(200).send({success: true, expenses})
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }

  static async getAllGroupExpenses(req, res) {
    try {
      const expenses = await TransactionService.getAll({
        type: [EXPENSE, INCOME],
        groupId: req.currentUser.groupId
      }, [['id', 'ASC']]);
      res.status(200).send({success: true, expenses})
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }

  static async getAllAccountExpenses(req, res) {
    try {
      const expenses = await TransactionService.getAll({
        type: [EXPENSE, INCOME],
        groupId: req.currentUser.groupId,
        accountId: req.params.id
      }, [['id', 'ASC']])
      res.status(200).send({success: true, expenses})
    } catch (error) {
      res.status(500).send({success: false, error});
    }
  }
}
