import express from 'express';
import notification from '../Controllers/notification';
// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const notificationRouter = express.Router();

notificationRouter.get('/', isLoggedInUser.isLoggedIn, notification.getNotifications);
notificationRouter.post('/mark-as-read', isLoggedInUser.isLoggedIn, notification.markNotificationAsRead);

export default notificationRouter;
