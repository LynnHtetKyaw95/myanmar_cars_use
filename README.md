# Myanmar Car Use Alert System (Go or No)

A Progressive Web Application (PWA) for the Myanmar vehicle restriction system that helps drivers know when they can drive based on their license plate number and the current date.

## Features

- **License Plate Registration** - Input and validate license plate numbers with automatic odd/even type detection
- **Real-time Driving Status** - Instant display of whether you can drive today based on date parity
- **Interactive Calendar** - Visual monthly calendar showing allowed and restricted driving days
- **Push Notifications** - Daily reminders about driving restrictions
- **PWA Support** - Installable on mobile and desktop devices with offline capability
- **Data Persistence** - Plate information saved locally for convenience

## How It Works

The system follows Myanmar's vehicle restriction policy based on license plate numbers:

| Plate Type | Last Character | Allowed Dates                                                          |
| ---------- | -------------- | ---------------------------------------------------------------------- |
| Odd        | 1, 3, 5, 7, 9  | Odd dates (1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31)  |
| Even       | 0, 2, 4, 6, 8  | Even dates (0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30) |

If the first character is a letter, it's converted to a number using alphabetical position (A=1, B=2, etc.) to determine odd/even classification.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd car_uses

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## API Reference

### Utility Functions (`src/utils/plateUtils.ts`)

```typescript
getPlateType(plate: string): 'odd' | 'even'
```

Determines whether a plate is classified as odd or even based on its first character.

```typescript
canDriveToday(plate: string): boolean
```

Checks if driving is allowed today for the given plate number.

```typescript
canDriveOnDate(plate: string, date: number): boolean
```

Checks if driving is allowed on a specific date for the given plate.

```typescript
getNextAllowedDate(plate: string): number
```

Returns the next date when driving will be allowed for the plate.

```typescript
formatPlate(plate: string): string
```

Normalizes plate format by converting to uppercase and removing special characters.

### Custom Hooks

#### `usePlate()`

Manages license plate state with localStorage persistence.

**Returns:**

- `plate` - Current plate number
- `plateType` - 'odd' | 'even' | null
- `todayStatus` - Boolean indicating if driving is allowed today
- `nextAllowed` - Next allowed date number
- `updatePlate(plate: string)` - Update plate number
- `clearPlate()` - Clear stored plate

#### `useNotifications()`

Handles browser notification permissions and sending.

**Returns:**

- `enabled` - Whether notifications are enabled
- `permission` - Current notification permission status
- `isSupported` - Whether browser supports notifications
- `requestPermission()` - Request notification permission
- `toggleNotifications(enabled: boolean)` - Toggle notifications on/off
- `sendNotification(title: string, body: string)` - Send a notification

## Components

| Component            | Description                                    |
| -------------------- | ---------------------------------------------- |
| `PlateInput`         | Split input for license plate with validation  |
| `StatusCard`         | Displays current driving status with details   |
| `Calendar`           | Monthly calendar with allowed/restricted dates |
| `NotificationToggle` | Toggle switch for daily reminder notifications |
| `Footer`             | App footer with copyright and links            |

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** React Hooks + localStorage
- **Notifications:** Web Notifications API
- **PWA:** Service Worker

## Project Structure

```
src/
├── components/
│   ├── PlateInput.tsx       # License plate input component
│   ├── StatusCard.tsx       # Driving status display
│   ├── Calendar.tsx         # Monthly calendar view
│   ├── NotificationToggle.tsx
│   └── Footer.tsx
├── hooks/
│   ├── usePlate.ts          # Plate state management
│   └── useNotifications.ts  # Notification handling
├── utils/
│   └── plateUtils.ts        # Plate logic utilities
├── App.tsx                  # Main application component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

© 2026 Car Use Alert System - Myanmar Vehicle Restriction System
