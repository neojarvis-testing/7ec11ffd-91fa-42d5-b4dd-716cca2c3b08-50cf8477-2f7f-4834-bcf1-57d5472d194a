export interface Notification {
    notificationId: string; // Unique identifier for the notification
    userId: string;         // ID of the user associated with the notification
    message: string;        // The message content of the notification
    timestamp?: Date;       // Optional: Timestamp of when the notification was created
  }