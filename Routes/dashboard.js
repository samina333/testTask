import express from 'express';
import dashboard from '../Controllers/dashboard';
// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const dashboardRouter = express.Router();

dashboardRouter.get('/invoices/summary', isLoggedInUser.isLoggedIn, dashboard.getInvoiceSummary);
dashboardRouter.get('/invoices', isLoggedInUser.isLoggedIn, dashboard.getInvoiceDetails);

dashboardRouter.get('/overview', isLoggedInUser.isLoggedIn, dashboard.getDashboardOverview);
dashboardRouter.get('/graphdata', isLoggedInUser.isLoggedIn, dashboard.getGraphData);

export default dashboardRouter;
