# Car Uses Alert System - Specification

## Project Overview
- **Name**: Pico y Placa Alert (Car Use Restriction System)
- **Type**: PWA (Progressive Web App) - Web + Mobile Notifications
- **Core Functionality**: License plate-based driving restriction system with calendar view and push notifications
- **Target Users**: Drivers who need to know when they can drive based on plate restrictions

## Plate Classification Logic
- **Odd Plates**: Last digit is 1, 3, 5, 7, 9 → Can drive on odd dates (1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31)
- **Even Plates**: Last digit is 0, 2, 4, 6, 8 → Can drive on even dates (0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)

## Features

### 1. Plate Registration
- Input field for license plate number
- Auto-detect plate type (odd/even) based on last digit
- Save plate to localStorage for persistence

### 2. Today's Status
- Show if user can drive today based on plate type and current date
- Clear visual indicator (green = can drive, red = cannot drive)
- Display current date and plate type

### 3. Calendar View
- Monthly calendar showing allowed/blocked dates
- Color-coded: green (allowed), red (blocked), gray (current day)
- Navigate between months

### 4. Notifications
- Push notification permission request
- Daily check notification (morning reminder)
- Alert if user tries to access when restricted

### 5. PWA Features
- Installable on mobile/desktop
- Works offline
- Push notifications support

## UI/UX Design

### Color Palette
- Primary: #2563eb (Blue)
- Success (Can Drive): #22c55e (Green)
- Danger (Cannot Drive): #ef4444 (Red)
- Background: #f8fafc (Light gray)
- Card Background: #ffffff
- Text: #1e293b (Dark slate)

### Layout
- Single page app with sections:
  - Header with app title
  - Plate input section
  - Today's status card
  - Quick stats (days until next allowed)
  - Calendar section
  - Notification settings

### Components
- PlateInput: Text input with validation
- StatusCard: Large card showing today's driving status
- Calendar: Month view with date navigation
- NotificationToggle: Switch for enabling/disabling notifications

## Technical Stack
- React 19 + TypeScript
- Vite
- Service Worker for PWA
- Web Notifications API
- localStorage for data persistence

## File Structure
```
src/
├── components/
│   ├── PlateInput.tsx
│   ├── StatusCard.tsx
│   ├── Calendar.tsx
│   └── NotificationToggle.tsx
├── hooks/
│   ├── usePlate.ts
│   └── useNotifications.ts
├── utils/
│   └── plateUtils.ts
├── App.tsx
├── main.tsx
└── index.css
```
