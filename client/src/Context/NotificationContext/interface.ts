export interface INotificationProvider {
  children: React.ReactNode;
}

export interface INotificationContext {
  notificationSuccess: (message: string) => void;
  notificationError: (message: string) => void;
  notificationWarn: (message: string) => void;
  notificationInfo: (message: string) => void;
}
