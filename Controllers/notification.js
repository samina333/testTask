import status from 'http-status';
import Model from '../Models/Model';

const getNotifications = async (req, res) => {
  const { userId } = req.query; // User ID for filtering notifications

  if (!userId) {
    return res.status(400).json({ error: 'Missing required query parameter: userId' });
  }

  try {
    // Fetch unread and read notifications for the user
    const notifications = await Model.NotificationModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications.' });
  }
};

const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.body; // ID of the notification to mark as read

  if (!notificationId) {
    return res.status(400).json({ error: 'Missing required body parameter: notificationId' });
  }

  try {
    // Mark the notification as read
    const updatedNotification = await Model.NotificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    res.status(200).json({ data: updatedNotification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'An error occurred while updating the notification.' });
  }
};

export default {getNotifications,  markNotificationAsRead}