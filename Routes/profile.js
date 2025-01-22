import express from 'express';
import profile from '../Controllers/profile';
// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const profileRouter = express.Router();

profileRouter.get('/', isLoggedInUser.isLoggedIn, profile.getUserProfile);

profileRouter.put('/edit', isLoggedInUser.isLoggedIn, profile.updateUserProfile);

//bank apis
profileRouter.get('/bank/account', isLoggedInUser.isLoggedIn, profile.getBankAccountDetails);
profileRouter.get('/bank/transactions', isLoggedInUser.isLoggedIn, profile.getBankTransactions);

//income apis
profileRouter.get('/income/summary', isLoggedInUser.isLoggedIn, profile.getIncomeSummary);
profileRouter.get('/income/trends', isLoggedInUser.isLoggedIn, profile.getIncomeTrends);

export default profileRouter;
