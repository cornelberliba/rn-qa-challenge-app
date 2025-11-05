# QA Automation Challenge App - Testing Guide

Welcome! This document is designed specifically for QA engineers and automation testers who will be testing this mobile application.

## 📱 About This App

This React Native app is built specifically for QA automation testing challenges. It includes:
- **Onboarding Flow**: 3-screen introduction
- **Authentication**: Sign-up and Login functionality
- **Home Screen**: User dashboard
- **Intentional Bugs**: Deliberate bugs included for testing purposes

## 🔗 Quick Links

- **GitHub Repository**: [https://github.com/cornelberliba/rn-qa-challenge-app](https://github.com/cornelberliba/rn-qa-challenge-app)
- **Latest APK Build**: [Download from Expo](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds/da3bbeaa-7fcf-49a8-8275-b0cc861d4002)
- **Expo Dashboard (All Builds)**: [View All Builds](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds)

## 📥 Download & Installation

### Option 1: Download APK from Expo

**Latest Build:** [Download APK from Expo](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds/da3bbeaa-7fcf-49a8-8275-b0cc861d4002)

> **Direct Link**: Click the link above to download the latest APK build directly.

> **Note**: You can also view all builds on the [Expo Dashboard](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds).

### Option 2: Build Locally

If you have access to the repository:

```bash
# Clone the repository
git clone https://github.com/cornelberliba/rn-qa-challenge-app.git
cd rn-qa-challenge-app

# Install dependencies
pnpm install

# Build APK
pnpm build:preview:android
```

### Installation on Android Emulator

1. Download the APK file
2. Drag and drop the APK onto your Android emulator, OR
3. Use ADB: `adb install app-release.apk`

### System Requirements

- **Android**: API Level 21+ (Android 5.0+)
- **Tested On**: Android emulator (Pixel 5, API 33)
- **APK Size**: ~30-50MB

## 🧪 Test Credentials

Use these credentials to log in:

```
Email: contact@tapp.work
Password: qwerty
```

> ⚠️ **Important**: These are hardcoded test credentials. They only work for testing purposes.

## 🔍 Accessibility IDs (testIDs)

All interactive elements have unique `testID` attributes for automation testing. These IDs are essential for writing automated tests with tools like Maestro, Appium, or Detox.

### Complete List of testIDs

#### Onboarding Screens

| Screen | Element | testID | Type |
|--------|---------|--------|------|
| Screen 1 & 2 | More Info Button | `more_info` | Button |
| Screen 3 | Get Started Button | `get_started` | Button |

#### Sign-up Screen

| Element | testID | Type | Notes |
|---------|--------|------|-------|
| Email Input | `email` | TextInput | 🐛 Bug: Has autoCapitalize enabled |
| Full Name Input | `fullName` | TextInput | - |
| Password Input | `password` | TextInput | Secure entry |
| Confirm Password Input | `confirmPassword` | TextInput | Secure entry, 🐛 Bug: No validation |
| Sign-up Button | `signup` | Button | - |
| Login Link | `already_have_an_account` | Pressable | Navigates to login |

#### Login Screen

| Element | testID | Type | Notes |
|---------|--------|------|-------|
| Email Input | `email` | TextInput | 🐛 Bug: Has autoCapitalize enabled |
| Password Input | `password` | TextInput | Secure entry |
| Login Button | `login` | Button | - |
| Sign-up Link | `dont_have_an_account` | Pressable | Navigates to signup |

#### Home Screen

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Welcome Text | `fullname_text` | Text | Displays "Welcome, {fullName}!" |
| Logout Button | `logout` | Button | Logs out user |

### testID Reference Table

```javascript
{
  onboarding: {
    moreInfo: 'more_info',
    getStarted: 'get_started'
  },
  auth: {
    email: 'email',
    fullName: 'fullName',
    password: 'password',
    confirmPassword: 'confirmPassword',
    signup: 'signup',
    login: 'login',
    alreadyHaveAccount: 'already_have_an_account',
    dontHaveAccount: 'dont_have_an_account'
  },
  home: {
    fullnameText: 'fullname_text',
    logout: 'logout'
  }
}
```

## 🐛 Known Issues (Intentional Bugs)

This app includes **2 intentional bugs** that you should discover and report during testing:

### Bug #1: Email Auto-capitalization

- **Location**: Sign-up screen & Login screen
- **testID**: `email`
- **Description**: Email input fields have `autoCapitalize="words"` enabled
- **Expected Behavior**: Email should have `autoCapitalize="none"` (no capitalization)
- **Actual Behavior**: Email field capitalizes words as you type
- **Impact**: Users typing email addresses will see unwanted capitalization (e.g., "Test@Example.Com" instead of "test@example.com")
- **Severity**: Medium
- **How to Test**:
  1. Navigate to Sign-up or Login screen
  2. Tap on the email field (`email` testID)
  3. Type an email address (e.g., "test@example.com")
  4. Observe: Text gets capitalized incorrectly
  5. Expected: Should remain lowercase

### Bug #2: Password Confirmation Missing

- **Location**: Sign-up screen
- **testIDs**: `password`, `confirmPassword`
- **Description**: No validation to check if password matches confirm password
- **Expected Behavior**: Should show error if passwords don't match
- **Actual Behavior**: Sign-up succeeds even with mismatched passwords
- **Impact**: Users can create accounts with mismatched passwords, leading to login issues
- **Severity**: High
- **How to Test**:
  1. Navigate to Sign-up screen
  2. Fill in email (`email` testID)
  3. Fill in full name (`fullName` testID)
  4. Enter password: "password123" (`password` testID)
  5. Enter different confirm password: "different456" (`confirmPassword` testID)
  6. Tap Sign-up button (`signup` testID)
  7. Expected: Should show error "Passwords don't match"
  8. Actual: Sign-up succeeds and navigates to home screen

## 📋 Test Scenarios

### Scenario 1: First-Time User Flow

1. Launch app
2. Verify onboarding screen 1 appears
3. Tap `more_info` button → Should navigate to screen 2
4. Tap `more_info` button → Should navigate to screen 3
5. Tap `get_started` button → Should navigate to signup screen
6. Complete signup form
7. Tap `signup` button → Should navigate to home screen
8. Verify welcome message shows user's full name (`fullname_text`)

### Scenario 2: Returning User Flow

1. Launch app (after completing onboarding)
2. Verify login screen appears (onboarding skipped)
3. Enter credentials:
   - Email: `contact@tapp.work` (`email` testID)
   - Password: `qwerty` (`password` testID)
4. Tap `login` button → Should navigate to home screen
5. Verify welcome message (`fullname_text`)

### Scenario 3: Logout Flow

1. From home screen, tap `logout` button
2. Verify navigation to login screen
3. Verify user session is cleared (can't access home directly)

### Scenario 4: Navigation Between Auth Screens

1. From signup screen, tap `already_have_an_account` link → Should navigate to login
2. From login screen, tap `dont_have_an_account` link → Should navigate to signup

### Scenario 5: Bug Testing - Email Capitalization

1. Navigate to signup or login screen
2. Tap email field (`email` testID)
3. Type: "test@example.com"
4. **Expected**: Text remains "test@example.com"
5. **Actual Bug**: Text becomes "Test@Example.Com" or similar capitalization

### Scenario 6: Bug Testing - Password Mismatch

1. Navigate to signup screen
2. Fill all fields:
   - Email: "test@example.com"
   - Full Name: "Test User"
   - Password: "password123"
   - Confirm Password: "different456" (different!)
3. Tap `signup` button
4. **Expected**: Error message "Passwords don't match"
5. **Actual Bug**: Sign-up succeeds without validation

## 🧪 Testing with Maestro

This app is optimized for testing with [Maestro](https://maestro.mobile.dev/). All elements have `testID` attributes that work seamlessly with Maestro.

### Example Maestro Test Flow

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

### Testing Bugs with Maestro

#### Bug #1: Email Capitalization

```yaml
- tapOn: "email"
- inputText: "test@example.com"
  id: "email"
# Note: Check if text gets capitalized incorrectly
# This may require visual assertion or screenshot comparison
```

#### Bug #2: Password Mismatch

```yaml
- inputText: "password123"
  id: "password"
- inputText: "different456"  # Different password
  id: "confirmPassword"
- tapOn: "signup"
# Expected: Should fail with error
# Actual: Will succeed (bug)
- assertVisible: "Welcome"  # This should not appear but does due to bug
```

## 📊 Test Checklist

### Functional Testing

- [ ] Onboarding screens display correctly
- [ ] Navigation between onboarding screens works
- [ ] Onboarding completes and navigates to signup
- [ ] Sign-up creates account successfully
- [ ] Login with correct credentials succeeds
- [ ] Login with incorrect credentials fails
- [ ] Home screen displays user's full name
- [ ] Logout clears session and navigates to login
- [ ] Navigation between auth screens works

### Bug Testing

- [ ] Email field capitalizes input (Bug #1)
  - [ ] Test in signup screen
  - [ ] Test in login screen
- [ ] Password confirmation accepts mismatched passwords (Bug #2)
  - [ ] Enter different passwords
  - [ ] Verify signup succeeds without error

### Accessibility Testing

- [ ] All testIDs are accessible via Maestro/Appium
- [ ] All interactive elements have testIDs
- [ ] TestIDs match specification exactly

### Edge Cases

- [ ] Empty form submission
- [ ] Invalid email format
- [ ] Short passwords
- [ ] App restart after signup (verify persistence)
- [ ] App restart after logout (verify session cleared)

## 🔗 Useful Links

- **GitHub Repository**: [https://github.com/cornelberliba/rn-qa-challenge-app](https://github.com/cornelberliba/rn-qa-challenge-app)
- **Latest APK Build**: [Download from Expo](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds/da3bbeaa-7fcf-49a8-8275-b0cc861d4002)
- **Expo Dashboard**: [View All Builds](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds)
- **Maestro Documentation**: https://maestro.mobile.dev/
- **Developer Documentation**: [docs/README.md](./docs/README.md) - For developers working on the app
- **Complete testID Reference**: [docs/ACCESSIBILITY_IDS.md](./docs/ACCESSIBILITY_IDS.md) - Detailed testID documentation

## 📝 Reporting Issues

When reporting bugs:

1. **Include**: Screenshot or video
2. **Specify**: testID of the element
3. **Describe**: Expected vs Actual behavior
4. **Note**: Whether it's an intentional bug (should be documented) or unintended bug

## ❓ Frequently Asked Questions

**Q: Where can I download the APK?**  
A: Download the latest APK from [this link](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds/da3bbeaa-7fcf-49a8-8275-b0cc861d4002) or view all builds on the [Expo Dashboard](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds).

**Q: The app crashes on launch. What should I do?**  
A: Make sure you're using Android API Level 21+. Clear app data and reinstall.

**Q: Can I test on iOS?**  
A: Currently, only Android APK is available. iOS build may be added later.

**Q: How do I reset the app state?**  
A: Uninstall and reinstall the app, or clear app data from device settings.

**Q: Some testIDs don't work in Maestro. Why?**  
A: Make sure you're using the exact testID from the reference table. TestIDs are case-sensitive.

---

## 📚 Additional Resources

- **GitHub Repository**: [https://github.com/cornelberliba/rn-qa-challenge-app](https://github.com/cornelberliba/rn-qa-challenge-app)
- **For Developers**: See [docs/README.md](./docs/README.md) for development setup and technical details
- **Complete Documentation**: All documentation is available in the `docs/` folder
- **Latest Build**: [Download APK](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds/da3bbeaa-7fcf-49a8-8275-b0cc861d4002)
- **Build Status**: Check [Expo Dashboard](https://expo.dev/accounts/cornel.berliba/projects/qa-automation-challenge/builds) for latest builds

---

**Last Updated**: November 2025  
**App Version**: 1.0.0  
**QA Testing Guide**: This README is specifically for QA engineers and testers
