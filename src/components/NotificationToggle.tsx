import './NotificationToggle.css';

interface NotificationToggleProps {
  enabled: boolean;
  permission: NotificationPermission;
  isSupported: boolean;
  onToggle: (enabled: boolean) => void;
  onRequestPermission: () => void;
}

export const NotificationToggle = ({
  enabled,
  permission,
  isSupported,
  onToggle,
  onRequestPermission,
}: NotificationToggleProps) => {
  if (!isSupported) {
    return (
      <div className="notification-toggle notification-toggle--unsupported">
        <span>Notifications not supported in this browser</span>
      </div>
    );
  }

  const handleToggle = () => {
    if (permission === 'default') {
      onRequestPermission();
    } else {
      onToggle(!enabled);
    }
  };

  return (
    <div className="notification-toggle">
      <div className="notification-info">
        <span className="notification-icon">🔔</span>
        <div className="notification-text">
          <span className="notification-label">Daily Reminder</span>
          <span className="notification-status">
            {permission === 'denied' 
              ? 'Notifications blocked - enable in browser settings' 
              : enabled 
                ? 'You will receive daily alerts'
                : 'Get notified about driving restrictions'}
          </span>
        </div>
      </div>
      
      <button
        className={`toggle-button ${enabled ? 'toggle-button--active' : ''}`}
        onClick={handleToggle}
        type="button"
        disabled={permission === 'denied'}
      >
        <span className="toggle-slider" />
      </button>
    </div>
  );
};
