TODO's:
1. Need to include mail-id in users table, so that we can support forget password functionality
2. Need to add date properties to transactions table to track when this action(transaction => income/expense) happened
3. Need to add deposit column to account to track FD's

4. Try to replace jwt by jwe or someother alternative, as jwt can be decoded without the secret or may be openIdConnect
5. Try to impl logout, by storing all valid jwt tokens in users-table

*****************************************TODO******************
// There can be a input validator middleware,
// which check's if the data provided is appropriate
// if there are any extra props remove them
// if there are any required props throw bad request error


Dashboard:
should include following
1. current group balance
2. current users current balance(logged in users balance)(with collapsible section, to showing current balance in all his accounts)
3. current month expenses for group so far(ex: if today is Apr-5th, we should be able to show total expenses from 1st-Apr till date), should also include a collapsible section to show all the expenses from 1st Apr till date
4. Current month expenses done by logged in user


How to run:
npm run dev

Provides following endpoints

baseUrl: /api/v1

1. Login
    Method    post      
    URL       /login
    params    loginId, password
    header    {content-type: application/json}
    response  {token: 'x-access-token'}

2. Create Group
    Method    post      
    URL       /group/create
    params    groupName, name, loginId, mailId, password, confirmPassword
    header    {content-type: application/json}
    response  {token: 'x-access-token'}

---------------------------------------Accounts-------------------------------
1. Get all logged in user's Accounts
    Method    get      
    URL       account/all
    params    --
    header    {content-type: application/json, x-access-token: 'token'}
    response  Array<{id, name, balance, deposit, userId, groupId}>
  
2. Create Account
    Method    post      
    URL       account/create
    params    name, balance, deposit
    header    {content-type: application/json, x-access-token: 'token'}
    response  {account: {id, name, balance, deposit, userId, groupId}, success: true}
  
3. Add Income to Account
    Method    post      
    URL       account/add_income/:accountId
    params    title, amount, date, description
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, message: '...', account: {id, name, balance, userId, groupId, deposit}, transaction: {id, title, description, amount, date,
                userId, groupId, accountId, type, masterExpenseId, isMasterExpense, isExpenseActive}}

4. Add deposit to Account
    Method    post      
    URL       account/add_deposit/:accountId
    params    amount
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, message: '', account: {id, name, balance, userId, groupId, deposit}}

---------------------------------------Expenses-------------------------------
1. Add expenses
    Method    post      
    URL       expense/add_expense
    params    title, description, amount, date, accountId
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expense: {id, title, description, amount, date, groupId, accountId, userId, type, masterExpenseId, isMasterExpense, isExpenseActive}}
  
2. Add  SubExpense
    Method    post      
    URL       expense/:masterExpenseId/add_sub_expense
    params    title, description, amount, date, accountId, masterExpenseId
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expense: {..}}

3. get all expenses
    Method    get      
    URL       expense/all_expenses/:userId
    params    userId(optional if not passed logged in user ID will be used otherwise)
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expenses: Array<expense>}

4. get all Sub expenses
    Method    get      
    URL       expense/:masterExpenseId/all_sub_expenses
    params    --
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expenses: Array<expense>}

5. get all expenses for entire group
    Method    get      
    URL       expense/all_group_expenses
    params    --
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expenses: {}}

6. get all expenses for an account
    Method    get      
    URL       expense/all_account_expenses/:accountId
    params    --
    header    {content-type: application/json, x-access-token: 'token'}
    response  {success: true, expenses: {}}


AddExpense
AddSubExpense
getAllExpenses
getAllSubExpenses
getAllGroupExpenses
getAllAccountExpenses


    Method    post      
    URL       login
    params    test
    header    {content-type: application/json, x-access-token: 'token'}
    response  test
