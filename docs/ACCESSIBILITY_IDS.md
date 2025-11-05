# Accessibility IDs Reference

Complete list of all `testID` attributes used in the QA Automation Challenge App for automation testing.

## 📋 Overview

All interactive elements and important text elements have unique `testID` attributes that can be used with automation tools like Maestro, Appium, or Detox.

**Location**: All testIDs are centralized in `constants/testIDs.ts`

---

## 🎯 Onboarding Screens

### Screen 1 & Screen 2

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| More Info Button | `more_info` | Button | Navigates to next onboarding screen |

### Screen 3

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Get Started Button | `get_started` | Button | Completes onboarding and navigates to signup |

### Additional Onboarding IDs

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Toggle Button | `onboarding_toggle_button` | Button | Toggle button for onboarding settings |
| Toggle Switch | `onboarding_toggle_switch` | Switch | Switch component for forcing onboarding |
| Toggle Explanation | `onboarding_toggle_explanation` | Text | Explanation text for toggle |

---

## 🔐 Authentication Screens

### Sign-up Screen

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Email Input | `email` | TextInput | Email address input field |
| Full Name Input | `fullName` | TextInput | User's full name input field |
| Password Input | `password` | TextInput | Password input field (secure) |
| Confirm Password Input | `confirmPassword` | TextInput | Password confirmation field (secure) |
| Sign-up Button | `signup` | Button | Creates account and navigates to home |
| Login Link | `already_have_an_account` | Pressable | Navigates to login screen |

**Note**: Email field has intentional bug (`autoCapitalize="words"`).  
**Note**: Password confirmation validation is intentionally missing.

### Login Screen

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Email Input | `email` | TextInput | Email address input field |
| Password Input | `password` | TextInput | Password input field (secure) |
| Login Button | `login` | Button | Authenticates and navigates to home |
| Sign-up Link | `dont_have_an_account` | Pressable | Navigates to signup screen |

**Note**: Email field has intentional bug (`autoCapitalize="words"`).

---

## 🏠 Home Screen

| Element | testID | Type | Description |
|---------|--------|------|-------------|
| Full Name Text | `fullname_text` | Text | Displays "Welcome, {fullName}!" |
| Logout Button | `logout` | Button | Logs out user and navigates to login |

---

## 📊 Complete TestID Map

```typescript
{
  onboarding: {
    moreInfo: 'more_info',
    getStarted: 'get_started',
    toggleButton: 'onboarding_toggle_button',
    toggleSwitch: 'onboarding_toggle_switch',
    toggleExplanation: 'onboarding_toggle_explanation',
  },
  auth: {
    email: 'email',
    fullName: 'fullName',
    password: 'password',
    confirmPassword: 'confirmPassword',
    signup: 'signup',
    login: 'login',
    alreadyHaveAccount: 'already_have_an_account',
    dontHaveAccount: 'dont_have_an_account',
  },
  home: {
    fullnameText: 'fullname_text',
    logout: 'logout',
  },
}
```

---

## 🧪 Maestro Testing Examples

### Test Onboarding Flow

```yaml
- tapOn: "more_info"          # Screen 1 → Screen 2
- tapOn: "more_info"          # Screen 2 → Screen 3
- tapOn: "get_started"        # Complete onboarding
```

### Test Sign-up Flow

```yaml
- inputText: "user@example.com"
  id: "email"
- inputText: "John Doe"
  id: "fullName"
- inputText: "password123"
  id: "password"
- inputText: "different456"   # Bug: Should fail but doesn't
  id: "confirmPassword"
- tapOn: "signup"
- assertVisible: "Welcome, John Doe!"
```

### Test Login Flow

```yaml
- inputText: "contact@tapp.work"
  id: "email"
- inputText: "qwerty"
  id: "password"
- tapOn: "login"
- assertVisible: "Welcome"
```

### Test Logout Flow

```yaml
- tapOn: "logout"
- assertVisible: "Login"      # Should navigate to login screen
```

### Test Navigation Between Auth Screens

```yaml
# From Sign-up to Login
- tapOn: "already_have_an_account"
- assertVisible: "Login"

# From Login to Sign-up
- tapOn: "dont_have_an_account"
- assertVisible: "Sign Up"
```

---

## 🐛 Testing Intentional Bugs

### Bug #1: Email Auto-capitalization

```yaml
# Test in Sign-up or Login screen
- tapOn: "email"
- inputText: "test@example.com"
  id: "email"
# Observe: Text may be capitalized incorrectly
# Expected: Should not capitalize
# Actual: May capitalize due to autoCapitalize="words"
```

### Bug #2: Password Confirmation Missing

```yaml
# Test in Sign-up screen
- inputText: "password123"
  id: "password"
- inputText: "different456"   # Different password
  id: "confirmPassword"
- tapOn: "signup"
# Expected: Should show error "Passwords don't match"
# Actual: Sign-up succeeds without validation
- assertVisible: "Welcome"    # This should not appear, but does
```

---

## 🔍 Verification Commands

### Using Maestro

```bash
# View app hierarchy (shows all testIDs)
maestro hierarchy

# Test specific flow
maestro test flows/signup-flow.yaml
```

### Using React Native Debugger

1. Open React Native Debugger
2. Inspect elements
3. Look for `testID` prop in component tree

---

## 📝 Notes

- All testIDs use snake_case format
- TestIDs are case-sensitive
- Some testIDs are reused across screens (e.g., `email` appears in both login and signup)
- TestIDs are stable and won't change unless the UI structure changes

---

## 🚀 Best Practices

1. **Always use centralized constants**: Import from `constants/testIDs.ts`
2. **TestID naming**: Use descriptive names that indicate the element's purpose
3. **Consistency**: Follow the established naming convention (snake_case)
4. **Documentation**: Update this file when adding new testIDs

---

**Last Updated**: November 2025  
**Total TestIDs**: 16 unique identifiers

