import { useState, useEffect, useCallback } from 'react';

interface NotificationState {
  permission: NotificationPermission;
  enabled: boolean;
}

export const useNotifications = () => {
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    enabled: false,
  });

  useEffect(() => {
    if ('Notification' in window) {
      const savedEnabled = localStorage.getItem('car_uses_notifications');
      setState({
        permission: Notification.permission,
        enabled: savedEnabled === 'true' && Notification.permission === 'granted',
      });
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    setState(prev => ({ ...prev, permission }));
    return permission === 'granted';
  }, []);

  const toggleNotifications = useCallback(async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestPermission();
      if (granted) {
        localStorage.setItem('car_uses_notifications', 'true');
        setState(prev => ({ ...prev, enabled: true }));
      }
    } else {
      localStorage.setItem('car_uses_notifications', 'false');
      setState(prev => ({ ...prev, enabled: false }));
    }
  }, [requestPermission]);

  const sendNotification = useCallback((title: string, body: string) => {
    if (state.enabled && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/vite.svg',
        badge: '/vite.svg',
      });
    }
  }, [state.enabled]);

  return {
    ...state,
    requestPermission,
    toggleNotifications,
    sendNotification,
    isSupported: 'Notification' in window,
  };
};
