
import { Router } from 'express';
import GroupsController from '../controllers/GroupsController';
import UsersController from '../controllers/UsersController';
import AccountsController from '../controllers/AccountsController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import ExpenseController from '../controllers/ExpenseController';

const router = Router();

// NO Auth MiddleWare
router.route('/login').post(UsersController.login);
router.post('/group/create', GroupsController.createGroup);

// Users

router.route('/users/group_users/:groupId').get(AuthMiddleware.authenticateUser, UsersController.getAllGroupUsers);

// Accounts
router.route('/account/create').post(AuthMiddleware.authenticateUser, AccountsController.create);
router.route('/account/all').get(AuthMiddleware.authenticateUser, AccountsController.getAll);
router.route('/account/add_income/:id').post(AuthMiddleware.authenticateUser, AccountsController.addIncome);
router.route('/account/add_deposit/:id').post(AuthMiddleware.authenticateUser, AccountsController.addDeposit);

// Expenses
router.route('/expense/all_expenses/:userId').get(AuthMiddleware.authenticateUser, ExpenseController.getAllExpenses);
router.route('/expense/:masterExpenseId/all_sub_expenses').get(AuthMiddleware.authenticateUser, ExpenseController.getAllSubExpenses);
router.route('/expense/all_group_expenses').get(AuthMiddleware.authenticateUser, ExpenseController.getAllGroupExpenses);
router.route('/expense/all_account_expenses/:accountId').get(AuthMiddleware.authenticateUser, ExpenseController.getAllAccountExpenses);
router.route('/expense/add_expense').post(AuthMiddleware.authenticateUser, ExpenseController.addExpense);
router.route('/expense/:masterExpenseId/add_sub_expense').post(AuthMiddleware.authenticateUser, ExpenseController.addSubExpense);




// Balance
// Header x-access-token

// get        balance/group
// get        balance/users
// get        balance/accounts




export default router;