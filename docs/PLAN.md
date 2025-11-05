# Implementation Plan
## QA Automation Challenge App - Development Roadmap

**Based on:** [PRD.md](./PRD.md)  
**Current Stack:** Expo Router, shadcn/ui, NativeWind, TypeScript  
**Last Updated:** 2025-11-05

---

## 📋 Overview

This document outlines the implementation roadmap for building the QA Automation Challenge app based on the PRD. The plan is structured in phases, with each phase building upon the previous one.

### Current State Assessment

✅ **Already Available:**
- Expo Router setup with file-based routing
- shadcn/ui components (Button, Card, Text, Avatar, Progress, Tooltip)
- NativeWind styling system
- TypeScript configuration
- EAS Build configuration
- Basic app structure with `app/_layout.tsx` and `app/index.tsx`

❌ **Missing:**
- AsyncStorage dependency
- Input component (shadcn/ui)
- Storage utilities
- TestID constants
- Onboarding screens
- Authentication screens
- Home screen
- Navigation logic

---

## 🎯 Phase 1: Foundation Setup

**Goal:** Install dependencies and create core infrastructure  
**Estimated Time:** 1-2 hours  
**Status:** 📋 Not Started

### 1.1 Install Dependencies

- [ ] Install `@react-native-async-storage/async-storage`
  ```bash
  pnpm add @react-native-async-storage/async-storage
  ```

### 1.2 Create Storage Utilities

- [ ] Create `lib/storage.ts` with AsyncStorage helpers:
  - `getOnboardingComplete()` → returns boolean
  - `setOnboardingComplete()` → saves flag
  - `getUser()` → returns user object or null
  - `saveUser(user)` → saves user data
  - `clearUser()` → removes user session
  - `clearAll()` → clears all app data (for testing)

**Storage Keys:**
```typescript
const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: 'onboardingComplete',
  USER: 'user',
} as const;
```

**User Type:**
```typescript
interface User {
  email: string;
  fullName: string;
  password: string; // Mock - for testing only
}
```

### 1.3 Create TestID Constants

- [ ] Create `constants/testIDs.ts` with centralized testIDs:
  ```typescript
  export const TEST_IDS = {
    onboarding: {
      moreInfo: 'more_info',
      getStarted: 'get_started',
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
  } as const;
  ```

### 1.4 Create Input Component

- [ ] Create `components/ui/input.tsx` (shadcn/ui Input component)
  - Support for `secureTextEntry` prop
  - Support for `testID` prop
  - NativeWind styling
  - Proper TypeScript types

### 1.5 Create Link Component (for auth navigation)

- [ ] Create `components/Link.tsx` or use `Pressable` with styling
  - For "Already have an account?" and "Don't have an account?" links
  - Should have testID support
  - NativeWind styling

---

## 🎯 Phase 2: Navigation Structure

**Goal:** Set up Expo Router file structure and navigation logic  
**Estimated Time:** 1-2 hours  
**Status:** 📋 Not Started

### 2.1 Create Route Groups

- [ ] Create `app/(onboarding)/` directory with:
  - `_layout.tsx` → onboarding layout (no header)
  - `screen1.tsx` → First onboarding screen
  - `screen2.tsx` → Second onboarding screen
  - `screen3.tsx` → Third onboarding screen

- [ ] Create `app/(auth)/` directory with:
  - `_layout.tsx` → auth layout (no header or custom header)
  - `login.tsx` → Login screen
  - `signup.tsx` → Sign-up screen

- [ ] Create `app/(tabs)/` directory with:
  - `_layout.tsx` → tabs layout (optional, since we only have Home)
  - `home.tsx` → Home screen

### 2.2 Update Root Layout

- [ ] Modify `app/_layout.tsx`:
  - Remove demo screen configuration
  - Set up proper initial route logic (will be handled in index.tsx)
  - Keep theme and navigation setup

### 2.3 Create Initial Route Logic

