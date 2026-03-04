import './StatusCard.css';

interface StatusCardProps {
  canDrive: boolean | null;
  plate: string;
  plateType: 'odd' | 'even' | null;
  nextAllowed: number | null;
}

export const StatusCard = ({ canDrive, plate, plateType, nextAllowed }: StatusCardProps) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!plate) {
    return (
      <div className="status-card status-card--empty">
        <div className="status-icon">🚗</div>
        <h3>Enter Your License Plate</h3>
        <p>Add your plate number above to check if you can drive today</p>
      </div>
    );
  }

  const getPlateDisplay = (plate: string): [string, string] => {
    if (plate.length <= 2) {
      return [plate, ''];
    }
    return [plate.slice(0, 2), plate.slice(2)];
  };

  const [prefix, suffix] = getPlateDisplay(plate);
  const statusClass = canDrive ? 'allowed' : 'restricted';

  return (
    <div className={`status-card status-card--${statusClass}`}>
      <div className="status-header">
        <div className="status-icon">
          {canDrive ? '✅' : '🚫'}
        </div>
        <div className="status-text">
          <h2>{canDrive ? 'You Can Drive Today!' : 'Driving Not Allowed'}</h2>
          <p className="status-date">{dateString}</p>
        </div>
      </div>

      <div className="status-details">
        <div className="detail-item">
          <span className="detail-label">Plate Number</span>
          <span className="detail-value plate-number">
            {prefix}<span className="plate-separator">|</span>{suffix}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Plate Type</span>
          <span className={`detail-value plate-type plate-type--${plateType}`}>
            {plateType?.toUpperCase()} ({plateType === 'odd' ? 'Odd Dates' : 'Even Dates'})
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Current Date</span>
          <span className="detail-value">{today.getDate()} ({today.getDate() % 2 === 0 ? 'Even' : 'Odd'})</span>
        </div>
        {!canDrive && nextAllowed && (
          <div className="detail-item next-allowed">
            <span className="detail-label">Next Allowed Date</span>
            <span className="detail-value">Day {nextAllowed}</span>
          </div>
        )}
      </div>
    </div>
  );
};
