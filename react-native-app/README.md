# AgGo Mobile App (React Native)

A comprehensive agriculture rental and marketplace mobile application.

## Features

- OTP-based authentication (Phone & Email)
- Crop marketplace (Buy/Sell)
- Driver/Equipment rental
- Shop listings
- Role-based views
- Multi-language support (English/Hindi)

## Setup

1. Install dependencies:
```bash
cd react-native-app
npm install
```

2. Update API URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-published-app-url.replit.app';
```

3. Run the app:
```bash
npm start
```

4. Scan QR code with Expo Go app (iOS/Android)

## Project Structure

```
react-native-app/
├── App.js                    # Main entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── src/
│   ├── context/
│   │   └── AppContext.js     # Global state management
│   ├── navigation/
│   │   └── AppNavigator.js   # Navigation setup
│   ├── screens/
│   │   ├── AuthScreen.js     # Login/OTP screen
│   │   ├── HomeScreen.js     # Home dashboard
│   │   ├── MarketplaceScreen.js
│   │   ├── DriversScreen.js
│   │   ├── ShopsScreen.js
│   │   └── SettingsScreen.js
│   └── services/
│       └── api.js            # API client
└── assets/                   # App icons and splash screens
```

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Requirements

- Node.js 18+
- Expo CLI
- Expo Go app on your device for testing
