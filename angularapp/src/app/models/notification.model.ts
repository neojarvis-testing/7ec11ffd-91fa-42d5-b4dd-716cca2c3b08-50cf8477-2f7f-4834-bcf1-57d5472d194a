import { Appointment } from "./appointment.model";
import { User } from "./user.model";
 
export interface Notification {
    notificationId?: number;
    message: string;
    isRead: boolean;
    timestamp: string;
    user: User; 
    appointment: Appointment;
  }