import React, { createContext, useState, useCallback } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  
  // Add a notification
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, {
      id: Date.now() + Math.random(),
      ...notification
    }]);
  }, []);
  
  // Remove a notification
  const removeNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