- [ ] Update `app/index.tsx` to handle initial routing:
  - Check if onboarding is complete
  - Check if user is logged in
  - Navigate to appropriate screen:
    - First time → `/(onboarding)/screen1`
    - Onboarding done but not logged in → `/(auth)/login`
    - Logged in → `/(tabs)/home`

**Implementation:**
```typescript
// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { getOnboardingComplete, getUser } from '@/lib/storage';

export default function Index() {
  useEffect(() => {
    checkInitialRoute();
  }, []);

  async function checkInitialRoute() {
    const onboardingComplete = await getOnboardingComplete();
    const user = await getUser();

    if (!onboardingComplete) {
      router.replace('/(onboarding)/screen1');
    } else if (!user) {
      router.replace('/(auth)/login');
    } else {
      router.replace('/(tabs)/home');
    }
  }

  return null; // or loading spinner
}
```

---

## 🎯 Phase 3: Onboarding Flow

**Goal:** Implement 3-screen onboarding with navigation  
**Estimated Time:** 2-3 hours  
**Status:** 📋 Not Started

### 3.1 Onboarding Screen 1

- [ ] Create `app/(onboarding)/screen1.tsx`:
  - Welcome message / app introduction
  - Button with `testID={TEST_IDS.onboarding.moreInfo}`
  - Navigate to screen2 on button press
  - Use shadcn/ui Button component
  - NativeWind styling

### 3.2 Onboarding Screen 2

- [ ] Create `app/(onboarding)/screen2.tsx`:
  - Features overview content
  - Button with `testID={TEST_IDS.onboarding.moreInfo}`
  - Navigate to screen3 on button press
  - Use shadcn/ui Button component
  - NativeWind styling

### 3.3 Onboarding Screen 3

- [ ] Create `app/(onboarding)/screen3.tsx`:
  - "Ready to start?" message
  - Button with `testID={TEST_IDS.onboarding.getStarted}`
  - On press:
    - Call `setOnboardingComplete()` (async)
    - Navigate to `/(auth)/signup`
  - Use shadcn/ui Button component
  - NativeWind styling

### 3.4 Onboarding Layout

- [ ] Create `app/(onboarding)/_layout.tsx`:
  - Stack navigator for onboarding screens
  - No header (or custom minimal header)
  - Disable back button on first screen

### 3.5 Onboarding Content

- [ ] Create `constants/onboarding.ts` with content:
  ```typescript
  export const ONBOARDING_CONTENT = {
    screen1: {
      title: 'Welcome',
      description: 'App introduction text...',
    },
    screen2: {
      title: 'Features',
      description: 'App features description...',
    },
    screen3: {
      title: 'Ready to start?',
      description: 'Get started message...',
    },
  };
  ```

---

## 🎯 Phase 4: Authentication Flow

**Goal:** Implement Sign-up and Login screens with mock authentication  
**Estimated Time:** 3-4 hours  
**Status:** 📋 Not Started

### 4.1 Sign-up Screen

- [ ] Create `app/(auth)/signup.tsx`:
  - Email input: `testID={TEST_IDS.auth.email}`
    - 🐛 **INTENTIONAL BUG:** `autoCapitalize="words"` (should be "none")
  - Full Name input: `testID={TEST_IDS.auth.fullName}`
  - Password input: `testID={TEST_IDS.auth.password}`, `secureTextEntry`
  - Confirm Password input: `testID={TEST_IDS.auth.confirmPassword}`, `secureTextEntry`
    - 🐛 **INTENTIONAL BUG:** No validation to check if passwords match
  - Sign-up Button: `testID={TEST_IDS.auth.signup}`
    - Simulate async operation (2-3 sec delay)
    - Save user to AsyncStorage
    - Navigate to `/(tabs)/home`
  - "Already have an account?" Link: `testID={TEST_IDS.auth.alreadyHaveAccount}`
    - Navigate to `/(auth)/login`
  - Use shadcn/ui Input and Button components
  - NativeWind styling
  - Loading state during async operation

