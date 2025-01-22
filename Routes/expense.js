import express from 'express';
import expense from '../Controllers/expense';
// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const expenseRouter = express.Router();

expenseRouter.get('/summary', isLoggedInUser.isLoggedIn, expense.getExpenseSummary);
expenseRouter.get('/trends', isLoggedInUser.isLoggedIn, expense.getExpenseTrends);

export default expenseRouter;
