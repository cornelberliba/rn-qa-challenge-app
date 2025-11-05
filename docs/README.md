# QA Automation Challenge App - Developer Documentation

This document is for developers working on the QA Automation Challenge App.

## 📱 Overview

A React Native mobile application designed specifically for QA automation testing using Maestro. The app serves as a hands-on challenge for QA automation candidates to demonstrate their testing skills.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm installed
- Android Studio with Android SDK (for Android builds)
- Expo CLI installed globally: `npm install -g expo-cli`

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run on Android emulator
pnpm dev:android
```

### Build APK

```bash
# Build preview APK for Android
pnpm build:preview:android
```

## 🧪 Test Credentials

The app includes hardcoded test credentials for login:

- **Email**: `contact@tapp.work`
- **Password**: `qwerty`

> **Note**: These credentials are hardcoded for testing purposes only. Never use this pattern in production applications.

## 📋 User Flows

### First-Time User Flow

1. App launches → Shows onboarding screen 1
2. User navigates through 3 onboarding screens
3. User taps "Get Started" → Navigates to Sign-up screen
4. User creates account → Navigates to Home screen
5. User can logout → Returns to Login screen

### Returning User Flow

1. App launches → Shows Login screen (onboarding skipped)
2. User logs in with credentials → Navigates to Home screen
3. User can logout → Returns to Login screen

### Navigation Flows

- **Sign-up → Login**: Tap "Already have an account?" link
- **Login → Sign-up**: Tap "Don't have an account?" link

## 🐛 Known Issues (Intentional Bugs)

This app includes **intentional bugs** for QA testing purposes:

### Bug #1: Email Auto-capitalization
- **Location**: Sign-up & Login screens
- **Description**: Email input fields have `autoCapitalize="words"` enabled
- **Expected**: Email should have `autoCapitalize="none"`
- **Impact**: Users typing emails will see unwanted capitalization
- **Severity**: Medium
- **How to Test**: Type an email address and observe capitalization behavior

### Bug #2: Password Confirmation Missing
- **Location**: Sign-up screen
- **Description**: No validation to check if password matches confirm password
- **Expected**: Should show error if passwords don't match
- **Impact**: Users can create accounts with mismatched passwords
- **Severity**: High
- **How to Test**: Enter different passwords in "Password" and "Confirm Password" fields, then sign up

## 🔍 Accessibility IDs (testIDs)

All interactive elements have unique `testID` attributes for automation testing. See [ACCESSIBILITY_IDS.md](./ACCESSIBILITY_IDS.md) for complete list.

### Quick Reference

**Onboarding:**
- `more_info` - "More Info" button (screens 1 & 2)
- `get_started` - "Get Started" button (screen 3)

**Authentication:**
- `email` - Email input field
- `fullName` - Full Name input field (signup only)
- `password` - Password input field
- `confirmPassword` - Confirm Password input field (signup only)
- `signup` - Sign-up button
- `login` - Login button
- `already_have_an_account` - Link to login screen
- `dont_have_an_account` - Link to signup screen

**Home:**
- `fullname_text` - Welcome text displaying user's full name
- `logout` - Logout button

## 🛠️ Development

### Tech Stack

- **Framework**: React Native with Expo (~53.x)
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: shadcn/ui with NativeWind (Tailwind CSS)
- **Storage**: @react-native-async-storage/async-storage
- **Language**: TypeScript
- **Build**: EAS Build

### Project Structure

```
app/
├── (onboarding)/          # Onboarding screens
│   ├── screen1.tsx
│   ├── screen2.tsx
│   └── screen3.tsx
├── (auth)/               # Authentication screens
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/               # Main app screens
│   └── home.tsx
├── _layout.tsx           # Root layout
└── index.tsx             # Initial route logic

components/
├── ui/                   # shadcn/ui components
└── Link.tsx              # Custom link component

lib/
├── storage.ts            # AsyncStorage helpers
├── auth.ts               # Mock authentication logic
└── constants.ts          # Theme constants

constants/
├── testIDs.ts            # Centralized testID constants
└── onboarding.ts         # Onboarding content
```

### Available Scripts

```bash
# Development
pnpm dev                  # Start dev server
pnpm dev:android          # Run on Android
pnpm dev:ios              # Run on iOS

# Quality Checks
pnpm type-check           # TypeScript type checking
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix linting issues
pnpm format               # Format code with Prettier
pnpm check-all            # Run all checks (type-check + lint + format)

# Build
pnpm build:preview:android  # Build Android APK (preview)
pnpm build:dev:android      # Build Android APK (development)
```

## 📦 Building APK

### Using EAS Build

1. Ensure you have EAS CLI installed: `npm install -g eas-cli`
2. Login to Expo: `eas login`
3. Configure project: `eas build:configure`
4. Build APK: `pnpm build:preview:android`

The APK will be available for download from the Expo dashboard: https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds

### APK Requirements

- **Minimum Android Version**: API Level 21 (Android 5.0+)
- **Tested On**: Android emulator (Pixel 5, API 33)
- **APK Size**: ~30-50MB

## 🧪 Testing with Maestro

This app is designed for testing with [Maestro](https://maestro.mobile.dev/). All interactive elements have `testID` attributes that can be used for automation.

### Example Maestro Flow

```yaml
appId: com.cornelberliba.qaAutomationChallenge
---
- launchApp
- tapOn: "more_info"
- tapOn: "more_info"
- tapOn: "get_started"
- inputText: "test@example.com"
  id: "email"
- inputText: "Test User"
  id: "fullName"
- inputText: "password123"
  id: "password"
- inputText: "password123"
  id: "confirmPassword"
- tapOn: "signup"
- assertVisible: "Welcome, Test User!"
- tapOn: "logout"
```

## 📚 Documentation

- [PRD](./PRD.md) - Product Requirements Document
- [PLAN](./PLAN.md) - Implementation Plan
- [TASKS](../TASKS.md) - Progress Tracking
- [Accessibility IDs](./ACCESSIBILITY_IDS.md) - Complete testID reference
- [QA Testing Guide](../README.md) - QA-specific testing documentation

## 🔧 Troubleshooting

### AsyncStorage Warning

If you see: `[@RNC/AsyncStorage]: NativeModule: AsyncStorage is null`

1. Stop the Metro bundler
2. Clear cache: `pnpm dev -- --reset-cache`
3. Rebuild the app
4. For iOS: Run `cd ios && pod install`

### Build Issues

- Ensure `eas.json` is properly configured
- Check that `app.json` has correct package name
- Verify Android SDK is installed and configured

## 📝 Notes

- This app is intentionally simple for testing purposes
- Async operations simulate 2-3 second delays
- User data is stored locally using AsyncStorage
- Onboarding is shown only once per app installation

## 🤝 Contributing

This is a challenge app for QA automation testing. If you find any unintended bugs (not the intentional ones), please report them.

## 📄 License

This project is for educational/testing purposes only.

---

**Last Updated**: November 2025  
**Version**: 1.0.0
