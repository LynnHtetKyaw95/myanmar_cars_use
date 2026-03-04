import { usePlate } from "./hooks/usePlate";
import { useNotifications } from "./hooks/useNotifications";
import { PlateInput } from "./components/PlateInput";
import { StatusCard } from "./components/StatusCard";
import { Calendar } from "./components/Calendar";
import { NotificationToggle } from "./components/NotificationToggle";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const {
    plate,
    plateType,
    todayStatus,
    nextAllowed,
    updatePlate,
    clearPlate,
  } = usePlate();
  const {
    enabled,
    permission,
    isSupported,
    toggleNotifications,
    requestPermission,
  } = useNotifications();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">🚗 GoOrNo</h1>
          <p className="header-subtitle">Car Use Alert System</p>
        </div>
      </header>

      <main className="main">
        <section className="section plate-section">
          <PlateInput
            value={plate}
            onChange={updatePlate}
            onClear={clearPlate}
          />
        </section>

        <section className="section status-section">
          <StatusCard
            canDrive={todayStatus}
            plate={plate}
            plateType={plateType}
            nextAllowed={nextAllowed}
          />
        </section>

        <section className="section notification-section">
          <NotificationToggle
            enabled={enabled}
            permission={permission}
            isSupported={isSupported}
            onToggle={toggleNotifications}
            onRequestPermission={requestPermission}
          />
        </section>

        <section className="section calendar-section">
          <Calendar plate={plate} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
