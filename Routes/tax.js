import express from 'express';
import tax from '../Controllers/tax';
// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const taxRouter = express.Router();

taxRouter.get('/summary', isLoggedInUser.isLoggedIn, tax.getTaxSummary);
taxRouter.get('/trends', isLoggedInUser.isLoggedIn, tax.getTaxTrends);

export default taxRouter;