**Implementation Notes:**
- Use `useState` for form fields
- Add loading state with spinner
- Show error alert if signup fails (optional)

### 4.2 Login Screen

- [ ] Create `app/(auth)/login.tsx`:
  - Email input: `testID={TEST_IDS.auth.email}`
    - 🐛 **INTENTIONAL BUG:** `autoCapitalize="words"` (should be "none")
  - Password input: `testID={TEST_IDS.auth.password}`, `secureTextEntry`
  - Login Button: `testID={TEST_IDS.auth.login}`
    - Validate against hardcoded credentials:
      - Email: `contact@tapp.work`
      - Password: `qwerty`
    - Simulate async operation (2-3 sec delay)
    - On success: Navigate to `/(tabs)/home`
    - On failure: Show error message/alert
  - "Don't have an account?" Link: `testID={TEST_IDS.auth.dontHaveAccount}`
    - Navigate to `/(auth)/signup`
  - Use shadcn/ui Input and Button components
  - NativeWind styling
  - Loading state during async operation

**Hardcoded Credentials:**
```typescript
const HARDCODED_CREDENTIALS = {
  email: 'contact@tapp.work',
  password: 'qwerty',
};
```

### 4.3 Auth Layout

- [ ] Create `app/(auth)/_layout.tsx`:
  - Stack navigator for auth screens
  - No header (or custom minimal header)
  - Allow navigation between login and signup

### 4.4 Mock Auth Utility

- [ ] Create `lib/auth.ts` with mock auth functions:
  - `validateLogin(email, password)` → returns boolean
  - `validateSignup(userData)` → returns boolean (basic validation)
  - `simulateAsyncDelay()` → returns Promise (2-3 sec delay)

---

## 🎯 Phase 5: Home Screen

**Goal:** Implement Home screen with user display and logout  
**Estimated Time:** 1-2 hours  
**Status:** 📋 Not Started

### 5.1 Home Screen

- [ ] Create `app/(tabs)/home.tsx`:
  - Display welcome message with user's full name
  - Text element: `testID={TEST_IDS.home.fullnameText}`
  - Logout Button: `testID={TEST_IDS.home.logout}`
    - Clear user session (`clearUser()`)
    - Navigate to `/(auth)/login`
  - Use shadcn/ui Text and Button components
  - NativeWind styling

**Implementation:**
- Get user data from AsyncStorage on mount
- Display: `Welcome, {user.fullName}!`

### 5.2 Tabs Layout

- [ ] Create `app/(tabs)/_layout.tsx`:
  - Simple Stack or Tabs layout (since we only have Home)
  - Optional header with app name

---

## 🎯 Phase 6: Bug Introduction & Marking

**Goal:** Ensure intentional bugs are present and marked  
**Estimated Time:** 30 minutes  
**Status:** 📋 Not Started

### 6.1 Email Auto-capitalization Bug

- [ ] Verify email inputs have `autoCapitalize="words"` or `"sentences"`
- [ ] Add comment: `// 🐛 INTENTIONAL BUG: Email field has autoCapitalize enabled`
- [ ] Locations:
  - `app/(auth)/signup.tsx` - Email input
  - `app/(auth)/login.tsx` - Email input

### 6.2 Password Confirmation Bug

- [ ] Verify signup screen does NOT validate password match
- [ ] Add comment: `// 🐛 INTENTIONAL BUG: Password confirmation not validated`
- [ ] Location:
  - `app/(auth)/signup.tsx` - Sign-up handler

---

## 🎯 Phase 7: Testing & Validation

**Goal:** Manual testing and validation of all flows  
**Estimated Time:** 2-3 hours  
**Status:** 📋 Not Started

### 7.1 Manual Testing Checklist

- [ ] First-time user flow:
  - [ ] App launches → shows onboarding screen 1
  - [ ] Navigate through all 3 onboarding screens
  - [ ] Complete onboarding → navigates to signup
  - [ ] Sign up with test data → navigates to home
  - [ ] Home displays full name correctly

- [ ] Returning user flow:
  - [ ] Reinstall app (or clear AsyncStorage)
  - [ ] Set onboarding complete flag
  - [ ] App launches → shows login screen
  - [ ] Login with hardcoded credentials → navigates to home

- [ ] Logout flow:
  - [ ] Click logout → navigates to login
  - [ ] User session cleared

- [ ] Navigation flows:
  - [ ] Signup → "Already have an account?" → Login
  - [ ] Login → "Don't have an account?" → Signup

- [ ] Bug verification:
  - [ ] Email field capitalizes input (Bug #1)
  - [ ] Password confirmation accepts mismatched passwords (Bug #2)

### 7.2 TestID Verification

- [ ] Verify all testIDs are present:
  - [ ] Onboarding: `more_info`, `get_started`
  - [ ] Auth: `email`, `fullName`, `password`, `confirmPassword`, `signup`, `login`, `already_have_an_account`, `dont_have_an_account`
  - [ ] Home: `fullname_text`, `logout`

- [ ] Use React Native Debugger or Maestro to verify accessibility

### 7.3 AsyncStorage Verification

- [ ] Verify onboarding flag persists
- [ ] Verify user data persists after signup
- [ ] Verify user session clears on logout

---

## 🎯 Phase 8: Polish & Documentation

**Goal:** Final polish, documentation, and APK build  
**Estimated Time:** 2-3 hours  
**Status:** 📋 Not Started

### 8.1 Code Cleanup

- [ ] Remove demo screen code (`app/index.tsx` demo content)
- [ ] Ensure all components follow project conventions
- [ ] Run linter and fix any issues
- [ ] Run TypeScript type check
- [ ] Format code with Prettier

### 8.2 README Update

- [ ] Create/update `README.md` with:
  - App description
  - Installation instructions
  - Test credentials (hardcoded login)
  - Available flows documentation
  - Complete testID list
  - Known issues (intentional bugs)

### 8.3 Accessibility IDs Documentation

- [ ] Create `docs/ACCESSIBILITY_IDS.md` or add to README:
  - Complete list of all testIDs
  - Screen mappings
  - Usage examples

### 8.4 APK Build

- [ ] Configure EAS Build for Android APK:
  - [ ] Verify `eas.json` configuration
  - [ ] Build preview APK: `pnpm build:preview:android`
  - [ ] Test APK on Android emulator
  - [ ] Verify all functionality works in standalone build

### 8.5 Video Recording (Optional)

- [ ] Record 2-3 minute walkthrough:
  - [ ] First-time user flow
  - [ ] Returning user flow
  - [ ] Logout flow
  - [ ] Show all screens and interactions

---

## 📁 File Structure (Final)

```
app/
├── _layout.tsx                    # Root layout (updated)
├── index.tsx                      # Initial route logic (updated)
├── +not-found.tsx                 # 404 screen (existing)
├── (onboarding)/
│   ├── _layout.tsx                # Onboarding layout
│   ├── screen1.tsx                # First onboarding screen
│   ├── screen2.tsx                # Second onboarding screen
│   └── screen3.tsx                # Third onboarding screen
├── (auth)/
│   ├── _layout.tsx                # Auth layout
│   ├── login.tsx                  # Login screen
│   └── signup.tsx                 # Sign-up screen
└── (tabs)/
    ├── _layout.tsx                # Tabs layout
    └── home.tsx                   # Home screen

components/
├── ui/
│   ├── input.tsx                  # Input component (NEW)
│   ├── button.tsx                 # Existing
│   ├── card.tsx                   # Existing
│   ├── text.tsx                   # Existing
│   └── ...                        # Other existing components
└── Link.tsx                       # Link component (NEW, optional)

lib/
├── storage.ts                     # AsyncStorage helpers (NEW)
├── auth.ts                        # Mock auth logic (NEW)
├── constants.ts                   # Existing (keep)
└── ...                            # Other existing utilities

constants/
├── testIDs.ts                     # TestID constants (NEW)
└── onboarding.ts                  # Onboarding content (NEW)

docs/
├── PRD.md                         # Existing
├── PLAN.md                        # This file (NEW)
└── ACCESSIBILITY_IDS.md           # TestID documentation (NEW)
```

---

## 🔄 Development Workflow

### Recommended Order

1. **Phase 1** → Foundation (dependencies, utilities, components)
2. **Phase 2** → Navigation structure (file structure, routing)
3. **Phase 3** → Onboarding (simple screens first)
4. **Phase 4** → Authentication (more complex logic)
5. **Phase 5** → Home screen (final screen)
6. **Phase 6** → Bug verification (ensure bugs are present)
7. **Phase 7** → Testing (validate everything works)
8. **Phase 8** → Polish & build (final touches)

### Testing Strategy

- **After each phase:** Test the implemented screens manually
- **After Phase 4:** Test complete auth flow
- **After Phase 5:** Test complete user journey
- **After Phase 7:** Full manual testing + Maestro verification

---

## 📝 Notes & Considerations

### Expo Router Specifics

- Use `router.push()` for navigation
- Use `router.replace()` when back navigation shouldn't be allowed
- Use `router.back()` for going back
- File-based routing automatically handles navigation

### Styling Guidelines

- Use NativeWind classes (Tailwind CSS)
- No `StyleSheet.create()` - use `className` prop
- Follow existing component patterns
- Keep styling consistent with shadcn/ui theme

### TypeScript

- Define interfaces for all data structures
- Type all function parameters and returns
- No `any` types - use proper types or `unknown`

### AsyncStorage

- Always wrap in try-catch
- Use async/await consistently
- Handle loading states in UI

### Intentional Bugs

- Mark all intentional bugs with `// 🐛 INTENTIONAL BUG:` comment
- Document why it's a bug and what should be fixed
- Ensure bugs are testable via Maestro

---

## ✅ Acceptance Criteria Checklist

### Functionality
- [ ] All 3 onboarding screens display correctly
- [ ] Onboarding shows only on first launch
- [ ] Sign-up creates account and navigates to Home
- [ ] Login with correct credentials succeeds
- [ ] Login with incorrect credentials fails
- [ ] Home displays user's full name
- [ ] Logout returns to Login screen
- [ ] Navigation between Auth screens works

### Accessibility & Testing
- [ ] All elements have correct `testID` attributes
- [ ] `testID`s match specification exactly
- [ ] Maestro can locate all elements via IDs
- [ ] Both intentional bugs are present and marked

### Build & Distribution
- [ ] APK installs successfully on Android emulator
- [ ] App runs without crashes
- [ ] No console errors or warnings
- [ ] All flows work in standalone build

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run on Android
pnpm dev:android

# Type check
pnpm type-check

# Lint
pnpm lint

# Format code
pnpm format

# Build APK (preview)
pnpm build:preview:android
```

---

## 📅 Timeline Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 1: Foundation | 1-2 hours | 1-2 hours |
| Phase 2: Navigation | 1-2 hours | 2-4 hours |
| Phase 3: Onboarding | 2-3 hours | 4-7 hours |
| Phase 4: Authentication | 3-4 hours | 7-11 hours |
| Phase 5: Home Screen | 1-2 hours | 8-13 hours |
| Phase 6: Bug Marking | 30 min | 8.5-13.5 hours |
| Phase 7: Testing | 2-3 hours | 10.5-16.5 hours |
| Phase 8: Polish & Build | 2-3 hours | 12.5-19.5 hours |
| **Total** | | **12-20 hours** |

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-05  
**Status:** Ready for Implementation

